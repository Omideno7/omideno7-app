/* Omideno7 V63.39 — Stable Bible 365 Single Reader
   Purpose:
   - Use only one Bible 365 reader inside Bible > 365-day plan.
   - Stop duplicated old cards, page jumping, and showing the selector in Home/Daily Word.
   - Keep Bible text, School, Daily Word, Q&A, notifications, and Supabase untouched.
   - Reuses V63.22 plan data: window.om7Bible365.data.
*/
(function(){
  'use strict';

  var VERSION = 'V63.39 Bible365 Stable Single Reader';
  var LS_DAY = 'om7_bible365_selected_day_v6339';
  var OLD_KEYS = {
    started: 'om7_bible365_started',
    current: 'om7_bible365_current_day',
    view: 'om7_bible365_view_day'
  };
  var FA_DIGITS = {'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};

  function getLang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || window.currentLang || 'fa'; }
    catch(e){ return 'fa'; }
  }
  function isFa(){ return getLang()==='fa'; }
  function num(v){
    var s = String(v == null ? '' : v);
    return isFa() ? s.replace(/[0-9]/g, function(x){ return FA_DIGITS[x] || x; }) : s;
  }
  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }
  function T(key){
    var l = getLang();
    var dict = {
      fa: {
        title:'برنامه ۳۶۵ روزه مطالعه کتاب‌مقدس',
        pickerTitle:'انتخاب روز برنامه ۳۶۵ روزه',
        help:'روز مورد نظر را انتخاب کنید؛ خواندنی‌های همان روز پایین نمایش داده می‌شود.',
        selectDay:'انتخاب روز', day:'روز', previous:'روز قبل', next:'روز بعد',
        readings:'خواندنی‌های این روز', chapters:'متن کامل فصل‌ها', goChapter:'رفتن به باب',
        back:'بازگشت', missing:'متن این فصل در دیتای فعلی کتاب‌مقدس پیدا نشد.', loading:'در حال آماده‌سازی برنامه ۳۶۵ روزه...'
      },
      en: {
        title:'365-Day Bible Reading Plan', pickerTitle:'Select a day in the 365-day plan',
        help:'Choose a day; that day’s readings will appear below.', selectDay:'Select Day', day:'Day', previous:'Previous Day', next:'Next Day',
        readings:'Readings for this day', chapters:'Full chapter text', goChapter:'Go to chapter',
        back:'Back', missing:'This chapter text was not found in the current Bible data.', loading:'Preparing the 365-day reading plan...'
      },
      hr: {
        title:'365-dnevni plan čitanja Biblije', pickerTitle:'Odaberite dan u 365-dnevnom planu',
        help:'Odaberite dan; čitanja za taj dan prikazat će se ispod.', selectDay:'Odaberi dan', day:'Dan', previous:'Prethodni dan', next:'Sljedeći dan',
        readings:'Čitanja za ovaj dan', chapters:'Cijeli tekst poglavlja', goChapter:'Idi na poglavlje',
        back:'Natrag', missing:'Tekst ovog poglavlja nije pronađen u trenutnim podacima.', loading:'Priprema 365-dnevnog plana čitanja...'
      }
    };
    return (dict[l] && dict[l][key]) || dict.fa[key] || key;
  }
  function safeDay(v){
    var n = parseInt(v, 10);
    if(!isFinite(n) || n < 1) return 1;
    if(n > 365) return 365;
    return n;
  }
  function getDay(){
    try { return safeDay(localStorage.getItem(LS_DAY) || localStorage.getItem(OLD_KEYS.view) || localStorage.getItem(OLD_KEYS.current) || '1'); }
    catch(e){ return 1; }
  }
  function setDay(day){
    day = safeDay(day);
    try {
      localStorage.setItem(LS_DAY, String(day));
      localStorage.setItem(OLD_KEYS.started, '1');
      localStorage.setItem(OLD_KEYS.current, String(day));
      localStorage.setItem(OLD_KEYS.view, String(day));
    } catch(e){}
    return day;
  }
  function getPlan(){
    return (window.om7Bible365 && Array.isArray(window.om7Bible365.data)) ? window.om7Bible365.data : [];
  }
  function getEntry(day){
    var plan = getPlan();
    return plan[safeDay(day)-1] || null;
  }
  function getBook(bookId){
    var books = (window.bibleReaderData && window.bibleReaderData.books) || [];
    for(var i=0; i<books.length; i++){ if(books[i].id === bookId) return books[i]; }
    return {id:bookId, fa:bookId, en:bookId, hr:bookId};
  }
  function bookName(book){
    var l = getLang();
    return (book && (book[l] || book.fa || book.en || book.hr || book.id)) || '';
  }
  function getTextLang(){
    try { if(typeof window.getBibleTextLang === 'function') return window.getBibleTextLang(); } catch(e){}
    var l = getLang();
    return l === 'hr' ? 'hr' : (l === 'en' ? 'en' : 'fa');
  }
  function getVerses(bookId, chapter){
    var chapters = (window.bibleReaderData && window.bibleReaderData.chapters) || {};
    var ch = ((chapters[bookId] || {})[String(chapter)] || {});
    var l = getTextLang();
    if(l === 'fa' && ch.fa && ch.fa.length) return ch.fa;
    if(l === 'en' && ch.en && ch.en.length) return ch.en;
    if(l === 'hr' && ch.hr && ch.hr.length) return ch.hr;
    return (ch.fa && ch.fa.length ? ch.fa : null) || (ch.en && ch.en.length ? ch.en : null) || (ch.hr && ch.hr.length ? ch.hr : null) || [];
  }
  function verseHtml(v){
    var n = v && (v.v || v.verse || v.number || '');
    var tx = v && (v.t || v.text || v.value || '');
    return '<p class="bible-verse-line"><strong>' + esc(num(n)) + '</strong> ' + esc(tx) + '</p>';
  }
  function localizedTitle(entry, day){
    var l = getLang();
    if(entry && entry.title){ return entry.title[l] || entry.title.fa || entry.title.en || entry.title.hr || (T('day') + ' ' + num(day)); }
    return T('day') + ' ' + num(day);
  }
  function localizedRefs(entry){
    var l = getLang();
    if(entry && entry.references){ return entry.references[l] || entry.references.fa || entry.references.en || entry.references.hr || ''; }
    return '';
  }
  function dayOptions(day){
    var out = '';
    for(var i=1; i<=365; i++) out += '<option value="' + i + '"' + (i===day?' selected':'') + '>' + esc(T('day') + ' ' + num(i)) + '</option>';
    return out;
  }
  function render365(){
    var day = getDay();
    var entry = getEntry(day);
    var refs = entry && Array.isArray(entry.refs) ? entry.refs : [];
    var dir = isFa() ? 'rtl' : 'ltr';
    var align = isFa() ? 'right' : 'left';
    if(!entry){
      return '<div class="om7-v6339-root" dir="' + dir + '" style="text-align:' + align + '"><div class="card"><h2>' + esc(T('title')) + '</h2><p>' + esc(T('loading')) + '</p></div></div>';
    }
    var html = '';
    html += '<div id="om7Bible365StableReaderV6339" class="om7-v6339-root" dir="' + dir + '" style="text-align:' + align + '">';
    html += '<button type="button" class="btn ghost bible-back-btn" data-bible-view="home">← ' + esc(T('back')) + '</button>';
    html += '<div class="card om7-v6339-picker"><h3>' + esc(T('pickerTitle')) + '</h3><p class="small">' + esc(T('help')) + '</p>';
    html += '<label class="om7-v6339-label" for="om7V6339DaySelect">' + esc(T('selectDay')) + '</label>';
    html += '<select id="om7V6339DaySelect" class="om7-v6339-select" data-om7-v6339-day>' + dayOptions(day) + '</select>';
    html += '<div class="btn-row om7-v6339-row"><button type="button" class="btn light" data-om7-v6339-prev ' + (day<=1?'disabled':'') + '>← ' + esc(T('previous')) + '</button><button type="button" class="btn primary" data-om7-v6339-next ' + (day>=365?'disabled':'') + '>' + esc(T('next')) + ' →</button></div>';
    html += '</div>';
    html += '<div class="card om7-v6339-reading"><h3>' + esc(localizedTitle(entry, day)) + '</h3><h4>' + esc(T('readings')) + '</h4><p><strong>' + esc(localizedRefs(entry)) + '</strong></p><div class="reading-plan-list">';
    refs.forEach(function(item){
      var b = getBook(item.bookId), label = bookName(b) + ' ' + num(item.chapter), id = 'om7v6339-' + item.bookId + '-' + item.chapter;
      html += '<button type="button" class="reading-plan-item om7-v6339-jump" data-target="' + esc(id) + '"><strong>' + esc(label) + '</strong><small>' + esc(T('goChapter')) + '</small></button>';
    });
    html += '</div></div>';
    html += '<div class="om7-v6339-chapters"><h3>' + esc(T('chapters')) + '</h3>';
    refs.forEach(function(item){
      var b = getBook(item.bookId), label = bookName(b) + ' ' + num(item.chapter), id = 'om7v6339-' + item.bookId + '-' + item.chapter, verses = getVerses(item.bookId, item.chapter);
      html += '<div class="card bible-chapter-card om7-v6339-chapter" id="' + esc(id) + '"><h3>' + esc(label) + '</h3>';
      if(verses.length){ verses.forEach(function(v){ html += verseHtml(v); }); }
      else html += '<p class="small">' + esc(T('missing')) + '</p>';
      html += '</div>';
    });
    html += '</div></div>';
    return html;
  }
  function rerender(){
    try { if(typeof window.renderBibleReader === 'function') window.renderBibleReader(); } catch(e){}
  }
  function scrollRoot(){
    setTimeout(function(){ var r=document.getElementById('om7Bible365StableReaderV6339'); if(r) r.scrollIntoView({block:'start', behavior:'smooth'}); }, 80);
  }
  function bindEvents(){
    document.addEventListener('change', function(ev){
      var sel = ev.target && ev.target.closest && ev.target.closest('[data-om7-v6339-day]');
      if(!sel) return;
      ev.preventDefault(); ev.stopPropagation();
      setDay(sel.value); rerender(); scrollRoot();
    }, true);
    document.addEventListener('click', function(ev){
      var root = ev.target && ev.target.closest && ev.target.closest('#om7Bible365StableReaderV6339');
      if(!root) return;
      var back = ev.target.closest('[data-bible-view]');
      if(back){ return; }
      var prev = ev.target.closest('[data-om7-v6339-prev]');
      var next = ev.target.closest('[data-om7-v6339-next]');
      var jump = ev.target.closest('.om7-v6339-jump');
      if(prev || next){
        ev.preventDefault(); ev.stopPropagation();
        var d = getDay();
        if(prev && !prev.disabled) d--;
        if(next && !next.disabled) d++;
        setDay(d); rerender(); scrollRoot(); return;
      }
      if(jump){
        ev.preventDefault(); ev.stopPropagation();
        var id = jump.getAttribute('data-target');
        var el = id ? document.getElementById(id) : null;
        if(el) el.scrollIntoView({block:'start', behavior:'smooth'});
      }
    }, true);
  }
  function injectStyle(){
    if(document.getElementById('om7-v6339-style')) return;
    var st = document.createElement('style');
    st.id = 'om7-v6339-style';
    st.textContent = ''+
      '#om7Bible365StableReaderV6339{display:block;width:100%;max-width:980px;margin:0 auto 120px;box-sizing:border-box;padding:0 14px;clear:both;overflow-x:hidden}'+
      '#om7Bible365StableReaderV6339 *{box-sizing:border-box}'+
      '#om7Bible365StableReaderV6339 .card{width:100%;max-width:100%;margin-left:auto;margin-right:auto}'+
      '#om7Bible365StableReaderV6339 .om7-v6339-picker{border-top:5px solid var(--green);background:linear-gradient(160deg,#fff,#F7FFF8)}'+
      '#om7Bible365StableReaderV6339 .om7-v6339-reading{border-top:4px solid var(--blue)}'+
      '#om7Bible365StableReaderV6339 .om7-v6339-label{display:block;font-weight:900;margin:12px 0 7px;color:var(--blue)}'+
      '#om7Bible365StableReaderV6339 .om7-v6339-select{width:100%;max-width:100%;padding:13px 14px;border-radius:16px;border:1px solid var(--line);font-weight:900;font-size:16px;color:var(--blue);background:#fff}'+
      '#om7Bible365StableReaderV6339 .om7-v6339-row{margin-top:14px}'+
      '#om7Bible365StableReaderV6339 .om7-v6339-row .btn[disabled]{opacity:.45;cursor:not-allowed}'+
      '#om7Bible365StableReaderV6339 .reading-plan-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}'+
      '#om7Bible365StableReaderV6339 .reading-plan-item{cursor:pointer;width:100%}'+
      '#om7Bible365StableReaderV6339 .om7-v6339-chapter{margin-top:14px}'+
      '@media(max-width:700px){#om7Bible365StableReaderV6339{padding:0 10px}.om7-v6339-row{display:flex!important;gap:10px!important;flex-wrap:wrap}.om7-v6339-row .btn{flex:1 1 130px}.om7-v6339-picker,.om7-v6339-reading,#om7Bible365StableReaderV6339 .bible-chapter-card{border-radius:22px!important;padding:18px!important}}';
    document.head.appendChild(st);
  }
  function patch(){
    var plan = getPlan();
    if(!plan.length) return false;
    if(window.__om7V6339Patched) return true;
    var oldRenderReadingPlan = window.renderReadingPlan;
    window.renderReadingPlan = function(planName){
      if(planName === 'one') return render365();
      return typeof oldRenderReadingPlan === 'function' ? oldRenderReadingPlan(planName) : '';
    };
    if(window.om7Bible365){
      window.om7Bible365.render = render365;
      window.om7Bible365.openDay = function(day){ setDay(day); rerender(); };
      window.om7Bible365.complete = function(day){ setDay((day ? safeDay(day) : getDay()) + 1); rerender(); };
      window.om7Bible365.start = function(){ setDay(1); rerender(); };
      window.om7Bible365.version = VERSION;
    }
    window.__om7V6339Patched = true;
    return true;
  }
  function run(){
    injectStyle();
    if(patch()){
      try {
        var isReader = document.getElementById('bibleReader') && document.getElementById('bibleReader').classList.contains('active');
        var view = localStorage.getItem('bibleReaderView');
        if(isReader && view === 'reading-one' && typeof window.renderBibleReader === 'function') window.renderBibleReader();
      } catch(e){}
    } else {
      setTimeout(run, 300);
    }
  }
  bindEvents();
  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  setTimeout(run, 250);
  setTimeout(run, 1000);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
