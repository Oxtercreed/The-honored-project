const T={bei:0.00,oda:0.80,app:1.60,stock:2.40,collapse:3.20,end:3.60};
const D={cut:0.20,flash:0.067,collapse:0.30,beat:0.80,capStart:0.05};
const SFX=[{t:0.00,name:"hard-cut-hit"},{t:0.10,name:"bubble-pops"},{t:0.80,name:"hard-cut-hit"},{t:0.90,name:"fast-scroll"},{t:1.60,name:"hard-cut-hit"},{t:1.70,name:"error-soft"},{t:2.40,name:"hard-cut-hit"},{t:2.50,name:"pencil"},{t:3.20,name:"suck-in"}];
/*==CORE==*/
/* SCENE 06 — PROBLEM E: QUICK-FIRE PAINS (dark). 4 × 0.8s hard cuts. Ends on ONE teal dot at (540,960). Mirrored by S11. */
const TILT=[-8,7,-5,9], STARTS=[T.bei,T.oda,T.app,T.stock];
const CAPS=[{w:['Bei',{t:'gani?',pill:'amber'}],y:430},{w:['Oda',{t:'zinapotea.',pill:'pain'}],y:430},{w:['App?',{t:'Hakuna.',pill:'pain'}],y:430},{w:['Stock','kwa',{t:'karatasi.',pill:'teal'}],y:430}];
let V=[],solid,dot,flash,bubs=[],list,rowT,chip,banner,slot,tally=[],smudge;
function vig(ctx,i,bg){
  const c=add(ctx.cam,'<div class="L" style="transform-origin:540px 960px;visibility:hidden"></div>');
  const ph=mkPhone(c,{cy:1060,theme:'dk',bg});
  const cap=mkLine(c,{y:CAPS[i].y,size:120,color:'#F2F5F8',words:CAPS[i].w});
  return {c,ph,cap};
}
boot({duration:T.end,T,sfx:SFX,bg:'dark',grain:.04,
 build(ctx){
  dot=add(ctx.cam,`<div class="abs" style="left:528px;top:948px;width:24px;height:24px;border-radius:50%;background:#14B8A6;box-shadow:0 0 40px #14B8A6;opacity:0"></div>`);
  // V1 — "Bei gani?": incoming chat bubbles stack fast
  V[0]=vig(ctx,0,'#0B141A');
  add(V[0].ph.pgs,`<div class="pg" style="background:#0B141A"><div class="abs" style="left:0;top:96px;width:564px;height:90px;background:#12302A"></div></div>`);
  ['Bei gani?','Bei?','Bei gani dada?'].forEach((tx,i)=>bubs.push(add(V[0].ph.pgs.lastChild,`<div class="abs" style="left:30px;top:${290+i*112}px;padding:20px 28px;border-radius:26px 26px 26px 8px;background:#1F2C34;color:#F2F5F8;font-size:34px;font-weight:600;transform-origin:0 100%">${tx}</div>`)));
  // V2 — "Oda zinapotea.": chat list scrolls, "Nataka lotion 3" slides out → grey + red chip
  V[1]=vig(ctx,1,'#0B141A');
  const pg2=add(V[1].ph.pgs,`<div class="pg" style="background:#0B141A"></div>`);
  list=add(pg2,'<div class="abs" style="left:0;top:270px;width:564px;height:900px"></div>');
  for(let r=0;r<8;r++){const real=r===2;
    const row=add(list,`<div class="abs" style="left:24px;top:${r*116}px;width:516px;height:100px;border-radius:24px;background:#18212C;display:flex;align-items:center;gap:20px;padding:0 22px">
      <div style="width:60px;height:60px;border-radius:50%;background:${['#2B6CB0','#8A5CF5','#E8735A','#14B8A6'][r%4]};opacity:.7;flex:none"></div>
      <div style="flex:1;min-width:0">${real?`<div style="font-size:30px;font-weight:600;color:#F2F5F8;white-space:nowrap">Nataka lotion 3</div>`:`<div style="width:${150+(r*37)%120}px;height:18px;border-radius:9px;background:#2A3745"></div><div style="width:${220+(r*53)%150}px;height:14px;border-radius:7px;background:#222E3A;margin-top:10px"></div>`}</div>
      ${real?`<div class="abs pill" id="chip" style="right:20px;top:26px;height:48px;padding:0 20px;background:#FF4D5E;color:#fff;font-size:26px;opacity:0">Imepotea</div>`:''}</div>`);
    if(real)rowT=row;}
  chip=rowT.querySelector('#chip');
  // V3 — "App? Hakuna.": home screen grid, banner shakes, empty slot pulses
  V[2]=vig(ctx,2,'#0B0F14');
  const pg3=add(V[2].ph.pgs,`<div class="pg" style="background:linear-gradient(180deg,#121A24,#0B0F14)"></div>`);
  const tones=['#2A3745','#33414F','#2B3A3F','#3A3447','#2F3B4A'];
  for(let r=0;r<4;r++)for(let k=0;k<4;k++){if(r===1&&k===2)continue;add(pg3,`<div class="abs" style="left:${82+134*k-48}px;top:${470+150*r-48}px;width:96px;height:96px;border-radius:28px;background:${tones[(r*4+k)%5]};opacity:.85"></div>`);}
  slot=add(pg3,`<div class="abs" style="left:${82+134*2-48}px;top:${470+150-48}px;width:96px;height:96px;border-radius:28px;border:3px dashed #FF4D5E"></div>`);
  add(pg3,`<div class="abs" style="left:${82+134*2-70}px;top:${470+150+56}px;width:140px;text-align:center;font-size:26px;font-weight:700;color:#FF4D5E">Hakuna</div>`);
  banner=add(pg3,`<div class="abs" style="left:36px;top:290px;width:492px;height:92px;border-radius:26px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(14px);display:flex;align-items:center;gap:18px;padding:0 26px;color:#F2F5F8;font-size:30px;font-weight:700">${ico('download',36,'#F2F5F8',2.2)}Pakua app yetu?</div>`);
  // V4 — "Stock kwa karatasi.": paper list, tally marks that smudge
  V[3]=vig(ctx,3,'#CFC6B4');
  const pg4=add(V[3].ph.pgs,`<div class="pg" style="background:#CFC6B4"></div>`);
  let ls='';for(let y=330;y<1180;y+=72)ls+=`<line x1="24" y1="${y}" x2="540" y2="${y}" stroke="rgba(70,100,170,.3)" stroke-width="2"/>`;
  add(pg4,`<svg class="abs" style="left:0;top:0" width="564" height="1204">${ls}<line x1="64" y1="96" x2="64" y2="1204" stroke="rgba(200,70,70,.3)" stroke-width="2"/></svg>`);
  ['Mafuta ya nywele','Lotion','Shampoo'].forEach((tx,i)=>add(pg4,`<div class="noteRow abs" style="left:84px;top:${278+i*144}px;font-size:34px;line-height:52px">${tx}</div>`));
  const tl=add(pg4,`<svg class="abs" style="left:0;top:0" width="564" height="1204" fill="none" stroke="#2A2A2A" stroke-width="6" stroke-linecap="round">${[0,1,2,3].map(k=>`<path class="tk" d="M${404+k*26} 276l-4 52" pathLength="1"/>`).join('')}<path class="tk" d="M394 318L508 286" pathLength="1"/></svg>`);
  tally=[...tl.querySelectorAll('.tk')];
  smudge=add(pg4,`<div class="abs" style="left:310px;top:262px;width:230px;height:92px;border-radius:50%;background:radial-gradient(ellipse,rgba(60,52,40,.85),rgba(60,52,40,0) 70%);filter:blur(10px);opacity:0"></div>`);
  solid=add(ctx.bgf,'<div class="L" style="background:#05070A;opacity:0"></div>');
  flash=add(ctx.fg,'<div class="L" style="background:#fff;opacity:0"></div>');
 },
 render(t,ctx){
  let act=-1;for(let i=0;i<4;i++)if(t>=STARTS[i]+.03&&t<STARTS[i]+D.beat+(i===3?D.collapse:0)&&!(i<3&&t>=STARTS[i+1]+.0))act=i;
  if(t<.03)act=-1;
  V.forEach((v,i)=>{v.c.style.visibility=i===act?'visible':'hidden';});
  let fl=0;
  if(act>=0){
    const lt=t-STARTS[act],v=V[act];
    // hard cut: 2-frame 6% white flash + scale jump 1.08→1.0 (E.snap, 0.2s)
    fl=lt<D.flash?.06:0;
    let sc=lerp(1.08,1,P(lt,0,D.cut,E.snap));
    if(act===3&&t>=T.collapse)sc*=1-P(t,T.collapse,D.collapse,E.in);
    v.c.style.transform=`scale(${Math.max(sc,0).toFixed(4)})`;
    v.ph.apply({x:0,y:0,s:1.35,rx:3,ry:TILT[act]+1.2*sin(lt,1.6),rz:0});
    renderLine(v.cap,t,STARTS[act]+D.capStart,{stag:.07});
    if(act===0){bubs.forEach((b,i)=>{const s=.10+i*.08,p=P(lt,s,.3,E.pop);tf(b,{s:lerp(.7,1,p),y:(1-p)*30,o:clamp((lt-s)/.1)});});}
    if(act===1){const p=P(lt,0,.4,E.out);list.style.transform=`translateY(${(1-p)*420}px)`;list.style.filter=`blur(${(6*(1-p)).toFixed(2)}px)`;
      const so=P(lt,.42,.25,E.out);rowT.style.transform=`translateX(${so*70}px)`;rowT.style.opacity=lerp(1,.5,so);rowT.style.filter=`grayscale(${so})`;
      const cp=P(lt,.5,.25,E.pop);chip.style.opacity=clamp((lt-.5)/.08);chip.style.transform=`scale(${lerp(.5,1,cp)})`;}
    if(act===2){const sh=lt>.15&&lt<.30?10*Math.sin((lt-.15)/.15*Math.PI*2):0;banner.style.transform=`translateX(${sh.toFixed(2)}px)`;
      const pu=.5+.5*Math.sin(lt*14);slot.style.opacity=.55+.45*pu;slot.style.transform=`scale(${1+.04*pu})`;}
    if(act===3){tally.forEach((p,i)=>draw(p,P(lt,.10+i*.08,.12,E.out)));smudge.style.opacity=P(lt,.52,.2,E.out)*.95;}
  }
  flash.style.opacity=fl;
  solid.style.opacity=P(t,T.collapse,.4,E.soft); // wash fades out: last frame is SOLID #05070A + one teal dot
  // teal dot: appears as the last vignette collapses; sits at exactly (540,960)
  const dp=P(t,T.collapse+.05,.3,E.pop);tf(dot,{s:dp,o:t>=T.collapse+.05?1:0});
 }});
