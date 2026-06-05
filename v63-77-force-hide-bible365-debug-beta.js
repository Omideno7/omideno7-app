
/* Omideno7 V63.77 — Force Hide Bible365 Debug Panel
   Focused patch only:
   - Removes/hides the remaining Bible 365 debug/test panel in More.
   - Removes/hides the colored debug stripe bars.
   - Does not change real Bible 365 plan, medals, school, home, word, new birth, admin, audio, cloud, or offline logic.
*/
(function(){
'use strict';

var VERSION='V63.77 Force Hide Bible365 Debug Panel';

function isApp(){
  return /beta\.html|index\.html/i.test(location.pathname) || location.pathname.endsWith('/') || /v=6377|v=6376|v=6375|v=6374|v=6373|main-test/i.test(location.search);
}
if(!isApp()) return;

function css(){
  if(document.getElementById('v6377ForceHideCss')) return;
  var st=document.createElement('style');
  st.id='v6377ForceHideCss';
  st.textContent=[
    '.v6377-force-hide-bible365-debug{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}'
  ].join('\n');
  document.head.appendChild(st);
}
function txt(el){
  return (el && el.textContent || '').replace(/\s+/g,' ').trim();
}
function isMedalsText(t){
  return /رشد روحانی و مدال|مدال‌ها برای تشویق|راهنمای مدال|امتیاز|Spiritual Growth|Medals|Rewards|Medal Guide/i.test(t||'');
}
function isDebugText(t){
  t=String(t||'').replace(/\s+/g,' ').trim();
  return (
    /روز برنامه\s*۳۶۵/i.test(t) ||
    /روز برنامه\s*365/i.test(t) ||
    /Source:\s*manual beta field/i.test(t) ||
    /manual beta field/i.test(t) ||
    /ذخیره خودکار خاموش است/i.test(t) ||
    /آخرین همگام/i.test(t) ||
    /همگام‌سازی/i.test(t) ||
    /تست پیشنهادی/i.test(t) ||
    /Supabase/i.test(t) ||
    /Auto Save/i.test(t)
  );
}
function hide(el){
  if(!el || !el.classList) return;
  el.classList.add('v6377-force-hide-bible365-debug');
  try{ el.style.setProperty('display','none','important'); }catch(e){ el.style.display='none'; }
}
function choosePanel(el, more){
  if(!el || !more) return null;

  // First try normal app containers.
  var normal = el.closest('.card, .hero-card, section, fieldset, form, details');
  if(normal && normal !== more && !isMedalsText(txt(normal))) return normal;

  // Climb upward and choose the largest ancestor that still contains debug text
  // but does not contain the medals card text.
  var best = el;
  var cur = el;
  while(cur && cur.parentElement && cur.parentElement !== document.body){
    if(cur === more) break;
    var t = txt(cur);
    if(isDebugText(t) && !isMedalsText(t)){
      best = cur;
    }
    if(cur.parentElement === more) break;
    cur = cur.parentElement;
  }
  return best && best !== more ? best : null;
}
function isColoredStripe(el){
  if(!el || !el.getBoundingClientRect) return false;
  var t=txt(el);
  if(t.length>80) return false;

  var r, s;
  try{ r=el.getBoundingClientRect(); }catch(e){ r={width:0,height:999}; }
  try{ s=getComputedStyle(el); }catch(e){ s={backgroundColor:'',backgroundImage:'',borderTopColor:'',borderBottomColor:''}; }

  var wide = r.width > 160;
  var thin = r.height >= 2 && r.height < 90;
  var colorful = /rgb\(|rgba\(|blue|green|purple|red|linear-gradient|repeating-linear-gradient/i.test(
    String(s.backgroundColor)+' '+String(s.backgroundImage)+' '+String(s.borderTopColor)+' '+String(s.borderBottomColor)
  );

  var stripeChildren=0;
  Array.prototype.slice.call(el.children||[]).forEach(function(ch){
    var cr, cs;
    try{ cr=ch.getBoundingClientRect(); }catch(e){ cr={width:0,height:999}; }
    try{ cs=getComputedStyle(ch); }catch(e){ cs={backgroundColor:'',backgroundImage:''}; }
    if(cr.width>120 && cr.height>=1 && cr.height<20 && /rgb\(|rgba\(|blue|green|purple|red|linear-gradient/i.test(String(cs.backgroundColor)+' '+String(cs.backgroundImage))){
      stripeChildren++;
    }
  });

  return (wide && thin && colorful) || stripeChildren>=2;
}
function clean(){
  css();
  var more=document.getElementById('more');
  if(!more) return;

  var debugPanels=[];

  // Find any element with exact debug words, then hide its correct container.
  Array.prototype.slice.call(more.querySelectorAll('*')).forEach(function(el){
    var t=txt(el);
    if(!t || t.length>5000) return;
    if(isDebugText(t) && !isMedalsText(t)){
      var panel=choosePanel(el, more);
      if(panel && debugPanels.indexOf(panel)<0) debugPanels.push(panel);
    }
  });

  debugPanels.forEach(hide);

  // Hide colored bars anywhere in More, especially near the medals card.
  Array.prototype.slice.call(more.querySelectorAll('div,section,hr')).forEach(function(el){
    if(isColoredStripe(el)) hide(el);
  });

  // Strong fallback: hide immediate siblings before medals if they look empty/debug/colored.
  var medals=Array.prototype.slice.call(more.querySelectorAll('*')).find(function(el){
    return isMedalsText(txt(el));
  });

  if(medals){
    var medalBox=medals.closest('.card,section,div') || medals;
    var parent=medalBox.parentElement;
    if(parent){
      var kids=Array.prototype.slice.call(parent.children);
      var idx=kids.indexOf(medalBox);
      kids.slice(Math.max(0,idx-10), idx).forEach(function(el){
        var t=txt(el);
        if(isDebugText(t) || isColoredStripe(el)){
          hide(el);
        }
      });
    }
  }
}
document.addEventListener('DOMContentLoaded',clean);
window.addEventListener('load',clean);
document.addEventListener('click',function(){setTimeout(clean,120);setTimeout(clean,600);},true);
setTimeout(clean,250);
setTimeout(clean,900);
setTimeout(clean,1800);
setTimeout(clean,3500);
setInterval(clean,1200);

window.OMIDENO7_V6377_FORCE_HIDE_BIBLE365_DEBUG={clean:clean,version:VERSION};
})();
