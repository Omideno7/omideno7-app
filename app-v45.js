/* V45 plan-start patch: one-year Bible reading plan starts at Day 1 per user/device. Replace only this file: app-v45.js */

window.addEventListener('error', function(e){
 console.error('APP ERROR', e.message, e.filename, e.lineno);
});


(function(){
 try{
  if('serviceWorker' in navigator){
    navigator.serviceWorker.getRegistrations().then(regs=>regs.forEach(r=>{ try{ r.unregister(); }catch(e){} }));
  }
  if(window.caches){
    caches.keys().then(keys=>keys.forEach(k=>caches.delete(k)));
  }
 }catch(e){}
})();


(function(){
 try{
  const params=new URLSearchParams(location.search);
  if(params.get('reset')==='1'){
    localStorage.removeItem('bibleReaderView');
    localStorage.removeItem('bibleSection');
    localStorage.removeItem('selectedPlanKey');
  }
 }catch(e){}
})();


(function(){
 try{
  
  if(window.caches){
    caches.keys().then(keys=>keys.forEach(k=>{ if(String(k).includes('omideno7')) caches.delete(k); }));
  }
 }catch(e){}
})();

/* V42 global fallback click handler */

document.addEventListener('click', function(ev){
 const sectionBtn = ev.target.closest && ev.target.closest('[data-bible-section]');
 if(sectionBtn){ ev.preventDefault(); ev.stopPropagation(); setBibleSection(sectionBtn.dataset.bibleSection); return; }
 const bookBtn = ev.target.closest && ev.target.closest('[data-bible-book]');
 if(bookBtn){ ev.preventDefault(); ev.stopPropagation(); openBibleBook(bookBtn.dataset.bibleBook); return; }
 const planBtn = ev.target.closest && ev.target.closest('[data-reading-plan]');
 if(planBtn){ ev.preventDefault(); ev.stopPropagation(); openReadingPlan(planBtn.dataset.readingPlan); return; }
 const thanksgivingPlanBtn = ev.target.closest && ev.target.closest('[data-open-thanksgiving-plan]');
 if(thanksgivingPlanBtn){ ev.preventDefault(); ev.stopPropagation(); showPage('thanksgiving'); return; }
 const viewBtn = ev.target.closest && ev.target.closest('[data-bible-view]');
 if(viewBtn){ ev.preventDefault(); ev.stopPropagation(); setBibleReaderView(viewBtn.dataset.bibleView); return; }
}, false);


// V45: Persian digit helper restored
function toFaDigits(value){
 const map = {'0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹'};
 return String(value ?? '').replace(/[0-9]/g, d => map[d] || d);
}
window.toFaDigits = toFaDigits;

const APP_VERSION = "V45-plan-start";

