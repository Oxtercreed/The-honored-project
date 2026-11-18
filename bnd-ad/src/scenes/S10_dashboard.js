//@use desk
const T={desk:0.00,swap:0.30,dashboard:0.70,lift:1.40,kinetic:2.40,exit:3.90,end:4.50};
const D={deskIn:0.20,swap:0.40,count:1.00,bars:0.12,lift:1.00,shrink:0.40,exitD:0.45};
const SFX=[{t:0.30,name:"slide-swap"},{t:0.70,name:"ui-appear"},{t:0.80,name:"counter-ticks"},{t:1.20,name:"bars-rise"},{t:1.40,name:"whoosh-lift"},{t:2.40,name:"whoosh"},{t:2.70,name:"hit-bright"}];
/*==CORE==*/
/* SCENE 10 — FIX D: DASHBOARD "Mauzo. Stock. Faida." Mirrors S05's top-down desk: the notebook + calculator slide away, a phone takes their place. */
const STOCK=[['Mafuta ya nywele — 9',30,'#FF8A65'],['Lotion — 24',70,'#6C4CF5'],['Shampoo — 41',85,'#22C55E']];
function cardBox(w,h,inner,extra=''){return `<div class="abs" style="left:0;top:0;width:${w}px;height:${h}px;border-radius:26px;background:#fff;box-shadow:0 10px 30px rgba(36,22,79,.08);padding:22px 26px;${extra}">${inner}</div>`;}
function mauzoHTML(v){return `<div style="font-size:28px;font-weight:600;color:#6B6890">Mauzo</div><div style="display:flex;align-items:center;gap:16px;margin-top:6px"><span class="tab v1" style="font-size:52px;font-weight:800;color:#24164F;letter-spacing:-.02em">${v}</span><span class="pill" style="height:42px;padding:0 16px;background:rgba(34,197,94,.16);color:#15803D;font-size:26px">+18%</span></div>`;}
function faidaHTML(v,id){return `<div style="font-size:28px;font-weight:600;color:#6B6890">Faida</div><div class="tab v2" style="font-size:52px;font-weight:800;color:#24164F;letter-spacing:-.02em;margin-top:6px">${v}</div>
  <svg class="abs" style="left:26px;top:132px" width="456" height="100" viewBox="0 0 456 100"><defs><linearGradient id="ar${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6C4CF5" stop-opacity=".35"/><stop offset="1" stop-color="#6C4CF5" stop-opacity="0"/></linearGradient><clipPath id="cp${id}"><rect class="acr" x="0" y="0" width="456" height="100"/></clipPath></defs>
  <g clip-path="url(#cp${id})"><path d="M0 84C50 78 70 50 120 56S190 24 240 34 320 60 360 26 420 10 456 6V100H0Z" fill="url(#ar${id})"/><path d="M0 84C50 78 70 50 120 56S190 24 240 34 320 60 360 26 420 10 456 6" fill="none" stroke="#6C4CF5" stroke-width="5" stroke-linecap="round"/></g></svg>`;}
