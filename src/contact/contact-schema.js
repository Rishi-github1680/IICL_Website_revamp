// ─────────────────────────────────────────────────────────────────────────────
// Dynamic Contact Experience — controlled configuration.
//
// One reusable form engine, driven by this config (handoff PDF: "One reusable
// engine", "configuration-driven schemas instead of duplicated page-specific
// forms"). Every intent selects a contact profile, a requirement schema and a
// SERVER-RESOLVED owner queue. The owner here is duplicated on the server
// (api/contact/enquiries.js) and the server value is authoritative — a browser
// must never be trusted to pick the CRM queue.
//
// Routing context lives in the URL (intent, product, source, cta, utm) and is
// allowlisted below. Answers and PII never go in the URL or analytics.
// ─────────────────────────────────────────────────────────────────────────────

// Reusable field-set fragments (kept DRY across intents).
const CONTACT_STD = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autocomplete: 'name' },
  { name: 'company', label: 'Company', type: 'text', required: true, autocomplete: 'organization' },
  { name: 'email', label: 'Work email', type: 'email', required: true, autocomplete: 'email' },
  { name: 'phone', label: 'Mobile number', type: 'tel', required: true, autocomplete: 'tel' },
];
const CONTACT_PROFESSIONAL = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autocomplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' },
  { name: 'phone', label: 'Mobile number', type: 'tel', required: true, autocomplete: 'tel' },
  { name: 'currentRole', label: 'Current role', type: 'text', required: false },
];
const CONTACT_PRIVACY = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autocomplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' },
];

// Shared product-demo requirement fields — extended, never duplicated, per product.
const PRODUCT_DEMO_SHARED = [
  { name: 'scenario', label: 'What should the demo show?', type: 'textarea', required: true,
    help: 'The scenario or workflow you want to see handled end to end.' },
  { name: 'volume', label: 'Rough monthly volume', type: 'text', required: false },
  { name: 'integrations', label: 'Systems to integrate with', type: 'text', required: false },
  { name: 'stage', label: 'Where are you today?', type: 'select', required: false,
    options: ['Exploring', 'Comparing options', 'Ready to pilot', 'Ready to buy'] },
];

// One demo schema, five product-specific extensions (PDF §09). Keyed by approved
// product ID; an unknown product ID falls back to the shared schema only.
export const PRODUCT_VARIANTS = {
  ivaak: { label: 'iVaak.ai', fields: [
    { name: 'callFlow', label: 'Call flow', type: 'textarea', required: false, help: 'Inbound, outbound or both — and the calls it should handle.' },
    { name: 'languages', label: 'Languages needed', type: 'text', required: false },
    { name: 'telephony', label: 'Telephony or CRM in use', type: 'text', required: false },
  ] },
  iwac: { label: 'iWac.ai', fields: [
    { name: 'whatsappSetup', label: 'WhatsApp setup', type: 'text', required: false, help: 'Existing WABA / number, or starting fresh.' },
    { name: 'journey', label: 'Customer journey', type: 'textarea', required: false },
    { name: 'commerce', label: 'Commerce or payments', type: 'text', required: false },
  ] },
  idental: { label: 'iDental.ai', fields: [
    { name: 'clinics', label: 'Number of clinics', type: 'text', required: false },
    { name: 'practiceSystem', label: 'Practice system in use', type: 'text', required: false },
    { name: 'priorityModules', label: 'Priority modules', type: 'text', required: false },
  ] },
  icognito: { label: 'iCognito.ai', fields: [
    { name: 'channels', label: 'Channels', type: 'text', required: false },
    { name: 'escalation', label: 'Escalation to a person', type: 'text', required: false },
    { name: 'knowledgeSources', label: 'Knowledge sources', type: 'text', required: false },
  ] },
  trufix: { label: 'TruFix.ai', fields: [
    { name: 'itsmPlatform', label: 'ITSM platform', type: 'text', required: false },
    { name: 'ticketCategories', label: 'Ticket categories', type: 'text', required: false },
    { name: 'resolutionVerification', label: 'How is resolution verified today?', type: 'textarea', required: false },
  ] },
};

