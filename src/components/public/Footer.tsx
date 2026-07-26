import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Globe, Send } from 'lucide-react';
import { useNews } from '../../context/NewsContext';

export const Footer: React.FC = () => {
  const { categories, navigateToHome, navigateToCategory, navigateToManagement, addSubscriber, settings } = useNews();
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    const ok = await addSubscriber(email);
    if (ok) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="mt-20 bg-[#0B0C0E] text-gray-300 border-t-4 border-[#8B0000] transition-colors">
      {/* Newsletter Signup Banner */}
      <div className="border-b border-gray-800 bg-gradient-to-r from-red-950/40 via-gray-900/60 to-gray-950 py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
            The Morning Briefing
          </span>
          <h2 className="font-brand text-2xl sm:text-3xl font-bold text-white mb-3 uppercase tracking-wide">
            Subscribe to Independent Central Asian Analysis
          </h2>
          <p className="font-serif text-sm text-gray-400 max-w-xl mx-auto mb-6 leading-relaxed">
            Get essential daily news, investigative reports, and geopolitical intelligence delivered directly to your inbox every morning at 7:00 AM Tashkent Time.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email address..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8B0000]"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#8B0000] hover:bg-[#6b0000] text-white font-bold text-xs uppercase tracking-widest rounded transition-colors shadow shrink-0"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <p className="mt-3 text-xs text-emerald-400 font-medium flex items-center justify-center gap-1">
              <Check className="w-4 h-4" /> Welcome! You are now subscribed to The Uzbekistan Times Morning Briefing.
            </p>
          )}
        </div>
      </div>

      {/* Main Footer Links & Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
        {/* Brand & Editorial Principles */}
        <div className="md:col-span-5 space-y-4">
          <button onClick={navigateToHome} className="text-left focus:outline-none">
            <h3 className="font-brand text-2xl font-black tracking-tight text-white uppercase">
              {settings.siteName}
            </h3>
          </button>
          <p className="font-serif text-gray-400 leading-relaxed max-w-md">
            The Uzbekistan Times is an independent international news organization dedicated to rigorous investigative journalism, objective political commentary, and cultural preservation across Central Asia and Eurasia.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Member of International Trust in Journalism Alliance</span>
          </div>
        </div>

        {/* Editorial Desks */}
        <div className="md:col-span-4">
          <h4 className="font-brand font-bold text-white uppercase tracking-wider text-sm mb-4 border-b border-gray-800 pb-2">
            News Desks
          </h4>
          <div className="grid grid-cols-2 gap-2 text-gray-400 font-medium">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigateToCategory(cat.slug)}
                className="hover:text-red-400 text-left py-1 transition-colors"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bureau Locations & Standards */}
        <div className="md:col-span-3 space-y-3 text-gray-400">
          <h4 className="font-brand font-bold text-white uppercase tracking-wider text-sm mb-4 border-b border-gray-800 pb-2">
            Global Bureaus
          </h4>
          <p><strong className="text-white">Tashkent:</strong> Amir Timur Avenue, 100000</p>
          <p><strong className="text-white">Samarkand:</strong> University Boulevard, 140100</p>
          <p><strong className="text-white">Editorial Contact:</strong> {settings.contactEmail}</p>
          <div className="pt-2 flex items-center gap-3">
            {settings.socialLinks.telegram && (
              <a href={settings.socialLinks.telegram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">
                Telegram
              </a>
            )}
            {settings.socialLinks.twitter && (
              <a href={settings.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">
                Twitter/X
              </a>
            )}
            {settings.socialLinks.facebook && (
              <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black py-4 px-4 sm:px-8 border-t border-gray-900 text-center font-mono text-[11px] text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} The Uzbekistan Times Publishing House. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span>Privacy Policy • Terms of Service</span>
            <span>•</span>
            <button 
              onClick={navigateToManagement} 
              className="text-gray-400 hover:text-red-400 underline transition-colors font-sans font-medium"
            >
              Staff CMS / Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
