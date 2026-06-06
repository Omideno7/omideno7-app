/* Omideno7 Faith Declarations V3
   Safe replacement for #declarationsContent only.
   50-day continuous cycle. Start date: 2026-06-01.
*/
(function(){
'use strict';

var START_DATE = '2026-06-01';
var VERSION = '3.0.0';
var BOOK_MAP = {
  "Genesis": "GEN",
  "Exodus": "EXO",
  "Leviticus": "LEV",
  "Numbers": "NUM",
  "Deuteronomy": "DEU",
  "Joshua": "JOS",
  "Judges": "JDG",
  "Ruth": "RUT",
  "1 Samuel": "1SA",
  "2 Samuel": "2SA",
  "1 Kings": "1KI",
  "2 Kings": "2KI",
  "1 Chronicles": "1CH",
  "2 Chronicles": "2CH",
  "Ezra": "EZR",
  "Nehemiah": "NEH",
  "Esther": "EST",
  "Job": "JOB",
  "Psalm": "PSA",
  "Psalms": "PSA",
  "Proverbs": "PRO",
  "Ecclesiastes": "ECC",
  "Song of Solomon": "SNG",
  "Isaiah": "ISA",
  "Jeremiah": "JER",
  "Lamentations": "LAM",
  "Ezekiel": "EZK",
  "Daniel": "DAN",
  "Hosea": "HOS",
  "Joel": "JOL",
  "Amos": "AMO",
  "Obadiah": "OBA",
  "Jonah": "JON",
  "Micah": "MIC",
  "Nahum": "NAM",
  "Habakkuk": "HAB",
  "Zephaniah": "ZEP",
  "Haggai": "HAG",
  "Zechariah": "ZEC",
  "Malachi": "MAL",
  "Matthew": "MAT",
  "Mark": "MRK",
  "Luke": "LUK",
  "John": "JHN",
  "Acts": "ACT",
  "Romans": "ROM",
  "1 Corinthians": "1CO",
  "2 Corinthians": "2CO",
  "Galatians": "GAL",
  "Ephesians": "EPH",
  "Philippians": "PHP",
  "Colossians": "COL",
  "1 Thessalonians": "1TH",
  "2 Thessalonians": "2TH",
  "1 Timothy": "1TI",
  "2 Timothy": "2TI",
  "Titus": "TIT",
  "Philemon": "PHM",
  "Hebrews": "HEB",
  "James": "JAS",
  "1 Peter": "1PE",
  "2 Peter": "2PE",
  "1 John": "1JN",
  "2 John": "2JN",
  "3 John": "3JN",
  "Jude": "JUD",
  "Revelation": "REV"
};

var BOOK_LABELS = {
  fa:{
    "Genesis":"پیدایش","Exodus":"خروج","Leviticus":"لاویان","Numbers":"اعداد","Deuteronomy":"تثنیه","Joshua":"یوشع","Judges":"داوران","Ruth":"روت","1 Samuel":"اول سموئیل","2 Samuel":"دوم سموئیل","1 Kings":"اول پادشاهان","2 Kings":"دوم پادشاهان","1 Chronicles":"اول تواریخ","2 Chronicles":"دوم تواریخ","Ezra":"عزرا","Nehemiah":"نحمیا","Esther":"استر","Job":"ایوب","Psalm":"مزامیر","Psalms":"مزامیر","Proverbs":"امثال","Ecclesiastes":"جامعه","Song of Solomon":"غزل غزل‌ها","Isaiah":"اشعیا","Jeremiah":"ارمیا","Lamentations":"مراثی ارمیا","Ezekiel":"حزقیال","Daniel":"دانیال","Hosea":"هوشع","Joel":"یوئیل","Amos":"عاموس","Obadiah":"عوبدیا","Jonah":"یونس","Micah":"میکاه","Nahum":"ناحوم","Habakkuk":"حبقوق","Zephaniah":"صفنیا","Haggai":"حجی","Zechariah":"زکریا","Malachi":"ملاکی",
    "Matthew":"متی","Mark":"مرقس","Luke":"لوقا","John":"یوحنا","Acts":"اعمال رسولان","Romans":"رومیان","1 Corinthians":"اول قرنتیان","2 Corinthians":"دوم قرنتیان","Galatians":"غلاطیان","Ephesians":"افسسیان","Philippians":"فیلیپیان","Colossians":"کولسیان","1 Thessalonians":"اول تسالونیکیان","2 Thessalonians":"دوم تسالونیکیان","1 Timothy":"اول تیموتائوس","2 Timothy":"دوم تیموتائوس","Titus":"تیطس","Philemon":"فلیمون","Hebrews":"عبرانیان","James":"یعقوب","1 Peter":"اول پطرس","2 Peter":"دوم پطرس","1 John":"اول یوحنا","2 John":"دوم یوحنا","3 John":"سوم یوحنا","Jude":"یهودا","Revelation":"مکاشفه"
  },
  hr:{
    "Genesis":"Postanak","Exodus":"Izlazak","Leviticus":"Levitski zakonik","Numbers":"Brojevi","Deuteronomy":"Ponovljeni zakon","Joshua":"Jošua","Judges":"Suci","Ruth":"Ruta","1 Samuel":"1. Samuelova","2 Samuel":"2. Samuelova","1 Kings":"1. Kraljevima","2 Kings":"2. Kraljevima","1 Chronicles":"1. Ljetopisa","2 Chronicles":"2. Ljetopisa","Ezra":"Ezra","Nehemiah":"Nehemija","Esther":"Estera","Job":"Job","Psalm":"Psalmi","Psalms":"Psalmi","Proverbs":"Izreke","Ecclesiastes":"Propovjednik","Song of Solomon":"Pjesma nad pjesmama","Isaiah":"Izaija","Jeremiah":"Jeremija","Lamentations":"Tužaljke","Ezekiel":"Ezekiel","Daniel":"Daniel","Hosea":"Hošea","Joel":"Joel","Amos":"Amos","Obadiah":"Obadija","Jonah":"Jona","Micah":"Mihej","Nahum":"Nahum","Habakkuk":"Habakuk","Zephaniah":"Sefanija","Haggai":"Hagaj","Zechariah":"Zaharija","Malachi":"Malahija",
    "Matthew":"Matej","Mark":"Marko","Luke":"Luka","John":"Ivan","Acts":"Djela apostolska","Romans":"Rimljanima","1 Corinthians":"1. Korinćanima","2 Corinthians":"2. Korinćanima","Galatians":"Galaćanima","Ephesians":"Efežanima","Philippians":"Filipljanima","Colossians":"Kološanima","1 Thessalonians":"1. Solunjanima","2 Thessalonians":"2. Solunjanima","1 Timothy":"1. Timoteju","2 Timothy":"2. Timoteju","Titus":"Titu","Philemon":"Filemonu","Hebrews":"Hebrejima","James":"Jakovljeva","1 Peter":"1. Petrova","2 Peter":"2. Petrova","1 John":"1. Ivanova","2 John":"2. Ivanova","3 John":"3. Ivanova","Jude":"Judina","Revelation":"Otkrivenje"
  }
};

function localizeDigits(s){
  if(lang()!=='fa') return String(s||'');
  return String(s||'').replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d];});
}

function displayRef(ref){
  var raw = String(ref||'').trim();
  var p = parseRef(raw);
  if(!p) return localizeDigits(raw);
  var l = lang();
  var book = ((BOOK_LABELS[l]||{})[p.book]) || p.book;
  var range = p.from===p.to ? String(p.from) : (p.from+'-'+p.to);
  var sep = l==='fa' ? ' ' : ' ';
  return localizeDigits(book + sep + p.chapter + ':' + range);
}

function hideOldDeclarationsIntro(){
  var patterns = [
    /این اعلان‌ها را با ایمان و صدای بلند بخوانید/i,
    /این اعلانها را با ایمان و صدای بلند بخوانید/i,
    /Read these declarations/i,
    /Read the declarations/i,
    /Čitajte ove izjave/i
  ];
  var page = document.getElementById('declarations') || document.querySelector('.page.active') || document;
  page.querySelectorAll('p,div,span').forEach(function(el){
    var t=(el.textContent||'').replace(/\s+/g,' ').trim();
    if(!t || t.length>180) return;
    if(patterns.some(function(re){return re.test(t);})){
      var card = el.closest('.card,.hero-card,section,div') || el;
      if(card && !card.id) card.style.setProperty('display','none','important');
    }
  });
}


