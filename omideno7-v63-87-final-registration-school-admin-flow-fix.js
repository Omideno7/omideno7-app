/* Omideno7 V63.87 — Final Admin + Registration Flow Stability Fix
   Purpose:
   - Move registration request management out of More.
   - Place meeting access requests and school registration requests inside the existing Online School Admin panel.
   - Stop jump/re-render behavior that closes opened request details.
   - Keep meeting registration save behavior strict: save to access_requests only after real Supabase success.
*/
(function(){
  'use strict';
  var VERSION='V63.87 Final Admin + Registration Flow Stability Fix';
  var SUPABASE_URL='https://uibhpgcsgcievktxmcfg.supabase.co';
  var SUPABASE_KEY='sb_publishable_clP99PgnpuT6a5MCyDfVWQ_e_7wWYrk';
  var ADMIN_EMAILS=['omideno7church@gmail.com','yuhana1360@gmail.com'];
  var MEETING_CODE='789987';
  var MEETING_LINK='https://fccdl.in/i/omideno7church';
  var sb=null;
  var autoAdminTries=0;

  function norm(v){v=String(v||'').toLowerCase().trim();if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1)return'en';if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1)return'hr';return'fa'}
  function lang(){try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa')}catch(e){return'fa'}}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function T(k){
    var fa={
      title:'درخواست‌های ثبت‌نام و دسترسی',
      desc:'این بخش داخل پنل ادمین مدرسه قرار دارد و دیگر در قسمت «بیشتر» نمایش داده نمی‌شود. برای دیدن جزئیات، روی نام هر شخص کلیک کنید.',
      meeting:'درخواست‌های ورود به جلسه', school:'ثبت‌نام‌های مدرسه', loadMeeting:'بارگذاری درخواست‌های جلسه', loadSchool:'بارگذاری ثبت‌نام‌های مدرسه', refresh:'به‌روزرسانی',
      pending:'در انتظار تأیید', approved:'تأیید شده', rejected:'رد شده', approve:'تأیید', reject:'رد کردن', del:'حذف', noRows:'چیزی برای نمایش وجود ندارد.',
      login:'برای دیدن این بخش باید با ایمیل ادمین وارد شوید.', name:'نام', email:'ایمیل', phone:'تلفن', country:'کشور', city:'شهر', status:'وضعیت', date:'تاریخ', details:'جزئیات', code:'کد جلسه', link:'لینک جلسه', saved:'انجام شد.', error:'خطا',
      confirmDelete:'آیا مطمئن هستید می‌خواهید این مورد را حذف کنید؟', confirmReject:'آیا مطمئن هستید می‌خواهید این مورد را رد کنید؟', loading:'در حال بارگذاری...',
      sent:'درخواست شما با موفقیت برای ادمین ارسال شد. لطفاً منتظر تأیید بمانید.', sentSchool:'ثبت‌نام مدرسه با موفقیت برای ادمین ارسال شد. لطفاً منتظر تأیید بمانید.', schoolFlowTitle:'روند ثبت‌نام مدرسه', schoolFlowAuth:'۱) یک حساب با ایمیل خود بسازید. ۲) صندوق ورودی ایمیل خود را باز کنید و ایمیل را تأیید کنید. ۳) دوباره وارد مدرسه شوید و فرم ثبت‌نام مدرسه را پر کنید. ۴) منتظر تأیید ادمین بمانید.', schoolFlowReg:'ایمیل شما تأیید و ورود انجام شده است. اکنون فرم ثبت‌نام مدرسه را کامل کنید. بعد از ارسال، دسترسی کلاس‌ها تا زمان تأیید ادمین قفل می‌ماند.', meetingFlowTitle:'درخواست لینک جلسه', meetingFlow:'بعد از ارسال فرم، درخواست شما برای ادمین ثبت می‌شود. پس از تأیید، لینک جلسه و کد امنیتی برای شما فعال خواهد شد.'
    };
    var en={
      title:'Registration & Access Requests', desc:'This panel is inside the Online School Admin area and no longer appears under More. Tap a person’s name to open details.',
      meeting:'Meeting Access Requests', school:'School Registrations', loadMeeting:'Load meeting requests', loadSchool:'Load school registrations', refresh:'Refresh', pending:'Pending', approved:'Approved', rejected:'Rejected', approve:'Approve', reject:'Reject', del:'Delete', noRows:'Nothing to display.', login:'Sign in with the admin email to view this area.', name:'Name', email:'Email', phone:'Phone', country:'Country', city:'City', status:'Status', date:'Date', details:'Details', code:'Meeting code', link:'Meeting link', saved:'Done.', error:'Error', confirmDelete:'Are you sure you want to delete this item?', confirmReject:'Are you sure you want to reject this item?', loading:'Loading...', sent:'Your request was successfully sent to admin. Please wait for approval.', sentSchool:'Your school registration was successfully sent to admin. Please wait for approval.', schoolFlowTitle:'School registration steps', schoolFlowAuth:'1) Create an account with your email. 2) Open your email inbox and confirm your email address. 3) Sign in again and complete the school registration form. 4) Wait for admin approval.', schoolFlowReg:'Your email has been confirmed and you are signed in. Now complete the school registration form. After submission, class access stays locked until admin approval.', meetingFlowTitle:'Meeting link request', meetingFlow:'After you submit the form, your request is sent to the admin. Once approved, the meeting link and security code will be activated for you.'
    };
    var hr={
      title:'Zahtjevi za registraciju i pristup', desc:'Ovaj panel je unutar Admin područja Online škole i više se ne prikazuje pod More. Dodirnite ime osobe za detalje.',
      meeting:'Zahtjevi za pristup sastanku', school:'Registracije za školu', loadMeeting:'Učitaj zahtjeve za sastanak', loadSchool:'Učitaj školske registracije', refresh:'Osvježi', pending:'Na čekanju', approved:'Odobreno', rejected:'Odbijeno', approve:'Odobri', reject:'Odbij', del:'Izbriši', noRows:'Nema podataka za prikaz.', login:'Prijavite se administratorskim e-mailom za pregled ovog područja.', name:'Ime', email:'Email', phone:'Telefon', country:'Država', city:'Grad', status:'Status', date:'Datum', details:'Detalji', code:'Kod sastanka', link:'Link sastanka', saved:'Gotovo.', error:'Greška', confirmDelete:'Jeste li sigurni da želite izbrisati ovaj zapis?', confirmReject:'Jeste li sigurni da želite odbiti ovaj zapis?', loading:'Učitavanje...', sent:'Vaš zahtjev je uspješno poslan administratoru. Molimo pričekajte odobrenje.', sentSchool:'Vaša registracija za školu je uspješno poslana administratoru. Molimo pričekajte odobrenje.', schoolFlowTitle:'Koraci registracije za školu', schoolFlowAuth:'1) Izradite račun sa svojim emailom. 2) Otvorite email inbox i potvrdite email adresu. 3) Ponovno se prijavite i ispunite obrazac za školu. 4) Pričekajte odobrenje administratora.', schoolFlowReg:'Vaš email je potvrđen i prijavljeni ste. Sada ispunite obrazac za školu. Nakon slanja, pristup lekcijama ostaje zaključan do odobrenja administratora.', meetingFlowTitle:'Zahtjev za link sastanka', meetingFlow:'Nakon slanja obrasca, zahtjev se šalje administratoru. Nakon odobrenja aktivirat će se link sastanka i sigurnosni kod.'
    };
    var l=lang();return(l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
  }

  function css(){
    if(document.getElementById('om7v6386Css'))return;
    var st=document.createElement('style');st.id='om7v6386Css';st.textContent=[
      '#om7v6385Admin,#v6363AdminCard{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important}',
      '#om7v6386AdminInSchool{border-top:6px solid #06146D!important;background:linear-gradient(160deg,#fff,#f8fbff)!important}',
      '#om7v6386AdminInSchool h3{margin:0 0 8px;color:#06146D;font-weight:950}',
      '#om7v6386AdminInSchool p{line-height:1.8;color:#24304F;font-weight:750}',
      '.om7v6386-actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}',
      '.om7v6386-btn{border:0;border-radius:999px;padding:9px 13px;font-weight:950;cursor:pointer;box-shadow:0 6px 16px rgba(6,20,109,.12)}',
      '.om7v6386-blue{background:#06146D;color:white}.om7v6386-green{background:#00B91F;color:white}.om7v6386-red{background:#fff0f0;color:#9b1c1c;border:1px solid #fecaca}.om7v6386-light{background:#eef4ff;color:#06146D}',
      '.om7v6386-row{background:#fff;border:1px solid #dbe3ef;border-radius:18px;padding:13px;margin:10px 0;box-shadow:0 4px 16px rgba(6,20,109,.05)}',
      '.om7v6386-row summary{cursor:pointer;font-weight:950;color:#06146D;display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap}',
      '.om7v6386-row.pending{border-inline-start:6px solid #F59E0B}.om7v6386-row.approved{border-inline-start:6px solid #00B91F}.om7v6386-row.rejected{border-inline-start:6px solid #ef4444}',
      '.om7v6386-badge{font-weight:950;border-radius:999px;padding:5px 10px;display:inline-block;background:#eef4ff;color:#06146D}.om7v6386-badge.approved{background:#eaffef;color:#08751a}.om7v6386-badge.rejected{background:#fff0f0;color:#9b1c1c}.om7v6386-badge.pending{background:#fff7df;color:#7a4d00}',
      '.om7v6386-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:12px 0}',
      '.om7v6386-field{background:#f8fbff;border-radius:12px;padding:8px;line-height:1.6}.om7v6386-field small{display:block;opacity:.65;font-weight:900}.om7v6386-field strong{color:#06146D;word-break:break-word}',
      '.om7v6386-note{background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:10px;margin:10px 0;color:#7c2d12;font-weight:800;line-height:1.7}',
      '.fa #om7v6386AdminInSchool{direction:rtl;text-align:right}',
      '.om7v6387-flow{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important}',
      '.om7v6387-flow h3{color:#06146D;margin:0 0 8px;font-weight:950}',
      '.om7v6387-flow p{line-height:1.9;font-weight:800;color:#24304F}',
      '#v6349SendQueue,#v6349ShowQueue,#v6349QueueBox{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important}',
      '.fa .om7v6387-flow{direction:rtl;text-align:right}'
    ].join('\n');document.head.appendChild(st);
  }

  function loadScript(src){return new Promise(function(resolve,reject){if(window.supabase&&window.supabase.createClient){resolve();return;}var s=document.querySelector('script[data-om7-supabase-sdk="1"]');if(s){s.addEventListener('load',resolve);s.addEventListener('error',reject);return;}s=document.createElement('script');s.src=src;s.async=true;s.dataset.om7SupabaseSdk='1';s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
  async function client(){if(sb&&sb.from&&sb.auth)return sb;var names=['omideno7Supabase','schoolSupabase','supabaseClient','om7Supabase','OMIDENO7_SUPABASE_CLIENT','__supabase'];for(var i=0;i<names.length;i++){var c=window[names[i]];if(c&&c.from&&c.auth){sb=c;return sb;}}if(!window.supabase||!window.supabase.createClient){await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');}sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);window.omideno7Supabase=sb;return sb;}
  async function user(){try{var c=await client();var r=await c.auth.getUser();return r&&r.data&&r.data.user?r.data.user:null;}catch(e){return null;}}
  function isAdminEmail(email){return ADMIN_EMAILS.indexOf(String(email||'').toLowerCase().trim())>-1;}
  function statusClass(s){s=String(s||'pending').toLowerCase();if(s==='approved'||s==='active')return'approved';if(s==='rejected'||s==='blocked'||s==='needs_followup')return'rejected';return'pending';}
  function statusLabel(s){var c=statusClass(s);return c==='approved'?T('approved'):(c==='rejected'?T('rejected'):T('pending'));}
  function dateVal(r){return r.created_at||r.registered_at||r.submitted_at||r.updated_at||'';}
  function field(label,value){return '<div class="om7v6386-field"><small>'+esc(label)+'</small><strong>'+esc(value||'—')+'</strong></div>';}

  async function safeSelect(table, orderCol){var c=await client();var r=await c.from(table).select('*').order(orderCol,{ascending:false}).limit(200);if(r.error)r=await c.from(table).select('*').limit(200);if(r.error)throw r.error;return r.data||[];}

  function meetingRow(r){
    var st=statusClass(r.status), name=r.full_name||r.name||((r.first_name||'')+' '+(r.last_name||'')).trim()||'—';
    var note=r.owner_note||r.note||r.message||'';
    return '<details class="om7v6386-row '+st+'"><summary><span>👤 '+esc(name)+'</span><span class="om7v6386-badge '+st+'">'+esc(statusLabel(r.status))+'</span><small>'+esc(r.email||'')+'</small></summary>'+ 
      '<div class="om7v6386-grid">'+field(T('name'),name)+field(T('email'),r.email)+field(T('phone'),r.phone||r.phone_number||'')+field(T('country'),r.country||r.residence_country||'')+field(T('date'),String(dateVal(r)).slice(0,19).replace('T',' '))+field(T('status'),statusLabel(r.status))+'</div>'+ 
      field(T('details'),(r.relationship||'')+' '+(r.reason||'')+' '+note)+'<div class="om7v6386-note">'+esc(T('link'))+': '+esc(MEETING_LINK)+'<br>'+esc(T('code'))+': '+esc(MEETING_CODE)+'</div>'+ 
      '<div class="om7v6386-actions"><button class="om7v6386-btn om7v6386-green" data-om7v6386-meeting-approve="'+esc(r.id)+'">✅ '+esc(T('approve'))+'</button><button class="om7v6386-btn om7v6386-light" data-om7v6386-meeting-reject="'+esc(r.id)+'">⛔ '+esc(T('reject'))+'</button><button class="om7v6386-btn om7v6386-red" data-om7v6386-meeting-delete="'+esc(r.id)+'">🗑 '+esc(T('del'))+'</button></div></details>';
  }
  function schoolRow(r){
    var st=statusClass(r.status), name=r.full_name||'—';
    var id=r.user_id||r.id;
    return '<details class="om7v6386-row '+st+'"><summary><span>🎓 '+esc(name)+'</span><span class="om7v6386-badge '+st+'">'+esc(statusLabel(r.status))+'</span><small>'+esc(r.email||'')+'</small></summary>'+ 
      '<div class="om7v6386-grid">'+field(T('name'),name)+field(T('email'),r.email)+field(T('phone'),r.phone)+field(T('country'),r.country)+field(T('city'),r.city)+field(T('date'),String(dateVal(r)).slice(0,19).replace('T',' '))+field(T('status'),statusLabel(r.status))+'</div>'+ 
      field(T('details'),'Language: '+(r.preferred_language||'')+' | Believer: '+(r.is_believer?'Yes':'No')+' | Years: '+(r.years_believer||'')+' | Church: '+(r.church_name||'')+' | Pastor: '+(r.pastor_name||'')+' | Testimony: '+(r.testimony||''))+ 
      '<div class="om7v6386-actions"><button class="om7v6386-btn om7v6386-green" data-om7v6386-school-approve="'+esc(id)+'">✅ '+esc(T('approve'))+'</button><button class="om7v6386-btn om7v6386-light" data-om7v6386-school-reject="'+esc(id)+'">⛔ '+esc(T('reject'))+'</button><button class="om7v6386-btn om7v6386-red" data-om7v6386-school-delete="'+esc(id)+'">🗑 '+esc(T('del'))+'</button></div></details>';
  }

  async function loadMeetings(){var box=document.getElementById('om7v6386MeetingList');if(!box)return;box.innerHTML='<div class="om7v6386-note">⏳ '+esc(T('loading'))+'</div>';try{var rows=await safeSelect('access_requests','created_at');box.innerHTML=rows.length?rows.map(meetingRow).join(''):'<div class="om7v6386-note">'+esc(T('noRows'))+'</div>';bindButtons();}catch(e){box.innerHTML='<div class="om7v6386-note">'+esc(T('error'))+': '+esc(e.message||String(e))+'</div>';}}
  async function loadSchools(){var box=document.getElementById('om7v6386SchoolList');if(!box)return;box.innerHTML='<div class="om7v6386-note">⏳ '+esc(T('loading'))+'</div>';try{var rows=await safeSelect('school_students','updated_at');box.innerHTML=rows.length?rows.map(schoolRow).join(''):'<div class="om7v6386-note">'+esc(T('noRows'))+'</div>';bindButtons();}catch(e){box.innerHTML='<div class="om7v6386-note">'+esc(T('error'))+': '+esc(e.message||String(e))+'</div>';}}
  async function updateMeeting(id,payload){var c=await client();var r=await c.from('access_requests').update(payload).eq('id',id);if(r.error)throw r.error;}
  async function deleteMeeting(id){var c=await client();var r=await c.from('access_requests').delete().eq('id',id);if(r.error)throw r.error;}
  async function updateSchool(id,payload){var c=await client();var r=await c.from('school_students').update(payload).eq('user_id',id);if(r.error){r=await c.from('school_students').update(payload).eq('id',id);}if(r.error)throw r.error;}
  async function deleteSchool(id){var c=await client();var r=await c.from('school_students').delete().eq('user_id',id);if(r.error){r=await c.from('school_students').delete().eq('id',id);}if(r.error)throw r.error;}
  function bindButtons(){
    document.querySelectorAll('[data-om7v6386-meeting-approve]').forEach(function(b){if(b.dataset.bound)return;b.dataset.bound='1';b.onclick=async function(){try{await updateMeeting(b.dataset.om7v6386MeetingApprove,{status:'approved',approved_role:'approved_member',owner_note:'Approved by admin. Meeting link: '+MEETING_LINK+' | Code: '+MEETING_CODE});alert(T('saved'));loadMeetings();}catch(e){alert(T('error')+': '+(e.message||e));}};});
    document.querySelectorAll('[data-om7v6386-meeting-reject]').forEach(function(b){if(b.dataset.bound)return;b.dataset.bound='1';b.onclick=async function(){if(!confirm(T('confirmReject')))return;try{await updateMeeting(b.dataset.om7v6386MeetingReject,{status:'rejected',approved_role:null,owner_note:'Rejected by admin'});alert(T('saved'));loadMeetings();}catch(e){alert(T('error')+': '+(e.message||e));}};});
    document.querySelectorAll('[data-om7v6386-meeting-delete]').forEach(function(b){if(b.dataset.bound)return;b.dataset.bound='1';b.onclick=async function(){if(!confirm(T('confirmDelete')))return;try{await deleteMeeting(b.dataset.om7v6386MeetingDelete);alert(T('saved'));loadMeetings();}catch(e){alert(T('error')+': '+(e.message||e));}};});
    document.querySelectorAll('[data-om7v6386-school-approve]').forEach(function(b){if(b.dataset.bound)return;b.dataset.bound='1';b.onclick=async function(){try{await updateSchool(b.dataset.om7v6386SchoolApprove,{status:'approved',updated_at:new Date().toISOString()});alert(T('saved'));loadSchools();}catch(e){alert(T('error')+': '+(e.message||e));}};});
    document.querySelectorAll('[data-om7v6386-school-reject]').forEach(function(b){if(b.dataset.bound)return;b.dataset.bound='1';b.onclick=async function(){if(!confirm(T('confirmReject')))return;try{await updateSchool(b.dataset.om7v6386SchoolReject,{status:'needs_followup',updated_at:new Date().toISOString()});alert(T('saved'));loadSchools();}catch(e){alert(T('error')+': '+(e.message||e));}};});
    document.querySelectorAll('[data-om7v6386-school-delete]').forEach(function(b){if(b.dataset.bound)return;b.dataset.bound='1';b.onclick=async function(){if(!confirm(T('confirmDelete')))return;try{await deleteSchool(b.dataset.om7v6386SchoolDelete);alert(T('saved'));loadSchools();}catch(e){alert(T('error')+': '+(e.message||e));}};});
  }

  async function injectIntoSchoolAdmin(){
    css();
    var more=document.getElementById('more');
    // The old panels are hidden by CSS. Removing is not repeated to avoid layout jumping.
    var adminMain=document.getElementById('adminMainArea');
    if(!adminMain)return;
    if(document.getElementById('om7v6386AdminInSchool'))return;
    var u=await user();
    var card=document.createElement('div');card.id='om7v6386AdminInSchool';card.className='school-card card';
    if(!u||!isAdminEmail(u.email)){
      card.innerHTML='<h3>🛡️ '+esc(T('title'))+'</h3><div class="om7v6386-note">'+esc(T('login'))+'</div>';
    }else{
      card.innerHTML='<h3>🛡️ '+esc(T('title'))+'</h3><p>'+esc(T('desc'))+'</p>'+ 
        '<div class="om7v6386-actions"><button class="om7v6386-btn om7v6386-blue" id="om7v6386LoadMeetings">🔄 '+esc(T('loadMeeting'))+'</button><button class="om7v6386-btn om7v6386-green" id="om7v6386LoadSchools">🎓 '+esc(T('loadSchool'))+'</button></div>'+ 
        '<h4>'+esc(T('meeting'))+'</h4><div id="om7v6386MeetingList"><div class="om7v6386-note">'+esc(T('loadMeeting'))+'</div></div>'+ 
        '<h4>'+esc(T('school'))+'</h4><div id="om7v6386SchoolList"><div class="om7v6386-note">'+esc(T('loadSchool'))+'</div></div>';
    }
    adminMain.insertBefore(card, adminMain.firstChild);
    var bm=document.getElementById('om7v6386LoadMeetings');if(bm)bm.onclick=loadMeetings;
    var bs=document.getElementById('om7v6386LoadSchools');if(bs)bs.onclick=loadSchools;
    // Load both lists once when the admin panel is created, without re-rendering on every click.
    setTimeout(function(){ try{loadMeetings(); loadSchools();}catch(e){} },120);
  }

  async function submitMeetingForm(form){
    var f=new FormData(form);
    var first=String(f.get('first_name')||'').trim(), last=String(f.get('last_name')||'').trim();
    var email=String(f.get('email')||'').trim();
    if(!email||email.indexOf('@')<1)throw new Error('Invalid email');
    var payload={full_name:(first+' '+last).trim()||email,email:email,country:String(f.get('residence_country')||f.get('country')||f.get('origin')||'Unknown').trim()||'Unknown',relationship:'member',reason:'participate',status:'pending',approved_role:null,risk:'normal',owner_note:'Phone: '+String(f.get('phone')||'')+' | Origin: '+String(f.get('origin')||'')+' | App: '+VERSION};
    var c=await client();var r=await c.from('access_requests').insert(payload).select('id,email,status').single();if(r.error)throw r.error;return r.data;
  }
  function replaceMeetingFormWithSuccess(form,email){var box=form.closest('.v6349-box')||form.parentElement;if(box){box.innerHTML='<h2>✅ '+esc(T('sent'))+'</h2><div class="v6349-status ok">'+esc(T('sent'))+'</div><p>📧 '+esc(email||'')+'</p><div class="v6349-actions"><button class="btn primary" id="om7v6386CloseReg">OK</button></div>';var btn=document.getElementById('om7v6386CloseReg');if(btn)btn.onclick=function(){var m=document.getElementById('v6349Modal');if(m)m.remove();};}else alert(T('sent'));}
  function bindMeetingForm(){var form=document.getElementById('v6349Form');if(!form||form.dataset.om7v6386Bound==='1')return;form.dataset.om7v6386Bound='1';form.addEventListener('submit',async function(ev){ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();var status=document.getElementById('v6349Status');try{if(status)status.innerHTML='<div class="v6349-status warn">'+esc(T('loading'))+'</div>';var email=String(new FormData(form).get('email')||'');await submitMeetingForm(form);replaceMeetingFormWithSuccess(form,email);}catch(e){var msg=e&&e.message?e.message:String(e);if(status)status.innerHTML='<div class="v6349-status error">'+esc(T('error'))+': '+esc(msg)+'</div>';alert(T('error')+': '+msg);}return false;},true);}


  function flowCard(id,title,text){return '<div id="'+esc(id)+'" class="school-card om7v6387-flow"><h3>ℹ️ '+esc(title)+'</h3><p>'+esc(text)+'</p></div>';}
  function injectSchoolFlow(){
    css();
    var body=document.getElementById('schoolBody');
    if(!body)return;
    if(document.getElementById('schoolSignup')||document.getElementById('schoolLogin')){
      if(!document.getElementById('om7v6387SchoolFlowAuth')){
        body.insertAdjacentHTML('afterbegin',flowCard('om7v6387SchoolFlowAuth',T('schoolFlowTitle'),T('schoolFlowAuth')));
      }
    }
    if(document.getElementById('schoolRegistration')){
      if(!document.getElementById('om7v6387SchoolFlowReg')){
        body.insertAdjacentHTML('afterbegin',flowCard('om7v6387SchoolFlowReg',T('schoolFlowTitle'),T('schoolFlowReg')));
      }
    }
  }
  function injectMeetingFlow(){
    css();
    var form=document.getElementById('v6349Form');
    if(!form||document.getElementById('om7v6387MeetingFlow'))return;
    form.insertAdjacentHTML('beforebegin','<div id="om7v6387MeetingFlow" class="v6349-status warn"><strong>'+esc(T('meetingFlowTitle'))+'</strong><br>'+esc(T('meetingFlow'))+'</div>');
  }

  function autoOpenAdminFromQuery(){
    if(!/[?&](admin|school_admin)=1/i.test(location.search))return;
    if(autoAdminTries++>25)return;
    var schoolBtn=document.querySelector('[data-page="school"]');
    if(schoolBtn && !document.getElementById('school')?.classList.contains('active')){schoolBtn.click();}
    setTimeout(function(){var adminTab=document.querySelector('[data-school-view="admin"]');if(adminTab)adminTab.click();injectIntoSchoolAdmin();},500);
  }

  function boot(){css();bindMeetingForm();injectMeetingFlow();injectSchoolFlow();injectIntoSchoolAdmin();autoOpenAdminFromQuery();}
  document.addEventListener('DOMContentLoaded',boot);
  window.addEventListener('load',boot);
  document.addEventListener('click',function(){setTimeout(boot,180);},true);
  var mo=new MutationObserver(function(){setTimeout(boot,120);});
  try{mo.observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
  setTimeout(boot,700);setTimeout(boot,1600);setTimeout(boot,3200);
  window.OMIDENO7_V6387_FINAL_FIX={version:VERSION,inject:injectIntoSchoolAdmin,loadMeetings:loadMeetings,loadSchools:loadSchools,injectSchoolFlow:injectSchoolFlow};
})();
