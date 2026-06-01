/* Omideno7 Church - Dynamic OneSignal notification sender
 * V61.2: supports scheduled + manual notification types and Zagreb-time guard.
 * Required env:
 *   ONESIGNAL_APP_ID
 *   ONESIGNAL_REST_API_KEY
 *   NOTIFICATION_TYPE
 * Optional env for scheduled workflows:
 *   TARGET_LOCAL_HOUR, TARGET_LOCAL_MINUTE, TARGET_LOCAL_WEEKDAY (0=Sunday)
 */

const APP_URL = 'https://omideno7.github.io/omideno7-app/';
const TYPE = process.env.NOTIFICATION_TYPE;
const IS_SCHEDULE = process.env.GITHUB_EVENT_NAME === 'schedule';

function normalizeType(type) {
  return String(type || '').trim().toLowerCase().replace(/_/g, '-');
}

function getZagrebParts() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zagreb',
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short'
  }).formatToParts(new Date());
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    hour: Number(map.hour),
    minute: Number(map.minute),
    weekday: weekdayMap[map.weekday]
  };
}

function shouldSendNow() {
  if (!IS_SCHEDULE) return true; // manual Run workflow should always test-send
  const targetHour = process.env.TARGET_LOCAL_HOUR;
  const targetMinute = process.env.TARGET_LOCAL_MINUTE;
  const targetWeekday = process.env.TARGET_LOCAL_WEEKDAY;
  if (targetHour == null || targetMinute == null) return true;
  const now = getZagrebParts();
  const hourOk = now.hour === Number(targetHour);
  const minuteOk = now.minute === Number(targetMinute);
  const weekdayOk = targetWeekday == null || now.weekday === Number(targetWeekday);
  if (!hourOk || !minuteOk || !weekdayOk) {
    console.log(`Skipped: Zagreb time is ${String(now.hour).padStart(2, '0')}:${String(now.minute).padStart(2, '0')} weekday=${now.weekday}; target=${targetHour}:${targetMinute}${targetWeekday != null ? ` weekday=${targetWeekday}` : ''}.`);
    return false;
  }
  return true;
}

const NOTIFICATIONS = {
  'daily-word': {
    url: APP_URL + '?open=daily-word',
    headings: { en: 'Daily Word', fa: 'کلام روزانه', hr: 'Dnevna riječ' },
    contents: {
      en: 'Your Daily Word is ready. Open it now and strengthen your faith today.',
      fa: 'کلام روزانه امروز آماده است. آن را باز کنید و ایمان خود را تقویت نمایید.',
      hr: 'Dnevna riječ je spremna. Otvorite je sada i ojačajte svoju vjeru danas.'
    }
  },
  'thanksgiving': {
    url: APP_URL + '?open=thanksgiving',
    headings: { en: 'Thanksgiving Journey', fa: 'مسیر شکرگزاری', hr: 'Put zahvaljivanja' },
    contents: {
      en: 'Take a moment today to give thanks and write what God has done in your life.',
      fa: 'امروز زمانی را برای شکرگزاری جدا کنید و آنچه خداوند در زندگی شما کرده است بنویسید.',
      hr: 'Odvojite trenutak za zahvalnost i zapišite što je Bog učinio u vašem životu.'
    }
  },
  'faith-declaration': {
    url: APP_URL + '?open=faith-declaration',
    headings: { en: 'Faith Declaration', fa: 'اعلان ایمان', hr: 'Izjava vjere' },
    contents: {
      en: 'Your faith declaration for today is ready. Speak the Word with boldness.',
      fa: 'اعلان ایمان امروز آماده است. کلام خدا را با جسارت اعلام کنید.',
      hr: 'Današnja izjava vjere je spremna. Govorite Božju riječ s odvažnošću.'
    }
  },
  'morning-prayer-reminder': {
    url: APP_URL + '?open=morning-prayer',
    headings: { en: 'Morning Prayer Reminder', fa: 'یادآوری دعای صبحگاهی', hr: 'Podsjetnik za jutarnju molitvu' },
    contents: {
      en: 'Morning prayer starts in 30 minutes. Prepare your heart to pray with the church.',
      fa: 'جلسه دعای صبحگاهی تا ۳۰ دقیقه دیگر آغاز می‌شود. قلب خود را برای دعا با کلیسا آماده کنید.',
      hr: 'Jutarnja molitva počinje za 30 minuta. Pripremite svoje srce za molitvu s crkvom.'
    }
  },
  'sunday-service-reminder': {
    url: APP_URL + '?open=sunday-service',
    headings: { en: 'Sunday Service Reminder', fa: 'یادآوری جلسه یکشنبه', hr: 'Podsjetnik za nedjeljnu službu' },
    contents: {
      en: 'Sunday service starts in 30 minutes. Prepare to join the church gathering.',
      fa: 'جلسه کلیسا تا ۳۰ دقیقه دیگر آغاز می‌شود. خود را برای حضور در جلسه آماده کنید.',
      hr: 'Nedjeljna služba počinje za 30 minuta. Pripremite se za zajedništvo crkve.'
    }
  }
};

async function main() {
  const type = normalizeType(TYPE);
  if (!type) throw new Error('Missing NOTIFICATION_TYPE');
  const notification = NOTIFICATIONS[type];
  if (!notification) {
    throw new Error(`Unknown NOTIFICATION_TYPE: ${type}. Supported: ${Object.keys(NOTIFICATIONS).join(', ')}`);
  }

  const appId = process.env.ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;
  if (!appId) throw new Error('Missing ONESIGNAL_APP_ID secret');
  if (!apiKey) throw new Error('Missing ONESIGNAL_REST_API_KEY secret');

  if (!shouldSendNow()) return;

  const payload = {
    app_id: appId,
    included_segments: ['Subscribed Users'],
    headings: notification.headings,
    contents: notification.contents,
    url: notification.url
  };

  console.log(`Sending Omideno7 notification: ${type}`);
  const res = await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Basic ${apiKey}`
    },
    body: JSON.stringify(payload)
  });
  const body = await res.text();
  console.log(`OneSignal status: ${res.status}`);
  console.log(body);
  if (!res.ok) throw new Error(`OneSignal request failed with HTTP ${res.status}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
