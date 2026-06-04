
/* Omideno7 V63.61 — New Birth Detail from Excel
   Focused patch only for New Birth & Salvation section.
   It does not change other app sections.
*/
(function(){
'use strict';

var VERSION='V63.61 New Birth Detail Excel';
var EXCEL_SECTIONS={"what": {"title": {"fa": "نجات چیست؟", "en": "What Is Salvation?", "hr": "Što je spasenje?"}, "blocks": [{"type": "intro", "fa": "نجات فقط یک کلمه مذهبی نیست. نجات یعنی تمام برکات نیکویی که مرگ، دفن و رستاخیز خداوند عیسی مسیح برای انسان فراهم کرد. وقتی شخص تولد تازه پیدا می‌کند، وارد این زندگی تازه و این برکات الهی می‌شود.", "en": "Salvation is not merely a religious word. Salvation means all the good blessings that the death, burial, and resurrection of the Lord Jesus Christ made available to humanity. When a person is born again, they enter this new life and these divine blessings.", "hr": "Spasenje nije samo religiozna riječ. Spasenje znači sve dobre blagoslove koje su smrt, pokop i uskrsnuće Gospodina Isusa Krista učinili dostupnima čovjeku. Kada se osoba nanovo rodi, ulazi u taj novi život i u te božanske blagoslove."}, {"type": "body", "fa": "این برکات شامل حیات تازه، بخشش گناهان، سلامت روح و جان، شفای الهی، ذهن سالم، محبت، ایمان، امید و قدرت زندگی در حضور خداست. خدا روح ترس به ما نداده، بلکه روح قوت، محبت و خویشتنداری عطا کرده است.", "en": "These blessings include new life, forgiveness of sins, health in spirit and soul, divine healing, a sound mind, love, faith, hope, and the power to live in God's presence. God has not given us a spirit of fear, but of power, love, and self-control.", "hr": "Ti blagoslovi uključuju novi život, oproštenje grijeha, zdravlje duha i duše, božansko iscjeljenje, zdrav razum, ljubav, vjeru, nadu i snagu da živimo u Božjoj prisutnosti. Bog nam nije dao duha straha, nego duha snage, ljubavi i samokontrole."}, {"type": "body", "fa": "نجات برای همه انسان‌هاست. نجات مخصوص یک قوم، ملت، زبان یا فرهنگ خاص نیست. خدا می‌خواهد همه آدمیان نجات او را ببینند و حقیقت انجیل را بشناسند.", "en": "Salvation is for all people. It does not belong to one specific nation, language, culture, or ethnic group. God wants all people to see His salvation and know the truth of the Gospel.", "hr": "Spasenje je za sve ljude. Ono ne pripada samo jednoj naciji, jeziku, kulturi ili narodu. Bog želi da svi ljudi vide Njegovo spasenje i upoznaju istinu Evanđelja."}, {"type": "scripture", "fa": "لوقا ۳:۴-۶ — «راهی برای خداوند آماده سازید، طریق او را راست نمایید… و همهٔ آدمیان نجات خدا را خواهند دید.»", "en": "Luke 3:4-6 — “Prepare the way of the Lord, make His paths straight… and all flesh shall see the salvation of God.”", "hr": "Luka 3:4-6 — “Pripravite put Gospodinu, poravnite mu staze… i svako će tijelo vidjeti spasenje Božje.”"}, {"type": "body", "fa": "نجات از طریق فیض خدا و ایمان به عیسی مسیح دریافت می‌شود، نه با اعمال مذهبی، نه با شریعت، نه با پول، و نه با تلاش انسانی. هیچ‌کس نمی‌تواند نجات را بخرد یا با کارهای نیک خود آن را به دست آورد. نجات هدیه خداست، اما انسان باید آن را با ایمان بپذیرد.", "en": "Salvation is received by God's grace through faith in Jesus Christ, not by religious works, not by the law, not by money, and not by human effort. No one can buy salvation or earn it by good works. Salvation is God's gift, but a person must receive it by faith.", "hr": "Spasenje se prima Božjom milošću kroz vjeru u Isusa Krista, a ne religioznim djelima, ne zakonom, ne novcem i ne ljudskim trudom. Nitko ne može kupiti spasenje niti ga zaslužiti dobrim djelima. Spasenje je Božji dar, ali ga osoba mora primiti vjerom."}, {"type": "body", "fa": "نجات ابتدا در قلب انسان با ایمان به کار خدا در مسیح آغاز می‌شود و سپس با اعتراف زبان آشکار می‌گردد. ایمان قلبی و اعتراف به خداوندی عیسی، انسان را وارد زندگی تازه می‌کند.", "en": "Salvation begins in the heart through faith in what God has done in Christ, and then it is expressed by confession with the mouth. Heart-faith and confession of Jesus as Lord bring a person into new life.", "hr": "Spasenje započinje u srcu vjerom u ono što je Bog učinio u Kristu, a zatim se izražava priznanjem ustima. Vjera srca i priznanje Isusa kao Gospodina uvode osobu u novi život."}, {"type": "body", "fa": "دعای نجات آغاز راه است، اما زندگی ایمان باید ادامه پیدا کند. شخص نجات‌یافته باید ایمان خود را به عیسی حفظ کند، در کلام خدا بماند و در برابر گمراهی‌ها پایدار بایستد. عیسی فرمود: «هرکس تا آخر پایدار بماند نجات خواهد یافت.»", "en": "The prayer of salvation is the beginning of the journey, but the life of faith must continue. A saved person must keep their faith in Jesus, remain in God's Word, and stand firm against deception. Jesus said, “The one who endures to the end will be saved.”", "hr": "Molitva spasenja je početak puta, ali život vjere mora se nastaviti. Spašena osoba treba čuvati svoju vjeru u Isusa, ostati u Božjoj Riječi i čvrsto stajati protiv zablude. Isus je rekao: “Tko ustraje do kraja, bit će spašen.”"}, {"type": "list_item", "fa": "1. تغییر طرز فکر: شخص نجات‌یافته یاد می‌گیرد مانند مسیح فکر کند و زندگی را از دیدگاه خدا ببیند.", "en": "1. A changed mindset: A saved person learns to think like Christ and see life from God's perspective.", "hr": "1. Promijenjen način razmišljanja: Spašena osoba uči misliti poput Krista i gledati život iz Božje perspektive."}, {"type": "list_item", "fa": "2. آزادی از ترس و بردگی: روح خدا آزادی می‌آورد؛ آزادی از ترس مرگ، خودخواهی و اسارت‌های گذشته.", "en": "2. Freedom from fear and bondage: The Spirit of God brings freedom from the fear of death, selfishness, and past bondages.", "hr": "2. Sloboda od straha i ropstva: Božji Duh donosi slobodu od straha od smrti, sebičnosti i prošlih ropstava."}, {"type": "list_item", "fa": "3. اطاعت‌پذیری: محبت حقیقی به عیسی خودش را در اطاعت از کلام و فرمان‌های او نشان می‌دهد.", "en": "3. Obedience: True love for Jesus is shown through obedience to His Word and His commands.", "hr": "3. Poslušnost: Istinska ljubav prema Isusu pokazuje se poslušnošću Njegovoj Riječi i Njegovim zapovijedima."}, {"type": "list_item", "fa": "4. امید نو: نجات به انسان امیدی تازه می‌دهد؛ امیدی که بر وعده‌های خدا و زندگی ابدی بنا شده است.", "en": "4. New hope: Salvation gives a person new hope, built on God's promises and eternal life.", "hr": "4. Nova nada: Spasenje daje osobi novu nadu, izgrađenu na Božjim obećanjima i vječnom životu."}, {"type": "list_item", "fa": "5. هدف تازه: شخص نجات‌یافته فقط برای خود زندگی نمی‌کند، بلکه می‌خواهد خدا را خشنود سازد.", "en": "5. A new purpose: A saved person no longer lives only for themselves, but desires to please God.", "hr": "5. Nova svrha: Spašena osoba više ne živi samo za sebe, nego želi ugoditi Bogu."}, {"type": "list_item", "fa": "6. محبت به خدا، نه عشق به پول: دل انسان نجات‌یافته به خدا و پادشاهی او بسته می‌شود، نه به حرص و دنیاپرستی.", "en": "6. Love for God, not love of money: The heart of a saved person becomes attached to God and His Kingdom, not to greed or worldliness.", "hr": "6. Ljubav prema Bogu, a ne ljubav prema novcu: Srce spašene osobe veže se uz Boga i Njegovo Kraljevstvo, a ne uz pohlepu ili svjetovnost."}, {"type": "list_item", "fa": "7. قدرت بخشش و گذشت: پادشاهی خدا فقط در حرف نیست؛ قدرت خدا در زندگی شخص دیده می‌شود.", "en": "7. The power to forgive: The Kingdom of God is not only in words; God's power becomes visible in a person's life.", "hr": "7. Snaga opraštanja: Božje Kraljevstvo nije samo u riječima; Božja snaga postaje vidljiva u životu osobe."}, {"type": "list_item", "fa": "8. دل نبستن به دنیا: شخص نجات‌یافته می‌آموزد دنیا و ارزش‌های فاسد آن را جای خدا قرار ندهد.", "en": "8. Detachment from the world: A saved person learns not to put the world and its corrupt values in God's place.", "hr": "8. Odvojenost od svijeta: Spašena osoba uči ne stavljati svijet i njegove pokvarene vrijednosti na Božje mjesto."}, {"type": "list_item", "fa": "9. اعتماد به اینکه خدا می‌شنود: شخص نجات‌یافته با اطمینان دعا می‌کند و می‌داند اگر مطابق اراده خدا بخواهد، خدا می‌شنود.", "en": "9. Confidence that God hears: A saved person prays with assurance, knowing that if they ask according to God's will, He hears.", "hr": "9. Pouzdanje da Bog čuje: Spašena osoba moli s pouzdanjem, znajući da Bog čuje kada tražimo po Njegovoj volji."}, {"type": "list_item", "fa": "10. زندگی تازه بر اساس ملکوت خدا: نجات انسان را از روش‌های بیهوده گذشته آزاد می‌کند و وارد فرهنگ پادشاهی خدا می‌سازد.", "en": "10. A new life based on God's Kingdom: Salvation frees a person from empty old ways and brings them into the culture of God's Kingdom.", "hr": "10. Novi život prema Božjem Kraljevstvu: Spasenje oslobađa osobu od ispraznih starih načina života i uvodi je u kulturu Božjeg Kraljevstva."}, {"type": "list_item", "fa": "11. ایمان بر قدرت خدا، نه فلسفه انسانی: نجات باعث می‌شود ایمان انسان بر قدرت خدا بنا شود، نه بر منطق محدود انسانی.", "en": "11. Faith in God's power, not human philosophy: Salvation causes a person's faith to rest on God's power, not on limited human reasoning.", "hr": "11. Vjera u Božju silu, a ne u ljudsku filozofiju: Spasenje čini da se vjera osobe temelji na Božjoj sili, a ne na ograničenom ljudskom razumu."}, {"type": "list_item", "fa": "12. مشارکت با خدا در تصمیمات: شخص نجات‌یافته می‌آموزد از خدا حکمت، مشورت و هدایت بگیرد.", "en": "12. Partnership with God in decisions: A saved person learns to receive wisdom, counsel, and direction from God.", "hr": "12. Zajedništvo s Bogom u odlukama: Spašena osoba uči primati mudrost, savjet i vodstvo od Boga."}, {"type": "list_item", "fa": "13. شادی نجات: نجات شادی عمیقی در روح انسان ایجاد می‌کند؛ شادی‌ای که از حضور خدا و اطمینان به نجات می‌آید.", "en": "13. The joy of salvation: Salvation produces deep joy in a person's spirit, a joy that comes from God's presence and assurance of salvation.", "hr": "13. Radost spasenja: Spasenje stvara duboku radost u duhu osobe, radost koja dolazi iz Božje prisutnosti i sigurnosti spasenja."}, {"type": "cta", "fa": "اگر می‌خواهید درباره برکات نجات بیشتر بدانید و یاد بگیرید چگونه در آن‌ها زندگی کنید، کلام خدا را مطالعه کنید و در کلاس‌های مدرسه ما ثبت‌نام کنید تا به شناخت عمیق‌تری از خداوند برسید.", "en": "If you want to learn more about the blessings of salvation and how to live in them, study the Word of God and register for our school classes so you can grow in a deeper knowledge of the Lord.", "hr": "Ako želite naučiti više o blagoslovima spasenja i kako živjeti u njima, proučavajte Božju Riječ i prijavite se na nastavu naše škole kako biste rasli u dubljem poznavanju Gospodina."}, {"type": "declaration", "fa": "این کلمات را با صدای بلند تکرار کن:\nمن در تمام نعمت‌های نجات قدم می‌گذارم. زندگی من سرشار از سلامتی، موفقیت، تعالی، آرامش، محبت، ایمان و امید است. من در مسیح زندگی تازه دارم. سپاس خداوند را!", "en": "Repeat these words aloud:\nI walk in all the blessings of salvation. My life is full of health, success, excellence, peace, love, faith, and hope. I have new life in Christ. Praise the Lord!", "hr": "Ponovite ove riječi naglas:\nHodam u svim blagoslovima spasenja. Moj život je pun zdravlja, uspjeha, izvrsnosti, mira, ljubavi, vjere i nade. Imam novi život u Kristu. Slava Gospodinu!"}]}, "life": {"title": {"fa": "زندگی مسیحی چیست؟", "en": "What Is the Christian Life?", "hr": "Što je kršćanski život?"}, "blocks": [{"type": "intro", "fa": "زندگی مسیحی فقط پیروی از یک مذهب یا انجام مراسم مذهبی نیست. زندگی مسیحی یک رابطه زنده و شخصی با عیسی مسیح است. وقتی شخص عیسی را به عنوان خداوند و نجات‌دهنده خود می‌پذیرد، زندگی جدیدی را آغاز می‌کند که کتاب‌مقدس آن را «تولد تازه» می‌نامد.", "en": "The Christian life is not merely following a religion or performing religious rituals. It is a living and personal relationship with Jesus Christ. When a person receives Jesus as Lord and Savior, a new life begins, which the Bible calls being “born again.”", "hr": "Kršćanski život nije samo slijeđenje religije ili obavljanje vjerskih obreda. To je živ i osoban odnos s Isusom Kristom. Kada osoba prihvati Isusa kao Gospodina i Spasitelja, započinje novi život koji Biblija naziva “novim rođenjem”."}, {"type": "list_item", "fa": "1. مسیحیت یک رابطه است، نه یک مذهب. خدا شما را دعوت کرده است که او را بشناسید، با او صحبت کنید و هر روز با او راه بروید.", "en": "1. Christianity is a relationship, not a religion. God invites you to know Him, talk with Him, and walk with Him every day.", "hr": "1. Kršćanstvo je odnos, a ne religija. Bog vas poziva da Ga upoznate, razgovarate s Njim i hodate s Njim svaki dan."}, {"type": "list_item", "fa": "2. شما در مسیح هویت جدیدی دارید. گذشته شما تعیین‌کننده آینده شما نیست. خدا شما را فرزند خود ساخته است.", "en": "2. You have a new identity in Christ. Your past does not determine your future. God has made you His child.", "hr": "2. Imate novi identitet u Kristu. Vaša prošlost ne određuje vašu budućnost. Bog vas je učinio svojim djetetom."}, {"type": "list_item", "fa": "3. خداوند از طریق کلام خود با شما سخن می‌گوید. مطالعه روزانه کتاب‌مقدس به شما کمک می‌کند اراده خدا را بشناسید و در ایمان رشد کنید.", "en": "3. The Lord speaks to you through His Word. Daily Bible reading helps you know God's will and grow in faith.", "hr": "3. Gospodin vam govori kroz svoju Riječ. Svakodnevno čitanje Biblije pomaže vam upoznati Božju volju i rasti u vjeri."}, {"type": "list_item", "fa": "4. دعا گفت‌وگو با خداست. لازم نیست دعا پیچیده باشد؛ با خدا مانند پدری مهربان صحبت کنید.", "en": "4. Prayer is communication with God. It does not need to be complicated; speak to God as a loving Father.", "hr": "4. Molitva je razgovor s Bogom. Ne mora biti komplicirana; razgovarajte s Bogom kao s Ocem punim ljubavi."}, {"type": "list_item", "fa": "5. روح‌القدس در شما ساکن است تا شما را هدایت، تقویت و تعلیم دهد. شما در این مسیر تنها نیستید.", "en": "5. The Holy Spirit lives in you to guide, strengthen, and teach you. You are not alone on this journey.", "hr": "5. Duh Sveti prebiva u vama kako bi vas vodio, jačao i poučavao. Niste sami na ovom putu."}, {"type": "list_item", "fa": "6. زندگی مسیحی یعنی رشد مداوم. خدا شما را هر روز بیشتر شبیه عیسی می‌سازد و شخصیت شما را تغییر می‌دهد.", "en": "6. The Christian life is a journey of growth. God is transforming you day by day to become more like Jesus.", "hr": "6. Kršćanski život je put rasta. Bog vas iz dana u dan mijenja kako biste bili sve sličniji Isusu."}, {"type": "body", "fa": "شما برای یک زندگی پیروزمند، پر از امید، محبت و هدف آفریده شده‌اید. با عیسی راه بروید، به کلام خدا اعتماد کنید و اجازه دهید او زندگی شما را هدایت کند.", "en": "You were created for a victorious life filled with hope, love, and purpose. Walk with Jesus, trust God's Word, and let Him lead your life.", "hr": "Stvoreni ste za pobjednički život ispunjen nadom, ljubavlju i svrhom. Hodajte s Isusom, vjerujte Božjoj Riječi i dopustite Mu da vodi vaš život."}]}};

function isBeta(){
  return /beta\.html/i.test(location.pathname) || /v=6361|v=6360|v=6359|v=6358/i.test(location.search);
}
if(!isBeta()) return;

function norm(v){
  v=String(v||'').toLowerCase().trim();
  if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1)return'en';
  if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1)return'hr';
  return'fa';
}
function lang(){try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa')}catch(e){return'fa'}}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function currentData(){return window.newBirthContentData||{}}
function T(k){
  var fa={
    pageTitle:'تولد تازه و نجات در مسیح',
    subtitle:'این بخش برای کسانی است که می‌خواهند نجات را بشناسند، دعای نجات را با ایمان بخوانند، درباره زندگی مسیحی یاد بگیرند، ثبت‌نام کنند و تعالیم تولد تازه را ببینند.',
    what:'نجات چیست؟',
    prayer:'دعای نجات',
    life:'زندگی مسیحی چیست؟',
    register:'ثبت‌نام و عضویت',
    videos:'ویدیوهای تعلیم تولد تازه',
    open:'باز کردن',
    back:'بازگشت',
    close:'بستن',
    videoIntro:'برای اینکه ایمان شما از ابتدا بر پایه صحیح بنا شود، این شش تعلیم را به ترتیب ببینید و از مطالب آن‌ها نت‌برداری کنید.',
    registerIntro:'برای ثبت‌نام و عضویت در کلیسای امیدنو۷، فرم ثبت‌نام را کامل کنید. پس از بررسی، تیم خدمتی با شما ارتباط خواهد گرفت.',
    openRegister:'باز کردن فرم ثبت‌نام',
    prayerIntro:'اگر می‌خواهید عیسی مسیح را به عنوان خداوند و نجات‌دهنده زندگی خود بپذیرید، این دعا را با ایمان، از قلب خود و با صدای بلند بخوانید.'
  };
  var en={
    pageTitle:'New Birth & Salvation in Christ',
    subtitle:'This section is for those who want to understand salvation, pray the prayer of salvation with faith, learn about the Christian life, register, and watch the New Birth teachings.',
    what:'What Is Salvation?',
    prayer:'Prayer of Salvation',
    life:'What Is the Christian Life?',
    register:'Registration & Membership',
    videos:'New Birth Teaching Videos',
    open:'Open',
    back:'Back',
    close:'Close',
    videoIntro:'To build your faith on the right foundation from the beginning, watch these six teachings in order and take notes from them.',
    registerIntro:'To register and become connected with OmideNo7 Church, complete the registration form. After review, the ministry team will contact you.',
    openRegister:'Open registration form',
    prayerIntro:'If you want to receive Jesus Christ as the Lord and Savior of your life, read this prayer with faith, from your heart, and out loud.'
  };
  var hr={
    pageTitle:'Novo rođenje i spasenje u Kristu',
    subtitle:'Ovaj odjeljak je za one koji žele razumjeti spasenje, moliti molitvu spasenja s vjerom, učiti o kršćanskom životu, registrirati se i pogledati učenja o novom rođenju.',
    what:'Što je spasenje?',
    prayer:'Molitva spasenja',
    life:'Što je kršćanski život?',
    register:'Registracija i članstvo',
    videos:'Video učenja o novom rođenju',
    open:'Otvori',
    back:'Natrag',
    close:'Zatvori',
    videoIntro:'Kako bi vaša vjera od početka bila izgrađena na ispravnom temelju, pogledajte ovih šest učenja redom i zapišite bilješke.',
    registerIntro:'Za registraciju i povezivanje s Crkvom OmideNo7 ispunite registracijski obrazac. Nakon pregleda, službeni tim će vas kontaktirati.',
    openRegister:'Otvori registracijski obrazac',
    prayerIntro:'Ako želite primiti Isusa Krista kao Gospodina i Spasitelja svoga života, pročitajte ovu molitvu s vjerom, iz srca i naglas.'
  };
  var l=lang(); return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
}
function css(){
  if(document.getElementById('v6361Css'))return;
  var st=document.createElement('style'); st.id='v6361Css';
  st.textContent=[
    '#v6361NewBirthPage{padding:18px 16px 110px;max-width:980px;margin:0 auto;}',
    '#v6361NewBirthPage .v6361-back{display:inline-flex;align-items:center;gap:6px;border:0;border-radius:999px;background:#fff;color:#24304F;font-weight:900;padding:9px 14px;margin:4px 0 18px;box-shadow:0 5px 16px rgba(6,20,109,.08);cursor:pointer;}',
    '#v6361NewBirthPage h1{font-size:clamp(26px,5vw,38px);line-height:1.25;color:#06146D;margin:0 0 20px;font-weight:950;text-align:right;}',
    '#v6361NewBirthPage .hero{border-top:6px solid #00B91F;background:#fff;border-radius:24px;padding:22px;box-shadow:0 12px 34px rgba(6,20,109,.08);margin-bottom:18px;}',
    '#v6361NewBirthPage .hero h2{font-size:clamp(23px,4.5vw,34px);line-height:1.25;color:#06146D;margin:0 0 12px;font-weight:950;}',
    '#v6361NewBirthPage .hero p{font-size:16px;line-height:2;color:#24304F;font-weight:800;margin:0;}',
    '.v6361-list{display:grid;gap:12px;}',
    '.v6361-row{background:#fff;border-radius:18px;min-height:72px;padding:12px 14px;box-shadow:0 8px 22px rgba(6,20,109,.06);display:grid;grid-template-columns:1fr auto;align-items:center;border:1px solid rgba(6,20,109,.06);}',
    '.v6361-row-title{font-size:19px;color:#06146D;font-weight:950;line-height:1.45;}',
    '.v6361-open{border:0;border-radius:999px;background:#00B91F;color:#fff;font-weight:950;padding:11px 18px;min-width:96px;cursor:pointer;box-shadow:0 7px 18px rgba(0,185,31,.24);}',
    '.v6361-modal{position:fixed;inset:0;z-index:1000000;background:rgba(2,8,23,.48);backdrop-filter:blur(2px);padding:16px;display:flex;align-items:center;justify-content:center;}',
    '.v6361-box{width:min(94vw,900px);max-height:90vh;overflow:auto;background:#fff;border-radius:26px;border-top:6px solid #00B91F;box-shadow:0 28px 90px rgba(0,0,0,.35);padding:22px;}',
    '.v6361-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px;}',
    '.v6361-head h2{margin:0;color:#06146D;font-size:26px;font-weight:950;line-height:1.25;}',
    '.v6361-x{border:0;background:#f1f5f9;color:#24304F;border-radius:999px;width:36px;height:36px;font-size:26px;line-height:1;cursor:pointer;flex:0 0 auto;}',
    '.v6361-content p{background:#f8fbff;border:1px solid #dbe3ef;border-radius:16px;padding:13px 14px;margin:10px 0;line-height:2;color:#24304F;font-weight:750;white-space:pre-line;}',
    '.v6361-content p.scripture{border-color:#fde68a;background:#fffaf0;color:#7c4a03;}',
    '.v6361-content p.declaration{border-color:#bbf7d0;background:#f0fdf4;color:#065f23;font-weight:900;}',
    '.v6361-video{display:block;margin:10px 0;padding:13px 14px;border-radius:16px;background:#eef4ff;color:#06146D;text-decoration:none;font-weight:950;border:1px solid #dbe3ef;}',
    '.v6361-register-btn{display:inline-flex;border:0;border-radius:999px;background:#00B91F;color:#fff;font-weight:950;padding:13px 18px;margin-top:10px;text-decoration:none;cursor:pointer;}',
    '.fa #v6361NewBirthPage,.fa .v6361-box{direction:rtl;text-align:right;}',
    '.fa .v6361-row{grid-template-columns:auto 1fr;}',
    '.fa .v6361-open{grid-column:1;grid-row:1}.fa .v6361-row-title{grid-column:2;grid-row:1;text-align:right;}',
    '@media(max-width:520px){.v6361-row{grid-template-columns:1fr;gap:10px}.fa .v6361-row{grid-template-columns:1fr}.fa .v6361-open,.fa .v6361-row-title{grid-column:auto;grid-row:auto}.v6361-open{width:max-content}.v6361-row-title{font-size:18px}}'
  ].join('\n');
  document.head.appendChild(st);
}
function ensurePage(){
  var page=document.getElementById('v6361NewBirthPage');
  if(page)return page;
  page=document.createElement('section');
  page.id='v6361NewBirthPage';
  page.className='page';
  var main=document.querySelector('main')||document.body;
  main.appendChild(page);
  return page;
}
function setActivePage(page){
  document.querySelectorAll('main .page,.page').forEach(function(p){p.classList.remove('active')});
  page.classList.add('active');
  try{location.hash='new-birth'}catch(e){}
}
function backHome(){
  var page=document.getElementById('v6361NewBirthPage');
  if(page)page.classList.remove('active');
  var home=document.getElementById('home');
  if(home)home.classList.add('active');
  document.querySelectorAll('.bottom-nav button,nav button,[data-page],[data-tab]').forEach(function(b){
    var tx=(b.textContent||'')+' '+(b.getAttribute('data-page')||'')+' '+(b.getAttribute('data-tab')||'');
    b.classList.toggle('active',/خانه|Home|Početna|home/i.test(tx));
  });
}
function renderPage(){
  css();
  var page=ensurePage();
  page.innerHTML='<button class="v6361-back" id="v6361Back">← '+esc(T('back'))+'</button><h1>'+esc(T('pageTitle'))+'</h1><div class="hero"><h2>'+esc(T('pageTitle'))+'</h2><p>'+esc(T('subtitle'))+'</p></div><div class="v6361-list">'+
    rowHtml('what',T('what'))+
    rowHtml('prayer',T('prayer'))+
    rowHtml('life',T('life'))+
    rowHtml('register',T('register'))+
    rowHtml('videos',T('videos'))+
  '</div>';
  document.getElementById('v6361Back').onclick=backHome;
  page.querySelectorAll('[data-v6361-open]').forEach(function(btn){
    btn.onclick=function(e){
      e.preventDefault();
      var id=btn.getAttribute('data-v6361-open');
      openItem(id);
      return false;
    };
  });
  setActivePage(page);
}
function rowHtml(id,title){
  return '<div class="v6361-row"><div class="v6361-row-title">'+esc(title)+'</div><button class="v6361-open" data-v6361-open="'+esc(id)+'">'+esc(T('open'))+'</button></div>';
}
function blocksFromExcel(id){
  var l=lang();
  var s=EXCEL_SECTIONS[id];
  if(!s)return null;
  return {title:(s.title&&s.title[l])||T(id), blocks:(s.blocks||[]).map(function(b){return {type:b.type, text:b[l]||b.fa||''}}).filter(function(b){return b.text})};
}
function fallbackSection(id){
  var l=lang();
  var d=currentData();
  var langData=d[l]||d.fa||{};
  var sec=(langData.sections||[]).find(function(s){return s.id===id});
  if(sec){
    return {title:sec.title||T(id), intro:sec.intro||'', content:sec.content||[], videosTitle:sec.videosTitle||''};
  }
  return null;
}
function openItem(id){
  if(id==='what'||id==='life'){
    var s=blocksFromExcel(id);
    if(s){
      var body=s.blocks.map(function(b){
        var cls=(b.type==='scripture')?' scripture':(b.type==='declaration'?' declaration':'');
        return '<p class="'+cls.trim()+'">'+esc(b.text)+'</p>';
      }).join('');
      return showModal(s.title,'<div class="v6361-content">'+body+'</div>');
    }
  }
  if(id==='prayer'){
    var p=fallbackSection('prayer');
    var parts=[];
    if(p&&p.intro)parts.push('<p><strong>'+esc(p.intro)+'</strong></p>');
    ((p&&p.content)||getPrayerFallback()).forEach(function(x){parts.push('<p>'+esc(x)+'</p>')});
    return showModal((p&&p.title)||T('prayer'),'<div class="v6361-content">'+parts.join('')+'</div>');
  }
  if(id==='videos'){
    var d=currentData();
    var videos=d.videos||[];
    var html='<div class="v6361-content"><p>'+esc(T('videoIntro'))+'</p>';
    videos.forEach(function(v){
      var title=(v[0]&&v[0][lang()])||(v[0]&&v[0].fa)||'Video';
      html+='<a class="v6361-video" target="_blank" rel="noopener" href="'+esc(v[1])+'">▶ '+esc(title)+'</a>';
    });
    html+='</div>';
    return showModal(T('videos'),html);
  }
  if(id==='register'){
    return openRegistration();
  }
}
function getPrayerFallback(){
  var l=lang();
  var fa=['خداوندا، امروز با ایمان و قلبی باز نزد تو می‌آیم.','ایمان دارم که عیسی مسیح پسر خداست؛ او برای گناهان من بر صلیب مرد، دفن شد و در روز سوم از مردگان برخاست.','من با قلب خود ایمان می‌آورم و با زبان خود اعتراف می‌کنم که عیسی مسیح خداوند زندگی من است.','ای عیسی مسیح، تو را به عنوان خداوند و نجات‌دهنده خود می‌پذیرم. وارد قلب من شو، مرا ببخش، مرا پاک کن و مرا از نو متولد ساز.','از امروز اعلام می‌کنم که نجات یافته‌ام، فرزند خدا هستم و حیات جاودانی را در مسیح دریافت کرده‌ام.','در نام عیسی مسیح. آمین.'];
  var en=['Lord God, today I come to You with faith and an open heart.','I believe that Jesus Christ is the Son of God; He died on the cross for my sins, was buried, and rose from the dead on the third day.','I believe in my heart and confess with my mouth that Jesus Christ is the Lord of my life.','Lord Jesus, I receive You as my Lord and Savior. Come into my heart, forgive me, cleanse me, and cause me to be born again.','From today I declare that I am saved, I am a child of God, and I have received eternal life in Christ.','In the name of Jesus Christ. Amen.'];
  var hr=['Gospodine Bože, danas dolazim k Tebi s vjerom i otvorenim srcem.','Vjerujem da je Isus Krist Sin Božji; umro je na križu za moje grijehe, bio pokopan i treći dan uskrsnuo od mrtvih.','Vjerujem u svom srcu i priznajem svojim ustima da je Isus Krist Gospodin moga života.','Gospodine Isuse, primam Te kao svoga Gospodina i Spasitelja. Uđi u moje srce, oprosti mi, očisti me i učini da budem nanovo rođen.','Od danas izjavljujem da sam spašen, dijete Božje i da sam primio vječni život u Kristu.','U ime Isusa Krista. Amen.'];
  return l==='hr'?hr:(l==='en'?en:fa);
}
function showModal(title,body){
  closeModal();
  var m=document.createElement('div');
  m.id='v6361Modal';
  m.className='v6361-modal';
  m.innerHTML='<div class="v6361-box"><div class="v6361-head"><h2>'+esc(title)+'</h2><button class="v6361-x">×</button></div>'+body+'<button class="v6361-register-btn" id="v6361Close">'+esc(T('close'))+'</button></div>';
  document.body.appendChild(m);
  m.addEventListener('click',function(e){if(e.target===m)closeModal()});
  m.querySelector('.v6361-x').onclick=closeModal;
  document.getElementById('v6361Close').onclick=closeModal;
}
function closeModal(){var m=document.getElementById('v6361Modal');if(m)m.remove();}
function openRegistration(){
  if(window.OMIDENO7_V6349_REGISTRATION_BETA&&typeof window.OMIDENO7_V6349_REGISTRATION_BETA.openForm==='function'){
    window.OMIDENO7_V6349_REGISTRATION_BETA.openForm();
    return;
  }
  var body='<div class="v6361-content"><p>'+esc(T('registerIntro'))+'</p></div>';
  showModal(T('register'),body);
}
function isNewBirthText(tx){
  return /تولد تازه|نجات در مسیح|New Birth|Salvation in Christ|Novo rođenje|spasenje u Kristu|Trebam spasenje|Need Salvation|نیاز به نجات/i.test(tx||'');
}
function interceptClicks(){
  document.addEventListener('click',function(e){
    var t=e.target;
    var el=t.closest&&t.closest('button,a,.card,.feature-card,[role="button"]');
    if(!el)return;
    if(el.closest('#v6361NewBirthPage')||el.closest('#v6361Modal')||el.closest('#v6349Modal'))return;
    var tx=(el.textContent||'').trim();
    var card=el.closest&&el.closest('#v6358NewBirthCard,#v6357NewBirthCard,#v6356NewBirthCard,#v6351NewBirthCard,.feature-card,.card');
    var cardTx=card?(card.textContent||''):'';
    if(isNewBirthText(tx)||isNewBirthText(cardTx)){
      // Do not hijack language buttons or bottom nav school/home etc.
      if(/ثبت اعلان|Faith Declaration|اعلان/i.test(tx))return;
      e.preventDefault();
      e.stopPropagation();
      renderPage();
      return false;
    }
  },true);
}
function patchExistingCard(){
  // Make the home card open the detail page instead of going straight to registration.
  var nodes=Array.prototype.slice.call(document.querySelectorAll('#home .card,#home .feature-card'));
  nodes.forEach(function(c){
    if(isNewBirthText(c.textContent||'')){
      c.style.cursor='pointer';
      if(!c.dataset.v6361bound){
        c.dataset.v6361bound='1';
        c.addEventListener('click',function(e){
          if(e.target.closest&&e.target.closest('[data-v6361-open]'))return;
          e.preventDefault(); e.stopPropagation(); renderPage();
        },true);
      }
    }
  });
}
function render(){
  css();
  patchExistingCard();
}
document.addEventListener('DOMContentLoaded',function(){render();interceptClicks();});
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(patchExistingCard,100)},true);
setTimeout(render,500);setTimeout(render,1500);setInterval(patchExistingCard,1800);
window.OMIDENO7_V6361_NEWBIRTH_DETAIL={render:render,open:renderPage,version:VERSION};
})();
