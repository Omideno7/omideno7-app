/* Omideno7 V63.45b — Visible Restore Test Beta
   Beta-only.
   Why:
   V63.45 "simulate reinstall + restore" restored immediately, so visually it looked like nothing happened.
   This version separates the test into:
   1) Clear app data only
   2) Restore from cloud
   so the admin can visibly confirm the process.
*/
(function(){
  'use strict';

  var VERSION = 'V63.45b Visible Restore Test Beta';
  var TABLE = 'user_app_backups';
  var LOG_KEY = 'omideno7_v6345b_visible_restore_log';
  var LAST_CLEAR_KEY = 'omideno7_v6345b_last_clear';
  var LAST_RESTORE_KEY = 'omideno7_v6345b_last_restore';

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
      title:'تست واضح بازیابی بعد از نصب مجدد — Beta V63.45b',
      intro:'در نسخه قبلی، شبیه‌سازی پاک می‌کرد و فوراً بازیابی می‌کرد؛ برای همین ظاهراً انگار کاری انجام نشده بود. این نسخه تست را دو مرحله‌ای می‌کند تا واضح ببینی اطلاعات پاک و بعد از کلود برمی‌گردد.',
      warning:'فقط برای Beta است. این دکمه‌ها در نسخه اصلی برای کاربران نمایش داده نمی‌شوند.',
      check:'بررسی پشتیبان در کلود',
      clearOnly:'۱) فقط پاک کردن داده‌های اپ',
      restore:'۲) بازیابی از کلود',
      backupNow:'گرفتن پشتیبان جدید',
      clearLog:'پاک کردن گزارش',
      status:'آماده تست واضح بازیابی',
      found:'پشتیبان در کلود پیدا شد',
      notFound:'پشتیبان پیدا نشد',
      clearing:'در حال پاک کردن داده‌های اپ...',
      cleared:'داده‌های اپ پاک شدند',
      restoring:'در حال بازیابی از کلود...',
      restored:'بازیابی از کلود انجام شد',
      backed:'پشتیبان جدید گرفته شد',
      error:'خطا',
      user:'کاربر',
      cloudKeys:'کلیدهای کلود',
      removed:'کلیدهای پاک‌شده',
      restoredKeys:'کلیدهای برگشته',
      lastClear:'آخرین پاک‌سازی',
      lastRestore:'آخرین بازیابی',
      help:'روش تست: اول «بررسی پشتیبان» را بزن. بعد «فقط پاک کردن داده‌های اپ» را بزن. سپس یک بخش مثل برنامه ۳۶۵ یا بیشتر را نگاه کن که داده‌ها تغییر کرده‌اند. بعد «بازیابی از کلود» را بزن تا اطلاعات برگردد.',
      safe:'ایمن: این پاک‌سازی، لاگین، توکن‌ها، پسورد، کلیدهای Supabase و اطلاعات حساس را پاک نمی‌کند.'
    };
    var en = {
      title:'Visible Restore Test — Beta V63.45b',
      intro:'Previous simulation cleared and restored immediately, so it looked like nothing happened. This version splits the test into two visible steps.',
      warning:'Beta only. These buttons will not be visible to public users.',
      check:'Check cloud backup',
      clearOnly:'1) Clear app data only',
      restore:'2) Restore from cloud',
      backupNow:'Create fresh backup',
      clearLog:'Clear log',
      status:'Ready to test visible restore',
      found:'Cloud backup found',
      notFound:'No cloud backup found',
      clearing:'Clearing app data...',
      cleared:'App data cleared',
      restoring:'Restoring from cloud...',
      restored:'Cloud restore completed',
      backed:'Fresh backup created',
      error:'Error',
      user:'User',
      cloudKeys:'Cloud keys',
      removed:'Removed keys',
      restoredKeys:'Restored keys',
      lastClear:'Last clear',
      lastRestore:'Last restore',
      help:'Test: check cloud backup first. Then clear app data only. Look at a section such as Bible365/More and confirm data changed. Then restore from cloud.',
      safe:'Safe: this does not delete login, auth tokens, passwords, Supabase keys, or sensitive tokens.'
    };
    return (lang()==='en'?en:fa)[k] || fa[k] || k;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function now(){ return new Date().toISOString(); }

  function forbidden(key){
    key=String(key||'').toLowerCase();
    return /supabase\.auth|sb-|auth-token|access_token|refresh_token|jwt|service_role|apikey|api_key|onesignal|password|secret|token/i.test(key);
  }
  function appOwnedKey(key){
    key=String(key||'');
    if(forbidden(key)) return false;
    if(key === LOG_KEY || key === LAST_CLEAR_KEY || key === LAST_RESTORE_KEY) return false;
    var k=key.toLowerCase();
    return /omideno7|om7_|bible|verse|note|saved|highlight|school|student|lesson|homework|assignment|exam|lang|language|setting|notification|reading|plan|daily|word|declaration|prayer|fasting|offline|queue/.test(k) ||
           /^(lang|theme|notes|savedVerses|myNotes|bookmarks|highlights)$/.test(key);
  }

  function log(type,msg,details){
    var arr=[];
    try{ arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]'); }catch(e){ arr=[]; }
    arr.unshift({time:now(), type:type||'info', message:String(msg||''), details:details||null});
    arr=arr.slice(0,50);
    try{ localStorage.setItem(LOG_KEY, JSON.stringify(arr)); }catch(e){}
    renderLog();
  }
  function getLog(){ try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];} }

  function status(msg,type){
    var el=document.getElementById('v6345bStatus');
    if(!el) return;
    el.className='v6345b-status '+(type||'info');
    el.textContent=msg;
  }

  function findClient(){
    if(window.OMIDENO7_V6340_BETA && typeof window.OMIDENO7_V6340_BETA.findSupabaseClient === 'function'){
      var c=window.OMIDENO7_V6340_BETA.findSupabaseClient(); if(c) return c;
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

  async function getBackup(){
    var ctx=await getCtx();
    var res=await ctx.sb.from(TABLE).select('*').eq('user_id',ctx.user.id).eq('backup_type','personal_app_data').maybeSingle();
    if(res.error) throw res.error;
    return {ctx:ctx,row:res.data||null};
  }

  function stats(row){
    var payload = row && row.payload || {};
    var items = payload.items || {};
    return {
      keyCount: row && (row.key_count || Object.keys(items).length) || 0,
      totalSize: row && (row.total_size || payload.total_size || 0) || 0,
      updatedAt: row && row.updated_at || '—',
      items: items
    };
  }

  async function checkBackup(){
    var out=await getBackup();
    if(!out.row){
      status(tr('notFound'),'warn');
      log('warn',tr('notFound'),{user:out.ctx.user.email||out.ctx.user.id});
      renderFields(null,out.ctx.user);
      return;
    }
    var st=stats(out.row);
    status(tr('found')+' — '+st.keyCount,'ok');
    log('success',tr('found'),{user:out.ctx.user.email||out.ctx.user.id, keyCount:st.keyCount, updatedAt:st.updatedAt});
    renderFields(out.row,out.ctx.user);
  }

  function clearAppDataOnly(){
    status(tr('clearing'),'info');
    var removed=[];
    try{
      var keys=[];
      for(var i=0;i<localStorage.length;i++) keys.push(localStorage.key(i));
      keys.forEach(function(key){
        if(appOwnedKey(key)){
          localStorage.removeItem(key);
          removed.push(key);
        }
      });
    }catch(e){}
    try{ localStorage.setItem(LAST_CLEAR_KEY, JSON.stringify({time:now(), removed:removed.length, keys:removed.slice(0,120)})); }catch(e){}
    status(tr('cleared')+' — '+removed.length,'ok');
    log('success',tr('cleared'),{removed:removed.length, keys:removed.slice(0,120)});
    renderFields();
    refreshAppSoft();
  }

  async function restoreFromCloud(){
    status(tr('restoring'),'info');
    var out=await getBackup();
    if(!out.row){
      status(tr('notFound'),'warn');
      log('warn',tr('notFound'));
      return;
    }
    var st=stats(out.row);
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
        localStorage.setItem(key,String(item.value));
        restored++;
      }catch(e){
        errors++;
      }
    });
    try{ localStorage.setItem(LAST_RESTORE_KEY, JSON.stringify({time:now(), restored:restored, skipped:skipped, errors:errors})); }catch(e){}
    status(tr('restored')+' — '+restored,'ok');
    log('success',tr('restored'),{restored:restored, skipped:skipped, errors:errors});
    renderFields(out.row,out.ctx.user);
    refreshAppSoft();
  }

  async function backupNow(){
    if(window.OMIDENO7_V6344C_BACKUP_BETA && typeof window.OMIDENO7_V6344C_BACKUP_BETA.saveCloud === 'function'){
      await window.OMIDENO7_V6344C_BACKUP_BETA.saveCloud();
      status(tr('backed'),'ok');
      log('success',tr('backed'),{source:'V6344C'});
      return;
    }
    throw new Error('V63.44c backup function not found.');
  }

  function refreshAppSoft(){
    try{
      if(typeof window.renderApp === 'function') window.renderApp();
      if(typeof window.renderBibleReader === 'function') window.renderBibleReader();
      if(typeof window.renderDailyWord === 'function') window.renderDailyWord();
    }catch(e){}
  }

  function showError(e){
    var msg=tr('error')+': '+(e && e.message ? e.message : e);
    status(msg,'error');
    log('error',msg,{stack:e && e.stack});
  }

  function css(){
    if(document.getElementById('v6345bCss')) return;
    var st=document.createElement('style');
    st.id='v6345bCss';
    st.textContent=[
      '#v6345bPanel{border-top:5px solid #F59E0B!important;background:linear-gradient(160deg,#fff,#fffbeb)!important;display:block!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:20!important;}',
      '.v6345b-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6345b-status.info{background:#eef4ff;color:#06146D}.v6345b-status.ok{background:#eaffef;color:#08751a}.v6345b-status.warn{background:#fff7df;color:#8a5a00}.v6345b-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6345b-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6345b-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6345b-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '#v6345bLog details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6345bPanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function html(){
    return '<div id="v6345bPanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<p class="v6345b-status warn">'+esc(tr('warning'))+'</p>'+
      '<p class="v6345b-status info">'+esc(tr('safe'))+'</p>'+
      '<div id="v6345bStatus" class="v6345b-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6345b-grid">'+
        '<div><strong>'+esc(tr('user'))+':</strong> <span id="v6345bUser">—</span></div>'+
        '<div><strong>'+esc(tr('cloudKeys'))+':</strong> <span id="v6345bCloudKeys">—</span></div>'+
        '<div><strong>'+esc(tr('removed'))+':</strong> <span id="v6345bRemoved">—</span></div>'+
        '<div><strong>'+esc(tr('restoredKeys'))+':</strong> <span id="v6345bRestored">—</span></div>'+
        '<div><strong>'+esc(tr('lastClear'))+':</strong> <span id="v6345bLastClear">—</span></div>'+
        '<div><strong>'+esc(tr('lastRestore'))+':</strong> <span id="v6345bLastRestore">—</span></div>'+
      '</div>'+
      '<div class="v6345b-actions">'+
        '<button type="button" class="btn secondary" id="v6345bCheck">'+esc(tr('check'))+'</button>'+
        '<button type="button" class="btn gold" id="v6345bClearOnly">'+esc(tr('clearOnly'))+'</button>'+
        '<button type="button" class="btn primary" id="v6345bRestore">'+esc(tr('restore'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6345bBackupNow">'+esc(tr('backupNow'))+'</button>'+
        '<button type="button" class="btn light" id="v6345bClearLog">'+esc(tr('clearLog'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(tr('help'))+'</p>'+
      '<div id="v6345bLog"></div>'+
    '</div>';
  }

  function render(){
    css();
    var more=document.getElementById('more');
    if(!more) return;
    var p=document.getElementById('v6345bPanel');
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
      ['v6345bCheck', function(){ checkBackup().catch(showError); }],
      ['v6345bClearOnly', function(){ try{ clearAppDataOnly(); }catch(e){ showError(e); } }],
      ['v6345bRestore', function(){ restoreFromCloud().catch(showError); }],
      ['v6345bBackupNow', function(){ backupNow().catch(showError); }],
      ['v6345bClearLog', function(){ localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); }]
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
    var set=function(id,v){ var el=document.getElementById(id); if(el) el.textContent=v; };
    set('v6345bUser', user ? (user.email || user.id) : '—');
    if(row){
      var st=stats(row);
      set('v6345bCloudKeys',String(st.keyCount));
    }
    var lc=null, lr=null;
    try{ lc=JSON.parse(localStorage.getItem(LAST_CLEAR_KEY)||'null'); }catch(e){}
    try{ lr=JSON.parse(localStorage.getItem(LAST_RESTORE_KEY)||'null'); }catch(e){}
    set('v6345bRemoved', lc ? String(lc.removed) : '—');
    set('v6345bRestored', lr ? String(lr.restored) : '—');
    set('v6345bLastClear', lc ? lc.time : '—');
    set('v6345bLastRestore', lr ? lr.time : '—');
  }

  function renderLog(){
    var box=document.getElementById('v6345bLog');
    if(!box) return;
    var arr=getLog();
    if(!arr.length){ box.innerHTML=''; return; }
    box.innerHTML=arr.map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details||{},null,2))+'</pre></details>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('load',render);
  document.addEventListener('click',function(){ setTimeout(render,100); },true);
  setInterval(render,3000);
  setTimeout(render,700);
  setTimeout(render,2200);

  window.OMIDENO7_V6345B_VISIBLE_RESTORE_BETA = {checkBackup:checkBackup, clearAppDataOnly:clearAppDataOnly, restoreFromCloud:restoreFromCloud, version:VERSION};
})();
