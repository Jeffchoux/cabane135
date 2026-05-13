"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
};

function OysterShell({ scrollProgress, mouseX, mouseY }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const topRef = useRef<THREE.Group>(null);
  const pearlRef = useRef<THREE.Mesh>(null);

  const bottomGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const x = Math.sin(t * Math.PI) * (1.2 + Math.sin(t * Math.PI * 3) * 0.15);
      const y = t * 0.6 - 0.3 + Math.sin(t * Math.PI) * 0.1;
      points.push(new THREE.Vector2(x, y));
    }
    const geo = new THREE.LatheGeometry(points, 72);
    geo.computeVertexNormals();
    return geo;
  }, []);

  const topGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const x = Math.sin(t * Math.PI) * (1.1 + Math.sin(t * Math.PI * 2.5) * 0.12);
      const y = -(t * 0.5 - 0.25 + Math.sin(t * Math.PI) * 0.08);
      points.push(new THREE.Vector2(x, y));
    }
    const geo = new THREE.LatheGeometry(points, 72);
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame(() => {
    const g = groupRef.current;
    const top = topRef.current;
    const pearl = pearlRef.current;
    if (!g || !top) return;

    const targetRotY = mouseX * 0.25;
    const targetRotX = mouseY * 0.15;
    g.rotation.y += (targetRotY - g.rotation.y) * 0.06;
    g.rotation.x += (targetRotX - g.rotation.x) * 0.06;

    const openAngle = scrollProgress * 0.7;
    top.rotation.x = -openAngle;
    top.position.y = Math.sin(openAngle) * 0.32;

    g.position.z = -scrollProgress * 2.4;
    g.position.y = 0.15 - scrollProgress * 0.8;

    g.rotation.y += 0.0025;

    if (pearl) {
      const scale = Math.max(0.01, scrollProgress * 0.35 + 0.05);
      pearl.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} scale={0.75} position={[0, 0.1, 0]} rotation={[0, 0, 0.08]}>
      <mesh geometry={bottomGeometry} castShadow receiveShadow>
        <MeshDistortMaterial
          color="#c8a97a"
          roughness={0.32}
          metalness={0.55}
          distort={0.08}
          speed={0.5}
          envMapIntensity={1.1}
        />
      </mesh>

      <group ref={topRef}>
        <mesh geometry={topGeometry} castShadow>
          <MeshDistortMaterial
            color="#d4b98a"
            roughness={0.26}
            metalness={0.6}
            distort={0.06}
            speed={0.4}
            envMapIntensity={1.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh ref={pearlRef} position={[0, -0.1, 0]} scale={0.05}>
          <sphereGeometry args={[0.35, 48, 48]} />
          <meshPhysicalMaterial
            color="#f5f0e8"
            roughness={0.04}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            iridescence={1}
            iridescenceIOR={1.8}
          />
        </mesh>
      </group>
    </group>
  );
}

function Particles({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const p = pointsRef.current;
    if (!p) return;
    p.rotation.y = state.clock.elapsedTime * 0.04;
    p.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#c8a15a"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.45} color="#0f2035" />
      <pointLight position={[2.5, 2.5, 2.5]} intensity={2.2} color="#c8a15a" />
      <pointLight position={[-2.5, -1.5, 1.8]} intensity={1.4} color="#00b8d9" />
      <pointLight position={[0, -2.5, -0.5]} intensity={0.8} color="#163a55" />
      <directionalLight position={[1, 4, 4]} intensity={0.45} color="#f2ece0" />
    </>
  );
}

export function OysterScene({ scrollProgress, mouseX, mouseY }: Props) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.28}>
            <OysterShell
              scrollProgress={scrollProgress}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          </Float>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default OysterScene;
