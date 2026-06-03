/* V63.21 — Daily Word cleanup, school Persian digits, Bible plan next button
   Built as a small, isolated patch on top of stable V63.20/V63.16. */
(function(){
  'use strict';
  const VERSION='63.21';
  const faDigitsMap={'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};
  function lang(){
    try{return localStorage.getItem('lang')||document.documentElement.lang||'en';}catch(e){return 'en';}
  }
  function toFaDigits(s){ return String(s||'').replace(/[0-9]/g,d=>faDigitsMap[d]||d); }
  function isVisible(el){ return !!(el && el.offsetParent!==null); }

  function localizeSchoolVerseDigits(){
    if(lang()!=='fa') return;
    const root=document.querySelector('#school, .school-page, [data-school-root]') || document;
    root.querySelectorAll('.school-key-refs button, .school-ref-output h4, .school-ref-output div, .school-ref-output p').forEach(el=>{
      if(!el || el.dataset.om7FaDigitsDone==='1') return;
      // Keep text content but convert only visible English digits into Persian digits.
      el.childNodes.forEach(node=>{
        if(node.nodeType===3) node.nodeValue=toFaDigits(node.nodeValue);
      });
      if(el.children.length===0) el.textContent=toFaDigits(el.textContent);
      el.dataset.om7FaDigitsDone='1';
    });
  }

  function removeDailyReadingPlans(){
    const card=document.querySelector('[data-dw-v6320]');
    if(!card) return;
    // Safety cleanup if cached/old renderer left the reading plan section behind.
    card.querySelectorAll('section').forEach(sec=>{
      const txt=(sec.textContent||'').toLowerCase();
      if(txt.includes('1-year bible reading plan') || txt.includes('2-year bible reading plan') || txt.includes('برنامه مطالعه') || txt.includes('plan čitanja')){
        sec.remove();
      }
    });
  }

  function getLabel(){
    const L=lang();
    return {
      next: L==='fa'?'روز بعد':(L==='hr'?'Sljedeći dan':'Next day'),
      done: L==='fa'?'این روز خوانده شد':(L==='hr'?'Ovaj dan je pročitan':'This day is complete')
    };
  }
  function findCurrentDay(container){
    const txt=container.textContent||'';
    const m=txt.match(/(?:Day|روز|Dan)\s*([0-9۰-۹]+)/i);
    if(!m) return null;
    const n=String(m[1]).replace(/[۰-۹]/g,ch=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(ch));
    const day=parseInt(n,10);
    return Number.isFinite(day)?day:null;
  }
  function clickNextDay(currentDay){
    const next=currentDay?currentDay+1:null;
    const candidates=[...document.querySelectorAll('button,a,[role="button"]')].filter(isVisible);
    if(next){
      const re=new RegExp('(?:Day|روز|Dan)\\s*'+next+'\\b|\\b'+next+'\\b','i');
      const target=candidates.find(el=>re.test(el.textContent||'') && !/next|بعد|sljede/i.test(el.textContent||''));
      if(target){ target.click(); return true; }
    }
    const nextBtn=candidates.find(el=>/(next|بعد|ادامه|sljedeći|sljede)/i.test(el.textContent||''));
    if(nextBtn){ nextBtn.click(); return true; }
    return false;
  }
  function installBiblePlanNextButton(){
    const root=document.getElementById('bibleReaderContent') || document.getElementById('bibleReader');
    if(!root) return;
    const txt=root.textContent||'';
    if(!/(reading plan|برنامه|خواندن|plan čitanja|day|روز|dan)/i.test(txt)) return;
    if(root.querySelector('[data-om7-plan-next]')) return;
    const currentDay=findCurrentDay(root);
    const L=getLabel();
    const wrap=document.createElement('div');
    wrap.setAttribute('data-om7-plan-next','1');
    wrap.style.cssText='margin:18px 0 90px;padding:16px;border-radius:18px;background:#fff;border:1px solid #dbe4f0;box-shadow:0 8px 20px rgba(15,23,42,.08);text-align:center;';
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='btn primary';
    btn.textContent=L.next;
    btn.style.minWidth='180px';
    btn.addEventListener('click',function(ev){
      ev.preventDefault();
      const ok=clickNextDay(currentDay);
      if(!ok){
        try{ root.scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){}
      }
    });
    wrap.appendChild(btn);
    root.appendChild(wrap);
  }

  function tick(){
    removeDailyReadingPlans();
    localizeSchoolVerseDigits();
    installBiblePlanNextButton();
  }
  function install(){
    tick();
    setTimeout(tick,300); setTimeout(tick,1000); setTimeout(tick,2500);
    document.addEventListener('click',function(){ setTimeout(tick,120); setTimeout(tick,500); },true);
    document.querySelectorAll('.lang-toggle button,[data-lang],.nav-btn').forEach(btn=>btn.addEventListener('click',()=>setTimeout(tick,300)));
    if(window.MutationObserver){
      const obs=new MutationObserver(()=>{ if(window.__om7v6321Timer) clearTimeout(window.__om7v6321Timer); window.__om7v6321Timer=setTimeout(tick,150); });
      obs.observe(document.body,{childList:true,subtree:true});
    }
    try{ window.omideno7V6321={version:VERSION,tick}; }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install); else install();
})();
