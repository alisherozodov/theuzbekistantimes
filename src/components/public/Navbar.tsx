import React from 'react';
import { Radio, ChevronRight } from 'lucide-react';
import { useNews } from '../../context/NewsContext';

export const Navbar: React.FC = () => {
  const { 
    categories, 
    activeCategory, 
    currentRoute, 
    settings, 
    navigateToHome, 
    navigateToCategory,
    navigateToArticle 
  } = useNews();

  return (
    <div className="sticky top-0 z-30 w-full bg-[#F9F9F9]/95 dark:bg-[#0F0F10]/95 backdrop-blur-md border-b border-gray-300 dark:border-gray-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Navigation Categories Scrollbar */}
        <nav className="flex items-center justify-between overflow-x-auto no-scrollbar py-2 space-x-1 sm:space-x-2 text-xs font-semibold tracking-wide border-b border-gray-200/60 dark:border-gray-900">
          <button
            onClick={navigateToHome}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap uppercase tracking-widest text-[11px] ${
              currentRoute === 'home' 
                ? 'bg-[#8B0000] text-white dark:bg-red-800' 
                : 'text-gray-800 dark:text-gray-200 hover:text-[#8B0000] dark:hover:text-red-400'
            }`}
          >
            Home
          </button>

          {categories.map((cat) => {
            const isActive = currentRoute === 'category' && activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => navigateToCategory(cat.slug)}
                className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap uppercase tracking-widest text-[11px] ${
                  isActive 
                    ? 'bg-[#8B0000] text-white dark:bg-red-800' 
                    : 'text-gray-800 dark:text-gray-200 hover:text-[#8B0000] dark:hover:text-red-400'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </nav>

        {/* Breaking News Ticker Banner */}
        {settings.breakingNewsActive && settings.breakingNewsText && (
          <div className="flex items-center gap-3 py-1.5 text-xs border-t border-gray-100 dark:border-gray-900">
            <div className="flex items-center gap-1.5 bg-[#8B0000] text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-widest uppercase animate-pulse shrink-0 shadow-xs">
              <Radio className="w-3 h-3" />
              <span>Breaking</span>
            </div>

            <div className="overflow-hidden whitespace-nowrap w-full">
              {settings.breakingNewsLink ? (
                <button
                  onClick={() => {
                    const slug = settings.breakingNewsLink?.replace('/article/', '') || '';
                    if (slug) navigateToArticle(slug);
                  }}
                  className="group inline-flex items-center gap-1 font-medium text-[#1A1A1A] dark:text-gray-100 hover:text-[#8B0000] dark:hover:text-red-400 transition-colors text-left"
                >
                  <span className="truncate text-xs">{settings.breakingNewsText}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8B0000] dark:text-red-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              ) : (
                <span className="font-medium text-[#1A1A1A] dark:text-gray-100 truncate block text-xs">
                  {settings.breakingNewsText}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
