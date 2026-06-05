
/* Omideno7 V63.82 — More Page Hard Fix
   Focused patch only for More page:
   - Keeps PayPal/Revolut buttons visible inside the giving/support card.
   - Removes the colored debug stripe block between support/contact area and medals.
   - Makes Medal Guide stable and keeps it open when clicked.
   - Hides beta test report card.
   - Adds a safe rescue for the Bible 365 plan page if the plan container is empty.
   Does not modify Home, School, Word, New Birth, Admin, Cloud/Offline logic or stored data.
*/
(function(){
'use strict';

var VERSION='V63.82 More + Bible365 Hard Fix';

var PAYPAL_URL='https://www.paypal.me/MehdiBadanFirouz337';
var REVOLUT_URL='https://revolut.me/m_badanfirouz';

function css(){
  if(document.getElementById('v6382MoreHardFixCss')) return;
  var st=document.createElement('style');
  st.id='v6382MoreHardFixCss';
  st.textContent=[
    '.v6382-hide{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}',
    '.v6382-support-box,.v6382-medal-guide-box,.v6382-bible365-rescue{display:block!important;visibility:visible!important;height:auto!important;margin-top:12px!important;padding:12px!important;border-radius:16px!important;background:rgba(6,20,109,.045)!important;border:1px solid rgba(6,20,109,.12)!important;line-height:1.9!important;}',
    '.v6382-support-actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:10px!important;margin-top:12px!important;}',
    '.v6382-support-btn{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;border-radius:14px!important;padding:12px 10px!important;text-decoration:none!important;font-weight:950!important;box-shadow:0 8px 18px rgba(0,0,0,.12)!important;}',
    '.v6382-paypal{background:#003087!important;color:#fff!important;}',
    '.v6382-revolut{background:#111827!important;color:#fff!important;}',
    '.v6382-medal-guide-box{font-weight:700!important;}',
    '.v6382-medal-guide-box ul{margin:8px 0 0 0!important;padding-inline-start:20px!important;}',
    '.v6382-medal-guide-box li{margin:4px 0!important;}',
    '.v6382-bible365-day{padding:10px 12px;margin:8px 0;border-radius:14px;background:#fff;border:1px solid rgba(6,20,109,.12);}',
    '.v6382-bible365-day strong{display:block;color:#06146d;margin-bottom:4px;}',
    '@media(max-width:520px){.v6382-support-actions{grid-template-columns:1fr!important;}}'
  ].join('\n');
  document.head.appendChild(st);
}

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
var I={
  fa:{
    supportIntro:'هدایای شما به ما کمک می‌کند انجیل را گسترش دهیم، کلام خدا را تعلیم دهیم و ایماندارانی قوی برای پادشاهی خدا تربیت کنیم.',
    paypal:'حمایت با PayPal',
    revolut:'حمایت با Revolut',
    medalGuide:'راهنمای مدال‌ها',
    medals:[
      'برنزی: با رسیدن به ۱۰۰ امتیاز آزاد می‌شود.',
      'نقره‌ای: با رسیدن به ۲۰۰ امتیاز آزاد می‌شود.',
      'طلایی: با رسیدن به ۵۰۰ امتیاز آزاد می‌شود.',
      'مدال‌های ویژه برای ثبات در کلام، دعا، شکرگزاری، اعلان ایمان، مدرسه و تکمیل برنامه ۳۶۵ روزه آزاد می‌شوند.'
    ],
    bibleTitle:'برنامه خواندن کتاب مقدس در ۳۶۵ روز',
    bibleIntro:'برنامه ۳۶۵ روزه فعال است. اگر متن روزها نمایش داده نمی‌شود، این بخش برای نمایش امن برنامه فعال شده است.',
    openDay:'باز کردن روز',
    day:'روز',
    refs:'آیات امروز'
  },
  en:{
    supportIntro:'Your gifts help us spread the Gospel, teach God’s Word, and raise strong believers for the Kingdom of God.',
    paypal:'Support with PayPal',
    revolut:'Support with Revolut',
    medalGuide:'Medal Guide',
    medals:[
      'Bronze: unlocked at 100 points.',
      'Silver: unlocked at 200 points.',
      'Gold: unlocked at 500 points.',
      'Special medals are unlocked through consistency in the Word, prayer, thanksgiving, faith declarations, school, and completing the 365-day plan.'
    ],
    bibleTitle:'Bible Reading Plan in 365 Days',
    bibleIntro:'The 365-day plan is active. If the day content is not displayed, this safe display has been enabled.',
    openDay:'Open day',
    day:'Day',
    refs:'Today’s readings'
  },
  hr:{
    supportIntro:'Vaši darovi pomažu nam širiti Evanđelje, poučavati Božju riječ i odgajati snažne vjernike za Božje kraljevstvo.',
    paypal:'Podrži putem PayPala',
    revolut:'Podrži putem Revoluta',
    medalGuide:'Vodič za medalje',
    medals:[
      'Brončana: otključava se sa 100 bodova.',
      'Srebrna: otključava se sa 200 bodova.',
      'Zlatna: otključava se sa 500 bodova.',
      'Posebne medalje otključavaju se kroz postojanost u Riječi, molitvi, zahvalnosti, izjavama vjere, školi i završetku plana od 365 dana.'
    ],
    bibleTitle:'Plan čitanja Biblije u 365 dana',
    bibleIntro:'Plan od 365 dana je aktivan. Ako se sadržaj dana ne prikazuje, omogućen je ovaj siguran prikaz.',
    openDay:'Otvori dan',
    day:'Dan',
    refs:'Današnja čitanja'
  }
};
function L(){return I[lang()]||I.fa;}

function text(el){return (el && el.textContent || '').replace(/\s+/g,' ').trim();}
function qAll(r,s){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
function more(){return document.getElementById('more');}

function childOf(root,el){
  if(!el || !root) return null;
  var cur=el;
  while(cur && cur.parentElement && cur.parentElement!==root && cur!==document.body){
    cur=cur.parentElement;
  }
  return (cur && cur.parentElement===root) ? cur : null;
}
function cardOf(root,el){
  if(!el || !root) return null;
  return el.closest('.card,[class*="card"],section,article,details') || childOf(root,el) || el.closest('div');
}
function findIn(root,pattern){
  if(!root) return null;
  return qAll(root,'h1,h2,h3,h4,strong,b,p,div,button,summary').find(function(el){return pattern.test(text(el));});
}
function findCard(root,pattern){
  var hit=findIn(root,pattern);
  return hit ? cardOf(root,hit) : null;
}

function ensureSupportButtons(){
  var m=more(); if(!m) return;
  var l=L();
  var supportCard=findCard(m,/هدایای شما|حمایت مالی|هدایت و حمایت|Giving|Support|Your gifts|Vaši darovi|Podrška/i);
  if(!supportCard) return;

  var box=supportCard.querySelector('.v6382-support-box');
  if(!box){
    box=document.createElement('div');
    box.className='v6382-support-box';
    supportCard.appendChild(box);
  }

  box.innerHTML =
    '<p>'+l.supportIntro+'</p>'+
    '<div class="v6382-support-actions">'+
      '<a class="v6382-support-btn v6382-paypal" href="'+PAYPAL_URL+'" target="_blank" rel="noopener">💙 '+l.paypal+'</a>'+
      '<a class="v6382-support-btn v6382-revolut" href="'+REVOLUT_URL+'" target="_blank" rel="noopener">💳 '+l.revolut+'</a>'+
    '</div>';

  box.classList.remove('v6382-hide','v6381-hide','v6380-hide');
  try{
    box.style.setProperty('display','block','important');
    box.style.setProperty('visibility','visible','important');
    box.style.setProperty('height','auto','important');
    box.style.setProperty('opacity','1','important');
  }catch(e){}
}

function hasColoredStripeVisual(el){
  if(!el || !el.getBoundingClientRect) return false;
  var tx=text(el);
  if(tx.length>140) return false;
  var r,s;
  try{r=el.getBoundingClientRect();}catch(e){return false;}
  try{s=getComputedStyle(el);}catch(e){s={backgroundColor:'',backgroundImage:'',borderTopColor:'',borderBottomColor:''};}

  if(r.width<80 || r.height<1 || r.height>190) return false;

  var styleText=String(s.backgroundColor)+' '+String(s.backgroundImage)+' '+String(s.borderTopColor)+' '+String(s.borderBottomColor);
  var direct=/rgb\(|rgba\(|blue|green|purple|red|linear-gradient|repeating-linear-gradient/i.test(styleText);

  var colorChildren=0;
  qAll(el,'*').forEach(function(ch){
    var cr,cs;
    try{cr=ch.getBoundingClientRect();}catch(e){cr={width:0,height:999};}
    try{cs=getComputedStyle(ch);}catch(e){cs={backgroundColor:'',backgroundImage:''};}
    var ct=String(cs.backgroundColor)+' '+String(cs.backgroundImage);
    if(cr.width>50 && cr.height>=1 && cr.height<40 && /rgb\(|rgba\(|blue|green|purple|red|linear-gradient/i.test(ct)){
      colorChildren++;
    }
  });

  return direct || colorChildren>=2;
}

function hideColorBars(){
  var m=more(); if(!m) return;
  var medalCard=findCard(m,/رشد روحانی و مدال|Spiritual Growth|Medals|Rewards|مدال‌ها/i);
  if(!medalCard) return;
  var mr;
  try{mr=medalCard.getBoundingClientRect();}catch(e){return;}

  qAll(m,'*').forEach(function(el){
    if(el===medalCard || medalCard.contains(el)) return;
    if(!hasColoredStripeVisual(el)) return;
    var r;
    try{r=el.getBoundingClientRect();}catch(e){return;}
    var nearAbove = r.bottom <= mr.top + 75 && r.bottom >= mr.top - 420;
    var overlap = r.right > mr.left + 5 && r.left < mr.right - 5;
    if(nearAbove && overlap){
      el.classList.add('v6382-hide');
      try{
        el.style.setProperty('display','none','important');
        el.style.setProperty('visibility','hidden','important');
        el.style.setProperty('height','0','important');
      }catch(x){}
      var p=el.parentElement;
      if(p && p!==m && p!==document.body && text(p).length<180){
        var pr; try{pr=p.getBoundingClientRect();}catch(e){pr={height:999};}
        if(pr.height<260) p.classList.add('v6382-hide');
      }
    }
  });

  var top=childOf(m,medalCard) || medalCard;
  if(top && top.parentElement){
    var kids=Array.prototype.slice.call(top.parentElement.children);
    var idx=kids.indexOf(top);
    kids.slice(Math.max(0,idx-7),idx).forEach(function(el){
      var txt=text(el);
      var r; try{r=el.getBoundingClientRect();}catch(e){r={height:999,width:0};}
      if((txt.length<30 && r.height<220) || hasColoredStripeVisual(el)){
        el.classList.add('v6382-hide');
      }
    });
  }
}

function hideBetaReport(){
  var m=more(); if(!m) return;
  qAll(m,'.card,[class*="card"],section,article,details,div').forEach(function(el){
    var t=text(el);
    if(!t || t.length>2000) return;
    if(/گزارش تست نسخه بتا|نسخه بتا برای تست نهایی آماده است|Beta test report|Beta version test report|Izvješće testne beta/i.test(t)){
      el.classList.add('v6382-hide');
    }
  });
}

function stableMedalGuideBox(card){
  var l=L();
  var box=card.querySelector('.v6382-medal-guide-box');
  if(!box){
    box=document.createElement('div');
    box.className='v6382-medal-guide-box';
    card.appendChild(box);
  }
  box.innerHTML='<strong>🏆 '+l.medalGuide+'</strong><ul>'+l.medals.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
  box.classList.remove('v6382-hide','v6381-hide','v6380-hide');
  try{
    box.style.setProperty('display','block','important');
    box.style.setProperty('visibility','visible','important');
    box.style.setProperty('height','auto','important');
    box.style.setProperty('opacity','1','important');
  }catch(e){}
  return box;
}

function stabilizeMedalGuide(){
  var m=more(); if(!m) return;
  var medalCard=findCard(m,/رشد روحانی و مدال|Spiritual Growth|Medals|Rewards|مدال‌ها/i);
  if(!medalCard) return;

  qAll(medalCard,'button,a,summary').filter(function(el){
    return /راهنمای مدال|Medal Guide|Vodič za medalje/i.test(text(el));
  }).forEach(function(btn){
    if(btn.dataset.v6382Bound!=='1'){
      btn.dataset.v6382Bound='1';
      btn.addEventListener('click',function(e){
        try{e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();}catch(x){}
        stableMedalGuideBox(medalCard);
        return false;
      },true);
    }
  });

  var box=medalCard.querySelector('.v6382-medal-guide-box');
  if(box){
    box.classList.remove('v6382-hide','v6381-hide','v6380-hide');
    try{
      box.style.setProperty('display','block','important');
      box.style.setProperty('visibility','visible','important');
      box.style.setProperty('height','auto','important');
      box.style.setProperty('opacity','1','important');
    }catch(e){}
  }
}

/* Safe rescue for empty Bible 365 page. Uses existing global plan if present. */
function getPlan(){
  if(Array.isArray(window.OMIDENO7_BIBLE365_PLAN)) return window.OMIDENO7_BIBLE365_PLAN;
  if(window.OMIDENO7_BIBLE365 && Array.isArray(window.OMIDENO7_BIBLE365.plan)) return window.OMIDENO7_BIBLE365.plan;
  if(Array.isArray(window.BIBLE365_PLAN)) return window.BIBLE365_PLAN;
  // Minimal safe fallback only if global plan variable name is not exposed.
  return [
    {day:1,title:{fa:'روز 1 از ۳۶۵',en:'Day 1 of 365',hr:'Dan 1 od 365'},references:{fa:'سوم یوحنا 1؛ دوم یوحنا 1؛ داوران 1',en:'3 John 1; 2 John 1; Judges 1',hr:'3. Ivanova 1; 2. Ivanova 1; Suci 1'}},
    {day:2,title:{fa:'روز 2 از ۳۶۵',en:'Day 2 of 365',hr:'Dan 2 od 365'},references:{fa:'داوران 2؛ جامعه 1؛ داوران 3',en:'Judges 2; Ecclesiastes 1; Judges 3',hr:'Suci 2; Propovjednik 1; Suci 3'}},
    {day:3,title:{fa:'روز 3 از ۳۶۵',en:'Day 3 of 365',hr:'Dan 3 od 365'},references:{fa:'داوران 4-6',en:'Judges 4-6',hr:'Suci 4-6'}},
    {day:4,title:{fa:'روز 4 از ۳۶۵',en:'Day 4 of 365',hr:'Dan 4 od 365'},references:{fa:'جامعه 2-3؛ یوحنا 1؛ داوران 7',en:'Ecclesiastes 2-3; John 1; Judges 7',hr:'Propovjednik 2-3; Ivan 1; Suci 7'}},
    {day:5,title:{fa:'روز 5 از ۳۶۵',en:'Day 5 of 365',hr:'Dan 5 od 365'},references:{fa:'داوران 8؛ یوحنا 2؛ داوران 9',en:'Judges 8; John 2; Judges 9',hr:'Suci 8; Ivan 2; Suci 9'}}
  ];
}
function rescueBible365(){
  var l=L();
  // Only run when user is inside a Bible/Book page area that visibly mentions 365 and is empty.
  var roots=qAll(document,'#book,#bible,#bookSection,#bibleSection,.book-section,.bible-section,main,section,div').filter(function(el){
    var t=text(el);
    return /۳۶۵|365|یک سال|one year|One Year|godinu|365 dana/i.test(t) && t.length<900;
  });
  if(!roots.length) return;

  roots.forEach(function(r){
    if(r.querySelector('.v6382-bible365-rescue')) return;
    var existing=text(r);
    // Only rescue empty/near-empty plan pages, not More card.
    if(/رشد روحانی و مدال|هدایای شما|گزارش تست|ارتباط با ما/i.test(existing)) return;
    if(existing.length>650) return;

    var plan=getPlan();
    var current=1;
    try{current=parseInt(localStorage.getItem('bible365CurrentDay')||localStorage.getItem('omideno7_bible365_day')||'1',10)||1;}catch(e){}
    var start=Math.max(1,current);
    var rows=plan.slice(start-1,start+4).map(function(d){
      var title=(d.title&&d.title[lang()])||d.title||((lang()==='fa'?'روز ':'Day ')+d.day);
      var refs=(d.references&&d.references[lang()])||d.references||'';
      return '<div class="v6382-bible365-day"><strong>'+title+'</strong><div>'+l.refs+': '+refs+'</div></div>';
    }).join('');

    var box=document.createElement('div');
    box.className='v6382-bible365-rescue';
    box.innerHTML='<h3>'+l.bibleTitle+'</h3><p>'+l.bibleIntro+'</p>'+rows;
    r.appendChild(box);
  });
}

function render(){
  css();
  ensureSupportButtons();
  hideColorBars();
  hideBetaReport();
  stabilizeMedalGuide();
  rescueBible365();
}

document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,60);setTimeout(render,250);setTimeout(render,900);},true);
setTimeout(render,100);
setTimeout(render,500);
setTimeout(render,1200);
setTimeout(render,2500);
setTimeout(render,5000);
setInterval(render,650);

try{
  var mo=new MutationObserver(function(){setTimeout(render,80);});
  mo.observe(document.body,{childList:true,subtree:true});
}catch(e){}

window.OMIDENO7_V6382_MORE_PAGE_HARD_FIX={render:render,version:VERSION};
})();
