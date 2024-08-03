const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');

const publicDir = resolve(__dirname, '../client/public');

if (!existsSync(publicDir)) {
  mkdirSync(publicDir);
}

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/shoshi/biography', changefreq: 'monthly', priority: 0.7 },
  { url: '/shoshi/exhibitions', changefreq: 'monthly', priority: 0.7 },
  { url: '/shoshi/gallery', changefreq: 'monthly', priority: 0.7 },
  { url: '/jacob/biography', changefreq: 'monthly', priority: 0.7 },
  { url: '/jacob/exhibitions', changefreq: 'monthly', priority: 0.7 },
  { url: '/jacob/gallery', changefreq: 'monthly', priority: 0.7 },
  { url: '/press', changefreq: 'monthly', priority: 0.6 },
  { url: '/articles', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  // Add more links if you have more pages
];

const sitemap = new SitemapStream({ hostname: 'https://artchayat.netlify.app/' });

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
