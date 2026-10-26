'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Color,
  DoubleSide,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  PerspectiveCamera,
  PlaneGeometry,
  Scene as ThreeScene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';
import { prefersReducedMotion } from '@/lib/useParallax';
import { PetalsFallback } from './PetalsFallback';

/*
 * Falling bouquet petals (and a few leaves), tied to the scroll.
 *
 * Every petal is one instance of a bent plane; position, spin and flutter are
 * computed on the GPU from a per-instance seed, so the CPU only updates four
 * uniforms per frame.
 *
 * Scroll response:
 * - scrolling down pushes the petals down faster and the wind blows right;
 * - scrolling up lifts them back up and the wind blows left;
 * - no scroll: a slow, calm fall.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uVel;
  uniform vec2 uField;

  attribute vec4 aSeed;   // x, y, z, phase
  attribute vec3 aColor;
  attribute float aScale;
  attribute float aKind;  // 0 = petal, 1 = leaf

  varying vec2 vUv;
  varying vec3 vColor;
  varying float vKind;
  varying float vLight;

  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }
  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c,s,0., -s,c,0., 0.,0.,1.); }

  void main() {
    vUv = uv;
    vColor = aColor;
    vKind = aKind;

    float phase = aSeed.w;
    float depth = (aSeed.z + 3.0) / 6.0; // 0 far … 1 near

    // Cup the petal: edges curl towards the viewer and flutter.
    vec3 p = position;
    float flutter = sin(uTime * 2.2 + phase * 6.0 + p.y * 3.0) * 0.08;
    p.z += (p.x * p.x) * 0.9 + flutter;
    p.z -= (p.y * p.y) * 0.25 * (1.0 - aKind);
    p *= aScale;

    // Spin: time plus scroll, and the wind tilts the petal.
    float spin = uTime * (0.25 + fract(phase * 7.0) * 0.5) + uScroll * 0.0015;
    mat3 r = rotZ(phase * 6.283 + spin * 0.6 + uVel * 0.6)
           * rotX(phase * 3.0 + spin)
           * rotY(phase * 5.0 + spin * 0.7);
    vec3 rotated = r * p;
    vLight = 0.72 + 0.28 * abs((r * vec3(0.0, 0.0, 1.0)).z);

    // Fall: calm drift over time, plus the scroll itself (signed), wrapped.
    float fall = uTime * (0.18 + depth * 0.22) + uScroll * (0.0018 + depth * 0.0024);
    float y = mod(aSeed.y - fall + uField.y * 0.5, uField.y) - uField.y * 0.5;

    // Wind: sways gently, and blows in the scroll direction.
    float x = aSeed.x
            + sin(uTime * 0.45 + phase * 6.283) * 0.35
            + uVel * (0.6 + depth * 1.2);
    x = mod(x + uField.x * 0.5, uField.x) - uField.x * 0.5;

    vec3 world = rotated + vec3(x, y, aSeed.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(world, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uAlpha;

  varying vec2 vUv;
  varying vec3 vColor;
  varying float vKind;
  varying float vLight;

  void main() {
    vec2 p = vUv * 2.0 - 1.0; // -1..1, y up

    float alpha;
    vec3 col;

    if (vKind < 0.5) {
      // Rose petal: wide at the top with a soft notch, narrowing to the base.
      float w = 0.62 * (1.0 + p.y * 0.42);
      float d = length(vec2(p.x / max(w, 0.05), p.y));
      float notch = 1.0 - smoothstep(0.0, 0.22, length(vec2(p.x * 1.6, p.y - 1.02)));
      alpha = (1.0 - smoothstep(0.86, 0.98, d)) * (1.0 - notch);
      // Deeper at the base, lighter and slightly translucent at the rim.
      col = mix(vColor * 0.78, vColor * 1.08, smoothstep(-0.9, 0.7, p.y));
      col = mix(col, vec3(1.0, 0.97, 0.94), smoothstep(0.55, 0.95, d) * 0.25);
    } else {
      // Leaf: almond shape with a central vein.
      float w = 0.42 * (1.0 - p.y * p.y);
      alpha = 1.0 - smoothstep(w - 0.04, w + 0.02, abs(p.x));
      float vein = 1.0 - smoothstep(0.0, 0.035, abs(p.x));
      col = mix(vColor, vColor * 1.25, vein * 0.6);
    }

    if (alpha < 0.02) discard;
    gl_FragColor = vec4(col * vLight, alpha * uAlpha);
  }
`;

// Dried-bouquet tones: blush, dusty rose, ivory, ochre roses, and some greenery.
const PETAL_COLORS = ['#e7b4b0', '#d48f92', '#f1d9cf', '#fbf1e4', '#b86b74', '#e2b768'];
const LEAF_COLORS = ['#6f9c6a', '#4f7d55'];

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Scene({ className = '' }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (!hasWebGL()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off capability check
      setFailed(true);
      return;
    }

    const reduced = prefersReducedMotion();
    const small = window.innerWidth < 768;
    const count = small ? 36 : 80;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);

    const scene = new ThreeScene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const geometry = new PlaneGeometry(1, 1.25, 6, 6);
    const seeds = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const kinds = new Float32Array(count);
    const color = new Color();

    // Deterministic pseudo-random, so the layout is identical on every visit.
    let s = 7;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };

    for (let i = 0; i < count; i++) {
      const leaf = rand() < 0.16;
      seeds.set([(rand() - 0.5) * 16, (rand() - 0.5) * 10, (rand() - 0.5) * 6, rand()], i * 4);
      const palette = leaf ? LEAF_COLORS : PETAL_COLORS;
      color.set(palette[Math.floor(rand() * palette.length)]);
      colors.set([color.r, color.g, color.b], i * 3);
      scales[i] = (leaf ? 0.32 : 0.26) + rand() * 0.22;
      kinds[i] = leaf ? 1 : 0;
    }

    geometry.setAttribute('aSeed', new InstancedBufferAttribute(seeds, 4));
    geometry.setAttribute('aColor', new InstancedBufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new InstancedBufferAttribute(scales, 1));
    geometry.setAttribute('aKind', new InstancedBufferAttribute(kinds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uVel: { value: 0 },
      uField: { value: [16, 10] as [number, number] },
      uAlpha: { value: 0 },
    };

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });

    const mesh = new InstancedMesh(geometry, material, count);
    const identity = new Matrix4();
    for (let i = 0; i < count; i++) mesh.setMatrixAt(i, identity);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Visible field at z=0, with margin so petals enter from off-screen.
      const fieldH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      uniforms.uField.value = [fieldH * camera.aspect + 3, fieldH + 3];
    };
    resize();

    setReady(true);

    if (reduced) {
      // Single still frame, no listeners, no loop.
      uniforms.uTime.value = 4;
      uniforms.uAlpha.value = 1;
      renderer.render(scene, camera);
      return () => {
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    let targetScroll = window.scrollY;
    let lastTarget = targetScroll;
    let smoothScroll = targetScroll;
    let velocity = 0;
    let raf = 0;
    let last = performance.now();
    let inView = true;

    const onScroll = () => {
      targetScroll = window.scrollY;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Signed scroll delta → smoothed velocity (−1 … 1). Lerp, so a change
      // of direction eases through zero instead of snapping.
      const delta = targetScroll - lastTarget;
      lastTarget = targetScroll;
      const impulse = Math.max(-1, Math.min(1, delta / 30));
      velocity += (impulse - velocity) * 0.06;
      smoothScroll += (targetScroll - smoothScroll) * 0.08;

      uniforms.uTime.value += dt;
      uniforms.uScroll.value = smoothScroll;
      uniforms.uVel.value = velocity;
      uniforms.uAlpha.value = Math.min(1, uniforms.uAlpha.value + dt * 0.8);
      renderer.render(scene, camera);
    };

    const start = () => {
      if (raf || !inView || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    observer.observe(host);

    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  if (failed) return <PetalsFallback className={className} />;

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`transition-opacity duration-[1500ms] ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
}
