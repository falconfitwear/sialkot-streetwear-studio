import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CtaBand, PageHero } from "@/components/CtaBand";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { images, type Img } from "@/data/images";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/manufacturing")({
  head: () => pageHead({
    title: "Manufacturing Capabilities — Cut & Sew, Printing, Private Label",
    description: "Custom apparel manufacturing: cut & sew, fabric customization, screen printing, embroidery, DTF, sublimation, private label, sampling and worldwide export.",
    path: "/manufacturing",
  }),
  component: ManufacturingPage,
});

const sections: { title: string; text: string; points: string[]; image?: Img }[] = [
  { title: "Custom Apparel Manufacturing", text: "We develop and produce garments to your brief — whether you arrive with a full tech pack, a sketch or a reference piece you want to improve on.", points: ["Development from tech packs, sketches or references", "Streetwear and casualwear focus", "Projects scoped to your quantities and timeline"], image: images.finished },
  { title: "Cut & Sew", text: "Garments are cut and constructed from your patterns, allowing full control over silhouette, panels, seams and finishing details.", points: ["Construction from custom or adapted patterns", "Panel, pocket and seam detailing", "Finishing matched to the approved sample"], image: images.stitching },
  { title: "Fabric and Garment Customization", text: "Fabric choice shapes the hand-feel, drape and price of a garment. We help match fabric type and color to your product goals.", points: ["Jersey, fleece, French terry and other knits", "Colorways developed toward your references", "Ribs, cuffs, drawcords and trims"], image: images.fabrics },
  { title: "Printing and Embroidery", text: "Decoration is recommended per design, subject to artwork, fabric and garment requirements.", points: ["Screen printing", "Embroidery (flat and tonal)", "DTF and heat transfer", "Sublimation on suitable polyester-based fabrics"], image: images.printing },
  { title: "Private Label & Branding", text: "Products are finished under your brand name, with branded components that make them retail-ready.", points: ["Woven, printed or heat-transfer neck labels", "Care and size labels", "Hangtags, polybags and branded packaging"], image: images.labels },
  { title: "Sizing & Patterns", text: "Fit is central to repeat business. We develop size grading and pattern adjustments around your size chart and target customer.", points: ["Custom size charts and grading", "Oversized, boxy, regular and slim fits", "Fit refinements through sampling"] },
  { title: "Sampling & Product Development", text: "Sampling lets you evaluate fit, fabric and finish before committing to bulk production.", points: ["Samples developed for review and approval", "Revisions based on your feedback", "Approved sample used as the production reference"] },
  { title: "Quality-Focused Production Approach", text: "Throughout production, garments are reviewed against the approved sample and agreed specifications.", points: ["Attention to measurements and construction", "Decoration and label placement checks", "Review before packing"] },
  { title: "Worldwide Export", text: "Orders are prepared for international buyers, with packing and export coordination arranged to your destination.", points: ["Export-oriented packing", "Coordination for international shipment", "Serving brands and buyers worldwide"], image: images.packaging },
];

const gallery: { img: Img; label: string }[] = [
  { img: images.fabrics, label: "Fabrics" },
  { img: images.stitching, label: "Stitching" },
  { img: images.printing, label: "Printing" },
  { img: images.embroidery, label: "Embroidery" },
  { img: images.labels, label: "Labels & Hangtags" },
  { img: images.finished, label: "Finished Garments" },
  { img: images.packaging, label: "Packaging" },
];

function ManufacturingPage() {
  return (
    <>
      <PageHero eyebrow="Manufacturing" title="From Concept to Custom Apparel." intro="Apparel manufacturing solutions designed to bring your brand's ideas to life." image={images.stitching} />

      <section className="container-x py-20 md:py-28">
        <SectionHeading eyebrow="Capabilities" title="Nine areas, one development partner." intro="Capabilities are applied per project, subject to garment, fabric and order requirements." />
        <div className="mt-16 space-y-6">
          {sections.map((s, i) => (
            <Reveal key={s.title}>
              <article className={`grid overflow-hidden rounded-lg border bg-card md:grid-cols-2 ${s.image ? "" : "md:grid-cols-1"}`}>
                {s.image && (
                  <div className={i % 2 ? "md:order-2" : ""}>
                    <img src={s.image.src} alt={s.image.alt} width={s.image.w} height={s.image.h} loading="lazy" className="h-full max-h-[420px] w-full object-cover" />
                  </div>
                )}
                <div className={`flex flex-col justify-center p-8 md:p-12 ${s.image ? "" : "md:grid md:grid-cols-2 md:gap-12"}`}>
                  <div>
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")} / 09</span>
                    <h2 className="mt-3 font-display text-2xl font-extrabold md:text-3xl">{s.title}</h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                  <ul className={`space-y-2.5 ${s.image ? "mt-6" : "mt-6 md:mt-0 md:self-center"}`}>
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-ring" aria-hidden />{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="container-x">
          <SectionHeading light eyebrow="Gallery" title="Materials, methods and finishing." intro="Illustrative photography of apparel processes and materials. Images do not depict our facility, workforce or completed client orders." />
          <ul className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
            {gallery.map((g, i) => (
              <li key={g.label} className={`group relative overflow-hidden rounded-lg ${i === 0 ? "col-span-2 row-span-2" : ""} ${i === 5 ? "md:col-span-2" : ""}`}>
                <img src={g.img.src} alt={g.img.alt} width={g.img.w} height={g.img.h} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-fade-overlay" aria-hidden />
                <span className="absolute bottom-4 left-4 eyebrow text-paper">{g.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Have a Product in Mind? Let's Develop It Together." primary="Start Your Project" />
    </>
  );
}
