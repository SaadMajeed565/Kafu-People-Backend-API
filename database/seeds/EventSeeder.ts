import { Event } from '../../app/Models/Event';

const eventData = [
  {
    title: 'Kafu People Launches Dedicated AI Agent Practice',
    slug: 'kafu-people-launches-ai-agent-practice',
    date: new Date('2026-05-28'),
    location: 'Remote',
    type: 'Events',
    description:
      "We're formalising years of agent-building experience into a dedicated practice helping clients ship production-grade AI agents.",
    images: '/images/newsAndEvents/news.webp',
  },
  {
    title: 'Echo3s Reaches Public Launch Milestone',
    slug: 'echo3s-reaches-launch-milestone',
    date: new Date('2026-05-12'),
    location: 'Remote',
    type: 'Events',
    description:
      'The AI-powered audiobook platform we built with our partners has gone live to the public after a successful beta.',
    images: '/images/newsAndEvents/echo3s-reaches-launch-milestone.jpg',
  },
  {
    title: 'Kafu People at Amsterdam Tech Week 2026',
    slug: 'kafu-people-joins-amsterdam-tech-week',
    date: new Date('2026-04-30'),
    location: 'Amsterdam, Netherlands',
    type: 'Conference',
    description:
      'Our team will be on the ground at Amsterdam Tech Week, joining sessions on applied AI and modern cloud delivery.',
    images: '/images/newsAndEvents/kafu-people-joins-amsterdam-tech-week.jpg',
  },
  {
    title: 'Introducing Our Cloud-Native Dashboard Starter',
    slug: 'new-cloud-native-dashboard-template',
    date: new Date('2026-04-15'),
    location: 'Remote',
    type: 'Events',
    description:
      "We've packaged our most-used dashboard patterns into a reusable starter so client projects begin further down the road.",
    images: '/images/newsAndEvents/new-cloud-native-dashboard-template.jpg',
  },
  {
    title: 'Kafu People Partners with Nerohalla',
    slug: 'kafu-people-partners-with-nerohalla',
    date: new Date('2026-03-22'),
    location: 'Remote',
    type: 'Events',
    description:
      "We've teamed up with Nerohalla to bring their product vision to life as a development partner.",
    images: '/images/newsAndEvents/kafu-people-partners-with-nerohalla.jpg',
  },
  {
    title: 'Team Spotlight: How We Work as a Remote-First Team',
    slug: 'team-spotlight-engineering-culture',
    date: new Date('2026-03-05'),
    location: 'Remote',
    type: 'Team Spotlight',
    description:
      'A look behind the scenes at the distributed, remote-first culture that keeps our team shipping.',
    images: '/images/newsAndEvents/team-spotlight-engineering-culture.jpg',
  },
  {
    title: 'Lessons from a Year of Shipping Startup MVPs',
    slug: 'lessons-from-a-year-of-shipping-mvps',
    date: new Date('2026-02-18'),
    location: 'Remote',
    type: 'Events',
    description:
      'What a year of six-week MVP builds taught us about scope, speed, and the discipline of saying no.',
    images: '/images/newsAndEvents/lessons-from-a-year-of-shipping-mvps.jpg',
  },
  {
    title: 'We Hosted an Applied AI Workshop for Founders',
    slug: 'hosting-applied-ai-workshop',
    date: new Date('2026-01-29'),
    location: 'Remote',
    type: 'Workshop',
    description:
      'A hands-on session helping non-technical founders separate genuine AI opportunities from the hype.',
    images: '/images/newsAndEvents/hosting-applied-ai-workshop.jpg',
  },
  {
    title: 'A Fresh Look: Our Website Gets a Refresh',
    slug: 'kafu-people-website-refresh',
    date: new Date('2026-01-14'),
    location: 'Remote',
    type: 'Events',
    description:
      "We've rebuilt our site with a cleaner design, faster performance, and room to share more of our work.",
    images: '/images/newsAndEvents/kafu-people-website-refresh.jpg',
  },
  {
    title: 'Client Results: A Smooth Laravel to MongoDB Migration',
    slug: 'client-results-database-migration',
    date: new Date('2025-12-20'),
    location: 'Remote',
    type: 'Moments & Memories',
    description:
      'How we helped a client migrate a production database with zero downtime and a measurable performance gain.',
    images: '/images/newsAndEvents/client-results-database-migration.jpg',
  },
];

export default class EventSeeder {
  async run(): Promise<void> {
    const existing = await Event.all();
    if (existing.length > 0) {
      console.log(`Events collection already has ${existing.length} documents, skipping seed.`);
      return;
    }

    for (const event of eventData) {
      await Event.create(event);
    }
    console.log(`Seeded ${eventData.length} events.`);
  }
}
