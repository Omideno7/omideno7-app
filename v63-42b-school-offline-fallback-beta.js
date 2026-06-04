/* Omideno7 V63.42b — School Offline Fallback Beta
   Beta-only. Does not affect stable index.html.
*/
(function(){
  'use strict';

  var VERSION = 'V63.42b School Offline Fallback Beta';
  var SNAP_KEY = 'omideno7_v6342b_school_snapshot';
  var LOG_KEY = 'omideno7_v6342b_school_offline_log';

  function isBeta(){ return /beta\.html/i.test(location.pathname) || /v=6342|v=6341/i.test(location.search); }
  if(!isBeta()) return;

  function lang(){ try{return localStorage.getItem('lang') || document.documentElement.lang || 'fa';}catch(e){return 'fa';} }
  function tr(k){
    var fa = {
      title:'مدرسه آفلاین — نسخه تست',
      offlineTitle:'شما آفلاین هستید',
      offlineText:'اتصال اینترنت قطع است. بخش مدرسه برای ورود، تأیید حساب، دریافت درس‌های جدید و ارسال تکلیف نیاز به اینترنت دارد.',
      cachedTitle:'آخرین اطلاعات ذخیره‌شده مدرسه',
      noCache:'هنوز محتوای مدرسه برای استفاده آفلاین ذخیره نشده است. یک بار وقتی اینترنت دارید وارد مدرسه شوید تا اطلاعات پایه ذخیره شود.',
      whatWorks:'در نسخه بعدی، درس‌هایی که قبلاً باز کرده‌اید و صوت‌هایی که ذخیره کرده‌اید می‌توانند آفلاین نمایش داده شوند.',
      back:'بازگشت به خانه',
      more:'رفتن به بیشتر',
      saved:'اسنپ‌شات مدرسه ذخیره شد',
      online:'اینترنت وصل است',
      offline:'آفلاین',
      updated:'آخرین ذخیره',
      retry:'وقتی اینترنت وصل شد، دوباره وارد مدرسه شوید.'
    };
    var en = {
      title:'School Offline — Beta',
      offlineTitle:'You are offline',
      offlineText:'Internet is disconnected. School sign-in, approval, new lessons, and homework upload require internet.',
      cachedTitle:'Last saved School information',
      noCache:'No School content has been saved for offline use yet. Open School once while online so the basic information can be stored.',
      whatWorks:'In the next version, lessons you already opened and audio you saved can be shown offline.',
      back:'Back to Home',
      more:'Go to More',
      saved:'School snapshot saved',
      online:'Online',
      offline:'Offline',
      updated:'Last saved',
      retry:'When internet returns, open School again.'
    };
    var hr = {
      title:'Škola offline — Beta',
      offlineTitle:'Niste povezani na internet',
      offlineText:'Za prijavu u školu, odobrenje, nove lekcije i slanje domaće zadaće potreban je internet.',
      cachedTitle:'Zadnje spremljene informacije škole',
      noCache:'Još nema spremljenog sadržaja škole za offline korištenje. Otvorite školu jednom dok ste online.',
      whatWorks:'U sljedećoj verziji lekcije koje ste već otvorili i audio koji ste spremili mogu biti dostupni offline.',
      back:'Natrag na početnu',
      more:'Više',
      saved:'Snimka škole spremljena',
      online:'Online',
      offline:'Offline',
      updated:'Zadnje spremljeno',
      retry:'Kad se internet vrati, otvorite školu ponovno.'
    };
    return (lang()==='hr'?hr:(lang()==='en'?en:fa))[k] || fa[k] || k;
  }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function now(){ return new Date().toISOString(); }

  function log(type,msg,details){
    var arr=[]; try{arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){arr=[];}
    arr.unshift({time:now(), type:type||'info', message:String(msg||''), details:details||null});
    arr=arr.slice(0,20); try{localStorage.setItem(LOG_KEY,JSON.stringify(arr));}catch(e){}
  }

  function findSchool(){
    return document.getElementById('school') ||
           document.getElementById('schoolPage') ||
           document.querySelector('[data-page="school"]') ||
           document.querySelector('.page.school') ||
           null;
  }

  function isSchoolVisible(){
    var s=findSchool(); if(!s) return false;
    if(s.classList.contains('active')) return true;
    try{
      var st=getComputedStyle(s), r=s.getBoundingClientRect();
      return st.display!=='none' && st.visibility!=='hidden' && r.width>0 && r.height>0;
    }catch(e){ return false; }
  }

  function isMeaningfulSchoolText(txt){
    txt = String(txt||'').trim();
    if(!txt || txt.length < 30) return false;
    if(/TypeError|Load failed|در حال بارگذاری|Loading|failed/i.test(txt) && txt.length < 250) return false;
    return /مدرسه|School|درس|کلاس|lesson|homework|تکلیف|دانش|student|آموزش/i.test(txt);
  }

  function saveSchoolSnapshot(){
    if(!navigator.onLine) return;
    var s=findSchool(); if(!s) return;
    var txt=(s.innerText||'').trim();
    if(!isMeaningfulSchoolText(txt)) return;

    var snap = {
      version: VERSION,
      saved_at: now(),
      language: lang(),
      text: txt.slice(0, 12000)
    };
    try{
      localStorage.setItem(SNAP_KEY, JSON.stringify(snap));
      log('success', tr('saved'), {saved_at:snap.saved_at, length:snap.text.length});
    }catch(e){}
  }

  function getSnapshot(){
    try{return JSON.parse(localStorage.getItem(SNAP_KEY)||'null');}catch(e){return null;}
  }

  function installCss(){
    if(document.getElementById('v6342bSchoolOfflineCss')) return;
    var st=document.createElement('style');
    st.id='v6342bSchoolOfflineCss';
    st.textContent=[
      '.v6342b-school-offline{border-top:5px solid #0B62FF;background:linear-gradient(160deg,#fff,#f4f8ff);border-radius:20px;padding:18px;margin:18px auto;max-width:760px;box-shadow:0 8px 28px rgba(15,23,42,.08);}',
      '.v6342b-school-offline h3{margin-top:0;color:#06146D}.v6342b-school-offline .warn{background:#fff7df;border-radius:14px;padding:12px;color:#7a4b00;font-weight:800}.v6342b-school-offline pre{white-space:pre-wrap;font:inherit;line-height:1.9;background:#fff;border:1px solid #e6eaf2;border-radius:14px;padding:12px;max-height:340px;overflow:auto}.v6342b-school-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}.fa .v6342b-school-offline{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function offlineHtml(){
    var snap=getSnapshot();
    var content = snap && snap.text ? '<h4>'+esc(tr('cachedTitle'))+'</h4><p class="small">'+esc(tr('updated'))+': '+esc(snap.saved_at)+'</p><pre>'+esc(snap.text)+'</pre>' : '<p class="warn">'+esc(tr('noCache'))+'</p>';
    return '<div class="v6342b-school-offline">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p class="warn">'+esc(tr('offlineTitle'))+'</p>'+
      '<p>'+esc(tr('offlineText'))+'</p>'+
      content+
      '<p>'+esc(tr('whatWorks'))+'</p>'+
      '<p class="small">'+esc(tr('retry'))+'</p>'+
      '<div class="v6342b-school-actions">'+
        '<button type="button" class="btn primary" data-v6342b-go="home">'+esc(tr('back'))+'</button>'+
        '<button type="button" class="btn secondary" data-v6342b-go="more">'+esc(tr('more'))+'</button>'+
      '</div>'+
    '</div>';
  }

  function showOfflineSchool(){
    var s=findSchool(); if(!s) return false;
    installCss();
    s.innerHTML = offlineHtml();
    try{s.classList.add('active');}catch(e){}
    log('info','School offline fallback shown',{online:navigator.onLine});
    bindOfflineButtons();
    return true;
  }

  function bindOfflineButtons(){
    Array.prototype.slice.call(document.querySelectorAll('[data-v6342b-go]')).forEach(function(btn){
      if(btn.dataset.bound) return;
      btn.dataset.bound='1';
      btn.addEventListener('click', function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var target=btn.getAttribute('data-v6342b-go');
        try{
          if(typeof window.showPage === 'function') window.showPage(target);
          else {
            document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
            var el=document.getElementById(target); if(el) el.classList.add('active');
          }
        }catch(e){}
      }, true);
    });
  }

  function watchSchool(){
    if(!navigator.onLine && isSchoolVisible()){
      var s=findSchool();
      var text=s ? (s.innerText||'') : '';
      if(/TypeError|Load failed|در حال بارگذاری|Loading/i.test(text) || text.trim().length < 40){
        showOfflineSchool();
      }
      return;
    }
    if(navigator.onLine && isSchoolVisible()){
      saveSchoolSnapshot();
    }
  }

  document.addEventListener('click', function(ev){
    var txt = (ev.target && ev.target.textContent || '').trim();
    if(/مدرسه|School|škola|Skola|🎓/i.test(txt)){
      setTimeout(watchSchool, 250);
      setTimeout(watchSchool, 1000);
      setTimeout(watchSchool, 2500);
    }
  }, true);

  window.addEventListener('offline', function(){ setTimeout(watchSchool, 250); });
  window.addEventListener('online', function(){ setTimeout(saveSchoolSnapshot, 1000); });

  setInterval(watchSchool, 1500);
  setTimeout(saveSchoolSnapshot, 2000);
  setTimeout(watchSchool, 2500);

  window.OMIDENO7_V6342B_SCHOOL_OFFLINE = {
    showOfflineSchool:showOfflineSchool,
    saveSchoolSnapshot:saveSchoolSnapshot,
    snapshot:getSnapshot,
    version:VERSION
  };
})();
