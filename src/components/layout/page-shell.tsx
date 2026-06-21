import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

/** Shared page backdrop — cream fill + subtle dot grid (matches landing page). */
export function PageShell({ children, className }: PageShellProps) {
  return <div className={cn("page-dots min-h-full", className)}>{children}</div>;
}
