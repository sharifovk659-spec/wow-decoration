const urls = {
  oak: "https://images.unsplash.com/photo-1762891993331-d2ab60346457?auto=format&fit=crop&w=1400&h=1050&q=92",
  walnut: "https://images.unsplash.com/photo-1598902108852-8e890ea960c8?auto=format&fit=crop&w=1400&h=1050&q=92",
  beech: "https://images.unsplash.com/photo-1502082553048-f009c37126b9?auto=format&fit=crop&w=1400&h=1050&q=92",
  ash: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&h=1050&q=92",
  pine: "https://images.unsplash.com/photo-1448375240156-844be2bcdc9e?auto=format&fit=crop&w=1400&h=1050&q=92",
  cedar: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&h=1050&q=92",
  abachi: "https://images.unsplash.com/photo-1542273917363-3b1817f37a6d?auto=format&fit=crop&w=1400&h=1050&q=92",
  oak2: "https://images.unsplash.com/photo-1772546287524-9134d662117f?auto=format&fit=crop&w=1400&h=1050&q=92",
  walnut2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&h=1050&q=92",
  beech2: "https://images.unsplash.com/photo-1476234562110-037e57b0a7c0?auto=format&fit=crop&w=1400&h=1050&q=92",
  pine2: "https://images.unsplash.com/photo-1516205654620-5556e2e4d4b0?auto=format&fit=crop&w=1400&h=1050&q=92",
  walnut3: "https://images.unsplash.com/photo-1597848212624-e593b4b6b6b6?auto=format&fit=crop&w=1400&h=1050&q=92",
};

for (const [k, url] of Object.entries(urls)) {
  const r = await fetch(url, { method: "HEAD", redirect: "follow" });
  console.log(r.ok ? "OK" : "FAIL", k, r.status);
}
