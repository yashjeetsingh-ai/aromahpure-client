import { useEffect, useRef, useState } from 'react'

const AnimatedWaveBackground = () => {
  const containerRef = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // If user prefers reduced motion, render static background
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary to-primary-dark opacity-50" />
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {/* Simplified gradient background layers using CSS transforms (GPU accelerated) */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(180deg, rgba(53, 76, 71, 0.3) 0%, rgba(166, 177, 160, 0.1) 50%, rgba(212, 181, 106, 0.2) 100%)',
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Simplified wave layers using CSS transforms instead of SVG path animations */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, 
            rgba(53, 76, 71, 0.15) 0%, 
            transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 100%, 
            rgba(212, 181, 106, 0.1) 0%, 
            transparent 50%)`,
          opacity: 0.08,
          transform: 'translateZ(0)',
          animation: 'waveFloat 20s ease-in-out infinite',
        }}
      />

      {/* Reduced number of floating orbs - using CSS animations */}
      <div 
        className="absolute top-16 right-8 w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 181, 106, 0.3) 0%, transparent 70%)',
          opacity: 0.05,
          transform: 'translateZ(0)',
          animation: 'orbFloat1 12s ease-in-out infinite',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute bottom-48 left-0 w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(166, 177, 160, 0.3) 0%, transparent 70%)',
          opacity: 0.05,
          transform: 'translateZ(0)',
          animation: 'orbFloat2 15s ease-in-out infinite',
          filter: 'blur(30px)',
        }}
      />
      <div 
        className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 181, 106, 0.2) 0%, transparent 70%)',
          opacity: 0.04,
          transform: 'translateZ(0)',
          animation: 'orbFloat3 18s ease-in-out infinite',
          filter: 'blur(25px)',
        }}
      />

      {/* CSS animations - much more performant than JS animations */}
      <style>{`
        @keyframes waveFloat {
          0%, 100% {
            transform: translateY(0) translateZ(0) scale(1);
          }
          50% {
            transform: translateY(-20px) translateZ(0) scale(1.05);
          }
        }

        @keyframes orbFloat1 {
          0%, 100% {
            transform: translate(0, 0) translateZ(0) scale(1);
          }
          33% {
            transform: translate(15px, -20px) translateZ(0) scale(1.1);
          }
          66% {
            transform: translate(-10px, 10px) translateZ(0) scale(0.95);
          }
        }

        @keyframes orbFloat2 {
          0%, 100% {
            transform: translate(0, 0) translateZ(0) scale(1);
          }
          50% {
            transform: translate(20px, -15px) translateZ(0) scale(1.15);
          }
        }

        @keyframes orbFloat3 {
          0%, 100% {
            transform: translate(0, 0) translateZ(0) scale(1);
          }
          50% {
            transform: translate(-15px, 10px) translateZ(0) scale(1.2);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AnimatedWaveBackground
