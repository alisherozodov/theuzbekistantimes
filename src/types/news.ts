export type ArticleStatus = 'published' | 'draft' | 'archived';

export interface ArticleImage {
  id: string;
  url: string;
  caption?: string;
  altText?: string;
  isFeatured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string; // HTML or Markdown formatted string
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  categoryId: string;
  categoryName: string;
  tags: string[];
  featuredImage: string;
  images: ArticleImage[];
  publishedAt: string; // ISO string
  updatedAt: string; // ISO string
  readingTime: number; // in minutes
  views: number;
  status: ArticleStatus;
  featured: boolean;
  breakingNews: boolean;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  order: number;
  color?: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  breakingNewsActive: boolean;
  breakingNewsText: string;
  breakingNewsLink?: string;
  edition: 'Uzbekistan' | 'Global';
  contactEmail: string;
  socialLinks: {
    twitter?: string;
    telegram?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface ActivityLog {
  id: string;
  action: string;
  articleTitle?: string;
  timestamp: string;
  user: string;
}
