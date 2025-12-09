import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants, springConfig } from '../config/theme'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Droplet,
  BarChart3,
  Activity,
  Zap,
  Clock,
  ChevronRight,
  Sparkles,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Flame,
  Wind,
  ThermometerSun,
  Share2,
  Download,
  RefreshCw,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Gauge,
  PieChart,
  Timer,
  BatteryCharging
} from 'lucide-react'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'

// Animated counter component
const AnimatedNumber = ({ value, duration = 2, suffix = '', prefix = '', decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    let startTime
    let animationFrame
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const newValue = easeOutQuart * value
      setDisplayValue(decimals > 0 ? newValue.toFixed(decimals) : Math.floor(newValue))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration, decimals])
  
  return <span>{prefix}{Number(displayValue).toLocaleString()}{suffix}</span>
}

// Animated Donut Chart
const DonutChart = ({ percentage, size = 120, strokeWidth = 12, color = '#D4B56A', label }) => {
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
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className="text-2xl font-bold text-white"
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

// Multi-segment Donut (Pie Chart)
const MultiDonut = ({ segments, size = 140, strokeWidth = 20 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  let offset = 0
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        {segments.map((segment, i) => {
          const segmentLength = (segment.value / 100) * circumference
          const currentOffset = offset
          offset += segmentLength
          
          return (
            <motion.circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={-currentOffset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              style={{ filter: `drop-shadow(0 0 4px ${segment.color}40)` }}
            />
          )
        })}
      </svg>
    </div>
  )
}

// Gauge Component
const GaugeChart = ({ value, max = 100, color = '#D4B56A', label }) => {
  const percentage = (value / max) * 100
  const rotation = (percentage / 100) * 180 - 90
  
  return (
    <div className="relative w-32 h-20">
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        {/* Background arc */}
        <path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Colored arc */}
        <motion.path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: percentage / 100 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: '50px 55px' }}
        >
          <line
            x1="50"
            y1="55"
            x2="50"
            y2="22"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="55" r="4" fill={color} />
        </motion.g>
      </svg>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-lg font-bold text-white"><AnimatedNumber value={value} /></span>
        {label && <p className="text-secondary text-[10px]">{label}</p>}
      </div>
    </div>
  )
}

