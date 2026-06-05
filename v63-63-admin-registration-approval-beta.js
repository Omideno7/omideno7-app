
/* Omideno7 V63.65 — Admin Registration Approval in School/Admin Panel ONLY
   Replacement for v63-63-admin-registration-approval-beta.js
   - Removes the old More-page admin card if present.
   - Adds the registration approval card only inside the School/Admin management area.
   - Does not touch Home, New Birth, Word, Plans, Bible, medals, offline, cloud, or layout.
*/
(function(){
'use strict';

var VERSION='V63.70 Admin Approval Stable List';
var ADMIN_EMAILS=['omideno7church@gmail.com'];
var TABLE='church_member_registrations';
var CODE='789987';
var currentRows=[];

function norm(v){
  v=String(v||'').toLowerCase().trim();
  if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1)return'en';
  if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1)return'hr';
  return'fa';
}
function lang(){try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa')}catch(e){return'fa'}}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function T(k){
  var fa={
    title:'درخواست‌های ثبت‌نام کلیسا',
    sub:'در این بخش ادمین ثبت‌نام‌های کلیسا را بررسی می‌کند و کد ورود جلسه را فعال می‌سازد.',
    load:'بارگذاری درخواست‌ها',
    refresh:'بروزرسانی',
    pending:'در انتظار تأیید',
    approved:'تأیید شده',
    approve:'تأیید و فعال‌سازی کد جلسه',
    noRows:'درخواستی برای نمایش وجود ندارد.',
    error:'خطا در دریافت یا تأیید اطلاعات',
    sqlNeeded:'اگر لیست باز نشد یا تأیید انجام نشد، فایل SQL مربوط به تأیید ثبت‌نام را یک بار در Supabase اجرا کن.',
    email:'ایمیل',
    name:'نام',
    phone:'تلفن',
    status:'وضعیت',
    code:'کد جلسه',
    date:'تاریخ ثبت',
    saved:'کاربر تأیید شد و کد جلسه فعال شد.',
    loading:'در حال بارگذاری...',
    adminOnly:'این بخش فقط برای ادمین است.',
    openSchool:'این کارت فقط در پنل مدیریت/مدرسه نمایش داده می‌شود.',
    details:'جزئیات'
  };
  var en={
    title:'Church Registration Requests',
    sub:'Admin reviews church registrations here and activates the meeting access code.',
    load:'Load requests',
    refresh:'Refresh',
    pending:'Pending',
    approved:'Approved',
    approve:'Approve & activate meeting code',
    noRows:'No requests to display.',
    error:'Error while loading or approving data',
    sqlNeeded:'If loading or approval fails, run the registration approval SQL once in Supabase.',
    email:'Email',
    name:'Name',
    phone:'Phone',
    status:'Status',
    code:'Meeting code',
    date:'Registered',
    saved:'User approved and meeting code activated.',
    loading:'Loading...',
    adminOnly:'Admin only.',
    openSchool:'This card appears only inside the School/Admin panel.',
    details:'Details'
  };
  var hr={
    title:'Zahtjevi za registraciju crkve',
    sub:'Administrator ovdje pregledava registracije i aktivira kod za sastanak.',
    load:'Učitaj zahtjeve',
    refresh:'Osvježi',
    pending:'Na čekanju',
    approved:'Odobreno',
    approve:'Odobri i aktiviraj kod',
    noRows:'Nema zahtjeva za prikaz.',
    error:'Greška pri učitavanju ili odobravanju podataka',
    sqlNeeded:'Ako učitavanje ili odobrenje ne radi, jednom pokrenite SQL za odobrenje registracije u Supabaseu.',
    email:'E-mail',
    name:'Ime',
    phone:'Telefon',
    status:'Status',
    code:'Kod sastanka',
    date:'Registrirano',
    saved:'Korisnik je odobren i kod za sastanak je aktiviran.',
    loading:'Učitavanje...',
    adminOnly:'Samo za administratora.',
    openSchool:'Ova kartica se prikazuje samo u školskom/admin panelu.',
    details:'Detalji'
  };
  var l=lang();return(l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
}
function css(){
  if(document.getElementById('v6365AdminApprovalCss'))return;
  var st=document.createElement('style'); st.id='v6365AdminApprovalCss';
  st.textContent=[
    '#v6363AdminCard{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important;}',
    '#v6365AdminApprovalCard{border-top:5px solid #06146D!important;background:linear-gradient(160deg,#fff,#f8fbff)!important;margin-top:14px!important}',
    '#v6365AdminApprovalCard h3{margin:0 0 8px;color:#06146D;font-weight:950}',
    '#v6365AdminApprovalCard p{line-height:1.8;color:#24304F;font-weight:750}',
    '.v6365-actions{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}',
    '.v6365-btn{border:0;border-radius:999px;padding:10px 14px;font-weight:950;cursor:pointer;box-shadow:0 6px 16px rgba(6,20,109,.12)}',
    '.v6365-blue{background:#06146D;color:#fff}.v6365-green{background:#00B91F;color:#fff}.v6365-light{background:#eef4ff;color:#06146D}.v6365-gold{background:#F59E0B;color:#fff}',
    '.v6365-row{background:#fff;border:1px solid #dbe3ef;border-radius:18px;padding:13px;margin:10px 0;box-shadow:0 4px 16px rgba(6,20,109,.05)}',
    '.v6365-row.pending{border-inline-start:6px solid #F59E0B}.v6365-row.approved{border-inline-start:6px solid #00B91F}',
    '.v6365-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:8px;margin:8px 0}',
    '.v6365-field{background:#f8fbff;border-radius:12px;padding:8px;line-height:1.6}.v6365-field small{display:block;opacity:.65;font-weight:900}.v6365-field strong{color:#06146D;word-break:break-word}',
    '.v6365-status{font-weight:950;border-radius:999px;padding:5px 10px;display:inline-block;background:#eef4ff;color:#06146D}',
    '.v6365-note{background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:10px;margin:10px 0;color:#7c2d12;font-weight:800;line-height:1.7}',
    '.v6365-ok{background:#ecfdf5!important;border-color:#bbf7d0!important;color:#065f46!important}',
    '.fa #v6365AdminApprovalCard{direction:rtl;text-align:right}'
  ].join('\n');
  document.head.appendChild(st);
}
function findClient(){return window.supabaseClient||window.supabase||window.sb||window.SUPABASE_CLIENT||null}
async function getUser(){
  var sb=findClient();
  try{if(sb&&sb.auth&&sb.auth.getUser){var r=await sb.auth.getUser();return r&&r.data&&r.data.user}}catch(e){}
  return null;
}
function isAdminEmail(email){return ADMIN_EMAILS.indexOf(String(email||'').toLowerCase().trim())>-1}
function val(row, keys){
  for(var i=0;i<keys.length;i++){
    if(row && row[keys[i]]!=null && row[keys[i]]!=='')return row[keys[i]];
  }
  return '';
}
function statusOf(row){
  if(row && (row.approval_status==='approved'||row.status==='approved'||row.meeting_access_visible===true))return 'approved';
  return 'pending';
}
function removeOldMoreCard(){
  var old=document.getElementById('v6363AdminCard');
  if(old)old.remove();
}
function findSchoolAdminTarget(){
  // Prefer an existing school/admin page area.
  var candidates=[
    '#school',
    '#schoolPage',
    '#schoolContent',
    '#schoolAdminPanel',
    '#adminPanel',
    '#admin',
    '[data-page="school"]',
    '.school-admin',
    '.admin-panel',
    '.school-panel'
  ];
  for(var i=0;i<candidates.length;i++){
    var el=document.querySelector(candidates[i]);
    if(el && el.offsetParent!==null)return el;
  }
  for(var j=0;j<candidates.length;j++){
    var hidden=document.querySelector(candidates[j]);
    if(hidden)return hidden;
  }

  // If admin/Q&A management was dynamically rendered as a card, attach near it.
  var all=Array.prototype.slice.call(document.querySelectorAll('section,.page,.card,main div'));
  var adminLike=all.find(function(el){
    var tx=(el.textContent||'').slice(0,1000);
    return /پرسش و پاسخ|مدیریت|ادمین|Admin|Q&A|Questions|School|مدرسه/i.test(tx) && /approve|answer|پاسخ|سوال|دانش|ثبت|admin|مدیریت/i.test(tx);
  });
  if(adminLike)return adminLike;

  return null;
}
async function canShow(){
  var user=await getUser();
  return !!(user && isAdminEmail(user.email));
}
async function renderCard(){
  css();
  removeOldMoreCard();

  var ok=await canShow();
  var existing=document.getElementById('v6365AdminApprovalCard');
  if(!ok){ if(existing)existing.remove(); return; }

  var target=findSchoolAdminTarget();
  if(!target){
    // Do not place it in More/Home. Wait until admin/school panel exists.
    if(existing)existing.remove();
    return;
  }

  // Do not place inside bottom nav/header.
  if(target.closest && (target.closest('nav')||target.closest('header'))){return;}

  if(!existing){
    existing=document.createElement('div');
    existing.id='v6365AdminApprovalCard';
    existing.className='card';
  }

  if(!existing.parentNode || existing.parentNode!==target){
    // Try to place after Q&A/admin card if target contains multiple cards.
    var cards=Array.prototype.slice.call(target.querySelectorAll('.card'));
    var qa=cards.find(function(c){return /پرسش و پاسخ|Q&A|Questions|سوال|پاسخ/i.test(c.textContent||'')});
    if(qa && qa.parentNode){ qa.parentNode.insertBefore(existing, qa.nextSibling); }
    else { target.appendChild(existing); }
  }

  if(existing.dataset.v6370Initialized!=='1'){
    existing.dataset.v6370Initialized='1';
    existing.innerHTML='<h3>🛡️ '+esc(T('title'))+'</h3><p>'+esc(T('sub'))+'</p>'
      + '<div class="v6365-actions">'
      + '<button class="v6365-btn v6365-blue" data-v6365-load="1">🔄 '+esc(T('load'))+'</button>'
      + '<button class="v6365-btn v6365-light" data-v6365-refresh="1">'+esc(T('refresh'))+'</button>'
      + '</div><div id="v6365List"><div class="v6365-note">'+esc(T('openSchool'))+'</div></div>';
  }
}
function renderRows(rows){
  currentRows=rows||[];
  var box=document.getElementById('v6365List');
  if(!box)return;
  if(!rows||!rows.length){box.innerHTML='<div class="v6365-note">'+esc(T('noRows'))+'</div>';return;}
  box.innerHTML=rows.map(function(row,idx){
    var st=statusOf(row);
    var name=val(row,['full_name','name','first_name','last_name','display_name']);
    var email=val(row,['email']);
    var phone=val(row,['phone','phone_number','mobile','contact_number']);
    var created=val(row,['created_at','inserted_at','submitted_at']);
    var code=val(row,['meeting_access_code'])||'—';
    var id=val(row,['id']);
    var raw=Object.keys(row||{}).filter(function(k){return row[k]!=null && row[k]!==''}).slice(0,18).map(function(k){return '<div class="v6365-field"><small>'+esc(k)+'</small><strong>'+esc(String(row[k]).slice(0,160))+'</strong></div>'}).join('');
    return '<div class="v6365-row '+st+'" data-id="'+esc(id)+'">'
      + '<div class="v6365-grid">'
      + '<div class="v6365-field"><small>'+esc(T('name'))+'</small><strong>'+esc(name||'—')+'</strong></div>'
      + '<div class="v6365-field"><small>'+esc(T('email'))+'</small><strong>'+esc(email||'—')+'</strong></div>'
      + '<div class="v6365-field"><small>'+esc(T('phone'))+'</small><strong>'+esc(phone||'—')+'</strong></div>'
      + '<div class="v6365-field"><small>'+esc(T('status'))+'</small><span class="v6365-status">'+esc(st==='approved'?T('approved'):T('pending'))+'</span></div>'
      + '<div class="v6365-field"><small>'+esc(T('code'))+'</small><strong>'+esc(code)+'</strong></div>'
      + '<div class="v6365-field"><small>'+esc(T('date'))+'</small><strong>'+esc(created?String(created).slice(0,19).replace('T',' '):'—')+'</strong></div>'
      + '</div>'
      + '<details><summary class="v6365-btn v6365-light" style="display:inline-block;margin-top:8px">'+esc(T('details'))+'</summary><div class="v6365-grid" style="margin-top:10px">'+raw+'</div></details>'
      + (st==='approved'?'':'<div class="v6365-actions"><button class="v6365-btn v6365-green" data-v6365-approve="'+esc(id)+'">✅ '+esc(T('approve'))+'</button></div>')
      + '</div>';
  }).join('');
}
async function loadRows(){
  css();
  await renderCard();
  var box=document.getElementById('v6365List');
  if(box)box.innerHTML='<div class="v6365-note">⏳ '+esc(T('loading'))+'</div>';
  var sb=findClient();
  if(!sb||!sb.from){if(box)box.innerHTML='<div class="v6365-note">'+esc(T('error'))+' — Supabase client not found.</div>';return;}
  var user=await getUser();
  if(!user||!isAdminEmail(user.email)){if(box)box.innerHTML='<div class="v6365-note">'+esc(T('adminOnly'))+'</div>';return;}

  try{
    if(sb.rpc){
      var rpc=await sb.rpc('om7_admin_list_registrations');
      if(!rpc.error && rpc.data){renderRows(rpc.data);return;}
    }
  }catch(e){}

  try{
    var r=await sb.from(TABLE).select('*').order('created_at',{ascending:false}).limit(100);
    if(r.error)throw r.error;
    renderRows(r.data||[]);
  }catch(err){
    if(box)box.innerHTML='<div class="v6365-note">'+esc(T('error'))+'<br>'+esc(err&&err.message?err.message:String(err))+'<br><br>'+esc(T('sqlNeeded'))+'</div>';
  }
}
async function approve(id){
  if(!id)return;
  var sb=findClient();
  if(!sb){alert(T('error'));return;}
  try{
    if(sb.rpc){
      var rpc=await sb.rpc('om7_admin_approve_registration',{p_id:id});
      if(!rpc.error){await loadRows();alert(T('saved'));return;}
    }
  }catch(e){}
  try{
    var update={
      approval_status:'approved',
      status:'approved',
      meeting_access_visible:true,
      meeting_access_code:CODE,
      approved_at:new Date().toISOString()
    };
    var r=await sb.from(TABLE).update(update).eq('id',id).select();
    if(r.error)throw r.error;
    await loadRows();
    alert(T('saved'));
  }catch(err){
    alert(T('error')+': '+(err&&err.message?err.message:String(err))+'\n\n'+T('sqlNeeded'));
  }
}
document.addEventListener('click',function(e){
  var load=e.target.closest && e.target.closest('[data-v6365-load],[data-v6365-refresh]');
  if(load){e.preventDefault();e.stopPropagation();loadRows();return;}
  var app=e.target.closest && e.target.closest('[data-v6365-approve]');
  if(app){e.preventDefault();e.stopPropagation();approve(app.getAttribute('data-v6365-approve'));return;}
},true);

function render(){renderCard();}
document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
setTimeout(render,800);
setTimeout(render,2200);
setInterval(function(){
  if(!document.getElementById('v6365AdminApprovalCard')){
    render();
  }
},4500);
window.OMIDENO7_V6365_ADMIN_APPROVAL_SCHOOL_PANEL={render:render,loadRows:loadRows,approve:approve,version:VERSION};
})();
