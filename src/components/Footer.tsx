import { Link } from "@tanstack/react-router";
import { AtSign, Globe, Link2, Mail, MapPin, MessageCircle, Music2, Phone } from "lucide-react";
import { emailLink, hasValue, site, whatsappLink } from "@/config/site";
import { categories } from "@/data/products";
import { navItems } from "./Header";
import { Wordmark } from "./Wordmark";
import { ImageLogo } from "./ImageLogo";

const socials = [
  { key: "instagram", label: "Instagram", Icon: AtSign },
  { key: "facebook", label: "Facebook", Icon: Globe },
  { key: "linkedin", label: "LinkedIn", Icon: Link2 },
  { key: "tiktok", label: "TikTok", Icon: Music2 },
] as const;

export function Footer() {
  const email = emailLink();
  const wa = whatsappLink();
  const activeSocials = socials.filter((s) => hasValue(site.social[s.key]));
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ImageLogo />
          <p className="mt-6 max-w-sm font-display text-2xl font-bold leading-tight">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            Custom apparel manufacturing, private label production and worldwide export for clothing brands, retailers and bulk buyers.
          </p>
        </div>
        <div className="lg:col-span-2">
          <h2 className="eyebrow mb-5 text-lime">Navigate</h2>
          <ul className="space-y-3 text-sm">
            {navItems.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-ink-muted hover:text-paper">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-5 text-lime">Products</h2>
          <ul className="space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}><Link to="/products" search={{ category: c.slug }} className="text-ink-muted hover:text-paper">{c.name}</Link></li>
            ))}
            <li><Link to="/manufacturing" className="text-ink-muted hover:text-paper">Private Label</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-5 text-lime">Contact</h2>
          <ul className="space-y-3 text-sm text-ink-muted">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-lime" aria-hidden />{site.locationLine}</li>
            {email && <li><a href={email} className="flex gap-3 hover:text-paper"><Mail size={16} className="mt-0.5 shrink-0 text-lime" aria-hidden />{site.contact.email}</a></li>}
            {hasValue(site.contact.phone) && <li><a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="flex gap-3 hover:text-paper"><Phone size={16} className="mt-0.5 shrink-0 text-lime" aria-hidden />{site.contact.phone}</a></li>}
            {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-paper"><MessageCircle size={16} className="mt-0.5 shrink-0 text-lime" aria-hidden />WhatsApp</a></li>}
            <li><Link to="/contact" className="inline-flex border-b border-lime pb-0.5 text-paper hover:text-lime">Send an inquiry →</Link></li>
          </ul>
          {activeSocials.length > 0 && (
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {activeSocials.map(({ key, label, Icon }) => (
                <li key={key}>
                  <a href={site.social[key]} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded border border-ink-border hover:border-lime hover:text-lime"><Icon size={18} /></a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-ink-border">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Product imagery is illustrative. Specifications and feasibility confirmed per inquiry.</p>
        </div>
      </div>
    </footer>
  );
}
