/* OmideNo7 V63.92B - Meeting Access Button Only */
(function(){
'use strict';

const TABLE='access_requests';

function sb(){
  return window.supabaseClient || window.SUPABASE_CLIENT || window.omideno7Supabase || window.OMIDENO7_SUPABASE || window.sb || null;
}

function lang(){
  const l=(localStorage.getItem('lang')||localStorage.getItem('omideno7_lang')||document.documentElement.lang||navigator.language||'fa').toLowerCase();
  if(l.includes('hr')) return 'hr';
  if(l.includes('en')) return 'en';
  return 'fa';
}

const TXT={
 fa:{
  login:'برای دریافت لینک و کد جلسه، ابتدا باید ثبت‌نام کنید و وارد حساب خود شوید. پس از بررسی و تأیید ادمین، اطلاعات ورود به جلسه در همین اپلیکیشن برای شما نمایش داده می‌شود.',
  pending:'درخواست شما ثبت شده و در انتظار تأیید ادمین است. پس از تأیید، لینک و کد جلسه در همین اپلیکیشن نمایش داده می‌شود.',
  notFound:'برای دریافت لینک و کد جلسه، ابتدا فرم ثبت‌نام را تکمیل کنید. درخواست شما توسط ادمین بررسی می‌شود و پس از تأیید، اطلاعات ورود به جلسه در همین اپلیکیشن نمایش داده خواهد شد.',
  rejected:'درخواست شما تأیید نشده است. لطفاً با کلیسا تماس بگیرید.',
  approved:'دسترسی شما تأیید شده است.',
  link:'لینک ورود به جلسه',
  code:'کد امنیتی جلسه',
  close:'بستن',
  badPhone:'لطفاً شماره تماس واقعی و معتبر وارد کنید.'
 },
 en:{
  login:'To receive the meeting link and code, please register and log in first. After admin review and approval, the meeting access information will be shown inside this app.',
  pending:'Your request has been submitted and is waiting for admin approval. After approval, the meeting link and code will be shown inside this app.',
  notFound:'To receive the meeting link and code, please complete the registration form first. Your request will be reviewed by admin, and after approval the meeting access information will be shown inside this app.',
  rejected:'Your request was not approved. Please contact the church.',
  approved:'Your access has been approved.',
  link:'Meeting link',
  code:'Meeting security code',
  close:'Close',
  badPhone:'Please enter a real and valid phone number.'
 },
 hr:{
  login:'Za primanje linka i koda za sastanak najprije se registrirajte i prijavite u svoj račun. Nakon pregleda i odobrenja administratora, podaci za ulazak u sastanak prikazat će se u ovoj aplikaciji.',
  pending:'Vaš zahtjev je poslan i čeka odobrenje administratora. Nakon odobrenja, link i kod za sastanak prikazat će se u ovoj aplikaciji.',
  notFound:'Za primanje linka i koda za sastanak najprije ispunite registracijski obrazac. Administrator će pregledati zahtjev i nakon odobrenja podaci za ulazak bit će prikazani u ovoj aplikaciji.',
  rejected:'Vaš zahtjev nije odobren. Kontaktirajte crkvu.',
  approved:'Vaš pristup je odobren.',
  link:'Link za sastanak',
  code:'Sigurnosni kod',
  close:'Zatvori',
  badPhone:'Unesite stvaran i ispravan broj telefona.'
 }
};

function t(k){return (TXT[lang()]||TXT.fa)[k]||k;}

async function currentUser(){
  const c=sb();
  if(!c||!c.auth) return null;
  const r=await c.auth.getUser();
  return r?.data?.user||null;
}

async function getAccess(email){
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

function modal(html){
  let m=document.getElementById('v6392bMeetingModal');
  if(!m){
    m=document.createElement('div');
    m.id='v6392bMeetingModal';
    m.style.cssText='position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:18px;';
    document.body.appendChild(m);
  }
  m.innerHTML='<div style="max-width:520px;width:100%;background:#fff;border-radius:22px;padding:22px;line-height:1.8;font-weight:800;color:#102044;box-shadow:0 18px 60px rgba(0,0,0,.25);direction:inherit">'+html+'<div style="margin-top:16px;text-align:center"><button id="v6392bClose" style="border:0;border-radius:14px;padding:10px 22px;background:#06146d;color:white;font-weight:900">'+t('close')+'</button></div></div>';
  document.getElementById('v6392bClose').onclick=function(){m.remove();};
}

function showMessage(msg){
  modal('<div>'+msg+'</div>');
}

function showApproved(){
  modal(
    '<div style="font-size:20px;color:#06146d;margin-bottom:10px">'+t('approved')+'</div>'+
    '<div><b>'+t('link')+':</b><br><a href="https://fccdl.in/i/omideno7church" target="_blank" rel="noopener">https://fccdl.in/i/omideno7church</a></div>'+
    '<div style="margin-top:12px"><b>'+t('code')+':</b> 789987</div>'
  );
}

function hideVisibleMeetingCodes(){
  document.querySelectorAll('section,article,div,.card,.box,.panel').forEach(el=>{
    if(el.id==='v6392bMeetingModal') return;
    if(el.closest && el.closest('#v6392bMeetingModal')) return;

    const tx=el.innerText||'';
    if((tx.includes('789987')||tx.includes('fccdl.in/i/omideno7church')) && el.children.length<50){
      el.style.display='none';
      el.setAttribute('data-v6392b-hidden-meeting','1');
    }
  });
}

function isMeetingButton(el){
  if(!el) return false;
  const tx=((el.innerText||el.textContent||'')+' '+(el.getAttribute('aria-label')||'')+' '+(el.className||'')).toLowerCase();
  return tx.includes('fcc') ||
    tx.includes('ورود به جلسه') ||
    tx.includes('جلسه') ||
    tx.includes('join meeting') ||
    tx.includes('meeting') ||
    tx.includes('sastanak');
}

async function handleMeetingClick(ev){
  const btn=ev.target.closest('button,a,.btn,.card,div');
  if(!isMeetingButton(btn)) return;

  ev.preventDefault();
  ev.stopImmediatePropagation();

  hideVisibleMeetingCodes();

  const u=await currentUser();
  if(!u||!u.email){
    showMessage(t('login'));
    return;
  }

  const row=await getAccess(u.email);
  if(!row){
    showMessage(t('notFound'));
    return;
  }

  const status=String(row.status||'pending').toLowerCase();

  if(status==='approved' || status==='approve' || status==='active' || status==='accepted'){
    showApproved();
  }else if(status==='rejected'){
    showMessage(t('rejected'));
  }else{
    showMessage(t('pending'));
  }
}

function validPhone(v){
  const digits=String(v||'').replace(/\D/g,'');
  if(digits.length<7||digits.length>15) return false;
  if(/^(\d)\1+$/.test(digits)) return false;
  if(['1234567','12345678','123456789','0000000','1111111'].includes(digits)) return false;
  return true;
}

function phoneRules(){
  document.querySelectorAll('input[type="tel"],input[name*="phone"],input[id*="phone"],input[name*="mobile"],input[id*="mobile"]').forEach(i=>{
    i.setAttribute('autocomplete','tel');
    i.addEventListener('input',function(){
      if(i.value&&!validPhone(i.value)) i.setCustomValidity(t('badPhone'));
      else i.setCustomValidity('');
    });
  });
}

function boot(){
  hideVisibleMeetingCodes();
  phoneRules();
}

document.addEventListener('click',handleMeetingClick,true);
document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,300));
window.addEventListener('load',()=>setTimeout(boot,500));
setInterval(hideVisibleMeetingCodes,700);

window.OMIDENO7_V6392B_MEETING_ACCESS={boot,hideVisibleMeetingCodes};
console.log('OmideNo7 V63.92B loaded');
})();
