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

  hotspots.forEach(h => h.addEventListener('click', (e) => {
    const label = h.getAttribute('data-label');
    const content = h.getAttribute('data-content') || label;
    if(overlay){
      overlay.querySelector('.overlay-card').innerHTML = `<h3>${label}</h3><p>${content}</p><p><button class=\"overlay-close\">Close</button></p>`;
      overlay.classList.add('show');
      overlay.querySelector('.overlay-close').addEventListener('click', () => overlay.classList.remove('show'));
    }
  }));

  if(overlayClose) overlayClose.forEach(b => b.addEventListener('click', () => overlay.classList.remove('show')));
});
