/* Omideno7 V63.47 — Maximum Security Beta
   Beta-only. Public stable index.html is not affected.

   What this does safely in Beta:
   - Adds a maximum-security diagnostic panel.
   - Checks localStorage for dangerous keys/secrets.
   - Checks Supabase authenticated user/admin state.
   - Checks backup/queue/audit table access.
   - Writes a security audit event.
   - Adds guarded helpers for sanitizing display text.
   - Does NOT add service_role or any private secret.
   - Does NOT break the public app.
*/
(function(){
  'use strict';

  var VERSION = 'V63.47 Max Security Beta';
  var LOG_KEY = 'omideno7_v6347_max_security_log';
  var TABLE_AUDIT = 'security_audit_log';
  var TABLE_BACKUP = 'user_app_backups';
  var TABLE_QUEUE = 'offline_sync_queue';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){ try{return localStorage.getItem('lang') || document.documentElement.lang || 'fa';}catch(e){return 'fa';} }
  function tr(k){
    var fa = {
      title:'امنیت حداکثری — Beta V63.47',
      intro:'این پنل برای بالا بردن امنیت تا حد امکان در Beta است: بررسی کلیدهای حساس، دسترسی Supabase، RLS، لاگ امنیتی و ساختار امن کلود.',
      note:'هیچ وب‌اپی ۱۰۰٪ غیرقابل هک نیست؛ اما این مرحله حمله را سخت‌تر، آسیب را محدودتر و رفتارهای حساس را قابل ردیابی‌تر می‌کند.',
      run:'اجرای بررسی امنیت حداکثری',
      audit:'ثبت لاگ امنیتی',
      clear:'پاک کردن گزارش',
      status:'آماده بررسی امنیت حداکثری',
      running:'در حال بررسی...',
      ok:'امنیت حداکثری بررسی شد',
      error:'خطا',
      user:'کاربر',
      admin:'ادمین',
      sensitive:'کلیدهای حساس',
      rls:'RLS / دسترسی جدول‌ها',
      auditLog:'لاگ امنیتی',
      publicRisk:'ریسک Frontend عمومی',
      guidanceTitle:'اقدامات امنیتی لازم قبل از نسخه اصلی',
      g1:'هیچ Service Role Key یا secret در فایل‌های GitHub نباشد.',
      g2:'همه جدول‌های شخصی باید RLS فعال داشته باشند.',
      g3:'کاربر فقط داده‌های خودش را ببیند؛ ادمین فقط برای پشتیبانی دسترسی داشته باشد.',
      g4:'پنل‌های Beta و دکمه‌های تست از نسخه اصلی حذف یا فقط برای ادمین مخفی شوند.',
      g5:'فایل‌های صوتی مدرسه اگر خصوصی هستند، فقط برای کاربر تأییدشده قابل دانلود باشند.',
      passed:'موفق',
      warning:'هشدار'
    };
    var en = {
      title:'Maximum Security — Beta V63.47',
      intro:'This panel hardens and tests security in Beta: sensitive keys, Supabase access, RLS, audit logging, and secure cloud structure.',
      note:'No web app is 100% unhackable; this stage makes attacks harder, reduces impact, and improves auditability.',
      run:'Run maximum security check',
      audit:'Write security audit log',
      clear:'Clear log',
      status:'Ready for maximum security check',
      running:'Running...',
      ok:'Maximum security check completed',
      error:'Error',
      user:'User',
      admin:'Admin',
      sensitive:'Sensitive keys',
      rls:'RLS / table access',
      auditLog:'Security audit',
      publicRisk:'Public frontend risk',
      guidanceTitle:'Required security actions before stable release',
      g1:'No service role key or secret in GitHub files.',
      g2:'All personal tables must have RLS enabled.',
      g3:'Users see only their own data; admin access is support-only.',
      g4:'Beta panels/test buttons must be removed or admin-hidden in stable.',
      g5:'School audio must be downloadable only by approved users if private.',
      passed:'Passed',
      warning:'Warning'
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
  function status(msg,type){var el=document.getElementById('v6347SecStatus'); if(el){el.className='v6347-sec-status '+(type||'info'); el.textContent=msg;}}

  function findClient(){
    if(window.OMIDENO7_V6340_BETA && typeof window.OMIDENO7_V6340_BETA.findSupabaseClient === 'function'){
      var c=window.OMIDENO7_V6340_BETA.findSupabaseClient(); if(c) return c;
    }
    var names=['omideno7Supabase','schoolSupabase','supabaseClient'];
    for(var i=0;i<names.length;i++){
      var x=window[names[i]];
      if(x && x.auth && typeof x.from==='function') return x;
    }
    if(window.__om7SupabaseClients && window.__om7SupabaseClients.length) return window.__om7SupabaseClients[0];
    return null;
  }
  async function getCtx(){
    var sb=findClient();
    if(!sb) throw new Error('Supabase client not found. Login/open School once, then return to More.');
    var r=await sb.auth.getUser();
    if(r.error) throw r.error;
    var u=r.data && r.data.user;
    if(!u) throw new Error('User is not signed in.');
    return {sb:sb,user:u};
  }
  async function isAdmin(ctx){
    try{
      var r=await ctx.sb.rpc('omideno7_is_admin');
      if(r.error) return {ok:false,value:false,error:r.error.message};
      return {ok:true,value:!!r.data};
    }catch(e){return {ok:false,value:false,error:e.message||String(e)};}
  }
  function scanSensitive(){
    var found=[];
    var dangerousKey=/service_role|service-role|password|secret|apikey|api_key|private_key|client_secret/i;
    var dangerousVal=/service_role|service-role|BEGIN PRIVATE KEY|client_secret/i;
    try{
      for(var i=0;i<localStorage.length;i++){
        var k=localStorage.key(i);
        var v=localStorage.getItem(k)||'';
        if(dangerousKey.test(k) || dangerousVal.test(v)){
          found.push({key:k, reason:'dangerous key or value'});
        }
      }
    }catch(e){}
    return found;
  }
  async function checkTables(ctx){
    var out={};
    var b=await ctx.sb.from(TABLE_BACKUP).select('id').eq('user_id',ctx.user.id).limit(1);
    out.backup={ok:!b.error,error:b.error&&b.error.message};
    var q=await ctx.sb.from(TABLE_QUEUE).select('id').eq('user_id',ctx.user.id).limit(1);
    out.queue={ok:!q.error,error:q.error&&q.error.message};
    var a=await ctx.sb.from(TABLE_AUDIT).select('id').limit(1);
    out.auditSelect={ok:!a.error,error:a.error&&a.error.message};
    return out;
  }
  async function writeAudit(action, payload){
    var ctx=await getCtx();
    var r=await ctx.sb.from(TABLE_AUDIT).insert({
      user_id:ctx.user.id,
      action:action || 'max_security_check_v63_47',
      page:'beta-v63-47',
      metadata:payload || {},
      created_at:now()
    }).select('id').single();
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
    try{var aw=await writeAudit('max_security_check_v63_47',{sensitive:sensitive.length, admin:admin.value}); auditWrite={ok:true,id:aw.id};}
    catch(e){auditWrite={ok:false,error:e.message||String(e)};}
    var result={user:{id:ctx.user.id,email:ctx.user.email||null}, admin:admin, sensitive:sensitive, tables:tables, auditWrite:auditWrite, publicFrontend:true};
    var ok = !sensitive.length && tables.backup.ok && tables.queue.ok && auditWrite.ok;
    status(ok ? tr('ok') : tr('warning'), ok ? 'ok' : 'warn');
    log(ok?'success':'warn', tr('ok'), result);
    renderFields(result);
    return result;
  }

  function css(){
    if(document.getElementById('v6347SecCss')) return;
    var st=document.createElement('style');
    st.id='v6347SecCss';
    st.textContent=[
      '#v6347SecPanel{border-top:5px solid #111827!important;background:linear-gradient(160deg,#fff,#f8fafc)!important;display:block!important;visibility:visible!important;opacity:1!important;}',
      '.v6347-sec-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6347-sec-status.info{background:#eef4ff;color:#06146D}.v6347-sec-status.ok{background:#eaffef;color:#08751a}.v6347-sec-status.warn{background:#fff7df;color:#8a5a00}.v6347-sec-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6347-sec-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6347-sec-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6347-sec-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '.v6347-sec-guidance{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:12px;margin:12px 0}#v6347SecLog details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6347SecPanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }
  function html(){
    return '<div id="v6347SecPanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<p class="v6347-sec-status warn">'+esc(tr('note'))+'</p>'+
      '<div id="v6347SecStatus" class="v6347-sec-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6347-sec-grid">'+
        '<div><strong>'+esc(tr('user'))+':</strong> <span id="v6347SecUser">—</span></div>'+
        '<div><strong>'+esc(tr('admin'))+':</strong> <span id="v6347SecAdmin">—</span></div>'+
        '<div><strong>'+esc(tr('sensitive'))+':</strong> <span id="v6347SecSensitive">—</span></div>'+
        '<div><strong>'+esc(tr('rls'))+':</strong> <span id="v6347SecTables">—</span></div>'+
        '<div><strong>'+esc(tr('auditLog'))+':</strong> <span id="v6347SecAudit">—</span></div>'+
      '</div>'+
      '<div class="v6347-sec-actions">'+
        '<button type="button" class="btn primary" id="v6347SecRun">'+esc(tr('run'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6347SecAuditBtn">'+esc(tr('audit'))+'</button>'+
        '<button type="button" class="btn light" id="v6347SecClear">'+esc(tr('clear'))+'</button>'+
      '</div>'+
      '<div class="v6347-sec-guidance"><h4>'+esc(tr('guidanceTitle'))+'</h4><ol>'+
        '<li>'+esc(tr('g1'))+'</li><li>'+esc(tr('g2'))+'</li><li>'+esc(tr('g3'))+'</li><li>'+esc(tr('g4'))+'</li><li>'+esc(tr('g5'))+'</li>'+
      '</ol></div>'+
      '<div id="v6347SecLog"></div>'+
    '</div>';
  }
  function render(){
    css();
    var more=document.getElementById('more');
    if(!more) return;
    var p=document.getElementById('v6347SecPanel');
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
    var run=document.getElementById('v6347SecRun');
    if(run) run.onclick=function(ev){ if(ev){ev.preventDefault();ev.stopPropagation();} runSecurity().catch(showError); return false; };
    var audit=document.getElementById('v6347SecAuditBtn');
    if(audit) audit.onclick=function(ev){ if(ev){ev.preventDefault();ev.stopPropagation();} writeAudit('manual_security_audit_v63_47',{}).then(function(r){status('Audit OK','ok');log('success','Audit OK',r);}).catch(showError); return false; };
    var clear=document.getElementById('v6347SecClear');
    if(clear) clear.onclick=function(ev){ if(ev){ev.preventDefault();ev.stopPropagation();} localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); return false; };
  }
  function renderFields(r){
    var set=function(id,v){var el=document.getElementById(id); if(el) el.textContent=v;};
    set('v6347SecUser', r.user.email || r.user.id || '—');
    set('v6347SecAdmin', r.admin.ok ? String(r.admin.value) : ('error: '+(r.admin.error||'')));
    set('v6347SecSensitive', String(r.sensitive.length));
    set('v6347SecTables', (r.tables.backup.ok && r.tables.queue.ok) ? tr('passed') : tr('warning'));
    set('v6347SecAudit', r.auditWrite.ok ? 'write ok' : ('error: '+(r.auditWrite.error||'')));
  }
  function renderLog(){
    var box=document.getElementById('v6347SecLog'); if(!box) return;
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

  window.OMIDENO7_V6347_MAX_SECURITY_BETA = {runSecurity:runSecurity, writeAudit:writeAudit, version:VERSION};
})();
