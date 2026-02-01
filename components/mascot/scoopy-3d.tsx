"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Mesh, Group } from "three"
import { Html } from "@react-three/drei"

function FrozenBasketMascot({
  mood,
  isListening,
  isSpeaking,
}: {
  mood: "idle" | "happy" | "excited" | "thinking"
  isListening: boolean
  isSpeaking: boolean
}) {
  const groupRef = useRef<Group>(null)
  const headRef = useRef<Mesh>(null)
  const bodyRef = useRef<Mesh>(null)
  const leftArmRef = useRef<Group>(null)
  const rightArmRef = useRef<Group>(null)
  const leftLegRef = useRef<Group>(null)
  const rightLegRef = useRef<Group>(null)
  const eyesRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.15

      if (mood === "excited") {
        groupRef.current.rotation.y = Math.sin(time * 2) * 0.3
      } else if (mood === "happy") {
        groupRef.current.rotation.y = Math.sin(time) * 0.1
      } else {
        groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.05
      }
    }

    if (headRef.current) {
      if (isSpeaking) {
        headRef.current.rotation.z = Math.sin(time * 10) * 0.1
        headRef.current.scale.setScalar(1 + Math.sin(time * 8) * 0.05)
      } else if (isListening) {
        headRef.current.rotation.z = Math.sin(time * 3) * 0.05
      } else {
        headRef.current.rotation.z = Math.sin(time) * 0.02
        headRef.current.scale.setScalar(1)
      }
    }

    if (leftArmRef.current && rightArmRef.current) {
      if (mood === "excited" || mood === "happy") {
        leftArmRef.current.rotation.z = Math.sin(time * 3) * 0.3 + 0.3
        rightArmRef.current.rotation.z = Math.sin(time * 3 + Math.PI) * 0.3 - 0.3
      } else {
        leftArmRef.current.rotation.z = Math.sin(time * 1.5) * 0.1 + 0.2
        rightArmRef.current.rotation.z = Math.sin(time * 1.5) * 0.1 - 0.2
      }
    }

    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time * 2) * 0.2
      rightLegRef.current.rotation.x = Math.sin(time * 2 + Math.PI) * 0.2
    }

    if (eyesRef.current) {
      const blink = Math.sin(time * 2)
      if (blink > 0.95) {
        eyesRef.current.scale.y = 0.1
      } else {
        eyesRef.current.scale.y = 1
      }
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.8}>
      <group ref={headRef} position={[0, 1.2, 0]}>
        {/* Left side - peach/salmon */}
        <mesh position={[-0.15, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32, 0, Math.PI]} />
          <meshStandardMaterial color="#FFB5A0" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Right side - purple */}
        <mesh position={[0.15, 0, 0]} rotation={[0, Math.PI, 0]}>
          <sphereGeometry args={[0.5, 32, 32, 0, Math.PI]} />
          <meshStandardMaterial color="#B8A4E8" roughness={0.4} metalness={0.1} />
        </mesh>

        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 0.35
          const colors = ["#FF6B9D", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B"]
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, 0.4, Math.sin(angle) * radius]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
              <meshStandardMaterial color={colors[i % colors.length]} />
            </mesh>
          )
        })}

        <mesh position={[0, -0.15, 0.45]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#C8B4E8" transparent opacity={0.9} />
        </mesh>

        <group ref={eyesRef} position={[0, 0.05, 0.35]}>
          {/* Left eye */}
          <mesh position={[-0.18, 0, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[-0.18, -0.02, 0.1]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#000000" />
            <mesh position={[0.03, 0.03, 0.05]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
            </mesh>
          </mesh>

          {/* Right eye */}
          <mesh position={[0.18, 0, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0.18, -0.02, 0.1]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#000000" />
            <mesh position={[0.03, 0.03, 0.05]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
            </mesh>
          </mesh>

          {/* Eyebrows */}
          <mesh position={[-0.18, 0.15, 0.05]} rotation={[0, 0, mood === "excited" ? 0.3 : -0.1]}>
            <capsuleGeometry args={[0.02, 0.15, 4, 8]} />
            <meshStandardMaterial color="#8B6F9E" />
          </mesh>
          <mesh position={[0.18, 0.15, 0.05]} rotation={[0, 0, mood === "excited" ? -0.3 : 0.1]}>
            <capsuleGeometry args={[0.02, 0.15, 4, 8]} />
            <meshStandardMaterial color="#8B6F9E" />
          </mesh>
        </group>

        <mesh position={[0, -0.15, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.03, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#6B4E71" />
        </mesh>
      </group>

      <mesh ref={bodyRef} position={[0, 0.4, 0]}>
        <capsuleGeometry args={[0.4, 0.6, 16, 32]} />
        <meshStandardMaterial color="#8B7AB8" roughness={0.6} />
      </mesh>

      {/* Logo plate on chest */}
      <mesh position={[0, 0.5, 0.42]}>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
        <meshStandardMaterial color="#5B8CC6" metalness={0.3} roughness={0.4} />
      </mesh>

      <group ref={leftArmRef} position={[-0.45, 0.6, 0]}>
        <mesh rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
          <meshStandardMaterial color="#9B8AC4" />
        </mesh>
        {/* Hand/Glove */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#A8D8EA" />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.45, 0.6, 0]}>
        <mesh rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
          <meshStandardMaterial color="#9B8AC4" />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#A8D8EA" />
        </mesh>
      </group>

      <group ref={leftLegRef} position={[-0.2, -0.1, 0]}>
        <mesh>
          <capsuleGeometry args={[0.12, 0.4, 8, 16]} />
          <meshStandardMaterial color="#8B7AB8" />
        </mesh>
        {/* Boot */}
        <mesh position={[0, -0.35, 0.05]}>
          <boxGeometry args={[0.2, 0.15, 0.3]} />
          <meshStandardMaterial color="#A8D8EA" />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.2, -0.1, 0]}>
        <mesh>
          <capsuleGeometry args={[0.12, 0.4, 8, 16]} />
          <meshStandardMaterial color="#8B7AB8" />
        </mesh>
        <mesh position={[0, -0.35, 0.05]}>
          <boxGeometry args={[0.2, 0.15, 0.3]} />
          <meshStandardMaterial color="#A8D8EA" />
        </mesh>
      </group>

      {isListening && (
        <Html center position={[0, 2.2, 0]}>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </Html>
      )}

      {isSpeaking && (
        <Html center position={[0, 2.2, 0]}>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1 bg-green-400 rounded-full animate-bounce"
                style={{
                  height: `${12 + Math.sin(Date.now() / 100 + i) * 8}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </Html>
      )}
    </group>
  )
}

export function Scoopy3D({
  mood,
  isListening,
  isSpeaking,
}: {
  mood: "idle" | "happy" | "excited" | "thinking"
  isListening: boolean
  isSpeaking: boolean
}) {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 50 }} className="w-full h-full">
      {/* Using enhanced lighting instead of HDR environment */}
      <ambientLight intensity={0.8} />
      <hemisphereLight args={["#FFE5CC", "#B8A4E8", 0.6]} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#FFE5CC" />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#B8A4E8" />
      <pointLight position={[0, -3, 5]} intensity={0.4} color="#A8D8EA" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
      <FrozenBasketMascot mood={mood} isListening={isListening} isSpeaking={isSpeaking} />
    </Canvas>
  )
}
