import { photoUrl } from "@/lib/media";

export interface VideoTestimonial {
  id: string;
  poster: string;
  video: string;
  videoRemote: string;
  duration: string;
}

const film = (mixkitId: string) => ({
  local:
    mixkitId === "20390"
      ? "/videos/hero.mp4"
      : `/videos/testimonial-${mixkitId}.mp4`,
  remote: `https://assets.mixkit.co/videos/${mixkitId}/${mixkitId}-720.mp4`,
});

function item(
  id: string,
  posterId: string,
  mixkitId: string,
  duration: string,
): VideoTestimonial {
  const f = film(mixkitId);
  return {
    id,
    poster: photoUrl(posterId),
    video: f.local,
    videoRemote: f.remote,
    duration,
  };
}

export const videoTestimonials: VideoTestimonial[] = [
  item("0", "1600585154340-be6161a56a0c", "20390", "2:41"),
  item("1", "1618221195710-dd6b41faaea6", "4711", "1:58"),
  item("2", "1566073771259-6a8506099945", "4185", "3:12"),
  item("3", "1564769662533-4f00a87b4056", "3090", "2:24"),
  item("4", "1600607687939-ce8a6c25118c", "20390", "2:07"),
];
