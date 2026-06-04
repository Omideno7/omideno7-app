
/* Omideno7 V63.60 — Remove Duplicate Welcome + Amen Popup
   Focused patch only:
   1) Remove the older duplicate welcome card above the new large-button welcome card.
   2) Show a small trilingual encouragement popup on app entry with an Amen button.
   No other app sections are changed.
*/
(function(){
'use strict';

var VERSION='V63.60 Welcome Cleanup + Amen';
var SESSION_KEY='omideno7_v6360_amen_seen';

function isBeta(){
  return /beta\.html/i.test(location.pathname) || /v=6360|v=6359|v=6358/i.test(location.search);
}
if(!isBeta()) return;

function norm(v){
  v=String(v||'').toLowerCase().trim();
  if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1) return 'en';
  if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1) return 'hr';
  return 'fa';
}
function lang(){
  try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa');}
  catch(e){return 'fa';}
}
function esc(v){
  return String(v==null?'':v).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}
function T(k){
  var fa={
    title:'پیام امروز برای تو',
    msg:'امروز با ایمان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.',
    amen:'آمین'
  };
  var en={
    title:'Today’s word for you',
    msg:'Walk by faith today; the Lord is with you, and His Word lights your path.',
    amen:'Amen'
  };
  var hr={
    title:'Današnja riječ za tebe',
    msg:'Hodaj danas u vjeri; Gospodin je s tobom i Njegova Riječ osvjetljava tvoj put.',
    amen:'Amen'
  };
  var l=lang();
  return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
}

function css(){
  if(document.getElementById('v6360Css')) return;
  var st=document.createElement('style');
  st.id='v6360Css';
  st.textContent=[
    '#v6358WelcomeCard,.v6360-old-welcome{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}',
    '#v6360AmenOverlay{position:fixed;inset:0;z-index:1000000;background:rgba(2,8,23,.42);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:18px;}',
    '#v6360AmenBox{width:min(92vw,430px);background:#fff;border-radius:26px;border-top:6px solid #00B91F;box-shadow:0 26px 80px rgba(0,0,0,.32);padding:22px;text-align:center;color:#06146D;}',
    '#v6360AmenBox .icon{font-size:38px;margin-bottom:8px;}',
    '#v6360AmenBox h3{margin:0 0 10px;font-size:22px;font-weight:950;color:#06146D;}',
    '#v6360AmenBox p{margin:0 0 18px;line-height:1.9;font-size:16px;font-weight:850;color:#24304F;}',
    '#v6360AmenBtn{border:0;border-radius:999px;background:#00B91F;color:#fff;font-weight:950;padding:12px 28px;min-width:130px;font-size:16px;box-shadow:0 8px 22px rgba(0,185,31,.25);cursor:pointer;}',
    '.fa #v6360AmenBox{direction:rtl;text-align:center;}'
  ].join('\n');
  document.head.appendChild(st);
}

function removeDuplicateWelcome(){
  css();
  var home=document.getElementById('home');
  if(!home) return;

  // Keep the newer V63.59 welcome card with large buttons.
  var keep=document.getElementById('v6359WelcomeCard');

  // Remove/hide the older V63.58 card if it is recreated by earlier interval scripts.
  var old=document.getElementById('v6358WelcomeCard');
  if(old){
    old.classList.add('v6360-old-welcome');
    try{ old.remove(); }catch(e){}
  }

  // If there are two welcome-like cards, keep the one containing the large V63.59 buttons.
  var cards=Array.prototype.slice.call(home.querySelectorAll('.card, .hero-card, div'));
  var welcomeCards=cards.filter(function(c){
    if(!c || c.id==='v6359WelcomeCard') return false;
    var tx=(c.textContent||'').trim();
    if(tx.length>1200) return false;
    var isWelcome=/به کلیسای امیدنو۷ خوش آمدید|به کلیسای امیدنو7 خوش آمدید|Welcome to OmideNo7|Dobrodošli u Crkvu OmideNo7/i.test(tx);
    var hasOldButtons=/اطلاعات جلسه|جلسات آنلاین|برنامه جلسات|دریافت رمز ورود جلسات/i.test(tx);
    return isWelcome && hasOldButtons;
  });
  welcomeCards.forEach(function(c){
    if(c.id==='v6359WelcomeCard') return;
    c.classList.add('v6360-old-welcome');
    try{ c.remove(); }catch(e){}
  });

  // Ensure the kept card is the first visible home card.
  keep=document.getElementById('v6359WelcomeCard');
  if(keep && home.firstElementChild!==keep){
    home.insertBefore(keep, home.firstElementChild);
  }
}

function showAmenPopup(){
  css();
  try{
    if(sessionStorage.getItem(SESSION_KEY)==='1') return;
  }catch(e){}
  if(document.getElementById('v6360AmenOverlay')) return;

  var overlay=document.createElement('div');
  overlay.id='v6360AmenOverlay';
  overlay.innerHTML='<div id="v6360AmenBox"><div class="icon">✨</div><h3>'+esc(T('title'))+'</h3><p>'+esc(T('msg'))+'</p><button id="v6360AmenBtn">'+esc(T('amen'))+'</button></div>';
  document.body.appendChild(overlay);

  function close(){
    try{sessionStorage.setItem(SESSION_KEY,'1');}catch(e){}
    if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }
  document.getElementById('v6360AmenBtn').onclick=close;
  overlay.addEventListener('click',function(e){
    if(e.target===overlay) close();
  });
}

function render(){
  removeDuplicateWelcome();
}

document.addEventListener('DOMContentLoaded',function(){
  render();
  setTimeout(showAmenPopup,650);
});
window.addEventListener('load',function(){
  render();
  setTimeout(showAmenPopup,650);
});
document.addEventListener('click',function(){
  setTimeout(removeDuplicateWelcome,120);
},true);

// Earlier V63.58 recreates a welcome card repeatedly; keep cleaning it.
setTimeout(render,300);
setTimeout(render,900);
setTimeout(render,1800);
setInterval(removeDuplicateWelcome,1200);

window.OMIDENO7_V6360_WELCOME_CLEANUP={render:render,version:VERSION};
})();
