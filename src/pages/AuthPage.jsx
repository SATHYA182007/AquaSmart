import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Droplets, Leaf, Zap, BarChart3, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import './AuthPage.css'

const benefits = [
  { icon: Droplets, text: 'Reduce water wastage with intelligent irrigation' },
  { icon: Leaf, text: 'Monitor water quality and nutrient delivery in real-time' },
  { icon: BarChart3, text: 'Improve crop productivity through precision automation' },
]

const features = [
  { label: 'Smart Irrigation' },
  { label: 'Water Quality Intelligence' },
  { label: 'Precision Fertigation' },
  { label: 'AI Recommendations' },
]

export default function AuthPage({ onLogin }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('signup') // 'signup' | 'login'
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '', org: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
      navigate('/app/dashboard')
    }, 1200)
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="auth-root">
      {/* LEFT – Background video + content */}
      <div className="auth-left">
        {/* Back Button */}
        <button 
          className="auth-back-button"
          onClick={() => navigate('/')}
          title="Back to Landing Page"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>

        {/* Video background */}
        <video
          className="auth-bg-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80"
        >
          {/* Fallback: static image background if video not available */}
        </video>
        <div className="auth-left-overlay" />

        {/* Content on top of video */}
        <div className="auth-left-content">
          {/* Logo / brand */}
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <Droplets size={22} />
            </div>
            <span className="auth-brand-name">AquaSmart AI</span>
          </div>

          <div className="auth-hero-text">
            <h1 className="auth-headline">
              Smarter Water.<br />
              Healthier Crops.<br />
              Sustainable Farming.
            </h1>
            <p className="auth-subheadline">
              AquaSmart AI helps farmers and agri-managers monitor water quality, 
              automate irrigation, optimize fertigation and make data-driven decisions 
              for sustainable agriculture.
            </p>
          </div>

          <div className="auth-benefits">
            {benefits.map(({ icon: Icon, text }, i) => (
              <div className="auth-benefit" key={i}>
                <div className="auth-benefit-icon">
                  <Icon size={16} />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="auth-feature-pills">
            {features.map(({ label }, i) => (
              <span className="auth-feature-pill" key={i}>
                <CheckCircle2 size={13} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT – Auth card */}
      <div className="auth-right">
        <div className="auth-card">
          {/* Logo */}
          <div className="auth-card-logo">
            <div className="auth-card-logo-icon">
              <Droplets size={20} />
            </div>
            <div>
              <div className="auth-card-brand">AquaSmart AI</div>
              <div className="auth-card-tagline">Smart Water · Smart Farm</div>
            </div>
          </div>

          <div className="auth-card-header">
            <h2 className="auth-card-title">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="auth-card-subtitle">
              {mode === 'signup'
                ? 'Start your 14-day free trial. No credit card required.'
                : 'Sign in to your AquaSmart AI dashboard.'}
            </p>
          </div>

          {/* Tab toggle */}
          <div className="auth-tab-toggle">
            <button
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => setMode('signup')}
            >Sign Up</button>
            <button
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => setMode('login')}
            >Sign In</button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Rajesh Kumar"
                  value={form.name}
                  onChange={set('name')}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="rajesh@khetfarm.com"
                value={form.email}
                onChange={set('email')}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <input
                  className="form-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={set('password')}
                  required
                />
                <button
                  type="button"
                  className="input-eye-btn"
                  onClick={() => setShowPassword(v => !v)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <>
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-with-icon">
                    <input
                      className="form-input"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      value={form.confirm}
                      onChange={set('confirm')}
                      required
                    />
                    <button
                      type="button"
                      className="input-eye-btn"
                      onClick={() => setShowConfirm(v => !v)}
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Farm / Organization Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Green Valley Farms Pvt. Ltd."
                    value={form.org}
                    onChange={set('org')}
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  {mode === 'signup' ? 'Get Started Free' : 'Sign In to Dashboard'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue as</span>
          </div>

          <button
            className="btn btn-secondary auth-demo-btn"
            onClick={() => { onLogin(); navigate('/app/dashboard') }}
          >
            <Zap size={15} style={{ color: '#f59e0b' }} />
            Enter Demo Mode
          </button>

          <p className="auth-terms">
            By continuing, you agree to AquaSmart AI's{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
