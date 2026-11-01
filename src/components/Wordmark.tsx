import { Link } from "@tanstack/react-router";
import { site } from "@/config/site";

export function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <Link to="/" className="group inline-flex flex-col leading-none" aria-label={`${site.name} home`}>
      <span className={`font-display text-lg font-extrabold tracking-tight md:text-xl ${light ? "text-paper" : "text-ink"}`}>
        FALCON<span className="text-lime">/</span>FIT WEAR
      </span>
      <span className={`eyebrow mt-1 text-[0.58rem] ${light ? "text-ink-muted" : "text-muted-foreground"}`}>{site.descriptor}</span>
    </Link>
  );
}
