import { useState } from 'react'
import {
  User, Sprout, Droplets, Bell, Shield, Sliders,
  Save, Camera, Mail, Phone, MapPin, Globe
} from 'lucide-react'

const tabs = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'farm', label: 'Farm Settings', icon: Sprout },
  { key: 'water', label: 'Water Sources', icon: Droplets },
  { key: 'thresholds', label: 'Thresholds', icon: Sliders },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: Shield },
]

const crops = ['Paddy', 'Tomato', 'Chilli', 'Groundnut', 'Maize', 'Banana', 'Onion', 'Sugarcane']

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 className="section-title">Settings</h1>
        <p className="section-subtitle">Manage your profile, farm configuration and system preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
        {/* Settings sidebar */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '10px 8px', height: 'fit-content' }}>
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`nav-item ${activeTab === key ? 'active' : ''}`}
              style={{ width: '100%', marginBottom: 2 }}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div className="card">
          {/* Profile */}
          {activeTab === 'profile' && (
            <div>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>User Profile</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 24 }}>Update your personal information and contact details</p>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '1.375rem', fontWeight: 800
                  }}>RK</div>
                  <button style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'white', border: '2px solid var(--green-400)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--green-600)'
                  }}>
                    <Camera size={12} />
                  </button>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)' }}>Rajesh Kumar</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Farm Admin · Green Valley Farms</div>
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: 6, padding: '4px 10px' }}>Change Photo</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" defaultValue="Rajesh Kumar" />
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select className="form-select">
                    <option>Farm Admin</option>
                    <option>Field Operator</option>
                    <option>Agronomist</option>
                    <option>Viewer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" defaultValue="rajesh@greenvalleyfarms.in" />
                </div>
                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input className="form-input" type="tel" defaultValue="+91 98450 12345" />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <select className="form-select">
                    <option>Karnataka</option>
                    <option>Andhra Pradesh</option>
                    <option>Tamil Nadu</option>
                    <option>Maharashtra</option>
                    <option>Telangana</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">District</label>
                  <input className="form-input" defaultValue="Raichur" />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label className="form-label">Bio / Notes</label>
                <textarea className="form-textarea" defaultValue="Managing 8.5 hectare mixed crop farm. Focus on sustainable water use and precision agriculture." />
              </div>

              <button className="btn btn-primary" onClick={handleSave} style={{ marginRight: 8 }}>
                <Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}
              </button>
              <button className="btn btn-ghost">Cancel</button>
            </div>
          )}

          {/* Farm Settings */}
          {activeTab === 'farm' && (
            <div>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Farm Configuration</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 24 }}>Configure your farm profile, zones and default crop settings</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div className="form-group">
                  <label className="form-label">Farm Name</label>
                  <input className="form-input" defaultValue="Green Valley Farms" />
                </div>
                <div className="form-group">
                  <label className="form-label">Registration / ID</label>
                  <input className="form-input" defaultValue="GVF-KA-2024-0091" />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Farm Area (hectares)</label>
                  <input className="form-input" type="number" defaultValue="8.5" />
                </div>
                <div className="form-group">
                  <label className="form-label">Number of Zones</label>
                  <input className="form-input" type="number" defaultValue="4" />
                </div>
                <div className="form-group">
                  <label className="form-label">Primary Crop</label>
                  <select className="form-select">
                    {crops.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Irrigation System</label>
                  <select className="form-select">
                    <option>Drip + Flood (Mixed)</option>
                    <option>Drip Irrigation</option>
                    <option>Sprinkler</option>
                    <option>Flood / Furrow</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Timezone</label>
                  <select className="form-select"><option>IST (UTC+5:30)</option></select>
                </div>
                <div className="form-group">
                  <label className="form-label">Language</label>
                  <select className="form-select"><option>English</option><option>Kannada</option><option>Telugu</option></select>
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleSave}><Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}</button>
            </div>
          )}

          {/* Water Sources */}
          {activeTab === 'water' && (
            <div>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Water Source Settings</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 24 }}>Configure water sources and their quality monitoring parameters</p>
              {[
                { name: 'Borewell 1', type: 'Borewell', depth: '180 ft', cap: '5,000 L/hr', status: 'Active Primary' },
                { name: 'Borewell 2', type: 'Borewell', depth: '220 ft', cap: '3,500 L/hr', status: 'Active – Warning' },
                { name: 'Canal (Main)', type: 'Surface Canal', depth: '—', cap: '12,000 L/hr', status: 'Active' },
                { name: 'Rainwater Tank', type: 'Rainwater Harvesting', depth: '—', cap: '800 L', status: 'Supplementary' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: 10, padding: 16, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{s.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)' }}>{s.type}</div>
                    </div>
                    <span className={`badge ${s.status.includes('Warning') ? 'badge-warning' : 'badge-success'}`}>{s.status}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {[{ l: 'Depth', v: s.depth }, { l: 'Capacity', v: s.cap }, { l: 'Quality Test Freq', v: 'Daily 6:00 AM' }].map(({ l, v }, j) => (
                      <div key={j}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{l}</div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gray-700)' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="btn btn-primary" onClick={handleSave}><Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}</button>
            </div>
          )}

          {/* Thresholds */}
          {activeTab === 'thresholds' && (
            <div>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Alert Thresholds</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 24 }}>Configure when the system should trigger alerts and automation</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[
                  { label: 'Critical Moisture Threshold (%)', defaultVal: '25', help: 'Triggers critical alert and auto-irrigation' },
                  { label: 'Warning Moisture Threshold (%)', defaultVal: '35', help: 'Triggers warning notification' },
                  { label: 'Max pH Level', defaultVal: '7.5', help: 'Above this value triggers quality alert' },
                  { label: 'Min pH Level', defaultVal: '6.0', help: 'Below this value triggers quality alert' },
                  { label: 'Max EC (mS/cm)', defaultVal: '1.5', help: 'Salinity alert threshold' },
                  { label: 'Max TDS (ppm)', defaultVal: '600', help: 'High dissolved solids alert' },
                  { label: 'Max Turbidity (NTU)', defaultVal: '10', help: 'Water clarity threshold' },
                  { label: 'Max Field Temperature (°C)', defaultVal: '38', help: 'Heat stress alert for crops' },
                ].map(({ label, defaultVal, help }, i) => (
                  <div key={i} className="form-group">
                    <label className="form-label">{label}</label>
                    <input className="form-input" type="number" defaultValue={defaultVal} />
                    <span style={{ fontSize: '0.72rem', color: 'var(--gray-400)' }}>{help}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={handleSave}><Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}</button>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Notification Preferences</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 24 }}>Choose what events you want to be notified about</p>
              {[
                { group: 'Irrigation Events', items: ['Irrigation started', 'Irrigation completed', 'Schedule missed', 'Pump failure'] },
                { group: 'Water Quality Alerts', items: ['pH out of range', 'High salinity (EC)', 'Turbidity alert', 'Weekly quality report'] },
                { group: 'Fertigation Events', items: ['Fertigation started', 'Cycle completed', 'Low fertilizer stock'] },
                { group: 'AI Recommendations', items: ['New recommendation available', 'Critical recommendation', 'Suggestion applied'] },
              ].map(({ group, items }, i) => (
                <div key={i} style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--gray-800)', marginBottom: 10 }}>{group}</div>
                  {items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>{item}</span>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked={j < 2} />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <button className="btn btn-primary" onClick={handleSave}><Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}</button>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Security Settings</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 24 }}>Manage your password and account security</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400, marginBottom: 24 }}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input className="form-input" type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input className="form-input" type="password" placeholder="At least 8 characters" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input className="form-input" type="password" placeholder="Re-enter new password" />
                </div>
              </div>
              <div style={{ background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: 12 }}>Two-Factor Authentication</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>Enable 2FA via SMS/Authenticator app</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 2 }}>Adds an extra layer of security to your account</div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleSave}><Save size={15} /> Update Password</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
