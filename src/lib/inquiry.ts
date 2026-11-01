import { z } from "zod";

export const productCategories = ["T-Shirts", "Hoodies", "Tracksuits", "Sweatshirts", "Other Custom"] as const;
export const quantityOptions = ["Below 100", "100–300", "301–500", "501–1,000", "1,000+", "Not yet decided"] as const;

const req = (label: string, max: number) =>
  z.string().trim().min(1, `${label} is required`).max(max, `${label} must be under ${max} characters`);

export const inquirySchema = z.object({
  fullName: req("Full name", 100),
  company: req("Company / brand", 120),
  email: z.string().trim().min(1, "Business email is required").email("Enter a valid email address").max(255),
  country: req("Country", 80),
  category: z.enum(productCategories, { message: "Select a product category" }),
  quantity: z.enum(quantityOptions, { message: "Select an estimated quantity" }),
  customization: req("Customization requirements", 1500),
  description: req("Project description", 3000),
  timeline: z.string().trim().max(200).optional().or(z.literal("")),
});

export type Inquiry = z.infer<typeof inquirySchema>;

/** Maps product route slugs to form category labels. */
export const slugToCategory: Record<string, (typeof productCategories)[number]> = {
  "t-shirts": "T-Shirts",
  hoodies: "Hoodies",
  tracksuits: "Tracksuits",
  sweatshirts: "Sweatshirts",
};
