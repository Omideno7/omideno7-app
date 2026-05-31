/* Patch: fixed Spiritual Audio card display on Home fallback. Replace only app-v45.js. */
/* Patch: professional audio sharing, speed controls, notes, My Notes page, and saved items dashboard. Replace only app-v45.js. */
/* Patch: removed All Messages, Sermons, and Prayers tabs from Spiritual Audio Messages. Replace only app-v45.js. */
/* Patch: added 10 Persian short audio messages to Spiritual Audio Messages. Replace app-v45.js and upload audio folder. */
/* Patch: added Persian spiritual audio messages section in Home. Replace app-v45.js and upload audio folder. */
/* Patch: removed leftover separate non-food fasting options block. Replace only this file: app-v45.js */
/* Patch: fasting layout refined: active pillar buttons, removed duplicate teaching/journal menu cards, merged non-food fast types, custom topic dropdown. Replace only this file: app-v45.js */
/* Patch: updated fasting biblical teaching, Daniel fast note, non-food fast options, removed reminder, updated topics. Replace only this file: app-v45.js */
/* Patch: removed fasting health/medical warning section. Replace only this file: app-v45.js */
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


(function(){
 if(document.getElementById('fasting-v46-style')) return;
 const s=document.createElement('style'); s.id='fasting-v46-style';
 s.textContent=`
 .fasting-hero{border-top:5px solid var(--gold);}
 .fasting-pillars{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin:12px 0;}
 .fasting-pillars button{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px;text-align:center;font-weight:900;color:var(--blue);font-family:inherit;cursor:pointer;} .pillar-panel-card textarea{width:100%;min-height:130px;border:1px solid var(--line);border-radius:14px;padding:12px;font-family:inherit;}
 .fasting-menu{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;}
 .fasting-menu .plan-list-card{text-align:start;cursor:pointer;}
 .fa .fasting-menu .plan-list-card{text-align:right;}
 .fasting-form select,.fasting-form input,.fasting-form textarea,.active-fasting-card textarea,.active-fasting-card input{width:100%;border:1px solid var(--line);border-radius:14px;padding:12px;margin:7px 0;background:#fff;font-family:inherit;}
 .fasting-form textarea,.active-fasting-card textarea{min-height:110px;}
 .fasting-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;}
 .fasting-teaching summary{font-weight:950;color:var(--blue);cursor:pointer;}
 .active-fasting-card{border-top:5px solid var(--green);}
 .fasting-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;}
 .stat-card strong{display:block;font-size:28px;color:var(--blue);}
 .stat-card span{font-weight:800;color:var(--muted);}
 .journal-card{border-inline-start:5px solid var(--gold);}
 .fasting-plan-list-card{border-top:5px solid var(--gold);}
 .check-row{display:flex;gap:8px;align-items:center;font-weight:800;}
 .fa .check-row{flex-direction:row-reverse;justify-content:flex-end;}
 `;
 document.head.appendChild(s);
})();


(function(){
 if(document.getElementById('fasting-cleanup-v45-style')) return;
 const s=document.createElement('style'); s.id='fasting-cleanup-v45-style';
 s.textContent='.hide-leftover-nonfood{display:none!important;}';
 document.head.appendChild(s);
 const hideLeftover=()=>{
   document.querySelectorAll('details').forEach(d=>{
     const txt=(d.querySelector('summary')?.textContent||'').trim();
     if(txt.includes('گزینه‌های روزه غیرغذایی') || txt.includes('Non-food fast options') || txt.includes('Mogućnosti posta bez hrane')){
       d.classList.add('hide-leftover-nonfood');
     }
   });
 };
 document.addEventListener('click',()=>setTimeout(hideLeftover,50));
 setTimeout(hideLeftover,500);
})();


(function(){
 if(document.getElementById('spiritual-audio-style')) return;
 const s=document.createElement('style'); s.id='spiritual-audio-style';
 s.textContent=`
 .audio-home-card{border-top:5px solid var(--gold);}
 .audio-hero{border-top:5px solid var(--gold);}
 .audio-category-row{display:flex;gap:8px;overflow-x:auto;margin:12px 0;padding-bottom:6px;}
 .audio-cat-btn{border:1px solid var(--line);background:#fff;border-radius:999px;padding:9px 13px;font-weight:900;color:var(--blue);white-space:nowrap;cursor:pointer;font-family:inherit;}
 .audio-cat-btn.active{background:var(--blue);color:#fff;border-color:var(--blue);}
 .audio-message-card{border-inline-start:5px solid var(--gold);}
 .audio-message-head h3{margin:8px 0 6px;}
 .audio-tag{display:inline-block;background:#FFF8E8;border:1px solid #E9D69A;color:#6B4A00;border-radius:999px;padding:4px 10px;font-weight:900;font-size:12px;}
 .audio-message-card audio{width:100%;margin-top:10px;}
 `;
 document.head.appendChild(s);
})();


(function(){
 if(document.getElementById('audio-notes-share-style')) return;
 const s=document.createElement('style'); s.id='audio-notes-share-style';
 s.textContent=`
 .audio-control-bar,.audio-speed-row,.audio-action-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center}
 .audio-control-bar button,.audio-speed-row button{border:1px solid var(--line);background:#fff;border-radius:12px;padding:8px 10px;font-weight:900;color:var(--blue);font-family:inherit;cursor:pointer}
 .audio-speed-row button.active{background:var(--blue);color:#fff;border-color:var(--blue)}
 .audio-note-box{margin-top:10px;background:#F8FAFC;border:1px solid var(--line);border-radius:16px;padding:12px}
 .audio-note-box textarea{width:100%;min-height:150px;border:1px solid var(--line);border-radius:14px;padding:12px;font-family:inherit}
 .note-tools{display:flex;gap:10px;align-items:center;margin-top:8px}
 .my-notes-home-card{border-top:5px solid var(--green)}
 .saved-items-home-card{border-top:5px solid var(--gold)}
 .my-note-item{margin-top:10px;border-inline-start:5px solid var(--gold)}
 `;
 document.head.appendChild(s);
})();

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


/* V46 Fasting Journey inside Plans */
let fastingView = localStorage.getItem('fastingView') || 'home';

function fastingStore(){
 try { return JSON.parse(localStorage.getItem('omideno7FastingStore') || '{"active":[],"journal":[],"completed":[],"testimonies":[]}'); }
 catch(e){ return {"active":[],"journal":[],"completed":[],"testimonies":[]}; }
}
function saveFastingStore(store){ localStorage.setItem('omideno7FastingStore', JSON.stringify(store)); }

const fastingTexts = {
 fa:{
  title:"مسیر روزه و مکاشفه",
  subtitle:"روزه، فقط نخوردن نیست؛ وارد شدن به تمرکز عمیق‌تر با خداوند است.",
  intro:"روزه مسیحی فقط نخوردن غذا نیست؛ جدا کردن زمان برای خدا، شنیدن کلام، دعا، تعمق و تقویت روح است.",
  shortTeachingTitle:"تعلیم کوتاه درباره روزه",
  shortTeaching:"ما به عنوان ایمانداران و شاگردان مسیح روزه می‌گیریم تا جسم خود را در اطاعت روح خدا قرار دهیم. روزه ما مسیحیان جنبه مذهبی ندارد. برای همین عیسی در متی ۶:۱۶-۱۸ فرمود: «وقتی روزه می‌گیرید مانند ریاکاران، خودتان را پریشان نشان ندهید. آنان قیافه‌های خود را تغییر می‌دهند تا روزه‌دار بودن خود را به رخ دیگران بکشند. یقین بدانید که آنها اجر خود را یافته‌اند! اما تو وقتی روزه می‌گیری، سر خود را شانه کن و صورت خود را بشوی تا مردم از روزه تو باخبر نشوند، بلکه فقط پدر تو که در نهان است، آن را بداند و پدری که هیچ چیز از نظر او پنهان نیست، اجر تو را خواهد داد.»\n\nچون هدف روزه این است که جسم تحت اراده روح حرکت کند، باید بدانیم وقتی از جسم صحبت می‌کنیم، منظور فقط بدن فیزیکی نیست، بلکه طرز فکر، خواسته‌ها، واکنش‌ها و تمایلات نفسانی ما نیز هست. عیسی مسیح قبل از شروع خدمت زمینی خود به ما نشان داد که روزه می‌تواند جسم را در اطاعت اراده خداوند قرار دهد. در متی ۴:۱-۱۱ می‌بینیم که عیسی روزه گرفت و در برابر وسوسه‌ها با کلام خدا ایستاد. اما عیسی روزه نگرفت تا پدر از او راضی‌تر شود، زیرا قبل از روزه، وقتی روح‌القدس بر او قرار گرفت، پدر گفت: «این است پسر محبوب من که از او خشنودم.» بنابراین روزه نباید در زندگی ما جنبه مذهبی پیدا کند. ما تقدس و عادل‌شمردگی خود را از طریق قربانی کامل و پسندیده خداوند عیسی مسیح دریافت کرده‌ایم، نه از طریق گرسنگی یا اعمال مذهبی.\n\nروزه به ما کمک می‌کند راحت‌تر تمایلات روح‌القدس را در زندگی خود به مرحله عمل درآوریم. اگر دائماً از جسم خود پیروی کنیم، انجام دادن خواسته‌های روح‌القدس برای ما دشوار خواهد بود. روزه باعث می‌شود درون ما شفاف‌تر، متمرکزتر و آماده‌تر شود و قدرت و جلال خداوند بیشتر در زندگی ما نمایان گردد. روزه ما را مقدس‌تر نمی‌کند؛ چنین تفکری مذهبی است و نشان‌دهنده عدم شناخت کامل نجات و کار مسیح در زندگی ایماندار است. روزه ما را به مسیری می‌برد که روح ما حساس‌تر، قلب ما متمرکزتر و زندگی ما مطیع‌تر نسبت به کلام و هدایت روح‌القدس شود.\n\nروزه دانیال در کتاب دانیال دیده می‌شود. در دانیال ۱:۸-۱۶، دانیال و دوستانش تصمیم گرفتند خود را با خوراک پادشاه آلوده نکنند و خوراک ساده‌تری را انتخاب کردند. در دانیال ۱۰:۲-۳ نیز دانیال برای مدت سه هفته از خوراک‌های لذیذ، گوشت و شراب پرهیز کرد و در مسیر دعا و تعمق قرار گرفت. بنابراین روزه دانیال معمولاً به‌عنوان روزه‌ای شناخته می‌شود که در آن شخص از خوراک‌های سنگین، لذت‌های غذایی و چیزهایی که تمرکز او را می‌گیرند پرهیز می‌کند تا زمان بیشتری برای دعا، کلام و تعمق داشته باشد. روزه دانیال قانون مذهبی نیست؛ یک ابزار نظم روحانی برای تمرکز عمیق‌تر بر خداوند است.",
  start:"شروع روزه جدید", active:"روزه‌های فعال من", journal:"دفتر مکاشفات من", stats:"آمار رشد روحانی من", teaching:"تعلیم کتاب‌مقدسی درباره روزه",
  typeLabel:"نوع روزه خود را انتخاب کنید", schedule:"تعیین زمان روزه", topic:"موضوع روزه", customTopic:"موضوع شخصی من", save:"ذخیره و شروع روزه", back:"بازگشت", noActive:"فعلاً روزه فعالی ثبت نشده است.", activeFast:"روزه فعال شما", currentDay:"روز فعلی", todayVerse:"آیه امروز", todayTeaching:"تعلیم کوتاه امروز", todayPrayer:"دعای امروز", todayDeclaration:"اعلان ایمانی امروز", revelationToday:"دفتر مکاشفه امروز", saveNote:"ذخیره یادداشت", endFast:"پایان روزه", completed:"آفرین! شما مسیر روزه خود را کامل کردید. شما فقط چند ساعت یا چند روز از غذا دور نشدید؛ بلکه زمانی را برای خداوند جدا کردید. آنچه دریافت کرده‌اید را حفظ کنید، روی کلام بایستید و با ایمان ادامه دهید.", reset:"شروع روزه جدید", personalStatsNote:"این آمار برای فخر کردن نیست؛ بلکه برای دیدن وفاداری، استمرار و رشد شخصی شما در مسیر خداوند است.",
  fields:{type:"نوع", startDate:"تاریخ شروع", endDate:"تاریخ پایان", startTime:"ساعت شروع", endTime:"ساعت پایان", reminder:"یادآوری می‌خواهم", note:"یادداشت مکاشفه", feeling:"ثبت احساس و وضعیت روحانی"},
  types:["روزه چند ساعته","روزه یک‌روزه","روزه چندروزه","روزه دانیال","روزه فقط با آب","روزه غیرغذایی","روزه شخصی با تنظیم دلخواه","روزه گروهی کلیسا"],
  nonFood:["روزه شبکه‌های اجتماعی","روزه تلویزیون و سرگرمی","روزه صحبت‌های منفی","روزه عادت‌های مزاحم","روزه زمان برای دعا و کلام","روزه پاکی چشم","روزه پاکی زبان","روزه پاکی گوش","روزه خشم","روزه حسادت"],
  topics:["نزدیکی بیشتر با خداوند","شنیدن صدای خدا","هدایت برای تصمیم مهم","رشد روحانی","تقدیس و پاکی","دعا برای خانواده","دعا برای کلیسا","دعا برای شفا","دعا برای خدمت","دعا برای نجات جان‌ها","تقویت ایمان","غلبه بر ترس","غلبه بر وسوسه","دریافت مکاشفه از کلام خدا","آمادگی برای خدمت","روزه شکرگزاری","روزه برای بیداری روحانی","روزه و دعا برای خادمین انجیل","روزه و دعا برای شبانم","موضوع شخصی من"],
  placeholders:{custom:"مثلاً: برای هدایت خداوند در مورد کار و خدمت آینده‌ام.", journal:"امروز خداوند چه چیزی به قلب من گذاشت؟ چه آیه‌ای با من صحبت کرد؟ چه تصمیمی باید بگیرم؟", feeling:"مثلاً: آرام، متمرکز، نیازمند قوت، پر از ایمان..."},
  group:"روزه گروهی کلیسا", groupText:"این بخش برای روزه‌های مشترک کلیسای امیدنو۷ آماده شده است. رهبر کلیسا می‌تواند موضوع، تاریخ، آیات مشترک، دعا و اعلان روزانه را تعریف کند.", testimony:"ثبت شهادت", noJournal:"هنوز یادداشتی ثبت نشده است."
 },
 en:{
  title:"Fasting Journey & Revelation",
  subtitle:"Fasting is not only abstaining from food; it is entering deeper focus with God.",
  intro:"Christian fasting is not only about not eating food; it is setting apart time for God, hearing the Word, praying, meditating, and strengthening the spirit.",
  shortTeachingTitle:"Short Teaching on Fasting",
  shortTeaching:"As believers and disciples of Christ, we fast so that the body may come under the obedience of the Spirit of God. Christian fasting is not religious in nature. This is why Jesus said in Matthew 6:16-18: “When you fast, don’t be like the hypocrites, with sad faces. For they disfigure their faces, that they may be seen by men to be fasting. Most certainly I tell you, they have received their reward. But you, when you fast, anoint your head and wash your face, so that you are not seen by men to be fasting, but by your Father who is in secret; and your Father, who sees in secret, will reward you.”\n\nBecause the purpose of fasting is to help the body move under the will of the spirit, we must understand that when we speak about the flesh, we do not mean only the physical body. We also mean our thinking, desires, reactions, and fleshly tendencies. Before beginning His earthly ministry, Jesus Christ showed us that fasting can bring the body into submission to the will of God. In Matthew 4:1-11, Jesus fasted and stood against temptation with the Word of God. But Jesus did not fast so the Father would be more pleased with Him, because before the fast, when the Holy Spirit came upon Him, the Father said, “This is my beloved Son, in whom I am well pleased.” Therefore, fasting must not become religious in our lives. We have received our holiness and righteousness through the complete and acceptable sacrifice of the Lord Jesus Christ, not through hunger or religious works.\n\nFasting helps us more easily put the desires of the Holy Spirit into action in our lives. If we constantly follow the flesh, doing what the Holy Spirit desires will always be difficult for us. Fasting helps our inner life become clearer, more focused, and more prepared, so that the power and glory of the Lord may be manifested more fully in our lives. Fasting does not make us holier; that kind of thinking is religious and shows a lack of understanding of salvation and the finished work of Christ in the believer’s life. Fasting leads us into a path where our spirit becomes more sensitive, our heart more focused, and our life more obedient to the Word and the guidance of the Holy Spirit.\n\nThe Daniel fast is seen in the book of Daniel. In Daniel 1:8-16, Daniel and his friends decided not to defile themselves with the king’s food and chose simpler food. In Daniel 10:2-3, Daniel also abstained for three weeks from pleasant food, meat, and wine while giving himself to prayer and meditation. Therefore, the Daniel fast is commonly understood as a fast in which a person abstains from heavy foods, food pleasures, and things that take away focus, so that more time may be given to prayer, the Word, and meditation. The Daniel fast is not a religious law; it is a tool of spiritual discipline for deeper focus on the Lord.",
  start:"Start a New Fast", active:"My Active Fasts", journal:"My Revelation Journal", stats:"My Spiritual Growth Stats", teaching:"Biblical Teaching on Fasting",
  typeLabel:"Choose your fasting type", schedule:"Set fasting time", topic:"Fasting focus", customTopic:"My personal focus", save:"Save and Start Fast", back:"Back", noActive:"No active fast has been recorded yet.", activeFast:"Your Active Fast", currentDay:"Current day", todayVerse:"Today’s Verse", todayTeaching:"Today’s Short Teaching", todayPrayer:"Today’s Prayer", todayDeclaration:"Today’s Faith Declaration", revelationToday:"Today’s Revelation Journal", saveNote:"Save Note", endFast:"Finish Fast", completed:"Well done! You completed your fasting journey. You did not merely stay away from food for hours or days; you set apart time for the Lord. Keep what you received, stand on the Word, and continue by faith.", reset:"Start New Fast", personalStatsNote:"These statistics are not for pride, but to help you see faithfulness, consistency, and personal growth in your walk with God.",
  fields:{type:"Type", startDate:"Start date", endDate:"End date", startTime:"Start time", endTime:"End time", reminder:"I want reminders", note:"Revelation note", feeling:"Record feeling and spiritual condition"},
  types:["Several-hour fast","One-day fast","Multi-day fast","Daniel fast","Water-only fast","Non-food fast","Custom personal fast","Church group fast"],
  nonFood:["Social media fast","TV and entertainment fast","Negative speech fast","Distracting habits fast","Time set apart for prayer and the Word","Fast for purity of the eyes","Fast for purity of the tongue","Fast for purity of the ears","Fast from anger","Fast from jealousy"],
  topics:["Greater closeness with the Lord","Hearing God’s voice","Guidance for an important decision","Spiritual growth","Consecration and purity","Prayer for family","Prayer for the church","Prayer for healing","Prayer for ministry","Prayer for salvation of souls","Strengthening faith","Overcoming fear","Overcoming temptation","Receiving revelation from God’s Word","Preparation for ministry","Thanksgiving fast","Fast for spiritual awakening","Fasting and prayer for ministers of the Gospel","Fasting and prayer for my pastor","My personal focus"],
  placeholders:{custom:"Example: for God’s guidance concerning my future work and ministry.", journal:"What did the Lord place in my heart today? Which verse spoke to me? What decision should I make?", feeling:"Example: peaceful, focused, needing strength, full of faith..."},
  group:"Church Group Fast", groupText:"This section is ready for shared fasts of Omid No 7 Church. The church leader can define the focus, dates, shared scriptures, prayer, and daily declaration.", testimony:"Record Testimony", noJournal:"No notes have been recorded yet."
 },
 hr:{
  title:"Put posta i otkrivenja",
  subtitle:"Post nije samo odricanje od hrane; to je ulazak u dublji fokus s Bogom.",
  intro:"Kršćanski post nije samo nejedenje hrane; to je odvajanje vremena za Boga, slušanje Riječi, molitvu, razmišljanje i jačanje duha.",
  shortTeachingTitle:"Kratko učenje o postu",
  shortTeaching:"Kao vjernici i učenici Krista, postimo kako bi naše tijelo došlo u poslušnost Duhu Božjem. Kršćanski post nema religioznu narav. Zato je Isus rekao u Mateju 6,16-18: “Kad postite, ne budite mrki kao licemjeri, jer oni izobličuju svoja lica da ih ljudi vide kako poste. Zaista, kažem vam, primili su svoju plaću. A ti, kad postiš, namaži glavu i operi lice, da ne pokažeš ljudima da postiš, nego svome Ocu koji je u tajnosti; i tvoj Otac, koji vidi u tajnosti, nagradit će te.”\n\nBudući da je svrha posta pomoći tijelu da se kreće pod voljom duha, trebamo razumjeti da kada govorimo o tijelu, ne mislimo samo na fizičko tijelo. Mislimo i na naše razmišljanje, želje, reakcije i tjelesne sklonosti. Prije početka svoje zemaljske službe, Isus Krist nam je pokazao da post može dovesti tijelo u poslušnost Božjoj volji. U Mateju 4,1-11 vidimo da je Isus postio i da se kušnjama suprotstavio Božjom riječju. Ali Isus nije postio kako bi Otac bio zadovoljniji Njime, jer prije posta, kada je Duh Sveti sišao na Njega, Otac je rekao: “Ovo je moj ljubljeni Sin, u kojemu mi je zadovoljstvo.” Zato post ne smije postati religiozan u našem životu. Svetost i pravednost primili smo kroz savršenu i prihvatljivu žrtvu Gospodina Isusa Krista, a ne kroz glad ili religiozna djela.\n\nPost nam pomaže da lakše provedemo želje Duha Svetoga u svakodnevnom životu. Ako stalno slijedimo tijelo, bit će nam teško činiti ono što Duh Sveti želi. Post pomaže da naš unutarnji život postane čišći, usredotočeniji i spremniji, kako bi se sila i slava Gospodnja jasnije očitovale u našem životu. Post nas ne čini svetijima; takvo razmišljanje je religiozno i pokazuje nerazumijevanje spasenja i dovršenog Kristova djela u životu vjernika. Post nas vodi putem na kojem naš duh postaje osjetljiviji, srce usredotočenije, a život poslušniji Riječi i vodstvu Duha Svetoga.\n\nDanielov post vidimo u knjizi proroka Daniela. U Danielu 1,8-16 Daniel i njegovi prijatelji odlučili su ne okaljati se kraljevom hranom i izabrali su jednostavniju hranu. U Danielu 10,2-3 Daniel se tri tjedna suzdržavao od ukusne hrane, mesa i vina, dok se posvećivao molitvi i razmišljanju. Zato se Danielov post obično razumije kao post u kojem se osoba odriče teške hrane, prehrambenih užitaka i svega što oduzima fokus, kako bi više vremena posvetila molitvi, Riječi i razmišljanju. Danielov post nije religiozni zakon; on je alat duhovne discipline za dublji fokus na Gospodina.",
  start:"Započni novi post", active:"Moji aktivni postovi", journal:"Moj dnevnik otkrivenja", stats:"Moja statistika duhovnog rasta", teaching:"Biblijsko učenje o postu",
  typeLabel:"Odaberite vrstu posta", schedule:"Odredite vrijeme posta", topic:"Tema posta", customTopic:"Moja osobna tema", save:"Spremi i započni post", back:"Natrag", noActive:"Trenutno nema aktivnog posta.", activeFast:"Vaš aktivni post", currentDay:"Trenutni dan", todayVerse:"Današnji stih", todayTeaching:"Današnje kratko učenje", todayPrayer:"Današnja molitva", todayDeclaration:"Današnja izjava vjere", revelationToday:"Današnji dnevnik otkrivenja", saveNote:"Spremi bilješku", endFast:"Završi post", completed:"Bravo! Završili ste svoj put posta. Niste se samo udaljili od hrane nekoliko sati ili dana; odvojili ste vrijeme za Gospodina. Sačuvajte ono što ste primili, stojte na Riječi i nastavite u vjeri.", reset:"Započni novi post", personalStatsNote:"Ova statistika nije za ponos, nego da vidite vjernost, ustrajnost i osobni rast na Božjem putu.",
  fields:{type:"Vrsta", startDate:"Datum početka", endDate:"Datum završetka", startTime:"Vrijeme početka", endTime:"Vrijeme završetka", reminder:"Želim podsjetnike", note:"Bilješka otkrivenja", feeling:"Zabilježi osjećaj i duhovno stanje"},
  types:["Post od nekoliko sati","Jednodnevni post","Višednevni post","Danielov post","Post samo s vodom","Post bez hrane","Osobni post po izboru","Crkveni grupni post"],
  nonFood:["Post od društvenih mreža","Post od televizije i zabave","Post od negativnog govora","Post od ometajućih navika","Vrijeme odvojeno za molitvu i Riječ","Post za čistoću očiju","Post za čistoću jezika","Post za čistoću ušiju","Post od ljutnje","Post od ljubomore"],
  topics:["Veća blizina s Gospodinom","Slušanje Božjeg glasa","Vodstvo za važnu odluku","Duhovni rast","Posvećenje i čistoća","Molitva za obitelj","Molitva za crkvu","Molitva za ozdravljenje","Molitva za službu","Molitva za spasenje duša","Jačanje vjere","Pobjeda nad strahom","Pobjeda nad kušnjom","Primanje otkrivenja iz Božje riječi","Priprema za službu","Post zahvaljivanja","Post za duhovno buđenje","Post i molitva za služitelje Evanđelja","Post i molitva za mog pastora","Moja osobna tema"],
  placeholders:{custom:"Primjer: za Božje vodstvo u vezi budućeg posla i službe.", journal:"Što mi je Gospodin danas stavio na srce? Koji mi je stih progovorio? Koju odluku trebam donijeti?", feeling:"Primjer: miran, usredotočen, trebam snagu, pun vjere..."},
  group:"Crkveni grupni post", groupText:"Ovaj je dio spreman za zajedničke postove crkve Omid No 7. Vođa crkve može odrediti temu, datume, zajedničke stihove, molitvu i dnevnu izjavu.", testimony:"Zapiši svjedočanstvo", noJournal:"Još nema zapisanih bilješki."
 }
};