const ONESIGNAL_APP_ID = "33aa00cc-1a85-42bf-9f68-949d81f37620";
const translations = {"en":{"appTitle":"Omid No 7 Church","appSubtitle":"Daily Word. Prayer. Faith.","homeTitle":"Welcome to Omid No 7 Church","homeDesc":"An online Christian church based in Zagreb, Croatia, committed to teaching God’s Word, prayer, discipleship, and equipping believers for God’s Kingdom.","todayWordTitle":"Today’s Daily Word","openWord":"Open Daily Word","plansTitle":"Plans","plansDesc":"Bible-style teaching plans for daily growth.","openPlans":"Open Plans","bibleTitle":"Bible","bibleDesc":"Open the Bible and continue reading God’s Word.","openBible":"Open Bible","declarationsTitle":"Faith Declarations","declarationsDesc":"Speak God’s Word with faith over your finances, health, and success.","openDeclarations":"Open Declarations","joinMeeting":"Join Online Meeting","enableNotifications":"Enable Notifications","notificationInfo":"Receive Daily Word and meeting reminders on your phone.","notificationReady":"Notification request started. If your device asks for permission, tap Allow.","notificationUnsupported":"Notifications are not supported here. On iPhone, install the app to Home Screen and open it from the app icon.","notificationDenied":"Notifications are blocked. Please allow them in your phone settings.","notificationEnabled":"Notifications are enabled.","morningPrayer":"Daily Morning Prayer","sundayService":"Sunday Church Service","croatiaTime":"Croatia time","meetingsTitle":"Online Meetings","meetingsDesc":"Join our online meetings through FreeConferenceCall.","scheduleTitle":"Weekly Schedule","callToJoin":"Call to Join","newBirthTitle":"New Birth & Salvation in Christ","newBirthQuestion":"Have you received the New Birth?","newBirthP1":"New birth is the beginning of a new life in Christ. Christianity is receiving the life of God in the human spirit.","newBirthP2":"Salvation is received by faith in Jesus Christ, who died for our sins and rose again so that everyone who believes in Him may have eternal life.","prayerTitle":"Prayer of Salvation","prayerIntro":"Read this prayer out loud with faith:","salvationPrayer":"Lord God, I believe Jesus Christ is the Son of God. I receive Him as my Lord and Savior. I am saved, born again, and a child of God. Amen.","registerAfterPrayer":"I prayed this prayer / Register","relatedVersesTitle":"Related Scriptures","relatedVersesDesc":"Tap each beautiful scripture button to open the verse.","john33Ref":"John 3:3","john33Text":"Unless one is born again, he cannot see the kingdom of God.","john316Ref":"John 3:16","john316Text":"For God so loved the world that He gave His only Son, that whoever believes in Him should not perish but have eternal life.","romans109Ref":"Romans 10:9–10","romans109Text":"If you confess with your mouth that Jesus is Lord and believe in your heart that God raised Him from the dead, you will be saved.","romans1013Ref":"Romans 10:13","romans1013Text":"Whoever calls on the name of the Lord shall be saved.","romans1017Ref":"Romans 10:17","romans1017Text":"Faith comes by hearing, and hearing by the Word of God.","moreTitle":"More","membershipTitle":"Membership","membershipDesc":"To join, request prayer, or contact us, please complete the form below.","visionTitle":"Our Vision","visionDesc":"The vision of Omideno7 Church is to raise, disciple, and strengthen believers in the truth of God’s Word. We exist to help people know Jesus Christ, receive the new birth, grow in faith, discover their identity in Christ, and walk in the guidance of the Holy Spirit. Our vision is to build a living spiritual family where believers are taught, trained, healed, strengthened, and equipped for ministry, prayer, holiness, love, service, and effective witness. We desire to see families, servants, leaders, and new believers established in the truth, rooted in the Word, and prepared to impact cities and nations with the Gospel.","beliefsTitle":"Beliefs of Omid No 7 Church","beliefsDesc":"We believe in one living and eternal God, revealed as Father, Son, and Holy Spirit. We believe that Jesus Christ is the Son of God, born of a virgin, crucified for our sins, buried, raised from the dead, exalted at the right hand of the Father, and coming again. We believe the Bible is the inspired Word of God and the final authority for faith, doctrine, character, family, ministry, and daily life. We believe salvation is received by grace through faith in Jesus Christ, not by human works. We believe in the new birth, forgiveness of sins, the gift of righteousness, eternal life, water baptism, the baptism and ministry of the Holy Spirit, prayer, holiness, love, discipleship, divine healing, spiritual growth, and service in the Body of Christ. We believe the Church is the Body of Christ, called to preach the Gospel, make disciples, equip believers, care for people, and reveal the life and power of God.","privacyTitle":"Privacy & Personal Data Protection","privacyDesc":"Your personal information is used only for pastoral follow-up, prayer, discipleship, church communication, and ministry care. We do not sell or publish personal information without permission.","givingTitle":"Give & Support","givingDesc":"Your giving helps us share the Gospel, teach God’s Word, support online ministry, and raise strong believers for God’s Kingdom.","givePayPal":"Give with PayPal","giveRevolut":"Give with Revolut","navHome":"Home","navPlans":"Plans","navBible":"Bible","navWord":"Word","navMore":"More","day":"Day","scriptures":"Scriptures","devotional":"Devotional","practicalStep":"Practical Step","prayer":"Prayer","declaration":"Declaration","summary":"Final Summary","readOutLoud":"Read these declarations out loud with faith.","selectPlan":"Choose a Plan","startPlan":"Start Plan","continueToNextDay":"Continue to Next Day","backToPlans":"Back to Plans","finishPlan":"Finish Plan","footer":"Built on Christ. Led by the Spirit.","dailyVerseTap":"Tap the scripture reference to read the verse","dailyReflection":"Reflection","dailyDeclaration":"Declaration","dailyPrayer":"Prayer","listenDaily":"Listen to Daily Word","stopReading":"Stop Reading","audioUnsupported":"Audio reading is not supported on this device or browser.","audioIntro":"Daily Word","thanksgivingTitle":"Thanksgiving","thanksgivingDesc":"A 28-day guided course for biblical thanksgiving with daily notes.","openThanksgiving":"Open Thanksgiving","courseIntroduction":"Course Introduction","howToUse":"How to Use This Course","startCourse":"Start Course","chooseDay":"Choose a Day","thanksgivingDay":"Day","topicOfDay":"Topic of the Day","verseOfDay":"Verse of the Day","todayInstruction":"Today’s Instruction","practicalExercise":"Practical Exercise","reflectionQuestion":"Reflection Question","faithDeclaration":"Faith Declaration","thanksgivingNotes":"Notes","notesHelp":"Write freely. Your notes are saved on this device.","notePlaceholder":"What am I thankful for today? What did I learn? How did I practice thanksgiving?","backToThanksgiving":"Back to Course","nextDay":"Next Day","finishCourse":"Final Prayer","saved":"Saved","openSection":"Open","newBirthVideos":"New Birth Videos","watchVideo":"Watch Video","salvationFormNote":"After praying the prayer of salvation, please fill out the registration form so we can contact you and walk with you in your growth of faith.","bibleAppChurchTitle":"Bible in the Bible App","bibleAppChurchDesc":"Tap the button below to open our Church Profile in the Bible App. Then choose Follow or Set as My Church to stay connected with our messages, plans, and updates.","followBibleApp":"Follow Us on Bible App","declarationDay":"Day","declarationVerse":"Declaration Verse","declarationTeaching":"Heart Preparation","declarationToday":"Today’s Faith Declaration","declarationPractice":"Today’s Practice","languageSynced":"Notification language synced","bibleReaderTitle":"Bible","bibleReaderDesc":"The complete Old and New Testaments with search, highlights, bookmarks, and personal notes.","openBibleReader":"Open Bible","bibleDataStarter":"Bible","bibleDataStarterDesc":"The complete Old and New Testaments are included in this section.","selectBook":"Select Book","selectChapter":"Select Chapter","searchBible":"Search Scripture","searchPlaceholder":"Search a word, phrase, or reference...","noBibleText":"This chapter is not available in this language yet.","bookmark":"Bookmark","highlight":"Highlight","markRead":"Read","boldVerse":"Bold","noteVerse":"Note","saveNote":"Save Note","notePlaceholderBible":"Write your note, revelation, or insight for this verse; maximum 1000 characters.","removeHighlight":"Remove Color","bibleSearchResults":"Search Results","noResults":"No results found","noteLimit":"Maximum 1000 characters","keyWords":"Key Words","originalWord":"Original Word","pronunciation":"Pronunciation","meaning":"Meaning","noKeyWords":"No key word has been added for this verse yet.","newTestament":"New Testament","newTestamentDesc":"From Matthew to Revelation; choose a book and read the chapter you need.","chooseSection":"Choose Section","chooseBook":"Choose Book","back":"Back","allBooks":"New Testament Books","tapVerseHint":"Tap a verse to bookmark, highlight, bold, or write a note.","verseOptions":"Verse Options","close":"Close","highlightYellow":"Yellow","highlightGreen":"Green","highlightBlue":"Blue","highlightPink":"Pink","oldTestament":"Old Testament","apocrypha":"Apocrypha","apocryphaNotice":"English text for the main Apocrypha books is available. Persian and Croatian translations will be added later.","pendingText":"Waiting for approved text","booksInSection":"Books","englishAvailable":"English text available","openBook":"Open Book","loadingText":"Loading text...","loadFailed":"The text could not be loaded. Please try again or open the source link.","sourceLink":"Open original source","externalText":"This book currently opens from an external source.","apocryphaIntroTitle":"About the Apocrypha","chapters":"Chapters","readChapter":"Read Chapter","selectBookFirst":"Please choose a book first.","loadingBible":"Preparing text...","readingPlans":"Bible Reading Plan","oneYearPlan":"Read the Bible in One Year","twoYearPlan":"Read the Bible in Two Years","oneYearPlanDesc":"Daily Bible reading based on the one-year table.","twoYearPlanDesc":"The two-year plan uses the same table; each table day is divided into two days for a slower pace.","todayReading":"Today’s Reading","planDay":"Plan Day","openReadingPlan":"Open Plan","todaysChapters":"Today’s Chapters","openChapter":"Open Chapter","currentTextLanguage":"Text Language","faTextAvailable":"Persian Bible text is active.","audioBibleTitle":"Persian Audio Bible","audioBibleDesc":"When you send the Persian audio files, we will connect them to Bible chapters here.","readingPlanPdfSource":"This plan is based on the uploaded table.","thanksgivingPlan":"Thanksgiving Course","thanksgivingPlanDesc":"A 28-day thanksgiving course to strengthen faith, prayer, and gratitude to the Lord.","openThanksgivingPlan":"Open Thanksgiving Course"},"fa":{"appTitle":"کلیسای امیدنو۷","appSubtitle":"کلام روزانه، دعا، ایمان","homeTitle":"به کلیسای امیدنو۷ خوش آمدید","homeDesc":"کلیسای آنلاین مسیحی، مستقر در زاگرب کرواسی، با تمرکز بر تعلیم کلام خدا، دعا، شاگردسازی و تجهیز ایمانداران برای پادشاهی خدا.","todayWordTitle":"پیام روزانه امروز","openWord":"باز کردن پیام روزانه","plansTitle":"پلن‌ها","plansDesc":"پلن‌های تعلیمی شبیه اپ کتاب‌مقدس برای رشد روزانه.","openPlans":"باز کردن پلن‌ها","bibleTitle":"کتاب مقدس","bibleDesc":"کتاب مقدس را باز کنید و مطالعه کلام خدا را ادامه دهید.","openBible":"باز کردن کتاب مقدس","declarationsTitle":"اعلان‌های ایمان","declarationsDesc":"کلام خدا را با ایمان درباره امور مالی، سلامتی و موفقیت خود اعلام کنید.","openDeclarations":"باز کردن اعلان‌ها","joinMeeting":"ورود به جلسه آنلاین","enableNotifications":"فعال‌سازی اعلان‌ها","notificationInfo":"پیام روزانه و یادآوری جلسات را روی گوشی دریافت کنید.","notificationReady":"درخواست اعلان شروع شد. اگر گوشی اجازه خواست، Allow را بزنید.","notificationUnsupported":"اعلان‌ها اینجا پشتیبانی نمی‌شود. در آیفون، اپ را به Home Screen اضافه کنید و از آیکن اپ باز کنید.","notificationDenied":"اعلان‌ها مسدود شده‌اند. لطفاً از تنظیمات گوشی اجازه دهید.","notificationEnabled":"اعلان‌ها فعال شده‌اند.","morningPrayer":"دعای صبح روزانه","sundayService":"جلسه کلیسا یکشنبه‌ها","croatiaTime":"به وقت کرواسی","meetingsTitle":"جلسات آنلاین","meetingsDesc":"از طریق FreeConferenceCall به جلسات آنلاین کلیسای امیدنو۷ بپیوندید.","scheduleTitle":"برنامه هفتگی","callToJoin":"ورود با تماس تلفنی","newBirthTitle":"تولد تازه و نجات در مسیح","newBirthQuestion":"آیا تولد تازه را دریافت کرده‌اید؟","newBirthP1":"تولد تازه آغاز زندگی جدید در مسیح است. مسیحیت یعنی دریافت حیات خدا در روح انسان.","newBirthP2":"نجات از راه ایمان به عیسی مسیح دریافت می‌شود؛ او برای گناهان ما مرد و از مردگان برخاست تا هر که به او ایمان آورد، حیات جاودانی داشته باشد.","prayerTitle":"دعای دریافت نجات","prayerIntro":"این دعا را با ایمان و صدای بلند بخوانید:","salvationPrayer":"ای خداوند خدا، ایمان دارم عیسی مسیح پسر خداست. او را به‌عنوان خداوند و نجات‌دهنده خود می‌پذیرم. اعلام می‌کنم نجات یافته‌ام، تولد تازه را دریافت کرده‌ام و فرزند خدا هستم. آمین.","registerAfterPrayer":"من این دعا را خواندم / ثبت‌نام","relatedVersesTitle":"آیات مرتبط","relatedVersesDesc":"روی دکمه زیبای هر آیه بزنید تا متن آیه باز شود.","john33Ref":"یوحنا ۳:۳","john33Text":"اگر کسی از سر نو مولود نشود، نمی‌تواند پادشاهی خدا را ببیند.","john316Ref":"یوحنا ۳:۱۶","john316Text":"زیرا خدا جهان را آن‌قدر محبت کرد که پسر یگانه خود را داد، تا هر که به او ایمان آورد هلاک نگردد، بلکه حیات جاودانی داشته باشد.","romans109Ref":"رومیان ۱۰:۹–۱۰","romans109Text":"اگر به زبان خود اعتراف کنی که عیسی خداوند است و در دل خود ایمان آوری که خدا او را از مردگان برخیزانید، نجات خواهی یافت.","romans1013Ref":"رومیان ۱۰:۱۳","romans1013Text":"هر که نام خداوند را بخواند، نجات خواهد یافت.","romans1017Ref":"رومیان ۱۰:۱۷","romans1017Text":"ایمان از شنیدن پدید می‌آید و شنیدن از کلام خداست.","moreTitle":"بیشتر","membershipTitle":"عضویت","membershipDesc":"برای عضویت، درخواست دعا یا ارتباط با ما، فرم زیر را تکمیل کنید.","visionTitle":"رویای ما","visionDesc":"رویای کلیسای امیدنو۷ پرورش، شاگردسازی و تقویت ایمان ایمانداران و کمک به آنان در شناخت حقیقت کلام خداست. ما وجود داریم تا مردم عیسی مسیح را بشناسند، تولد تازه را دریافت کنند، در ایمان رشد کنند، هویت خود را در مسیح بشناسند و تحت هدایت روح‌القدس زندگی کنند. رویای ما بنا کردن یک خانواده روحانی زنده است؛ جایی که ایمانداران تعلیم می‌بینند، تربیت می‌شوند، شفا می‌یابند، تقویت می‌شوند و برای خدمت، دعا، قدوسیت، محبت، شهادت انجیل و بنای بدن مسیح تجهیز می‌گردند. ما می‌خواهیم خانواده‌ها، خادمین، رهبران و ایمانداران تازه در حقیقت استوار، در کلام ریشه‌دار و برای تأثیرگذاری بر شهرها و ملت‌ها آماده شوند.","beliefsTitle":"اعتقادات کلیسای امیدنو۷","beliefsDesc":"ما به یک خدای زنده و ابدی ایمان داریم که خود را به‌عنوان پدر، پسر و روح‌القدس آشکار کرده است. ما ایمان داریم عیسی مسیح پسر خداست؛ از باکره متولد شد، برای گناهان ما مصلوب گردید، دفن شد، از مردگان برخاست، به دست راست پدر جلال یافت و دوباره بازخواهد گشت. ما ایمان داریم کتاب‌مقدس کلام الهام‌شده خدا و مرجع نهایی ایمان، تعلیم، شخصیت، خانواده، خدمت و زندگی روزانه است. ما ایمان داریم نجات به فیض و از راه ایمان به عیسی مسیح دریافت می‌شود، نه با اعمال انسانی. ما به تولد تازه، آمرزش گناهان، عطای عدالت، حیات جاودانی، تعمید آب، تعمید و خدمت روح‌القدس، دعا، قدوسیت، محبت، شاگردسازی، شفای الهی، رشد روحانی و خدمت در بدن مسیح ایمان داریم. ما ایمان داریم کلیسا بدن مسیح است و برای اعلام انجیل، ساختن شاگردان، تجهیز ایمانداران، مراقبت از مردم و آشکار کردن حیات و قدرت خدا خوانده شده است.","privacyTitle":"حریم خصوصی و حفاظت از داده‌های شخصی","privacyDesc":"اطلاعات شخصی شما فقط برای پیگیری خدمتی، دعا، شاگردسازی، ارتباط کلیسایی و مراقبت روحانی استفاده می‌شود. ما اطلاعات شخصی را بدون اجازه نمی‌فروشیم و منتشر نمی‌کنیم.","givingTitle":"هدایا و حمایت","givingDesc":"هدایای شما به ما کمک می‌کند انجیل را گسترش دهیم، کلام خدا را تعلیم دهیم و ایماندارانی قوی برای پادشاهی خدا تربیت کنیم.","givePayPal":"اهدای هدیه با PayPal","giveRevolut":"اهدای هدیه با Revolut","navHome":"خانه","navPlans":"پلن‌ها","navBible":"کتاب","navWord":"کلام","navMore":"بیشتر","day":"روز","scriptures":"آیات","devotional":"تعلیم روز","practicalStep":"قدم عملی","prayer":"دعا","declaration":"اعلان","summary":"جمع‌بندی پایانی","readOutLoud":"این اعلان‌ها را با ایمان و صدای بلند بخوانید.","selectPlan":"انتخاب پلن","startPlan":"شروع پلن","continueToNextDay":"ادامه به روز بعد","backToPlans":"بازگشت به برنامه‌ها","finishPlan":"پایان پلن","footer":"بنا شده بر مسیح، هدایت‌شده با روح‌القدس.","dailyVerseTap":"برای خواندن آیه روی آدرس آیه بزنید","dailyReflection":"توضیح","dailyDeclaration":"اعلان","dailyPrayer":"دعا","listenDaily":"شنیدن پیام روزانه","stopReading":"توقف خواندن","audioUnsupported":"خواندن صوتی در این دستگاه یا مرورگر پشتیبانی نمی‌شود.","audioIntro":"پیام روزانه","thanksgivingTitle":"شکرگزاری","thanksgivingDesc":"دوره ۲۸ روزه برای تمرین شکرگزاری صحیح و کتاب‌مقدسی، همراه با یادداشت روزانه.","openThanksgiving":"باز کردن دوره شکرگزاری","courseIntroduction":"مقدمه دوره","howToUse":"دستورالعمل استفاده از دوره","startCourse":"شروع دوره","chooseDay":"انتخاب روز","thanksgivingDay":"روز","topicOfDay":"موضوع روز","verseOfDay":"آیه روز","todayInstruction":"دستورالعمل امروز","practicalExercise":"تمرین عملی","reflectionQuestion":"سؤال تأملی","faithDeclaration":"اعلان ایمانی","thanksgivingNotes":"یادداشت من","notesHelp":"آزادانه بنویسید. یادداشت شما روی همین دستگاه ذخیره می‌شود.","notePlaceholder":"امروز برای چه چیزهایی شکرگزارم؟ امروز چه چیزی یاد گرفتم؟ امروز چگونه شکرگزاری را عملی کردم؟","backToThanksgiving":"بازگشت به دوره","nextDay":"روز بعد","finishCourse":"دعای پایانی","saved":"ذخیره شد","openSection":"باز کردن","newBirthVideos":"ویدیوهای تولد تازه","watchVideo":"مشاهده ویدیو","salvationFormNote":"بعد از خواندن دعای نجات، فرم ثبت‌نام را پر کنید تا بتوانیم با شما ارتباط بگیریم و شما را در مسیر رشد ایمانی همراهی کنیم.","bibleAppChurchTitle":"کتاب مقدس در Bible App","bibleAppChurchDesc":"برای دنبال کردن کلیسای امیدنو۷ در برنامه Bible App، روی دکمه زیر بزنید و صفحه کلیسا را باز کنید. سپس گزینه Follow یا Set as My Church را انتخاب کنید.","followBibleApp":"دنبال کردن کلیسا در Bible App","declarationDay":"روز","declarationVerse":"آیه اعلان","declarationTeaching":"آمادگی قلب برای اعلان","declarationToday":"اعلان ایمان امروز","declarationPractice":"تمرین امروز","languageSynced":"زبان نوتیفیکیشن تنظیم شد","bibleReaderTitle":"کتاب مقدس","bibleReaderDesc":"عهد عتیق و عهد جدید کامل با جستجو، هایلایت، نشانه‌گذاری و یادداشت شخصی.","openBibleReader":"ورود به کتاب مقدس","bibleDataStarter":"کتاب مقدس","bibleDataStarterDesc":"عهد عتیق و عهد جدید کامل در این بخش قرار گرفته است.","selectBook":"انتخاب کتاب","selectChapter":"انتخاب باب","searchBible":"جستجوی آیه","searchPlaceholder":"کلمه، عبارت یا آدرس آیه را جستجو کنید...","noBibleText":"متن این باب در این زبان هنوز موجود نیست.","bookmark":"نشانه‌گذاری","highlight":"هایلایت","markRead":"خوانده شد","boldVerse":"بولد","noteVerse":"یادداشت","saveNote":"ذخیره یادداشت","notePlaceholderBible":"یادداشت، مکاشفه یا نکته خود را درباره این آیه بنویسید؛ حداکثر ۱۰۰۰ حرف.","removeHighlight":"حذف رنگ","bibleSearchResults":"نتایج جستجو","noResults":"نتیجه‌ای پیدا نشد","noteLimit":"حداکثر ۱۰۰۰ حرف","keyWords":"کلمات کلیدی","originalWord":"واژه اصلی","pronunciation":"تلفظ","meaning":"معنای تفسیری","noKeyWords":"برای این آیه هنوز کلمه کلیدی ثبت نشده است.","newTestament":"عهد جدید","newTestamentDesc":"از متی تا مکاشفه؛ کتاب را انتخاب کنید و باب مورد نظر را بخوانید.","chooseSection":"انتخاب بخش","chooseBook":"انتخاب کتاب","back":"بازگشت","allBooks":"کتاب‌های عهد جدید","tapVerseHint":"برای نشانه‌گذاری، هایلایت، بولد یا نوشتن یادداشت، روی آیه بزنید.","verseOptions":"گزینه‌های آیه","close":"بستن","highlightYellow":"زرد","highlightGreen":"سبز","highlightBlue":"آبی","highlightPink":"صورتی","oldTestament":"عهد عتیق","apocrypha":"کتاب‌های اپوکریفا","apocryphaNotice":"متن انگلیسی کتاب‌های اصلی اپوکریفا در دسترس است. ترجمه فارسی و کرواتی در مرحله بعد اضافه خواهد شد.","pendingText":"در انتظار افزودن متن مجاز","booksInSection":"کتاب‌ها","englishAvailable":"متن انگلیسی آماده است","openBook":"باز کردن کتاب","loadingText":"در حال دریافت متن...","loadFailed":"دریافت متن ممکن نشد. لطفاً دوباره امتحان کنید یا از لینک منبع استفاده کنید.","sourceLink":"باز کردن منبع اصلی","externalText":"این کتاب فعلاً از منبع خارجی باز می‌شود.","apocryphaIntroTitle":"درباره کتاب‌های اپوکریفا","chapters":"باب‌ها","readChapter":"خواندن باب","selectBookFirst":"ابتدا یک کتاب را انتخاب کنید.","loadingBible":"در حال آماده‌سازی متن...","readingPlans":"برنامه خواندن کتاب مقدس","oneYearPlan":"خواندن کتاب مقدس در یک سال","twoYearPlan":"خواندن کتاب مقدس در دو سال","oneYearPlanDesc":"مطالعه روزانه کتاب مقدس بر اساس جدول یک‌ساله.","twoYearPlanDesc":"برنامه دو ساله بر اساس همان جدول است؛ هر روز جدول در دو روز تقسیم می‌شود تا مطالعه آرام‌تر باشد.","todayReading":"مطالعه امروز","planDay":"روز برنامه","openReadingPlan":"باز کردن برنامه","todaysChapters":"باب‌های امروز","openChapter":"باز کردن باب","currentTextLanguage":"زبان متن","faTextAvailable":"متن فارسی کتاب مقدس فعال است.","audioBibleTitle":"کتاب مقدس صوتی فارسی","audioBibleDesc":"وقتی فایل‌های صوتی فارسی را ارسال کنید، در همین بخش به باب‌های کتاب مقدس وصل می‌کنیم.","readingPlanPdfSource":"این برنامه بر اساس جدول بارگذاری‌شده تنظیم شده است.","thanksgivingPlan":"دوره شکرگزاری","thanksgivingPlanDesc":"دوره ۲۸ روزه شکرگزاری برای تقویت ایمان، دعا و قدردانی از خداوند.","openThanksgivingPlan":"باز کردن دوره شکرگزاری"},"hr":{"appTitle":"Crkva Omid No 7","appSubtitle":"Dnevna riječ. Molitva. Vjera.","homeTitle":"Dobrodošli u Crkvu Omid No 7","homeDesc":"Online kršćanska crkva sa sjedištem u Zagrebu, posvećena poučavanju Božje riječi, molitvi, učeništvu i opremanju vjernika za Božje kraljevstvo.","todayWordTitle":"Današnja dnevna riječ","openWord":"Otvori Dnevnu riječ","plansTitle":"Planovi","plansDesc":"Biblijski planovi za svakodnevni rast.","openPlans":"Otvori planove","bibleTitle":"Biblija","bibleDesc":"Otvorite Bibliju i nastavite čitati Božju riječ.","openBible":"Otvori Bibliju","declarationsTitle":"Izjave vjere","declarationsDesc":"Izgovarajte Božju riječ vjerom nad financijama, zdravljem i uspjehom.","openDeclarations":"Otvori izjave","joinMeeting":"Pridruži se online sastanku","enableNotifications":"Uključi obavijesti","notificationInfo":"Primajte Dnevnu riječ i podsjetnike na sastanke na svoj telefon.","notificationReady":"Zahtjev za obavijesti je pokrenut. Ako uređaj zatraži dopuštenje, dodirnite Allow.","notificationUnsupported":"Obavijesti ovdje nisu podržane. Na iPhoneu instalirajte aplikaciju na početni zaslon.","notificationDenied":"Obavijesti su blokirane. Dopustite ih u postavkama telefona.","notificationEnabled":"Obavijesti su uključene.","morningPrayer":"Svakodnevna jutarnja molitva","sundayService":"Nedjeljna služba","croatiaTime":"po hrvatskom vremenu","meetingsTitle":"Online sastanci","meetingsDesc":"Pridružite se našim online sastancima putem FreeConferenceCall.","scheduleTitle":"Tjedni raspored","callToJoin":"Pridruži se pozivom","newBirthTitle":"Novo rođenje i spasenje u Kristu","newBirthQuestion":"Jeste li primili novo rođenje?","newBirthP1":"Novo rođenje početak je novog života u Kristu. Kršćanstvo znači primiti Božji život u ljudski duh.","newBirthP2":"Spasenje se prima vjerom u Isusa Krista, koji je umro za naše grijehe i uskrsnuo kako bi svatko tko vjeruje u Njega imao vječni život.","prayerTitle":"Molitva spasenja","prayerIntro":"Pročitajte ovu molitvu naglas s vjerom:","salvationPrayer":"Gospodine Bože, vjerujem da je Isus Krist Sin Božji. Primam Ga kao svoga Gospodina i Spasitelja. Izjavljujem da sam spašen, nanovo rođen i dijete Božje. Amen.","registerAfterPrayer":"Molio/la sam ovu molitvu / Registracija","relatedVersesTitle":"Povezani stihovi","relatedVersesDesc":"Dodirnite lijepi gumb stiha kako biste otvorili tekst.","john33Ref":"Ivan 3:3","john33Text":"Ako se tko ne rodi nanovo, ne može vidjeti kraljevstvo Božje.","john316Ref":"Ivan 3:16","john316Text":"Jer Bog je tako ljubio svijet da je dao svoga jedinorođenog Sina, da nijedan koji vjeruje u njega ne propadne, nego ima vječni život.","romans109Ref":"Rimljanima 10:9–10","romans109Text":"Ako ustima priznaješ da je Isus Gospodin i srcem vjeruješ da ga je Bog uskrisio od mrtvih, bit ćeš spašen.","romans1013Ref":"Rimljanima 10:13","romans1013Text":"Tko god prizove ime Gospodnje, bit će spašen.","romans1017Ref":"Rimljanima 10:17","romans1017Text":"Vjera dolazi od slušanja, a slušanje po riječi Božjoj.","moreTitle":"Više","membershipTitle":"Članstvo","membershipDesc":"Za članstvo, molitvenu potrebu ili kontakt s nama, ispunite obrazac.","visionTitle":"Naša vizija","visionDesc":"Vizija Crkve Omideno7 je odgajati, učenički oblikovati i jačati vjeru vjernika te im pomoći da upoznaju istinu Božje riječi. Postojimo kako bi ljudi upoznali Isusa Krista, primili novo rođenje, rasli u vjeri, otkrili svoj identitet u Kristu i živjeli pod vodstvom Duha Svetoga. Naša je vizija graditi živu duhovnu obitelj u kojoj se vjernici poučavaju, osposobljavaju, iscjeljuju, jačaju i opremaju za služenje, molitvu, svetost, ljubav, svjedočenje Evanđelja i izgradnju Tijela Kristova.","beliefsTitle":"Vjerovanja Crkve Omid No 7","beliefsDesc":"Vjerujemo u jednoga živoga i vječnoga Boga, objavljenoga kao Otac, Sin i Duh Sveti. Vjerujemo da je Isus Krist Sin Božji, rođen od djevice, raspet za naše grijehe, pokopan, uskrsnuo od mrtvih, uzvišen zdesna Ocu i da će ponovno doći. Vjerujemo da je Biblija nadahnuta Božja riječ i konačni autoritet za vjeru, nauk, karakter, obitelj, službu i svakodnevni život. Vjerujemo da se spasenje prima milošću po vjeri u Isusa Krista, a ne ljudskim djelima. Vjerujemo u novo rođenje, oproštenje grijeha, dar pravednosti, vječni život, krštenje u vodi, službu Duha Svetoga, molitvu, svetost, ljubav, učeništvo, božansko iscjeljenje, duhovni rast i služenje u Tijelu Kristovu. Vjerujemo da je Crkva Tijelo Kristovo, pozvana propovijedati Evanđelje, stvarati učenike, opremati vjernike, brinuti za ljude i očitovati Božji život i silu.","privacyTitle":"Privatnost i zaštita osobnih podataka","privacyDesc":"Vaši osobni podaci koriste se samo za pastoralno praćenje, molitvu, učeništvo, crkvenu komunikaciju i duhovnu brigu. Ne prodajemo niti objavljujemo osobne podatke bez dopuštenja.","givingTitle":"Darivanje i podrška","givingDesc":"Vaše darivanje pomaže nam širiti Evanđelje, poučavati Božju riječ i graditi snažne vjernike za Božje kraljevstvo.","givePayPal":"Daruj putem PayPala","giveRevolut":"Daruj putem Revoluta","navHome":"Početna","navPlans":"Planovi","navBible":"Biblija","navWord":"Riječ","navMore":"Više","day":"Dan","scriptures":"Stihovi","devotional":"Dnevno učenje","practicalStep":"Praktičan korak","prayer":"Molitva","declaration":"Izjava","summary":"Završni sažetak","readOutLoud":"Izgovorite ove izjave naglas s vjerom.","selectPlan":"Odaberi plan","startPlan":"Započni plan","continueToNextDay":"Nastavi na sljedeći dan","backToPlans":"Natrag na planove","finishPlan":"Završi plan","footer":"Izgrađeni na Kristu. Vođeni Duhom.","dailyVerseTap":"Dodirnite referencu kako biste pročitali stih","dailyReflection":"Razmišljanje","dailyDeclaration":"Izjava","dailyPrayer":"Molitva","listenDaily":"Slušaj dnevnu riječ","stopReading":"Zaustavi čitanje","audioUnsupported":"Čitanje naglas nije podržano na ovom uređaju ili pregledniku.","audioIntro":"Dnevna riječ","thanksgivingTitle":"Zahvalnost","thanksgivingDesc":"28-dnevni vođeni tečaj biblijske zahvalnosti s dnevnim bilješkama.","openThanksgiving":"Otvori zahvalnost","courseIntroduction":"Uvod u tečaj","howToUse":"Kako koristiti tečaj","startCourse":"Započni tečaj","chooseDay":"Odaberi dan","thanksgivingDay":"Dan","topicOfDay":"Tema dana","verseOfDay":"Stih dana","todayInstruction":"Današnja uputa","practicalExercise":"Praktična vježba","reflectionQuestion":"Pitanje za razmišljanje","faithDeclaration":"Izjava vjere","thanksgivingNotes":"Moje bilješke","notesHelp":"Pišite slobodno. Bilješke se spremaju na ovom uređaju.","notePlaceholder":"Za što sam danas zahvalan? Što sam naučio? Kako sam prakticirao zahvalnost?","backToThanksgiving":"Natrag na tečaj","nextDay":"Sljedeći dan","finishCourse":"Završna molitva","saved":"Spremljeno","openSection":"Otvori","newBirthVideos":"Videozapisi o novom rođenju","watchVideo":"Pogledaj video","salvationFormNote":"Nakon molitve spasenja ispunite obrazac za registraciju kako bismo vas mogli kontaktirati i pratiti u rastu vjere.","bibleAppChurchTitle":"Biblija u Bible Appu","bibleAppChurchDesc":"Dodirnite gumb ispod kako biste otvorili profil naše crkve u Bible Appu. Zatim odaberite Follow ili Set as My Church kako biste ostali povezani s našim porukama, planovima i novostima.","followBibleApp":"Pratite nas u Bible Appu","declarationDay":"Dan","declarationVerse":"Stih izjave","declarationTeaching":"Priprema srca","declarationToday":"Današnja izjava vjere","declarationPractice":"Današnja vježba","languageSynced":"Jezik obavijesti je usklađen","bibleReaderTitle":"Biblija","bibleReaderDesc":"Cijeli Stari i Novi zavjet s pretragom, isticanjem, oznakama i osobnim bilješkama.","openBibleReader":"Otvori Bibliju","bibleDataStarter":"Biblija","bibleDataStarterDesc":"Cijeli Stari i Novi zavjet uključeni su u ovaj odjeljak.","selectBook":"Odaberi knjigu","selectChapter":"Odaberi poglavlje","searchBible":"Pretraži Pismo","searchPlaceholder":"Pretraži riječ, izraz ili referencu...","noBibleText":"Ovo poglavlje još nije dostupno na ovom jeziku.","bookmark":"Označi","highlight":"Istakni","markRead":"Pročitano","boldVerse":"Podebljaj","noteVerse":"Bilješka","saveNote":"Spremi bilješku","notePlaceholderBible":"Napišite bilješku, objavu ili uvid za ovaj stih; najviše 1000 znakova.","removeHighlight":"Ukloni boju","bibleSearchResults":"Rezultati pretrage","noResults":"Nema rezultata","noteLimit":"Najviše 1000 znakova","keyWords":"Ključne riječi","originalWord":"Izvorna riječ","pronunciation":"Izgovor","meaning":"Značenje","noKeyWords":"Za ovaj stih još nije dodana ključna riječ.","newTestament":"Novi zavjet","newTestamentDesc":"Od Mateja do Otkrivenja; odaberite knjigu i čitajte željeno poglavlje.","chooseSection":"Odaberi odjeljak","chooseBook":"Odaberi knjigu","back":"Natrag","allBooks":"Knjige Novoga zavjeta","tapVerseHint":"Dodirnite stih za oznaku, isticanje, podebljanje ili bilješku.","verseOptions":"Opcije stiha","close":"Zatvori","highlightYellow":"Žuto","highlightGreen":"Zeleno","highlightBlue":"Plavo","highlightPink":"Ružičasto","oldTestament":"Stari zavjet","apocrypha":"Apokrifi","apocryphaNotice":"Engleski tekst glavnih apokrifnih knjiga je dostupan. Perzijski i hrvatski prijevodi bit će dodani kasnije.","pendingText":"Čeka odobreni tekst","booksInSection":"Knjige","englishAvailable":"Engleski tekst je dostupan","openBook":"Otvori knjigu","loadingText":"Učitavanje teksta...","loadFailed":"Tekst se nije mogao učitati. Pokušajte ponovno ili otvorite izvorni link.","sourceLink":"Otvori izvor","externalText":"Ova se knjiga trenutno otvara iz vanjskog izvora.","apocryphaIntroTitle":"O apokrifima","chapters":"Poglavlja","readChapter":"Čitaj poglavlje","selectBookFirst":"Najprije odaberite knjigu.","loadingBible":"Priprema teksta...","readingPlans":"Plan čitanja Biblije","oneYearPlan":"Pročitaj Bibliju u jednoj godini","twoYearPlan":"Pročitaj Bibliju u dvije godine","oneYearPlanDesc":"Dnevno čitanje Biblije prema jednogodišnjoj tablici.","twoYearPlanDesc":"Dvogodišnji plan koristi istu tablicu; svaki dan iz tablice podijeljen je na dva dana za sporiji ritam.","todayReading":"Današnje čitanje","planDay":"Dan plana","openReadingPlan":"Otvori plan","todaysChapters":"Današnja poglavlja","openChapter":"Otvori poglavlje","currentTextLanguage":"Jezik teksta","faTextAvailable":"Perzijski tekst Biblije je aktivan.","audioBibleTitle":"Perzijska audio Biblija","audioBibleDesc":"Kada pošaljete perzijske audio datoteke, povezat ćemo ih s biblijskim poglavljima ovdje.","readingPlanPdfSource":"Ovaj plan temelji se na učitanoj tablici.","thanksgivingPlan":"Tečaj zahvaljivanja","thanksgivingPlanDesc":"Tečaj zahvaljivanja od 28 dana za jačanje vjere, molitve i zahvalnosti Gospodinu.","openThanksgivingPlan":"Otvori tečaj zahvaljivanja"}};
let currentLang = localStorage.getItem('lang') || 'fa';

