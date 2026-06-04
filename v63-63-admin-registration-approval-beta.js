
/* Omideno7 V63.63 — Admin Registration Approval
   Focused patch only:
   - Adds an admin-only card for church registration approvals.
   - Lets admin approve users and activate meeting code 789987.
   - Uses Supabase RPC if SQL is installed; falls back to direct table update if allowed.
   - Does not modify other app sections.
*/
(function(){
'use strict';

var VERSION='V63.63 Admin Registration Approval';
var ADMIN_EMAILS=['omideno7church@gmail.com','yuhana1360@gmail.com'];
var TABLE='church_member_registrations';
var CODE='789987';

function isBeta(){return /beta\.html/i.test(location.pathname)||/v=6363|v=6362|v=6361|v=6360|v=6359|v=6358/i.test(location.search)}
if(!isBeta()) return;

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
    sub:'این بخش فقط برای ادمین است. ثبت‌نام‌های جدید را بررسی و کد جلسه را فعال کن.',
    load:'بارگذاری درخواست‌ها',
    pending:'در انتظار تأیید',
    approved:'تأیید شده',
    approve:'تأیید و فعال‌سازی کد جلسه',
    refresh:'به‌روزرسانی',
    noAccess:'این بخش فقط برای ادمین فعال است.',
    noRows:'درخواستی برای نمایش وجود ندارد.',
    saved:'کاربر تأیید شد و کد جلسه فعال شد.',
    error:'خطا در دریافت یا تأیید اطلاعات',
    email:'ایمیل',
    name:'نام',
    phone:'تلفن',
    status:'وضعیت',
    code:'کد جلسه',
    date:'تاریخ ثبت',
    adminLogin:'برای دیدن درخواست‌ها ابتدا با ایمیل ادمین وارد شوید.',
    sqlNeeded:'اگر لیست باز نشد یا تأیید انجام نشد، فایل SQL نسخه V63.63 را یک بار در Supabase اجرا کن.'
  };
  var en={
    title:'Church Registration Requests',
    sub:'Admin only. Review new registrations and activate the meeting code.',
    load:'Load requests',
    pending:'Pending',
    approved:'Approved',
    approve:'Approve & activate meeting code',
    refresh:'Refresh',
    noAccess:'This section is available only for admin.',
    noRows:'No requests to display.',
    saved:'User approved and meeting code activated.',
    error:'Error while loading or approving data',
    email:'Email',
    name:'Name',
    phone:'Phone',
    status:'Status',
    code:'Meeting code',
    date:'Registered',
    adminLogin:'Sign in with the admin email to view requests.',
    sqlNeeded:'If loading or approval fails, run the V63.63 SQL file once in Supabase.'
  };
  var hr={
    title:'Zahtjevi za registraciju crkve',
    sub:'Samo za administratora. Pregledajte nove registracije i aktivirajte kod za sastanak.',
    load:'Učitaj zahtjeve',
    pending:'Na čekanju',
    approved:'Odobreno',
    approve:'Odobri i aktiviraj kod',
    refresh:'Osvježi',
    noAccess:'Ovaj odjeljak je dostupan samo administratoru.',
    noRows:'Nema zahtjeva za prikaz.',
    saved:'Korisnik je odobren i kod za sastanak je aktiviran.',
    error:'Greška pri učitavanju ili odobravanju podataka',
    email:'E-mail',
    name:'Ime',
    phone:'Telefon',
    status:'Status',
    code:'Kod sastanka',
    date:'Registrirano',
    adminLogin:'Prijavite se administratorskim e-mailom za pregled zahtjeva.',
    sqlNeeded:'Ako učitavanje ili odobrenje ne radi, jednom pokrenite SQL datoteku V63.63 u Supabaseu.'
  };
  var l=lang();return(l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
}
function css(){
  if(document.getElementById('v6363Css'))return;
  var st=document.createElement('style'); st.id='v6363Css';
  st.textContent=[
    '#v6363AdminCard{border-top:5px solid #06146D!important;background:linear-gradient(160deg,#fff,#f8fbff)!important}',
    '#v6363AdminCard h3{margin:0 0 8px;color:#06146D;font-weight:950}',
    '#v6363AdminCard p{line-height:1.8;color:#24304F;font-weight:750}',
    '.v6363-actions{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}',
    '.v6363-btn{border:0;border-radius:999px;padding:10px 14px;font-weight:950;cursor:pointer;box-shadow:0 6px 16px rgba(6,20,109,.12)}',
    '.v6363-blue{background:#06146D;color:#fff}.v6363-green{background:#00B91F;color:#fff}.v6363-light{background:#eef4ff;color:#06146D}',
    '.v6363-row{background:#fff;border:1px solid #dbe3ef;border-radius:18px;padding:13px;margin:10px 0;box-shadow:0 4px 16px rgba(6,20,109,.05)}',
    '.v6363-row.pending{border-inline-start:6px solid #F59E0B}.v6363-row.approved{border-inline-start:6px solid #00B91F}',
    '.v6363-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin:8px 0}',
    '.v6363-field{background:#f8fbff;border-radius:12px;padding:8px;line-height:1.6}.v6363-field small{display:block;opacity:.65;font-weight:900}.v6363-field strong{color:#06146D}',
    '.v6363-status{font-weight:950;border-radius:999px;padding:5px 10px;display:inline-block;background:#eef4ff;color:#06146D}',
    '.v6363-note{background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:10px;margin:10px 0;color:#7c2d12;font-weight:800;line-height:1.7}',
    '.fa #v6363AdminCard{direction:rtl;text-align:right}'
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
  if(row.approval_status==='approved'||row.status==='approved'||row.meeting_access_visible===true)return 'approved';
  return 'pending';
}
function renderRows(rows){
  var box=document.getElementById('v6363List');
  if(!box)return;
  if(!rows||!rows.length){box.innerHTML='<div class="v6363-note">'+esc(T('noRows'))+'</div>';return;}
  box.innerHTML=rows.map(function(row){
    var st=statusOf(row);
    var name=val(row,['full_name','name','first_name','last_name','display_name']);
    var email=val(row,['email']);
    var phone=val(row,['phone','phone_number','mobile','contact_number']);
    var created=val(row,['created_at','inserted_at','submitted_at']);
    var code=val(row,['meeting_access_code'])||'—';
    return '<div class="v6363-row '+st+'" data-id="'+esc(row.id)+'">'
      + '<div class="v6363-grid">'
      + '<div class="v6363-field"><small>'+esc(T('name'))+'</small><strong>'+esc(name||'—')+'</strong></div>'
      + '<div class="v6363-field"><small>'+esc(T('email'))+'</small><strong>'+esc(email||'—')+'</strong></div>'
      + '<div class="v6363-field"><small>'+esc(T('phone'))+'</small><strong>'+esc(phone||'—')+'</strong></div>'
      + '<div class="v6363-field"><small>'+esc(T('status'))+'</small><span class="v6363-status">'+esc(st==='approved'?T('approved'):T('pending'))+'</span></div>'
      + '<div class="v6363-field"><small>'+esc(T('code'))+'</small><strong>'+esc(code)+'</strong></div>'
      + '<div class="v6363-field"><small>'+esc(T('date'))+'</small><strong>'+esc(created?String(created).slice(0,19).replace('T',' '):'—')+'</strong></div>'
      + '</div>'
      + (st==='approved'?'':'<div class="v6363-actions"><button class="v6363-btn v6363-green" data-approve="'+esc(row.id)+'">✅ '+esc(T('approve'))+'</button></div>')
      + '</div>';
  }).join('');
  box.querySelectorAll('[data-approve]').forEach(function(btn){
    btn.onclick=function(e){e.preventDefault();approve(btn.getAttribute('data-approve'));};
  });
}
async function loadRows(){
  css();
  var box=document.getElementById('v6363List'); if(box)box.innerHTML='<div class="v6363-note">⏳ '+esc(T('load'))+'...</div>';
  var sb=findClient();
  if(!sb||!sb.from){if(box)box.innerHTML='<div class="v6363-note">'+esc(T('error'))+' — Supabase client not found.</div>';return;}
  var user=await getUser();
  if(!user||!isAdminEmail(user.email)){if(box)box.innerHTML='<div class="v6363-note">'+esc(T('adminLogin'))+'</div>';return;}
  try{
    // Prefer secure RPC if installed.
    if(sb.rpc){
      var rpc=await sb.rpc('om7_admin_list_registrations');
      if(!rpc.error && rpc.data){renderRows(rpc.data);return;}
    }
  }catch(e){}
  try{
    var r=await sb.from(TABLE).select('*').order('created_at',{ascending:false}).limit(50);
    if(r.error)throw r.error;
    renderRows(r.data||[]);
  }catch(err){
    if(box)box.innerHTML='<div class="v6363-note">'+esc(T('error'))+'<br>'+esc(err&&err.message?err.message:String(err))+'<br><br>'+esc(T('sqlNeeded'))+'</div>';
  }
}
async function approve(id){
  var sb=findClient();
  var box=document.getElementById('v6363List');
  if(!sb||!id)return;
  try{
    // Prefer RPC with admin check.
    if(sb.rpc){
      var rpc=await sb.rpc('om7_admin_approve_registration',{p_id:id});
      if(!rpc.error){await loadRows();alert(T('saved'));return;}
    }
  }catch(e){}
  try{
    var r=await sb.from(TABLE).update({
      approval_status:'approved',
      status:'approved',
      meeting_access_visible:true,
      meeting_access_code:CODE,
      approved_at:new Date().toISOString()
    }).eq('id',id).select();
    if(r.error)throw r.error;
    await loadRows();
    alert(T('saved'));
  }catch(err){
    alert(T('error')+': '+(err&&err.message?err.message:String(err))+'\n\n'+T('sqlNeeded'));
  }
}
async function shouldShowAdminCard(){
  var user=await getUser();
  return !!(user && isAdminEmail(user.email));
}
async function renderCard(){
  css();
  var more=document.getElementById('more');
  if(!more)return;
  var user=await getUser();
  var show=!!(user && isAdminEmail(user.email));
  var existing=document.getElementById('v6363AdminCard');
  if(!show){ if(existing)existing.remove(); return; }
  if(!existing){
    existing=document.createElement('div');
    existing.id='v6363AdminCard';
    existing.className='card';
    var footer=more.querySelector('.footer')||document.getElementById('v6358VersionFooter');
    more.insertBefore(existing, footer||null);
  }
  existing.innerHTML='<h3>🛡️ '+esc(T('title'))+'</h3><p>'+esc(T('sub'))+'</p><div class="v6363-actions"><button class="v6363-btn v6363-blue" id="v6363Load">🔄 '+esc(T('load'))+'</button><button class="v6363-btn v6363-light" id="v6363Refresh">'+esc(T('refresh'))+'</button></div><div id="v6363List"></div>';
  document.getElementById('v6363Load').onclick=loadRows;
  document.getElementById('v6363Refresh').onclick=loadRows;
}
function render(){renderCard();}
document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,250)},true);
setTimeout(render,600);setTimeout(render,2000);setInterval(render,5000);
window.OMIDENO7_V6363_ADMIN_REGISTRATION_APPROVAL={render:render,loadRows:loadRows,approve:approve,version:VERSION};
})();
