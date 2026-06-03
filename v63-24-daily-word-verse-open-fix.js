/* Omideno7 V63.24 — Daily Word verse open fix
   Purpose: make "Show verse" buttons open without reintroducing page jumping.
*/
(function(){
  'use strict';

  const VERSION = 'V63.24';

  function getDailyRoot(){
    return document.querySelector('#word [data-daily-card], [data-daily-card]');
  }

  function forceDailyWordRefreshKeepScroll(){
    const root = getDailyRoot();
    if(!root) return;

    const y = window.scrollY || window.pageYOffset || 0;

    root.removeAttribute('data-daily-word-version');

    try{
      if(window.omideno7DailyWordV6320 && typeof window.omideno7DailyWordV6320.render === 'function'){
        window.omideno7DailyWordV6320.render();
      }else if(typeof window.renderDaily === 'function'){
        window.renderDaily();
      }
    }catch(e){}

    requestAnimationFrame(function(){
      window.scrollTo(0, y);
    });

    setTimeout(function(){
      window.scrollTo(0, y);
    }, 80);
  }

  document.addEventListener('click', function(ev){
    const btn = ev.target.closest && ev.target.closest('[data-dw6320-toggle]');
    if(!btn) return;

    setTimeout(forceDailyWordRefreshKeepScroll, 20);
  }, true);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
