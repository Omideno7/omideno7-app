/* Omideno7 V58.3 - Restore Spiritual Audio Messages section
   Keeps audio messages visible in Persian only and restores the home card/page if later scripts re-render the page. */
(function(){
  const d=document;
  const VERSION='V58.3';
  function lang(){ return window.currentLang || localStorage.getItem('lang') || d.documentElement.lang || 'fa'; }
  function isFa(){ return (lang()||'fa').toLowerCase().startsWith('fa'); }
  function showPage(id){
    if(typeof window.showPage==='function') { window.showPage(id); return; }
    d.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    const el=d.getElementById(id); if(el) el.classList.add('active');
  }
  function ensureVersion(){
    d.querySelectorAll('.app-version, #appVersion').forEach((el,i)=>{ if(i>0) el.remove(); });
    let v=d.getElementById('appVersion');
    if(!v){
      const footer=d.querySelector('.footer') || d.body;
      v=d.createElement('small'); v.id='appVersion'; v.className='app-version'; footer.appendChild(v);
    }
    v.textContent='App Version: '+VERSION;
  }
  function addStyle(){
    if(d.getElementById('v583-audio-restore-style')) return;
    const s=d.createElement('style'); s.id='v583-audio-restore-style';
    s.textContent=`
      .audio-home-card{border-top:5px solid var(--gold,#D4A72C)!important;}
      .audio-home-card h3{color:var(--blue,#06146D);}
      .audio-restore-card{border-top:5px solid var(--gold,#D4A72C);}
      .audio-restore-list{display:grid;gap:12px;margin-top:14px;}
      .audio-restore-item{border-inline-start:5px solid var(--gold,#D4A72C);}
      .audio-restore-title{width:100%;text-align:inherit;background:transparent;border:0;font-family:inherit;color:var(--blue,#06146D);font-weight:900;font-size:17px;cursor:pointer;padding:0;}
      .audio-restore-body{display:none;margin-top:10px;}
      .audio-restore-item.open .audio-restore-body{display:block;}
      .audio-restore-item audio{width:100%;margin-top:8px;}
      .audio-restore-tabs{display:flex;gap:8px;overflow-x:auto;margin:12px 0;padding-bottom:6px;}
      .audio-restore-tab{border:1px solid var(--line,#E5E7EB);background:#fff;border-radius:999px;padding:9px 13px;font-weight:900;color:var(--blue,#06146D);white-space:nowrap;cursor:pointer;font-family:inherit;}
      .audio-restore-tab.active{background:var(--blue,#06146D);color:#fff;border-color:var(--blue,#06146D);}
    `;
    d.head.appendChild(s);
  }
  const fallbackTitles={
    morning:['نیایش صبحگاهی ۱','نیایش صبحگاهی ۲'],
    short:['شما به خدا پاسخگو هستید','ایمان چیست؟','به چه چیزی امید دارید؟','قاطع باشید','قوی و دلیر باش','در خداوند شاد باشید','زندگی منضبط','مسئولیت‌پذیر باشید','به‌جای احساساتتان حکمت خدا را دنبال کنید','راهی تازه'],
    teaching:['احکام خدا','انجیل','ایمان انجیل','ارتقاء ایمان','اسارت در زندگی ایماندار','انسان روحانی و نفسانی','احترام به خداوند','۷ فایده از مشارکت با روح‌القدس','پسر خدا','تغذیه روحانی و تمرکز بر کلام','منابع مالی و شما','پنج عطیه خدمتی به کلیسا','چرا باید شب‌ها دعا کنیم؟','سفر روح‌القدس','سه عطیه روح خدا به روح ما','شکرگزاری در کلام و عمل','خدمتگزاری','خدمت مؤثر','عملکرد روح‌القدس','روز شریر','نکات فیض و ایمان','مایه برکت','لوسیفر / شیطان','عیسی کیست','اهمیت دعا','فرشتگان و پژواک حقایق','نور جهان هستید و پژواک حقایق','اتحاد قلبی','ذهن، فکر، سخن گفتن']
  };
  function fallbackItems(cat){
    if(cat==='morning') return fallbackTitles.morning.map((title,i)=>({id:'morning-prayer-'+String(i+1).padStart(3,'0'),title,src:'audio/fa/morning-prayer/'+String(i+1).padStart(3,'0')+'.m4a',tag:'نیایش صبحگاهی'}));
    if(cat==='short') return fallbackTitles.short.map((title,i)=>({id:'short-message-'+String(i+1).padStart(3,'0'),title,src:'audio/fa/short-messages/'+String(i+1).padStart(3,'0')+'.m4a',tag:'پیام کوتاه'}));
    return fallbackTitles.teaching.map((title,i)=>{const n=String(i+1).padStart(3,'0');return {id:'teaching-'+n,title,src:'audio/fa/teachings/'+n+'.'+(n==='027'?'mp3':'m4a'),tag:'تعلیم'};});
  }
  function ensureAudioPage(){
    let sec=d.getElementById('audioMessages');
    if(!sec){ sec=d.createElement('section'); sec.id='audioMessages'; sec.className='page'; (d.querySelector('main')||d.body).appendChild(sec); }
    return sec;
  }
  function renderFallback(cat='morning'){
    const sec=ensureAudioPage();
    const cats=[['morning','نیایش صبحگاهی'],['short','پیام‌های کوتاه'],['teaching','تعالیم']];
    sec.innerHTML='<div class="section-title"><h2>پیام‌های صوتی روحانی</h2></div><div class="card audio-restore-card"><h1>پیام‌های صوتی روحانی</h1><p>نیایش‌های صبحگاهی، پیام‌های کوتاه و تعالیم صوتی برای تقویت ایمان.</p><div class="audio-restore-tabs">'+cats.map(c=>'<button class="audio-restore-tab '+(c[0]===cat?'active':'')+'" data-audio-tab="'+c[0]+'" type="button">'+c[1]+'</button>').join('')+'</div></div><div class="audio-restore-list">'+fallbackItems(cat).map(item=>'<div class="card audio-restore-item" id="audio-card-'+item.id+'"><button class="audio-restore-title" type="button">'+item.title+'</button><div class="audio-restore-body"><span class="audio-tag">'+item.tag+'</span><audio controls preload="metadata" src="'+item.src+'"></audio><div class="btn-row"><button class="btn secondary" type="button" onclick="navigator.clipboard&&navigator.clipboard.writeText(location.origin+location.pathname+\'?audio='+item.id+'\')">کپی لینک</button></div></div></div>').join('')+'</div>';
    sec.querySelectorAll('[data-audio-tab]').forEach(b=>b.addEventListener('click',()=>renderFallback(b.dataset.audioTab)));
    sec.querySelectorAll('.audio-restore-title').forEach(b=>b.addEventListener('click',()=>b.closest('.audio-restore-item').classList.toggle('open')));
  }
  window.openSpiritualAudioRestored=function(){
    if(!isFa()) return;
    if(typeof window.openSpiritualAudio==='function') { window.openSpiritualAudio(); }
    else { renderFallback('morning'); showPage('audioMessages'); }
  };
  function ensureHomeCard(){
    addStyle(); ensureVersion();
    const home=d.getElementById('home'); if(!home) return;
    home.querySelectorAll('[data-audio-home-card], [data-audio-restored-home-card]').forEach(el=>el.remove());
    if(!isFa()) return;
    const card=d.createElement('div');
    card.className='card feature-card audio-home-card';
    card.setAttribute('data-audio-restored-home-card','1');
    card.innerHTML='<h3>پیام‌های صوتی روحانی</h3><p>نیایش‌های صبحگاهی، پیام‌های کوتاه و تعالیم صوتی برای تقویت ایمان.</p><button class="btn primary" type="button" onclick="openSpiritualAudioRestored()">باز کردن پیام‌های صوتی</button>';
    const grid=home.querySelector('.home-feature-grid') || home.querySelector('.grid');
    if(grid) grid.prepend(card); else home.appendChild(card);
  }
  function boot(){ ensureHomeCard(); if(location.search.includes('audio=')) setTimeout(()=>window.openSpiritualAudioRestored(),250); }
  d.addEventListener('DOMContentLoaded',boot);
  d.addEventListener('click',()=>setTimeout(ensureHomeCard,250),true);
  window.addEventListener('storage',ensureHomeCard);
  setTimeout(boot,300); setTimeout(boot,1000); setInterval(ensureHomeCard,2500);
})();
