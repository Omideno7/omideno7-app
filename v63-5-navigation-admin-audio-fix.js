/* V63.5 Navigation + School Admin Link + Audio Storage Hotfix
   Scope: Back button behavior and direct admin/school link support only.
*/
(function(){
  'use strict';
  const VERSION='V63.5';
  const STACK_KEY='om7_page_stack_v635';
  let suppress=false;
  function activePage(){ const p=document.querySelector('main .page.active, .page.active'); return p ? p.id : 'home'; }
  function stack(){ try{return JSON.parse(sessionStorage.getItem(STACK_KEY)||'[]')||[]}catch(e){return[]} }
  function saveStack(s){ try{sessionStorage.setItem(STACK_KEY,JSON.stringify(s.slice(-12)))}catch(e){} }
  function pushPage(id){ if(!id) return; const cur=activePage(); if(id===cur) return; const s=stack(); if(s[s.length-1]!==cur) s.push(cur); saveStack(s); }
  function showPageSafe(id){
    suppress=true;
    try{
      if(id==='school'){
        const b=document.querySelector('.bottom-nav [data-page="school"], [data-page="school"]');
        if(b) b.click();
        else manualShow(id);
      } else if(typeof window.showPage==='function') window.showPage(id);
      else manualShow(id);
    } finally { setTimeout(()=>{suppress=false;},80); }
  }
  function manualShow(id){
    document.querySelectorAll('main .page, .page').forEach(p=>p.classList.toggle('active',p.id===id));
    document.querySelectorAll('.bottom-nav .nav-btn').forEach(b=>b.classList.toggle('active',b.getAttribute('data-page')===id));
    try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){window.scrollTo(0,0);}
  }
  function isBackControl(el){
    if(!el) return false;
    const t=((el.textContent||'')+' '+(el.id||'')+' '+(el.className||'')+' '+(el.getAttribute?.('aria-label')||'')+' '+(el.getAttribute?.('data-om7-back')||'')).toLowerCase();
    return t.includes('بازگشت') || t.includes('back') || t.includes('natrag') || t.includes('برگشت') || (el.id||'').toLowerCase().includes('back');
  }
  function handleSchoolBack(){
    if(activePage()!=='school') return false;
    const lessonBack=document.getElementById('backToLessons');
    if(lessonBack){ lessonBack.click(); return true; }
    const activeTab=document.querySelector('#school .school-tab.active');
    if(activeTab && activeTab.getAttribute('data-school-view')!=='dashboard'){
      const dash=document.querySelector('#school .school-tab[data-school-view="dashboard"]');
      if(dash){ dash.click(); return true; }
    }
    return false;
  }
  function patchShowPage(){
    if(typeof window.showPage==='function' && !window.__om7V635ShowPagePatched){
      const old=window.showPage;
      window.__om7V635ShowPagePatched=true;
      window.showPage=function(id){
        if(!suppress && id && id!==activePage()) pushPage(id);
        return old.apply(this,arguments);
      };
    }
  }
  document.addEventListener('click',function(ev){
    const target=ev.target;
    const nav=target?.closest?.('.bottom-nav [data-page], .nav-btn[data-page]');
    if(nav && !suppress){ const id=nav.getAttribute('data-page'); if(id && id!==activePage()) pushPage(id); return; }
    const opener=target?.closest?.('[data-open],[data-open-bible-home],[data-page-target]');
    if(opener && !suppress){ const id=opener.getAttribute('data-open')||opener.getAttribute('data-page-target')||''; if(id && id!==activePage()) pushPage(id); return; }
    const control=target?.closest?.('button,a,[role="button"],.btn,.school-btn,#globalBackV50');
    if(!control || !isBackControl(control)) return;
    if(handleSchoolBack()){ ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation?.(); return false; }
    const cur=activePage();
    const s=stack();
    const prev=s.pop(); saveStack(s);
    if(prev && prev!==cur){ ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation?.(); showPageSafe(prev); return false; }
    if(cur && cur!=='home'){ ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation?.(); showPageSafe('home'); return false; }
  },true);
  function openAdminIfRequested(){
    let want=false; try{const q=new URLSearchParams(location.search); want=q.get('school_admin')==='1'||q.get('admin')==='school'||location.hash==='#school-admin';}catch(e){}
    if(!want) return;
    const schoolBtn=document.querySelector('.bottom-nav [data-page="school"], [data-page="school"]');
    if(schoolBtn && activePage()!=='school') schoolBtn.click();
    [500,1200,2200,3500].forEach(ms=>setTimeout(()=>{
      const adminTab=document.querySelector('#school .school-tab[data-school-view="admin"]');
      if(adminTab) adminTab.click();
    },ms));
  }
  document.addEventListener('DOMContentLoaded',function(){ patchShowPage(); openAdminIfRequested(); });
  window.addEventListener('load',function(){ patchShowPage(); openAdminIfRequested(); });
  setInterval(patchShowPage,700);
})();
