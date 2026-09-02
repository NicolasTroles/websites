'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * A WebGL circuit board that grows in from the four corners of the screen as
 * the section is scrolled through — trunks routed out of each corner
 * (orthogonal jogs plus the occasional diagonal jump) reaching in toward the
 * center, each spawning short branch-stubs off it — the "trunk with twigs
 * ending in a dot" look of a real circuit-board illustration, filling the
 * whole viewport rather than a sparse patch. Amber throughout, every branch
 * ending in a glowing point of light.
 *
 * Traces are real triangle-strip ribbons (not THREE.Line — GL line width is
 * capped at ~1px on most platforms/backends and ignores any width you set),
 * so thickness is an actual mesh property that scales properly. Pure
 * three.js (no react-three-fiber): the render loop only touches uniforms,
 * never React state, so scroll can update every frame without re-rendering
 * the component tree.
 *
 * Driven by the scroll position of `containerRef` (a tall pinned section),
 * not the whole page — see CircuitSection for how that range is set up.
 */

const VERTEX_SHADER = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;
  uniform float uProgress;
  uniform vec3 uColor;
  uniform vec3 uGlowColor;
  varying float vT;
  void main() {
    if (vT > uProgress) discard;
    float head = smoothstep(uProgress - 0.1, uProgress, vT);
    vec3 color = mix(uColor, uGlowColor, head);
    float alpha = mix(0.92, 1.0, head);
    gl_FragColor = vec4(color, alpha);
  }
