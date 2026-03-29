import { useState } from 'react'
import { Sprout, Zap, Clock, Plus, CheckCircle2, AlertTriangle, BarChart3 } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

const cycles = [
  {
    zone: 'Zone B', crop: 'Tomato', stage: 'Flowering',
    status: 'running', npk: '19-19-19', dosage: '3.4 kg',
    next: 'Tomorrow 6:00 AM', lastCycle: 'Today 6:00 AM', freq: 'Daily',
    n: 19, p: 19, k: 19
  },
  {
    zone: 'Zone A', crop: 'Paddy', stage: 'Vegetative',
    status: 'scheduled', npk: '28-14-14', dosage: '2.8 kg',
    next: 'Today 5:30 PM', lastCycle: 'Yesterday', freq: 'Every 2 days',
    n: 28, p: 14, k: 14
  },
  {
    zone: 'Zone C', crop: 'Chilli', stage: 'Fruiting',
    status: 'paused', npk: '12-32-16', dosage: '2.1 kg',
    next: 'On hold', lastCycle: '3 days ago', freq: 'Every 3 days',
    n: 12, p: 32, k: 16
  },
  {
    zone: 'Zone D', crop: 'Groundnut', stage: 'Pod Formation',
    status: 'idle', npk: '10-26-26', dosage: '3.0 kg',
    next: 'Tomorrow 6:00 AM', lastCycle: '2 days ago', freq: 'Every 2 days',
    n: 10, p: 26, k: 26
  },
]

const historyData = [
  { date: 'Mar 22', ZoneA: 2.4, ZoneB: 3.1, ZoneC: 2.0, ZoneD: 2.8 },
  { date: 'Mar 23', ZoneA: 0 , ZoneB: 3.2, ZoneC: 0, ZoneD: 0 },
  { date: 'Mar 24', ZoneA: 2.5, ZoneB: 3.3, ZoneC: 2.1, ZoneD: 2.9 },
  { date: 'Mar 25', ZoneA: 0, ZoneB: 3.4, ZoneC: 0, ZoneD: 0 },
  { date: 'Mar 26', ZoneA: 2.6, ZoneB: 3.5, ZoneC: 0, ZoneD: 3.0 },
  { date: 'Mar 27', ZoneA: 0, ZoneB: 3.4, ZoneC: 0, ZoneD: 0 },
  { date: 'Mar 28', ZoneA: 2.8, ZoneB: 3.4, ZoneC: 0, ZoneD: 3.0 },
]

const npkPie = [
  { name: 'Nitrogen (N)', value: 38 },
  { name: 'Phosphorus (P)', value: 32 },
  { name: 'Potassium (K)', value: 30 },
]
const PIE_COLORS = ['#22c55e', '#7c3aed', '#f59e0b']

const statusConfig = {
  running:   { label: 'Running', badgeClass: 'badge-success' },
  scheduled: { label: 'Scheduled', badgeClass: 'badge-info' },
  paused:    { label: 'Paused', badgeClass: 'badge-warning' },
  idle:      { label: 'Idle', badgeClass: 'badge-neutral' },
}

export default function Fertigation() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="section-title">Fertigation Management</h1>
          <p className="section-subtitle">Precision nutrient delivery through irrigation lines</p>
        </div>
        <button className="btn btn-primary btn-sm"><Plus size={15} /> New Fertigation Plan</button>
      </div>

      {/* Active status card */}
      <div className="ai-insight-card" style={{ marginBottom: 24 }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Zap size={16} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Active Cycle
            </span>
          </div>
          <div style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: 4 }}>
            Zone B · Tomato Fertigation Running — NPK 19-19-19 · 3.4 kg dosage
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Growth Stage: Flowering · Cycle started at 6:00 AM · Estimated completion: 7:15 AM
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: 'Dosage Today', value: '11.2 kg', icon: Sprout, color: '#16a34a', bg: '#dcfce7' },
          { label: 'Cycles Today', value: '2 / 4', icon: Zap, color: '#7c3aed', bg: '#ede9fe' },
          { label: 'Next Cycle', value: '5:30 PM', icon: Clock, color: '#0284c7', bg: '#e0f2fe' },
          { label: 'Fertilizer Stock', value: '48 kg', icon: BarChart3, color: '#059669', bg: '#d1fae5' },
        ].map(({ label, value, icon: Icon, color, bg }, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: bg, color }}><Icon size={18} /></div>
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Cycle cards */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gray-800)', marginBottom: 14 }}>
          Zone Fertigation Plans
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {cycles.map((c, i) => {
            const sc = statusConfig[c.status]
            return (
              <div key={i} className="card" style={{
                padding: 20,
                border: c.status === 'running' ? '1.5px solid var(--green-400)' : '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--gray-900)' }}>{c.zone}</span>
                      <span className={`badge ${sc.badgeClass}`}>{sc.label}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: 2 }}>{c.crop} · {c.stage}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--green-700)' }}>{c.npk}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)' }}>NPK Ratio</div>
                  </div>
                </div>

                {/* NPK bar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginBottom: 6, fontWeight: 600 }}>NPK Distribution</div>
                  <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 8 }}>
                    <div style={{ width: `${c.n / (c.n+c.p+c.k) * 100}%`, background: '#22c55e' }} />
                    <div style={{ width: `${c.p / (c.n+c.p+c.k) * 100}%`, background: '#7c3aed' }} />
                    <div style={{ width: `${c.k / (c.n+c.p+c.k) * 100}%`, background: '#f59e0b' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 5, fontSize: '0.7rem', color: 'var(--gray-500)' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>N: {c.n}%</span>
                    <span style={{ color: '#7c3aed', fontWeight: 700 }}>P: {c.p}%</span>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>K: {c.k}%</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {[
                    { l: 'Dosage', v: c.dosage },
                    { l: 'Frequency', v: c.freq },
                    { l: 'Last Cycle', v: c.lastCycle },
                    { l: 'Next Cycle', v: c.next },
                  ].map(({ l, v }, j) => (
                    <div key={j} style={{ background: 'var(--gray-50)', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{l}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-800)' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20 }}>
        <div className="chart-container">
          <div className="chart-title">Fertilizer Usage (7 Days)</div>
          <div className="chart-subtitle">kg per zone per day</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.75rem' }} />
              <Bar dataKey="ZoneA" name="Zone A" fill="#22c55e" radius={[3,3,0,0]} />
              <Bar dataKey="ZoneB" name="Zone B" fill="#7c3aed" radius={[3,3,0,0]} />
              <Bar dataKey="ZoneC" name="Zone C" fill="#f59e0b" radius={[3,3,0,0]} />
              <Bar dataKey="ZoneD" name="Zone D" fill="#0891b2" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-title">NPK Distribution Today</div>
          <div className="chart-subtitle">Farm-wide nutrient split</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={npkPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                {npkPie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: '0.75rem' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
