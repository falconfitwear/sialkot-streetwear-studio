import { createFileRoute, Link } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Eye, Info } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { z } from "zod";
import { PageHero } from "@/components/CtaBand";
import { ProductModal } from "@/components/ProductModal";
import { categories, categoryName, isCategorySlug, products, type Product } from "@/data/products";
import { images } from "@/data/images";
import { pageHead } from "@/lib/seo";

const searchSchema = z.object({
  category: fallback(z.string().optional(), undefined),
});

export const Route = createFileRoute("/products")({
  validateSearch: zodValidator(searchSchema),
  head: () => pageHead({
    title: "Apparel Collection — T-Shirts, Hoodies, Tracksuits, Sweatshirts",
    description: "Explore illustrative custom-manufactured t-shirts, hoodies, tracksuits and sweatshirts developed around your brand, specifications and market.",
    path: "/products",
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category } = Route.useSearch();
  const active = isCategorySlug(category) ? category : undefined;
  const list = useMemo(() => (active ? products.filter((p) => p.category === active) : products), [active]);
  const [selected, setSelected] = useState<Product | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const reduce = useReducedMotion();

  const tabs = [{ slug: undefined, name: "All" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))];

  return (
    <>
      <PageHero eyebrow="Products" title="Explore Our Apparel Collection" intro="Discover custom-manufactured apparel designed around your brand, specifications and market." image={images.finished} />

      <section className="container-x py-16 md:py-24">
        <nav aria-label="Filter by category" className="sticky top-[4.5rem] z-20 -mx-5 bg-background/95 px-5 py-4 backdrop-blur md:mx-0 md:px-0">
          <ul className="flex gap-2 overflow-x-auto pb-1">
            {tabs.map((t) => {
              const isActive = t.slug === active;
              return (
                <li key={t.name}>
                  <Link
                    to="/products"
                    search={t.slug ? { category: t.slug } : {}}
                    aria-current={isActive ? "page" : undefined}
                    resetScroll={false}
                    className={`inline-flex whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition ${isActive ? "border-ink bg-ink text-paper" : "border-input hover:border-ink"}`}
                  >
                    {t.name}
                    <span className={`ml-2 font-mono text-xs ${isActive ? "text-lime" : "text-muted-foreground"}`}>
                      {t.slug ? products.filter((p) => p.category === t.slug).length : products.length}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          Showing {list.length} {active ? categoryName(active) : "products"}
        </p>

        <motion.ul layout={!reduce} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.li
                key={p.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col"
              >
                <button type="button" onClick={() => setSelected(p)} className="relative block overflow-hidden rounded-lg bg-graphite text-left" aria-label={`Quick view: ${p.name}`}>
                  <img src={p.images[0].src} alt={p.images[0].alt} width={p.images[0].w} height={p.images[0].h} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 eyebrow text-[0.6rem] text-ink">{categoryName(p.category)}</span>
                  <span className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded bg-ink/90 py-3 text-sm font-semibold text-paper opacity-100 transition md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    <Eye size={16} aria-hidden /> Quick view
                  </span>
                </button>
                <div className="flex flex-1 flex-col pt-4">
                  <h2 className="font-display text-lg font-bold">{p.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Fits: {p.fitOptions.join(" · ")}</p>
                  <Link to="/contact" search={{ category: p.category, product: p.name }} className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold underline-offset-4 hover:underline">
                    Request Pricing <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-16 flex gap-4 rounded-lg border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
          <Info size={20} className="mt-0.5 shrink-0 text-ink" aria-hidden />
          <p>Products shown are illustrative designs representing the types of garments we can develop. They are not stock items and availability is not guaranteed. Fabrics, specifications, minimum quantities and pricing are confirmed per inquiry, subject to your requirements.</p>
        </div>
      </section>

      <ProductModal product={selected} onClose={close} />
    </>
  );
}
