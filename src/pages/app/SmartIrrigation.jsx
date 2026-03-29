import { useState } from 'react'
import {
  Droplets, PlayCircle, PauseCircle, Clock, Gauge,
  Plus, Calendar, Settings2, ToggleRight, Zap, CheckCircle2, AlertTriangle
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const zones = [
  {
    id: 'A', name: 'Zone A', crop: 'Paddy', status: 'active',
    moisture: 68, threshold: 60, valve: 'V-01', flow: '340 L/hr',
    nextSched: 'Tomorrow 5:30 AM', pumpId: 'P-01', source: 'Canal',
    duration: '45 min', started: '6:15 AM', runtimeToday: '1h 45m'
  },
  {
    id: 'B', name: 'Zone B', crop: 'Tomato', status: 'scheduled',
    moisture: 28, threshold: 35, valve: 'V-02', flow: '—',
    nextSched: 'Today 4:30 PM', pumpId: 'P-01', source: 'Borewell 1',
    duration: '30 min', started: '—', runtimeToday: '0h 33m'
  },
  {
    id: 'C', name: 'Zone C', crop: 'Chilli', status: 'warning',
    moisture: 18, threshold: 30, valve: 'V-03', flow: '—',
    nextSched: 'Immediate', pumpId: 'P-02', source: 'Borewell 2',
    duration: '20 min', started: '—', runtimeToday: '0h 28m'
  },
  {
    id: 'D', name: 'Zone D', crop: 'Groundnut', status: 'idle',
    moisture: 54, threshold: 40, valve: 'V-04', flow: '—',
    nextSched: 'Tomorrow 6:00 AM', pumpId: 'P-02', source: 'Canal',
    duration: '25 min', started: '—', runtimeToday: '0h 45m'
  },
]

const schedules = [
  { zone: 'Zone A', crop: 'Paddy', day: 'Mon, Wed, Fri', time: '5:30 AM', dur: '45 min', status: 'active' },
  { zone: 'Zone B', crop: 'Tomato', day: 'Daily', time: '4:30 PM', dur: '30 min', status: 'active' },
  { zone: 'Zone C', crop: 'Chilli', day: 'Tue, Thu, Sat', time: '6:00 AM', dur: '20 min', status: 'paused' },
  { zone: 'Zone D', crop: 'Groundnut', day: 'Mon, Thu', time: '6:00 AM', dur: '25 min', status: 'active' },
]

const efficiencyData = [
  { zone: 'Zone A', efficiency: 92 },
  { zone: 'Zone B', efficiency: 84 },
  { zone: 'Zone C', efficiency: 71 },
  { zone: 'Zone D', efficiency: 88 },
]

const statusConfig = {
  active:    { label: 'Irrigating', color: '#16a34a', bg: '#dcfce7', dot: 'active' },
  scheduled: { label: 'Scheduled', color: '#0284c7', bg: '#e0f2fe', dot: 'idle' },
  warning:   { label: 'Low Moisture', color: '#d97706', bg: '#fef3c7', dot: 'warning' },
  idle:      { label: 'Idle', color: '#6b7280', bg: '#f3f4f6', dot: 'idle' },
}

export default function SmartIrrigation() {
  const [activeZones, setActiveZones] = useState({ B: false, C: false, D: false })
  const [autoMode, setAutoMode] = useState(true)

  const toggle = (id) => setActiveZones(p => ({ ...p, [id]: !p[id] }))

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="section-title">Smart Irrigation</h1>
          <p className="section-subtitle">Zone control, scheduling and automation for Green Valley Farms</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'var(--green-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-200)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--green-700)' }}>Auto Mode</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={autoMode} onChange={() => setAutoMode(v => !v)} />
              <span className="toggle-slider" />
            </label>
          </div>
          <button className="btn btn-primary btn-sm"><Plus size={15} /> Add Schedule</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: 'Zones Active', value: '1 / 4', icon: Droplets, color: '#16a34a', bg: '#dcfce7' },
          { label: 'Pump Runtime Today', value: '2h 18m', icon: Gauge, color: '#0284c7', bg: '#e0f2fe' },
          { label: 'Irrigation Efficiency', value: '89%', icon: Zap, color: '#7c3aed', bg: '#ede9fe' },
          { label: 'Total Flow Today', value: '2,480 L', icon: Droplets, color: '#059669', bg: '#d1fae5' },
        ].map(({ label, value, icon: Icon, color, bg }, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: bg, color }}><Icon size={18} /></div>
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Zone Cards */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gray-800)' }}>Zone Control</h2>
          <span className="badge badge-neutral">4 Zones</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {zones.map((z) => {
            const sc = statusConfig[z.status]
            const isActive = z.status === 'active' || activeZones[z.id]
            return (
              <div key={z.id} className="card" style={{ borderLeft: `4px solid ${sc.color}`, padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gray-900)' }}>{z.name}</span>
                      <span className="badge" style={{ background: sc.bg, color: sc.color }}>
                        <span className={`status-dot ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                      {z.crop} · {z.source}
                    </div>
                  </div>
                  <button
                    className={`btn btn-sm ${isActive ? 'btn-danger' : 'btn-primary'}`}
                    onClick={() => toggle(z.id)}
                    style={{ gap: 6 }}
                  >
                    {isActive
                      ? <><PauseCircle size={14} /> Stop</>
                      : <><PlayCircle size={14} /> Start</>
                    }
                  </button>
                </div>

                {/* Moisture indicator */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)' }}>Soil Moisture</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: z.moisture < z.threshold ? '#d97706' : 'var(--green-700)' }}>
                      {z.moisture}% <span style={{ fontWeight: 400, color: 'var(--gray-400)', fontSize: '0.75rem' }}>(threshold: {z.threshold}%)</span>
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{
                      width: `${z.moisture}%`,
                      background: z.moisture < z.threshold ? '#f59e0b' : 'var(--green-500)'
                    }} />
                  </div>
                  {z.moisture < z.threshold && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: '0.72rem', color: '#d97706' }}>
                      <AlertTriangle size={11} /> Below threshold – irrigation recommended
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {[
                    { label: 'Valve', value: z.valve },
                    { label: 'Pump', value: z.pumpId },
                    { label: 'Runtime Today', value: z.runtimeToday },
                    { label: 'Duration', value: z.duration },
                    { label: 'Flow Rate', value: z.flow },
                    { label: 'Next Schedule', value: z.nextSched },
                  ].map(({ label, value }, j) => (
                    <div key={j} style={{ background: 'var(--gray-50)', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--gray-800)' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Efficiency + Schedule */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        {/* Efficiency chart */}
        <div className="chart-container">
          <div className="chart-title">Irrigation Efficiency</div>
          <div className="chart-subtitle">By zone (%)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={efficiencyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="zone" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={56} />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#22c55e" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Schedule table */}
        <div className="chart-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div className="chart-title">Irrigation Schedules</div>
              <div className="chart-subtitle">Automated daily/weekly plans</div>
            </div>
            <button className="btn btn-secondary btn-sm"><Calendar size={14} /> Calendar View</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Crop</th>
                <th>Days</th>
                <th>Start Time</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(({ zone, crop, day, time, dur, status }, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{zone}</td>
                  <td>{crop}</td>
                  <td style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{day}</td>
                  <td>{time}</td>
                  <td>{dur}</td>
                  <td>
                    <span className={`badge badge-${status === 'active' ? 'success' : 'warning'}`}>
                      {status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
