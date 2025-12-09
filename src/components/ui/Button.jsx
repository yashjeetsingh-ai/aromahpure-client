import { motion } from 'framer-motion'
import { springConfig } from '../../config/theme'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'relative font-poppins font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light focus:ring-primary shadow-soft',
    secondary: 'bg-secondary text-primary-dark hover:bg-secondary-light focus:ring-secondary shadow-soft',
    accent: 'bg-accent text-primary-dark hover:bg-accent-light focus:ring-accent shadow-glow',
    outline: 'border-2 border-secondary text-secondary hover:bg-secondary/10 focus:ring-secondary',
    ghost: 'text-secondary hover:bg-white/5 focus:ring-secondary',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const hoverAnimation = !disabled ? {
    scale: 1.03,
    y: -2,
    boxShadow: variant === 'accent' 
      ? '0 10px 30px -5px rgba(212, 181, 106, 0.4)' 
      : '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
    transition: springConfig.smooth,
  } : {}

  const tapAnimation = !disabled ? {
    scale: 0.97,
    y: 0,
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  } : {}

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig.gentle}
      {...props}
    >
      {/* Shine effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        whileHover={{ translateX: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export default Button
