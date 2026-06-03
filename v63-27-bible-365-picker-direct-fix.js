/* Omideno7 V63.27 — Bible 365 direct day picker fix
   Purpose: add a working 1–365 day selector directly above the existing V63.22 plan.
*/
(function(){
  'use strict';

  const VERSION = 'V63.27';

  const STORAGE = {
    started: 'om7_bible365_started',
    current: 'om7_bible365_current_day',
    view: 'om7_bible365_view_day',
    completed: 'om7_bible365_completed_days',
    selected: 'om7_bible365_selected_day_v6327'
  };

  const FA_DIGITS = {'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};

  function lang(){
    try{
      return localStorage.getItem('lang') || document.documentElement.lang || window.currentLang || 'fa';
    }catch(e){
      return 'fa';
    }
  }

  function faNum(v){
    return lang() === 'fa'
      ? String(v).replace(/[0-9]/g, x => FA_DIGITS[x] || x)
      : String(v);
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function t(key){
    const dict = {
      fa:{
        title:'انتخاب روز برنامه ۳۶۵ روزه',
        subtitle:'روز مورد نظر را انتخاب کنید. خواندنی‌های همان روز پایین نمایش داده می‌شود.',
        select:'انتخاب روز',
        day:'روز',
        prev:'روز قبل',
        next:'روز بعد'
      },
      en:{
        title:'Select a day in the 365-day plan',
        subtitle:'Choose the day you want. The readings for that day will appear below.',
        select:'Select Day',
        day:'Day',
        prev:'Previous Day',
        next:'Next Day'
      },
      hr:{
        title:'Odaberite dan u 365-dnevnom planu',
        subtitle:'Odaberite dan. Čitanja za taj dan prikazat će se ispod.',
        select:'Odaberi dan',
        day:'Dan',
        prev:'Prethodni dan',
        next:'Sljedeći dan'
      }
    };

    const L = lang();
    return (dict[L] && dict[L][key]) || dict.fa[key] || key;
  }

  function safeDay(v){
    const n = parseInt(v, 10);
    if(!Number.isFinite(n) || n < 1) return 1;
    if(n > 365) return 365;
    return n;
  }

  function getDay(){
    return safeDay(
      localStorage.getItem(STORAGE.selected)
      || localStorage.getItem(STORAGE.view)
      || localStorage.getItem(STORAGE.current)
      || '1'
    );
  }

  function setDay(day){
    day = safeDay(day);

    localStorage.setItem(STORAGE.started, '1');
    localStorage.setItem(STORAGE.current, String(day));
    localStorage.setItem(STORAGE.view, String(day));
    localStorage.setItem(STORAGE.selected, String(day));

    return day;
  }

  function optionsHtml(selected){
    let out = '';

    for(let i = 1; i <= 365; i++){
      out += '<option value="' + i + '"' + (i === selected ? ' selected' : '') + '>' +
        esc(t('day') + ' ' + faNum(i)) +
      '</option>';
    }

    return out;
  }

  function pickerHtml(){
    const selected = getDay();

    return `
      <div class="card om7-v6327-picker-card">
        <h3>${esc(t('title'))}</h3>
        <p class="small">${esc(t('subtitle'))}</p>

        <label class="om7-v6327-label" for="om7V6327DaySelect">
          ${esc(t('select'))}
        </label>

        <select id="om7V6327DaySelect" class="om7-v6327-select" data-om7-v6327-day-select>
          ${optionsHtml(selected)}
        </select>

        <div class="btn-row om7-v6327-btn-row">
          <button type="button" class="btn light" data-om7-v6327-prev ${selected <= 1 ? 'disabled' : ''}>
            ← ${esc(t('prev'))}
          </button>

          <button type="button" class="btn primary" data-om7-v6327-next ${selected >= 365 ? 'disabled' : ''}>
            ${esc(t('next'))} →
          </button>
        </div>
      </div>
    `;
  }

  function rerender(){
    try{
      if(typeof window.renderBibleReader === 'function'){
        window.renderBibleReader();
        return;
      }
    }catch(e){}

    try{
      const root = document.getElementById('bibleReaderContent')
        || document.querySelector('#bible .bible-reader-content')
        || document.querySelector('#bible');

      if(root && window.om7Bible365 && typeof window.om7Bible365.render === 'function'){
        root.innerHTML = window.om7Bible365.render();
      }
    }catch(e){}
  }

  function injectStyle(){
    if(document.getElementById('om7-v6327-style')) return;

    const st = document.createElement('style');
    st.id = 'om7-v6327-style';
    st.textContent = `
      .om7-v6327-picker-card{
        border-top:5px solid var(--green);
        background:linear-gradient(160deg,#fff,#F7FFF8);
      }

      .om7-v6327-label{
        display:block;
        margin:12px 0 7px;
        font-weight:900;
        color:var(--blue);
      }

      .om7-v6327-select{
        width:100%;
        max-width:100%;
        padding:13px 14px;
        border-radius:16px;
        border:1px solid var(--line);
        background:#fff;
        color:var(--blue);
        font-size:16px;
        font-weight:900;
      }

      .om7-v6327-btn-row{
        margin-top:14px;
      }

      .om7-v6327-btn-row .btn[disabled]{
        opacity:.45;
        cursor:not-allowed;
      }

      .fa .om7-v6327-picker-card{
        direction:rtl;
        text-align:right;
      }
    `;

    document.head.appendChild(st);
  }

  function install(){
    if(!window.om7Bible365 || !Array.isArray(window.om7Bible365.data) || typeof window.om7Bible365.render !== 'function'){
      return false;
    }

    if(window.om7Bible365.__v6327Patched) return true;

    const oldRender = window.om7Bible365.render.bind(window.om7Bible365);
    const oldRenderReadingPlan = window.renderReadingPlan;

    window.om7Bible365.render = function(){
      return pickerHtml() + oldRender();
    };

    window.om7Bible365.openDay = function(day){
      setDay(day);
      rerender();
    };

    window.om7Bible365.complete = function(){
      setDay(getDay() + 1);
      rerender();
    };

    window.om7Bible365.start = function(){
      setDay(1);
      rerender();
    };

    window.renderReadingPlan = function(plan){
      if(plan === 'one'){
        return window.om7Bible365.render();
      }

      if(typeof oldRenderReadingPlan === 'function'){
        return oldRenderReadingPlan(plan);
      }

      return window.om7Bible365.render();
    };

    window.om7Bible365.__v6327Patched = true;

    return true;
  }

  document.addEventListener('change', function(ev){
    const sel = ev.target.closest && ev.target.closest('[data-om7-v6327-day-select]');
    if(!sel) return;

    setDay(sel.value);
    rerender();

    setTimeout(function(){
      const card = document.querySelector('.om7-v6327-picker-card');
      if(card) card.scrollIntoView({block:'start', behavior:'smooth'});
    }, 80);
  }, true);

  document.addEventListener('click', function(ev){
    const prev = ev.target.closest && ev.target.closest('[data-om7-v6327-prev]');
    const next = ev.target.closest && ev.target.closest('[data-om7-v6327-next]');

    if(!prev && !next) return;

    ev.preventDefault();
    ev.stopPropagation();

    let day = getDay();

    if(prev && !prev.disabled) day--;
    if(next && !next.disabled) day++;

    setDay(day);
    rerender();

    setTimeout(function(){
      const card = document.querySelector('.om7-v6327-picker-card');
      if(card) card.scrollIntoView({block:'start', behavior:'smooth'});
    }, 80);
  }, true);

  function run(){
    injectStyle();

    if(!install()){
      setTimeout(run, 300);
      return;
    }

    try{
      const txt = document.body ? document.body.textContent || '' : '';
      if(/۳۶۵|365|یک سال|one year|365-day/i.test(txt)){
        rerender();
      }
    }catch(e){}
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  setTimeout(run, 300);
  setTimeout(run, 1000);
  setTimeout(run, 2000);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
