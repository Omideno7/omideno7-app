/* Omideno7 Daily Home Message - Stable V2
   Fixes flicker/revert on the small home message card.
   Load this file once, at the very end of beta.html before </body>.
*/
(function(){
  'use strict';

  var VERSION='2.0.0';
  var DAILY_HOME_MESSAGES=[
  {
    "fa": "امروز با ایمان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in faith; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u vjera; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در امید استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in hope; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u nada; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در محبت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in love; the presence of God strengthens you.",
    "hr": "Stoj danas u ljubav; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با آرامش سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with peace; the grace of God is with you.",
    "hr": "Govori i djeluj danas s mir; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده حکمت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let wisdom guide your thoughts and steps today.",
    "hr": "Neka mudrost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در قدرت روح‌القدس رشد کن.",
    "en": "Keep your eyes on Christ today and grow in the power of the Holy Spirit.",
    "hr": "Drži danas pogled na Kristu i rasti u sila Duha Svetoga."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و شکرگزاری را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate thanksgiving in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj zahvalnost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در کلام خدا پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in the Word of God.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u Božja riječ."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ فیض در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; grace will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; milost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با هدایت خدا قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in God’s guidance; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u Božje vodstvo; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در پیروزی استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in victory; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u pobjeda; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در نور مسیح بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in the light of Christ; the presence of God strengthens you.",
    "hr": "Stoj danas u Kristovo svjetlo; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با دعا سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with prayer; the grace of God is with you.",
    "hr": "Govori i djeluj danas s molitva; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده برکت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let blessing guide your thoughts and steps today.",
    "hr": "Neka blagoslov danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در رشد روحانی رشد کن.",
    "en": "Keep your eyes on Christ today and grow in spiritual growth.",
    "hr": "Drži danas pogled na Kristu i rasti u duhovni rast."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و استقامت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate perseverance in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj ustrajnost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در شجاعت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in courage.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u hrabrost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ اطمینان در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; confidence will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; pouzdanje će donijeti plod u tebi."
  },
  {
    "fa": "امروز با قدوسیت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in holiness; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u svetost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در خدمت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in service; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u služenje; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در حضور خدا بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in God’s presence; the presence of God strengthens you.",
    "hr": "Stoj danas u Božja prisutnost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با نجات سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with salvation; the grace of God is with you.",
    "hr": "Govori i djeluj danas s spasenje; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده عدالت خدا افکار و قدم‌هایت را هدایت کند.",
    "en": "Let God’s righteousness guide your thoughts and steps today.",
    "hr": "Neka Božja pravednost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در وفاداری رشد کن.",
    "en": "Keep your eyes on Christ today and grow in faithfulness.",
    "hr": "Drži danas pogled na Kristu i rasti u vjernost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و رحمت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate mercy in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj milosrđe u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در تسلی پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in comfort.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u utjeha."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ حقیقت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; truth will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; istina će donijeti plod u tebi."
  },
  {
    "fa": "امروز با اعلان ایمان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in confession of faith; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u ispovijed vjere; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در رهایی استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in deliverance; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u oslobođenje; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در ثمره روح بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in the fruit of the Spirit; the presence of God strengthens you.",
    "hr": "Stoj danas u plod Duha; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با زندگی تازه سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with new life; the grace of God is with you.",
    "hr": "Govori i djeluj danas s novi život; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده دعوت الهی افکار و قدم‌هایت را هدایت کند.",
    "en": "Let divine calling guide your thoughts and steps today.",
    "hr": "Neka božanski poziv danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در صداقت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in honesty.",
    "hr": "Drži danas pogled na Kristu i rasti u iskrenost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و خانواده خدا را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate God’s family in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj Božja obitelj u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در پرستش پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in worship.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u slavljenje."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ اتحاد در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; unity will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; jedinstvo će donijeti plod u tebi."
  },
  {
    "fa": "امروز با صبر قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in patience; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u strpljenje; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در شفا استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in healing; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u iscjeljenje; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در مسح بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in anointing; the presence of God strengthens you.",
    "hr": "Stoj danas u pomazanje; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با پادشاهی خدا سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with the Kingdom of God; the grace of God is with you.",
    "hr": "Govori i djeluj danas s Božje Kraljevstvo; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده ایمان افکار و قدم‌هایت را هدایت کند.",
    "en": "Let faith guide your thoughts and steps today.",
    "hr": "Neka vjera danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در امید رشد کن.",
    "en": "Keep your eyes on Christ today and grow in hope.",
    "hr": "Drži danas pogled na Kristu i rasti u nada."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و محبت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate love in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj ljubav u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در آرامش پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in peace.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u mir."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ حکمت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; wisdom will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; mudrost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با قدرت روح‌القدس قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in the power of the Holy Spirit; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u sila Duha Svetoga; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در شکرگزاری استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in thanksgiving; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u zahvalnost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در کلام خدا بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in the Word of God; the presence of God strengthens you.",
    "hr": "Stoj danas u Božja riječ; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با فیض سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with grace; the grace of God is with you.",
    "hr": "Govori i djeluj danas s milost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده هدایت خدا افکار و قدم‌هایت را هدایت کند.",
    "en": "Let God’s guidance guide your thoughts and steps today.",
    "hr": "Neka Božje vodstvo danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در پیروزی رشد کن.",
    "en": "Keep your eyes on Christ today and grow in victory.",
    "hr": "Drži danas pogled na Kristu i rasti u pobjeda."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و نور مسیح را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate the light of Christ in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj Kristovo svjetlo u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در دعا پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in prayer.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u molitva."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ برکت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; blessing will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; blagoslov će donijeti plod u tebi."
  },
  {
    "fa": "امروز با رشد روحانی قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in spiritual growth; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u duhovni rast; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در استقامت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in perseverance; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u ustrajnost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در شجاعت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in courage; the presence of God strengthens you.",
    "hr": "Stoj danas u hrabrost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با اطمینان سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with confidence; the grace of God is with you.",
    "hr": "Govori i djeluj danas s pouzdanje; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده قدوسیت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let holiness guide your thoughts and steps today.",
    "hr": "Neka svetost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در خدمت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in service.",
    "hr": "Drži danas pogled na Kristu i rasti u služenje."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و حضور خدا را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate God’s presence in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj Božja prisutnost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در نجات پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in salvation.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u spasenje."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ عدالت خدا در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; God’s righteousness will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; Božja pravednost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با وفاداری قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in faithfulness; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u vjernost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در رحمت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in mercy; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u milosrđe; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در تسلی بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in comfort; the presence of God strengthens you.",
    "hr": "Stoj danas u utjeha; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با حقیقت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with truth; the grace of God is with you.",
    "hr": "Govori i djeluj danas s istina; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده اعلان ایمان افکار و قدم‌هایت را هدایت کند.",
    "en": "Let confession of faith guide your thoughts and steps today.",
    "hr": "Neka ispovijed vjere danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در رهایی رشد کن.",
    "en": "Keep your eyes on Christ today and grow in deliverance.",
    "hr": "Drži danas pogled na Kristu i rasti u oslobođenje."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و ثمره روح را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate the fruit of the Spirit in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj plod Duha u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در زندگی تازه پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in new life.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u novi život."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ دعوت الهی در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; divine calling will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; božanski poziv će donijeti plod u tebi."
  },
  {
    "fa": "امروز با صداقت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in honesty; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u iskrenost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در خانواده خدا استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in God’s family; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u Božja obitelj; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در پرستش بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in worship; the presence of God strengthens you.",
    "hr": "Stoj danas u slavljenje; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با اتحاد سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with unity; the grace of God is with you.",
    "hr": "Govori i djeluj danas s jedinstvo; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده صبر افکار و قدم‌هایت را هدایت کند.",
    "en": "Let patience guide your thoughts and steps today.",
    "hr": "Neka strpljenje danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در شفا رشد کن.",
    "en": "Keep your eyes on Christ today and grow in healing.",
    "hr": "Drži danas pogled na Kristu i rasti u iscjeljenje."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و مسح را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate anointing in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj pomazanje u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در پادشاهی خدا پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in the Kingdom of God.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u Božje Kraljevstvo."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ ایمان در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; faith will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; vjera će donijeti plod u tebi."
  },
  {
    "fa": "امروز با امید قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in hope; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u nada; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در محبت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in love; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u ljubav; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در آرامش بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in peace; the presence of God strengthens you.",
    "hr": "Stoj danas u mir; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با حکمت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with wisdom; the grace of God is with you.",
    "hr": "Govori i djeluj danas s mudrost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده قدرت روح‌القدس افکار و قدم‌هایت را هدایت کند.",
    "en": "Let the power of the Holy Spirit guide your thoughts and steps today.",
    "hr": "Neka sila Duha Svetoga danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در شکرگزاری رشد کن.",
    "en": "Keep your eyes on Christ today and grow in thanksgiving.",
    "hr": "Drži danas pogled na Kristu i rasti u zahvalnost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و کلام خدا را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate the Word of God in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj Božja riječ u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در فیض پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in grace.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u milost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ هدایت خدا در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; God’s guidance will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; Božje vodstvo će donijeti plod u tebi."
  },
  {
    "fa": "امروز با پیروزی قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in victory; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u pobjeda; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در نور مسیح استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in the light of Christ; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u Kristovo svjetlo; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در دعا بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in prayer; the presence of God strengthens you.",
    "hr": "Stoj danas u molitva; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با برکت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with blessing; the grace of God is with you.",
    "hr": "Govori i djeluj danas s blagoslov; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده رشد روحانی افکار و قدم‌هایت را هدایت کند.",
    "en": "Let spiritual growth guide your thoughts and steps today.",
    "hr": "Neka duhovni rast danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در استقامت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in perseverance.",
    "hr": "Drži danas pogled na Kristu i rasti u ustrajnost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و شجاعت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate courage in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj hrabrost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در اطمینان پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in confidence.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u pouzdanje."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ قدوسیت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; holiness will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; svetost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با خدمت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in service; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u služenje; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در حضور خدا استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in God’s presence; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u Božja prisutnost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در نجات بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in salvation; the presence of God strengthens you.",
    "hr": "Stoj danas u spasenje; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با عدالت خدا سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with God’s righteousness; the grace of God is with you.",
    "hr": "Govori i djeluj danas s Božja pravednost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده وفاداری افکار و قدم‌هایت را هدایت کند.",
    "en": "Let faithfulness guide your thoughts and steps today.",
    "hr": "Neka vjernost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در رحمت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in mercy.",
    "hr": "Drži danas pogled na Kristu i rasti u milosrđe."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و تسلی را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate comfort in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj utjeha u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در حقیقت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in truth.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u istina."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ اعلان ایمان در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; confession of faith will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; ispovijed vjere će donijeti plod u tebi."
  },
  {
    "fa": "امروز با رهایی قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in deliverance; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u oslobođenje; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در ثمره روح استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in the fruit of the Spirit; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u plod Duha; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در زندگی تازه بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in new life; the presence of God strengthens you.",
    "hr": "Stoj danas u novi život; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با دعوت الهی سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with divine calling; the grace of God is with you.",
    "hr": "Govori i djeluj danas s božanski poziv; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده صداقت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let honesty guide your thoughts and steps today.",
    "hr": "Neka iskrenost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در خانواده خدا رشد کن.",
    "en": "Keep your eyes on Christ today and grow in God’s family.",
    "hr": "Drži danas pogled na Kristu i rasti u Božja obitelj."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و پرستش را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate worship in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj slavljenje u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در اتحاد پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in unity.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u jedinstvo."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ صبر در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; patience will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; strpljenje će donijeti plod u tebi."
  },
  {
    "fa": "امروز با شفا قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in healing; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u iscjeljenje; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در مسح استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in anointing; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u pomazanje; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در پادشاهی خدا بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in the Kingdom of God; the presence of God strengthens you.",
    "hr": "Stoj danas u Božje Kraljevstvo; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با ایمان سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with faith; the grace of God is with you.",
    "hr": "Govori i djeluj danas s vjera; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده امید افکار و قدم‌هایت را هدایت کند.",
    "en": "Let hope guide your thoughts and steps today.",
    "hr": "Neka nada danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در محبت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in love.",
    "hr": "Drži danas pogled na Kristu i rasti u ljubav."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و آرامش را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate peace in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj mir u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در حکمت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in wisdom.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u mudrost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ قدرت روح‌القدس در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; the power of the Holy Spirit will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; sila Duha Svetoga će donijeti plod u tebi."
  },
  {
    "fa": "امروز با شکرگزاری قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in thanksgiving; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u zahvalnost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در کلام خدا استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in the Word of God; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u Božja riječ; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در فیض بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in grace; the presence of God strengthens you.",
    "hr": "Stoj danas u milost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با هدایت خدا سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with God’s guidance; the grace of God is with you.",
    "hr": "Govori i djeluj danas s Božje vodstvo; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده پیروزی افکار و قدم‌هایت را هدایت کند.",
    "en": "Let victory guide your thoughts and steps today.",
    "hr": "Neka pobjeda danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در نور مسیح رشد کن.",
    "en": "Keep your eyes on Christ today and grow in the light of Christ.",
    "hr": "Drži danas pogled na Kristu i rasti u Kristovo svjetlo."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و دعا را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate prayer in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj molitva u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در برکت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in blessing.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u blagoslov."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ رشد روحانی در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; spiritual growth will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; duhovni rast će donijeti plod u tebi."
  },
  {
    "fa": "امروز با استقامت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in perseverance; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u ustrajnost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در شجاعت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in courage; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u hrabrost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در اطمینان بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in confidence; the presence of God strengthens you.",
    "hr": "Stoj danas u pouzdanje; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با قدوسیت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with holiness; the grace of God is with you.",
    "hr": "Govori i djeluj danas s svetost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده خدمت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let service guide your thoughts and steps today.",
    "hr": "Neka služenje danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در حضور خدا رشد کن.",
    "en": "Keep your eyes on Christ today and grow in God’s presence.",
    "hr": "Drži danas pogled na Kristu i rasti u Božja prisutnost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و نجات را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate salvation in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj spasenje u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در عدالت خدا پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in God’s righteousness.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u Božja pravednost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ وفاداری در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; faithfulness will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; vjernost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با رحمت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in mercy; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u milosrđe; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در تسلی استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in comfort; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u utjeha; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در حقیقت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in truth; the presence of God strengthens you.",
    "hr": "Stoj danas u istina; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با اعلان ایمان سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with confession of faith; the grace of God is with you.",
    "hr": "Govori i djeluj danas s ispovijed vjere; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده رهایی افکار و قدم‌هایت را هدایت کند.",
    "en": "Let deliverance guide your thoughts and steps today.",
    "hr": "Neka oslobođenje danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در ثمره روح رشد کن.",
    "en": "Keep your eyes on Christ today and grow in the fruit of the Spirit.",
    "hr": "Drži danas pogled na Kristu i rasti u plod Duha."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و زندگی تازه را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate new life in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj novi život u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در دعوت الهی پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in divine calling.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u božanski poziv."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ صداقت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; honesty will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; iskrenost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با خانواده خدا قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in God’s family; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u Božja obitelj; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در پرستش استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in worship; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u slavljenje; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در اتحاد بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in unity; the presence of God strengthens you.",
    "hr": "Stoj danas u jedinstvo; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با صبر سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with patience; the grace of God is with you.",
    "hr": "Govori i djeluj danas s strpljenje; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده شفا افکار و قدم‌هایت را هدایت کند.",
    "en": "Let healing guide your thoughts and steps today.",
    "hr": "Neka iscjeljenje danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در مسح رشد کن.",
    "en": "Keep your eyes on Christ today and grow in anointing.",
    "hr": "Drži danas pogled na Kristu i rasti u pomazanje."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و پادشاهی خدا را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate the Kingdom of God in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj Božje Kraljevstvo u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در ایمان پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in faith.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u vjera."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ امید در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; hope will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; nada će donijeti plod u tebi."
  },
  {
    "fa": "امروز با محبت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in love; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u ljubav; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در آرامش استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in peace; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u mir; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در حکمت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in wisdom; the presence of God strengthens you.",
    "hr": "Stoj danas u mudrost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با قدرت روح‌القدس سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with the power of the Holy Spirit; the grace of God is with you.",
    "hr": "Govori i djeluj danas s sila Duha Svetoga; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده شکرگزاری افکار و قدم‌هایت را هدایت کند.",
    "en": "Let thanksgiving guide your thoughts and steps today.",
    "hr": "Neka zahvalnost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در کلام خدا رشد کن.",
    "en": "Keep your eyes on Christ today and grow in the Word of God.",
    "hr": "Drži danas pogled na Kristu i rasti u Božja riječ."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و فیض را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate grace in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj milost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در هدایت خدا پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in God’s guidance.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u Božje vodstvo."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ پیروزی در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; victory will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; pobjeda će donijeti plod u tebi."
  },
  {
    "fa": "امروز با نور مسیح قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in the light of Christ; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u Kristovo svjetlo; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در دعا استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in prayer; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u molitva; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در برکت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in blessing; the presence of God strengthens you.",
    "hr": "Stoj danas u blagoslov; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با رشد روحانی سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with spiritual growth; the grace of God is with you.",
    "hr": "Govori i djeluj danas s duhovni rast; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده استقامت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let perseverance guide your thoughts and steps today.",
    "hr": "Neka ustrajnost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در شجاعت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in courage.",
    "hr": "Drži danas pogled na Kristu i rasti u hrabrost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و اطمینان را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate confidence in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj pouzdanje u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در قدوسیت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in holiness.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u svetost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ خدمت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; service will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; služenje će donijeti plod u tebi."
  },
  {
    "fa": "امروز با حضور خدا قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in God’s presence; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u Božja prisutnost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در نجات استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in salvation; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u spasenje; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در عدالت خدا بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in God’s righteousness; the presence of God strengthens you.",
    "hr": "Stoj danas u Božja pravednost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با وفاداری سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with faithfulness; the grace of God is with you.",
    "hr": "Govori i djeluj danas s vjernost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده رحمت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let mercy guide your thoughts and steps today.",
    "hr": "Neka milosrđe danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در تسلی رشد کن.",
    "en": "Keep your eyes on Christ today and grow in comfort.",
    "hr": "Drži danas pogled na Kristu i rasti u utjeha."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و حقیقت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate truth in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj istina u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در اعلان ایمان پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in confession of faith.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u ispovijed vjere."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ رهایی در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; deliverance will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; oslobođenje će donijeti plod u tebi."
  },
  {
    "fa": "امروز با ثمره روح قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in the fruit of the Spirit; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u plod Duha; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در زندگی تازه استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in new life; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u novi život; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در دعوت الهی بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in divine calling; the presence of God strengthens you.",
    "hr": "Stoj danas u božanski poziv; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با صداقت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with honesty; the grace of God is with you.",
    "hr": "Govori i djeluj danas s iskrenost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده خانواده خدا افکار و قدم‌هایت را هدایت کند.",
    "en": "Let God’s family guide your thoughts and steps today.",
    "hr": "Neka Božja obitelj danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در پرستش رشد کن.",
    "en": "Keep your eyes on Christ today and grow in worship.",
    "hr": "Drži danas pogled na Kristu i rasti u slavljenje."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و اتحاد را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate unity in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj jedinstvo u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در صبر پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in patience.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u strpljenje."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ شفا در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; healing will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; iscjeljenje će donijeti plod u tebi."
  },
  {
    "fa": "امروز با مسح قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in anointing; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u pomazanje; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در پادشاهی خدا استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in the Kingdom of God; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u Božje Kraljevstvo; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در ایمان بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in faith; the presence of God strengthens you.",
    "hr": "Stoj danas u vjera; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با امید سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with hope; the grace of God is with you.",
    "hr": "Govori i djeluj danas s nada; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده محبت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let love guide your thoughts and steps today.",
    "hr": "Neka ljubav danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در آرامش رشد کن.",
    "en": "Keep your eyes on Christ today and grow in peace.",
    "hr": "Drži danas pogled na Kristu i rasti u mir."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و حکمت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate wisdom in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj mudrost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در قدرت روح‌القدس پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in the power of the Holy Spirit.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u sila Duha Svetoga."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ شکرگزاری در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; thanksgiving will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; zahvalnost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با کلام خدا قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in the Word of God; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u Božja riječ; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در فیض استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in grace; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u milost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در هدایت خدا بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in God’s guidance; the presence of God strengthens you.",
    "hr": "Stoj danas u Božje vodstvo; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با پیروزی سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with victory; the grace of God is with you.",
    "hr": "Govori i djeluj danas s pobjeda; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده نور مسیح افکار و قدم‌هایت را هدایت کند.",
    "en": "Let the light of Christ guide your thoughts and steps today.",
    "hr": "Neka Kristovo svjetlo danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در دعا رشد کن.",
    "en": "Keep your eyes on Christ today and grow in prayer.",
    "hr": "Drži danas pogled na Kristu i rasti u molitva."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و برکت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate blessing in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj blagoslov u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در رشد روحانی پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in spiritual growth.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u duhovni rast."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ استقامت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; perseverance will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; ustrajnost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با شجاعت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in courage; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u hrabrost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در اطمینان استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in confidence; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u pouzdanje; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در قدوسیت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in holiness; the presence of God strengthens you.",
    "hr": "Stoj danas u svetost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با خدمت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with service; the grace of God is with you.",
    "hr": "Govori i djeluj danas s služenje; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده حضور خدا افکار و قدم‌هایت را هدایت کند.",
    "en": "Let God’s presence guide your thoughts and steps today.",
    "hr": "Neka Božja prisutnost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در نجات رشد کن.",
    "en": "Keep your eyes on Christ today and grow in salvation.",
    "hr": "Drži danas pogled na Kristu i rasti u spasenje."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و عدالت خدا را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate God’s righteousness in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj Božja pravednost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در وفاداری پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in faithfulness.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u vjernost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ رحمت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; mercy will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; milosrđe će donijeti plod u tebi."
  },
  {
    "fa": "امروز با تسلی قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in comfort; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u utjeha; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در حقیقت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in truth; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u istina; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در اعلان ایمان بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in confession of faith; the presence of God strengthens you.",
    "hr": "Stoj danas u ispovijed vjere; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با رهایی سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with deliverance; the grace of God is with you.",
    "hr": "Govori i djeluj danas s oslobođenje; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده ثمره روح افکار و قدم‌هایت را هدایت کند.",
    "en": "Let the fruit of the Spirit guide your thoughts and steps today.",
    "hr": "Neka plod Duha danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در زندگی تازه رشد کن.",
    "en": "Keep your eyes on Christ today and grow in new life.",
    "hr": "Drži danas pogled na Kristu i rasti u novi život."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و دعوت الهی را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate divine calling in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj božanski poziv u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در صداقت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in honesty.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u iskrenost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ خانواده خدا در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; God’s family will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; Božja obitelj će donijeti plod u tebi."
  },
  {
    "fa": "امروز با پرستش قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in worship; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u slavljenje; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در اتحاد استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in unity; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u jedinstvo; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در صبر بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in patience; the presence of God strengthens you.",
    "hr": "Stoj danas u strpljenje; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با شفا سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with healing; the grace of God is with you.",
    "hr": "Govori i djeluj danas s iscjeljenje; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده مسح افکار و قدم‌هایت را هدایت کند.",
    "en": "Let anointing guide your thoughts and steps today.",
    "hr": "Neka pomazanje danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در پادشاهی خدا رشد کن.",
    "en": "Keep your eyes on Christ today and grow in the Kingdom of God.",
    "hr": "Drži danas pogled na Kristu i rasti u Božje Kraljevstvo."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و ایمان را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate faith in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj vjera u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در امید پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in hope.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u nada."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ محبت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; love will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; ljubav će donijeti plod u tebi."
  },
  {
    "fa": "امروز با آرامش قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in peace; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u mir; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در حکمت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in wisdom; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u mudrost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در قدرت روح‌القدس بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in the power of the Holy Spirit; the presence of God strengthens you.",
    "hr": "Stoj danas u sila Duha Svetoga; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با شکرگزاری سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with thanksgiving; the grace of God is with you.",
    "hr": "Govori i djeluj danas s zahvalnost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده کلام خدا افکار و قدم‌هایت را هدایت کند.",
    "en": "Let the Word of God guide your thoughts and steps today.",
    "hr": "Neka Božja riječ danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در فیض رشد کن.",
    "en": "Keep your eyes on Christ today and grow in grace.",
    "hr": "Drži danas pogled na Kristu i rasti u milost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و هدایت خدا را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate God’s guidance in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj Božje vodstvo u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در پیروزی پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in victory.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u pobjeda."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ نور مسیح در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; the light of Christ will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; Kristovo svjetlo će donijeti plod u tebi."
  },
  {
    "fa": "امروز با دعا قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in prayer; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u molitva; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در برکت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in blessing; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u blagoslov; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در رشد روحانی بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in spiritual growth; the presence of God strengthens you.",
    "hr": "Stoj danas u duhovni rast; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با استقامت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with perseverance; the grace of God is with you.",
    "hr": "Govori i djeluj danas s ustrajnost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده شجاعت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let courage guide your thoughts and steps today.",
    "hr": "Neka hrabrost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در اطمینان رشد کن.",
    "en": "Keep your eyes on Christ today and grow in confidence.",
    "hr": "Drži danas pogled na Kristu i rasti u pouzdanje."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و قدوسیت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate holiness in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj svetost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در خدمت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in service.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u služenje."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ حضور خدا در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; God’s presence will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; Božja prisutnost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با نجات قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in salvation; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u spasenje; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در عدالت خدا استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in God’s righteousness; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u Božja pravednost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در وفاداری بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in faithfulness; the presence of God strengthens you.",
    "hr": "Stoj danas u vjernost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با رحمت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with mercy; the grace of God is with you.",
    "hr": "Govori i djeluj danas s milosrđe; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده تسلی افکار و قدم‌هایت را هدایت کند.",
    "en": "Let comfort guide your thoughts and steps today.",
    "hr": "Neka utjeha danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در حقیقت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in truth.",
    "hr": "Drži danas pogled na Kristu i rasti u istina."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و اعلان ایمان را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate confession of faith in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj ispovijed vjere u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در رهایی پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in deliverance.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u oslobođenje."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ ثمره روح در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; the fruit of the Spirit will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; plod Duha će donijeti plod u tebi."
  },
  {
    "fa": "امروز با زندگی تازه قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in new life; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u novi život; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در دعوت الهی استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in divine calling; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u božanski poziv; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در صداقت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in honesty; the presence of God strengthens you.",
    "hr": "Stoj danas u iskrenost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با خانواده خدا سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with God’s family; the grace of God is with you.",
    "hr": "Govori i djeluj danas s Božja obitelj; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده پرستش افکار و قدم‌هایت را هدایت کند.",
    "en": "Let worship guide your thoughts and steps today.",
    "hr": "Neka slavljenje danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در اتحاد رشد کن.",
    "en": "Keep your eyes on Christ today and grow in unity.",
    "hr": "Drži danas pogled na Kristu i rasti u jedinstvo."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و صبر را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate patience in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj strpljenje u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در شفا پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in healing.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u iscjeljenje."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ مسح در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; anointing will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; pomazanje će donijeti plod u tebi."
  },
  {
    "fa": "امروز با پادشاهی خدا قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in the Kingdom of God; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u Božje Kraljevstvo; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در ایمان استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in faith; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u vjera; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در امید بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in hope; the presence of God strengthens you.",
    "hr": "Stoj danas u nada; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با محبت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with love; the grace of God is with you.",
    "hr": "Govori i djeluj danas s ljubav; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده آرامش افکار و قدم‌هایت را هدایت کند.",
    "en": "Let peace guide your thoughts and steps today.",
    "hr": "Neka mir danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در حکمت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in wisdom.",
    "hr": "Drži danas pogled na Kristu i rasti u mudrost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و قدرت روح‌القدس را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate the power of the Holy Spirit in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj sila Duha Svetoga u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در شکرگزاری پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in thanksgiving.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u zahvalnost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ کلام خدا در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; the Word of God will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; Božja riječ će donijeti plod u tebi."
  },
  {
    "fa": "امروز با فیض قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in grace; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u milost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در هدایت خدا استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in God’s guidance; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u Božje vodstvo; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در پیروزی بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in victory; the presence of God strengthens you.",
    "hr": "Stoj danas u pobjeda; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با نور مسیح سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with the light of Christ; the grace of God is with you.",
    "hr": "Govori i djeluj danas s Kristovo svjetlo; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده دعا افکار و قدم‌هایت را هدایت کند.",
    "en": "Let prayer guide your thoughts and steps today.",
    "hr": "Neka molitva danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در برکت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in blessing.",
    "hr": "Drži danas pogled na Kristu i rasti u blagoslov."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و رشد روحانی را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate spiritual growth in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj duhovni rast u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در استقامت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in perseverance.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u ustrajnost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ شجاعت در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; courage will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; hrabrost će donijeti plod u tebi."
  },
  {
    "fa": "امروز با اطمینان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in confidence; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u pouzdanje; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در قدوسیت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in holiness; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u svetost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در خدمت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in service; the presence of God strengthens you.",
    "hr": "Stoj danas u služenje; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با حضور خدا سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with God’s presence; the grace of God is with you.",
    "hr": "Govori i djeluj danas s Božja prisutnost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده نجات افکار و قدم‌هایت را هدایت کند.",
    "en": "Let salvation guide your thoughts and steps today.",
    "hr": "Neka spasenje danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در عدالت خدا رشد کن.",
    "en": "Keep your eyes on Christ today and grow in God’s righteousness.",
    "hr": "Drži danas pogled na Kristu i rasti u Božja pravednost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و وفاداری را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate faithfulness in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj vjernost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در رحمت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in mercy.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u milosrđe."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ تسلی در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; comfort will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; utjeha će donijeti plod u tebi."
  },
  {
    "fa": "امروز با حقیقت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in truth; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u istina; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در اعلان ایمان استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in confession of faith; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u ispovijed vjere; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در رهایی بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in deliverance; the presence of God strengthens you.",
    "hr": "Stoj danas u oslobođenje; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با ثمره روح سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with the fruit of the Spirit; the grace of God is with you.",
    "hr": "Govori i djeluj danas s plod Duha; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده زندگی تازه افکار و قدم‌هایت را هدایت کند.",
    "en": "Let new life guide your thoughts and steps today.",
    "hr": "Neka novi život danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در دعوت الهی رشد کن.",
    "en": "Keep your eyes on Christ today and grow in divine calling.",
    "hr": "Drži danas pogled na Kristu i rasti u božanski poziv."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و صداقت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate honesty in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj iskrenost u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در خانواده خدا پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in God’s family.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u Božja obitelj."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ پرستش در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; worship will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; slavljenje će donijeti plod u tebi."
  },
  {
    "fa": "امروز با اتحاد قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in unity; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u jedinstvo; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در صبر استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in patience; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u strpljenje; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در شفا بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in healing; the presence of God strengthens you.",
    "hr": "Stoj danas u iscjeljenje; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با مسح سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with anointing; the grace of God is with you.",
    "hr": "Govori i djeluj danas s pomazanje; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده پادشاهی خدا افکار و قدم‌هایت را هدایت کند.",
    "en": "Let the Kingdom of God guide your thoughts and steps today.",
    "hr": "Neka Božje Kraljevstvo danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در ایمان رشد کن.",
    "en": "Keep your eyes on Christ today and grow in faith.",
    "hr": "Drži danas pogled na Kristu i rasti u vjera."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و امید را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate hope in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj nada u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در محبت پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in love.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u ljubav."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ آرامش در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; peace will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; mir će donijeti plod u tebi."
  },
  {
    "fa": "امروز با حکمت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in wisdom; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u mudrost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در قدرت روح‌القدس استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in the power of the Holy Spirit; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u sila Duha Svetoga; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در شکرگزاری بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in thanksgiving; the presence of God strengthens you.",
    "hr": "Stoj danas u zahvalnost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با کلام خدا سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with the Word of God; the grace of God is with you.",
    "hr": "Govori i djeluj danas s Božja riječ; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده فیض افکار و قدم‌هایت را هدایت کند.",
    "en": "Let grace guide your thoughts and steps today.",
    "hr": "Neka milost danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در هدایت خدا رشد کن.",
    "en": "Keep your eyes on Christ today and grow in God’s guidance.",
    "hr": "Drži danas pogled na Kristu i rasti u Božje vodstvo."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و پیروزی را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate victory in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj pobjeda u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در نور مسیح پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in the light of Christ.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u Kristovo svjetlo."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ دعا در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; prayer will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; molitva će donijeti plod u tebi."
  },
  {
    "fa": "امروز با برکت قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in blessing; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u blagoslov; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در رشد روحانی استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in spiritual growth; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u duhovni rast; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در استقامت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in perseverance; the presence of God strengthens you.",
    "hr": "Stoj danas u ustrajnost; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با شجاعت سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with courage; the grace of God is with you.",
    "hr": "Govori i djeluj danas s hrabrost; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده اطمینان افکار و قدم‌هایت را هدایت کند.",
    "en": "Let confidence guide your thoughts and steps today.",
    "hr": "Neka pouzdanje danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در قدوسیت رشد کن.",
    "en": "Keep your eyes on Christ today and grow in holiness.",
    "hr": "Drži danas pogled na Kristu i rasti u svetost."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و خدمت را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate service in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj služenje u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در حضور خدا پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in God’s presence.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u Božja prisutnost."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ نجات در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; salvation will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; spasenje će donijeti plod u tebi."
  },
  {
    "fa": "امروز با عدالت خدا قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in God’s righteousness; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u Božja pravednost; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در وفاداری استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in faithfulness; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u vjernost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در رحمت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in mercy; the presence of God strengthens you.",
    "hr": "Stoj danas u milosrđe; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با تسلی سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with comfort; the grace of God is with you.",
    "hr": "Govori i djeluj danas s utjeha; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده حقیقت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let truth guide your thoughts and steps today.",
    "hr": "Neka istina danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در اعلان ایمان رشد کن.",
    "en": "Keep your eyes on Christ today and grow in confession of faith.",
    "hr": "Drži danas pogled na Kristu i rasti u ispovijed vjere."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و رهایی را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate deliverance in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj oslobođenje u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در ثمره روح پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in the fruit of the Spirit.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u plod Duha."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ زندگی تازه در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; new life will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; novi život će donijeti plod u tebi."
  },
  {
    "fa": "امروز با دعوت الهی قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in divine calling; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u božanski poziv; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در صداقت استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in honesty; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u iskrenost; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در خانواده خدا بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in God’s family; the presence of God strengthens you.",
    "hr": "Stoj danas u Božja obitelj; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با پرستش سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with worship; the grace of God is with you.",
    "hr": "Govori i djeluj danas s slavljenje; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده اتحاد افکار و قدم‌هایت را هدایت کند.",
    "en": "Let unity guide your thoughts and steps today.",
    "hr": "Neka jedinstvo danas vodi tvoje misli i korake."
  },
  {
    "fa": "امروز نگاهت را بر مسیح ثابت نگه دار و در صبر رشد کن.",
    "en": "Keep your eyes on Christ today and grow in patience.",
    "hr": "Drži danas pogled na Kristu i rasti u strpljenje."
  },
  {
    "fa": "امروز با شکرگزاری شروع کن و شفا را در زندگی‌ات فعال کن.",
    "en": "Start today with thanksgiving and activate healing in your life.",
    "hr": "Započni dan zahvalnošću i aktiviraj iscjeljenje u svom životu."
  },
  {
    "fa": "امروز بدان که خدا تو را فراموش نکرده است؛ در مسح پیش برو.",
    "en": "Know today that God has not forgotten you; move forward in anointing.",
    "hr": "Znaj danas da te Bog nije zaboravio; idi naprijed u pomazanje."
  },
  {
    "fa": "امروز با دلی مطمئن حرکت کن؛ پادشاهی خدا در تو ثمر خواهد داد.",
    "en": "Move today with a confident heart; the Kingdom of God will bear fruit in you.",
    "hr": "Kreni danas s pouzdanim srcem; Božje Kraljevstvo će donijeti plod u tebi."
  },
  {
    "fa": "امروز با ایمان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.",
    "en": "Walk today in faith; the Lord is with you, and His Word lights your path.",
    "hr": "Hodaj danas u vjera; Gospodin je s tobom i Njegova riječ osvjetljava tvoj put."
  },
  {
    "fa": "امروز قلبت را در امید استوار کن؛ خدا برای تو راهی تازه باز می‌کند.",
    "en": "Establish your heart today in hope; God is opening a fresh way for you.",
    "hr": "Učvrsti danas svoje srce u nada; Bog otvara novi put za tebe."
  },
  {
    "fa": "امروز در محبت بایست؛ حضور خدا تو را تقویت می‌کند.",
    "en": "Stand today in love; the presence of God strengthens you.",
    "hr": "Stoj danas u ljubav; Božja prisutnost te jača."
  },
  {
    "fa": "امروز با آرامش سخن بگو و عمل کن؛ فیض خدا همراه توست.",
    "en": "Speak and act today with peace; the grace of God is with you.",
    "hr": "Govori i djeluj danas s mir; Božja milost je s tobom."
  },
  {
    "fa": "امروز اجازه بده حکمت افکار و قدم‌هایت را هدایت کند.",
    "en": "Let wisdom guide your thoughts and steps today.",
    "hr": "Neka mudrost danas vodi tvoje misli i korake."
  }
];
  var APPLY_LOCK=false;
  var LAST_LANG='';
  var LAST_MESSAGE='';

  var ORIGINAL_PATTERNS=[
    /امروز با ایمان قدم بردار/i,
    /خداوند با توست/i,
    /کلام.*مسیرت.*روشن/i,
    /Walk by faith/i,
    /His Word lights your path/i,
    /Hodaj.*vjeri/i,
    /Njegova riječ.*put/i
  ];

  var BIRTHDAY_MESSAGE={
    fa:'امروز روز تولد توست. خداوند تو را با هدفی الهی آفریده است. سال جدید زندگی‌ات پر از فیض، حکمت، سلامتی و رشد روحانی باشد.',
    en:'Today is your birthday. God created you with a divine purpose. May this new year of your life be filled with grace, wisdom, health, and spiritual growth.',
    hr:'Danas je tvoj rođendan. Bog te stvorio s božanskom svrhom. Neka ova nova godina tvog života bude ispunjena milošću, mudrošću, zdravljem i duhovnim rastom.'
  };
  var SALVATION_ANNIVERSARY_MESSAGE={
    fa:'امروز سالگرد ایمان‌آوری توست. در چنین روزی خداوند تو را به سوی خود خواند و زندگی تازه‌ای در مسیح به تو بخشید. این روز را با شکرگزاری جشن بگیر؛ تو فرزند خدا هستی و در مسیح زندگی تازه داری.',
    en:'Today is your salvation anniversary. On this day, the Lord called you to Himself and gave you new life in Christ. Celebrate this day with thanksgiving; you are a child of God and you have new life in Christ.',
    hr:'Danas je godišnjica tvog spasenja. Na ovaj dan Gospodin te pozvao k sebi i dao ti novi život u Kristu. Proslavi ovaj dan sa zahvalnošću; ti si Božje dijete i imaš novi život u Kristu.'
  };

  function clean(t){ return String(t||'').replace(/\s+/g,' ').trim(); }
  function getLang(){
    var v='';
    try{ v=(localStorage.getItem('lang')||localStorage.getItem('omideno7_lang')||document.documentElement.lang||navigator.language||'fa').toLowerCase(); }catch(e){}
    if(v.indexOf('en')===0) return 'en';
    if(v.indexOf('hr')===0 || v.indexOf('cro')>-1 || v.indexOf('hrv')>-1) return 'hr';
    return 'fa';
  }
  function pad(n){return String(n).padStart(2,'0');}
  function key(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
  function mmdd(d){return pad(d.getMonth()+1)+'-'+pad(d.getDate());}
  function dayOfYear(d){return Math.floor((new Date(d.getFullYear(),d.getMonth(),d.getDate())-new Date(d.getFullYear(),0,0))/86400000);}
  function parseDate(value){
    if(!value) return null;
    var s=String(value).trim();
    var m=s.match(/(\d{4})[-\/\.](\d{1,2})[-\/\.](\d{1,2})/);
    if(m) return new Date(+m[1],+m[2]-1,+m[3]);
    m=s.match(/(\d{1,2})[-\/\.](\d{1,2})[-\/\.](\d{4})/);
    if(m) return new Date(+m[3],+m[2]-1,+m[1]);
    var d=new Date(s);
    return isNaN(d.getTime())?null:d;
  }
  function sameMonthDay(a,b){return !!(a&&b&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate());}
  function stored(keys){
    try{
      for(var i=0;i<keys.length;i++){var v=localStorage.getItem(keys[i]); if(v) return v;}
      for(var k in localStorage){
        if(!Object.prototype.hasOwnProperty.call(localStorage,k)) continue;
        var raw=localStorage.getItem(k); if(!raw) continue;
        if(raw.charAt(0)==='{'){
          try{var o=JSON.parse(raw); for(var z=0;z<keys.length;z++) if(o&&o[keys[z]]) return o[keys[z]];}catch(e){}
        }
      }
    }catch(e){}
    return '';
  }
  function chosenMessage(){
    var l=getLang(), today=new Date(), birth=parseDate(stored(['birthDate','dateOfBirth','birthday','dob'])), salvation=parseDate(stored(['salvationDate','savedDate','faithDate','conversionDate']));
    if(sameMonthDay(salvation,today)) return {type:'salvation',text:SALVATION_ANNIVERSARY_MESSAGE[l]||SALVATION_ANNIVERSARY_MESSAGE.fa};
    if(sameMonthDay(birth,today)) return {type:'birthday',text:BIRTHDAY_MESSAGE[l]||BIRTHDAY_MESSAGE.fa};
    var idx=(dayOfYear(today)-1)%DAILY_HOME_MESSAGES.length;
    return {type:'daily',text:DAILY_HOME_MESSAGES[idx][l]||DAILY_HOME_MESSAGES[idx].fa};
  }
  function isOriginalOrOldDailyText(t){
    t=clean(t);
    if(!t || t.length>260) return false;
    if(t===LAST_MESSAGE) return true;
    return ORIGINAL_PATTERNS.some(function(re){return re.test(t);});
  }
  function findTargets(){
    var out=[];
    var home=document.getElementById('home') || document.querySelector('section#home,.page#home,.page.active');
    var scope=home || document;
    scope.querySelectorAll('p,div,span').forEach(function(el){
      if(el.querySelector('button,a,input,select,textarea')) return;
      var t=clean(el.textContent);
      if(isOriginalOrOldDailyText(t)) out.push(el);
    });
    return out;
  }
  function injectCss(){
    if(document.getElementById('omideno7DailyStableCss')) return;
    var st=document.createElement('style');
    st.id='omideno7DailyStableCss';
    st.textContent='.omideno7-daily-message-text{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text","Segoe UI",Tahoma,Arial,sans-serif!important;font-weight:750!important;line-height:1.85!important;color:#0f1f3d!important}html[lang="fa"] .omideno7-daily-message-text,[dir="rtl"] .omideno7-daily-message-text{font-family:"Vazirmatn","IRANSans",Tahoma,"Segoe UI",Arial,sans-serif!important}.omideno7-confetti-piece{position:fixed;top:-20px;z-index:999999;pointer-events:none;animation:omideno7ConfettiFall 4.2s linear forwards}@keyframes omideno7ConfettiFall{0%{transform:translateY(-20px) rotate(0deg);opacity:0}10%{opacity:1}100%{transform:translateY(105vh) rotate(540deg);opacity:0}}';
    document.head.appendChild(st);
  }
  function celebrate(kind){
    try{var k='omideno7_celebrated_'+kind+'_'+key(new Date()); if(sessionStorage.getItem(k)) return; sessionStorage.setItem(k,'1');}catch(e){}
    var items=kind==='salvation'?['✨','🌟','💛','🕊️','🌿']:['🌸','✨','🎉','💛','🌷'];
    for(var i=0;i<24;i++){
      setTimeout(function(){
        var s=document.createElement('span');
        s.className='omideno7-confetti-piece';
        s.textContent=items[Math.floor(Math.random()*items.length)];
        s.style.left=Math.floor(Math.random()*96)+'vw';
        s.style.fontSize=(15+Math.random()*12)+'px';
        document.body.appendChild(s);
        setTimeout(function(){try{s.remove();}catch(e){}},6000);
      },i*90);
    }
  }
  function apply(){
    if(APPLY_LOCK) return;
    APPLY_LOCK=true;
    try{
      injectCss();
      var picked=chosenMessage();
      LAST_LANG=getLang();
      LAST_MESSAGE=picked.text;
      var targets=findTargets();
      targets.forEach(function(el){
        if(clean(el.textContent)!==picked.text){
          el.textContent=picked.text;
        }
        el.classList.add('omideno7-daily-message-text');
        el.setAttribute('data-omideno7-daily-message','1');
      });
      if(picked.type==='birthday'||picked.type==='salvation') celebrate(picked.type);
    }finally{
      setTimeout(function(){APPLY_LOCK=false;},60);
    }
  }

  function schedule(){
    [250,700,1400,2600,4200].forEach(function(ms){setTimeout(apply,ms);});
  }

  document.addEventListener('DOMContentLoaded',schedule);
  window.addEventListener('load',schedule);
  document.addEventListener('click',function(){setTimeout(apply,180);},true);

  var observerStarted=false;
  function startObserver(){
    if(observerStarted || !document.body) return;
    observerStarted=true;
    var obs=new MutationObserver(function(){
      var l=getLang();
      if(l!==LAST_LANG || findTargets().some(function(el){return clean(el.textContent)!==LAST_MESSAGE;})){
        setTimeout(apply,120);
      }
    });
    obs.observe(document.body,{childList:true,subtree:true,characterData:true});
  }
  setTimeout(startObserver,1000);
  setInterval(function(){ if(getLang()!==LAST_LANG) apply(); },1500);

  window.OMIDENO7_DAILY_MESSAGE={version:VERSION,refresh:apply,messages:DAILY_HOME_MESSAGES};
})();
