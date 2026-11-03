const VERSION = "rets-pages-v3";
const BASE = new URL("./", self.registration.scope);
const CORE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "favicon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "assets/index-Bz-01U5_.js",
  "assets/routes-Dr3uV6H5.js",
  "assets/styles-CVk8813F.css"
].map((path) => new URL(path, BASE).toString());

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(CORE);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => (key === "rets-pwa-v1" || key.startsWith("rets-pages-")) && key !== VERSION).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(BASE.href)) return;

  // Never turn an absent API route into a cached app page; this build has no backend API.
  if (url.pathname.includes("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok && url.pathname === BASE.pathname) {
          const cache = await caches.open(VERSION);
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      } catch (error) {
        const cache = await caches.open(VERSION);
        return (await cache.match(new URL("index.html", BASE).toString())) || Response.error();
      }
    })());
    return;
  }

  if (CORE.includes(url.href)) {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const cached = await cache.match(request);
      const update = fetch(request).then((response) => {
        if (response.ok) cache.put(request, response.clone()).catch(() => {});
        return response;
      }).catch(() => null);
      return cached || await update || Response.error();
    })());
  }
});
