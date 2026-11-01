import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe2, Layers, MapPin, Ruler, Scissors, ShieldCheck, Shirt, Sparkles, Stamp, Tag, Palette, PackageCheck, Brush, FlaskConical } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { site } from "@/config/site";
import { images } from "@/data/images";
import { categories } from "@/data/products";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "Premium Streetwear Manufacturing & Export",
    description: "Custom apparel manufacturing, private label production and worldwide export for clothing brands, retailers and bulk buyers. Based in Sialkot, Pakistan.",
    path: "/",
  }),
  component: Home,
});

const capabilities = [
  { icon: Scissors, title: "Cut & Sew Manufacturing", text: "Garments constructed from your patterns, tech packs or reference samples." },
  { icon: Stamp, title: "Screen Printing", text: "Durable, vivid prints for graphic-led and logo-driven designs." },
  { icon: Sparkles, title: "Embroidery", text: "Flat and tonal embroidery for logos, monograms and detailing." },
  { icon: Layers, title: "DTF / Heat Transfer", text: "Detailed, multi-color artwork applied where it best suits the garment." },
  { icon: Brush, title: "Sublimation", text: "All-over and photographic prints on suitable polyester-based fabrics." },
  { icon: Tag, title: "Private Label / Custom Branding", text: "Neck labels, care labels, hangtags and packaging carrying your brand." },
  { icon: Ruler, title: "Custom Sizing & Patterns", text: "Size grading and fit adjustments developed around your target market." },
];

const customization = [
  { icon: Layers, title: "Fabrics", text: "Jersey, fleece, French terry and other knits selected to suit the product and season." },
  { icon: Shirt, title: "Fit & Sizing", text: "Oversized, boxy, regular or slim — developed to your size chart." },
  { icon: Palette, title: "Colors", text: "Colorways developed toward your references and brand palette." },
  { icon: Stamp, title: "Print & Embroidery", text: "Decoration methods matched to your artwork and fabric." },
  { icon: Tag, title: "Labels", text: "Woven, printed or heat-transfer labels with your branding." },
  { icon: PackageCheck, title: "Hangtags & Packaging", text: "Branded hangtags, polybags and boxes for retail-ready delivery." },
];

const features = [
  { icon: Shirt, title: "Custom Apparel Development", text: "We work from your designs, tech packs or references to develop garments that fit your collection." },
  { icon: Sparkles, title: "Brand-Focused Manufacturing", text: "Every decision — from fabric to final label — is made around your brand's identity." },
  { icon: FlaskConical, title: "Sampling Available", text: "Review samples before bulk production so fit, finish and details can be refined." },
  { icon: ShieldCheck, title: "Quality-Focused Production", text: "Attention to construction, measurements and finishing throughout production." },
  { icon: Globe2, title: "Worldwide Export", text: "Production prepared for international buyers, with export coordination to your destination." },
];

const steps = [
  { title: "Share Requirements", text: "Send your designs, references, quantities and target timeline." },
  { title: "Product Development & Specifications", text: "We review feasibility and align on fabrics, fit, decoration and trims." },
  { title: "Sampling", text: "A sample is developed for your review and approval before bulk." },
  { title: "Bulk Production", text: "Approved specifications move into cut, sew, decoration and finishing." },
  { title: "Quality Review", text: "Garments are reviewed against the approved sample and specifications." },
  { title: "Export & Delivery", text: "Orders are packed and prepared for shipment to your destination." },
];

function Home() {
  const reduce = useReducedMotion();
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <motion.img
          src={images.hero.src} alt={images.hero.alt} width={images.hero.w} height={images.hero.h}
          fetchPriority="high" loading="eager"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[65%_center] lg:object-center"
          initial={reduce ? false : { scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" aria-hidden />
        <div className="container-x flex min-h-[calc(100svh-4.5rem)] flex-col justify-end pb-14 pt-24 md:justify-center md:pb-24">
          <motion.div initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="max-w-3xl">
            <p className="eyebrow mb-6 flex items-center gap-2 text-lime"><MapPin size={14} aria-hidden />{site.locationLine}</p>
            <h1 className="display-xl">Premium Streetwear Manufacturing. <span className="text-lime">Built Around Your Brand.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">Custom apparel manufacturing and worldwide export for clothing brands, retailers and bulk buyers.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn btn-lime">Explore Our Collection <ArrowRight size={18} /></Link>
              <Link to="/contact" className="btn btn-outline-light">Start Your Project</Link>
            </div>
          </motion.div>
        </div>
        <div className="border-t border-ink-border">
          <ul className="container-x grid grid-cols-2 gap-4 py-5 eyebrow text-ink-muted md:grid-cols-4">
            <li>Custom Manufacturing</li><li>Private Label</li><li>Sampling</li><li>Worldwide Export</li>
          </ul>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-x grid gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="Who we serve" title="Your Vision. Our Manufacturing Expertise." />
        </div>
        <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-6">
          <p>Falcon Fit Wear manufactures custom apparel for clothing brands, retailers and wholesale buyers. You bring the concept — a tech pack, a sketch or a reference garment — and we help translate it into a product that can be sampled, refined and produced in bulk.</p>
          <p>Our focus is streetwear and casualwear essentials: t-shirts, hoodies, tracksuits and sweatshirts, finished with your labels, trims and packaging under your own brand name.</p>
          <p>From Sialkot, Pakistan, we prepare orders for export to international markets, with every project scoped to your specifications, quantities and timeline.</p>
        </Reveal>
      </section>

      {/* CATEGORIES */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Product categories" title="What we manufacture." />
            <Link to="/products" className="btn btn-outline-dark self-start md:self-auto">View all products <ArrowRight size={18} /></Link>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <Link to="/products" search={{ category: c.slug }} className="group relative block overflow-hidden rounded-lg bg-ink shadow-card">
                  <img src={c.image.src} alt={c.image.alt} width={c.image.w} height={c.image.h} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-fade-overlay" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl font-extrabold">{c.name}</h3>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 transition group-hover:bg-lime group-hover:text-ink"><ArrowUpRight size={18} /></span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-ink py-24 text-paper md:py-32">
        <div className="container-x">
          <SectionHeading light eyebrow="Capabilities" title="Manufacturing and decoration under one brief." intro="Methods are recommended per project, subject to garment, fabric and artwork requirements." />
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 0.06} className="group h-full bg-ink p-8 transition-colors hover:bg-graphite">
                <c.icon className="text-lime" size={26} aria-hidden />
                <h3 className="mt-8 font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.text}</p>
              </Reveal>
            ))}
            <div className="flex flex-col justify-between bg-lime p-8 text-ink">
              <p className="font-display text-xl font-bold">See every capability in detail.</p>
              <Link to="/manufacturing" className="mt-8 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">Manufacturing <ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Customization" title="Every detail, developed to your brief." intro="An overview of what can be customized. Final options depend on product type, fabric and order requirements." />
          <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-lg">
            <img src={images.labels.src} alt={images.labels.alt} width={images.labels.w} height={images.labels.h} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
        </div>
        <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
          {customization.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.08} className="h-full">
              <li className="h-full rounded-lg border bg-card p-7 transition hover:-translate-y-1 hover:shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded bg-ink text-lime"><c.icon size={20} aria-hidden /></span>
                <h3 className="mt-6 font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* FEATURES */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Why work with us" title="Built for brands that care about the product." />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-lg bg-card p-7 shadow-card">
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <f.icon className="mt-6 text-ink" size={26} aria-hidden />
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading eyebrow="How it works" title="A clear path from brief to delivery." intro="Our intended workflow for custom projects. Each stage is confirmed with you before moving on." />
        <ol className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <li className="border-t-2 border-ink pt-6">
                <span className="display-lg text-lime [-webkit-text-stroke:1px_var(--ink)]">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBand title="Ready to Build Your Next Collection?" description="Let's discuss your designs, specifications and bulk apparel requirements." primary="Request a Quote" secondary="Contact Our Team" />
    </>
  );
}
