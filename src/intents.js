// The approved contact-intent dictionary (Spec F3).
//
// Every CTA across the site carries `?intent=<value>`; the contact page reads it,
// preselects the matching enquiry type and shows a relevant opening line. The value is
// validated against this allowlist and nothing else — an unknown or absent value falls
// back to the general enquiry flow.
//
// Why an allowlist rather than trusting the parameter: F3 requires that an invalid
// value "must fall back to a general enquiry path without echoing untrusted text into
// the page, analytics, email subject or downstream system". A query parameter is
// attacker-controlled; rendering it, or putting it in an email subject, is an injection
// route. Only the `label` and `lede` below are ever displayed — never the raw input.

export const INTENTS = {
  'ai-discovery-workshop': {
    label: 'AI Discovery Workshop',
    lede: 'Tell us the business function, the current process and the outcome you want to move. The workshop is scoped from there.',
    h1: 'Book an AI Discovery Workshop',
    focusLede: 'A working session on one business function: what the process is now, where it costs you, and what an AI approach would actually have to do.',
    bring: [
      'The business function and the specific process inside it',
      'Roughly how often it runs, and how long it takes today',
      'Which systems hold the information the work depends on',
      'Who owns the outcome, and who signs off a change to it',
    ],
    next: 'We come back within one working day with the questions we would need answered, and a proposed shape and length for the session.',
    read: [
      { href: '/ai-genai-services', label: 'Enterprise AI &amp; GenAI', why: 'How a use case is scoped and taken to production' },
      { href: '/blog-choosing-processes', label: 'Choosing the first process', why: 'The five tests we run before agreeing to build' },
    ],
  },
  'enterprise-ai-use-case': {
    label: 'Enterprise AI use case',
    lede: 'Describe the workflow, its current baseline and the measurable outcome you are aiming at.',
    h1: 'Discuss an enterprise AI use case',
    focusLede: 'Tell us about one workflow. We will tell you honestly whether AI is the right answer for it, and what it would take.',
    bring: [
      'What happens today, step by step, including the exceptions',
      'The current baseline &mdash; volume, time taken, error rate, whatever you already measure',
      'The systems involved and whether they expose an API',
      'What a measurable improvement would look like to you',
    ],
    next: 'We reply within one working day. If the process would be better served by deterministic automation or a process change, we will say so.',
    read: [
      { href: '/use-cases', label: 'Use cases', why: 'Complete workflows described end to end' },
      { href: '/ai-genai-services', label: 'Enterprise AI &amp; GenAI', why: 'How an engagement is scoped and governed' },
    ],
  },
  'gcc-team-expansion': {
    label: 'GCC Technology Teams',
    lede: 'Share the capability domain, role or team requirement, location, engagement model and target start window.',
    h1: 'Plan your GCC team expansion',
    focusLede: 'Tell us the capability you need to build in India, and we will help structure the requirement before anyone starts sourcing.',
    bring: [
      'The capability domain &mdash; AI, data, cloud, security, product engineering or enterprise platforms',
      'Scale, seniority mix and how the team reports',
      'Location and work mode, and how much of it is negotiable',
      'Engagement model preference, and your target start window',
    ],
    next: 'We come back within one working day with a draft requirement brief and the decisions that need making before sourcing begins.',
    read: [
      { href: '/gcc-technology-teams', label: 'GCC Technology Teams', why: 'Domains, engagement models and the delivery path' },
      { href: '/contracts', label: 'Engagement models', why: 'How scope, duration and responsibility are divided' },
    ],
  },
  'gcc-capability-requirement': {
    label: 'GCC capability requirement',
    lede: 'Tell us the technology domain and the capability you need to build, and we will help structure the brief.',
    h1: 'Define a GCC capability requirement',
    focusLede: 'Tell us the technology domain and what the team has to be able to do. We will help turn that into a role scorecard.',
    bring: [
      'The capability the team must have, described as outcomes rather than titles',
      'Must-have skills, and which ones you would train for',
      'Team interfaces &mdash; who they work with and who decides',
      'Assessment stages and who owns each one',
    ],
    next: 'We reply within one working day with a draft scorecard and the market constraints we would expect on it.',
    read: [
      { href: '/gcc-technology-teams', label: 'GCC Technology Teams', why: 'The six capability domains' },
      { href: '/careers', label: 'Contract roles', why: 'What we currently place on contract' },
    ],
  },
  'agentic-ai-workflow-assessment': {
    label: 'Agentic AI workflow assessment',
    lede: 'Start with one workflow, one accountable owner and one measurable outcome.',
    h1: 'Assess an agentic workflow',
    focusLede: 'One workflow, one accountable owner, one measurable outcome. That is the smallest unit we can assess honestly.',
    bring: [
      'The workflow, and the decision inside it that currently needs judgement',
      'Which systems the agent would read from, and which it would act on',
      'What it must never be allowed to do',
      'How the outcome is measured today',
    ],
    next: 'We reply within one working day with the authority questions we would need settled before designing anything.',
    read: [
      { href: '/agentic-ai', label: 'Agentic AI', why: 'Authority tiers, control domains and containment' },
      { href: '/blog-human-in-the-loop', label: 'Where a person stays in the loop', why: 'How the authority levels are set' },
    ],
  },
  'agentic-ai-architecture': {
    label: 'Agentic AI architecture',
    lede: 'Tell us which systems the agent would need to read from and act on, and what it must never do.',
    h1: 'Discuss agentic AI architecture',
    focusLede: 'The architecture question is really a permissions question: what the agent can reach, what it can change, and what proves it did.',
    bring: [
      'The systems of record involved, and how they authenticate',
      'The actions in scope, and the ones explicitly out',
      'Your identity model and how service accounts are governed',
      'Existing constraints &mdash; data residency, network boundaries, approved providers',
    ],
    next: 'We reply within one working day. Please do not send architecture documents or credentials through this form.',
    read: [
      { href: '/agentic-ai', label: 'Agentic AI', why: 'The seven-layer architecture and system-of-record principle' },
      { href: '/blog-ai-integration-reality', label: 'What integration actually involves', why: 'The part that is not the model' },
    ],
  },
  'agentic-ai-proof-of-value': {
    label: 'Agentic AI Proof of Value',
    lede: 'Describe the workflow and the evidence you would need to see before taking it further.',
    h1: 'Scope an agentic AI Proof of Value',
    focusLede: 'A Proof of Value exists to find out cheaply whether the approach holds. It is designed to be able to fail.',
    bring: [
      'The workflow, and the evidence you would need to see to proceed',
      'The baseline it would be judged against',
      'Who decides whether it passed',
      'Any hard constraint that would rule the approach out',
    ],
    next: 'We reply within one working day with proposed entry and exit criteria for the gate.',
    read: [
      { href: '/agentic-ai', label: 'Agentic AI', why: 'Progress on evidence, not on a number of weeks' },
      { href: '/ai-genai-services', label: 'Enterprise AI &amp; GenAI', why: 'The evidence-gated lifecycle' },
    ],
  },
  'agentic-ai-security-assessment': {
    label: 'Agent security and authority',
    lede: 'Tell us the workflow and the actions in question. We will not ask for architecture detail or findings here.',
    h1: 'Discuss agent security and authority',
    focusLede: 'What an agent is permitted to do, how that is enforced, and how it is stopped.',
    bring: [
      'The workflow and the actions in question',
      'Who currently authorises those actions',
      'Your review and approval requirements',
      'Nothing else &mdash; please do not send findings, architecture detail or credentials here',
    ],
    next: 'We reply within one working day and agree an appropriate channel before any detail is exchanged.',
    read: [
      { href: '/agentic-ai', label: 'Agentic AI', why: 'Eight control domains and containment' },
      { href: '/blog-human-in-the-loop', label: 'Where a person stays in the loop', why: 'Authority levels in practice' },
    ],
  },
  'agentic-ai-value-assessment': {
    label: 'Agentic AI value case',
    lede: 'Share the process, its current baseline and how the outcome is measured today.',
    h1: 'Build the agentic AI value case',
    focusLede: 'A value case needs a baseline. Without one, any number we produce is a guess with a decimal point.',
    bring: [
      'The process and its current cost or cycle time',
      'How that is measured today, and by whom',
      'The volume it runs at',
      'What the saving would be reinvested in',
    ],
    next: 'We reply within one working day with the measures we would need to establish before quoting anything.',
    read: [
      { href: '/agentic-ai', label: 'Agentic AI', why: 'Measuring outcomes and scaling only what creates value' },
      { href: '/use-cases', label: 'Use cases', why: 'Workflows described end to end' },
    ],
  },
  'agentic-ai-managed-operations': {
    label: 'Managed AgentOps',
    lede: 'Tell us what is already running and what you need monitored, evaluated and supported.',
    h1: 'Discuss Managed AgentOps',
    focusLede: 'Monitoring, evaluation, support and revalidation for an agent workflow that is already approved and running.',
    bring: [
      'What is already in production and who built it',
      'How it is monitored today, if it is',
      'Your incident process and escalation path',
      'The reporting your governance function expects',
    ],
    next: 'We reply within one working day with a proposed service scope and the evidence we would need to take it on.',
    read: [
      { href: '/agentic-ai', label: 'Agentic AI', why: 'AgentOps and the operating model' },
      { href: '/helpdesk', label: 'Managed support', why: 'How a managed service is scoped and governed' },
    ],
  },
};

/** The dropdown options: every approved intent, plus routes with no intent of their own. */
export const REQUIREMENTS = [
  ...Object.values(INTENTS).map((i) => i.label),
  'Product demo',
  'WhatsApp Business API',
  'ERP implementation',
  'Application development',
  'Managed IT help desk',
  'Partnership',
  'Something else',
];

/**
 * Resolve a raw `intent` query value to an approved entry.
 * Returns null for anything not on the allowlist — the caller then shows the general flow.
 */
export function resolveIntent(raw) {
  if (typeof raw !== 'string') return null;
  return Object.prototype.hasOwnProperty.call(INTENTS, raw) ? INTENTS[raw] : null;
}

/** The allowlisted keys, for the server to validate against. */
export const INTENT_KEYS = Object.keys(INTENTS);
