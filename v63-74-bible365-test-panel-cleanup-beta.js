
/* Omideno7 V63.74 — Bible 365 Test Panel Cleanup
   Focused patch only:
   - Hides the remaining Bible 365 test/debug panel in More.
   - Hides the colored debug bars shown under it.
   - Does not change any real Bible 365 reading plan feature, data, progress, Home, School, Word, New Birth, Admin, medals, or audio.
*/
(function(){
'use strict';

var VERSION='V63.74 Bible 365 Test Panel Cleanup';

function isBetaOrMain(){
  return /beta\.html/i.test(location.pathname) || /v=6374|v=6373|v=6372|v=6371|v=6370|main-test/i.test(location.search) || location.pathname.endsWith('/') || /index\.html/i.test(location.pathname);
}

if(!isBetaOrMain()) return;

function css(){
  if(document.getElementById('v6374Bible365CleanupCss')) return;
  var st=document.createElement('style');
  st.id='v6374Bible365CleanupCss';
  st.textContent=[
    '.v6374-hide-bible365-test{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}'
  ].join('\n');
  document.head.appendChild(st);
}

function txt(el){
  return (el && el.textContent || '').replace(/\s+/g,' ').trim();
}

function looksLikeBible365TestPanel(t){
  if(!t) return false;

  var hasBible365Debug =
    /روز برنامه\s*۳۶۵|روز برنامه\s*365|Bible\s*365|365/i.test(t) &&
    /(Source:\s*manual beta field|ذخیره خودکار خاموش است|آخرین همگام‌سازی|همگامسازی|Auto Save|Refresh|manual beta field|Supabase|تست پیشنهادی)/i.test(t);

  var hasManualField =
    /(Source:\s*manual beta field|manual beta field)/i.test(t);

  var hasTestInstruction =
    /تست پیشنهادی|روز را در فیلد زیر|Supabase|Auto Save|Refresh/i.test(t);

  return hasBible365Debug || hasManualField || hasTestInstruction;
}

function isRealUserFeature(t){
  // Do not hide the real Bible reading plan card or normal medals card.
  if(/رشد روحانی و مدال|مدال‌ها برای تشویق|امتیاز|راهنمای مدال|Spiritual Growth|Medal Guide/i.test(t)) return true;
  if(/برنامه خواندن کتاب مقدس|خوندن کتاب مقدس|Bible Reading Plan|I read|خواندم|unlock next day|روز بعد/i.test(t) && !looksLikeBible365TestPanel(t)) return true;
  return false;
}

function hideDebugColoredBars(container){
  if(!container) return;

  // Hide suspicious horizontal colored debug bars near the removed test panel.
  var area = container.parentElement || document.getElementById('more') || document.body;
  Array.prototype.slice.call(area.querySelectorAll('div,hr,section')).forEach(function(el){
    if(el.classList && el.classList.contains('v6374-hide-bible365-test')) return;
    var rect;
    try{ rect=el.getBoundingClientRect(); }catch(e){ rect={height:999,width:0}; }
    var style;
    try{ style=getComputedStyle(el); }catch(e){ style={backgroundColor:'',backgroundImage:'',borderTopColor:'',borderBottomColor:''}; }

    var noText = txt(el).length < 8;
    var thin = rect.height > 2 && rect.height < 34;
    var wide = rect.width > 180;
    var colorful = /rgb\((0|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]),|blue|green|purple|linear-gradient|repeating-linear-gradient/i.test(
      String(style.backgroundColor)+' '+String(style.backgroundImage)+' '+String(style.borderTopColor)+' '+String(style.borderBottomColor)
    );

    // Also hide if it is clearly just a stack of colored child stripes.
    var childStripes = 0;
    Array.prototype.slice.call(el.children || []).forEach(function(ch){
      var r; try{r=ch.getBoundingClientRect();}catch(e){r={height:999,width:0};}
      var s; try{s=getComputedStyle(ch);}catch(e){s={backgroundColor:'',backgroundImage:''};}
      if(r.height>1 && r.height<16 && r.width>120 && /rgb|linear-gradient|blue|green|purple/i.test(String(s.backgroundColor)+' '+String(s.backgroundImage))) childStripes++;
    });

    if((noText && thin && wide && colorful) || childStripes>=2){
      el.classList.add('v6374-hide-bible365-test');
    }
  });
}

function cleanMore(){
  css();
  var more=document.getElementById('more');
  if(!more) return;

  var foundPanel=null;

  Array.prototype.slice.call(more.querySelectorAll('.card, section, details, fieldset, form, div')).forEach(function(el){
    if(!el || el.id==='mainFooter' || el.id==='v6371RcFooterVersion' || el.id==='v6373RcFooterVersion') return;
    var t=txt(el);
    if(!t || t.length>3000) return;

    if(looksLikeBible365TestPanel(t) && !isRealUserFeature(t)){
      el.classList.add('v6374-hide-bible365-test');
      if(!foundPanel) foundPanel=el;
    }
  });

  if(foundPanel) hideDebugColoredBars(foundPanel);

  // If colored bars remain directly before the medals card, hide them too.
  var medals = Array.prototype.slice.call(more.querySelectorAll('.card,section,div')).find(function(el){
    return /رشد روحانی و مدال|Spiritual Growth|Medals|مدال‌ها/i.test(txt(el));
  });
  if(medals && medals.parentElement){
    var siblings=Array.prototype.slice.call(medals.parentElement.children);
    var idx=siblings.indexOf(medals);
    siblings.slice(Math.max(0,idx-4), idx).forEach(function(el){
      var t=txt(el);
      var rect; try{rect=el.getBoundingClientRect();}catch(e){rect={height:999,width:0};}
      var s; try{s=getComputedStyle(el);}catch(e){s={backgroundImage:'',backgroundColor:''};}
      if(t.length<20 && rect.width>180 && rect.height>2 && rect.height<60 && /rgb|linear-gradient|blue|green|purple/i.test(String(s.backgroundImage)+' '+String(s.backgroundColor))){
        el.classList.add('v6374-hide-bible365-test');
      }
    });
  }
}

function render(){
  cleanMore();
}

document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,120);},true);
setTimeout(render,350);
setTimeout(render,1000);
setTimeout(render,2200);
setInterval(render,1500);

window.OMIDENO7_V6374_BIBLE365_TEST_PANEL_CLEANUP={render:render,version:VERSION};
})();
