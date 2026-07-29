# IICL Website Revamp — Staged Implementation Plan

Derived from **Master Implementation Specification v1.5** (28 July 2026).
Sequencing follows the Part G15 prioritised backlog, reordered so dependencies land first.

Status key: `todo` · `in progress` · `done` · `blocked (owner)` · `deferred`

---

## Stage 1 — Crawl, indexing and route infrastructure  ✅ COMPLETE
*Spec: F2, F4, G14, G15 release-block items 5 and 10*

Nothing else can be released safely until the site can be indexed correctly and fails gracefully.

| # | Task | Spec ref | Status |
|---|---|---|---|
| 1.1 | Generate production `robots.txt` referencing the production sitemap | F4, G14 | **done** |
| 1.2 | Generate `sitemap.xml` from the page manifest, production canonicals only (HTTP 200, no models, no 404, no redirects) | F4, G14 | **done** |
| 1.3 | Preview/staging `noindex, nofollow, noarchive` via environment flag | B4, G14 | **done** |
| 1.4 | 404 route returns a real HTTP 404 + `noindex`; replace mailto recovery with Home/AI/GCC/Contact routes | G11 | **done** — status code relies on Vercel's `404.html` convention; confirm on first deploy |
| 1.5 | No-WebGL must not throw: static fallback, no uncaught `IICL_NO_WEBGL` / Three.js context errors | G14, G15 | **done** |
| 1.6 | Defer below-fold 3D iframes; never block H1/CTA on a 3D asset | F7, G14 | **done** |

## Stage 1.5 — Prerendering (promoted from Stage 10)  ✅ COMPLETE
*Spec: B4, C8, E§13, F7, G14 — "render essential copy and links in the initial HTML";
"do not require JavaScript to reveal indexable copy"*

Originally filed as a Core Web Vitals measurement task. It is an architecture task: the
site was a client-rendered SPA per route, so a crawler received `<body><div id="app">
</div></body>` and the first paint waited on ~100 KB of JavaScript. Every page built in
Stages 4–7 would have inherited it, so it was promoted ahead of Stage 2.

| # | Task | Spec ref | Status |
|---|---|---|---|
| 1.5.1 | Server-mode Vite build of all page components (`vite.config.ssr.js`) | F7 | **done** |
| 1.5.2 | `scripts/prerender.mjs` renders each manifest page and injects markup + `<svelte:head>` into `dist/*.html` | B4, G14 | **done** |
| 1.5.3 | Client switches `mount()` → `hydrate()`, falling back to mount if a page did not prerender | F7 | **done** |
| 1.5.4 | Build pipeline: `gen → vite build → build:ssr → prerender` | — | **done** |

Result: 45/45 content pages render to static HTML. Every H1, link and JSON-LD block is
now in the initial response.

## Stage 2 — Conversion plumbing  ✅ COMPLETE
*Spec: C10, F3, G11, G15 release-block item 6*

| # | Task | Spec ref | Status |
|---|---|---|---|
| 2.1 | Settle one canonical contact route (`/contactus`, per Q6 default) and 301 the alternate | C10, F2 | **done** |
| 2.2 | Implement the 10-value `intent` allowlist; preselect the enquiry type; safe fallback on invalid/absent | F3 | **done** |
| 2.3 | Replace "Staff augmentation" enquiry option with "GCC Technology Teams"; add AI Discovery, Agentic AI, product-demo and service intents | G11 | **done** |
| 2.4 | Visible form-safety statement on every conversion form | B10, D5, E-AGQ1 | **done** |
| 2.5 | Server-side validation, rate limiting, retention; keep form content out of URLs and analytics | F8, §14 | **done** |

## Stage 3 — Navigation and information architecture  ✅ COMPLETE
*Spec: B3, B10 FT1, G3, G15 release-block item 1 (part)*

| # | Task | Spec ref | Status |
|---|---|---|---|
| 3.1 | Header → `AI Solutions · Talent · Industries · Insights · Company · Discuss Your Requirement` | G3 | **done** |
| 3.2 | `Talent → GCC Technology Teams` (+ Careers); remove "Staff Augmentation" as a top-level identity | B3, G3 | **done** |
| 3.3 | Dropdown a11y: `aria-haspopup`, `aria-controls`, `aria-expanded`, keyboard dismissal | G3, G14 | **done** |
| 3.4 | Solution-first footer (FT1) with dedicated Enterprise AI and GCC groups + both conversion links | B10 | **done** |
| 3.5 | Skip link + real `main` landmark on the Home Page | G14 | **done** |
| 3.6 | Rebuild HTML `/sitemap` from the canonical route registry | G11 | **done** |

## Stage 4 — GCC Technology Teams page (new primary pillar)  ✅ COMPLETE
*Spec: Part D in full; G7*

| # | Task | Spec ref | Status |
|---|---|---|---|
| 4.1 | Build `/gcc-technology-teams` — 13 sections, D4 architecture | D4, D5 | **done** |
| 4.2 | Locked H1, SEO title, description, canonical | D7 | **done** |
| 4.3 | Six capability domains; four engagement models kept distinct | D5 §3–4 | **done** |
| 4.4 | Requirement-to-mobilisation path with qualified timing | D5 §6 | **done under Q8 default** — 7 stages published; the "three business days" figure and all consultant/bench/mobilisable counts withheld pending the talent-delivery owner |
| 4.5 | 10 GCC buyer FAQs | D5 §12 | **done** |
| 4.6 | `Service` + `BreadcrumbList` schema; no `JobPosting` | D7 | **done** |
| 4.7 | `/staff-augmentation` → 301 → `/gcc-technology-teams` | G7, F2 | **done** |
| 4.8 | GCC Talent Map insight route | D5 §9 | deferred (next release) |

## Stage 5 — Home Page rebuild  ✅ COMPLETE
*Spec: Part B in full; G4*

| # | Task | Spec ref | Status |
|---|---|---|---|
| 5.1 | Locked H1 "Enterprise AI Solutions That Move from Pilot to Production"; keep "Enterprise AI, delivered." as brand line, not a second H1 | B2 | **done** |
| 5.2 | Two equal commercial pathways (Enterprise AI / GCC) with equal weight | B10, A1 | **done** |
| 5.3 | Delivery strip `1 day · 2 weeks · up to 3 months` + mandatory qualification | B2, B10 | **done** |
| 5.4 | 17-section IA per B5 | B5 | **done** — Trust, company definition, business outcomes, proof and delivery-presence added using B10's own copy and its documented fallbacks for missing evidence |
| 5.5 | FAQ: 4 Enterprise AI + 4 GCC | B10 | **done** |
| 5.6 | Two equal closing conversion paths | B10 | **done** |
| 5.7 | `Organization` + `WebSite` schema validated | B4 | **done** |

## Stage 6 — Enterprise AI & GenAI rebuild  ✅ COMPLETE
*Spec: Part C in full; G5*

| # | Task | Spec ref | Status |
|---|---|---|---|
| 6.1 | AIG1 hero, locked title/H1 | C2, C3 | **done** |
| 6.2 | 11-section architecture per C4 | C4 | **done** |
| 6.3 | **Remove false proprietary-MCP wording** (release blocker) | C11, G15 | **done** |
| 6.4 | Fix duplicate H2 ("Standardized Context Windows…" repeated) | G5 | **done** |
| 6.5 | Qualify the "data never trains models" FAQ answer | C11, G5 | **done** |
| 6.6 | Delivery framework anchor `#ai-delivery-framework` | C5 | **done** |
| 6.7 | Related GCC pathway cross-link | C11 | **done** |

## Stage 7 — Agentic AI rebuild  ✅ COMPLETE
*Spec: Part E in full; G6*

| # | Task | Spec ref | Status |
|---|---|---|---|
| 7.1 | AGH1 hero, locked title/H1 | E§5, §9 | **done** |
| 7.2 | Nine sections `AGH1 → AGF1 → AGU1 → AGC1 → AGD1 → AGS1 → AGM1 → AGQ1` | E§4 | **done** |
| 7.3 | Remove all fixed-duration Agentic AI timing | E§2 | **done** |
| 7.4 | Authority tiers, control domains, containment, shared responsibility | E§5 AGS1 | **done** |
| 7.5 | 12 enterprise FAQs | E§5 AGQ1 | **done** |
| 7.6 | Sticky sub-navigation with `scroll-margin-top` | E§4 | **done** — provided by `ServiceLayout`, which builds its index from the section headings |
| 7.7 | JSON-LD graph per E§10 | E§10 | **done** |

## Stage 8 — Claims, evidence and legal governance  ◐ IN PROGRESS
*Spec: B6, D11, F9, §15, G12, G15 release-block items 4, 7, 9*

| # | Task | Spec ref | Status |
|---|---|---|---|
| 8.1 | Certification and regulatory claims | G16 Q1 | **split** — ISO 27001 / SOC 2 **kept**: the user confirmed these are real, and F13 ranks an explicit IICL approval above the document default. HIPAA/GDPR/DPDP **removed as absolutes**: those are obligations a customer satisfies for their own scope, never confirmed, and G10 forbids implying HIPAA readiness. |
| 8.2 | Reclassify the three `/usecase-*` pages; strip 60→99%, 100% coverage, 3,000 enquiries, CSAT (Q2 default) | G12, G16 Q2 | **done** — all three reclassified as illustrative with a visible banner; 60→99%, 3,000/month, 100% coverage, CSAT and "below 8%" removed |
| 8.3 | Remove product/industry/office counts `08 · 07 · 09 · 02 · 20+` (Q3 default) | G4, G16 Q3 | **done** — About Us counts removed (Home done in Stage 5) |
| 8.4 | Replace "eleven languages" with deployment-validated wording (Q4 default) | G16 Q4 | **done** in Stage 5 |
| 8.5 | Remove unverified Raleigh delivery-role claims (Q5 default) | G16 Q5 | blocked (owner) — default applies |
| 8.6 | Remove workshop pricing/credit language (Q7 default) | G16 Q7 | **done** in Stage 5 |
| 8.7 | Careers: remove open-role count, add privacy/EEO, fix mailto-only applications (Q9 default) | G11, G16 Q9 | **partial** — open-role count removed. EEO/privacy statement and a real application route still need the owner (Q9) |
| 8.8 | Privacy policy: add missing §5, move cookie wording, add last-updated | G11 | blocked (owner) Q10 |
| 8.9 | Terms: hold the route — do not launch unfinished | G11, G15 | blocked (owner) Q10 |
| 8.10 | Legacy service project examples → representative capabilities (Q11 default) | G16 Q11 | **partial** — HIPAA/DPDP absolutes cleared; ERP/WhatsApp/help-desk project claims still to review |

## Stage 9 — Remaining page reviews
*Spec: G8, G9, G10, G11, G12*

| # | Task | Spec ref | Status |
|---|---|---|---|
| 9.1 | Products ×5: availability status, claim review, `/iCognito` → lowercase 301 | G8 | **partial** — `/iCognito` → `/icognito` with a 301; product availability status still needs the owner (Q3) |
| 9.2 | Services ×4: fix Help Desk copied heading, rewrite legacy marketing copy | G9 | **partial** — Help Desk copied heading fixed; deeper legacy-copy rewrites outstanding |
| 9.3 | Industries ×9: add integration, authority, evidence and regulatory qualifications | G10 | todo |
| 9.4 | About: fact review, remove unverified metrics | G11 | todo |
| 9.5 | Journal: authors, dates, `Article` schema, alt text on index images | G12 | **partial** — `articleSchema()` wired into `Layout`; emits nothing until real publication dates exist (no invented dates, per G12) |

## Stage 10 — Technical SEO, a11y, performance, measurement
*Spec: F4, F6, F7, F8, G13, G14*

| # | Task | Spec ref | Status |
|---|---|---|---|
| 10.0 | Self-host fonts; remove render-blocking third-party stylesheet; preload first-paint faces | F7 | **done** (in Stage 2) |
| 10.1 | Open Graph + X/Twitter metadata on every page | F4, G14 | **done** — OG + X/Twitter generated from the manifest; excluded routes get no card |
| 10.2 | Schema sweep: `Article`, `SoftwareApplication` validation, resolve `@id` references | G14 | todo — note: `ServiceLayout` emitted `FAQPage` without rendering it; fixed in Stage 6 by rendering from the same prop |
| 10.3 | WCAG 2.2 AA pass: focus, contrast, reflow, reduced motion, status-not-colour-alone | F6 | todo |
| 10.4 | Core Web Vitals: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 — *field* data only, needs a live production deploy with traffic (CrUX p75 over 28 days). Architecture work moved to Stage 1.5. | F7 | blocked (needs production traffic) |
| 10.5 | GA4/GTM + consent + UTM allowlist + CRM attribution | B7, F8 | blocked (owner) Q12 |
| 10.6 | Legacy `.html` redirect map | F2 | blocked (owner) Q12 |
| 10.7 | Release acceptance checklists: B8, C9, D12, E§17 | all | todo |

---

## Owner input register (G16)

The spec states work continues on the documented **defaults** unless an owner decides otherwise.
Twelve questions are open — Q1–Q12. Defaults are being applied and every applied default is
recorded here as it is used, so a later owner decision can reverse exactly one thing.

| ID | Applied default | Reversible at |
|---|---|---|
| Q1 | Remove all certification/audit claims | Stage 8.1 |
| Q2 | Reclassify case studies as illustrative; remove measured outcomes | Stage 8.2 |
| Q3 | Show only approved linked products; remove counts | **applied on Home** (Stage 5): `08/07/09/02` stats strip, "Eight products. Nine industries.", "Seven service lines" all withdrawn |
| Q4 | "Multilingual voice AI, validated for the approved deployment" | **applied on Home** (Stage 5): "Every call answered. In eleven languages." → "in the languages your customers use" |
| Q5 | Publish verified contact facts only, no delivery-role claim | Stage 8.5 |
| Q6 | Retain `/contactus` as canonical; 301 alternates | Stage 2.1 |
| Q7 | Qualified planning stages; no pricing/credit language | **applied on Home** (Stage 5): workshop fixed-fee/credit FAQ removed; delivery strip carries the B2 qualification |
| Q8 | Capability model without counts; timing held pending owner approval | Stage 4.4 |
| Q9 | Remove role count; open application only after privacy approval | Stage 8.7 |
| Q10 | Hold Terms; analytics off; legal review before production | Stages 8.8–8.9 |
| Q11 | Replace project claims with representative capabilities | Stage 8.10 |
| Q12 | Prepare config and route map, do not activate | Stages 10.5–10.6 |
