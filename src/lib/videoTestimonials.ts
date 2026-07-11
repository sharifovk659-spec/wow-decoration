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

/** Client films — YouTube Shorts from @worldofwooddecoration with local posters. */
export const videoTestimonials: VideoTestimonial[] = [
  item("0", "Ka697QCAe5s", "0:45"),
  item("1", "-B6JMuL6dKA", "0:52"),
  item("2", "vqlolLqhMa8", "1:03"),
  item("3", "boJ6XNyzuGA", "0:48"),
  item("4", "_9xkhgfp0VI", "0:56"),
  item("5", "lV9M2mOh_io", "1:08"),
  item("6", "F14wyhzLMpU", "0:41"),
  item("7", "8sM5lDu1EwM", "0:59"),
];
