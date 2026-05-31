
(function(){
  window.APP_VERSION='V57';
  function lang(){ return localStorage.getItem('lang') || window.currentLang || 'fa'; }
  const L={
    fa:{apoc:'کتاب‌های اپوکریفا',apocDesc:'جدا از کتاب‌مقدس اصلی؛ برای مطالعه تاریخی و تعلیمی',copy:'کپی آیه',copied:'کپی شد',info:'اطلاعات ترجمه',bibleInfo:'فارسی: ترجمه مژده برای عصر جدید / Today’s Persian Version (FarTPV)، متن بدون تغییر و برای مطالعه رایگان نمایش داده می‌شود. انگلیسی: King James Version with Apocrypha (KJVA). کرواتی: فعلاً همان متن قبلی اپ حفظ شده است.'},
    en:{apoc:'Apocrypha',apocDesc:'Separate from the main Bible; for historical and instructional reading',copy:'Copy Verse',copied:'Copied',info:'Translation Info',bibleInfo:'Persian: Today’s Persian Version / Mojdeh (FarTPV), displayed without alteration for free reading. English: King James Version with Apocrypha (KJVA). Croatian: the current app text is kept for now.'},
    hr:{apoc:'Apokrifi',apocDesc:'Odvojeno od glavne Biblije; za povijesno i poučno čitanje',copy:'Kopiraj stih',copied:'Kopirano',info:'Informacije o prijevodu',bibleInfo:'Perzijski: Today’s Persian Version / Mojdeh (FarTPV), prikazano bez promjene za besplatno čitanje. Engleski: King James Version with Apocrypha (KJVA). Hrvatski: za sada ostaje postojeći tekst aplikacije.'}
  };
  function tr(k){ const x=L[lang()]||L.fa; return x[k]||L.en[k]||k; }
  window.openApocryphaLibraryV57=function(){
    try{
      activeBibleSection='apocrypha';
      localStorage.setItem('bibleSection','apocrypha');
      bibleReaderView='books';
      localStorage.setItem('bibleReaderView','books');
      const first=(window.bibleReaderData.books||[]).find(b=>b.section==='apocrypha');
      if(first){ selectedBibleBook=first.id; selectedBibleChapter=1; localStorage.setItem('bibleBook',first.id); localStorage.setItem('bibleChapter','1'); }
      renderBibleReader();
    }catch(e){ console.warn(e); }
  };
  const oldRender=window.renderBibleReader || renderBibleReader;
  window.renderBibleReader = renderBibleReader = function(){
    oldRender.apply(this,arguments);
    try{
      const root=document.getElementById('bibleReaderContent'); if(!root) return;
      const grid=root.querySelector('.bible-section-grid');
      if(grid && !root.querySelector('[data-apoc-v57]')){
        const btn=document.createElement('button');
        btn.type='button'; btn.className='bible-section-card'; btn.setAttribute('data-apoc-v57','1');
        btn.innerHTML='<span class="bible-section-icon">✧</span><strong>'+tr('apoc')+'</strong><small>'+tr('apocDesc')+'</small>';
        btn.onclick=window.openApocryphaLibraryV57;
        grid.appendChild(btn);
      }
      const hero=root.querySelector('.bible-reader-hero');
      if(hero && !root.querySelector('.translation-info-v57')){
        const d=document.createElement('details'); d.className='card translation-info-v57';
        d.innerHTML='<summary><strong>'+tr('info')+'</strong></summary><p>'+tr('bibleInfo')+'</p>';
        hero.insertAdjacentElement('afterend', d);
      }
    }catch(e){ console.warn(e); }
  };
  const oldTools=window.renderVerseTools || renderVerseTools;
  window.renderVerseTools = renderVerseTools = function(bookId, chapter, verseObj, st, terms){
    let html=oldTools.apply(this,arguments);
    const btn='<button type="button" onclick="window.copyBibleVerseV57(\''+bookId+'\','+chapter+','+verseObj.v+')">⧉ '+tr('copy')+'</button>';
    html=html.replace('<button type="button" onclick="activeBibleVerseRef=null;renderBibleReader()">×', btn+'<button type="button" onclick="activeBibleVerseRef=null;renderBibleReader()">×');
    return html;
  };
  window.copyBibleVerseV57=function(bookId,chapter,verse){
    try{
      const data=window.bibleReaderData||{}; const ch=(((data.chapters||{})[bookId]||{})[String(chapter)]||{});
      const lg=lang(); const arr=(ch[lg]&&ch[lg].length?ch[lg]:(ch.en&&ch.en.length?ch.en:(ch.fa&&ch.fa.length?ch.fa:(ch.hr||[]))));
      const v=(arr||[]).find(x=>String(x.v)===String(verse)); if(!v) return;
      const b=(data.books||[]).find(x=>x.id===bookId)||{}; const name=(b[lg]||b.en||b.fa||bookId);
      const translation=lg==='fa'?'ترجمه مژده':(lg==='en'?'KJV':'BKJ / متن فعلی کرواتی');
      const text=name+' '+chapter+':'+verse+' — '+translation+'\n'+v.t+'\n\nOmid No 7 Church App:\nhttps://omideno7.github.io/omideno7-app/';
      if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(()=>alert(tr('copied'))); }
      else { const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); alert(tr('copied')); }
    }catch(e){ console.warn(e); }
  };
  function setVersion(){
    document.querySelectorAll('.app-version,.version,.footer-version').forEach(el=>{ if(/V\d|Version|نسخه|Verzija/i.test(el.textContent||'')) el.textContent='App Version: V57'; });
    const foot=document.querySelector('footer,.footer'); if(foot && !document.querySelector('.v57-version-badge')){ const s=document.createElement('div'); s.className='v57-version-badge'; s.textContent='App Version: V57'; foot.appendChild(s); }
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(setVersion,500));
  setInterval(setVersion,2000);
})();
