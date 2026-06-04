/* Omideno7 V63.48 — Rewards, Medals, Encouragement + Home Text Beta
   Beta-only. Does not affect public index.html.

   Adds:
   - Corrected Home intro text.
   - Welcome/encouragement card.
   - Points and medals for daily spiritual actions:
     Daily Word, School, Thanksgiving, Faith Confession, Bible365, Prayer.
   - Cloud-ready localStorage keys (backup system can include these keys).
*/
(function(){
  'use strict';

  var VERSION = 'V63.48 Rewards + Home Text Beta';
  var STATE_KEY = 'omideno7_rewards_v6348_state';
  var LOG_KEY = 'omideno7_rewards_v6348_log';
  var TODAY_KEY = 'omideno7_rewards_v6348_today';
  var HOME_FIXED_KEY = 'omideno7_v6348_home_text_fixed';
  var today = new Date().toISOString().slice(0,10);

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6348|v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function lang(){
    try{return localStorage.getItem('lang') || document.documentElement.lang || 'fa';}catch(e){return 'fa';}
  }

  function T(k){
    var fa = {
      title:'امتیازها و مدال‌های رشد روحانی — Beta V63.48',
      intro:'این بخش برای تشویق ایمانداران است تا هر روز در کلام، دعا، شکرگزاری، اعلان ایمان و مدرسه رشد کنند.',
      welcomeTitle:'به کلیسای امیدنو۷ خوش آمدید',
      welcomeSub:'کلیسای آنلاین مستقر در زاگرب، شهر زاگرب، کشور کرواسی، با تمرکز بر تعلیم خدا، دعا، شاگردسازی و تجهیز ایمانداران برای پادشاهی خدا.',
      encouragementMorning:'امروز روز رشد، ایمان و پیروزی تو در خداوند است.',
      encouragementEvening:'امروز را با شکرگزاری، آرامش و کلام خدا به پایان برسان.',
      encouragementDefault:'تو در مسیح رشد می‌کنی؛ هر قدم کوچک ایمانی ارزشمند است.',
      panelTitle:'پیشرفت روحانی من',
      points:'امتیاز',
      medals:'مدال‌ها',
      streak:'روزهای پیوسته',
      todayDone:'امروز انجام شده',
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
      resetToday:'پاک کردن تست امروز',
      clearLog:'پاک کردن گزارش',
      bronze:'مدال برنزی رشد',
      silver:'مدال نقره‌ای پایداری',
      gold:'مدال طلایی وفاداری',
      wordMedal:'مدال دوستدار کلام',
      schoolMedal:'مدال شاگرد وفادار',
      prayerMedal:'مدال دعا',
      thanksMedal:'مدال شکرگزاری',
      faithMedal:'مدال ایمان فعال',
      unlocked:'مدال آزاد شد',
      saved:'ثبت شد',
      already:'امروز قبلاً ثبت شده',
      cloudNote:'این امتیازها در localStorage ذخیره می‌شود و با سیستم بکاپ کلود اپ قابل پشتیبان‌گیری است.',
      stablePreview:'در نسخه اصلی، این پنل تست حذف می‌شود و کارت پیشرفت به‌صورت زیبا در خانه/بیشتر نمایش داده می‌شود.'
    };
    var en = {
      title:'Spiritual Growth Points & Medals — Beta V63.48',
      intro:'This feature encourages believers to grow daily in the Word, prayer, thanksgiving, confession, and school.',
      welcomeTitle:'Welcome to OmideNo7 Church',
      welcomeSub:'An online church based in Zagreb, Croatia, focused on teaching God’s Word, prayer, discipleship, and equipping believers for the Kingdom of God.',
      encouragementMorning:'Today is your day of growth, faith, and victory in the Lord.',
      encouragementEvening:'End today with thanksgiving, peace, and the Word of God.',
      encouragementDefault:'You are growing in Christ; every small step of faith matters.',
      panelTitle:'My Spiritual Progress',
      points:'Points',
      medals:'Medals',
      streak:'Streak',
      todayDone:'Done today',
      dailyWord:'Daily Word',
      school:'School',
      thanksgiving:'Thanksgiving',
      confession:'Faith Confession',
      bible365:'Bible365',
      prayer:'Prayer',
      markDailyWord:'Mark Daily Word',
      markSchool:'Mark School activity',
      markThanks:'Mark thanksgiving',
      markConfession:'Mark confession',
      markBible365:'Mark Bible reading',
      markPrayer:'Mark prayer',
      resetToday:'Reset today test',
      clearLog:'Clear log',
      bronze:'Bronze Growth Medal',
      silver:'Silver Consistency Medal',
      gold:'Gold Faithfulness Medal',
      wordMedal:'Word Lover Medal',
      schoolMedal:'Faithful Student Medal',
      prayerMedal:'Prayer Medal',
      thanksMedal:'Thanksgiving Medal',
      faithMedal:'Active Faith Medal',
      unlocked:'Medal unlocked',
      saved:'Saved',
      already:'Already marked today',
      cloudNote:'These points are saved in localStorage and can be backed up by the app cloud system.',
      stablePreview:'In stable, test buttons will be removed and progress cards will appear cleanly in Home/More.'
    };
    return (lang()==='en'?en:fa)[k] || fa[k] || k;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function now(){return new Date().toISOString();}

  function defaultState(){
    return {
      version: VERSION,
      points: 0,
      medals: [],
      streak: 0,
      lastActiveDate: null,
      totals: {
        dailyWord:0, school:0, thanksgiving:0, confession:0, bible365:0, prayer:0
      },
      today: {},
      updated_at: now()
    };
  }

  function loadState(){
    try{
      var s = JSON.parse(localStorage.getItem(STATE_KEY) || 'null') || defaultState();
      s.totals = s.totals || defaultState().totals;
      s.medals = Array.isArray(s.medals) ? s.medals : [];
      s.today = s.today || {};
      if(localStorage.getItem(TODAY_KEY) !== today){
        s.today = {};
        localStorage.setItem(TODAY_KEY, today);
      }
      return s;
    }catch(e){return defaultState();}
  }

  function saveState(s){
    s.updated_at = now();
    localStorage.setItem(STATE_KEY, JSON.stringify(s));
    localStorage.setItem('omideno7_rewards_points', String(s.points || 0));
    localStorage.setItem('omideno7_rewards_medals', JSON.stringify(s.medals || []));
    localStorage.setItem('omideno7_rewards_streak', String(s.streak || 0));
  }

  function log(type,msg,details){
    var arr=[];
    try{arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){arr=[];}
    arr.unshift({time:now(),type:type||'info',message:String(msg||''),details:details||null});
    arr=arr.slice(0,80);
    localStorage.setItem(LOG_KEY, JSON.stringify(arr));
    renderLog();
  }
  function getLog(){try{return JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){return[];}}

  function addMedal(s, id, label){
    if(s.medals.indexOf(id) === -1){
      s.medals.push(id);
      log('medal', T('unlocked')+': '+label, {id:id});
      showToast('🏅 '+label);
      return true;
    }
    return false;
  }

  function updateMedals(s){
    if(s.points >= 50) addMedal(s,'bronze',T('bronze'));
    if(s.points >= 150) addMedal(s,'silver',T('silver'));
    if(s.points >= 365) addMedal(s,'gold',T('gold'));
    if((s.totals.dailyWord||0) >= 7) addMedal(s,'word_7',T('wordMedal'));
    if((s.totals.school||0) >= 5) addMedal(s,'school_5',T('schoolMedal'));
    if((s.totals.prayer||0) >= 7) addMedal(s,'prayer_7',T('prayerMedal'));
    if((s.totals.thanksgiving||0) >= 7) addMedal(s,'thanks_7',T('thanksMedal'));
    if((s.totals.confession||0) >= 7) addMedal(s,'faith_7',T('faithMedal'));
  }

  function updateStreak(s){
    if(s.lastActiveDate === today) return;
    var yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
    if(s.lastActiveDate === yesterday) s.streak = (s.streak || 0) + 1;
    else s.streak = 1;
    s.lastActiveDate = today;
  }

  var pointsMap = {
    dailyWord: 10,
    school: 15,
    thanksgiving: 5,
    confession: 5,
    bible365: 10,
    prayer: 10
  };

  function mark(action, source){
    var s=loadState();
    if(s.today[action]){
      showToast(T('already'));
      log('info',T('already'),{action:action,source:source||'manual'});
      return;
    }
    s.today[action]=now();
    s.points += pointsMap[action] || 1;
    s.totals[action] = (s.totals[action] || 0) + 1;
    updateStreak(s);
    updateMedals(s);
    saveState(s);
    showToast('✅ '+T('saved')+' +'+(pointsMap[action]||1));
    log('success',T('saved'),{action:action,points:s.points,source:source||'manual'});
    renderAll();
  }

  function resetToday(){
    var s=loadState();
    s.today={};
    saveState(s);
    log('info','Today test reset',{});
    renderAll();
  }

  function encouragement(){
    var h=new Date().getHours();
    if(h < 12) return T('encouragementMorning');
    if(h >= 18) return T('encouragementEvening');
    return T('encouragementDefault');
  }

  function showToast(msg){
    try{
      var t=document.getElementById('v6348Toast');
      if(!t){
        t=document.createElement('div');
        t.id='v6348Toast';
        t.style.cssText='position:fixed;left:50%;bottom:92px;transform:translateX(-50%);background:#06146D;color:#fff;padding:12px 16px;border-radius:18px;font-weight:900;z-index:999999;box-shadow:0 12px 34px rgba(0,0,0,.25);max-width:90%;text-align:center;';
        document.body.appendChild(t);
      }
      t.textContent=msg;
      t.style.display='block';
      clearTimeout(t._timer);
      t._timer=setTimeout(function(){t.style.display='none';},2600);
    }catch(e){}
  }

  function fixHomeText(){
    try{
      var home=document.getElementById('home') || document.querySelector('[data-page="home"]') || document.body;
      if(!home) return;

      // Find current welcome block text and replace only the subtitle/description area as safely as possible.
      var nodes=Array.prototype.slice.call(home.querySelectorAll('h1,h2,h3,p,div,span'));
      nodes.forEach(function(el){
        var txt=(el.textContent||'').trim();
        if(!txt || txt.length>180) return;

        if(/کلیسای آنلاین مسیحی|کلیسای آنلاین|online christian church|online church/i.test(txt)){
          // Avoid changing nav/button text.
          if(el.closest && (el.closest('.bottom-nav') || el.closest('#v6348RewardsPanel'))) return;
          el.textContent = T('welcomeSub');
          el.dataset.om7V6348HomeText='1';
        }
      });

      // Add polished welcome card if not present.
      if(!document.getElementById('v6348WelcomeCard')){
        var card=document.createElement('div');
        card.id='v6348WelcomeCard';
        card.className='card v6348-welcome-card';
        card.innerHTML='<h2>'+esc(T('welcomeTitle'))+'</h2><p>'+esc(T('welcomeSub'))+'</p><div class="v6348-encourage">✨ '+esc(encouragement())+'</div>';
        var target=home.querySelector('.hero,.home-hero,.welcome-card,.card') || home.firstElementChild;
        if(target && target.parentNode) target.parentNode.insertBefore(card, target.nextSibling);
        else home.insertBefore(card, home.firstChild);
      }else{
        var c=document.getElementById('v6348WelcomeCard');
        c.innerHTML='<h2>'+esc(T('welcomeTitle'))+'</h2><p>'+esc(T('welcomeSub'))+'</p><div class="v6348-encourage">✨ '+esc(encouragement())+'</div>';
      }
      localStorage.setItem(HOME_FIXED_KEY,'true');
    }catch(e){}
  }

  function css(){
    if(document.getElementById('v6348Css')) return;
    var st=document.createElement('style');
    st.id='v6348Css';
    st.textContent=[
      '.v6348-welcome-card{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f6fff8)!important;}',
      '.v6348-welcome-card h2{color:#06146D;margin-bottom:8px}.v6348-welcome-card p{line-height:1.9}.v6348-encourage{margin-top:12px;background:#eef4ff;color:#06146D;border-radius:16px;padding:10px;font-weight:900;}',
      '#v6348RewardsPanel{border-top:5px solid #F59E0B!important;background:linear-gradient(160deg,#fff,#fffaf0)!important;display:block!important;visibility:visible!important;opacity:1!important;}',
      '.v6348-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:12px 0}.v6348-stat{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:12px;text-align:center}.v6348-stat strong{display:block;color:#06146D;font-size:22px;}',
      '.v6348-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:14px 0!important}.v6348-actions button{display:inline-flex!important;min-height:42px!important;pointer-events:auto!important;z-index:999!important}',
      '.v6348-medals{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.v6348-medal{background:#fff;border:1px solid #E6EAF2;border-radius:999px;padding:8px 12px;font-weight:900;color:#06146D}.v6348-medal.locked{opacity:.45;filter:grayscale(1)}',
      '#v6348Log details{border:1px solid #E6EAF2;border-radius:14px;padding:8px 10px;margin:8px 0;background:#fff}.fa #v6348RewardsPanel,.fa .v6348-welcome-card{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function medalLabel(id){
    return ({
      bronze:T('bronze'), silver:T('silver'), gold:T('gold'),
      word_7:T('wordMedal'), school_5:T('schoolMedal'), prayer_7:T('prayerMedal'),
      thanks_7:T('thanksMedal'), faith_7:T('faithMedal')
    })[id] || id;
  }

  function rewardsHtml(){
    var s=loadState();
    var possible=['bronze','silver','gold','word_7','school_5','prayer_7','thanks_7','faith_7'];
    return '<div id="v6348RewardsPanel" class="card">'+
      '<h3>🏆 '+esc(T('title'))+'</h3>'+
      '<p>'+esc(T('intro'))+'</p>'+
      '<div class="v6348-grid">'+
        '<div class="v6348-stat"><strong>'+esc(s.points)+'</strong>'+esc(T('points'))+'</div>'+
        '<div class="v6348-stat"><strong>'+esc(s.medals.length)+'</strong>'+esc(T('medals'))+'</div>'+
        '<div class="v6348-stat"><strong>'+esc(s.streak||0)+'</strong>'+esc(T('streak'))+'</div>'+
      '</div>'+
      '<h4>'+esc(T('todayDone'))+'</h4>'+
      '<div class="v6348-medals">'+Object.keys(pointsMap).map(function(k){
        return '<span class="v6348-medal '+(s.today[k]?'':'locked')+'">'+(s.today[k]?'✅ ':'⬜ ') + esc(T(k))+'</span>';
      }).join('')+'</div>'+
      '<h4>'+esc(T('medals'))+'</h4>'+
      '<div class="v6348-medals">'+possible.map(function(id){
        var has=s.medals.indexOf(id)!==-1;
        return '<span class="v6348-medal '+(has?'':'locked')+'">'+(has?'🏅 ':'🔒 ')+esc(medalLabel(id))+'</span>';
      }).join('')+'</div>'+
      '<div class="v6348-actions">'+
        '<button type="button" class="btn secondary" id="v6348DailyWord">'+esc(T('markDailyWord'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348School">'+esc(T('markSchool'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348Thanks">'+esc(T('markThanks'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348Confession">'+esc(T('markConfession'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348Bible365">'+esc(T('markBible365'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6348Prayer">'+esc(T('markPrayer'))+'</button>'+
        '<button type="button" class="btn light" id="v6348ResetToday">'+esc(T('resetToday'))+'</button>'+
        '<button type="button" class="btn light" id="v6348ClearLog">'+esc(T('clearLog'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(T('cloudNote'))+'</p>'+
      '<p class="small">'+esc(T('stablePreview'))+'</p>'+
      '<div id="v6348Log"></div>'+
    '</div>';
  }

  function renderPanel(){
    css();
    var more=document.getElementById('more');
    if(!more) return;
    var p=document.getElementById('v6348RewardsPanel');
    if(!p){
      var wrap=document.createElement('div');
      wrap.innerHTML=rewardsHtml();
      var footer=more.querySelector('.footer');
      more.insertBefore(wrap.firstElementChild, footer || null);
    }else{
      p.outerHTML=rewardsHtml();
    }
    bindPanel();
    renderLog();
  }

  function bindPanel(){
    var pairs=[
      ['v6348DailyWord',function(){mark('dailyWord','button');}],
      ['v6348School',function(){mark('school','button');}],
      ['v6348Thanks',function(){mark('thanksgiving','button');}],
      ['v6348Confession',function(){mark('confession','button');}],
      ['v6348Bible365',function(){mark('bible365','button');}],
      ['v6348Prayer',function(){mark('prayer','button');}],
      ['v6348ResetToday',resetToday],
      ['v6348ClearLog',function(){localStorage.removeItem(LOG_KEY); renderLog();}]
    ];
    pairs.forEach(function(p){
      var el=document.getElementById(p[0]);
      if(el) el.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} p[1](); return false;};
    });
  }

  function renderLog(){
    var box=document.getElementById('v6348Log');
    if(!box) return;
    var arr=getLog();
    if(!arr.length){box.innerHTML=''; return;}
    box.innerHTML=arr.slice(0,10).map(function(x){
      return '<details><summary>'+esc(x.time)+' — '+esc(x.type)+' — '+esc(x.message)+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x.details||{},null,2))+'</pre></details>';
    }).join('');
  }

  function attachAutoRewards(){
    if(window.__om7V6348AutoAttached) return;
    window.__om7V6348AutoAttached=true;

    document.addEventListener('click', function(ev){
      var el=ev.target && ev.target.closest ? ev.target.closest('button,a,[role="button"],.card,.nav-item') : null;
      if(!el) return;
      var txt=(el.textContent||'').trim().toLowerCase();
      var id=(el.id||'').toLowerCase();
      var cls=(el.className||'').toString().toLowerCase();

      // Conservative auto-detection, so it does not give points for every click.
      if(/daily|کلام روزانه|word/.test(txt+' '+id+' '+cls) && /read|open|خوان|کلام/.test(txt+' '+id+' '+cls)){
        setTimeout(function(){mark('dailyWord','auto-click');},300);
      }
      if(/school|مدرسه|lesson|درس/.test(txt+' '+id+' '+cls) && /complete|submit|ذخیره|ارسال|تمام|بعد/.test(txt+' '+id+' '+cls)){
        setTimeout(function(){mark('school','auto-click');},300);
      }
      if(/365|مطالعه|unlock|خواندم|read/.test(txt+' '+id+' '+cls) && /bible|کتاب|day|روز/.test(txt+' '+id+' '+cls)){
        setTimeout(function(){mark('bible365','auto-click');},300);
      }
    }, true);
  }

  function renderAll(){
    fixHomeText();
    renderPanel();
  }

  document.addEventListener('DOMContentLoaded', function(){renderAll(); attachAutoRewards();});
  window.addEventListener('load', function(){renderAll(); attachAutoRewards();});
  document.addEventListener('click', function(){setTimeout(renderAll,120);}, true);
  setInterval(renderAll,4000);
  setTimeout(renderAll,500);
  setTimeout(renderAll,1800);

  window.OMIDENO7_V6348_REWARDS_BETA = {
    mark: mark,
    loadState: loadState,
    resetToday: resetToday,
    fixHomeText: fixHomeText,
    version: VERSION
  };
})();
