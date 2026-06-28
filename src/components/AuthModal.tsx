// src/components/AuthModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Loader2, FlaskConical, GraduationCap, Mail, Lock, User, Building2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createPortal } from 'react-dom';

const INTEREST_OPTIONS = [
  "AI", "Web Development", "Data Structures",
  "DBMS", "Machine Learning", "System Design"
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
  courseId?: string;
};

export function AuthModal({ isOpen, onClose, onAuthenticated, courseId }: Props) {
  const [isLogin, setIsLogin]         = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [name, setName]               = useState('');
  const [college, setCollege]         = useState('');
  const [interests, setInterests]     = useState<string[]>([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState('');

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else        document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleInterest = (i: string) =>
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const reset = () => {
    setEmail(''); setPassword(''); setName('');
    setCollege(''); setInterests([]); setError(''); setSuccess('');
  };

  const switchMode = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setError(''); setSuccess('');
    setIsLogin(v => !v);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (!email.trim() || !password.trim()) throw new Error('Please fill in your email and password.');
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw new Error(authError.message);
        onAuthenticated();
      } else {
        if (!name.trim())    throw new Error('Please enter your name.');
        if (!college.trim()) throw new Error('Please enter your college name.');
        const { data, error: authError } = await supabase.auth.signUp({
          email, password,
          options: { data: { name: name.trim(), college: college.trim(), interests } }
        });
        if (authError) throw new Error(authError.message);
        if (!data.user) throw new Error('Sign-up failed. Please try again.');
        setSuccess('Account created! Signing you in…');
        setTimeout(() => { onAuthenticated(); }, 1200);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Translucent overlay backdrop */}
      <div className="am-overlay" onClick={() => { reset(); onClose(); }} />

      {/* Centered modal wrapper */}
      <div className="am-wrap" role="dialog" aria-modal="true">
        <div className={`am-container ${!isLogin ? 'active' : ''}`}>

          {/* Absolute Architectural Grid Background matching Dashboard */}
          <div className="am-grid-overlay-bg" />

          {/* Floating gradient orbs */}
          <div className="am-orb am-orb-1" />
          <div className="am-orb am-orb-2" />
          <div className="am-orb am-orb-3" />

          {/* Diagonal architectural lines - adjusted parameters to prevent text overlap */}
          <div className="am-shape am-shape-1" />
          <div className="am-shape am-shape-2" />

          {/* Universal close button */}
          <button className="am-close" onClick={() => { reset(); onClose(); }} aria-label="Close">
            <X size={18}/>
          </button>

          {/* ════════ LOGIN FORM (left) ════════ */}
          <div className="am-panel am-form am-login-form">
            <div className="am-badge"><FlaskConical size={20}/></div>
            
            <h2 className="am-heading">
              Welcome <span className="am-text-gradient">Back</span>
            </h2>
            <p className="am-sub">Sign in to access your labs and certificates.</p>

            {error   && <div className="am-alert am-alert-err">{error}</div>}
            {success && <div className="am-alert am-alert-ok">{success}</div>}

            <form onSubmit={handleSubmit} className="am-form-body">
              <AField label="Email" icon={<Mail size={14}/>}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  className="am-input" placeholder="you@university.edu"/>
              </AField>
              <div className="am-field-gap" />
              <AField label="Password" icon={<Lock size={14}/>}>
                <input type="password" value={password} minLength={6} onChange={e=>setPassword(e.target.value)}
                  className="am-input" placeholder="••••••••"/>
              </AField>
              <div className="am-field-gap" />
              <button disabled={loading} type="submit" className="am-btn">
                {loading && <Loader2 size={15} className="am-spin"/>}
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="am-switch-row">
              New to VLMS?{' '}
              <button type="button" onClick={switchMode} className="am-switch-link">Create account</button>
            </p>
          </div>

          {/* ════════ LOGIN INFO (right) ════════ */}
          <div className="am-panel am-info am-login-info">
            <div className="am-info-content">
              <Sparkles size={32} className="am-info-icon"/>
              <h2 className="am-info-h">WELCOME<br/>BACK!</h2>
              <p className="am-info-p">Your virtual lab bench is ready. Resume experiments, grab certificates, and keep building.</p>
              <div className="am-dots"><span/><span/><span/></div>
            </div>
          </div>

          {/* ════════ SIGNUP INFO (left) ════════ */}
          <div className="am-panel am-info am-signup-info">
            <div className="am-info-content">
              <GraduationCap size={32} className="am-info-icon"/>
              <h2 className="am-info-h">JOIN THE<br/>LAB!</h2>
              <p className="am-info-p">Get instant access to virtual experiments, AI-graded assessments, and verifiable certificates.</p>
              <div className="am-dots"><span/><span/><span/></div>
            </div>
          </div>

          {/* ════════ SIGNUP FORM (right) ════════ */}
          <div className="am-panel am-form am-signup-form">
            <div className="am-badge"><GraduationCap size={20}/></div>
            
            <h2 className="am-heading">
              Create <span className="am-text-gradient">Account</span>
            </h2>
            <p className="am-sub">Join thousands of students in virtual labs.</p>

            {error   && <div className="am-alert am-alert-err">{error}</div>}
            {success && <div className="am-alert am-alert-ok">{success}</div>}

            <form onSubmit={handleSubmit} className="am-form-body am-form-signup">
              <div className="am-row">
                <AField label="Name" icon={<User size={14}/>}>
                  <input type="text" value={name} onChange={e=>setName(e.target.value)}
                    className="am-input" placeholder="Full name"/>
                </AField>
                <AField label="College" icon={<Building2 size={14}/>}>
                  <input type="text" value={college} onChange={e=>setCollege(e.target.value)}
                    className="am-input" placeholder="Your institution"/>
                </AField>
              </div>
              <AField label="Email" icon={<Mail size={14}/>}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  className="am-input" placeholder="you@university.edu"/>
              </AField>
              <AField label="Password" icon={<Lock size={14}/>}>
                <input type="password" value={password} minLength={6} onChange={e=>setPassword(e.target.value)}
                  className="am-input" placeholder="Min 6 characters"/>
              </AField>

              <div className="am-interests">
                <span className="am-interests-label">Interests <em>(optional)</em></span>
                <div className="am-chips">
                  {INTEREST_OPTIONS.map(opt => (
                    <button key={opt} type="button" onClick={()=>toggleInterest(opt)}
                      className={`am-chip${interests.includes(opt) ? ' am-chip-on' : ''}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button disabled={loading} type="submit" className="am-btn">
                {loading && <Loader2 size={15} className="am-spin"/>}
                {loading ? 'Creating…' : 'Sign Up & Get Certificate'}
              </button>
            </form>

            <p className="am-switch-row">
              Already have an account?{' '}
              <button type="button" onClick={switchMode} className="am-switch-link">Sign in</button>
            </p>
          </div>

        </div>{/* /am-container */}
      </div>{/* /am-wrap */}

      <style>{`
        /* ── Overlay: Modern Glassmorphism ───────────────────────────────────────── */
        .am-overlay {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 998;
          background: rgba(255, 255, 255, 0.12); 
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          background-image: linear-gradient(
            to bottom, 
            rgba(255, 255, 255, 0.15), 
            rgba(224, 242, 254, 0.08)
          );
          animation: amFade 0.25s ease-out;
        }

        /* ── Idea B: Dynamic Structural Grid Background Mesh Injection ── */
        .am-grid-overlay-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.45;
          background-size: 24px 24px;
          background-image: 
            linear-gradient(to right, rgba(0, 163, 186, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 163, 186, 0.06) 1px, transparent 1px);
        }

        /* ── Floating gradient orbs ── */
        .am-orb {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(80px);
        }
        .am-orb-1 {
          top: -150px;
          left: -100px;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(0, 163, 186, 0.4) 0%, rgba(0, 163, 186, 0) 70%);
          animation: amFloat 10s ease-in-out infinite;
        }
        .am-orb-2 {
          bottom: -120px;
          right: -80px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(0, 43, 91, 0.3) 0%, rgba(0, 43, 91, 0) 70%);
          animation: amFloat 12s ease-in-out infinite reverse;
        }
        .am-orb-3 {
          top: 40%;
          left: 20%;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(0, 163, 186, 0.2) 0%, rgba(0, 163, 186, 0) 70%);
          animation: amFloat 14s ease-in-out infinite 2s;
        }

        /* ── Centering wrapper ── */
        .am-wrap {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          pointer-events: none;
        }
        .am-wrap > * {
          pointer-events: all;
        }

        /* ── Main container (Increased depth and structural height compatibility) ── */
        .am-container {
          position: relative;
          width: min(920px, 94%);
          height: 600px;
          border-radius: 32px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 163, 186, 0.25);
          box-shadow: 0 30px 60px -20px rgba(0,43,91,0.22), 0 0 0 1px rgba(255,255,255,0.8) inset;
          display: flex;
          animation: amUp 0.4s cubic-bezier(0.21, 0.98, 0.35, 1.02);
        }

        /* ── Refined Structural Diagonal Background Slash Architecture ── */
        .am-shape {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          transition: transform 0.6s cubic-bezier(0.34, 1.3, 0.64, 1);
        }
        
        /* The primary dynamic diagonal backdrop layer */
        .am-shape-1 {
          right: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(135deg, #00A3BA 0%, #00607A 45%, #002B5B 100%);
          transform: skewX(-12deg) translateX(8%);
          transform-origin: top right;
        }
        .am-container.active .am-shape-1 {
          transform: skewX(-12deg) translateX(-92%);
        }

        /* Safe layered masking line to give premium structural definition without overlapping inputs */
        .am-shape-2 {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          border-left: 2px solid rgba(0, 163, 186, 0.4);
          background: transparent;
          transform: skewX(-12deg) translateX(8%);
          transition: transform 0.6s cubic-bezier(0.34, 1.3, 0.64, 1);
        }
        .am-container.active .am-shape-2 {
          transform: skewX(-12deg) translateX(-92%);
        }

        /* ── Panel base ── */
        .am-panel {
          position: absolute;
          top: 0;
          height: 100%;
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ── FORM panels ── */
        .am-form {
          padding: 2.5rem 3rem;
          z-index: 5;
        }
        .am-login-form { left: 0; }
        .am-signup-form { right: 0; }

        .am-login-form {
          transform: translateX(0);
          opacity: 1;
          transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.35s ease;
          transition-delay: 0.08s;
        }
        .am-container.active .am-login-form {
          transform: translateX(-110%);
          opacity: 0;
          transition-delay: 0s;
        }

        .am-signup-form {
          transform: translateX(110%);
          opacity: 0;
          filter: blur(4px);
          transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.35s ease, filter 0.35s ease;
          transition-delay: 0s;
        }
        .am-container.active .am-signup-form {
          transform: translateX(0);
          opacity: 1;
          filter: blur(0);
          transition-delay: 0.08s;
        }

        /* ── INFO panels ── */
        .am-info {
          z-index: 4;
          color: #fff;
          padding: 3rem;
        }
        .am-login-info { right: 0; }
        .am-signup-info { left: 0; }

        .am-info-content {
          position: relative;
          z-index: 6;
          display: flex;
          flex-direction: column;
        }
        .am-login-info .am-info-content { align-items: flex-end; text-align: right; }
        .am-signup-info .am-info-content { align-items: flex-start; text-align: left; }

        .am-login-info {
          transform: translateX(0);
          opacity: 1;
          transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.35s ease;
          transition-delay: 0.05s;
        }
        .am-container.active .am-login-info {
          transform: translateX(110%);
          opacity: 0;
          transition-delay: 0s;
        }

        .am-signup-info {
          transform: translateX(-110%);
          opacity: 0;
          filter: blur(4px);
          transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.35s ease, filter 0.35s ease;
          transition-delay: 0s;
        }
        .am-container.active .am-signup-info {
          transform: translateX(0);
          opacity: 1;
          filter: blur(0);
          transition-delay: 0.05s;
        }

        /* ── Close button ── */
        .am-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff;
          transition: all 0.2s ease;
          z-index: 20;
        }
        .am-container.active .am-close {
          color: #002B5B;
          background: rgba(0, 163, 186, 0.08);
          border-color: rgba(0, 163, 186, 0.15);
        }
        .am-close:hover {
          background: rgba(0, 163, 186, 0.15) !important;
          transform: scale(1.05);
        }

        /* ── Badge ── */
        .am-badge {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(0, 163, 186, 0.08);
          border: 1px solid rgba(0, 163, 186, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00A3BA;
          margin-bottom: 1rem;
        }

        /* ── Typography & Gradient Headings ── */
        .am-heading {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #001A38;
          margin-bottom: 0.35rem;
        }
        .am-text-gradient {
          background: linear-gradient(to right, #00A3BA, #002B5B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .am-sub {
          font-size: 0.82rem;
          color: #52647C;
          margin-bottom: 1.5rem;
        }

        /* ── Alerts ── */
        .am-alert {
          padding: 0.6rem 0.85rem;
          border-radius: 10px;
          font-size: 0.78rem;
          margin-bottom: 1rem;
        }
        .am-alert-err {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
        .am-alert-ok {
          background: #dcfce7;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }

        /* ── Form Body Stack Controls ── */
        .am-form-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
          z-index: 5;
        }
        .am-field-gap {
          height: 0.25rem;
        }
        .am-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }

        .am-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .am-field-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #52647C;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .am-field-label svg {
          color: #00A3BA;
        }

        .am-input {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.75);
          border: 1.5px solid #E2E8F0;
          font-size: 0.88rem;
          color: #001A38;
          outline: none;
          transition: all 0.2s;
        }
        .am-input::placeholder {
          color: #A0AEC0;
        }
        .am-input:focus {
          border-color: #00A3BA;
          box-shadow: 0 0 0 3px rgba(0, 163, 186, 0.15);
          background: #ffffff;
        }

        /* ── Action Buttons ── */
        .am-btn {
          width: 100%;
          padding: 0.75rem;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #00A3BA 0%, #00607A 100%);
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 14px rgba(0, 163, 186, 0.35);
          transition: all 0.2s;
          margin-top: 0.5rem;
        }
        .am-btn:hover:not(:disabled) {
          opacity: 0.95;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 163, 186, 0.45);
        }
        .am-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ── Interests Tags section ── */
        .am-interests {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.15rem;
        }
        .am-interests-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #52647C;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .am-interests-label em {
          font-style: normal;
          opacity: 0.6;
          text-transform: none;
        }
        .am-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .am-chip {
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 500;
          border: 1.5px solid #E2E8F0;
          background: rgba(255, 255, 255, 0.6);
          color: #52647C;
          cursor: pointer;
          transition: all 0.18s;
        }
        .am-chip:hover {
          border-color: #00A3BA;
          color: #00A3BA;
          background: #fff;
        }
        .am-chip-on {
          background: rgba(0, 163, 186, 0.08);
          border-color: #00A3BA;
          color: #00A3BA;
          box-shadow: 0 0 8px rgba(0, 163, 186, 0.15);
        }

        /* ── Switch footer links ── */
        .am-switch-row {
          font-size: 0.82rem;
          color: #52647C;
          text-align: center;
          margin-top: 1.25rem;
          position: relative;
          z-index: 5;
        }
        .am-switch-link {
          color: #00A3BA;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: opacity 0.18s;
        }
        .am-switch-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        /* ── Info panel typography ── */
        .am-info-icon {
          margin-bottom: 1rem;
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.15));
        }
        .am-info-h {
          font-size: 1.95rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 0.85rem;
          text-shadow: 0 2px 14px rgba(0,43,91,0.3);
        }
        .am-info-p {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.88);
          line-height: 1.5;
          max-width: 240px;
        }

        /* Dots indicator styling */
        .am-dots {
          display: flex;
          gap: 6px;
          margin-top: 1.5rem;
        }
        .am-login-info .am-dots { justify-content: flex-end; }
        .am-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          animation: amDot 1.8s ease infinite;
        }
        .am-dots span:nth-child(2) { animation-delay: 0.3s; }
        .am-dots span:nth-child(3) { animation-delay: 0.6s; }

        /* ── Keyframes ── */
        @keyframes amFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes amUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        @keyframes amFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(4deg); }
        }
        @keyframes amDot {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        .am-spin { animation: amSpin 0.8s linear infinite; }
        @keyframes amSpin { to { transform: rotate(360deg); } }

        /* ── Responsive Mobile Layout overrides ── */
        @media (max-width: 768px) {
          .am-container {
            height: auto;
            min-height: 520px;
            width: 95%;
            overflow-y: auto;
            background: #ffffff;
          }
          .am-grid-overlay-bg { opacity: 0.25; }
          .am-panel {
            position: relative;
            width: 100%;
            height: auto;
            padding: 1.5rem;
          }
          .am-info, .am-shape, .am-orb { display: none; }
          .am-login-form, .am-signup-form { padding: 2rem 1.25rem; }
          .am-container:not(.active) .am-signup-form { display: none; }
          .am-container.active .am-login-form { display: none; }
          .am-row { grid-template-columns: 1fr; gap: 0.75rem; }
          .am-close {
            top: 0.75rem;
            right: 0.75rem;
            background: rgba(0, 163, 186, 0.1);
            color: #00A3BA;
            border: 1px solid rgba(0, 163, 186, 0.2);
          }
          .am-form-signup {
            gap: 0.75rem;
          }
          .am-heading { font-size: 1.5rem; }
        }
      `}</style>
    </>,
    document.body
  );
}

function AField({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="am-field">
      <label className="am-field-label">{icon}{label}</label>
      {children}
    </div>
  );
}