const T={dotPulse:0.00,bloom:0.25,icons:0.70,sisi:1.00,clear:2.00,services:2.30,zoomThrough:4.80,end:5.50};
const D={pulse:0.25,bloom:0.60,iconFly:0.50,iconStag:0.07,logoSpin:0.45,clear:0.30,pill:0.45,pillGap:0.45,zoom:0.45,dissolve:0.25};
const SFX=[{t:0.00,name:"heartbeat-soft"},{t:0.25,name:"whoosh-rise"},{t:0.70,name:"float-pops"},{t:0.85,name:"bright-swell"},{t:1.00,name:"pop"},{t:1.45,name:"logo-ping"},{t:2.30,name:"pill-pop"},{t:2.75,name:"pill-pop"},{t:3.20,name:"pill-pop"},{t:3.65,name:"pill-pop"},{t:4.10,name:"pill-pop"},{t:4.80,name:"zoom-through"}];
/*==CORE==*/
/* SCENE 07 — THE FLIP: teal dot blooms into the bright world. "Sisi ni B&D" + 5 services, then zoom-through into "Website". */
const SERV=[['Website','globe','#8C6CFF','#5A3AE0'],['Mfumo wa booking','calendar','#FF9E7D','#F0623A'],['Web apps','window','#6C9CFF','#3A62E0'],['Mifumo ya biashara','chart','#38D39F','#139A6A'],['Apps za simu','mobile','#B58CFF','#7A4CE0']];
const ICONS=[ // [name,c1,c2,size,x,y,plane,flyFromX]
 ['bell','#FFB27A','#F0623A',200,110,1420,'fg'],['calendar','#9C84FF','#5A3AE0',170,985,380,'fg'],
 ['globe','#6CC4FF','#3A62E0',150,95,800,'mid'],['mobile','#C49CFF','#7A4CE0',140,990,1190,'mid'],
 ['window','#7FD0FF','#4A7AE8',120,900,610,'bg'],['chart','#7FE0B4','#139A6A',116,150,1330,'bg']];
