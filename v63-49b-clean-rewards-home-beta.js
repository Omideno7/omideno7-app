/* Omideno7 V63.49b — Clean Rewards + Remove Duplicate Home Welcome Beta
   Fixes:
   - Remove duplicate Home welcome/growth card.
   - Stop visible flicker from multiple beta reward/rule panels.
   - Hide detailed medal-rule explanations from normal user view.
   - Show one compact, clean reward card in More only.
   - Trilingual: FA / EN / HR.
*/
(function(){
  'use strict';

  var VERSION = 'V63.49b Clean Rewards + Home Beta';
  var STATE_KEY = 'omideno7_rewards_v6348_state';
  var STREAK_KEY = 'omideno7_rewards_v6348c_action_streaks';
  var LOG_KEY = 'omideno7_v6349b_clean_rewards_log';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6349|v=6348|v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function normalizeLang(v){
    v = String(v || '').toLowerCase().trim();
    if(v === 'fa' || v.indexOf('pers') !== -1 || v.indexOf('farsi') !== -1 || v.startsWith('fa-')) return 'fa';
    if(v === 'en' || v.indexOf('english') !== -1 || v.startsWith('en-')) return 'en';
    if(v === 'hr' || v.indexOf('cro') !== -1 || v.indexOf('hrv') !== -1 || v.indexOf('kro') !== -1 || v.startsWith('hr-')) return 'hr';
    return 'fa';
  }
  function lang(){
    try{return normalizeLang(localStorage.getItem('lang') || document.documentElement.lang || navigator.language || 'fa');}
    catch(e){return 'fa';}
  }

  function T(k){
    var fa = {
      title:'رشد روحانی من',
      subtitle:'امتیازها و مدال‌ها برای تشویق رشد روزانه تو هستند، نه برای رقابت.',
      points:'امتیاز',
      medals:'مدال',
      streak:'روز پیوسته',
      today:'امروز',
      done:'انجام شد',
      notDone:'انجام نشده',
      dailyWord:'کلام روزانه',
      school:'مدرسه',
      thanksgiving:'شکرگزاری',
      confession:'اعلان ایمان',
      bible365:'مطالعه ۳۶۵ روزه',
      prayer:'دعا',
      compactRules:'خلاصه مدال‌ها',
      compactRulesText:'برنزی از ۱۰۰ امتیاز، نقره‌ای از ۲۰۰، طلایی از ۵۰۰. مدال‌های خاص با ثبات روزانه در کلام، دعا، شکرگزاری، ایمان، مدرسه و تکمیل برنامه ۳۶۵ روزه آزاد می‌شوند.',
      closeDetails:'بستن توضیح',
      noMedal:'هنوز مدالی آزاد نشده است.',
      bronze:'برنزی',
      silver:'نقره‌ای',
      gold:'طلایی',
      word:'دوستدار کلام',
      student:'شاگرد وفادار',
      prayerMedal:'دعا',
      thanks:'شکرگزاری',
      faith:'ایمان فعال',
      bibleMedal:'اشتیاق کلام خدا'
    };
    var en = {
      title:'My Spiritual Growth',
      subtitle:'Points and medals are here to encourage daily growth, not competition.',
      points:'Points',
      medals:'Medals',
      streak:'Day streak',
      today:'Today',
      done:'Done',
      notDone:'Not done',
      dailyWord:'Daily Word',
      school:'School',
      thanksgiving:'Thanksgiving',
      confession:'Faith Confession',
      bible365:'Bible365',
      prayer:'Prayer',
      compactRules:'Medal summary',
      compactRulesText:'Bronze starts at 100 points, Silver at 200, Gold at 500. Special medals unlock through daily consistency in the Word, prayer, thanksgiving, faith confession, School, and completing the 365-day Bible plan.',
      closeDetails:'Close',
      noMedal:'No medals unlocked yet.',
      bronze:'Bronze',
      silver:'Silver',
      gold:'Gold',
      word:'Word Lover',
      student:'Faithful Student',
      prayerMedal:'Prayer',
      thanks:'Thanksgiving',
      faith:'Active Faith',
      bibleMedal:'Deep Hunger for God’s Word'
    };
    var hr = {
      title:'Moj duhovni rast',
      subtitle:'Bodovi i medalje služe za ohrabrenje svakodnevnog rasta, ne za natjecanje.',
      points:'Bodovi',
      medals:'Medalje',
      streak:'Dana u nizu',
      today:'Danas',
      done:'Učinjeno',
      notDone:'Nije učinjeno',
      dailyWord:'Dnevna Riječ',
      school:'Škola',
      thanksgiving:'Zahvalnost',
      confession:'Ispovijedanje vjere',
      bible365:'Biblija365',
      prayer:'Molitva',
      compactRules:'Sažetak medalja',
      compactRulesText:'Brončana počinje od 100 bodova, srebrna od 200, zlatna od 500. Posebne medalje otključavaju se kroz svakodnevnu postojanost u Riječi, molitvi, zahvalnosti, ispovijedanju vjere, Školi i dovršetku 365-dnevnog biblijskog plana.',
      closeDetails:'Zatvori',
      noMedal:'Još nema otključanih medalja.',
      bronze:'Brončana',
      silver:'Srebrna',
      gold:'Zlatna',
      word:'Ljubitelj Riječi',
      student:'Vjerni učenik',
      prayerMedal:'Molitva',
      thanks:'Zahvalnost',
      faith:'Aktivna vjera',
      bibleMedal:'Duboka čežnja za Božjom Riječi'
    };
    var l = lang();
    return (l === 'hr' ? hr : (l === 'en' ? en : fa))[k] || fa[k] || k;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function loadState(){
    try{
      var s = JSON.parse(localStorage.getItem(STATE_KEY) || 'null') || {};
      s.points = Number(s.points || 0);
      s.medals = Array.isArray(s.medals) ? s.medals : [];
      s.streak = Number(s.streak || 0);
      s.today = s.today || {};
      s.totals = s.totals || {};
      return s;
    }catch(e){
      return {points:0, medals:[], streak:0, today:{}, totals:{}};
    }
  }

  function loadStreaks(){
    try{return JSON.parse(localStorage.getItem(STREAK_KEY) || '{}') || {};}catch(e){return {};}
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
      word_30:T('word'),
      word_30_streak:T('word'),
      school_7:T('student'),
      prayer_10:T('prayerMedal'),
      prayer_10_streak:T('prayerMedal'),
      thanks_30:T('thanks'),
      thanks_30_streak:T('thanks'),
      faith_21:T('faith'),
      faith_21_streak:T('faith'),
      bible365_complete:T('bibleMedal')
    })[id] || id;
  }

  function css(){
    if(document.getElementById('v6349bCss')) return;
    var st = document.createElement('style');
    st.id = 'v6349bCss';
    st.textContent = [
      /* Hide all previous beta reward/rule/welcome duplicate panels */
      '#v6348WelcomeCard,#v6348dHomeMessage,#v6348RewardsPanel,#v6348bRulesPanel,#v6348cRulesPanel,#v6348dRulesPanel{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;}',
      '.v6348-welcome-card{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;}',
      '#v6349bRewardsClean{border-top:5px solid #F59E0B!important;background:linear-gradient(160deg,#fff,#fffaf0)!important;display:block!important;visibility:visible!important;opacity:1!important;height:auto!important;}',
      '.v6349b-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin:12px 0;}',
      '.v6349b-stat{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:12px;text-align:center;}',
      '.v6349b-stat strong{display:block;color:#06146D;font-size:22px;margin-bottom:2px;}',
      '.v6349b-today,.v6349b-medals{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0;}',
      '.v6349b-chip{background:#fff;border:1px solid #E6EAF2;border-radius:999px;padding:8px 12px;font-weight:800;color:#06146D;font-size:13px;}',
      '.v6349b-chip.off{opacity:.48;filter:grayscale(1);}',
      '.v6349b-summary{background:#eef4ff;border:1px solid #dbe7ff;border-radius:16px;padding:10px 12px;margin-top:12px;line-height:1.8;color:#06146D;font-weight:800;}',
      '.v6349b-summary summary{cursor:pointer;font-weight:900;}',
      '.fa #v6349bRewardsClean{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function removeDuplicateHomeCards(){
    try{
      ['v6348WelcomeCard','v6348dHomeMessage'].forEach(function(id){
        var el = document.getElementById(id);
        if(el) el.remove();
      });

      var home = document.getElementById('home');
      if(!home) return;

      Array.prototype.slice.call(home.querySelectorAll('.v6348-welcome-card,#v6348WelcomeCard,#v6348dHomeMessage')).forEach(function(el){
        if(el) el.remove();
      });

      // Remove any injected duplicate card that contains both welcome title and growth message.
      Array.prototype.slice.call(home.querySelectorAll('.card,div,section')).forEach(function(el){
        if(!el || el.id === 'home') return;
        var txt = (el.textContent || '').trim();
        if(txt.length > 20 && txt.length < 500 &&
           /به کلیسای امید|Welcome to OmideNo7|Dobrodošli/i.test(txt) &&
           /مسیر رشد|small step of faith|korak vjere|rast/i.test(txt)){
          el.remove();
        }
      });
    }catch(e){}
  }

  function panelHtml(){
    var s = loadState();
    var st = loadStreaks();
    var medals = validMedals(s, st);
    var today = s.today || {};
    var actions = [
      ['dailyWord', T('dailyWord')],
      ['school', T('school')],
      ['thanksgiving', T('thanksgiving')],
      ['confession', T('confession')],
      ['bible365', T('bible365')],
      ['prayer', T('prayer')]
    ];

    return '<div id="v6349bRewardsClean" class="card">'+
      '<h3>🏆 '+esc(T('title'))+'</h3>'+
      '<p>'+esc(T('subtitle'))+'</p>'+
      '<div class="v6349b-grid">'+
        '<div class="v6349b-stat"><strong>'+esc(s.points || 0)+'</strong>'+esc(T('points'))+'</div>'+
        '<div class="v6349b-stat"><strong>'+esc(medals.length)+'</strong>'+esc(T('medals'))+'</div>'+
        '<div class="v6349b-stat"><strong>'+esc(s.streak || 0)+'</strong>'+esc(T('streak'))+'</div>'+
      '</div>'+
      '<h4>'+esc(T('today'))+'</h4>'+
      '<div class="v6349b-today">'+actions.map(function(a){
        var done = !!today[a[0]];
        return '<span class="v6349b-chip '+(done ? '' : 'off')+'">'+(done ? '✅ ' : '⬜ ')+esc(a[1])+'</span>';
      }).join('')+'</div>'+
      '<h4>'+esc(T('medals'))+'</h4>'+
      '<div class="v6349b-medals">'+(medals.length ? medals.map(function(id){
        return '<span class="v6349b-chip">🏅 '+esc(medalLabel(id))+'</span>';
      }).join('') : '<span class="v6349b-chip off">'+esc(T('noMedal'))+'</span>')+'</div>'+
      '<details class="v6349b-summary"><summary>'+esc(T('compactRules'))+'</summary><p>'+esc(T('compactRulesText'))+'</p></details>'+
    '</div>';
  }

  function renderCleanPanel(){
    var more = document.getElementById('more');
    if(!more) return;
    var old = document.getElementById('v6349bRewardsClean');
    var html = panelHtml();
    if(old){
      old.outerHTML = html;
    }else{
      var wrap = document.createElement('div');
      wrap.innerHTML = html;
      var footer = more.querySelector('.footer');
      // Put this before registration panel or footer, but after main content
      var reg = document.getElementById('v6349MorePanel');
      if(reg && reg.parentNode){
        reg.parentNode.insertBefore(wrap.firstElementChild, reg);
      }else{
        more.insertBefore(wrap.firstElementChild, footer || null);
      }
    }
  }

  function render(){
    css();
    removeDuplicateHomeCards();
    renderCleanPanel();
    setTimeout(removeDuplicateHomeCards, 250);
  }

  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('load', render);
  document.addEventListener('click', function(){ setTimeout(render, 120); }, true);
  setInterval(render, 1200);
  setTimeout(render, 400);
  setTimeout(render, 1600);

  window.OMIDENO7_V6349B_CLEAN_REWARDS_BETA = {
    render: render,
    version: VERSION
  };
})();
