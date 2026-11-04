import { useState } from 'react';
import { Lock, Mail, Loader2, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../lib/auth';

export function AdminLogin({ onBack }: { onBack: () => void }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await signIn(email.trim(), password);
    if (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-20">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-silver-300 transition-colors hover:text-electric-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </button>

        <div className="glass-strong rounded-3xl p-8 shadow-glass">
          <div className="mb-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-electric-700 shadow-glow">
              <ShieldCheck className="h-7 w-7 text-white" />
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold text-white">Admin Login</h1>
            <p className="mt-2 text-sm text-silver-300">
              Sign in to manage testimonials and review submissions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-silver-300">
                Email
              </span>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hmtechnologies.co.ke"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-white/10 bg-navy-900/60 py-3 pl-10 pr-4 text-sm text-white placeholder:text-silver-400 focus:border-electric-500/50 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-silver-300">
                Password
              </span>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-navy-900/60 py-3 pl-10 pr-4 text-sm text-white placeholder:text-silver-400 focus:border-electric-500/50 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
                />
              </div>
            </label>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-70"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>
              ) : (
                <>Sign In</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
