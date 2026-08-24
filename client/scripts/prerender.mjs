// Prerendering step, run after `vite build` as a postbuild script.
//
// This site is a client-side-rendered SPA: the HTML Netlify actually serves
// is just an empty <div id="root"></div> until React runs and fills it in.
// Any crawler/tool that doesn't execute JavaScript - which includes a lot of
// SEO checker tools, and matters for Googlebot too - sees a page with no H1,
// no headings, no text, and no internal links. That's exactly what an SEO
// audit flagged.
//
// The fix: for every fully-static page (i.e. one that doesn't fetch data
// from the backend - the product galleries are intentionally excluded, see
// below), launch a real headless Chrome, let React render the page, and
// save the resulting fully-rendered HTML as a static file at that route's
// path. Netlify serves a matching static file before falling back to its
// SPA rewrite (netlify.toml's redirect has no `force`), so a crawler hitting
// e.g. /he/about gets real content immediately, while a real visitor's
// browser still runs the bundled JS on top exactly as before (this project
// uses createRoot().render(), a plain client render, not hydrateRoot() - so
// there's no hydration-mismatch risk, just a normal fast re-render).
//
// Product galleries/detail pages (JacobGallery, ShoshiGallery,
// Jacob/ShoshiProductPage) are deliberately NOT prerendered here: they fetch
// live data from the MongoDB-backed API at render time, which would make
// this build step depend on that backend being reachable and awake
// (Render's free tier sleeps when idle) every time the site builds - too
// fragile for a first pass. They keep working exactly as they do today for
// real visitors; this only affects what a non-JS crawler sees.

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.join(__dirname, '..', 'build');
const PORT = 8991;

const LANGS = ['he', 'en'];
const STATIC_PAGES = [
  'about',
  'jacob/biography',
  'jacob/exhibitions',
  'shoshi/biography',
  'shoshi/exhibitions',
  'press',
  'articles',
  'personalGallery',
  'contact',
];

// route -> where to write it under build/ (mirrors how a clean URL maps to
// a static file: /he/about -> build/he/about/index.html)
const routes = ['/', ...LANGS.map((l) => `/${l}`)];
for (const lang of LANGS) {
  for (const page of STATIC_PAGES) {
    routes.push(`/${lang}/${page}`);
  }
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let filePath = path.join(BUILD_DIR, decodeURIComponent(req.url.split('?')[0]));
      // Fall back to index.html (same as Netlify's SPA redirect) whenever
      // the request doesn't resolve to a real file - including when it
      // resolves to a directory, which happens here once earlier routes in
      // this same run have created e.g. build/he/ for build/he/index.html.
      if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
        filePath = path.join(BUILD_DIR, 'index.html');
      }
      try {
        const data = await readFile(filePath);
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
      } catch (err) {
        console.error(`  [server] ${req.url} -> ${filePath}: ${err.message}`);
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function main() {
  console.log(`Prerendering ${routes.length} routes...`);
  const server = await startStaticServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    // Headless Chrome's sandbox needs kernel privileges that CI containers
    // (Netlify's build image included) typically don't grant, and refuses to
    // start at all without this - a very common "works locally, fails in CI"
    // Puppeteer gotcha.
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let failures = 0;
  for (const route of routes) {
    const page = await browser.newPage();
    if (process.env.PRERENDER_DEBUG) {
      page.on('console', (msg) => console.log(`    [console] ${msg.text()}`));
      page.on('pageerror', (err) => console.log(`    [pageerror] ${err.message}`));
      page.on('response', (res) => { if (res.status() >= 400) console.log(`    [http ${res.status()}] ${res.url()}`); });
    }
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      // Give React a moment to settle past the very first paint (route
      // sync effects, etc.) before we snapshot the DOM.
      await page.waitForSelector('h1', { timeout: 5000 }).catch(() => {});
      const html = await page.content();

      const outPath = route === '/' ? path.join(BUILD_DIR, 'index.html') : path.join(BUILD_DIR, route, 'index.html');
      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, html);

      const wordCount = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
      console.log(`  ✓ ${route.padEnd(28)} -> ${path.relative(BUILD_DIR, outPath)} (~${wordCount} words)`);
    } catch (err) {
      failures += 1;
      console.error(`  ✗ ${route} failed: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  if (failures > 0) {
    // Don't fail the whole build over this: `vite build` already produced a
    // valid, deployable SPA before this script ran. A prerendering hiccup
    // (e.g. a missing system library for headless Chrome on the CI image)
    // should mean "this deploy doesn't get the SEO improvement", never
    // "this deploy doesn't happen at all".
    console.error(`${failures}/${routes.length} route(s) failed to prerender - continuing with a plain build for those routes.`);
  } else {
    console.log('Prerendering complete.');
  }
}

main().catch((err) => {
  // Same reasoning: a catastrophic failure (e.g. puppeteer.launch() itself
  // can't find a working Chrome on this machine) must not block the deploy.
  console.error('Prerendering step failed entirely, continuing with a plain (non-prerendered) build:', err);
});
