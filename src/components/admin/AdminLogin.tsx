import React, { useState } from 'react';
import { Lock, ShieldAlert, KeyRound, ArrowLeft, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNews } from '../../context/NewsContext';

export const AdminLogin: React.FC = () => {
  const { loginWithEmail, loginDemoAdmin } = useAuth();
  const { navigateToHome } = useNews();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      console.warn('Firebase login error:', err);
      setErrorMsg(err.message || 'Invalid administrator credentials. Please verify your Firebase email and password.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoAccess = () => {
    loginDemoAdmin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950/20 to-black text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-md rounded-xl border border-gray-800 shadow-2xl p-8 relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-amber-500" />

        {/* Back Button */}
        <button 
          onClick={navigateToHome}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Portal</span>
        </button>

        {/* Branding Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-red-900/40 rounded-full border border-red-800 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Lock className="w-6 h-6 text-red-400" />
          </div>
          <h1 className="font-brand text-2xl font-bold uppercase tracking-wider text-white">
            Editorial Management Portal
          </h1>
          <p className="font-serif text-xs text-gray-400 mt-1">
            Restricted access portal for authorized journalists & system administrators.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
              Admin Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@uzbekistantimes.com"
              className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
              Secret Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 font-mono"
              required
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/80 border border-red-800/80 rounded text-xs text-red-200 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-red-900 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest rounded transition-all shadow-md flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>{submitting ? 'Authenticating...' : 'Authenticate Admin Session'}</span>
          </button>
        </form>

        {/* Fallback Demo Administrator Access Note */}
        <div className="mt-8 pt-6 border-t border-gray-800/80 text-center">
          <p className="text-[11px] font-mono text-gray-400 mb-3">
            Firebase Console User Setup Active
          </p>
          <button
            onClick={handleDemoAccess}
            className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-mono rounded border border-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Demo Admin Access</span>
          </button>
        </div>
      </div>
    </div>
  );
};
