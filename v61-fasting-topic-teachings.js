/* Omideno7 V61 — Fasting topic teachings + full topic Scripture texts
   Purpose: patch only the Fasting Journey topic area. Does not touch Bible, Audio, Q&A, Notifications, or other app sections. */
(function(){
  'use strict';

  const LS_ACTIVE = 'fastingJourneyActiveV50';
  const root = () => document.getElementById('plansContent');
  const getLang = () => localStorage.getItem('lang') || document.documentElement.lang || 'fa';
  const esc = (v)=>String(v==null?'':v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const getJSON=(k,fb)=>{try{return JSON.parse(localStorage.getItem(k)||'')||fb;}catch(e){return fb;}};

  const UI = {
    fa:{topicTeaching:'تعلیم کوتاه برای این موضوع',topicVerses:'آیات کامل مرتبط با این موضوع',prayer:'دعای کوتاه',declaration:'اعلان ایمانی',open:'برای خواندن آیه کامل باز کنید'},
    en:{topicTeaching:'Short Teaching for This Focus',topicVerses:'Full Scriptures Related to This Focus',prayer:'Short Prayer',declaration:'Faith Declaration',open:'Open to read the full verse'},
    hr:{topicTeaching:'Kratko učenje za ovaj fokus',topicVerses:'Cijeli stihovi povezani s ovim fokusom',prayer:'Kratka molitva',declaration:'Izjava vjere',open:'Otvori za čitanje cijelog stiha'}
  };
  const t=(k)=> (UI[getLang()]||UI.en)[k] || k;

  const TOPICS = {
    hearing: {
      teaching:{
        fa:'وقتی برای شنیدن صدای خدا روزه می‌گیری، هدف این نیست که خدا را مجبور کنی با تو سخن بگوید. خدا پدر توست و روح‌القدس در تو ساکن است. روزه کمک می‌کند صدای نگرانی، عجله، ترس و خواسته‌های جسم آرام‌تر شود تا قلب تو نسبت به هدایت روح‌القدس حساس‌تر گردد. در این مسیر، آیات را فقط نخوان؛ در آن‌ها بمان، دعا کن و هر قدمی را که خدا در قلبت روشن می‌کند با ایمان انجام بده.',
        en:'When you fast to hear God’s voice, the goal is not to force God to speak. God is your Father, and the Holy Spirit lives in you. Fasting helps quiet anxiety, hurry, fear, and the desires of the flesh so your heart becomes more sensitive to the leading of the Holy Spirit. Do not only read these Scriptures; remain in them, pray over them, and obey every step the Lord makes clear in your heart.',
        hr:'Kada postiš kako bi čuo Božji glas, cilj nije prisiliti Boga da govori. Bog je tvoj Otac, a Duh Sveti prebiva u tebi. Post pomaže utišati brigu, žurbu, strah i želje tijela kako bi tvoje srce postalo osjetljivije na vodstvo Duha Svetoga. Nemoj samo pročitati ove stihove; ostani u njima, moli kroz njih i poslušaj svaki korak koji ti Gospodin jasno pokaže.'},
      prayer:{fa:'پدر آسمانی، قلبم را آرام کن و مرا نسبت به صدای روح‌القدس حساس‌تر بساز. کمکم کن هدایت تو را بشنوم و با ایمان اطاعت کنم.',en:'Heavenly Father, quiet my heart and make me more sensitive to the voice of the Holy Spirit. Help me hear Your guidance and obey by faith.',hr:'Nebeski Oče, umiri moje srce i učini me osjetljivijim na glas Duha Svetoga. Pomozi mi čuti tvoje vodstvo i poslušati vjerom.'},
      declaration:{fa:'من فرزند خدا هستم؛ صدای شبان خود را می‌شنوم و از روح خدا هدایت می‌شوم.',en:'I am a child of God; I hear the voice of my Shepherd and I am led by the Spirit of God.',hr:'Ja sam Božje dijete; čujem glas svoga Pastira i vodi me Duh Božji.'},
      verses:{
        fa:[['یوحنا ۱۰:۲۷','گوسفندان من آواز مرا می‌شنوند و من آن‌ها را می‌شناسم و آن‌ها مرا پیروی می‌کنند.'],['رومیان ۸:۱۴','زیرا همه کسانی که از روح خدا هدایت می‌شوند، فرزندان خدا هستند.'],['امثال ۳:۵–۶','به تمامی دل خود بر خداوند توکل نما و بر عقل خود تکیه مکن. در همه راه‌های خود او را بشناس، و او طریق‌هایت را راست خواهد گردانید.'],['اشعیا ۳۰:۲۱','و گوش‌هایت سخنی را از عقب تو خواهد شنید که می‌گوید: راه این است، در آن سلوک نمایید؛ هنگامی که به طرف راست یا چپ می‌گردید.'],['کولسیان ۳:۱۵','و سلامتی خدا در دل‌های شما حکمفرما باشد، که به آن نیز در یک بدن خوانده شده‌اید؛ و شاکر باشید.']],
        en:[['John 10:27','My sheep hear my voice, and I know them, and they follow me.'],['Romans 8:14','For as many as are led by the Spirit of God, they are the sons of God.'],['Proverbs 3:5–6','Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.'],['Isaiah 30:21','And thine ears shall hear a word behind thee, saying, This is the way, walk ye in it, when ye turn to the right hand, and when ye turn to the left.'],['Colossians 3:15','And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.']],
        hr:[['Ivan 10:27','Ovce moje slušaju moj glas, i ja ih poznajem, i one idu za mnom.'],['Rimljanima 8:14','Jer svi koje vodi Duh Božji, oni su sinovi Božji.'],['Izreke 3:5–6','Uzdaj se u GOSPODA svim srcem svojim i ne oslanjaj se na vlastiti razum. Na svim svojim putovima priznaj njega, i on će usmjeriti tvoje staze.'],['Izaija 30:21','I tvoje će uši čuti riječ iza tebe: Ovo je put, idite njime, kad god biste skrenuli nadesno ili nalijevo.'],['Kološanima 3:15','I mir Božji neka vlada u srcima vašim, na koji ste i pozvani u jednom tijelu; i budite zahvalni.']]
      }
    },
    faith: {
      teaching:{fa:'روزه برای تقویت ایمان یعنی قلبت را دوباره با کلام خدا هم‌صدا کنی. ایمان از شنیدن کلام می‌آید، نه از نگاه کردن به شرایط. وقتی در این روزه آیات ایمان را می‌خوانی، اجازه بده کلام خدا در دهان و فکر تو جای ترس، شک و احساس ضعف را بگیرد.',en:'A fast for strengthening faith means bringing your heart back into agreement with the Word of God. Faith comes by hearing the Word, not by looking at circumstances. As you meditate on these Scriptures, let God’s Word replace fear, doubt, and weakness in your thoughts and speech.',hr:'Post za jačanje vjere znači ponovno uskladiti srce s Božjom Riječju. Vjera dolazi slušanjem Riječi, a ne gledanjem okolnosti. Dok razmišljaš o ovim stihovima, dopusti Božjoj Riječi da zamijeni strah, sumnju i slabost u tvojim mislima i govoru.'},
      prayer:{fa:'خداوندا، ایمان مرا با کلامت تقویت کن و کمکم کن بر اساس وعده تو سخن بگویم و عمل کنم.',en:'Lord, strengthen my faith through Your Word and help me speak and act according to Your promise.',hr:'Gospodine, ojačaj moju vjeru svojom Riječju i pomozi mi govoriti i djelovati prema tvome obećanju.'},
      declaration:{fa:'ایمان من از کلام خدا تغذیه می‌شود؛ من به ایمان رفتار می‌کنم نه به دیدن.',en:'My faith is fed by the Word of God; I walk by faith, not by sight.',hr:'Moja se vjera hrani Božjom Riječju; hodim po vjeri, a ne po gledanju.'},
      verses:{fa:[['رومیان ۱۰:۱۷','پس ایمان از شنیدن است و شنیدن از کلام خدا.'],['مرقس ۱۱:۲۳–۲۴','زیرا هرآینه به شما می‌گویم هر که بدین کوه گوید منتقل شده، به دریا افکنده شو، و در دل خود شک نداشته باشد، بلکه ایمان دارد که آنچه گوید به عمل آید، هرآینه هر آنچه گوید بدو عطا شود. بنابراین به شما می‌گویم آنچه در دعا سؤال می‌کنید، ایمان داشته باشید که آن را یافته‌اید و به شما عطا خواهد شد.'],['عبرانیان ۱۱:۱','اما ایمان، اطمینان به چیزهایی است که امید داریم و برهان چیزهایی است که نمی‌بینیم.'],['دوم قرنتیان ۵:۷','زیرا به ایمان رفتار می‌کنیم نه به دیدن.'],['اول یوحنا ۵:۴','زیرا هر که از خدا مولود شده است بر دنیا غلبه می‌یابد؛ و این است غلبه‌ای که دنیا را مغلوب ساخته است، یعنی ایمان ما.']],en:[['Romans 10:17','So then faith cometh by hearing, and hearing by the word of God.'],['Mark 11:23–24','For verily I say unto you, That whosoever shall say unto this mountain, Be thou removed, and be thou cast into the sea; and shall not doubt in his heart, but shall believe... he shall have whatsoever he saith. Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.'],['Hebrews 11:1','Now faith is the substance of things hoped for, the evidence of things not seen.'],['2 Corinthians 5:7','For we walk by faith, not by sight.'],['1 John 5:4','For whatsoever is born of God overcometh the world: and this is the victory that overcometh the world, even our faith.']],hr:[['Rimljanima 10:17','Tako dakle vjera dolazi slušanjem, a slušanje riječju Božjom.'],['Marko 11:23–24','Zaista, kažem vam: tko god rekne ovoj gori: Digni se i baci se u more, i ne posumnja u svome srcu, nego vjeruje da će biti ono što govori, bit će mu. Zato vam kažem: sve što molite i tražite, vjerujte da ste primili, i bit će vam.'],['Hebrejima 11:1','A vjera je pouzdanje u ono čemu se nadamo, dokaz onoga što ne vidimo.'],['2. Korinćanima 5:7','Jer po vjeri hodimo, a ne po gledanju.'],['1. Ivanova 5:4','Jer sve što je rođeno od Boga pobjeđuje svijet; i ovo je pobjeda koja je pobijedila svijet: naša vjera.']]}
    },
    prayer: {
      teaching:{fa:'روزه و دعا با هم قلب انسان را متمرکز می‌کنند. روزه بدون دعا فقط گرسنگی است؛ اما روزه همراه با دعا، کلام و پرستش، روح انسان را برای دریافت هدایت و قوت خداوند آماده می‌کند.',en:'Fasting and prayer together focus the heart. Fasting without prayer is only hunger; fasting with prayer, the Word, and worship prepares the spirit to receive the Lord’s direction and strength.',hr:'Post i molitva zajedno usmjeravaju srce. Post bez molitve samo je glad; post s molitvom, Riječju i štovanjem priprema duh da primi Gospodnje vodstvo i snagu.'},
      prayer:{fa:'پدر، این روزه را به زمان ملاقات، دعا، کلام و اطاعت تبدیل کن.',en:'Father, turn this fast into a time of fellowship, prayer, the Word, and obedience.',hr:'Oče, učini ovaj post vremenom zajedništva, molitve, Riječi i poslušnosti.'},
      declaration:{fa:'روزه من با دعا و کلام همراه است؛ روح من در حضور خداوند قوی می‌شود.',en:'My fast is joined with prayer and the Word; my spirit is strengthened in the presence of the Lord.',hr:'Moj post je povezan s molitvom i Riječju; moj duh jača u Gospodnjoj prisutnosti.'},
      verses:{fa:[['متی ۶:۱۶–۱۸','اما چون روزه می‌گیرید مانند ریاکاران ترش‌رو مباشید، زیرا صورت خود را تغییر می‌دهند تا در نظر مردم روزه‌دار نمایند. هرآینه به شما می‌گویم اجر خود را یافته‌اند. لیکن تو چون روزه می‌گیری، سر خود را تدهین کن و روی خود را بشوی تا در نظر مردم روزه‌دار ننمایی، بلکه در نظر پدر خود که در نهان است؛ و پدر تو که در نهان می‌بیند، تو را آشکارا جزا خواهد داد.'],['متی ۴:۴','او در جواب گفت: مکتوب است انسان نه فقط به نان زیست می‌کند، بلکه به هر کلمه‌ای که از دهان خدا صادر گردد.'],['اعمال ۱۳:۲–۳','چون ایشان در عبادت خداوند و روزه مشغول می‌بودند، روح‌القدس گفت: برنابا و سولس را برای من جدا سازید برای آن عمل که ایشان را بدان خوانده‌ام. آنگاه روزه گرفته، دعا کردند و دست‌ها بر ایشان نهاده، روانه نمودند.'],['اعمال ۱۴:۲۳','و چون در هر کلیسا برای ایشان کشیشان معین کردند، با روزه و دعا ایشان را به خداوندی که بدو ایمان آورده بودند، سپردند.'],['اشعیا ۵۸:۶','آیا روزه‌ای که من برگزیده‌ام این نیست که بندهای شرارت را بگشایید و گره‌های یوغ را باز کنید و مظلومان را آزاد سازید و هر یوغ را بشکنید؟']],en:[['Matthew 6:16–18','Moreover when ye fast, be not, as the hypocrites, of a sad countenance... But thou, when thou fastest, anoint thine head, and wash thy face; that thou appear not unto men to fast, but unto thy Father which is in secret.'],['Matthew 4:4','But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.'],['Acts 13:2–3','As they ministered to the Lord, and fasted, the Holy Ghost said, Separate me Barnabas and Saul... And when they had fasted and prayed, and laid their hands on them, they sent them away.'],['Acts 14:23','And when they had ordained them elders in every church, and had prayed with fasting, they commended them to the Lord.'],['Isaiah 58:6','Is not this the fast that I have chosen? to loose the bands of wickedness, to undo the heavy burdens, and to let the oppressed go free...?']],hr:[['Matej 6:16–18','A kad postite, ne budite namrgođeni kao licemjeri... Nego ti, kad postiš, pomaži svoju glavu i operi svoje lice, da te ne vide ljudi kako postiš, nego Otac tvoj koji je u tajnosti.'],['Matej 4:4','A on odgovori: Pisano je: Neće čovjek živjeti samo o kruhu, nego o svakoj riječi koja izlazi iz Božjih usta.'],['Djela 13:2–3','Dok su služili Gospodinu i postili, Duh Sveti reče: Odvojite mi Barnabu i Savla... Tada su postili i molili, položili ruke na njih i otpustili ih.'],['Djela 14:23','I kad su im u svakoj crkvi postavili starješine, uz molitvu i post povjeriše ih Gospodinu.'],['Izaija 58:6','Nije li ovo post koji sam izabrao: raskinuti okove nepravde, razvezati sveze jarma i pustiti potlačene na slobodu?']]}
    },
    healing: {
      teaching:{fa:'وقتی برای شفا روزه می‌گیری، نگاهت را از بیماری به کلام خدا منتقل کن. شفا در محبت خدا و کار کامل مسیح ریشه دارد. این روزه زمانی است برای دریافت قوت، ایستادن در ایمان و دعا با آرامی و اطمینان.',en:'When you fast for healing, move your focus from sickness to the Word of God. Healing is rooted in God’s love and in the finished work of Christ. This fast is a time to receive strength, stand in faith, and pray with peace and confidence.',hr:'Kada postiš za ozdravljenje, usmjeri pogled s bolesti na Božju Riječ. Ozdravljenje je ukorijenjeno u Božjoj ljubavi i dovršenom Kristovu djelu. Ovaj post je vrijeme za primanje snage, stajanje u vjeri i molitvu s mirom i pouzdanjem.'},
      prayer:{fa:'خداوندا، کلام شفا و حیات تو را دریافت می‌کنم و با ایمان در آرامی تو می‌ایستم.',en:'Lord, I receive Your Word of healing and life, and I stand by faith in Your peace.',hr:'Gospodine, primam tvoju Riječ ozdravljenja i života, i stojim u vjeri u tvome miru.'},
      declaration:{fa:'حیات خدا در من کار می‌کند؛ من در ایمان، سلامتی و قوت خداوند می‌ایستم.',en:'The life of God works in me; I stand in faith, health, and the strength of the Lord.',hr:'Božji život djeluje u meni; stojim u vjeri, zdravlju i Gospodnjoj snazi.'},
      verses:{fa:[['اشعیا ۵۳:۵','و حال آنکه به سبب تقصیرهای ما مجروح و به سبب گناهان ما کوفته گردید؛ و تأدیب سلامتی ما بر وی آمد و از زخم‌های او ما شفا یافتیم.'],['اول پطرس ۲:۲۴','که خود گناهان ما را در بدن خویش بر دار متحمل شد تا از گناه مرده شده، به عدالت زیست نماییم؛ که به زخم‌های او شفا یافته‌اید.'],['مزمور ۱۰۳:۲–۳','ای جان من، خداوند را متبارک بخوان و همه احسان‌های او را فراموش مکن؛ که همه گناهانت را می‌آمرزد و همه مرض‌های تو را شفا می‌بخشد.'],['یعقوب ۵:۱۴–۱۵','آیا کسی از شما مریض است؟ کشیشان کلیسا را طلب کند تا برای او دعا نمایند و او را به نام خداوند به روغن تدهین کنند. و دعای ایمان، مریض را نجات خواهد بخشید و خداوند او را خواهد برخیزانید.'],['مرقس ۵:۳۴','او وی را گفت: ای دختر، ایمانت تو را شفا داده است؛ به سلامتی برو و از بلای خویش رستگار باش.']],en:[['Isaiah 53:5','But he was wounded for our transgressions, he was bruised for our iniquities... and with his stripes we are healed.'],['1 Peter 2:24','Who his own self bare our sins in his own body on the tree... by whose stripes ye were healed.'],['Psalm 103:2–3','Bless the LORD, O my soul, and forget not all his benefits: who forgiveth all thine iniquities; who healeth all thy diseases.'],['James 5:14–15','Is any sick among you? let him call for the elders of the church... And the prayer of faith shall save the sick, and the Lord shall raise him up.'],['Mark 5:34','Daughter, thy faith hath made thee whole; go in peace, and be whole of thy plague.']],hr:[['Izaija 53:5','A on je bio ranjen za naše prijestupe, satrt za naše opačine... i njegovim ranama mi smo iscijeljeni.'],['1. Petrova 2:24','On sam ponese naše grijehe u svome tijelu na drvo... njegovim ste ranama ozdravili.'],['Psalam 103:2–3','Blagoslivljaj GOSPODA, dušo moja, i ne zaboravi sva dobročinstva njegova: on oprašta sve tvoje opačine i iscjeljuje sve tvoje bolesti.'],['Jakovljeva 5:14–15','Boluje li tko među vama? Neka pozove starješine crkve... i molitva vjere spasit će bolesnika, i Gospodin će ga podignuti.'],['Marko 5:34','Kćeri, tvoja te vjera ozdravila; idi u miru i budi zdrava od svoje bolesti.']]}
    },
    default: {
      teaching:{fa:'در هر موضوعی که برای روزه انتخاب می‌کنی، اصل مرکزی این است: قلبت را برای خدا جدا کن، کلام را محور قرار بده، دعا کن و آنچه روح‌القدس به تو نشان می‌دهد با ایمان انجام بده.',en:'Whatever focus you choose for your fast, the central principle is this: set your heart apart for God, make the Word central, pray, and obey by faith what the Holy Spirit shows you.',hr:'Koji god fokus izabereš za post, središnje načelo je ovo: odvoji srce za Boga, stavi Riječ u središte, moli i vjerom poslušaj ono što ti Duh Sveti pokaže.'},
      prayer:{fa:'پدر، این روزه را به زمانی برای تمرکز، کلام، دعا و اطاعت تبدیل کن.',en:'Father, make this fast a time of focus, the Word, prayer, and obedience.',hr:'Oče, učini ovaj post vremenom fokusa, Riječi, molitve i poslušnosti.'},
      declaration:{fa:'من با کلام خدا زندگی می‌کنم و روح من در حضور خداوند قوی می‌شود.',en:'I live by the Word of God, and my spirit is strengthened in the presence of the Lord.',hr:'Živim po Božjoj Riječi i moj duh jača u Gospodnjoj prisutnosti.'},
      verses:{fa:[['متی ۴:۴','او در جواب گفت: مکتوب است انسان نه فقط به نان زیست می‌کند، بلکه به هر کلمه‌ای که از دهان خدا صادر گردد.'],['رومیان ۱۲:۱','پس ای برادران، شما را به رحمت‌های خدا استدعا می‌کنم که بدن‌های خود را قربانی زنده، مقدس و پسندیده خدا بگذرانید که عبادت معقول شماست.'],['غلاطیان ۵:۱۶','اما می‌گویم به روح رفتار کنید تا شهوات جسم را به‌جا نیاورید.']],en:[['Matthew 4:4','Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.'],['Romans 12:1','Present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.'],['Galatians 5:16','Walk in the Spirit, and ye shall not fulfil the lust of the flesh.']],hr:[['Matej 4:4','Neće čovjek živjeti samo o kruhu, nego o svakoj riječi koja izlazi iz Božjih usta.'],['Rimljanima 12:1','Prikažite svoja tijela kao žrtvu živu, svetu, ugodnu Bogu; to je vaše razumno bogoslužje.'],['Galaćanima 5:16','Hodite u Duhu pa nećete udovoljavati požudi tijela.']]}
    }
  };
  TOPICS.guidance = TOPICS.hearing; TOPICS.growth = TOPICS.default; TOPICS.purity = TOPICS.default; TOPICS.family = TOPICS.default; TOPICS.church = TOPICS.prayer; TOPICS.ministry = TOPICS.prayer; TOPICS.evangelism = TOPICS.prayer; TOPICS.thanksgiving = TOPICS.default; TOPICS.fear = TOPICS.faith; TOPICS.temptation = TOPICS.default; TOPICS.revelation = TOPICS.hearing; TOPICS.awakening = TOPICS.prayer;

  function groupFrom(text){
    const s = String(text||'').toLowerCase();
    if(/hearing|voice|hear|guidance|decision|glas|sluš|vodstvo|odluku|شنیدن|صدای|هدایت|تصمیم/.test(s)) return /decision|تصمیم|odluku/.test(s)?'guidance':'hearing';
    if(/faith|vjera|ایمان/.test(s)) return 'faith';
    if(/healing|ozdrav|شفا/.test(s)) return 'healing';
    if(/family|obitelj|خانواده/.test(s)) return 'family';
    if(/church|crk|کلیسا/.test(s)) return 'church';
    if(/ministry|služ|خدمت/.test(s)) return 'ministry';
    if(/salvation|souls|duš|نجات|جان/.test(s)) return 'evangelism';
    if(/purity|consecration|čisto|posve|تقدیس|پاکی/.test(s)) return 'purity';
    if(/fear|strah|ترس/.test(s)) return 'fear';
    if(/temptation|kušnj|وسوسه/.test(s)) return 'temptation';
    if(/revelation|otkriven|مکاشفه/.test(s)) return 'revelation';
    if(/thanksgiving|zahval|شکر/.test(s)) return 'thanksgiving';
    if(/awakening|buđenje|بیداری/.test(s)) return 'awakening';
    if(/pray|prayer|fast|post|molit|دعا|روزه/.test(s)) return 'prayer';
    return 'default';
  }
  function dataFor(type,topic){ return TOPICS[groupFrom((type||'')+' '+(topic||''))] || TOPICS.default; }
  function localized(obj){ return obj[getLang()] || obj.en || obj.fa || obj.hr || ''; }
  function versesFor(type,topic){ const d=dataFor(type,topic); const v=d.verses && (d.verses[getLang()] || d.verses.en || d.verses.fa); return v || TOPICS.default.verses.en; }
  function renderBlock(type,topic,openFirst){
    const d=dataFor(type,topic);
    const verses=versesFor(type,topic).map((v,i)=>`<details class="fasting-scripture v61-full-verse" ${openFirst&&i===0?'open':''}><summary>${esc(v[0])} — ${esc(t('open'))}</summary><p>${esc(v[1])}</p></details>`).join('');
    return `<div class="fasting-card v61-topic-block" id="v61FastingTopicBlock"><h3>${esc(t('topicTeaching'))}</h3><p>${esc(localized(d.teaching))}</p><h3>${esc(t('topicVerses'))}</h3>${verses}<h3>${esc(t('prayer'))}</h3><p>${esc(localized(d.prayer))}</p><h3>${esc(t('declaration'))}</h3><p><strong>${esc(localized(d.declaration))}</strong></p></div>`;
  }
  function selectedTypeTopic(){
    const typeEl=document.getElementById('fastType');
    const topicEl=document.getElementById('fastTopic');
    const customEl=document.getElementById('fastCustomTopic');
    const type=typeEl ? typeEl.value : '';
    const topic=(customEl&&customEl.value.trim()) || (topicEl ? topicEl.value : '');
    return {type,topic};
  }
  function patchStart(){
    const preview=document.getElementById('fastVersesPreview');
    if(!preview) return;
    const update=()=>{ const {type,topic}=selectedTypeTopic(); preview.innerHTML=renderBlock(type,topic,true); };
    if(preview.dataset.v61Bound!=='1'){
      preview.dataset.v61Bound='1';
      ['fastType','fastTopic','fastCustomTopic'].forEach(id=>{
        const el=document.getElementById(id); if(el){ el.addEventListener(id==='fastCustomTopic'?'input':'change',()=>setTimeout(update,0)); }
      });
    }
    update();
  }
  function patchActive(){
    const r=root(); if(!r) return;
    const active=getJSON(LS_ACTIVE,null);
    if(!active || !r.querySelector('.fasting-hero')) return;
    if(document.getElementById('v61FastingTopicBlock')) return;
    const block=document.createElement('div');
    block.innerHTML=renderBlock(active.type,active.topic,true);
    const noteCard=r.querySelector('.fasting-card.fasting-form') || r.querySelector('.fasting-card:last-of-type');
    if(noteCard && noteCard.parentNode) noteCard.parentNode.insertBefore(block.firstElementChild,noteCard);
    else r.appendChild(block.firstElementChild);
  }
  function addStyle(){
    if(document.getElementById('v61FastingStyle')) return;
    const st=document.createElement('style'); st.id='v61FastingStyle';
    st.textContent='.v61-topic-block h3{margin-top:1rem}.v61-topic-block p{line-height:1.9}.v61-full-verse p{white-space:pre-wrap;line-height:1.9}.v61-topic-block{border:1px solid rgba(29,91,79,.18);box-shadow:0 10px 28px rgba(29,91,79,.08)}';
    document.head.appendChild(st);
  }
  function patch(){ addStyle(); patchStart(); patchActive(); }
  const oldRender=window.renderPlans;
  if(typeof oldRender==='function'){
    window.renderPlans=function(){ const res=oldRender.apply(this,arguments); setTimeout(patch,30); return res; };
  }
  document.addEventListener('DOMContentLoaded',()=>{ setTimeout(patch,400); });
  document.addEventListener('change',()=>setTimeout(patch,80));
  document.addEventListener('click',()=>setTimeout(patch,120));
})();
