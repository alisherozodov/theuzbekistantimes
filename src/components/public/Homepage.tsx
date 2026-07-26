import React from 'react';
import { Sparkles, Newspaper, Flame, Layers } from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { ArticleCard } from './ArticleCard';
import { OpinionSection } from './OpinionSection';
import { TrendingSection } from './TrendingSection';
import { PhotoSpotlight } from './PhotoSpotlight';

export const Homepage: React.FC = () => {
  const { articles, categories, navigateToCategory } = useNews();

  const publishedArticles = articles.filter(a => a.status === 'published');

  // Lead Hero Article
  const heroArticle = publishedArticles.find(a => a.featured && a.breakingNews) 
    || publishedArticles.find(a => a.featured) 
    || publishedArticles[0];

  // Secondary Hero Side Stories
  const sideHeroArticles = publishedArticles
    .filter(a => a.id !== heroArticle?.id)
    .slice(0, 3);

  // Latest News feed excluding hero
  const latestArticles = publishedArticles
    .filter(a => a.id !== heroArticle?.id && !sideHeroArticles.some(s => s.id === a.id))
    .slice(0, 6);

  // Category specific groupings
  const techArticles = publishedArticles.filter(a => a.categoryId === 'technology' || a.categoryName.toLowerCase().includes('tech')).slice(0, 3);
  const businessArticles = publishedArticles.filter(a => a.categoryId === 'business' || a.categoryName.toLowerCase().includes('business')).slice(0, 3);
  const politicsArticles = publishedArticles.filter(a => a.categoryId === 'politics' || a.categoryName.toLowerCase().includes('politic')).slice(0, 3);
  const cultureArticles = publishedArticles.filter(a => a.categoryId === 'culture' || a.categoryName.toLowerCase().includes('cultur')).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fade-in space-y-12">
      
      {/* Hero Section */}
      {heroArticle && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b-2 border-[#8B0000] pb-2">
            <Newspaper className="w-5 h-5 text-[#8B0000] dark:text-red-400" />
            <h2 className="font-brand text-xl font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-gray-100">
              Lead International Coverage
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Lead Story (Left 8 cols) */}
            <div className="lg:col-span-8">
              <ArticleCard article={heroArticle} variant="hero" />
            </div>

            {/* Side Lead Headlines (Right 4 cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xs divide-y divide-gray-100 dark:divide-gray-800">
              <div className="pb-3 mb-2 flex items-center justify-between">
                <span className="font-brand font-bold text-xs uppercase tracking-widest text-[#8B0000] dark:text-red-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Editor's Key Bulletins
                </span>
              </div>
              {sideHeroArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Primary 2-Column Section: Latest News + Trending Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Latest News Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#8B0000] dark:text-red-400" />
              <h2 className="font-brand text-xl font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-gray-100">
                Latest Dispatches
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Live Updates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="medium" />
            ))}
          </div>
        </div>

        {/* Right Column: Most Read Sidebar */}
        <div className="lg:col-span-4">
          <TrendingSection />
        </div>
      </section>

      {/* Visual Photo Journalism Spotlight */}
      <PhotoSpotlight />

      {/* Category Desk Grids */}
      {/* Technology Desk */}
      {techArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-blue-600 pb-2">
            <h2 className="font-brand text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Technology & AI Innovation
            </h2>
            <button 
              onClick={() => navigateToCategory('technology')}
              className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All Tech →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techArticles.map(art => (
              <ArticleCard key={art.id} article={art} variant="medium" />
            ))}
          </div>
        </section>
      )}

      {/* Opinion & Columnists Section */}
      <OpinionSection />

      {/* Business & Silk Road Economy Desk */}
      {businessArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-2">
            <h2 className="font-brand text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Business & Eurasian Economy
            </h2>
            <button 
              onClick={() => navigateToCategory('business')}
              className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              View All Business →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessArticles.map(art => (
              <ArticleCard key={art.id} article={art} variant="medium" />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
