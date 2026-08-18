import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const stations = [
  { key: 'home', label: 'Home care', caption: 'Everyday help', accent: '#ff745d', position: [-1.55, 0.08, 0.38], kind: 'home' },
  { key: 'repair', label: 'Repairs', caption: 'Practical fixes', accent: '#2858d9', position: [1.48, 0.11, 0.34], kind: 'repair' },
  { key: 'garden', label: 'Garden', caption: 'Outside work', accent: '#5c9b6a', position: [1.08, 0.04, -1.15], kind: 'garden' },
  { key: 'move', label: 'Moving', caption: 'A careful handoff', accent: '#e7ad3f', position: [-1.18, 0.06, -1.14], kind: 'move' },
];

function HomeMiniature({ accent }) {
  return <group position={[0, 0.22, 0]}>
    <mesh position={[0, 0.17, 0]} castShadow><boxGeometry args={[0.48, 0.36, 0.42]} /><meshStandardMaterial color="#f7f1e5" roughness={0.82} /></mesh>
    <mesh position={[0, 0.46, 0]} rotation={[0, Math.PI / 4, 0]} castShadow><coneGeometry args={[0.4, 0.28, 4]} /><meshStandardMaterial color={accent} roughness={0.65} /></mesh>
    <mesh position={[0, 0.14, 0.215]}><planeGeometry args={[0.11, 0.17]} /><meshBasicMaterial color="#1a2d4c" /></mesh>
  </group>;
}

function RepairMiniature({ accent }) {
  return <group position={[0, 0.2, 0]}>
    <mesh position={[0, 0.12, 0]} castShadow><boxGeometry args={[0.62, 0.14, 0.34]} /><meshStandardMaterial color="#f7f1e5" roughness={0.82} /></mesh>
    <mesh position={[-0.22, 0.33, 0]} castShadow><boxGeometry args={[0.08, 0.36, 0.08]} /><meshStandardMaterial color={accent} roughness={0.48} /></mesh>
    <mesh position={[0.17, 0.3, 0]} rotation={[0, 0, -0.55]} castShadow><boxGeometry args={[0.08, 0.48, 0.08]} /><meshStandardMaterial color="#17325e" roughness={0.45} /></mesh>
    <mesh position={[0.17, 0.52, 0]}><sphereGeometry args={[0.1, 16, 16]} /><meshStandardMaterial color={accent} roughness={0.4} /></mesh>
  </group>;
}

function GardenMiniature({ accent }) {
  return <group position={[0, 0.2, 0]}>
    <mesh position={[0, 0.1, 0]} castShadow><boxGeometry args={[0.58, 0.2, 0.36]} /><meshStandardMaterial color="#7b5a3b" roughness={0.95} /></mesh>
    {[-0.19, 0, 0.19].map((x, index) => <group key={x} position={[x, 0.27 + index * 0.025, 0]} rotation={[0.1 * index, 0, -0.18 + index * 0.17]}><mesh castShadow><coneGeometry args={[0.12, 0.36, 5]} /><meshStandardMaterial color={accent} roughness={0.65} /></mesh></group>)}
  </group>;
}

function MoveMiniature({ accent }) {
  return <group position={[0, 0.2, 0]}>
    <mesh position={[-0.12, 0.16, 0]} castShadow><boxGeometry args={[0.34, 0.32, 0.34]} /><meshStandardMaterial color="#d7b47a" roughness={0.86} /></mesh>
    <mesh position={[0.18, 0.1, 0.02]} castShadow><boxGeometry args={[0.25, 0.2, 0.28]} /><meshStandardMaterial color="#f1d29c" roughness={0.86} /></mesh>
    <mesh position={[-0.12, 0.33, 0.175]}><boxGeometry args={[0.05, 0.05, 0.01]} /><meshBasicMaterial color={accent} /></mesh>
    <mesh position={[0.18, 0.21, 0.16]}><boxGeometry args={[0.04, 0.04, 0.01]} /><meshBasicMaterial color={accent} /></mesh>
  </group>;
}

function Miniature({ kind, accent }) {
  if (kind === 'home') return <HomeMiniature accent={accent} />;
  if (kind === 'repair') return <RepairMiniature accent={accent} />;
  if (kind === 'garden') return <GardenMiniature accent={accent} />;
  return <MoveMiniature accent={accent} />;
}

function ServiceStation({ station, onSelect }) {
  const group = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const lift = Math.sin(clock.elapsedTime * 1.15 + station.position[0] * 1.7) * 0.028;
    group.current.position.y = station.position[1] + lift;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.07 + (hovered ? 0.08 : 0), 0.045);
    const target = hovered ? 1.08 : 1;
    group.current.scale.lerp(new THREE.Vector3(target, target, target), 0.09);
  });

  return <group ref={group} position={station.position} onClick={() => onSelect(station.key)} onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}>
    <RoundedBox args={[1.12, 0.18, 0.86]} radius={0.08} smoothness={4} castShadow receiveShadow>
      <meshStandardMaterial color="#f8f4ea" roughness={0.7} metalness={0.04} />
    </RoundedBox>
    <mesh position={[0, 0.105, 0]}><boxGeometry args={[0.9, 0.012, 0.64]} /><meshBasicMaterial color={station.accent} transparent opacity={0.2} /></mesh>
    <Miniature kind={station.kind} accent={station.accent} />
    <mesh position={[0, 0.107, 0.36]}><boxGeometry args={[0.54, 0.018, 0.018]} /><meshBasicMaterial color={station.accent} /></mesh>
  </group>;
}

