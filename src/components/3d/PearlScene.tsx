"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

type Props = { mouseX: number; mouseY: number };

function Pearl({ mouseX, mouseY }: Props) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const targetRotY = mouseX * 0.15;
    const targetRotX = mouseY * 0.1;
    m.rotation.y += (targetRotY - m.rotation.y) * 0.05;
    m.rotation.x += (targetRotX - m.rotation.x) * 0.05;
    m.rotation.z += 0.003;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#f5f0e8"
        roughness={0.04}
        metalness={0.85}
        clearcoat={1}
        clearcoatRoughness={0.04}
        iridescence={1}
        iridescenceIOR={1.85}
        iridescenceThicknessRange={[100, 800]}
      />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} color="#163a55" />
      <pointLight position={[2, 2, 2]} intensity={2.5} color="#c8a15a" />
      <pointLight position={[-2, -1, 1]} intensity={1.5} color="#00b8d9" />
      <directionalLight position={[0, 3, 3]} intensity={0.7} color="#f2ece0" />
    </>
  );
}

export function PearlScene({ mouseX, mouseY }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
          <Pearl mouseX={mouseX} mouseY={mouseY} />
        </Float>
      </Suspense>
    </Canvas>
  );
}

export default PearlScene;
