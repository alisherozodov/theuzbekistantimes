import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Globe, 
  CloudSun, 
  TrendingUp, 
  Type,
  Lock
} from 'lucide-react';
import { useNews } from '../../context/NewsContext';

export const Header: React.FC = () => {
  const { 
    settings, 
    bookmarks, 
    setIsSearchOpen, 
    navigateToHome, 
    navigateToBookmarks,
    navigateToManagement,
    updateSiteSettings,
    darkMode,
    toggleDarkMode
  } = useNews();

  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0: Small, 1: Normal, 2: Large
  const [currentDateString, setCurrentDateString] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDateString(now.toLocaleDateString('en-US', options));
  }, []);

  const cycleFontSize = () => {
    const next = (fontSizeLevel + 1) % 3;
    setFontSizeLevel(next);
    if (next === 0) {
      document.documentElement.style.fontSize = '14px';
    } else if (next === 1) {
      document.documentElement.style.fontSize = '16px';
    } else {
      document.documentElement.style.fontSize = '18px';
    }
  };

  const toggleEdition = () => {
    const newEdition = settings.edition === 'Uzbekistan' ? 'Global' : 'Uzbekistan';
    updateSiteSettings({ edition: newEdition });
  };

  return (
    <header className="w-full bg-[#F9F9F9] dark:bg-[#0F0F10] text-[#1A1A1A] dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 transition-colors">
      {/* Top Utility Bar */}
      <div className="border-b border-gray-200/80 dark:border-gray-800/80 bg-gray-100/60 dark:bg-gray-950/80 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Date & Location & Weather */}
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <span className="font-mono text-[11px] font-medium tracking-tight text-gray-500 uppercase">{currentDateString}</span>
            <span className="hidden sm:inline-block text-gray-300 dark:text-gray-700">|</span>
            <div className="hidden md:flex items-center gap-2">
              <CloudSun className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Tashkent 28°C</span>
              <span className="text-gray-400">•</span>
              <span>Samarkand 26°C</span>
            </div>
            <span className="hidden lg:inline-block text-gray-300 dark:text-gray-700">|</span>
            <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-gray-500 dark:text-gray-400">
              <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>USD/UZS 12,850</span>
              <span className="text-gray-400">/</span>
              <span>EUR/UZS 13,920</span>
            </div>
          </div>

          {/* Right: Edition, Theme, Font, Search & Bookmarks */}
          <div className="flex items-center gap-3">
            {/* Edition Toggle */}
            <button 
              onClick={toggleEdition}
              className="flex items-center gap-1 hover:text-[#8B0000] dark:hover:text-red-400 transition-colors font-medium px-2 py-0.5 rounded bg-gray-200/60 dark:bg-gray-800/60 text-[11px]"
              title="Switch Edition"
            >
              <Globe className="w-3 h-3 text-[#8B0000] dark:text-red-400" />
              <span>Edition: <strong className="text-[#8B0000] dark:text-red-400">{settings.edition}</strong></span>
            </button>

            {/* Font Size Adjuster */}
            <button
              onClick={cycleFontSize}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
              title="Adjust Text Size"
            >
              <Type className="w-3.5 h-3.5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-200/80 dark:bg-gray-800/80 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200 text-[11px] font-medium"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Saved Articles / Bookmarks */}
            <button
              onClick={navigateToBookmarks}
              className="relative flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 font-medium"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#8B0000] dark:text-red-400" />
              <span className="hidden sm:inline text-xs">Saved</span>
              {bookmarks.length > 0 && (
                <span className="bg-[#8B0000] text-white dark:bg-red-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Admin / Staff Portal Link */}
            <button
              onClick={navigateToManagement}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 text-xs font-mono"
              title="Access Editorial Management CMS"
            >
              <Lock className="w-3 h-3 text-[#8B0000] dark:text-red-400" />
              <span>Admin</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#8B0000] hover:bg-[#6b0000] text-white text-xs font-semibold rounded transition-all shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Newspaper Header Masthead */}
      <div className="py-6 px-4 sm:px-8 text-center border-b border-gray-200 dark:border-gray-800 relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          {/* Subtle Top Issue Banner */}
          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 mb-2 font-medium">
            <span>Est. 2026</span>
            <span>•</span>
            <span>Tashkent • Samarkand • Bukhara • Global</span>
            <span>•</span>
            <span>No. 1,482</span>
          </div>

          {/* Title Branding */}
          <button 
            onClick={navigateToHome}
            className="group inline-block text-center focus:outline-none"
          >
            <h1 className="font-brand text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#8B0000] dark:text-red-400 group-hover:text-black dark:group-hover:text-white transition-colors uppercase py-1">
              {settings.siteName || "The Uzbekistan Times"}
            </h1>
          </button>

          {/* Tagline / Subtitle */}
          <p className="font-serif italic text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1.5 max-w-2xl mx-auto">
            "{settings.tagline || "Independent Global Journalism & Voice of Central Asia"}"
          </p>
        </div>
      </div>
    </header>
  );
};
