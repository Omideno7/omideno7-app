/* Omideno7 V63.34 — OneSignal URL conflict fix
   Fixes OneSignal HTTP 400: Remove url field when setting app_url or web_url.
   Sends push notifications to All push subscribers and uses web_url only.
*/

const APP_URL = 'https://omideno7.github.io/omideno7-app/';
const ONE_SIGNAL_API_URL = 'https://onesignal.com/api/v1/notifications';

const APP_ID = process.env.ONESIGNAL_APP_ID || process.env.ONE_SIGNAL_APP_ID || '33aa00cc-1a85-42bf-9f68-949d81f37620';
const API_KEY = process.env.ONESIGNAL_API_KEY || process.env.ONE_SIGNAL_API_KEY || process.env.ONESIGNAL_REST_API_KEY || process.env.ONE_SIGNAL_REST_API_KEY;

const type = process.argv[2] || process.env.NOTIFICATION_TYPE || 'daily-word';

function todayDayNumber(){
  const now = new Date();
  return now.getUTCDate();
}

function appUrlFor(type){
  const base = APP_URL.replace(/\/$/, '/');
  const params = new URLSearchParams();
  params.set('v', '6334');

  if(type === 'daily-word') params.set('open', 'word');
  if(type === 'faith-declaration') params.set('open', 'declarations');
  if(type === 'thanksgiving') params.set('open', 'thanksgiving');
  if(type === 'morning-prayer-reminder') params.set('open', 'meetings');
  if(type === 'sunday-service-reminder') params.set('open', 'meetings');

  return base + '?' + params.toString();
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
        en: 'Morning Prayer',
        fa: 'دعای صبحگاهی',
        hr: 'Jutarnja molitva'
      },
      body: {
        en: 'Join the morning prayer meeting and start your day with God.',
        fa: 'به جلسه دعای صبحگاهی بپیوندید و روز خود را با خدا آغاز کنید.',
        hr: 'Pridružite se jutarnjoj molitvi i započnite dan s Bogom.'
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

  return messages[type] || messages['daily-word'];
}

function buildPayload(type){
  const msg = messageFor(type);

  const payload = {
    app_id: APP_ID,
    target_channel: 'push',
    included_segments: ['All'],
    headings: msg.title,
    contents: msg.body,
    web_url: appUrlFor(type),
    data: {
      app: 'omideno7',
      notification_type: type,
      version: 'V63.34'
    }
  };

  // Critical fix: do NOT set payload.url when web_url or app_url is set.
  // OneSignal returns HTTP 400 if url exists together with app_url/web_url.

  if(msg.deliveryTime){
    payload.delayed_option = 'timezone';
    payload.delivery_time_of_day = msg.deliveryTime;
  }

  return payload;
}

async function send(){
  if(!API_KEY){
    throw new Error('Missing OneSignal API key. Add ONESIGNAL_API_KEY or ONE_SIGNAL_API_KEY in GitHub Secrets.');
  }

  const payload = buildPayload(type);

  console.log('Omideno7 sending OneSignal notification:', type);
  console.log('OneSignal App ID:', APP_ID ? '***' : 'missing');
  console.log('Audience: target_channel="push", included_segments=["All"]');
  console.log('Open URL field: web_url only');
  if(payload.delivery_time_of_day){
    console.log('Local delivery time:', payload.delivery_time_of_day);
  } else {
    console.log('Delivery: immediate');
  }

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

send().catch(err => {
  console.error(err);
  process.exit(1);
});