const fastingDaily = [
 {refs:["Matthew 4:4","Matthew 6:16-18"], verse:{fa:"انسان نه فقط به نان زیست می‌کند، بلکه به هر کلمه‌ای که از دهان خدا صادر گردد.",en:"Man shall not live by bread alone, but by every word that proceeds from the mouth of God.",hr:"Ne živi čovjek samo o kruhu, nego o svakoj riječi koja izlazi iz Božjih usta."}, teaching:{fa:"روزه به ما یادآوری می‌کند که منبع اصلی حیات ما غذا نیست، بلکه کلام خداست. وقتی بدن آرام می‌شود، روح باید بیدارتر شود.",en:"Fasting reminds us that food is not the primary source of life; God’s Word is. As the body becomes quieter, the spirit should become more attentive.",hr:"Post nas podsjeća da hrana nije glavni izvor života; Božja riječ jest. Kada se tijelo stiša, duh treba postati budniji."}, prayer:{fa:"پدر آسمانی، قلبم را به روی کلامت باز می‌کنم. مرا به حضور خود نزدیک‌تر کن.",en:"Heavenly Father, I open my heart to Your Word. Draw me closer to Your presence.",hr:"Nebeski Oče, otvaram srce Tvojoj Riječi. Približi me svojoj prisutnosti."}, declaration:{fa:"من با کلام خدا زندگی می‌کنم. روح من قوی است و صدای خداوند را می‌شنوم.",en:"I live by the Word of God. My spirit is strong, and I hear the voice of the Lord.",hr:"Živim po Božjoj riječi. Moj duh je snažan i čujem Gospodnji glas."}},
 {refs:["John 10:27","Romans 8:14","Proverbs 3:5-6"], verse:{fa:"گوسفندان من آواز مرا می‌شنوند و من آنها را می‌شناسم و مرا متابعت می‌کنند.",en:"My sheep hear my voice, and I know them, and they follow me.",hr:"Moje ovce slušaju moj glas; ja ih poznajem i one idu za mnom."}, teaching:{fa:"در روزه، قلب خود را آرام می‌کنیم تا صدای خداوند را واضح‌تر تشخیص دهیم.",en:"In fasting, we quiet the heart to discern the Lord’s voice more clearly.",hr:"U postu smirujemo srce kako bismo jasnije razabrali Gospodnji glas."}, prayer:{fa:"خداوندا، گوش روحانی مرا باز کن تا هدایت تو را بشنوم.",en:"Lord, open my spiritual ears to hear Your guidance.",hr:"Gospodine, otvori moje duhovne uši da čujem Tvoje vodstvo."}, declaration:{fa:"من فرزند خدا هستم و توسط روح خدا هدایت می‌شوم.",en:"I am a child of God and I am led by the Spirit of God.",hr:"Ja sam Božje dijete i vodi me Duh Božji."}},
 {refs:["Romans 10:17","Mark 11:23-24","Hebrews 11:1"], verse:{fa:"ایمان از شنیدن است و شنیدن از کلام خدا.",en:"Faith comes by hearing, and hearing by the Word of God.",hr:"Vjera dolazi od slušanja, a slušanje po Božjoj riječi."}, teaching:{fa:"روزه باید ما را به کلام نزدیک‌تر کند. ایمان با شنیدن و تعمق در کلام تقویت می‌شود.",en:"Fasting should draw us closer to the Word. Faith is strengthened by hearing and meditating on the Word.",hr:"Post nas treba približiti Riječi. Vjera jača slušanjem i razmišljanjem o Riječi."}, prayer:{fa:"پدر، ایمان مرا با کلامت قوی کن و مرا در وعده‌هایت ثابت قدم ساز.",en:"Father, strengthen my faith through Your Word and establish me in Your promises.",hr:"Oče, ojačaj moju vjeru kroz svoju Riječ i učvrsti me u svojim obećanjima."}, declaration:{fa:"من با ایمان زندگی می‌کنم، نه با ترس. کلام خدا در من زنده و فعال است.",en:"I live by faith, not by fear. God’s Word is alive and active in me.",hr:"Živim po vjeri, ne po strahu. Božja riječ je živa i djelotvorna u meni."}},
 {refs:["Isaiah 58:6-12","Acts 13:2-3"], verse:{fa:"آیا روزه‌ای که من می‌پسندم این نیست که بندهای شرارت را بگشایید؟",en:"Is not this the fast that I have chosen: to loose the bonds of wickedness?",hr:"Nije li ovo post koji sam izabrao: da se razriješe okovi zloće?"}, teaching:{fa:"روزه واقعی فقط یک عمل بیرونی نیست؛ باید قلب، رفتار، محبت و خدمت ما را شکل دهد.",en:"True fasting is not merely outward; it should shape our heart, conduct, love, and service.",hr:"Pravi post nije samo vanjski čin; on treba oblikovati srce, ponašanje, ljubav i služenje."}, prayer:{fa:"خداوندا، روزه مرا با محبت، عدالت، بخشش و اطاعت همراه کن.",en:"Lord, let my fast be joined with love, justice, forgiveness, and obedience.",hr:"Gospodine, neka moj post bude povezan s ljubavlju, pravdom, oproštenjem i poslušnošću."}, declaration:{fa:"قلب من در حضور خدا نرم و مطیع است. من در محبت و حقیقت رشد می‌کنم.",en:"My heart is tender and obedient before God. I grow in love and truth.",hr:"Moje je srce mekano i poslušno pred Bogom. Rastem u ljubavi i istini."}},
 {refs:["Colossians 3:15","Galatians 6:9"], verse:{fa:"از نیکوکاری خسته نشویم، زیرا در زمان مناسب درو خواهیم کرد، اگر سست نشویم.",en:"Let us not grow weary in doing good, for in due season we shall reap if we do not give up.",hr:"Ne umarajmo se činiti dobro, jer ćemo u pravo vrijeme žeti ako ne posustanemo."}, teaching:{fa:"پایان روزه پایان مسیر نیست. آنچه دریافت کرده‌ای باید در عمل، دعا و اطاعت ادامه پیدا کند.",en:"The end of a fast is not the end of the journey. What you received should continue in action, prayer, and obedience.",hr:"Završetak posta nije kraj puta. Ono što si primio treba se nastaviti u djelima, molitvi i poslušnosti."}, prayer:{fa:"پدر، کمکم کن دریافت‌های این روزه را حفظ کنم و با ایمان ادامه دهم.",en:"Father, help me keep what I received in this fast and continue by faith.",hr:"Oče, pomozi mi sačuvati ono što sam primio u ovom postu i nastaviti u vjeri."}, declaration:{fa:"من آنچه خدا در قلبم گذاشته حفظ می‌کنم. در کلام می‌ایستم و سست نمی‌شوم.",en:"I keep what God has placed in my heart. I stand on the Word and do not give up.",hr:"Čuvam ono što je Bog stavio u moje srce. Stojim na Riječi i ne odustajem."}}
];

function ft(){ return fastingTexts[currentLang] || fastingTexts.en; }
function fastingTodayItem(day){ return fastingDaily[(Math.max(1,day)-1)%fastingDaily.length]; }
function fastingSetView(view){ fastingView=view; localStorage.setItem('fastingView',view); renderPlans(); }
function fastingFormatDate(d){ try { return new Date(d).toLocaleDateString(currentLang==='fa'?'fa-IR':currentLang==='hr'?'hr-HR':'en-US'); } catch(e){ return d||''; } }
function fastingDayNumber(fast){
 const today=new Date(new Date().toLocaleDateString('en-CA',{timeZone:'Europe/Zagreb'})+'T00:00:00');
 const start=new Date((fast.startDate||new Date().toISOString().slice(0,10))+'T00:00:00');
 let d=Math.floor((today-start)/86400000)+1;
 if(!Number.isFinite(d)||d<1)d=1;
 const total=fast.totalDays||1;
 return Math.min(d,total);
}
function fastingTotalDays(start,end){
 const s=new Date(start+'T00:00:00'); const e=new Date(end+'T00:00:00');
 let d=Math.floor((e-s)/86400000)+1;
 return Number.isFinite(d)&&d>0?d:1;
}
function fastingRefsHtml(item){
 return `<div class="fasting-refs">${item.refs.map(r=>`<details class="plan-scripture-expand"><summary>${r}</summary><p>${item.verse[currentLang]||item.verse.en}</p></details>`).join('')}</div>`;
}

const fastingPillarContent = {
 fa:{
  wordTitle:"کلام و روزه",
  word:["روزه زمانی ارزشمند است که ما را به کلام خدا نزدیک‌تر کند. هدف روزه این نیست که فقط از غذا یا عادت‌ها دور شویم؛ هدف این است که روح ما با کلام خدا تغذیه شود.","متی ۴:۴ — انسان نه فقط به نان زیست می‌کند، بلکه به هر کلمه‌ای که از دهان خدا صادر گردد.","رومیان ۱۰:۱۷ — ایمان از شنیدن است و شنیدن از کلام خدا.","مزمور ۱۱۹:۱۰۵ — کلام تو برای پای‌های من چراغ و برای راه‌های من نور است."],
  prayerTitle:"دعاهای روزه",
  prayers:["پدر آسمانی، در این روزه قلب مرا به حضور خود نزدیک‌تر کن و مرا از هر صدای مزاحم جدا ساز.","خداوندا، کمکم کن در این روزه فقط از جسم پیروی نکنم، بلکه با روح‌القدس هماهنگ شوم.","پدر، برای هدایت، حکمت، خدمت، خانواده، کلیسا و رشد روحانی خود دعا می‌کنم. مرا در کلامت ثابت‌قدم ساز.","روح‌القدس، چشمان روحانی مرا باز کن تا آنچه خدا در این فصل می‌خواهد به من نشان دهد، دریافت کنم."],
  meditationTitle:"آیات برای تعمق",
  meditations:["متی ۶:۱۶-۱۸ — روزه پنهانی و بدون نمایش مذهبی.","متی ۴:۱-۱۱ — عیسی در روزه با کلام خدا در برابر وسوسه ایستاد.","اشعیا ۵۸:۶-۱۲ — روزه‌ای که خدا می‌پسندد با آزادی، محبت، عدالت و خدمت همراه است.","اعمال ۱۳:۲-۳ — کلیسای اولیه در دعا و روزه هدایت روح‌القدس را دریافت کرد.","دانیال ۱۰:۲-۳ — دانیال در یک مسیر تعمق، دعا و پرهیز قرار گرفت."],
  revelationTitle:"مکاشفه من", revelationIntro:"آنچه در زمان روزه، دعا، کلام یا تعمق دریافت می‌کنی اینجا بنویس. این بخش دفتر شخصی مکاشفات توست.", saveRevelation:"ذخیره مکاشفه", saved:"ذخیره شد"
 },
 en:{
  wordTitle:"The Word and Fasting",
  word:["Fasting becomes valuable when it brings us closer to the Word of God. The goal is not only to stay away from food or habits; the goal is for the spirit to be nourished by God’s Word.","Matthew 4:4 — Man shall not live by bread alone, but by every word that proceeds from the mouth of God.","Romans 10:17 — Faith comes by hearing, and hearing by the Word of God.","Psalm 119:105 — Your word is a lamp to my feet and a light to my path."],
  prayerTitle:"Fasting Prayers",
  prayers:["Heavenly Father, in this fast draw my heart closer to Your presence and separate me from every distracting voice.","Lord, help me not to follow the flesh in this fast, but to align with the Holy Spirit.","Father, I pray for guidance, wisdom, ministry, family, church, and spiritual growth. Establish me in Your Word.","Holy Spirit, open my spiritual eyes to receive what God wants to show me in this season."],
  meditationTitle:"Scriptures for Meditation",
  meditations:["Matthew 6:16-18 — Fasting in secret without religious display.","Matthew 4:1-11 — Jesus fasted and stood against temptation with the Word of God.","Isaiah 58:6-12 — The fast God desires is connected with freedom, love, justice, and service.","Acts 13:2-3 — The early church received the guidance of the Holy Spirit in prayer and fasting.","Daniel 10:2-3 — Daniel entered a journey of meditation, prayer, and abstinence."],
  revelationTitle:"My Revelation", revelationIntro:"Write here what you receive during fasting, prayer, the Word, or meditation. This is your personal revelation journal.", saveRevelation:"Save Revelation", saved:"Saved"
 },
 hr:{
  wordTitle:"Riječ i post",
  word:["Post postaje vrijedan kada nas približava Božjoj riječi. Cilj nije samo odvojiti se od hrane ili navika; cilj je da se duh hrani Božjom riječju.","Matej 4,4 — Ne živi čovjek samo o kruhu, nego o svakoj riječi koja izlazi iz Božjih usta.","Rimljanima 10,17 — Vjera dolazi od slušanja, a slušanje po Božjoj riječi.","Psalam 119,105 — Tvoja riječ je svjetiljka mojoj nozi i svjetlo mojoj stazi."],
  prayerTitle:"Molitve za post",
  prayers:["Nebeski Oče, u ovom postu približi moje srce svojoj prisutnosti i odvoji me od svakog ometajućeg glasa.","Gospodine, pomozi mi da u ovom postu ne slijedim tijelo, nego da budem usklađen s Duhom Svetim.","Oče, molim za vodstvo, mudrost, službu, obitelj, crkvu i duhovni rast. Učvrsti me u svojoj Riječi.","Duše Sveti, otvori moje duhovne oči da primim ono što mi Bog želi pokazati u ovom razdoblju."],
  meditationTitle:"Stihovi za razmišljanje",
  meditations:["Matej 6,16-18 — Post u tajnosti, bez religioznog pokazivanja.","Matej 4,1-11 — Isus je postio i suprotstavio se kušnji Božjom riječju.","Izaija 58,6-12 — Post koji Bog želi povezan je sa slobodom, ljubavlju, pravdom i služenjem.","Djela 13,2-3 — Prva crkva primila je vodstvo Duha Svetoga u molitvi i postu.","Daniel 10,2-3 — Daniel je ušao u put razmišljanja, molitve i odricanja."],
  revelationTitle:"Moje otkrivenje", revelationIntro:"Ovdje zapiši ono što primaš tijekom posta, molitve, Riječi ili razmišljanja. Ovo je tvoj osobni dnevnik otkrivenja.", saveRevelation:"Spremi otkrivenje", saved:"Spremljeno"
 }
};
function fpc(){ return fastingPillarContent[currentLang] || fastingPillarContent.en; }
function fastingOpenPillar(kind){
 const root=document.getElementById('fastingPillarPanel');
 if(!root)return;
 const c=fpc();
 let title='', body='';
 if(kind==='word'){ title=c.wordTitle; body=c.word.map(v=>`<p>${v}</p>`).join(''); }
 if(kind==='prayer'){ title=c.prayerTitle; body=c.prayers.map(v=>`<p>${v}</p>`).join(''); }
 if(kind==='meditation'){ title=c.meditationTitle; body=c.meditations.map(v=>`<p>${v}</p>`).join(''); }
 if(kind==='revelation'){
   title=c.revelationTitle;
   body=`<p>${c.revelationIntro}</p><textarea id="pillarRevelationText" maxlength="2000" placeholder="${c.revelationIntro}"></textarea><button class="btn gold" onclick="fastingSavePillarRevelation()">${c.saveRevelation}</button>`;
 }
 root.innerHTML=`<div class="card pillar-panel-card"><h3>${title}</h3>${body}</div>`;
 root.scrollIntoView({behavior:'smooth',block:'start'});
}
function fastingSavePillarRevelation(){
 const c=fpc();
 const note=document.getElementById('pillarRevelationText')?.value||'';
 if(!note.trim())return;
 const store=fastingStore();
 store.journal.unshift({id:Date.now(), fastId:'pillar', topic:c.revelationTitle, note, feeling:'', date:new Date().toISOString()});
 saveFastingStore(store);
 document.getElementById('pillarRevelationText').value='';
 alert(c.saved);
}
function fastingToggleCustomTopic(sel){
 const box=document.getElementById('fastingCustomTopicBox');
 if(!box)return;
 const val=sel.value;
 const isCustom = val==='موضوع شخصی من' || val==='My personal focus' || val==='Moja osobna tema';
 box.hidden = !isCustom;
}
window.fastingOpenPillar=fastingOpenPillar;
window.fastingSavePillarRevelation=fastingSavePillarRevelation;
window.fastingToggleCustomTopic=fastingToggleCustomTopic;

function renderFastingHome(){
 const x=ft();
 return `<div class="hero-card fasting-hero"><h1>${x.title}</h1><p><strong>${x.subtitle}</strong></p><p>${x.intro}</p></div>
 <div class="fasting-pillars">
  <button type="button" onclick="fastingOpenPillar('word')">📖 ${currentLang==='fa'?'کلام':currentLang==='hr'?'Riječ':'Word'}</button>
  <button type="button" onclick="fastingOpenPillar('prayer')">🙏 ${currentLang==='fa'?'دعا':currentLang==='hr'?'Molitva':'Prayer'}</button>
  <button type="button" onclick="fastingOpenPillar('meditation')">🕊️ ${currentLang==='fa'?'تعمق':currentLang==='hr'?'Razmišljanje':'Meditation'}</button>
  <button type="button" onclick="fastingOpenPillar('revelation')">✍️ ${currentLang==='fa'?'مکاشفه':currentLang==='hr'?'Otkrivenje':'Revelation'}</button>
 </div><div id="fastingPillarPanel"></div>
 <details class="card fasting-teaching"><summary>${x.shortTeachingTitle}</summary><p>${x.shortTeaching}</p></details>
 <div class="fasting-menu">
  <button class="plan-list-card" onclick="fastingSetView('start')"><h3>${x.start}</h3><p>${x.typeLabel}</p></button>
  <button class="plan-list-card" onclick="fastingSetView('active')"><h3>${x.active}</h3><p>${x.activeFast}</p></button>
  <button class="plan-list-card" onclick="fastingSetView('stats')"><h3>${x.stats}</h3><p>${x.personalStatsNote}</p></button>
 </div>`;
}
function renderFastingStart(){
 const x=ft();
 const today=new Date().toLocaleDateString('en-CA',{timeZone:'Europe/Zagreb'});
 return `<button class="btn light" onclick="fastingSetView('home')">← ${x.back}</button>
 <div class="hero-card fasting-hero"><h1>${x.start}</h1><p>${x.intro}</p></div>
 <form id="fastingStartForm" class="card fasting-form">
   <h3>${x.typeLabel}</h3>
   <select name="type">${x.types.concat(x.nonFood).map(v=>`<option>${v}</option>`).join('')}</select>
   
   
   <h3>${x.schedule}</h3>
   <div class="fasting-grid">
    <label>${x.fields.startDate}<input name="startDate" type="date" value="${today}"></label>
    <label>${x.fields.endDate}<input name="endDate" type="date" value="${today}"></label>
    <label>${x.fields.startTime}<input name="startTime" type="time" value="06:00"></label>
    <label>${x.fields.endTime}<input name="endTime" type="time" value="18:00"></label>
   </div>
   
   <h3>${x.topic}</h3>
   <select name="topic" id="fastingTopicSelect" onchange="fastingToggleCustomTopic(this)">
     ${x.topics.map(v=>`<option>${v}</option>`).join('')}
   </select>
   <div id="fastingCustomTopicBox" hidden>
    <label>${x.customTopic}<textarea name="customTopic" maxlength="500" placeholder="${x.placeholders.custom}"></textarea></label>
   </div>
   <button type="submit" class="btn gold">${x.save}</button>
 </form>`;
}
function saveFastingStartForm(form){
 const data=new FormData(form);
 const startDate=data.get('startDate'); const endDate=data.get('endDate')||startDate;
 const fast={id:Date.now(), type:data.get('type'), startDate, endDate, startTime:data.get('startTime'), endTime:data.get('endTime'), topic:(data.get('customTopic')&&String(data.get('customTopic')).trim())?data.get('customTopic'):data.get('topic'), totalDays:fastingTotalDays(startDate,endDate), createdAt:new Date().toISOString()};
 const store=fastingStore(); store.active.unshift(fast); saveFastingStore(store); fastingSetView('active');
}
function renderFastingActive(){
 const x=ft(); const store=fastingStore();
 if(!store.active.length) return `<button class="btn light" onclick="fastingSetView('home')">← ${x.back}</button><div class="card"><p>${x.noActive}</p><button class="btn gold" onclick="fastingSetView('start')">${x.start}</button></div>`;
 return `<button class="btn light" onclick="fastingSetView('home')">← ${x.back}</button>`+store.active.map(f=>{
  const day=fastingDayNumber(f); const item=fastingTodayItem(day); const progress=Math.round((day/(f.totalDays||1))*100);
  return `<div class="card active-fasting-card">
   <h2>${x.activeFast}</h2><p><strong>${x.topic}:</strong> ${f.topic}</p><p><strong>${x.fields.type}:</strong> ${f.type}</p><p><strong>${x.currentDay}:</strong> ${currentLang==='fa'?toFaDigits(day):day} / ${currentLang==='fa'?toFaDigits(f.totalDays):f.totalDays}</p><div class="plan-progress"><div style="width:${progress}%"></div></div>
   <div class="plan-section-title">${x.todayVerse}</div>${fastingRefsHtml(item)}
   <div class="plan-section-title">${x.todayTeaching}</div><p>${item.teaching[currentLang]||item.teaching.en}</p>
   <div class="plan-section-title">${x.todayPrayer}</div><p>${item.prayer[currentLang]||item.prayer.en}</p>
   <div class="plan-section-title">${x.todayDeclaration}</div><p><strong>${item.declaration[currentLang]||item.declaration.en}</strong></p>
   <div class="plan-section-title">${x.revelationToday}</div>
   <textarea id="fast-note-${f.id}" maxlength="2000" placeholder="${x.placeholders.journal}"></textarea>
   <input id="fast-feel-${f.id}" placeholder="${x.placeholders.feeling}">
   <div class="plan-day-nav"><button class="btn primary" onclick="saveFastingNote(${f.id})">${x.saveNote}</button><button class="btn gold" onclick="completeFasting(${f.id})">${x.endFast}</button></div>
  </div>`;
 }).join('');
}
function saveFastingNote(id){
 const store=fastingStore(); const f=store.active.find(x=>x.id===id); if(!f)return;
 const note=document.getElementById('fast-note-'+id)?.value||''; const feeling=document.getElementById('fast-feel-'+id)?.value||'';
 store.journal.unshift({id:Date.now(), fastId:id, topic:f.topic, note, feeling, date:new Date().toISOString()});
 saveFastingStore(store); fastingSetView('journal');
}
function completeFasting(id){
 const store=fastingStore(); const idx=store.active.findIndex(x=>x.id===id); if(idx<0)return;
 const f=store.active.splice(idx,1)[0]; f.completedAt=new Date().toISOString(); store.completed.unshift(f); saveFastingStore(store);
 const x=ft(); alert(x.completed); fastingSetView('stats');
}
function renderFastingJournal(){
 const x=ft(); const store=fastingStore();
 return `<button class="btn light" onclick="fastingSetView('home')">← ${x.back}</button><div class="hero-card"><h1>${x.journal}</h1><p>${x.revelationToday}</p></div>`+
 (store.journal.length?store.journal.map(j=>`<div class="card journal-card"><strong>${fastingFormatDate(j.date)}</strong><p><b>${j.topic||''}</b></p><p>${j.note||''}</p><p><em>${j.feeling||''}</em></p></div>`).join(''):`<div class="card"><p>${x.noJournal}</p></div>`);
}
function renderFastingStats(){
 const x=ft(); const store=fastingStore();
 const completed=store.completed.length; const notes=store.journal.length; const days=store.completed.reduce((a,f)=>a+(f.totalDays||1),0);
 const topics={}; store.completed.concat(store.active).forEach(f=>{topics[f.topic]=(topics[f.topic]||0)+1;});
 const top=Object.keys(topics).sort((a,b)=>topics[b]-topics[a])[0]||'—';
 return `<button class="btn light" onclick="fastingSetView('home')">← ${x.back}</button><div class="hero-card"><h1>${x.stats}</h1><p>${x.personalStatsNote}</p></div>
 <div class="fasting-stats-grid">
  <div class="card stat-card"><strong>${currentLang==='fa'?toFaDigits(completed):completed}</strong><span>${currentLang==='fa'?'روزه کامل‌شده':currentLang==='hr'?'završenih postova':'completed fasts'}</span></div>
  <div class="card stat-card"><strong>${currentLang==='fa'?toFaDigits(days):days}</strong><span>${currentLang==='fa'?'روز ثبت‌شده':currentLang==='hr'?'zabilježenih dana':'recorded days'}</span></div>
  <div class="card stat-card"><strong>${currentLang==='fa'?toFaDigits(notes):notes}</strong><span>${currentLang==='fa'?'یادداشت مکاشفه':currentLang==='hr'?'bilješki otkrivenja':'revelation notes'}</span></div>
  <div class="card stat-card"><strong>${top}</strong><span>${currentLang==='fa'?'موضوع پرتکرار':currentLang==='hr'?'najčešća tema':'top focus'}</span></div>
 </div>`;
}
function renderFastingTeaching(){
 const x=ft();
 return `<button class="btn light" onclick="fastingSetView('home')">← ${x.back}</button>
 <div class="hero-card fasting-hero"><h1>${x.teaching}</h1><p>${x.shortTeaching}</p></div>
 
 <div class="card"><h3>${x.group}</h3><p>${x.groupText}</p></div>`;
}
function renderFastingJourney(){
 const root=document.getElementById('plansContent'); if(!root)return;
 const x=ft();
 let html='';
 if(fastingView==='start') html=renderFastingStart();
 else if(fastingView==='active') html=renderFastingActive();
 else if(fastingView==='journal') html=renderFastingJournal();
 else if(fastingView==='stats') html=renderFastingStats();
 else if(fastingView==='teaching') html=renderFastingTeaching();
 else html=renderFastingHome();
 root.innerHTML=`<div class="section-title"><h2>${x.title}</h2></div>${html}`;
 const form=document.getElementById('fastingStartForm');
 if(form) form.addEventListener('submit',e=>{e.preventDefault(); saveFastingStartForm(form);});
}
window.fastingSetView=fastingSetView;
window.saveFastingNote=saveFastingNote;
window.completeFasting=completeFasting;

