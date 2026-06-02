(function(){
  'use strict';
  const VERSION='V61.5';
  const FOOTER_TEXT='App Version: '+VERSION;
  const I18N={
    fa:{back:'بازگشت',installTitle:'نصب اپ روی گوشی',installDesc:'برای دسترسی آسان، اپ کلیسای امیدنو۷ را روی صفحه اصلی گوشی خود اضافه کنید.',openGuide:'راهنمای نصب',closeGuide:'بستن راهنما',installBtn:'نصب اپ',androidTitle:'اندروید / Chrome',androidText:'اگر مرورگر شما اجازه نصب مستقیم بدهد، دکمه «نصب اپ» را بزنید. اگر دکمه نصب فعال نبود، از منوی مرورگر گزینه Add to Home Screen یا Install app را انتخاب کنید.',iosTitle:'آیفون / iPad',iosText:'در Safari دکمه Share را بزنید، سپس Add to Home Screen و بعد Add را انتخاب کنید.',huaweiTitle:'هواوی و مرورگرهای دیگر',huaweiText:'در مرورگر خود منو را باز کنید و گزینه Add to Home Screen، Add shortcut یا Install app را انتخاب کنید.',installed:'اپ قبلاً روی دستگاه شما نصب شده است.',tagline:'بنا شده بر مسیح، هدایت‌شده با روح‌القدس.'},
    en:{back:'Back',installTitle:'Install the App',installDesc:'Add the Omideno7 Church app to your phone Home Screen for easy access.',openGuide:'Installation Guide',closeGuide:'Close Guide',installBtn:'Install App',androidTitle:'Android / Chrome',androidText:'If your browser supports direct installation, tap “Install App”. If the button is not available, open the browser menu and choose Add to Home Screen or Install app.',iosTitle:'iPhone / iPad',iosText:'In Safari, tap Share, then Add to Home Screen, then Add.',huaweiTitle:'Huawei and other browsers',huaweiText:'Open your browser menu and choose Add to Home Screen, Add shortcut, or Install app.',installed:'The app is already installed on this device.',tagline:'Built on Christ. Led by the Spirit.'},
    hr:{back:'Natrag',installTitle:'Instaliraj aplikaciju',installDesc:'Dodajte aplikaciju Crkve Omideno7 na početni zaslon telefona za lakši pristup.',openGuide:'Upute za instalaciju',closeGuide:'Zatvori upute',installBtn:'Instaliraj aplikaciju',androidTitle:'Android / Chrome',androidText:'Ako preglednik podržava izravnu instalaciju, dodirnite “Instaliraj aplikaciju”. Ako gumb nije dostupan, otvorite izbornik preglednika i odaberite Add to Home Screen ili Install app.',iosTitle:'iPhone / iPad',iosText:'U Safariju dodirnite Share, zatim Add to Home Screen, zatim Add.',huaweiTitle:'Huawei i drugi preglednici',huaweiText:'Otvorite izbornik preglednika i odaberite Add to Home Screen, Add shortcut ili Install app.',installed:'Aplikacija je već instalirana na ovom uređaju.',tagline:'Izgrađena na Kristu. Vođena Duhom.'}
  };
  let deferredPrompt=null;
  let suppressNav=false;
  const navStack=[];
  const PAGE_IDS=new Set(['home','plans','bible','bibleReader','word','declarations','meetings','newbirth','thanksgiving','more']);
  function lang(){
    const v=localStorage.getItem('lang') || document.documentElement.lang || (document.body && document.body.getAttribute('data-lang')) || 'fa';
    return ['fa','en','hr'].includes(v)?v:'fa';
  }
  function t(k){return (I18N[lang()]||I18N.fa)[k] || I18N.en[k] || k;}
  function activePage(){
    const p=document.querySelector('.page.active');
    return p ? p.id : 'home';
  }
  function showPageSafe(id){
    if(!id || !PAGE_IDS.has(id)) id='home';
    suppressNav=true;
    try{
      if(typeof originalShowPage==='function') originalShowPage(id);
      else if(typeof window.__om7OriginalShowPage==='function') window.__om7OriginalShowPage(id);
      else {
        document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active', p.id===id));
        document.querySelectorAll('.nav-btn,[data-page]').forEach(b=>{
          if(b.closest('.bottom-nav') || b.classList.contains('nav-btn')) b.classList.toggle('active', b.dataset.page===id);
        });
      }
      window.scrollTo({top:0,behavior:'smooth'});
    } finally { setTimeout(()=>{suppressNav=false; refreshBackButtons();},80); }
  }
  const originalShowPage=window.showPage;
  if(!window.__om7OriginalShowPage && typeof window.showPage==='function') window.__om7OriginalShowPage=window.showPage;
  if(typeof window.showPage==='function'){
    window.showPage=function(id){
      const cur=activePage();
      if(!suppressNav && id && id!==cur && PAGE_IDS.has(cur)) pushHistory(cur);
      const fn=window.__om7OriginalShowPage || originalShowPage;
      const result=fn.apply(this,arguments);
      setTimeout(()=>{refreshBackButtons(); renderInstallCard(); fixFooter();},60);
      return result;
    };
  }
  function pushHistory(id){
    if(!id || id==='home') return;
    if(navStack[navStack.length-1]!==id) navStack.push(id);
    if(navStack.length>30) navStack.shift();
  }
  function goBack(){
    const cur=activePage();
    let target=navStack.pop();
    while(target && target===cur) target=navStack.pop();
    showPageSafe(target || 'home');
  }
  function installStyle(){
    if(document.getElementById('v615-style')) return;
    const st=document.createElement('style');
    st.id='v615-style';
    st.textContent=`
      .global-back,.global-back-btn,.floating-back,.floating-back-btn,#globalBack,#globalBackButton,[data-global-back],[data-v613-hidden-floating-back]{display:none!important;visibility:hidden!important;pointer-events:none!important;}
      .om7-page-back{display:inline-flex;align-items:center;gap:6px;margin:10px 0 14px;padding:9px 14px;border:0;border-radius:999px;background:#f1f5f9;color:#0f172a;font-weight:800;box-shadow:0 1px 4px rgba(0,0,0,.12);}
      html[dir="rtl"] .om7-page-back{direction:rtl;}
      .om7-install-card{border-top:5px solid var(--green,#00b91f);}
      .om7-install-card .om7-install-details{display:none;margin-top:12px;padding:12px;border-radius:14px;background:rgba(6,20,109,.05);}
      .om7-install-card.open .om7-install-details{display:block;}
      .om7-install-card h3{margin-top:0;}
      .om7-install-card h4{margin:10px 0 4px;font-size:1rem;}
      .om7-install-card .btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;}
      #om7-version-footer{display:block;text-align:center;margin:18px auto 24px;padding:10px 8px;color:inherit;opacity:.95;}
      #om7-version-footer .footer-version{font-weight:800;margin-top:4px;}
    `;
    document.head.appendChild(st);
  }
  function isBackText(txt){
    const s=(txt||'').replace(/\s+/g,' ').trim().toLowerCase();
    return ['back','← back','back ←','بازگشت','← بازگشت','بازگشت ←','natrag','← natrag','natrag ←'].includes(s);
  }
  function hideOldBackButtons(){
    document.querySelectorAll('button,a').forEach(el=>{
      if(el.classList.contains('om7-page-back')) return;
      if(el.closest('.bottom-nav')) return;
      if(isBackText(el.textContent)){
        el.setAttribute('data-om7-old-back-hidden','1');
        el.style.setProperty('display','none','important');
        el.style.setProperty('visibility','hidden','important');
        el.style.setProperty('pointer-events','none','important');
      }
    });
  }
  function ensureBackButtons(){
    document.querySelectorAll('.page').forEach(page=>{
      if(page.id==='home') return;
      let btn=page.querySelector(':scope > .om7-page-back');
      if(!btn){
        btn=document.createElement('button');
        btn.type='button';
        btn.className='om7-page-back';
        btn.setAttribute('data-om7-back','1');
        btn.addEventListener('click',function(e){e.preventDefault(); e.stopPropagation(); goBack();});
        page.insertBefore(btn,page.firstChild);
      }
      btn.textContent='← '+t('back');
    });
  }
  function refreshBackButtons(){
    hideOldBackButtons();
    ensureBackButtons();
  }
  function isStandalone(){return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true;}
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault(); deferredPrompt=e; renderInstallCard();});
  function renderInstallCard(){
    const home=document.getElementById('home');
    if(!home) return;
    document.querySelectorAll('#install-app-card-v613,#install-app-card-v593,#install-app-card-v594,.install-app-card-v613').forEach(el=>el.remove());
    let card=document.getElementById('om7-install-card');
    if(!card){
      card=document.createElement('div');
      card.id='om7-install-card';
      card.className='card om7-install-card';
      const anchor=home.querySelector('.home-feature-grid,.quick-actions,.cards-grid');
      if(anchor) home.insertBefore(card,anchor); else home.appendChild(card);
    }
    const canInstall=!!deferredPrompt && !isStandalone();
    const installed=isStandalone();
    card.innerHTML=`
      <h3>${t('installTitle')}</h3>
      <p>${t('installDesc')}</p>
      <div class="btn-row">
        ${canInstall?`<button type="button" class="btn primary" data-install-now>${t('installBtn')}</button>`:''}
        <button type="button" class="btn light" data-install-guide>${card.classList.contains('open')?t('closeGuide'):t('openGuide')}</button>
      </div>
      <div class="om7-install-details">
        ${installed?`<p><strong>${t('installed')}</strong></p>`:''}
        <h4>${t('androidTitle')}</h4><p>${t('androidText')}</p>
        <h4>${t('iosTitle')}</h4><p>${t('iosText')}</p>
        <h4>${t('huaweiTitle')}</h4><p>${t('huaweiText')}</p>
      </div>`;
    const guide=card.querySelector('[data-install-guide]');
    if(guide) guide.addEventListener('click',()=>{card.classList.toggle('open'); renderInstallCard();});
    const now=card.querySelector('[data-install-now]');
    if(now) now.addEventListener('click',async()=>{ if(!deferredPrompt) return; deferredPrompt.prompt(); try{await deferredPrompt.userChoice;}catch(e){} deferredPrompt=null; renderInstallCard(); });
  }
  function looksLikeVersionText(txt){
    const s=(txt||'').replace(/\s+/g,' ').trim();
    return /App\s*Version\s*:\s*V\d+(?:\.\d+)?/i.test(s) || /V5[0-9](?:\.\d+)?/.test(s) || /V6[0-9](?:\.\d+)?/.test(s) || /نسخه\s*اپ/i.test(s);
  }
  let fixingFooter=false;
  function fixFooter(){
    if(fixingFooter) return;
    fixingFooter=true;
    try{
      const more=document.getElementById('more') || document.body;
      // Remove old managed footers and short standalone version nodes.
      more.querySelectorAll('#mainFooter,#om7-version-footer,.footer-version').forEach(el=>{ if(el.id!=='om7-version-footer') { const parent=el.closest('.footer,#mainFooter') || el; if(parent.id!=='om7-version-footer') parent.remove(); }});
      more.querySelectorAll('p,div,span,small,strong,b').forEach(el=>{
        if(el.id==='om7-version-footer' || el.closest('#om7-version-footer')) return;
        const txt=(el.textContent||'').trim();
        if(txt && txt.length<180 && looksLikeVersionText(txt)) el.remove();
      });
      let footer=document.getElementById('om7-version-footer');
      if(!footer){
        footer=document.createElement('div');
        footer.id='om7-version-footer';
        footer.className='footer om7-footer';
        more.appendChild(footer);
      }
      footer.innerHTML=`<div class="footer-brand">© Omideno7 Church (New Hope7)</div><div class="footer-tagline">${t('tagline')}</div><div class="footer-version">${FOOTER_TEXT}</div>`;
    } finally { fixingFooter=false; }
  }
  function installClickTracking(){
    document.addEventListener('click',function(e){
      const nav=e.target.closest('.bottom-nav [data-page], .nav-btn[data-page]');
      if(nav && nav.dataset.page){ const cur=activePage(); if(nav.dataset.page!==cur) pushHistory(cur); setTimeout(()=>{refreshBackButtons(); renderInstallCard(); fixFooter();},80); return; }
      const opener=e.target.closest('[data-page],[data-open],[data-section],[onclick]');
      if(opener && !opener.classList.contains('om7-page-back') && !opener.closest('.bottom-nav')){
        const before=activePage();
        setTimeout(()=>{ const after=activePage(); if(after!==before) pushHistory(before); refreshBackButtons(); renderInstallCard(); fixFooter(); },120);
      }
    },true);
  }
  let scheduled=false;
  function scheduleAll(){
    if(scheduled) return;
    scheduled=true;
    setTimeout(()=>{scheduled=false; refreshBackButtons(); renderInstallCard(); fixFooter();},160);
  }
  function init(){
    installStyle();
    refreshBackButtons();
    renderInstallCard();
    fixFooter();
    installClickTracking();
    document.querySelectorAll('.lang-toggle button,[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{renderInstallCard(); refreshBackButtons(); fixFooter();},120)));
    const more=document.getElementById('more') || document.body;
    new MutationObserver(scheduleAll).observe(more,{childList:true,subtree:true});
    new MutationObserver(scheduleAll).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
    [250,800,1600,3000].forEach(ms=>setTimeout(()=>{refreshBackButtons(); renderInstallCard(); fixFooter();},ms));
    window.Omideno7V615Fix={version:VERSION,goBack,refresh:function(){refreshBackButtons();renderInstallCard();fixFooter();}};
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
