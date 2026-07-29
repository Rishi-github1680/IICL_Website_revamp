// Structured data for search engines (SEO Implementation Strategy v1.0, common change 12:
// "Add Organization, Service, Product, Breadcrumb and FAQ structured data").
// Company facts here are the single source of truth — they must match the footer and
// the Contact page exactly, or Google treats the NAP signals as inconsistent.

export const SITE = "https://iicl.in";

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
    logo: SITE + "/img/iicl_logo.png",
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

export function productSchema({ name, description, path, category }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: SITE + path,
    applicationCategory: category || "BusinessApplication",
    operatingSystem: "Web",
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
