import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Droplets, Leaf, Zap, BarChart3, ArrowRight, CheckCircle2,
  Menu, X, ChevronDown, Star, Shield, Cpu, Activity,
  Gauge, FlaskConical, Sprout, Bell, FileText, Settings2,
  Twitter, Linkedin, Github, Mail, Phone, MapPin,
  TrendingUp, AlertCircle, Play
} from 'lucide-react'
import './LandingPage.css'

const navLinks = ['Features', 'Solutions', 'How It Works', 'Pricing', 'About']

const stats = [
  { value: '40%', label: 'Water Savings' },
  { value: '2,800+', label: 'Active Farms' },
  { value: '99.7%', label: 'Uptime SLA' },
  { value: '18 States', label: 'Pan-India Coverage' },
]

const features = [
  {
    icon: Droplets,
    color: '#0284c7',
    bg: '#e0f2fe',
    title: 'Smart Irrigation Automation',
    desc: 'Schedule and automate irrigation across multiple zones with moisture-based triggers, soil sensor integration, and weather-aware controls.',
  },
  {
    icon: FlaskConical,
    color: '#7c3aed',
    bg: '#ede9fe',
    title: 'Water Quality Monitoring',
    desc: 'Track pH, TDS, EC, turbidity, and temperature in real-time. Receive instant alerts when parameters exceed safe thresholds.',
  },
  {
    icon: Sprout,
    color: '#16a34a',
    bg: '#dcfce7',
    title: 'Precision Fertigation',
    desc: 'Deliver nutrients precisely through irrigation lines. Manage NPK ratios, dosage schedules, and crop-specific nutrient profiles.',
  },
  {
    icon: Cpu,
    color: '#f59e0b',
    bg: '#fef3c7',
    title: 'AI Recommendations',
    desc: 'Machine learning models analyze soil, weather, and crop data to provide actionable irrigation and fertigation recommendations.',
  },
  {
    icon: Activity,
    color: '#ef4444',
    bg: '#fee2e2',
    title: 'Real-Time Analytics',
    desc: 'Comprehensive dashboards with historical trends, zone comparisons, efficiency metrics, and sustainability scores.',
  },
  {
    icon: Bell,
    color: '#0891b2',
    bg: '#cffafe',
    title: 'Intelligent Alerts',
    desc: 'Configurable alert system for moisture anomalies, equipment issues, quality thresholds, and crop stress detection.',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Connect Your Farm',
    desc: 'Install IoT sensors, connect existing pumps/valves, and onboard your farm zones within minutes using our guided setup.',
  },
  {
    step: '02',
    title: 'Monitor in Real-Time',
    desc: 'Live dashboards give you instant visibility into soil moisture, water quality, pump status, and irrigation activity.',
  },
  {
    step: '03',
    title: 'Get AI Recommendations',
    desc: 'The AI engine analyzes your field data and provides precise, actionable suggestions to optimize water use and crop health.',
  },
  {
    step: '04',
    title: 'Automate & Scale',
    desc: 'Implement automated schedules, integrate with more zones, and scale your smart water management across your entire operation.',
  },
]

const testimonials = [
  {
    name: 'Suresh Reddy',
    role: 'Tomato & Chilli Farmer',
    location: 'Andhra Pradesh',
    quote: 'AquaSmart AI reduced our water usage by 38% this season. The fertigation automation alone saved us significant labor costs and improved the yield quality measurably.',
    rating: 5,
    avatar: 'SR',
  },
  {
    name: 'Priya Agrawal',
    role: 'AgriTech Consultant',
    location: 'Maharashtra',
    quote: 'The water quality monitoring is exceptional. I can track EC and pH values across 6 bore wells from one dashboard. The alerts prevented a major crop damage incident last monsoon.',
    rating: 5,
    avatar: 'PA',
  },
  {
    name: 'Dr. Manikantan Iyer',
    role: 'Agricultural Research Officer',
    location: 'Tamil Nadu',
    quote: 'The AI recommendations are surprisingly accurate. For paddy and groundnut zones, the irrigation scheduling suggestions matched what experienced farmers would recommend manually.',
    rating: 5,
    avatar: 'MI',
  },
]

