import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the "middleware" convention to "proxy".
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Admin CMS
  // - Next.js internals (/_next, /_vercel)
  // - static files (files that contain a dot, e.g. favicon.ico)
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
