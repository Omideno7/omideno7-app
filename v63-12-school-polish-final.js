(function(){
  'use strict';
  const VERSION='V63.12';

  function lang(){
    const cls=(document.documentElement.className+' '+document.body.className).toLowerCase();
    if(/\bhr\b/.test(cls)) return 'hr';
    if(/\ben\b/.test(cls)) return 'en';
    return 'fa';
  }
  const faDigits={'۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9','٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'};
  function digits(s){return String(s||'').replace(/[۰-۹٠-٩]/g,ch=>faDigits[ch]||ch);}
  function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  const labels={
    fa:{key:'آیات کلیدی',audioReady:'فایل صوتی درس',verseTitle:'متن آیه',iphoneVolume:'در آیفون ممکن است کنترل صدا فقط با دکمه‌های صدای گوشی عمل کند.'},
    en:{key:'Key Scriptures',audioReady:'Lesson audio',verseTitle:'Verse Text',iphoneVolume:'On iPhone, volume may be controlled by the device volume buttons.'},
    hr:{key:'Ključni stihovi',audioReady:'Audio lekcija',verseTitle:'Tekst stiha',iphoneVolume:'Na iPhoneu se glasnoća može kontrolirati tipkama uređaja.'}
  };
  const bookMap={
    'دوم قرنتیان':{en:'2 Corinthians',hr:'2. Korinćanima'},'۲ قرنتیان':{en:'2 Corinthians',hr:'2. Korinćanima'},'2 قرنتیان':{en:'2 Corinthians',hr:'2. Korinćanima'},
    'اول قرنتیان':{en:'1 Corinthians',hr:'1. Korinćanima'},'۱ قرنتیان':{en:'1 Corinthians',hr:'1. Korinćanima'},'1 قرنتیان':{en:'1 Corinthians',hr:'1. Korinćanima'},
    'یوحنا':{en:'John',hr:'Ivan'},'رومیان':{en:'Romans',hr:'Rimljanima'},'افسسیان':{en:'Ephesians',hr:'Efežanima'},'اول یوحنا':{en:'1 John',hr:'1. Ivanova'},'۱ یوحنا':{en:'1 John',hr:'1. Ivanova'},'1 یوحنا':{en:'1 John',hr:'1. Ivanova'},
    'دوم یوحنا':{en:'2 John',hr:'2. Ivanova'},'سوم یوحنا':{en:'3 John',hr:'3. Ivanova'},'اول تسالونیکیان':{en:'1 Thessalonians',hr:'1. Solunjanima'},'۱ تسالونیکیان':{en:'1 Thessalonians',hr:'1. Solunjanima'},
    'دوم تسالونیکیان':{en:'2 Thessalonians',hr:'2. Solunjanima'},'۲ تسالونیکیان':{en:'2 Thessalonians',hr:'2. Solunjanima'},
    'کولسیان':{en:'Colossians',hr:'Kološanima'},'اول پطرس':{en:'1 Peter',hr:'1. Petrova'},'۱ پطرس':{en:'1 Peter',hr:'1. Petrova'},'دوم پطرس':{en:'2 Peter',hr:'2. Petrova'},'۲ پطرس':{en:'2 Peter',hr:'2. Petrova'},
    'اعمال رسولان':{en:'Acts',hr:'Djela'},'اعمال':{en:'Acts',hr:'Djela'},'غلاطیان':{en:'Galatians',hr:'Galaćanima'},'مرقس':{en:'Mark',hr:'Marko'},'متی':{en:'Matthew',hr:'Matej'},'لوقا':{en:'Luke',hr:'Luka'},
    'اشعیا':{en:'Isaiah',hr:'Izaija'},'پیدایش':{en:'Genesis',hr:'Postanak'},'مزامیر':{en:'Psalms',hr:'Psalmi'},'مزمور':{en:'Psalm',hr:'Psalam'},'امثال':{en:'Proverbs',hr:'Izreke'},
    'یعقوب':{en:'James',hr:'Jakovljeva'},'عبرانیان':{en:'Hebrews',hr:'Hebrejima'},'فیلیپیان':{en:'Philippians',hr:'Filipljanima'},'اول تیموتائوس':{en:'1 Timothy',hr:'1. Timoteju'},'۱ تیموتائوس':{en:'1 Timothy',hr:'1. Timoteju'},
    'دوم تیموتائوس':{en:'2 Timothy',hr:'2. Timoteju'},'۲ تیموتائوس':{en:'2 Timothy',hr:'2. Timoteju'},'تیطس':{en:'Titus',hr:'Titu'},'مکاشفه':{en:'Revelation',hr:'Otkrivenje'}
  };
  const sortedBooks=Object.keys(bookMap).sort((a,b)=>b.length-a.length);
  function localizeRef(ref){
    const L=lang();
    if(L==='fa') return String(ref||'');
    let s=digits(String(ref||'').trim()).replace(/\s+/g,' ');
    for(const b of sortedBooks){
      if(s.startsWith(b)){
        s=bookMap[b][L]+s.slice(b.length);
        break;
      }
    }
    return s.replace(/؛/g,';').replace(/آیات/g,'').replace(/آیه/g,'').replace(/باب/g,'').replace(/\s+/g,' ').trim();
  }
  function splitRefs(s){return String(s||'').split(/[؛;]+/).map(x=>x.trim()).filter(Boolean);}

  function manualVerse(ref){
    const s=digits(String(ref||''));
    if(!/(۲|2|دوم)\s*قرنتیان/.test(String(ref)) && !/2\s*Corinthians/i.test(s) && !/2\.\s*Korin/i.test(s)) return '';
    if(!/5\s*[:：]\s*17/.test(s)) return '';
    const L=lang();
    if(L==='en') return '<p><strong>17</strong> Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.</p><p><strong>18</strong> And all things are of God, who hath reconciled us to himself by Jesus Christ, and hath given to us the ministry of reconciliation;</p>';
    if(L==='hr') return '<p><strong>17</strong> Dakle, ako je tko u Kristu, novo je stvorenje; staro je prošlo, evo, sve je postalo novo.</p><p><strong>18</strong> A sve je od Boga, koji nas je pomirio sa sobom po Isusu Kristu i dao nam službu pomirenja.</p>';
    return '<p><strong>۱۷</strong> پس اگر کسی در مسیح باشد، خلقت تازه‌ای است؛ چیزهای کهنه درگذشت، اینک همه چیز تازه شده است.</p><p><strong>۱۸</strong> و همه چیز از خداست، که ما را به‌وسیله عیسی مسیح با خود مصالحه داد و خدمت مصالحه را به ما سپرد.</p>';
  }

  function localizeKeyScriptureText(){
    const L=lang();
    document.querySelectorAll('#school p').forEach(p=>{
      const strong=p.querySelector('strong');
      if(!strong) return;
      const strongText=(strong.textContent||'').replace(':','').trim();
      if(!/آیات کلیدی|Key Scriptures|Ključni stihovi/.test(strongText)) return;
      const whole=p.textContent||'';
      const raw=whole.replace(/^(آیات کلیدی|Key Scriptures|Ključni stihovi)\s*[:：]?/,'').trim();
      const refs=splitRefs(raw);
      if(!refs.length) return;
      strong.textContent=labels[L].key+':';
      Array.from(p.childNodes).forEach(n=>{ if(n!==strong) n.remove(); });
      p.appendChild(document.createTextNode(' '+refs.map(localizeRef).join(L==='fa'?'؛ ':'; ')));
    });
    document.querySelectorAll('#school [data-school-ref], #school .v6311-ref-btn').forEach(btn=>{
      const raw=btn.getAttribute('data-school-ref') || btn.getAttribute('data-raw-ref') || btn.textContent || '';
      if(!btn.getAttribute('data-raw-ref')) btn.setAttribute('data-raw-ref',raw.trim());
      btn.textContent=localizeRef(btn.getAttribute('data-raw-ref'));
    });
  }

  function fixVerseOutputAfterClick(btn){
    const raw=btn.getAttribute('data-school-ref') || btn.getAttribute('data-raw-ref') || btn.textContent || '';
    setTimeout(()=>{
      const card=btn.closest('details.school-card,.school-card,#school') || document;
      let out=null;
      const code=btn.getAttribute('data-lesson-code');
      if(code) out=document.getElementById('refOut-'+code);
      out=out || card.querySelector('.v6311-ref-output,.school-ref-output');
      if(!out) return;
      const title=localizeRef(raw);
      const manual=manualVerse(raw);
      if(manual){
        out.style.display='block';
        out.innerHTML='<div class="school-card" style="margin-top:10px"><h4>'+esc(title)+'</h4><p class="school-muted">'+esc(labels[lang()].verseTitle)+'</p><div>'+manual+'</div></div>';
      } else {
        const h=out.querySelector('h4');
        if(h) h.textContent=title;
      }
      out.scrollIntoView({behavior:'smooth',block:'nearest'});
    },80);
  }

  function hideAudioPathsAndImproveControls(){
    const L=lang();
    document.querySelectorAll('#school p').forEach(p=>{
      if(/school-audio\//.test(p.textContent||'')){
        p.innerHTML='<strong>'+esc(labels[L].audioReady)+'</strong>';
        p.classList.add('school-muted');
      }
    });
    document.querySelectorAll('#school audio').forEach(audio=>{
      audio.setAttribute('playsinline','');
      audio.preload=audio.preload||'metadata';
    });
    document.querySelectorAll('#school [data-v6311-volume], #school .v6312-volume').forEach(range=>{
      if(range.dataset.v6312Bound==='1') return;
      range.dataset.v6312Bound='1';
      const handler=()=>{
        const val=Math.max(0,Math.min(1,parseFloat(range.value||'1')));
        let audio=null;
        const tools=range.closest('.v6311-audio-tools,.v6312-audio-tools');
        if(tools){
          let el=tools.previousElementSibling;
          while(el && el.tagName!=='AUDIO') el=el.previousElementSibling;
          audio=el;
        }
        audio=audio || range.closest('.school-card')?.querySelector('audio') || document.querySelector('#school audio');
        if(audio){ audio.volume=val; audio.muted=(val===0); audio.dataset.volume=String(val); }
      };
      range.addEventListener('input',handler);
      range.addEventListener('change',handler);
      range.addEventListener('touchend',handler);
    });
    document.querySelectorAll('#school .v6311-audio-tools').forEach(tools=>{
      if(tools.querySelector('.v6312-ios-note')) return;
      const note=document.createElement('small');
      note.className='v6312-ios-note school-muted';
      note.style.display='block'; note.style.width='100%'; note.style.marginTop='2px';
      note.textContent=labels[L].iphoneVolume;
      tools.appendChild(note);
    });
  }

  function addStyle(){
    if(document.getElementById('v6312-style')) return;
    const st=document.createElement('style');
    st.id='v6312-style';
    st.textContent=`
      #school .school-ref-btn,#school .v6311-ref-btn{white-space:normal!important;text-align:center!important;line-height:1.25!important}
      #school .school-ref-output .school-card,#school .v6311-ref-output .school-card{background:#fbfcff!important;border:1px solid #dfe6fb!important}
      #school audio{width:100%!important}
      #school .v6311-audio-tools select,#school .v6311-audio-tools input{accent-color:#06146D!important}
    `;
    document.head.appendChild(st);
  }
  function apply(){addStyle(); localizeKeyScriptureText(); hideAudioPathsAndImproveControls();}
  document.addEventListener('click',e=>{
    const btn=e.target.closest && e.target.closest('#school [data-school-ref], #school .v6311-ref-btn');
    if(btn) fixVerseOutputAfterClick(btn);
    setTimeout(apply,120);
  },true);
  document.addEventListener('DOMContentLoaded',apply);
  const mo=new MutationObserver(()=>apply());
  mo.observe(document.documentElement,{childList:true,subtree:true});
  window.OMIDNO7_V6312='loaded';
})();
