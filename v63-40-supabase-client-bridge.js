/* Omideno7 V63.40b — Supabase Client Bridge for Beta Diagnostic
   Purpose: capture the existing School Supabase client without changing the stable app.
   Beta-only. No database writes. No auto sync. */
(function(){
  'use strict';
  var VERSION='V63.40b Supabase Client Bridge';
  var captured=[];

  function expose(client, source){
    if(!client || !client.auth || typeof client.from !== 'function') return client;
    try{
      if(captured.indexOf(client) === -1) captured.push(client);
      window.omideno7Supabase = client;
      window.schoolSupabase = client;
      window.supabaseClient = client;
      window.__om7SupabaseClients = captured;
      window.__om7SupabaseClientSource = source || 'unknown';
    }catch(e){}
    return client;
  }

  function patchObject(obj){
    if(!obj || typeof obj.createClient !== 'function') return obj;
    if(obj.createClient.__om7BridgePatched) return obj;
    var original = obj.createClient.bind(obj);
    function wrappedCreateClient(){
      var client = original.apply(obj, arguments);
      return expose(client, 'supabase.createClient');
    }
    wrappedCreateClient.__om7BridgePatched = true;
    try{ obj.createClient = wrappedCreateClient; }catch(e){}
    return obj;
  }

  try{
    var current = window.supabase;
    Object.defineProperty(window, 'supabase', {
      configurable: true,
      get: function(){ return current; },
      set: function(v){ current = patchObject(v); }
    });
    if(current) current = patchObject(current);
  }catch(e){
    try{ if(window.supabase) patchObject(window.supabase); }catch(x){}
  }

  // Also search for an already-created client after school scripts load.
  function scan(){
    try{
      var names=['schoolSupabase','supabaseClient','omideno7Supabase','supabaseDb','sb','SUPABASE_CLIENT'];
      names.forEach(function(n){ expose(window[n], n); });
      for(var k in window){
        if(!Object.prototype.hasOwnProperty.call(window,k)) continue;
        if(!/supabase|school|client|db/i.test(k)) continue;
        expose(window[k], k);
      }
    }catch(e){}
  }
  [100,300,700,1500,3000].forEach(function(ms){ setTimeout(scan, ms); });

  window.OMIDENO7_SUPABASE_BRIDGE_VERSION = VERSION;
})();
