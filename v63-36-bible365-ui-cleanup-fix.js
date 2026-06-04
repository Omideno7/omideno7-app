/* Omideno7 V63.36 Bible 365 UI Cleanup Fix
   - Hides the "You haven't started the plan" intro card
   - Hides the side heading that squeezes the content column
   - Forces full-width centered layout for Bible 365 reading content on mobile/tablet
   Safe, page-scoped, non-destructive.
*/
(function(){
  'use strict';

  var VERSION = 'V63.36 Bible365 UI Cleanup';

  var RX_TITLE = /برنامه\s*365\s*روزه\s*مطالعه\s*کتاب.?مقدس|365\s*day\s*bible\s*reading\s*plan|365\s*dnevn/i;
  var RX_START_CARD = /هنوز\s*برنامه\s*را\s*شروع\s*نکرده.?اید|شروع\s*برنامه|you\s*haven'?t\s*started\s*this\s*plan|start\s*plan|još\s*niste\s*započeli/i;
  var RX_PICKER = /انتخاب\s*روز\s*برنامه\s*365\s*روزه|select\s*a\s*day.*365|odaberite\s*dan/i;

  function text(el){
    return (el && (el.innerText || el.textContent) || '').replace(/\s+/g,' ').trim();
  }

  function setStyles(el, map){
    if(!el) return;
    Object.keys(map).forEach(function(k){ el.style[k] = map[k]; });
  }

  function likelyBible365Page(){
    var bodyText = text(document.body);
    return RX_TITLE.test(bodyText) || RX_PICKER.test(bodyText) || /day\s*of\s*365|روز\s*\d+\s*از\s*365/.test(bodyText);
  }

  function getCards(){
    return Array.prototype.slice.call(document.querySelectorAll('.card, .bible-card, .plan-card, .reading-plan-card, .section-card, div'));
  }

  function findStartIntroCard(){
    return getCards().find(function(el){
      var t = text(el);
      return RX_START_CARD.test(t) && /کتاب.?مقدس|Bible|plan|برنامه/i.test(t);
    }) || null;
  }

  function findSideHeading(){
    var all = Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3,h4,p,div,strong'));
    return all.find(function(el){
      var t = text(el);
      if(!RX_TITLE.test(t)) return false;
      // Prefer the side heading, not giant page title inside top page section
      var rect = el.getBoundingClientRect();
      return rect.width < window.innerWidth * 0.45 || rect.left > window.innerWidth * 0.45 || /365/.test(t);
    }) || null;
  }

  function findDayContentCard(){
    var all = getCards();
    return all.find(function(el){
      var t = text(el);
      return /روز\s*\d+\s*از\s*365|day\s*\d+\s*of\s*365/i.test(t) || /خواندنی.?های\s*این\s*روز|readings\s*for\s*this\s*day/i.test(t);
    }) || null;
  }

  function cleanupLayout(){
    if(!likelyBible365Page()) return;

    // hide intro start card
    var intro = findStartIntroCard();
    if(intro){
      intro.style.display = 'none';
      if(intro.parentElement && intro.parentElement.children.length === 1){
        intro.parentElement.style.display = 'none';
      }
    }

    // hide side title that compresses main reading card
    var sideHeading = findSideHeading();
    if(sideHeading){
      var wrap = sideHeading.closest('.card, .title, .section-title, .reading-plan-title, div');
      if(wrap && text(wrap).length < 120){
        wrap.style.display = 'none';
      } else {
        sideHeading.style.display = 'none';
      }
    }

    // attempt to flatten two-column squeeze on the current section
    var dayCard = findDayContentCard();
    if(dayCard){
      var parent = dayCard.parentElement;
      var depth = 0;
      while(parent && parent !== document.body && depth < 5){
        var cs = window.getComputedStyle(parent);
        if(cs.display.indexOf('grid') !== -1 || cs.display.indexOf('flex') !== -1){
          setStyles(parent, {
            display: 'block',
            gridTemplateColumns: '1fr',
            width: '100%',
            maxWidth: '100%',
            gap: '0'
          });
        }
        if(parent.classList.contains('container') || parent.classList.contains('page') || parent.classList.contains('content')){
          setStyles(parent, {
            width: '100%',
            maxWidth: '100%',
            paddingLeft: '16px',
            paddingRight: '16px',
            marginLeft: 'auto',
            marginRight: 'auto'
          });
        }
        parent = parent.parentElement;
        depth++;
      }
    }

    // make visible cards full-width and centered on mobile/tablet
    getCards().forEach(function(card){
      var t = text(card);
      if(/روز\s*\d+\s*از\s*365|خواندنی.?های\s*این\s*روز|داوران\s*\d+|پیدایش\s*\d+|متی\s*\d+|day\s*\d+\s*of\s*365|readings\s*for\s*this\s*day/i.test(t)){
        setStyles(card, {
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          marginLeft: 'auto',
          marginRight: 'auto'
        });
      }
    });

    // broader page-level safety styles, but only while on this page
    if(!document.getElementById('om7Bible365CleanupStyles')){
      var style = document.createElement('style');
      style.id = 'om7Bible365CleanupStyles';
      style.textContent = `
        @media (max-width: 1100px) {
          .reading-plan-card, .plan-day-card, .bible-chapter-card, .card { box-sizing: border-box; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  function run(){
    try { cleanupLayout(); } catch(e) {}
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  setTimeout(run, 150);
  setTimeout(run, 700);
  setTimeout(run, 1500);
  document.addEventListener('click', function(){ setTimeout(run, 120); }, true);

  window.OMIDENO7_BIBLE365_UI_CLEANUP = VERSION;
})();
