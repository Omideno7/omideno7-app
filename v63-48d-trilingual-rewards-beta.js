/* Omideno7 V63.48d — Trilingual Rewards/Home Popup Beta
   Goal:
   - Make Home encouragement + rewards/medal texts fully trilingual (FA / EN / HR)
   - Normalize language detection for Croatian
   - Keep latest medal rules from V63.48c
*/
(function(){
  'use strict';

  var VERSION = 'V63.48d Trilingual Rewards/Home Popup Beta';
  var STATE_KEY = 'omideno7_rewards_v6348_state';
  var STREAK_KEY = 'omideno7_rewards_v6348c_action_streaks';
  var POPUP_KEY_PREFIX = 'omideno7_v6348d_popup_seen_';
  var LOG_KEY = 'omideno7_rewards_v6348d_log';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6348|v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function rawLang(){
    try{
      return String(localStorage.getItem('lang') || document.documentElement.lang || navigator.language || 'fa');
    }catch(e){
      return 'fa';
    }
  }
  function normalizeLang(v){
    v = String(v || '').toLowerCase().trim();
    if(!v) return 'fa';
    if(v === 'fa' || v.indexOf('pers') !== -1 || v.indexOf('farsi') !== -1) return 'fa';
    if(v === 'en' || v.indexOf('english') !== -1) return 'en';
    if(v === 'hr' || v.indexOf('cro') !== -1 || v.indexOf('hrv') !== -1 || v.indexOf('kro') !== -1) return 'hr';
    if(v.startsWith('fa-')) return 'fa';
    if(v.startsWith('en-')) return 'en';
    if(v.startsWith('hr-')) return 'hr';
    return 'fa';
  }
  function lang(){ return normalizeLang(rawLang()); }

  function T(k){
    var fa = {
      homeMessageOnly:'تو در مسیر رشد می‌کنی؛ هر قدم کوچک ایمانی ارزشمند است.',
      popupTitle:'پیام امروز برای رشد تو',
      popupOk:'آمین',
      popupShow:'نمایش پیام امروز',
      popupClose:'بستن',
      rulesTitle:'قوانین امتیازها و مدال‌ها',
      rulesIntro:'این سیستم برای تشویق رشد روحانی است، نه رقابت. هدف این است که هر روز در کلام، دعا، شکرگزاری، اعلان ایمان و شاگردی قوی‌تر شوی.',
      pointsTitle:'امتیازها',
      medalsTitle:'مدال‌ها چگونه آزاد می‌شوند؟',
      currentPoints:'امتیاز فعلی',
      currentMedals:'مدال‌های معتبر',
      currentStreak:'روزهای پیوسته',
      todayDone:'امروز انجام شده',
      medals:'مدال‌ها',
      dailyWord:'کلام روزانه',
      school:'مدرسه',
      thanksgiving:'شکرگزاری',
      confession:'اعلان ایمان',
      bible365:'مطالعه ۳۶۵ روزه',
      prayer:'دعا',
      markDailyWord:'ثبت خواندن کلام روزانه',
      markSchool:'ثبت فعالیت مدرسه',
      markThanks:'ثبت شکرگزاری امروز',
      markConfession:'ثبت اعلان ایمان',
      markBible365:'ثبت مطالعه کتاب‌مقدس',
      markPrayer:'ثبت دعا',
      clearLog:'پاک کردن گزارش',
      bronze:'مدال برنزی رشد',
      silver:'مدال نقره‌ای پایداری',
      gold:'مدال طلایی وفاداری',
      wordMedal:'مدال دوستدار کلام',
      schoolMedal:'مدال شاگرد وفادار',
      prayerMedal:'مدال دعا',
      thanksMedal:'مدال شکرگزاری',
      faithMedal:'مدال ایمان فعال',
      bible365Medal:'مدال اشتیاق کلام خدا',
      bronzeRule:'مدال برنزی رشد: ۱۰۰ امتیاز',
      silverRule:'مدال نقره‌ای پایداری: ۲۰۰ امتیاز',
      goldRule:'مدال طلایی وفاداری: ۵۰۰ امتیاز',
      wordRule:'مدال دوستدار کلام: ۳۰ روز پیوسته خواندن کلام روزانه',
      schoolRule:'مدال شاگرد وفادار: بعد از ۷ روز فعالیت مدرسه',
      prayerRule:'مدال دعا: ۱۰ روز پیوسته ثبات در دعا',
      thanksRule:'مدال شکرگزاری: ۳۰ روز پیوسته شکرگزاری',
      faithRule:'مدال ایمان فعال: ۲۱ روز پیوسته اعلان ایمان',
      bible365Rule:'مدال اشتیاق کلام خدا: بعد از تکمیل برنامه ۳۶۵ روزه کتاب‌مقدس',
      already:'امروز قبلاً ثبت شده',
      saved:'ثبت شد',
      unlocked:'مدال آزاد شد',
      logEmpty:'هنوز گزارشی ثبت نشده است.',
      note:'این بخش در بتا است و برای نسخه اصلی به‌صورت تمیزتر و نهایی نمایش داده می‌شود.'
    };
    var en = {
      homeMessageOnly:'You are growing on your journey; every small step of faith is valuable.',
      popupTitle:'Today’s encouragement for your growth',
      popupOk:'Amen',
      popupShow:'Show today’s message',
      popupClose:'Close',
      rulesTitle:'Points and medal rules',
      rulesIntro:'This system encourages spiritual growth, not competition. The goal is to grow daily in the Word, prayer, thanksgiving, faith confession, and discipleship.',
      pointsTitle:'Points',
      medalsTitle:'How medals unlock',
      currentPoints:'Current points',
      currentMedals:'Valid medals',
      currentStreak:'Streak',
      todayDone:'Done today',
      medals:'Medals',
      dailyWord:'Daily Word',
      school:'School',
      thanksgiving:'Thanksgiving',
      confession:'Faith Confession',
      bible365:'Bible365',
      prayer:'Prayer',
      markDailyWord:'Mark Daily Word',
      markSchool:'Mark School activity',
      markThanks:'Mark thanksgiving',
      markConfession:'Mark faith confession',
      markBible365:'Mark Bible reading',
      markPrayer:'Mark prayer',
      clearLog:'Clear log',
      bronze:'Bronze Growth Medal',
      silver:'Silver Consistency Medal',
      gold:'Gold Faithfulness Medal',
      wordMedal:'Word Lover Medal',
      schoolMedal:'Faithful Student Medal',
      prayerMedal:'Prayer Medal',
      thanksMedal:'Thanksgiving Medal',
      faithMedal:'Active Faith Medal',
      bible365Medal:'Deep Hunger for God’s Word Medal',
      bronzeRule:'Bronze Growth Medal: 100 points',
      silverRule:'Silver Consistency Medal: 200 points',
      goldRule:'Gold Faithfulness Medal: 500 points',
      wordRule:'Word Lover Medal: 30 consecutive Daily Word days',
      schoolRule:'Faithful Student Medal: after 7 School activity days',
      prayerRule:'Prayer Medal: 10 consecutive prayer days',
      thanksRule:'Thanksgiving Medal: 30 consecutive thanksgiving days',
      faithRule:'Active Faith Medal: 21 consecutive confession days',
      bible365Rule:'Deep Hunger for God’s Word Medal: after completing the 365-day Bible plan',
      already:'Already marked today',
      saved:'Saved',
      unlocked:'Medal unlocked',
      logEmpty:'No log yet.',
      note:'This section is in beta and will appear more cleanly in the stable release.'
    };
    var hr = {
      homeMessageOnly:'Rasteš na svom putu; svaki mali korak vjere je vrijedan.',
      popupTitle:'Današnje ohrabrenje za tvoj rast',
      popupOk:'Amen',
      popupShow:'Prikaži današnju poruku',
      popupClose:'Zatvori',
      rulesTitle:'Pravila bodova i medalja',
      rulesIntro:'Ovaj sustav potiče duhovni rast, a ne natjecanje. Cilj je svakodnevno rasti u Riječi, molitvi, zahvalnosti, ispovijedanju vjere i učeništvu.',
      pointsTitle:'Bodovi',
      medalsTitle:'Kako se medalje otključavaju',
      currentPoints:'Trenutni bodovi',
      currentMedals:'Važeće medalje',
      currentStreak:'Niz',
      todayDone:'Danas učinjeno',
      medals:'Medalje',
      dailyWord:'Dnevna Riječ',
      school:'Škola',
      thanksgiving:'Zahvalnost',
      confession:'Ispovijedanje vjere',
      bible365:'Biblija365',
      prayer:'Molitva',
      markDailyWord:'Označi Dnevnu Riječ',
      markSchool:'Označi aktivnost škole',
      markThanks:'Označi zahvalnost',
      markConfession:'Označi ispovijed vjere',
      markBible365:'Označi čitanje Biblije',
      markPrayer:'Označi molitvu',
      clearLog:'Obriši zapisnik',
      bronze:'Brončana medalja rasta',
      silver:'Srebrna medalja ustrajnosti',
      gold:'Zlatna medalja vjernosti',
      wordMedal:'Medalja ljubitelja Riječi',
      schoolMedal:'Medalja vjernog učenika',
      prayerMedal:'Medalja molitve',
      thanksMedal:'Medalja zahvalnosti',
      faithMedal:'Medalja aktivne vjere',
      bible365Medal:'Medalja duboke čežnje za Božjom Riječi',
      bronzeRule:'Brončana medalja rasta: 100 bodova',
      silverRule:'Srebrna medalja ustrajnosti: 200 bodova',
      goldRule:'Zlatna medalja vjernosti: 500 bodova',
      wordRule:'Medalja ljubitelja Riječi: 30 uzastopnih dana Dnevne Riječi',
      schoolRule:'Medalja vjernog učenika: nakon 7 dana aktivnosti škole',
      prayerRule:'Medalja molitve: 10 uzastopnih dana molitve',
      thanksRule:'Medalja zahvalnosti: 30 uzastopnih dana zahvalnosti',
      faithRule:'Medalja aktivne vjere: 21 uzastopni dan ispovijedanja vjere',
      bible365Rule:'Medalja duboke čežnje za Božjom Riječi: nakon dovršetka 365-dnevnog plana čitanja Biblije',
      already:'Već je označeno danas',
      saved:'Spremljeno',
      unlocked:'Medalja je otključana',
      logEmpty:'Još nema zapisnika.',
      note:'Ovaj odjeljak je u beta verziji i bit će čišće prikazan u stabilnom izdanju.'
    };
    var l = lang();
    return (l === 'hr' ? hr : (l === 'en' ? en : fa))[k] || fa[k] || k;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function now(){ return new Date().toISOString(); }
  function today(){ return new Date().toISOString().slice(0,10); }

  function loadState(){
    try{
      var s = JSON.parse(localStorage.getItem(STATE_KEY) || 'null') || {};
      s.points = Number(s.points || 0);
      s.medals = Array.isArray(s.medals) ? s.medals : [];
      s.streak = Number(s.streak || 0);
      s.today = s.today || {};
      s.totals = s.totals || {dailyWord:0,school:0,thanksgiving:0,confession:0,bible365:0,prayer:0};
      return s;
    }catch(e){
      return {points:0,medals:[],streak:0,today:{},totals:{dailyWord:0,school:0,thanksgiving:0,confession:0,bible365:0,prayer:0}};
    }
  }
  function saveState(s){
    s.updated_at = now();
    localStorage.setItem(STATE_KEY, JSON.stringify(s));
    localStorage.setItem('omideno7_rewards_points', String(s.points || 0));
    localStorage.setItem('omideno7_rewards_medals', JSON.stringify(s.medals || []));
  }
  function loadStreaks(){
    try{
      var x = JSON.parse(localStorage.getItem(STREAK_KEY) || 'null') || {};
      ['dailyWord','school','thanksgiving','confession','bible365','prayer'].forEach(function(k){
        x[k] = x[k] || {current:0,best:0,lastDate:null};
      });
      return x;
    }catch(e){
      var x = {};
      ['dailyWord','school','thanksgiving','confession','bible365','prayer'].forEach(function(k){
        x[k] = {current:0,best:0,lastDate:null};
      });
      return x;
    }
  }

  function validMedals(s, st){
    var ids = [];
    function add(id){ if(ids.indexOf(id) === -1) ids.push(id); }
    if((s.points || 0) >= 100) add('bronze');
    if((s.points || 0) >= 200) add('silver');
    if((s.points || 0) >= 500) add('gold');
    if(((st.dailyWord && st.dailyWord.best) || 0) >= 30 || ((st.dailyWord && st.dailyWord.current) || 0) >= 30) add('word_30');
    if((s.totals.school || 0) >= 7) add('school_7');
    if(((st.prayer && st.prayer.best) || 0) >= 10 || ((st.prayer && st.prayer.current) || 0) >= 10) add('prayer_10');
    if(((st.thanksgiving && st.thanksgiving.best) || 0) >= 30 || ((st.thanksgiving && st.thanksgiving.current) || 0) >= 30) add('thanks_30');
    if(((st.confession && st.confession.best) || 0) >= 21 || ((st.confession && st.confession.current) || 0) >= 21) add('faith_21');
    if((s.totals.bible365 || 0) >= 365 || localStorage.getItem('omideno7_bible365_completed') === 'true') add('bible365_complete');
    return ids;
  }

  function medalLabel(id){
    return ({
      bronze:T('bronze'),
      silver:T('silver'),
      gold:T('gold'),
      word_30:T('wordMedal'),
      school_7:T('schoolMedal'),
      prayer_10:T('prayerMedal'),
      thanks_30:T('thanksMedal'),
      faith_21:T('faithMedal'),
      bible365_complete:T('bible365Medal')
    })[id] || id;
  }

  function recalcState(){
    var s = loadState();
    var st = loadStreaks();
    s.medals = validMedals(s, st);
    saveState(s);
    return {state:s, streaks:st};
  }

  function messages(){
    return {
      fa:[
        'تو در مسیر رشد می‌کنی؛ هر قدم کوچک ایمانی ارزشمند است.',
        'امروز در کلام خدا ریشه بگیر و با ایمان قدم بردار.',
        'خداوند تو را برای رشد، ثبات و پیروزی در مسیح تقویت می‌کند.',
        'یک دعای صادقانه و یک قدم اطاعت، آینده روحانی تو را می‌سازد.',
        'امروز در شکرگزاری بمان؛ دل شاکر، دل آماده برای معجزه است.',
        'هر روز با کلام، فکر تو نوسازی می‌شود و ایمان تو قوی‌تر می‌گردد.',
        'تو برای پیشرفت روحانی آفریده شده‌ای، نه برای ایستادن در یک نقطه.'
      ],
      en:[
        'You are growing on your journey; every small step of faith is valuable.',
        'Today, take root in God’s Word and walk forward in faith.',
        'The Lord strengthens you for growth, stability, and victory in Christ.',
        'One sincere prayer and one step of obedience shape your spiritual future.',
        'Stay in thanksgiving today; a thankful heart is ready for miracles.',
        'Each day in the Word renews your mind and makes your faith stronger.',
        'You were created for spiritual progress, not for standing still.'
      ],
      hr:[
        'Rasteš na svom putu; svaki mali korak vjere je vrijedan.',
        'Danas se ukorijeni u Božjoj Riječi i idi naprijed u vjeri.',
        'Gospodin te jača za rast, postojanost i pobjedu u Kristu.',
        'Jedna iskrena molitva i jedan korak poslušnosti oblikuju tvoju duhovnu budućnost.',
        'Ostani danas u zahvalnosti; zahvalno srce je spremno za čuda.',
        'Svaki dan u Riječi obnavlja tvoj um i jača tvoju vjeru.',
        'Stvoren si za duhovni napredak, a ne za stajanje na mjestu.'
      ]
    };
  }

  function todayMessage(){
    var l = lang();
    var list = (messages()[l] || messages().fa);
    var n = new Date();
    var start = new Date(n.getFullYear(),0,0);
    var diff = n - start;
    var oneDay = 1000*60*60*24;
    var day = Math.floor(diff/oneDay);
    return list[day % list.length];
  }

  function css(){
    if(document.getElementById('v6348dCss')) return;
    var st = document.createElement('style');
    st.id = 'v6348dCss';
    st.textContent = [
      '#v6348dHomeMessage{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f6fff8)!important;margin-top:12px;}',
      '#v6348dHomeMessage .v6348d-msg{margin-top:4px;background:#eef4ff;color:#06146D;border-radius:16px;padding:12px;font-weight:900;line-height:1.9;}',
      '#v6348RewardsPanel{border-top:5px solid #F59E0B!important;background:linear-gradient(160deg,#fff,#fffaf0)!important;}',
      '.v6348-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:12px 0}',
      '.v6348-stat{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:12px;text-align:center}',
      '.v6348-stat strong{display:block;color:#06146D;font-size:22px;}',
      '.v6348-medals{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}',
      '.v6348-medal{background:#fff;border:1px solid #E6EAF2;border-radius:999px;padding:8px 12px;font-weight:900;color:#06146D}',
      '.v6348-medal.locked{opacity:.45;filter:grayscale(1)}',
      '.v6348-actions,.v6348b-actions,.v6348d-actions{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}',
      '#v6348dRulesPanel{border-top:5px solid #06146D!important;background:linear-gradient(160deg,#fff,#f8fbff)!important;}',
      '#v6348dRulesPanel li{line-height:1.9;margin:5px 0;}',
      '#v6348dDailyPopup .v6348-popup-backdrop{position:fixed;inset:0;background:rgba(2,8,23,.35);z-index:999998;backdrop-filter:blur(2px);}',
      '#v6348dDailyPopup .v6348-popup-box{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(92vw,430px);background:#fff;border-radius:28px;padding:24px;z-index:999999;box-shadow:0 24px 80px rgba(0,0,0,.28);text-align:center;border-top:6px solid #00B91F;}',
      '#v6348dDailyPopup .v6348-popup-x{position:absolute;right:14px;top:10px;border:0;background:#f1f5f9;border-radius:999px;width:34px;height:34px;font-size:24px;line-height:1;}',
      '#v6348dDailyPopup h3{color:#06146D;margin:6px 0 10px;font-weight:900;}',
      '#v6348dDailyPopup p{font-size:17px;line-height:1.9;color:#111827;margin-bottom:18px;}',
      '.fa #v6348dRulesPanel,.fa #v6348RewardsPanel,.fa #v6348dHomeMessage{direction:rtl;text-align:right;}',
      '.fa #v6348dDailyPopup .v6348-popup-box{direction:rtl;text-align:center;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function fixHomeMessageCard(){
    var home = document.getElementById('home');
    if(!home) return;
    var existing = document.getElementById('v6348dHomeMessage');
    var html = '<div id="v6348dHomeMessage" class="card v6348-welcome-card">'+
      '<div class="v6348d-msg">✨ '+esc(T('homeMessageOnly'))+'</div>'+
      '</div>';
    if(existing){
      existing.outerHTML = html;
      return;
    }
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var target = home.querySelector('.hero,.home-hero,.welcome-card,.card') || home.firstElementChild;
    if(target && target.parentNode) target.parentNode.insertBefore(wrap.firstElementChild, target.nextSibling);
    else home.insertBefore(wrap.firstElementChild, home.firstChild);
  }

  function rewardsHtml(){
    var pack = recalcState();
    var s = pack.state;
    var possible = ['bronze','silver','gold','word_30','school_7','prayer_10','thanks_30','faith_21','bible365_complete'];
    return '<div id="v6348RewardsPanel" class="card">'+
      '<h3>🏆 '+esc(T('rulesTitle'))+'</h3>'+
      '<p>'+esc(T('note'))+'</p>'+
      '<div class="v6348-grid">'+
        '<div class="v6348-stat"><strong>'+esc(s.points || 0)+'</strong>'+esc(T('currentPoints'))+'</div>'+
        '<div class="v6348-stat"><strong>'+esc((s.medals || []).length)+'</strong>'+esc(T('currentMedals'))+'</div>'+
        '<div class="v6348-stat"><strong>'+esc(s.streak || 0)+'</strong>'+esc(T('currentStreak'))+'</div>'+
      '</div>'+
      '<h4>'+esc(T('todayDone'))+'</h4>'+
      '<div class="v6348-medals">'+['dailyWord','school','thanksgiving','confession','bible365','prayer'].map(function(k){
        return '<span class="v6348-medal '+(s.today && s.today[k] ? '' : 'locked')+'">'+((s.today && s.today[k]) ? '✅ ' : '⬜ ') + esc(T(k)) + '</span>';
      }).join('')+'</div>'+
      '<h4>'+esc(T('medals'))+'</h4>'+
      '<div class="v6348-medals">'+possible.map(function(id){
        var has = (s.medals || []).indexOf(id) !== -1;
        return '<span class="v6348-medal '+(has ? '' : 'locked')+'">'+(has ? '🏅 ' : '🔒 ') + esc(medalLabel(id)) + '</span>';
      }).join('')+'</div>'+
      '<div class="v6348-actions">'+
        '<button type="button" class="btn secondary" id="v6348DailyWord">'+esc(T('markDailyWord'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348School">'+esc(T('markSchool'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348Thanks">'+esc(T('markThanks'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348Confession">'+esc(T('markConfession'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348Bible365">'+esc(T('markBible365'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348Prayer">'+esc(T('markPrayer'))+'</button>'+
      '</div>'+
      '</div>';
  }

  function renderRewardsPanel(){
    var more = document.getElementById('more');
    if(!more) return;
    var existing = document.getElementById('v6348RewardsPanel');
    var html = rewardsHtml();
    if(existing) existing.outerHTML = html;
    else{
      var wrap = document.createElement('div');
      wrap.innerHTML = html;
      var footer = more.querySelector('.footer');
      more.insertBefore(wrap.firstElementChild, footer || null);
    }
    bindRewardButtons();
  }

  function rulesHtml(){
    return '<div id="v6348dRulesPanel" class="card">'+
      '<h3>🏅 '+esc(T('rulesTitle'))+'</h3>'+
      '<p>'+esc(T('rulesIntro'))+'</p>'+
      '<h4>'+esc(T('pointsTitle'))+'</h4>'+
      '<ul>'+
        '<li>'+esc(T('dailyWord'))+': 10</li>'+
        '<li>'+esc(T('school'))+': 15</li>'+
        '<li>'+esc(T('thanksgiving'))+': 5</li>'+
        '<li>'+esc(T('confession'))+': 5</li>'+
        '<li>'+esc(T('bible365'))+': 10</li>'+
        '<li>'+esc(T('prayer'))+': 10</li>'+
      '</ul>'+
      '<h4>'+esc(T('medalsTitle'))+'</h4>'+
      '<ul>'+
        '<li>'+esc(T('bronzeRule'))+'</li>'+
        '<li>'+esc(T('silverRule'))+'</li>'+
        '<li>'+esc(T('goldRule'))+'</li>'+
        '<li>'+esc(T('wordRule'))+'</li>'+
        '<li>'+esc(T('schoolRule'))+'</li>'+
        '<li>'+esc(T('prayerRule'))+'</li>'+
        '<li>'+esc(T('thanksRule'))+'</li>'+
        '<li>'+esc(T('faithRule'))+'</li>'+
        '<li>'+esc(T('bible365Rule'))+'</li>'+
      '</ul>'+
      '<div class="v6348d-actions">'+
        '<button type="button" class="btn secondary" id="v6348dShowPopup">'+esc(T('popupShow'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348ClearLog">'+esc(T('clearLog'))+'</button>'+
      '</div>'+
      '<div id="v6348dLog"></div>'+
      '</div>';
  }

  function renderRulesPanel(){
    var more = document.getElementById('more');
    if(!more) return;
    var old1 = document.getElementById('v6348bRulesPanel');
    if(old1) old1.remove();
    var old2 = document.getElementById('v6348cRulesPanel');
    if(old2) old2.remove();
    var existing = document.getElementById('v6348dRulesPanel');
    var html = rulesHtml();
    if(existing) existing.outerHTML = html;
    else{
      var rewards = document.getElementById('v6348RewardsPanel');
      var footer = more.querySelector('.footer');
      var wrap = document.createElement('div');
      wrap.innerHTML = html;
      if(rewards && rewards.parentNode) rewards.parentNode.insertBefore(wrap.firstElementChild, rewards.nextSibling);
      else more.insertBefore(wrap.firstElementChild, footer || null);
    }
    var btn = document.getElementById('v6348dShowPopup');
    if(btn) btn.onclick = function(ev){ if(ev){ev.preventDefault();ev.stopPropagation();} showDailyPopup(true); return false; };
    var clear = document.getElementById('v6348ClearLog');
    if(clear) clear.onclick = function(ev){ if(ev){ev.preventDefault();ev.stopPropagation();} localStorage.removeItem(LOG_KEY); renderLog(); return false; };
    renderLog();
  }

  function getLog(){
    try{ return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); }catch(e){ return []; }
  }
  function addLog(type, message, details){
    var arr = getLog();
    arr.unshift({time:now(), type:type || 'info', message:String(message || ''), details:details || null});
    arr = arr.slice(0, 20);
    localStorage.setItem(LOG_KEY, JSON.stringify(arr));
  }
  function renderLog(){
    var box = document.getElementById('v6348dLog');
    if(!box) return;
    var arr = getLog();
    if(!arr.length){ box.innerHTML = '<p class="small">'+esc(T('logEmpty'))+'</p>'; return; }
    box.innerHTML = arr.slice(0, 10).map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details || {}, null, 2))+'</pre></details>';
    }).join('');
  }

  function markAction(action){
    try{
      if(window.OMIDENO7_V6348_REWARDS_BETA && typeof window.OMIDENO7_V6348_REWARDS_BETA.mark === 'function'){
        window.OMIDENO7_V6348_REWARDS_BETA.mark(action, 'v6348d');
      }else{
        var s = loadState();
        s.today = s.today || {};
        if(s.today[action]){
          addLog('info', T('already'), {action:action});
          return;
        }
        s.today[action] = now();
        s.totals = s.totals || {};
        s.totals[action] = Number(s.totals[action] || 0) + 1;
        var pointsMap = {dailyWord:10, school:15, thanksgiving:5, confession:5, bible365:10, prayer:10};
        s.points = Number(s.points || 0) + Number(pointsMap[action] || 0);
        saveState(s);
      }
      addLog('success', T('saved'), {action:action});
      setTimeout(renderAll, 150);
    }catch(e){
      addLog('error', String(e && e.message || e), {action:action});
    }
  }

  function bindRewardButtons(){
    var map = {
      v6348DailyWord:'dailyWord',
      v6348School:'school',
      v6348Thanks:'thanksgiving',
      v6348Confession:'confession',
      v6348Bible365:'bible365',
      v6348Prayer:'prayer'
    };
    Object.keys(map).forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.onclick = function(ev){
        if(ev){ev.preventDefault();ev.stopPropagation();}
        markAction(map[id]);
        return false;
      };
    });
  }

  function showDailyPopup(force){
    var key = POPUP_KEY_PREFIX + today() + '_' + lang();
    if(!force && localStorage.getItem(key) === '1') return;
    var old = document.getElementById('v6348dDailyPopup');
    if(old) old.remove();
    var overlay = document.createElement('div');
    overlay.id = 'v6348dDailyPopup';
    overlay.innerHTML = ''+
      '<div class="v6348-popup-backdrop"></div>'+
      '<div class="v6348-popup-box">'+
      '<button type="button" class="v6348-popup-x" aria-label="'+esc(T('popupClose'))+'">×</button>'+
      '<div class="v6348-popup-icon">✨</div>'+
      '<h3>'+esc(T('popupTitle'))+'</h3>'+
      '<p>'+esc(todayMessage())+'</p>'+
      '<button type="button" class="btn primary v6348-popup-ok">'+esc(T('popupOk'))+'</button>'+
      '</div>';
    document.body.appendChild(overlay);
    function close(){
      localStorage.setItem(key, '1');
      overlay.remove();
    }
    overlay.querySelector('.v6348-popup-x').onclick = close;
    overlay.querySelector('.v6348-popup-ok').onclick = close;
    overlay.querySelector('.v6348-popup-backdrop').onclick = close;
  }

  function renderAll(){
    css();
    fixHomeMessageCard();
    renderRewardsPanel();
    renderRulesPanel();
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderAll();
    setTimeout(function(){ showDailyPopup(false); }, 600);
  });
  window.addEventListener('load', function(){
    renderAll();
    setTimeout(function(){ showDailyPopup(false); }, 1200);
  });
  document.addEventListener('click', function(){ setTimeout(renderAll, 180); }, true);
  setInterval(renderAll, 4500);

  window.OMIDENO7_V6348D_TRILINGUAL_BETA = {
    version: VERSION,
    renderAll: renderAll,
    lang: lang,
    showDailyPopup: showDailyPopup
  };
})();
