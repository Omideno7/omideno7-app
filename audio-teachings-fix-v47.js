/* OmidNo7 V47 - Spiritual Audio Teachings Fix
   Replace/upload this file and load it after app-v45.js.
   Fixes: Persian teaching audio list not showing, restores Persian titles, keeps existing audio files in GitHub paths. */
(function(){
  const d=document;
  function addStyle(){
    if(d.getElementById('audio-teachings-fix-v47-style')) return;
    const s=d.createElement('style');
    s.id='audio-teachings-fix-v47-style';
    s.textContent=`
      .audio-home-card{border-top:5px solid var(--gold,#D4A72C);}
      .audio-hero{border-top:5px solid var(--gold,#D4A72C);}
      .audio-category-row{display:flex;gap:8px;overflow-x:auto;margin:12px 0;padding-bottom:6px;}
      .audio-cat-btn{border:1px solid var(--line,#E5E7EB);background:#fff;border-radius:999px;padding:9px 13px;font-weight:900;color:var(--blue,#06146D);white-space:nowrap;cursor:pointer;font-family:inherit;}
      .audio-cat-btn.active{background:var(--blue,#06146D);color:#fff;border-color:var(--blue,#06146D);}
      .audio-message-card{border-inline-start:5px solid var(--gold,#D4A72C);}
      .audio-message-head h3{margin:8px 0 6px;}
      .audio-tag{display:inline-block;background:#FFF8E8;border:1px solid #E9D69A;color:#6B4A00;border-radius:999px;padding:4px 10px;font-weight:900;font-size:12px;}
      .audio-message-card audio{width:100%;margin-top:10px;}
      .audio-control-bar,.audio-speed-row,.audio-action-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center;}
      .audio-control-bar button,.audio-speed-row button{border:1px solid var(--line,#E5E7EB);background:#fff;border-radius:12px;padding:8px 10px;font-weight:900;color:var(--blue,#06146D);font-family:inherit;cursor:pointer;}
      .audio-speed-row button.active{background:var(--blue,#06146D);color:#fff;border-color:var(--blue,#06146D);}
      .audio-note-box{margin-top:10px;background:#F8FAFC;border:1px solid var(--line,#E5E7EB);border-radius:16px;padding:12px;}
      .audio-note-box textarea{width:100%;min-height:130px;border:1px solid var(--line,#E5E7EB);border-radius:14px;padding:12px;font-family:inherit;}
      .audio-empty-card{border-inline-start:5px solid var(--green,#22C55E);}
    `;
    d.head.appendChild(s);
  }
  function lang(){ return window.currentLang || localStorage.getItem('lang') || d.documentElement.lang || 'fa'; }
  function showPage(id){ if(typeof window.showPage==='function'){ window.showPage(id); return; } d.querySelectorAll('.page').forEach(p=>p.classList.remove('active')); const el=d.getElementById(id); if(el) el.classList.add('active'); }
  function faNum(v){ try{return typeof window.toFaDigits==='function'?window.toFaDigits(v):String(v).replace(/[0-9]/g,x=>'۰۱۲۳۴۵۶۷۸۹'[x]);}catch(e){return String(v);} }
  const morning=[
    {id:'morning-prayer-001',category:'morning',src:'audio/fa/morning-prayer/001.m4a',title:'نیایش صبحگاهی ۱',desc:'یک پیام صوتی کوتاه برای شروع روز با دعا، ایمان و تمرکز بر خداوند.',tag:'نیایش صبحگاهی'},
    {id:'morning-prayer-002',category:'morning',src:'audio/fa/morning-prayer/002.m4a',title:'نیایش صبحگاهی ۲',desc:'دعای صبحگاهی برای تقویت روح، آرامش قلب و شروع روز در حضور خداوند.',tag:'نیایش صبحگاهی'}
  ];
  const shortTitles=['شما به خدا پاسخگو هستید','ایمان چیست؟','به چه چیزی امید دارید؟','قاطع باشید','قوی و دلیر باش','در خداوند شاد باشید','زندگی منضبط','مسئولیت‌پذیر باشید','به‌جای احساساتتان حکمت خدا را دنبال کنید','راهی تازه'];
  const shorts=shortTitles.map((title,i)=>({id:`short-message-${String(i+1).padStart(3,'0')}`,category:'short',src:`audio/fa/short-messages/${String(i+1).padStart(3,'0')}.m4a`,title,desc:'پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.',tag:'پیام کوتاه'}));
  const teachingTitles=['احکام خدا','انجیل','ایمان انجیل','ارتقاء ایمان','اسارت در زندگی ایماندار','انسان روحانی و نفسانی','احترام به خداوند','۷ فایده از مشارکت با روح‌القدس','پسر خدا','تغذیه روحانی و تمرکز بر کلام','منابع مالی و شما','پنج عطیه خدمتی به کلیسا','چرا باید شب‌ها دعا کنیم؟','سفر روح‌القدس','سه عطیه روح خدا به روح ما','شکرگزاری در کلام و عمل','خدمتگزاری','خدمت مؤثر','عملکرد روح‌القدس','روز شریر','نکات فیض و ایمان','مایه برکت','لوسیفر / شیطان','عیسی کیست','اهمیت دعا','فرشتگان و پژواک حقایق','نور جهان هستید و پژواک حقایق','اتحاد قلبی','ذهن، فکر، سخن گفتن'];
  const teachings=teachingTitles.map((title,i)=>{ const n=String(i+1).padStart(3,'0'); return {id:`teaching-${n}`,category:'teaching',src:`audio/fa/teachings/${n}.${n==='027'?'mp3':'m4a'}`,title,desc:'تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.',tag:'تعلیم'}; });
  const AUDIO_ITEMS=[...morning,...shorts,...teachings];
  window.OMIDNO7_AUDIO_ITEMS=AUDIO_ITEMS;
  function ensurePage(){
    addStyle();
    let section=d.getElementById('audioMessages');
    if(!section){ section=d.createElement('section'); section.id='audioMessages'; section.className='page'; (d.querySelector('main')||d.body).appendChild(section); }
    return section;
  }
  function audioEl(id){ return d.getElementById('audio-player-'+id); }
  window.playAudio=function(id){ const a=audioEl(id); if(!a)return; d.querySelectorAll('.spiritual-audio-el').forEach(x=>{if(x!==a)x.pause();}); if(a.paused){ const p=a.play(); if(p&&p.catch)p.catch(()=>{}); } else a.pause(); };
  window.stopAudio=function(id){ const a=audioEl(id); if(!a)return; a.pause(); a.currentTime=0; };
  window.seekAudio=function(id,sec){ const a=audioEl(id); if(!a)return; a.currentTime=Math.max(0,Math.min((a.duration||999999),(a.currentTime||0)+sec)); };
  window.setAudioSpeed=function(id,rate){ const a=audioEl(id); if(!a)return; a.playbackRate=rate; d.querySelectorAll('[data-speed-for="'+id+'"]').forEach(b=>b.classList.toggle('active',Number(b.dataset.rate)===rate)); };
  window.toggleAudioNote=function(id){ const box=d.getElementById('audio-note-box-'+id); if(box) box.hidden=!box.hidden; };
  window.saveAudioNote=function(id){ const el=d.getElementById('audio-note-'+id); if(!el)return; localStorage.setItem('audio_note_'+id,el.value||''); const st=d.getElementById('audio-note-status-'+id); if(st)st.textContent='ذخیره شد'; };
  window.toggleAudioFavorite=function(id){ const k='audio_favorite_'+id; localStorage.getItem(k)==='1'?localStorage.removeItem(k):localStorage.setItem(k,'1'); renderSpiritualAudioList(window.currentAudioCategory||'morning'); };
  window.audioShareLink=function(id){ const url=new URL(location.href); url.searchParams.set('v','47'); url.searchParams.set('audio',id); url.searchParams.delete('reset'); return url.origin+url.pathname+url.search; };
  window.shareAudioMessage=async function(id){ const item=AUDIO_ITEMS.find(x=>x.id===id); if(!item)return; const link=window.audioShareLink(id); const text=item.title+'\n\nبرای گوش دادن به این پیام صوتی از اپ کلیسای امیدنو۷ وارد شوید:\n'+link; try{ if(navigator.share) await navigator.share({title:item.title,text,url:link}); else { await navigator.clipboard.writeText(text); alert('لینک پیام کپی شد'); } }catch(e){ try{ await navigator.clipboard.writeText(text); alert('لینک پیام کپی شد'); }catch(err){ prompt('لینک پیام:',link); } } };
  window.renderSpiritualAudioFeature=function(){
    addStyle();
    const home=d.getElementById('home'); if(!home) return;
    home.querySelectorAll('[data-audio-home-card]').forEach(el=>el.remove());
    if(lang()!=='fa') return;
    const card=d.createElement('div');
    card.className='card feature-card audio-home-card';
    card.setAttribute('data-audio-home-card','1');
    card.innerHTML='<h3>پیام‌های صوتی روحانی</h3><p>نیایش‌های صبحگاهی، پیام‌های کوتاه و تعالیم صوتی برای تقویت ایمان.</p><button class="btn primary" type="button" onclick="openSpiritualAudio()">باز کردن پیام‌های صوتی</button>';
    const grid=home.querySelector('.home-feature-grid');
    if(grid) grid.prepend(card); else home.prepend(card);
  };
  window.openSpiritualAudio=function(audioId){ ensurePage(); showPage('audioMessages'); window.renderSpiritualAudioMessages(audioId); };
  window.renderSpiritualAudioMessages=function(audioId){
    const root=ensurePage();
    if(lang()!=='fa'){
      root.innerHTML='<div class="section-title"><h2>Audio Messages</h2></div><div class="card"><p>Audio messages for this language will be added soon.</p></div>';
      return;
    }
    const cats=[{id:'morning',label:'نیایش صبحگاهی'},{id:'short',label:'پیام‌های کوتاه'},{id:'teaching',label:'تعالیم'}];
    const targetId=audioId || new URLSearchParams(location.search).get('audio');
    const target=AUDIO_ITEMS.find(x=>x.id===targetId);
    const def=target?target.category:(window.currentAudioCategory||'morning');
    root.innerHTML='<div class="section-title"><h2>پیام‌های صوتی روحانی</h2></div><div class="card audio-hero"><h1>پیام‌های صوتی روحانی</h1><p>موعظه‌ها، تعالیم، دعاها و پیام‌های کوتاه برای تقویت ایمان.</p><div class="audio-category-row">'+cats.map(c=>'<button class="audio-cat-btn '+(c.id===def?'active':'')+'" type="button" data-audio-cat="'+c.id+'">'+c.label+'</button>').join('')+'</div></div><div id="audioMessagesList"></div>';
    root.querySelectorAll('[data-audio-cat]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-audio-cat]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); window.renderSpiritualAudioList(btn.dataset.audioCat); }));
    window.renderSpiritualAudioList(def);
    if(targetId){ setTimeout(()=>{ const el=d.getElementById('audio-card-'+targetId); if(el) el.scrollIntoView({behavior:'smooth',block:'center'}); },100); }
  };
  window.renderSpiritualAudioList=function(cat){
    window.currentAudioCategory=cat || 'morning';
    const list=d.getElementById('audioMessagesList'); if(!list)return;
    const items=AUDIO_ITEMS.filter(x=>x.category===window.currentAudioCategory);
    list.innerHTML=items.length?items.map(item=>{
      const note=localStorage.getItem('audio_note_'+item.id)||'';
      const fav=localStorage.getItem('audio_favorite_'+item.id)==='1';
      return '<div class="card audio-message-card" id="audio-card-'+item.id+'"><div class="audio-message-head"><span class="audio-tag">'+item.tag+'</span><h3>'+item.title+'</h3><p>'+item.desc+'</p></div><audio id="audio-player-'+item.id+'" class="spiritual-audio-el" preload="metadata" controls src="'+item.src+'"></audio><div class="audio-control-bar"><button type="button" onclick="playAudio(\''+item.id+'\')">▶︎ / ⏸</button><button type="button" onclick="seekAudio(\''+item.id+'\',-15)">-۱۵ ثانیه</button><button type="button" onclick="seekAudio(\''+item.id+'\',15)">+۱۵ ثانیه</button><button type="button" onclick="stopAudio(\''+item.id+'\')">توقف</button></div><div class="audio-speed-row"><strong>سرعت:</strong><button type="button" class="active" data-speed-for="'+item.id+'" data-rate="1" onclick="setAudioSpeed(\''+item.id+'\',1)">1x</button><button type="button" data-speed-for="'+item.id+'" data-rate="1.25" onclick="setAudioSpeed(\''+item.id+'\',1.25)">1.25x</button><button type="button" data-speed-for="'+item.id+'" data-rate="1.5" onclick="setAudioSpeed(\''+item.id+'\',1.5)">1.5x</button><button type="button" data-speed-for="'+item.id+'" data-rate="2" onclick="setAudioSpeed(\''+item.id+'\',2)">2x</button></div><div class="audio-action-row"><button class="btn secondary" type="button" onclick="toggleAudioNote(\''+item.id+'\')">یادداشت</button><button class="btn secondary" type="button" onclick="toggleAudioFavorite(\''+item.id+'\')">'+(fav?'★ ستاره‌دار':'☆ ستاره‌دار')+'</button><button class="btn gold" type="button" onclick="shareAudioMessage(\''+item.id+'\')">اشتراک‌گذاری لینک</button></div><div class="audio-note-box" id="audio-note-box-'+item.id+'" hidden><textarea id="audio-note-'+item.id+'" maxlength="1000" placeholder="یادداشت شما...">'+note+'</textarea><div class="audio-action-row"><button class="btn primary" type="button" onclick="saveAudioNote(\''+item.id+'\')">ذخیره یادداشت</button><span class="status" id="audio-note-status-'+item.id+'"></span></div></div></div>';
    }).join(''):'<div class="card audio-empty-card"><p>فعلاً پیامی در این دسته‌بندی ثبت نشده است.</p></div>';
  };
  function boot(){ addStyle(); window.renderSpiritualAudioFeature(); if(d.getElementById('audioMessages')?.classList.contains('active')) window.renderSpiritualAudioMessages(); const audioParam=new URLSearchParams(location.search).get('audio'); if(audioParam) setTimeout(()=>window.openSpiritualAudio(audioParam),250); }
  d.addEventListener('DOMContentLoaded',boot);
  setTimeout(boot,300);
})();