(function(){
  if(localStorage.getItem('omid_app_version') !== APP_VERSION){
    localStorage.setItem('omid_app_version', APP_VERSION);
    localStorage.removeItem('selectedPlanKey');
  }
})();

let selectedPlanKey = localStorage.getItem('selectedPlanKey') || null;
let selectedPlanDay = parseInt(localStorage.getItem('selectedPlanDay') || '1', 10);

function t(k){ return (translations[currentLang]&&translations[currentLang][k]) || (translations.en&&translations.en[k]) || k; }
function loc(obj){ return (obj&&obj[currentLang]) || (obj&&obj.en) || ''; }
function getDailyMessage(){ const list=window.dailyMessages||[]; const day=new Date().getDate(); return list[Math.min(day,30)-1]||list[0]; }


function getSpeechLang(){
 if(currentLang==='fa') return 'fa-IR';
 if(currentLang==='hr') return 'hr-HR';
 return 'en-US';
}
function buildDailySpeechText(){
 const m=getDailyMessage(); if(!m)return '';
 const parts=[
  t('audioIntro'),
  t('day')+' '+m.day,
  loc(m.title),
  loc(m.ref),
  loc(m.verse),
  t('dailyReflection'),
  loc(m.message),
  t('dailyDeclaration'),
  loc(m.declaration),
  t('dailyPrayer'),
  loc(m.prayer)
 ];
 return parts.filter(Boolean).join('. ');
}


