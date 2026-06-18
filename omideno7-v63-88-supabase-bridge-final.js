/* Omideno7 V63.88 — Supabase Bridge Final
   Purpose: create one reliable Supabase client for Registration, School and Admin.
   Fixes: "Supabase client not available" on member devices.
*/
(function(){
  'use strict';
  var VERSION='V63.88 Supabase Bridge Final';
  var SUPABASE_URL='https://uibhpgcsgcievktxmcfg.supabase.co';
  var SUPABASE_KEY='sb_publishable_clP99PgnpuT6a5MCyDfVWQ_e_7wWYrk';
  var client=null;
  var loading=null;
  var SDKS=[
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
    'https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.js',
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js'
  ];

  function log(msg, extra){
    try{ console.log('[OmideNo7 Supabase Bridge]', msg, extra||''); }catch(e){}
  }

  function existingClient(){
    var names=['omideno7Supabase','schoolSupabase','supabaseClient','om7Supabase','OMIDENO7_SUPABASE_CLIENT','__supabase'];
    for(var i=0;i<names.length;i++){
      try{
        var c=window[names[i]];
        if(c && c.from && c.auth) return c;
      }catch(e){}
    }
    return null;
  }

  function expose(c){
    if(!c || !c.from || !c.auth) return c;
    client=c;
    window.omideno7Supabase=c;
    window.schoolSupabase=c;
    window.supabaseClient=c;
    window.om7Supabase=c;
    window.OMIDENO7_SUPABASE_CLIENT=c;
    window.__supabase=c;
    try{ window.dispatchEvent(new CustomEvent('omideno7:supabase-ready',{detail:{version:VERSION}})); }catch(e){}
    return c;
  }

  function loadOne(src, timeoutMs){
    return new Promise(function(resolve,reject){
      if(window.supabase && window.supabase.createClient){ resolve(); return; }
      var existing=document.querySelector('script[data-om7-supabase-sdk][src="'+src+'"]');
      var done=false;
      var timer=setTimeout(function(){
        if(done) return;
        done=true;
        reject(new Error('Supabase SDK load timeout: '+src));
      }, timeoutMs||9000);
      function ok(){ if(done) return; done=true; clearTimeout(timer); resolve(); }
      function bad(){ if(done) return; done=true; clearTimeout(timer); reject(new Error('Supabase SDK load failed: '+src)); }
      if(existing){
        existing.addEventListener('load', ok, {once:true});
        existing.addEventListener('error', bad, {once:true});
        // If an older script tag already loaded successfully, resolve on next tick.
        setTimeout(function(){ if(window.supabase && window.supabase.createClient) ok(); }, 300);
        return;
      }
      var s=document.createElement('script');
      s.src=src;
      s.async=true;
      s.dataset.om7SupabaseSdk='1';
      s.onload=ok;
      s.onerror=bad;
      document.head.appendChild(s);
    });
  }

  async function ensureSupabaseClient(){
    var c=existingClient();
    if(c) return expose(c);
    if(client && client.from && client.auth) return client;
    if(loading) return loading;
    loading=(async function(){
      if(!window.supabase || !window.supabase.createClient){
        var lastErr=null;
        for(var i=0;i<SDKS.length;i++){
          try{
            await loadOne(SDKS[i], 9000);
            if(window.supabase && window.supabase.createClient) break;
          }catch(e){ lastErr=e; log('SDK source failed', e.message||e); }
        }
        if(!window.supabase || !window.supabase.createClient){
          throw lastErr || new Error('Supabase SDK could not be loaded');
        }
      }
      var created=window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth:{persistSession:true, autoRefreshToken:true, detectSessionInUrl:true}
      });
      return expose(created);
    })();
    try{return await loading;} finally {loading=null;}
  }

  window.OMIDENO7_GET_SUPABASE_CLIENT=ensureSupabaseClient;
  window.OMIDENO7_SUPABASE_BRIDGE_VERSION=VERSION;
  window.OMIDENO7_SUPABASE_READY=ensureSupabaseClient().catch(function(e){
    log('initial client creation failed', e.message||e);
    return null;
  });
})();
