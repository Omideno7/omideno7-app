/* Omideno7 V63.42 — Offline Foundation Beta
   Beta-only. Does not modify stable index.html.

   This is the safe first offline layer:
   - No service worker yet, so it cannot affect the public app.
   - Caches already-loaded static files into Cache Storage.
   - Saves a local offline snapshot: language, Bible365 day, Daily Word card, visible page title.
   - Creates a local offline action queue for future sync.
   - Adds an admin-only test panel in More.

   True "open from zero while offline" will be V63.43 after this safe cache/queue layer is verified.
*/
(function(){
  'use strict';

  var VERSION = 'V63.42 Offline Foundation Beta';
  var CACHE_NAME = 'omideno7-beta-offline-v6342';
  var SNAPSHOT_KEY = 'omideno7_v6342_offline_snapshot';
  var QUEUE_KEY = 'omideno7_v6342_offline_queue';
  var LOG_KEY = 'omideno7_v6342_offline_log';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
    catch(e){ return 'fa'; }
  }

  function tr(k){
    var fa = {
      title:'آفلاین پایه — Beta V63.42',
      intro:'این مرحله اول آفلاین است و فقط در Beta کار می‌کند. هنوز Service Worker عمومی فعال نشده تا اپ اصلی کاربران خراب نشود.',
      prepare:'آماده‌سازی آفلاین پایه',
      test:'تست وضعیت آفلاین',
      queue:'ثبت تست در صف آفلاین',
      syncQueue:'ارسال صف آفلاین به کلود',
      clear:'پاک کردن گزارش آفلاین',
      status:'آماده تست آفلاین',
      cached:'فایل‌ها برای آفلاین پایه ذخیره شدند',
      tested:'تست آفلاین انجام شد',
      queued:'یک مورد تستی در صف آفلاین ثبت شد',
      synced:'صف آفلاین پردازش شد',
      error:'خطا',
      online:'اینترنت',
      cacheItems:'تعداد فایل‌های کش‌شده',
      snapshot:'اسنپ‌شات محلی',
      queueItems:'موارد در صف آفلاین',
      help:'در این نسخه فقط لایه امن کش و صف آفلاین را تست می‌کنیم. باز شدن کامل اپ از صفر بدون اینترنت در مرحله بعد با Service Worker جداگانه تست می‌شود.',
      warning:'مهم: این نسخه روی اپ اصلی کاربران اثر ندارد.'
    };
    var en = {
      title:'Offline Foundation — Beta V63.42',
      intro:'First safe offline layer for Beta only. No public Service Worker yet, so the stable app is not affected.',
      prepare:'Prepare basic offline cache',
      test:'Test offline status',
      queue:'Add test offline queue item',
      syncQueue:'Sync offline queue to cloud',
      clear:'Clear offline log',
      status:'Ready for offline test',
      cached:'Basic offline files cached',
      tested:'Offline test completed',
      queued:'Test item added to offline queue',
      synced:'Offline queue processed',
      error:'Error',
      online:'Network',
      cacheItems:'Cached files',
      snapshot:'Local snapshot',
      queueItems:'Offline queue items',
      help:'This beta only tests the safe cache and offline queue layer. Full cold-start offline app loading will be tested next with an isolated Service Worker.',
      warning:'Important: this version does not affect public users.'
    };
    return (lang()==='en'?en:fa)[k] || fa[k] || k;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function now(){ return new Date().toISOString(); }

  function log(type, message, details){
    var arr = [];
    try { arr = JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); } catch(e){ arr = []; }
    arr.unshift({time:now(), type:type || 'info', message:String(message || ''), details:details || null});
    arr = arr.slice(0, 40);
    try { localStorage.setItem(LOG_KEY, JSON.stringify(arr)); } catch(e){}
    renderLog();
  }

  function getLog(){
    try { return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); } catch(e){ return []; }
  }

  function status(msg, type){
    var el = document.getElementById('v6342Status');
    if(!el) return;
    el.className = 'v6342-status ' + (type || 'info');
    el.textContent = msg;
  }

  function safeDay(v){
    var n = parseInt(String(v || '').replace(/[۰-۹]/g, function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d);}), 10);
    if(!isFinite(n) || n < 1) return 1;
    return Math.min(n, 365);
  }

  function currentBibleDay(){
    try{
      if(window.OMIDENO7_V6341G_BETA && typeof window.OMIDENO7_V6341G_BETA.detectDay === 'function'){
        var d = window.OMIDENO7_V6341G_BETA.detectDay();
        if(d && d.day) return {day:safeDay(d.day), source:d.source || 'v6341g'};
      }
    }catch(e){}
    var keys = ['omideno7_v6341g_day','om7_bible365_selected_day_v6331','om7_bible365_view_day','om7_bible365_current_day'];
    for(var i=0;i<keys.length;i++){
      try{
        var v = localStorage.getItem(keys[i]);
        if(v) return {day:safeDay(v), source:'localStorage:'+keys[i]};
      }catch(e){}
    }
    return {day:1, source:'default'};
  }

  function collectUrls(){
    var urls = {};
    function add(u){
      if(!u) return;
      try{
        var abs = new URL(u, location.href).href;
        if(abs.indexOf(location.origin) === 0) urls[abs] = true;
      }catch(e){}
    }

    add('beta.html');
    add(location.pathname + location.search);
    Array.prototype.slice.call(document.querySelectorAll('script[src]')).forEach(function(el){ add(el.getAttribute('src')); });
    Array.prototype.slice.call(document.querySelectorAll('link[href]')).forEach(function(el){
      var rel = (el.getAttribute('rel') || '').toLowerCase();
      if(/stylesheet|manifest|icon|apple-touch-icon/.test(rel)) add(el.getAttribute('href'));
    });
    Array.prototype.slice.call(document.querySelectorAll('img[src]')).forEach(function(el){ add(el.getAttribute('src')); });

    // Important app assets often used by PWA.
    ['manifest.webmanifest','styles-v45.css','logo-en.jpeg','logo-fa.jpeg','logo-hr.jpeg','apple-touch-icon.png','bible-icon.svg'].forEach(add);

    return Object.keys(urls);
  }

  function snapshot(){
    var d = currentBibleDay();
    var daily = '';
    try{
      var card = document.querySelector('[data-daily-card]');
      daily = card ? (card.innerText || '').slice(0, 6000) : '';
    }catch(e){}
    var active = '';
    try{
      var page = document.querySelector('.page.active');
      active = page ? (page.id || page.querySelector('h1,h2,h3') && page.querySelector('h1,h2,h3').textContent || '') : '';
    }catch(e){}
    return {
      version: VERSION,
      saved_at: now(),
      language: lang(),
      bible365_day: d.day,
      bible365_source: d.source,
      online: navigator.onLine,
      active_page: active,
      daily_word_snapshot: daily
    };
  }

  function saveSnapshot(){
    var s = snapshot();
    try { localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(s)); } catch(e){}
    return s;
  }

  function getSnapshot(){
    try { return JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || 'null'); } catch(e){ return null; }
  }

  function getQueue(){
    try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch(e){ return []; }
  }

  function setQueue(q){
    try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q || [])); } catch(e){}
  }

  async function prepareOffline(){
    saveSnapshot();
    var urls = collectUrls();
    var saved = 0;
    var failed = [];

    if(!('caches' in window)){
      throw new Error('Cache Storage is not supported in this browser.');
    }
    var cache = await caches.open(CACHE_NAME);

    for(var i=0; i<urls.length; i++){
      var url = urls[i];
      try{
        var res = await fetch(url, {cache:'reload', credentials:'same-origin'});
        if(res && res.ok){
          await cache.put(url, res.clone());
          saved++;
        }else{
          failed.push(url + ' HTTP ' + (res && res.status));
        }
      }catch(e){
        failed.push(url);
      }
    }

    log('success', tr('cached'), {saved:saved, failed:failed.slice(0,20), total:urls.length, snapshot:getSnapshot()});
    status(tr('cached') + ': ' + saved, 'ok');
    renderPanelFields();
    return {saved:saved, failed:failed, total:urls.length};
  }

  async function cacheCount(){
    if(!('caches' in window)) return 0;
    try{
      var cache = await caches.open(CACHE_NAME);
      var keys = await cache.keys();
      return keys.length;
    }catch(e){ return 0; }
  }

  async function testOffline(){
    var count = await cacheCount();
    var s = getSnapshot();
    var q = getQueue();
    log('info', tr('tested'), {online:navigator.onLine, cacheItems:count, snapshot:s, queueItems:q.length});
    status(tr('tested') + ' — ' + tr('cacheItems') + ': ' + count, 'ok');
    renderPanelFields();
  }

  function addQueueItem(){
    var q = getQueue();
    var item = {
      id:'offline-test-' + Date.now(),
      type:'offline_test',
      operation:'upsert',
      payload:snapshot(),
      status:'pending',
      created_at:now()
    };
    q.push(item);
    setQueue(q);
    log('success', tr('queued'), item);
    status(tr('queued'), 'ok');
    renderPanelFields();
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

  async function syncQueue(){
    var sb = findClient();
    if(!sb) throw new Error('Supabase client not found.');
    var ures = await sb.auth.getUser();
    if(ures.error) throw ures.error;
    var user = ures.data && ures.data.user;
    if(!user) throw new Error('User is not signed in.');

    var q = getQueue();
    var pending = q.filter(function(x){ return x.status === 'pending'; });
    var synced = 0;
    for(var i=0;i<pending.length;i++){
      var item = pending[i];
      var res = await sb.from('offline_sync_queue').insert({
        user_id:user.id,
        item_type:item.type || 'offline_test',
        operation:item.operation || 'upsert',
        payload:item.payload || {},
        status:'pending',
        updated_at:now()
      });
      if(res.error) throw res.error;
      item.status = 'synced';
      item.synced_at = now();
      synced++;
    }
    setQueue(q);
    log('success', tr('synced'), {synced:synced, remaining:getQueue().filter(function(x){return x.status==='pending';}).length});
    status(tr('synced') + ': ' + synced, 'ok');
    renderPanelFields();
  }

  function css(){
    if(document.getElementById('v6342Css')) return;
    var st = document.createElement('style');
    st.id = 'v6342Css';
    st.textContent = [
      '#v6342OfflinePanel{border-top:5px solid #0B62FF!important;background:linear-gradient(160deg,#fff,#f4f8ff)!important;display:block!important;visibility:visible!important;opacity:1!important;}',
      '.v6342-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6342-status.info{background:#eef4ff;color:#06146D}.v6342-status.ok{background:#eaffef;color:#08751a}.v6342-status.warn{background:#fff7df;color:#8a5a00}.v6342-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6342-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6342-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6342-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '#v6342Log details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6342OfflinePanel{direction:rtl;text-align:right}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function html(){
    return '<div id="v6342OfflinePanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<div id="v6342Status" class="v6342-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6342-grid">'+
        '<div><strong>'+esc(tr('online'))+':</strong> <span id="v6342Online">—</span></div>'+
        '<div><strong>'+esc(tr('cacheItems'))+':</strong> <span id="v6342CacheCount">—</span></div>'+
        '<div><strong>'+esc(tr('queueItems'))+':</strong> <span id="v6342QueueCount">—</span></div>'+
        '<div><strong>'+esc(tr('snapshot'))+':</strong> <span id="v6342Snapshot">—</span></div>'+
      '</div>'+
      '<div class="v6342-actions">'+
        '<button type="button" class="btn primary" id="v6342Prepare">'+esc(tr('prepare'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6342Test">'+esc(tr('test'))+'</button>'+
        '<button type="button" class="btn gold" id="v6342Queue">'+esc(tr('queue'))+'</button>'+
        '<button type="button" class="btn primary" id="v6342SyncQueue">'+esc(tr('syncQueue'))+'</button>'+
        '<button type="button" class="btn light" id="v6342Clear">'+esc(tr('clear'))+'</button>'+
      '</div>'+
      '<p class="small"><strong>'+esc(tr('warning'))+'</strong> '+esc(tr('help'))+'</p>'+
      '<div id="v6342Log"></div>'+
    '</div>';
  }

  function bind(){
    function b(id, fn){
      var el = document.getElementById(id);
      if(!el || el.dataset.v6342Bound) return;
      el.dataset.v6342Bound = '1';
      el.addEventListener('click', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        fn();
        return false;
      }, true);
    }
    b('v6342Prepare', function(){ prepareOffline().catch(showError); });
    b('v6342Test', function(){ testOffline().catch(showError); });
    b('v6342Queue', addQueueItem);
    b('v6342SyncQueue', function(){ syncQueue().catch(showError); });
    b('v6342Clear', function(){ localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'), 'info'); });
  }

  function showError(e){
    var msg = tr('error') + ': ' + (e && e.message ? e.message : e);
    log('error', msg);
    status(msg, 'error');
  }

  async function renderPanelFields(){
    var c = await cacheCount();
    var q = getQueue();
    var s = getSnapshot();
    var set = function(id, val){ var el = document.getElementById(id); if(el) el.textContent = val; };
    set('v6342Online', navigator.onLine ? 'online' : 'offline');
    set('v6342CacheCount', String(c));
    set('v6342QueueCount', String(q.filter(function(x){return x.status === 'pending';}).length) + ' pending / ' + q.length + ' total');
    set('v6342Snapshot', s ? (s.language + ' — day ' + s.bible365_day + ' — ' + s.saved_at) : '—');
  }

  function renderLog(){
    var box = document.getElementById('v6342Log');
    if(!box) return;
    var arr = getLog();
    if(!arr.length){ box.innerHTML = ''; return; }
    box.innerHTML = arr.map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details || {}, null, 2))+'</pre></details>';
    }).join('');
  }

  function render(){
    css();
    var more = document.getElementById('more');
    if(!more) return;
    var p = document.getElementById('v6342OfflinePanel');
    if(!p){
      var footer = more.querySelector('.footer');
      var wrap = document.createElement('div');
      wrap.innerHTML = html();
      p = wrap.firstElementChild;
      more.insertBefore(p, footer || null);
    }
    bind();
    renderPanelFields();
    renderLog();
  }

  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('load', render);
  window.addEventListener('online', render);
  window.addEventListener('offline', render);
  document.addEventListener('click', function(){ setTimeout(render, 100); }, true);
  setInterval(render, 3000);
  setTimeout(render, 500);
  setTimeout(render, 1800);

  window.OMIDENO7_V6342_OFFLINE_BETA = {
    prepareOffline:prepareOffline,
    testOffline:testOffline,
    addQueueItem:addQueueItem,
    syncQueue:syncQueue,
    snapshot:snapshot,
    version:VERSION
  };
})();
