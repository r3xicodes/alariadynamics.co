const fs = require('fs');
const path = require('path');

function walk(dir){
  let results = [];
  fs.readdirSync(dir).forEach(f=>{
    const full = path.join(dir,f);
    const stat = fs.statSync(full);
    if(stat.isDirectory()) results = results.concat(walk(full));
    else if(/\.html?$/.test(f)) results.push(full);
  });
  return results;
}

const root = path.resolve(__dirname, '..');
const files = walk(root).filter(p => p.includes(path.join('alariadynamics.co')) || p.endsWith('.html'));
let changed = 0;
files.forEach(fp=>{
  let s = fs.readFileSync(fp,'utf8');
  const orig = s;
  // remove favicon link
  s = s.replace(/<link[^>]+href=["']\/alariadynamics\.co\/assets\/img\/logo\.svg["'][^>]*>\s*/gi, '<!-- favicon removed per request to remove logo -->\n');
  // header logo img -> text-only
  s = s.replace(/<a class="logo"[^>]*>\s*<span class="site-logo">\s*<img[^>]*>\s*<\/span>\s*<\/a>/gi, '<a class="logo" href="/alariadynamics.co/" aria-label="Alaria Dynamics home"><span class="site-logo">Alaria Dynamics</span></a>');
  // footer logo img -> text span
  s = s.replace(/<div class="footer-logo">\s*<img[^>]*>\s*<\/div>/gi, '<div class="footer-logo" aria-hidden="true"><span style="font-weight:700;max-width:140px;display:inline-block;">Alaria Dynamics</span></div>');

  if(s !== orig){
    fs.writeFileSync(fp,s,'utf8');
    console.log('Updated', fp);
    changed++;
  }
});
console.log('Done. Files updated:', changed);
