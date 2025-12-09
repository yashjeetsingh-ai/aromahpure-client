export const theme = {
  colors: {
    primary: '#354C47',
    primaryDark: '#1F2E2A',
    primaryLight: '#4A635C',
    secondary: '#A6B1A0',
    secondaryLight: '#C4CCC0',
    secondaryDark: '#8A9680',
    accent: '#D4B56A',
    accentLight: '#E8CF8F',
    accentDark: '#B89A4A',
    danger: '#D9534F',
    success: '#7FC37E',
    warning: '#FFA500',
    white: '#FFFFFF',
  },
  typography: {
    fontSans: 'Inter, system-ui, sans-serif',
    fontRounded: 'Nunito, system-ui, sans-serif',
    fontSerif: 'Playfair Display, Georgia, serif',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    full: '9999px',
  },
  elevation: {
    soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(255, 216, 122, 0.3)',
    glowGreen: '0 0 20px rgba(62, 79, 70, 0.4)',
  },
}

// Spring configurations for smooth animations
export const springConfig = {
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  smooth: { type: 'spring', stiffness: 100, damping: 15, mass: 0.5 },
  bouncy: { type: 'spring', stiffness: 300, damping: 20 },
  stiff: { type: 'spring', stiffness: 400, damping: 30 },
}

export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: springConfig.gentle,
  },
  slideDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: springConfig.gentle,
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
    transition: springConfig.smooth,
  },
  scaleIn3D: {
    initial: { opacity: 0, scale: 0.9, rotateX: -15 },
    animate: { opacity: 1, scale: 1, rotateX: 0 },
    exit: { opacity: 0, scale: 0.9, rotateX: 15 },
    transition: springConfig.gentle,
  },
  buttonPress: {
    scale: 0.95,
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  },
  cardHover: {
    scale: 1.03,
    y: -8,
    rotateX: 2,
    rotateY: 0,
    transition: springConfig.smooth,
  },
  cardHover3D: {
    scale: 1.02,
    y: -6,
    z: 30,
    rotateX: -2,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: springConfig.smooth,
  },
  cardTap: {
    scale: 0.97,
    rotateX: 1,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  pulse3D: {
    scale: [1, 1.02, 1],
    rotateY: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: springConfig.gentle,
    },
  },
}

// Page transition variants
export const pageTransition = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.98,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}
