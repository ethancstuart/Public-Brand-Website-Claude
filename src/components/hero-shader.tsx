"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;

vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  vec2 m = uMouse;

  float d = distance(uv, m);
  float infl = exp(-d * 6.0);

  float n1 = snoise(uv * 1.6 + vec2(uTime * 0.04, uTime * 0.03));
  float n2 = snoise(uv * 2.8 - vec2(uTime * 0.05, uTime * 0.07));
  float field = (n1 * 0.65 + n2 * 0.35) * 0.5 + 0.5;

  vec3 paper  = vec3(0.847, 0.831, 0.800);
  vec3 arctic = vec3(0.557, 0.812, 0.910);
  vec3 indigo = vec3(0.545, 0.447, 0.847);

  vec3 col = mix(arctic, indigo, field);
  col = mix(col, paper, smoothstep(0.65, 1.0, field));

  col += infl * 0.18;

  float vig = smoothstep(1.4, 0.4, distance(uv, vec2(0.5, 0.5)));
  vec3 bg = vec3(0.024, 0.024, 0.031);
  col = mix(bg, col, vig * 0.55);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function HeroShader() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { Renderer, Program, Mesh, Triangle } = await import("ogl");
      const mount = mountRef.current;
      if (!mount) return;

      const renderer = new Renderer({ alpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio, 1.5) });
      const gl = renderer.gl;
      gl.clearColor(0.024, 0.024, 0.031, 1);
      mount.appendChild(gl.canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: [0.5, 0.5] },
          uResolution: { value: [1, 1] },
        },
      });
      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [w, h];
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      let mouseX = 0.5, mouseY = 0.5;
      const onMove = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = 1 - (e.clientY - rect.top) / rect.height;
      };
      window.addEventListener("pointermove", onMove);

      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      io.observe(mount);

      const start = performance.now();
      const tick = () => {
        if (visible) {
          program.uniforms.uTime.value = (performance.now() - start) / 1000;
          program.uniforms.uMouse.value[0] += (mouseX - program.uniforms.uMouse.value[0]) * 0.05;
          program.uniforms.uMouse.value[1] += (mouseY - program.uniforms.uMouse.value[1]) * 0.05;
          renderer.render({ scene: mesh });
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        if (mount.contains(gl.canvas)) mount.removeChild(gl.canvas);
      };
    })();

    return () => { cleanup?.(); };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{ opacity: 0.55 }}
    />
  );
}
