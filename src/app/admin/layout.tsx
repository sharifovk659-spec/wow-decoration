import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — World of Wood Decoration",
  robots: { index: false, follow: false },
};

export default function AdminSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
