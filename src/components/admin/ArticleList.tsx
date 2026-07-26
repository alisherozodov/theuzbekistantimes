import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Radio, 
  Star, 
  Eye, 
  CheckCircle, 
  FileEdit, 
  Archive,
  ExternalLink
} from 'lucide-react';
import { useNews } from '../../context/NewsContext';

interface ArticleListProps {
  onEditArticle: (id: string) => void;
  onNewArticle: () => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({ onEditArticle, onNewArticle }) => {
  const { 
    articles, 
    categories, 
    updateArticleStatus, 
    toggleArticleBreaking, 
    toggleArticleFeatured, 
    deleteArticle,
    navigateToArticle
  } = useNews();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || art.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || art.categoryId === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <h1 className="font-brand text-2xl font-bold uppercase tracking-wider text-white">
            Article CMS Desk
          </h1>
          <p className="font-serif text-xs text-gray-400 mt-1">
            Manage published news, drafts, breaking news flags, and editorial status.
          </p>
        </div>

        <button
          onClick={onNewArticle}
          className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles or authors..."
            className="w-full pl-9 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Status Selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-xs text-gray-300 focus:outline-none focus:border-red-600 font-mono"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Selector */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-xs text-gray-300 focus:outline-none focus:border-red-600 font-mono"
          >
            <option value="all">All Desks</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-950 text-gray-400 font-mono uppercase border-b border-gray-800">
                <th className="p-4">Title & Details</th>
                <th className="p-4">Desk</th>
                <th className="p-4">Author</th>
                <th className="p-4 text-center">Flags</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-serif">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 italic">
                    No articles match your current search and filter settings.
                  </td>
                </tr>
              ) : (
                filtered.map((art) => (
                  <tr key={art.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-4 max-w-sm">
                      <div className="font-bold text-white text-sm line-clamp-1 mb-1">{art.title}</div>
                      <div className="text-[11px] font-mono text-gray-400 flex items-center gap-2">
                        <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {art.views} reads</span>
                      </div>
                    </td>

                    <td className="p-4 font-mono text-gray-300">
                      <span className="px-2 py-1 bg-gray-800 rounded text-[10px]">
                        {art.categoryName}
                      </span>
                    </td>

                    <td className="p-4 font-sans text-gray-300">
                      {art.authorName}
                    </td>

                    {/* Flags: Breaking & Featured */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleArticleBreaking(art.id, !art.breakingNews)}
                          className={`p-1.5 rounded transition-colors ${
                            art.breakingNews 
                              ? 'bg-red-950 text-red-400 border border-red-800' 
                              : 'bg-gray-800 text-gray-600 hover:text-gray-300'
                          }`}
                          title={art.breakingNews ? "Remove Breaking Flag" : "Set as Breaking News"}
                        >
                          <Radio className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => toggleArticleFeatured(art.id, !art.featured)}
                          className={`p-1.5 rounded transition-colors ${
                            art.featured 
                              ? 'bg-amber-950 text-amber-400 border border-amber-800' 
                              : 'bg-gray-800 text-gray-600 hover:text-gray-300'
                          }`}
                          title={art.featured ? "Remove Featured Flag" : "Set as Featured Article"}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </td>

                    {/* Status Dropdown / Badge */}
                    <td className="p-4 text-center">
                      <select
                        value={art.status}
                        onChange={(e) => updateArticleStatus(art.id, e.target.value as any)}
                        className={`px-2 py-1 rounded font-mono text-[10px] font-bold uppercase focus:outline-none cursor-pointer ${
                          art.status === 'published' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          art.status === 'draft' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => navigateToArticle(art.slug)}
                          className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
                          title="Preview Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onEditArticle(art.id)}
                          className="p-1.5 bg-red-950 hover:bg-red-900 text-red-300 rounded transition-colors border border-red-900/40"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${art.title}"?`)) {
                              deleteArticle(art.id);
                            }
                          }}
                          className="p-1.5 bg-gray-800 hover:bg-red-950 text-gray-400 hover:text-red-400 rounded transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
