import { BrandLogo } from "@/components/shared/brand-logo";
import { clientLogos } from "@/lib/services-data";
import { cn } from "@/lib/utils";

type LogoMarqueeProps = {
  className?: string;
  title?: string;
};

export function LogoMarquee({
  className,
  title = "Trusted by SaaS teams who measure pipeline, not clicks",
}: LogoMarqueeProps) {
  return (
    <div className={cn("py-10", className)}>
      <p className="text-center text-sm font-medium text-muted-foreground mb-6">{title}</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        {clientLogos.map((brand) => (
          <BrandLogo key={brand.slug} brand={brand} className="h-7 text-ink/60" />
        ))}
      </div>
    </div>
  );
}
