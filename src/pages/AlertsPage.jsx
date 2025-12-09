import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants, springConfig } from '../config/theme'
import { 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle, 
  LogOut,
  Bell,
  BellOff,
  Trash2,
  Filter,
  Clock,
  Check,
  X,
  ChevronRight,
  Info,
  Zap,
  RefreshCw,
  Settings
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'

const AlertsPage = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const initialAlerts = [
    {
      id: 1,
      type: 'error',
      title: 'Low Oil Level - Critical',
      message: 'AromaPure Pro 3000 requires immediate refill. Oil level at 8%',
      time: '2 min ago',
      timestamp: new Date(),
      icon: AlertCircle,
      read: false,
      machine: 'Pro 3000',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Maintenance Due Soon',
      message: 'Scheduled maintenance for Elite 5000 in 2 days',
      time: '15 min ago',
      timestamp: new Date(Date.now() - 15 * 60000),
      icon: AlertTriangle,
      read: false,
      machine: 'Elite 5000',
    },
    {
      id: 3,
      type: 'success',
      title: 'Refill Completed',
      message: 'AromaPure Classic 2000 refill successful - 250ml added',
      time: '1 hour ago',
      timestamp: new Date(Date.now() - 60 * 60000),
      icon: CheckCircle,
      read: true,
      machine: 'Classic 2000',
    },
    {
      id: 4,
      type: 'info',
      title: 'System Update Available',
      message: 'New firmware v2.4.1 available for your devices',
      time: '3 hours ago',
      timestamp: new Date(Date.now() - 180 * 60000),
      icon: Info,
      read: true,
      machine: null,
    },
    {
      id: 5,
      type: 'warning',
      title: 'High Usage Detected',
      message: 'Mini 1000 usage 40% higher than average today',
      time: '5 hours ago',
      timestamp: new Date(Date.now() - 300 * 60000),
      icon: Zap,
      read: true,
      machine: 'Mini 1000',
    },
    {
      id: 6,
      type: 'error',
      title: 'Connection Lost',
      message: 'Classic 2000 went offline. Check WiFi connection',
      time: '6 hours ago',
      timestamp: new Date(Date.now() - 360 * 60000),
      icon: AlertCircle,
      read: true,
      machine: 'Classic 2000',
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setAlerts(initialAlerts)
      setIsLoading(false)
    }, 500)
  }, [])

  const filters = [
    { id: 'all', label: 'All', count: alerts.length },
    { id: 'unread', label: 'Unread', count: alerts.filter(a => !a.read).length },
    { id: 'error', label: 'Critical', count: alerts.filter(a => a.type === 'error').length },
    { id: 'warning', label: 'Warning', count: alerts.filter(a => a.type === 'warning').length },
  ]

  const getAlertStyles = (type) => {
    switch (type) {
      case 'error':
        return { 
          border: 'border-danger/40', 
          bg: 'bg-danger/10',
          icon: 'text-danger',
          badge: 'bg-danger'
        }
      case 'warning':
        return { 
          border: 'border-warning/40', 
          bg: 'bg-warning/10',
          icon: 'text-warning',
          badge: 'bg-warning'
        }
      case 'success':
        return { 
          border: 'border-success/40', 
          bg: 'bg-success/10',
          icon: 'text-success',
          badge: 'bg-success'
        }
      default:
        return { 
          border: 'border-accent/40', 
          bg: 'bg-accent/10',
          icon: 'text-accent',
          badge: 'bg-accent'
        }
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'unread') return !alert.read
    return alert.type === selectedFilter
  })

  const unreadCount = alerts.filter(a => !a.read).length

  const markAsRead = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a))
  }

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })))
  }

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  const clearAll = () => {
    setAlerts([])
  }

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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-poppins text-lg font-semibold text-white">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-2 py-0.5 bg-danger rounded-full text-white text-xs font-bold"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </div>
              <p className="text-secondary/70 text-xs">{alerts.length} total alerts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={markAllAsRead}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              title="Mark all as read"
            >
              <Check className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => navigate('/account')}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedFilter === filter.id
                  ? 'bg-accent text-primary-dark'
                  : 'bg-white/5 text-secondary hover:text-white'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedFilter === filter.id ? 'bg-primary-dark/20' : 'bg-white/10'
              }`}>
                {filter.count}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-3">
        {/* Quick Actions */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-2"
          >
            <span className="text-secondary text-xs">
              {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}
            </span>
            <motion.button
              onClick={clearAll}
              className="text-danger text-xs flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <Trash2 className="w-3 h-3" />
              Clear All
            </motion.button>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-full" />
                    <div className="h-3 bg-white/10 rounded w-1/4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Alerts List */}
        <AnimatePresence mode="popLayout">
          {filteredAlerts.map((alert, index) => {
            const Icon = alert.icon
            const styles = getAlertStyles(alert.type)
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05, ...springConfig.gentle }}
                layout
              >
                <Card 
                  className={`border ${styles.border} ${!alert.read ? styles.bg : ''} relative overflow-hidden`}
                  onClick={() => markAsRead(alert.id)}
                >
                  {/* Unread indicator */}
                  {!alert.read && (
                    <motion.div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${styles.badge}`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                    />
                  )}
                  
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`p-3 glass rounded-xl ${styles.icon}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-semibold text-white text-sm ${!alert.read ? '' : 'opacity-70'}`}>
                          {alert.title}
                        </h3>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteAlert(alert.id)
                          }}
                          className="p-1 rounded-lg hover:bg-white/10 text-secondary hover:text-danger transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                      
                      <p className={`text-secondary text-xs mt-1 ${!alert.read ? '' : 'opacity-70'}`}>
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-secondary/60" />
                          <span className="text-secondary/60 text-xs">{alert.time}</span>
                        </div>
                        
                        {alert.machine && (
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate('/machines')
                            }}
                            className="flex items-center gap-1 text-accent text-xs"
                            whileHover={{ x: 3 }}
                          >
                            {alert.machine}
                            <ChevronRight className="w-3 h-3" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Empty State */}
        {!isLoading && filteredAlerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BellOff className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-white font-semibold mb-2">All Caught Up!</h3>
            <p className="text-secondary text-sm">No {selectedFilter !== 'all' ? selectedFilter : ''} alerts to show</p>
          </motion.div>
        )}

        {/* Summary Stats */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Card className="bg-gradient-to-r from-primary/30 to-primary/10 border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-accent" />
                <h3 className="font-poppins font-semibold text-white">Alert Summary</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{alerts.filter(a => a.type === 'error').length}</p>
                  <p className="text-danger text-xs">Critical</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{alerts.filter(a => a.type === 'warning').length}</p>
                  <p className="text-warning text-xs">Warning</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{alerts.filter(a => a.type === 'success').length}</p>
                  <p className="text-success text-xs">Success</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{alerts.filter(a => a.type === 'info').length}</p>
                  <p className="text-accent text-xs">Info</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AlertsPage
