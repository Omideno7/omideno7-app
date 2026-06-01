/* Omideno7 V59.3 - Install App Guide + stable admin app entry
   Minimal add-on. It does not alter Bible, Audio, Plans, Q&A data, or other modules.
*/
(function(){
  'use strict';
  const VERSION = 'V59.3';
  let deferredPrompt = null;

  const T = {
    fa: {
      title: 'نصب اپ روی گوشی',
      desc: 'برای دسترسی آسان، اپ کلیسای امیدنو۷ را روی صفحه اصلی گوشی خود اضافه کنید.',
      btn: 'راهنمای نصب اپ',
      installBtn: 'نصب اپ',
      installed: 'اپ روی گوشی نصب شده است.',
      modalTitle: 'نصب اپ امیدنو۷',
      androidTitle: 'اندروید / Chrome',
      androidText: 'اگر دکمه نصب فعال باشد، روی «نصب اپ» بزنید و نصب را تأیید کنید. اگر دکمه فعال نبود، از منوی سه‌نقطه Chrome گزینه Install app یا Add to Home screen را بزنید.',
      iosTitle: 'آیفون / Safari',
      iosText: 'در آیفون، نصب خودکار ممکن نیست. لینک اپ را در Safari باز کنید، دکمه Share را بزنید، سپس Add to Home Screen و بعد Add را انتخاب کنید.',
      huaweiTitle: 'هواوی و مرورگرهای دیگر',
      huaweiText: 'اگر دکمه نصب نمایش داده نشد، از منوی مرورگر گزینه Add to Home screen یا Add shortcut را انتخاب کنید.',
      close: 'بستن',
      installNow: 'نصب اکنون',
      version: 'App Version: V59.3'
    },
    en: {
      title: 'Install the App',
      desc: 'Add the Omideno7 Church app to your phone home screen for quick access.',
      btn: 'App Install Guide',
      installBtn: 'Install App',
      installed: 'The app is already installed on this device.',
      modalTitle: 'Install Omideno7 App',
      androidTitle: 'Android / Chrome',
      androidText: 'If the install button is available, tap “Install App” and confirm. If it is not available, open the Chrome three-dot menu and choose Install app or Add to Home screen.',
      iosTitle: 'iPhone / Safari',
      iosText: 'On iPhone, automatic installation is not allowed. Open the app link in Safari, tap Share, then choose Add to Home Screen, then Add.',
      huaweiTitle: 'Huawei and other browsers',
      huaweiText: 'If the install button is not shown, use your browser menu and choose Add to Home screen or Add shortcut.',
      close: 'Close',
      installNow: 'Install Now',
      version: 'App Version: V59.3'
    },
    hr: {
      title: 'Instaliraj aplikaciju',
      desc: 'Dodajte aplikaciju crkve Omideno7 na početni zaslon mobitela za brzi pristup.',
      btn: 'Upute za instalaciju',
      installBtn: 'Instaliraj aplikaciju',
      installed: 'Aplikacija je već instalirana na ovom uređaju.',
      modalTitle: 'Instalacija aplikacije Omideno7',
      androidTitle: 'Android / Chrome',
      androidText: 'Ako je gumb za instalaciju dostupan, dodirnite “Instaliraj aplikaciju” i potvrdite. Ako nije dostupan, otvorite izbornik s tri točke u Chromeu i odaberite Install app ili Add to Home screen.',
      iosTitle: 'iPhone / Safari',
      iosText: 'Na iPhoneu automatska instalacija nije dopuštena. Otvorite poveznicu aplikacije u Safariju, dodirnite Share, zatim Add to Home Screen i Add.',
      huaweiTitle: 'Huawei i drugi preglednici',
      huaweiText: 'Ako se gumb za instalaciju ne prikazuje, u izborniku preglednika odaberite Add to Home screen ili Add shortcut.',
      close: 'Zatvori',
      installNow: 'Instaliraj sada',
      version: 'App Version: V59.3'
    }
  };

  function lang(){
    const l = localStorage.getItem('lang') || document.documentElement.lang || 'fa';
    return ['fa','en','hr'].includes(l) ? l : 'fa';
  }
  function t(k){ return (T[lang()] || T.fa)[k] || T.en[k] || k; }
  function esc(v){ return String(v == null ? '' : v).replace(/[&<>'"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[s])); }
  function standalone(){ return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true; }
  function isiOS(){ return /iphone|ipad|ipod/i.test(navigator.userAgent || ''); }
  function isAndroid(){ return /android/i.test(navigator.userAgent || ''); }

  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    deferredPrompt = e;
    updateText();
  });

  function addStyles(){
    if(document.getElementById('installGuideStyles')) return;
    const s = document.createElement('style');
    s.id = 'installGuideStyles';
    s.textContent = `
      #installHomeCard .install-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem}
      .install-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.48);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px}
      .install-modal{max-width:620px;width:100%;background:#fff;border-radius:22px;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.25);direction:inherit}
      .install-modal h2{margin:.25rem 0 1rem;font-size:1.35rem}
      .install-step{border:1px solid rgba(15,80,60,.12);border-radius:16px;padding:12px;margin:.65rem 0;background:#f8fbfa}
      .install-step h3{margin:0 0 .35rem;font-size:1rem;color:#0f5132}
      .install-step p{margin:0;line-height:1.65}
      .install-modal-actions{display:flex;gap:.6rem;flex-wrap:wrap;justify-content:flex-end;margin-top:1rem}
      .install-muted{opacity:.78;font-size:.95rem}
    `;
    document.head.appendChild(s);
  }

  function injectInstallCard(){
    addStyles();
    const homeGrid = document.querySelector('#home .home-feature-grid');
    if(!homeGrid) return;
    if(document.getElementById('installHomeCard')) { updateText(); return; }
    const card = document.createElement('div');
    card.className = 'card feature-card';
    card.id = 'installHomeCard';
    card.innerHTML = `
      <h3 class="install-title"></h3>
      <p class="install-desc"></p>
      <p class="install-muted" id="installStateText" style="display:none"></p>
      <div class="install-actions">
        <button class="btn primary" id="installPromptBtn" type="button"></button>
        <button class="btn secondary" id="installGuideBtn" type="button"></button>
      </div>`;
    homeGrid.appendChild(card);
    document.getElementById('installPromptBtn')?.addEventListener('click', runInstallPrompt);
    document.getElementById('installGuideBtn')?.addEventListener('click', showInstallGuide);
    updateText();
  }

  function updateText(){
    document.querySelectorAll('.install-title').forEach(el => el.textContent = t('title'));
    document.querySelectorAll('.install-desc').forEach(el => el.textContent = t('desc'));
    const promptBtn = document.getElementById('installPromptBtn');
    const guideBtn = document.getElementById('installGuideBtn');
    const state = document.getElementById('installStateText');
    if(promptBtn) {
      promptBtn.textContent = t('installBtn');
      promptBtn.style.display = (!standalone() && deferredPrompt) ? '' : 'none';
    }
    if(guideBtn) guideBtn.textContent = t('btn');
    if(state){
      state.style.display = standalone() ? '' : 'none';
      state.textContent = t('installed');
    }
    fixVersionFooter();
  }

  async function runInstallPrompt(){
    if(!deferredPrompt){ showInstallGuide(); return; }
    try{
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      updateText();
    }catch(e){ console.warn('Install prompt failed', e); showInstallGuide(); }
  }

  function showInstallGuide(){
    document.querySelector('.install-modal-backdrop')?.remove();
    const modal = document.createElement('div');
    modal.className = 'install-modal-backdrop';
    modal.innerHTML = `
      <div class="install-modal" role="dialog" aria-modal="true">
        <h2>${esc(t('modalTitle'))}</h2>
        ${deferredPrompt ? `<div class="install-step"><h3>${esc(t('installNow'))}</h3><p>${esc(t('androidText'))}</p></div>` : ''}
        <div class="install-step"><h3>${esc(t('androidTitle'))}</h3><p>${esc(t('androidText'))}</p></div>
        <div class="install-step"><h3>${esc(t('iosTitle'))}</h3><p>${esc(t('iosText'))}</p></div>
        <div class="install-step"><h3>${esc(t('huaweiTitle'))}</h3><p>${esc(t('huaweiText'))}</p></div>
        <div class="install-modal-actions">
          ${deferredPrompt ? `<button class="btn primary" id="installModalPrompt">${esc(t('installNow'))}</button>` : ''}
          <button class="btn secondary" id="installModalClose">${esc(t('close'))}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    document.getElementById('installModalClose')?.addEventListener('click', () => modal.remove());
    document.getElementById('installModalPrompt')?.addEventListener('click', async () => { modal.remove(); await runInstallPrompt(); });
    modal.addEventListener('click', e => { if(e.target === modal) modal.remove(); });
  }

  function fixVersionFooter(){
    const versionText = t('version');
    const candidates = Array.from(document.querySelectorAll('footer, .footer, [class*="version"], [id*="version"]'));
    let found = false;
    candidates.forEach(el => {
      if(/App Version|نسخه|Verzija/i.test(el.textContent || '')){
        if(!found){ el.textContent = versionText; found = true; }
        else if(/App Version/i.test(el.textContent||'')){ el.remove(); }
      }
    });
  }

  function tick(){
    injectInstallCard();
    updateText();
  }

  document.addEventListener('DOMContentLoaded', tick);
  window.addEventListener('load', tick);
  setTimeout(tick, 800);
  setTimeout(tick, 2200);
  new MutationObserver(() => { try{ tick(); }catch(e){} }).observe(document.documentElement, {subtree:true, childList:true});
})();
