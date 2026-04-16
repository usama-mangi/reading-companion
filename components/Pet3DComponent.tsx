import React, { useRef, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';

interface Pet3DProps {
  petType: string;
  color?: string;
  isHappy?: boolean;
  isEating?: boolean;
}

// Simple animated 3D pet character
function AnimatedPet({ petType, color, isHappy, isEating }: Pet3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  
  // Animation state
  const bounceOffset = useRef(0);
  const tailWagAngle = useRef(0);
  
  useFrame((state, delta) => {
    if (!groupRef.current || !bodyRef.current) return;
    
    // Idle breathing animation
    const time = state.clock.getElapsedTime();
    bounceOffset.current = Math.sin(time * 3) * 0.05;
    
    // Happy bouncing
    if (isHappy) {
      groupRef.current.position.y = Math.abs(Math.sin(time * 8)) * 0.3;
    } else {
      groupRef.current.position.y = bounceOffset.current;
    }
    
    // Tail wagging (represented by a small box that rotates)
    tailWagAngle.current = Math.sin(time * 10) * 0.5;
    
    // Eating animation - head bobs up and down
    if (isEating && headRef.current) {
      headRef.current.position.y = 0.6 + Math.sin(time * 15) * 0.1;
    } else if (headRef.current) {
      headRef.current.position.y = 0.6;
    }
    
    // Rotate slightly to face viewer
    groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
  });
  
  const petColor = useMemo(() => new THREE.Color(color || '#FF6B6B'), [color]);
  const eyeColor = useMemo(() => new THREE.Color('#000000'), []);
  
  return (
    <group ref={groupRef}>
      {/* Body */}
      <Sphere
        ref={bodyRef}
        args={[0.5, 32, 32]}
        position={[0, 0.5, 0]}
      >
        <meshStandardMaterial color={petColor} />
      </Sphere>
      
      {/* Head */}
      <Sphere
        ref={headRef}
        args={[0.35, 32, 32]}
        position={[0, 0.6, 0]}
      >
        <meshStandardMaterial color={petColor} />
      </Sphere>
      
      {/* Eyes */}
      <Sphere args={[0.05, 16, 16]} position={[-0.12, 0.65, 0.28]}>
        <meshStandardMaterial color={eyeColor} />
      </Sphere>
      <Sphere args={[0.05, 16, 16]} position={[0.12, 0.65, 0.28]}>
        <meshStandardMaterial color={eyeColor} />
      </Sphere>
      
      {/* Nose */}
      <Sphere args={[0.04, 16, 16]} position={[0, 0.58, 0.32]}>
        <meshStandardMaterial color="#FF9999" />
      </Sphere>
      
      {/* Ears based on pet type */}
      {petType === 'cat' && (
        <>
          <Cone args={[0.08, 0.2, 32]} position={[-0.2, 0.85, 0]} rotation={[0, 0, -0.5]}>
            <meshStandardMaterial color={petColor} />
          </Cone>
          <Cone args={[0.08, 0.2, 32]} position={[0.2, 0.85, 0]} rotation={[0, 0, 0.5]}>
            <meshStandardMaterial color={petColor} />
          </Cone>
        </>
      )}
      
      {petType === 'dog' && (
        <>
          <Sphere args={[0.1, 16, 16]} position={[-0.25, 0.75, 0]}>
            <meshStandardMaterial color={petColor} />
          </Sphere>
          <Sphere args={[0.1, 16, 16]} position={[0.25, 0.75, 0]}>
            <meshStandardMaterial color={petColor} />
          </Sphere>
        </>
      )}
      
      {petType === 'bird' && (
        <>
          <Cone args={[0.06, 0.15, 32]} position={[-0.2, 0.9, 0]} rotation={[0, 0, -0.3]}>
            <meshStandardMaterial color={petColor} />
          </Cone>
          <Cone args={[0.06, 0.15, 32]} position={[0.2, 0.9, 0]} rotation={[0, 0, 0.3]}>
            <meshStandardMaterial color={petColor} />
          </Cone>
        </>
      )}
      
      {/* Tail */}
      <group position={[0, 0.5, -0.4]} rotation={[tailWagAngle.current, 0, 0]}>
        {petType === 'cat' ? (
          <Cylinder args={[0.03, 0.05, 0.4, 16]} position={[0, 0.2, -0.2]} rotation={[0.5, 0, 0]}>
            <meshStandardMaterial color={petColor} />
          </Cylinder>
        ) : petType === 'dog' ? (
          <Box args={[0.08, 0.15, 0.3]} position={[0, 0.15, -0.15]}>
            <meshStandardMaterial color={petColor} />
          </Box>
        ) : (
          <Cone args={[0.08, 0.2, 32]} position={[0, 0.1, -0.1]} rotation={[0.3, 0, 0]}>
            <meshStandardMaterial color={petColor} />
          </Cone>
        )}
      </group>
      
      {/* Legs */}
      <Cylinder args={[0.06, 0.06, 0.25, 16]} position={[-0.25, 0.125, 0.2]} rotation={[0, 0, 0.1]}>
        <meshStandardMaterial color={petColor} />
      </Cylinder>
      <Cylinder args={[0.06, 0.06, 0.25, 16]} position={[0.25, 0.125, 0.2]} rotation={[0, 0, -0.1]}>
        <meshStandardMaterial color={petColor} />
      </Cylinder>
      <Cylinder args={[0.06, 0.06, 0.25, 16]} position={[-0.25, 0.125, -0.2]} rotation={[0, 0, 0.1]}>
        <meshStandardMaterial color={petColor} />
      </Cylinder>
      <Cylinder args={[0.06, 0.06, 0.25, 16]} position={[0.25, 0.125, -0.2]} rotation={[0, 0, -0.1]}>
        <meshStandardMaterial color={petColor} />
      </Cylinder>
    </group>
  );
}

export default function Pet3DComponent({ petType, color, isHappy, isEating }: Pet3DProps) {
  return (
    <View style={styles.container}>
      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        style={styles.canvas}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />
        
        <AnimatedPet 
          petType={petType} 
          color={color} 
          isHappy={isHappy}
          isEating={isEating}
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 192,
    height: 192,
    backgroundColor: 'transparent',
  },
  canvas: {
    flex: 1,
  },
});
