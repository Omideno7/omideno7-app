/* Omideno7 V63.41 — Cloud Auto Save + Restore Beta
   Beta-only. Adds controlled auto-save and restore testing for:
   - user profile
   - app settings
   - Bible 365 progress
   This script does NOT run on the stable index.html.
*/
(function(){
  'use strict';

  var VERSION = 'V63.41 Cloud Auto Save + Restore Beta';
  var ADMIN_EMAIL = 'omideno7church@gmail.com';
  var LOG_KEY = 'omideno7_v6341_cloud_auto_log';
  var AUTO_KEY = 'omideno7_v6341_auto_save_enabled';
  var LAST_SYNC_KEY = 'omideno7_v6341_last_sync_at';
  var AUTO_TIMER = null;
  var RESTORING = false;

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
    catch(e){ return 'fa'; }
  }

  function t(key){
    var L = lang();
    var fa = {
      title:'ذخیره و بازیابی خودکار — Beta V63.41',
      intro:'این بخش مرحله تست است. ذخیره خودکار فقط در نسخه Beta فعال می‌شود و اپ اصلی کاربران را تغییر نمی‌دهد.',
      autoOn:'ذخیره خودکار: روشن',
      autoOff:'ذخیره خودکار: خاموش',
      enableAuto:'روشن کردن ذخیره خودکار',
      disableAuto:'خاموش کردن ذخیره خودکار',
      saveNow:'ذخیره الآن در کلود',
      restore:'بازیابی از کلود',
      status:'وضعیت',
      saved:'ذخیره در کلود انجام شد',
      restored:'بازیابی از کلود انجام شد',
      noClient:'کلاینت Supabase پیدا نشد. اول از بخش مدرسه وارد شوید.',
      notSigned:'کاربر وارد حساب نشده است. اول در مدرسه وارد شوید.',
      cloudEmpty:'در کلود هنوز اطلاعاتی برای بازیابی نیست.',
      error:'خطا',
      lastSync:'آخرین همگام‌سازی',
      local:'اطلاعات فعلی دستگاه',
      cloud:'اطلاعات کلود',
      currentDay:'روز فعلی ۳۶۵',
      selectedDay:'روز انتخاب‌شده',
      language:'زبان',
      notifications:'نوتیفیکیشن',
      clear:'پاک کردن گزارش V63.41'
    };
    var en = {
      title:'Auto Save & Restore — Beta V63.41',
      intro:'Beta test only. Auto-save runs only on beta.html and does not change the stable app.',
      autoOn:'Auto-save: ON',
      autoOff:'Auto-save: OFF',
      enableAuto:'Enable auto-save',
      disableAuto:'Disable auto-save',
      saveNow:'Save now to cloud',
      restore:'Restore from cloud',
      status:'Status',
      saved:'Cloud save completed',
      restored:'Cloud restore completed',
      noClient:'No Supabase client found. Sign in through School first.',
      notSigned:'No signed-in user. Sign in through School first.',
      cloudEmpty:'No cloud data found yet.',
      error:'Error',
      lastSync:'Last sync',
      local:'Current device data',
      cloud:'Cloud data',
      currentDay:'Bible 365 current day',
      selectedDay:'Selected day',
      language:'Language',
      notifications:'Notifications',
      clear:'Clear V63.41 log'
    };
    var hr = {
      title:'Automatsko spremanje i obnova — Beta V63.41',
      intro:'Samo Beta test. Automatsko spremanje radi samo na beta.html.',
      autoOn:'Automatsko spremanje: uključeno',
      autoOff:'Automatsko spremanje: isključeno',
      enableAuto:'Uključi automatsko spremanje',
      disableAuto:'Isključi automatsko spremanje',
      saveNow:'Spremi sada u cloud',
      restore:'Vrati iz clouda',
      status:'Status',
      saved:'Spremanje u cloud je završeno',
      restored:'Vraćanje iz clouda je završeno',
      noClient:'Supabase klijent nije pronađen. Prvo se prijavite kroz Školu.',
      notSigned:'Korisnik nije prijavljen.',
      cloudEmpty:'Još nema podataka u cloudu.',
      error:'Greška',
      lastSync:'Zadnja sinkronizacija',
      local:'Trenutni podaci uređaja',
      cloud:'Podaci u cloudu',
      currentDay:'Trenutni dan 365',
      selectedDay:'Odabrani dan',
      language:'Jezik',
      notifications:'Obavijesti',
      clear:'Obriši V63.41 zapis'
    };
    var d = L === 'hr' ? hr : (L === 'en' ? en : fa);
    return d[key] || fa[key] || key;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function nowISO(){ return new Date().toISOString(); }

  function safeDay(v, fallback){
    var n = parseInt(v, 10);
    if(!isFinite(n) || n < 1) return fallback || 1;
    if(n > 365) return 365;
    return n;
  }

  function getLocalDay(){
    var candidates = [
      'om7_bible365_selected_day_v6331',
      'om7_bible365_live_selected_day_v6329',
      'om7_bible365_view_day',
      'om7_bible365_current_day',
      'omideno7Bible365ManualDayV6325'
    ];
    for(var i=0;i<candidates.length;i++){
      try{
        var v = localStorage.getItem(candidates[i]);
        if(v) return safeDay(v, 1);
      }catch(e){}
    }
    return 1;
  }

  function setLocalDay(day){
    day = safeDay(day, 1);
    [
      'om7_bible365_current_day',
      'om7_bible365_view_day',
      'om7_bible365_selected_day_v6331',
      'om7_bible365_live_selected_day_v6329'
    ].forEach(function(k){
      try{ localStorage.setItem(k, String(day)); }catch(e){}
    });
    try{ localStorage.setItem('om7_bible365_started', '1'); }catch(e){}
  }

  function getCompletedDays(){
    var keys = ['om7_bible365_completed_days','omideno7Bible365CompletedDays','bible365_completed_days'];
    for(var i=0;i<keys.length;i++){
      try{
        var raw = localStorage.getItem(keys[i]);
        if(raw){
          var parsed = JSON.parse(raw);
          if(Array.isArray(parsed)) return parsed.filter(function(x){ return safeDay(x,0)>0; });
        }
      }catch(e){}
    }
    return [];
  }

  function getNotificationState(){
    try{
      if(window.Notification && Notification.permission === 'granted') return true;
      if(window.OneSignal && typeof window.OneSignal.User !== 'undefined') return true;
    }catch(e){}
    return false;
  }

  function currentSnapshot(){
    var d = getLocalDay();
    return {
      language: lang(),
      current_day: d,
      selected_day: d,
      completed_days: getCompletedDays(),
      notifications_enabled: !!getNotificationState(),
      timezone: (Intl && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : null) || null,
      captured_at: nowISO()
    };
  }

  function log(type, message, details){
    var arr = [];
    try{ arr = JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); }catch(e){ arr = []; }
    arr.unshift({time: nowISO(), type:type || 'info', message:String(message || ''), details: details || null});
    arr = arr.slice(0, 40);
    try{ localStorage.setItem(LOG_KEY, JSON.stringify(arr)); }catch(e){}
    renderLog();
  }

  function getLog(){
    try{ return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); }catch(e){ return []; }
  }

  function setStatus(msg, type){
    var el = document.getElementById('v6341CloudStatus');
    if(!el) return;
    el.className = 'v6341-cloud-status ' + (type || 'info');
    el.textContent = msg;
  }

  function findSupabaseClient(){
    if(window.OMIDENO7_V6340_BETA && typeof window.OMIDENO7_V6340_BETA.findSupabaseClient === 'function'){
      var c = window.OMIDENO7_V6340_BETA.findSupabaseClient();
      if(c) return c;
    }
    var names = ['omideno7Supabase','schoolSupabase','supabaseClient'];
    for(var i=0;i<names.length;i++){
      var x = window[names[i]];
      if(x && x.auth && typeof x.from === 'function') return x;
    }
    if(window.__om7SupabaseClients && window.__om7SupabaseClients.length) return window.__om7SupabaseClients[0];
    return null;
  }

  async function getUser(){
    var sb = findSupabaseClient();
    if(!sb) throw new Error(t('noClient'));
    var res = await sb.auth.getUser();
    if(res.error) throw res.error;
    var user = res.data && res.data.user;
    if(!user) throw new Error(t('notSigned'));
    return {sb:sb, user:user};
  }

  async function saveToCloud(reason){
    if(RESTORING) return null;
    var ctx = await getUser();
    var sb = ctx.sb, user = ctx.user;
    var snap = currentSnapshot();
    var uid = user.id;
    var email = user.email || null;

    var profilePayload = {
      user_id: uid,
      email: email,
      language: snap.language,
      updated_at: nowISO()
    };

    var settingsPayload = {
      user_id: uid,
      language: snap.language,
      notifications_enabled: !!snap.notifications_enabled,
      timezone: snap.timezone,
      updated_at: nowISO()
    };

    var progressPayload = {
      user_id: uid,
      current_day: snap.current_day,
      selected_day: snap.selected_day,
      completed_days: snap.completed_days || [],
      last_read_at: nowISO(),
      updated_at: nowISO()
    };

    var r1 = await sb.from('user_profiles').upsert(profilePayload, {onConflict:'user_id'});
    if(r1.error) throw r1.error;

    var r2 = await sb.from('user_app_settings').upsert(settingsPayload, {onConflict:'user_id'});
    if(r2.error) throw r2.error;

    var r3 = await sb.from('bible365_progress').upsert(progressPayload, {onConflict:'user_id'});
    if(r3.error) throw r3.error;

    try{ localStorage.setItem(LAST_SYNC_KEY, nowISO()); }catch(e){}
    log('success', t('saved') + (reason ? ' — ' + reason : ''), snap);
    setStatus(t('saved'), 'ok');
    updatePanel();
    return snap;
  }

  async function readCloud(){
    var ctx = await getUser();
    var sb = ctx.sb, user = ctx.user;
    var uid = user.id;

    var profile = await sb.from('user_profiles').select('*').eq('user_id', uid).maybeSingle();
    if(profile.error) throw profile.error;

    var settings = await sb.from('user_app_settings').select('*').eq('user_id', uid).maybeSingle();
    if(settings.error) throw settings.error;

    var progress = await sb.from('bible365_progress').select('*').eq('user_id', uid).maybeSingle();
    if(progress.error) throw progress.error;

    return {
      profile: profile.data || null,
      settings: settings.data || null,
      progress: progress.data || null
    };
  }

  async function restoreFromCloud(){
    var cloud = await readCloud();
    if(!cloud.profile && !cloud.settings && !cloud.progress){
      setStatus(t('cloudEmpty'), 'warn');
      log('warn', t('cloudEmpty'));
      return;
    }

    RESTORING = true;
    try{
      var cloudLang = (cloud.settings && cloud.settings.language) || (cloud.profile && cloud.profile.language);
      if(cloudLang && /^(fa|en|hr)$/.test(cloudLang)){
        try{ localStorage.setItem('lang', cloudLang); document.documentElement.lang = cloudLang; }catch(e){}
        try{ if(typeof window.setLang === 'function') window.setLang(cloudLang); }catch(e){}
      }

      var day = cloud.progress && (cloud.progress.selected_day || cloud.progress.current_day);
      if(day) setLocalDay(day);

      try{ localStorage.setItem(LAST_SYNC_KEY, nowISO()); }catch(e){}
      log('success', t('restored'), cloud);
      setStatus(t('restored'), 'ok');

      try{
        if(typeof window.renderBibleReader === 'function') window.renderBibleReader();
        if(typeof window.renderApp === 'function') window.renderApp();
      }catch(e){}
    } finally {
      RESTORING = false;
    }
    updatePanel();
  }

  function autoEnabled(){
    try{ return localStorage.getItem(AUTO_KEY) === '1'; }catch(e){ return false; }
  }
  function setAuto(v){
    try{ localStorage.setItem(AUTO_KEY, v ? '1' : '0'); }catch(e){}
    if(v) scheduleAutoSave('auto-enabled');
    updatePanel();
  }

  function scheduleAutoSave(reason){
    if(!autoEnabled()) return;
    if(AUTO_TIMER) clearTimeout(AUTO_TIMER);
    AUTO_TIMER = setTimeout(function(){
      saveToCloud(reason || 'auto').catch(function(err){
        log('error', t('error') + ': ' + (err.message || err), {reason: reason});
        setStatus(t('error') + ': ' + (err.message || err), 'error');
      });
    }, 900);
  }

  function watchChanges(){
    document.addEventListener('click', function(ev){
      var tx = (ev.target && ev.target.textContent || '').trim();
      if(/روز بعد|روز قبل|خواندم|Next|Previous|Day|365|روز/.test(tx)){
        scheduleAutoSave('click');
      }
    }, true);
    document.addEventListener('change', function(ev){
      scheduleAutoSave('change');
    }, true);
    window.addEventListener('online', function(){ scheduleAutoSave('online'); });
    window.addEventListener('storage', function(){ scheduleAutoSave('storage'); });
  }

  function panelHtml(){
    var snap = currentSnapshot();
    var auto = autoEnabled();
    var last = localStorage.getItem(LAST_SYNC_KEY) || '—';
    return '<div id="v6341CloudPanel" class="card v6341-cloud-card">'+
      '<h3>'+esc(t('title'))+'</h3>'+
      '<p>'+esc(t('intro'))+'</p>'+
      '<div id="v6341CloudStatus" class="v6341-cloud-status info">'+esc(t('status'))+'</div>'+
      '<div class="v6341-mini-grid">'+
        '<div><strong>'+esc(t('language'))+':</strong> '+esc(snap.language)+'</div>'+
        '<div><strong>'+esc(t('currentDay'))+':</strong> '+esc(snap.current_day)+'</div>'+
        '<div><strong>'+esc(t('selectedDay'))+':</strong> '+esc(snap.selected_day)+'</div>'+
        '<div><strong>'+esc(t('notifications'))+':</strong> '+esc(String(!!snap.notifications_enabled))+'</div>'+
        '<div><strong>'+esc(t('lastSync'))+':</strong> '+esc(last)+'</div>'+
        '<div><strong>'+esc(auto ? t('autoOn') : t('autoOff'))+'</strong></div>'+
      '</div>'+
      '<div class="btn-row">'+
        '<button type="button" class="btn '+(auto?'light':'primary')+'" id="v6341ToggleAuto">'+esc(auto ? t('disableAuto') : t('enableAuto'))+'</button>'+
        '<button type="button" class="btn gold" id="v6341SaveNow">'+esc(t('saveNow'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6341Restore">'+esc(t('restore'))+'</button>'+
        '<button type="button" class="btn light" id="v6341Clear">'+esc(t('clear'))+'</button>'+
      '</div>'+
      '<div id="v6341CloudLog"></div>'+
    '</div>';
  }

  function injectStyle(){
    if(document.getElementById('v6341CloudStyle')) return;
    var st = document.createElement('style');
    st.id = 'v6341CloudStyle';
    st.textContent = [
      '.v6341-cloud-card{border-top:5px solid #00B91F;background:linear-gradient(160deg,#fff,#f7fff8);}',
      '.v6341-cloud-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800;}',
      '.v6341-cloud-status.info{background:#eef4ff;color:#06146D;}',
      '.v6341-cloud-status.ok{background:#eaffef;color:#08751a;}',
      '.v6341-cloud-status.warn{background:#fff7df;color:#8a5a00;}',
      '.v6341-cloud-status.error{background:#fff0f0;color:#9b1c1c;}',
      '.v6341-mini-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin:12px 0;}',
      '#v6341CloudLog details{border:1px solid var(--line,#E6EAF2);border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff;}',
      '.fa .v6341-cloud-card{direction:rtl;text-align:right;}'
    ].join('\\n');
    document.head.appendChild(st);
  }

  function renderLog(){
    var box = document.getElementById('v6341CloudLog');
    if(!box) return;
    var arr = getLog();
    if(!arr.length){ box.innerHTML = ''; return; }
    box.innerHTML = arr.map(function(item){
      return '<details><summary>'+esc(item.time)+' — '+esc(item.type)+' — '+esc(item.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(item.details || {}, null, 2))+'</pre></details>';
    }).join('');
  }

  function renderPanel(){
    injectStyle();
    var more = document.getElementById('more');
    if(!more) return;
    if(document.getElementById('v6341CloudPanel')){ updatePanel(); return; }
    var footer = more.querySelector('.footer');
    var wrap = document.createElement('div');
    wrap.innerHTML = panelHtml();
    var panel = wrap.firstElementChild;
    more.insertBefore(panel, footer || null);

    document.getElementById('v6341ToggleAuto').addEventListener('click', function(){ setAuto(!autoEnabled()); });
    document.getElementById('v6341SaveNow').addEventListener('click', function(){
      saveToCloud('manual').catch(function(err){
        log('error', t('error') + ': ' + (err.message || err));
        setStatus(t('error') + ': ' + (err.message || err), 'error');
      });
    });
    document.getElementById('v6341Restore').addEventListener('click', function(){
      restoreFromCloud().catch(function(err){
        log('error', t('error') + ': ' + (err.message || err));
        setStatus(t('error') + ': ' + (err.message || err), 'error');
      });
    });
    document.getElementById('v6341Clear').addEventListener('click', function(){
      localStorage.removeItem(LOG_KEY);
      renderLog();
      setStatus(t('status'), 'info');
    });
    renderLog();
  }

  function updatePanel(){
    var old = document.getElementById('v6341CloudPanel');
    if(!old) return;
    var statusText = document.getElementById('v6341CloudStatus') ? document.getElementById('v6341CloudStatus').textContent : t('status');
    var statusClass = document.getElementById('v6341CloudStatus') ? document.getElementById('v6341CloudStatus').className : 'v6341-cloud-status info';
    var parent = old.parentNode;
    var temp = document.createElement('div');
    temp.innerHTML = panelHtml();
    var fresh = temp.firstElementChild;
    parent.replaceChild(fresh, old);
    var status = document.getElementById('v6341CloudStatus');
    if(status){ status.textContent = statusText; status.className = statusClass; }
    document.getElementById('v6341ToggleAuto').addEventListener('click', function(){ setAuto(!autoEnabled()); });
    document.getElementById('v6341SaveNow').addEventListener('click', function(){
      saveToCloud('manual').catch(function(err){ log('error', t('error') + ': ' + (err.message || err)); setStatus(t('error') + ': ' + (err.message || err), 'error'); });
    });
    document.getElementById('v6341Restore').addEventListener('click', function(){
      restoreFromCloud().catch(function(err){ log('error', t('error') + ': ' + (err.message || err)); setStatus(t('error') + ': ' + (err.message || err), 'error'); });
    });
    document.getElementById('v6341Clear').addEventListener('click', function(){ localStorage.removeItem(LOG_KEY); renderLog(); setStatus(t('status'), 'info'); });
    renderLog();
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderPanel();
    watchChanges();
    if(autoEnabled()) scheduleAutoSave('startup');
  });
  window.addEventListener('load', function(){
    renderPanel();
    if(autoEnabled()) scheduleAutoSave('load');
  });
  document.addEventListener('click', function(){ setTimeout(renderPanel, 80); }, true);
  setTimeout(renderPanel, 500);
  setTimeout(function(){ if(autoEnabled()) scheduleAutoSave('delayed'); }, 2000);

  window.OMIDENO7_V6341_BETA = {
    version: VERSION,
    saveToCloud: saveToCloud,
    restoreFromCloud: restoreFromCloud,
    readCloud: readCloud,
    currentSnapshot: currentSnapshot
  };
})();
