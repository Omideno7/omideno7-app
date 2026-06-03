/* Omideno7 V63.36 — multilingual announcement notifications
   Keeps V63.35 fixes:
   - OneSignal web_url only; no url field.
   - Morning Prayer reminder tied to 04:45 Europe/Zagreb.
   Adds:
   - app-announcement notifications for School and Q&A.
   - language-targeted sends using OneSignal tags: app_language / language = fa, en, hr.
*/

const APP_URL = 'https://omideno7.github.io/omideno7-app/';
const ONE_SIGNAL_API_URL = 'https://onesignal.com/api/v1/notifications';

const APP_ID = process.env.ONESIGNAL_APP_ID || process.env.ONE_SIGNAL_APP_ID || '33aa00cc-1a85-42bf-9f68-949d81f37620';
const API_KEY = process.env.ONESIGNAL_API_KEY || process.env.ONE_SIGNAL_API_KEY || process.env.ONESIGNAL_REST_API_KEY || process.env.ONE_SIGNAL_REST_API_KEY;

const type = process.argv[2] || process.env.NOTIFICATION_TYPE || 'daily-word';
const announcementType = process.argv[3] || process.env.ANNOUNCEMENT_TYPE || 'qa';

const FORCE_SEND = String(process.env.OMIDENO7_FORCE_SEND || process.env.FORCE_SEND || '').toLowerCase() === '1'
  || String(process.env.OMIDENO7_FORCE_SEND || process.env.FORCE_SEND || '').toLowerCase() === 'true';
const CROATIA_REMINDER_GUARD = String(process.env.OMIDENO7_CROATIA_REMINDER || '').toLowerCase() === '1'
  || String(process.env.OMIDENO7_CROATIA_REMINDER || '').toLowerCase() === 'true';

function todayDayNumber(){
  return new Date().getUTCDate();
}

function zagrebParts(date = new Date()){
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zagreb',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);

  const out = {};
  for(const p of parts){
    if(p.type !== 'literal') out[p.type] = p.value;
  }
  return {
    hour: Number(out.hour),
    minute: Number(out.minute),
    weekday: out.weekday,
    dateText: `${out.year}-${out.month}-${out.day} ${out.hour}:${out.minute} Europe/Zagreb`
  };
}

function shouldSendMorningPrayerNow(){
  if(FORCE_SEND) return {ok:true, reason:'manual workflow_dispatch force send'};
  if(type !== 'morning-prayer-reminder') return {ok:true, reason:'not morning prayer'};
  if(!CROATIA_REMINDER_GUARD) return {ok:true, reason:'Croatia guard disabled'};

  const z = zagrebParts();
  const ok = z.hour === 4 && z.minute >= 40 && z.minute <= 59;
  return {
    ok,
    reason: ok
      ? `Croatia local reminder window matched: ${z.dateText}`
      : `Skipped: Croatia local time is ${z.dateText}; reminder window is 04:40-04:59 Europe/Zagreb`
  };
}

function appUrlFor(type, subtype){
  const base = APP_URL.replace(/\/$/, '/');
  const params = new URLSearchParams();
  params.set('v', '6336');

  if(type === 'daily-word') params.set('open', 'word');
  if(type === 'faith-declaration') params.set('open', 'declarations');
  if(type === 'thanksgiving') params.set('open', 'thanksgiving');
  if(type === 'morning-prayer-reminder') params.set('open', 'meetings');
  if(type === 'sunday-service-reminder') params.set('open', 'meetings');

  if(type === 'app-announcement'){
    if(subtype === 'school') params.set('open', 'school');
    if(subtype === 'qa') params.set('open', 'more');
    params.set('announcement', subtype || 'qa');
  }

  return base + '?' + params.toString();
}

function announcementMessage(subtype){
  if(subtype === 'school'){
    return {
      title: {
        fa: 'مدرسه آنلاین کلیسای امیدنو۷ فعال شد',
        en: 'Omid No 7 Online School is now open',
        hr: 'Online škola Crkve Omid No 7 je otvorena'
      },
      body: {
        fa: 'به مدرسه آنلاین کلیسای امیدنو۷ بپیوندید، در کلام رشد کنید و برای خدمت مؤثرتر آماده شوید.',
        en: 'Join the Omid No 7 Online School, grow in the Word, and be equipped for a more effective life and ministry.',
        hr: 'Pridružite se online školi Crkve Omid No 7, rastite u Božjoj riječi i budite opremljeni za učinkovitiji život i služenje.'
      }
    };
  }

  return {
    title: {
      fa: 'بخش پرسش و پاسخ فعال شد',
      en: 'Questions & Answers is now open',
      hr: 'Pitanja i odgovori su sada dostupni'
    },
    body: {
      fa: 'اگر سوالی درباره ایمان، کتاب‌مقدس یا زندگی مسیحی دارید، در اپ کلیسای امیدنو۷ بپرسید و پاسخ را دریافت کنید.',
      en: 'If you have a question about faith, the Bible, or Christian life, ask it in the Omid No 7 app and receive an answer.',
      hr: 'Ako imate pitanje o vjeri, Bibliji ili kršćanskom životu, postavite ga u aplikaciji Omid No 7 i primite odgovor.'
    }
  };
}

function messageFor(type){
  const day = todayDayNumber();

  const messages = {
    'daily-word': {
      title: {
        en: 'Today’s Daily Word',
        fa: 'کلام روزانه امروز',
        hr: 'Današnja dnevna riječ'
      },
      body: {
        en: `Daily Word message ${day} is ready. Open the app to read the full message.`,
        fa: `پیام کلام روزانه شماره ${day} آماده است. اپلیکیشن را باز کنید و پیام کامل را بخوانید.`,
        hr: `Dnevna riječ broj ${day} je spremna. Otvorite aplikaciju i pročitajte cijelu poruku.`
      },
      deliveryTime: '07:00:00'
    },

    'faith-declaration': {
      title: {
        en: 'Faith Declaration',
        fa: 'اعلان ایمان امروز',
        hr: 'Izjava vjere'
      },
      body: {
        en: 'Declare God’s Word over your life today.',
        fa: 'امروز کلام خدا را با ایمان بر زندگی خود اعلام کن.',
        hr: 'Danas izgovori Božju riječ nad svojim životom.'
      },
      deliveryTime: '10:00:00'
    },

    'thanksgiving': {
      title: {
        en: 'Thanksgiving Time',
        fa: 'زمان شکرگزاری',
        hr: 'Vrijeme zahvaljivanja'
      },
      body: {
        en: 'Take a moment to thank the Lord today.',
        fa: 'امروز زمانی را برای شکرگزاری از خداوند اختصاص بده.',
        hr: 'Odvojite trenutak danas da zahvalite Gospodinu.'
      },
      deliveryTime: '12:00:00'
    },

    'morning-prayer-reminder': {
      title: {
        en: 'Omid No 7 Morning Prayer',
        fa: 'جلسه صبحگاهی کلیسای امیدنو۷',
        hr: 'Jutarnja molitva Crkve Omid No 7'
      },
      body: {
        en: 'Join the Omid No 7 Church morning prayer meeting and begin today in fellowship with the Lord.',
        fa: 'به جمع خانواده الهی در جلسه صبحگاهی کلیسای امیدنو۷ بپیوندید و مشارکت امروز خود را با خداوند آغاز کنید.',
        hr: 'Pridružite se obitelji vjere na jutarnjoj molitvi Crkve Omid No 7 i započnite dan u zajedništvu s Gospodinom.'
      }
    },

    'sunday-service-reminder': {
      title: {
        en: 'Sunday Church Service',
        fa: 'جلسه کلیسا یکشنبه',
        hr: 'Nedjeljna crkvena služba'
      },
      body: {
        en: 'Join the Sunday church service tonight.',
        fa: 'امشب به جلسه کلیسا در روز یکشنبه بپیوندید.',
        hr: 'Pridružite se večeras nedjeljnoj crkvenoj službi.'
      }
    }
  };

  if(type === 'app-announcement') return announcementMessage(announcementType);
  return messages[type] || messages['daily-word'];
}

function languageFilters(lang){
  // Users are tagged from the app with both app_language and language.
  return [
    { field: 'tag', key: 'app_language', relation: '=', value: lang },
    { operator: 'OR' },
    { field: 'tag', key: 'language', relation: '=', value: lang }
  ];
}

function singleLanguagePayload(type, lang){
  const msg = messageFor(type);
  const payload = {
    app_id: APP_ID,
    target_channel: 'push',
    filters: languageFilters(lang),
    headings: { en: msg.title[lang] || msg.title.en || msg.title.fa || msg.title.hr },
    contents: { en: msg.body[lang] || msg.body.en || msg.body.fa || msg.body.hr },
    web_url: appUrlFor(type, announcementType),
    data: {
      app: 'omideno7',
      notification_type: type,
      announcement_type: type === 'app-announcement' ? announcementType : undefined,
      app_language: lang,
      version: 'V63.36'
    }
  };

  if(msg.deliveryTime){
    payload.delayed_option = 'timezone';
    payload.delivery_time_of_day = msg.deliveryTime;
  }

  return payload;
}

function allSubscribersPayload(type){
  const msg = messageFor(type);
  const payload = {
    app_id: APP_ID,
    target_channel: 'push',
    included_segments: ['All'],
    headings: msg.title,
    contents: msg.body,
    web_url: appUrlFor(type, announcementType),
    data: {
      app: 'omideno7',
      notification_type: type,
      version: 'V63.36'
    }
  };

  if(msg.deliveryTime){
    payload.delayed_option = 'timezone';
    payload.delivery_time_of_day = msg.deliveryTime;
  }

  return payload;
}

async function postToOneSignal(payload, label){
  console.log('Sending OneSignal notification:', label);
  console.log('Payload target:', payload.filters ? 'language filters' : 'All push subscribers');

  const res = await fetch(ONE_SIGNAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Basic ' + API_KEY
    },
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  console.log('OneSignal HTTP status:', res.status);
  console.log('OneSignal response:', text);

  if(!res.ok){
    throw new Error('OneSignal HTTP ' + res.status + ': ' + text);
  }
}

async function send(){
  if(!API_KEY){
    throw new Error('Missing OneSignal API key. Add ONESIGNAL_API_KEY or ONE_SIGNAL_API_KEY in GitHub Secrets.');
  }

  const guard = shouldSendMorningPrayerNow();
  console.log('Morning Prayer Croatia-time guard:', guard.reason);
  if(!guard.ok){
    console.log('No notification sent. This is not an error.');
    return;
  }

  console.log('Omideno7 notification type:', type);
  console.log('OneSignal App ID:', APP_ID ? '***' : 'missing');
  console.log('Open URL field: web_url only');

  if(type === 'app-announcement'){
    console.log('Announcement type:', announcementType);
    for(const lang of ['fa','en','hr']){
      await postToOneSignal(singleLanguagePayload(type, lang), `app-announcement:${announcementType}:${lang}`);
    }
    return;
  }

  await postToOneSignal(allSubscribersPayload(type), type);
}

send().catch(err => {
  console.error(err);
  process.exit(1);
});
