/** Bundled + CDN background clips (woodworking / carpentry). */
export const siteVideos = {
  /** Hero banner — hands carving / woodworking process. */
  hero: {
    mp4: "/videos/hero.mp4",
    remote:
      "https://assets.mixkit.co/videos/20390/20390-720.mp4",
    poster:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80",
  },
  /** Production section — workshop / machining wood. */
  process: {
    mp4: "/videos/process.mp4",
    remote:
      "https://assets.mixkit.co/videos/4786/4786-720.mp4",
    poster:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80",
  },
  /** Shared process clip for project detail pages. */
  projectProcess: {
    mp4: "/videos/hero.mp4",
    remote:
      "https://assets.mixkit.co/videos/20390/20390-720.mp4",
  },
} as const;

/** MP4 URL for project cards / detail (local first). */
export const projectProcessSrc = siteVideos.projectProcess.mp4;
