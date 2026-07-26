import React, { useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { useNews } from '../../context/NewsContext';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    articles, 
    navigateToArticle 
  } = useNews();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredArticles = articles.filter((art) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase().trim();
    return (
      art.title.toLowerCase().includes(q) ||
      art.subtitle.toLowerCase().includes(q) ||
      art.categoryName.toLowerCase().includes(q) ||
      art.authorName.toLowerCase().includes(q) ||
      art.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 bg-gray-50 dark:bg-gray-950">
          <Search className="w-5 h-5 text-red-900 dark:text-red-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news, topics, authors, tags..."
            className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 text-base font-medium focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/60">
          {!searchQuery.trim() ? (
            <div className="py-8 text-center text-gray-400 text-sm font-serif italic">
              Type keywords above to search across all stories, authors, and categories.
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400 font-serif">
              No matching stories found for "<strong className="text-gray-900 dark:text-gray-100">{searchQuery}</strong>".
            </div>
          ) : (
            <>
              <div className="pb-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
                Found {filteredArticles.length} matching story{filteredArticles.length > 1 ? 's' : ''}
              </div>
              {filteredArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => {
                    navigateToArticle(art.slug);
                    setIsSearchOpen(false);
                  }}
                  className="group py-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 px-2 rounded transition-colors"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="font-bold text-red-900 dark:text-red-400 uppercase tracking-wider">
                        {art.categoryName}
                      </span>
                      <span className="text-gray-400 font-mono text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readingTime} min read
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base text-gray-900 dark:text-gray-100 group-hover:text-red-900 dark:group-hover:text-red-400 transition-colors line-clamp-1">
                      {art.title}
                    </h4>
                    <p className="font-serif text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      {art.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-900 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
