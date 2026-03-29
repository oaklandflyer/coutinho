"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── Camera path (one waypoint per section) ──────────────────
   The camera orbits around the models at [0,0,0].
   Each position is a different viewing angle of the same subject.
──────────────────────────────────────────────────────────────── */
const WAYPOINTS = [
  new THREE.Vector3(0,     0.5,  5.8),   // 0 Hero    – straight ahead
  new THREE.Vector3(4.5,   1.5,  3.0),   // 1 About   – upper right
  new THREE.Vector3(1.5,   4.2,  2.2),   // 2 Skills  – overhead
  new THREE.Vector3(-4.5,  1.0,  2.5),   // 3 Exp     – left side
  new THREE.Vector3(-2.0, -2.8, 4.2),    // 4 Work    – lower left
  new THREE.Vector3(0,    -0.8,  6.5),   // 5 Contact – pulled back
];

const CURVE = new THREE.CatmullRomCurve3(WAYPOINTS, false, "catmullrom", 0.4);

/* ─── Camera rig ──────────────────────────────────────────────
   Reads window.scrollY directly — no React state, no re-renders.
──────────────────────────────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const cameraTarget  = useRef(WAYPOINTS[0].clone());
  const mouse         = useRef({ x: 0, y: 0 });
  const lookTarget    = useRef(new THREE.Vector3());
  const tmpVec        = useRef(new THREE.Vector3());

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = total > 0 ? Math.min(window.scrollY / total, 1) : 0;
    };
    const onMouse = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 0.5;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mouse.current.x =  (e.touches[0].clientX / window.innerWidth  - 0.5) * 0.3;
      mouse.current.y = -(e.touches[0].clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch,  { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  useFrame(() => {
    const p = Math.min(Math.max(scrollProgress.current, 0), 1);
    CURVE.getPoint(p, tmpVec.current);

    // Smooth camera position
    cameraTarget.current.lerp(tmpVec.current, 0.055);
    camera.position.copy(cameraTarget.current);

    // Smooth lookAt with mouse parallax
    lookTarget.current.lerp(
      new THREE.Vector3(mouse.current.x * 0.6, mouse.current.y * 0.5, 0),
      0.04,
    );
    camera.lookAt(lookTarget.current);
  });

  return null;
}

/* ─── Starfield ────────────────────────────────────────────── */
function Starfield() {
  const { positions, sizes } = useMemo(() => {
    const count = 1200;
    const pos   = new Float32Array(count * 3);
    const sz    = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 22 + Math.random() * 20;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.04 + Math.random() * 0.08;
    }
    return { positions: pos, sizes: sz };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={1200} itemSize={3} />
        <bufferAttribute attach="attributes-size"     array={sizes}     count={1200} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#e8e4dd" transparent opacity={0.38} sizeAttenuation />
    </points>
  );
}

/* ─── Nebula glow masses ───────────────────────────────────── */
function Nebulae() {
  return (
    <>
      <mesh position={[16, 4, -18]}>
        <sphereGeometry args={[14, 6, 6]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.014} side={THREE.BackSide} />
      </mesh>
      <mesh position={[-20, -3, -14]}>
        <sphereGeometry args={[12, 6, 6]} />
        <meshBasicMaterial color="#c8873a" transparent opacity={0.011} side={THREE.BackSide} />
      </mesh>
      <mesh position={[2, -15, -10]}>
        <sphereGeometry args={[10, 6, 6]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.009} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

/* ─── Drone ────────────────────────────────────────────────── */
function Drone() {
  const groupRef  = useRef<THREE.Group>(null);
  const rotorRefs = useRef<(THREE.Mesh | null)[]>([]);

  const motorPositions: [number, number, number][] = [
    [ 0.68, 0,  0.68],
    [-0.68, 0,  0.68],
    [-0.68, 0, -0.68],
    [ 0.68, 0, -0.68],
  ];

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
    rotorRefs.current.forEach((r) => { if (r) r.rotation.y += delta * 22; });
  });

  return (
    <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.45}>
      <group ref={groupRef}>
        {/* Body */}
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.15, 0.52]} />
          <meshStandardMaterial color="#0c0c18" metalness={0.92} roughness={0.14} />
        </mesh>
        {/* Top stripe */}
        <mesh position={[0, 0.082, 0]}>
          <boxGeometry args={[0.38, 0.011, 0.27]} />
          <meshStandardMaterial color="#4a9eff" emissive="#4a9eff" emissiveIntensity={0.55} metalness={0.4} roughness={0.35} />
        </mesh>
        {/* Front amber strip */}
        <mesh position={[0, 0.01, 0.27]}>
          <boxGeometry args={[0.48, 0.13, 0.01]} />
          <meshStandardMaterial color="#c8873a" emissive="#c8873a" emissiveIntensity={0.18} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Arms */}
        <mesh rotation={[0,  Math.PI / 4, 0]}>
          <boxGeometry args={[2.0, 0.05, 0.1]} />
          <meshStandardMaterial color="#10101e" metalness={0.9} roughness={0.18} />
        </mesh>
        <mesh rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[2.0, 0.05, 0.1]} />
          <meshStandardMaterial color="#10101e" metalness={0.9} roughness={0.18} />
        </mesh>
        {/* Motors + rotors */}
        {motorPositions.map((pos, i) => (
          <group key={i} position={pos}>
            <mesh>
              <cylinderGeometry args={[0.072, 0.065, 0.09, 14]} />
              <meshStandardMaterial color="#1c1c2c" metalness={0.96} roughness={0.07} />
            </mesh>
            <mesh ref={(el) => { rotorRefs.current[i] = el; }} position={[0, 0.068, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.007, 48]} />
              <meshStandardMaterial color="#4a9eff" transparent opacity={0.48} emissive="#4a9eff" emissiveIntensity={0.65} metalness={0.2} roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.068, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.024, 8]} />
              <meshStandardMaterial color="#2a2a3c" metalness={0.9} roughness={0.1} />
            </mesh>
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
        {/* Landing gear */}
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
        {/* Gimbal */}
        <mesh position={[0, -0.135, 0.1]}>
          <sphereGeometry args={[0.078, 16, 16]} />
          <meshStandardMaterial color="#0c0c18" metalness={0.82} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.135, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.042, 0.042, 0.055, 16]} />
          <meshStandardMaterial color="#1a1a28" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.135, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.01, 24]} />
          <meshStandardMaterial color="#4a9eff" transparent opacity={0.82} emissive="#1a3a6e" emissiveIntensity={0.9} />
        </mesh>
        {/* Antenna */}
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

