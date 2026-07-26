import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNews } from '../../context/NewsContext';

export const PhotoSpotlight: React.FC = () => {
  const { articles, navigateToArticle } = useNews();
  
  // Articles with images or featured images
  const photoStories = articles.filter(a => a.featuredImage || (a.images && a.images.length > 0)).slice(0, 4);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  if (photoStories.length === 0) return null;

  const current = photoStories[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % photoStories.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + photoStories.length) % photoStories.length);
  };

  return (
    <section className="my-12 bg-gray-950 text-white rounded-xl overflow-hidden shadow-xl border border-gray-800 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-red-500" />
          <h2 className="font-brand text-xl uppercase font-bold tracking-widest text-white">
            Visual Journalism & Photo Stories
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrev}
            className="p-2 rounded bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors"
            title="Previous Story"
          >
            <ChevronLeft className="w-4 h-4 text-gray-300" />
          </button>
          <span className="font-mono text-xs text-gray-400 px-2">
            {activeIdx + 1} / {photoStories.length}
          </span>
          <button 
            onClick={handleNext}
            className="p-2 rounded bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors"
            title="Next Story"
          >
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-900 group">
          <img 
            src={current.featuredImage} 
            alt={current.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-gray-300 bg-black/50 backdrop-blur-xs p-2 rounded">
            Photo: The Uzbekistan Times Archives • {current.categoryName}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between h-full">
          <div>
            <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
              Featured Gallery
            </span>
            <button
              onClick={() => navigateToArticle(current.slug)}
              className="text-left focus:outline-none"
            >
              <h3 className="font-display font-bold text-2xl text-white hover:text-red-400 transition-colors leading-tight mb-3">
                {current.title}
              </h3>
            </button>
            <p className="font-serif text-gray-300 text-sm leading-relaxed line-clamp-4 mb-6">
              {current.subtitle}
            </p>
          </div>

          <button
            onClick={() => navigateToArticle(current.slug)}
            className="w-full py-3 bg-red-900 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest rounded text-center transition-colors shadow"
          >
            Explore Full Photo Story
          </button>
        </div>
      </div>
    </section>
  );
};
