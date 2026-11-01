import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className={`fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-lime text-ink shadow-card transition-all ${show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={20} />
    </button>
  );
}
