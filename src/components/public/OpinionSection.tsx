import React from 'react';
import { Quote, MessageSquareQuote } from 'lucide-react';
import { useNews } from '../../context/NewsContext';

export const OpinionSection: React.FC = () => {
  const { articles, authors, navigateToArticle } = useNews();
  const opinionArticles = articles.filter(a => a.categoryId === 'opinion' || a.categoryName.toLowerCase().includes('opinion')).slice(0, 3);

  if (opinionArticles.length === 0) {
    // Pick first 3 as fallback columnists
    opinionArticles.push(...articles.slice(1, 4));
  }

  return (
    <section className="my-12 py-8 px-6 bg-stone-100 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquareQuote className="w-5 h-5 text-red-900 dark:text-red-400" />
        <h2 className="font-brand text-xl uppercase font-bold tracking-wider text-gray-900 dark:text-gray-100">
          Opinion & Editorial
        </h2>
        <div className="h-px bg-red-900/30 dark:bg-red-500/30 flex-1 ml-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {opinionArticles.map((art) => {
          const author = authors.find(a => a.id === art.authorId) || authors[0];
          return (
            <div key={art.id} className="flex flex-col justify-between bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xs hover:border-red-900/40 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={art.authorAvatar || author.avatar} 
                    alt={art.authorName} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-900/20"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{art.authorName}</h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">{art.authorRole || author.role}</p>
                  </div>
                </div>

                <Quote className="w-6 h-6 text-red-900/20 dark:text-red-500/20 mb-2" />

                <button 
                  onClick={() => navigateToArticle(art.slug)}
                  className="text-left focus:outline-none"
                >
                  <h4 className="font-display font-bold text-base text-gray-900 dark:text-gray-100 hover:text-red-900 dark:hover:text-red-400 transition-colors leading-snug line-clamp-3">
                    "{art.title}"
                  </h4>
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] font-mono text-gray-400 flex justify-between items-center">
                <span>Column</span>
                <span>{art.readingTime} min read</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
