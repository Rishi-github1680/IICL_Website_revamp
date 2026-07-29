// Top nav — four sections: Agentic AI, AI Solutions, About Us (Services/Industries/Resources
// folded inside), Contact Us. Footer reads the named exports directly.
// `logo` is the small mark shown beside the name in the nav panel and footer.
// `disabled: true` renders the row but makes it non-interactive (not yet launched).
// Three products are commented out rather than deleted — their pages still build,
// they are simply unlinked from the menus. Uncomment a line to bring one back.
export const PRODUCTS = [
  { label: 'iCognito.ai', acc: '#ff6361', href: '/icognito', tag: 'Conversational AI', desc: 'Conversational AI across every channel', logo: '/img/icognito.svg', thumb: '/img/banners/A4-banner-icognito.png', site: 'https://icognito.ai' },
  { label: 'iDental.ai', acc: '#ff413f', href: '/idental', tag: 'Dental SaaS', desc: 'Practice management for dental clinics', logo: '/img/idental.svg', thumb: '/img/banners/A6-banner-idental.png', site: 'https://idental.ai' },
  { label: 'iVaak.ai', acc: '#ee2f2e', href: '/ivaak', tag: 'Voice AI', desc: 'Multilingual AI voice agents', logo: '/img/ivaak.svg', thumb: '/img/banners/A2-banner-ivaak.png', site: 'https://ivaak.ai' },
  { label: 'TruFix.ai', acc: '#c11514', href: '/trufix', tag: 'AI Ticketing', desc: 'Ticketing that verifies resolutions', logo: '/img/trufix.svg', thumb: '/img/banners/A8-banner-trufix.png', site: 'https://trufix.ai' },
  { label: 'iWac.ai', acc: '#e35553', href: '/iwac', tag: 'WhatsApp Commerce', desc: 'WhatsApp commerce and support', logo: '/img/iwac.svg', thumb: '/img/banners/A3-banner-iwac.png', site: 'https://iwac.ai' },
  { label: 'ChilliFries.ai', acc: '#ff7043', href: '/chillifries', tag: 'Coming Soon', desc: 'Our newest product — launching soon', logo: '/img/chillifries.svg', site: 'https://chillifries.ai', soon: true, disabled: true },

  // Withdrawn from the menus for now — pages remain, just unlinked.
  // { label: 'LexGenie.ai', acc: '#ff8d8b', href: '/lexgenie', tag: 'Legal AI', desc: 'Legal document review and drafting', logo: '/img/lexgenie.svg', thumb: '/img/banners/A5-banner-lexgenie.png', site: 'https://lexgenie.ai' },
  // { label: 'QuantaFin.ai', acc: '#d92a28', href: '/quantafin', tag: 'Finance AI', desc: 'GenAI financial analysis', thumb: '/img/banners/A9-banner-quantafin.png', site: 'https://quantafin.ai' },
  // { label: 'PerformEdge.ai', acc: '#a01110', href: '/performedge', tag: 'Workforce AI', desc: 'Facial-recognition workforce management', thumb: '/img/banners/A7-banner-performedge.png', site: 'https://performedge.ai' },
];

export const SERVICES = [
  { label: 'AI & GenAI Services', href: '/ai-genai-services', icon: '/img/ser-menu1.svg', desc: 'Strategy to deployment' },
  { label: 'Web & Mobile Development', href: '/web-mobile-dev', icon: '/img/ser-menu5.svg', desc: 'Apps built end to end' },
  { label: 'WhatsApp Business', href: '/whatsapp-business', icon: '/img/ser-menu7.svg', desc: 'Commerce & support at scale' },
  { label: 'ERP Services', href: '/erp-services', icon: '/img/ser-menu8.svg', desc: 'Selection, rollout, integration' },
  { label: 'Staff Augmentation', href: '/staff-augmentation', icon: '/img/ser-menu9.svg', desc: 'Vetted engineering capacity' },
  { label: 'IT Help Desk', href: '/helpdesk', icon: '/img/ser-menu10.svg', desc: 'Managed user support' },
];

