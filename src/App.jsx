import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/app/Dashboard'
import SmartIrrigation from './pages/app/SmartIrrigation'
import WaterQuality from './pages/app/WaterQuality'
import Fertigation from './pages/app/Fertigation'
import AIRecommendations from './pages/app/AIRecommendations'
import FarmZones from './pages/app/FarmZones'
import Alerts from './pages/app/Alerts'
import Analytics from './pages/app/Analytics'
import Reports from './pages/app/Reports'
import Settings from './pages/app/Settings'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage onGetStarted={() => {}} />} />
        <Route path="/auth" element={
          isLoggedIn
            ? <Navigate to="/app/dashboard" replace />
            : <AuthPage onLogin={() => setIsLoggedIn(true)} />
        } />
        <Route path="/app" element={
          isLoggedIn
            ? <AppLayout onLogout={() => setIsLoggedIn(false)} />
            : <Navigate to="/auth" replace />
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard"        element={<Dashboard />} />
          <Route path="irrigation"       element={<SmartIrrigation />} />
          <Route path="water-quality"    element={<WaterQuality />} />
          <Route path="fertigation"      element={<Fertigation />} />
          <Route path="ai-recommendations" element={<AIRecommendations />} />
          <Route path="farm-zones"       element={<FarmZones />} />
          <Route path="alerts"           element={<Alerts />} />
          <Route path="analytics"        element={<Analytics />} />
          <Route path="reports"          element={<Reports />} />
          <Route path="settings"         element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
