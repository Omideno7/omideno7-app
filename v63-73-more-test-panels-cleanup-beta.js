
/* Omideno7 V63.73 — More Test Panels Cleanup
   Focused patch only:
   - Hides old beta/test/diagnostic panels in More.
   - Does not change Home, School, New Birth, Word, Plans, Bible, Admin approval, Cloud data, Offline data, or Rewards.
*/
(function(){
'use strict';

var VERSION='V63.73 More Test Panels Cleanup';
var VERSION_TEXT='App Version: V63.73 RC Beta';

function isBeta(){
  return /beta\.html/i.test(location.pathname) || /v=6373|v=6372|v=6371|v=6370|v=6369|v=6368|v=6367|v=6366|v=6365/i.test(location.search);
}
if(!isBeta()) return;

function css(){
  if(document.getElementById('v6373MoreCleanupCss')) return;
  var st=document.createElement('style');
  st.id='v6373MoreCleanupCss';
  st.textContent=[
    '.v6373-hide-test-panel{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}',
    '#v6371RcFooterVersion,#v6373RcFooterVersion{font-size:11px;font-weight:800;text-align:center;opacity:.72;color:#06146D;margin:18px auto 92px;padding:8px 10px;max-width:520px;}',
    '.v6371-hide-top-version,.v6373-hide-top-version{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;}'
  ].join('\n');
  document.head.appendChild(st);
}

function txt(el){return (el && el.textContent || '').trim();}

function isRealMoreFeature(t){
  return /چشم.?انداز|باورها|حریم خصوصی|حمایت مالی|هدیه|Giving|Vision|Beliefs|Privacy|PayPal|Revolut|رشد روحانی|مدال|امتیاز|Spiritual Growth|Medal|Rewards|درخواست.?های ثبت.?نام کلیسا|Church Registration Requests/i.test(t);
}

function isTestPanelText(t){
  if(!t) return false;
  var patterns=[
    /تست|آزمایش|آزمایشی|دیباگ|Debug|Test|Diagnostic|Diagnostics/i,
    /بررسی امنیت|امنیت حداکثری|ثبت لاگ امنیتی|لاگ امنیتی|Security Advisor|Security Check|Audit OK|security audit/i,
    /بررسی کلود|پشتیبان|بکاپ|Cloud Check|Cloud Backup|Personal Backup|Restore|بازیابی|نصب مجدد/i,
    /offline|آفلاین|صف آفلاین|ذخیره صوت/i,
    /اجرای همه تست|Run all tests|پاک کردن گزارش|گزارش تست|Report/i,
    /Supabase client|RLS|schema cache|Service Role|secret/i,
    /App Version:\s*V63\.(4[0-9]|5[0-9]|6[0-9])/i
  ];
  return patterns.some(function(p){return p.test(t);});
}

function cleanMore(){
  css();
  var more=document.getElementById('more');
  if(!more) return;

  Array.prototype.slice.call(more.querySelectorAll('.card, section, details, .hero-card, div')).forEach(function(el){
    if(!el || el.id==='mainFooter' || el.id==='v6371RcFooterVersion' || el.id==='v6373RcFooterVersion') return;
    var t=txt(el);
    if(!t || t.length<8 || t.length>2500) return;

    if(isTestPanelText(t) && !isRealMoreFeature(t)){
      el.classList.add('v6373-hide-test-panel');
    }
  });

  // Also remove empty-looking card shells left behind by previous test panels.
  Array.prototype.slice.call(more.querySelectorAll('.card')).forEach(function(card){
    var visibleText=txt(card);
    var hasRealButton=card.querySelector('a[href],button:not([disabled])');
    if(!visibleText && !hasRealButton){
      card.classList.add('v6373-hide-test-panel');
    }
  });
}

function hideTopVersion(){
  css();
  Array.prototype.slice.call(document.querySelectorAll('body *')).forEach(function(el){
    if(!el || el.id==='v6371RcFooterVersion' || el.id==='v6373RcFooterVersion') return;
    var t=txt(el);
    if(!t) return;
    var rect;
    try{rect=el.getBoundingClientRect();}catch(e){rect={top:9999};}
    var isVersionOnly=/^App Version:\s*V\d+(\.\d+)?\s*(Beta|RC|Final|Stable)?/i.test(t) || /^نسخه اپ/i.test(t);
    var isShort=t.length<90;
    var isTop=rect.top>=0 && rect.top<175;
    if(isVersionOnly && isShort && isTop){
      el.classList.add('v6373-hide-top-version');
    }
  });
}

function ensureFooterVersion(){
  css();
  var old=document.getElementById('v6371RcFooterVersion');
  if(old){old.textContent=VERSION_TEXT; return;}
  var existing=document.getElementById('v6373RcFooterVersion');
  if(existing){existing.textContent=VERSION_TEXT; return;}
  var target=document.getElementById('more') || document.querySelector('main') || document.body;
  if(!target) return;
  var footer=document.createElement('div');
  footer.id='v6373RcFooterVersion';
  footer.textContent=VERSION_TEXT;
  target.appendChild(footer);
}

function render(){
  cleanMore();
  hideTopVersion();
  ensureFooterVersion();
}

document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,140);},true);
setTimeout(render,400);
setTimeout(render,1200);
setTimeout(render,2400);
setInterval(render,2000);

window.OMIDENO7_V6373_MORE_TEST_PANELS_CLEANUP={render:render,version:VERSION};
})();
