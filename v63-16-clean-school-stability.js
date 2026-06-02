(function(){
  'use strict';
  const css = `
    .bottom-nav{min-height:92px!important;padding-bottom:calc(22px + env(safe-area-inset-bottom,0px))!important;overflow:visible!important;z-index:9999!important}
    .bottom-nav .nav-inner{display:grid!important;grid-template-columns:repeat(6,minmax(42px,1fr))!important;gap:0!important;max-width:980px!important;margin:0 auto!important}
    .bottom-nav .nav-btn{min-width:0!important;width:100%!important;padding:7px 2px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important}
    .bottom-nav .nav-btn span:last-child,.bottom-nav .school-nav-label{font-size:clamp(.54rem,1.45vw,.74rem)!important;line-height:1.05!important;white-space:nowrap!important;font-weight:800!important}
    main{padding-bottom:125px!important}
    #adminMainArea,#adminSchoolArea,#school{max-width:100%!important;overflow-x:hidden!important}
    .school-card{overflow-wrap:anywhere!important}.school-admin-table{display:block;max-width:100%;overflow-x:auto}.school-ref-buttons{display:flex;flex-wrap:wrap;gap:8px}.school-ref-btn{white-space:normal!important;text-align:start!important}
    @media(min-width:760px){.bottom-nav .nav-inner{max-width:980px!important}.bottom-nav .nav-btn span:last-child{font-size:.74rem!important}}
  `;
  function install(){let st=document.getElementById('v6316-clean-style'); if(!st){st=document.createElement('style');st.id='v6316-clean-style';document.head.appendChild(st);} st.textContent=css;}
  document.addEventListener('DOMContentLoaded', install); setTimeout(install,500); setTimeout(install,1500);
  window.OMIDNO7_V6316_CLEAN='loaded';
})();
