/* Omideno7 V56 — Final Bible verse actions fix
   This patch keeps the book-style Bible reading view, but uses an independent active-verse system
   so verse tools always open and all actions work after clicking a verse.
*/
(function(){
  'use strict';
  const APP_VERSION='V56';
  window.APP_VERSION=APP_VERSION;
  window.__activeBibleVerseV56 = window.__activeBibleVerseV56 || null;

  function lang(){ try{return window.currentLang || localStorage.getItem('lang') || document.documentElement.lang || 'fa';}catch(e){return 'fa';} }
  function faDigits(value){
    if(typeof window.toFaDigits==='function') return window.toFaDigits(value);
    const map={'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};
    return String(value ?? '').replace(/[0-9]/g,d=>map[d]||d);
  }
  function esc(v){ return String(v ?? '').replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
  function tr(fa,en,hr){ const l=lang(); return l==='fa'?fa:(l==='hr'?hr:en); }
  function key(bookId,chapter,verse){ return `bible_${bookId}_${chapter}_${verse}`; }
  function getState(bookId,chapter,verse){
    try{ if(typeof window.getBibleState==='function') return window.getBibleState(bookId,Number(chapter),Number(verse)) || {}; }catch(e){}
    try{ return JSON.parse(localStorage.getItem(key(bookId,chapter,verse))||'{}') || {}; }catch(e){ return {}; }
  }
  function setState(bookId,chapter,verse,state){
    try{ if(typeof window.setBibleState==='function') return window.setBibleState(bookId,Number(chapter),Number(verse),state||{}); }catch(e){}
    try{ localStorage.setItem(key(bookId,chapter,verse), JSON.stringify(state||{})); }catch(e){}
  }
  function refKey(bookId,chapter,verse){ return `${bookId}.${Number(chapter)}.${Number(verse)}`; }
  function getTerms(bookId,chapter,verse){
    try{
      const data=window.bibleReaderData||{};
      return (data.keyTerms||{})[refKey(bookId,chapter,verse)] || [];
    }catch(e){ return []; }
  }
  function refLabel(bookId,chapter,verse){
    try{ if(typeof window.bibleRef==='function') return window.bibleRef(bookId,Number(chapter),Number(verse)); }catch(e){}
    return `${bookId} ${chapter}:${verse}`;
  }
  function localizedField(obj){
    if(!obj) return '';
    if(typeof obj==='string') return obj;
    const l=lang();
    return obj[l] || obj.fa || obj.en || obj.hr || '';
  }
  function renderTerms(terms){
    if(!terms || !terms.length) return `<p class="empty-note">${tr('برای این آیه هنوز کلمه کلیدی ثبت نشده است.','No key word has been added for this verse yet.','Za ovaj redak još nije dodana ključna riječ.')}</p>`;
    return terms.map(term=>`<div class="keyterm-card">
      <div class="keyterm-title">${esc(localizedField(term.term))}</div>
      <div><strong>${tr('کلمه اصلی','Original Word','Izvorna riječ')}:</strong> <span dir="ltr">${esc(term.original||'')}</span></div>
      <div><strong>${tr('تلفظ','Pronunciation','Izgovor')}:</strong> ${esc(localizedField(term.pronunciation))}</div>
      <div><strong>${tr('معنا','Meaning','Značenje')}:</strong> ${esc(localizedField(term.meaning))}</div>
    </div>`).join('');
  }
  function installStyles(){
    if(document.getElementById('v56-final-verse-actions-style')) return;
    const style=document.createElement('style');
    style.id='v56-final-verse-actions-style';
    style.textContent=`
      .bible-chapter-card{line-height:2.25!important;font-size:1.04rem!important;}
      .bible-verses{display:block!important;text-align:justify!important;line-height:2.18!important;}
      .bookish-verse-v56{display:inline!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;}
      .bookish-verse-v56 .bible-verse-inline-v56{display:inline!important;border:0!important;background:transparent!important;padding:0 .08rem!important;margin:0!important;color:inherit!important;font:inherit!important;text-align:inherit!important;cursor:pointer!important;line-height:inherit!important;-webkit-appearance:none!important;appearance:none!important;}
      .bookish-verse-v56 .bible-verse-inline-v56:hover .verse-text{text-decoration:underline;text-decoration-thickness:.08em;}
      .bookish-verse-v56 .bible-verse-inline-v56:focus{outline:2px solid rgba(20,111,73,.32);border-radius:.28rem;}
      .bookish-verse-v56 .verse-number{font-size:.72em!important;vertical-align:super!important;color:#0B8F4D!important;background:#E9F8EE!important;border:1px solid rgba(11,143,77,.24)!important;border-radius:999px!important;padding:.04rem .22rem!important;font-weight:950!important;line-height:1.2!important;margin-inline-end:.22rem!important;}
      .bookish-verse-v56.hl-yellow .verse-text{background:#fff2a8;border-radius:.25rem;padding:0 .1rem;}
      .bookish-verse-v56.hl-green .verse-text{background:#dff5d7;border-radius:.25rem;padding:0 .1rem;}
      .bookish-verse-v56.hl-blue .verse-text{background:#dcebff;border-radius:.25rem;padding:0 .1rem;}
      .bookish-verse-v56.hl-pink .verse-text{background:#ffe1ef;border-radius:.25rem;padding:0 .1rem;}
      .bookish-verse-v56.verse-bold .verse-text{font-weight:800;}
      .bookish-verse-v56.verse-read .verse-number{color:#16633F!important;background:#DDF4E5!important;}
      .bookish-verse-v56.verse-active .verse-text{outline:2px solid rgba(20,111,73,.30);border-radius:.25rem;}
      .bookish-tools-v56{display:block!important;clear:both!important;margin:1rem 0!important;line-height:1.55!important;text-align:start!important;}
      .bookish-note-v56{display:block!important;clear:both!important;margin:.45rem 0 .85rem!important;padding:.65rem .85rem!important;background:#f7f3e8!important;border-radius:.9rem!important;font-size:.92rem!important;line-height:1.7!important;text-align:start!important;}
      .verse-tools-panel-v56{position:relative;z-index:5;background:#fff;border:1px solid rgba(20,111,73,.16);border-radius:1rem;padding:.85rem;margin:.45rem 0;box-shadow:0 8px 22px rgba(0,0,0,.06);}
      .verse-tools-title-v56{font-weight:800;color:#0B6B3E;margin-bottom:.65rem;}
      .verse-tool-buttons-v56{display:flex;gap:.45rem;flex-wrap:wrap;margin-bottom:.75rem;}
      .verse-tool-buttons-v56 button{border:1px solid rgba(20,111,73,.18);background:#f7fbf8;border-radius:999px;padding:.5rem .7rem;cursor:pointer;font-weight:650;}
      .verse-note-editor-v56 textarea{width:100%;min-height:90px;border:1px solid rgba(0,0,0,.14);border-radius:.85rem;padding:.75rem;resize:vertical;margin:.4rem 0 .55rem;box-sizing:border-box;}
      .keyterms-panel-v56{margin-top:.65rem;padding:.65rem;border-radius:.9rem;background:#f7fbf8;border:1px solid rgba(20,111,73,.12);}
    `;
    document.head.appendChild(style);
  }
  function renderTools(bookId,chapter,verseObj,st,terms){
    const ref=refLabel(bookId,chapter,verseObj.v);
    const hasTerms=(terms||[]).length>0;
    return `<div class="verse-tools-panel-v56" data-v56-tools="1">
      <div class="verse-tools-title-v56">${tr('گزینه‌های آیه','Verse Options','Opcije retka')} — ${esc(ref)}</div>
      <div class="verse-tool-buttons-v56">
        <button type="button" data-v56-action="bookmark" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">${st.bookmark?'★':'☆'} ${tr('ستاره‌دار','Bookmark','Označi')}</button>
        <button type="button" data-v56-action="read" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">✓ ${tr('خوانده شد','Read','Pročitano')}</button>
        <button type="button" data-v56-action="bold" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">B ${tr('بولد','Bold','Podebljaj')}</button>
        <button type="button" data-v56-highlight="yellow" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">▣ ${tr('زرد','Yellow','Žuto')}</button>
        <button type="button" data-v56-highlight="green" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">▣ ${tr('سبز','Green','Zeleno')}</button>
        <button type="button" data-v56-highlight="blue" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">▣ ${tr('آبی','Blue','Plavo')}</button>
        <button type="button" data-v56-highlight="pink" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">▣ ${tr('صورتی','Pink','Ružičasto')}</button>
        <button type="button" data-v56-highlight="" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">× ${tr('حذف رنگ','Remove Color','Ukloni boju')}</button>
        <button type="button" data-v56-keyterms="1" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">🔎 ${tr('کلمات کلیدی','Key Words','Ključne riječi')} ${hasTerms?'':'(۰)'}</button>
        <button type="button" data-v56-close="1">× ${tr('بستن','Close','Zatvori')}</button>
      </div>
      <div id="keyterms-v56-${esc(bookId)}-${chapter}-${verseObj.v}" class="keyterms-panel-v56" hidden>${renderTerms(terms)}</div>
      <div class="verse-note-editor-v56">
        <textarea id="note-v56-${esc(bookId)}-${chapter}-${verseObj.v}" maxlength="1000" placeholder="${tr('یادداشت، مکاشفه یا نکته خود را برای این آیه بنویسید.','Write your note, revelation, or insight for this verse.','Napišite svoju bilješku, objavu ili uvid za ovaj redak.')}">${esc(st.note||'')}</textarea>
        <button type="button" class="btn primary" data-v56-save-note="1" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">${tr('ذخیره یادداشت','Save Note','Spremi bilješku')}</button>
      </div>
    </div>`;
  }
  function renderVerse(bookId,chapter,verseObj){
    installStyles();
    const st=getState(bookId,chapter,verseObj.v);
    const terms=getTerms(bookId,chapter,verseObj.v);
    const active=window.__activeBibleVerseV56===refKey(bookId,chapter,verseObj.v);
    const cls=['bookish-verse-v56'];
    if(st.highlight) cls.push('hl-'+st.highlight);
    if(st.bold) cls.push('verse-bold');
    if(st.read) cls.push('verse-read');
    if(active) cls.push('verse-active');
    const num=lang()==='fa'?faDigits(verseObj.v):verseObj.v;
    const status=`${st.bookmark?'★':''}${st.note?' ✎':''}${st.read?' ✓':''}`;
    return `<span class="${cls.join(' ')}" data-bible-verse="${verseObj.v}">`+
      `<button type="button" class="bible-verse-inline-v56" data-v56-verse="1" data-book="${esc(bookId)}" data-chapter="${chapter}" data-verse="${verseObj.v}">`+
      `<sup class="verse-number">${num}</sup><span class="verse-text">${verseObj.t}</span><span class="verse-status">${status}</span></button></span>`+
      `${active?`<div class="bookish-tools-v56">${renderTools(bookId,chapter,verseObj,st,terms)}</div>`:''}`+
      `${st.note?`<div class="bookish-note-v56">${esc(st.note)}</div>`:''} `;
  }
  function refresh(){ try{ if(typeof window.renderBibleReader==='function') window.renderBibleReader(); else if(typeof renderBibleReader==='function') renderBibleReader(); }catch(e){ console.warn('V56 refresh failed',e); } }
  function setActive(bookId,chapter,verse){
    const r=refKey(bookId,chapter,verse);
    window.__activeBibleVerseV56 = (window.__activeBibleVerseV56===r) ? null : r;
    try{ activeBibleVerseRef=null; }catch(e){}
    refresh();
  }
  function applyPatch(){
    installStyles();
    try{ renderBibleVerse=renderVerse; window.renderBibleVerse=renderVerse; }catch(e){ console.warn('V56 renderBibleVerse patch failed',e); }
    try{
      if(!window.__v56ReaderWrapped && typeof renderBibleReader==='function'){
        window.__v56ReaderWrapped=true;
        const old=renderBibleReader;
        renderBibleReader=function(){
          try{ renderBibleVerse=renderVerse; window.renderBibleVerse=renderVerse; }catch(e){}
          const out=old.apply(this,arguments);
          installStyles();
          return out;
        };
        window.renderBibleReader=renderBibleReader;
      }
    }catch(e){ console.warn('V56 renderBibleReader patch failed',e); }
  }

  document.addEventListener('click',function(ev){
    const root=ev.target.closest && ev.target.closest('#bibleReaderContent');
    if(!root) return;
    const verseBtn=ev.target.closest('[data-v56-verse]');
    if(verseBtn){ ev.preventDefault(); ev.stopPropagation(); setActive(verseBtn.dataset.book, Number(verseBtn.dataset.chapter), Number(verseBtn.dataset.verse)); return; }
    const actionBtn=ev.target.closest('[data-v56-action]');
    if(actionBtn){ ev.preventDefault(); ev.stopPropagation(); const st=getState(actionBtn.dataset.book,actionBtn.dataset.chapter,actionBtn.dataset.verse); st[actionBtn.dataset.v56Action]=!st[actionBtn.dataset.v56Action]; setState(actionBtn.dataset.book,actionBtn.dataset.chapter,actionBtn.dataset.verse,st); refresh(); return; }
    const hlBtn=ev.target.closest('[data-v56-highlight]');
    if(hlBtn){ ev.preventDefault(); ev.stopPropagation(); const st=getState(hlBtn.dataset.book,hlBtn.dataset.chapter,hlBtn.dataset.verse); st.highlight=hlBtn.dataset.v56Highlight || ''; setState(hlBtn.dataset.book,hlBtn.dataset.chapter,hlBtn.dataset.verse,st); refresh(); return; }
    const saveBtn=ev.target.closest('[data-v56-save-note]');
    if(saveBtn){ ev.preventDefault(); ev.stopPropagation(); const id=`note-v56-${saveBtn.dataset.book}-${saveBtn.dataset.chapter}-${saveBtn.dataset.verse}`; const st=getState(saveBtn.dataset.book,saveBtn.dataset.chapter,saveBtn.dataset.verse); st.note=(document.getElementById(id)?.value||'').slice(0,1000); setState(saveBtn.dataset.book,saveBtn.dataset.chapter,saveBtn.dataset.verse,st); refresh(); return; }
    const keyBtn=ev.target.closest('[data-v56-keyterms]');
    if(keyBtn){ ev.preventDefault(); ev.stopPropagation(); const el=document.getElementById(`keyterms-v56-${keyBtn.dataset.book}-${keyBtn.dataset.chapter}-${keyBtn.dataset.verse}`); if(el) el.hidden=!el.hidden; return; }
    const closeBtn=ev.target.closest('[data-v56-close]');
    if(closeBtn){ ev.preventDefault(); ev.stopPropagation(); window.__activeBibleVerseV56=null; refresh(); return; }
  }, true);

  document.addEventListener('DOMContentLoaded',function(){ applyPatch(); setTimeout(function(){ applyPatch(); try{ if(typeof renderBibleReader==='function') renderBibleReader(); }catch(e){} },220); });
  applyPatch();
  setTimeout(applyPatch,80);
  setTimeout(function(){ applyPatch(); },700);
})();
