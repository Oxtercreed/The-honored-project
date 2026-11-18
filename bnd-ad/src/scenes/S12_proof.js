//@fonts family=Cormorant+Garamond:ital,wght@0,500;1,400&family=DM+Sans:wght@500;600;700
const CLIENT_NAME = "Mteja wetu";   // ← the ONLY place the client name is set (anonymised). Switch here at assembly if permission is given.
const T={headline:0.00,phoneIn:0.60,site:1.20,swap:2.30,dash:2.60,depth:2.80,tag:3.30,exit:4.40,end:5.00};
const D={wordStag:0.08,phone:0.60,scroll:0.80,zoom:0.30,cardStag:0.06,alert:0.55,lift:1.10,tag:0.45,exitD:0.60};
const SFX=[{t:0.00,name:"whoosh-soft"},{t:0.45,name:"hit-bright"},{t:0.60,name:"phone-rise"},{t:1.20,name:"scroll"},{t:2.30,name:"zoom-through"},{t:2.60,name:"card-pops"},{t:2.95,name:"notif-ding"},{t:3.30,name:"tag-pop"}];
/*==CORE==*/
/* SCENE 12 — PROOF: "Tumejenga mifumo halisi". Anonymised stylised recreation of a real client system (serviced apartments, Dodoma). No online payment shown. */
const K={ocean:'#0F3A3B',ocean2:'#17504F',ivory:'#F3EDE2',paper:'#FBF8F2',brass:'#A47E45',brass2:'#C9A46A',sand:'#E7DAC4',ink:'#1A1E1C',muted:'#6E716A',terra:'#B4593A'};
const SERIF="'Cormorant Garamond',Georgia,serif", SANS="'DM Sans',system-ui,sans-serif";
const houseMark=(sz,c)=>`<svg width="${sz}" height="${sz}" viewBox="0 0 40 40" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="20" r="17.5"/><path d="M11 21l9-8 9 8"/><path d="M13.5 19.5V28h13v-8.5"/><path d="M18 28v-5h4v5"/></svg>`;
let ph,l1,l2,pgA,scrollA,heroEls=[],btnBook,pgB,cardsB=[],alertC,alertDup,capDup,tagP,fgI=[],bgI=[],big;
function heroArt(){return `<svg data-slot="client-hero" class="abs" style="left:0;top:0" width="564" height="1000" viewBox="0 0 564 1000" preserveAspectRatio="xMidYMid slice"><defs>
  <linearGradient id="hw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1EADC"/><stop offset="1" stop-color="#DCCFB8"/></linearGradient>
  <linearGradient id="hf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CDB99A"/><stop offset="1" stop-color="#B49E7C"/></linearGradient>
  <linearGradient id="hd" x1="0" y1="0" x2="0" y2="1"><stop offset=".35" stop-color="#0F3A3B" stop-opacity="0"/><stop offset="1" stop-color="#0F3A3B" stop-opacity=".92"/></linearGradient>
  <linearGradient id="hc" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#EFEAE0"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>
  <rect width="564" height="1000" fill="url(#hw)"/><rect y="640" width="564" height="360" fill="url(#hf)"/>
  <rect x="120" y="120" width="324" height="380" rx="8" fill="#FFFDF6"/><rect x="132" y="132" width="300" height="356" fill="#EAF1F2" opacity=".8"/>
  <rect x="30" y="80" width="130" height="470" rx="8" fill="url(#hc)"/><rect x="404" y="80" width="130" height="470" rx="8" fill="url(#hc)"/>
  ${[0,1,2,3,4].map(i=>`<line x1="${50+i*24}" y1="90" x2="${50+i*24}" y2="540" stroke="#D9D1C0" stroke-width="2" opacity=".6"/><line x1="${424+i*24}" y1="90" x2="${424+i*24}" y2="540" stroke="#D9D1C0" stroke-width="2" opacity=".6"/>`).join('')}
  <rect x="86" y="470" width="392" height="130" rx="28" fill="#8E949B"/><rect x="104" y="410" width="356" height="110" rx="26" fill="#A5ABB2"/><rect x="96" y="500" width="60" height="110" rx="22" fill="#838991"/><rect x="408" y="500" width="60" height="110" rx="22" fill="#838991"/>
  <rect x="150" y="440" width="110" height="64" rx="16" fill="#C9A46A" opacity=".85"/><rect x="304" y="446" width="100" height="58" rx="16" fill="#0F3A3B" opacity=".85"/>
  <ellipse cx="282" cy="712" rx="150" ry="40" fill="#E7DAC4"/><rect x="170" y="676" width="224" height="36" rx="12" fill="#B4905B"/>
  <path d="M60 640c-18-40-10-90 18-120 6 36 8 72-18 120z" fill="#5E7F5B"/><path d="M60 640c20-30 40-60 74-84-8 40-30 66-74 84z" fill="#6E9068"/><rect x="48" y="636" width="26" height="40" rx="8" fill="#C9A46A"/>
  <rect width="564" height="1000" fill="url(#hd)"/></svg>`;}