var DATA = [
  {
    "day": 1,
    "title": {
      "fa": "کلام زنده در درون من",
      "en": "The Living Word in Me",
      "hr": "Živa Riječ u meni"
    },
    "verses": [
      "Hebrews 4:12",
      "Proverbs 4:20-22",
      "John 6:63"
    ],
    "teaching": {
      "fa": "موضوع امروز «کلام زنده در درون من» است. کلام خدا در روح، ذهن و بدن تو عمل می‌کند. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Living Word in Me.” God’s Word works in your spirit, mind, and body. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Živa Riječ u meni.” Božja riječ djeluje u tvom duhu, umu i tijelu. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «کلام زنده در درون من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “The Living Word in Me” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Živa Riječ u meni” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 2,
    "title": {
      "fa": "شفا به‌عنوان میراث من",
      "en": "Healing as My Inheritance",
      "hr": "Iscjeljenje kao moje nasljedstvo"
    },
    "verses": [
      "1 Peter 2:24",
      "Matthew 8:17",
      "Psalm 107:20"
    ],
    "teaching": {
      "fa": "موضوع امروز «شفا به‌عنوان میراث من» است. شفا برای فرزند خدا وعده‌ای دور نیست، بخشی از میراث او در مسیح است. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Healing as My Inheritance.” Healing is not distant from a child of God; it is part of the inheritance in Christ. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Iscjeljenje kao moje nasljedstvo.” Iscjeljenje nije daleko od Božjeg djeteta; ono je dio nasljedstva u Kristu. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «شفا به‌عنوان میراث من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Healing as My Inheritance” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Iscjeljenje kao moje nasljedstvo” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 3,
    "title": {
      "fa": "زندگی الهی در من",
      "en": "The Divine Life in Me",
      "hr": "Božanski život u meni"
    },
    "verses": [
      "1 John 5:11-12",
      "John 10:10",
      "Romans 8:2"
    ],
    "teaching": {
      "fa": "موضوع امروز «زندگی الهی در من» است. حیات خدا در ایماندار فقط یک عقیده نیست، یک واقعیت روحانی زنده است. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Divine Life in Me.” The life of God in the believer is not merely a doctrine; it is a living spiritual reality. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Božanski život u meni.” Božji život u vjerniku nije samo nauk; to je živa duhovna stvarnost. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «زندگی الهی در من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “The Divine Life in Me” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Božanski život u meni” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 4,
    "title": {
      "fa": "قدرت قیام در بدن من",
      "en": "Resurrection Power in My Body",
      "hr": "Sila uskrsnuća u mom tijelu"
    },
    "verses": [
      "Romans 8:11",
      "Ephesians 1:19-20",
      "2 Corinthians 4:10-11"
    ],
    "teaching": {
      "fa": "موضوع امروز «قدرت قیام در بدن من» است. همان روحی که عیسی را برخیزانید، امروز در تو زندگی می‌کند. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Resurrection Power in My Body.” The same Spirit who raised Jesus lives in you today. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Sila uskrsnuća u mom tijelu.” Isti Duh koji je uskrisio Isusa danas živi u tebi. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «قدرت قیام در بدن من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Resurrection Power in My Body” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Sila uskrsnuća u mom tijelu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 5,
    "title": {
      "fa": "پیروزی ایمان",
      "en": "The Victory of Faith",
      "hr": "Pobjeda vjere"
    },
    "verses": [
      "1 John 5:4",
      "2 Corinthians 5:7",
      "Mark 11:23"
    ],
    "teaching": {
      "fa": "موضوع امروز «پیروزی ایمان» است. ایمان، نگاه تو را از شرایط به حقیقت کلام خدا منتقل می‌کند. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Victory of Faith.” Faith moves your sight from circumstances to the truth of God’s Word. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Pobjeda vjere.” Vjera premješta tvoj pogled s okolnosti na istinu Božje riječi. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «پیروزی ایمان» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “The Victory of Faith” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Pobjeda vjere” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 6,
    "title": {
      "fa": "قدرت زبان من",
      "en": "The Power of My Tongue",
      "hr": "Snaga mog jezika"
    },
    "verses": [
      "Proverbs 18:21",
      "2 Corinthians 4:13",
      "Romans 10:10"
    ],
    "teaching": {
      "fa": "موضوع امروز «قدرت زبان من» است. دهان تو ابزار روحانی برای جاری کردن حیات، شفا و پیروزی است. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Power of My Tongue.” Your mouth is a spiritual instrument for releasing life, healing, and victory. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Snaga mog jezika.” Tvoja usta su duhovni instrument za oslobađanje života, iscjeljenja i pobjede. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «قدرت زبان من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “The Power of My Tongue” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Snaga mog jezika” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 7,
    "title": {
      "fa": "من خلقت تازه هستم",
      "en": "I Am a New Creation",
      "hr": "Ja sam novo stvorenje"
    },
    "verses": [
      "2 Corinthians 5:17",
      "Galatians 2:20",
      "Colossians 3:3"
    ],
    "teaching": {
      "fa": "موضوع امروز «من خلقت تازه هستم» است. در مسیح، هویت تو از گذشته، شکست و ترس جدا شده است. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “I Am a New Creation.” In Christ, your identity is separated from the past, failure, and fear. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Ja sam novo stvorenje.” U Kristu je tvoj identitet odvojen od prošlosti, poraza i straha. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «من خلقت تازه هستم» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “I Am a New Creation” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Ja sam novo stvorenje” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 8,
    "title": {
      "fa": "حاکمیت در زندگی",
      "en": "Reigning in Life",
      "hr": "Vladanje u životu"
    },
    "verses": [
      "Romans 5:17",
      "Revelation 5:10",
      "Luke 10:19"
    ],
    "teaching": {
      "fa": "موضوع امروز «حاکمیت در زندگی» است. فیض و عدالت تو را برای زندگی غالب و نه مغلوب مجهز کرده‌اند. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Reigning in Life.” Grace and righteousness equip you to live as an overcomer, not as the defeated. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Vladanje u životu.” Milost i pravednost osposobljavaju te da živiš kao pobjednik, a ne poražen. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «حاکمیت در زندگی» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Reigning in Life” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Vladanje u životu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 9,
    "title": {
      "fa": "ذهن تازه‌شده با کلام",
      "en": "A Mind Renewed by the Word",
      "hr": "Um obnovljen Riječju"
    },
    "verses": [
      "Romans 12:2",
      "Philippians 4:8",
      "Isaiah 26:3"
    ],
    "teaching": {
      "fa": "موضوع امروز «ذهن تازه‌شده با کلام» است. ذهنی که با کلام تازه می‌شود، دیگر اسیر ترس و گزارش‌های منفی نمی‌ماند. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “A Mind Renewed by the Word.” A mind renewed by the Word no longer remains trapped in fear and negative reports. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Um obnovljen Riječju.” Um obnovljen Riječju više ne ostaje zarobljen strahom i negativnim izvještajima. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «ذهن تازه‌شده با کلام» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “A Mind Renewed by the Word” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Um obnovljen Riječju” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 10,
    "title": {
      "fa": "بدن من معبد روح‌القدس است",
      "en": "My Body Is the Temple of the Holy Spirit",
      "hr": "Moje tijelo je hram Duha Svetoga"
    },
    "verses": [
      "1 Corinthians 6:19-20",
      "1 Corinthians 3:16",
      "2 Corinthians 6:16"
    ],
    "teaching": {
      "fa": "موضوع امروز «بدن من معبد روح‌القدس است» است. بدن ایماندار جایگاه حضور خداست و باید با حقیقت الهی دیده شود. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “My Body Is the Temple of the Holy Spirit.” The believer’s body is the dwelling place of God’s presence and must be seen through divine truth. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Moje tijelo je hram Duha Svetoga.” Tijelo vjernika prebivalište je Božje prisutnosti i treba ga gledati kroz božansku istinu. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «بدن من معبد روح‌القدس است» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “My Body Is the Temple of the Holy Spirit” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Moje tijelo je hram Duha Svetoga” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 11,
    "title": {
      "fa": "در مسیح کامل هستم",
      "en": "Complete in Christ",
      "hr": "Potpun u Kristu"
    },
    "verses": [
      "Colossians 2:10",
      "Ephesians 1:3",
      "2 Peter 1:3"
    ],
    "teaching": {
      "fa": "موضوع امروز «در مسیح کامل هستم» است. کمال تو از اتحاد با مسیح می‌آید، نه از شرایط بیرونی. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Complete in Christ.” Your completeness comes from union with Christ, not from outward circumstances. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Potpun u Kristu.” Tvoja potpunost dolazi iz zajedništva s Kristom, a ne iz vanjskih okolnosti. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «در مسیح کامل هستم» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Complete in Christ” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Potpun u Kristu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 12,
    "title": {
      "fa": "برکت ابراهیم در زندگی من",
      "en": "The Blessing of Abraham in My Life",
      "hr": "Abrahamov blagoslov u mom životu"
    },
    "verses": [
      "Galatians 3:13-14",
      "Genesis 12:2-3",
      "Deuteronomy 28:3-6"
    ],
    "teaching": {
      "fa": "موضوع امروز «برکت ابراهیم در زندگی من» است. برکت در مسیح، تو را برای ثمردهی، امنیت و تأثیرگذاری جدا کرده است. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Blessing of Abraham in My Life.” The blessing in Christ has separated you for fruitfulness, security, and influence. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Abrahamov blagoslov u mom životu.” Blagoslov u Kristu odvojio te za plodnost, sigurnost i utjecaj. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «برکت ابراهیم در زندگی من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “The Blessing of Abraham in My Life” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Abrahamov blagoslov u mom životu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 13,
    "title": {
      "fa": "نام عیسی بر زندگی من",
      "en": "The Name of Jesus over My Life",
      "hr": "Ime Isusovo nad mojim životom"
    },
    "verses": [
      "Philippians 2:9-10",
      "John 14:13-14",
      "Mark 16:17-18"
    ],
    "teaching": {
      "fa": "موضوع امروز «نام عیسی بر زندگی من» است. نام عیسی، اقتدار آسمان را در زندگی و سخنان تو فعال می‌کند. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Name of Jesus over My Life.” The Name of Jesus activates heaven’s authority in your life and words. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Ime Isusovo nad mojim životom.” Ime Isusovo aktivira nebeski autoritet u tvom životu i riječima. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «نام عیسی بر زندگی من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “The Name of Jesus over My Life” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Ime Isusovo nad mojim životom” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 14,
    "title": {
      "fa": "من از بالا هستم",
      "en": "I Am from Above",
      "hr": "Ja sam odozgor"
    },
    "verses": [
      "John 3:31",
      "Colossians 3:1-2",
      "James 1:18"
    ],
    "teaching": {
      "fa": "موضوع امروز «من از بالا هستم» است. اصل و ریشه تو در مسیح، آسمانی و روحانی است. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “I Am from Above.” Your origin and root in Christ are heavenly and spiritual. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Ja sam odozgor.” Tvoje podrijetlo i korijen u Kristu su nebeski i duhovni. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «من از بالا هستم» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “I Am from Above” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Ja sam odozgor” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 15,
    "title": {
      "fa": "ترس جایی در من ندارد",
      "en": "Fear Has No Place in Me",
      "hr": "Strah nema mjesta u meni"
    },
    "verses": [
      "2 Timothy 1:7",
      "1 John 4:18",
      "Psalm 27:1"
    ],
    "teaching": {
      "fa": "موضوع امروز «ترس جایی در من ندارد» است. محبت و حضور خدا ترس را از قلب ایماندار بیرون می‌کند. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Fear Has No Place in Me.” God’s love and presence drive fear out of the believer’s heart. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Strah nema mjesta u meni.” Božja ljubav i prisutnost istjeruju strah iz srca vjernika. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «ترس جایی در من ندارد» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Fear Has No Place in Me” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Strah nema mjesta u meni” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 16,
    "title": {
      "fa": "سلامتی و آرامش مسیح",
      "en": "The Peace and Wholeness of Christ",
      "hr": "Mir i cjelovitost Kristova"
    },
    "verses": [
      "John 14:27",
      "Philippians 4:7",
      "Colossians 3:15"
    ],
    "teaching": {
      "fa": "موضوع امروز «سلامتی و آرامش مسیح» است. سلامتی خدا فقط سکوت بیرونی نیست، بلکه سلامت درونی و اقتدار روحانی است. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Peace and Wholeness of Christ.” The peace of God is not merely outward quietness; it is inward wholeness and spiritual authority. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Mir i cjelovitost Kristova.” Božji mir nije samo vanjska tišina; to je unutarnja cjelovitost i duhovni autoritet. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «سلامتی و آرامش مسیح» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “The Peace and Wholeness of Christ” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Mir i cjelovitost Kristova” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 17,
    "title": {
      "fa": "پیشرفت روزانه",
      "en": "Daily Progress",
      "hr": "Svakodnevni napredak"
    },
    "verses": [
      "Proverbs 4:18",
      "Psalm 92:12-14",
      "2 Corinthians 3:18"
    ],
    "teaching": {
      "fa": "موضوع امروز «پیشرفت روزانه» است. راه عادل روشن‌تر می‌شود؛ هر روز می‌تواند قدمی به‌سوی جلو باشد. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Daily Progress.” The path of the righteous shines brighter; each day can be a step forward. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Svakodnevni napredak.” Put pravednika svijetli sve jače; svaki dan može biti korak naprijed. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «پیشرفت روزانه» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Daily Progress” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Svakodnevni napredak” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 18,
    "title": {
      "fa": "کلام، داروی جان من",
      "en": "The Word as Medicine to My Life",
      "hr": "Riječ kao lijek mom životu"
    },
    "verses": [
      "Proverbs 4:22",
      "Joshua 1:8",
      "Psalm 1:2-3"
    ],
    "teaching": {
      "fa": "موضوع امروز «کلام، داروی جان من» است. وقتی کلام را دریافت، تأمل و اعلام می‌کنی، حقیقت خدا در تو ریشه می‌گیرد. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Word as Medicine to My Life.” When you receive, meditate on, and declare the Word, God’s truth takes root in you. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Riječ kao lijek mom životu.” Kada primaš, razmatraš i izgovaraš Riječ, Božja istina pušta korijen u tebi. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «کلام، داروی جان من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “The Word as Medicine to My Life” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Riječ kao lijek mom životu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 19,
    "title": {
      "fa": "قوت در انسان درونی",
      "en": "Strength in the Inner Man",
      "hr": "Snaga u unutarnjem čovjeku"
    },
    "verses": [
      "Ephesians 3:16",
      "Colossians 1:11",
      "Isaiah 40:31"
    ],
    "teaching": {
      "fa": "موضوع امروز «قوت در انسان درونی» است. قدرت روح‌القدس از درون آغاز می‌شود و سپس در زندگی بیرونی آشکار می‌گردد. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Strength in the Inner Man.” The power of the Holy Spirit begins within and then manifests outwardly. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Snaga u unutarnjem čovjeku.” Sila Duha Svetoga počinje iznutra, a zatim se očituje izvana. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «قوت در انسان درونی» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Strength in the Inner Man” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Snaga u unutarnjem čovjeku” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 20,
    "title": {
      "fa": "رهایی از محکومیت",
      "en": "Freedom from Condemnation",
      "hr": "Sloboda od osude"
    },
    "verses": [
      "Romans 8:1",
      "John 8:36",
      "Ephesians 1:6"
    ],
    "teaching": {
      "fa": "موضوع امروز «رهایی از محکومیت» است. محکومیت صدای خدا نیست؛ در مسیح تو پذیرفته و آزاد هستی. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Freedom from Condemnation.” Condemnation is not the voice of God; in Christ you are accepted and free. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Sloboda od osude.” Osuda nije Božji glas; u Kristu si prihvaćen i slobodan. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «رهایی از محکومیت» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Freedom from Condemnation” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Sloboda od osude” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 21,
    "title": {
      "fa": "محبت پدر در من",
      "en": "The Father’s Love in Me",
      "hr": "Očeva ljubav u meni"
    },
    "verses": [
      "Romans 5:5",
      "Ephesians 3:17-19",
      "1 John 3:1"
    ],
    "teaching": {
      "fa": "موضوع امروز «محبت پدر در من» است. امروز حقیقت محبت پدر در من را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Father’s Love in Me.” Today I receive and declare the truth of The Father’s Love in Me by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Očeva ljubav u meni.” Danas vjerom primam i objavljujem istinu: Očeva ljubav u meni. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «محبت پدر در من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “The Father’s Love in Me” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Očeva ljubav u meni” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 22,
    "title": {
      "fa": "حکمت خدا برای امروز",
      "en": "God’s Wisdom for Today",
      "hr": "Božja mudrost za danas"
    },
    "verses": [
      "James 1:5",
      "1 Corinthians 1:30",
      "Proverbs 3:5-6"
    ],
    "teaching": {
      "fa": "موضوع امروز «حکمت خدا برای امروز» است. امروز حقیقت حکمت خدا برای امروز را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “God’s Wisdom for Today.” Today I receive and declare the truth of God’s Wisdom for Today by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Božja mudrost za danas.” Danas vjerom primam i objavljujem istinu: Božja mudrost za danas. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «حکمت خدا برای امروز» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “God’s Wisdom for Today” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Božja mudrost za danas” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 23,
    "title": {
      "fa": "نور در مسیر من",
      "en": "Light on My Path",
      "hr": "Svjetlo na mom putu"
    },
    "verses": [
      "Psalm 119:105",
      "John 8:12",
      "Matthew 5:14"
    ],
    "teaching": {
      "fa": "موضوع امروز «نور در مسیر من» است. امروز حقیقت نور در مسیر من را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Light on My Path.” Today I receive and declare the truth of Light on My Path by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Svjetlo na mom putu.” Danas vjerom primam i objavljujem istinu: Svjetlo na mom putu. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «نور در مسیر من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Light on My Path” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Svjetlo na mom putu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 24,
    "title": {
      "fa": "اعتماد به عهد خدا",
      "en": "Trusting God’s Covenant",
      "hr": "Pouzdanje u Božji savez"
    },
    "verses": [
      "Hebrews 8:6",
      "2 Corinthians 1:20",
      "Psalm 89:34"
    ],
    "teaching": {
      "fa": "موضوع امروز «اعتماد به عهد خدا» است. امروز حقیقت اعتماد به عهد خدا را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Trusting God’s Covenant.” Today I receive and declare the truth of Trusting God’s Covenant by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Pouzdanje u Božji savez.” Danas vjerom primam i objavljujem istinu: Pouzdanje u Božji savez. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «اعتماد به عهد خدا» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Trusting God’s Covenant” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Pouzdanje u Božji savez” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 25,
    "title": {
      "fa": "ثمر روح در من",
      "en": "The Fruit of the Spirit in Me",
      "hr": "Plod Duha u meni"
    },
    "verses": [
      "Galatians 5:22-23",
      "John 15:5",
      "Philippians 1:11"
    ],
    "teaching": {
      "fa": "موضوع امروز «ثمر روح در من» است. امروز حقیقت ثمر روح در من را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Fruit of the Spirit in Me.” Today I receive and declare the truth of The Fruit of the Spirit in Me by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Plod Duha u meni.” Danas vjerom primam i objavljujem istinu: Plod Duha u meni. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «ثمر روح در من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “The Fruit of the Spirit in Me” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Plod Duha u meni” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 26,
    "title": {
      "fa": "اقتدار بر تاریکی",
      "en": "Authority over Darkness",
      "hr": "Autoritet nad tamom"
    },
    "verses": [
      "Colossians 1:13",
      "Luke 10:19",
      "Ephesians 6:10-11"
    ],
    "teaching": {
      "fa": "موضوع امروز «اقتدار بر تاریکی» است. امروز حقیقت اقتدار بر تاریکی را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Authority over Darkness.” Today I receive and declare the truth of Authority over Darkness by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Autoritet nad tamom.” Danas vjerom primam i objavljujem istinu: Autoritet nad tamom. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «اقتدار بر تاریکی» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Authority over Darkness” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Autoritet nad tamom” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 27,
    "title": {
      "fa": "پوشیده در مسیح",
      "en": "Covered in Christ",
      "hr": "Pokriven u Kristu"
    },
    "verses": [
      "Colossians 3:3",
      "Psalm 91:1-2",
      "Romans 13:14"
    ],
    "teaching": {
      "fa": "موضوع امروز «پوشیده در مسیح» است. امروز حقیقت پوشیده در مسیح را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Covered in Christ.” Today I receive and declare the truth of Covered in Christ by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Pokriven u Kristu.” Danas vjerom primam i objavljujem istinu: Pokriven u Kristu. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «پوشیده در مسیح» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Covered in Christ” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Pokriven u Kristu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 28,
    "title": {
      "fa": "زبان شکرگزاری",
      "en": "The Language of Thanksgiving",
      "hr": "Jezik zahvalnosti"
    },
    "verses": [
      "1 Thessalonians 5:18",
      "Psalm 103:1-5",
      "Colossians 2:7"
    ],
    "teaching": {
      "fa": "موضوع امروز «زبان شکرگزاری» است. امروز حقیقت زبان شکرگزاری را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Language of Thanksgiving.” Today I receive and declare the truth of The Language of Thanksgiving by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Jezik zahvalnosti.” Danas vjerom primam i objavljujem istinu: Jezik zahvalnosti. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «زبان شکرگزاری» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “The Language of Thanksgiving” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Jezik zahvalnosti” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 29,
    "title": {
      "fa": "قدرت دعا و اعلام",
      "en": "The Power of Prayer and Declaration",
      "hr": "Sila molitve i objave"
    },
    "verses": [
      "Mark 11:24",
      "James 5:16",
      "Job 22:28"
    ],
    "teaching": {
      "fa": "موضوع امروز «قدرت دعا و اعلام» است. امروز حقیقت قدرت دعا و اعلام را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Power of Prayer and Declaration.” Today I receive and declare the truth of The Power of Prayer and Declaration by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Sila molitve i objave.” Danas vjerom primam i objavljujem istinu: Sila molitve i objave. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «قدرت دعا و اعلام» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “The Power of Prayer and Declaration” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Sila molitve i objave” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 30,
    "title": {
      "fa": "زندگی در فراوانی فیض",
      "en": "Living in Abundant Grace",
      "hr": "Život u obilnoj milosti"
    },
    "verses": [
      "2 Corinthians 9:8",
      "Romans 5:20-21",
      "Titus 2:11-12"
    ],
    "teaching": {
      "fa": "موضوع امروز «زندگی در فراوانی فیض» است. امروز حقیقت زندگی در فراوانی فیض را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Living in Abundant Grace.” Today I receive and declare the truth of Living in Abundant Grace by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Život u obilnoj milosti.” Danas vjerom primam i objavljujem istinu: Život u obilnoj milosti. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «زندگی در فراوانی فیض» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Living in Abundant Grace” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Život u obilnoj milosti” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 31,
    "title": {
      "fa": "استواری در طوفان",
      "en": "Standing Firm in the Storm",
      "hr": "Postojanost u oluji"
    },
    "verses": [
      "Matthew 7:24-25",
      "Psalm 46:1-2",
      "Hebrews 10:23"
    ],
    "teaching": {
      "fa": "موضوع امروز «استواری در طوفان» است. امروز حقیقت استواری در طوفان را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Standing Firm in the Storm.” Today I receive and declare the truth of Standing Firm in the Storm by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Postojanost u oluji.” Danas vjerom primam i objavljujem istinu: Postojanost u oluji. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «استواری در طوفان» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Standing Firm in the Storm” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Postojanost u oluji” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 32,
    "title": {
      "fa": "لباس عدالت",
      "en": "Clothed with Righteousness",
      "hr": "Odjeven u pravednost"
    },
    "verses": [
      "Isaiah 61:10",
      "2 Corinthians 5:21",
      "Romans 3:22"
    ],
    "teaching": {
      "fa": "موضوع امروز «لباس عدالت» است. امروز حقیقت لباس عدالت را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Clothed with Righteousness.” Today I receive and declare the truth of Clothed with Righteousness by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Odjeven u pravednost.” Danas vjerom primam i objavljujem istinu: Odjeven u pravednost. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «لباس عدالت» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Clothed with Righteousness” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Odjeven u pravednost” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 33,
    "title": {
      "fa": "زندگی بدون عقب‌نشینی",
      "en": "A Life without Drawing Back",
      "hr": "Život bez povlačenja"
    },
    "verses": [
      "Hebrews 10:38-39",
      "Philippians 3:14",
      "Luke 9:62"
    ],
    "teaching": {
      "fa": "موضوع امروز «زندگی بدون عقب‌نشینی» است. امروز حقیقت زندگی بدون عقب‌نشینی را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “A Life without Drawing Back.” Today I receive and declare the truth of A Life without Drawing Back by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Život bez povlačenja.” Danas vjerom primam i objavljujem istinu: Život bez povlačenja. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «زندگی بدون عقب‌نشینی» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “A Life without Drawing Back” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Život bez povlačenja” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 34,
    "title": {
      "fa": "وفور حیات در خانه من",
      "en": "Abundant Life in My Household",
      "hr": "Obilan život u mom domu"
    },
    "verses": [
      "Joshua 24:15",
      "Acts 16:31",
      "Psalm 128:1-4"
    ],
    "teaching": {
      "fa": "موضوع امروز «وفور حیات در خانه من» است. امروز حقیقت وفور حیات در خانه من را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Abundant Life in My Household.” Today I receive and declare the truth of Abundant Life in My Household by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Obilan život u mom domu.” Danas vjerom primam i objavljujem istinu: Obilan život u mom domu. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «وفور حیات در خانه من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Abundant Life in My Household” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Obilan život u mom domu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 35,
    "title": {
      "fa": "آزادی از ترس آینده",
      "en": "Free from Fear of the Future",
      "hr": "Sloboda od straha budućnosti"
    },
    "verses": [
      "Jeremiah 29:11",
      "Romans 8:28",
      "Matthew 6:34"
    ],
    "teaching": {
      "fa": "موضوع امروز «آزادی از ترس آینده» است. امروز حقیقت آزادی از ترس آینده را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Free from Fear of the Future.” Today I receive and declare the truth of Free from Fear of the Future by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Sloboda od straha budućnosti.” Danas vjerom primam i objavljujem istinu: Sloboda od straha budućnosti. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «آزادی از ترس آینده» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Free from Fear of the Future” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Sloboda od straha budućnosti” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 36,
    "title": {
      "fa": "چشمان ایمان",
      "en": "Eyes of Faith",
      "hr": "Oči vjere"
    },
    "verses": [
      "Ephesians 1:18",
      "Hebrews 11:1",
      "2 Corinthians 4:18"
    ],
    "teaching": {
      "fa": "موضوع امروز «چشمان ایمان» است. امروز حقیقت چشمان ایمان را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Eyes of Faith.” Today I receive and declare the truth of Eyes of Faith by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Oči vjere.” Danas vjerom primam i objavljujem istinu: Oči vjere. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «چشمان ایمان» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Eyes of Faith” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Oči vjere” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 37,
    "title": {
      "fa": "پیروزی در نام عیسی",
      "en": "Victory in the Name of Jesus",
      "hr": "Pobjeda u Isusovu imenu"
    },
    "verses": [
      "Acts 3:16",
      "Philippians 2:10",
      "John 16:23"
    ],
    "teaching": {
      "fa": "موضوع امروز «پیروزی در نام عیسی» است. امروز حقیقت پیروزی در نام عیسی را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Victory in the Name of Jesus.” Today I receive and declare the truth of Victory in the Name of Jesus by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Pobjeda u Isusovu imenu.” Danas vjerom primam i objavljujem istinu: Pobjeda u Isusovu imenu. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «پیروزی در نام عیسی» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Victory in the Name of Jesus” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Pobjeda u Isusovu imenu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 38,
    "title": {
      "fa": "افزایش و ثمردهی",
      "en": "Increase and Fruitfulness",
      "hr": "Rast i plodnost"
    },
    "verses": [
      "Genesis 1:28",
      "John 15:8",
      "Psalm 115:14"
    ],
    "teaching": {
      "fa": "موضوع امروز «افزایش و ثمردهی» است. امروز حقیقت افزایش و ثمردهی را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Increase and Fruitfulness.” Today I receive and declare the truth of Increase and Fruitfulness by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Rast i plodnost.” Danas vjerom primam i objavljujem istinu: Rast i plodnost. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «افزایش و ثمردهی» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Increase and Fruitfulness” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Rast i plodnost” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 39,
    "title": {
      "fa": "حضور خدا همراه من",
      "en": "God’s Presence Goes with Me",
      "hr": "Božja prisutnost ide sa mnom"
    },
    "verses": [
      "Exodus 33:14",
      "Matthew 28:20",
      "Psalm 23:4"
    ],
    "teaching": {
      "fa": "موضوع امروز «حضور خدا همراه من» است. امروز حقیقت حضور خدا همراه من را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “God’s Presence Goes with Me.” Today I receive and declare the truth of God’s Presence Goes with Me by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Božja prisutnost ide sa mnom.” Danas vjerom primam i objavljujem istinu: Božja prisutnost ide sa mnom. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «حضور خدا همراه من» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “God’s Presence Goes with Me” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Božja prisutnost ide sa mnom” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 40,
    "title": {
      "fa": "پایداری در ایمان",
      "en": "Perseverance in Faith",
      "hr": "Ustrajnost u vjeri"
    },
    "verses": [
      "James 1:2-4",
      "Romans 4:20-21",
      "1 Corinthians 15:58"
    ],
    "teaching": {
      "fa": "موضوع امروز «پایداری در ایمان» است. امروز حقیقت پایداری در ایمان را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Perseverance in Faith.” Today I receive and declare the truth of Perseverance in Faith by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Ustrajnost u vjeri.” Danas vjerom primam i objavljujem istinu: Ustrajnost u vjeri. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «پایداری در ایمان» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Perseverance in Faith” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Ustrajnost u vjeri” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 41,
    "title": {
      "fa": "تازه شدن هر روز",
      "en": "Renewed Every Day",
      "hr": "Obnovljen svaki dan"
    },
    "verses": [
      "2 Corinthians 4:16",
      "Lamentations 3:22-23",
      "Psalm 103:5"
    ],
    "teaching": {
      "fa": "موضوع امروز «تازه شدن هر روز» است. امروز حقیقت تازه شدن هر روز را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Renewed Every Day.” Today I receive and declare the truth of Renewed Every Day by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Obnovljen svaki dan.” Danas vjerom primam i objavljujem istinu: Obnovljen svaki dan. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «تازه شدن هر روز» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Renewed Every Day” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Obnovljen svaki dan” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 42,
    "title": {
      "fa": "برتری زندگی روحانی",
      "en": "The Superiority of Spiritual Life",
      "hr": "Nadmoć duhovnog života"
    },
    "verses": [
      "Romans 8:6",
      "John 6:63",
      "Galatians 5:16"
    ],
    "teaching": {
      "fa": "موضوع امروز «برتری زندگی روحانی» است. امروز حقیقت برتری زندگی روحانی را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “The Superiority of Spiritual Life.” Today I receive and declare the truth of The Superiority of Spiritual Life by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Nadmoć duhovnog života.” Danas vjerom primam i objavljujem istinu: Nadmoć duhovnog života. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «برتری زندگی روحانی» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “The Superiority of Spiritual Life” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Nadmoć duhovnog života” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 43,
    "title": {
      "fa": "قلبی پر از کلام",
      "en": "A Heart Filled with the Word",
      "hr": "Srce ispunjeno Riječju"
    },
    "verses": [
      "Colossians 3:16",
      "Deuteronomy 6:6",
      "Psalm 119:11"
    ],
    "teaching": {
      "fa": "موضوع امروز «قلبی پر از کلام» است. امروز حقیقت قلبی پر از کلام را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “A Heart Filled with the Word.” Today I receive and declare the truth of A Heart Filled with the Word by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Srce ispunjeno Riječju.” Danas vjerom primam i objavljujem istinu: Srce ispunjeno Riječju. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «قلبی پر از کلام» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “A Heart Filled with the Word” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Srce ispunjeno Riječju” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 44,
    "title": {
      "fa": "آزاد برای خدمت",
      "en": "Free to Serve",
      "hr": "Slobodan za služenje"
    },
    "verses": [
      "Galatians 5:13",
      "1 Peter 4:10",
      "Ephesians 2:10"
    ],
    "teaching": {
      "fa": "موضوع امروز «آزاد برای خدمت» است. امروز حقیقت آزاد برای خدمت را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Free to Serve.” Today I receive and declare the truth of Free to Serve by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Slobodan za služenje.” Danas vjerom primam i objavljujem istinu: Slobodan za služenje. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «آزاد برای خدمت» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Free to Serve” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Slobodan za služenje” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 45,
    "title": {
      "fa": "حیات برتر از ضعف",
      "en": "Life Greater than Weakness",
      "hr": "Život veći od slabosti"
    },
    "verses": [
      "2 Corinthians 12:9",
      "Joel 3:10",
      "Nehemiah 8:10"
    ],
    "teaching": {
      "fa": "موضوع امروز «حیات برتر از ضعف» است. امروز حقیقت حیات برتر از ضعف را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Life Greater than Weakness.” Today I receive and declare the truth of Life Greater than Weakness by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Život veći od slabosti.” Danas vjerom primam i objavljujem istinu: Život veći od slabosti. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «حیات برتر از ضعف» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Life Greater than Weakness” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Život veći od slabosti” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 46,
    "title": {
      "fa": "اعلان بر خانواده",
      "en": "Declaration over My Family",
      "hr": "Objava nad mojom obitelji"
    },
    "verses": [
      "Psalm 112:1-3",
      "Isaiah 54:13",
      "Proverbs 11:21"
    ],
    "teaching": {
      "fa": "موضوع امروز «اعلان بر خانواده» است. امروز حقیقت اعلان بر خانواده را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Declaration over My Family.” Today I receive and declare the truth of Declaration over My Family by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Objava nad mojom obitelji.” Danas vjerom primam i objavljujem istinu: Objava nad mojom obitelji. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «اعلان بر خانواده» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Declaration over My Family” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Objava nad mojom obitelji” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 47,
    "title": {
      "fa": "وفاداری خدا در امروز",
      "en": "God’s Faithfulness Today",
      "hr": "Božja vjernost danas"
    },
    "verses": [
      "Lamentations 3:23",
      "1 Corinthians 1:9",
      "2 Thessalonians 3:3"
    ],
    "teaching": {
      "fa": "موضوع امروز «وفاداری خدا در امروز» است. امروز حقیقت وفاداری خدا در امروز را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “God’s Faithfulness Today.” Today I receive and declare the truth of God’s Faithfulness Today by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Božja vjernost danas.” Danas vjerom primam i objavljujem istinu: Božja vjernost danas. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «وفاداری خدا در امروز» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “God’s Faithfulness Today” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Božja vjernost danas” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 48,
    "title": {
      "fa": "راه باز در مسیح",
      "en": "An Open Way in Christ",
      "hr": "Otvoren put u Kristu"
    },
    "verses": [
      "Revelation 3:8",
      "Isaiah 43:19",
      "John 14:6"
    ],
    "teaching": {
      "fa": "موضوع امروز «راه باز در مسیح» است. امروز حقیقت راه باز در مسیح را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “An Open Way in Christ.” Today I receive and declare the truth of An Open Way in Christ by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Otvoren put u Kristu.” Danas vjerom primam i objavljujem istinu: Otvoren put u Kristu. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «راه باز در مسیح» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “An Open Way in Christ” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Otvoren put u Kristu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 49,
    "title": {
      "fa": "پاکی و سلامت درونی",
      "en": "Purity and Inner Wholeness",
      "hr": "Čistoća i unutarnja cjelovitost"
    },
    "verses": [
      "Psalm 51:10",
      "Matthew 5:8",
      "1 Thessalonians 5:23"
    ],
    "teaching": {
      "fa": "موضوع امروز «پاکی و سلامت درونی» است. امروز حقیقت پاکی و سلامت درونی را با ایمان دریافت و اعلام می‌کنم. تعلیم امروز تو را دعوت می‌کند که هویت خود را از مسیح بگیری، نه از احساسات، بدن، گذشته، تجربه‌های تلخ یا گزارش‌های منفی. انسان طبیعی با آنچه می‌بیند زندگی می‌کند، اما ایماندار با آنچه خدا گفته است حرکت می‌کند. وقتی آیات را می‌خوانی، فقط به دنبال اطلاعات نباش؛ آن‌ها را مانند نور، دارو، غذا و سلاح روحانی دریافت کن. سپس با دهانت همان حقیقت را به زندگی خود اعلام کن، زیرا ایمان زنده همیشه به سخن تبدیل می‌شود. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Purity and Inner Wholeness.” Today I receive and declare the truth of Purity and Inner Wholeness by faith. Today’s teaching invites you to draw your identity from Christ, not from feelings, your body, your past, painful experiences, or negative reports. The natural person lives by what is seen, but the believer moves by what God has spoken. When you read the scriptures, do not seek information only; receive them as light, medicine, food, and spiritual weapon. Then release that same truth with your mouth, because living faith always becomes a confession. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Čistoća i unutarnja cjelovitost.” Danas vjerom primam i objavljujem istinu: Čistoća i unutarnja cjelovitost. Današnje učenje poziva te da svoj identitet crpiš iz Krista, a ne iz osjećaja, tijela, prošlosti, bolnih iskustava ili negativnih izvještaja. Prirodni čovjek živi po onome što vidi, ali vjernik se kreće po onome što je Bog rekao. Kada čitaš Pisma, nemoj tražiti samo informaciju; primi ih kao svjetlo, lijek, hranu i duhovno oružje. Zatim tu istinu izgovori svojim ustima, jer živa vjera uvijek postaje ispovijed. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "من اعلام می‌کنم که زندگی من تحت حاکمیت عیسی مسیح است. هر بخش از وجود من با کلام خدا هماهنگ می‌شود. قلب من قوی است، ذهن من روشن است، قدم‌های من هدایت می‌شود و زبان من با ایمان سخن می‌گوید. من تسلیم دروغ‌های دشمن نمی‌شوم و اجازه نمی‌دهم ترس، نگرانی یا احساس محکومیت در من خانه کند. من فرزند خدا هستم، حامل حضور خدا هستم و در مسیح برای زندگی غالب آفریده شده‌ام. امروز برکت خدا بر خانه، بدن، فکر، خدمت، کار و آینده من جاری است. من می‌ایستم، ایمانم را فعال می‌کنم و اعلام می‌کنم که آنچه خدا درباره من گفته است، در زندگی من آشکار می‌شود. به نام عیسی، آمین. من امروز حقیقت «پاکی و سلامت درونی» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "I declare that my life is under the lordship of Jesus Christ. Every part of my being comes into agreement with the Word of God. My heart is strong, my mind is clear, my steps are guided, and my tongue speaks with faith. I do not submit to the lies of the enemy, and I do not allow fear, worry, or condemnation to live in me. I am a child of God, a carrier of God’s presence, and I was created in Christ for victorious living. Today the blessing of God flows over my home, body, mind, service, work, and future. I stand, I activate my faith, and I declare that what God has spoken concerning me is manifested in my life. In the Name of Jesus, amen. Today I receive the truth of “Purity and Inner Wholeness” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Objavljujem da je moj život pod gospodstvom Isusa Krista. Svaki dio mog bića usklađuje se s Božjom riječju. Moje srce je snažno, moj um je jasan, moji koraci su vođeni i moj jezik govori vjerom. Ne podlažem se lažima neprijatelja i ne dopuštam strahu, brizi ili osudi da stanuju u meni. Ja sam Božje dijete, nositelj Božje prisutnosti i stvoren sam u Kristu za pobjednički život. Danas Božji blagoslov teče nad mojim domom, tijelom, umom, služenjem, radom i budućnošću. Stojim, aktiviram svoju vjeru i objavljujem da se ono što je Bog rekao o meni očituje u mom životu. U Isusovo ime, amen. Danas primam istinu: “Čistoća i unutarnja cjelovitost” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  },
  {
    "day": 50,
    "title": {
      "fa": "زندگی برای جلال خدا",
      "en": "Living for God’s Glory",
      "hr": "Život za Božju slavu"
    },
    "verses": [
      "1 Corinthians 10:31",
      "Matthew 5:16",
      "Ephesians 1:12"
    ],
    "teaching": {
      "fa": "موضوع امروز «زندگی برای جلال خدا» است. امروز حقیقت زندگی برای جلال خدا را با ایمان دریافت و اعلام می‌کنم. ایمان مسیحی فقط دانستن یک حقیقت نیست؛ ایمان یعنی حقیقت خدا را آن‌قدر در قلب خود جای دهی که زبان، نگاه، تصمیم و واکنش تو با همان حقیقت هماهنگ شود. وقتی کلام خدا را اعلام می‌کنی، در واقع به روح خود جهت می‌دهی و فضای زندگی‌ات را با حقیقت آسمان پر می‌کنی. شرایط ممکن است با صدای بلند سخن بگویند، اما کلام خدا صدای نهایی است. امروز لازم نیست از روی ترس یا فشار تصمیم بگیری؛ تو می‌توانی از جایگاه فرزند خدا، با آرامش و اقتدار سخن بگویی. در این روز، آیات کلیدی را با دقت بخوان و اجازه بده روح‌القدس معنی آن‌ها را در قلبت زنده کند. آیه فقط یک جمله مذهبی نیست؛ آیه حامل فکر، اراده و قدرت خداست. وقتی آیه را می‌خوانی، آن را به خودت نسبت بده، سپس آن را با ایمان اعلام کن تا زبانت با حقیقت خدا هماهنگ شود.",
      "en": "Today’s theme is “Living for God’s Glory.” Today I receive and declare the truth of Living for God’s Glory by faith. Christian faith is not merely knowing a truth; faith means allowing God’s truth to become so established in your heart that your words, perspective, decisions, and reactions agree with it. When you declare the Word, you give direction to your spirit and fill the atmosphere of your life with the truth of heaven. Circumstances may speak loudly, but God’s Word is the final voice. Today you do not have to decide from fear or pressure; you can speak from your position as a child of God, with peace and authority. Today, read the key verses carefully and allow the Holy Spirit to make their meaning alive in your heart. A verse is not merely a religious sentence; it carries the thought, will, and power of God. As you read it, apply it personally, then declare it by faith until your tongue agrees with God’s truth.",
      "hr": "Današnja tema je “Život za Božju slavu.” Danas vjerom primam i objavljujem istinu: Život za Božju slavu. Kršćanska vjera nije samo poznavanje istine; vjera znači dopustiti Božjoj istini da se toliko učvrsti u srcu da se tvoje riječi, pogled, odluke i reakcije usklade s njom. Kada objavljuješ Riječ, daješ smjer svom duhu i ispunjavaš atmosferu svog života istinom neba. Okolnosti mogu govoriti glasno, ali Božja riječ ima posljednju riječ. Danas ne moraš odlučivati iz straha ili pritiska; možeš govoriti iz položaja Božjeg djeteta, s mirom i autoritetom. Danas pažljivo pročitaj ključne stihove i dopusti Duhu Svetom da njihovo značenje učini živim u tvom srcu. Stih nije samo religiozna rečenica; on nosi Božju misao, volju i silu. Dok ga čitaš, primijeni ga osobno, a zatim ga izgovori vjerom dok se tvoj jezik ne uskladi s Božjom istinom."
    },
    "declaration": {
      "fa": "امروز با ایمان اعلام می‌کنم که کلام خدا در من زنده، فعال و قدرتمند است. من اسیر ترس، ضعف، بیماری، شکست، کمبود یا سردرگمی نیستم. حقیقت خدا در روح من ریشه می‌گیرد، ذهنم را تازه می‌کند و بدنم را با حیات الهی تقویت می‌نماید. من در مسیح هویتی تازه دارم؛ گذشته من ارباب من نیست، شرایط من آینده مرا تعیین نمی‌کند، و هیچ گزارش منفی بالاتر از گزارش خدا نیست. من با دهان خود حیات، سلامتی، قوت، حکمت، پیروزی و آرامش را اعلام می‌کنم. روح‌القدس در من کار می‌کند و مرا در مسیر خداوند هدایت می‌نماید. امروز من در نور قدم برمی‌دارم، با ایمان سخن می‌گویم و ثمر کلام خدا را در زندگی خود می‌بینم. به نام عیسی، آمین. من امروز حقیقت «زندگی برای جلال خدا» را می‌پذیرم و اعلام می‌کنم که این حقیقت در روح، جان، بدن، خانواده، خدمت و آینده من فعال است. من با کلام خدا هم‌صدا می‌شوم و هر چیزی را که با اراده خدا برای زندگی من هماهنگ نیست، رد می‌کنم. مسیر من روشن است، ایمان من زنده است و زندگی من برای جلال خداوند ثمر می‌دهد.",
      "en": "Today I declare by faith that the Word of God is alive, active, and powerful in me. I am not a prisoner of fear, weakness, sickness, failure, lack, or confusion. The truth of God takes root in my spirit, renews my mind, and strengthens my body with divine life. I have a new identity in Christ; my past is not my master, my circumstances do not determine my future, and no negative report is higher than God’s report. With my mouth I declare life, health, strength, wisdom, victory, and peace. The Holy Spirit is at work in me and He guides me in the path of the Lord. Today I walk in the light, I speak by faith, and I see the fruit of God’s Word in my life. In the Name of Jesus, amen. Today I receive the truth of “Living for God’s Glory” and I declare that this truth is active in my spirit, soul, body, family, service, and future. I agree with the Word of God and I reject everything that does not align with God’s will for my life. My path is bright, my faith is alive, and my life bears fruit for the glory of the Lord.",
      "hr": "Danas vjerom objavljujem da je Božja riječ živa, djelotvorna i snažna u meni. Nisam zarobljenik straha, slabosti, bolesti, poraza, oskudice ili zbunjenosti. Božja istina pušta korijen u mom duhu, obnavlja moj um i jača moje tijelo božanskim životom. Imam novi identitet u Kristu; moja prošlost nije moj gospodar, moje okolnosti ne određuju moju budućnost i nijedan negativan izvještaj nije viši od Božjeg izvještaja. Svojim ustima objavljujem život, zdravlje, snagu, mudrost, pobjedu i mir. Duh Sveti djeluje u meni i vodi me putem Gospodnjim. Danas hodam u svjetlu, govorim vjerom i vidim plod Božje riječi u svom životu. U Isusovo ime, amen. Danas primam istinu: “Život za Božju slavu” i objavljujem da je ta istina aktivna u mom duhu, duši, tijelu, obitelji, služenju i budućnosti. Slažem se s Božjom riječju i odbacujem sve što nije u skladu s Božjom voljom za moj život. Moj put je svijetao, moja vjera je živa i moj život donosi plod na slavu Gospodnju."
    },
    "prayer": {
      "fa": "پدر آسمانی، امروز کلامت را در قلب من زنده کن. به من کمک کن با ایمان سخن بگویم، با حکمت عمل کنم و در حقیقت تو ثابت بمانم. به نام عیسی، آمین.",
      "en": "Heavenly Father, make Your Word alive in my heart today. Help me to speak by faith, act with wisdom, and remain established in Your truth. In the Name of Jesus, amen.",
      "hr": "Nebeski Oče, oživi danas svoju Riječ u mom srcu. Pomozi mi govoriti vjerom, djelovati mudro i ostati učvršćen u tvojoj istini. U Isusovo ime, amen."
    }
  }
];

var UI = {
  fa:{cycle:'چرخه ۵۰ روزه اعلان‌های ایمانی', read:'با ایمان و صدای بلند بخوانید', key:'آیات کلیدی', teaching:'تعلیم روز', declaration:'اعلان ایمان امروز', prayer:'دعای کوتاه', day:'روز', verseText:'متن آیه', close:'بستن', notFound:'متن آیه در دیتای فعلی پیدا نشد. می‌توانید این آدرس را در بخش کتاب‌مقدس جستجو کنید.'},
  en:{cycle:'50-Day Faith Declarations Cycle', read:'Read out loud with faith', key:'Key Verses', teaching:'Daily Teaching', declaration:'Today’s Faith Declaration', prayer:'Short Prayer', day:'Day', verseText:'Verse Text', close:'Close', notFound:'The verse text was not found in the current Bible data. You can search this reference in the Bible section.'},
  hr:{cycle:'50-dnevni ciklus izjava vjere', read:'Čitajte naglas s vjerom', key:'Ključni stihovi', teaching:'Dnevno učenje', declaration:'Današnja izjava vjere', prayer:'Kratka molitva', day:'Dan', verseText:'Tekst stiha', close:'Zatvori', notFound:'Tekst stiha nije pronađen u trenutnim biblijskim podacima. Ovu referencu možete potražiti u odjeljku Biblija.'}
};

function lang(){
  var v='';
  try{ v=(localStorage.getItem('lang')||localStorage.getItem('omideno7_lang')||document.documentElement.lang||navigator.language||'fa').toLowerCase(); }catch(e){}
  if(v.indexOf('en')===0) return 'en';
  if(v.indexOf('hr')===0 || v.indexOf('cro')>-1 || v.indexOf('hrv')>-1) return 'hr';
  return 'fa';
}
function L(obj){ var l=lang(); return (obj && (obj[l]||obj.fa||obj.en||obj.hr)) || ''; }
function T(k){ return (UI[lang()]||UI.fa)[k] || UI.fa[k] || k; }
function esc(s){ return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function toFa(n){ return String(n).replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d];}); }
function pad(n){ return String(n).padStart(2,'0'); }
function todayKey(){ var d=new Date(); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function daysSinceStart(){
  var start=new Date(START_DATE+'T00:00:00');
  var now=new Date(todayKey()+'T00:00:00');
  return Math.floor((now-start)/86400000);
}
function currentIndex(){
  var diff=daysSinceStart();
  if(diff<0) diff=0;
  return diff % DATA.length;
}

function injectCss(){
 if(document.getElementById('omideno7FaithDeclarationsCss')) return;
 var st=document.createElement('style');
 st.id='omideno7FaithDeclarationsCss';
 st.textContent = `
  .ofd-wrap{display:grid;gap:16px;margin:12px 0 90px}
  .ofd-hero{background:linear-gradient(135deg,#fff,#eef5ff);border:1px solid #e5eaf5;border-radius:24px;padding:22px;box-shadow:0 18px 40px rgba(6,20,109,.08)}
  .ofd-hero h3{margin:0 0 8px;font-size:22px;color:#06146d}.ofd-main-title h3{margin:0;font-size:26px;font-weight:950;line-height:1.7;text-align:center}
  .ofd-hero p{margin:0;color:#4b5575;line-height:1.9}
  .ofd-card{background:#fff;border:1px solid #e8ecf5;border-radius:22px;padding:18px;box-shadow:0 10px 30px rgba(6,20,109,.06)}
  .ofd-section-title{font-weight:900;color:#06146d;margin:0 0 10px;font-size:18px}
  .ofd-text{white-space:pre-wrap;line-height:2.05;color:#111827;font-size:16px}
  .ofd-declaration{font-weight:800;color:#0f1f3d;background:#f7f8ff;border:1px solid #e3e7ff;border-radius:18px;padding:14px}
  .ofd-verses{display:flex;flex-wrap:wrap;gap:8px}
  .ofd-verse-btn{border:0;border-radius:999px;padding:10px 14px;background:#06146d;color:#fff;font-weight:800;box-shadow:0 8px 20px rgba(6,20,109,.18)}
  .ofd-prayer{background:#fff8e8;border-color:#fde2a8}
  .ofd-modal{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:999999;display:flex;align-items:center;justify-content:center;padding:18px}
  .ofd-modal-box{max-width:720px;width:100%;max-height:85vh;overflow:auto;background:#fff;border-radius:24px;padding:20px;box-shadow:0 30px 90px rgba(0,0,0,.35)}
  .ofd-modal-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
  .ofd-modal-head h3{margin:0;color:#06146d}
  .ofd-close{border:0;border-radius:14px;background:#eef2ff;color:#06146d;padding:9px 12px;font-weight:900}
  .ofd-verse-line{padding:10px 0;border-bottom:1px solid #eef0f6;line-height:1.9}
  html[lang="fa"] .ofd-wrap,[dir="rtl"] .ofd-wrap{direction:rtl;text-align:right}
 `;
 document.head.appendChild(st);
}

function parseRef(ref){
 ref=String(ref||'').trim();
 var bookNames=Object.keys(BOOK_MAP).sort(function(a,b){return b.length-a.length;});
 for(var i=0;i<bookNames.length;i++){
   var name=bookNames[i];
   if(ref.toLowerCase().indexOf(name.toLowerCase())===0){
     var rest=ref.slice(name.length).trim();
     var m=rest.match(/^(\d+)\s*:\s*(\d+)(?:\s*[-–]\s*(\d+))?/);
     if(!m) return null;
     return {book:name,id:BOOK_MAP[name],chapter:parseInt(m[1],10),from:parseInt(m[2],10),to:parseInt(m[3]||m[2],10)};
   }
 }
 return null;
}
function getVerseText(ref){
 var p=parseRef(ref);
 if(!p || !window.bibleReaderData || !window.bibleReaderData.chapters) return [];
 var ch=((window.bibleReaderData.chapters[p.id]||{})[String(p.chapter)]||{});
 var arr=ch[lang()] || ch.en || ch.fa || ch.hr || [];
 var out=[];
 for(var i=0;i<arr.length;i++){
   var v=parseInt(arr[i].v,10);
   if(v>=p.from && v<=p.to) out.push({v:v,t:arr[i].t||''});
 }
 return out;
}
function showVerse(ref){
 var lines=getVerseText(ref);
 var body = lines.length
   ? lines.map(function(x){return '<div class="ofd-verse-line"><strong>'+esc(x.v)+'</strong> '+esc(x.t)+'</div>';}).join('')
   : '<p class="ofd-text">'+esc(T('notFound'))+'</p>';
 var modal=document.createElement('div');
 modal.className='ofd-modal';
 modal.innerHTML='<div class="ofd-modal-box"><div class="ofd-modal-head"><h3>'+esc(displayRef(ref))+'</h3><button class="ofd-close">'+esc(T('close'))+'</button></div>'+body+'</div>';
 modal.querySelector('.ofd-close').onclick=function(){ modal.remove(); };
 modal.addEventListener('click',function(e){ if(e.target===modal) modal.remove(); });
 document.body.appendChild(modal);
}

function render(){
 injectCss();
 hideOldDeclarationsIntro();
 var root=document.getElementById('declarationsContent');
 if(!root) return;
 var item=DATA[currentIndex()];
 var l=lang();
 var dayLabel = l==='fa' ? toFa(item.day) : item.day;
 var mainTitle = esc(T('day'))+' '+dayLabel+' — '+esc(L(item.title));
 root.innerHTML =
  '<div class="ofd-wrap">'+
   '<div class="ofd-hero ofd-main-title"><h3>'+mainTitle+'</h3></div>'+
   '<div class="ofd-card"><div class="ofd-section-title">'+esc(T('key'))+'</div><div class="ofd-verses">'+
     (item.verses||[]).map(function(v){return '<button class="ofd-verse-btn" type="button" data-ofd-verse="'+esc(v)+'">'+esc(displayRef(v))+'</button>';}).join('')+
   '</div></div>'+
   '<div class="ofd-card"><div class="ofd-section-title">'+esc(T('teaching'))+'</div><div class="ofd-text">'+esc(L(item.teaching))+'</div></div>'+
   '<div class="ofd-card"><div class="ofd-section-title">'+esc(T('declaration'))+'</div><div class="ofd-text ofd-declaration">'+esc(L(item.declaration))+'</div></div>'+
   '<div class="ofd-card ofd-prayer"><div class="ofd-section-title">'+esc(T('prayer'))+'</div><div class="ofd-text">'+esc(L(item.prayer))+'</div></div>'+
  '</div>';
 root.querySelectorAll('[data-ofd-verse]').forEach(function(btn){
   btn.onclick=function(){ showVerse(btn.getAttribute('data-ofd-verse')); };
 });
}
document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){ setTimeout(render,150); },true);
window.renderOmideno7FaithDeclarations=render;
window.OMIDENO7_FAITH_DECLARATIONS={version:VERSION,startDate:START_DATE,items:DATA,render:render};
})();
