/* Omideno7 V63.36 — Bible 365 Mobile Layout Fix
   Purpose: center and widen the Bible 365 day selector/reading cards on mobile.
   Safe CSS-only runtime patch. It does not change Bible data, Supabase, School, Word, Notifications, or Q&A.
*/
(function(){
  'use strict';

  const VERSION = 'V63.36-Bible365-Mobile-Layout-Fix';

  function injectStyle(){
    if(document.getElementById('v6336-bible365-mobile-layout-fix-style')) return;

    const st = document.createElement('style');
    st.id = 'v6336-bible365-mobile-layout-fix-style';
    st.textContent = `
      /* Scope: Bible 365 page only */
      #bible,
      #book,
      .bible-reader,
      .bible-reader-content,
      #bibleReaderContent{
        box-sizing:border-box;
        width:100%;
        max-width:100%;
      }

      /* Center the 365 plan shell/cards created by V63.31 */
      .om7-bible365-shell,
      .om7-bible365-picker-shell,
      .om7-bible365-full-text,
      .om7-bible365-chapters,
      .om7-v6329-chapters,
      #om7Bible365LiveReaderV6329,
      #om7Bible365SimpleSelector{
        width:100% !important;
        max-width:760px !important;
        margin-left:auto !important;
        margin-right:auto !important;
        box-sizing:border-box !important;
      }

      .om7-bible365-picker-card,
      .om7-bible365-reading-card,
      .om7-bible365-control,
      .om7-v6327-picker-card,
      .om7-v6329-control,
      .om7-v6329-reading,
      .bible365-manual-card,
      #om7Bible365SimpleSelector,
      .reading-plan-card,
      .plan-day-card,
      .bible-chapter-card,
      .om7-bible365-chapter{
        width:100% !important;
        max-width:760px !important;
        margin-left:auto !important;
        margin-right:auto !important;
        box-sizing:border-box !important;
      }

      /* Keep chapter buttons/cards from becoming narrow columns */
      .reading-plan-list{
        width:100% !important;
        display:grid !important;
        grid-template-columns:repeat(auto-fit,minmax(220px,1fr)) !important;
        gap:12px !important;
        box-sizing:border-box !important;
      }

      .reading-plan-item,
      .om7-bible365-ref-btn,
      .om7-v6329-jump{
        width:100% !important;
        min-width:0 !important;
        box-sizing:border-box !important;
      }

      /* Mobile-specific correction */
      @media(max-width:640px){
        main,
        .page,
        #bible,
        #book,
        #bibleReaderContent,
        .bible-reader-content{
          width:100% !important;
          max-width:100% !important;
          padding-left:12px !important;
          padding-right:12px !important;
          box-sizing:border-box !important;
        }

        .om7-bible365-shell,
        .om7-bible365-picker-shell,
        .om7-bible365-full-text,
        .om7-bible365-chapters,
        #om7Bible365SimpleSelector,
        #om7Bible365LiveReaderV6329{
          width:100% !important;
          max-width:100% !important;
          margin-left:auto !important;
          margin-right:auto !important;
          padding-left:0 !important;
          padding-right:0 !important;
        }

        .om7-bible365-picker-card,
        .om7-bible365-reading-card,
        .om7-bible365-control,
        .om7-v6327-picker-card,
        .om7-v6329-control,
        .om7-v6329-reading,
        .bible365-manual-card,
        #om7Bible365SimpleSelector,
        .reading-plan-card,
        .plan-day-card,
        .bible-chapter-card,
        .om7-bible365-chapter{
          width:100% !important;
          max-width:100% !important;
          margin-left:auto !important;
          margin-right:auto !important;
          border-radius:22px !important;
          padding-left:18px !important;
          padding-right:18px !important;
        }

        .reading-plan-list{
          grid-template-columns:1fr !important;
        }

        .om7-bible365-select,
        #om7Bible365DaySelectV6328,
        #om7V6329Select,
        select[data-om7-bible365-select],
        select[data-om7-v6327-day-select]{
          width:100% !important;
          max-width:100% !important;
          box-sizing:border-box !important;
        }

        .btn-row,
        .om7-bible365-nav,
        .om7-v6327-btn-row{
          justify-content:center !important;
          width:100% !important;
        }
      }
    `;

    document.head.appendChild(st);
  }

  function fixExistingInlineWidths(){
    try{
      const selectors = [
        '.om7-bible365-picker-card',
        '.om7-bible365-reading-card',
        '.reading-plan-card',
        '.plan-day-card',
        '#om7Bible365SimpleSelector',
        '.bible-chapter-card'
      ].join(',');

      document.querySelectorAll(selectors).forEach(function(el){
        el.style.width = '100%';
        el.style.maxWidth = window.innerWidth <= 640 ? '100%' : '760px';
        el.style.marginLeft = 'auto';
        el.style.marginRight = 'auto';
        el.style.boxSizing = 'border-box';
      });
    }catch(e){}
  }

  function run(){
    injectStyle();
    fixExistingInlineWidths();
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  window.addEventListener('resize', function(){ setTimeout(run, 80); });
  document.addEventListener('click', function(){ setTimeout(run, 120); }, true);
  setTimeout(run, 300);
  setTimeout(run, 1000);

  window.OMIDENO7_BIBLE365_LAYOUT_FIX = VERSION;
})();
