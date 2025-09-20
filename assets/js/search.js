// Lightweight client-side search using Fuse.js
(async function(){
  // load Fuse from CDN
  const fuseUrl = 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js';
  await import(fuseUrl).catch(()=>console.warn('Failed to import Fuse.js from CDN'));
  // fetch search.json
  async function loadIndex(){
    try{ const r = await fetch('/search.json'); if(!r.ok) return []; return r.json(); }catch(e){ return []; }
  }

  const resultsContainer = document.getElementById('search-results');
  const queryInput = document.getElementById('search-query');
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';
  if(queryInput) queryInput.value = q;

  const index = await loadIndex();
  const options = { keys: ['title','content','tags'], threshold:0.4 };
  const fuse = new Fuse(index, options);

  function renderResults(items){
    if(!resultsContainer) return;
    resultsContainer.innerHTML = '';
    if(!items.length) { resultsContainer.innerHTML = '<p>No results.</p>'; return; }
    const ul = document.createElement('ul');
    items.forEach(r => {
      const li = document.createElement('li');
      const a = document.createElement('a'); a.href = r.item ? r.item.url : r.url; a.textContent = r.item ? r.item.title : r.title;
      li.appendChild(a);
      if(r.item && r.item.excerpt) { const p = document.createElement('p'); p.textContent = r.item.excerpt; li.appendChild(p); }
      ul.appendChild(li);
    });
    resultsContainer.appendChild(ul);
  }

  function doSearch(q){
    if(!q) return renderResults([]);
    const res = fuse.search(q);
    renderResults(res);
  }

  if(q) doSearch(q);
  const form = document.getElementById('search-form');
  if(form) form.addEventListener('submit', function(e){ e.preventDefault(); const v = queryInput.value.trim(); if(v) { history.replaceState(null,'', '?q='+encodeURIComponent(v)); doSearch(v); } });
})();
