const url = process.argv[2] ?? "https://www.instagram.com/reel/DfOxfoKAFpC/";
const res = await fetch(url, {
  headers: { "User-Agent": "Mozilla/5.0 (compatible; WOWBot/1.0)" },
});
const t = await res.text();
const m = t.match(/property="og:image" content="([^"]+)"/);
console.log(m?.[1] ?? "no og:image");
