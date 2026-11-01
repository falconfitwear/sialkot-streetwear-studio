import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled || open ? "border-ink-border bg-ink/95 backdrop-blur" : "border-transparent bg-ink"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-lime focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>
      <div className="container-x flex h-18 items-center justify-between py-4">
        <Wordmark />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: n.to === "/", includeSearch: false }}
                  className="relative py-2 text-sm font-medium text-ink-muted transition-colors hover:text-paper data-[status=active]:text-paper after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-lime after:transition-transform data-[status=active]:after:scale-x-100"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-lime hidden px-5 py-2.5 text-sm sm:inline-flex">Request a Quote</Link>
          <button
            ref={btnRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4.5rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink-border bg-ink lg:hidden"
          >
            <ul className="container-x flex flex-col py-6">
              {navItems.map((n) => (
                <li key={n.to} className="border-b border-ink-border">
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/", includeSearch: false }}
                    className="flex items-center justify-between py-5 font-display text-3xl font-bold text-ink-muted data-[status=active]:text-lime"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="pt-8">
                <Link to="/contact" className="btn btn-lime w-full">Request a Quote</Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
