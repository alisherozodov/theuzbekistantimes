import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid, ListFilter, Rss } from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { ArticleCard } from './ArticleCard';

export const CategoryDetail: React.FC = () => {
  const { activeCategory, categories, getArticlesByCategory, navigateToHome } = useNews();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const category = categories.find(c => c.slug === activeCategory) || categories[0];
  const allCategoryArticles = activeCategory ? getArticlesByCategory(activeCategory) : [];

  // Extract all unique tags
  const tagsSet = new Set<string>();
  allCategoryArticles.forEach(a => a.tags?.forEach(t => tagsSet.add(t)));
  const availableTags = Array.from(tagsSet);

  const filteredArticles = selectedTag 
    ? allCategoryArticles.filter(a => a.tags?.includes(selectedTag))
    : allCategoryArticles;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fade-in">
      {/* Category Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-gray-900 to-black text-white p-8 rounded-xl shadow-md mb-8 border border-red-900/40">
        <button 
          onClick={navigateToHome}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-red-300 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Front Page</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
              Category Desk
            </span>
            <h1 className="font-brand text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white">
              {category?.name || "News Section"}
            </h1>
            <p className="font-serif text-sm text-gray-300 max-w-2xl mt-2 leading-relaxed">
              {category?.description || "In-depth reporting and analysis from The Uzbekistan Times newsroom."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="bg-red-900/60 text-red-200 text-xs font-mono px-3 py-1.5 rounded-full border border-red-800">
              {allCategoryArticles.length} Stories Published
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-200 dark:border-gray-800">
        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
              selectedTag === null 
                ? 'bg-red-900 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            All Topics
          </button>
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                selectedTag === tag 
                  ? 'bg-red-900 text-white font-bold' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Grid vs List View Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-900 text-red-900 dark:text-red-400 shadow-xs' : 'text-gray-500'}`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-900 text-red-900 dark:text-red-400 shadow-xs' : 'text-gray-500'}`}
            title="List View"
          >
            <ListFilter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stories Output */}
      {filteredArticles.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
          <p className="font-serif text-gray-500 dark:text-gray-400">No stories found in this section tag yet.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(art => (
            <ArticleCard key={art.id} article={art} variant="medium" />
          ))}
        </div>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredArticles.map(art => (
            <ArticleCard key={art.id} article={art} variant="horizontal" />
          ))}
        </div>
      )}
    </div>
  );
};
