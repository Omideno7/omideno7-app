'use strict';

/*
  Omideno7 V63.32 — OneSignal scheduled notifications fix
  - Sends push notifications through the current OneSignal Create Message API.
  - Supports localized FA/EN/HR titles and contents.
  - Uses timezone delivery for Daily Word, Faith Declaration, and Thanksgiving.
  - Keeps meeting reminders as immediate notifications when the GitHub Action runs.
*/

const TYPE = process.env.NOTIFICATION_TYPE;
const APP_ID = process.env.ONESIGNAL_APP_ID;
const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

const APP_URL = 'https://omideno7.github.io/omideno7-app/';

if (!APP_ID) throw new Error('ONESIGNAL_APP_ID is missing in GitHub Secrets');
if (!REST_API_KEY) throw new Error('ONESIGNAL_REST_API_KEY is missing in GitHub Secrets');
if (!TYPE) throw new Error('NOTIFICATION_TYPE is missing');

function todaySeed() {
  const d = new Date();
  return Number(`${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`);
}

function pick(items) {
  return items[todaySeed() % items.length];
}

function safeUrl(path) {
  return APP_URL + path;
}

const messages = {
  'daily-word': () => ({
    headings: {
      en: 'Daily Word is ready',
      fa: 'کلام روزانه آماده است',
      hr: 'Dnevna riječ je spremna'
    },
    contents: {
      en: 'Start today with God’s Word. Your daily message is ready.',
      fa: 'امروز را با کلام خدا آغاز کن. پیام روزانه تو آماده است.',
      hr: 'Započni dan Božjom riječju. Tvoja dnevna poruka je spremna.'
    },
    url: safeUrl('?open=daily-word')
  }),

  'faith-declaration': () => ({
    headings: {
      en: 'Today’s Faith Declaration',
      fa: 'اعلان ایمان امروز',
      hr: 'Današnja izjava vjere'
    },
    contents: {
      en: pick([
        'Declare today: I am victorious in Christ.',
        'God’s Word in my mouth is alive and powerful.',
        'I am a child of God and I live in victory.'
      ]),
      fa: pick([
        'امروز با ایمان اعلام کن: من در مسیح پیروز هستم.',
        'کلام خدا در دهان من زنده و مؤثر است.',
        'من فرزند خدا هستم و در پیروزی زندگی می‌کنم.'
      ]),
      hr: pick([
        'Izjavi danas: Pobjednik sam u Kristu.',
        'Božja riječ u mojim ustima je živa i snažna.',
        'Dijete sam Božje i živim u pobjedi.'
      ])
    },
    url: safeUrl('?open=faith-declaration')
  }),

  'thanksgiving': () => ({
    headings: {
      en: 'Today’s Thanksgiving Practice',
      fa: 'تمرین شکرگزاری امروز',
      hr: 'Današnja vježba zahvalnosti'
    },
    contents: {
      en: 'Take a few minutes today to thank God for His presence, Word, and love.',
      fa: 'امروز چند دقیقه وقت بگذار و برای حضور، کلام و محبت خدا شکرگزاری کن.',
      hr: 'Odvoji nekoliko minuta danas i zahvali Bogu za Njegovu prisutnost, Riječ i ljubav.'
    },
    url: safeUrl('?open=thanksgiving')
  }),

  'morning-prayer-reminder': () => ({
    headings: {
      en: 'Morning Prayer Reminder',
      fa: 'یادآوری جلسه دعای صبحگاهی',
      hr: 'Podsjetnik za jutarnju molitvu'
    },
    contents: {
      en: 'Today’s morning prayer meeting starts at 5:00 AM Croatia time. Please be ready a few minutes early.',
      fa: 'جلسه دعای صبحگاهی امروز ساعت ۵:۰۰ صبح به وقت کرواسی آغاز می‌شود. لطفاً چند دقیقه زودتر آماده باشید.',
      hr: 'Današnji jutarnji molitveni sastanak počinje u 5:00 po hrvatskom vremenu. Molimo budite spremni nekoliko minuta ranije.'
    },
    url: 'https://join.freeconferencecall.com/omideno7church'
  }),

  'sunday-service-reminder': () => ({
    headings: {
      en: 'Church Service Reminder',
      fa: 'یادآوری جلسه کلیسا',
      hr: 'Podsjetnik za crkveni sastanak'
    },
    contents: {
      en: 'Tonight’s church service starts at 8:00 PM Croatia time. Join with spiritual expectation and readiness.',
      fa: 'جلسه کلیسا امشب ساعت ۸:۰۰ به وقت کرواسی آغاز می‌شود. با آمادگی و انتظار روحانی وارد جلسه شوید.',
      hr: 'Večerašnji crkveni sastanak počinje u 20:00 po hrvatskom vremenu. Pridružite se s duhovnim očekivanjem i spremnošću.'
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
    target_channel: 'push',
    included_segments: ['Subscribed Users'],
    headings: msg.headings,
    contents: msg.contents,
    url: msg.url,
    web_url: msg.url,
    data: {
      source: 'github-actions',
      notification_type: TYPE,
      omideno7_version: 'V63.32'
    }
  };

  if (isLocalTimeNotification(TYPE)) {
    payload.delayed_option = 'timezone';
    payload.delivery_time_of_day = deliveryTimeFor(TYPE);
    payload.throttle_rate_per_minute = 0;
  }

  console.log('Omideno7 sending OneSignal notification:', TYPE);
  console.log('Audience: included_segments = ["Subscribed Users"]');
  if (payload.delayed_option) {
    console.log('Local-time delivery:', payload.delivery_time_of_day);
  }

  const res = await fetch('https://api.onesignal.com/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Key ${REST_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  const text = await res.text();

  console.log('OneSignal HTTP status:', res.status);
  console.log('OneSignal response:', text);

  if (!res.ok) {
    throw new Error(`OneSignal HTTP ${res.status}: ${text}`);
  }

  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    // Keep going; OneSignal normally returns JSON.
  }

  if (parsed && parsed.errors) {
    throw new Error(`OneSignal response contains errors: ${JSON.stringify(parsed.errors)}`);
  }

  if (parsed && parsed.id) {
    console.log('OneSignal message id:', parsed.id);
  }
}

send().catch((err) => {
  console.error(err);
  process.exit(1);
});
