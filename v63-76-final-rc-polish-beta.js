
/* Omideno7 V63.76 — Final RC Polish: More Cleanup + Church Name Meaning
   Focused patch only:
   1) Hides the remaining Bible 365 test/debug panel in More, including colored debug bars.
   2) Shows church-name meaning for EN/HR in smaller/lighter text.
   It does NOT change real Bible 365 plan data/progress, Home features, School, Word, New Birth, Admin approval, medals, audio, cloud, or offline logic.
*/
(function(){
'use strict';

var VERSION='V63.76 Final RC Polish';
var VERSION_TEXT='App Version: V63.76 RC Beta';

function isApp(){
  return /beta\.html|index\.html/i.test(location.pathname) || location.pathname.endsWith('/') || /v=6376|v=6375|v=6374|v=6373|main-test/i.test(location.search);
}
if(!isApp()) return;

function norm(v){
  v=String(v||'').toLowerCase().trim();
  if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1)return'en';
  if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1)return'hr';
  return'fa';
}
function lang(){
  try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa');}
  catch(e){return'fa';}
}
function txt(el){
  return (el && el.textContent || '').replace(/\s+/g,' ').trim();
}
function css(){
  if(document.getElementById('v6376FinalPolishCss'))return;
  var st=document.createElement('style');
  st.id='v6376FinalPolishCss';
  st.textContent=[
    '.v6376-hide-test-panel{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}',
    '.v6376-church-title-wrap{display:flex;flex-direction:column;gap:2px;line-height:1.15;}',
    '.v6376-church-title-main{font-weight:950;color:inherit;}',
    '.v6376-church-title-meaning{font-size:.68em;font-weight:700;opacity:.66;letter-spacing:.01em;}',
    '.app-title .v6376-church-title-meaning{font-size:.58em;opacity:.70;}',
    '.hero-card h1 .v6376-church-title-meaning{font-size:.45em;opacity:.62;margin-top:4px;}'
  ].join('\n');
  document.head.appendChild(st);
}

/* -------- Church name meaning -------- */
function titleHtml(){
  var l=lang();
  if(l==='en'){
    return '<span class="v6376-church-title-wrap"><span class="v6376-church-title-main">Omideno 7 Church</span><span class="v6376-church-title-meaning">New Hope 7</span></span>';
  }
  if(l==='hr'){
    return '<span class="v6376-church-title-wrap"><span class="v6376-church-title-main">Crkva Omideno 7</span><span class="v6376-church-title-meaning">Nova Nada 7</span></span>';
  }
  return '<span class="v6376-church-title-wrap"><span class="v6376-church-title-main">کلیسای امیدنو۷</span></span>';
}
function plainTitle(){
  var l=lang();
  if(l==='en') return 'Omideno 7 Church - New Hope 7';
  if(l==='hr') return 'Crkva Omideno 7 - Nova Nada 7';
  return 'کلیسای امیدنو۷';
}
function isChurchTitleText(t){
  t=String(t||'').replace(/\s+/g,' ').trim();
  return /^(کلیسای\s*امیدنو۷|کلیسای\s*امیدنو\s*7|Omid\s*No\s*7\s*Church|Omide\s*No\s*7\s*Church|Omideno\s*7\s*Church|Crkva\s*Omid\s*No\s*7|Crkva\s*Omideno\s*7)/i.test(t);
}
function applyChurchName(){
  css();
  document.title=plainTitle();

  var headerTitle=document.querySelector('.app-title');
  if(headerTitle){
    headerTitle.innerHTML=titleHtml();
    headerTitle.dataset.v6376ChurchName='1';
  }

  Array.prototype.slice.call(document.querySelectorAll('[data-i18n="appTitle"]')).forEach(function(el){
    el.innerHTML=titleHtml();
    el.dataset.v6376ChurchName='1';
  });

  Array.prototype.slice.call(document.querySelectorAll('#home h1,.hero-card h1')).forEach(function(h){
    var t=txt(h);
    if(isChurchTitleText(t) && t.length<100){
      h.innerHTML=titleHtml();
      h.dataset.v6376ChurchName='1';
    }
  });
}

/* -------- Stronger More-page Bible 365 test cleanup -------- */
function markHide(el){
  if(el && el.classList) el.classList.add('v6376-hide-test-panel');
}

