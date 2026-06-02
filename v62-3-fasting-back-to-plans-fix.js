/* V62.3 Fasting Journey Back Fix — scope: plans/fasting navigation only */
(function(){
  const LS_SELECTED='selectedTeachingPlanV50';
  const LS_VIEW='fastingJourneyViewV50';
  function showPlansList(){
    try{ localStorage.setItem(LS_SELECTED,''); localStorage.setItem(LS_VIEW,'home'); }catch(e){}
    if(typeof window.showPage==='function') window.showPage('plans');
    if(typeof window.renderPlans==='function') setTimeout(()=>window.renderPlans(),60);
  }
  function isFastingContext(){
    const active=document.querySelector('.page.active');
    if(active && active.id==='plans'){
      const txt=(active.textContent||'').toLowerCase();
      return txt.includes('fasting') || txt.includes('روزه') || txt.includes('post');
    }
    return false;
  }
  document.addEventListener('click', function(ev){
    const btn=ev.target && ev.target.closest && ev.target.closest('button,a');
    if(!btn) return;
    const id=(btn.id||'').toLowerCase();
    const txt=(btn.textContent||'').trim().toLowerCase();
    const fastView=(btn.getAttribute('data-fast-view')||'').toLowerCase();
    const isBack = id.includes('fastbackplans') || id.includes('backtoplans') || fastView==='home' || txt==='بازگشت' || txt.includes('back') || txt.includes('natrag');
    if(isBack && isFastingContext()){
      const selected=(localStorage.getItem(LS_SELECTED)||'').toLowerCase();
      if(selected==='fastingjourney' || selected==='fasting' || (document.querySelector('#plans')||{}).textContent?.toLowerCase().includes('روزه')){
        ev.preventDefault(); ev.stopPropagation();
        showPlansList();
      }
    }
  }, true);
})();
