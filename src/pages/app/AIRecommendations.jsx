import { useState } from 'react'
import { Cpu, CheckCircle2, Clock, AlertTriangle, ArrowRight, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react'

const recommendations = [
  {
    id: 1,
    priority: 'high',
    type: 'Irrigation',
    title: 'Irrigate Zone B in 45 minutes',
    detail: 'Soil moisture at 28% (threshold: 35%). Heat index is high at 34°C. No rainfall forecast for 36+ hours. Recommended duration: 30 minutes at 340 L/hr via Borewell 1.',
    confidence: 94,
    zone: 'Zone B',
    crop: 'Tomato',
    generated: 'Today, 2:30 PM',
    applied: false,
  },
  {
    id: 2,
    priority: 'medium',
    type: 'Fertigation',
    title: 'Delay fertigation by 12 hours due to rainfall forecast',
    detail: 'Weather model shows 68% probability of rainfall between 4–8 PM. Postponing the scheduled 4:30 PM fertigation to 6:00 AM tomorrow will minimize leaching risk and improve nutrient uptake efficiency.',
    confidence: 78,
    zone: 'Zone A',
    crop: 'Paddy',
    generated: 'Today, 1:15 PM',
    applied: false,
  },
  {
    id: 3,
    priority: 'high',
    type: 'Water Quality',
    title: 'Water salinity in Zone C may affect nutrient absorption',
    detail: 'Borewell 2 EC is 2.1 mS/cm, above the safe threshold for chilli (1.5 mS/cm). Switch to Rainwater Tank blend (70:30) for Zone C. Expected EC: 1.3 mS/cm.',
    confidence: 88,
    zone: 'Zone C',
    crop: 'Chilli',
    generated: 'Today, 11:45 AM',
    applied: true,
  },
  {
    id: 4,
    priority: 'low',
    type: 'Efficiency',
    title: 'Reduce irrigation duration by 15% for Zone A',
    detail: "Analysis of the last 14 days shows Zone A's paddy field moisture retention is 12% higher than baseline due to recent soil improvement. Current 45-min cycles can be reduced to 38 min without yield impact.",
    confidence: 72,
    zone: 'Zone A',
    crop: 'Paddy',
    generated: 'Today, 9:00 AM',
    applied: false,
  },
  {
    id: 5,
    priority: 'critical',
    type: 'Irrigation',
    title: 'Soil moisture in Zone C is critically low',
    detail: 'Zone C moisture at 18% — below critical threshold of 25% for chilli. Immediate irrigation required. Estimated crop stress onset: 2–3 hours. Activate Pump 02 with drip irrigation for 25 minutes.',
    confidence: 97,
    zone: 'Zone C',
    crop: 'Chilli',
    generated: 'Today, 3:10 PM',
    applied: false,
  },
  {
    id: 6,
    priority: 'medium',
    type: 'Fertigation',
    title: 'Increase potassium dosage for Zone D during pod formation',
    detail: 'Groundnut is entering pod formation stage. Soil sample analysis indicates potassium deficiency (K: 82 kg/ha vs recommended 120 kg/ha). Switch NPK ratio from 10-26-26 to 12-10-36 for the next 2 fertigation cycles.',
    confidence: 83,
    zone: 'Zone D',
    crop: 'Groundnut',
    generated: 'Yesterday, 6:00 PM',
    applied: false,
  },
]

const priorityConfig = {
  critical: { color: '#dc2626', bg: '#fee2e2', border: '#fecaca', label: 'Critical' },
  high:     { color: '#d97706', bg: '#fef3c7', border: '#fde68a', label: 'High' },
  medium:   { color: '#0284c7', bg: '#e0f2fe', border: '#bfdbfe', label: 'Medium' },
  low:      { color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0', label: 'Low' },
}

const typeColors = {
  Irrigation:   '#0284c7',
  Fertigation:  '#7c3aed',
  'Water Quality': '#d97706',
  Efficiency:   '#16a34a',
}

export default function AIRecommendations() {
  const [applied, setApplied] = useState({})
  const [dismissed, setDismissed] = useState({})

  const apply = (id) => setApplied(p => ({ ...p, [id]: true }))
  const dismiss = (id) => setDismissed(p => ({ ...p, [id]: true }))

  const visible = recommendations.filter(r => !dismissed[r.id])

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="section-title">AI Recommendations</h1>
          <p className="section-subtitle">Intelligent insights powered by your field data, sensors and weather models</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-success">
            <Cpu size={12} /> AI Active
          </span>
          <button className="btn btn-secondary btn-sm"><RefreshCw size={14} /> Refresh</button>
        </div>
      </div>

      {/* Summary pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        {[
          { label: 'Total Insights', count: visible.length, color: 'var(--gray-700)', bg: 'var(--gray-100)' },
          { label: 'Critical', count: visible.filter(r => r.priority === 'critical').length, color: '#dc2626', bg: '#fee2e2' },
          { label: 'High Priority', count: visible.filter(r => r.priority === 'high').length, color: '#d97706', bg: '#fef3c7' },
          { label: 'Applied', count: Object.keys(applied).length, color: '#16a34a', bg: '#dcfce7' },
        ].map(({ label, count, color, bg }, i) => (
          <div key={i} style={{
            padding: '8px 16px', background: bg, borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem', fontWeight: 700, color,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 900 }}>{count}</span>
            {label}
          </div>
        ))}
      </div>

      {/* Recommendation cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {visible.map((rec) => {
          const pc = priorityConfig[rec.priority]
          const isApplied = applied[rec.id] || rec.applied
          return (
            <div key={rec.id} className="card" style={{
              padding: 0, overflow: 'hidden',
              border: `1px solid ${isApplied ? 'var(--green-300)' : pc.border}`,
              opacity: isApplied ? 0.85 : 1
            }}>
              {/* Top accent bar */}
              <div style={{ height: 4, background: pc.color }} />
              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', align: 'flex-start', gap: 10, flex: 1 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      background: pc.bg, color: pc.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Cpu size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                        <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--gray-900)', margin: 0 }}>
                          {rec.title}
                        </h3>
                        {isApplied && (
                          <span className="badge badge-success"><CheckCircle2 size={11} /> Applied</span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.8375rem', color: 'var(--gray-600)', lineHeight: 1.6, margin: 0 }}>
                        {rec.detail}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', flexShrink: 0 }}>
                    <span style={{ padding: '3px 10px', background: pc.bg, color: pc.color, borderRadius: 999, fontSize: '0.72rem', fontWeight: 700 }}>
                      {pc.label}
                    </span>
                    <span style={{ padding: '3px 8px', background: 'var(--gray-100)', color: typeColors[rec.type] || 'var(--gray-700)', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700 }}>
                      {rec.type}
                    </span>
                  </div>
                </div>

                {/* Meta row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--gray-500)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Zone:</span> {rec.zone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--gray-500)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Crop:</span> {rec.crop}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--gray-500)' }}>
                    <Clock size={12} /> {rec.generated}
                  </div>
                  {/* Confidence bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600 }}>Confidence</span>
                    <div style={{ width: 80, height: 6, background: 'var(--gray-100)', borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${rec.confidence}%`, background: rec.confidence > 85 ? '#16a34a' : rec.confidence > 70 ? '#f59e0b' : '#ef4444', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-700)' }}>{rec.confidence}%</span>
                  </div>
                </div>

                {/* Actions */}
                {!isApplied && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => apply(rec.id)}
                    >
                      <CheckCircle2 size={14} /> Apply Suggestion
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <ArrowRight size={14} /> View Details
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ marginLeft: 'auto' }}
                      onClick={() => dismiss(rec.id)}
                    >
                      Dismiss
                    </button>
                  </div>
                )}
                {isApplied && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--green-600)', fontWeight: 600 }}>
                    <CheckCircle2 size={14} /> Suggestion applied successfully
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
