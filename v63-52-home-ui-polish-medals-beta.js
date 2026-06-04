/* Omideno7 V63.52 — Home UI Polish + Daily Welcome + Medals Beta
   Safe UI layer only:
   - Does not replace core Home cards.
   - Adds missing daily welcome popup/card.
   - Styles welcome title properly.
   - Adds relevant small icons to existing Home cards.
   - Restores a compact stable rewards/medals card in More.
   - FA / EN / HR.
*/
(function(){
  'use strict';

  var VERSION = 'V63.52 Home UI Polish + Medals Beta';
  var POPUP_KEY = 'omideno7_v6352_daily_welcome_seen_';
  var REWARD_STATE_KEYS = ['omideno7_rewards_v6348_state','omideno7_rewards_state','omideno7_rewards'];
  var REWARD_MEDALS_KEYS = ['omideno7_rewards_medals'];
  var REWARD_POINTS_KEYS = ['omideno7_rewards_points'];
  var REWARD_STREAK_KEYS = ['omideno7_rewards_streak'];

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6352|v=6351|v=6350|v=6349|v=6348|v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function norm(v){
    v=String(v||'').toLowerCase().trim();
    if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1) return 'en';
    if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1) return 'hr';
    return 'fa';
  }
  function lang(){
    try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa');}
    catch(e){return 'fa';}
  }

  function T(k){
    var fa={
      dailyTitle:'پیام امروز',
      dailyMsg:'امروز با ایمان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.',
      amen:'آمین',
      onlineText:'کلیسای آنلاین',
      rewardsTitle:'رشد روحانی و مدال‌ها',
      rewardsSub:'این بخش برای تشویق رشد روزانه در کلام، دعا، ایمان و شاگردی است.',
      points:'امتیاز',
      medals:'مدال',
      streak:'روز پیوسته',
      medalGuide:'راهنمای مدال‌ها',
      medalGuideText:'مدال‌ها برای تشویق رشد روحانی هستند، نه رقابت. برنزی از ۱۰۰ امتیاز، نقره‌ای از ۲۰۰، طلایی از ۵۰۰ و مدال‌های خاص با ثبات در کلام، دعا، شکرگزاری، اعلان ایمان، مدرسه و تکمیل برنامه ۳۶۵ روزه آزاد می‌شوند.',
      noMedal:'هنوز مدالی آزاد نشده است.',
      bronze:'برنزی',
      silver:'نقره‌ای',
      gold:'طلایی',
      word:'دوستدار کلام',
      school:'شاگرد وفادار',
      prayer:'دعا',
      thanks:'شکرگزاری',
      faith:'ایمان فعال',
      bible365:'اشتیاق کلام خدا'
    };
    var en={
      dailyTitle:'Today’s Message',
      dailyMsg:'Walk by faith today; the Lord is with you, and His Word lights your path.',
      amen:'Amen',
      onlineText:'Online Church',
      rewardsTitle:'Spiritual Growth & Medals',
      rewardsSub:'This section encourages daily growth in the Word, prayer, faith, and discipleship.',
      points:'Points',
      medals:'Medals',
      streak:'Day streak',
      medalGuide:'Medal Guide',
      medalGuideText:'Medals encourage spiritual growth, not competition. Bronze starts at 100 points, Silver at 200, Gold at 500, and special medals unlock through consistency in the Word, prayer, thanksgiving, faith declaration, School, and completing the 365-day plan.',
      noMedal:'No medals unlocked yet.',
      bronze:'Bronze',
      silver:'Silver',
      gold:'Gold',
      word:'Word Lover',
      school:'Faithful Student',
      prayer:'Prayer',
      thanks:'Thanksgiving',
      faith:'Active Faith',
      bible365:'Deep Hunger for God’s Word'
    };
    var hr={
      dailyTitle:'Današnja poruka',
      dailyMsg:'Hodaj danas u vjeri; Gospodin je s tobom i Njegova Riječ osvjetljava tvoj put.',
      amen:'Amen',
      onlineText:'Online crkva',
      rewardsTitle:'Duhovni rast i medalje',
      rewardsSub:'Ovaj odjeljak potiče svakodnevni rast u Riječi, molitvi, vjeri i učeništvu.',
      points:'Bodovi',
      medals:'Medalje',
      streak:'Dana u nizu',
      medalGuide:'Vodič za medalje',
      medalGuideText:'Medalje potiču duhovni rast, a ne natjecanje. Brončana počinje od 100 bodova, srebrna od 200, zlatna od 500, a posebne medalje otključavaju se kroz ustrajnost u Riječi, molitvi, zahvalnosti, ispovijedanju vjere, Školi i dovršetku 365-dnevnog plana.',
      noMedal:'Još nema otključanih medalja.',
      bronze:'Brončana',
      silver:'Srebrna',
      gold:'Zlatna',
      word:'Ljubitelj Riječi',
      school:'Vjerni učenik',
      prayer:'Molitva',
      thanks:'Zahvalnost',
      faith:'Aktivna vjera',
      bible365:'Duboka čežnja za Božjom Riječi'
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

  function css(){
    if(document.getElementById('v6352Css')) return;
    var st=document.createElement('style');
    st.id='v6352Css';
    st.textContent=[
      '.v6352-welcome-title{font-size:clamp(24px,5vw,34px)!important;line-height:1.25!important;font-weight:950!important;color:#06146D!important;margin:8px 0 10px!important;letter-spacing:-.02em;}',
      '.v6352-welcome-subtitle{font-size:16px!important;line-height:1.9!important;color:#24304f!important;font-weight:700!important;}',
      '#v6352DailyCard{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;box-shadow:0 10px 28px rgba(0,0,0,.06)!important;}',
      '#v6352DailyCard .v6352-message{display:flex;align-items:flex-start;gap:10px;background:#eef4ff;color:#06146D;border-radius:18px;padding:12px 14px;font-weight:900;line-height:1.9;}',
      '#v6352DailyCard .v6352-icon{font-size:24px;line-height:1.4;}',
      '#v6352Popup{position:fixed;inset:0;z-index:999999;}',
      '#v6352Popup .backdrop{position:absolute;inset:0;background:rgba(2,8,23,.42);backdrop-filter:blur(2px);}',
      '#v6352Popup .box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(92vw,430px);background:#fff;border-radius:28px;padding:24px;text-align:center;box-shadow:0 26px 90px rgba(0,0,0,.32);border-top:6px solid #00B91F;}',
      '#v6352Popup h2{color:#06146D;font-weight:950;margin:8px 0 10px;}',
      '#v6352Popup p{font-weight:900;color:#06146D;line-height:1.9;font-size:16px;}',
      '.v6352-card-icon{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:12px;background:#eef4ff;margin-inline-end:8px;font-size:18px;vertical-align:middle;}',
      '#v6352RewardsPanel{border-top:5px solid #F59E0B!important;background:linear-gradient(160deg,#fff,#fffaf0)!important;display:block!important;visibility:visible!important;height:auto!important;overflow:visible!important;}',
      '.v6352-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:10px;margin:12px 0;}',
      '.v6352-stat{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:12px;text-align:center;}',
      '.v6352-stat strong{display:block;color:#06146D;font-size:22px;}',
      '.v6352-chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0;}',
      '.v6352-chip{background:#fff;border:1px solid #E6EAF2;border-radius:999px;padding:8px 12px;font-weight:850;color:#06146D;font-size:13px;}',
      '#v6352MedalGuideText{display:none;background:#eef4ff;color:#06146D;border-radius:16px;padding:12px;margin-top:10px;font-weight:800;line-height:1.8;}',
      '.fa #v6352DailyCard,.fa #v6352RewardsPanel,.fa #v6352Popup .box{direction:rtl;text-align:right;}',
      '.fa #v6352Popup .box{text-align:center;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function fixWelcome(){
    var home=document.getElementById('home')||document.body;
    var candidates=Array.prototype.slice.call(home.querySelectorAll('h1,h2,h3,p,div,span'));
    candidates.forEach(function(el){
      if(el.closest && (el.closest('#v6352Popup')||el.closest('#v6352DailyCard'))) return;
      var txt=(el.textContent||'').trim();
      if(!txt || txt.length>260) return;

      if(/کلیسای آنلاین مسیحی/.test(txt)) el.textContent=txt.replace('کلیسای آنلاین مسیحی','کلیسای آنلاین');
      if(/Online Christian Church/i.test(txt)) el.textContent=txt.replace(/Online Christian Church/i,'Online Church');

      txt=(el.textContent||'').trim();
      if(/به کلیسای امید\s?نو\s?۷ خوش آمدید|به کلیسای امید\s?نو\s?7 خوش آمدید|Welcome to OmideNo7|Dobrodošli/i.test(txt)){
        el.classList.add('v6352-welcome-title');
      }
      if(/کلیسای آنلاین|Online Church|Online crkva/i.test(txt) && txt.length<220 && !/خوش آمدید|Welcome|Dobrodošli/i.test(txt)){
        el.classList.add('v6352-welcome-subtitle');
      }
    });
  }

  function findWelcomeAnchor(){
    var home=document.getElementById('home');
    if(!home) return null;
    var all=Array.prototype.slice.call(home.querySelectorAll('.card,section,div,h1,h2,h3'));
    for(var i=0;i<all.length;i++){
      var txt=(all[i].textContent||'').trim();
      if(/به کلیسای امید|Welcome to OmideNo7|Dobrodošli/i.test(txt)) return all[i].closest('.card')||all[i];
    }
    return home.querySelector('.card') || home.firstElementChild;
  }

  function renderDailyCard(){
    var home=document.getElementById('home');
    if(!home || document.getElementById('v6352DailyCard')) return;
    var card=document.createElement('div');
    card.id='v6352DailyCard';
    card.className='card';
    card.innerHTML='<div class="v6352-message"><span class="v6352-icon">✨</span><span>'+esc(T('dailyMsg'))+'</span></div>';
    var anchor=findWelcomeAnchor();
    if(anchor && anchor.parentNode) anchor.parentNode.insertBefore(card, anchor.nextSibling);
    else home.insertBefore(card, home.firstChild);
  }

  function showStartupPopup(){
    var key=POPUP_KEY+today()+'_'+lang();
    if(localStorage.getItem(key)==='1') return;
    if(document.getElementById('v6352Popup')) return;
    var p=document.createElement('div');
    p.id='v6352Popup';
    p.innerHTML='<div class="backdrop"></div><div class="box"><div style="font-size:44px">✨</div><h2>'+esc(T('dailyTitle'))+'</h2><p>'+esc(T('dailyMsg'))+'</p><button type="button" class="btn primary" id="v6352Amen">'+esc(T('amen'))+'</button></div>';
    document.body.appendChild(p);
    function close(){
      localStorage.setItem(key,'1');
      p.remove();
    }
    p.querySelector('.backdrop').onclick=close;
    document.getElementById('v6352Amen').onclick=close;
  }

  function addIconsToHomeCards(){
    var home=document.getElementById('home');
    if(!home) return;
    var rules=[
      {re:/پیامهای صوتی روحانی|Spiritual Audio|Duhovne audio/i, icon:'🎧'},
      {re:/اعلان‌های ایمان|اعلان ایمان|Faith Declaration|Ispovijedanje vjere/i, icon:'🗣️'},
      {re:/آیات من|آیات ذخیره|Saved Verses|Moji stihovi|Spremljeni stihovi/i, icon:'📖'},
      {re:/یادداشت‌های من|یادداشتهای من|My Notes|Moje bilješke/i, icon:'📝'},
      {re:/پرسش و پاسخ کتاب|Bible Q&A|Pitanja i odgovori/i, icon:'❓'}
    ];
    var headers=Array.prototype.slice.call(home.querySelectorAll('h2,h3,h4,.card-title,strong'));
    headers.forEach(function(h){
      if(h.dataset.v6352Icon==='1') return;
      var txt=(h.textContent||'').trim();
      for(var i=0;i<rules.length;i++){
        if(rules[i].re.test(txt)){
          h.dataset.v6352Icon='1';
          h.innerHTML='<span class="v6352-card-icon">'+rules[i].icon+'</span>'+esc(txt);
          break;
        }
      }
    });

    /* Some cards may not use headers. Add icon to first bold/title-like line where possible. */
    var cards=Array.prototype.slice.call(home.querySelectorAll('.card'));
    cards.forEach(function(card){
      if(card.dataset.v6352CardIcon==='1') return;
      var txt=(card.textContent||'').trim();
      for(var i=0;i<rules.length;i++){
        if(rules[i].re.test(txt)){
          var first=card.querySelector('h2,h3,h4,strong,.title,.card-title');
          if(!first){
            card.insertAdjacentHTML('afterbegin','<div class="v6352-card-icon" aria-hidden="true">'+rules[i].icon+'</div>');
            card.dataset.v6352CardIcon='1';
          }
          break;
        }
      }
    });
  }

  function getJson(k,f){
    try{return JSON.parse(localStorage.getItem(k)||'null')||f;}catch(e){return f;}
  }
  function getRewardState(){
    var state={points:0,medals:[],streak:0,today:{},totals:{}};
    REWARD_STATE_KEYS.forEach(function(k){
      var x=getJson(k,null);
      if(x && typeof x==='object'){
        state.points=Number(x.points||state.points||0);
        state.medals=Array.isArray(x.medals)?x.medals:state.medals;
        state.streak=Number(x.streak||state.streak||0);
        state.today=x.today||state.today||{};
        state.totals=x.totals||state.totals||{};
      }
    });
    REWARD_POINTS_KEYS.forEach(function(k){
      var v=localStorage.getItem(k);
      if(v!=null && !isNaN(Number(v))) state.points=Number(v);
    });
    REWARD_MEDALS_KEYS.forEach(function(k){
      var x=getJson(k,null);
      if(Array.isArray(x)) state.medals=x;
    });
    REWARD_STREAK_KEYS.forEach(function(k){
      var v=localStorage.getItem(k);
      if(v!=null && !isNaN(Number(v))) state.streak=Number(v);
    });
    return state;
  }
  function medalLabel(id){
    var map={
      bronze:T('bronze'), silver:T('silver'), gold:T('gold'),
      word_30:T('word'), word_30_streak:T('word'), word_7:T('word'),
      school_7:T('school'), school_5:T('school'),
      prayer_10:T('prayer'), prayer_10_streak:T('prayer'), prayer_7:T('prayer'),
      thanks_30:T('thanks'), thanks_30_streak:T('thanks'), thanks_7:T('thanks'),
      faith_21:T('faith'), faith_21_streak:T('faith'), faith_7:T('faith'),
      bible365_complete:T('bible365')
    };
    return map[id]||id;
  }

  function renderRewards(){
    var more=document.getElementById('more');
    if(!more) return;

    /* Remove unstable previous small guide if present, not the whole stable card. */
    ['v6350MedalGuide','v6351MedalGuide'].forEach(function(id){
      var e=document.getElementById(id); if(e) e.remove();
    });

    var s=getRewardState();
    var medals=Array.isArray(s.medals)?s.medals:[];
    var html='<div id="v6352RewardsPanel" class="card">'+
      '<h3>🏆 '+esc(T('rewardsTitle'))+'</h3>'+
      '<p>'+esc(T('rewardsSub'))+'</p>'+
      '<div class="v6352-stats">'+
        '<div class="v6352-stat"><strong>'+esc(s.points||0)+'</strong>'+esc(T('points'))+'</div>'+
        '<div class="v6352-stat"><strong>'+esc(medals.length||0)+'</strong>'+esc(T('medals'))+'</div>'+
        '<div class="v6352-stat"><strong>'+esc(s.streak||0)+'</strong>'+esc(T('streak'))+'</div>'+
      '</div>'+
      '<div class="v6352-chips">'+(medals.length?medals.map(function(id){return '<span class="v6352-chip">🏅 '+esc(medalLabel(id))+'</span>';}).join(''):'<span class="v6352-chip">'+esc(T('noMedal'))+'</span>')+'</div>'+
      '<button type="button" class="btn secondary" id="v6352MedalGuideBtn">'+esc(T('medalGuide'))+'</button>'+
      '<div id="v6352MedalGuideText">'+esc(T('medalGuideText'))+'</div>'+
      '</div>';

    var existing=document.getElementById('v6352RewardsPanel');
    if(existing){
      existing.outerHTML=html;
    }else{
      var old=document.getElementById('v6349bRewardsClean');
      if(old) old.remove();
      var wrap=document.createElement('div');
      wrap.innerHTML=html;
      var footer=more.querySelector('.footer');
      more.insertBefore(wrap.firstElementChild, footer || null);
    }
    var btn=document.getElementById('v6352MedalGuideBtn');
    if(btn){
      btn.onclick=function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var box=document.getElementById('v6352MedalGuideText');
        if(box) box.style.display=box.style.display==='block'?'none':'block';
        return false;
      };
    }
  }

  function render(){
    css();
    fixWelcome();
    renderDailyCard();
    addIconsToHomeCards();
    renderRewards();
  }

  document.addEventListener('DOMContentLoaded',function(){
    render();
    setTimeout(showStartupPopup,700);
  });
  window.addEventListener('load',function(){
    render();
    setTimeout(showStartupPopup,1000);
  });
  document.addEventListener('click',function(){
    setTimeout(function(){
      fixWelcome();
      addIconsToHomeCards();
    },120);
  },true);
  setTimeout(render,500);
  setTimeout(render,1600);
  setTimeout(render,3000);

  window.OMIDENO7_V6352_HOME_UI_POLISH={
    render:render,
    showStartupPopup:showStartupPopup,
    version:VERSION
  };
})();
