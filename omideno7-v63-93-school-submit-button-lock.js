/* OmideNo7 V63.93B - School Submit Isolation + Save */
(function(){
'use strict';

const SCHOOL_TABLE='school_students';

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
 fa:{btn:'ارسال درخواست ثبت‌نام مدرسه',saving:'در حال ثبت درخواست مدرسه...',saved:'درخواست ثبت‌نام مدرسه با موفقیت ثبت شد و در انتظار بررسی ادمین است.',needLogin:'برای ثبت‌نام مدرسه ابتدا وارد حساب خود شوید.',required:'لطفاً فیلدهای ضروری را کامل کنید.',error:'خطا در ثبت‌نام مدرسه: '},
 en:{btn:'Submit School Registration',saving:'Submitting school registration...',saved:'School registration was submitted successfully and is waiting for admin review.',needLogin:'Please log in first to register for school.',required:'Please complete all required fields.',error:'School registration error: '},
 hr:{btn:'Pošalji zahtjev za školu',saving:'Slanje zahtjeva za školu...',saved:'Zahtjev za školu uspješno je poslan i čeka pregled administratora.',needLogin:'Prvo se prijavite za registraciju u školu.',required:'Ispunite sva obavezna polja.',error:'Greška pri registraciji škole: '}
};

function t(k){return (TXT[lang()]||TXT.fa)[k]||k;}

function isSchoolRegistrationForm(form){
  if(!form) return false;
  const html=(form.outerHTML||'').toLowerCase();
  const text=(form.innerText||'').toLowerCase();
  return html.includes('years_believer') ||
         html.includes('pastor_name') ||
         html.includes('schoolregistration') ||
         html.includes('testimony') ||
         text.includes('شهادت کوتاه') ||
         text.includes('نام شبان') ||
         text.includes('چند سال است ایماندار') ||
         text.includes('school registration');
}

function fixSchoolButton(){
  document.querySelectorAll('form').forEach(form=>{
    if(!isSchoolRegistrationForm(form)) return;
    const btn=form.querySelector('button[type="submit"], input[type="submit"]');
    if(!btn) return;

    if(btn.tagName==='INPUT') btn.value=t('btn');
    else btn.textContent=t('btn');

    btn.setAttribute('data-school-submit-button','true');
    btn.setAttribute('data-no-salvation-route','true');
    btn.setAttribute('data-no-meeting-route','true');
    btn.classList.add('school-submit-registration-btn');
  });
}

function val(fd,name){ return String(fd.get(name)||'').trim(); }

async function saveSchool(form){
  const client=sb();
  if(!client||!client.auth||!client.from) throw new Error('Supabase client not available');

  const sessionRes=await client.auth.getSession();
  const user=sessionRes?.data?.session?.user;
  if(!user) throw new Error(t('needLogin'));

  const fd=new FormData(form);

  const fullName=val(fd,'full_name');
  const phone=val(fd,'phone');
  const country=val(fd,'country');
  const city=val(fd,'city');

  if(!fullName || !phone || !country || !city){
    throw new Error(t('required'));
  }

  const row={
    user_id:user.id,
    full_name:fullName,
    email:user.email,
    phone:phone,
    country:country,
    city:city,
    preferred_language:val(fd,'preferred_language')||lang(),
    is_believer:val(fd,'is_believer'),
    years_believer:val(fd,'years_believer'),
    testimony:val(fd,'testimony'),
    is_member_of_another_church:val(fd,'is_member_of_another_church'),
    church_name:val(fd,'church_name'),
    pastor_name:val(fd,'pastor_name'),
    pastor_phone:val(fd,'pastor_phone'),
    accepted_membership_requirement:true,
    status:'pending_review',
    updated_at:new Date().toISOString()
  };

  const res=await client.from(SCHOOL_TABLE).upsert(row,{onConflict:'user_id'}).select().single();
  if(res.error) throw res.error;
  return res.data;
}

function showBox(form,msg,isError){
  let box=document.getElementById('v6393SchoolSubmitBox');
  if(!box){
    box=document.createElement('div');
    box.id='v6393SchoolSubmitBox';
    box.style.cssText='margin:12px 0;padding:14px;border-radius:14px;font-weight:900;line-height:1.7;';
    form.parentNode.insertBefore(box,form.nextSibling);
  }
  box.style.background=isError?'#ffeaea':'#eef7ff';
  box.style.border=isError?'1px solid #ffb3b3':'1px solid #b6dcff';
  box.style.color=isError?'#8a1111':'#06146d';
  box.textContent=msg;
}

document.addEventListener('click',function(e){
  const btn=e.target.closest('button,input[type="submit"]');
  if(!btn) return;
  const form=btn.closest('form');
  if(!isSchoolRegistrationForm(form)) return;

  e.stopImmediatePropagation();
},true);

document.addEventListener('submit',async function(e){
  const form=e.target;
  if(!isSchoolRegistrationForm(form)) return;

  e.preventDefault();
  e.stopImmediatePropagation();

  fixSchoolButton();
  showBox(form,t('saving'),false);

  try{
    await saveSchool(form);
    form.style.display='none';
    showBox(form,t('saved'),false);
  }catch(err){
    showBox(form,t('error')+(err.message||err),true);
  }
},true);

document.addEventListener('DOMContentLoaded',()=>setTimeout(fixSchoolButton,300));
window.addEventListener('load',()=>setTimeout(fixSchoolButton,700));
document.addEventListener('input',()=>setTimeout(fixSchoolButton,100),true);
document.addEventListener('change',()=>setTimeout(fixSchoolButton,100),true);
setInterval(fixSchoolButton,600);

console.log('OmideNo7 V63.93B School Submit Isolation loaded');
})();
