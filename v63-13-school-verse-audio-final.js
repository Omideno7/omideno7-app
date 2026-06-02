(function(){
  'use strict';
  const VERSION='V63.13';

  const labels={
    fa:{verseTitle:'متن آیه',notFound:'متن کامل این آیه در دیتای کتاب‌مقدس فعلی پیدا نشد.',speed:'سرعت'},
    en:{verseTitle:'Verse Text',notFound:'The full text of this verse was not found in the current Bible data.',speed:'Speed'},
    hr:{verseTitle:'Tekst stiha',notFound:'Cijeli tekst ovog stiha nije pronađen u trenutnim biblijskim podacima.',speed:'Brzina'}
  };
  const faDigits={'۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9','٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'};
  function digits(s){return String(s||'').replace(/[۰-۹٠-٩]/g,ch=>faDigits[ch]||ch);}
  function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function lang(){
    const s=(document.documentElement.className+' '+document.body.className+' '+(localStorage.getItem('lang')||'')+' '+(localStorage.getItem('omideno7_lang')||'')).toLowerCase();
    if(/\bhr\b|cro|hrv/.test(s)) return 'hr';
    if(/\ben\b|english/.test(s)) return 'en';
    return 'fa';
  }
  function nref(raw){
    return digits(String(raw||'')).toLowerCase()
      .replace(/[\u200c\u200f\u202a-\u202e]/g,'')
      .replace(/[:：]/g,':')
      .replace(/[؛;]/g,';')
      .replace(/\s+/g,' ')
      .trim();
  }
  function hasAny(s,arr){return arr.some(x=>s.includes(x));}
  function hasVerse(s,v){
    const vv=String(v);
    return new RegExp('(^|[^0-9])'+vv+'([^0-9]|$)').test(s) || s.includes(':'+vv) || s.includes(' '+vv+' ');
  }

  const BOOKS={
    cor2:['2 corinthians','2. korin','دوم قرنتیان','2 قرنتیان','۲ قرنتیان','دوم قورنتیان','2 قورنتیان','۲ قورنتیان'],
    cor1:['1 corinthians','1. korin','اول قرنتیان','1 قرنتیان','۱ قرنتیان','اول قورنتیان','1 قورنتیان','۱ قورنتیان'],
    john:['john','ivan','یوحنا','انجیل یوحنا'],
    gal:['galatians','gala','غلاطیان','قلاتیان']
  };

  const VERSES={
    '2co_5_17_18':{
      fa:'<p><strong>۱۷</strong> پس اگر کسی در مسیح باشد، خلقت تازه‌ای است؛ چیزهای کهنه درگذشت، اینک همه چیز تازه شده است.</p><p><strong>۱۸</strong> و همه چیز از خداست، که ما را به‌وسیله عیسی مسیح با خود مصالحه داد و خدمت مصالحه را به ما سپرد.</p>',
      en:'<p><strong>17</strong> Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.</p><p><strong>18</strong> And all things are of God, who hath reconciled us to himself by Jesus Christ, and hath given to us the ministry of reconciliation;</p>',
      hr:'<p><strong>17</strong> Dakle, ako je tko u Kristu, novo je stvorenje; staro je prošlo, evo, sve je postalo novo.</p><p><strong>18</strong> A sve je od Boga, koji nas je pomirio sa sobom po Isusu Kristu i dao nam službu pomirenja.</p>'
    },
    'john_14_17_26':{
      fa:'<p><strong>۱۷</strong> یعنی روح راستی، که جهان نمی‌تواند او را بپذیرد، زیرا او را نمی‌بیند و نمی‌شناسد؛ اما شما او را می‌شناسید، زیرا نزد شما می‌ماند و در شما خواهد بود.</p><p><strong>۲۶</strong> اما تسلی‌دهنده، یعنی روح‌القدس، که پدر او را به نام من خواهد فرستاد، او همه چیز را به شما تعلیم خواهد داد و هر آنچه به شما گفته‌ام به یاد شما خواهد آورد.</p>',
      en:'<p><strong>17</strong> Even the Spirit of truth; whom the world cannot receive, because it seeth him not, neither knoweth him: but ye know him; for he dwelleth with you, and shall be in you.</p><p><strong>26</strong> But the Comforter, which is the Holy Ghost, whom the Father will send in my name, he shall teach you all things, and bring all things to your remembrance, whatsoever I have said unto you.</p>',
      hr:'<p><strong>17</strong> Duha istine, kojega svijet ne može primiti, jer ga ne vidi i ne poznaje; ali vi ga poznajete, jer prebiva s vama i bit će u vama.</p><p><strong>26</strong> A Branitelj, Duh Sveti, kojega će Otac poslati u moje ime, on će vas poučiti svemu i podsjetiti vas na sve što sam vam rekao.</p>'
    },
    '1co_2_14_15':{
      fa:'<p><strong>۱۴</strong> اما انسان نفسانی چیزهای روح خدا را نمی‌پذیرد، زیرا برای او جهالت است؛ و نمی‌تواند آن‌ها را بشناسد، چون به‌طور روحانی تشخیص داده می‌شوند.</p><p><strong>۱۵</strong> اما انسان روحانی همه چیز را تشخیص می‌دهد، ولی خودِ او از کسی داوری نمی‌شود.</p>',
      en:'<p><strong>14</strong> But the natural man receiveth not the things of the Spirit of God: for they are foolishness unto him: neither can he know them, because they are spiritually discerned.</p><p><strong>15</strong> But he that is spiritual judgeth all things, yet he himself is judged of no man.</p>',
      hr:'<p><strong>14</strong> Naravni čovjek ne prima stvari Duha Božjega, jer su mu ludost; i ne može ih spoznati, jer se duhovno prosuđuju.</p><p><strong>15</strong> A duhovan čovjek prosuđuje sve, a njega samoga nitko ne prosuđuje.</p>'
    },
    '1co_11_6_19':{
      fa:'<p><strong>۶</strong> زیرا اگر زن پوشیده نباشد، بگذار موی خود را نیز کوتاه کند؛ اما اگر برای زن ننگ است که مویش کوتاه یا تراشیده شود، پس پوشیده باشد.</p><p><strong>۱۹</strong> زیرا لازم است در میان شما فرقه‌ها نیز باشد تا کسانی که مورد تأییدند در میان شما آشکار شوند.</p>',
      en:'<p><strong>6</strong> For if the woman be not covered, let her also be shorn: but if it be a shame for a woman to be shorn or shaven, let her be covered.</p><p><strong>19</strong> For there must be also heresies among you, that they which are approved may be made manifest among you.</p>',
      hr:'<p><strong>6</strong> Jer ako se žena ne pokriva, neka se i ošiša; ali ako je ženi sramota biti ošišana ili obrijana, neka se pokriva.</p><p><strong>19</strong> Jer treba da među vama bude i podjela, da se očituju oni koji su provjereni.</p>'
    },
    'gal_3_13_14_29':{
      fa:'<p><strong>۱۳</strong> مسیح ما را از لعنت شریعت فدیه کرد، چون برای ما لعنت شد؛ زیرا نوشته شده است: ملعون است هر که بر دار آویخته شود.</p><p><strong>۱۴</strong> تا برکت ابراهیم در مسیح عیسی به امت‌ها برسد، تا وعده روح را به‌وسیله ایمان دریافت کنیم.</p><p><strong>۲۹</strong> و اگر شما از آنِ مسیح هستید، پس نسل ابراهیم و وارثان بر حسب وعده‌اید.</p>',
      en:'<p><strong>13</strong> Christ hath redeemed us from the curse of the law, being made a curse for us: for it is written, Cursed is every one that hangeth on a tree:</p><p><strong>14</strong> That the blessing of Abraham might come on the Gentiles through Jesus Christ; that we might receive the promise of the Spirit through faith.</p><p><strong>29</strong> And if ye be Christ’s, then are ye Abraham’s seed, and heirs according to the promise.</p>',
      hr:'<p><strong>13</strong> Krist nas je otkupio od prokletstva Zakona, postavši za nas prokletstvom; jer je pisano: Proklet je svaki koji visi na drvetu.</p><p><strong>14</strong> Da bi blagoslov Abrahamov došao na pogane u Kristu Isusu, da po vjeri primimo obećanje Duha.</p><p><strong>29</strong> A ako ste Kristovi, onda ste Abrahamovo sjeme i baštinici po obećanju.</p>'
    }
  };

  function manualKey(raw){
    const s=nref(raw);
    if(hasAny(s,BOOKS.cor2) && s.includes('5') && (s.includes('17') || s.includes('18'))) return '2co_5_17_18';
    if(hasAny(s,BOOKS.john) && s.includes('14') && (s.includes('17') || s.includes('26'))) return 'john_14_17_26';
    if(hasAny(s,BOOKS.cor1) && s.includes('2') && (s.includes('14') || s.includes('15'))) return '1co_2_14_15';
    if(hasAny(s,BOOKS.cor1) && s.includes('11') && (s.includes('6') || s.includes('19'))) return '1co_11_6_19';
    if(hasAny(s,BOOKS.gal) && s.includes('3') && (s.includes('13') || s.includes('14') || s.includes('29'))) return 'gal_3_13_14_29';
    return '';
  }

  function localizedRef(raw){
    const s=nref(raw); const L=lang();
    if(hasAny(s,BOOKS.cor2) && s.includes('5')) return L==='fa'?'۲ قرنتیان ۵:۱۷-۱۸':L==='hr'?'2. Korinćanima 5:17-18':'2 Corinthians 5:17-18';
    if(hasAny(s,BOOKS.john) && s.includes('14')) return L==='fa'?'یوحنا ۱۴:۱۷، ۲۶':L==='hr'?'Ivan 14:17, 26':'John 14:17, 26';
    if(hasAny(s,BOOKS.cor1) && s.includes('2')) return L==='fa'?'۱ قرنتیان ۲:۱۴-۱۵':L==='hr'?'1. Korinćanima 2:14-15':'1 Corinthians 2:14-15';
    if(hasAny(s,BOOKS.cor1) && s.includes('11')) return L==='fa'?'۱ قرنتیان ۱۱:۶، ۱۹':L==='hr'?'1. Korinćanima 11:6, 19':'1 Corinthians 11:6, 19';
    if(hasAny(s,BOOKS.gal) && s.includes('3')) return L==='fa'?'غلاطیان ۳:۱۳-۱۴، ۲۹':L==='hr'?'Galaćanima 3:13-14, 29':'Galatians 3:13-14, 29';
    return String(raw||'');
  }

  function fillManual(btn){
    const raw=btn.getAttribute('data-raw-ref') || btn.getAttribute('data-school-ref') || btn.textContent || '';
    const key=manualKey(raw);
    if(!key) return;
    const L=lang();
    const card=btn.closest('details.school-card,.school-card,#adminSchoolArea,#school') || document;
    let out=card.querySelector('.v6311-ref-output,.school-ref-output');
    if(!out){
      out=document.createElement('div'); out.className='v6311-ref-output';
      btn.closest('.v6311-ref-list,.school-key-refs')?.insertAdjacentElement('afterend',out);
    }
    if(!out) return;
    out.style.display='block';
    out.innerHTML='<div class="school-card" style="margin-top:10px"><h4>'+esc(localizedRef(raw))+'</h4><p class="school-muted">'+esc(labels[L].verseTitle)+'</p><div>'+VERSES[key][L]+'</div></div>';
  }

  function patchAfterClick(e){
    const btn=e.target.closest && e.target.closest('#school .v6311-ref-btn,#school [data-school-ref],#adminSchoolArea .v6311-ref-btn,#adminSchoolArea [data-school-ref]');
    if(!btn) return;
    setTimeout(()=>fillManual(btn),90);
    setTimeout(()=>fillManual(btn),260);
  }

  function removeVolumeControls(){
    document.querySelectorAll('#school [data-v6311-volume], #adminSchoolArea [data-v6311-volume], .v6312-volume').forEach(input=>{
      const label=input.closest('label');
      if(label) label.remove(); else input.remove();
    });
    document.querySelectorAll('#school .v6312-ios-note,#adminSchoolArea .v6312-ios-note').forEach(n=>n.remove());
    document.querySelectorAll('#school .v6311-audio-tools label,#adminSchoolArea .v6311-audio-tools label').forEach(label=>{
      const txt=(label.textContent||'').trim();
      if(/ولوم|volume|glasno|glasnoća/i.test(txt)) label.remove();
      if(/سرعت|speed|brzina/i.test(txt)){
        const L=lang();
        label.childNodes.forEach(n=>{ if(n.nodeType===3) n.textContent=labels[L].speed+' '; });
      }
    });
  }

  function localizeManualButtons(){
    document.querySelectorAll('#school .v6311-ref-btn,#adminSchoolArea .v6311-ref-btn,#school [data-school-ref],#adminSchoolArea [data-school-ref]').forEach(btn=>{
      const raw=btn.getAttribute('data-raw-ref') || btn.getAttribute('data-school-ref') || btn.textContent || '';
      if(manualKey(raw)){
        if(!btn.getAttribute('data-raw-ref')) btn.setAttribute('data-raw-ref',raw.trim());
        btn.textContent=localizedRef(raw);
      }
    });
  }

  function addStyle(){
    if(document.getElementById('v6313-style')) return;
    const st=document.createElement('style'); st.id='v6313-style';
    st.textContent=`
      #school .v6311-audio-tools,#adminSchoolArea .v6311-audio-tools{gap:8px!important}
      #school .v6311-audio-tools label,#adminSchoolArea .v6311-audio-tools label{margin:0!important}
      #school .v6311-ref-output .school-card,#adminSchoolArea .v6311-ref-output .school-card{background:#fff!important;border:1px solid #dbe6ff!important;border-radius:16px!important;padding:12px!important}
    `;
    document.head.appendChild(st);
  }

  function apply(){addStyle(); removeVolumeControls(); localizeManualButtons();}
  document.addEventListener('click',patchAfterClick,true);
  document.addEventListener('DOMContentLoaded',apply);
  const mo=new MutationObserver(()=>apply());
  mo.observe(document.documentElement,{childList:true,subtree:true});
  window.OMIDNO7_V6313='loaded';
})();
