import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Image as ImageIcon, 
  Folders, 
  Settings, 
  LogOut, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X,
  History
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNews } from '../../context/NewsContext';

interface AdminLayoutProps {
  activeTab: 'overview' | 'articles' | 'editor' | 'media' | 'categories' | 'settings' | 'activity';
  setActiveTab: (tab: 'overview' | 'articles' | 'editor' | 'media' | 'categories' | 'settings' | 'activity') => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const { logout, currentUser, isDemoAdmin } = useAuth();
  const { navigateToHome, settings } = useNews();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'articles', label: 'Article Management', icon: FileText },
    { id: 'editor', label: 'Write / Edit Article', icon: PlusCircle },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'categories', label: 'Categories Desk', icon: Folders },
    { id: 'activity', label: 'Recent Activity Logs', icon: History },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-red-500" />
          <span className="font-brand font-bold text-sm uppercase text-white">CMS Portal</span>
        </div>
        <button 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-gray-300 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* CMS Sidebar Navigation */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between p-4 transition-transform duration-300 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div>
          {/* Portal Branding */}
          <div className="pb-6 mb-6 border-b border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase text-red-400 tracking-wider">
                CMS Control Panel
              </span>
            </div>
            <h2 className="font-brand font-bold text-base uppercase text-white truncate">
              {settings.siteName}
            </h2>
            <span className="text-[11px] font-mono text-gray-400 block mt-0.5">
              User: {currentUser?.email || (isDemoAdmin ? 'Chief Editor (Demo Admin)' : 'Administrator')}
            </span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-red-900 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-gray-800 space-y-2">
          <button
            onClick={navigateToHome}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-mono transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>View Live Website</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded bg-red-950/60 hover:bg-red-900 text-red-200 text-xs font-mono transition-colors border border-red-900/50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main CMS Workspace Container */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
