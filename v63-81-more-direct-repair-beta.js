
/* Omideno7 V63.81 — More Direct Repair
   Focused patch only for More page:
   - Directly repairs the visible More-page cards shown in testing.
   - Adds missing PayPal/Revolut buttons to the support/giving card.
   - Restores Contact Us content if empty.
   - Hides colored debug stripes between support/contact area and medals.
   - Hides beta test report card.
   - Keeps medal guide open.
   Does not change Home, School, Word, Bible, Plans, New Birth, Admin, Cloud/Offline logic or app data.
*/
(function(){
'use strict';

var VERSION='V63.81 More Direct Repair';

var PAYPAL_URL='https://www.paypal.me/MehdiBadanFirouz337';
var REVOLUT_URL='https://revolut.me/m_badanfirouz';

function css(){
  if(document.getElementById('v6381MoreDirectRepairCss')) return;
  var st=document.createElement('style');
  st.id='v6381MoreDirectRepairCss';
  st.textContent=[
    '.v6381-hide{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}',
    '.v6381-contact-box,.v6381-support-box,.v6381-medal-guide-box{margin-top:12px;padding:12px;border-radius:16px;background:rgba(6,20,109,.045);border:1px solid rgba(6,20,109,.12);line-height:1.9;}',
    '.v6381-contact-box a{font-weight:900;color:#06146d;text-decoration:none;}',
    '.v6381-support-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;}',
    '.v6381-support-btn{display:flex;align-items:center;justify-content:center;gap:8px;border-radius:14px;padding:12px 10px;text-decoration:none;font-weight:950;box-shadow:0 8px 18px rgba(0,0,0,.12);}',
    '.v6381-paypal{background:#003087;color:#fff!important;}',
    '.v6381-revolut{background:#111827;color:#fff!important;}',
    '.v6381-medal-guide-box{font-weight:700;}',
    '.v6381-medal-guide-box ul{margin:8px 0 0 0;padding-inline-start:20px;}',
    '.v6381-medal-guide-box li{margin:4px 0;}',
    '@media(max-width:520px){.v6381-support-actions{grid-template-columns:1fr;}}'
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
function tx(el){return (el && el.textContent || '').replace(/\s+/g,' ').trim();}
function more(){return document.getElementById('more');}
function all(root,sel){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}

var I={
  fa:{
    contactIntro:'برای ارتباط با کلیسای امیدنو۷ از راه‌های زیر استفاده کنید.',
    email:'ایمیل کلیسا',
    instagram:'اینستاگرام',
    youtube:'یوتیوب',
    supportIntro:'هدایای شما به ما کمک می‌کند انجیل را گسترش دهیم، کلام خدا را تعلیم دهیم و ایماندارانی قوی برای پادشاهی خدا تربیت کنیم.',
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
    contactIntro:'Use the following ways to contact Omideno 7 Church.',
    email:'Church email',
    instagram:'Instagram',
    youtube:'YouTube',
    supportIntro:'Your gifts help us spread the Gospel, teach God’s Word, and raise strong believers for the Kingdom of God.',
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
    contactIntro:'Za kontakt s Crkvom Omideno 7 koristite sljedeće načine.',
    email:'E-mail crkve',
    instagram:'Instagram',
    youtube:'YouTube',
    supportIntro:'Vaši darovi pomažu nam širiti Evanđelje, poučavati Božju riječ i odgajati snažne vjernike za Božje kraljevstvo.',
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
function L(){return I[lang()]||I.fa;}

function topCard(el){
  var root=more();
  if(!el || !root) return null;
  var c=el.closest('.card,[class*="card"],section,article,details');
  if(c) return c;
  // climb to child of #more
  var cur=el;
  while(cur && cur.parentElement && cur.parentElement!==root && cur!==document.body){
    cur=cur.parentElement;
  }
  return (cur && cur.parentElement===root) ? cur : el.closest('div');
}

function findCard(pattern){
  var root=more(); if(!root) return null;
  var hit=all(root,'h1,h2,h3,h4,strong,b,p,div,button,summary').find(function(el){
    return pattern.test(tx(el));
  });
  return hit ? topCard(hit) : null;
}

function restoreContact(){
  var l=L();
  var card=findCard(/ارتباط با ما|Contact Us|Contact|Kontakt/i);
  if(!card) return;

  if(card.querySelector('.v6381-contact-box')) return;
  if(/omideno7church@gmail\.com|instagram|اینستاگرام|youtube|یوتیوب/i.test(tx(card))) return;

  var box=document.createElement('div');
  box.className='v6381-contact-box';
  box.innerHTML =
    '<p>'+l.contactIntro+'</p>'+
    '<p>📧 <strong>'+l.email+':</strong> <a href="mailto:omideno7church@gmail.com">omideno7church@gmail.com</a></p>'+
    '<p>📷 <strong>'+l.instagram+':</strong> <a href="https://www.instagram.com/omideno7" target="_blank" rel="noopener">omideno7</a></p>'+
    '<p>▶️ <strong>'+l.youtube+':</strong> <a href="https://www.youtube.com/@omideno7" target="_blank" rel="noopener">omideno7</a></p>';
  card.appendChild(box);
}

function restoreSupport(){
  var l=L();

  // Search by the visible sentence in your screenshot, not just by title.
  var card=findCard(/هدایای شما|حمایت مالی|هدایت و حمایت|Giving|Support|Your gifts|Vaši darovi|Podrška/i);
  if(!card) return;

  if(card.querySelector('.v6381-support-box')) return;
  if(/paypal|revolut|پیپال|ریوولت/i.test(tx(card))) return;

  var box=document.createElement('div');
  box.className='v6381-support-box';
  box.innerHTML =
    '<p>'+l.supportIntro+'</p>'+
    '<div class="v6381-support-actions">'+
      '<a class="v6381-support-btn v6381-paypal" href="'+PAYPAL_URL+'" target="_blank" rel="noopener">💙 '+l.paypal+'</a>'+
      '<a class="v6381-support-btn v6381-revolut" href="'+REVOLUT_URL+'" target="_blank" rel="noopener">💳 '+l.revolut+'</a>'+
    '</div>';
  card.appendChild(box);
}

function hideBetaReport(){
  var root=more(); if(!root) return;
  all(root,'.card,[class*="card"],section,article,details,div').forEach(function(el){
    var text=tx(el);
    if(!text || text.length>1800) return;
    if(/گزارش تست نسخه بتا|نسخه بتا برای تست نهایی آماده است|Beta test report|Beta version test report|Izvješće testne beta/i.test(text)){
      el.classList.add('v6381-hide');
    }
  });
}

function isStripe(el){
  if(!el || !el.getBoundingClientRect) return false;
  var text=tx(el);
  if(text.length>100) return false;

  var r,s;
  try{r=el.getBoundingClientRect();}catch(e){r={width:0,height:999};}
  try{s=getComputedStyle(el);}catch(e){s={backgroundColor:'',backgroundImage:'',borderTopColor:'',borderBottomColor:''};}

  if(r.width<120 || r.height<2 || r.height>150) return false;

  var styleText=String(s.backgroundColor)+' '+String(s.backgroundImage)+' '+String(s.borderTopColor)+' '+String(s.borderBottomColor);
  var direct=/rgb\(|rgba\(|blue|green|purple|red|linear-gradient|repeating-linear-gradient/i.test(styleText);

  var coloredChildren=0;
  all(el,'*').forEach(function(ch){
    var cr,cs;
    try{cr=ch.getBoundingClientRect();}catch(e){cr={width:0,height:999};}
    try{cs=getComputedStyle(ch);}catch(e){cs={backgroundColor:'',backgroundImage:''};}
    if(cr.width>80 && cr.height>=1 && cr.height<30 && /rgb\(|rgba\(|blue|green|purple|red|linear-gradient/i.test(String(cs.backgroundColor)+' '+String(cs.backgroundImage))){
      coloredChildren++;
    }
  });

  return direct || coloredChildren>=2;
}

function hideStripes(){
  var root=more(); if(!root) return;

  var medal=findCard(/رشد روحانی و مدال|Spiritual Growth|Medals|Rewards|مدال‌ها/i);
  var support=findCard(/هدایای شما|حمایت مالی|هدایت و حمایت|Giving|Support|Your gifts|Vaši darovi|Podrška/i);

  if(medal){
    var mr; try{mr=medal.getBoundingClientRect();}catch(e){mr=null;}
    all(root,'div,section,hr,p').forEach(function(el){
      if(!mr || !isStripe(el)) return;
      var r; try{r=el.getBoundingClientRect();}catch(e){return;}
      var nearMedal = r.bottom <= mr.top + 30 && r.bottom >= mr.top - 320;
      var overlap = r.right > mr.left + 20 && r.left < mr.right - 20;
      if(nearMedal && overlap){
        el.classList.add('v6381-hide');
        if(el.parentElement && tx(el.parentElement).length<120){
          el.parentElement.classList.add('v6381-hide');
        }
      }
    });
  }

  // Direct fallback: hide short/color blocks immediately after support card.
  if(support && support.parentElement){
    var kids=Array.prototype.slice.call(support.parentElement.children);
    var idx=kids.indexOf(support);
    kids.slice(idx+1, idx+5).forEach(function(el){
      if(isStripe(el) || tx(el).length<5){
        el.classList.add('v6381-hide');
      }
    });
  }
}

function stabilizeMedalGuide(){
  var root=more(); if(!root) return;
  var l=L();
  var buttons=all(root,'button,a,summary').filter(function(el){
    return /راهنمای مدال|Medal Guide|Vodič za medalje/i.test(tx(el));
  });
  buttons.forEach(function(btn){
    if(btn.dataset.v6381Bound==='1') return;
    btn.dataset.v6381Bound='1';
    btn.addEventListener('click',function(e){
      try{e.preventDefault(); e.stopPropagation();}catch(x){}
      var card=topCard(btn) || root;
      var box=card.querySelector('.v6381-medal-guide-box');
      if(!box){
        box=document.createElement('div');
        box.className='v6381-medal-guide-box';
        box.innerHTML='<strong>🏆 '+l.medalGuide+'</strong><ul>'+l.medals.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
        card.appendChild(box);
      }
      box.classList.remove('v6381-hide');
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
  hideStripes();
  stabilizeMedalGuide();
}

document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,120);setTimeout(render,600);},true);
setTimeout(render,250);
setTimeout(render,1000);
setTimeout(render,2500);
setTimeout(render,5000);
setInterval(render,1000);

window.OMIDENO7_V6381_MORE_DIRECT_REPAIR={render:render,version:VERSION};
})();
