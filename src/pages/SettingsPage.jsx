import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants, springConfig } from '../config/theme'
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Palette, 
  Info, 
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  HelpCircle,
  MessageSquare,
  Star,
  FileText,
  ExternalLink,
  User,
  Settings,
  Zap
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

// Toggle Switch Component
const ToggleSwitch = ({ enabled, onChange }) => (
  <motion.button
    className={`w-12 h-6 rounded-full p-1 transition-colors ${enabled ? 'bg-accent' : 'bg-white/20'}`}
    onClick={onChange}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="w-4 h-4 rounded-full bg-white"
      animate={{ x: enabled ? 20 : 0 }}
      transition={springConfig.smooth}
    />
  </motion.button>
)

const SettingsPage = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    soundAlerts: false,
    darkMode: true,
    autoRefresh: true,
    lowOilAlerts: true,
    maintenanceReminders: true,
  })

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const settingsSections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive alerts on your device', icon: Smartphone },
        { key: 'emailNotifications', label: 'Email Notifications', description: 'Get updates via email', icon: Mail },
        { key: 'soundAlerts', label: 'Sound Alerts', description: 'Play sound for new alerts', icon: Volume2 },
        { key: 'lowOilAlerts', label: 'Low Oil Alerts', description: 'Alert when oil level is low', icon: Zap },
        { key: 'maintenanceReminders', label: 'Maintenance Reminders', description: 'Upcoming maintenance alerts', icon: Bell },
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme', icon: Moon },
        { key: 'autoRefresh', label: 'Auto Refresh', description: 'Refresh data automatically', icon: Zap },
      ]
    }
  ]

  const quickLinks = [
    { label: 'Help Center', icon: HelpCircle, action: () => {} },
    { label: 'Contact Support', icon: MessageSquare, action: () => {} },
    { label: 'Rate App', icon: Star, action: () => {} },
    { label: 'Privacy Policy', icon: FileText, action: () => {} },
    { label: 'Terms of Service', icon: FileText, action: () => {} },
  ]

  const appVersion = '2.4.1'

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
          <div>
            <h1 className="font-poppins text-lg font-semibold text-white">
              Settings
            </h1>
            <p className="text-secondary/70 text-xs">Customize your experience</p>
          </div>
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-5">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border border-accent/30"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <User className="w-8 h-8 text-accent" />
              </motion.div>
              <div className="flex-1">
                <h2 className="font-poppins font-semibold text-white text-lg">
                  {user?.username || 'User'}
                </h2>
                <p className="text-secondary text-sm">Client Account</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-success text-xs">Active</span>
                </div>
              </div>
              <motion.button
                className="p-2 rounded-xl bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/account')}
              >
                <ChevronRight className="w-5 h-5 text-secondary" />
              </motion.button>
            </div>
          </Card>
        </motion.div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + sectionIndex * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <section.icon className="w-5 h-5 text-accent" />
              <h3 className="font-poppins font-semibold text-white">{section.title}</h3>
            </div>
            
            <Card className="divide-y divide-white/10">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.key}
                  className="flex items-center justify-between p-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + itemIndex * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      <p className="text-secondary text-xs">{item.description}</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings[item.key]}
                    onChange={() => toggleSetting(item.key)}
                  />
                </motion.div>
              ))}
            </Card>
          </motion.div>
        ))}

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-accent" />
            <h3 className="font-poppins font-semibold text-white">Security</h3>
          </div>
          
          <Card className="divide-y divide-white/10">
            {[
              { icon: Lock, label: 'Change Password', description: 'Update your password' },
              { icon: Eye, label: 'Privacy Settings', description: 'Manage data privacy' },
            ].map((item, i) => (
              <motion.button
                key={item.label}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-secondary text-xs">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-secondary" />
              </motion.button>
            ))}
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-accent" />
            <h3 className="font-poppins font-semibold text-white">Support & Info</h3>
          </div>
          
          <Card className="divide-y divide-white/10">
            {quickLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={link.action}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.03 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5">
                    <link.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-white text-sm">{link.label}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-secondary" />
              </motion.button>
            ))}
          </Card>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4 bg-gradient-to-r from-primary/30 to-primary/10 border-accent/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Settings className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">AromaPure Air</h3>
                <p className="text-secondary text-xs">Version {appVersion}</p>
              </div>
              <motion.span 
                className="px-3 py-1 bg-success/20 rounded-full text-success text-xs"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Up to date
              </motion.span>
            </div>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Card className="border-2 border-danger/30 p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-danger/10">
                <LogOut className="w-5 h-5 text-danger" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Logout</h3>
                <p className="text-secondary text-sm">
                  {user ? `Signed in as ${user.username}` : 'Sign out of your account'}
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full py-3 rounded-xl border-2 border-danger text-danger font-semibold flex items-center justify-center gap-2 hover:bg-danger/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </Card>
        </motion.div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-primary-dark border border-white/10 rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-danger/20 flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-8 h-8 text-danger" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Confirm Logout</h3>
                <p className="text-secondary text-sm">Are you sure you want to logout?</p>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="flex-1 py-3 rounded-xl bg-danger text-white font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SettingsPage