function stockHTML(){return `<div style="font-size:28px;font-weight:700;color:#24164F">Stock</div>`+STOCK.map(([tx,pc,c],i)=>`<div style="margin-top:${i?16:12}px"><div style="font-size:30px;font-weight:600;color:#24164F">${tx}</div>${i===0?`<div class="pill" style="display:inline-flex;margin:4px 0 2px;height:38px;padding:0 14px;background:#FFE1D6;color:#C2410C;font-size:26px">Inakaribia kuisha</div>`:''}<div style="height:18px;border-radius:9px;background:#EEE9FC;margin-top:8px;overflow:hidden"><div class="bar" data-p="${pc}" style="height:100%;width:${pc}%;border-radius:9px;background:${c}"></div></div></div>`).join('');}
let grpF,desk,wood,nb,calc,ph,card1,card2,card3,dup=[],hg,l1,l2,l3,fgI,bgI=[],grp;
boot({duration:T.end,T,sfx:SFX,bg:'bright',grain:.03,
 build(ctx){
  wood=add(ctx.bgf,`<div class="L" style="background:repeating-linear-gradient(92deg,rgba(180,140,100,.07) 0 3px,transparent 3px 22px),radial-gradient(circle at 55% 55%,rgba(255,201,176,.55),transparent 60%),#F3E6D8;opacity:0"></div>`);
  desk=add(ctx.cam,'<div class="L"></div>');
  nb=add(desk,`<div class="abs" style="left:310px;top:560px;width:460px;height:980px;border-radius:26px;background:linear-gradient(160deg,#9C84FF,#6C4CF5);box-shadow:0 40px 60px rgba(36,22,79,.22);transform-origin:50% 50%"><div class="abs" style="right:70px;top:0;width:34px;height:100%;background:#FF8A65"></div><div class="abs" style="left:60px;top:90px;width:200px;height:120px;border-radius:12px;background:rgba(255,255,255,.85)"></div></div>`);
  calc=add(desk,`<div class="abs" style="left:640px;top:1250px;width:300px;height:480px;filter:drop-shadow(0 30px 40px rgba(36,22,79,.22))">${calculatorSVG(300,480,'#FF8A65',{body:'#FFFFFF',stroke:'#E4DEFA',lcd:'#DCEBFF',key:'#F0EBFF'})}</div>`);
  grp=add(ctx.cam,'<div class="L" style="transform-origin:540px 1050px"></div>');
  grpF=add(ctx.fg,'<div class="L" style="transform-origin:540px 1050px"></div>');
  ph=mkPhone(grp,{cy:1050,theme:'br',bg:'#F7F5FF'});
  const pg=add(ph.pgs,'<div class="pg" style="background:#F7F5FF"></div>');
  add(pg,`<div class="abs" style="left:28px;top:112px;font-size:32px;font-weight:700;color:#24164F">Habari</div><div class="abs" style="left:28px;top:154px;font-size:26px;font-weight:500;color:#6B6890">Leo</div><div class="abs" style="left:412px;top:106px;width:124px;height:60px;border-radius:999px;background:#fff;color:#24164F;font-size:26px;font-weight:700;display:flex;align-items:center;justify-content:center">BY</div>`);
  const mk=(top,w,h,html)=>{const c=add(pg,`<div class="abs" style="left:28px;top:${top}px;width:508px;height:${h}px"></div>`);add(c,cardBox(508,h,html));return c;};
  card1=mk(210,508,190,'');card1.innerHTML='';add(card1,cardBox(508,190,mauzoHTML('TSh 0')));
  card2=mk(424,508,260,'');card2.innerHTML='';add(card2,cardBox(508,260,faidaHTML('TSh 0','a')));
  card3=mk(698,508,404,'');card3.innerHTML='';add(card3,cardBox(508,404,stockHTML()));
  card3.querySelectorAll('.bar').forEach(b=>b.style.width='0%');
  // lifted duplicates: upper-left (sharp), upper-right (sharp), lower-left (foreground, blurred)
  const dd=[[mauzoHTML('TSh 385,000'),190,grp],[faidaHTML('TSh 142,500','b'),260,grp],[stockHTML(),404,grpF]];
  dd.forEach(([html,h,par],i)=>{const e=add(par,`<div class="abs" style="left:${540-254}px;top:${1050-h/2}px;width:508px;height:${h}px;opacity:0"></div>`);add(e,cardBox(508,h,html,'box-shadow:0 40px 80px rgba(36,22,79,.25)'));dup.push({e,h});});
  dup[1].e.querySelector('.acr').setAttribute('width',456);
  // headline (upper band)
  l1=mkLine(ctx.cam,{y:360,size:140,color:'#24164F',words:['Mauzo.','Stock.']});
  l2=mkLine(ctx.cam,{y:505,size:140,color:'#24164F',words:[{t:'Faida.',pill:'success'}]});
  l3=mkLine(ctx.cam,{y:625,size:60,weight:700,color:'#6B6890',words:['Vyote','kwenye','simu.']});
  fgI=mkFloat(ctx.fg,gloss('chart','#FFB27A','#F0623A',190),930,1640,190,190);
  [['box',140,1290,'#7FD0FF','#4A7AE8'],['check',950,760,'#5EE29A','#16A34A']].forEach(([n,x,y,a,b])=>bgI.push(mkFloat(ctx.bgf,gloss(n,a,b,120),x,y,120,120)));
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in), wd=P(t,0,D.deskIn,E.out);
  wood.style.opacity=.92*wd*(1-ex);
  // desk objects slide down out of frame (E.in); phone slides up into the same spot (E.out), rotateX 8° → 3°
  const so=P(t,T.swap,D.swap,E.in),si=P(t,T.swap+.05,D.swap,E.out);
  tf(nb,{y:so*1500,r:-4,o:clamp(t/.15)});tf(calc,{y:so*1500,r:6,o:clamp(t/.15)});
  // shrink everything to 0.78 for the kinetic line
  const sh=P(t,T.kinetic,D.shrink,E.inOut);
  const gt=`translate(0px,${(130*sh-70*ex).toFixed(2)}px) scale(${lerp(1,.66,sh).toFixed(4)})`;grp.style.transform=gt;grpF.style.transform=gt;grp.style.opacity=grpF.style.opacity=1-ex;
  ph.apply({x:0,y:(1-si)*1500,s:1.15,rx:lerp(8,3,si),ry:-2+2*sin(t,5),rz:0,o:t>=T.swap?1:0});
  // count-ups
  const m=P(t,.80,D.count,E.out),f=P(t,1.00,D.count,E.out);
  card1.querySelector('.v1').textContent='TSh '+fmt(385000*m);card2.querySelector('.v2').textContent='TSh '+fmt(142500*f);
  card2.querySelector('.acr').setAttribute('width',(456*P(t,1.0,.9,E.inOut)).toFixed(1));
  card3.querySelectorAll('.bar').forEach((b,i)=>{b.style.width=(+b.dataset.p*P(t,1.2+i*D.bars,.6,E.out))+'%';});
  [card1,card2,card3].forEach((c,i)=>{const s=.72+i*.08,p=P(t,s,.45,E.pop2);tf(c,{y:(1-p)*40,o:clamp((t-s)/.15),s:lerp(.92,1,p)});});
  // lift: duplicates leave the phone with growing shadow, then bob
  const L=P(t,T.lift,D.lift,E.out);
  const tg=[{x:-290,y:-470,ry:14,s:.85},{x:270,y:-300,ry:-14,s:.85},{x:-380,y:470,ry:10,s:1.25}];
  const src=[ph.proj(282,300),ph.proj(282,560),ph.proj(282,900)];
  dup.forEach((d,i)=>{const b=bob(t,i+2,10,14,3.6),g=tg[i];
    const fo=i===2?(1-ex):(1-ex);
    tf(d.e,{x:lerp(src[i].x-540,g.x,L)+b.x,y:lerp(src[i].y-1050,g.y,L)+b.y,s:lerp(1,g.s,L),ry:g.ry*L,o:(t>=T.lift?1:0)*fo*(i===2?.92:1),b:i===2?12*L:0});});
  // kinetic
  renderLine(l1,t,2.40,{ex:T.exit,exD:.3});renderLine(l2,t,2.62,{ex:T.exit,exD:.3});renderLine(l3,t,3.00,{stag:.12,ex:T.exit,exD:.3});
  const b1=bob(t,1,12,14);tf(fgI,{x:b1.x,y:b1.y,r:-8+b1.r,o:.9*(1-ex),b:16});
  bgI.forEach((e,i)=>{const b=bob(t,i+3,12,12);tf(e,{x:b.x,y:b.y,r:b.r,o:.65*(1-ex),b:8});});
  if(t>=T.exit){tf(desk,{y:-60*ex,o:1-ex});}
 }});