function speakDailyWord(){
  return false;
}
function stopDailySpeech(){
  if('speechSynthesis' in window){
    try{ window.speechSynthesis.cancel(); }catch(e){}
  }
  return false;
}

function renderDaily(){
 const m=getDailyMessage(); if(!m)return;
 document.querySelectorAll('[data-daily="day"]').forEach(e=>e.textContent=t('day')+' '+m.day);
 document.querySelectorAll('[data-daily="title"]').forEach(e=>e.textContent=loc(m.title));
 document.querySelectorAll('[data-daily="ref"]').forEach(e=>e.textContent=loc(m.ref));
 document.querySelectorAll('[data-daily="verse"]').forEach(e=>e.textContent=loc(m.verse));
 document.querySelectorAll('[data-daily="message"]').forEach(e=>e.textContent=loc(m.message));
 document.querySelectorAll('[data-daily-card]').forEach(card=>{
   const declarationHtml = m.declaration ? `<div class="plan-section-title">${t('dailyDeclaration')}</div><p class="daily-declaration">${loc(m.declaration)}</p>` : '';
   const prayerHtml = m.prayer ? `<div class="plan-section-title">${t('dailyPrayer')}</div><p>${loc(m.prayer)}</p>` : '';
   card.innerHTML = `<span class="day-label">${t('day')} ${m.day}</span>
   <h3>${loc(m.title)}</h3>
   <p class="daily-tap-hint">${t('dailyVerseTap')}</p>
   <details class="daily-scripture-expand"><summary>${loc(m.ref)}</summary><p>${loc(m.verse)}</p></details>
   <div class="plan-section-title">${t('dailyReflection')}</div>
   <p>${loc(m.message)}</p>
   ${declarationHtml}
   ${prayerHtml}
   `;
 });
}

