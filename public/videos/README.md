# Background videos

Bundled clips for hero banner and production section. Each component loads the
local MP4 first, then falls back to the Mixkit CDN URL in `src/lib/videos.ts`.

## Files

| File | Section | Content |
|------|---------|---------|
| `hero.mp4` | Hero banner, project process video | Wood carving / carpentry close-up |
| `process.mp4` | Production section background | Carpenter in workshop |

Optional (not required): `hero.webm`, `process.webm` for smaller WebM delivery.

## Replace with your own footage

- 1920×1080, 24–30 fps, ~10–20 s seamless loop
- Wood grain, carving, CNC, finishing — warm, cinematic grade
- Keep each MP4 under ~8 MB; no audio (videos are muted in backgrounds)
- Posters are defined in `src/lib/videos.ts`

After replacing files, redeploy — Vercel serves everything in `public/videos/`.
