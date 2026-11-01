import { absoluteUrl, site } from "@/config/site";

/** Builds per-route head() metadata. Canonical/og:url only emitted when site.domain is configured. */
export function pageHead(opts: { title: string; description: string; path: string }) {
  const title = `${opts.title} | ${site.shortName}`;
  const url = absoluteUrl(opts.path);
  return {
    meta: [
      { title },
      { name: "description", content: opts.description },
      { property: "og:title", content: title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.shortName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: opts.description },
      ...(url ? [{ property: "og:url", content: url }] : []),
    ],
    links: url ? [{ rel: "canonical", href: url }] : [],
  };
}
