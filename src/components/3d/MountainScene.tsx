"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── Camera path ──────────────────────────────────────────────
   Same waypoints as WorldScene so section scroll-mapping is identical.
──────────────────────────────────────────────────────────────── */
const WAYPOINTS = [
  new THREE.Vector3( 0,    0.5,  5.8),   // 0 Hero    – straight ahead
  new THREE.Vector3( 4.5,  1.5,  3.0),   // 1 About   – upper right
  new THREE.Vector3( 1.5,  4.2,  2.2),   // 2 Skills  – overhead
  new THREE.Vector3(-4.5,  1.0,  2.5),   // 3 Exp     – left side
  new THREE.Vector3(-2.0, -2.8,  4.2),   // 4 Work    – lower
  new THREE.Vector3( 0,   -0.8,  6.5),   // 5 Contact – pulled back
];
const CURVE = new THREE.CatmullRomCurve3(WAYPOINTS, false, "catmullrom", 0.4);

/* ─── Camera rig ───────────────────────────────────────────────
   Reads window.scrollY directly — no React state, no re-renders.
──────────────────────────────────────────────────────────────── */
function CameraRig() {
  const { camera }     = useThree();
  const scrollProgress = useRef(0);
  const cameraTarget   = useRef(WAYPOINTS[0].clone());
  const mouse          = useRef({ x: 0, y: 0 });
  const lookTarget     = useRef(new THREE.Vector3());
  const tmpVec         = useRef(new THREE.Vector3());

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
    cameraTarget.current.lerp(tmpVec.current, 0.055);
    camera.position.copy(cameraTarget.current);
    lookTarget.current.lerp(
      new THREE.Vector3(mouse.current.x * 0.6, mouse.current.y * 0.5, 0),
      0.04,
    );
    camera.lookAt(lookTarget.current);
  });

  return null;
}

/* ─── Mountain peaks definition ───────────────────────────────
   Mountains live behind the drone (z < 0) and on the flanks (|x| > 8)
   so the camera path [z: 2.2..6.5, x: -4.5..4.5] never clips through them.
──────────────────────────────────────────────────────────────── */
const PEAKS = [
  // ── central backdrop (z < 0, directly behind drone)
  { x:   0, z: -15, h: 9.0, s: 6.5 },
  { x:  -9, z: -13, h: 7.0, s: 4.8 },
  { x:   9, z: -13, h: 7.5, s: 4.8 },
  { x:  -5, z: -21, h: 10.5, s: 7.5 },
  { x:   5, z: -21, h: 10.0, s: 7.5 },
  { x: -14, z: -18, h: 8.0, s: 5.5 },
  { x:  14, z: -18, h: 8.5, s: 5.5 },
  // ── left flank
  { x: -20, z:  -4, h: 8.0, s: 5.8 },
  { x: -22, z:   6, h: 7.5, s: 5.2 },
  { x: -17, z: -14, h: 7.0, s: 4.5 },
  // ── right flank
  { x:  20, z:  -4, h: 8.5, s: 5.8 },
  { x:  22, z:   6, h: 7.0, s: 5.2 },
  { x:  17, z: -14, h: 7.5, s: 4.5 },
  // ── far distant ridges
  { x:  -2, z: -28, h: 11,  s: 8.5 },
  { x: -18, z: -24, h: 9.0, s: 6.0 },
  { x:  18, z: -24, h: 9.5, s: 6.0 },
];

function heightAt(x: number, z: number): number {
  let y = 0;
  for (const p of PEAKS) {
    const dx = x - p.x, dz = z - p.z;
    y += p.h * Math.exp(-(dx * dx + dz * dz) / (p.s * p.s));
  }
  // micro-surface detail
  y += Math.sin(x * 3.1 + z * 2.7) * 0.06;
  y += Math.sin(x * 5.5 - z * 4.2) * 0.03;
  return y;
}

