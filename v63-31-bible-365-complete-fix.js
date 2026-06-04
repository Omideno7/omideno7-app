/* Omideno7 V63.31 — Bible 365 Complete Fix
   Purpose:
   - Adds a visible Day 1–365 selector to Bible > Read Bible in One Year.
   - Makes changing the day update the visible readings.
   - Keeps V63.22 plan data and Bible chapter data.
   - Does not touch Daily Word, School, Admin, Supabase, OneSignal, or bottom navigation.
*/
(function(){
  'use strict';

  var VERSION = 'V63.31';
  var ROOT_ID = 'om7Bible365CompleteFixV6331';
  var LS_DAY = 'om7_bible365_selected_day_v6331';

  var OLD_KEYS = {
    started: 'om7_bible365_started',
    current: 'om7_bible365_current_day',
    view: 'om7_bible365_view_day'
  };

  var FA_DIGITS = {
    '0':'۰','1':'۱','2':'۲','3':'۳','4':'۴',
    '5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'
  };

  function getLang(){
    try{
      return localStorage.getItem('lang') || document.documentElement.lang || window.currentLang || 'fa';
    }catch(e){
      return 'fa';
    }
  }

  function isFa(){
    return getLang() === 'fa';
  }

  function num(v){
    var s = String(v == null ? '' : v);
    if(!isFa()) return s;
    return s.replace(/[0-9]/g, function(x){ return FA_DIGITS[x] || x; });
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function t(key){
    var l = getLang();
    var dict = {
      fa: {
        title: 'انتخاب روز برنامه ۳۶۵ روزه',
        help: 'روز مورد نظر را انتخاب کنید؛ خواندنی‌های همان روز پایین نمایش داده می‌شود.',
        selectDay: 'انتخاب روز',
        day: 'روز',
        previous: 'روز قبل',
        next: 'روز بعد',
        readings: 'خواندنی‌های این روز',
        chapters: 'متن کامل فصل‌ها',
        openChapter: 'رفتن به باب',
        missing: 'متن این فصل در دیتای فعلی کتاب‌مقدس پیدا نشد.',
        noPlan: 'داده برنامه ۳۶۵ روزه هنوز لود نشده است.'
      },
      en: {
        title: 'Select a day in the 365-day plan',
        help: 'Choose a day; that day’s readings will appear below.',
        selectDay: 'Select Day',
        day: 'Day',
        previous: 'Previous Day',
        next: 'Next Day',
        readings: 'Readings for this day',
        chapters: 'Full chapter text',
        openChapter: 'Go to chapter',
        missing: 'This chapter text was not found in the current Bible data.',
        noPlan: 'The 365-day plan data has not loaded yet.'
      },
      hr: {
        title: 'Odaberite dan u 365-dnevnom planu',
        help: 'Odaberite dan; čitanja za taj dan prikazat će se ispod.',
        selectDay: 'Odaberi dan',
        day: 'Dan',
        previous: 'Prethodni dan',
        next: 'Sljedeći dan',
        readings: 'Čitanja za ovaj dan',
        chapters: 'Cijeli tekst poglavlja',
        openChapter: 'Idi na poglavlje',
        missing: 'Tekst ovog poglavlja nije pronađen u trenutnim podacima.',
        noPlan: 'Podaci za 365-dnevni plan još nisu učitani.'
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
    try{
      return safeDay(
        localStorage.getItem(LS_DAY) ||
        localStorage.getItem(OLD_KEYS.view) ||
        localStorage.getItem(OLD_KEYS.current) ||
        '1'
      );
    }catch(e){
      return 1;
    }
  }

  function setDay(day){
    day = safeDay(day);
    try{
      localStorage.setItem(LS_DAY, String(day));
      localStorage.setItem(OLD_KEYS.started, '1');
      localStorage.setItem(OLD_KEYS.current, String(day));
      localStorage.setItem(OLD_KEYS.view, String(day));
    }catch(e){}
    return day;
  }

  function getPlan(){
    if(window.om7Bible365 && Array.isArray(window.om7Bible365.data)){
      return window.om7Bible365.data;
    }
    return [];
  }

  function getEntry(day){
    var plan = getPlan();
    return plan[safeDay(day) - 1] || null;
  }

  function getBook(bookId){
    var books = (window.bibleReaderData && window.bibleReaderData.books) || [];
    for(var i=0; i<books.length; i++){
      if(books[i].id === bookId) return books[i];
    }
    return {id: bookId, fa: bookId, en: bookId, hr: bookId};
  }

  function bookName(book){
    var l = getLang();
    return (book && (book[l] || book.fa || book.en || book.hr || book.id)) || '';
  }

  function getTextLang(){
    try{
      if(typeof window.getBibleTextLang === 'function'){
        return window.getBibleTextLang();
      }
    }catch(e){}
    var l = getLang();
    return l === 'hr' ? 'hr' : (l === 'en' ? 'en' : 'fa');
  }

  function getVerses(bookId, chapter){
    var chapters = (window.bibleReaderData && window.bibleReaderData.chapters) || {};
    var ch = ((chapters[bookId] || {})[String(chapter)] || {});
    var l = getTextLang();

    if(l === 'fa' && ch.fa && ch.fa.length) return ch.fa;
    if(l === 'hr' && ch.hr && ch.hr.length) return ch.hr;
    if(l === 'en' && ch.en && ch.en.length) return ch.en;

    return (ch.fa && ch.fa.length ? ch.fa : null) ||
           (ch.en && ch.en.length ? ch.en : null) ||
           (ch.hr && ch.hr.length ? ch.hr : null) || [];
  }

  function verseHtml(v){
    var n = v && (v.v || v.verse || v.number || '');
    var text = v && (v.t || v.text || v.value || '');
    return '<p class="bible-verse-line"><strong>' + esc(num(n)) + '</strong> ' + esc(text) + '</p>';
  }

  function localizedTitle(entry, day){
    var l = getLang();
    if(entry && entry.title){
      return entry.title[l] || entry.title.fa || entry.title.en || entry.title.hr || (t('day') + ' ' + num(day));
    }
    return t('day') + ' ' + num(day);
  }

  function localizedRefs(entry){
    var l = getLang();
    if(entry && entry.references){
      return entry.references[l] || entry.references.fa || entry.references.en || entry.references.hr || '';
    }
    return '';
  }

  function dayOptions(day){
    var out = '';
    for(var i=1; i<=365; i++){
      out += '<option value="' + i + '"' + (i === day ? ' selected' : '') + '>' + esc(t('day') + ' ' + num(i)) + '</option>';
    }
    return out;
  }

  function render(){
    var root = document.getElementById(ROOT_ID);
    if(!root) return;

    var day = getDay();
    var entry = getEntry(day);
    var refs = entry && Array.isArray(entry.refs) ? entry.refs : [];

    if(isFa()){
      root.dir = 'rtl';
      root.style.textAlign = 'right';
    }else{
      root.dir = 'ltr';
      root.style.textAlign = 'left';
    }

    if(!entry){
      root.innerHTML = '<div class="card om7-v6331-control"><h3>' + esc(t('title')) + '</h3><p>' + esc(t('noPlan')) + '</p></div>';
      return;
    }

    var html = '';

    html += '<div class="card om7-v6331-control">';
    html += '<h3>' + esc(t('title')) + '</h3>';
    html += '<p class="small">' + esc(t('help')) + '</p>';
    html += '<label class="om7-v6331-label" for="om7V6331DaySelect">' + esc(t('selectDay')) + '</label>';
    html += '<select id="om7V6331DaySelect" class="om7-v6331-select">' + dayOptions(day) + '</select>';
    html += '<div class="btn-row om7-v6331-row">';
    html += '<button type="button" class="btn light" id="om7V6331Prev"' + (day <= 1 ? ' disabled' : '') + '>← ' + esc(t('previous')) + '</button>';
    html += '<button type="button" class="btn primary" id="om7V6331Next"' + (day >= 365 ? ' disabled' : '') + '>' + esc(t('next')) + ' →</button>';
    html += '</div>';
    html += '</div>';

    html += '<div class="card om7-v6331-reading">';
    html += '<h3>' + esc(localizedTitle(entry, day)) + '</h3>';
    html += '<h4>' + esc(t('readings')) + '</h4>';
    html += '<p><strong>' + esc(localizedRefs(entry)) + '</strong></p>';
    html += '<div class="reading-plan-list">';
    refs.forEach(function(item){
      var b = getBook(item.bookId);
      var label = bookName(b) + ' ' + num(item.chapter);
      var id = 'om7v6331-' + item.bookId + '-' + item.chapter;
      html += '<button type="button" class="reading-plan-item om7-v6331-jump" data-target="' + esc(id) + '"><strong>' + esc(label) + '</strong><small>' + esc(t('openChapter')) + '</small></button>';
    });
    html += '</div>';
    html += '</div>';

    html += '<div class="om7-v6331-chapters">';
    html += '<h3>' + esc(t('chapters')) + '</h3>';
    refs.forEach(function(item){
      var b = getBook(item.bookId);
      var label = bookName(b) + ' ' + num(item.chapter);
      var id = 'om7v6331-' + item.bookId + '-' + item.chapter;
      var verses = getVerses(item.bookId, item.chapter);
      html += '<div class="card bible-chapter-card" id="' + esc(id) + '">';
      html += '<h3>' + esc(label) + '</h3>';
      if(verses.length){
        verses.forEach(function(v){ html += verseHtml(v); });
      }else{
        html += '<p class="small">' + esc(t('missing')) + '</p>';
      }
      html += '</div>';
    });
    html += '</div>';

    root.innerHTML = html;
    bindControls();
  }

  function bindControls(){
    var select = document.getElementById('om7V6331DaySelect');
    var prev = document.getElementById('om7V6331Prev');
    var next = document.getElementById('om7V6331Next');

    if(select){
      select.onchange = function(){
        setDay(this.value);
        render();
        scrollToRoot();
      };
    }
    if(prev){
      prev.onclick = function(ev){
        if(ev) ev.preventDefault();
        setDay(getDay() - 1);
        render();
        scrollToRoot();
      };
    }
    if(next){
      next.onclick = function(ev){
        if(ev) ev.preventDefault();
        setDay(getDay() + 1);
        render();
        scrollToRoot();
      };
    }

    var jumps = document.querySelectorAll('.om7-v6331-jump');
    for(var i=0; i<jumps.length; i++){
      jumps[i].onclick = function(ev){
        if(ev) ev.preventDefault();
        var id = this.getAttribute('data-target');
        var el = document.getElementById(id);
        if(el) el.scrollIntoView({block:'start', behavior:'smooth'});
      };
    }
  }

  function scrollToRoot(){
    setTimeout(function(){
      var root = document.getElementById(ROOT_ID);
      if(root) root.scrollIntoView({block:'start', behavior:'smooth'});
    }, 80);
  }

  function looksLikeBible365Page(){
    var txt = document.body ? (document.body.textContent || '') : '';
    return /خواندن کتاب مقدس در یک سال|365|۳۶۵|one year|jednoj godini/i.test(txt);
  }

  function findHeading(){
    var heads = document.querySelectorAll('h1,h2,h3');
    for(var i=0; i<heads.length; i++){
      var s = heads[i].textContent || '';
      if(/خواندن کتاب مقدس در یک سال|365|۳۶۵|one year|jednoj godini/i.test(s)) return heads[i];
    }
    return null;
  }

  function hideOldCards(scope){
    if(!scope) return;
    var selectors = [
      '.reading-plan-card',
      '.plan-day-card',
      '.bible365-manual-card',
      '#om7Bible365SimpleSelector',
      '#om7Bible365LiveReaderV6329'
    ];
    selectors.forEach(function(sel){
      var nodes = scope.querySelectorAll(sel);
      for(var i=0; i<nodes.length; i++){
        if(nodes[i].id === ROOT_ID || nodes[i].closest('#' + ROOT_ID)) continue;
        nodes[i].style.display = 'none';
      }
    });
  }

  function install(){
    if(!looksLikeBible365Page()) return;
    if(!window.om7Bible365 || !Array.isArray(window.om7Bible365.data)) return;

    var heading = findHeading();
    if(!heading || !heading.parentNode) return;

    var root = document.getElementById(ROOT_ID);
    if(!root){
      root = document.createElement('div');
      root.id = ROOT_ID;
      root.className = 'om7-v6331-root';
      heading.parentNode.insertBefore(root, heading.nextSibling);
    }

    // Hide the old/side title that squeezes the reading column on mobile/tablet.
    try{ heading.style.display = 'none'; }catch(e){}

    // Force the containers around the Bible 365 plan to stop using two-column/flex layouts.
    try{
      var p = root.parentElement, depth = 0;
      while(p && p !== document.body && depth < 6){
        p.style.display = 'block';
        p.style.gridTemplateColumns = '1fr';
        p.style.width = '100%';
        p.style.maxWidth = '980px';
        p.style.marginLeft = 'auto';
        p.style.marginRight = 'auto';
        p.style.boxSizing = 'border-box';
        if(window.innerWidth < 700){
          p.style.paddingLeft = '14px';
          p.style.paddingRight = '14px';
        }
        p = p.parentElement;
        depth++;
      }
    }catch(e){}

    hideOldCards(heading.parentNode);
    render();
  }

  function patchOldApi(){
    if(!window.om7Bible365 || window.om7Bible365.__v6331Patched) return;

    window.om7Bible365.openDay = function(day){
      setDay(day);
      install();
      render();
    };
    window.om7Bible365.complete = function(day){
      setDay((day ? safeDay(day) : getDay()) + 1);
      install();
      render();
    };
    window.om7Bible365.start = function(){
      setDay(1);
      install();
      render();
    };

    window.om7Bible365.__v6331Patched = true;
  }

  function injectStyle(){
    if(document.getElementById('om7-v6331-style')) return;
    var st = document.createElement('style');
    st.id = 'om7-v6331-style';
    st.textContent = '' +
      '#om7Bible365CompleteFixV6331{display:block!important;width:100%!important;max-width:980px!important;margin:0 auto 120px!important;box-sizing:border-box!important;padding:0!important;clear:both!important}' +
      '#om7Bible365CompleteFixV6331 *{box-sizing:border-box}' +
      '#om7Bible365CompleteFixV6331 .card{width:100%!important;max-width:100%!important;margin-left:auto!important;margin-right:auto!important}' +
      '#om7Bible365CompleteFixV6331 .om7-v6331-chapters{display:block!important;width:100%!important;max-width:100%!important}' +
      '#om7Bible365CompleteFixV6331 .bible-chapter-card{width:100%!important;max-width:100%!important}' +
      '@media(max-width:700px){#om7Bible365CompleteFixV6331{padding-left:0!important;padding-right:0!important}.om7-v6331-control,.om7-v6331-reading,#om7Bible365CompleteFixV6331 .bible-chapter-card{border-radius:22px!important;padding:18px!important}.om7-v6331-select{font-size:16px!important}.om7-v6331-row{display:flex!important;gap:10px!important}.om7-v6331-row .btn{flex:1 1 auto!important;min-width:130px!important}}' +
      '.om7-v6331-control{border-top:5px solid var(--green);background:linear-gradient(160deg,#fff,#F7FFF8)}' +
      '.om7-v6331-label{display:block;font-weight:900;margin:12px 0 7px;color:var(--blue)}' +
      '.om7-v6331-select{width:100%;max-width:100%;padding:13px 14px;border-radius:16px;border:1px solid var(--line);font-weight:900;font-size:16px;color:var(--blue);background:#fff}' +
      '.om7-v6331-row{margin-top:14px}' +
      '.om7-v6331-row .btn[disabled]{opacity:.45;cursor:not-allowed}' +
      '.om7-v6331-reading{border-top:4px solid var(--blue)}' +
      '.om7-v6331-jump{cursor:pointer}' +
      '#om7Bible365CompleteFixV6331 .bible-chapter-card{margin-top:14px}' +
      '.fa #om7Bible365CompleteFixV6331{direction:rtl;text-align:right}';
    document.head.appendChild(st);
  }

  function run(){
    injectStyle();
    patchOldApi();
    install();
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  document.addEventListener('click', function(){ setTimeout(run, 120); }, true);
  setTimeout(run, 300);
  setTimeout(run, 1000);
  setTimeout(run, 2000);
  setInterval(run, 1500);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
