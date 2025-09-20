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
      toggle_lang: 'Language selector',
      nav_home: 'Home',
      nav_about: 'About',
      nav_products: 'Products',
      nav_media: 'Media',
      nav_careers: 'Careers',
      nav_contact: 'Contact',
      footer_helpful_links: 'Helpful Links',
      footer_connect: 'Connect',
      footer_privacy: 'Privacy',
      footer_terms: 'Terms of Use',
      footer_cookies: 'Cookies',
      btn_search: 'Search',
      btn_sign_up: 'Sign up now',
      request_info: 'Request Info',
      learn_more: 'Learn more',
      coming_soon: 'Coming soon',
      download_brochure: 'Download brochure'
    },
    es: {
      order_now: 'Ordenar',
      view_3d: 'Ver 3D',
      view_2d: 'Ver 2D',
      search_placeholder: 'Buscar en el sitio',
      toggle_lang: 'Selector de idioma',
      nav_home: 'Inicio',
      nav_about: 'Acerca de',
      nav_products: 'Productos',
      nav_media: 'Medios',
      nav_careers: 'Empleos',
      nav_contact: 'Contacto',
      footer_helpful_links: 'Enlaces útiles',
      footer_connect: 'Conectar',
      footer_privacy: 'Privacidad',
      footer_terms: 'Términos de uso',
      footer_cookies: 'Cookies',
      btn_search: 'Buscar',
      btn_sign_up: 'Regístrate',
      request_info: 'Solicitar información',
      learn_more: 'Más información',
      coming_soon: 'Próximamente',
      download_brochure: 'Descargar folleto'
    },
    fr: {
      order_now: 'Commander',
      view_3d: 'Voir 3D',
      view_2d: 'Voir 2D',
      search_placeholder: 'Rechercher sur le site',
      toggle_lang: 'Sélecteur de langue',
      nav_home: 'Accueil',
      nav_about: 'À propos',
      nav_products: 'Produits',
      nav_media: 'Médias',
      nav_careers: 'Carrières',
      nav_contact: 'Contact',
      footer_helpful_links: 'Liens utiles',
      footer_connect: 'Se connecter',
      footer_privacy: 'Confidentialité',
      footer_terms: 'Conditions d\'utilisation',
      footer_cookies: 'Cookies',
      btn_search: 'Rechercher',
      btn_sign_up: 'Inscrivez-vous',
      request_info: 'Demander des informations',
      learn_more: 'En savoir plus',
      coming_soon: 'Bientôt disponible',
      download_brochure: 'Télécharger la brochure'
    },
    zh: {
      order_now: '下单',
      view_3d: '查看3D',
      view_2d: '查看2D',
      search_placeholder: '在站点中搜索',
      toggle_lang: '语言选择',
      nav_home: '首页',
      nav_about: '关于',
      nav_products: '产品',
      nav_media: '媒体',
      nav_careers: '招聘',
      nav_contact: '联系',
      footer_helpful_links: '有用链接',
      footer_connect: '联系我们',
      footer_privacy: '隐私',
      footer_terms: '使用条款',
      footer_cookies: 'Cookies',
      btn_search: '搜索',
      btn_sign_up: '注册',
      request_info: '索取信息',
      learn_more: '了解更多',
      coming_soon: '敬请期待',
      download_brochure: '下载手册'
    }
  };

  function getLang(){ return localStorage.getItem(KEY) || defaultLang; }
  function setLang(l){ localStorage.setItem(KEY,l); applyLang(l); }

  function applyLang(l){
    const dict = translations[l] || translations[defaultLang];
    // primary explicit annotations via data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(!key) return;
      const txt = dict[key] || translations[defaultLang][key] || el.textContent;
      if(el.tagName.toLowerCase()==='input' || el.tagName.toLowerCase()==='textarea') el.placeholder = txt;
      else el.textContent = txt;
    });

    // auto-localize common selectors to avoid editing all HTML files
    // header nav links
    const navMap = {
      '.main-nav .nav-item:nth-child(1) a': 'nav_home',
      '.main-nav .nav-item:nth-child(2) a': 'nav_about',
      '.main-nav .nav-item:nth-child(3) a': 'nav_products',
      '.main-nav .nav-item:nth-child(4) a': null, // megamenu title left intact
      '.main-nav .nav-item:nth-child(5) a': 'nav_media',
      '.main-nav .nav-item:nth-child(6) a': 'nav_careers',
      '.main-nav .nav-item:nth-child(7) a': 'nav_contact'
    };
    Object.keys(navMap).forEach(sel => {
      const k = navMap[sel];
      const el = document.querySelector(sel);
      if(el && k) el.textContent = dict[k] || translations[defaultLang][k] || el.textContent;
    });

    // search button
    document.querySelectorAll('.search-form button').forEach(b => b.textContent = dict.btn_search || translations[defaultLang].btn_search || b.textContent);

    // search inputs
    document.querySelectorAll('.search-form input[type="search"]').forEach(i => i.setAttribute('placeholder', dict.search_placeholder || translations[defaultLang].search_placeholder));

    // footer labels (try common elements)
    document.querySelectorAll('.footer-top h4').forEach(h => {
      const txt = h.textContent.trim().toLowerCase();
      if(txt.includes('help') || txt.includes('helpful')) h.textContent = dict.footer_helpful_links || translations[defaultLang].footer_helpful_links;
    });
    document.querySelectorAll('.footer-legal a').forEach((a, idx) => {
      if(idx===0) a.textContent = dict.footer_privacy || translations[defaultLang].footer_privacy;
      if(idx===1) a.textContent = dict.footer_terms || translations[defaultLang].footer_terms;
      if(idx===2) a.textContent = dict.footer_cookies || translations[defaultLang].footer_cookies;
    });

    // footer newsletter CTA
    document.querySelectorAll('.footer-newsletter .btn').forEach(b => b.textContent = dict.btn_sign_up || translations[defaultLang].btn_sign_up || b.textContent);
  }

  document.addEventListener('DOMContentLoaded', function(){
    // wire language buttons
    document.querySelectorAll('.lang-toggle').forEach(toggle => {
      // create buttons if empty
      if(!toggle.querySelectorAll('button').length){
        ['en','es','fr','zh'].forEach(code => {
          const b=document.createElement('button'); b.type='button'; b.textContent=code.toUpperCase(); b.dataset.lang=code; if(code===getLang()) b.classList.add('active'); toggle.appendChild(b);
        });
      }
      toggle.querySelectorAll('button').forEach(b => b.addEventListener('click', ()=>{
        const lang = b.dataset.lang; if(!lang) return; setLang(lang);
        toggle.querySelectorAll('button').forEach(x => x.classList.toggle('active', x===b));
      }));
    });
    applyLang(getLang());
  });

  // runtime helper for other scripts
  function t(key){ const dict = translations[getLang()] || translations[defaultLang]; return dict[key] || translations[defaultLang][key] || key; }

  window.AdaraI18n = { setLang, getLang, t, _dict: translations };
})();
