/* OmideNo7 V63.90 - Registration + School Admin Fix */
(function () {
  'use strict';

  const VERSION = 'V63.90 Registration School Admin Fix';
  const ACCESS_TABLE = 'access_requests';
  const SCHOOL_TABLE = 'school_students';

  function lang() {
    const l = (localStorage.getItem('lang') || localStorage.getItem('omideno7_lang') || document.documentElement.lang || navigator.language || 'fa').toLowerCase();
    if (l.includes('hr') || l.includes('cro')) return 'hr';
    if (l.includes('en')) return 'en';
    return 'fa';
  }

  const TXT = {
    fa: {
      waiting: 'در انتظار تأیید ادمین',
      saved: 'درخواست شما با موفقیت ثبت شد و در انتظار تأیید ادمین است.',
      saving: 'در حال ذخیره‌سازی...',
      noSupabase: 'خطا: اتصال Supabase آماده نیست. لطفاً صفحه را دوباره بارگذاری کنید.',
      realError: 'خطای واقعی ذخیره‌سازی: ',
      requiredEmail: 'لطفاً ایمیل را وارد کنید.',
      requiredName: 'لطفاً نام کامل را وارد کنید.'
    },
    en: {
      waiting: 'Waiting for admin approval',
      saved: 'Your request was saved successfully and is waiting for admin approval.',
      saving: 'Saving...',
      noSupabase: 'Error: Supabase connection is not ready. Please reload the page.',
      realError: 'Real save error: ',
      requiredEmail: 'Please enter your email.',
      requiredName: 'Please enter your full name.'
    },
    hr: {
      waiting: 'Čeka odobrenje administratora',
      saved: 'Vaš zahtjev je uspješno spremljen i čeka odobrenje administratora.',
      saving: 'Spremanje...',
      noSupabase: 'Greška: Supabase veza nije spremna. Ponovno učitajte stranicu.',
      realError: 'Stvarna greška spremanja: ',
      requiredEmail: 'Unesite e-mail.',
      requiredName: 'Unesite puno ime.'
    }
  };

  function t(k) {
    return (TXT[lang()] || TXT.fa)[k] || k;
  }

  function client() {
    return window.supabaseClient ||
      window.SUPABASE_CLIENT ||
      window.omideno7Supabase ||
      window.OMIDENO7_SUPABASE ||
      window.sb ||
      null;
  }

  function notify(msg, isError) {
    alert(msg);
    console[isError ? 'error' : 'log']('[OmideNo7 V63.90]', msg);
  }

  function getValue(names) {
    for (const n of names) {
      const el = document.querySelector(`[name="${n}"], #${n}, [data-field="${n}"]`);
      if (el && el.value) return el.value.trim();
    }
    return '';
  }

  async function saveAccessRequest() {
    const sb = client();
    if (!sb || !sb.from) throw new Error(t('noSupabase'));

    const fullName =
      getValue(['full_name', 'fullname', 'name', 'firstName']) ||
      getValue(['first_name', 'firstName']) + ' ' + getValue(['last_name', 'lastName']);

    const email = getValue(['email', 'user_email']);
    const phone = getValue(['phone', 'mobile']);
    const country = getValue(['country', 'origin']);

    if (!email) throw new Error(t('requiredEmail'));
    if (!fullName.trim()) throw new Error(t('requiredName'));

    const payload = {
      full_name: fullName.trim(),
      email: email.toLowerCase(),
      phone: phone || null,
      country: country || null,
      status: 'pending',
      request_type: 'meeting_access',
      source: 'newhope7_app_v63_90',
      created_at: new Date().toISOString()
    };

    const res = await sb.from(ACCESS_TABLE).insert(payload).select().single();
    if (res.error) throw res.error;

    localStorage.setItem('omideno7_meeting_request_status', 'pending');
    localStorage.setItem('omideno7_last_registration_email', email.toLowerCase());

    return res.data;
  }

  async function saveSchoolStudent() {
    const sb = client();
    if (!sb || !sb.from || !sb.auth) throw new Error(t('noSupabase'));

    const sessionRes = await sb.auth.getSession();
    const user = sessionRes && sessionRes.data && sessionRes.data.session && sessionRes.data.session.user;

    const fullName =
      getValue(['full_name', 'fullname', 'name']) ||
      getValue(['first_name', 'firstName']) + ' ' + getValue(['last_name', 'lastName']);

    const email = getValue(['email', 'user_email']) || (user && user.email) || '';
    const phone = getValue(['phone', 'mobile']);
    const country = getValue(['country']);

    if (!email) throw new Error(t('requiredEmail'));
    if (!fullName.trim()) throw new Error(t('requiredName'));

    const payload = {
      user_id: user ? user.id : null,
      full_name: fullName.trim(),
      email: email.toLowerCase(),
      phone: phone || null,
      country: country || null,
      status: 'pending_review',
      registered_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const res = await sb.from(SCHOOL_TABLE).upsert(payload, { onConflict: 'email' }).select().single();
    if (res.error) throw res.error;

    localStorage.setItem('omideno7_school_status', 'pending_review');
    return res.data;
  }

  function showWaitingBox(form) {
    if (!form) return;
    form.style.display = 'none';

    const box = document.createElement('div');
    box.style.padding = '18px';
    box.style.margin = '14px 0';
    box.style.borderRadius = '14px';
    box.style.background = '#eef7ff';
    box.style.border = '1px solid #b6dcff';
    box.style.fontWeight = '700';
    box.textContent = t('waiting');

    form.parentNode.insertBefore(box, form.nextSibling);
  }

  document.addEventListener('submit', async function (e) {
    const form = e.target;
    if (!form || !form.querySelector) return;

    const text = (form.innerText || form.textContent || '').toLowerCase();
    const html = (form.outerHTML || '').toLowerCase();

    const isSchool =
      html.includes('school') ||
      html.includes('school_students') ||
      text.includes('school') ||
      text.includes('مدرسه') ||
      text.includes('škola');

    const isMeeting =
      html.includes('meeting') ||
      html.includes('access') ||
      text.includes('meeting') ||
      text.includes('جلسه') ||
      text.includes('کد') ||
      text.includes('sastanak');

    if (!isSchool && !isMeeting) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    try {
      notify(t('saving'), false);

      if (isSchool) {
        await saveSchoolStudent();
      } else {
        await saveAccessRequest();
      }

      showWaitingBox(form);
      notify(t('saved'), false);
    } catch (err) {
      notify(t('realError') + (err.message || JSON.stringify(err)), true);
    }
  }, true);

  window.OMIDENO7_V6390_REGISTRATION_FIX = {
    version: VERSION,
    saveAccessRequest,
    saveSchoolStudent
  };

  console.log('[OmideNo7]', VERSION, 'loaded');
})();
