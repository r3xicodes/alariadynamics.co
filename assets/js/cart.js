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
    // i18n-friendly labels
    const lang = (window.AdaraI18n && window.AdaraI18n.getLang) ? window.AdaraI18n.getLang() : 'en';
    const translations = (window.AdaraI18n && window.AdaraI18n._dict) || {};
    const t = key => {
      try{
        if(window.AdaraI18n && window.AdaraI18n.getLang){
          const l = window.AdaraI18n.getLang();
          // translations are managed inside i18n.js; fallback to default map
          const map = {
            Clear: 'Clear',
            'Copy Summary': 'Copy Summary',
            'Open Ordering Form': 'Open Ordering Form'
          };
          return (window.AdaraI18n && window.AdaraI18n._dict && window.AdaraI18n._dict[l] && window.AdaraI18n._dict[l][key.toLowerCase().replace(/\s+/g,'_')]) || map[key] || key;
        }
      }catch(e){}
      return key;
    };

    const clearBtn = document.createElement('button'); clearBtn.className='btn'; clearBtn.textContent=t('Clear');
    clearBtn.addEventListener('click', () => { clear(); render(container); });
    const copyBtn = document.createElement('button'); copyBtn.className='btn btn--secondary'; copyBtn.textContent='Copy Summary';
    copyBtn.addEventListener('click', () => { copyToClipboard(cartSummary()); });
    const openFormBtn = document.createElement('button'); openFormBtn.className='btn btn--primary'; openFormBtn.textContent=t('Open Ordering Form');
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

  function copyToClipboard(text){
    if(!text) return;
    if(navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(()=>alert('Cart copied to clipboard'));
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); alert('Cart copied to clipboard'); }catch(e){ alert('Copy failed'); } ta.remove();
  }

  // expose global helpers
  window.SimpleCart = { addItem, removeItem, updateQty, clear, getCart, render, cartSummary, setFormPrefillMap: (m)=>{ window.SimpleCart._prefillMap = m; } };

  // if ordering page is loaded with ?add=... then add that item
  try{
    const params = new URLSearchParams(location.search);
    const add = params.get('add');
    if(add){ addItem(add); }
  }catch(e){}

})();

function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }
