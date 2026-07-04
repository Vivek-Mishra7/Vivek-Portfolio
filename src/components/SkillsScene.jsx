import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

function OrbitingNode({ data, hoveredGroup }) {
  const groupRef = useRef();
  const meshRef = useRef();
  
  // Calculate if this node's group is hovered in the 2D UI
  const isHighlighted = hoveredGroup && data.group.toLowerCase().includes(hoveredGroup.toLowerCase());
  
  // Color lerping target
  const targetColor = isHighlighted ? '#FB7A5C' : '#06B6D4';
  const colorObj = useMemo(() => new THREE.Color(targetColor), [targetColor]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow orbit rotation
    const angle = data.initialAngle + time * data.orbitSpeed;
    const x = Math.cos(angle) * data.radius;
    const z = Math.sin(angle) * data.radius;
    const y = data.heightOffset + Math.sin(time * 0.8 + data.phase) * 0.15;
    
    // Move the group containing both mesh and text label
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }

    // Spin the mesh shape locally
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = time * 0.3;
      
      // Safely lerp the shape material color
      if (meshRef.current.material) {
        meshRef.current.material.color.lerp(colorObj, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Icosahedron Shape */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial 
          color="#06B6D4" 
          wireframe={data.id % 2 === 0}
          transparent
          opacity={0.85}
        />
      </mesh>
      
      {/* Halo outline if highlighted */}
      {isHighlighted && (
        <mesh scale={[1.4, 1.4, 1.4]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial 
            color="#FB7A5C" 
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Floating Monospace Text Label */}
      <Text
        position={[0, 0.45, 0]}
        fontSize={0.16}
        color="#1A1D23"
        anchorX="center"
        anchorY="middle"
      >
        {data.name}
      </Text>
    </group>
  );
}

// Container orbit manager
function OrbitSystem({ hoveredGroup }) {
  const systemRef = useRef();

  // Define Orbit nodes
  const nodes = useMemo(() => [
    { id: 1, name: "Python", group: "Languages", radius: 2.5, orbitSpeed: 0.12, heightOffset: 0.3, initialAngle: 0, phase: 0.5 },
    { id: 2, name: "LangChain", group: "AI/ML", radius: 2.6, orbitSpeed: -0.09, heightOffset: -0.4, initialAngle: Math.PI / 3, phase: 1.2 },
    { id: 3, name: "FastAPI", group: "Backend", radius: 2.7, orbitSpeed: 0.15, heightOffset: 0.5, initialAngle: (2 * Math.PI) / 3, phase: 2.1 },
    { id: 4, name: "React", group: "Frontend", radius: 2.4, orbitSpeed: -0.11, heightOffset: -0.1, initialAngle: Math.PI, phase: 0.7 },
    { id: 5, name: "Pandas", group: "Data & Viz", radius: 2.8, orbitSpeed: 0.08, heightOffset: -0.6, initialAngle: (4 * Math.PI) / 3, phase: 1.8 },
    { id: 6, name: "SQL", group: "Languages", radius: 2.5, orbitSpeed: -0.13, heightOffset: 0.1, initialAngle: (5 * Math.PI) / 3, phase: 2.9 },
    { id: 7, name: "RAG / FAISS", group: "AI/ML", radius: 2.9, orbitSpeed: 0.1, heightOffset: 0.7, initialAngle: 0.5, phase: 1.1 },
    { id: 8, name: "Prisma ORM", group: "Backend", radius: 2.6, orbitSpeed: -0.08, heightOffset: -0.2, initialAngle: 2.5, phase: 0.3 },
    { id: 9, name: "Tailwind", group: "Frontend", radius: 2.5, orbitSpeed: 0.14, heightOffset: 0.2, initialAngle: 4.2, phase: 1.6 }
  ], []);

  useFrame((state) => {
    // Slow drift of the entire container coordinate space
    if (systemRef.current) {
      systemRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group ref={systemRef}>
      {/* Center Core Node */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial 
          color={hoveredGroup ? "#FB7A5C" : "#1A1D23"} 
          transparent 
          opacity={0.6}
        />
      </mesh>
      
      {/* Orbit paths lines */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.42, 64]} />
        <meshBasicMaterial color="#E4E4E1" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.1, 0]}>
        <ringGeometry args={[2.7, 2.72, 64]} />
        <meshBasicMaterial color="#E4E4E1" transparent opacity={0.3} />
      </mesh>

      {/* Orbiting nodes */}
      {nodes.map((node) => (
        <OrbitingNode 
          key={node.id} 
          data={node} 
          hoveredGroup={hoveredGroup}
        />
      ))}
    </group>
  );
}

export default function SkillsScene({ hoveredGroup }) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const support = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setHasWebGL(support);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // Return a beautiful static placeholder
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <svg width="100%" height="100%" viewBox="0 0 300 300" className="max-w-xs">
          <circle cx="150" cy="150" r="100" stroke="#06B6D4" strokeWidth="0.5" fill="none" strokeDasharray="3,3" />
          <circle cx="150" cy="150" r="60" stroke="#E4E4E1" strokeWidth="1" fill="none" />
          <circle cx="150" cy="150" r="5" fill="#1A1D23" />
          <circle cx="90" cy="150" r="8" fill="#06B6D4" />
          <circle cx="210" cy="150" r="8" fill={hoveredGroup ? "#FB7A5C" : "#06B6D4"} />
          <circle cx="150" cy="50" r="8" fill="#06B6D4" />
          <circle cx="150" cy="250" r="8" fill="#06B6D4" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[400px]">
      <Canvas
        camera={{ position: [0, 1.2, 5.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <OrbitSystem hoveredGroup={hoveredGroup} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}
