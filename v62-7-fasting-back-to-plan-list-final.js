/* V62.7 Fasting Back Button Final Fix
   Scope: only Plans > Fasting Journey navigation.
   Goal: any Back button inside the fasting plan returns directly to the Plans list,
   not to the top/home screen of the fasting journey and not to the app Home page. */
(function(){
  'use strict';

  const LS_SELECTED = 'selectedTeachingPlanV50';
  const LS_VIEW = 'fastingJourneyViewV50';

  function activePlansPage(){
    const page = document.querySelector('.page.active');
    return !!(page && page.id === 'plans');
  }

  function txt(el){ return ((el && el.textContent) || '').trim().toLowerCase(); }
  function attr(el, name){ return ((el && el.getAttribute && el.getAttribute(name)) || '').trim().toLowerCase(); }

  function isFastingSelectedOrVisible(){
    let selected = '';
    try { selected = (localStorage.getItem(LS_SELECTED) || '').toLowerCase(); } catch(e) {}
    if(selected === 'fastingjourney' || selected === 'fasting') return true;

    const plans = document.getElementById('plans');
    const body = txt(plans);
    return body.includes('مسیر روزه') || body.includes('سفر روزه') || body.includes('fasting journey') || body.includes('post') || body.includes('roze');
  }

  function isBackControl(el){
    if(!el) return false;
    const id = (el.id || '').toLowerCase();
    const cls = (el.className || '').toString().toLowerCase();
    const t = txt(el);
    const fastView = attr(el, 'data-fast-view');
    const aria = attr(el, 'aria-label');

    if(id === 'globalbackv50') return true;
    if(id.includes('back') || id.includes('بازگشت')) return true;
    if(cls.includes('back')) return true;
    if(fastView === 'home' || fastView === 'back') return true;
    if(t === 'بازگشت' || t.includes('بازگشت')) return true;
    if(t.includes('back') || t.includes('natrag')) return true;
    if(aria.includes('back') || aria.includes('بازگشت') || aria.includes('natrag')) return true;
    return false;
  }

  function returnToPlansList(){
    try {
      localStorage.setItem(LS_SELECTED, '');
      localStorage.setItem(LS_VIEW, 'home');
    } catch(e) {}

    if(typeof window.showPage === 'function') {
      try { window.showPage('plans'); } catch(e) {}
    }

    if(typeof window.renderPlans === 'function') {
      setTimeout(function(){
        try { window.renderPlans(); } catch(e) {}
        try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) { window.scrollTo(0,0); }
      }, 20);
    }
  }

  // Capture early and stop original fasting/global back handlers from taking the user
  // to the fasting home screen or the app home page.
  document.addEventListener('click', function(ev){
    if(!activePlansPage() || !isFastingSelectedOrVisible()) return;
    const control = ev.target && ev.target.closest && ev.target.closest('button,a,[role="button"],.btn');
    if(!isBackControl(control)) return;

    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    returnToPlansList();
  }, true);

  // Also protect against keyboard activation on focused Back buttons.
  document.addEventListener('keydown', function(ev){
    if(ev.key !== 'Enter' && ev.key !== ' ') return;
    if(!activePlansPage() || !isFastingSelectedOrVisible()) return;
    const control = document.activeElement;
    if(!isBackControl(control)) return;

    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    returnToPlansList();
  }, true);
})();