let reveal,glow,bright,dot,iconEls=[],hg,sisi,logoBox,logoW,svc=[],stack,zg,violet,dkBase;
boot({duration:T.end,T,sfx:SFX,bg:null,grain:.035,
 camExtra:t=>({s:lerp(1,1.1,P(t,T.bloom,D.bloom,E.soft))/lerp(1,1.1,P(t,.9,.8,E.inOut))}),
 build(ctx){
  dkBase=add(ctx.bg,'<div class="L" style="background:#05070A"></div>');
  reveal=add(ctx.bg,'<div class="L" style="clip-path:circle(0px at 540px 960px)"></div>');bright=mkBright(reveal);
  glow=add(ctx.bg,'<div class="abs" style="left:540px;top:960px;width:10px;height:10px;border-radius:50%;box-shadow:0 0 90px 36px rgba(255,255,255,.75);opacity:0"></div>');
  dot=add(ctx.cam,`<div class="abs" style="left:528px;top:948px;width:24px;height:24px;border-radius:50%;background:#14B8A6;box-shadow:0 0 40px #14B8A6"></div>`);
  zg=add(ctx.cam,'<div class="L"></div>');
  ICONS.forEach(([n,c1,c2,sz,x,y,pl])=>{const par=pl==='fg'?ctx.fg:pl==='bg'?ctx.bgf:zg;iconEls.push(mkFloat(par,gloss(n,c1,c2,sz),x,y,sz,sz));});
  // headline group: "Sisi ni" + B&D wordmark
  hg=add(zg,'<div class="L" style="transform-origin:540px 700px"></div>');
  sisi=mkLine(hg,{y:590,size:140,color:'#24164F',words:['Sisi','ni']});
  logoBox=add(hg,`<div class="abs" style="left:0;top:690px;width:1080px;height:220px;display:flex;align-items:center;justify-content:center;perspective:900px"></div>`);
  logoW=add(logoBox,`<div style="position:relative">${logoHTML(220,'br')}<div class="swc"><div class="swb"></div></div></div>`);
  // services: five pills in a centred vertical stack
  stack=add(zg,'<div class="L"></div>');
  SERV.forEach(([tx,ic,c1,c2],i)=>{
    const y=700+i*160,odd=i%2===0;
    const row=add(stack,`<div class="abs" style="left:0;top:${y-60}px;width:1080px;height:120px;display:flex;justify-content:center"></div>`);
    const sv=add(row,`<div style="position:relative;height:120px;display:flex;align-items:center;gap:20px;padding:0 48px 0 22px;font-size:60px;font-weight:700;letter-spacing:-.03em;color:${odd?'#fff':'#24164F'};white-space:nowrap">
      <div class="pb" style="position:absolute;left:0;top:0;width:100%;height:120px;border-radius:999px;transform-origin:0 50%;background:${odd?'#6C4CF5':'#fff'};${odd?'box-shadow:0 20px 40px rgba(108,76,245,.32)':'box-shadow:inset 0 0 0 2px #D6CBFF,0 20px 40px rgba(36,22,79,.10)'}"></div>
      <div class="ct" style="position:relative;display:flex;align-items:center;gap:20px">${gloss(ic,c1,c2,76)}<span>${tx}</span></div></div>`);
    svc.push({row,sv,pb:sv.querySelector('.pb'),ct:sv.querySelector('.ct')});
  });
  violet=add(ctx.fg,'<div class="L" style="background:#6C4CF5;opacity:0"></div>');
 },
 render(t,ctx){
  bright.render(t,ctx.dur);
  // dot pulse, then bloom: circle of BRIGHT HANDOFF FRAME expands (E.snap) with a soft white edge glow
  const r=1300*P(t,T.bloom,D.bloom,E.snap);
  reveal.style.clipPath=`circle(${r.toFixed(1)}px at 540px 960px)`;
  glow.style.cssText+=`;left:${540-r}px;top:${960-r}px;width:${2*r}px;height:${2*r}px;opacity:${(r>2&&t<.95)?(1-P(t,.7,.2)).toFixed(3):0}`;
  tf(dot,{s:1+.4*Math.sin(Math.PI*clamp(t/D.pulse)),o:1-P(t,.3,.25,E.in)});
  dkBase.style.opacity=t<.9?1:0;
  // glossy icons: fly in from the edges to DOF positions, then bob
  iconEls.forEach((e,i)=>{const [,, ,sz,x,y,pl]=ICONS[i],s=T.icons+i*D.iconStag,p=P(t,s,D.iconFly,E.out);
    const fx=(x<540?-1:1)*(540+sz),bb=bob(t,i+1,10,16,3.4),ex=P(t,T.zoomThrough,.25,E.in);
    const bl=pl==='fg'?16:pl==='bg'?8:0;
    tf(e,{x:(1-p)*fx+bb.x,y:bb.y,r:bb.r+(1-p)*(x<540?-40:40),s:(pl==='fg'?1.2:pl==='bg'?.9:1)*(1-ex*.3),o:clamp((t-s)/.15)*(pl==='fg'?.88:pl==='bg'?.65:1)*(1-ex),b:bl});});
  // "Sisi ni" word by word, then B&D pops in with a Y-spin; light sweep at 1.70
  renderLine(sisi,t,T.sisi,{stag:.08});
  const lp=P(t,1.45,D.logoSpin,E.pop);logoW.style.transform=`rotateY(${(90*(1-lp)).toFixed(2)}deg) scale(${lerp(.8,1,lp).toFixed(3)})`;logoW.style.opacity=clamp((t-1.45)/.12);
  logoSweep(logoW,t,1.70,.35);
  // clear: headline group shrinks to 0.55 and moves up to y≈380
  const cp=P(t,T.clear,D.clear,E.inOut);tf(hg,{y:-320*cp,s:lerp(1,.55,cp)});
  // services: pills grow from the left on the beat; each landing nudges the stack up 20px
  let nudge=0;
  svc.forEach((S,i)=>{const s=T.services+i*D.pillGap,p=P(t,s,.30,E.out),tp=P(t,s+.08,.32,E.pop);
    S.pb.style.transform=`scaleX(${p.toFixed(4)})`;S.ct.style.opacity=clamp((t-s-.08)/.13)*(1-P(t,T.zoomThrough+.05,.2));S.ct.style.transform=`scale(${lerp(.86,1,tp).toFixed(4)}) translateY(${((1-tp)*18).toFixed(2)}px)`;
    nudge+=20*P(t,s,D.pillGap,E.out);});
  tf(stack,{y:-nudge});
  // zoom-through into the "Website" pill, then violet dissolves into the BRIGHT HANDOFF FRAME
  const zp=P(t,T.zoomThrough,D.zoom,E.snap),zs=Math.exp(Math.log(26)*zp);
  const wy=700-nudge;zg.style.transformOrigin=`540px ${wy}px`;
  tf(zg,{s:zs,o:t>=T.zoomThrough+D.zoom?0:1});
  violet.style.opacity=t<T.zoomThrough+D.zoom?P(t,T.zoomThrough+.15,.3,E.in):1-P(t,T.zoomThrough+D.zoom,D.dissolve,E.out);
 }});
