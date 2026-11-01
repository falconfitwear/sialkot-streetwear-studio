import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CtaBand({ title, description, primary, secondary }: {
  title: string;
  description?: string;
  primary: string;
  secondary?: string;
}) {
  return (
    <section className="bg-graphite text-paper">
      <div className="container-x py-20 md:py-28">
        <Reveal className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5 text-lime">Start a project</p>
            <h2 className="display-lg">{title}</h2>
            {description && <p className="mt-5 max-w-xl text-lg text-ink-muted">{description}</p>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Link to="/contact" className="btn btn-lime">{primary}<ArrowRight size={18} /></Link>
            {secondary && <Link to="/contact" hash="inquiry-form" className="btn btn-outline-light">{secondary}</Link>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image?: { src: string; alt: string; w: number; h: number } }) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {image && (
        <>
          <img src={image.src} alt="" width={image.w} height={image.h} className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-hero-overlay" aria-hidden />
        </>
      )}
      <div className="container-x relative py-20 md:py-32">
        <Reveal className="max-w-4xl">
          <p className="eyebrow mb-6 text-lime">{eyebrow}</p>
          <h1 className="display-xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}
