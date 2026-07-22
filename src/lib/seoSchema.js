// src/lib/seoSchema.js

/** Build a 2-level BreadcrumbList JSON-LD (Home -> the given page). */
export function breadcrumb(name, url) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.silenthnyc.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: url,
      },
    ],
  };
}

/** Build a BlogPosting JSON-LD node for an article page. */
export function blogPosting({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}) {
  const node = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: authorName || "Silent H" },
    publisher: {
      "@type": "Organization",
      name: "Silent H",
      logo: {
        "@type": "ImageObject",
        url: "https://www.silenthnyc.com/nav-logo.svg",
      },
    },
  };

  if (image) node.image = [image];
  if (datePublished) node.datePublished = datePublished;
  if (dateModified || datePublished) {
    node.dateModified = dateModified || datePublished;
  }

  return node;
}

/**
 * Build an Event JSON-LD node for a one-off at the restaurant (NYE, tastings...).
 *
 * `name`, `startDate` and `location` are what Google requires for an Event rich
 * result, so location is baked in here — every event we run is at the West 13th
 * Street room. Dates MUST carry the timezone offset (-05:00 EST / -04:00 EDT); a bare
 * local datetime is read as UTC and lands the event on the wrong day.
 *
 * `offers` is omitted unless passed: a made-up price is worse than no price,
 * since Google surfaces it verbatim in the rich result.
 */
export function event({
  name,
  description,
  url,
  image,
  startDate,
  endDate,
  offers,
}) {
  const node = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Restaurant",
      name: "Silent H",
      url: "https://www.silenthnyc.com/",
      servesCuisine: "Mexican",
      telephone: "+14169003535",
      address: {
        "@type": "PostalAddress",
        streetAddress: "416 West 13th Street",
        addressLocality: "New York",
        addressRegion: "NY",
    postalCode: "10014",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Silent H",
      url: "https://www.silenthnyc.com/",
    },
  };

  if (description) node.description = description;
  if (url) node.url = url;
  if (image) node.image = [image];
  if (endDate) node.endDate = endDate;
  if (offers) node.offers = offers;

  return node;
}

/** Build an FAQPage JSON-LD node from [{ question, answer }] pairs. */
export function faqPage(items) {
  if (!items || items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
