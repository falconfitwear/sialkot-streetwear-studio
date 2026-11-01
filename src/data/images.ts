/**
 * Temporary editorial photography. All images are illustrative and non-branded;
 * they do not depict Falcon Fit Wear's facility, staff, clients or completed orders.
 * Replace a file in src/assets (or change an import here) to swap imagery site-wide.
 */
import hero from "@/assets/hero-streetwear.jpg";
import tshirts from "@/assets/cat-tshirts.jpg";
import hoodies from "@/assets/cat-hoodies.jpg";
import tracksuits from "@/assets/cat-tracksuits.jpg";
import sweatshirts from "@/assets/cat-sweatshirts.jpg";
import stitching from "@/assets/process-stitching.jpg";
import fabrics from "@/assets/process-fabrics.jpg";
import printing from "@/assets/process-printing.jpg";
import embroidery from "@/assets/process-embroidery.jpg";
import labels from "@/assets/process-labels.jpg";
import packaging from "@/assets/process-packaging.jpg";
import finished from "@/assets/process-finished.jpg";

export type Img = { src: string; alt: string; w: number; h: number };

const portrait = (src: string, alt: string): Img => ({ src, alt, w: 1024, h: 1280 });
const landscape = (src: string, alt: string): Img => ({ src, alt, w: 1280, h: 960 });

export const images = {
  hero: { src: hero, alt: "Model in an oversized black hoodie and wide cargo pants against a concrete wall", w: 1536, h: 1024 },
  tshirts: portrait(tshirts, "Stack of folded plain t-shirts in off-white, black and grey"),
  hoodies: portrait(hoodies, "Plain charcoal pullover hoodie on a steel rack"),
  tracksuits: portrait(tracksuits, "Model wearing a matching black zip tracksuit"),
  sweatshirts: portrait(sweatshirts, "Plain oatmeal crewneck sweatshirt laid flat"),
  stitching: landscape(stitching, "Sewing machine needle stitching black fleece"),
  fabrics: landscape(fabrics, "Fabric rolls and swatches in black, charcoal, off-white and green"),
  printing: landscape(printing, "Screen printing squeegee pulling white ink onto black fabric"),
  embroidery: landscape(embroidery, "Close-up of tonal embroidery on black fleece"),
  labels: landscape(labels, "Blank woven labels and kraft hangtags beside a folded sweatshirt"),
  packaging: landscape(packaging, "Folded black hoodies in matte black boxes"),
  finished: landscape(finished, "Rail of plain finished hoodies, crewnecks and t-shirts"),
} satisfies Record<string, Img>;
