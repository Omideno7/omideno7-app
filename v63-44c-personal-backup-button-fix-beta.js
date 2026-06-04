/* Omideno7 V63.44c — Personal Backup Button Fix Beta
   Fixes V63.44b problem: buttons did not respond because panel click isolation blocked button handlers.
   Beta-only. Stable index.html is not affected.
*/
(function(){
  'use strict';

  var VERSION = 'V63.44c Personal Backup Button Fix Beta';
  var TABLE = 'user_app_backups';
  var LOG_KEY = 'omideno7_v6344c_backup_log';
  var LAST_SCAN_KEY = 'omideno7_v6344c_last_scan';
  var LAST_SYNC_KEY = 'omideno7_v6344c_last_sync';

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
      title:'پشتیبان‌گیری اطلاعات شخصی — Beta V63.44c',
      intro:'این نسخه مشکل کار نکردن دکمه‌ها را اصلاح می‌کند. دکمه‌ها مستقیم با onclick کار می‌کنند و دیگر توسط پنل یا مدرسه مسدود نمی‌شوند.',
      warning:'فقط برای تست Beta است. در نسخه اصلی، این کارها خودکار انجام می‌شود.',
      test:'تست اتصال جدول',
      scan:'بررسی اطلاعات',
      save:'ذخیره قطعی در کلود',
      restore:'بازیابی از کلود',
      clear:'پاک کردن گزارش',
      status:'آماده تست',
      testing:'در حال تست اتصال جدول...',
      scanning:'در حال بررسی اطلاعات...',
      saving:'در حال ذخیره در کلود...',
      restoring:'در حال بازیابی...',
      tableOk:'جدول قابل دسترسی است',
      scanned:'اطلاعات بررسی شد',
      saved:'پشتیبان در کلود ذخیره شد',
      restored:'بازیابی انجام شد',
      noBackup:'هنوز پشتیبانی در کلود نیست',
      error:'خطا',
      keys:'کلیدها',
      size:'حجم',
      categories:'دسته‌ها',
      last:'آخرین ذخیره',
      user:'کاربر',
      table:'جدول',
      help:'اول «تست اتصال جدول» را بزن. اگر سبز شد، «بررسی اطلاعات» و بعد «ذخیره قطعی در کلود» را بزن. بعد Supabase جدول user_app_backups را Refresh کن.'
    };
    var en = {
      title:'Personal Backup — Beta V63.44c',
      intro:'This version fixes non-working buttons. Buttons use direct onclick handlers and are no longer blocked by panel/school events.',
      warning:'Beta test only. In the stable app this will run automatically.',
      test:'Test table access',
      scan:'Scan data',
      save:'Force save to cloud',
      restore:'Restore from cloud',
      clear:'Clear log',
      status:'Ready',
      testing:'Testing table access...',
      scanning:'Scanning data...',
      saving:'Saving to cloud...',
      restoring:'Restoring...',
      tableOk:'Table is accessible',
      scanned:'Data scanned',
      saved:'Cloud backup saved',
      restored:'Restore completed',
      noBackup:'No cloud backup yet',
      error:'Error',
      keys:'Keys',
      size:'Size',
      categories:'Categories',
      last:'Last save',
      user:'User',
      table:'Table',
      help:'Press Test table first. If green, press Scan data and Force save to cloud. Then refresh Supabase user_app_backups.'
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
    try{ arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]'); }catch(e){ arr=[]; }
    arr.unshift({time:now(), type:type||'info', message:String(msg||''), details:details||null});
    arr=arr.slice(0,50);
    try{ localStorage.setItem(LOG_KEY, JSON.stringify(arr)); }catch(e){}
    renderLog();
  }
  function getLog(){ try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];} }

  function status(msg,type){
    var el=document.getElementById('v6344cStatus');
    if(!el) return;
    el.className='v6344c-status '+(type||'info');
    el.textContent=msg;
  }

  function forbidden(key){
    key=String(key||'').toLowerCase();
    return /supabase\.auth|sb-|auth-token|access_token|refresh_token|jwt|service_role|apikey|api_key|onesignal|password|secret|token/i.test(key);
  }
  function category(key){
    key=String(key||'').toLowerCase();
    if(/note|notes|یادداشت|my-notes|mynotes/.test(key)) return 'notes';
    if(/saved.*verse|verse.*saved|favorite|bookmark|آیه|ayat|verse/.test(key)) return 'saved_verses';
    if(/highlight|mark|underline/.test(key)) return 'highlights';
    if(/bible365|365|reading.*plan|plan.*reading/.test(key)) return 'bible365';
    if(/school|student|lesson|homework|assignment|exam|مدرسه|درس|کلاس/.test(key)) return 'school';
    if(/lang|language|setting|theme|notification|timezone/.test(key)) return 'settings';
    if(/offline|queue|sync/.test(key)) return 'offline';
    if(/daily|word|declaration|prayer|fasting|ror/.test(key)) return 'content_state';
    return 'other';
  }
  function shouldKeep(key,value){
    if(!key || forbidden(key) || value == null) return false;
    var k=String(key).toLowerCase();
    return /omideno7|om7_|bible|verse|note|saved|highlight|school|student|lesson|homework|assignment|exam|lang|language|setting|notification|reading|plan|daily|word|declaration|prayer|fasting|offline|queue/.test(k) ||
           /^(lang|theme|notes|savedVerses|myNotes|bookmarks|highlights)$/.test(key);
  }
  function parseMaybe(v){ if(typeof v !== 'string') return v; try{return JSON.parse(v);}catch(e){return v;} }

  function scan(){
    status(tr('scanning'), 'info');
    var items={}, cats={}, keys=[], total=0;
    try{
      for(var i=0;i<localStorage.length;i++){
        var key=localStorage.key(i);
        var val=localStorage.getItem(key);
        if(!shouldKeep(key,val)) continue;
        var cat=category(key);
        items[key]={category:cat, value:val, parsed:parseMaybe(val), length:String(val||'').length};
        cats[cat]=(cats[cat]||0)+1;
        keys.push(key);
        total += String(val||'').length;
      }
    }catch(e){
      log('error','localStorage scan failed',{message:e.message||String(e)});
    }

    try{
      if(window.OMIDENO7_V6341G_BETA && typeof window.OMIDENO7_V6341G_BETA.snapshot === 'function'){
        var b=window.OMIDENO7_V6341G_BETA.snapshot();
        items['__live_bible365_snapshot']={category:'bible365', value:JSON.stringify(b), parsed:b, length:JSON.stringify(b).length};
        cats.bible365=(cats.bible365||0)+1;
      }
    }catch(e){}
    try{
      if(window.OMIDENO7_V6343_SCHOOL_OFFLINE && typeof window.OMIDENO7_V6343_SCHOOL_OFFLINE.getLessons === 'function'){
        var lessons=window.OMIDENO7_V6343_SCHOOL_OFFLINE.getLessons();
        items['__offline_school_lessons_v6343']={category:'school', value:JSON.stringify(lessons), parsed:lessons, length:JSON.stringify(lessons).length};
        cats.school=(cats.school||0)+1;
      }
    }catch(e){}

    var payload={
      version:VERSION,
      backup_type:'personal_app_data',
      created_at:now(),
      language:lang(),
      online:navigator.onLine,
      href:location.href,
      keys:keys,
      categories:cats,
      total_size:total,
      items:items
    };
    try{ localStorage.setItem(LAST_SCAN_KEY, JSON.stringify({time:now(), keys:keys.length, total_size:total, categories:cats})); }catch(e){}
    status(tr('scanned')+': '+keys.length, 'ok');
    log('info', tr('scanned'), {keys:keys.length,total:total,categories:cats});
    renderFields(payload);
    return payload;
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

  async function testTable(){
    status(tr('testing'), 'info');
    var ctx=await getCtx();
    var res=await ctx.sb.from(TABLE).select('id,updated_at,backup_type,key_count,total_size').eq('user_id',ctx.user.id).limit(1);
    if(res.error) throw res.error;
    status(tr('tableOk'), 'ok');
    log('success', tr('tableOk'), {user_id:ctx.user.id,email:ctx.user.email,rows:(res.data||[]).length});
    renderFields(null, ctx.user);
  }

  async function saveCloud(){
    status(tr('saving'), 'info');
    var payload=scan();
    var ctx=await getCtx();
    var row={
      user_id:ctx.user.id,
      backup_type:'personal_app_data',
      payload:payload,
      key_count:payload.keys.length,
      total_size:payload.total_size,
      updated_at:now()
    };
    var res=await ctx.sb.from(TABLE).upsert(row,{onConflict:'user_id,backup_type'}).select('id,user_id,backup_type,key_count,total_size,updated_at').single();
    if(res.error) throw res.error;
    try{ localStorage.setItem(LAST_SYNC_KEY, now()); }catch(e){}
    status(tr('saved')+' — '+payload.keys.length, 'ok');
    log('success', tr('saved'), {returned:res.data, keys:payload.keys.length, categories:payload.categories});
    renderFields(payload, ctx.user);
  }

  async function restoreCloud(){
    status(tr('restoring'), 'info');
    var ctx=await getCtx();
    var res=await ctx.sb.from(TABLE).select('*').eq('user_id',ctx.user.id).eq('backup_type','personal_app_data').maybeSingle();
    if(res.error) throw res.error;
    if(!res.data || !res.data.payload){
      status(tr('noBackup'), 'warn');
      log('warn', tr('noBackup'));
      return;
    }
    var items=(res.data.payload && res.data.payload.items) || {};
    var restored=0;
    Object.keys(items).forEach(function(key){
      if(/^__/.test(key) || forbidden(key)) return;
      var item=items[key];
      if(!item || typeof item.value === 'undefined' || item.value == null) return;
      try{ localStorage.setItem(key, String(item.value)); restored++; }catch(e){}
    });
    try{ localStorage.setItem(LAST_SYNC_KEY, now()); }catch(e){}
    status(tr('restored')+': '+restored, 'ok');
    log('success', tr('restored'), {restored:restored, cloud_updated_at:res.data.updated_at});
    try{
      if(typeof window.renderApp === 'function') window.renderApp();
      if(typeof window.renderBibleReader === 'function') window.renderBibleReader();
    }catch(e){}
  }

  function showError(e){
    var msg=tr('error')+': '+(e && e.message ? e.message : e);
    status(msg, 'error');
    log('error', msg, {stack:e && e.stack});
  }

  function css(){
    if(document.getElementById('v6344cCss')) return;
    var st=document.createElement('style');
    st.id='v6344cCss';
    st.textContent=[
      '#v6344cPanel{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;display:block!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:20!important;}',
      '#v6344BackupPanel,#v6344bPanel{display:none!important;visibility:hidden!important;}',
      '.v6344c-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6344c-status.info{background:#eef4ff;color:#06146D}.v6344c-status.ok{background:#eaffef;color:#08751a}.v6344c-status.warn{background:#fff7df;color:#8a5a00}.v6344c-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6344c-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6344c-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6344c-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '#v6344cLog details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6344cPanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function html(){
    return '<div id="v6344cPanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<p class="v6344c-status warn">'+esc(tr('warning'))+'</p>'+
      '<div id="v6344cStatus" class="v6344c-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6344c-grid">'+
        '<div><strong>'+esc(tr('user'))+':</strong> <span id="v6344cUser">—</span></div>'+
        '<div><strong>'+esc(tr('table'))+':</strong> <span>'+TABLE+'</span></div>'+
        '<div><strong>'+esc(tr('keys'))+':</strong> <span id="v6344cKeys">—</span></div>'+
        '<div><strong>'+esc(tr('size'))+':</strong> <span id="v6344cSize">—</span></div>'+
        '<div><strong>'+esc(tr('categories'))+':</strong> <span id="v6344cCats">—</span></div>'+
        '<div><strong>'+esc(tr('last'))+':</strong> <span id="v6344cLast">—</span></div>'+
      '</div>'+
      '<div class="v6344c-actions">'+
        '<button type="button" class="btn secondary" id="v6344cTest">'+esc(tr('test'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6344cScan">'+esc(tr('scan'))+'</button>'+
        '<button type="button" class="btn gold" id="v6344cSave">'+esc(tr('save'))+'</button>'+
        '<button type="button" class="btn primary" id="v6344cRestore">'+esc(tr('restore'))+'</button>'+
        '<button type="button" class="btn light" id="v6344cClear">'+esc(tr('clear'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(tr('help'))+'</p>'+
      '<div id="v6344cLog"></div>'+
    '</div>';
  }

  function render(){
    css();
    var more=document.getElementById('more');
    if(!more) return;
    var old1=document.getElementById('v6344BackupPanel'); if(old1) old1.style.display='none';
    var old2=document.getElementById('v6344bPanel'); if(old2) old2.style.display='none';
    var p=document.getElementById('v6344cPanel');
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
    var pairs = [
      ['v6344cTest', function(){ testTable().catch(showError); }],
      ['v6344cScan', function(){ try{ scan(); }catch(e){ showError(e); } }],
      ['v6344cSave', function(){ saveCloud().catch(showError); }],
      ['v6344cRestore', function(){ restoreCloud().catch(showError); }],
      ['v6344cClear', function(){ localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); }]
    ];
    pairs.forEach(function(pair){
      var el=document.getElementById(pair[0]);
      if(!el) return;
      // Direct onclick is more reliable here than capture isolation.
      el.onclick = function(ev){
        if(ev){ ev.preventDefault(); ev.stopPropagation(); }
        pair[1]();
        return false;
      };
    });
  }

  function renderFields(payload,user){
    var scanInfo=null;
    try{ scanInfo=JSON.parse(localStorage.getItem(LAST_SCAN_KEY)||'null'); }catch(e){}
    var set=function(id,v){ var el=document.getElementById(id); if(el) el.textContent=v; };
    set('v6344cUser', user ? (user.email || user.id) : '—');
    set('v6344cKeys', payload ? payload.keys.length : (scanInfo ? scanInfo.keys : '—'));
    set('v6344cSize', payload ? payload.total_size+' chars' : (scanInfo ? scanInfo.total_size+' chars' : '—'));
    set('v6344cCats', payload ? Object.keys(payload.categories||{}).join(', ') : (scanInfo && scanInfo.categories ? Object.keys(scanInfo.categories).join(', ') : '—'));
    set('v6344cLast', localStorage.getItem(LAST_SYNC_KEY) || '—');
  }

  function renderLog(){
    var box=document.getElementById('v6344cLog');
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
  setInterval(render, 3000);
  setTimeout(render, 600);
  setTimeout(render, 2000);

  window.OMIDENO7_V6344C_BACKUP_BETA = {scan:scan, saveCloud:saveCloud, restoreCloud:restoreCloud, testTable:testTable, version:VERSION};
})();
