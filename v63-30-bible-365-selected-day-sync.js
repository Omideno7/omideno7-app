/* Omideno7 V63.30 — Bible 365 selected day sync
   Purpose: make the V63.28 day selector actually change the V63.22 plan day.
*/
(function(){
  'use strict';

  var VERSION = 'V63.30';

  var STORAGE_STARTED = 'om7_bible365_started';
  var STORAGE_CURRENT = 'om7_bible365_current_day';
  var STORAGE_VIEW = 'om7_bible365_view_day';

  function safeDay(v){
    var n = parseInt(v, 10);
    if(!isFinite(n) || n < 1) return 1;
    if(n > 365) return 365;
    return n;
  }

  function setBible365Day(day){
    day = safeDay(day);

    try{
      localStorage.setItem(STORAGE_STARTED, '1');
      localStorage.setItem(STORAGE_CURRENT, String(day));
      localStorage.setItem(STORAGE_VIEW, String(day));
    }catch(e){}

    try{
      if(window.om7Bible365){
        window.om7Bible365.openDay = function(d){
          d = safeDay(d);
          localStorage.setItem(STORAGE_STARTED, '1');
          localStorage.setItem(STORAGE_CURRENT, String(d));
          localStorage.setItem(STORAGE_VIEW, String(d));
          refresh();
        };

        window.om7Bible365.complete = function(d){
          d = safeDay(d || day);
          var next = d >= 365 ? 365 : d + 1;
          localStorage.setItem(STORAGE_STARTED, '1');
          localStorage.setItem(STORAGE_CURRENT, String(next));
          localStorage.setItem(STORAGE_VIEW, String(next));
          refresh();
        };
      }
    }catch(e){}
  }

  function refresh(){
    try{
      if(typeof window.renderBibleReader === 'function'){
        window.renderBibleReader();
      }
    }catch(e){}

    setTimeout(function(){
      try{
        if(typeof window.renderBibleReader === 'function'){
          window.renderBibleReader();
        }
      }catch(e){}
    }, 120);
  }

  function patchSelector(){
    var sel = document.getElementById('om7Bible365DaySelectV6328');
    if(sel && !sel.dataset.v6330Bound){
      sel.dataset.v6330Bound = '1';

      sel.addEventListener('change', function(ev){
        ev.preventDefault();
        ev.stopPropagation();

        setBible365Day(this.value);
        refresh();

        setTimeout(function(){
          var card = document.getElementById('om7Bible365SimpleSelector');
          if(card) card.scrollIntoView({block:'start', behavior:'smooth'});
        }, 180);
      }, true);
    }

    var nextButtons = Array.prototype.slice.call(document.querySelectorAll('button'));
    nextButtons.forEach(function(btn){
      var tx = btn.textContent || '';
      if(btn.dataset.v6330Bound) return;

      if(/روز بعد|Next Day|Sljedeći dan/i.test(tx)){
        btn.dataset.v6330Bound = '1';
        btn.addEventListener('click', function(ev){
          ev.preventDefault();
          ev.stopPropagation();

          var current = safeDay(localStorage.getItem(STORAGE_VIEW) || '1');
          setBible365Day(current + 1);
          refresh();
        }, true);
      }

      if(/روز قبل|Previous Day|Prethodni dan/i.test(tx)){
        btn.dataset.v6330Bound = '1';
        btn.addEventListener('click', function(ev){
          ev.preventDefault();
          ev.stopPropagation();

          var current = safeDay(localStorage.getItem(STORAGE_VIEW) || '1');
          setBible365Day(current - 1);
          refresh();
        }, true);
      }
    });
  }

  function run(){
    try{
      if(window.om7Bible365 && !window.om7Bible365.__v6330Patched){
        var oldStart = window.om7Bible365.start;

        window.om7Bible365.start = function(){
          setBible365Day(1);
          refresh();
        };

        window.om7Bible365.__v6330Patched = true;
      }
    }catch(e){}

    patchSelector();
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  document.addEventListener('click', function(){
    setTimeout(run, 80);
  }, true);

  setTimeout(run, 300);
  setTimeout(run, 1000);
  setTimeout(run, 2000);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
