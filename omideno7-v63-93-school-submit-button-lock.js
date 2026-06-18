/* OmideNo7 V63.93 - School Submit Button Lock */
(function(){
'use strict';

function lang(){
  const l=(localStorage.getItem('lang')||localStorage.getItem('omideno7_lang')||document.documentElement.lang||navigator.language||'fa').toLowerCase();
  if(l.includes('hr')) return 'hr';
  if(l.includes('en')) return 'en';
  return 'fa';
}

function label(){
  const l=lang();
  if(l==='fa') return 'ارسال درخواست ثبت‌نام مدرسه';
  if(l==='hr') return 'Pošalji zahtjev za školu';
  return 'Submit School Registration';
}

function isSchoolRegistrationForm(form){
  if(!form) return false;
  const html=(form.outerHTML||'').toLowerCase();
  return html.includes('school_students') ||
         html.includes('years_believer') ||
         html.includes('pastor_name') ||
         html.includes('schoolregistration') ||
         html.includes('testimony') ||
         html.includes('نام شبان') ||
         html.includes('شهادت کوتاه');
}

function fixSchoolButton(){
  document.querySelectorAll('form').forEach(form=>{
    if(!isSchoolRegistrationForm(form)) return;

    const btn=form.querySelector('button[type="submit"], input[type="submit"]');
    if(!btn) return;

    if(btn.tagName==='INPUT'){
      btn.value=label();
    }else{
      btn.textContent=label();
    }

    btn.setAttribute('data-school-submit-button','true');
    btn.setAttribute('data-no-salvation-route','true');
    btn.classList.add('school-submit-registration-btn');
  });
}

document.addEventListener('click',function(e){
  const btn=e.target.closest('button,input[type="submit"]');
  if(!btn) return;

  const form=btn.closest('form');
  if(!isSchoolRegistrationForm(form)) return;

  btn.setAttribute('data-no-salvation-route','true');
  fixSchoolButton();
},true);

document.addEventListener('DOMContentLoaded',()=>setTimeout(fixSchoolButton,300));
window.addEventListener('load',()=>setTimeout(fixSchoolButton,700));
document.addEventListener('input',()=>setTimeout(fixSchoolButton,100),true);
document.addEventListener('change',()=>setTimeout(fixSchoolButton,100),true);

setInterval(fixSchoolButton,500);

console.log('OmideNo7 V63.93 School Submit Button Lock loaded');
})();
