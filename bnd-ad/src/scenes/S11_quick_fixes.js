const T={bei:0.00,oda:0.80,app:1.60,stock:2.40,exit:3.20,end:3.60};
const D={slide:0.20,beat:0.80,capStart:0.06,exitD:0.40};
const SFX=[{t:0.00,name:"slide-snap"},{t:0.15,name:"list-pops"},{t:0.80,name:"slide-snap"},{t:0.95,name:"card-slides"},{t:1.60,name:"slide-snap"},{t:1.75,name:"drop-bounce"},{t:1.90,name:"sparkle"},{t:2.40,name:"slide-snap"},{t:2.60,name:"tick"}];
/*==CORE==*/
/* SCENE 11 — FIX E: QUICK-FIX MONTAGE (bright). Beat-for-beat mirror of S06: same tilts, same timing, same app-icon slot. Vertical slides instead of hard cuts. */
const TILT=[-8,7,-5,9], STARTS=[T.bei,T.oda,T.app,T.stock];
const CAPS=[{w:['Bei','zote,',{t:'online.',pill:'violet'}]},{w:['Oda','zote,',{t:'sehemu&nbsp;moja.',pill:'peach'}]},{w:['App','yako',{t:'mwenyewe.',pill:'violet'}]},{w:['Stock,',{t:'live.',pill:'success'}]}];
let V=[],rows1=[],cards2=[],icon3,spark=[],lab3,num4,bars4=[],dot4;
function vig(ctx,i,bg){
  const c=add(ctx.cam,'<div class="L" style="visibility:hidden"></div>');
  const ph=mkPhone(c,{cy:1060,theme:'br',bg});
  const plate=add(c,'<div class="abs" style="left:36px;top:322px;width:1008px;height:216px;border-radius:72px;background:rgba(255,255,255,.66);backdrop-filter:blur(18px);box-shadow:0 24px 60px rgba(36,22,79,.12),inset 0 0 0 1px rgba(255,255,255,.9)"></div>');
  const cap=mkLine(c,{y:430,size:120,color:'#24164F',words:CAPS[i].w});
  return {c,ph,cap,plate};
}
const skel=(pg,top,n)=>{for(let i=0;i<n;i++)add(pg,`<div class="abs" style="left:28px;top:${top+i*112}px;width:508px;height:92px;border-radius:24px;background:#F6F4FF"><div class="abs" style="left:24px;top:22px;width:48px;height:48px;border-radius:14px;background:#E4DEFA"></div><div class="abs" style="left:92px;top:28px;width:${180+(i*47)%90}px;height:16px;border-radius:8px;background:#E4DEFA"></div><div class="abs" style="left:92px;top:56px;width:120px;height:13px;border-radius:7px;background:#EEE9FC"></div></div>`);};
boot({duration:T.end,T,sfx:SFX,bg:'bright',grain:.03,
 build(ctx){
  // V1 — "Bei zote, online.": price list rows pop
  V[0]=vig(ctx,0,'#fff');const p1=add(V[0].ph.pgs,'<div class="pg" style="background:#fff"></div>');
  add(p1,'<div class="abs" style="left:28px;top:292px;font-size:36px;font-weight:700;color:#24164F">Bei zetu</div>');
  ['Kusuka — 25,000','Makeup — 40,000','Lotion — 18,000'].forEach((tx,i)=>rows1.push(add(p1,`<div class="abs tab" style="left:28px;top:${356+i*112}px;width:508px;height:92px;border-radius:24px;background:#F3F0FF;display:flex;align-items:center;padding:0 28px;font-size:32px;font-weight:700;color:#24164F;transform-origin:0 50%">${tx}</div>`)));
  skel(p1,700,3);
  // V2 — "Oda zote, sehemu moja.": orders inbox with status chips
  V[1]=vig(ctx,1,'#F7F5FF');const p2=add(V[1].ph.pgs,'<div class="pg" style="background:#F7F5FF"></div>');
  add(p2,'<div class="abs" style="left:28px;top:292px;font-size:36px;font-weight:700;color:#24164F">Oda</div>');
  [['Lotion 3 · Imepokelewa','#6C4CF5','rgba(108,76,245,.14)'],['Shampoo 2 · Inaletwa','#C2410C','#FFE1D6'],['Mafuta 1 · Imefika','#15803D','rgba(34,197,94,.16)']].forEach(([tx,c,bg],i)=>cards2.push(add(p2,`<div class="abs" style="left:28px;top:${356+i*128}px;width:508px;height:108px;border-radius:26px;background:#fff;box-shadow:0 10px 28px rgba(36,22,79,.08);display:flex;align-items:center;gap:18px;padding:0 22px">${gloss('box','#B9A6FF','#7A5CF0',58)}<div class="pill" style="height:52px;padding:0 20px;background:${bg};color:${c};font-size:26px">${tx}</div></div>`)));
  skel(p2,760,2);
  // V3 — "App yako mwenyewe.": glossy icon drops into the EXACT empty slot (row 2, col 3) from S06
  V[2]=vig(ctx,2,'#F4EEFF');const p3=add(V[2].ph.pgs,'<div class="pg" style="background:linear-gradient(180deg,#EEE8FF,#FFF1E8)"></div>');
  add(p3,'<div class="abs" style="left:36px;top:292px;width:492px;height:92px;border-radius:26px;background:rgba(255,255,255,.7)"></div>');
  const tones=['#D6CBFF','#DCEBFF','#FFC9B0','#E9E3FF','#CFE8DD'];
  for(let r=0;r<4;r++)for(let k=0;k<4;k++){if(r===1&&k===2)continue;add(p3,`<div class="abs" style="left:${82+134*k-48}px;top:${470+150*r-48}px;width:96px;height:96px;border-radius:28px;background:${tones[(r*4+k)%5]}"></div>`);}
  icon3=add(p3,`<div class="abs" style="left:${82+134*2-48}px;top:${470+150-48}px;width:96px;height:96px;border-radius:28px;background:linear-gradient(135deg,#6C4CF5,#FF8A65);box-shadow:0 18px 30px rgba(108,76,245,.4),inset 0 2px 0 rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:36px;font-weight:800;opacity:0">BY<i class="abs" style="left:0;top:0;width:96px;height:48px;border-radius:28px 28px 0 0;background:linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,0))"></i></div>`);
  lab3=add(p3,`<div class="abs" style="left:${82+134*2-84}px;top:${470+150+54}px;width:168px;text-align:center;font-size:26px;font-weight:700;color:#24164F;opacity:0;white-space:nowrap">Biashara yako</div>`);
  for(let i=0;i<4;i++)spark.push(add(p3,`<div class="abs" style="left:0;top:0;opacity:0">${ico('sparkle',34,'#FFB020',2).replace('fill="none"','fill="#FFD36B"')}</div>`));
  // V4 — "Stock, live.": live stock with a pulsing "Live" dot, 9 → 8
  V[3]=vig(ctx,3,'#fff');const p4=add(V[3].ph.pgs,'<div class="pg" style="background:#fff"></div>');
  add(p4,'<div class="abs" style="left:28px;top:292px;font-size:36px;font-weight:700;color:#24164F">Stock</div>');
  add(p4,`<div class="abs" style="right:28px;top:292px;height:48px;padding:0 18px 0 14px;border-radius:999px;background:rgba(34,197,94,.14);display:flex;align-items:center;gap:10px;color:#15803D;font-size:28px;font-weight:700"><i id="ld" style="width:16px;height:16px;border-radius:50%;background:#22C55E;display:block"></i>Live</div>`);
  dot4=p4.querySelector('#ld');
  [['Mafuta ya nywele — ','9',30,'#FF8A65'],['Lotion — ','24',70,'#6C4CF5'],['Shampoo — ','41',85,'#22C55E']].forEach(([tx,n,pc,c],i)=>{
    const r=add(p4,`<div class="abs" style="left:28px;top:${376+i*150}px;width:508px;height:128px;border-radius:26px;background:#F7F5FF;padding:20px 26px"><div style="font-size:32px;font-weight:700;color:#24164F;display:flex">${tx}<span class="n tab" style="display:inline-block;overflow:hidden;height:1.2em;margin-left:.25em"><span class="ni2" style="display:block">${n}</span></span></div><div style="height:20px;border-radius:10px;background:#E4DEFA;margin-top:22px;overflow:hidden"><div class="b" style="height:100%;width:${pc}%;border-radius:10px;background:${c}"></div></div></div>`);
    bars4.push({r,pc,n:r.querySelector('.ni2'),b:r.querySelector('.b')});});
  num4=bars4[0];
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in);
  V.forEach((v,i)=>{
    const s=STARTS[i],lt=t-s,q=P(t,s,D.slide,E.snap),out=i<3?P(t,STARTS[i+1],D.slide,E.snap):0;
    const y=(1-q)*1920-out*1920-(i===3?90*ex:0);
    v.c.style.visibility=(t>=s&&out<1)?'visible':'hidden';
    tf(v.c,{y,o:i===3?1-ex:1});
    v.ph.apply({x:0,y:0,s:1.35,rx:3,ry:TILT[i]+1.2*sin(Math.max(lt,0),1.6),rz:0});
    renderLine(v.cap,t,s+D.capStart,{stag:.07});tf(v.plate,{s:lerp(.9,1,P(lt,0,.3,E.out)),o:clamp(lt/.12)});
  });
  rows1.forEach((r,i)=>{const s=.15+i*.1,p=P(t,s,.3,E.pop);tf(r,{s:lerp(.85,1,p),x:(1-p)*-30,o:clamp((t-s)/.1)});});
  cards2.forEach((c,i)=>{const s=.95+i*.12,p=P(t,s,.4,E.out);tf(c,{x:(1-p)*560,o:clamp((t-s)/.1)});});
  const dp=P(t,1.75,.5,E.pop2);tf(icon3,{y:(1-P(t,1.75,.4,E.out))*-420,s:lerp(.7,1,dp),o:t>=1.75?1:0});
  lab3.style.opacity=clamp((t-1.95)/.15);
  spark.forEach((s,i)=>{const a=i*1.57+.5,q=clamp((t-1.9)/.5),cx=82+134*2,cy=470+150;tf(s,{x:cx-17+Math.cos(a)*(40+60*E.out(q)),y:cy-17+Math.sin(a)*(40+60*E.out(q)),s:Math.sin(Math.PI*q)*1.1,r:q*90,o:t>=1.9?1:0});});
  // stock: live pulse + 9 → 8 tick
  const pu=.5+.5*Math.sin(Math.max(t-2.4,0)*10);dot4.style.boxShadow=`0 0 0 ${(pu*8).toFixed(1)}px rgba(34,197,94,${(.25*(1-pu)).toFixed(3)})`;
  const tk=P(t,2.60,.25,E.out);num4.n.textContent=tk<.5?'9':'8';num4.n.style.transform=`translateY(${tk<.5?-tk*60:(1-tk)*60}%)`;num4.n.style.opacity=tk<.5?1-tk*2:(tk-.5)*2;
  num4.b.style.width=lerp(30,27,tk)+'%';
  bars4.forEach((b,i)=>{if(i)b.b.style.width=(b.pc*(1+.04*Math.sin(t*6+i)*P(t,2.7,.3)))+'%';});
 }});
