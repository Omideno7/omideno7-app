
/* Omideno7 V63.78 — Global Bible365 Debug Panel Killer
   Very focused patch:
   - Finds the remaining debug/test panel by its visible text anywhere in the page.
   - Hides the full panel and the colored debug bars under it.
   - Does not modify real Bible 365 reading plan logic, medals, school, home, word, new birth, admin, audio, cloud, or offline logic.
*/
(function(){
'use strict';

var VERSION='V63.78 Global Bible365 Debug Killer';

function css(){
  if(document.getElementById('v6378Bible365DebugKillerCss')) return;
  var st=document.createElement('style');
  st.id='v6378Bible365DebugKillerCss';
  st.textContent=[
    '.v6378-kill-bible365-debug{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}'
  ].join('\n');
  document.head.appendChild(st);
}

function text(el){
  return (el && el.textContent || '').replace(/\s+/g,' ').trim();
}

function hide(el){
  if(!el || !el.classList) return;
  el.classList.add('v6378-kill-bible365-debug');
  try{ el.style.setProperty('display','none','important'); }catch(e){ el.style.display='none'; }
}

function isDebugText(t){
  t=String(t||'').replace(/\s+/g,' ').trim();

  // Words visible in the screenshot.
  return (
    /روز برنامه\s*۳۶۵/i.test(t) ||
    /روز برنامه\s*365/i.test(t) ||
    /Source:\s*manual beta field/i.test(t) ||
    /manual beta field/i.test(t) ||
    /ذخیره خودکار خاموش است/i.test(t) ||
    /آخرین همگام/i.test(t) ||
    /همگام.?سازی/i.test(t) ||
    /تست پیشنهادی/i.test(t) ||
    /روز را در فیلد زیر/i.test(t) ||
    /Auto Save/i.test(t) ||
    /Supabase/i.test(t)
  );
}

function isProtectedRealFeature(t){
  t=String(t||'').replace(/\s+/g,' ').trim();

  return (
    /رشد روحانی و مدال/i.test(t) ||
    /مدال‌ها برای تشویق/i.test(t) ||
    /راهنمای مدال/i.test(t) ||
    /امتیاز/i.test(t) ||
    /Spiritual Growth/i.test(t) ||
    /Medal/i.test(t) ||
    /Rewards/i.test(t) ||
    /تولد تازه/i.test(t) ||
    /اعلان.*ایمان/i.test(t) ||
    /پیام.*صوتی/i.test(t) ||
    /یادداشت/i.test(t) ||
    /آیات من/i.test(t)
  );
}

function bestContainer(el){
  if(!el) return null;

  var selectors=[
    '.card',
    '.hero-card',
    '.feature-card',
    '.word-box',
    'section',
    'fieldset',
    'form',
    'details',
    'article',
    '[class*="card"]',
    '[class*="panel"]',
    '[class*="box"]'
  ];

  for(var i=0;i<selectors.length;i++){
    var c=el.closest(selectors[i]);
    if(c && !isProtectedRealFeature(text(c))) return c;
  }

  // If there is no classed card, climb until the element is a visible block,
  // but never choose body/main/more itself.
  var cur=el;
  var best=el;
  while(cur && cur.parentElement && cur !== document.body){
    var t=text(cur);
    if(isDebugText(t) && !isProtectedRealFeature(t)){
      best=cur;
    }
    if(cur.id==='more' || cur.tagName==='MAIN') break;
    cur=cur.parentElement;
  }
  return best && best!==document.body ? best : null;
}

function isColoredBar(el){
  if(!el || !el.getBoundingClientRect) return false;

  var t=text(el);
  if(t.length>70) return false;

  var r,s;
  try{ r=el.getBoundingClientRect(); }catch(e){ r={width:0,height:999}; }
  try{ s=getComputedStyle(el); }catch(e){ s={backgroundColor:'',backgroundImage:'',borderTopColor:'',borderBottomColor:''}; }

  var wide=r.width>140;
  var thin=r.height>=2 && r.height<95;
  var colorful=/rgb\(|rgba\(|blue|green|purple|red|orange|linear-gradient|repeating-linear-gradient/i.test(
    String(s.backgroundColor)+' '+String(s.backgroundImage)+' '+String(s.borderTopColor)+' '+String(s.borderBottomColor)
  );

  var childColorCount=0;
  Array.prototype.slice.call(el.children||[]).forEach(function(ch){
    var cr,cs;
    try{ cr=ch.getBoundingClientRect(); }catch(e){ cr={width:0,height:999}; }
    try{ cs=getComputedStyle(ch); }catch(e){ cs={backgroundColor:'',backgroundImage:''}; }
    if(cr.width>100 && cr.height>=1 && cr.height<22 && /rgb\(|rgba\(|blue|green|purple|red|orange|linear-gradient/i.test(String(cs.backgroundColor)+' '+String(cs.backgroundImage))){
      childColorCount++;
    }
  });

  return (wide && thin && colorful) || childColorCount>=2;
}

function killDebugPanel(){
  css();

  var all=Array.prototype.slice.call(document.querySelectorAll('body *'));
  var panels=[];

  // 1) Find exact debug text anywhere, not only inside #more.
  all.forEach(function(el){
    var t=text(el);
    if(!t || t.length>6000) return;
    if(isDebugText(t) && !isProtectedRealFeature(t)){
      var c=bestContainer(el);
      if(c && panels.indexOf(c)<0) panels.push(c);
    }
  });

  panels.forEach(hide);

  // 2) Hide colored debug bars anywhere in the More page or around medals.
  var more=document.getElementById('more') || document.body;

  Array.prototype.slice.call(more.querySelectorAll('div,section,hr,p')).forEach(function(el){
    if(isColoredBar(el)) hide(el);
  });

  // 3) Strong fallback: hide siblings right before the medals card
  // because the screenshot shows bars immediately above medals.
  var medalElement=all.find(function(el){
    return /رشد روحانی و مدال|Spiritual Growth|Medals|Rewards/i.test(text(el));
  });

  if(medalElement){
    var medalBox=medalElement.closest('.card,[class*="card"],section,div') || medalElement;
    var p=medalBox.parentElement;
    if(p){
      var kids=Array.prototype.slice.call(p.children);
      var idx=kids.indexOf(medalBox);
      if(idx>=0){
        kids.slice(Math.max(0,idx-12),idx).forEach(function(el){
          var t=text(el);
          if(isDebugText(t) || isColoredBar(el)) hide(el);
        });
      }
    }
  }

  // 4) Last resort: if a visible input near "روز برنامه ۳۶۵" remains, hide its enclosing area.
  all.forEach(function(el){
    var t=text(el);
    if(/روز برنامه\s*۳۶۵|Source:\s*manual beta field|manual beta field/i.test(t)){
      var c=bestContainer(el) || el.parentElement;
      if(c && !isProtectedRealFeature(text(c))) hide(c);
    }
  });
}

document.addEventListener('DOMContentLoaded',killDebugPanel);
window.addEventListener('load',killDebugPanel);
document.addEventListener('click',function(){
  setTimeout(killDebugPanel,100);
  setTimeout(killDebugPanel,500);
  setTimeout(killDebugPanel,1200);
},true);

setTimeout(killDebugPanel,200);
setTimeout(killDebugPanel,700);
setTimeout(killDebugPanel,1500);
setTimeout(killDebugPanel,3000);
setTimeout(killDebugPanel,5000);
setInterval(killDebugPanel,900);
function hideBarsBeforeMedals(){
  var more=document.getElementById('more');
  if(!more) return;

  function cleanText(el){
    return (el && el.textContent || '').replace(/\s+/g,' ').trim();
  }

  function hide(el){
    if(!el) return;
    el.classList.add('v6378-kill-bible365-debug');
    try{
      el.style.setProperty('display','none','important');
      el.style.setProperty('visibility','hidden','important');
      el.style.setProperty('height','0','important');
      el.style.setProperty('margin','0','important');
      el.style.setProperty('padding','0','important');
      el.style.setProperty('overflow','hidden','important');
    }catch(e){
      el.style.display='none';
    }
  }

  function isMedalsCard(el){
    var t=cleanText(el);
    return /رشد روحانی و مدال|Spiritual Growth|Medals|Rewards/i.test(t);
  }

  function isProbablyColorBars(el){
    if(!el) return false;

    var t=cleanText(el);
    var r;
    var s;

    try{ r=el.getBoundingClientRect(); }catch(e){ r={width:0,height:999}; }
    try{ s=getComputedStyle(el); }catch(e){ s={backgroundColor:'',backgroundImage:'',borderTopColor:'',borderBottomColor:''}; }

    var smallText = t.length < 40;
    var wide = r.width > 150;
    var notTall = r.height > 2 && r.height < 120;

    var hasColor =
      /rgb|rgba|blue|green|purple|red|linear-gradient|repeating-linear-gradient/i.test(
        String(s.backgroundColor)+' '+String(s.backgroundImage)+' '+String(s.borderTopColor)+' '+String(s.borderBottomColor)
      );

    var coloredChildren=0;
    Array.prototype.slice.call(el.querySelectorAll('*')).forEach(function(ch){
      var cr;
      var cs;
      try{ cr=ch.getBoundingClientRect(); }catch(e){ cr={width:0,height:999}; }
      try{ cs=getComputedStyle(ch); }catch(e){ cs={backgroundColor:'',backgroundImage:''}; }

      if(
        cr.width > 100 &&
        cr.height >= 1 &&
        cr.height < 25 &&
        /rgb|rgba|blue|green|purple|red|linear-gradient/i.test(String(cs.backgroundColor)+' '+String(cs.backgroundImage))
      ){
        coloredChildren++;
      }
    });

    return smallText && wide && notTall && (hasColor || coloredChildren >= 2);
  }

  var all=Array.prototype.slice.call(more.querySelectorAll('*'));

  var medalInner=all.find(function(el){
    return isMedalsCard(el);
  });

  if(!medalInner) return;

  var medalTop=medalInner;

  while(medalTop && medalTop.parentElement && medalTop.parentElement !== more){
    medalTop=medalTop.parentElement;
  }

  if(!medalTop || medalTop.parentElement !== more) return;

  var kids=Array.prototype.slice.call(more.children);
  var index=kids.indexOf(medalTop);

  if(index <= 0) return;

  var before=kids[index-1];

  if(isProbablyColorBars(before)){
    hide(before);
  }

  var before2=kids[index-2];
  if(isProbablyColorBars(before2)){
    hide(before2);
  }
}

var oldKillDebugPanel=killDebugPanel;
killDebugPanel=function(){
  oldKillDebugPanel();
  hideBarsBeforeMedals();
};

setTimeout(hideBarsBeforeMedals,300);
setTimeout(hideBarsBeforeMedals,1200);
setInterval(hideBarsBeforeMedals,900);

window.OMIDENO7_V6378_GLOBAL_BIBLE365_DEBUG_KILLER={kill:killDebugPanel,version:VERSION};
})();
