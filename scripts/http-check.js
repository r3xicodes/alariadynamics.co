const http = require('http');
const urls = ['/', '/products/index.html', '/products/aircraft/lf-13/index.html', '/media/index.html'];

urls.forEach(u => {
  const opts = { hostname: 'localhost', port: 4000, path: u, method: 'GET' };
  const req = http.request(opts, res => {
    console.log(`${u} -> ${res.statusCode} ${res.statusMessage}`);
    res.resume();
  });
  req.on('error', e => console.error(`${u} -> ERROR: ${e.message}`));
  req.end();
});
