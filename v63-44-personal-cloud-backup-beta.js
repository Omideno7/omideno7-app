/* Omideno7 V63.44 — Personal Cloud Backup Beta
   Beta-only. Does not affect public index.html.

   Bigger step:
   - Backs up user personal app data from localStorage to Supabase.
   - Includes My Notes, Saved Verses, highlights, language/settings, Bible365 progress, and school/offline local queues when detectable.
   - Restores those keys from cloud in Beta.
   - Adds local offline queue if user is offline.
   - No public user-facing test buttons in stable release later.
*/
(function(){
  'use strict';

  var VERSION = 'V63.44 Personal Cloud Backup Beta';
  var BACKUP_TABLE = 'user_app_backups';
  var LOG_KEY = 'omideno7_v6344_backup_log';
  var AUTO_KEY = 'omideno7_v6344_auto_backup';
  var LAST_SYNC_KEY = 'omideno7_v6344_last_sync';
  var OFFLINE_QUEUE_KEY = 'omideno7_v6344_offline_backup_queue';
  var autoTimer = null;

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
    catch(e){ return 'fa'; }
  }

  function tr(k){
    var fa = {
      title:'پشتیبان‌گیری کل اطلاعات شخصی — Beta V63.44',
      intro:'این مرحله بزرگ‌تر است: یادداشت‌های من، آیه‌های ذخیره‌شده، هایلایت‌ها، تنظیمات، پیشرفت ۳۶۵، و داده‌های مدرسه/آفلاینِ قابل شناسایی را برای کاربر در کلود ذخیره می‌کند.',
      warning:'این پنل فقط برای تست Beta است. در نسخه اصلی، همه چیز خودکار و بدون این دکمه‌ها انجام می‌شود.',
      scan:'بررسی اطلاعات قابل پشتیبان‌گیری',
      backup:'ذخیره پشتیبان در کلود',
      restore:'بازیابی از کلود',
      autoOn:'روشن کردن پشتیبان‌گیری خودکار',
      autoOff:'خاموش کردن پشتیبان‌گیری خودکار',
      queue:'ارسال صف آفلاین پشتیبان',
      clearLog:'پاک کردن گزارش',
      status:'آماده تست پشتیبان‌گیری',
      scanned:'اطلاعات قابل پشتیبان‌گیری بررسی شد',
      backed:'پشتیبان در کلود ذخیره شد',
      restored:'بازیابی از کلود انجام شد',
      queued:'به صف آفلاین پشتیبان اضافه شد',
      queueSynced:'صف آفلاین پشتیبان ارسال شد',
      noBackup:'هنوز پشتیبانی در کلود پیدا نشد',
      error:'خطا',
      keys:'کلیدهای ذخیره‌شده',
      size:'حجم تقریبی',
      categories:'دسته‌ها',
      last:'آخرین همگام‌سازی',
      auto:'وضعیت خودکار',
      online:'اینترنت',
      offlineQueue:'صف آفلاین',
      enabled:'روشن',
      disabled:'خاموش',
      help:'تست: اول «بررسی اطلاعات» را بزن. بعد «ذخیره پشتیبان در کلود» را بزن. سپس Supabase جدول user_app_backups را Refresh کن. برای بازیابی، مقدار یک یادداشت یا روز را تغییر بده و «بازیابی از کلود» را تست کن.',
      restoreWarn:'بازیابی، کلیدهای ذخیره‌شده اپ را در همین دستگاه جایگزین/به‌روزرسانی می‌کند. برای Beta است.'
    };
    var en = {
      title:'Full Personal Cloud Backup — Beta V63.44',
      intro:'Bigger step: backs up My Notes, saved verses, highlights, settings, Bible365 progress, and detectable school/offline data to the user’s cloud.',
      warning:'This panel is Beta-only. In the stable release, this will run automatically without test buttons.',
      scan:'Scan backup data',
      backup:'Save backup to cloud',
      restore:'Restore from cloud',
      autoOn:'Enable auto backup',
      autoOff:'Disable auto backup',
      queue:'Sync offline backup queue',
      clearLog:'Clear log',
      status:'Ready to test backup',
      scanned:'Backup data scanned',
      backed:'Cloud backup saved',
      restored:'Cloud restore completed',
      queued:'Added to offline backup queue',
      queueSynced:'Offline backup queue synced',
      noBackup:'No cloud backup found yet',
      error:'Error',
      keys:'Saved keys',
      size:'Approx. size',
      categories:'Categories',
      last:'Last sync',
      auto:'Auto status',
      online:'Network',
      offlineQueue:'Offline queue',
      enabled:'ON',
      disabled:'OFF',
      help:'Test: press Scan first, then Save backup to cloud. Refresh Supabase table user_app_backups. To test restore, change a note/day locally and press Restore.',
      restoreWarn:'Restore updates/replaces saved app keys on this device. Beta only.'
    };
    var hr = {
      title:'Puna osobna cloud sigurnosna kopija — Beta V63.44',
      intro:'Veći korak: sprema bilješke, spremljene stihove, oznake, postavke, Bible365 napredak i školske/offline podatke u cloud korisnika.',
      warning:'Ovaj panel je samo za Beta test. U javnoj verziji sve će raditi automatski bez test gumba.',
      scan:'Provjeri podatke za backup',
      backup:'Spremi backup u cloud',
      restore:'Vrati iz clouda',
      autoOn:'Uključi automatski backup',
      autoOff:'Isključi automatski backup',
      queue:'Sinkroniziraj offline backup red',
      clearLog:'Obriši zapis',
      status:'Spremno za test backupa',
      scanned:'Podaci za backup su provjereni',
      backed:'Cloud backup spremljen',
      restored:'Vraćanje iz clouda završeno',
      queued:'Dodano u offline backup red',
      queueSynced:'Offline backup red sinkroniziran',
      noBackup:'Još nema cloud backupa',
      error:'Greška',
      keys:'Spremljeni ključevi',
      size:'Približna veličina',
      categories:'Kategorije',
      last:'Zadnja sinkronizacija',
      auto:'Automatski status',
      online:'Mreža',
      offlineQueue:'Offline red',
      enabled:'UKLJUČENO',
      disabled:'ISKLJUČENO',
      help:'Test: prvo provjerite podatke, zatim spremite backup u cloud. Osvježite Supabase tablicu user_app_backups.',
      restoreWarn:'Vraćanje ažurira/zamjenjuje spremljene app ključeve na ovom uređaju. Samo Beta.'
    };
    return (lang()==='hr'?hr:(lang()==='en'?en:fa))[k] || fa[k] || k;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function now(){ return new Date().toISOString(); }

  function log(type, msg, details){
    var arr=[];
    try{arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){arr=[];}
    arr.unshift({time:now(), type:type||'info', message:String(msg||''), details:details||null});
    arr=arr.slice(0,40);
    try{localStorage.setItem(LOG_KEY, JSON.stringify(arr));}catch(e){}
    renderLog();
  }
  function getLog(){ try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];} }

  function status(msg,type){
    var el=document.getElementById('v6344Status');
    if(!el) return;
    el.className='v6344-status '+(type||'info');
    el.textContent=msg;
  }

  function isForbiddenKey(key){
    key = String(key || '').toLowerCase();
    // Do not back up auth/session tokens or secrets.
    return /supabase\.auth|sb-|auth-token|access_token|refresh_token|jwt|service_role|apikey|api_key|onesignal|password|secret|token/i.test(key);
  }

  function categoryForKey(key){
    key = String(key || '').toLowerCase();
    if(/note|notes|یادداشت|my-notes|mynotes/.test(key)) return 'notes';
    if(/saved.*verse|verse.*saved|favorite|bookmark|bookmarks|آیه|aye|ayat|verse/.test(key)) return 'saved_verses';
    if(/highlight|mark|underline/.test(key)) return 'highlights';
    if(/bible365|365|reading.*plan|plan.*reading/.test(key)) return 'bible365';
    if(/school|student|lesson|homework|assignment|exam|کلاس|درس|مدرسه/.test(key)) return 'school';
    if(/lang|language|setting|theme|notification|timezone/.test(key)) return 'settings';
    if(/offline|queue|sync/.test(key)) return 'offline';
    if(/declaration|prayer|daily|word|ror|fasting/.test(key)) return 'content_state';
    return 'other';
  }

  function shouldBackupKey(key, value){
    if(!key || isForbiddenKey(key)) return false;
    if(value == null) return false;
    var k = String(key).toLowerCase();

    // Include obvious app data keys.
    if(/omideno7|om7_|bible|verse|note|saved|highlight|school|student|lesson|homework|assignment|exam|lang|language|setting|notification|reading|plan|daily|word|declaration|prayer|fasting|offline|queue/.test(k)){
      return true;
    }

    // Include short app-looking keys but avoid browser/vendor internals.
    if(/^(lang|theme|notes|savedVerses|myNotes|bookmarks|highlights)$/.test(key)) return true;

    return false;
  }

  function parseMaybe(value){
    if(typeof value !== 'string') return value;
    try { return JSON.parse(value); } catch(e){ return value; }
  }

  function scanBackup(){
    var items = {};
    var categories = {};
    var totalSize = 0;
    var keys = [];

    try{
      for(var i=0;i<localStorage.length;i++){
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        if(!shouldBackupKey(key,value)) continue;
        var cat = categoryForKey(key);
        items[key] = {
          category:cat,
          value:value,
          parsed:parseMaybe(value),
          length:String(value||'').length
        };
        categories[cat] = (categories[cat] || 0) + 1;
        totalSize += String(value||'').length;
        keys.push(key);
      }
    }catch(e){}

    // Add live snapshots from known beta modules if present.
    try{
      if(window.OMIDENO7_V6341G_BETA && typeof window.OMIDENO7_V6341G_BETA.snapshot === 'function'){
        items['__live_bible365_snapshot'] = {category:'bible365', value:JSON.stringify(window.OMIDENO7_V6341G_BETA.snapshot()), parsed:window.OMIDENO7_V6341G_BETA.snapshot(), length:0};
        categories['bible365'] = (categories['bible365'] || 0) + 1;
      }
    }catch(e){}
    try{
      if(window.OMIDENO7_V6343_SCHOOL_OFFLINE && typeof window.OMIDENO7_V6343_SCHOOL_OFFLINE.getLessons === 'function'){
        var lessons = window.OMIDENO7_V6343_SCHOOL_OFFLINE.getLessons();
        items['__offline_school_lessons_v6343'] = {category:'school', value:JSON.stringify(lessons), parsed:lessons, length:JSON.stringify(lessons).length};
        categories['school'] = (categories['school'] || 0) + 1;
      }
    }catch(e){}

    var payload = {
      version:VERSION,
      backup_type:'personal_app_data',
      created_at:now(),
      language:lang(),
      online:navigator.onLine,
      origin:location.origin,
      path:location.pathname,
      keys:keys,
      categories:categories,
      total_size:totalSize,
      items:items
    };

    try{ localStorage.setItem('omideno7_v6344_last_scan', JSON.stringify({time:now(), keys:keys.length, categories:categories, total_size:totalSize})); }catch(e){}
    log('info', tr('scanned'), {keys:keys.length, categories:categories, totalSize:totalSize});
    status(tr('scanned')+': '+keys.length, 'ok');
    renderFields(payload);
    return payload;
  }

  function findClient(){
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

  async function userCtx(){
    var sb = findClient();
    if(!sb) throw new Error('Supabase client not found');
    var res = await sb.auth.getUser();
    if(res.error) throw res.error;
    var user = res.data && res.data.user;
    if(!user) throw new Error('User is not signed in');
    return {sb:sb,user:user};
  }

  function getOfflineQueue(){
    try{return JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY)||'[]');}catch(e){return[];}
  }
  function setOfflineQueue(q){
    try{localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(q||[]));}catch(e){}
  }

  async function backupToCloud(reason){
    var payload = scanBackup();

    if(!navigator.onLine){
      var q = getOfflineQueue();
      q.push({id:'backup-'+Date.now(), status:'pending', created_at:now(), payload:payload});
      setOfflineQueue(q);
      status(tr('queued'), 'warn');
      log('warn', tr('queued'), {reason:reason, keys:payload.keys.length});
      renderFields(payload);
      return;
    }

    var ctx = await userCtx();
    var sb = ctx.sb, user = ctx.user;
    var res = await sb.from(BACKUP_TABLE).upsert({
      user_id:user.id,
      backup_type:'personal_app_data',
      payload:payload,
      key_count:payload.keys.length,
      total_size:payload.total_size,
      updated_at:now()
    }, {onConflict:'user_id,backup_type'});
    if(res.error) throw res.error;

    try{localStorage.setItem(LAST_SYNC_KEY, now());}catch(e){}
    status(tr('backed'), 'ok');
    log('success', tr('backed'), {reason:reason, keys:payload.keys.length, categories:payload.categories});
    renderFields(payload);
  }

  async function restoreFromCloud(){
    var ctx = await userCtx();
    var sb = ctx.sb, user = ctx.user;
    var res = await sb.from(BACKUP_TABLE).select('*').eq('user_id', user.id).eq('backup_type','personal_app_data').maybeSingle();
    if(res.error) throw res.error;
    if(!res.data || !res.data.payload){
      status(tr('noBackup'), 'warn');
      log('warn', tr('noBackup'));
      return;
    }

    var payload = res.data.payload;
    var items = payload.items || {};
    var restored = 0;
    Object.keys(items).forEach(function(key){
      if(/^__/.test(key)) return;
      if(isForbiddenKey(key)) return;
      var item = items[key];
      var value = item && typeof item.value !== 'undefined' ? item.value : null;
      if(value == null) return;
      try{
        localStorage.setItem(key, String(value));
        restored++;
      }catch(e){}
    });

    try{localStorage.setItem(LAST_SYNC_KEY, now());}catch(e){}
    status(tr('restored')+': '+restored, 'ok');
    log('success', tr('restored'), {restored:restored, cloudUpdatedAt:res.data.updated_at});

    try{
      if(typeof window.renderApp === 'function') window.renderApp();
      if(typeof window.renderBibleReader === 'function') window.renderBibleReader();
    }catch(e){}
    renderFields(payload);
  }

  async function syncOfflineQueue(){
    var q = getOfflineQueue();
    var pending = q.filter(function(x){return x.status==='pending';});
    if(!pending.length){
      status(tr('queueSynced')+': 0', 'ok');
      return;
    }
    if(!navigator.onLine) throw new Error('Offline');

    var ctx = await userCtx();
    var sb = ctx.sb, user = ctx.user;
    var count = 0;
    for(var i=0;i<pending.length;i++){
      var item = pending[i];
      var payload = item.payload || scanBackup();
      var res = await sb.from(BACKUP_TABLE).upsert({
        user_id:user.id,
        backup_type:'personal_app_data',
        payload:payload,
        key_count:payload.keys ? payload.keys.length : 0,
        total_size:payload.total_size || 0,
        updated_at:now()
      }, {onConflict:'user_id,backup_type'});
      if(res.error) throw res.error;
      item.status = 'synced';
      item.synced_at = now();
      count++;
    }
    setOfflineQueue(q);
    try{localStorage.setItem(LAST_SYNC_KEY, now());}catch(e){}
    status(tr('queueSynced')+': '+count, 'ok');
    log('success', tr('queueSynced'), {synced:count});
    renderFields();
  }

  function autoEnabled(){
    try{return localStorage.getItem(AUTO_KEY)==='1';}catch(e){return false;}
  }
  function setAuto(v){
    try{localStorage.setItem(AUTO_KEY, v?'1':'0');}catch(e){}
    renderFields();
    if(v) scheduleAuto('enabled');
  }
  function scheduleAuto(reason){
    if(!autoEnabled()) return;
    if(autoTimer) clearTimeout(autoTimer);
    autoTimer = setTimeout(function(){
      backupToCloud(reason || 'auto').catch(showError);
    }, 2500);
  }

  function css(){
    if(document.getElementById('v6344Css')) return;
    var st=document.createElement('style');
    st.id='v6344Css';
    st.textContent=[
      '#v6344BackupPanel{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;display:block!important;visibility:visible!important;opacity:1!important;}',
      '.v6344-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6344-status.info{background:#eef4ff;color:#06146D}.v6344-status.ok{background:#eaffef;color:#08751a}.v6344-status.warn{background:#fff7df;color:#8a5a00}.v6344-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6344-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6344-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6344-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '#v6344Log details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6344BackupPanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function html(){
    return '<div id="v6344BackupPanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<p class="v6344-status warn">'+esc(tr('warning'))+'</p>'+
      '<div id="v6344Status" class="v6344-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6344-grid">'+
        '<div><strong>'+esc(tr('online'))+':</strong> <span id="v6344Online">—</span></div>'+
        '<div><strong>'+esc(tr('keys'))+':</strong> <span id="v6344Keys">—</span></div>'+
        '<div><strong>'+esc(tr('size'))+':</strong> <span id="v6344Size">—</span></div>'+
        '<div><strong>'+esc(tr('categories'))+':</strong> <span id="v6344Categories">—</span></div>'+
        '<div><strong>'+esc(tr('last'))+':</strong> <span id="v6344Last">—</span></div>'+
        '<div><strong>'+esc(tr('offlineQueue'))+':</strong> <span id="v6344Queue">—</span></div>'+
        '<div><strong>'+esc(tr('auto'))+':</strong> <span id="v6344Auto">—</span></div>'+
      '</div>'+
      '<div class="v6344-actions">'+
        '<button type="button" class="btn secondary" id="v6344Scan">'+esc(tr('scan'))+'</button>'+
        '<button type="button" class="btn gold" id="v6344Backup">'+esc(tr('backup'))+'</button>'+
        '<button type="button" class="btn primary" id="v6344Restore">'+esc(tr('restore'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6344AutoBtn">'+esc(tr('autoOn'))+'</button>'+
        '<button type="button" class="btn primary" id="v6344QueueBtn">'+esc(tr('queue'))+'</button>'+
        '<button type="button" class="btn light" id="v6344ClearLog">'+esc(tr('clearLog'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(tr('help'))+'</p>'+
      '<p class="small"><strong>'+esc(tr('restoreWarn'))+'</strong></p>'+
      '<div id="v6344Log"></div>'+
    '</div>';
  }

  function renderPanel(){
    css();
    var more = document.getElementById('more');
    if(!more) return;
    var p=document.getElementById('v6344BackupPanel');
    if(!p){
      var footer=more.querySelector('.footer');
      var wrap=document.createElement('div');
      wrap.innerHTML=html();
      p=wrap.firstElementChild;
      more.insertBefore(p, footer || null);
    }
    bind();
    renderFields();
    renderLog();
  }

  function bind(){
    function b(id,fn){
      var el=document.getElementById(id);
      if(!el || el.dataset.v6344Bound) return;
      el.dataset.v6344Bound='1';
      el.addEventListener('click', function(ev){
        ev.preventDefault(); ev.stopPropagation();
        fn();
        return false;
      }, true);
    }
    b('v6344Scan', scanBackup);
    b('v6344Backup', function(){ backupToCloud('manual').catch(showError); });
    b('v6344Restore', function(){ restoreFromCloud().catch(showError); });
    b('v6344AutoBtn', function(){ setAuto(!autoEnabled()); });
    b('v6344QueueBtn', function(){ syncOfflineQueue().catch(showError); });
    b('v6344ClearLog', function(){ localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); });
  }

  function showError(e){
    var msg=tr('error')+': '+(e && e.message ? e.message : e);
    status(msg,'error');
    log('error', msg);
  }

  function renderFields(payload){
    var q=getOfflineQueue();
    var scan=null;
    try{scan=JSON.parse(localStorage.getItem('omideno7_v6344_last_scan')||'null');}catch(e){}
    var set=function(id,v){var el=document.getElementById(id); if(el) el.textContent=v;};
    set('v6344Online', navigator.onLine ? 'online' : 'offline');
    set('v6344Keys', payload ? payload.keys.length : (scan ? scan.keys : '—'));
    set('v6344Size', payload ? payload.total_size+' chars' : (scan ? scan.total_size+' chars' : '—'));
    set('v6344Categories', payload ? Object.keys(payload.categories||{}).join(', ') : (scan && scan.categories ? Object.keys(scan.categories).join(', ') : '—'));
    set('v6344Last', localStorage.getItem(LAST_SYNC_KEY) || '—');
    set('v6344Queue', q.filter(function(x){return x.status==='pending';}).length+' pending / '+q.length+' total');
    set('v6344Auto', autoEnabled() ? tr('enabled') : tr('disabled'));
    var btn=document.getElementById('v6344AutoBtn');
    if(btn){
      btn.textContent = autoEnabled() ? tr('autoOff') : tr('autoOn');
      btn.className = 'btn ' + (autoEnabled() ? 'light' : 'secondary');
    }
  }

  function renderLog(){
    var box=document.getElementById('v6344Log');
    if(!box) return;
    var arr=getLog();
    if(!arr.length){box.innerHTML=''; return;}
    box.innerHTML=arr.map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details||{},null,2))+'</pre></details>';
    }).join('');
  }

  function installWatchers(){
    if(window.__omideno7V6344Watch) return;
    window.__omideno7V6344Watch=true;
    document.addEventListener('change', function(){ scheduleAuto('change'); setTimeout(renderFields,200); }, true);
    document.addEventListener('click', function(){ setTimeout(function(){ scheduleAuto('click'); renderPanel(); },800); }, true);
    window.addEventListener('online', function(){ syncOfflineQueue().catch(function(){}); scheduleAuto('online'); renderFields(); });
    window.addEventListener('offline', renderFields);
  }

  document.addEventListener('DOMContentLoaded', function(){ renderPanel(); installWatchers(); });
  window.addEventListener('load', function(){ renderPanel(); installWatchers(); if(autoEnabled()) scheduleAuto('load'); });
  setInterval(function(){ renderPanel(); }, 4000);
  setTimeout(renderPanel, 700);
  setTimeout(renderPanel, 2200);

  window.OMIDENO7_V6344_BACKUP_BETA = {
    scanBackup:scanBackup,
    backupToCloud:backupToCloud,
    restoreFromCloud:restoreFromCloud,
    syncOfflineQueue:syncOfflineQueue,
    version:VERSION
  };
})();
