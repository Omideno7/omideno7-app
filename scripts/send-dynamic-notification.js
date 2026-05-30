const fs = require("fs");
const path = require("path");
const vm = require("vm");

const APP_URL = "https://omideno7.github.io/omideno7-app/";
const TYPE = process.env.NOTIFICATION_TYPE || process.argv[2] || "daily-word";
const ONE_SIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONE_SIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

if (!ONE_SIGNAL_APP_ID || !ONE_SIGNAL_REST_API_KEY) {
  console.error("Missing ONESIGNAL_APP_ID or ONESIGNAL_REST_API_KEY.");
  process.exit(1);
}

const LANGS = [
  { code: "fa", label: "Persian" },
  { code: "en", label: "English" },
  { code: "hr", label: "Croatian" },
];

function loadWindowData(filename, property) {
  const code = fs.readFileSync(path.join(process.cwd(), filename), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename });

  if (!sandbox.window[property]) {
    throw new Error(`Could not load window.${property} from ${filename}`);
  }

  return sandbox.window[property];
}

function getLocalDayNumber(max) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Zagreb",
    day: "2-digit",
  }).formatToParts(new Date());

  const day = parseInt(parts.find((p) => p.type === "day").value, 10);
  return ((day - 1) % max) + 1;
}

function text(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en || obj.fa || obj.hr || "";
}

function shortText(value, max = 135) {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).trim() + "…";
}

function buildDailyWord(lang) {
  const data = loadWindowData("daily-messages-v14.js", "dailyMessages");
  const day = getLocalDayNumber(30);
  const item = data.find((x) => x.day === day) || data[0];

  const titles = {
    fa: `پیام روزانه: ${text(item.title, "fa")}`,
    en: `Daily Word: ${text(item.title, "en")}`,
    hr: `Dnevna riječ: ${text(item.title, "hr")}`,
  };

  const prefix = {
    fa: "بخشی از پیام امروز: ",
    en: "Preview of today’s message: ",
    hr: "Pregled današnje poruke: ",
  };

  return {
    title: titles[lang],
    message: prefix[lang] + shortText(text(item.message, lang), 120),
    url: `${APP_URL}?page=word&v=26`,
  };
}

function buildThanksgiving(lang) {
  const data = loadWindowData("thanksgiving-v22.js", "thanksgivingCourse");
  const day = getLocalDayNumber(28);
  const item = (data.days || []).find((x) => x.day === day) || data.days[0];

  const titles = {
    fa: `شکرگزاری روز ${day}: ${text(item.title, "fa")}`,
    en: `Thanksgiving Day ${day}: ${text(item.title, "en")}`,
    hr: `Zahvalnost dan ${day}: ${text(item.title, "hr")}`,
  };

  const prefix = {
    fa: "تمرین امروز: ",
    en: "Today’s exercise: ",
    hr: "Današnja vježba: ",
  };

  return {
    title: titles[lang],
    message: prefix[lang] + shortText(text(item.instruction, lang), 120),
    url: `${APP_URL}?page=thanksgiving&v=26`,
  };
}

function buildDeclaration(lang) {
  const data = loadWindowData("declarations-v14.js", "declarationsData");
  const day = getLocalDayNumber(30);
  const item = data.find((x) => x.day === day) || data[0];

  const titles = {
    fa: `اعلان ایمان روز ${day}: ${text(item.title, "fa")}`,
    en: `Faith Declaration Day ${day}: ${text(item.title, "en")}`,
    hr: `Izjava vjere dan ${day}: ${text(item.title, "hr")}`,
  };

  const prefix = {
    fa: "امروز اعلام کن: ",
    en: "Declare today: ",
    hr: "Izjavi danas: ",
  };

  return {
    title: titles[lang],
    message: prefix[lang] + shortText(text(item.declaration, lang), 120),
    url: `${APP_URL}?page=declarations&v=26`,
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
    filters: [
      {
        field: "tag",
        key: "language",
        relation: "=",
        value: lang,
      },
    ],
    headings: {
      en: built.title,
    },
    contents: {
      en: built.message,
    },
    url: built.url,
  };

  const res = await fetch("https://api.onesignal.com/notifications", {
    method: "POST",
    headers: {
      Authorization: `Key ${ONE_SIGNAL_REST_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
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
  for (const lang of LANGS.map((l) => l.code)) {
    const built = buildPayload(lang);
    await sendOneSignal(lang, built);
  }
})();
