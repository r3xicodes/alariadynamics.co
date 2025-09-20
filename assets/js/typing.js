// Typing-on-scroll animation
// Usage: add a container with class `type-on-scroll` and data-text="Text to type"
// It will type when scrolled into view and reset on page reload.

(function(){
  function type(element, text, speed=40){
    element.textContent = '';
    let i = 0;
    return new Promise(resolve => {
      const timer = setInterval(()=>{
        element.textContent += text.charAt(i++);
        if(i>text.length){ clearInterval(timer); resolve(); }
      }, speed);
    });
  }

  function handleEntry(entries, observer){
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const text = el.dataset.text || el.textContent;
        const speed = parseInt(el.dataset.speed || 40,10);
        const cursor = document.createElement('span'); cursor.className='cursor';
        if(!el.classList.contains('typewriter')) el.classList.add('typewriter');
        if(!el.querySelector('.cursor')) el.appendChild(cursor);
        type(el, text, speed).then(()=>{ /* keep cursor after typing */ });
        observer.unobserve(el);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    const els = document.querySelectorAll('.type-on-scroll');
    if(!els.length) return;
    const observer = new IntersectionObserver(handleEntry, {threshold:0.2});
    els.forEach(e=>{
      // preserve original text in data-text so it can be reset on reload
      if(!e.dataset.text) e.dataset.text = e.textContent.trim();
      e.textContent = '';
      observer.observe(e);
    });
  });
})();
