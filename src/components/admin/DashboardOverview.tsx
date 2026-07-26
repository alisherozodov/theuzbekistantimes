import React from 'react';
import { 
  FileText, 
  FileEdit, 
  Eye, 
  Folders, 
  PlusCircle, 
  TrendingUp, 
  Clock, 
  Settings, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNews } from '../../context/NewsContext';

interface DashboardOverviewProps {
  setActiveTab: (tab: 'overview' | 'articles' | 'editor' | 'media' | 'categories' | 'settings' | 'activity') => void;
  onEditArticle: (articleId: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveTab, onEditArticle }) => {
  const { articles, categories, activityLogs } = useNews();

  const publishedCount = articles.filter(a => a.status === 'published').length;
  const draftCount = articles.filter(a => a.status === 'draft').length;
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const breakingCount = articles.filter(a => a.breakingNews).length;

  const recentArticles = [...articles].slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="font-brand text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            Editorial CMS Dashboard
          </h1>
          <p className="font-serif text-xs text-gray-400 mt-1">
            Real-time analytics, publishing desk status, and article workflows.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('editor')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-900 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
              Published Stories
            </span>
            <span className="font-brand font-black text-3xl text-white">{publishedCount}</span>
          </div>
          <div className="p-3 bg-emerald-950 text-emerald-400 rounded-lg border border-emerald-800">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
              Drafts Pending
            </span>
            <span className="font-brand font-black text-3xl text-amber-400">{draftCount}</span>
          </div>
          <div className="p-3 bg-amber-950 text-amber-400 rounded-lg border border-amber-800">
            <FileEdit className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
              Total Article Reads
            </span>
            <span className="font-brand font-black text-3xl text-blue-400">{totalViews.toLocaleString()}</span>
          </div>
          <div className="p-3 bg-blue-950 text-blue-400 rounded-lg border border-blue-800">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
              Active Desks
            </span>
            <span className="font-brand font-black text-3xl text-purple-400">{categories.length}</span>
          </div>
          <div className="p-3 bg-purple-950 text-purple-400 rounded-lg border border-purple-800">
            <Folders className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Articles + Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Stories Table */}
        <div className="lg:col-span-8 bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
            <h3 className="font-brand font-bold text-base uppercase text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-500" />
              Recent Editorial Entries
            </h3>
            <button
              onClick={() => setActiveTab('articles')}
              className="text-xs font-mono text-red-400 hover:underline"
            >
              View All ({articles.length}) →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 font-mono uppercase">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Desk</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Views</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-serif">
                {recentArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 font-medium text-white max-w-xs truncate pr-4">
                      {art.title}
                    </td>
                    <td className="py-3 font-mono text-gray-400">
                      {art.categoryName}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${
                        art.status === 'published' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        art.status === 'draft' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {art.status}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-gray-300">
                      {art.views}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => {
                          onEditArticle(art.id);
                          setActiveTab('editor');
                        }}
                        className="px-2.5 py-1 bg-gray-800 hover:bg-red-900 text-white font-mono text-[11px] rounded transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="lg:col-span-4 bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="font-brand font-bold text-base uppercase text-white mb-4 pb-3 border-b border-gray-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            Recent Activity Log
          </h3>

          <div className="space-y-4">
            {activityLogs.map((log) => (
              <div key={log.id} className="p-3 bg-gray-950 rounded-lg border border-gray-800/80 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
                  <span className="text-red-400 font-bold uppercase">{log.action}</span>
                  <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {log.articleTitle && (
                  <p className="font-serif text-gray-200 line-clamp-1 mb-1 font-medium">
                    "{log.articleTitle}"
                  </p>
                )}
                <span className="text-[10px] text-gray-500 font-mono">By {log.user}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