`;

type PathDef = {
  points: THREE.Vector3[];
  window: [number, number];
  isNode: boolean;
  width: number;
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const clampInt = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

type StepDir = 'h' | 'v' | 'd';

/**
 * Trunks routed out of each of the four corners toward the middle of the
 * grid — mostly orthogonal PCB-style jogs, with an occasional diagonal jump
 * (moving both axes at once, which reads as a 45° trace since grid spacing
 * is uniform) — each spawning short branch-stubs as it goes. Deterministic
 * (seeded), not random per load.
 */
function buildPaths(cols: number, rows: number, spacing: number): PathDef[] {
  const rand = seededRandom(42);
  const paths: PathDef[] = [];
  const half = { x: ((cols - 1) * spacing) / 2, y: ((rows - 1) * spacing) / 2 };
  const grid = (c: number, r: number) => new THREE.Vector3(c * spacing - half.x, r * spacing - half.y, 0);

  const corners = [
    { c: 0, r: 0, dc: 1, dr: 1 },
    { c: cols - 1, r: 0, dc: -1, dr: 1 },
    { c: 0, r: rows - 1, dc: 1, dr: -1 },
    { c: cols - 1, r: rows - 1, dc: -1, dr: -1 },
  ];

  const centerC = (cols - 1) / 2;
  const centerR = (rows - 1) / 2;

  const TRUNKS_PER_CORNER = 7;
  let trunkIndex = 0;
  const totalTrunks = corners.length * TRUNKS_PER_CORNER;

  function moveStep(c: number, r: number, dir: StepDir, corner: (typeof corners)[number], len: number) {
    if (dir === 'd') return { c: clampInt(c + corner.dc * len, 0, cols - 1), r: clampInt(r + corner.dr * len, 0, rows - 1) };
    if (dir === 'h') return { c: clampInt(c + corner.dc * len, 0, cols - 1), r };
    return { c, r: clampInt(r + corner.dr * len, 0, rows - 1) };
  }

  for (const corner of corners) {
    for (let t = 0; t < TRUNKS_PER_CORNER; t++) {
      let c = clampInt(corner.c + Math.floor(rand() * 4) * -corner.dc, 0, cols - 1);
      let r = clampInt(corner.r + Math.floor(rand() * 4) * -corner.dr, 0, rows - 1);

      const points = [grid(c, r)];
      // How close to the exact center this trunk needs to get before it
      // stops — varies per trunk so they don't all converge on one point.
      const stopRadius = 0.5 + rand() * 3.5;
      const maxSteps = 26;

      const trunkStart = (trunkIndex / totalTrunks) * 0.22;
      const trunkEnd = 0.58 + rand() * 0.22;
      trunkIndex++;

      let s = 0;
      let lastDir: StepDir = 'h';
      while (s < maxSteps) {
        const remC = (centerC - c) * corner.dc;
        const remR = (centerR - r) * corner.dr;
        if (Math.abs(centerC - c) < stopRadius && Math.abs(centerR - r) < stopRadius) break;

        let dir: StepDir;
        const roll = rand();
        if (roll < 0.3 && remC > 0.5 && remR > 0.5) dir = 'd';
        else if (Math.abs(remC) > Math.abs(remR)) dir = rand() < 0.78 ? 'h' : 'v';
        else dir = rand() < 0.78 ? 'v' : 'h';

        const len = 1 + Math.floor(rand() * 2);
        const next = moveStep(c, r, dir, corner, len);
        if (next.c === c && next.r === r) break;
        c = next.c;
        r = next.r;
        points.push(grid(c, r));
        lastDir = dir;

        // Short branch-stub off the trunk — the "twig" ending in its own
        // glowing point. Direction varies (including counter-diagonals) so
        // it doesn't read as a rigid grid.
        if (rand() > 0.4) {
          const stubRoll = rand();
          const stubLen = 1 + Math.floor(rand() * 2);
          let sc = c;
          let sr = r;
          if (stubRoll < 0.3) {
            sc = clampInt(c + (rand() > 0.5 ? 1 : -1) * stubLen, 0, cols - 1);
            sr = clampInt(r + (rand() > 0.5 ? 1 : -1) * stubLen, 0, rows - 1);
          } else if (stubRoll < 0.65 || lastDir === 'd') {
            sc = clampInt(c + (rand() > 0.5 ? 1 : -1) * stubLen, 0, cols - 1);
          } else {
            sr = clampInt(r + (rand() > 0.5 ? 1 : -1) * stubLen, 0, rows - 1);
          }

          if (sc !== c || sr !== r) {
            const localFrac = s / maxSteps;
            const stubStart = trunkStart + localFrac * (trunkEnd - trunkStart) + 0.02;
            const stubEnd = Math.min(1, stubStart + 0.08 + rand() * 0.1);
            paths.push({
              points: [grid(c, r), grid(sc, sr)],
              window: [Math.min(stubStart, 0.96), Math.min(stubEnd, 1)],
              isNode: true,
              width: 0.045,
            });
          }
        }

        s++;
      }

      paths.push({ points, window: [trunkStart, trunkEnd], isNode: true, width: 0.075 });
    }
  }

  return paths;
}

function makeDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.7)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Builds a flat triangle-strip ribbon around a polyline so trace thickness
 * is a real mesh property (world units, scales properly) instead of relying
 * on GL_LINE_WIDTH, which most platforms clamp to 1px regardless of what's
 * requested. Each pair of ribbon vertices carries the same `aT` arc-length
 * value as its source sample, so the existing reveal/glow shader works
 * unchanged.
 */
function buildRibbon(samples: THREE.Vector3[], halfWidth: number): THREE.BufferGeometry {
  const n = samples.length;
  const positions = new Float32Array(n * 2 * 3);
  const aT = new Float32Array(n * 2);
  const indices: number[] = [];

  for (let i = 0; i < n; i++) {
    const prev = samples[Math.max(0, i - 1)];
    const next = samples[Math.min(n - 1, i + 1)];
    const dir = new THREE.Vector2(next.x - prev.x, next.y - prev.y);
    if (dir.lengthSq() < 1e-8) dir.set(1, 0);
    dir.normalize();
    const perp = new THREE.Vector2(-dir.y, dir.x).multiplyScalar(halfWidth);

    const t = i / (n - 1);
    const li = i * 2;
    positions[li * 3] = samples[i].x + perp.x;
    positions[li * 3 + 1] = samples[i].y + perp.y;
    positions[li * 3 + 2] = 0;
    positions[(li + 1) * 3] = samples[i].x - perp.x;
    positions[(li + 1) * 3 + 1] = samples[i].y - perp.y;
    positions[(li + 1) * 3 + 2] = 0;
    aT[li] = t;
    aT[li + 1] = t;

    if (i < n - 1) {
      const a = li;
      const b = li + 1;
      const c = li + 2;
      const d = li + 3;
      indices.push(a, b, c, b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aT', new THREE.BufferAttribute(aT, 1));
  geometry.setIndex(indices);
  return geometry;
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function CircuitScene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = prefersReducedMotion();

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const VIEW_HEIGHT = 20;
    const aspect = mount.clientWidth / mount.clientHeight || 1;
    const camera = new THREE.OrthographicCamera(
      (-VIEW_HEIGHT * aspect) / 2,
      (VIEW_HEIGHT * aspect) / 2,
      VIEW_HEIGHT / 2,
      -VIEW_HEIGHT / 2,
      0.1,
      100,
    );
    camera.position.z = 10;

    // Size the grid to the actual on-screen viewport (at mount time) so the
    // trace network reaches all four physical corners of the section, and
    // trunks have real ground to cover on the way to the center.
    const spacing = 1.15;
    const gridWidth = VIEW_HEIGHT * aspect * 0.98;
    const gridHeight = VIEW_HEIGHT * 0.98;
    const cols = Math.max(10, Math.round(gridWidth / spacing) + 1);
    const rows = Math.max(8, Math.round(gridHeight / spacing) + 1);
    const paths = buildPaths(cols, rows, spacing);

    // Vivid amber throughout — even the "resting" trace behind the head
    // reads as bright circuit-yellow, not a dim bronze; the head and every
    // branch end brighten further into a near-white-gold point of light.
    const amberDim = new THREE.Color('#f7b500');
    const amberGlow = new THREE.Color('#fff3c4');
    const amberNode = new THREE.Color('#f7b500');

    const meshes: { mesh: THREE.Mesh; window: [number, number] }[] = [];
    const nodes: { sprite: THREE.Sprite; activateAt: number }[] = [];
    const dotTexture = makeDotTexture();

    for (const path of paths) {
      // Resample the polyline into a denser point set so aT (arc-length
      // progress) has enough resolution for a smooth reveal.
      const samples: THREE.Vector3[] = [];
      const segLengths: number[] = [];
      let total = 0;
      for (let i = 0; i < path.points.length - 1; i++) {
        const len = path.points[i].distanceTo(path.points[i + 1]);
        segLengths.push(len);
        total += len;
      }
      const STEPS = Math.max(6, Math.min(40, Math.round(total / (spacing * 0.4))));
      for (let s = 0; s <= STEPS; s++) {
        const target = (s / STEPS) * total;
        let acc = 0;
        for (let i = 0; i < segLengths.length; i++) {
          if (target <= acc + segLengths[i] || i === segLengths.length - 1) {
            const localT = segLengths[i] === 0 ? 0 : (target - acc) / segLengths[i];
            samples.push(new THREE.Vector3().lerpVectors(path.points[i], path.points[i + 1], Math.min(1, localT)));
            break;
          }
          acc += segLengths[i];
        }
      }

      const geometry = buildRibbon(samples, path.width / 2);

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          uProgress: { value: reduced ? 1 : 0 },
          uColor: { value: amberDim },
          uGlowColor: { value: amberGlow },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshes.push({ mesh, window: path.window });

      if (path.isNode) {
        const endPoint = path.points[path.points.length - 1];
        const spriteMat = new THREE.SpriteMaterial({
          map: dotTexture,
          color: amberNode,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.copy(endPoint);
        sprite.scale.set(0.001, 0.001, 1);
        scene.add(sprite);
        nodes.push({ sprite, activateAt: path.window[1] });
      }
    }

    function resize() {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      const a = width / height || 1;
      camera.left = (-VIEW_HEIGHT * a) / 2;
      camera.right = (VIEW_HEIGHT * a) / 2;
      camera.top = VIEW_HEIGHT / 2;
      camera.bottom = -VIEW_HEIGHT / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const clock = new THREE.Clock();
    function tick() {
      const progress = reduced ? 1 : progressRef.current;
      for (const { mesh, window: w } of meshes) {
        const local = THREE.MathUtils.clamp((progress - w[0]) / (w[1] - w[0]), 0, 1);
        (mesh.material as THREE.ShaderMaterial).uniforms.uProgress.value = local;
      }
      const t = clock.getElapsedTime();
      for (const { sprite, activateAt } of nodes) {
        const active = THREE.MathUtils.clamp((progress - activateAt) / 0.04, 0, 1);
        const pulse = active > 0.98 ? 1 + Math.sin(t * 2.4) * 0.08 : 1;
        const scale = active * 0.36 * pulse;
        sprite.scale.set(Math.max(0.001, scale), Math.max(0.001, scale), 1);
        (sprite.material as THREE.SpriteMaterial).opacity = active;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      meshes.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      nodes.forEach(({ sprite }) => (sprite.material as THREE.Material).dispose());
      dotTexture.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [progressRef]);

  return <div ref={mountRef} className="absolute inset-0" />;
}
