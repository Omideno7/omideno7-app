(function(){
  const VERSION='V55';
  window.APP_VERSION=VERSION;
  function fix(){
    document.querySelectorAll('*').forEach(el=>{
      if(el.children.length===0 && /App Version:\s*V\d+(\.\d+)?|نسخه\s*:?\s*V\d+(\.\d+)?|V54|V53/.test(el.textContent||'')){
        el.textContent=(el.textContent||'').replace(/V\d+(\.\d+)?/g, VERSION);
      }
    });
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(fix,300));
  setTimeout(fix,900);
})();
