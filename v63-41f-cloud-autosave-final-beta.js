/* Omideno7 V63.41f — Final Beta Auto Save + Bible365 Tracker
   Beta-only. Does not affect stable index.html.
   Key fix: keeps a live tracker for the Bible 365 visible selected day and uses that day for cloud save/restore.
*/
(function(){
  'use strict';

  var VERSION = 'V63.41 Beta';
  var FULL = 'App Version: ' + VERSION;
  var AUTO_KEY = 'omideno7_v6341f_auto_save_enabled';
  var LOG_KEY = 'omideno7_v6341f_log';
  var LAST_SYNC_KEY = 'omideno7_v6341f_last_sync';
  var TRACK_DAY_KEY = 'omideno7_v6341f_tracked_bible365_day';
  var TRACK_SOURCE_KEY = 'omideno7_v6341f_tracked_bible365_source';
  var saveTimer = null;
  var lastSeenDay = 0;

  function isBeta(){ return /beta\.html/i.test(location.pathname) || /v=6341/i.test(location.search); }
  if(!isBeta()) return;

  function faNumToEn(s){
    return String(s == null ? '' : s)
      .replace(/[۰-۹]/g, function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d);})
      .replace(/[٠-٩]/g, function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d);});
  }
  function safeDay(v, fallback){
    var n = parseInt(faNumToEn(v), 10);
    if(!isFinite(n) || n < 1) return fallback || 1;
    return Math.min(n,365);
  }
  function lang(){ try{return localStorage.getItem('lang') || document.documentElement.lang || 'fa';}catch(e){return 'fa';} }
  function nowISO(){ return new Date().toISOString(); }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }

  function t(k){
    var L = lang();
    var fa = {
      title:'ذخیره و بازیابی خودکار — Beta V63.41F',
      intro:'این نسخه روز انتخاب‌شده برنامه ۳۶۵ را زنده ردیابی می‌کند. اگر Auto Save روشن باشد، بعد از تغییر روز، خودش در کلود ذخیره می‌کند.',
      status:'آماده تست',
      enable:'روشن کردن ذخیره خودکار',
      disable:'خاموش کردن ذخیره خودکار',
      autoOn:'ذخیره خودکار روشن است',
      autoOff:'ذخیره خودکار خاموش است',
      save:'ذخیره الآن در کلود',
      restore:'بازیابی از کلود',
      refresh:'تازه‌سازی وضعیت',
      clear:'پاک کردن گزارش',
      saved:'ذخیره در کلود انجام شد',
      restored:'بازیابی از کلود انجام شد',
      noClient:'کلاینت Supabase پیدا نشد. اول از مدرسه وارد شوید.',
      notSigned:'کاربر وارد حساب نشده است. اول در مدرسه وارد شوید.',
      empty:'در کلود هنوز اطلاعاتی نیست.',
      error:'خطا',
      language:'زبان',
      day:'روز برنامه ۳۶۵',
      source:'منبع تشخیص',
      notifications:'نوتیفیکیشن',
      lastSync:'آخرین همگام‌سازی',
      manual:'روز برای ذخیره/بازیابی',
      help:'تست: Auto Save را روشن کن، برو برنامه ۳۶۵ و روز را عوض کن، چند ثانیه صبر کن، بعد جدول bible365_progress را Refresh کن.'
    };
    var en = {
      title:'Auto Save & Restore — Beta V63.41F',
      intro:'This build tracks the Bible 365 selected day live and saves it to cloud when Auto Save is enabled.',
      status:'Ready',
      enable:'Enable auto-save',
      disable:'Disable auto-save',
      autoOn:'Auto-save is ON',
      autoOff:'Auto-save is OFF',
      save:'Save now to cloud',
      restore:'Restore from cloud',
      refresh:'Refresh status',
      clear:'Clear log',
      saved:'Cloud save completed',
      restored:'Cloud restore completed',
      noClient:'No Supabase client found. Sign in through School first.',
      notSigned:'No signed-in user. Sign in through School first.',
      empty:'No cloud data yet.',
      error:'Error',
      language:'Language',
      day:'Bible 365 day',
      source:'Detected from',
      notifications:'Notifications',
      lastSync:'Last sync',
      manual:'Day to save/restore',
      help:'Test: enable Auto Save, go to Bible 365, change day, wait a few seconds, then refresh bible365_progress.'
    };
    return (L==='en'?en:fa)[k] || fa[k] || k;
  }

  function isVisible(el){
    if(!el || !el.getBoundingClientRect) return false;
    var r = el.getBoundingClientRect(), st = getComputedStyle(el);
    return r.width>0 && r.height>0 && st.display!=='none' && st.visibility!=='hidden';
  }
  function activeContent(){
    return document.querySelector('.page.active:not(#more)') || document.querySelector('#bibleReader.page.active') || document.body;
  }
  function isInsideBetaPanel(el){
    return !!(el && el.closest && el.closest('#v6341fPanel,#v6340CloudDiagnosticPanel,#v6341dCloudPanel,#v6341eCloudPanel'));
  }

  function detectFromSelects(){
    var sels = Array.prototype.slice.call(document.querySelectorAll('select')).filter(isVisible);
    for(var i=0;i<sels.length;i++){
      var sel = sels[i];
      if(isInsideBetaPanel(sel)) continue;
      var options = Array.prototype.slice.call(sel.options || []);
      var numericOptions = options.map(function(o){ return safeDay(o.value || o.textContent, 0); }).filter(function(n){return n>=1&&n<=365;});
      var context = '';
      try{ context = (sel.closest('.card,section,div')||sel).innerText || ''; }catch(e){}
      var val = sel.value || (sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].textContent) || '';
      var n = safeDay(val, 0);
      if(n>=1 && n<=365 && (numericOptions.length>50 || /365|روز|day|انتخاب|select/i.test(faNumToEn(context)))){
        return {day:n, source:'visible select'};
      }
    }
    return null;
  }

  function detectFromText(){
    var root = activeContent();
    var clone = root.cloneNode(true);
    Array.prototype.slice.call(clone.querySelectorAll('#v6341fPanel,#v6340CloudDiagnosticPanel,#v6341dCloudPanel,#v6341eCloudPanel')).forEach(function(x){x.remove();});
    var tx = faNumToEn(clone.innerText || '').replace(/\s+/g,' ');
    var patterns = [
      /روز\s*(\d{1,3})\s*از\s*365/i,
      /day\s*(\d{1,3})\s*of\s*365/i
    ];
    for(var i=0;i<patterns.length;i++){
      var m = tx.match(patterns[i]);
      if(m){
        var d = safeDay(m[1],0);
        if(d>=1 && d<=365) return {day:d, source:'visible Bible365 text'};
      }
    }
    return null;
  }

  function detectFromStorage(){
    var keys = [
      TRACK_DAY_KEY,
      'om7_bible365_selected_day_v6331',
      'om7_bible365_live_selected_day_v6329',
      'om7_bible365_view_day',
      'om7_bible365_current_day',
      'omideno7Bible365ManualDayV6325'
    ];
    for(var i=0;i<keys.length;i++){
      try{
        var n = safeDay(localStorage.getItem(keys[i]),0);
        if(n>=1 && n<=365) return {day:n, source:'storage: '+keys[i]};
      }catch(e){}
    }
    return {day:1, source:'default'};
  }

  function detectDay(){
    return detectFromSelects() || detectFromText() || detectFromStorage();
  }

  function writeDay(day, source){
    day = safeDay(day,1);
    var keys = [
      TRACK_DAY_KEY,
      'om7_bible365_current_day',
      'om7_bible365_view_day',
      'om7_bible365_selected_day_v6331',
      'om7_bible365_live_selected_day_v6329',
      'omideno7Bible365ManualDayV6325'
    ];
    keys.forEach(function(k){ try{ localStorage.setItem(k,String(day)); }catch(e){} });
    try{
      localStorage.setItem(TRACK_SOURCE_KEY, source || 'writeDay');
      localStorage.setItem('om7_bible365_started','1');
    }catch(e){}
  }

  function updateTracker(reason){
    var d = detectDay();
    if(d && d.day){
      if(d.source.indexOf('storage') !== 0 || !lastSeenDay){
        writeDay(d.day, d.source);
      }
      if(lastSeenDay && d.day !== lastSeenDay){
        log('info','Bible365 day changed: '+lastSeenDay+' → '+d.day, {source:d.source, reason:reason});
        scheduleSave('day-change');
      }
      lastSeenDay = d.day;
      refreshFields();
      return d;
    }
    return null;
  }

  function notificationState(){ try{return !!(window.Notification && Notification.permission==='granted');}catch(e){return false;} }
  function completedDays(){ return []; }

  function currentSnapshot(){
    var manual = document.getElementById('v6341fManualDay');
    var day = manual && manual.value ? safeDay(manual.value,0) : 0;
    var detected = updateTracker('snapshot') || detectDay();
    if(!day) day = detected.day;
    writeDay(day, detected.source || 'manual/panel');
    return {
      language: lang(),
      current_day: day,
      selected_day: day,
      completed_days: completedDays(),
      notifications_enabled: !!notificationState(),
      timezone: (Intl && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : null) || null,
      day_source: detected.source || 'manual/panel',
      captured_at: nowISO()
    };
  }

  function findClient(){
    if(window.OMIDENO7_V6340_BETA && typeof window.OMIDENO7_V6340_BETA.findSupabaseClient === 'function'){
      var c = window.OMIDENO7_V6340_BETA.findSupabaseClient(); if(c) return c;
    }
    var names=['omideno7Supabase','schoolSupabase','supabaseClient'];
    for(var i=0;i<names.length;i++){
      var x=window[names[i]]; if(x && x.auth && typeof x.from==='function') return x;
    }
    if(window.__om7SupabaseClients && window.__om7SupabaseClients.length) return window.__om7SupabaseClients[0];
    return null;
  }
  async function getUser(){
    var sb=findClient(); if(!sb) throw new Error(t('noClient'));
    var r=await sb.auth.getUser(); if(r.error) throw r.error;
    var user=r.data && r.data.user; if(!user) throw new Error(t('notSigned'));
    return {sb:sb,user:user};
  }

  function getLog(){ try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];} }
  function log(type,msg,details){
    var a=getLog(); a.unshift({time:nowISO(), type:type||'info', message:String(msg||''), details:details||null});
    a=a.slice(0,35); try{localStorage.setItem(LOG_KEY,JSON.stringify(a));}catch(e){}
    renderLog();
  }
  function setStatus(msg,type){
    var el=document.getElementById('v6341fStatus'); if(!el) return;
    el.className='v6341f-status '+(type||'info'); el.textContent=msg;
  }

  async function save(reason){
    var ctx=await getUser(), sb=ctx.sb, user=ctx.user, snap=currentSnapshot(), now=nowISO();
    var uid=user.id, email=user.email || null;
    var r1=await sb.from('user_profiles').upsert({user_id:uid,email:email,language:snap.language,updated_at:now},{onConflict:'user_id'});
    if(r1.error) throw r1.error;
    var r2=await sb.from('user_app_settings').upsert({user_id:uid,language:snap.language,notifications_enabled:!!snap.notifications_enabled,timezone:snap.timezone,updated_at:now},{onConflict:'user_id'});
    if(r2.error) throw r2.error;
    var r3=await sb.from('bible365_progress').upsert({user_id:uid,current_day:snap.current_day,selected_day:snap.selected_day,completed_days:snap.completed_days,last_read_at:now,updated_at:now},{onConflict:'user_id'});
    if(r3.error) throw r3.error;
    try{localStorage.setItem(LAST_SYNC_KEY, now);}catch(e){}
    log('success', t('saved')+' — '+(reason||'manual'), snap);
    setStatus(t('saved'), 'ok'); refreshFields();
  }

  async function readCloud(){
    var ctx=await getUser(), sb=ctx.sb, uid=ctx.user.id;
    var profile=await sb.from('user_profiles').select('*').eq('user_id',uid).maybeSingle(); if(profile.error) throw profile.error;
    var settings=await sb.from('user_app_settings').select('*').eq('user_id',uid).maybeSingle(); if(settings.error) throw settings.error;
    var progress=await sb.from('bible365_progress').select('*').eq('user_id',uid).maybeSingle(); if(progress.error) throw progress.error;
    return {profile:profile.data||null,settings:settings.data||null,progress:progress.data||null};
  }

  async function restore(){
    var cloud=await readCloud();
    if(!cloud.profile && !cloud.settings && !cloud.progress){ setStatus(t('empty'),'warn'); log('warn',t('empty')); return; }
    var L=(cloud.settings&&cloud.settings.language)||(cloud.profile&&cloud.profile.language);
    if(L && /^(fa|en|hr)$/.test(L)){ try{localStorage.setItem('lang',L); document.documentElement.lang=L;}catch(e){} try{ if(typeof window.setLang==='function') window.setLang(L); }catch(e){} }
    var day=cloud.progress && (cloud.progress.selected_day || cloud.progress.current_day);
    if(day){ writeDay(day,'cloud restore'); var input=document.getElementById('v6341fManualDay'); if(input) input.value=String(day); }
    try{localStorage.setItem(LAST_SYNC_KEY, nowISO());}catch(e){}
    log('success', t('restored'), cloud); setStatus(t('restored'),'ok'); refreshFields();
    try{ if(typeof window.renderBibleReader==='function') window.renderBibleReader(); if(typeof window.renderApp==='function') window.renderApp(); }catch(e){}
  }

  function autoOn(){ try{return localStorage.getItem(AUTO_KEY)==='1';}catch(e){return false;} }
  function setAuto(v){ try{localStorage.setItem(AUTO_KEY, v?'1':'0');}catch(e){} refreshFields(); if(v) scheduleSave('auto-enabled'); }
  function scheduleSave(reason){
    if(!autoOn()) return;
    if(saveTimer) clearTimeout(saveTimer);
    saveTimer=setTimeout(function(){ save(reason||'auto').catch(showError); }, 1800);
  }
  function showError(err){ var m=t('error')+': '+(err&&err.message?err.message:err); log('error',m); setStatus(m,'error'); }

  function styles(){
    if(document.getElementById('v6341fStyles')) return;
    var st=document.createElement('style'); st.id='v6341fStyles';
    st.textContent=[
      '#v6341fPanel{display:block!important;visibility:visible!important;opacity:1!important;height:auto!important;max-height:none!important;overflow:visible!important;border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f7fff8)!important;}',
      '.v6341f-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6341f-status.info{background:#eef4ff;color:#06146D}.v6341f-status.ok{background:#eaffef;color:#08751a}.v6341f-status.warn{background:#fff7df;color:#8a5a00}.v6341f-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6341f-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin:12px 0}.v6341f-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6341f-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '#v6341fManualDay{width:120px;padding:10px;border:1px solid #d8deea;border-radius:12px;font-weight:800;text-align:center}.fa #v6341fPanel{direction:rtl;text-align:right}#v6341fLog details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}'
    ].join('\n'); document.head.appendChild(st);
  }

  function panelHTML(){
    return '<div id="v6341fPanel" class="card">'+
      '<h3>'+esc(t('title'))+'</h3><p>'+esc(t('intro'))+'</p>'+
      '<div id="v6341fStatus" class="v6341f-status info">'+esc(t('status'))+'</div>'+
      '<div class="v6341f-grid">'+
        '<div><strong>'+esc(t('language'))+':</strong> <span id="v6341fLang">—</span></div>'+
        '<div><strong>'+esc(t('day'))+':</strong> <span id="v6341fDay">—</span></div>'+
        '<div><strong>'+esc(t('source'))+':</strong> <span id="v6341fSource">—</span></div>'+
        '<div><strong>'+esc(t('notifications'))+':</strong> <span id="v6341fNotifications">—</span></div>'+
        '<div><strong>'+esc(t('lastSync'))+':</strong> <span id="v6341fLastSync">—</span></div>'+
        '<div><strong id="v6341fAutoText">—</strong></div>'+
      '</div>'+
      '<label style="display:block;margin:10px 0;"><strong>'+esc(t('manual'))+': </strong><input id="v6341fManualDay" type="number" min="1" max="365"></label>'+
      '<div class="v6341f-actions">'+
        '<button type="button" class="btn primary" id="v6341fAutoBtn">'+esc(t('enable'))+'</button>'+
        '<button type="button" class="btn gold" id="v6341fSave">'+esc(t('save'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6341fRestore">'+esc(t('restore'))+'</button>'+
        '<button type="button" class="btn light" id="v6341fRefresh">'+esc(t('refresh'))+'</button>'+
        '<button type="button" class="btn light" id="v6341fClear">'+esc(t('clear'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(t('help'))+'</p><div id="v6341fLog"></div></div>';
  }

  function render(){
    styles();
    var more=document.getElementById('more'); if(!more) return;
    ['v6341dCloudPanel','v6341eCloudPanel','v6341CloudPanel'].forEach(function(id){var old=document.getElementById(id); if(old) old.style.display='none';});
    var p=document.getElementById('v6341fPanel');
    if(!p){ var footer=more.querySelector('.footer'); var w=document.createElement('div'); w.innerHTML=panelHTML(); p=w.firstElementChild; more.insertBefore(p, footer||null); }
    bind(); refresh(); renderLog(); stableVersion();
  }

  function bind(){
    function b(id,fn){ var el=document.getElementById(id); if(!el||el.dataset.b) return; el.dataset.b='1'; el.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();fn();return false;},true); }
    b('v6341fAutoBtn', function(){setAuto(!autoOn());});
    b('v6341fSave', function(){save('manual').catch(showError);});
    b('v6341fRestore', function(){restore().catch(showError);});
    b('v6341fRefresh', refresh);
    b('v6341fClear', function(){localStorage.removeItem(LOG_KEY); renderLog(); setStatus(t('status'),'info');});
    var inp=document.getElementById('v6341fManualDay');
    if(inp && !inp.dataset.b){ inp.dataset.b='1'; inp.addEventListener('change',function(){ writeDay(inp.value,'manual input'); scheduleSave('manual-day-input'); refresh(); },true); }
  }

  function refresh(){
    var d=updateTracker('refresh') || detectDay();
    var set=function(id,v){var el=document.getElementById(id); if(el) el.textContent=v;};
    set('v6341fLang', lang()); set('v6341fDay', String(d.day)); set('v6341fSource', d.source);
    set('v6341fNotifications', String(notificationState())); set('v6341fLastSync', localStorage.getItem(LAST_SYNC_KEY)||'—');
    var inp=document.getElementById('v6341fManualDay'); if(inp && (!inp.value || safeDay(inp.value,0)!==d.day)) inp.value=String(d.day);
    var on=autoOn(); var tx=document.getElementById('v6341fAutoText'); if(tx) tx.textContent=on?t('autoOn'):t('autoOff');
    var btn=document.getElementById('v6341fAutoBtn'); if(btn){ btn.textContent=on?t('disable'):t('enable'); btn.className='btn '+(on?'light':'primary'); }
    bind();
  }

  function renderLog(){
    var box=document.getElementById('v6341fLog'); if(!box) return;
    var a=getLog(); if(!a.length){box.innerHTML=''; return;}
    box.innerHTML=a.map(function(x){return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary><pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details||{},null,2))+'</pre></details>';}).join('');
  }

  function stableVersion(){
    try{
      window.APP_VERSION=VERSION; window.OMIDENO7_APP_VERSION=VERSION;
      Array.prototype.slice.call(document.querySelectorAll('header,.app-header,.footer,.app-version,#appVersion,small,span,div,p,b')).forEach(function(el){
        var txt=(el.textContent||'').trim();
        if((/App\s*Version\s*:\s*V/i.test(txt)||/نسخه|ورژن/i.test(txt)) && txt.length<140 && el.children.length<3) el.textContent=FULL;
      });
      var h=document.querySelector('.app-header')||document.querySelector('header');
      if(h){ var badge=document.getElementById('v6341fHeaderVersion'); if(!badge){ badge=document.createElement('div'); badge.id='v6341fHeaderVersion'; badge.style.cssText='position:absolute;left:50%;transform:translateX(-50%);top:8px;color:#fff;font-weight:800;font-size:14px;z-index:50;pointer-events:none;'; h.style.position=h.style.position||'relative'; h.appendChild(badge); } badge.textContent=FULL; }
    }catch(e){}
  }

  function watchers(){
    if(window.__om7v6341fWatch) return; window.__om7v6341fWatch=true;
    document.addEventListener('change',function(){ var old=lastSeenDay; var d=updateTracker('change'); if(d && old && d.day!==old) scheduleSave('change'); setTimeout(render,100); },true);
    document.addEventListener('click',function(){ setTimeout(function(){ var old=lastSeenDay; var d=updateTracker('click'); if(d && old && d.day!==old) scheduleSave('click'); render(); },500); },true);
    try{ new MutationObserver(function(){ setTimeout(function(){ var old=lastSeenDay; var d=updateTracker('mutation'); if(d && old && d.day!==old) scheduleSave('mutation'); },700); }).observe(document.body,{childList:true,subtree:true,characterData:true}); }catch(e){}
    window.addEventListener('online',function(){scheduleSave('online');});
  }

  document.addEventListener('DOMContentLoaded',function(){render();watchers();});
  window.addEventListener('load',function(){render();watchers(); if(autoOn()) scheduleSave('load');});
  setInterval(function(){ updateTracker('interval'); render(); stableVersion(); },2000);
  setTimeout(render,300); setTimeout(render,1200); setTimeout(render,2500);

  window.OMIDENO7_V6341F_BETA={save:save, restore:restore, snapshot:currentSnapshot, detectDay:detectDay, version:VERSION};
})();
