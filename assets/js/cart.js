// Simple client-side cart using localStorage
// API:
// - addItem(name)
// - getCart() => [{name, qty}]
// - renderCart(container)

(function(){
  const KEY = 'adara_cart_v1';

  function load(){
    try{ return JSON.parse(localStorage.getItem(KEY) || '[]'); }catch(e){ return []; }
  }
  function save(cart){ localStorage.setItem(KEY, JSON.stringify(cart)); }

  function addItem(name){
    if(!name) return;
    const cart = load();
    const existing = cart.find(i => i.name === name);
    if(existing) existing.qty = (existing.qty||1) + 1;
    else cart.push({name:name, qty:1});
    save(cart);
    return cart;
  }

  function removeItem(name){
    let cart = load();
    cart = cart.filter(i => i.name !== name);
    save(cart);
    return cart;
  }

  function updateQty(name, qty){
    const cart = load();
    const item = cart.find(i => i.name === name);
    if(!item) return cart;
    item.qty = Math.max(0, qty);
    const newCart = cart.filter(i => i.qty>0);
    save(newCart);
    return newCart;
  }

  function clear(){ localStorage.removeItem(KEY); }

  function getCart(){ return load(); }

  function render(container){
    const cart = load();
    container.innerHTML = '';
    if(!cart.length){
      container.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }
    const list = document.createElement('div');
    list.className = 'cart-list';
    cart.forEach(item => {
      const row = document.createElement('div'); row.className='cart-item';
      row.innerHTML = `<strong>${escapeHtml(item.name)}</strong> <span class="qty">Qty: <button class="dec">-</button> <span class="num">${item.qty}</span> <button class="inc">+</button></span> <button class="remove">Remove</button>`;
      row.querySelector('.inc').addEventListener('click', () => { updateQty(item.name, item.qty+1); render(container); });
      row.querySelector('.dec').addEventListener('click', () => { updateQty(item.name, item.qty-1); render(container); });
      row.querySelector('.remove').addEventListener('click', () => { removeItem(item.name); render(container); });
      list.appendChild(row);
    });
    container.appendChild(list);

    const actions = document.createElement('div'); actions.className='cart-actions';
    // i18n-friendly labels via runtime helper
    const t = key => (window.AdaraI18n && window.AdaraI18n.t) ? window.AdaraI18n.t(key) : key;

  const clearBtn = document.createElement('button'); clearBtn.className='btn'; clearBtn.textContent=t('clear');
    clearBtn.addEventListener('click', () => { clear(); render(container); });
  const copyBtn = document.createElement('button'); copyBtn.className='btn btn--secondary'; copyBtn.textContent=t('copy_summary');
    copyBtn.addEventListener('click', () => { copyToClipboard(cartSummary()); });
  const openFormBtn = document.createElement('button'); openFormBtn.className='btn btn--primary'; openFormBtn.textContent=t('open_ordering_form');
    openFormBtn.addEventListener('click', () => { window.open(orderingFormUrlWithSummary(), '_blank'); });
    actions.appendChild(clearBtn); actions.appendChild(copyBtn); actions.appendChild(openFormBtn);
    container.appendChild(actions);
  }

  function cartSummary(){
    const cart = load();
    if(!cart.length) return 'Cart is empty.';
    return cart.map(i => `${i.name} x ${i.qty}`).join('\n');
  }

  function orderingFormUrlWithSummary(){
    // Use the existing Google Form URL (embed) and add a fallback text via URL param (not ideal but helpful)
    const base = 'https://forms.gle/aoQkRM8kt3a92Law5';
    const summary = cartSummary();
    // If a prefill mapping is provided, construct a Google Form prefill URL using entry IDs
    if(window.SimpleCart && window.SimpleCart._prefillMap){
      const map = window.SimpleCart._prefillMap; // { fieldName: 'entry.123456' }
      const params = new URLSearchParams();
      // populate mapped fields
      Object.keys(map).forEach(k => {
        try{
          const id = map[k];
          if(!id) return;
          if(k === 'cart_summary') params.append(id, summary);
          else params.append(id, String(map[k+'_value'] || ''));
        }catch(e){}
      });
      const q = params.toString();
      return q ? (base + (base.includes('?') ? '&' : '?') + q) : base;
    }
    // fallback: append a readable summary param
    return base + '?summary=' + encodeURIComponent(summary);
  }

  // Parse a Google Form prefill URL and extract entry IDs into a mapping
  // Example input: https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url&entry.123456=...&entry.234567=...
  function parseGoogleFormPrefillUrl(url){
    try{
      const u = new URL(url);
      const params = new URLSearchParams(u.search);
      const map = {};
      for(const [k,v] of params.entries()){
        if(k.startsWith('entry.')){
          // heuristics: if the field label contains 'cart' or 'summary' assume it's the cart summary
          const key = (v && /cart|summary|order/i.test(v)) ? 'cart_summary' : 'field_'+k.replace(/entry\./,'');
          map[key] = k; // map logical name -> entry.X
        }
      }
      return Object.keys(map).length ? map : null;
    }catch(e){ return null; }
  }

  // Persist and restore mappings under a simple key
  const PREFILL_KEY = 'adara_prefill_v1';

  function setFormPrefillFromUrl(input){
    // Accept either a mapping object or a URL string. Persist mapping to localStorage.
    if(!input) return;
    if(typeof input === 'string'){
      const parsed = parseGoogleFormPrefillUrl(input);
      if(parsed){
        window.SimpleCart._prefillMap = parsed;
        try{ localStorage.setItem(PREFILL_KEY, JSON.stringify({ url: input, map: parsed })); }catch(e){}
      }
    }else if(typeof input === 'object'){
      window.SimpleCart._prefillMap = input;
      try{ localStorage.setItem(PREFILL_KEY, JSON.stringify({ url: null, map: input })); }catch(e){}
    }
  }

  function getStoredPrefill(){
    try{ const v = localStorage.getItem(PREFILL_KEY); return v ? JSON.parse(v) : null; }catch(e){ return null; }
  }

  function copyToClipboard(text){
    if(!text) return;
    if(navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(()=>alert('Cart copied to clipboard'));
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); alert('Cart copied to clipboard'); }catch(e){ alert('Copy failed'); } ta.remove();
  }

  // expose global helpers
  window.SimpleCart = { addItem, removeItem, updateQty, clear, getCart, render, cartSummary, setFormPrefillMap: (m)=>{ window.SimpleCart._prefillMap = m; }, parseGoogleFormPrefillUrl, setFormPrefillFromUrl, getStoredPrefill };

  // restore persisted mapping on load if present
  try{
    const stored = getStoredPrefill();
    if(stored && stored.map){ window.SimpleCart._prefillMap = stored.map; }
  }catch(e){}

  // if ordering page is loaded with ?add=... then add that item
  try{
    const params = new URLSearchParams(location.search);
    const add = params.get('add');
    if(add){ addItem(add); }
  }catch(e){}

})();

function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }
