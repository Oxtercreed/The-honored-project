//@use desk
const T={enter:0.00,pile:0.20,clash:0.70,slideCut:1.20,commission:1.50,kinetic:1.90,exit:3.10,end:3.50};
const D={enter:0.25,notif:0.45,stag:0.15,circle:0.30,slide:0.30,count:0.90,exitD:0.40};
const SFX=[{t:0.20,name:"notif"},{t:0.35,name:"notif"},{t:0.50,name:"notif"},{t:0.65,name:"notif"},{t:0.80,name:"notif"},{t:0.70,name:"scribble"},{t:1.20,name:"slide"},{t:1.70,name:"cut"},{t:1.75,name:"coin-drain"},{t:1.90,name:"hit"}];
/*==CORE==*/
/* SCENE 04 — PROBLEM C: BOOKING CHAOS + COMMISSION (dark) */
const BUB=[ // text, side, x, y, depth
 {t:'Asha: Kesho saa 3?',x:50,y:470,fg:0,s:0},{t:'Simu ulizokosa (5)',x:560,y:620,fg:1,s:1,miss:1},{t:'Juma: Nimefika, mko wapi?',x:44,y:1440,fg:0,s:2},
 {t:'Grace: Jumamosi?',x:560,y:1480,fg:0,s:3},{t:'Asha: ??',x:-30,y:1000,fg:1,s:4}];
