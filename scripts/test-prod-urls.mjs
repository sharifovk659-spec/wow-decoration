const urls = [
  ["05", "https://images.pexels.com/photos/5691657/pexels-photo-5691657.jpeg?auto=format&fit=crop&w=1600&h=800&q=92"],
  ["05b", "https://images.pexels.com/photos/37661593/pexels-photo-37661593.jpeg?auto=format&fit=crop&w=1600&h=800&q=92"],
  ["06", "https://images.pexels.com/photos/448361/pexels-photo-448361.jpeg?auto=format&fit=crop&w=1600&h=800&q=92"],
  ["06b", "https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=format&fit=crop&w=1600&h=800&q=92"],
  ["06c", "https://images.pexels.com/photos/4481327/pexels-photo-4481327.jpeg?auto=format&fit=crop&w=1600&h=800&q=92"],
  ["07", "https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=format&fit=crop&w=1600&h=800&q=92"],
  ["07b", "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=format&fit=crop&w=1600&h=800&q=92"],
];

for (const [label, url] of urls) {
  const r = await fetch(url);
  console.log(label, r.ok ? "OK" : "FAIL");
}
