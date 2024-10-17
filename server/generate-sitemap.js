const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');

const publicDir = resolve(__dirname, '../client/public');

if (!existsSync(publicDir)) {
  mkdirSync(publicDir);
}

const links = [
  // Hebrew URLs
  { url: '/he/', changefreq: 'daily', priority: 1.0 },
  { url: '/he/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/he/shoshi/biography', changefreq: 'monthly', priority: 0.7 },
  { url: '/he/shoshi/exhibitions', changefreq: 'monthly', priority: 0.7 },
  { url: '/he/shoshi/gallery', changefreq: 'monthly', priority: 0.7 },
  { url: '/he/jacob/biography', changefreq: 'monthly', priority: 0.7 },
  { url: '/he/jacob/exhibitions', changefreq: 'monthly', priority: 0.7 },
  { url: '/he/jacob/gallery', changefreq: 'monthly', priority: 0.7 },
  { url: '/he/press', changefreq: 'monthly', priority: 0.6 },
  { url: '/he/articles', changefreq: 'monthly', priority: 0.6 },
  { url: '/he/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/he/personalGallery', changefreq: 'monthly', priority: 0.6 },
  
  // English URLs
  { url: '/en/', changefreq: 'daily', priority: 1.0 },
  { url: '/en/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/en/shoshi/biography', changefreq: 'monthly', priority: 0.7 },
  { url: '/en/shoshi/exhibitions', changefreq: 'monthly', priority: 0.7 },
  { url: '/en/shoshi/gallery', changefreq: 'monthly', priority: 0.7 },
  { url: '/en/jacob/biography', changefreq: 'monthly', priority: 0.7 },
  { url: '/en/jacob/exhibitions', changefreq: 'monthly', priority: 0.7 },
  { url: '/en/jacob/gallery', changefreq: 'monthly', priority: 0.7 },
  { url: '/en/press', changefreq: 'monthly', priority: 0.6 },
  { url: '/en/articles', changefreq: 'monthly', priority: 0.6 },
  { url: '/en/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/en/personalGallery', changefreq: 'monthly', priority: 0.6 },
];

const sitemap = new SitemapStream({
  hostname: 'https://artchayat.netlify.app/',
  xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
});

const writeStream = createWriteStream(resolve(publicDir, 'sitemap.xml'));

sitemap.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('Sitemap created successfully!');
});

writeStream.on('error', (err) => {
  console.error('Error writing sitemap:', err);
});

links.forEach(link => sitemap.write(link));
sitemap.end();
