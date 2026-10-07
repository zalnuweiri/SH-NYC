import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { nycBlogPosts, nycPost } from '../src/data/nycBlogPosts.js';
import { menuData } from '../src/data/MenuData.js';
import { happyHourItems, happyHourIntro } from '../src/data/happyHourData.js';
import { faqs } from '../src/data/faqData.js';
import { bodyHtmlFor } from '../src/lib/routeContent.js';
import { isKnownRoute, canonicalFor } from '../src/lib/routeSeo.js';
import { onRequestGet } from '../functions/blogs/[slug].js';
const forbidden = /Toronto|King West|461 King|silenth\.ca|opentable\.ca|\bCAD\b/i;
for (const route of ['/', '/menu', '/happy-hour', '/events', '/story', '/faq', '/reservations', '/nye26', '/aitch']) {
  const html = bodyHtmlFor(route);
  assert.ok(html, route);
  assert.equal(forbidden.test(html), false, route);
  assert.ok(isKnownRoute(route));
  assert.ok(canonicalFor(route).startsWith('https://www.silenthnyc.com/'));
}
assert.equal(isKnownRoute('/fifa26'), false);
assert.equal(menuData.food.flatMap(s => s.items).length, 18);
assert.equal(menuData.drinks.flatMap(s => s.items).length, 45);
assert.equal(menuData.food.flatMap(s => s.items).find(i => i.name === '44 oz tomahawk').price, 340);
assert.equal(happyHourItems.length, 6);
assert.ok(happyHourIntro.schedule.includes('Tuesday–Sunday'));
assert.equal(bodyHtmlFor('/happy-hour').includes('$20'), false);
assert.equal(forbidden.test(JSON.stringify(faqs)), false);
for (const post of nycBlogPosts) {
  assert.equal(nycPost(post.slug), post);
  assert.equal(forbidden.test(post.body_text), false);
}
const missing = await onRequestGet({
  request: new Request('https://www.silenthnyc.com/blogs/private-dining-toronto'),
  params: { slug: 'private-dining-toronto' },
  env: { ASSETS: { fetch: async () => new Response('<html><div id="root"></div></html>') } },
});
assert.equal(missing.status, 404);
assert.equal(nycPost('private-dining-toronto'), null);
assert.equal(readFileSync('src/components/OTwidget.jsx', 'utf8').includes('opentable'), false);
assert.ok(readFileSync('src/pages/Menu.jsx', 'utf8').includes('priceCurrency: "USD"'));
const html = readFileSync('public/aitch/index.html', 'utf8');
const entry = html.match(/src="(\/aitch\/assets\/index-nyc-[^"]+\.js)"/)[1];
const code = readFileSync('public' + entry, 'utf8');
const sliderName = code.match(/slider-nyc-[a-f0-9]+\.js/)[0];
const slider = readFileSync('public/aitch/assets/' + sliderName, 'utf8');
assert.equal(forbidden.test(code), false);
assert.equal(/themrblack|dj_events/.test(code), false);
assert.ok(slider.includes(entry.split('/').at(-1)));
assert.ok(html.includes('418 West 13th Street'));
assert.equal(html.includes('openingHoursSpecification'), false);
for (const route of ['faq', 'booking']) {
  assert.ok(readFileSync(`public/aitch/${route}/index.html`, 'utf8').includes(entry));
}
assert.ok(existsSync('public/cenotes.webp'));

// Catch omitted originals or responsive menu files before deployment.
const manifest = JSON.parse(readFileSync('src/data/imageManifest.json', 'utf8'));
const menuImages = new Set(menuData.food.concat(menuData.drinks).flatMap(s => s.items).map(item => item.image).filter(Boolean));
menuImages.add('/redesign/menu-electricdaisy.webp');
menuImages.add('/redesign/menu-margaritatree.webp');
for (const image of menuImages) {
  assert.ok(existsSync('public' + image), `Missing menu photo: ${image}`);
  const base = image.replace(/\.(webp|jpg|jpeg|png)$/i, '');
  for (const width of manifest[base] || []) {
    for (const extension of ['avif', 'webp']) {
      assert.ok(existsSync(`public${base}-${width}.${extension}`), `Missing responsive photo: ${base}-${width}.${extension}`);
    }
  }
}

console.log('NYC regression checks passed: routes, shared menus, USD schema, coming-soon bookings, location-safe articles, retired article 404 and Aitch dependency cycle.');
