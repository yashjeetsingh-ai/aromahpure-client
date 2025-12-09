import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants, springConfig } from '../config/theme'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calendar,
  User,
  Package,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Phone,
  Star,
  ChevronRight,
  Wrench,
  AlertTriangle,
  CalendarDays,
  Timer,
  Award,
  Filter
} from 'lucide-react'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'

// Animated Number Counter
const AnimatedNumber = ({ value, duration = 1.5 }) => {
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
  
  return <span>{displayValue}</span>
}

// Progress Ring Component
const ProgressRing = ({ percentage, size = 60, strokeWidth = 6, color = '#D4B56A' }) => {
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
        <span className="text-sm font-bold text-white">{percentage}%</span>
      </div>
    </div>
  )
}

const MaintenancePage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const filterParam = searchParams.get('filter')
  const [activeTab, setActiveTab] = useState(filterParam === 'maintenance' ? 'upcoming' : 'upcoming')

  const upcoming = [
    {
      id: 1,
      date: 'Jan 15, 2025',
      time: '10:00 AM',
      technician: 'John Smith',
      technicianRating: 4.9,
      technicianPhone: '+1 234-567-8901',
      technicianImage: null,
      machine: 'AromaPure Pro 3000',
      location: 'Main Office - Floor 3',
      status: 'assigned',
      type: 'Routine Check',
      notes: 'Regular maintenance check and filter inspection',
      estimatedDuration: '45 min',
    },
    {
      id: 2,
      date: 'Jan 22, 2025',
      time: '2:00 PM',
      technician: 'Sarah Johnson',
      technicianRating: 4.8,
      technicianPhone: '+1 234-567-8902',
      technicianImage: null,
      machine: 'AromaPure Elite 5000',
      location: 'Conference Room A',
      status: 'pending',
      type: 'Filter Replacement',
      notes: 'Oil filter replacement and system calibration',
      estimatedDuration: '1 hr',
    },
    {
      id: 3,
      date: 'Feb 5, 2025',
      time: '9:30 AM',
      technician: 'Pending Assignment',
      technicianRating: null,
      technicianPhone: null,
      technicianImage: null,
      machine: 'AromaPure Mini 1000',
      location: 'Break Room',
      status: 'pending',
      type: 'Annual Service',
      notes: 'Complete annual maintenance service',
      estimatedDuration: '2 hrs',
    },
  ]

  const completed = [
    {
      id: 3,
      date: 'Dec 10, 2024',
      time: '11:30 AM',
      technician: 'Mike Davis',
      technicianRating: 5.0,
      machine: 'AromaPure Classic 2000',
      location: 'Reception Area',
      status: 'completed',
      type: 'Full Service',
      notes: 'Full service completed successfully. All components in excellent condition.',
      serviceRating: 5,
      feedback: 'Excellent service, very professional!',
    },
    {
      id: 4,
      date: 'Nov 25, 2024',
      time: '3:00 PM',
      technician: 'John Smith',
      technicianRating: 4.9,
      machine: 'AromaPure Mini 1000',
      location: 'Break Room',
      status: 'completed',
      type: 'Routine Inspection',
      notes: 'Routine inspection and cleaning completed',
      serviceRating: 4,
      feedback: 'Good work, on time.',
    },
    {
      id: 5,
      date: 'Oct 15, 2024',
      time: '10:00 AM',
      technician: 'Sarah Johnson',
      technicianRating: 4.8,
      machine: 'AromaPure Pro 3000',
      location: 'Main Office - Floor 3',
      status: 'completed',
      type: 'Emergency Repair',
      notes: 'Resolved pump malfunction issue',
      serviceRating: 5,
      feedback: 'Quick response and fix!',
    },
  ]

  const analytics = {
    totalVisits: 24,
    completed: 22,
    pending: 2,
    avgRating: 4.8,
    completionRate: 92,
    nextScheduled: 'Jan 15, 2025',
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-success', text: 'text-white' }
      case 'assigned':
        return { bg: 'bg-accent', text: 'text-primary-dark' }
      case 'pending':
        return { bg: 'bg-warning', text: 'text-primary-dark' }
      default:
        return { bg: 'bg-secondary', text: 'text-primary-dark' }
    }
  }

  const visits = activeTab === 'upcoming' ? upcoming : completed

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
        <div className="flex items-center gap-3 mb-3">
          <motion.button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white/10 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
          <div className="flex-1">
            <h1 className="font-poppins text-lg font-semibold text-white">
              Maintenance
            </h1>
            <p className="text-secondary/70 text-xs">Schedule & History</p>
          </div>
          <motion.button
            className="p-2 rounded-xl bg-accent/20 text-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <CalendarDays className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
          {['upcoming', 'completed'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === tab ? 'text-primary-dark' : 'text-secondary hover:text-white'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab && (
                <motion.div
                  className="absolute inset-0 bg-accent rounded-lg"
                  layoutId="maintenanceTab"
                  transition={springConfig.smooth}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {tab === 'upcoming' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab ? 'bg-primary-dark/20' : 'bg-white/10'
                }`}>
                  {tab === 'upcoming' ? upcoming.length : completed.length}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-4">
        {/* Analytics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-primary/30 to-primary/10 border border-accent/20 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="font-poppins font-semibold text-white">Service Analytics</h3>
              </div>
              <ProgressRing percentage={analytics.completionRate} size={50} strokeWidth={5} />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-secondary text-xs mb-1">Total Visits</p>
                <p className="font-poppins text-xl font-bold text-white">
                  <AnimatedNumber value={analytics.totalVisits} />
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-secondary text-xs mb-1">Completed</p>
                <p className="font-poppins text-xl font-bold text-success">
                  <AnimatedNumber value={analytics.completed} />
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-secondary text-xs mb-1">Pending</p>
                <p className="font-poppins text-xl font-bold text-warning">
                  <AnimatedNumber value={analytics.pending} />
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-secondary text-xs mb-1">Avg. Rating</p>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <p className="font-poppins text-lg font-bold text-white">{analytics.avgRating}</p>
                </div>
              </div>
              <div>
                <p className="text-secondary text-xs mb-1">Next Visit</p>
                <p className="font-poppins text-sm font-bold text-accent">{analytics.nextScheduled}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Visits List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'upcoming' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'upcoming' ? 20 : -20 }}
            className="space-y-4"
          >
            {visits.map((visit, index) => {
              const statusStyle = getStatusColor(visit.status)
              
              return (
                <motion.div
                  key={visit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-5" hoverable>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span className="font-poppins font-semibold text-white">{visit.date}</span>
                          <span className="text-secondary text-xs">• {visit.time}</span>
                        </div>
                        
                        {/* Type Badge */}
                        <div className="flex items-center gap-2">
                          <Wrench className="w-3 h-3 text-secondary" />
                          <span className="text-secondary text-xs">{visit.type}</span>
                        </div>
                      </div>
                      
                      <motion.span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                      </motion.span>
                    </div>

                    {/* Technician Info */}
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{visit.technician}</p>
                        {visit.technicianRating && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star className="w-3 h-3 text-accent fill-accent" />
                            <span className="text-accent text-xs">{visit.technicianRating}</span>
                          </div>
                        )}
                      </div>
                      {visit.technicianPhone && (
                        <motion.button
                          className="p-2 rounded-lg bg-accent/20"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Phone className="w-4 h-4 text-accent" />
                        </motion.button>
                      )}
                    </div>

                    {/* Machine Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-secondary text-xs">
                        <Package className="w-3 h-3" />
                        <span>{visit.machine}</span>
                      </div>
                      <div className="flex items-center gap-2 text-secondary text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{visit.location}</span>
                      </div>
                      {visit.estimatedDuration && (
                        <div className="flex items-center gap-2 text-secondary text-xs">
                          <Timer className="w-3 h-3" />
                          <span>Est. Duration: {visit.estimatedDuration}</span>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-white text-sm">{visit.notes}</p>
                    </div>

                    {/* Service Rating (for completed) */}
                    {visit.serviceRating && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-secondary text-xs">Service Rating</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < visit.serviceRating ? 'text-accent fill-accent' : 'text-white/20'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        {visit.feedback && (
                          <p className="text-secondary text-xs italic">"{visit.feedback}"</p>
                        )}
                      </div>
                    )}

                    {/* Status Indicator */}
                    {visit.status === 'completed' && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-success text-xs">Service completed successfully</span>
                      </div>
                    )}
                    {visit.status === 'pending' && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        <span className="text-warning text-xs">Awaiting technician assignment</span>
                      </div>
                    )}
                    {visit.status === 'assigned' && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-accent text-xs">Technician confirmed</span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {visits.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Wrench className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No Maintenance Records</h3>
            <p className="text-secondary text-sm">
              {activeTab === 'upcoming' ? 'No scheduled maintenance' : 'No completed maintenance'}
            </p>
          </motion.div>
        )}

        {/* Quick Schedule Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <motion.button
            className="w-full py-4 rounded-xl bg-accent text-primary-dark font-semibold flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-5 h-5" />
            Schedule New Maintenance
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default MaintenancePage
