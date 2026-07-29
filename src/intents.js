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
  },
  'enterprise-ai-use-case': {
    label: 'Enterprise AI use case',
    lede: 'Describe the workflow, its current baseline and the measurable outcome you are aiming at.',
  },
  'gcc-team-expansion': {
    label: 'GCC Technology Teams',
    lede: 'Share the capability domain, role or team requirement, location, engagement model and target start window.',
  },
  'gcc-capability-requirement': {
    label: 'GCC capability requirement',
    lede: 'Tell us the technology domain and the capability you need to build, and we will help structure the brief.',
  },
  'agentic-ai-workflow-assessment': {
    label: 'Agentic AI workflow assessment',
    lede: 'Start with one workflow, one accountable owner and one measurable outcome.',
  },
  'agentic-ai-architecture': {
    label: 'Agentic AI architecture',
    lede: 'Tell us which systems the agent would need to read from and act on, and what it must never do.',
  },
  'agentic-ai-proof-of-value': {
    label: 'Agentic AI Proof of Value',
    lede: 'Describe the workflow and the evidence you would need to see before taking it further.',
  },
  'agentic-ai-security-assessment': {
    label: 'Agent security and authority',
    lede: 'Tell us the workflow and the actions in question. We will not ask for architecture detail or findings here.',
  },
  'agentic-ai-value-assessment': {
    label: 'Agentic AI value case',
    lede: 'Share the process, its current baseline and how the outcome is measured today.',
  },
  'agentic-ai-managed-operations': {
    label: 'Managed AgentOps',
    lede: 'Tell us what is already running and what you need monitored, evaluated and supported.',
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
