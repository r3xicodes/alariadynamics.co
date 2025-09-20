// Lightweight interactive viewer for product pages
// Features: thumbnail switch, hotspots, overlay info

document.addEventListener('DOMContentLoaded', function(){
  const thumbs = document.querySelectorAll('.interactive-thumbs img');
  const mainImage = document.querySelector('#viewer-main');
  const modelViewer = document.querySelector('#viewer-main-3d');
  const hotspots = document.querySelectorAll('.hotspot');
  const overlay = document.querySelector('.viewer-overlay');
  const overlayClose = document.querySelectorAll('.overlay-close');

  function showImage(src){
    if(modelViewer) modelViewer.style.display = 'none';
    if(mainImage){ mainImage.style.display = ''; mainImage.src = src; }
  }

  function showModel(src){
    if(mainImage) mainImage.style.display = 'none';
    if(modelViewer){
      // lazy-load model src if not already set to this
      if(modelViewer.getAttribute('src') !== src) modelViewer.setAttribute('src', src);
      modelViewer.style.display = '';
    }
  }

  if(thumbs && thumbs.length){
    thumbs.forEach(t => t.addEventListener('click', () => {
      const type = t.dataset.type || 'image';
      const src = t.dataset.src || t.src;
      if(type === 'model'){
        showModel(src);
      } else {
        showImage(src);
      }
    }));
  }

  hotspots.forEach(h => h.addEventListener('click', (e) => {
    const label = h.getAttribute('data-label');
    const content = h.getAttribute('data-content') || label;
    if(overlay){
      overlay.querySelector('.overlay-card').innerHTML = `<h3>${label}</h3><p>${content}</p><p><button class="overlay-close">Close</button></p>`;
      overlay.classList.add('show');
      const closeBtn = overlay.querySelector('.overlay-close');
      if(closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('show'));
    }
  }));

  if(overlayClose) overlayClose.forEach(b => b.addEventListener('click', () => overlay.classList.remove('show')));

  // initial state: ensure image is visible and model is hidden
  if(modelViewer) modelViewer.style.display = 'none';
  if(mainImage) mainImage.style.display = '';
});
