import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const filesToTest = [
  { file: 'dist/index.html', route: '/' },
  { file: 'dist/about/index.html', route: '/about' },
  { file: 'dist/services/index.html', route: '/services' },
  { file: 'dist/projects/index.html', route: '/projects' },
];

let allPassed = true;

for (const item of filesToTest) {
  const filePath = path.resolve(rootDir, item.file);
  console.log(`\n========================================`);
  console.log(`Verifying: ${item.file} (${item.route})`);
  console.log(`========================================`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File does not exist: ${item.file}`);
    allPassed = false;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(`Size: ${(content.length / 1024).toFixed(1)} KB`);

  // Check tags
  const hasHeader = content.includes('<header');
  const hasMain = content.includes('<main');
  const hasSection = content.includes('<section');
  const hasArticle = content.includes('<article');
  const hasFooter = content.includes('<footer');

  console.log(`Semantic tags: header=${hasHeader}, main=${hasMain}, section=${hasSection}, article=${hasArticle}, footer=${hasFooter}`);
  if (!hasHeader || !hasMain || !hasSection || !hasArticle || !hasFooter) {
    console.error(`❌ Missing semantic HTML elements!`);
    allPassed = false;
  }

  // Check H1
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  console.log(`H1 count: ${h1Matches.length}`);
  if (h1Matches.length !== 1) {
    console.error(`❌ Expected exactly 1 <h1> tag, found ${h1Matches.length}!`);
    allPassed = false;
  } else {
    console.log(`H1 text: ${h1Matches[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()}`);
  }

  // Check Title & Meta Description length
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  console.log(`Title (${title.length} chars): "${title}"`);
  if (title.length < 40 || title.length > 65) {
    console.warn(`⚠️ Title length ${title.length} out of recommended range [50, 60]`);
  }

  const descMatch = content.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i);
  const rawDesc = descMatch ? descMatch[1].trim() : '';
  const desc = rawDesc.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');
  console.log(`Description (${desc.length} chars): "${desc}"`);
  if (desc.length < 130 || desc.length > 160) {
    console.warn(`⚠️ Description length ${desc.length} out of recommended range [140, 155]`);
  }

  // Check Canonical URL
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : '';
  console.log(`Canonical: "${canonical}"`);
  if (!canonical.startsWith('https://hmtechnologies.co.ke')) {
    console.error(`❌ Canonical does not use base URL!`);
    allPassed = false;
  }

  // Check Open Graph & Twitter
  const ogTitle = content.match(/<meta\s+property=["']og:title["']\s+content=["']([\s\S]*?)["']/i);
  const ogImage = content.match(/<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']/i);
  const twitterCard = content.match(/<meta\s+name=["']twitter:card["']\s+content=["']([\s\S]*?)["']/i);
  console.log(`OG Title: "${ogTitle?.[1]}", OG Image: "${ogImage?.[1]}", Twitter: "${twitterCard?.[1]}"`);

  // Check JSON-LD
  const jsonLdMatch = content.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  if (!jsonLdMatch) {
    console.error(`❌ Missing JSON-LD script!`);
    allPassed = false;
  } else {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      console.log(`JSON-LD valid JSON! Graph items: ${parsed['@graph']?.length}`);
    } catch (e) {
      console.error(`❌ Invalid JSON-LD syntax:`, e.message);
      allPassed = false;
    }
  }

  // Check Phone & WhatsApp links
  const hasPhone = content.includes('tel:+254791371301');
  const hasWa = content.includes('https://wa.me/254791371301');
  console.log(`Crawlable phone link: ${hasPhone}, WhatsApp link: ${hasWa}`);
  if (!hasPhone || !hasWa) {
    console.error(`❌ Missing phone or WhatsApp link!`);
    allPassed = false;
  }
}

// Verify sitemap.xml & robots.txt
console.log('\n========================================');
console.log('Verifying sitemap.xml and robots.txt');
console.log('========================================');
const sitemap = fs.readFileSync(path.resolve(rootDir, 'dist/sitemap.xml'), 'utf-8');
const robots = fs.readFileSync(path.resolve(rootDir, 'dist/robots.txt'), 'utf-8');

console.log(`Sitemap routes found: ${(sitemap.match(/<loc>/g) || []).length}`);
console.log(`Robots points to sitemap: ${robots.includes('Sitemap: https://hmtechnologies.co.ke/sitemap.xml')}`);

if (!robots.includes('Sitemap: https://hmtechnologies.co.ke/sitemap.xml')) {
  console.error('❌ robots.txt does not point to sitemap.xml!');
  allPassed = false;
}

if (allPassed) {
  console.log('\n🎉 ALL CHECKS PASSED PERFECTLY!');
} else {
  console.error('\n❌ Some checks failed.');
  process.exit(1);
}
