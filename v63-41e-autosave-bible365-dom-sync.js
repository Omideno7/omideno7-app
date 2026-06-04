/* Omideno7 V63.41d — Force Cloud Panel + Stable Version Fix
   Purpose:
   1) Force-show V63.41 Auto Save / Restore beta panel even when older renderers hide it.
   2) Stabilize all beta version texts so they stop jumping between old versions.
   3) Beta-only. No effect on public index.html.
*/
(function(){
  'use strict';

  var VERSION = 'V63.41 Beta';
  var FULL = 'App Version: ' + VERSION;
  var LOG_KEY = 'omideno7_v6341d_cloud_log';
  var AUTO_KEY = 'omideno7_v6341d_auto_save_enabled';
  var LAST_SYNC_KEY = 'omideno7_v6341d_last_sync_at';
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
      intro:'این پنل مخصوص تست ادمین است. وقتی این بخش کامل تست شد، نسخه عمومی بدون پنل تست و به‌صورت خودکار منتشر می‌شود.',
      status:'آماده تست',
      autoOn:'ذخیره خودکار روشن است',
      autoOff:'ذخیره خودکار خاموش است',
      enableAuto:'روشن کردن ذخیره خودکار',
      disableAuto:'خاموش کردن ذخیره خودکار',
      saveNow:'ذخیره الآن در کلود',
      restore:'بازیابی از کلود',
      refresh:'تازه‌سازی وضعیت',
      clear:'پاک کردن گزارش',
      saved:'ذخیره در کلود انجام شد',
      restored:'بازیابی از کلود انجام شد',
      noClient:'کلاینت Supabase پیدا نشد. اول از بخش مدرسه وارد شوید.',
      notSigned:'کاربر وارد حساب نشده است. اول در مدرسه وارد شوید.',
      cloudEmpty:'در کلود هنوز اطلاعاتی برای بازیابی نیست.',
      error:'خطا',
      language:'زبان',
      currentDay:'روز فعلی برنامه ۳۶۵',
      selectedDay:'روز انتخاب‌شده',
      notifications:'نوتیفیکیشن',
      lastSync:'آخرین همگام‌سازی',
      helper:'برای تست: اول «ذخیره الآن در کلود» را بزنید، بعد Supabase را Refresh کنید. سپس می‌توانید «بازیابی از کلود» را تست کنید.'
    };
    var en = {
      title:'Auto Save & Restore — Beta V63.41',
      intro:'Admin beta test panel. After this is fully tested, the public release will run automatically without this technical panel.',
      status:'Ready for testing',
      autoOn:'Auto-save is ON',
      autoOff:'Auto-save is OFF',
      enableAuto:'Enable auto-save',
      disableAuto:'Disable auto-save',
      saveNow:'Save now to cloud',
      restore:'Restore from cloud',
      refresh:'Refresh status',
      clear:'Clear log',
      saved:'Cloud save completed',
      restored:'Cloud restore completed',
      noClient:'No Supabase client found. Sign in through School first.',
      notSigned:'No signed-in user. Sign in through School first.',
      cloudEmpty:'No cloud data found yet.',
      error:'Error',
      language:'Language',
      currentDay:'Bible 365 current day',
      selectedDay:'Selected day',
      notifications:'Notifications',
      lastSync:'Last sync',
      helper:'Test flow: press Save now, refresh Supabase, then test Restore from cloud.'
    };
    var hr = {
      title:'Automatsko spremanje i obnova — Beta V63.41',
      intro:'Beta panel samo za administratora. Nakon testiranja javna verzija radit će automatski bez ovog tehničkog panela.',
      status:'Spremno za test',
      autoOn:'Automatsko spremanje je uključeno',
      autoOff:'Automatsko spremanje je isključeno',
      enableAuto:'Uključi automatsko spremanje',
      disableAuto:'Isključi automatsko spremanje',
      saveNow:'Spremi sada u cloud',
      restore:'Vrati iz clouda',
      refresh:'Osvježi status',
      clear:'Obriši zapis',
      saved:'Spremanje u cloud je završeno',
      restored:'Vraćanje iz clouda je završeno',
      noClient:'Supabase klijent nije pronađen. Prvo se prijavite kroz Školu.',
      notSigned:'Korisnik nije prijavljen.',
      cloudEmpty:'Još nema podataka u cloudu.',
      error:'Greška',
      language:'Jezik',
      currentDay:'Trenutni dan 365',
      selectedDay:'Odabrani dan',
      notifications:'Obavijesti',
      lastSync:'Zadnja sinkronizacija',
      helper:'Test: prvo spremite sada, osvježite Supabase, zatim testirajte vraćanje.'
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
    var keys = [
      'om7_bible365_selected_day_v6331',
      'om7_bible365_live_selected_day_v6329',
      'om7_bible365_view_day',
      'om7_bible365_current_day',
      'omideno7Bible365ManualDayV6325'
    ];
    for(var i=0;i<keys.length;i++){
      try{
        var v = localStorage.getItem(keys[i]);
        if(v) return safeDay(v, 1);
      }catch(e){}
    }
    return 1;
  }

  function setLocalDay(day){
    day = safeDay(day, 1);
    ['om7_bible365_current_day','om7_bible365_view_day','om7_bible365_selected_day_v6331','om7_bible365_live_selected_day_v6329'].forEach(function(k){
      try{ localStorage.setItem(k, String(day)); }catch(e){}
    });
    try{ localStorage.setItem('om7_bible365_started','1'); }catch(e){}
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
    try{ return !!(window.Notification && Notification.permission === 'granted'); }catch(e){ return false; }
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

  function log(type, message, details){
    var arr = [];
    try{ arr = JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); }catch(e){ arr = []; }
    arr.unshift({time: nowISO(), type:type || 'info', message:String(message || ''), details: details || null});
    arr = arr.slice(0, 30);
    try{ localStorage.setItem(LOG_KEY, JSON.stringify(arr)); }catch(e){}
    renderLog();
  }

  function getLog(){
    try{ return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); }catch(e){ return []; }
  }

  function setStatus(msg, type){
    var el = document.getElementById('v6341dStatus');
    if(!el) return;
    el.className = 'v6341d-status ' + (type || 'info');
    el.textContent = msg;
  }

  async function saveToCloud(reason){
    var ctx = await getUser();
    var sb = ctx.sb, user = ctx.user;
    var snap = currentSnapshot();
    var uid = user.id;
    var email = user.email || null;
    var now = nowISO();

    var r1 = await sb.from('user_profiles').upsert({
      user_id: uid,
      email: email,
      language: snap.language,
      updated_at: now
    }, {onConflict:'user_id'});
    if(r1.error) throw r1.error;

    var r2 = await sb.from('user_app_settings').upsert({
      user_id: uid,
      language: snap.language,
      notifications_enabled: !!snap.notifications_enabled,
      timezone: snap.timezone,
      updated_at: now
    }, {onConflict:'user_id'});
    if(r2.error) throw r2.error;

    var r3 = await sb.from('bible365_progress').upsert({
      user_id: uid,
      current_day: snap.current_day,
      selected_day: snap.selected_day,
      completed_days: snap.completed_days || [],
      last_read_at: now,
      updated_at: now
    }, {onConflict:'user_id'});
    if(r3.error) throw r3.error;

    try{ localStorage.setItem(LAST_SYNC_KEY, now); }catch(e){}
    log('success', t('saved') + (reason ? ' — ' + reason : ''), snap);
    setStatus(t('saved'), 'ok');
    refreshPanelFields();
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
    return {profile: profile.data || null, settings: settings.data || null, progress: progress.data || null};
  }

  async function restoreFromCloud(){
    var cloud = await readCloud();
    if(!cloud.profile && !cloud.settings && !cloud.progress){
      setStatus(t('cloudEmpty'), 'warn');
      log('warn', t('cloudEmpty'));
      return;
    }

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
    refreshPanelFields();
  }

  function autoEnabled(){
    try{ return localStorage.getItem(AUTO_KEY) === '1'; }catch(e){ return false; }
  }

  function setAuto(v){
    try{ localStorage.setItem(AUTO_KEY, v ? '1' : '0'); }catch(e){}
    refreshPanelFields();
    if(v) scheduleAutoSave('auto-enabled');
  }

  function scheduleAutoSave(reason){
    if(!autoEnabled()) return;
    if(AUTO_TIMER) clearTimeout(AUTO_TIMER);
    AUTO_TIMER = setTimeout(function(){
      saveToCloud(reason || 'auto').catch(function(err){
        log('error', t('error') + ': ' + (err.message || err), {reason: reason});
        setStatus(t('error') + ': ' + (err.message || err), 'error');
      });
    }, 1300);
  }

  function injectStyles(){
    if(document.getElementById('v6341dStyles')) return;
    var st = document.createElement('style');
    st.id = 'v6341dStyles';
    st.textContent = [
      '#v6341dCloudPanel{display:block!important;visibility:visible!important;opacity:1!important;height:auto!important;max-height:none!important;overflow:visible!important;border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f7fff8)!important;}',
      '.v6341d-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800;}',
      '.v6341d-status.info{background:#eef4ff;color:#06146D;}',
      '.v6341d-status.ok{background:#eaffef;color:#08751a;}',
      '.v6341d-status.warn{background:#fff7df;color:#8a5a00;}',
      '.v6341d-status.error{background:#fff0f0;color:#9b1c1c;}',
      '.v6341d-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin:12px 0;}',
      '.v6341d-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important;opacity:1!important;visibility:visible!important;height:auto!important;max-height:none!important;overflow:visible!important;}',
      '.v6341d-actions button{display:inline-flex!important;opacity:1!important;visibility:visible!important;position:relative!important;z-index:999!important;min-height:42px!important;pointer-events:auto!important;}',
      '#v6341dLog details{border:1px solid var(--line,#E6EAF2);border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff;}',
      '.fa #v6341dCloudPanel{direction:rtl;text-align:right;}'
    ].join('\\n');
    document.head.appendChild(st);
  }

  function panelHTML(){
    return '<div id="v6341dCloudPanel" class="card v6341d-card">'+
      '<h3>'+esc(t('title'))+'</h3>'+
      '<p>'+esc(t('intro'))+'</p>'+
      '<div id="v6341dStatus" class="v6341d-status info">'+esc(t('status'))+'</div>'+
      '<div class="v6341d-grid">'+
        '<div><strong>'+esc(t('language'))+':</strong> <span id="v6341dLang">—</span></div>'+
        '<div><strong>'+esc(t('currentDay'))+':</strong> <span id="v6341dCurrentDay">—</span></div>'+
        '<div><strong>'+esc(t('selectedDay'))+':</strong> <span id="v6341dSelectedDay">—</span></div>'+
        '<div><strong>'+esc(t('notifications'))+':</strong> <span id="v6341dNotifications">—</span></div>'+
        '<div><strong>'+esc(t('lastSync'))+':</strong> <span id="v6341dLastSync">—</span></div>'+
        '<div><strong id="v6341dAutoText">—</strong></div>'+
      '</div>'+
      '<div class="v6341d-actions">'+
        '<button type="button" class="btn primary" id="v6341dToggleAuto">'+esc(t('enableAuto'))+'</button>'+
        '<button type="button" class="btn gold" id="v6341dSaveNow">'+esc(t('saveNow'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6341dRestore">'+esc(t('restore'))+'</button>'+
        '<button type="button" class="btn light" id="v6341dRefresh">'+esc(t('refresh'))+'</button>'+
        '<button type="button" class="btn light" id="v6341dClear">'+esc(t('clear'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(t('helper'))+'</p>'+
      '<div id="v6341dLog"></div>'+
    '</div>';
  }

  function bindPanel(){
    var bind = function(id, fn){
      var el = document.getElementById(id);
      if(!el || el.dataset.v6341dBound) return;
      el.dataset.v6341dBound = '1';
      el.addEventListener('click', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        fn();
        return false;
      }, true);
    };

    bind('v6341dToggleAuto', function(){ setAuto(!autoEnabled()); });
    bind('v6341dSaveNow', function(){
      saveToCloud('manual').catch(function(err){
        log('error', t('error') + ': ' + (err.message || err));
        setStatus(t('error') + ': ' + (err.message || err), 'error');
      });
    });
    bind('v6341dRestore', function(){
      restoreFromCloud().catch(function(err){
        log('error', t('error') + ': ' + (err.message || err));
        setStatus(t('error') + ': ' + (err.message || err), 'error');
      });
    });
    bind('v6341dRefresh', refreshPanelFields);
    bind('v6341dClear', function(){
      localStorage.removeItem(LOG_KEY);
      renderLog();
      setStatus(t('status'), 'info');
    });
  }

  function renderPanel(){
    injectStyles();
    var more = document.getElementById('more');
    if(!more) return;
    var panel = document.getElementById('v6341dCloudPanel');
    if(!panel){
      var old = document.getElementById('v6341CloudPanel');
      if(old) old.style.display = 'none';
      var footer = more.querySelector('.footer');
      var wrap = document.createElement('div');
      wrap.innerHTML = panelHTML();
      panel = wrap.firstElementChild;
      more.insertBefore(panel, footer || null);
    }
    bindPanel();
    refreshPanelFields();
    renderLog();
  }

  function refreshPanelFields(){
    var snap = currentSnapshot();
    var set = function(id, value){ var el = document.getElementById(id); if(el) el.textContent = value; };
    set('v6341dLang', snap.language);
    set('v6341dCurrentDay', String(snap.current_day));
    set('v6341dSelectedDay', String(snap.selected_day));
    set('v6341dNotifications', String(!!snap.notifications_enabled));
    set('v6341dLastSync', localStorage.getItem(LAST_SYNC_KEY) || '—');

    var auto = autoEnabled();
    var autoText = document.getElementById('v6341dAutoText');
    if(autoText) autoText.textContent = auto ? t('autoOn') : t('autoOff');
    var toggle = document.getElementById('v6341dToggleAuto');
    if(toggle){
      toggle.textContent = auto ? t('disableAuto') : t('enableAuto');
      toggle.className = 'btn ' + (auto ? 'light' : 'primary');
    }
    stabilizeVersion();
    bindPanel();
  }

  function renderLog(){
    var box = document.getElementById('v6341dLog');
    if(!box) return;
    var arr = getLog();
    if(!arr.length){ box.innerHTML = ''; return; }
    box.innerHTML = arr.map(function(item){
      return '<details><summary>'+esc(item.time)+' — '+esc(item.type)+' — '+esc(item.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(item.details || {}, null, 2))+'</pre></details>';
    }).join('');
  }

  function looksLikeVersionText(t){
    return /App\\s*Version\\s*:\\s*V/i.test(t || '') || /نسخه|ورژن/i.test(t || '');
  }

  function stabilizeVersion(){
    try{
      window.APP_VERSION = VERSION;
      window.OMIDENO7_APP_VERSION = VERSION;
      window.OMIDENO7_BETA_VERSION = VERSION;
      Array.prototype.slice.call(document.querySelectorAll('header, .app-header, .footer, .app-version, #appVersion, small, span, div, p, b')).forEach(function(el){
        var txt = (el.textContent || '').trim();
        if(looksLikeVersionText(txt) && txt.length < 130 && el.children.length < 3){
          el.textContent = FULL;
        }
      });
      var header = document.querySelector('.app-header') || document.querySelector('header');
      if(header){
        var badge = document.getElementById('v6341dHeaderVersion');
        if(!badge){
          badge = document.createElement('div');
          badge.id = 'v6341dHeaderVersion';
          badge.style.cssText = 'position:absolute;left:50%;transform:translateX(-50%);top:8px;color:#fff;font-weight:800;font-size:14px;z-index:50;pointer-events:none;';
          try{ header.style.position = header.style.position || 'relative'; header.appendChild(badge); }catch(e){}
        }
        badge.textContent = FULL;
      }
    }catch(e){}
  }

  function installWatchers(){
    if(window.__om7v6341dWatch) return;
    window.__om7v6341dWatch = true;
    document.addEventListener('click', function(ev){
      var tx = (ev.target && ev.target.textContent || '').trim();
      if(/روز بعد|روز قبل|خواندم|Next|Previous|365|روز|Day/.test(tx)){
        scheduleAutoSave('click');
      }
      setTimeout(renderPanel, 60);
      setTimeout(stabilizeVersion, 90);
    }, true);
    document.addEventListener('change', function(){
      scheduleAutoSave('change');
      setTimeout(renderPanel, 80);
    }, true);
    window.addEventListener('online', function(){ scheduleAutoSave('online'); });
    window.addEventListener('storage', function(){ scheduleAutoSave('storage'); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderPanel();
    installWatchers();
    stabilizeVersion();
  });
  window.addEventListener('load', function(){
    renderPanel();
    installWatchers();
    stabilizeVersion();
    if(autoEnabled()) scheduleAutoSave('load');
  });
  setInterval(function(){ renderPanel(); stabilizeVersion(); }, 1500);
  setTimeout(renderPanel, 250);
  setTimeout(renderPanel, 900);
  setTimeout(renderPanel, 2000);

  window.OMIDENO7_V6341D_BETA = {
    version: VERSION,
    saveToCloud: saveToCloud,
    restoreFromCloud: restoreFromCloud,
    readCloud: readCloud,
    currentSnapshot: currentSnapshot,
    renderPanel: renderPanel
  };
})();
