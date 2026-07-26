import React from 'react';
import { Flame, Eye } from 'lucide-react';
import { useNews } from '../../context/NewsContext';

export const TrendingSection: React.FC = () => {
  const { getTrendingArticles, navigateToArticle } = useNews();
  const trending = getTrendingArticles().slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-200 dark:border-gray-800">
        <Flame className="w-5 h-5 text-[#8B0000] dark:text-red-400 fill-[#8B0000]/20" />
        <h3 className="font-brand text-base font-bold uppercase tracking-widest text-[#1A1A1A] dark:text-gray-100">
          Most Popular Stories
        </h3>
      </div>

      <div className="space-y-4">
        {trending.map((art, idx) => (
          <div key={art.id} className="group flex items-start gap-4 pb-3 border-b border-gray-100 dark:border-gray-800/80 last:border-b-0">
            <span className="font-serif italic font-bold text-2xl text-gray-300 dark:text-gray-700 group-hover:text-[#8B0000] dark:group-hover:text-red-400 transition-colors w-6 text-center shrink-0">
              0{idx + 1}
            </span>
            <div className="flex-1">
              <span className="text-[10px] font-bold text-[#8B0000] dark:text-red-400 uppercase tracking-widest block mb-1">
                {art.categoryName}
              </span>
              <button
                onClick={() => navigateToArticle(art.slug)}
                className="text-left focus:outline-none"
              >
                <h4 className="font-display font-bold text-sm text-[#1A1A1A] dark:text-gray-100 group-hover:text-[#8B0000] dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
                  {art.title}
                </h4>
              </button>
              <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {art.views} reads
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
