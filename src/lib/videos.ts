import { photoUrl } from "@/lib/media";

export const localVideos = {
  /** Previous process-work clip requested for the banner. */
  carving: "/videos/hero-banner-v2.mp4",
  installation: "/videos/process-installation-v2.mp4",
  detail: "/videos/project-process-v2.mp4",
  dacha: "/videos/testimonial-dacha-v2.mp4",
  mehmonkhona: "/videos/testimonial-mehmonkhona-v2.mp4",
} as const;

export const siteVideos = {
  /** Hero banner — hands carving / woodworking process. */
  hero: {
    mp4: localVideos.carving,
    poster: photoUrl("1618221195710-dd6b41faaea6"),
  },
  /** Production section — workshop / machining wood. */
  process: {
    mp4: localVideos.installation,
    poster: photoUrl("1618221195710-dd6b41faaea6"),
  },
  /** Shared process clip for project detail pages. */
  projectProcess: {
    mp4: localVideos.detail,
  },
} as const;

/** MP4 URL for project cards / detail (local first). */
export const projectProcessSrc = siteVideos.projectProcess.mp4;