function renderPlans(){
 const root=document.getElementById('plansContent');
 if(!root||!window.teachingPlans)return;
 if(selectedPlanKey==='fastingJourney'){
   renderFastingJourney();
   return;
 }
 if(!selectedPlanKey || !window.teachingPlans[selectedPlanKey]){
   let html=`<div class="hero-card"><h1>${t('selectPlan')}</h1><p>${t('plansDesc')}</p></div>`;
   html+=`<div class="plan-list-card fasting-plan-list-card" data-plan-special="fasting">
     <h3>${ft().title}</h3>
     <p>${ft().subtitle}</p>
     <div class="plan-progress"><div style="width:40%"></div></div>
     <button class="btn gold">${currentLang==='fa'?'ورود به مسیر روزه':currentLang==='hr'?'Otvori put posta':'Open Fasting Journey'}</button>
   </div>`;
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
   root.querySelectorAll('[data-plan-special="fasting"]').forEach(card=>card.addEventListener('click',()=>{
     selectedPlanKey='fastingJourney';
     localStorage.setItem('selectedPlanKey',selectedPlanKey);
     fastingView='home';
     localStorage.setItem('fastingView','home');
     renderPlans();
   }));
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

function setLang(lang){ currentLang=lang; localStorage.setItem('lang',lang); document.documentElement.lang=lang; document.documentElement.dir=lang==='fa'?'rtl':'ltr'; document.body.classList.remove('fa','en','hr'); document.body.classList.add(lang); document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n)); document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang)); renderDaily(); renderPlans(); renderDeclarations(); renderThanksgiving(); renderNewBirthContent(); renderSpiritualAudioFeature(); renderMyNotesFeature(); if(typeof renderBibleReader==='function'){ renderBibleReader(); setTimeout(()=>renderBibleReader(),120); } syncOneSignalLanguageTag(); }
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
function showPage(id){ if(id==='myNotes') { ensureMyNotesPage(); renderMyNotesPage(); } if(id==='audioMessages') { ensureSpiritualAudioPage(); renderSpiritualAudioMessages(); }  if(id==='bibleReader' && typeof renderBibleReader==='function') { if(!bibleReaderView || bibleReaderView==='apocrypha') bibleReaderView='home'; renderBibleReader(); setTimeout(()=>renderBibleReader(),120); } document.querySelectorAll('.page').forEach(p=>p.classList.remove('active')); const page=document.getElementById(id); if(page)page.classList.add('active'); document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===id)); window.scrollTo({top:0,behavior:'smooth'}); if(window.gtag)gtag('event','page_view_app',{page:id}); }
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


/* V45 Audio Messages: Persian-only spiritual audio section */
const spiritualAudioItems = [
 {
  "id": "morning-prayer-001",
  "category": "morning",
  "src": "audio/fa/morning-prayer/001.m4a",
  "title": "نیایش صبحگاهی ۱",
  "desc": "یک پیام صوتی کوتاه برای شروع روز با دعا، ایمان و تمرکز بر خداوند.",
  "tag": "نیایش صبحگاهی"
 },
 {
  "id": "morning-prayer-002",
  "category": "morning",
  "src": "audio/fa/morning-prayer/002.m4a",
  "title": "نیایش صبحگاهی ۲",
  "desc": "دعای صبحگاهی برای تقویت روح، آرامش قلب و شروع روز در حضور خداوند.",
  "tag": "نیایش صبحگاهی"
 },
 {
  "id": "short-message-001",
  "category": "short",
  "src": "audio/fa/short-messages/001.m4a",
  "title": "شما به خدا پاسخگو هستید",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 },
 {
  "id": "short-message-002",
  "category": "short",
  "src": "audio/fa/short-messages/002.m4a",
  "title": "ایمان چیست؟",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 },
 {
  "id": "short-message-003",
  "category": "short",
  "src": "audio/fa/short-messages/003.m4a",
  "title": "به چه چیزی امید دارید؟",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 },
 {
  "id": "short-message-004",
  "category": "short",
  "src": "audio/fa/short-messages/004.m4a",
  "title": "قاطع باشید",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 },
 {
  "id": "short-message-005",
  "category": "short",
  "src": "audio/fa/short-messages/005.m4a",
  "title": "قوی و دلیر باش",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 },
 {
  "id": "short-message-006",
  "category": "short",
  "src": "audio/fa/short-messages/006.m4a",
  "title": "در خداوند شاد باشید",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 },
 {
  "id": "short-message-007",
  "category": "short",
  "src": "audio/fa/short-messages/007.m4a",
  "title": "زندگی منضبط",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 },
 {
  "id": "short-message-008",
  "category": "short",
  "src": "audio/fa/short-messages/008.m4a",
  "title": "مسئولیت‌پذیر باشید",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 },
 {
  "id": "short-message-009",
  "category": "short",
  "src": "audio/fa/short-messages/009.m4a",
  "title": "به‌جای احساساتتان حکمت خدا را دنبال کنید",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 },
 {
  "id": "short-message-010",
  "category": "short",
  "src": "audio/fa/short-messages/010.m4a",
  "title": "راهی تازه",
  "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.",
  "tag": "پیام کوتاه"
 }
];

