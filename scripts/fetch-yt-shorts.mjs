const url = "https://www.youtube.com/@worldofwooddecoration/shorts";
const res = await fetch(url, {
  headers: { "User-Agent": "Mozilla/5.0" },
});
const html = await res.text();
const ids = [...html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map((m) => m[1]);
const uniq = [...new Set(ids)];
console.log(uniq.join("\n"));
console.log(`\ncount: ${uniq.length}`);
