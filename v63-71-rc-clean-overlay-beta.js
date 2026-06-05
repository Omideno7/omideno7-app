
/* Omideno7 V63.71 RC Clean Overlay
   Very conservative release-candidate patch.
   It does not rebuild app sections.
   It only hides top version banners, keeps a small footer version, and hides obvious temporary test/debug controls if present.
*/
(function(){
'use strict';

var VERSION='V63.71 RC Beta';
var VERSION_TEXT='App Version: '+VERSION;

function isBeta(){
  return /beta\.html/i.test(location.pathname) || /v=6371|v=6370|v=6369|v=6368|v=6367|v=6366|v=6365|v=6364/i.test(location.search);
}
if(!isBeta()) return;

function css(){
  if(document.getElementById('v6371RcCleanCss')) return;
  var st=document.createElement('style');
  st.id='v6371RcCleanCss';
  st.textContent=[
    '.v6371-hide-top-version{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;}',
    '#v6371RcFooterVersion{font-size:11px;font-weight:800;text-align:center;opacity:.72;color:#06146D;margin:18px auto 92px;padding:8px 10px;max-width:520px;}',
    '.v6371-hide-temp-test{display:none!important;}'
  ].join('\n');
  document.head.appendChild(st);
}

function txt(el){return (el && el.textContent || '').trim();}

function hideTopVersion(){
  css();
  Array.prototype.slice.call(document.querySelectorAll('body *')).forEach(function(el){
    if(!el || el.id==='v6371RcFooterVersion') return;
    var t=txt(el);
    if(!t) return;
    var rect;
    try{rect=el.getBoundingClientRect();}catch(e){rect={top:9999};}
    var isVersionOnly=/^App Version:\s*V\d+(\.\d+)?\s*(Beta|RC|Final|Stable)?/i.test(t) || /^نسخه اپ/i.test(t);
    var isShort=t.length<80;
    var isTop=rect.top>=0 && rect.top<170;
    var isBannerLike=(el.tagName==='DIV'||el.tagName==='SECTION'||el.tagName==='HEADER'||el.tagName==='P'||el.tagName==='SPAN');
    if(isVersionOnly && isShort && isTop && isBannerLike){
      el.classList.add('v6371-hide-top-version');
    }
  });
}

function ensureFooterVersion(){
  css();
  var existing=document.getElementById('v6371RcFooterVersion');
  if(existing){
    existing.textContent=VERSION_TEXT;
    return;
  }
  var target=document.getElementById('more') || document.querySelector('main') || document.body;
  if(!target) return;
  var footer=document.createElement('div');
  footer.id='v6371RcFooterVersion';
  footer.textContent=VERSION_TEXT;
  target.appendChild(footer);
}

function hideTemporaryTestControls(){
  var patterns=[
    /تست وضعیت آفلاین|ثبت تست در صف آفلاین|ارسال صف آفلاین به کلود|پاک کردن گزارش/i,
    /بررسی امنیت حداکثری|ثبت لاگ امنیتی|بررسی کلود|تست بازیابی/i,
    /run all tests|security check|cloud check|offline test|debug|diagnostic/i
  ];
  Array.prototype.slice.call(document.querySelectorAll('.card,section,div,button')).forEach(function(el){
    if(!el || el.id==='v6371RcFooterVersion') return;
    var t=txt(el);
    if(!t || t.length>1600) return;
    var hit=patterns.some(function(p){return p.test(t);});
    if(hit){
      var normal=/تولد تازه|اعلان.*ایمان|پیام.*صوتی|آیات من|یادداشت|مدرسه|کلام روزانه|Bible|New Birth|Faith/i.test(t);
      if(!normal) el.classList.add('v6371-hide-temp-test');
    }
  });
}

function render(){
  hideTopVersion();
  ensureFooterVersion();
  hideTemporaryTestControls();
}

document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,180);},true);
setTimeout(render,400);
setTimeout(render,1300);
setTimeout(render,2800);
setInterval(render,3000);

window.OMIDENO7_V6371_RC_CLEAN_OVERLAY={render:render,version:VERSION};
})();
