import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants, springConfig } from '../config/theme'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  Search,
  Filter,
  Calendar,
  User,
  Droplet,
  TrendingUp,
  Download,
  ChevronDown,
  Clock,
  Package,
  BarChart3,
  ArrowUpRight,
  CheckCircle,
  Share2
} from 'lucide-react'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'

// Animated Number
const AnimatedNumber = ({ value, duration = 1.5, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    let startTime
    let animationFrame
    const numValue = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value
    
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
  
  return <span>{displayValue.toLocaleString()}{suffix}</span>
}

// Mini Bar Chart
const MiniBarChart = ({ data }) => {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((val, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-accent/60 rounded-t"
          initial={{ height: 0 }}
          animate={{ height: `${(val / max) * 100}%` }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        />
      ))}
    </div>
  )
}

const RefillHistoryPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const machineId = searchParams.get('machine')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedTechnician, setSelectedTechnician] = useState('all')

  const refills = [
    {
      id: 1,
      date: 'Dec 15, 2024',
      time: '10:30 AM',
      technician: 'John Smith',
      technicianAvatar: null,
      amount: '+250 ml',
      before: 45,
      after: 95,
      fragranceCode: 'FRG-001',
      fragranceName: 'Lavender Dreams',
      notes: 'Regular maintenance refill',
      machine: 'Pro 3000',
      location: 'Main Office',
      duration: '15 min',
    },
    {
      id: 2,
      date: 'Nov 28, 2024',
      time: '2:15 PM',
      technician: 'Sarah Johnson',
      technicianAvatar: null,
      amount: '+200 ml',
      before: 30,
      after: 80,
      fragranceCode: 'FRG-002',
      fragranceName: 'Ocean Breeze',
      notes: 'Emergency refill requested',
      machine: 'Elite 5000',
      location: 'Conference Room',
      duration: '12 min',
    },
    {
      id: 3,
      date: 'Oct 20, 2024',
      time: '9:00 AM',
      technician: 'Mike Davis',
      technicianAvatar: null,
      amount: '+300 ml',
      before: 20,
      after: 100,
      fragranceCode: 'FRG-001',
      fragranceName: 'Lavender Dreams',
      notes: 'Scheduled refill - full capacity',
      machine: 'Classic 2000',
      location: 'Reception',
      duration: '18 min',
    },
    {
      id: 4,
      date: 'Sep 15, 2024',
      time: '11:45 AM',
      technician: 'John Smith',
      technicianAvatar: null,
      amount: '+180 ml',
      before: 35,
      after: 85,
      fragranceCode: 'FRG-003',
      fragranceName: 'Citrus Fresh',
      notes: 'Routine check-up refill',
      machine: 'Mini 1000',
      location: 'Break Room',
      duration: '10 min',
    },
    {
      id: 5,
      date: 'Aug 10, 2024',
      time: '3:30 PM',
      technician: 'Sarah Johnson',
      technicianAvatar: null,
      amount: '+220 ml',
      before: 25,
      after: 78,
      fragranceCode: 'FRG-002',
      fragranceName: 'Ocean Breeze',
      notes: 'Changed fragrance type',
      machine: 'Pro 3000',
      location: 'Lobby',
      duration: '20 min',
    },
  ]

  const stats = {
    totalRefills: 47,
    volumeRefilled: 11750,
    thisMonth: 12,
    thisYear: 47,
    avgInterval: 14,
    topFragrance: 'Lavender',
  }

  const monthlyData = [8, 10, 9, 12, 11, 14]
  const technicians = ['all', 'John Smith', 'Sarah Johnson', 'Mike Davis']

  const getFilteredRefills = () => {
    let filtered = refills
    
    if (selectedTechnician !== 'all') {
      filtered = filtered.filter(r => r.technician === selectedTechnician)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.fragranceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.fragranceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.machine.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
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
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <div>
              <h1 className="font-poppins text-lg font-semibold text-white">
                Refill History
              </h1>
              <p className="text-secondary/70 text-xs">{refills.length} records</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fragrance, machine..."
            className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-secondary/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>

        {/* Filter Row */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'this-week', 'this-month', 'this-year'].map((filter, i) => (
            <motion.button
              key={filter}
              onClick={() => setDateFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                dateFilter === filter
                  ? 'bg-accent text-primary-dark'
                  : 'bg-white/5 text-secondary hover:text-white'
              }`}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </motion.button>
          ))}
        </div>

        {/* Technician Filter */}
        <div className="relative mt-2">
          <motion.button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-secondary"
            whileTap={{ scale: 0.98 }}
          >
            <User className="w-3 h-3" />
            <span>Tech: {selectedTechnician === 'all' ? 'All' : selectedTechnician}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {showFilterMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 glass-strong rounded-xl p-2 z-50 min-w-[160px]"
              >
                {technicians.map((tech) => (
                  <motion.button
                    key={tech}
                    onClick={() => {
                      setSelectedTechnician(tech)
                      setShowFilterMenu(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      selectedTechnician === tech
                        ? 'bg-accent/20 text-accent'
                        : 'text-white hover:bg-white/5'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    {tech === 'all' ? 'All Technicians' : tech}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="px-4 py-4 space-y-4">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card className="bg-gradient-to-br from-primary/30 to-primary/10 border border-accent/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <p className="text-secondary text-xs">Total Refills</p>
            </div>
            <p className="font-poppins text-2xl font-bold text-white">
              <AnimatedNumber value={stats.totalRefills} />
            </p>
            <p className="text-success text-xs flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              +8% this month
            </p>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="w-4 h-4 text-accent" />
              <p className="text-secondary text-xs">Volume Refilled</p>
            </div>
            <p className="font-poppins text-2xl font-bold text-white">
              <AnimatedNumber value={stats.volumeRefilled} suffix=" ml" />
            </p>
            <p className="text-secondary text-xs mt-1">Across all machines</p>
          </Card>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent" />
                <h3 className="font-poppins font-semibold text-white text-sm">Monthly Trend</h3>
              </div>
              <span className="text-accent text-xs font-medium">Last 6 months</span>
            </div>
            <MiniBarChart data={monthlyData} />
            <div className="flex justify-between mt-2 text-[10px] text-secondary">
              {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'This Month', value: stats.thisMonth, icon: Calendar },
            { label: 'Avg Interval', value: `${stats.avgInterval}d`, icon: Clock },
            { label: 'Top Scent', value: stats.topFragrance, icon: Droplet },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <Card className="p-3 text-center">
                <stat.icon className="w-4 h-4 text-accent mx-auto mb-1" />
                <p className="text-white font-bold text-sm">{stat.value}</p>
                <p className="text-secondary text-[10px]">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Refill History Cards */}
        <div className="space-y-3">
          <h3 className="font-poppins font-semibold text-white text-sm">Recent Refills</h3>
          
          {getFilteredRefills().map((refill, index) => (
            <motion.div
              key={refill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Card className="p-4" hoverable>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="font-poppins font-semibold text-white text-sm">
                        {refill.date}
                      </span>
                      <span className="text-secondary text-xs">{refill.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-secondary text-xs">
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>{refill.machine}</span>
                      </div>
                      <span>•</span>
                      <span>{refill.location}</span>
                    </div>
                  </div>
                  <motion.div 
                    className="px-3 py-1.5 bg-accent/20 rounded-lg border border-accent/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-accent font-semibold text-sm">{refill.amount}</span>
                  </motion.div>
                </div>

                {/* Technician */}
                <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-xs font-medium">{refill.technician}</p>
                    <p className="text-secondary text-[10px]">Duration: {refill.duration}</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>

                {/* Level Change */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-secondary text-xs">Before: {refill.before}%</span>
                    <span className="text-secondary text-xs">After: {refill.after}%</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-white/20 rounded-full"
                      style={{ width: `${refill.before}%` }}
                    />
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                      initial={{ width: `${refill.before}%` }}
                      animate={{ width: `${refill.after}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-primary/30 rounded-lg border border-primary/50 text-white text-xs font-mono">
                      {refill.fragranceCode}
                    </span>
                    <span className="text-secondary text-xs">{refill.fragranceName}</span>
                  </div>
                </div>
                
                {refill.notes && (
                  <p className="text-secondary text-xs mt-2 italic">"{refill.notes}"</p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {getFilteredRefills().length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Droplet className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No Refill Records</h3>
            <p className="text-secondary text-sm">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default RefillHistoryPage
