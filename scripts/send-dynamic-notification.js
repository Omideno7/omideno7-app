/*
  Omideno7 dynamic notification sender — V61.7
  Scope: notifications only. Does not change app UI.

  Required GitHub Secrets:
    ONESIGNAL_APP_ID
    ONESIGNAL_REST_API_KEY

  Supported NOTIFICATION_TYPE values:
    daily-word
    morning-prayer-reminder
    faith-declaration
    thanksgiving
    sunday-service-reminder

  Daily devotional messages are scheduled by OneSignal in the subscriber's local timezone:
    daily-word: 07:00 local time
    faith-declaration: 10:00 local time
    thanksgiving: 12:00 local time

  Live meeting reminders use Europe/Zagreb as the source of truth and mention
  Central European Time in the message. If GitHub runs too late, the script skips
  the reminder to avoid misleading users.
*/

const ONE_SIGNAL_API = 'https://onesignal.com/api/v1/notifications';
const APP_URL = 'https://omideno7.github.io/omideno7-app/';
const TZ = 'Europe/Zagreb';

const TYPE = process.env.NOTIFICATION_TYPE;
const IS_MANUAL = process.env.GITHUB_EVENT_NAME === 'workflow_dispatch' || process.env.MANUAL_TEST === 'true';

const APP_ID = process.env.ONESIGNAL_APP_ID;
const API_KEY = process.env.ONESIGNAL_REST_API_KEY;

const CONFIG = {
  'daily-word': {
    mode: 'local-time',
    localTime: '07:00:00',
    url: `${APP_URL}?open=daily-word`,
    headings: {
      en: 'Daily Word is ready',
      fa: 'کلام روزانه آماده است',
      hr: 'Dnevna riječ je spremna'
    },
    contents: {
      en: 'Start your day with the Word of God. Open today’s daily message.',
      fa: 'روز خود را با کلام خدا آغاز کنید. پیام امروز را باز کنید و بخوانید.',
      hr: 'Započnite dan s Božjom Riječi. Otvorite današnju dnevnu poruku.'
    }
  },

  'faith-declaration': {
    mode: 'local-time',
    localTime: '10:00:00',
    url: `${APP_URL}?open=faith-declaration`,
    headings: {
      en: 'Faith declaration for today',
      fa: 'اعلان ایمان امروز',
      hr: 'Današnja izjava vjere'
    },
    contents: {
      en: 'Speak the Word of God over your day. Open today’s declaration of faith.',
      fa: 'کلام خدا را بر روز خود اعلام کنید. اعلان ایمان امروز را باز کنید.',
      hr: 'Izgovorite Božju Riječ nad svojim danom. Otvorite današnju izjavu vjere.'
    }
  },

  thanksgiving: {
    mode: 'local-time',
    localTime: '12:00:00',
    url: `${APP_URL}?open=thanksgiving`,
    headings: {
      en: 'Thanksgiving time',
      fa: 'زمان شکرگزاری',
      hr: 'Vrijeme zahvaljivanja'
    },
    contents: {
      en: 'Take a moment to thank the Lord and write your thanksgiving today.',
      fa: 'لحظه‌ای برای شکرگزاری از خداوند وقت بگذارید و شکرگزاری امروز خود را بنویسید.',
      hr: 'Odvojite trenutak da zahvalite Gospodinu i zapišete svoju zahvalnost danas.'
    }
  },

  'morning-prayer-reminder': {
    mode: 'zagreb-window',
    target: { hour: 4, minute: 30, days: 'daily', maxLateMinutes: 8 },
    url: 'https://join.freeconferencecall.com/omideno7church',
    headings: {
      en: 'Morning prayer meeting',
      fa: 'جلسه دعای صبحگاهی',
      hr: 'Jutarnji molitveni sastanak'
    },
    contents: {
      en: 'Today’s morning prayer meeting starts at 5:00 AM Central European Time. Please prepare a few minutes early.',
      fa: 'جلسه دعای صبحگاهی امروز ساعت ۵:۰۰ صبح به وقت اروپای مرکزی آغاز می‌شود. لطفاً چند دقیقه زودتر آماده باشید.',
      hr: 'Današnji jutarnji molitveni sastanak počinje u 5:00 ujutro po srednjoeuropskom vremenu. Molimo budite spremni nekoliko minuta ranije.'
    }
  },

  'sunday-service-reminder': {
    mode: 'zagreb-window',
    target: { hour: 19, minute: 30, days: 'sunday', maxLateMinutes: 10 },
    url: 'https://join.freeconferencecall.com/omideno7church',
    headings: {
      en: 'Sunday church service',
      fa: 'جلسه کلیسای یکشنبه',
      hr: 'Nedjeljna crkvena služba'
    },
    contents: {
      en: 'Today’s Sunday church service starts at 8:00 PM Central European Time. Please prepare your heart to worship.',
      fa: 'جلسه کلیسای یکشنبه امروز ساعت ۸:۰۰ شب به وقت اروپای مرکزی آغاز می‌شود. دل خود را برای پرستش آماده کنید.',
      hr: 'Današnja nedjeljna crkvena služba počinje u 20:00 po srednjoeuropskom vremenu. Pripremite svoje srce za štovanje.'
    }
  }
};

function getZagrebParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return {
    weekday: map.weekday,
    hour: Number(map.hour),
    minute: Number(map.minute)
  };
}

function minutesSinceMidnight({ hour, minute }) {
  return hour * 60 + minute;
}

function shouldSendZagrebWindow(cfg) {
  if (IS_MANUAL) return { ok: true, reason: 'Manual run: sending immediately for test.' };

  const now = getZagrebParts();
  if (cfg.target.days === 'sunday' && now.weekday !== 'Sun') {
    return { ok: false, reason: `Not Sunday in ${TZ}. Current day: ${now.weekday}` };
  }

  const current = minutesSinceMidnight(now);
  const target = cfg.target.hour * 60 + cfg.target.minute;
  const diff = current - target;

  if (diff < 0) {
    return { ok: false, reason: `Too early in ${TZ}. Current ${now.hour}:${String(now.minute).padStart(2, '0')}, target ${cfg.target.hour}:${String(cfg.target.minute).padStart(2, '0')}.` };
  }

  if (diff > cfg.target.maxLateMinutes) {
    return { ok: false, reason: `Too late in ${TZ}; skipping to avoid wrong reminder. Current ${now.hour}:${String(now.minute).padStart(2, '0')}, target ${cfg.target.hour}:${String(cfg.target.minute).padStart(2, '0')}, late by ${diff} minutes.` };
  }

  return { ok: true, reason: `Within allowed window in ${TZ}. Late by ${diff} minutes.` };
}

function buildPayload(cfg) {
  const base = {
    app_id: APP_ID,
    included_segments: ['Subscribed Users'],
    headings: cfg.headings,
    contents: cfg.contents,
    url: cfg.url,
    data: { target: TYPE, source: 'github-actions-v61.7' }
  };

  if (cfg.mode === 'local-time' && !IS_MANUAL) {
    return {
      ...base,
      delayed_option: 'timezone',
      delivery_time_of_day: cfg.localTime
    };
  }

  return base;
}

async function main() {
  if (!TYPE || !CONFIG[TYPE]) {
    console.error(`Unknown NOTIFICATION_TYPE: ${TYPE}`);
    console.error(`Allowed types: ${Object.keys(CONFIG).join(', ')}`);
    process.exit(1);
  }
  if (!APP_ID || !API_KEY) {
    console.error('Missing ONESIGNAL_APP_ID or ONESIGNAL_REST_API_KEY GitHub Secret.');
    process.exit(1);
  }

  const cfg = CONFIG[TYPE];
  console.log(`[Omideno7 notifications] type=${TYPE}`);

  if (cfg.mode === 'zagreb-window') {
    const gate = shouldSendZagrebWindow(cfg);
    console.log(gate.reason);
    if (!gate.ok) return;
  } else {
    console.log(IS_MANUAL
      ? 'Manual run: sending immediately for test.'
      : `Scheduling with OneSignal local timezone delivery at ${cfg.localTime}.`);
  }

  const payload = buildPayload(cfg);

  const res = await fetch(ONE_SIGNAL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  const body = await res.text();
  console.log(`OneSignal status: ${res.status}`);
  console.log(body);

  if (!res.ok) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
