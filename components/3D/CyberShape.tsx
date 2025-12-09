import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const CyberShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Subtle parallax based on mouse
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY, 0.1);
    }
    
    if (wireframeRef.current) {
        wireframeRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        wireframeRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        
        // Counter rotation for effect
        wireframeRef.current.rotation.z -= 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      {/* Inner Core */}
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#00D9FF"
          emissive="#0A0E27"
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
          wireframe={false}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh ref={wireframeRef} scale={2.5}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial 
            color="#FF006E" 
            wireframe 
            transparent 
            opacity={0.3} 
        />
      </mesh>
      
      {/* Ambient particles or small details could be added here */}
    </Float>
  );
};