/* Omideno7 V63.26 — Bible 365 Day Picker
   Purpose: replace locked next-day flow with a stable 1–365 day selector.
   This only affects Bible > 365-day reading plan.
*/
(function(){
  'use strict';

  const VERSION = 'V63.26';
  const LS_SELECTED_DAY = 'om7_bible365_selected_day_v6326';

  const FA_DIGITS = {'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};

  function lang(){
    try{
      return localStorage.getItem('lang') || document.documentElement.lang || window.currentLang || 'fa';
    }catch(e){
      return 'fa';
    }
  }

  function d(v){
    return lang() === 'fa'
      ? String(v).replace(/[0-9]/g, x => FA_DIGITS[x] || x)
      : String(v);
  }

  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      "'":'&#39;'
    }[ch]));
  }

  function L(key){
    const dict = {
      fa:{
        title:'برنامه ۳۶۵ روزه مطالعه کتاب‌مقدس',
        subtitle:'روز مورد نظر را انتخاب کنید و باب‌های همان روز را بخوانید.',
        selectDay:'انتخاب روز',
        day:'روز',
        prev:'روز قبل',
        next:'روز بعد',
        todayRefs:'خواندنی‌های این روز',
        chapters:'متن کامل فصل‌ها',
        openChapter:'باز کردن فصل',
        back:'بازگشت',
        missing:'متن این فصل در دیتای فعلی کتاب‌مقدس پیدا نشد.'
      },
      en:{
        title:'365-Day Bible Reading Plan',
        subtitle:'Choose a day and read the chapters for that day.',
        selectDay:'Select Day',
        day:'Day',
        prev:'Previous Day',
        next:'Next Day',
        todayRefs:'Today’s Readings',
        chapters:'Full Chapter Text',
        openChapter:'Open Chapter',
        back:'Back',
        missing:'This chapter text was not found in the current Bible data.'
      },
      hr:{
        title:'365-dnevni plan čitanja Biblije',
        subtitle:'Odaberite dan i pročitajte poglavlja za taj dan.',
        selectDay:'Odaberi dan',
        day:'Dan',
        prev:'Prethodni dan',
        next:'Sljedeći dan',
        todayRefs:'Današnje čitanje',
        chapters:'Cijeli tekst poglavlja',
        openChapter:'Otvori poglavlje',
        back:'Natrag',
        missing:'Tekst ovog poglavlja nije pronađen u trenutnim podacima.'
      }
    };

    const l = lang();
    return (dict[l] && dict[l][key]) || dict.fa[key] || key;
  }

  function getPlan(){
    if(window.om7Bible365 && Array.isArray(window.om7Bible365.data)){
      return window.om7Bible365.data;
    }

    if(window.bibleReadingSchedule && Array.isArray(window.bibleReadingSchedule.oneYear)){
      return window.bibleReadingSchedule.oneYear.map(function(row, i){
        return {
          day: row.day || i + 1,
          title:{
            fa:'روز ' + (row.day || i + 1) + ' از ۳۶۵',
            en:'Day ' + (row.day || i + 1) + ' of 365',
            hr:'Dan ' + (row.day || i + 1) + ' od 365'
          },
          references:{fa:'', en:'', hr:''},
          refs: row.refs || []
        };
      });
    }

    return [];
  }

  function safeDay(v){
    const n = parseInt(v, 10);
    if(!Number.isFinite(n) || n < 1) return 1;
    if(n > 365) return 365;
    return n;
  }

  function getSelectedDay(){
    return safeDay(localStorage.getItem(LS_SELECTED_DAY) || '1');
  }

  function setSelectedDay(day){
    day = safeDay(day);
    localStorage.setItem(LS_SELECTED_DAY, String(day));

    try{
      localStorage.setItem('om7_bible365_started', '1');
      localStorage.setItem('om7_bible365_current_day', String(day));
      localStorage.setItem('om7_bible365_view_day', String(day));
    }catch(e){}

    return day;
  }

  function getEntry(day){
    const plan = getPlan();
    return plan[day - 1] || plan[0] || null;
  }

  function getBook(bookId){
    const data = window.bibleReaderData || {};
    return (data.books || []).find(b => b.id === bookId) || {
      id:bookId,
      fa:bookId,
      en:bookId,
      hr:bookId
    };
  }

  function bookName(book){
    const l = lang();
    return (book && (book[l] || book.en || book.fa || book.hr || book.id)) || '';
  }

  function getTextLang(){
    try{
      if(typeof window.getBibleTextLang === 'function') return window.getBibleTextLang();
    }catch(e){}

    return lang() === 'hr' ? 'hr' : (lang() === 'fa' ? 'fa' : 'en');
  }

  function chapterVerses(bookId, chapter){
    const data = window.bibleReaderData || {};
    const ch = (((data.chapters || {})[bookId] || {})[String(chapter)] || {});
    const tl = getTextLang();

    if(tl === 'fa' && ch.fa && ch.fa.length) return ch.fa;
    if(tl === 'hr' && ch.hr && ch.hr.length) return ch.hr;
    if(tl === 'en' && ch.en && ch.en.length) return ch.en;

    return (ch.fa && ch.fa.length ? ch.fa : null)
      || (ch.en && ch.en.length ? ch.en : null)
      || (ch.hr && ch.hr.length ? ch.hr : null)
      || [];
  }

  function renderVerseFallback(v){
    const number = v && (v.verse || v.v || v.number || '');
    const text = v && (v.text || v.t || v.value || '');

    return `
      <p class="bible-verse-line">
        <strong>${esc(d(number))}</strong>
        ${esc(text)}
      </p>
    `;
  }

  function renderVerse(bookId, chapter, verse){
    try{
      if(typeof window.renderBibleVerse === 'function'){
        return window.renderBibleVerse(bookId, chapter, verse);
      }
    }catch(e){}

    return renderVerseFallback(verse);
  }

  function dayOptions(selected){
    let html = '';
    for(let i = 1; i <= 365; i++){
      html += `<option value="${i}" ${i === selected ? 'selected' : ''}>${L('day')} ${d(i)}</option>`;
    }
    return html;
  }

  function renderReadingPlanPicker(){
    const selected = getSelectedDay();
    const entry = getEntry(selected);

    if(!entry){
      return `
        <div class="card">
          <h2>${esc(L('title'))}</h2>
          <p>${esc(L('missing'))}</p>
        </div>
      `;
    }

    const l = lang();
    const title = (entry.title && (entry.title[l] || entry.title.en || entry.title.fa || entry.title.hr))
      || `${L('day')} ${d(selected)} / ${d(365)}`;

    const refsLabel = (entry.references && (entry.references[l] || entry.references.en || entry.references.fa || entry.references.hr))
      || '';

    const refs = Array.isArray(entry.refs) ? entry.refs : [];

    return `
      <div class="om7-bible365-picker-shell">
        <div class="card om7-bible365-picker-card">
          <h2>${esc(L('title'))}</h2>
          <p class="small">${esc(L('subtitle'))}</p>

          <label class="om7-bible365-label" for="om7Bible365DaySelect">
            ${esc(L('selectDay'))}
          </label>

          <select id="om7Bible365DaySelect" class="om7-bible365-select" data-om7-bible365-select>
            ${dayOptions(selected)}
          </select>

          <div class="btn-row om7-bible365-nav">
            <button type="button" class="btn light" data-om7-bible365-prev ${selected <= 1 ? 'disabled' : ''}>
              ← ${esc(L('prev'))}
            </button>

            <button type="button" class="btn primary" data-om7-bible365-next ${selected >= 365 ? 'disabled' : ''}>
              ${esc(L('next'))} →
            </button>
          </div>
        </div>

        <div class="card om7-bible365-reading-card">
          <h3>${esc(title)}</h3>

          <h4>${esc(L('todayRefs'))}</h4>
          <p><strong>${esc(refsLabel)}</strong></p>

          <div class="reading-plan-list">
            ${refs.map(function(item){
              const b = getBook(item.bookId);
              const label = `${bookName(b)} ${d(item.chapter)}`;

              return `
                <button type="button"
                  class="reading-plan-item om7-bible365-ref-btn"
                  data-book="${esc(item.bookId)}"
                  data-chapter="${esc(item.chapter)}">
                  <strong>${esc(label)}</strong>
                  <small>${esc(L('openChapter'))}</small>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="om7-bible365-full-text">
          <h3>${esc(L('chapters'))}</h3>

          ${refs.map(function(item){
            const b = getBook(item.bookId);
            const label = `${bookName(b)} ${d(item.chapter)}`;
            const verses = chapterVerses(item.bookId, item.chapter);

            return `
              <div class="card bible-chapter-card om7-bible365-chapter" id="om7-${esc(item.bookId)}-${esc(item.chapter)}">
                <h3>${esc(label)}</h3>
                <div class="bible-verses">
                  ${
                    verses.length
                    ? verses.map(v => renderVerse(item.bookId, item.chapter, v)).join('')
                    : `<p class="small">${esc(L('missing'))}</p>`
                  }
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function refreshBible(){
    try{
      if(typeof window.renderBibleReader === 'function'){
        window.renderBibleReader();
        return;
      }
    }catch(e){}

    const root = document.getElementById('bibleReaderContent')
      || document.querySelector('#bible .bible-reader-content')
      || document.querySelector('#bible');

    if(root){
      root.innerHTML = renderReadingPlanPicker();
    }
  }

  function installOverride(){
    if(!window.om7Bible365 || !Array.isArray(window.om7Bible365.data)){
      return false;
    }

    window.renderReadingPlan = function(plan){
      if(plan === 'one' || plan === '365' || plan === 'year'){
        return renderReadingPlanPicker();
      }

      return renderReadingPlanPicker();
    };

    window.readingPlanDay = function(plan){
      return getSelectedDay();
    };

    window.readingPlanItems = function(plan){
      const entry = getEntry(getSelectedDay());
      return entry && entry.refs ? entry.refs : [];
    };

    window.om7Bible365.openDay = function(day){
      setSelectedDay(day);
      refreshBible();
    };

    window.om7Bible365.complete = function(day){
      setSelectedDay(getSelectedDay() + 1);
      refreshBible();
    };

    window.om7Bible365.start = function(){
      setSelectedDay(1);
      refreshBible();
    };

    return true;
  }

  function injectStyle(){
    if(document.getElementById('om7-bible365-picker-style')) return;

    const st = document.createElement('style');
    st.id = 'om7-bible365-picker-style';
    st.textContent = `
      .om7-bible365-picker-card{
        border-top:5px solid var(--green);
      }

      .om7-bible365-label{
        display:block;
        font-weight:900;
        color:var(--blue);
        margin:14px 0 7px;
      }

      .om7-bible365-select{
        width:100%;
        max-width:100%;
        padding:13px 14px;
        border-radius:16px;
        border:1px solid var(--line);
        background:#fff;
        font-weight:900;
        font-size:16px;
        color:var(--blue);
      }

      .om7-bible365-nav{
        margin-top:14px;
      }

      .om7-bible365-nav .btn[disabled]{
        opacity:.45;
        cursor:not-allowed;
      }

      .om7-bible365-ref-btn{
        cursor:pointer;
      }

      .fa .om7-bible365-picker-shell,
      .fa .om7-bible365-picker-card,
      .fa .om7-bible365-reading-card{
        direction:rtl;
        text-align:right;
      }
    `;

    document.head.appendChild(st);
  }

  document.addEventListener('change', function(ev){
    const sel = ev.target.closest && ev.target.closest('[data-om7-bible365-select]');
    if(!sel) return;

    setSelectedDay(sel.value);
    refreshBible();

    setTimeout(function(){
      const card = document.querySelector('.om7-bible365-picker-card');
      if(card) card.scrollIntoView({block:'start', behavior:'smooth'});
    }, 80);
  }, true);

  document.addEventListener('click', function(ev){
    const prev = ev.target.closest && ev.target.closest('[data-om7-bible365-prev]');
    const next = ev.target.closest && ev.target.closest('[data-om7-bible365-next]');
    const ref = ev.target.closest && ev.target.closest('.om7-bible365-ref-btn');

    if(prev || next){
      ev.preventDefault();
      ev.stopPropagation();

      let day = getSelectedDay();

      if(prev && !prev.disabled) day--;
      if(next && !next.disabled) day++;

      setSelectedDay(day);
      refreshBible();

      setTimeout(function(){
        const card = document.querySelector('.om7-bible365-picker-card');
        if(card) card.scrollIntoView({block:'start', behavior:'smooth'});
      }, 80);

      return;
    }

    if(ref){
      const book = ref.getAttribute('data-book');
      const chapter = ref.getAttribute('data-chapter');
      const target = document.getElementById('om7-' + book + '-' + chapter);

      if(target){
        ev.preventDefault();
        ev.stopPropagation();
        target.scrollIntoView({block:'start', behavior:'smooth'});
      }
    }
  }, true);

  function run(){
    injectStyle();

    if(!installOverride()){
      setTimeout(run, 300);
      return;
    }

    const text = document.body ? (document.body.textContent || '') : '';
    if(/۳۶۵|365|one year|یک سال|jednoj godini/i.test(text)){
      try{
        if(typeof window.renderBibleReader === 'function') window.renderBibleReader();
      }catch(e){}
    }
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  setTimeout(run, 300);
  setTimeout(run, 1000);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
