/* Omideno7 V63.49c — Restore Salvation Content + Keep In-App Registration Beta
   Fixes:
   - Restores the New Birth / Salvation teaching flow.
   - Registration form remains only as a separate button inside the salvation section.
   - Removes duplicate registration panel from More.
   - Keeps trilingual FA / EN / HR.
   - Does NOT replace every salvation button with the form.
*/
(function(){
  'use strict';

  var VERSION = 'V63.49c Restore Salvation Content Beta';

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
      cardTitle:'تولد تازه و نجات در مسیح',
      cardText:'اگر می‌خواهید نجات را بشناسید، دعای نجات را بخوانید، زندگی تازه در مسیح را شروع کنید یا در کلیسا ثبت‌نام کنید، از این بخش استفاده کنید.',
      needBtn:'نیاز به نجات',
      registerBtn:'ثبت‌نام کلیسا',
      whatBtn:'نجات چیست؟',
      prayerBtn:'دعای نجات',
      lifeBtn:'زندگی مسیحی چیست؟',
      videosBtn:'ویدیوهای تولد تازه',
      modalTitle:'نیاز به نجات و تولد تازه',
      close:'بستن',
      whatTitle:'نجات چیست؟',
      whatText:'نجات یعنی انسان از گناه، جدایی از خدا و سلطه تاریکی آزاد شود و حیات تازه خدا را در مسیح دریافت کند. نجات با کارهای انسانی به دست نمی‌آید؛ نجات هدیه خداست که از راه ایمان به عیسی مسیح دریافت می‌شود.',
      prayerTitle:'دعای نجات',
      prayerText:'ای خداوند عیسی، من ایمان دارم که تو پسر خدا هستی، برای گناهان من مردی و خدا تو را از مردگان برخیزانید. امروز تو را به عنوان خداوند و نجات‌دهنده خود می‌پذیرم. قلب و زندگی من از آن توست. از امروز من فرزند خدا هستم. آمین.',
      lifeTitle:'زندگی مسیحی چیست؟',
      lifeText:'زندگی مسیحی یعنی زندگی تازه در اتحاد با مسیح؛ زندگی بر اساس کلام خدا، دعا، هدایت روح‌القدس، محبت، ایمان و رشد روزانه. پس از نجات، ایماندار باید در کلام، دعا، مشارکت کلیسایی و شاگردی رشد کند.',
      videosTitle:'ویدیوهای تولد تازه',
      videosText:'در نسخه نهایی، این بخش ویدیوهای کوتاه آموزشی تولد تازه را نشان می‌دهد تا شخص تازه‌ایمان قدم‌های اول زندگی مسیحی را یاد بگیرد.',
      registerText:'برای اینکه کلیسا بتواند برای شما دعا کند، شما را راهنمایی کند و در کلاس‌ها و جلسات همراهی کند، فرم ثبت‌نام را داخل همین اپ کامل کنید.',
      openForm:'باز کردن فرم ثبت‌نام',
      saved:'این بخش بدون حذف آموزش‌ها اصلاح شد؛ فرم فقط از دکمه ثبت‌نام باز می‌شود.'
    };
    var en={
      cardTitle:'New Birth and Salvation in Christ',
      cardText:'Use this section to learn salvation, pray the salvation prayer, begin your new life in Christ, or register with the church.',
      needBtn:'Need Salvation',
      registerBtn:'Church Registration',
      whatBtn:'What is salvation?',
      prayerBtn:'Salvation prayer',
      lifeBtn:'What is Christian life?',
      videosBtn:'New birth videos',
      modalTitle:'Need Salvation and New Birth',
      close:'Close',
      whatTitle:'What is salvation?',
      whatText:'Salvation means being delivered from sin, separation from God, and the authority of darkness, and receiving God’s new life in Christ. Salvation is not earned by human works; it is God’s gift received by faith in Jesus Christ.',
      prayerTitle:'Salvation prayer',
      prayerText:'Lord Jesus, I believe that You are the Son of God, that You died for my sins, and that God raised You from the dead. Today I receive You as my Lord and Savior. My heart and my life belong to You. From today, I am a child of God. Amen.',
      lifeTitle:'What is Christian life?',
      lifeText:'Christian life is the new life in union with Christ; a life shaped by God’s Word, prayer, the guidance of the Holy Spirit, love, faith, and daily growth. After salvation, a believer should grow in the Word, prayer, church fellowship, and discipleship.',
      videosTitle:'New birth videos',
      videosText:'In the final version, this section will show short teaching videos for new believers, helping them learn the first steps of Christian life.',
      registerText:'So the church can pray for you, guide you, and help you join classes and meetings, complete the registration form inside the app.',
      openForm:'Open registration form',
      saved:'The teaching flow is restored; the form opens only from the registration button.'
    };
    var hr={
      cardTitle:'Novo rođenje i spasenje u Kristu',
      cardText:'Ovaj odjeljak koristi se za učenje o spasenju, molitvu spasenja, početak novog života u Kristu i registraciju u crkvi.',
      needBtn:'Trebam spasenje',
      registerBtn:'Registracija u crkvi',
      whatBtn:'Što je spasenje?',
      prayerBtn:'Molitva spasenja',
      lifeBtn:'Što je kršćanski život?',
      videosBtn:'Videozapisi o novom rođenju',
      modalTitle:'Potreba za spasenjem i novim rođenjem',
      close:'Zatvori',
      whatTitle:'Što je spasenje?',
      whatText:'Spasenje znači oslobođenje od grijeha, odvojenosti od Boga i vlasti tame te primanje novog Božjeg života u Kristu. Spasenje se ne zaslužuje ljudskim djelima; ono je Božji dar koji se prima vjerom u Isusa Krista.',
      prayerTitle:'Molitva spasenja',
      prayerText:'Gospodine Isuse, vjerujem da si Ti Sin Božji, da si umro za moje grijehe i da Te Bog uskrisio od mrtvih. Danas Te primam kao svoga Gospodina i Spasitelja. Moje srce i moj život pripadaju Tebi. Od danas sam Božje dijete. Amen.',
      lifeTitle:'Što je kršćanski život?',
      lifeText:'Kršćanski život je novi život u jedinstvu s Kristom; život oblikovan Božjom Riječi, molitvom, vodstvom Duha Svetoga, ljubavlju, vjerom i svakodnevnim rastom. Nakon spasenja vjernik treba rasti u Riječi, molitvi, zajedništvu crkve i učeništvu.',
      videosTitle:'Videozapisi o novom rođenju',
      videosText:'U konačnoj verziji ovaj će odjeljak prikazivati kratke poučne videozapise za nove vjernike, kako bi naučili prve korake kršćanskog života.',
      registerText:'Kako bi crkva mogla moliti za vas, voditi vas i pomoći vam u uključivanju u razrede i sastanke, ispunite registracijski obrazac unutar aplikacije.',
      openForm:'Otvori registracijski obrazac',
      saved:'Poučni dio je vraćen; obrazac se otvara samo putem gumba za registraciju.'
    };
    var l=lang();
    return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
  }

  function esc(v){
    return String(v==null?'':v).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function css(){
    if(document.getElementById('v6349cCss')) return;
    var st=document.createElement('style');
    st.id='v6349cCss';
    st.textContent=[
      '#v6349MorePanel{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;}',
      '#v6349cSalvationCard{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;}',
      '#v6349cSalvationCard p{line-height:1.9}',
      '.v6349c-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}',
      '.v6349c-actions button{min-height:42px}',
      '#v6349cModal{position:fixed;inset:0;z-index:999999;}',
      '#v6349cModal .v6349c-backdrop{position:absolute;inset:0;background:rgba(2,8,23,.45);backdrop-filter:blur(2px)}',
      '#v6349cModal .v6349c-box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,760px);max-height:90vh;overflow:auto;background:#fff;border-radius:26px;padding:22px;box-shadow:0 28px 90px rgba(0,0,0,.35);border-top:6px solid #00B91F;}',
      '#v6349cModal .v6349c-x{position:absolute;right:14px;top:10px;border:0;background:#f1f5f9;border-radius:999px;width:36px;height:36px;font-size:26px;line-height:1;}',
      '#v6349cModal h2,#v6349cModal h3{color:#06146D;font-weight:900}',
      '#v6349cModal p{line-height:1.95}',
      '.v6349c-section{background:#f8fbff;border:1px solid #dbe3ef;border-radius:16px;padding:12px;margin:12px 0}',
      '.fa #v6349cSalvationCard,.fa #v6349cModal .v6349c-box{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function salvationHtml(){
    return '<div id="v6349cSalvationCard" class="card">'+
      '<h3>✨ '+esc(T('cardTitle'))+'</h3>'+
      '<p>'+esc(T('cardText'))+'</p>'+
      '<div class="v6349c-actions">'+
        '<button type="button" class="btn primary" id="v6349cNeed">'+esc(T('needBtn'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6349cWhat">'+esc(T('whatBtn'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6349cPrayer">'+esc(T('prayerBtn'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6349cLife">'+esc(T('lifeBtn'))+'</button>'+
        '<button type="button" class="btn secondary" id="v6349cVideos">'+esc(T('videosBtn'))+'</button>'+
        '<button type="button" class="btn gold" id="v6349cRegister">'+esc(T('registerBtn'))+'</button>'+
      '</div>'+
    '</div>';
  }

  function modalHtml(mode){
    var sections=[];
    function add(title,text){
      sections.push('<div class="v6349c-section"><h3>'+esc(title)+'</h3><p>'+esc(text)+'</p></div>');
    }
    if(mode==='need' || mode==='all'){
      add(T('whatTitle'),T('whatText'));
      add(T('prayerTitle'),T('prayerText'));
      add(T('lifeTitle'),T('lifeText'));
      add(T('videosTitle'),T('videosText'));
      add(T('registerBtn'),T('registerText'));
    }else if(mode==='what') add(T('whatTitle'),T('whatText'));
    else if(mode==='prayer') add(T('prayerTitle'),T('prayerText'));
    else if(mode==='life') add(T('lifeTitle'),T('lifeText'));
    else if(mode==='videos') add(T('videosTitle'),T('videosText'));

    return '<div id="v6349cModal">'+
      '<div class="v6349c-backdrop"></div>'+
      '<div class="v6349c-box">'+
        '<button type="button" class="v6349c-x" aria-label="'+esc(T('close'))+'">×</button>'+
        '<h2>'+esc(T('modalTitle'))+'</h2>'+
        sections.join('')+
        '<div class="v6349c-actions">'+
          '<button type="button" class="btn gold" id="v6349cOpenReg">'+esc(T('openForm'))+'</button>'+
          '<button type="button" class="btn light" id="v6349cClose">'+esc(T('close'))+'</button>'+
        '</div>'+
      '</div>'+
    '</div>';
  }

  function closeModal(){
    var m=document.getElementById('v6349cModal');
    if(m) m.remove();
  }

  function openTeach(mode){
    var old=document.getElementById('v6349cModal');
    if(old) old.remove();
    var wrap=document.createElement('div');
    wrap.innerHTML=modalHtml(mode||'need');
    document.body.appendChild(wrap.firstElementChild);
    document.querySelector('#v6349cModal .v6349c-backdrop').onclick=closeModal;
    document.querySelector('#v6349cModal .v6349c-x').onclick=closeModal;
    document.getElementById('v6349cClose').onclick=closeModal;
    document.getElementById('v6349cOpenReg').onclick=function(ev){
      ev.preventDefault();
      closeModal();
      openRegistration();
      return false;
    };
  }

  function openRegistration(){
    if(window.OMIDENO7_V6349_REGISTRATION_BETA && typeof window.OMIDENO7_V6349_REGISTRATION_BETA.openForm==='function'){
      window.OMIDENO7_V6349_REGISTRATION_BETA.openForm();
      return;
    }
    alert(T('registerText'));
  }

  function removeWrongFormPanels(){
    var m=document.getElementById('v6349MorePanel');
    if(m) m.remove();
  }

  function restoreHomeSection(){
    css();
    removeWrongFormPanels();

    var home=document.getElementById('home');
    if(!home) return;

    var existing=document.getElementById('v6349cSalvationCard');
    if(existing){
      bind();
      return;
    }

    // Prefer placing near existing New Birth / Salvation area.
    var target=null;
    var cards=Array.prototype.slice.call(home.querySelectorAll('.card,section,div'));
    for(var i=0;i<cards.length;i++){
      var txt=(cards[i].textContent||'').trim();
      if(/تولد تازه|نجات در مسیح|New Birth|Salvation|Novo rođenje|Spasenje/i.test(txt)){
        target=cards[i];
        break;
      }
    }

    var wrap=document.createElement('div');
    wrap.innerHTML=salvationHtml();
    if(target && target.parentNode){
      // If old target became only a form trigger, replace it with restored full card.
      var txt=(target.textContent||'').trim();
      if(/نیاز به نجات و ثبت|Need Salvation|Registracija/i.test(txt) && txt.length < 500){
        target.parentNode.insertBefore(wrap.firstElementChild,target);
        target.style.display='none';
      }else{
        target.parentNode.insertBefore(wrap.firstElementChild,target.nextSibling);
      }
    }else{
      var firstCard=home.querySelector('.card');
      if(firstCard && firstCard.parentNode) firstCard.parentNode.insertBefore(wrap.firstElementChild,firstCard.nextSibling);
      else home.insertBefore(wrap.firstElementChild,home.firstChild);
    }

    bind();
  }

  function bind(){
    var map=[
      ['v6349cNeed','need'],
      ['v6349cWhat','what'],
      ['v6349cPrayer','prayer'],
      ['v6349cLife','life'],
      ['v6349cVideos','videos']
    ];
    map.forEach(function(x){
      var el=document.getElementById(x[0]);
      if(el) el.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} openTeach(x[1]); return false;};
    });
    var reg=document.getElementById('v6349cRegister');
    if(reg) reg.onclick=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();} openRegistration(); return false;};
  }

  function neutralizeOldRegistrationReplacement(){
    // Undo old aggressive replacement only for teaching buttons if they exist.
    try{
      var home=document.getElementById('home');
      if(!home) return;
      Array.prototype.slice.call(home.querySelectorAll('button,a')).forEach(function(el){
        var txt=(el.textContent||'').trim();
        if(/نیاز به نجات و ثبت‌?نام|Need Salvation & Registration|Trebam spasenje/i.test(txt)){
          // Do not remove the real registration form trigger inside our card.
          if(el.id !== 'v6349cRegister' && el.id !== 'v6349cNeed'){
            el.textContent = T('needBtn');
          }
        }
      });
    }catch(e){}
  }

  function render(){
    restoreHomeSection();
    neutralizeOldRegistrationReplacement();
    removeWrongFormPanels();
  }

  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('load',render);
  document.addEventListener('click',function(){setTimeout(render,120);},true);
  setInterval(render,1500);
  setTimeout(render,400);
  setTimeout(render,1600);

  window.OMIDENO7_V6349C_RESTORE_SALVATION_BETA={
    render:render,
    openTeach:openTeach,
    openRegistration:openRegistration,
    version:VERSION
  };
})();
