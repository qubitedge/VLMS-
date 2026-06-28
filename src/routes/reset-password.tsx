// src/routes/reset-password.tsx
import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { Loader2, KeyRound } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password — VLMS" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword]       = useState('');
  const [confirm, setConfirm]         = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState('');

  useEffect(() => {
    // Supabase puts access_token in the URL hash for recovery emails.
    // onAuthStateChange will fire PASSWORD_RECOVERY once it parses it.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY' && session) {
          setSessionReady(true);
        }
      }
    );

    // Fallback: if there's already an active session (user re-opened the
    // link in the same browser), mark ready immediately.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    // Safety timeout — if token never fires, show an error rather than
    // spinning forever.
    const timeout = setTimeout(() => {
      setSessionReady(prev => {
        if (!prev) setSessionError('This reset link has expired or is invalid. Please request a new one.');
        return prev;
      });
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 6)  { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    setError('');
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) { setError(updateError.message); return; }

    setSuccess(true);
    setTimeout(() => navigate({ to: "/profile" }), 2500);
  };

  // ── Error state (expired / invalid link) ─────────────────────────────────
  if (sessionError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-md p-8 rounded-2xl border border-red-200 bg-red-50 text-center space-y-4">
          <p className="text-red-600 font-medium">{sessionError}</p>
          <button
            onClick={() => navigate({ to: "/profile" })}
            className="px-4 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  // ── Waiting for Supabase to parse the hash token ─────────────────────────
  if (!sessionReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="size-8 animate-spin text-cyan-500" />
        <p className="text-muted-foreground text-sm">Verifying reset link…</p>
      </div>
    );
  }

  // ── Reset form ────────────────────────────────────────────────────────────
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <KeyRound className="size-6 text-cyan-500" />
          <h1 className="text-2xl font-display font-bold">Set New Password</h1>
        </div>

        {success ? (
          <p className="text-green-500 text-sm flex items-center gap-2">
            ✓ Password updated! Redirecting to your profile…
          </p>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">New Password</label>
              <input
                required type="password" value={password} minLength={6}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-secondary/50 border border-border text-sm"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Confirm Password</label>
              <input
                required type="password" value={confirm} minLength={6}
                onChange={e => setConfirm(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-secondary/50 border border-border text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-cyan-500 text-white font-semibold
                         hover:bg-cyan-600 transition-colors disabled:opacity-60
                         flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}