function priceRow(i,label,price){return `<div class="abs" style="left:28px;top:${1150+i*122}px;width:508px;height:102px;border-radius:20px;background:${K.paper};border:1px solid ${K.sand};display:flex;align-items:center;justify-content:space-between;padding:0 22px;font-family:${SANS}"><div style="font-size:26px;font-weight:600;color:${K.ink};letter-spacing:-.01em;white-space:nowrap">${label} — ${price}</div><div class="bk" style="width:96px;height:54px;border-radius:12px;background:${K.ocean};color:#fff;font-size:26px;font-weight:700;display:flex;align-items:center;justify-content:center">Book</div></div>`;}
function dashCard(x,y,w,h,label,val,big_){return `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:22px;background:${K.paper};border:1px solid ${K.sand};padding:20px"><div style="font-family:${SANS};font-size:26px;font-weight:600;color:${K.muted};line-height:1.15">${label}</div><div style="font-family:${SERIF};font-size:${big_||68}px;font-weight:500;color:${K.ink};margin-top:12px;line-height:1">${val}</div></div>`;}
function alertHTML(w){return `<div class="abs" style="left:0;top:0;width:${w}px;border-radius:26px;background:#fff;box-shadow:0 30px 70px rgba(15,58,59,.28);padding:24px;font-family:${SANS}">
  <div style="display:flex;gap:18px;align-items:center"><div style="width:64px;height:64px;border-radius:50%;background:${K.ocean};display:flex;align-items:center;justify-content:center;position:relative">${ico('bell',32,'#fff',2)}<i class="ping" style="position:absolute;inset:0;border-radius:50%;border:3px solid ${K.ocean};opacity:0"></i></div>
  <div><div style="font-size:26px;font-weight:700;letter-spacing:.14em;color:${K.terra}">BOOKING MPYA</div><div style="font-size:34px;font-weight:700;color:${K.ink};line-height:1.15">Mgeni mpya</div></div></div>
  <div style="font-size:28px;font-weight:500;color:${K.muted};margin:14px 0 18px">One Bedroom · usiku 2</div>
  <div style="display:flex;gap:14px"><div style="flex:1;height:64px;border-radius:14px;background:${K.ocean};color:#fff;font-size:28px;font-weight:700;display:flex;align-items:center;justify-content:center">Thibitisha</div><div style="flex:1;height:64px;border-radius:14px;border:2px solid ${K.ocean};color:${K.ocean};font-size:28px;font-weight:700;display:flex;align-items:center;justify-content:center">Fungua</div></div></div>`;}