/* ─── Camera model ─────────────────────────────────────────── */
function Camera3D() {
  return (
    <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[2.5, 0.5, -0.7]} rotation={[0.08, -0.55, 0.04]} scale={0.54}>
        <mesh>
          <boxGeometry args={[1.45, 0.98, 0.78]} />
          <meshStandardMaterial color="#0e0e16" metalness={0.82} roughness={0.28} />
        </mesh>
        <mesh position={[-0.16, 0.64, 0]}>
          <boxGeometry args={[0.58, 0.3, 0.75]} />
          <meshStandardMaterial color="#0e0e16" metalness={0.82} roughness={0.28} />
        </mesh>
        <mesh position={[0.66, -0.08, 0]}>
          <boxGeometry args={[0.22, 0.72, 0.77]} />
          <meshStandardMaterial color="#0e0e16" metalness={0.76} roughness={0.34} />
        </mesh>
        <mesh position={[-0.76, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.1, 32]} />
          <meshStandardMaterial color="#1a1a24" metalness={0.92} roughness={0.14} />
        </mesh>
        <mesh position={[-1.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.27, 0.29, 0.74, 32]} />
          <meshStandardMaterial color="#141420" metalness={0.87} roughness={0.19} />
        </mesh>
        <mesh position={[-1.53, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.23, 0.25, 0.38, 32]} />
          <meshStandardMaterial color="#0e0e16" metalness={0.87} roughness={0.19} />
        </mesh>
        <mesh position={[-1.73, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.19, 0.19, 0.02, 32]} />
          <meshStandardMaterial color="#4a9eff" metalness={0.2} roughness={0.05} transparent opacity={0.88} emissive="#1a3a6e" emissiveIntensity={0.9} />
        </mesh>
        <mesh position={[-1.725, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.025, 24]} />
          <meshStandardMaterial color="#060e22" transparent opacity={0.92} emissive="#0a1a4a" emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[0.3, 0.52, 0.27]}>
          <cylinderGeometry args={[0.052, 0.052, 0.04, 12]} />
          <meshStandardMaterial color="#c8873a" emissive="#c8873a" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[-0.22, 0.52, 0.18]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
          <meshStandardMaterial color="#1a1a24" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.42, 0.22, 0.4]}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshStandardMaterial color="#4a9eff" emissive="#4a9eff" emissiveIntensity={2.2} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Floating shapes – spread across full 3D sphere ──────── */
function FloatingShapes() {
  const shapes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        // Spread on a sphere of radius 4-9 so they surround the camera path
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = 4 + Math.random() * 5;
        return {
          id:    i,
          pos:   [
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi),
          ] as [number, number, number],
          rot:   [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0] as [number, number, number],
          scale: 0.04 + Math.random() * 0.09,
          speed: 0.12 + Math.random() * 0.25,
          phase: Math.random() * Math.PI * 2,
          type:  i % 3,
          color: i % 2 === 0 ? "#4a9eff" : "#c8873a",
        };
      }),
    [],
  );

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const s = shapes[i];
      m.position.y = s.pos[1] + Math.sin(state.clock.elapsedTime * s.speed + s.phase) * 0.22;
      m.rotation.x += 0.003;
      m.rotation.z += 0.002;
    });
  });

  return (
    <>
      {shapes.map((s, i) => (
        <mesh
          key={s.id}
          ref={(el) => { refs.current[i] = el; }}
          position={s.pos}
          rotation={s.rot}
          scale={s.scale}
        >
          {s.type === 0 && <octahedronGeometry  args={[1, 0]} />}
          {s.type === 1 && <boxGeometry         args={[1, 1, 1]} />}
          {s.type === 2 && <tetrahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial color={s.color} metalness={0.7} roughness={0.3} transparent opacity={0.12} wireframe />
        </mesh>
      ))}
    </>
  );
}

/* ─── World root ───────────────────────────────────────────── */
function World() {
  return (
    <>
      <color attach="background" args={["#0c0b09"]} />
      <fog   attach="fog"        args={["#0c0b09", 18, 50]} />

      <CameraRig />

      <ambientLight intensity={0.2} />
      <pointLight position={[ 4,  4, 5]} intensity={1.9} color="#4a9eff" />
      <pointLight position={[-4, -2, 2]} intensity={1.0} color="#c8873a" />
      <pointLight position={[ 0, -3, 4]} intensity={1.2} />
      <spotLight   position={[ 1,  6, 3]} intensity={2.0} angle={0.55} penumbra={0.85} color="#ffffff" />

      <Starfield />
      <Nebulae />
      <FloatingShapes />
      <Drone />
      <Camera3D />

      <Sparkles
        count={90}
        size={0.5}
        speed={0.18}
        opacity={0.2}
        color="#4a9eff"
        scale={[16, 10, 8]}
      />
    </>
  );
}

export default function WorldScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.8], fov: 45 }}
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <World />
    </Canvas>
  );
}
