/* Omideno7 V63.53 — Welcome + Meetings UI Beta
   Safe patch only for the Home welcome card and registration success access info.
   It does not change the other Home cards, School, Word, Book, Plans, Q&A, medals, or offline features.
*/
(function(){
  'use strict';

  var VERSION = 'V63.53 Welcome + Meetings UI';
  var MEETING_URL = 'https://join.freeconferencecall.com/omideno7church';
  var ONE_TAP = 'tel:+38517757417,,2452236';
  var DIAL_HR = '01 7757 417';
  var ACCESS_CODE = '2452236';
  var SECURITY_CODE = '789987';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6353|v=6352|v=6351|v=6350|v=6349|v=6348|v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
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
  function T(k){
    var fa={
      title:'به کلیسای امیدنو۷ خوش آمدید',
      subtitle:'کلیسای آنلاین، با تمرکز بر تعلیم کلام خدا، شاگردسازی، دعا و تجهیز ایمانداران و خادمین خدا برای گسترش ملکوت خدا.',
      enableNotifications:'فعال‌سازی اعلان‌ها',
      notificationsOn:'اعلان‌ها فعال شد.',
      notificationsBlocked:'اجازه اعلان‌ها داده نشد. لطفاً از تنظیمات مرورگر اجازه Notifications را فعال کنید.',
      onlineMeetings:'جلسات آنلاین',
      enterMeeting:'ورود به جلسه',
      meetingInfo:'اطلاعات جلسه',
      scheduleTitle:'برنامه جلسات',
      prayer:'جلسه دعا: هر روز صبح ساعت ۵ به وقت کرواسی',
      church:'جلسه کلیسا: یکشنبه‌ها ساعت ۸ شب به وقت کرواسی',
      accessNote:'جلسات فقط در ساعات ذکرشده قابل دسترسی هستند. برای دریافت رمز ورود، ابتدا فرم ثبت‌نام کلیسای امیدنو۷ را تکمیل کنید.',
      accessTitle:'اطلاعات ورود',
      dial:'شماره تماس کرواسی',
      accessCode:'کد دسترسی',
      securityCode:'کد امنیتی',
      mobile:'ورود سریع موبایل',
      fcc:'FreeConferenceCall',
      close:'بستن',
      copied:'کپی شد',
      afterRegistration:'ثبت‌نام شما دریافت شد. کد امنیتی جلسه برای ورود شما:',
      submitRegistration:'پس از تکمیل فرم ثبت‌نام، کد امنیتی جلسه برای شما نمایش داده می‌شود.'
    };
    var en={
      title:'Welcome to OmideNo7 Church',
      subtitle:'Online Church, focused on teaching the Word of God, discipleship, prayer, and equipping believers and ministers of God for the expansion of God’s Kingdom.',
      enableNotifications:'Enable notifications',
      notificationsOn:'Notifications are enabled.',
      notificationsBlocked:'Notifications were not allowed. Please enable Notifications in your browser settings.',
      onlineMeetings:'Online meetings',
      enterMeeting:'Join meeting',
      meetingInfo:'Meeting information',
      scheduleTitle:'Meeting schedule',
      prayer:'Prayer meeting: every morning at 5:00 AM Croatia time',
      church:'Church service: Sundays at 8:00 PM Croatia time',
      accessNote:'Meetings are available only at the listed times. To receive the meeting security code, first complete the OmideNo7 Church registration form.',
      accessTitle:'Access information',
      dial:'Croatia dial-in',
      accessCode:'Access code',
      securityCode:'Security code',
      mobile:'One Tap Mobile',
      fcc:'FreeConferenceCall',
      close:'Close',
      copied:'Copied',
      afterRegistration:'Your registration has been received. Your meeting security code is:',
      submitRegistration:'After completing the registration form, the meeting security code will be shown to you.'
    };
    var hr={
      title:'Dobrodošli u Crkvu OmideNo7',
      subtitle:'Online crkva, usmjerena na poučavanje Božje Riječi, učeništvo, molitvu i opremanje vjernika i Božjih službenika za širenje Božjeg Kraljevstva.',
      enableNotifications:'Aktiviraj obavijesti',
      notificationsOn:'Obavijesti su aktivirane.',
      notificationsBlocked:'Obavijesti nisu dopuštene. Omogućite Notifications u postavkama preglednika.',
      onlineMeetings:'Online sastanci',
      enterMeeting:'Uđi u sastanak',
      meetingInfo:'Informacije o sastanku',
      scheduleTitle:'Raspored sastanaka',
      prayer:'Molitveni sastanak: svaki dan u 5:00 ujutro po hrvatskom vremenu',
      church:'Crkvena služba: nedjeljom u 20:00 po hrvatskom vremenu',
      accessNote:'Sastanci su dostupni samo u navedenim terminima. Za primanje sigurnosnog koda prvo ispunite registracijski obrazac Crkve OmideNo7.',
      accessTitle:'Podaci za pristup',
      dial:'Broj za Hrvatsku',
      accessCode:'Pristupni kod',
      securityCode:'Sigurnosni kod',
      mobile:'Brzi mobilni ulaz',
      fcc:'FreeConferenceCall',
      close:'Zatvori',
      copied:'Kopirano',
      afterRegistration:'Vaša registracija je primljena. Vaš sigurnosni kod za sastanak je:',
      submitRegistration:'Nakon ispunjavanja registracijskog obrasca prikazat će vam se sigurnosni kod sastanka.'
    };
    var l=lang();
    return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
  }
  function esc(v){
    return String(v==null?'':v).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function css(){
    if(document.getElementById('v6353Css')) return;
    var st=document.createElement('style');
    st.id='v6353Css';
    st.textContent=[
      '#v6353WelcomeCard{border-top:6px solid #00B91F!important;background:linear-gradient(160deg,#ffffff,#f5fff7)!important;box-shadow:0 12px 34px rgba(6,20,109,.08)!important;padding:22px!important;}',
      '#v6353WelcomeCard .v6353-title{font-size:clamp(25px,5.2vw,38px)!important;line-height:1.22!important;color:#06146D!important;font-weight:950!important;margin:0 0 12px!important;letter-spacing:-.02em;}',
      '#v6353WelcomeCard .v6353-subtitle{font-size:clamp(15px,3.2vw,18px)!important;line-height:1.95!important;color:#24304F!important;font-weight:800!important;margin:0 0 16px!important;}',
      '#v6353WelcomeCard .v6353-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px;}',
      '#v6353WelcomeCard .v6353-smallbtn{border:0;border-radius:999px;padding:10px 14px;font-weight:900;cursor:pointer;background:#eef4ff;color:#06146D;box-shadow:0 4px 12px rgba(6,20,109,.08);}',
      '#v6353WelcomeCard .v6353-primary{background:#00B91F!important;color:#fff!important;}',
      '#v6353WelcomeCard .v6353-blue{background:#06146D!important;color:#fff!important;}',
      '#v6353WelcomeCard .v6353-gold{background:#F59E0B!important;color:#fff!important;}',
      '#v6353WelcomeCard .v6353-fcc{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #dbe3ef;color:#06146D;border-radius:999px;padding:8px 12px;font-weight:950;font-size:12px;}',
      '#v6353WelcomeCard .v6353-fcc-logo{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#00B91F,#06146D);color:#fff;font-size:10px;font-weight:950;letter-spacing:-.5px;}',
      '#v6353MeetingPanel{display:none;margin-top:16px;background:#fff;border:1px solid #DDE6F3;border-radius:20px;padding:14px;line-height:1.9;}',
      '#v6353MeetingPanel.show{display:block;}',
      '#v6353MeetingPanel h4{margin:0 0 8px;color:#06146D;font-weight:950;font-size:18px;}',
      '#v6353MeetingPanel .v6353-line{background:#f8fbff;border-radius:14px;padding:9px 11px;margin:8px 0;font-weight:800;color:#24304F;}',
      '#v6353MeetingPanel .v6353-code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#eef4ff;color:#06146D;border-radius:10px;padding:3px 8px;font-weight:950;}',
      '.v6353-toast{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:999999;background:#06146D;color:#fff;padding:10px 14px;border-radius:999px;font-weight:900;box-shadow:0 10px 30px rgba(0,0,0,.25);}',
      '#v6353AccessAfterRegister{background:#f5fff7;border:1px solid #BEEFC7;border-radius:18px;padding:14px;margin-top:12px;color:#063B14;font-weight:900;line-height:1.9;}',
      '.fa #v6353WelcomeCard,.fa #v6353MeetingPanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function isWelcomeText(txt){
    return /به کلیسای امید\s?نو\s?۷ خوش آمدید|به کلیسای امید\s?نو\s?7 خوش آمدید|Welcome to OmideNo7|Dobrodošli/i.test(txt);
  }

  function findWelcomeCard(){
    var home=document.getElementById('home');
    if(!home) return null;

    var existing=document.getElementById('v6353WelcomeCard');
    if(existing) return existing;

    var nodes=Array.prototype.slice.call(home.querySelectorAll('.card,section,div'));
    for(var i=0;i<nodes.length;i++){
      var txt=(nodes[i].textContent||'').trim();
      if(txt.length<900 && isWelcomeText(txt)){
        return nodes[i].closest('.card')||nodes[i];
      }
    }
    return home.querySelector('.card');
  }

  function welcomeHtml(){
    return '<h1 class="v6353-title">'+esc(T('title'))+'</h1>'+
      '<p class="v6353-subtitle">'+esc(T('subtitle'))+'</p>'+
      '<div class="v6353-actions">'+
        '<button type="button" class="v6353-smallbtn v6353-primary" id="v6353Notify">🔔 '+esc(T('enableNotifications'))+'</button>'+
        '<button type="button" class="v6353-smallbtn v6353-blue" id="v6353Meetings">📅 '+esc(T('onlineMeetings'))+'</button>'+
        '<a class="v6353-smallbtn v6353-gold" id="v6353Join" href="'+esc(MEETING_URL)+'" target="_blank" rel="noopener"><span class="v6353-fcc-logo">FCC</span> '+esc(T('enterMeeting'))+'</a>'+
        '<button type="button" class="v6353-smallbtn" id="v6353Info">ℹ️ '+esc(T('meetingInfo'))+'</button>'+
        '<span class="v6353-fcc"><span class="v6353-fcc-logo">FCC</span>'+esc(T('fcc'))+'</span>'+
      '</div>'+
      '<div id="v6353MeetingPanel">'+
        '<h4>📅 '+esc(T('scheduleTitle'))+'</h4>'+
        '<div class="v6353-line">🙏 '+esc(T('prayer'))+'</div>'+
        '<div class="v6353-line">⛪ '+esc(T('church'))+'</div>'+
        '<div class="v6353-line">🔗 '+esc(T('enterMeeting'))+': <a href="'+esc(MEETING_URL)+'" target="_blank" rel="noopener">'+esc(MEETING_URL)+'</a></div>'+
        '<div class="v6353-line">☎️ '+esc(T('dial'))+': <span class="v6353-code">'+esc(DIAL_HR)+'</span></div>'+
        '<div class="v6353-line">🔢 '+esc(T('accessCode'))+': <span class="v6353-code">'+esc(ACCESS_CODE)+'</span></div>'+
        '<div class="v6353-line">🔐 '+esc(T('securityCode'))+': <span class="v6353-code">'+esc(SECURITY_CODE)+'</span></div>'+
        '<div class="v6353-line">📱 '+esc(T('mobile'))+': <a href="'+esc(ONE_TAP)+'">'+esc('+38517757417,,2452236')+'</a></div>'+
        '<div class="v6353-line">⚠️ '+esc(T('accessNote'))+'</div>'+
      '</div>';
  }

  function renderWelcome(){
    css();
    var card=findWelcomeCard();
    if(!card) return;
    card.id='v6353WelcomeCard';
    card.innerHTML=welcomeHtml();
    bindWelcome();
  }

  function bindWelcome(){
    var notify=document.getElementById('v6353Notify');
    if(notify && !notify.dataset.bound){
      notify.dataset.bound='1';
      notify.onclick=function(ev){
        ev.preventDefault();
        enableNotifications();
      };
    }
    var meetings=document.getElementById('v6353Meetings');
    if(meetings && !meetings.dataset.bound){
      meetings.dataset.bound='1';
      meetings.onclick=function(ev){
        ev.preventDefault();
        togglePanel();
      };
    }
    var info=document.getElementById('v6353Info');
    if(info && !info.dataset.bound){
      info.dataset.bound='1';
      info.onclick=function(ev){
        ev.preventDefault();
        var p=document.getElementById('v6353MeetingPanel');
        if(p){p.classList.add('show'); p.scrollIntoView({behavior:'smooth', block:'nearest'});}
      };
    }
  }

  function toast(msg){
    var old=document.querySelector('.v6353-toast');
    if(old) old.remove();
    var t=document.createElement('div');
    t.className='v6353-toast';
    t.textContent=msg;
    document.body.appendChild(t);
    setTimeout(function(){ if(t.parentNode) t.remove(); }, 2600);
  }

  function togglePanel(){
    var p=document.getElementById('v6353MeetingPanel');
    if(!p) return;
    p.classList.toggle('show');
    if(p.classList.contains('show')) p.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  function enableNotifications(){
    try{
      if(window.OneSignalDeferred && Array.isArray(window.OneSignalDeferred)){
        window.OneSignalDeferred.push(function(OneSignal){
          try{
            if(OneSignal && OneSignal.Notifications && typeof OneSignal.Notifications.requestPermission==='function'){
              OneSignal.Notifications.requestPermission().then(function(){
                toast(T('notificationsOn'));
              }).catch(function(){ toast(T('notificationsBlocked')); });
              return;
            }
          }catch(e){}
          requestBrowserNotification();
        });
        return;
      }
      if(window.OneSignal && window.OneSignal.Notifications && typeof window.OneSignal.Notifications.requestPermission==='function'){
        window.OneSignal.Notifications.requestPermission().then(function(){toast(T('notificationsOn'));}).catch(function(){toast(T('notificationsBlocked'));});
        return;
      }
      requestBrowserNotification();
    }catch(e){
      requestBrowserNotification();
    }
  }

  function requestBrowserNotification(){
    if(!('Notification' in window)){
      toast(T('notificationsBlocked'));
      return;
    }
    Notification.requestPermission().then(function(permission){
      if(permission==='granted') toast(T('notificationsOn'));
      else toast(T('notificationsBlocked'));
    }).catch(function(){
      toast(T('notificationsBlocked'));
    });
  }

  function patchRegistrationSuccess(){
    /* Show meeting security code after the registration form successfully submits.
       This is front-end display. For real email/SMS sending, a Supabase Edge Function + email/SMS provider is needed. */
    var modal=document.getElementById('v6349Modal');
    if(!modal) return;

    var hint=modal.querySelector('#v6353RegAccessHint');
    if(!hint){
      var form=modal.querySelector('form,#v6349Form');
      if(form){
        form.insertAdjacentHTML('beforeend',
          '<div id="v6353RegAccessHint" style="background:#eef4ff;color:#06146D;border-radius:16px;padding:12px;margin-top:12px;font-weight:800;line-height:1.8;">ℹ️ '+esc(T('submitRegistration'))+'</div>'
        );
      }
    }

    var status=modal.querySelector('#v6349Status,.v6349-status,[data-status]');
    if(status && /success|موفق|ثبت|received|ذخیره/i.test(status.textContent||'')){
      showRegisterCode(modal);
    }

    if(!modal.dataset.v6353Observer){
      modal.dataset.v6353Observer='1';
      var obs=new MutationObserver(function(){
        var txt=modal.textContent||'';
        if(/success|موفق|ثبت شد|received|ذخیره شد|submitted/i.test(txt)){
          showRegisterCode(modal);
        }
      });
      obs.observe(modal,{childList:true,subtree:true,characterData:true});
      modal._v6353Observer=obs;
    }
  }

  function showRegisterCode(modal){
    if(document.getElementById('v6353AccessAfterRegister')) return;
    var box=document.createElement('div');
    box.id='v6353AccessAfterRegister';
    box.innerHTML='✅ '+esc(T('afterRegistration'))+
      '<br><span class="v6353-code">'+esc(SECURITY_CODE)+'</span>'+
      '<br>🔗 <a href="'+esc(MEETING_URL)+'" target="_blank" rel="noopener">'+esc(MEETING_URL)+'</a>'+
      '<br>🔢 '+esc(T('accessCode'))+': <span class="v6353-code">'+esc(ACCESS_CODE)+'</span>';
    var target=modal.querySelector('#v6349Status') || modal.querySelector('form,#v6349Form') || modal.querySelector('.v6349-box') || modal.firstElementChild;
    if(target && target.parentNode) target.parentNode.insertBefore(box, target.nextSibling);
    else modal.appendChild(box);
  }

  function render(){
    renderWelcome();
    patchRegistrationSuccess();
  }

  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('load',render);
  document.addEventListener('click',function(){
    setTimeout(patchRegistrationSuccess,150);
  },true);
  setTimeout(render,500);
  setTimeout(render,1500);
  setTimeout(render,3000);

  window.OMIDENO7_V6353_WELCOME_MEETINGS={
    render:render,
    togglePanel:togglePanel,
    enableNotifications:enableNotifications,
    version:VERSION
  };
})();
