import { useState } from 'react'
import { FileText, Download, Filter, Search, Calendar, ChevronDown } from 'lucide-react'

const irrigationLogs = [
  { date: '29 Mar', time: '6:15 AM', zone: 'Zone A', crop: 'Paddy', dur: '45 min', vol: '620 L', method: 'Flood', pump: 'P-01', status: 'Completed' },
  { date: '29 Mar', time: '6:00 AM', zone: 'Zone B', crop: 'Tomato', dur: '33 min', vol: '320 L', method: 'Drip', pump: 'P-01', status: 'Completed' },
  { date: '28 Mar', time: '5:30 AM', zone: 'Zone A', crop: 'Paddy', dur: '45 min', vol: '615 L', method: 'Flood', pump: 'P-01', status: 'Completed' },
  { date: '28 Mar', time: '4:30 PM', zone: 'Zone B', crop: 'Tomato', dur: '30 min', vol: '298 L', method: 'Drip', pump: 'P-01', status: 'Completed' },
  { date: '28 Mar', time: '6:00 AM', zone: 'Zone D', crop: 'Groundnut', dur: '25 min', vol: '380 L', method: 'Sprinkler', pump: 'P-02', status: 'Completed' },
  { date: '27 Mar', time: '6:00 AM', zone: 'Zone C', crop: 'Chilli', dur: '18 min', vol: '200 L', method: 'Drip', pump: 'P-02', status: 'Completed' },
  { date: '27 Mar', time: '5:30 AM', zone: 'Zone A', crop: 'Paddy', dur: '45 min', vol: '610 L', method: 'Flood', pump: 'P-01', status: 'Completed' },
]

const qualityLogs = [
  { date: '29 Mar 6:00 AM', source: 'Borewell 1', ph: 6.8, tds: 420, ec: 1.2, ntu: 3.1, temp: 24, status: 'Safe' },
  { date: '29 Mar 6:00 AM', source: 'Borewell 2', ph: 7.4, tds: 680, ec: 2.1, ntu: 5.8, temp: 26, status: 'Warning' },
  { date: '28 Mar 6:00 AM', source: 'Borewell 1', ph: 6.9, tds: 415, ec: 1.1, ntu: 2.8, temp: 24, status: 'Safe' },
  { date: '28 Mar 6:00 AM', source: 'Canal', ph: 7.1, tds: 325, ec: 1.0, ntu: 7.9, temp: 27, status: 'Safe' },
  { date: '27 Mar 6:00 AM', source: 'Borewell 1', ph: 6.7, tds: 410, ec: 1.1, ntu: 3.0, temp: 23, status: 'Safe' },
]

const fertiLogs = [
  { date: '29 Mar 6:00 AM', zone: 'Zone B', crop: 'Tomato', stage: 'Flowering', npk: '19-19-19', dose: '3.4 kg', duration: '1h 15m', status: 'Completed' },
  { date: '28 Mar 6:00 AM', zone: 'Zone A', crop: 'Paddy', stage: 'Vegetative', npk: '28-14-14', dose: '2.8 kg', duration: '55 min', status: 'Completed' },
  { date: '27 Mar 6:00 AM', zone: 'Zone B', crop: 'Tomato', stage: 'Flowering', npk: '19-19-19', dose: '3.4 kg', duration: '1h 15m', status: 'Completed' },
  { date: '26 Mar 6:00 AM', zone: 'Zone D', crop: 'Groundnut', stage: 'Pod formation', npk: '10-26-26', dose: '3.0 kg', duration: '1h 00m', status: 'Completed' },
  { date: '25 Mar 6:00 AM', zone: 'Zone A', crop: 'Paddy', stage: 'Vegetative', npk: '28-14-14', dose: '2.6 kg', duration: '50 min', status: 'Completed' },
]

const tabs = ['Irrigation Log', 'Water Quality Log', 'Fertigation Log']

