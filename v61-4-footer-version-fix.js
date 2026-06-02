(function(){
  'use strict';
  const VERSION = 'V61.4';
  const TAGLINES = {
    fa: 'بنا شده بر مسیح، هدایت‌شده با روح‌القدس.',
    en: 'Built on Christ. Led by the Spirit.',
    hr: 'Izgrađena na Kristu. Vođena Duhom.'
  };
  function lang(){
    const v = localStorage.getItem('lang') || document.documentElement.lang || 'fa';
    return ['fa','en','hr'].includes(v) ? v : 'fa';
  }
  function versionText(){ return 'App Version: ' + VERSION; }
  function isVersionLike(text){
    return /App\s*Version\s*:\s*V\d+/i.test(text || '') || /نسخه\s*اپ\s*:?\s*V?\d+/i.test(text || '');
  }
  function cleanExtraVersions(){
    const more = document.getElementById('more') || document.body;
    // Remove elements outside main footer that contain only version text.
    more.querySelectorAll('p,div,span,strong,b,small').forEach(el => {
      if(el.id === 'mainFooter' || el.closest('#mainFooter')) return;
      const txt = (el.textContent || '').trim();
      if(isVersionLike(txt) && txt.length < 80){
        el.remove();
      }
    });
  }
  function renderFooter(){
    const footer = document.getElementById('mainFooter') || document.querySelector('#more .footer') || document.querySelector('.footer');
    if(!footer) return;
    const l = lang();
    footer.id = 'mainFooter';
    footer.setAttribute('data-footer-managed','v614');
    footer.innerHTML = `
      <div class="footer-brand">© Omideno7 Church (New Hope7)</div>
      <div class="footer-tagline">${TAGLINES[l] || TAGLINES.fa}</div>
      <div class="footer-version">${versionText()}</div>`;
    cleanExtraVersions();
  }
  function installStyles(){
    if(document.getElementById('v614-footer-style')) return;
    const st=document.createElement('style');
    st.id='v614-footer-style';
    st.textContent = `
      #mainFooter .footer-brand,#mainFooter .footer-tagline,#mainFooter .footer-version{display:block;text-align:center;line-height:1.35;}
      #mainFooter .footer-version{font-weight:700;margin-top:4px;}
    `;
    document.head.appendChild(st);
  }
  function run(){ installStyles(); renderFooter(); }
  function init(){
    run();
    [100,400,1000,2000].forEach(ms=>setTimeout(run,ms));
    document.addEventListener('click', function(e){
      if(e.target.closest('[data-page="more"], .nav-btn, .lang-toggle button')) setTimeout(run,80);
    }, true);
    window.Omideno7FooterVersionFix = { version: VERSION, refresh: run };
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
