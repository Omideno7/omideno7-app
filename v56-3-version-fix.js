(function(){
  function fixVersion(){
    document.querySelectorAll('small').forEach(el=>{
      if(/App Version:/i.test(el.textContent||'')) el.textContent='App Version: V56.3';
    });
  }
  document.addEventListener('DOMContentLoaded',fixVersion);
  setTimeout(fixVersion,300);
})();
