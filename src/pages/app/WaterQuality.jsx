import {
  FlaskConical, Thermometer, Activity, AlertTriangle,
  CheckCircle2, TrendingUp, Info, RefreshCw
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from 'recharts'

const sources = [
  { name: 'Borewell 1', ph: 6.8, tds: 420, ec: 1.2, turbidity: 3.1, temp: 24, status: 'safe' },
  { name: 'Borewell 2', ph: 7.4, tds: 680, ec: 2.1, turbidity: 5.8, temp: 26, status: 'warning' },
  { name: 'Canal (Main)', ph: 7.0, tds: 310, ec: 0.9, turbidity: 8.4, temp: 28, status: 'warning' },
  { name: 'Rainwater Tank', ph: 6.5, tds: 80, ec: 0.2, turbidity: 1.2, temp: 22, status: 'safe' },
]

const trendData = [
  { date: 'Mar 22', ph: 6.6, ec: 1.1, tds: 390 },
  { date: 'Mar 23', ph: 6.8, ec: 1.2, tds: 410 },
  { date: 'Mar 24', ph: 6.9, ec: 1.3, tds: 440 },
  { date: 'Mar 25', ph: 7.1, ec: 1.2, tds: 420 },
  { date: 'Mar 26', ph: 7.0, ec: 1.1, tds: 400 },
  { date: 'Mar 27', ph: 6.8, ec: 1.2, tds: 425 },
  { date: 'Mar 28', ph: 6.8, ec: 1.2, tds: 420 },
]

const metrics = [
  {
    label: 'pH Level', value: '6.8', unit: '', ideal: '6.5 – 7.0', status: 'safe',
    icon: FlaskConical, color: '#7c3aed', bg: '#ede9fe',
    desc: 'Optimal range for most crops'
  },
  {
    label: 'TDS', value: '420', unit: 'ppm', ideal: '< 500 ppm', status: 'safe',
    icon: Activity, color: '#0284c7', bg: '#e0f2fe',
    desc: 'Within safe irrigation limits'
  },
  {
    label: 'EC (Conductivity)', value: '1.2', unit: 'mS/cm', ideal: '0.5 – 1.5', status: 'safe',
    icon: TrendingUp, color: '#16a34a', bg: '#dcfce7',
    desc: 'Suitable for all crops'
  },
  {
    label: 'Turbidity', value: '3.1', unit: 'NTU', ideal: '< 5 NTU', status: 'safe',
    icon: FlaskConical, color: '#059669', bg: '#d1fae5',
    desc: 'Clear water, no filtration needed'
  },
  {
    label: 'Water Temperature', value: '24', unit: '°C', ideal: '18 – 28°C', status: 'safe',
    icon: Thermometer, color: '#0891b2', bg: '#cffafe',
    desc: 'Normal for drip irrigation'
  },
  {
    label: 'Salinity (SAR)', value: '2.1', unit: '', ideal: '< 3.0', status: 'safe',
    icon: AlertTriangle, color: '#d97706', bg: '#fef3c7',
    desc: 'Monitor closely for sensitive crops'
  },
]

export default function WaterQuality() {
  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="section-title">Water Quality Monitoring</h1>
          <p className="section-subtitle">Real-time quality parameters across all water sources</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-success">
            <span className="status-dot active" />
            Live Sensors
          </span>
          <button className="btn btn-secondary btn-sm"><RefreshCw size={14} /> Refresh</button>
        </div>
      </div>

      {/* Overall status banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: '#f0fdf4', border: '1px solid var(--green-200)',
        borderRadius: 'var(--radius-lg)', padding: '14px 20px', marginBottom: 24
      }}>
        <CheckCircle2 size={20} color="var(--green-600)" />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: 'var(--green-800)', fontSize: '0.9375rem' }}>
            Primary source (Borewell 1) – Safe for irrigation
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--green-600)', marginTop: 2 }}>
            Water quality has been stable for the last 7 days · Next scheduled test: Tomorrow 6:00 AM
          </div>
        </div>
        <button className="btn btn-secondary btn-sm">View Report</button>
      </div>

      {/* Alert banner */}
      <div className="alert-card warning" style={{ marginBottom: 24 }}>
        <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 700, color: '#92400e', fontSize: '0.875rem' }}>
            Salinity level in Borewell 2 is above recommended range
          </div>
          <div style={{ fontSize: '0.8rem', color: '#b45309', marginTop: 2 }}>
            EC reading: 2.1 mS/cm (recommended: &lt; 1.5 mS/cm for tomato). Avoid using Borewell 2 for Zone B fertigation until levels normalize.
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {metrics.map(({ label, value, unit, ideal, status, icon: Icon, color, bg, desc }, i) => (
          <div key={i} className="card" style={{ borderTop: `3px solid ${color}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={17} />
              </div>
              <span className={`badge badge-${status === 'safe' ? 'success' : 'warning'}`}>
                {status === 'safe' ? '✓ Safe' : '⚠ Watch'}
              </span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {value}<span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gray-400)', marginLeft: 4 }}>{unit}</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-700)', margin: '6px 0 3px' }}>{label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Ideal: {ideal}</div>
            <div style={{ fontSize: '0.75rem', color, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Info size={11} /> {desc}
            </div>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20, marginBottom: 28 }}>
        <div className="chart-container">
          <div className="chart-title">7-Day Quality Trend – Borewell 1</div>
          <div className="chart-subtitle">pH, EC (mS/cm), and TDS (ppm ÷ 100)</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.75rem' }} />
              <ReferenceLine y={7.0} stroke="#f59e0b" strokeDasharray="4 3" label={{ value: 'pH max', fontSize: 10, fill: '#f59e0b' }} />
              <Line dataKey="ph" name="pH" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
              <Line dataKey="ec" name="EC" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Source comparison table */}
        <div className="chart-container">
          <div className="chart-title">Source-wise Quality Summary</div>
          <div className="chart-subtitle">All water sources</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {sources.map(({ name, ph, tds, ec, turbidity, temp, status }, i) => (
              <div key={i} style={{
                background: 'var(--gray-50)', borderRadius: 10,
                padding: '12px 14px',
                border: `1px solid ${status === 'warning' ? '#fde68a' : 'var(--border)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--gray-800)' }}>{name}</span>
                  <span className={`badge badge-${status === 'safe' ? 'success' : 'warning'}`}>
                    {status === 'safe' ? 'Safe' : 'Warning'}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, fontSize: '0.72rem' }}>
                  {[
                    { l: 'pH', v: ph },
                    { l: 'TDS', v: `${tds}p` },
                    { l: 'EC', v: `${ec}m` },
                    { l: 'NTU', v: turbidity },
                    { l: '°C', v: temp },
                  ].map(({ l, v }, j) => (
                    <div key={j} style={{ textAlign: 'center' }}>
                      <div style={{ color: 'var(--gray-400)', fontWeight: 600, fontSize: '0.65rem' }}>{l}</div>
                      <div style={{ fontWeight: 700, color: 'var(--gray-700)' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
