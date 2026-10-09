import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalFor, seoFor } from "../lib/routeSeo.js";

// Own one canonical and one copy of each metadata field, including tags in the
// server shell. React's head hoisting otherwise preserves conflicting duplicates.
function upsert(selector, tag, attributes) {
  const matches = [...document.head.querySelectorAll(selector)];
  const element = matches.shift() || document.createElement(tag);
  matches.forEach((duplicate) => duplicate.remove());
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  if (!element.isConnected) document.head.appendChild(element);
}

export default function SEO({ title, description, jsonLd, url, index = true, preloads = [] }) {
  const { pathname } = useLocation();
  const route = seoFor(pathname);
  const finalTitle = route?.title || title;
  const finalDescription = route?.description || description;
  const canonical = url || canonicalFor(pathname);
  const serializedSchema = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = finalTitle;
    upsert('link[rel="canonical"]', "link", { rel: "canonical", href: canonical });
    upsert('meta[name="description"]', "meta", { name: "description", content: finalDescription || "" });
    upsert('meta[name="robots"]', "meta", { name: "robots", content: index ? "index, follow" : "noindex, nofollow" });
    for (const [property, content] of Object.entries({ "og:title": finalTitle, "og:description": finalDescription || "", "og:url": canonical })) {
      upsert(`meta[property="${property}"]`, "meta", { property, content });
    }
    for (const [name, content] of Object.entries({ "twitter:title": finalTitle, "twitter:description": finalDescription || "" })) {
      upsert(`meta[name="${name}"]`, "meta", { name, content });
    }
    // Remove page schemas injected by the edge before setting the current page.
    document.head.querySelectorAll('script[data-page-jsonld]').forEach((element) => element.remove());
    let script;
    if (serializedSchema) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.pageJsonld = "true";
      script.textContent = serializedSchema;
      document.head.appendChild(script);
    }
    return () => script?.remove();
  }, [finalTitle, finalDescription, canonical, index, serializedSchema]);

  return <>{preloads.map((preload) => <link key={`${preload.href}-${preload.media || "all"}`} rel="preload" as="image" href={preload.href} type={preload.type} media={preload.media} imageSrcSet={preload.imageSrcSet} imageSizes={preload.imageSizes} fetchPriority={preload.fetchPriority || "high"} />)}</>;
}
