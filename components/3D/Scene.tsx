import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { CyberShape } from './CyberShape';

export const Scene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} color="#00D9FF" />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FF006E" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#00D9FF" />
          
          <CyberShape />
          
          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.7} 
            scale={10} 
            blur={2.5} 
            far={4} 
            color="#00D9FF"
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};