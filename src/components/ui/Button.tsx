"use client";

import type { ComponentProps, ReactNode } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "outline" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  magnetic?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full text-[0.8125rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold rtl:tracking-[0.05em]";

const sizes = "px-8 py-4";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ink shadow-gold hover:text-ink",
  outline: "border border-line-strong text-bone hover:text-ink",
  ghost: "text-bone hover:text-gold px-0 py-2",
};

function Inner({
  children,
  withArrow,
  variant,
}: {
  children: ReactNode;
  withArrow?: boolean;
  variant: Variant;
}) {
  return (
    <>
      {variant !== "ghost" && variant !== "primary" && (
        <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
      )}
      {variant === "primary" && (
        <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-gold-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        {withArrow && (
          <HiArrowLongRight className="text-base transition-transform duration-500 ease-out group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        )}
      </span>
    </>
  );
}

type LinkButtonProps = BaseProps &
  Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function ButtonLink({
  children,
  variant = "primary",
  className,
  withArrow,
  magnetic = true,
  href,
  ...props
}: LinkButtonProps) {
  const el = (
    <Link
      href={href}
      className={cn(base, variant !== "ghost" && sizes, variants[variant], className)}
      {...props}
    >
      <Inner variant={variant} withArrow={withArrow}>
        {children}
      </Inner>
    </Link>
  );
  return magnetic ? <Magnetic className="inline-block">{el}</Magnetic> : el;
}

type ButtonProps = BaseProps & ComponentProps<"button">;

export function Button({
  children,
  variant = "primary",
  className,
  withArrow,
  magnetic = false,
  ...props
}: ButtonProps) {
  const el = (
    <button
      className={cn(base, variant !== "ghost" && sizes, variants[variant], className)}
      {...props}
    >
      <Inner variant={variant} withArrow={withArrow}>
        {children}
      </Inner>
    </button>
  );
  return magnetic ? <Magnetic className="inline-block">{el}</Magnetic> : el;
}
