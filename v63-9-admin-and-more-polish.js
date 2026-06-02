/* V63.9 Admin install and More page updates polish */
(function(){
  'use strict';
  const VERSION='V63.10';
  function lang(){ const l=localStorage.getItem('lang')||document.documentElement.lang||'fa'; return ['fa','en','hr'].includes(l)?l:'fa'; }
  const T={
    fa:{title:'امکانات جدید اپ', version:'نسخه برنامه', items:['مدرسه آنلاین امیدنو۷ با ثبت‌نام و ورود شخصی','ذخیره پیشرفت، یادداشت‌ها، تکالیف و امتحان در Supabase','پنل مدیریت مدرسه با بررسی دانشجو، محتوا، صوت‌ها و امتحان','فایل‌های صوتی فارسی مدرسه با کنترل سرعت','متن کامل درس‌ها برای فارسی، انگلیسی و کرواتی','امکان دریافت گواهی رسمی پایان دوره پس از تکمیل مدرسه','دسترسی ادمین به بخش پرسش‌وپاسخ در پنل مدیریت','پرسش‌وپاسخ دسته‌بندی‌شده بر اساس زبان و بررسی صوت‌ها در ادمین']},
    en:{title:'New App Features', version:'App Version', items:['Omidno7 Online School with personal registration and login','Progress, notes, assignments, and exam results saved in Supabase','School admin panel for students, content, audio, and exams','Persian school audio lessons with playback speed control','Full written lessons in Persian, English, and Croatian','Official completion certificate after finishing the school','Admin access to Q&A inside the management panel','Language-filtered Q&A and audio review controls in admin']},
    hr:{title:'Nove mogućnosti aplikacije', version:'Verzija aplikacije', items:['Online škola Omidno7 s osobnom registracijom i prijavom','Napredak, bilješke, zadaci i rezultati ispita spremaju se u Supabase','Admin panel škole za polaznike, sadržaj, audio i ispite','Perzijske audio lekcije s kontrolom brzine reprodukcije','Cijele pisane lekcije na perzijskom, engleskom i hrvatskom','Službena potvrda nakon završetka škole','Admin pristup Q&A dijelu unutar upravljačkog panela','Q&A filtriran po jeziku i audio provjera u admin panelu']}
  };
  function injectMore(){
    const footer=document.getElementById('mainFooter');
    if(!footer || document.getElementById('v639Updates')) return;
    const t=T[lang()]||T.en;
    const box=document.createElement('div');
    box.id='v639Updates';
    box.style.cssText='font-size:.74rem;line-height:1.45;opacity:.88;margin:14px 0 8px;text-align:start';
    box.innerHTML=`<div style="font-weight:900;margin-bottom:5px">${t.title}</div><ul style="margin:0 0 8px 18px;padding:0">${t.items.map(x=>`<li>${x}</li>`).join('')}</ul><div style="font-size:.9rem;font-weight:900;color:#06146D">${t.version}: ${VERSION}</div>`;
    footer.parentNode.insertBefore(box, footer);
    footer.textContent='';
  }
  function openAdminIfRequested(){
    let want=false; try{ const q=new URLSearchParams(location.search); want=q.get('admin')==='1'||q.get('admin')==='school'||q.get('school_admin')==='1'||location.hash==='#admin'; }catch(e){}
    if(!want) return;
    [400,1000,1800,3000].forEach(ms=>setTimeout(()=>{
      const school=document.querySelector('[data-page="school"]'); if(school) school.click();
      setTimeout(()=>{ const adm=document.querySelector('#school [data-school-view="admin"]'); if(adm) adm.click(); },250);
    },ms));
  }
  function boot(){ injectMore(); openAdminIfRequested(); }
  document.addEventListener('DOMContentLoaded',boot);
  window.addEventListener('load',boot);
  setInterval(injectMore,1200);
})();
