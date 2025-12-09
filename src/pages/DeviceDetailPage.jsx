import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants, springConfig } from '../config/theme'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  LogOut,
  MapPin,
  Clock,
  Zap,
  ThermometerSun,
  Wifi,
  WifiOff,
  Power,
  Settings,
  TrendingUp,
  Droplet,
  Activity,
  ChevronRight,
  RefreshCw,
  Share2,
  Bell,
  BellOff,
  Volume2,
  BarChart3
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'

// Animated Number
const AnimatedNumber = ({ value, duration = 1.5, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    let startTime
    let animationFrame
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(easeOutQuart * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])
  
  return <span>{displayValue}{suffix}</span>
}

// Circular Progress
const CircularProgress = ({ percentage, size = 140, strokeWidth = 12, color, showValue = true }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color}50)` }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="font-poppins text-3xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatedNumber value={percentage} suffix="%" />
          </motion.span>
        </div>
      )}
    </div>
  )
}

// Mini Trend Chart
const MiniTrend = ({ data, color = '#D4B56A' }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((val, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t"
          style={{ backgroundColor: color }}
          initial={{ height: 0 }}
          animate={{ height: `${((val - min) / range) * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
        />
      ))}
    </div>
  )
}

const DeviceDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [oilLevel, setOilLevel] = useState(0)
  const [runningFrequency, setRunningFrequency] = useState(0)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const device = {
    id: parseInt(id),
    name: 'AromaPure Pro 3000',
    status: 'active',
    refillDate: 'Dec 15, 2024',
    runningTime: '2,340 hrs',
    location: 'Main Office - Floor 3',
    oilLevel: 75,
    runningFrequency: 68,
    lastMaintenance: 'Nov 20, 2024',
    nextMaintenance: 'Jan 15, 2025',
    efficiency: 94,
    temperature: '23°C',
    online: true,
    fragrance: 'Lavender Dreams',
    usageTrend: [45, 52, 48, 61, 55, 68, 72],
    weeklyUsage: [18, 20, 17, 22, 19, 21, 18],
  }

  useEffect(() => {
    const timer1 = setTimeout(() => setOilLevel(device.oilLevel), 300)
    const timer2 = setTimeout(() => setRunningFrequency(device.runningFrequency), 500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [device.oilLevel, device.runningFrequency])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-success/20', text: 'text-success', border: 'border-success/30' }
      case 'warning':
        return { bg: 'bg-warning/20', text: 'text-warning', border: 'border-warning/30' }
      case 'error':
        return { bg: 'bg-danger/20', text: 'text-danger', border: 'border-danger/30' }
      default:
        return { bg: 'bg-secondary/20', text: 'text-secondary', border: 'border-secondary/30' }
    }
  }

  const statusStyle = getStatusColor(device.status)

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden bg-primary-dark">
      <AnimatedWaveBackground />
      
      {/* Header */}
      <motion.header
        className="px-4 py-3 sticky top-0 z-40"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(180deg, rgba(31, 46, 42, 0.95) 0%, rgba(31, 46, 42, 0.8) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl bg-white/10 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
          <div className="flex-1 min-w-0">
            <h1 className="font-poppins text-base font-semibold text-white truncate">
              {device.name}
            </h1>
            <div className="flex items-center gap-2 text-secondary text-xs">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{device.location}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4 text-secondary" />}
            </motion.button>
            <motion.button
              onClick={() => navigate('/settings')}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-4">
        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={`p-4 ${statusStyle.bg} border ${statusStyle.border}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle className={`w-8 h-8 ${statusStyle.text}`} />
                </motion.div>
                <div>
                  <p className={`font-semibold ${statusStyle.text}`}>
                    {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                  </p>
                  <p className="text-secondary text-sm">All systems operational</p>
                </div>
              </div>
              {device.online && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-success/30 rounded-full">
                  <Wifi className="w-3 h-3 text-success" />
                  <span className="text-success text-xs">Online</span>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Main Gauges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="p-4 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-white">Frequency</h3>
            </div>
            <CircularProgress
              percentage={runningFrequency}
              size={110}
              strokeWidth={10}
              color="#D4B56A"
            />
            <p className="text-secondary text-xs mt-2">Running Rate</p>
          </Card>

          <Card className="p-4 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <Droplet className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-white">Oil Level</h3>
            </div>
            <CircularProgress
              percentage={oilLevel}
              size={110}
              strokeWidth={10}
              color={oilLevel > 60 ? '#4ADE80' : oilLevel > 30 ? '#F59E0B' : '#EF4444'}
            />
            <p className="text-secondary text-xs mt-2">
              {oilLevel > 50 ? 'Optimal' : 'Refill Soon'}
            </p>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-2"
        >
          {[
            { icon: Zap, label: 'Efficiency', value: `${device.efficiency}%`, color: 'text-success' },
            { icon: ThermometerSun, label: 'Temp', value: device.temperature, color: 'text-warning' },
            { icon: Clock, label: 'Runtime', value: device.runningTime, color: 'text-accent' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
            >
              <Card className="p-3 text-center">
                <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
                <p className="text-white font-bold text-sm">{stat.value}</p>
                <p className="text-secondary text-[10px]">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Weekly Usage Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-white">Weekly Usage</h3>
              </div>
              <span className="text-success text-xs flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +5%
              </span>
            </div>
            <MiniTrend data={device.weeklyUsage} />
            <div className="flex justify-between mt-2 text-[10px] text-secondary">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Fragrance Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="p-4 bg-gradient-to-r from-accent/20 to-accent/5 border-accent/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Droplet className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-secondary text-xs">Current Fragrance</p>
                <h3 className="text-white font-semibold">{device.fragrance}</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-secondary" />
            </div>
          </Card>
        </motion.div>

        {/* Maintenance Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-white">Maintenance Schedule</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                <div>
                  <p className="text-white text-sm font-medium">Last Refill</p>
                  <p className="text-secondary text-xs">{device.refillDate}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                <div>
                  <p className="text-white text-sm font-medium">Last Maintenance</p>
                  <p className="text-secondary text-xs">{device.lastMaintenance}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <motion.div 
                className="flex justify-between items-center p-3 bg-accent/10 rounded-xl border border-accent/30"
                animate={{ scale: [1, 1.01, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div>
                  <p className="text-white text-sm font-medium">Next Maintenance</p>
                  <p className="text-accent text-xs font-semibold">{device.nextMaintenance}</p>
                </div>
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Device Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-white">Device Information</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Running Time', value: device.runningTime },
                { label: 'Device ID', value: `#${device.id.toString().padStart(6, '0')}` },
                { label: 'Location', value: device.location },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-secondary text-sm">{item.label}</span>
                  <span className="text-white text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-3"
        >
          <motion.button
            onClick={() => navigate('/refill-history')}
            className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"
            whileHover={{ scale: 1.02, borderColor: 'rgba(212, 181, 106, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Droplet className="w-5 h-5 text-accent" />
            <div className="text-left">
              <p className="text-white text-sm font-medium">Refill History</p>
              <p className="text-secondary text-xs">View all refills</p>
            </div>
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/maintenance')}
            className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"
            whileHover={{ scale: 1.02, borderColor: 'rgba(212, 181, 106, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-5 h-5 text-accent" />
            <div className="text-left">
              <p className="text-white text-sm font-medium">Maintenance</p>
              <p className="text-secondary text-xs">Schedule & history</p>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default DeviceDetailPage
