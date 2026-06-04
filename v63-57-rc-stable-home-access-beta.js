
/* Omideno7 V63.57 — RC Stable Home + Access Beta
   Consolidated final beta UI layer:
   - Stops competing welcome/newbirth/meeting scripts by replacing their effects.
   - Always opens on Home.
   - Stable welcome card, daily message, home icons, medals.
   - Full New Birth i18n from V63.56.
   - Public meeting screen never exposes link/access/security code.
   - Access code is shown only when an approved record is found for this device/email.
*/
(function(){
'use strict';

var VERSION='V63.57 RC Stable Home + Access';
var DATA={"fa": {"title": "تولد تازه و نجات در مسیح", "subtitle": "این بخش برای کسانی است که می‌خواهند نجات را بشناسند، دعای نجات را با ایمان بخوانند، درباره زندگی مسیحی یاد بگیرند، ثبت‌نام کنند و تعالیم تولد تازه را ببینند.", "registerText": "باز کردن فرم ثبت‌نام کلیسا", "sections": [{"id": "what", "title": "نجات چیست؟", "content": ["نجات یکی از مهم‌ترین حقیقت‌های کلام خداست. نجات یعنی انسان از گناه، مرگ روحانی، محکومیت و جدایی از خدا آزاد شود و به زندگی تازه در مسیح وارد گردد. نجات فقط یک تغییر مذهبی نیست؛ نجات تولد تازه، انتقال از تاریکی به نور، و ورود به رابطه زنده با خدا از طریق عیسی مسیح است.", "کتاب‌مقدس می‌گوید: «زیرا خدا جهان را این‌قدر محبت نمود که پسر یگانه خود را داد تا هر که به او ایمان آورد هلاک نگردد بلکه حیات جاودانی یابد.» — یوحنا ۳:۱۶", "این آیه نشان می‌دهد که نجات از محبت خدا آغاز شد. انسان با قدرت، اعمال نیک، شریعت، مذهب یا تلاش شخصی نمی‌تواند خود را نجات دهد. نجات هدیه خداست، نه پاداش کارهای انسان.", "افسسیان ۲:۸-۹ می‌گوید: «زیرا که محض فیض نجات یافته‌اید، به وسیله ایمان؛ و این از شما نیست بلکه بخشش خداست؛ و نه از اعمال، تا هیچ‌کس فخر نکند.» پس نجات بر پایه فیض خدا و ایمان انسان به عیسی مسیح است.", "چرا انسان به نجات نیاز دارد؟ از ابتدا، خدا انسان را برای مشارکت، محبت و زندگی در حضور خود آفرید. اما گناه باعث جدایی انسان از خدا شد. گناه فقط انجام کارهای اشتباه نیست؛ گناه یک طبیعت سقوط‌کرده است که انسان را از حیات خدا جدا می‌کند.", "رومیان ۳:۲۳ می‌گوید: «زیرا همه گناه کرده‌اند و از جلال خدا قاصر می‌باشند.» یعنی همه انسان‌ها، بدون استثنا، به نجات نیاز دارند. هیچ انسانی با اخلاق خوب، دانش، ثروت، خدمت مذهبی یا کارهای نیک نمی‌تواند خودش را عادل کند. تنها راه نجات، عیسی مسیح است.", "عیسی مسیح پسر خداست که به جهان آمد تا انسان را نجات دهد. او بدون گناه زندگی کرد، بر صلیب مرد، خون خود را برای آمرزش گناهان ما ریخت، دفن شد و در روز سوم از مردگان برخاست.", "مرگ عیسی بر صلیب فقط یک مرگ تاریخی نبود؛ او جای ما را گرفت. مجازاتی که باید بر ما می‌آمد، بر او قرار گرفت. او گناه، محکومیت و مرگ ما را بر خود گرفت تا ما حیات، عدالت و صلح با خدا را دریافت کنیم.", "نجات با ایمان به عیسی مسیح دریافت می‌شود. ایمان فقط قبول ذهنی نیست؛ ایمان یعنی اعتماد قلبی به عیسی، پذیرفتن او به عنوان خداوند، و اعتراف به اینکه خدا او را از مردگان برخیزانید.", "رومیان ۱۰:۹-۱۰ می‌گوید: «زیرا اگر به زبان خود عیسی خداوند را اعتراف کنی و در دل خود ایمان آوری که خدا او را از مردگان برخیزانید، نجات خواهی یافت.»", "نجات فقط بخشیده شدن گناهان گذشته نیست. نجات یعنی انسان از درون تازه می‌شود و حیات خدا را دریافت می‌کند. عیسی فرمود: «اگر کسی از سر نو مولود نشود، ملکوت خدا را نمی‌تواند دید.» — یوحنا ۳:۳", "تولد تازه یعنی روح انسان دوباره زنده می‌شود. وقتی شخص عیسی را می‌پذیرد، خدا او را فرزند خود می‌سازد. او دیگر فقط یک انسان عادی نیست؛ او مخلوق تازه در مسیح است.", "دوم قرنتیان ۵:۱۷ می‌گوید: «پس اگر کسی در مسیح باشد، خلقت تازه‌ای است؛ چیزهای کهنه درگذشت، اینک همه چیز تازه شده است.»", "نتیجه نجات این است که انسان با خدا صلح دارد، گناهانش آمرزیده شده است، از محکومیت آزاد شده است، حیات جاودانی دارد، فرزند خدا شده است، روح‌القدس در او ساکن می‌شود و قدرت زندگی تازه را دریافت می‌کند.", "نجات برای امروز است. لازم نیست صبر کنی تا کامل شوی. عیسی تو را همان‌طور که هستی می‌پذیرد، اما تو را همان‌طور که هستی رها نمی‌کند؛ او تو را تازه، پاک، قوی و زنده می‌سازد."]}, {"id": "prayer", "title": "دعای نجات", "intro": "اگر می‌خواهید عیسی مسیح را به عنوان خداوند و نجات‌دهنده زندگی خود بپذیرید، این دعا را با ایمان، از قلب خود و با صدای بلند بخوانید.", "content": ["خداوندا، امروز با ایمان و قلبی باز نزد تو می‌آیم.", "ایمان دارم که عیسی مسیح پسر خداست؛ او برای گناهان من بر صلیب مرد، دفن شد و در روز سوم از مردگان برخاست.", "من با قلب خود ایمان می‌آورم و با زبان خود اعتراف می‌کنم که عیسی مسیح خداوند زندگی من است.", "ای عیسی مسیح، تو را به عنوان خداوند و نجات‌دهنده خود می‌پذیرم. وارد قلب من شو، مرا ببخش، مرا پاک کن و مرا از نو متولد ساز.", "از امروز اعلام می‌کنم که نجات یافته‌ام، فرزند خدا هستم، از تاریکی به نور منتقل شده‌ام و حیات جاودانی را در مسیح دریافت کرده‌ام.", "ای روح‌القدس، در من ساکن شو، مرا تعلیم بده، مرا هدایت کن و کمک کن در ایمان، محبت، اطاعت و شناخت خداوند رشد کنم.", "در نام عیسی مسیح. آمین."]}, {"id": "life", "title": "زندگی مسیحی چیست؟", "content": ["زندگی مسیحی فقط پذیرفتن یک دین یا رفتن به کلیسا نیست؛ زندگی مسیحی یعنی آغاز یک زندگی تازه با عیسی مسیح. وقتی شخص به عیسی ایمان می‌آورد، او از درون تولد تازه پیدا می‌کند و وارد رابطه‌ای زنده با خدا می‌شود.", "ایمان به عیسی آغاز راه است، اما رشد در ایمان نیاز به توجه، تعهد و زندگی روزانه با خدا دارد. ایماندار تازه برای رشد روحانی به کلام خدا، دعا، پرستش، شنیدن تعلیم درست و حضور در جمع ایمانداران نیاز دارد.", "۱. خواندن کلام خدا: کلام خدا غذای روح انسان است. کتاب‌مقدس به ما نشان می‌دهد خدا کیست، ما در مسیح چه کسی هستیم، چگونه باید زندگی کنیم و چگونه در اراده خدا قدم برداریم.", "۲. دعا و رابطه شخصی با خدا: دعا فقط درخواست کردن از خدا نیست؛ دعا یعنی گفت‌وگو، مشارکت و رابطه با پدر آسمانی.", "۳. پرستش خداوند: پرستش یعنی احترام، محبت، تسلیم و تمرکز قلب بر خدا. پرستش فضای قلب انسان را تغییر می‌دهد و ایمان را تقویت می‌کند.", "۴. حضور در کلیسا: کلیسا فقط یک ساختمان نیست؛ کلیسا خانواده روحانی ایمانداران است. هر ایماندار نیاز دارد در یک کلیسای سالم و کتاب‌مقدسی رشد کند.", "۵. شنیدن کلام و تعلیم درست: ایمان از شنیدن کلام خدا می‌آید. تعلیم درست ما را به عیسی نزدیک‌تر می‌کند و از فریب، ترس و افکار غلط حفظ می‌کند.", "۶. رشد در ایمان و روح: ایمان مسیحی باید رشد کند. رشد روحانی یعنی شخص روزبه‌روز شبیه‌تر به مسیح شود؛ در محبت، بخشش، صبر، پاکی، حکمت، اطاعت و خدمت رشد کند.", "۷. وظیفه ایماندار نسبت به ایمان خود: هر ایماندار مسئول است که ایمان خود را مراقبت کند، رشد دهد و جدی بگیرد.", "زندگی مسیحی یک سفر زیبا با خداست؛ سفری از نجات به رشد، از ضعف به قوت، از نادانی به شناخت، و از زندگی معمولی به زندگی پر از روح خدا."]}, {"id": "register", "title": "ثبت‌نام و عضویت", "content": ["ثبت‌نام بعد از دعای نجات", "اگر دعای دریافت نجات را خواندید یا می‌خواهید درباره ایمان به عیسی مسیح بیشتر بدانید، لطفاً فرم زیر را تکمیل کنید. تیم خدمتی کلیسای امیدنو۷ با محبت با شما ارتباط خواهد گرفت، برای شما دعا خواهد کرد و شما را در مسیر رشد ایمانی و شاگردسازی راهنمایی خواهد نمود.", "متی ۲۸:۱۹–۲۰ — عیسی به ما فرمان داد که شاگرد بسازیم و مردم را تعلیم دهیم تا در راه او رشد کنند."]}, {"id": "videos", "title": "ویدیوهای تولد تازه", "content": ["برای اینکه ایمان شما از ابتدا بر پایه صحیح بنا شود، این شش تعلیم را به ترتیب ببینید. این تعالیم به شما کمک می‌کند بفهمید تولد تازه چیست، نجات در مسیح چه معنایی دارد، و چگونه باید زندگی تازه خود را در ایمان آغاز کنید."], "videosTitle": "شش قسمت تعلیم تولد تازه"}]}, "en": {"title": "New Birth & Salvation in Christ", "subtitle": "This section is for those who want to understand salvation, pray the prayer of salvation with faith, learn about the Christian life, register, and watch the New Birth teachings.", "registerText": "Open Church Registration Form", "sections": [{"id": "what", "title": "What Is Salvation?", "content": ["Salvation is one of the most important truths of God’s Word. Salvation means that a person is delivered from sin, spiritual death, condemnation, and separation from God, and is brought into new life in Christ. Salvation is not merely a religious change; it is the new birth, a transfer from darkness to light, and entrance into a living relationship with God through Jesus Christ.", "John 3:16 shows that salvation began with God’s love. A person cannot save himself by power, good works, law, religion, or personal effort. Salvation is God’s gift, not a reward for human works.", "Ephesians 2:8-9 teaches that we are saved by grace through faith, not by works, so that no one may boast. Salvation is therefore based on God’s grace and our faith in Jesus Christ.", "Mankind needs salvation because sin separated man from God. Sin is not only wrong actions; it is a fallen nature that separates man from the life of God. Romans 3:23 says that all have sinned and come short of the glory of God.", "Jesus Christ is the Son of God who came into the world to save mankind. He lived without sin, died on the cross, shed His blood for the forgiveness of our sins, was buried, and rose from the dead on the third day.", "The death of Jesus on the cross was not merely a historical death; He took our place. He took our sin, condemnation, and death so that we might receive life, righteousness, and peace with God.", "Salvation is received by faith in Jesus Christ. Faith means trusting Jesus from the heart, receiving Him as Lord, and confessing that God raised Him from the dead.", "Romans 10:9-10 says that if you confess with your mouth the Lord Jesus and believe in your heart that God raised Him from the dead, you shall be saved.", "Salvation is not only the forgiveness of past sins. Salvation means that a person is made new inwardly and receives the life of God. Jesus said that unless a man is born again, he cannot see the kingdom of God.", "The new birth means that the human spirit is made alive again. When a person receives Jesus, God makes him His child. He is no longer merely an ordinary person; he is a new creation in Christ.", "2 Corinthians 5:17 says that if anyone is in Christ, he is a new creation. This means your past is no longer your identity. In Christ, you are a new creation.", "The result of salvation is peace with God, forgiveness of sins, freedom from condemnation, eternal life, sonship, the indwelling of the Holy Spirit, and the power to live a new life.", "Salvation is for today. Jesus receives you as you are, but He does not leave you as you are; He makes you new, clean, strong, and alive."]}, {"id": "prayer", "title": "Prayer of Salvation", "intro": "If you want to receive Jesus Christ as the Lord and Savior of your life, read this prayer with faith, from your heart, and out loud.", "content": ["Lord God, today I come to You with faith and an open heart.", "I believe that Jesus Christ is the Son of God; He died on the cross for my sins, was buried, and rose from the dead on the third day.", "I believe in my heart and confess with my mouth that Jesus Christ is the Lord of my life.", "Lord Jesus, I receive You as my Lord and Savior. Come into my heart, forgive me, cleanse me, and cause me to be born again.", "From today, I declare that I am saved, I am a child of God, I have been transferred from darkness to light, and I have received eternal life in Christ.", "Holy Spirit, dwell in me, teach me, guide me, and help me grow in faith, love, obedience, and the knowledge of the Lord.", "In the name of Jesus Christ. Amen."]}, {"id": "life", "title": "What Is the Christian Life?", "content": ["The Christian life is not merely accepting a religion or attending church; it is the beginning of a new life with Jesus Christ. When a person believes in Jesus, he is born again inwardly and enters into a living relationship with God.", "Faith in Jesus is the beginning of the journey, but growth in faith requires attention, commitment, and daily life with God. A new believer needs the Word of God, prayer, worship, sound teaching, and fellowship with believers.", "1. Reading the Word of God: God’s Word is food for the human spirit. Scripture shows us who God is, who we are in Christ, how to live, and how to walk in God’s will.", "2. Prayer and personal relationship with God: Prayer is conversation, fellowship, and relationship with the heavenly Father.", "3. Worshiping the Lord: Worship is honor, love, surrender, and focusing the heart on God. Worship strengthens faith and changes the atmosphere of the heart.", "4. Being planted in the church: The church is the spiritual family of believers. Every believer needs to grow in a healthy, living, biblical church.", "5. Hearing the Word and sound teaching: Faith comes by hearing the Word of God. Sound teaching brings us closer to Jesus and protects us from deception, fear, and wrong thinking.", "6. Growing in faith and spirit: Christian faith must grow. Spiritual growth means becoming more like Christ in love, forgiveness, patience, purity, wisdom, obedience, and service.", "7. The believer’s responsibility: Every believer is responsible to guard, grow, and take his faith seriously. Salvation is God’s gift, but spiritual growth requires our cooperation with the Holy Spirit.", "The Christian life is a beautiful journey with God: from salvation to growth, from weakness to strength, from ignorance to knowledge, and from ordinary life to a life filled with the Spirit of God."]}, {"id": "register", "title": "Registration & Membership", "content": ["Registration after the prayer of salvation", "If you prayed to receive salvation or want to know more about faith in Jesus Christ, please complete the form below. The ministry team of OmideNo7 Church will contact you with love, pray for you, and guide you in spiritual growth and discipleship.", "Matthew 28:19–20 — Jesus commanded us to make disciples and teach people so they may grow in His way."]}, {"id": "videos", "title": "New Birth Videos", "content": ["To build your faith on the right foundation from the beginning, watch these six teachings in order. They will help you understand the new birth, salvation in Christ, and how to begin your new life of faith."], "videosTitle": "Six New Birth Teaching Episodes"}]}, "hr": {"title": "Novo rođenje i spasenje u Kristu", "subtitle": "Ovaj odjeljak je za one koji žele razumjeti spasenje, moliti molitvu spasenja s vjerom, učiti o kršćanskom životu, registrirati se i pogledati učenja o novom rođenju.", "registerText": "Otvori obrazac za registraciju crkve", "sections": [{"id": "what", "title": "Što je spasenje?", "content": ["Spasenje je jedna od najvažnijih istina Božje Riječi. Spasenje znači da je čovjek oslobođen od grijeha, duhovne smrti, osude i odvojenosti od Boga te uveden u novi život u Kristu. Spasenje nije samo religiozna promjena; ono je novo rođenje, prijenos iz tame u svjetlo i ulazak u živi odnos s Bogom kroz Isusa Krista.", "Ivan 3:16 pokazuje da je spasenje započelo Božjom ljubavlju. Čovjek se ne može spasiti vlastitom snagom, dobrim djelima, zakonom, religijom ili osobnim trudom. Spasenje je Božji dar, a ne nagrada za ljudska djela.", "Efežanima 2:8-9 uči da smo spašeni milošću po vjeri, ne po djelima, da se nitko ne bi hvalio. Zato se spasenje temelji na Božjoj milosti i vjeri u Isusa Krista.", "Čovjek treba spasenje jer je grijeh odvojio čovjeka od Boga. Grijeh nisu samo pogrešna djela; grijeh je pala narav koja odvaja čovjeka od Božjeg života. Rimljanima 3:23 kaže da su svi sagriješili.", "Isus Krist je Sin Božji koji je došao na svijet spasiti čovjeka. Živio je bez grijeha, umro na križu, prolio svoju krv za oproštenje naših grijeha, bio pokopan i treći dan uskrsnuo od mrtvih.", "Isusova smrt na križu nije bila samo povijesna smrt; On je zauzeo naše mjesto. Uzeo je naš grijeh, osudu i smrt kako bismo mi primili život, pravednost i mir s Bogom.", "Spasenje se prima vjerom u Isusa Krista. Vjera znači pouzdati se u Isusa iz srca, primiti Ga kao Gospodina i priznati da Ga je Bog uskrisio od mrtvih.", "Rimljanima 10:9-10 kaže da ćeš biti spašen ako svojim ustima priznaš Isusa kao Gospodina i u svom srcu vjeruješ da Ga je Bog uskrisio od mrtvih.", "Spasenje nije samo oproštenje prošlih grijeha. Spasenje znači da je čovjek iznutra učinjen novim i prima Božji život. Isus je rekao da se čovjek mora roditi nanovo.", "Novo rođenje znači da ljudski duh ponovno oživljava. Kada osoba primi Isusa, Bog je čini svojim djetetom. Ona više nije samo običan čovjek; ona je novo stvorenje u Kristu.", "2. Korinćanima 5:17 kaže da je onaj koji je u Kristu novo stvorenje. To znači da tvoja prošlost više nije tvoj identitet. U Kristu si novo stvorenje.", "Rezultat spasenja je mir s Bogom, oproštenje grijeha, sloboda od osude, vječni život, sinovstvo, prebivanje Duha Svetoga i snaga za novi život.", "Spasenje je za danas. Isus te prima takvog kakav jesi, ali te ne ostavlja takvim; On te čini novim, čistim, snažnim i živim."]}, {"id": "prayer", "title": "Molitva spasenja", "intro": "Ako želite primiti Isusa Krista kao Gospodina i Spasitelja svoga života, pročitajte ovu molitvu s vjerom, iz srca i naglas.", "content": ["Gospodine Bože, danas dolazim k Tebi s vjerom i otvorenim srcem.", "Vjerujem da je Isus Krist Sin Božji; umro je na križu za moje grijehe, bio pokopan i treći dan uskrsnuo od mrtvih.", "Vjerujem u svom srcu i priznajem svojim ustima da je Isus Krist Gospodin moga života.", "Gospodine Isuse, primam Te kao svoga Gospodina i Spasitelja. Uđi u moje srce, oprosti mi, očisti me i učini da budem nanovo rođen.", "Od danas izjavljujem da sam spašen, dijete Božje, prenesen iz tame u svjetlo i da sam primio vječni život u Kristu.", "Duše Sveti, prebivaj u meni, poučavaj me, vodi me i pomozi mi rasti u vjeri, ljubavi, poslušnosti i poznavanju Gospodina.", "U ime Isusa Krista. Amen."]}, {"id": "life", "title": "Što je kršćanski život?", "content": ["Kršćanski život nije samo prihvaćanje religije ili odlazak u crkvu; to je početak novog života s Isusom Kristom. Kada osoba povjeruje u Isusa, iznutra se nanovo rađa i ulazi u živi odnos s Bogom.", "Vjera u Isusa je početak puta, ali rast u vjeri zahtijeva pažnju, predanost i svakodnevni život s Bogom. Novi vjernik treba Božju Riječ, molitvu, štovanje, zdravo učenje i zajedništvo vjernika.", "1. Čitanje Božje Riječi: Božja Riječ je hrana za ljudski duh. Pismo nam pokazuje tko je Bog, tko smo mi u Kristu, kako trebamo živjeti i kako hodati u Božjoj volji.", "2. Molitva i osobni odnos s Bogom: Molitva je razgovor, zajedništvo i odnos s nebeskim Ocem.", "3. Štovanje Gospodina: Štovanje je čast, ljubav, predanje i usmjerenje srca na Boga. Štovanje jača vjeru i mijenja ozračje srca.", "4. Biti ukorijenjen u crkvi: Crkva je duhovna obitelj vjernika. Svaki vjernik treba rasti u zdravoj, živoj i biblijskoj crkvi.", "5. Slušanje Riječi i zdravog učenja: Vjera dolazi od slušanja Božje Riječi. Zdravo učenje približava nas Isusu i čuva nas od prijevare, straha i pogrešnog razmišljanja.", "6. Rast u vjeri i duhu: Kršćanska vjera mora rasti. Duhovni rast znači postajati sličniji Kristu u ljubavi, oproštenju, strpljivosti, čistoći, mudrosti, poslušnosti i služenju.", "7. Odgovornost vjernika: Svaki vjernik odgovoran je čuvati, razvijati i ozbiljno shvaćati svoju vjeru. Spasenje je Božji dar, ali duhovni rast zahtijeva suradnju s Duhom Svetim.", "Kršćanski život je lijepo putovanje s Bogom: od spasenja prema rastu, od slabosti prema snazi, od neznanja prema spoznaji i od običnog života prema životu ispunjenom Božjim Duhom."]}, {"id": "register", "title": "Registracija i članstvo", "content": ["Registracija nakon molitve spasenja", "Ako ste molili molitvu primanja spasenja ili želite saznati više o vjeri u Isusa Krista, ispunite obrazac u nastavku. Službeni tim Crkve OmideNo7 kontaktirat će vas s ljubavlju, moliti za vas i voditi vas u duhovnom rastu i učeništvu.", "Matej 28:19–20 — Isus nam je zapovjedio da stvaramo učenike i poučavamo ljude kako bi rasli na Njegovu putu."]}, {"id": "videos", "title": "Videozapisi o novom rođenju", "content": ["Kako bi vaša vjera od početka bila izgrađena na ispravnom temelju, pogledajte ovih šest učenja redom. Ona će vam pomoći razumjeti novo rođenje, spasenje u Kristu i početak novog života vjere."], "videosTitle": "Šest dijelova učenja o novom rođenju"}]}, "videos": [[{"fa": "قسمت اول — تولد تازه", "en": "Part 1 — New Birth", "hr": "1. dio — Novo rođenje"}, "https://youtu.be/u-G6r7rYNEE?is=kVQGp0SHDEh2wsOt"], [{"fa": "قسمت دوم — تولد تازه", "en": "Part 2 — New Birth", "hr": "2. dio — Novo rođenje"}, "https://youtu.be/_NNh_EZYKTk?is=Gyh8MLfaRzQujRYh"], [{"fa": "قسمت سوم — تولد تازه", "en": "Part 3 — New Birth", "hr": "3. dio — Novo rođenje"}, "https://youtu.be/NkhUL9CTWcs?is=G4x2M6ZPMU_xfjPn"], [{"fa": "قسمت چهارم — تولد تازه", "en": "Part 4 — New Birth", "hr": "4. dio — Novo rođenje"}, "https://youtu.be/LbJ1Fba5sww?is=LceLaTANRoEIJREm"], [{"fa": "قسمت پنجم — تولد تازه", "en": "Part 5 — New Birth", "hr": "5. dio — Novo rođenje"}, "https://youtu.be/BYyCOXIA944?is=Ws6yFVh83Cz8a8p2"], [{"fa": "قسمت ششم — تولد تازه", "en": "Part 6 — New Birth", "hr": "6. dio — Novo rođenje"}, "https://youtu.be/ByEg4dcb6zs?is=9bsHHvQ4TzluKrm0"]]};
var MEETING_URL='https://join.freeconferencecall.com/omideno7church';
var ACCESS_CODE='2452236';
var SECURITY_CODE='789987';
var LAST_EMAIL_KEY='omideno7_last_registration_email';
var LAST_REG_ID_KEY='omideno7_last_registration_id';
var USER_APPROVED_KEY='omideno7_meeting_access_approved';

function isBeta(){return /beta\.html/i.test(location.pathname)||/v=6357|v=6356|v=6355|v=6354|v=6353|v=6352|v=6351|v=6350|v=6349/i.test(location.search)}
if(!isBeta()) return;

window.newBirthContentData=DATA;

function norm(v){
  v=String(v||'').toLowerCase().trim();
  if(v==='en'||v.startsWith('en-')||v.indexOf('english')>-1)return'en';
  if(v==='hr'||v.startsWith('hr-')||v.indexOf('cro')>-1||v.indexOf('hrv')>-1||v.indexOf('kro')>-1)return'hr';
  return'fa';
}
function lang(){try{return norm(localStorage.getItem('lang')||document.documentElement.lang||navigator.language||'fa')}catch(e){return'fa'}}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function T(k){
  var fa={
    welcome:'به کلیسای امیدنو۷ خوش آمدید',
    subtitle:'کلیسای آنلاین، با تمرکز بر تعلیم کلام خدا، شاگردسازی، دعا و تجهیز ایمانداران و خادمین خدا برای گسترش ملکوت خدا.',
    daily:'امروز با ایمان قدم بردار؛ خداوند با توست و کلام او مسیرت را روشن می‌کند.',
    notify:'فعال‌سازی اعلان‌ها',
    meetings:'جلسات آنلاین',
    join:'ورود به جلسه',
    info:'اطلاعات جلسه',
    schedule:'برنامه جلسات',
    prayer:'جلسه دعا: هر روز صبح ساعت ۵ به وقت کرواسی',
    church:'جلسه کلیسا: یکشنبه‌ها ساعت ۸ شب به وقت کرواسی',
    accessPublic:'برای دریافت رمز ورود جلسات، ابتدا فرم ثبت‌نام کلیسای امیدنو۷ را تکمیل کنید. پس از بررسی و تأیید توسط ادمین، رمز ورود در همین اپ برای شما نمایش داده می‌شود.',
    needApproval:'برای ورود به جلسه، ابتدا ثبت‌نام کنید و منتظر تأیید ادمین بمانید. پس از تأیید، رمز ورود جلسه در همین بخش نمایش داده می‌شود.',
    approvedTitle:'دسترسی جلسه فعال شد',
    approvedMsg:'ثبت‌نام شما تأیید شده است. برای ورود به جلسه از اطلاعات زیر استفاده کنید.',
    meetingLink:'لینک ورود به جلسه',
    accessCode:'کد دسترسی',
    securityCode:'رمز امنیتی جلسه',
    checking:'در حال بررسی وضعیت تأیید...',
    notApproved:'هنوز تأیید ثبت‌نام برای این دستگاه/ایمیل پیدا نشد.',
    close:'بستن',
    medalsTitle:'رشد روحانی و مدال‌ها',
    medalsSub:'این بخش برای تشویق رشد روزانه در کلام، دعا، ایمان و شاگردی است.',
    points:'امتیاز',
    medals:'مدال',
    streak:'روز پیوسته',
    medalGuide:'راهنمای مدال‌ها',
    noMedal:'هنوز مدالی آزاد نشده است.',
    guideText:'مدال‌ها برای تشویق رشد روحانی هستند، نه رقابت. برنزی از ۱۰۰ امتیاز، نقره‌ای از ۲۰۰، طلایی از ۵۰۰ و مدال‌های خاص با ثبات در کلام، دعا، شکرگزاری، اعلان ایمان، مدرسه و تکمیل برنامه ۳۶۵ روزه آزاد می‌شوند.',
    rcTitle:'گزارش تست نسخه بتا',
    rcText:'نسخه بتا برای تست نهایی آماده است. صفحه خانه، تولد تازه، ثبت‌نام، دسترسی جلسات، مدال‌ها، آفلاین و کلود باید قبل از انتشار اصلی یک بار کامل تست شوند.',
    regPending:'ثبت‌نام شما دریافت شد. پس از بررسی و تأیید توسط ادمین، رمز ورود جلسه در همین اپ برای شما نمایش داده می‌شود.'
  };
  var en={
    welcome:'Welcome to OmideNo7 Church',
    subtitle:'Online Church, focused on teaching the Word of God, discipleship, prayer, and equipping believers and ministers of God for the expansion of God’s Kingdom.',
    daily:'Walk by faith today; the Lord is with you, and His Word lights your path.',
    notify:'Enable notifications',
    meetings:'Online meetings',
    join:'Join meeting',
    info:'Meeting information',
    schedule:'Meeting schedule',
    prayer:'Prayer meeting: every morning at 5:00 AM Croatia time',
    church:'Church service: Sundays at 8:00 PM Croatia time',
    accessPublic:'To receive the meeting access code, first complete the OmideNo7 Church registration form. After admin review and approval, the code will be shown inside this app.',
    needApproval:'To join the meeting, please register first and wait for admin approval. After approval, the meeting code will appear in this section.',
    approvedTitle:'Meeting access enabled',
    approvedMsg:'Your registration has been approved. Use the following information to join the meeting.',
    meetingLink:'Meeting link',
    accessCode:'Access code',
    securityCode:'Meeting security code',
    checking:'Checking approval status...',
    notApproved:'No approved registration was found for this device/email yet.',
    close:'Close',
    medalsTitle:'Spiritual Growth & Medals',
    medalsSub:'This section encourages daily growth in the Word, prayer, faith, and discipleship.',
    points:'Points',
    medals:'Medals',
    streak:'Day streak',
    medalGuide:'Medal Guide',
    noMedal:'No medals unlocked yet.',
    guideText:'Medals encourage spiritual growth, not competition. Bronze starts at 100 points, Silver at 200, Gold at 500, and special medals unlock through consistency in the Word, prayer, thanksgiving, faith declaration, School, and completing the 365-day plan.',
    rcTitle:'Beta Test Report',
    rcText:'The beta version is ready for final testing. Home, New Birth, registration, meeting access, medals, offline, and cloud backup should be fully tested once before production release.',
    regPending:'Your registration has been received. After admin review and approval, the meeting security code will be shown inside this app.'
  };
  var hr={
    welcome:'Dobrodošli u Crkvu OmideNo7',
    subtitle:'Online crkva, usmjerena na poučavanje Božje Riječi, učeništvo, molitvu i opremanje vjernika i Božjih službenika za širenje Božjeg Kraljevstva.',
    daily:'Hodaj danas u vjeri; Gospodin je s tobom i Njegova Riječ osvjetljava tvoj put.',
    notify:'Aktiviraj obavijesti',
    meetings:'Online sastanci',
    join:'Uđi u sastanak',
    info:'Informacije o sastanku',
    schedule:'Raspored sastanaka',
    prayer:'Molitveni sastanak: svaki dan u 5:00 ujutro po hrvatskom vremenu',
    church:'Crkvena služba: nedjeljom u 20:00 po hrvatskom vremenu',
    accessPublic:'Za primanje koda za sastanak najprije ispunite registracijski obrazac Crkve OmideNo7. Nakon pregleda i odobrenja administratora, kod će biti prikazan u ovoj aplikaciji.',
    needApproval:'Za ulazak u sastanak najprije se registrirajte i pričekajte odobrenje administratora. Nakon odobrenja, kod za sastanak prikazat će se u ovom odjeljku.',
    approvedTitle:'Pristup sastanku je omogućen',
    approvedMsg:'Vaša registracija je odobrena. Koristite sljedeće podatke za ulazak u sastanak.',
    meetingLink:'Link za sastanak',
    accessCode:'Pristupni kod',
    securityCode:'Sigurnosni kod sastanka',
    checking:'Provjera statusa odobrenja...',
    notApproved:'Još nije pronađena odobrena registracija za ovaj uređaj/e-mail.',
    close:'Zatvori',
    medalsTitle:'Duhovni rast i medalje',
    medalsSub:'Ovaj odjeljak potiče svakodnevni rast u Riječi, molitvi, vjeri i učeništvu.',
    points:'Bodovi',
    medals:'Medalje',
    streak:'Dana u nizu',
    medalGuide:'Vodič za medalje',
    noMedal:'Još nema otključanih medalja.',
    guideText:'Medalje potiču duhovni rast, a ne natjecanje. Brončana počinje od 100 bodova, srebrna od 200, zlatna od 500, a posebne medalje otključavaju se kroz ustrajnost u Riječi, molitvi, zahvalnosti, ispovijedanju vjere, Školi i dovršetku 365-dnevnog plana.',
    rcTitle:'Izvještaj beta testa',
    rcText:'Beta verzija je spremna za završno testiranje. Početna stranica, Novo rođenje, registracija, pristup sastancima, medalje, offline i cloud backup trebaju se potpuno testirati prije produkcijskog izdanja.',
    regPending:'Vaša registracija je primljena. Nakon pregleda i odobrenja administratora, sigurnosni kod sastanka bit će prikazan u ovoj aplikaciji.'
  };
  var l=lang(); return (l==='hr'?hr:(l==='en'?en:fa))[k]||fa[k]||k;
}
function data(){return DATA[lang()]||DATA.fa}
function section(id){return (data().sections||[]).find(function(s){return s.id===id})}

function css(){
 if(document.getElementById('v6357Css'))return;
 var st=document.createElement('style'); st.id='v6357Css';
 st.textContent=[
 '#v6357WelcomeCard{border-top:6px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;box-shadow:0 12px 34px rgba(6,20,109,.08)!important;padding:22px!important;display:block!important;visibility:visible!important;height:auto!important;overflow:visible!important}',
 '#v6357WelcomeCard .title{font-size:clamp(25px,5.2vw,38px)!important;line-height:1.22!important;color:#06146D!important;font-weight:950!important;margin:0 0 12px!important;letter-spacing:-.02em}',
 '#v6357WelcomeCard .subtitle{font-size:clamp(15px,3.2vw,18px)!important;line-height:1.95!important;color:#24304F!important;font-weight:800!important;margin:0 0 16px!important}',
 '.v6357-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px}',
 '.v6357-btn{border:0;border-radius:999px;padding:10px 14px;font-weight:900;cursor:pointer;background:#eef4ff;color:#06146D;box-shadow:0 4px 12px rgba(6,20,109,.08);text-decoration:none;display:inline-flex;align-items:center;gap:7px}',
 '.v6357-primary{background:#00B91F!important;color:#fff!important}.v6357-blue{background:#06146D!important;color:#fff!important}.v6357-gold{background:#F59E0B!important;color:#fff!important}',
 '#v6357MeetingPanel{display:none;margin-top:16px;background:#fff;border:1px solid #DDE6F3;border-radius:20px;padding:14px;line-height:1.9}',
 '#v6357MeetingPanel.show{display:block}#v6357MeetingPanel h4{margin:0 0 8px;color:#06146D;font-weight:950;font-size:18px}',
 '#v6357MeetingPanel .line{background:#f8fbff;border-radius:14px;padding:9px 11px;margin:8px 0;font-weight:800;color:#24304F}',
 '#v6357DailyCard{border-top:5px solid #00B91F!important;background:linear-gradient(160deg,#fff,#f5fff7)!important;box-shadow:0 10px 28px rgba(0,0,0,.06)!important}',
 '#v6357DailyCard .msg{display:flex;align-items:flex-start;gap:10px;background:#eef4ff;color:#06146D;border-radius:18px;padding:12px 14px;font-weight:900;line-height:1.9}',
 '.v6357-icon{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:12px;background:#eef4ff;margin-inline-end:8px;font-size:18px;vertical-align:middle}',
 '.v6357-modal{position:fixed;inset:0;z-index:999999}.v6357-backdrop{position:absolute;inset:0;background:rgba(2,8,23,.45);backdrop-filter:blur(2px)}',
 '.v6357-box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,860px);max-height:90vh;overflow:auto;background:#fff;border-radius:26px;padding:22px;box-shadow:0 28px 90px rgba(0,0,0,.35);border-top:6px solid #00B91F}',
 '.v6357-x{position:absolute;right:14px;top:10px;border:0;background:#f1f5f9;border-radius:999px;width:36px;height:36px;font-size:26px;line-height:1}',
 '.v6357-item{background:#f8fbff;border:1px solid #dbe3ef;border-radius:16px;padding:12px;margin:10px 0;line-height:1.9}.v6357-video{display:block;margin:8px 0;padding:10px 12px;border-radius:14px;background:#eef4ff;color:#06146D;text-decoration:none;font-weight:900}',
 '#v6357RewardsPanel{border-top:5px solid #F59E0B!important;background:linear-gradient(160deg,#fff,#fffaf0)!important;display:block!important;visibility:visible!important;height:auto!important;overflow:visible!important}',
 '.v6357-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:10px;margin:12px 0}.v6357-stat{background:#fff;border:1px solid #E6EAF2;border-radius:16px;padding:12px;text-align:center}.v6357-stat strong{display:block;color:#06146D;font-size:22px}',
 '.v6357-chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.v6357-chip{background:#fff;border:1px solid #E6EAF2;border-radius:999px;padding:8px 12px;font-weight:850;color:#06146D;font-size:13px}',
 '#v6357RcReport{border-top:5px solid #06146D!important;background:linear-gradient(160deg,#fff,#f8fbff)!important}',
 '.v6357-hide-test{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important}',
 '.fa #v6357WelcomeCard,.fa #v6357MeetingPanel,.fa .v6357-box,.fa #v6357DailyCard,.fa #v6357RewardsPanel,.fa #v6357RcReport{direction:rtl;text-align:right}'
 ].join('\\n');
 document.head.appendChild(st);
}

function forceHomeOnLoad(){
 if(window.__OMIDENO7_V6357_FORCED_HOME) return;
 window.__OMIDENO7_V6357_FORCED_HOME=true;
 try{
   if(location.hash && /admin|qa|questions|more/i.test(location.hash)) history.replaceState(null,'',location.pathname+location.search);
 }catch(e){}
 setTimeout(function(){
   document.querySelectorAll('main .page').forEach(function(p){p.classList.remove('active');});
   var home=document.getElementById('home'); if(home) home.classList.add('active');
   document.querySelectorAll('.bottom-nav button,.tabbar button,nav button,[data-page],[data-tab]').forEach(function(b){
     var tx=(b.textContent||'')+' '+(b.getAttribute('data-page')||'')+' '+(b.getAttribute('data-tab')||'')+' '+(b.getAttribute('href')||'');
     var isHome=/خانه|Home|Početna|home/i.test(tx);
     b.classList.toggle('active',isHome);
   });
 },50);
}

function removeCompetingUi(){
 ['v6352DailyCard','v6353WelcomeCard','v6356WelcomeCard','v6356NewBirthCard','v6351MedalGuide','v6352RewardsPanel','v6353AccessAfterRegister','v6356RegPending'].forEach(function(id){
   var e=document.getElementById(id); if(e) e.remove();
 });
}
function renderWelcome(){
 css(); removeCompetingUi();
 var home=document.getElementById('home'); if(!home)return;
 var card=document.getElementById('v6357WelcomeCard') || home.querySelector('.hero-card') || home.querySelector('.card') || document.createElement('div');
 if(!card.parentNode) home.insertBefore(card,home.firstChild);
 card.id='v6357WelcomeCard';
 card.classList.add('hero-card');
 card.innerHTML='<h1 class="title">'+esc(T('welcome'))+'</h1><p class="subtitle">'+esc(T('subtitle'))+'</p><div class="v6357-actions"><button class="v6357-btn v6357-primary" id="v6357Notify">🔔 '+esc(T('notify'))+'</button><button class="v6357-btn v6357-blue" id="v6357Meetings">📅 '+esc(T('meetings'))+'</button><button class="v6357-btn v6357-gold" id="v6357Join">FCC '+esc(T('join'))+'</button><button class="v6357-btn" id="v6357Info">ℹ️ '+esc(T('info'))+'</button></div><div id="v6357MeetingPanel"><h4>📅 '+esc(T('schedule'))+'</h4><div class="line">🙏 '+esc(T('prayer'))+'</div><div class="line">⛪ '+esc(T('church'))+'</div><div class="line">⚠️ '+esc(T('accessPublic'))+'</div></div>';
 bindWelcome();
}
function bindWelcome(){
 var n=document.getElementById('v6357Notify'); if(n&&!n.dataset.b){n.dataset.b=1;n.onclick=function(e){e.preventDefault();try{if(Notification&&Notification.requestPermission)Notification.requestPermission()}catch(x){}return false;};}
 var m=document.getElementById('v6357Meetings'); if(m&&!m.dataset.b){m.dataset.b=1;m.onclick=function(e){e.preventDefault();toggleMeeting();return false;};}
 var i=document.getElementById('v6357Info'); if(i&&!i.dataset.b){i.dataset.b=1;i.onclick=function(e){e.preventDefault();var p=document.getElementById('v6357MeetingPanel');if(p){p.classList.add('show');p.scrollIntoView({behavior:'smooth',block:'nearest'});}return false;};}
 var j=document.getElementById('v6357Join'); if(j&&!j.dataset.b){j.dataset.b=1;j.onclick=function(e){e.preventDefault();checkApprovedAccess(true);return false;};}
}
function toggleMeeting(){var p=document.getElementById('v6357MeetingPanel');if(p){p.classList.toggle('show');if(p.classList.contains('show'))p.scrollIntoView({behavior:'smooth',block:'nearest'});}}
function renderDaily(){
 var home=document.getElementById('home'); if(!home)return;
 var existing=document.getElementById('v6357DailyCard');
 if(!existing){
   var c=document.createElement('div'); c.id='v6357DailyCard'; c.className='card'; c.innerHTML='<div class="msg"><span>✨</span><span>'+esc(T('daily'))+'</span></div>';
   var w=document.getElementById('v6357WelcomeCard')||home.firstElementChild;
   if(w&&w.parentNode) w.parentNode.insertBefore(c,w.nextSibling); else home.insertBefore(c,home.firstChild);
 }else{
   existing.querySelector('.msg span:last-child').textContent=T('daily');
 }
}
function renderMeetingsPage(){
 var sec=document.getElementById('meetings'); if(!sec)return;
 sec.innerHTML='<div class="section-title"><h2>'+esc(T('meetings'))+'</h2></div><div class="card"><h3>📅 '+esc(T('schedule'))+'</h3><div class="schedule-item"><div class="time-badge">5:00 AM</div><div><strong>'+esc(T('prayer'))+'</strong></div></div><div class="schedule-item"><div class="time-badge">8:00 PM</div><div><strong>'+esc(T('church'))+'</strong></div></div><p class="status">⚠️ '+esc(T('accessPublic'))+'</p><button class="btn primary" id="v6357MeetingCheck">'+esc(T('join'))+'</button></div>';
 var b=document.getElementById('v6357MeetingCheck'); if(b)b.onclick=function(e){e.preventDefault();checkApprovedAccess(true);};
}
function renderNewBirth(){
 var home=document.getElementById('home'); if(!home)return;
 var d=data();
 var card=document.getElementById('v6357NewBirthCard') || document.getElementById('v6351NewBirthCard') || Array.prototype.slice.call(home.querySelectorAll('.card')).find(function(c){return /تولد تازه|New Birth|Novo rođenje/i.test(c.textContent||'')});
 if(!card){
   card=document.createElement('div'); card.className='card feature-card';
   var grid=home.querySelector('.home-feature-grid,.grid')||home; grid.appendChild(card);
 }
 card.id='v6357NewBirthCard';
 card.innerHTML='<h3>✨ '+esc(d.title)+'</h3><p>'+esc(d.subtitle)+'</p><button class="btn primary" id="v6357NBOpen">'+esc({fa:'نیاز به نجات / ثبت‌نام',en:'Need Salvation / Registration',hr:'Trebam spasenje / registraciju'}[lang()])+'</button><div id="v6357NBPanel" style="display:none;margin-top:12px" class="v6357-actions">'+['what','prayer','life','videos','register'].map(function(id){var s=section(id);var title=id==='register'?d.registerText:(s?s.title:id);return '<button class="btn '+(id==='register'?'gold':'secondary')+'" data-v6357-nb="'+id+'">'+esc(title)+'</button>';}).join('')+'</div>';
 var o=document.getElementById('v6357NBOpen'); if(o)o.onclick=function(e){e.preventDefault();var p=document.getElementById('v6357NBPanel');p.style.display=p.style.display==='block'?'none':'block';return false;};
 document.querySelectorAll('[data-v6357-nb]').forEach(function(btn){btn.onclick=function(e){e.preventDefault();var id=btn.getAttribute('data-v6357-nb'); if(id==='register')openRegistration(); else openSection(id); return false;};});
}
function modal(title,body){closeModal();var m=document.createElement('div');m.id='v6357Modal';m.className='v6357-modal';m.innerHTML='<div class="v6357-backdrop"></div><div class="v6357-box"><button class="v6357-x">×</button><h2>'+esc(title)+'</h2>'+body+'<div class="v6357-actions"><button class="btn light" id="v6357Close">'+esc(T('close'))+'</button></div></div>';document.body.appendChild(m);m.querySelector('.v6357-backdrop').onclick=closeModal;m.querySelector('.v6357-x').onclick=closeModal;document.getElementById('v6357Close').onclick=closeModal;}
function closeModal(){var m=document.getElementById('v6357Modal');if(m)m.remove();}
function openSection(id){var s=section(id);if(!s)return;var parts=[];if(s.intro)parts.push('<p><strong>'+esc(s.intro)+'</strong></p>');(s.content||[]).forEach(function(p){parts.push('<p>'+esc(p)+'</p>');});if(id==='videos'){parts.push('<h3>'+esc(s.videosTitle||s.title)+'</h3>');(DATA.videos||[]).forEach(function(v){var title=(v[0]&&v[0][lang()])||v[0].fa||v[0].en||'Video';parts.push('<a class="v6357-video" target="_blank" rel="noopener" href="'+esc(v[1])+'">▶ '+esc(title)+'</a>');});}modal(s.title,'<div class="v6357-item">'+parts.join('')+'</div>');}
function openRegistration(){if(window.OMIDENO7_V6349_REGISTRATION_BETA&&typeof window.OMIDENO7_V6349_REGISTRATION_BETA.openForm==='function'){window.OMIDENO7_V6349_REGISTRATION_BETA.openForm();setTimeout(patchRegistration,200);return;}modal(section('register').title,'<div class="v6357-item">'+esc(T('accessPublic'))+'</div>');}

function patchRegistration(){
 var modalEl=document.getElementById('v6349Modal'); if(!modalEl)return;
 var old=document.getElementById('v6353AccessAfterRegister'); if(old)old.remove();
 var old2=document.getElementById('v6356RegPending'); if(old2)old2.remove();
 if(!document.getElementById('v6357RegHint')){
   var form=modalEl.querySelector('form,#v6349Form');
   if(form) form.insertAdjacentHTML('beforeend','<div id="v6357RegHint" class="v6357-item">ℹ️ '+esc(T('accessPublic'))+'</div>');
 }
 if(!modalEl.dataset.v6357obs){
   modalEl.dataset.v6357obs=1;
   var obs=new MutationObserver(function(){
     var tx=modalEl.textContent||'';
     if(/success|موفق|ثبت شد|received|submitted|uspješno|ذخیره شد/i.test(tx)){
       var emailInput=modalEl.querySelector('input[type="email"],input[name*="email"],input[id*="email"]');
       if(emailInput&&emailInput.value) localStorage.setItem(LAST_EMAIL_KEY,emailInput.value.trim().toLowerCase());
       if(!document.getElementById('v6357RegPending')){
         var b=document.createElement('div'); b.id='v6357RegPending'; b.className='v6357-item'; b.innerHTML='✅ '+esc(T('regPending')); modalEl.appendChild(b);
       }
     }
   });
   obs.observe(modalEl,{childList:true,subtree:true,characterData:true});
 }
}

function findClient(){return window.supabaseClient||window.supabase||window.sb||window.SUPABASE_CLIENT||null;}
async function getUser(sb){try{if(sb.auth&&sb.auth.getUser){var r=await sb.auth.getUser();return r&&r.data&&r.data.user}}catch(e){} return null;}
async function checkApprovedAccess(show){
 var approved=localStorage.getItem(USER_APPROVED_KEY)==='1';
 if(approved){showApproved();return;}
 var sb=findClient();
 if(show) modal(T('join'),'<div class="v6357-item">'+esc(T('checking'))+'</div>');
 try{
   if(sb&&sb.from){
     var email=(localStorage.getItem(LAST_EMAIL_KEY)||'').trim().toLowerCase();
     var user=await getUser(sb);
     var q=sb.from('church_member_registrations').select('id,email,status,approval_status,meeting_access_visible,meeting_access_code').limit(1);
     if(user&&user.id) q=q.eq('user_id',user.id);
     else if(email) q=q.eq('email',email);
     else throw new Error('no identity');
     var r=await q;
     if(r.error) throw r.error;
     var row=r.data&&r.data[0];
     var ok=row && (row.approval_status==='approved'||row.status==='approved'||row.meeting_access_visible===true);
     if(ok){
       localStorage.setItem(USER_APPROVED_KEY,'1');
       showApproved(row.meeting_access_code||SECURITY_CODE);
       return;
     }
   }
 }catch(e){}
 if(show) modal(T('join'),'<div class="v6357-item">🔐 '+esc(T('notApproved'))+'<br><br>'+esc(T('needApproval'))+'</div>');
}
function showApproved(code){
 code=code||SECURITY_CODE;
 modal(T('approvedTitle'),'<div class="v6357-item">✅ '+esc(T('approvedMsg'))+'</div><div class="v6357-item">🔗 '+esc(T('meetingLink'))+': <a href="'+esc(MEETING_URL)+'" target="_blank" rel="noopener">'+esc(MEETING_URL)+'</a></div><div class="v6357-item">🔢 '+esc(T('accessCode'))+': <strong>'+esc(ACCESS_CODE)+'</strong></div><div class="v6357-item">🔐 '+esc(T('securityCode'))+': <strong>'+esc(code)+'</strong></div>');
}

function addIcons(){
 var home=document.getElementById('home'); if(!home)return;
 var rules=[
  {re:/پیامهای صوتی روحانی|پیام‌های صوتی روحانی|Spiritual Audio|Duhovne audio/i, icon:'🎧'},
  {re:/اعلان‌های ایمان|اعلان ایمان|Izjave vjere|Faith Declaration/i, icon:'🗣️'},
  {re:/آیات من|Moji stihovi|Saved Verses/i, icon:'📖'},
  {re:/یادداشت‌های من|یادداشتهای من|Moje bilješke|My Notes/i, icon:'📝'},
  {re:/پرسش و پاسخ|odgovori|Bible Q&A|Pitanja/i, icon:'❓'}
 ];
 home.querySelectorAll('.card h3,.card h2,.feature-card h3').forEach(function(h){
   if(h.dataset.v6357icon)return;
   var tx=h.textContent||'';
   for(var i=0;i<rules.length;i++){
     if(rules[i].re.test(tx)){
       h.dataset.v6357icon=1; h.innerHTML='<span class="v6357-icon">'+rules[i].icon+'</span>'+esc(tx); break;
     }
   }
 });
}

function getJson(k,f){try{return JSON.parse(localStorage.getItem(k)||'null')||f;}catch(e){return f;}}
function rewardState(){var s={points:0,medals:[],streak:0};['omideno7_rewards_v6348_state','omideno7_rewards_state','omideno7_rewards'].forEach(function(k){var x=getJson(k,null);if(x&&typeof x==='object'){s.points=Number(x.points||s.points||0);s.medals=Array.isArray(x.medals)?x.medals:s.medals;s.streak=Number(x.streak||s.streak||0);}});return s;}
function renderRewards(){var more=document.getElementById('more');if(!more)return;var old=document.getElementById('v6349bRewardsClean');if(old)old.remove();var s=rewardState();var html='<div id="v6357RewardsPanel" class="card"><h3>🏆 '+esc(T('medalsTitle'))+'</h3><p>'+esc(T('medalsSub'))+'</p><div class="v6357-stats"><div class="v6357-stat"><strong>'+esc(s.points)+'</strong>'+esc(T('points'))+'</div><div class="v6357-stat"><strong>'+esc(s.medals.length)+'</strong>'+esc(T('medals'))+'</div><div class="v6357-stat"><strong>'+esc(s.streak)+'</strong>'+esc(T('streak'))+'</div></div><div class="v6357-chips">'+(s.medals.length?s.medals.map(function(x){return'<span class="v6357-chip">🏅 '+esc(x)+'</span>';}).join(''):'<span class="v6357-chip">'+esc(T('noMedal'))+'</span>')+'</div><button class="btn secondary" id="v6357GuideBtn">'+esc(T('medalGuide'))+'</button><div id="v6357GuideText" class="v6357-item" style="display:none">'+esc(T('guideText'))+'</div></div>';
 var e=document.getElementById('v6357RewardsPanel'); if(e)e.outerHTML=html; else {var w=document.createElement('div');w.innerHTML=html;var footer=more.querySelector('.footer');more.insertBefore(w.firstElementChild,footer||null);}
 var b=document.getElementById('v6357GuideBtn'); if(b)b.onclick=function(e){e.preventDefault();var g=document.getElementById('v6357GuideText');g.style.display=g.style.display==='block'?'none':'block';};
}
function hideTestPanels(){
 document.querySelectorAll('.card,section,div').forEach(function(el){
   if(el.closest('#home,#plans,#bible,#word,#school,#more')) return;
 });
 // Hide public beta/testing cards in More by conservative keywords only.
 var more=document.getElementById('more'); if(!more)return;
 more.querySelectorAll('.card').forEach(function(c){
   var tx=c.textContent||'';
   if(/بتا|Beta|تست امنیت|پنل تست|آزمایشی|بررسی امنیت|Security.*Beta|Audit OK|offline.*test/i.test(tx) && !/مدال|رشد روحانی|Spiritual Growth|Duhovni rast/i.test(tx)){
     c.classList.add('v6357-hide-test');
   }
 });
}
function renderRcReport(){var more=document.getElementById('more');if(!more||document.getElementById('v6357RcReport'))return;var d=document.createElement('div');d.id='v6357RcReport';d.className='card';d.innerHTML='<h3>✅ '+esc(T('rcTitle'))+'</h3><p>'+esc(T('rcText'))+'</p>';var footer=more.querySelector('.footer');more.insertBefore(d,footer||null);}
function render(){css();removeCompetingUi();forceHomeOnLoad();renderWelcome();renderDaily();renderMeetingsPage();renderNewBirth();addIcons();renderRewards();hideTestPanels();renderRcReport();patchRegistration();}
document.addEventListener('DOMContentLoaded',render);window.addEventListener('load',render);document.addEventListener('click',function(){setTimeout(function(){renderNewBirth();addIcons();patchRegistration();},150);},true);setTimeout(render,400);setTimeout(render,1200);setTimeout(render,2600);
window.OMIDENO7_V6357_RC_STABLE={render:render,checkApprovedAccess:checkApprovedAccess,version:VERSION};
})();
