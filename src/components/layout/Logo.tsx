import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/0101010.png";

/** Brand logotip — World of Wood Decoration. */
export function Logo({
  className,
  onClick,
  size = "header",
}: {
  className?: string;
  onClick?: () => void;
  size?: "header" | "footer";
}) {
  const dimensions =
    size === "footer"
      ? { width: 320, height: 320, className: "h-16 w-auto sm:h-20 md:h-24" }
      : {
          width: 512,
          height: 512,
          className:
            "h-[3.75rem] w-auto max-w-[7.5rem] sm:h-14 sm:max-w-none md:h-20 lg:h-24 xl:h-28",
        };

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="World of Wood Decrations — home"
      className={cn("group inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={LOGO_SRC}
        alt="World of Wood Decorations"
        width={dimensions.width}
        height={dimensions.height}
        priority
        quality={100}
        sizes="(max-width: 640px) 120px, (max-width: 768px) 112px, (max-width: 1024px) 160px, 224px"
        className={cn(
          dimensions.className,
          "max-w-none object-contain transition-[transform,opacity,filter] duration-300",
          "drop-shadow-[0_4px_16px_rgba(192,160,104,0.4)] sm:drop-shadow-[0_8px_28px_rgba(192,160,104,0.5)]",
          "group-hover:scale-[1.04] group-hover:brightness-110",
        )}
      />
    </Link>
  );
}
