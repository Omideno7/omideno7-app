/* Omideno7 V61.1 — Footer version stable fix
   Scope: only the footer/version label inside the More page. No other app sections are changed. */
(function(){
  'use strict';
  var VERSION = 'V61.1';

  function getLang(){
    try { return localStorage.getItem('lang') || localStorage.getItem('omideno7_lang') || document.documentElement.lang || 'fa'; }
    catch(e){ return 'fa'; }
  }
  function tagline(lang){
    if(lang === 'fa') return 'بنا شده بر مسیح، هدایت‌شده با روح‌القدس.';
    if(lang === 'hr') return 'Izgrađena na Kristu. Vođena Duhom.';
    return 'Built on Christ. Led by the Spirit.';
  }
  function ensureFooter(){
    var more = document.getElementById('more');
    if(!more) return null;
    var footer = more.querySelector('#mainFooter') || more.querySelector('.footer');
    if(!footer){
      footer = document.createElement('div');
      footer.className = 'footer';
      footer.id = 'mainFooter';
      more.appendChild(footer);
    }
    return footer;
  }
  function removeLooseVersionLabels(more, footer){
    if(!more) return;
    var nodes = Array.from(more.querySelectorAll('div,p,span,strong,small'));
    nodes.forEach(function(el){
      if(el === footer || (footer && footer.contains(el))) return;
      var txt = (el.textContent || '').trim();
      if(/^App\s*Version\s*:/i.test(txt) || /App\s*Version\s*:\s*V\d/i.test(txt)){
        el.remove();
      }
    });
    Array.from(more.childNodes).forEach(function(n){
      if(n.nodeType === 3 && /App\s*Version\s*:/i.test(n.textContent || '')) n.remove();
    });
  }
  function render(){
    var more = document.getElementById('more');
    var footer = ensureFooter();
    if(!more || !footer) return;
    removeLooseVersionLabels(more, footer);
    var lang = getLang();
    footer.className = 'footer';
    footer.id = 'mainFooter';
    footer.setAttribute('data-footer-managed','v61.1');
    footer.innerHTML = '';
    var copy = document.createElement('div');
    copy.className = 'footer-copy';
    copy.textContent = '© Omideno7 Church (New Hope7)';
    var tag = document.createElement('div');
    tag.className = 'footer-tagline';
    tag.textContent = tagline(lang);
    var ver = document.createElement('div');
    ver.id = 'appVersion';
    ver.className = 'app-version';
    ver.textContent = 'App Version: ' + VERSION;
    footer.appendChild(copy); footer.appendChild(tag); footer.appendChild(ver);
    window.APP_VERSION = VERSION;
  }
  function schedule(){ [0,250,800,1800,4000,8000].forEach(function(ms){ setTimeout(render, ms); }); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, {once:true}); else schedule();
  document.addEventListener('click', function(e){
    if(e.target && (e.target.closest('[data-page="more"]') || e.target.closest('[data-lang]'))){
      setTimeout(render, 250); setTimeout(render, 1000);
    }
  }, true);
})();