const faqs = [
  {
    q: 'What sensors and hardware does AquaSmart AI support?',
    a: 'AquaSmart AI supports a wide range of IoT sensors including soil moisture sensors, water quality probes (pH, EC, TDS), flow meters, and pressure sensors. We provide integration guides for major brands and offer our own certified sensor kits.',
  },
  {
    q: 'How does the AI-based irrigation recommendation work?',
    a: 'Our AI models analyze soil moisture levels, historical irrigation data, weather forecasts, crop type, and growth stage to calculate optimal irrigation timing and duration. The models improve continuously with more farm data.',
  },
  {
    q: 'Can I manage multiple farms or fields from one account?',
    a: 'Yes. AquaSmart AI supports multi-farm management with separate zone configurations, sensor groups, and schedules. Enterprise accounts can manage hundreds of fields and zones from a single unified dashboard.',
  },
  {
    q: 'Is the platform suitable for small-scale farmers?',
    a: 'Absolutely. We offer plans starting from as low as ₹499/month for small farms. The interface is designed to be intuitive even without technical knowledge, and our support team provides onboarding assistance.',
  },
  {
    q: 'What kind of reports can I generate?',
    a: 'You can generate detailed reports on irrigation history, water quality logs, fertigation records, water usage per zone, efficiency metrics, and alert histories. Reports can be exported as PDF or CSV.',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="landing-root">
      {/* NAVBAR */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <a href="#" className="lp-logo">
            <div className="lp-logo-icon"><Droplets size={18} /></div>
            <span>AquaSmart AI</span>
          </a>

          <div className="lp-nav-links">
            {navLinks.map(l => (
              <a href="#" className="lp-nav-link" key={l}>{l}</a>
            ))}
          </div>

          <div className="lp-nav-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/auth')}>
              Sign In
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/auth')}>
              Start Free Trial
            </button>
          </div>

          <button className="lp-menu-btn" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="lp-mobile-menu">
            {navLinks.map(l => <a href="#" className="lp-mobile-link" key={l}>{l}</a>)}
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/auth')}>
              Start Free Trial
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-bg" />
        <div className="lp-container">
          <div className="lp-hero-badge">
            <span className="status-dot active" style={{ animation: 'pulse-green 2s infinite' }} />
            Trusted by 2,800+ farms across India &amp; Southeast Asia
          </div>
          <h1 className="lp-hero-title">
            AI-Powered Smart Water<br />
            Management for Modern<br />
            Agriculture
          </h1>
          <p className="lp-hero-subtitle">
            Automate irrigation, monitor water quality, optimize fertigation and improve 
            farm productivity with one intelligent platform built for the modern farm.
          </p>
          <div className="lp-hero-actions">
            <button className="btn btn-primary btn-lg lp-cta-btn" onClick={() => navigate('/auth')}>
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg lp-watch-btn" onClick={() => navigate('/auth')}>
              <Play size={16} style={{ fill: 'currentColor' }} /> View Platform
            </button>
          </div>
          <div className="lp-hero-stats">
            {stats.map(({ value, label }, i) => (
              <div className="lp-stat" key={i}>
                <div className="lp-stat-value">{value}</div>
                <div className="lp-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section className="lp-section lp-problem">
        <div className="lp-container">
          <div className="lp-section-tag">The Problem We Solve</div>
          <h2 className="lp-section-title">Agriculture's Water Crisis Demands Intelligent Solutions</h2>
          <p className="lp-section-desc">
            Agriculture accounts for over 70% of global freshwater withdrawal. Yet inefficient 
            irrigation, poor water quality monitoring, and unoptimized nutrient delivery continue 
            to cost farmers billions in yield losses and resource waste every year.
          </p>
          <div className="lp-problem-grid">
            {[
              { icon: AlertCircle, stat: '40–50%', label: 'of irrigation water is wasted due to poor scheduling', color: '#ef4444' },
              { icon: TrendingUp, stat: '₹24,000 Cr', label: 'annual loss from salinity and water quality issues in India', color: '#f59e0b' },
              { icon: Gauge, stat: '60%', label: 'of farms have no real-time visibility into soil or water conditions', color: '#7c3aed' },
            ].map(({ icon: Icon, stat, label, color }, i) => (
              <div className="lp-problem-card" key={i}>
                <Icon size={28} style={{ color }} />
                <div className="lp-problem-stat" style={{ color }}>{stat}</div>
                <p className="lp-problem-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="lp-section lp-solution">
        <div className="lp-container">
          <div className="lp-solution-inner">
            <div className="lp-solution-text">
              <div className="lp-section-tag">Our Solution</div>
              <h2 className="lp-section-title" style={{ textAlign: 'left' }}>
                One Platform.<br />Complete Water Intelligence.
              </h2>
              <p className="lp-section-desc" style={{ textAlign: 'left', maxWidth: '480px' }}>
                AquaSmart AI integrates sensor data, AI models, and automation controls into a 
                single platform that makes every drop of water count – from the borewell to the 
                root zone.
              </p>
              <div className="lp-solution-points">
                {[
                  'Real-time monitoring across all water sources',
                  'Automated irrigation with moisture-based triggers',
                  'AI-driven nutrient dosage management',
                  'Multi-zone farm management at scale',
                  'Actionable alerts and compliance reports',
                ].map((p, i) => (
                  <div className="lp-solution-point" key={i}>
                    <CheckCircle2 size={17} style={{ color: 'var(--green-600)', flexShrink: 0 }} />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={() => navigate('/auth')}>
                Explore the Platform <ArrowRight size={16} />
              </button>
            </div>
            <div className="lp-solution-visual">
              <div className="lp-dashboard-mock">
                <div className="ldm-header">
                  <div className="ldm-dot red" /><div className="ldm-dot yellow" /><div className="ldm-dot green" />
                  <span className="ldm-title">AquaSmart AI · Dashboard</span>
                </div>
                <div className="ldm-body">
                  <div className="ldm-cards">
                    {[
                      { label: 'Soil Moisture', value: '42%', color: '#3b82f6' },
                      { label: 'Water Quality', value: 'Good', color: '#16a34a' },
                      { label: 'Water Used', value: '2,480 L', color: '#7c3aed' },
                      { label: 'Pump Status', value: 'Running', color: '#f59e0b' },
                    ].map(({ label, value, color }, i) => (
                      <div className="ldm-card" key={i}>
                        <span className="ldm-card-label">{label}</span>
                        <span className="ldm-card-value" style={{ color }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ldm-chart-area">
                    <div className="ldm-chart-label">Weekly Water Usage</div>
                    <div className="ldm-bars">
                      {[65, 80, 55, 90, 70, 85, 60].map((h, i) => (
                        <div key={i} className="ldm-bar-wrap">
                          <div className="ldm-bar" style={{ height: `${h}%` }} />
                          <div className="ldm-bar-day">{['M','T','W','T','F','S','S'][i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="ldm-ai-card">
                    <Cpu size={14} style={{ color: 'white', flexShrink: 0 }} />
                    <span>AI: Zone B requires irrigation in 45 min based on moisture &amp; forecast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-section lp-features">
        <div className="lp-container">
          <div className="lp-section-tag">Platform Features</div>
          <h2 className="lp-section-title">Everything Your Farm Needs in One Place</h2>
          <p className="lp-section-desc">
            From sensor integration to AI-powered recommendations — a complete toolkit 
            for precision water management.
          </p>
          <div className="lp-features-grid">
            {features.map(({ icon: Icon, color, bg, title, desc }, i) => (
              <div className="lp-feature-card" key={i}>
                <div className="lp-feature-icon" style={{ background: bg, color }}>
                  <Icon size={22} />
                </div>
                <h3 className="lp-feature-title">{title}</h3>
                <p className="lp-feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lp-section lp-how">
        <div className="lp-container">
          <div className="lp-section-tag">How It Works</div>
          <h2 className="lp-section-title">Get Your Farm Online in Minutes</h2>
          <div className="lp-how-grid">
            {howItWorks.map(({ step, title, desc }, i) => (
              <div className="lp-how-card" key={i}>
                <div className="lp-how-step">{step}</div>
                <h3 className="lp-how-title">{title}</h3>
                <p className="lp-how-desc">{desc}</p>
                {i < howItWorks.length - 1 && <div className="lp-how-arrow"><ArrowRight size={18} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="lp-section lp-testimonials">
        <div className="lp-container">
          <div className="lp-section-tag">Testimonials</div>
          <h2 className="lp-section-title">Trusted by Farmers and Agri-Professionals</h2>
          <div className="lp-testimonials-grid">
            {testimonials.map(({ name, role, location, quote, rating, avatar }, i) => (
              <div className="lp-testimonial-card" key={i}>
                <div className="lp-stars">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star size={14} key={j} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                  ))}
                </div>
                <p className="lp-testimonial-quote">"{quote}"</p>
                <div className="lp-testimonial-author">
                  <div className="avatar" style={{ width: 40, height: 40, fontSize: '0.8rem' }}>{avatar}</div>
                  <div>
                    <div className="lp-author-name">{name}</div>
                    <div className="lp-author-role">{role} · {location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-section lp-faq">
        <div className="lp-container lp-faq-inner">
          <div>
            <div className="lp-section-tag">FAQ</div>
            <h2 className="lp-section-title" style={{ textAlign: 'left' }}>Common Questions</h2>
          </div>
          <div className="lp-faq-list">
            {faqs.map(({ q, a }, i) => (
              <div
                className={`lp-faq-item ${openFaq === i ? 'open' : ''}`}
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="lp-faq-q">
                  <span>{q}</span>
                  <ChevronDown size={18} className="lp-faq-chevron" />
                </div>
                {openFaq === i && <div className="lp-faq-a">{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lp-cta-section">
        <div className="lp-container lp-cta-inner">
          <div className="lp-cta-badge">Start Free · No Credit Card Required</div>
          <h2 className="lp-cta-title">
            Ready to Transform Your<br />Water Management?
          </h2>
          <p className="lp-cta-desc">
            Join 2,800+ farmers already saving water and improving yields with AquaSmart AI.
          </p>
          <div className="lp-cta-actions">
            <button className="btn btn-lg lp-cta-white-btn" onClick={() => navigate('/auth')}>
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button className="btn btn-lg lp-cta-outline-btn" onClick={() => navigate('/auth')}>
              View Platform Demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-top">
            <div className="lp-footer-brand">
              <div className="lp-logo">
                <div className="lp-logo-icon"><Droplets size={16} /></div>
                <span>AquaSmart AI</span>
              </div>
              <p className="lp-footer-brand-desc">
                Intelligent water management for sustainable and productive agriculture.
              </p>
              <div className="lp-footer-socials">
                <a href="#"><Twitter size={18} /></a>
                <a href="#"><Linkedin size={18} /></a>
                <a href="#"><Github size={18} /></a>
              </div>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Dashboard', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Solutions', links: ['Smart Irrigation', 'Water Quality', 'Fertigation', 'Analytics', 'Reports'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Contact', 'Press'] },
            ].map(({ title, links }) => (
              <div key={title} className="lp-footer-col">
                <div className="lp-footer-col-title">{title}</div>
                {links.map(l => <a href="#" key={l} className="lp-footer-link">{l}</a>)}
              </div>
            ))}
          </div>
          <div className="lp-footer-bottom">
            <span>© 2025 AquaSmart AI Technologies Pvt. Ltd. All rights reserved.</span>
            <div className="lp-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
