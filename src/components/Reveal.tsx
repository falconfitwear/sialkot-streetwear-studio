import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, intro, light, className = "" }: { eyebrow?: string; title: string; intro?: string; light?: boolean; className?: string }) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${light ? "text-lime" : "text-muted-foreground"}`}>{eyebrow}</p>}
      <h2 className={`display-lg ${light ? "text-paper" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${light ? "text-ink-muted" : "text-muted-foreground"}`}>{intro}</p>}
    </Reveal>
  );
}