/* ─── Terrain mesh ─────────────────────────────────────────────
   70×70 plane displaced by heightAt(), vertex-colored rock→snow.
──────────────────────────────────────────────────────────────── */
function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(70, 70, 110, 110);
    g.rotateX(-Math.PI / 2);

    const pos    = g.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = heightAt(x, z);
      pos.setY(i, y);

      // Dark bedrock ───► blue-gray scree ───► blue-white snow
      const rockT = THREE.MathUtils.clamp(y / 3.0, 0, 1);
      const snowT = THREE.MathUtils.clamp((y - 5.5) / 3.5, 0, 1);
      colors[i * 3]     = 0.025 + rockT * 0.06  + snowT * 0.52;
      colors[i * 3 + 1] = 0.025 + rockT * 0.06  + snowT * 0.58;
      colors[i * 3 + 2] = 0.045 + rockT * 0.13  + snowT * 0.72;
    }

    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} position={[0, -4.2, 0]} receiveShadow>
      <meshStandardMaterial vertexColors metalness={0.12} roughness={0.9} />
    </mesh>
  );
}

/* ─── Aurora borealis ──────────────────────────────────────────
   Large semi-transparent planes high in the sky, animated opacity.
──────────────────────────────────────────────────────────────── */
const CURTAINS = [
  { pos: [ 2,  17, -26] as [number,number,number], rot: [ 0.10,  0.04,  0.08] as [number,number,number], color: "#00e5cc", w: 34, h: 12, phase: 0.0  },
  { pos: [-7,  19, -22] as [number,number,number], rot: [ 0.07, -0.14,  0.11] as [number,number,number], color: "#4a9eff", w: 28, h:  9, phase: 1.4  },
  { pos: [10,  15, -20] as [number,number,number], rot: [ 0.14,  0.20, -0.06] as [number,number,number], color: "#00c8a0", w: 22, h:  8, phase: 2.7  },
  { pos: [-2,  21, -30] as [number,number,number], rot: [ 0.04,  0.00,  0.03] as [number,number,number], color: "#2ae8c4", w: 40, h:  7, phase: 0.9  },
  { pos: [16,  13, -18] as [number,number,number], rot: [-0.06,  0.28,  0.09] as [number,number,number], color: "#3af0d8", w: 18, h:  6, phase: 3.5  },
];

