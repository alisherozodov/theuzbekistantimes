import React, { useState } from 'react';
import { Settings, Save, Check, Radio } from 'lucide-react';
import { useNews } from '../../context/NewsContext';

export const SiteSettingsManager: React.FC = () => {
  const { settings, updateSiteSettings } = useNews();

  const [siteName, setSiteName] = useState<string>(settings.siteName);
  const [tagline, setTagline] = useState<string>(settings.tagline);
  const [breakingNewsActive, setBreakingNewsActive] = useState<boolean>(settings.breakingNewsActive);
  const [breakingNewsText, setBreakingNewsText] = useState<string>(settings.breakingNewsText);
  const [breakingNewsLink, setBreakingNewsLink] = useState<string>(settings.breakingNewsLink || '');
  const [contactEmail, setContactEmail] = useState<string>(settings.contactEmail);
  const [telegram, setTelegram] = useState<string>(settings.socialLinks.telegram || '');
  const [twitter, setTwitter] = useState<string>(settings.socialLinks.twitter || '');
  const [facebook, setFacebook] = useState<string>(settings.socialLinks.facebook || '');

  const [saved, setSaved] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings({
      siteName,
      tagline,
      breakingNewsActive,
      breakingNewsText,
      breakingNewsLink,
      contactEmail,
      socialLinks: {
        telegram,
        twitter,
        facebook
      }
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="pb-4 border-b border-gray-800">
        <h1 className="font-brand text-2xl font-bold uppercase tracking-wider text-white">
          Publication Site Settings
        </h1>
        <p className="font-serif text-xs text-gray-400 mt-1">
          Configure site metadata, breaking news banner, editorial emails, and social channels.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Branding Settings */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
          <h2 className="font-brand font-bold text-sm uppercase text-white pb-2 border-b border-gray-800">
            Masthead Branding
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Publication Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-white focus:outline-none focus:border-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Editorial Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-white focus:outline-none focus:border-red-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Breaking News Ticker Settings */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <h2 className="font-brand font-bold text-sm uppercase text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-500" />
              Live Breaking News Alert Banner
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={breakingNewsActive}
                onChange={(e) => setBreakingNewsActive(e.target.checked)}
                className="rounded bg-gray-950 border-gray-800 text-red-600 focus:ring-0"
              />
              <span className="text-xs font-mono text-gray-300 font-bold">Active Banner</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
              Alert Banner Text
            </label>
            <input
              type="text"
              value={breakingNewsText}
              onChange={(e) => setBreakingNewsText(e.target.value)}
              placeholder="LIVE: High-speed rail corridor expansion between Tashkent and Samarkand officially opened"
              className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
              Optional Target Story Link
            </label>
            <input
              type="text"
              value={breakingNewsLink}
              onChange={(e) => setBreakingNewsLink(e.target.value)}
              placeholder="/article/silk-road-high-speed-rail-expansion-samarkand"
              className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-gray-300 font-mono focus:outline-none focus:border-red-600"
            />
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
          <h2 className="font-brand font-bold text-sm uppercase text-white pb-2 border-b border-gray-800">
            Bureau Contact & Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Editorial Bureau Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Telegram Channel Link
              </label>
              <input
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="https://t.me/uzbekistantimes"
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-gray-300 font-mono focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Twitter / X Profile
              </label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/uzbekistantimes"
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-gray-300 font-mono focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Facebook Page
              </label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/uzbekistantimes"
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded text-xs text-gray-300 font-mono focus:outline-none focus:border-red-600"
              />
            </div>
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono rounded flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Publication settings saved!</span>
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Publication Settings</span>
        </button>
      </form>
    </div>
  );
};
