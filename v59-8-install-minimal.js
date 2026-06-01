/* Omideno7 V59.8 - Minimal Install Guide
   Purpose: add install guide card only. No version label writes. No observers. No intervals.
*/
(function(){
  'use strict';
  let deferredPrompt = null;
  const T = {
    fa:{title:'نصب اپ روی گوشی',desc:'برای دسترسی آسان، اپ کلیسای امیدنو۷ را روی صفحه اصلی گوشی خود اضافه کنید.',guide:'راهنمای نصب',install:'نصب اپ',modal:'راهنمای نصب اپ امیدنو۷',android:'اندروید / Chrome',androidText:'اگر دکمه نصب فعال باشد، روی «نصب اپ» بزنید و نصب را تأیید کنید. اگر فعال نبود، از منوی سه‌نقطه Chrome گزینه Install app یا Add to Home screen را بزنید.',ios:'آیفون / Safari',iosText:'در آیفون، لینک اپ را در Safari باز کنید، دکمه Share را بزنید، سپس Add to Home Screen و بعد Add را انتخاب کنید.',other:'هواوی و مرورگرهای دیگر',otherText:'از منوی مرورگر گزینه Add to Home screen یا Add shortcut را انتخاب کنید.',close:'بستن'},
    en:{title:'Install the App',desc:'Add the Omideno7 Church app to your phone home screen for quick access.',guide:'Install Guide',install:'Install App',modal:'Install Omideno7 App',android:'Android / Chrome',androidText:'If the install button is available, tap “Install App” and confirm. If it is not available, open the Chrome three-dot menu and choose Install app or Add to Home screen.',ios:'iPhone / Safari',iosText:'On iPhone, open the app link in Safari, tap Share, then choose Add to Home Screen and Add.',other:'Huawei and other browsers',otherText:'Use your browser menu and choose Add to Home screen or Add shortcut.',close:'Close'},
    hr:{title:'Instaliraj aplikaciju',desc:'Dodajte aplikaciju crkve Omideno7 na početni zaslon mobitela za brzi pristup.',guide:'Upute za instalaciju',install:'Instaliraj aplikaciju',modal:'Instalacija aplikacije Omideno7',android:'Android / Chrome',androidText:'Ako je gumb za instalaciju dostupan, dodirnite “Instaliraj aplikaciju” i potvrdite. Ako nije dostupan, otvorite izbornik s tri točke u Chromeu i odaberite Install app ili Add to Home screen.',ios:'iPhone / Safari',iosText:'Na iPhoneu otvorite poveznicu aplikacije u Safariju, dodirnite Share, zatim Add to Home Screen i Add.',other:'Huawei i drugi preglednici',otherText:'U izborniku preglednika odaberite Add to Home screen ili Add shortcut.',close:'Zatvori'}
  };
  function lang(){ const l=localStorage.getItem('lang')||document.documentElement.lang||'fa'; return ['fa','en','hr'].includes(l)?l:'fa'; }
  function tr(k){ return (T[lang()]||T.fa)[k]||k; }
  function esc(s){ return String(s||'').replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function style(){ if(document.getElementById('installMinimalStyle')) return; const s=document.createElement('style'); s.id='installMinimalStyle'; s.textContent='.install-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px}.install-modal{max-width:620px;width:100%;background:#fff;border-radius:22px;padding:18px;box-shadow:0 18px 55px rgba(0,0,0,.25)}.install-step{border:1px solid rgba(0,0,0,.08);border-radius:14px;padding:12px;margin:.65rem 0;background:#f8fbfa}.install-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem}'; document.head.appendChild(s); }
  function render(){
    const grid=document.querySelector('#home .home-feature-grid');
    if(!grid) return;
    style();
    let card=document.getElementById('installHomeCard');
    if(!card){
      card=document.createElement('div'); card.className='card feature-card'; card.id='installHomeCard';
      card.innerHTML='<h3 data-i="title"></h3><p data-i="desc"></p><div class="install-actions"><button class="btn primary" id="installNowBtn" type="button"></button><button class="btn secondary" id="installGuideBtn" type="button"></button></div>';
      grid.appendChild(card);
      card.querySelector('#installNowBtn').addEventListener('click', async()=>{ if(deferredPrompt){ deferredPrompt.prompt(); try{ await deferredPrompt.userChoice; }catch(e){} deferredPrompt=null; render(); } else showGuide(); });
      card.querySelector('#installGuideBtn').addEventListener('click', showGuide);
    }
    card.querySelector('[data-i="title"]').textContent=tr('title');
    card.querySelector('[data-i="desc"]').textContent=tr('desc');
    const installBtn=card.querySelector('#installNowBtn');
    installBtn.textContent=tr('install');
    installBtn.style.display=deferredPrompt?'':'none';
    card.querySelector('#installGuideBtn').textContent=tr('guide');
  }
  function showGuide(){
    document.querySelector('.install-modal-backdrop')?.remove();
    const m=document.createElement('div'); m.className='install-modal-backdrop';
    m.innerHTML='<div class="install-modal"><h2>'+esc(tr('modal'))+'</h2><div class="install-step"><h3>'+esc(tr('android'))+'</h3><p>'+esc(tr('androidText'))+'</p></div><div class="install-step"><h3>'+esc(tr('ios'))+'</h3><p>'+esc(tr('iosText'))+'</p></div><div class="install-step"><h3>'+esc(tr('other'))+'</h3><p>'+esc(tr('otherText'))+'</p></div><div style="text-align:end;margin-top:1rem"><button class="btn secondary" id="installCloseBtn">'+esc(tr('close'))+'</button></div></div>';
    document.body.appendChild(m);
    m.querySelector('#installCloseBtn').addEventListener('click',()=>m.remove());
    m.addEventListener('click',e=>{ if(e.target===m) m.remove(); });
  }
  window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); deferredPrompt=e; render(); });
  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('load', render);
  document.addEventListener('click', e=>{ if(e.target.closest('[data-lang]')) setTimeout(render,150); });
})();
