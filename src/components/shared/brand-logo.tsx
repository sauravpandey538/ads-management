import * as SimpleIcons from "simple-icons";
import { cn } from "@/lib/utils";

export type BrandSlug =
  | "siNotion"
  | "siCalendly"
  | "siHubspot"
  | "siIntercom"
  | "siZendesk"
  | "siStripe"
  | "siFigma"
  | "siAirtable";

export type BrandLogoEntry = {
  name: string;
  slug: BrandSlug;
};

type BrandLogoProps = {
  brand: BrandLogoEntry;
  className?: string;
  monochrome?: boolean;
};

/** Renders real brand SVG from simple-icons — used for social proof logo row. */
export function BrandLogo({ brand, className, monochrome = true }: BrandLogoProps) {
  const icon = SimpleIcons[brand.slug];
  if (!icon?.path) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={brand.name}
      className={cn("h-6 w-auto", className)}
      fill={monochrome ? "currentColor" : `#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  );
}
