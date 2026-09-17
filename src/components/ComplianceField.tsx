'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { process } from '@/config/site.config';
import { prefersReducedMotion, usePinProgress } from '@/lib/useParallax';

/*
 * The scroll-driven centrepiece of the site.
 *
 * Every particle is one document. As the section is scrolled through, they go
 * from scattered and drifting (amber = pendência) to a strict grid, and then an
 * audit sweep crosses the grid left to right turning them emerald (regular).
 * That is literally the service being sold — levantamento, diagnóstico,
 * organização, controle — so the animation carries meaning rather than
 * decorating the page.
 *
 * Written against raw WebGL instead of three.js on purpose: the whole effect is
 * one draw call of gl.POINTS, and pulling in a 600kB scene graph to move 2.6k
 * vertices would cost more than the entire rest of the page.
 *
 * Accessibility: the canvas is aria-hidden and every word of the four stages is
 * real DOM text next to it, always present for crawlers and screen readers. If
 * WebGL is unavailable, or the user asked for reduced motion, the shader never
 * runs and the section renders in its resolved end state.
 */

const VERTEX_SHADER = `
attribute vec2 aScatter;
attribute vec2 aGrid;
attribute float aRand;

uniform float uProgress;
uniform float uTime;
uniform float uDpr;

varying float vResolved;
varying float vSettled;

void main() {
  // Each particle waits its turn, ordered left to right across the grid, so
  // the field resolves as a wave instead of snapping all at once.
  float queue = (aGrid.x * 0.5 + 0.5) * 0.34 + aRand * 0.14;
  float t = clamp((uProgress - 0.10 - queue * 0.5) / 0.40, 0.0, 1.0);
  float settle = t * t * (3.0 - 2.0 * t);

  // Loose documents keep drifting; the drift dies as they are filed.
  vec2 drift = vec2(
    sin(uTime * 0.22 + aRand * 17.0),
    cos(uTime * 0.19 + aRand * 11.0)
  ) * 0.05 * (1.0 - settle);

  vec2 pos = mix(aScatter + drift, aGrid, settle);

  // The audit pass: a vertical line crossing the formed grid.
  float sweep = clamp((uProgress - 0.56) / 0.36, 0.0, 1.0);
  float sweepX = mix(-1.3, 1.35, sweep);
  vResolved = smoothstep(0.18, -0.03, aGrid.x - sweepX) * settle;
  vSettled = settle;

  // Barely-there breathing once a document is regular, so the end state reads
  // as monitored rather than frozen.
  float breathe = 1.0 + 0.07 * sin(uTime * 1.5 + aRand * 6.283) * vResolved;

  gl_Position = vec4(pos, 0.0, 1.0);
  gl_PointSize = mix(2.6, 7.8, settle) * breathe * uDpr;
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec3 uPending;
uniform vec3 uRegular;

varying float vResolved;
varying float vSettled;

void main() {
  // A portrait rounded rectangle, not a dot: at the sizes the settled state
  // reaches, the particles read as sheets of paper.
  vec2 q = abs(gl_PointCoord - 0.5) - vec2(0.21, 0.30);
  float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.07;
  float mask = 1.0 - smoothstep(-0.02, 0.03, sd);
  if (mask <= 0.01) discard;

  vec3 color = mix(uPending, uRegular, vResolved);
  float alpha = mask * (0.30 + 0.44 * vSettled + 0.26 * vResolved);
  gl_FragColor = vec4(color * alpha, alpha);
}
`;

/** Tailwind `amber` and `emerald`, as linear-ish 0-1 triplets for the shader. */
const PENDING_RGB = [0.878, 0.639, 0.251] as const; // #E0A340
const REGULAR_RGB = [0.247, 0.663, 0.541] as const; // #3FA98A

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Lays the particles out so the grid cells stay square whatever the viewport
 * is, and pairs every grid slot with a random scattered origin.
 */
