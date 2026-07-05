import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Typographic wordmark for the atelier. */
export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="World of Wood Decoration — home"
      className={cn(
        "group inline-flex flex-col leading-none text-bone",
        className,
      )}
    >
      <span className="font-display text-lg tracking-tight md:text-xl">
        World of Wood
      </span>
      <span className="flex items-center gap-2 text-[0.6rem] font-medium uppercase tracking-[0.42em] text-gold-soft rtl:tracking-[0.15em]">
        <span className="h-px w-4 bg-gold/60 transition-all duration-500 group-hover:w-6" />
        Decoration
      </span>
    </Link>
  );
}
