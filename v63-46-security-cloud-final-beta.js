/* Omideno7 V63.46 — Security + Cloud Final Beta
   Beta-only. Does not affect public index.html.

   Purpose:
   1) Security hardening diagnostics
   2) Final cloud-flow preview for stable release
   3) Fix beta version display flicker (V61.5/V63.xx)
   4) Show exactly what will happen in stable before publishing
*/
(function(){
  'use strict';

  var VERSION = 'V63.46 Beta';
  var FULL_VERSION = 'App Version: ' + VERSION;
  var LOG_KEY = 'omideno7_v6346_security_cloud_log';
  var TABLE_BACKUP = 'user_app_backups';
  var TABLE_QUEUE = 'offline_sync_queue';
  var TABLE_AUDIT = 'security_audit_log';
  var BADGE_ID = 'om7V6346HeaderVersion';
  var FOOTER_ID = 'om7V6346FooterVersion';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
    catch(e){ return 'fa'; }
  }

  function tr(k){
    var fa = {
      title:'امنیت و کلود نهایی — Beta V63.46',
      intro:'این نسخه هم امنیت را تست می‌کند، هم ساختار نهایی کلود را در Beta نشان می‌دهد؛ قبل از اینکه چیزی به نسخه اصلی منتقل شود.',
      warning:'این پنل فقط برای Beta است. در نسخه اصلی، کاربر دکمه‌های تست را نمی‌بیند؛ بکاپ، صف آفلاین و بازیابی در پس‌زمینه انجام می‌شود.',
      versionFixed:'نمایش نسخه Beta ثابت شد',
      checkSecurity:'بررسی امنیت',
      checkCloud:'بررسی کلود',
      runAll:'اجرای همه تست‌ها',
      makeBackup:'گرفتن پشتیبان جدید',
      restore:'تست بازیابی از کلود',
      previewStable:'نمایش ساختار نسخه اصلی',
      clear:'پاک کردن گزارش',
      status:'آماده تست امنیت و کلود',
      running:'در حال بررسی...',
      ok:'موفق',
      warn:'هشدار',
      error:'خطا',
      securityOk:'بررسی امنیت انجام شد',
      cloudOk:'بررسی کلود انجام شد',
      allOk:'همه تست‌ها انجام شد',
      backed:'پشتیبان جدید ثبت شد',
      restored:'بازیابی از کلود انجام شد',
      user:'کاربر',
      admin:'ادمین',
      backup:'بکاپ',
      queue:'صف آفلاین',
      audit:'لاگ امنیت',
      sensitive:'کلیدهای حساس',
      tables:'جدول‌ها',
      last:'آخرین بررسی',
      stableTitle:'ساختار پیشنهادی برای نسخه اصلی',
      stable1:'کاربر وارد حساب می‌شود؛ اپ خودش بکاپ کلود را بررسی می‌کند.',
      stable2:'اگر اطلاعات قبلی وجود داشت، اپ پیام ساده بازیابی نشان می‌دهد یا طبق تنظیم نهایی خودکار بازیابی می‌کند.',
      stable3:'یادداشت‌ها، آیه‌ها، برنامه ۳۶۵، مدرسه و تنظیمات در پس‌زمینه ذخیره می‌شوند.',
      stable4:'اگر اینترنت قطع بود، تغییرات در صف آفلاین می‌مانند و بعد از برگشت اینترنت ارسال می‌شوند.',
      stable5:'پنل‌های تست، دکمه‌های Beta و گزارش‌های فنی از نسخه اصلی حذف یا فقط برای ادمین مخفی می‌شوند.',
      help:'بعد از اجرای همه تست‌ها، اگر Backup/Queue/Audit سبز بودند و نسخه پایین دیگر V61.5 نشان نداد، این Beta آماده تبدیل به نسخه اصلی است.'
    };
    var en = {
      title:'Security + Final Cloud — Beta V63.46',
      intro:'This build tests security and shows the final cloud structure in Beta before anything moves to stable.',
      warning:'Beta-only panel. In stable release, users will not see test buttons; backup, offline queue, and restore will run in the background.',
      versionFixed:'Beta version display locked',
      checkSecurity:'Check security',
      checkCloud:'Check cloud',
      runAll:'Run all tests',
      makeBackup:'Create fresh backup',
      restore:'Test cloud restore',
      previewStable:'Preview stable structure',
      clear:'Clear log',
      status:'Ready to test security and cloud',
      running:'Running checks...',
      ok:'OK',
      warn:'Warning',
      error:'Error',
      securityOk:'Security check completed',
      cloudOk:'Cloud check completed',
      allOk:'All tests completed',
      backed:'Fresh backup saved',
      restored:'Cloud restore completed',
      user:'User',
      admin:'Admin',
      backup:'Backup',
      queue:'Offline queue',
      audit:'Security log',
      sensitive:'Sensitive keys',
      tables:'Tables',
      last:'Last check',
      stableTitle:'Proposed stable-release structure',
      stable1:'User signs in; the app checks cloud backup automatically.',
      stable2:'If previous data exists, the app shows a simple restore prompt or restores automatically depending on final setting.',
      stable3:'Notes, saved verses, Bible365, School, and settings sync in the background.',
      stable4:'If offline, changes stay in the offline queue and sync when internet returns.',
      stable5:'Beta panels, test buttons, and technical logs are removed from public users or hidden for admin only.',
      help:'After all tests pass and the footer no longer flickers to V61.5, this Beta is ready to become the stable candidate.'
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
    arr=arr.slice(0,80);
    try{ localStorage.setItem(LOG_KEY, JSON.stringify(arr)); }catch(e){}
    renderLog();
  }
  function getLog(){ try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];} }

  function status(msg,type){
    var el=document.getElementById('v6346Status');
    if(!el) return;
    el.className='v6346-status '+(type||'info');
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
    if(!u) throw new Error('User is not signed in. Login as student/admin first.');
    return {sb:sb,user:u};
  }

  function forbiddenKey(key){
    key=String(key||'').toLowerCase();
    return /service_role|service-role|secret|password|access_token|refresh_token|jwt|auth-token|apikey|api_key|private|bearer/i.test(key);
  }

  function scanSensitiveLocalStorage(){
    var found=[];
    try{
      for(var i=0;i<localStorage.length;i++){
        var key=localStorage.key(i);
        var value=localStorage.getItem(key) || '';
        var k=String(key||'').toLowerCase();
        var v=String(value||'').toLowerCase();
        if(/service_role|service-role|password|secret|apikey|api_key/.test(k) || /service_role|service-role/.test(v)){
          found.push({key:key, reason:'dangerous secret-like key/value'});
        }
      }
    }catch(e){}
    return found;
  }

  async function isAdmin(ctx){
    try{
      var res=await ctx.sb.rpc('omideno7_is_admin');
      if(res.error) return {ok:false, value:null, error:res.error.message};
      return {ok:true, value:!!res.data};
    }catch(e){
      return {ok:false, value:null, error:e.message || String(e)};
    }
  }

  async function insertAudit(ctx, action, payload){
    try{
      var res=await ctx.sb.from(TABLE_AUDIT).insert({
        user_id:ctx.user.id,
        action:action,
        page:'beta-v63-46',
        metadata:payload || {},
        created_at:now()
      }).select('id').single();
      if(res.error) return {ok:false,error:res.error.message};
      return {ok:true,id:res.data && res.data.id};
    }catch(e){
      return {ok:false,error:e.message || String(e)};
    }
  }

  async function checkSecurity(){
    status(tr('running'), 'info');
    var ctx=await getCtx();
    var sensitive=scanSensitiveLocalStorage();
    var admin=await isAdmin(ctx);
    var audit=await insertAudit(ctx,'beta_security_check_v63_46',{sensitiveKeys:sensitive.length, admin:admin.value, userEmail:ctx.user.email || null});

    var result={
      user:{id:ctx.user.id,email:ctx.user.email||null},
      admin:admin,
      sensitiveKeys:sensitive,
      audit:audit,
      version:VERSION
    };
    log(sensitive.length ? 'warn' : 'success', tr('securityOk'), result);
    status(sensitive.length ? (tr('warn')+': '+tr('sensitive')) : tr('securityOk'), sensitive.length ? 'warn' : 'ok');
    renderFields({user:ctx.user, admin:admin, sensitive:sensitive, audit:audit});
    return result;
  }

  async function checkCloud(){
    status(tr('running'), 'info');
    var ctx=await getCtx();

    var backup=await ctx.sb.from(TABLE_BACKUP).select('id,backup_type,key_count,total_size,updated_at').eq('user_id',ctx.user.id).eq('backup_type','personal_app_data').maybeSingle();
    var queue=await ctx.sb.from(TABLE_QUEUE).select('id,status,item_type,created_at').eq('user_id',ctx.user.id).limit(5);
    var audit=await ctx.sb.from(TABLE_AUDIT).select('id,action,created_at').eq('user_id',ctx.user.id).limit(5);

    var result={
      user:{id:ctx.user.id,email:ctx.user.email||null},
      backup:{ok:!backup.error, error:backup.error&&backup.error.message, row:backup.data||null},
      queue:{ok:!queue.error, error:queue.error&&queue.error.message, rows:(queue.data||[]).length},
      audit:{ok:!audit.error, error:audit.error&&audit.error.message, rows:(audit.data||[]).length}
    };

    var ok = result.backup.ok && result.queue.ok && result.audit.ok;
    log(ok ? 'success' : 'error', tr('cloudOk'), result);
    status(ok ? tr('cloudOk') : tr('error')+': cloud', ok ? 'ok' : 'error');
    renderFields({user:ctx.user, backup:result.backup, queue:result.queue, audit:result.audit});
    return result;
  }

  async function backupNow(){
    if(window.OMIDENO7_V6344C_BACKUP_BETA && typeof window.OMIDENO7_V6344C_BACKUP_BETA.saveCloud === 'function'){
      await window.OMIDENO7_V6344C_BACKUP_BETA.saveCloud();
      status(tr('backed'),'ok');
      log('success',tr('backed'),{source:'V6344C'});
      await checkCloud();
      return;
    }
    throw new Error('V63.44c backup function not found.');
  }

  async function restoreNow(){
    if(window.OMIDENO7_V6345B_VISIBLE_RESTORE_BETA && typeof window.OMIDENO7_V6345B_VISIBLE_RESTORE_BETA.restoreFromCloud === 'function'){
      await window.OMIDENO7_V6345B_VISIBLE_RESTORE_BETA.restoreFromCloud();
      status(tr('restored'),'ok');
      log('success',tr('restored'),{source:'V6345B'});
      return;
    }
    if(window.OMIDENO7_V6345_FULL_RESTORE_BETA && typeof window.OMIDENO7_V6345_FULL_RESTORE_BETA.restoreAll === 'function'){
      await window.OMIDENO7_V6345_FULL_RESTORE_BETA.restoreAll();
      status(tr('restored'),'ok');
      log('success',tr('restored'),{source:'V6345'});
      return;
    }
    throw new Error('Restore function not found.');
  }

  async function runAll(){
    status(tr('running'), 'info');
    var sec=await checkSecurity();
    var cloud=await checkCloud();
    status(tr('allOk'), 'ok');
    log('success', tr('allOk'), {security:sec, cloud:cloud});
  }

  function lockVersion(){
    try{
      window.APP_VERSION=VERSION;
      window.OMIDENO7_APP_VERSION=VERSION;
      window.OMIDENO7_BETA_VERSION=VERSION;
      window.OMIDENO7_VERSION_DISPLAY=FULL_VERSION;

      var nodes=Array.prototype.slice.call(document.querySelectorAll('.footer,.app-version,#appVersion,small,span,p,b,div'));
      nodes.forEach(function(el){
        if(!el || el.id===BADGE_ID || el.id===FOOTER_ID || el.closest && el.closest('#v6346Panel')) return;
        var txt=(el.textContent||'').trim();
        if(!txt || txt.length>90) return;
        if(/App\s*Version\s*:\s*V|Version\s*:\s*V|نسخه|ورژن/i.test(txt)){
          el.textContent='';
          el.style.display='none';
          el.dataset.om7OldVersionHidden='1';
        }
      });

      var header=document.querySelector('.app-header') || document.querySelector('header');
      if(header){
        var badge=document.getElementById(BADGE_ID);
        if(!badge){
          badge=document.createElement('div');
          badge.id=BADGE_ID;
          badge.style.cssText='position:absolute;left:50%;transform:translateX(-50%);top:8px;color:#fff;font-weight:900;font-size:14px;z-index:9999;pointer-events:none;text-shadow:0 1px 2px rgba(0,0,0,.25);white-space:nowrap;';
          header.style.position=header.style.position || 'relative';
          header.appendChild(badge);
        }
        badge.textContent=FULL_VERSION;
      }

      var more=document.getElementById('more');
      var footer=(more && more.querySelector('.footer')) || document.querySelector('.footer');
      if(footer){
        var f=document.getElementById(FOOTER_ID);
        if(!f){
          f=document.createElement('div');
          f.id=FOOTER_ID;
          f.style.cssText='font-size:12px;font-weight:900;color:#667085;margin-top:6px;text-align:center;';
          footer.appendChild(f);
        }
        f.textContent=FULL_VERSION;
      }
    }catch(e){}
  }

  function css(){
    if(document.getElementById('v6346Css')) return;
    var st=document.createElement('style');
    st.id='v6346Css';
    st.textContent=[
      '#v6346Panel{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;display:block!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:20!important;}',
      '[data-om7-old-version-hidden="1"]{display:none!important;visibility:hidden!important;}',
      '#'+BADGE_ID+',#'+FOOTER_ID+'{display:block!important;visibility:visible!important;opacity:1!important;}',
      '.v6346-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6346-status.info{background:#eef4ff;color:#06146D}.v6346-status.ok{background:#eaffef;color:#08751a}.v6346-status.warn{background:#fff7df;color:#8a5a00}.v6346-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6346-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6346-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6346-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '.v6346-stable-preview{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:12px;margin:12px 0}#v6346Log details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6346Panel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function html(){
    return '<div id="v6346Panel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<p class="v6346-status warn">'+esc(tr('warning'))+'</p>'+
      '<div id="v6346Status" class="v6346-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6346-grid">'+
        '<div><strong>'+esc(tr('user'))+':</strong> <span id="v6346User">—</span></div>'+
        '<div><strong>'+esc(tr('admin'))+':</strong> <span id="v6346Admin">—</span></div>'+
        '<div><strong>'+esc(tr('backup'))+':</strong> <span id="v6346Backup">—</span></div>'+
        '<div><strong>'+esc(tr('queue'))+':</strong> <span id="v6346Queue">—</span></div>'+
        '<div><strong>'+esc(tr('audit'))+':</strong> <span id="v6346Audit">—</span></div>'+
        '<div><strong>'+esc(tr('sensitive'))+':</strong> <span id="v6346Sensitive">—</span></div>'+
        '<div><strong>'+esc(tr('last'))+':</strong> <span id="v6346Last">—</span></div>'+
      '</div>'+
      '<div class="v6346-actions">'+
        '<button type="button" class="btn secondary" id="v6346Sec">'+esc(tr('checkSecurity'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6346Cloud">'+esc(tr('checkCloud'))+'</button>'+
        '<button type="button" class="btn primary" id="v6346All">'+esc(tr('runAll'))+'</button>'+
        '<button type="button" class="btn gold" id="v6346Backup">'+esc(tr('makeBackup'))+'</button>'+
        '<button type="button" class="btn primary" id="v6346Restore">'+esc(tr('restore'))+'</button>'+
        '<button type="button" class="btn light" id="v6346Preview">'+esc(tr('previewStable'))+'</button>'+
        '<button type="button" class="btn light" id="v6346Clear">'+esc(tr('clear'))+'</button>'+
      '</div>'+
      '<div id="v6346StablePreview" class="v6346-stable-preview" style="display:none"></div>'+
      '<p class="small">'+esc(tr('help'))+'</p>'+
      '<div id="v6346Log"></div>'+
    '</div>';
  }

  function previewStable(){
    var box=document.getElementById('v6346StablePreview');
    if(!box) return;
    box.style.display='block';
    box.innerHTML='<h4>'+esc(tr('stableTitle'))+'</h4>'+
      '<ol><li>'+esc(tr('stable1'))+'</li><li>'+esc(tr('stable2'))+'</li><li>'+esc(tr('stable3'))+'</li><li>'+esc(tr('stable4'))+'</li><li>'+esc(tr('stable5'))+'</li></ol>';
  }

  function render(){
    css();
    lockVersion();
    var more=document.getElementById('more');
    if(!more) return;
    var p=document.getElementById('v6346Panel');
    if(!p){
      var footer=more.querySelector('.footer');
      var wrap=document.createElement('div');
      wrap.innerHTML=html();
      p=wrap.firstElementChild;
      more.insertBefore(p, footer || null);
    }
    bind();
    renderLog();
    lockVersion();
  }

  function bind(){
    var pairs=[
      ['v6346Sec', function(){ checkSecurity().catch(showError); }],
      ['v6346Cloud', function(){ checkCloud().catch(showError); }],
      ['v6346All', function(){ runAll().catch(showError); }],
      ['v6346Backup', function(){ backupNow().catch(showError); }],
      ['v6346Restore', function(){ restoreNow().catch(showError); }],
      ['v6346Preview', function(){ previewStable(); }],
      ['v6346Clear', function(){ localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); }]
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

  function renderFields(data){
    var set=function(id,v){ var el=document.getElementById(id); if(el) el.textContent=v; };
    if(data && data.user){
      set('v6346User', data.user.email || data.user.id || '—');
    }
    if(data && data.admin){
      set('v6346Admin', data.admin.ok ? String(data.admin.value) : ('error: '+(data.admin.error||'')));
    }
    if(data && data.sensitive){
      set('v6346Sensitive', String(data.sensitive.length));
    }
    if(data && data.backup){
      set('v6346Backup', data.backup.ok ? (data.backup.row ? ('found / '+(data.backup.row.key_count||0)+' keys') : 'empty') : ('error: '+data.backup.error));
    }
    if(data && data.queue){
      set('v6346Queue', data.queue.ok ? (data.queue.rows+' rows') : ('error: '+data.queue.error));
    }
    if(data && data.audit){
      if(typeof data.audit.rows !== 'undefined') set('v6346Audit', data.audit.ok ? (data.audit.rows+' rows') : ('error: '+data.audit.error));
      else set('v6346Audit', data.audit.ok ? 'write ok' : ('error: '+data.audit.error));
    }
    set('v6346Last', now());
  }

  function renderLog(){
    var box=document.getElementById('v6346Log');
    if(!box) return;
    var arr=getLog();
    if(!arr.length){ box.innerHTML=''; return; }
    box.innerHTML=arr.map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details||{},null,2))+'</pre></details>';
    }).join('');
  }

  function showError(e){
    var msg=tr('error')+': '+(e && e.message ? e.message : e);
    status(msg,'error');
    log('error', msg, {stack:e && e.stack});
  }

  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('load', render);
  document.addEventListener('click', function(){ setTimeout(render,80); }, true);
  setInterval(function(){ render(); lockVersion(); }, 500);
  setTimeout(render,300);
  setTimeout(render,1200);
  setTimeout(render,2400);

  window.OMIDENO7_V6346_SECURITY_CLOUD_BETA = {
    checkSecurity:checkSecurity,
    checkCloud:checkCloud,
    runAll:runAll,
    version:VERSION
  };
})();