// Icons redrawn as one family (24px grid, 1.8 stroke, currentColor) — the original
// ind-menu set was a mix of filled and detailed marks that muddied at nav size.
export const INDUSTRIES = [
  { label: 'Healthcare', href: '/healthcare', icon: '/img/ind-healthcare.svg' },
  { label: 'Manufacturing', href: '/manufacturing', icon: '/img/ind-manufacturing.svg' },
  { label: 'Finance', href: '/finance', icon: '/img/ind-finance.svg' },
  { label: 'Banking', href: '/banking', icon: '/img/ind-banking.svg' },
  { label: 'Legal', href: '/legal', icon: '/img/ind-legal.svg' },
  { label: 'Logistics & Transportation', href: '/logistics', icon: '/img/ind-logistics.svg' },
  { label: 'Supply Chain', href: '/supply-chain', icon: '/img/ind-supply.svg' },
  { label: 'Contact Center', href: '/contact-centre', icon: '/img/ind-contact.svg' },
  { label: 'HR', href: '/hr', icon: '/img/ind-hr.svg' },
];

// Blog now sits in the Company column; the separate Use Cases index was removed,
// so there is no Resources group left to render.

// Insights: the journal and the case studies. Kept as its own top-level destination
// because Spec G3 puts it in the header, not inside a company panel.
export const INSIGHTS = [
  { label: 'Journal', href: '/blog', icon: '/img/nav-blog.svg' },
  { label: 'Use Cases', href: '/use-cases', icon: '/img/nav-usecases.svg' },
];

export const COMPANY_LINKS = [
  { label: 'About IICL', href: '/aboutus', icon: '/img/nav-about.svg' },
  { label: 'Careers', href: '/careers', icon: '/img/nav-careers.svg' },
];

// Talent. Spec B3/G3: "Do not use IT Staff Augmentation as the only top-level label
// for the approved GCC pathway" — GCC Technology Teams is the destination, and the
// legacy staffing route redirects into it (Stage 4).
export const TALENT = [
  { label: 'GCC Technology Teams', href: '/gcc-technology-teams', icon: '/img/nav-gcc.svg' },
  { label: 'GCC Careers', href: '/gcc-careers', icon: '/img/nav-careers.svg' },
];

// Header hierarchy per Spec G3:
//   AI Solutions · Talent · Industries · Insights · Company · Discuss Your Requirement
// Agentic AI and Enterprise AI & GenAI sit inside AI Solutions rather than competing
// with it as separate company identities.
export const MENU = [
  { label: 'AI Solutions', mega: 'products', items: PRODUCTS,
    services: [
      { label: 'Enterprise AI & GenAI', href: '/ai-genai-services' },
      { label: 'Agentic AI', href: '/agentic-ai' },
    ],
    highlight: { href: '/contactus?intent=ai-discovery-workshop', img: '/img/ai-solution-banner.webp', title: 'Not sure which one fits?', text: 'Bring one process to a discovery workshop and we will tell you what it actually needs.' } },
  { label: 'Talent', mega: 'columns', cols: [
    { title: 'Technology teams', links: TALENT },
  ] },
  { label: 'Industries', mega: 'columns', cols: [
    { title: 'Industries', links: INDUSTRIES },
  ] },
  { label: 'Insights', mega: 'columns', cols: [
    { title: 'Insights', links: INSIGHTS },
  ] },
  { label: 'Company', mega: 'columns', cols: [
    { title: 'Company', links: COMPANY_LINKS },
  ] },
  { label: 'Discuss Your Requirement', href: '/contactus', cta: true },
];


