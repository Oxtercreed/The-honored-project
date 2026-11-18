const T={kicker:0.00,price1:0.40,slide1:2.00,price2:2.25,slide2:3.80,bigger:4.05,exit:6.00,end:6.50};
const D={kicker:0.40,pill:0.35,count:0.80,slide:0.25,cascade:2.45,exitD:0.50};
const SFX=[{t:0.00,name:"whoosh-soft"},{t:0.40,name:"pill-grow"},{t:0.55,name:"counter-roll"},{t:1.40,name:"cash-ding"},{t:2.00,name:"slide"},{t:2.40,name:"counter-roll"},{t:3.20,name:"cash-ding"},{t:3.80,name:"slide"},{t:4.05,name:"cascade-whoosh"},{t:4.60,name:"hit-soft"}];
/*==CORE==*/
/* SCENE 13 — PRICES + BIGGER SYSTEMS (bright). Prices are always written in full: "TSh 250,000" / "TSh 500,000". */
let gK,g1,g2,gC,pills=[],nums=[],labs=[],spark=[],cols=[],panel,pl0,pl1,pl2,kick,sizeFix={};
function pill(parent,y,color,final,labelHTML,id){
  const lab=add(parent,`<div class="abs" style="left:0;top:${y-255}px;width:1080px;display:flex;align-items:center;justify-content:center;gap:24px;font-size:${id?64:72}px;font-weight:800;letter-spacing:-.03em;color:#24164F;white-space:nowrap">${labelHTML}</div>`);
  const box=add(parent,`<div class="abs" style="left:70px;top:${y-130}px;width:940px;height:260px;transform-origin:30% 50%"><div class="pb" style="position:absolute;inset:0;border-radius:999px;background:${color};box-shadow:0 40px 90px rgba(36,22,79,.22);transform-origin:0 50%;transform:scaleX(0)"></div>
    <div class="ct" style="position:absolute;left:84px;top:0;height:260px;display:flex;flex-direction:column;justify-content:center;color:#fff;opacity:0"><div style="font-size:40px;font-weight:600;opacity:.88;line-height:1.1">kuanzia</div><div class="num tab" style="font-size:132px;font-weight:800;letter-spacing:-.03em;line-height:1;white-space:nowrap">TSh 0</div></div></div>`);
  return {lab,box,pb:box.querySelector('.pb'),ct:box.querySelector('.ct'),num:box.querySelector('.num'),final};
}
function ui(k){ // phone-shaped project cards, shape-only UIs
  const hd=(c)=>`<div class="abs" style="left:0;top:0;width:300px;height:96px;background:${c}"></div><div class="abs" style="left:112px;top:18px;width:76px;height:22px;border-radius:11px;background:#000"></div>`;
  const row=(y,w,c='#EEE9FC')=>`<div class="abs" style="left:24px;top:${y}px;width:${w}px;height:20px;border-radius:10px;background:${c}"></div>`;
  let b='';
  if(k===0){b=hd('#24164F')+[0,1,2,3].map(i=>`<div class="abs" style="left:${24+(i%2)*132}px;top:${124+Math.floor(i/2)*132}px;width:120px;height:120px;border-radius:24px;background:${['#D6CBFF','#FFC9B0','#DCEBFF','#CFE8DD'][i]}"></div>`).join('')+row(420,252)+row(456,170)+`<div class="abs" style="left:24px;top:520px;width:252px;height:72px;border-radius:999px;background:#6C4CF5"></div>`;}
  if(k===1){b=hd('#139A6A')+[0,1,2,3,4].map(i=>`<div class="abs" style="left:24px;top:${120+i*96}px;width:252px;height:76px;border-radius:20px;background:#F6F4FF"><div class="abs" style="left:16px;top:16px;width:44px;height:44px;border-radius:12px;background:#E4DEFA"></div><div class="abs" style="left:74px;top:18px;width:${100+i*14}px;height:14px;border-radius:7px;background:#E4DEFA"></div><div class="abs" style="left:74px;top:44px;width:${60+i*12}px;height:12px;border-radius:6px;background:${i===1?'#FF8A65':'#C9F0DA'}"></div></div>`).join('');}
  if(k===2){b=hd('#6C4CF5')+`<svg class="abs" style="left:70px;top:130px" width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="62" fill="none" stroke="#EEE9FC" stroke-width="20"/><circle cx="80" cy="80" r="62" fill="none" stroke="#22C55E" stroke-width="20" stroke-linecap="round" stroke-dasharray="270 400" transform="rotate(-90 80 80)"/></svg>`+[0,1,2,3].map(i=>row(330+i*64,252-i*20)).join('');}
  if(k===3){b=`<div class="abs" style="left:0;top:0;width:300px;height:460px;background:#DCEBFF"></div><svg class="abs" style="left:0;top:0" width="300" height="460" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round"><path d="M-10 120L120 160L200 300L320 330M60 -10L110 470M240 -10L200 470"/><path d="M40 400C90 330 130 250 230 110" stroke="#6C4CF5" stroke-width="10" stroke-dasharray="4 18"/></svg><div class="abs" style="left:206px;top:70px;width:48px;height:48px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#FF8A65"></div><div class="abs" style="left:0;top:440px;width:300px;height:180px;border-radius:32px 32px 0 0;background:#fff">${row(34,200)}${row(70,130)}<div class="abs" style="left:24px;top:108px;width:252px;height:44px;border-radius:999px;background:#6C4CF5"></div></div>`+hd('rgba(255,255,255,0)');}
  if(k===4){b=`<div class="abs" style="left:0;top:0;width:300px;height:260px;background:linear-gradient(160deg,#9C84FF,#FF8A65)"></div><div class="abs" style="left:112px;top:18px;width:76px;height:22px;border-radius:11px;background:#000"></div>`+[0,1,2,3,4,5,6,7].map(i=>`<div class="abs" style="left:${24+(i%4)*66}px;top:${300+Math.floor(i/4)*82}px;width:54px;height:54px;border-radius:16px;background:${['#D6CBFF','#FFC9B0','#DCEBFF','#CFE8DD'][i%4]}"></div>`).join('')+row(480,200)+row(516,130);}
  if(k===5){b=hd('#0F3A3B')+[...Array(28)].map((_,i)=>{const r=Math.floor(i/7),c=i%7,on=i>=9&&i<=13;return `<div class="abs" style="left:${14+c*38}px;top:${126+r*54}px;width:32px;height:40px;border-radius:10px;background:${on?'#6C4CF5':'#F3F0FF'}"></div>`;}).join('')+row(400,252)+`<div class="abs" style="left:24px;top:450px;width:252px;height:84px;border-radius:20px;background:#E9E3FF"></div>`;}
  return `<div class="abs" style="left:0;top:0;width:300px;height:620px;border-radius:40px;background:#fff;box-shadow:0 30px 70px rgba(36,22,79,.2),0 0 0 6px #fff;overflow:hidden">${b}</div>`;
}
boot({duration:T.end,T,sfx:SFX,bg:'bright',grain:.03,
 build(ctx){
  g1=add(ctx.cam,'<div class="L"></div>');g2=add(ctx.cam,'<div class="L"></div>');gC=add(ctx.cam,'<div class="L"></div>');
  kick=mkLine(g1,{y:420,size:60,weight:700,color:'#6B6890',words:['Bei?']});
  pills[0]=pill(g1,820,'#6C4CF5','TSh 250,000',`${gloss('globe','#8C6CFF','#5A3AE0',104)}<span>Website</span>`);
  pills[1]=pill(g2,820,'#FF8A65','TSh 500,000',`${gloss('calendar','#FFB27A','#F0623A',96)}<span>Booking au web app</span>`,1);
  for(let i=0;i<8;i++){const a=RND()*6.283,d=120+RND()*140;spark.push({a,d,e:add(g1,`<div class="abs" style="left:0;top:0;opacity:0">${ico('sparkle',46,'#FFD36B',2).replace('fill="none"','fill="#FFE08A"')}</div>`)});}
  // cascade: 3 columns of phone-shaped cards (outer 1x blurred, centre 1.4x sharp)
  const cfg=[{x:180,s:1,b:6,y0:1850,y1:-420,order:[0,3,1,4]},{x:540,s:1.4,b:0,y0:2200,y1:-1150,order:[2,5,0,3]},{x:900,s:1,b:6,y0:1950,y1:-520,order:[4,1,5,2]}];
  cfg.forEach(c=>{const col=add(gC,`<div class="abs" style="left:${c.x-150}px;top:0;width:300px;height:3000px;transform-origin:150px 0"></div>`);c.order.forEach((k,i)=>{const e=add(col,`<div class="abs" style="left:0;top:${i*660}px;width:300px;height:620px"></div>`);e.innerHTML=ui(k);});cols.push({col,...c});});
  panel=add(ctx.fg,`<div class="abs" style="left:90px;top:1090px;width:900px;height:330px;border-radius:48px;background:rgba(255,255,255,.82);backdrop-filter:blur(24px);box-shadow:0 40px 90px rgba(36,22,79,.18),inset 0 0 0 1px #fff"></div>`);
  pl0=mkLine(ctx.fg,{y:1166,size:80,color:'#24164F',words:['Mifumo','mikubwa?'],maxW:800});
  pl1=mkLine(ctx.fg,{y:1260,size:52,weight:700,color:'#24164F',words:['Tunakupa','bei','baada','ya'],maxW:800});
  pl2=mkLine(ctx.fg,{y:1330,size:52,weight:700,color:'#24164F',words:['kuelewa',{t:'mahitaji&nbsp;yako.',pill:'peach'}],maxW:800});
 },
 afterFonts(){ // lock the number size so the biggest string fits the pill without digit jitter
  pills.forEach(p=>{p.num.textContent=p.final;p.num.style.fontSize='132px';const w=p.num.offsetWidth,mx=800;if(w>mx)p.num.style.fontSize=(132*mx/w)+'px';p.num.style.minWidth=p.num.offsetWidth+'px';p.num.textContent='TSh 0';});
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in);
  const s1=P(t,T.slide1,D.slide,E.snap),s2=P(t,T.slide2,D.slide,E.snap);
  tf(g1,{y:-1300*s1});tf(g2,{y:(1-s1)*1300-1300*s2});tf(gC,{y:(1-s2)*1500});
  renderLine(kick,t,T.kicker,{});
  // price 1 — Website: pill grows, number counts, lands at ~1.40 with a pop + sparkle
  const run=(p,s,land,i)=>{const pg=P(t,s,D.pill,E.out);p.pb.style.transform=`scaleX(${pg})`;
    const cp=P(t,s+.2,D.count,E.out);p.num.textContent='TSh '+fmt(+p.final.replace(/\D/g,'')*cp);
    p.ct.style.opacity=clamp((t-s-.08)/.12);const lp=P(t,land,.4,E.pop);const sc=t>=land?lerp(1.04,1,lp):1;tf(p.box,{s:sc});
    const lb=P(t,s-.1,.4,E.out);tf(p.lab,{y:(1-lb)*50,o:clamp((t-s+.1)/.2)});};
  run(pills[0],T.price1,1.40);run(pills[1],T.price2,3.20);
  spark.forEach((s,i)=>{const q=clamp((t-1.4)/.6),e=E.out(q);tf(s.e,{x:800+Math.cos(s.a)*s.d*e,y:760+Math.sin(s.a)*s.d*e,s:Math.sin(Math.PI*q)*1.1,r:q*120,o:t<1.4?0:1});});
  // bigger systems: vertical cascade in 3 columns, E.soft, then speeds up on exit
  const q=P(t,T.bigger,D.cascade,E.soft);
  cols.forEach(c=>{const y=lerp(c.y0,c.y1,q)-(c.s>1?1:.7)*900*ex*ex;tf(c.col,{y,s:c.s,b:c.b,o:(1-ex)});});
  tf(panel,{y:(1-P(t,4.3,.55,E.out))*500-0,o:clamp((t-4.3)/.3)*(1-ex)});
  const pe=1-ex;
  renderLine(pl0,t,4.40,{ex:T.exit,exD:.3,stag:.1});renderLine(pl1,t,4.60,{ex:T.exit,exD:.3});renderLine(pl2,t,4.60+4*.07,{ex:T.exit,exD:.3,stag:.1});
 }});
