import type { Metadata } from "next";
import { cormorant, inter, elMessiri } from "@/app/fonts";
import { siteConfig } from "@/lib/site";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${inter.variable} ${elMessiri.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
