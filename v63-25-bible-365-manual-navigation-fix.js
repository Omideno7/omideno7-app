/* Omideno7 V63.25 — Bible 365 manual navigation fix
   Purpose: one-year Bible plan moves only by user's buttons:
   Previous Day / I read; unlock next day.
*/
(function(){
  'use strict';

  const VERSION = 'V63.25';
  const LS_DAY = 'omideno7Bible365ManualDayV6325';

  function lang(){
    try{
      if(typeof currentLang !== 'undefined' && currentLang) return currentLang;
    }catch(e){}
    return localStorage.getItem('lang') || document.documentElement.lang || 'fa';
  }

  function isFa(){
    return lang() === 'fa';
  }

  function faNum(v){
    try{
      if(isFa() && typeof toFaDigits === 'function') return toFaDigits(v);
    }catch(e){}
    return String(v);
  }

  function tr(key){
    const L = lang();
    const dict = {
      fa:{
        title:'خواندن کتاب مقدس در یک سال',
        back:'بازگشت به برنامه‌ها',
        today:'مطالعه امروز',
        day:'روز برنامه',
        chapters:'باب‌های امروز',
        open:'باز کردن باب',
        prev:'روز قبلی',
        next:'خواندم؛ روز بعد را باز کن',
        reset:'شروع دوباره از روز ۱',
        completed:'شما به پایان برنامه ۳۶۵ روزه رسیدید.',
        empty:'برای این روز هنوز باب خواندنی پیدا نشد.'
      },
      en:{
        title:'Read the Bible in One Year',
        back:'Back to Plans',
        today:'Today’s Reading',
        day:'Plan Day',
        chapters:'Today’s Chapters',
        open:'Open Chapter',
        prev:'Previous Day',
        next:'I read; unlock next day',
        reset:'Start again from Day 1',
        completed:'You reached the end of the 365-day plan.',
        empty:'No reading was found for this day.'
      },
      hr:{
        title:'Pročitaj Bibliju u jednoj godini',
        back:'Natrag na planove',
        today:'Današnje čitanje',
        day:'Dan plana',
        chapters:'Današnja poglavlja',
        open:'Otvori poglavlje',
        prev:'Prethodni dan',
        next:'Pročitao sam; otključaj sljedeći dan',
        reset:'Počni ponovno od 1. dana',
        completed:'Došli ste do kraja 365-dnevnog plana.',
        empty:'Za ovaj dan nije pronađeno čitanje.'
      }
    };
    return (dict[L] && dict[L][key]) || dict.fa[key] || key;
  }

  function planLength(){
    const schedule = window.bibleReadingSchedule && window.bibleReadingSchedule.oneYear;
    if(Array.isArray(schedule) && schedule.length) return schedule.length;
    return 365;
  }

  function clampDay(day){
    const max = planLength();
    day = parseInt(day, 10);
    if(!day || day < 1) day = 1;
    if(day > max) day = max;
    return day;
  }

  function getManualDay(){
    return clampDay(localStorage.getItem(LS_DAY) || '1');
  }

  function setManualDay(day){
    day = clampDay(day);
    localStorage.setItem(LS_DAY, String(day));
    return day;
  }

  function bibleBooks(){
    return (window.bibleReaderData && window.bibleReaderData.books) || [];
  }

  function getBookName(book){
    try{
      if(typeof bibleBookName === 'function') return bibleBookName(book);
    }catch(e){}
    if(!book) return '';
    return book[lang()] || book.fa || book.en || book.hr || book.id || '';
  }

  function normalizeRefItem(item){
    if(!item) return null;

    if(typeof item === 'object'){
      const bookId = item.bookId || item.book || item.id;
      const chapter = item.chapter || item.ch;
      if(bookId && chapter) return {bookId:String(bookId), chapter:parseInt(chapter,10)};
      return null;
    }

    if(typeof item === 'string'){
      const s = item.trim();
      const m = s.match(/^(.+?)\s+(\d+)$/);
      if(!m) return null;

      const bookText = m[1].trim().toLowerCase();
      const chapter = parseInt(m[2], 10);
      const found = bibleBooks().find(function(b){
        return [b.id, b.fa, b.en, b.hr].filter(Boolean).some(function(name){
          return String(name).trim().toLowerCase() === bookText;
        });
      });

      if(found && chapter) return {bookId:found.id, chapter:chapter};
    }

    return null;
  }

  function getChapterSequence(){
    try{
      if(typeof getBibleChapterSequence === 'function') return getBibleChapterSequence();
    }catch(e){}

    const seq = [];
    bibleBooks().filter(function(b){
      return b.section === 'old' || b.section === 'new';
    }).forEach(function(b){
      for(let ch = 1; ch <= Number(b.chapters || 0); ch++){
        seq.push({bookId:b.id, chapter:ch});
      }
    });
    return seq;
  }

  function itemsForDay(day){
    day = clampDay(day);

    const schedule = window.bibleReadingSchedule && window.bibleReadingSchedule.oneYear;
    if(Array.isArray(schedule) && schedule.length){
      const row = schedule[day - 1] || {};
      const refs = row.refs || row.items || row.readings || [];
      return refs.map(normalizeRefItem).filter(Boolean);
    }

    const seq = getChapterSequence();
    const start = Math.floor((day - 1) * seq.length / 365);
    const end = Math.floor(day * seq.length / 365);
    return seq.slice(start, Math.max(end, start + 1));
  }

  function currentTextLang(){
    try{
      if(typeof getBibleTextLang === 'function') return getBibleTextLang();
    }catch(e){}
    return lang();
  }

  function getVerses(bookId, chapter){
    const data = window.bibleReaderData || {};
    const chapterObj = (((data.chapters || {})[bookId] || {})[String(chapter)] || {});
    const L = currentTextLang();

    if(L === 'fa' && chapterObj.fa && chapterObj.fa.length) return chapterObj.fa;
    if(L === 'hr' && chapterObj.hr && chapterObj.hr.length) return chapterObj.hr;
    if(L === 'en' && chapterObj.en && chapterObj.en.length) return chapterObj.en;

    return (chapterObj.fa && chapterObj.fa.length ? chapterObj.fa : null)
      || (chapterObj.en && chapterObj.en.length ? chapterObj.en : null)
      || (chapterObj.hr && chapterObj.hr.length ? chapterObj.hr : null)
      || [];
  }

  function renderVerse(bookId, chapter, verse){
    try{
      if(typeof renderBibleVerse === 'function') return renderBibleVerse(bookId, chapter, verse);
    }catch(e){}

    const number = verse && verse.v ? verse.v : '';
    const text = verse && verse.t ? verse.t : '';
    return '<p class="bible-verse-line"><strong>' + faNum(number) + '</strong> ' + text + '</p>';
  }

  function renderManualReadingPlan(){
    const day = getManualDay();
    const max = planLength();
    const items = itemsForDay(day);

    return `
      <div class="section-title">
        <h2>${tr('title')}</h2>
      </div>

      <button type="button" class="btn ghost bible-back-btn" data-bible-view="home" onclick="setBibleReaderView('home')">
        ← ${tr('back')}
      </button>

      <div class="card reading-plan-card bible365-manual-card">
        <h3>${tr('today')}</h3>

        <p>
          <strong>${tr('day')}:</strong>
          ${faNum(day)} / ${faNum(max)}
        </p>

        <div class="btn-row bible365-nav-row">
          <button type="button" class="btn light" data-bible365-prev ${day <= 1 ? 'disabled' : ''}>
            ${tr('prev')}
          </button>

          <button type="button" class="btn primary" data-bible365-next ${day >= max ? 'disabled' : ''}>
            ${day >= max ? tr('completed') : tr('next')}
          </button>
        </div>

        <div class="btn-row bible365-reset-row">
          <button type="button" class="btn ghost" data-bible365-reset>
            ${tr('reset')}
          </button>
        </div>

        <h4>${tr('chapters')}</h4>

        ${
          items.length
          ? `<div class="reading-plan-list">
              ${items.map(function(item){
                const b = bibleBooks().find(function(x){ return x.id === item.bookId; });
                return `
                  <button type="button"
                    class="reading-plan-item"
                    data-plan-book="${item.bookId}"
                    data-plan-chapter="${item.chapter}"
                    onclick="openPlanChapter(this.dataset.planBook,this.dataset.planChapter)">
                    <strong>${getBookName(b)} ${faNum(item.chapter)}</strong>
                    <small>${tr('open')}</small>
                  </button>
                `;
              }).join('')}
            </div>`
          : `<p class="small">${tr('empty')}</p>`
        }
      </div>

      <div class="reading-plan-full-text">
        ${items.map(function(item){
          const b = bibleBooks().find(function(x){ return x.id === item.bookId; });
          const verses = getVerses(item.bookId, item.chapter);

          return `
            <div class="bible-chapter-card plan-chapter-block">
              <h3>${getBookName(b)} ${faNum(item.chapter)}</h3>
              <div class="bible-verses">
                ${verses.map(function(v){ return renderVerse(item.bookId, item.chapter, v); }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function refreshBiblePlan(){
    try{
      if(typeof renderBibleReader === 'function'){
        renderBibleReader();
        return;
      }
    }catch(e){}

    const root = document.getElementById('bibleReaderContent');
    if(root) root.innerHTML = renderManualReadingPlan();
  }

  function installOverrides(){
    try{
      window.readingPlanDay = function(plan){
        return getManualDay();
      };
      readingPlanDay = window.readingPlanDay;
    }catch(e){}

    try{
      window.readingPlanItems = function(plan){
        return itemsForDay(getManualDay());
      };
      readingPlanItems = window.readingPlanItems;
    }catch(e){}

    try{
      window.renderReadingPlan = function(plan){
        return renderManualReadingPlan();
      };
      renderReadingPlan = window.renderReadingPlan;
    }catch(e){}
  }

  function injectStyle(){
    if(document.getElementById('v6325-bible365-style')) return;

    const st = document.createElement('style');
    st.id = 'v6325-bible365-style';
    st.textContent = `
      .bible365-manual-card{
        border-top:5px solid var(--green);
      }

      .bible365-nav-row{
        margin:14px 0;
        display:flex;
        gap:10px;
        flex-wrap:wrap;
      }

      .bible365-nav-row .btn,
      .bible365-reset-row .btn{
        cursor:pointer;
      }

      .bible365-nav-row .btn[disabled]{
        opacity:.45;
        cursor:not-allowed;
      }

      .fa .bible365-manual-card,
      .fa .bible365-nav-row,
      .fa .bible365-reset-row{
        direction:rtl;
        text-align:right;
      }
    `;
    document.head.appendChild(st);
  }

  document.addEventListener('click', function(ev){
    const next = ev.target.closest && ev.target.closest('[data-bible365-next]');
    const prev = ev.target.closest && ev.target.closest('[data-bible365-prev]');
    const reset = ev.target.closest && ev.target.closest('[data-bible365-reset]');

    if(!next && !prev && !reset) return;

    ev.preventDefault();
    ev.stopPropagation();

    if(next && !next.disabled){
      setManualDay(getManualDay() + 1);
    }

    if(prev && !prev.disabled){
      setManualDay(getManualDay() - 1);
    }

    if(reset){
      setManualDay(1);
    }

    refreshBiblePlan();

    setTimeout(function(){
      const card = document.querySelector('.bible365-manual-card');
      if(card) card.scrollIntoView({block:'start', behavior:'smooth'});
    }, 80);
  }, true);

  function run(){
    injectStyle();
    installOverrides();

    const root = document.getElementById('bibleReaderContent');
    if(root && root.innerHTML && root.innerHTML.indexOf('reading-plan-card') !== -1){
      refreshBiblePlan();
    }
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  setTimeout(run, 300);
  setTimeout(run, 1000);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
