import React from 'react';
import { Bookmark, Trash2, ArrowLeft } from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { ArticleCard } from './ArticleCard';

export const BookmarksView: React.FC = () => {
  const { articles, bookmarks, toggleBookmark, navigateToHome } = useNews();

  const savedArticles = articles.filter(a => bookmarks.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <button 
            onClick={navigateToHome}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            title="Back to Homepage"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-brand text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-red-900 dark:text-red-400 fill-red-900/20" />
              Saved Reading List
            </h1>
            <p className="font-serif text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your personal offline collection of articles saved for reading later.
            </p>
          </div>
        </div>

        {savedArticles.length > 0 && (
          <span className="text-xs font-mono font-bold bg-red-900/10 text-red-900 dark:bg-red-900/30 dark:text-red-400 px-3 py-1 rounded-full">
            {savedArticles.length} Article{savedArticles.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {savedArticles.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 max-w-lg mx-auto">
          <Bookmark className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <h2 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">
            No Saved Stories Yet
          </h2>
          <p className="font-serif text-sm text-gray-500 dark:text-gray-400 mb-6">
            Click the bookmark icon on any news story to build your personal reading list.
          </p>
          <button
            onClick={navigateToHome}
            className="px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest rounded transition-colors shadow"
          >
            Explore Front Page
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((art) => (
            <div key={art.id} className="relative group">
              <ArticleCard article={art} variant="medium" />
              <button
                onClick={() => toggleBookmark(art.id)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-900 text-white rounded-full transition-colors z-20 opacity-0 group-hover:opacity-100"
                title="Remove from saved list"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
