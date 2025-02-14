import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';

const generateSitemap = async () => {
  const smStream = new SitemapStream({
    hostname: 'https://iphone-cameroon.onrender.com/',
  });
  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/products', changefreq: 'weekly', priority: 0.8 });
  smStream.write({
    url: '/categories/latest-models',
    changefreq: 'weekly',
    priority: 0.8,
  });
  // Add more routes here
  smStream.end();

  const sitemap = await streamToPromise(smStream).then((data) =>
    data.toString()
  );
  fs.writeFileSync('./public/sitemap.xml', sitemap);
};

generateSitemap();
