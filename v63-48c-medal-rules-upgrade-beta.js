/* Omideno7 V63.48c — Medal Rules Upgrade Beta
   Updates medal thresholds/rules:
   - Bronze: 100 points
   - Silver: 200 points
   - Gold: 500 points
   - Word Lover: 30 consecutive Daily Word days
   - Faithful Student: 7 School activity days
   - Prayer: 10 consecutive prayer days
   - Thanksgiving: 30 consecutive thanksgiving days
   - Active Faith: 21 consecutive confession days
   - Bible365: completion medal after 365 Bible365 reading days

   Note:
   This script repairs old beta medals if they were unlocked too early by previous thresholds.
*/
(function(){
  'use strict';

  var VERSION = 'V63.48c Medal Rules Upgrade Beta';
  var STATE_KEY = 'omideno7_rewards_v6348_state';
  var STREAK_KEY = 'omideno7_rewards_v6348c_action_streaks';
  var TODAY_KEY = 'omideno7_rewards_v6348c_streak_today';
  var LOG_KEY = 'omideno7_rewards_v6348c_log';
  var today = new Date().toISOString().slice(0,10);

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6348|v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){try{return localStorage.getItem('lang')||document.documentElement.lang||'fa';}catch(e){return 'fa';}}
  function T(k){
    var fa={
      title:'قوانین جدید امتیازها و مدال‌ها — Beta V63.48c',
      intro:'قوانین مدال‌ها سخت‌تر و معنادارتر شد تا مدال‌ها واقعاً نشانه ثبات، رشد و اشتیاق روحانی باشند.',
      bronze:'مدال برنزی رشد: ۱۰۰ امتیاز',
      silver:'مدال نقره‌ای پایداری: ۲۰۰ امتیاز',
      gold:'مدال طلایی وفاداری: ۵۰۰ امتیاز',
      word:'مدال دوستدار کلام: ۳۰ روز پیوسته خواندن کلام روزانه',
      school:'مدال شاگرد وفادار: بعد از ۷ روز فعالیت مدرسه',
      prayer:'مدال دعا: ۱۰ روز پیوسته ثبات در دعا',
      thanks:'مدال شکرگزاری: ۳۰ روز پیوسته شکرگزاری، یعنی گذراندن یک دوره شکرگزاری',
      faith:'مدال ایمان فعال: بعد از ۳ هفته، یعنی ۲۱ روز پیوسته اعلان ایمان',
      bible365:'مدال اشتیاق کلام خدا: بعد از تکمیل دوره مطالعه ۳۶۵ روزه کتاب‌مقدس',
      repair:'اصلاح مدال‌ها طبق قوانین جدید',
      show:'نمایش قوانین جدید',
      status:'قوانین جدید آماده است',
      repaired:'مدال‌ها طبق قوانین جدید اصلاح شدند',
      points:'امتیاز فعلی',
      medals:'مدال‌های معتبر',
      streaks:'ثبات فعالیت‌ها',
      note:'اگر در نسخه قبلی مدالی زودتر آزاد شده باشد، این نسخه آن را بر اساس قانون جدید دوباره ارزیابی می‌کند.'
    };
    var en={
      title:'New Points & Medal Rules — Beta V63.48c',
      intro:'Medal rules are now stronger and more meaningful, so medals represent consistency, growth, and spiritual hunger.',
      bronze:'Bronze Growth Medal: 100 points',
      silver:'Silver Consistency Medal: 200 points',
      gold:'Gold Faithfulness Medal: 500 points',
      word:'Word Lover Medal: 30 consecutive Daily Word days',
      school:'Faithful Student Medal: 7 School activity days',
      prayer:'Prayer Medal: 10 consecutive prayer days',
      thanks:'Thanksgiving Medal: 30 consecutive thanksgiving days',
      faith:'Active Faith Medal: 3 weeks / 21 consecutive confession days',
      bible365:'Deep Hunger for God’s Word Medal: completion of the 365-day Bible reading plan',
      repair:'Repair medals by new rules',
      show:'Show new rules',
      status:'New rules ready',
      repaired:'Medals repaired by new rules',
      points:'Current points',
      medals:'Valid medals',
      streaks:'Activity streaks',
      note:'If earlier beta unlocked a medal too soon, this version re-evaluates it under the new rules.'
    };
    var hr={
      title:'Nova pravila bodova i medalja — Beta V63.48c',
      intro:'Pravila medalja sada su snažnija i smislenija, tako da medalje predstavljaju ustrajnost, rast i duhovnu glad.',
      bronze:'Brončana medalja rasta: 100 bodova',
      silver:'Srebrna medalja ustrajnosti: 200 bodova',
      gold:'Zlatna medalja vjernosti: 500 bodova',
      word:'Medalja ljubitelja Riječi: 30 uzastopnih dana Dnevne Riječi',
      school:'Medalja vjernog učenika: 7 dana aktivnosti škole',
      prayer:'Medalja molitve: 10 uzastopnih dana molitve',
      thanks:'Medalja zahvalnosti: 30 uzastopnih dana zahvalnosti',
      faith:'Medalja aktivne vjere: 3 tjedna / 21 uzastopni dan ispovijedanja vjere',
      bible365:'Medalja duboke čežnje za Božjom Riječi: završetak 365-dnevnog plana čitanja Biblije',
      repair:'Ispravi medalje prema novim pravilima',
      show:'Prikaži nova pravila',
      status:'Nova pravila su spremna',
      repaired:'Medalje su ispravljene prema novim pravilima',
      points:'Trenutni bodovi',
      medals:'Važeće medalje',
      streaks:'Nizovi aktivnosti',
      note:'Ako je ranija beta verzija prerano otključala medalju, ova verzija je ponovno procjenjuje prema novim pravilima.'
    };
    var l=lang();
    return (l==='hr'?hr:(l==='en'?en:fa))[k] || fa[k] || k;
  }
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function log(type,msg,details){
    var arr=[]; try{arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){arr=[];}
    arr.unshift({time:new Date().toISOString(),type:type||'info',message:String(msg||''),details:details||null});
    arr=arr.slice(0,50); localStorage.setItem(LOG_KEY,JSON.stringify(arr));
  }

  function defaultState(){
    return {points:0,medals:[],totals:{dailyWord:0,school:0,thanksgiving:0,confession:0,bible365:0,prayer:0},today:{},streak:0};
  }
  function loadState(){
    try{
      var s=JSON.parse(localStorage.getItem(STATE_KEY)||'null')||defaultState();
      s.totals=s.totals||defaultState().totals;
      s.medals=Array.isArray(s.medals)?s.medals:[];
      return s;
    }catch(e){return defaultState();}
  }
  function saveState(s){
    s.updated_at=new Date().toISOString();
    localStorage.setItem(STATE_KEY,JSON.stringify(s));
    localStorage.setItem('omideno7_rewards_points',String(s.points||0));
    localStorage.setItem('omideno7_rewards_medals',JSON.stringify(s.medals||[]));
  }
  function loadStreaks(){
    try{
      var x=JSON.parse(localStorage.getItem(STREAK_KEY)||'null')||{};
      ['dailyWord','school','thanksgiving','confession','bible365','prayer'].forEach(function(k){
        x[k]=x[k]||{current:0,best:0,lastDate:null};
      });
      return x;
    }catch(e){
      return {};
    }
  }
  function saveStreaks(x){localStorage.setItem(STREAK_KEY,JSON.stringify(x));}

  function yesterday(){
    return new Date(Date.now()-86400000).toISOString().slice(0,10);
  }

  function updateActionStreak(action){
    var x=loadStreaks();
    var s=x[action] || {current:0,best:0,lastDate:null};
    if(s.lastDate===today) return;
    if(s.lastDate===yesterday()) s.current=(s.current||0)+1;
    else s.current=1;
    s.best=Math.max(s.best||0,s.current||0);
    s.lastDate=today;
    x[action]=s;
    saveStreaks(x);
  }

  function validMedals(state, streaks){
    var medals=[];
    var p=state.points||0, t=state.totals||{};
    function add(id){if(medals.indexOf(id)===-1) medals.push(id);}
    if(p>=100) add('bronze');
    if(p>=200) add('silver');
    if(p>=500) add('gold');
    if((streaks.dailyWord && streaks.dailyWord.best>=30) || (streaks.dailyWord && streaks.dailyWord.current>=30)) add('word_30_streak');
    if((t.school||0)>=7) add('school_7');
    if((streaks.prayer && streaks.prayer.best>=10) || (streaks.prayer && streaks.prayer.current>=10)) add('prayer_10_streak');
    if((streaks.thanksgiving && streaks.thanksgiving.best>=30) || (streaks.thanksgiving && streaks.thanksgiving.current>=30)) add('thanks_30_streak');
    if((streaks.confession && streaks.confession.best>=21) || (streaks.confession && streaks.confession.current>=21)) add('faith_21_streak');
    if((t.bible365||0)>=365 || localStorage.getItem('omideno7_bible365_completed')==='true') add('bible365_complete');
    return medals;
  }

  function repairMedals(){
    var s=loadState();
    var st=loadStreaks();
    var before=s.medals.slice();
    s.medals=validMedals(s,st);
    saveState(s);
    log('success',T('repaired'),{before:before,after:s.medals,points:s.points,streaks:st});
    renderPanel();
  }

  function medalName(id){
    return {
      bronze:T('bronze'), silver:T('silver'), gold:T('gold'),
      word_30_streak:T('word'), school_7:T('school'), prayer_10_streak:T('prayer'),
      thanks_30_streak:T('thanks'), faith_21_streak:T('faith'), bible365_complete:T('bible365')
    }[id] || id;
  }

  function wrapOldMark(){
    var api=window.OMIDENO7_V6348_REWARDS_BETA;
    if(!api || typeof api.mark!=='function' || api.__v6348cWrapped) return;
    var old=api.mark;
    api.mark=function(action,source){
      old(action,source);
      updateActionStreak(action);
      setTimeout(repairMedals,80);
    };
    api.__v6348cWrapped=true;
  }

  function css(){
    if(document.getElementById('v6348cCss')) return;
    var st=document.createElement('style');
    st.id='v6348cCss';
    st.textContent=[
      '#v6348cRulesPanel{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;}',
      '#v6348cRulesPanel li{line-height:1.9;margin:5px 0;}',
      '.v6348c-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin:12px 0}.v6348c-stat{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:10px;text-align:center}.v6348c-stat strong{display:block;font-size:20px;color:#06146D;}',
      '.v6348c-medals{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.v6348c-medal{background:#fff;border:1px solid #E6EAF2;border-radius:999px;padding:8px 12px;font-weight:900;color:#06146D}',
      '.v6348c-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}.fa #v6348cRulesPanel{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function rulesHtml(){
    var s=loadState(), st=loadStreaks();
    var valid=validMedals(s,st);
    return '<div id="v6348cRulesPanel" class="card">'+
      '<h3>🏆 '+esc(T('title'))+'</h3>'+
      '<p>'+esc(T('intro'))+'</p>'+
      '<div class="v6348c-grid">'+
        '<div class="v6348c-stat"><strong>'+esc(s.points||0)+'</strong>'+esc(T('points'))+'</div>'+
        '<div class="v6348c-stat"><strong>'+esc(valid.length)+'</strong>'+esc(T('medals'))+'</div>'+
        '<div class="v6348c-stat"><strong>'+esc((st.dailyWord&&st.dailyWord.best)||0)+'</strong>'+esc('Daily Word best')+'</div>'+
      '</div>'+
      '<p class="small">'+esc(T('note'))+'</p>'+
      '<ul>'+
        '<li>'+esc(T('bronze'))+'</li>'+
        '<li>'+esc(T('silver'))+'</li>'+
        '<li>'+esc(T('gold'))+'</li>'+
        '<li>'+esc(T('word'))+'</li>'+
        '<li>'+esc(T('school'))+'</li>'+
        '<li>'+esc(T('prayer'))+'</li>'+
        '<li>'+esc(T('thanks'))+'</li>'+
        '<li>'+esc(T('faith'))+'</li>'+
        '<li>'+esc(T('bible365'))+'</li>'+
      '</ul>'+
      '<h4>'+esc(T('medals'))+'</h4>'+
      '<div class="v6348c-medals">'+(valid.length?valid.map(function(id){return '<span class="v6348c-medal">🏅 '+esc(medalName(id))+'</span>';}).join(''):'—')+'</div>'+
      '<div class="v6348c-actions">'+
        '<button type="button" class="btn primary" id="v6348cRepair">'+esc(T('repair'))+'</button>'+
      '</div>'+
    '</div>';
  }

  function renderPanel(){
    css();
    var more=document.getElementById('more'); if(!more) return;
    var p=document.getElementById('v6348cRulesPanel');
    if(p) p.outerHTML=rulesHtml();
    else{
      var old=document.getElementById('v6348bRulesPanel') || document.getElementById('v6348RewardsPanel');
      var footer=more.querySelector('.footer');
      var wrap=document.createElement('div'); wrap.innerHTML=rulesHtml();
      if(old && old.parentNode) old.parentNode.insertBefore(wrap.firstElementChild, old.nextSibling);
      else more.insertBefore(wrap.firstElementChild, footer||null);
    }
    var b=document.getElementById('v6348cRepair');
    if(b) b.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} repairMedals(); return false;};
  }

  function render(){
    wrapOldMark();
    repairMedals();
    renderPanel();
  }

  document.addEventListener('DOMContentLoaded',function(){wrapOldMark(); renderPanel(); setTimeout(repairMedals,1200);});
  window.addEventListener('load',function(){wrapOldMark(); renderPanel(); setTimeout(repairMedals,1200);});
  document.addEventListener('click',function(){setTimeout(function(){wrapOldMark(); repairMedals();},180);},true);
  setInterval(function(){wrapOldMark(); renderPanel();},4000);

  window.OMIDENO7_V6348C_MEDAL_RULES_BETA={
    repairMedals:repairMedals,
    updateActionStreak:updateActionStreak,
    validMedals:validMedals,
    version:VERSION
  };
})();
