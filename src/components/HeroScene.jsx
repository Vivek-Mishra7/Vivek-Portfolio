import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Component that manages the particles and connections
function NetworkGraph({ isLowEnd }) {
  const groupRef = useRef();
  const lineGeomRef = useRef();
  const { pointer } = useThree();

  const nodeCount = isLowEnd ? 18 : 35;
  const connectionDistance = 2.4;

  // Generate initial node positions
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < nodeCount; i++) {
      // Cluster some in the center, distribute others
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 5;
      arr.push({
        origX: x,
        origY: y,
        origZ: z,
        x: x,
        y: y,
        z: z,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.4,
        id: i,
      });
    }
    return arr;
  }, [nodeCount]);

  // Keep references to node meshes
  const nodeRefs = useRef([]);
  
  // Set up array size for refs
  useEffect(() => {
    nodeRefs.current = nodeRefs.current.slice(0, nodeCount);
  }, [nodeCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow container rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.05;
    }

    // Convert screen coordinates to rough 3D position
    // Center of graph is around (0,0,0)
    const mouse3D = new THREE.Vector3(pointer.x * 5.5, pointer.y * 4, 0);

    // Update node positions
    nodes.forEach((node, index) => {
      const mesh = nodeRefs.current[index];
      if (!mesh) return;

      // Base idle drift (lissajous-like movement)
      let targetX = node.origX + Math.sin(time * node.speed + node.phaseX) * 0.25;
      let targetY = node.origY + Math.cos(time * node.speed + node.phaseY) * 0.25;
      let targetZ = node.origZ + Math.sin(time * node.speed * 0.5 + node.phaseZ) * 0.25;

      // Cursor pull effect
      const nodePos = new THREE.Vector3(targetX, targetY, targetZ);
      // Rotate mouse3D counter to group rotation to align relative coordinate systems
      const alignedMouse = mouse3D.clone();
      if (groupRef.current) {
        alignedMouse.applyEuler(new THREE.Euler(0, -groupRef.current.rotation.y, 0));
      }
      
      const distToMouse = nodePos.distanceTo(alignedMouse);

      if (distToMouse < 3.2) {
        // Pull towards mouse slightly
        const pullStrength = (3.2 - distToMouse) * 0.06;
        const dir = new THREE.Vector3().subVectors(alignedMouse, nodePos).normalize();
        targetX += dir.x * pullStrength;
        targetY += dir.y * pullStrength;
        targetZ += dir.z * pullStrength;
      }

      // Update actual position
      node.x = THREE.MathUtils.lerp(node.x, targetX, 0.1);
      node.y = THREE.MathUtils.lerp(node.y, targetY, 0.1);
      node.z = THREE.MathUtils.lerp(node.z, targetZ, 0.1);

      mesh.position.set(node.x, node.y, node.z);
    });

    // Update connecting lines
    if (lineGeomRef.current) {
      const linePositions = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z);

          if (dist < connectionDistance) {
            linePositions.push(n1.x, n1.y, n1.z);
            linePositions.push(n2.x, n2.y, n2.z);
          }
        }
      }

      // Update positions buffer
      const positionAttr = lineGeomRef.current.getAttribute('position');
      if (positionAttr) {
        // Resize array if necessary
        const arr = new Float32Array(linePositions);
        lineGeomRef.current.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        lineGeomRef.current.getAttribute('position').needsUpdate = true;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node Spheres */}
      {nodes.map((node, i) => (
        <mesh 
          key={node.id} 
          ref={el => nodeRefs.current[i] = el}
        >
          <sphereGeometry args={[i % 4 === 0 ? 0.11 : 0.07, 12, 12]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? '#FB7A5C' : '#06B6D4'} 
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Connection Edges */}
      <lineSegments>
        <bufferGeometry ref={lineGeomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#1A1D23" 
          transparent 
          opacity={0.12} 
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

// Main exported scene
export default function HeroScene() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Check if webgl is supported
    try {
      const canvas = document.createElement('canvas');
      const support = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setHasWebGL(support);
    } catch (e) {
      setHasWebGL(false);
    }

    // Check device specs / screen width
    if (window.innerWidth < 768) {
      setIsLowEndDevice(true);
    }
  }, []);

  if (!hasWebGL) {
    // Fallback static visualization
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="max-w-md">
          <circle cx="200" cy="200" r="100" stroke="#06B6D4" strokeWidth="1" fill="none" strokeDasharray="5,5" />
          <circle cx="200" cy="200" r="160" stroke="#FB7A5C" strokeWidth="0.5" fill="none" />
          <line x1="50" y1="200" x2="350" y2="200" stroke="#1A1D23" strokeWidth="0.5" />
          <line x1="200" y1="50" x2="200" y2="350" stroke="#1A1D23" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="6" fill="#06B6D4" />
          <circle cx="100" cy="200" r="4" fill="#1A1D23" />
          <circle cx="300" cy="200" r="4" fill="#1A1D23" />
          <circle cx="200" cy="100" r="4" fill="#FB7A5C" />
          <circle cx="200" cy="300" r="4" fill="#06B6D4" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <NetworkGraph isLowEnd={isLowEndDevice} />
        {/* Disable controls for clean scroll overlay interaction, but enable subtle mouse rotates */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          rotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