// The 17 intent schemas (PDF §06). owner = the CRM queue, resolved on the server.
export const INTENTS = {
  general: {
    label: 'General enquiry', category: 'Start here', owner: 'Enterprise Enquiries',
    contact: CONTACT_STD, router: true,
    fields: [
      { name: 'need', label: 'What do you need?', type: 'textarea', required: true },
      { name: 'outcome', label: 'What would a good outcome look like?', type: 'text', required: false },
    ],
  },
  'ai-discovery-workshop': {
    label: 'AI Discovery Workshop', category: 'AI solutions', owner: 'Enterprise AI Advisory',
    contact: CONTACT_STD, fields: [
      { name: 'workflow', label: 'The business function and process', type: 'textarea', required: true },
      { name: 'today', label: 'How does it run today?', type: 'text', required: true },
    ],
  },
  'enterprise-ai-use-case': {
    label: 'Enterprise AI use case', category: 'AI solutions', owner: 'AI Solution Consulting',
    contact: CONTACT_STD, fields: [
      { name: 'usecase', label: 'Describe the use case', type: 'textarea', required: true },
    ],
  },
  'agentic-ai-workflow-assessment': {
    label: 'Agentic workflow assessment', category: 'AI solutions', owner: 'Agentic AI Advisory',
    contact: CONTACT_STD, fields: [
      { name: 'workflow', label: 'The bounded workflow to assess', type: 'textarea', required: true },
    ],
  },
  'agentic-ai-architecture': {
    label: 'Agent architecture', category: 'AI solutions', owner: 'AI Architecture',
    contact: CONTACT_STD, fields: [
      { name: 'objective', label: 'Architecture objective', type: 'textarea', required: true },
    ],
  },
  'agentic-ai-security-assessment': {
    label: 'Agent security and authority', category: 'AI solutions', owner: 'Agent Security',
    contact: CONTACT_STD, fields: [
      { name: 'risk', label: 'The authority / risk concern', type: 'textarea', required: true },
    ],
  },
  'agentic-ai-value-assessment': {
    label: 'Agentic value case or PoV', category: 'AI solutions', owner: 'AI Value Office',
    contact: CONTACT_STD, fields: [
      { name: 'baseline', label: 'Current baseline', type: 'text', required: true },
      { name: 'outcome', label: 'Target outcome', type: 'text', required: true },
    ],
  },
  'agentic-ai-managed-operations': {
    label: 'Managed AgentOps', category: 'AI solutions', owner: 'Managed AgentOps',
    contact: CONTACT_STD, fields: [
      { name: 'state', label: 'Current state of the agents in production', type: 'textarea', required: true },
    ],
  },
  'gcc-team-expansion': {
    label: 'GCC team expansion', category: 'Talent & GCC', owner: 'GCC Solutions',
    contact: CONTACT_STD, fields: [
      { name: 'mandate', label: 'The GCC mandate', type: 'textarea', required: true },
      { name: 'domains', label: 'Capability domains', type: 'text', required: false },
      { name: 'location', label: 'Location', type: 'text', required: false },
      { name: 'scale', label: 'Scale', type: 'text', required: false },
      { name: 'engagement', label: 'Engagement model', type: 'select', required: false,
        options: ['Permanent hiring', 'Flexible technology teams', 'Dedicated capability pods', 'Project-based teams'] },
      { name: 'window', label: 'Target start window', type: 'text', required: false },
    ],
  },
  'gcc-capability-requirement': {
    label: 'Specific capability requirement', category: 'Talent & GCC', owner: 'Talent Solutions',
    contact: CONTACT_STD, fields: [
      { name: 'roles', label: 'The roles / capability needed', type: 'textarea', required: true },
    ],
  },
  'product-demo': {
    label: 'Product demo', category: 'Products', owner: 'Product Solutions',
    contact: CONTACT_STD, product: true, fields: PRODUCT_DEMO_SHARED,
  },
  'industry-workflow': {
    label: 'Industry workflow', category: 'AI solutions', owner: 'Industry AI Solutions',
    contact: CONTACT_STD, fields: [
      { name: 'industry', label: 'Industry', type: 'text', required: true },
      { name: 'workflow', label: 'The workflow to assess', type: 'textarea', required: true },
    ],
  },
  'service-requirement': {
    label: 'Technology service requirement', category: 'AI solutions', owner: 'Technology Services',
    contact: CONTACT_STD, fields: [
      { name: 'service', label: 'Which service?', type: 'text', required: true },
      { name: 'scope', label: 'Scope of the requirement', type: 'textarea', required: true },
    ],
  },
  'professional-application': {
    label: 'Apply for an open role', category: 'Professionals', owner: 'Talent Acquisition',
    contact: CONTACT_PROFESSIONAL, professional: true, fields: [
      { name: 'jobRole', label: 'Role you are applying for', type: 'text', required: true },
      { name: 'evidence', label: 'Relevant experience / evidence', type: 'textarea', required: true },
      { name: 'resume', label: 'Résumé (PDF or DOCX, max 5 MB)', type: 'file', required: false,
        accept: '.pdf,.doc,.docx', help: 'Do not include personal records beyond your CV.' },
    ],
  },
  'professional-open': {
    label: 'Join the talent network', category: 'Professionals', owner: 'Talent Network',
    contact: CONTACT_PROFESSIONAL, professional: true, fields: [
      { name: 'domain', label: 'Your capability domain', type: 'text', required: true },
    ],
  },
  'partnership-enquiry': {
    label: 'Partnership enquiry', category: 'Company', owner: 'Strategic Partnerships',
    contact: CONTACT_STD, fields: [
      { name: 'partnerType', label: 'Type of partnership', type: 'select', required: true,
        options: ['Referral', 'Reseller / channel', 'Technology / co-innovation', 'Investor / ecosystem', 'Other'] },
      { name: 'proposition', label: 'The proposition', type: 'textarea', required: true },
    ],
  },
  'privacy-enquiry': {
    label: 'Privacy enquiry', category: 'Company', owner: 'Privacy Office',
    contact: CONTACT_PRIVACY, privacy: true, fields: [
      { name: 'requestType', label: 'Request type', type: 'select', required: true,
        options: ['Access my data', 'Correct my data', 'Delete my data', 'Data retention question', 'Other privacy request'] },
      { name: 'request', label: 'Describe your request', type: 'textarea', required: true },
    ],
  },
};

