import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function SectionWrapper({ children, className, as: Component = 'section', ...props }: SectionWrapperProps) {
  return (
    <Component className={cn("container mx-auto px-4 py-12 md:py-16 lg:py-20", className)} {...props}>
      {children}
    </Component>
  );
}
