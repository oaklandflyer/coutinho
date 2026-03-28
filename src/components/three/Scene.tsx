"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useStore } from "@/store";

// ── Atmospheric dust — 600 scattered particles
function DustCloud() {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Wide spread across the scene
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      sz[i] = Math.random() * 0.012 + 0.004;
    }
    return [pos, sz];
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.008;
    ref.current.rotation.x += delta * 0.003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color={0xb85535}
        size={0.018}
        transparent
        opacity={0.38}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Secondary cream-toned dust layer
function DustLayerCream() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.005;
    ref.current.rotation.z += delta * 0.004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={0xf4efe6}
        size={0.009}
        transparent
        opacity={0.12}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Ethereal sphere — grid lines on a globe
function EtherealSphere({ section }: { section: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const t = useRef(0);

  const targets = useMemo(() => [
    { rx: 0.08, ry: 0,    rz: 0,    scale: 1,    y: 0,    x: 1.0 },
    { rx: 0.35, ry: 0.7,  rz: 0.08, scale: 0.88, y: 0.2,  x: 0.8 },
    { rx: -0.15, ry: -0.4, rz: 0.18, scale: 1.05, y: -0.1, x: 1.2 },
    { rx: 0.5,  ry: 1.1,  rz: -0.1, scale: 0.92, y: 0.25, x: 0.9 },
    { rx: 0.15, ry: 0.2,  rz: 0,    scale: 1,    y: 0,    x: 1.0 },
  ], []);

  const cur = targets[section] ?? targets[0];

  useFrame((_, delta) => {
    t.current += delta;
    if (!groupRef.current) return;
    const g = groupRef.current;
    g.rotation.x += (cur.rx - g.rotation.x) * 0.028;
    g.rotation.y += (cur.ry + t.current * 0.1 - g.rotation.y) * 0.022;
    g.rotation.z += (cur.rz - g.rotation.z) * 0.028;
    g.scale.setScalar(g.scale.x + (cur.scale - g.scale.x) * 0.035);
    g.position.y += (cur.y - g.position.y) * 0.028;
    g.position.x += (cur.x - g.position.x) * 0.028;
  });

  // Latitude / longitude grid
  const gridLines = useMemo(() => {
    const R = 2.1;
    const lines: THREE.Vector3[][] = [];
    // Longitude arcs
    for (let i = 0; i < 18; i++) {
      const pts: THREE.Vector3[] = [];
      const theta = (i / 18) * Math.PI;
      for (let j = 0; j <= 80; j++) {
        const phi = (j / 80) * Math.PI * 2;
        pts.push(new THREE.Vector3(
          R * Math.sin(theta) * Math.cos(phi),
          R * Math.cos(theta),
          R * Math.sin(theta) * Math.sin(phi),
        ));
      }
      lines.push(pts);
    }
    // Latitude rings
    for (let i = 1; i < 9; i++) {
      const pts: THREE.Vector3[] = [];
      const lat = ((i / 9) - 0.5) * Math.PI;
      const r = Math.cos(lat) * R;
      const y = Math.sin(lat) * R;
      for (let j = 0; j <= 80; j++) {
        const phi = (j / 80) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r));
      }
      lines.push(pts);
    }
    return lines;
  }, []);

  const lineMat = useMemo(() =>
    new THREE.LineBasicMaterial({ color: 0xb85535, transparent: true, opacity: 0.11 }),
  []);

  return (
    <group ref={groupRef} position={[1.0, 0, 0]}>
      {/* Wireframe shell */}
      <mesh>
        <sphereGeometry args={[2.1, 36, 36]} />
        <meshBasicMaterial color={0xb85535} wireframe transparent opacity={0.035} />
      </mesh>

      {/* Grid lines */}
      {gridLines.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(pts.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <primitive object={lineMat} attach="material" />
        </line>
      ))}

      {/* Inner aperture ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.007, 8, 128]} />
        <meshBasicMaterial color={0xb85535} transparent opacity={0.42} />
      </mesh>

      {/* Mid ring — tilted */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.68, 0.004, 8, 128]} />
        <meshBasicMaterial color={0xd06b47} transparent opacity={0.22} />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.004, 8, 128]} />
        <meshBasicMaterial color={0xb85535} transparent opacity={0.14} />
      </mesh>

      {/* Propeller suggestion arcs */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.85, 0, Math.sin(angle) * 1.85]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.26, 0.005, 8, 64, Math.PI * 1.4]} />
            <meshBasicMaterial color={0x8c7055} transparent opacity={0.22} />
          </mesh>
        );
      })}

      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color={0xb85535} transparent opacity={0.07} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color={0xb85535} wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

// ── Drifting topo rings in the far background
function TopoRings() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.012;
  });

  return (
    <group ref={ref} position={[-3.5, -1.2, -5]}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} rotation={[0, 0, (i / 6) * Math.PI * 2]}>
          <torusGeometry args={[1.4 + i * 0.55, 0.003, 6, 120]} />
          <meshBasicMaterial color={0xf4efe6} transparent opacity={0.032} />
        </mesh>
      ))}
    </group>
  );
}

// ── Camera smooth lerp to section-specific positions
function CameraRig({ section }: { section: number }) {
  const { camera } = useThree();
  const positions: [number, number, number][] = [
    [0,    0,    5.2],
    [0.25, 0.18, 5.0],
    [-0.15, -0.08, 5.4],
    [0.1,  0.28, 4.8],
    [0,    0,    5.2],
  ];
  const target = positions[section] ?? positions[0];

  useFrame(() => {
    camera.position.x += (target[0] - camera.position.x) * 0.022;
    camera.position.y += (target[1] - camera.position.y) * 0.022;
    camera.position.z += (target[2] - camera.position.z) * 0.022;
  });

  return null;
}

export default function Scene() {
  const { currentSection } = useStore();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <CameraRig section={currentSection} />
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]} intensity={0.5} color="#b85535" />

        <DustCloud />
        <DustLayerCream />
        <EtherealSphere section={currentSection} />
        <TopoRings />
      </Canvas>
    </div>
  );
}
