import { Product } from '../../app/Models/Product';

const productData = [
  {
    name: 'Giscrap',
    slug: 'giscrap',
    category: 'AI & Agentic Workflows',
    description:
      'Discover GitHub profiles by keywords, location, and stars — enrich emails and LinkedIn, then send purpose-tagged campaigns with AI-personalized copy.',
    image: '/products/giscrap-dashboard.png',
    portfolio_id: 'p010',
    url: 'https://giscrap.duckdns.org/',
  },
  {
    name: 'Echo3s',
    slug: 'echo3s',
    category: 'AI & Agentic Workflows',
    description:
      'Empowering independent authors and production companies to create professional audiobooks with cutting-edge AI voice technology.',
    image: '/products/Echo3s.webp',
    portfolio_id: 'p007',
    url: 'https://echo3s.io/',
  },
  {
    name: 'Nerohalla',
    slug: 'nerohalla',
    category: 'SaaS & Startup MVPs',
    description:
      'AI-powered job search and application tracking — discover roles, manage applications, build your profile, and generate tailored resumes from one premium platform.',
    image: '/products/Landing_1.webp',
    portfolio_id: 'p009',
    url: 'https://nerohalla.up.railway.app/',
  },
  {
    name: 'Dustai',
    slug: 'dustai',
    category: 'AI & Agentic Workflows',
    description:
      'An enterprise-grade AI agent system that automates internal knowledge workflows, enabling teams to query, summarize, and act on organizational data.',
    image: '/products/Dustai.webp',
    portfolio_id: 'p002',
    url: 'https://dust.tt',
  },
  {
    name: 'Relevance AI',
    slug: 'relevance-ai',
    category: 'AI & Agentic Workflows',
    description:
      'A visual agent orchestration platform for building data-driven AI workflows, enabling automation across research, analytics, and business operations.',
    image: '/products/Relevance AI.webp',
    portfolio_id: 'p003',
    url: 'https://relevanceai.com',
  },
  {
    name: 'Retool',
    slug: 'retool',
    category: 'Cloud-Native Dashboards',
    description:
      'Popular among startups for building internal dashboards fast. Combines APIs, databases, and UI components in a drag-and-drop builder.',
    image: '/products/Retool.webp',
    portfolio_id: 'p004',
    url: 'https://retool.com/templates',
  },
  {
    name: 'AI Internal Tool Generator',
    slug: 'ai-internal-tool-generator',
    category: 'SaaS & Startup MVPs',
    description:
      'A tool that generates internal dashboards and apps using AI prompts. Designed for startups that need quick admin panels without full engineering effort.',
    image: '/products/AI Internal Tool Generator.webp',
    portfolio_id: 'p005',
    url: 'https://build0.dev',
  },
  {
    name: 'Dub',
    slug: 'dub',
    category: 'SaaS & Startup MVPs',
    description:
      'A modern link shortener built for startups. Focuses on analytics, branded links, and API-first usage.',
    image: '/products/Dub.webp',
    portfolio_id: 'p006',
    url: 'https://dub.co',
  },
  {
    name: 'RadarOmega Cams',
    slug: 'radaromega-cams',
    category: 'Business & Corporate Websites',
    description:
      'RadarOmega Cams provides live camera feeds and accurate atmospheric data, including temperature, pressure, wind speed, and direction along with their trends.',
    image: '/products/RadarOmega Cams.webp',
    portfolio_id: 'p008',
    url: 'https://cycloneport.com/networkdashboard/',
  },
];

export default class ProductSeeder {
  async run(): Promise<void> {
    const existing = await Product.all();
    if (existing.length > 0) {
      console.log(`Products collection already has ${existing.length} documents, skipping seed.`);
      return;
    }

    for (const product of productData) {
      await Product.create(product);
    }
    console.log(`Seeded ${productData.length} products.`);
  }
}
