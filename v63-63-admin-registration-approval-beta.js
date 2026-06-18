/* Omideno7 V63.63E — Admin Requests Legacy Disabled
   The old meeting request panel used to render inside More and caused jumping/closed details.
   It is intentionally disabled. The active panel is now inside Online School > Admin via omideno7-v63-86-admin-panel-in-school-fix.js.
*/
(function(){
  'use strict';
  function hideOldPanels(){
    var cssId='v6363eDisableMoreAdminCss';
    if(!document.getElementById(cssId)){
      var st=document.createElement('style');
      st.id=cssId;
      st.textContent='#v6363AdminCard,#om7v6385Admin{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:0!important}';
      document.head.appendChild(st);
    }
  }
  hideOldPanels();
  document.addEventListener('DOMContentLoaded',hideOldPanels);
  window.OMIDENO7_V6363_ADMIN_REGISTRATION_APPROVAL={render:hideOldPanels,loadRows:function(){},version:'V63.63E disabled; use V63.86 school admin panel'};
})();
