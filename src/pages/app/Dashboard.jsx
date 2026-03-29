import { useState } from 'react'
import {
  Droplets, Thermometer, Zap, AlertTriangle, TrendingUp,
  TrendingDown, Activity, CheckCircle2, Clock, Cpu,
  ArrowUpRight, MoreHorizontal, Gauge, FlaskConical
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const waterUsageData = [
  { day: 'Mon', usage: 1840, target: 2200 },
  { day: 'Tue', usage: 2100, target: 2200 },
  { day: 'Wed', usage: 1650, target: 2200 },
  { day: 'Thu', usage: 2480, target: 2200 },
  { day: 'Fri', usage: 1920, target: 2200 },
  { day: 'Sat', usage: 2260, target: 2200 },
  { day: 'Sun', usage: 1780, target: 2200 },
]

const moistureData = [
  { time: '06:00', ZoneA: 68, ZoneB: 42, ZoneC: 31 },
  { time: '09:00', ZoneA: 62, ZoneB: 39, ZoneC: 28 },
  { time: '12:00', ZoneA: 55, ZoneB: 33, ZoneC: 24 },
  { time: '15:00', ZoneA: 49, ZoneB: 28, ZoneC: 20 },
  { time: '18:00', ZoneA: 44, ZoneB: 25, ZoneC: 18 },
  { time: '21:00', ZoneA: 58, ZoneB: 36, ZoneC: 26 },
  { time: '00:00', ZoneA: 65, ZoneB: 42, ZoneC: 30 },
]

const qualityData = [
  { day: 'Mon', ph: 6.8, ec: 1.1 },
  { day: 'Tue', ph: 6.9, ec: 1.2 },
  { day: 'Wed', ph: 7.0, ec: 1.3 },
  { day: 'Thu', ph: 6.7, ec: 1.2 },
  { day: 'Fri', ph: 6.8, ec: 1.1 },
  { day: 'Sat', ph: 6.9, ec: 1.0 },
  { day: 'Sun', ph: 6.8, ec: 1.2 },
]

const recentActivity = [
  { icon: Droplets, color: '#0284c7', bg: '#e0f2fe', msg: 'Irrigation started in Zone A', sub: 'Drip system · 340 L/hr', time: '2 min ago' },
  { icon: FlaskConical, color: '#7c3aed', bg: '#ede9fe', msg: 'Water pH level updated', sub: 'Borewell 1 · pH: 6.8', time: '18 min ago' },
  { icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7', msg: 'Fertigation cycle completed', sub: 'Zone B · Tomato · NPK 19-19-19', time: '1 hr ago' },
  { icon: AlertTriangle, color: '#d97706', bg: '#fef3c7', msg: 'Low moisture alert triggered', sub: 'Zone C · Chilli · 18%', time: '2 hr ago' },
  { icon: Activity, color: '#ef4444', bg: '#fee2e2', msg: 'Pump overload warning cleared', sub: 'Pump 02 · Main Canal', time: '3 hr ago' },
]

const statCards = [
  {
    label: 'Soil Moisture',
    value: '42%',
    icon: Droplets,
    color: '#0284c7',
    bg: '#e0f2fe',
    change: '+3%',
    dir: 'up',
    sub: 'Zone B avg.',
    progress: 42,
    progressColor: '#0284c7',
  },
  {
    label: 'Water Quality',
    value: 'Good',
    icon: FlaskConical,
    color: '#16a34a',
    bg: '#dcfce7',
    change: 'Stable',
    dir: 'up',
    sub: 'pH 6.8 · EC 1.2',
    badge: 'Safe',
  },
  {
    label: 'Fertigation Status',
    value: 'Active',
    icon: Zap,
    color: '#7c3aed',
    bg: '#ede9fe',
    change: 'Running',
    dir: 'up',
    sub: 'Zone B · NPK 19-19-19',
    badge: 'Running',
    badgeColor: 'success',
  },
  {
    label: 'Pump Status',
    value: 'Running',
    icon: Gauge,
    color: '#0891b2',
    bg: '#cffafe',
    change: '2h 18m runtime',
    dir: 'up',
    sub: 'Pump 01 · 8.5 bar',
    badge: 'Online',
    badgeColor: 'success',
  },
  {
    label: 'Water Used Today',
    value: '2,480 L',
    icon: Droplets,
    color: '#059669',
    bg: '#d1fae5',
    change: '+12%',
    dir: 'up',
    sub: 'Target: 2,800 L',
    progress: 88,
    progressColor: '#059669',
  },
  {
    label: 'Active Alerts',
    value: '3',
    icon: AlertTriangle,
    color: '#d97706',
    bg: '#fef3c7',
    change: '2 warnings',
    dir: 'down',
    sub: '1 critical',
    badge: '3 Active',
    badgeColor: 'warning',
  },
  {
    label: 'Field Temperature',
    value: '31°C',
    icon: Thermometer,
    color: '#ef4444',
    bg: '#fee2e2',
    change: '+2°C from yesterday',
    dir: 'down',
    sub: 'Zone A · Paddy',
  },
  {
    label: 'Irrigation Efficiency',
    value: '87%',
    icon: TrendingUp,
    color: '#16a34a',
    bg: '#dcfce7',
    change: '+5% vs last week',
    dir: 'up',
    sub: 'Farm average',
    progress: 87,
    progressColor: '#16a34a',
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white', border: '1px solid var(--border)',
        borderRadius: 8, padding: '10px 14px', boxShadow: 'var(--shadow-md)',
        fontSize: '0.78rem'
      }}>
        <div style={{ fontWeight: 700, color: 'var(--gray-700)', marginBottom: 6 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: p.color }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
            <span style={{ color: 'var(--gray-600)' }}>{p.name}:</span>
            <span style={{ fontWeight: 700 }}>{p.value}{p.name === 'ph' ? '' : p.name === 'ec' ? ' mS/cm' : ' L'}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 16 }}>
        <div>
          <h1 className="section-title">Farm Overview</h1>
          <p className="section-subtitle">Green Valley Farms · Raichur, Karnataka · Last updated: 3 min ago</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <span className="badge badge-success">
            <span className="status-dot active" style={{ animation: 'pulse-green 2s infinite' }} />
            Live Data
          </span>
          <button className="btn btn-secondary btn-sm">
            <MoreHorizontal size={15} /> More
          </button>
        </div>
      </div>

      {/* AI Insight */}
      <div className="ai-insight-card" style={{ marginBottom: 24 }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Cpu size={16} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              AI Insight
            </span>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>
            Zone B requires irrigation in 45 minutes based on moisture and weather forecast conditions.
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Soil moisture at 28% · Heat stress index high · Next rainfall: 38+ hours away
          </div>
          <button className="btn btn-sm" style={{ marginTop: 12, background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(4px)' }}>
            Apply Suggestion
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stats-grid" style={{ marginBottom: 28 }}>
        {statCards.map(({ label, value, icon: Icon, color, bg, change, dir, sub, progress, progressColor, badge, badgeColor }, i) => (
          <div className="stat-card" key={i}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div className="stat-icon" style={{ background: bg, color }}>
                <Icon size={18} />
              </div>
              {badge && (
                <span className={`badge badge-${badgeColor || 'neutral'}`} style={{ fontSize: '0.7rem' }}>{badge}</span>
              )}
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
            {sub && <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: 2 }}>{sub}</div>}
            {progress !== undefined && (
              <div className="progress-bar" style={{ marginTop: 10 }}>
                <div className="progress-fill" style={{ width: `${progress}%`, background: progressColor }} />
              </div>
            )}
            <div className={`stat-change ${dir}`}>
              {dir === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20, marginBottom: 20 }}>
        {/* Water Usage */}
        <div className="chart-container">
          <div className="chart-title">Weekly Water Usage</div>
          <div className="chart-subtitle">Actual vs Target (Liters)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={waterUsageData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.75rem' }} />
              <Bar dataKey="usage" name="Actual" fill="#22c55e" radius={[4,4,0,0]} />
              <Bar dataKey="target" name="Target" fill="#e5e7eb" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Water Quality Trend */}
        <div className="chart-container">
          <div className="chart-title">Water Quality Trend</div>
          <div className="chart-subtitle">pH and EC (7 days)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={qualityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.75rem' }} />
              <Line dataKey="ph" name="pH" stroke="#7c3aed" strokeWidth={2} dot={false} />
              <Line dataKey="ec" name="EC" stroke="#0891b2" strokeWidth={2} dot={false} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 20, marginBottom: 20 }}>
        {/* Soil Moisture */}
        <div className="chart-container">
          <div className="chart-title">Soil Moisture by Zone</div>
          <div className="chart-subtitle">Today (% volumetric)</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={moistureData}>
              <defs>
                <linearGradient id="za" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="zb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="zc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="ZoneA" stroke="#22c55e" fill="url(#za)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="ZoneB" stroke="#0891b2" fill="url(#zb)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="ZoneC" stroke="#f59e0b" fill="url(#zc)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="chart-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div className="chart-title">Recent Activity</div>
              <div className="chart-subtitle">Farm events and system logs</div>
            </div>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentActivity.map(({ icon: Icon, color, bg, msg, sub, time }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: bg, color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.8375rem', fontWeight: 600, color: 'var(--gray-800)', lineHeight: 1.3 }}>{msg}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 2 }}>{sub}</div>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
