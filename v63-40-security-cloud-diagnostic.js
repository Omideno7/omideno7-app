/* Omideno7 V63.40 — Secure Cloud Foundation Beta Diagnostic
   Scope: beta.html only. No automatic cloud writes. No app-startup sync.
   Purpose: safely test Supabase Auth, RLS, and cloud backup tables before enabling for all users.
*/
(function(){
  'use strict';

  var VERSION = 'V63.40 Secure Cloud Foundation Beta';
  var ADMIN_EMAIL = 'omideno7church@gmail.com';
  var LOG_KEY = 'omideno7_v6340_beta_cloud_diag_log';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6340/i.test(location.search);
  }

  function lang(){
    try { return localStorage.getItem('lang') || document.documentElement.lang || 'fa'; }
    catch(e){ return 'fa'; }
  }

  function t(key){
    var L = lang();
    var fa = {
      title:'پنل تست امنیت و پشتیبان ابری — نسخه بتا',
      intro:'این پنل فقط برای تست ادمین است. هیچ ذخیره خودکاری انجام نمی‌شود و اگر خطا باشد، اپ اصلی خراب نمی‌شود.',
      check:'بررسی حساب و اتصال',
      sync:'همگام‌سازی تستی اطلاعات من',
      clear:'پاک کردن گزارش تست',
      statusReady:'آماده تست. اول بررسی حساب را بزنید.',
      noClient:'کلاینت Supabase در صفحه پیدا نشد. یعنی باید در مرحله بعد کلاینت مدرسه را به صورت کنترل‌شده برای بتا در دسترس کنیم.',
      notSigned:'کاربر وارد حساب نشده است. برای تست، اول در بخش مدرسه وارد شوید.',
      signed:'کاربر وارد شده است',
      dbOk:'اتصال و RLS پایه پاسخ داد.',
      syncOk:'همگام‌سازی تستی انجام شد. جدول‌های Supabase را Refresh کنید.',
      error:'خطا',
      privacy:'برای کاربران حساس: فقط اطلاعات ضروری ذخیره شود. نام واقعی و کشور اجباری نشود مگر برای مدرسه و با رضایت کاربر.',
      currentDay:'روز فعلی برنامه ۳۶۵',
      selectedDay:'روز انتخاب‌شده',
      language:'زبان'
    };
    var en = {
      title:'Security & Cloud Backup Test Panel — Beta',
      intro:'Admin-only beta panel. Nothing syncs automatically. Errors stay inside this panel and should not break the stable app.',
      check:'Check account and connection',
      sync:'Test sync my data',
      clear:'Clear test log',
      statusReady:'Ready for testing. Press Check account first.',
      noClient:'No Supabase client was found on this page. Next step: expose the school Supabase client safely for beta.',
      notSigned:'No signed-in user. Sign in through School first.',
      signed:'Signed-in user detected',
      dbOk:'Database connection and basic RLS responded.',
      syncOk:'Test sync completed. Refresh Supabase tables.',
      error:'Error',
      privacy:'For sensitive users: store only necessary data. Real names and country should not be mandatory except for school with consent.',
      currentDay:'Bible 365 current day',
      selectedDay:'Selected day',
      language:'Language'
    };
    var hr = {
      title:'Test sigurnosti i cloud sigurnosne kopije — Beta',
      intro:'Beta panel samo za administratora. Nema automatske sinkronizacije. Greške ostaju u ovom panelu.',
      check:'Provjeri račun i vezu',
      sync:'Testno sinkroniziraj moje podatke',
      clear:'Obriši testni zapis',
      statusReady:'Spremno za test. Prvo provjerite račun.',
      noClient:'Supabase klijent nije pronađen na ovoj stranici.',
      notSigned:'Korisnik nije prijavljen. Prvo se prijavite kroz Školu.',
      signed:'Prijavljeni korisnik pronađen',
      dbOk:'Baza i osnovni RLS su odgovorili.',
      syncOk:'Testna sinkronizacija završena. Osvježite Supabase tablice.',
      error:'Greška',
      privacy:'Za osjetljive korisnike: spremati samo nužne podatke.',
      currentDay:'Trenutni dan Biblija 365',
      selectedDay:'Odabrani dan',
      language:'Jezik'
    };
    var d = L === 'hr' ? hr : (L === 'en' ? en : fa);
    return d[key] || fa[key] || key;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function safeJSON(v, fallback){
    try { return JSON.parse(v); } catch(e){ return fallback; }
  }

  function logLine(msg, type){
    var entry = { at: new Date().toISOString(), type: type || 'info', message: String(msg || '') };
    var arr = safeJSON(localStorage.getItem(LOG_KEY) || '[]', []);
    arr.unshift(entry);
    arr = arr.slice(0, 25);
    try { localStorage.setItem(LOG_KEY, JSON.stringify(arr)); } catch(e){}
    renderLog();
  }

  function findSupabaseClient(){
    var candidates = ['supabaseClient','schoolSupabase','omideno7Supabase','supabaseDb','sb','SUPABASE_CLIENT'];
    for(var i=0;i<candidates.length;i++){
      var c = window[candidates[i]];
      if(c && c.auth && typeof c.auth.getUser === 'function' && typeof c.from === 'function') return c;
    }
    // Search shallow globals for an object shaped like a Supabase client.
    try{
      for(var k in window){
        if(!Object.prototype.hasOwnProperty.call(window,k)) continue;
        if(!/supabase|school|db|client/i.test(k)) continue;
        var obj = window[k];
        if(obj && obj.auth && typeof obj.auth.getUser === 'function' && typeof obj.from === 'function') return obj;
      }
    }catch(e){}
    return null;
  }

  function getBible365Local(){
    var keys = [
      'om7_bible365_current_day',
      'om7_bible365_view_day',
      'om7_bible365_selected_day_v6327',
      'om7_bible365_live_selected_day_v6329',
      'omideno7Bible365ManualDayV6325'
    ];
    function num(v){
      var n = parseInt(v,10); return isFinite(n) && n > 0 ? Math.min(n,365) : 1;
    }
    var current = 1;
    var selected = 1;
    try{
      current = num(localStorage.getItem('om7_bible365_current_day') || localStorage.getItem('om7_bible365_view_day') || '1');
      selected = num(localStorage.getItem('om7_bible365_view_day') || localStorage.getItem('om7_bible365_current_day') || '1');
    }catch(e){}
    return { current_day: current, selected_day: selected };
  }

  async function getUser(){
    var client = findSupabaseClient();
    if(!client) throw new Error(t('noClient'));
    var res = await client.auth.getUser();
    var user = res && res.data && res.data.user;
    if(!user) throw new Error(t('notSigned'));
    return { client: client, user: user };
  }

  async function checkAccount(){
    try{
      setStatus('checking', 'info');
      var got = await getUser();
      logLine(t('signed') + ': ' + (got.user.email || got.user.id), 'success');

      // RLS smoke test: select own settings, should not throw if table exists and policy is correct.
      var r = await got.client.from('user_app_settings').select('user_id,language,updated_at').limit(1);
      if(r.error) throw r.error;
      logLine(t('dbOk'), 'success');
      setStatus(t('dbOk'), 'success');
    }catch(e){
      setStatus(t('error') + ': ' + (e.message || e), 'error');
      logLine((e.message || e), 'error');
    }
  }

  async function syncNow(){
    try{
      setStatus('syncing...', 'info');
      var got = await getUser();
      var L = lang();
      var bible = getBible365Local();
      var now = new Date().toISOString();
      var email = got.user.email || '';
      var uid = got.user.id;

      var profile = await got.client.from('user_profiles').upsert({
        user_id: uid,
        email: email,
        display_name: email ? email.split('@')[0] : null,
        language: L,
        updated_at: now
      }, { onConflict: 'user_id' });
      if(profile.error) throw profile.error;

      var settings = await got.client.from('user_app_settings').upsert({
        user_id: uid,
        language: L,
        notifications_enabled: null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
        updated_at: now
      }, { onConflict: 'user_id' });
      if(settings.error) throw settings.error;

      var progress = await got.client.from('bible365_progress').upsert({
        user_id: uid,
        current_day: bible.current_day,
        selected_day: bible.selected_day,
        completed_days: [],
        last_read_at: now,
        updated_at: now
      }, { onConflict: 'user_id' });
      if(progress.error) throw progress.error;

      try{
        await got.client.from('security_audit_log').insert({
          user_id: uid,
          action: 'beta_manual_cloud_sync',
          details: { language: L, current_day: bible.current_day, selected_day: bible.selected_day, version: VERSION }
        });
      }catch(auditErr){}

      logLine(t('syncOk') + ' — ' + t('language') + ': ' + L + ', ' + t('currentDay') + ': ' + bible.current_day + ', ' + t('selectedDay') + ': ' + bible.selected_day, 'success');
      setStatus(t('syncOk'), 'success');
    }catch(e){
      setStatus(t('error') + ': ' + (e.message || e), 'error');
      logLine((e.message || e), 'error');
    }
  }

  function setStatus(msg, type){
    var el = document.getElementById('v6340CloudStatus');
    if(!el) return;
    el.textContent = msg;
    el.className = 'v6340-cloud-status ' + (type || 'info');
  }

  function renderLog(){
    var out = document.getElementById('v6340CloudLog');
    if(!out) return;
    var arr = safeJSON(localStorage.getItem(LOG_KEY) || '[]', []);
    out.innerHTML = arr.length ? arr.map(function(x){
      return '<div class="v6340-log-row '+esc(x.type)+'"><strong>'+esc(x.at.replace('T',' ').replace('Z',''))+'</strong><br>'+esc(x.message)+'</div>';
    }).join('') : '<p class="small">No test log yet.</p>';
  }

  function injectStyles(){
    if(document.getElementById('v6340CloudDiagStyle')) return;
    var st = document.createElement('style');
    st.id = 'v6340CloudDiagStyle';
    st.textContent = `
      .v6340-beta-ribbon{background:#06146D;color:#fff;text-align:center;font-weight:900;padding:8px 12px;position:sticky;top:0;z-index:10000;box-shadow:0 4px 14px rgba(0,0,0,.12)}
      .v6340-cloud-card{border-top:5px solid #D9A441;background:linear-gradient(160deg,#fff,#F7FFF8)}
      .v6340-cloud-status{padding:12px 14px;border-radius:14px;margin:12px 0;font-weight:800;background:#f5f7fa;color:#06146D;border:1px solid #E6EAF2;white-space:pre-wrap}
      .v6340-cloud-status.success{background:#ecfff0;color:#08751c;border-color:#baf2c6}.v6340-cloud-status.error{background:#fff0f0;color:#a40000;border-color:#ffd0d0}.v6340-cloud-status.info{background:#f5f7ff;color:#06146D;border-color:#dfe6fb}
      .v6340-log-row{font-size:13px;margin:8px 0;padding:10px;border-radius:12px;background:#fff;border:1px solid #E6EAF2}.v6340-log-row.error{border-color:#ffd0d0;background:#fff8f8}.v6340-log-row.success{border-color:#baf2c6;background:#fbfffc}
      .fa .v6340-cloud-card{direction:rtl;text-align:right}
    `;
    document.head.appendChild(st);
  }

  function addRibbon(){
    if(document.getElementById('v6340BetaRibbon')) return;
    var r = document.createElement('div');
    r.id = 'v6340BetaRibbon';
    r.className = 'v6340-beta-ribbon';
    r.textContent = 'BETA V63.40 — Security & Cloud Diagnostic';
    document.body.insertBefore(r, document.body.firstChild);
  }

  function renderPanel(){
    if(!isBeta()) return;
    injectStyles();
    addRibbon();
    var more = document.getElementById('more');
    if(!more) return;
    if(document.getElementById('v6340CloudDiagnosticPanel')) { renderLog(); return; }
    var footer = more.querySelector('.footer') || more.lastElementChild;
    var div = document.createElement('div');
    div.id = 'v6340CloudDiagnosticPanel';
    div.className = 'card v6340-cloud-card';
    div.innerHTML = '<h3>'+esc(t('title'))+'</h3>'+
      '<p>'+esc(t('intro'))+'</p>'+
      '<div id="v6340CloudStatus" class="v6340-cloud-status info">'+esc(t('statusReady'))+'</div>'+
      '<div class="btn-row">'+
      '<button type="button" class="btn primary" id="v6340CheckAccount">'+esc(t('check'))+'</button>'+
      '<button type="button" class="btn gold" id="v6340SyncNow">'+esc(t('sync'))+'</button>'+
      '<button type="button" class="btn light" id="v6340ClearLog">'+esc(t('clear'))+'</button>'+
      '</div>'+
      '<p class="small">'+esc(t('privacy'))+'</p>'+
      '<div id="v6340CloudLog"></div>';
    more.insertBefore(div, footer || null);
    document.getElementById('v6340CheckAccount').addEventListener('click', checkAccount);
    document.getElementById('v6340SyncNow').addEventListener('click', syncNow);
    document.getElementById('v6340ClearLog').addEventListener('click', function(){ localStorage.removeItem(LOG_KEY); renderLog(); setStatus(t('statusReady'),'info'); });
    renderLog();
  }

  document.addEventListener('DOMContentLoaded', renderPanel);
  window.addEventListener('load', renderPanel);
  document.addEventListener('click', function(){ setTimeout(renderPanel, 80); }, true);
  setTimeout(renderPanel, 300);
  setTimeout(renderPanel, 1200);
  window.OMIDENO7_V6340_BETA = { version: VERSION, findSupabaseClient: findSupabaseClient };
})();