function Aurora() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const mat = m.material as THREE.MeshBasicMaterial;
      const c   = CURTAINS[i];
      mat.opacity = 0.052 + Math.sin(state.clock.elapsedTime * 0.32 + c.phase) * 0.028;
    });
  });

  return (
    <>
      {CURTAINS.map((c, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={c.pos}
          rotation={c.rot}
          scale={[c.w, c.h, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={c.color}
            transparent
            opacity={0.052}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

/* ─── Sky dome ─────────────────────────────────────────────────
   Layered BackSide spheres give deep atmospheric gradient.
──────────────────────────────────────────────────────────────── */
function SkyDome() {
  return (
    <>
      {/* Outer void */}
      <mesh>
        <sphereGeometry args={[55, 12, 12]} />
        <meshBasicMaterial color="#04060c" side={THREE.BackSide} />
      </mesh>
      {/* Horizon haze – very subtle blue */}
      <mesh position={[0, -10, -20]}>
        <sphereGeometry args={[28, 8, 8]} />
        <meshBasicMaterial color="#0d2040" transparent opacity={0.14} side={THREE.BackSide} />
      </mesh>
      {/* Deep-sky tint behind mountains */}
      <mesh position={[0, 6, -32]}>
        <sphereGeometry args={[22, 8, 8]} />
        <meshBasicMaterial color="#0a1828" transparent opacity={0.55} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

/* ─── Ground mist ──────────────────────────────────────────────
   Slowly rotating transparent planes near the valley floor.
──────────────────────────────────────────────────────────────── */
const MIST = [
  { y: -3.6, r: 40, speed: 0.025, phase: 0.0 },
  { y: -3.1, r: 30, speed: 0.040, phase: 1.2 },
  { y: -2.6, r: 22, speed: 0.032, phase: 2.5 },
];

function Mist() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const l   = MIST[i];
      m.rotation.y = state.clock.elapsedTime * l.speed;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.048 + Math.sin(state.clock.elapsedTime * 0.28 + l.phase) * 0.018;
    });
  });

  return (
    <>
      {MIST.map((l, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={[0, l.y, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[l.r, l.r]} />
          <meshBasicMaterial
            color="#3a8acc"
            transparent
            opacity={0.048}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

/* ─── Stars ────────────────────────────────────────────────────
   Uniformly distributed on a sphere — denser blue-white tint.
──────────────────────────────────────────────────────────────── */
function Starfield() {
  const { positions, sizes } = useMemo(() => {
    const count = 950;
    const pos   = new Float32Array(count * 3);
    const sz    = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 30 + Math.random() * 20;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.035 + Math.random() * 0.075;
    }
    return { positions: pos, sizes: sz };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={950} itemSize={3} />
        <bufferAttribute attach="attributes-size"     array={sizes}     count={950} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#c0d4f0" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ─── Drone ────────────────────────────────────────────────────
   Floating above the valley floor — same geometry as WorldScene.
──────────────────────────────────────────────────────────────── */
function Drone() {
  const groupRef  = useRef<THREE.Group>(null);
  const rotorRefs = useRef<(THREE.Mesh | null)[]>([]);
  const motorPos: [number, number, number][] = [
    [ 0.68, 0,  0.68], [-0.68, 0,  0.68],
    [-0.68, 0, -0.68], [ 0.68, 0, -0.68],
  ];

  useFrame((_, d) => {
    if (groupRef.current) groupRef.current.rotation.y += d * 0.1;
    rotorRefs.current.forEach((r) => { if (r) r.rotation.y += d * 22; });
  });

  return (
    <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.45}>
      <group ref={groupRef}>
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.15, 0.52]} />
          <meshStandardMaterial color="#0c0c18" metalness={0.92} roughness={0.14} />
        </mesh>
        <mesh position={[0, 0.082, 0]}>
          <boxGeometry args={[0.38, 0.011, 0.27]} />
          <meshStandardMaterial color="#4a9eff" emissive="#4a9eff" emissiveIntensity={0.6} metalness={0.4} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.01, 0.27]}>
          <boxGeometry args={[0.48, 0.13, 0.01]} />
          <meshStandardMaterial color="#c8873a" emissive="#c8873a" emissiveIntensity={0.2} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh rotation={[0,  Math.PI / 4, 0]}>
          <boxGeometry args={[2.0, 0.05, 0.1]} />
          <meshStandardMaterial color="#10101e" metalness={0.9} roughness={0.18} />
        </mesh>
        <mesh rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[2.0, 0.05, 0.1]} />
          <meshStandardMaterial color="#10101e" metalness={0.9} roughness={0.18} />
        </mesh>
        {motorPos.map((pos, i) => (
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

/* ─── Camera body ──────────────────────────────────────────────
   Same geometry as WorldScene, floating beside the drone.
──────────────────────────────────────────────────────────────── */
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

/* ─── Scene root ───────────────────────────────────────────────
   Moonlit mountain valley — aurora, snow peaks, rising mist.
──────────────────────────────────────────────────────────────── */
function World() {
  return (
    <>
      <color attach="background" args={["#05060c"]} />
      <fog   attach="fog"        args={["#07080e", 16, 52]} />

      <CameraRig />

      {/* Moonlight — cool directional + accent fills */}
      <ambientLight intensity={0.10} color="#7090b8" />
      <directionalLight position={[-6, 14, -4]} intensity={0.55} color="#8ab2d4" castShadow />
      <pointLight position={[ 4,  4, 5]} intensity={1.8} color="#4a9eff" />
      <pointLight position={[-4, -2, 2]} intensity={0.9} color="#c8873a" />
      <pointLight position={[ 0, -3, 4]} intensity={1.0} />
      <spotLight   position={[ 1,  6, 3]} intensity={1.6} angle={0.55} penumbra={0.9} color="#a0c8f0" />

      <SkyDome />
      <Starfield />
      <Aurora />
      <Terrain />
      <Mist />

      <Drone />
      <Camera3D />

      <Sparkles
        count={65}
        size={0.42}
        speed={0.14}
        opacity={0.16}
        color="#4a9eff"
        scale={[14, 8, 6]}
      />
    </>
  );
}

export default function MountainScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.8], fov: 45 }}
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      <World />
    </Canvas>
  );
}
