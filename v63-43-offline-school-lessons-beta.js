/* Omideno7 V63.43 — Offline School Lessons Beta
   Beta-only. Does not affect public index.html.

   Goal:
   - Save opened School lesson/text content locally while online.
   - When offline, show saved lessons instead of a blank/error page.
   - Store offline notes/homework locally as a queue for future sync.
   - No automatic audio/video download in this version.
*/
(function(){
  'use strict';

  var VERSION = 'V63.43 Offline School Lessons Beta';
  var LESSONS_KEY = 'omideno7_v6343_school_lessons';
  var NOTES_QUEUE_KEY = 'omideno7_v6343_school_notes_queue';
  var LOG_KEY = 'omideno7_v6343_school_log';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
    catch(e){ return 'fa'; }
  }

  function tr(k){
    var fa = {
      title:'درس‌های مدرسه آفلاین — Beta V63.43',
      intro:'این نسخه درس‌هایی را که هنگام آنلاین بودن باز می‌کنید ذخیره می‌کند تا در حالت آفلاین بتوانید دوباره بخوانید. صوت و ویدیو هنوز در این مرحله ذخیره نمی‌شوند.',
      saveCurrent:'ذخیره درس فعلی برای آفلاین',
      showSaved:'نمایش درس‌های ذخیره‌شده',
      addNote:'ثبت یادداشت/تکلیف آفلاین',
      syncNotes:'ارسال یادداشت‌های آفلاین به صف کلود',
      clearLog:'پاک کردن گزارش',
      clearLessons:'پاک کردن درس‌های ذخیره‌شده',
      status:'آماده تست درس‌های آفلاین',
      saved:'درس فعلی برای آفلاین ذخیره شد',
      noLesson:'متن درس قابل ذخیره پیدا نشد. وقتی آنلاین هستید وارد یک درس واقعی شوید و دوباره امتحان کنید.',
      savedLessons:'درس‌های ذخیره‌شده',
      noSaved:'هنوز هیچ درسی برای آفلاین ذخیره نشده است.',
      offlineTitle:'مدرسه آفلاین',
      offlineText:'اینترنت قطع است. درس‌های ذخیره‌شده را می‌توانید اینجا بخوانید. برای درس‌های جدید، ورود، تأیید حساب، ارسال تکلیف و صوت‌های جدید اینترنت لازم است.',
      noteLabel:'یادداشت یا تکلیف آفلاین',
      notePlaceholder:'متن یادداشت یا تکلیف را اینجا بنویسید...',
      noteSaved:'یادداشت در صف آفلاین ذخیره شد',
      noteEmpty:'متن یادداشت خالی است',
      synced:'یادداشت‌های آفلاین به صف کلود ارسال شدند',
      error:'خطا',
      online:'وضعیت اینترنت',
      lessonsCount:'درس‌های ذخیره‌شده',
      queueCount:'یادداشت‌های در صف',
      lastSaved:'آخرین ذخیره',
      back:'بازگشت',
      open:'باز کردن',
      delete:'حذف',
      help:'تست: وقتی اینترنت وصل است وارد یک درس مدرسه شو و «ذخیره درس فعلی» را بزن. بعد اینترنت را قطع کن و دوباره مدرسه را باز کن؛ باید لیست درس‌های ذخیره‌شده را ببینی.'
    };
    var en = {
      title:'Offline School Lessons — Beta V63.43',
      intro:'This version saves School lessons you open while online so you can read them again offline. Audio/video is not stored yet.',
      saveCurrent:'Save current lesson offline',
      showSaved:'Show saved lessons',
      addNote:'Add offline note/homework',
      syncNotes:'Send offline notes to cloud queue',
      clearLog:'Clear log',
      clearLessons:'Clear saved lessons',
      status:'Ready to test offline lessons',
      saved:'Current lesson saved for offline',
      noLesson:'No lesson text found. Open a real lesson while online and try again.',
      savedLessons:'Saved lessons',
      noSaved:'No lessons saved for offline yet.',
      offlineTitle:'School Offline',
      offlineText:'Internet is disconnected. You can read saved lessons here. New lessons, sign-in, approval, homework upload, and new audio require internet.',
      noteLabel:'Offline note or homework',
      notePlaceholder:'Write your note or homework here...',
      noteSaved:'Note saved to offline queue',
      noteEmpty:'Note text is empty',
      synced:'Offline notes were sent to cloud queue',
      error:'Error',
      online:'Network',
      lessonsCount:'Saved lessons',
      queueCount:'Queued notes',
      lastSaved:'Last saved',
      back:'Back',
      open:'Open',
      delete:'Delete',
      help:'Test: while online, open a School lesson and press Save current lesson. Then turn internet off and open School again; saved lessons should appear.'
    };
    var hr = {
      title:'Offline lekcije škole — Beta V63.43',
      intro:'Ova verzija sprema lekcije škole koje otvorite dok ste online kako biste ih kasnije mogli čitati offline. Audio/video još se ne sprema.',
      saveCurrent:'Spremi trenutnu lekciju offline',
      showSaved:'Prikaži spremljene lekcije',
      addNote:'Dodaj offline bilješku/zadaću',
      syncNotes:'Pošalji offline bilješke u cloud red',
      clearLog:'Obriši zapis',
      clearLessons:'Obriši spremljene lekcije',
      status:'Spremno za test offline lekcija',
      saved:'Trenutna lekcija je spremljena offline',
      noLesson:'Tekst lekcije nije pronađen. Otvorite pravu lekciju dok ste online i pokušajte ponovno.',
      savedLessons:'Spremljene lekcije',
      noSaved:'Još nema spremljenih lekcija.',
      offlineTitle:'Škola offline',
      offlineText:'Internet je isključen. Ovdje možete čitati spremljene lekcije. Za nove lekcije, prijavu, odobrenje i slanje zadaće potreban je internet.',
      noteLabel:'Offline bilješka ili zadaća',
      notePlaceholder:'Napišite bilješku ili zadaću...',
      noteSaved:'Bilješka spremljena u offline red',
      noteEmpty:'Tekst bilješke je prazan',
      synced:'Offline bilješke poslane su u cloud red',
      error:'Greška',
      online:'Mreža',
      lessonsCount:'Spremljene lekcije',
      queueCount:'Bilješke u redu',
      lastSaved:'Zadnje spremljeno',
      back:'Natrag',
      open:'Otvori',
      delete:'Obriši',
      help:'Test: dok ste online, otvorite lekciju škole i spremite je. Zatim isključite internet i otvorite školu; spremljene lekcije trebaju biti dostupne.'
    };
    return (lang()==='hr'?hr:(lang()==='en'?en:fa))[k] || fa[k] || k;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function now(){ return new Date().toISOString(); }

  function log(type, msg, details){
    var arr = [];
    try { arr = JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); } catch(e){ arr = []; }
    arr.unshift({time:now(), type:type||'info', message:String(msg||''), details:details||null});
    arr = arr.slice(0, 35);
    try { localStorage.setItem(LOG_KEY, JSON.stringify(arr)); } catch(e){}
    renderLog();
  }
  function getLog(){ try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];} }

  function getLessons(){
    try { return JSON.parse(localStorage.getItem(LESSONS_KEY) || '[]'); } catch(e){ return []; }
  }
  function setLessons(list){
    try { localStorage.setItem(LESSONS_KEY, JSON.stringify(list || [])); } catch(e){}
  }
  function getNotesQueue(){
    try { return JSON.parse(localStorage.getItem(NOTES_QUEUE_KEY) || '[]'); } catch(e){ return []; }
  }
  function setNotesQueue(q){
    try { localStorage.setItem(NOTES_QUEUE_KEY, JSON.stringify(q || [])); } catch(e){}
  }

  function findSchool(){
    return document.getElementById('school') ||
           document.getElementById('schoolPage') ||
           document.querySelector('[data-page="school"]') ||
           document.querySelector('.page.school') ||
           null;
  }

  function schoolVisible(){
    var s=findSchool();
    if(!s) return false;
    if(s.classList.contains('active')) return true;
    try{
      var st=getComputedStyle(s), r=s.getBoundingClientRect();
      return st.display !== 'none' && st.visibility !== 'hidden' && r.width > 0 && r.height > 0;
    }catch(e){ return false; }
  }

  function cleanText(txt){
    return String(txt || '')
      .replace(/\s+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function extractLesson(){
    var s = findSchool();
    if(!s) return null;

    var clone = s.cloneNode(true);
    // Remove beta/admin/offline panels and technical logs.
    Array.prototype.slice.call(clone.querySelectorAll('#v6343SchoolOfflinePanel,#v6342OfflinePanel,#v6342bSchoolOfflineCss,#v6341gPanel,#v6340CloudDiagnosticPanel,.v6343-panel,.v6342b-school-offline')).forEach(function(el){ el.remove(); });
    Array.prototype.slice.call(clone.querySelectorAll('script,style,noscript,button,input,textarea,select')).forEach(function(el){ el.remove(); });

    var text = cleanText(clone.innerText || '');
    if(!text || text.length < 80) return null;
    if(/TypeError|Load failed|در حال بارگذاری|Loading|failed/i.test(text) && text.length < 500) return null;

    var h = s.querySelector('h1,h2,h3,.lesson-title,.class-title,.title');
    var title = cleanText(h ? h.textContent : '');
    if(!title){
      var first = text.split('\n').filter(Boolean)[0] || tr('savedLessons');
      title = first.slice(0, 80);
    }

    if(!/مدرسه|درس|کلاس|School|lesson|class|homework|تکلیف|آموزش|student|دانش/i.test(text)){
      return null;
    }

    return {
      id:'lesson-' + Date.now(),
      title:title,
      text:text.slice(0, 50000),
      language:lang(),
      saved_at:now(),
      source:'school-visible-page'
    };
  }

  function saveCurrentLesson(){
    var lesson = extractLesson();
    if(!lesson){
      status(tr('noLesson'), 'warn');
      log('warn', tr('noLesson'));
      return null;
    }
    var list = getLessons();
    // Prevent exact duplicates.
    list = list.filter(function(x){ return (x.title !== lesson.title) || (x.text.slice(0,300) !== lesson.text.slice(0,300)); });
    list.unshift(lesson);
    list = list.slice(0, 25);
    setLessons(list);
    status(tr('saved'), 'ok');
    log('success', tr('saved'), {title:lesson.title, length:lesson.text.length});
    renderFields();
    return lesson;
  }

  function addOfflineNote(){
    var input = document.getElementById('v6343OfflineNoteText');
    var text = cleanText(input ? input.value : '');
    if(!text){
      status(tr('noteEmpty'), 'warn');
      return;
    }
    var q = getNotesQueue();
    q.push({
      id:'school-note-' + Date.now(),
      type:'school_note',
      operation:'insert',
      payload:{
        text:text,
        language:lang(),
        created_at:now(),
        online:navigator.onLine
      },
      status:'pending',
      created_at:now()
    });
    setNotesQueue(q);
    if(input) input.value = '';
    status(tr('noteSaved'), 'ok');
    log('success', tr('noteSaved'), {length:text.length});
    renderFields();
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

  async function syncNotesQueue(){
    var sb = findClient();
    if(!sb) throw new Error('Supabase client not found');
    var ures = await sb.auth.getUser();
    if(ures.error) throw ures.error;
    var user = ures.data && ures.data.user;
    if(!user) throw new Error('User is not signed in');

    var q = getNotesQueue();
    var pending = q.filter(function(x){ return x.status === 'pending'; });
    var synced = 0;
    for(var i=0;i<pending.length;i++){
      var item = pending[i];
      var res = await sb.from('offline_sync_queue').insert({
        user_id:user.id,
        item_type:item.type || 'school_note',
        operation:item.operation || 'insert',
        payload:item.payload || {},
        status:'pending',
        updated_at:now()
      });
      if(res.error) throw res.error;
      item.status = 'synced';
      item.synced_at = now();
      synced++;
    }
    setNotesQueue(q);
    status(tr('synced') + ': ' + synced, 'ok');
    log('success', tr('synced'), {synced:synced});
    renderFields();
  }

  function status(msg, type){
    var el=document.getElementById('v6343Status');
    if(!el) return;
    el.className='v6343-status ' + (type || 'info');
    el.textContent=msg;
  }

  function css(){
    if(document.getElementById('v6343Css')) return;
    var st=document.createElement('style');
    st.id='v6343Css';
    st.textContent=[
      '#v6343SchoolPanel{border-top:5px solid #6D28D9!important;background:linear-gradient(160deg,#fff,#faf7ff)!important;display:block!important;visibility:visible!important;opacity:1!important;}',
      '.v6343-status{border-radius:14px;padding:10px 12px;margin:10px 0;font-weight:800}.v6343-status.info{background:#f3e8ff;color:#4c1d95}.v6343-status.ok{background:#eaffef;color:#08751a}.v6343-status.warn{background:#fff7df;color:#8a5a00}.v6343-status.error{background:#fff0f0;color:#9b1c1c}',
      '.v6343-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:12px 0}.v6343-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6343-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '#v6343OfflineNoteText{width:100%;min-height:90px;border:1px solid #e6eaf2;border-radius:14px;padding:12px;font:inherit}.v6343-lesson{background:#fff;border:1px solid #e6eaf2;border-radius:14px;padding:12px;margin:10px 0}.v6343-lesson pre{white-space:pre-wrap;font:inherit;line-height:1.9;max-height:320px;overflow:auto}.fa #v6343SchoolPanel,.fa .v6343-school-offline{direction:rtl;text-align:right;}',
      '.v6343-school-offline{border-top:5px solid #6D28D9;background:linear-gradient(160deg,#fff,#faf7ff);border-radius:20px;padding:18px;margin:18px auto;max-width:760px;box-shadow:0 8px 28px rgba(15,23,42,.08)}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function panelHtml(){
    return '<div id="v6343SchoolPanel" class="card v6343-panel">'+
      '<h3>'+esc(tr('title'))+'</h3>'+
      '<p>'+esc(tr('intro'))+'</p>'+
      '<div id="v6343Status" class="v6343-status info">'+esc(tr('status'))+'</div>'+
      '<div class="v6343-grid">'+
        '<div><strong>'+esc(tr('online'))+':</strong> <span id="v6343Online">—</span></div>'+
        '<div><strong>'+esc(tr('lessonsCount'))+':</strong> <span id="v6343LessonsCount">—</span></div>'+
        '<div><strong>'+esc(tr('queueCount'))+':</strong> <span id="v6343QueueCount">—</span></div>'+
        '<div><strong>'+esc(tr('lastSaved'))+':</strong> <span id="v6343LastSaved">—</span></div>'+
      '</div>'+
      '<div class="v6343-actions">'+
        '<button type="button" class="btn primary" id="v6343SaveLesson">'+esc(tr('saveCurrent'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6343ShowSaved">'+esc(tr('showSaved'))+'</button>'+
        '<button type="button" class="btn gold" id="v6343SyncNotes">'+esc(tr('syncNotes'))+'</button>'+
        '<button type="button" class="btn light" id="v6343ClearLessons">'+esc(tr('clearLessons'))+'</button>'+
        '<button type="button" class="btn light" id="v6343ClearLog">'+esc(tr('clearLog'))+'</button>'+
      '</div>'+
      '<label><strong>'+esc(tr('noteLabel'))+'</strong></label>'+
      '<textarea id="v6343OfflineNoteText" placeholder="'+esc(tr('notePlaceholder'))+'"></textarea>'+
      '<div class="v6343-actions"><button type="button" class="btn primary" id="v6343AddNote">'+esc(tr('addNote'))+'</button></div>'+
      '<p class="small">'+esc(tr('help'))+'</p>'+
      '<div id="v6343SavedLessons"></div>'+
      '<div id="v6343Log"></div>'+
    '</div>';
  }

  function renderPanel(){
    css();
    var more=document.getElementById('more');
    if(!more) return;
    var panel=document.getElementById('v6343SchoolPanel');
    if(!panel){
      var footer=more.querySelector('.footer');
      var wrap=document.createElement('div');
      wrap.innerHTML=panelHtml();
      panel=wrap.firstElementChild;
      more.insertBefore(panel, footer || null);
    }
    bindPanel();
    renderFields();
    renderLog();
  }

  function bindPanel(){
    function b(id, fn){
      var el=document.getElementById(id);
      if(!el || el.dataset.v6343Bound) return;
      el.dataset.v6343Bound='1';
      el.addEventListener('click', function(ev){
        ev.preventDefault(); ev.stopPropagation();
        fn();
        return false;
      }, true);
    }
    b('v6343SaveLesson', saveCurrentLesson);
    b('v6343ShowSaved', function(){ renderSavedLessons(true); });
    b('v6343AddNote', addOfflineNote);
    b('v6343SyncNotes', function(){ syncNotesQueue().catch(function(e){ status(tr('error')+': '+(e.message||e),'error'); log('error', e.message||e); }); });
    b('v6343ClearLessons', function(){ setLessons([]); renderSavedLessons(false); renderFields(); status(tr('clearLessons'), 'ok'); });
    b('v6343ClearLog', function(){ localStorage.removeItem(LOG_KEY); renderLog(); status(tr('status'),'info'); });
  }

  function renderFields(){
    var lessons=getLessons();
    var q=getNotesQueue();
    var last=lessons[0] && lessons[0].saved_at || '—';
    var set=function(id,v){var el=document.getElementById(id); if(el) el.textContent=v;};
    set('v6343Online', navigator.onLine ? 'online' : 'offline');
    set('v6343LessonsCount', String(lessons.length));
    set('v6343QueueCount', q.filter(function(x){return x.status==='pending';}).length + ' pending / ' + q.length + ' total');
    set('v6343LastSaved', last);
  }

  function renderSavedLessons(openAll){
    var box=document.getElementById('v6343SavedLessons');
    if(!box) return;
    var lessons=getLessons();
    if(!lessons.length){
      box.innerHTML='<p class="v6343-status warn">'+esc(tr('noSaved'))+'</p>';
      return;
    }
    box.innerHTML='<h4>'+esc(tr('savedLessons'))+'</h4>'+lessons.map(function(l, idx){
      return '<div class="v6343-lesson" data-idx="'+idx+'">'+
        '<h4>'+esc(l.title)+'</h4>'+
        '<p class="small">'+esc(l.saved_at)+'</p>'+
        '<div class="v6343-actions">'+
          '<button type="button" class="btn secondary" data-v6343-open="'+idx+'">'+esc(tr('open'))+'</button>'+
          '<button type="button" class="btn light" data-v6343-delete="'+idx+'">'+esc(tr('delete'))+'</button>'+
        '</div>'+
        '<pre style="'+(openAll?'':'display:none')+'" id="v6343LessonText'+idx+'">'+esc(l.text)+'</pre>'+
      '</div>';
    }).join('');
    bindSavedLessonButtons();
  }

  function bindSavedLessonButtons(){
    Array.prototype.slice.call(document.querySelectorAll('[data-v6343-open]')).forEach(function(btn){
      if(btn.dataset.bound) return;
      btn.dataset.bound='1';
      btn.addEventListener('click', function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var idx=btn.getAttribute('data-v6343-open');
        var pre=document.getElementById('v6343LessonText'+idx);
        if(pre) pre.style.display = pre.style.display === 'none' ? 'block' : 'none';
      }, true);
    });
    Array.prototype.slice.call(document.querySelectorAll('[data-v6343-delete]')).forEach(function(btn){
      if(btn.dataset.bound) return;
      btn.dataset.bound='1';
      btn.addEventListener('click', function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var idx=parseInt(btn.getAttribute('data-v6343-delete'),10);
        var lessons=getLessons();
        lessons.splice(idx,1);
        setLessons(lessons);
        renderSavedLessons(false);
        renderFields();
      }, true);
    });
  }

  function renderLog(){
    var box=document.getElementById('v6343Log');
    if(!box) return;
    var arr=getLog();
    if(!arr.length){ box.innerHTML=''; return; }
    box.innerHTML=arr.map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details||{},null,2))+'</pre></details>';
    }).join('');
  }

  function schoolOfflineHtml(){
    var lessons=getLessons();
    return '<div class="v6343-school-offline">'+
      '<h3>'+esc(tr('offlineTitle'))+'</h3>'+
      '<p class="v6343-status warn">'+esc(tr('offlineText'))+'</p>'+
      (lessons.length ? '<h4>'+esc(tr('savedLessons'))+'</h4>'+lessons.map(function(l,idx){
        return '<div class="v6343-lesson"><h4>'+esc(l.title)+'</h4><p class="small">'+esc(l.saved_at)+'</p><pre>'+esc(l.text)+'</pre></div>';
      }).join('') : '<p class="v6343-status warn">'+esc(tr('noSaved'))+'</p>')+
      '<label><strong>'+esc(tr('noteLabel'))+'</strong></label>'+
      '<textarea id="v6343OfflineNoteTextSchool" placeholder="'+esc(tr('notePlaceholder'))+'"></textarea>'+
      '<div class="v6343-actions"><button type="button" class="btn primary" id="v6343AddNoteFromSchool">'+esc(tr('addNote'))+'</button></div>'+
    '</div>';
  }

  function showOfflineLessonsInSchool(){
    var s=findSchool();
    if(!s) return false;
    css();
    s.innerHTML=schoolOfflineHtml();
    try{s.classList.add('active');}catch(e){}
    var btn=document.getElementById('v6343AddNoteFromSchool');
    if(btn){
      btn.addEventListener('click', function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var txt=document.getElementById('v6343OfflineNoteTextSchool');
        var old=document.getElementById('v6343OfflineNoteText');
        // Save from this standalone school page.
        var text=cleanText(txt ? txt.value : '');
        if(!text){ alert(tr('noteEmpty')); return; }
        var q=getNotesQueue();
        q.push({id:'school-note-'+Date.now(), type:'school_note', operation:'insert', payload:{text:text, language:lang(), created_at:now(), online:navigator.onLine}, status:'pending', created_at:now()});
        setNotesQueue(q);
        if(txt) txt.value='';
        alert(tr('noteSaved'));
      }, true);
    }
    return true;
  }

  function watchSchool(){
    if(navigator.onLine && schoolVisible()){
      // Try to auto-save meaningful lesson content after it loads.
      setTimeout(function(){
        var l=extractLesson();
        if(l && l.text && l.text.length > 200){
          var list=getLessons();
          var exists=list.some(function(x){return x.title===l.title && x.text.slice(0,300)===l.text.slice(0,300);});
          if(!exists){
            list.unshift(l);
            list=list.slice(0,25);
            setLessons(list);
            log('success','Auto-saved school lesson', {title:l.title});
          }
        }
      }, 1200);
    }
    if(!navigator.onLine && schoolVisible()){
      var s=findSchool();
      var text=s ? (s.innerText||'') : '';
      if(/TypeError|Load failed|در حال بارگذاری|Loading/i.test(text) || text.trim().length < 60){
        showOfflineLessonsInSchool();
      }
    }
  }

  document.addEventListener('click', function(ev){
    var txt=(ev.target && ev.target.textContent || '').trim();
    if(/مدرسه|School|škola|Skola|🎓/i.test(txt)){
      setTimeout(watchSchool,250);
      setTimeout(watchSchool,1200);
      setTimeout(watchSchool,2800);
    }
  }, true);

  window.addEventListener('online', function(){ setTimeout(watchSchool,500); renderFields(); });
  window.addEventListener('offline', function(){ setTimeout(watchSchool,300); renderFields(); });
  document.addEventListener('DOMContentLoaded', function(){ renderPanel(); setTimeout(watchSchool,1200); });
  window.addEventListener('load', function(){ renderPanel(); setTimeout(watchSchool,1200); });
  setInterval(function(){ renderPanel(); watchSchool(); }, 3500);
  setTimeout(renderPanel, 600);
  setTimeout(renderPanel, 2000);

  window.OMIDENO7_V6343_SCHOOL_OFFLINE = {
    saveCurrentLesson:saveCurrentLesson,
    showOfflineLessonsInSchool:showOfflineLessonsInSchool,
    getLessons:getLessons,
    addOfflineNote:addOfflineNote,
    syncNotesQueue:syncNotesQueue,
    version:VERSION
  };
})();
