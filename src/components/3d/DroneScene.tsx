"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Drone ───────────────────────────────────────────────── */
function Drone() {
  const groupRef = useRef<THREE.Group>(null);
  const rotorRefs = useRef<(THREE.Mesh | null)[]>([]);

  const motorPositions: [number, number, number][] = [
    [0.68, 0, 0.68],
    [-0.68, 0, 0.68],
    [-0.68, 0, -0.68],
    [0.68, 0, -0.68],
  ];

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
    rotorRefs.current.forEach((r) => {
      if (r) r.rotation.y += delta * 22;
    });
  });

  return (
    <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.45}>
      <group ref={groupRef}>
        {/* ── Body ── */}
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.15, 0.52]} />
          <meshStandardMaterial color="#0c0c18" metalness={0.92} roughness={0.14} />
        </mesh>

        {/* Body top stripe (blue glow) */}
        <mesh position={[0, 0.082, 0]}>
          <boxGeometry args={[0.38, 0.011, 0.27]} />
          <meshStandardMaterial
            color="#4a9eff"
            emissive="#4a9eff"
            emissiveIntensity={0.55}
            metalness={0.4}
            roughness={0.35}
          />
        </mesh>

        {/* Front amber accent strip */}
        <mesh position={[0, 0.01, 0.27]}>
          <boxGeometry args={[0.48, 0.13, 0.01]} />
          <meshStandardMaterial
            color="#c8873a"
            emissive="#c8873a"
            emissiveIntensity={0.18}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* ── Arms (two crossed beams) ── */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2.0, 0.05, 0.1]} />
          <meshStandardMaterial color="#10101e" metalness={0.9} roughness={0.18} />
        </mesh>
        <mesh rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[2.0, 0.05, 0.1]} />
          <meshStandardMaterial color="#10101e" metalness={0.9} roughness={0.18} />
        </mesh>

        {/* ── Motors + Rotors ── */}
        {motorPositions.map((pos, i) => (
          <group key={i} position={pos}>
            {/* Motor */}
            <mesh>
              <cylinderGeometry args={[0.072, 0.065, 0.09, 14]} />
              <meshStandardMaterial color="#1c1c2c" metalness={0.96} roughness={0.07} />
            </mesh>

            {/* Rotor blade disc */}
            <mesh
              ref={(el) => {
                rotorRefs.current[i] = el;
              }}
              position={[0, 0.068, 0]}
            >
              <cylinderGeometry args={[0.25, 0.25, 0.007, 48]} />
              <meshStandardMaterial
                color="#4a9eff"
                transparent
                opacity={0.48}
                emissive="#4a9eff"
                emissiveIntensity={0.65}
                metalness={0.2}
                roughness={0.6}
              />
            </mesh>

            {/* Rotor centre hub */}
            <mesh position={[0, 0.068, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.024, 8]} />
              <meshStandardMaterial color="#2a2a3c" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* LED indicator */}
            <mesh position={[0, -0.052, 0]}>
              <sphereGeometry args={[0.016, 8, 8]} />
              <meshStandardMaterial
                color={i < 2 ? "#4a9eff" : "#c8873a"}
                emissive={i < 2 ? "#4a9eff" : "#c8873a"}
                emissiveIntensity={3.5}
              />
            </mesh>
          </group>
        ))}

        {/* ── Landing gear ── */}
        {([-0.26, 0.26] as number[]).map((x, i) => (
          <group key={i}>
            <mesh position={[x, -0.14, 0]}>
              <boxGeometry args={[0.022, 0.13, 0.022]} />
              <meshStandardMaterial color="#18182a" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[x, -0.205, 0]}>
              <boxGeometry args={[0.038, 0.02, 0.42]} />
              <meshStandardMaterial color="#18182a" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* ── Camera gimbal ── */}
        <mesh position={[0, -0.135, 0.1]}>
          <sphereGeometry args={[0.078, 16, 16]} />
          <meshStandardMaterial color="#0c0c18" metalness={0.82} roughness={0.2} />
        </mesh>
        {/* Lens barrel */}
        <mesh position={[0, -0.135, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.042, 0.042, 0.055, 16]} />
          <meshStandardMaterial color="#1a1a28" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Lens glass */}
        <mesh position={[0, -0.135, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.01, 24]} />
          <meshStandardMaterial
            color="#4a9eff"
            transparent
            opacity={0.82}
            emissive="#1a3a6e"
            emissiveIntensity={0.9}
          />
        </mesh>

        {/* ── Antenna ── */}
        <mesh position={[0.13, 0.16, -0.14]}>
          <cylinderGeometry args={[0.005, 0.004, 0.24, 6]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.13, 0.285, -0.14]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#4a9eff" emissive="#4a9eff" emissiveIntensity={2.5} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Camera ─────────────────────────────────────────────── */
