import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motionVariants, springConfig } from '../config/theme'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  ChevronDown,
  MapPin,
  Package,
  Droplet,
  Clock,
  Wifi,
  WifiOff,
  ArrowLeft,
  Grid3X3,
  List,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  ThermometerSun,
  RefreshCw
} from 'lucide-react'
import AnimatedWaveBackground from '../components/ui/AnimatedWaveBackground'
import Card from '../components/ui/Card'

// Mini Progress Ring
const MiniProgressRing = ({ percentage, size = 40, strokeWidth = 4, color }) => {
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
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold text-white">{percentage}%</span>
      </div>
    </div>
  )
}

const MachinesListPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const filterParam = searchParams.get('filter')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [sortBy, setSortBy] = useState('location')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [viewMode, setViewMode] = useState('list')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (filterParam) {
      const filterMap = {
        'All': 'All',
        'Active': 'Active',
        'Good': 'Good',
        'Medium': 'Medium',
        'Low': 'Low',
        'Urgent': 'Urgent',
      }
      setSelectedFilter(filterMap[filterParam] || 'All')
    }
  }, [filterParam])

  const filters = ['All', 'Active', 'Good', 'Medium', 'Low', 'Urgent']
  const sortOptions = [
    { value: 'location', label: 'Location' },
    { value: 'level', label: 'Oil Level' },
    { value: 'refill', label: 'Refill Date' },
    { value: 'name', label: 'Name' },
  ]

  const getPageTitle = () => {
    if (filterParam === 'Low') return 'Machines Needing Refill'
    if (filterParam === 'Active') return 'Active Machines'
    if (filterParam === 'Good') return 'Good Condition'
    if (filterParam === 'Medium') return 'Medium Level'
    if (filterParam === 'Urgent') return 'Urgent Attention'
    return 'My Machines'
  }

  const machines = [
    {
      id: 1,
      name: 'AromaPure Pro 3000',
      location: 'Main Office - Floor 3',
      code: 'AP-3000-001',
      sku: 'SKU-12345',
      status: 'installed',
      oilLevel: 75,
      usageRate: '2.5 ml/hr',
      lastRefill: 'Dec 15, 2024',
      installDate: 'Jan 10, 2024',
      online: true,
      efficiency: 94,
      temp: '23°C',
      fragrance: 'Lavender',
    },
    {
      id: 2,
      name: 'AromaPure Elite 5000',
      location: 'Conference Room A',
      code: 'AP-5000-002',
      sku: 'SKU-12346',
      status: 'assigned',
      oilLevel: 45,
      usageRate: '3.2 ml/hr',
      lastRefill: 'Nov 28, 2024',
      installDate: 'Feb 15, 2024',
      online: true,
      efficiency: 87,
      temp: '22°C',
      fragrance: 'Eucalyptus',
    },
    {
      id: 3,
      name: 'AromaPure Classic 2000',
      location: 'Reception Area',
      code: 'AP-2000-003',
      sku: 'SKU-12347',
      status: 'installed',
      oilLevel: 18,
      usageRate: '1.8 ml/hr',
      lastRefill: 'Oct 5, 2024',
      installDate: 'Mar 20, 2024',
      online: false,
      efficiency: 72,
      temp: '--',
      fragrance: 'Citrus',
    },
    {
      id: 4,
      name: 'AromaPure Mini 1000',
      location: 'Break Room',
      code: 'AP-1000-004',
      sku: 'SKU-12348',
      status: 'installed',
      oilLevel: 85,
      usageRate: '1.2 ml/hr',
      lastRefill: 'Dec 10, 2024',
      installDate: 'Apr 5, 2024',
      online: true,
      efficiency: 96,
      temp: '24°C',
      fragrance: 'Ocean Breeze',
    },
    {
      id: 5,
      name: 'AromaPure Elite 5000',
      location: 'Executive Suite',
      code: 'AP-5000-005',
      sku: 'SKU-12349',
      status: 'installed',
      oilLevel: 22,
      usageRate: '2.8 ml/hr',
      lastRefill: 'Sep 15, 2024',
      installDate: 'May 10, 2024',
      online: true,
      efficiency: 78,
      temp: '21°C',
      fragrance: 'Lavender',
    },
    {
      id: 6,
      name: 'AromaPure Pro 3000',
      location: 'Lobby Area',
      code: 'AP-3000-006',
      sku: 'SKU-12350',
      status: 'installed',
      oilLevel: 8,
      usageRate: '3.5 ml/hr',
      lastRefill: 'Oct 20, 2024',
      installDate: 'Jun 1, 2024',
      online: true,
      efficiency: 65,
      temp: '25°C',
      fragrance: 'Citrus',
    },
    {
      id: 7,
      name: 'AromaPure Classic 2000',
      location: 'Meeting Room B',
      code: 'AP-2000-007',
      sku: 'SKU-12351',
      status: 'installed',
      oilLevel: 65,
      usageRate: '2.0 ml/hr',
      lastRefill: 'Dec 5, 2024',
      installDate: 'Jul 15, 2024',
      online: true,
      efficiency: 91,
      temp: '23°C',
      fragrance: 'Eucalyptus',
    },
    {
      id: 8,
      name: 'AromaPure Mini 1000',
      location: 'Staff Kitchen',
      code: 'AP-1000-008',
      sku: 'SKU-12352',
      status: 'installed',
      oilLevel: 92,
      usageRate: '1.0 ml/hr',
      lastRefill: 'Dec 18, 2024',
      installDate: 'Aug 20, 2024',
      online: true,
      efficiency: 98,
      temp: '22°C',
      fragrance: 'Ocean Breeze',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'installed':
        return 'bg-success text-white'
      case 'assigned':
        return 'bg-accent text-primary-dark'
      default:
        return 'bg-secondary text-primary-dark'
    }
  }

  const getOilLevelColor = (level) => {
    if (level > 60) return '#4ADE80'
    if (level > 30) return '#F59E0B'
    if (level > 10) return '#F97316'
    return '#EF4444'
  }

  const getFilteredMachines = () => {
    let filtered = machines

    if (selectedFilter !== 'All') {
      filtered = filtered.filter(m => {
        if (selectedFilter === 'Active') return m.online === true
        if (selectedFilter === 'Good') return m.oilLevel > 60
        if (selectedFilter === 'Medium') return m.oilLevel > 30 && m.oilLevel <= 60
        if (selectedFilter === 'Low') return m.oilLevel > 10 && m.oilLevel <= 30
        if (selectedFilter === 'Urgent') return m.oilLevel <= 10
        return true
      })
    }

    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'level') return b.oilLevel - a.oilLevel
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return a.location.localeCompare(b.location)
    })

    return filtered
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  // Stats
  const stats = {
    total: machines.length,
    online: machines.filter(m => m.online).length,
    needsRefill: machines.filter(m => m.oilLevel <= 30).length,
    avgLevel: Math.round(machines.reduce((acc, m) => acc + m.oilLevel, 0) / machines.length),
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
        <div className="flex items-center gap-3 mb-3">
          {filterParam && (
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
          )}
          <div className="flex-1">
            <h1 className="font-poppins text-lg font-semibold text-white leading-tight">
              {getPageTitle()}
            </h1>
            <p className="text-secondary/70 text-xs">
              {getFilteredMachines().length} of {machines.length} machines
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleRefresh}
              className="p-2 rounded-xl bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
            
            {/* View Toggle */}
            <div className="flex bg-white/5 rounded-lg p-0.5">
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-accent text-primary-dark' : 'text-secondary'}`}
                whileTap={{ scale: 0.9 }}
              >
                <List className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-accent text-primary-dark' : 'text-secondary'}`}
                whileTap={{ scale: 0.9 }}
              >
                <Grid3X3 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Total', value: stats.total, icon: Package, color: 'text-accent' },
            { label: 'Online', value: stats.online, icon: Wifi, color: 'text-success' },
            { label: 'Low', value: stats.needsRefill, icon: AlertCircle, color: 'text-warning' },
            { label: 'Avg', value: `${stats.avgLevel}%`, icon: Droplet, color: 'text-accent' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-white/5 rounded-xl p-2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
              <p className="text-white font-bold text-sm">{stat.value}</p>
              <p className="text-secondary text-[10px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search machines..."
            className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-secondary/50 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/30"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter, i) => {
            const count = filter === 'All' ? machines.length :
              filter === 'Active' ? machines.filter(m => m.online).length :
              filter === 'Good' ? machines.filter(m => m.oilLevel > 60).length :
              filter === 'Medium' ? machines.filter(m => m.oilLevel > 30 && m.oilLevel <= 60).length :
              filter === 'Low' ? machines.filter(m => m.oilLevel > 10 && m.oilLevel <= 30).length :
              machines.filter(m => m.oilLevel <= 10).length
              
            return (
              <motion.button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedFilter === filter
                    ? 'bg-accent text-primary-dark'
                    : 'bg-white/5 text-secondary/80 hover:text-white hover:bg-white/10'
                }`}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {filter}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedFilter === filter ? 'bg-primary-dark/20' : 'bg-white/10'
                }`}>
                  {count}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="relative mt-2">
          <motion.button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-secondary/80"
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="w-3 h-3" />
            <span>Sort: {sortOptions.find(o => o.value === sortBy)?.label}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {showSortDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 glass-strong rounded-xl p-2 z-50 min-w-[150px]"
              >
                {sortOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value)
                      setShowSortDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-accent/20 text-accent'
                        : 'text-white hover:bg-white/5'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="px-4 py-4">
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {getFilteredMachines().map((machine, index) => (
                <motion.div
                  key={machine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    hoverable
                    onClick={() => navigate(`/machine/${machine.id}`)}
                    className="p-4"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-poppins text-base font-semibold text-white truncate">
                            {machine.name}
                          </h3>
                          {machine.online ? (
                            <Wifi className="w-4 h-4 text-success flex-shrink-0" />
                          ) : (
                            <WifiOff className="w-4 h-4 text-secondary flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-secondary text-xs">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{machine.location}</span>
                        </div>
                      </div>
                      
                      <MiniProgressRing 
                        percentage={machine.oilLevel} 
                        color={getOilLevelColor(machine.oilLevel)}
                      />
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-2 py-3 border-t border-b border-white/10">
                      <div className="text-center">
                        <Droplet className="w-3 h-3 text-accent mx-auto mb-1" />
                        <p className="text-white text-xs font-medium">{machine.usageRate}</p>
                        <p className="text-secondary text-[10px]">Rate</p>
                      </div>
                      <div className="text-center">
                        <Zap className="w-3 h-3 text-success mx-auto mb-1" />
                        <p className="text-white text-xs font-medium">{machine.efficiency}%</p>
                        <p className="text-secondary text-[10px]">Efficiency</p>
                      </div>
                      <div className="text-center">
                        <ThermometerSun className="w-3 h-3 text-warning mx-auto mb-1" />
                        <p className="text-white text-xs font-medium">{machine.temp}</p>
                        <p className="text-secondary text-[10px]">Temp</p>
                      </div>
                      <div className="text-center">
                        <Activity className="w-3 h-3 text-accent mx-auto mb-1" />
                        <p className="text-white text-xs font-medium truncate">{machine.fragrance}</p>
                        <p className="text-secondary text-[10px]">Fragrance</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-secondary text-xs">
                        <Clock className="w-3 h-3" />
                        <span>Refill: {machine.lastRefill}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${getStatusColor(machine.status)}`}>
                        {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              {getFilteredMachines().map((machine, index) => (
                <motion.div
                  key={machine.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    hoverable
                    onClick={() => navigate(`/machine/${machine.id}`)}
                    className="p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      {machine.online ? (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-success/20 rounded-full">
                          <div className="w-1.5 h-1.5 bg-success rounded-full" />
                          <span className="text-success text-[10px]">Online</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-secondary/20 rounded-full">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                          <span className="text-secondary text-[10px]">Offline</span>
                        </div>
                      )}
                      <MiniProgressRing 
                        percentage={machine.oilLevel} 
                        size={32}
                        strokeWidth={3}
                        color={getOilLevelColor(machine.oilLevel)}
                      />
                    </div>
                    
                    <h3 className="font-poppins text-sm font-semibold text-white truncate mb-1">
                      {machine.name.replace('AromaPure ', '')}
                    </h3>
                    <p className="text-secondary text-[10px] truncate mb-2">
                      {machine.location}
                    </p>
                    
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-secondary">{machine.usageRate}</span>
                      <span className={`px-1.5 py-0.5 rounded-full ${getStatusColor(machine.status)}`}>
                        {machine.status}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {getFilteredMachines().length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No Machines Found</h3>
            <p className="text-secondary text-sm">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MachinesListPage
