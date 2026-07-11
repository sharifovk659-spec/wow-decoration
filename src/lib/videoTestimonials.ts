export interface VideoTestimonial {
  id: string;
  poster: string;
  youtubeId: string;
  duration: string;
}

/** YouTube Shorts embed — autoplay when modal opens. */
export function youtubeEmbedUrl(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${id}?${params}`;
}

export function youtubeShortsUrl(id: string): string {
  return `https://www.youtube.com/shorts/${id}`;
}

function item(
  id: string,
  youtubeId: string,
  duration: string,
): VideoTestimonial {
  return {
    id,
    poster: `/images/testimonials/${id}.jpg`,
    youtubeId,
    duration,
  };
}

/** Client films — YouTube Shorts with local poster thumbnails. */
export const videoTestimonials: VideoTestimonial[] = [
  item("0", "ruvm251rosk", "0:41"),
  item("1", "eO3ympRFvhI", "1:07"),
  item("2", "FmH5kf-NUGU", "2:13"),
  item("3", "Vs8ljxm5F0U", "0:59"),
  item("4", "EHTFwjoTF04", "0:58"),
];