function renderPlans(){
 const root=document.getElementById('plansContent');
 if(!root||!window.teachingPlans)return;
 if(!selectedPlanKey || !window.teachingPlans[selectedPlanKey]){
   let html=`<div class="hero-card"><h1>${t('selectPlan')}</h1><p>${t('plansDesc')}</p></div>`;
   html+=`<div class="plan-list-card thanksgiving-plan-list-card" data-open-thanksgiving-plan="1">
     <h3>${t('thanksgivingPlan')}</h3>
     <p>${t('thanksgivingPlanDesc')}</p>
     <div class="plan-progress"><div style="width:28%"></div></div>
     <button class="btn gold">${t('openThanksgivingPlan')}</button>
   </div>`;
   Object.keys(window.teachingPlans).forEach(key=>{
     const p=window.teachingPlans[key][currentLang]||window.teachingPlans[key].en;
     html+=`<div class="plan-list-card" data-plan-key="${key}"><h3>${p.title}</h3><p>${p.subtitle}</p><div class="plan-progress"><div style="width:10%"></div></div><button class="btn primary">${t('startPlan')}</button></div>`;
   });
   root.innerHTML=html;
   root.querySelectorAll('[data-open-thanksgiving-plan]').forEach(card=>card.addEventListener('click',()=>showPage('thanksgiving')));
   root.querySelectorAll('[data-plan-key]').forEach(card=>card.addEventListener('click',()=>{
     selectedPlanKey=card.dataset.planKey;
     selectedPlanDay=parseInt(localStorage.getItem('planDay_'+selectedPlanKey)||'1',10);
     localStorage.setItem('selectedPlanKey',selectedPlanKey);
     renderPlans();
   }));
   return;
 }
 const p=window.teachingPlans[selectedPlanKey][currentLang]||window.teachingPlans[selectedPlanKey].en;
 const d=p.days[Math.max(1,Math.min(selectedPlanDay, p.days.length))-1];
 const progress=Math.round((d.day/p.days.length)*100);
 const img='';
 root.innerHTML=`<div class="hero-card"><h1>${p.title}</h1><p><strong>${p.subtitle}</strong></p><p>${p.intro}</p><div class="plan-progress"><div style="width:${progress}%"></div></div></div><div class="plan-day-card">${img}<span class="day-label">${t('day')} ${d.day}</span><h3>${d.title}</h3><div class="plan-section-title">${t('scriptures')}</div>${d.scriptures.map(s=>`<details class="plan-scripture-expand"><summary>${loc(s.ref)}</summary><p>${loc(s.text)}</p></details>`).join('')}<div class="plan-section-title">${t('devotional')}</div><p>${d.devotional}</p><div class="plan-section-title">${t('practicalStep')}</div><p>${d.step}</p><div class="plan-section-title">${t('prayer')}</div><p>${d.prayer}</p><div class="plan-section-title">${t('declaration')}</div><p><strong>${d.declaration}</strong></p><div class="plan-day-nav"><button class="btn light" id="backToPlans">${t('backToPlans')}</button><button class="btn primary" id="nextPlanDay">${d.day>=p.days.length?t('finishPlan'):t('continueToNextDay')}</button></div></div>`;
 document.getElementById('backToPlans').addEventListener('click',()=>{
   selectedPlanKey=null;
   localStorage.removeItem('selectedPlanKey');
   renderPlans();
 });
 document.getElementById('nextPlanDay').addEventListener('click',()=>{
   if(selectedPlanDay < p.days.length){
     selectedPlanDay++;
     localStorage.setItem('planDay_'+selectedPlanKey, selectedPlanDay);
     renderPlans();
     window.scrollTo({top:0,behavior:'smooth'});
   } else {
     selectedPlanKey=null;
     localStorage.removeItem('selectedPlanKey');
     renderPlans();
   }
 });
}

function getDeclarationDay(){
 const d=new Date().getDate();
 return ((d-1)%30)+1;
}
function renderDeclarations(){
 const root=document.getElementById('declarationsContent');
 if(!root || !window.declarationsData)return;
 const day=getDeclarationDay();
 const item=window.declarationsData.find(x=>x.day===day) || window.declarationsData[0];
 root.innerHTML = `<div class="declaration-day-card">
  <span class="day-label">${t('declarationDay')} ${item.day}</span>
  <h2>${loc(item.title)}</h2>
  <div class="plan-section-title">${t('declarationVerse')}</div>
  <details class="plan-scripture-expand"><summary>${loc(item.ref)}</summary><p>${loc(item.verse)}</p></details>
  <div class="plan-section-title">${t('declarationTeaching')}</div>
  <p>${loc(item.teaching)}</p>
  <div class="plan-section-title">${t('declarationToday')}</div>
  <p class="long-faith-declaration">${loc(item.declaration)}</p>
  <div class="plan-section-title">${t('declarationPractice')}</div>
  <p>${loc(item.practice)}</p>
 </div>`;
}

function setLang(lang){ currentLang=lang; localStorage.setItem('lang',lang); document.documentElement.lang=lang; document.documentElement.dir=lang==='fa'?'rtl':'ltr'; document.body.classList.remove('fa','en','hr'); document.body.classList.add(lang); document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n)); document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang)); renderDaily(); renderPlans(); renderDeclarations(); renderThanksgiving(); renderNewBirthContent(); if(typeof renderBibleReader==='function'){ renderBibleReader(); setTimeout(()=>renderBibleReader(),120); } syncOneSignalLanguageTag(); }
function openBibleHome(){
 try{
  bibleReaderView='home';
  activeBibleSection='new';
  activeBibleVerseRef=null;
  localStorage.setItem('bibleReaderView','home');
  localStorage.setItem('bibleSection','new');
 }catch(e){}
 showPage('bibleReader');
 setTimeout(()=>{ if(typeof renderBibleReader==='function') renderBibleReader(); },180);
}
function showPage(id){ if(id==='bibleReader' && typeof renderBibleReader==='function') { if(!bibleReaderView || bibleReaderView==='apocrypha') bibleReaderView='home'; renderBibleReader(); setTimeout(()=>renderBibleReader(),120); } document.querySelectorAll('.page').forEach(p=>p.classList.remove('active')); const page=document.getElementById(id); if(page)page.classList.add('active'); document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===id)); window.scrollTo({top:0,behavior:'smooth'}); if(window.gtag)gtag('event','page_view_app',{page:id}); }
function updateNotificationStatus(msg){ document.querySelectorAll('.notification-status').forEach(el=>el.textContent=msg); }
window.OneSignalDeferred=window.OneSignalDeferred||[];
OneSignalDeferred.push(async function(OneSignal){ try{ await OneSignal.init({ appId:ONESIGNAL_APP_ID, serviceWorkerPath:"OneSignalSDKWorker.js", serviceWorkerParam:{scope:"/omideno7-app/"}, notifyButton:{enable:true,position:'bottom-left',size:'medium',showCredit:false} }); }catch(e){ updateNotificationStatus("OneSignal init error: "+(e&&e.message?e.message:e)); } });
async function enableNotifications(){ updateNotificationStatus(t('notificationReady')); if(!('Notification' in window)){ updateNotificationStatus(t('notificationUnsupported')); return; } if(Notification.permission==='denied'){ updateNotificationStatus(t('notificationDenied')); return; } try{ OneSignalDeferred.push(async function(OneSignal){ if(Notification.permission==='default'){ const permission=await Notification.requestPermission(); if(permission!=='granted'){ updateNotificationStatus(t('notificationDenied')); return; } } if(OneSignal.User?.PushSubscription?.optIn) await OneSignal.User.PushSubscription.optIn(); updateNotificationStatus(t('notificationEnabled')); }); }catch(e){ updateNotificationStatus('Notification error: '+(e&&e.message?e.message:e)); } }
function loadAnalyticsIfConfigured(){ const cfg=window.OMID_CONFIG||{}; if(!cfg.GA_MEASUREMENT_ID)return; const s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(cfg.GA_MEASUREMENT_ID); document.head.appendChild(s); window.dataLayer=window.dataLayer||[]; window.gtag=function(){dataLayer.push(arguments)}; gtag('js',new Date()); gtag('config',cfg.GA_MEASUREMENT_ID,{page_title:'Omid No 7 Church App'}); }

let selectedThanksgivingDay = parseInt(localStorage.getItem('thanksgivingSelectedDay') || '0', 10);
function thanksgivingNoteKey(day){ return 'thanksgivingNote_'+currentLang+'_'+day; }
function autoGrowTextarea(el){ el.style.height='auto'; el.style.height=(el.scrollHeight+10)+'px'; }
function saveThanksgivingNote(day, value){ localStorage.setItem(thanksgivingNoteKey(day), value || ''); const s=document.querySelector('.thanksgiving-save-status'); if(s){s.textContent=t('saved'); setTimeout(()=>s.textContent='',1200);} }
function renderThanksgiving(){
 const root=document.getElementById('thanksgivingContent'); if(!root||!window.thanksgivingCourse)return;
 const data=window.thanksgivingCourse; const intro=data.intro[currentLang]||data.intro.en; const days=data.days||[];
 if(!selectedThanksgivingDay){
  root.innerHTML=`<div class="hero-card thanksgiving-hero"><h1>${intro.title}</h1><p><strong>${intro.subtitle}</strong></p><h3>${t('courseIntroduction')}</h3><p>${intro.intro}</p><h3>${t('howToUse')}</h3><ol>${intro.guide.map(x=>`<li>${x}</li>`).join('')}</ol><button class="btn primary" id="startThanksgiving">${t('startCourse')}</button></div><div class="card"><h3>${t('chooseDay')}</h3><div class="thanksgiving-day-grid">${days.map(d=>`<button class="thanksgiving-day-btn" data-thanksgiving-day="${d.day}">${t('thanksgivingDay')} ${d.day}<br><span>${loc(d.title)}</span></button>`).join('')}</div></div>`;
  document.getElementById('startThanksgiving')?.addEventListener('click',()=>{selectedThanksgivingDay=1;localStorage.setItem('thanksgivingSelectedDay','1');renderThanksgiving();window.scrollTo({top:0,behavior:'smooth'});});
  root.querySelectorAll('[data-thanksgiving-day]').forEach(b=>b.addEventListener('click',()=>{selectedThanksgivingDay=parseInt(b.dataset.thanksgivingDay,10);localStorage.setItem('thanksgivingSelectedDay',String(selectedThanksgivingDay));renderThanksgiving();window.scrollTo({top:0,behavior:'smooth'});})); return;
 }
 if(selectedThanksgivingDay===999){ root.innerHTML=`<div class="hero-card"><h1>${intro.finalPrayerTitle}</h1><p>${intro.finalPrayer}</p><button class="btn light" id="backThanksgiving">${t('backToThanksgiving')}</button></div>`; document.getElementById('backThanksgiving')?.addEventListener('click',()=>{selectedThanksgivingDay=0;localStorage.setItem('thanksgivingSelectedDay','0');renderThanksgiving();}); return; }
 const day=days.find(d=>d.day===selectedThanksgivingDay)||days[0]; const note=localStorage.getItem(thanksgivingNoteKey(day.day))||'';
 root.innerHTML=`<div class="thanksgiving-day-card"><span class="day-label">${t('thanksgivingDay')} ${day.day}</span><h2>${loc(day.title)}</h2><div class="plan-section-title">${t('topicOfDay')}</div><p>${loc(day.topic)}</p><div class="plan-section-title">${t('verseOfDay')}</div><details class="plan-scripture-expand"><summary>${loc(day.ref)}</summary><p>${loc(day.verse)}</p></details><div class="plan-section-title">${t('todayInstruction')}</div><p>${loc(day.instruction)}</p><div class="plan-section-title">${t('practicalExercise')}</div><p>${loc(day.practice)}</p><div class="plan-section-title">${t('reflectionQuestion')}</div><p><strong>${loc(day.question)}</strong></p><div class="plan-section-title">${t('faithDeclaration')}</div><p class="daily-declaration">${loc(day.declaration)}</p><div class="plan-section-title">${t('thanksgivingNotes')}</div><p class="small">${t('notesHelp')}</p><textarea class="thanksgiving-notes" placeholder="${t('notePlaceholder')}">${note.replace(/</g,'&lt;')}</textarea><div class="thanksgiving-save-status small"></div><div class="plan-day-nav"><button class="btn light" id="backThanksgiving">${t('backToThanksgiving')}</button><button class="btn primary" id="nextThanksgiving">${day.day>=28?t('finishCourse'):t('nextDay')}</button></div></div>`;
 const ta=root.querySelector('.thanksgiving-notes'); if(ta){ autoGrowTextarea(ta); ta.addEventListener('input',()=>{autoGrowTextarea(ta);saveThanksgivingNote(day.day,ta.value);}); }
 document.getElementById('backThanksgiving')?.addEventListener('click',()=>{selectedThanksgivingDay=0;localStorage.setItem('thanksgivingSelectedDay','0');renderThanksgiving();window.scrollTo({top:0,behavior:'smooth'});});
 document.getElementById('nextThanksgiving')?.addEventListener('click',()=>{selectedThanksgivingDay=day.day>=28?999:day.day+1;localStorage.setItem('thanksgivingSelectedDay',String(selectedThanksgivingDay));renderThanksgiving();window.scrollTo({top:0,behavior:'smooth'});});
}



