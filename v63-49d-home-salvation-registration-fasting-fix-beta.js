/* Omideno7 V63.49d — Home, Salvation, Registration, Medals, Fasting Fix Beta
   Fixes requested:
   - Registration form title: "Registration Form" / "فرم ثبت‌نام" / HR equivalent.
   - Remove incorrect "write none" hint and require proper information.
   - Remove registration form card from More.
   - Medal guide button renamed and made stable.
   - Restore one-sentence daily encouragement in Home and startup popup.
   - Keep New Birth / Salvation in original Home place; remove duplicate lower card.
   - Keep teaching buttons, and only open form from final registration button.
   - Replace fasting teaching section with supplied teaching + clickable verse references.
*/
(function(){
  'use strict';

  var VERSION = 'V63.49d Home + Salvation + Fasting Fix Beta';
  var POPUP_KEY_PREFIX = 'omideno7_v6349d_daily_encouragement_seen_';

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
      amen:'آمین',
      close:'بستن',
      formTitle:'فرم ثبت‌نام',
      formHint:'لطفاً اطلاعات را دقیق و صحیح وارد کنید. این اطلاعات برای مراقبت روحانی، دعا، کلاس‌ها، ارتباط کلیسایی و شناسایی شما در مراحل بعدی اپ استفاده می‌شود.',
      formIntro:'برای ثبت‌نام در کلیسای امیدنو۷، فرم زیر را با اطلاعات واقعی و کامل پر کنید.',
      medalGuide:'راهنمای مدال‌ها',
      medalGuideText:'مدال‌ها برای تشویق رشد روحانی هستند. برنزی از ۱۰۰ امتیاز، نقره‌ای از ۲۰۰، طلایی از ۵۰۰ و مدال‌های خاص با ثبات در کلام، دعا، شکرگزاری، ایمان، مدرسه و تکمیل برنامه ۳۶۵ روزه آزاد می‌شوند.',
      dailyTitle:'پیام امروز',
      dailyCard:'امروز با ایمان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.',
      homeCardTitle:'تولد تازه و نجات در مسیح',
      homeCardText:'اگر می‌خواهید نجات را بشناسید، دعای نجات را بخوانید، زندگی تازه در مسیح را شروع کنید یا در کلیسا ثبت‌نام کنید، از این بخش استفاده کنید.',
      needBtn:'نیاز به نجات / ثبت‌نام',
      what:'نجات چیست؟',
      prayer:'دعای نجات',
      life:'زندگی مسیحی چیست؟',
      videos:'ویدیوهای تولد تازه',
      register:'ثبت‌نام',
      modalTitle:'تولد تازه و نجات در مسیح',
      whatTitle:'نجات چیست؟',
      whatText:'نجات یعنی انسان از گناه، جدایی از خدا و سلطه تاریکی آزاد شود و حیات تازه خدا را در مسیح دریافت کند. نجات با کارهای انسانی به دست نمی‌آید؛ نجات هدیه خداست که از راه ایمان به عیسی مسیح دریافت می‌شود.',
      prayerTitle:'دعای نجات',
      prayerText:'ای خداوند عیسی، من ایمان دارم که تو پسر خدا هستی، برای گناهان من مردی و خدا تو را از مردگان برخیزانید. امروز تو را به عنوان خداوند و نجات‌دهنده خود می‌پذیرم. قلب و زندگی من از آن توست. از امروز من فرزند خدا هستم. آمین.',
      lifeTitle:'زندگی مسیحی چیست؟',
      lifeText:'زندگی مسیحی یعنی زندگی تازه در اتحاد با مسیح؛ زندگی بر اساس کلام خدا، دعا، هدایت روح‌القدس، محبت، ایمان و رشد روزانه. پس از نجات، ایماندار باید در کلام، دعا، مشارکت کلیسایی و شاگردی رشد کند.',
      videosTitle:'ویدیوهای تولد تازه',
      videosText:'لطفاً شش قسمت ویدیوی تولد تازه در کانال یوتیوب امیدنو۷ را تماشا کنید و از مطالب آنها نت‌برداری کنید. این ویدیوها به شما کمک می‌کند قدم‌های اول زندگی تازه در مسیح را با آگاهی بردارید.',
      openForm:'باز کردن فرم ثبت‌نام',
      fastingTitle:'روزه',
      fastingTeaching:"\nاصطلاح روزه به طور کلی به دوره پرهیز از غذا اشاره دارد، با این هدف که انسان بدون وقفه به مطالعه کلام، دعا و مراقبه بپردازد و تمرکز روشنی در حضور خدا داشته باشد.\n\nخدا، خدای نظم است و نظم به چیزها معنا می‌بخشد. در کتاب‌مقدس، دعا پیش از روزه قرار دارد؛ بنابراین تأکید اصلی بر دعا و خدمت به خداوند است. روزه به خاطر دعا کردن است، نه صرفاً به خاطر غذا نخوردن.\n\nدر اعمال ۱۳:۲ می‌بینیم که آنها خداوند را خدمت می‌کردند و روزه می‌گرفتند؛ یعنی تمرکز آنان بر پرستش، دعا، ستایش و شکرگزاری بود. سپس روح‌القدس با آنان سخن گفت.\n\nدر زمان روزه، فعالیت‌هایی را انتخاب کنید که شما را به دعا، کلام و تمرکز روحانی نزدیک‌تر می‌کند: مطالعه کتاب‌مقدس، تفکر در کلام، دعا به زبان‌ها، پرستش و شنیدن تعلیم‌های ایمان‌بخش. حواس‌پرتی‌های غیرضروری را کنار بگذارید.\n\nچرا روزه مهم است؟\n۱. بهبود کارایی روحی\n۲. رام کردن جسم و بالا بردن روح\n۳. تقویت توانایی شنیدن صدای خدا\n۴. ایجاد تغییرات چشمگیر از طریق دعای جدی و متمرکز\n\nروزه گرفتن به روش صحیح یعنی تلاش برای تغییر دادن خدا نیست؛ خدا تغییر نمی‌کند. روزه ما را تغییر می‌دهد، حساسیت روحانی ما را افزایش می‌دهد و ما را در موقعیتی قرار می‌دهد که با تمرکز، ایمان و جدیت بیشتری دعا کنیم.\n\nمراحل روزه:\n• هدف مشخصی داشته باشید.\n• زمان‌های منظم برای دعا، مطالعه و مراقبه قرار دهید.\n• حواس‌پرتی‌ها و فعالیت‌های غیرضروری را کم کنید.\n• روزه باید با دعا و کلام همراه باشد و شخص در طول آن تمرکز روحانی داشته باشد.\n\nچه کسانی باید روزه بگیرند؟\nهر ایمانداری می‌تواند روزه بگیرد؛ نه فقط زمانی که در مشکل است، بلکه برای رشد روحانی، افزایش حساسیت به صدای خدا، آماده شدن برای آینده و تقویت راه رفتن در روح.\n\nانواع روزه‌هایی که در برنامه داریم:\n• روزه دانیال: پرهیز از غذاهای لذیذ و تمرکز بر دعا، حکمت و دریافت جهت الهی.\n• روزه چندساعته: زمانی مشخص در روز برای پرهیز از غذا، دعا و کلام.\n• روزه گروهی کلیسایی: روزه‌ای با هدف مشترک کلیسا برای دعا، اتحاد و جهت‌گیری روحانی.\n• روزه شبکه‌های اجتماعی: پرهیز از حواس‌پرتی‌های دیجیتال برای تمرکز بر کلام و دعا.\n• روزه سخنان منفی: پرهیز از شکایت، ترس، محکومیت و کلمات بی‌ایمان؛ جایگزین کردن آن با اعلان کلام خدا.\n• روزه افکار: مراقبت از ذهن، رد افکار ترس، تلخی، شهوت، ناامیدی و تمرکز بر کلام خدا.\n• روزه عادت‌های بد و مزاحم: کنار گذاشتن عاداتی که رشد روحانی را کند می‌کند و جایگزین کردن آن با نظم روحانی.\n"
    };
    var en={
      amen:'Amen',
      close:'Close',
      formTitle:'Registration Form',
      formHint:'Please enter accurate and complete information. This information is used for spiritual care, prayer, classes, church communication, and identification in later app features.',
      formIntro:'To register with OmideNo7 Church, complete the form below with true and complete information.',
      medalGuide:'Medal Guide',
      medalGuideText:'Medals encourage spiritual growth. Bronze begins at 100 points, Silver at 200, Gold at 500, and special medals unlock through consistency in the Word, prayer, thanksgiving, faith, School, and completing the 365-day plan.',
      dailyTitle:'Today’s Message',
      dailyCard:'Walk by faith today; the Lord is with you, and His Word lights your path.',
      homeCardTitle:'New Birth and Salvation in Christ',
      homeCardText:'Use this section to learn salvation, pray the salvation prayer, begin your new life in Christ, or register with the church.',
      needBtn:'Need Salvation / Registration',
      what:'What is salvation?',
      prayer:'Salvation prayer',
      life:'What is Christian life?',
      videos:'New birth videos',
      register:'Registration',
      modalTitle:'New Birth and Salvation in Christ',
      whatTitle:'What is salvation?',
      whatText:'Salvation means being delivered from sin, separation from God, and the authority of darkness, and receiving God’s new life in Christ. Salvation is God’s gift received by faith in Jesus Christ.',
      prayerTitle:'Salvation prayer',
      prayerText:'Lord Jesus, I believe that You are the Son of God, that You died for my sins, and that God raised You from the dead. Today I receive You as my Lord and Savior. My heart and life belong to You. From today, I am a child of God. Amen.',
      lifeTitle:'What is Christian life?',
      lifeText:'Christian life is the new life in union with Christ; a life shaped by God’s Word, prayer, the Holy Spirit, love, faith, and daily growth.',
      videosTitle:'New birth videos',
      videosText:'Please watch the six New Birth video lessons on the OmideNo7 YouTube channel and take notes. These lessons help you understand the first steps of your new life in Christ.',
      openForm:'Open registration form',
      fastingTitle:'Fasting',
      fastingTeaching:"\nFasting is a period of abstaining from food in order to give uninterrupted attention to the Word, prayer, and meditation with a clear spiritual focus.\n\nGod is a God of order. In Scripture, prayer comes before fasting. The emphasis is prayer and ministry to the Lord; fasting serves prayer, not the other way around.\n\nIn Acts 13:2, the believers ministered to the Lord and fasted; their focus was worship, prayer, praise, and thanksgiving. Then the Holy Spirit spoke.\n\nDuring a fast, choose activities that strengthen prayer and focus: Bible study, meditation on the Word, praying in tongues, worship, and faith-building teachings. Remove unnecessary distractions.\n\nWhy is fasting important?\n1. It improves spiritual effectiveness.\n2. It brings the body under discipline and lifts the spirit.\n3. It strengthens your ability to hear God’s voice.\n4. It helps produce focused, heartfelt prayer that brings change.\n\nFasting does not change God; it changes us. It increases spiritual sensitivity and positions us to pray with greater focus, faith, and seriousness.\n\nTypes of fasting in this app:\nDaniel fast, partial-hour fast, church corporate fast, social-media fast, negative-speech fast, thought fast, and bad-habit fast.\n"
    };
    var hr={
      amen:'Amen',
      close:'Zatvori',
      formTitle:'Obrazac za registraciju',
      formHint:'Molimo unesite točne i potpune podatke. Ti se podaci koriste za duhovnu skrb, molitvu, razrede, crkvenu komunikaciju i identifikaciju u kasnijim značajkama aplikacije.',
      formIntro:'Za registraciju u crkvi OmideNo7 ispunite obrazac istinitim i potpunim podacima.',
      medalGuide:'Vodič za medalje',
      medalGuideText:'Medalje potiču duhovni rast. Brončana počinje od 100 bodova, srebrna od 200, zlatna od 500, a posebne medalje otključavaju se kroz ustrajnost u Riječi, molitvi, zahvalnosti, vjeri, Školi i dovršetku 365-dnevnog plana.',
      dailyTitle:'Današnja poruka',
      dailyCard:'Hodaj danas u vjeri; Gospodin je s tobom i Njegova Riječ osvjetljava tvoj put.',
      homeCardTitle:'Novo rođenje i spasenje u Kristu',
      homeCardText:'Ovaj odjeljak koristi se za učenje o spasenju, molitvu spasenja, početak novog života u Kristu i registraciju u crkvi.',
      needBtn:'Trebam spasenje / registraciju',
      what:'Što je spasenje?',
      prayer:'Molitva spasenja',
      life:'Što je kršćanski život?',
      videos:'Videozapisi o novom rođenju',
      register:'Registracija',
      modalTitle:'Novo rođenje i spasenje u Kristu',
      whatTitle:'Što je spasenje?',
      whatText:'Spasenje znači oslobođenje od grijeha, odvojenosti od Boga i vlasti tame te primanje novog Božjeg života u Kristu. Spasenje je Božji dar koji se prima vjerom u Isusa Krista.',
      prayerTitle:'Molitva spasenja',
      prayerText:'Gospodine Isuse, vjerujem da si Ti Sin Božji, da si umro za moje grijehe i da Te Bog uskrisio od mrtvih. Danas Te primam kao svoga Gospodina i Spasitelja. Moje srce i moj život pripadaju Tebi. Od danas sam Božje dijete. Amen.',
      lifeTitle:'Što je kršćanski život?',
      lifeText:'Kršćanski život je novi život u jedinstvu s Kristom; život oblikovan Božjom Riječi, molitvom, Duhom Svetim, ljubavlju, vjerom i svakodnevnim rastom.',
      videosTitle:'Videozapisi o novom rođenju',
      videosText:'Pogledajte šest video lekcija o novom rođenju na YouTube kanalu OmideNo7 i bilježite važne točke. Ove lekcije pomažu razumjeti prve korake novog života u Kristu.',
      openForm:'Otvori obrazac za registraciju',
      fastingTitle:'Post',
      fastingTeaching:"\nPost je razdoblje odricanja od hrane kako bismo neometano posvetili pažnju Božjoj Riječi, molitvi i razmišljanju s jasnim duhovnim fokusom.\n\nBog je Bog reda. U Pismu molitva dolazi prije posta. Naglasak je na molitvi i služenju Gospodinu; post služi molitvi, a ne obrnuto.\n\nU Djelima 13:2 vjernici su služili Gospodinu i postili; njihov fokus bio je štovanje, molitva, slavljenje i zahvalnost. Tada im je Duh Sveti progovorio.\n\nTijekom posta birajte aktivnosti koje jačaju molitvu i fokus: proučavanje Biblije, razmišljanje o Riječi, molitva u jezicima, štovanje i pouke koje izgrađuju vjeru. Uklonite nepotrebne smetnje.\n\nZašto je post važan?\n1. Poboljšava duhovnu učinkovitost.\n2. Disciplinira tijelo i uzdiže duh.\n3. Jača sposobnost slušanja Božjeg glasa.\n4. Pomaže usredotočenoj, srdačnoj molitvi koja donosi promjenu.\n\nPost ne mijenja Boga; mijenja nas. Povećava duhovnu osjetljivost i postavlja nas da molimo s većim fokusom, vjerom i ozbiljnošću.\n\nVrste posta u ovoj aplikaciji:\nDanielov post, post od nekoliko sati, zajednički crkveni post, post društvenih mreža, post negativnih riječi, post misli i post loših navika.\n"
    };
    var l=lang();
    return (l==='hr'?hr:(l==='en'?en:fa))[k] || fa[k] || k;
  }

  function esc(v){
    return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }

  function todayKey(){ return new Date().toISOString().slice(0,10); }

  function css(){
    if(document.getElementById('v6349dCss')) return;
    var st=document.createElement('style');
    st.id='v6349dCss';
    st.textContent=[
      '#v6349MorePanel{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;}',
      '#v6349cSalvationCard{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;}',
      '#v6349dDailyCard,#v6349dSalvationCard,#v6349dFastingCard{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;}',
      '#v6349dDailyCard .msg{background:#eef4ff;color:#06146D;border-radius:16px;padding:12px;font-weight:900;line-height:1.9;}',
      '.v6349d-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}',
      '#v6349dSalvationCard p,#v6349dFastingCard p{line-height:1.9}',
      '#v6349dModal,#v6349dStartPopup{position:fixed;inset:0;z-index:999999;}',
      '.v6349d-backdrop{position:absolute;inset:0;background:rgba(2,8,23,.45);backdrop-filter:blur(2px)}',
      '.v6349d-box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,760px);max-height:90vh;overflow:auto;background:#fff;border-radius:26px;padding:22px;box-shadow:0 28px 90px rgba(0,0,0,.35);border-top:6px solid #00B91F;}',
      '.v6349d-x{position:absolute;right:14px;top:10px;border:0;background:#f1f5f9;border-radius:999px;width:36px;height:36px;font-size:26px;line-height:1;}',
      '.v6349d-section{background:#f8fbff;border:1px solid #dbe3ef;border-radius:16px;padding:12px;margin:12px 0}',
      '#v6349dMedalGuideBox{display:none;background:#eef4ff;color:#06146D;border-radius:16px;padding:12px;margin-top:10px;font-weight:800;line-height:1.8}',
      '.fa #v6349dDailyCard,.fa #v6349dSalvationCard,.fa #v6349dFastingCard,.fa .v6349d-box{direction:rtl;text-align:right;}',
      '.fa #v6349dStartPopup .v6349d-box{text-align:center;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function removeMoreRegistration(){
    var el=document.getElementById('v6349MorePanel');
    if(el) el.remove();
    var more=document.getElementById('more');
    if(!more) return;
    Array.prototype.slice.call(more.querySelectorAll('.card,div,section')).forEach(function(x){
      var txt=(x.textContent||'').trim();
      if(txt.length<700 && /فرم ثبت|ثبت‌نام کلیسا|Church Registration|Registracija/i.test(txt) && x.id!=='v6349bRewardsClean'){
        if(x.id==='v6349MorePanel' || /باز کردن فرم|نیاز به نجات و ثبت|Open registration/i.test(txt)) x.remove();
      }
    });
  }

  function patchRegistrationForm(){
    var modal=document.getElementById('v6349Modal');
    if(!modal) return;
    var h=modal.querySelector('h2');
    if(h) h.textContent=T('formTitle');
    var intro=modal.querySelector('.v6349-intro');
    if(intro) intro.textContent=T('formIntro');
    var hint=modal.querySelector('.v6349-hint');
    if(hint) hint.textContent=T('formHint');

    // Strengthen required behavior and remove "none" style hint.
    var form=modal.querySelector('#v6349Form');
    if(form && !form.dataset.v6349dStrict){
      form.dataset.v6349dStrict='1';
      form.addEventListener('submit',function(ev){
        var data=new FormData(form);
        var invalid=false;
        form.querySelectorAll('input,select,textarea').forEach(function(input){
          if(input.type==='checkbox') {
            if(!input.checked) invalid=true;
          } else if(input.hasAttribute('required') && !String(input.value||'').trim()) {
            invalid=true;
          }
        });
        var email=String(data.get('email')||'').trim();
        if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalid=true;
        if(invalid){
          ev.preventDefault();
          ev.stopImmediatePropagation();
          var box=document.getElementById('v6349Status');
          if(box) box.innerHTML='<div class="v6349-status error">'+esc(T('formHint'))+'</div>';
          return false;
        }
      },true);
    }
  }

  function showStartupPopup(){
    var key=POPUP_KEY_PREFIX+todayKey()+'_'+lang();
    if(localStorage.getItem(key)==='1') return;
    var old=document.getElementById('v6349dStartPopup');
    if(old) old.remove();
    var div=document.createElement('div');
    div.id='v6349dStartPopup';
    div.innerHTML='<div class="v6349d-backdrop"></div><div class="v6349d-box" style="text-align:center;max-width:430px;">'+
      '<h2>✨ '+esc(T('dailyTitle'))+'</h2><p style="line-height:1.9;font-weight:900;color:#06146D;">'+esc(T('dailyCard'))+'</p>'+
      '<button type="button" class="btn primary" id="v6349dAmen">'+esc(T('amen'))+'</button></div>';
    document.body.appendChild(div);
    document.getElementById('v6349dAmen').onclick=function(){
      localStorage.setItem(key,'1');
      div.remove();
    };
  }

  function dailyCardHtml(){
    return '<div id="v6349dDailyCard" class="card"><div class="msg">✨ '+esc(T('dailyCard'))+'</div></div>';
  }

  function modalHtml(kind){
    function sec(title,text){return '<div class="v6349d-section"><h3>'+esc(title)+'</h3><p>'+esc(text)+'</p></div>';}
    var content='';
    if(kind==='what') content=sec(T('whatTitle'),T('whatText'));
    else if(kind==='prayer') content=sec(T('prayerTitle'),T('prayerText'));
    else if(kind==='life') content=sec(T('lifeTitle'),T('lifeText'));
    else if(kind==='videos') content=sec(T('videosTitle'),T('videosText'));
    else content=sec(T('whatTitle'),T('whatText'))+sec(T('prayerTitle'),T('prayerText'))+sec(T('lifeTitle'),T('lifeText'))+sec(T('videosTitle'),T('videosText'));
    return '<div id="v6349dModal"><div class="v6349d-backdrop"></div><div class="v6349d-box">'+
      '<button type="button" class="v6349d-x">×</button><h2>'+esc(T('modalTitle'))+'</h2>'+content+
      '<div class="v6349d-actions"><button type="button" class="btn gold" id="v6349dOpenForm">'+esc(T('openForm'))+'</button><button type="button" class="btn light" id="v6349dClose">'+esc(T('close'))+'</button></div>'+
      '</div></div>';
  }

  function closeModal(){ var m=document.getElementById('v6349dModal'); if(m) m.remove(); }

  function openTeach(kind){
    var old=document.getElementById('v6349dModal'); if(old) old.remove();
    var w=document.createElement('div'); w.innerHTML=modalHtml(kind);
    document.body.appendChild(w.firstElementChild);
    document.querySelector('#v6349dModal .v6349d-backdrop').onclick=closeModal;
    document.querySelector('#v6349dModal .v6349d-x').onclick=closeModal;
    document.getElementById('v6349dClose').onclick=closeModal;
    document.getElementById('v6349dOpenForm').onclick=function(ev){ev.preventDefault(); closeModal(); openRegistration();};
  }

  function openRegistration(){
    if(window.OMIDENO7_V6349_REGISTRATION_BETA && typeof window.OMIDENO7_V6349_REGISTRATION_BETA.openForm==='function'){
      window.OMIDENO7_V6349_REGISTRATION_BETA.openForm();
      setTimeout(patchRegistrationForm,100);
      setTimeout(patchRegistrationForm,500);
    }
  }

  function salvationHtml(){
    return '<div id="v6349dSalvationCard" class="card"><h3>✨ '+esc(T('homeCardTitle'))+'</h3><p>'+esc(T('homeCardText'))+'</p>'+
      '<div class="v6349d-actions"><button type="button" class="btn primary" id="v6349dNeed">'+esc(T('needBtn'))+'</button></div>'+
      '<div id="v6349dSalvationButtons" style="display:none;margin-top:12px;">'+
        '<div class="v6349d-actions" style="flex-direction:column;align-items:stretch;">'+
          '<button type="button" class="btn secondary" id="v6349dWhat">'+esc(T('what'))+'</button>'+
          '<button type="button" class="btn secondary" id="v6349dPrayer">'+esc(T('prayer'))+'</button>'+
          '<button type="button" class="btn secondary" id="v6349dLife">'+esc(T('life'))+'</button>'+
          '<button type="button" class="btn secondary" id="v6349dVideos">'+esc(T('videos'))+'</button>'+
          '<button type="button" class="btn gold" id="v6349dRegister">'+esc(T('register'))+'</button>'+
        '</div></div></div>';
  }

  function renderSalvationInPlace(){
    var home=document.getElementById('home'); if(!home) return;

    // Remove previous injected duplicates.
    ['v6349cSalvationCard','v6349dSalvationCard'].forEach(function(id){var x=document.getElementById(id); if(x) x.remove();});

    // Remove extra lower cards under Q&A that are new injected cards.
    Array.prototype.slice.call(home.querySelectorAll('.card,section,div')).forEach(function(el){
      var txt=(el.textContent||'').trim();
      if(txt.length<900 && /تولد تازه و نجات در مسیح|New Birth and Salvation|Novo rođenje/i.test(txt) && /ویدیو|video|ثبت|registr/i.test(txt)){
        if(!el.dataset.originalSalvation) el.remove();
      }
    });

    var target=null;
    var cards=Array.prototype.slice.call(home.querySelectorAll('.card,section,div'));
    for(var i=0;i<cards.length;i++){
      var txt=(cards[i].textContent||'').trim();
      if(/تولد تازه و نجات در مسیح|تولد تازه|نجات در مسیح|New Birth|Salvation in Christ|Novo rođenje|Spasenje/i.test(txt)){
        target=cards[i]; break;
      }
    }

    var wrap=document.createElement('div'); wrap.innerHTML=salvationHtml();
    var card=wrap.firstElementChild;
    card.dataset.originalSalvation='1';

    if(target && target.parentNode){
      target.parentNode.insertBefore(card,target);
      target.remove();
    } else {
      // Put it in Home near top, after daily message if possible.
      var daily=document.getElementById('v6349dDailyCard');
      if(daily && daily.parentNode) daily.parentNode.insertBefore(card,daily.nextSibling);
      else {
        var first=home.querySelector('.card');
        if(first && first.parentNode) first.parentNode.insertBefore(card,first.nextSibling);
        else home.insertBefore(card,home.firstChild);
      }
    }

    document.getElementById('v6349dNeed').onclick=function(ev){
      ev.preventDefault();
      var box=document.getElementById('v6349dSalvationButtons');
      box.style.display = box.style.display==='none' ? 'block' : 'none';
      return false;
    };
    [['v6349dWhat','what'],['v6349dPrayer','prayer'],['v6349dLife','life'],['v6349dVideos','videos']].forEach(function(x){
      var el=document.getElementById(x[0]); if(el) el.onclick=function(ev){ev.preventDefault(); openTeach(x[1]); return false;};
    });
    var reg=document.getElementById('v6349dRegister');
    if(reg) reg.onclick=function(ev){ev.preventDefault(); openRegistration(); return false;};
  }

  function renderDailyCard(){
    var home=document.getElementById('home'); if(!home) return;
    var old=document.getElementById('v6349dDailyCard');
    if(old) old.remove();
    var w=document.createElement('div'); w.innerHTML=dailyCardHtml();
    var card=w.firstElementChild;
    // Put under welcome / meetings area. Use first or second card to avoid going too low.
    var cards=home.querySelectorAll('.card');
    var ref=cards && cards.length ? cards[Math.min(1,cards.length-1)] : null;
    if(ref && ref.parentNode) ref.parentNode.insertBefore(card,ref.nextSibling);
    else home.insertBefore(card,home.firstChild);
  }

  function patchMedalGuide(){
    Array.prototype.slice.call(document.querySelectorAll('summary,button')).forEach(function(el){
      var txt=(el.textContent||'').trim();
      if(/خلاصه مدال|Medal summary|Sažetak medalja/i.test(txt)){
        el.textContent=T('medalGuide');
      }
    });
    // Stable custom box for guide if clean reward panel exists.
    var panel=document.getElementById('v6349bRewardsClean');
    if(panel && !document.getElementById('v6349dMedalGuideStable')){
      var div=document.createElement('div');
      div.id='v6349dMedalGuideStable';
      div.innerHTML='<button type="button" class="btn secondary" id="v6349dMedalGuideBtn">'+esc(T('medalGuide'))+'</button><div id="v6349dMedalGuideBox">'+esc(T('medalGuideText'))+'</div>';
      panel.appendChild(div);
      document.getElementById('v6349dMedalGuideBtn').onclick=function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var b=document.getElementById('v6349dMedalGuideBox');
        b.style.display = b.style.display==='block' ? 'none' : 'block';
        return false;
      };
    }
  }

  function verseButton(ref,label){
    return '<button type="button" class="btn secondary v6349dVerse" data-ref="'+esc(ref)+'">'+esc(label||ref)+'</button>';
  }

  function renderFastingTeaching(){
    // Find fasting plan / teaching area and inject a clear teaching card.
    var plans=document.getElementById('plans') || document.body;
    if(!plans) return;
    var existing=document.getElementById('v6349dFastingCard');
    if(existing) return;

    var target=null;
    var nodes=Array.prototype.slice.call(plans.querySelectorAll('.card,section,div'));
    for(var i=0;i<nodes.length;i++){
      var txt=(nodes[i].textContent||'').trim();
      if(/تعلیم کتاب مقدسی درباره روزه|روزه|fasting|post/i.test(txt) && /مکاشفه|مسیر|revelation|otkrivenje/i.test(txt+ ' ' + (nodes[i].id||''))){
        target=nodes[i]; break;
      }
    }
    if(!target) return;

    var html='<div id="v6349dFastingCard" class="card"><h3>📖 '+esc(T('fastingTitle'))+'</h3>'+
      '<p style="white-space:pre-wrap;">'+esc(T('fastingTeaching'))+'</p>'+
      '<div class="v6349d-actions">'+
        verseButton('Acts 13:2','اعمال ۱۳:۲')+
        verseButton('Romans 8:6','رومیان ۸:۶')+
        verseButton('John 6:63','یوحنا ۶:۶۳')+
        verseButton('James 5:17','یعقوب ۵:۱۷')+
        verseButton('Malachi 3:6','ملاکی ۳:۶')+
        verseButton('Daniel 10:2-3','دانیال ۱۰:۲-۳')+
      '</div></div>';
    var w=document.createElement('div'); w.innerHTML=html;
    target.parentNode.insertBefore(w.firstElementChild,target.nextSibling);
    document.querySelectorAll('#v6349dFastingCard .v6349dVerse').forEach(function(btn){
      btn.onclick=function(ev){
        ev.preventDefault();
        var ref=btn.getAttribute('data-ref');
        // Use app bible openers if present, otherwise show a simple alert with reference.
        if(typeof window.openBibleReference==='function') window.openBibleReference(ref);
        else if(typeof window.openVerse==='function') window.openVerse(ref);
        else alert(ref);
      };
    });
  }

  function render(){
    css();
    removeMoreRegistration();
    renderDailyCard();
    renderSalvationInPlace();
    patchMedalGuide();
    renderFastingTeaching();
    patchRegistrationForm();
  }

  document.addEventListener('DOMContentLoaded',function(){render(); setTimeout(showStartupPopup,700);});
  window.addEventListener('load',function(){render(); setTimeout(showStartupPopup,1000);});
  document.addEventListener('click',function(){setTimeout(render,120);},true);
  setInterval(render,1800);
  setTimeout(render,500);
  setTimeout(render,1600);

  window.OMIDENO7_V6349D_FIX_BETA={render:render,openTeach:openTeach,openRegistration:openRegistration,version:VERSION};
})();
