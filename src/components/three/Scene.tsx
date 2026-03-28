"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useStore } from "@/store";

// ── Drone camera geometry — aperture ring, sensor plane, propeller arcs
function DroneGeometry({ section }: { section: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const t = useRef(0);

  // Morph rotation targets per section
  const targets = useMemo(() => [
    { rx: 0.1,  ry: 0,    rz: 0,    scale: 1,    y: 0 },    // hero
    { rx: 0.4,  ry: 0.8,  rz: 0.1,  scale: 0.9,  y: 0.2 },  // about
    { rx: -0.2, ry: -0.5, rz: 0.2,  scale: 1.1,  y: -0.1 }, // experience
    { rx: 0.6,  ry: 1.2,  rz: -0.1, scale: 0.95, y: 0.3 },  // work
    { rx: 0.2,  ry: 0.3,  rz: 0,    scale: 1,    y: 0 },     // contact
  ], []);

  const cur = targets[section] ?? targets[0];

  useFrame((_, delta) => {
    t.current += delta;
    if (!groupRef.current) return;
    const g = groupRef.current;
    // Smooth lerp to target rotation
    g.rotation.x += (cur.rx - g.rotation.x) * 0.03;
    g.rotation.y += (cur.ry + t.current * 0.12 - g.rotation.y) * 0.025;
    g.rotation.z += (cur.rz - g.rotation.z) * 0.03;
    const targetScale = cur.scale;
    g.scale.x += (targetScale - g.scale.x) * 0.04;
    g.scale.y += (targetScale - g.scale.y) * 0.04;
    g.scale.z += (targetScale - g.scale.z) * 0.04;
    g.position.y += (cur.y - g.position.y) * 0.03;
  });

  // Latitude/longitude grid lines — like a drone aerial view
  const gridLines = useMemo(() => {
    const lines = [];
    const mat = new THREE.LineBasicMaterial({
      color: 0xb85535,
      transparent: true,
      opacity: 0.12,
    });
    // Longitude rings
    for (let i = 0; i < 16; i++) {
      const pts: THREE.Vector3[] = [];
      const angle = (i / 16) * Math.PI;
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(
          Math.cos(a) * Math.sin(angle),
          Math.cos(angle),
          Math.sin(a) * Math.sin(angle)
        ).multiplyScalar(2.2));
      }
      lines.push(pts);
    }
    // Latitude rings
    for (let i = 1; i < 8; i++) {
      const pts: THREE.Vector3[] = [];
      const lat = ((i / 8) - 0.5) * Math.PI;
      const r = Math.cos(lat) * 2.2;
      const y = Math.sin(lat) * 2.2;
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      lines.push(pts);
    }
    return { lines, mat };
  }, []);

  // Floating particles (elevation markers)
  const particles = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.4;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      {/* Sphere wireframe — aerial globe */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color={0xb85535}
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Grid lines */}
      {gridLines.lines.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(pts.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <primitive object={gridLines.mat} attach="material" />
        </line>
      ))}

      {/* Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={0xb85535}
          size={0.022}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* Inner aperture ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.008, 8, 128]} />
        <meshBasicMaterial color={0xb85535} transparent opacity={0.35} />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.005, 8, 128]} />
        <meshBasicMaterial color={0xb85535} transparent opacity={0.18} />
      </mesh>

      {/* Propeller arc suggestion — 4 arcs at corners */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const x = Math.cos(angle) * 1.9;
        const z = Math.sin(angle) * 1.9;
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.28, 0.006, 8, 64, Math.PI * 1.5]} />
            <meshBasicMaterial color={0x8c7055} transparent opacity={0.28} />
          </mesh>
        );
      })}

      {/* Central lens element */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={0xb85535} transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={0xb85535} wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// ── Topographic contour lines in the background
function TopoLines({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.z += delta * 0.015;
  });

  const color = isDark ? 0xf4efe6 : 0x231a12;

  return (
    <group ref={meshRef} position={[-3, -1, -4]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]}>
          <torusGeometry args={[1.5 + i * 0.6, 0.004, 8, 120]} />
          <meshBasicMaterial color={color} transparent opacity={isDark ? 0.05 : 0.04} />
        </mesh>
      ))}
    </group>
  );
}

// ── Camera smooth lerp
function CameraRig({ section }: { section: number }) {
  const { camera } = useThree();
  const positions = [
    [0, 0, 5],
    [0.3, 0.2, 4.8],
    [-0.2, -0.1, 5.2],
    [0.1, 0.3, 4.6],
    [0, 0, 5],
  ];
  const target = positions[section] ?? positions[0];

  useFrame(() => {
    camera.position.x += (target[0] - camera.position.x) * 0.025;
    camera.position.y += (target[1] - camera.position.y) * 0.025;
    camera.position.z += (target[2] - camera.position.z) * 0.025;
  });

  return null;
}

export default function Scene() {
  const { currentSection, isDark } = useStore();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <CameraRig section={currentSection} />

        {/* Ambient scene light */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#b85535" />

        <DroneGeometry section={currentSection} />
        <TopoLines isDark={isDark} />
      </Canvas>
    </div>
  );
}
