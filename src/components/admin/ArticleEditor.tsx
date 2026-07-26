import React, { useState, useEffect, useRef } from 'react';
import { 
  Save, 
  Eye, 
  Upload, 
  X, 
  Plus, 
  Bold, 
  Italic, 
  Underline, 
  Heading1, 
  Heading2, 
  Heading3, 
  Quote, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Code, 
  Minus, 
  Check, 
  Image as ImageIcon,
  Sparkles,
  ArrowLeft,
  Trash2,
  Star,
  Radio
} from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { useNews } from '../../context/NewsContext';
import { Article, ArticleImage } from '../../types/news';

interface ArticleEditorProps {
  editingArticleId: string | null;
  onFinish: () => void;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({ editingArticleId, onFinish }) => {
  const { articles, categories, authors, saveArticle } = useNews();

  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [authorId, setAuthorId] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [authorRole, setAuthorRole] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [images, setImages] = useState<ArticleImage[]>([]);
  const [status, setStatus] = useState<Article['status']>('draft');
  const [featured, setFeatured] = useState<boolean>(false);
  const [breakingNews, setBreakingNews] = useState<boolean>(false);
  const [seoDescription, setSeoDescription] = useState<string>('');
  const [seoKeywords, setSeoKeywords] = useState<string>('');

  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const editorRef = useRef<HTMLDivElement>(null);

  // Populate form if editing an existing article
  useEffect(() => {
    if (editingArticleId) {
      const art = articles.find(a => a.id === editingArticleId);
      if (art) {
        setTitle(art.title);
        setSubtitle(art.subtitle || '');
        setSlug(art.slug);
        setContent(art.content || '');
        setAuthorId(art.authorId || 'custom');
        setAuthorName(art.authorName || '');
        setAuthorRole(art.authorRole || 'Journalist');
        setCategoryId(art.categoryId);
        setTags(art.tags || []);
        setFeaturedImage(art.featuredImage || '');
        setImages(art.images || []);
        setStatus(art.status);
        setFeatured(art.featured);
        setBreakingNews(art.breakingNews);
        setSeoDescription(art.seoDescription || '');
        setSeoKeywords(art.seoKeywords || '');

        if (editorRef.current) {
          editorRef.current.innerHTML = art.content || '';
        }
      }
    } else {
      // Default new article fields
      setTitle('');
      setSubtitle('');
      setSlug('');
      setContent('');
      setAuthorId(authors[0]?.id || 'custom');
      setAuthorName(authors[0]?.name || '');
      setAuthorRole(authors[0]?.role || 'Staff Reporter');
      setCategoryId(categories[0]?.id || '');
      setTags([]);
      setFeaturedImage('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200');
      setImages([]);
      setStatus('draft');
      setFeatured(false);
      setBreakingNews(false);
      setSeoDescription('');
      setSeoKeywords('');

      if (editorRef.current) {
        editorRef.current.innerHTML = '<p>Start typing article content here...</p>';
      }
    }
  }, [editingArticleId, articles, authors, categories]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingArticleId) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  };

  // Rich Text Formatting commands
  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleInsertHeading = (tag: 'h2' | 'h3') => {
    execCommand('formatBlock', `<${tag}>`);
  };

  const handleInsertParagraph = () => {
    execCommand('formatBlock', '<p>');
  };

  const handleInsertBlockQuote = () => {
    execCommand('formatBlock', '<blockquote>');
  };

