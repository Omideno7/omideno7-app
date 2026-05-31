(function(){
  function fixVersion(){
    document.querySelectorAll('small, .small, footer, [id*=version], [class*=version]').forEach(function(el){
      if(/V\d+(\.\d+)?|App Version/i.test(el.textContent||'')) el.textContent=(el.textContent||'App Version').replace(/V\d+(\.\d+)?/g,'V56.2');
    });
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(fixVersion,300);setTimeout(fixVersion,1200);});
})();
