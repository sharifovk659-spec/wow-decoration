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
          width: 400,
          height: 400,
          className:
            "h-12 w-auto max-w-[5.5rem] sm:h-14 sm:max-w-none md:h-20 lg:h-24 xl:h-28",
        };

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="World of Wood Decoration — home"
      className={cn("group inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={LOGO_SRC}
        alt="World of Wood Decoration"
        width={dimensions.width}
        height={dimensions.height}
        priority
        unoptimized
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
