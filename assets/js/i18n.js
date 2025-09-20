// Simple client-side i18n
(function(){
  const KEY = 'adara_lang_v1';
  const defaultLang = 'en';
  const translations = {
    en: {
      order_now: 'Order Now',
      view_3d: 'View 3D',
      view_2d: 'View 2D',
      search_placeholder: 'Search site',
      toggle_lang: 'Language selector'
    },
    es: {
      order_now: 'Ordenar',
      view_3d: 'Ver 3D',
      view_2d: 'Ver 2D',
      search_placeholder: 'Buscar en el sitio',
      toggle_lang: 'Selector de idioma'
    },
    fr: {
      order_now: 'Commander',
      view_3d: 'Voir 3D',
      view_2d: 'Voir 2D',
      search_placeholder: 'Rechercher sur le site',
      toggle_lang: 'Sélecteur de langue'
    },
    zh: {
      order_now: '下单',
      view_3d: '查看3D',
      view_2d: '查看2D',
      search_placeholder: '在站点中搜索',
      toggle_lang: '语言选择'
    }
  };

  function getLang(){ return localStorage.getItem(KEY) || defaultLang; }
  function setLang(l){ localStorage.setItem(KEY,l); applyLang(l); }

  function applyLang(l){
    const dict = translations[l] || translations[defaultLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(!key) return;
      const txt = dict[key] || translations[defaultLang][key] || el.textContent;
      if(el.tagName.toLowerCase()==='input' || el.tagName.toLowerCase()==='textarea') el.placeholder = txt;
      else el.textContent = txt;
    });
    // adjust search inputs
    document.querySelectorAll('.search-form input[type="search"]').forEach(i => i.setAttribute('placeholder', dict.search_placeholder || translations[defaultLang].search_placeholder));
  }

  document.addEventListener('DOMContentLoaded', function(){
    // wire language buttons
    document.querySelectorAll('.lang-toggle').forEach(toggle => {
      // create buttons if empty
      if(!toggle.querySelectorAll('button').length){
        ['en','es','fr','zh'].forEach(code => {
          const b=document.createElement('button'); b.type='button'; b.textContent=code.toUpperCase(); b.dataset.lang=code; if(code==='en') b.classList.add('active'); toggle.appendChild(b);
        });
      }
      toggle.querySelectorAll('button').forEach(b => b.addEventListener('click', ()=>{
        const lang = b.dataset.lang; if(!lang) return; setLang(lang);
        toggle.querySelectorAll('button').forEach(x => x.classList.toggle('active', x===b));
      }));
    });
    applyLang(getLang());
  });

  window.AdaraI18n = { setLang, getLang };
})();
