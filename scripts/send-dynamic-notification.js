const fs = require("fs");
const path = require("path");
const vm = require("vm");

const APP_URL = "https://omideno7.github.io/omideno7-app/";
const APP_VERSION = "45-audio-collapse-notifications-1";
const TYPE = process.env.NOTIFICATION_TYPE || process.argv[2] || "daily-word";
const ONE_SIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONE_SIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

if (!ONE_SIGNAL_APP_ID || !ONE_SIGNAL_REST_API_KEY) {
  console.error("Missing ONESIGNAL_APP_ID or ONESIGNAL_REST_API_KEY.");
  process.exit(1);
}

const LANGS = ["fa", "en", "hr"];

function loadWindowData(filename, property) {
  const full = path.join(process.cwd(), filename);
  const code = fs.readFileSync(full, "utf8");
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename });
  if (!sandbox.window[property]) throw new Error(`Could not load window.${property} from ${filename}`);
  return sandbox.window[property];
}

function zagrebParts() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Zagreb",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const get = t => Number(parts.find(p => p.type === t).value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

function daysInZagrebMonth() {
  const { year, month } = zagrebParts();
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function monthDay() {
  const { day } = zagrebParts();
  return Math.min(day, daysInZagrebMonth());
}

function text(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en || obj.fa || obj.hr || "";
}

function shortText(value, max = 130) {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : clean.slice(0, max - 1).trim() + "…";
}

function pickByMonthDay(list) {
  const day = monthDay();
  return list[day - 1] || list[(day - 1) % list.length] || list[0];
}

const declarations31 = [
  {fa:["پیروزی در مسیح","من از خدا مولود شده‌ام و ایمان من بر دنیا غلبه می‌کند. امروز با نگاه پیروزی زندگی می‌کنم."],en:["Victory in Christ","I am born of God and my faith overcomes the world. Today I live with the mindset of victory."],hr:["Pobjeda u Kristu","Rođen sam od Boga i moja vjera pobjeđuje svijet. Danas živim s pogledom pobjede."]},
  {fa:["سلامتی و قوت","حیات مسیح در من عمل می‌کند. بدن من جایگاه روح‌القدس است و قوت خدا در من جاری است."],en:["Health and Strength","The life of Christ works in me. My body is the temple of the Holy Spirit and God’s strength flows in me."],hr:["Zdravlje i snaga","Kristov život djeluje u meni. Moje tijelo je hram Duha Svetoga i Božja snaga teče u meni."]},
  {fa:["رفاه مالی و برکت","خدا منبع تأمین من است. فیض او در زندگی من فراوان است و من برای هر کار نیکو افزونی دارم."],en:["Financial Blessing","God is my source of supply. His grace abounds in my life and I have abundance for every good work."],hr:["Financijski blagoslov","Bog je izvor moje opskrbe. Njegova milost obiluje u mom životu za svako dobro djelo."]},
  {fa:["هدایت روح‌القدس","من فرزند خدا هستم و توسط روح خدا هدایت می‌شوم. قدم‌های من در مسیر اراده خداوند است."],en:["Guidance of the Holy Spirit","I am a child of God and I am led by the Spirit of God. My steps are in the will of the Lord."],hr:["Vodstvo Duha Svetoga","Božje sam dijete i vodi me Duh Božji. Moji su koraci u Gospodinovoj volji."]},
  {fa:["ایمان قوی","ایمان من از شنیدن کلام خدا رشد می‌کند. امروز با یقین و قوت ایمان سخن می‌گویم."],en:["Strong Faith","My faith grows by hearing the Word of God. Today I speak with confidence and strength of faith."],hr:["Snažna vjera","Moja vjera raste slušanjem Božje riječi. Danas govorim sigurnošću i snagom vjere."]},
  {fa:["خانواده","صلح، محبت، نجات، شفا و حکمت خدا بر خانه من جاری است."],en:["Family","God’s peace, love, salvation, healing, and wisdom flow in my home."],hr:["Obitelj","Božji mir, ljubav, spasenje, iscjeljenje i mudrost teku u mom domu."]},
  {fa:["صلح و شادی","صلح خدا نگهبان قلب و فکر من است. شادی خداوند قوت من است."],en:["Peace and Joy","The peace of God guards my heart and mind. The joy of the Lord is my strength."],hr:["Mir i radost","Božji mir čuva moje srce i um. Gospodinova radost moja je snaga."]},
  {fa:["حکمت الهی","حکمت خدا در من عمل می‌کند و تصمیم‌های من با نور کلام هدایت می‌شود."],en:["Divine Wisdom","God’s wisdom works in me and my decisions are guided by the light of His Word."],hr:["Božanska mudrost","Božja mudrost djeluje u meni i moje odluke vodi svjetlo Njegove riječi."]},
  {fa:["محبت خدا","محبت خدا در قلب من ریخته شده و من با محبت سخن می‌گویم و رفتار می‌کنم."],en:["God’s Love","God’s love has been poured into my heart; I speak and act in love."],hr:["Božja ljubav","Božja ljubav izlivena je u moje srce; govorim i djelujem u ljubavi."]},
  {fa:["رشد روحانی","من در فیض و شناخت خداوند رشد می‌کنم و هر روز در کلام و دعا پیشرفت می‌کنم."],en:["Spiritual Growth","I grow in grace and in the knowledge of the Lord, progressing daily in the Word and prayer."],hr:["Duhovni rast","Rastem u milosti i spoznaji Gospodina, napredujući svakodnevno u Riječi i molitvi."]},
  {fa:["حفاظت الهی","خداوند پناهگاه و قلعه من است و من زیر سایه قادر مطلق ساکن هستم."],en:["Divine Protection","The Lord is my refuge and fortress; I dwell under the shadow of the Almighty."],hr:["Božanska zaštita","Gospodin je moje utočište i tvrđava; prebivam pod sjenom Svemogućega."]},
  {fa:["ذهن تازه","فکر من با کلام خدا تازه می‌شود و من با حقیقت خدا تغییر می‌کنم."],en:["Renewed Mind","My mind is renewed by God’s Word and I am transformed by His truth."],hr:["Obnovljen um","Moj se um obnavlja Božjom riječju i preobražavam se Njegovom istinom."]},
  {fa:["زبان و سخن","سخنان من با کلام خدا هماهنگ است و حیات، ایمان و برکت را اعلام می‌کند."],en:["Words of Life","My words align with God’s Word and declare life, faith, and blessing."],hr:["Riječi života","Moje su riječi usklađene s Božjom riječju i objavljuju život, vjeru i blagoslov."]},
  {fa:["خدمت مؤثر","من در مسیح می‌مانم و خدمت من ثمر بسیار می‌آورد."],en:["Effective Ministry","I abide in Christ and my ministry bears much fruit."],hr:["Djelotvorna služba","Ostajem u Kristu i moja služba donosi mnogo ploda."]},
  {fa:["غلبه بر ترس","خدا روح ترس به من نداده، بلکه روح قوت، محبت و انضباط."],en:["Overcoming Fear","God has not given me a spirit of fear, but of power, love, and a sound mind."],hr:["Pobjeda nad strahom","Bog mi nije dao duha straha, nego snage, ljubavi i razboritosti."]},
  {fa:["پاکی قلب","قلب من برای خداوند جدا شده و با نور کلام خدا پاک می‌شود."],en:["Purity of Heart","My heart is set apart for the Lord and purified by the light of His Word."],hr:["Čistoća srca","Moje srce je odvojeno za Gospodina i očišćeno svjetlom Njegove riječi."]},
  {fa:["درهای باز","خداوند درهای درست را در زمان درست برای من باز می‌کند."],en:["Open Doors","The Lord opens the right doors for me at the right time."],hr:["Otvorena vrata","Gospodin mi otvara prava vrata u pravo vrijeme."]},
  {fa:["قدرت دعا","دعاهای من با ایمان، کلام و هدایت روح‌القدس همراه است و ثمر می‌آورد."],en:["Power of Prayer","My prayers are filled with faith, the Word, and the guidance of the Holy Spirit, and they bear fruit."],hr:["Snaga molitve","Moje molitve pune su vjere, Riječi i vodstva Duha Svetoga te donose plod."]},
  {fa:["ثبات در سختی","ایمان من در خدا ریشه دارد و در فشارها ثابت‌قدم می‌مانم."],en:["Steadfastness","My faith is rooted in God and I remain steadfast in pressure."],hr:["Postojanost","Moja je vjera ukorijenjena u Bogu i ostajem postojan u pritisku."]},
  {fa:["بخشش و آزادی","من می‌بخشم چون در مسیح بخشیده شده‌ام و قلبم از تلخی آزاد است."],en:["Forgiveness and Freedom","I forgive because I am forgiven in Christ, and my heart is free from bitterness."],hr:["Oprost i sloboda","Opraštam jer mi je oprošteno u Kristu i moje je srce slobodno od gorčine."]},
  {fa:["شجاعت روحانی","من قوی و دلیر هستم، زیرا خداوند با من است."],en:["Spiritual Courage","I am strong and courageous because the Lord is with me."],hr:["Duhovna hrabrost","Snažan sam i hrabar jer je Gospodin sa mnom."]},
  {fa:["تمرکز بر کلام","کلام خدا از دهان و فکر من دور نمی‌شود و راه من را روشن می‌کند."],en:["Focus on the Word","God’s Word does not depart from my mouth and mind; it lights my path."],hr:["Fokus na Riječ","Božja riječ ne odlazi iz mojih usta i misli; ona osvjetljava moj put."]},
  {fa:["فیض فراوان","فیض خدا برای من کافی است و قوت مسیح در من کامل می‌شود."],en:["Abundant Grace","God’s grace is sufficient for me and Christ’s strength is made perfect in me."],hr:["Obilna milost","Božja milost mi je dovoljna i Kristova se snaga usavršava u meni."]},
  {fa:["نور بودن","من نور جهان هستم و حقیقت مسیح از زندگی من دیده می‌شود."],en:["Being Light","I am the light of the world and the truth of Christ is seen through my life."],hr:["Biti svjetlo","Ja sam svjetlo svijeta i Kristova se istina vidi kroz moj život."]},
  {fa:["اطاعت از خدا","من عمل‌کننده کلام هستم و در برکت اطاعت زندگی می‌کنم."],en:["Obedience to God","I am a doer of the Word and I live in the blessing of obedience."],hr:["Poslušnost Bogu","Ja sam izvršitelj Riječi i živim u blagoslovu poslušnosti."]},
  {fa:["برکت برای دیگران","خدا از زندگی من برای تشویق، کمک و بنای دیگران استفاده می‌کند."],en:["Blessing Others","God uses my life to encourage, help, and build others."],hr:["Blagoslov za druge","Bog koristi moj život da ohrabri, pomogne i izgradi druge."]},
  {fa:["امید زنده","قلب من از امید، شادی و آرامش خدا پر است."],en:["Living Hope","My heart is filled with God’s hope, joy, and peace."],hr:["Živa nada","Moje srce ispunjeno je Božjom nadom, radošću i mirom."]},
  {fa:["اتحاد و صلح","من در رابطه‌هایم صلح، فروتنی و محبت مسیح را جاری می‌کنم."],en:["Unity and Peace","I release the peace, humility, and love of Christ in my relationships."],hr:["Jedinstvo i mir","U svojim odnosima oslobađam Kristov mir, poniznost i ljubav."]},
  {fa:["قدرت روح‌القدس","روح‌القدس بر من آمده و زندگی من حامل حضور و قدرت خداست."],en:["Power of the Holy Spirit","The Holy Spirit has come upon me and my life carries God’s presence and power."],hr:["Snaga Duha Svetoga","Duh Sveti je sišao na mene i moj život nosi Božju prisutnost i silu."]},
  {fa:["ثمر روح","ثمر روح در زندگی من آشکار است و شخصیت من شبیه‌تر به مسیح می‌شود."],en:["Fruit of the Spirit","The fruit of the Spirit is evident in my life and my character becomes more like Christ."],hr:["Plod Duha","Plod Duha vidljiv je u mom životu i moj karakter postaje sličniji Kristu."]},
  {fa:["شکرگزاری","من در هر شرایطی شکرگزار می‌مانم و وفاداری خدا را می‌بینم."],en:["Thanksgiving","I remain thankful in every circumstance and I see God’s faithfulness."],hr:["Zahvalnost","Ostajem zahvalan u svakoj okolnosti i vidim Božju vjernost."]}
];

function buildDailyWord(lang) {
  const data = loadWindowData("daily-messages-v14.js", "dailyMessages");
  const item = pickByMonthDay(data);
  const day = monthDay();
  return {
    title: { fa:`پیام روزانه روز ${day}`, en:`Daily Word Day ${day}`, hr:`Dnevna riječ dan ${day}` }[lang],
    message: { fa:"بخشی از پیام امروز: ", en:"Preview of today’s message: ", hr:"Dio današnje poruke: " }[lang] + shortText(text(item.message || item.body || item.text || item.title, lang), 120),
    url: `${APP_URL}?page=word&v=${APP_VERSION}`
  };
}

function buildThanksgiving(lang) {
  const data = loadWindowData("thanksgiving-v22.js", "thanksgivingCourse");
  const days = data.days || [];
  const item = pickByMonthDay(days);
  const day = monthDay();
  return {
    title: { fa:`شکرگزاری روز ${day}`, en:`Thanksgiving Day ${day}`, hr:`Zahvalnost dan ${day}` }[lang],
    message: { fa:"تمرین امروز: ", en:"Today’s practice: ", hr:"Današnja vježba: " }[lang] + shortText(text(item.instruction || item.practice || item.message || item.title, lang), 120),
    url: `${APP_URL}?page=thanksgiving&v=${APP_VERSION}`
  };
}

function buildDeclaration(lang) {
  const day = monthDay();
  const item = declarations31[day - 1] || declarations31[0];
  const [topic, declaration] = item[lang] || item.en;
  return {
    title: { fa:`اعلان ایمان روز ${day}: ${topic}`, en:`Faith Declaration Day ${day}: ${topic}`, hr:`Izjava vjere dan ${day}: ${topic}` }[lang],
    message: { fa:"امروز اعلام کن: ", en:"Declare today: ", hr:"Izjavi danas: " }[lang] + shortText(declaration, 120),
    url: `${APP_URL}?page=declarations&v=${APP_VERSION}`
  };
}

function buildPayload(lang) {
  if (TYPE === "daily-word") return buildDailyWord(lang);
  if (TYPE === "thanksgiving") return buildThanksgiving(lang);
  if (TYPE === "faith-declaration") return buildDeclaration(lang);
  throw new Error(`Unknown NOTIFICATION_TYPE: ${TYPE}`);
}

async function sendOneSignal(lang, built) {
  const body = {
    app_id: ONE_SIGNAL_APP_ID,
    target_channel: "push",
    filters: [{ field: "tag", key: "language", relation: "=", value: lang }],
    headings: { en: built.title },
    contents: { en: built.message },
    url: built.url
  };

  const res = await fetch("https://api.onesignal.com/notifications", {
    method: "POST",
    headers: {
      "Authorization": `Key ${ONE_SIGNAL_REST_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  });

  const responseText = await res.text();
  if (!res.ok) {
    console.error(`OneSignal failed for ${lang}: ${res.status} ${responseText}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Sent ${TYPE} to ${lang}: ${built.title}`);
  console.log(responseText);
}

(async () => {
  for (const lang of LANGS) {
    const built = buildPayload(lang);
    await sendOneSignal(lang, built);
  }
})();