function renderNewBirthContent(){
 const root=document.getElementById('newBirthContent');
 if(!root || !window.newBirthContentData)return;
 const data=window.newBirthContentData[currentLang] || window.newBirthContentData.en;
 const videos=window.newBirthContentData.videos || [];
 root.innerHTML = `<div class="section-title"><h2>${data.title}</h2></div>
 <div class="hero-card salvation-hero"><h1>${data.title}</h1><p>${data.subtitle}</p></div>
 <div class="salvation-options">
 ${data.sections.map(sec=>{
   const intro=sec.intro?`<p class="salvation-prayer-instruction">${sec.intro}</p>`:'';
   const body=(sec.content||[]).map(p=>`<p>${p}</p>`).join('');
   const videoBlock=sec.id==='newbirth'?`<div class="video-list"><h3>${sec.videosTitle || t('newBirthVideos')}</h3>${videos.map((v,i)=>`<a class="btn secondary track-link" data-track="new_birth_video_${i+1}" href="${v[1]}" target="_blank" rel="noopener">${t('watchVideo')} ${i+1}</a>`).join('')}</div>`:'';
   const registerBlock=sec.id==='prayer'||sec.id==='life'?`<div class="register-after-salvation"><p>${t('salvationFormNote')}</p><a class="btn primary track-link" data-track="new_birth_register" href="${data.registerUrl}" target="_blank" rel="noopener">${data.registerText}</a></div>`:'';
   return `<details class="salvation-detail"><summary><span>${sec.title}</span><strong>${t('openSection')}</strong></summary><div class="salvation-detail-body">${intro}${body}${videoBlock}${registerBlock}</div></details>`;
 }).join('')}
 </div>`;
}



function syncOneSignalLanguageTag(){
 try{
  const lang=currentLang || localStorage.getItem('lang') || 'fa';
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async function(OneSignal){
    try{
      if(OneSignal.User && OneSignal.User.addTag){
        await OneSignal.User.addTag('language', lang);
        await OneSignal.User.addTag('app_language', lang);
      }else if(OneSignal.sendTag){
        OneSignal.sendTag('language', lang);
      }
    }catch(e){}
  });
 }catch(e){}
}
function handleInitialPageParam(){
 try{
  const params=new URLSearchParams(window.location.search);
  const page=params.get('page');
  const allowed=['home','plans','bible','bibleReader','word','declarations','meetings','newbirth','thanksgiving','more'];
  if(page && allowed.includes(page)){ setTimeout(()=>showPage(page),300); }
 }catch(e){}
}



let selectedBibleBook = localStorage.getItem('bibleBook') || 'JHN';
let selectedBibleChapter = parseInt(localStorage.getItem('bibleChapter') || '3',10);

function bibleBookName(book){ return book ? (book[currentLang]||book.en||book.id) : ''; }
function bibleRef(bookId, chapter, verse){
 const book=(window.bibleReaderData.books||[]).find(b=>b.id===bookId);
 const ch=currentLang==='fa'?toFaDigits(chapter):chapter;
 const vs=currentLang==='fa'?toFaDigits(verse):verse;
 return `${bibleBookName(book)} ${ch}:${vs}`;
}
function bibleKey(bookId, chapter, verse){ return `bible_${bookId}_${chapter}_${verse}`; }
function getBibleState(bookId, chapter, verse){ try{return JSON.parse(localStorage.getItem(bibleKey(bookId,chapter,verse))||'{}');}catch(e){return{};} }
function setBibleState(bookId, chapter, verse, state){ localStorage.setItem(bibleKey(bookId,chapter,verse), JSON.stringify(state||{})); }



let bibleReaderView = localStorage.getItem('bibleReaderView') || 'home';
let activeBibleSection = localStorage.getItem('bibleSection') || 'new';
let activeBibleVerseRef = null;

function sectionLabel(section){
 return section ? (section[currentLang]||section.en||section.id) : '';
}
function sectionDesc(section){
 return section && section.desc ? (section.desc[currentLang]||section.desc.en||'') : '';
}
function booksForActiveSection(){
 const data=window.bibleReaderData||{};
 return (data.books||[]).filter(b=>b.section===activeBibleSection);
}
function bibleBookName(book){
 return book ? (book[currentLang]||book.en||book.id) : '';
}
function setBibleSection(sectionId){
 if(sectionId!=='old' && sectionId!=='new') sectionId='new';
 activeBibleSection=sectionId;
 localStorage.setItem('bibleSection',sectionId);
 const books=booksForActiveSection();
 if(books[0]){
   selectedBibleBook=books[0].id;
   selectedBibleChapter=1;
   localStorage.setItem('bibleBook',selectedBibleBook);
   localStorage.setItem('bibleChapter','1');
 }
 bibleReaderView='books';
 localStorage.setItem('bibleReaderView','books');
 activeBibleVerseRef=null;
 renderBibleReader();
}
function setBibleReaderView(view){
 bibleReaderView=view;
 localStorage.setItem('bibleReaderView',view);
 activeBibleVerseRef=null;
 renderBibleReader();
}
function openBibleBook(bookId){
 const data=window.bibleReaderData||{};
 const book=(data.books||[]).find(b=>b.id===bookId);
 if(!book){return;}
 activeBibleSection=book.section || activeBibleSection;
 selectedBibleBook=bookId;
 selectedBibleChapter=1;
 localStorage.setItem('bibleSection',activeBibleSection);
 localStorage.setItem('bibleBook',selectedBibleBook);
 localStorage.setItem('bibleChapter','1');
 setBibleReaderView('reader');
}
function selectBibleChapter(chapter){
 selectedBibleChapter=parseInt(chapter,10)||1;
 localStorage.setItem('bibleChapter',String(selectedBibleChapter));
 activeBibleVerseRef=null;
 renderBibleReader();
}

function getBibleTextLang(){
 return (currentLang==='fa'||currentLang==='en'||currentLang==='hr')?currentLang:'fa';
}
function currentChapterVerses(){
 const data=window.bibleReaderData||{};
 const lang=(currentLang==='fa'||currentLang==='en'||currentLang==='hr')?currentLang:'fa';
 const chapterData=(((data.chapters||{})[selectedBibleBook]||{})[String(selectedBibleChapter)]||{});
 if(lang==='fa' && chapterData.fa && chapterData.fa.length) return chapterData.fa;
 if(lang==='hr' && chapterData.hr && chapterData.hr.length) return chapterData.hr;
 if(lang==='en' && chapterData.en && chapterData.en.length) return chapterData.en;
 return (chapterData.fa&&chapterData.fa.length?chapterData.fa:null) || (chapterData.en&&chapterData.en.length?chapterData.en:null) || chapterData.hr || [];
}
function getBibleChapterSequence(){
 const data=window.bibleReaderData||{};
 const books=(data.books||[]).filter(b=>b.section==='old'||b.section==='new');
 const seq=[];
 books.forEach(b=>{
  for(let ch=1; ch<=b.chapters; ch++) seq.push({bookId:b.id, chapter:ch});
 });
 return seq;
}
function dayOfYearForCroatia(){
 const now=new Date();
 const zagreb=new Date(now.toLocaleString('en-US',{timeZone:'Europe/Zagreb'}));
 const start=new Date(zagreb.getFullYear(),0,0);
 return Math.floor((zagreb-start)/86400000);
}
function daysSinceBaseForCroatia(){
 const now=new Date();
 const zagreb=new Date(now.toLocaleString('en-US',{timeZone:'Europe/Zagreb'}));
 const base=new Date(2026,0,1);
 return Math.floor((zagreb-base)/86400000)+1;
}
function readingPlanDay(plan){
 const schedule=(window.bibleReadingSchedule&&window.bibleReadingSchedule.oneYear)||[];
 const total=schedule.length || 365;
 const key='bibleOneYearPlanStartDate';
 let startDate=localStorage.getItem(key);
 const todayStr=new Date().toLocaleDateString('en-CA',{timeZone:'Europe/Zagreb'});
 if(!startDate){
   startDate=todayStr;
   localStorage.setItem(key,startDate);
 }
 const today=new Date(todayStr+'T00:00:00');
 const start=new Date(startDate+'T00:00:00');
 let diff=Math.floor((today-start)/86400000)+1;
 if(!Number.isFinite(diff) || diff<1) diff=1;
 if(diff>total) diff=total;
 return diff;
}
function readingPlanItems(plan){
 const schedule=(window.bibleReadingSchedule&&window.bibleReadingSchedule.oneYear)||[];
 if(schedule.length){
   const day=readingPlanDay('one');
   return (schedule[day-1]&&schedule[day-1].refs)||[];
 }
 const seq=getBibleChapterSequence();
 const totalDays=365;
 const day=readingPlanDay('one');
 const start=Math.floor((day-1)*seq.length/totalDays);
 const end=Math.floor(day*seq.length/totalDays);
 return seq.slice(start, Math.max(end,start+1));
}
function openReadingPlan(plan){
 bibleReaderView='reading-one';
 localStorage.setItem('bibleReaderView',bibleReaderView);
 renderBibleReader();
}
function openPlanChapter(bookId, chapter){
 const data=window.bibleReaderData||{};
 const book=(data.books||[]).find(b=>b.id===bookId);
 if(book) activeBibleSection=book.section;
 selectedBibleBook=bookId;
 selectedBibleChapter=parseInt(chapter,10)||1;
 localStorage.setItem('bibleSection',activeBibleSection);
 localStorage.setItem('bibleBook',selectedBibleBook);
 localStorage.setItem('bibleChapter',String(selectedBibleChapter));
 setBibleReaderView('reader');
}
function resetOneYearReadingPlan(){
 const todayStr=new Date().toLocaleDateString('en-CA',{timeZone:'Europe/Zagreb'});
 localStorage.setItem('bibleOneYearPlanStartDate', todayStr);
 bibleReaderView='reading-one';
 localStorage.setItem('bibleReaderView',bibleReaderView);
 renderBibleReader();
}

function renderReadingPlan(plan){
 const items=readingPlanItems(plan);
 const day=readingPlanDay(plan);
 const title=plan==='one'?t('oneYearPlan'):t('twoYearPlan');
 return `<div class="section-title"><h2>${title}</h2></div>
 <button type="button" class="btn ghost bible-back-btn" data-bible-view="home" onclick="setBibleReaderView('home')">← ${t('backToPlans')}</button>
 <div class="card reading-plan-card">
   <h3>${t('todayReading')}</h3>
   <p><strong>${t('planDay')}:</strong> ${currentLang==='fa'?toFaDigits(day):day}</p>
   <button type="button" class="btn light plan-reset-btn" onclick="window.resetOneYearReadingPlan()">${currentLang==='fa'?'شروع دوباره از روز اول':currentLang==='hr'?'Počni ponovno od prvog dana':'Restart from Day 1'}</button>
   <h4>${t('todaysChapters')}</h4>
   <div class="reading-plan-list">
     ${items.map(item=>{
       const b=(window.bibleReaderData.books||[]).find(x=>x.id===item.bookId);
       return `<button type="button" class="reading-plan-item" onclick="window.openPlanChapter(\'${item.bookId}\',${item.chapter})">
        <strong>${bibleBookName(b)} ${currentLang==='fa'?toFaDigits(item.chapter):item.chapter}</strong>
        <small>${t('openChapter')}</small>
       </button>`;
     }).join('')}
   </div>
 </div>
 <div class="reading-plan-full-text">
   ${items.map(item=>{
     const b=(window.bibleReaderData.books||[]).find(x=>x.id===item.bookId);
     const chapterObj=(((window.bibleReaderData.chapters||{})[item.bookId]||{})[String(item.chapter)]||{});
     const lang=getBibleTextLang();
     const verses=(lang==='fa'&&chapterObj.fa&&chapterObj.fa.length?chapterObj.fa:(lang==='hr'&&chapterObj.hr&&chapterObj.hr.length?chapterObj.hr:(lang==='en'&&chapterObj.en&&chapterObj.en.length?chapterObj.en:(chapterObj.fa&&chapterObj.fa.length?chapterObj.fa:chapterObj.en||chapterObj.hr||[]))));
     return `<div class="bible-chapter-card plan-chapter-block">
       <h3>${bibleBookName(b)} ${currentLang==='fa'?toFaDigits(item.chapter):item.chapter}</h3>
       <div class="bible-verses">${verses.map(v=>renderBibleVerse(item.bookId,item.chapter,v)).join('')}</div>
     </div>`;
   }).join('')}
 </div>`;
}

