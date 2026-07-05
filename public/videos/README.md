# Background videos

Drop your own cinematic footage here to make it the background. Each section
looks for its local files first and only falls back to a remote sample clip if
they are absent.

## Hero (`src/components/sections/Hero.tsx`)

- `hero.webm` — preferred (smaller, VP9/AV1)
- `hero.mp4`  — H.264 fallback

## Production Process (`src/components/sections/ProductionProcess.tsx`)

Footage of machines, hand carving, finishing, etc.

- `process.webm` — preferred
- `process.mp4`  — H.264 fallback

Recommendations for a premium, performant first impression:

- 1920×1080 (or 2560×1440), 24–30 fps, ~10–20 s seamless loop
- Slow, cinematic camera movement over wood grain / carving / interiors
- Dark, warm grade (the hero applies a luxury overlay on top)
- Keep `hero.mp4` under ~6–8 MB; encode `hero.webm` under ~3–4 MB
- No audio track needed (the video is muted)

The poster/first frame and the reduced-motion fallback use the still image
defined in `src/components/sections/Hero.tsx`.
