/* Omideno7 V63.23 — Daily Word scroll stability fix
   Purpose: stop Daily Word page jumping without changing other app sections.
*/
(function(){
  'use strict';

  const VERSION = 'V63.23';

  function injectStyle(){
    if(document.getElementById('v6323-daily-scroll-style')) return;

    const st = document.createElement('style');
    st.id = 'v6323-daily-scroll-style';
    st.textContent = `
      html{
        scroll-behavior:auto !important;
        overflow-anchor:none;
      }

      body{
        overflow-anchor:none;
      }

      #word,
      #word.active{
        overflow-anchor:none;
        min-height:calc(100vh - 120px);
      }

      #word .word-box,
      #word [data-daily-card]{
        overflow-anchor:none;
        contain:layout paint;
      }

      #word .daily-scripture-expand{
        overflow-anchor:none;
      }

      #word .daily-scripture-expand summary{
        touch-action:manipulation;
      }
    `;
    document.head.appendChild(st);
  }

  function stabilizeWordDetails(){
    const word = document.getElementById('word');
    if(!word) return;

    word.querySelectorAll('.daily-scripture-expand').forEach(details=>{
      if(details.dataset.v6323Stable === '1') return;
      details.dataset.v6323Stable = '1';

      details.addEventListener('toggle', function(){
        if(!document.getElementById('word')?.classList.contains('active')) return;

        const y = window.scrollY || window.pageYOffset || 0;

        requestAnimationFrame(()=>{
          window.scrollTo(0, y);
        });

        setTimeout(()=>{
          window.scrollTo(0, y);
        }, 80);
      }, true);
    });
  }

  function patchShowPage(){
    if(typeof window.showPage !== 'function') return;
    if(window.showPage.__v6323Patched) return;

    const originalShowPage = window.showPage;

    window.showPage = function(id){
      const beforeY = window.scrollY || window.pageYOffset || 0;
      const isWord = id === 'word';

      originalShowPage.apply(this, arguments);

      if(isWord){
        requestAnimationFrame(()=>{
          window.scrollTo(0, 0);
          stabilizeWordDetails();
        });

        setTimeout(()=>{
          window.scrollTo(0, 0);
          stabilizeWordDetails();
        }, 120);
      }else{
        requestAnimationFrame(()=>{
          if(id !== 'word' && beforeY < 5) return;
        });
      }
    };

    window.showPage.__v6323Patched = true;
  }

  function run(){
    injectStyle();
    patchShowPage();
    stabilizeWordDetails();
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  document.addEventListener('click', function(){
    setTimeout(run, 80);
  }, true);

  setTimeout(run, 300);
  setTimeout(run, 1000);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
