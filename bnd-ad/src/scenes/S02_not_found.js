//@use tafuta
const T={enter:0.00,typing:0.30,tapSearch:1.00,results:1.10,kinetic:1.20,exit:2.60,end:3.00};
const D={enter:0.30,cps:16,tapGlide:0.45,resStag:0.10,wordStag:0.07,pushBack:0.30,exitD:0.40};
const SFX=[{t:0.30,name:"typing"},{t:1.05,name:"tap"},{t:1.10,name:"tick"},{t:1.20,name:"tick"},{t:1.30,name:"tick"},{t:1.50,name:"glitch-soft"},{t:1.70,name:"hit"}];
/*==CORE==*/
/* SCENE 02 — PROBLEM A: NOT FOUND (dark). Mirrored by S08. */
let ph,tap,TF,cards=[],dash,haupo,l1,l2,pinA,pinB,gA,gB,camL;
const RES=[["Saluni Glamour","Mikocheni"],["Bella Hair Studio","Mwenge"],["Saluni Malkia","Kinondoni"]];
boot({duration:T.end,T,sfx:SFX,bg:'dark',grain:.04,
 build(ctx){
  camL=add(ctx.cam,'<div class="L"></div>');
  ph=mkPhone(camL,{cy:1160,theme:'dk',bg:'#0F141B'});
  TF=tafutaHeader(ph,'dk');
  RES.forEach((r,i)=>cards.push(add(TF.pg,resCardHTML('dk',r[0],r[1],330+i*126))));
  dash=add(TF.pg,`<div class="abs" style="left:36px;top:${330+3*126}px;width:492px;height:110px;border-radius:24px;border:2px dashed rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:700;color:rgba(242,245,248,.25)">Biashara yako</div>`);
  haupo=add(TF.pg,`<div class="abs pill" style="left:${36+246-70}px;top:${330+3*126+25}px;width:140px;height:60px;background:#FF4D5E;color:#fff;font-size:34px">Haupo</div>`);
  tap=mkTap(camL,'dk');
  l1=mkLine(camL,{y:350,size:140,color:'#F2F5F8',words:['Wanakutafuta…']});
  l2=mkLine(camL,{y:495,size:140,color:'#F2F5F8',words:[{t:'hawakuoni.',pill:'pain'}]});
  // floating DOF: 2 foreground red pins, 2 background grey result cards
  const pin=`<svg width="160" height="200" viewBox="0 0 24 30"><path d="M12 29C12 29 3 19 3 11a9 9 0 0 1 18 0c0 8-9 18-9 18z" fill="#FF4D5E"/><circle cx="12" cy="11" r="3.6" fill="#7a1420"/></svg>`;
  pinA=mkFloat(ctx.fg,pin,130,250,160,200,'');
  pinB=mkFloat(ctx.fg,pin,950,1660,160,200,'');
  gA=mkFloat(ctx.bgf,`<div style="width:300px;height:96px;border-radius:24px;background:#18212C;border:1px solid rgba(255,255,255,.08)"></div>`,200,1180,300,96,'');
  gB=mkFloat(ctx.bgf,`<div style="width:300px;height:96px;border-radius:24px;background:#18212C;border:1px solid rgba(255,255,255,.08)"></div>`,900,820,300,96,'');
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in), pe=P(t,T.enter,D.enter,E.out), pb=P(t,1.70,D.pushBack,E.out);
  // phone: enter, slow tilt, push-back at 1.70, exit
  ph.apply({x:0,y:(1-pe)*100+60*ex,s:1.05*lerp(.94,1,pe)*lerp(1,.92,pb),rx:4,ry:-8+1.2*sin(t,4),rz:0,
            o:clamp(t/.2)*lerp(1,.6,pb)*(1-ex),b:5*pb});
  // typing + tap
  tafutaTyping(TF,t,T.typing,D.cps,T.tapSearch+.02);
  const bp=ph.proj(TF.btn.x,TF.btn.y), start={x:bp.x+210,y:bp.y+380};
  const g=P(t,0.55,D.tapGlide,E.inOut);
  tapRender(tap,t,{x:lerp(start.x,bp.x,g),y:lerp(start.y,bp.y,g)},[T.tapSearch],clamp((t-.55)/.15)*(1-P(t,1.35,.25,E.out)));
  TF.mb.style.transform=`scale(${squash(t,T.tapSearch)})`;
  // results slide up (stagger .1)
  cards.forEach((c,i)=>{const s=T.results+i*D.resStag,p=P(t,s,.4,E.out);c.style.transform=`translateY(${(1-p)*70}px)`;c.style.opacity=clamp((t-s)/.2);});
  // empty dashed card: flicker twice, vanish; then PAIN pill "Haupo" pops
  const fl=(t>=1.40&&t<1.52)||(t>=1.58&&t<1.66)?1:0;
  dash.style.opacity=t<1.40?0:fl;
  const hp=P(t,1.70,.45,E.pop2);haupo.style.transform=`scale(${lerp(.4,1,hp)})`;haupo.style.opacity=clamp((t-1.70)/.1);
  // kinetic
  renderLine(l1,t,1.20,{ex:T.exit,exD:.3});renderLine(l2,t,1.70,{ex:T.exit,exD:.3});
  // floating DOF
  const b1=bob(t,1,14,18),b2=bob(t,2,14,18);
  tf(pinA,{x:b1.x,y:b1.y,r:-12+b1.r,o:(1-ex)*.8,b:18});tf(pinB,{x:b2.x,y:b2.y,r:14+b2.r,o:(1-ex)*.8,b:18});
  tf(gA,{y:-40*t/T.end*3,o:.4*(1-ex),b:8});tf(gB,{y:-60*t/T.end*3,o:.4*(1-ex),b:8});
 }});
