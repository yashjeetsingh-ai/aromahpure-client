import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Home, User, Bell, Sparkles, BarChart3 } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [ripple, setRipple] = useState({ show: false, x: 0, y: 0, index: -1 })
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [particles, setParticles] = useState([])

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: User, label: 'Account', path: '/account' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
  ]

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || 
             location.pathname === '/machines' ||
             location.pathname.startsWith('/machine/') ||
             location.pathname.startsWith('/device/')
    }
    if (path === '/account') {
      return location.pathname === '/account' || location.pathname === '/settings'
    }
    if (path === '/analytics') {
      return location.pathname === '/analytics' || 
             location.pathname === '/refill-history' ||
             location.pathname === '/maintenance'
    }
    return location.pathname === path
  }

  const activeIndex = navItems.findIndex(item => isActive(item.path))

  // Generate particles on click
  const createParticles = (x, y) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (i * 45) * (Math.PI / 180),
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 1000)
  }

  const handleClick = (e, path, index) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setRipple({ show: true, x, y, index })
    createParticles(e.clientX, e.clientY - 60)
    setTimeout(() => setRipple({ show: false, x: 0, y: 0, index: -1 }), 800)
    
    navigate(path)
  }

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      {/* Floating Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed w-2 h-2 rounded-full bg-accent pointer-events-none"
            initial={{ 
              x: particle.x - 4, 
              y: particle.y - 4,
              scale: 1,
              opacity: 1,
            }}
            animate={{ 
              x: particle.x + Math.cos(particle.angle) * 50 - 4,
              y: particle.y + Math.sin(particle.angle) * 50 - 4,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 10px rgba(212, 181, 106, 0.8)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Container with unique shape */}
      <div className="relative mx-2 mb-2">
        {/* Ambient glow behind nav */}
        <motion.div
          className="absolute inset-0 rounded-[32px] blur-xl"
          animate={{
            background: [
              'radial-gradient(ellipse at 30% 50%, rgba(212, 181, 106, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 70% 50%, rgba(212, 181, 106, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 30% 50%, rgba(212, 181, 106, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Outer glow ring */}
        <div 
          className="absolute -inset-[1px] rounded-[32px]"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 181, 106, 0.3) 0%, transparent 50%, rgba(212, 181, 106, 0.1) 100%)',
            padding: '1px',
          }}
        >
          <div className="w-full h-full rounded-[32px] bg-primary-dark" />
        </div>

        {/* Main navigation bar */}
        <div 
          className="relative rounded-[32px] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(53, 76, 71, 0.98) 0%, rgba(31, 46, 42, 0.99) 100%)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            boxShadow: `
              0 -20px 60px -15px rgba(0, 0, 0, 0.4),
              0 20px 60px -15px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.05)
            `,
          }}
        >
          {/* Animated aurora background */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px]">
            <motion.div
              className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{
                background: `
                  conic-gradient(
                    from 0deg,
                    transparent,
                    rgba(212, 181, 106, 0.03) 10%,
                    transparent 20%,
                    rgba(127, 195, 126, 0.02) 30%,
                    transparent 40%,
                    rgba(212, 181, 106, 0.03) 50%,
                    transparent 60%,
                    rgba(96, 165, 250, 0.02) 70%,
                    transparent 80%,
                    rgba(212, 181, 106, 0.03) 90%,
                    transparent
                  )
                `,
              }}
            />
          </div>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                'linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.03) 150%, transparent 200%)',
              ],
              x: ['-100%', '100%'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
          />

          {/* Top highlight line */}
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Navigation items container */}
          <div className="relative flex justify-around items-center py-3 px-4">
            {/* Floating active indicator blob */}
            <motion.div
              className="absolute h-14 rounded-2xl -z-0"
              initial={false}
              animate={{
                left: `${(activeIndex / navItems.length) * 100 + 2}%`,
                width: `${100 / navItems.length - 4}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Blob background */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 181, 106, 0.2) 0%, rgba(212, 181, 106, 0.05) 100%)',
                  boxShadow: `
                    0 0 30px rgba(212, 181, 106, 0.3),
                    inset 0 0 20px rgba(212, 181, 106, 0.1),
                    0 4px 15px -3px rgba(0, 0, 0, 0.3)
                  `,
                }}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Inner glow orb */}
              <motion.div
                className="absolute inset-2 rounded-xl opacity-50"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(212, 181, 106, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {navItems.map((item, index) => {
              const Icon = item.icon
              const active = isActive(item.path)
              const isHovered = hoveredIndex === index
              
              return (
                <motion.button
                  key={item.path}
                  onClick={(e) => handleClick(e, item.path, index)}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(-1)}
                  className="relative flex flex-col items-center justify-center py-2 px-4 rounded-2xl z-10"
                  style={{ width: `${100 / navItems.length}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, type: 'spring', stiffness: 200 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Ripple effect */}
                  <AnimatePresence>
                    {ripple.show && ripple.index === index && (
                      <motion.span
                        className="absolute rounded-full pointer-events-none"
                        initial={{ 
                          width: 0, 
                          height: 0, 
                          x: ripple.x, 
                          y: ripple.y,
                          opacity: 0.6,
                          background: 'radial-gradient(circle, rgba(212, 181, 106, 0.4) 0%, transparent 70%)',
                        }}
                        animate={{ 
                          width: 200, 
                          height: 200, 
                          x: ripple.x - 100, 
                          y: ripple.y - 100,
                          opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon with 3D effect */}
                  <motion.div
                    className="relative"
                    animate={active ? {
                      y: [0, -4, 0],
                      rotateY: [0, 10, -10, 0],
                    } : isHovered ? {
                      y: -2,
                      scale: 1.1,
                    } : {
                      y: 0,
                      scale: 1,
                    }}
                    transition={active ? {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    } : {
                      type: 'spring',
                      stiffness: 300,
                    }}
                    style={{ perspective: '100px' }}
                  >
                    {/* Multi-layer glow for active */}
                    {active && (
                      <>
                        <motion.div
                          className="absolute inset-0 blur-lg"
                          animate={{ 
                            opacity: [0.4, 0.7, 0.4],
                            scale: [1, 1.3, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Icon className="w-6 h-6 text-accent" />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 blur-md"
                          animate={{ opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Icon className="w-6 h-6 text-accent" />
                        </motion.div>
                      </>
                    )}
                    
                    {/* Main icon */}
                    <motion.div
                      animate={active ? {
                        rotate: [0, -8, 8, 0],
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon 
                        className={`w-6 h-6 relative z-10 transition-all duration-500 ${
                          active 
                            ? 'text-accent' 
                            : isHovered
                            ? 'text-white/90'
                            : 'text-secondary/60'
                        }`}
                        strokeWidth={active ? 2.5 : 2}
                        style={active ? {
                          filter: 'drop-shadow(0 0 12px rgba(212, 181, 106, 0.8))',
                        } : {}}
                      />
                    </motion.div>

                    {/* Sparkle effect for active */}
                    {active && (
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <Sparkles className="w-3 h-3 text-accent" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Label with elegant animation */}
                  <motion.span 
                    className={`text-[10px] font-semibold mt-1.5 tracking-wide transition-all duration-300 ${
                      active 
                        ? 'text-accent' 
                        : isHovered
                        ? 'text-white/80'
                        : 'text-secondary/50'
                    }`}
                    animate={active ? {
                      opacity: 1,
                      y: 0,
                      letterSpacing: '0.05em',
                    } : {
                      opacity: 0.5,
                      y: 0,
                      letterSpacing: '0em',
                    }}
                  >
                    {item.label}
                  </motion.span>

                  {/* Bottom indicator line */}
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 h-[3px] rounded-full bg-accent"
                        initial={{ width: 0, x: '-50%', opacity: 0 }}
                        animate={{ width: 20, x: '-50%', opacity: 1 }}
                        exit={{ width: 0, x: '-50%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        style={{
                          boxShadow: '0 0 15px 3px rgba(212, 181, 106, 0.6)',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Notification badge for alerts */}
                  {item.path === '/alerts' && (
                    <motion.div
                      className="absolute top-1 right-2 w-2 h-2 bg-danger rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{
                        boxShadow: '0 0 8px rgba(217, 83, 79, 0.8)',
                      }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            animate={{
              left: `${(activeIndex / navItems.length) * 100}%`,
              width: `${100 / navItems.length}%`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              boxShadow: '0 0 20px rgba(212, 181, 106, 0.5)',
            }}
          />
        </div>

        {/* Floating orbs decoration */}
        <motion.div
          className="absolute -top-3 left-1/4 w-2 h-2 rounded-full bg-accent/30 blur-sm"
          animate={{
            y: [0, -5, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -top-2 right-1/3 w-1.5 h-1.5 rounded-full bg-success/30 blur-sm"
          animate={{
            y: [0, -4, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>
    </motion.nav>
  )
}

export default BottomNavigation
