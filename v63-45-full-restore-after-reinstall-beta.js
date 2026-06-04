/* Omideno7 V63.45 — Full Restore After Reinstall Beta
   Beta-only. Does not affect public index.html.

   Goal:
   - Simulate "new phone / reinstall" restore flow safely.
   - Check if cloud backup exists for signed-in user.
   - Restore saved localStorage app data from user_app_backups.
   - Optional "safe test mode" clears only app-owned keys, not auth tokens, then restores from cloud.
*/
(function(){
  'use strict';

  var VERSION = 'V63.45 Full Restore After Reinstall Beta';
  var TABLE = 'user_app_backups';
  var LOG_KEY = 'omideno7_v6345_restore_log';
  var LAST_CHECK_KEY = 'omideno7_v6345_last_backup_check';
  var LAST_RESTORE_KEY = 'omideno7_v6345_last_restore';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
    catch(e){ return 'fa'; }
  }

  function tr(k){
    var fa = {
      title:'بازیابی کامل بعد از نصب مجدد — Beta V63.45',
      intro:'این مرحله تست می‌کند که اگر کاربر اپ را پاک کند یا روی دستگاه جدید وارد شود، اطلاعات ذخیره‌شده‌اش از کلود برگردد.',
      warning:'این پنل فقط برای تست Beta است. در نسخه اصلی، بعد از ورود کاربر، اپ خودش پشتیبان را پیدا می‌کند و بازیابی را ساده و امن انجام می‌دهد.',
      check:'بررسی وجود پشتیبان در کلود',
      restore:'بازیابی کامل اطلاعات من',
      simulate:'شبیه‌سازی نصب مجدد + بازیابی',
      backupNow:'اول پشتیبان جدید بگیر',
      clearLog:'پاک کردن گزارش',
      status:'آماده تست بازیابی',
      checking:'در حال بررسی پشتیبان...',
      found:'پشتیبان در کلود پیدا شد',
      notFound:'پشتیبانی در کلود پیدا نشد',
      restoring:'در حال بازیابی...',
      restored:'بازیابی انجام شد',
      simulated:'شبیه‌سازی نصب مجدد و بازیابی انجام شد',
      backed:'پشتیبان جدید ذخیره شد',
      error:'خطا',
      user:'کاربر',
      backup:'پشتیبان',
      keys:'کلیدها',
      size:'حجم',
      updated:'آخرین ذخیره کلود',
      restoredKeys:'کلیدهای بازیابی‌شده',
      skippedKeys:'کلیدهای ردشده',
      lastRestore:'آخرین بازیابی',
      help:'تست ایمن: اول «بررسی وجود پشتیبان» را بزن. اگر سبز شد، «بازیابی کامل اطلاعات من» را بزن. برای تست واقعی‌تر، «شبیه‌سازی نصب مجدد + بازیابی» فقط کلیدهای اپ را پاک می‌کند و بعد از کلود برمی‌گرداند؛ لاگین و توکن‌های حساس را پاک نمی‌کند.',
      simulateWarn:'شبیه‌سازی، کلیدهای اپ را روی همین دستگاه پاک می‌کند و بعد از کلود برمی‌گرداند. فقط در Beta استفاده کن.'
    };
    var en = {
      title:'Full Restore After Reinstall — Beta V63.45',
      intro:'Tests whether a user can recover their saved cloud data after reinstalling the app or using a new device.',
      warning:'Beta-only panel. In stable release, the app will detect backup after sign-in and restore with a simple safe flow.',
      check:'Check cloud backup',
      restore:'Restore all my data',
      simulate:'Simulate reinstall + restore',
      backupNow:'Create fresh backup first',
      clearLog:'Clear log',
      status:'Ready to test restore',
      checking:'Checking backup...',
      found:'Cloud backup found',
      notFound:'No cloud backup found',
      restoring:'Restoring...',
      restored:'Restore completed',
      simulated:'Reinstall simulation and restore completed',
      backed:'Fresh backup saved',
      error:'Error',
      user:'User',
      backup:'Backup',
      keys:'Keys',
      size:'Size',
      updated:'Cloud updated',
      restoredKeys:'Restored keys',
      skippedKeys:'Skipped keys',
      lastRestore:'Last restore',
      help:'Safe test: press Check cloud backup first. If green, press Restore all my data. For a stronger test, Simulate reinstall only clears app-owned keys and restores from cloud; it does not delete auth/session tokens.',
      simulateWarn:'Simulation clears app-owned keys on this device and restores from cloud. Beta only.'
    };
    return (lang()==='en'?en:fa)[k] || fa[k] || k;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function now(){ return new Date().toISOString(); }

  function log(type,msg,details){
    var arr=[];
    try{arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){arr=[];}
    arr.unshift({time:now(), type:type||'info', message:String(msg||''), details:details||null});
    arr=arr.slice(0,50);
    try{localStorage.setItem(LOG_KEY, JSON.stringify(arr));}catch(e){}
    renderLog();
  }
  function getLog(){ try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];} }

  function status(msg,type){
    var el=document.getElementById('v6345Status');
    if(!el) return;
    el.className='v6345-status '+(type||'info');
    el.textContent=msg;
  }

  function forbidden(key){
    key=String(key||'').toLowerCase();
    return /supabase\.auth|sb-|auth-token|access_token|refresh_token|jwt|service_role|apikey|api_key|onesignal|password|secret|token/i.test(key);
  }
  function appOwnedKey(key){
    key=String(key||'');
    if(forbidden(key)) return false;
    var k=key.toLowerCase();
    return /omideno7|om7_|bible|verse|note|saved|highlight|school|student|lesson|homework|assignment|exam|lang|language|setting|notification|reading|plan|daily|word|declaration|prayer|fasting|offline|queue/.test(k) ||
           /^(lang|theme|notes|savedVerses|myNotes|bookmarks|highlights)$/.test(key);
  }

  function findClient(){
    if(window.OMIDENO7_V6340_BETA && typeof window.OMIDENO7_V6340_BETA.findSupabaseClient === 'function'){
      var c=window.OMIDENO7_V6340_BETA.findSupabaseClient();
      if(c) return c;
    }
    var names=['omideno7Supabase','schoolSupabase','supabaseClient'];
    for(var i=0;i<names.length;i++){
      var x=window[names[i]];
      if(x && x.auth && typeof x.from === 'function') return x;
    }
    if(window.__om7SupabaseClients && window.__om7SupabaseClients.length) return window.__om7SupabaseClients[0];
    return null;
  }

  async function getCtx(){
    var sb=findClient();
    if(!sb) throw new Error('Supabase client not found. Open/login School once, then return to More.');
    var r=await sb.auth.getUser();
    if(r.error) throw r.error;
    var u=r.data && r.data.user;
    if(!u) throw new Error('User is not signed in. Login as student first.');
    return {sb:sb,user:u};
  }

  async function getCloudBackup(){
    var ctx=await getCtx();
    var res=await ctx.sb.from(TABLE).select('*').eq('user_id',ctx.user.id).eq('backup_type','personal_app_data').maybeSingle();
    if(res.error) throw res.error;
    return {ctx:ctx, row:res.data || null};
  }

  function backupStats(row){
    var payload = row && row.payload || {};
    var items = payload.items || {};
    return {
      keyCount: row && (row.key_count || Object.keys(items).length) || 0,
      totalSize: row && (row.total_size || payload.total_size || 0) || 0,
      updatedAt: row && row.updated_at || '—',
      categories: payload.categories || {},
      items: items
    };
  }

  async function checkBackup(){
    status(tr('checking'), 'info');
    var out=await getCloudBackup();
    if(!out.row){
      status(tr('notFound'), 'warn');
      log('warn', tr('notFound'), {user:out.ctx.user.email || out.ctx.user.id});
      renderFields(null, out.ctx.user);
      return null;
    }
    var st=backupStats(out.row);
    try{localStorage.setItem(LAST_CHECK_KEY, JSON.stringify({time:now(), keyCount:st.keyCount, updatedAt:st.updatedAt}));}catch(e){}
    status(tr('found')+' — '+st.keyCount, 'ok');
    log('success', tr('found'), {user:out.ctx.user.email || out.ctx.user.id, stats:st});
    renderFields(out.row, out.ctx.user);
    return out;
  }

  function applyBackup(row){
    var st=backupStats(row);
    var restored=0, skipped=0, errors=0;
    Object.keys(st.items).forEach(function(key){
      if(/^__/.test(key) || forbidden(key)){
        skipped++;
        return;
      }
      var item=st.items[key];
      if(!item || typeof item.value === 'undefined' || item.value == null){
        skipped++;
        return;
      }
      try{
        localStorage.setItem(key, String(item.value));
        restored++;
      }catch(e){
        errors++;
      }
    });
    try{localStorage.setItem(LAST_RESTORE_KEY, JSON.stringify({time:now(), restored:restored, skipped:skipped, errors:errors}));}catch(e){}
    return {restored:restored, skipped:skipped, errors:errors};
  }

  async function restoreAll(){
    status(tr('restoring'), 'info');
    var out=await getCloudBackup();
    if(!out.row){
      status(tr('notFound'), 'warn');
      log('warn', tr('notFound'));
      return;
    }
    var result=applyBackup(out.row);
    status(tr('restored')+' — '+result.restored, 'ok');
    log('success', tr('restored'), result);
    afterRestoreRefresh();
    renderFields(out.row, out.ctx.user);
  }

  function clearAppOwnedLocalKeys(){
    var removed=[];
    try{
      var keys=[];
      for(var i=0;i<localStorage.length;i++) keys.push(localStorage.key(i));
      keys.forEach(function(key){
        if(appOwnedKey(key) && key !== LOG_KEY && key !== LAST_CHECK_KEY && key !== LAST_RESTORE_KEY){
          localStorage.removeItem(key);
          removed.push(key);
        }
      });
    }catch(e){}
    return removed;
  }

  async function simulateReinstallRestore(){
    status(tr('restoring'), 'info');
    var out=await getCloudBackup();
    if(!out.row){
      status(tr('notFound'), 'warn');
      log('warn', tr('notFound'));
      return;
    }
    var removed=clearAppOwnedLocalKeys();
    var result=applyBackup(out.row);
    status(tr('simulated')+' — '+result.restored, 'ok');
    log('success', tr('simulated'), {removed:removed.length, restored:result.restored, skipped:result.skipped, errors:result.errors});
    afterRestoreRefresh();
    renderFields(out.row, out.ctx.user);
  }

  async function backupNow(){
    if(window.OMIDENO7_V6344C_BACKUP_BETA && typeof window.OMIDENO7_V6344C_BACKUP_BETA.saveCloud === 'function'){
      await window.OMIDENO7_V6344C_BACKUP_BETA.saveCloud();
      status(tr('backed'), 'ok');
      log('success', tr('backed'), {source:'V6344C'});
      return;
    }
    throw new Error('V63.44c backup function not found.');
  }

  function afterRestoreRefresh(){
    try{
      if(typeof window.renderApp === 'function') window.renderApp();
      if(typeof window.renderBibleReader === 'function') window.renderBibleReader();
      if(typeof window.renderDailyWord === 'function') window.renderDailyWord();
    }catch(e){}
  }

  function showError(e){
    var msg=tr('error')+': '+(e && e.message ? e.message : e);
    status(msg, 'error');
    log('error', msg, {stack:e && e.stack});
  }

  function css(){
    if(document.getElementById('v6345Css')) return;
    var st=document.createElement('style');
    st.id='v6345Css';
    st.textContent=[
      '#v6345RestorePanel{border-top:5px solid #0B62FF!important;background:linear-gradient(160deg,#fff,#f4f8ff)!important;display:block!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:20!important;}',
      '.v6345-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6345-status.info{background:#eef4ff;color:#06146D}.v6345-status.ok{background:#eaffef;color:#08751a}.v6345-status.warn{background:#fff7df;color:#8a5a00}.v6345-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6345-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6345-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6345-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '#v6345Log details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6345RestorePanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function html(){
    return '<div id="v6345RestorePanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<p class="v6345-status warn">'+esc(tr('warning'))+'</p>'+
      '<div id="v6345Status" class="v6345-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6345-grid">'+
        '<div><strong>'+esc(tr('user'))+':</strong> <span id="v6345User">—</span></div>'+
        '<div><strong>'+esc(tr('backup'))+':</strong> <span id="v6345Backup">—</span></div>'+
        '<div><strong>'+esc(tr('keys'))+':</strong> <span id="v6345Keys">—</span></div>'+
        '<div><strong>'+esc(tr('size'))+':</strong> <span id="v6345Size">—</span></div>'+
        '<div><strong>'+esc(tr('updated'))+':</strong> <span id="v6345Updated">—</span></div>'+
        '<div><strong>'+esc(tr('lastRestore'))+':</strong> <span id="v6345LastRestore">—</span></div>'+
      '</div>'+
      '<div class="v6345-actions">'+
        '<button type="button" class="btn secondary" id="v6345Check">'+esc(tr('check'))+'</button>'+
        '<button type="button" class="btn primary" id="v6345Restore">'+esc(tr('restore'))+'</button>'+
        '<button type="button" class="btn gold" id="v6345Simulate">'+esc(tr('simulate'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6345BackupNow">'+esc(tr('backupNow'))+'</button>'+
        '<button type="button" class="btn light" id="v6345Clear">'+esc(tr('clearLog'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(tr('help'))+'</p>'+
      '<p class="small"><strong>'+esc(tr('simulateWarn'))+'</strong></p>'+
      '<div id="v6345Log"></div>'+
    '</div>';
  }

  function render(){
    css();
    var more=document.getElementById('more');
    if(!more) return;
    var p=document.getElementById('v6345RestorePanel');
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
    var pairs=[
      ['v6345Check', function(){ checkBackup().catch(showError); }],
      ['v6345Restore', function(){ restoreAll().catch(showError); }],
      ['v6345Simulate', function(){ simulateReinstallRestore().catch(showError); }],
      ['v6345BackupNow', function(){ backupNow().catch(showError); }],
      ['v6345Clear', function(){ localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); }]
    ];
    pairs.forEach(function(pair){
      var el=document.getElementById(pair[0]);
      if(!el) return;
      el.onclick=function(ev){
        if(ev){ ev.preventDefault(); ev.stopPropagation(); }
        pair[1]();
        return false;
      };
    });
  }

  function renderFields(row,user){
    var set=function(id,v){var el=document.getElementById(id); if(el) el.textContent=v;};
    set('v6345User', user ? (user.email || user.id) : '—');
    if(row){
      var st=backupStats(row);
      set('v6345Backup','found');
      set('v6345Keys',String(st.keyCount));
      set('v6345Size',String(st.totalSize)+' chars');
      set('v6345Updated',st.updatedAt || '—');
    }else{
      set('v6345Backup','—');
    }
    var last=null;
    try{last=JSON.parse(localStorage.getItem(LAST_RESTORE_KEY)||'null');}catch(e){}
    set('v6345LastRestore', last ? (last.time+' / '+last.restored+' keys') : '—');
  }

  function renderLog(){
    var box=document.getElementById('v6345Log');
    if(!box) return;
    var arr=getLog();
    if(!arr.length){ box.innerHTML=''; return; }
    box.innerHTML=arr.map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details||{},null,2))+'</pre></details>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('load', render);
  document.addEventListener('click', function(){ setTimeout(render,100); }, true);
  setInterval(render,3000);
  setTimeout(render,600);
  setTimeout(render,2000);

  window.OMIDENO7_V6345_FULL_RESTORE_BETA = {
    checkBackup:checkBackup,
    restoreAll:restoreAll,
    simulateReinstallRestore:simulateReinstallRestore,
    version:VERSION
  };
})();
