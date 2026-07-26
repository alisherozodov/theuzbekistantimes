import { Article, Category, Author, SiteSettings } from '../types/news';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'politics',
    name: 'Politics',
    slug: 'politics',
    description: 'Government policy, international diplomacy, regional legislative affairs, and state governance in Central Asia.',
    icon: 'Building2',
    order: 1,
    color: '#8B0000'
  },
  {
    id: 'business',
    name: 'Business & Economy',
    slug: 'business',
    description: 'Trade corridors, banking reforms, financial markets, privatization, energy investments, and Silk Road economic developments.',
    icon: 'TrendingUp',
    order: 2,
    color: '#047857'
  },
  {
    id: 'technology',
    name: 'Technology & AI',
    slug: 'technology',
    description: 'IT Park innovations, AI research, digital infrastructure, telecommunications, startups, and clean energy tech.',
    icon: 'Cpu',
    order: 3,
    color: '#1D4ED8'
  },
  {
    id: 'culture',
    name: 'Culture & Heritage',
    slug: 'culture',
    description: 'Uzbek literature, Samarkand architecture, UNESCO World Heritage, traditional crafts, cinema, and culinary arts.',
    icon: 'Landmark',
    order: 4,
    color: '#B45309'
  },
  {
    id: 'world',
    name: 'World News',
    slug: 'world',
    description: 'Global geopolitical shifts, international organization summits, foreign trade relations, and world affairs.',
    icon: 'Globe',
    order: 5,
    color: '#4338CA'
  },
  {
    id: 'science',
    name: 'Science & Climate',
    slug: 'science',
    description: 'Aral Sea ecological restoration, solar energy engineering, space technology, and agricultural science.',
    icon: 'Sparkles',
    order: 6,
    color: '#0D9488'
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    description: 'Olympic boxing champions, football leagues, chess grandmasters, and traditional Kurash wrestling.',
    icon: 'Trophy',
    order: 7,
    color: '#DC2626'
  },
  {
    id: 'education',
    name: 'Education',
    slug: 'education',
    description: 'University research programs, international academic partnerships, and youth talent development.',
    icon: 'GraduationCap',
    order: 8,
    color: '#6D28D9'
  },
  {
    id: 'opinion',
    name: 'Opinion & Analysis',
    slug: 'opinion',
    description: 'Thought leadership, expert commentaries, editorial perspectives, and strategic foresight.',
    icon: 'PenTool',
    order: 9,
    color: '#374151'
  }
];

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 'author-1',
    name: 'Dr. Shahlo Abdullaeva',
    role: 'Senior Diplomatic Editor',
    bio: 'Former fellow at the Oxford Centre for Global Studies, specializing in Central Asian international relations and Silk Road trade policy.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    email: 's.abdullaeva@uzbekistantimes.com'
  },
  {
    id: 'author-2',
    name: 'Javohir Toshpulatov',
    role: 'Technology & Economy Lead',
    bio: 'Investigative tech writer covering Central Asian fintech, IT Park developments, and AI adoption in emerging markets.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    email: 'j.toshpulatov@uzbekistantimes.com'
  },
  {
    id: 'author-3',
    name: 'Alisher Karimov',
    role: 'Cultural Historian & Columnist',
    bio: 'Author of three monographs on Timurid architectural heritage and traditional Central Asian textile arts.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    email: 'a.karimov@uzbekistantimes.com'
  },
  {
    id: 'author-4',
    name: 'Elena Rostova',
    role: 'Environmental & Science Correspondent',
    bio: 'Specialist in Aral Sea eco-restoration projects and Central Asian solar energy megaprojects.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    email: 'e.rostova@uzbekistantimes.com'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Silk Road High-Speed Rail Corridor Expansion Reaches Historic Milestone in Samarkand',
    subtitle: 'A major infrastructure leap connects Tashkent, Samarkand, and Bukhara with high-speed electrification, shortening transit times across Central Asia.',
    slug: 'silk-road-high-speed-rail-expansion-samarkand',
    content: `<p class="has-dropcap">In a historic ceremony held beneath the turquoise domes of Samarkand's Registan Square, state officials and international transport ministers inaugurated the newest 350-kilometer expansion of the Afrosiyob high-speed rail corridor. The project, representing an investment of $1.8 billion, promises to transform logistics and passenger transport across Eurasia.</p>

<h2>Transforming Central Asian Transit</h2>
<p>The updated infrastructure utilizes state-of-the-art tilt train technology capable of speeds up to 250 km/h, cutting journey times between the capital city of Tashkent and ancient Silk Road hubs by over 40 percent. Economic analysts project a 35% surge in eco-friendly regional tourism within the first 12 months of operations.</p>

<div class="pull-quote">"This high-speed corridor is not merely a transport line—it is a modern spine reconnecting the historic trade routes of Central Asia to global markets."</div>

<p>Speaking at the launch event, senior transport authorities emphasized that environmental sustainability was built into every phase of construction. Solar energy farms along the Kyzylkum desert segment provide up to 30% of the electrification grid's power during peak operational hours.</p>

<h2>Regional Economic Integration</h2>
<p>Modernized rail hubs will also facilitate streamlined customs procedures for international freight forwarders transporting goods between East Asia and Western Europe. By reducing reliance on long-haul diesel trucking, the project is anticipated to abate over 180,000 metric tons of carbon emissions annually.</p>

<h3>Key Infrastructure Highlights:</h3>
<ul>
  <li>350 kilometers of double-tracked electrified line with advanced digital signaling</li>
  <li>Next-generation Afrosiyob trainsets built with reinforced thermal insulation for desert climates</li>
  <li>New multimodal passenger terminals in Navoi and Bukhara featuring solar canopy roofs</li>
  <li>Integrated automated baggage transfer systems and 5G passenger connectivity</li>
</ul>

<p>International observers from the World Bank and Asian Development Bank hailed the milestone as a benchmark model for green infrastructure investment across developing transit corridors.</p>`,
    authorId: 'author-1',
    authorName: 'Dr. Shahlo Abdullaeva',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    authorRole: 'Senior Diplomatic Editor',
    categoryId: 'business',
    categoryName: 'Business & Economy',
    tags: ['Infrastructure', 'Railways', 'Samarkand', 'Silk Road', 'Green Energy'],
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1200',
    images: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1200',
        caption: 'High-speed Afrosiyob train arriving at the newly expanded Samarkand Railway Complex.',
        altText: 'High speed train in Uzbekistan'
      },
      {
        id: 'img-2',
        url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=1200',
        caption: 'Traditional tiles meeting modern architectural finishes inside the terminal lobby.',
        altText: 'Registan architecture'
      }
    ],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    readingTime: 5,
    views: 1420,
    status: 'published',
    featured: true,
    breakingNews: true,
    seoDescription: 'High-speed Afrosiyob rail expansion inaugurated in Samarkand, transforming Central Asian travel and Silk Road economics.',
    seoKeywords: 'Uzbekistan rail, Afrosiyob, Samarkand, high speed train, Silk Road, Central Asia economy'
  },
  {
    id: 'art-2',
    title: 'Tashkent Tech Summit Highlights AI Breakthroughs and Startup Acceleration across Eurasia',
    subtitle: 'Over 5,000 international technology leaders gather at IT Park Tashkent as venture capital investment in Uzbek AI software startups triples year-over-year.',
    slug: 'tashkent-tech-summit-ai-breakthroughs-startup-acceleration',
    content: `<p class="has-dropcap">IT Park Tashkent hosted the opening plenary of the annual Eurasia Tech Future Summit today, drawing venture capital founders, machine learning researchers, and sovereign technology funds from 30 countries. The conference highlighted rapid gains in Uzbek language model natural processing research and agricultural artificial intelligence.</p>

<h2>A Regional Hub for Digital Talent</h2>
<p>Over the past three years, government tax incentives and streamlined IT visas have attracted over 600 international technology firms to establish regional engineering headquarters in Tashkent. Local university graduates now fuel an expanding workforce proficient in cloud architecture, machine learning, and cybersecurity.</p>

<blockquote class="pull-quote">"Central Asia is transitioning from a consumer of global tech solutions to an active engine of software innovation and generative AI engineering."</blockquote>

<p>Key highlights from the morning keynote included the unveiling of <em>Navoiy-LLM</em>, an open-weight multilingual large language model optimized for Central Asian languages including Uzbek, Kazakh, Kyrgyz, and Karakalpak.</p>

<h3>Summit Highlights:</h3>
<ul>
  <li>$120 million venture fund launched for regional deep-tech and climate software startups</li>
  <li>Demonstrations of autonomous solar-powered drone mapping for precision cotton farming</li>
  <li>Partnership announced with global cloud providers to build Uzbekistan's first green supercomputing data center</li>
</ul>

<p>Panel discussions will continue tomorrow focusing on fintech integration, digital currency frameworks, and cross-border tech talent mobility.</p>`,
    authorId: 'author-2',
    authorName: 'Javohir Toshpulatov',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    authorRole: 'Technology & Economy Lead',
    categoryId: 'technology',
    categoryName: 'Technology & AI',
    tags: ['Artificial Intelligence', 'IT Park', 'Tashkent', 'Startups', 'Eurasia Tech'],
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    images: [
      {
        id: 'img-3',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
        caption: 'Keynote hall at IT Park Tashkent during the opening presentation on green AI infrastructure.',
        altText: 'Tech conference hall'
      }
    ],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    readingTime: 4,
    views: 980,
    status: 'published',
    featured: true,
    breakingNews: false,
    seoDescription: 'IT Park Tashkent hosts major Eurasia Tech Summit spotlighting AI development and venture capital growth.',
    seoKeywords: 'Tashkent tech, IT Park Uzbekistan, AI startups, Central Asia innovation'
  },
  {
    id: 'art-3',
    title: 'Preserving the Masterpiece: Unveiling Restored Frescoes at the Shah-i-Zinda Necropolis',
    subtitle: 'A ten-year restoration effort combines ancient ceramic craft techniques with laser spectral imaging to protect 14th-century Timurid mosaic masterpieces.',
    slug: 'preserving-restored-frescoes-shah-i-zinda-necropolis',
    content: `<p class="has-dropcap">A dedicated team of master Uzbek ceramicists and international conservators has completed a landmark ten-year restoration project at the Shah-i-Zinda complex in Samarkand. The breathtaking avenue of mausoleums, famous for its cobalt blue tiles and intricate majolica artwork, now stands protected against environmental weathering for generations to come.</p>

<h2>Fusing Traditional Heritage with Modern Science</h2>
<p>The restoration integrated non-destructive laser spectral analysis to map microscopic glaze deterioration without disturbing the underlying 600-year-old terracotta brickwork. Master artisans recreated missing cobalt glazes using authentic mineral pigments harvested from historical queries in the Zarafshan valley.</p>

<p>Dr. Alisher Karimov, lead cultural researcher on the project, emphasized that authenticity was preserved at every stage. "Every tile repaired carries the precise thermal signature and chemical composition utilized during the reign of Amir Timur," Dr. Karimov explained.</p>

<h3>Exhibition Details:</h3>
<p>A new visitor educational center adjacent to the complex features immersive 3D digital scans of the mausoleums, allowing art lovers worldwide to inspect the microscopic geometry of Islamic calligraphy and geometric mosaic tiles.</p>`,
    authorId: 'author-3',
    authorName: 'Alisher Karimov',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    authorRole: 'Cultural Historian & Columnist',
    categoryId: 'culture',
    categoryName: 'Culture & Heritage',
    tags: ['Shah-i-Zinda', 'Samarkand', 'Art Restoration', 'UNESCO', 'Timurid Heritage'],
    featuredImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1200',
    images: [
      {
        id: 'img-4',
        url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1200',
        caption: 'The majestic cobalt mosaic archway of Shah-i-Zinda following conservation efforts.',
        altText: 'Shah-i-Zinda Samarkand'
      }
    ],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    readingTime: 6,
    views: 1890,
    status: 'published',
    featured: false,
    breakingNews: false,
    seoDescription: 'Ten-year restoration project completes at Shah-i-Zinda in Samarkand using traditional craft and laser technology.',
    seoKeywords: 'Shah i Zinda, Samarkand restoration, Timurid architecture, Uzbekistan UNESCO'
  },
  {
    id: 'art-4',
    title: 'The Great Green Shield: How Forestation Projects Are Transforming the Aral Seabed',
    subtitle: 'Over 2 million hectares of drought-resistant Saxaul trees create a thriving ecosystem across the Aralkum desert, stabilizing soil and restoring wildlife habitat.',
    slug: 'great-green-shield-forestation-aral-seabed',
    content: `<p class="has-dropcap">Where turbulent saline waters once stretched across the horizon, vast green corridors of hardy Saxaul trees now blanket over two million hectares of the Aralkum desert. Initiated as an emergency ecological response, the forestation program has grown into one of the world's most ambitious environmental reclamation initiatives.</p>

<h2>Botanical Engineering Against Desertification</h2>
<p>The deep roots of the native Saxaul tree act as natural biological anchors, locking shifting saline sands into place and dramatically reducing airborne salt dust storms. Satellite telemetry demonstrates a 60% reduction in dust dispersion reaching populated zones in Karakalpakstan over the past five years.</p>

<p>Local communities have reported the return of native fauna including wild gazelles and migratory birds. Ecological institutes are now testing saline-tolerant shrubs that produce organic essential oils, providing sustainable eco-employment for local agricultural cooperatives.</p>`,
    authorId: 'author-4',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    authorRole: 'Environmental & Science Correspondent',
    categoryId: 'science',
    categoryName: 'Science & Climate',
    tags: ['Aral Sea', 'Ecology', 'Forestation', 'Climate Change', 'Karakalpakstan'],
    featuredImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200',
    images: [],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    readingTime: 5,
    views: 1120,
    status: 'published',
    featured: false,
    breakingNews: false,
    seoDescription: 'Forestation initiatives cover 2 million hectares of the Aral seabed with Saxaul trees, combatting desertification.',
    seoKeywords: 'Aral Sea, environmental restoration, Karakalpakstan, Saxaul tree, climate adaptation'
  },
  {
    id: 'art-5',
    title: 'Uzbekistan Golden Boxing Generation Prepares for World Championship Defense',
    subtitle: 'National Olympic squad heads to international training camp following dominant victories in international tournaments across Asia and Europe.',
    slug: 'uzbekistan-golden-boxing-generation-world-championship',
    content: `<p class="has-dropcap">Uzbekistan's elite boxing delegation departed Tashkent today bound for an intensive altitude training retreat in Chimgan, signaling the start of final preparations for the upcoming World Boxing Championships. Renowned globally for technical precision and relentless conditioning, the national team aims to defend its top spot on the medal table.</p>

<p>Head coach Tulkin Kilichev noted that youth development programs established across regional academies in Andijan, Fergana, and Samarkand continue to yield remarkable talent. "Our boxers combine traditional ring discipline with world-class biomechanical analytics," Kilichev stated.</p>`,
    authorId: 'author-2',
    authorName: 'Javohir Toshpulatov',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    authorRole: 'Technology & Economy Lead',
    categoryId: 'sports',
    categoryName: 'Sports',
    tags: ['Boxing', 'Uzbekistan Sports', 'World Championship', 'Olympic Games'],
    featuredImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=1200',
    images: [],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    readingTime: 3,
    views: 840,
    status: 'published',
    featured: false,
    breakingNews: false,
    seoDescription: 'Uzbekistan boxing team begins intensive Chimgan training camp ahead of World Championships defense.',
    seoKeywords: 'Uzbekistan boxing, Olympic champions, Chimgan sports, sports news Tashkent'
  },
  {
    id: 'art-6',
    title: 'Central Asia & World Economic Forum: Strengthening Multilateral Trade Networks',
    subtitle: 'Delegates agree on new tariff harmonization policies and green energy trade agreements to accelerate regional prosperity.',
    slug: 'central-asia-world-economic-forum-trade-networks',
    content: `<p class="has-dropcap">Ministers of trade and economy from across Central Asia concluded landmark multilateral consultations today, signing joint resolutions on unified border clearance systems and renewable energy grid interconnectivity.</p>

<p>The agreements set ambitious targets for expanding regional trade volume by 50% over the next three years, focusing on agricultural exports, pharmaceutical manufacturing, and renewable solar energy exports.</p>`,
    authorId: 'author-1',
    authorName: 'Dr. Shahlo Abdullaeva',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    authorRole: 'Senior Diplomatic Editor',
    categoryId: 'world',
    categoryName: 'World News',
    tags: ['Diplomacy', 'Trade', 'Eurasia', 'Economic Forum'],
    featuredImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
    images: [],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    readingTime: 4,
    views: 730,
    status: 'published',
    featured: false,
    breakingNews: false,
    seoDescription: 'Central Asian economic ministers finalize trade harmonization and renewable energy sharing frameworks.',
    seoKeywords: 'Central Asia trade, Uzbekistan foreign policy, Silk Road economy'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'The Uzbekistan Times',
  tagline: 'Independent Global Journalism & Voice of Central Asia',
  breakingNewsActive: true,
  breakingNewsText: 'LIVE: High-speed rail corridor expansion between Tashkent and Samarkand officially opened to passengers',
  breakingNewsLink: '/article/silk-road-high-speed-rail-expansion-samarkand',
  edition: 'Uzbekistan',
  contactEmail: 'editorial@uzbekistantimes.com',
  socialLinks: {
    twitter: 'https://twitter.com/uzbekistantimes',
    telegram: 'https://t.me/uzbekistantimes',
    facebook: 'https://facebook.com/uzbekistantimes',
    instagram: 'https://instagram.com/uzbekistantimes'
  }
};
