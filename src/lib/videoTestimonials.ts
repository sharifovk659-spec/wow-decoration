import { photoUrl } from "@/lib/media";

export interface VideoTestimonial {
  id: string;
  poster: string;
  video: string;
  duration: string;
}

function item(id: string, posterId: string, video: string, duration: string): VideoTestimonial {
  return {
    id,
    poster: photoUrl(posterId),
    video,
    duration,
  };
}

export const videoTestimonials: VideoTestimonial[] = [
  item("0", "1600585154340-be6161a56a0c", "/videos/testimonial-dacha.mp4", "2:41"),
  item("1", "1618221195710-dd6b41faaea6", "/videos/testimonial-mehmonkhona.mp4", "1:58"),
  item("2", "1566073771259-6a8506099945", "/videos/project-process.mp4", "3:12"),
  item("3", "1564769662533-4f00a87b4056", "/videos/hero.mp4", "2:24"),
  item("4", "1600607687939-ce8a6c25118c", "/videos/process.mp4", "2:07"),
];
