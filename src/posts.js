// The published editorial content, in one place. The blog index, the use-cases index,
// and each article's "continue reading" strip all read from here, so adding a post
// means adding one entry — not editing four pages.

export const POSTS = [
  {
    href: '/blog-ivaak-ai', kind: 'guide',
    title: 'How AI voice agents are changing customer engagement',
    category: 'AI Voice Agents',
    readTime: '7 min read',
    excerpt: 'Customer expectations outgrew IVR menus. Here is how enterprise-grade voice agents hold real conversations across voice, WhatsApp, email and chat — and where a person still has to take over.',
    img: '/img/iVaak%20AI%20blog%20img.jpg',
    alt: 'iVaak AI voice agents handling customer conversations',
  },
  {
    href: '/blog-trufix-ai', kind: 'guide',
    title: "Why a “Resolved” ticket often isn't",
    category: 'IT Support & Automation',
    readTime: '8 min read',
    excerpt: 'A ticket marked resolved does not mean the issue was fixed. How resolution verification with AI callbacks and audit-first tracking rebuilds trust in IT support.',
    img: '/img/TruFix%20AI%20blog%20img.jpg',
    alt: 'TruFix AI verifying an IT ticket resolution',
  },
  {
    href: '/blog-iwac-ai', kind: 'guide',
    title: 'Running sales and support on WhatsApp',
    category: 'WhatsApp & AI Chatbots',
    readTime: '6 min read',
    excerpt: 'How businesses capture leads, take orders, collect payments and support customers on the one channel people actually open — without adding headcount.',
    img: '/img/iWak%20blog.jpg',
    alt: 'iWac AI handling WhatsApp business engagement',
  },
  {
    href: '/blog-choosing-processes', kind: 'guide',
    title: 'How to choose the first process to automate',
    category: 'Adopting AI',
    readTime: '6 min read',
    excerpt: 'Most failed AI projects picked the wrong process, not the wrong model. The five tests we run before agreeing to build anything.',
    img: '/img/industry/ai-genai-services.svg',
    alt: 'Layered neural network resolving to a single output',
  },
  {
    href: '/blog-human-in-the-loop', kind: 'guide',
    title: 'Where a person has to stay in the loop',
    category: 'Adopting AI',
    readTime: '7 min read',
    excerpt: 'Full autonomy is rarely the goal. How we decide which decisions an agent commits, which it drafts for review, and which it never touches.',
    img: '/img/industry/agentic-ai.svg',
    alt: 'Orchestrator directing specialist agents in orbit',
  },
  {
    href: '/blog-ai-integration-reality', kind: 'note',
    title: 'What AI integration actually involves',
    category: 'Engineering',
    readTime: '8 min read',
    excerpt: 'The model is rarely the hard part. What the work really consists of when an agent has to talk to the systems you already run.',
    img: '/img/industry/erp-services.svg',
    alt: 'Business modules connected around a shared data core',
  },
];

export const CASES = [
  {
    href: '/usecase-ivaak-healthcare',
    title: 'A multi-specialty clinic that stopped missing calls',
    category: 'Healthcare',
    readTime: 'Illustrative scenario',
    excerpt: 'Patients were hanging up before reception could answer. iVaak now takes every inbound call, books appointments against the existing scheduling system, and escalates anything clinical to staff.',
    img: '/img/iVaak%20AI%20Healthcare%20CS.jpg',
    alt: 'iVaak AI handling patient calls for a multi-specialty clinic',
  },
  {
    href: '/usecase-ivaak-realestate',
    title: 'A developer qualifying every inbound property enquiry',
    category: 'Real estate',
    readTime: 'Illustrative scenario',
    excerpt: 'More than a third of inbound leads were never contacted inside the first half hour. Voice agents now qualify buyers on arrival and schedule site visits straight into the sales calendar.',
    img: '/img/iVaakAI_Realestate.jpg',
    alt: 'iVaak AI qualifying property buyers for a real estate developer',
  },
  {
    href: '/usecase-ivaak-customercare',
    title: 'Tier-1 support across four channels at once',
    category: 'Customer care',
    readTime: 'Illustrative scenario',
    excerpt: 'Routine enquiries arrive by voice, WhatsApp, chat and email. The agent handles the repeatable ones and hands the rest to a person with the full conversation attached.',
    img: '/img/iVaakAI_Customer%20Care.jpg',
    alt: 'iVaak AI handling tier-one customer support across channels',
  },
];

// Everything except `href`, for "continue reading" strips on the article pages.
export const otherPosts = (currentHref, pool = POSTS) => pool.filter((p) => p.href !== currentHref);
