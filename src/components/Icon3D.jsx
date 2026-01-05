import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sphere, Box, Torus, Cylinder, Cone, Circle } from '@react-three/drei';
import * as THREE from 'three';

// Componente base para ícones 3D
const Icon3D = ({ type, color = '#0A6CFF', size = 1, interactive = true }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animação de rotação contínua
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2;
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 4) * 0.05);
      } else {
        meshRef.current.rotation.x = 0;
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    if (interactive) {
      setClicked(!clicked);
    }
  };

  const renderIcon = () => {
    switch (type) {
      case 'truck':
        return (
          <group>
            {/* Reboque */}
            <Box args={[4, 1.2, 12]} position={[0, 0.6, 0]}>
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </Box>
            {/* Cabine do caminhão */}
            <Box args={[1.8, 2, 2.5]} position={[-1.5, 1.5, -3]}>
              <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
            </Box>
            {/* Para-brisa */}
            <Box args={[1.6, 1.2, 0.1]} position={[-1.5, 2.2, -2.8]} rotation={[0.2, 0, 0]}>
              <meshPhysicalMaterial color="#87CEEB" metalness={0} roughness={0} transmission={0.9} opacity={0.7} />
            </Box>
            {/* Rodas dianteiras */}
            <Cylinder args={[0.4, 0.4, 0.3]} position={[-2.2, 0.4, -2]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#333" />
            </Cylinder>
            <Cylinder args={[0.4, 0.4, 0.3]} position={[-0.8, 0.4, -2]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#333" />
            </Cylinder>
            {/* Rodas traseiras (duplas) */}
            <Cylinder args={[0.4, 0.4, 0.3]} position={[-2.2, 0.4, 2]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#333" />
            </Cylinder>
            <Cylinder args={[0.4, 0.4, 0.3]} position={[-0.8, 0.4, 2]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#333" />
            </Cylinder>
            <Cylinder args={[0.4, 0.4, 0.3]} position={[0.6, 0.4, 2]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#333" />
            </Cylinder>
            <Cylinder args={[0.4, 0.4, 0.3]} position={[2, 0.4, 2]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#333" />
            </Cylinder>
            {/* Faróis */}
            <Sphere args={[0.15]} position={[-2.8, 1.2, -2.5]}>
              <meshStandardMaterial color="#FFFF99" emissive="#FFFF99" emissiveIntensity={0.3} />
            </Sphere>
            <Sphere args={[0.15]} position={[-2.8, 1.2, -1.5]}>
              <meshStandardMaterial color="#FFFF99" emissive="#FFFF99" emissiveIntensity={0.3} />
            </Sphere>
            {/* Escapamento */}
            <Cylinder args={[0.05, 0.08, 0.8]} position={[2.5, 0.3, -1]} rotation={[0, 0, Math.PI / 6]}>
              <meshStandardMaterial color="#666" />
            </Cylinder>
          </group>
        );

      case 'shield':
        return (
          <group>
            {/* Escudo principal */}
            <Cone args={[1.2, 3, 8]} position={[0, 0, 0]} rotation={[0, 0, Math.PI]}>
              <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
            </Cone>
            {/* Bordas em relevo */}
            <Torus args={[1.1, 0.05, 8, 16]} position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
            </Torus>
            {/* Centro do escudo */}
            <Circle args={[0.6]} position={[0, -0.1, 0.01]}>
              <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
            </Circle>
            {/* Detalhes ornamentais */}
            <Box args={[0.1, 0.8, 0.05]} position={[-0.3, -0.8, 0.02]}>
              <meshStandardMaterial color="#FFD700" />
            </Box>
            <Box args={[0.1, 0.8, 0.05]} position={[0.3, -0.8, 0.02]}>
              <meshStandardMaterial color="#FFD700" />
            </Box>
            <Box args={[0.6, 0.1, 0.05]} position={[0, -1.2, 0.02]}>
              <meshStandardMaterial color="#FFD700" />
            </Box>
          </group>
        );

      case 'chart':
        return (
          <group>
            {/* Base do gráfico */}
            <Box args={[4, 0.2, 3]} position={[0, -1.5, 0]}>
              <meshStandardMaterial color="#666" />
            </Box>
            {/* Barras do gráfico com gradientes */}
            <Box args={[0.4, 3, 0.4]} position={[-1.2, 0.5, 0]}>
              <meshStandardMaterial color="#FF6A00" />
            </Box>
            <Box args={[0.4, 2.2, 0.4]} position={[-0.4, 0.1, 0]}>
              <meshStandardMaterial color="#0A6CFF" />
            </Box>
            <Box args={[0.4, 3.8, 0.4]} position={[0.4, 1.4, 0]}>
              <meshStandardMaterial color="#00C853" />
            </Box>
            <Box args={[0.4, 2.8, 0.4]} position={[1.2, 0.9, 0]}>
              <meshStandardMaterial color="#FFD700" />
            </Box>
            {/* Eixos */}
            <Cylinder args={[0.02, 0.02, 4]} position={[-1.8, -1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color="#999" />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 3]} position={[0, -1.5, -1.8]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#999" />
            </Cylinder>
            {/* Linhas de grade */}
            {Array.from({ length: 4 }, (_, i) => (
              <Box key={i} args={[4.2, 0.01, 0.01]} position={[0, -1.5 + (i * 0.8), 0]}>
                <meshStandardMaterial color="#999" opacity={0.3} transparent />
              </Box>
            ))}
          </group>
        );

      case 'gears':
        return (
          <group>
            {/* Engrenagem maior */}
            <Cylinder args={[1, 1, 0.3, 32]} position={[-0.8, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
            </Cylinder>
            {/* Dentes da engrenagem maior */}
            {Array.from({ length: 16 }, (_, i) => (
              <Box
                key={`gear1-${i}`}
                args={[0.15, 0.6, 0.15]}
                position={[
                  -0.8 + Math.cos((i / 16) * Math.PI * 2) * 1.15,
                  Math.sin((i / 16) * Math.PI * 2) * 1.15,
                  0
                ]}
                rotation={[0, 0, (i / 16) * Math.PI * 2]}
              >
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </Box>
            ))}
            {/* Engrenagem menor */}
            <Cylinder args={[0.7, 0.7, 0.25, 24]} position={[0.8, 0, 0]}>
              <meshStandardMaterial color="#FF6A00" metalness={0.9} roughness={0.1} />
            </Cylinder>
            {/* Dentes da engrenagem menor */}
            {Array.from({ length: 12 }, (_, i) => (
              <Box
                key={`gear2-${i}`}
                args={[0.12, 0.5, 0.12]}
                position={[
                  0.8 + Math.cos((i / 12) * Math.PI * 2) * 0.85,
                  Math.sin((i / 12) * Math.PI * 2) * 0.85,
                  0
                ]}
                rotation={[0, 0, (i / 12) * Math.PI * 2]}
              >
                <meshStandardMaterial color="#FF6A00" metalness={0.9} roughness={0.1} />
              </Box>
            ))}
            {/* Eixo central */}
            <Cylinder args={[0.05, 0.05, 0.4]} position={[-0.8, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#666" />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 0.4]} position={[0.8, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#666" />
            </Cylinder>
          </group>
        );

      case 'money':
        return (
          <group>
            {/* Moeda principal */}
            <Cylinder args={[1.2, 1.2, 0.15, 64]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
            </Cylinder>
            {/* Anéis concêntricos */}
            <Torus args={[0.9, 0.02, 16, 32]} position={[0, 0.08, 0]}>
              <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
            </Torus>
            <Torus args={[0.7, 0.02, 16, 32]} position={[0, 0.09, 0]}>
              <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
            </Torus>
            <Torus args={[0.5, 0.02, 16, 32]} position={[0, 0.1, 0]}>
              <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
            </Torus>
            {/* Detalhes da moeda */}
            <Cylinder args={[0.3, 0.3, 0.02, 16]} position={[0, 0.11, 0]}>
              <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
            </Cylinder>
            {/* Sombra */}
            <Circle args={[1.3]} position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#000" opacity={0.2} transparent />
            </Circle>
          </group>
        );

      case 'ai':
        return (
          <group>
            {/* Núcleo de IA */}
            <Sphere args={[1]} position={[0, 0, 0]}>
              <meshPhysicalMaterial
                color={color}
                metalness={0.7}
                roughness={0.3}
                transmission={0.1}
                emissive={color}
                emissiveIntensity={0.1}
              />
            </Sphere>
            {/* Anéis orbitais */}
            <Torus args={[1.3, 0.02, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#0A6CFF" emissive="#0A6CFF" emissiveIntensity={0.3} />
            </Torus>
            <Torus args={[1.6, 0.02, 16, 32]} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <meshStandardMaterial color="#FF6A00" emissive="#FF6A00" emissiveIntensity={0.3} />
            </Torus>
            {/* Conexões neurais */}
            {Array.from({ length: 12 }, (_, i) => (
              <Cylinder
                key={`neural-${i}`}
                args={[0.01, 0.01, 0.8]}
                position={[
                  Math.cos((i / 12) * Math.PI * 2) * 1.8,
                  Math.sin((i / 12) * Math.PI * 2) * 1.8,
                  0
                ]}
                rotation={[0, 0, (i / 12) * Math.PI * 2 + Math.PI / 2]}
              >
                <meshStandardMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={0.5} />
              </Cylinder>
            ))}
            {/* Partículas de dados */}
            {Array.from({ length: 8 }, (_, i) => (
              <Sphere
                key={`particle-${i}`}
                args={[0.08]}
                position={[
                  (Math.random() - 0.5) * 3,
                  (Math.random() - 0.5) * 3,
                  (Math.random() - 0.5) * 3
                ]}
              >
                <meshStandardMaterial
                  color={i % 2 === 0 ? "#0A6CFF" : "#FF6A00"}
                  emissive={i % 2 === 0 ? "#0A6CFF" : "#FF6A00"}
                  emissiveIntensity={0.8}
                />
              </Sphere>
            ))}
            {/* Pulsação do núcleo */}
            <Sphere args={[1.05]} position={[0, 0, 0]}>
              <meshStandardMaterial
                color={color}
                opacity={0.1}
                transparent
                emissive={color}
                emissiveIntensity={0.2}
              />
            </Sphere>
          </group>
        );

      case 'users':
        return (
          <group>
            {/* Pessoa 1 - Detalhada */}
            <Cylinder args={[0.2, 0.2, 1]} position={[-0.8, 0.5, 0]}>
              <meshStandardMaterial color="#8B4513" />
            </Cylinder>
            <Sphere args={[0.25]} position={[-0.8, 1.1, 0]}>
              <meshStandardMaterial color="#FDBCB4" />
            </Sphere>
            {/* Braços */}
            <Cylinder args={[0.08, 0.08, 0.6]} position={[-1, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
              <meshStandardMaterial color="#FDBCB4" />
            </Cylinder>
            <Cylinder args={[0.08, 0.08, 0.6]} position={[-0.6, 0.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <meshStandardMaterial color="#FDBCB4" />
            </Cylinder>

            {/* Pessoa 2 */}
            <Cylinder args={[0.18, 0.18, 0.9]} position={[0.8, 0.45, 0]}>
              <meshStandardMaterial color="#654321" />
            </Cylinder>
            <Sphere args={[0.22]} position={[0.8, 1, 0]}>
              <meshStandardMaterial color="#D2B48C" />
            </Sphere>

            {/* Pessoa 3 */}
            <Cylinder args={[0.19, 0.19, 0.95]} position={[0, 0.475, 0.8]}>
              <meshStandardMaterial color="#8B4513" />
            </Cylinder>
            <Sphere args={[0.23]} position={[0, 1.05, 0.8]}>
              <meshStandardMaterial color="#FDBCB4" />
            </Sphere>

            {/* Conexões entre pessoas */}
            <Cylinder args={[0.02, 0.02, 1.6]} position={[-0.4, 0.8, 0.4]} rotation={[0, Math.PI / 4, 0]}>
              <meshStandardMaterial color="#0A6CFF" emissive="#0A6CFF" emissiveIntensity={0.3} />
            </Cylinder>
          </group>
        );

      case 'rocket':
        return (
          <group>
            {/* Corpo do foguete */}
            <Cylinder args={[0.25, 0.35, 3]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </Cylinder>
            {/* Ponta cônica */}
            <Cone args={[0.25, 0.8]} position={[0, 2.4, 0]}>
              <meshStandardMaterial color="#FF4444" />
            </Cone>
            {/* Aletas */}
            <Box args={[0.08, 1, 0.08]} position={[-0.3, -0.5, 0]}>
              <meshStandardMaterial color="#666" />
            </Box>
            <Box args={[0.08, 1, 0.08]} position={[0.3, -0.5, 0]}>
              <meshStandardMaterial color="#666" />
            </Box>
            <Box args={[0.08, 1, 0.08]} position={[0, -0.5, -0.3]}>
              <meshStandardMaterial color="#666" />
            </Box>
            <Box args={[0.08, 1, 0.08]} position={[0, -0.5, 0.3]}>
              <meshStandardMaterial color="#666" />
            </Box>
            {/* Janelas */}
            <Cylinder args={[0.15, 0.15, 0.02, 16]} position={[0, 1.5, 0.26]}>
              <meshPhysicalMaterial color="#87CEEB" metalness={0} roughness={0} transmission={0.9} opacity={0.8} />
            </Cylinder>
            {/* Chamas realistas */}
            <Cone args={[0.2, 1.2]} position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
              <meshStandardMaterial color="#FF6A00" emissive="#FF6A00" emissiveIntensity={0.8} />
            </Cone>
            <Cone args={[0.15, 0.8]} position={[0, -1.8, 0]} rotation={[Math.PI, 0, 0]}>
              <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={1} />
            </Cone>
            <Cone args={[0.1, 0.5]} position={[0, -1.5, 0]} rotation={[Math.PI, 0, 0]}>
              <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1.2} />
            </Cone>
            {/* Fumaça */}
            <Sphere args={[0.3]} position={[0, -2.5, 0]}>
              <meshStandardMaterial color="#666" opacity={0.3} transparent />
            </Sphere>
          </group>
        );

      default:
        return (
          <Sphere args={[0.8]}>
            <meshStandardMaterial color={color} />
          </Sphere>
        );
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => interactive && setHovered(true)}
        onPointerOut={() => interactive && setHovered(false)}
        onClick={handleClick}
        scale={size}
      >
        {renderIcon()}
      </mesh>
    </Float>
  );
};

// Componente wrapper para o Canvas 3D
const Icon3DCanvas = ({ type, color, size = 1, width = 120, height = 120, interactive = true }) => {
  return (
    <div style={{ width, height, cursor: interactive ? 'pointer' : 'default' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <Icon3D type={type} color={color} size={size} interactive={interactive} />
      </Canvas>
    </div>
  );
};

export default Icon3DCanvas;