boot({duration:T.end,T,sfx:SFX,bg:'bright',grain:.03,
 fonts:['800 100px "Plus Jakarta Sans"','700 100px "Plus Jakarta Sans"','600 100px "Plus Jakarta Sans"','700 100px "Bodoni Moda"','500 100px "Cormorant Garamond"','italic 400 100px "Cormorant Garamond"','600 100px "DM Sans"','700 100px "DM Sans"','500 100px "DM Sans"'],
 build(ctx){
  const L=add(ctx.cam,'<div class="L"></div>');
  ph=mkPhone(L,{cy:1140,theme:'br',bg:K.paper});
  // SCREEN A — client website
  pgA=add(ph.pgs,`<div class="pg" style="background:${K.paper}"></div>`);
  scrollA=add(pgA,'<div class="abs" style="left:0;top:0;width:564px;height:1700px"></div>');
  add(scrollA,heroArt());
  add(scrollA,`<div class="abs" style="left:0;top:0;width:564px;height:1000px;background:linear-gradient(180deg,rgba(15,58,59,.55),rgba(15,58,59,0) 22%)"></div>`);
  add(scrollA,`<div class="abs" style="left:0;top:1000px;width:564px;height:700px;background:${K.paper}"></div>`);
  heroEls=[add(scrollA,`<div class="abs" style="left:30px;top:640px;font-family:${SANS};font-size:26px;font-weight:700;letter-spacing:.2em;color:${K.brass2}">APARTMENTS · DODOMA</div>`),
   add(scrollA,`<div class="abs" style="left:30px;top:690px;font-family:${SERIF};font-size:84px;font-weight:500;color:#fff;line-height:.98">Nyumba yako</div>`),
   add(scrollA,`<div class="abs" style="left:30px;top:776px;font-family:${SERIF};font-size:84px;font-weight:400;font-style:italic;color:${K.ivory};line-height:.98">mbali na</div>`),
   add(scrollA,`<div class="abs" style="left:30px;top:862px;font-family:${SERIF};font-size:84px;font-weight:500;color:#fff;line-height:.98">nyumbani.</div>`)];
  add(scrollA,`<div class="abs" style="left:28px;top:112px;display:flex;align-items:center;gap:12px;font-family:${SANS};font-size:26px;font-weight:600;color:#fff">${houseMark(44,'#fff')}<span class="cn"></span></div><div class="abs" style="right:28px;top:108px;height:56px;padding:0 24px;border-radius:999px;background:#fff;color:${K.ink};font-family:${SANS};font-size:26px;font-weight:700;display:flex;align-items:center">Book sasa</div>`);
  add(scrollA,`<div class="abs" style="left:28px;top:1060px;font-family:${SERIF};font-size:58px;font-weight:500;color:${K.ink}">Bei kwa usiku</div>`);
  add(scrollA,priceRow(0,'Studio','TZS 35,000')+priceRow(1,'One Bedroom','TZS 50,000')+priceRow(2,'Two Bedroom','TZS 80,000'));
  scrollA.querySelectorAll('.cn').forEach(e=>e.textContent=CLIENT_NAME);
  btnBook=scrollA.querySelectorAll('.bk')[1];
  // SCREEN B — owner dashboard
  pgB=add(ph.pgs,`<div class="pg" style="background:${K.ivory};opacity:0"></div>`);
  add(pgB,`<div class="abs" style="left:28px;top:112px;font-family:${SERIF};font-size:60px;font-weight:500;color:${K.ink}">Muhtasari</div>`);
  [['Wanaofika leo','2',28,230],['Maombi yanayosubiri','1',290,230],['Booking zinazoendelea','3',28,436],['Mapato yanayotarajiwa','TZS 270,000',290,436]].forEach(([a,b,x,y],i)=>{cardsB.push(add(pgB,dashCard(x,y,246,190,a,b,i===3?44:68)));});
  add(pgB,`<div class="abs" style="left:28px;top:660px;width:508px;height:120px;border-radius:22px;background:${K.paper};border:1px solid ${K.sand}"></div><div class="abs" style="left:28px;top:796px;width:508px;height:120px;border-radius:22px;background:${K.paper};border:1px solid ${K.sand}"></div>`);
  alertC=add(pgB,alertHTML(508).replace('class="abs" style="left:0;top:0;','class="abs" style="left:28px;top:0;'));
  // lifted duplicates (outside the phone)
  capDup=add(ctx.cam,dashCard(0,0,246,190,'Mapato yanayotarajiwa','TZS 270,000',44).replace('class="abs" style="left:0;top:0;','class="abs" style="left:0;top:0;box-shadow:0 40px 80px rgba(15,58,59,.25);'));capDup.style.opacity=0;
  alertDup=add(ctx.fg,alertHTML(508));alertDup.style.opacity=0;
  tagP=add(ctx.cam,`<div class="abs" style="left:0;top:1444px;width:1080px;display:flex;justify-content:center"><div style="height:76px;padding:0 30px 0 22px;border-radius:999px;background:rgba(255,255,255,.86);backdrop-filter:blur(20px);box-shadow:0 20px 50px rgba(36,22,79,.16),inset 0 0 0 1px #fff;display:flex;align-items:center;gap:14px;font-size:34px;font-weight:600;color:#24164F;white-space:nowrap;letter-spacing:-.01em">${houseMark(44,K.ocean)}<span class="cn"></span> · Dodoma · imejengwa na ${logoHTML(38,'br')}</div></div>`);
  tagP.querySelector('.cn').textContent=CLIENT_NAME;
  l1=mkLine(L,{y:355,size:112,color:'#24164F',words:['Tumejenga']});
  l2=mkLine(L,{y:480,size:112,color:'#24164F',words:['mifumo',{t:'halisi.',pill:'violet'}]});
  [['home','#7FD6C8','#2A9D8F',170,100,1560,'fg'],['bed','#FFC9B0','#F0623A',150,985,350,'fg'],['calendar','#C9BBFF','#8C6CFF',100,120,790,'bg'],['star','#FFE08A','#F5A524',100,950,1240,'bg']].forEach(([n,a,b,sz,x,y,pl])=>{const e=mkFloat(pl==='fg'?ctx.fg:ctx.bgf,gloss(n,a,b,sz),x,y,sz,sz);(pl==='fg'?fgI:bgI).push(e);});
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in);
  // headline word by word
  renderLine(l1,t,0.15,{ex:T.exit,exD:.35});renderLine(l2,t,0.35,{ex:T.exit,exD:.35});
  // phone rises, tilts rotateY -12° → -4°
  const pp=P(t,T.phoneIn,D.phone,E.out),ty=P(t,T.phoneIn,1.2,E.inOut);
  ph.apply({x:0,y:(1-pp)*420-100*ex,s:1.0,rx:2,ry:lerp(-12,-4,ty)+1.2*sin(t,5),rz:0,o:clamp((t-T.phoneIn)/.25)*(1-ex)});
  // site: hero lines fade up, page scrolls to the price table; then zoom-through on One Bedroom "Book"
  heroEls.forEach((e,i)=>{const s=T.site+i*D.wordStag,p=P(t,s,.45,E.out);tf(e,{y:(1-p)*30,o:t<T.site?0:clamp((t-s)/.2)});});
  const sc=P(t,1.5,D.scroll,E.inOut);scrollA.style.transform=`translateY(${-780*sc}px)`;
  const zp=P(t,T.swap,D.zoom,E.snap),bx=28+508-22-48,by=1150+122+51-780;
  pgA.style.transformOrigin=`${bx}px ${by}px`;pgA.style.transform=`scale(${lerp(1,9,zp).toFixed(3)})`;pgA.style.opacity=1-clamp((zp-.3)/.5);
  pgB.style.opacity=clamp((zp-.35)/.5);pgB.style.transform=`scale(${lerp(.86,1,zp).toFixed(4)})`;
  btnBook.style.transform=`scale(${squash(t,2.28)})`;
  // dashboard: cards pop in, then the NEW-BOOKING ALERT slides down with a ping
  cardsB.forEach((c,i)=>{const s=T.dash+i*D.cardStag,p=P(t,s,.4,E.pop2);tf(c,{s:lerp(.85,1,p),y:(1-p)*30,o:clamp((t-s)/.1)});});
  const ap=P(t,2.95,D.alert,E.out);tf(alertC,{y:lerp(-420,124,ap)});
  const pg=alertC.querySelector('.ping'),pq=clamp((t-3.0)/.5);pg.style.transform=`scale(${lerp(1,1.7,E.out(pq))})`;pg.style.opacity=t>=3.0?lerp(.5,0,pq):0;
  // depth: duplicates lift out of the phone into side / foreground positions
  const L2=P(t,T.depth,D.lift,E.out),b1=bob(t,1,10,14),b2=bob(t,2,10,14);
  const sA=ph.proj(412,520),sB=ph.proj(282,230);
  tf(capDup,{x:lerp(sA.x-123,800,L2)+b1.x,y:lerp(sA.y-95,1060,L2)+b1.y,s:lerp(1,1.4,L2),ry:-14*L2,o:(t>=T.depth?1:0)*(1-ex)});
  tf(alertDup,{x:lerp(sB.x-254,-120,L2)+b2.x,y:lerp(sB.y,1180,L2)+b2.y,s:lerp(.9,1.15,L2),ry:12*L2,o:(t>=T.depth+.15?.95:0)*(1-ex)*clamp((t-T.depth-.15)/.2),b:9*L2});
  // credit pill
  const tp=P(t,T.tag,D.tag,E.pop);tf(tagP,{y:(1-tp)*50,s:lerp(.9,1,tp),o:clamp((t-T.tag)/.15)*(1-ex)});
  // DOF
  fgI.forEach((e,i)=>{const b=bob(t,i+1,12,16);tf(e,{x:b.x,y:b.y,r:(i?10:-10)+b.r,o:.9*(1-ex),b:16});});
  bgI.forEach((e,i)=>{const b=bob(t,i+5,12,12);tf(e,{x:b.x,y:b.y,r:b.r,o:.6*(1-ex),b:8});});
 }});
