import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const orbitItems = [
  { key: 'home', label: 'Home care', color: '#ff745d', position: [-1.35, 0.55, 0.12], scale: 0.46 },
  { key: 'repair', label: 'Repairs', color: '#2858d9', position: [1.18, 0.73, -0.2], scale: 0.54 },
  { key: 'garden', label: 'Garden', color: '#5c9b6a', position: [0.78, -0.93, 0.18], scale: 0.41 },
  { key: 'move', label: 'Moving', color: '#f1b64f', position: [-0.94, -0.95, -0.26], scale: 0.35 },
];

function OrbitToken({ item, onSelect }) {
  const mesh = useRef();
  const halo = useRef();

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const beat = Math.sin(clock.elapsedTime * 1.15 + item.position[0]) * 0.06;
    mesh.current.rotation.x = pointer.y * 0.26 + clock.elapsedTime * 0.08;
    mesh.current.rotation.y = pointer.x * 0.35 + clock.elapsedTime * 0.14;
    mesh.current.position.y = item.position[1] + beat;
    if (halo.current) halo.current.rotation.z = -clock.elapsedTime * 0.15;
  });

  return (
    <group position={item.position}>
      <mesh ref={halo} rotation={[Math.PI / 2.25, 0, 0]}>
        <torusGeometry args={[item.scale * 1.65, 0.012, 12, 64]} />
        <meshBasicMaterial color={item.color} transparent opacity={0.54} />
      </mesh>
      <Float speed={2.1} rotationIntensity={0.25} floatIntensity={0.45}>
        <mesh ref={mesh} scale={item.scale} onClick={() => onSelect(item.key)} onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial color={item.color} roughness={0.16} metalness={0.48} distort={0.25} speed={1.7} transparent opacity={0.94} />
        </mesh>
      </Float>
    </group>
  );
}

function OrbitScene({ onSelect }) {
  const group = useRef();

  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.16, 0.03);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.11, 0.03);
  });

  return (
    <>
      <ambientLight intensity={1.55} />
      <directionalLight position={[2, 4, 4]} intensity={2.2} color="#fff4df" />
      <pointLight position={[-3, 0, 2]} intensity={3.4} color="#3c66e8" />
      <pointLight position={[2.5, -1.5, 1]} intensity={2.8} color="#ff745d" />
      <group ref={group}>
        <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.25}>
          <mesh>
            <icosahedronGeometry args={[0.74, 4]} />
            <MeshDistortMaterial color="#faf3e6" roughness={0.2} metalness={0.25} distort={0.12} speed={1.1} />
          </mesh>
        </Float>
        {orbitItems.map((item) => <OrbitToken key={item.key} item={item} onSelect={onSelect} />)}
      </group>
    </>
  );
}

export default function ServiceOrbit({ onSelect }) {
  const handleSelect = (key) => onSelect?.(key);

  return (
    <div className="service-orbit" aria-label="Explore BookEase service categories">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.5], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <OrbitScene onSelect={handleSelect} />
      </Canvas>
      <div className="service-orbit__labels" aria-label="Service category shortcuts">
        {orbitItems.map((item) => <button key={item.key} type="button" onClick={() => handleSelect(item.key)} style={{ '--token': item.color }}>{item.label}</button>)}
      </div>
    </div>
  );
}
