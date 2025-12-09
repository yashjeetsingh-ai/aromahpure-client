import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { motionVariants } from '../config/theme'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = (userType) => {
    if (username === 'Yash' && password === '123') {
      login(username, userType)
      navigate('/dashboard')
    } else {
      setError('Invalid credentials. Use: Yash / 123')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <AnimatedWaveBackground />
      
      {/* Logo Animation */}
      <motion.div
        className="mb-12"
        initial={motionVariants.scaleIn.initial}
        animate={motionVariants.scaleIn.animate}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="text-center"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <h1 style={{
  fontFamily: "'Great Vibes', cursive",
  fontSize: "64px",
  fontWeight: "400",
  color: "white",
  textTransform: "lowercase",
  margin: 0,
  display: "inline-flex",
  alignItems: "flex-end"
}}>
  aromahpure
  
  
</h1>


          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full" />
          <p className="font-rounded text-secondary text-sm mt-2 tracking-wider">
            AIR MANAGEMENT
          </p>
        </motion.div>
      </motion.div>

      {/* Login Form */}
      <motion.div
        className="w-full max-w-sm glass-strong rounded-3xl p-8 shadow-glow-green"
        initial={motionVariants.slideUp.initial}
        animate={motionVariants.slideUp.animate}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-serif text-2xl font-semibold text-white mb-6 text-center">
          Welcome Back
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-secondary text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-secondary text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="Enter password"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin()
                }
              }}
            />
          </div>

          {error && (
            <motion.p
              className="text-danger text-sm text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
        </div>

        <Button
          variant="accent"
          size="lg"
          className="w-full"
          onClick={() => handleLogin('user')}
        >
          Login
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-8 text-secondary text-xs text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Premium Air Quality Management System
      </motion.p>
    </div>
  )
}


export default LoginPage

