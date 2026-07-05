import Link from "next/link";

/**
 * Global fallback for requests that never reach the `[locale]` segment
 * (e.g. malformed paths). Renders its own document because there is no
 * shared root layout above the locale segment.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#0b0908",
          color: "#ece5d6",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "6rem", margin: 0, color: "rgba(184,150,90,0.3)" }}>
          404
        </p>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Page not found</h1>
        <Link
          href="/"
          style={{
            marginTop: "1rem",
            color: "#b8965a",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontSize: "0.8rem",
            fontFamily: "Arial, sans-serif",
            textDecoration: "none",
          }}
        >
          Return home →
        </Link>
      </body>
    </html>
  );
}
