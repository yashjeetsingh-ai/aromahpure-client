import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants, springConfig } from '../config/theme'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calendar, 
  AlertCircle, 
  CheckCircle,
  Droplet,
  Activity,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Settings,
  History,
  Wrench,
  MapPin,
  Clock,
  Zap,
  ThermometerSun,
  Power,
  RefreshCw,
  Bell,
  TrendingUp,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'

// Animated Number Counter
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

// Circular Gauge Component
const CircularGauge = ({ percentage, size = 160, strokeWidth = 14, color, label, icon: Icon }) => {
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
          style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {Icon && <Icon className="w-6 h-6 text-accent mb-1" />}
        <motion.span 
          className="font-poppins text-3xl font-bold text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatedNumber value={percentage} suffix="%" />
        </motion.span>
        {label && <span className="text-secondary text-xs mt-1">{label}</span>}
      </div>
    </div>
  )
}

// Mini Sparkline
const MiniSparkline = ({ data, color = '#D4B56A', width = 80, height = 30 }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * (height - 4) - 2
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg width={width} height={height} className="overflow-visible">
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
    </svg>
  )
}

const MachineDetailModalPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [oilLevel, setOilLevel] = useState(0)
  const [runningFrequency, setRunningFrequency] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const machine = {
    id: parseInt(id),
    name: 'AromaPure Pro 3000',
    location: 'Main Office - Floor 3',
    code: 'AP-3000-001',
    status: 'active',
    online: true,
    wifiEnabled: true,
    oilLevel: 75,
    runningFrequency: 68,
    lastRefill: 'Dec 15, 2024',
    nextRun: 'In 2 hours',
    dailyUsage: '18 hours',
    efficiency: 94,
    temperature: '23°C',
    humidity: '45%',
    fragrance: 'Lavender Dreams',
    serialNumber: 'SN-2024-001234',
    firmware: 'v2.4.1',
    installDate: 'Jan 10, 2024',
    totalRuntime: '2,340 hrs',
    usageTrend: [65, 70, 68, 72, 75, 78, 75],
    errors: [
      { type: 'battery', message: 'Battery at 15%', active: true, severity: 'warning' },
    ],
  }

  useEffect(() => {
    const timer1 = setTimeout(() => setOilLevel(machine.oilLevel), 300)
    const timer2 = setTimeout(() => setRunningFrequency(machine.runningFrequency), 500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [machine.oilLevel, machine.runningFrequency])

  const quickStats = [
    { icon: Zap, label: 'Efficiency', value: `${machine.efficiency}%`, color: 'text-success' },
    { icon: ThermometerSun, label: 'Temperature', value: machine.temperature, color: 'text-warning' },
    { icon: Droplet, label: 'Humidity', value: machine.humidity, color: 'text-accent' },
    { icon: Clock, label: 'Runtime', value: machine.totalRuntime, color: 'text-white' },
  ]

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
            onClick={() => navigate('/machines')}
            className="p-2 rounded-xl bg-white/10 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
          <div className="flex-1 min-w-0">
            <h1 className="font-poppins text-base font-semibold text-white leading-tight truncate">
              {machine.name}
            </h1>
            <div className="flex items-center gap-2 text-secondary text-xs">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{machine.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {machine.online ? (
              <motion.div 
                className="flex items-center gap-1.5 px-2 py-1 bg-success/20 rounded-lg border border-success/30"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 bg-success rounded-full" />
                <span className="text-success text-[10px] font-medium">Online</span>
              </motion.div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-secondary/20 rounded-lg">
                <WifiOff className="w-3 h-3 text-secondary" />
                <span className="text-secondary text-[10px]">Offline</span>
              </div>
            )}
            {machine.wifiEnabled && (
              <div className="p-1.5 bg-accent/20 rounded-lg">
                <Wifi className="w-3 h-3 text-accent" />
              </div>
            )}
          </div>
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-4">
        {/* Quick Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-2"
        >
          <motion.button
            onClick={() => setIsRunning(!isRunning)}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 ${isRunning ? 'bg-success/20 border border-success/30' : 'bg-white/5 border border-white/10'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isRunning ? <Pause className="w-5 h-5 text-success" /> : <Play className="w-5 h-5 text-secondary" />}
            <span className={`text-[10px] ${isRunning ? 'text-success' : 'text-secondary'}`}>
              {isRunning ? 'Running' : 'Paused'}
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 ${soundEnabled ? 'bg-accent/20 border border-accent/30' : 'bg-white/5 border border-white/10'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-accent" /> : <VolumeX className="w-5 h-5 text-secondary" />}
            <span className={`text-[10px] ${soundEnabled ? 'text-accent' : 'text-secondary'}`}>
              {soundEnabled ? 'Sound On' : 'Sound Off'}
            </span>
          </motion.button>
          
          <motion.button
            className="p-3 rounded-xl flex flex-col items-center gap-1 bg-white/5 border border-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-5 h-5 text-secondary" />
            <span className="text-secondary text-[10px]">Refresh</span>
          </motion.button>
        </motion.div>

        {/* Main Gauges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Running Frequency */}
          <Card className="p-4 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-accent" />
              <h3 className="font-poppins text-sm font-semibold text-white">Frequency</h3>
            </div>
            <CircularGauge
              percentage={runningFrequency}
              size={120}
              strokeWidth={10}
              color="#D4B56A"
              label="Active"
            />
          </Card>

          {/* Oil Level */}
          <Card className="p-4 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="w-4 h-4 text-accent" />
              <h3 className="font-poppins text-sm font-semibold text-white">Oil Level</h3>
            </div>
            <CircularGauge
              percentage={oilLevel}
              size={120}
              strokeWidth={10}
              color={oilLevel > 60 ? '#4ADE80' : oilLevel > 30 ? '#F59E0B' : '#EF4444'}
              label={oilLevel > 50 ? 'Optimal' : 'Low'}
            />
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="grid grid-cols-4 gap-3">
              {quickStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                >
                  <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
                  <p className="text-white font-bold text-sm">{stat.value}</p>
                  <p className="text-secondary text-[10px]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Usage Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <h3 className="font-poppins text-sm font-semibold text-white">Usage Trend</h3>
              </div>
              <span className="text-success text-xs">+8%</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{machine.dailyUsage}</p>
                <p className="text-secondary text-xs">Today's usage</p>
              </div>
              <MiniSparkline data={machine.usageTrend} />
            </div>
          </Card>
        </motion.div>

        {/* Last Refill & Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-accent" />
              <h3 className="font-poppins text-sm font-semibold text-white">Schedule</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <p className="text-secondary text-xs mb-1">Last Refill</p>
                <p className="text-white font-semibold">{machine.lastRefill}</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-secondary text-xs mb-1">Next Run</p>
                <p className="text-accent font-semibold">{machine.nextRun}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Fragrance Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 bg-gradient-to-r from-primary/30 to-primary/10 border-accent/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Droplet className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-secondary text-xs">Current Fragrance</p>
                <h3 className="text-white font-semibold">{machine.fragrance}</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-secondary" />
            </div>
          </Card>
        </motion.div>

        {/* Device Alerts */}
        {machine.errors.filter(e => e.active).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="border-2 border-warning/30 p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-warning" />
                <h3 className="font-poppins text-sm font-semibold text-warning">Alerts</h3>
              </div>
              <div className="space-y-2">
                {machine.errors.filter(e => e.active).map((error, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-warning/10 rounded-xl"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <BatteryLow className="w-5 h-5 text-warning" />
                    <p className="text-white text-sm">{error.message}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Device Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-accent" />
              <h3 className="font-poppins text-sm font-semibold text-white">Device Info</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Serial Number', value: machine.serialNumber },
                { label: 'Firmware', value: machine.firmware },
                { label: 'Install Date', value: machine.installDate },
                { label: 'Device Code', value: machine.code },
              ].map((item, i) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-secondary text-sm">{item.label}</span>
                  <span className="text-white text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* History Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { icon: Droplet, label: 'Refill History', route: `/refill-history?machine=${machine.id}` },
            { icon: Wrench, label: 'Maintenance', route: `/maintenance?machine=${machine.id}` },
            { icon: History, label: 'Error Logs', route: `/machine/${machine.id}/logs` },
          ].map((btn, i) => (
            <motion.button
              key={btn.label}
              onClick={() => navigate(btn.route)}
              className="glass rounded-xl p-4 text-center border border-accent/20 hover:border-accent/40 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.05 }}
            >
              <btn.icon className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="text-white text-xs font-medium">{btn.label}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default MachineDetailModalPage
