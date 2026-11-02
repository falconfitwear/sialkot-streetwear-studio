import { Link } from "@tanstack/react-router";
import logo from "@/assets/branding/falcon-fit-wear-logo-horizontal.png";

interface ImageLogoProps {
  className?: string;
}

export function ImageLogo({ className = "" }: ImageLogoProps) {
  return (
    <Link
      to="/"
      aria-label="Falcon Fit Wear — Home"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <img
        src={logo}
        alt="Falcon Fit Wear"
        className="block h-auto w-[192px] object-contain sm:w-[228px] lg:w-[264px]"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
