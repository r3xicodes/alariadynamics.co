const fs = require('fs');
const path = require('path');
const glob = require('glob');

const workspace = path.resolve(__dirname, '..');
const htmlFiles = glob.sync('**/*.html', { cwd: workspace, nodir: true, ignore: ['node_modules/**', 'assets/**/node_modules/**'] });

const urlRegex = /(?:href|src)="([^"]+)"/g;
const localMisses = [];

htmlFiles.forEach(f => {
  const full = path.join(workspace, f);
  const content = fs.readFileSync(full, 'utf8');
  let m;
  while ((m = urlRegex.exec(content)) !== null) {
    const raw = m[1];
    if (/^https?:\/\//.test(raw) || raw.startsWith('mailto:') || raw.startsWith('data:')) continue;
    // ignore pure hash anchors
    if (raw.startsWith('#')) continue;
    // strip query string and hash for file existence checks
    const stripped = raw.split('#')[0].split('?')[0];
    // treat absolute-root paths as relative to workspace root
    let target = stripped;
    if (stripped.startsWith('/')) target = stripped.slice(1);
    const targetPath = path.join(workspace, target);
    if (!fs.existsSync(targetPath)) {
      localMisses.push({ file: f, ref: raw, resolved: targetPath });
    }
  }
});

if (localMisses.length === 0) {
  console.log('No missing local targets found.');
  process.exit(0);
}

console.log('Missing local targets:');
localMisses.forEach(m => {
  console.log(`${m.file} -> ${m.ref} (resolved: ${m.resolved})`);
});
process.exit(1);