// Hero artwork — original SVGs generated by scripts/gen-industry-art.mjs.
// One visual family (neural mesh + IICL red on near-black, with HUD instrument chrome)
// and a motif per page, so the site looks designed rather than stocked. Vector: ~20KB
// each and sharp at any size. Regenerate with: node scripts/gen-industry-art.mjs
export const PAGE_ART = {
  'gcc-careers': { img: '/img/industry/gcc-careers.svg', alt: 'HUD diagram: contract engineers placed into an existing GCC delivery team' },
  contracts: { img: '/img/industry/contracts.svg', alt: 'HUD diagram: engagement models mapped to scope, duration and delivery responsibility' },
  careers: { img: '/img/industry/careers.svg', alt: 'HUD diagram: capability domains feeding a role scorecard that assembles into a mobilised delivery pod' },
  '/gcc-technology-teams': { img: '/img/industry/staff-augmentation.svg', alt: 'Schematic of specialised technology capability domains forming a GCC team' },
  healthcare:       { img: '/img/industry/healthcare.svg',     alt: 'Heartbeat trace running through a neural network, representing AI in healthcare' },
  manufacturing:    { img: '/img/industry/manufacturing.svg',  alt: 'Robotic arm and gear system over a production line, representing AI in manufacturing' },
  finance:          { img: '/img/industry/finance.svg',        alt: 'Rising candlestick chart with a trend line, representing AI in finance' },
  banking:          { img: '/img/industry/banking.svg',        alt: 'Security shield over transaction flows, representing secure AI in banking' },
  legal:            { img: '/img/industry/legal.svg',          alt: 'Balance scales beside layered contracts, representing AI for legal work' },
  logistics:        { img: '/img/industry/logistics.svg',      alt: 'Delivery route across waypoints and containers, representing AI in logistics' },
  'supply-chain':   { img: '/img/industry/supply-chain.svg',   alt: 'Suppliers feeding a central hub and out to destinations, representing AI supply chain planning' },
  'contact-centre': { img: '/img/industry/contact-centre.svg', alt: 'Voice waves and a live audio waveform, representing AI contact centre automation' },
  hr:               { img: '/img/industry/hr.svg',             alt: 'Organisation chart of connected people, representing AI for human resources' },

  // Service pages use the same HUD family.
  'ai-genai-services':  { img: '/img/industry/ai-genai-services.svg',  alt: 'Layered neural network resolving to an output, representing enterprise AI and generative AI services' },
  'agentic-ai':         { img: '/img/industry/agentic-ai.svg',         alt: 'Orchestrator core directing specialist agents in orbit, representing agentic AI' },
  'web-mobile-dev':     { img: '/img/industry/web-mobile-dev.svg',     alt: 'Desktop and mobile interfaces wireframed side by side, representing web and mobile development' },
  'whatsapp-business':  { img: '/img/industry/whatsapp-business.svg',  alt: 'WhatsApp conversation thread with an order card and delivery ticks, representing WhatsApp Business API work' },
  'erp-services':       { img: '/img/industry/erp-services.svg',       alt: 'Business modules connected around a shared data core, representing ERP implementation' },
  'staff-augmentation': { img: '/img/industry/staff-augmentation.svg', alt: 'Candidate pool funnelling into a placed delivery team, representing staff augmentation' },
  helpdesk:             { img: '/img/industry/helpdesk.svg',           alt: 'Support ticket queue resolving to a verified fix, representing managed IT help desk services' },

  // Company and resource pages.
  aboutus:     { img: '/img/industry/aboutus.svg',     alt: 'Hyderabad and Raleigh delivery hubs exchanging work across an arc' },
  blog:        { img: '/img/industry/blog.svg',        alt: 'Stacked articles feeding a knowledge graph' },
  'use-cases': { img: '/img/industry/use-cases.svg',   alt: 'Scattered inbound contacts resolving into measured outcomes' },
  contactus:   { img: '/img/industry/contactus.svg',   alt: 'Enquiries converging on a single point of contact' },
};

// Per-page hero background banner (dark A-series textures). Fallback: the default network banner.
export const HERO_BANNER = {
  ivaak: '/img/banners/A2-banner-ivaak.png',
  iwac: '/img/banners/A3-banner-iwac.png',
  iCognito: '/img/banners/A4-banner-icognito.png',
  lexgenie: '/img/banners/A5-banner-lexgenie.png',
  idental: '/img/banners/A6-banner-idental.png',
  performedge: '/img/banners/A7-banner-performedge.png',
  trufix: '/img/banners/A8-banner-trufix.png',
  quantafin: '/img/banners/A9-banner-quantafin.png',
  blog: '/img/banners/A10-banner-blog.png',
  'blog-ivaak-ai': '/img/banners/A10-banner-blog.png',
  'blog-iwac-ai': '/img/banners/A10-banner-blog.png',
  'blog-trufix-ai': '/img/banners/A10-banner-blog.png',
  'use-cases': '/img/banners/A11-banner-usecases.png',
  'usecase-ivaak-customercare': '/img/banners/A11-banner-usecases.png',
  'usecase-ivaak-healthcare': '/img/banners/A11-banner-usecases.png',
  'usecase-ivaak-realestate': '/img/banners/A11-banner-usecases.png',
  'thank-you': '/img/banners/A12-banner-thankyou.png',
};
export const HERO_BANNER_DEFAULT = '/img/banners/A1-og-default.png';