function ensureSpiritualAudioPage(){
 if(document.getElementById('audioMessages')) return;
 const section=document.createElement('section');
 section.id='audioMessages';
 section.className='page';
 document.body.appendChild(section);
}
function renderSpiritualAudioFeature(){
 const home=document.getElementById('home');
 if(!home)return;
 home.querySelectorAll('[data-audio-home-card]').forEach(el=>el.remove());
 if(currentLang!=='fa') return;

 const card=document.createElement('div');
 card.className='card feature-card audio-home-card';
 card.setAttribute('data-audio-home-card','1');
 card.innerHTML=`<h3>پیام‌های صوتی روحانی</h3>
 <p>نیایش‌های صبحگاهی، پیام‌های کوتاه و تعالیم صوتی برای تقویت ایمان.</p>
 <button class="btn gold" type="button" onclick="openSpiritualAudio()">باز کردن پیام‌های صوتی</button>`;

 const grid=home.querySelector('.home-feature-grid');
 if(grid){
   grid.prepend(card);
   return;
 }

 const hero=home.querySelector('.hero-card');
 if(hero && hero.parentNode){
   hero.insertAdjacentElement('afterend', card);
   return;
 }

 home.prepend(card);
}
function openSpiritualAudio(audioId){
 ensureSpiritualAudioPage();
 showPage('audioMessages');
 renderSpiritualAudioMessages(audioId);
}
function renderSpiritualAudioMessages(audioId){
 ensureSpiritualAudioPage();
 const root=document.getElementById('audioMessages');
 if(!root)return;
 if(currentLang!=='fa'){
  root.innerHTML=`<div class="section-title"><h2>Audio Messages</h2></div><div class="card"><p>Audio messages for this language will be added soon.</p></div>`;
  return;
 }
 const cats=[
  {id:'morning', label:'نیایش صبحگاهی'},
  {id:'short', label:'پیام‌های کوتاه'},
  {id:'teaching', label:'تعالیم'}
 ];
 root.innerHTML=`<div class="section-title"><h2>پیام‌های صوتی روحانی</h2></div>
 <div class="hero-card audio-hero"><h1>پیام‌های صوتی روحانی</h1><p>موعظه‌ها، تعالیم، دعاها و پیام‌های کوتاه برای تقویت ایمان.</p></div>
 <div class="audio-category-row">${cats.map(c=>`<button class="audio-cat-btn ${c.id==='morning'?'active':''}" data-audio-cat="${c.id}">${c.label}</button>`).join('')}</div>
 <div id="audioMessagesList"></div>`;
 root.querySelectorAll('[data-audio-cat]').forEach(btn=>btn.addEventListener('click',()=>{
  root.querySelectorAll('[data-audio-cat]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderSpiritualAudioList(btn.dataset.audioCat);
 }));
 const targetId=audioId || new URLSearchParams(location.search).get('audio');
 const targetItem=targetId?spiritualAudioItems.find(x=>x.id===targetId):null;
 const defaultCat=targetItem?targetItem.category:'morning';
 root.querySelectorAll('[data-audio-cat]').forEach(b=>b.classList.toggle('active', b.dataset.audioCat===defaultCat));
 renderSpiritualAudioList(defaultCat);
}

function audioNoteKey(id){ return `audio_note_${id}`; }
function audioFavoriteKey(id){ return `audio_favorite_${id}`; }
function getAudioNote(id){ return localStorage.getItem(audioNoteKey(id)) || ''; }
function saveAudioNote(id){
 const el=document.getElementById(`audio-note-${id}`);
 if(!el)return;
 localStorage.setItem(audioNoteKey(id), el.value || '');
 const status=document.getElementById(`audio-note-status-${id}`);
 if(status) status.textContent='ذخیره شد';
 renderMyNotesFeature();
}
function toggleAudioNote(id){
 const box=document.getElementById(`audio-note-box-${id}`);
 if(box) box.hidden=!box.hidden;
}
function toggleAudioFavorite(id){
 const key=audioFavoriteKey(id);
 const isFav=localStorage.getItem(key)==='1';
 if(isFav) localStorage.removeItem(key); else localStorage.setItem(key,'1');
 renderSpiritualAudioList(window.currentAudioCategory||'morning');
 renderMyNotesFeature();
}
function audioTitleById(id){
 const item=spiritualAudioItems.find(x=>x.id===id);
 return item?item.title:id;
}
function audioById(id){ return spiritualAudioItems.find(x=>x.id===id); }
function audioShareLink(id){
 const url=new URL(window.location.href);
 url.searchParams.set('v','45');
 url.searchParams.set('audio',id);
 url.searchParams.delete('reset');
 return url.origin + url.pathname + url.search;
}
async function shareAudioMessage(id){
 const item=audioById(id); if(!item)return;
 const link=audioShareLink(id);
 const text=`${item.title}\n\nبرای گوش دادن به این پیام صوتی از اپ کلیسای امیدنو۷ وارد شوید:\n${link}`;
 try{
   if(navigator.share){ await navigator.share({title:item.title,text, url:link}); }
   else { await navigator.clipboard.writeText(text); alert('لینک پیام کپی شد'); }
 }catch(e){
   try{ await navigator.clipboard.writeText(text); alert('لینک پیام کپی شد'); }catch(err){ prompt('لینک پیام:', link); }
 }
}
function audioEl(id){ return document.getElementById(`audio-player-${id}`); }
function playAudio(id){
 const a=audioEl(id); if(!a)return;
 document.querySelectorAll('.spiritual-audio-el').forEach(x=>{ if(x.id!==`audio-player-${id}`) x.pause(); });
 if(a.paused) a.play(); else a.pause();
}
function stopAudio(id){ const a=audioEl(id); if(!a)return; a.pause(); a.currentTime=0; }
function seekAudio(id,sec){ const a=audioEl(id); if(!a)return; a.currentTime=Math.max(0, Math.min((a.duration||999999), a.currentTime+sec)); }
function setAudioSpeed(id,rate){
 const a=audioEl(id); if(!a)return;
 a.playbackRate=rate;
 document.querySelectorAll(`[data-speed-for="${id}"]`).forEach(b=>b.classList.toggle('active', Number(b.dataset.rate)===rate));
}
function renderSpiritualAudioList(cat){
 window.currentAudioCategory=cat||'morning';
 const list=document.getElementById('audioMessagesList'); if(!list)return;
 const items=spiritualAudioItems.filter(item=>cat==='all'||item.category===cat);
 list.innerHTML=items.length?items.map(item=>{
  const note=getAudioNote(item.id);
  const fav=localStorage.getItem(audioFavoriteKey(item.id))==='1';
  return `<div class="card audio-message-card" id="audio-card-${item.id}">
  <div class="audio-message-head"><span class="audio-tag">${item.tag}</span><h3>${item.title}</h3></div>
  <p>${item.desc}</p>
  <audio class="spiritual-audio-el" id="audio-player-${item.id}" preload="metadata" controlsList="nodownload noplaybackrate" src="${item.src}"></audio>
  <div class="audio-control-bar">
    <button type="button" onclick="playAudio('${item.id}')">▶︎ / ⏸</button>
    <button type="button" onclick="seekAudio('${item.id}',-15)">-۱۵ ثانیه</button>
    <button type="button" onclick="seekAudio('${item.id}',15)">+۱۵ ثانیه</button>
    <button type="button" onclick="stopAudio('${item.id}')">توقف</button>
  </div>
  <div class="audio-speed-row">
    <span>سرعت:</span>
    <button type="button" data-speed-for="${item.id}" data-rate="1" class="active" onclick="setAudioSpeed('${item.id}',1)">1x</button>
    <button type="button" data-speed-for="${item.id}" data-rate="1.25" onclick="setAudioSpeed('${item.id}',1.25)">1.25x</button>
    <button type="button" data-speed-for="${item.id}" data-rate="1.5" onclick="setAudioSpeed('${item.id}',1.5)">1.5x</button>
    <button type="button" data-speed-for="${item.id}" data-rate="2" onclick="setAudioSpeed('${item.id}',2)">2x</button>
  </div>
  <div class="audio-action-row">
    <button type="button" class="btn light" onclick="toggleAudioNote('${item.id}')">یادداشت</button>
    <button type="button" class="btn light" onclick="toggleAudioFavorite('${item.id}')">${fav?'★ ستاره‌دار':'☆ ستاره‌دار'}</button>
    <button type="button" class="btn gold" onclick="shareAudioMessage('${item.id}')">اشتراک‌گذاری لینک</button>
  </div>
  <div class="audio-note-box" id="audio-note-box-${item.id}" hidden>
    <textarea id="audio-note-${item.id}" maxlength="12000" placeholder="یادداشت خود را از این پیام صوتی بنویسید...">${note}</textarea>
    <div class="note-tools"><button class="btn primary" onclick="saveAudioNote('${item.id}')">ذخیره یادداشت</button><span id="audio-note-status-${item.id}" class="status"></span></div>
  </div>
 </div>`;
 }).join(''):`<div class="card"><p>فعلاً پیامی در این دسته‌بندی ثبت نشده است.</p></div>`;
 const target=new URLSearchParams(location.search).get('audio');
 if(target){
   setTimeout(()=>{
     const card=document.getElementById(`audio-card-${target}`);
     if(card) card.scrollIntoView({behavior:'smooth',block:'start'});
   },200);
 }
}
window.openSpiritualAudio=openSpiritualAudio;
window.shareAudioMessage=shareAudioMessage;
window.playAudio=playAudio;
window.stopAudio=stopAudio;
window.seekAudio=seekAudio;
window.setAudioSpeed=setAudioSpeed;
window.toggleAudioNote=toggleAudioNote;
window.saveAudioNote=saveAudioNote;
window.toggleAudioFavorite=toggleAudioFavorite;



/* My Notes and Saved Items */
const myNotesText = {
 fa:{title:"یادداشت‌های من",desc:"همه یادداشت‌ها، آیات هایلایت‌شده، ستاره‌ها و دریافت‌های شخصی شما در یکجا.",open:"باز کردن یادداشت‌ها",savedTitle:"موارد ذخیره‌شده من",savedDesc:"آیات هایلایت‌شده و پیام‌های ستاره‌دار شما اینجا جمع می‌شوند.",notes:"یادداشت‌ها",saved:"ذخیره‌شده‌ها",empty:"هنوز چیزی ثبت نشده است.",audio:"پیام صوتی",bible:"کتاب مقدس",fasting:"روزه",favorites:"ستاره‌دارها و هایلایت‌ها"},
 en:{title:"My Notes",desc:"All your notes, highlighted verses, starred items, and personal reflections in one place.",open:"Open Notes",savedTitle:"My Saved Items",savedDesc:"Your highlighted verses and starred audio messages are collected here.",notes:"Notes",saved:"Saved",empty:"Nothing has been saved yet.",audio:"Audio Message",bible:"Bible",fasting:"Fasting",favorites:"Favorites and Highlights"},
 hr:{title:"Moje bilješke",desc:"Sve vaše bilješke, istaknuti stihovi, označene stavke i osobna razmišljanja na jednom mjestu.",open:"Otvori bilješke",savedTitle:"Moje spremljene stavke",savedDesc:"Vaši istaknuti stihovi i označene audio poruke nalaze se ovdje.",notes:"Bilješke",saved:"Spremljeno",empty:"Još ništa nije spremljeno.",audio:"Audio poruka",bible:"Biblija",fasting:"Post",favorites:"Označeno i istaknuto"}
};
function mnt(){ return myNotesText[currentLang] || myNotesText.en; }
function ensureMyNotesPage(){
 if(document.getElementById('myNotes')) return;
 const s=document.createElement('section');
 s.id='myNotes'; s.className='page';
 document.body.appendChild(s);
}
function openMyNotes(){
 ensureMyNotesPage();
 showPage('myNotes');
 renderMyNotesPage();
}
function collectBibleNotesAndSaved(){
 const out=[];
 for(let i=0;i<localStorage.length;i++){
   const key=localStorage.key(i);
   if(!key || !key.startsWith('bible_')) continue;
   try{
    const st=JSON.parse(localStorage.getItem(key)||'{}');
    const parts=key.split('_'); // bible_BOOK_CH_VERSE
    const bookId=parts[1], chapter=parts[2], verse=parts[3];
    if(st.note || st.highlight || st.bookmark || st.bold){
      out.push({type:'bible', key, title:`${bookId} ${chapter}:${verse}`, note:st.note||'', highlight:st.highlight||'', bookmark:!!st.bookmark, bold:!!st.bold});
    }
   }catch(e){}
 }
 return out;
}
function collectAudioNotesAndSaved(){
 const out=[];
 spiritualAudioItems.forEach(item=>{
   const note=localStorage.getItem(audioNoteKey(item.id))||'';
   const fav=localStorage.getItem(audioFavoriteKey(item.id))==='1';
   if(note || fav) out.push({type:'audio', id:item.id, title:item.title, note, favorite:fav});
 });
 return out;
}
function collectFastingNotes(){
 const out=[];
 try{
   const store=JSON.parse(localStorage.getItem('omideno7FastingStore')||'{}');
   (store.journal||[]).forEach(j=>out.push({type:'fasting', title:j.topic||mnt().fasting, note:j.note||'', date:j.date||''}));
 }catch(e){}
 return out;
}
function collectAllNotes(){
 return [...collectBibleNotesAndSaved(), ...collectAudioNotesAndSaved(), ...collectFastingNotes()];
}
function renderMyNotesFeature(){
 const grid=document.querySelector('#home .home-feature-grid');
 if(!grid)return;
 grid.querySelectorAll('[data-my-notes-card],[data-saved-items-card]').forEach(el=>el.remove());
 const t=mnt();
 const all=collectAllNotes();
 const saved=all.filter(x=>x.favorite||x.bookmark||x.highlight);
 const notesCard=document.createElement('div');
 notesCard.className='card feature-card my-notes-home-card';
 notesCard.setAttribute('data-my-notes-card','1');
 notesCard.innerHTML=`<h3>${t.title}</h3><p>${t.desc}</p><p><strong>${currentLang==='fa'?toFaDigits(all.length):all.length}</strong> ${t.notes}</p><button class="btn primary" onclick="openMyNotes()">${t.open}</button>`;
 const savedCard=document.createElement('div');
 savedCard.className='card feature-card saved-items-home-card';
 savedCard.setAttribute('data-saved-items-card','1');
 savedCard.innerHTML=`<h3>${t.savedTitle}</h3><p>${t.savedDesc}</p><p><strong>${currentLang==='fa'?toFaDigits(saved.length):saved.length}</strong> ${t.saved}</p><button class="btn gold" onclick="openMyNotes()">${t.open}</button>`;
 grid.appendChild(notesCard);
 grid.appendChild(savedCard);
}
function renderMyNotesPage(){
 ensureMyNotesPage();
 const root=document.getElementById('myNotes'); if(!root)return;
 const t=mnt();
 const all=collectAllNotes();
 const saved=all.filter(x=>x.favorite||x.bookmark||x.highlight);
 const renderItem=(x)=>{
   let label=x.type==='audio'?t.audio:(x.type==='bible'?t.bible:t.fasting);
   let badges=[];
   if(x.favorite)badges.push('★');
   if(x.bookmark)badges.push('★');
   if(x.highlight)badges.push(currentLang==='fa'?'هایلایت':'Highlight');
   if(x.bold)badges.push('B');
   return `<div class="card my-note-item"><span class="audio-tag">${label}</span><h3>${x.title}</h3>${badges.length?`<p><strong>${badges.join(' · ')}</strong></p>`:''}${x.note?`<p>${x.note}</p>`:''}</div>`;
 };
 root.innerHTML=`<div class="section-title"><h2>${t.title}</h2></div>
 <div class="hero-card"><h1>${t.title}</h1><p>${t.desc}</p></div>
 <div class="card"><h3>${t.favorites}</h3>${saved.length?saved.map(renderItem).join(''):`<p>${t.empty}</p>`}</div>
 <div class="card"><h3>${t.notes}</h3>${all.length?all.map(renderItem).join(''):`<p>${t.empty}</p>`}</div>`;
}
window.openMyNotes=openMyNotes;

document.addEventListener('DOMContentLoaded',()=>{ document.querySelectorAll('.lang-toggle button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang))); document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page))); document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.open)));
 document.querySelectorAll('[data-open-bible-home]').forEach(b=>b.addEventListener('click',openBibleHome)); document.querySelectorAll('.enable-notifications').forEach(b=>b.addEventListener('click',enableNotifications)); loadAnalyticsIfConfigured(); setLang(currentLang); const audioParam=new URLSearchParams(location.search).get('audio'); if(audioParam){ setTimeout(()=>openSpiritualAudio(audioParam),300); } });


/* OMIDNO7 FINAL OVERRIDE 2026-05-31: fixes audio home card, audio manifest, declarations, new birth, fasting verses, and plans back button. */
(function(){
  const AUDIO_ITEMS = [{"id": "morning-prayer-001", "category": "morning", "src": "audio/fa/morning-prayer/001.m4a", "title": "نیایش صبحگاهی ۱", "desc": "یک پیام صوتی کوتاه برای شروع روز با دعا، ایمان و تمرکز بر خداوند.", "tag": "نیایش صبحگاهی"}, {"id": "morning-prayer-002", "category": "morning", "src": "audio/fa/morning-prayer/002.m4a", "title": "نیایش صبحگاهی ۲", "desc": "دعای صبحگاهی برای تقویت روح، آرامش قلب و شروع روز در حضور خداوند.", "tag": "نیایش صبحگاهی"}, {"id": "short-message-001", "category": "short", "src": "audio/fa/short-messages/001.m4a", "title": "شما به خدا پاسخگو هستید", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "short-message-002", "category": "short", "src": "audio/fa/short-messages/002.m4a", "title": "ایمان چیست؟", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "short-message-003", "category": "short", "src": "audio/fa/short-messages/003.m4a", "title": "به چه چیزی امید دارید؟", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "short-message-004", "category": "short", "src": "audio/fa/short-messages/004.m4a", "title": "قاطع باشید", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "short-message-005", "category": "short", "src": "audio/fa/short-messages/005.m4a", "title": "قوی و دلیر باش", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "short-message-006", "category": "short", "src": "audio/fa/short-messages/006.m4a", "title": "در خداوند شاد باشید", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "short-message-007", "category": "short", "src": "audio/fa/short-messages/007.m4a", "title": "زندگی منضبط", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "short-message-008", "category": "short", "src": "audio/fa/short-messages/008.m4a", "title": "مسئولیت‌پذیر باشید", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "short-message-009", "category": "short", "src": "audio/fa/short-messages/009.m4a", "title": "به‌جای احساساتتان حکمت خدا را دنبال کنید", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "short-message-010", "category": "short", "src": "audio/fa/short-messages/010.m4a", "title": "راهی تازه", "desc": "پیام کوتاه روحانی برای تقویت ایمان و تمرکز بر کلام خدا.", "tag": "پیام کوتاه"}, {"id": "teaching-001", "category": "teaching", "src": "audio/fa/teachings/001.m4a", "title": "احکام خدا", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-002", "category": "teaching", "src": "audio/fa/teachings/002.m4a", "title": "انجیل", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-003", "category": "teaching", "src": "audio/fa/teachings/003.m4a", "title": "ایمان انجیل", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-004", "category": "teaching", "src": "audio/fa/teachings/004.m4a", "title": "ارتقاء ایمان", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-005", "category": "teaching", "src": "audio/fa/teachings/005.m4a", "title": "اسارت در زندگی ایماندار", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-006", "category": "teaching", "src": "audio/fa/teachings/006.m4a", "title": "انسان روحانی و نفسانی", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-007", "category": "teaching", "src": "audio/fa/teachings/007.m4a", "title": "احترام به خداوند", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-008", "category": "teaching", "src": "audio/fa/teachings/008.m4a", "title": "۷ فایده از مشارکت با روح‌القدس", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-009", "category": "teaching", "src": "audio/fa/teachings/009.m4a", "title": "پسر خدا", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-010", "category": "teaching", "src": "audio/fa/teachings/010.m4a", "title": "تغذیه روحانی و تمرکز بر کلام", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-011", "category": "teaching", "src": "audio/fa/teachings/011.m4a", "title": "منابع مالی و شما", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-012", "category": "teaching", "src": "audio/fa/teachings/012.m4a", "title": "پنج عطیه خدمتی به کلیسا", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-013", "category": "teaching", "src": "audio/fa/teachings/013.m4a", "title": "چرا باید شب‌ها دعا کنیم؟", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-014", "category": "teaching", "src": "audio/fa/teachings/014.m4a", "title": "سفر روح‌القدس", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-015", "category": "teaching", "src": "audio/fa/teachings/015.m4a", "title": "سه عطیه روح خدا به روح ما", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-016", "category": "teaching", "src": "audio/fa/teachings/016.m4a", "title": "شکرگزاری در کلام و عمل", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-017", "category": "teaching", "src": "audio/fa/teachings/017.m4a", "title": "خدمتگزاری", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-018", "category": "teaching", "src": "audio/fa/teachings/018.m4a", "title": "خدمت مؤثر", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-019", "category": "teaching", "src": "audio/fa/teachings/019.m4a", "title": "عملکرد روح‌القدس", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-020", "category": "teaching", "src": "audio/fa/teachings/020.m4a", "title": "روز شریر", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-021", "category": "teaching", "src": "audio/fa/teachings/021.m4a", "title": "نکات فیض و ایمان", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-022", "category": "teaching", "src": "audio/fa/teachings/022.m4a", "title": "مایه برکت", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-023", "category": "teaching", "src": "audio/fa/teachings/023.m4a", "title": "لوسیفر / شیطان", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-024", "category": "teaching", "src": "audio/fa/teachings/024.m4a", "title": "عیسی کیست", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-025", "category": "teaching", "src": "audio/fa/teachings/025.m4a", "title": "اهمیت دعا", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-026", "category": "teaching", "src": "audio/fa/teachings/026.m4a", "title": "فرشتگان و پژواک حقایق", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-027", "category": "teaching", "src": "audio/fa/teachings/027.mp3", "title": "نور جهان هستید و پژواک حقایق", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-028", "category": "teaching", "src": "audio/fa/teachings/028.m4a", "title": "اتحاد قلبی", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}, {"id": "teaching-029", "category": "teaching", "src": "audio/fa/teachings/029.m4a", "title": "ذهن، فکر، سخن گفتن", "desc": "تعلیم صوتی برای رشد در کلام، ایمان و زندگی روحانی.", "tag": "تعلیم"}];

  function omidLang(){ return window.currentLang || localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
  function omidFaNum(v){ try { return typeof toFaDigits==='function' ? toFaDigits(v) : String(v); } catch(e){ return String(v); } }
  function omidShowPage(id){ if(typeof showPage === 'function'){ showPage(id); return; } document.querySelectorAll('.page').forEach(p=>p.classList.remove('active')); const el=document.getElementById(id); if(el) el.classList.add('active'); }
  function omidLoc(obj){ const lang=omidLang(); return (obj&&obj[lang]) || (obj&&obj.en) || (typeof obj==='string'?obj:''); }

  window.renderSpiritualAudioFeature = function(){
    const home=document.getElementById('home'); if(!home)return;
    home.querySelectorAll('[data-audio-home-card]').forEach(el=>el.remove());
    if(omidLang()!=='fa') return;
    const card=document.createElement('div');
    card.className='card feature-card audio-home-card';
    card.setAttribute('data-audio-home-card','1');
    card.innerHTML='<h3>پیام‌های صوتی روحانی</h3><p>نیایش‌های صبحگاهی، پیام‌های کوتاه و تعالیم صوتی برای تقویت ایمان.</p><button class="btn gold" type="button" onclick="openSpiritualAudio()">باز کردن پیام‌های صوتی</button>';
    const grid=home.querySelector('.home-feature-grid');
    if(grid) grid.prepend(card); else { const hero=home.querySelector('.hero-card'); if(hero) hero.insertAdjacentElement('afterend', card); else home.prepend(card); }
  };
  window.ensureSpiritualAudioPage = function(){ let section=document.getElementById('audioMessages'); if(!section){ section=document.createElement('section'); section.id='audioMessages'; section.className='page'; (document.querySelector('main')||document.body).appendChild(section); } return section; };
  window.openSpiritualAudio = function(audioId){ ensureSpiritualAudioPage(); omidShowPage('audioMessages'); renderSpiritualAudioMessages(audioId); };
  window.audioShareLink = function(id){ const url=new URL(location.href); url.searchParams.set('v','45-final-override'); url.searchParams.set('audio',id); url.searchParams.delete('reset'); return url.origin + url.pathname + url.search; };
  window.shareAudioMessage = async function(id){ const item=AUDIO_ITEMS.find(x=>x.id===id); if(!item)return; const link=audioShareLink(id); const text=item.title+"\n\nبرای گوش دادن به این پیام صوتی از اپ کلیسای امیدنو۷ وارد شوید:\n"+link; try{ if(navigator.share) await navigator.share({title:item.title,text,url:link}); else { await navigator.clipboard.writeText(text); alert('لینک پیام کپی شد'); } }catch(e){ try{ await navigator.clipboard.writeText(text); alert('لینک پیام کپی شد'); }catch(err){ prompt('لینک پیام:',link); } } };
  function audioEl(id){ return document.getElementById('audio-player-'+id); }
  window.playAudio=function(id){ const a=audioEl(id); if(!a)return; document.querySelectorAll('.spiritual-audio-el').forEach(x=>{if(x!==a)x.pause();}); if(a.paused)a.play(); else a.pause(); };
  window.stopAudio=function(id){ const a=audioEl(id); if(!a)return; a.pause(); a.currentTime=0; };
  window.seekAudio=function(id,sec){ const a=audioEl(id); if(!a)return; a.currentTime=Math.max(0,Math.min((a.duration||999999),a.currentTime+sec)); };
  window.setAudioSpeed=function(id,rate){ const a=audioEl(id); if(!a)return; a.playbackRate=rate; document.querySelectorAll('[data-speed-for="'+id+'"]').forEach(b=>b.classList.toggle('active',Number(b.dataset.rate)===rate)); };
  window.toggleAudioNote=function(id){ const box=document.getElementById('audio-note-box-'+id); if(box) box.hidden=!box.hidden; };
  window.saveAudioNote=function(id){ const el=document.getElementById('audio-note-'+id); if(!el)return; localStorage.setItem('audio_note_'+id,el.value||''); const st=document.getElementById('audio-note-status-'+id); if(st)st.textContent='ذخیره شد'; };
  window.toggleAudioFavorite=function(id){ const k='audio_favorite_'+id; localStorage.getItem(k)==='1'?localStorage.removeItem(k):localStorage.setItem(k,'1'); renderSpiritualAudioList(window.currentAudioCategory||'morning'); };
  window.renderSpiritualAudioMessages=function(audioId){
    const root=ensureSpiritualAudioPage();
    if(omidLang()!=='fa'){ root.innerHTML='<div class="section-title"><h2>Audio Messages</h2></div><div class="card"><p>Audio messages for this language will be added soon.</p></div>'; return; }
    const cats=[{id:'morning',label:'نیایش صبحگاهی'},{id:'short',label:'پیام‌های کوتاه'},{id:'teaching',label:'تعالیم'}];
    const targetId=audioId || new URLSearchParams(location.search).get('audio');
    const target=AUDIO_ITEMS.find(x=>x.id===targetId);
    const def=target?target.category:'morning';
    root.innerHTML='<div class="section-title"><h2>پیام‌های صوتی روحانی</h2></div><div class="hero-card audio-hero"><h1>پیام‌های صوتی روحانی</h1><p>موعظه‌ها، تعالیم، دعاها و پیام‌های کوتاه برای تقویت ایمان.</p></div><div class="audio-category-row">'+cats.map(c=>'<button class="audio-cat-btn '+(c.id===def?'active':'')+'" data-audio-cat="'+c.id+'">'+c.label+'</button>').join('')+'</div><div id="audioMessagesList"></div>';
    root.querySelectorAll('[data-audio-cat]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-audio-cat]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderSpiritualAudioList(btn.dataset.audioCat); }));
    renderSpiritualAudioList(def);
  };
  window.renderSpiritualAudioList=function(cat){
    window.currentAudioCategory=cat||'morning';
    const list=document.getElementById('audioMessagesList'); if(!list)return;
    const items=AUDIO_ITEMS.filter(x=>x.category===window.currentAudioCategory);
    list.innerHTML=items.length?items.map(item=>{
      const note=localStorage.getItem('audio_note_'+item.id)||'';
      const fav=localStorage.getItem('audio_favorite_'+item.id)==='1';
      return '<div class="card audio-message-card" id="audio-card-'+item.id+'"><div class="audio-message-head"><span class="audio-tag">'+item.tag+'</span><h3>'+item.title+'</h3></div><p>'+item.desc+'</p><audio class="spiritual-audio-el" id="audio-player-'+item.id+'" preload="metadata" controls controlsList="nodownload noplaybackrate" src="'+item.src+'"></audio><div class="audio-control-bar"><button type="button" onclick="playAudio(\''+item.id+'\')">▶︎ / ⏸</button><button type="button" onclick="seekAudio(\''+item.id+'\',-15)">-۱۵ ثانیه</button><button type="button" onclick="seekAudio(\''+item.id+'\',15)">+۱۵ ثانیه</button><button type="button" onclick="stopAudio(\''+item.id+'\')">توقف</button></div><div class="audio-speed-row"><span>سرعت:</span><button type="button" data-speed-for="'+item.id+'" data-rate="1" class="active" onclick="setAudioSpeed(\''+item.id+'\',1)">1x</button><button type="button" data-speed-for="'+item.id+'" data-rate="1.25" onclick="setAudioSpeed(\''+item.id+'\',1.25)">1.25x</button><button type="button" data-speed-for="'+item.id+'" data-rate="1.5" onclick="setAudioSpeed(\''+item.id+'\',1.5)">1.5x</button><button type="button" data-speed-for="'+item.id+'" data-rate="2" onclick="setAudioSpeed(\''+item.id+'\',2)">2x</button></div><div class="audio-action-row"><button type="button" class="btn light" onclick="toggleAudioNote(\''+item.id+'\')">یادداشت</button><button type="button" class="btn light" onclick="toggleAudioFavorite(\''+item.id+'\')">'+(fav?'★ ستاره‌دار':'☆ ستاره‌دار')+'</button><button type="button" class="btn gold" onclick="shareAudioMessage(\''+item.id+'\')">اشتراک‌گذاری لینک</button></div><div class="audio-note-box" id="audio-note-box-'+item.id+'" hidden><textarea id="audio-note-'+item.id+'" maxlength="12000" placeholder="یادداشت خود را از این پیام صوتی بنویسید...">'+note+'</textarea><div class="note-tools"><button class="btn primary" onclick="saveAudioNote(\''+item.id+'\')">ذخیره یادداشت</button><span id="audio-note-status-'+item.id+'" class="status"></span></div></div></div>';
    }).join(''):'<div class="card"><p>فعلاً پیامی در این دسته‌بندی ثبت نشده است.</p></div>';
  };

  const DECLARATIONS=[
    {day:1,title:{fa:'اعلان ایمان',en:'Faith Declaration',hr:'Izjava vjere'},verse:{fa:'مرقس ۱۱:۲۳-۲۴',en:'Mark 11:23-24',hr:'Marko 11,23-24'},text:{fa:'من با ایمان سخن می‌گویم و کلام خدا در زندگی من ثمر می‌آورد.',en:'I speak by faith, and the Word of God produces fruit in my life.',hr:'Govorim vjerom i Božja riječ donosi plod u mom životu.'}},
    {day:2,title:{fa:'من در مسیح پیروز هستم',en:'I am victorious in Christ',hr:'Pobjednik sam u Kristu'},verse:{fa:'اول یوحنا ۵:۴',en:'1 John 5:4',hr:'1 Ivanova 5,4'},text:{fa:'ایمان من بر دنیا غلبه می‌کند. من در مسیح پیروز هستم.',en:'My faith overcomes the world. I am victorious in Christ.',hr:'Moja vjera pobjeđuje svijet. Pobjednik sam u Kristu.'}},
    {day:3,title:{fa:'روح‌القدس مرا هدایت می‌کند',en:'The Holy Spirit leads me',hr:'Duh Sveti me vodi'},verse:{fa:'رومیان ۸:۱۴',en:'Romans 8:14',hr:'Rimljanima 8,14'},text:{fa:'من فرزند خدا هستم و توسط روح خدا هدایت می‌شوم.',en:'I am a child of God and I am led by the Spirit of God.',hr:'Božje sam dijete i vodi me Duh Božji.'}},
    {day:4,title:{fa:'کلام خدا در من زنده است',en:"God's Word is alive in me",hr:'Božja riječ je živa u meni'},verse:{fa:'عبرانیان ۴:۱۲',en:'Hebrews 4:12',hr:'Hebrejima 4,12'},text:{fa:'کلام خدا در قلب، فکر و دهان من زنده و فعال است.',en:"God's Word is alive and active in my heart, mind, and mouth.",hr:'Božja riječ je živa i djelotvorna u mom srcu, mislima i ustima.'}},
    {day:5,title:{fa:'من نور جهان هستم',en:'I am the light of the world',hr:'Ja sam svjetlo svijeta'},verse:{fa:'متی ۵:۱۴',en:'Matthew 5:14',hr:'Matej 5,14'},text:{fa:'نور مسیح از طریق زندگی من می‌درخشد.',en:'The light of Christ shines through my life.',hr:'Kristovo svjetlo sjaji kroz moj život.'}},
    {day:6,title:{fa:'من در محبت راه می‌روم',en:'I walk in love',hr:'Hodam u ljubavi'},verse:{fa:'افسسیان ۵:۲',en:'Ephesians 5:2',hr:'Efežanima 5,2'},text:{fa:'محبت خدا در قلب من ریخته شده و من در محبت رفتار می‌کنم.',en:"God's love has been poured into my heart, and I walk in love.",hr:'Božja ljubav izlivena je u moje srce i hodam u ljubavi.'}},
    {day:7,title:{fa:'من با حکمت خدا زندگی می‌کنم',en:"I live by God's wisdom",hr:'Živim Božjom mudrošću'},verse:{fa:'یعقوب ۱:۵',en:'James 1:5',hr:'Jakovljeva 1,5'},text:{fa:'حکمت خدا تصمیم‌ها، سخنان و مسیر مرا هدایت می‌کند.',en:"God's wisdom guides my decisions, words, and path.",hr:'Božja mudrost vodi moje odluke, riječi i put.'}}
  ];
  window.renderDeclarations=function(){
    const root=document.getElementById('declarationsContent'); if(!root)return;
    const day=(typeof getDeclarationDay==='function'?getDeclarationDay():new Date().getDate());
    const item=DECLARATIONS[(day-1)%DECLARATIONS.length];
    root.innerHTML='<div class="declaration-day-card"><span class="day-label">'+(omidLang()==='fa'?'روز':'Day')+' '+(omidLang()==='fa'?omidFaNum(item.day):item.day)+'</span><h2>'+omidLoc(item.title)+'</h2><div class="plan-section-title">'+(omidLang()==='fa'?'آیه':'Verse')+'</div><details class="plan-scripture-expand" open><summary>'+omidLoc(item.verse)+'</summary><p>'+omidLoc(item.text)+'</p></details><div class="plan-section-title">'+(omidLang()==='fa'?'اعلان':'Declaration')+'</div><p><strong>'+omidLoc(item.text)+'</strong></p></div>';
  };

  window.renderNewBirthContent=function(){
    const root=document.getElementById('newBirthContent'); if(!root)return;
    const pack={fa:{title:'تولد تازه و نجات در مسیح',sub:'زندگی تازه در عیسی مسیح',sections:[['تولد تازه چیست؟','تولد تازه یعنی انسان با ایمان به عیسی مسیح از درون زنده می‌شود و حیات خدا را دریافت می‌کند. این فقط تغییر مذهب نیست؛ آغاز یک زندگی تازه در مسیح است.'],['نجات در مسیح','نجات هدیه خداست. ما با کارهای مذهبی نجات نمی‌یابیم، بلکه با ایمان به قربانی کامل عیسی مسیح، مرگ و قیام او، نجات را دریافت می‌کنیم.'],['دعای ایمان','خداوند عیسی، من به تو ایمان دارم. باور دارم که برای من مردی و از مردگان برخاستی. امروز تو را خداوند و نجات‌دهنده زندگی خود اعلام می‌کنم. آمین.']]},en:{title:'New Birth and Salvation in Christ',sub:'A new life in Jesus Christ',sections:[['What is the new birth?','The new birth means a person becomes alive inwardly by faith in Jesus Christ and receives the life of God. It is not merely changing religion; it is the beginning of a new life in Christ.'],['Salvation in Christ','Salvation is God’s gift. We are not saved by religious works, but by faith in the complete sacrifice, death, and resurrection of Jesus Christ.'],['Prayer of faith','Lord Jesus, I believe in You. I believe You died for me and rose from the dead. Today I declare You as Lord and Savior of my life. Amen.']]},hr:{title:'Novo rođenje i spasenje u Kristu',sub:'Novi život u Isusu Kristu',sections:[['Što je novo rođenje?','Novo rođenje znači da čovjek po vjeri u Isusa Krista iznutra prima život od Boga. To nije samo promjena religije; to je početak novog života u Kristu.'],['Spasenje u Kristu','Spasenje je Božji dar. Ne spašavamo se religioznim djelima, nego vjerom u savršenu žrtvu, smrt i uskrsnuće Isusa Krista.'],['Molitva vjere','Gospodine Isuse, vjerujem u Tebe. Vjerujem da si umro za mene i uskrsnuo od mrtvih. Danas Te priznajem kao Gospodina i Spasitelja svog života. Amen.']]}};
    const data=pack[omidLang()]||pack.en;
    root.innerHTML='<div class="section-title"><h2>'+data.title+'</h2></div><div class="hero-card salvation-hero"><h1>'+data.title+'</h1><p>'+data.sub+'</p></div><div class="salvation-options">'+data.sections.map(s=>'<div class="card salvation-card"><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>').join('')+'</div>';
  };

  window.fastingVerseText=function(ref){
    const m={'Matthew 4:4':{fa:'انسان نه فقط به نان زیست می‌کند، بلکه به هر کلمه‌ای که از دهان خدا صادر گردد.',en:'Man shall not live by bread alone, but by every word that proceeds from the mouth of God.',hr:'Ne živi čovjek samo o kruhu, nego o svakoj riječi koja izlazi iz Božjih usta.'},'Matthew 6:16-18':{fa:'وقتی روزه می‌گیرید، مانند ریاکاران نباشید. روزه در حضور پدر است، نه برای نمایش انسان‌ها.',en:'When you fast, do not be like the hypocrites. Fasting is before the Father, not for human display.',hr:'Kad postite, ne budite kao licemjeri. Post je pred Ocem, a ne za pokazivanje ljudima.'},'John 10:27':{fa:'گوسفندان من آواز مرا می‌شنوند و من آنها را می‌شناسم و مرا متابعت می‌کنند.',en:'My sheep hear my voice, and I know them, and they follow me.',hr:'Moje ovce slušaju moj glas; ja ih poznajem i one idu za mnom.'},'Romans 8:14':{fa:'زیرا همه کسانی که از روح خدا هدایت می‌شوند، پسران خدا هستند.',en:'For as many as are led by the Spirit of God, these are children of God.',hr:'Svi koje vodi Duh Božji sinovi su Božji.'},'Proverbs 3:5-6':{fa:'با تمامی دل خود بر خداوند توکل نما و بر عقل خود تکیه مکن؛ او راه‌هایت را راست خواهد گردانید.',en:'Trust in the Lord with all your heart; He will direct your paths.',hr:'Uzdaj se u Gospodina svim srcem svojim; on će poravniti tvoje staze.'},'Romans 10:17':{fa:'ایمان از شنیدن است و شنیدن از کلام خدا.',en:'Faith comes by hearing, and hearing by the Word of God.',hr:'Vjera dolazi od slušanja, a slušanje po Božjoj riječi.'},'Mark 11:23-24':{fa:'هر که ایمان داشته باشد و در دل خود شک نکند، آنچه بگوید برای او خواهد شد.',en:'Whoever believes and does not doubt in his heart will have what he says.',hr:'Tko vjeruje i ne posumnja u srcu, bit će mu što kaže.'},'Hebrews 11:1':{fa:'ایمان، اطمینان به چیزهایی است که امید داریم و یقین به چیزهایی که نمی‌بینیم.',en:'Faith is the substance of things hoped for, the evidence of things not seen.',hr:'Vjera je jamstvo onoga čemu se nadamo i dokaz stvarnosti koje ne vidimo.'},'Isaiah 58:6-12':{fa:'روزه‌ای که خدا می‌پسندد با آزادی، عدالت، رحمت و خدمت به دیگران همراه است.',en:'The fast God chooses is connected with freedom, justice, mercy, and service to others.',hr:'Post koji Bog izabire povezan je sa slobodom, pravdom, milosrđem i služenjem drugima.'},'Acts 13:2-3':{fa:'در حالی که خدمت خداوند می‌کردند و روزه داشتند، روح‌القدس هدایت خود را آشکار کرد.',en:'As they ministered to the Lord and fasted, the Holy Spirit revealed His guidance.',hr:'Dok su služili Gospodinu i postili, Duh Sveti je objavio svoje vodstvo.'},'Colossians 3:15':{fa:'صلح خدا در دل‌های شما حکم‌فرما باشد.',en:'Let the peace of God rule in your hearts.',hr:'Neka mir Božji vlada u vašim srcima.'},'Galatians 6:9':{fa:'از نیکوکاری خسته نشویم، زیرا در زمان مناسب درو خواهیم کرد اگر سست نشویم.',en:'Let us not grow weary in doing good, for in due season we shall reap if we do not give up.',hr:'Ne umarajmo se činiti dobro, jer ćemo u pravo vrijeme žeti ako ne posustanemo.'}};
    return omidLoc(m[ref]) || ref;
  };
  window.fastingRefsHtml=function(item){ return '<div class="fasting-refs">'+(item.refs||[]).map(r=>'<details class="plan-scripture-expand"><summary>'+r+'</summary><p>'+fastingVerseText(r)+'</p></details>').join('')+'</div>'; };

  if(typeof window.renderFastingHome==='function' && !window.__omidFastingHomeBackPatched){
    window.__omidFastingHomeBackPatched=true;
    const old=window.renderFastingHome;
    window.renderFastingHome=function(){
      const label=omidLang()==='fa'?'بازگشت به همه پلن‌ها':omidLang()==='hr'?'Natrag na sve planove':'Back to all plans';
      const back=`<button class="btn light" onclick="selectedPlanKey=null; localStorage.removeItem('selectedPlanKey'); fastingView='home'; localStorage.setItem('fastingView','home'); renderPlans();">← ${label}</button>`;
      return back + old();
    };
  }

  function omidFinalRender(){
    try{ renderSpiritualAudioFeature(); }catch(e){ console.error(e); }
    try{ renderDeclarations(); }catch(e){ console.error(e); }
    try{ renderNewBirthContent(); }catch(e){ console.error(e); }
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(omidFinalRender,600));
  setTimeout(omidFinalRender,1000);
})();



/* OMIDNO7 CONTENT OVERRIDE 2026-05-31: richer faith declarations and complete new birth/salvation section. */
(function(){
  function lang(){ return window.currentLang || localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
  function loc(obj){ const l=lang(); return (obj&&obj[l]) || (obj&&obj.en) || (typeof obj==='string'?obj:''); }
  function faNum(v){ try{return typeof toFaDigits==='function'?toFaDigits(v):String(v);}catch(e){return String(v);} }

  const declarationSets = [
    {
      day:1,
      title:{fa:'اعلان ایمان برای پیروزی در مسیح',en:'Faith Declaration for Victory in Christ',hr:'Izjava vjere za pobjedu u Kristu'},
      verse:{fa:'اول یوحنا ۵:۴',en:'1 John 5:4',hr:'1 Ivanova 5,4'},
      verseText:{fa:'زیرا هر که از خدا مولود شده است، بر دنیا غلبه می‌کند؛ و این است آن غلبه‌ای که بر دنیا غالب شده است، یعنی ایمان ما.',en:'Whatever is born of God overcomes the world; and this is the victory that overcomes the world, even our faith.',hr:'Sve što je rođeno od Boga pobjeđuje svijet; i ovo je pobjeda koja pobjeđuje svijet: naša vjera.'},
      declaration:{fa:'من از خدا مولود شده‌ام؛ بنابراین زندگی من زندگی شکست نیست، بلکه زندگی پیروزی است. ایمان من زنده، فعال و ثمربخش است. من با نگاه خدا به شرایط نگاه می‌کنم، نه با ترس، فشار یا محدودیت‌های دنیا. امروز اعلام می‌کنم که در مسیح قوی هستم، در حکمت خدا حرکت می‌کنم و هیچ وضعیتی نمی‌تواند ایمان مرا خاموش کند. من با ایمان سخن می‌گویم، با ایمان تصمیم می‌گیرم و با ایمان پیش می‌روم. پیروزی من در مسیح ثابت است.',en:'I am born of God; therefore my life is not a life of defeat but a life of victory. My faith is alive, active, and fruitful. I see circumstances through God’s Word, not through fear, pressure, or the limits of this world. Today I declare that I am strong in Christ, I walk in the wisdom of God, and no situation can silence my faith. I speak by faith, decide by faith, and move forward by faith. My victory in Christ is established.',hr:'Rođen sam od Boga; zato moj život nije život poraza, nego pobjede. Moja vjera je živa, aktivna i plodonosna. Okolnosti gledam kroz Božju riječ, a ne kroz strah, pritisak ili ograničenja svijeta. Danas izjavljujem da sam jak u Kristu, hodam u Božjoj mudrosti i nijedna situacija ne može utišati moju vjeru. Govorim vjerom, odlučujem vjerom i idem naprijed vjerom. Moja pobjeda u Kristu je utvrđena.'}
    },
    {
      day:2,
      title:{fa:'اعلان ایمان برای سلامتی و قوت',en:'Faith Declaration for Health and Strength',hr:'Izjava vjere za zdravlje i snagu'},
      verse:{fa:'اول پطرس ۲:۲۴',en:'1 Peter 2:24',hr:'1 Petrova 2,24'},
      verseText:{fa:'او گناهان ما را در بدن خود بر دار حمل کرد... که به زخم‌های او شفا یافته‌اید.',en:'By His stripes you were healed.',hr:'Njegovim ste ranama ozdravljeni.'},
      declaration:{fa:'من بدن خود را با حقیقت کلام خدا همسو می‌کنم. حیات مسیح در من عمل می‌کند و قوت خدا در تمام وجودم جاری است. من سلامتی، توانایی و آرامش الهی را بر بدن، فکر و احساسات خود اعلام می‌کنم. هیچ ترس، ضعف یا اضطرابی بر من حکومت نمی‌کند، زیرا روح خدا در من ساکن است. من با ایمان می‌گویم: بدن من جایگاه روح‌القدس است، حیات خدا در من فعال است، و من هر روز در قوت، سلامت و آرامش زندگی می‌کنم.',en:'I align my body with the truth of God’s Word. The life of Christ works in me, and the strength of God flows through my whole being. I declare divine health, strength, and peace over my body, mind, and emotions. No fear, weakness, or anxiety rules over me, because the Spirit of God lives in me. By faith I say: my body is the temple of the Holy Spirit, the life of God is active in me, and I live daily in strength, health, and peace.',hr:'Svoje tijelo usklađujem s istinom Božje riječi. Kristov život djeluje u meni i Božja snaga teče kroz cijelo moje biće. Izjavljujem božansko zdravlje, snagu i mir nad svojim tijelom, mislima i osjećajima. Strah, slabost i tjeskoba ne vladaju nada mnom jer Duh Božji prebiva u meni. Vjerom govorim: moje tijelo je hram Duha Svetoga, Božji život djeluje u meni i živim u snazi, zdravlju i miru.'}
    },
    {
      day:3,
      title:{fa:'اعلان ایمان برای رفاه مالی و برکت',en:'Faith Declaration for Financial Prosperity and Blessing',hr:'Izjava vjere za financijski napredak i blagoslov'},
      verse:{fa:'دوم قرنتیان ۹:۸',en:'2 Corinthians 9:8',hr:'2 Korinćanima 9,8'},
      verseText:{fa:'خدا قادر است که هر نعمت را برای شما فراوان گرداند تا همیشه در هر چیز کفایت کامل داشته باشید و برای هر عمل نیکو افزونی یابید.',en:'God is able to make all grace abound toward you, so that you always have all sufficiency in all things and abound to every good work.',hr:'Bog može učiniti da vam svaka milost obiluje, da uvijek imate svaku dostatnost i obilujete za svako dobro djelo.'},
      declaration:{fa:'من خدا را منبع زندگی، برکت و تأمین خود می‌دانم. من از کمبود، ترس مالی و نگرانی رها هستم، زیرا فیض خدا بر زندگی من فراوان است. حکمت خدا مرا در کار، تصمیم‌ها، فرصت‌ها و مدیریت منابع هدایت می‌کند. من فقط برای خودم برکت نمی‌گیرم؛ من برای انجام اعمال نیکو، خدمت به خداوند، کمک به دیگران و پیشبرد ملکوت خدا برکت می‌یابم. امروز اعلام می‌کنم که درهای درست باز می‌شوند، حکمت مالی در من فعال است و فراوانی خدا در زندگی من جاری است.',en:'I recognize God as the source of my life, blessing, and supply. I am free from lack, financial fear, and anxiety, because the grace of God abounds toward me. God’s wisdom guides me in work, decisions, opportunities, and the management of resources. I am not blessed only for myself; I am blessed for good works, service to the Lord, helping others, and advancing God’s Kingdom. Today I declare that the right doors open, financial wisdom is active in me, and God’s abundance flows in my life.',hr:'Boga priznajem kao izvor svog života, blagoslova i opskrbe. Slobodan sam od oskudice, financijskog straha i tjeskobe jer Božja milost obiluje prema meni. Božja mudrost vodi me u poslu, odlukama, prilikama i upravljanju sredstvima. Nisam blagoslovljen samo za sebe; blagoslovljen sam za dobra djela, služenje Gospodinu, pomaganje drugima i širenje Božjeg Kraljevstva. Danas izjavljujem da se prava vrata otvaraju, financijska mudrost djeluje u meni i Božje obilje teče u mom životu.'}
    },
    {
      day:4,
      title:{fa:'اعلان ایمان برای هدایت روح‌القدس',en:'Faith Declaration for the Guidance of the Holy Spirit',hr:'Izjava vjere za vodstvo Duha Svetoga'},
      verse:{fa:'رومیان ۸:۱۴',en:'Romans 8:14',hr:'Rimljanima 8,14'},
      verseText:{fa:'زیرا همه کسانی که از روح خدا هدایت می‌شوند، پسران خدا هستند.',en:'For as many as are led by the Spirit of God, they are the sons of God.',hr:'Svi koje vodi Duh Božji sinovi su Božji.'},
      declaration:{fa:'من فرزند خدا هستم و صدای روح‌القدس برای من بیگانه نیست. قلب من نسبت به هدایت خداوند حساس است. من تصمیم‌های خود را با عجله، ترس یا فشار نمی‌گیرم؛ بلکه با صلح مسیح و حکمت روح‌القدس حرکت می‌کنم. امروز اعلام می‌کنم که راه خدا برای من روشن می‌شود، فکر من با کلام خدا تنظیم می‌شود و قدم‌های من توسط روح خدا هدایت می‌گردد. من در مسیر درست هستم و در زمان درست، تصمیم درست را با ایمان می‌گیرم.',en:'I am a child of God, and the voice of the Holy Spirit is not strange to me. My heart is sensitive to the Lord’s guidance. I do not make decisions by pressure, fear, or haste; I move by the peace of Christ and the wisdom of the Holy Spirit. Today I declare that God’s way becomes clear to me, my mind is aligned with the Word of God, and my steps are directed by the Spirit of God. I am on the right path, and at the right time I make the right decision by faith.',hr:'Božje sam dijete i glas Duha Svetoga nije mi stran. Moje srce je osjetljivo na Gospodinovo vodstvo. Ne donosim odluke pod pritiskom, strahom ili žurbom; krećem se po Kristovu miru i mudrosti Duha Svetoga. Danas izjavljujem da mi Božji put postaje jasan, moj um je usklađen s Božjom riječju i moje korake vodi Duh Božji. Na pravom sam putu i u pravo vrijeme donosim pravu odluku vjerom.'}
    },
    {
      day:5,
      title:{fa:'اعلان ایمان برای خانواده',en:'Faith Declaration for Family',hr:'Izjava vjere za obitelj'},
      verse:{fa:'اعمال ۱۶:۳۱',en:'Acts 16:31',hr:'Djela 16,31'},
      verseText:{fa:'به خداوند عیسی مسیح ایمان آور که تو و اهل خانه‌ات نجات خواهید یافت.',en:'Believe on the Lord Jesus Christ, and you will be saved, you and your household.',hr:'Vjeruj u Gospodina Isusa i bit ćeš spašen, ti i dom tvoj.'},
      declaration:{fa:'من خانواده خود را در حضور خداوند با ایمان اعلام می‌کنم. صلح، محبت، حکمت و نور مسیح بر خانه من جاری است. هر دیوار سردی، سوءتفاهم، ترس و فشار در نام عیسی شکسته می‌شود. من اعلام می‌کنم که خانه من مکانی برای حضور خدا، کلام خدا، دعا، بخشش و رشد روحانی است. نجات، شفا، اتحاد و هدایت خداوند بر خانواده من آشکار می‌شود و هر عضو خانواده در نور و محبت خدا پیش می‌رود.',en:'I bring my family before the Lord by faith. The peace, love, wisdom, and light of Christ flow in my home. Every wall of coldness, misunderstanding, fear, and pressure is broken in the name of Jesus. I declare that my home is a place of God’s presence, God’s Word, prayer, forgiveness, and spiritual growth. Salvation, healing, unity, and the guidance of the Lord are revealed in my family, and every member moves forward in God’s light and love.',hr:'Svoju obitelj donosim pred Gospodina vjerom. Kristov mir, ljubav, mudrost i svjetlo teku u mom domu. Svaki zid hladnoće, nerazumijevanja, straha i pritiska slomljen je u Isusovo ime. Izjavljujem da je moj dom mjesto Božje prisutnosti, Božje riječi, molitve, oproštenja i duhovnog rasta. Spasenje, iscjeljenje, jedinstvo i Gospodinovo vodstvo očituju se u mojoj obitelji, i svaki član ide naprijed u Božjem svjetlu i ljubavi.'}
    },
    {
      day:6,
      title:{fa:'اعلان ایمان برای خدمت و ثمردهی',en:'Faith Declaration for Ministry and Fruitfulness',hr:'Izjava vjere za službu i plodnost'},
      verse:{fa:'یوحنا ۱۵:۵',en:'John 15:5',hr:'Ivan 15,5'},
      verseText:{fa:'هر که در من بماند و من در او، میوه بسیار می‌آورد.',en:'He who abides in Me, and I in him, bears much fruit.',hr:'Tko ostaje u meni i ja u njemu, donosi mnogo roda.'},
      declaration:{fa:'من در مسیح می‌مانم و حیات او در من ثمر می‌آورد. خدمت من از فشار انسانی نیست، بلکه از مشارکت با خداوند جاری می‌شود. من برای تأثیرگذاری، بنا کردن دیگران، رساندن انجیل، دعا، محبت و خدمت وفادارانه مسح شده‌ام. امروز اعلام می‌کنم که کار دست من برکت می‌یابد، سخنان من حامل حیات می‌شود و خداوند از زندگی من برای لمس قلب‌ها استفاده می‌کند. من در خدمت خسته نمی‌شوم، زیرا قوت من از خداوند است.',en:'I abide in Christ, and His life produces fruit in me. My ministry does not flow from human pressure, but from fellowship with the Lord. I am anointed to influence, build others, share the Gospel, pray, love, and serve faithfully. Today I declare that the work of my hands is blessed, my words carry life, and the Lord uses my life to touch hearts. I do not grow weary in service, because my strength is from the Lord.',hr:'Ostajem u Kristu i Njegov život donosi plod u meni. Moja služba ne proizlazi iz ljudskog pritiska, nego iz zajedništva s Gospodinom. Pomazan sam za utjecaj, izgradnju drugih, naviještanje Evanđelja, molitvu, ljubav i vjerno služenje. Danas izjavljujem da je djelo mojih ruku blagoslovljeno, moje riječi nose život i Gospodin koristi moj život da dotakne srca. Ne umaram se u služenju jer je moja snaga od Gospodina.'}
    },
    {
      day:7,
      title:{fa:'اعلان ایمان برای صلح و شادی',en:'Faith Declaration for Peace and Joy',hr:'Izjava vjere za mir i radost'},
      verse:{fa:'فیلیپیان ۴:۷',en:'Philippians 4:7',hr:'Filipljanima 4,7'},
      verseText:{fa:'و سلامتی خدا که فوق از تمامی عقل است، دل‌ها و ذهن‌های شما را در مسیح عیسی نگاه خواهد داشت.',en:'The peace of God, which surpasses all understanding, will guard your hearts and minds in Christ Jesus.',hr:'Mir Božji koji nadilazi svaki razum čuvat će vaša srca i misli u Kristu Isusu.'},
      declaration:{fa:'صلح خدا نگهبان قلب و فکر من است. من اجازه نمی‌دهم نگرانی، اضطراب، خشم یا فشار روز، فضای درون مرا کنترل کند. شادی خداوند قوت من است و من با قلبی آرام، ذهنی روشن و روحی قوی حرکت می‌کنم. امروز اعلام می‌کنم که صلح مسیح در تصمیم‌هایم داوری می‌کند، شادی روح‌القدس در من می‌جوشد و حضور خداوند بر زندگی من آشکار است. من آرام، ثابت‌قدم و پر از امید هستم.',en:'The peace of God guards my heart and mind. I do not allow worry, anxiety, anger, or the pressure of the day to control my inner life. The joy of the Lord is my strength, and I move with a peaceful heart, a clear mind, and a strong spirit. Today I declare that the peace of Christ rules in my decisions, the joy of the Holy Spirit rises within me, and the presence of the Lord is evident in my life. I am peaceful, steadfast, and full of hope.',hr:'Božji mir čuva moje srce i um. Ne dopuštam brizi, tjeskobi, ljutnji ili pritisku dana da upravljaju mojom nutrinom. Gospodinova radost moja je snaga i idem naprijed s mirnim srcem, jasnim umom i snažnim duhom. Danas izjavljujem da Kristov mir vlada u mojim odlukama, radost Duha Svetoga izvire u meni i Gospodinova prisutnost je očita u mom životu. Miran sam, postojan i pun nade.'}
    }
  ];

  window.renderDeclarations=function(){
    const root=document.getElementById('declarationsContent'); if(!root)return;
    const d=new Date(); const index=(d.getDate()-1)%declarationSets.length;
    const item=declarationSets[index];
    root.innerHTML = '<div class="section-title"><h2>'+(lang()==='fa'?'اعلان‌های ایمان':lang()==='hr'?'Izjave vjere':'Faith Declarations')+'</h2></div>'+
    '<div class="hero-card"><h1>'+loc(item.title)+'</h1><p>'+(lang()==='fa'?'این اعلان را با ایمان و صدای بلند بخوانید.':lang()==='hr'?'Pročitajte ovu izjavu vjerom i naglas.':'Read this declaration with faith and aloud.')+'</p></div>'+
    '<div class="declaration-day-card"><span class="day-label">'+(lang()==='fa'?'اعلان روز':lang()==='hr'?'Izjava dana':'Declaration Day')+' '+(lang()==='fa'?faNum(item.day):item.day)+'</span>'+
    '<h2>'+loc(item.title)+'</h2>'+
    '<div class="plan-section-title">'+(lang()==='fa'?'آیه':lang()==='hr'?'Stih':'Verse')+'</div>'+
    '<details class="plan-scripture-expand" open><summary>'+loc(item.verse)+'</summary><p>'+loc(item.verseText)+'</p></details>'+
    '<div class="plan-section-title">'+(lang()==='fa'?'اعلان ایمان':lang()==='hr'?'Izjava vjere':'Faith Declaration')+'</div>'+
    '<p style="white-space:pre-line;line-height:1.9"><strong>'+loc(item.declaration)+'</strong></p></div>';
  };

  window.renderNewBirthContent=function(){
    const root=document.getElementById('newBirthContent'); if(!root)return;
    const L=lang();
    const data={
      fa:{
        title:'تولد تازه و نجات در مسیح',
        sub:'راهنمای ساده برای دریافت نجات، شروع زندگی تازه و ادامه رشد در مسیح',
        intro:'نجات فقط یک تصمیم احساسی یا تغییر مذهبی نیست. نجات یعنی انسان با ایمان به عیسی مسیح از گناه، محکومیت و مرگ روحانی آزاد می‌شود و حیات خدا را دریافت می‌کند. تولد تازه یعنی روح انسان با حیات خدا زنده می‌شود و شخص وارد خانواده خدا می‌گردد.',
        sections:[
          ['چرا انسان به نجات نیاز دارد؟','کلام خدا نشان می‌دهد که انسان بدون مسیح نمی‌تواند با تلاش مذهبی، کارهای خوب یا اخلاق شخصی خود را نجات دهد. مشکل اصلی انسان فقط رفتار بیرونی نیست؛ انسان به حیات تازه نیاز دارد. عیسی آمد تا ما را فقط اصلاح نکند، بلکه از درون زنده کند و ما را با خدا آشتی دهد.'],
          ['تولد تازه چیست؟','تولد تازه یعنی انسان با ایمان به مرگ و قیام عیسی مسیح، حیات تازه‌ای از خدا دریافت می‌کند. این تولد از جسم نیست، بلکه از روح است. وقتی شخص عیسی را خداوند و نجات‌دهنده خود اعلام می‌کند، خداوند درون او کاری تازه آغاز می‌کند.'],
          ['نجات در مسیح چگونه دریافت می‌شود؟','نجات هدیه خداست. ما آن را با ایمان دریافت می‌کنیم، نه با لیاقت شخصی. ایمان حقیقی فقط دانستن درباره عیسی نیست؛ بلکه اعتماد کردن به او، پذیرفتن قربانی او و اعلام خداوندی او بر زندگی است.'],
          ['بعد از نجات چه اتفاقی می‌افتد؟','بعد از نجات، شخص باید در کلام خدا رشد کند، دعا را یاد بگیرد، در مشارکت ایمانداران بماند، تعمید بگیرد، و با هدایت روح‌القدس زندگی تازه خود را بشناسد. نجات آغاز راه است، نه پایان راه.'],
          ['من می‌خواهم نجات بیابم','اگر می‌خواهی امروز عیسی مسیح را به عنوان خداوند و نجات‌دهنده خود بپذیری، این دعا را با ایمان و از قلب خود بخوان. مهم فقط تکرار کلمات نیست؛ مهم ایمان قلبی و اعلام دهانی توست.'],
          ['دعای نجات','خداوند عیسی مسیح، من امروز با ایمان به حضور تو می‌آیم. باور دارم که تو پسر خدا هستی، برای گناهان من مردی و خدا تو را از مردگان برخیزانید. من تو را به عنوان خداوند و نجات‌دهنده زندگی خود می‌پذیرم. از امروز زندگی من متعلق به توست. قلب مرا تازه کن، مرا با روح خود هدایت کن و به من کمک کن در کلام تو رشد کنم. من اعلام می‌کنم که نجات یافته‌ام، فرزند خدا هستم و زندگی تازه‌ای در مسیح دارم. آمین.']
        ],
        videosTitle:'آموزش‌های ویدئویی تولد تازه',
        videosIntro:'بعد از دعای نجات، این شش آموزش را ببین تا قدم‌های اول زندگی تازه در مسیح را بهتر بشناسی.'
      },
      en:{
        title:'New Birth and Salvation in Christ',
        sub:'A simple guide to receive salvation, begin a new life, and grow in Christ',
        intro:'Salvation is not merely an emotional decision or a change of religion. Salvation means that through faith in Jesus Christ a person is freed from sin, condemnation, and spiritual death, and receives the life of God.',
        sections:[
          ['Why does a person need salvation?','Without Christ, no one can be saved by religious effort, good works, or personal morality. The deepest need of humanity is not only outward improvement but new life from God.'],
          ['What is the new birth?','The new birth means receiving a new life from God through faith in the death and resurrection of Jesus Christ. It is not a birth of the flesh, but of the spirit.'],
          ['How is salvation received?','Salvation is the gift of God. We receive it by faith, not by personal merit. True faith means trusting Christ, receiving His sacrifice, and confessing His Lordship.'],
          ['What happens after salvation?','After salvation, a person must grow in the Word, learn prayer, remain in fellowship, be baptized, and discover the new life by the guidance of the Holy Spirit.'],
          ['I want to be saved','If you want to receive Jesus Christ as Lord and Savior today, pray this prayer from your heart and with faith.'],
          ['Prayer of salvation','Lord Jesus Christ, I come to You today by faith. I believe You are the Son of God, You died for my sins, and God raised You from the dead. I receive You as the Lord and Savior of my life. From today, my life belongs to You. Make my heart new, lead me by Your Spirit, and help me grow in Your Word. I declare that I am saved, I am a child of God, and I have a new life in Christ. Amen.']
        ],
        videosTitle:'New Birth Video Teachings',
        videosIntro:'After the prayer of salvation, watch these six teachings to understand your first steps in Christ.'
      },
      hr:{
        title:'Novo rođenje i spasenje u Kristu',
        sub:'Jednostavan vodič za primanje spasenja, početak novog života i rast u Kristu',
        intro:'Spasenje nije samo emocionalna odluka ili promjena religije. Spasenje znači da je osoba vjerom u Isusa Krista oslobođena grijeha, osude i duhovne smrti te prima Božji život.',
        sections:[
          ['Zašto je čovjeku potrebno spasenje?','Bez Krista nitko se ne može spasiti religioznim trudom, dobrim djelima ili osobnom moralnošću. Najdublja potreba čovjeka nije samo vanjsko poboljšanje, nego novi život od Boga.'],
          ['Što je novo rođenje?','Novo rođenje znači primiti novi život od Boga po vjeri u smrt i uskrsnuće Isusa Krista. To nije rođenje tijela, nego duha.'],
          ['Kako se prima spasenje?','Spasenje je Božji dar. Primamo ga vjerom, ne osobnom zaslugom. Prava vjera znači pouzdati se u Krista, primiti Njegovu žrtvu i priznati Njegovo Gospodstvo.'],
          ['Što se događa nakon spasenja?','Nakon spasenja osoba treba rasti u Riječi, učiti molitvu, ostati u zajedništvu, krstiti se i otkrivati novi život vodstvom Duha Svetoga.'],
          ['Želim biti spašen','Ako danas želiš primiti Isusa Krista kao Gospodina i Spasitelja, moli ovu molitvu iz srca i s vjerom.'],
          ['Molitva spasenja','Gospodine Isuse Kriste, danas dolazim k Tebi vjerom. Vjerujem da si Sin Božji, da si umro za moje grijehe i da Te je Bog uskrisio od mrtvih. Primam Te kao Gospodina i Spasitelja svog života. Od danas moj život pripada Tebi. Obnovi moje srce, vodi me svojim Duhom i pomozi mi rasti u Tvojoj Riječi. Izjavljujem da sam spašen, Božje sam dijete i imam novi život u Kristu. Amen.']
        ],
        videosTitle:'Video učenja o novom rođenju',
        videosIntro:'Nakon molitve spasenja pogledajte ovih šest učenja kako biste razumjeli prve korake u Kristu.'
      }
    }[L];

    const defaultVideos=[
      {title:'۱. تولد تازه چیست؟',url:'https://www.youtube.com/@omideno7'},
      {title:'۲. نجات در مسیح',url:'https://www.youtube.com/@omideno7'},
      {title:'۳. دعای نجات و ایمان قلبی',url:'https://www.youtube.com/@omideno7'},
      {title:'۴. زندگی تازه بعد از نجات',url:'https://www.youtube.com/@omideno7'},
      {title:'۵. رشد در کلام و دعا',url:'https://www.youtube.com/@omideno7'},
      {title:'۶. مشارکت، کلیسا و شاگردی',url:'https://www.youtube.com/@omideno7'}
    ];
    const videos=window.newBirthVideoLinks || defaultVideos;

    root.innerHTML='<div class="section-title"><h2>'+data.title+'</h2></div>'+
    '<div class="hero-card salvation-hero"><h1>'+data.title+'</h1><p>'+data.sub+'</p><p>'+data.intro+'</p></div>'+
    '<div class="salvation-options">'+data.sections.map(s=>'<div class="card salvation-card"><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>').join('')+'</div>'+
    '<div class="card"><h3>'+data.videosTitle+'</h3><p>'+data.videosIntro+'</p><div class="plan-grid">'+videos.map((v,i)=>'<a class="card" style="text-decoration:none" target="_blank" rel="noopener" href="'+v.url+'"><h3>'+v.title+'</h3><p>'+(L==='fa'?'مشاهده در یوتیوب':L==='hr'?'Pogledaj na YouTubeu':'Watch on YouTube')+'</p></a>').join('')+'</div></div>';
  };

  setTimeout(()=>{ try{renderDeclarations();}catch(e){} try{renderNewBirthContent();}catch(e){} }, 800);
})();



/* OMIDNO7 MONTHLY DAILY OVERRIDE 2026-05-31:
   Daily Word and Faith Declarations now follow the real month length.
   30-day months show days 1-30, 31-day months show days 1-31.
   New Birth button label changed to "I want to be saved". */
(function(){
  const DECLARATION_SETS = [{"day": 1, "title": {"fa": "اعلان ایمان برای پیروزی در مسیح", "en": "Faith Declaration: پیروزی در مسیح", "hr": "Izjava vjere: پیروزی در مسیح"}, "verse": {"fa": "اول یوحنا ۵:۴", "en": "اول یوحنا ۵:۴", "hr": "اول یوحنا ۵:۴"}, "verseText": {"fa": "اول یوحنا ۵:۴", "en": "اول یوحنا ۵:۴", "hr": "اول یوحنا ۵:۴"}, "declaration": {"fa": "من از خدا مولود شده‌ام و ایمان من بر دنیا غلبه می‌کند. امروز با نگاه پیروزی زندگی می‌کنم. شرایط مرا تعریف نمی‌کند؛ کلام خدا هویت و آینده مرا تعریف می‌کند. من در مسیح قوی، ثابت‌قدم و پیروز هستم.", "en": "من از خدا مولود شده‌ام و ایمان من بر دنیا غلبه می‌کند. امروز با نگاه پیروزی زندگی می‌کنم. شرایط مرا تعریف نمی‌کند؛ کلام خدا هویت و آینده مرا تعریف می‌کند. من در مسیح قوی، ثابت‌قدم و پیروز هستم.", "hr": "من از خدا مولود شده‌ام و ایمان من بر دنیا غلبه می‌کند. امروز با نگاه پیروزی زندگی می‌کنم. شرایط مرا تعریف نمی‌کند؛ کلام خدا هویت و آینده مرا تعریف می‌کند. من در مسیح قوی، ثابت‌قدم و پیروز هستم."}}, {"day": 2, "title": {"fa": "اعلان ایمان برای سلامتی و قوت", "en": "Faith Declaration: سلامتی و قوت", "hr": "Izjava vjere: سلامتی و قوت"}, "verse": {"fa": "اول پطرس ۲:۲۴", "en": "اول پطرس ۲:۲۴", "hr": "اول پطرس ۲:۲۴"}, "verseText": {"fa": "اول پطرس ۲:۲۴", "en": "اول پطرس ۲:۲۴", "hr": "اول پطرس ۲:۲۴"}, "declaration": {"fa": "حیات مسیح در من عمل می‌کند. بدن من جایگاه روح‌القدس است و قوت خدا در تمام وجودم جاری است. من سلامتی، آرامش و توانایی الهی را بر بدن، فکر و احساسات خود اعلام می‌کنم.", "en": "حیات مسیح در من عمل می‌کند. بدن من جایگاه روح‌القدس است و قوت خدا در تمام وجودم جاری است. من سلامتی، آرامش و توانایی الهی را بر بدن، فکر و احساسات خود اعلام می‌کنم.", "hr": "حیات مسیح در من عمل می‌کند. بدن من جایگاه روح‌القدس است و قوت خدا در تمام وجودم جاری است. من سلامتی، آرامش و توانایی الهی را بر بدن، فکر و احساسات خود اعلام می‌کنم."}}, {"day": 3, "title": {"fa": "اعلان ایمان برای رفاه مالی و برکت", "en": "Faith Declaration: رفاه مالی و برکت", "hr": "Izjava vjere: رفاه مالی و برکت"}, "verse": {"fa": "دوم قرنتیان ۹:۸", "en": "دوم قرنتیان ۹:۸", "hr": "دوم قرنتیان ۹:۸"}, "verseText": {"fa": "دوم قرنتیان ۹:۸", "en": "دوم قرنتیان ۹:۸", "hr": "دوم قرنتیان ۹:۸"}, "declaration": {"fa": "خدا منبع تأمین و برکت من است. فیض خدا در زندگی من فراوان است، تا در هر کار نیکو افزونی داشته باشم. من با حکمت، نظم و هدایت خداوند منابعم را مدیریت می‌کنم و برای ملکوت خدا برکت می‌شوم.", "en": "خدا منبع تأمین و برکت من است. فیض خدا در زندگی من فراوان است، تا در هر کار نیکو افزونی داشته باشم. من با حکمت، نظم و هدایت خداوند منابعم را مدیریت می‌کنم و برای ملکوت خدا برکت می‌شوم.", "hr": "خدا منبع تأمین و برکت من است. فیض خدا در زندگی من فراوان است، تا در هر کار نیکو افزونی داشته باشم. من با حکمت، نظم و هدایت خداوند منابعم را مدیریت می‌کنم و برای ملکوت خدا برکت می‌شوم."}}, {"day": 4, "title": {"fa": "اعلان ایمان برای هدایت روح‌القدس", "en": "Faith Declaration: هدایت روح‌القدس", "hr": "Izjava vjere: هدایت روح‌القدس"}, "verse": {"fa": "رومیان ۸:۱۴", "en": "رومیان ۸:۱۴", "hr": "رومیان ۸:۱۴"}, "verseText": {"fa": "رومیان ۸:۱۴", "en": "رومیان ۸:۱۴", "hr": "رومیان ۸:۱۴"}, "declaration": {"fa": "من فرزند خدا هستم و توسط روح خدا هدایت می‌شوم. صدای روح‌القدس برای من بیگانه نیست. قلب من حساس، فکر من روشن، و قدم‌های من در مسیر اراده خداوند است.", "en": "من فرزند خدا هستم و توسط روح خدا هدایت می‌شوم. صدای روح‌القدس برای من بیگانه نیست. قلب من حساس، فکر من روشن، و قدم‌های من در مسیر اراده خداوند است.", "hr": "من فرزند خدا هستم و توسط روح خدا هدایت می‌شوم. صدای روح‌القدس برای من بیگانه نیست. قلب من حساس، فکر من روشن، و قدم‌های من در مسیر اراده خداوند است."}}, {"day": 5, "title": {"fa": "اعلان ایمان برای ایمان قوی", "en": "Faith Declaration: ایمان قوی", "hr": "Izjava vjere: ایمان قوی"}, "verse": {"fa": "رومیان ۱۰:۱۷", "en": "رومیان ۱۰:۱۷", "hr": "رومیان ۱۰:۱۷"}, "verseText": {"fa": "رومیان ۱۰:۱۷", "en": "رومیان ۱۰:۱۷", "hr": "رومیان ۱۰:۱۷"}, "declaration": {"fa": "ایمان من از شنیدن کلام خدا رشد می‌کند. من به ترس، شک و ناامیدی اجازه نمی‌دهم صدای بلندتری از کلام خدا داشته باشند. امروز ایمانم را با کلام تقویت می‌کنم و با یقین سخن می‌گویم.", "en": "ایمان من از شنیدن کلام خدا رشد می‌کند. من به ترس، شک و ناامیدی اجازه نمی‌دهم صدای بلندتری از کلام خدا داشته باشند. امروز ایمانم را با کلام تقویت می‌کنم و با یقین سخن می‌گویم.", "hr": "ایمان من از شنیدن کلام خدا رشد می‌کند. من به ترس، شک و ناامیدی اجازه نمی‌دهم صدای بلندتری از کلام خدا داشته باشند. امروز ایمانم را با کلام تقویت می‌کنم و با یقین سخن می‌گویم."}}, {"day": 6, "title": {"fa": "اعلان ایمان برای خانواده", "en": "Faith Declaration: خانواده", "hr": "Izjava vjere: خانواده"}, "verse": {"fa": "اعمال ۱۶:۳۱", "en": "اعمال ۱۶:۳۱", "hr": "اعمال ۱۶:۳۱"}, "verseText": {"fa": "اعمال ۱۶:۳۱", "en": "اعمال ۱۶:۳۱", "hr": "اعمال ۱۶:۳۱"}, "declaration": {"fa": "من خانواده خود را با ایمان در حضور خداوند قرار می‌دهم. صلح، محبت، نجات، شفا و حکمت خدا بر خانه من جاری است. خانه من محل حضور خدا، کلام خدا، دعا و رشد روحانی است.", "en": "من خانواده خود را با ایمان در حضور خداوند قرار می‌دهم. صلح، محبت، نجات، شفا و حکمت خدا بر خانه من جاری است. خانه من محل حضور خدا، کلام خدا، دعا و رشد روحانی است.", "hr": "من خانواده خود را با ایمان در حضور خداوند قرار می‌دهم. صلح، محبت، نجات، شفا و حکمت خدا بر خانه من جاری است. خانه من محل حضور خدا، کلام خدا، دعا و رشد روحانی است."}}, {"day": 7, "title": {"fa": "اعلان ایمان برای صلح و شادی", "en": "Faith Declaration: صلح و شادی", "hr": "Izjava vjere: صلح و شادی"}, "verse": {"fa": "فیلیپیان ۴:۷", "en": "فیلیپیان ۴:۷", "hr": "فیلیپیان ۴:۷"}, "verseText": {"fa": "فیلیپیان ۴:۷", "en": "فیلیپیان ۴:۷", "hr": "فیلیپیان ۴:۷"}, "declaration": {"fa": "صلح خدا نگهبان قلب و فکر من است. نگرانی، فشار و اضطراب بر من حکومت نمی‌کند. شادی خداوند قوت من است و امروز با قلبی آرام، ذهنی روشن و روحی قوی حرکت می‌کنم.", "en": "صلح خدا نگهبان قلب و فکر من است. نگرانی، فشار و اضطراب بر من حکومت نمی‌کند. شادی خداوند قوت من است و امروز با قلبی آرام، ذهنی روشن و روحی قوی حرکت می‌کنم.", "hr": "صلح خدا نگهبان قلب و فکر من است. نگرانی، فشار و اضطراب بر من حکومت نمی‌کند. شادی خداوند قوت من است و امروز با قلبی آرام، ذهنی روشن و روحی قوی حرکت می‌کنم."}}, {"day": 8, "title": {"fa": "اعلان ایمان برای حکمت الهی", "en": "Faith Declaration: حکمت الهی", "hr": "Izjava vjere: حکمت الهی"}, "verse": {"fa": "یعقوب ۱:۵", "en": "یعقوب ۱:۵", "hr": "یعقوب ۱:۵"}, "verseText": {"fa": "یعقوب ۱:۵", "en": "یعقوب ۱:۵", "hr": "یعقوب ۱:۵"}, "declaration": {"fa": "حکمت خدا در من عمل می‌کند. من تصمیم‌های خود را با نور کلام و هدایت روح‌القدس می‌گیرم. راه‌های من روشن می‌شود و در زمان درست، قدم درست را برمی‌دارم.", "en": "حکمت خدا در من عمل می‌کند. من تصمیم‌های خود را با نور کلام و هدایت روح‌القدس می‌گیرم. راه‌های من روشن می‌شود و در زمان درست، قدم درست را برمی‌دارم.", "hr": "حکمت خدا در من عمل می‌کند. من تصمیم‌های خود را با نور کلام و هدایت روح‌القدس می‌گیرم. راه‌های من روشن می‌شود و در زمان درست، قدم درست را برمی‌دارم."}}, {"day": 9, "title": {"fa": "اعلان ایمان برای محبت خدا", "en": "Faith Declaration: محبت خدا", "hr": "Izjava vjere: محبت خدا"}, "verse": {"fa": "رومیان ۵:۵", "en": "رومیان ۵:۵", "hr": "رومیان ۵:۵"}, "verseText": {"fa": "رومیان ۵:۵", "en": "رومیان ۵:۵", "hr": "رومیان ۵:۵"}, "declaration": {"fa": "محبت خدا در قلب من ریخته شده است. من با محبت سخن می‌گویم، با محبت رفتار می‌کنم و با محبت می‌بخشم. قلب من از تلخی آزاد است و محبت مسیح از من جاری می‌شود.", "en": "محبت خدا در قلب من ریخته شده است. من با محبت سخن می‌گویم، با محبت رفتار می‌کنم و با محبت می‌بخشم. قلب من از تلخی آزاد است و محبت مسیح از من جاری می‌شود.", "hr": "محبت خدا در قلب من ریخته شده است. من با محبت سخن می‌گویم، با محبت رفتار می‌کنم و با محبت می‌بخشم. قلب من از تلخی آزاد است و محبت مسیح از من جاری می‌شود."}}, {"day": 10, "title": {"fa": "اعلان ایمان برای رشد روحانی", "en": "Faith Declaration: رشد روحانی", "hr": "Izjava vjere: رشد روحانی"}, "verse": {"fa": "دوم پطرس ۳:۱۸", "en": "دوم پطرس ۳:۱۸", "hr": "دوم پطرس ۳:۱۸"}, "verseText": {"fa": "دوم پطرس ۳:۱۸", "en": "دوم پطرس ۳:۱۸", "hr": "دوم پطرس ۳:۱۸"}, "declaration": {"fa": "من در فیض و شناخت خداوند رشد می‌کنم. هر روز در کلام، دعا، اطاعت و حساسیت روحانی پیشرفت می‌کنم. زندگی من متوقف نیست؛ من در مسیر بلوغ و ثمر روحانی هستم.", "en": "من در فیض و شناخت خداوند رشد می‌کنم. هر روز در کلام، دعا، اطاعت و حساسیت روحانی پیشرفت می‌کنم. زندگی من متوقف نیست؛ من در مسیر بلوغ و ثمر روحانی هستم.", "hr": "من در فیض و شناخت خداوند رشد می‌کنم. هر روز در کلام، دعا، اطاعت و حساسیت روحانی پیشرفت می‌کنم. زندگی من متوقف نیست؛ من در مسیر بلوغ و ثمر روحانی هستم."}}, {"day": 11, "title": {"fa": "اعلان ایمان برای حفاظت الهی", "en": "Faith Declaration: حفاظت الهی", "hr": "Izjava vjere: حفاظت الهی"}, "verse": {"fa": "مزمور ۹۱:۱-۲", "en": "مزمور ۹۱:۱-۲", "hr": "مزمور ۹۱:۱-۲"}, "verseText": {"fa": "مزمور ۹۱:۱-۲", "en": "مزمور ۹۱:۱-۲", "hr": "مزمور ۹۱:۱-۲"}, "declaration": {"fa": "خداوند پناهگاه و قلعه من است. من زیر سایه قادر مطلق ساکن هستم. ترس، شرارت و تاریکی بر من تسلط ندارد، زیرا خداوند محافظ من است.", "en": "خداوند پناهگاه و قلعه من است. من زیر سایه قادر مطلق ساکن هستم. ترس، شرارت و تاریکی بر من تسلط ندارد، زیرا خداوند محافظ من است.", "hr": "خداوند پناهگاه و قلعه من است. من زیر سایه قادر مطلق ساکن هستم. ترس، شرارت و تاریکی بر من تسلط ندارد، زیرا خداوند محافظ من است."}}, {"day": 12, "title": {"fa": "اعلان ایمان برای ذهن تازه", "en": "Faith Declaration: ذهن تازه", "hr": "Izjava vjere: ذهن تازه"}, "verse": {"fa": "رومیان ۱۲:۲", "en": "رومیان ۱۲:۲", "hr": "رومیان ۱۲:۲"}, "verseText": {"fa": "رومیان ۱۲:۲", "en": "رومیان ۱۲:۲", "hr": "رومیان ۱۲:۲"}, "declaration": {"fa": "فکر من با کلام خدا تازه می‌شود. من به الگوهای دنیا شکل نمی‌گیرم، بلکه با حقیقت خدا تغییر می‌کنم. ذهن من روشن، سالم، منظم و مطیع کلام خداست.", "en": "فکر من با کلام خدا تازه می‌شود. من به الگوهای دنیا شکل نمی‌گیرم، بلکه با حقیقت خدا تغییر می‌کنم. ذهن من روشن، سالم، منظم و مطیع کلام خداست.", "hr": "فکر من با کلام خدا تازه می‌شود. من به الگوهای دنیا شکل نمی‌گیرم، بلکه با حقیقت خدا تغییر می‌کنم. ذهن من روشن، سالم، منظم و مطیع کلام خداست."}}, {"day": 13, "title": {"fa": "اعلان ایمان برای زبان و سخن", "en": "Faith Declaration: زبان و سخن", "hr": "Izjava vjere: زبان و سخن"}, "verse": {"fa": "امثال ۱۸:۲۱", "en": "امثال ۱۸:۲۱", "hr": "امثال ۱۸:۲۱"}, "verseText": {"fa": "امثال ۱۸:۲۱", "en": "امثال ۱۸:۲۱", "hr": "امثال ۱۸:۲۱"}, "declaration": {"fa": "حیات و موت در قدرت زبان است. من با زبان خود برکت، ایمان، حیات و حقیقت را اعلام می‌کنم. سخنان من با کلام خدا هماهنگ است و محیط اطرافم را بنا می‌کند.", "en": "حیات و موت در قدرت زبان است. من با زبان خود برکت، ایمان، حیات و حقیقت را اعلام می‌کنم. سخنان من با کلام خدا هماهنگ است و محیط اطرافم را بنا می‌کند.", "hr": "حیات و موت در قدرت زبان است. من با زبان خود برکت، ایمان، حیات و حقیقت را اعلام می‌کنم. سخنان من با کلام خدا هماهنگ است و محیط اطرافم را بنا می‌کند."}}, {"day": 14, "title": {"fa": "اعلان ایمان برای خدمت مؤثر", "en": "Faith Declaration: خدمت مؤثر", "hr": "Izjava vjere: خدمت مؤثر"}, "verse": {"fa": "یوحنا ۱۵:۵", "en": "یوحنا ۱۵:۵", "hr": "یوحنا ۱۵:۵"}, "verseText": {"fa": "یوحنا ۱۵:۵", "en": "یوحنا ۱۵:۵", "hr": "یوحنا ۱۵:۵"}, "declaration": {"fa": "من در مسیح می‌مانم و حیات او در من ثمر می‌آورد. خدمت من با فشار انسانی نیست، بلکه از مشارکت با خداوند جاری می‌شود. خداوند از زندگی من برای لمس قلب‌ها استفاده می‌کند.", "en": "من در مسیح می‌مانم و حیات او در من ثمر می‌آورد. خدمت من با فشار انسانی نیست، بلکه از مشارکت با خداوند جاری می‌شود. خداوند از زندگی من برای لمس قلب‌ها استفاده می‌کند.", "hr": "من در مسیح می‌مانم و حیات او در من ثمر می‌آورد. خدمت من با فشار انسانی نیست، بلکه از مشارکت با خداوند جاری می‌شود. خداوند از زندگی من برای لمس قلب‌ها استفاده می‌کند."}}, {"day": 15, "title": {"fa": "اعلان ایمان برای غلبه بر ترس", "en": "Faith Declaration: غلبه بر ترس", "hr": "Izjava vjere: غلبه بر ترس"}, "verse": {"fa": "دوم تیموتائوس ۱:۷", "en": "دوم تیموتائوس ۱:۷", "hr": "دوم تیموتائوس ۱:۷"}, "verseText": {"fa": "دوم تیموتائوس ۱:۷", "en": "دوم تیموتائوس ۱:۷", "hr": "دوم تیموتائوس ۱:۷"}, "declaration": {"fa": "خدا روح ترس به من نداده، بلکه روح قوت، محبت و انضباط. من با ترس تصمیم نمی‌گیرم؛ با ایمان حرکت می‌کنم و حضور خداوند را در هر قدم تجربه می‌کنم.", "en": "خدا روح ترس به من نداده، بلکه روح قوت، محبت و انضباط. من با ترس تصمیم نمی‌گیرم؛ با ایمان حرکت می‌کنم و حضور خداوند را در هر قدم تجربه می‌کنم.", "hr": "خدا روح ترس به من نداده، بلکه روح قوت، محبت و انضباط. من با ترس تصمیم نمی‌گیرم؛ با ایمان حرکت می‌کنم و حضور خداوند را در هر قدم تجربه می‌کنم."}}, {"day": 16, "title": {"fa": "اعلان ایمان برای پاکی قلب", "en": "Faith Declaration: پاکی قلب", "hr": "Izjava vjere: پاکی قلب"}, "verse": {"fa": "متی ۵:۸", "en": "متی ۵:۸", "hr": "متی ۵:۸"}, "verseText": {"fa": "متی ۵:۸", "en": "متی ۵:۸", "hr": "متی ۵:۸"}, "declaration": {"fa": "قلب من برای خداوند جدا شده است. انگیزه‌ها، فکرها و خواسته‌های من زیر نور کلام خدا قرار می‌گیرند. من با قلبی پاک، روشن و متمرکز بر خداوند زندگی می‌کنم.", "en": "قلب من برای خداوند جدا شده است. انگیزه‌ها، فکرها و خواسته‌های من زیر نور کلام خدا قرار می‌گیرند. من با قلبی پاک، روشن و متمرکز بر خداوند زندگی می‌کنم.", "hr": "قلب من برای خداوند جدا شده است. انگیزه‌ها، فکرها و خواسته‌های من زیر نور کلام خدا قرار می‌گیرند. من با قلبی پاک، روشن و متمرکز بر خداوند زندگی می‌کنم."}}, {"day": 17, "title": {"fa": "اعلان ایمان برای درهای باز", "en": "Faith Declaration: درهای باز", "hr": "Izjava vjere: درهای باز"}, "verse": {"fa": "مکاشفه ۳:۸", "en": "مکاشفه ۳:۸", "hr": "مکاشفه ۳:۸"}, "verseText": {"fa": "مکاشفه ۳:۸", "en": "مکاشفه ۳:۸", "hr": "مکاشفه ۳:۸"}, "declaration": {"fa": "خداوند درهای درست را در زمان درست برای من باز می‌کند. من به زور انسانی تکیه نمی‌کنم؛ با ایمان، حکمت و اطاعت وارد فرصت‌های الهی می‌شوم.", "en": "خداوند درهای درست را در زمان درست برای من باز می‌کند. من به زور انسانی تکیه نمی‌کنم؛ با ایمان، حکمت و اطاعت وارد فرصت‌های الهی می‌شوم.", "hr": "خداوند درهای درست را در زمان درست برای من باز می‌کند. من به زور انسانی تکیه نمی‌کنم؛ با ایمان، حکمت و اطاعت وارد فرصت‌های الهی می‌شوم."}}, {"day": 18, "title": {"fa": "اعلان ایمان برای قدرت دعا", "en": "Faith Declaration: قدرت دعا", "hr": "Izjava vjere: قدرت دعا"}, "verse": {"fa": "یعقوب ۵:۱۶", "en": "یعقوب ۵:۱۶", "hr": "یعقوب ۵:۱۶"}, "verseText": {"fa": "یعقوب ۵:۱۶", "en": "یعقوب ۵:۱۶", "hr": "یعقوب ۵:۱۶"}, "declaration": {"fa": "دعای شخص عادل بسیار مؤثر است. من در دعا ضعیف و بی‌اثر نیستم. دعاهای من با ایمان، کلام و هدایت روح‌القدس همراه است و ثمر می‌آورد.", "en": "دعای شخص عادل بسیار مؤثر است. من در دعا ضعیف و بی‌اثر نیستم. دعاهای من با ایمان، کلام و هدایت روح‌القدس همراه است و ثمر می‌آورد.", "hr": "دعای شخص عادل بسیار مؤثر است. من در دعا ضعیف و بی‌اثر نیستم. دعاهای من با ایمان، کلام و هدایت روح‌القدس همراه است و ثمر می‌آورد."}}, {"day": 19, "title": {"fa": "اعلان ایمان برای ثبات در سختی", "en": "Faith Declaration: ثبات در سختی", "hr": "Izjava vjere: ثبات در سختی"}, "verse": {"fa": "یعقوب ۱:۲-۴", "en": "یعقوب ۱:۲-۴", "hr": "یعقوب ۱:۲-۴"}, "verseText": {"fa": "یعقوب ۱:۲-۴", "en": "یعقوب ۱:۲-۴", "hr": "یعقوب ۱:۲-۴"}, "declaration": {"fa": "در فشارها ثابت‌قدم می‌مانم، زیرا ایمان من در خدا ریشه دارد. سختی‌ها مرا نمی‌شکنند؛ بلکه صبر، بلوغ و قوت روحانی را در من آشکار می‌کنند.", "en": "در فشارها ثابت‌قدم می‌مانم، زیرا ایمان من در خدا ریشه دارد. سختی‌ها مرا نمی‌شکنند؛ بلکه صبر، بلوغ و قوت روحانی را در من آشکار می‌کنند.", "hr": "در فشارها ثابت‌قدم می‌مانم، زیرا ایمان من در خدا ریشه دارد. سختی‌ها مرا نمی‌شکنند؛ بلکه صبر، بلوغ و قوت روحانی را در من آشکار می‌کنند."}}, {"day": 20, "title": {"fa": "اعلان ایمان برای بخشش و آزادی", "en": "Faith Declaration: بخشش و آزادی", "hr": "Izjava vjere: بخشش و آزادی"}, "verse": {"fa": "کولسیان ۳:۱۳", "en": "کولسیان ۳:۱۳", "hr": "کولسیان ۳:۱۳"}, "verseText": {"fa": "کولسیان ۳:۱۳", "en": "کولسیان ۳:۱۳", "hr": "کولسیان ۳:۱۳"}, "declaration": {"fa": "من می‌بخشم، چون در مسیح بخشیده شده‌ام. قلبم را از تلخی، خشم و سنگینی آزاد می‌کنم. آزادی مسیح در درون من جاری است.", "en": "من می‌بخشم، چون در مسیح بخشیده شده‌ام. قلبم را از تلخی، خشم و سنگینی آزاد می‌کنم. آزادی مسیح در درون من جاری است.", "hr": "من می‌بخشم، چون در مسیح بخشیده شده‌ام. قلبم را از تلخی، خشم و سنگینی آزاد می‌کنم. آزادی مسیح در درون من جاری است."}}, {"day": 21, "title": {"fa": "اعلان ایمان برای شجاعت روحانی", "en": "Faith Declaration: شجاعت روحانی", "hr": "Izjava vjere: شجاعت روحانی"}, "verse": {"fa": "یوشع ۱:۹", "en": "یوشع ۱:۹", "hr": "یوشع ۱:۹"}, "verseText": {"fa": "یوشع ۱:۹", "en": "یوشع ۱:۹", "hr": "یوشع ۱:۹"}, "declaration": {"fa": "من قوی و دلیر هستم، زیرا خداوند با من است. از مسیر خود نمی‌ترسم و عقب‌نشینی نمی‌کنم. با ایمان و اطاعت جلو می‌روم.", "en": "من قوی و دلیر هستم، زیرا خداوند با من است. از مسیر خود نمی‌ترسم و عقب‌نشینی نمی‌کنم. با ایمان و اطاعت جلو می‌روم.", "hr": "من قوی و دلیر هستم، زیرا خداوند با من است. از مسیر خود نمی‌ترسم و عقب‌نشینی نمی‌کنم. با ایمان و اطاعت جلو می‌روم."}}, {"day": 22, "title": {"fa": "اعلان ایمان برای تمرکز بر کلام", "en": "Faith Declaration: تمرکز بر کلام", "hr": "Izjava vjere: تمرکز بر کلام"}, "verse": {"fa": "یوشع ۱:۸", "en": "یوشع ۱:۸", "hr": "یوشع ۱:۸"}, "verseText": {"fa": "یوشع ۱:۸", "en": "یوشع ۱:۸", "hr": "یوشع ۱:۸"}, "declaration": {"fa": "کلام خدا از دهان و فکر من دور نمی‌شود. من در آن تعمق می‌کنم و آن را به عمل درمی‌آورم. راه من کامیاب و پرثمر است.", "en": "کلام خدا از دهان و فکر من دور نمی‌شود. من در آن تعمق می‌کنم و آن را به عمل درمی‌آورم. راه من کامیاب و پرثمر است.", "hr": "کلام خدا از دهان و فکر من دور نمی‌شود. من در آن تعمق می‌کنم و آن را به عمل درمی‌آورم. راه من کامیاب و پرثمر است."}}, {"day": 23, "title": {"fa": "اعلان ایمان برای فیض فراوان", "en": "Faith Declaration: فیض فراوان", "hr": "Izjava vjere: فیض فراوان"}, "verse": {"fa": "دوم قرنتیان ۱۲:۹", "en": "دوم قرنتیان ۱۲:۹", "hr": "دوم قرنتیان ۱۲:۹"}, "verseText": {"fa": "دوم قرنتیان ۱۲:۹", "en": "دوم قرنتیان ۱۲:۹", "hr": "دوم قرنتیان ۱۲:۹"}, "declaration": {"fa": "فیض خدا برای من کافی است. ضعف‌های من مانع جلال خدا نیستند؛ قوت مسیح در من کامل می‌شود و مرا برای هر کار نیکو توانمند می‌کند.", "en": "فیض خدا برای من کافی است. ضعف‌های من مانع جلال خدا نیستند؛ قوت مسیح در من کامل می‌شود و مرا برای هر کار نیکو توانمند می‌کند.", "hr": "فیض خدا برای من کافی است. ضعف‌های من مانع جلال خدا نیستند؛ قوت مسیح در من کامل می‌شود و مرا برای هر کار نیکو توانمند می‌کند."}}, {"day": 24, "title": {"fa": "اعلان ایمان برای نور بودن", "en": "Faith Declaration: نور بودن", "hr": "Izjava vjere: نور بودن"}, "verse": {"fa": "متی ۵:۱۴", "en": "متی ۵:۱۴", "hr": "متی ۵:۱۴"}, "verseText": {"fa": "متی ۵:۱۴", "en": "متی ۵:۱۴", "hr": "متی ۵:۱۴"}, "declaration": {"fa": "من نور جهان هستم. زندگی من تاریکی را روشن می‌کند و حقیقت مسیح از طریق گفتار، رفتار و محبت من دیده می‌شود.", "en": "من نور جهان هستم. زندگی من تاریکی را روشن می‌کند و حقیقت مسیح از طریق گفتار، رفتار و محبت من دیده می‌شود.", "hr": "من نور جهان هستم. زندگی من تاریکی را روشن می‌کند و حقیقت مسیح از طریق گفتار، رفتار و محبت من دیده می‌شود."}}, {"day": 25, "title": {"fa": "اعلان ایمان برای اطاعت از خدا", "en": "Faith Declaration: اطاعت از خدا", "hr": "Izjava vjere: اطاعت از خدا"}, "verse": {"fa": "یوحنا ۱۴:۲۱", "en": "یوحنا ۱۴:۲۱", "hr": "یوحنا ۱۴:۲۱"}, "verseText": {"fa": "یوحنا ۱۴:۲۱", "en": "یوحنا ۱۴:۲۱", "hr": "یوحنا ۱۴:۲۱"}, "declaration": {"fa": "محبت من به خدا در اطاعت از کلام او دیده می‌شود. من فقط شنونده نیستم؛ عمل‌کننده کلام هستم و در برکت اطاعت زندگی می‌کنم.", "en": "محبت من به خدا در اطاعت از کلام او دیده می‌شود. من فقط شنونده نیستم؛ عمل‌کننده کلام هستم و در برکت اطاعت زندگی می‌کنم.", "hr": "محبت من به خدا در اطاعت از کلام او دیده می‌شود. من فقط شنونده نیستم؛ عمل‌کننده کلام هستم و در برکت اطاعت زندگی می‌کنم."}}, {"day": 26, "title": {"fa": "اعلان ایمان برای برکت برای دیگران", "en": "Faith Declaration: برکت برای دیگران", "hr": "Izjava vjere: برکت برای دیگران"}, "verse": {"fa": "پیدایش ۱۲:۲", "en": "پیدایش ۱۲:۲", "hr": "پیدایش ۱۲:۲"}, "verseText": {"fa": "پیدایش ۱۲:۲", "en": "پیدایش ۱۲:۲", "hr": "پیدایش ۱۲:۲"}, "declaration": {"fa": "من فقط برای خودم برکت نمی‌گیرم؛ من برای دیگران برکت هستم. خدا از زندگی من برای تشویق، کمک، بنا کردن و هدایت دیگران استفاده می‌کند.", "en": "من فقط برای خودم برکت نمی‌گیرم؛ من برای دیگران برکت هستم. خدا از زندگی من برای تشویق، کمک، بنا کردن و هدایت دیگران استفاده می‌کند.", "hr": "من فقط برای خودم برکت نمی‌گیرم؛ من برای دیگران برکت هستم. خدا از زندگی من برای تشویق، کمک، بنا کردن و هدایت دیگران استفاده می‌کند."}}, {"day": 27, "title": {"fa": "اعلان ایمان برای امید زنده", "en": "Faith Declaration: امید زنده", "hr": "Izjava vjere: امید زنده"}, "verse": {"fa": "رومیان ۱۵:۱۳", "en": "رومیان ۱۵:۱۳", "hr": "رومیان ۱۵:۱۳"}, "verseText": {"fa": "رومیان ۱۵:۱۳", "en": "رومیان ۱۵:۱۳", "hr": "رومیان ۱۵:۱۳"}, "declaration": {"fa": "خداوند قلب مرا از امید، شادی و آرامش پر می‌کند. من آینده خود را با ترس نمی‌بینم؛ با امید زنده و ایمان به وعده‌های خدا جلو می‌روم.", "en": "خداوند قلب مرا از امید، شادی و آرامش پر می‌کند. من آینده خود را با ترس نمی‌بینم؛ با امید زنده و ایمان به وعده‌های خدا جلو می‌روم.", "hr": "خداوند قلب مرا از امید، شادی و آرامش پر می‌کند. من آینده خود را با ترس نمی‌بینم؛ با امید زنده و ایمان به وعده‌های خدا جلو می‌روم."}}, {"day": 28, "title": {"fa": "اعلان ایمان برای اتحاد و صلح", "en": "Faith Declaration: اتحاد و صلح", "hr": "Izjava vjere: اتحاد و صلح"}, "verse": {"fa": "افسسیان ۴:۳", "en": "افسسیان ۴:۳", "hr": "افسسیان ۴:۳"}, "verseText": {"fa": "افسسیان ۴:۳", "en": "افسسیان ۴:۳", "hr": "افسسیان ۴:۳"}, "declaration": {"fa": "من برای حفظ اتحاد روح در بند صلح تلاش می‌کنم. در رابطه‌هایم صلح، فروتنی، صبر و محبت مسیح را جاری می‌کنم.", "en": "من برای حفظ اتحاد روح در بند صلح تلاش می‌کنم. در رابطه‌هایم صلح، فروتنی، صبر و محبت مسیح را جاری می‌کنم.", "hr": "من برای حفظ اتحاد روح در بند صلح تلاش می‌کنم. در رابطه‌هایم صلح، فروتنی، صبر و محبت مسیح را جاری می‌کنم."}}, {"day": 29, "title": {"fa": "اعلان ایمان برای قدرت روح‌القدس", "en": "Faith Declaration: قدرت روح‌القدس", "hr": "Izjava vjere: قدرت روح‌القدس"}, "verse": {"fa": "اعمال ۱:۸", "en": "اعمال ۱:۸", "hr": "اعمال ۱:۸"}, "verseText": {"fa": "اعمال ۱:۸", "en": "اعمال ۱:۸", "hr": "اعمال ۱:۸"}, "declaration": {"fa": "روح‌القدس بر من آمده و من قدرت یافته‌ام تا شاهد مسیح باشم. زندگی من حامل حضور، حکمت و قدرت خداوند است.", "en": "روح‌القدس بر من آمده و من قدرت یافته‌ام تا شاهد مسیح باشم. زندگی من حامل حضور، حکمت و قدرت خداوند است.", "hr": "روح‌القدس بر من آمده و من قدرت یافته‌ام تا شاهد مسیح باشم. زندگی من حامل حضور، حکمت و قدرت خداوند است."}}, {"day": 30, "title": {"fa": "اعلان ایمان برای ثمر روح", "en": "Faith Declaration: ثمر روح", "hr": "Izjava vjere: ثمر روح"}, "verse": {"fa": "غلاطیان ۵:۲۲-۲۳", "en": "غلاطیان ۵:۲۲-۲۳", "hr": "غلاطیان ۵:۲۲-۲۳"}, "verseText": {"fa": "غلاطیان ۵:۲۲-۲۳", "en": "غلاطیان ۵:۲۲-۲۳", "hr": "غلاطیان ۵:۲۲-۲۳"}, "declaration": {"fa": "ثمر روح در زندگی من آشکار است: محبت، شادی، صلح، حلم، مهربانی، نیکویی، ایمان، فروتنی و خویشتنداری. شخصیت من هر روز شبیه‌تر به مسیح می‌شود.", "en": "ثمر روح در زندگی من آشکار است: محبت، شادی، صلح، حلم، مهربانی، نیکویی، ایمان، فروتنی و خویشتنداری. شخصیت من هر روز شبیه‌تر به مسیح می‌شود.", "hr": "ثمر روح در زندگی من آشکار است: محبت، شادی، صلح، حلم، مهربانی، نیکویی، ایمان، فروتنی و خویشتنداری. شخصیت من هر روز شبیه‌تر به مسیح می‌شود."}}, {"day": 31, "title": {"fa": "اعلان ایمان برای شکرگزاری", "en": "Faith Declaration: شکرگزاری", "hr": "Izjava vjere: شکرگزاری"}, "verse": {"fa": "اول تسالونیکیان ۵:۱۸", "en": "اول تسالونیکیان ۵:۱۸", "hr": "اول تسالونیکیان ۵:۱۸"}, "verseText": {"fa": "اول تسالونیکیان ۵:۱۸", "en": "اول تسالونیکیان ۵:۱۸", "hr": "اول تسالونیکیان ۵:۱۸"}, "declaration": {"fa": "من در هر شرایطی شکرگزار می‌مانم. شکرگزاری چشم مرا به وفاداری خدا باز می‌کند و قلبم را در حضور خداوند ثابت نگه می‌دارد.", "en": "من در هر شرایطی شکرگزار می‌مانم. شکرگزاری چشم مرا به وفاداری خدا باز می‌کند و قلبم را در حضور خداوند ثابت نگه می‌دارد.", "hr": "من در هر شرایطی شکرگزار می‌مانم. شکرگزاری چشم مرا به وفاداری خدا باز می‌کند و قلبم را در حضور خداوند ثابت نگه می‌دارد."}}];

  function omidLang2(){ return window.currentLang || localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
  function omidLoc2(obj){ const l=omidLang2(); return (obj&&obj[l]) || (obj&&obj.en) || (typeof obj==='string'?obj:''); }
  function omidFaNum2(v){ try{return typeof toFaDigits==='function'?toFaDigits(v):String(v);}catch(e){return String(v);} }
  function daysInThisMonth(){ const now=new Date(); return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate(); }
  function monthDayIndex(){ const today=new Date().getDate(); const max=daysInThisMonth(); return Math.min(today, max); }

  window.getDeclarationDay = function(){ return monthDayIndex(); };

  window.renderDeclarations=function(){
    const root=document.getElementById('declarationsContent'); if(!root)return;
    const day=monthDayIndex();
    const item=DECLARATION_SETS[day-1] || DECLARATION_SETS[0];
    const L=omidLang2();
    root.innerHTML =
      '<div class="section-title"><h2>'+(L==='fa'?'اعلان‌های ایمان':L==='hr'?'Izjave vjere':'Faith Declarations')+'</h2></div>'+
      '<div class="hero-card"><h1>'+omidLoc2(item.title)+'</h1><p>'+(L==='fa'?'این اعلان را با ایمان و صدای بلند بخوانید.':L==='hr'?'Pročitajte ovu izjavu vjerom i naglas.':'Read this declaration with faith and aloud.')+'</p></div>'+
      '<div class="declaration-day-card"><span class="day-label">'+(L==='fa'?'اعلان روز':L==='hr'?'Izjava dana':'Declaration Day')+' '+(L==='fa'?omidFaNum2(day):day)+' / '+(L==='fa'?omidFaNum2(daysInThisMonth()):daysInThisMonth())+'</span>'+
      '<h2>'+omidLoc2(item.title)+'</h2>'+
      '<div class="plan-section-title">'+(L==='fa'?'آیه':L==='hr'?'Stih':'Verse')+'</div>'+
      '<details class="plan-scripture-expand" open><summary>'+omidLoc2(item.verse)+'</summary><p>'+omidLoc2(item.verseText)+'</p></details>'+
      '<div class="plan-section-title">'+(L==='fa'?'اعلان ایمان':L==='hr'?'Izjava vjere':'Faith Declaration')+'</div>'+
      '<p style="white-space:pre-line;line-height:1.9"><strong>'+omidLoc2(item.declaration)+'</strong></p></div>';
  };

  // Make daily word follow the real month length if dailyMessages exists.
  if(typeof window.getDailyMessage==='function' || window.dailyMessages){
    window.getDailyMessage=function(){
      const list=window.dailyMessages||[];
      if(!list.length) return null;
      const day=monthDayIndex();
      return list[day-1] || list[(day-1)%list.length] || list[0];
    };
  }

  // Strengthen New Birth / Salvation and change CTA label.
  const salvationContent = {
    fa:{
      title:'تولد تازه و نجات در مسیح',
      sub:'راهنمای دریافت نجات، شروع زندگی تازه و ادامه رشد در مسیح',
      cta:'می‌خواهم نجات بیابم',
      intro:'اگر می‌خواهی عیسی مسیح را به عنوان خداوند و نجات‌دهنده زندگی خود بپذیری، این بخش تو را قدم‌به‌قدم هدایت می‌کند.',
      sections:[
        ['چرا انسان به نجات نیاز دارد؟','انسان فقط به اصلاح رفتار نیاز ندارد؛ انسان به حیات تازه نیاز دارد. عیسی مسیح آمد تا ما را از گناه، محکومیت و مرگ روحانی آزاد کند و ما را با خدا آشتی دهد.'],
        ['تولد تازه چیست؟','تولد تازه یعنی روح انسان با حیات خدا زنده می‌شود. این یک تغییر مذهبی ساده نیست؛ ورود به خانواده خدا و شروع زندگی تازه در مسیح است.'],
        ['نجات چگونه دریافت می‌شود؟','نجات هدیه خداست و با ایمان دریافت می‌شود. ایمان یعنی باور قلبی به مرگ و قیام عیسی مسیح و اعلام خداوندی او بر زندگی.'],
        ['دعای نجات','خداوند عیسی مسیح، من به تو ایمان دارم. باور دارم که برای گناهان من مردی و خدا تو را از مردگان برخیزانید. امروز تو را خداوند و نجات‌دهنده زندگی خود می‌پذیرم. قلب مرا تازه کن و مرا با روح خود هدایت کن. من اعلام می‌کنم که نجات یافته‌ام و زندگی تازه‌ای در مسیح دارم. آمین.'],
        ['بعد از نجات چه کنم؟','در کلام خدا رشد کن، دعا را ادامه بده، در مشارکت ایمانداران بمان، درباره تعمید یاد بگیر و آموزش‌های تولد تازه را ببین تا قدم‌های اول زندگی مسیحی را محکم برداری.']
      ],
      videosTitle:'شش آموزش تولد تازه',
      videosIntro:'لینک‌های دقیق شش ویدئو را دوباره بفرست تا همین بخش را با لینک‌های اصلی جایگزین کنم. فعلاً کارت‌ها به کانال کلیسا وصل هستند.'
    },
    en:{
      title:'New Birth and Salvation in Christ',
      sub:'A guide to receive salvation, begin a new life, and grow in Christ',
      cta:'I want to be saved',
      intro:'If you want to receive Jesus Christ as Lord and Savior, this section guides you step by step.',
      sections:[
        ['Why do we need salvation?','Humanity does not only need better behavior; we need new life. Jesus Christ came to free us from sin, condemnation, and spiritual death, and to reconcile us with God.'],
        ['What is the new birth?','The new birth means the human spirit receives the life of God. It is not merely a religious change; it is entering God’s family and beginning a new life in Christ.'],
        ['How is salvation received?','Salvation is God’s gift and is received by faith: believing in the death and resurrection of Jesus Christ and confessing His Lordship.'],
        ['Prayer of salvation','Lord Jesus Christ, I believe in You. I believe You died for my sins and God raised You from the dead. Today I receive You as Lord and Savior of my life. Make my heart new and lead me by Your Spirit. I declare that I am saved and have a new life in Christ. Amen.'],
        ['What should I do after salvation?','Grow in the Word of God, continue in prayer, remain in fellowship with believers, learn about baptism, and watch the New Birth teachings.']
      ],
      videosTitle:'Six New Birth Teachings',
      videosIntro:'Send the exact six video links again and I will replace the current placeholders with the real links.'
    },
    hr:{
      title:'Novo rođenje i spasenje u Kristu',
      sub:'Vodič za primanje spasenja, početak novog života i rast u Kristu',
      cta:'Želim biti spašen',
      intro:'Ako želiš primiti Isusa Krista kao Gospodina i Spasitelja, ovaj dio vodi te korak po korak.',
      sections:[
        ['Zašto nam je potrebno spasenje?','Čovjeku nije potrebno samo bolje ponašanje; potreban mu je novi život. Isus Krist došao je osloboditi nas od grijeha, osude i duhovne smrti te nas pomiriti s Bogom.'],
        ['Što je novo rođenje?','Novo rođenje znači da ljudski duh prima Božji život. To nije samo promjena religije; to je ulazak u Božju obitelj i početak novog života u Kristu.'],
        ['Kako se prima spasenje?','Spasenje je Božji dar i prima se vjerom: vjerovanjem u smrt i uskrsnuće Isusa Krista i priznavanjem Njegova Gospodstva.'],
        ['Molitva spasenja','Gospodine Isuse Kriste, vjerujem u Tebe. Vjerujem da si umro za moje grijehe i da Te je Bog uskrisio od mrtvih. Danas Te primam kao Gospodina i Spasitelja svog života. Obnovi moje srce i vodi me svojim Duhom. Izjavljujem da sam spašen i imam novi život u Kristu. Amen.'],
        ['Što nakon spasenja?','Rasti u Božjoj riječi, nastavi moliti, ostani u zajedništvu s vjernicima, uči o krštenju i pogledaj učenja o novom rođenju.']
      ],
      videosTitle:'Šest učenja o novom rođenju',
      videosIntro:'Pošalji ponovno točnih šest video poveznica i zamijenit ću postojeće privremene poveznice.'
    }
  };

  window.renderNewBirthContent=function(){
    const root=document.getElementById('newBirthContent'); if(!root)return;
    const L=omidLang2(); const data=salvationContent[L]||salvationContent.en;
    const videos=window.newBirthVideoLinks || [
      {title:'1. '+data.videosTitle, url:'https://www.youtube.com/@omideno7'},
      {title:'2. '+data.videosTitle, url:'https://www.youtube.com/@omideno7'},
      {title:'3. '+data.videosTitle, url:'https://www.youtube.com/@omideno7'},
      {title:'4. '+data.videosTitle, url:'https://www.youtube.com/@omideno7'},
      {title:'5. '+data.videosTitle, url:'https://www.youtube.com/@omideno7'},
      {title:'6. '+data.videosTitle, url:'https://www.youtube.com/@omideno7'}
    ];
    root.innerHTML='<div class="section-title"><h2>'+data.title+'</h2></div>'+
      '<div class="hero-card salvation-hero"><h1>'+data.title+'</h1><p>'+data.sub+'</p><button class="btn gold" type="button" onclick="document.getElementById(\'salvation-prayer-section\')?.scrollIntoView({behavior:\'smooth\'})">'+data.cta+'</button></div>'+
      '<div class="card"><p>'+data.intro+'</p></div>'+
      '<div class="salvation-options">'+data.sections.map((s,i)=>'<div class="card salvation-card" '+(i===3?'id="salvation-prayer-section"':'')+'><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>').join('')+'</div>'+
      '<div class="card"><h3>'+data.videosTitle+'</h3><p>'+data.videosIntro+'</p><div class="plan-grid">'+videos.map(v=>'<a class="card" style="text-decoration:none" target="_blank" rel="noopener" href="'+v.url+'"><h3>'+v.title+'</h3><p>'+(L==='fa'?'مشاهده در یوتیوب':L==='hr'?'Pogledaj na YouTubeu':'Watch on YouTube')+'</p></a>').join('')+'</div></div>';
  };

  setTimeout(()=>{ try{renderDeclarations();}catch(e){} try{renderNewBirthContent();}catch(e){} },800);
})();



/* OMIDNO7 FASTING TOPIC SCRIPTURE OVERRIDE 2026-05-31:
   Topic/type-specific fasting scriptures with matching verse text in FA/EN/HR. */
(function(){
  const FASTING_VERSES = {"Psalm 63:1-2": {"fa": "ای خدا، تو خدای من هستی؛ سحرگاهان تو را می‌طلبم. جان من تشنه توست و جسد من مشتاق توست، در زمین خشک و تشنه و بی‌آب، تا قوت و جلال تو را مشاهده کنم.", "en": "O God, You are my God; early will I seek You. My soul thirsts for You, my flesh longs for You in a dry and thirsty land, to see Your power and Your glory.", "hr": "Bože, ti si moj Bog; rano te tražim. Moja duša žeđa za tobom i moje tijelo čezne za tobom, da vidim tvoju silu i slavu."}, "James 4:8": {"fa": "به خدا نزدیک شوید تا او به شما نزدیک شود. دست‌های خود را پاک کنید و دل‌های خود را طاهر سازید.", "en": "Draw near to God and He will draw near to you. Cleanse your hands, and purify your hearts.", "hr": "Približite se Bogu i on će se približiti vama. Očistite ruke i pročistite srca."}, "John 10:27": {"fa": "گوسفندان من آواز مرا می‌شنوند و من آن‌ها را می‌شناسم و مرا پیروی می‌کنند.", "en": "My sheep hear My voice, and I know them, and they follow Me.", "hr": "Moje ovce slušaju moj glas; ja ih poznajem i one idu za mnom."}, "Romans 8:14": {"fa": "زیرا همه کسانی که از روح خدا هدایت می‌شوند، پسران خدا هستند.", "en": "For as many as are led by the Spirit of God, they are the sons of God.", "hr": "Svi koje vodi Duh Božji sinovi su Božji."}, "Proverbs 3:5-6": {"fa": "با تمامی دل خود بر خداوند توکل نما و بر عقل خود تکیه مکن. در همه راه‌های خود او را بشناس، و او طریق‌هایت را راست خواهد گردانید.", "en": "Trust in the Lord with all your heart, and lean not on your own understanding. In all your ways acknowledge Him, and He shall direct your paths.", "hr": "Uzdaj se u Gospodina svim srcem svojim i ne oslanjaj se na vlastiti razum. Na svim svojim putovima priznaj ga i on će poravniti tvoje staze."}, "Colossians 3:15": {"fa": "و سلامتی خدا در دل‌های شما حکم‌فرما باشد، که به آن نیز در یک بدن خوانده شده‌اید؛ و شاکر باشید.", "en": "Let the peace of God rule in your hearts, to which also you were called in one body; and be thankful.", "hr": "Neka mir Božji vlada u vašim srcima; na to ste i pozvani u jednom tijelu. I budite zahvalni."}, "2 Peter 3:18": {"fa": "بلکه در فیض و معرفت خداوند و نجات‌دهنده ما عیسی مسیح رشد کنید.", "en": "Grow in the grace and knowledge of our Lord and Savior Jesus Christ.", "hr": "Rastite u milosti i spoznaji našega Gospodina i Spasitelja Isusa Krista."}, "John 17:17": {"fa": "ایشان را به راستی خود تقدیس نما؛ کلام تو راستی است.", "en": "Sanctify them by Your truth. Your word is truth.", "hr": "Posveti ih svojom istinom; tvoja je riječ istina."}, "Acts 16:31": {"fa": "به خداوند عیسی مسیح ایمان آور که تو و اهل خانه‌ات نجات خواهید یافت.", "en": "Believe on the Lord Jesus Christ, and you will be saved, you and your household.", "hr": "Vjeruj u Gospodina Isusa Krista i bit ćeš spašen, ti i tvoj dom."}, "Matthew 16:18": {"fa": "و من نیز تو را می‌گویم که تو پطرس هستی و بر این صخره کلیسای خود را بنا می‌کنم و دروازه‌های جهنم بر آن استیلا نخواهد یافت.", "en": "I will build My church, and the gates of Hades shall not prevail against it.", "hr": "Sagradit ću svoju Crkvu i vrata pakla neće je nadvladati."}, "James 5:15": {"fa": "و دعای ایمان، مریض را نجات خواهد بخشید و خداوند او را برخواهد خیزانید.", "en": "The prayer of faith will save the sick, and the Lord will raise him up.", "hr": "Molitva vjere spasit će bolesnika i Gospodin će ga podići."}, "John 15:5": {"fa": "من تاک هستم و شما شاخه‌ها؛ آن که در من بماند و من در او، میوه بسیار می‌آورد.", "en": "I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit.", "hr": "Ja sam trs, vi loze. Tko ostaje u meni i ja u njemu, taj donosi mnogo roda."}, "Matthew 9:37-38": {"fa": "حصاد فراوان است ولی عمله کم. پس از صاحب حصاد درخواست کنید تا عمله برای حصاد خود بفرستد.", "en": "The harvest truly is plentiful, but the laborers are few. Therefore pray the Lord of the harvest to send out laborers into His harvest.", "hr": "Žetva je velika, a radnika malo. Molite Gospodara žetve da pošalje radnike u svoju žetvu."}, "Romans 10:17": {"fa": "پس ایمان از شنیدن است و شنیدن از کلام خدا.", "en": "Faith comes by hearing, and hearing by the word of God.", "hr": "Vjera dolazi od slušanja, a slušanje po Božjoj riječi."}, "2 Timothy 1:7": {"fa": "زیرا خدا روح جبن به ما نداده است، بلکه روح قوت و محبت و انضباط.", "en": "God has not given us a spirit of fear, but of power and of love and of a sound mind.", "hr": "Bog nam nije dao duha straha, nego snage, ljubavi i razboritosti."}, "1 Corinthians 10:13": {"fa": "هیچ آزمایشی شما را فرو نگرفته جز آنچه انسانی است؛ اما خدا امین است و نمی‌گذارد فوق طاقت خود آزموده شوید.", "en": "No temptation has overtaken you except such as is common to man; but God is faithful.", "hr": "Nije vas zahvatila kušnja osim ljudske; ali Bog je vjeran."}, "Ephesians 1:17-18": {"fa": "تا خدای خداوند ما عیسی مسیح، پدر جلال، روح حکمت و مکاشفه را در معرفت خود به شما عطا فرماید، و چشمان دل شما روشن گردد.", "en": "May the Father of glory give you the spirit of wisdom and revelation in the knowledge of Him, the eyes of your understanding being enlightened.", "hr": "Neka vam Otac slave dade duha mudrosti i otkrivenja u spoznaji Njega, da se prosvijetle oči vašega srca."}, "Psalm 119:18": {"fa": "چشمان مرا بگشا تا چیزهای شگفت‌انگیز از شریعت تو ببینم.", "en": "Open my eyes, that I may see wondrous things from Your law.", "hr": "Otvori moje oči da gledam čudesne stvari iz tvoga zakona."}, "Acts 13:2-3": {"fa": "چون ایشان خداوند را عبادت می‌کردند و روزه می‌داشتند، روح‌القدس گفت: برنابا و سولس را برای کاری که ایشان را بدان خوانده‌ام جدا سازید.", "en": "As they ministered to the Lord and fasted, the Holy Spirit said, Separate to Me Barnabas and Saul for the work to which I have called them.", "hr": "Dok su služili Gospodinu i postili, Duh Sveti reče: Odvojite mi Barnabu i Savla za djelo na koje sam ih pozvao."}, "1 Thessalonians 5:18": {"fa": "در هر چیز شکرگزاری کنید، زیرا این است اراده خدا در مسیح عیسی برای شما.", "en": "In everything give thanks; for this is the will of God in Christ Jesus for you.", "hr": "U svemu zahvaljujte; jer to je Božja volja za vas u Kristu Isusu."}, "Isaiah 58:6-12": {"fa": "روزه‌ای که خدا می‌پسندد با گشودن بندهای شرارت، آزادی ستمدیدگان، رحمت، عدالت و بنای خرابی‌ها همراه است.", "en": "The fast God chooses is connected with loosing the bonds of wickedness, freedom for the oppressed, mercy, justice, and rebuilding what is broken.", "hr": "Post koji Bog izabire povezan je s raskidanjem okova nepravde, slobodom potlačenih, milosrđem, pravdom i obnovom porušenoga."}, "Daniel 1:12-17": {"fa": "دانیال و دوستانش خوراک شاه را نپذیرفتند و با نظم، پاکی و وفاداری به خدا ایستادند؛ و خدا به آنان معرفت، حکمت و فهم عطا کرد.", "en": "Daniel and his friends refused the king’s food and stood in discipline, purity, and faithfulness to God; and God gave them knowledge, wisdom, and understanding.", "hr": "Daniel i njegovi prijatelji odbili su kraljevu hranu i stajali u disciplini, čistoći i vjernosti Bogu; Bog im je dao znanje, mudrost i razumijevanje."}, "Daniel 10:2-3": {"fa": "دانیال سه هفته ماتم گرفت؛ نان لذیذ نخورد و گوشت و شراب به دهان خود نگذاشت. این نمونه‌ای از تمرکز، فروتنی و جستجوی خداست.", "en": "Daniel mourned three full weeks; he ate no pleasant bread, no meat or wine came into his mouth. This shows focus, humility, and seeking God.", "hr": "Daniel je tugovao tri tjedna; nije jeo ukusna jela, meso ni vino. To pokazuje usredotočenost, poniznost i traženje Boga."}, "Matthew 4:4": {"fa": "انسان نه فقط به نان زیست می‌کند، بلکه به هر کلمه‌ای که از دهان خدا صادر گردد.", "en": "Man shall not live by bread alone, but by every word that proceeds from the mouth of God.", "hr": "Ne živi čovjek samo o kruhu, nego o svakoj riječi koja izlazi iz Božjih usta."}, "Matthew 6:16-18": {"fa": "وقتی روزه می‌گیرید، مانند ریاکاران نباشید؛ روزه در حضور پدر آسمانی است، نه برای نمایش در برابر مردم.", "en": "When you fast, do not be like the hypocrites; fasting is before the Father, not for display before people.", "hr": "Kad postite, ne budite kao licemjeri; post je pred Ocem, a ne za pokazivanje pred ljudima."}};
  const TOPIC_PLANS = [[["نزدیکی", "blizina", "closer", "near"], ["Psalm 63:1-2", "James 4:8", "Matthew 4:4"], "نزدیکی بیشتر با خداوند"], [["شنیدن", "صدای خدا", "voice", "glas"], ["John 10:27", "Romans 8:14", "Colossians 3:15"], "شنیدن صدای خدا"], [["تصمیم", "هدایت", "decision", "vodstvo", "odluku"], ["Proverbs 3:5-6", "Romans 8:14", "Colossians 3:15"], "هدایت برای تصمیم مهم"], [["رشد", "growth", "rast"], ["2 Peter 3:18", "Romans 10:17", "John 15:5"], "رشد روحانی"], [["تقدیس", "پاکی", "čisto", "purity", "posvećenje"], ["John 17:17", "Matthew 5:8", "Daniel 1:12-17"], "تقدیس و پاکی"], [["خانواده", "family", "obitelj"], ["Acts 16:31", "Joshua 24:15", "Colossians 3:15"], "دعا برای خانواده"], [["کلیسا", "church", "crkvu"], ["Matthew 16:18", "Acts 2:42", "Ephesians 4:3"], "دعا برای کلیسا"], [["شفا", "سلامتی", "healing", "ozdravljenje"], ["James 5:15", "1 Peter 2:24", "Psalm 107:20"], "دعا برای شفا"], [["خدمت", "ministry", "službu"], ["John 15:5", "Acts 13:2-3", "2 Timothy 1:6"], "دعا برای خدمت"], [["نجات جان", "نجات", "souls", "spasenje"], ["Matthew 9:37-38", "Romans 10:13-15", "Acts 16:31"], "دعا برای نجات جان‌ها"], [["تقویت ایمان", "ایمان", "faith", "vjere"], ["Romans 10:17", "Mark 11:23-24", "Hebrews 11:1"], "تقویت ایمان"], [["ترس", "fear", "strah"], ["2 Timothy 1:7", "Psalm 27:1", "Isaiah 41:10"], "غلبه بر ترس"], [["وسوسه", "temptation", "kušnj"], ["1 Corinthians 10:13", "Matthew 26:41", "James 4:7"], "غلبه بر وسوسه"], [["مکاشفه", "revelation", "otkriven"], ["Ephesians 1:17-18", "Psalm 119:18", "John 16:13"], "دریافت مکاشفه از کلام خدا"], [["آمادگی", "preparation", "priprema"], ["Acts 13:2-3", "2 Timothy 2:21", "Isaiah 6:8"], "آمادگی برای خدمت"], [["شکرگزاری", "thanksgiving", "zahval"], ["1 Thessalonians 5:18", "Psalm 100:4", "Colossians 3:17"], "روزه شکرگزاری"], [["بیداری", "awakening", "buđenje"], ["Isaiah 58:6-12", "Habakkuk 3:2", "Acts 2:17"], "روزه برای بیداری روحانی"], [["خادمین", "minister", "služitelj"], ["Matthew 9:37-38", "Ephesians 6:19", "Colossians 4:3"], "روزه و دعا برای خادمین انجیل"], [["شبان", "pastor", "pastora"], ["Jeremiah 3:15", "Hebrews 13:17", "Ephesians 6:19"], "روزه و دعا برای شبانم"], [["دانیال", "daniel"], ["Daniel 1:12-17", "Daniel 10:2-3", "Romans 12:1"], "روزه دانیال"], [["آب", "water", "voda"], ["Matthew 4:4", "Matthew 6:16-18", "Psalm 63:1-2"], "روزه فقط با آب"], [["شبکه", "تلویزیون", "زبان", "گوش", "چشم", "خشم", "حسادت", "social", "negative", "eyes", "tongue", "anger", "jealous"], ["Romans 12:2", "Psalm 119:37", "James 1:19-20"], "روزه غیرغذایی و پاکی تمرکز"]];

  function flang(){ return window.currentLang || localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
  function fLoc(obj){ const l=flang(); return (obj&&obj[l]) || (obj&&obj.en) || (typeof obj==='string'?obj:''); }
  function fNum(v){ try{return typeof toFaDigits==='function'?toFaDigits(v):String(v);}catch(e){return String(v);} }
  function topicText(fastOrText){
    if(!fastOrText) return '';
    if(typeof fastOrText === 'string') return fastOrText;
    return [fastOrText.topic, fastOrText.type, fastOrText.customTopic].filter(Boolean).join(' ');
  }
  window.fastingPlanForTopic=function(fastOrText){
    const txt=topicText(fastOrText).toLowerCase();
    for(const row of TOPIC_PLANS){
      const keys=row[0], refs=row[1], title=row[2];
      if(keys.some(k=>txt.includes(String(k).toLowerCase()))) return {title, refs};
    }
    return {title: flang()==='fa'?'تمرکز روزه و دعا':flang()==='hr'?'Fokus posta i molitve':'Fasting and Prayer Focus', refs:['Matthew 6:16-18','Matthew 4:4','James 4:8']};
  };
  window.fastingVerseText=function(ref){
    return fLoc(FASTING_VERSES[ref]) || (flang()==='fa'?'متن این آیه در نسخه بعدی کامل می‌شود. روی همین آدرس آیه در کتاب مقدس تعمق کنید.':'This verse text will be completed in the next version. Meditate on this reference in the Bible.');
  };
  window.fastingRefsHtml=function(itemOrFast){
    const refs = Array.isArray(itemOrFast&&itemOrFast.refs) ? itemOrFast.refs : fastingPlanForTopic(itemOrFast).refs;
    return '<div class="fasting-refs">'+refs.map(r=>'<details class="plan-scripture-expand"><summary>'+r+'</summary><p>'+fastingVerseText(r)+'</p></details>').join('')+'</div>';
  };

  if(typeof window.renderFastingActive === 'function'){
    window.renderFastingActive=function(){
      const x=ft(); const store=fastingStore();
      if(!store.active.length) return `<button class="btn light" onclick="fastingSetView('home')">← ${x.back}</button><div class="card"><p>${x.noActive}</p><button class="btn gold" onclick="fastingSetView('start')">${x.start}</button></div>`;
      return `<button class="btn light" onclick="fastingSetView('home')">← ${x.back}</button>`+store.active.map(f=>{
        const day=fastingDayNumber(f); const base=fastingTodayItem(day); const progress=Math.round((day/(f.totalDays||1))*100);
        const plan=fastingPlanForTopic(f);
        return `<div class="card active-fasting-card">
         <h2>${x.activeFast}</h2>
         <p><strong>${x.topic}:</strong> ${f.topic}</p>
         <p><strong>${x.fields.type}:</strong> ${f.type}</p>
         <p><strong>${flang()==='fa'?'تمرکز آیات امروز':flang()==='hr'?'Fokus današnjih stihova':'Today’s Scripture Focus'}:</strong> ${plan.title}</p>
         <p><strong>${x.currentDay}:</strong> ${flang()==='fa'?fNum(day):day} / ${flang()==='fa'?fNum(f.totalDays):f.totalDays}</p>
         <div class="plan-progress"><div style="width:${progress}%"></div></div>
         <div class="plan-section-title">${x.todayVerse}</div>${fastingRefsHtml(f)}
         <div class="plan-section-title">${x.todayTeaching}</div><p>${base.teaching[flang()]||base.teaching.en}</p>
         <div class="plan-section-title">${x.todayPrayer}</div><p>${base.prayer[flang()]||base.prayer.en}</p>
         <div class="plan-section-title">${x.todayDeclaration}</div><p><strong>${base.declaration[flang()]||base.declaration.en}</strong></p>
         <label>${x.revelationToday}<textarea id="fastingJournal-${f.id}" placeholder="${x.placeholders.journal}"></textarea></label>
         <label>${x.feeling}<input id="fastingFeeling-${f.id}" placeholder="${x.placeholders.feeling}"></label>
         <div class="note-tools"><button class="btn primary" onclick="saveFastingDailyNote(${f.id}, ${day})">${x.save}</button><button class="btn light" onclick="completeFasting(${f.id})">${x.finishToday}</button></div>
        </div>`;
      }).join('');
    };
  }

  const oldToggle=window.fastingToggleCustomTopic;
  window.fastingToggleCustomTopic=function(sel){
    if(typeof oldToggle==='function') oldToggle(sel);
    try{ renderFastingTopicPreview(sel && sel.form); }catch(e){}
  };
  window.renderFastingTopicPreview=function(form){
    if(!form) return;
    let box=form.querySelector('#fastingTopicPreview');
    if(!box){
      box=document.createElement('div');
      box.id='fastingTopicPreview';
      box.className='card fasting-topic-preview';
      const btn=form.querySelector('button[type="submit"]');
      if(btn) btn.insertAdjacentElement('beforebegin', box);
    }
    const topic=form.querySelector('[name="topic"]')?.value || '';
    const type=form.querySelector('[name="type"]')?.value || '';
    const custom=form.querySelector('[name="customTopic"]')?.value || '';
    const plan=fastingPlanForTopic({topic:custom||topic,type});
    box.innerHTML='<h3>'+(flang()==='fa'?'آیات پیشنهادی برای این تمرکز':flang()==='hr'?'Predloženi stihovi za ovaj fokus':'Suggested Scriptures for this focus')+'</h3><p><strong>'+plan.title+'</strong></p>'+fastingRefsHtml({refs:plan.refs});
  };

  const oldStart=window.renderFastingStart;
  if(typeof oldStart==='function'){
    window.renderFastingStart=function(){
      const html=oldStart();
      setTimeout(()=>{ const form=document.getElementById('fastingStartForm'); if(form){ renderFastingTopicPreview(form); form.querySelector('[name="type"]')?.addEventListener('change',()=>renderFastingTopicPreview(form)); form.querySelector('[name="topic"]')?.addEventListener('change',()=>renderFastingTopicPreview(form)); form.querySelector('[name="customTopic"]')?.addEventListener('input',()=>renderFastingTopicPreview(form)); } },100);
      return html;
    };
  }

  setTimeout(()=>{ try{ if(typeof renderPlans==='function') renderPlans(); }catch(e){} },500);
})();

