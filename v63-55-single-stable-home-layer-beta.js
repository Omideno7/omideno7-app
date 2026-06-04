/* Omideno7 V63.55 — Single Stable Home Layer Beta
   One stable UI layer only. Removes V63.52/53/54 conflicts causing welcome flicker.
   Keeps V63.51 New Birth content; only fixes visible multilingual labels and stable Home UI.
*/
(function(){
'use strict';

var URL='https://join.freeconferencecall.com/omideno7church';
var ONE='tel:+38517757417,,2452236';
var DIAL='01 7757 417';
var ACCESS='2452236';
var SECURITY='789987';
var ICON='fcc-icon.jpg';
var VERSION='V63.55 Single Stable Home Layer';

function detectLang(){
  try{
    var keys=['omideno7_lang','app_lang','selectedLang','currentLang','lang','language'];
    for(var i=0;i<keys.length;i++){
      var v=localStorage.getItem(keys[i]);
      var n=norm(v);
      if(n) return n;
    }
    var pressed=document.querySelector('[aria-pressed="true"],.active,.selected,.is-active');
    if(pressed){
      var t=(pressed.textContent||pressed.getAttribute('data-lang')||'').trim().toLowerCase();
      var n2=norm(t);
      if(n2) return n2;
    }
    var html=document.documentElement.lang;
    var n3=norm(html);
    if(n3) return n3;
    var n4=norm(navigator.language);
    if(n4) return n4;
  }catch(e){}
  return 'fa';
}
function norm(v){
  v=String(v||'').toLowerCase().trim();
  if(!v) return null;
  if(v==='fa'||v.startsWith('fa-')||v.includes('farsi')||v.includes('persian')||v.includes('فارسی')) return 'fa';
  if(v==='en'||v.startsWith('en-')||v.includes('english')) return 'en';
  if(v==='hr'||v.startsWith('hr-')||v.includes('cro')||v.includes('hrv')||v.includes('kro')||v.includes('hrvatski')) return 'hr';
  return null;
}
function lang(){return detectLang();}
function T(k){
 var fa={
  title:'به کلیسای امیدنو۷ خوش آمدید',
  sub:'کلیسای آنلاین، با تمرکز بر تعلیم کلام خدا، شاگردسازی، دعا و تجهیز ایمانداران و خادمین خدا برای گسترش ملکوت خدا.',
  not:'فعال‌سازی اعلان‌ها', notok:'اعلان‌ها فعال شد.', notbad:'اجازه اعلان‌ها داده نشد. لطفاً از تنظیمات مرورگر اجازه Notifications را فعال کنید.',
  meet:'جلسات آنلاین', join:'ورود به جلسه', info:'اطلاعات جلسه', schedule:'برنامه جلسات',
  prayer:'جلسه دعا: هر روز صبح ساعت ۵ به وقت کرواسی', church:'جلسه کلیسا: یکشنبه‌ها ساعت ۸ شب به وقت کرواسی',
  note:'جلسات فقط در ساعات ذکرشده قابل دسترسی هستند. برای دریافت رمز ورود، ابتدا فرم ثبت‌نام کلیسای امیدنو۷ را تکمیل کنید.',
  dial:'شماره تماس کرواسی', access:'کد دسترسی', security:'کد امنیتی', mobile:'ورود سریع موبایل',
  popTitle:'پیام امروز', popMsg:'امروز با ایمان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.', amen:'آمین',
  after:'ثبت‌نام شما دریافت شد. کد امنیتی جلسه برای ورود شما:', hint:'پس از تکمیل فرم ثبت‌نام، کد امنیتی جلسه برای شما نمایش داده می‌شود.',
  nbTitle:'تولد تازه و نجات در مسیح',
  nbSub:'این بخش برای کسانی است که می‌خواهند نجات را بشناسند، دعای نجات را با ایمان بخوانند، درباره زندگی مسیحی یاد بگیرند، ثبت‌نام کنند و تعالیم تولد تازه را ببینند.',
  nbOpen:'نیاز به نجات / ثبت‌نام',
  medals:'رشد روحانی و مدال‌ها', medalsSub:'این بخش برای تشویق رشد روزانه در کلام، دعا، ایمان و شاگردی است.', points:'امتیاز', medal:'مدال', streak:'روز پیوسته',
  guide:'راهنمای مدال‌ها', guideText:'مدال‌ها برای تشویق رشد روحانی هستند، نه رقابت. برنزی از ۱۰۰ امتیاز، نقره‌ای از ۲۰۰، طلایی از ۵۰۰ و مدال‌های خاص با ثبات در کلام، دعا، شکرگزاری، اعلان ایمان، مدرسه و تکمیل برنامه ۳۶۵ روزه آزاد می‌شوند.', noMedal:'هنوز مدالی آزاد نشده است.'
 };
 var en={
  title:'Welcome to OmideNo7 Church',
  sub:'Online Church, focused on teaching the Word of God, discipleship, prayer, and equipping believers and ministers of God for the expansion of God’s Kingdom.',
  not:'Enable notifications', notok:'Notifications are enabled.', notbad:'Notifications were not allowed. Please enable Notifications in your browser settings.',
  meet:'Online meetings', join:'Join meeting', info:'Meeting information', schedule:'Meeting schedule',
  prayer:'Prayer meeting: every morning at 5:00 AM Croatia time', church:'Church service: Sundays at 8:00 PM Croatia time',
  note:'Meetings are available only at the listed times. To receive the meeting security code, first complete the OmideNo7 Church registration form.',
  dial:'Croatia dial-in', access:'Access code', security:'Security code', mobile:'One Tap Mobile',
  popTitle:'Today’s Message', popMsg:'Walk by faith today; the Lord is with you, and His Word lights your path.', amen:'Amen',
  after:'Your registration has been received. Your meeting security code is:', hint:'After completing the registration form, the meeting security code will be shown to you.',
  nbTitle:'New Birth & Salvation in Christ',
  nbSub:'This section helps you understand salvation, pray the prayer of salvation with faith, learn about the Christian life, register with the church, and watch the New Birth teachings.',
  nbOpen:'Need Salvation / Registration',
  medals:'Spiritual Growth & Medals', medalsSub:'This section encourages daily growth in the Word, prayer, faith, and discipleship.', points:'Points', medal:'Medals', streak:'Day streak',
  guide:'Medal Guide', guideText:'Medals encourage spiritual growth, not competition. Bronze starts at 100 points, Silver at 200, Gold at 500, and special medals unlock through consistency in the Word, prayer, thanksgiving, faith declaration, School, and completing the 365-day plan.', noMedal:'No medals unlocked yet.'
 };
 var hr={
  title:'Dobrodošli u Crkvu OmideNo7',
  sub:'Online crkva, usmjerena na poučavanje Božje Riječi, učeništvo, molitvu i opremanje vjernika i Božjih službenika za širenje Božjeg Kraljevstva.',
  not:'Aktiviraj obavijesti', notok:'Obavijesti su aktivirane.', notbad:'Obavijesti nisu dopuštene. Omogućite Notifications u postavkama preglednika.',
  meet:'Online sastanci', join:'Uđi u sastanak', info:'Informacije o sastanku', schedule:'Raspored sastanaka',
  prayer:'Molitveni sastanak: svaki dan u 5:00 ujutro po hrvatskom vremenu', church:'Crkvena služba: nedjeljom u 20:00 po hrvatskom vremenu',
  note:'Sastanci su dostupni samo u navedenim terminima. Za primanje sigurnosnog koda prvo ispunite registracijski obrazac Crkve OmideNo7.',
  dial:'Broj za Hrvatsku', access:'Pristupni kod', security:'Sigurnosni kod', mobile:'Brzi mobilni ulaz',
  popTitle:'Današnja poruka', popMsg:'Hodaj danas u vjeri; Gospodin je s tobom i Njegova Riječ osvjetljava tvoj put.', amen:'Amen',
  after:'Vaša registracija je primljena. Vaš sigurnosni kod za sastanak je:', hint:'Nakon ispunjavanja registracijskog obrasca prikazat će vam se sigurnosni kod sastanka.',
  nbTitle:'Novo rođenje i spasenje u Kristu',
  nbSub:'Ovaj odjeljak pomaže vam razumjeti spasenje, moliti molitvu spasenja s vjerom, učiti o kršćanskom životu, registrirati se u crkvi i pogledati učenja o novom rođenju.',
  nbOpen:'Trebam spasenje / registraciju',
  medals:'Duhovni rast i medalje', medalsSub:'Ovaj odjeljak potiče svakodnevni rast u Riječi, molitvi, vjeri i učeništvu.', points:'Bodovi', medal:'Medalje', streak:'Dana u nizu',
  guide:'Vodič za medalje', guideText:'Medalje potiču duhovni rast, a ne natjecanje. Brončana počinje od 100 bodova, srebrna od 200, zlatna od 500, a posebne medalje otključavaju se kroz ustrajnost u Riječi, molitvi, zahvalnosti, ispovijedanju vjere, Školi i dovršetku 365-dnevnog plana.', noMedal:'Još nema otključanih medalja.'
 };
 var l=lang(); return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function today(){return new Date().toISOString().slice(0,10)}
function css(){
 if(document.getElementById('v6355Css'))return;
 var st=document.createElement('style');st.id='v6355Css';
 st.textContent=[
 '#v6355WelcomeCard{display:block!important;visibility:visible!important;height:auto!important;overflow:visible!important;border-top:6px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;box-shadow:0 12px 34px rgba(6,20,109,.08)!important;padding:22px!important;opacity:1!important;transition:none!important}',
 '#v6355WelcomeCard .t{font-size:clamp(25px,5.2vw,38px)!important;line-height:1.22!important;color:#06146D!important;font-weight:950!important;margin:0 0 12px!important;letter-spacing:-.02em}',
 '#v6355WelcomeCard .s{font-size:clamp(15px,3.2vw,18px)!important;line-height:1.95!important;color:#24304F!important;font-weight:800!important;margin:0 0 16px!important}',
 '#v6355WelcomeCard .a{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px}',
 '#v6355WelcomeCard .b{border:0;border-radius:999px;padding:10px 14px;font-weight:900;cursor:pointer;background:#eef4ff;color:#06146D;box-shadow:0 4px 12px rgba(6,20,109,.08);text-decoration:none;display:inline-flex;align-items:center;gap:7px}',
 '#v6355WelcomeCard .p{background:#00B91F!important;color:#fff!important}.v6355-blue{background:#06146D!important;color:#fff!important}.v6355-gold{background:#F59E0B!important;color:#fff!important}#v6355WelcomeCard img.fcc{width:21px;height:21px;border-radius:6px;object-fit:cover;display:inline-block;vertical-align:middle;flex:0 0 auto}',
 '#v6355MeetPanel{display:none;margin-top:16px;background:#fff;border:1px solid #DDE6F3;border-radius:20px;padding:14px;line-height:1.9}#v6355MeetPanel.show{display:block}#v6355MeetPanel h4{margin:0 0 8px;color:#06146D;font-weight:950;font-size:18px}.v6355-line{background:#f8fbff;border-radius:14px;padding:9px 11px;margin:8px 0;font-weight:800;color:#24304F}.v6355-code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#eef4ff;color:#06146D;border-radius:10px;padding:3px 8px;font-weight:950}',
 '#v6355DailyCard{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important}.v6355-msg{display:flex;align-items:flex-start;gap:10px;background:#eef4ff;color:#06146D;border-radius:18px;padding:12px 14px;font-weight:900;line-height:1.9}',
 '#v6355Popup{position:fixed;inset:0;z-index:999999}#v6355Popup .back{position:absolute;inset:0;background:rgba(2,8,23,.42);backdrop-filter:blur(2px)}#v6355Popup .box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(92vw,430px);background:#fff;border-radius:28px;padding:24px;text-align:center;box-shadow:0 26px 90px rgba(0,0,0,.32);border-top:6px solid #00B91F}#v6355Popup h2{color:#06146D;font-weight:950;margin:8px 0 10px}#v6355Popup p{font-weight:900;color:#06146D;line-height:1.9;font-size:16px}',
 '#v6352DailyCard,#v6353WelcomeCard,#v6354WelcomeCard{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important}',
 '#v6355RewardsPanel{border-top:5px solid #F59E0B!important;background:linear-gradient(160deg,#fff,#fffaf0)!important}.v6355-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:10px;margin:12px 0}.v6355-stat{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:12px;text-align:center}.v6355-stat strong{display:block;color:#06146D;font-size:22px}.v6355-chip{display:inline-block;background:#fff;border:1px solid #E6EAF2;border-radius:999px;padding:8px 12px;font-weight:850;color:#06146D;font-size:13px;margin:4px}#v6355GuideText{display:none;background:#eef4ff;color:#06146D;border-radius:16px;padding:12px;margin-top:10px;font-weight:800;line-height:1.8}',
 '.fa #v6355WelcomeCard,.fa #v6355MeetPanel,.fa #v6355DailyCard,.fa #v6355RewardsPanel{direction:rtl;text-align:right}.fa #v6355Popup .box{direction:rtl;text-align:center}.v6355-toast{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:999999;background:#06146D;color:#fff;padding:10px 14px;border-radius:999px;font-weight:900;box-shadow:0 10px 30px rgba(0,0,0,.25)}'
 ].join('\n');document.head.appendChild(st)
}
function findWelcome(){
 var home=document.getElementById('home');if(!home)return null;
 var ex=document.getElementById('v6355WelcomeCard');if(ex)return ex;
 ['v6353WelcomeCard','v6354WelcomeCard'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove()});
 var nodes=[].slice.call(home.querySelectorAll('.card,section,div')),target=null;
 for(var i=0;i<nodes.length;i++){var txt=(nodes[i].textContent||'').trim();if(txt.length<1300&&(/به کلیسای امید\s?نو\s?۷ خوش آمدید|به کلیسای امید\s?نو\s?7 خوش آمدید|Welcome to OmideNo7|Dobrodošli/i).test(txt)){target=nodes[i].closest('.card')||nodes[i];break}}
 var c=document.createElement('div');c.id='v6355WelcomeCard';c.className='card';
 if(target&&target.parentNode){target.parentNode.insertBefore(c,target);target.remove()}else{var ref=home.querySelector('.card'); if(ref&&ref.parentNode)ref.parentNode.insertBefore(c,ref); else home.insertBefore(c,home.firstChild)}
 return c;
}
function welcomeHtml(){return '<h1 class="t">'+esc(T('title'))+'</h1><p class="s">'+esc(T('sub'))+'</p><div class="a"><button type="button" class="b p" id="v6355Notify">🔔 '+esc(T('not'))+'</button><button type="button" class="b v6355-blue" id="v6355Meet">📅 '+esc(T('meet'))+'</button><a class="b v6355-gold" href="'+esc(URL)+'" target="_blank" rel="noopener"><img class="fcc" src="'+esc(ICON)+'" alt="FCC"> '+esc(T('join'))+'</a><button type="button" class="b" id="v6355Info">ℹ️ '+esc(T('info'))+'</button></div><div id="v6355MeetPanel"><h4>📅 '+esc(T('schedule'))+'</h4><div class="v6355-line">🙏 '+esc(T('prayer'))+'</div><div class="v6355-line">⛪ '+esc(T('church'))+'</div><div class="v6355-line">🔗 '+esc(T('join'))+': <a href="'+esc(URL)+'" target="_blank" rel="noopener">'+esc(URL)+'</a></div><div class="v6355-line">☎️ '+esc(T('dial'))+': <span class="v6355-code">'+esc(DIAL)+'</span></div><div class="v6355-line">🔢 '+esc(T('access'))+': <span class="v6355-code">'+esc(ACCESS)+'</span></div><div class="v6355-line">🔐 '+esc(T('security'))+': <span class="v6355-code">'+esc(SECURITY)+'</span></div><div class="v6355-line">📱 '+esc(T('mobile'))+': <a href="'+esc(ONE)+'">'+esc('+38517757417,,2452236')+'</a></div><div class="v6355-line">⚠️ '+esc(T('note'))+'</div></div>'}
function renderWelcome(){var c=findWelcome();if(!c)return;if(c.dataset.v6355Lang!==lang()){c.innerHTML=welcomeHtml();c.dataset.v6355Lang=lang()}bindWelcome()}
function toast(msg){var o=document.querySelector('.v6355-toast');if(o)o.remove();var t=document.createElement('div');t.className='v6355-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){if(t.parentNode)t.remove()},2600)}
function enableNot(){try{if(window.OneSignal&&window.OneSignal.Notifications&&window.OneSignal.Notifications.requestPermission){window.OneSignal.Notifications.requestPermission().then(function(){toast(T('notok'))}).catch(function(){toast(T('notbad'))});return}}catch(e){} if(!('Notification'in window)){toast(T('notbad'));return} Notification.requestPermission().then(function(p){toast(p==='granted'?T('notok'):T('notbad'))}).catch(function(){toast(T('notbad'))})}
function bindWelcome(){var n=document.getElementById('v6355Notify');if(n&&!n.dataset.b){n.dataset.b=1;n.onclick=function(e){e.preventDefault();enableNot()}}var m=document.getElementById('v6355Meet');if(m&&!m.dataset.b){m.dataset.b=1;m.onclick=function(e){e.preventDefault();var p=document.getElementById('v6355MeetPanel');if(p){p.classList.toggle('show');if(p.classList.contains('show'))p.scrollIntoView({behavior:'smooth',block:'nearest'})}}}var i=document.getElementById('v6355Info');if(i&&!i.dataset.b){i.dataset.b=1;i.onclick=function(e){e.preventDefault();var p=document.getElementById('v6355MeetPanel');if(p){p.classList.add('show');p.scrollIntoView({behavior:'smooth',block:'nearest'})}}}}
function renderDaily(){var home=document.getElementById('home');if(!home)return;var ex=document.getElementById('v6355DailyCard');if(ex){if(ex.dataset.v6355Lang!==lang()){ex.innerHTML='<div class="v6355-msg"><span>✨</span><span>'+esc(T('popMsg'))+'</span></div>';ex.dataset.v6355Lang=lang()}return}var w=document.createElement('div');w.id='v6355DailyCard';w.className='card';w.dataset.v6355Lang=lang();w.innerHTML='<div class="v6355-msg"><span>✨</span><span>'+esc(T('popMsg'))+'</span></div>';var anchor=document.getElementById('v6355WelcomeCard');if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(w,anchor.nextSibling)}
function showPopup(){var key='omideno7_v6355_popup_'+today()+'_'+lang();if(localStorage.getItem(key)==='1'||document.getElementById('v6355Popup'))return;var p=document.createElement('div');p.id='v6355Popup';p.innerHTML='<div class="back"></div><div class="box"><div style="font-size:44px">✨</div><h2>'+esc(T('popTitle'))+'</h2><p>'+esc(T('popMsg'))+'</p><button type="button" class="btn primary" id="v6355Amen">'+esc(T('amen'))+'</button></div>';document.body.appendChild(p);function close(){localStorage.setItem(key,'1');p.remove()}p.querySelector('.back').onclick=close;document.getElementById('v6355Amen').onclick=close}
function patchNB(){var c=document.getElementById('v6351NewBirthCard');if(!c)return;var h=c.querySelector('h3');if(h)h.textContent='✨ '+T('nbTitle');var p=c.querySelector('p');if(p)p.textContent=T('nbSub');var b=document.getElementById('v6351Open');if(b)b.textContent=T('nbOpen')}
function getJson(k,f){try{return JSON.parse(localStorage.getItem(k)||'null')||f}catch(e){return f}}
function rewardState(){var s={points:0,medals:[],streak:0};['omideno7_rewards_v6348_state','omideno7_rewards_state','omideno7_rewards'].forEach(function(k){var x=getJson(k,null);if(x&&typeof x==='object'){s.points=Number(x.points||s.points||0);s.medals=Array.isArray(x.medals)?x.medals:s.medals;s.streak=Number(x.streak||s.streak||0)}});return s}
function renderRewards(){var more=document.getElementById('more');if(!more)return;['v6349bRewardsClean','v6352RewardsPanel','v6351MedalGuide','v6350MedalGuide'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove()});var s=rewardState();var html='<div id="v6355RewardsPanel" class="card"><h3>🏆 '+esc(T('medals'))+'</h3><p>'+esc(T('medalsSub'))+'</p><div class="v6355-stats"><div class="v6355-stat"><strong>'+esc(s.points)+'</strong>'+esc(T('points'))+'</div><div class="v6355-stat"><strong>'+esc(s.medals.length)+'</strong>'+esc(T('medal'))+'</div><div class="v6355-stat"><strong>'+esc(s.streak)+'</strong>'+esc(T('streak'))+'</div></div><div><span class="v6355-chip">'+esc(s.medals.length?s.medals.join(', '):T('noMedal'))+'</span></div><button type="button" class="btn secondary" id="v6355Guide">'+esc(T('guide'))+'</button><div id="v6355GuideText">'+esc(T('guideText'))+'</div></div>';var ex=document.getElementById('v6355RewardsPanel');if(ex)ex.outerHTML=html;else{var wrap=document.createElement('div');wrap.innerHTML=html;more.appendChild(wrap.firstElementChild)}var g=document.getElementById('v6355Guide');if(g)g.onclick=function(e){e.preventDefault();var box=document.getElementById('v6355GuideText');if(box)box.style.display=box.style.display==='block'?'none':'block'}}
function patchReg(){var modal=document.getElementById('v6349Modal');if(!modal)return;if(!document.getElementById('v6355RegHint')){var form=modal.querySelector('form,#v6349Form');if(form)form.insertAdjacentHTML('beforeend','<div id="v6355RegHint" style="background:#eef4ff;color:#06146D;border-radius:16px;padding:12px;margin-top:12px;font-weight:800;line-height:1.8;">ℹ️ '+esc(T('hint'))+'</div>')}if(!modal.dataset.v6355Obs){modal.dataset.v6355Obs=1;new MutationObserver(function(){var txt=modal.textContent||'';if(/success|موفق|ثبت شد|received|ذخیره شد|submitted/i.test(txt))showCode(modal)}).observe(modal,{childList:true,subtree:true,characterData:true})}}
function showCode(modal){if(document.getElementById('v6355AccessAfterRegister'))return;var b=document.createElement('div');b.id='v6355AccessAfterRegister';b.style.cssText='background:#f5fff7;border:1px solid #BEEFC7;border-radius:18px;padding:14px;margin-top:12px;color:#063B14;font-weight:900;line-height:1.9';b.innerHTML='✅ '+esc(T('after'))+'<br><span class="v6355-code">'+esc(SECURITY)+'</span><br>🔗 <a href="'+esc(URL)+'" target="_blank" rel="noopener">'+esc(URL)+'</a><br>🔢 '+esc(T('access'))+': <span class="v6355-code">'+esc(ACCESS)+'</span>';var t=modal.querySelector('#v6349Status')||modal.querySelector('form,#v6349Form')||modal.firstElementChild;if(t&&t.parentNode)t.parentNode.insertBefore(b,t.nextSibling);else modal.appendChild(b)}
function render(){css();renderWelcome();renderDaily();patchNB();renderRewards();patchReg()}
document.addEventListener('DOMContentLoaded',function(){render();setTimeout(showPopup,700)});
window.addEventListener('load',function(){render();setTimeout(showPopup,1000)});
document.addEventListener('click',function(){setTimeout(function(){patchNB();patchReg()},140)},true);
setTimeout(render,500);setTimeout(render,1500);setTimeout(function(){if(!document.getElementById('v6355WelcomeCard'))render()},3000);
window.OMIDENO7_V6355_STABLE_HOME={render:render,version:VERSION};
})();
