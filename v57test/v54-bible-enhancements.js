(function(){
  'use strict';
  const V54_TERMS = {
    'GEN.1.1':[{
      term:{fa:'خدا / الوهیم',en:'God / Elohim',hr:'Bog / Elohim'}, original:'אֱלֹהִים / Elohim', pronunciation:{fa:'اِلوهیم',en:'Elohim',hr:'Elohim'}, meaning:{fa:'نام عبری خدا در پیدایش ۱:۱؛ بر عظمت، قدرت و خالق بودن خدا تأکید دارد.',en:'The Hebrew name for God in Genesis 1:1; it emphasizes God’s majesty, power, and role as Creator.',hr:'Hebrejsko ime za Boga u Postanku 1:1; naglašava Božje veličanstvo, silu i Stvoriteljsko djelo.'}
    },{
      term:{fa:'آفرید',en:'created',hr:'stvori'}, original:'בָּרָא / bara', pronunciation:{fa:'بارا',en:'bara',hr:'bara'}, meaning:{fa:'فعلی که برای عمل آفریننده خدا به کار می‌رود؛ تأکید بر پدید آوردن و نظم‌بخشیدن به خلقت دارد.',en:'A verb used for God’s creative action; it emphasizes bringing forth and ordering creation.',hr:'Glagol za Božje stvaralačko djelo; naglašava stvaranje i uređivanje stvorenja.'}
    }],
    'GEN.1.2':[{
      term:{fa:'روح خدا',en:'Spirit of God',hr:'Duh Božji'}, original:'רוּחַ אֱלֹהִים / ruach Elohim', pronunciation:{fa:'روآخ اِلوهیم',en:'ruach Elohim',hr:'ruach Elohim'}, meaning:{fa:'روح، نفس یا باد خدا؛ حضور فعال خدا که در آفرینش حرکت می‌کند.',en:'Spirit, breath, or wind of God; God’s active presence moving in creation.',hr:'Duh, dah ili vjetar Božji; Božja djelatna prisutnost u stvaranju.'}
    }],
    'EXO.3.14':[{
      term:{fa:'هستم آن که هستم',en:'I AM WHO I AM',hr:'JA JESAM KOJI JESAM'}, original:'אֶהְיֶה אֲשֶׁר אֶהְיֶה / ehyeh asher ehyeh', pronunciation:{fa:'اِهیه اَشِر اِهیه',en:'ehyeh asher ehyeh',hr:'ehyeh asher ehyeh'}, meaning:{fa:'اعلان وجود ازلی، مستقل و عهدی خدا؛ خدا خود را به عنوان کسی که هست و وفادار می‌ماند آشکار می‌کند.',en:'A declaration of God’s eternal, self-existing, covenantal being; God reveals Himself as the One who is and remains faithful.',hr:'Objava Božjeg vječnog, samopostojećeg i saveznog bića; Bog se otkriva kao Onaj koji jest i ostaje vjeran.'}
    }],
    'DEU.6.4':[{
      term:{fa:'بشنو',en:'hear',hr:'čuj'}, original:'שְׁמַע / shema', pronunciation:{fa:'شِما',en:'shema',hr:'shema'}, meaning:{fa:'شنیدن همراه با توجه و اطاعت؛ فقط شنیدن صوت نیست، بلکه پاسخ دادن به کلام خداست.',en:'Hearing with attention and obedience; not merely hearing sound, but responding to God’s word.',hr:'Slušanje s pažnjom i poslušnošću; ne samo čuti zvuk, nego odgovoriti na Božju riječ.'}
    }],
    'PSA.23.1':[{
      term:{fa:'شبان من',en:'my shepherd',hr:'moj pastir'}, original:'רֹעִי / ro‘i', pronunciation:{fa:'روعی',en:'ro‘i',hr:'ro‘i'}, meaning:{fa:'تصویر مراقبت، هدایت، تغذیه و حفاظت خدا از قوم خود.',en:'An image of God’s care, guidance, provision, and protection for His people.',hr:'Slika Božje brige, vodstva, opskrbe i zaštite za Njegov narod.'}
    }],
    'ISA.7.14':[{
      term:{fa:'عمانوئیل',en:'Immanuel',hr:'Emanuel'}, original:'עִמָּנוּ אֵל / immanu el', pronunciation:{fa:'عیمانو اِل',en:'immanu el',hr:'immanu el'}, meaning:{fa:'یعنی «خدا با ما»؛ نشانه حضور نجات‌بخش خدا در میان قوم خود.',en:'Means “God with us”; a sign of God’s saving presence among His people.',hr:'Znači “Bog s nama”; znak Božje spasonosne prisutnosti među Njegovim narodom.'}
    }],
    'MAT.4.4':[{
      term:{fa:'کلام',en:'word',hr:'riječ'}, original:'ῥῆμα / rhēma', pronunciation:{fa:'رِما',en:'rhēma',hr:'rhēma'}, meaning:{fa:'کلام بیان‌شده و زنده خدا که انسان با آن زندگی می‌کند و در برابر وسوسه می‌ایستد.',en:'The spoken, living word of God by which a person lives and stands against temptation.',hr:'Izgovorena, živa Božja riječ po kojoj čovjek živi i stoji protiv kušnje.'}
    }],
    'MAT.6.16':[{
      term:{fa:'روزه می‌گیرید',en:'you fast',hr:'postite'}, original:'νηστεύητε / nēsteuēte', pronunciation:{fa:'نِستِوئِته',en:'nēsteuēte',hr:'nēsteuēte'}, meaning:{fa:'پرهیز از خوراک برای تمرکز روحانی؛ در تعلیم عیسی نباید نمایشی یا ریاکارانه باشد.',en:'Abstaining from food for spiritual focus; in Jesus’ teaching it must not be theatrical or hypocritical.',hr:'Uzdržavanje od hrane radi duhovnog fokusa; prema Isusovu učenju ne smije biti gluma ili licemjerje.'}
    }],
    'MAT.6.33':[{
      term:{fa:'پادشاهی',en:'kingdom',hr:'kraljevstvo'}, original:'βασιλεία / basileia', pronunciation:{fa:'باسیلیا',en:'basileia',hr:'basileia'}, meaning:{fa:'حکومت و فرمانروایی خدا؛ زندگی ایماندار باید اولویت خود را به سلطنت و عدالت خدا بدهد.',en:'God’s reign and rule; the believer’s life must give first priority to God’s kingdom and righteousness.',hr:'Božja vladavina i kraljevanje; vjernikov život najprije traži Božje kraljevstvo i pravednost.'}
    }],
    'MAT.28.19':[{
      term:{fa:'شاگرد سازید',en:'make disciples',hr:'učinite učenicima'}, original:'μαθητεύσατε / mathēteusate', pronunciation:{fa:'مَتِیتِوساته',en:'mathēteusate',hr:'mathēteusate'}, meaning:{fa:'فرمان برای ساختن شاگردان، نه فقط تصمیم‌گیرندگان؛ شامل تعلیم، پیروی و رشد در راه مسیح است.',en:'A command to make disciples, not merely converts; it includes teaching, following, and growth in Christ’s way.',hr:'Zapovijed da se stvaraju učenici, ne samo obraćenici; uključuje poučavanje, slijeđenje i rast u Kristovu putu.'}
    }],
    'JHN.1.14':[{
      term:{fa:'جسم گردید',en:'became flesh',hr:'postade tijelom'}, original:'σὰρξ ἐγένετο / sarx egeneto', pronunciation:{fa:'سارکس اِگِنِتو',en:'sarx egeneto',hr:'sarx egeneto'}, meaning:{fa:'پسر ازلی خدا انسان شد؛ نه ظاهر انسانی، بلکه مشارکت واقعی در انسانیت.',en:'The eternal Son of God became human; not a mere appearance, but true participation in humanity.',hr:'Vječni Sin Božji postao je čovjek; ne samo privid, nego stvarno sudjelovanje u čovještvu.'}
    }],
    'JHN.3.3':[{
      term:{fa:'از سر نو مولود شود',en:'born again/from above',hr:'rođen nanovo/odozgor'}, original:'γεννηθῇ ἄνωθεν / gennēthē anōthen', pronunciation:{fa:'گِنِتِه آنوتِن',en:'gennēthē anōthen',hr:'gennēthē anōthen'}, meaning:{fa:'تولد روحانی از بالا؛ شروع حیات تازه از خدا، نه اصلاح ظاهری انسان.',en:'Spiritual birth from above; the beginning of new life from God, not mere outward reform.',hr:'Duhovno rođenje odozgor; početak novog života od Boga, ne samo vanjska reforma.'}
    }],
    'ACT.1.8':[{
      term:{fa:'قدرت',en:'power',hr:'sila'}, original:'δύναμις / dynamis', pronunciation:{fa:'دونامیس',en:'dynamis',hr:'dynamis'}, meaning:{fa:'توانایی الهی برای شهادت، خدمت و انجام مأموریت روح‌القدس.',en:'Divine ability for witness, ministry, and the mission of the Holy Spirit.',hr:'Božanska sposobnost za svjedočenje, službu i poslanje Duha Svetoga.'}
    }],
    'ROM.1.16':[{
      term:{fa:'انجیل',en:'gospel',hr:'evanđelje'}, original:'εὐαγγέλιον / euangelion', pronunciation:{fa:'اِوانگِلیون',en:'euangelion',hr:'euangelion'}, meaning:{fa:'خبر خوش نجات خدا در مسیح؛ قدرت خدا برای نجات هر که ایمان آورد.',en:'The good news of God’s salvation in Christ; God’s power for salvation to everyone who believes.',hr:'Radosna vijest Božjeg spasenja u Kristu; Božja sila na spasenje svakome tko vjeruje.'}
    }],
    '2CO.5.17':[{
      term:{fa:'خلقت تازه',en:'new creation',hr:'novo stvorenje'}, original:'καινὴ κτίσις / kainē ktisis', pronunciation:{fa:'کاینه کتیسیس',en:'kainē ktisis',hr:'kainē ktisis'}, meaning:{fa:'هویت تازه در مسیح؛ تولد تازه فقط تغییر رفتار نیست، بلکه واقعیت خلقت نو است.',en:'A new identity in Christ; new birth is not merely changed behavior, but the reality of a new creation.',hr:'Novi identitet u Kristu; novo rođenje nije samo promjena ponašanja, nego stvarnost novog stvorenja.'}
    }],
    'GAL.5.16':[{
      term:{fa:'روح',en:'Spirit',hr:'Duh'}, original:'πνεῦμα / pneuma', pronunciation:{fa:'پنِوما',en:'pneuma',hr:'pneuma'}, meaning:{fa:'در این متن به رهبری و تمایل روح خدا در مقابل تمایلات جسم اشاره دارد.',en:'In this context it points to the Spirit’s leading and desire in contrast to the desires of the flesh.',hr:'U ovom kontekstu označava vodstvo i želju Duha nasuprot željama tijela.'}
    },{
      term:{fa:'جسم',en:'flesh',hr:'tijelo'}, original:'σάρξ / sarx', pronunciation:{fa:'سارکس',en:'sarx',hr:'sarx'}, meaning:{fa:'طبیعت انسانی وقتی مستقل از رهبری روح خدا عمل می‌کند؛ شامل تمایلات و فکر جسمانی است.',en:'Human nature acting independently from the Spirit’s leading; includes bodily desires and fleshly thinking.',hr:'Ljudska narav koja djeluje neovisno o vodstvu Duha; uključuje tjelesne želje i tjelesno razmišljanje.'}
    }],
    'EPH.2.8':[{
      term:{fa:'فیض',en:'grace',hr:'milost'}, original:'χάρις / charis', pronunciation:{fa:'خاریس',en:'charis',hr:'charis'}, meaning:{fa:'لطف و عطای بی‌استحقاق خدا؛ سرچشمه نجات، قوت و جایگاه تازه در مسیح.',en:'God’s undeserved favor and gift; the source of salvation, strength, and new standing in Christ.',hr:'Nezaslužena Božja naklonost i dar; izvor spasenja, snage i novog položaja u Kristu.'}
    }],
    'PHP.4.7':[{
      term:{fa:'سلامتی خدا',en:'peace of God',hr:'mir Božji'}, original:'εἰρήνη τοῦ Θεοῦ / eirēnē tou Theou', pronunciation:{fa:'ایرِینه تو تِئو',en:'eirēnē tou Theou',hr:'eirēnē tou Theou'}, meaning:{fa:'آرامش و سلامت الهی که فکر و دل را در مسیح نگاه می‌دارد.',en:'Divine peace and wholeness that guards the mind and heart in Christ.',hr:'Božanski mir i cjelovitost koji čuva um i srce u Kristu.'}
    }],
    'COL.1.13':[{
      term:{fa:'قدرت ظلمت',en:'power of darkness',hr:'vlast tame'}, original:'ἐξουσία τοῦ σκότους / exousia tou skotous', pronunciation:{fa:'اِکسوسیا تو سکوتوس',en:'exousia tou skotous',hr:'exousia tou skotous'}, meaning:{fa:'قلمرو سلطه تاریکی؛ نجات یعنی انتقال از این قلمرو به پادشاهی پسر محبت خدا.',en:'The realm of darkness’ authority; salvation is transfer from this realm into the kingdom of God’s beloved Son.',hr:'Područje vlasti tame; spasenje je prijenos iz tog područja u kraljevstvo Sina Božje ljubavi.'}
    }],
    'JAS.1.22':[{
      term:{fa:'عمل‌کنندگان',en:'doers',hr:'izvršitelji'}, original:'ποιηταὶ / poiētai', pronunciation:{fa:'پویِتای',en:'poiētai',hr:'poiētai'}, meaning:{fa:'کسانی که کلام را به عمل تبدیل می‌کنند؛ شنیدن بدون عمل خودفریبی است.',en:'Those who turn the word into action; hearing without doing is self-deception.',hr:'Oni koji riječ pretvaraju u djelo; slušanje bez činjenja je samoobmana.'}
    }],
    '1PE.2.9':[{
      term:{fa:'قوم برگزیده',en:'chosen generation',hr:'izabrani rod'}, original:'γένος ἐκλεκτόν / genos eklekton', pronunciation:{fa:'گِنوس اِکلِکتون',en:'genos eklekton',hr:'genos eklekton'}, meaning:{fa:'هویت جمعی ایمانداران در مسیح؛ قوم خدا برای اعلام فضایل او فراخوانده شده‌اند.',en:'The corporate identity of believers in Christ; God’s people are called to proclaim His excellencies.',hr:'Zajednički identitet vjernika u Kristu; Božji narod pozvan je naviještati Njegove vrline.'}
    }],
    'REV.21.2':[{
      term:{fa:'اورشلیم جدید',en:'New Jerusalem',hr:'Novi Jeruzalem'}, original:'Ἰερουσαλὴμ καινὴ / Ierousalēm kainē', pronunciation:{fa:'یِروسالِم کاینه',en:'Ierousalēm kainē',hr:'Ierousalēm kainē'}, meaning:{fa:'تصویر شهر نهایی خدا؛ محل تحقق کامل حضور خدا با قوم خود.',en:'The picture of God’s final city; the complete fulfillment of God’s presence with His people.',hr:'Slika Božjeg konačnog grada; potpuno ostvarenje Božje prisutnosti s Njegovim narodom.'}
    }]
  };

  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function loc(obj){ try { return (obj && (obj[currentLang] || obj.fa || obj.en || obj.hr)) || ''; } catch(e){ return (obj&& (obj.fa||obj.en||obj.hr)) || ''; } }
  function mergeTerms(){
    const data=window.bibleReaderData; if(!data) return;
    data.keyTerms=data.keyTerms||{};
    Object.keys(V54_TERMS).forEach(ref=>{
      const existing=data.keyTerms[ref]||[];
      const merged=[...existing];
      V54_TERMS[ref].forEach(nt=>{
        const sig=(nt.original||'')+'|'+loc(nt.term);
        if(!merged.some(x=>((x.original||'')+'|'+loc(x.term))===sig)) merged.push(nt);
      });
      data.keyTerms[ref]=merged;
    });
  }
  function labelText(fa,en,hr){ try{ return currentLang==='fa'?fa:(currentLang==='hr'?hr:en); }catch(e){return fa;} }
  function refLabel(ref){
    try{
      const [bookId,ch,v]=ref.split('.');
      const book=(window.bibleReaderData.books||[]).find(b=>b.id===bookId);
      const name=book ? (book[currentLang]||book.fa||book.en||book.id) : bookId;
      const cc=currentLang==='fa' && typeof toFaDigits==='function'?toFaDigits(ch):ch;
      const vv=currentLang==='fa' && typeof toFaDigits==='function'?toFaDigits(v):v;
      return `${name} ${cc}:${vv}`;
    }catch(e){ return ref; }
  }
  function allTerms(){
    mergeTerms();
    const data=window.bibleReaderData||{};
    const arr=[];
    Object.keys(data.keyTerms||{}).forEach(ref=>{
      (data.keyTerms[ref]||[]).forEach(term=>arr.push({ref,term}));
    });
    arr.sort((a,b)=>refLabel(a.ref).localeCompare(refLabel(b.ref),'fa'));
    return arr;
  }

  function installStyles(){
    if(document.getElementById('v54-bible-style')) return;
    const style=document.createElement('style');
    style.id='v54-bible-style';
    style.textContent=`
      .bible-chapter-card{line-height:2.25;font-size:1.04rem;}
      .bible-verses{display:block;text-align:justify;}
      .bookish-verse{display:inline; margin:0; padding:0; border:0; background:transparent;}
      .bookish-verse .bible-verse-inline{display:inline; border:0; background:transparent; padding:0 .08rem; margin:0; color:inherit; font:inherit; text-align:inherit; cursor:pointer; line-height:inherit;}
      .bookish-verse .bible-verse-inline:hover .verse-text{text-decoration:underline; text-decoration-thickness:.08em;}
      .bookish-verse .verse-number{font-size:.68em; vertical-align:super; color:#8a6b22; font-weight:800; margin-inline-end:.18rem;}
      .bookish-verse.hl-yellow .verse-text{background:#fff2a8; border-radius:.25rem; padding:0 .1rem;}
      .bookish-verse.hl-green .verse-text{background:#dff5d7; border-radius:.25rem; padding:0 .1rem;}
      .bookish-verse.hl-blue .verse-text{background:#dcebff; border-radius:.25rem; padding:0 .1rem;}
      .bookish-verse.hl-pink .verse-text{background:#ffe1ef; border-radius:.25rem; padding:0 .1rem;}
      .bookish-verse.verse-bold .verse-text{font-weight:800;}
      .bookish-verse.verse-read .verse-number{color:#1d7b43;}
      .bookish-verse.verse-active .verse-text{outline:2px solid rgba(20,111,73,.25); border-radius:.25rem;}
      .bookish-tools{display:block; clear:both; margin:1rem 0; line-height:1.55;}
      .bookish-note{display:block; clear:both; margin:.4rem 0 .8rem; padding:.55rem .75rem; background:#f7f3e8; border-radius:.8rem; font-size:.92rem;}
      .original-words-card{margin-top:1rem; border:1px solid rgba(20,111,73,.16); background:linear-gradient(135deg,#ffffff,#f4fbf7);}
      .original-words-library .word-search{width:100%; padding:.85rem 1rem; border:1px solid #d8ded8; border-radius:1rem; margin:.8rem 0 1rem; font-size:1rem;}
      .word-term-row{display:block; width:100%; text-align:start; background:#fff; border:1px solid rgba(0,0,0,.07); border-radius:1rem; padding:.8rem .9rem; margin:.55rem 0; cursor:pointer;}
      .word-term-row strong{display:block; color:#16633f;}
      .word-term-row small{display:block; color:#666; margin-top:.25rem;}
      .word-term-row .word-original{font-family:Georgia,serif; direction:ltr; unicode-bidi:isolate;}
      .library-back-row{display:flex; gap:.6rem; flex-wrap:wrap; align-items:center; justify-content:space-between;}
    `;
    document.head.appendChild(style);
  }

  function renderBookishVerse(bookId, chapter, verseObj){
    const st=getBibleState(bookId,chapter,verseObj.v);
    const terms=getVerseKeyTerms(bookId,chapter,verseObj.v);
    const ref=`${bookId}.${chapter}.${verseObj.v}`;
    const isActive=activeBibleVerseRef===ref;
    const cls=['bible-verse','clean-verse','bookish-verse'];
    if(st.highlight) cls.push('hl-'+st.highlight);
    if(st.bold) cls.push('verse-bold');
    if(st.read) cls.push('verse-read');
    if(isActive) cls.push('verse-active');
    const num=currentLang==='fa'?toFaDigits(verseObj.v):verseObj.v;
    const status=`${st.bookmark?'★':''}${st.note?' ✎':''}${st.read?' ✓':''}`;
    return `<span class="${cls.join(' ')}" data-bible-verse="${verseObj.v}"><button type="button" class="bible-verse-inline" data-verse-toggle="1" data-book="${bookId}" data-chapter="${chapter}" data-verse="${verseObj.v}"><sup class="verse-number">${num}</sup><span class="verse-text">${verseObj.t}</span><span class="verse-status">${status}</span></button></span>${isActive?`<div class="bookish-tools">${renderVerseTools(bookId,chapter,verseObj,st,terms)}</div>`:''}${st.note?`<div class="bookish-note">${escapeHtml(st.note)}</div>`:''} `;
  }

  function openOriginalWordsLibrary(){
    mergeTerms();
    const root=document.getElementById('bibleReaderContent'); if(!root) return;
    const terms=allTerms();
    const title=labelText('فرهنگ کلمات کلیدی کتاب‌مقدس','Bible Original Words Library','Rječnik ključnih biblijskih riječi');
    const desc=labelText('در این بخش، بعضی از واژه‌های مهم عبری، یونانی و آرامی همراه با تلفظ و توضیح کوتاه قرار می‌گیرد. این فهرست مرحله‌به‌مرحله کامل‌تر خواهد شد.','This section gathers important Hebrew, Greek, and Aramaic words with pronunciation and short explanations. The list will be expanded step by step.','Ovaj odjeljak sadrži važne hebrejske, grčke i aramejske riječi s izgovorom i kratkim objašnjenjima. Popis će se postupno proširivati.');
    root.innerHTML=`<div class="section-title"><h2>${title}</h2></div><div class="card original-words-library"><div class="library-back-row"><button class="btn ghost" onclick="setBibleReaderView('home')">← ${t('back')}</button><span class="small">${terms.length} ${labelText('واژه','words','riječi')}</span></div><p>${desc}</p><input id="wordSearchV54" class="word-search" type="search" placeholder="${labelText('جستجو در کلمه، تلفظ، معنا یا آدرس آیه...','Search word, pronunciation, meaning, or reference...','Pretraži riječ, izgovor, značenje ili referencu...')}"><div id="wordListV54"></div></div>`;
    function paint(q){
      q=String(q||'').trim().toLowerCase();
      const filtered=terms.filter(x=>{
        const hay=[refLabel(x.ref), loc(x.term.term), x.term.original, loc(x.term.pronunciation), loc(x.term.meaning)].join(' ').toLowerCase();
        return !q || hay.includes(q);
      }).slice(0,250);
      document.getElementById('wordListV54').innerHTML=filtered.length?filtered.map(x=>`<button class="word-term-row" data-ref="${x.ref}"><strong>${escapeHtml(loc(x.term.term))} — <span class="word-original">${escapeHtml(x.term.original)}</span></strong><small>${escapeHtml(refLabel(x.ref))} • ${escapeHtml(loc(x.term.pronunciation))}</small><span>${escapeHtml(loc(x.term.meaning))}</span></button>`).join(''):`<p class="empty-note">${t('noResults')}</p>`;
      document.querySelectorAll('.word-term-row[data-ref]').forEach(btn=>btn.onclick=()=>{
        const [book,ch,v]=btn.dataset.ref.split('.');
        openPlanChapter(book,ch);
        setTimeout(()=>{ try{ toggleVerseTools(book,parseInt(ch,10),parseInt(v,10)); }catch(e){} },120);
      });
    }
    paint('');
    document.getElementById('wordSearchV54')?.addEventListener('input',e=>paint(e.target.value));
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function enhanceBibleHome(){
    const root=document.getElementById('bibleReaderContent'); if(!root || document.getElementById('openOriginalWordsV54')) return;
    const grid=root.querySelector('.bible-reading-plans .bible-section-grid') || root.querySelector('.bible-section-grid');
    const card=document.createElement('div');
    card.className='card original-words-card';
    card.innerHTML=`<h3>${labelText('کلمات کلیدی عبری، یونانی و آرامی','Hebrew, Greek & Aramaic Key Words','Hebrejske, grčke i aramejske ključne riječi')}</h3><p>${labelText('یک فرهنگ کوچک برای فهم بهتر واژه‌های مهم کتاب‌مقدس. این بخش در نسخه‌های بعدی کامل‌تر می‌شود.','A small library for understanding important biblical words. This section will grow in future versions.','Mali rječnik za bolje razumijevanje važnih biblijskih riječi. Ovaj će se odjeljak dalje proširivati.')}</p><button id="openOriginalWordsV54" class="btn primary" type="button">${labelText('باز کردن فرهنگ کلمات','Open Word Library','Otvori rječnik riječi')}</button>`;
    const plans=root.querySelector('.bible-reading-plans');
    if(plans) plans.insertAdjacentElement('afterend',card); else root.appendChild(card);
    document.getElementById('openOriginalWordsV54').onclick=openOriginalWordsLibrary;
  }

  function patchRenderer(){
    if(window.__v54BiblePatched) return; window.__v54BiblePatched=true;
    mergeTerms(); installStyles();
    try{ renderBibleVerse = renderBookishVerse; window.renderBibleVerse=renderBookishVerse; }catch(e){ console.warn('V54 verse patch failed', e); }
    try{
      const oldRender=renderBibleReader;
      renderBibleReader=function(){ oldRender(); setTimeout(()=>{ mergeTerms(); installStyles(); try{ if(typeof bibleReaderView!=='undefined' && bibleReaderView==='home') enhanceBibleHome(); }catch(e){} },0); };
      window.renderBibleReader=renderBibleReader;
    }catch(e){ console.warn('V54 reader patch failed', e); }
    window.openOriginalWordsLibrary=openOriginalWordsLibrary;
  }

  document.addEventListener('DOMContentLoaded',()=>{
    patchRenderer();
    setTimeout(()=>{ mergeTerms(); installStyles(); try{ if(typeof renderBibleReader==='function') renderBibleReader(); }catch(e){} },200);
  });
})();
