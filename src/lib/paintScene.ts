/**
 * "Painel sob luz de inspeção" — the WebGL scene behind the process section.
 *
 * A single full-screen fragment shader (ogl: Renderer + Triangle + Program,
 * no scene graph — far lighter than three.js for one quad). It paints a dark
 * clear-coated panel lit by a long LED inspection bar, the tool a detailer
 * uses to find defects. The scroll position through the section drives the
 * story told in the four steps:
 *
 *   01 inspeção   the bar reveals swirl marks (circular micro-scratches)
 *   02 lavagem    a dull film over the paint fades away
 *   03 polimento  everything the bar has swept past is polished: swirls gone
 *   04 proteção   water beads up on the coated paint
 *
 * Direction matters: scrolling down pushes the bar forward (left → right) and
 * leans it one way, with its glow trailing behind; scrolling up pulls it back,
 * leans it the other way, and the swirls it had removed come back. Scroll
 * stopped = the bar rests and only the metallic flake twinkles.
 *
 * Loaded with a dynamic import() from Scene.tsx, only when the section is
 * near the viewport and only if WebGL + motion are allowed.
 */
import { Mesh, Program, Renderer, Triangle } from 'ogl';

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform float uProgress;
uniform float uVel;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);

  // Gentle panel curvature (a hood / door skin). Its gradient bends the
  // reflection, so the light bar never looks like a flat stripe.
  float a = p.x * 1.6 + 0.6;
  float b = p.y * 2.3 - p.x * 0.7;
  vec2 grad = vec2(0.128 * cos(a) + 0.035 * sin(b), -0.115 * sin(b));
  vec2 r = p + grad * 1.4;

  // --- Inspection bar ------------------------------------------------------
  float travel = smoothstep(0.02, 0.98, uProgress);
  float lx = mix(-0.42, 0.42, travel) * aspect;
  float tilt = clamp(uVel, -1.0, 1.0) * 0.42 + 0.12;
  vec2 dir = vec2(sin(tilt), cos(tilt));
  vec2 d = r - vec2(lx, 0.0);
  float dist = d.x * dir.y - d.y * dir.x;

  float breathe = 1.0 + 0.04 * sin(uTime * 0.9);
  float core = exp(-dist * dist * 2600.0);
  float halo = exp(-dist * dist * 55.0) * breathe;
  // Motion smear: the glow lags behind whichever way the bar is moving.
  float lag = dist + clamp(uVel, -1.0, 1.0) * 0.09;
  float smear = exp(-lag * lag * 30.0) * abs(clamp(uVel, -1.0, 1.0)) * 0.55;
  // Fade the tube out at the top/bottom so it reads as a finite light.
  float along = d.x * dir.x + d.y * dir.y;
  float ends = smoothstep(0.62, 0.38, abs(along));
  core *= ends;

  // --- Swirl marks --------------------------------------------------------
  vec2 g = p * 3.2;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  vec2 c = (vec2(hash(id), hash(id + 7.31)) - 0.5) * 0.5;
  vec2 fc = f - c;
  float rr = length(fc);
  float ang = atan(fc.y, fc.x);
  float rings = smoothstep(0.86, 1.0, sin(rr * 230.0 + hash(id) * 40.0));
  float arcs = smoothstep(0.45, 0.85, noise(vec2(ang * 2.5, rr * 18.0) + id * 5.7));
  float cellEdge = smoothstep(0.5, 0.36, max(abs(f.x), abs(f.y)));
  float swirl = rings * arcs * smoothstep(0.48, 0.12, rr) * cellEdge;

  // Everything the bar has already swept past (to its left) is polished —
  // but only from step 03 on. Scrolling back un-polishes it.
  float polishGate = smoothstep(0.38, 0.5, uProgress);
  float polished = smoothstep(0.0, 0.18, lx - r.x) * polishGate;
  float swirlVis = swirl * (halo * 1.5 + 0.06) * (1.0 - polished);

  // --- Dull film (dirty paint), gone after the wash -----------------------
  float dirt = 1.0 - smoothstep(0.14, 0.36, uProgress);
  float grime = noise(p * 7.0) * 0.6 + noise(p * 23.0) * 0.4;

  // --- Water beading on the protected paint --------------------------------
  float beadsAmt = smoothstep(0.72, 0.94, uProgress);
  vec2 bg = p * 15.0;
  vec2 bid = floor(bg);
  vec2 bf = fract(bg) - 0.5;
  vec2 bc = (vec2(hash(bid + 3.1), hash(bid + 9.7)) - 0.5) * 0.56;
  float brad = mix(0.09, 0.22, hash(bid + 1.7)) * step(0.42, hash(bid + 5.3));
  vec2 bq = bf - bc;
  float bead = 1.0 - smoothstep(brad * 0.78, brad, length(bq));
  vec2 hl = bq - vec2(-0.32, 0.36) * brad;
  float beadSpec = exp(-dot(hl, hl) / (brad * brad * 0.035 + 1e-4)) * step(0.001, brad);
  float beadRim = smoothstep(brad * 0.55, brad * 0.95, length(bq)) * bead;

  // --- Metallic flake: tiny sparkles that twinkle at rest ------------------
  vec2 cell = floor(vUv * uRes / 2.5);
  float fh = hash(cell);
  float flake = step(0.9985, fh) * (0.5 + 0.5 * sin(uTime * 2.2 + fh * 80.0));

  // --- Compose ---------------------------------------------------------------
  vec3 neon = vec3(0.416, 0.871, 0.859);
  vec3 white = vec3(0.90, 0.97, 1.0);
  vec3 col = vec3(0.010, 0.020, 0.025) + vec3(0.006, 0.018, 0.020) * (1.0 - length(p));

  float clarity = mix(1.0, 0.35, dirt);
  col += neon * (halo * 0.24 + smear * 0.35) * clarity;
  col += white * core * clarity;
  col += vec3(0.55, 0.78, 0.80) * swirlVis;
  // Polished paint: a clean, deep gloss — a soft reflection of the bay
  // ceiling following the panel curvature, so it reads as mirror, not void.
  float sheen = smoothstep(-0.25, 0.35, r.y + grad.x * 0.8) * smoothstep(0.55, -0.1, r.y);
  col += neon * 0.045 * sheen * polished;
  col += white * 0.018 * polished * (1.0 - abs(r.y) * 1.6);
  col += white * flake * (0.04 + halo * 0.9);

  // Dull film: lifts the blacks and flattens the reflection.
  col = mix(col, vec3(0.05, 0.06, 0.065) + col * 0.45, dirt * (0.35 + grime * 0.4));

  // Beads catch the light — brighter close to the bar.
  col = mix(col, col * 0.55, beadRim * beadsAmt);
  col += white * beadSpec * beadsAmt * (0.35 + halo * 1.2);

  // Vignette, then a whisper of grain to avoid banding in the dark gradient.
  col *= smoothstep(1.25, 0.25, length(p * vec2(0.75, 1.15)));
  col += (hash(vUv * uRes + uTime) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

export type PaintSceneHandle = { dispose: () => void };

type Options = {
  /** Element whose scroll progress drives the scene (the tall process section). */
  track: HTMLElement;
  /** Called after the first frame is on screen, so the canvas can fade in. */
  onReady?: () => void;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function mountPaintScene(
  canvas: HTMLCanvasElement,
  { track, onReady }: Options,
): PaintSceneHandle {
  const small = window.innerWidth < 768;
  const dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5);

  const renderer = new Renderer({ canvas, dpr, alpha: false, antialias: false, depth: false });
  const gl = renderer.gl;
  gl.clearColor(0.02, 0.035, 0.043, 1);

  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uRes: { value: [1, 1] },
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uVel: { value: 0 },
    },
  });
  const mesh = new Mesh(gl, { geometry, program });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas.parentElement ?? canvas;
    renderer.setSize(w, h);
    program.uniforms.uRes.value = [w * dpr, h * dpr];
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

  // --- Scroll state: read in a passive listener, consumed in rAF -----------
  const readProgress = () => {
    const rect = track.getBoundingClientRect();
    const span = rect.height - window.innerHeight;
    return span > 0 ? clamp01(-rect.top / span) : 0;
  };
  let targetProgress = readProgress();
  let progress = targetProgress;
  let lastY = window.scrollY;
  let velocity = 0; // smoothed, signed: > 0 scrolling down, < 0 up

  const onScroll = () => {
    targetProgress = readProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Loop, paused when off-screen or the tab is hidden ---------------------
  let frame = 0;
  let inView = false;
  let ready = false;
  let tick = 0;
  const start = performance.now();

  const loop = () => {
    frame = requestAnimationFrame(loop);

    const y = window.scrollY;
    const delta = y - lastY;
    lastY = y;
    velocity += (Math.max(-1, Math.min(1, delta / 45)) - velocity) * 0.08;
    progress += (targetProgress - progress) * 0.08;

    // At rest only the flake twinkles — half the frame rate is plenty.
    const idle = Math.abs(velocity) < 0.002 && Math.abs(targetProgress - progress) < 0.0005;
    tick++;
    if (idle && ready && tick % 2) return;

    program.uniforms.uTime.value = (performance.now() - start) / 1000;
    program.uniforms.uProgress.value = progress;
    program.uniforms.uVel.value = velocity;
    renderer.render({ scene: mesh });

    if (!ready) {
      ready = true;
      onReady?.();
    }
  };

  const play = () => {
    if (frame || !inView || document.hidden) return;
    lastY = window.scrollY;
    frame = requestAnimationFrame(loop);
  };
  const pause = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  const intersection = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) play();
    else pause();
  });
  intersection.observe(track);

  const onVisibility = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVisibility);

  return {
    dispose() {
      pause();
      intersection.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      geometry.remove();
      program.remove();
      // Free the context now instead of waiting for GC — browsers cap how
      // many live WebGL contexts a page may hold.
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
