import { Cormorant_Garamond, Inter, El_Messiri } from "next/font/google";

/** Editorial display serif — used for all Latin & Cyrillic headings. */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Workhorse grotesque — body copy, UI and micro-typography. */
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

/** Elegant Arabic face — used across the RTL experience. */
export const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-elmessiri",
  display: "swap",
});
