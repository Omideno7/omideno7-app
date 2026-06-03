'use strict';

/*
  Omideno7 V63.33 — OneSignal audience targeting fix
  Fixes "no subscribed recipients" errors by:
  1) Using the same public OneSignal App ID as the web app.
  2) Targeting the default OneSignal segment "All" instead of relying on "Subscribed Users".
  3) Keeping target_channel="push" so only push-capable subscriptions are used.
  4) Keeping local-time delivery for Daily Word, Faith Declaration, and Thanksgiving.
*/

const TYPE = process.env.NOTIFICATION_TYPE;
const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

// Public OneSignal App ID used inside the Omideno7 web app.
// Keeping this fixed prevents GitHub Secrets from accidentally pointing to a different OneSignal app with zero subscribers.
const APP_ID = '33aa00cc-1a85-42bf-9f68-949d81f37620';
const SECRET_APP_ID = process.env.ONESIGNAL_APP_ID || '';

const APP_URL = 'https://omideno7.github.io/omideno7-app/';

if (!REST_API_KEY) throw new Error('ONESIGNAL_REST_API_KEY is missing in GitHub Secrets');
if (!TYPE) throw new Error('NOTIFICATION_TYPE is missing');

if (SECRET_APP_ID && SECRET_APP_ID !== APP_ID) {
  console.warn('WARNING: GitHub Secret ONESIGNAL_APP_ID is different from the app public OneSignal ID.');
  console.warn('The script will use the web app OneSignal App ID:', APP_ID);
}

function todaySeed() {
  const d = new Date();
  return Number(`${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`);
}

function pick(items) {
  return items[todaySeed() % items.length];
}

function appUrl(path) {
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
    url: appUrl('?open=daily-word')
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
    url: appUrl('?open=faith-declaration')
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
    url: appUrl('?open=thanksgiving')
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

function buildPayload(type) {
  const msg = messages[type]();

  const payload = {
    app_id: APP_ID,
    // Use push channel and the default All segment. OneSignal will only deliver to push-subscribed subscriptions.
    target_channel: 'push',
    included_segments: ['All'],
    headings: msg.headings,
    contents: msg.contents,
    url: msg.url,
    web_url: msg.url,
    data: {
      source: 'github-actions',
      notification_type: type,
      omideno7_version: 'V63.33'
    }
  };

  if (isLocalTimeNotification(type)) {
    payload.delayed_option = 'timezone';
    payload.delivery_time_of_day = deliveryTimeFor(type);
  }

  return payload;
}

async function send() {
  if (!messages[TYPE]) {
    throw new Error(`Unknown NOTIFICATION_TYPE: ${TYPE}`);
  }

  const payload = buildPayload(TYPE);

  console.log('Omideno7 sending OneSignal notification:', TYPE);
  console.log('OneSignal App ID:', APP_ID);
  console.log('Audience: target_channel="push", included_segments=["All"]');
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
  } catch (e) {}

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