function isRealFeature(t){
  // Do not hide real features.
  return /رشد روحانی و مدال|مدال‌ها برای تشویق|امتیاز|راهنمای مدال|Spiritual Growth|Medal|Rewards|چشم.?انداز|باورها|حریم خصوصی|حمایت مالی|درخواست.?های ثبت|Church Registration Requests/i.test(t);
}
function isBible365TestText(t){
  if(!t) return false;
  // Very specific to the debug/test panel shown in the screenshot.
  var debugWords = /(Source:\s*manual beta field|manual beta field|ذخیره خودکار خاموش است|آخرین همگام.?سازی|همگامسازی|Auto Save|Supabase|Refresh|تست پیشنهادی|روز را در فیلد زیر|true\s*:\s*نوتیفیکیشن|زبان:\s*fa)/i;
  var bible365Words = /(روز برنامه\s*۳۶۵|روز برنامه\s*365|Bible\s*365|۳۶۵)/i;
  return debugWords.test(t) && bible365Words.test(t);
}
function hideColoredBarsAround(el){
  if(!el) return;
  var more=document.getElementById('more');
  var area = (el.parentElement || more || document.body);

  // Hide likely colored stripe containers near this panel.
  Array.prototype.slice.call(area.querySelectorAll('div,section,hr')).forEach(function(x){
    if(!x || x.classList.contains('v6376-hide-test-panel')) return;
    var t=txt(x);
    var rect; try{rect=x.getBoundingClientRect();}catch(e){rect={width:0,height:999,top:999};}
    var s; try{s=getComputedStyle(x);}catch(e){s={backgroundColor:'',backgroundImage:'',borderTopColor:'',borderBottomColor:''};}

    var noText=t.length<25;
    var wide=rect.width>180;
    var thin=rect.height>=2 && rect.height<70;
    var colorful=/rgb\(|blue|green|purple|red|linear-gradient|repeating-linear-gradient/i.test(
      String(s.backgroundColor)+' '+String(s.backgroundImage)+' '+String(s.borderTopColor)+' '+String(s.borderBottomColor)
    );

    var stripeChildren=0;
    Array.prototype.slice.call(x.children||[]).forEach(function(ch){
      var r; try{r=ch.getBoundingClientRect();}catch(e){r={width:0,height:999};}
      var cs; try{cs=getComputedStyle(ch);}catch(e){cs={backgroundColor:'',backgroundImage:''};}
      if(r.width>120 && r.height>=1 && r.height<18 && /rgb\(|blue|green|purple|linear-gradient/i.test(String(cs.backgroundColor)+' '+String(cs.backgroundImage))){
        stripeChildren++;
      }
    });

    if((noText && wide && thin && colorful) || stripeChildren>=2){
      markHide(x);
    }
  });

  // Strong targeted fallback: colored bars immediately before medal/rewards card.
  var medals=Array.prototype.slice.call((more||document).querySelectorAll('.card,section,div')).find(function(x){
    return /رشد روحانی و مدال|Spiritual Growth|Medals|Rewards/i.test(txt(x));
  });
  if(medals && medals.parentElement){
    var kids=Array.prototype.slice.call(medals.parentElement.children);
    var idx=kids.indexOf(medals);
    kids.slice(Math.max(0,idx-6),idx).forEach(function(x){
      var t=txt(x);
      var rect; try{rect=x.getBoundingClientRect();}catch(e){rect={width:0,height:999};}
      var s; try{s=getComputedStyle(x);}catch(e){s={backgroundColor:'',backgroundImage:''};}
      if(t.length<60 && rect.width>180 && rect.height>=2 && rect.height<90 && /rgb\(|blue|green|purple|linear-gradient/i.test(String(s.backgroundColor)+' '+String(s.backgroundImage))){
        markHide(x);
      }
    });
  }
}
function cleanBible365TestPanel(){
  css();
  var more=document.getElementById('more');
  if(!more) return;

  var found=null;

  // Prefer card/section blocks, but include div because this old test area may not have a card class.
  Array.prototype.slice.call(more.querySelectorAll('.card,section,details,fieldset,form,div')).forEach(function(el){
    if(!el || el.id==='mainFooter' || el.id==='v6371RcFooterVersion' || el.id==='v6373RcFooterVersion') return;
    var t=txt(el);
    if(!t || t.length>3500) return;
    if(isBible365TestText(t) && !isRealFeature(t)){
      markHide(el);
      if(!found) found=el;
    }
  });

  if(found) hideColoredBarsAround(found);

  // Extra fallback: if no parent matched, find exact labels and hide their nearest meaningful container.
  if(!found){
    Array.prototype.slice.call(more.querySelectorAll('*')).forEach(function(el){
      var t=txt(el);
      if(/Source:\s*manual beta field|manual beta field|ذخیره خودکار خاموش است|تست پیشنهادی/i.test(t)){
        var box=el.closest('.card,section,details,fieldset,form') || el.parentElement;
        if(box && !isRealFeature(txt(box))){
          markHide(box);
          found=box;
        }
      }
    });
    if(found) hideColoredBarsAround(found);
  }
}

function render(){
  applyChurchName();
  cleanBible365TestPanel();
}

document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,120);setTimeout(render,500);},true);
setTimeout(render,250);
setTimeout(render,900);
setTimeout(render,1800);
setTimeout(render,3000);
setInterval(render,1500);

window.OMIDENO7_V6376_FINAL_RC_POLISH={render:render,version:VERSION};
})();
