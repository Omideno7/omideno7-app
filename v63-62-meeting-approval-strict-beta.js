
/* Omideno7 V63.62 — Meeting Approval Strict
   Focused patch:
   - Join meeting no longer opens only because user is logged in.
   - Meeting link/code is shown only when church_member_registrations is approved.
   - New/pending users see registration/admin approval message.
   - Does not change other app sections.
*/
(function(){
'use strict';

var VERSION='V63.62 Meeting Approval Strict';
var MEETING_URL='https://join.freeconferencecall.com/omideno7church';
var ACCESS_CODE='2452236';
var SECURITY_CODE='789987';
var LAST_EMAIL_KEY='omideno7_last_registration_email';
var APPROVED_KEY='omideno7_meeting_access_approved';

function isBeta(){return /beta\.html/i.test(location.pathname)||/v=6362|v=6361|v=6360|v=6359|v=6358/i.test(location.search)}
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
    join:'ورود به جلسه',
    checking:'در حال بررسی تأیید ثبت‌نام...',
    approvedTitle:'کد ورود جلسه فعال شد',
    approvedMsg:'ثبت‌نام شما توسط ادمین تأیید شده است. برای ورود به جلسه از اطلاعات زیر استفاده کنید.',
    meetingLink:'لینک جلسه',
    accessCode:'کد دسترسی',
    securityCode:'کد امنیتی جلسه',
    openMeeting:'باز کردن جلسه',
    notApprovedTitle:'ثبت‌نام هنوز تأیید نشده است',
    notApproved:'برای دریافت کد ورود به جلسه باید ابتدا ثبت‌نام کنید و سپس ادمین ثبت‌نام شما را تأیید کند. بعد از تأیید، کد ۷۸۹۹۸۷ در همین اپ نمایش داده می‌شود.',
    openForm:'باز کردن فرم ثبت‌نام',
    close:'بستن',
    noRecord:'رکورد تأییدشده برای این ایمیل/دستگاه پیدا نشد.',
    saved:'ثبت‌نام شما ذخیره شد و در انتظار بررسی ادمین است.'
  };
  var en={
    join:'Join meeting',
    checking:'Checking registration approval...',
    approvedTitle:'Meeting access code is active',
    approvedMsg:'Your registration has been approved by admin. Use the following information to join the meeting.',
    meetingLink:'Meeting link',
    accessCode:'Access code',
    securityCode:'Meeting security code',
    openMeeting:'Open meeting',
    notApprovedTitle:'Registration is not approved yet',
    notApproved:'To receive the meeting access code, please register first and wait for admin approval. After approval, code 789987 will be shown inside this app.',
    openForm:'Open registration form',
    close:'Close',
    noRecord:'No approved record was found for this email/device.',
    saved:'Your registration was saved and is waiting for admin review.'
  };
  var hr={
    join:'Uđi u sastanak',
    checking:'Provjera odobrenja registracije...',
    approvedTitle:'Kod za sastanak je aktivan',
    approvedMsg:'Vaša registracija je odobrena od administratora. Koristite sljedeće podatke za ulazak u sastanak.',
    meetingLink:'Link za sastanak',
    accessCode:'Pristupni kod',
    securityCode:'Sigurnosni kod sastanka',
    openMeeting:'Otvori sastanak',
    notApprovedTitle:'Registracija još nije odobrena',
    notApproved:'Za primanje koda za sastanak najprije se registrirajte i pričekajte odobrenje administratora. Nakon odobrenja, kod 789987 bit će prikazan u ovoj aplikaciji.',
    openForm:'Otvori registracijski obrazac',
    close:'Zatvori',
    noRecord:'Nije pronađen odobren zapis za ovaj e-mail/uređaj.',
    saved:'Vaša registracija je spremljena i čeka pregled administratora.'
  };
  var l=lang(); return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
}
function css(){
  if(document.getElementById('v6362Css'))return;
  var st=document.createElement('style');
  st.id='v6362Css';
  st.textContent=[
    '.v6362-modal{position:fixed;inset:0;z-index:1000001;background:rgba(2,8,23,.45);display:flex;align-items:center;justify-content:center;padding:18px;backdrop-filter:blur(2px)}',
    '.v6362-box{width:min(92vw,650px);max-height:88vh;overflow:auto;background:#fff;border-radius:26px;border-top:6px solid #00B91F;box-shadow:0 26px 80px rgba(0,0,0,.32);padding:22px;color:#06146D}',
    '.v6362-box h2{margin:0 0 12px;font-weight:950;color:#06146D}',
    '.v6362-item{background:#f8fbff;border:1px solid #dbe3ef;border-radius:16px;padding:13px;margin:10px 0;line-height:1.9;font-weight:850;color:#24304F}',
    '.v6362-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}',
    '.v6362-btn{border:0;border-radius:999px;padding:12px 18px;font-weight:950;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 22px rgba(6,20,109,.12)}',
    '.v6362-green{background:#00B91F;color:#fff}.v6362-blue{background:#06146D;color:#fff}.v6362-light{background:#eef4ff;color:#06146D}',
    '.v6362-toast{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:1000002;background:#06146D;color:#fff;padding:12px 16px;border-radius:999px;font-weight:950;box-shadow:0 10px 30px rgba(0,0,0,.25);max-width:92vw;text-align:center}',
    '.fa .v6362-box{direction:rtl;text-align:right}'
  ].join('\n');
  document.head.appendChild(st);
}
function toast(msg){
  var old=document.querySelector('.v6362-toast'); if(old)old.remove();
  var t=document.createElement('div'); t.className='v6362-toast'; t.textContent=msg; document.body.appendChild(t);
  setTimeout(function(){if(t.parentNode)t.remove()},3600);
}
function modal(title, body, actions){
  css();
  var old=document.getElementById('v6362Modal'); if(old)old.remove();
  var m=document.createElement('div'); m.id='v6362Modal'; m.className='v6362-modal';
  m.innerHTML='<div class="v6362-box"><h2>'+esc(title)+'</h2>'+body+'<div class="v6362-actions">'+(actions||'')+'<button class="v6362-btn v6362-light" id="v6362Close">'+esc(T('close'))+'</button></div></div>';
  document.body.appendChild(m);
  m.addEventListener('click',function(e){if(e.target===m)m.remove()});
  document.getElementById('v6362Close').onclick=function(){m.remove()};
}
function findClient(){return window.supabaseClient||window.supabase||window.sb||window.SUPABASE_CLIENT||null}
async function getUser(sb){
  try{if(sb&&sb.auth&&sb.auth.getUser){var r=await sb.auth.getUser();return r&&r.data&&r.data.user}}catch(e){}
  return null;
}
function getEmailCandidates(user){
  var arr=[];
  try{if(user&&user.email)arr.push(String(user.email).trim().toLowerCase())}catch(e){}
  try{var e=localStorage.getItem(LAST_EMAIL_KEY); if(e)arr.push(String(e).trim().toLowerCase())}catch(e){}
  try{
    Object.keys(localStorage).forEach(function(k){
      if(/email/i.test(k)){
        var v=localStorage.getItem(k);
        if(v && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim())) arr.push(v.trim().toLowerCase());
      }
    });
  }catch(e){}
  return Array.from(new Set(arr.filter(Boolean)));
}
async function findApproved(){
  if(localStorage.getItem(APPROVED_KEY)==='1') return {approved:true, code:SECURITY_CODE};
  var sb=findClient();
  if(!sb||!sb.from)return {approved:false, reason:'no_supabase'};
  var user=await getUser(sb);
  var emails=getEmailCandidates(user);

  var queries=[];
  if(user&&user.id) queries.push({field:'user_id', value:user.id});
  emails.forEach(function(email){queries.push({field:'email', value:email})});

  for(var i=0;i<queries.length;i++){
    var q=queries[i];
    try{
      var res=await sb.from('church_member_registrations')
        .select('id,email,user_id,status,approval_status,meeting_access_visible,meeting_access_code')
        .eq(q.field,q.value)
        .limit(5);
      if(res.error) continue;
      var rows=res.data||[];
      for(var r=0;r<rows.length;r++){
        var row=rows[r];
        var approved = row.approval_status==='approved' || row.status==='approved' || row.meeting_access_visible===true;
        if(approved){
          localStorage.setItem(APPROVED_KEY,'1');
          if(row.email)localStorage.setItem(LAST_EMAIL_KEY,row.email);
          return {approved:true, code:row.meeting_access_code||SECURITY_CODE, row:row};
        }
      }
    }catch(e){}
  }
  return {approved:false};
}
function showApproved(code){
  var body='<div class="v6362-item">✅ '+esc(T('approvedMsg'))+'</div>'
    + '<div class="v6362-item">🔗 '+esc(T('meetingLink'))+': <strong>'+esc(MEETING_URL)+'</strong></div>'
    + '<div class="v6362-item">🔢 '+esc(T('accessCode'))+': <strong>'+esc(ACCESS_CODE)+'</strong></div>'
    + '<div class="v6362-item">🔐 '+esc(T('securityCode'))+': <strong>'+esc(code||SECURITY_CODE)+'</strong></div>';
  var actions='<a class="v6362-btn v6362-green" target="_blank" rel="noopener" href="'+esc(MEETING_URL)+'">🎥 '+esc(T('openMeeting'))+'</a>';
  modal(T('approvedTitle'), body, actions);
}
function openRegistration(){
  var old=document.getElementById('v6362Modal'); if(old)old.remove();
  if(window.OMIDENO7_V6349_REGISTRATION_BETA && typeof window.OMIDENO7_V6349_REGISTRATION_BETA.openForm==='function'){
    window.OMIDENO7_V6349_REGISTRATION_BETA.openForm();
    setTimeout(patchRegistration,250);
  }
}
function showNotApproved(){
  var body='<div class="v6362-item">🔐 '+esc(T('notApproved'))+'</div>';
  var actions='<button class="v6362-btn v6362-green" id="v6362OpenReg">📝 '+esc(T('openForm'))+'</button>';
  modal(T('notApprovedTitle'), body, actions);
  var b=document.getElementById('v6362OpenReg');
  if(b)b.onclick=function(e){e.preventDefault();openRegistration();};
}
async function strictJoin(e){
  if(e){e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation)e.stopImmediatePropagation();}
  modal(T('join'),'<div class="v6362-item">⏳ '+esc(T('checking'))+'</div>');
  var result=await findApproved();
  if(result.approved) showApproved(result.code);
  else showNotApproved();
  return false;
}
function patchJoinButtons(){
  css();
  var selectors=['#v6359Join','#v6358Join','#v6357Join','#v6356Join','#v6357MeetingCheck','#v6358MeetingCheck'];
  selectors.forEach(function(sel){
    document.querySelectorAll(sel).forEach(function(btn){
      if(btn.dataset.v6362Strict==='1')return;
      btn.dataset.v6362Strict='1';
      btn.onclick=strictJoin;
      btn.addEventListener('click', strictJoin, true);
    });
  });
  // Catch buttons by text too, but only in home/meetings.
  document.querySelectorAll('#home button,#meetings button,#home a,#meetings a').forEach(function(btn){
    var tx=(btn.textContent||'').trim();
    if(/FCC|ورود به جلسه|Join meeting|Uđi u sastanak/i.test(tx)){
      if(btn.dataset.v6362Strict==='1')return;
      btn.dataset.v6362Strict='1';
      btn.onclick=strictJoin;
      btn.addEventListener('click', strictJoin, true);
      if(btn.tagName==='A')btn.removeAttribute('href');
    }
  });
}
function patchRegistration(){
  var modalEl=document.getElementById('v6349Modal');
  if(!modalEl)return;
  if(!modalEl.dataset.v6362obs){
    modalEl.dataset.v6362obs='1';
    var obs=new MutationObserver(function(){
      var tx=modalEl.textContent||'';
      if(/success|موفق|ثبت شد|received|submitted|uspješno|ذخیره شد|saved/i.test(tx)){
        var emailInput=modalEl.querySelector('input[type="email"],input[name*="email"],input[id*="email"]');
        if(emailInput&&emailInput.value)localStorage.setItem(LAST_EMAIL_KEY,emailInput.value.trim().toLowerCase());
        toast(T('saved'));
      }
    });
    obs.observe(modalEl,{childList:true,subtree:true,characterData:true});
  }
}
function render(){patchJoinButtons();patchRegistration();}
document.addEventListener('DOMContentLoaded',render);
window.addEventListener('load',render);
document.addEventListener('click',function(){setTimeout(render,150)},true);
setTimeout(render,300);setTimeout(render,1200);setInterval(render,1600);

window.OMIDENO7_V6362_MEETING_APPROVAL_STRICT={render:render,strictJoin:strictJoin,version:VERSION};
})();
