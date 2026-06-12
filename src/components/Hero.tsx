import React, { useRef, useState, useEffect } from 'react'
import { useScroll, MotionValue, motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from './ui/Button'
import { useAppStore } from '../store/useAppStore'

// 3D Laptop Component animated via Scroll Progress
const Laptop3D: React.FC<{ scrollYProgress: MotionValue<number> }> = ({ scrollYProgress }) => {
  const laptopGroupRef = useRef<THREE.Group>(null)
  const lidRef = useRef<THREE.Group>(null)
  const { openRegisterModal } = useAppStore()

  useFrame(() => {
    if (!scrollYProgress) return
    const progress = scrollYProgress.get()

    // 1. Lid rotation (X-axis): Starts open (-0.2 rad / ~101deg open angle) at scroll 0,
    // and slowly closes to fully flat on the keyboard base (-Math.PI / 2 rad) at scroll 1.
    const lidAngle = -0.2 - progress * (Math.PI / 2 - 0.2)
    if (lidRef.current) {
      lidRef.current.rotation.x = lidAngle
    }

    // 2. Laptop positioning: Perfectly straight-facing (rotation.y = 0)
    // with a constant forward tilt (rotation.x = 0.28) to show 3D keyboard base depth.
    if (laptopGroupRef.current) {
      laptopGroupRef.current.rotation.x = 0.28 // Constant professional base tilt
      laptopGroupRef.current.rotation.y = 0 // Perfectly straight (no angle)
      laptopGroupRef.current.rotation.z = 0 // Perfectly level

      const scale = 1.25
      laptopGroupRef.current.scale.set(scale, scale, scale)
      laptopGroupRef.current.position.y = -0.6
    }
  })

  const handleLearnMore = () => {
    const nextSection = document.querySelector('#about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <group ref={laptopGroupRef} position={[0, -0.6, 0]}>
      {/* 1. HINGE BAR */}
      <mesh position={[0, 0, -1.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 3.2, 16]} />
        <meshStandardMaterial color="#4a4d51" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* 2. KEYBOARD BASE (Chassis) */}
      <group position={[0, -0.04, 0]}>
        {/* Main Base slab */}
        <mesh>
          <boxGeometry args={[3.4, 0.08, 2.2]} />
          <meshStandardMaterial color="#b0b3b8" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Keyboard recess area */}
        <mesh position={[0, 0.041, -0.3]}>
          <boxGeometry args={[3.0, 0.002, 1.1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        {/* Trackpad area */}
        <mesh position={[0, 0.041, 0.6]}>
          <boxGeometry args={[0.8, 0.002, 0.5]} />
          <meshStandardMaterial color="#9ea1a5" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>

      {/* 3. SCREEN LID GROUP (Hinged at the back edge) */}
      <group ref={lidRef} position={[0, 0, -1.1]} rotation={[-0.2, 0, 0]}>
        {/* Lid cover back panel */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[3.4, 2.2, 0.06]} />
          <meshStandardMaterial color="#b0b3b8" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Screen Bezel border */}
        <mesh position={[0, 1.1, 0.031]}>
          <boxGeometry args={[3.2, 2.0, 0.002]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>

        {/* INTERACTIVE HTML SCREEN */}
        <Html
          transform
          distanceFactor={1.48}
          position={[0, 1.1, 0.035]}
          className="w-[800px] h-[500px] bg-slate-950 rounded-sm overflow-hidden select-text pointer-events-auto"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="w-full h-full relative overflow-hidden select-text flex flex-col items-center justify-center text-center p-8 space-y-6">
            {/* Background inside laptop screen */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600"
                alt="Classroom"
                className="w-full h-full object-cover"
                decoding="async"
              />
              <div className="absolute inset-0 bg-slate-950/60 backdrop-brightness-95" />
            </div>

            {/* Content inside laptop screen */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
              <span className="inline-block px-3 py-1 text-xs font-bold text-brand-pink bg-brand-pink/10 rounded-full border border-brand-pink/20 uppercase tracking-widest animate-pulse font-sans">
                Welcome to Smart Academy
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight font-sans tracking-tight max-w-2xl">
                Achieve your future
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-blue">
                  With Smart Academy
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-200 font-body leading-relaxed max-w-xl">
                Smart Academy is a place where children can learn, play, and grow in a safe and
                supportive environment. Join us to unlock your child's potential!
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="pink" size="lg" onClick={openRegisterModal}>
                  Register Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-dark"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Html>
      </group>
    </group>
  )
}

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { openRegisterModal } = useAppStore()
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLearnMore = () => {
    const nextSection = document.querySelector('#about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Mobile-specific static 2D Hero (fully responsive and optimized)
  if (isMobile) {
    return (
      <section
        id="home"
        className="relative min-h-[550px] sm:min-h-[650px] flex items-center overflow-hidden py-20 bg-slate-900 text-white"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600"
            alt="Classroom"
            className="w-full h-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-slate-950/65 backdrop-brightness-75" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-3xl space-y-6 text-center mx-auto">
            {/* Animated Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-2"
            >
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight font-sans">
                Achieve your future
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-blue">
                  With Smart Academy
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-slate-200 text-base sm:text-lg font-body leading-relaxed max-w-xl mx-auto"
            >
              Smart Academy is a place where children can learn, play, and grow in a safe and
              supportive environment. Join us to unlock your child's potential!
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-xs sm:max-w-none mx-auto"
            >
              <Button
                variant="pink"
                size="lg"
                onClick={openRegisterModal}
                className="w-full sm:w-auto"
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-dark w-full sm:w-auto"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop 3D Laptop Hero
  return (
    <div ref={containerRef} className="relative h-[200vh] bg-white select-none">
      {/* Sticky container to lock viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Soft, premium ambient light glows (light mode studio lighting) */}
        <div className="absolute top-[10%] left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-brand-pink/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-brand-blue/[0.03] blur-[100px] pointer-events-none" />

        {/* 3D CANVAS WRAPPER */}
        <div className="w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            className="w-full h-full"
            gl={{ antialias: true }}
          >
            {/* Ambient and directional lights */}
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} />
            <pointLight position={[-5, 5, -5]} intensity={0.5} />

            {/* Render 3D Laptop */}
            <Laptop3D scrollYProgress={scrollYProgress} />
          </Canvas>
        </div>
      </div>
    </div>
  )
}
