"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useStore } from "@/store";
import { viewport } from "@/lib/viewport";

// ── Section configs: where the globe lives per section ──
const SECTION_CONFIGS = [
  // hero: large, right-center, prominent
  { x: 1.1,  y: 0.05, z: 0,    scale: 1.15, opacity: 1    },
  // about: moves left, slightly smaller
  { x: 0.5,  y: 0.3,  z: -0.2, scale: 0.9,  opacity: 0.75 },
  // experience: further back, dim
  { x: 1.3,  y: -0.2, z: -0.5, scale: 0.78, opacity: 0.5  },
  // work: right side mid
  { x: 0.8,  y: 0.2,  z: -0.2, scale: 0.85, opacity: 0.6  },
  // contact: subtle background
  { x: 0.3,  y: -0.2, z: -0.7, scale: 0.7,  opacity: 0.4  },
];

// ── 11 visited countries (lat/lon) mapped to globe surface ─
const VISITED_COUNTRIES: Array<[number, number]> = [
  [40.4, -79.9],   // USA (Pittsburgh)
  [51.5, -0.1],    // UK (London)
  [-3.4, 36.7],    // Tanzania (Arusha)
  [46.2,  6.1],    // Switzerland (Geneva / WEF)
  [48.9,  2.3],    // France (Paris)
  [-30.6, 22.9],   // South Africa
  [-1.3, 36.8],    // Kenya (Nairobi)
  [-15.8, -47.9],  // Brazil (Brasília)
  [51.2,  10.5],   // Germany
  [35.7, 139.7],   // Japan (Tokyo)
  [20.6,  79.1],   // India
];

function latLonToVec3(lat: number, lon: number, r: number): [number, number, number] {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  ];
}

// ── Amber/gold wireframe globe with lat/lon grid ──────────
function GlobeWireframe({ section }: { section: number }) {
  const groupRef  = useRef<THREE.Group>(null);
  const timeRef   = useRef(0);
  const opacityRef = useRef(1);

  const cfg = SECTION_CONFIGS[section] ?? SECTION_CONFIGS[0];

  const R = 2.6;

  // Build lat/lon grid lines in amber/gold
  const gridLines = useMemo(() => {
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
    // Latitude rings (9)
    for (let i = 1; i < 10; i++) {
      const pts: number[] = [];
      const lat = ((i / 10) - 0.5) * Math.PI;
      const r   = Math.cos(lat) * R;
      const y   = Math.sin(lat) * R;
      for (let j = 0; j <= 80; j++) {
        const phi = (j / 80) * Math.PI * 2;
        pts.push(Math.cos(phi) * r, y, Math.sin(phi) * r);
      }
      lines.push(pts);
    }
    return lines;
  }, []);

  // Shared amber grid material
  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: 0xc8873a, transparent: true, opacity: 0.14 }),
    []
  );

  // Wireframe shell material
  const shellMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xc8873a, wireframe: true, transparent: true, opacity: 0.03 }),
    []
  );

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!groupRef.current) return;
    const g = groupRef.current;
    const t = timeRef.current;

    // Auto-rotation + mouse influence
    const targetRotX = viewport.mouseY * 0.16;
    const targetRotY = t * 0.08 + viewport.mouseX * 0.22;

    g.position.x += (cfg.x - g.position.x) * 0.03;
    g.position.y += (cfg.y - g.position.y) * 0.03;
    g.position.z += (cfg.z - g.position.z) * 0.03;

    g.rotation.x += (targetRotX - g.rotation.x) * 0.035;
    g.rotation.y += (targetRotY - g.rotation.y) * 0.018;

    g.scale.setScalar(g.scale.x + (cfg.scale - g.scale.x) * 0.03);

    // Fade opacity on section change
    opacityRef.current += (cfg.opacity - opacityRef.current) * 0.04;
    const o = opacityRef.current;
    g.traverse((child) => {
      const mat = (child as THREE.Mesh).material as THREE.Material & { opacity?: number } | undefined;
      if (mat && typeof mat.opacity === "number") {
        // Scale relative opacity by section opacity
        mat.opacity = Math.min((mat.opacity / Math.max(opacityRef.current + 0.001, 0.001)) * o, 1);
      }
    });
  });

  const countryPositions = useMemo(
    () => VISITED_COUNTRIES.map(([lat, lon]) => latLonToVec3(lat, lon, R)),
    []
  );

  return (
    <group ref={groupRef} position={[1.1, 0.05, 0]}>

      {/* Wireframe sphere shell */}
      <mesh material={shellMat}>
        <sphereGeometry args={[R, 40, 40]} />
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

      {/* Inner aperture ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.007, 8, 128]} />
        <meshBasicMaterial color={0xc8873a} transparent opacity={0.45} />
      </mesh>

      {/* Mid tilted ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[1.95, 0.005, 8, 128]} />
        <meshBasicMaterial color={0xd4953f} transparent opacity={0.25} />
      </mesh>

      {/* Outer ring — vertical */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[R, 0.004, 8, 128]} />
        <meshBasicMaterial color={0xc8873a} transparent opacity={0.14} />
      </mesh>

      {/* Outer ring — horizontal */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.003, 8, 128]} />
        <meshBasicMaterial color={0xa06828} transparent opacity={0.1} />
      </mesh>

      {/* Country dot markers (glowing sky-blue) */}
      {countryPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Glow halo */}
          <mesh>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial color={0x4a9eff} transparent opacity={0.18} />
          </mesh>
          {/* Core dot */}
          <mesh>
            <sphereGeometry args={[0.034, 8, 8]} />
            <meshBasicMaterial color={0x4a9eff} transparent opacity={0.9} />
          </mesh>
        </group>
      ))}

      {/* Central glowing core */}
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={0xc8873a} transparent opacity={0.14} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={0xd4953f} wireframe transparent opacity={0.28} />
      </mesh>

    </group>
  );
}

// ── Amber dust particles ─────────────────────────────────
function DustAmber() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 600;
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
    ref.current.rotation.x += delta * 0.0022;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={0xc8873a} size={0.015} transparent opacity={0.28} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── Faint blue/neutral counter-rotating dust ────────────
function DustBlue() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 350;
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
      <pointsMaterial color={0x4a9eff} size={0.007} transparent opacity={0.08} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── Topo concentric rings, bottom-left ──────────────────
function TopoRings() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.009;
  });
  return (
    <group ref={ref} position={[-4, -2, -6]}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} rotation={[0, 0, (i / 6) * Math.PI * 2]}>
          <torusGeometry args={[1.6 + i * 0.6, 0.003, 6, 120]} />
          <meshBasicMaterial color={0xc8873a} transparent opacity={0.022} />
        </mesh>
      ))}
    </group>
  );
}

// ── Camera rig — follows scroll + mouse ─────────────────
function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    const p = viewport.scrollProgress;
    const targetZ = 5.5 - p * 0.6;
    const targetX = viewport.mouseX * 0.08;
    const targetY = viewport.mouseY * 0.05;

    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.025;
  });

  return null;
}

// ── Root scene component ─────────────────────────────────
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
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 4, 3]}   intensity={0.55} color="#c8873a" />
        <pointLight position={[-4, -2, 2]} intensity={0.15} color="#4a9eff" />

        <DustAmber />
        <DustBlue />
        <GlobeWireframe section={currentSection} />
        <TopoRings />
      </Canvas>
    </div>
  );
}
