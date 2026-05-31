/* Omideno7 V56.3 — Plans header language hotfix
   Fixes the small hero/header text inside Plans so it follows the selected app language.
   Keeps all other app sections untouched. */
(function(){
  'use strict';
  function getLang(){
    return localStorage.getItem('lang') || document.documentElement.lang || (document.body.classList.contains('hr')?'hr':document.body.classList.contains('en')?'en':'fa');
  }
  const text={
    fa:{selectPlan:'انتخاب پلن', plansDesc:'پلن‌ها و مسیرهای تعلیمی برای رشد روزانه.', version:'V56.3'},
    en:{selectPlan:'Choose a Plan', plansDesc:'Teaching plans and guided journeys for daily growth.', version:'V56.3'},
    hr:{selectPlan:'Odaberi plan', plansDesc:'Planovi i vođena učenja za svakodnevni rast.', version:'V56.3'}
  };
  function applyPlansHeaderLanguage(){
    const plans=document.getElementById('plans');
    const root=document.getElementById('plansContent');
    if(!plans || !root) return;
    const l=getLang();
    const d=text[l]||text.fa;
    // Fix the top hero card only when the plan list is visible.
    const hero=root.querySelector('.hero-card');
    if(hero){
      const h1=hero.querySelector('h1');
      const p=hero.querySelector('p');
      if(h1 && /انتخاب پلن|Choose a Plan|Odaberi plan/i.test((h1.textContent||'').trim())) h1.textContent=d.selectPlan;
      if(p && /پلن|Teaching plans|Planovi/i.test((p.textContent||'').trim())) p.textContent=d.plansDesc;
    }
    // Also fix any accidentally rendered Persian header text in the Plans page.
    root.querySelectorAll('h1,h2,h3,p').forEach(el=>{
      const s=(el.textContent||'').trim();
      if(s==='انتخاب پلن') el.textContent=d.selectPlan;
      if(s==='پلن‌ها و مسیرهای تعلیمی برای رشد روزانه.') el.textContent=d.plansDesc;
    });
  }
  const previous=window.renderPlans;
  if(typeof previous==='function'){
    window.renderPlans=function(){
      const out=previous.apply(this,arguments);
      setTimeout(applyPlansHeaderLanguage,0);
      setTimeout(applyPlansHeaderLanguage,80);
      return out;
    };
  }
  document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(applyPlansHeaderLanguage,200);
    document.querySelectorAll('.lang-toggle button,[data-lang]').forEach(btn=>{
      btn.addEventListener('click',()=>setTimeout(applyPlansHeaderLanguage,180));
    });
    document.querySelectorAll('[data-page="plans"],.nav-btn').forEach(btn=>{
      btn.addEventListener('click',()=>setTimeout(applyPlansHeaderLanguage,180));
    });
  });
})();
