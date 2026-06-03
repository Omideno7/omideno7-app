/* Omideno7 V63.29 — Bible 365 Live Day Reader
   Directly renders selected day readings from window.om7Bible365.data.
*/
(function(){
  'use strict';

  var VERSION = 'V63.29';
  var LS_DAY = 'om7_bible365_live_selected_day_v6329';

  var FA_DIGITS = {'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};

  function lang(){
    try{
      return localStorage.getItem('lang') || document.documentElement.lang || 'fa';
    }catch(e){
      return 'fa';
    }
  }

  function faNum(v){
    var s = String(v);
    if(lang() !== 'fa') return s;
    return s.replace(/[0-9]/g, function(x){ return FA_DIGITS[x] || x; });
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function t(key){
    var L = lang();

    var fa = {
      title:'انتخاب روز برنامه ۳۶۵ روزه',
      help:'روز را انتخاب کنید؛ خواندنی‌های همان روز همین‌جا نمایش داده می‌شود.',
      select:'انتخاب روز',
      day:'روز',
      prev:'روز قبل',
      next:'روز بعد',
      refs:'خواندنی‌های این روز',
      chapters:'متن کامل فصل‌ها',
      missing:'متن این فصل در دیتای فعلی کتاب‌مقدس پیدا نشد.'
    };

    var en = {
      title:'Select a day in the 365-day plan',
      help:'Choose a day; that day’s readings will appear here.',
      select:'Select Day',
      day:'Day',
      prev:'Previous Day',
      next:'Next Day',
      refs:'Readings for this day',
      chapters:'Full chapter text',
      missing:'This chapter text was not found in the current Bible data.'
    };

    var hr = {
      title:'Odaberite dan u 365-dnevnom planu',
      help:'Odaberite dan; čitanja za taj dan prikazat će se ovdje.',
      select:'Odaberi dan',
      day:'Dan',
      prev:'Prethodni dan',
      next:'Sljedeći dan',
      refs:'Čitanja za ovaj dan',
      chapters:'Cijeli tekst poglavlja',
      missing:'Tekst ovog poglavlja nije pronađen u trenutnim podacima.'
    };

    var dict = L === 'hr' ? hr : (L === 'en' ? en : fa);
    return dict[key] || fa[key] || key;
  }

  function safeDay(v){
    var n = parseInt(v, 10);
    if(!isFinite(n) || n < 1) return 1;
    if(n > 365) return 365;
    return n;
  }

  function getDay(){
    return safeDay(localStorage.getItem(LS_DAY) || '1');
  }

  function setDay(day){
    day = safeDay(day);
    localStorage.setItem(LS_DAY, String(day));

    try{
      localStorage.setItem('om7_bible365_started', '1');
      localStorage.setItem('om7_bible365_current_day', String(day));
      localStorage.setItem('om7_bible365_view_day', String(day));
    }catch(e){}

    return day;
  }

  function getPlan(){
    return window.om7Bible365 && Array.isArray(window.om7Bible365.data)
      ? window.om7Bible365.data
      : [];
  }

  function getEntry(day){
    var plan = getPlan();
    return plan[day - 1] || plan[0] || null;
  }

  function getBook(bookId){
    var data = window.bibleReaderData || {};
    var books = data.books || [];
    for(var i = 0; i < books.length; i++){
      if(books[i].id === bookId) return books[i];
    }
    return {id:bookId, fa:bookId, en:bookId, hr:bookId};
  }

  function bookName(book){
    var L = lang();
    return book[L] || book.fa || book.en || book.hr || book.id || '';
  }

  function textLang(){
    try{
      if(typeof window.getBibleTextLang === 'function') return window.getBibleTextLang();
    }catch(e){}
    return lang() === 'hr' ? 'hr' : (lang() === 'fa' ? 'fa' : 'en');
  }

  function getVerses(bookId, chapter){
    var data = window.bibleReaderData || {};
    var chapters = data.chapters || {};
    var ch = ((chapters[bookId] || {})[String(chapter)] || {});
    var L = textLang();

    if(L === 'fa' && ch.fa && ch.fa.length) return ch.fa;
    if(L === 'hr' && ch.hr && ch.hr.length) return ch.hr;
    if(L === 'en' && ch.en && ch.en.length) return ch.en;

    return (ch.fa && ch.fa.length ? ch.fa : null)
      || (ch.en && ch.en.length ? ch.en : null)
      || (ch.hr && ch.hr.length ? ch.hr : null)
      || [];
  }

  function verseHtml(v){
    var n = v && (v.v || v.verse || v.number || '');
    var text = v && (v.t || v.text || v.value || '');
    return '<p class="bible-verse-line"><strong>' + esc(faNum(n)) + '</strong> ' + esc(text) + '</p>';
  }

  function optionsHtml(day){
    var html = '';
    for(var i = 1; i <= 365; i++){
      html += '<option value="' + i + '"' + (i === day ? ' selected' : '') + '>' + esc(t('day') + ' ' + faNum(i)) + '</option>';
    }
    return html;
  }

  function renderLiveReader(){
    var day = getDay();
    var entry = getEntry(day);
    var L = lang();

    if(!entry) return;

    var title = entry.title && (entry.title[L] || entry.title.fa || entry.title.en || entry.title.hr)
      ? (entry.title[L] || entry.title.fa || entry.title.en || entry.title.hr)
      : t('day') + ' ' + faNum(day);

    var refsText = entry.references && (entry.references[L] || entry.references.fa || entry.references.en || entry.references.hr)
      ? (entry.references[L] || entry.references.fa || entry.references.en || entry.references.hr)
      : '';

    var refs = Array.isArray(entry.refs) ? entry.refs : [];

    var html = ''
      + '<div class="card om7-v6329-control">'
      + '<h3>' + esc(t('title')) + '</h3>'
      + '<p class="small">' + esc(t('help')) + '</p>'
      + '<label style="display:block;font-weight:900;margin:12px 0 7px;color:var(--blue)">' + esc(t('select')) + '</label>'
      + '<select id="om7V6329Select" style="width:100%;padding:13px 14px;border-radius:16px;border:1px solid var(--line);font-weight:900;font-size:16px;color:var(--blue)">'
      + optionsHtml(day)
      + '</select>'
      + '<div class="btn-row" style="margin-top:14px">'
      + '<button type="button" class="btn light" id="om7V6329Prev"' + (day <= 1 ? ' disabled' : '') + '>← ' + esc(t('prev')) + '</button>'
      + '<button type="button" class="btn primary" id="om7V6329Next"' + (day >= 365 ? ' disabled' : '') + '>' + esc(t('next')) + ' →</button>'
      + '</div>'
      + '</div>';

    html += '<div class="card om7-v6329-reading">';
    html += '<h3>' + esc(title) + '</h3>';
    html += '<h4>' + esc(t('refs')) + '</h4>';
    html += '<p><strong>' + esc(refsText) + '</strong></p>';

    html += '<div class="reading-plan-list">';
    refs.forEach(function(item){
      var b = getBook(item.bookId);
      var label = bookName(b) + ' ' + faNum(item.chapter);
      html += '<button type="button" class="reading-plan-item om7-v6329-jump" data-target="om7v6329-' + esc(item.bookId) + '-' + esc(item.chapter) + '"><strong>' + esc(label) + '</strong><small>باز کردن باب</small></button>';
    });
    html += '</div>';
    html += '</div>';

    html += '<div class="om7-v6329-chapters">';
    html += '<h3>' + esc(t('chapters')) + '</h3>';

    refs.forEach(function(item){
      var b = getBook(item.bookId);
      var label = bookName(b) + ' ' + faNum(item.chapter);
      var verses = getVerses(item.bookId, item.chapter);

      html += '<div class="card bible-chapter-card" id="om7v6329-' + esc(item.bookId) + '-' + esc(item.chapter) + '">';
      html += '<h3>' + esc(label) + '</h3>';

      if(verses.length){
        verses.forEach(function(v){
          html += verseHtml(v);
        });
      }else{
        html += '<p class="small">' + esc(t('missing')) + '</p>';
      }

      html += '</div>';
    });

    html += '</div>';

    var root = document.getElementById('om7Bible365LiveReaderV6329');
    if(root){
      root.innerHTML = html;
      bindControls();
    }
  }

  function bindControls(){
    var select = document.getElementById('om7V6329Select');
    var prev = document.getElementById('om7V6329Prev');
    var next = document.getElementById('om7V6329Next');

    if(select && !select.dataset.bound){
      select.dataset.bound = '1';
      select.addEventListener('change', function(){
        setDay(this.value);
        renderLiveReader();
        scrollTopReader();
      });
    }

    if(prev && !prev.dataset.bound){
      prev.dataset.bound = '1';
      prev.addEventListener('click', function(){
        setDay(getDay() - 1);
        renderLiveReader();
        scrollTopReader();
      });
    }

    if(next && !next.dataset.bound){
      next.dataset.bound = '1';
      next.addEventListener('click', function(){
        setDay(getDay() + 1);
        renderLiveReader();
        scrollTopReader();
      });
    }

    document.querySelectorAll('.om7-v6329-jump').forEach(function(btn){
      if(btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function(){
        var id = this.getAttribute('data-target');
        var el = document.getElementById(id);
        if(el) el.scrollIntoView({block:'start', behavior:'smooth'});
      });
    });
  }

  function scrollTopReader(){
    setTimeout(function(){
      var el = document.getElementById('om7Bible365LiveReaderV6329');
      if(el) el.scrollIntoView({block:'start', behavior:'smooth'});
    }, 80);
  }

  function hideOldReadingArea(root){
    var oldCards = root.querySelectorAll('.reading-plan-card, .plan-day-card');
    oldCards.forEach(function(el){
      if(el.closest('#om7Bible365LiveReaderV6329')) return;
      el.style.display = 'none';
    });
  }

  function install(){
    var text = document.body ? (document.body.textContent || '') : '';
    if(!/خواندن کتاب مقدس در یک سال|365|۳۶۵|one year|jednoj godini/i.test(text)) return;
    if(!window.om7Bible365 || !Array.isArray(window.om7Bible365.data)) return;

    var heading = null;
    var heads = document.querySelectorAll('h1,h2,h3');
    for(var i = 0; i < heads.length; i++){
      var ht = heads[i].textContent || '';
      if(/خواندن کتاب مقدس در یک سال|365|۳۶۵|one year|jednoj godini/i.test(ht)){
        heading = heads[i];
        break;
      }
    }

    if(!heading) return;

    var root = document.getElementById('om7Bible365LiveReaderV6329');
    if(!root){
      root = document.createElement('div');
      root.id = 'om7Bible365LiveReaderV6329';

      if(lang() === 'fa'){
        root.dir = 'rtl';
        root.style.textAlign = 'right';
      }

      heading.parentNode.insertBefore(root, heading.nextSibling);
    }

    renderLiveReader();
    hideOldReadingArea(heading.parentNode);
  }

  function run(){
    install();
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  document.addEventListener('click', function(){
    setTimeout(run, 150);
  }, true);

  setTimeout(run, 300);
  setTimeout(run, 1000);
  setTimeout(run, 2000);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
