
/* Omideno7 V63.67 — Daily Amen Popup + Spiritual Audio Icon
   Replacement for v63-60-remove-duplicate-welcome-amen-beta.js
   Focused patch only:
   1) Keeps removing the old duplicate welcome card.
   2) Shows a trilingual daily entry encouragement popup; message changes by Zagreb day.
   3) Adds a small speaker icon next to the Spiritual Audio Messages title/card.
   No other app sections are changed.
*/
(function(){
'use strict';

var VERSION='V63.69 Stable Audio Icon';
var SESSION_PREFIX='omideno7_v6367_amen_seen_';
var TZ='Europe/Zagreb';

function isBeta(){
  return /beta\.html/i.test(location.pathname) || /v=6367|v=6366|v=6365|v=6364|v=6363|v=6362|v=6361|v=6360|v=6359|v=6358/i.test(location.search);
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
function zagrebDayOfYear(){
  try{
    var y = new Intl.DateTimeFormat('en-GB',{timeZone:TZ,year:'numeric'}).format(new Date());
    var m = new Intl.DateTimeFormat('en-GB',{timeZone:TZ,month:'2-digit'}).format(new Date());
    var d = new Intl.DateTimeFormat('en-GB',{timeZone:TZ,day:'2-digit'}).format(new Date());
    var date = new Date(Date.UTC(Number(y), Number(m)-1, Number(d)));
    var start = new Date(Date.UTC(Number(y),0,1));
    return Math.floor((date-start)/86400000)+1;
  }catch(e){
    var now=new Date(), start2=new Date(now.getFullYear(),0,1);
    return Math.floor((now-start2)/86400000)+1;
  }
}
function zagrebDateKey(){
  try{
    var y = new Intl.DateTimeFormat('en-GB',{timeZone:TZ,year:'numeric'}).format(new Date());
    var m = new Intl.DateTimeFormat('en-GB',{timeZone:TZ,month:'2-digit'}).format(new Date());
    var d = new Intl.DateTimeFormat('en-GB',{timeZone:TZ,day:'2-digit'}).format(new Date());
    return y+'-'+m+'-'+d;
  }catch(e){
    var n=new Date();
    return n.getFullYear()+'-'+String(n.getMonth()+1).padStart(2,'0')+'-'+String(n.getDate()).padStart(2,'0');
  }
}
var DAILY_MESSAGES={
  fa:[
    'امروز با ایمان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.',
    'امروز روز رشد توست؛ هر قدم کوچک در ایمان نزد خدا ارزشمند است.',
    'خداوند قوت توست؛ با آرامش، امید و اطمینان امروز را آغاز کن.',
    'کلام خدا امروز برای تو چراغ راه است؛ با آن فکر کن، دعا کن و حرکت کن.',
    'روح‌القدس در تو ساکن است؛ امروز با حکمت و قدرت خدا قدم بردار.',
    'تو تنها نیستی؛ حضور خدا همراه توست و فیض او تو را کافی است.',
    'امروز زبانت را با ایمان پر کن و زندگی را با کلام خدا بساز.',
    'خدا برای امروز تو نقشه نیکو دارد؛ با امید و شکرگزاری پیش برو.',
    'در مسیح، تو قوی‌تر از شرایط هستی؛ امروز پیروزی خود را اعلام کن.',
    'محبت خدا قلبت را تازه می‌کند؛ امروز محبت، آرامش و نور او را منتشر کن.',
    'ایمان تو زنده است؛ آن را با دعا، کلام و اطاعت فعال نگه دار.',
    'امروز در مسیر شاگردی رشد کن؛ خدا قدم‌های وفادارانه را برکت می‌دهد.',
    'نگاهت را بر وعده‌های خدا نگه دار؛ ترس جایی در قلب تو ندارد.',
    'امروز شکرگزاری را انتخاب کن؛ شکرگزاری درهای تازه را باز می‌کند.',
    'حکمت خدا در دسترس توست؛ قبل از هر تصمیم با او مشورت کن.',
    'تو نور خدا در این جهان هستی؛ امروز با گفتار و رفتارت بدرخش.',
    'فیض خدا تو را بلند می‌کند؛ با اطمینان جلو برو و عقب‌نشینی نکن.',
    'کلام خدا در دهان تو قدرت دارد؛ امروز برکت، شفا و پیروزی را اعلام کن.',
    'صلح مسیح داور قلب توست؛ امروز در آرامش او تصمیم بگیر.',
    'خداوند شبان توست؛ هیچ کمبودی نداری و راهت را هدایت می‌کند.',
    'امروز فرصتی تازه برای خدمت، محبت و رشد است؛ آن را با ایمان بپذیر.',
    'روح تو با کلام خدا تقویت می‌شود؛ امروز برای تغذیه روح خود وقت بگذار.',
    'در مسیح خلقت تازه هستی؛ گذشته هویت تو نیست، کلام خدا هویت توست.',
    'دعای تو مؤثر است؛ امروز با جسارت دعا کن و انتظار پاسخ داشته باش.',
    'خدا تو را برای ثمر آوردن خوانده است؛ امروز در او بمان و ثمر بده.',
    'امروز با شادی خداوند قوی باش؛ شادی او قوت توست.',
    'خداوند درهای مناسب را باز می‌کند؛ با ایمان و صبر در مسیر او بمان.',
    'ذهن خود را با کلام خدا تازه کن؛ افکار خدا بالاتر از افکار ترس است.',
    'امروز با محبت راه برو؛ محبت نشانه بلوغ و قدرت روحانی است.',
    'خدا با تو آغاز کرده و تو را کامل می‌سازد؛ به کار او اعتماد کن.',
    'امروز روز اعلام پیروزی است؛ در نام عیسی با ایمان زندگی کن.'
  ],
  en:[
    'Walk by faith today; the Lord is with you, and His Word lights your path.',
    'Today is a day of growth; every small step of faith is valuable before God.',
    'The Lord is your strength; begin today with peace, hope, and confidence.',
    'God’s Word is your lamp today; think with it, pray with it, and move with it.',
    'The Holy Spirit lives in you; walk today in God’s wisdom and power.',
    'You are not alone; God’s presence is with you, and His grace is sufficient.',
    'Fill your mouth with faith today and build your life with God’s Word.',
    'God has a good plan for your day; move forward with hope and thanksgiving.',
    'In Christ, you are greater than your circumstances; declare your victory today.',
    'God’s love refreshes your heart; release His love, peace, and light today.',
    'Your faith is alive; keep it active through prayer, the Word, and obedience.',
    'Grow in discipleship today; God blesses faithful steps.',
    'Keep your eyes on God’s promises; fear has no place in your heart.',
    'Choose thanksgiving today; thanksgiving opens fresh doors.',
    'God’s wisdom is available to you; consult Him before every decision.',
    'You are God’s light in this world; shine today through your words and actions.',
    'God’s grace lifts you; move forward with confidence and do not draw back.',
    'God’s Word in your mouth carries power; declare blessing, healing, and victory today.',
    'The peace of Christ rules your heart; make decisions today in His peace.',
    'The Lord is your Shepherd; you lack nothing, and He guides your path.',
    'Today is a fresh opportunity to serve, love, and grow; receive it by faith.',
    'Your spirit is strengthened by God’s Word; make time to feed your spirit today.',
    'You are a new creation in Christ; your past is not your identity—God’s Word is.',
    'Your prayer is effective; pray boldly today and expect answers.',
    'God called you to bear fruit; remain in Him and be fruitful today.',
    'Be strong today with the joy of the Lord; His joy is your strength.',
    'The Lord opens the right doors; stay in His path with faith and patience.',
    'Renew your mind with God’s Word; God’s thoughts are higher than fear.',
    'Walk in love today; love is a sign of maturity and spiritual strength.',
    'God began His work in you and will bring it to completion; trust His work.',
    'Today is a day to declare victory; live by faith in the name of Jesus.'
  ],
  hr:[
    'Hodaj danas u vjeri; Gospodin je s tobom i Njegova Riječ osvjetljava tvoj put.',
    'Danas je dan rasta; svaki mali korak vjere vrijedan je pred Bogom.',
    'Gospodin je tvoja snaga; započni dan s mirom, nadom i pouzdanjem.',
    'Božja Riječ je danas tvoja svjetiljka; misli po njoj, moli s njom i kreni naprijed.',
    'Duh Sveti prebiva u tebi; hodaj danas u Božjoj mudrosti i sili.',
    'Nisi sam; Božja prisutnost je s tobom i Njegova milost ti je dovoljna.',
    'Ispuni svoja usta vjerom i gradi svoj život Božjom Riječju.',
    'Bog ima dobar plan za tvoj dan; idi naprijed s nadom i zahvalnošću.',
    'U Kristu si veći od svojih okolnosti; danas proglasi svoju pobjedu.',
    'Božja ljubav obnavlja tvoje srce; širi Njegovu ljubav, mir i svjetlo.',
    'Tvoja vjera je živa; održavaj je aktivnom molitvom, Riječju i poslušnošću.',
    'Rasti danas u učeništvu; Bog blagoslivlja vjerne korake.',
    'Drži pogled na Božjim obećanjima; strah nema mjesta u tvom srcu.',
    'Izaberi zahvalnost danas; zahvalnost otvara nova vrata.',
    'Božja mudrost ti je dostupna; savjetuj se s Njim prije svake odluke.',
    'Ti si Božje svjetlo u ovom svijetu; sjaji danas riječima i djelima.',
    'Božja milost te podiže; idi naprijed s pouzdanjem i ne povlači se.',
    'Božja Riječ u tvojim ustima nosi silu; proglasi blagoslov, ozdravljenje i pobjedu.',
    'Kristov mir neka vlada tvojim srcem; donosi odluke u Njegovu miru.',
    'Gospodin je tvoj Pastir; ništa ti ne nedostaje i On vodi tvoj put.',
    'Danas je nova prilika za služenje, ljubav i rast; primi je vjerom.',
    'Tvoj duh jača Božjom Riječju; odvoji vrijeme da nahraniš svoj duh.',
    'Ti si novo stvorenje u Kristu; prošlost nije tvoj identitet—Božja Riječ jest.',
    'Tvoja molitva je djelotvorna; moli hrabro i očekuj odgovore.',
    'Bog te pozvao da donosiš plod; ostani u Njemu i budi plodonosan.',
    'Budi jak danas u radosti Gospodnjoj; Njegova radost je tvoja snaga.',
    'Gospodin otvara prava vrata; ostani na Njegovu putu s vjerom i strpljenjem.',
    'Obnavljaj svoj um Božjom Riječju; Božje misli su više od straha.',
    'Hodaj danas u ljubavi; ljubav je znak zrelosti i duhovne snage.',
    'Bog je započeo svoje djelo u tebi i dovršit će ga; vjeruj Njegovu djelu.',
    'Danas je dan za proglašenje pobjede; živi vjerom u ime Isusa.'
  ]
};
function T(k){
  var l=lang();
  var base={
    fa:{title:'پیام امروز برای تو',amen:'آمین'},
    en:{title:'Today’s word for you',amen:'Amen'},
    hr:{title:'Današnja riječ za tebe',amen:'Amen'}
  };
  return (base[l]||base.fa)[k]||base.fa[k]||k;
}
function todayMessage(){
  var l=lang();
  var arr=DAILY_MESSAGES[l]||DAILY_MESSAGES.fa;
  var idx=(zagrebDayOfYear()-1)%arr.length;
  return arr[idx];
}
function css(){
  if(document.getElementById('v6367Css')) return;
  var st=document.createElement('style');
  st.id='v6367Css';
  st.textContent=[
    '#v6358WelcomeCard,.v6360-old-welcome{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;}',
    '#v6360AmenOverlay{position:fixed;inset:0;z-index:1000000;background:rgba(2,8,23,.42);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:18px;}',
    '#v6360AmenBox{width:min(92vw,430px);background:#fff;border-radius:26px;border-top:6px solid #00B91F;box-shadow:0 26px 80px rgba(0,0,0,.32);padding:22px;text-align:center;color:#06146D;}',
    '#v6360AmenBox .icon{font-size:38px;margin-bottom:8px;}',
    '#v6360AmenBox h3{margin:0 0 10px;font-size:22px;font-weight:950;color:#06146D;}',
    '#v6360AmenBox p{margin:0 0 18px;line-height:1.9;font-size:16px;font-weight:850;color:#24304F;}',
    '#v6360AmenBtn{border:0;border-radius:999px;background:#00B91F;color:#fff;font-weight:950;padding:12px 28px;min-width:130px;font-size:16px;box-shadow:0 8px 22px rgba(0,185,31,.25);cursor:pointer;}',
    '.v6369-audio-title::before{content:"🔊";display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:11px;background:#eef4ff;color:#06146D;margin-inline-end:8px;font-size:17px;vertical-align:middle;box-shadow:0 3px 10px rgba(6,20,109,.08);}',
    '.fa #v6360AmenBox{direction:rtl;text-align:center;}'
  ].join('\n');
  document.head.appendChild(st);
}

function removeDuplicateWelcome(){
  css();
  var home=document.getElementById('home');
  if(!home) return;

  var keep=document.getElementById('v6359WelcomeCard');

  var old=document.getElementById('v6358WelcomeCard');
  if(old){
    old.classList.add('v6360-old-welcome');
    try{ old.remove(); }catch(e){}
  }

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

  keep=document.getElementById('v6359WelcomeCard');
  if(keep && home.firstElementChild!==keep){
    home.insertBefore(keep, home.firstElementChild);
  }
}

function showAmenPopup(){
  css();
  var key=SESSION_PREFIX+zagrebDateKey()+'_'+lang();
  try{
    if(sessionStorage.getItem(key)==='1') return;
  }catch(e){}
  if(document.getElementById('v6360AmenOverlay')) return;

  var overlay=document.createElement('div');
  overlay.id='v6360AmenOverlay';
  overlay.innerHTML='<div id="v6360AmenBox"><div class="icon">✨</div><h3>'+esc(T('title'))+'</h3><p>'+esc(todayMessage())+'</p><button id="v6360AmenBtn">'+esc(T('amen'))+'</button></div>';
  document.body.appendChild(overlay);

  function close(){
    try{sessionStorage.setItem(key,'1');}catch(e){}
    if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }
  document.getElementById('v6360AmenBtn').onclick=close;
  overlay.addEventListener('click',function(e){
    if(e.target===overlay) close();
  });
}
function addSpiritualAudioIcon(){
  css();
  var home=document.getElementById('home');
  if(!home)return;
  var regex=/پیام.?های صوتی روحانی|Spiritual Audio Messages|Spiritual Audio|Duhovne audio poruke|Duhovne audio|Audio/i;
  Array.prototype.slice.call(home.querySelectorAll('.card h2,.card h3,.feature-card h2,.feature-card h3')).forEach(function(h){
    var tx=(h.textContent||'').trim();
    if(regex.test(tx)){
      // Stable fix: do not rewrite innerHTML. Only add a CSS class.
      // This prevents the speaker icon from blinking when other scripts re-render Home.
      h.classList.add('v6369-audio-title');
      h.dataset.v6369Speaker='1';
    }
  });
}

function render(){
  removeDuplicateWelcome();
  addSpiritualAudioIcon();
}

function startAudioIconObserver(){
  var home=document.getElementById('home');
  if(!home || home.dataset.v6369AudioObserver==='1')return;
  home.dataset.v6369AudioObserver='1';
  try{
    var obs=new MutationObserver(function(){
      addSpiritualAudioIcon();
    });
    obs.observe(home,{childList:true,subtree:true});
  }catch(e){}
}

document.addEventListener('DOMContentLoaded',function(){
  render();
  startAudioIconObserver();
  setTimeout(showAmenPopup,650);
});
window.addEventListener('load',function(){
  render();
  startAudioIconObserver();
  setTimeout(showAmenPopup,650);
});
document.addEventListener('click',function(){
  setTimeout(function(){
    removeDuplicateWelcome();
    addSpiritualAudioIcon();
  },120);
},true);

setTimeout(render,300);
setTimeout(render,900);
setTimeout(render,1800);
setInterval(function(){
  removeDuplicateWelcome();
  addSpiritualAudioIcon();
},1200);

window.OMIDENO7_V6367_WELCOME_CLEANUP={render:render,showAmenPopup:showAmenPopup,version:VERSION};
})();
