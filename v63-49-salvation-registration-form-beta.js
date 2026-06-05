/* Omideno7 V63.49 — In-App Salvation / Church Registration Form Beta
   Replaces Google Form flow in the New Birth / Salvation section with an in-app required form.
   Trilingual: FA / EN / HR.
   Beta-only.
*/
(function(){
  'use strict';

  var VERSION = 'V63.49 In-App Salvation Registration Beta';
  var LOCAL_QUEUE_KEY = 'omideno7_v6349_registration_queue';
  var LOG_KEY = 'omideno7_v6349_registration_log';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6349|v=6348|v=6347|v=6346|v=6345|v=6344|v=6343|v=6342|v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function normalizeLang(v){
    v = String(v || '').toLowerCase().trim();
    if(v === 'fa' || v.indexOf('pers') !== -1 || v.indexOf('farsi') !== -1 || v.startsWith('fa-')) return 'fa';
    if(v === 'en' || v.indexOf('english') !== -1 || v.startsWith('en-')) return 'en';
    if(v === 'hr' || v.indexOf('cro') !== -1 || v.indexOf('hrv') !== -1 || v.indexOf('kro') !== -1 || v.startsWith('hr-')) return 'hr';
    return 'fa';
  }
  function lang(){
    try{return normalizeLang(localStorage.getItem('lang') || document.documentElement.lang || navigator.language || 'fa');}
    catch(e){return 'fa';}
  }

  function T(k){
    var fa = {
      openBtn:'نیاز به نجات و ثبت‌نام',
      openChurchBtn:'ثبت‌نام کلیسا',
      title:'فرم نجات و ثبت‌نام کلیسای امیدنو۷',
      intro:'این فرم داخل اپ ثبت می‌شود تا کلیسا بتواند برای شما دعا کند، شما را راهنمایی کند و در مسیر رشد، شاگردی و کلاس‌ها همراه شما باشد.',
      privacy:'توجه: اطلاعات شما محرمانه است و فقط برای مراقبت روحانی، دعا، کلاس‌ها و هماهنگی کلیسایی استفاده می‌شود.',
      firstName:'نام',
      lastName:'نام خانوادگی',
      origin:'اهل کجا هستید؟ شهر/کشور یا قومیت/ملیت',
      email:'آدرس ایمیل',
      birthDate:'تاریخ تولد',
      salvationDate:'تاریخ ایمان آوردن / دریافت نجات',
      baptism:'آیا تعمید آب گرفته‌اید؟',
      baptismYes:'بله',
      baptismNo:'خیر',
      baptismWant:'می‌خواهم بگیرم',
      hasPastor:'آیا شبان دارید؟',
      pastorName:'نام شبان',
      pastorNone:'ندارم',
      maritalStatus:'وضعیت تأهل',
      single:'مجرد',
      married:'متأهل',
      engaged:'نامزد',
      separating:'در حال جدایی',
      divorced:'طلاق گرفته',
      relationship:'در رابطه است',
      hasChildren:'آیا فرزند دارید؟',
      childrenCount:'تعداد فرزندان',
      education:'میزان تحصیلات',
      residenceCountry:'کشور محل زندگی',
      phone:'شماره تماس',
      physicalCondition:'شرایط جسمانی',
      healthy:'سلامت',
      sick:'بیمار',
      disabled:'معلول',
      healthDetails:'اگر بیمار یا معلول هستید، توضیح دهید تا برای دعا و کمک بهتر بدانیم',
      wantsSms:'آیا دوست دارید برای کنفرانس‌ها و کلاس‌های آموزشی به شما پیامک/اطلاع‌رسانی ارسال شود؟',
      bibleClassBefore:'آیا تاکنون در کلاس آموزشی مربوط به کتاب‌مقدس شرکت کرده‌اید؟',
      courseDetails:'اگر بله، نام دوره، کلیسا و شبانی که تعلیم داده را بنویسید',
      yes:'بله',
      no:'خیر',
      consent:'با ثبت این فرم موافقم که کلیسای امیدنو۷ اطلاعات من را برای مراقبت روحانی، دعا، کلاس‌ها و ارتباط کلیسایی نگهداری و استفاده کند.',
      submit:'ارسال ثبت‌نام',
      close:'بستن',
      savedCloud:'فرم با موفقیت در کلود ثبت شد.',
      savedLocal:'فرم فعلاً در دستگاه ذخیره شد. وقتی اتصال کلود آماده باشد، می‌توانیم آن را ارسال کنیم.',
      required:'همه فیلدها اجباری هستند.',
      invalidEmail:'ایمیل را درست وارد کنید.',
      requiredHint:'لطفاً تمام سوالات را در کمال صداقت پاسخ دهید. ما اینجا برای کمک به شما هستیم.',
      openSaved:'نمایش فرم‌های ذخیره‌شده محلی',
      sendQueued:'ارسال فرم‌های ذخیره‌شده به کلود',
      localQueue:'فرم‌های ذخیره‌شده محلی',
      queueEmpty:'فرم ذخیره‌شده محلی وجود ندارد.',
      sending:'در حال ارسال...',
      sentQueued:'فرم‌های ذخیره‌شده ارسال شدند.',
      error:'خطا',
      select:'انتخاب کنید'
    };
    var en = {
      openBtn:'Need Salvation & Registration',
      openChurchBtn:'Church Registration',
      title:'Salvation and OmideNo7 Church Registration Form',
      intro:'This form is submitted inside the app so the church can pray for you, guide you, and walk with you in growth, discipleship, and classes.',
      privacy:'Note: Your information is confidential and is used only for spiritual care, prayer, classes, and church coordination.',
      firstName:'First name',
      lastName:'Last name',
      origin:'Where are you from? City/country or nationality/ethnic background',
      email:'Email address',
      birthDate:'Date of birth',
      salvationDate:'Date you received salvation / believed in Christ',
      baptism:'Have you received water baptism?',
      baptismYes:'Yes',
      baptismNo:'No',
      baptismWant:'I want to',
      hasPastor:'Do you have a pastor?',
      pastorName:'Pastor’s name',
      pastorNone:'I do not have one',
      maritalStatus:'Marital status',
      single:'Single',
      married:'Married',
      engaged:'Engaged',
      separating:'Separating',
      divorced:'Divorced',
      relationship:'In a relationship',
      hasChildren:'Do you have children?',
      childrenCount:'Number of children',
      education:'Education level',
      residenceCountry:'Country of residence',
      phone:'Phone number',
      physicalCondition:'Physical condition',
      healthy:'Healthy',
      sick:'Sick',
      disabled:'Disabled',
      healthDetails:'If sick or disabled, explain so we can pray and help appropriately',
      wantsSms:'Would you like to receive messages for conferences and training classes?',
      bibleClassBefore:'Have you ever attended a Bible training class?',
      courseDetails:'If yes, write the course name, church, and pastor/teacher',
      yes:'Yes',
      no:'No',
      consent:'I agree that OmideNo7 Church may keep and use my information for spiritual care, prayer, classes, and church communication.',
      submit:'Submit registration',
      close:'Close',
      savedCloud:'The form was submitted to the cloud successfully.',
      savedLocal:'The form was saved on this device for now. When cloud connection is ready, it can be sent.',
      required:'All fields are required.',
      invalidEmail:'Please enter a valid email.',
      requiredHint:'Please answer all questions with complete honesty. We are here to help you.',
      openSaved:'Show locally saved forms',
      sendQueued:'Send saved forms to cloud',
      localQueue:'Locally saved forms',
      queueEmpty:'No locally saved forms.',
      sending:'Sending...',
      sentQueued:'Saved forms were sent.',
      error:'Error',
      select:'Select'
    };
    var hr = {
      openBtn:'Trebam spasenje i registraciju',
      openChurchBtn:'Registracija za crkvu',
      title:'Obrazac za spasenje i registraciju u crkvi OmideNo7',
      intro:'Ovaj se obrazac ispunjava unutar aplikacije kako bi crkva mogla moliti za vas, usmjeravati vas i pratiti vas u rastu, učeništvu i razredima.',
      privacy:'Napomena: Vaši su podaci povjerljivi i koriste se samo za duhovnu skrb, molitvu, razrede i crkvenu koordinaciju.',
      firstName:'Ime',
      lastName:'Prezime',
      origin:'Odakle ste? Grad/država ili nacionalnost/podrijetlo',
      email:'Email adresa',
      birthDate:'Datum rođenja',
      salvationDate:'Datum kada ste primili spasenje / povjerovali u Krista',
      baptism:'Jeste li primili krštenje u vodi?',
      baptismYes:'Da',
      baptismNo:'Ne',
      baptismWant:'Želim primiti',
      hasPastor:'Imate li pastora?',
      pastorName:'Ime pastora',
      pastorNone:'Nemam',
      maritalStatus:'Bračni status',
      single:'Slobodan/slobodna',
      married:'U braku',
      engaged:'Zaručen/zaručena',
      separating:'U postupku razdvajanja',
      divorced:'Razveden/razvedena',
      relationship:'U vezi',
      hasChildren:'Imate li djece?',
      childrenCount:'Broj djece',
      education:'Razina obrazovanja',
      residenceCountry:'Država prebivališta',
      phone:'Broj telefona',
      physicalCondition:'Fizičko stanje',
      healthy:'Zdrav/zdrava',
      sick:'Bolestan/bolesna',
      disabled:'Osoba s invaliditetom',
      healthDetails:'Ako ste bolesni ili imate invaliditet, opišite kako bismo mogli moliti i pomoći na pravi način',
      wantsSms:'Želite li primati poruke za konferencije i obrazovne razrede?',
      bibleClassBefore:'Jeste li ikada sudjelovali u biblijskom obrazovnom razredu?',
      courseDetails:'Ako da, napišite naziv tečaja, crkvu i pastora/učitelja',
      yes:'Da',
      no:'Ne',
      consent:'Slažem se da crkva OmideNo7 može čuvati i koristiti moje podatke za duhovnu skrb, molitvu, razrede i crkvenu komunikaciju.',
      submit:'Pošalji registraciju',
      close:'Zatvori',
      savedCloud:'Obrazac je uspješno poslan u cloud.',
      savedLocal:'Obrazac je za sada spremljen na ovom uređaju. Kada cloud veza bude spremna, može se poslati.',
      required:'Sva polja su obavezna.',
      invalidEmail:'Unesite ispravnu email adresu.',
      requiredHint:'Molimo odgovorite na sva pitanja potpuno iskreno. Ovdje smo da vam pomognemo.',
      openSaved:'Prikaži lokalno spremljene obrasce',
      sendQueued:'Pošalji spremljene obrasce u cloud',
      localQueue:'Lokalno spremljeni obrasci',
      queueEmpty:'Nema lokalno spremljenih obrazaca.',
      sending:'Slanje...',
      sentQueued:'Spremljeni obrasci su poslani.',
      error:'Greška',
      select:'Odaberite'
    };
    var l = lang();
    return (l === 'hr' ? hr : (l === 'en' ? en : fa))[k] || fa[k] || k;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function now(){return new Date().toISOString();}

  function log(type,msg,details){
    var arr=[];
    try{arr=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){arr=[];}
    arr.unshift({time:now(),type:type||'info',message:String(msg||''),details:details||null});
    arr=arr.slice(0,50);
    localStorage.setItem(LOG_KEY,JSON.stringify(arr));
  }

  function findClient(){
    try{
      if(window.OMIDENO7_V6347C_SECURITY_FIX_BETA && typeof window.OMIDENO7_V6347C_SECURITY_FIX_BETA.findClient === 'function'){
        var c = window.OMIDENO7_V6347C_SECURITY_FIX_BETA.findClient();
        if(c && c.from && c.auth) return c;
      }
    }catch(e){}
    var names=['omideno7Supabase','schoolSupabase','supabaseClient','om7Supabase','OMIDENO7_SUPABASE_CLIENT','__supabase'];
    for(var i=0;i<names.length;i++){
      try{
        var x=window[names[i]];
        if(x && x.from && x.auth) return x;
      }catch(e){}
    }
    return null;
  }

  function queueGet(){
    try{return JSON.parse(localStorage.getItem(LOCAL_QUEUE_KEY)||'[]');}catch(e){return[];}
  }
  function queueSet(arr){
    localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(arr || []));
  }
  function queueAdd(payload){
    var arr=queueGet();
    arr.unshift(payload);
    queueSet(arr.slice(0,100));
  }

  function field(name, label, type, extra){
    extra = extra || '';
    return '<label class="v6349-field"><span>'+esc(label)+' *</span><input name="'+esc(name)+'" type="'+esc(type||'text')+'" required '+extra+'></label>';
  }
  function textarea(name, label){
    return '<label class="v6349-field v6349-full"><span>'+esc(label)+' *</span><textarea name="'+esc(name)+'" required rows="3"></textarea></label>';
  }
  function select(name, label, opts){
    return '<label class="v6349-field"><span>'+esc(label)+' *</span><select name="'+esc(name)+'" required><option value="">'+esc(T('select'))+'</option>'+
      opts.map(function(o){return '<option value="'+esc(o[0])+'">'+esc(o[1])+'</option>';}).join('')+
      '</select></label>';
  }

  function formHtml(){
    return '<div id="v6349Modal" class="v6349-modal">'+
      '<div class="v6349-backdrop"></div>'+
      '<div class="v6349-box">'+
        '<button type="button" class="v6349-x" aria-label="'+esc(T('close'))+'">×</button>'+
        '<h2>'+esc(T('title'))+'</h2>'+
        '<p class="v6349-intro">'+esc(T('intro'))+'</p>'+
        '<p class="v6349-privacy">🔒 '+esc(T('privacy'))+'</p>'+
        '<p class="v6349-hint">'+esc(T('requiredHint'))+'</p>'+
        '<div id="v6349Status"></div>'+
        '<form id="v6349Form">'+
          '<div class="v6349-grid">'+
            field('first_name', T('firstName'))+
            field('last_name', T('lastName'))+
            field('origin', T('origin'))+
            field('email', T('email'), 'email')+
            field('birth_date', T('birthDate'), 'date')+
            field('salvation_date', T('salvationDate'), 'date')+
            select('water_baptism', T('baptism'), [['yes',T('baptismYes')],['no',T('baptismNo')],['want',T('baptismWant')]])+
            select('has_pastor', T('hasPastor'), [['yes',T('yes')],['no',T('no')]])+
            field('pastor_name', T('pastorName'))+
            select('marital_status', T('maritalStatus'), [['single',T('single')],['married',T('married')],['engaged',T('engaged')],['separating',T('separating')],['divorced',T('divorced')],['relationship',T('relationship')]])+
            select('has_children', T('hasChildren'), [['yes',T('yes')],['no',T('no')]])+
            field('children_count', T('childrenCount'), 'number', 'min="0" step="1"')+
            field('education', T('education'))+
            field('residence_country', T('residenceCountry'))+
            field('phone', T('phone'), 'tel')+
            select('physical_condition', T('physicalCondition'), [['healthy',T('healthy')],['sick',T('sick')],['disabled',T('disabled')]])+
            textarea('health_details', T('healthDetails'))+
            select('wants_sms', T('wantsSms'), [['yes',T('yes')],['no',T('no')]])+
            select('bible_class_before', T('bibleClassBefore'), [['yes',T('yes')],['no',T('no')]])+
            textarea('course_details', T('courseDetails'))+
            '<label class="v6349-consent v6349-full"><input name="consent" type="checkbox" required> <span>'+esc(T('consent'))+' *</span></label>'+
          '</div>'+
          '<div class="v6349-actions">'+
            '<button type="submit" class="btn primary">'+esc(T('submit'))+'</button>'+
            '<button type="button" class="btn secondary" id="v6349SendQueue">'+esc(T('sendQueued'))+'</button>'+
            '<button type="button" class="btn light" id="v6349ShowQueue">'+esc(T('openSaved'))+'</button>'+
          '</div>'+
        '</form>'+
        '<div id="v6349QueueBox"></div>'+
      '</div>'+
    '</div>';
  }

  function css(){
    if(document.getElementById('v6349Css')) return;
    var st=document.createElement('style');
    st.id='v6349Css';
    st.textContent=[
      '.v6349-modal{position:fixed;inset:0;z-index:999999;}',
      '.v6349-backdrop{position:absolute;inset:0;background:rgba(2,8,23,.45);backdrop-filter:blur(2px);}',
      '.v6349-box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(96vw,860px);max-height:92vh;overflow:auto;background:#fff;border-radius:26px;padding:22px;box-shadow:0 28px 90px rgba(0,0,0,.35);border-top:6px solid #00B91F;}',
      '.v6349-x{position:absolute;right:14px;top:10px;border:0;background:#f1f5f9;border-radius:999px;width:36px;height:36px;font-size:26px;line-height:1;}',
      '.v6349-box h2{color:#06146D;margin:8px 42px 10px 0;font-weight:900;}',
      '.v6349-intro{line-height:1.8}.v6349-privacy{background:#eef4ff;color:#06146D;border-radius:14px;padding:10px;font-weight:800;line-height:1.8}.v6349-hint{background:#fff7df;color:#7a4d00;border-radius:14px;padding:10px;font-weight:800;}',
      '.v6349-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;}',
      '.v6349-field{display:flex;flex-direction:column;gap:6px;font-weight:800;color:#06146D;}',
      '.v6349-field input,.v6349-field select,.v6349-field textarea{border:1px solid #dbe3ef;border-radius:14px;padding:12px;font-size:15px;background:#fff;color:#111827;}',
      '.v6349-full{grid-column:1/-1}.v6349-consent{background:#f8fbff;border:1px solid #dbe3ef;border-radius:16px;padding:12px;line-height:1.8;font-weight:800;color:#06146D;}',
      '.v6349-consent input{transform:scale(1.2);margin:0 6px}.v6349-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px;}',
      '.v6349-status{border-radius:14px;padding:10px;margin:10px 0;font-weight:900}.v6349-status.ok{background:#eaffef;color:#08751a}.v6349-status.warn{background:#fff7df;color:#7a4d00}.v6349-status.error{background:#fff0f0;color:#9b1c1c}',
      '#v6349QueueBox details{border:1px solid #dbe3ef;border-radius:14px;margin:8px 0;padding:10px;background:#fff;}',
      '.fa .v6349-box{direction:rtl;text-align:right;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function setStatus(msg,type){
    var box=document.getElementById('v6349Status');
    if(box) box.innerHTML='<div class="v6349-status '+esc(type||'ok')+'">'+esc(msg)+'</div>';
  }

  function openForm(){
    css();
    var old=document.getElementById('v6349Modal');
    if(old) old.remove();
    var wrap=document.createElement('div');
    wrap.innerHTML=formHtml();
    document.body.appendChild(wrap.firstElementChild);
    var modal=document.getElementById('v6349Modal');
    modal.querySelector('.v6349-x').onclick=closeForm;
    modal.querySelector('.v6349-backdrop').onclick=closeForm;
    document.getElementById('v6349Form').onsubmit=handleSubmit;
    document.getElementById('v6349ShowQueue').onclick=function(ev){ev.preventDefault(); showQueue();};
    document.getElementById('v6349SendQueue').onclick=function(ev){ev.preventDefault(); sendQueue();};
  }
  function closeForm(){
    var modal=document.getElementById('v6349Modal');
    if(modal) modal.remove();
  }

  function collectForm(form){
    var fd=new FormData(form);
    var data={};
    fd.forEach(function(v,k){data[k]=String(v||'').trim();});
    data.consent = !!fd.get('consent');
    data.language = lang();
    data.submitted_at = now();
    data.source = 'omideno7_beta_v63_49';
    data.app_version = VERSION;
    return data;
  }

  function validate(data){
    var required = [
      'first_name','last_name','origin','email','birth_date','salvation_date','water_baptism',
      'has_pastor','pastor_name','marital_status','has_children','children_count','education',
      'residence_country','phone','physical_condition','health_details','wants_sms',
      'bible_class_before','course_details'
    ];
    for(var i=0;i<required.length;i++){
      if(!String(data[required[i]]||'').trim()) return T('required');
    }
    if(!data.consent) return T('required');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email||'')) return T('invalidEmail');
    if(data.has_children === 'no' && String(data.children_count) !== '0' && !/ندارم|none|nemam/i.test(data.children_count)){
      // allow any value, but 0 is best; no hard fail
    }
    return null;
  }

  async function getUser(sb){
    try{
      if(!sb || !sb.auth) return null;
      var r=await sb.auth.getUser();
      return r && r.data && r.data.user ? r.data.user : null;
    }catch(e){return null;}
  }

  async function submitToCloud(data){
    var sb=findClient();
    if(!sb || !sb.from) throw new Error('Supabase client not available');
    var user=await getUser(sb);
    var payload = {
      user_id: user ? user.id : null,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      language: data.language,
      status: 'new',
      payload: data,
      consent: true,
      created_at: now()
    };
    var r=await sb.from('church_member_registrations').insert(payload).select('id').single();
    if(r.error) throw r.error;
    return r.data;
  }

  async function handleSubmit(ev){
    ev.preventDefault();
    var form=ev.currentTarget;
    var data=collectForm(form);
    var err=validate(data);
    if(err){ setStatus(err,'error'); return false; }

    try{
      setStatus(T('sending'),'warn');
      var res=await submitToCloud(data);
      setStatus(T('savedCloud'),'ok');
      log('success',T('savedCloud'),{id:res && res.id, email:data.email});
      form.reset();
    }catch(e){
      queueAdd({id:'local_'+Date.now(), data:data, queued_at:now(), error:e.message||String(e)});
      setStatus(T('savedLocal'),'warn');
      log('warn',T('savedLocal'),{error:e.message||String(e), email:data.email});
    }
    return false;
  }

  async function sendQueue(){
    var arr=queueGet();
    if(!arr.length){setStatus(T('queueEmpty'),'warn'); return;}
    setStatus(T('sending'),'warn');
    var remaining=[];
    var sent=0;
    for(var i=0;i<arr.length;i++){
      try{
        await submitToCloud(arr[i].data);
        sent++;
      }catch(e){
        arr[i].last_error=e.message||String(e);
        remaining.push(arr[i]);
      }
    }
    queueSet(remaining);
    setStatus(sent ? T('sentQueued')+' '+sent : T('error'),'ok');
    showQueue();
  }

  function showQueue(){
    var arr=queueGet();
    var box=document.getElementById('v6349QueueBox');
    if(!box) return;
    if(!arr.length){box.innerHTML='<p class="v6349-status warn">'+esc(T('queueEmpty'))+'</p>'; return;}
    box.innerHTML='<h3>'+esc(T('localQueue'))+'</h3>'+arr.map(function(x){
      return '<details><summary>'+esc((x.data.first_name||'')+' '+(x.data.last_name||'')+' — '+(x.queued_at||''))+'</summary>'+
        '<pre style="white-space:pre-wrap;direction:ltr;text-align:left;font-size:12px;">'+esc(JSON.stringify(x,null,2))+'</pre></details>';
    }).join('');
  }

  function replaceButtons(){
    var candidates = Array.prototype.slice.call(document.querySelectorAll('button,a,[role="button"]'));
    candidates.forEach(function(el){
      if(el.dataset.v6349Bound === '1') return;
      var txt=(el.textContent||'').trim();
      var href=(el.getAttribute && (el.getAttribute('href')||'')) || '';
      var hay=(txt+' '+href).toLowerCase();

      var isRegistration =
        /ثبت.?نام|registration|register|فرم ثبت|google.*form|docs\.google|forms\.gle|membership|عضویت/i.test(hay);

      var isSalvationArea = true;
      try{
        var parentText = el.closest('.card,section,div') ? (el.closest('.card,section,div').textContent||'') : '';
        isSalvationArea = /نجات|تولد تازه|مسیح|salvation|new birth|spasenje|novo rođenje/i.test(parentText + ' ' + hay);
      }catch(e){}

      if(isRegistration && isSalvationArea){
        el.textContent = T('openBtn');
        if(el.tagName && el.tagName.toLowerCase()==='a') el.setAttribute('href','#');
        el.dataset.v6349Bound='1';
        el.addEventListener('click',function(ev){
          ev.preventDefault();
          ev.stopPropagation();
          openForm();
          return false;
        },true);
      }
    });
  }

  function addMorePanel(){
    var more=document.getElementById('more');
    if(!more || document.getElementById('v6349MorePanel')) return;
    var div=document.createElement('div');
    div.id='v6349MorePanel';
    div.className='card';
    div.style.borderTop='5px solid #00B91F';
    div.innerHTML='<h3>'+esc(T('openChurchBtn'))+'</h3><p>'+esc(T('intro'))+'</p><div class="v6349-actions"><button type="button" class="btn primary" id="v6349OpenFromMore">'+esc(T('openBtn'))+'</button><button type="button" class="btn secondary" id="v6349SendFromMore">'+esc(T('sendQueued'))+'</button></div>';
    var footer=more.querySelector('.footer');
    more.insertBefore(div, footer || null);
    document.getElementById('v6349OpenFromMore').onclick=function(ev){ev.preventDefault(); openForm();};
    document.getElementById('v6349SendFromMore').onclick=function(ev){ev.preventDefault(); openForm(); setTimeout(sendQueue,200);};
  }

  function render(){
    css();
    replaceButtons();
   // addMorePanel();
  }

  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('load',render);
  document.addEventListener('click',function(){setTimeout(render,100);},true);
  setInterval(render,3500);

  window.OMIDENO7_V6349_REGISTRATION_BETA = {
    openForm: openForm,
    sendQueue: sendQueue,
    queueGet: queueGet,
    version: VERSION
  };
})();
