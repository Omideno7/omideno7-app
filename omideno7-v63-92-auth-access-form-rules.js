/* OmideNo7 V63.92 - Auth Access + Smart Form Rules */
(function(){
'use strict';

const TABLE='access_requests';
const MEETING_CODE='789987';

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
  pending:'درخواست شما ثبت شده و در انتظار تأیید ادمین است.',
  approved:'دسترسی شما تأیید شده است.',
  loginRequired:'برای دیدن لینک و کد جلسه باید وارد حساب خود شوید.',
  notApproved:'کد جلسه فقط بعد از تأیید ادمین نمایش داده می‌شود.',
  badPhone:'لطفاً شماره تماس واقعی و معتبر وارد کنید.',
  noPastor:'ندارم',
  noIllness:'ندارم',
  noCourse:'ندارم'
 },
 en:{
  pending:'Your request has been submitted and is waiting for admin approval.',
  approved:'Your access has been approved.',
  loginRequired:'Please log in to see the meeting link and code.',
  notApproved:'The meeting code is shown only after admin approval.',
  badPhone:'Please enter a real and valid phone number.',
  noPastor:'No pastor',
  noIllness:'No illness',
  noCourse:'No course'
 },
 hr:{
  pending:'Vaš zahtjev je poslan i čeka odobrenje administratora.',
  approved:'Vaš pristup je odobren.',
  loginRequired:'Prijavite se kako biste vidjeli link i kod sastanka.',
  notApproved:'Kod sastanka prikazuje se tek nakon odobrenja administratora.',
  badPhone:'Unesite stvaran i ispravan broj telefona.',
  noPastor:'Nemam pastora',
  noIllness:'Nemam bolest',
  noCourse:'Nisam pohađao/la tečaj'
 }
};

function t(k){return (TXT[lang()]||TXT.fa)[k]||k;}

async function currentUser(){
  const c=sb();
  if(!c||!c.auth) return null;
  const r=await c.auth.getUser();
  return r?.data?.user||null;
}

async function accessStatus(email){
  const c=sb();
  if(!c||!c.from||!email) return null;
  const r=await c.from(TABLE).select('*').eq('email',email.toLowerCase()).order('created_at',{ascending:false}).limit(1);
  if(r.error||!r.data||!r.data[0]) return null;
  return r.data[0].status||'pending';
}

function validPhone(v){
  const raw=String(v||'').trim();
  const digits=raw.replace(/\D/g,'');
  if(digits.length<7||digits.length>15) return false;
  if(/^(\d)\1+$/.test(digits)) return false;
  if(['1234567','12345678','123456789','0000000','1111111'].includes(digits)) return false;
  return true;
}

function applyPhoneRules(){
  document.querySelectorAll('input[type="tel"], input[name*="phone"], input[name*="mobile"], input[id*="phone"], input[id*="mobile"]').forEach(i=>{
    i.setAttribute('minlength','7');
    i.setAttribute('maxlength','20');
    i.setAttribute('autocomplete','tel');
    i.addEventListener('input',function(){
      if(i.value && !validPhone(i.value)) i.setCustomValidity(t('badPhone'));
      else i.setCustomValidity('');
    });
  });
}

function applyConditionalRules(){
  document.querySelectorAll('select, input[type="radio"], input[type="checkbox"]').forEach(el=>{
    el.addEventListener('change',updateConditionalRequired);
  });
  updateConditionalRequired();
}

function valueContainsNo(v){
  v=String(v||'').toLowerCase();
  return v.includes('no')||v.includes('ندار')||v.includes('nemam')||v.includes('ne');
}

