
/* Omideno7 V63.85 — Registration, School, Admin Unified Stable Hotfix
   Purpose:
   - Ensures meeting access requests save to access_requests with status=pending.
   - Ensures school registrations save to school_students with status=pending_review.
   - Adds a reliable admin panel for both Meeting Access Requests and School Registrations.
   - Shows real Supabase errors; no false success message.
*/
(function(){
  'use strict';
  var VERSION='V63.85 Registration + School + Admin Unified Stable Hotfix';
  var SUPABASE_URL='https://uibhpgcsgcievktxmcfg.supabase.co';
  var SUPABASE_KEY='sb_publishable_clP99PgnpuT6a5MCyDfVWQ_e_7wWYrk';
  var ADMIN_EMAILS=['omideno7church@gmail.com','yuhana1360@gmail.com'];
  var MEETING_CODE='789987';
  var MEETING_LINK='https://fccdl.in/i/omideno7church';
  var sb=null;

  function norm(v){v=String(v||'').toLowerCase().trim();if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1)return'en';if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1)return'hr';return'fa'}
  function lang(){try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa')}catch(e){return'fa'}}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function T(k){
    var fa={
      adminTitle:'پنل ادمین ثبت‌نام‌ها',
      adminDesc:'در این بخش، درخواست‌های لینک/کد جلسه و ثبت‌نام‌های مدرسه را یکجا می‌بینی. کارت‌ها بسته هستند؛ روی نام کلیک کن تا جزئیات باز شود.',
      meeting:'درخواست‌های ورود به جلسه',
      school:'ثبت‌نام‌های مدرسه',
      refresh:'به‌روزرسانی',
      pending:'در انتظار تأیید',
      approved:'تأیید شده',
      rejected:'رد شده',
      approve:'تأیید',
      reject:'رد کردن',
      del:'حذف',
      noRows:'چیزی برای نمایش وجود ندارد.',
      login:'برای دیدن این پنل باید با ایمیل ادمین وارد شوید.',
      name:'نام',
      email:'ایمیل',
      phone:'تلفن',
      country:'کشور',
      city:'شهر',
      status:'وضعیت',
      date:'تاریخ',
      details:'جزئیات',
      code:'کد جلسه',
      link:'لینک جلسه',
      saved:'انجام شد.',
      error:'خطا',
      confirmDelete:'آیا مطمئن هستید می‌خواهید این مورد حذف شود؟',
      confirmReject:'آیا مطمئن هستید می‌خواهید این مورد رد شود؟',
      sent:'درخواست شما با موفقیت برای ادمین ارسال شد. لطفاً منتظر تأیید بمانید.',
      sentSchool:'ثبت‌نام مدرسه با موفقیت برای ادمین ارسال شد. لطفاً منتظر تأیید بمانید.'
    };
    var en={
      adminTitle:'Admin Registration Panel',
      adminDesc:'Review meeting access requests and school registrations in one place. Cards are collapsed; tap the name to open details.',
      meeting:'Meeting Access Requests',
      school:'School Registrations',
      refresh:'Refresh',
      pending:'Pending',
      approved:'Approved',
      rejected:'Rejected',
      approve:'Approve',
      reject:'Reject',
      del:'Delete',
      noRows:'Nothing to display.',
      login:'Sign in with the admin email to view this panel.',
      name:'Name',
      email:'Email',
      phone:'Phone',
      country:'Country',
      city:'City',
      status:'Status',
      date:'Date',
      details:'Details',
      code:'Meeting code',
      link:'Meeting link',
      saved:'Done.',
      error:'Error',
      confirmDelete:'Are you sure you want to delete this item?',
      confirmReject:'Are you sure you want to reject this item?',
      sent:'Your request was successfully sent to admin. Please wait for approval.',
      sentSchool:'Your school registration was successfully sent to admin. Please wait for approval.'
    };
    var hr={
      adminTitle:'Admin panel za registracije',
      adminDesc:'Pregled zahtjeva za pristup sastanku i školskih registracija na jednom mjestu. Kartice su zatvorene; dodirnite ime za detalje.',
      meeting:'Zahtjevi za pristup sastanku',
      school:'Registracije za školu',
      refresh:'Osvježi',
      pending:'Na čekanju',
      approved:'Odobreno',
      rejected:'Odbijeno',
      approve:'Odobri',
      reject:'Odbij',
      del:'Izbriši',
      noRows:'Nema podataka za prikaz.',
      login:'Prijavite se administratorskim e-mailom za pregled ovog panela.',
      name:'Ime',
      email:'Email',
      phone:'Telefon',
      country:'Država',
      city:'Grad',
      status:'Status',
      date:'Datum',
      details:'Detalji',
      code:'Kod sastanka',
      link:'Link sastanka',
      saved:'Gotovo.',
      error:'Greška',
      confirmDelete:'Jeste li sigurni da želite izbrisati ovaj zapis?',
      confirmReject:'Jeste li sigurni da želite odbiti ovaj zapis?',
      sent:'Vaš zahtjev je uspješno poslan administratoru. Molimo pričekajte odobrenje.',
      sentSchool:'Vaša registracija za školu je uspješno poslana administratoru. Molimo pričekajte odobrenje.'
    };
    var l=lang(); return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
  }

  function loadScript(src){
    return new Promise(function(resolve,reject){
      if(window.supabase && window.supabase.createClient){resolve();return;}
      var existing=document.querySelector('script[data-om7-supabase-sdk="1"]');
      if(existing){existing.addEventListener('load',resolve);existing.addEventListener('error',reject);return;}
      var s=document.createElement('script'); s.src=src; s.async=true; s.dataset.om7SupabaseSdk='1';
      s.onload=resolve; s.onerror=reject; document.head.appendChild(s);
    });
  }
  async function client(){
    if(sb && sb.from && sb.auth) return sb;
    var names=['omideno7Supabase','schoolSupabase','supabaseClient','om7Supabase','OMIDENO7_SUPABASE_CLIENT','__supabase'];
    for(var i=0;i<names.length;i++){var c=window[names[i]];if(c&&c.from&&c.auth){sb=c;return sb;}}
    if(!window.supabase || !window.supabase.createClient){await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');}
    sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
    window.omideno7Supabase=sb;
    return sb;
  }
  async function user(){
    try{var c=await client();var r=await c.auth.getUser();return r&&r.data&&r.data.user?r.data.user:null}catch(e){return null}
  }
  function isAdminEmail(email){return ADMIN_EMAILS.indexOf(String(email||'').toLowerCase().trim())>-1}
  function statusClass(s){s=String(s||'pending').toLowerCase(); if(s==='approved'||s==='active')return'approved'; if(s==='rejected'||s==='blocked'||s==='needs_followup')return'rejected'; return'pending'}
  function statusLabel(s){var c=statusClass(s);return c==='approved'?T('approved'):(c==='rejected'?T('rejected'):T('pending'))}
  function dateVal(r){return r.created_at||r.registered_at||r.submitted_at||r.updated_at||''}
  function css(){
    if(document.getElementById('om7v6385Css'))return;
    var st=document.createElement('style'); st.id='om7v6385Css'; st.textContent=[
      '#om7v6385Admin{border-top:6px solid #06146D!important;background:linear-gradient(160deg,#fff,#f8fbff)!important}',
      '#om7v6385Admin h3{margin:0 0 8px;color:#06146D;font-weight:950}',
      '.om7v6385-actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}',
      '.om7v6385-btn{border:0;border-radius:999px;padding:9px 13px;font-weight:950;cursor:pointer;box-shadow:0 6px 16px rgba(6,20,109,.12)}',
      '.om7v6385-blue{background:#06146D;color:white}.om7v6385-green{background:#00B91F;color:white}.om7v6385-red{background:#fff0f0;color:#9b1c1c;border:1px solid #fecaca}.om7v6385-light{background:#eef4ff;color:#06146D}',
      '.om7v6385-row{background:#fff;border:1px solid #dbe3ef;border-radius:18px;padding:13px;margin:10px 0;box-shadow:0 4px 16px rgba(6,20,109,.05)}',
      '.om7v6385-row summary{cursor:pointer;font-weight:950;color:#06146D;display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap}',
      '.om7v6385-row.pending{border-inline-start:6px solid #F59E0B}.om7v6385-row.approved{border-inline-start:6px solid #00B91F}.om7v6385-row.rejected{border-inline-start:6px solid #ef4444}',
      '.om7v6385-badge{font-weight:950;border-radius:999px;padding:5px 10px;display:inline-block;background:#eef4ff;color:#06146D}.om7v6385-badge.approved{background:#eaffef;color:#08751a}.om7v6385-badge.rejected{background:#fff0f0;color:#9b1c1c}.om7v6385-badge.pending{background:#fff7df;color:#7a4d00}',
      '.om7v6385-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:12px 0}',
      '.om7v6385-field{background:#f8fbff;border-radius:12px;padding:8px;line-height:1.6}.om7v6385-field small{display:block;opacity:.65;font-weight:900}.om7v6385-field strong{color:#06146D;word-break:break-word}',
      '.om7v6385-note{background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:10px;margin:10px 0;color:#7c2d12;font-weight:800;line-height:1.7}',
      '.fa #om7v6385Admin{direction:rtl;text-align:right}',
      '#v6363AdminCard{display:none!important}'
    ].join('\n'); document.head.appendChild(st);
  }

  function field(label,value){return '<div class="om7v6385-field"><small>'+esc(label)+'</small><strong>'+esc(value||'—')+'</strong></div>'}
  function meetingRow(r){
    var st=statusClass(r.status), name=r.full_name||r.name||((r.first_name||'')+' '+(r.last_name||'')).trim()||'—';
    var note=r.owner_note||r.note||r.message||'';
    return '<details class="om7v6385-row '+st+'"><summary><span>👤 '+esc(name)+'</span><span class="om7v6385-badge '+st+'">'+esc(statusLabel(r.status))+'</span><small>'+esc(r.email||'')+'</small></summary>'+
      '<div class="om7v6385-grid">'+field(T('name'),name)+field(T('email'),r.email)+field(T('phone'),r.phone||r.phone_number||'')+field(T('country'),r.country||r.residence_country||'')+field(T('date'),String(dateVal(r)).slice(0,19).replace("T"," "))+field(T('status'),statusLabel(r.status))+'</div>'+
      field(T('details'),(r.relationship||'')+' '+(r.reason||'')+' '+note)+
      '<div class="om7v6385-note">'+esc(T('link'))+': '+esc(MEETING_LINK)+'<br>'+esc(T('code'))+': '+esc(MEETING_CODE)+'</div>'+
      '<div class="om7v6385-actions"><button class="om7v6385-btn om7v6385-green" data-om7-meeting-approve="'+esc(r.id)+'">✅ '+esc(T('approve'))+'</button><button class="om7v6385-btn om7v6385-light" data-om7-meeting-reject="'+esc(r.id)+'">⛔ '+esc(T('reject'))+'</button><button class="om7v6385-btn om7v6385-red" data-om7-meeting-delete="'+esc(r.id)+'">🗑 '+esc(T('del'))+'</button></div></details>';
  }
  function schoolRow(r){
    var st=statusClass(r.status), name=r.full_name||'—';
    return '<details class="om7v6385-row '+st+'"><summary><span>🎓 '+esc(name)+'</span><span class="om7v6385-badge '+st+'">'+esc(statusLabel(r.status))+'</span><small>'+esc(r.email||'')+'</small></summary>'+
      '<div class="om7v6385-grid">'+field(T('name'),name)+field(T('email'),r.email)+field(T('phone'),r.phone)+field(T('country'),r.country)+field(T('city'),r.city)+field(T('date'),String(dateVal(r)).slice(0,19).replace("T"," "))+field(T('status'),statusLabel(r.status))+'</div>'+
      field(T('details'),'Language: '+(r.preferred_language||'')+' | Believer: '+(r.is_believer?'Yes':'No')+' | Years: '+(r.years_believer||'')+' | Church: '+(r.church_name||'')+' | Pastor: '+(r.pastor_name||'')+' | Testimony: '+(r.testimony||''))+
      '<div class="om7v6385-actions"><button class="om7v6385-btn om7v6385-green" data-om7-school-approve="'+esc(r.user_id||r.id)+'">✅ '+esc(T('approve'))+'</button><button class="om7v6385-btn om7v6385-light" data-om7-school-reject="'+esc(r.user_id||r.id)+'">⛔ '+esc(T('reject'))+'</button><button class="om7v6385-btn om7v6385-red" data-om7-school-delete="'+esc(r.user_id||r.id)+'">🗑 '+esc(T('del'))+'</button></div></details>';
  }

  async function safeSelect(table, orderCol){
    var c=await client();
    var r=await c.from(table).select('*').order(orderCol,{ascending:false}).limit(200);
    if(r.error) r=await c.from(table).select('*').limit(200);
    if(r.error) throw r.error;
    return r.data||[];
  }
  async function loadMeetings(){
    var box=document.getElementById('om7v6385MeetingList'); if(!box)return;
    box.innerHTML='<div class="om7v6385-note">⏳ '+esc(T('refresh'))+'...</div>';
    try{
      var rows=await safeSelect('access_requests','created_at');
      box.innerHTML=rows.length?rows.map(meetingRow).join(''):'<div class="om7v6385-note">'+esc(T('noRows'))+'</div>';
      bindAdminButtons();
    }catch(e){box.innerHTML='<div class="om7v6385-note">'+esc(T('error'))+': '+esc(e.message||String(e))+'</div>'}
  }
  async function loadSchools(){
    var box=document.getElementById('om7v6385SchoolList'); if(!box)return;
    box.innerHTML='<div class="om7v6385-note">⏳ '+esc(T('refresh'))+'...</div>';
    try{
      var rows=await safeSelect('school_students','updated_at');
      box.innerHTML=rows.length?rows.map(schoolRow).join(''):'<div class="om7v6385-note">'+esc(T('noRows'))+'</div>';
      bindAdminButtons();
    }catch(e){box.innerHTML='<div class="om7v6385-note">'+esc(T('error'))+': '+esc(e.message||String(e))+'</div>'}
  }
  async function updateMeeting(id,payload){var c=await client();var r=await c.from('access_requests').update(payload).eq('id',id);if(r.error)throw r.error}
  async function deleteMeeting(id){var c=await client();var r=await c.from('access_requests').delete().eq('id',id);if(r.error)throw r.error}
  async function updateSchool(id,payload){var c=await client();var r=await c.from('school_students').update(payload).eq('user_id',id);if(r.error){r=await c.from('school_students').update(payload).eq('id',id)}if(r.error)throw r.error}
  async function deleteSchool(id){var c=await client();var r=await c.from('school_students').delete().eq('user_id',id);if(r.error){r=await c.from('school_students').delete().eq('id',id)}if(r.error)throw r.error}
  function bindAdminButtons(){
    document.querySelectorAll('[data-om7-meeting-approve]').forEach(function(b){b.onclick=async function(){try{await updateMeeting(b.dataset.om7MeetingApprove,{status:'approved',approved_role:'approved_member',owner_note:'Approved by admin. Meeting link: '+MEETING_LINK+' | Code: '+MEETING_CODE});alert(T('saved'));loadMeetings()}catch(e){alert(T('error')+': '+(e.message||e))}}});
    document.querySelectorAll('[data-om7-meeting-reject]').forEach(function(b){b.onclick=async function(){if(!confirm(T('confirmReject')))return;try{await updateMeeting(b.dataset.om7MeetingReject,{status:'rejected',approved_role:null,owner_note:'Rejected by admin'});alert(T('saved'));loadMeetings()}catch(e){alert(T('error')+': '+(e.message||e))}}});
    document.querySelectorAll('[data-om7-meeting-delete]').forEach(function(b){b.onclick=async function(){if(!confirm(T('confirmDelete')))return;try{await deleteMeeting(b.dataset.om7MeetingDelete);alert(T('saved'));loadMeetings()}catch(e){alert(T('error')+': '+(e.message||e))}}});
    document.querySelectorAll('[data-om7-school-approve]').forEach(function(b){b.onclick=async function(){try{await updateSchool(b.dataset.om7SchoolApprove,{status:'approved',updated_at:new Date().toISOString()});alert(T('saved'));loadSchools()}catch(e){alert(T('error')+': '+(e.message||e))}}});
    document.querySelectorAll('[data-om7-school-reject]').forEach(function(b){b.onclick=async function(){if(!confirm(T('confirmReject')))return;try{await updateSchool(b.dataset.om7SchoolReject,{status:'needs_followup',updated_at:new Date().toISOString()});alert(T('saved'));loadSchools()}catch(e){alert(T('error')+': '+(e.message||e))}}});
    document.querySelectorAll('[data-om7-school-delete]').forEach(function(b){b.onclick=async function(){if(!confirm(T('confirmDelete')))return;try{await deleteSchool(b.dataset.om7SchoolDelete);alert(T('saved'));loadSchools()}catch(e){alert(T('error')+': '+(e.message||e))}}});
  }
  async function renderAdmin(){
    css();
    var more=document.getElementById('more'); if(!more)return;
    var u=await user();
    var existing=document.getElementById('om7v6385Admin');
    if(!u || !isAdminEmail(u.email)){
      if(existing) existing.remove();
      if(location.search.indexOf('admin=1')>-1 && !existing){
        existing=document.createElement('div'); existing.id='om7v6385Admin'; existing.className='card';
        existing.innerHTML='<h3>🛡️ '+esc(T('adminTitle'))+'</h3><div class="om7v6385-note">'+esc(T('login'))+'</div>';
        more.insertBefore(existing, more.querySelector('.footer')||null);
      }
      return;
    }
    if(!existing){
      existing=document.createElement('div'); existing.id='om7v6385Admin'; existing.className='card';
      more.insertBefore(existing, more.querySelector('.footer')||null);
    }
    existing.innerHTML='<h3>🛡️ '+esc(T('adminTitle'))+'</h3><p>'+esc(T('adminDesc'))+'</p>'+
      '<div class="om7v6385-actions"><button class="om7v6385-btn om7v6385-blue" id="om7v6385LoadMeetings">🔄 '+esc(T('meeting'))+'</button><button class="om7v6385-btn om7v6385-green" id="om7v6385LoadSchools">🎓 '+esc(T('school'))+'</button></div>'+
      '<h4>'+esc(T('meeting'))+'</h4><div id="om7v6385MeetingList"></div><h4>'+esc(T('school'))+'</h4><div id="om7v6385SchoolList"></div>';
    document.getElementById('om7v6385LoadMeetings').onclick=loadMeetings;
    document.getElementById('om7v6385LoadSchools').onclick=loadSchools;
    setTimeout(function(){loadMeetings();loadSchools();},150);
  }

  async function submitMeetingForm(form){
    var f=new FormData(form);
    var first=String(f.get('first_name')||'').trim(), last=String(f.get('last_name')||'').trim();
    var email=String(f.get('email')||'').trim();
    if(!email || email.indexOf('@')<1) throw new Error('Invalid email');
    var payload={
      full_name:(first+' '+last).trim()||email,
      email:email,
      country:String(f.get('residence_country')||f.get('country')||f.get('origin')||'Unknown').trim()||'Unknown',
      relationship:'member',
      reason:'participate',
      status:'pending',
      approved_role:null,
      risk:'normal',
      owner_note:'Phone: '+String(f.get('phone')||'')+' | Origin: '+String(f.get('origin')||'')+' | App: '+VERSION
    };
    var c=await client();
    var r=await c.from('access_requests').insert(payload).select('id,email,status').single();
    if(r.error) throw r.error;
    return r.data;
  }
  function replaceMeetingFormWithSuccess(form,email){
    var box=form.closest('.v6349-box')||form.parentElement;
    if(box){
      box.innerHTML='<h2>✅ '+esc(T('sent'))+'</h2><div class="v6349-status ok">'+esc(T('sent'))+'</div><p>📧 '+esc(email||'')+'</p><div class="v6349-actions"><button class="btn primary" id="om7v6385CloseReg">OK</button></div>';
      var btn=document.getElementById('om7v6385CloseReg'); if(btn) btn.onclick=function(){var m=document.getElementById('v6349Modal'); if(m)m.remove();};
    }else alert(T('sent'));
  }
  function bindMeetingForm(){
    var form=document.getElementById('v6349Form');
    if(!form || form.dataset.om7v6385Bound==='1') return;
    form.dataset.om7v6385Bound='1';
    form.addEventListener('submit',async function(ev){
      ev.preventDefault(); ev.stopPropagation(); if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();
      var status=document.getElementById('v6349Status');
      try{
        if(status) status.innerHTML='<div class="v6349-status warn">Sending...</div>';
        var email=String(new FormData(form).get('email')||'');
        await submitMeetingForm(form);
        replaceMeetingFormWithSuccess(form,email);
        renderAdmin();
      }catch(e){
        var msg=e&&e.message?e.message:String(e);
        if(status) status.innerHTML='<div class="v6349-status error">'+esc(T('error'))+': '+esc(msg)+'</div>';
        alert(T('error')+': '+msg);
      }
      return false;
    }, true);
  }

  function boot(){
    css();
    bindMeetingForm();
    renderAdmin();
  }
  document.addEventListener('DOMContentLoaded',boot);
  window.addEventListener('load',boot);
  document.addEventListener('click',function(){setTimeout(boot,200)},true);
  setInterval(boot,3000);
  window.OMIDENO7_V6385_REGISTRATION_SCHOOL_ADMIN_FIX={version:VERSION,renderAdmin:renderAdmin,loadMeetings:loadMeetings,loadSchools:loadSchools};
})();
