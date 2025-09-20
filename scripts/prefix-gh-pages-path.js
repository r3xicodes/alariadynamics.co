const fs = require('fs');
const path = require('path');
const glob = require('glob');

const REPO_PREFIX = '/alariadynamics.co';
const workspace = path.resolve(__dirname, '..');

const files = glob.sync('**/*.html', { cwd: workspace, nodir: true, ignore: ['node_modules/**', 'assets/**'] });
let changedFiles = 0;
files.forEach(rel => {
  const p = path.join(workspace, rel);
  let content = fs.readFileSync(p, 'utf8');
  // match href='/...' or src="/..." but skip already prefixed or external schemes
  const re = /(href|src)=("|')\/(?!alariadynamics\.co\/|http:|https:|data:|mailto:|#)([^"'#>\s?]+)([?][^"']*)?("|')/gi;
  let m;
  const edits = [];
  while ((m = re.exec(content)) !== null) {
    const attr = m[1];
    const quote = m[2];
    const pathPart = m[3];
    const query = m[4] || '';
    const original = m[0];
    const replacement = `${attr}=${quote}${REPO_PREFIX}/${pathPart}${query}${quote}`;
    edits.push({ index: m.index, original, replacement });
  }
  if (edits.length) {
    edits.sort((a,b)=>b.index-a.index).forEach(e=>{
      content = content.slice(0,e.index) + e.replacement + content.slice(e.index+e.original.length);
    });
    fs.writeFileSync(p, content, 'utf8');
    changedFiles += 1;
    console.log(`Updated ${rel} -> ${edits.length} attribute(s)`);
  }
});
console.log(`Prefixing complete: ${changedFiles} file(s) changed.`);
