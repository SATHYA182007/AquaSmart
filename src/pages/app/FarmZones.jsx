import { useState } from 'react'
import { Map, Droplets, Sprout, Thermometer, Activity, Plus, Edit2, Gauge } from 'lucide-react'

const zones = [
  {
    id: 'A', name: 'Zone A', crop: 'Paddy', size: '2.4 ha',
    source: 'Canal (Main)', moisture: 68, temp: 30,
    irrigStatus: 'Active', irrigMethod: 'Flood / Sprinkler',
    valve: 'V-01', sensor: 'SMS-A1, SMS-A2',
    notes: 'Recently transplanted. Maintain high moisture.', color: '#16a34a',
    health: 'good', lastIrrig: 'Today 6:15 AM', nextIrrig: 'Tomorrow 5:30 AM'
  },
  {
    id: 'B', name: 'Zone B', crop: 'Tomato', size: '1.8 ha',
    source: 'Borewell 1', moisture: 28, temp: 31,
    irrigStatus: 'Scheduled', irrigMethod: 'Drip Irrigation',
    valve: 'V-02', sensor: 'SMS-B1',
    notes: 'Flowering stage. Fertigation active.', color: '#0284c7',
    health: 'warning', lastIrrig: 'Today 6:00 AM', nextIrrig: 'Today 4:30 PM'
  },
  {
    id: 'C', name: 'Zone C', crop: 'Chilli', size: '1.2 ha',
    source: 'Borewell 2', moisture: 18, temp: 32,
    irrigStatus: 'Critical', irrigMethod: 'Drip Irrigation',
    valve: 'V-03', sensor: 'SMS-C1',
    notes: 'Moisture critically low. Salinity issue on Borewell 2.', color: '#dc2626',
    health: 'critical', lastIrrig: 'Yesterday', nextIrrig: 'Immediate'
  },
  {
    id: 'D', name: 'Zone D', crop: 'Groundnut', size: '3.1 ha',
    source: 'Canal (Main)', moisture: 54, temp: 29,
    irrigStatus: 'Idle', irrigMethod: 'Sprinkler',
    valve: 'V-04', sensor: 'SMS-D1, SMS-D2',
    notes: 'Pod formation stage. Next fertigation in 2 days.', color: '#f59e0b',
    health: 'good', lastIrrig: 'Yesterday', nextIrrig: 'Tomorrow 6:00 AM'
  },
]

const healthConfig = {
  good:     { label: 'Healthy', badgeClass: 'badge-success' },
  warning:  { label: 'Attention', badgeClass: 'badge-warning' },
  critical: { label: 'Critical', badgeClass: 'badge-danger' },
}

export default function FarmZones() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="section-title">Farm Zones</h1>
          <p className="section-subtitle">Manage field zones, crop assignments and irrigation coverage</p>
        </div>
        <button className="btn btn-primary btn-sm"><Plus size={15} /> Add Zone</button>
      </div>

      {/* Farm summary */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: 'Total Zones', value: '4', icon: Map, color: '#7c3aed', bg: '#ede9fe' },
          { label: 'Total Farm Area', value: '8.5 ha', icon: Activity, color: '#0284c7', bg: '#e0f2fe' },
          { label: 'Active Crops', value: '4', icon: Sprout, color: '#16a34a', bg: '#dcfce7' },
          { label: 'Avg. Moisture', value: '42%', icon: Droplets, color: '#059669', bg: '#d1fae5' },
        ].map(({ label, value, icon: Icon, color, bg }, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: bg, color }}><Icon size={18} /></div>
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Visual zone map */}
      <div className="card" style={{ marginBottom: 24, padding: 20 }}>
        <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--gray-800)', marginBottom: 4 }}>Farm Layout Overview</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 16 }}>Green Valley Farms · Raichur, Karnataka</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.5fr',
          gridTemplateRows: '1fr 1fr',
          gap: 12,
          minHeight: 220,
        }}>
          {zones.map((z) => (
            <div
              key={z.id}
              onClick={() => setSelected(selected === z.id ? null : z.id)}
              style={{
                background: z.health === 'critical' ? '#fff5f5' : z.health === 'warning' ? '#fffbeb' : '#f0fdf4',
                border: `2px solid ${selected === z.id ? z.color : z.health === 'critical' ? '#fecaca' : 'transparent'}`,
                borderRadius: 12,
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <span className={`badge ${healthConfig[z.health].badgeClass}`} style={{ fontSize: '0.68rem' }}>
                  {healthConfig[z.health].label}
                </span>
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: z.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                {z.id}
              </div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--gray-900)', marginBottom: 3 }}>{z.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray-600)', marginBottom: 10 }}>{z.crop} · {z.size}</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', align: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--gray-600)' }}>
                  <Droplets size={13} style={{ color: z.moisture < 30 ? '#ef4444' : '#0284c7', flexShrink: 0, marginTop: 1 }} />
                  {z.moisture}%
                </div>
                <div style={{ display: 'flex', align: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--gray-600)' }}>
                  <Thermometer size={13} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                  {z.temp}°C
                </div>
                <div style={{ fontSize: '0.78rem', color: z.color, fontWeight: 600 }}>{z.irrigStatus}</div>
              </div>
              <div className="progress-bar" style={{ marginTop: 10, height: 5 }}>
                <div className="progress-fill" style={{
                  width: `${z.moisture}%`,
                  background: z.moisture < 25 ? '#ef4444' : z.moisture < 40 ? '#f59e0b' : '#22c55e'
                }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 12, textAlign: 'center' }}>
          Click on a zone to select · Moisture shown on progress bar
        </div>
      </div>

      {/* Zone detail table */}
      <div className="chart-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div className="chart-title">Zone Details</div>
            <div className="chart-subtitle">Complete overview of all zones</div>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Zone</th>
              <th>Crop</th>
              <th>Area</th>
              <th>Water Source</th>
              <th>Method</th>
              <th>Moisture</th>
              <th>Next Irrigation</th>
              <th>Health</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: z.color, flexShrink: 0 }} />
                    <span style={{ fontWeight: 700 }}>{z.name}</span>
                  </div>
                </td>
                <td>{z.crop}</td>
                <td>{z.size}</td>
                <td style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{z.source}</td>
                <td style={{ fontSize: '0.8rem' }}>{z.irrigMethod}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 48, height: 5, background: 'var(--gray-100)', borderRadius: 999 }}>
                      <div style={{
                        height: '100%', width: `${z.moisture}%`,
                        background: z.moisture < 25 ? '#ef4444' : z.moisture < 40 ? '#f59e0b' : '#22c55e',
                        borderRadius: 999
                      }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{z.moisture}%</span>
                  </div>
                </td>
                <td style={{ fontSize: '0.8rem' }}>{z.nextIrrig}</td>
                <td>
                  <span className={`badge ${healthConfig[z.health].badgeClass}`}>
                    {healthConfig[z.health].label}
                  </span>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }}>
                    <Edit2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
