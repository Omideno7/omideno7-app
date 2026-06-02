(function(){
  'use strict';
  const VERSION='V61.3';
  const I18N={
    fa:{title:'نصب اپ روی گوشی',desc:'برای دسترسی آسان، اپ کلیسای امیدنو۷ را روی صفحه اصلی گوشی خود اضافه کنید.',installed:'اپ قبلاً روی دستگاه شما نصب شده است.',android:'اگر گوشی شما اجازه بدهد، روی دکمه نصب بزنید.',ios:'در آیفون: دکمه Share را بزنید، سپس Add to Home Screen و بعد Add را انتخاب کنید.',other:'در مرورگر خود گزینه Add to Home Screen یا Add shortcut را انتخاب کنید.',btn:'نصب اپ',guide:'راهنمای نصب'},
    en:{title:'Install the App',desc:'Add the Omideno7 Church app to your phone Home Screen for easy access.',installed:'The app is already installed on this device.',android:'If your phone supports it, tap the install button.',ios:'On iPhone: tap Share, then Add to Home Screen, then Add.',other:'In your browser, choose Add to Home Screen or Add shortcut.',btn:'Install App',guide:'Installation Guide'},
    hr:{title:'Instaliraj aplikaciju',desc:'Dodajte aplikaciju Crkve Omideno7 na početni zaslon telefona za lakši pristup.',installed:'Aplikacija je već instalirana na ovom uređaju.',android:'Ako vaš telefon podržava instalaciju, dodirnite gumb za instalaciju.',ios:'Na iPhoneu: dodirnite Share, zatim Add to Home Screen, zatim Add.',other:'U pregledniku odaberite Add to Home Screen ili Add shortcut.',btn:'Instaliraj aplikaciju',guide:'Upute za instalaciju'}
  };
  let deferredPrompt=null;
  let applyingBack=false;
  const navStack=[];
  function lang(){
    const v=localStorage.getItem('lang') || document.documentElement.lang || (document.body.classList.contains('en')?'en':document.body.classList.contains('hr')?'hr':'fa');
    return ['fa','en','hr'].includes(v)?v:'fa';
  }
  function tr(key){ return (I18N[lang()]||I18N.fa)[key] || I18N.en[key] || key; }
  function isStandalone(){ return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true; }
  window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); deferredPrompt=e; renderInstallCard(); });
  function deviceLine(){
    if(isStandalone()) return tr('installed');
    const ua=navigator.userAgent||'';
    if(/iPad|iPhone|iPod/.test(ua)) return tr('ios');
    if(/Android|Huawei|HUAWEI|Harmony/i.test(ua)) return deferredPrompt ? tr('android') : tr('other');
    return tr('other');
  }
  function renderInstallCard(){
    const home=document.getElementById('home');
    if(!home) return;
    let card=document.getElementById('install-app-card-v613');
    if(!card){
      card=document.createElement('div');
      card.id='install-app-card-v613';
      card.className='card install-app-card-v613';
      const grid=home.querySelector('.home-feature-grid');
      if(grid) home.insertBefore(card, grid); else home.appendChild(card);
    }
    const canPrompt=!!deferredPrompt && !isStandalone();
    card.innerHTML=`
      <h3>${tr('title')}</h3>
      <p>${tr('desc')}</p>
      <p class="small">${deviceLine()}</p>
      <div class="btn-row">
        <button type="button" class="btn ${canPrompt?'primary':'light'}" id="installAppBtnV613">${canPrompt?tr('btn'):tr('guide')}</button>
      </div>`;
    const btn=card.querySelector('#installAppBtnV613');
    if(btn){
      btn.addEventListener('click', async function(){
        if(deferredPrompt){
          deferredPrompt.prompt();
          try{ await deferredPrompt.userChoice; }catch(e){}
          deferredPrompt=null;
          renderInstallCard();
        }else{
          alert(deviceLine());
        }
      });
    }
  }
  function injectStyles(){
    if(document.getElementById('v613-back-install-style')) return;
    const st=document.createElement('style');
    st.id='v613-back-install-style';
    st.textContent=`
      .global-back,.global-back-btn,.floating-back,.floating-back-btn,#globalBack,#globalBackButton,[data-global-back]{display:none!important;visibility:hidden!important;pointer-events:none!important;}
      .install-app-card-v613{border-top:5px solid var(--green, #00b91f);}
      .install-app-card-v613 .small{opacity:.85;}
    `;
    document.head.appendChild(st);
  }
  function activePage(){ const p=document.querySelector('.page.active'); return p ? p.id : 'home'; }
  function openPage(id){
    if(!id) id='home';
    if(typeof window.showPage==='function'){
      applyingBack=true;
      try{ window.showPage(id); } finally { setTimeout(()=>{applyingBack=false;},50); }
      return;
    }
    applyingBack=true;
    document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active', p.id===id));
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.page===id));
    window.scrollTo({top:0,behavior:'smooth'});
    setTimeout(()=>{applyingBack=false;},50);
  }
  function pushCurrent(){
    const cur=activePage();
    if(cur && cur!=='home' && navStack[navStack.length-1]!==cur) navStack.push(cur);
  }
  function goBack(){
    let target=navStack.pop();
    const current=activePage();
    while(target && target===current) target=navStack.pop();
    openPage(target || 'home');
  }
  function isBackText(txt){
    const t=(txt||'').trim().toLowerCase();
    return t==='back' || t==='← back' || t==='back ←' || t==='بازگشت' || t==='← بازگشت' || t==='بازگشت ←' || t==='natrag' || t==='← natrag';
  }
  function isFloatingBack(el){
    const cs=getComputedStyle(el);
    const txt=(el.textContent||'').trim();
    if(!isBackText(txt)) return false;
    if(cs.position==='fixed' || cs.position==='sticky') return true;
    const r=el.getBoundingClientRect();
    const bg=cs.backgroundColor||'';
    const dark=/rgb\((\s*0|\s*[1-4]?\d|\s*5\d),/.test(bg) || bg.includes('6, 20, 109') || bg.includes('10, 30, 90');
    return dark && r.bottom > window.innerHeight-180 && r.left < 280;
  }
  function hideFloatingBackButtons(){
    document.querySelectorAll('button,a,div').forEach(el=>{
      if(isFloatingBack(el)){
        el.setAttribute('data-v613-hidden-floating-back','1');
        el.style.setProperty('display','none','important');
        el.style.setProperty('visibility','hidden','important');
        el.style.setProperty('pointer-events','none','important');
      }
    });
  }
  function installNavigationListeners(){
    document.addEventListener('click', function(ev){
      const target=ev.target.closest('button,a,[data-open],[data-page],[data-open-bible-home]');
      if(!target) return;
      if(target.closest('.bottom-nav')) { const cur=activePage(); if(target.dataset.page && target.dataset.page!==cur) navStack.push(cur); return; }
      const txt=(target.textContent||'').trim();
      const explicitBack=target.matches('[data-back],[data-go-back],.back-btn,.back-button') || isBackText(txt);
      if(explicitBack && !isFloatingBack(target)){
        ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation();
        goBack();
        return;
      }
      if(target.dataset.open || target.dataset.page || target.dataset.openBibleHome){
        const cur=activePage();
        if(cur && navStack[navStack.length-1]!==cur) navStack.push(cur);
      }
    }, true);
  }
  function watchLanguage(){
    document.querySelectorAll('.lang-toggle button').forEach(btn=>btn.addEventListener('click',()=>setTimeout(renderInstallCard,80)));
  }
  let moScheduled=false;
  function scheduleMaintenance(){
    if(moScheduled) return;
    moScheduled=true;
    requestAnimationFrame(()=>{ moScheduled=false; hideFloatingBackButtons(); renderInstallCard(); });
  }
  function init(){
    injectStyles();
    renderInstallCard();
    hideFloatingBackButtons();
    installNavigationListeners();
    watchLanguage();
    const mo=new MutationObserver(scheduleMaintenance);
    mo.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
    window.Omideno7BackInstallFix={version:VERSION, goBack, renderInstallCard};
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