function buildField(width: number, height: number) {
  const aspect = width / Math.max(height, 1);
  // Fewer particles on a phone: this runs on the same GPU budget as scrolling.
  const target = width < 720 ? 1100 : 2600;
  const columns = Math.max(8, Math.round(Math.sqrt(target * aspect)));
  const rows = Math.max(6, Math.round(target / columns));
  const count = columns * rows;

  const scatter = new Float32Array(count * 2);
  const grid = new Float32Array(count * 2);
  const rand = new Float32Array(count);

  const spanX = 1.68;
  const spanY = 1.5;

  for (let i = 0; i < count; i += 1) {
    const col = i % columns;
    const row = Math.floor(i / columns);

    grid[i * 2] = ((col + 0.5) / columns - 0.5) * spanX;
    grid[i * 2 + 1] = ((row + 0.5) / rows - 0.5) * spanY;

    // Scattered origin: wider than the grid and biased outward, so the "before"
    // state overflows the frame the way an unsorted pile does.
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.45 + Math.random() * 0.95;
    scatter[i * 2] = Math.cos(angle) * radius * 1.35;
    scatter[i * 2 + 1] = Math.sin(angle) * radius * 1.1;

    rand[i] = Math.random();
  }

  return { scatter, grid, rand, count };
}

export function ComplianceField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [stage, setStage] = useState(0);
  // Starts true so the server-rendered markup is the readable, resolved state;
  // the effect turns it off only once WebGL is confirmed working.
  const [staticMode, setStaticMode] = useState(true);

  const handleProgress = useCallback((value: number) => {
    progressRef.current = value;
    // React only re-renders on a stage change — four times over the whole
    // section, not once per frame.
    const next = Math.min(process.length - 1, Math.floor(value * process.length));
    setStage((current) => (current === next ? current : next));
  }, []);

  const pinRef = usePinProgress<HTMLDivElement>(handleProgress);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    setStaticMode(false);

    const buffers = {
      scatter: gl.createBuffer(),
      grid: gl.createBuffer(),
      rand: gl.createBuffer(),
    };

    const locations = {
      scatter: gl.getAttribLocation(program, 'aScatter'),
      grid: gl.getAttribLocation(program, 'aGrid'),
      rand: gl.getAttribLocation(program, 'aRand'),
      progress: gl.getUniformLocation(program, 'uProgress'),
      time: gl.getUniformLocation(program, 'uTime'),
      dpr: gl.getUniformLocation(program, 'uDpr'),
      pending: gl.getUniformLocation(program, 'uPending'),
      regular: gl.getUniformLocation(program, 'uRegular'),
    };

    gl.enable(gl.BLEND);
    // Premultiplied alpha: the particles add light onto the navy instead of
    // punching dark holes where they overlap.
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform3fv(locations.pending, PENDING_RGB as unknown as number[]);
    gl.uniform3fv(locations.regular, REGULAR_RGB as unknown as number[]);

    let count = 0;
    let dpr = 1;

    const upload = (attribute: number, buffer: WebGLBuffer | null, data: Float32Array, size: number) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);
    };

    const resize = () => {
      // Capped at 2: a 3x phone screen triples the fragment cost for a
      // difference nobody can see on soft-edged 7px sprites.
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(locations.dpr, dpr);

      const field = buildField(width, height);
      count = field.count;
      upload(locations.scatter, buffers.scatter, field.scatter, 2);
      upload(locations.grid, buffers.grid, field.grid, 2);
      upload(locations.rand, buffers.rand, field.rand, 1);
    };

    resize();

    let frame = 0;
    let running = false;
    const start = performance.now();

    const render = () => {
      frame = running ? requestAnimationFrame(render) : 0;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(locations.progress, progressRef.current);
      gl.uniform1f(locations.time, (performance.now() - start) / 1000);
      gl.drawArrays(gl.POINTS, 0, count);
    };

    // The loop only exists while the section is on screen — no GPU work is
    // spent on a canvas the visitor scrolled past ten sections ago.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === running) return;
        running = entry.isIntersecting;
        if (running && !frame) frame = requestAnimationFrame(render);
      },
      { rootMargin: '10% 0px' },
    );
    observer.observe(canvas);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      // Rebuilding the field reallocates three buffers; debounce so a dragged
      // window edge does not do it sixty times a second.
      resizeTimer = window.setTimeout(resize, 160);
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
      if (frame) cancelAnimationFrame(frame);
      gl.deleteBuffer(buffers.scatter);
      gl.deleteBuffer(buffers.grid);
      gl.deleteBuffer(buffers.rand);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  const active = process[stage];

  return (
    <section id="como-funciona" className="relative bg-navy text-mist">
      {/*
        The tall element is the scroll track; the sticky child is what the
        visitor actually sees. 380vh gives each of the four stages roughly a
        screen of scroll, which is slow enough to read the copy.
      */}
      <div ref={pinRef} className="relative h-[380vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* Static stand-in: no WebGL, or reduced motion requested. */}
          {staticMode && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 grid-dark opacity-70"
            />
          )}

          {/* Keeps text legible over the densest part of the field. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/35 to-navy/90"
          />

          {/* pb-24 on a phone clears the fixed WhatsApp bar, which would otherwise
              sit on top of the last stage card. */}
          <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-5 pb-24 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:py-24">
            <header className="max-w-prose">
              <p className="font-mono text-[11px] uppercase tracking-label text-emerald">
                Como é realizado o atendimento
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-[1.1] sm:mt-4 sm:text-4xl lg:text-5xl">
                Da pendência dispersa ao controle contínuo
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate sm:mt-4 sm:text-base">
                O trabalho segue quatro etapas. Role a página para acompanhar cada uma delas.
              </p>
            </header>

            {/*
              All four stages stay in the DOM — dimmed, never hidden — so the
              content is complete for crawlers and screen readers regardless of
              scroll position. `aria-current` marks the one being shown.
            */}
            <ol className="grid gap-px border border-navyLine bg-navyLine sm:grid-cols-2 lg:grid-cols-4">
              {process.map((item, index) => {
                const isActive = index === stage;
                const isDone = index < stage;
                return (
                  <li
                    key={item.step}
                    aria-current={isActive ? 'step' : undefined}
                    className={`relative bg-navy/80 p-4 backdrop-blur-sm sm:p-5 transition-colors duration-500 ease-smooth lg:p-6 ${
                      isActive ? 'bg-navySoft/90' : ''
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px origin-left transition-transform duration-700 ease-smooth ${
                        isActive || isDone ? 'scale-x-100 bg-emerald' : 'scale-x-0 bg-emerald'
                      }`}
                    />
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className={`font-mono text-sm transition-colors duration-500 ${
                          isActive ? 'text-emerald' : isDone ? 'text-slate' : 'text-dim'
                        }`}
                      >
                        {item.step}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-label transition-colors duration-500 ${
                          isDone || isActive ? 'text-emerald' : 'text-amber'
                        }`}
                      >
                        {isDone || isActive ? 'tratado' : 'pendente'}
                      </span>
                    </div>
                    <h3
                      className={`mt-3 font-display text-lg font-semibold leading-snug transition-colors duration-500 ${
                        isActive ? 'text-mist' : 'text-slate'
                      }`}
                    >
                      {item.title}
                    </h3>
                    {/*
                      On a phone four open cards do not fit the sticky screen,
                      so the inactive descriptions collapse to zero height.
                      max-height (not `hidden`) keeps them in the accessibility
                      tree and in the crawled markup.
                    */}
                    <p
                      className={`overflow-hidden text-sm leading-relaxed transition-all duration-500 ease-smooth sm:mt-2 sm:max-h-48 ${
                        isActive
                          ? 'mt-2 max-h-48 text-slate opacity-100'
                          : 'mt-0 max-h-0 text-dim opacity-70 sm:mt-2 sm:opacity-70'
                      }`}
                    >
                      {item.description}
                    </p>
                  </li>
                );
              })}
            </ol>

            <p className="font-mono text-[11px] uppercase tracking-label text-dim">
              <span className="text-emerald">{active.step}</span> — {active.state}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
