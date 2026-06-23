/* OmideNo7 V63.94 - School Cloud Sync */
(function(){
'use strict';

const TABLE='school_cloud_profiles';

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
 fa:{synced:'پیشرفت مدرسه در Cloud ذخیره شد.',restored:'اطلاعات مدرسه از Cloud بازیابی شد.',login:'برای ذخیره Cloud باید وارد حساب باشید.'},
 en:{synced:'School progress saved to Cloud.',restored:'School data restored from Cloud.',login:'Please log in to save Cloud progress.'},
 hr:{synced:'Napredak škole spremljen je u Cloud.',restored:'Podaci škole vraćeni su iz Clouda.',login:'Prijavite se za Cloud spremanje.'}
};

function t(k){return (TXT[lang()]||TXT.fa)[k]||k;}

async function user(){
  const c=sb();
  if(!c||!c.auth) return null;
  const r=await c.auth.getUser();
  return r?.data?.user||null;
}

function readLocal(){
  return {
    current_lesson:
      localStorage.getItem('om7_school_current_lesson') ||
      localStorage.getItem('school_current_lesson') ||
      localStorage.getItem('currentLesson') ||
      null,

    completed_lessons: safeJson(
      localStorage.getItem('om7_school_completed_lessons') ||
      localStorage.getItem('school_completed_lessons') ||
      '[]'
    ),

    notes: safeJson(
      localStorage.getItem('om7_school_notes') ||
      localStorage.getItem('school_notes') ||
      '{}'
    ),

    assignments: safeJson(
      localStorage.getItem('om7_school_assignments') ||
      localStorage.getItem('school_assignments') ||
      '{}'
    ),

    exam_results: safeJson(
      localStorage.getItem('om7_school_exam_results') ||
      localStorage.getItem('school_exam_results') ||
      '[]'
    )
  };
}

function safeJson(v){
  try{return JSON.parse(v||'null');}
  catch(e){return null;}
}

function writeLocal(row){
  if(!row) return;

  if(row.current_lesson){
    localStorage.setItem('om7_school_current_lesson', row.current_lesson);
  }

  if(row.completed_lessons){
    localStorage.setItem('om7_school_completed_lessons', JSON.stringify(row.completed_lessons));
  }

  if(row.notes){
    localStorage.setItem('om7_school_notes', JSON.stringify(row.notes));
  }

  if(row.assignments){
    localStorage.setItem('om7_school_assignments', JSON.stringify(row.assignments));
  }

  if(row.exam_results){
    localStorage.setItem('om7_school_exam_results', JSON.stringify(row.exam_results));
  }
}

async function ensureProfile(){
  const c=sb();
  const u=await user();
  if(!c||!c.from||!u) return null;

  const local=readLocal();

  const payload={
    user_id:u.id,
    email:String(u.email||'').toLowerCase(),
    full_name:localStorage.getItem('om7_user_full_name') || localStorage.getItem('full_name') || u.email,
    status:'active',
    current_lesson:local.current_lesson,
    completed_lessons:local.completed_lessons || [],
    notes:local.notes || {},
    assignments:local.assignments || {},
    exam_results:local.exam_results || [],
    last_activity:new Date().toISOString(),
    updated_at:new Date().toISOString()
  };

  const r=await c.from(TABLE).upsert(payload,{onConflict:'email'}).select().single();
  if(r.error){
    console.error('[OmideNo7 Cloud Sync] ensureProfile error', r.error);
    return null;
  }
  return r.data;
}

async function restoreFromCloud(){
  const c=sb();
  const u=await user();
  if(!c||!c.from||!u) return null;

  const r=await c.from(TABLE)
    .select('*')
    .eq('email',String(u.email||'').toLowerCase())
    .limit(1)
    .single();

  if(r.error || !r.data){
    return await ensureProfile();
  }

  writeLocal(r.data);
  console.log('[OmideNo7 Cloud Sync]', t('restored'));
  return r.data;
}

async function syncToCloud(){
  const c=sb();
  const u=await user();
  if(!c||!c.from||!u){
    console.warn('[OmideNo7 Cloud Sync]', t('login'));
    return null;
  }

  const local=readLocal();

  const payload={
    user_id:u.id,
    email:String(u.email||'').toLowerCase(),
    current_lesson:local.current_lesson,
    completed_lessons:local.completed_lessons || [],
    notes:local.notes || {},
    assignments:local.assignments || {},
    exam_results:local.exam_results || [],
    last_activity:new Date().toISOString(),
    updated_at:new Date().toISOString()
  };

  const r=await c.from(TABLE).upsert(payload,{onConflict:'email'}).select().single();

  if(r.error){
    console.error('[OmideNo7 Cloud Sync] sync error', r.error);
    return null;
  }

  console.log('[OmideNo7 Cloud Sync]', t('synced'));
  return r.data;
}

function hookStorage(){
  const oldSet=localStorage.setItem;
  localStorage.setItem=function(k,v){
    oldSet.apply(this,arguments);
    if(String(k).includes('school') || String(k).includes('lesson') || String(k).includes('exam')){
      clearTimeout(window.__om7CloudSyncTimer);
      window.__om7CloudSyncTimer=setTimeout(syncToCloud,900);
    }
  };
}

function boot(){
  restoreFromCloud();
  hookStorage();
  setInterval(syncToCloud,30000);
}

document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,1200));
window.addEventListener('load',()=>setTimeout(boot,1800));

window.OMIDENO7_SCHOOL_CLOUD_SYNC={
  restoreFromCloud,
  syncToCloud,
  ensureProfile
};

console.log('OmideNo7 V63.94 School Cloud Sync loaded');
})();