  const handleInsertPullQuote = () => {
    const selection = window.getSelection()?.toString() || 'Highlight pull quote text';
    const pullQuoteHtml = `<div class="pull-quote">"${selection}"</div>`;
    document.execCommand('insertHTML', false, pullQuoteHtml);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleInsertLink = () => {
    const url = prompt('Enter Hyperlink URL:', 'https://');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Multi Image Upload Handler (Firebase Storage with base64 client fallback)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const newImages: ArticleImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const storageRef = ref(storage, `articles/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const url = await new Promise<string>((resolve) => {
          uploadTask.on(
            'state_changed',
            null,
            (err) => {
              console.warn('Firebase storage upload fallback to base64 reader:', err);
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            },
            async () => {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadUrl);
            }
          );
        });

        const newImg: ArticleImage = {
          id: `img-${Date.now()}-${i}`,
          url,
          caption: file.name.replace(/\.[^/.]+$/, ""),
          altText: title || 'News Photo'
        };

        newImages.push(newImg);
      } catch (err) {
        console.warn('Image processing error:', err);
      }
    }

    setImages(prev => [...prev, ...newImages]);

    // If no featured image yet, set first uploaded as featured
    if (!featuredImage && newImages.length > 0) {
      setFeaturedImage(newImages[0].url);
    }

    setUploading(false);
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleInsertImageToContent = (imgUrl: string, caption?: string) => {
    const imgHtml = `
      <figure className="my-6">
        <img src="${imgUrl}" alt="${caption || 'Article photo'}" class="w-full rounded-lg my-3" />
        ${caption ? `<figcaption class="text-xs font-mono text-gray-500 text-center">${caption}</figcaption>` : ''}
      </figure>
      <p></p>
    `;
    document.execCommand('insertHTML', false, imgHtml);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // Submit & Save Article
  const handleSave = async (targetStatus?: Article['status']) => {
    if (!title.trim()) {
      alert('Article title is required before saving.');
      return;
    }

    setSaving(true);
    const htmlContent = editorRef.current ? editorRef.current.innerHTML : content;

    const selectedAuthor = authors.find(a => a.id === authorId);
    const selectedCat = categories.find(c => c.id === categoryId) || categories[0];

    const finalStatus = targetStatus || status;

    await saveArticle({
      id: editingArticleId || undefined,
      title,
      subtitle,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content: htmlContent,
      authorId: authorId || 'custom',
      authorName: authorName.trim() || selectedAuthor?.name || 'Editorial Board',
      authorAvatar: selectedAuthor?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      authorRole: authorRole.trim() || selectedAuthor?.role || 'Staff Journalist',
      categoryId: selectedCat?.id || 'politics',
      categoryName: selectedCat?.name || 'Politics',
      tags,
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200',
      images,
      status: finalStatus,
      featured,
      breakingNews,
      seoDescription,
      seoKeywords
    });

    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onFinish();
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Editor Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onFinish}
            className="p-2 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors"
            title="Back to Article List"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-brand text-2xl font-bold uppercase tracking-wider text-white">
              {editingArticleId ? 'Edit Article' : 'Compose New Article'}
            </h1>
            <p className="font-serif text-xs text-gray-400">
              Professional CMS Rich Text Editor & Photo Desk.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-mono font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            <span>Preview Page</span>
          </button>

          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-3.5 py-2 bg-amber-950 hover:bg-amber-900 text-amber-200 text-xs font-mono font-semibold rounded-lg border border-amber-800/80 transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Article changes saved successfully to Firestore database!</span>
        </div>
      )}

      {/* Main Workspace Layout (Left Content Editor, Right Metadata Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Title, Subtitle, Rich Formatting Toolbar, Content Area */}
        <div className="lg:col-span-8 space-y-5">
          {/* Headline Title Input */}
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Headline Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter compelling headline title..."
                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg font-display text-xl sm:text-2xl font-bold text-white placeholder-gray-600 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1">
                Subtitle / Dek
              </label>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Brief explanatory summary or deck line..."
                rows={2}
                className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg font-serif text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Professional Rich Text Formatting Toolbar */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-lg">
            <div className="p-2.5 bg-gray-950 border-b border-gray-800 flex flex-wrap items-center gap-1.5 text-gray-300">
              <button 
                onClick={() => execCommand('bold')}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-4 h-4" />
              </button>

              <button 
                onClick={() => execCommand('italic')}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-4 h-4" />
              </button>

              <button 
                onClick={() => execCommand('underline')}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Underline (Ctrl+U)"
              >
                <Underline className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-800 mx-1" />

              <button 
                onClick={() => handleInsertHeading('h2')}
                className="px-2 py-1 hover:bg-gray-800 rounded text-xs font-bold font-mono text-gray-300 hover:text-white"
                title="Heading 2"
              >
                H2
              </button>

              <button 
                onClick={() => handleInsertHeading('h3')}
                className="px-2 py-1 hover:bg-gray-800 rounded text-xs font-bold font-mono text-gray-300 hover:text-white"
                title="Heading 3"
              >
                H3
              </button>

              <button 
                onClick={handleInsertParagraph}
                className="px-2 py-1 hover:bg-gray-800 rounded text-xs font-bold font-mono text-gray-300 hover:text-white"
                title="Paragraph"
              >
                P
              </button>

              <div className="w-px h-5 bg-gray-800 mx-1" />

              <button 
                onClick={handleInsertBlockQuote}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Block Quote"
              >
                <Quote className="w-4 h-4" />
              </button>

              <button 
                onClick={handleInsertPullQuote}
                className="px-2 py-1 bg-red-950 text-red-300 hover:bg-red-900 rounded text-xs font-bold font-mono"
                title="Insert Pull Quote Box"
              >
                Pull Quote
              </button>

              <div className="w-px h-5 bg-gray-800 mx-1" />

              <button 
                onClick={() => execCommand('insertUnorderedList')}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>

              <button 
                onClick={() => execCommand('insertOrderedList')}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-800 mx-1" />

              <button 
                onClick={() => execCommand('justifyLeft')}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>

              <button 
                onClick={() => execCommand('justifyCenter')}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Align Center"
              >
                <AlignCenter className="w-4 h-4" />
              </button>

              <button 
                onClick={() => execCommand('justifyRight')}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Align Right"
              >
                <AlignRight className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-800 mx-1" />

              <button 
                onClick={handleInsertLink}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Insert Hyperlink"
              >
                <LinkIcon className="w-4 h-4" />
              </button>

              <button 
                onClick={() => execCommand('insertHorizontalRule')}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
                title="Horizontal Divider"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Editable Content Container */}
            <div
              ref={editorRef}
              contentEditable
              onInput={() => {
                if (editorRef.current) setContent(editorRef.current.innerHTML);
              }}
              className="p-6 min-h-[400px] bg-gray-900 text-gray-100 font-serif focus:outline-none article-content text-base leading-relaxed"
            />
          </div>

          {/* Multiple Image Upload Desk */}
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="font-brand font-bold text-sm uppercase text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-red-500" />
                Article Image Desk & Attachments
              </h3>
              <label className="px-3 py-1.5 bg-red-900 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-colors inline-flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photos</span>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>
            </div>

            {uploading && (
              <p className="text-xs font-mono text-amber-400">Processing image uploads to Firebase Storage...</p>
            )}

            {images.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-gray-800 rounded-lg text-xs text-gray-500 font-mono">
                Drag & drop multiple photos or click upload above to add article imagery.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group bg-gray-950 rounded-lg overflow-hidden border border-gray-800">
                    <img src={img.url} alt={img.caption || "Article photo"} className="w-full aspect-[4/3] object-cover" />
                    
                    <div className="p-2 space-y-1">
                      <input
                        type="text"
                        value={img.caption || ''}
                        onChange={(e) => {
                          const newCap = e.target.value;
                          setImages(images.map(i => i.id === img.id ? { ...i, caption: newCap } : i));
                        }}
                        placeholder="Caption..."
                        className="w-full px-1.5 py-1 bg-gray-900 border border-gray-800 rounded text-[10px] text-gray-300 font-mono"
                      />
                    </div>

                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setFeaturedImage(img.url)}
                        className={`p-1 rounded text-[10px] font-mono ${
                          featuredImage === img.url ? 'bg-amber-500 text-black font-bold' : 'bg-black/70 text-white hover:bg-amber-600'
                        }`}
                        title="Set as Featured Image"
                      >
                        <Star className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleInsertImageToContent(img.url, img.caption)}
                        className="p-1 bg-blue-600 text-white rounded text-[10px] font-mono hover:bg-blue-500"
                        title="Insert into text"
                      >
                        Insert
                      </button>

                      <button
                        onClick={() => handleRemoveImage(img.id)}
                        className="p-1 bg-red-600 text-white rounded text-[10px] font-mono hover:bg-red-500"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Article Metadata, Category, Author, Flags, SEO */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publishing & Flags */}
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 space-y-4">
            <h3 className="font-brand font-bold text-sm uppercase text-white pb-2 border-b border-gray-800">
              Publishing Options
            </h3>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">
                Article Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-red-600"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Public)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={breakingNews}
                  onChange={(e) => setBreakingNews(e.target.checked)}
                  className="rounded bg-gray-950 border-gray-800 text-red-600 focus:ring-0"
                />
                <span className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-red-500" />
                  Breaking News Flag
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded bg-gray-950 border-gray-800 text-red-600 focus:ring-0"
                />
                <span className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  Lead Featured Story
                </span>
              </label>
            </div>
          </div>

          {/* Desk & Author Assignment */}
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 space-y-4">
            <h3 className="font-brand font-bold text-sm uppercase text-white pb-2 border-b border-gray-800">
              Editorial Desk & Journalist
            </h3>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">
                Category Desk
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-red-600"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">
                Assigned Author
              </label>
              <div className="space-y-2">
                <select
                  value={authorId}
                  onChange={(e) => {
                    const selId = e.target.value;
                    setAuthorId(selId);
                    if (selId !== 'custom') {
                      const matched = authors.find(a => a.id === selId);
                      if (matched) {
                        setAuthorName(matched.name);
                        setAuthorRole(matched.role);
                      }
                    }
                  }}
                  className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-red-600"
                >
                  <option value="custom">✍️ Custom Author (Type Below)</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                  ))}
                </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 mb-0.5">Author Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => {
                        setAuthorName(e.target.value);
                        setAuthorId('custom');
                      }}
                      placeholder="e.g. Alisher Navoi"
                      className="w-full px-3 py-1.5 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 mb-0.5">Title / Designation</label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="e.g. Foreign Correspondent"
                      className="w-full px-3 py-1.5 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="article-url-slug"
                className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono text-gray-300 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Featured Image URL Input & Preview */}
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="font-brand font-bold text-sm uppercase text-white pb-2 border-b border-gray-800">
              Featured Hero Cover Image
            </h3>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono text-gray-300 focus:outline-none focus:border-red-600"
            />
            {featuredImage && (
              <img src={featuredImage} alt="Cover preview" className="w-full aspect-[16/9] object-cover rounded-lg border border-gray-800" />
            )}
          </div>

          {/* Tags Chips */}
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="font-brand font-bold text-sm uppercase text-white pb-2 border-b border-gray-800">
              Topic Tags
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-gray-800 text-gray-200 text-xs rounded-full flex items-center gap-1 font-mono">
                  #{tag}
                  <button onClick={() => handleRemoveTag(tag)} className="text-gray-400 hover:text-red-400"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type tag & press Enter..."
              className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono text-gray-300 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* SEO Metadata */}
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="font-brand font-bold text-sm uppercase text-white pb-2 border-b border-gray-800">
              Search Engine Optimization (SEO)
            </h3>
            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">SEO Description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Meta description for search results..."
                rows={2}
                className="w-full px-3 py-1.5 bg-gray-950 border border-gray-800 rounded text-xs text-gray-300 focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">SEO Keywords</label>
              <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="e.g. Uzbekistan, Samarkand, Silk Road"
                className="w-full px-3 py-1.5 bg-gray-950 border border-gray-800 rounded text-xs text-gray-300 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Live Article Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FBFBFA] dark:bg-[#0D0E11] text-gray-900 dark:text-gray-100 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto p-8 relative border border-gray-700">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 p-2 bg-gray-900 text-white rounded-full hover:bg-red-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="bg-red-900 text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded mb-4 inline-block">
              Live Preview Mode
            </span>

            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 leading-tight">{title || 'Untitled Headline'}</h1>
            {subtitle && <p className="font-serif text-lg italic text-gray-600 dark:text-gray-300 mb-6">{subtitle}</p>}

            {featuredImage && (
              <img src={featuredImage} alt="Cover" className="w-full aspect-[16/9] object-cover rounded-xl mb-6" />
            )}

            <div 
              className="article-content text-gray-800 dark:text-gray-200 leading-relaxed font-serif"
              dangerouslySetInnerHTML={{ __html: editorRef.current ? editorRef.current.innerHTML : content }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