const APOCRYPHA_SOURCE_URL = 'https://www.gutenberg.org/cache/epub/124/pg124.txt';
let apocryphaLoading = false;
function apBookName(book){ return book ? (book[currentLang]||book.en||book.id) : ''; }
function getApocryphaIntro(){ const data=window.bibleReaderData||{}; const intro=data.apocryphaIntro||{}; return intro[currentLang]||intro.en||''; }
function apocryphaChapterCount(bookId){ const ch=((window.bibleReaderData||{}).chapters||{})[bookId]||{}; return Object.keys(ch).length; }
async function openApocryphaBook(bookId){
 const data=window.bibleReaderData||{};
 const book=(data.apocryphaBooks||[]).find(b=>b.id===bookId);
 if(!book)return;
 if(book.source==='external' && book.url){ window.open(book.url,'_blank','noopener'); return; }
 if(book.source==='pending'){ return; }
 selectedBibleBook=bookId; selectedBibleChapter=1; activeBibleSection='apocrypha'; localStorage.setItem('bibleSection','apocrypha'); localStorage.setItem('bibleBook',bookId); localStorage.setItem('bibleChapter','1');
 if(!(((data.chapters||{})[bookId]||{})['1'])) await loadApocryphaEnglish();
 setBibleReaderView('reader');
}
async function loadApocryphaEnglish(){
 const data=window.bibleReaderData||{};
 if(data.apocryphaLoaded || apocryphaLoading)return;
 apocryphaLoading=true;
 const root=document.getElementById('bibleReaderContent');
 if(root) root.innerHTML += `<div class="card"><p>${t('loadingText')}</p></div>`;
 try{
  const res=await fetch(APOCRYPHA_SOURCE_URL,{cache:'force-cache'});
  if(!res.ok) throw new Error('HTTP '+res.status);
  const txt=await res.text();
  parseApocryphaText(txt);
  data.apocryphaLoaded=true;
 }catch(e){
  console.warn(e);
  if(root) root.innerHTML += `<div class="card error-card"><p>${t('loadFailed')}</p><a class="btn gold" href="https://www.gutenberg.org/ebooks/124" target="_blank" rel="noopener">${t('sourceLink')}</a></div>`;
 }finally{ apocryphaLoading=false; }
}
function parseApocryphaText(txt){
 const data=window.bibleReaderData||{};
 data.chapters=data.chapters||{};
 const books=(data.apocryphaBooks||[]).filter(b=>b.source==='gutenberg124');
 const normalized=txt.replace(/\r/g,'').replace(/[ \t]+/g,' ');
 books.forEach((book,idx)=>{
   const start=normalized.indexOf(book.heading);
   if(start<0)return;
   let end=normalized.length;
   for(let j=idx+1;j<books.length;j++){
     const next=normalized.indexOf(books[j].heading,start+book.heading.length);
     if(next>0){end=next;break;}
   }
   let seg=normalized.slice(start+book.heading.length,end);
   seg=seg.replace(/\n/g,' ');
   const matches=[...seg.matchAll(/(\d+):(\d+)\s+([\s\S]*?)(?=\s+\d+:\d+\s+|\s+The End\b|\s+End of|$)/g)];
   data.chapters[book.id]={};
   matches.forEach(m=>{
     const ch=String(parseInt(m[1],10)); const v=parseInt(m[2],10); let verse=(m[3]||'').trim();
     verse=verse.replace(/\s+/g,' ').replace(/\[.*?\]/g,'').trim();
     if(!verse)return;
     data.chapters[book.id][ch]=data.chapters[book.id][ch]||{en:[],fa:[],hr:[]};
     data.chapters[book.id][ch].en.push({v,t:verse});
   });
 });
}
function renderBibleReader(){
 const root=document.getElementById('bibleReaderContent');
 if(!root)return;
 if(!window.bibleReaderData){
   root.innerHTML=`<div class="card"><p>${t('loadingBible')}</p></div>`;
   return;
 }
 const data=window.bibleReaderData;
 const sections=data.sections||[];
 const note=(data.meta&&data.meta.note)?(data.meta.note[currentLang]||data.meta.note.fa||data.meta.note.en):'';

 if(bibleReaderView==='reading-one' || bibleReaderView==='reading-two'){
   const plan='one';
   root.innerHTML=renderReadingPlan(plan);
   bindBibleReaderEvents(root);
   return;
 }

 if(bibleReaderView==='home'){
   const oldSec=(sections||[]).find(s=>s.id==='old') || {id:'old',fa:'عهد عتیق',en:'Old Testament',hr:'Stari zavjet',desc:{fa:'از پیدایش تا ملاکی',en:'From Genesis to Malachi',hr:'Od Postanka do Malahije'}};
   const newSec=(sections||[]).find(s=>s.id==='new') || {id:'new',fa:'عهد جدید',en:'New Testament',hr:'Novi zavjet',desc:{fa:'از متی تا مکاشفه',en:'From Matthew to Revelation',hr:'Od Mateja do Otkrivenja'}};
   root.innerHTML=`<div class="section-title"><h2>${t('bibleReaderTitle')}</h2></div>
   <div class="hero-card bible-reader-hero clean-bible-home">
     <img src="bible-icon.svg" class="bible-icon" alt="Bible">
     <h1>${t('bibleReaderTitle')}</h1>
     <p>${t('bibleReaderDesc')}</p>
   </div>
   <div class="bible-section-grid">
     <button type="button" class="bible-section-card" onclick="window.setBibleSection('old')">
       <span class="bible-section-icon">◈</span>
       <strong>${sectionLabel(oldSec)}</strong>
       <small>${sectionDesc(oldSec)}</small>
     </button>
     <button type="button" class="bible-section-card" onclick="window.setBibleSection('new')">
       <span class="bible-section-icon">✦</span>
       <strong>${sectionLabel(newSec)}</strong>
       <small>${sectionDesc(newSec)}</small>
     </button>
   </div>
   <div class="bible-reading-plans card">
     <h3>${t('readingPlans')}</h3>
     <div class="bible-section-grid">
       <button type="button" class="bible-section-card reading-plan-btn" onclick="window.openReadingPlan('one')"><span class="bible-section-icon">365</span><strong>${t('oneYearPlan')}</strong><small>${t('oneYearPlanDesc')}</small></button>
     </div>
   </div>`;
   bindBibleReaderEvents(root);
   return;
 }

 const books=booksForActiveSection();
 const currentSection=(sections||[]).find(s=>s.id===activeBibleSection);
 if(bibleReaderView==='books'){
   root.innerHTML=`<div class="section-title"><h2>${sectionLabel(currentSection)}</h2></div>
   <button type="button" class="btn ghost bible-back-btn" data-bible-view="home" onclick="setBibleReaderView('home')">← ${t('back')}</button>
   <div class="bible-reader-tools clean-search">
     <label class="bible-search-label">${t('searchBible')}<input id="bibleSearchInput" type="search" placeholder="${t('searchPlaceholder')}"></label>
   </div>
   <div id="bibleSearchResults" class="bible-search-results"></div>
   <h3 class="books-section-heading">${t('booksInSection')}</h3>
   <div class="bible-book-grid">
     ${books.map(b=>`<button type="button" class="bible-book-card" onclick="window.openBibleBook('${b.id}')"><strong>${bibleBookName(b)}</strong><small>${currentLang==='fa'?toFaDigits(b.chapters):b.chapters} ${t('chapters')}</small></button>`).join('')}
   </div>`;
   bindBibleReaderEvents(root);
   document.getElementById('bibleSearchInput')?.addEventListener('input',e=>renderBibleSearch(e.target.value));
   return;
 }

 const allBooks=(data.books||[]);
 let book=allBooks.find(b=>b.id===selectedBibleBook);
 
 if(!book){
   root.innerHTML=`<div class="card"><p>${t('selectBookFirst')}</p><button class="btn primary" data-bible-view="home">${t('back')}</button></div>`;
   bindBibleReaderEvents(root);
   return;
 }
 const maxCh=book.chapters||1;
 if(selectedBibleChapter>maxCh)selectedBibleChapter=1;
 const verses=currentChapterVerses();
 root.innerHTML=`<div class="section-title"><h2>${bibleBookName(book)}</h2></div>
 <button type="button" class="btn ghost bible-back-btn" data-bible-view="books" onclick="setBibleReaderView('books')">← ${t('back')}</button>
 <div class="bible-reader-tools">
   ${activeBibleSection!=='apocrypha'?`<label>${t('selectBook')}<select id="bibleBookSelect">${books.map(b=>`<option value="${b.id}" ${b.id===selectedBibleBook?'selected':''}>${bibleBookName(b)}</option>`).join('')}</select></label>`:''}
   <label>${t('selectChapter')}<select id="bibleChapterSelect">${Array.from({length:maxCh},(_,i)=>`<option value="${i+1}" ${i+1===selectedBibleChapter?'selected':''}>${currentLang==='fa'?toFaDigits(i+1):i+1}</option>`).join('')}</select></label>
   <label class="bible-search-label">${t('searchBible')}<input id="bibleSearchInput" type="search" placeholder="${t('searchPlaceholder')}"></label>
 </div>
 <p class="tap-verse-hint">${t('tapVerseHint')}</p>
 <div id="bibleSearchResults" class="bible-search-results"></div>
 <div class="bible-chapter-card">
   <h3>${bibleBookName(book)} ${currentLang==='fa'?toFaDigits(selectedBibleChapter):selectedBibleChapter}</h3>
   <div class="bible-verses">${verses.length?verses.map(v=>renderBibleVerse(selectedBibleBook,selectedBibleChapter,v)).join(''):`<p class="empty-note">${t('noBibleText')}</p>`}</div>
 </div>`;
 bindBibleReaderEvents(root);
 document.getElementById('bibleBookSelect')?.addEventListener('change',e=>openBibleBook(e.target.value));
 document.getElementById('bibleChapterSelect')?.addEventListener('change',e=>selectBibleChapter(e.target.value));
 document.getElementById('bibleSearchInput')?.addEventListener('input',e=>renderBibleSearch(e.target.value));
}

function bindBibleReaderEvents(root){
 root.querySelectorAll('[data-bible-section]').forEach(btn=>btn.onclick=()=>setBibleSection(btn.dataset.bibleSection));
 root.querySelectorAll('[data-bible-book]').forEach(btn=>btn.onclick=()=>openBibleBook(btn.dataset.bibleBook));
 root.querySelectorAll('[data-apocrypha-book]').forEach(btn=>btn.onclick=()=>openApocryphaBook(btn.dataset.apocryphaBook));
 root.querySelectorAll('[data-bible-view]').forEach(btn=>btn.onclick=()=>setBibleReaderView(btn.dataset.bibleView));
 root.querySelectorAll('[data-reading-plan]').forEach(btn=>btn.onclick=()=>openReadingPlan(btn.dataset.readingPlan));
 root.querySelectorAll('[data-plan-book]').forEach(btn=>btn.onclick=()=>openPlanChapter(btn.dataset.planBook, btn.dataset.planChapter));
 root.querySelectorAll('[data-bible-chapter]').forEach(btn=>btn.onclick=()=>selectBibleChapter(btn.dataset.bibleChapter));
 root.querySelectorAll('[data-verse-toggle]').forEach(btn=>{
   btn.onclick=()=>toggleVerseTools(btn.dataset.book,parseInt(btn.dataset.chapter,10),parseInt(btn.dataset.verse,10));
 });
}

