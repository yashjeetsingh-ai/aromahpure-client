import { motion } from 'framer-motion'

const AnimatedWaveBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Layer 1: Deep background waves */}
      <svg 
        className="absolute top-0 left-0 w-full h-full opacity-20" 
        viewBox="0 0 360 760" 
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#354C47" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#4A635C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#A6B1A0" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4B56A" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#E8CF8F" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#354C47" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="waveGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A6B1A0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#354C47" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="waveGrad4" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A635C" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#354C47" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D4B56A" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveGrad5" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#D4B56A" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#A6B1A0" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#D4B56A" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="waveGrad6" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#354C47" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1F2E2A" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Glow filters */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Wave 1 - Top large wave */}
        <motion.path
          d="M 0 180 Q 90 120 180 180 T 360 180 L 360 0 L 0 0 Z"
          fill="url(#waveGrad1)"
          filter="url(#glow)"
          animate={{
            d: [
              "M 0 180 Q 90 110 180 180 T 360 170 L 360 0 L 0 0 Z",
              "M 0 190 Q 90 170 180 180 T 360 190 L 360 0 L 0 0 Z",
              "M 0 170 Q 90 140 180 190 T 360 180 L 360 0 L 0 0 Z",
              "M 0 180 Q 90 110 180 180 T 360 170 L 360 0 L 0 0 Z",
            ],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
          }}
        />

        {/* Wave 2 - Top secondary wave */}
        <motion.path
          d="M 0 140 Q 60 100 120 140 T 240 140 T 360 140 L 360 0 L 0 0 Z"
          fill="url(#waveGrad6)"
          opacity="0.4"
          animate={{
            d: [
              "M 0 140 Q 60 90 120 140 T 240 130 T 360 140 L 360 0 L 0 0 Z",
              "M 0 130 Q 60 120 120 130 T 240 150 T 360 130 L 360 0 L 0 0 Z",
              "M 0 150 Q 60 100 120 150 T 240 140 T 360 150 L 360 0 L 0 0 Z",
              "M 0 140 Q 60 90 120 140 T 240 130 T 360 140 L 360 0 L 0 0 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 0.5,
          }}
        />
        
        {/* Wave 3 - Upper middle wave */}
        <motion.path
          d="M 0 280 Q 80 240 160 280 T 320 280 T 360 280 L 360 200 L 0 200 Z"
          fill="url(#waveGrad4)"
          opacity="0.3"
          animate={{
            d: [
              "M 0 280 Q 80 230 160 280 T 320 270 T 360 280 L 360 200 L 0 200 Z",
              "M 0 290 Q 80 270 160 290 T 320 290 T 360 290 L 360 200 L 0 200 Z",
              "M 0 270 Q 80 250 160 270 T 320 280 T 360 270 L 360 200 L 0 200 Z",
              "M 0 280 Q 80 230 160 280 T 320 270 T 360 280 L 360 200 L 0 200 Z",
            ],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 1,
          }}
        />

        {/* Wave 4 - Center flowing wave */}
        <motion.path
          d="M 0 400 Q 100 360 200 400 T 360 400 L 360 320 L 0 320 Z"
          fill="url(#waveGrad5)"
          filter="url(#glow)"
          opacity="0.5"
          animate={{
            d: [
              "M 0 400 Q 100 350 200 400 T 360 390 L 360 320 L 0 320 Z",
              "M 0 410 Q 100 390 200 410 T 360 410 L 360 320 L 0 320 Z",
              "M 0 390 Q 100 370 200 390 T 360 400 L 360 320 L 0 320 Z",
              "M 0 400 Q 100 350 200 400 T 360 390 L 360 320 L 0 320 Z",
            ],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 1.5,
          }}
        />
        
        {/* Wave 5 - Lower middle wave */}
        <motion.path
          d="M 0 500 Q 90 460 180 500 T 360 500 L 360 420 L 0 420 Z"
          fill="url(#waveGrad3)"
          opacity="0.4"
          animate={{
            d: [
              "M 0 500 Q 90 450 180 500 T 360 490 L 360 420 L 0 420 Z",
              "M 0 510 Q 90 490 180 510 T 360 510 L 360 420 L 0 420 Z",
              "M 0 490 Q 90 470 180 490 T 360 500 L 360 420 L 0 420 Z",
              "M 0 500 Q 90 450 180 500 T 360 490 L 360 420 L 0 420 Z",
            ],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 2,
          }}
        />

        {/* Wave 6 - Bottom large wave */}
        <motion.path
          d="M 0 580 Q 120 530 240 580 T 360 580 L 360 760 L 0 760 Z"
          fill="url(#waveGrad2)"
          filter="url(#glowStrong)"
          animate={{
            d: [
              "M 0 580 Q 120 520 240 580 T 360 560 L 360 760 L 0 760 Z",
              "M 0 600 Q 120 570 240 600 T 360 600 L 360 760 L 0 760 Z",
              "M 0 570 Q 120 550 240 570 T 360 580 L 360 760 L 0 760 Z",
              "M 0 580 Q 120 520 240 580 T 360 560 L 360 760 L 0 760 Z",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 0.5,
          }}
        />

        {/* Wave 7 - Bottom secondary wave */}
        <motion.path
          d="M 0 650 Q 80 620 160 650 T 320 650 T 360 650 L 360 760 L 0 760 Z"
          fill="url(#waveGrad1)"
          opacity="0.5"
          animate={{
            d: [
              "M 0 650 Q 80 610 160 650 T 320 640 T 360 650 L 360 760 L 0 760 Z",
              "M 0 660 Q 80 650 160 660 T 320 660 T 360 660 L 360 760 L 0 760 Z",
              "M 0 640 Q 80 630 160 640 T 320 650 T 360 640 L 360 760 L 0 760 Z",
              "M 0 650 Q 80 610 160 650 T 320 640 T 360 650 L 360 760 L 0 760 Z",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 1,
          }}
        />

        {/* Wave 8 - Bottom accent wave */}
        <motion.path
          d="M 0 700 Q 60 680 120 700 T 240 700 T 360 700 L 360 760 L 0 760 Z"
          fill="url(#waveGrad4)"
          opacity="0.6"
          animate={{
            d: [
              "M 0 700 Q 60 675 120 700 T 240 695 T 360 700 L 360 760 L 0 760 Z",
              "M 0 705 Q 60 695 120 705 T 240 710 T 360 705 L 360 760 L 0 760 Z",
              "M 0 695 Q 60 685 120 695 T 240 700 T 360 695 L 360 760 L 0 760 Z",
              "M 0 700 Q 60 675 120 700 T 240 695 T 360 700 L 360 760 L 0 760 Z",
            ],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 1.5,
          }}
        />
      </svg>

      {/* Layer 2: Side waves */}
      <svg 
        className="absolute top-0 left-0 w-full h-full opacity-10" 
        viewBox="0 0 360 760" 
        preserveAspectRatio="none"
      >
        {/* Left side wave */}
        <motion.path
          d="M 0 0 Q 30 190 0 380 Q 40 570 0 760 L 80 760 Q 50 570 80 380 Q 60 190 80 0 Z"
          fill="url(#waveGrad2)"
          animate={{
            d: [
              "M 0 0 Q 30 190 0 380 Q 40 570 0 760 L 80 760 Q 50 570 80 380 Q 60 190 80 0 Z",
              "M 0 0 Q 50 190 0 380 Q 30 570 0 760 L 80 760 Q 60 570 80 380 Q 40 190 80 0 Z",
              "M 0 0 Q 40 190 0 380 Q 50 570 0 760 L 80 760 Q 40 570 80 380 Q 50 190 80 0 Z",
              "M 0 0 Q 30 190 0 380 Q 40 570 0 760 L 80 760 Q 50 570 80 380 Q 60 190 80 0 Z",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
          }}
        />

        {/* Right side wave */}
        <motion.path
          d="M 360 0 Q 330 190 360 380 Q 320 570 360 760 L 280 760 Q 310 570 280 380 Q 300 190 280 0 Z"
          fill="url(#waveGrad3)"
          animate={{
            d: [
              "M 360 0 Q 330 190 360 380 Q 320 570 360 760 L 280 760 Q 310 570 280 380 Q 300 190 280 0 Z",
              "M 360 0 Q 310 190 360 380 Q 340 570 360 760 L 280 760 Q 300 570 280 380 Q 320 190 280 0 Z",
              "M 360 0 Q 320 190 360 380 Q 310 570 360 760 L 280 760 Q 320 570 280 380 Q 310 190 280 0 Z",
              "M 360 0 Q 330 190 360 380 Q 320 570 360 760 L 280 760 Q 310 570 280 380 Q 300 190 280 0 Z",
            ],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 2,
          }}
        />
      </svg>
      
      {/* Layer 3: Floating 3D orbs */}
      <motion.div 
        className="absolute top-16 right-8 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-40 left-4 w-40 h-40 bg-primary-light/15 rounded-full blur-2xl"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div 
        className="absolute bottom-48 left-0 w-56 h-56 bg-secondary/12 rounded-full blur-3xl"
        animate={{
          y: [0, 18, 0],
          x: [0, -10, 0],
          scale: [1, 1.18, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div 
        className="absolute top-1/3 left-1/4 w-36 h-36 bg-primary-light/12 rounded-full blur-2xl"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-8 w-28 h-28 bg-accent/8 rounded-full blur-xl"
        animate={{
          y: [0, 12, 0],
          x: [0, -8, 0],
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/3 w-20 h-20 bg-accent/6 rounded-full blur-lg"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
          scale: [1, 1.1, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-secondary/8 rounded-full blur-xl"
        animate={{
          y: [0, 8, 0],
          scale: [1, 1.12, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Layer 4: Accent particles */}
      <motion.div 
        className="absolute top-1/4 left-1/2 w-3 h-3 bg-accent/30 rounded-full"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-2/3 right-1/4 w-2 h-2 bg-accent/25 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.25, 0.5, 0.25],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 bg-secondary/20 rounded-full"
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}

export default AnimatedWaveBackground
