import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  increment,
  getDocs 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Article, Category, Author, SiteSettings, Comment, ActivityLog } from '../types/news';
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_AUTHORS, INITIAL_SETTINGS } from '../lib/seedData';

interface NewsContextType {
  articles: Article[];
  categories: Category[];
  authors: Author[];
  settings: SiteSettings;
  bookmarks: string[]; // array of article IDs
  activeCategory: string | null;
  selectedArticleSlug: string | null;
  currentRoute: 'home' | 'article' | 'category' | 'bookmarks' | 'management';
  searchQuery: string;
  isSearchOpen: boolean;
  activityLogs: ActivityLog[];
  loading: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Navigation actions
  navigateToHome: () => void;
  navigateToArticle: (slug: string) => void;
  navigateToCategory: (slug: string) => void;
  navigateToBookmarks: () => void;
  navigateToManagement: () => void;
  setSearchQuery: (q: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  toggleBookmark: (articleId: string) => void;

  // Article CRUD (Firestore)
  saveArticle: (articleData: Partial<Article>) => Promise<string>;
  updateArticleStatus: (id: string, status: Article['status']) => Promise<void>;
  toggleArticleBreaking: (id: string, value: boolean) => Promise<void>;
  toggleArticleFeatured: (id: string, value: boolean) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  incrementViews: (id: string) => Promise<void>;

  // Category CRUD
  saveCategory: (categoryData: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Comments & Subscribers
  comments: Comment[];
  addComment: (articleId: string, authorName: string, content: string) => Promise<void>;
  addSubscriber: (email: string) => Promise<boolean>;

  // Settings
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;

  // Filtered queries
  getArticleBySlug: (slug: string) => Article | undefined;
  getArticlesByCategory: (categorySlug: string) => Article[];
  getFeaturedArticles: () => Article[];
  getBreakingArticles: () => Article[];
  getTrendingArticles: () => Article[];
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [authors, setAuthors] = useState<Author[]>(INITIAL_AUTHORS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 'log-1',
      action: 'Published article',
      articleTitle: 'Silk Road High-Speed Rail Corridor Expansion',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      user: 'Dr. Shahlo Abdullaeva'
    }
  ]);

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('uztimes_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Router simulation state
  const [currentRoute, setCurrentRoute] = useState<'home' | 'article' | 'category' | 'bookmarks' | 'management'>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Global dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('uztimes_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('uztimes_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('uztimes_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('uztimes_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Firestore real-time listeners & Auto-seeding
  useEffect(() => {
    const seedInitialFirestoreIfNeeded = async () => {
      try {
        const articlesSnap = await getDocs(collection(db, 'articles'));
        if (articlesSnap.empty) {
          console.log('Seeding initial articles to Firestore...');
          for (const art of INITIAL_ARTICLES) {
            await setDoc(doc(db, 'articles', art.id), art);
          }
          for (const cat of INITIAL_CATEGORIES) {
            await setDoc(doc(db, 'categories', cat.id), cat);
          }
          for (const aut of INITIAL_AUTHORS) {
            await setDoc(doc(db, 'authors', aut.id), aut);
          }
          await setDoc(doc(db, 'settings', 'global'), INITIAL_SETTINGS);
        }
      } catch (err) {
        console.warn('Firestore initial check or seed skipped (offline or rules fallback active):', err);
      }
    };

    seedInitialFirestoreIfNeeded();

    // Subscribe to Articles
    const unsubArticles = onSnapshot(collection(db, 'articles'), (snapshot) => {
      if (!snapshot.empty) {
        const list: Article[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Article);
        });
        // Sort by publishedAt desc
        list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        setArticles(list);
      }
      setLoading(false);
    }, (error) => {
      console.warn('Firestore articles snapshot listener warning:', error);
      setLoading(false);
    });

    // Subscribe to Categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      if (!snapshot.empty) {
        const list: Category[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Category);
        });
        list.sort((a, b) => a.order - b.order);
        setCategories(list);
      }
    });

    // Subscribe to Settings
    const unsubSettings = onSnapshot(collection(db, 'settings'), (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === 'global') {
          setSettings(doc.data() as SiteSettings);
        }
      });
    });

    // Subscribe to Comments
    const unsubComments = onSnapshot(collection(db, 'comments'), (snapshot) => {
      const list: Comment[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Comment);
      });
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setComments(list);
    });

    return () => {
      unsubArticles();
      unsubCategories();
      unsubSettings();
      unsubComments();
    };
  }, []);

  // Sync hash route parsing for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/article/')) {
        const slug = hash.replace('#/article/', '');
        setSelectedArticleSlug(slug);
        setCurrentRoute('article');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/category/')) {
        const catSlug = hash.replace('#/category/', '');
        setActiveCategory(catSlug);
        setCurrentRoute('category');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/bookmarks') {
        setCurrentRoute('bookmarks');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/management' || hash === '#/portal') {
        setCurrentRoute('management');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/' || hash === '') {
        setCurrentRoute('home');
        setSelectedArticleSlug(null);
        setActiveCategory(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation functions
  const navigateToHome = () => {
    window.location.hash = '#/';
    setCurrentRoute('home');
    setSelectedArticleSlug(null);
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (slug: string) => {
    window.location.hash = `#/article/${slug}`;
    setSelectedArticleSlug(slug);
    setCurrentRoute('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (slug: string) => {
    window.location.hash = `#/category/${slug}`;
    setActiveCategory(slug);
    setCurrentRoute('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBookmarks = () => {
    window.location.hash = '#/bookmarks';
    setCurrentRoute('bookmarks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToManagement = () => {
    window.location.hash = '#/management';
    setCurrentRoute('management');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarks(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  // Firestore Article Actions
  const saveArticle = async (articleData: Partial<Article>): Promise<string> => {
    const id = articleData.id || `art-${Date.now()}`;
    const now = new Date().toISOString();
    
    const fullArticle: Article = {
      id,
      title: articleData.title || 'Untitled Article',
      subtitle: articleData.subtitle || '',
      slug: articleData.slug || articleData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `article-${Date.now()}`,
      content: articleData.content || '',
      authorId: articleData.authorId || authors[0]?.id || 'author-1',
      authorName: articleData.authorName || authors[0]?.name || 'Editorial Board',
      authorAvatar: articleData.authorAvatar || authors[0]?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      authorRole: articleData.authorRole || 'Senior Journalist',
      categoryId: articleData.categoryId || categories[0]?.id || 'politics',
      categoryName: articleData.categoryName || categories[0]?.name || 'Politics',
      tags: articleData.tags || [],
      featuredImage: articleData.featuredImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200',
      images: articleData.images || [],
      publishedAt: articleData.publishedAt || now,
      updatedAt: now,
      readingTime: articleData.readingTime || Math.max(1, Math.ceil((articleData.content || '').split(' ').length / 200)),
      views: articleData.views || 0,
      status: articleData.status || 'draft',
      featured: articleData.featured || false,
      breakingNews: articleData.breakingNews || false,
      seoDescription: articleData.seoDescription || articleData.subtitle || '',
      seoKeywords: articleData.seoKeywords || (articleData.tags || []).join(', ')
    };

    // Update Local State first for instantaneous response
    setArticles(prev => {
      const idx = prev.findIndex(a => a.id === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = fullArticle;
        return copy;
      }
      return [fullArticle, ...prev];
    });

    // Sync to Firestore
    try {
      await setDoc(doc(db, 'articles', id), fullArticle, { merge: true });
    } catch (err) {
      console.warn('Firestore write warning (local state applied):', err);
    }

    // Add activity log
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      action: articleData.id ? 'Updated Article' : 'Created Article',
      articleTitle: fullArticle.title,
      timestamp: now,
      user: fullArticle.authorName
    };
    setActivityLogs(prev => [newLog, ...prev]);

    return id;
  };

  const updateArticleStatus = async (id: string, status: Article['status']) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a));
    try {
      await updateDoc(doc(db, 'articles', id), { status, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn('Firestore update warning:', e);
    }
  };

  const toggleArticleBreaking = async (id: string, value: boolean) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, breakingNews: value } : a));
    try {
      await updateDoc(doc(db, 'articles', id), { breakingNews: value });
    } catch (e) {
      console.warn('Firestore update warning:', e);
    }
  };

  const toggleArticleFeatured = async (id: string, value: boolean) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, featured: value } : a));
    try {
      await updateDoc(doc(db, 'articles', id), { featured: value });
    } catch (e) {
      console.warn('Firestore update warning:', e);
    }
  };

  const deleteArticle = async (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    try {
      await deleteDoc(doc(db, 'articles', id));
    } catch (e) {
      console.warn('Firestore delete warning:', e);
    }
  };

  const incrementViews = async (id: string) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, views: a.views + 1 } : a));
    try {
      await updateDoc(doc(db, 'articles', id), { views: increment(1) });
    } catch (e) {
      console.warn('Firestore view increment warning:', e);
    }
  };

  // Category Actions
  const saveCategory = async (categoryData: Partial<Category>) => {
    const id = categoryData.id || `cat-${Date.now()}`;
    const newCat: Category = {
      id,
      name: categoryData.name || 'New Category',
      slug: categoryData.slug || categoryData.name?.toLowerCase().replace(/\s+/g, '-') || `cat-${Date.now()}`,
      description: categoryData.description || '',
      icon: categoryData.icon || 'Folder',
      order: categoryData.order || categories.length + 1,
      color: categoryData.color || '#8B0000'
    };

    setCategories(prev => {
      const idx = prev.findIndex(c => c.id === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newCat;
        return copy;
      }
      return [...prev, newCat];
    });

    try {
      await setDoc(doc(db, 'categories', id), newCat, { merge: true });
    } catch (e) {
      console.warn('Firestore category write warning:', e);
    }
  };

  const deleteCategory = async (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (e) {
      console.warn('Firestore category delete warning:', e);
    }
  };

  // Comments
  const addComment = async (articleId: string, authorName: string, content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      articleId,
      authorName: authorName.trim() || 'Reader',
      content: content.trim(),
      createdAt: new Date().toISOString(),
      approved: true
    };

    setComments(prev => [newComment, ...prev]);

    try {
      await setDoc(doc(db, 'comments', newComment.id), newComment);
    } catch (e) {
      console.warn('Firestore comment add warning:', e);
    }
  };

  // Newsletter Subscriber
  const addSubscriber = async (email: string): Promise<boolean> => {
    if (!email || !email.includes('@')) return false;
    const subId = `sub-${Date.now()}`;
    try {
      await setDoc(doc(db, 'subscribers', subId), {
        email: email.trim(),
        subscribedAt: new Date().toISOString()
      });
      return true;
    } catch (e) {
      console.warn('Subscriber save warning:', e);
      return true; // Return true as local feedback
    }
  };

  // Settings
  const updateSiteSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await setDoc(doc(db, 'settings', 'global'), updated, { merge: true });
    } catch (e) {
      console.warn('Firestore settings update warning:', e);
    }
  };

  // Query helpers
  const getArticleBySlug = (slug: string) => {
    return articles.find(a => a.slug === slug || a.id === slug);
  };

  const getArticlesByCategory = (categorySlug: string) => {
    return articles.filter(a => a.status === 'published' && (a.categoryId === categorySlug || a.categoryName.toLowerCase() === categorySlug.toLowerCase()));
  };

  const getFeaturedArticles = () => {
    return articles.filter(a => a.status === 'published' && a.featured);
  };

  const getBreakingArticles = () => {
    return articles.filter(a => a.status === 'published' && a.breakingNews);
  };

  const getTrendingArticles = () => {
    return [...articles].filter(a => a.status === 'published').sort((a, b) => b.views - a.views);
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        categories,
        authors,
        settings,
        bookmarks,
        activeCategory,
        selectedArticleSlug,
        currentRoute,
        searchQuery,
        isSearchOpen,
        activityLogs,
        loading,
        darkMode,
        toggleDarkMode,
        navigateToHome,
        navigateToArticle,
        navigateToCategory,
        navigateToBookmarks,
        navigateToManagement,
        setSearchQuery,
        setIsSearchOpen,
        toggleBookmark,
        saveArticle,
        updateArticleStatus,
        toggleArticleBreaking,
        toggleArticleFeatured,
        deleteArticle,
        incrementViews,
        saveCategory,
        deleteCategory,
        comments,
        addComment,
        addSubscriber,
        updateSiteSettings,
        getArticleBySlug,
        getArticlesByCategory,
        getFeaturedArticles,
        getBreakingArticles,
        getTrendingArticles
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
