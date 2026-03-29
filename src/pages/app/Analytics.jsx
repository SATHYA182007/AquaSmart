import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, Droplets, Sprout, Zap, Target } from 'lucide-react'

const monthlyWater = [
  { month: 'Oct', used: 42000, target: 48000 },
  { month: 'Nov', used: 38500, target: 44000 },
  { month: 'Dec', used: 29000, target: 36000 },
  { month: 'Jan', used: 32000, target: 38000 },
  { month: 'Feb', used: 36000, target: 42000 },
  { month: 'Mar', used: 16200, target: 20000 },
]

const efficiencyMonthly = [
  { month: 'Oct', efficiency: 78 },
  { month: 'Nov', efficiency: 81 },
  { month: 'Dec', efficiency: 76 },
  { month: 'Jan', efficiency: 83 },
  { month: 'Feb', efficiency: 85 },
  { month: 'Mar', efficiency: 89 },
]

const fertilizerMonthly = [
  { month: 'Oct', N: 48, P: 36, K: 42 },
  { month: 'Nov', N: 52, P: 38, K: 44 },
  { month: 'Dec', N: 38, P: 28, K: 32 },
  { month: 'Jan', N: 42, P: 31, K: 36 },
  { month: 'Feb', N: 55, P: 40, K: 48 },
  { month: 'Mar', N: 28, P: 20, K: 24 },
]

const zonePerformance = [
  { zone: 'Zone A', efficiency: 92, waterSaved: 18, moisture: 68 },
  { zone: 'Zone B', efficiency: 84, waterSaved: 22, moisture: 28 },
  { zone: 'Zone C', efficiency: 71, waterSaved: 8, moisture: 18 },
  { zone: 'Zone D', efficiency: 88, waterSaved: 14, moisture: 54 },
]

const qualityMonthly = [
  { month: 'Oct', ph: 6.9, ec: 1.1 },
  { month: 'Nov', ph: 7.0, ec: 1.2 },
  { month: 'Dec', ph: 6.8, ec: 1.1 },
  { month: 'Jan', ph: 6.9, ec: 1.3 },
  { month: 'Feb', ph: 7.1, ec: 1.2 },
  { month: 'Mar', ph: 6.8, ec: 1.2 },
]

const kpis = [
  { label: 'Water Saved This Season', value: '18,400 L', icon: Droplets, color: '#0284c7', bg: '#e0f2fe', change: '↑ 14% vs last season' },
  { label: 'Avg. Irrigation Efficiency', value: '87%', icon: Zap, color: '#16a34a', bg: '#dcfce7', change: '↑ 5% vs last month' },
  { label: 'Fertilizer Utilized', value: '264 kg', icon: Sprout, color: '#7c3aed', bg: '#ede9fe', change: '↓ 8% waste reduced' },
  { label: 'Sustainability Score', value: '82 / 100', icon: Target, color: '#059669', bg: '#d1fae5', change: '↑ 6 pts this quarter' },
]

export default function Analytics() {
  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 className="section-title">Analytics & Insights</h1>
        <p className="section-subtitle">Performance metrics, trends and sustainability analytics</p>
      </div>

      {/* KPI cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {kpis.map(({ label, value, icon: Icon, color, bg, change }, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: bg, color }}><Icon size={18} /></div>
            <div className="stat-value" style={{ fontSize: '1.375rem' }}>{value}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-change up" style={{ marginTop: 8, fontSize: '0.72rem' }}>
              <TrendingUp size={11} /> {change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20, marginBottom: 20 }}>
        <div className="chart-container">
          <div className="chart-title">Monthly Water Usage</div>
          <div className="chart-subtitle">Used vs Target (Liters) – Last 6 months</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyWater}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.75rem' }} />
              <Bar dataKey="used" name="Water Used" fill="#22c55e" radius={[4,4,0,0]} />
              <Bar dataKey="target" name="Target" fill="#e5e7eb" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-title">Irrigation Efficiency Trend</div>
          <div className="chart-subtitle">Monthly average (%)</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={efficiencyMonthly}>
              <defs>
                <linearGradient id="eff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="efficiency" name="Efficiency" stroke="#22c55e" fill="url(#eff)" strokeWidth={2.5} dot={{ r: 3, fill: '#22c55e' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 20, marginBottom: 20 }}>
        <div className="chart-container">
          <div className="chart-title">Water Quality Trend</div>
          <div className="chart-subtitle">pH & EC monthly avg</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={qualityMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.75rem' }} />
              <Line dataKey="ph" name="pH" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
              <Line dataKey="ec" name="EC" stroke="#0891b2" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-title">Fertilizer Usage by Nutrient</div>
          <div className="chart-subtitle">Monthly NPK breakdown (kg)</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={fertilizerMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.75rem' }} />
              <Bar dataKey="N" name="Nitrogen" fill="#22c55e" radius={[3,3,0,0]} stackId="a" />
              <Bar dataKey="P" name="Phosphorus" fill="#7c3aed" radius={[0,0,0,0]} stackId="a" />
              <Bar dataKey="K" name="Potassium" fill="#f59e0b" radius={[3,3,0,0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Zone performance table */}
      <div className="chart-container">
        <div className="chart-title" style={{ marginBottom: 4 }}>Zone Performance Comparison</div>
        <div className="chart-subtitle" style={{ marginBottom: 16 }}>This month's zone-level metrics</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Zone</th>
              <th>Irrigation Efficiency</th>
              <th>Water Saved vs Plan</th>
              <th>Current Moisture</th>
            </tr>
          </thead>
          <tbody>
            {zonePerformance.map(({ zone, efficiency, waterSaved, moisture }, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{zone}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 100, height: 6, background: 'var(--gray-100)', borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${efficiency}%`, background: efficiency >= 85 ? '#22c55e' : efficiency >= 75 ? '#f59e0b' : '#ef4444', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{efficiency}%</span>
                  </div>
                </td>
                <td style={{ fontWeight: 600, color: '#16a34a' }}>+{waterSaved}%</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 5, background: 'var(--gray-100)', borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${moisture}%`, background: moisture < 25 ? '#ef4444' : moisture < 40 ? '#f59e0b' : '#22c55e', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{moisture}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
