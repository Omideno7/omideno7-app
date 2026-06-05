
/* Omideno7 V63.80 — More Page Final Fixes
   Focused patch only for More page:
   1) Restores Contact Us content if empty.
   2) Restores Guidance/Support PayPal and Revolut buttons if missing.
   3) Hides remaining colored debug stripes above medals.
   4) Hides beta test report card.
   5) Stabilizes Medal Guide so it stays open.
   Does not change Home, School, Word, Bible, Plans, New Birth, Admin approval, Cloud/Offline logic or app data.
*/
(function(){
'use strict';

var VERSION='V63.80 More Final Fixes';

/* Change these two links later if your real donation links are different. */
var PAYPAL_URL='https://paypal.me/omideno7';
var REVOLUT_URL='https://revolut.me/omideno7';

function css(){
  if(document.getElementById('v6380MoreFinalFixesCss')) return;
  var st=document.createElement('style');
  st.id='v6380MoreFinalFixesCss';
  st.textContent=[
    '.v6380-hide{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}',
    '.v6380-contact-box,.v6380-support-box,.v6380-medal-guide-box{margin-top:10px;padding:12px;border-radius:16px;background:rgba(6,20,109,.045);border:1px solid rgba(6,20,109,.10);line-height:1.9;}',
    '.v6380-contact-box a{font-weight:900;color:#06146d;text-decoration:none;}',
    '.v6380-support-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;}',
    '.v6380-support-btn{display:flex;align-items:center;justify-content:center;gap:8px;border-radius:14px;padding:11px 12px;text-decoration:none;font-weight:950;box-shadow:0 8px 18px rgba(0,0,0,.10);}',
    '.v6380-paypal{background:#003087;color:#fff!important;}',
    '.v6380-revolut{background:#111827;color:#fff!important;}',
    '.v6380-medal-guide-box{font-weight:700;}',
    '.v6380-medal-guide-box ul{margin:8px 0 0 0;padding-inline-start:20px;}',
    '.v6380-medal-guide-box li{margin:4px 0;}',
    '@media(max-width:520px){.v6380-support-actions{grid-template-columns:1fr;}}'
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
function t(el){return (el && el.textContent || '').replace(/\s+/g,' ').trim();}
function more(){return document.getElementById('more');}
function qAll(root,sel){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}

var I18N={
  fa:{
    contactTitle:'ارتباط با ما',
    contactIntro:'برای ارتباط با کلیسای امیدنو۷ از راه‌های زیر استفاده کنید.',
    email:'ایمیل کلیسا',
    instagram:'اینستاگرام',
    youtube:'یوتیوب',
    supportTitle:'هدایت و حمایت',
    supportIntro:'اگر مایل هستید در گسترش کار خدا و خدمت کلیسای امیدنو۷ شریک شوید، می‌توانید از راه‌های زیر حمایت کنید.',
    paypal:'حمایت با PayPal',
    revolut:'حمایت با Revolut',
    medalGuide:'راهنمای مدال‌ها',
    medals:[
      'برنزی: با رسیدن به ۱۰۰ امتیاز آزاد می‌شود.',
      'نقره‌ای: با رسیدن به ۲۰۰ امتیاز آزاد می‌شود.',
      'طلایی: با رسیدن به ۵۰۰ امتیاز آزاد می‌شود.',
      'مدال‌های ویژه برای ثبات در کلام، دعا، شکرگزاری، اعلان ایمان، مدرسه و تکمیل برنامه ۳۶۵ روزه آزاد می‌شوند.'
    ]
  },
  en:{
    contactTitle:'Contact Us',
    contactIntro:'Use the following ways to contact Omideno 7 Church.',
    email:'Church email',
    instagram:'Instagram',
    youtube:'YouTube',
    supportTitle:'Guidance & Support',
    supportIntro:'If you would like to partner with the work of God through Omideno 7 Church, you may support through the options below.',
    paypal:'Support with PayPal',
    revolut:'Support with Revolut',
    medalGuide:'Medal Guide',
    medals:[
      'Bronze: unlocked at 100 points.',
      'Silver: unlocked at 200 points.',
      'Gold: unlocked at 500 points.',
      'Special medals are unlocked through consistency in the Word, prayer, thanksgiving, faith declarations, school, and completing the 365-day plan.'
    ]
  },
  hr:{
    contactTitle:'Kontakt',
    contactIntro:'Za kontakt s Crkvom Omideno 7 koristite sljedeće načine.',
    email:'E-mail crkve',
    instagram:'Instagram',
    youtube:'YouTube',
    supportTitle:'Vodstvo i podrška',
    supportIntro:'Ako želite sudjelovati u Božjem djelu kroz Crkvu Omideno 7, možete podržati putem opcija u nastavku.',
    paypal:'Podrži putem PayPala',
    revolut:'Podrži putem Revoluta',
    medalGuide:'Vodič za medalje',
    medals:[
      'Brončana: otključava se sa 100 bodova.',
      'Srebrna: otključava se sa 200 bodova.',
      'Zlatna: otključava se sa 500 bodova.',
      'Posebne medalje otključavaju se kroz postojanost u Riječi, molitvi, zahvalnosti, izjavama vjere, školi i završetku plana od 365 dana.'
    ]
  }
};

function L(){return I18N[lang()]||I18N.fa;}

function closestCard(el){
  return el && (el.closest('.card,[class*="card"],section,article,details') || el.closest('div'));
}
function findCardByTitle(pattern){
  var root=more();
  if(!root) return null;
  var hit=qAll(root,'h1,h2,h3,h4,strong,b,button,summary,div').find(function(el){
    return pattern.test(t(el));
  });
  return hit ? closestCard(hit) : null;
}

function restoreContact(){
  var root=more(); if(!root) return;
  var l=L();
  var card=findCardByTitle(/ارتباط با ما|Contact Us|Contact|Kontakt/i);
  if(!card) return;

  if(card.querySelector('.v6380-contact-box')) return;

  var existing=t(card);
  var hasRealContent=/omideno7church@gmail\.com|instagram|اینستاگرام|youtube|یوتیوب/i.test(existing);
  if(hasRealContent) return;

  var box=document.createElement('div');
  box.className='v6380-contact-box';
  box.innerHTML =
    '<p>'+l.contactIntro+'</p>'+
    '<p>📧 <strong>'+l.email+':</strong> <a href="mailto:omideno7church@gmail.com">omideno7church@gmail.com</a></p>'+
    '<p>📷 <strong>'+l.instagram+':</strong> <a href="https://www.instagram.com/omideno7" target="_blank" rel="noopener">omideno7</a></p>'+
    '<p>▶️ <strong>'+l.youtube+':</strong> <a href="https://www.youtube.com/@omideno7" target="_blank" rel="noopener">omideno7</a></p>';
  card.appendChild(box);
}

function restoreSupport(){
  var root=more(); if(!root) return;
  var l=L();
  var card=findCardByTitle(/هدایت و حمایت|حمایت مالی|Guidance|Support|Giving|Podrška|Donacija|Vodstvo/i);
  if(!card) return;

  if(card.querySelector('.v6380-support-box')) return;

  var existing=t(card);
  var hasPay=/paypal|revolut|پیپال|ریوولت/i.test(existing);
  if(hasPay) return;

  var box=document.createElement('div');
  box.className='v6380-support-box';
  box.innerHTML =
    '<p>'+l.supportIntro+'</p>'+
    '<div class="v6380-support-actions">'+
      '<a class="v6380-support-btn v6380-paypal" href="'+PAYPAL_URL+'" target="_blank" rel="noopener">💙 '+l.paypal+'</a>'+
      '<a class="v6380-support-btn v6380-revolut" href="'+REVOLUT_URL+'" target="_blank" rel="noopener">💳 '+l.revolut+'</a>'+
    '</div>';
  card.appendChild(box);
}

function hideBetaReport(){
  var root=more(); if(!root) return;
  qAll(root,'.card,[class*="card"],section,article,details,div').forEach(function(el){
    if(el.classList && el.classList.contains('v6380-hide')) return;
    var tx=t(el);
    if(!tx || tx.length>1500) return;
    if(/گزارش تست نسخه بتا|نسخه بتا برای تست نهایی آماده است|Beta test report|Beta version test report|Izvješće testne beta/i.test(tx)){
      el.classList.add('v6380-hide');
    }
  });
}

function isMedalText(tx){
  return /رشد روحانی و مدال|Spiritual Growth|Medals|Rewards|مدال‌ها/i.test(tx||'');
}
function looksLikeStripe(el){
  if(!el || !el.getBoundingClientRect) return false;
  var tx=t(el);
  if(tx.length>80) return false;
  var r,s;
  try{r=el.getBoundingClientRect();}catch(e){r={width:0,height:999};}
  try{s=getComputedStyle(el);}catch(e){s={backgroundColor:'',backgroundImage:'',borderTopColor:'',borderBottomColor:''};}
  var colorText=String(s.backgroundColor)+' '+String(s.backgroundImage)+' '+String(s.borderTopColor)+' '+String(s.borderBottomColor);
  var direct=/rgb\(|rgba\(|blue|green|purple|red|linear-gradient|repeating-linear-gradient/i.test(colorText);
  var childCount=0;
  qAll(el,'*').forEach(function(ch){
    var cr,cs;
    try{cr=ch.getBoundingClientRect();}catch(e){cr={width:0,height:999};}
    try{cs=getComputedStyle(ch);}catch(e){cs={backgroundColor:'',backgroundImage:''};}
    if(cr.width>80 && cr.height>=1 && cr.height<26 && /rgb\(|rgba\(|blue|green|purple|red|linear-gradient/i.test(String(cs.backgroundColor)+' '+String(cs.backgroundImage))){
      childCount++;
    }
  });
  return r.width>120 && r.height>=2 && r.height<130 && (direct || childCount>=2);
}
function hideColoredStripes(){
  var root=more(); if(!root) return;
  var all=qAll(root,'*');
  var medal=all.find(function(el){return isMedalText(t(el));});
  if(!medal) return;
  var medalCard=closestCard(medal) || medal;
  var mr;
  try{mr=medalCard.getBoundingClientRect();}catch(e){return;}

  all.forEach(function(el){
    if(!el || el===medalCard || medalCard.contains(el)) return;
    var r;
    try{r=el.getBoundingClientRect();}catch(e){return;}
    var nearAbove = r.bottom <= mr.top + 20 && r.bottom >= mr.top - 260;
    var overlaps = r.right > mr.left + 20 && r.left < mr.right - 20;
    if(nearAbove && overlaps && looksLikeStripe(el)){
      el.classList.add('v6380-hide');
      var p=el.parentElement;
      if(p && p!==document.body && p!==root && t(p).length<100){
        var pr; try{pr=p.getBoundingClientRect();}catch(e){pr={height:999};}
        if(pr.height<160) p.classList.add('v6380-hide');
      }
    }
  });
}

function stabilizeMedalGuide(){
  var root=more(); if(!root) return;
  var l=L();
  var buttons=qAll(root,'button,a,summary').filter(function(el){
    return /راهنمای مدال|Medal Guide|Vodič za medalje/i.test(t(el));
  });
  buttons.forEach(function(btn){
    if(btn.dataset.v6380Bound==='1') return;
    btn.dataset.v6380Bound='1';
    btn.addEventListener('click',function(e){
      try{e.preventDefault(); e.stopPropagation();}catch(x){}
      var card=closestCard(btn) || root;
      var box=card.querySelector('.v6380-medal-guide-box');
      if(!box){
        box=document.createElement('div');
        box.className='v6380-medal-guide-box';
        box.innerHTML='<strong>🏆 '+l.medalGuide+'</strong><ul>'+l.medals.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
        card.appendChild(box);
      }else{
        box.classList.toggle('v6380-hide');
      }
      if(box.classList.contains('v6380-hide')) box.classList.remove('v6380-hide');
      try{
        box.style.setProperty('display','block','important');
        box.style.setProperty('visibility','visible','important');
        box.style.setProperty('height','auto','important');
      }catch(x){}
      return false;
    },true);
  });
}

function render(){
  css();
  restoreContact();
  restoreSupport();
  hideBetaReport();
  hideColoredStripes();
  stabilizeMedalGuide();
}

document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,120);setTimeout(render,600);},true);
setTimeout(render,250);
setTimeout(render,1000);
setTimeout(render,2500);
setInterval(render,1200);

window.OMIDENO7_V6380_MORE_FINAL_FIXES={render:render,version:VERSION};
})();
