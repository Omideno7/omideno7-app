
/* Omideno7 V63.64 — Faith Declaration Daily Fix
   Focused patch only:
   - Fixes daily Faith Declaration day selection by Europe/Zagreb date.
   - Re-renders declarations after midnight / app wake / language change.
   - Does not modify any other app section.
*/
(function(){
'use strict';

var VERSION='V63.64b Faith Declaration Daily Fix — Keep Verse Open';
var TZ='Europe/Zagreb';
var lastDay=null;

function isBeta(){return /beta\.html/i.test(location.pathname)||/v=6364|v=6363|v=6362|v=6361|v=6360|v=6359|v=6358/i.test(location.search)}
if(!isBeta()) return;

function norm(v){
  v=String(v||'').toLowerCase().trim();
  if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1)return'en';
  if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1)return'hr';
  return'fa';
}
function lang(){
  try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa')}
  catch(e){return'fa'}
}
function esc(v){
  return String(v==null?'':v).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}
function localize(v){
  var l=lang();
  if(v==null)return '';
  if(typeof v==='string' || typeof v==='number')return String(v);
  if(typeof v==='object')return String(v[l]||v.fa||v.en||v.hr||'');
  return String(v);
}
function label(k){
  var l=lang();
  var fa={
    day:'روز',
    verse:'آیه اعلان',
    teaching:'آماده‌سازی قلب',
    today:'اعلان ایمان امروز',
    practice:'تمرین امروز'
  };
  var en={
    day:'Day',
    verse:'Declaration Verse',
    teaching:'Heart Preparation',
    today:'Today’s Faith Declaration',
    practice:'Today’s Practice'
  };
  var hr={
    day:'Dan',
    verse:'Stih izjave',
    teaching:'Priprema srca',
    today:'Današnja izjava vjere',
    practice:'Današnja vježba'
  };
  return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
}
function zagrebDayOfMonth(){
  try{
    var parts=new Intl.DateTimeFormat('en-GB',{timeZone:TZ,day:'numeric'}).formatToParts(new Date());
    var p=parts.find(function(x){return x.type==='day'});
    var d=parseInt(p&&p.value,10);
    if(d>0)return d;
  }catch(e){}
  return new Date().getDate();
}
function declarationDay(){
  var d=zagrebDayOfMonth();
  return ((d-1)%30)+1;
}

function getData(){
  var d=window.declarationsData||window.DECLARATIONS_DATA||window.faithDeclarations||window.FAITH_DECLARATIONS;
  if(Array.isArray(d))return d;
  return null;
}
function findItem(day){
  var data=getData();
  if(!data || !data.length)return null;
  return data.find(function(x){return Number(x.day)===Number(day)}) || data[(day-1)%data.length] || data[0];
}
function renderDeclarationRoot(){
  var root=document.getElementById('declarationsContent');
  var item=findItem(declarationDay());
  if(!root || !item)return false;

  var itemDay = item.day || declarationDay();
  root.innerHTML = '<div class="declaration-day-card" data-v6364-day="'+esc(itemDay)+'">'
    + '<span class="day-label">'+esc(label('day'))+' '+esc(itemDay)+'</span>'
    + '<h2>'+esc(localize(item.title))+'</h2>'
    + '<div class="plan-section-title">'+esc(label('verse'))+'</div>'
    + '<details class="plan-scripture-expand"><summary>'+esc(localize(item.ref))+'</summary><p>'+esc(localize(item.verse))+'</p></details>'
    + '<div class="plan-section-title">'+esc(label('teaching'))+'</div>'
    + '<p>'+esc(localize(item.teaching))+'</p>'
    + '<div class="plan-section-title">'+esc(label('today'))+'</div>'
    + '<p class="long-faith-declaration">'+esc(localize(item.declaration))+'</p>'
    + '<div class="plan-section-title">'+esc(label('practice'))+'</div>'
    + '<p>'+esc(localize(item.practice))+'</p>'
    + '</div>';
  return true;
}
function updateHomeDeclarationCard(){
  // This is intentionally conservative. It only updates small day labels in Home
  // if a Faith Declaration card already exists. It does not rebuild Home.
  var home=document.getElementById('home');
  var item=findItem(declarationDay());
  if(!home || !item)return;
  var dayText=label('day')+' '+(item.day||declarationDay());
  var cards=Array.prototype.slice.call(home.querySelectorAll('.card,.feature-card,div'));
  cards.forEach(function(card){
    if(card.id && /Welcome|Daily|NewBirth|Rewards|Admin/i.test(card.id))return;
    var tx=(card.textContent||'');
    var isDeclaration=/اعلان.?های ایمان|اعلان ایمان|Faith Declaration|Faith Declarations|Izjava vjere|Izjave vjere/i.test(tx);
    if(!isDeclaration)return;
    card.querySelectorAll('.day-label,.badge,.small').forEach(function(el){
      if(/روز\s*\d+|Day\s*\d+|Dan\s*\d+/i.test(el.textContent||'')){
        el.textContent=dayText;
      }
    });
  });
}
function runOriginalToo(){
  try{
    if(typeof window.__v6364_originalRenderDeclarations==='function'){
      window.__v6364_originalRenderDeclarations();
    }
  }catch(e){}
}
function render(force){
  var d=declarationDay();
  if(force || lastDay!==d){
    lastDay=d;
    try{localStorage.setItem('omideno7_current_declaration_day',String(d));}catch(e){}
  }
  // First let the original renderer run, then force the correct Zagreb-day item.
  runOriginalToo();
  renderDeclarationRoot();
  updateHomeDeclarationCard();
}
function patchGlobals(){
  if(!window.__v6364_originalRenderDeclarations && typeof window.renderDeclarations==='function'){
    window.__v6364_originalRenderDeclarations=window.renderDeclarations;
  }
  window.getDeclarationDay=declarationDay;
  window.renderDeclarations=function(){render(true);};
}
function scheduleMidnightCheck(){
  setInterval(function(){
    var d=declarationDay();
    if(d!==lastDay)render(true);
  }, 60000);
}
function watchLang(){
  var lastLang=lang();
  setInterval(function(){
    var l=lang();
    if(l!==lastLang){
      lastLang=l;
      render(true);
    }
  }, 900);
}

document.addEventListener('DOMContentLoaded',function(){
  patchGlobals();
  render(true);
  scheduleMidnightCheck();
  watchLang();
});
window.addEventListener('load',function(){patchGlobals();render(true);});
document.addEventListener('visibilitychange',function(){
  if(!document.hidden){patchGlobals();render(true);}
});
window.addEventListener('focus',function(){patchGlobals();render(true);});
// Do not re-render on every click. Re-rendering immediately after a verse/details click closes the opened verse panel.
setTimeout(function(){patchGlobals();render(true);},400);
setTimeout(function(){patchGlobals();render(true);},1400);
setTimeout(function(){patchGlobals();render(true);},3000);

window.OMIDENO7_V6364_FAITH_DECLARATION_DAILY_FIX={
  version:VERSION,
  render:function(){render(true);},
  getDeclarationDay:declarationDay,
  timeZone:TZ
};
})();
