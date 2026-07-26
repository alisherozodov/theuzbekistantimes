# The Uzbekistan Times — International News & Journalism Platform

A full-stack international news platform engineered with **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Firebase (Firestore & Authentication & Storage)**.

---

## 🌟 Key Features

### 📰 Public Newspaper Platform
* **Editorial Masthead**: Real-time date display, currency exchange rates (USD/EUR to UZS), weather updates (Tashkent, Samarkand), theme toggle (Light/Dark mode), font size adjuster, and edition switcher (*Uzbekistan* vs. *Global*).
* **Newspaper Front Page**:
  * **Lead Hero Story**: Prominent hero photo with subtitle, author, time, reading time, breaking news badge, and adjacent top bulletins.
  * **Breaking News Alert Ticker**: Pulsing live ticker for emergency bulletins.
  * **Category Desks**: Technology & AI, Business & Eurasia Economy, Politics, Culture & Heritage, Science & Climate, Sports, World, Education, and Opinion Columnists.
  * **Visual Journalism Photo Spotlight**: Carousel featuring field photo stories.
  * **Most Popular Ranking**: Numbered top-read stories based on real Firestore view counters.
  * **Search Engine**: Real-time modal search filtering titles, subtitles, authors, tags, and categories.
  * **Reader Saved List**: Client-side article bookmarking for offline reading.
  * **Individual Article Page**:
    * Breadcrumbs (`Home > Category > Title`).
    * Hero cover image with photo agency credits.
    * Author bio avatar, title, and social links.
    * Sticky social share sidebar (X/Twitter, Facebook, Telegram, Copy Link, Bookmark, Print).
    * Rich text typography with lead paragraph drop caps, pull quotes, code blocks, dividers, and bullet lists.
    * Field photography gallery lightbox.
    * Interactive real-time reader discussion comments powered by Firestore.
* **Newsletter Subscription**: Daily briefing signup stored in Firebase.

### 🔐 Secret Administrator CMS Portal (`/management`)
* **Undiscoverable by Ordinary Users**: No visible links, header buttons, footer items, or sitemap references to the admin route.
* **Route Protection**: Unauthenticated access to `#/management` triggers a sleek administrator authentication gateway.
* **Authentication Options**: Supports Firebase Authentication (`signInWithEmailAndPassword`) using credentials created in Firebase Console, with instant demo admin mode support.
* **CMS Dashboard Suite**:
  * **Analytics Overview**: Published count, drafts pending, total views, active desks, recent entry table, activity audit log.
  * **Article Manager**: Searchable table with category filters, status filters (*Published*, *Draft*, *Archived*), breaking news flags, lead story toggles, and deletion/editing actions.
  * **Rich Text Article Editor**:
    * Custom formatting toolbar (H2, H3, Paragraph, Bold, Italic, Underline, Block Quote, Pull Quote, Bullet/Numbered lists, Hyperlinks, Horizontal dividers, Alignments).
    * Multi-image drag & drop upload to Firebase Storage with captioning, alt text, featured photo selector, and inline insertion.
    * Comprehensive metadata (Title, Subtitle, Slug generator, Assigned Author, Category Desk, Tag chips, Status, Breaking flag, Featured flag, SEO Description, SEO Keywords, Reading Time auto-calculator).
    * Live Article Preview before publishing.
  * **Media Library**: Visual grid of uploaded photography with URL copying.
  * **Category Desk Manager**: Create, edit, and manage section desks.
  * **Publication Site Settings**: Masthead branding, breaking news ticker banner text & toggle, contact email, social links.

---

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React
- **Backend & Database**: Firebase Firestore, Firebase Authentication, Firebase Storage
- **Animations**: Motion / Framer Motion
- **Build Tool**: Vite

---

## 🚀 Deployment Instructions for Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of The Uzbekistan Times"
   git remote add origin https://github.com/your-username/the-uzbekistan-times.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new) and import your GitHub repository.
   - Set Framework Preset to **Vite**.
   - Set Build Command to: `npm run build`
   - Set Output Directory to: `dist`

3. **Configure Environment Variables on Vercel**:
   Add the following variables in Vercel Project Settings > Environment Variables:
   - `VITE_FIREBASE_API_KEY`: Your Firebase API Key
   - `VITE_FIREBASE_AUTH_DOMAIN`: `gen-lang-client-0144282803.firebaseapp.com`
   - `VITE_FIREBASE_PROJECT_ID`: `gen-lang-client-0144282803`
   - `VITE_FIREBASE_STORAGE_BUCKET`: `gen-lang-client-0144282803.firebasestorage.app`
   - `VITE_FIREBASE_APP_ID`: `1:360307001093:web:556201effd64d73639d96c`

4. **Deploy**: Click **Deploy**. Vercel will build and launch your site globally.

---

## 🔐 Accessing the Secret Admin Dashboard

To access the administrator CMS portal:
1. Append `#/management` (or `#/portal`) to your website URL:
   `https://your-domain.vercel.app/#/management`
2. Log in using your Firebase Authentication email and password created in Firebase Console, or click **Instant Demo Admin Access**.

---

## 📄 License
Apache 2.0 / Proprietary License for The Uzbekistan Times.
