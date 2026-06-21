"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatProps = {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
};

/** Subtle looping float — disabled when user prefers reduced motion. */
export function Float({
  children,
  className,
  amplitude = 8,
  duration = 4,
}: FloatProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
