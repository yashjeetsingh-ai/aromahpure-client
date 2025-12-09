import { motion } from 'framer-motion'
import { motionVariants, springConfig } from '../../config/theme'

const Card = ({ 
  children, 
  className = '', 
  hoverable = false,
  onClick,
  variant = 'default', // 'default', '3d', 'glow'
  ...props 
}) => {
  const baseStyles = 'glass rounded-2xl p-6'
  const hoverStyles = hoverable ? 'cursor-pointer' : ''
  
  const variantStyles = {
    default: '',
    '3d': 'glass-3d',
    glow: 'glow-border',
  }

  const hoverAnimation = hoverable ? {
    scale: 1.02,
    y: -6,
    rotateX: -1,
    rotateY: 1,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 30px rgba(212, 181, 106, 0.1)',
    transition: springConfig.smooth,
  } : {}

  const tapAnimation = hoverable ? {
    scale: 0.98,
    rotateX: 1,
    y: -2,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  } : {}

  return (
    <motion.div
      className={`${baseStyles} ${hoverStyles} ${variantStyles[variant] || ''} ${className}`}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      initial={{ opacity: 0, y: 20, rotateX: -5 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: springConfig.gentle,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
