/* Omideno7 V59 - Q&A System (Supabase powered)
   Adds Biblical Q&A module without changing the rest of the app.
   Public submit + published anonymous answers + admin response panel.
*/
(function(){
  'use strict';

  const VERSION = 'V59.5';
  const SUPABASE_URL = 'https://uibhpgcsgcievktxmcfg.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_clP99PgnpuT6a5MCyDfVWQ_e_7wWYrk';
  const ADMIN_EMAIL = 'omideno7church@gmail.com';
  let supabase = null;
  let qaState = {
    tab: 'answers',
    category: 'all',
    search: '',
    adminMode: false,
    adminStatus: 'pending',
    session: null,
    questions: [],
    publicAnswers: [],
    categories: []
  };



  function isAdminEntry(){
    try{
      const params = new URLSearchParams(location.search || '');
      const fromUrl = params.get('qa_admin') === '1' || params.get('admin_app') === '1' || location.hash === '#qa-admin';
      if(fromUrl) localStorage.setItem('omideno7_admin_app','1');
      return fromUrl || localStorage.getItem('omideno7_admin_app') === '1';
    }catch(e){ return false; }
  }

  const I18N = {
    fa: {
      title: 'پرسش و پاسخ کتاب‌مقدسی', shortTitle:'پرسش و پاسخ',
      desc: 'سؤال خود را درباره ایمان، کتاب‌مقدس، دعا، خانواده، خدمت و زندگی مسیحی بفرستید. پاسخ‌ها پس از بررسی، بدون نام در اپ منتشر می‌شوند تا دیگران نیز برکت بگیرند.',
      ask:'ارسال پرسش', answers:'مشاهده پاسخ‌ها', admin:'ورود ادمین', back:'بازگشت',
      introTitle:'پرسش خود را با اطمینان بفرستید',
      intro:'اطلاعات شخصی شما فقط برای تیم خدمتی دیده می‌شود. اگر پاسخ برای عموم منتشر شود، نام، ایمیل و شماره تماس شما نمایش داده نخواهد شد.',
      name:'نام و نام خانوادگی', contact:'ایمیل یا شماره تماس', language:'زبان پرسش', category:'دسته‌بندی', question:'متن پرسش', allowPublic:'اجازه می‌دهم سؤال من بدون نام و اطلاعات شخصی در اپ منتشر شود.', submit:'ارسال پرسش', sending:'در حال ارسال...', sent:'پرسش شما با موفقیت ارسال شد. تیم خدمتی آن را بررسی خواهد کرد.', error:'خطا رخ داد. لطفاً دوباره تلاش کنید.', required:'لطفاً دسته‌بندی و متن پرسش را وارد کنید.',
      publicNotice:'در این بخش فقط سؤال‌ها و پاسخ‌های منتشرشده به‌صورت گمنام نمایش داده می‌شوند.', noAnswers:'هنوز پرسش و پاسخی منتشر نشده است.', search:'جستجو در پرسش‌ها...', allCategories:'همه دسته‌بندی‌ها',
      loginTitle:'ورود ادمین پرسش و پاسخ', email:'ایمیل ادمین', password:'رمز عبور', login:'ورود', logout:'خروج', loggedIn:'وارد شدید.', loginHelp:'فقط ایمیل ادمین کلیسا اجازه پاسخ و انتشار دارد.', adminPanel:'پنل پاسخگویی', pending:'در انتظار پاسخ', published:'منتشرشده', rejected:'رد شده', privateAnswered:'پاسخ خصوصی', load:'بارگذاری', noQuestions:'سؤالی در این وضعیت وجود ندارد.', originalQuestion:'سؤال اصلی خصوصی', publicQuestion:'متن سؤال برای انتشار عمومی', answer:'پاسخ', adminNote:'یادداشت داخلی ادمین', savePrivate:'ذخیره خصوصی', publish:'انتشار عمومی بدون نام', reject:'رد کردن', saved:'ذخیره شد.', privacy:'اطلاعات شخصی', status:'وضعیت', date:'تاریخ',
      contactUsTitle:'ارتباط با ما', contactUsDesc:'برای ارتباط با کلیسای امیدنو۷ از راه‌های زیر استفاده کنید.', contactEmail:'ایمیل کلیسا', contactWebsite:'وب اپ / وب‌سایت', contactInstagram:'اینستاگرام', contactYoutube:'یوتیوب', contactAddress:'آدرس کلیسا', contactPhone:'شماره تماس', contactOnline:'جلسه آنلاین',
      hrFallback:'نسخه کرواتی همین بخش فعال است.',
      categories: {
        faith_salvation:'ایمان و نجات', bible_theology:'کتاب‌مقدس و الهیات', prayer_spiritual_life:'دعا و زندگی روحانی', church_membership:'کلیسا و عضویت', marriage_family:'ازدواج و خانواده', sexual_relationship_marriage:'رابطه جنسی در ازدواج', sexual_purity_relationships:'پاکی جنسی و روابط پیش از ازدواج', sin_freedom:'گناه، وسوسه و آزادی', work_money_life_decisions:'کار، پول و تصمیم‌های زندگی', ministry_calling:'خدمت و دعوت الهی', private_sensitive:'موضوعات حساس و خصوصی', other:'سایر موضوعات'
      }
    },
    en: {
      title:'Biblical Questions & Answers', shortTitle:'Q&A',
      desc:'Submit your questions about faith, the Bible, prayer, family, ministry, and Christian life. After review, answers may be published anonymously in the app so others can also be blessed.',
      ask:'Submit a Question', answers:'View Answers', admin:'Admin Login', back:'Back',
      introTitle:'Ask your question with confidence',
      intro:'Your personal information is visible only to the ministry team. If an answer is published publicly, your name, email, and contact information will not be shown.',
      name:'Full name', contact:'Email or phone', language:'Question language', category:'Category', question:'Your question', allowPublic:'I allow my question to be published anonymously in the app without my name or personal information.', submit:'Submit Question', sending:'Sending...', sent:'Your question was submitted successfully. The ministry team will review it.', error:'Something went wrong. Please try again.', required:'Please choose a category and write your question.',
      publicNotice:'Only published anonymous questions and answers are shown here.', noAnswers:'No questions and answers have been published yet.', search:'Search questions...', allCategories:'All categories',
      loginTitle:'Q&A Admin Login', email:'Admin email', password:'Password', login:'Login', logout:'Logout', loggedIn:'You are logged in.', loginHelp:'Only the church admin email can answer and publish questions.', adminPanel:'Answering Panel', pending:'Pending', published:'Published', rejected:'Rejected', privateAnswered:'Private answer', load:'Load', noQuestions:'There are no questions in this status.', originalQuestion:'Private original question', publicQuestion:'Public question text', answer:'Answer', adminNote:'Internal admin note', savePrivate:'Save Private', publish:'Publish Anonymously', reject:'Reject', saved:'Saved.', privacy:'Personal information', status:'Status', date:'Date',
      contactUsTitle:'Contact Us', contactUsDesc:'Use the links below to contact Omideno7 Church.', contactEmail:'Church Email', contactWebsite:'Web App / Website', contactInstagram:'Instagram', contactYoutube:'YouTube', contactAddress:'Church Address', contactPhone:'Phone', contactOnline:'Online Meeting',
      categories: {
        faith_salvation:'Faith and Salvation', bible_theology:'Bible and Theology', prayer_spiritual_life:'Prayer and Spiritual Life', church_membership:'Church and Membership', marriage_family:'Marriage and Family', sexual_relationship_marriage:'Sexual Relationship in Marriage', sexual_purity_relationships:'Sexual Purity and Relationships Before Marriage', sin_freedom:'Sin, Temptation, and Freedom', work_money_life_decisions:'Work, Money, and Life Decisions', ministry_calling:'Ministry and Calling', private_sensitive:'Sensitive and Private Matters', other:'Other Topics'
      }
    },
    hr: {
      title:'Biblijska pitanja i odgovori', shortTitle:'Pitanja i odgovori',
      desc:'Pošaljite pitanja o vjeri, Bibliji, molitvi, obitelji, služenju i kršćanskom životu. Nakon pregleda, odgovori se mogu anonimno objaviti u aplikaciji kako bi i drugi bili blagoslovljeni.',
      ask:'Pošalji pitanje', answers:'Pogledaj odgovore', admin:'Prijava administratora', back:'Natrag',
      introTitle:'Postavite pitanje s povjerenjem',
      intro:'Vaši osobni podaci vidljivi su samo službenom timu. Ako se odgovor javno objavi, vaše ime, e-mail i kontakt podaci neće biti prikazani.',
      name:'Ime i prezime', contact:'E-mail ili telefon', language:'Jezik pitanja', category:'Kategorija', question:'Vaše pitanje', allowPublic:'Dopuštam da se moje pitanje anonimno objavi u aplikaciji bez mog imena i osobnih podataka.', submit:'Pošalji pitanje', sending:'Slanje...', sent:'Vaše pitanje je uspješno poslano. Službeni tim će ga pregledati.', error:'Došlo je do pogreške. Pokušajte ponovno.', required:'Odaberite kategoriju i napišite pitanje.',
      publicNotice:'Ovdje se prikazuju samo objavljena anonimna pitanja i odgovori.', noAnswers:'Još nema objavljenih pitanja i odgovora.', search:'Pretraži pitanja...', allCategories:'Sve kategorije',
      loginTitle:'Administratorska prijava za pitanja', email:'Admin e-mail', password:'Lozinka', login:'Prijava', logout:'Odjava', loggedIn:'Prijavljeni ste.', loginHelp:'Samo crkveni admin e-mail može odgovarati i objavljivati pitanja.', adminPanel:'Panel za odgovore', pending:'Na čekanju', published:'Objavljeno', rejected:'Odbijeno', privateAnswered:'Privatno odgovoreno', load:'Učitaj', noQuestions:'Nema pitanja u ovom statusu.', originalQuestion:'Privatno izvorno pitanje', publicQuestion:'Tekst pitanja za javnu objavu', answer:'Odgovor', adminNote:'Interna napomena admina', savePrivate:'Spremi privatno', publish:'Objavi anonimno', reject:'Odbij', saved:'Spremljeno.', privacy:'Osobni podaci', status:'Status', date:'Datum',
      contactUsTitle:'Kontaktirajte nas', contactUsDesc:'Koristite poveznice u nastavku za kontakt s crkvom Omideno7.', contactEmail:'E-mail crkve', contactWebsite:'Web aplikacija / web stranica', contactInstagram:'Instagram', contactYoutube:'YouTube', contactAddress:'Adresa crkve', contactPhone:'Telefon', contactOnline:'Online sastanak',
      categories: {
        faith_salvation:'Vjera i spasenje', bible_theology:'Biblija i teologija', prayer_spiritual_life:'Molitva i duhovni život', church_membership:'Crkva i članstvo', marriage_family:'Brak i obitelj', sexual_relationship_marriage:'Seksualni odnos u braku', sexual_purity_relationships:'Seksualna čistoća i odnosi prije braka', sin_freedom:'Grijeh, kušnja i sloboda', work_money_life_decisions:'Posao, novac i životne odluke', ministry_calling:'Služenje i poziv', private_sensitive:'Osjetljive i privatne teme', other:'Ostale teme'
      }
    }
  };

  const CATEGORY_IDS = ['faith_salvation','bible_theology','prayer_spiritual_life','church_membership','marriage_family','sexual_relationship_marriage','sexual_purity_relationships','sin_freedom','work_money_life_decisions','ministry_calling','private_sensitive','other'];

  function lang(){
    const stored = localStorage.getItem('lang') || document.documentElement.lang || 'fa';
    return ['fa','en','hr'].includes(stored) ? stored : 'fa';
  }
  function L(){ return I18N[lang()] || I18N.fa; }
  function txt(k){ return L()[k] || I18N.en[k] || k; }
  function catLabel(id){ return (L().categories && L().categories[id]) || id; }
  function esc(v){ return String(v == null ? '' : v).replace(/[&<>'"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[s])); }
  function fmtDate(d){ try{ return new Date(d).toLocaleDateString(lang()==='fa'?'fa-IR':lang()==='hr'?'hr-HR':'en-US'); }catch(e){ return ''; } }

  function addStyles(){
    if(document.getElementById('qa-v59-styles')) return;
    const style = document.createElement('style');
    style.id = 'qa-v59-styles';
    style.textContent = `
      .contact-list{display:grid;gap:10px;margin-top:12px}.contact-row{line-height:1.6;word-break:break-word}.contact-row a{font-weight:800;text-decoration:none}.qa-tabs{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}.qa-tabs .btn{flex:1;min-width:140px}.qa-form-grid{display:grid;gap:12px}.qa-field label{display:block;font-weight:800;margin-bottom:6px}.qa-field input,.qa-field select,.qa-field textarea{width:100%;box-sizing:border-box;border:1px solid rgba(6,20,109,.18);border-radius:14px;padding:12px 14px;background:#fff;font:inherit;color:#15213d}.qa-field textarea{min-height:140px;resize:vertical;line-height:1.8}.qa-status{margin-top:10px;font-weight:800}.qa-answer-card{border:1px solid rgba(6,20,109,.11);border-radius:18px;padding:16px;margin:12px 0;background:#fff}.qa-meta{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px}.qa-pill{display:inline-flex;align-items:center;border-radius:999px;background:#eef3ff;color:#06146D;padding:5px 10px;font-size:.82rem;font-weight:800}.qa-question{font-weight:900;margin:8px 0}.qa-answer{white-space:pre-wrap;line-height:1.9}.qa-filters{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}.qa-admin-list{display:grid;gap:12px}.qa-admin-card{border:1px solid rgba(170,122,20,.26);border-radius:18px;background:#fffaf0;padding:14px}.qa-admin-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.qa-small{font-size:.88rem;opacity:.78}.qa-hidden{display:none!important}@media(max-width:640px){.qa-filters{grid-template-columns:1fr}.qa-tabs .btn{min-width:100%}}`;
    document.head.appendChild(style);
  }

  function ensurePage(){
    if(!document.getElementById('qa')){
      const main = document.querySelector('main');
      const sec = document.createElement('section');
      sec.id = 'qa'; sec.className = 'page'; sec.innerHTML = '<div id="qaContent"></div>';
      main && main.appendChild(sec);
    }
  }

  function openQA(tab){
    qaState.tab = tab || qaState.tab || 'answers';
    if(typeof window.showPage === 'function') window.showPage('qa');
    else {
      document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
      document.getElementById('qa')?.classList.add('active');
    }
    renderQA();
    if(qaState.tab === 'answers') loadPublicAnswers();
    if(qaState.tab === 'admin') checkSession().then(()=>{ if(qaState.session) loadAdminQuestions(); });
  }
  window.openQA = openQA;

  function injectEntryPoints(){
    const homeGrid = document.querySelector('#home .home-feature-grid');
    if(homeGrid && !document.getElementById('qaHomeCard')){
      const card = document.createElement('div');
      card.className = 'card feature-card'; card.id = 'qaHomeCard';
      card.innerHTML = `<h3 class="qa-home-title"></h3><p class="qa-home-desc"></p><div class="btn-row"><button class="btn primary" data-qa-open="ask"></button><button class="btn secondary" data-qa-open="answers"></button></div>`;
      homeGrid.appendChild(card);
    }
    const moreSection = document.getElementById('more');
    // Q&A is intentionally shown only on the Home page. The More page receives a Contact Us card instead.
    document.getElementById('qaMoreCard')?.remove();
    if(moreSection && !document.getElementById('contactMoreCard')){
      const footer = moreSection.querySelector('.footer');
      const card = document.createElement('div');
      card.className='card'; card.id='contactMoreCard';
      card.innerHTML = `<h3 class="contact-title"></h3><p class="contact-desc"></p><div class="contact-list"></div>`;
      if(footer) moreSection.insertBefore(card, footer); else moreSection.appendChild(card);
    }
    document.querySelectorAll('[data-qa-open]').forEach(btn=>{
      if(btn.dataset.qaBound) return; btn.dataset.qaBound='1'; btn.addEventListener('click',()=>openQA(btn.dataset.qaOpen));
    });
    updateEntryText();
  }

  function updateEntryText(){
    document.querySelectorAll('.qa-home-title').forEach(el=>el.textContent = txt('title'));
    document.querySelectorAll('.qa-home-desc').forEach(el=>el.textContent = txt('desc'));
    document.querySelectorAll('[data-qa-open="ask"]').forEach(el=>el.textContent = txt('ask'));
    document.querySelectorAll('[data-qa-open="answers"]').forEach(el=>el.textContent = txt('answers'));
    renderContactCard();
  }

  function renderContactCard(){
    const card = document.getElementById('contactMoreCard');
    if(!card) return;
    const title = card.querySelector('.contact-title');
    const desc = card.querySelector('.contact-desc');
    const list = card.querySelector('.contact-list');
    if(title) title.textContent = txt('contactUsTitle');
    if(desc) desc.textContent = txt('contactUsDesc');
    if(list){
      list.innerHTML = `
        <div class="contact-row"><strong>${esc(txt('contactEmail'))}:</strong> <a href="mailto:omideno7church@gmail.com">omideno7church@gmail.com</a></div>
        <div class="contact-row"><strong>${esc(txt('contactWebsite'))}:</strong> <a href="https://omideno7.github.io/omideno7-app/" target="_blank" rel="noopener">omideno7.github.io/omideno7-app</a></div>
        <div class="contact-row"><strong>${esc(txt('contactInstagram'))}:</strong> <a href="https://www.instagram.com/omideno7" target="_blank" rel="noopener">@omideno7</a></div>
        <div class="contact-row"><strong>${esc(txt('contactYoutube'))}:</strong> <a href="https://www.youtube.com/@omideno7" target="_blank" rel="noopener">omideno7</a></div>
        <div class="contact-row"><strong>${esc(txt('contactAddress'))}:</strong> Lastovska ulica 2A, Zagreb, Croatia</div>
        <div class="contact-row"><strong>${esc(txt('contactPhone'))}:</strong> <a href="tel:+385917880824">+385 91 788 0824</a></div>
        <div class="contact-row"><strong>${esc(txt('contactOnline'))}:</strong> <a href="https://join.freeconferencecall.com/omideno7church" target="_blank" rel="noopener">join.freeconferencecall.com/omideno7church</a></div>`;
    }
  }

  function categoryOptions(selected, includeAll){
    const first = includeAll ? `<option value="all">${esc(txt('allCategories'))}</option>` : '';
    return first + CATEGORY_IDS.map(id=>`<option value="${esc(id)}" ${selected===id?'selected':''}>${esc(catLabel(id))}</option>`).join('');
  }

  async function initSupabase(){
    if(supabase) return supabase;
    if(!window.supabase){
      await new Promise((resolve, reject)=>{
        const s=document.createElement('script');
        s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        s.onload=resolve; s.onerror=reject; document.head.appendChild(s);
      });
    }
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true }});
    return supabase;
  }

  async function checkSession(){
    try{ const sb=await initSupabase(); const {data}=await sb.auth.getSession(); qaState.session = data && data.session ? data.session : null; return qaState.session; }catch(e){ return null; }
  }

  function renderQA(){
    ensurePage(); addStyles(); updateEntryText();
    const root = document.getElementById('qaContent'); if(!root) return;
    const active = qaState.tab || 'answers';
    root.innerHTML = `<div class="section-title"><h2>${esc(txt('title'))}</h2></div>
      <div class="hero-card"><h1>${esc(txt('title'))}</h1><p>${esc(txt('desc'))}</p><div class="qa-tabs"><button class="btn ${active==='ask'?'primary':'secondary'}" data-qa-tab="ask">${esc(txt('ask'))}</button><button class="btn ${active==='answers'?'primary':'secondary'}" data-qa-tab="answers">${esc(txt('answers'))}</button>${isAdminEntry()?`<button class="btn ${active==='admin'?'gold':'light'}" data-qa-tab="admin">${esc(txt('admin'))}</button>`:''}</div></div>
      <div id="qaPanel"></div>`;
    root.querySelectorAll('[data-qa-tab]').forEach(b=>b.addEventListener('click',()=>openQA(b.dataset.qaTab)));
    if(active === 'ask') renderAsk();
    else if(active === 'admin') renderAdmin();
    else renderAnswers();
  }

  function renderAsk(){
    const panel = document.getElementById('qaPanel'); if(!panel) return;
    const current = lang();
    panel.innerHTML = `<div class="card"><h3>${esc(txt('introTitle'))}</h3><p>${esc(txt('intro'))}</p><form id="qaSubmitForm" class="qa-form-grid">
      <div class="qa-field"><label>${esc(txt('name'))}</label><input name="name" maxlength="120" autocomplete="name"></div>
      <div class="qa-field"><label>${esc(txt('contact'))}</label><input name="contact" maxlength="180" autocomplete="email"></div>
      <div class="qa-field"><label>${esc(txt('language'))}</label><select name="language"><option value="fa" ${current==='fa'?'selected':''}>فارسی</option><option value="en" ${current==='en'?'selected':''}>English</option><option value="hr" ${current==='hr'?'selected':''}>Hrvatski</option></select></div>
      <div class="qa-field"><label>${esc(txt('category'))}</label><select name="category">${categoryOptions('', false)}</select></div>
      <div class="qa-field"><label>${esc(txt('question'))}</label><textarea name="question" required maxlength="4000"></textarea></div>
      <label class="qa-small"><input type="checkbox" name="allow_public" checked> ${esc(txt('allowPublic'))}</label>
      <button class="btn primary" type="submit">${esc(txt('submit'))}</button><div class="qa-status" id="qaSubmitStatus"></div></form></div>`;
    document.getElementById('qaSubmitForm')?.addEventListener('submit', submitQuestion);
  }

  async function submitQuestion(ev){
    ev.preventDefault();
    const form = ev.currentTarget; const status = document.getElementById('qaSubmitStatus');
    const fd = new FormData(form);
    const question = String(fd.get('question')||'').trim();
    const category = String(fd.get('category')||'').trim();
    if(!question || !category){ if(status) status.textContent = txt('required'); return; }
    if(status) status.textContent = txt('sending');
    try{
      const sb = await initSupabase();
      const payload = { name:String(fd.get('name')||'').trim() || null, contact:String(fd.get('contact')||'').trim() || null, language:String(fd.get('language')||lang()).trim(), category, question, allow_public: !!fd.get('allow_public'), status:'pending' };
      const {error} = await sb.from('qa_questions').insert(payload);
      if(error) throw error;
      form.reset();
      const langSelect = form.querySelector('[name="language"]'); if(langSelect) langSelect.value = lang();
      const allow = form.querySelector('[name="allow_public"]'); if(allow) allow.checked = true;
      if(status) status.textContent = txt('sent');
    }catch(e){ console.error('Q&A submit error', e); if(status) status.textContent = txt('error') + (e && e.message ? ' ' + e.message : ''); }
  }

  function renderAnswers(){
    const panel = document.getElementById('qaPanel'); if(!panel) return;
    panel.innerHTML = `<div class="card"><p>${esc(txt('publicNotice'))}</p><div class="qa-filters"><input id="qaSearch" placeholder="${esc(txt('search'))}" value="${esc(qaState.search||'')}"><select id="qaCategoryFilter">${categoryOptions(qaState.category||'all', true)}</select></div><div id="qaAnswersList"><p class="status">${esc(txt('load'))}...</p></div></div>`;
    document.getElementById('qaSearch')?.addEventListener('input', e=>{qaState.search=e.target.value; renderAnswersList();});
    document.getElementById('qaCategoryFilter')?.addEventListener('change', e=>{qaState.category=e.target.value; renderAnswersList();});
    renderAnswersList();
    loadPublicAnswers();
  }

  async function loadPublicAnswers(){
    try{
      const sb=await initSupabase();
      const {data, error} = await sb.from('qa_public_answers').select('*').order('published_at', {ascending:false}).limit(200);
      if(error) throw error;
      qaState.publicAnswers = data || [];
      renderAnswersList();
    }catch(e){ console.error('Q&A answers load error', e); const list=document.getElementById('qaAnswersList'); if(list) list.innerHTML = `<p class="status">${esc(txt('error'))}</p>`; }
  }

  function renderAnswersList(){
    const list = document.getElementById('qaAnswersList'); if(!list) return;
    const l = lang(); const q=(qaState.search||'').toLowerCase(); const cat=qaState.category||'all';
    let rows = (qaState.publicAnswers||[]).filter(r=>r.language===l || !r.language);
    if(cat !== 'all') rows = rows.filter(r=>r.category === cat);
    if(q) rows = rows.filter(r=>(String(r.public_question||'')+' '+String(r.answer||'')+' '+catLabel(r.category)).toLowerCase().includes(q));
    if(!rows.length){ list.innerHTML = `<p class="status">${esc(txt('noAnswers'))}</p>`; return; }
    list.innerHTML = rows.map(r=>`<article class="qa-answer-card"><div class="qa-meta"><span class="qa-pill">${esc(catLabel(r.category))}</span>${r.published_at?`<span class="qa-small">${esc(fmtDate(r.published_at))}</span>`:''}</div><div class="qa-question">${esc(r.public_question)}</div><div class="qa-answer">${esc(r.answer)}</div></article>`).join('');
  }

  function renderAdmin(){
    const panel = document.getElementById('qaPanel'); if(!panel) return;
    panel.innerHTML = `<div class="card" id="qaAdminRoot"><p>${esc(txt('loginHelp'))}</p><p class="status">${esc(txt('load'))}...</p></div>`;
    checkSession().then(()=> qaState.session ? renderAdminPanel() : renderAdminLogin());
  }

  function renderAdminLogin(){
    const root = document.getElementById('qaAdminRoot'); if(!root) return;
    root.innerHTML = `<h3>${esc(txt('loginTitle'))}</h3><p>${esc(txt('loginHelp'))}</p><form id="qaAdminLogin" class="qa-form-grid"><div class="qa-field"><label>${esc(txt('email'))}</label><input name="email" type="email" value="${esc(ADMIN_EMAIL)}" autocomplete="email"></div><div class="qa-field"><label>${esc(txt('password'))}</label><input name="password" type="password" autocomplete="current-password"></div><button class="btn primary" type="submit">${esc(txt('login'))}</button><div id="qaAdminStatus" class="qa-status"></div></form>`;
    document.getElementById('qaAdminLogin')?.addEventListener('submit', adminLogin);
  }

  async function adminLogin(ev){
    ev.preventDefault(); const form=ev.currentTarget; const status=document.getElementById('qaAdminStatus');
    try{
      const sb=await initSupabase();
      const email=String(new FormData(form).get('email')||'').trim().toLowerCase();
      const password=String(new FormData(form).get('password')||'');
      const {data,error}=await sb.auth.signInWithPassword({email,password});
      if(error) throw error;
      if(email !== ADMIN_EMAIL){ await sb.auth.signOut(); throw new Error('Admin email is not allowed.'); }
      qaState.session=data.session; if(status) status.textContent=txt('loggedIn'); renderAdminPanel(); loadAdminQuestions();
    }catch(e){ console.error('Q&A admin login error', e); if(status) status.textContent=txt('error') + (e && e.message ? ' ' + e.message : ''); }
  }

  function renderAdminPanel(){
    const root = document.getElementById('qaAdminRoot'); if(!root) return;
    const statuses = [{id:'pending',label:txt('pending')},{id:'published',label:txt('published')},{id:'answered_private',label:txt('privateAnswered')},{id:'rejected',label:txt('rejected')}];
    root.innerHTML = `<h3>${esc(txt('adminPanel'))}</h3><div class="qa-tabs">${statuses.map(s=>`<button class="btn ${qaState.adminStatus===s.id?'primary':'secondary'}" data-admin-status="${s.id}">${esc(s.label)}</button>`).join('')}<button class="btn light" id="qaAdminLogout">${esc(txt('logout'))}</button></div><div id="qaAdminList"><p class="status">${esc(txt('load'))}...</p></div>`;
    root.querySelectorAll('[data-admin-status]').forEach(b=>b.addEventListener('click',()=>{qaState.adminStatus=b.dataset.adminStatus; renderAdminPanel(); loadAdminQuestions();}));
    document.getElementById('qaAdminLogout')?.addEventListener('click', async()=>{ const sb=await initSupabase(); await sb.auth.signOut(); qaState.session=null; renderAdminLogin(); });
    renderAdminList();
  }

  async function loadAdminQuestions(){
    try{
      const sb=await initSupabase();
      const {data,error}=await sb.from('qa_questions').select('*').eq('status', qaState.adminStatus).order('created_at',{ascending:false}).limit(100);
      if(error) throw error;
      qaState.questions = data || []; renderAdminList();
    }catch(e){ console.error('Q&A admin load error', e); const list=document.getElementById('qaAdminList'); if(list) list.innerHTML = `<p class="status">${esc(txt('error'))} ${esc(e.message||'')}</p>`; }
  }

  function renderAdminList(){
    const list=document.getElementById('qaAdminList'); if(!list) return;
    const rows=qaState.questions||[];
    if(!rows.length){ list.innerHTML = `<p class="status">${esc(txt('noQuestions'))}</p>`; return; }
    list.innerHTML = `<div class="qa-admin-list">${rows.map(r=>`<div class="qa-admin-card" data-qid="${esc(r.id)}"><div class="qa-meta"><span class="qa-pill">${esc(catLabel(r.category))}</span><span class="qa-small">${esc(r.language||'')}</span><span class="qa-small">${esc(fmtDate(r.created_at))}</span></div><p><strong>${esc(txt('privacy'))}:</strong> ${esc(r.name||'-')} / ${esc(r.contact||'-')}</p><p><strong>${esc(txt('originalQuestion'))}:</strong><br>${esc(r.question||'')}</p><div class="qa-field"><label>${esc(txt('publicQuestion'))}</label><textarea data-field="public_question">${esc(r.public_question || r.question || '')}</textarea></div><div class="qa-field"><label>${esc(txt('answer'))}</label><textarea data-field="answer">${esc(r.answer || '')}</textarea></div><div class="qa-field"><label>${esc(txt('adminNote'))}</label><textarea data-field="admin_note">${esc(r.admin_note || '')}</textarea></div><div class="qa-admin-actions"><button class="btn secondary" data-admin-action="private">${esc(txt('savePrivate'))}</button><button class="btn primary" data-admin-action="publish">${esc(txt('publish'))}</button><button class="btn light" data-admin-action="reject">${esc(txt('reject'))}</button></div><div class="qa-status" data-save-status></div></div>`).join('')}</div>`;
    list.querySelectorAll('[data-admin-action]').forEach(btn=>btn.addEventListener('click',()=>saveAdminQuestion(btn.closest('[data-qid]'), btn.dataset.adminAction)));
  }

  async function saveAdminQuestion(card, action){
    if(!card) return;
    const id=card.dataset.qid; const statusEl=card.querySelector('[data-save-status]');
    const val = f => card.querySelector(`[data-field="${f}"]`)?.value.trim() || null;
    const update = { public_question: val('public_question'), answer: val('answer'), admin_note: val('admin_note'), answered_at: new Date().toISOString() };
    if(action==='publish'){ update.status='published'; update.published_at = new Date().toISOString(); update.allow_public = true; }
    if(action==='private'){ update.status='answered_private'; update.published_at = null; }
    if(action==='reject'){ update.status='rejected'; update.published_at = null; }
    try{
      const sb=await initSupabase(); const {error}=await sb.from('qa_questions').update(update).eq('id', id); if(error) throw error;
      if(statusEl) statusEl.textContent = txt('saved');
      await loadAdminQuestions();
    }catch(e){ console.error('Q&A admin save error', e); if(statusEl) statusEl.textContent = txt('error') + ' ' + (e.message||''); }
  }

  function patchVersion(){
    try{
      window.APP_VERSION = VERSION;
      document.querySelectorAll('#appVersion,.app-version').forEach(el=>el.textContent='App Version: '+VERSION);
      const footerMore = document.querySelector('#more .footer');
      if(footerMore && !footerMore.querySelector('#appVersion')) footerMore.insertAdjacentHTML('beforeend', `<br><small id="appVersion" class="app-version">App Version: ${VERSION}</small>`);
    }catch(e){}
  }

  function hookLanguageChanges(){
    let last = lang();
    setInterval(()=>{ const now=lang(); if(now!==last){ last=now; updateEntryText(); if(document.getElementById('qa')?.classList.contains('active')) renderQA(); } patchVersion(); }, 800);
  }

  function boot(){
    ensurePage(); addStyles(); injectEntryPoints(); hookLanguageChanges(); patchVersion();
    const params = new URLSearchParams(location.search || '');
    if(isAdminEntry()){
      setTimeout(()=>openQA('admin'), 450);
    } else if(params.get('page') === 'qa'){
      setTimeout(()=>openQA('answers'), 400);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
