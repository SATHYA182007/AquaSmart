import { useState } from 'react'
import {
  Bell, AlertTriangle, Droplets, FlaskConical, Gauge,
  Sprout, CloudRain, CheckCircle2, X, Filter
} from 'lucide-react'

const alerts = [
  {
    id: 1, type: 'critical', icon: Droplets, color: '#dc2626', bg: '#fee2e2',
    title: 'Critical: Low Soil Moisture in Zone C',
    body: 'Soil moisture at 18% — below critical threshold of 25% for chilli crop. Immediate irrigation required to prevent crop stress.',
    source: 'Sensor SMS-C1 · Zone C', time: '5 min ago', date: '29 Mar 2025',
    action: 'Irrigate Now', resolved: false
  },
  {
    id: 2, type: 'warning', icon: FlaskConical, color: '#d97706', bg: '#fef3c7',
    title: 'High Salinity Detected – Borewell 2',
    body: 'EC reading: 2.1 mS/cm. Exceeds recommended 1.5 mS/cm for tomato and chilli. Avoid using Borewell 2 for fertigation until levels normalize.',
    source: 'Water Quality Sensor WS-02', time: '1 hr ago', date: '29 Mar 2025',
    action: 'View Source', resolved: false
  },
  {
    id: 3, type: 'warning', icon: Gauge, color: '#d97706', bg: '#fef3c7',
    title: 'Pump 02 – Pressure Drop Detected',
    body: 'Pump 02 pressure dropped from 8.5 to 6.2 bar. May indicate a blockage or pipe leak in Zone C distribution line.',
    source: 'Pump Sensor PS-02 · Main Pipeline', time: '2 hr ago', date: '29 Mar 2025',
    action: 'Check Pump', resolved: false
  },
  {
    id: 4, type: 'info', icon: CloudRain, color: '#0284c7', bg: '#e0f2fe',
    title: 'Rainfall Forecast: 68% Probability (4–8 PM)',
    body: 'Weather model predicts moderate rainfall this evening. Consider postponing scheduled fertigation in Zone A to avoid nutrient leaching.',
    source: 'Weather Integration · IMD API', time: '3 hr ago', date: '29 Mar 2025',
    action: 'Reschedule', resolved: false
  },
  {
    id: 5, type: 'warning', icon: Sprout, color: '#d97706', bg: '#fef3c7',
    title: 'Fertigation Skipped – Zone C',
    body: 'Scheduled fertigation at 6:00 AM for Zone C was skipped due to active water quality alert. Nutrients were not delivered.',
    source: 'Fertigation Controller FC-03', time: '8 hr ago', date: '29 Mar 2025',
    action: 'Reschedule', resolved: false
  },
  {
    id: 6, type: 'success', icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7',
    title: 'Irrigation Completed – Zone A',
    body: 'Zone A irrigation cycle completed successfully. 620 L delivered over 45 minutes. Soil moisture now at 68%.',
    source: 'Irrigation Controller IC-01 · Zone A', time: '6 hr ago', date: '29 Mar 2025',
    action: 'View Log', resolved: true
  },
  {
    id: 7, type: 'info', icon: FlaskConical, color: '#0284c7', bg: '#e0f2fe',
    title: 'Water Quality Report – Weekly Summary',
    body: 'Automated weekly water quality report generated. Borewell 1 remains within safe parameters. Full report available for download.',
    source: 'Quality Monitor QM-01', time: '1 day ago', date: '28 Mar 2025',
    action: 'Download Report', resolved: true
  },
]

const typeConfig = {
  critical: { label: 'Critical', badgeClass: 'badge-danger', borderColor: '#fecaca' },
  warning:  { label: 'Warning', badgeClass: 'badge-warning', borderColor: '#fde68a' },
  info:     { label: 'Info', badgeClass: 'badge-info', borderColor: '#bfdbfe' },
  success:  { label: 'Resolved', badgeClass: 'badge-success', borderColor: 'var(--green-200)' },
}

export default function Alerts() {
  const [filter, setFilter] = useState('all')
  const [dismissed, setDismissed] = useState({})

  const visible = alerts
    .filter(a => !dismissed[a.id])
    .filter(a => filter === 'all' || a.type === filter || (filter === 'unresolved' && !a.resolved))

  const counts = {
    all: alerts.length,
    critical: alerts.filter(a => a.type === 'critical').length,
    warning: alerts.filter(a => a.type === 'warning').length,
    unresolved: alerts.filter(a => !a.resolved).length,
  }

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="section-title">Alerts & Notifications</h1>
          <p className="section-subtitle">System events, warnings and farm notifications</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-danger">
            <Bell size={12} /> 3 Unresolved
          </span>
          <button className="btn btn-secondary btn-sm"><CheckCircle2 size={14} /> Mark All Read</button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        {[
          { label: 'Total Alerts', value: alerts.length, color: 'var(--gray-700)', bg: 'var(--gray-100)', icon: Bell },
          { label: 'Critical', value: counts.critical, color: '#dc2626', bg: '#fee2e2', icon: AlertTriangle },
          { label: 'Warnings', value: counts.warning, color: '#d97706', bg: '#fef3c7', icon: AlertTriangle },
          { label: 'Unresolved', value: counts.unresolved, color: '#0284c7', bg: '#e0f2fe', icon: AlertTriangle },
        ].map(({ label, value, color, bg, icon: Icon }, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: bg, color }}><Icon size={18} /></div>
            <div className="stat-value" style={{ fontSize: '1.5rem', color }}>{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: `All (${counts.all})` },
          { key: 'critical', label: `Critical (${counts.critical})` },
          { key: 'warning', label: `Warnings (${counts.warning})` },
          { key: 'unresolved', label: `Unresolved (${counts.unresolved})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`btn btn-sm ${filter === key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {visible.map((alert) => {
          const tc = typeConfig[alert.type]
          const Icon = alert.icon
          return (
            <div key={alert.id} style={{
              background: 'var(--white)',
              border: `1px solid ${tc.borderColor}`,
              borderRadius: 'var(--radius-lg)',
              padding: '16px 18px',
              display: 'flex',
              gap: 14,
              opacity: alert.resolved ? 0.75 : 1,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: alert.bg, color: alert.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={18} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-900)' }}>{alert.title}</span>
                    <span className={`badge ${tc.badgeClass}`} style={{ fontSize: '0.68rem' }}>{tc.label}</span>
                  </div>
                  <button
                    onClick={() => setDismissed(p => ({ ...p, [alert.id]: true }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', flexShrink: 0, padding: 2 }}
                    title="Dismiss"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--gray-600)', lineHeight: 1.6, margin: '0 0 10px' }}>
                  {alert.body}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--gray-500)' }}>{alert.source}</span>
                    {' · '}
                    {alert.date}
                    {' · '}
                    {alert.time}
                  </div>
                  <button className={`btn btn-sm ${alert.resolved ? 'btn-ghost' : 'btn-secondary'}`}>
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {visible.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          color: 'var(--gray-400)', fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={36} style={{ color: 'var(--green-300)', marginBottom: 10 }} />
          <div style={{ fontWeight: 600 }}>No alerts matching this filter</div>
        </div>
      )}
    </div>
  )
}
