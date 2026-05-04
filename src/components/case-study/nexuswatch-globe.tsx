"use client";

import { useEffect, useRef } from "react";
import type * as THREE_TYPES from "three";

interface Props {
  size?: number;
  density?: number;
}

export function NexusWatchGlobe({ size = 320, density = 36 }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const mount = mountRef.current;
      if (!mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 3.2;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const sphereGeo = new THREE.SphereGeometry(1, 32, 24);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x8ecfe8,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      scene.add(sphere);

      const dotGeometry = new THREE.SphereGeometry(0.018, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x8ecfe8 });
      const dots: { mesh: THREE_TYPES.Mesh; phase: number }[] = [];
      for (let i = 0; i < density; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);
        const dot = new THREE.Mesh(dotGeometry, dotMat.clone());
        dot.position.set(x, y, z);
        scene.add(dot);
        dots.push({ mesh: dot, phase: Math.random() * Math.PI * 2 });
      }

      let raf = 0;
      const start = performance.now();
      const tick = () => {
        const t = (performance.now() - start) / 1000;
        if (!reduced) sphere.rotation.y = t * 0.15;
        for (const d of dots) {
          const m = d.mesh.material as THREE_TYPES.MeshBasicMaterial;
          m.opacity = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + d.phase));
          m.transparent = true;
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        renderer.dispose();
        sphereGeo.dispose();
        sphereMat.dispose();
        dotGeometry.dispose();
        for (const d of dots) (d.mesh.material as THREE_TYPES.Material).dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    })();

    return () => { cleanup?.(); };
  }, [size, density]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
