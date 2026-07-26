import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Check, Upload, Trash2 } from 'lucide-react';
import { useNews } from '../../context/NewsContext';

interface MediaItem {
  id: string;
  url: string;
  title: string;
}

export const MediaLibrary: React.FC = () => {
  const { articles } = useNews();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Extract all images from articles
  const allImages: MediaItem[] = articles.flatMap(a => [
    ...(a.featuredImage ? [{ id: `feat-${a.id}`, url: a.featuredImage, title: a.title }] : []),
    ...(a.images || []).map(img => ({ id: img.id, url: img.url, title: img.caption || a.title }))
  ]);

  const uniqueImages = Array.from(new Map(allImages.map(item => [item.url, item])).values());

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div>
          <h1 className="font-brand text-2xl font-bold uppercase tracking-wider text-white">
            Media Asset Library
          </h1>
          <p className="font-serif text-xs text-gray-400 mt-1">
            Browse and copy URLs of uploaded news photography and media assets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueImages.map((img) => (
          <div key={img.id} className="group relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow">
            <img src={img.url} alt={img.title} className="w-full aspect-[4/3] object-cover" />
            <div className="p-2.5">
              <p className="font-mono text-[11px] text-gray-300 truncate">{img.title}</p>
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
              <button
                onClick={() => handleCopy(img.url)}
                className="px-3 py-1.5 bg-red-900 text-white font-mono text-xs rounded shadow flex items-center gap-1.5"
              >
                {copiedUrl === img.url ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl === img.url ? 'URL Copied!' : 'Copy URL'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
