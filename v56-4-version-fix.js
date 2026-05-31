(function(){
  function apply(){
    document.querySelectorAll('#appVersion,.app-version,[data-app-version]').forEach(el=>{el.textContent='V56.4';});
    if(window.APP_VERSION) window.APP_VERSION='V56.4';
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,100));
  setTimeout(apply,500);
})();
