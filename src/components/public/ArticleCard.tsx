import React from 'react';
import { Clock, Bookmark, Eye, ArrowUpRight } from 'lucide-react';
import { Article } from '../../types/news';
import { useNews } from '../../context/NewsContext';

interface ArticleCardProps {
  article: Article;
  variant?: 'hero' | 'medium' | 'compact' | 'horizontal' | 'minimal';
  showCategory?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  variant = 'medium',
  showCategory = true
}) => {
  const { navigateToArticle, bookmarks, toggleBookmark } = useNews();
  const isBookmarked = bookmarks.includes(article.id);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const timeAgo = (() => {
    const diffHours = Math.round((Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return formattedDate;
  })();

  if (variant === 'hero') {
    return (
      <div className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            
            {article.breakingNews && (
              <span className="absolute top-4 left-4 bg-[#8B0000] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-md z-10">
                Breaking News
              </span>
            )}
          </div>

          <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                {showCategory && (
                  <span className="font-bold text-[#8B0000] dark:text-red-400 uppercase tracking-widest text-[11px]">
                    {article.categoryName}
                  </span>
                )}
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3 h-3" />
                  {timeAgo} • {article.readingTime} min read
                </span>
              </div>

              <button 
                onClick={() => navigateToArticle(article.slug)}
                className="text-left group/btn focus:outline-none"
              >
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#1A1A1A] dark:text-gray-50 group-hover/btn:text-[#8B0000] dark:group-hover/btn:text-red-400 transition-colors leading-tight mb-3">
                  {article.title}
                </h2>
              </button>

              <p className="font-serif text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed mb-6">
                {article.subtitle}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2.5">
                {article.authorAvatar && (
                  <img src={article.authorAvatar} alt={article.authorName} className="w-7 h-7 rounded-full object-cover" />
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-200">{article.authorName}</p>
                  <p className="text-[10px] text-gray-400">{article.authorRole}</p>
                </div>
              </div>

              <button
                onClick={() => toggleBookmark(article.id)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-900 dark:hover:text-red-400 transition-colors"
                title={isBookmarked ? "Remove Bookmark" : "Save Article"}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-red-900 text-red-900 dark:fill-red-500 dark:text-red-500" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="group flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-[#8B0000]/40 dark:hover:border-red-500/30 transition-all shadow-xs">
        <div className="sm:w-1/3 shrink-0 aspect-[16/10] overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="sm:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              {showCategory && (
                <span className="font-bold text-[#8B0000] dark:text-red-400 uppercase tracking-widest text-[11px]">
                  {article.categoryName}
                </span>
              )}
              <span className="text-gray-400 font-mono text-[11px]">{timeAgo}</span>
            </div>
            <button 
              onClick={() => navigateToArticle(article.slug)}
              className="text-left focus:outline-none"
            >
              <h3 className="font-display font-bold text-base sm:text-lg text-[#1A1A1A] dark:text-gray-100 group-hover:text-[#8B0000] dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                {article.title}
              </h3>
            </button>
            <p className="font-serif text-gray-600 dark:text-gray-300 text-xs line-clamp-2 mt-1.5 leading-relaxed">
              {article.subtitle}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
            <span>By {article.authorName}</span>
            <button 
              onClick={() => toggleBookmark(article.id)}
              className="hover:text-[#8B0000] dark:hover:text-red-400"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-[#8B0000] text-[#8B0000]" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="group py-3 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mb-1">
          {showCategory && (
            <span className="font-bold text-[#8B0000] dark:text-red-400 uppercase tracking-widest text-[11px]">
              {article.categoryName}
            </span>
          )}
          <span className="font-mono">{timeAgo}</span>
        </div>
        <button 
          onClick={() => navigateToArticle(article.slug)}
          className="text-left focus:outline-none w-full"
        >
          <h4 className="font-display font-bold text-sm text-[#1A1A1A] dark:text-gray-100 group-hover:text-[#8B0000] dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h4>
        </button>
      </div>
    );
  }

  // Default 'medium' grid card
  return (
    <div className="group flex flex-col justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {article.breakingNews && (
            <span className="absolute top-3 left-3 bg-[#8B0000] text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow">
              Breaking
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            {showCategory && (
              <span className="font-bold text-[#8B0000] dark:text-red-400 uppercase tracking-widest text-[11px]">
                {article.categoryName}
              </span>
            )}
            <span className="text-gray-500 dark:text-gray-400 font-mono text-[11px]">
              {article.readingTime} min read
            </span>
          </div>

          <button 
            onClick={() => navigateToArticle(article.slug)}
            className="text-left focus:outline-none"
          >
            <h3 className="font-display font-bold text-lg text-[#1A1A1A] dark:text-gray-100 group-hover:text-[#8B0000] dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2 mb-2">
              {article.title}
            </h3>
          </button>

          <p className="font-serif text-gray-600 dark:text-gray-300 text-xs line-clamp-3 leading-relaxed mb-4">
            {article.subtitle}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="truncate max-w-[140px] font-medium">{article.authorName}</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-0.5 text-[11px] font-mono text-gray-400">
            <Eye className="w-3 h-3" />
            {article.views}
          </span>
          <button 
            onClick={() => toggleBookmark(article.id)}
            className="p-1 hover:text-[#8B0000] dark:hover:text-red-400 transition-colors"
            title={isBookmarked ? "Remove Bookmark" : "Save Article"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-[#8B0000] text-[#8B0000] dark:fill-red-500 dark:text-red-500" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
