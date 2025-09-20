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
    const clearBtn = document.createElement('button'); clearBtn.className='btn'; clearBtn.textContent='Clear';
    clearBtn.addEventListener('click', () => { clear(); render(container); });
    const copyBtn = document.createElement('button'); copyBtn.className='btn btn--secondary'; copyBtn.textContent='Copy Summary';
    copyBtn.addEventListener('click', () => { copyToClipboard(cartSummary()); });
    const openFormBtn = document.createElement('button'); openFormBtn.className='btn btn--primary'; openFormBtn.textContent='Open Ordering Form';
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
    const summary = encodeURIComponent(cartSummary());
    return base + '?entry=cart_summary&summary=' + summary;
  }

  function copyToClipboard(text){
    if(!text) return;
    if(navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(()=>alert('Cart copied to clipboard'));
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); alert('Cart copied to clipboard'); }catch(e){ alert('Copy failed'); } ta.remove();
  }

  // expose global helpers
  window.SimpleCart = { addItem, removeItem, updateQty, clear, getCart, render, cartSummary };

  // if ordering page is loaded with ?add=... then add that item
  try{
    const params = new URLSearchParams(location.search);
    const add = params.get('add');
    if(add){ addItem(add); }
  }catch(e){}

})();

function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }
