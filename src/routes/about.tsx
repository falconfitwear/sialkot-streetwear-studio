import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { images } from "@/data/images";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead({
    title: "About — Brand-First Apparel Manufacturing",
    description: "Based in Sialkot, Pakistan, Falcon Fit Wear focuses on custom apparel manufacturing and worldwide export for clothing brands.",
    path: "/about",
  }),
  component: AboutPage,
});

const blocks = [
  { title: "Who We Are", text: "Falcon Fit Wear is an apparel manufacturing and export business based in Sialkot, Pakistan. We work with clothing brands, retailers and wholesale buyers who need a manufacturing partner for custom streetwear and casualwear." },
  { title: "What We Manufacture", text: "Our core categories are t-shirts, hoodies, tracksuits and sweatshirts — produced to each buyer's fit, fabric, color and decoration requirements rather than from a fixed catalogue." },
  { title: "Our Approach", text: "We start with your brief and work through specifications and sampling before bulk production. Clear communication on feasibility, quantities and timelines is part of every project." },
  { title: "Customization & Private Label", text: "Garments can be finished entirely under your brand: custom labels, hangtags and packaging, alongside printing and embroidery chosen to suit your artwork." },
  { title: "Our Commitment to Quality", text: "We treat the approved sample as the reference for production and review garments against agreed specifications for construction, measurements and finishing." },
  { title: "International Market Focus", text: "We prepare orders for export and aim to serve buyers worldwide, including brands in the United States, with production organized around international expectations." },
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Apparel Manufacturing with a Brand-First Approach." intro="Based in Sialkot, Pakistan, Falcon Fit Wear focuses on custom apparel manufacturing and worldwide export, helping clothing brands develop products that reflect their identity and market requirements." />

      <section className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <img src={images.tshirts.src} alt={images.tshirts.alt} width={images.tshirts.w} height={images.tshirts.h} loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" />
            <p className="mt-3 text-xs text-muted-foreground">Illustrative photography.</p>
          </div>
        </Reveal>
        <div className="divide-y lg:col-span-7">
          {blocks.map((b, i) => (
            <Reveal key={b.title} className="py-10 first:pt-0">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h2 className="mt-3 font-display text-3xl font-extrabold">{b.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Looking for a manufacturing partner?" description="Share your product idea and requirements — we'll review feasibility and next steps with you." primary="Contact Our Team" />
    </>
  );
}
