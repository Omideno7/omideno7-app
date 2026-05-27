
const NEW_BIRTH_FORM_LINK = "https://docs.google.com/forms/d/133BVzudIVIHozGroo-EHJqLKutjzSdZ7c_dl0k-vCuI/viewform";

const ONESIGNAL_APP_ID = "33aa00cc-1a85-42bf-9f68-949d81f37620";
const ONESIGNAL_SCOPE = "/omideno7-app/";
const ONESIGNAL_SW_PATH = "/omideno7-app/OneSignalSDKWorker.js";

const translations={en:{dailyKicker:'Daily Word. Prayer. Faith.',homeTitle:'Welcome to Omid No 7 Church',homeDesc:'An online Persian and English Christian church based in Zagreb, Croatia, committed to teaching God’s Word, prayer, discipleship, and equipping believers for God’s Kingdom.',todayWordTitle:'Today’s Daily Word',joinMeeting:'Join Online Meeting',callToJoin:'Call to Join',enableNotifications:'Enable Notifications',notificationInfo:'Receive Daily Word and meeting reminders on your phone.',notificationReady:'Notification request started. If your device asks for permission, tap Allow.',notificationDenied:'Notifications are blocked. Please allow them in your phone settings.',notificationEnabled:'Notifications are enabled.',notificationUnsupported:'Notifications are not supported on this browser. On iPhone, install the app to Home Screen first.',morningPrayer:'Daily Morning Prayer',sundayService:'Sunday Church Service',croatiaTime:'Croatia time',meetingsTitle:'Online Meetings',meetingsDesc:'Join our online meetings through FreeConferenceCall.',scheduleTitle:'Weekly Schedule',prayerTitle:'Prayer Request',prayerDesc:'Send your prayer request to our ministry team. We would be glad to pray with you.',membershipTitle:'Membership',membershipDesc:'To join, request prayer, or contact us, please complete the form below.',givingTitle:'Give & Support',givingDesc:'Your giving helps us share the Gospel, teach God’s Word, support online ministry, and raise strong believers for God’s Kingdom. Thank you for partnering with the vision.',newBirthTitle:'New Birth',newBirthMenu:'Jesus',moreTitle:'More',faithTitle:'Our Faith & Vision',faithDesc:'Rooted in the Word. Led by the Spirit.',installTitle:'Install This App',installDesc:'Open this website on your phone and add it to your Home Screen.',footer:'Built on Christ. Led by the Spirit.',submit:'Send'},fa:{dailyKicker:'کلام روزانه، دعا، ایمان',homeTitle:'به کلیسای امیدنو۷ خوش آمدید',homeDesc:'کلیسای آنلاین مسیحی به زبان‌های فارسی و انگلیسی، مستقر در زاگرب کرواسی، با تمرکز بر تعلیم کلام خدا، دعا، شاگردسازی و تجهیز ایمانداران برای پادشاهی خدا.',todayWordTitle:'پیام روزانه امروز',joinMeeting:'ورود به جلسه آنلاین',callToJoin:'ورود با تماس تلفنی',enableNotifications:'فعال‌سازی اعلان‌ها',notificationInfo:'پیام روزانه و یادآوری جلسات را روی گوشی دریافت کنید.',notificationReady:'درخواست اعلان شروع شد. اگر گوشی اجازه خواست، Allow را بزنید.',notificationDenied:'اعلان‌ها مسدود شده‌اند. لطفاً از تنظیمات گوشی اجازه دهید.',notificationEnabled:'اعلان‌ها فعال شده‌اند.',notificationUnsupported:'اعلان‌ها در این مرورگر پشتیبانی نمی‌شود. در آیفون، ابتدا اپ را به Home Screen اضافه کنید.',morningPrayer:'دعای صبح روزانه',sundayService:'جلسه کلیسا یکشنبه‌ها',croatiaTime:'به وقت کرواسی',meetingsTitle:'جلسات آنلاین',meetingsDesc:'از طریق FreeConferenceCall به جلسات آنلاین کلیسای امیدنو۷ بپیوندید.',scheduleTitle:'برنامه هفتگی',prayerTitle:'درخواست دعا',prayerDesc:'درخواست دعای خود را برای تیم خدمتی ما بفرستید. با شادی برای شما دعا می‌کنیم.',membershipTitle:'عضویت',membershipDesc:'برای عضویت، درخواست دعا یا ارتباط با ما، فرم زیر را تکمیل کنید.',givingTitle:'هدایا و حمایت',givingDesc:'هدایای شما به ما کمک می‌کند انجیل را گسترش دهیم، کلام خدا را تعلیم دهیم، خدمت آنلاین را حمایت کنیم و ایماندارانی قوی برای پادشاهی خدا تربیت نماییم. از همراهی شما با این رؤیا سپاسگزاریم.',newBirthTitle:'تولد تازه',newBirthMenu:'عیسی',moreTitle:'بیشتر',faithTitle:'ایمان و رؤیای ما',faithDesc:'ریشه‌دار در کلام، هدایت‌شده با روح.',installTitle:'نصب اپ',installDesc:'این سایت را روی گوشی باز کنید و آن را به صفحه اصلی اضافه کنید.',footer:'بنا شده بر مسیح، هدایت‌شده با روح‌القدس.',submit:'ارسال'}};
let currentLang=localStorage.getItem('lang')||'en';

