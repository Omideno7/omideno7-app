/* OmideNo7 V63.91 SAFE - Admin Requests Only Inside School Admin */
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
  fa:{title:'درخواست‌های دریافت لینک و کد جلسه',desc:'درخواست‌های اعضا برای دریافت لینک و کد جلسه فقط در پنل ادمین مدرسه نمایش داده می‌شود.',refresh:'به‌روزرسانی',pending:'در انتظار تأیید',approved:'تأیید شد',rejected:'رد شد',approve:'تأیید',reject:'رد',empty:'درخواستی وجود ندارد.',admin:'این بخش فقط برای ادمین است.',error:'خطا: '},
  en:{title:'Meeting Link & Code Requests',desc:'Member meeting access requests are shown only inside School Admin.',refresh:'Refresh',pending:'Pending',approved:'Approved',rejected:'Rejected',approve:'Approve',reject:'Reject',empty:'No requests found.',admin:'Admin only.',error:'Error: '},
  hr:{title:'Zahtjevi za link i kod sastanka',desc:'Zahtjevi članova prikazuju se samo u školskom admin panelu.',refresh:'Osvježi',pending:'Na čekanju',approved:'Odobreno',rejected:'Odbijeno',approve:'Odobri',reject:'Odbij',empty:'Nema zahtjeva.',admin:'Samo administrator.',error:'Greška: '}
};

function t(k){return (TXT[lang()]||TXT.fa)[k]||k;}

function isAdmin(email){
  email=String(email||'').toLowerCase();
  return ['omideno7church@gmail.com','yuhana1360@gmail.com','mehdi.firooz80@gmail.com'].includes(email);
}

async function user(){
  const c=sb();
  if(!c||!c.auth) return null;
  const r=await c.auth.getUser();
  return r?.data?.user||null;
}

function style(){
  if(document.getElementById('v6391SafeStyle')) return;
  const s=document.createElement('style');
  s.id='v6391SafeStyle';
  s.textContent=`
    #v6391SafePanel{margin:16px 0;padding:18px;border-radius:22px;background:#fff;border:2px solid #06146d;box-shadow:0 8px 24px rgba(0,0,0,.08)}
    #v6391SafePanel h3{margin:0 0 8px;color:#06146d;font-weight:900}
    #v6391SafePanel p{font-weight:700;line-height:1.7;color:#26324f}
    .v6391Btn{border:0;border-radius:14px;padding:10px 16px;font-weight:900;background:#06146d;color:white;margin:4px;cursor:pointer}
    .v6391Reject{background:#9b1c1c}
    .v6391Card{border:1px solid #dce4f2;border-radius:18px;padding:14px;margin:12px 0;background:#fbfdff}
    .v6391Name{font-size:18px;font-weight:900;color:#06146d}
    .v6391Email{font-weight:900;color:#06146d;word-break:break-word;margin-top:6px}
    .v6391Badge{display:inline-block;background:#fff4cf;color:#8a6200;border-radius:999px;padding:7px 12px;font-weight:900;margin-top:8px}
  `;
  document.head.appendChild(s);
}

function target(){
  return document.getElementById('adminMainArea');
}

async function loadRows(){
  const c=sb();
  if(!c||!c.from) throw new Error('Supabase client not available');
  let r=await c.from(TABLE).select('*').order('created_at',{ascending:false});
  if(r.error) r=await c.from(TABLE).select('*');
  if(r.error) throw r.error;
  return r.data||[];
}

async function update(id,status){
  const c=sb();
  const r=await c.from(TABLE).update({status}).eq('id',id);
  if(r.error) throw r.error;
}

function rowHtml(r){
  const status=String(r.status||'pending').toLowerCase();
  const label=status==='approved'?t('approved'):(status==='rejected'?t('rejected'):t('pending'));
  return `
    <div class="v6391Card">
      <div class="v6391Name">👤 ${r.full_name||r.name||'-'}</div>
      <div class="v6391Email">${r.email||'-'}</div>
      <div>${r.country||''}</div>
      <span class="v6391Badge">${label}</span>
      <div style="margin-top:10px">
        <button class="v6391Btn" data-v6391-approve="${r.id}">${t('approve')}</button>
        <button class="v6391Btn v6391Reject" data-v6391-reject="${r.id}">${t('reject')}</button>
      </div>
    </div>
  `;
}

async function render(){
  style();
  const area=target();
  if(!area) return;

  let panel=document.getElementById('v6391SafePanel');
  if(!panel){
    panel=document.createElement('div');
    panel.id='v6391SafePanel';
    area.appendChild(panel);
  }

  try{
    const u=await user();
    if(!u||!isAdmin(u.email)){
      panel.innerHTML=`<h3>${t('title')}</h3><p>${t('admin')}</p>`;
      return;
    }

    const rows=await loadRows();
    panel.innerHTML=`
      <h3>🛡️ ${t('title')}</h3>
      <p>${t('desc')}</p>
      <button class="v6391Btn" id="v6391Refresh">${t('refresh')}</button>
      ${rows.length?rows.map(rowHtml).join(''):`<p>${t('empty')}</p>`}
    `;

    document.getElementById('v6391Refresh')?.addEventListener('click',render);

    panel.querySelectorAll('[data-v6391-approve]').forEach(b=>{
      b.onclick=async()=>{await update(b.dataset.v6391Approve,'approved');render();};
    });

    panel.querySelectorAll('[data-v6391-reject]').forEach(b=>{
      b.onclick=async()=>{await update(b.dataset.v6391Reject,'rejected');render();};
    });

  }catch(e){
    panel.innerHTML=`<h3>${t('title')}</h3><p>${t('error')}${e.message||e}</p>`;
  }
}

document.addEventListener('click',function(){
  setTimeout(render,500);
},true);

document.addEventListener('DOMContentLoaded',()=>setTimeout(render,800));
window.addEventListener('load',()=>setTimeout(render,1200));

window.OMIDENO7_V6391_SAFE_ADMIN={render};
console.log('OmideNo7 V63.91 SAFE loaded');
})();
