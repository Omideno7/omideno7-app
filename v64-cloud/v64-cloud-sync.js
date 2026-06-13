/* Omideno7 V64.01 — Cloud Sync + Offline + QR Install Test
   This file runs only inside /v64-cloud/ and does not touch the public app.
   Purpose:
   - Add a More-page panel for cloud save/restore, offline preparation, QR install/share.
   - Save safe localStorage app-state to Supabase table public.user_app_state.
   - Restore app-state after reinstall/login.
   - Prepare current app assets for offline use through a separate service worker.
*/
(function(){
  'use strict';
  var VERSION = 'V64.01 Cloud/Offline/QR Test';
  var TABLE = 'user_app_state';
  var AUTO_KEY = 'omideno7_v64_auto_sync_enabled';
  var LAST_KEY = 'omideno7_v64_last_sync';
  var QUEUE_KEY = 'omideno7_v64_offline_queue';
  var RESTORE_PROMPT_KEY = 'omideno7_v64_restore_prompt_seen';
  var saveTimer = null;
  var lastRendered = 0;
  var installPromptEvent = null;

  function isV64(){ return /\/v64-cloud\//i.test(location.pathname); }
  if(!isV64()) return;

  function lang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
    catch(e){ return 'fa'; }
  }
  function dict(){
    var fa={
      title:'☁️ ذخیره ابری، آفلاین و نصب اپ — تست V64',
      intro:'این بخش فقط برای تست است. اپ اصلی دست‌نخورده می‌ماند. اطلاعات امن کاربر در کلود ذخیره می‌شود و اپ برای استفاده آفلاین آماده می‌شود.',
      signedOut:'برای ذخیره ابری، اول وارد مدرسه/حساب کاربری شوید. آفلاین و QR بدون ورود هم کار می‌کند.',
      signedIn:'کاربر وارد شده است',
      save:'ذخیره در کلود', restore:'بازیابی از کلود', autoOn:'روشن کردن ذخیره خودکار', autoOff:'خاموش کردن ذخیره خودکار', offline:'آماده‌سازی آفلاین', share:'اشتراک‌گذاری لینک اپ', copy:'کپی لینک اپ', install:'نصب اپ روی این گوشی',
      qrTitle:'📲 نصب روی گوشی دیگر', qrHelp:'این QR را با گوشی دیگر اسکن کنید. در اندروید دکمه نصب نمایش داده می‌شود. در آیفون باید Safari > Share > Add to Home Screen را انتخاب کند.',
      saved:'ذخیره ابری انجام شد', restored:'بازیابی انجام شد. برای دیدن کامل نتیجه، صفحه را یک بار رفرش کنید.', noCloud:'هنوز اطلاعاتی در کلود پیدا نشد.', autoEnabled:'ذخیره خودکار روشن شد', autoDisabled:'ذخیره خودکار خاموش شد', copied:'لینک اپ کپی شد', offlineReady:'آماده‌سازی آفلاین کامل شد', working:'در حال انجام...', error:'خطا', last:'آخرین همگام‌سازی', items:'تعداد داده‌ها', size:'حجم تقریبی', online:'آنلاین', offlineStatus:'آفلاین', reload:'رفرش صفحه',
      ios:'آیفون: لینک را در Safari باز کنید، Share را بزنید، سپس Add to Home Screen و Add.', android:'اندروید: لینک را در Chrome باز کنید و Install App / Add to Home screen را بزنید.'
    };
    var en={
      title:'☁️ Cloud Save, Offline & App Install — V64 Test',
      intro:'This panel is for testing only. The public app stays untouched. Safe user app data is saved to cloud and the app can be prepared for offline use.',
      signedOut:'For cloud sync, sign in through School/account first. Offline and QR work without login.', signedIn:'Signed in user',
      save:'Save to cloud', restore:'Restore from cloud', autoOn:'Enable auto save', autoOff:'Disable auto save', offline:'Prepare offline', share:'Share app link', copy:'Copy app link', install:'Install app on this device',
      qrTitle:'📲 Install on another phone', qrHelp:'Scan this QR with another phone. Android may show an install button. On iPhone use Safari > Share > Add to Home Screen.',
      saved:'Cloud save completed', restored:'Restore completed. Refresh once to see all restored data.', noCloud:'No cloud data found yet.', autoEnabled:'Auto save enabled', autoDisabled:'Auto save disabled', copied:'App link copied', offlineReady:'Offline preparation completed', working:'Working...', error:'Error', last:'Last sync', items:'Saved items', size:'Approx. size', online:'Online', offlineStatus:'Offline', reload:'Reload page',
      ios:'iPhone: open the link in Safari, tap Share, then Add to Home Screen and Add.', android:'Android: open the link in Chrome and tap Install App / Add to Home screen.'
    };
    var hr={
      title:'☁️ Cloud spremanje, offline i instalacija — V64 test',
      intro:'Ovaj panel je samo za test. Javna aplikacija ostaje netaknuta. Sigurni korisnički podaci spremaju se u cloud, a aplikacija se može pripremiti za offline rad.',
      signedOut:'Za cloud sync prvo se prijavite kroz školu/račun. Offline i QR rade i bez prijave.', signedIn:'Prijavljeni korisnik',
      save:'Spremi u cloud', restore:'Vrati iz clouda', autoOn:'Uključi auto spremanje', autoOff:'Isključi auto spremanje', offline:'Pripremi offline', share:'Podijeli link aplikacije', copy:'Kopiraj link aplikacije', install:'Instaliraj aplikaciju',
      qrTitle:'📲 Instalacija na drugi telefon', qrHelp:'Skenirajte QR drugim telefonom. Android može prikazati gumb za instalaciju. Na iPhoneu koristite Safari > Share > Add to Home Screen.',
      saved:'Cloud spremanje završeno', restored:'Vraćanje završeno. Osvježite stranicu za puni rezultat.', noCloud:'Još nema podataka u cloudu.', autoEnabled:'Auto spremanje uključeno', autoDisabled:'Auto spremanje isključeno', copied:'Link aplikacije kopiran', offlineReady:'Offline priprema završena', working:'Obrada...', error:'Greška', last:'Zadnji sync', items:'Broj podataka', size:'Približna veličina', online:'Online', offlineStatus:'Offline', reload:'Osvježi stranicu',
      ios:'iPhone: otvorite link u Safariju, tapnite Share, zatim Add to Home Screen i Add.', android:'Android: otvorite link u Chromeu i tapnite Install App / Add to Home screen.'
    };
    var l=lang(); return l==='hr'?hr:(l==='en'?en:fa);
  }
  function tr(k){ var d=dict(); return d[k] || k; }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function now(){ return new Date().toISOString(); }
  function appUrl(){ return 'https://omideno7.github.io/omideno7-app/?install=1'; }
  function status(msg,type){
    var el=document.getElementById('v64CloudStatus'); if(!el) return;
    el.className='v64-status '+(type||'info'); el.textContent=msg;
  }
  function setLast(syncType){ try{ localStorage.setItem(LAST_KEY, JSON.stringify({time:now(), type:syncType||'manual'})); }catch(e){} renderStats(); }
  function getLast(){ try{return JSON.parse(localStorage.getItem(LAST_KEY)||'null');}catch(e){return null;} }

  function findClient(){
    var names=['omideno7Supabase','schoolSupabase','supabaseClient'];
    for(var i=0;i<names.length;i++){ var x=window[names[i]]; if(x && x.auth && typeof x.from==='function') return x; }
    if(window.__om7SupabaseClients && window.__om7SupabaseClients.length) return window.__om7SupabaseClients[0];
    return null;
  }
  async function getUserCtx(){
    var sb=findClient();
    if(!sb) throw new Error('Supabase client not found. Open School once or make sure v63-40-supabase-client-bridge.js loads before school.');
    var r=await sb.auth.getUser();
    if(r.error) throw r.error;
    var u=r.data && r.data.user;
    if(!u) throw new Error('No signed-in user.');
    return {sb:sb,user:u};
  }

  function forbiddenKey(key){
    key=String(key||'').toLowerCase();
    return /supabase\.auth|sb-|auth-token|access_token|refresh_token|jwt|service_role|apikey|api_key|secret|password|token|onesignal|private|bearer/i.test(key);
  }
  function importantKey(key){
    var k=String(key||'').toLowerCase();
    if(forbiddenKey(k)) return false;
    return /omideno7|om7|lang|language|bible|365|reading|plan|note|notes|verse|saved|bookmark|favorite|highlight|school|student|lesson|assignment|exam|reward|medal|gratitude|thanksgiving|fasting|daily|declaration|prayer|settings|theme|notification/.test(k);
  }
  function category(key){
    var k=String(key||'').toLowerCase();
    if(/school|student|lesson|assignment|exam/.test(k)) return 'school';
    if(/bible|365|reading|plan/.test(k)) return 'bible';
    if(/note|notes/.test(k)) return 'notes';
    if(/verse|bookmark|favorite|saved|highlight/.test(k)) return 'saved_verses';
    if(/reward|medal/.test(k)) return 'rewards';
    if(/lang|language|settings|theme|notification/.test(k)) return 'settings';
    if(/gratitude|thanksgiving|fasting|daily|declaration|prayer/.test(k)) return 'daily_content';
    return 'other';
  }
  function parseMaybe(v){
    if(v==null) return null;
    try{ return JSON.parse(v); }catch(e){ return v; }
  }
  function buildSnapshot(){
    var items={}, cats={}, total=0;
    try{
      for(var i=0;i<localStorage.length;i++){
        var key=localStorage.key(i); if(!importantKey(key)) continue;
        var val=localStorage.getItem(key); if(val==null) continue;
        var cat=category(key);
        items[key]={value:val, parsed:parseMaybe(val), category:cat, length:String(val).length};
        cats[cat]=(cats[cat]||0)+1; total += String(val).length;
      }
    }catch(e){}
    var snap={
      version:VERSION,
      created_at:now(),
      origin:location.origin,
      path:location.pathname,
      language:lang(),
      user_agent:navigator.userAgent,
      categories:cats,
      total_size:total,
      item_count:Object.keys(items).length,
      items:items
    };
    return snap;
  }
  function applySnapshot(snap){
    if(!snap || !snap.items) return 0;
    var count=0;
    Object.keys(snap.items).forEach(function(key){
      if(forbiddenKey(key)) return;
      var it=snap.items[key];
      var val = it && typeof it.value === 'string' ? it.value : JSON.stringify(it && it.parsed != null ? it.parsed : it);
      try{ localStorage.setItem(key, val); count++; }catch(e){}
    });
    return count;
  }

  async function saveCloud(auto){
    status(tr('working'),'info');
    var snap=buildSnapshot();
    if(!navigator.onLine){ queueSnapshot(snap); status(tr('offlineStatus')+' — queued','warn'); return; }
    var ctx=await getUserCtx();
    var row={ user_id:ctx.user.id, email:ctx.user.email || '', app_state:snap, updated_at:now() };
    var res=await ctx.sb.from(TABLE).upsert(row, {onConflict:'user_id'}).select('updated_at').single();
    if(res.error) throw res.error;
    setLast(auto?'auto':'manual');
    status(tr('saved')+' — '+snap.item_count+' '+tr('items'),'ok');
  }
  async function restoreCloud(){
    status(tr('working'),'info');
    var ctx=await getUserCtx();
    var res=await ctx.sb.from(TABLE).select('app_state,updated_at,email').eq('user_id', ctx.user.id).maybeSingle();
    if(res.error) throw res.error;
    if(!res.data || !res.data.app_state){ status(tr('noCloud'),'warn'); return; }
    var count=applySnapshot(res.data.app_state);
    setLast('restore');
    status(tr('restored')+' — '+count+' '+tr('items'),'ok');
  }
  function queueSnapshot(snap){
    var arr=[]; try{arr=JSON.parse(localStorage.getItem(QUEUE_KEY)||'[]');}catch(e){arr=[];}
    arr.push({time:now(), snapshot:snap}); arr=arr.slice(-5);
    try{ localStorage.setItem(QUEUE_KEY, JSON.stringify(arr)); }catch(e){}
  }
  async function flushQueue(){
    if(!navigator.onLine) return;
    var arr=[]; try{arr=JSON.parse(localStorage.getItem(QUEUE_KEY)||'[]');}catch(e){arr=[];}
    if(!arr.length) return;
    try{ await saveCloud(true); localStorage.removeItem(QUEUE_KEY); }catch(e){}
  }
  function autoEnabled(){ return localStorage.getItem(AUTO_KEY)==='1'; }
  function scheduleAuto(){
    if(!autoEnabled()) return;
    clearTimeout(saveTimer);
    saveTimer=setTimeout(function(){ saveCloud(true).catch(function(e){ status(tr('error')+': '+(e.message||e),'error'); }); }, 2500);
  }
  function patchStorage(){
    if(window.__om7V64StoragePatched) return; window.__om7V64StoragePatched=true;
    var oldSet=localStorage.setItem, oldRemove=localStorage.removeItem;
    localStorage.setItem=function(k,v){ var r=oldSet.apply(this,arguments); try{ if(importantKey(k)) scheduleAuto(); }catch(e){} return r; };
    localStorage.removeItem=function(k){ var r=oldRemove.apply(this,arguments); try{ if(importantKey(k)) scheduleAuto(); }catch(e){} return r; };
  }

  async function prepareOffline(){
    status(tr('working'),'info');
    if(!('caches' in window)){ status('Cache API not available','error'); return; }
    await registerSW();
    var assets=[];
    function add(u){ if(!u) return; try{ assets.push(new URL(u, location.href).href); }catch(e){} }
    add(location.href.split('#')[0]);
    add('/omideno7-app/v64-cloud/index.html?v=6401');
    add('/omideno7-app/v64-cloud/v64-cloud-sync.js?v=6401');
    add('/omideno7-app/v64-cloud/manifest-v64-cloud.webmanifest');
    add('/omideno7-app/v64-cloud/omideno7-app-qr.png');
    Array.prototype.forEach.call(document.querySelectorAll('script[src],link[rel="stylesheet"][href],link[rel="manifest"][href],img[src]'), function(el){ add(el.src || el.href); });
    assets = Array.from(new Set(assets)).filter(function(u){ return u.indexOf(location.origin)===0; });
    var cache=await caches.open('omideno7-v64-manual-cache-6401');
    var ok=0, fail=0;
    for(var i=0;i<assets.length;i++){
      try{ await cache.add(assets[i]); ok++; }catch(e){ fail++; }
    }
    status(tr('offlineReady')+' — '+ok+' ok / '+fail+' fail','ok');
  }
  async function registerSW(){
    if(!('serviceWorker' in navigator)) return null;
    try{
      return await navigator.serviceWorker.register('/omideno7-app/v64-cloud/sw-v64-cloud.js', {scope:'/omideno7-app/v64-cloud/'});
    }catch(e){ status('SW: '+(e.message||e),'warn'); return null; }
  }

  function installInstructions(){
    var ua=navigator.userAgent || '';
    var ios=/iphone|ipad|ipod/i.test(ua);
    return ios ? tr('ios') : tr('android');
  }
  function addInstallListeners(){
    window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); installPromptEvent=e; renderPanel(); });
  }
  async function installThisDevice(){
    if(installPromptEvent){
      installPromptEvent.prompt();
      try{ await installPromptEvent.userChoice; }catch(e){}
      installPromptEvent=null; return;
    }
    alert(installInstructions());
  }
  async function copyLink(){
    try{ await navigator.clipboard.writeText(appUrl()); status(tr('copied'),'ok'); }
    catch(e){ prompt('Copy link:', appUrl()); }
  }
  async function shareLink(){
    if(navigator.share){
      try{ await navigator.share({title:'New Hope 7 App', text:'New Hope 7 Church App', url:appUrl()}); }catch(e){}
    } else copyLink();
  }

  function statsHtml(){
    var snap=buildSnapshot(); var last=getLast(); var online=navigator.onLine?tr('online'):tr('offlineStatus');
    return '<div class="v64-stats"><span>'+esc(online)+'</span><span>'+esc(tr('items'))+': '+snap.item_count+'</span><span>'+esc(tr('size'))+': '+Math.round((snap.total_size||0)/1024)+' KB</span><span>'+esc(tr('last'))+': '+esc(last?last.time:'—')+'</span></div>';
  }
  function renderStats(){ var el=document.getElementById('v64CloudStats'); if(el) el.innerHTML=statsHtml(); }

  function renderPanel(){
    if(Date.now()-lastRendered<300) return; lastRendered=Date.now();
    var more=document.getElementById('more'); if(!more) return;
    var existing=document.getElementById('v64CloudCard');
    var qrSrc='v64-cloud/omideno7-app-qr.png';
    var html='<div class="card v64-cloud-card" id="v64CloudCard" dir="auto">'
      +'<style>.v64-cloud-card{border:1px solid rgba(212,175,55,.35);box-shadow:0 12px 30px rgba(0,0,0,.18)}.v64-status{margin-top:10px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.08);font-size:13px}.v64-status.ok{background:rgba(21,128,61,.16)}.v64-status.warn{background:rgba(217,119,6,.16)}.v64-status.error{background:rgba(220,38,38,.16)}.v64-stats{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.v64-stats span{font-size:12px;padding:6px 8px;border-radius:999px;background:rgba(255,255,255,.08)}.v64-qr-wrap{display:flex;gap:14px;align-items:center;flex-wrap:wrap}.v64-qr{width:150px;height:150px;background:#fff;border-radius:14px;padding:8px}.v64-small{font-size:13px;opacity:.86;line-height:1.7}</style>'
      +'<h3>'+esc(tr('title'))+'</h3><p>'+esc(tr('intro'))+'</p>'
      +'<div id="v64CloudStats">'+statsHtml()+'</div>'
      +'<div class="btn-row"><button class="btn gold" id="v64SaveCloud">'+esc(tr('save'))+'</button><button class="btn secondary" id="v64RestoreCloud">'+esc(tr('restore'))+'</button></div>'
      +'<div class="btn-row"><button class="btn primary" id="v64ToggleAuto">'+esc(autoEnabled()?tr('autoOff'):tr('autoOn'))+'</button><button class="btn secondary" id="v64PrepareOffline">'+esc(tr('offline'))+'</button><button class="btn secondary" id="v64Reload">'+esc(tr('reload'))+'</button></div>'
      +'<p id="v64CloudStatus" class="v64-status">'+esc(tr('signedOut'))+'</p>'
      +'<hr style="border:0;border-top:1px solid rgba(255,255,255,.12);margin:16px 0">'
      +'<h3>'+esc(tr('qrTitle'))+'</h3><div class="v64-qr-wrap"><img class="v64-qr" src="'+esc(qrSrc)+'" alt="New Hope 7 app QR"><div><p class="v64-small">'+esc(tr('qrHelp'))+'</p><p class="v64-small"><strong>Link:</strong><br>'+esc(appUrl())+'</p><div class="btn-row"><button class="btn gold" id="v64InstallThis">'+esc(tr('install'))+'</button><button class="btn secondary" id="v64ShareLink">'+esc(tr('share'))+'</button><button class="btn secondary" id="v64CopyLink">'+esc(tr('copy'))+'</button></div></div></div>'
      +'</div>';
    if(existing){ existing.outerHTML=html; } else {
      var footer=document.getElementById('mainFooter');
      if(footer && footer.parentNode===more) more.insertBefore(document.createRange().createContextualFragment(html), footer);
      else more.appendChild(document.createRange().createContextualFragment(html));
    }
    bindPanel();
    checkSignedIn();
  }
  function bindPanel(){
    function on(id,fn){ var el=document.getElementById(id); if(el) el.onclick=function(){ Promise.resolve(fn()).catch(function(e){status(tr('error')+': '+(e.message||e),'error');}); }; }
    on('v64SaveCloud', function(){ return saveCloud(false); });
    on('v64RestoreCloud', restoreCloud);
    on('v64PrepareOffline', prepareOffline);
    on('v64ToggleAuto', function(){ if(autoEnabled()){localStorage.removeItem(AUTO_KEY); status(tr('autoDisabled'),'warn');} else {localStorage.setItem(AUTO_KEY,'1'); status(tr('autoEnabled'),'ok'); scheduleAuto();} renderPanel(); });
    on('v64Reload', function(){ location.reload(); });
    on('v64CopyLink', copyLink);
    on('v64ShareLink', shareLink);
    on('v64InstallThis', installThisDevice);
  }
  async function checkSignedIn(){
    var el=document.getElementById('v64CloudStatus'); if(!el) return;
    try{ var ctx=await getUserCtx(); el.textContent=tr('signedIn')+': '+(ctx.user.email||ctx.user.id); el.className='v64-status ok'; maybePromptRestore(ctx); }
    catch(e){ if(el.textContent===tr('signedOut')) return; el.textContent=tr('signedOut'); el.className='v64-status warn'; }
  }
  async function maybePromptRestore(ctx){
    if(localStorage.getItem(RESTORE_PROMPT_KEY)==='1') return;
    try{
      var res=await ctx.sb.from(TABLE).select('updated_at,app_state').eq('user_id', ctx.user.id).maybeSingle();
      if(res.error || !res.data || !res.data.app_state) return;
      localStorage.setItem(RESTORE_PROMPT_KEY,'1');
      // Keep it non-invasive: status only, no blocking popup.
      status('Cloud backup found: '+(res.data.updated_at||'')+' — '+tr('restore')+'?', 'ok');
    }catch(e){}
  }

  function init(){
    addInstallListeners();
    patchStorage();
    registerSW();
    document.addEventListener('click', function(){ setTimeout(renderPanel, 100); }, true);
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden') scheduleAuto(); });
    window.addEventListener('online', function(){ flushQueue(); status(tr('online'),'ok'); });
    window.addEventListener('offline', function(){ status(tr('offlineStatus'),'warn'); });
    [250,800,1600,3000].forEach(function(ms){ setTimeout(renderPanel, ms); });
    if(autoEnabled()) setTimeout(scheduleAuto, 3500);
    window.OMIDENO7_V64_CLOUD = {version:VERSION, saveCloud:saveCloud, restoreCloud:restoreCloud, buildSnapshot:buildSnapshot, prepareOffline:prepareOffline};
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
