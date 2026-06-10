// src/components/AuthModal.tsx
import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [college, setCollege]   = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const toggleInterest = (i: string) =>
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const reset = () => {
    setEmail(''); setPassword(''); setName('');
    setCollege(''); setInterests([]); setError(''); setSuccess('');
  };

  const switchMode = () => { reset(); setIsLogin(v => !v); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!email.trim() || !password.trim()) throw new Error('Please fill in your mail and password.');

      if (isLogin) {
        // ── LOGIN ──────────────────────────────────────────────────────────
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw new Error(authError.message);
        onAuthenticated();

      } else {
        // ── SIGN UP ────────────────────────────────────────────────────────
        if (!name.trim())    throw new Error('Please enter your candidate name.');
        if (!college.trim()) throw new Error('Please enter your college name.');
      
        // Pass fields inside metadata options. The secure DB trigger handles
        // creating the profile and awarding the 'early_adopter' badge automatically.
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name.trim(),
              college: college.trim(),
              interests: interests
            }
          }
        });
      
        if (authError) throw new Error(authError.message);
        if (!data.user)      throw new Error('Sign-up failed. Please try again.');
      
        setSuccess('Account created! You are now signed in.');
        setTimeout(() => { onAuthenticated(); }, 1200);
      }

    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-transparent p-4 pt-24">
      
      <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-[0_0_50px_rgba(0,0,0,0.15)] p-6 relative max-h-[80vh] overflow-y-auto">

        <button
          onClick={() => { reset(); onClose(); }}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="size-5" />
        </button>

        <h2 className="text-2xl font-bold font-display mb-1">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          {isLogin
            ? 'Sign in to access your profile and certificates.'
            : 'Sign up to get certificates and personalized recommendations.'}
        </p>

        {error   && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg mb-4">{error}</div>}
        {success && <div className="p-3 bg-green-500/10 text-green-400 text-sm rounded-lg mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Sign-up only fields */}
          {!isLogin && (
            <>
              <Field label="Candidate Name">
                <input
                  type="text" value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-base" placeholder="Enter Candidate Name"
                />
              </Field>
              <Field label="College Name">
                <input
                  type="text" value={college}
                  onChange={e => setCollege(e.target.value)}
                  className="input-base" placeholder="Enter College Name"
                />
              </Field>
            </>
          )}

          <Field label="Mail">
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-base" placeholder="example@gmail.com"
            />
          </Field>

          <Field label="Password">
            <input
              type="password" value={password} minLength={6}
              onChange={e => setPassword(e.target.value)}
              className="input-base" placeholder="••••••••"
            />
          </Field>

          {!isLogin && (
            <div className="space-y-2 pt-1">
              <label className="text-xs font-medium text-muted-foreground">
                Interests <span className="text-muted-foreground/60">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map(interest => (
                  <button
                    key={interest} type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${
                      interests.includes(interest)
                        ? 'bg-cyan/20 border-cyan text-cyan'
                        : 'bg-secondary border-border text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            disabled={loading} type="submit"
            className="w-full py-3 rounded-xl bg-cyan text-cyan-foreground font-semibold mt-4
                       hover:bg-cyan/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? 'Please wait…' : isLogin ? 'Sign In' : 'Sign Up & Get Certificate'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={switchMode} className="text-cyan hover:underline font-medium">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>

      <style>{`.input-base { width: 100%; padding: 0.625rem; border-radius: 0.5rem;
        background: hsl(var(--secondary) / 0.5); border: 1px solid hsl(var(--border));
        font-size: 0.875rem; color: hsl(var(--foreground)); outline: none; }
        .input-base:focus { border-color: hsl(var(--cyan)); }`}
      </style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}