// Lightweight interactive viewer for product pages
// Features: thumbnail switch, hotspots, overlay info

document.addEventListener('DOMContentLoaded', function(){
  const thumbs = document.querySelectorAll('.interactive-thumbs img');
  const main = document.querySelector('.interactive-main img');
  const hotspots = document.querySelectorAll('.hotspot');
  const overlay = document.querySelector('.viewer-overlay');
  const overlayClose = document.querySelectorAll('.overlay-close');

  if(thumbs && main){
    thumbs.forEach(t => t.addEventListener('click', () => {
      main.src = t.dataset.src || t.src;
    }));
  }

  // Insert an "Order Now" button into product pages dynamically
  const specs = document.querySelector('.product-specs');
  if(specs){
    const titleEl = specs.querySelector('h1');
    const productName = titleEl ? titleEl.textContent.trim() : document.title;
    const orderLink = document.createElement('a');
    orderLink.className = 'btn btn--secondary';
    orderLink.href = `/products/ordering/index.html?add=${encodeURIComponent(productName)}`;
  // prefer runtime translation helper if available
  orderLink.setAttribute('data-i18n','order_now');
  try{ orderLink.textContent = (window.AdaraI18n && typeof window.AdaraI18n.t === 'function') ? window.AdaraI18n.t('order_now') : 'Order Now'; }catch(e){ orderLink.textContent = 'Order Now'; }
    // append after the primary CTA if exists
    const primaryCTA = specs.querySelector('.btn--large');
    if(primaryCTA) primaryCTA.insertAdjacentElement('afterend', orderLink);
    else specs.appendChild(orderLink);
  }

  hotspots.forEach(h => h.addEventListener('click', (e) => {
    const label = h.getAttribute('data-label');
    const content = h.getAttribute('data-content') || label;
    if(overlay){
      overlay.querySelector('.overlay-card').innerHTML = `<h3>${label}</h3><p>${content}</p><p><button class="overlay-close">Close</button></p>`;
      overlay.classList.add('show');
      overlay.querySelector('.overlay-close').addEventListener('click', () => overlay.classList.remove('show'));
    }
  }));

  if(overlayClose) overlayClose.forEach(b => b.addEventListener('click', () => overlay.classList.remove('show')));
});

