// Structured data for search engines (SEO Implementation Strategy v1.0, common change 12:
// "Add Organization, Service, Product, Breadcrumb and FAQ structured data").
// Company facts here are the single source of truth — they must match the footer and
// the Contact page exactly, or Google treats the NAP signals as inconsistent.

export const SITE = "https://iicl.in";

/* Certification register. The audit requires any certification claim to carry its
   scope and dates. Fill `body`, `certificate`, `scope`, `issued` and `expires` from the
   certificate itself; until then the pages state the certification without the detail,
   which the owner has confirmed is accurate. Nothing here is rendered automatically —
   it exists so the facts live in one place rather than in five page copies. */
export const CERTIFICATIONS = [
  { name: "ISO/IEC 27001", body: "", certificate: "", scope: "", issued: "", expires: "" },
  { name: "SOC 2", body: "", certificate: "", scope: "", issued: "", expires: "" },
];

export const COMPANY = {
  legalName: "Intelligence India.Com Limited",
  shortName: "IICL",
  email: "reachus@iicl.in",
  phone: "+91 99894 42002",
  linkedin: "https://www.linkedin.com/company/iiclconsulting",
  india: {
    street: "Unit No. 308 & 309, Jains Sadguru Image's Capital Park, Image Gardens Road, Madhapur",
    city: "Hyderabad",
    region: "Telangana",
    postalCode: "500084",
    country: "IN",
  },
  usa: {
    street: "1 Glenwood Ave #5",
    city: "Raleigh",
    region: "NC",
    postalCode: "27603",
    country: "US",
  },
};

const postal = (a) => ({
  "@type": "PostalAddress",
  streetAddress: a.street,
  addressLocality: a.city,
  addressRegion: a.region,
  postalCode: a.postalCode,
  addressCountry: a.country,
});

// Organization — emitted once on the homepage so search engines resolve the brand entity.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE + "/#organization",
    name: COMPANY.shortName,
    legalName: COMPANY.legalName,
    url: SITE + "/",
    logo: SITE + "/iicl_logo.png",
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: [postal(COMPANY.india), postal(COMPANY.usa)],
    sameAs: [COMPANY.linkedin],
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: COMPANY.phone,
      email: COMPANY.email,
      contactType: "sales",
      areaServed: ["IN", "US"],
      availableLanguage: ["en"],
    }],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE + "/#website",
    url: SITE + "/",
    name: COMPANY.shortName,
    publisher: { "@id": SITE + "/#organization" },
  };
}

// Breadcrumb — Home › {group} › {page}. `trail` is [{name, href}, ...].
export function breadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: SITE + t.href,
    })),
  };
}

export function serviceSchema({ name, description, path, serviceType }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType || name,
    url: SITE + path,
    provider: { "@id": SITE + "/#organization" },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
    ],
  };
}

export function productSchema({ name, description, path, category, brand, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: SITE + path,
    applicationCategory: category || "BusinessApplication",
    operatingSystem: "Web",
    // Brand and image are what distinguish a product entity from a page. No `offers`:
    // pricing is not public, and inventing one would be a false claim.
    ...(brand ? { brand: { "@type": "Brand", name: brand } } : {}),
    ...(image ? { image: SITE + image } : {}),
    publisher: { "@id": SITE + "/#organization" },
  };
}

// FAQ — `faqs` is [{q, a}, ...]. Only emit for questions genuinely answered on the page.
/**
 * Article/BlogPosting for the journal. Only fields we can actually stand behind:
 * no invented authors and no invented dates (Spec G12). `datePublished` is required
 * for the rich result, so a post without one simply gets no Article markup.
 */
export function articleSchema({ headline, description, path, image, datePublished, dateModified, author }) {
  if (!headline || !path || !datePublished) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description: description || undefined,
    image: image ? SITE + image : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Organization", name: COMPANY.name, url: SITE },
    publisher: { "@id": SITE + "/#organization" },
    mainEntityOfPage: { "@type": "WebPage", "@id": SITE + path },
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// Serialise for inlining into a <script type="application/ld+json"> tag.
// Escaping "<" prevents any string in the data from closing the script element early.
export function jsonLd(...objects) {
  return objects
    .filter(Boolean)
    .map((o) => JSON.stringify(o).replace(/</g, "\\u003c"))
    .join("</script><script type=\"application/ld+json\">");
}

/**
 * JobPosting for a single live vacancy.
 *
 * Returns null unless a real `posted` date is supplied. Google requires datePosted,
 * penalises expired postings that stay marked up, and a date we invented would be a
 * false claim about when the role opened. Fill `posted` (and ideally `validThrough`)
 * on the role in src/pages/careers.svelte and the markup appears by itself.
 */
export function jobPostingSchema({ title, description, posted, validThrough, employmentType, location, remote, path }) {
  if (!title || !posted) return null;
  const IN = {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: location || COMPANY.india.city,
      addressCountry: "IN",
    },
  };
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted: posted,
    ...(validThrough ? { validThrough } : {}),
    employmentType: employmentType || "FULL_TIME",
    hiringOrganization: { "@id": SITE + "/#organization" },
    jobLocation: IN,
    ...(remote ? { jobLocationType: "TELECOMMUTE",
                   applicantLocationRequirements: { "@type": "Country", name: "India" } } : {}),
    ...(path ? { url: SITE + path } : {}),
    // No baseSalary: compensation is not published, and a fabricated range would be a
    // false claim as well as a structured-data policy breach.
  };
}