window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function(OneSignal) {
  await OneSignal.init({
    appId: ONESIGNAL_APP_ID,
    serviceWorkerPath: ONESIGNAL_SW_PATH,
    serviceWorkerParam: { scope: ONESIGNAL_SCOPE },
    notifyButton: {
      enable: true,
      position: 'bottom-left',
      size: 'medium',
      showCredit: false
    },
    welcomeNotification: {
      title: 'Omid No 7 Church',
      message: 'Notifications are enabled. You will receive church updates.',
      url: 'https://omideno7.github.io/omideno7-app/'
    }
  });
  OneSignal.Notifications.addEventListener('permissionChange', function(permission) {
    updateNotificationStatus(permission ? 'Notifications enabled.' : 'Notifications not enabled.');
  });
});

function getDailyMessage(){const list=window.dailyMessages||[]; if(!list.length)return null; const day=new Date().getDate(); const index=Math.min(day,30)-1; return list[index]||list[0];}
function renderDaily(){const m=getDailyMessage(); if(!m)return; document.querySelectorAll('[data-daily="day"]').forEach(el=>el.textContent=(currentLang==='fa'?'روز ':'Day ')+m.day); document.querySelectorAll('[data-daily="title"]').forEach(el=>el.textContent=currentLang==='fa'?m.faTitle:m.enTitle); document.querySelectorAll('[data-daily="ref"]').forEach(el=>el.textContent=m.ref); document.querySelectorAll('[data-daily="verse"]').forEach(el=>el.textContent=currentLang==='fa'?m.faVerse:m.enVerse); document.querySelectorAll('[data-daily="message"]').forEach(el=>el.textContent=currentLang==='fa'?m.faMessage:m.enMessage);}
function setLang(lang){currentLang=lang;localStorage.setItem('lang',lang);document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(translations[lang][key])el.textContent=translations[lang][key];});document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));renderDaily();}
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===id));window.scrollTo({top:0,behavior:'smooth'});}
function updateNotificationStatus(msg){document.querySelectorAll('.notification-status').forEach(el=>el.textContent=msg);}

async function enableNotifications(){
  updateNotificationStatus(translations[currentLang].notificationReady || 'Starting notification permission...');
  if (!('Notification' in window)) {
    updateNotificationStatus(translations[currentLang].notificationUnsupported || 'Notifications are not supported here.');
    return;
  }
  if (Notification.permission === 'denied') {
    updateNotificationStatus(translations[currentLang].notificationDenied || 'Notifications are blocked. Please allow them in phone settings.');
    return;
  }

  try {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(async function(OneSignal) {
      try {
        const supported = OneSignal.Notifications && OneSignal.Notifications.isPushSupported
          ? OneSignal.Notifications.isPushSupported()
          : true;

        if (!supported) {
          updateNotificationStatus(translations[currentLang].notificationUnsupported || 'Notifications are not supported here.');
          return;
        }

        if (Notification.permission === 'default') {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            updateNotificationStatus(translations[currentLang].notificationDenied || 'Notifications were not allowed.');
            return;
          }
        }

        if (OneSignal.User && OneSignal.User.PushSubscription && OneSignal.User.PushSubscription.optIn) {
          await OneSignal.User.PushSubscription.optIn();
        }

        updateNotificationStatus(translations[currentLang].notificationEnabled || 'Notifications are enabled.');
      } catch (e) {
        updateNotificationStatus('Notification error: ' + (e && e.message ? e.message : e));
      }
    });
  } catch(e) {
    updateNotificationStatus('Notification error: ' + (e && e.message ? e.message : e));
  }
}

document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.lang-toggle button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));document.querySelectorAll('.enable-notifications').forEach(b=>b.addEventListener('click',enableNotifications));setLang(currentLang);});