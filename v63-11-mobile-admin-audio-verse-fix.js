(function(){
  'use strict';
  const VERSION='V63.11';

  function addStyle(){
    if(document.getElementById('v6311-style')) return;
    const st=document.createElement('style');
    st.id='v6311-style';
    st.textContent=`
      :root{--safe-bottom:env(safe-area-inset-bottom,0px)}
      body{padding-bottom:calc(92px + var(--safe-bottom))!important;overflow-x:hidden!important}
      .bottom-nav{position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:9999!important;background:#fff!important;border-top:1px solid rgba(6,20,109,.12)!important;box-shadow:0 -8px 24px rgba(6,20,109,.10)!important;padding:6px 6px calc(14px + var(--safe-bottom))!important;min-height:76px!important;overflow:visible!important}
      .bottom-nav .nav-inner{display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:2px!important;align-items:center!important;max-width:760px!important;margin:0 auto!important;width:100%!important}
      .bottom-nav .nav-btn{height:58px!important;min-height:58px!important;border-radius:16px!important;padding:5px 2px!important;min-width:0!important;touch-action:manipulation!important;-webkit-tap-highlight-color:transparent!important}
      .bottom-nav .nav-btn .icon{font-size:1.08rem!important;line-height:1!important;margin-bottom:1px!important}
      .bottom-nav .nav-btn span:last-child,.bottom-nav .school-nav-label{font-size:.62rem!important;line-height:1.05!important;font-weight:850!important;white-space:normal!important;text-align:center!important}
      @media(max-width:390px){.bottom-nav .nav-btn{height:56px!important;min-height:56px!important;border-radius:14px!important}.bottom-nav .nav-btn .icon{font-size:.98rem!important}.bottom-nav .nav-btn span:last-child,.bottom-nav .school-nav-label{font-size:.56rem!important}}
      #school .school-shell{padding-bottom:calc(120px + var(--safe-bottom))!important;max-width:980px!important;box-sizing:border-box!important;overflow-x:hidden!important}
      #school .school-card,#school details.school-card{max-width:100%!important;box-sizing:border-box!important;overflow-wrap:anywhere!important}
      #school .school-admin-table{display:block!important;width:100%!important;max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;border-spacing:0!important;font-size:.92rem!important}
      #school .school-admin-table th,#school .school-admin-table td{white-space:normal!important;min-width:100px!important}
      #school textarea,#school input,#school select{max-width:100%!important;box-sizing:border-box!important}
      #school .school-tabs{max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;padding-bottom:4px!important}
      @media(max-width:520px){#school .school-shell{padding-left:10px!important;padding-right:10px!important}#school .school-grid{grid-template-columns:1fr!important}#school .school-card{padding:13px!important;border-radius:18px!important}#school h2{font-size:1.25rem!important}#school h3{font-size:1.08rem!important}#school .school-btn{padding:10px 12px!important;font-size:.93rem!important}}
      .v6311-ref-list{display:flex;flex-wrap:wrap;gap:7px;margin:8px 0 10px}
      .v6311-ref-btn{border:1px solid #cdd6f3!important;background:#f7f9ff!important;color:#06146D!important;border-radius:999px!important;padding:8px 11px!important;font-weight:850!important;cursor:pointer!important;white-space:normal!important}
      .v6311-ref-btn.active{background:#06146D!important;color:#fff!important}
      .v6311-ref-output{margin-top:10px;border:1px solid #dfe6fb;border-radius:16px;padding:12px;background:#fbfcff;line-height:1.9;color:#141821}
      .v6311-ref-output h4{margin:.1rem 0 .5rem;color:#06146D}
      .v6311-audio-tools{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:8px;background:#f7f9ff;border:1px solid #dfe6fb;border-radius:14px;padding:9px}
      .v6311-audio-tools label{font-weight:800;color:#06146D;font-size:.9rem;display:flex;gap:6px;align-items:center}
      .v6311-audio-tools input[type=range]{width:130px;max-width:44vw}
    `;
    document.head.appendChild(st);
  }

  const faDigits={'۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9','٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'};
  function normDigits(s){return String(s||'').replace(/[۰-۹٠-٩]/g,ch=>faDigits[ch]||ch).replace(/–/g,'-').replace(/—/g,'-');}
  function currentLang(){
    const h=document.documentElement.className+' '+document.body.className;
    if(/\bhr\b/.test(h)) return 'hr';
    if(/\ben\b/.test(h)) return 'en';
    return 'fa';
  }
  const bookAliases={
    'پیدایش':'GEN','خروج':'EXO','لاویان':'LEV','اعداد':'NUM','تثنیه':'DEU','یوشع':'JOS','داوران':'JDG','روت':'RUT','اول سموئیل':'1SA','دوم سموئیل':'2SA','اول پادشاهان':'1KI','دوم پادشاهان':'2KI','اول تواریخ':'1CH','دوم تواریخ':'2CH','عزرا':'EZR','نحمیا':'NEH','استر':'EST','ایوب':'JOB','مزامیر':'PSA','مزمور':'PSA','امثال':'PRO','جامعه':'ECC','غزل غزلها':'SNG','اشعیا':'ISA','ارمیا':'JER','مراثی':'LAM','حزقیال':'EZK','دانیال':'DAN','هوشع':'HOS','یوئیل':'JOL','عاموس':'AMO','عوبدیا':'OBA','یونس':'JON','میکاه':'MIC','ناحوم':'NAM','حبقوق':'HAB','صفنیا':'ZEP','حجی':'HAG','زکریا':'ZEC','ملاکی':'MAL',
    'متی':'MAT','مرقس':'MRK','لوقا':'LUK','یوحنا':'JHN','اعمال':'ACT','اعمال رسولان':'ACT','رومیان':'ROM','اول قرنتیان':'1CO','دوم قرنتیان':'2CO','غلاطیان':'GAL','افسسیان':'EPH','فیلیپیان':'PHP','کولسیان':'COL','اول تسالونیکیان':'1TH','دوم تسالونیکیان':'2TH','اول تیموتائوس':'1TI','دوم تیموتائوس':'2TI','تیطس':'TIT','فیلیمون':'PHM','عبرانیان':'HEB','یعقوب':'JAS','اول پطرس':'1PE','دوم پطرس':'2PE','اول یوحنا':'1JN','دوم یوحنا':'2JN','سوم یوحنا':'3JN','یهودا':'JUD','مکاشفه':'REV',
    'Genesis':'GEN','Exodus':'EXO','Leviticus':'LEV','Numbers':'NUM','Deuteronomy':'DEU','Joshua':'JOS','Judges':'JDG','Ruth':'RUT','1 Samuel':'1SA','2 Samuel':'2SA','Psalms':'PSA','Psalm':'PSA','Proverbs':'PRO','Isaiah':'ISA','Jeremiah':'JER','Ezekiel':'EZK','Daniel':'DAN','Matthew':'MAT','Mark':'MRK','Luke':'LUK','John':'JHN','Acts':'ACT','Romans':'ROM','1 Corinthians':'1CO','2 Corinthians':'2CO','Galatians':'GAL','Ephesians':'EPH','Philippians':'PHP','Colossians':'COL','1 Thessalonians':'1TH','2 Thessalonians':'2TH','1 Timothy':'1TI','2 Timothy':'2TI','Titus':'TIT','Hebrews':'HEB','James':'JAS','1 Peter':'1PE','2 Peter':'2PE','1 John':'1JN','2 John':'2JN','3 John':'3JN','Jude':'JUD','Revelation':'REV',
    'Postanak':'GEN','Izlazak':'EXO','Psalmi':'PSA','Psalam':'PSA','Izreke':'PRO','Izaija':'ISA','Matej':'MAT','Marko':'MRK','Luka':'LUK','Ivan':'JHN','Djela':'ACT','Rimljanima':'ROM','1. Korinćanima':'1CO','2. Korinćanima':'2CO','Galaćanima':'GAL','Efežanima':'EPH','Filipljanima':'PHP','Kološanima':'COL','1. Solunjanima':'1TH','2. Solunjanima':'2TH','1. Timoteju':'1TI','2. Timoteju':'2TI','Hebrejima':'HEB','Jakovljeva':'JAS','1. Petrova':'1PE','2. Petrova':'2PE','1. Ivanova':'1JN','2. Ivanova':'2JN','3. Ivanova':'3JN','Judina':'JUD','Otkrivenje':'REV'
  };
  function parseRef(ref){
    const original=String(ref||'').trim();
    const s=normDigits(original).replace(/باب/g,' ').replace(/آیات/g,' ').replace(/آیه/g,' ').replace(/:/g,':').replace(/\s+/g,' ').trim();
    const m=s.match(/^(.+?)\s+(\d+)\s*[:：]\s*(\d+)(?:\s*-\s*(\d+))?$/);
    if(!m) return null;
    const bookRaw=m[1].trim().replace(/\.$/,'');
    let id=bookAliases[bookRaw];
    if(!id){
      const key=Object.keys(bookAliases).sort((a,b)=>b.length-a.length).find(k=>bookRaw.toLowerCase()===k.toLowerCase());
      if(key) id=bookAliases[key];
    }
    if(!id) return null;
    return {id,chapter:String(parseInt(m[2],10)),start:parseInt(m[3],10),end:parseInt(m[4]||m[3],10),original};
  }
  function getVerseText(ref){
    const p=parseRef(ref);
    if(!p) return '';
    const data=window.bibleReaderData && window.bibleReaderData.chapters;
    if(!data || !data[p.id] || !data[p.id][p.chapter]) return '';
    const lang=currentLang();
    const chapter=data[p.id][p.chapter];
    const arr=chapter[lang] || chapter.fa || chapter.en || chapter.hr || [];
    if(!Array.isArray(arr)) return '';
    const verses=arr.filter(v=>Number(v.v)>=p.start && Number(v.v)<=p.end);
    return verses.map(v=>`<p><strong>${v.v}</strong> ${escapeHtml(v.t||'')}</p>`).join('');
  }
  function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function refsFromText(s){return String(s||'').split(/[؛;]+/).map(x=>x.trim()).filter(Boolean);}

  function upgradeKeyScriptures(){
    const adminArea=document.getElementById('adminSchoolArea');
    if(!adminArea) return;
    adminArea.querySelectorAll('details.school-card').forEach((card,idx)=>{
      if(card.dataset.v6311Refs==='1') return;
      const ps=[...card.querySelectorAll(':scope > p')];
      const p=ps.find(x=>/آیات کلیدی|Key Scriptures|Ključni stihovi/.test(x.textContent||''));
      if(!p) return;
      const txt=(p.textContent||'').replace(/^(آیات کلیدی|Key Scriptures|Ključni stihovi)\s*[:：]?/,'').trim();
      const refs=refsFromText(txt);
      if(!refs.length) return;
      card.dataset.v6311Refs='1';
      p.innerHTML=p.innerHTML.replace(escapeHtml(txt),'');
      const box=document.createElement('div');
      box.className='v6311-ref-list';
      const out=document.createElement('div');
      out.className='v6311-ref-output';
      out.style.display='none';
      refs.forEach(ref=>{
        const btn=document.createElement('button');
        btn.type='button'; btn.className='v6311-ref-btn'; btn.textContent=ref;
        btn.addEventListener('click',ev=>{
          ev.preventDefault(); ev.stopPropagation();
          box.querySelectorAll('.v6311-ref-btn').forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
          const verse=getVerseText(ref);
          out.style.display='block';
          out.innerHTML=`<h4>${escapeHtml(ref)}</h4>${verse || '<p>متن کامل این آیه در دیتای کتاب‌مقدس فعلی پیدا نشد. لطفاً از بخش کتاب‌مقدس اپ بررسی شود.</p>'}`;
        }, true);
        box.appendChild(btn);
      });
      const old=card.querySelector('.school-key-refs'); if(old) old.style.display='none';
      p.insertAdjacentElement('afterend',box); box.insertAdjacentElement('afterend',out);
    });
  }

  function addAudioControls(){
    document.querySelectorAll('#school audio').forEach(audio=>{
      if(audio.dataset.v6311Audio==='1') return;
      audio.dataset.v6311Audio='1';
      const tools=document.createElement('div');
      tools.className='v6311-audio-tools';
      const id='au'+Math.random().toString(36).slice(2);
      audio.id=audio.id||id;
      tools.innerHTML=`<label>سرعت <select data-v6311-speed><option value="0.75">0.75x</option><option value="1" selected>1x</option><option value="1.25">1.25x</option><option value="1.5">1.5x</option><option value="2">2x</option></select></label><label>ولوم <input type="range" min="0" max="1" step="0.05" value="1" data-v6311-volume></label>`;
      audio.insertAdjacentElement('afterend',tools);
      tools.querySelector('[data-v6311-speed]').addEventListener('change',e=>{audio.playbackRate=parseFloat(e.target.value||'1');});
      tools.querySelector('[data-v6311-volume]').addEventListener('input',e=>{audio.volume=parseFloat(e.target.value||'1');});
    });
  }

  function applyFixes(){ addStyle(); upgradeKeyScriptures(); addAudioControls(); }
  document.addEventListener('DOMContentLoaded',applyFixes);
  document.addEventListener('click',()=>setTimeout(applyFixes,80),true);
  const mo=new MutationObserver(()=>applyFixes());
  mo.observe(document.documentElement,{childList:true,subtree:true});
})();
