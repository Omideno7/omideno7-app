/* Omideno7 V63.31 — Bible 365 Complete Fix
   Adds a stable 1–365 day selector and directly renders the selected day readings.
   Scope: Bible Reader > One Year / 365-day plan only.
*/
(function(){
  'use strict';

  var VERSION = 'V63.31';
  var LS_DAY = 'om7_bible365_selected_day_v6331';
  var FA_DIGITS = {'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};

  function lang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || window.currentLang || 'fa'; }
    catch(e){ return 'fa'; }
  }

  function isFa(){ return lang() === 'fa'; }

  function num(v){
    var s = String(v == null ? '' : v);
    return isFa() ? s.replace(/[0-9]/g, function(x){ return FA_DIGITS[x] || x; }) : s;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function t(key){
    var L = lang();
    var fa = {
      title:'خواندن کتاب مقدس در یک سال',
      pickerTitle:'انتخاب روز برنامه ۳۶۵ روزه',
      help:'روز مورد نظر را انتخاب کنید؛ خواندنی‌های همان روز پایین نمایش داده می‌شود.',
      select:'انتخاب روز', day:'روز', prev:'روز قبل', next:'روز بعد',
      readings:'خواندنی‌های این روز', chapters:'متن کامل باب‌ها', open:'برو به باب',
      back:'بازگشت به کتاب', missing:'متن این باب در دیتای فعلی کتاب‌مقدس پیدا نشد.',
      noPlan:'برنامه ۳۶۵ روزه هنوز لود نشده است. چند ثانیه صبر کنید و دوباره وارد بخش کتاب شوید.'
    };
    var en = {
      title:'Read the Bible in One Year',
      pickerTitle:'Select a day in the 365-day plan',
      help:'Choose a day; the readings for that day will appear below.',
      select:'Select Day', day:'Day', prev:'Previous Day', next:'Next Day',
      readings:'Readings for this day', chapters:'Full chapter text', open:'Go to chapter',
      back:'Back to Bible', missing:'This chapter text was not found in the current Bible data.',
      noPlan:'The 365-day plan has not loaded yet. Wait a few seconds and open Bible again.'
    };
    var hr = {
      title:'Pročitaj Bibliju u jednoj godini',
      pickerTitle:'Odaberite dan u 365-dnevnom planu',
      help:'Odaberite dan; čitanja za taj dan prikazat će se ispod.',
      select:'Odaberi dan', day:'Dan', prev:'Prethodni dan', next:'Sljedeći dan',
      readings:'Čitanja za ovaj dan', chapters:'Cijeli tekst poglavlja', open:'Idi na poglavlje',
      back:'Natrag na Bibliju', missing:'Tekst ovog poglavlja nije pronađen u trenutnim podacima.',
      noPlan:'365-dnevni plan još nije učitan. Pričekajte nekoliko sekundi i ponovno otvorite Bibliju.'
    };
    var d = L === 'hr' ? hr : (L === 'en' ? en : fa);
    return d[key] || fa[key] || key;
  }

  function safeDay(v){
    var n = parseInt(v, 10);
    if(!isFinite(n) || n < 1) return 1;
    if(n > 365) return 365;
    return n;
  }

  function getDay(){
    try {
      return safeDay(localStorage.getItem(LS_DAY) || localStorage.getItem('om7_bible365_view_day') || localStorage.getItem('om7_bible365_current_day') || '1');
    } catch(e){ return 1; }
  }

  function setDay(day){
    day = safeDay(day);
    try {
      localStorage.setItem(LS_DAY, String(day));
      localStorage.setItem('om7_bible365_started', '1');
      localStorage.setItem('om7_bible365_current_day', String(day));
      localStorage.setItem('om7_bible365_view_day', String(day));
    } catch(e){}
    return day;
  }

  function plan(){
    if(window.om7Bible365 && Array.isArray(window.om7Bible365.data)) return window.om7Bible365.data;
    if(window.OM7_BIBLE_365_PLAN && Array.isArray(window.OM7_BIBLE_365_PLAN)) return window.OM7_BIBLE_365_PLAN;
    return [];
  }

  function entryFor(day){
    var p = plan();
    return p[day - 1] || null;
  }

  function bibleBooks(){
    return (window.bibleReaderData && Array.isArray(window.bibleReaderData.books)) ? window.bibleReaderData.books : [];
  }

  function getBook(bookId){
    var books = bibleBooks();
    for(var i=0;i<books.length;i++) if(books[i].id === bookId) return books[i];
    return {id:bookId, fa:bookId, en:bookId, hr:bookId};
  }

  function bookName(book){
    var L = lang();
    return (book && (book[L] || book.fa || book.en || book.hr || book.id)) || '';
  }

  function textLang(){
    try { if(typeof window.getBibleTextLang === 'function') return window.getBibleTextLang(); } catch(e){}
    return lang() === 'hr' ? 'hr' : (lang() === 'fa' ? 'fa' : 'en');
  }

  function verses(bookId, chapter){
    var data = window.bibleReaderData || {};
    var chapters = data.chapters || {};
    var ch = ((chapters[bookId] || {})[String(chapter)] || {});
    var L = textLang();
    if(L === 'fa' && ch.fa && ch.fa.length) return ch.fa;
    if(L === 'hr' && ch.hr && ch.hr.length) return ch.hr;
    if(L === 'en' && ch.en && ch.en.length) return ch.en;
    return (ch.fa && ch.fa.length ? ch.fa : null) || (ch.en && ch.en.length ? ch.en : null) || (ch.hr && ch.hr.length ? ch.hr : null) || [];
  }

  function verseLine(bookId, chapter, v){
    try { if(typeof window.renderBibleVerse === 'function') return window.renderBibleVerse(bookId, chapter, v); } catch(e){}
    var n = v && (v.v || v.verse || v.number || '');
    var text = v && (v.t || v.text || v.value || '');
    return '<p class="bible-verse-line" data-book="'+esc(bookId)+'" data-chapter="'+esc(chapter)+'" data-verse="'+esc(n)+'"><strong>'+esc(num(n))+'</strong> '+esc(text)+'</p>';
  }

  function options(selected){
    var html = '';
    for(var i=1;i<=365;i++){
      html += '<option value="'+i+'"'+(i===selected?' selected':'')+'>'+esc(t('day')+' '+num(i))+'</option>';
    }
    return html;
  }

  function entryTitle(entry, day){
    var L = lang();
    if(entry && entry.title) return entry.title[L] || entry.title.fa || entry.title.en || entry.title.hr || (t('day')+' '+num(day));
    return t('day')+' '+num(day);
  }

  function entryRefs(entry){
    var L = lang();
    if(entry && entry.references) return entry.references[L] || entry.references.fa || entry.references.en || entry.references.hr || '';
    return '';
  }

  function render365(){
    var p = plan();
    if(!p.length){
      return '<div class="section-title"><h2>'+esc(t('title'))+'</h2></div><div class="card"><p>'+esc(t('noPlan'))+'</p></div>';
    }

    var day = getDay();
    var entry = entryFor(day) || p[0];
    var refs = Array.isArray(entry.refs) ? entry.refs : [];
    var dir = isFa() ? ' dir="rtl" style="text-align:right"' : '';

    var html = '';
    html += '<div class="section-title"><h2>'+esc(t('title'))+'</h2></div>';
    html += '<button type="button" class="btn light" data-bible-view="home" onclick="if(window.setBibleReaderView){setBibleReaderView(\'home\')}">← '+esc(t('back'))+'</button>';

    html += '<div id="om7Bible365Complete" class="card om7-v6331-picker"'+dir+'>';
    html += '<h3>'+esc(t('pickerTitle'))+'</h3>';
    html += '<p class="small">'+esc(t('help'))+'</p>';
    html += '<label for="om7Bible365DayV6331" class="om7-v6331-label">'+esc(t('select'))+'</label>';
    html += '<select id="om7Bible365DayV6331" class="om7-v6331-select" data-om7-v6331-select>'+options(day)+'</select>';
    html += '<div class="btn-row om7-v6331-row">';
    html += '<button type="button" class="btn light" data-om7-v6331-prev '+(day<=1?'disabled':'')+'>← '+esc(t('prev'))+'</button>';
    html += '<button type="button" class="btn primary" data-om7-v6331-next '+(day>=365?'disabled':'')+'>'+esc(t('next'))+' →</button>';
    html += '</div></div>';

    html += '<div class="card om7-v6331-reading"'+dir+'>';
    html += '<h3>'+esc(entryTitle(entry, day))+'</h3>';
    html += '<h4>'+esc(t('readings'))+'</h4>';
    html += '<p><strong>'+esc(entryRefs(entry))+'</strong></p>';
    html += '<div class="reading-plan-list">';
    refs.forEach(function(item){
      var b = getBook(item.bookId);
      var label = bookName(b)+' '+num(item.chapter);
      var id = 'om7v6331-'+item.bookId+'-'+item.chapter;
      html += '<button type="button" class="reading-plan-item om7-v6331-jump" data-target="'+esc(id)+'"><strong>'+esc(label)+'</strong><small>'+esc(t('open'))+'</small></button>';
    });
    html += '</div></div>';

    html += '<div class="om7-v6331-chapters"'+dir+'><h3>'+esc(t('chapters'))+'</h3>';
    refs.forEach(function(item){
      var b = getBook(item.bookId);
      var label = bookName(b)+' '+num(item.chapter);
      var id = 'om7v6331-'+item.bookId+'-'+item.chapter;
      var vs = verses(item.bookId, item.chapter);
      html += '<div class="card bible-chapter-card om7-v6331-chapter" id="'+esc(id)+'"><h3>'+esc(label)+'</h3><div class="bible-verses">';
      if(vs.length) html += vs.map(function(v){ return verseLine(item.bookId, item.chapter, v); }).join('');
      else html += '<p class="small">'+esc(t('missing'))+'</p>';
      html += '</div></div>';
    });
    html += '</div>';
    return html;
  }

  function refresh(){
    var root = document.getElementById('bibleReaderContent');
    if(root) root.innerHTML = render365();
    bind();
  }

  function bind(){
    var sel = document.querySelector('[data-om7-v6331-select]');
    if(sel && !sel.dataset.bound6331){
      sel.dataset.bound6331 = '1';
      sel.addEventListener('change', function(){ setDay(this.value); refresh(); scrollToPicker(); });
    }
    var prev = document.querySelector('[data-om7-v6331-prev]');
    if(prev && !prev.dataset.bound6331){
      prev.dataset.bound6331 = '1';
      prev.addEventListener('click', function(){ if(!this.disabled){ setDay(getDay()-1); refresh(); scrollToPicker(); }});
    }
    var next = document.querySelector('[data-om7-v6331-next]');
    if(next && !next.dataset.bound6331){
      next.dataset.bound6331 = '1';
      next.addEventListener('click', function(){ if(!this.disabled){ setDay(getDay()+1); refresh(); scrollToPicker(); }});
    }
    document.querySelectorAll('.om7-v6331-jump').forEach(function(btn){
      if(btn.dataset.bound6331) return;
      btn.dataset.bound6331 = '1';
      btn.addEventListener('click', function(){
        var id = this.getAttribute('data-target');
        var el = document.getElementById(id);
        if(el) el.scrollIntoView({block:'start', behavior:'smooth'});
      });
    });
  }

  function scrollToPicker(){
    setTimeout(function(){
      var el = document.getElementById('om7Bible365Complete');
      if(el) el.scrollIntoView({block:'start', behavior:'smooth'});
    }, 80);
  }

  function injectStyle(){
    if(document.getElementById('om7-v6331-style')) return;
    var st = document.createElement('style');
    st.id = 'om7-v6331-style';
    st.textContent = ''+
      '.om7-v6331-picker{border-top:5px solid var(--green);background:linear-gradient(160deg,#fff,#F7FFF8)}'+
      '.om7-v6331-label{display:block;margin:12px 0 7px;font-weight:900;color:var(--blue)}'+
      '.om7-v6331-select{width:100%;max-width:100%;padding:13px 14px;border-radius:16px;border:1px solid var(--line);background:#fff;color:var(--blue);font-size:16px;font-weight:900}'+
      '.om7-v6331-row{margin-top:14px}.om7-v6331-row .btn[disabled]{opacity:.45;cursor:not-allowed}'+
      '.om7-v6331-chapter{scroll-margin-top:90px}.om7-v6331-jump{cursor:pointer}';
    document.head.appendChild(st);
  }

  function install(){
    injectStyle();

    var oldRenderReadingPlan = window.renderReadingPlan;
    window.renderReadingPlan = function(planName){
      if(planName === 'one' || planName === '365' || planName === 'year' || planName == null) return render365();
      if(typeof oldRenderReadingPlan === 'function') return oldRenderReadingPlan.apply(this, arguments);
      return render365();
    };

    function patchOm7(){
      if(window.om7Bible365){
        window.om7Bible365.render = render365;
        window.om7Bible365.openDay = function(day){ setDay(day); refresh(); };
        window.om7Bible365.complete = function(){ setDay(getDay()+1); refresh(); };
        window.om7Bible365.start = function(){ setDay(1); refresh(); };
      }
    }
    patchOm7();
    setTimeout(patchOm7, 300);
    setTimeout(patchOm7, 1000);

    // If user is already on the one-year plan screen, replace it immediately.
    setTimeout(function(){
      var root = document.getElementById('bibleReaderContent');
      var txt = root ? (root.textContent || '') : '';
      if(root && /خواندن کتاب مقدس در یک سال|Read the Bible in One Year|365|۳۶۵|jednoj godini/i.test(txt)) refresh();
    }, 250);
  }

  document.addEventListener('DOMContentLoaded', install);
  window.addEventListener('load', install);
  document.addEventListener('click', function(){ setTimeout(bind, 120); }, true);
  setTimeout(install, 500);
  setTimeout(install, 1500);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
