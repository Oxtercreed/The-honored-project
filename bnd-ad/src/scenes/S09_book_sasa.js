//@use profile
const T={enter:0.00,tapBook:0.25,pickSlot:0.50,confirm:1.30,done:1.45,toOwner:2.10,notifs:2.40,zeroCommission:3.40,exit:4.90,end:5.50};
const D={enter:0.25,sheet:0.40,confetti:0.60,owner:0.30,card:0.45,wordStag:0.07,exitD:0.45};
const SFX=[{t:0.30,name:"tap"},{t:0.50,name:"sheet-up"},{t:0.70,name:"tap"},{t:1.00,name:"tap"},{t:1.05,name:"float-pop"},{t:1.35,name:"tap"},{t:1.45,name:"success-chime"},{t:1.50,name:"confetti"},{t:2.10,name:"snap"},{t:2.40,name:"notif-ding"},{t:2.75,name:"notif-soft"},{t:3.10,name:"notif-soft"},{t:3.40,name:"whoosh"},{t:3.90,name:"hit-bright"}];
/*==CORE==*/
/* SCENE 09 — FIX B+C: "Book sasa" → confirmed → "Booking mpya!" → 0% kamisheni. Mirrors S03 (same framing + button position) and S04. */
const NOTIFS=[['Kusuka · Jms 22, 11:30','sasa hivi'],['Asha · Ijm 21, 10:00',''],['Grace · Jms 22, 14:00','']];
const SLOT={day:[[36,'Ijm 21'],[198,'Jms 22'],[360,'Jpl 23']],time:[[36,'10:00'],[198,'11:30'],[360,'14:00']]};
let ph,PR,tap,sheet,chipsD=[],chipsT=[],conf=[],doneV,checkP,owner,cards=[],big,l1,l2,calC,timeC,belF,chkF,bgc=[],pgA;
function nCard(w,k){ // in-phone (k=1) or large (k=1.6) booking card
  const [body,tm]=k;return '';
}
function cardHTML(w,fs,body,time,theme){
  return `<div class="nc br" style="width:${w}px;padding:${fs*.7}px ${fs*.85}px;gap:${fs*.65}px;border-radius:${fs*1.1}px">
   <div class="ni" style="width:${fs*2.1}px;height:${fs*2.1}px;border-radius:${fs*.62}px;background:#6C4CF5">${ico('bell',fs*1.2,'#fff')}<i class="ping" style="border-color:#6C4CF5;border-radius:${fs*.62}px"></i></div>
   <div style="flex:1;min-width:0"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px"><span style="font-size:${fs}px;font-weight:700">Booking mpya!</span>${time?`<span style="font-size:${Math.max(26,fs*.8)}px;font-weight:500;opacity:.55">${time}</span>`:''}</div>
   <div style="font-size:${fs*.88}px;font-weight:500;opacity:.85;margin-top:2px">${body}</div>
   <div style="display:inline-flex;align-items:center;gap:8px;margin-top:10px;padding:6px 16px;border-radius:999px;background:rgba(34,197,94,.15);color:#15803D;font-size:${Math.max(26,fs*.8)}px;font-weight:700">${ico('check',Math.max(22,fs*.8),'#15803D',3)}Hakuna mgongano</div></div><i class="fl"></i></div>`;
}
boot({duration:T.end,T,sfx:SFX,bg:'bright',grain:.03,
 build(ctx){
  const L=add(ctx.cam,'<div class="L"></div>');
  ph=mkPhone(L,{cy:1000,theme:'br',bg:'#fff'});
  PR=profilePage(ph,'br');pgA=PR.pg;
  // bottom sheet "Chagua muda"
  sheet=add(pgA,`<div class="abs" style="left:0;top:590px;width:564px;height:614px;border-radius:40px 40px 0 0;background:#fff;box-shadow:0 -20px 50px rgba(36,22,79,.14)">
    <div class="abs" style="left:222px;top:14px;width:120px;height:8px;border-radius:4px;background:#E4DEFA"></div>
    <div class="abs" style="left:36px;top:44px;font-size:34px;font-weight:700;color:#24164F">Chagua muda</div></div>`);
  SLOT.day.forEach(([x,tx])=>chipsD.push(add(sheet,`<div class="abs pill" style="left:${x}px;top:110px;width:150px;height:76px;background:#F3F0FF;color:#24164F;font-size:30px">${tx}</div>`)));
  SLOT.time.forEach(([x,tx])=>chipsT.push(add(sheet,`<div class="abs pill" style="left:${x}px;top:246px;width:150px;height:76px;background:#FFE4D6;color:#24164F;font-size:30px">${tx}</div>`)));
  const conf_=add(sheet,`<div class="abs pill" id="conf" style="left:36px;top:406px;width:492px;height:96px;background:#6C4CF5;color:#fff;font-size:34px;box-shadow:0 14px 30px rgba(108,76,245,.35)">Thibitisha</div>`);
  sheet.conf=conf_;
  // done view
  doneV=add(pgA,`<div class="abs" style="left:0;top:640px;width:564px;height:400px;opacity:0">
    <svg class="abs" style="left:182px;top:0" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="92" fill="#22C55E"/><path id="ck" d="M56 104l30 30 60-66" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/></svg>
    <div class="abs" style="left:0;top:228px;width:564px;text-align:center;font-size:48px;font-weight:800;color:#24164F">Umebook!</div>
    <div class="abs" style="left:0;top:296px;width:564px;text-align:center;font-size:28px;font-weight:600;color:#6B6890">Jms 22 · 11:30</div></div>`);
  checkP=doneV.querySelector('#ck');
  // owner view
  owner=add(ph.pgs,`<div class="pg" style="background:#F7F5FF;transform:translateX(564px)"></div>`);
  add(owner,`<div class="abs" style="left:36px;top:130px">${gloss('bell','#9C84FF','#5A3AE0',96)}</div><div class="abs" style="left:152px;top:150px;width:260px;height:20px;border-radius:10px;background:#E4DEFA"></div><div class="abs" style="left:152px;top:190px;width:170px;height:16px;border-radius:8px;background:#EEE9FC"></div>`);
  NOTIFS.forEach(([b,tm],i)=>cards.push(add(owner,cardHTML(508,32,b,tm).replace('class="nc br" style="','class="nc br" style="left:28px;top:300px;'))));
  // large legible copy outside the phone
  big=add(L,cardHTML(820,50,NOTIFS[0][0],NOTIFS[0][1]).replace('class="nc br" style="','class="nc br" style="left:130px;top:370px;'));
  // confetti (seeded once)
  const cols=['#6C4CF5','#FF8A65','#22C55E','#FFC9B0','#D6CBFF','#7FB3FF'];
  for(let i=0;i<12;i++){const a=RND()*Math.PI*2,d=240+RND()*220,sh=RND()>.5;
    conf.push({a,d,r:RND()*360,e:add(L,`<div class="abs" style="left:0;top:0;width:${sh?18:26}px;height:${sh?18:12}px;border-radius:${sh?'50%':'4px'};background:${cols[i%6]};opacity:0"></div>`)});}
  l1=mkLine(L,{y:1335,size:110,color:'#24164F',words:['Booking','zako,']});
  l2=mkLine(L,{y:1480,size:110,color:'#24164F',words:[{t:'0%',pill:'success',fs:1.36},'kamisheni.']});
  // sleeko floating cards
  calC=add(L,`<div class="abs" style="left:0;top:0;width:250px;height:290px;margin:-145px 0 0 -125px;border-radius:36px;background:#fff;box-shadow:0 40px 90px rgba(36,22,79,.22),0 12px 28px rgba(36,22,79,.10);overflow:hidden;opacity:0"><div style="height:84px;background:linear-gradient(160deg,#8C6CFF,#5A3AE0);display:flex;align-items:center;justify-content:center;color:#fff;font-size:30px;font-weight:700;gap:10px">${ico('calendar',34,'#fff',2.2)}Ago</div><div style="font-size:84px;font-weight:800;color:#24164F;text-align:center;margin-top:18px;line-height:1">22</div><div style="text-align:center;font-size:34px;font-weight:700;color:#6B6890;margin-top:10px">Jms 22</div></div>`);
  timeC=add(ctx.fg,`<div class="abs" style="left:0;top:0;width:260px;height:150px;margin:-75px 0 0 -130px;border-radius:34px;background:#fff;box-shadow:0 40px 90px rgba(36,22,79,.22);display:flex;align-items:center;justify-content:center;gap:12px;font-size:58px;font-weight:800;color:#24164F;opacity:0">${ico('clock',48,'#6C4CF5',2.4)}11:30</div>`);
  belF=mkFloat(ctx.fg,gloss('bell','#9C84FF','#5A3AE0',190),90,1660,190,190);chkF=mkFloat(ctx.fg,gloss('check','#5EE29A','#16A34A',170),975,360,170,170);
  [['calendar',150,1210,'Jms 22'],['clock',930,520,'11:30'],['calendar',130,560,'Ijm 21']].forEach(([ic,x,y])=>bgc.push(mkFloat(ctx.bgf,gloss(ic,'#C9BBFF','#8C6CFF',100),x,y,100,100)));
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in),pe=P(t,T.enter,D.enter,E.out);
  const pz=P(t,T.zeroCommission,.6,E.inOut);
  ph.apply({x:0,y:-90*ex-260*pz,s:lerp(1.15,1.3,pe)*(1-.385*pz),rx:0,ry:-10-1.2*sin(t,4),rz:3,o:clamp(t/.2)*(1-ex)});
  // taps: Book sasa (0.30), Jms 22 (0.70), 11:30 (1.00), Thibitisha (1.35) — confident, no hesitation
  const pBook=ph.proj(282,548),pD=ph.proj(273,590+148),pT=ph.proj(273,590+284),pC=ph.proj(282,590+454);
  let pos,key=[.3,.7,1.0,1.35];
  const seg=(a,b,s,d)=>({x:lerp(a.x,b.x,P(t,s,d,E.inOut)),y:lerp(a.y,b.y,P(t,s,d,E.inOut))});
  const st={x:pBook.x+260,y:pBook.y+420};
  if(t<.3)pos=seg(st,pBook,.04,.26);else if(t<.7)pos=seg(pBook,pD,.38,.3);else if(t<1.0)pos=seg(pD,pT,.78,.2);else pos=seg(pT,pC,1.08,.22);
  tapRender(tap||(tap=mkTap(ctx.cam,'br')),t,pos,key,clamp((t-.04)/.08)*(1-P(t,1.5,.2)));
  PR.btn.style.transform=`scale(${squash(t,.3)})`;
  // bottom sheet slides up
  const sp=P(t,T.pickSlot,D.sheet,E.out);sheet.style.transform=`translateY(${(1-sp)*620}px)`;
  const dayV=P(t,.70,.15),timeV=P(t,1.00,.15);
  chipsD.forEach((c,i)=>{const on=i===1?dayV:0;c.style.background=mix('#F3F0FF','#6C4CF5',on);c.style.color=mix('#24164F','#ffffff',on);c.style.transform=i===1?`scale(${squash(t,.70)})`:'none';});
  chipsT.forEach((c,i)=>{const on=i===1?timeV:0;c.style.background=mix('#FFE4D6','#6C4CF5',on);c.style.color=mix('#24164F','#ffffff',on);c.style.transform=i===1?`scale(${squash(t,1.00)})`:'none';});
  sheet.conf.style.transform=`scale(${squash(t,1.35)})`;
  // sleeko moment: glossy date + time cards float out of the phone
  const cb=bob(t,5,8,14),tb=bob(t,6,8,14),fo=P(t,1.05,.5,E.pop2),fx=1-P(t,2.1,.3,E.in);
  const cL=ph.proj(60,420),cR=ph.proj(540,780);
  tf(calC,{x:lerp(cL.x+60,150,fo)+cb.x,y:lerp(cL.y,720,fo)+cb.y,r:-8+cb.r,s:lerp(.5,1,fo),o:(t>=1.05?1:0)*fx*(1-ex)});
  tf(timeC,{x:lerp(cR.x-60,905,fo)+tb.x,y:lerp(cR.y,1120,fo)+tb.y,r:7+tb.r,s:lerp(.5,1.15,fo),o:(t>=1.05?1:0)*.95*fx*(1-ex),b:5*fo});
  // confirm → done: green check draws; confetti burst
  const dv=clamp((t-1.45)/.2);
  doneV.style.opacity=dv*(1-clamp((t-2.0)/.1));sheet.style.opacity=1-clamp((t-1.38)/.1)*1;
  draw(checkP,P(t,1.50,.4,E.out));
  doneV.style.transform=`scale(${lerp(.9,1,P(t,1.45,.4,E.pop)).toFixed(3)})`;
  const cc=ph.proj(282,740);
  conf.forEach((c,i)=>{const q=clamp((t-1.5)/D.confetti),e=E.out(q);tf(c.e,{x:cc.x+Math.cos(c.a)*c.d*e,y:cc.y+Math.sin(c.a)*c.d*e+120*q*q,r:c.r+q*300,o:t<1.5?0:1-clamp((t-1.75)/.35)});});
  // toOwner: screen snaps to the owner view
  const op=P(t,T.toOwner,D.owner,E.snap);
  pgA.style.transform=`translateX(${-564*op}px)`;doneV.parentNode===pgA;owner.style.transform=`translateX(${564*(1-op)}px)`;
  // notifications pop and stack; each new one pushes the older ones down 24px and scales them to .96
  const starts=[2.40,2.75,3.10];
  const slideUp=0;
  cards.forEach((c,i)=>{let y=0,sc=1;const own=starts[i];
    for(let j=i+1;j<3;j++){const q=P(t,starts[j],.4,E.out);y+=q*(c.offsetHeight+24);sc*=lerp(1,.96,q);}
    const cp=cardPop(c,t,own);tf(c,{y:cp.y+y-slideUp*420,s:cp.s*sc*lerp(1,.86,slideUp),o:cp.o*(1-slideUp*.0)*(1-clamp((slideUp-.7)/.3))});});
  const bp=cardPop(big,t,2.40);tf(big,{y:bp.y-slideUp*160,s:bp.s,o:bp.o*(1-P(t,T.zeroCommission,.35,E.in))});
  // lower band kinetic
  renderLine(l1,t,3.40,{ex:T.exit,exD:.3});renderLine(l2,t,3.75,{stag:.14,ex:T.exit,exD:.3});
  // DOF
  const b1=bob(t,1,10,16),b2=bob(t,2,10,16);
  tf(belF,{x:b1.x,y:b1.y,r:-12+b1.r,o:.9*(1-ex),b:18});tf(chkF,{x:b2.x,y:b2.y,r:10+b2.r,o:.9*(1-ex),b:16});
  bgc.forEach((e,i)=>{const b=bob(t,i+7,12,12);tf(e,{x:b.x,y:b.y-16*t,r:b.r,o:.55*(1-ex),b:8});});
 }});
function mix(a,b,p){const pa=[1,3,5].map(i=>parseInt(a.substr(i,2),16)),pb=[1,3,5].map(i=>parseInt(b.substr(i,2),16));return `rgb(${pa.map((v,i)=>Math.round(lerp(v,pb[i],p))).join(',')})`;}
