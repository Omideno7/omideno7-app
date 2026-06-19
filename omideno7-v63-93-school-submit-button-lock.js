/* OmideNo7 V63.93C - School Button Text + Safe Submit */
(function(){
'use strict';

function lang(){
  const l=(localStorage.getItem('lang')||localStorage.getItem('omideno7_lang')||document.documentElement.lang||navigator.language||'fa').toLowerCase();
  if(l.includes('hr')) return 'hr';
  if(l.includes('en')) return 'en';
  return 'fa';
}

function label(){
  if(lang()==='fa') return 'ارسال درخواست ثبت‌نام مدرسه';
  if(lang()==='hr') return 'Pošalji zahtjev za školu';
  return 'Submit School Registration';
}

function isSchoolRegistrationForm(form){
  if(!form) return false;
  const html=(form.outerHTML||'').toLowerCase();
  const text=(form.innerText||'').toLowerCase();
  return form.id==='schoolRegistration' ||
    html.includes('years_believer') ||
    html.includes('pastor_name') ||
    text.includes('شهادت کوتاه') ||
    text.includes('نام شبان');
}

function fixButton(){
  document.querySelectorAll('form').forEach(form=>{
    if(!isSchoolRegistrationForm(form)) return;

    const btn=form.querySelector('button[type="submit"], input[type="submit"]');
    if(!btn) return;

    if(btn.tagName==='INPUT') btn.value=label();
    else btn.textContent=label();

    btn.setAttribute('data-school-submit-button','true');
    btn.setAttribute('data-no-salvation-route','true');
    btn.setAttribute('data-no-meeting-route','true');
  });
}

document.addEventListener('click',function(e){
  const btn=e.target.closest('button[type="submit"], input[type="submit"]');
  if(!btn) return;

  const form=btn.closest('form');
  if(!isSchoolRegistrationForm(form)) return;

  e.preventDefault();
  e.stopImmediatePropagation();

  fixButton();

  if(form.reportValidity && !form.reportValidity()) return;

  form.dispatchEvent(new Event('submit',{
    bubbles:true,
    cancelable:true
  }));
},true);

document.addEventListener('DOMContentLoaded',()=>setTimeout(fixButton,300));
window.addEventListener('load',()=>setTimeout(fixButton,700));
document.addEventListener('input',()=>setTimeout(fixButton,100),true);
document.addEventListener('change',()=>setTimeout(fixButton,100),true);
setInterval(fixButton,600);

console.log('OmideNo7 V63.93C School Safe Submit loaded');
})();
