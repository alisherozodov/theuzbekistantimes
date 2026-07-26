import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Eye, 
  Bookmark, 
  Share2, 
  Copy, 
  Check, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Send, 
  ArrowLeft, 
  MessageSquare, 
  User, 
  Printer,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { ArticleCard } from './ArticleCard';

export const ArticleDetail: React.FC = () => {
  const { 
    selectedArticleSlug, 
    getArticleBySlug, 
    articles, 
    navigateToHome, 
    navigateToCategory, 
    navigateToArticle,
    bookmarks, 
    toggleBookmark, 
    incrementViews,
    comments,
    addComment
  } = useNews();

  const [copied, setCopied] = useState<boolean>(false);
  const [commentName, setCommentName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [commentSubmitted, setCommentSubmitted] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const article = selectedArticleSlug ? getArticleBySlug(selectedArticleSlug) : undefined;

  // Increment views on article open
  useEffect(() => {
    if (article) {
      incrementViews(article.id);
    }
  }, [selectedArticleSlug]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Article Not Found</h1>
        <p className="font-serif text-gray-600 dark:text-gray-400 mb-6">The requested story could not be located or may have been archived.</p>
        <button
          onClick={navigateToHome}
          className="px-6 py-2.5 bg-red-900 text-white font-bold text-xs uppercase tracking-widest rounded shadow"
        >
          Return to Front Page
        </button>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(article.id);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const updatedDate = article.updatedAt ? new Date(article.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : null;

  const articleComments = comments.filter(c => c.articleId === article.id);

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.status === 'published' && (a.categoryId === article.categoryId || a.categoryName === article.categoryName))
    .slice(0, 3);

  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await addComment(article.id, commentName, commentText);
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-6">
        <button onClick={navigateToHome} className="hover:text-[#8B0000] dark:hover:text-red-400 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateToCategory(article.categoryId)} className="hover:text-[#8B0000] dark:hover:text-red-400 transition-colors uppercase font-bold text-[#8B0000] dark:text-red-400">
          {article.categoryName}
        </button>
        <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
        <span className="truncate max-w-xs text-gray-400 hidden sm:inline">{article.title}</span>
      </nav>

      {/* Main Article Container with Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Sticky Social Share Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 flex flex-col items-center gap-3 pt-4 border-r border-gray-200 dark:border-gray-800 pr-4">
            <span className="text-[10px] font-mono font-bold uppercase text-gray-400 mb-1">Share</span>
            
            <button 
              onClick={handleCopyLink}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-[#8B0000] hover:text-white dark:bg-gray-800 dark:hover:bg-red-800 text-gray-700 dark:text-gray-300 transition-all shadow-xs"
              title="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-xs"
              title="Share on X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-xs"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a 
              href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-xs"
              title="Share on Telegram"
            >
              <Send className="w-4 h-4" />
            </a>

            <button 
              onClick={() => toggleBookmark(article.id)}
              className={`p-2.5 rounded-full transition-all shadow-xs ${
                isBookmarked 
                  ? 'bg-red-900 text-white dark:bg-red-700' 
                  : 'bg-gray-100 hover:bg-red-900 hover:text-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              title={isBookmarked ? "Saved" : "Save Story"}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button 
              onClick={handlePrint}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-xs"
              title="Print Article"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Main Article Content Area */}
        <div className="lg:col-span-8">
          {/* Category & Status Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-[#8B0000] text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded">
              {article.categoryName}
            </span>
            {article.breakingNews && (
              <span className="bg-amber-600 text-white font-bold text-xs uppercase tracking-widest px-2.5 py-1 rounded animate-pulse">
                Breaking News
              </span>
            )}
          </div>

          {/* Article Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 leading-[1.15] mb-4">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="font-serif text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed italic mb-6">
              {article.subtitle}
            </p>
          )}

          {/* Author & Publication Meta Bar */}
          <div className="py-4 border-y border-gray-200 dark:border-gray-800 my-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {article.authorAvatar && (
                <img 
                  src={article.authorAvatar} 
                  alt={article.authorName} 
                  className="w-11 h-11 rounded-full object-cover border-2 border-red-900/30"
                />
              )}
              <div>
                <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">By {article.authorName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{article.authorRole || "Journalist"}</p>
              </div>
            </div>

            <div className="text-xs font-mono text-gray-500 dark:text-gray-400 flex flex-col sm:items-end gap-0.5">
              <span>Published: {formattedDate}</span>
              {updatedDate && <span className="text-[11px] text-gray-400">Updated: {updatedDate}</span>}
              <div className="flex items-center gap-3 mt-1 text-gray-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readingTime} min read</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views} views</span>
              </div>
            </div>
          </div>

          {/* Featured Hero Photo */}
          {article.featuredImage && (
            <figure className="mb-8">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 group">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setLightboxImage(article.featuredImage)}
                  className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                  title="Expand Photo"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
              <figcaption className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-2 px-1 flex items-center justify-between">
                <span>Featured Journalism • The Uzbekistan Times Photo Agency</span>
                <span>Samarkand/Tashkent</span>
              </figcaption>
            </figure>
          )}

          {/* Article Body Content */}
          <div 
            className="article-content text-gray-800 dark:text-gray-200 leading-relaxed font-serif"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Multiple Inline Images Gallery / Lightbox */}
          {article.images && article.images.length > 0 && (
            <div className="my-10 pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="font-brand text-lg font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
                Field Photography Gallery ({article.images.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {article.images.map((img) => (
                  <div key={img.id} className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={img.url} 
                      alt={img.altText || "Article photography"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => setLightboxImage(img.url)}
                    />
                    {img.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-xs font-mono">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tag Chips */}
          {article.tags && article.tags.length > 0 && (
            <div className="my-8 pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-gray-400 mr-2">Topics:</span>
              {article.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-red-900 hover:text-white dark:hover:bg-red-800 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Biography Box */}
          <div className="my-10 p-6 bg-stone-100 dark:bg-gray-900 rounded-xl border border-stone-200 dark:border-gray-800 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {article.authorAvatar && (
              <img 
                src={article.authorAvatar} 
                alt={article.authorName} 
                className="w-16 h-16 rounded-full object-cover border-2 border-red-900 shrink-0"
              />
            )}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Written by {article.authorName}</h3>
              <p className="text-xs text-red-900 dark:text-red-400 font-medium mb-2">{article.authorRole || "Senior Correspondent"}</p>
              <p className="font-serif text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Specializing in Central Asian diplomacy, economic corridors, and regional development for The Uzbekistan Times.
              </p>
            </div>
          </div>

          {/* Interactive Firestore Comments Section */}
          <section className="my-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-brand text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-900 dark:text-red-400" />
                Reader Discussion ({articleComments.length})
              </h3>
            </div>

            {/* Comment Submission Form */}
            <form onSubmit={handleCommentSubmit} className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="e.g. Malika Rahmonova"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-red-900"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Comment
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your perspective on this news story..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-red-900"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">
                  Moderated in accordance with editorial standards.
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-900 hover:bg-red-950 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
                >
                  Post Comment
                </button>
              </div>

              {commentSubmitted && (
                <div className="mt-3 p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs rounded border border-emerald-300 font-medium text-center">
                  Thank you! Your comment has been published to discussion thread.
                </div>
              )}
            </form>

            {/* List of Comments */}
            <div className="space-y-4">
              {articleComments.length === 0 ? (
                <p className="font-serif italic text-sm text-gray-400 text-center py-6">
                  Be the first reader to share a comment on this story.
                </p>
              ) : (
                articleComments.map((c) => (
                  <div key={c.id} className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-red-900 dark:text-red-400" />
                        {c.authorName}
                      </span>
                      <span className="font-mono text-gray-400 text-[11px]">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-serif text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right Related Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <h3 className="font-brand text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
              Related Coverage
            </h3>
            <div className="space-y-4">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox Viewer Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-3 text-white hover:text-red-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Enlarged journalism photo" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </article>
  );
};
