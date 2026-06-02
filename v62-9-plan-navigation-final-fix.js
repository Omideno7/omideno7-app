/* V62.9 Plans Navigation Final Fix
   Scope: Plans page navigation only.
   Fixes: Back from Fasting/Revelation path must return to the Plans list, and stale fasting selection must not pull users back into fasting from Home/Word/More/Bible. */
(function(){
  'use strict';
  const VERSION='V62.9';
  const FAST_KEYS=['selectedPlanKeyV50','selectedPlanKey'];
  const FAST_VIEW='fastingJourneyViewV50';

  function activePageId(){ const p=document.querySelector('.page.active'); return p ? p.id : 'home'; }
  function isPlansActive(){ return activePageId()==='plans'; }
  function text(el){ return ((el && el.textContent) || '').replace(/\s+/g,' ').trim().toLowerCase(); }
  function selectedPlan(){
    try { return (localStorage.getItem('selectedPlanKeyV50') || localStorage.getItem('selectedPlanKey') || '').toLowerCase(); }
    catch(e){ return ''; }
  }
  function isFastingKey(v){ return ['fastingjourney','fasting','fasting journey','مسیر روزه','roze','post'].includes(String(v||'').toLowerCase()); }
  function plansLooksLikeFasting(){
    const root=document.getElementById('plansContent') || document.getElementById('plans');
    const s=text(root);
    return s.includes('مسیر روزه') || s.includes('سفر روزه') || s.includes('fasting journey') || s.includes('دفتر مکاشفات') || s.includes('روزه‌های فعال') || s.includes('roze');
  }
  function clearSelectedPlan(){
    try{
      FAST_KEYS.forEach(k=>localStorage.removeItem(k));
      localStorage.setItem(FAST_VIEW,'home');
      sessionStorage.setItem('om7_force_plan_list_v629','1');
    }catch(e){}
  }
  function callRenderPlans(){
    try { if(typeof window.renderPlans==='function') window.renderPlans(); } catch(e){}
  }
  function showPlansList(){
    clearSelectedPlan();
    try { if(typeof window.showPage==='function' && activePageId()!=='plans') window.showPage('plans'); } catch(e){}
    [0,40,120,300,700].forEach(ms=>setTimeout(function(){ clearSelectedPlan(); callRenderPlans(); try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){window.scrollTo(0,0);} },ms));
  }
  function isBackControl(el){
    if(!el) return false;
    const id=(el.id||'').toLowerCase();
    const cls=(el.className||'').toString().toLowerCase();
    const ds=(el.getAttribute && (el.getAttribute('data-fast-view')||el.getAttribute('data-om7-back')||el.getAttribute('aria-label')||'')) || '';
    const t=text(el);
    return id.includes('back') || cls.includes('back') || ds.toLowerCase().includes('back') || ds.toLowerCase()==='home' || t.includes('بازگشت') || t.includes('back') || t.includes('natrag');
  }

  // Patch showPage: every time the user lands on Plans through nav/back, show the list, not a stale selected fasting screen.
  const oldShow=window.showPage;
  if(typeof oldShow==='function' && !window.__om7V629PlanShowPatched){
    window.__om7V629PlanShowPatched=true;
    window.showPage=function(id){
      if(id==='plans') clearSelectedPlan();
      const result=oldShow.apply(this, arguments);
      if(id==='plans') setTimeout(function(){ clearSelectedPlan(); callRenderPlans(); },80);
      return result;
    };
  }

  // Patch renderPlans only when we explicitly force the list. Selecting Fasting from the list still works normally.
  const oldRender=window.renderPlans;
  if(typeof oldRender==='function' && !window.__om7V629RenderPlansPatched){
    window.__om7V629RenderPlansPatched=true;
    window.renderPlans=function(){
      try{
        if(sessionStorage.getItem('om7_force_plan_list_v629')==='1'){
          FAST_KEYS.forEach(k=>localStorage.removeItem(k));
          localStorage.setItem(FAST_VIEW,'home');
        }
      }catch(e){}
      const result=oldRender.apply(this, arguments);
      try{ sessionStorage.removeItem('om7_force_plan_list_v629'); }catch(e){}
      return result;
    };
  }

  document.addEventListener('click', function(ev){
    const target=ev.target;
    const navPlans=target && target.closest && target.closest('.bottom-nav [data-page="plans"], .nav-btn[data-page="plans"]');
    if(navPlans){ clearSelectedPlan(); setTimeout(function(){ clearSelectedPlan(); callRenderPlans(); },120); return; }

    const control=target && target.closest && target.closest('button,a,[role="button"],.btn,.om7-page-back,#globalBackV50');
    if(!control || !isBackControl(control)) return;

    const fastingSelected=isFastingKey(selectedPlan());
    const activePlansFasting=isPlansActive() && (fastingSelected || plansLooksLikeFasting());

    if(activePlansFasting){
      ev.preventDefault(); ev.stopPropagation(); if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      showPlansList();
      return false;
    }

    // If a stale fasting plan is selected while user is on another page, clear it before old back-history code runs.
    if(fastingSelected){ clearSelectedPlan(); }
  }, true);

  function neutralizeOldFloatingBack(){
    const gb=document.getElementById('globalBackV50');
    if(gb){
      gb.style.setProperty('display','none','important');
      gb.style.setProperty('visibility','hidden','important');
      gb.style.setProperty('pointer-events','none','important');
    }
  }
  document.addEventListener('DOMContentLoaded', function(){ neutralizeOldFloatingBack(); setTimeout(neutralizeOldFloatingBack,800); });
  setInterval(function(){
    neutralizeOldFloatingBack();
    if(isPlansActive() && isFastingKey(selectedPlan()) && sessionStorage.getItem('om7_force_plan_list_v629')==='1') showPlansList();
  }, 1000);
})();
