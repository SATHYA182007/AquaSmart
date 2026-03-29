import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Droplets, FlaskConical, Sprout, Cpu,
  Map, Bell, BarChart3, FileText, Settings2, LogOut,
  Search, ChevronDown, Leaf
} from 'lucide-react'

const navItems = [
  { path: 'dashboard',          icon: LayoutDashboard, label: 'Dashboard' },
  { path: 'irrigation',         icon: Droplets,         label: 'Smart Irrigation' },
  { path: 'water-quality',      icon: FlaskConical,     label: 'Water Quality' },
  { path: 'fertigation',        icon: Sprout,           label: 'Fertigation' },
  { path: 'ai-recommendations', icon: Cpu,              label: 'AI Recommendations' },
  { path: 'farm-zones',         icon: Map,              label: 'Farm Zones' },
  { path: 'alerts',             icon: Bell,             label: 'Alerts', badge: 3 },
  { path: 'analytics',          icon: BarChart3,        label: 'Analytics' },
  { path: 'reports',            icon: FileText,         label: 'Reports' },
  { path: 'settings',          icon: Settings2,         label: 'Settings' },
]

export default function AppLayout({ onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname.includes(`/app/${path}`)

  return (
    <div className="page-root">
      {/* SIDEBAR */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <div style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, var(--green-600), var(--emerald-600))',
            borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', flexShrink: 0
          }}>
            <Droplets size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.01em' }}>
              AquaSmart AI
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--gray-400)', fontWeight: 500 }}>
              Smart Water · Smart Farm
            </div>
          </div>
        </div>

        {/* Farm Selector */}
        <div style={{ padding: '12px 10px 4px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 12px',
            background: 'var(--green-50)',
            border: '1px solid var(--green-200)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer'
          }}>
            <Leaf size={15} color="var(--green-600)" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Green Valley Farms
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--green-600)', fontWeight: 500 }}>
                Raichur, Karnataka
              </div>
            </div>
            <ChevronDown size={14} color="var(--green-500)" />
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main Menu</div>
          {navItems.slice(0, 6).map(({ path, icon: Icon, label, badge }) => (
            <button
              key={path}
              className={`nav-item ${isActive(path) ? 'active' : ''}`}
              onClick={() => navigate(`/app/${path}`)}
            >
              <Icon size={17} className="nav-icon" />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && <span className="nav-badge">{badge}</span>}
            </button>
          ))}

          <div className="sidebar-section-label" style={{ marginTop: 8 }}>Insights</div>
          {navItems.slice(6).map(({ path, icon: Icon, label, badge }) => (
            <button
              key={path}
              className={`nav-item ${isActive(path) ? 'active' : ''}`}
              onClick={() => navigate(`/app/${path}`)}
            >
              <Icon size={17} className="nav-icon" />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && <span className="nav-badge">{badge}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div className="avatar" style={{ width: 34, height: 34, fontSize: '0.72rem' }}>RK</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--gray-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Rajesh Kumar
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)', fontWeight: 500 }}>
                Farm Admin
              </div>
            </div>
          </div>
          <button
            className="nav-item"
            style={{ color: 'var(--danger)', width: '100%' }}
            onClick={() => { onLogout(); navigate('/auth') }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="page-content">
        {/* Header */}
        <header className="app-header">
          <div className="header-search">
            <Search size={15} className="search-icon" />
            <input placeholder="Search zones, sensors, reports..." />
          </div>
          <div className="header-actions">
            <button className="header-icon-btn" title="Notifications" onClick={() => navigate('/app/alerts')}>
              <Bell size={17} />
              <span className="notif-badge" />
            </button>
            <div className="header-profile" onClick={() => navigate('/app/settings')}>
              <div className="avatar">RK</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-800)', lineHeight: 1 }}>
                  Rajesh Kumar
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--gray-400)', fontWeight: 500 }}>
                  Farm Admin
                </span>
              </div>
              <ChevronDown size={14} color="var(--gray-400)" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="page-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
