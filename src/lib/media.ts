/**
 * Bundled site photography — served from `/public/images/photos/`.
 * Remote Unsplash URLs are not used at runtime (unreliable on mobile networks).
 */
export const photoIds = [
  "1600585154340-be6161a56a0c",
  "1615529182904-14819c35db37",
  "1618221195710-dd6b41faaea6",
  "1600566752355-35792bedcfea",
  "1600566753086-00f18fb6b3ea",
  "1585036156171-384164a8c675",
  "1600607687939-ce8a6c25118c",
  "1616137466211-f939a420be84",
  "1564769662533-4f00a87b4056",
  "1600607687920-4e2a09cf159d",
  "1616486338812-3dadae4b4ace",
  "1519817650390-64a93db51149",
  "1582719508461-905c673771fd",
  "1566073771259-6a8506099945",
  "1507003211169-0a1dd7228f2d",
  "1494790108377-be9c29b29330",
  "1500648767791-00dcc994a43e",
  "1573496359142-b8d87734a5a2",
] as const;

export type PhotoId = (typeof photoIds)[number];

/** Local JPEG bundled with the deployment. */
export function photoUrl(id: string): string {
  return `/images/photos/${id}.jpg`;
}

/** Real project photography from `/public/images/projects/`. */
export function projectPhoto(slug: string): string {
  return `/images/projects/${slug}.jpg`;
}

/** Gallery / materials photography under `/public/images/`. */
export function siteImage(relativePath: string): string {
  return `/images/${relativePath.replace(/^\/+/, "")}`;
}

/** Production step photography. */
export function productionStepImage(index: number): string {
  return `/images/production/step-${index}.jpg`;
}

/** Hero / production wood workshop still. */
export const heroPoster = photoUrl("1618221195710-dd6b41faaea6");
