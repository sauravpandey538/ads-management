import { clientRating, clientTestimonials, reviewPlatforms, siteConfig } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://admarkapture.com";

/** Organization + aggregate rating for rich results. */
export function organizationReviewJsonLd() {
  const externalProfiles = reviewPlatforms
    .filter((p) => p.external)
    .map((p) => p.href);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    url: siteUrl,
    sameAs: externalProfiles,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clientRating.score,
      bestRating: clientRating.maxScore,
      ratingCount: clientRating.clientCount,
      reviewCount: clientTestimonials.length,
    },
    review: clientTestimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.contact.name,
        jobTitle: t.contact.role,
      },
      datePublished: t.dateReviewed,
      reviewBody: t.quote,
      name: `${t.company} — ${t.headline}`,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: clientRating.maxScore,
      },
      itemReviewed: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    })),
  };
}
