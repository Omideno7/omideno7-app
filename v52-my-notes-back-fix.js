(function(){
  'use strict';
  const d=document;
  const $=(id)=>d.getElementById(id);
  const lang=()=>localStorage.getItem('lang') || d.documentElement.lang || 'fa';
  const isFa=()=>lang()==='fa';
  const L={
    fa:{savedTitle:'آیات من',savedDesc:'آیات ستاره‌دار و هایلایت‌شده شما در اینجا نمایش داده می‌شود.',openSaved:'مشاهده آیات من',notesTitle:'یادداشت‌های من',notesDesc:'همه یادداشت‌های شما از کتاب‌مقدس، شکرگزاری، روزه و پیام‌های صوتی در یکجا.',openNotes:'مشاهده یادداشت‌ها',emptySaved:'هنوز آیه‌ای ستاره‌دار یا هایلایت نشده است.',emptyNotes:'هنوز یادداشتی ثبت نشده است.',highlight:'هایلایت',bookmark:'ستاره‌دار',note:'یادداشت',openVerse:'باز کردن آیه',source:'بخش',date:'تاریخ',back:'بازگشت',bible:'کتاب‌مقدس',thanksgiving:'دوره شکرگزاری',fasting:'مسیر روزه',audio:'پیام صوتی',savedCount:'تعداد آیات ذخیره‌شده',notesCount:'تعداد یادداشت‌ها'},
    en:{savedTitle:'My Verses',savedDesc:'Your bookmarked and highlighted verses are shown here.',openSaved:'Open My Verses',notesTitle:'My Notes',notesDesc:'All your notes from the Bible, Thanksgiving, Fasting Journey, and audio messages in one place.',openNotes:'Open My Notes',emptySaved:'No bookmarked or highlighted verses yet.',emptyNotes:'No notes have been saved yet.',highlight:'Highlight',bookmark:'Bookmarked',note:'Note',openVerse:'Open verse',source:'Source',date:'Date',back:'Back',bible:'Bible',thanksgiving:'Thanksgiving Course',fasting:'Fasting Journey',audio:'Audio Message',savedCount:'Saved verses',notesCount:'Notes'},
    hr:{savedTitle:'Moji stihovi',savedDesc:'Ovdje se prikazuju označeni i istaknuti stihovi.',openSaved:'Otvori moje stihove',notesTitle:'Moje bilješke',notesDesc:'Sve bilješke iz Biblije, zahvaljivanja, posta i audio poruka na jednom mjestu.',openNotes:'Otvori moje bilješke',emptySaved:'Još nema označenih ili istaknutih stihova.',emptyNotes:'Još nema spremljenih bilješki.',highlight:'Istaknuto',bookmark:'Označeno',note:'Bilješka',openVerse:'Otvori stih',source:'Izvor',date:'Datum',back:'Natrag',bible:'Biblija',thanksgiving:'Tečaj zahvaljivanja',fasting:'Put posta',audio:'Audio poruka',savedCount:'Spremljeni stihovi',notesCount:'Bilješke'}
  };
  function T(k){return (L[lang()]&&L[lang()][k])||L.en[k]||k;}
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
  function faDigits(x){return isFa()?String(x).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]):String(x);}
  function injectStyle(){
    if($('v52Style')) return;
    const st=d.createElement('style'); st.id='v52Style'; st.textContent=`
      .v52-home-card{border-top:5px solid var(--gold,#D4A72C)}
      .v52-list-card{background:#fff;border:1px solid var(--line,#E5E7EB);border-radius:20px;padding:15px;margin:12px 0;box-shadow:0 6px 18px rgba(16,24,40,.05)}
      .v52-meta{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.v52-badge{background:#F7FFF8;border:1px solid #CFEAD4;border-radius:999px;padding:5px 9px;font-size:12px;font-weight:850;color:#134E1B}
      .v52-note-text,.v52-verse-text{line-height:1.9;background:#FAFBFF;border:1px solid var(--line,#E5E7EB);border-radius:16px;padding:12px;margin:10px 0;white-space:pre-line}
      .global-app-back-v50{display:none!important}.global-app-back-v52{position:fixed;top:10px;inset-inline-start:10px;z-index:10000;border:0;border-radius:999px;padding:9px 13px;background:rgba(16,34,63,.94);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.22);font:inherit;display:none}.global-app-back-v52.show{display:block}.bottom-nav~.global-app-back-v52{bottom:80px;top:auto}
    `; d.head.appendChild(st);
  }
  function ensurePages(){
    const main=d.querySelector('main'); if(!main) return;
    if(!$('savedVerses')){ const sec=d.createElement('section'); sec.id='savedVerses'; sec.className='page'; sec.innerHTML='<div id="savedVersesContent"></div>'; main.appendChild(sec); }
    if(!$('myNotes')){ const sec=d.createElement('section'); sec.id='myNotes'; sec.className='page'; sec.innerHTML='<div id="myNotesContent"></div>'; main.appendChild(sec); }
  }
  function addHomeCards(){
    const grid=d.querySelector('.home-feature-grid'); if(!grid || grid.dataset.v52Cards==='1') return;
    const saved=d.createElement('div'); saved.className='card feature-card v52-home-card'; saved.innerHTML=`<h3>${T('savedTitle')}</h3><p>${T('savedDesc')}</p><button class="btn gold" type="button" data-open-v52="savedVerses">${T('openSaved')}</button>`;
    const notes=d.createElement('div'); notes.className='card feature-card v52-home-card'; notes.innerHTML=`<h3>${T('notesTitle')}</h3><p>${T('notesDesc')}</p><button class="btn secondary" type="button" data-open-v52="myNotes">${T('openNotes')}</button>`;
    grid.appendChild(saved); grid.appendChild(notes); grid.dataset.v52Cards='1';
    grid.querySelectorAll('[data-open-v52]').forEach(b=>b.addEventListener('click',()=>window.showPage?window.showPage(b.dataset.openV52):null));
  }
  function bookObj(bookId){ const data=window.bibleReaderData||{}; return (data.books||[]).find(b=>b.id===bookId) || (data.apocryphaBooks||[]).find(b=>b.id===bookId); }
  function bookName(bookId){ const b=bookObj(bookId); return b ? (b[lang()]||b.fa||b.en||b.id) : bookId; }
  function verseText(bookId,ch,v){
    const data=window.bibleReaderData||{}; const c=(((data.chapters||{})[bookId]||{})[String(ch)]||{}); const l=lang();
    const arr=(l==='fa'&&c.fa&&c.fa.length?c.fa:(l==='hr'&&c.hr&&c.hr.length?c.hr:(l==='en'&&c.en&&c.en.length?c.en:(c.fa&&c.fa.length?c.fa:c.en||c.hr||[]))));
    const item=(arr||[]).find(x=>String(x.v)===String(v)); return item?item.t:'';
  }
  function refText(bookId,ch,v){return `${bookName(bookId)} ${faDigits(ch)}:${faDigits(v)}`;}
  function getBibleStateFromKey(k){
    const m=k.match(/^bible_(.+)_(\d+)_(\d+)$/); if(!m) return null;
    try{ const st=JSON.parse(localStorage.getItem(k)||'{}')||{}; return {bookId:m[1],chapter:parseInt(m[2],10),verse:parseInt(m[3],10),state:st}; }catch(e){return null;}
  }
  function collectSavedVerses(){
    const out=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i); if(!/^bible_/.test(k)) continue;
      const x=getBibleStateFromKey(k); if(!x) continue;
      if(x.state.bookmark || x.state.highlight){ out.push({...x,text:verseText(x.bookId,x.chapter,x.verse)}); }
    }
    out.sort((a,b)=>`${a.bookId}.${a.chapter}.${a.verse}`.localeCompare(`${b.bookId}.${b.chapter}.${b.verse}`)); return out;
  }
  function collectNotes(){
    const out=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(/^bible_/.test(k)){ const x=getBibleStateFromKey(k); if(x&&x.state.note){ out.push({source:T('bible'),title:refText(x.bookId,x.chapter,x.verse),text:x.state.note,open:()=>openSavedVerse(x.bookId,x.chapter,x.verse)}); } }
      else if(/^thanksgivingNote_/.test(k)){ const val=localStorage.getItem(k)||''; if(val.trim()){ const m=k.match(/^thanksgivingNote_([^_]+)_(\d+)/); out.push({source:T('thanksgiving'),title:`${T('thanksgiving')} — ${faDigits(m?m[2]:'')}`,text:val}); } }
      else if(/^audio_note_/.test(k)){ const val=localStorage.getItem(k)||''; if(val.trim()){ out.push({source:T('audio'),title:k.replace('audio_note_',''),text:val}); } }
    }
    try{ const fnotes=JSON.parse(localStorage.getItem('fastingJourneyNotesV50')||'{}')||{}; Object.values(fnotes).forEach(n=>{ const text=(n.text&&n.text.text)||n.text||''; if(String(text).trim()) out.push({source:T('fasting'),title:n.topic||T('fasting'),date:(n.date||'').slice(0,10),text:text+(n.state?`\n\n${n.state}`:'')}); }); }catch(e){}
    out.reverse(); return out;
  }
  function renderSavedVerses(){
    ensurePages(); const root=$('savedVersesContent'); if(!root) return; const items=collectSavedVerses();
    root.innerHTML=`<div class="section-title"><h2>${T('savedTitle')}</h2></div><div class="hero-card"><h1>${T('savedTitle')}</h1><p>${T('savedDesc')}</p><p><strong>${T('savedCount')}:</strong> ${faDigits(items.length)}</p></div>${items.length?items.map(x=>`<div class="v52-list-card"><h3>${esc(refText(x.bookId,x.chapter,x.verse))}</h3><div class="v52-meta">${x.state.bookmark?`<span class="v52-badge">★ ${T('bookmark')}</span>`:''}${x.state.highlight?`<span class="v52-badge">${T('highlight')}: ${esc(x.state.highlight)}</span>`:''}</div><div class="v52-verse-text">${esc(x.text||'')}</div>${x.state.note?`<div class="v52-note-text"><strong>${T('note')}:</strong><br>${esc(x.state.note)}</div>`:''}<button class="btn primary" type="button" onclick="window.openSavedVerseV52('${x.bookId}',${x.chapter},${x.verse})">${T('openVerse')}</button></div>`).join(''):`<div class="card"><p>${T('emptySaved')}</p></div>`}`;
  }
  function renderMyNotes(){
    ensurePages(); const root=$('myNotesContent'); if(!root) return; const items=collectNotes();
    root.innerHTML=`<div class="section-title"><h2>${T('notesTitle')}</h2></div><div class="hero-card"><h1>${T('notesTitle')}</h1><p>${T('notesDesc')}</p><p><strong>${T('notesCount')}:</strong> ${faDigits(items.length)}</p></div>${items.length?items.map((x,i)=>`<div class="v52-list-card"><h3>${esc(x.title||T('note'))}</h3><div class="v52-meta"><span class="v52-badge">${T('source')}: ${esc(x.source||'')}</span>${x.date?`<span class="v52-badge">${T('date')}: ${esc(x.date)}</span>`:''}</div><div class="v52-note-text">${esc(x.text||'')}</div>${x.source===T('bible')?`<button class="btn primary" type="button" data-note-index="${i}">${T('openVerse')}</button>`:''}</div>`).join(''):`<div class="card"><p>${T('emptyNotes')}</p></div>`}`;
    root.querySelectorAll('[data-note-index]').forEach(btn=>btn.addEventListener('click',()=>{ const x=items[parseInt(btn.dataset.noteIndex,10)]; if(x&&x.open)x.open(); }));
  }
  function openSavedVerse(bookId,ch,v){
    if(window.showPage) window.showPage('bibleReader',{skipStack:true});
    try{ window.openBibleBook(bookId); if(window.selectBibleChapter) window.selectBibleChapter(ch); setTimeout(()=>{ if(window.toggleVerseTools) window.toggleVerseTools(bookId,ch,v); },150); }catch(e){}
  }
  window.openSavedVerseV52=openSavedVerse;

  let stack=[]; let suppress=false;
  function activePage(){return d.querySelector('.page.active')?.id || 'home';}
  function state(){return {page:activePage(), bibleView:localStorage.getItem('bibleReaderView')||'home', bibleSection:localStorage.getItem('bibleSection')||'new', bibleBook:localStorage.getItem('bibleBook')||'JHN', bibleChapter:localStorage.getItem('bibleChapter')||'1', selectedPlan:localStorage.getItem('selectedPlanKeyV50')||localStorage.getItem('selectedPlanKey')||'', fastView:localStorage.getItem('fastingJourneyViewV50')||'home'};}
  function same(a,b){return a&&b&&JSON.stringify(a)===JSON.stringify(b);} 
  function push(){ if(suppress) return; const s=state(); if(!same(stack[stack.length-1],s)) stack.push(s); if(stack.length>40) stack.shift(); refreshBack(); }
  function restore(s){ if(!s) return; suppress=true; try{
      if(s.page==='bibleReader'){
        if(window.showPage) window.showPage('bibleReader',{skipStack:true});
        if(s.bibleView==='home'){ window.setBibleReaderView&&window.setBibleReaderView('home'); }
        else if(s.bibleView==='books'){ window.setBibleSection&&window.setBibleSection(s.bibleSection||'new'); }
        else if(s.bibleView && s.bibleView.indexOf('reading')===0){ window.openReadingPlan&&window.openReadingPlan('one'); }
        else { window.openBibleBook&&window.openBibleBook(s.bibleBook||'JHN'); window.selectBibleChapter&&window.selectBibleChapter(s.bibleChapter||1); }
      } else if(s.page==='plans'){
        localStorage.setItem('selectedPlanKeyV50',s.selectedPlan||''); if(s.selectedPlan)localStorage.setItem('selectedPlanKey',s.selectedPlan); else localStorage.removeItem('selectedPlanKey'); localStorage.setItem('fastingJourneyViewV50',s.fastView||'home'); window.showPage&&window.showPage('plans',{skipStack:true}); window.renderPlans&&window.renderPlans();
      } else { window.showPage&&window.showPage(s.page||'home',{skipStack:true}); }
    } finally { setTimeout(()=>{suppress=false; refreshBack(); window.scrollTo({top:0,behavior:'smooth'});},50); }
  }
  function goBack(){ const s=stack.pop(); if(s) restore(s); else { const p=activePage(); if(p!=='home'&&window.showPage) window.showPage('home',{skipStack:true}); } }
  window.appGoBackV52=goBack;
  function patch(name){ const orig=window[name]; if(typeof orig!=='function' || orig.__v52) return; const fn=function(){ push(); return orig.apply(this,arguments); }; fn.__v52=true; window[name]=fn; }
  function patchNav(){
    if(window.showPage && !window.showPage.__v52){ const orig=window.showPage; const fn=function(id,opts){ if(!(opts&&opts.skipStack) && activePage()!==id) push(); const r=orig.apply(this,arguments); if(id==='savedVerses') setTimeout(renderSavedVerses,20); if(id==='myNotes') setTimeout(renderMyNotes,20); setTimeout(refreshBack,30); return r; }; fn.__v52=true; window.showPage=fn; }
    ['setBibleSection','setBibleReaderView','openBibleBook','openReadingPlan','openPlanChapter','selectBibleChapter'].forEach(patch);
  }
  function installBackButton(){
    const old=$('globalBackV50'); if(old) old.classList.remove('show');
    let btn=$('globalBackV52'); if(!btn){ btn=d.createElement('button'); btn.id='globalBackV52'; btn.className='global-app-back-v52'; btn.textContent='← '+T('back'); btn.addEventListener('click',goBack); d.body.appendChild(btn); }
    refreshBack();
    d.addEventListener('click',function(ev){ const b=ev.target.closest('.bible-back-btn'); if(b){ ev.preventDefault(); ev.stopImmediatePropagation(); goBack(); } },true);
  }
  function refreshBack(){ const btn=$('globalBackV52'); if(!btn) return; btn.textContent='← '+T('back'); btn.classList.toggle('show', activePage()!=='home' || stack.length>0); }
  function refreshHomeText(){ const grid=d.querySelector('.home-feature-grid'); if(grid&&grid.dataset.v52Cards==='1'){ const cards=grid.querySelectorAll('.v52-home-card'); if(cards[0])cards[0].innerHTML=`<h3>${T('savedTitle')}</h3><p>${T('savedDesc')}</p><button class="btn gold" type="button" data-open-v52="savedVerses">${T('openSaved')}</button>`; if(cards[1])cards[1].innerHTML=`<h3>${T('notesTitle')}</h3><p>${T('notesDesc')}</p><button class="btn secondary" type="button" data-open-v52="myNotes">${T('openNotes')}</button>`; grid.querySelectorAll('[data-open-v52]').forEach(b=>b.addEventListener('click',()=>window.showPage?window.showPage(b.dataset.openV52):null)); } }
  document.addEventListener('DOMContentLoaded',()=>{ injectStyle(); ensurePages(); addHomeCards(); patchNav(); installBackButton(); setInterval(()=>{patchNav(); refreshBack();},1000); d.querySelectorAll('.lang-toggle button').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{refreshHomeText(); renderSavedVerses(); renderMyNotes(); refreshBack();},150))); });
})();
