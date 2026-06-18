/* OmideNo7 V63.91 - Admin Panel Stability Fix */
(function () {
  'use strict';

  const VERSION = 'V63.91 Admin Panel Stability Fix';
  const TABLE = 'access_requests';

  function lang() {
    const l = (localStorage.getItem('lang') || localStorage.getItem('omideno7_lang') || document.documentElement.lang || navigator.language || 'fa').toLowerCase();
    if (l.includes('hr') || l.includes('cro')) return 'hr';
    if (l.includes('en')) return 'en';
    return 'fa';
  }

  const TXT = {
    fa: {
      title: 'درخواست‌های دریافت لینک و کد جلسه',
      desc: 'درخواست‌های جدید اعضا برای دریافت لینک و کد جلسه در اینجا نمایش داده می‌شود.',
      refresh: 'به‌روزرسانی',
      pending: 'در انتظار تأیید',
      approved: 'تأیید شد',
      rejected: 'رد شد',
      approve: 'تأیید',
      reject: 'رد',
      empty: 'درخواستی وجود ندارد.',
      error: 'خطا در بارگذاری درخواست‌ها: ',
      adminOnly: 'این بخش فقط برای ادمین است.'
    },
    en: {
      title: 'Meeting Link & Code Requests',
      desc: 'New member requests for meeting access are shown here.',
      refresh: 'Refresh',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      approve: 'Approve',
      reject: 'Reject',
      empty: 'No requests found.',
      error: 'Error loading requests: ',
      adminOnly: 'Admin only.'
    },
    hr: {
      title: 'Zahtjevi za link i kod sastanka',
      desc: 'Ovdje se prikazuju novi zahtjevi članova za pristup sastanku.',
      refresh: 'Osvježi',
      pending: 'Na čekanju',
      approved: 'Odobreno',
      rejected: 'Odbijeno',
      approve: 'Odobri',
      reject: 'Odbij',
      empty: 'Nema zahtjeva.',
      error: 'Greška pri učitavanju zahtjeva: ',
      adminOnly: 'Samo za administratora.'
    }
  };

  function t(k) {
    return (TXT[lang()] || TXT.fa)[k] || k;
  }

  function sb() {
    return window.supabaseClient ||
      window.SUPABASE_CLIENT ||
      window.omideno7Supabase ||
      window.OMIDENO7_SUPABASE ||
      window.sb ||
      null;
  }

  function isAdminEmail(email) {
    email = String(email || '').toLowerCase();
    return email === 'omideno7church@gmail.com' ||
      email === 'yuhana1360@gmail.com' ||
      email === 'mehdi.firooz80@gmail.com';
  }

  async function currentUser() {
    const client = sb();
    if (!client || !client.auth) return null;
    const r = await client.auth.getUser();
    return r && r.data ? r.data.user : null;
  }

  function hideOldMorePanel() {
    document.querySelectorAll('section, article, div, .card').forEach(el => {
      const tx = (el.innerText || '').toLowerCase();
      if (
        tx.includes('درخواست‌های دریافت لینک و کد جلسه') ||
        tx.includes('meeting link') ||
        tx.includes('access requests') ||
        tx.includes('zahtjevi za link')
      ) {
        if (!el.id || el.id !== 'v6391SchoolAdminRequests') {
          el.style.display = 'none';
          el.setAttribute('data-v6391-hidden-old-admin', '1');
        }
      }
    });
  }

  function findSchoolAdminArea() {
    return document.getElementById('adminSchoolArea') ||
      document.getElementById('schoolAdminArea') ||
      document.getElementById('adminMainArea') ||
      document.getElementById('school') ||
      document.querySelector('[data-school-view="admin"]') ||
      document.querySelector('#school .school-card') ||
      document.querySelector('#school');
  }

  function statusLabel(s) {
    s = String(s || 'pending').toLowerCase();
    if (s.includes('approved')) return t('approved');
    if (s.includes('reject')) return t('rejected');
    return t('pending');
  }

  function card(row) {
    const id = row.id || '';
    const name = row.full_name || row.name || row.first_name || '-';
    const email = row.email || '-';
    const country = row.country || '-';
    const status = row.status || 'pending';

    return `
      <div class="v6391-request-card" data-id="${id}">
        <div class="v6391-row">
          <strong>${name}</strong>
          <span class="v6391-badge">${statusLabel(status)}</span>
        </div>
        <div class="v6391-email">${email}</div>
        <div class="v6391-small">${country}</div>
        <div class="v6391-actions">
          <button type="button" data-v6391-approve="${id}">${t('approve')}</button>
          <button type="button" data-v6391-reject="${id}">${t('reject')}</button>
        </div>
      </div>
    `;
  }

  function ensureStyle() {
    if (document.getElementById('v6391Style')) return;
    const st = document.createElement('style');
    st.id = 'v6391Style';
    st.textContent = `
      #v6391SchoolAdminRequests{
        direction: inherit;
        margin:18px 0;
        padding:18px;
        border-radius:22px;
        background:#fff;
        border:2px solid #06146d;
        box-shadow:0 8px 24px rgba(0,0,0,.08);
      }
      #v6391SchoolAdminRequests h3{margin:0 0 8px;color:#06146d;font-size:22px;font-weight:900}
      #v6391SchoolAdminRequests p{margin:0 0 14px;color:#26324f;font-weight:700;line-height:1.7}
      .v6391-toolbar{display:flex;gap:10px;align-items:center;margin:12px 0;flex-wrap:wrap}
      .v6391-toolbar button,.v6391-actions button{
        border:0;border-radius:14px;padding:10px 16px;font-weight:900;cursor:pointer;background:#06146d;color:white
      }
      .v6391-actions button:last-child{background:#9b1c1c}
      .v6391-count{padding:10px 14px;border-radius:14px;background:#fff3df;color:#8a3b13;font-weight:900}
      .v6391-request-card{
        border:1px solid #dde4f0;border-radius:18px;padding:14px;margin:12px 0;background:#fbfdff;
      }
      .v6391-row{display:flex;justify-content:space-between;gap:12px;align-items:center}
      .v6391-row strong{font-size:18px;color:#06146d}
      .v6391-badge{background:#fff4cf;color:#8a6200;border-radius:999px;padding:7px 12px;font-weight:900}
      .v6391-email{font-weight:900;color:#06146d;margin-top:8px;word-break:break-word}
      .v6391-small{font-size:13px;color:#657084;margin-top:5px}
      .v6391-actions{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}
    `;
    document.head.appendChild(st);
  }

  async function loadRows() {
    const client = sb();
    if (!client || !client.from) throw new Error('Supabase client not available');

    const res = await client
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (res.error) throw res.error;
    return res.data || [];
  }

  async function updateStatus(id, status) {
    const client = sb();
    const res = await client
      .from(TABLE)
      .update({ status: status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (res.error) throw res.error;
  }

  async function renderPanel() {
    ensureStyle();
    hideOldMorePanel();

    const area = findSchoolAdminArea();
    if (!area) return;

    let panel = document.getElementById('v6391SchoolAdminRequests');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'v6391SchoolAdminRequests';
      area.appendChild(panel);
    }

    try {
      const user = await currentUser();
      if (!user || !isAdminEmail(user.email)) {
        panel.innerHTML = `<h3>${t('title')}</h3><p>${t('adminOnly')}</p>`;
        return;
      }

      const rows = await loadRows();
      const pending = rows.filter(r => String(r.status || 'pending').toLowerCase() === 'pending').length;

      panel.innerHTML = `
        <h3>🛡️ ${t('title')}</h3>
        <p>${t('desc')}</p>
        <div class="v6391-toolbar">
          <button type="button" id="v6391Refresh">${t('refresh')}</button>
          <span class="v6391-count">${t('pending')}: ${pending}</span>
        </div>
        <div>
          ${rows.length ? rows.map(card).join('') : `<p>${t('empty')}</p>`}
        </div>
      `;

      document.getElementById('v6391Refresh').onclick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        renderPanel();
      };

      panel.querySelectorAll('[data-v6391-approve]').forEach(btn => {
        btn.onclick = async function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          await updateStatus(btn.getAttribute('data-v6391-approve'), 'approved');
          await renderPanel();
        };
      });

      panel.querySelectorAll('[data-v6391-reject]').forEach(btn => {
        btn.onclick = async function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          await updateStatus(btn.getAttribute('data-v6391-reject'), 'rejected');
          await renderPanel();
        };
      });

    } catch (err) {
      panel.innerHTML = `<h3>${t('title')}</h3><p>${t('error')}${err.message || err}</p>`;
    }
  }

  function boot() {
    hideOldMorePanel();
    renderPanel();
  }

  document.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('load', boot);

  document.addEventListener('click', function () {
    setTimeout(function () {
      hideOldMorePanel();
      renderPanel();
    }, 350);
  }, true);

  setInterval(function () {
    hideOldMorePanel();
  }, 1500);

  window.OMIDENO7_V6391_ADMIN_PANEL_FIX = {
    version: VERSION,
    renderPanel,
    hideOldMorePanel
  };

  console.log('[OmideNo7]', VERSION, 'loaded');
})();