// "What happens next" per intent (PDF §17 mock-ups: the context rail states ORIGIN,
// ROUTE OWNER and WHAT HAPPENS NEXT before the visitor commits). Attached in a loop
// rather than inline so the intent definitions above stay readable, and so a missing
// entry degrades to a truthful generic line instead of an empty panel.
const NEXT_STEP = {
  general: 'A relevant IICL team member reviews and routes the enquiry.',
  'ai-discovery-workshop': 'Enterprise AI Advisory confirms scope and proposes workshop dates.',
  'enterprise-ai-use-case': 'AI Solution Consulting reviews the use case and its feasibility.',
  'agentic-ai-workflow-assessment': 'Agentic AI Advisory reviews the workflow and its authority boundary.',
  'agentic-ai-architecture': 'AI Architecture reviews the objective and the integration surface.',
  'agentic-ai-security-assessment': 'Agent Security reviews the authority, approval and audit model.',
  'agentic-ai-value-assessment': 'The AI Value Office reviews the baseline and how it would be measured.',
  'agentic-ai-managed-operations': 'Managed AgentOps reviews the current production state.',
  'gcc-team-expansion': 'GCC Solutions reviews capability and delivery requirements.',
  'gcc-capability-requirement': 'Talent Solutions reviews the roles and current market availability.',
  'product-demo': 'Product Solutions prepares a demo against your scenario.',
  'industry-workflow': 'Industry AI Solutions reviews the workflow for that sector.',
  'service-requirement': 'Technology Services reviews the scope and qualifies the requirement.',
  'professional-application': 'Talent Acquisition reviews the application against the open role.',
  'professional-open': 'Talent Acquisition records the profile subject to your consent.',
  'partnership-enquiry': 'Strategic Partnerships reviews the proposition.',
  'privacy-enquiry': 'The Privacy Office handles the request through a restricted queue.',
};
for (const [id, cfg] of Object.entries(INTENTS)) {
  cfg.next = NEXT_STEP[id] || 'An IICL specialist reviews your enquiry and replies.';
}

// Preferred response channel (PDF §05 step 3 / §17 review mock-up). A preference, not
// a promise: which channels are actually offered is an IICL operating decision.
export const RESPONSE_CHANNELS = ['Email', 'Call', 'WhatsApp'];

// General path is a router, not a dead end (PDF §08): one direction question that
// swaps to the matching schema without re-asking source/contact.
export const GENERAL_ROUTER = [
  { label: 'Enterprise AI / GenAI', intent: 'enterprise-ai-use-case' },
  { label: 'Agentic AI', intent: 'agentic-ai-workflow-assessment' },
  { label: 'GCC technology teams', intent: 'gcc-team-expansion' },
  { label: 'IICL product demo', intent: 'product-demo' },
  { label: 'Technology service', intent: 'service-requirement' },
  { label: 'Career / professional', intent: 'professional-open' },
  { label: 'Partnership', intent: 'partnership-enquiry' },
  { label: 'Something else', intent: 'general' },
];

