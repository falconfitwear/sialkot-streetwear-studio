import { images, type Img } from "./images";

/** Categories shown in V1. Add entries here (and products below) to extend in later versions. */
export const categories = [
  { slug: "t-shirts", name: "T-Shirts", image: images.tshirts, description: "Oversized, regular and heavyweight tees developed to your fit, fabric and print direction." },
  { slug: "hoodies", name: "Hoodies", image: images.hoodies, description: "Pullover and zip-up hoodies in fleece and French terry, built around your silhouette." },
  { slug: "tracksuits", name: "Tracksuits", image: images.tracksuits, description: "Coordinated sets, zip jackets and joggers produced as matching programs." },
  { slug: "sweatshirts", name: "Sweatshirts", image: images.sweatshirts, description: "Crewnecks and oversized sweatshirts ready for embroidery, print and custom trims." },
] as const satisfies readonly { slug: string; name: string; image: Img; description: string }[];

export type CategorySlug = (typeof categories)[number]["slug"];

export const isCategorySlug = (v: unknown): v is CategorySlug =>
  typeof v === "string" && categories.some((c) => c.slug === v);

export const categoryName = (slug: CategorySlug) => categories.find((c) => c.slug === slug)!.name;

export type Product = {
  id: string;
  name: string;
  category: CategorySlug;
  description: string;
  images: Img[];
  fitOptions: string[];
  customizationOptions: string[];
  specs?: string[];
};

const I = images;

