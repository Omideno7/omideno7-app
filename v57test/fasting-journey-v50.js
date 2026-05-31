/* Omid No 7 Web App - V50 Fasting Journey / سفر روزه
   Adds an interactive, local-device fasting journey inside Plans without touching other app sections. */
(function(){
  'use strict';

  const LS_VIEW='fastingJourneyViewV50';
  const LS_ACTIVE='fastingJourneyActiveV50';
  const LS_HISTORY='fastingJourneyHistoryV50';
  const LS_NOTES='fastingJourneyNotesV50';
  const LS_RESULTS='fastingJourneyResultsV50';
  const LS_TESTIMONIES='fastingJourneyTestimoniesV50';
  const LS_SELECTED='selectedPlanKeyV50';

  const $ = (id)=>document.getElementById(id);
  const lang = ()=>localStorage.getItem('lang') || document.documentElement.lang || 'fa';
  const isFa = ()=>lang()==='fa';
  const esc = (v)=>String(v==null?'':v).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const nowInputDate = ()=> new Date().toISOString().slice(0,10);
  const nowInputTime = ()=> `${String(new Date().getHours()).padStart(2,'0')}:00`;
  const id = ()=> 'fast_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,7);
  const getJSON=(k,fb)=>{try{return JSON.parse(localStorage.getItem(k)||'')||fb;}catch(e){return fb;}};
  const setJSON=(k,v)=>localStorage.setItem(k, JSON.stringify(v));
  const faDigits=(v)=> (window.toFaDigits?window.toFaDigits(v):String(v));

  const copy = {
    fa:{
      selectPlan:'انتخاب پلن', plansDesc:'پلن‌ها و مسیرهای تعلیمی برای رشد روزانه.', startPlan:'شروع', back:'بازگشت',
      title:'مسیر روزه و مکاشفه', subtitle:'Fasting Journey / سفر روزه', slogan:'روزه، فقط نخوردن نیست؛ وارد شدن به تمرکز عمیق‌تر با خداوند است.',
      intro:'روزه مسیحی فقط نخوردن غذا نیست؛ جدا کردن زمان برای خدا، شنیدن کلام، دعا، تعمق و تقویت روح است.',
      start:'شروع روزه جدید', active:'روزه‌های فعال من', journal:'دفتر مکاشفات من', stats:'آمار رشد روحانی من', teaching:'تعلیم کتاب‌مقدسی درباره روزه', group:'روزه گروهی کلیسا', testimony:'شهادت‌ها',
      pillars:'چهار ستون این مسیر', word:'کلام', prayer:'دعا', meditation:'تعمق', revelation:'مکاشفه',
      step1:'مرحله اول: انتخاب نوع روزه', step2:'مرحله دوم: تعیین زمان روزه', step3:'مرحله سوم: انتخاب موضوع روزه', step4:'مرحله چهارم: آماده‌سازی قلب',
      typeHelp:'این گزینه‌ها قانون مذهبی نیستند؛ ابزار نظم روحانی هستند. در مسیحیت، ارزش روزه به اجبار، نمایش مذهبی یا گرسنگی نیست؛ بلکه به قلبی است که در حضور خداوند قرار می‌گیرد.',
      health:'توجه: اگر بیماری خاص، بارداری، دیابت، مشکل قلبی، داروی خاص، یا شرایط پزشکی دارید، قبل از روزه غذایی با پزشک مشورت کنید. روزه مسیحی نباید به بدن شما آسیب بزند. می‌توانید به جای روزه غذایی، زمانی را برای دعا، کلام، پرهیز از رسانه‌ها یا تمرکز روحانی اختصاص دهید.',
      startDate:'تاریخ شروع', endDate:'تاریخ پایان', startTime:'ساعت شروع', endTime:'ساعت پایان', repeat:'تکرار روزانه', reminder:'یادآوری دریافت کنم', customTopic:'موضوع شخصی من', saveStart:'ثبت و شروع مسیر روزه',
      currentFast:'روزه فعال شما', noActive:'فعلاً روزه فعالی ثبت نشده است.', day:'روز', of:'از', remaining:'زمان باقی‌مانده', completed:'کامل شده', finishToday:'پایان روزه امروز / ثبت نتیجه', finishFast:'تکمیل این روزه', newFast:'شروع روزه جدید',
      todayVerse:'آیه امروز', todayTeaching:'تعلیم کوتاه امروز', todayPrayer:'دعای امروز', todayDeclaration:'اعلان ایمانی امروز', todayJournal:'دفتر مکاشفه امروز', spiritualState:'ثبت احساس و وضعیت روحانی', saveNote:'ذخیره یادداشت', saved:'ذخیره شد',
      noteQuestions:'امروز خداوند چه چیزی به قلب من گذاشت؟ چه آیه‌ای با من صحبت کرد؟ در دعا چه چیزی دریافت کردم؟ چه تصمیمی باید بگیرم؟',
      resultTitle:'نتیجه روزه من', resultHelp:'این روزه چه تأثیری در زندگی من داشت؟ چه چیزی از خداوند دریافت کردم؟ بعد از این روزه چه قدم عملی باید بردارم؟', saveResult:'ثبت نتیجه روزه',
      statsNote:'این آمار برای فخر کردن نیست؛ بلکه برای دیدن وفاداری، استمرار و رشد شخصی شما در مسیر خداوند است.', totalFasts:'تعداد روزه‌های کامل‌شده', totalHours:'مجموع ساعت‌های روزه', totalDays:'مجموع روزهای روزه', notesCount:'تعداد یادداشت‌های مکاشفه', longest:'طولانی‌ترین روزه', mostTopic:'بیشترین موضوع',
      groupTitle:'روزه گروهی کلیسای امیدنو۷', groupDesc:'روزه‌های گروهی برای اتحاد کلیسا، دعا برای نجات جان‌ها، رشد کلیسا و بیداری روحانی استفاده می‌شوند. وقتی روزه گروهی اعلام شود، می‌توانید شرکت خود را ثبت کنید و هر روز آیه، دعا و اعلان مشترک دریافت کنید.', joinGroup:'من در این روزه شرکت می‌کنم',
      testimonyHelp:'بعد از پایان روزه، شهادت خود را ثبت کنید. می‌توانید آن را فقط برای خود نگه دارید، با رهبر کلیسا به اشتراک بگذارید، یا به صورت ناشناس برای تشویق کلیسا استفاده شود.',
      openVerse:'برای دیدن متن آیه لمس کنید', chooseType:'نوع روزه خود را انتخاب کنید', chooseTopic:'هدف روحانی روزه خود را انتخاب کنید', prepared:'شما وارد یک مسیر روزه، دعا و تعمق می‌شوید.', nonFood:'روزه غیرغذایی'
    }
  };
  const C = (k)=> (copy.fa[k] || k);

  const fastTypes = ['روزه چند ساعته','روزه یک‌روزه','روزه چندروزه','روزه دانیال','روزه فقط با آب','روزه شخصی با تنظیم دلخواه','روزه گروهی کلیسا','روزه شبکه‌های اجتماعی','روزه تلویزیون و سرگرمی','روزه صحبت‌های منفی','روزه عادت‌های مزاحم','روزه زمان برای دعا و کلام'];
  const topics = ['نزدیکی بیشتر با خداوند','شنیدن صدای خدا','هدایت برای تصمیم مهم','رشد روحانی','تقدیس و پاکی','دعا برای خانواده','دعا برای کلیسا','دعا برای شفا','دعا برای خدمت','دعا برای نجات جان‌ها','تقویت ایمان','غلبه بر ترس','غلبه بر وسوسه','دریافت مکاشفه از کلام خدا','آمادگی برای خدمت','روزه شکرگزاری','بیداری روحانی','روزه و دعا','موضوع شخصی من'];
  const verseBank = {
    'شنیدن صدای خدا':[
      ['یوحنا ۱۰:۲۷','گوسفندان من آواز مرا می‌شنوند و من آن‌ها را می‌شناسم و آن‌ها مرا پیروی می‌کنند.'],
      ['رومیان ۸:۱۴','زیرا همه کسانی که از روح خدا هدایت می‌شوند، فرزندان خدا هستند.'],
      ['امثال ۳:۵-۶','به تمامی دل خود بر خداوند توکل نما و بر عقل خود تکیه مکن؛ در همه راه‌های خود او را بشناس و او طریق‌هایت را راست خواهد گردانید.'],
      ['اشعیا ۳۰:۲۱','گوش‌هایت سخنی را از عقب تو خواهد شنید که می‌گوید: راه این است؛ در آن سلوک نمایید.'],
      ['کولسیان ۳:۱۵','سلامتی خدا در دل‌های شما حکمفرما باشد.']
    ],
    'تقویت ایمان':[
      ['رومیان ۱۰:۱۷','ایمان از شنیدن است و شنیدن از کلام خدا.'],
      ['مرقس ۱۱:۲۳-۲۴','هر که به این کوه بگوید منتقل شو و شک نکند، بلکه ایمان داشته باشد، برای او خواهد شد.'],
      ['عبرانیان ۱۱:۱','ایمان، اطمینان به چیزهایی است که امید داریم و برهان چیزهایی که نمی‌بینیم.'],
      ['دوم قرنتیان ۵:۷','زیرا به ایمان رفتار می‌کنیم نه به دیدن.'],
      ['اول یوحنا ۵:۴','این است غلبه‌ای که بر جهان غالب شده است: ایمان ما.']
    ],
    'روزه و دعا':[
      ['متی ۶:۱۶-۱۸','وقتی روزه می‌گیرید، مانند ریاکاران ترش‌رو نباشید؛ پدر تو که در نهان می‌بیند، تو را آشکارا اجر خواهد داد.'],
      ['اعمال ۱۳:۲-۳','چون ایشان خداوند را عبادت می‌کردند و روزه می‌داشتند، روح‌القدس فرمود... پس روزه داشته و دعا کرده، دست‌ها بر ایشان نهادند.'],
      ['اعمال ۱۴:۲۳','در هر کلیسا مشایخ تعیین کردند و با روزه و دعا ایشان را به خداوند سپردند.'],
      ['متی ۴:۴','انسان تنها به نان زیست نمی‌کند، بلکه به هر کلمه‌ای که از دهان خدا صادر گردد.'],
      ['اشعیا ۵۸:۶-۱۲','روزه‌ای که من برگزیده‌ام این نیست که بندهای شرارت را بگشایید و مظلومان را آزاد سازید؟']
    ],
    'رشد روحانی':[
      ['دوم پطرس ۳:۱۸','در فیض و معرفت خداوند و نجات‌دهنده ما عیسی مسیح رشد کنید.'],
      ['کولسیان ۱:۱۰','در هر کار نیکو ثمر آورید و در معرفت خدا رشد نمایید.'],
      ['غلاطیان ۵:۲۲-۲۳','ثمره روح محبت، خوشی، سلامتی، حلم، مهربانی، نیکویی، ایمان، تواضع و پرهیزکاری است.']
    ],
    'تقدیس و پاکی':[
      ['اول تسالونیکیان ۴:۳','اراده خدا تقدیس شماست.'],
      ['مزمور ۵۱:۱۰','ای خدا، دل طاهر در من بیافرین و روح مستقیم در باطنم تازه بساز.'],
      ['دوم تیموتائوس ۲:۲۱','اگر کسی خود را پاک سازد، ظرفی برای عزت خواهد بود.']
    ],
    'دعا برای خانواده':[
      ['یوشع ۲۴:۱۵','اما من و خاندانم، خداوند را عبادت خواهیم نمود.'],
      ['اعمال ۱۶:۳۱','به خداوند عیسی مسیح ایمان آور که تو و اهل خانه‌ات نجات خواهید یافت.'],
      ['اشعیا ۵۴:۱۳','تمامی فرزندان تو از خداوند تعلیم خواهند یافت.']
    ],
    'دعا برای شفا':[
      ['اشعیا ۵۳:۵','به زخم‌های او ما شفا یافتیم.'],
      ['اول پطرس ۲:۲۴','به زخم‌های او شفا یافته‌اید.'],
      ['یعقوب ۵:۱۵','دعای ایمان، مریض را نجات خواهد بخشید.']
    ],
    'روزه شکرگزاری':[
      ['اول تسالونیکیان ۵:۱۸','در هر چیز شکرگزاری کنید، زیرا این است اراده خدا در مسیح عیسی برای شما.'],
      ['مزمور ۱۰۳:۲','ای جان من، خداوند را متبارک بخوان و همه احسان‌های او را فراموش مکن.'],
      ['کولسیان ۳:۱۷','هر چه کنید، همه را به نام خداوند عیسی کرده، خدا را شکر نمایید.']
    ],
    'default':[
      ['متی ۴:۴','انسان تنها به نان زیست نمی‌کند، بلکه به هر کلمه‌ای که از دهان خدا صادر گردد.'],
      ['متی ۶:۱۶-۱۸','وقتی روزه می‌گیرید، برای پدر خود که در نهان است روزه بگیرید.'],
      ['رومیان ۱۲:۱','بدن‌های خود را قربانی زنده، مقدس و پسندیده خدا بگذرانید.'],
      ['غلاطیان ۵:۱۶','به روح رفتار کنید تا شهوات جسم را به‌جا نیاورید.']
    ]
  };
  const dayPath = [
    {title:'آرام کردن قلب در حضور خدا', verse:['متی ۴:۴','انسان تنها به نان زیست نمی‌کند، بلکه به هر کلمه‌ای که از دهان خدا صادر گردد.'], teaching:'روزه مسیحی به ما یادآوری می‌کند که منبع اصلی حیات ما غذا نیست، بلکه کلام خداست. وقتی بدن آرام می‌شود، روح ما باید بیدارتر شود و توجه ما به صدای خدا بیشتر گردد.', prayer:'پدر آسمانی، امروز قلبم را به روی کلامت باز می‌کنم. کمکم کن در این روزه فقط از غذا دور نشوم، بلکه به حضور تو نزدیک‌تر شوم.', declaration:'من با کلام خدا زندگی می‌کنم. روح من قوی است. صدای خداوند را می‌شنوم و در مسیر او حرکت می‌کنم.'},
    {title:'حساس شدن نسبت به روح‌القدس', verse:['رومیان ۸:۱۴','همه کسانی که از روح خدا هدایت می‌شوند، فرزندان خدا هستند.'], teaching:'روزه تمرین شنیدن و پاسخ دادن به هدایت روح‌القدس است. در این روز، عجله را کنار بگذار و اجازه بده آرامی خداوند داور قلب تو باشد.', prayer:'روح‌القدس عزیز، گوش روحانی مرا بیدار کن و مرا در راه خداوند هدایت نما.', declaration:'من فرزند خدا هستم و از روح خدا هدایت می‌شوم.'},
    {title:'ایستادن در ایمان و اطاعت', verse:['یعقوب ۱:۲۲','کنندگان کلام باشید، نه فقط شنوندگان.'], teaching:'ثمره روزه فقط احساس خوب نیست؛ اطاعت عملی از کلام خداست. آنچه خداوند به قلب تو نشان می‌دهد، باید به قدم عملی تبدیل شود.', prayer:'خداوندا، به من قوت بده تا آنچه از کلامت می‌شنوم با ایمان انجام دهم.', declaration:'من شنونده و انجام‌دهنده کلام خدا هستم؛ ایمان من ثمر می‌آورد.'},
    {title:'پاک‌سازی قلب و تمرکز تازه', verse:['مزمور ۵۱:۱۰','ای خدا، دل طاهر در من بیافرین و روح مستقیم در باطنم تازه بساز.'], teaching:'در روزه، خداوند چیزهایی را نشان می‌دهد که باید اصلاح، رها یا تسلیم شوند. این اصلاح محکومیت نیست؛ دعوت پدرانه برای رشد است.', prayer:'پدر، قلب مرا پاک و متمرکز کن. هر چیزی که مانع رشد من است به تو می‌سپارم.', declaration:'قلب من برای خدا باز است و در پاکی، حکمت و اطاعت رشد می‌کنم.'},
    {title:'قدرت برای خدمت و شهادت', verse:['اعمال ۱۳:۲','هنگامی که خداوند را عبادت می‌کردند و روزه می‌داشتند، روح‌القدس سخن گفت.'], teaching:'روزه ما را برای مأموریت، خدمت و هدایت آماده‌تر می‌کند. خداوند قلب‌های آماده را در مسیرهای مؤثر به‌کار می‌گیرد.', prayer:'خداوندا، مرا برای خدمت مؤثر، محبت واقعی و شهادت پرقدرت آماده کن.', declaration:'من برای خدمت خداوند آماده می‌شوم و زندگی من شاهد فیض اوست.'},
    {title:'شکرگزاری و حفظ آنچه دریافت شد', verse:['اول تسالونیکیان ۵:۱۸','در هر چیز شکرگزاری کنید، زیرا این است اراده خدا در مسیح عیسی برای شما.'], teaching:'روزه با شکرگزاری حفظ می‌شود. وقتی خداوند چیزی به قلب تو داده است، آن را با شکرگزاری، ایمان و اعلان کلام نگه دار.', prayer:'پدر، برای هر مکاشفه، اصلاح، قوت و هدایت تو شکر می‌کنم.', declaration:'من شکرگزارم و آنچه از خداوند دریافت کرده‌ام با ایمان حفظ می‌کنم.'},
    {title:'ادامه دادن بعد از روزه', verse:['غلاطیان ۶:۹','از نیکوکاری خسته نشویم، زیرا در زمان مناسب درو خواهیم کرد، اگر سست نشویم.'], teaching:'پایان روزه پایان مسیر نیست. بعد از روزه باید در دعا، کلام، پرستش، کلیسا و اطاعت ادامه داد.', prayer:'خداوندا، کمکم کن بعد از این روزه نیز با ثبات و شادی در مسیر تو بمانم.', declaration:'من سست نمی‌شوم. در زمان مناسب ثمر ایمان، دعا و اطاعت را خواهم دید.'}
  ];

  function injectStyle(){
    if($('fastingJourneyStyleV50')) return;
    const st=document.createElement('style'); st.id='fastingJourneyStyleV50'; st.textContent=`
      .fasting-hero{background:linear-gradient(145deg,rgba(16,34,63,.96),rgba(25,70,67,.92));color:#fff;border-radius:26px;padding:24px;margin:14px 0;box-shadow:0 18px 45px rgba(0,0,0,.18)}
      .fasting-hero h1{margin:.2rem 0 .4rem;font-size:1.7rem}.fasting-hero p{opacity:.95;line-height:1.9}.fasting-grid{display:grid;grid-template-columns:1fr;gap:12px;margin:16px 0}.fasting-card,.fasting-action,.fasting-stat{background:#fff;border:1px solid rgba(16,34,63,.08);border-radius:20px;padding:16px;box-shadow:0 10px 28px rgba(16,34,63,.08)}
      .fasting-action{display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;text-align:start}.fasting-action strong{display:block;color:#10223f;font-size:1.05rem}.fasting-action span{color:#6b7280;font-size:.9rem;line-height:1.6}.fasting-action:after{content:'›';font-size:1.7rem;color:#c8a94a}.fa .fasting-action:after{content:'‹'}
      .fasting-pill-row{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.fasting-pill{border:1px solid #e4dac0;background:#fffaf0;border-radius:999px;padding:9px 12px;cursor:pointer}.fasting-pill.active{background:#10223f;color:#fff;border-color:#10223f}.fasting-form label{display:block;margin:12px 0 6px;font-weight:700}.fasting-form input,.fasting-form select,.fasting-form textarea{width:100%;box-sizing:border-box;border:1px solid #dde3ea;border-radius:14px;padding:12px;font:inherit;background:#fff}.fasting-form textarea{min-height:120px;line-height:1.7}.fasting-note{background:#f8fafc;border-right:4px solid #c8a94a;border-radius:16px;padding:14px;line-height:1.9;color:#334155;margin:12px 0}.fasting-health{background:#fff7ed;border:1px solid #fed7aa;color:#7c2d12;border-radius:16px;padding:14px;line-height:1.8;margin:12px 0}.fasting-verse details,.fasting-scripture{background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:12px;margin:8px 0}.fasting-verse summary{cursor:pointer;font-weight:800;color:#10223f}.fasting-dashboard{display:grid;gap:14px}.fasting-progress{height:10px;background:#e5e7eb;border-radius:999px;overflow:hidden}.fasting-progress div{height:100%;background:linear-gradient(90deg,#c8a94a,#6b8f71);border-radius:999px}.fasting-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.fasting-stat strong{display:block;font-size:1.35rem;color:#10223f}.fasting-backline{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}.global-app-back-v50{position:fixed;top:10px;inset-inline-start:10px;z-index:9999;border:0;border-radius:999px;padding:9px 13px;background:rgba(16,34,63,.92);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.22);font:inherit;display:none}.global-app-back-v50.show{display:block}.bottom-nav~.global-app-back-v50{bottom:80px;top:auto}
      @media(min-width:720px){.fasting-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.fasting-stats{grid-template-columns:repeat(4,minmax(0,1fr))}}
    `; document.head.appendChild(st);
  }

  function root(){ return $('plansContent'); }
  function setSelectedPlan(k){ localStorage.setItem(LS_SELECTED,k||''); if(k) localStorage.setItem('selectedPlanKey',k); else localStorage.removeItem('selectedPlanKey'); }
  function getSelectedPlan(){ return localStorage.getItem(LS_SELECTED) || localStorage.getItem('selectedPlanKey') || ''; }
  function setFastView(v){ localStorage.setItem(LS_VIEW,v); renderFasting(); window.scrollTo({top:0,behavior:'smooth'}); }
  function currentFast(){ return getJSON(LS_ACTIVE,null); }
  function saveFast(f){ setJSON(LS_ACTIVE,f); }
  function getNotes(){ return getJSON(LS_NOTES,{}); }
  function saveNotes(n){ setJSON(LS_NOTES,n); }
  function completed(){ return getJSON(LS_HISTORY,[]); }
  function pushCompleted(f){ const a=completed(); a.push(f); setJSON(LS_HISTORY,a); }
  function durationHours(f){ const a=new Date(f.startAt).getTime(), b=new Date(f.endAt).getTime(); return Math.max(0, Math.round((b-a)/36e5)); }
  function dayCount(f){ return Math.max(1, Math.ceil(durationHours(f)/24)); }
  function currentDay(f){ const elapsed=Math.max(0, Date.now()-new Date(f.startAt).getTime()); return Math.min(dayCount(f), Math.max(1, Math.floor(elapsed/86400000)+1)); }
  function remainingText(f){ const end=new Date(f.endAt).getTime(); const diff=end-Date.now(); if(diff<=0) return C('completed'); const h=Math.floor(diff/36e5), m=Math.floor((diff%36e5)/6e4); return `${faDigits(h)} ساعت و ${faDigits(m)} دقیقه`; }
  function versesFor(topic){ return verseBank[topic] || verseBank['روزه و دعا'] || verseBank.default; }
  function dailyFor(f){ const dc=currentDay(f); const base=dayPath[(dc-1)%dayPath.length]; const topicVerse=versesFor(f.topic)[(dc-1)%versesFor(f.topic).length]; return {...base, verse:topicVerse}; }

  function renderFastingHome(){
    const r=root(); if(!r) return;
    r.innerHTML = `
      <div class="fasting-hero"><div class="small">${C('subtitle')}</div><h1>${C('title')}</h1><p>${C('slogan')}</p><p>${C('intro')}</p></div>
      <div class="fasting-card"><strong>${C('pillars')}</strong><div class="fasting-pill-row"><span class="fasting-pill">${C('word')}</span><span class="fasting-pill">${C('prayer')}</span><span class="fasting-pill">${C('meditation')}</span><span class="fasting-pill">${C('revelation')}</span></div></div>
      <div class="fasting-grid">
        <div class="fasting-action" data-fast-view="start"><div><strong>${C('start')}</strong><span>تنظیم نوع، زمان، موضوع و آیات مربوط به روزه</span></div></div>
        <div class="fasting-action" data-fast-view="active"><div><strong>${C('active')}</strong><span>داشبورد روزه فعال، آیه روز، دعا و یادداشت</span></div></div>
        <div class="fasting-action" data-fast-view="journal"><div><strong>${C('journal')}</strong><span>مرور دریافت‌ها، دعاها، آیات و تصمیم‌ها</span></div></div>
        <div class="fasting-action" data-fast-view="stats"><div><strong>${C('stats')}</strong><span>نمایش استمرار شخصی بدون رقابت و غرور مذهبی</span></div></div>
        <div class="fasting-action" data-fast-view="teaching"><div><strong>${C('teaching')}</strong><span>تعلیم کوتاه و روشن درباره روزه مسیحی</span></div></div>
        <div class="fasting-action" data-fast-view="group"><div><strong>${C('group')}</strong><span>روزه‌های مشترک کلیسا، آیات و دعاهای مشترک</span></div></div>
      </div>
      <div class="fasting-backline"><button class="btn light" id="fastBackPlans">${C('back')}</button></div>`;
    bindFastNav();
    $('fastBackPlans')?.addEventListener('click',()=>{setSelectedPlan(''); renderPlans();});
  }

  function renderStart(){
    const today=nowInputDate();
    root().innerHTML=`<div class="fasting-hero"><h1>${C('start')}</h1><p>${C('typeHelp')}</p></div>
    <div class="fasting-health">${C('health')}</div>
    <form class="fasting-card fasting-form" id="fastStartForm">
      <h3>${C('step1')}</h3><label>${C('chooseType')}</label><div class="fasting-pill-row" id="fastTypePills">${fastTypes.map((x,i)=>`<button type="button" class="fasting-pill ${i===0?'active':''}" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div><input type="hidden" name="type" value="${esc(fastTypes[0])}">
      <h3>${C('step2')}</h3><label>${C('startDate')}</label><input name="startDate" type="date" value="${today}"><label>${C('startTime')}</label><input name="startTime" type="time" value="${nowInputTime()}"><label>${C('endDate')}</label><input name="endDate" type="date" value="${today}"><label>${C('endTime')}</label><input name="endTime" type="time" value="18:00"><label><input name="repeat" type="checkbox"> ${C('repeat')}</label><label><input name="reminder" type="checkbox"> ${C('reminder')}</label>
      <h3>${C('step3')}</h3><label>${C('chooseTopic')}</label><select name="topic">${topics.map(x=>`<option>${esc(x)}</option>`).join('')}</select><label>${C('customTopic')}</label><textarea name="customTopic" placeholder="مثلاً: برای هدایت خداوند در مورد کار و خدمت آینده‌ام."></textarea>
      <div class="fasting-note">${C('prepared')}</div><button class="btn primary" type="submit">${C('saveStart')}</button><button class="btn light" type="button" data-fast-view="home">${C('back')}</button>
    </form>`;
    bindFastNav();
    document.querySelectorAll('#fastTypePills .fasting-pill').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#fastTypePills .fasting-pill').forEach(x=>x.classList.remove('active')); b.classList.add('active'); document.querySelector('[name="type"]').value=b.dataset.value;}));
    $('fastStartForm')?.addEventListener('submit',ev=>{
      ev.preventDefault(); const fd=new FormData(ev.currentTarget);
      const topicRaw=fd.get('topic'); const custom=(fd.get('customTopic')||'').trim();
      const f={id:id(), type:fd.get('type'), topic: topicRaw==='موضوع شخصی من' && custom ? custom : topicRaw, topicBase:topicRaw, customTopic:custom, startAt:`${fd.get('startDate')}T${fd.get('startTime')||'00:00'}:00`, endAt:`${fd.get('endDate')}T${fd.get('endTime')||'23:59'}:00`, repeat:!!fd.get('repeat'), reminder:!!fd.get('reminder'), createdAt:new Date().toISOString()};
      if(new Date(f.endAt)<=new Date(f.startAt)){ f.endAt=new Date(new Date(f.startAt).getTime()+6*36e5).toISOString().slice(0,19); }
      saveFast(f); setFastView('active');
    });
  }

  function renderActive(){
    const f=currentFast();
    if(!f){ root().innerHTML=`<div class="fasting-hero"><h1>${C('active')}</h1><p>${C('noActive')}</p></div><button class="btn primary" data-fast-view="start">${C('start')}</button><button class="btn light" data-fast-view="home">${C('back')}</button>`; bindFastNav(); return; }
    const d=dailyFor(f), dc=currentDay(f), days=dayCount(f), progress=Math.min(100,Math.round((dc/days)*100));
    const notes=getNotes(); const noteKey=f.id+'_'+dc; const note=notes[noteKey]||'';
    const verseList=versesFor(f.topicBase||f.topic).map(v=>`<details class="fasting-scripture"><summary>${esc(v[0])} — ${C('openVerse')}</summary><p>${esc(v[1])}</p></details>`).join('');
    root().innerHTML=`<div class="fasting-hero"><h1>${C('currentFast')}</h1><p><strong>موضوع:</strong> ${esc(f.topic)}<br><strong>نوع:</strong> ${esc(f.type)}<br><strong>${C('day')}:</strong> ${faDigits(dc)} ${C('of')} ${faDigits(days)}<br><strong>${C('remaining')}:</strong> ${remainingText(f)}</p><div class="fasting-progress"><div style="width:${progress}%"></div></div></div>
    <div class="fasting-dashboard">
      <div class="fasting-card fasting-verse"><h3>${C('todayVerse')}</h3><details open><summary>${esc(d.verse[0])}</summary><p>${esc(d.verse[1])}</p></details></div>
      <div class="fasting-card"><h3>${C('todayTeaching')}</h3><p>${esc(d.teaching)}</p></div>
      <div class="fasting-card"><h3>${C('todayPrayer')}</h3><p>${esc(d.prayer)}</p></div>
      <div class="fasting-card"><h3>${C('todayDeclaration')}</h3><p><strong>${esc(d.declaration)}</strong></p></div>
      <div class="fasting-card"><h3>آیات مرتبط با موضوع روزه</h3>${verseList}</div>
      <div class="fasting-card fasting-form"><h3>${C('todayJournal')}</h3><p>${C('noteQuestions')}</p><textarea id="fastNoteText">${esc(note)}</textarea><label>${C('spiritualState')}</label><select id="fastState"><option>آرام و متمرکز</option><option>نیازمند قوت</option><option>پر از ایمان</option><option>در حال جنگ روحانی</option><option>شکرگزار</option></select><button class="btn primary" id="saveFastNote">${C('saveNote')}</button><span class="small" id="fastSaveStatus"></span></div>
      <div class="fasting-backline"><button class="btn gold" id="finishFastBtn">${C('finishFast')}</button><button class="btn light" data-fast-view="home">${C('back')}</button></div>
    </div>`;
    bindFastNav();
    $('saveFastNote')?.addEventListener('click',()=>{ const n=getNotes(); n[noteKey]={text:$('fastNoteText').value,state:$('fastState').value,date:new Date().toISOString(),fastId:f.id,day:dc,topic:f.topic}; saveNotes(n); $('fastSaveStatus').textContent=C('saved'); });
    $('finishFastBtn')?.addEventListener('click',()=>setFastView('result'));
  }

  function renderResult(){
    const f=currentFast();
    if(!f){ setFastView('home'); return; }
    root().innerHTML=`<div class="fasting-hero"><h1>آفرین! شما مسیر روزه خود را کامل کردید.</h1><p>شما فقط چند ساعت یا چند روز از غذا دور نشدید؛ بلکه زمانی را برای خداوند جدا کردید. هر لحظه‌ای که در دعا، کلام و حضور خدا گذراندید، در روح شما اثر گذاشته است. اکنون آنچه دریافت کرده‌اید را حفظ کنید، روی کلام بایستید و با ایمان ادامه دهید.</p><details class="fasting-scripture" open><summary>غلاطیان ۶:۹</summary><p>از نیکوکاری خسته نشویم، زیرا در زمان مناسب درو خواهیم کرد، اگر سست نشویم.</p></details></div>
    <div class="fasting-card fasting-form"><h3>${C('resultTitle')}</h3><p>${C('resultHelp')}</p><textarea id="fastResultText"></textarea><button class="btn primary" id="saveFastResult">${C('saveResult')}</button><button class="btn light" data-fast-view="start">${C('newFast')}</button><button class="btn light" data-fast-view="stats">${C('stats')}</button></div>`;
    bindFastNav();
    $('saveFastResult')?.addEventListener('click',()=>{ const results=getJSON(LS_RESULTS,[]); const done={...f, finishedAt:new Date().toISOString(), result:$('fastResultText').value, hours:durationHours(f), days:dayCount(f)}; results.push(done); setJSON(LS_RESULTS,results); pushCompleted(done); localStorage.removeItem(LS_ACTIVE); setFastView('stats'); });
  }

  function renderJournal(){
    const notes=getNotes(); const arr=Object.values(notes).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    root().innerHTML=`<div class="fasting-hero"><h1>${C('journal')}</h1><p>اینجا دریافت‌ها، دعاها، آیات زنده‌شده، تصمیم‌ها و وضعیت‌های روحانی ثبت‌شده شما نمایش داده می‌شود.</p></div>${arr.length?arr.map(n=>`<div class="fasting-card"><strong>${esc(n.topic||'روزه')}</strong><p class="small">${esc((n.date||'').slice(0,10))} — ${C('day')} ${faDigits(n.day||'')}</p><p>${esc(n.text?.text||n.text||'')}</p><p class="small">${esc(n.text?.state||n.state||'')}</p></div>`).join(''):`<div class="fasting-card"><p>هنوز یادداشتی ثبت نشده است.</p></div>`}<button class="btn light" data-fast-view="home">${C('back')}</button>`;
    bindFastNav();
  }

  function renderStats(){
    const done=completed(); const notes=Object.values(getNotes()); const totalHours=done.reduce((s,x)=>s+(x.hours||durationHours(x)),0); const totalDays=done.reduce((s,x)=>s+(x.days||dayCount(x)),0); const longest=done.reduce((m,x)=>Math.max(m,x.hours||durationHours(x)),0); const by={}; done.forEach(x=>{by[x.topic]=(by[x.topic]||0)+1;}); const most=Object.keys(by).sort((a,b)=>by[b]-by[a])[0]||'—';
    root().innerHTML=`<div class="fasting-hero"><h1>${C('stats')}</h1><p>${C('statsNote')}</p></div><div class="fasting-stats"><div class="fasting-stat"><span>${C('totalFasts')}</span><strong>${faDigits(done.length)}</strong></div><div class="fasting-stat"><span>${C('totalHours')}</span><strong>${faDigits(totalHours)}</strong></div><div class="fasting-stat"><span>${C('totalDays')}</span><strong>${faDigits(totalDays)}</strong></div><div class="fasting-stat"><span>${C('notesCount')}</span><strong>${faDigits(notes.length)}</strong></div></div><div class="fasting-card"><p><strong>${C('longest')}:</strong> ${faDigits(longest)} ساعت</p><p><strong>${C('mostTopic')}:</strong> ${esc(most)}</p></div><button class="btn light" data-fast-view="home">${C('back')}</button>`;
    bindFastNav();
  }

  function renderTeaching(){
    root().innerHTML=`<div class="fasting-hero"><h1>${C('teaching')}</h1><p>روزه مسیحی چیست؟</p></div>
    <div class="fasting-card"><p>روزه مسیحی شبیه روزه مذهبی، اجباری یا نمایشی نیست. ما روزه نمی‌گیریم تا خدا را مجبور کنیم کاری انجام دهد. ما روزه نمی‌گیریم تا به خدا ثابت کنیم روحانی هستیم. ما روزه نمی‌گیریم تا دیگران ما را ببینند.</p><p>ما روزه می‌گیریم تا توجه خود را از جسم به روح منتقل کنیم، زمان بیشتری در دعا و کلام خدا بگذرانیم، حساسیت روحانی خود را نسبت به صدای خدا تقویت کنیم، قلب خود را در حضور خداوند متمرکز کنیم، در برابر خواسته‌های جسم روح خود را قوی‌تر کنیم، و برای مأموریت، خدمت، هدایت و مکاشفه آماده‌تر شویم.</p><details class="fasting-scripture" open><summary>متی ۶:۱۶-۱۸</summary><p>عیسی فرمود وقتی روزه می‌گیرید، مثل ریاکاران نباشید. نکته مهم این است که عیسی نگفت «اگر روزه گرفتید»، بلکه گفت «وقتی روزه می‌گیرید». یعنی روزه بخشی از زندگی روحانی ایماندار است، اما نه به شکل مذهبی و نمایشی.</p></details><p>قسمت روزه نباید فقط تایمر باشد؛ باید مثل مربی روحانی شخصی به ایماندار کمک کند که امروز چه بخواند، چگونه دعا کند، روی چه آیه‌ای تعمق کند، چه چیزی بنویسد و بعد از روزه چه قدمی بردارد.</p></div>
    <button class="btn light" data-fast-view="home">${C('back')}</button>`;
    bindFastNav();
  }

  function renderGroup(){
    root().innerHTML=`<div class="fasting-hero"><h1>${C('groupTitle')}</h1><p>${C('groupDesc')}</p></div><div class="fasting-card"><h3>نمونه روزه گروهی</h3><p><strong>موضوع:</strong> بیداری روحانی، نجات جان‌ها و رشد کلیسا</p><p><strong>ساختار:</strong> آیات مشترک، دعای مشترک، اعلان ایمانی مشترک، ثبت شهادت، و یادآوری جلسه دعای آنلاین کلیسا.</p><button class="btn primary" id="joinGroupFast">${C('joinGroup')}</button><p class="small" id="joinGroupStatus"></p></div><div class="fasting-card fasting-form"><h3>${C('testimony')}</h3><p>${C('testimonyHelp')}</p><textarea id="testimonyText"></textarea><select id="testimonyMode"><option>فقط برای خودم ذخیره شود</option><option>با رهبر کلیسا به اشتراک گذاشته شود</option><option>به صورت ناشناس برای تشویق کلیسا منتشر شود</option></select><button class="btn gold" id="saveTestimony">ثبت شهادت</button></div><button class="btn light" data-fast-view="home">${C('back')}</button>`;
    bindFastNav();
    $('joinGroupFast')?.addEventListener('click',()=>{$('joinGroupStatus').textContent='شرکت شما در روزه گروهی ثبت شد.'; localStorage.setItem('fastingGroupJoinedV50','1');});
    $('saveTestimony')?.addEventListener('click',()=>{ const a=getJSON(LS_TESTIMONIES,[]); a.push({text:$('testimonyText').value, mode:$('testimonyMode').value, date:new Date().toISOString()}); setJSON(LS_TESTIMONIES,a); $('testimonyText').value=''; alert('شهادت ذخیره شد.'); });
  }

  function renderFasting(){
    injectStyle();
    const view=localStorage.getItem(LS_VIEW)||'home';
    if(view==='start') return renderStart();
    if(view==='active') return renderActive();
    if(view==='journal') return renderJournal();
    if(view==='stats') return renderStats();
    if(view==='teaching') return renderTeaching();
    if(view==='group') return renderGroup();
    if(view==='result') return renderResult();
    return renderFastingHome();
  }

  function bindFastNav(){
    document.querySelectorAll('[data-fast-view]').forEach(el=>el.addEventListener('click',()=>setFastView(el.dataset.fastView)));
  }

  const originalRenderPlans = window.renderPlans;
  window.renderPlans = function(){
    injectStyle();
    const r=root(); if(!r) return;
    const selected=getSelectedPlan();
    if(selected==='fastingJourney' || selected==='fasting') { localStorage.setItem(LS_SELECTED,'fastingJourney'); return renderFasting(); }
    if(selected){
      const key=selected; const pset=window.teachingPlans && window.teachingPlans[key];
      if(pset){
        const p=pset[lang()]||pset.fa||pset.en; const dayKey='planDay_'+key; let day=parseInt(localStorage.getItem(dayKey)||'1',10); day=Math.max(1,Math.min(day,p.days.length)); const d=p.days[day-1]; const lobj=(o)=>(o&&o[lang()])||o?.fa||o?.en||''; const prog=Math.round((day/p.days.length)*100);
        r.innerHTML=`<div class="hero-card"><button class="btn light" id="backToPlanListTop">${C('back')}</button><h1>${esc(p.title)}</h1><p><strong>${esc(p.subtitle||'')}</strong></p><p>${esc(p.intro||'')}</p><div class="plan-progress"><div style="width:${prog}%"></div></div></div><div class="plan-day-card"><span class="day-label">روز ${faDigits(d.day||day)}</span><h3>${esc(d.title||'')}</h3><div class="plan-section-title">آیات</div>${(d.scriptures||[]).map(s=>`<details class="plan-scripture-expand"><summary>${esc(lobj(s.ref))}</summary><p>${esc(lobj(s.text))}</p></details>`).join('')}<div class="plan-section-title">تعلیم</div><p>${esc(d.devotional||'')}</p><div class="plan-section-title">قدم عملی</div><p>${esc(d.step||'')}</p><div class="plan-section-title">دعا</div><p>${esc(d.prayer||'')}</p><div class="plan-section-title">اعلان ایمانی</div><p><strong>${esc(d.declaration||'')}</strong></p><div class="plan-day-nav"><button class="btn light" id="backToPlans">بازگشت به پلن‌ها</button><button class="btn primary" id="nextPlanDay">${day>=p.days.length?'پایان پلن':'ادامه به روز بعد'}</button></div></div>`;
        const back=()=>{setSelectedPlan(''); window.renderPlans();}; $('backToPlans')?.addEventListener('click',back); $('backToPlanListTop')?.addEventListener('click',back); $('nextPlanDay')?.addEventListener('click',()=>{ if(day<p.days.length){localStorage.setItem(dayKey,String(day+1)); window.renderPlans(); window.scrollTo({top:0,behavior:'smooth'});} else {back();} }); return;
      }
    }
    let html=`<div class="hero-card"><h1>${C('selectPlan')}</h1><p>${C('plansDesc')}</p></div>`;
    html+=`<div class="plan-list-card fasting-plan-list-card" data-plan-key-v50="fastingJourney"><h3>${C('title')}</h3><p>${C('intro')}</p><div class="plan-progress"><div style="width:45%"></div></div><button class="btn gold">${C('startPlan')}</button></div>`;
    if(window.t){
      html+=`<div class="plan-list-card thanksgiving-plan-list-card" data-open-thanksgiving-plan="1"><h3>${window.t('thanksgivingPlan')}</h3><p>${window.t('thanksgivingPlanDesc')}</p><div class="plan-progress"><div style="width:28%"></div></div><button class="btn gold">${window.t('openThanksgivingPlan')}</button></div>`;
    }
    if(window.teachingPlans){ Object.keys(window.teachingPlans).filter(k=>k!=='fasting').forEach(key=>{ const p=(window.teachingPlans[key]&& (window.teachingPlans[key][lang()]||window.teachingPlans[key].fa||window.teachingPlans[key].en)); if(!p) return; html+=`<div class="plan-list-card" data-plan-key-v50="${esc(key)}"><h3>${esc(p.title)}</h3><p>${esc(p.subtitle||p.intro||'')}</p><div class="plan-progress"><div style="width:10%"></div></div><button class="btn primary">${C('startPlan')}</button></div>`; }); }
    r.innerHTML=html;
    r.querySelectorAll('[data-open-thanksgiving-plan]').forEach(card=>card.addEventListener('click',()=>window.showPage?window.showPage('thanksgiving'):null));
    r.querySelectorAll('[data-plan-key-v50]').forEach(card=>card.addEventListener('click',()=>{ setSelectedPlan(card.dataset.planKeyV50); if(card.dataset.planKeyV50==='fastingJourney') localStorage.setItem(LS_VIEW,'home'); window.renderPlans(); }));
  };

  function installBackButton(){
    if($('globalBackV50')) return;
    const btn=document.createElement('button'); btn.id='globalBackV50'; btn.className='global-app-back-v50'; btn.textContent='← '+C('back');
    btn.addEventListener('click',()=>{
      const active=document.querySelector('.page.active');
      if(active && active.id==='plans'){
        if(getSelectedPlan()==='fastingJourney'){ const v=localStorage.getItem(LS_VIEW)||'home'; if(v!=='home'){setFastView('home'); return;} setSelectedPlan(''); window.renderPlans(); return; }
        setSelectedPlan(''); window.renderPlans(); return;
      }
      if(active && active.id!=='home' && window.showPage){ window.showPage('home'); }
      else if(history.length>1) history.back();
    });
    document.body.appendChild(btn);
    const refresh=()=>{ const active=document.querySelector('.page.active'); btn.classList.toggle('show', !!active && active.id!=='home'); };
    setInterval(refresh,800); document.addEventListener('click',()=>setTimeout(refresh,50)); setTimeout(refresh,800);
  }

  document.addEventListener('DOMContentLoaded',()=>{ injectStyle(); installBackButton(); setTimeout(()=>{ if(document.getElementById('plans')?.classList.contains('active')) window.renderPlans(); },250); });
})();
