import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Text, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Section from "./Section";

function canUse3D() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
}

function HeartMesh({ scale = 1, color = "#f5a7bc" }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.35);
    shape.bezierCurveTo(-1.2, 1.45, -2.25, 0.2, -1.05, -0.95);
    shape.bezierCurveTo(-0.45, -1.55, 0, -1.05, 0, -0.68);
    shape.bezierCurveTo(0, -1.05, 0.45, -1.55, 1.05, -0.95);
    shape.bezierCurveTo(2.25, 0.2, 1.2, 1.45, 0, 0.35);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.32, bevelEnabled: true, bevelSize: 0.07, bevelThickness: 0.08, bevelSegments: 5 });
  }, []);

  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.7;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
  });

  return (
    <mesh ref={ref} geometry={geometry} scale={scale} rotation={[0, 0, Math.PI]}>
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.12} emissive="#5b1830" emissiveIntensity={0.16} />
    </mesh>
  );
}

function RoseMesh() {
  const group = useRef(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.85;
  });

  return (
    <group ref={group}>
      {Array.from({ length: 10 }, (_, index) => (
        <mesh key={index} rotation={[0.9, 0, (Math.PI * 2 * index) / 10]} position={[Math.cos(index) * 0.05, Math.sin(index) * 0.05, 0]}>
          <sphereGeometry args={[0.48 - index * 0.015, 16, 8, 0, Math.PI]} />
          <meshStandardMaterial color={index % 2 ? "#f5a7bc" : "#b8325f"} roughness={0.42} />
        </mesh>
      ))}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.07, 1.2, 10]} />
        <meshStandardMaterial color="#587446" />
      </mesh>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[3, 4, 5]} intensity={2.1} color="#f4d188" />
      <pointLight position={[-4, -1, 3]} intensity={1.2} color="#f5a7bc" />
    </>
  );
}

function ThreeFallback({ label = "♥" }) {
  return <div className="three-fallback">{label}</div>;
}

export function Hero3DAccent() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => setEnabled(canUse3D()), []);

  if (!enabled) return <ThreeFallback />;

  return (
    <div className="hero-3d-accent" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 38 }}>
        <SceneLights />
        <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.7}>
          <HeartMesh scale={0.92} />
        </Float>
        <Float speed={1.2} rotationIntensity={0.55} floatIntensity={0.45}>
          <group position={[1.65, -0.25, 0]} scale={0.72}>
            <RoseMesh />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}

function PhotoWheel({ images }) {
  const group = useRef(null);
  const textures = useTexture(images.slice(0, 10).map((image) => image.src));

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.24;
  });

  return (
    <group ref={group}>
      {textures.map((texture, index) => {
        const angle = (index / textures.length) * Math.PI * 2;
        return (
          <mesh key={texture.uuid} position={[Math.sin(angle) * 3, 0, Math.cos(angle) * 3]} rotation={[0, angle, 0]}>
            <planeGeometry args={[1.15, 1.55]} />
            <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

export function MemoryWheel3D({ images }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(canUse3D()), []);

  return (
    <Section eyebrow="3D Memory Wheel" title="Memories in motion">
      <div className="three-panel">
        {enabled ? (
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.1, 6.5], fov: 48 }}>
            <SceneLights />
            <Suspense fallback={null}>
              <PhotoWheel images={images} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
          </Canvas>
        ) : (
          <ThreeFallback label="Memories" />
        )}
      </div>
    </Section>
  );
}

export function Universe3D() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(canUse3D()), []);

  return (
    <Section eyebrow="3D Universe" title="A heart written in stars">
      <div className="three-panel universe-3d">
        {enabled ? (
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 52 }}>
            <SceneLights />
            <Stars radius={22} depth={14} count={900} factor={3} saturation={0} fade speed={0.5} />
            <Float speed={1.1} floatIntensity={0.5}>
              <HeartMesh scale={1.15} color="#f4d188" />
            </Float>
            <Text position={[0, -2.2, 0]} fontSize={0.34} color="#fff8ef" anchorX="center">
              Our little universe
            </Text>
          </Canvas>
        ) : (
          <ThreeFallback label="✦ ♥ ✦" />
        )}
      </div>
    </Section>
  );
}

export function Final3DScene() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(canUse3D()), []);

  if (!enabled) return null;

  return (
    <div className="final-3d-layer" aria-hidden="true">
      <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 6], fov: 50 }}>
        <SceneLights />
        <Float speed={1.6} floatIntensity={1}>
          <HeartMesh scale={1.4} color="#f5a7bc" />
        </Float>
        {Array.from({ length: 7 }, (_, index) => (
          <Float key={index} speed={1 + index * 0.08} floatIntensity={0.5}>
            <group position={[Math.sin(index) * 2.6, -1.6 + (index % 3) * 0.55, -index * 0.12]} scale={0.34}>
              <RoseMesh />
            </group>
          </Float>
        ))}
      </Canvas>
    </div>
  );
}
