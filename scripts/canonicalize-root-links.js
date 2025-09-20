const fs = require('fs');
const path = require('path');
const glob = require('glob');

const PROJECT_ROOT = process.cwd();

function isSkippable(href) {
  if (!href) return true;
  return href.startsWith('/') || href.startsWith('http:') || href.startsWith('https:') || href.startsWith('mailto:') || href.startsWith('#') || href.startsWith('data:');
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

const htmlFiles = glob.sync('**/*.html', { nodir: true, ignore: ['node_modules/**', 'scripts/**'] });
let filesChanged = 0;
let linksChanged = 0;

htmlFiles.forEach((relFile) => {
  const absFile = path.resolve(PROJECT_ROOT, relFile);
  let content = fs.readFileSync(absFile, 'utf8');
  const dir = path.dirname(absFile);

  const attrRe = /(href|src)=("|')([^"'#?]+)([^"']*)("|')/gi;
  let match;
  const edits = [];

  while ((match = attrRe.exec(content)) !== null) {
    const attr = match[1];
    const quote = match[2];
    const base = match[3];
    const suffix = match[4] || '';
    const trailingQuote = match[5];

    if (isSkippable(base)) continue;

    const targetAbs = path.resolve(dir, base);
    if (!fs.existsSync(targetAbs)) continue; // only rewrite if target exists

    let relToRoot = path.relative(PROJECT_ROOT, targetAbs);
    relToRoot = toPosix(relToRoot);
    if (!relToRoot.startsWith('/')) relToRoot = '/' + relToRoot;

    const newVal = relToRoot + suffix;
    const original = match[0];
    const replacement = `${attr}=${quote}${newVal}${trailingQuote}`;
    edits.push({ index: match.index, original, replacement });
  }

  if (edits.length) {
    // apply from end to start
    edits.sort((a, b) => b.index - a.index).forEach(e => {
      content = content.slice(0, e.index) + e.replacement + content.slice(e.index + e.original.length);
    });
    fs.writeFileSync(absFile, content, 'utf8');
    filesChanged += 1;
    linksChanged += edits.length;
    console.log(`Updated ${relFile} -> ${edits.length} link(s)`);
  }
});

console.log(`Done. Files changed: ${filesChanged}, links updated: ${linksChanged}`);
