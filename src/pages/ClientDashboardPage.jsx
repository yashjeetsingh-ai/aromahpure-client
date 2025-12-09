import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants, springConfig } from '../config/theme'
import { useNavigate } from 'react-router-dom'
import { 
  Package, 
  Activity, 
  AlertCircle, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  Droplet,
  Clock,
  BarChart3,
  Bell,
  ChevronRight,
  Zap,
  Wifi,
  WifiOff,
  Sun,
  Moon,
  CloudSun,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Timer,
  Target,
  Wrench,
  RefreshCw,
  Eye,
  Heart,
  ThermometerSun,
  Wind
} from 'lucide-react'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'

// Animated counter
const AnimatedNumber = ({ value, duration = 2, suffix = '', prefix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    let startTime
    let animationFrame
    const numValue = typeof value === 'string' ? parseInt(value) : value
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(easeOutQuart * numValue))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])
  
  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>
}

// Mini Sparkline
const MiniSparkline = ({ data, color = '#D4B56A', width = 60, height = 24 }) => {
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
      <defs>
        <linearGradient id={`miniGrad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#miniGrad-${color.replace('#', '')})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
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

// Progress Ring
const ProgressRing = ({ percentage, size = 48, strokeWidth = 4, color = '#D4B56A' }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
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
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{percentage}%</span>
      </div>
    </div>
  )
}

const ClientDashboardPage = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showNotifications, setShowNotifications] = useState(false)
  const [liveOilLevel, setLiveOilLevel] = useState(68)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Simulate live oil level updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOilLevel(prev => {
        const change = (Math.random() - 0.5) * 2
        return Math.max(0, Math.min(100, prev + change))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return { text: 'Good Morning', icon: Sun, color: 'text-yellow-400' }
    if (hour < 17) return { text: 'Good Afternoon', icon: CloudSun, color: 'text-orange-400' }
    return { text: 'Good Evening', icon: Moon, color: 'text-blue-400' }
  }

  const greeting = getGreeting()
  const GreetingIcon = greeting.icon

  const summaryCards = [
    {
      icon: Package,
      label: 'Total Machines',
      value: '8',
      color: 'text-accent',
      bgGradient: 'from-primary/50 via-primary/40 to-primary/30',
      borderColor: 'border-accent/40',
      filter: 'All',
      route: '/machines',
      trend: [5, 6, 6, 7, 7, 8, 8],
      change: '+14%',
      positive: true,
    },
    {
      icon: Activity,
      label: 'Active Machines',
      value: '7',
      color: 'text-success',
      bgGradient: 'from-success/20 to-success/5',
      borderColor: 'border-success/30',
      filter: 'Active',
      route: '/machines',
      trend: [5, 5, 6, 6, 7, 7, 7],
      change: '+16%',
      positive: true,
    },
    {
      icon: AlertCircle,
      label: 'Needs Refill',
      value: '3',
      color: 'text-warning',
      bgGradient: 'from-warning/20 to-warning/5',
      borderColor: 'border-warning/30',
      filter: 'Low',
      route: '/machines',
      trend: [2, 3, 2, 4, 3, 3, 3],
      change: '-25%',
      positive: true,
    },
    {
      icon: Calendar,
      label: 'Maintenance Due',
      value: '2',
      color: 'text-accent',
      bgGradient: 'from-accent/20 to-accent/5',
      borderColor: 'border-accent/30',
      filter: 'maintenance',
      route: '/maintenance',
      trend: [1, 2, 1, 3, 2, 2, 2],
      change: '0%',
      positive: true,
    },
  ]

  const quickStats = [
    {
      icon: Droplet,
      label: 'Total Capacity',
      value: '1,240',
      unit: 'ml',
      subtitle: 'Across all machines',
      gradient: 'from-primary via-primary/80 to-primary',
    },
    {
      icon: BarChart3,
      label: 'Avg. Oil Level',
      value: Math.round(liveOilLevel),
      unit: '%',
      subtitle: 'Healthy range',
      gradient: 'from-success via-success/80 to-success',
      isLive: true,
    },
    {
      icon: Clock,
      label: 'Last Refill',
      value: 'Dec 18',
      subtitle: '2 days ago',
      gradient: 'from-secondary via-secondary/80 to-secondary',
    },
    {
      icon: TrendingUp,
      label: 'This Month',
      value: '47',
      unit: ' refills',
      subtitle: '+12% from last month',
      gradient: 'from-accent via-accent/80 to-accent',
    },
  ]

  const notifications = [
    { type: 'warning', message: 'Machine #3 needs refill soon', time: '5 min ago', unread: true },
    { type: 'success', message: 'Refill completed on Pro 3000', time: '1 hr ago', unread: true },
    { type: 'info', message: 'Maintenance scheduled for tomorrow', time: '3 hrs ago', unread: false },
    { type: 'warning', message: 'Elite 5000 oil level at 15%', time: '5 hrs ago', unread: false },
  ]

  const recentActivity = [
    { action: 'Refill completed', machine: 'Pro 3000', time: '1 hr ago', type: 'refill' },
    { action: 'Maintenance done', machine: 'Classic 2000', time: '2 days ago', type: 'maintenance' },
    { action: 'New machine added', machine: 'Mini 1000', time: '1 week ago', type: 'new' },
  ]

  const machineHealth = [
    { name: 'Pro 3000', health: 92, status: 'online', location: 'Lobby' },
    { name: 'Elite 5000', health: 78, status: 'online', location: 'Conference' },
    { name: 'Classic 2000', health: 85, status: 'online', location: 'Reception' },
    { name: 'Mini 1000', health: 45, status: 'offline', location: 'Cafe' },
  ]

  const weatherTip = {
    temp: '24°C',
    humidity: '65%',
    tip: 'Optimal diffusion conditions today',
    icon: ThermometerSun,
  }

  const upcomingMaintenance = [
    { machine: 'Pro 3000', date: 'Tomorrow', type: 'Routine' },
    { machine: 'Elite 5000', date: 'Dec 28', type: 'Filter Change' },
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border border-accent/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-accent text-sm font-bold">AP</span>
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-poppins text-lg font-semibold text-white leading-tight">
                  {greeting.text}
                </h1>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <GreetingIcon className={`w-5 h-5 ${greeting.color}`} />
                </motion.div>
              </div>
              <p className="text-secondary/70 text-xs">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Live Indicator */}
            <motion.div 
              className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/20 border border-success/30"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-success text-[10px] font-medium">Live</span>
            </motion.div>
            
            {/* Notifications */}
            <div className="relative">
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-white/10 text-white relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </motion.button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-72 bg-primary-dark/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-white/10 flex items-center justify-between">
                      <span className="text-white font-semibold text-sm">Notifications</span>
                      <span className="text-accent text-xs">Mark all read</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif, i) => (
                        <motion.div
                          key={i}
                          className={`p-3 border-b border-white/5 flex items-start gap-3 ${notif.unread ? 'bg-white/5' : ''}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <div className={`p-1.5 rounded-lg ${
                            notif.type === 'warning' ? 'bg-warning/20' :
                            notif.type === 'success' ? 'bg-success/20' : 'bg-accent/20'
                          }`}>
                            {notif.type === 'warning' && <AlertTriangle className="w-3 h-3 text-warning" />}
                            {notif.type === 'success' && <CheckCircle className="w-3 h-3 text-success" />}
                            {notif.type === 'info' && <Info className="w-3 h-3 text-accent" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-xs">{notif.message}</p>
                            <p className="text-secondary text-[10px] mt-1">{notif.time}</p>
                          </div>
                          {notif.unread && <div className="w-2 h-2 rounded-full bg-accent mt-1" />}
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      className="w-full p-3 text-accent text-sm font-medium flex items-center justify-center gap-1"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                      onClick={() => navigate('/alerts')}
                    >
                      View All <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-5">
        {/* Weather & Environment Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-r from-accent/10 to-transparent border-accent/20 flex items-center gap-4">
            <motion.div
              className="p-3 rounded-xl bg-accent/20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <weatherTip.icon className="w-6 h-6 text-accent" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-white font-semibold">{weatherTip.temp}</span>
                <span className="text-secondary text-sm">•</span>
                <span className="text-secondary text-sm flex items-center gap-1">
                  <Wind className="w-3 h-3" /> {weatherTip.humidity}
                </span>
              </div>
              <p className="text-secondary text-xs">{weatherTip.tip}</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>
          </Card>
        </motion.div>

        {/* Summary Cards Grid */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            {summaryCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.label}
                  variants={{
                    initial: { opacity: 0, y: 30, scale: 0.9 },
                    animate: { opacity: 1, y: 0, scale: 1, transition: springConfig.gentle },
                  }}
                  whileHover={{ scale: 1.03, y: -5, transition: springConfig.smooth }}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer"
                  onClick={() => navigate(`${card.route}?filter=${card.filter}`)}
                >
                  <Card className={`bg-gradient-to-br ${card.bgGradient} border ${card.borderColor} p-4 h-[130px] flex flex-col justify-between relative overflow-hidden`}>
                    {/* Background sparkline */}
                    <div className="absolute bottom-2 right-2 opacity-30">
                      <MiniSparkline 
                        data={card.trend} 
                        color={card.color === 'text-accent' ? '#D4B56A' : 
                               card.color === 'text-success' ? '#4ADE80' : '#F59E0B'} 
                      />
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <motion.div 
                        className={`p-2 rounded-xl bg-white/10 ${card.color}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                      <span className={`text-xs font-medium flex items-center gap-0.5 ${card.positive ? 'text-success' : 'text-danger'}`}>
                        {card.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {card.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-secondary text-xs font-medium mb-0.5">{card.label}</p>
                      <motion.h3 
                        className={`font-poppins text-2xl font-bold ${card.color}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <AnimatedNumber value={card.value} duration={1} />
                      </motion.h3>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Machine Health Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-poppins text-base font-semibold text-white">Machine Health</h2>
            <motion.button
              className="text-accent text-xs flex items-center gap-1"
              whileHover={{ x: 3 }}
              onClick={() => navigate('/machines')}
            >
              View All <ChevronRight className="w-3 h-3" />
            </motion.button>
          </div>
          
          <Card className="p-4">
            <div className="space-y-3">
              {machineHealth.map((machine, index) => (
                <motion.div
                  key={machine.name}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                >
                  <ProgressRing 
                    percentage={machine.health} 
                    color={machine.health > 80 ? '#4ADE80' : machine.health > 50 ? '#F59E0B' : '#EF4444'}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{machine.name}</span>
                      {machine.status === 'online' ? (
                        <Wifi className="w-3 h-3 text-success" />
                      ) : (
                        <WifiOff className="w-3 h-3 text-danger" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-secondary text-xs">
                      <MapPin className="w-3 h-3" />
                      {machine.location}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-secondary" />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Quick Stats - Swipeable */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-poppins text-base font-semibold text-white mb-3">Quick Stats</h2>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  className="flex-shrink-0 w-[200px] snap-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className={`bg-gradient-to-br ${stat.gradient} border border-white/10 p-4 relative overflow-hidden h-[100px]`}>
                    {stat.isLive && (
                      <motion.div
                        className="absolute top-2 right-2 flex items-center gap-1"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span className="text-white/80 text-[10px]">LIVE</span>
                      </motion.div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div 
                        className="p-2 bg-white/20 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="text-white/80 text-xs">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-white">
                        {stat.isLive ? Math.round(liveOilLevel) : stat.value}
                      </span>
                      {stat.unit && <span className="text-white/60 text-sm">{stat.unit}</span>}
                    </div>
                    <p className="text-white/50 text-[10px] mt-1">{stat.subtitle}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Upcoming Maintenance */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-poppins text-base font-semibold text-white">Upcoming Maintenance</h2>
            <motion.button
              className="text-accent text-xs flex items-center gap-1"
              whileHover={{ x: 3 }}
              onClick={() => navigate('/maintenance')}
            >
              View All <ChevronRight className="w-3 h-3" />
            </motion.button>
          </div>
          
          <div className="space-y-2">
            {upcomingMaintenance.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="p-3 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent/20">
                    <Wrench className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{item.machine}</p>
                    <p className="text-secondary text-xs">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-accent text-sm font-medium">{item.date}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-poppins text-base font-semibold text-white">Recent Activity</h2>
            <motion.button
              className="text-accent text-xs flex items-center gap-1"
              whileHover={{ x: 3 }}
              onClick={() => navigate('/refill-history')}
            >
              View All <ChevronRight className="w-3 h-3" />
            </motion.button>
          </div>
          
          <Card className="p-4">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'refill' ? 'bg-success/20' :
                    activity.type === 'maintenance' ? 'bg-accent/20' : 'bg-primary/20'
                  }`}>
                    {activity.type === 'refill' && <Droplet className="w-4 h-4 text-success" />}
                    {activity.type === 'maintenance' && <Wrench className="w-4 h-4 text-accent" />}
                    {activity.type === 'new' && <Package className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-secondary text-xs">{activity.machine}</p>
                  </div>
                  <span className="text-secondary text-xs">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <h2 className="font-poppins text-base font-semibold text-white mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Package, label: 'Machines', route: '/machines', color: 'text-accent' },
              { icon: BarChart3, label: 'Analytics', route: '/analytics', color: 'text-success' },
              { icon: Calendar, label: 'Schedule', route: '/maintenance', color: 'text-warning' },
            ].map((action, index) => (
              <motion.button
                key={action.label}
                onClick={() => navigate(action.route)}
                className="glass rounded-xl p-4 flex flex-col items-center gap-2 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5, borderColor: 'rgba(212, 181, 106, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={springConfig.bouncy}
                >
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </motion.div>
                <span className="text-white text-xs font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-6 pt-4 pb-2"
        >
          <div className="flex items-center gap-2 text-secondary text-xs">
            <RefreshCw className="w-3 h-3" />
            Last updated: Just now
          </div>
          <div className="flex items-center gap-2 text-secondary text-xs">
            <Eye className="w-3 h-3" />
            8 machines monitored
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ClientDashboardPage
