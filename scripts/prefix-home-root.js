const fs = require('fs');
const path = require('path');
const glob = require('glob');

const REPO_PREFIX = '/alariadynamics.co/';
const PROJECT_ROOT = path.resolve(__dirname, '..');

const files = glob.sync('**/*.html', { cwd: PROJECT_ROOT, nodir: true, ignore: ['node_modules/**', 'scripts/**'] });
let changed = 0;
files.forEach(rel => {
  const p = path.join(PROJECT_ROOT, rel);
  let content = fs.readFileSync(p, 'utf8');
  const before = content;
  // replace href='/' or href="/" with href='/alariadynamics.co/'
  content = content.replace(/(href|src)=("|')\/("|')/g, `$1=$2${REPO_PREFIX}$3`);
  if (content !== before) {
    fs.writeFileSync(p, content, 'utf8');
    changed++;
    console.log(`Updated ${rel}`);
  }
});
console.log(`Done. Files changed: ${changed}`);