function updateConditionalRequired(){
  const all=[...document.querySelectorAll('input, select, textarea')];

  const pastorAnswer=all.find(x=>
    /pastor|shepherd|شبان|pastir/i.test((x.name||'')+(x.id||'')+(x.placeholder||''))
    && (x.type==='radio'||x.tagName==='SELECT'||x.type==='checkbox')
    && (x.checked||x.tagName==='SELECT')
  );

  const illnessAnswer=all.find(x=>
    /illness|disease|sickness|بیمار|bolest/i.test((x.name||'')+(x.id||'')+(x.placeholder||''))
    && (x.type==='radio'||x.tagName==='SELECT'||x.type==='checkbox')
    && (x.checked||x.tagName==='SELECT')
  );

  const courseAnswer=all.find(x=>
    /course|class|training|تعلیم|دوره|tečaj/i.test((x.name||'')+(x.id||'')+(x.placeholder||''))
    && (x.type==='radio'||x.tagName==='SELECT'||x.type==='checkbox')
    && (x.checked||x.tagName==='SELECT')
  );

  all.forEach(f=>{
    const key=((f.name||'')+(f.id||'')+(f.placeholder||'')).toLowerCase();

    if(/pastor_name|shepherd_name|نام شبان|pastir/i.test(key) && pastorAnswer && valueContainsNo(pastorAnswer.value)){
      f.required=false; f.value='';
    }

    if(/illness_detail|disease_detail|نوع بیماری|توضیح بیماری|bolest/i.test(key) && illnessAnswer && valueContainsNo(illnessAnswer.value)){
      f.required=false; f.value='';
    }

    if(/course_name|training_name|نام دوره|دوره تعلیمی|tečaj/i.test(key) && courseAnswer && valueContainsNo(courseAnswer.value)){
      f.required=false; f.value='';
    }
  });
}

function findMeetingCodeBlocks(){
  const blocks=[];
  document.querySelectorAll('section, article, .card, .panel, .box, div').forEach(el=>{
    if(el.id==='v6392AccessNotice') return;
    const tx=el.innerText||'';
    if(tx.includes(MEETING_CODE)||tx.includes('fccdl.in')||tx.includes('freeconferencecall')){
      if(el !== document.body && el.children.length<40) blocks.push(el);
    }
  });
  return blocks;
}

function notice(msg){
  let n=document.getElementById('v6392AccessNotice');
  if(!n){
    n=document.createElement('div');
    n.id='v6392AccessNotice';
    n.style.cssText='margin:12px 0;padding:14px;border-radius:14px;background:#fff4cf;color:#5c4200;font-weight:900;line-height:1.7;';
    const home=document.querySelector('#home')||document.querySelector('main')||document.body;
    home.prepend(n);
  }
  n.textContent=msg;
}

async function protectMeetingCode(){
  const u=await currentUser();
  const blocks=findMeetingCodeBlocks();

  if(!u||!u.email){
    blocks.forEach(b=>b.style.display='none');
    notice(t('loginRequired'));
    return;
  }

  const st=await accessStatus(u.email);

  if(st==='approved'){
    blocks.forEach(b=>b.style.display='');
    const n=document.getElementById('v6392AccessNotice');
    if(n) n.remove();
  }else{
    blocks.forEach(b=>b.style.display='none');
    notice(st==='pending'?t('pending'):t('notApproved'));
  }
}

async function hideRequestFormIfAlreadySubmitted(){
  const u=await currentUser();
  if(!u||!u.email) return;
  const st=await accessStatus(u.email);
  if(!st) return;

  document.querySelectorAll('form').forEach(f=>{
    const tx=(f.innerText||f.outerHTML||'').toLowerCase();
    if(tx.includes('meeting')||tx.includes('جلسه')||tx.includes('access')||tx.includes('کد')){
      f.style.display='none';
      let m=document.getElementById('v6392RequestStatus');
      if(!m){
        m=document.createElement('div');
        m.id='v6392RequestStatus';
        m.style.cssText='margin:12px 0;padding:14px;border-radius:14px;background:#eef7ff;border:1px solid #b6dcff;font-weight:900;line-height:1.7;';
        f.parentNode.insertBefore(m,f.nextSibling);
      }
      m.textContent=st==='approved'?t('approved'):t('pending');
    }
  });
}

function boot(){
  applyPhoneRules();
  applyConditionalRules();
  protectMeetingCode();
  hideRequestFormIfAlreadySubmitted();
}

document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,900));
window.addEventListener('load',()=>setTimeout(boot,1300));
document.addEventListener('click',()=>setTimeout(boot,600),true);
document.addEventListener('input',()=>setTimeout(()=>{applyPhoneRules();updateConditionalRequired();},200),true);

window.OMIDENO7_V6392_AUTH_ACCESS_RULES={boot,protectMeetingCode};
console.log('OmideNo7 V63.92 loaded');
})();
