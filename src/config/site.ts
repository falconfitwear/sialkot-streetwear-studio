/**
 * Central site configuration. Fill in real values before launch.
 * Empty strings are treated as "not configured" — related links/buttons are hidden
 * so the site never shows broken contact methods.
 */
export const site = {
  name: "FALCON FIT WEAR",
  shortName: "Falcon Fit Wear",
  descriptor: "Apparel Manufacturing & Export",
  tagline: "Crafting Quality. Manufacturing Identity.",
  location: "Sialkot, Pakistan",
  locationLine: "Sialkot, Pakistan | Worldwide Export",

  /** Public site URL WITHOUT trailing slash, e.g. "https://falconfitwear.com". Used for canonical/OG URLs. */
  domain: "",

  contact: {
    /** Business email, e.g. "info@falconfitwear.com" */
    email: "",
    /** Display phone, e.g. "+92 300 0000000" */
    phone: "",
    /** WhatsApp number in international format, digits only, e.g. "923000000000" */
    whatsapp: "",
    whatsappMessage:
      "Hello Falcon Fit Wear, I'd like to discuss a custom apparel manufacturing project.",
  },

  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    tiktok: "",
  },

  /** Formspree endpoint, e.g. "https://formspree.io/f/xxxxxxx". Leave empty to disable online submissions. */
  formspreeEndpoint: "https://formspree.io/f/mljjopov",
} as const;

export const hasValue = (v: string | undefined | null): v is string =>
  typeof v === "string" && v.trim().length > 0;

export function whatsappLink(message?: string): string | null {
  const num = site.contact.whatsapp.replace(/\D/g, "");
  if (!num) return null;
  return `https://wa.me/${num}?text=${encodeURIComponent(message ?? site.contact.whatsappMessage)}`;
}

export function emailLink(subject?: string): string | null {
  if (!hasValue(site.contact.email)) return null;
  return `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

export function absoluteUrl(path: string): string | null {
  return hasValue(site.domain) ? `${site.domain.replace(/\/$/, "")}${path}` : null;
}