function RequestStack() {
  const group = useRef();
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.11, 0.03);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.06, 0.03);
    group.current.position.y = Math.sin(clock.elapsedTime * 1.1) * 0.025 + 0.14;
  });
  const cards = [
    { y: 0, x: 0, z: 0, color: '#f8f4ea', strip: '#2858d9', rotation: -0.1 },
    { y: 0.09, x: 0.07, z: -0.025, color: '#f3e5d7', strip: '#ff745d', rotation: 0.08 },
    { y: 0.18, x: -0.04, z: 0.025, color: '#e5efe3', strip: '#5c9b6a', rotation: -0.04 },
  ];
  return <group ref={group}>
    {cards.map((card, index) => <group key={index} position={[card.x, card.y, card.z]} rotation={[0, card.rotation, 0]}>
      <RoundedBox args={[1.3, 0.07, 0.84]} radius={0.06} smoothness={4} castShadow><meshStandardMaterial color={card.color} roughness={0.82} /></RoundedBox>
      <mesh position={[-0.42, 0.041, 0.19]}><boxGeometry args={[0.25, 0.012, 0.035]} /><meshBasicMaterial color={card.strip} /></mesh>
      <mesh position={[-0.26, 0.041, 0.19]}><boxGeometry args={[0.08, 0.012, 0.035]} /><meshBasicMaterial color={card.strip} transparent opacity={0.45} /></mesh>
      <mesh position={[-0.42, 0.041, 0.08]}><boxGeometry args={[0.5, 0.012, 0.025]} /><meshBasicMaterial color="#243755" transparent opacity={0.28} /></mesh>
      <mesh position={[-0.42, 0.041, -0.03]}><boxGeometry args={[0.38, 0.012, 0.025]} /><meshBasicMaterial color="#243755" transparent opacity={0.18} /></mesh>
    </group>)}
  </group>;
}

function ServiceMap({ onSelect }) {
  const frame = useRef();
  useFrame(({ pointer }) => {
    if (!frame.current) return;
    frame.current.rotation.y = THREE.MathUtils.lerp(frame.current.rotation.y, pointer.x * 0.12, 0.025);
    frame.current.rotation.x = THREE.MathUtils.lerp(frame.current.rotation.x, -pointer.y * 0.06, 0.025);
  });
  const lines = stations.map((station) => [[0, 0.08, 0], [station.position[0] * 0.75, 0.09, station.position[2] * 0.75], [station.position[0], 0.09, station.position[2]]]);
  return <>
    <ambientLight intensity={1.65} />
    <directionalLight position={[3.5, 5, 4]} intensity={2.4} color="#fff5df" castShadow />
    <pointLight position={[-3.5, 1.6, 2.8]} intensity={1.9} color="#6e91ff" />
    <pointLight position={[2.6, 0.8, -2.4]} intensity={1.35} color="#ff927a" />
    <group ref={frame}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, -0.05]} receiveShadow><planeGeometry args={[5.55, 3.8]} /><meshStandardMaterial color="#e8e5dc" roughness={0.92} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.165, -0.05]}><ringGeometry args={[1.06, 1.085, 64]} /><meshBasicMaterial color="#2858d9" transparent opacity={0.23} /></mesh>
      {lines.map((points, index) => <Line key={index} points={points} color={stations[index].accent} lineWidth={1.15} transparent opacity={0.54} />)}
      <RequestStack />
      {stations.map((station) => <ServiceStation key={station.key} station={station} onSelect={onSelect} />)}
    </group>
    <ContactShadows position={[0, -0.17, 0]} opacity={0.26} scale={6} blur={2.5} far={4} color="#26324a" />
  </>;
}

export default function ServiceOrbit({ onSelect }) {
  const select = (key) => onSelect?.(key);
  return <div className="service-diorama" aria-label="Explore BookEase service categories through a three-dimensional service map">
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 2.55, 6.15], fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <ServiceMap onSelect={select} />
    </Canvas>
    <div className="service-diorama__meta" aria-hidden="true"><span>Request</span><i>→</i><span>Offer</span><i>→</i><span>Booking</span></div>
    <div className="service-diorama__labels" aria-label="Service category shortcuts">
      {stations.map((station) => <button key={station.key} type="button" onClick={() => select(station.key)} style={{ '--station': station.accent }}><span>{station.label}</span><small>{station.caption}</small></button>)}
    </div>
  </div>;
}
