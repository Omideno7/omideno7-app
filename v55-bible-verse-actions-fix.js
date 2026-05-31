/* Omideno7 V55 — Bible book-view verse actions fix
   Keeps the book-style verse display from V54, but makes every verse tappable/clickable again.
*/
(function(){
  const APP_VERSION='V55';
  window.APP_VERSION=APP_VERSION;

  function lang(){ return document.documentElement.lang || localStorage.getItem('lang') || 'fa'; }
  function faDigits(value){
    if(window.toFaDigits) return window.toFaDigits(value);
    const map={'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};
    return String(value ?? '').replace(/[0-9]/g,d=>map[d]||d);
  }
  function safeText(v){
    return String(v ?? '').replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  function installStyles(){
    if(document.getElementById('v55VerseActionStyles')) return;
    const style=document.createElement('style');
    style.id='v55VerseActionStyles';
    style.textContent=`
      .bible-verses{display:block;text-align:justify;line-height:2.15;font-size:1.04rem;}
      .bookish-verse{display:inline;margin:0;padding:0;border:0;background:transparent;}
      .bookish-verse .bible-verse-inline{display:inline;border:0;background:transparent;padding:0 .08rem;margin:0;color:inherit;font:inherit;text-align:inherit;cursor:pointer;line-height:inherit;-webkit-appearance:none;appearance:none;}
      .bookish-verse .bible-verse-inline:focus{outline:2px solid rgba(20,111,73,.35);border-radius:.28rem;}
      .bookish-verse .bible-verse-inline:hover .verse-text{text-decoration:underline;text-decoration-thickness:.08em;}
      .bookish-verse .verse-number{font-size:.68em;vertical-align:super;color:#0B8F4D;background:#E9F8EE;border:1px solid rgba(11,143,77,.20);border-radius:999px;padding:.04rem .22rem;font-weight:950;margin-inline-end:.2rem;}
      .bookish-verse.hl-yellow .verse-text{background:#fff2a8;border-radius:.25rem;padding:0 .1rem;}
      .bookish-verse.hl-green .verse-text{background:#dff5d7;border-radius:.25rem;padding:0 .1rem;}
      .bookish-verse.hl-blue .verse-text{background:#dcebff;border-radius:.25rem;padding:0 .1rem;}
      .bookish-verse.hl-pink .verse-text{background:#ffe1ef;border-radius:.25rem;padding:0 .1rem;}
      .bookish-verse.verse-bold .verse-text{font-weight:800;}
      .bookish-verse.verse-read .verse-number{color:#1d7b43;}
      .bookish-verse.verse-active .verse-text{outline:2px solid rgba(20,111,73,.30);border-radius:.25rem;}
      .bookish-tools{display:block;clear:both;margin:1rem 0;line-height:1.55;text-align:start;}
      .bookish-note{display:block;clear:both;margin:.4rem 0 .8rem;padding:.55rem .75rem;background:#f7f3e8;border-radius:.8rem;font-size:.92rem;line-height:1.65;text-align:start;}
      .verse-tools-panel{position:relative;z-index:2;}
    `;
    document.head.appendChild(style);
  }

  function getState(bookId, chapter, verse){
    try{ return window.getBibleState ? window.getBibleState(bookId, chapter, verse) : {}; }catch(e){ return {}; }
  }
  function getTerms(bookId, chapter, verse){
    try{ return window.getVerseKeyTerms ? window.getVerseKeyTerms(bookId, chapter, verse) : []; }catch(e){ return []; }
  }
  function renderTools(bookId, chapter, verseObj, st, terms){
    try{
      if(window.renderVerseTools) return window.renderVerseTools(bookId, chapter, verseObj, st, terms);
    }catch(e){ console.warn('V55 renderVerseTools failed', e); }
    const ref = `${bookId} ${chapter}:${verseObj.v}`;
    return `<div class="verse-tools-panel"><div class="verse-tools-title">گزینه‌های آیه — ${safeText(ref)}</div><div class="verse-tool-buttons">
      <button type="button" data-v55-action="bookmark" data-book="${bookId}" data-chapter="${chapter}" data-verse="${verseObj.v}">☆ ستاره‌دار</button>
      <button type="button" data-v55-action="read" data-book="${bookId}" data-chapter="${chapter}" data-verse="${verseObj.v}">✓ خوانده شد</button>
      <button type="button" data-v55-action="bold" data-book="${bookId}" data-chapter="${chapter}" data-verse="${verseObj.v}">B بولد</button>
      <button type="button" data-v55-highlight="yellow" data-book="${bookId}" data-chapter="${chapter}" data-verse="${verseObj.v}">زرد</button>
      <button type="button" data-v55-highlight="green" data-book="${bookId}" data-chapter="${chapter}" data-verse="${verseObj.v}">سبز</button>
      <button type="button" data-v55-highlight="blue" data-book="${bookId}" data-chapter="${chapter}" data-verse="${verseObj.v}">آبی</button>
      <button type="button" data-v55-highlight="" data-book="${bookId}" data-chapter="${chapter}" data-verse="${verseObj.v}">حذف رنگ</button>
    </div></div>`;
  }

  function renderBookishVerseV55(bookId, chapter, verseObj){
    installStyles();
    const st=getState(bookId, chapter, verseObj.v);
    const terms=getTerms(bookId, chapter, verseObj.v);
    const ref=`${bookId}.${chapter}.${verseObj.v}`;
    const active=(typeof activeBibleVerseRef!=='undefined' && activeBibleVerseRef===ref);
    const cls=['bible-verse','clean-verse','bookish-verse'];
    if(st.highlight) cls.push('hl-'+st.highlight);
    if(st.bold) cls.push('verse-bold');
    if(st.read) cls.push('verse-read');
    if(active) cls.push('verse-active');
    const num=lang()==='fa'?faDigits(verseObj.v):verseObj.v;
    const status=`${st.bookmark?'★':''}${st.note?' ✎':''}${st.read?' ✓':''}`;
    return `<span class="${cls.join(' ')}" data-bible-verse="${verseObj.v}">`+
      `<button type="button" class="bible-verse-inline" data-verse-toggle="1" data-book="${bookId}" data-chapter="${chapter}" data-verse="${verseObj.v}" onclick="window.__v55OpenVerse(event,'${bookId}',${chapter},${verseObj.v})">`+
      `<sup class="verse-number">${num}</sup><span class="verse-text">${verseObj.t}</span><span class="verse-status">${status}</span></button></span>`+
      `${active?`<div class="bookish-tools">${renderTools(bookId,chapter,verseObj,st,terms)}</div>`:''}`+
      `${st.note?`<div class="bookish-note">${safeText(st.note)}</div>`:''} `;
  }

  window.__v55OpenVerse=function(ev, bookId, chapter, verse){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    try{
      if(window.toggleVerseTools) window.toggleVerseTools(bookId, Number(chapter), Number(verse));
    }catch(e){ console.warn('V55 toggle verse failed', e); }
  };

  function applyPatch(){
    installStyles();
    try{
      window.renderBibleVerse = renderBookishVerseV55;
      renderBibleVerse = renderBookishVerseV55;
    }catch(e){ console.warn('V55 render patch warning', e); }
    try{
      if(!window.__v55ReaderWrapped && typeof renderBibleReader==='function'){
        window.__v55ReaderWrapped=true;
        const old=renderBibleReader;
        renderBibleReader=function(){
          const result=old.apply(this, arguments);
          installStyles();
          return result;
        };
        window.renderBibleReader=renderBibleReader;
      }
    }catch(e){ console.warn('V55 reader wrapper warning', e); }
  }

  document.addEventListener('click', function(ev){
    const verseBtn=ev.target.closest && ev.target.closest('#bibleReaderContent [data-verse-toggle]');
    if(verseBtn){
      ev.preventDefault(); ev.stopPropagation();
      window.__v55OpenVerse(null, verseBtn.dataset.book, parseInt(verseBtn.dataset.chapter,10), parseInt(verseBtn.dataset.verse,10));
      return;
    }
    const actionBtn=ev.target.closest && ev.target.closest('#bibleReaderContent [data-v55-action]');
    if(actionBtn){
      ev.preventDefault(); ev.stopPropagation();
      if(window.toggleBibleState) window.toggleBibleState(actionBtn.dataset.book, parseInt(actionBtn.dataset.chapter,10), parseInt(actionBtn.dataset.verse,10), actionBtn.dataset.v55Action);
      return;
    }
    const hlBtn=ev.target.closest && ev.target.closest('#bibleReaderContent [data-v55-highlight]');
    if(hlBtn){
      ev.preventDefault(); ev.stopPropagation();
      if(window.setBibleHighlight) window.setBibleHighlight(hlBtn.dataset.book, parseInt(hlBtn.dataset.chapter,10), parseInt(hlBtn.dataset.verse,10), hlBtn.dataset.v55Highlight || '');
      return;
    }
  }, true);

  document.addEventListener('DOMContentLoaded', function(){
    applyPatch();
    setTimeout(function(){ try{ if(typeof renderBibleReader==='function') renderBibleReader(); }catch(e){} }, 180);
  });
  setTimeout(applyPatch, 50);
})();
