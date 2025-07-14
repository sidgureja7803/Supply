import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, Box, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

function Particles(props: any) {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => 
    new Float32Array(3000).map(() => (Math.random() - 0.5) * 15), []
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  return (
    <>
      <Float
        speed={1}
        rotationIntensity={1}
        floatIntensity={2}
        position={[-6, 3, -8]}
      >
        <Octahedron args={[1.2]}>
          <meshStandardMaterial color="#60a5fa" transparent opacity={0.6} />
        </Octahedron>
      </Float>
      
      <Float
        speed={1.5}
        rotationIntensity={2}
        floatIntensity={1}
        position={[6, -2, -5]}
      >
        <Box args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.4} />
        </Box>
      </Float>
      
      <Float
        speed={0.8}
        rotationIntensity={1.5}
        floatIntensity={1.5}
        position={[3, 4, -6]}
      >
        <Sphere args={[0.8]}>
          <meshStandardMaterial color="#1d4ed8" transparent opacity={0.5} />
        </Sphere>
      </Float>
      
      <Float
        speed={1.2}
        rotationIntensity={0.8}
        floatIntensity={2.5}
        position={[-4, -3, -10]}
      >
        <Octahedron args={[0.7]}>
          <meshStandardMaterial color="#2563eb" transparent opacity={0.7} />
        </Octahedron>
      </Float>
      
      <Float
        speed={0.6}
        rotationIntensity={1.2}
        floatIntensity={1.8}
        position={[0, 6, -12]}
      >
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color="#1e40af" transparent opacity={0.3} />
        </Box>
      </Float>
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Particles />
          <FloatingGeometry />
        </Canvas>
      </Suspense>
    </div>
  );
} 