import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants } from '../config/theme'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  ArrowLeft, 
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Lock,
  LogOut,
  Edit,
  Camera,
  Shield,
  CreditCard,
  Calendar,
  Package,
  Droplet,
  TrendingUp,
  Award,
  Star,
  ChevronRight,
  Settings,
  HelpCircle,
  FileText,
  Share2,
  Gift,
  Crown,
  Check,
  X,
  Clock,
  Activity,
  Zap,
  Building,
  Globe,
  ExternalLink
} from 'lucide-react'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

// Animated Number
const AnimatedNumber = ({ value, duration = 1.5, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    let startTime
    let animationFrame
    const numValue = typeof value === 'string' ? parseInt(value) : value
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setDisplayValue(Math.floor(progress * numValue))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])
  
  return <span>{displayValue}{suffix}</span>
}

// Progress Ring
const ProgressRing = ({ percentage, size = 60, strokeWidth = 6, color = '#D4B56A' }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
          transition={{ duration: 1.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{percentage}%</span>
      </div>
    </div>
  )
}

const AccountPage = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const profile = {
    name: 'Acme Corporation',
    contactPerson: user?.username || 'John Doe',
    email: 'john.doe@acmecorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, Suite 100, New York, NY 10001',
    memberSince: 'Jan 2024',
    accountType: 'Premium',
    verified: true,
    website: 'www.acmecorp.com',
  }

  const stats = {
    totalMachines: 8,
    activeDevices: 7,
    totalRefills: 47,
    avgOilLevel: 68,
    maintenanceScore: 94,
    uptime: 99.2,
  }

  const subscription = {
    plan: 'Premium Business',
    status: 'Active',
    renewalDate: 'Jan 15, 2025',
    machines: '10 machines',
    price: '$299/month',
  }

  const recentActivity = [
    { action: 'Refill completed', device: 'Pro 3000', time: '2 hours ago', icon: Droplet, color: 'text-accent' },
    { action: 'Maintenance scheduled', device: 'Elite 5000', time: '5 hours ago', icon: Calendar, color: 'text-warning' },
    { action: 'Device online', device: 'Mini 1000', time: '1 day ago', icon: Zap, color: 'text-success' },
    { action: 'Low oil alert', device: 'Classic 2000', time: '2 days ago', icon: Activity, color: 'text-danger' },
  ]

  const quickSettings = [
    { icon: Bell, label: 'Notifications', description: 'Manage alerts', onClick: () => navigate('/settings') },
    { icon: Lock, label: 'Security', description: 'Password & 2FA', onClick: () => navigate('/settings') },
    { icon: CreditCard, label: 'Billing', description: 'Payment methods', onClick: () => {} },
    { icon: Settings, label: 'Preferences', description: 'App settings', onClick: () => navigate('/settings') },
  ]

  const supportLinks = [
    { icon: HelpCircle, label: 'Help Center', description: 'FAQs & guides' },
    { icon: FileText, label: 'Documentation', description: 'API & integration' },
    { icon: Share2, label: 'Refer a Friend', description: 'Get free months' },
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
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <div>
              <h1 className="font-poppins text-lg font-semibold text-white">Account</h1>
              <p className="text-secondary/70 text-xs">Manage your profile</p>
            </div>
          </div>
          <motion.button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-xl bg-white/10 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-5">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  {/* Profile Picture */}
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-light rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-10 h-10 text-primary-dark" />
                    </div>
                    <motion.button
                      className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-dark border-2 border-accent rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Camera className="w-3 h-3 text-accent" />
                    </motion.button>
                    {profile.verified && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-primary-dark"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-poppins text-lg font-bold text-white">
                        {profile.contactPerson}
                      </h2>
                      <span className="px-2 py-0.5 bg-accent/20 rounded-full text-accent text-[10px] font-medium flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        PRO
                      </span>
                    </div>
                    <p className="text-secondary text-sm">{profile.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-success text-xs">Active</span>
                      <span className="text-secondary text-xs">• Member since {profile.memberSince}</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setShowEditProfile(true)}
                  className="p-2 glass rounded-xl text-accent"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: Mail, label: 'Email', value: profile.email },
                  { icon: Phone, label: 'Phone', value: profile.phone },
                  { icon: Building, label: 'Company', value: profile.name },
                  { icon: Globe, label: 'Website', value: profile.website },
                  { icon: MapPin, label: 'Address', value: profile.address },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <item.icon className="w-4 h-4 text-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-secondary text-[10px]">{item.label}</p>
                      <p className="text-white text-sm truncate">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Account Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-poppins font-semibold text-white">Account Overview</h3>
            <span className="text-accent text-xs">This month</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Machines', value: stats.totalMachines, icon: Package, color: 'text-accent' },
              { label: 'Active', value: stats.activeDevices, icon: Zap, color: 'text-success' },
              { label: 'Refills', value: stats.totalRefills, icon: Droplet, color: 'text-accent' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <Card className="p-4 text-center">
                  <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                  <p className="text-xl font-bold text-white">
                    <AnimatedNumber value={stat.value} />
                  </p>
                  <p className="text-secondary text-[10px]">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Performance Cards */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary text-xs mb-1">Avg Oil Level</p>
                    <p className="text-2xl font-bold text-white">{stats.avgOilLevel}%</p>
                    <p className="text-success text-xs flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      Good condition
                    </p>
                  </div>
                  <ProgressRing percentage={stats.avgOilLevel} color="#4ADE80" />
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary text-xs mb-1">Uptime</p>
                    <p className="text-2xl font-bold text-white">{stats.uptime}%</p>
                    <p className="text-accent text-xs flex items-center gap-1 mt-1">
                      <Award className="w-3 h-3" />
                      Excellent
                    </p>
                  </div>
                  <ProgressRing percentage={stats.uptime} color="#D4B56A" />
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-poppins font-semibold text-white mb-3">Subscription</h3>
          
          <Card className="p-4 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border-accent/30 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(212,181,106,0.3) 50%, transparent 70%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/30 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{subscription.plan}</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-success text-xs">{subscription.status}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{subscription.price}</p>
                  <p className="text-secondary text-xs">{subscription.machines}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-secondary text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>Renews {subscription.renewalDate}</span>
                </div>
                <motion.button
                  className="px-3 py-1.5 bg-accent text-primary-dark rounded-lg text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Manage Plan
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-poppins font-semibold text-white">Recent Activity</h3>
            <motion.button
              className="text-accent text-xs"
              whileHover={{ x: 3 }}
            >
              View all
            </motion.button>
          </div>
          
          <Card className="divide-y divide-white/10">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <div className={`p-2 rounded-xl bg-white/5`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{activity.action}</p>
                  <p className="text-secondary text-xs">{activity.device}</p>
                </div>
                <div className="flex items-center gap-1 text-secondary text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </Card>
        </motion.div>

        {/* Quick Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-poppins font-semibold text-white mb-3">Quick Settings</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {quickSettings.map((setting, i) => (
              <motion.div
                key={setting.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                <Card
                  hoverable
                  onClick={setting.onClick}
                  className="p-4"
                >
                  <setting.icon className="w-5 h-5 text-accent mb-2" />
                  <p className="text-white text-sm font-medium">{setting.label}</p>
                  <p className="text-secondary text-[10px]">{setting.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support & Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className="font-poppins font-semibold text-white mb-3">Support & Resources</h3>
          
          <Card className="divide-y divide-white/10">
            {supportLinks.map((link, i) => (
              <motion.button
                key={link.label}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5">
                    <link.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">{link.label}</p>
                    <p className="text-secondary text-xs">{link.description}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-secondary" />
              </motion.button>
            ))}
          </Card>
        </motion.div>

        {/* Referral Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 bg-gradient-to-r from-success/20 to-success/5 border-success/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold">Refer & Earn</h4>
                <p className="text-secondary text-xs">Get 1 month free for each referral</p>
              </div>
              <motion.button
                className="px-3 py-1.5 bg-success text-white rounded-lg text-xs font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Share
              </motion.button>
            </div>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card className="border-2 border-danger/30 p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-danger/10">
                <LogOut className="w-5 h-5 text-danger" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">Logout</h4>
                <p className="text-secondary text-xs">
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

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-4"
        >
          <p className="text-secondary/50 text-xs">Account ID: ACC-2024-001234</p>
          <p className="text-secondary/30 text-[10px] mt-1">AromaPure Air v2.4.1</p>
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

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50"
            onClick={() => setShowEditProfile(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-primary-dark border-t border-white/10 rounded-t-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Edit Profile</h3>
                <motion.button
                  onClick={() => setShowEditProfile(false)}
                  className="p-2 rounded-xl bg-white/10"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-secondary" />
                </motion.button>
              </div>

              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent-light rounded-2xl flex items-center justify-center">
                    <User className="w-12 h-12 text-primary-dark" />
                  </div>
                  <motion.button
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="w-4 h-4 text-primary-dark" />
                  </motion.button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {[
                  { label: 'Full Name', value: profile.contactPerson, icon: User },
                  { label: 'Email', value: profile.email, icon: Mail },
                  { label: 'Phone', value: profile.phone, icon: Phone },
                  { label: 'Company', value: profile.name, icon: Building },
                  { label: 'Website', value: profile.website, icon: Globe },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-secondary text-xs mb-1.5 block">{field.label}</label>
                    <div className="relative">
                      <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="text-secondary text-xs mb-1.5 block">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-secondary" />
                    <textarea
                      defaultValue={profile.address}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-accent/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <motion.button
                className="w-full py-3 mt-6 bg-accent text-primary-dark rounded-xl font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowEditProfile(false)}
              >
                Save Changes
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccountPage
