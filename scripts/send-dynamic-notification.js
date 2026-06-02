'use strict';

const TYPE = process.env.NOTIFICATION_TYPE;
const APP_ID = process.env.ONESIGNAL_APP_ID;
const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

if (!APP_ID) throw new Error('ONESIGNAL_APP_ID is missing');
if (!REST_API_KEY) throw new Error('ONESIGNAL_REST_API_KEY is missing');
if (!TYPE) throw new Error('NOTIFICATION_TYPE is missing');

const APP_URL = 'https://omideno7.github.io/omideno7-app/';

function todaySeed() {
  const d = new Date();
  return Number(`${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`);
}

function pick(items) {
  return items[todaySeed() % items.length];
}

const messages = {
  'daily-word': () => ({
    headings: {
      fa: 'کلام روزانه آماده است',
      en: 'Daily Word is ready',
      hr: 'Dnevna riječ je spremna'
    },
    contents: {
      fa: 'امروز را با کلام خدا آغاز کن. پیام روزانه تو آماده است.',
      en: 'Start today with God’s Word. Your daily message is ready.',
      hr: 'Započni dan Božjom riječju. Tvoja dnevna poruka je spremna.'
    },
    url: `${APP_URL}?open=daily-word`
  }),
  'faith-declaration': () => ({
    headings: {
      fa: 'اعلان ایمان امروز',
      en: 'Today’s Faith Declaration',
      hr: 'Današnja izjava vjere'
    },
    contents: {
      fa: pick([
        'امروز با ایمان اعلام کن: من در مسیح پیروز هستم.',
        'کلام خدا در دهان من زنده و مؤثر است.',
        'من فرزند خدا هستم و در پیروزی زندگی می‌کنم.'
      ]),
      en: pick([
        'Declare today: I am victorious in Christ.',
        'God’s Word in my mouth is alive and powerful.',
        'I am a child of God and I live in victory.'
      ]),
      hr: pick([
        'Izjavi danas: Pobjednik sam u Kristu.',
        'Božja riječ u mojim ustima je živa i snažna.',
        'Dijete sam Božje i živim u pobjedi.'
      ])
    },
    url: `${APP_URL}?open=faith-declaration`
  }),
  'thanksgiving': () => ({
    headings: {
      fa: 'تمرین شکرگزاری امروز',
      en: 'Today’s Thanksgiving Practice',
      hr: 'Današnja vježba zahvalnosti'
    },
    contents: {
      fa: 'امروز چند دقیقه وقت بگذار و برای حضور، کلام و محبت خدا شکرگزاری کن.',
      en: 'Take a few minutes today to thank God for His presence, Word, and love.',
      hr: 'Odvoji nekoliko minuta danas i zahvali Bogu za Njegovu prisutnost, Riječ i ljubav.'
    },
    url: `${APP_URL}?open=thanksgiving`
  }),
  'morning-prayer-reminder': () => ({
    headings: {
      fa: 'یادآوری جلسه دعای صبحگاهی',
      en: 'Morning Prayer Reminder',
      hr: 'Podsjetnik za jutarnju molitvu'
    },
    contents: {
      fa: 'جلسه دعای صبحگاهی امروز ساعت ۵:۰۰ صبح به وقت اروپای مرکزی آغاز می‌شود. لطفاً چند دقیقه زودتر آماده باشید.',
      en: 'Today’s morning prayer meeting starts at 5:00 AM Central European Time. Please be ready a few minutes early.',
      hr: 'Današnji jutarnji molitveni sastanak počinje u 5:00 po srednjoeuropskom vremenu. Molimo budite spremni nekoliko minuta ranije.'
    },
    url: 'https://join.freeconferencecall.com/omideno7church'
  }),
  'sunday-service-reminder': () => ({
    headings: {
      fa: 'یادآوری جلسه کلیسا',
      en: 'Church Service Reminder',
      hr: 'Podsjetnik za crkveni sastanak'
    },
    contents: {
      fa: 'جلسه کلیسا امشب ساعت ۸:۰۰ به وقت اروپای مرکزی آغاز می‌شود. با آمادگی و انتظار روحانی وارد جلسه شوید.',
      en: 'Tonight’s church service starts at 8:00 PM Central European Time. Join with spiritual expectation and readiness.',
      hr: 'Večerašnji crkveni sastanak počinje u 20:00 po srednjoeuropskom vremenu. Pridružite se s duhovnim očekivanjem i spremnošću.'
    },
    url: 'https://join.freeconferencecall.com/omideno7church'
  })
};

function isLocalTimeNotification(type) {
  return ['daily-word', 'faith-declaration', 'thanksgiving'].includes(type);
}

function deliveryTimeFor(type) {
  if (type === 'daily-word') return '07:00:00';
  if (type === 'faith-declaration') return '10:00:00';
  if (type === 'thanksgiving') return '12:00:00';
  return null;
}

async function send() {
  if (!messages[TYPE]) {
    throw new Error(`Unknown NOTIFICATION_TYPE: ${TYPE}`);
  }
  const msg = messages[TYPE]();
  const payload = {
    app_id: APP_ID,
    included_segments: ['All'],
    headings: msg.headings,
    contents: msg.contents,
    url: msg.url
  };

  if (isLocalTimeNotification(TYPE)) {
    payload.delayed_option = 'timezone';
    payload.delivery_time_of_day = deliveryTimeFor(TYPE);
  }

  console.log('Sending OneSignal notification:', TYPE);
  console.log('Target: included_segments = ["All"]');
  if (payload.delayed_option) {
    console.log(`Local-time delivery: ${payload.delivery_time_of_day}`);
  }

  const res = await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Basic ${REST_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  console.log('OneSignal HTTP status:', res.status);
  console.log('OneSignal response:', text);

  if (!res.ok) {
    throw new Error(`OneSignal HTTP ${res.status}: ${text}`);
  }
  if (/"errors"/i.test(text)) {
    throw new Error(`OneSignal response contains errors: ${text}`);
  }
}

send().catch((err) => {
  console.error(err);
  process.exit(1);
});
