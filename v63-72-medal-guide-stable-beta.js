
/* Omideno7 V63.72 — Stable Medal Guide
   Focused patch only:
   - Keeps Medal Guide / راهنمای مدال‌ها open after click.
   - Does not modify other app sections.
*/
(function(){
'use strict';

var VERSION='V63.72 Stable Medal Guide';
var OPEN_KEY='omideno7_medal_guide_open';

function isBeta(){
  return /beta\.html/i.test(location.pathname) || /v=6372|v=6371|v=6370|v=6369|v=6368|v=6367|v=6366|v=6365|v=6364/i.test(location.search);
}
if(!isBeta()) return;

function isGuideButton(el){
  if(!el) return false;
  var tx=(el.textContent||'').trim();
  return /راهنمای مدال|Medal Guide|Vodič za medalje/i.test(tx);
}
function findGuideTextNear(btn){
  if(!btn) return null;

  // Known IDs from previous patches
  var known=document.getElementById('v6358GuideText') || document.getElementById('v6357GuideText');
  if(known) return known;

  var panel=btn.closest('#v6358RewardsPanel,#v6357RewardsPanel,.card,section,div');
  if(!panel) return null;

  var candidates=Array.prototype.slice.call(panel.querySelectorAll('.v6358-item,.v6357-item,[id*="GuideText"],div,p'));
  return candidates.find(function(el){
    if(el===btn) return false;
    var tx=(el.textContent||'').trim();
    return /برنزی|نقره|طلایی|Bronze|Silver|Gold|Brončana|Srebrna|Zlatna|مدال/i.test(tx) && tx.length>60;
  }) || null;
}
function setOpen(open){
  try{localStorage.setItem(OPEN_KEY, open?'1':'0');}catch(e){}
}
function shouldOpen(){
  try{return localStorage.getItem(OPEN_KEY)==='1';}catch(e){return false;}
}
function forceGuideOpen(){
  if(!shouldOpen()) return;
  var buttons=Array.prototype.slice.call(document.querySelectorAll('button,a'));
  buttons.forEach(function(btn){
    if(!isGuideButton(btn)) return;
    var text=findGuideTextNear(btn);
    if(text){
      text.style.display='block';
      text.hidden=false;
      text.setAttribute('aria-hidden','false');
    }
  });
}
function bindButtons(){
  Array.prototype.slice.call(document.querySelectorAll('button,a')).forEach(function(btn){
    if(!isGuideButton(btn) || btn.dataset.v6372MedalBound==='1') return;
    btn.dataset.v6372MedalBound='1';
    btn.addEventListener('click',function(e){
      // Let original click run first, then lock the final state open.
      setTimeout(function(){
        var text=findGuideTextNear(btn);
        if(text){
          var currentlyOpen=(text.style.display==='block') || (!text.hidden && getComputedStyle(text).display!=='none');
          // If original closed it immediately, reopen it.
          text.style.display='block';
          text.hidden=false;
          text.setAttribute('aria-hidden','false');
          setOpen(true);
        }
      },80);
      setTimeout(forceGuideOpen,250);
      setTimeout(forceGuideOpen,700);
    },true);
  });
}
function observe(){
  var more=document.getElementById('more') || document.body;
  if(!more || more.dataset.v6372MedalObserver==='1') return;
  more.dataset.v6372MedalObserver='1';
  try{
    var obs=new MutationObserver(function(){
      bindButtons();
      forceGuideOpen();
    });
    obs.observe(more,{childList:true,subtree:true,attributes:true,attributeFilter:['style','hidden','class']});
  }catch(e){}
}
function render(){
  bindButtons();
  forceGuideOpen();
  observe();
}

document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,120);},true);
setTimeout(render,400);
setTimeout(render,1200);
setTimeout(render,2500);
setInterval(forceGuideOpen,1200);

window.OMIDENO7_V6372_MEDAL_GUIDE_STABLE={render:render,version:VERSION};
})();
