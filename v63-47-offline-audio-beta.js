/* Omideno7 V63.47 — Offline Audio Beta
   Beta-only. Does not affect public index.html.

   Features:
   - Detects audio URLs from <audio>, links to mp3/m4a/wav/ogg, and school audio references in localStorage.
   - Caches audio files in Cache Storage for offline playback.
   - Shows offline audio list.
   - Does not auto-download huge files unless admin/user presses the Beta button.
*/
(function(){
  'use strict';

  var VERSION = 'V63.47 Offline Audio Beta';
  var CACHE = 'omideno7-school-audio-v6347';
  var LOG_KEY = 'omideno7_v6347_audio_log';
  var INDEX_KEY = 'omideno7_v6347_offline_audio_index';

  function isBeta(){return /beta\.html/i.test(location.pathname) || /v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);}
  if(!isBeta()) return;

  function lang(){try{return localStorage.getItem('lang')||document.documentElement.lang||'fa';}catch(e){return 'fa';}}
  function tr(k){
    var fa={
      title:'فایل‌های صوتی آفلاین — Beta V63.47',
      intro:'این بخش فایل‌های صوتی مدرسه/اپ را که در صفحه پیدا می‌کند، برای استفاده آفلاین ذخیره می‌کند.',
      note:'برای کنترل حجم اینترنت، دانلود صوت‌ها فقط با دکمه تست انجام می‌شود. در نسخه اصلی می‌توانیم گزینه «دانلود برای آفلاین» کنار هر درس بگذاریم.',
      scan:'پیدا کردن فایل‌های صوتی',
      cache:'ذخیره صوت‌ها برای آفلاین',
      list:'نمایش صوت‌های ذخیره‌شده',
      test:'تست پخش آفلاین',
      clear:'پاک کردن گزارش',
      status:'آماده تست صوت آفلاین',
      found:'فایل صوتی پیدا شد',
      cached:'صوت‌ها ذخیره شدند',
      noAudio:'فایل صوتی پیدا نشد. اول وارد درس دارای صوت شو یا صوت را یک بار آنلاین باز کن.',
      error:'خطا',
      audioCount:'تعداد صوت‌ها',
      cachedCount:'ذخیره‌شده',
      last:'آخرین ذخیره',
      help:'تست: اینترنت وصل باشد، وارد درس دارای صوت شو، سپس اینجا «پیدا کردن فایل‌های صوتی» و بعد «ذخیره صوت‌ها برای آفلاین» را بزن. بعد اینترنت را قطع کن و «نمایش صوت‌های ذخیره‌شده» را بزن.'
    };
    var en={
      title:'Offline Audio — Beta V63.47',
      intro:'This panel detects School/app audio files and caches them for offline playback.',
      note:'To control data usage, audio downloads only after pressing the Beta button. Stable can show “Download for offline” beside each lesson.',
      scan:'Find audio files',
      cache:'Save audio offline',
      list:'Show saved audio',
      test:'Test offline playback',
      clear:'Clear log',
      status:'Ready to test offline audio',
      found:'Audio files found',
      cached:'Audio cached',
      noAudio:'No audio found. Open an online lesson with audio first.',
      error:'Error',
      audioCount:'Audio count',
      cachedCount:'Cached',
      last:'Last cached',
      help:'Test: while online, open a lesson with audio, then press Find audio and Save audio offline. Turn internet off and show saved audio.'
    };
    return (lang()==='en'?en:fa)[k]||fa[k]||k;
  }
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function now(){return new Date().toISOString();}
  function log(type,msg,details){
    var arr=[]; try{arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){arr=[];}
    arr.unshift({time:now(),type:type||'info',message:String(msg||''),details:details||null});
    arr=arr.slice(0,50); try{localStorage.setItem(LOG_KEY,JSON.stringify(arr));}catch(e){}
    renderLog();
  }
  function getLog(){try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];}}
  function getIndex(){try{return JSON.parse(localStorage.getItem(INDEX_KEY)||'[]');}catch(e){return[];}}
  function setIndex(x){try{localStorage.setItem(INDEX_KEY,JSON.stringify(x||[]));}catch(e){}}
  function status(msg,type){var el=document.getElementById('v6347AudioStatus'); if(el){el.className='v6347-audio-status '+(type||'info'); el.textContent=msg;}}

  function addUrl(map,u,label){
    if(!u) return;
    u=String(u).trim();
    if(!u || /^blob:/.test(u) || /^data:/.test(u)) return;
    if(!/\.(mp3|m4a|wav|ogg)(\?|#|$)/i.test(u) && !/school-audio|storage\/v1\/object/i.test(u)) return;
    try{
      var abs=new URL(u, location.href).href;
      map[abs]={url:abs,label:label||abs.split('/').pop().split('?')[0],found_at:now()};
    }catch(e){}
  }
  function findAudio(){
    var map={};
    Array.prototype.slice.call(document.querySelectorAll('audio')).forEach(function(a){
      addUrl(map,a.getAttribute('src')||a.src,'audio');
      Array.prototype.slice.call(a.querySelectorAll('source')).forEach(function(s){addUrl(map,s.getAttribute('src')||s.src,'source');});
    });
    Array.prototype.slice.call(document.querySelectorAll('a[href]')).forEach(function(a){
      addUrl(map,a.getAttribute('href'), (a.textContent||'audio').trim().slice(0,80));
    });
    try{
      for(var i=0;i<localStorage.length;i++){
        var k=localStorage.key(i), v=localStorage.getItem(k)||'';
        var matches=v.match(/https?:\/\/[^"'\s]+?\.(?:mp3|m4a|wav|ogg)(?:\?[^"'\s]*)?/gi) || [];
        matches.forEach(function(u){addUrl(map,u,'localStorage');});
      }
    }catch(e){}
    var arr=Object.keys(map).map(function(k){return map[k];});
    var current=getIndex();
    arr.forEach(function(item){
      if(!current.some(function(x){return x.url===item.url;})) current.push(item);
    });
    setIndex(current);
    status(arr.length ? (tr('found')+': '+arr.length) : tr('noAudio'), arr.length?'ok':'warn');
    log(arr.length?'success':'warn', tr('found'), {found:arr.length, urls:arr.slice(0,20)});
    renderFields();
    return arr;
  }

  async function cacheAudio(){
    var list=findAudio();
    if(!list.length) list=getIndex();
    if(!list.length){status(tr('noAudio'),'warn'); return;}
    if(!('caches' in window)) throw new Error('Cache Storage not supported');
    var cache=await caches.open(CACHE);
    var ok=0, fail=0, details=[];
    for(var i=0;i<list.length;i++){
      var item=list[i];
      try{
        var res=await fetch(item.url,{mode:'cors',credentials:'omit',cache:'reload'});
        if(!res || (!res.ok && res.type!=='opaque')) throw new Error('HTTP '+(res&&res.status));
        await cache.put(item.url,res.clone());
        item.cached=true; item.cached_at=now(); ok++;
      }catch(e){
        item.cached=false; item.error=e.message||String(e); fail++;
      }
      details.push({url:item.url,cached:item.cached,error:item.error||null});
    }
    setIndex(list);
    status(tr('cached')+': '+ok+' / '+list.length, ok?'ok':'warn');
    log(ok?'success':'warn', tr('cached'), {ok:ok,fail:fail,details:details.slice(0,20)});
    renderFields();
    renderAudioList();
  }
  async function cacheCount(){
    if(!('caches' in window)) return 0;
    try{var c=await caches.open(CACHE); var keys=await c.keys(); return keys.length;}catch(e){return 0;}
  }

  function renderAudioList(){
    var box=document.getElementById('v6347AudioList');
    if(!box) return;
    var list=getIndex();
    if(!list.length){box.innerHTML='<p class="v6347-audio-status warn">'+esc(tr('noAudio'))+'</p>'; return;}
    box.innerHTML=list.map(function(item,idx){
      return '<div class="v6347-audio-item"><strong>'+esc(item.label||('audio '+(idx+1)))+'</strong>'+
        '<p class="small">'+esc(item.cached?('cached: '+(item.cached_at||'')):'not cached')+'</p>'+
        '<audio controls preload="none" src="'+esc(item.url)+'"></audio></div>';
    }).join('');
  }

  async function renderFields(){
    var list=getIndex();
    var cached=list.filter(function(x){return x.cached;}).length;
    var c=await cacheCount();
    var set=function(id,v){var el=document.getElementById(id); if(el) el.textContent=v;};
    set('v6347AudioCount',String(list.length));
    set('v6347AudioCached',cached+' marked / '+c+' cache');
    set('v6347AudioLast', list.filter(function(x){return x.cached_at;}).map(function(x){return x.cached_at;})[0] || '—');
  }

  function css(){
    if(document.getElementById('v6347AudioCss')) return;
    var st=document.createElement('style');
    st.id='v6347AudioCss';
    st.textContent=[
      '#v6347AudioPanel{border-top:5px solid #7C3AED!important;background:linear-gradient(160deg,#fff,#faf7ff)!important;display:block!important;visibility:visible!important;opacity:1!important;}',
      '.v6347-audio-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6347-audio-status.info{background:#eef4ff;color:#06146D}.v6347-audio-status.ok{background:#eaffef;color:#08751a}.v6347-audio-status.warn{background:#fff7df;color:#8a5a00}.v6347-audio-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6347-audio-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6347-audio-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6347-audio-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '.v6347-audio-item{background:#fff;border:1px solid #E6EAF2;border-radius:14px;padding:10px;margin:8px 0}.v6347-audio-item audio{width:100%;margin-top:8px}#v6347AudioLog details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6347AudioPanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }
  function html(){
    return '<div id="v6347AudioPanel" class="card">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<p class="v6347-audio-status warn">'+esc(tr('note'))+'</p>'+
      '<div id="v6347AudioStatus" class="v6347-audio-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6347-audio-grid">'+
        '<div><strong>'+esc(tr('audioCount'))+':</strong> <span id="v6347AudioCount">—</span></div>'+
        '<div><strong>'+esc(tr('cachedCount'))+':</strong> <span id="v6347AudioCached">—</span></div>'+
        '<div><strong>'+esc(tr('last'))+':</strong> <span id="v6347AudioLast">—</span></div>'+
      '</div>'+
      '<div class="v6347-audio-actions">'+
        '<button type="button" class="btn secondary" id="v6347AudioScan">'+esc(tr('scan'))+'</button>'+
        '<button type="button" class="btn primary" id="v6347AudioCache">'+esc(tr('cache'))+'</button>'+
        '<button type="button" class="btn gold" id="v6347AudioShow">'+esc(tr('list'))+'</button>'+
        '<button type="button" class="btn light" id="v6347AudioClear">'+esc(tr('clear'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(tr('help'))+'</p>'+
      '<div id="v6347AudioList"></div>'+
      '<div id="v6347AudioLog"></div>'+
    '</div>';
  }
  function render(){
    css();
    var more=document.getElementById('more');
    if(!more) return;
    var p=document.getElementById('v6347AudioPanel');
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
    var s=document.getElementById('v6347AudioScan'); if(s) s.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} try{findAudio();}catch(e){showError(e);} return false;};
    var c=document.getElementById('v6347AudioCache'); if(c) c.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} cacheAudio().catch(showError); return false;};
    var l=document.getElementById('v6347AudioShow'); if(l) l.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} renderAudioList(); return false;};
    var clear=document.getElementById('v6347AudioClear'); if(clear) clear.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); return false;};
  }
  function renderLog(){
    var box=document.getElementById('v6347AudioLog'); if(!box) return;
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
  setTimeout(render,800);
  setTimeout(render,2400);

  window.OMIDENO7_V6347_OFFLINE_AUDIO_BETA = {findAudio:findAudio, cacheAudio:cacheAudio, renderAudioList:renderAudioList, version:VERSION};
})();