export default function Reports() {
  const [tab, setTab] = useState(0)
  const [search, setSearch] = useState('')

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="section-title">Reports</h1>
          <p className="section-subtitle">Historical logs, downloadable records and audit trails</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm"><Calendar size={14} /> Date Range</button>
          <button className="btn btn-primary btn-sm"><Download size={14} /> Export CSV</button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: 'Irrigation Sessions', value: '84', icon: FileText, color: '#0284c7', bg: '#e0f2fe', sub: 'Last 30 days' },
          { label: 'Water Quality Tests', value: '62', icon: FileText, color: '#7c3aed', bg: '#ede9fe', sub: 'Last 30 days' },
          { label: 'Fertigation Cycles', value: '48', icon: FileText, color: '#16a34a', bg: '#dcfce7', sub: 'Last 30 days' },
          { label: 'Reports Generated', value: '12', icon: Download, color: '#059669', bg: '#d1fae5', sub: 'Total reports' },
        ].map(({ label, value, icon: Icon, color, bg, sub }, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: bg, color }}><Icon size={18} /></div>
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{value}</div>
            <div className="stat-label">{label}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 10, padding: 3, gap: 3 }}>
          {tabs.map((t, i) => (
            <button
              key={i}
              className={`btn btn-sm ${tab === i ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: 8, padding: '6px 14px', background: tab === i ? 'var(--white)' : 'transparent', boxShadow: tab === i ? 'var(--shadow-xs)' : 'none' }}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: 32, maxWidth: 240 }}
            placeholder={`Search ${tabs[tab]}...`}
          />
        </div>
      </div>

      {/* Tables */}
      <div className="chart-container">
        {tab === 0 && (
          <>
            <div className="chart-title" style={{ marginBottom: 4 }}>Irrigation Log</div>
            <div className="chart-subtitle" style={{ marginBottom: 16 }}>All irrigation sessions – Green Valley Farms</div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th><th>Time</th><th>Zone</th><th>Crop</th>
                  <th>Duration</th><th>Volume</th><th>Method</th><th>Pump</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {irrigationLogs
                  .filter(r => !search || Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()))
                  .map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{r.date}</td>
                    <td>{r.time}</td>
                    <td>{r.zone}</td>
                    <td>{r.crop}</td>
                    <td>{r.dur}</td>
                    <td style={{ fontWeight: 600, color: 'var(--green-700)' }}>{r.vol}</td>
                    <td><span className="badge badge-neutral">{r.method}</span></td>
                    <td style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{r.pump}</td>
                    <td><span className="badge badge-success">{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 1 && (
          <>
            <div className="chart-title" style={{ marginBottom: 4 }}>Water Quality Log</div>
            <div className="chart-subtitle" style={{ marginBottom: 16 }}>Quality test records per source</div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date & Time</th><th>Source</th><th>pH</th>
                  <th>TDS (ppm)</th><th>EC (mS/cm)</th><th>NTU</th><th>Temp</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {qualityLogs
                  .filter(r => !search || Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()))
                  .map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>{r.date}</td>
                    <td>{r.source}</td>
                    <td>{r.ph}</td>
                    <td>{r.tds}</td>
                    <td>{r.ec}</td>
                    <td>{r.ntu}</td>
                    <td>{r.temp}°C</td>
                    <td>
                      <span className={`badge ${r.status === 'Safe' ? 'badge-success' : 'badge-warning'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 2 && (
          <>
            <div className="chart-title" style={{ marginBottom: 4 }}>Fertigation History</div>
            <div className="chart-subtitle" style={{ marginBottom: 16 }}>Nutrient delivery records by zone</div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date & Time</th><th>Zone</th><th>Crop</th><th>Growth Stage</th>
                  <th>NPK Ratio</th><th>Dosage</th><th>Duration</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fertiLogs
                  .filter(r => !search || Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase()))
                  .map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>{r.date}</td>
                    <td>{r.zone}</td>
                    <td>{r.crop}</td>
                    <td style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{r.stage}</td>
                    <td><span style={{ fontWeight: 700, color: 'var(--green-700)' }}>{r.npk}</span></td>
                    <td>{r.dose}</td>
                    <td>{r.duration}</td>
                    <td><span className="badge badge-success">{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}
