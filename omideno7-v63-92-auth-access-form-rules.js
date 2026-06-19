/* OmideNo7 V63.92C - Meeting Access Final Fix */
(function(){
'use strict';

const TABLE='access_requests';

const ADMINS=[
 'omideno7church@gmail.com',
 'yuhana1360@gmail.com',
 'mehdi.firooz80@gmail.com'
];

function sb(){
 return window.supabaseClient||window.SUPABASE_CLIENT||window.omideno7Supabase||window.OMIDENO7_SUPABASE||window.sb||null;
}

function lang(){
 const l=(localStorage.getItem('lang')||localStorage.getItem('omideno7_lang')||document.documentElement.lang||navigator.language||'fa').toLowerCase();
 if(l.includes('hr')) return 'hr';
 if(l.includes('en')) return 'en';
 return 'fa';
}

const TXT={
 fa:{
  login:'برای دریافت لینک و کد جلسه، ابتدا ثبت‌نام کنید و وارد حساب خود شوید. پس از تأیید ادمین، اطلاعات ورود در همین اپلیکیشن نمایش داده می‌شود.',
  pending:'درخواست شما ثبت شده و در انتظار تأیید ادمین است.',
  notFound:'برای دریافت لینک و کد جلسه، ابتدا فرم ثبت‌نام را تکمیل کنید. پس از تأیید ادمین، اطلاعات ورود در همین اپلیکیشن نمایش داده می‌شود.',
  rejected:'درخواست شما تأیید نشده است. لطفاً با کلیسا تماس بگیرید.',
  approved:'دسترسی شما تأیید شده است.',
  link:'لینک ورود به جلسه',
  code:'کد امنیتی جلسه',
  close:'بستن'
 },
 en:{
  login:'Please register and log in first. After admin approval, meeting access will be shown inside this app.',
  pending:'Your request is waiting for admin approval.',
  notFound:'Please complete the registration form first. After admin approval, meeting access will be shown inside this app.',
  rejected:'Your request was not approved. Please contact the church.',
  approved:'Your access has been approved.',
  link:'Meeting link',
  code:'Meeting security code',
  close:'Close'
 },
 hr:{
  login:'Najprije se registrirajte i prijavite. Nakon odobrenja administratora, pristup sastanku prikazat će se u ovoj aplikaciji.',
  pending:'Vaš zahtjev čeka odobrenje administratora.',
  notFound:'Najprije ispunite registracijski obrazac. Nakon odobrenja administratora, pristup sastanku prikazat će se u ovoj aplikaciji.',
  rejected:'Vaš zahtjev nije odobren. Kontaktirajte crkvu.',
  approved:'Vaš pristup je odobren.',
  link:'Link za sastanak',
  code:'Sigurnosni kod',
  close:'Zatvori'
 }
};

function t(k){return (TXT[lang()]||TXT.fa)[k]||k;}

async function currentUser(){
 const c=sb();
 if(!c||!c.auth) return null;
 const r=await c.auth.getUser();
 return r?.data?.user||null;
}

function isAdmin(email){
 return ADMINS.includes(String(email||'').trim().toLowerCase());
}

async function getAccessByEmail(email){
 const c=sb();
 if(!c||!c.from||!email) return null;
 const r=await c.from(TABLE)
  .select('*')
  .eq('email',String(email).trim().toLowerCase())
  .order('created_at',{ascending:false})
  .limit(1);
 if(r.error||!r.data||!r.data[0]) return null;
 return r.data[0];
}

 async function getSchoolAccessByEmail(email){
 const c=sb();
 if(!c||!c.from||!email) return null;
 const r=await c.from('school_students')
  .select('*')
  .eq('email',String(email).trim().toLowerCase())
  .order('registered_at',{ascending:false})
  .limit(1);
 if(r.error||!r.data||!r.data[0]) return null;
 return r.data[0];
}

function statusOk(s){
 s=String(s||'').toLowerCase();
 return s==='approved'||s==='approve'||s==='accepted'||s==='active';
}

function modal(html){
 let m=document.getElementById('v6392cMeetingModal');
 if(!m){
  m=document.createElement('div');
  m.id='v6392cMeetingModal';
  m.style.cssText='position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:18px;';
  document.body.appendChild(m);
 }
 m.innerHTML='<div style="max-width:520px;width:100%;background:#fff;border-radius:22px;padding:22px;line-height:1.8;font-weight:800;color:#102044;box-shadow:0 18px 60px rgba(0,0,0,.25);direction:inherit">'+html+'<div style="margin-top:16px;text-align:center"><button id="v6392cClose" style="border:0;border-radius:14px;padding:10px 22px;background:#06146d;color:white;font-weight:900">'+t('close')+'</button></div></div>';
 document.getElementById('v6392cClose').onclick=()=>m.remove();
}

function showApproved(){
 modal(
  '<div style="font-size:20px;color:#06146d;margin-bottom:10px">'+t('approved')+'</div>'+
  '<div><b>'+t('link')+':</b><br><a href="https://fccdl.in/i/omideno7church" target="_blank">https://fccdl.in/i/omideno7church</a></div>'+
  '<div style="margin-top:12px"><b>'+t('code')+':</b> 789987</div>'
 );
}

function showMessage(msg){ modal('<div>'+msg+'</div>'); }

function hideOriginalCodes(){
 document.querySelectorAll('section,article,div,.card,.box,.panel').forEach(el=>{
  if(el.closest&&el.closest('#v6392cMeetingModal')) return;
  const tx=el.innerText||'';
  if((tx.includes('789987')||tx.includes('fccdl.in/i/omideno7church'))&&el.children.length<50){
   el.style.display='none';
  }
 });
}

function isMeetingButton(el){
 if(!el) return false;
 const tx=((el.innerText||el.textContent||'')+' '+(el.className||'')).toLowerCase();
 return tx.includes('fcc')||tx.includes('ورود به جلسه')||tx.includes('join meeting')||tx.includes('sastanak');
}

async function handleClick(ev){
 const btn=ev.target.closest('button,a,.btn,div');
 if(!isMeetingButton(btn)) return;

 ev.preventDefault();
 ev.stopImmediatePropagation();

 const u=await currentUser();

 if(!u||!u.email){
  showMessage(t('login'));
  return;
 }

 if(isAdmin(u.email)){
  showApproved();
  return;
 }

 let row=await getAccessByEmail(u.email);

 if(!row){
  const last=localStorage.getItem('omideno7_last_registration_email');
  if(last) row=await getAccessByEmail(last);
 }

 if(!row){
  const schoolRow=await getSchoolAccessByEmail(u.email);

  if(schoolRow){
    const schoolStatus=String(schoolRow.status||'pending_review').toLowerCase();

    if(statusOk(schoolStatus)){
      showApproved();
      return;
    }

    if(schoolStatus==='pending_review'||schoolStatus==='pending'){
      showMessage(t('pending'));
      return;
    }

    if(schoolStatus==='rejected'){
      showMessage(t('rejected'));
      return;
    }
  }

  showMessage(t('notFound'));
  return;
 }

 const st=String(row.status||'pending').toLowerCase();

 if(statusOk(st)){
  showApproved();
 }else if(st==='rejected'){
  showMessage(t('rejected'));
 }else{
  const schoolRow=await getSchoolAccessByEmail(u.email);
  if(schoolRow && statusOk(schoolRow.status)){
    showApproved();
  }else{
    showMessage(t('pending'));
  }
 }
}

function hideSubmittedForms(){
 const last=localStorage.getItem('omideno7_last_registration_email');
 if(!last) return;
 document.querySelectorAll('form').forEach(f=>{
  const tx=(f.innerText||f.outerHTML||'').toLowerCase();
  if(tx.includes('meeting')||tx.includes('جلسه')||tx.includes('کد')||tx.includes('access')){
   f.style.display='none';
  }
 });
}

function boot(){
 hideOriginalCodes();
 hideSubmittedForms();
}

document.addEventListener('click',handleClick,true);
document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,300));
window.addEventListener('load',()=>setTimeout(boot,600));
setInterval(hideOriginalCodes,800);

console.log('OmideNo7 V63.92C loaded');
})();