let gA,gB,nb,circ,scrib,bubs=[],card,pill,priceEl,slice,amt,coins=[],l1,l2,fgA;
boot({duration:T.end,T,sfx:SFX,bg:'dark',grain:.04,
 build(ctx){
  gA=add(ctx.cam,'<div class="L"></div>');gB=add(ctx.cam,'<div class="L"></div>');fgA=add(ctx.fg,'<div class="L"></div>');
  // notebook (top-down, rotated -4°) with two clashing 10:00 rows
  nb=add(gA,`<div class="abs" style="left:130px;top:760px;width:820px;height:640px;transform-origin:50% 50%">${notebookOpen(820,640)}
    <div class="noteRow abs" style="left:450px;top:134px;width:320px;text-align:right;font-size:40px;line-height:72px">Asha — 10:00</div>
    <div class="noteRow abs" style="left:450px;top:206px;width:320px;text-align:right;font-size:40px;line-height:72px">Grace — 10:00</div>
    <svg class="abs" style="left:0;top:0" width="820" height="640" viewBox="0 0 820 640" fill="none" stroke-linecap="round">
      <path d="M46 200q60-14 120 0M46 272q80 10 150-4M46 344q50-10 110 2M46 416q90 8 170-6" stroke="#3b3b3b" stroke-opacity=".35" stroke-width="5"/>
      <ellipse id="clashC" cx="724" cy="214" rx="86" ry="74" stroke="#FF4D5E" stroke-width="7" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-8 724 214)"/>
      <path id="scribL" d="M452 246l316-8M452 262l316-10M452 278l316-6M452 232l316 -4" stroke="#FF4D5E" stroke-width="6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" opacity=".95"/></svg></div>`);
  circ=nb.querySelector('#clashC');scrib=nb.querySelector('#scribL');
  BUB.forEach((b,i)=>{
    const html=ncardHTML({theme:'dk',w:b.fg?600:520,title:b.t,body:'',icon:b.miss?ico('phone',38,'#fff'):ico('chat',38,'#fff'),iconBg:b.miss?'#FF4D5E':'#25A06B',pingColor:b.miss?'#FF4D5E':'#25A06B',style:`left:${b.x}px;top:${b.y}px;`});
    const e=add(b.fg?fgA:gA,html);bubs.push(e);
  });
  // commission panel
  card=add(gB,`<div class="abs" style="left:56px;top:690px;width:560px;height:680px;border-radius:40px;background:#111821;border:1px solid rgba(255,255,255,.08);box-shadow:0 50px 120px rgba(0,0,0,.65),0 0 60px rgba(20,184,166,.12);overflow:hidden">
    <div class="abs" style="left:0;top:0;width:560px;height:88px;background:#2B6CB0;display:flex;align-items:center;gap:16px;padding:0 28px;color:#fff;font-size:30px;font-weight:700"><i style="width:34px;height:34px;border-radius:9px;background:#fff;opacity:.9;display:block"></i>BookPlatform</div>
    <svg data-slot="room-thumb" class="abs" style="left:0;top:88px" width="560" height="250" viewBox="0 0 520 230" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="rt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A3A4A"/><stop offset="1" stop-color="#3B3A3E"/></linearGradient></defs><rect width="520" height="230" fill="url(#rt)"/><rect x="330" y="26" width="140" height="110" rx="10" fill="#8FB4D8" opacity=".55"/><rect x="40" y="120" width="300" height="80" rx="18" fill="#5A6C80"/><rect x="40" y="96" width="120" height="50" rx="16" fill="#7B8CA0"/><rect x="190" y="104" width="130" height="42" rx="14" fill="#7B8CA0"/></svg>
    <div class="abs tab" id="price" style="left:30px;top:366px;font-size:52px;font-weight:800;color:#F2F5F8;line-height:1">TSh 100,000</div>
    <div class="abs" style="left:30px;top:488px;font-size:30px;font-weight:600;color:#8A97A6">Unapokea:</div>
    <div class="abs tab" id="amt" style="left:30px;top:534px;font-size:68px;font-weight:800;line-height:1;color:#F2F5F8">TSh 100,000</div>
    <svg class="abs" style="left:0;top:0" width="560" height="680"><path id="slice" d="M16 446L330 352" stroke="#FF4D5E" stroke-width="9" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg></div>`);
  priceEl=card.querySelector('#price');amt=card.querySelector('#amt');slice=card.querySelector('#slice');
  pill=add(gB,`<div class="abs pill" style="right:60px;top:1034px;height:96px;padding:0 34px 0 86px;background:#FF4D5E;color:#fff;font-size:34px;box-shadow:0 20px 40px rgba(255,77,94,.35)">−15–25% kamisheni</div>`);
  card.style.zIndex=2;pill.style.zIndex=1;
  for(let i=0;i<4;i++)coins.push(add(gB,`<div class="abs" style="width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FDE68A,#F5B544 60%,#B7793E);box-shadow:inset 0 0 0 5px rgba(183,121,62,.5),0 6px 14px rgba(0,0,0,.4);left:0;top:0;opacity:0"></div>`));
  l1=mkLine(ctx.cam,{y:385,size:130,color:'#F2F5F8',words:['Booking','ni']});
  l2=mkLine(ctx.cam,{y:545,size:150,color:'#F2F5F8',words:[{t:'fujo.',pill:'pain'}]});
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in), pe=P(t,T.enter,D.enter,E.out);
  const sl=P(t,T.slideCut,D.slide,E.snap);
  // part 1: notebook rises in, then everything is pushed UP and out
  const upY=-2100*sl;
  tf(gA,{y:upY});tf(fgA,{y:upY});
  tf(nb,{y:(1-pe)*40,r:-4,o:clamp(t/D.enter)});
  draw(circ,P(t,T.clash,D.circle,E.out));draw(scrib,P(t,.95,.25,E.out));
  // chat pile: pop one after another, alternating L/R, two big blurred in front
  bubs.forEach((e,i)=>{const b=BUB[i],s=T.pile+i*D.stag,c=cardPop(e,t,s);
    const fgd=b.fg;tf(e,{y:c.y+bob(t,i,6,10).y,s:c.s*(fgd?1.25:1),o:c.o*(fgd?.82:1),b:fgd?16:0});});
  // part 2: commission panel arrives from below
  const gy=(1-sl)*1900; tf(gB,{y:gy+60*ex*0});
  // red line slices the price; pill slides out to the right; amount counts DOWN
  draw(slice,P(t,1.70,.18,E.out));
  tf(pill,{x:-520*(1-P(t,1.72,.40,E.out)),o:t>=1.72?1:0});
  const v=lerp(100000,75000,P(t,1.75,D.count,E.out));amt.textContent='TSh '+fmt(v);
  const rd=P(t,1.75,D.count,E.out);amt.style.color=`rgb(${Math.round(lerp(242,255,rd))},${Math.round(lerp(245,77,rd))},${Math.round(lerp(248,94,rd))})`;
  coins.forEach((c,i)=>{const s=1.75+i*.07,q=clamp((t-s)/.75),e=E.out(q);
    const sx=330+i*24,sy=1300,ex2=840+i*40,ey=720-i*50,cx=480+i*30,cy=1000-i*60;
    const x=(1-e)*(1-e)*sx+2*(1-e)*e*cx+e*e*ex2,y=(1-e)*(1-e)*sy+2*(1-e)*e*cy+e*e*ey;
    tf(c,{x,y,r:e*360,s:lerp(1,.7,e),o:t<s?0:(1-clamp((q-.55)/.45))});});
  // kinetic
  renderLine(l1,t,T.kinetic,{ex:T.exit,exD:.3,dy:0});renderLine(l2,t,T.kinetic+.14,{ex:T.exit,exD:.3});
  // exit: everything falls away
  if(t>=T.exit){const y=80*ex;tf(gB,{y:gy+y,o:1-ex,b:6*ex});}
 }});
