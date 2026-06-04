/* Omideno7 V63.41g — Stable Beta Cloud Save/Restore
   Fixes V63.41f error: "Can't find variable: refreshFields".
   Beta-only. Stable index.html is not affected.
*/
(function(){
  'use strict';

  var VERSION = 'V63.41 Beta';
  var FULL = 'App Version: ' + VERSION;
  var AUTO_KEY = 'omideno7_v6341g_auto_enabled';
  var LOG_KEY = 'omideno7_v6341g_log';
  var LAST_SYNC_KEY = 'omideno7_v6341g_last_sync';
  var DAY_KEY = 'omideno7_v6341g_day';
  var autoTimer = null;
  var lastDay = 0;

  function isBeta(){ return /beta\.html/i.test(location.pathname) || /v=6341/i.test(location.search); }
  if(!isBeta()) return;

  function enDigits(s){
    return String(s == null ? '' : s)
      .replace(/[۰-۹]/g, function(d){ return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); })
      .replace(/[٠-٩]/g, function(d){ return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); });
  }
  function safeDay(v, fallback){
    var n = parseInt(enDigits(v), 10);
    if(!isFinite(n) || n < 1) return fallback || 1;
    return Math.min(n, 365);
  }
  function lang(){ try{return localStorage.getItem('lang') || document.documentElement.lang || 'fa';}catch(e){return 'fa';} }
  function now(){ return new Date().toISOString(); }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function tr(k){
    var fa = {
      title:'ذخیره و بازیابی خودکار — Beta V63.41G',
      intro:'این نسخه خطای refreshFields را حذف کرده و برای تست پایدارتر ساخته شده است.',
      ready:'آماده تست',
      save:'ذخیره الآن در کلود',
      restore:'بازیابی از کلود',
      autoOnBtn:'روشن کردن ذخیره خودکار',
      autoOffBtn:'خاموش کردن ذخیره خودکار',
      refresh:'تازه‌سازی وضعیت',
      clear:'پاک کردن گزارش',
      autoOn:'ذخیره خودکار روشن است',
      autoOff:'ذخیره خودکار خاموش است',
      saved:'ذخیره در کلود انجام شد',
      restored:'بازیابی از کلود انجام شد',
      err:'خطا',
      noClient:'کلاینت Supabase پیدا نشد. اول از بخش مدرسه وارد شوید.',
      noUser:'کاربر وارد حساب نشده است. اول در مدرسه وارد شوید.',
      empty:'در کلود هنوز داده‌ای برای بازیابی نیست.',
      day:'روز برنامه ۳۶۵',
      source:'منبع تشخیص',
      lang:'زبان',
      notif:'نوتیفیکیشن',
      last:'آخرین همگام‌سازی',
      help:'تست پیشنهادی: روز را در فیلد زیر ۱۲۱ بگذار و «ذخیره الآن در کلود» را بزن. بعد Supabase را Refresh کن. سپس Auto Save را روشن کن و روز را تغییر بده.'
    };
    var en = {
      title:'Auto Save & Restore — Beta V63.41G',
      intro:'This build removes the refreshFields error and provides a more stable beta test panel.',
      ready:'Ready',
      save:'Save now to cloud',
      restore:'Restore from cloud',
      autoOnBtn:'Enable auto-save',
      autoOffBtn:'Disable auto-save',
      refresh:'Refresh status',
      clear:'Clear log',
      autoOn:'Auto-save is ON',
      autoOff:'Auto-save is OFF',
      saved:'Cloud save completed',
      restored:'Cloud restore completed',
      err:'Error',
      noClient:'No Supabase client found. Sign in through School first.',
      noUser:'No signed-in user. Sign in through School first.',
      empty:'No cloud data to restore yet.',
      day:'Bible 365 day',
      source:'Detected from',
      lang:'Language',
      notif:'Notifications',
      last:'Last sync',
      help:'Suggested test: enter 121 in the day field and press Save now. Refresh Supabase. Then enable Auto Save and change the day.'
    };
    return (lang()==='en'?en:fa)[k] || fa[k] || k;
  }

  function visible(el){
    if(!el || !el.getBoundingClientRect) return false;
    var r=el.getBoundingClientRect(), st=getComputedStyle(el);
    return r.width>0 && r.height>0 && st.display!=='none' && st.visibility!=='hidden';
  }
  function inPanel(el){ return !!(el && el.closest && el.closest('#v6341gPanel,#v6341fPanel,#v6341eCloudPanel,#v6341dCloudPanel,#v6340CloudDiagnosticPanel')); }

  function detectDay(){
    // Manual beta field has priority because it is reliable for testing.
    var manual = document.getElementById('v6341gDayInput');
    if(manual && manual.value){
      var md = safeDay(manual.value, 0);
      if(md >= 1 && md <= 365) return {day: md, source: 'manual beta field'};
    }

    // Detect visible Bible365 select.
    var selects = Array.prototype.slice.call(document.querySelectorAll('select')).filter(visible);
    for(var i=0;i<selects.length;i++){
      var sel=selects[i];
      if(inPanel(sel)) continue;
      var opts = Array.prototype.slice.call(sel.options || []);
      var count = 0;
      opts.forEach(function(o){ var n=safeDay(o.value || o.textContent,0); if(n>=1&&n<=365) count++; });
      var n = safeDay(sel.value || (sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].textContent),0);
      if(n>=1 && n<=365 && count > 50) return {day:n, source:'Bible365 visible select'};
    }

    // Detect text "روز X از 365"
    var root = document.querySelector('.page.active') || document.body;
    var txt = '';
    try{
      var clone = root.cloneNode(true);
      Array.prototype.slice.call(clone.querySelectorAll('#v6341gPanel,#v6341fPanel,#v6341eCloudPanel,#v6341dCloudPanel,#v6340CloudDiagnosticPanel')).forEach(function(x){x.remove();});
      txt = enDigits(clone.innerText || '').replace(/\s+/g,' ');
    }catch(e){ txt = enDigits(document.body.innerText || '').replace(/\s+/g,' '); }
    var m = txt.match(/روز\s*(\d{1,3})\s*از\s*365/i) || txt.match(/day\s*(\d{1,3})\s*of\s*365/i);
    if(m){
      var td=safeDay(m[1],0);
      if(td>=1&&td<=365) return {day:td, source:'Bible365 visible text'};
    }

    // Storage fallback.
    var keys=[DAY_KEY,'om7_bible365_selected_day_v6331','om7_bible365_live_selected_day_v6329','om7_bible365_view_day','om7_bible365_current_day','omideno7Bible365ManualDayV6325'];
    for(var k=0;k<keys.length;k++){
      try{
        var sd=safeDay(localStorage.getItem(keys[k]),0);
        if(sd>=1&&sd<=365) return {day:sd, source:'storage: '+keys[k]};
      }catch(e){}
    }
    return {day:1, source:'default'};
  }

  function writeDay(day, source){
    day=safeDay(day,1);
    [DAY_KEY,'om7_bible365_current_day','om7_bible365_view_day','om7_bible365_selected_day_v6331','om7_bible365_live_selected_day_v6329','omideno7Bible365ManualDayV6325'].forEach(function(k){
      try{localStorage.setItem(k,String(day));}catch(e){}
    });
    try{localStorage.setItem('om7_bible365_started','1'); localStorage.setItem('omideno7_v6341g_day_source', source || 'write');}catch(e){}
    var input=document.getElementById('v6341gDayInput');
    if(input && String(input.value)!==String(day)) input.value=String(day);
  }

  function notif(){ try{return !!(window.Notification && Notification.permission==='granted');}catch(e){return false;} }
  function snap(){
    var d=detectDay();
    writeDay(d.day, d.source);
    return {
      language: lang(),
      current_day: d.day,
      selected_day: d.day,
      completed_days: [],
      notifications_enabled: !!notif(),
      timezone: (Intl && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : null) || null,
      day_source: d.source,
      captured_at: now()
    };
  }

  function client(){
    if(window.OMIDENO7_V6340_BETA && typeof window.OMIDENO7_V6340_BETA.findSupabaseClient==='function'){
      var c=window.OMIDENO7_V6340_BETA.findSupabaseClient(); if(c) return c;
    }
    var names=['omideno7Supabase','schoolSupabase','supabaseClient'];
    for(var i=0;i<names.length;i++){ var x=window[names[i]]; if(x&&x.auth&&typeof x.from==='function') return x; }
    if(window.__om7SupabaseClients && window.__om7SupabaseClients.length) return window.__om7SupabaseClients[0];
    return null;
  }
  async function userCtx(){
    var sb=client(); if(!sb) throw new Error(tr('noClient'));
    var r=await sb.auth.getUser(); if(r.error) throw r.error;
    var u=r.data&&r.data.user; if(!u) throw new Error(tr('noUser'));
    return {sb:sb,user:u};
  }

  function logs(){ try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];} }
  function log(type,msg,details){
    var a=logs(); a.unshift({time:now(),type:type||'info',message:String(msg||''),details:details||null});
    a=a.slice(0,30); try{localStorage.setItem(LOG_KEY,JSON.stringify(a));}catch(e){}
    drawLog();
  }
  function status(msg,type){
    var el=document.getElementById('v6341gStatus'); if(!el) return;
    el.className='v6341g-status '+(type||'info'); el.textContent=msg;
  }

  async function save(reason){
    var ctx=await userCtx(), sb=ctx.sb, u=ctx.user, s=snap(), tnow=now();
    var p1=await sb.from('user_profiles').upsert({user_id:u.id,email:u.email||null,language:s.language,updated_at:tnow},{onConflict:'user_id'});
    if(p1.error) throw p1.error;
    var p2=await sb.from('user_app_settings').upsert({user_id:u.id,language:s.language,notifications_enabled:!!s.notifications_enabled,timezone:s.timezone,updated_at:tnow},{onConflict:'user_id'});
    if(p2.error) throw p2.error;
    var p3=await sb.from('bible365_progress').upsert({user_id:u.id,current_day:s.current_day,selected_day:s.selected_day,completed_days:s.completed_days,last_read_at:tnow,updated_at:tnow},{onConflict:'user_id'});
    if(p3.error) throw p3.error;
    try{localStorage.setItem(LAST_SYNC_KEY,tnow);}catch(e){}
    log('success', tr('saved')+' — '+(reason||'manual'), s);
    status(tr('saved'),'ok');
    refresh();
  }

  async function restore(){
    var ctx=await userCtx(), sb=ctx.sb, uid=ctx.user.id;
    var pr=await sb.from('bible365_progress').select('*').eq('user_id',uid).maybeSingle();
    if(pr.error) throw pr.error;
    if(!pr.data){ status(tr('empty'),'warn'); log('warn',tr('empty')); return; }
    var day=safeDay(pr.data.selected_day || pr.data.current_day,1);
    writeDay(day,'cloud restore');
    try{localStorage.setItem(LAST_SYNC_KEY,now());}catch(e){}
    log('success',tr('restored'),pr.data);
    status(tr('restored'),'ok');
    refresh();
    try{ if(typeof window.renderBibleReader==='function') window.renderBibleReader(); if(typeof window.renderApp==='function') window.renderApp(); }catch(e){}
  }

  function auto(){ try{return localStorage.getItem(AUTO_KEY)==='1';}catch(e){return false;} }
  function setAuto(v){
    try{localStorage.setItem(AUTO_KEY,v?'1':'0');}catch(e){}
    refresh();
    if(v) schedule('auto-enabled');
  }
  function schedule(reason){
    if(!auto()) return;
    if(autoTimer) clearTimeout(autoTimer);
    autoTimer=setTimeout(function(){ save(reason||'auto').catch(showErr); },1600);
  }
  function showErr(e){
    var m=tr('err')+': '+(e&&e.message?e.message:e);
    log('error',m);
    status(m,'error');
  }

  function css(){
    if(document.getElementById('v6341gCss')) return;
    var st=document.createElement('style'); st.id='v6341gCss';
    st.textContent=[
      '#v6341gPanel{display:block!important;visibility:visible!important;opacity:1!important;height:auto!important;max-height:none!important;overflow:visible!important;border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f7fff8)!important;}',
      '.v6341g-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6341g-status.info{background:#eef4ff;color:#06146D}.v6341g-status.ok{background:#eaffef;color:#08751a}.v6341g-status.warn{background:#fff7df;color:#8a5a00}.v6341g-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6341g-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin:12px 0}.v6341g-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6341g-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '#v6341gDayInput{width:120px;padding:10px;border:1px solid #d8deea;border-radius:12px;font-weight:800;text-align:center}.fa #v6341gPanel{direction:rtl;text-align:right}#v6341gLog details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}'
    ].join('\n');
    document.head.appendChild(st);
  }
  function html(){
    return '<div id="v6341gPanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3><p>'+esc(tr('intro'))+'</p><div id="v6341gStatus" class="v6341g-status info">'+esc(tr('ready'))+'</div>'+
      '<div class="v6341g-grid"><div><strong>'+esc(tr('lang'))+':</strong> <span id="v6341gLang">—</span></div><div><strong>'+esc(tr('day'))+':</strong> <span id="v6341gDay">—</span></div><div><strong>Source:</strong> <span id="v6341gSource">—</span></div><div><strong>'+esc(tr('notif'))+':</strong> <span id="v6341gNotif">—</span></div><div><strong>'+esc(tr('last'))+':</strong> <span id="v6341gLast">—</span></div><div><strong id="v6341gAutoText">—</strong></div></div>'+
      '<label style="display:block;margin:10px 0;"><strong>'+esc(tr('day'))+': </strong><input id="v6341gDayInput" type="number" min="1" max="365"></label>'+
      '<div class="v6341g-actions"><button type="button" class="btn primary" id="v6341gAutoBtn">'+esc(tr('autoOnBtn'))+'</button><button type="button" class="btn gold" id="v6341gSave">'+esc(tr('save'))+'</button><button type="button" class="btn secondary" id="v6341gRestore">'+esc(tr('restore'))+'</button><button type="button" class="btn light" id="v6341gRefresh">'+esc(tr('refresh'))+'</button><button type="button" class="btn light" id="v6341gClear">'+esc(tr('clear'))+'</button></div>'+
      '<p class="small">'+esc(tr('help'))+'</p><div id="v6341gLog"></div></div>';
  }

  function render(){
    css();
    var more=document.getElementById('more'); if(!more) return;
    ['v6341fPanel','v6341eCloudPanel','v6341dCloudPanel','v6341CloudPanel'].forEach(function(id){var old=document.getElementById(id); if(old) old.style.display='none';});
    var p=document.getElementById('v6341gPanel');
    if(!p){ var footer=more.querySelector('.footer'); var w=document.createElement('div'); w.innerHTML=html(); p=w.firstElementChild; more.insertBefore(p,footer||null); }
    bind(); refresh(); drawLog(); stableVersion();
  }
  function bind(){
    function b(id,fn){var el=document.getElementById(id); if(!el||el.dataset.b) return; el.dataset.b='1'; el.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();fn();return false;},true);}
    b('v6341gAutoBtn',function(){setAuto(!auto());});
    b('v6341gSave',function(){save('manual').catch(showErr);});
    b('v6341gRestore',function(){restore().catch(showErr);});
    b('v6341gRefresh',refresh);
    b('v6341gClear',function(){localStorage.removeItem(LOG_KEY); drawLog(); status(tr('ready'),'info');});
    var inp=document.getElementById('v6341gDayInput');
    if(inp && !inp.dataset.b){ inp.dataset.b='1'; inp.addEventListener('change',function(){writeDay(inp.value,'manual input'); schedule('manual-input'); refresh();},true); }
  }
  function refresh(){
    var d=detectDay();
    var set=function(id,v){var el=document.getElementById(id); if(el) el.textContent=v;};
    set('v6341gLang',lang()); set('v6341gDay',String(d.day)); set('v6341gSource',d.source); set('v6341gNotif',String(notif())); set('v6341gLast',localStorage.getItem(LAST_SYNC_KEY)||'—');
    var inp=document.getElementById('v6341gDayInput'); if(inp && String(inp.value)!==String(d.day)) inp.value=String(d.day);
    var on=auto(); var tx=document.getElementById('v6341gAutoText'); if(tx) tx.textContent=on?tr('autoOn'):tr('autoOff');
    var btn=document.getElementById('v6341gAutoBtn'); if(btn){btn.textContent=on?tr('autoOffBtn'):tr('autoOnBtn'); btn.className='btn '+(on?'light':'primary');}
    bind();
  }
  function drawLog(){
    var box=document.getElementById('v6341gLog'); if(!box) return;
    var a=logs(); if(!a.length){box.innerHTML=''; return;}
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
      if(h){var badge=document.getElementById('v6341gHeaderVersion'); if(!badge){badge=document.createElement('div'); badge.id='v6341gHeaderVersion'; badge.style.cssText='position:absolute;left:50%;transform:translateX(-50%);top:8px;color:#fff;font-weight:800;font-size:14px;z-index:50;pointer-events:none;'; h.style.position=h.style.position||'relative'; h.appendChild(badge);} badge.textContent=FULL;}
    }catch(e){}
  }

  function watchers(){
    if(window.__om7v6341gWatch) return; window.__om7v6341gWatch=true;
    function check(reason){ var d=detectDay(); if(lastDay && d.day!==lastDay) schedule(reason||'day-change'); lastDay=d.day; refresh(); }
    document.addEventListener('change',function(){setTimeout(function(){check('change');},100);},true);
    document.addEventListener('click',function(){setTimeout(function(){check('click');},700);},true);
    try{ new MutationObserver(function(){setTimeout(function(){check('mutation');},900);}).observe(document.body,{childList:true,subtree:true,characterData:true}); }catch(e){}
    window.addEventListener('online',function(){schedule('online');});
  }

  document.addEventListener('DOMContentLoaded',function(){render();watchers();});
  window.addEventListener('load',function(){render();watchers(); if(auto()) schedule('load');});
  setInterval(function(){render();stableVersion();},2000);
  setTimeout(render,300); setTimeout(render,1200); setTimeout(render,2500);

  window.OMIDENO7_V6341G_BETA={save:save,restore:restore,snapshot:snap,detectDay:detectDay,version:VERSION};
})();
