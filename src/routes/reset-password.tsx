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
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  // Supabase puts the token in the URL hash — we need to let it process
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setSessionReady(true);
    });
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
    setTimeout(() => navigate({ to: "/profile" }), 2000);
  };

  if (!sessionReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="size-8 animate-spin text-cyan" />
        <p className="text-muted-foreground text-sm">Verifying reset link…</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <KeyRound className="size-6 text-cyan" />
          <h1 className="text-2xl font-display font-bold">Set New Password</h1>
        </div>

        {success ? (
          <p className="text-green-400 text-sm">
            ✓ Password updated! Redirecting to your profile…
          </p>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {error && <p className="text-destructive text-sm">{error}</p>}
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
              className="w-full py-3 rounded-xl bg-cyan text-cyan-foreground font-semibold
                         hover:bg-cyan/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
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