// Simple client-side i18n
(function(){
  const KEY = 'adara_lang_v1';
  const defaultLang = 'en';
  const translations = {
    en: {
      clear: 'Clear',
      copy_summary: 'Copy Summary',
      open_ordering_form: 'Open Ordering Form',
      solutions_hero_title: 'Integrated solutions across domains',
      solutions_hero_desc: 'Delivering secure platforms, resilient communications, and mission-focused integration for air, land, sea, space and cyber.',
      btn_explore_products: 'Explore Products',
      newsletter_title: 'Join the Vector Star newsletter',
      newsletter_desc: 'Get articles on the innovative projects our engineers are working on right now.',
      card_systems_integration: 'Systems Integration',
      card_systems_integration_desc: 'End-to-end system design, integration and sustainment for defense operators.',
      card_secure_communications: 'Secure Communications',
      card_secure_communications_desc: 'Resilient, low-latency networks and hardened comms for contested environments.',
      card_autonomy_ai: 'Autonomy & AI',
  card_autonomy_ai_desc: 'Autonomous capabilities and decision support tools engineered for safety and explainability.',
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
  btn_express_interest: 'Express interest',
      request_info: 'Request Info',
      learn_more: 'Learn more',
      coming_soon: 'Coming soon',
      download_brochure: 'Download brochure'
    },
    es: {
      clear: 'Borrar',
      copy_summary: 'Copiar resumen',
      open_ordering_form: 'Abrir formulario de pedido',
      solutions_hero_title: 'Soluciones integradas en todos los dominios',
      solutions_hero_desc: 'Proporcionando plataformas seguras, comunicaciones resilientes e integración orientada a la misión para aire, tierra, mar, espacio y ciber.',
      btn_explore_products: 'Explorar productos',
      newsletter_title: 'Únete al boletín Vector Star',
      newsletter_desc: 'Recibe artículos sobre los proyectos innovadores en los que trabajan nuestros ingenieros en este momento.',
      card_systems_integration: 'Integración de sistemas',
      card_systems_integration_desc: 'Diseño de sistemas de extremo a extremo, integración y sostenimiento para operadores de defensa.',
      card_secure_communications: 'Comunicaciones seguras',
      card_secure_communications_desc: 'Redes resilientes y de baja latencia y comunicaciones endurecidas para entornos contestados.',
      card_autonomy_ai: 'Autonomía y IA',
  card_autonomy_ai_desc: 'Capacidades autónomas y herramientas de soporte de decisiones diseñadas para la seguridad y la explicabilidad.',
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
  btn_express_interest: 'Expresar interés',
      request_info: 'Solicitar información',
      learn_more: 'Más información',
      coming_soon: 'Próximamente',
      download_brochure: 'Descargar folleto'
    },
    fr: {
      clear: 'Effacer',
      copy_summary: 'Copier le résumé',
      open_ordering_form: 'Ouvrir le formulaire de commande',
      solutions_hero_title: 'Solutions intégrées dans tous les domaines',
      solutions_hero_desc: 'Fournir des plates-formes sécurisées, des communications résilientes et une intégration axée sur la mission pour l\'air, la terre, la mer, l\'espace et le cyberespace.',
      btn_explore_products: 'Explorer les produits',
      newsletter_title: 'Rejoignez la newsletter Vector Star',
      newsletter_desc: 'Recevez des articles sur les projets innovants sur lesquels travaillent actuellement nos ingénieurs.',
      card_systems_integration: 'Intégration des systèmes',
      card_systems_integration_desc: 'Conception de systèmes de bout en bout, intégration et maintenance pour les opérateurs de défense.',
      card_secure_communications: 'Communications sécurisées',
      card_secure_communications_desc: 'Réseaux résilients et à faible latence et communications durcies pour les environnements contestés.',
      card_autonomy_ai: 'Autonomie & IA',
  card_autonomy_ai_desc: 'Capacités autonomes et outils d\'aide à la décision conçus pour la sécurité et l\'explicabilité.',
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
  btn_express_interest: 'Exprimer votre intérêt',
      request_info: 'Demander des informations',
      learn_more: 'En savoir plus',
      coming_soon: 'Bientôt disponible',
      download_brochure: 'Télécharger la brochure'
    },
    zh: {
      clear: '清除',
      copy_summary: '复制摘要',
      open_ordering_form: '打开订购表单',
      solutions_hero_title: '跨域的综合解决方案',
      solutions_hero_desc: '为空中、陆地、海上、太空和网络领域提供安全平台、弹性通信和以任务为中心的集成。',
      btn_explore_products: '探索产品',
      newsletter_title: '加入 Vector Star 新闻通讯',
      newsletter_desc: '获取有关我们工程师当前正在研究的创新项目的文章。',
      card_systems_integration: '系统集成',
      card_systems_integration_desc: '为国防运营商提供端到端系统设计、集成和维护。',
      card_secure_communications: '安全通信',
      card_secure_communications_desc: '面向受挑战环境的弹性、低延迟网络和加固通信。',
      card_autonomy_ai: '自主与人工智能',
  card_autonomy_ai_desc: '为安全性和可解释性而工程化的自主能力和决策支持工具。',
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
  btn_express_interest: '表示兴趣',
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
    // wire language toggle as a click dropdown (persistent until click outside)
    document.querySelectorAll('.lang-toggle').forEach(toggle => {
      try{ toggle.setAttribute('aria-label', dict.toggle_lang || translations[defaultLang].toggle_lang); }catch(e){}

      // if toggle is just a container, create a dropdown control
      if(!toggle.querySelector('.lang-selected')){
        const selected = document.createElement('div'); selected.className='lang-selected'; selected.tabIndex = 0; selected.textContent = (getLang()||'en').toUpperCase(); selected.style.cursor='pointer'; selected.setAttribute('aria-haspopup','listbox');
        const list = document.createElement('div'); list.className='lang-list'; list.setAttribute('role','listbox'); list.style.display='none'; list.style.position='absolute'; list.style.background='var(--card-bg)'; list.style.border='1px solid rgba(12,18,30,0.06)'; list.style.borderRadius='8px'; list.style.padding='6px'; list.style.boxShadow='0 10px 30px rgba(12,20,40,0.06)';
        ['en','es','fr','zh'].forEach(code => {
          const item = document.createElement('div'); item.className='lang-item'; item.textContent = code.toUpperCase(); item.dataset.lang = code; item.style.padding='6px 10px'; item.style.cursor='pointer'; item.style.fontWeight = (getLang()===code?'700':'600');
          item.addEventListener('click', ()=>{ setLang(code); selected.textContent = code.toUpperCase(); list.style.display='none'; toggle.querySelectorAll('.lang-item').forEach(x=>x.style.fontWeight=(x.dataset.lang===code?'700':'600')); });
          list.appendChild(item);
        });
        toggle.style.position='relative'; toggle.appendChild(selected); toggle.appendChild(list);

        // open/close on click
        selected.addEventListener('click', (e)=>{ const l = toggle.querySelector('.lang-list'); l.style.display = l.style.display==='none'?'block':'none'; e.stopPropagation(); });

        // close when clicking outside
        document.addEventListener('click', function(){ const l = toggle.querySelector('.lang-list'); if(l) l.style.display='none'; });
      }
    });
    applyLang(getLang());
  });

  // runtime helper for other scripts
  function t(key){ const dict = translations[getLang()] || translations[defaultLang]; return dict[key] || translations[defaultLang][key] || key; }

  window.AdaraI18n = { setLang, getLang, t, _dict: translations };
})();