function Camera3D() {
  return (
    <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[2.5, 0.5, -0.7]} rotation={[0.08, -0.55, 0.04]} scale={0.54}>
        {/* Body */}
        <mesh>
          <boxGeometry args={[1.45, 0.98, 0.78]} />
          <meshStandardMaterial color="#0e0e16" metalness={0.82} roughness={0.28} />
        </mesh>

        {/* Pentaprism hump */}
        <mesh position={[-0.16, 0.64, 0]}>
          <boxGeometry args={[0.58, 0.3, 0.75]} />
          <meshStandardMaterial color="#0e0e16" metalness={0.82} roughness={0.28} />
        </mesh>

        {/* Grip */}
        <mesh position={[0.66, -0.08, 0]}>
          <boxGeometry args={[0.22, 0.72, 0.77]} />
          <meshStandardMaterial color="#0e0e16" metalness={0.76} roughness={0.34} />
        </mesh>

        {/* Lens mount ring */}
        <mesh position={[-0.76, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.1, 32]} />
          <meshStandardMaterial color="#1a1a24" metalness={0.92} roughness={0.14} />
        </mesh>

        {/* Outer lens barrel */}
        <mesh position={[-1.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.27, 0.29, 0.74, 32]} />
          <meshStandardMaterial color="#141420" metalness={0.87} roughness={0.19} />
        </mesh>

        {/* Mid lens barrel */}
        <mesh position={[-1.53, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.23, 0.25, 0.38, 32]} />
          <meshStandardMaterial color="#0e0e16" metalness={0.87} roughness={0.19} />
        </mesh>

        {/* Lens glass */}
        <mesh position={[-1.73, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.19, 0.19, 0.02, 32]} />
          <meshStandardMaterial
            color="#4a9eff"
            metalness={0.2}
            roughness={0.05}
            transparent
            opacity={0.88}
            emissive="#1a3a6e"
            emissiveIntensity={0.9}
          />
        </mesh>

        {/* Lens glass inner */}
        <mesh position={[-1.725, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.025, 24]} />
          <meshStandardMaterial
            color="#060e22"
            transparent
            opacity={0.92}
            emissive="#0a1a4a"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Shutter button */}
        <mesh position={[0.3, 0.52, 0.27]}>
          <cylinderGeometry args={[0.052, 0.052, 0.04, 12]} />
          <meshStandardMaterial color="#c8873a" emissive="#c8873a" emissiveIntensity={0.35} />
        </mesh>

        {/* Mode dial */}
        <mesh position={[-0.22, 0.52, 0.18]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
          <meshStandardMaterial color="#1a1a24" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* AF light */}
        <mesh position={[-0.42, 0.22, 0.4]}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshStandardMaterial color="#4a9eff" emissive="#4a9eff" emissiveIntensity={2.2} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Floating background geometry ───────────────────────── */
function BackgroundShapes() {
  const shapes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        pos: [
          (Math.random() - 0.5) * 13,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4 - 3,
        ] as [number, number, number],
        rot: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0] as [
          number,
          number,
          number,
        ],
        scale: 0.045 + Math.random() * 0.085,
        speed: 0.14 + Math.random() * 0.28,
        phase: Math.random() * Math.PI * 2,
        type: i % 3,
        color: i % 2 === 0 ? "#4a9eff" : "#c8873a",
      })),
    [],
  );

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const s = shapes[i];
      m.position.y = s.pos[1] + Math.sin(state.clock.elapsedTime * s.speed + s.phase) * 0.28;
      m.rotation.x += 0.004;
      m.rotation.z += 0.003;
    });
  });

  return (
    <>
      {shapes.map((s, i) => (
        <mesh
          key={s.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={s.pos}
          rotation={s.rot}
          scale={s.scale}
        >
          {s.type === 0 && <octahedronGeometry args={[1, 0]} />}
          {s.type === 1 && <boxGeometry args={[1, 1, 1]} />}
          {s.type === 2 && <tetrahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color={s.color}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.13}
            wireframe
          />
        </mesh>
      ))}
    </>
  );
}

/* ─── Scene root ─────────────────────────────────────────── */
export default function DroneScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.9, 5.8], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.22} />
      <pointLight position={[4, 4, 5]} intensity={1.8} color="#4a9eff" />
      <pointLight position={[-4, -2, 2]} intensity={0.9} color="#c8873a" />
      <pointLight position={[0, -3, 4]} intensity={1.1} />
      <spotLight
        position={[1, 6, 3]}
        intensity={1.8}
        angle={0.55}
        penumbra={0.85}
        color="#ffffff"
      />

      <BackgroundShapes />
      <Drone />
      <Camera3D />

      <Sparkles
        count={70}
        size={0.55}
        speed={0.22}
        opacity={0.32}
        color="#4a9eff"
        scale={[12, 8, 6]}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.45}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 0.65}
      />
    </Canvas>
  );
}
