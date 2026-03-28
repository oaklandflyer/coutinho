"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useStore } from "@/store";
import { viewport } from "@/lib/viewport";

// ── Section-specific config: where the sphere lives at each scroll stop
const SECTION_CONFIGS = [
  // hero: large, centered-right, prominent
  { x: 1.0, y: 0,    z: 0,    scale: 1.15, opacity: 1 },
  // about: moves left a touch, slightly smaller
  { x: 0.4, y: 0.3,  z: -0.3, scale: 0.88, opacity: 0.75 },
  // experience: further back, dim
  { x: 1.2, y: -0.3, z: -0.5, scale: 0.78, opacity: 0.55 },
  // work: right side, mid-size
  { x: 0.7, y: 0.2,  z: -0.2, scale: 0.85, opacity: 0.65 },
  // contact: subtle, background
  { x: 0.3, y: -0.2, z: -0.6, scale: 0.7,  opacity: 0.45 },
];

// ── Main sphere — grid + rings + core
function EtherealSphere({ section }: { section: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const opacityRef = useRef(1);

  const cfg = SECTION_CONFIGS[section] ?? SECTION_CONFIGS[0];

  // Build lat/lon grid lines once
  const gridLines = useMemo(() => {
    const R = 2.6;
    const lines: number[][] = [];
    // Longitude arcs (18)
    for (let i = 0; i < 18; i++) {
      const pts: number[] = [];
      const theta = (i / 18) * Math.PI;
      for (let j = 0; j <= 80; j++) {
        const phi = (j / 80) * Math.PI * 2;
        pts.push(
          R * Math.sin(theta) * Math.cos(phi),
          R * Math.cos(theta),
          R * Math.sin(theta) * Math.sin(phi),
        );
      }
      lines.push(pts);
    }
    // Latitude rings (8)
    for (let i = 1; i < 9; i++) {
      const pts: number[] = [];
      const lat = ((i / 9) - 0.5) * Math.PI;
      const r = Math.cos(lat) * R;
      const y = Math.sin(lat) * R;
      for (let j = 0; j <= 80; j++) {
        const phi = (j / 80) * Math.PI * 2;
        pts.push(Math.cos(phi) * r, y, Math.sin(phi) * r);
      }
      lines.push(pts);
    }
    return lines;
  }, []);

  const lineMat = useMemo(() =>
    new THREE.LineBasicMaterial({ color: 0xb85535, transparent: true, opacity: 0.1 }),
  []);

  const wireframeMat = useMemo(() =>
    new THREE.MeshBasicMaterial({ color: 0xb85535, wireframe: true, transparent: true, opacity: 0.032 }),
  []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!groupRef.current) return;
    const g = groupRef.current;
    const t = timeRef.current;

    // Base auto-rotation
    const baseRotY = t * 0.09;

    // Mouse influence (subtle)
    const mouseInfluenceX = viewport.mouseY * 0.18;
    const mouseInfluenceY = viewport.mouseX * 0.22;

    // Lerp position
    g.position.x += (cfg.x - g.position.x) * 0.03;
    g.position.y += (cfg.y - g.position.y) * 0.03;
    g.position.z += (cfg.z - g.position.z) * 0.03;

    // Lerp rotation toward mouse + auto-spin
    const targetRotX = mouseInfluenceX;
    const targetRotY = baseRotY + mouseInfluenceY;
    g.rotation.x += (targetRotX - g.rotation.x) * 0.035;
    g.rotation.y += (targetRotY - g.rotation.y) * 0.018;

    // Scale
    g.scale.setScalar(g.scale.x + (cfg.scale - g.scale.x) * 0.03);

    // Opacity via material traverse
    opacityRef.current += (cfg.opacity - opacityRef.current) * 0.04;
    g.traverse((child) => {
      if ((child as THREE.Mesh).isMesh || (child as THREE.Line).isLine || (child as THREE.Points).isPoints) {
        const mat = (child as THREE.Mesh).material as THREE.Material & { opacity?: number };
        if (mat && mat.opacity !== undefined) {
          mat.opacity = Math.min(mat.opacity / (opacityRef.current || 1) * opacityRef.current, 1);
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[1.0, 0, 0]}>
      {/* Wireframe shell */}
      <mesh material={wireframeMat}>
        <sphereGeometry args={[2.6, 40, 40]} />
      </mesh>

      {/* Grid lines */}
      {gridLines.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(pts), 3]}
            />
          </bufferGeometry>
          <primitive object={lineMat} attach="material" />
        </line>
      ))}

      {/* Inner aperture ring — horizontal */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.008, 8, 128]} />
        <meshBasicMaterial color={0xb85535} transparent opacity={0.5} />
      </mesh>

      {/* Mid ring — tilted 60° */}
      <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[1.95, 0.005, 8, 128]} />
        <meshBasicMaterial color={0xd06b47} transparent opacity={0.28} />
      </mesh>

      {/* Outer ring — vertical */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.6, 0.004, 8, 128]} />
        <meshBasicMaterial color={0xb85535} transparent opacity={0.16} />
      </mesh>

      {/* Outer ring — horizontal */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.003, 8, 128]} />
        <meshBasicMaterial color={0x8c7055} transparent opacity={0.1} />
      </mesh>

      {/* Propeller arc suggestions */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <mesh key={i} position={[Math.cos(angle) * 2.2, 0, Math.sin(angle) * 2.2]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.32, 0.006, 8, 64, Math.PI * 1.4]} />
            <meshBasicMaterial color={0x8c7055} transparent opacity={0.2} />
          </mesh>
        );
      })}

      {/* Central glowing core */}
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={0xd06b47} transparent opacity={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={0xb85535} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// ── Terracotta dust — 700 particles
function DustTerra() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 700;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.006;
    ref.current.rotation.x += delta * 0.0025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={0xb85535} size={0.016} transparent opacity={0.32} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── Cream dust — 400 particles, counter-rotating
function DustCream() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.004;
    ref.current.rotation.z += delta * 0.003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={0xf4efe6} size={0.007} transparent opacity={0.1} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── Slow topo rings, bottom-left background
function TopoRings() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.01;
  });
  return (
    <group ref={ref} position={[-4, -1.8, -6]}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} rotation={[0, 0, (i / 6) * Math.PI * 2]}>
          <torusGeometry args={[1.6 + i * 0.6, 0.003, 6, 120]} />
          <meshBasicMaterial color={0xf4efe6} transparent opacity={0.028} />
        </mesh>
      ))}
    </group>
  );
}

// ── Smooth camera that reacts to scroll + mouse
function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    // Base position drifts with scroll
    const p = viewport.scrollProgress;
    const targetZ = 5.5 - p * 0.6;
    const targetX = 0 + viewport.mouseX * 0.08;
    const targetY = 0 + viewport.mouseY * 0.05;

    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.025;
  });

  return null;
}

export default function Scene() {
  const { currentSection } = useStore();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <CameraRig />
        <ambientLight intensity={0.25} />
        <pointLight position={[3, 4, 3]} intensity={0.6} color="#b85535" />
        <pointLight position={[-4, -2, 2]} intensity={0.15} color="#f4efe6" />

        <DustTerra />
        <DustCream />
        <EtherealSphere section={currentSection} />
        <TopoRings />
      </Canvas>
    </div>
  );
}
