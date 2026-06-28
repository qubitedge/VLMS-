import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, FlaskConical, GraduationCap, Mail, Lock, User, Building2, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Props = {
  isOpen: boolean;
  experimentId: string;
  onSkip: () => void;
  onAuthenticated: (userId: string) => void;
};

const INTEREST_OPTIONS = [
  "AI", "Web Development", "Data Structures",
  "DBMS", "Machine Learning", "System Design"
];

export function PostSolveAuthModal({ isOpen, experimentId, onSkip, onAuthenticated }: Props) {
  const [mode, setMode] = useState<'prompt' | 'login' | 'signup'>('prompt');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setEmail(''); setPassword(''); setName('');
    setCollege(''); setInterests([]); setError('');
  };

  const toggleInterest = (i: string) =>
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw new Error(authError.message);
      if (data.user) onAuthenticated(data.user.id);
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      if (!name.trim()) throw new Error('Please enter your name.');
      if (!college.trim()) throw new Error('Please enter your college.');
      const { data, error: authError } = await supabase.auth.signUp({
        email, password,
        options: { data: { name: name.trim(), college: college.trim(), interests } }
      });
      if (authError) throw new Error(authError.message);
      if (!data.user) throw new Error('Sign-up failed. Please try again.');
      onAuthenticated(data.user.id);
    } catch (err: any) {
      setError(err.message || 'Sign-up failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="psam-overlay" />
      <div className="psam-wrap" role="dialog" aria-modal="true">
        <div className="psam-box">
          {/* Close / Skip always available */}
          <button className="psam-close" onClick={() => { reset(); onSkip(); }} aria-label="Skip">
            <X size={16} />
          </button>

          {mode === 'prompt' && (
            <div className="psam-prompt">
              <div className="psam-trophy"><Trophy size={36} /></div>
              <h2 className="psam-h">Great work! 🎉</h2>
              <p className="psam-p">
                Sign in or create a free account to save your progress, earn badges, and get a certificate.
              </p>
              <div className="psam-actions">
                <button className="psam-btn-primary" onClick={() => setMode('login')}>
                  Sign In
                </button>
                <button className="psam-btn-secondary" onClick={() => setMode('signup')}>
                  Create Account
                </button>
                <button className="psam-btn-skip" onClick={() => { reset(); onSkip(); }}>
                  Skip for now
                </button>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="psam-form-wrap">
              <div className="psam-badge"><FlaskConical size={18} /></div>
              <h2 className="psam-h">Welcome Back</h2>
              <p className="psam-p">Sign in to save this experiment under your account.</p>
              {error && <div className="psam-err">{error}</div>}
              <form onSubmit={handleLogin} className="psam-form">
                <label className="psam-label">Email</label>
                <input className="psam-input" type="email" placeholder="you@university.edu"
                  value={email} onChange={e => setEmail(e.target.value)} />
                <label className="psam-label">Password</label>
                <input className="psam-input" type="password" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} minLength={6} />
                <button disabled={loading} type="submit" className="psam-btn-primary" style={{ marginTop: '0.5rem' }}>
                  {loading ? <><Loader2 size={14} className="psam-spin" /> Signing in…</> : 'Sign In & Save'}
                </button>
              </form>
              <p className="psam-switch">
                No account?{' '}
                <button className="psam-link" onClick={() => { setError(''); setMode('signup'); }}>
                  Create one
                </button>
              </p>
              <button className="psam-btn-skip" onClick={() => { reset(); onSkip(); }}>Skip for now</button>
            </div>
          )}

          {mode === 'signup' && (
            <div className="psam-form-wrap">
              <div className="psam-badge"><GraduationCap size={18} /></div>
              <h2 className="psam-h">Create Account</h2>
              <p className="psam-p">Join thousands of students and save your progress.</p>
              {error && <div className="psam-err">{error}</div>}
              <form onSubmit={handleSignup} className="psam-form">
                <div className="psam-row">
                  <div>
                    <label className="psam-label">Name</label>
                    <input className="psam-input" type="text" placeholder="Full name"
                      value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="psam-label">College</label>
                    <input className="psam-input" type="text" placeholder="Your institution"
                      value={college} onChange={e => setCollege(e.target.value)} />
                  </div>
                </div>
                <label className="psam-label">Email</label>
                <input className="psam-input" type="email" placeholder="you@university.edu"
                  value={email} onChange={e => setEmail(e.target.value)} />
                <label className="psam-label">Password</label>
                <input className="psam-input" type="password" placeholder="Min 6 characters"
                  value={password} onChange={e => setPassword(e.target.value)} minLength={6} />

                <div className="psam-interests-label">Interests <em>(optional)</em></div>
                <div className="psam-chips">
                  {INTEREST_OPTIONS.map(opt => (
                    <button key={opt} type="button" onClick={() => toggleInterest(opt)}
                      className={`psam-chip${interests.includes(opt) ? ' psam-chip-on' : ''}`}>
                      {opt}
                    </button>
                  ))}
                </div>
                <button disabled={loading} type="submit" className="psam-btn-primary" style={{ marginTop: '0.5rem' }}>
                  {loading ? <><Loader2 size={14} className="psam-spin" /> Creating…</> : 'Sign Up & Save'}
                </button>
              </form>
              <p className="psam-switch">
                Have an account?{' '}
                <button className="psam-link" onClick={() => { setError(''); setMode('login'); }}>
                  Sign in
                </button>
              </p>
              <button className="psam-btn-skip" onClick={() => { reset(); onSkip(); }}>Skip for now</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .psam-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          animation: psamFade 0.2s ease;
        }
        .psam-wrap {
          position: fixed; inset: 0; z-index: 1001;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem; pointer-events: none;
        }
        .psam-wrap > * { pointer-events: all; }
        .psam-box {
          position: relative;
          width: min(480px, 96%);
          background: #fff;
          border-radius: 24px;
          padding: 2.5rem 2rem;
          box-shadow: 0 25px 60px rgba(0,0,0,0.2);
          animation: psamUp 0.35s cubic-bezier(0.21,0.98,0.35,1.02);
        }
        .psam-close {
          position: absolute; top: 1rem; right: 1rem;
          width: 30px; height: 30px; border-radius: 50%;
          border: 1px solid #e2e8f0; background: #f8fafc;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #64748b; transition: all 0.2s;
        }
        .psam-close:hover { background: #fee2e2; color: #dc2626; }
        .psam-prompt { text-align: center; }
        .psam-trophy {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.25rem; color: #d97706;
          box-shadow: 0 4px 16px rgba(217,119,6,0.2);
        }
        .psam-badge {
          width: 40px; height: 40px; border-radius: 12px;
          background: rgba(0,163,186,0.08);
          border: 1px solid rgba(0,163,186,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #00A3BA; margin-bottom: 1rem;
        }
        .psam-h {
          font-size: 1.5rem; font-weight: 700;
          color: #001A38; margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .psam-p {
          font-size: 0.875rem; color: #52647C;
          line-height: 1.6; margin-bottom: 1.75rem;
          max-width: 340px; margin-left: auto; margin-right: auto;
        }
        .psam-actions {
          display: flex; flex-direction: column; gap: 0.65rem;
        }
        .psam-btn-primary {
          width: 100%; padding: 0.75rem;
          border-radius: 12px; border: none;
          background: linear-gradient(135deg, #00A3BA 0%, #00607A 100%);
          color: #fff; font-size: 0.9rem; font-weight: 600;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 0.5rem;
          box-shadow: 0 4px 14px rgba(0,163,186,0.3);
          transition: all 0.2s;
        }
        .psam-btn-primary:hover:not(:disabled) {
          opacity: 0.92; transform: translateY(-1px);
        }
        .psam-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .psam-btn-secondary {
          width: 100%; padding: 0.72rem;
          border-radius: 12px;
          border: 1.5px solid #00A3BA;
          background: rgba(0,163,186,0.05);
          color: #00A3BA; font-size: 0.9rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
        }
        .psam-btn-secondary:hover { background: rgba(0,163,186,0.12); }
        .psam-btn-skip {
          width: 100%; padding: 0.6rem;
          background: none; border: none;
          color: #94a3b8; font-size: 0.82rem;
          cursor: pointer; transition: color 0.18s;
        }
        .psam-btn-skip:hover { color: #64748b; text-decoration: underline; }
        .psam-form-wrap { }
        .psam-form { display: flex; flex-direction: column; gap: 0.6rem; }
        .psam-label {
          font-size: 0.7rem; font-weight: 600; color: #52647C;
          text-transform: uppercase; letter-spacing: 0.05em;
          margin-bottom: 0.2rem; display: block;
        }
        .psam-input {
          width: 100%; padding: 0.6rem 0.85rem;
          border-radius: 10px; border: 1.5px solid #e2e8f0;
          font-size: 0.875rem; color: #001A38;
          outline: none; transition: all 0.2s; box-sizing: border-box;
          background: #f8fafc;
        }
        .psam-input:focus {
          border-color: #00A3BA;
          box-shadow: 0 0 0 3px rgba(0,163,186,0.12);
          background: #fff;
        }
        .psam-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .psam-err {
          padding: 0.55rem 0.8rem; border-radius: 8px;
          background: #fee2e2; color: #dc2626;
          border: 1px solid #fecaca; font-size: 0.78rem;
          margin-bottom: 0.25rem;
        }
        .psam-switch {
          font-size: 0.82rem; color: #52647C;
          text-align: center; margin-top: 1rem;
        }
        .psam-link {
          color: #00A3BA; font-weight: 600;
          background: none; border: none; cursor: pointer;
          padding: 0;
        }
        .psam-link:hover { text-decoration: underline; }
        .psam-interests-label {
          font-size: 0.7rem; font-weight: 600; color: #52647C;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .psam-interests-label em { font-style: normal; opacity: 0.6; text-transform: none; }
        .psam-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.4rem 0; }
        .psam-chip {
          padding: 0.3rem 0.65rem; border-radius: 999px;
          font-size: 0.72rem; font-weight: 500;
          border: 1.5px solid #e2e8f0;
          background: rgba(255,255,255,0.6); color: #52647C;
          cursor: pointer; transition: all 0.18s;
        }
        .psam-chip:hover { border-color: #00A3BA; color: #00A3BA; }
        .psam-chip-on {
          background: rgba(0,163,186,0.08);
          border-color: #00A3BA; color: #00A3BA;
        }
        .psam-spin { animation: psamSpin 0.8s linear infinite; }
        @keyframes psamFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes psamUp {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        @keyframes psamSpin { to { transform: rotate(360deg); } }
      `}</style>
    </>,
    document.body
  );
}