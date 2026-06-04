/* Omideno7 V63.49f — Restore Home Core Cards Beta
   Restores Home cards accidentally hidden/removed:
   - Faith Declaration
   - My Notes
   - Saved Verses
   Keeps existing notification/data systems when present; otherwise provides safe localStorage fallback.
*/
(function(){
  'use strict';

  var VERSION = 'V63.49f Restore Home Core Cards Beta';
  var NOTES_KEY = 'omideno7_my_notes';
  var VERSES_KEY = 'omideno7_saved_verses';
  var FAITH_KEY = 'omideno7_daily_faith_declaration_done';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6349|v=6348|v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function normalizeLang(v){
    v=String(v||'').toLowerCase().trim();
    if(v==='fa'||v.indexOf('pers')!==-1||v.indexOf('farsi')!==-1||v.startsWith('fa-')) return 'fa';
    if(v==='en'||v.indexOf('english')!==-1||v.startsWith('en-')) return 'en';
    if(v==='hr'||v.indexOf('cro')!==-1||v.indexOf('hrv')!==-1||v.indexOf('kro')!==-1||v.startsWith('hr-')) return 'hr';
    return 'fa';
  }
  function lang(){
    try{return normalizeLang(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa');}
    catch(e){return 'fa';}
  }

  function T(k){
    var fa={
      faithTitle:'اعلان ایمان',
      faithText:'هر روز کلام خدا را با ایمان اعلام کن و ذهن و زبان خود را با حقیقت خدا هماهنگ ساز.',
      faithBtn:'اعلان ایمان امروز',
      faithDone:'اعلان ایمان امروز ثبت شد',
      faithDeclaration:'من در مسیح خلقت تازه هستم. حیات خدا در من است. امروز با ایمان، حکمت، محبت و قوت روح‌القدس زندگی می‌کنم. کلام خدا مسیر مرا روشن می‌کند و من در پیروزی قدم برمی‌دارم. آمین.',
      notesTitle:'یادداشت‌های من',
      notesText:'یادداشت‌های شخصی خود را درباره کلام، دعا، جلسات و تعلیم‌ها اینجا ثبت کن.',
      notesBtn:'باز کردن یادداشت‌ها',
      savedTitle:'آیات ذخیره‌شده',
      savedText:'آیاتی را که برای دعا، مطالعه و تقویت ایمان ذخیره کرده‌ای اینجا ببین.',
      savedBtn:'نمایش آیات ذخیره‌شده',
      close:'بستن',
      save:'ذخیره',
      addNote:'نوشتن یادداشت جدید',
      noNotes:'هنوز یادداشتی ذخیره نشده است.',
      noVerses:'هنوز آیه‌ای ذخیره نشده است.',
      placeholder:'یادداشت خود را اینجا بنویسید...',
      restored:'کارت‌های اصلی خانه بازگردانده شدند'
    };
    var en={
      faithTitle:'Faith Declaration',
      faithText:'Declare God’s Word by faith each day and align your mind and tongue with His truth.',
      faithBtn:'Declare today’s faith confession',
      faithDone:'Today’s faith declaration was marked',
      faithDeclaration:'I am a new creation in Christ. The life of God is in me. Today I live by faith, wisdom, love, and the power of the Holy Spirit. God’s Word lights my path, and I walk in victory. Amen.',
      notesTitle:'My Notes',
      notesText:'Save your personal notes about the Word, prayer, meetings, and teachings here.',
      notesBtn:'Open notes',
      savedTitle:'Saved Verses',
      savedText:'See the verses you saved for prayer, study, and strengthening your faith.',
      savedBtn:'Show saved verses',
      close:'Close',
      save:'Save',
      addNote:'Write a new note',
      noNotes:'No notes saved yet.',
      noVerses:'No saved verses yet.',
      placeholder:'Write your note here...',
      restored:'Home core cards restored'
    };
    var hr={
      faithTitle:'Ispovijedanje vjere',
      faithText:'Svakog dana vjerom izgovaraj Božju Riječ i uskladi svoj um i jezik s Njegovom istinom.',
      faithBtn:'Izgovori današnju ispovijed vjere',
      faithDone:'Današnja ispovijed vjere je označena',
      faithDeclaration:'Ja sam novo stvorenje u Kristu. Božji život je u meni. Danas živim u vjeri, mudrosti, ljubavi i sili Duha Svetoga. Božja Riječ osvjetljava moj put i hodam u pobjedi. Amen.',
      notesTitle:'Moje bilješke',
      notesText:'Ovdje spremi osobne bilješke o Riječi, molitvi, sastancima i poukama.',
      notesBtn:'Otvori bilješke',
      savedTitle:'Spremljeni stihovi',
      savedText:'Pogledaj stihove koje si spremio za molitvu, proučavanje i jačanje vjere.',
      savedBtn:'Prikaži spremljene stihove',
      close:'Zatvori',
      save:'Spremi',
      addNote:'Napiši novu bilješku',
      noNotes:'Još nema spremljenih bilješki.',
      noVerses:'Još nema spremljenih stihova.',
      placeholder:'Napiši svoju bilješku ovdje...',
      restored:'Glavne kartice početne stranice su vraćene'
    };
    var l=lang();
    return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
  }

  function esc(v){
    return String(v==null?'':v).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function today(){return new Date().toISOString().slice(0,10);}
  function now(){return new Date().toISOString();}

  function css(){
    if(document.getElementById('v6349fCss')) return;
    var st=document.createElement('style');
    st.id='v6349fCss';
    st.textContent=[
      '#v6349fHomeCore{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin:12px 0;}',
      '#v6349fHomeCore .v6349f-card{border-top:5px solid #06146D!important;background:linear-gradient(160deg,#fff,#f8fbff)!important;}',
      '#v6349fHomeCore .v6349f-card.green{border-top-color:#00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;}',
      '#v6349fHomeCore .v6349f-card.gold{border-top-color:#F59E0B!important;background:linear-gradient(160deg,#fff,#fffaf0)!important;}',
      '#v6349fHomeCore p{line-height:1.8}',
      '.v6349f-modal{position:fixed;inset:0;z-index:999999;}',
      '.v6349f-backdrop{position:absolute;inset:0;background:rgba(2,8,23,.45);backdrop-filter:blur(2px)}',
      '.v6349f-box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,720px);max-height:90vh;overflow:auto;background:#fff;border-radius:26px;padding:22px;box-shadow:0 28px 90px rgba(0,0,0,.35);border-top:6px solid #00B91F;}',
      '.v6349f-x{position:absolute;right:14px;top:10px;border:0;background:#f1f5f9;border-radius:999px;width:36px;height:36px;font-size:26px;line-height:1;}',
      '.v6349f-box textarea{width:100%;min-height:120px;border:1px solid #dbe3ef;border-radius:16px;padding:12px;font-size:15px;}',
      '.v6349f-item{background:#f8fbff;border:1px solid #dbe3ef;border-radius:16px;padding:12px;margin:10px 0;line-height:1.8;}',
      '.v6349f-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;}',
      '.fa #v6349fHomeCore,.fa .v6349f-box{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function getJson(key, fallback){
    try{return JSON.parse(localStorage.getItem(key)||'null') || fallback;}catch(e){return fallback;}
  }
  function setJson(key, val){localStorage.setItem(key, JSON.stringify(val));}

  function coreHtml(){
    return '<div id="v6349fHomeCore">'+
      '<div class="card v6349f-card green"><h3>🗣️ '+esc(T('faithTitle'))+'</h3><p>'+esc(T('faithText'))+'</p><button class="btn primary" id="v6349fFaith">'+esc(T('faithBtn'))+'</button></div>'+
      '<div class="card v6349f-card"><h3>📝 '+esc(T('notesTitle'))+'</h3><p>'+esc(T('notesText'))+'</p><button class="btn secondary" id="v6349fNotes">'+esc(T('notesBtn'))+'</button></div>'+
      '<div class="card v6349f-card gold"><h3>📖 '+esc(T('savedTitle'))+'</h3><p>'+esc(T('savedText'))+'</p><button class="btn secondary" id="v6349fVerses">'+esc(T('savedBtn'))+'</button></div>'+
    '</div>';
  }

  function renderHomeCore(){
    css();
    var home=document.getElementById('home');
    if(!home) return;

    // If old original cards exist but are hidden by previous patches, unhide where possible.
    Array.prototype.slice.call(home.querySelectorAll('.card,section,div')).forEach(function(el){
      var txt=(el.textContent||'').trim();
      if(/اعلان ایمان|Faith Declaration|Ispovijedanje vjere|یادداشت‌های من|My Notes|Moje bilješke|آیات ذخیره|Saved Verses|Spremljeni stihovi/i.test(txt)){
        el.style.display='';
        el.style.visibility='';
        el.style.height='';
      }
    });

    var existing=document.getElementById('v6349fHomeCore');
    if(existing){
      bind();
      return;
    }

    var wrap=document.createElement('div');
    wrap.innerHTML=coreHtml();

    // Place after daily encouragement/new birth area, before lower content if possible.
    var after=document.getElementById('v6349dDailyCard') || document.getElementById('v6349eNewBirthCard') || document.getElementById('v6349dSalvationCard');
    if(after && after.parentNode){
      after.parentNode.insertBefore(wrap.firstElementChild, after.nextSibling);
    }else{
      var cards=home.querySelectorAll('.card');
      var ref=cards && cards.length ? cards[Math.min(2,cards.length-1)] : null;
      if(ref && ref.parentNode) ref.parentNode.insertBefore(wrap.firstElementChild, ref.nextSibling);
      else home.insertBefore(wrap.firstElementChild, home.firstChild);
    }
    bind();
  }

  function bind(){
    var f=document.getElementById('v6349fFaith');
    if(f) f.onclick=function(ev){ev.preventDefault(); openFaith(); return false;};
    var n=document.getElementById('v6349fNotes');
    if(n) n.onclick=function(ev){ev.preventDefault(); openNotes(); return false;};
    var v=document.getElementById('v6349fVerses');
    if(v) v.onclick=function(ev){ev.preventDefault(); openVerses(); return false;};
  }

  function modal(title, body){
    closeModal();
    var div=document.createElement('div');
    div.className='v6349f-modal';
    div.id='v6349fModal';
    div.innerHTML='<div class="v6349f-backdrop"></div><div class="v6349f-box"><button class="v6349f-x">×</button><h2>'+esc(title)+'</h2>'+body+'</div>';
    document.body.appendChild(div);
    div.querySelector('.v6349f-backdrop').onclick=closeModal;
    div.querySelector('.v6349f-x').onclick=closeModal;
  }
  function closeModal(){var m=document.getElementById('v6349fModal'); if(m) m.remove();}

  function openFaith(){
    var key=FAITH_KEY+'_'+today();
    localStorage.setItem(key,'1');
    // Integrate with rewards if present
    try{
      if(window.OMIDENO7_V6348_REWARDS_BETA && typeof window.OMIDENO7_V6348_REWARDS_BETA.mark==='function'){
        window.OMIDENO7_V6348_REWARDS_BETA.mark('confession','faith-card');
      }
    }catch(e){}
    modal(T('faithTitle'),
      '<div class="v6349f-item"><strong>'+esc(T('faithDeclaration'))+'</strong></div>'+
      '<p class="v6349f-item">✅ '+esc(T('faithDone'))+'</p>'+
      '<div class="v6349f-actions"><button class="btn primary" onclick="document.getElementById(\\'v6349fModal\\').remove()">'+esc(T('close'))+'</button></div>'
    );
  }

  function openNotes(){
    var notes=getJson(NOTES_KEY, []);
    var list=notes.length ? notes.map(function(x,i){
      return '<div class="v6349f-item"><small>'+esc(x.time||'')+'</small><br>'+esc(x.text||'')+'</div>';
    }).join('') : '<p class="v6349f-item">'+esc(T('noNotes'))+'</p>';
    modal(T('notesTitle'),
      '<label><strong>'+esc(T('addNote'))+'</strong></label><textarea id="v6349fNoteText" placeholder="'+esc(T('placeholder'))+'"></textarea>'+
      '<div class="v6349f-actions"><button class="btn primary" id="v6349fSaveNote">'+esc(T('save'))+'</button><button class="btn light" id="v6349fCloseNote">'+esc(T('close'))+'</button></div>'+
      '<h3>'+esc(T('notesTitle'))+'</h3>'+list
    );
    document.getElementById('v6349fSaveNote').onclick=function(){
      var txt=(document.getElementById('v6349fNoteText').value||'').trim();
      if(!txt) return;
      var arr=getJson(NOTES_KEY, []);
      arr.unshift({text:txt,time:now(),lang:lang()});
      setJson(NOTES_KEY, arr.slice(0,200));
      openNotes();
    };
    document.getElementById('v6349fCloseNote').onclick=closeModal;
  }

  function openVerses(){
    var verses=getJson(VERSES_KEY, []);
    // Also collect common older saved verse keys if app used another key.
    ['savedVerses','omideno7_verses_saved','favoriteVerses','bookmarkedVerses'].forEach(function(k){
      var extra=getJson(k, []);
      if(Array.isArray(extra) && extra.length) verses=verses.concat(extra);
    });
    var html=verses.length ? verses.slice(0,100).map(function(x){
      if(typeof x==='string') return '<div class="v6349f-item">'+esc(x)+'</div>';
      return '<div class="v6349f-item"><strong>'+esc(x.ref||x.reference||x.verse||'')+'</strong><br>'+esc(x.text||x.content||JSON.stringify(x))+'</div>';
    }).join('') : '<p class="v6349f-item">'+esc(T('noVerses'))+'</p>';
    modal(T('savedTitle'), html+'<div class="v6349f-actions"><button class="btn light" id="v6349fCloseVerses">'+esc(T('close'))+'</button></div>');
    document.getElementById('v6349fCloseVerses').onclick=closeModal;
  }

  function render(){
    renderHomeCore();
  }

  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('load',render);
  document.addEventListener('click',function(){setTimeout(render,150);},true);
  setInterval(render,2000);
  setTimeout(render,500);
  setTimeout(render,1600);

  window.OMIDENO7_V6349F_RESTORE_HOME_CORE={
    render:render,
    openFaith:openFaith,
    openNotes:openNotes,
    openVerses:openVerses,
    version:VERSION
  };
})();