// Controlled route registry (PDF §07): source CTA → intent (+ product). Treated as
// controlled configuration. Used to wire site CTAs and by the route simulator.
export const CTA_REGISTRY = [
  { family: 'Primary', source: '/', cta: 'Talk to our solutions team', intent: 'general' },
  { family: 'Primary', source: '/ai-genai-services', cta: 'Book an AI Discovery Workshop', intent: 'ai-discovery-workshop' },
  { family: 'Primary', source: '/ai-genai-services', cta: 'Discuss an enterprise AI use case', intent: 'enterprise-ai-use-case' },
  { family: 'Primary', source: '/agentic-ai', cta: 'Assess an Agentic Workflow', intent: 'agentic-ai-workflow-assessment' },
  { family: 'Primary', source: '/agentic-ai', cta: 'Discuss agent architecture', intent: 'agentic-ai-architecture' },
  { family: 'Primary', source: '/agentic-ai', cta: 'Assess agent security and authority', intent: 'agentic-ai-security-assessment' },
  { family: 'Primary', source: '/agentic-ai', cta: 'Build an Agentic AI value case', intent: 'agentic-ai-value-assessment' },
  { family: 'Primary', source: '/agentic-ai', cta: 'Discuss Managed AgentOps', intent: 'agentic-ai-managed-operations' },
  { family: 'Talent', source: '/gcc-technology-teams', cta: 'Discuss a capability map for your GCC', intent: 'gcc-team-expansion' },
  { family: 'Talent', source: '/gcc-technology-teams', cta: 'Share a capability requirement', intent: 'gcc-capability-requirement' },
  { family: 'Talent', source: '/contracts', cta: 'Discuss an engagement', intent: 'gcc-capability-requirement' },
  { family: 'Professionals', source: '/careers', cta: 'Apply for a verified role', intent: 'professional-application' },
  { family: 'Professionals', source: '/careers', cta: 'Open application', intent: 'professional-open' },
  { family: 'Products', source: '/ivaak', cta: 'Book a iVaak.ai demo', intent: 'product-demo', product: 'ivaak' },
  { family: 'Products', source: '/iwac', cta: 'Book a iWac.ai demo', intent: 'product-demo', product: 'iwac' },
  { family: 'Products', source: '/idental', cta: 'Book a iDental.ai demo', intent: 'product-demo', product: 'idental' },
  { family: 'Products', source: '/icognito', cta: 'Book a iCognito.ai demo', intent: 'product-demo', product: 'icognito' },
  { family: 'Products', source: '/trufix', cta: 'Book a TruFix.ai demo', intent: 'product-demo', product: 'trufix' },
  { family: 'Industries', source: '/banking', cta: 'Assess an industry workflow', intent: 'industry-workflow' },
  { family: 'Industries', source: '/finance', cta: 'Assess an industry workflow', intent: 'industry-workflow' },
  { family: 'Industries', source: '/healthcare', cta: 'Assess an industry workflow', intent: 'industry-workflow' },
  { family: 'Industries', source: '/manufacturing', cta: 'Assess an industry workflow', intent: 'industry-workflow' },
  { family: 'Industries', source: '/legal', cta: 'Assess an industry workflow', intent: 'industry-workflow' },
  { family: 'Industries', source: '/logistics', cta: 'Assess an industry workflow', intent: 'industry-workflow' },
  { family: 'Industries', source: '/supply-chain', cta: 'Assess an industry workflow', intent: 'industry-workflow' },
  { family: 'Industries', source: '/contact-centre', cta: 'Assess an industry workflow', intent: 'industry-workflow' },
  { family: 'Industries', source: '/hr', cta: 'Assess an industry workflow', intent: 'industry-workflow' },
  { family: 'Services', source: '/whatsapp-business', cta: 'Discuss a defined requirement', intent: 'service-requirement' },
  { family: 'Services', source: '/erp-services', cta: 'Discuss a defined requirement', intent: 'service-requirement' },
  { family: 'Services', source: '/web-mobile-dev', cta: 'Discuss a defined requirement', intent: 'service-requirement' },
  { family: 'Services', source: '/helpdesk', cta: 'Discuss a defined requirement', intent: 'service-requirement' },
  { family: 'Insights', source: '/blog', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/use-cases', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/blog-ivaak-ai', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/blog-choosing-processes', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/blog-ai-integration-reality', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/blog-iwac-ai', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/blog-trufix-ai', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/usecase-ivaak-customercare', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/usecase-ivaak-healthcare', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/usecase-ivaak-realestate', cta: 'Discuss the related workflow', intent: 'enterprise-ai-use-case' },
  { family: 'Insights', source: '/blog-human-in-the-loop', cta: 'Discuss the related control model', intent: 'agentic-ai-security-assessment' },
  { family: 'Company', source: '/aboutus', cta: 'Discuss an AI requirement', intent: 'enterprise-ai-use-case' },
  { family: 'Company', source: '/privacy-policy', cta: 'Contact the Privacy Owner', intent: 'privacy-enquiry' },
  { family: 'Company', source: '/contactus', cta: 'Send an enquiry', intent: 'general' },
  { family: 'Company', source: '/sitemap', cta: 'Navigate to a relevant path', intent: 'general' },

  // ── Post-handoff pages ─────────────────────────────────────────────────────
  // These three talent-pathway pages did not exist when the 46-route registry was
  // drawn up, and their CTAs were pointing at intent IDs with no schema behind them
  // (talent-requirement, niche-search, startup-scale-journey). Unknown IDs fail safely
  // to the general path, so nothing was lost — but the enquiry also arrived with none
  // of its context, which is the whole point of the registry. They are mapped to the
  // nearest DOCUMENTED intent rather than given new ones, because a new intent needs a
  // named owner queue and IICL has not confirmed one (see the PDF's open decisions).
  // Confirm the owner for these three and they can become intents of their own.
  { family: 'Talent', source: '/how-iicl-hires', cta: 'Structure a talent requirement', intent: 'gcc-capability-requirement' },
  { family: 'Talent', source: '/niche-technology-hiring', cta: 'Start a niche technology search', intent: 'gcc-capability-requirement' },
  { family: 'Talent', source: '/startup-ecosystem-support', cta: 'Map your startup scale journey', intent: 'gcc-team-expansion' },
];

// Consent text — versioned so an accepted submission records exactly what was agreed
// (PDF §12 / release gate 8). Update the version whenever the wording changes.
export const CONSENT = {
  version: '2026-07-01',
  enquiry: 'I agree that IICL may use these details to respond to and route this enquiry.',
  marketing: 'Optionally, IICL may contact me about relevant updates. (You can opt out any time.)',
  professionalRetention: 'I consent to IICL retaining my application for recruitment purposes.',
};

// ── Allowlists + resolver ────────────────────────────────────────────────────
export const INTENT_IDS = Object.keys(INTENTS);
export const PRODUCT_IDS = Object.keys(PRODUCT_VARIANTS);

// Routing context belongs in the URL; answers do not (PDF §04). Only these keys are
// read, each validated: unknown intent/product fall back safely, source is normalised,
// campaign attribution is preserved.
export function resolveContext(search) {
  const p = new URLSearchParams(search || '');
  const rawIntent = p.get('intent');
  const rawProduct = p.get('product');
  const intent = INTENT_IDS.includes(rawIntent) ? rawIntent : 'general';
  const product = PRODUCT_IDS.includes(rawProduct) ? rawProduct : null;
  // Normalise source to a same-origin path; never trust an absolute URL.
  let source = p.get('source') || '';
  source = /^\/[\w\-/]*$/.test(source) ? source : '';
  const ctaId = /^[\w\-]{1,60}$/.test(p.get('cta') || '') ? p.get('cta') : '';
  const utm = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const v = p.get(k);
    if (v && /^[\w\-.]{1,80}$/.test(v)) utm[k] = v;
  }
  return { intent, product, source, ctaId, utm };
}

