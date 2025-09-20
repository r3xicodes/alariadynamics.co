const fs = require('fs');
const path = require('path');
const http = require('http');

function walk(dir){
  let out = [];
  fs.readdirSync(dir).forEach(f=>{
    const full = path.join(dir,f);
    if(fs.statSync(full).isDirectory()) out = out.concat(walk(full));
    else if(/\.html?$/.test(f)) out.push(full);
  });
  return out;
}

const root = path.resolve(__dirname, '..');
const htmlFiles = walk(root).filter(p => p.indexOf('node_modules')===-1 && p.indexOf('.git')===-1);

function check(url){
  return new Promise((res)=>{
    const opts = { hostname:'localhost', port:4000, path: url, method:'GET' };
    const req = http.request(opts, r => {
      res({url, status: r.statusCode});
      r.resume();
    });
    req.on('error', e => res({url, status: 'ERR', err: e.message}));
    req.end();
  });
}

(async function(){
  const urls = htmlFiles.map(f => f.replace(root,'').replace(/\\\\/g,'/'));
  let failed = [];
  for(const u of urls){
    const pathUrl = u === '/index.html' ? '/' : u.replace(/index\.html$/,'');
    const r = await check(pathUrl);
    if(r.status !== 200) failed.push(r);
    console.log(pathUrl,'->',r.status);
  }
  console.log('Crawl done. Failures:', failed.length);
  if(failed.length) console.log(failed);
})();