export const products: Product[] = [
  // T-Shirts
  { id: "tee-oversized", name: "Oversized T-Shirt", category: "t-shirts", description: "Dropped-shoulder, boxy streetwear tee with a relaxed body and wider sleeve.", images: [I.tshirts, I.finished, I.printing], fitOptions: ["Oversized", "Boxy", "Cropped boxy"], customizationOptions: ["Fabric selection", "Screen printing", "DTF print", "Custom neck label"] },
  { id: "tee-regular", name: "Regular Fit T-Shirt", category: "t-shirts", description: "Clean everyday silhouette suited to core basics and branded essentials.", images: [I.finished, I.tshirts, I.labels], fitOptions: ["Regular", "Slim"], customizationOptions: ["Colorways", "Screen printing", "Woven or printed labels", "Hangtags"] },
  { id: "tee-heavyweight", name: "Heavyweight T-Shirt", category: "t-shirts", description: "Dense-hand premium tee with a structured drape, developed for elevated basics.", images: [I.tshirts, I.fabrics, I.stitching], fitOptions: ["Oversized", "Regular"], customizationOptions: ["Fabric weight selection", "Garment dye direction", "Embroidery", "Custom labels"] },
  { id: "tee-printed-embroidered", name: "Printed & Embroidered T-Shirt", category: "t-shirts", description: "Graphic-led tee combining print and embroidery placements to your artwork.", images: [I.printing, I.embroidery, I.tshirts], fitOptions: ["Oversized", "Regular"], customizationOptions: ["Screen printing", "Embroidery", "DTF / heat transfer", "Placement development"] },
  // Hoodies
  { id: "hoodie-pullover", name: "Pullover Hoodie", category: "hoodies", description: "Classic kangaroo-pocket hoodie, adaptable from core basic to statement piece.", images: [I.hoodies, I.finished, I.embroidery], fitOptions: ["Regular", "Relaxed", "Oversized"], customizationOptions: ["Fleece or French terry", "Embroidery", "Screen printing", "Custom drawcords & trims"] },
  { id: "hoodie-zip", name: "Zip-Up Hoodie", category: "hoodies", description: "Full-zip hoodie with options for zipper style, pocket construction and hood shape.", images: [I.finished, I.hoodies, I.stitching], fitOptions: ["Regular", "Relaxed"], customizationOptions: ["Zipper selection", "Print & embroidery", "Rib & cuff details", "Private label"] },
  { id: "hoodie-oversized", name: "Oversized Hoodie", category: "hoodies", description: "Dropped-shoulder streetwear hoodie with a voluminous body and double-layer hood option.", images: [I.hero, I.hoodies, I.packaging], fitOptions: ["Oversized", "Boxy cropped"], customizationOptions: ["Pattern development", "Puff or screen print", "Embroidery", "Custom packaging"] },
  { id: "hoodie-heavyweight", name: "Heavyweight Fleece Hoodie", category: "hoodies", description: "Substantial brushed-back fleece hoodie for premium cold-season programs.", images: [I.hoodies, I.fabrics, I.labels], fitOptions: ["Regular", "Oversized"], customizationOptions: ["Fabric weight selection", "Tonal embroidery", "Woven labels", "Hangtags"] },
  // Tracksuits
  { id: "track-matching", name: "Matching Sets", category: "tracksuits", description: "Coordinated top-and-bottom sets developed together for consistent color and fit.", images: [I.tracksuits, I.finished, I.fabrics], fitOptions: ["Regular", "Relaxed", "Oversized"], customizationOptions: ["Color matching", "Embroidery", "Printing", "Set packaging"] },
  { id: "track-zip", name: "Zip-Up Tracksuit", category: "tracksuits", description: "Track jacket with matching joggers, adaptable for collar, zip and panel details.", images: [I.tracksuits, I.stitching, I.labels], fitOptions: ["Regular", "Slim", "Relaxed"], customizationOptions: ["Panel & piping details", "Zipper selection", "Embroidery", "Private label"] },
  { id: "track-hoodie-jogger", name: "Hoodie & Jogger Set", category: "tracksuits", description: "Fleece hoodie paired with tapered or straight joggers as a complete program.", images: [I.hoodies, I.tracksuits, I.packaging], fitOptions: ["Regular", "Oversized"], customizationOptions: ["Fleece selection", "Print & embroidery", "Cuff or open hem joggers", "Custom labels"] },
  { id: "track-custom", name: "Custom Tracksuit", category: "tracksuits", description: "Fully developed tracksuit built from your tech pack, reference samples or sketches.", images: [I.fabrics, I.tracksuits, I.stitching], fitOptions: ["Developed to your pattern"], customizationOptions: ["Custom patterns", "Fabric sourcing", "Decoration methods", "Branding & packaging"] },
  // Sweatshirts
  { id: "sweat-crewneck", name: "Crewneck Sweatshirt", category: "sweatshirts", description: "Timeless crewneck suited to embroidered logos, collegiate graphics and core lines.", images: [I.sweatshirts, I.finished, I.embroidery], fitOptions: ["Regular", "Relaxed"], customizationOptions: ["Embroidery", "Screen printing", "Rib selection", "Custom labels"] },
  { id: "sweat-oversized", name: "Oversized Sweatshirt", category: "sweatshirts", description: "Dropped-shoulder sweatshirt with a relaxed volume for contemporary streetwear.", images: [I.finished, I.sweatshirts, I.printing], fitOptions: ["Oversized", "Boxy"], customizationOptions: ["Pattern development", "Print & embroidery", "Colorways", "Hangtags"] },
  { id: "sweat-fleece", name: "Fleece Sweatshirt", category: "sweatshirts", description: "Brushed fleece crewneck developed for warmth and a soft interior hand.", images: [I.sweatshirts, I.fabrics, I.labels], fitOptions: ["Regular", "Oversized"], customizationOptions: ["Fleece selection", "Tonal embroidery", "Woven labels", "Packaging"] },
  { id: "sweat-custom-printed", name: "Custom Printed Sweatshirt", category: "sweatshirts", description: "Artwork-driven sweatshirt using the decoration method best suited to your design.", images: [I.printing, I.sweatshirts, I.packaging], fitOptions: ["Regular", "Oversized"], customizationOptions: ["Screen printing", "DTF / heat transfer", "Sublimation (where suitable)", "Placement development"] },
];