// Human label for the page the visitor came from, shown as ORIGIN in the context rail.
// Derived from the path rather than passed in a query parameter — the URL carries IDs,
// never display copy, and a title in the URL would be one more thing to allowlist.
export function sourceLabel(path) {
  if (!path || path === '/') return path === '/' ? 'Home' : 'Direct';
  const slug = path.replace(/^\/+|\/+$/g, '');
  if (!slug) return 'Home';
  const words = slug.split(/[-/]/).filter(Boolean).map((w) => {
    // Keep the product and acronym spellings the rest of the site uses.
    const known = { ai: 'AI', gcc: 'GCC', hr: 'HR', erp: 'ERP', genai: 'GenAI',
      ivaak: 'iVaak', iwac: 'iWac', idental: 'iDental', icognito: 'iCognito', trufix: 'TruFix',
      iicl: 'IICL', usecase: 'Use case', dev: 'Development', aboutus: 'About us' };
    return known[w] || w.charAt(0).toUpperCase() + w.slice(1);
  });
  return words.join(' ');
}

// The field list for an intent (+ product variant), used by the renderer and mirrored
// server-side for validation.
export function requirementFields(intentId, productId) {
  const intent = INTENTS[intentId] || INTENTS.general;
  let fields = [...intent.fields];
  if (intent.product && productId && PRODUCT_VARIANTS[productId]) {
    fields = [...fields, ...PRODUCT_VARIANTS[productId].fields];
  }
  return fields;
}
