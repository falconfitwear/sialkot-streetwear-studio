import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categoryName, type Product } from "@/data/products";

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => setActive(0), [product?.id]);

  useEffect(() => {
    if (!product) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0]!, last = f[f.length - 1]!;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm md:items-center md:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pm-title"
            aria-describedby="pm-desc"
            initial={reduce ? false : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: reduce ? 0 : 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-t-xl bg-paper md:grid-cols-2 md:rounded-xl"
          >
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close product details" className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper hover:bg-graphite">
              <X size={20} />
            </button>
            <div className="bg-graphite p-3 md:p-4">
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-ink">
                <img src={(product.images[active] ?? product.images[0]!).src} alt={(product.images[active] ?? product.images[0]!).alt} width={(product.images[active] ?? product.images[0]!).w} height={(product.images[active] ?? product.images[0]!).h} className="h-full w-full object-cover" />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Product images">
                {product.images.map((img, i) => (
                  <button key={i} type="button" onClick={() => setActive(i)} aria-label={`Show image ${i + 1} of ${product.images.length}`} aria-pressed={i === active}
                    className={`aspect-square overflow-hidden rounded border-2 transition ${i === active ? "border-lime" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={img.src} alt="" width={img.w} height={img.h} loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col p-6 md:p-10">
              <p className="eyebrow text-muted-foreground">{categoryName(product.category)}</p>
              <h2 id="pm-title" className="mt-3 font-display text-3xl font-extrabold md:text-4xl">{product.name}</h2>
              <p id="pm-desc" className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>
              <div className="mt-7">
                <h3 className="eyebrow mb-3">Fit options</h3>
                <ul className="flex flex-wrap gap-2">
                  {product.fitOptions.map((f) => <li key={f} className="rounded-full border border-ink px-3 py-1 text-sm">{f}</li>)}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="eyebrow mb-3">Customization</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {product.customizationOptions.map((c) => <li key={c} className="flex gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-ring" aria-hidden />{c}</li>)}
                </ul>
              </div>
              {product.specs && product.specs.length > 0 && (
                <ul className="mt-6 space-y-1 text-sm text-muted-foreground">{product.specs.map((s) => <li key={s}>{s}</li>)}</ul>
              )}
              <p className="mt-6 rounded border-l-2 border-lime bg-secondary px-4 py-3 text-sm">Custom specifications available on request.</p>
              <div className="mt-auto pt-8">
                <Link to="/contact" search={{ category: product.category, product: product.name }} className="btn btn-ink w-full">
                  Request Pricing <ArrowRight size={18} />
                </Link>
                <p className="mt-3 text-xs text-muted-foreground">Illustrative design — not stock or guaranteed availability. Developed to your specifications.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
