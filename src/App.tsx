import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NewsProvider, useNews } from './context/NewsContext';

// Public Components
import { Header } from './components/public/Header';
import { Navbar } from './components/public/Navbar';
import { Homepage } from './components/public/Homepage';
import { ArticleDetail } from './components/public/ArticleDetail';
import { CategoryDetail } from './components/public/CategoryDetail';
import { BookmarksView } from './components/public/BookmarksDrawer';
import { SearchModal } from './components/public/SearchModal';
import { Footer } from './components/public/Footer';

// Secret Admin CMS Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardOverview } from './components/admin/DashboardOverview';
import { ArticleList } from './components/admin/ArticleList';
import { ArticleEditor } from './components/admin/ArticleEditor';
import { MediaLibrary } from './components/admin/MediaLibrary';
import { CategoryManager } from './components/admin/CategoryManager';
import { SiteSettingsManager } from './components/admin/SiteSettings';
import { ActivityLogsView } from './components/admin/ActivityLogs';

const MainAppRouter: React.FC = () => {
  const { currentRoute } = useNews();
  const { isAdmin } = useAuth();

  const [adminTab, setAdminTab] = useState<'overview' | 'articles' | 'editor' | 'media' | 'categories' | 'settings' | 'activity'>('overview');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // If visiting secret route /management
  if (currentRoute === 'management') {
    if (!isAdmin) {
      return <AdminLogin />;
    }

    return (
      <AdminLayout activeTab={adminTab} setActiveTab={setAdminTab}>
        {adminTab === 'overview' && (
          <DashboardOverview 
            setActiveTab={setAdminTab} 
            onEditArticle={(id) => setEditingArticleId(id)} 
          />
        )}

        {adminTab === 'articles' && (
          <ArticleList 
            onEditArticle={(id) => {
              setEditingArticleId(id);
              setAdminTab('editor');
            }} 
            onNewArticle={() => {
              setEditingArticleId(null);
              setAdminTab('editor');
            }} 
          />
        )}

        {adminTab === 'editor' && (
          <ArticleEditor 
            editingArticleId={editingArticleId} 
            onFinish={() => {
              setEditingArticleId(null);
              setAdminTab('articles');
            }} 
          />
        )}

        {adminTab === 'media' && <MediaLibrary />}

        {adminTab === 'categories' && <CategoryManager />}

        {adminTab === 'settings' && <SiteSettingsManager />}

        {adminTab === 'activity' && <ActivityLogsView />}
      </AdminLayout>
    );
  }

  // Public Newspaper Portal Layout
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FBFBFA] dark:bg-[#0D0E11] text-gray-900 dark:text-gray-100 transition-colors">
      <div>
        <Header />
        <Navbar />
        <SearchModal />

        <main>
          {currentRoute === 'home' && <Homepage />}
          {currentRoute === 'article' && <ArticleDetail />}
          {currentRoute === 'category' && <CategoryDetail />}
          {currentRoute === 'bookmarks' && <BookmarksView />}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NewsProvider>
        <MainAppRouter />
      </NewsProvider>
    </AuthProvider>
  );
}
