import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import ClientDashboardPage from './pages/ClientDashboardPage'
import MachinesListPage from './pages/MachinesListPage'
import MachineDetailModalPage from './pages/MachineDetailModalPage'
import RefillHistoryPage from './pages/RefillHistoryPage'
import MaintenancePage from './pages/MaintenancePage'
import AnalyticsPage from './pages/AnalyticsPage'
import AccountPage from './pages/AccountPage'
import DashboardPage from './pages/DashboardPage'
import DeviceDetailPage from './pages/DeviceDetailPage'
import SettingsPage from './pages/SettingsPage'
import AlertsPage from './pages/AlertsPage'
import BottomNavigation from './components/BottomNavigation'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/" replace />
}

// Component to conditionally render BottomNavigation
const AppLayout = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  
  // Don't show bottom navigation on login page
  const showBottomNav = isAuthenticated && location.pathname !== '/'
  
  return (
    <>
      {children}
      {showBottomNav && <BottomNavigation />}
    </>
  )
}

function AppRoutes() {
  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Client Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <ClientDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/machines" 
          element={
            <ProtectedRoute>
              <MachinesListPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/machine/:id" 
          element={
            <ProtectedRoute>
              <MachineDetailModalPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/refill-history" 
          element={
            <ProtectedRoute>
              <RefillHistoryPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/maintenance" 
          element={
            <ProtectedRoute>
              <MaintenancePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/account" 
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          } 
        />
        {/* Legacy Admin Routes (keeping for compatibility) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/device/:id" 
          element={
            <ProtectedRoute>
              <DeviceDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/alerts" 
          element={
            <ProtectedRoute>
              <AlertsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AnimatePresence>
    </AppLayout>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App

