/* Omideno7 V63.47c — Security Client Fix Beta
   Fixes: "Supabase client not found. Login/open School once, then return to More."
   Beta-only.

   What changed:
   - The Max Security panel no longer depends only on the School module exposing a client.
   - It tries multiple known client locations.
   - It can create a Supabase client if the global Supabase library + public project config exist.
   - It shows a clearer diagnostic if the user is not logged in or if the client library is unavailable.
*/
(function(){
  'use strict';

  var VERSION = 'V63.47c Security Client Fix Beta';
  var LOG_KEY = 'omideno7_v6347c_security_log';
  var TABLE_AUDIT = 'security_audit_log';
  var TABLE_BACKUP = 'user_app_backups';
  var TABLE_QUEUE = 'offline_sync_queue';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){ try{return localStorage.getItem('lang') || document.documentElement.lang || 'fa';}catch(e){return 'fa';} }
  function tr(k){
    var fa={
      title:'اصلاح بررسی امنیت حداکثری — Beta V63.47c',
      intro:'این نسخه خطای Supabase client not found را اصلاح می‌کند و بررسی امنیت را حتی وقتی از بخش بیشتر اجرا می‌شود پایدارتر می‌کند.',
      note:'اگر هنوز خطا دیدی، اول یک بار وارد مدرسه شو تا لاگین فعال شود، سپس به بیشتر برگرد.',
      run:'اجرای بررسی امنیت حداکثری',
      audit:'ثبت لاگ امنیتی',
      client:'تست اتصال Supabase',
      clear:'پاک کردن گزارش',
      status:'آماده بررسی امنیت',
      running:'در حال بررسی...',
      ok:'بررسی امنیت انجام شد',
      clientOk:'اتصال Supabase آماده است',
      error:'خطا',
      user:'کاربر',
      admin:'ادمین',
      sensitive:'کلیدهای حساس',
      rls:'RLS / دسترسی جدول‌ها',
      auditLog:'لاگ امنیتی',
      clientState:'وضعیت اتصال',
      noClient:'اتصال Supabase پیدا نشد',
      noUser:'کاربر وارد حساب نشده است',
      passed:'موفق',
      warning:'هشدار',
      guidanceTitle:'یادآوری امنیتی',
      g1:'هیچ Service Role Key یا secret نباید در فایل‌های GitHub باشد.',
      g2:'RLS جدول‌های شخصی باید فعال باشد.',
      g3:'کاربر فقط داده‌های خودش را ببیند.',
      g4:'پنل‌های تست در نسخه اصلی حذف یا فقط برای ادمین مخفی شوند.'
    };
    var en={
      title:'Max Security Check Fix — Beta V63.47c',
      intro:'Fixes Supabase client not found and makes the security check more stable from the More tab.',
      note:'If it still fails, open School/login once, then return to More.',
      run:'Run max security check',
      audit:'Write security audit',
      client:'Test Supabase client',
      clear:'Clear log',
      status:'Ready',
      running:'Running...',
      ok:'Security check completed',
      clientOk:'Supabase connection is ready',
      error:'Error',
      user:'User',
      admin:'Admin',
      sensitive:'Sensitive keys',
      rls:'RLS / table access',
      auditLog:'Security audit',
      clientState:'Client state',
      noClient:'Supabase client not found',
      noUser:'User is not signed in',
      passed:'Passed',
      warning:'Warning',
      guidanceTitle:'Security reminders',
      g1:'No service role key or secret in GitHub files.',
      g2:'RLS must be enabled on personal tables.',
      g3:'Users should see only their own data.',
      g4:'Test panels must be removed or admin-hidden in stable.'
    };
    return (lang()==='en'?en:fa)[k] || fa[k] || k;
  }
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function now(){return new Date().toISOString();}
  function log(type,msg,details){
    var arr=[]; try{arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){arr=[];}
    arr.unshift({time:now(),type:type||'info',message:String(msg||''),details:details||null});
    arr=arr.slice(0,80); try{localStorage.setItem(LOG_KEY,JSON.stringify(arr));}catch(e){}
    renderLog();
  }
  function getLog(){try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];}}
  function status(msg,type){var el=document.getElementById('v6347cStatus'); if(el){el.className='v6347c-status '+(type||'info'); el.textContent=msg;}}

  function looksClient(x){return !!(x && x.auth && typeof x.from === 'function');}

  function findInObject(obj, depth, seen){
    if(!obj || depth<=0) return null;
    if(looksClient(obj)) return obj;
    if(typeof obj !== 'object' && typeof obj !== 'function') return null;
    seen = seen || [];
    if(seen.indexOf(obj) >= 0) return null;
    seen.push(obj);
    var keys=[];
    try{keys=Object.keys(obj);}catch(e){return null;}
    for(var i=0;i<keys.length;i++){
      var k=keys[i];
      if(!/supabase|client|school|omideno|om7|db/i.test(k)) continue;
      try{
        var found=findInObject(obj[k], depth-1, seen);
        if(found) return found;
      }catch(e){}
    }
    return null;
  }

  function readProjectConfig(){
    var txt = '';
    try{ txt = Array.prototype.slice.call(document.scripts).map(function(s){return s.textContent || '';}).join('\n'); }catch(e){}
    var body = '';
    try{ body = document.documentElement.innerHTML || ''; }catch(e){}
    var all = txt + '\n' + body;

    var url = null, key = null;
    var um = all.match(/https:\/\/[a-z0-9-]+\.supabase\.co/i);
    if(um) url = um[0];

    // anon/public JWT starts with eyJ and is long. Avoid service role if named so.
    var jwtMatches = all.match(/eyJ[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+/g) || [];
    if(jwtMatches.length){
      key = jwtMatches.find(function(j){return j.length > 80;}) || jwtMatches[0];
    }

    try{
      url = url || window.SUPABASE_URL || window.OMIDENO7_SUPABASE_URL || window.supabaseUrl;
      key = key || window.SUPABASE_ANON_KEY || window.OMIDENO7_SUPABASE_ANON_KEY || window.supabaseAnonKey;
    }catch(e){}

    return {url:url,key:key};
  }

  function createClientIfPossible(){
    if(window.__omideno7V6347cClient && looksClient(window.__omideno7V6347cClient)) return window.__omideno7V6347cClient;

    var cfg=readProjectConfig();
    var supa = null;
    try{ supa = window.supabase; }catch(e){}
    if(supa && typeof supa.createClient === 'function' && cfg.url && cfg.key){
      try{
        window.__omideno7V6347cClient = supa.createClient(cfg.url, cfg.key, {
          auth: { persistSession:true, autoRefreshToken:true, detectSessionInUrl:true }
        });
        return window.__omideno7V6347cClient;
      }catch(e){}
    }
    return null;
  }

  function findClient(){
    // Known function from previous beta
    try{
      if(window.OMIDENO7_V6340_BETA && typeof window.OMIDENO7_V6340_BETA.findSupabaseClient === 'function'){
        var c=window.OMIDENO7_V6340_BETA.findSupabaseClient();
        if(looksClient(c)) return c;
      }
    }catch(e){}

    var names=[
      'omideno7Supabase','schoolSupabase','supabaseClient','supabaseClient2',
      'om7Supabase','OMIDENO7_SUPABASE','OMIDENO7_SUPABASE_CLIENT',
      '__supabase','_supabase','db','client'
    ];
    for(var i=0;i<names.length;i++){
      try{ if(looksClient(window[names[i]])) return window[names[i]]; }catch(e){}
    }

    try{
      if(window.__om7SupabaseClients && window.__om7SupabaseClients.length){
        for(var j=0;j<window.__om7SupabaseClients.length;j++){
          if(looksClient(window.__om7SupabaseClients[j])) return window.__om7SupabaseClients[j];
        }
      }
    }catch(e){}

    var deep=findInObject(window, 2, []);
    if(deep) return deep;

    return createClientIfPossible();
  }

  async function getCtx(){
    var sb=findClient();
    if(!looksClient(sb)){
      throw new Error(tr('noClient')+'. Open School/login once, then return to More.');
    }
    var r=await sb.auth.getUser();
    if(r.error) throw r.error;
    var u=r.data && r.data.user;
    if(!u) throw new Error(tr('noUser')+'. Login/open School once, then return to More.');
    return {sb:sb,user:u};
  }

  async function testClient(){
    status(tr('running'),'info');
    var ctx=await getCtx();
    status(tr('clientOk'),'ok');
    log('success',tr('clientOk'),{user:ctx.user.email||ctx.user.id});
    renderFields({client:'ready', user:ctx.user});
    return ctx;
  }

  function scanSensitive(){
    var found=[];
    var dangerousKey=/service_role|service-role|password|secret|apikey|api_key|private_key|client_secret/i;
    var dangerousVal=/service_role|service-role|BEGIN PRIVATE KEY|client_secret/i;
    try{
      for(var i=0;i<localStorage.length;i++){
        var k=localStorage.key(i), v=localStorage.getItem(k)||'';
        if(dangerousKey.test(k) || dangerousVal.test(v)) found.push({key:k,reason:'dangerous key/value'});
      }
    }catch(e){}
    return found;
  }

  async function isAdmin(ctx){
    try{
      var r=await ctx.sb.rpc('omideno7_is_admin');
      if(r.error) return {ok:false,value:false,error:r.error.message};
      return {ok:true,value:!!r.data};
    }catch(e){return {ok:false,value:false,error:e.message||String(e)};}
  }

  async function checkTables(ctx){
    var out={};
    var b=await ctx.sb.from(TABLE_BACKUP).select('id').eq('user_id',ctx.user.id).limit(1);
    out.backup={ok:!b.error,error:b.error&&b.error.message};
    var q=await ctx.sb.from(TABLE_QUEUE).select('id').eq('user_id',ctx.user.id).limit(1);
    out.queue={ok:!q.error,error:q.error&&q.error.message};
    return out;
  }

  async function writeAudit(action, meta){
    var ctx=await getCtx();
    var payload={
      user_id:ctx.user.id,
      action:action||'max_security_check_v63_47c',
      page:'beta-v63-47c',
      metadata:meta||{},
      created_at:now()
    };
    var r=await ctx.sb.from(TABLE_AUDIT).insert(payload).select('id').single();
    if(r.error) throw r.error;
    return r.data;
  }

  async function runSecurity(){
    status(tr('running'),'info');
    var ctx=await getCtx();
    var admin=await isAdmin(ctx);
    var sensitive=scanSensitive();
    var tables=await checkTables(ctx);
    var auditWrite={ok:false};
    try{
      var aw=await writeAudit('max_security_check_v63_47c',{sensitive:sensitive.length, admin:admin.value});
      auditWrite={ok:true,id:aw.id};
    }catch(e){
      auditWrite={ok:false,error:e.message||String(e)};
    }
    var result={client:'ready', user:ctx.user, admin:admin, sensitive:sensitive, tables:tables, auditWrite:auditWrite};
    var ok=!sensitive.length && tables.backup.ok && tables.queue.ok && auditWrite.ok;
    status(ok?tr('ok'):tr('warning'), ok?'ok':'warn');
    log(ok?'success':'warn',tr('ok'),{
      user:{id:ctx.user.id,email:ctx.user.email||null},
      admin:admin,
      sensitive:sensitive,
      tables:tables,
      auditWrite:auditWrite
    });
    renderFields(result);
  }

  function css(){
    if(document.getElementById('v6347cCss')) return;
    var st=document.createElement('style');
    st.id='v6347cCss';
    st.textContent=[
      '#v6347SecPanel{display:none!important;visibility:hidden!important;}',
      '#v6347cPanel{border-top:5px solid #111827!important;background:linear-gradient(160deg,#fff,#f8fafc)!important;display:block!important;visibility:visible!important;opacity:1!important;}',
      '.v6347c-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6347c-status.info{background:#eef4ff;color:#06146D}.v6347c-status.ok{background:#eaffef;color:#08751a}.v6347c-status.warn{background:#fff7df;color:#8a5a00}.v6347c-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6347c-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6347c-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6347c-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '.v6347c-guidance{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:12px;margin:12px 0}#v6347cLog details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6347cPanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function html(){
    return '<div id="v6347cPanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<p class="v6347c-status warn">'+esc(tr('note'))+'</p>'+
      '<div id="v6347cStatus" class="v6347c-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6347c-grid">'+
        '<div><strong>'+esc(tr('clientState'))+':</strong> <span id="v6347cClient">—</span></div>'+
        '<div><strong>'+esc(tr('user'))+':</strong> <span id="v6347cUser">—</span></div>'+
        '<div><strong>'+esc(tr('admin'))+':</strong> <span id="v6347cAdmin">—</span></div>'+
        '<div><strong>'+esc(tr('sensitive'))+':</strong> <span id="v6347cSensitive">—</span></div>'+
        '<div><strong>'+esc(tr('rls'))+':</strong> <span id="v6347cTables">—</span></div>'+
        '<div><strong>'+esc(tr('auditLog'))+':</strong> <span id="v6347cAudit">—</span></div>'+
      '</div>'+
      '<div class="v6347c-actions">'+
        '<button type="button" class="btn secondary" id="v6347cClientBtn">'+esc(tr('client'))+'</button>'+
        '<button type="button" class="btn primary" id="v6347cRun">'+esc(tr('run'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6347cAuditBtn">'+esc(tr('audit'))+'</button>'+
        '<button type="button" class="btn light" id="v6347cClear">'+esc(tr('clear'))+'</button>'+
      '</div>'+
      '<div class="v6347c-guidance"><h4>'+esc(tr('guidanceTitle'))+'</h4><ol>'+
      '<li>'+esc(tr('g1'))+'</li><li>'+esc(tr('g2'))+'</li><li>'+esc(tr('g3'))+'</li><li>'+esc(tr('g4'))+'</li>'+
      '</ol></div>'+
      '<div id="v6347cLog"></div>'+
    '</div>';
  }

  function render(){
    css();
    var old=document.getElementById('v6347SecPanel'); if(old) old.style.display='none';
    var more=document.getElementById('more');
    if(!more) return;
    var p=document.getElementById('v6347cPanel');
    if(!p){
      var footer=more.querySelector('.footer');
      var wrap=document.createElement('div');
      wrap.innerHTML=html();
      p=wrap.firstElementChild;
      more.insertBefore(p, footer || null);
    }
    bind();
    renderLog();
  }

  function bind(){
    var c=document.getElementById('v6347cClientBtn');
    if(c) c.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} testClient().catch(showError); return false;};
    var r=document.getElementById('v6347cRun');
    if(r) r.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} runSecurity().catch(showError); return false;};
    var a=document.getElementById('v6347cAuditBtn');
    if(a) a.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} writeAudit('manual_security_audit_v63_47c',{}).then(function(x){status('Audit OK','ok'); log('success','Audit OK',x);}).catch(showError); return false;};
    var clear=document.getElementById('v6347cClear');
    if(clear) clear.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); return false;};
  }

  function renderFields(r){
    var set=function(id,v){var el=document.getElementById(id); if(el) el.textContent=v;};
    set('v6347cClient', r.client || '—');
    if(r.user) set('v6347cUser', r.user.email || r.user.id || '—');
    if(r.admin) set('v6347cAdmin', r.admin.ok ? String(r.admin.value) : ('error: '+(r.admin.error||'')));
    if(r.sensitive) set('v6347cSensitive', String(r.sensitive.length));
    if(r.tables) set('v6347cTables', (r.tables.backup.ok && r.tables.queue.ok) ? tr('passed') : tr('warning'));
    if(r.auditWrite) set('v6347cAudit', r.auditWrite.ok ? 'write ok' : ('error: '+(r.auditWrite.error||'')));
  }

  function renderLog(){
    var box=document.getElementById('v6347cLog'); if(!box) return;
    var arr=getLog(); if(!arr.length){box.innerHTML=''; return;}
    box.innerHTML=arr.map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details||{},null,2))+'</pre></details>';
    }).join('');
  }
  function showError(e){var msg=tr('error')+': '+(e&&e.message?e.message:e); status(msg,'error'); log('error',msg,{stack:e&&e.stack});}

  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('load',render);
  document.addEventListener('click',function(){setTimeout(render,80);},true);
  setInterval(render,4000);
  setTimeout(render,500);
  setTimeout(render,1800);

  window.OMIDENO7_V6347C_SECURITY_FIX_BETA = {testClient:testClient, runSecurity:runSecurity, findClient:findClient, version:VERSION};
})();
