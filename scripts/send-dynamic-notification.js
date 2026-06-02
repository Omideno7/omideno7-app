/*
  Omideno7 Church - Dynamic OneSignal notification sender
  V61.10 Audience Target Fix
  Important: Sends to OneSignal's "Subscribed Users" segment, not stale player IDs.
*/

const https = require('https');

const APP_ID = process.env.ONESIGNAL_APP_ID;
const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
const TYPE = process.env.NOTIFICATION_TYPE;

if (!APP_ID) throw new Error('ONESIGNAL_APP_ID is missing');
if (!REST_API_KEY) throw new Error('ONESIGNAL_REST_API_KEY is missing');
if (!TYPE) throw new Error('NOTIFICATION_TYPE is missing');

const APP_URL = 'https://omideno7.github.io/omideno7-app/';

function basePayload({ headings, contents, url = APP_URL }) {
  return {
    app_id: APP_ID,
    included_segments: ['Subscribed Users'],
    headings,
    contents,
    url,
  };
}

function buildPayload(type) {
  const dailyWord = basePayload({
    headings: {
      en: 'Daily Word is ready',
      fa: 'کلام روزانه آماده است',
      hr: 'Dnevna riječ je spremna',
    },
    contents: {
      en: 'Start your day with God’s Word. Open today’s message in the app.',
      fa: 'روز خود را با کلام خدا شروع کن. پیام امروز را در اپ باز کن.',
      hr: 'Započni dan Božjom riječju. Otvori današnju poruku u aplikaciji.',
    },
    url: `${APP_URL}#word`,
  });

  const faithDeclaration = basePayload({
    headings: {
      en: 'Faith Declaration',
      fa: 'اعلان ایمان',
      hr: 'Izjava vjere',
    },
    contents: {
      en: 'Declare God’s Word over your life today.',
      fa: 'امروز کلام خدا را بر زندگی خود اعلام کن.',
      hr: 'Danas izgovori Božju riječ nad svojim životom.',
    },
    url: `${APP_URL}#declarations`,
  });

  const thanksgiving = basePayload({
    headings: {
      en: 'Thanksgiving Practice',
      fa: 'تمرین شکرگزاری',
      hr: 'Vježba zahvaljivanja',
    },
    contents: {
      en: 'Take a moment today to thank the Lord and record your thanksgiving.',
      fa: 'امروز لحظه‌ای خداوند را شکر کن و شکرگزاری خود را ثبت کن.',
      hr: 'Danas odvoji trenutak za zahvaljivanje Gospodinu i zapiši svoju zahvalnost.',
    },
    url: `${APP_URL}#thanksgiving`,
  });

  const morningPrayerReminder = basePayload({
    headings: {
      en: 'Morning Prayer Reminder',
      fa: 'یادآوری جلسه دعای صبحگاهی',
      hr: 'Podsjetnik za jutarnju molitvu',
    },
    contents: {
      en: 'The morning prayer meeting starts at 5:00 AM Central European Time. Please be ready a few minutes early.',
      fa: 'جلسه دعای صبحگاهی ساعت ۵:۰۰ صبح به وقت اروپای مرکزی آغاز می‌شود. لطفاً چند دقیقه زودتر آماده باشید.',
      hr: 'Jutarnji molitveni sastanak počinje u 5:00 po srednjoeuropskom vremenu. Molimo budite spremni nekoliko minuta ranije.',
    },
    url: APP_URL,
  });

  const sundayServiceReminder = basePayload({
    headings: {
      en: 'Sunday Service Reminder',
      fa: 'یادآوری جلسه کلیسا',
      hr: 'Podsjetnik za nedjeljno bogoslužje',
    },
    contents: {
      en: 'The Sunday church meeting starts at 8:00 PM Central European Time. Please be ready a few minutes early.',
      fa: 'جلسه یکشنبه کلیسا ساعت ۸:۰۰ شب به وقت اروپای مرکزی آغاز می‌شود. لطفاً چند دقیقه زودتر آماده باشید.',
      hr: 'Nedjeljno bogoslužje počinje u 20:00 po srednjoeuropskom vremenu. Molimo budite spremni nekoliko minuta ranije.',
    },
    url: APP_URL,
  });

  switch (type) {
    case 'daily-word':
      return { ...dailyWord, delayed_option: 'timezone', delivery_time_of_day: '7:00AM' };
    case 'faith-declaration':
      return { ...faithDeclaration, delayed_option: 'timezone', delivery_time_of_day: '10:00AM' };
    case 'thanksgiving':
      return { ...thanksgiving, delayed_option: 'timezone', delivery_time_of_day: '12:00PM' };
    case 'morning-prayer-reminder':
      return morningPrayerReminder;
    case 'sunday-service-reminder':
      return sundayServiceReminder;
    case 'test':
      return basePayload({
        headings: { en: 'Omideno7 Test', fa: 'تست نوتیفیکیشن امیدنو۷', hr: 'Omideno7 test' },
        contents: {
          en: 'This is an immediate test notification from Omideno7 Church.',
          fa: 'این یک پیام تست فوری از کلیسای امیدنو۷ است.',
          hr: 'Ovo je trenutna testna obavijest iz crkve Omideno7.',
        },
      });
    default:
      throw new Error(`Unknown NOTIFICATION_TYPE: ${type}`);
  }
}

function send(payload) {
  const body = JSON.stringify(payload);
  const options = {
    hostname: 'api.onesignal.com',
    path: '/notifications',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Key ${REST_API_KEY}`,
      'Content-Length': Buffer.byteLength(body),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        console.log(`OneSignal HTTP status: ${res.statusCode}`);
        console.log('OneSignal response:', data);
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`OneSignal HTTP error ${res.statusCode}`));
        }
        if (data.includes('"errors"')) {
          return reject(new Error('OneSignal response contains errors.'));
        }
        resolve(data);
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  const payload = buildPayload(TYPE);
  await send(payload);
})();
