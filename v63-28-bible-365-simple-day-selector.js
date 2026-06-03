/* Omideno7 V63.28 — Bible 365 simple day selector
   Adds a stable Day 1–365 selector to the existing one-year Bible plan.
*/
(function(){
  'use strict';

  var VERSION = 'V63.28';

  var STORAGE_STARTED = 'om7_bible365_started';
  var STORAGE_CURRENT = 'om7_bible365_current_day';
  var STORAGE_VIEW = 'om7_bible365_view_day';

  var FA_DIGITS = {
    '0':'۰','1':'۱','2':'۲','3':'۳','4':'۴',
    '5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'
  };

  function getLang(){
    try {
      return localStorage.getItem('lang') || document.documentElement.lang || 'fa';
    } catch(e) {
      return 'fa';
    }
  }

  function faNum(value){
    var s = String(value);
    if(getLang() !== 'fa') return s;
    return s.replace(/[0-9]/g, function(x){ return FA_DIGITS[x] || x; });
  }

  function txt(key){
    var l = getLang();

    var fa = {
      title: 'انتخاب روز برنامه ۳۶۵ روزه',
      help: 'روز مورد نظر را انتخاب کنید. خواندنی‌های همان روز پایین نمایش داده می‌شود.',
      select: 'انتخاب روز',
      day: 'روز',
      prev: 'روز قبل',
      next: 'روز بعد'
    };

    var en = {
      title: 'Select a day in the 365-day plan',
      help: 'Choose a day. The readings for that day will appear below.',
      select: 'Select Day',
      day: 'Day',
      prev: 'Previous Day',
      next: 'Next Day'
    };

    var hr = {
      title: 'Odaberite dan u 365-dnevnom planu',
      help: 'Odaberite dan. Čitanja za taj dan prikazat će se ispod.',
      select: 'Odaberi dan',
      day: 'Dan',
      prev: 'Prethodni dan',
      next: 'Sljedeći dan'
    };

    var dict = l === 'hr' ? hr : (l === 'en' ? en : fa);
    return dict[key] || fa[key] || key;
  }

  function safeDay(value){
    var n = parseInt(value, 10);
    if(!isFinite(n) || n < 1) return 1;
    if(n > 365) return 365;
    return n;
  }

  function getDay(){
    return safeDay(localStorage.getItem(STORAGE_VIEW) || localStorage.getItem(STORAGE_CURRENT) || '1');
  }

  function setDay(day){
    day = safeDay(day);
    localStorage.setItem(STORAGE_STARTED, '1');
    localStorage.setItem(STORAGE_CURRENT, String(day));
    localStorage.setItem(STORAGE_VIEW, String(day));
    return day;
  }

  function rerenderBible(){
    try {
      if(typeof window.renderBibleReader === 'function'){
        window.renderBibleReader();
      }
    } catch(e) {}

    setTimeout(addSelector, 80);
    setTimeout(addSelector, 250);
  }

  function makeButton(label, className){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = className || 'btn light';
    btn.textContent = label;
    return btn;
  }

  function addSelector(){
    var text = document.body ? (document.body.textContent || '') : '';

    if(!/خواندن کتاب مقدس در یک سال|365-day|365|۳۶۵|one year|jednoj godini/i.test(text)){
      return;
    }

    if(document.getElementById('om7Bible365SimpleSelector')){
      return;
    }

    var heading = null;
    var allHeadings = document.querySelectorAll('h1,h2,h3');
    for(var i = 0; i < allHeadings.length; i++){
      var hText = allHeadings[i].textContent || '';
      if(/خواندن کتاب مقدس در یک سال|365-day|365|۳۶۵|one year|jednoj godini/i.test(hText)){
        heading = allHeadings[i];
        break;
      }
    }

    if(!heading) return;

    var currentDay = getDay();

    var card = document.createElement('div');
    card.id = 'om7Bible365SimpleSelector';
    card.className = 'card';
    card.style.borderTop = '5px solid var(--green)';
    card.style.marginTop = '14px';
    card.style.marginBottom = '14px';

    if(getLang() === 'fa'){
      card.dir = 'rtl';
      card.style.textAlign = 'right';
    }

    var title = document.createElement('h3');
    title.textContent = txt('title');
    card.appendChild(title);

    var help = document.createElement('p');
    help.className = 'small';
    help.textContent = txt('help');
    card.appendChild(help);

    var label = document.createElement('label');
    label.htmlFor = 'om7Bible365DaySelectV6328';
    label.textContent = txt('select');
    label.style.display = 'block';
    label.style.fontWeight = '900';
    label.style.margin = '12px 0 7px';
    label.style.color = 'var(--blue)';
    card.appendChild(label);

    var select = document.createElement('select');
    select.id = 'om7Bible365DaySelectV6328';
    select.style.width = '100%';
    select.style.padding = '13px 14px';
    select.style.borderRadius = '16px';
    select.style.border = '1px solid var(--line)';
    select.style.fontWeight = '900';
    select.style.fontSize = '16px';
    select.style.color = 'var(--blue)';

    for(var d = 1; d <= 365; d++){
      var opt = document.createElement('option');
      opt.value = String(d);
      opt.textContent = txt('day') + ' ' + faNum(d);
      if(d === currentDay) opt.selected = true;
      select.appendChild(opt);
    }

    select.addEventListener('change', function(){
      setDay(this.value);
      rerenderBible();
      setTimeout(function(){
        var c = document.getElementById('om7Bible365SimpleSelector');
        if(c) c.scrollIntoView({block:'start', behavior:'smooth'});
      }, 150);
    });

    card.appendChild(select);

    var row = document.createElement('div');
    row.className = 'btn-row';
    row.style.marginTop = '14px';

    var prev = makeButton('← ' + txt('prev'), 'btn light');
    var next = makeButton(txt('next') + ' →', 'btn primary');

    if(currentDay <= 1){
      prev.disabled = true;
      prev.style.opacity = '.45';
    }

    if(currentDay >= 365){
      next.disabled = true;
      next.style.opacity = '.45';
    }

    prev.addEventListener('click', function(){
      if(getDay() <= 1) return;
      setDay(getDay() - 1);
      rerenderBible();
    });

    next.addEventListener('click', function(){
      if(getDay() >= 365) return;
      setDay(getDay() + 1);
      rerenderBible();
    });

    row.appendChild(prev);
    row.appendChild(next);
    card.appendChild(row);

    if(heading.parentNode){
      heading.parentNode.insertBefore(card, heading.nextSibling);
    }
  }

  function patchOm7Bible365(){
    if(!window.om7Bible365 || window.om7Bible365.__v6328Patched) return;

    window.om7Bible365.openDay = function(day){
      setDay(day);
      rerenderBible();
    };

    window.om7Bible365.complete = function(){
      setDay(getDay() + 1);
      rerenderBible();
    };

    window.om7Bible365.start = function(){
      setDay(1);
      rerenderBible();
    };

    window.om7Bible365.__v6328Patched = true;
  }

  function run(){
    patchOm7Bible365();
    addSelector();
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  document.addEventListener('click', function(){
    setTimeout(run, 120);
  }, true);

  setTimeout(run, 300);
  setTimeout(run, 1000);
  setTimeout(run, 2000);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
