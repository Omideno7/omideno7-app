/* Omideno7 V63.47b — Offline Audio Playback Fix Beta
   Beta-only.

   Fixes:
   - V63.47 could find/cache audio, but playback failed because <audio> still used the remote URL.
   - Some browsers (especially Safari/PWA contexts) do not reliably play media directly from Cache Storage by URL.
   - This version stores audio as Blob in IndexedDB and plays through local blob: object URLs.

   Notes:
   - User/admin must press "ذخیره و آماده‌سازی پخش آفلاین" while online.
   - Offline list uses blob URLs generated from IndexedDB, not the remote URL.
*/
(function(){
  'use strict';

  var VERSION = 'V63.47b Offline Audio Playback Fix Beta';
  var DB_NAME = 'omideno7_offline_audio_v6347b';
  var DB_VERSION = 1;
  var STORE = 'audio_files';
  var INDEX_KEY = 'omideno7_v6347b_audio_index';
  var LOG_KEY = 'omideno7_v6347b_audio_log';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){ try{return localStorage.getItem('lang') || document.documentElement.lang || 'fa';}catch(e){return 'fa';} }
  function tr(k){
    var fa = {
      title:'اصلاح پخش صوت آفلاین — Beta V63.47b',
      intro:'نسخه قبل صوت را پیدا و ذخیره می‌کرد، اما پخش از آدرس اصلی خطا می‌داد. این نسخه فایل صوتی را به صورت Blob داخل حافظه امن مرورگر ذخیره می‌کند و برای پخش آفلاین از لینک محلی blob استفاده می‌کند.',
      note:'برای تست، وقتی اینترنت وصل است وارد درس صوت‌دار شو، بعد اینجا صوت را ذخیره و آماده پخش آفلاین کن. سپس اینترنت را قطع کن و از همین لیست پخش کن.',
      scan:'پیدا کردن صوت‌ها',
      save:'ذخیره و آماده‌سازی پخش آفلاین',
      list:'نمایش و پخش صوت‌های ذخیره‌شده',
      test:'تست وضعیت حافظه صوت',
      clearLog:'پاک کردن گزارش',
      clearAudio:'پاک کردن صوت‌های ذخیره‌شده',
      status:'آماده اصلاح پخش صوت آفلاین',
      found:'صوت پیدا شد',
      saved:'صوت برای پخش آفلاین آماده شد',
      listed:'لیست صوت‌های ذخیره‌شده نمایش داده شد',
      none:'هیچ صوتی پیدا نشد. اول وارد درس دارای صوت شو یا یک بار صوت را آنلاین باز کن.',
      error:'خطا',
      count:'تعداد صوت‌ها',
      stored:'ذخیره‌شده',
      size:'حجم',
      last:'آخرین ذخیره',
      playHelp:'اگر بعد از قطع اینترنت اینجا پخش شد، یعنی صوت آفلاین واقعاً کار می‌کند. اگر خطا داد، متن خطای زیر همان صوت را بفرست.',
      onlineOnly:'برای ذخیره صوت باید اینترنت وصل باشد.',
      dbOk:'حافظه صوت آماده است'
    };
    var en = {
      title:'Offline Audio Playback Fix — Beta V63.47b',
      intro:'The previous version found/cached audio but playback used the remote URL. This build stores audio as Blob in IndexedDB and plays through local blob URLs.',
      note:'Test online first: open an audio lesson, save audio here, then turn internet off and play from this list.',
      scan:'Find audio',
      save:'Save and prepare offline playback',
      list:'Show/play saved audio',
      test:'Test audio storage',
      clearLog:'Clear log',
      clearAudio:'Clear saved audio',
      status:'Ready to fix offline audio playback',
      found:'Audio found',
      saved:'Audio prepared for offline playback',
      listed:'Saved audio list shown',
      none:'No audio found. Open an audio lesson online first.',
      error:'Error',
      count:'Audio count',
      stored:'Stored',
      size:'Size',
      last:'Last saved',
      playHelp:'If this plays after turning internet off, offline audio works.',
      onlineOnly:'Internet is required to save audio.',
      dbOk:'Audio storage is ready'
    };
    return (lang()==='en'?en:fa)[k] || fa[k] || k;
  }
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function now(){return new Date().toISOString();}
  function log(type,msg,details){
    var arr=[]; try{arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){arr=[];}
    arr.unshift({time:now(), type:type||'info', message:String(msg||''), details:details||null});
    arr=arr.slice(0,70); try{localStorage.setItem(LOG_KEY,JSON.stringify(arr));}catch(e){}
    renderLog();
  }
  function getLog(){try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];}}
  function status(msg,type){var el=document.getElementById('v6347bAudioStatus'); if(el){el.className='v6347b-audio-status '+(type||'info'); el.textContent=msg;}}

  function getIndex(){try{return JSON.parse(localStorage.getItem(INDEX_KEY)||'[]');}catch(e){return[];}}
  function setIndex(list){try{localStorage.setItem(INDEX_KEY,JSON.stringify(list||[]));}catch(e){}}

  function openDb(){
    return new Promise(function(resolve,reject){
      if(!('indexedDB' in window)) return reject(new Error('IndexedDB not supported'));
      var req=indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded=function(){
        var db=req.result;
        if(!db.objectStoreNames.contains(STORE)){
          var store=db.createObjectStore(STORE,{keyPath:'url'});
          store.createIndex('saved_at','saved_at',{unique:false});
        }
      };
      req.onsuccess=function(){resolve(req.result);};
      req.onerror=function(){reject(req.error || new Error('IndexedDB open failed'));};
    });
  }
  async function putAudio(record){
    var db=await openDb();
    return new Promise(function(resolve,reject){
      var tx=db.transaction(STORE,'readwrite');
      tx.objectStore(STORE).put(record);
      tx.oncomplete=function(){db.close(); resolve();};
      tx.onerror=function(){db.close(); reject(tx.error || new Error('IndexedDB write failed'));};
    });
  }
  async function getAudio(url){
    var db=await openDb();
    return new Promise(function(resolve,reject){
      var tx=db.transaction(STORE,'readonly');
      var req=tx.objectStore(STORE).get(url);
      req.onsuccess=function(){db.close(); resolve(req.result||null);};
      req.onerror=function(){db.close(); reject(req.error || new Error('IndexedDB read failed'));};
    });
  }
  async function getAllAudio(){
    var db=await openDb();
    return new Promise(function(resolve,reject){
      var tx=db.transaction(STORE,'readonly');
      var req=tx.objectStore(STORE).getAll();
      req.onsuccess=function(){db.close(); resolve(req.result||[]);};
      req.onerror=function(){db.close(); reject(req.error || new Error('IndexedDB getAll failed'));};
    });
  }
  async function clearAudioDb(){
    var db=await openDb();
    return new Promise(function(resolve,reject){
      var tx=db.transaction(STORE,'readwrite');
      tx.objectStore(STORE).clear();
      tx.oncomplete=function(){db.close(); resolve();};
      tx.onerror=function(){db.close(); reject(tx.error || new Error('IndexedDB clear failed'));};
    });
  }

  function addUrl(map,u,label){
    if(!u) return;
    u=String(u).trim();
    if(!u || /^blob:/.test(u) || /^data:/.test(u)) return;
    if(!/\.(mp3|m4a|wav|ogg|aac)(\?|#|$)/i.test(u) && !/school-audio|storage\/v1\/object/i.test(u)) return;
    try{
      var abs=new URL(u, location.href).href;
      map[abs]={url:abs,label:label||abs.split('/').pop().split('?')[0]||'audio',found_at:now()};
    }catch(e){}
  }

  function findAudio(){
    var map={};

    // Audio elements and sources
    Array.prototype.slice.call(document.querySelectorAll('audio')).forEach(function(a){
      addUrl(map,a.getAttribute('src')||a.currentSrc||a.src,'audio');
      Array.prototype.slice.call(a.querySelectorAll('source')).forEach(function(s){addUrl(map,s.getAttribute('src')||s.src,'source');});
    });

    // Direct links
    Array.prototype.slice.call(document.querySelectorAll('a[href]')).forEach(function(a){
      addUrl(map,a.getAttribute('href'),(a.textContent||'audio').trim().slice(0,90));
    });

    // Buttons/data attrs that may contain audio URL
    Array.prototype.slice.call(document.querySelectorAll('[data-audio],[data-src],[data-url]')).forEach(function(el){
      addUrl(map,el.getAttribute('data-audio')||el.getAttribute('data-src')||el.getAttribute('data-url'),(el.textContent||'audio').trim().slice(0,90));
    });

    // localStorage references
    try{
      for(var i=0;i<localStorage.length;i++){
        var v=localStorage.getItem(localStorage.key(i))||'';
        var matches=v.match(/https?:\/\/[^"'\s<>]+?(?:\.mp3|\.m4a|\.wav|\.ogg|\.aac|school-audio)[^"'\s<>]*/gi)||[];
        matches.forEach(function(u){addUrl(map,u,'localStorage');});
      }
    }catch(e){}

    var found=Object.keys(map).map(function(k){return map[k];});
    var current=getIndex();
    found.forEach(function(item){
      if(!current.some(function(x){return x.url===item.url;})) current.push(item);
    });
    setIndex(current);

    status(found.length ? tr('found')+': '+found.length : tr('none'), found.length?'ok':'warn');
    log(found.length?'success':'warn', tr('found'), {found:found.length, urls:found.map(function(x){return x.url;}).slice(0,20)});
    renderFields();
    return found;
  }

  function guessMime(url, res){
    var ct=res && res.headers && res.headers.get && res.headers.get('content-type');
    if(ct && /audio|octet-stream/i.test(ct)) return ct;
    if(/\.m4a/i.test(url)) return 'audio/mp4';
    if(/\.wav/i.test(url)) return 'audio/wav';
    if(/\.ogg/i.test(url)) return 'audio/ogg';
    if(/\.aac/i.test(url)) return 'audio/aac';
    return 'audio/mpeg';
  }

  async function saveAudio(){
    if(!navigator.onLine){
      status(tr('onlineOnly'),'warn');
      return;
    }
    var list=findAudio();
    if(!list.length) list=getIndex();
    if(!list.length){status(tr('none'),'warn'); return;}

    var ok=0, fail=0, details=[];
    for(var i=0;i<list.length;i++){
      var item=list[i];
      try{
        var res=await fetch(item.url,{cache:'reload',credentials:'omit',mode:'cors'});
        if(!res.ok) throw new Error('HTTP '+res.status);
        var blob=await res.blob();
        if(!blob || !blob.size) throw new Error('Empty audio blob');
        var mime=guessMime(item.url,res);
        // Normalize type if missing
        if(!blob.type || !/audio|mpeg|mp4|ogg|wav/i.test(blob.type)){
          blob=blob.slice(0,blob.size,mime);
        }
        var rec={
          url:item.url,
          label:item.label || item.url.split('/').pop().split('?')[0],
          blob:blob,
          mime:blob.type || mime,
          size:blob.size,
          saved_at:now()
        };
        await putAudio(rec);
        item.stored=true; item.size=blob.size; item.mime=rec.mime; item.saved_at=rec.saved_at; item.error=null;
        ok++;
      }catch(e){
        item.stored=false; item.error=e.message||String(e); fail++;
      }
      details.push({url:item.url,stored:item.stored,size:item.size||0,error:item.error||null});
    }
    setIndex(list);
    status(tr('saved')+': '+ok+' / '+list.length, ok?'ok':'warn');
    log(ok?'success':'warn', tr('saved'), {ok:ok,fail:fail,details:details});
    renderFields();
    renderAudioList();
  }

  async function renderAudioList(){
    var box=document.getElementById('v6347bAudioList');
    if(!box) return;
    var list=await getAllAudio().catch(function(e){log('error','DB list failed',{message:e.message}); return [];});
    if(!list.length){
      box.innerHTML='<p class="v6347b-audio-status warn">'+esc(tr('none'))+'</p>';
      return;
    }
    var html='';
    list.forEach(function(rec,idx){
      var blobUrl='';
      try{ blobUrl=URL.createObjectURL(rec.blob); }catch(e){}
      html += '<div class="v6347b-audio-item">'+
        '<strong>'+esc(rec.label || ('audio '+(idx+1)))+'</strong>'+
        '<p class="small">'+esc((rec.mime||'audio')+' — '+Math.round((rec.size||0)/1024)+' KB — '+(rec.saved_at||''))+'</p>'+
        '<audio controls preload="metadata" src="'+esc(blobUrl)+'" data-source-url="'+esc(rec.url)+'"></audio>'+
        '<p class="small" id="v6347bAudioErr'+idx+'"></p>'+
      '</div>';
    });
    box.innerHTML=html;
    Array.prototype.slice.call(box.querySelectorAll('audio')).forEach(function(a,idx){
      a.addEventListener('error',function(){
        var err=document.getElementById('v6347bAudioErr'+idx);
        var code=a.error ? a.error.code : 'unknown';
        if(err) err.textContent='Playback error code: '+code;
        log('error','Audio playback failed',{idx:idx,code:code,src:a.getAttribute('data-source-url')});
      });
      a.addEventListener('play',function(){
        log('success','Audio playback started',{idx:idx,src:a.getAttribute('data-source-url')});
      },{once:true});
    });
    status(tr('listed')+': '+list.length,'ok');
    renderFields();
  }

  async function testDb(){
    try{
      await openDb();
      status(tr('dbOk'),'ok');
      log('success',tr('dbOk'),{db:DB_NAME,store:STORE});
      await renderFields();
    }catch(e){showError(e);}
  }

  async function renderFields(){
    var idx=getIndex();
    var all=await getAllAudio().catch(function(){return [];});
    var total=all.reduce(function(s,x){return s+(x.size||0);},0);
    var last=all.map(function(x){return x.saved_at;}).filter(Boolean).sort().pop() || '—';
    var set=function(id,v){var el=document.getElementById(id); if(el) el.textContent=v;};
    set('v6347bAudioCount',String(idx.length));
    set('v6347bAudioStored',String(all.length));
    set('v6347bAudioSize',Math.round(total/1024)+' KB');
    set('v6347bAudioLast',last);
  }

  async function clearSavedAudio(){
    await clearAudioDb();
    setIndex([]);
    status('پاک شد','ok');
    log('success','Saved audio cleared',{});
    renderAudioList();
    renderFields();
  }

  function css(){
    if(document.getElementById('v6347bAudioCss')) return;
    var st=document.createElement('style');
    st.id='v6347bAudioCss';
    st.textContent=[
      '#v6347AudioPanel{display:none!important;visibility:hidden!important;}',
      '#v6347bAudioPanel{border-top:5px solid #7C3AED!important;background:linear-gradient(160deg,#fff,#faf7ff)!important;display:block!important;visibility:visible!important;opacity:1!important;}',
      '.v6347b-audio-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6347b-audio-status.info{background:#eef4ff;color:#06146D}.v6347b-audio-status.ok{background:#eaffef;color:#08751a}.v6347b-audio-status.warn{background:#fff7df;color:#8a5a00}.v6347b-audio-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6347b-audio-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:12px 0}.v6347b-audio-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6347b-audio-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '.v6347b-audio-item{background:#fff;border:1px solid #E6EAF2;border-radius:14px;padding:10px;margin:8px 0}.v6347b-audio-item audio{width:100%;margin-top:8px}#v6347bAudioLog details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6347bAudioPanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function html(){
    return '<div id="v6347bAudioPanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<p class="v6347b-audio-status warn">'+esc(tr('note'))+'</p>'+
      '<div id="v6347bAudioStatus" class="v6347b-audio-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6347b-audio-grid">'+
        '<div><strong>'+esc(tr('count'))+':</strong> <span id="v6347bAudioCount">—</span></div>'+
        '<div><strong>'+esc(tr('stored'))+':</strong> <span id="v6347bAudioStored">—</span></div>'+
        '<div><strong>'+esc(tr('size'))+':</strong> <span id="v6347bAudioSize">—</span></div>'+
        '<div><strong>'+esc(tr('last'))+':</strong> <span id="v6347bAudioLast">—</span></div>'+
      '</div>'+
      '<div class="v6347b-audio-actions">'+
        '<button type="button" class="btn secondary" id="v6347bAudioScan">'+esc(tr('scan'))+'</button>'+
        '<button type="button" class="btn primary" id="v6347bAudioSave">'+esc(tr('save'))+'</button>'+
        '<button type="button" class="btn gold" id="v6347bAudioListBtn">'+esc(tr('list'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6347bAudioTest">'+esc(tr('test'))+'</button>'+
        '<button type="button" class="btn light" id="v6347bAudioClearAudio">'+esc(tr('clearAudio'))+'</button>'+
        '<button type="button" class="btn light" id="v6347bAudioClearLog">'+esc(tr('clearLog'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(tr('playHelp'))+'</p>'+
      '<div id="v6347bAudioList"></div>'+
      '<div id="v6347bAudioLog"></div>'+
    '</div>';
  }

  function render(){
    css();
    var old=document.getElementById('v6347AudioPanel'); if(old) old.style.display='none';
    var more=document.getElementById('more');
    if(!more) return;
    var p=document.getElementById('v6347bAudioPanel');
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
    var s=document.getElementById('v6347bAudioScan'); if(s) s.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} try{findAudio();}catch(e){showError(e);} return false;};
    var save=document.getElementById('v6347bAudioSave'); if(save) save.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} saveAudio().catch(showError); return false;};
    var list=document.getElementById('v6347bAudioListBtn'); if(list) list.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} renderAudioList().catch(showError); return false;};
    var t=document.getElementById('v6347bAudioTest'); if(t) t.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} testDb(); return false;};
    var ca=document.getElementById('v6347bAudioClearAudio'); if(ca) ca.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} clearSavedAudio().catch(showError); return false;};
    var cl=document.getElementById('v6347bAudioClearLog'); if(cl) cl.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); return false;};
  }

  function renderLog(){
    var box=document.getElementById('v6347bAudioLog'); if(!box) return;
    var arr=getLog(); if(!arr.length){box.innerHTML=''; return;}
    box.innerHTML=arr.map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details||{},null,2))+'</pre></details>';
    }).join('');
  }
  function showError(e){var msg=tr('error')+': '+(e&&e.message?e.message:e); status(msg,'error'); log('error',msg,{stack:e&&e.stack});}

  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('load',render);
  document.addEventListener('click',function(){setTimeout(render,100);},true);
  setInterval(render,5000);
  setTimeout(render,700);
  setTimeout(render,2200);

  window.OMIDENO7_V6347B_AUDIO_FIX_BETA = {findAudio:findAudio, saveAudio:saveAudio, renderAudioList:renderAudioList, version:VERSION};
})();
