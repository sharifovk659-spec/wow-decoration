export interface VideoTestimonial {
  /** Stable key — also maps to the i18n `videoTestimonials.items.{id}` entry. */
  id: string;
  /** Portrait poster (4:5), drawn from the project's validated Unsplash set. */
  poster: string;
  /** Client film source (Mixkit CDN). */
  video: string;
  duration: string;
}

/** Portrait 4:5 poster, cropped and optimised. */
const poster = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${Math.round(
    (w * 5) / 4,
  )}&q=80`;

/** Client film clip (Mixkit CDN). */
const film = (id: string) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "0",
    poster: poster("1600585154340-be6161a56a0c"),
    video: film("20390"),
    duration: "2:41",
  },
  {
    id: "1",
    poster: poster("1618221195710-dd6b41faaea6"),
    video: film("4711"),
    duration: "1:58",
  },
  {
    id: "2",
    poster: poster("1566073771259-6a8506099945"),
    video: film("4185"),
    duration: "3:12",
  },
  {
    id: "3",
    poster: poster("1564769662533-4f00a87b4056"),
    video: film("3090"),
    duration: "2:24",
  },
  {
    id: "4",
    poster: poster("1600607687939-ce8a6c25118c"),
    video: film("20390"),
    duration: "2:07",
  },
];