function getVerseKeyTerms(bookId, chapter, verse){
 const data=window.bibleReaderData||{};
 return ((data.keyTerms||{})[`${bookId}.${chapter}.${verse}`]) || [];
}

function renderBibleVerse(bookId, chapter, verseObj){
 const st=getBibleState(bookId,chapter,verseObj.v);
 const terms=getVerseKeyTerms(bookId,chapter,verseObj.v);
 const ref=`${bookId}.${chapter}.${verseObj.v}`;
 const isActive=activeBibleVerseRef===ref;
 const cls=['bible-verse','clean-verse'];
 if(st.highlight)cls.push('hl-'+st.highlight);
 if(st.bold)cls.push('verse-bold');
 if(st.read)cls.push('verse-read');
 if(isActive)cls.push('verse-active');
 return `<div class="${cls.join(' ')}" data-bible-verse="${verseObj.v}">
  <button type="button" class="bible-verse-line clean-verse-line" onclick="window.toggleVerseTools(\'${bookId}\',${chapter},${verseObj.v})">
    <span class="verse-number">${currentLang==='fa'?toFaDigits(verseObj.v):verseObj.v}</span>
    <span class="verse-text">${verseObj.t}</span>
    <span class="verse-status">${st.bookmark?'★':''}${st.note?' ✎':''}${st.read?' ✓':''}</span>
  </button>
  ${isActive?renderVerseTools(bookId,chapter,verseObj,st,terms):''}
  ${st.note?`<div class="bible-note-preview">${st.note}</div>`:''}
 </div>`;
}

function toggleVerseTools(bookId, chapter, verse){
 const ref=`${bookId}.${chapter}.${verse}`;
 activeBibleVerseRef=(activeBibleVerseRef===ref)?null:ref;
 renderBibleReader();
}

function renderVerseTools(bookId, chapter, verseObj, st, terms){
 return `<div class="verse-tools-panel">
   <div class="verse-tools-title">${t('verseOptions')} — ${bibleRef(bookId,chapter,verseObj.v)}</div>
   <div class="verse-tool-buttons">
     <button type="button" onclick="toggleBibleState('${bookId}',${chapter},${verseObj.v},'bookmark')">${st.bookmark?'★':'☆'} ${t('bookmark')}</button>
     <button type="button" onclick="toggleBibleState('${bookId}',${chapter},${verseObj.v},'read')">✓ ${t('markRead')}</button>
     <button type="button" onclick="toggleBibleState('${bookId}',${chapter},${verseObj.v},'bold')">B ${t('boldVerse')}</button>
     <button type="button" onclick="setBibleHighlight('${bookId}',${chapter},${verseObj.v},'yellow')">▣ ${t('highlightYellow')}</button>
     <button type="button" onclick="setBibleHighlight('${bookId}',${chapter},${verseObj.v},'green')">▣ ${t('highlightGreen')}</button>
     <button type="button" onclick="setBibleHighlight('${bookId}',${chapter},${verseObj.v},'blue')">▣ ${t('highlightBlue')}</button>
     <button type="button" onclick="setBibleHighlight('${bookId}',${chapter},${verseObj.v},'pink')">▣ ${t('highlightPink')}</button>
     <button type="button" onclick="setBibleHighlight('${bookId}',${chapter},${verseObj.v},'')">× ${t('removeHighlight')}</button>
     ${terms.length?`<button type="button" class="keyterm-btn" onclick="toggleKeyTerms('${bookId}',${chapter},${verseObj.v})">🔎 ${t('keyWords')}</button>`:''}
     <button type="button" onclick="activeBibleVerseRef=null;renderBibleReader()">× ${t('close')}</button>
   </div>
   ${terms.length?`<div id="keyterms-${bookId}-${chapter}-${verseObj.v}" class="keyterms-panel" hidden>${renderKeyTerms(terms)}</div>`:''}
   <div class="verse-note-editor">
     <textarea id="note-${bookId}-${chapter}-${verseObj.v}" maxlength="1000" placeholder="${t('notePlaceholderBible')}">${st.note||''}</textarea>
     <button type="button" class="btn primary" onclick="saveBibleNote('${bookId}',${chapter},${verseObj.v})">${t('saveNote')}</button>
   </div>
 </div>`;
}

function renderKeyTerms(terms){
 return terms.map(term=>{
  const label=(term.term&& (term.term[currentLang]||term.term.en||term.term.fa)) || '';
  const pron=(term.pronunciation&& (term.pronunciation[currentLang]||term.pronunciation.en||term.pronunciation.fa)) || '';
  const meaning=(term.meaning&& (term.meaning[currentLang]||term.meaning.en||term.meaning.fa)) || '';
  return `<div class="keyterm-card">
   <div class="keyterm-title">${label}</div>
   <div><strong>${t('originalWord')}:</strong> <span dir="ltr">${term.original||''}</span></div>
   <div><strong>${t('pronunciation')}:</strong> ${pron}</div>
   <div><strong>${t('meaning')}:</strong> ${meaning}</div>
  </div>`;
 }).join('');
}
function toggleKeyTerms(bookId, chapter, verse){
 const el=document.getElementById(`keyterms-${bookId}-${chapter}-${verse}`);
 if(el) el.hidden=!el.hidden;
}
function saveBibleNote(bookId, chapter, verse){
 const st=getBibleState(bookId,chapter,verse);
 const el=document.getElementById(`note-${bookId}-${chapter}-${verse}`);
 st.note=(el?.value||'').slice(0,1000);
 setBibleState(bookId,chapter,verse,st);
 renderBibleReader();
}
function setBibleHighlight(bookId, chapter, verse, color){
 const st=getBibleState(bookId,chapter,verse);
 st.highlight=color||'';
 setBibleState(bookId,chapter,verse,st);
 renderBibleReader();
}

function toggleBibleState(bookId, chapter, verse, key){
 const st=getBibleState(bookId,chapter,verse); st[key]=!st[key]; setBibleState(bookId,chapter,verse,st); renderBibleReader();
}
function cycleBibleHighlight(bookId, chapter, verse){
 const colors=['yellow','green','blue','pink',''];
 const st=getBibleState(bookId,chapter,verse);
 const idx=colors.indexOf(st.highlight||'');
 st.highlight=colors[(idx+1)%colors.length]||'';
 setBibleState(bookId,chapter,verse,st); renderBibleReader();
}
function openBibleNote(bookId, chapter, verse){
 const st=getBibleState(bookId,chapter,verse);
 const current=st.note||'';
 const txt=prompt(`${bibleRef(bookId,chapter,verse)}\n${t('noteLimit')}`, current);
 if(txt===null)return;
 st.note=txt.slice(0,1000);
 setBibleState(bookId,chapter,verse,st); renderBibleReader();
}


function renderBibleSearch(q){
 const root=document.getElementById('bibleSearchResults'); if(!root)return;
 q=String(q||'').trim().toLowerCase();
 if(!q){root.innerHTML='';return;}
 const results=[];
 const data=window.bibleReaderData||{};
 let allowedBooks;
 if(activeBibleSection==='old'||activeBibleSection==='new') allowedBooks=new Set(booksForActiveSection().map(b=>b.id));
 else allowedBooks=new Set([...(data.books||[]).map(b=>b.id), ...(data.apocryphaBooks||[]).map(b=>b.id)]);
 Object.keys(data.chapters||{}).forEach(bookId=>{
  if(!allowedBooks.has(bookId))return;
  Object.keys(data.chapters[bookId]||{}).forEach(ch=>{
   const chapterObj=(data.chapters[bookId][ch]||{});
   const arr=chapterObj[currentLang] || chapterObj.fa || chapterObj.en || chapterObj.hr || [];
   arr.forEach(v=>{
    if(String(v.t).toLowerCase().includes(q) || bibleRef(bookId,ch,v.v).toLowerCase().includes(q)){
      results.push({bookId,ch,v});
    }
   });
  });
 });
 root.innerHTML=`<div class="card"><h3>${t('bibleSearchResults')}</h3>${results.length?results.slice(0,40).map(r=>`<button type="button" class="bible-search-result" data-search-book="${r.bookId}" data-search-chapter="${r.ch}">${bibleRef(r.bookId,r.ch,r.v.v)} — ${r.v.t}</button>`).join(''):`<p>${t('noResults')}</p>`}</div>`;
 root.querySelectorAll('[data-search-book]').forEach(btn=>btn.onclick=()=>{
   const bookId=btn.dataset.searchBook;
   const canonical=(window.bibleReaderData.books||[]).find(b=>b.id===bookId);
   if(canonical) activeBibleSection=canonical.section||activeBibleSection; else activeBibleSection='apocrypha';
   selectedBibleBook=bookId;
   selectedBibleChapter=parseInt(btn.dataset.searchChapter,10)||1;
   localStorage.setItem('bibleSection',activeBibleSection);
   localStorage.setItem('bibleBook',selectedBibleBook);
   localStorage.setItem('bibleChapter',String(selectedBibleChapter));
   setBibleReaderView('reader');
 });
}





document.addEventListener('click', function(ev){
 const bibleRoot = ev.target.closest('#bibleReaderContent');
 if(!bibleRoot) return;
 const sectionBtn = ev.target.closest('[data-bible-section]');
 if(sectionBtn){ ev.preventDefault(); setBibleSection(sectionBtn.dataset.bibleSection); return; }
 const bookBtn = ev.target.closest('[data-bible-book]');
 if(bookBtn){ ev.preventDefault(); openBibleBook(bookBtn.dataset.bibleBook); return; }
 const viewBtn = ev.target.closest('[data-bible-view]');
 if(viewBtn){ ev.preventDefault(); setBibleReaderView(viewBtn.dataset.bibleView); return; }
 const planBtn = ev.target.closest('[data-reading-plan]');
 if(planBtn){ ev.preventDefault(); openReadingPlan(planBtn.dataset.readingPlan); return; }
 const planChapter = ev.target.closest('[data-plan-book]');
 if(planChapter){ ev.preventDefault(); openPlanChapter(planChapter.dataset.planBook, planChapter.dataset.planChapter); return; }
 const verseBtn = ev.target.closest('[data-verse-toggle]');
 if(verseBtn){ ev.preventDefault(); toggleVerseTools(verseBtn.dataset.book, parseInt(verseBtn.dataset.chapter,10), parseInt(verseBtn.dataset.verse,10)); return; }
}, true);



// V44: expose Bible functions explicitly for inline handlers
window.setBibleSection = setBibleSection;
window.openBibleBook = openBibleBook;
window.openReadingPlan = openReadingPlan;
window.openPlanChapter = openPlanChapter;
window.setBibleReaderView = setBibleReaderView;
window.toggleVerseTools = toggleVerseTools;
window.setBibleHighlight = setBibleHighlight;
window.toggleBibleState = toggleBibleState;
window.saveBibleNote = saveBibleNote;
window.toggleKeyTerms = toggleKeyTerms;

document.addEventListener('DOMContentLoaded',()=>{ document.querySelectorAll('.lang-toggle button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang))); document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page))); document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.open)));
 document.querySelectorAll('[data-open-bible-home]').forEach(b=>b.addEventListener('click',openBibleHome)); document.querySelectorAll('.enable-notifications').forEach(b=>b.addEventListener('click',enableNotifications)); loadAnalyticsIfConfigured(); setLang(currentLang); });
