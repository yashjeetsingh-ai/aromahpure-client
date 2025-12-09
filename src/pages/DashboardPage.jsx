import { motion } from 'framer-motion'
import { motionVariants } from '../config/theme'
import { useNavigate } from 'react-router-dom'
import { Plus, Filter, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import DeviceCard from '../components/DeviceCard'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  // Dummy client logos data
  const clients = [
    { id: 1, name: 'TechCorp', logo: 'TC' },
    { id: 2, name: 'GreenSpace', logo: 'GS' },
    { id: 3, name: 'Wellness Co', logo: 'WC' },
    { id: 4, name: 'Modern Office', logo: 'MO' },
  ]

  // Dummy device data
  const devices = [
    {
      id: 1,
      name: 'AromaPure Pro 3000',
      status: 'active',
      refillDate: 'Dec 15, 2024',
      runningTime: '2,340 hrs',
    },
    {
      id: 2,
      name: 'AromaPure Elite 5000',
      status: 'warning',
      refillDate: 'Nov 28, 2024',
      runningTime: '1,890 hrs',
    },
    {
      id: 3,
      name: 'AromaPure Classic 2000',
      status: 'active',
      refillDate: 'Dec 10, 2024',
      runningTime: '3,120 hrs',
    },
    {
      id: 4,
      name: 'AromaPure Mini 1000',
      status: 'error',
      refillDate: 'Oct 5, 2024',
      runningTime: '890 hrs',
    },
  ]

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <AnimatedWaveBackground />
      
      {/* Header */}
      <motion.header
        className="glass-strong border-b border-white/10 px-6 py-4 sticky top-0 z-40"
        initial={motionVariants.slideUp.initial}
        animate={motionVariants.slideUp.animate}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">
              Dashboard
            </h1>
            <p className="text-secondary text-sm mt-1">
              {devices.length} devices active
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              className="p-2 glass rounded-xl text-secondary hover:text-white transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Filter className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="p-2 glass rounded-xl text-secondary hover:text-white transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="p-2 glass rounded-xl text-danger hover:bg-danger/10 transition-colors"
              whileTap={{ scale: 0.9 }}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-4">
        {/* Client Logos Grid */}
        <motion.section
          initial={motionVariants.fadeIn.initial}
          animate={motionVariants.fadeIn.animate}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-serif text-xl font-semibold text-white mb-4">
            Clients
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                className="glass rounded-xl p-4 aspect-square flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all"
                initial={motionVariants.scaleIn.initial}
                animate={motionVariants.scaleIn.animate}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={motionVariants.cardHover}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-serif text-lg font-bold text-accent">
                  {client.logo}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={motionVariants.fadeIn.initial}
          animate={motionVariants.fadeIn.animate}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-serif text-xl font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {['All Devices', 'Active', 'Warning', 'Errors'].map((action, index) => (
              <motion.button
                key={action}
                className="px-6 py-2 glass rounded-full text-sm font-medium text-white whitespace-nowrap"
                initial={motionVariants.scaleIn.initial}
                animate={motionVariants.scaleIn.animate}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {action}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Device Cards */}
        <motion.section
          initial={motionVariants.fadeIn.initial}
          animate={motionVariants.fadeIn.animate}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-serif text-xl font-semibold text-white mb-4">
            Devices
          </h2>
          <div>
            {devices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={motionVariants.slideUp.initial}
                animate={motionVariants.slideUp.animate}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <DeviceCard
                  deviceName={device.name}
                  status={device.status}
                  refillDate={device.refillDate}
                  runningTime={device.runningTime}
                  onClick={() => navigate(`/device/${device.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default DashboardPage

