
/* Omideno7 V63.59 — Welcome Meeting Registration Beta
   Focused patch only for Home welcome meeting buttons.
   Does not modify other app sections.
*/
(function(){
'use strict';

var VERSION='V63.59 Welcome Meeting Registration Beta';
var MEETING_URL='https://join.freeconferencecall.com/omideno7church';
var ACCESS_CODE='2452236';
var SECURITY_CODE='789987';
var LAST_EMAIL_KEY='omideno7_last_registration_email';
var USER_APPROVED_KEY='omideno7_meeting_access_approved';

function isBeta(){return /beta\.html/i.test(location.pathname)||/v=6359|v=6358|v=6357|v=6356/i.test(location.search)}
if(!isBeta()) return;

function norm(v){
  v=String(v||'').toLowerCase().trim();
  if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1)return'en';
  if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1)return'hr';
  return'fa';
}
function lang(){try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa')}catch(e){return'fa'}}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function T(k){
  var fa={
    welcome:'به کلیسای امیدنو۷ خوش آمدید',
    subtitle:'کلیسای آنلاین، با تمرکز بر تعلیم کلام خدا، شاگردسازی، دعا و تجهیز ایمانداران و خادمین خدا برای گسترش ملکوت خدا.',
    notify:'فعال‌سازی اعلان‌ها',
    notifyIcon:'🔔',
    notifyOn:'اعلان‌ها فعال شد. از این پس پیام‌های مهم کلیسا و یادآوری جلسات را دریافت می‌کنید.',
    notifyAsk:'درخواست فعال‌سازی اعلان‌ها ارسال شد.',
    notifyBlocked:'اعلان‌ها فعال نشد. لطفاً از تنظیمات مرورگر اجازه Notifications را فعال کنید.',
    register:'ثبت‌نام',
    registerIcon:'📝',
    meetingInfo:'اطلاعات جلسه',
    meetingIcon:'📅',
    join:'ورود به جلسه',
    joinIcon:'🎥',
    schedule:'زمان جلسات',
    prayer:'جلسه دعا: هر روز صبح ساعت ۵ به وقت کرواسی',
    church:'جلسه کلیسا: یکشنبه‌ها ساعت ۸ شب به وقت کرواسی',
    meetingNote:'جلسات فقط در زمان‌های اعلام‌شده برگزار می‌شود.',
    needRegister:'برای دریافت کد ورود به جلسه، ثبت‌نام و تأیید ادمین الزامی است.',
    needRegisterMore:'لطفاً فرم ثبت‌نام کلیسای امیدنو۷ را تکمیل کنید. پس از بررسی و تأیید توسط ادمین، کد ورود جلسه در همین اپ برای شما نمایش داده می‌شود.',
    openForm:'باز کردن فرم ثبت‌نام',
    approvedTitle:'دسترسی جلسه فعال است',
    approvedMsg:'ثبت‌نام شما تأیید شده است. برای ورود به جلسه از اطلاعات زیر استفاده کنید.',
    meetingLink:'لینک جلسه',
    accessCode:'کد دسترسی',
    securityCode:'کد امنیتی',
    notApproved:'هنوز تأیید ثبت‌نام برای این دستگاه یا ایمیل پیدا نشد.',
    checking:'در حال بررسی وضعیت ثبت‌نام...',
    close:'بستن',
    adminNotice:'ثبت‌نام شما دریافت شد و برای بررسی ادمین ثبت گردید. پس از تأیید، کد ورود جلسه در همین اپ نمایش داده می‌شود.',
    schoolDetected:'ورود مدرسه/حساب کاربری شناسایی شد. در حال باز کردن جلسه...',
    toastRegistered:'فرم ثبت‌نام باز شد.'
  };
  var en={
    welcome:'Welcome to OmideNo7 Church',
    subtitle:'Online Church, focused on teaching the Word of God, discipleship, prayer, and equipping believers and ministers of God for the expansion of God’s Kingdom.',
    notify:'Enable notifications',
    notifyIcon:'🔔',
    notifyOn:'Notifications are enabled. You will receive important church messages and meeting reminders.',
    notifyAsk:'Notification activation request was sent.',
    notifyBlocked:'Notifications were not enabled. Please allow Notifications in your browser settings.',
    register:'Register',
    registerIcon:'📝',
    meetingInfo:'Meeting information',
    meetingIcon:'📅',
    join:'Join meeting',
    joinIcon:'🎥',
    schedule:'Meeting times',
    prayer:'Prayer meeting: every morning at 5:00 AM Croatia time',
    church:'Church service: Sundays at 8:00 PM Croatia time',
    meetingNote:'Meetings are held only at the announced times.',
    needRegister:'Registration and admin approval are required to receive the meeting access code.',
    needRegisterMore:'Please complete the OmideNo7 Church registration form. After admin review and approval, the meeting code will be shown inside this app.',
    openForm:'Open registration form',
    approvedTitle:'Meeting access is active',
    approvedMsg:'Your registration has been approved. Use the following information to join the meeting.',
    meetingLink:'Meeting link',
    accessCode:'Access code',
    securityCode:'Security code',
    notApproved:'No approved registration was found for this device or email yet.',
    checking:'Checking registration status...',
    close:'Close',
    adminNotice:'Your registration has been received and sent for admin review. After approval, the meeting code will be shown inside this app.',
    schoolDetected:'School/login account detected. Opening the meeting...',
    toastRegistered:'Registration form opened.'
  };
  var hr={
    welcome:'Dobrodošli u Crkvu OmideNo7',
    subtitle:'Online crkva, usmjerena na poučavanje Božje Riječi, učeništvo, molitvu i opremanje vjernika i Božjih službenika za širenje Božjeg Kraljevstva.',
    notify:'Aktiviraj obavijesti',
    notifyIcon:'🔔',
    notifyOn:'Obavijesti su aktivirane. Primat ćete važne crkvene poruke i podsjetnike za sastanke.',
    notifyAsk:'Zahtjev za aktivaciju obavijesti je poslan.',
    notifyBlocked:'Obavijesti nisu aktivirane. Omogućite Notifications u postavkama preglednika.',
    register:'Registracija',
    registerIcon:'📝',
    meetingInfo:'Informacije o sastanku',
    meetingIcon:'📅',
    join:'Uđi u sastanak',
    joinIcon:'🎥',
    schedule:'Vrijeme sastanaka',
    prayer:'Molitveni sastanak: svaki dan u 5:00 ujutro po hrvatskom vremenu',
    church:'Crkvena služba: nedjeljom u 20:00 po hrvatskom vremenu',
    meetingNote:'Sastanci se održavaju samo u navedenim terminima.',
    needRegister:'Registracija i odobrenje administratora potrebni su za primanje koda za sastanak.',
    needRegisterMore:'Molimo ispunite registracijski obrazac Crkve OmideNo7. Nakon pregleda i odobrenja administratora, kod za sastanak bit će prikazan u ovoj aplikaciji.',
    openForm:'Otvori registracijski obrazac',
    approvedTitle:'Pristup sastanku je aktivan',
    approvedMsg:'Vaša registracija je odobrena. Koristite sljedeće podatke za ulazak u sastanak.',
    meetingLink:'Link za sastanak',
    accessCode:'Pristupni kod',
    securityCode:'Sigurnosni kod',
    notApproved:'Još nije pronađena odobrena registracija za ovaj uređaj ili e-mail.',
    checking:'Provjera statusa registracije...',
    close:'Zatvori',
    adminNotice:'Vaša registracija je primljena i poslana administratoru na pregled. Nakon odobrenja, kod za sastanak bit će prikazan u ovoj aplikaciji.',
    schoolDetected:'Školski/korisnički račun je prepoznat. Otvaranje sastanka...',
    toastRegistered:'Obrazac za registraciju je otvoren.'
  };
  var l=lang();return(l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
}

function css(){
 if(document.getElementById('v6359Css'))return;
 var st=document.createElement('style');st.id='v6359Css';
 st.textContent=[
 '#v6358WelcomeCard,#v6359WelcomeCard{border-top:6px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;box-shadow:0 14px 38px rgba(6,20,109,.10)!important;padding:24px!important;display:block!important;visibility:visible!important;height:auto!important;overflow:visible!important}',
 '#v6359WelcomeCard .title{font-size:clamp(25px,5.2vw,38px)!important;line-height:1.22!important;color:#06146D!important;font-weight:950!important;margin:0 0 12px!important;letter-spacing:-.02em}',
 '#v6359WelcomeCard .subtitle{font-size:clamp(15px,3.2vw,18px)!important;line-height:1.95!important;color:#24304F!important;font-weight:800!important;margin:0 0 18px!important}',
 '.v6359-btn-grid{display:grid;grid-template-columns:repeat(2,minmax(140px,1fr));gap:12px;margin-top:16px}',
 '.v6359-big-btn{border:0;border-radius:20px;padding:15px 16px;min-height:58px;font-weight:950;cursor:pointer;box-shadow:0 8px 22px rgba(6,20,109,.12);display:flex;align-items:center;justify-content:center;gap:10px;font-size:15px;text-decoration:none;transition:transform .15s ease, box-shadow .15s ease}',
 '.v6359-big-btn:active{transform:scale(.98)}',
 '.v6359-green{background:#00B91F;color:#fff}.v6359-blue{background:#06146D;color:#fff}.v6359-gold{background:#F59E0B;color:#fff}.v6359-light{background:#eef4ff;color:#06146D}',
 '.v6359-ico{font-size:24px;line-height:1}',
 '#v6359MeetingPanel{display:none;margin-top:16px;background:#fff;border:1px solid #DDE6F3;border-radius:20px;padding:15px;line-height:1.9}',
 '#v6359MeetingPanel.show{display:block}',
 '#v6359MeetingPanel h4{margin:0 0 8px;color:#06146D;font-weight:950;font-size:18px}',
 '#v6359MeetingPanel .line{background:#f8fbff;border-radius:14px;padding:10px 12px;margin:8px 0;font-weight:850;color:#24304F}',
 '.v6359-modal{position:fixed;inset:0;z-index:999999}.v6359-backdrop{position:absolute;inset:0;background:rgba(2,8,23,.45);backdrop-filter:blur(2px)}',
 '.v6359-box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(92vw,620px);max-height:88vh;overflow:auto;background:#fff;border-radius:26px;padding:22px;box-shadow:0 28px 90px rgba(0,0,0,.35);border-top:6px solid #00B91F}',
 '.v6359-x{position:absolute;right:14px;top:10px;border:0;background:#f1f5f9;border-radius:999px;width:36px;height:36px;font-size:26px;line-height:1;cursor:pointer}',
 '.v6359-item{background:#f8fbff;border:1px solid #dbe3ef;border-radius:16px;padding:13px;margin:10px 0;line-height:1.9;font-weight:850;color:#24304F}',
 '.v6359-toast{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:999999;background:#06146D;color:#fff;padding:12px 16px;border-radius:999px;font-weight:950;box-shadow:0 10px 30px rgba(0,0,0,.25);max-width:92vw;text-align:center}',
 '.fa #v6359WelcomeCard,.fa #v6359MeetingPanel,.fa .v6359-box{direction:rtl;text-align:right}',
 '@media(max-width:520px){.v6359-btn-grid{grid-template-columns:1fr}.v6359-big-btn{font-size:14px}}'
 ].join('\n');
 document.head.appendChild(st);
}

function findClient(){return window.supabaseClient||window.supabase||window.sb||window.SUPABASE_CLIENT||null}
async function getUser(sb){try{if(sb&&sb.auth&&sb.auth.getUser){var r=await sb.auth.getUser();return r&&r.data&&r.data.user}}catch(e){}return null}
function toast(msg){var old=document.querySelector('.v6359-toast');if(old)old.remove();var t=document.createElement('div');t.className='v6359-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){if(t.parentNode)t.remove()},3600)}
function modal(title,body){closeModal();var m=document.createElement('div');m.id='v6359Modal';m.className='v6359-modal';m.innerHTML='<div class="v6359-backdrop"></div><div class="v6359-box"><button class="v6359-x">×</button><h2>'+esc(title)+'</h2>'+body+'<div style="margin-top:12px"><button class="v6359-big-btn v6359-light" id="v6359Close">'+esc(T('close'))+'</button></div></div>';document.body.appendChild(m);m.querySelector('.v6359-backdrop').onclick=closeModal;m.querySelector('.v6359-x').onclick=closeModal;document.getElementById('v6359Close').onclick=closeModal}
function closeModal(){var m=document.getElementById('v6359Modal');if(m)m.remove()}

function renderWelcome(){
 css();
 var home=document.getElementById('home'); if(!home)return;
 var card=document.getElementById('v6359WelcomeCard')||document.getElementById('v6358WelcomeCard')||home.querySelector('.card');
 if(!card){card=document.createElement('div');home.insertBefore(card,home.firstChild)}
 card.id='v6359WelcomeCard'; card.classList.add('card');
 card.innerHTML='<h1 class="title">'+esc(T('welcome'))+'</h1><p class="subtitle">'+esc(T('subtitle'))+'</p><div class="v6359-btn-grid"><button class="v6359-big-btn v6359-green" id="v6359Notify"><span class="v6359-ico">'+T('notifyIcon')+'</span><span>'+esc(T('notify'))+'</span></button><button class="v6359-big-btn v6359-light" id="v6359Register"><span class="v6359-ico">'+T('registerIcon')+'</span><span>'+esc(T('register'))+'</span></button><button class="v6359-big-btn v6359-blue" id="v6359Info"><span class="v6359-ico">'+T('meetingIcon')+'</span><span>'+esc(T('meetingInfo'))+'</span></button><button class="v6359-big-btn v6359-gold" id="v6359Join"><span class="v6359-ico">'+T('joinIcon')+'</span><span>FCC '+esc(T('join'))+'</span></button></div><div id="v6359MeetingPanel"><h4>📅 '+esc(T('schedule'))+'</h4><div class="line">🙏 '+esc(T('prayer'))+'</div><div class="line">⛪ '+esc(T('church'))+'</div><div class="line">ℹ️ '+esc(T('meetingNote'))+'</div><div class="line">🔐 '+esc(T('needRegister'))+'</div></div>';
 bindButtons();
}

function bindButtons(){
 var notify=document.getElementById('v6359Notify');
 if(notify)notify.onclick=function(e){e.preventDefault();enableNotifications();return false};
 var reg=document.getElementById('v6359Register');
 if(reg)reg.onclick=function(e){e.preventDefault();openRegistrationForm();return false};
 var info=document.getElementById('v6359Info');
 if(info)info.onclick=function(e){e.preventDefault();toggleInfo();return false};
 var join=document.getElementById('v6359Join');
 if(join)join.onclick=function(e){e.preventDefault();joinMeetingFlow();return false};
}

function toggleInfo(){
 var p=document.getElementById('v6359MeetingPanel');
 if(!p)return;
 p.classList.toggle('show');
 if(p.classList.contains('show'))p.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function enableNotifications(){
 try{
   if(window.OneSignalDeferred&&Array.isArray(window.OneSignalDeferred)){
     window.OneSignalDeferred.push(function(OneSignal){
       try{
         if(OneSignal&&OneSignal.Notifications&&typeof OneSignal.Notifications.requestPermission==='function'){
           OneSignal.Notifications.requestPermission().then(function(){
             toast(T('notifyOn'));
           }).catch(function(){toast(T('notifyBlocked'))});
           return;
         }
       }catch(e){}
       requestBrowserNotification();
     });
     toast(T('notifyAsk'));
     return;
   }
   if(window.OneSignal&&window.OneSignal.Notifications&&typeof window.OneSignal.Notifications.requestPermission==='function'){
     window.OneSignal.Notifications.requestPermission().then(function(){toast(T('notifyOn'))}).catch(function(){toast(T('notifyBlocked'))});
     return;
   }
 }catch(e){}
 requestBrowserNotification();
}
function requestBrowserNotification(){
 if(!('Notification' in window)){toast(T('notifyAsk'));return}
 Notification.requestPermission().then(function(permission){
   if(permission==='granted')toast(T('notifyOn'));
   else if(permission==='denied')toast(T('notifyBlocked'));
   else toast(T('notifyAsk'));
 }).catch(function(){toast(T('notifyAsk'))});
}

async function joinMeetingFlow(){
 var ok=await isExistingOrApprovedUser();
 if(ok){
   toast(T('schoolDetected'));
   setTimeout(function(){window.open(MEETING_URL,'_blank','noopener')},450);
   return;
 }
 modal(T('join'),'<div class="v6359-item">🔐 '+esc(T('needRegister'))+'</div><div class="v6359-item">'+esc(T('needRegisterMore'))+'</div><button class="v6359-big-btn v6359-green" id="v6359OpenRegFromModal"><span class="v6359-ico">📝</span><span>'+esc(T('openForm'))+'</span></button>');
 var b=document.getElementById('v6359OpenRegFromModal');
 if(b)b.onclick=function(e){e.preventDefault();closeModal();openRegistrationForm();return false};
}

async function isExistingOrApprovedUser(){
 if(localStorage.getItem(USER_APPROVED_KEY)==='1')return true;

 var sb=findClient();
 var user=null;
 try{user=await getUser(sb)}catch(e){}
 // If user is logged in for School/Supabase, allow direct meeting link according to the requested flow.
 if(user&&user.id)return true;

 try{
   if(sb&&sb.from){
     var email=(localStorage.getItem(LAST_EMAIL_KEY)||'').trim().toLowerCase();
     if(!email)return false;
     var r=await sb.from('church_member_registrations')
       .select('id,email,status,approval_status,meeting_access_visible')
       .eq('email',email).limit(1);
     if(r.error)throw r.error;
     var row=r.data&&r.data[0];
     if(row&&(row.approval_status==='approved'||row.status==='approved'||row.meeting_access_visible===true||row.status==='new')){
       if(row.approval_status==='approved'||row.status==='approved'||row.meeting_access_visible===true)localStorage.setItem(USER_APPROVED_KEY,'1');
       return true;
     }
   }
 }catch(e){}
 return false;
}

function openRegistrationForm(){
 if(window.OMIDENO7_V6349_REGISTRATION_BETA&&typeof window.OMIDENO7_V6349_REGISTRATION_BETA.openForm==='function'){
   window.OMIDENO7_V6349_REGISTRATION_BETA.openForm();
   toast(T('toastRegistered'));
   setTimeout(patchRegistrationModal,250);
   return;
 }
 modal(T('register'),'<div class="v6359-item">'+esc(T('needRegisterMore'))+'</div>');
}

function patchRegistrationModal(){
 var modalEl=document.getElementById('v6349Modal');
 if(!modalEl)return;
 ['v6353AccessAfterRegister','v6356RegPending','v6357RegPending','v6358RegPending','v6358RegHint'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove()});
 if(!document.getElementById('v6359RegHint')){
   var form=modalEl.querySelector('form,#v6349Form');
   if(form)form.insertAdjacentHTML('beforeend','<div id="v6359RegHint" class="v6359-item">ℹ️ '+esc(T('needRegisterMore'))+'</div>');
 }
 if(!modalEl.dataset.v6359obs){
   modalEl.dataset.v6359obs='1';
   var obs=new MutationObserver(function(){
     var tx=modalEl.textContent||'';
     if(/success|موفق|ثبت شد|received|submitted|uspješno|ذخیره شد|saved/i.test(tx)){
       var emailInput=modalEl.querySelector('input[type="email"],input[name*="email"],input[id*="email"]');
       if(emailInput&&emailInput.value)localStorage.setItem(LAST_EMAIL_KEY,emailInput.value.trim().toLowerCase());
       sendAdminNotice();
       if(!document.getElementById('v6359RegPending')){
         var b=document.createElement('div');b.id='v6359RegPending';b.className='v6359-item';b.innerHTML='✅ '+esc(T('adminNotice'));modalEl.appendChild(b);
       }
     }
   });
   obs.observe(modalEl,{childList:true,subtree:true,characterData:true});
 }
}

async function sendAdminNotice(){
 try{
   var sb=findClient();
   if(!sb||!sb.from)return;
   var email=(localStorage.getItem(LAST_EMAIL_KEY)||'').trim().toLowerCase();
   // Best-effort admin notification. If table/schema does not accept it, fail silently.
   await sb.from('school_notifications').insert({
     title:'New church meeting registration',
     message:'A user submitted registration and needs admin review for meeting access.'+(email?' Email: '+email:''),
     type:'church_registration_review',
     created_at:new Date().toISOString()
   });
 }catch(e){}
}

function watchLangAndRerender(){
 var last=lang();
 setInterval(function(){
   var l=lang();
   if(l!==last){last=l;renderWelcome();}
 },800);
}

function render(){renderWelcome();patchRegistrationModal();}
document.addEventListener('DOMContentLoaded',function(){render();watchLangAndRerender();});
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(patchRegistrationModal,180)},true);
setTimeout(render,400);setTimeout(render,1200);setTimeout(render,2500);

window.OMIDENO7_V6359_WELCOME_MEETING={render:render,version:VERSION};
})();
