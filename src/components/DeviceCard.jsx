import { motion } from 'framer-motion'
import { motionVariants } from '../config/theme'
import { Clock, Calendar, Activity } from 'lucide-react'
import Card from './ui/Card'

const DeviceCard = ({ 
  deviceName, 
  status, 
  refillDate, 
  runningTime,
  onClick,
  className = '' 
}) => {
  const statusColors = {
    active: 'bg-success',
    warning: 'bg-accent',
    error: 'bg-danger',
    idle: 'bg-secondary',
  }

  const statusLabels = {
    active: 'Active',
    warning: 'Warning',
    error: 'Error',
    idle: 'Idle',
  }

  return (
    <Card 
      hoverable 
      onClick={onClick}
      className={`mb-4 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold text-white mb-1">
            {deviceName}
          </h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[status] || statusColors.idle}`} />
            <span className="text-secondary text-sm font-medium">
              {statusLabels[status] || 'Unknown'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-secondary">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Last Refill: {refillDate}</span>
        </div>
        
        <div className="flex items-center gap-3 text-secondary">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Running: {runningTime}</span>
        </div>
      </div>

      <motion.div
        className="mt-4 pt-4 border-t border-white/10"
        initial={motionVariants.fadeIn.initial}
        animate={motionVariants.fadeIn.animate}
      >
        <div className="flex items-center gap-2 text-accent">
          <Activity className="w-4 h-4" />
          <span className="text-sm font-medium">View Details</span>
        </div>
      </motion.div>
    </Card>
  )
}

export default DeviceCard