// Sparkline component
const Sparkline = ({ data, color = '#D4B56A', height = 40 }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = height - ((val - min) / range) * (height - 10) - 5
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg width="100%" height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        points={`0,${height} ${points} 100,${height}`}
        fill={`url(#spark-${color})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2 }}
      />
      <motion.circle
        cx="100"
        cy={height - ((data[data.length - 1] - min) / range) * (height - 10) - 5}
        r="3"
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
      />
    </svg>
  )
}

// Heatmap Cell
const HeatmapCell = ({ value, maxValue, delay }) => {
  const intensity = value / maxValue
  const color = `rgba(212, 181, 106, ${intensity})`
  
  return (
    <motion.div
      className="w-6 h-6 rounded-sm cursor-pointer"
      style={{ backgroundColor: color }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.2, zIndex: 10 }}
      title={`Usage: ${value}%`}
    />
  )
}

const AnalyticsPage = () => {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [usageData, setUsageData] = useState([0, 0, 0, 0, 0, 0, 0])
  const [hoveredBar, setHoveredBar] = useState(null)
  const [liveValue, setLiveValue] = useState(68)
  const [showExportMenu, setShowExportMenu] = useState(false)

  const periods = ['week', 'month', 'year']

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveValue(prev => {
        const change = (Math.random() - 0.5) * 4
        return Math.max(0, Math.min(100, prev + change))
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsageData([45, 52, 48, 61, 55, 68, 72])
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Data
  const predictions = {
    nextRefill: 'Jan 18, 2025',
    daysUntilEmpty: 12,
    recommendedSchedule: 'Every 14 days',
    confidence: 94,
  }

  const monthlyRefills = [
    { month: 'Jul', count: 8 },
    { month: 'Aug', count: 10 },
    { month: 'Sep', count: 9 },
    { month: 'Oct', count: 12 },
    { month: 'Nov', count: 11 },
    { month: 'Dec', count: 14 },
  ]

  const machineComparison = [
    { name: 'Pro 3000', usage: 85, color: '#D4B56A', trend: [65, 70, 75, 80, 82, 85] },
    { name: 'Elite 5000', usage: 72, color: '#4ADE80', trend: [60, 65, 68, 70, 71, 72] },
    { name: 'Classic 2000', usage: 68, color: '#60A5FA', trend: [55, 58, 62, 65, 66, 68] },
    { name: 'Mini 1000', usage: 45, color: '#F472B6', trend: [30, 35, 38, 40, 43, 45] },
  ]

  const statsCards = [
    { label: 'Total Usage', value: 2847, suffix: ' ml', icon: Droplet, change: '+12%', positive: true },
    { label: 'Efficiency', value: 94, suffix: '%', icon: Zap, change: '+3%', positive: true },
    { label: 'Avg Runtime', value: 18, suffix: ' hrs', icon: Clock, change: '-2%', positive: false },
    { label: 'Peak Hours', value: 6, suffix: ' PM', icon: Activity, change: '', positive: true },
  ]

  const fragranceDistribution = [
    { name: 'Lavender', value: 35, color: '#A855F7' },
    { name: 'Eucalyptus', value: 25, color: '#22C55E' },
    { name: 'Citrus', value: 20, color: '#F59E0B' },
    { name: 'Ocean Breeze', value: 20, color: '#3B82F6' },
  ]

  const heatmapData = [
    [20, 30, 50, 70, 80, 90, 85, 70, 60, 40, 30, 20],
    [25, 35, 55, 75, 85, 95, 90, 75, 65, 45, 35, 25],
    [30, 40, 60, 80, 90, 100, 95, 80, 70, 50, 40, 30],
    [28, 38, 58, 78, 88, 98, 93, 78, 68, 48, 38, 28],
    [25, 35, 55, 75, 85, 95, 90, 75, 65, 45, 35, 25],
    [22, 32, 52, 72, 82, 92, 87, 72, 62, 42, 32, 22],
    [18, 28, 48, 68, 78, 88, 83, 68, 58, 38, 28, 18],
  ]

  const alerts = [
    { type: 'warning', message: 'Machine #3 oil level below 20%', time: '2 min ago' },
    { type: 'success', message: 'Weekly target achieved!', time: '1 hr ago' },
    { type: 'info', message: 'Scheduled maintenance tomorrow', time: '3 hrs ago' },
  ]

  const goals = [
    { label: 'Monthly Usage Target', current: 2847, target: 3500, unit: 'ml' },
    { label: 'Efficiency Goal', current: 94, target: 95, unit: '%' },
    { label: 'Uptime Target', current: 98.5, target: 99, unit: '%' },
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
            <motion.button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <div>
              <h1 className="font-poppins text-lg font-semibold text-white">Analytics</h1>
              <p className="text-secondary/70 text-xs">Real-time insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Refresh Button */}
            <motion.button
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
            
            {/* Export Button */}
            <div className="relative">
              <motion.button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-2 rounded-xl bg-white/10 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
              
              <AnimatePresence>
                {showExportMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute right-0 top-12 bg-primary-dark/95 backdrop-blur-xl rounded-xl border border-white/10 p-2 min-w-[140px] z-50"
                  >
                    {['Export PDF', 'Export CSV', 'Share Link'].map((item) => (
                      <motion.button
                        key={item}
                        className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg flex items-center gap-2"
                        whileHover={{ x: 4 }}
                      >
                        <Download className="w-4 h-4 text-accent" />
                        {item}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Live indicator */}
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/20 border border-success/30"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-success text-xs font-medium">Live</span>
            </motion.div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mt-3 p-1 bg-white/5 rounded-xl">
          {periods.map((period) => (
            <motion.button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium capitalize transition-all relative ${
                selectedPeriod === period ? 'text-primary-dark' : 'text-secondary hover:text-white'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {selectedPeriod === period && (
                <motion.div
                  className="absolute inset-0 bg-accent rounded-lg"
                  layoutId="periodSelector"
                  transition={springConfig.smooth}
                />
              )}
              <span className="relative z-10">{period}</span>
            </motion.button>
          ))}
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-5">
        {/* Quick Stats Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 relative overflow-hidden" hoverable>
                <motion.div
                  className="absolute top-0 right-0 w-16 h-16 opacity-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <stat.icon className="w-full h-full text-accent" />
                </motion.div>
                
                <stat.icon className="w-5 h-5 text-accent mb-2" />
                <p className="text-secondary text-xs mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={1.5} />
                  </span>
                  {stat.change && (
                    <span className={`text-xs font-medium flex items-center ${stat.positive ? 'text-success' : 'text-danger'}`}>
                      {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Oil Level & Efficiency Gauges */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3 w-full">
              <Droplet className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white">Oil Level</span>
            </div>
            <DonutChart 
              percentage={Math.round(liveValue)} 
              size={100} 
              strokeWidth={10}
              label="Current"
            />
          </Card>
          
          <Card className="p-4 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3 w-full">
              <Gauge className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white">Efficiency</span>
            </div>
            <GaugeChart value={94} label="Score" />
          </Card>
        </motion.div>

        {/* Fragrance Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-accent" />
              <h3 className="font-poppins font-semibold text-white">Fragrance Distribution</h3>
            </div>
            
            <div className="flex items-center gap-6">
              <MultiDonut segments={fragranceDistribution} size={120} strokeWidth={16} />
              
              <div className="flex-1 space-y-2">
                {fragranceDistribution.map((item, i) => (
                  <motion.div
                    key={item.name}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-secondary text-sm">{item.name}</span>
                    </div>
                    <span className="text-white font-semibold text-sm">{item.value}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Usage Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ThermometerSun className="w-5 h-5 text-accent" />
                <h3 className="font-poppins font-semibold text-white">Usage Heatmap</h3>
              </div>
              <span className="text-secondary text-xs">By Hour & Day</span>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-[320px]">
                {/* Time labels */}
                <div className="flex gap-1 mb-1 pl-10">
                  {['6am', '9am', '12pm', '3pm', '6pm', '9pm'].map((time) => (
                    <span key={time} className="text-secondary text-[10px] w-12 text-center">{time}</span>
                  ))}
                </div>
                
                {/* Heatmap grid */}
                <div className="space-y-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
                    <div key={day} className="flex items-center gap-1">
                      <span className="text-secondary text-xs w-8">{day}</span>
                      <div className="flex gap-1">
                        {heatmapData[dayIndex].map((value, hourIndex) => (
                          <HeatmapCell
                            key={hourIndex}
                            value={value}
                            maxValue={100}
                            delay={dayIndex * 0.05 + hourIndex * 0.02}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-3">
                  <span className="text-secondary text-xs">Low</span>
                  <div className="flex gap-0.5">
                    {[0.2, 0.4, 0.6, 0.8, 1].map((intensity) => (
                      <div
                        key={intensity}
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: `rgba(212, 181, 106, ${intensity})` }}
                      />
                    ))}
                  </div>
                  <span className="text-secondary text-xs">High</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Goals Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                <h3 className="font-poppins font-semibold text-white">Goals Progress</h3>
              </div>
              <motion.button
                className="text-accent text-xs flex items-center gap-1"
                whileHover={{ x: 3 }}
              >
                Edit Goals <ChevronRight className="w-3 h-3" />
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {goals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100
                const isAchieved = progress >= 100
                
                return (
                  <motion.div
                    key={goal.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">{goal.label}</span>
                      <div className="flex items-center gap-2">
                        {isAchieved && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <Award className="w-4 h-4 text-accent" />
                          </motion.div>
                        )}
                        <span className="text-secondary text-xs">
                          {goal.current}{goal.unit} / {goal.target}{goal.unit}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{
                          background: isAchieved
                            ? 'linear-gradient(90deg, #D4B56A, #F59E0B)'
                            : 'linear-gradient(90deg, rgba(212, 181, 106, 0.5), #D4B56A)',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </motion.div>

        {/* Real-time Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-accent" />
                <h3 className="font-poppins font-semibold text-white">Recent Activity</h3>
              </div>
              <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs">
                {alerts.length} new
              </span>
            </div>
            
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'warning' ? 'bg-warning/20' :
                    alert.type === 'success' ? 'bg-success/20' : 'bg-accent/20'
                  }`}>
                    {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-warning" />}
                    {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-success" />}
                    {alert.type === 'info' && <Info className="w-4 h-4 text-accent" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-secondary text-xs mt-1">{alert.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Usage Trend Line Chart */}
        <motion.div
          initial={motionVariants.slideUp.initial}
          animate={motionVariants.slideUp.animate}
          transition={{ delay: 0.55 }}
        >
          <Card className="p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="font-poppins font-semibold text-white">Usage Trend</h3>
              </div>
              <motion.span 
                className="text-success text-sm font-medium flex items-center gap-1"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-3 h-3" />
                +18%
              </motion.span>
            </div>
            
            <div className="h-40 relative">
              <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D4B56A" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#D4B56A" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {[0, 25, 50, 75, 100].map((y, i) => (
                  <line
                    key={y}
                    x1="0"
                    y1={120 - (y * 1.2)}
                    x2="300"
                    y2={120 - (y * 1.2)}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                  />
                ))}
                
                <motion.polygon
                  points={`0,120 ${usageData.map((val, i) => `${(i * 300) / 6},${120 - (val * 1.2)}`).join(' ')} 300,120`}
                  fill="url(#areaGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                
                <motion.polyline
                  points={usageData.map((val, i) => `${(i * 300) / 6},${120 - (val * 1.2)}`).join(' ')}
                  fill="none"
                  stroke="#D4B56A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
                />
                
                {usageData.map((val, i) => (
                  <motion.circle
                    key={i}
                    cx={(i * 300) / 6}
                    cy={120 - (val * 1.2)}
                    r="4"
                    fill="#D4B56A"
                    stroke="#1F2E2A"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                  />
                ))}
              </svg>
              
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-secondary text-xs">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Monthly Refills Bar Chart */}
        <motion.div
          initial={motionVariants.slideUp.initial}
          animate={motionVariants.slideUp.animate}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-accent" />
              <h3 className="font-poppins font-semibold text-white">Monthly Refills</h3>
            </div>
            
            <div className="flex items-end justify-between h-32 gap-2">
              {monthlyRefills.map((item, index) => {
                const maxCount = Math.max(...monthlyRefills.map(m => m.count))
                const height = (item.count / maxCount) * 100
                const isHovered = hoveredBar === index
                
                return (
                  <motion.div
                    key={item.month}
                    className="flex-1 flex flex-col items-center gap-2"
                    onHoverStart={() => setHoveredBar(index)}
                    onHoverEnd={() => setHoveredBar(null)}
                  >
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded"
                        >
                          {item.count}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="w-full h-full flex items-end">
                      <motion.div
                        className="w-full rounded-t-lg relative overflow-hidden cursor-pointer"
                        style={{
                          background: isHovered
                            ? 'linear-gradient(180deg, #D4B56A 0%, #B8963A 100%)'
                            : 'linear-gradient(180deg, rgba(212, 181, 106, 0.8) 0%, rgba(212, 181, 106, 0.4) 100%)',
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1, type: 'spring' }}
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                    
                    <span className="text-secondary text-xs">{item.month}</span>
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </motion.div>

        {/* Machine Performance */}
        <motion.div
          initial={motionVariants.slideUp.initial}
          animate={motionVariants.slideUp.animate}
          transition={{ delay: 0.65 }}
        >
          <Card className="p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                <h3 className="font-poppins font-semibold text-white">Machine Performance</h3>
              </div>
              <motion.button
                className="text-accent text-sm flex items-center gap-1"
                whileHover={{ x: 3 }}
              >
                Details <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {machineComparison.map((machine, index) => (
                <motion.div
                  key={machine.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: machine.color }}
                      />
                      <span className="text-white text-sm">{machine.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16">
                        <Sparkline data={machine.trend} color={machine.color} height={20} />
                      </div>
                      <span className="text-accent text-sm font-bold w-10 text-right">{machine.usage}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${machine.color}60, ${machine.color})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${machine.usage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* AI Predictions */}
        <motion.div
          initial={motionVariants.fadeIn.initial}
          animate={motionVariants.fadeIn.animate}
          transition={{ delay: 0.7 }}
        >
          <Card className="relative overflow-hidden border border-accent/30 p-5">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 181, 106, 0.15) 0%, rgba(212, 181, 106, 0.05) 50%, rgba(212, 181, 106, 0.15) 100%)',
                backgroundSize: '200% 200%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5 text-accent" />
                  </motion.div>
                  <h3 className="font-poppins font-semibold text-white">AI Predictions</h3>
                </div>
                <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs">
                  {predictions.confidence}% confidence
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  className="bg-white/5 rounded-xl p-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <Calendar className="w-4 h-4 text-accent mb-2" />
                  <p className="text-secondary text-xs mb-1">Next Refill</p>
                  <p className="font-poppins text-base font-bold text-white">{predictions.nextRefill}</p>
                </motion.div>
                
                <motion.div
                  className="bg-white/5 rounded-xl p-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <Timer className="w-4 h-4 text-warning mb-2" />
                  <p className="text-secondary text-xs mb-1">Days Until Empty</p>
                  <p className="font-poppins text-base font-bold text-warning">
                    <AnimatedNumber value={predictions.daysUntilEmpty} /> days
                  </p>
                </motion.div>
              </div>
              
              <motion.div
                className="mt-3 p-3 bg-accent/10 rounded-xl border border-accent/20"
                whileHover={{ borderColor: 'rgba(212, 181, 106, 0.4)' }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <p className="text-white text-sm">{predictions.recommendedSchedule}</p>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalyticsPage
