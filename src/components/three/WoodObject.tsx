"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Sculpture({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Color(color));

  useFrame((_, delta) => {
    if (!mesh.current) return;
    target.current.set(color);
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x += delta * 0.05;
    const mat = mesh.current.material as THREE.MeshPhysicalMaterial;
    mat.color.lerp(target.current, 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} castShadow>
        <torusKnotGeometry args={[1, 0.34, 220, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.35}
          metalness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.4}
          reflectivity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function WoodObject({ color }: { color: string }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 3]} intensity={2.4} color="#f5e4c3" />
      <pointLight position={[-4, -2, -3]} intensity={12} color="#b8965a" />
      <pointLight position={[3, -3, 2]} intensity={6} color="#7a5a30" />
      <Sculpture color={color} />
    </Canvas>
  );
}
