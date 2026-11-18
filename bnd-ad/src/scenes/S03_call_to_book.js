//@use profile
const T={enter:0.00,hover:0.30,wish:0.90,kinetic:1.30,exit:2.60,end:3.00};
const D={enter:0.30,glide:0.40,wiggle:0.25,bubble:0.40,wordStag:0.07,exitD:0.40,pop:0.25};
const SFX=[{t:0.30,name:"swipe"},{t:0.70,name:"hover-tick"},{t:0.90,name:"bubble"},{t:1.30,name:"whoosh"},{t:1.80,name:"hit"},{t:2.60,name:"bubble-pop"}];
/*==CORE==*/
/* SCENE 03 — PROBLEM B: "Piga simu ku-book" (dark). Mirrored by S09: same framing, same button position. */
let ph,PR,tap,bub,bubIn,dots,l1,l2,hand,clk1,clk2;
boot({duration:T.end,T,sfx:SFX,bg:'dark',grain:.04,
 build(ctx){
  const cam=ctx.cam, L=add(cam,'<div class="L"></div>');
  add(L,`<svg width="0" height="0" style="position:absolute"><defs><clipPath id="cloudClip" clipPathUnits="userSpaceOnUse"><circle cx="105" cy="150" r="82"/><circle cx="195" cy="100" r="86"/><circle cx="300" cy="96" r="96"/><circle cx="375" cy="150" r="82"/><circle cx="235" cy="172" r="86"/><rect x="105" y="130" width="270" height="124" rx="60"/></clipPath></defs></svg>`);
  ph=mkPhone(L,{cy:1000,theme:'dk',bg:'#0F141B'});
  PR=profilePage(ph,'dk');
  tap=mkTap(L,'dk');
  // thought bubble (bright world clipped to a cloud)
  bub=add(L,`<div class="abs" style="left:520px;top:335px;width:460px;height:260px;transform-origin:50% 60%"><div style="filter:drop-shadow(0 30px 40px rgba(0,0,0,.55)) drop-shadow(0 0 30px rgba(20,184,166,.18))"><div style="width:460px;height:260px;clip-path:url(#cloudClip);background:${BRIGHT_BG};position:relative">
     <div class="abs" style="left:70px;top:94px;width:320px;height:92px;border-radius:999px;background:#6C4CF5;display:flex;align-items:center;justify-content:center;gap:14px;color:#fff;font-size:34px;font-weight:700;box-shadow:0 12px 26px rgba(108,76,245,.4)">${ico('calendar',34,'#fff',2.2)}Book sasa</div></div></div></div>`);
  dots=[[470,690,20],[430,745,28],[385,805,38]].map(([x,y,r])=>add(L,`<div class="abs" style="left:${x-r/2}px;top:${y-r/2}px;width:${r}px;height:${r}px;border-radius:50%;background:#EDE7FF;box-shadow:0 0 18px rgba(214,203,255,.5)"></div>`));
  l1=mkLine(L,{y:1345,size:110,color:'#F2F5F8',words:['Laiti','ningeweza']});
  l2=mkLine(L,{y:1470,size:110,color:'#F2F5F8',words:['ku-book',{t:'mwenyewe.',pill:'teal'}]});
  hand=mkFloat(ctx.fg,gloss('phone','#F5B544','#B77A12',180,true),930,1640,180,180);
  clk1=mkFloat(ctx.bgf,ico('clock',90,'#8A97A6',1.6),150,640,90,90);clk2=mkFloat(ctx.bgf,ico('clock',70,'#8A97A6',1.6),960,1330,70,70);
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in), pe=P(t,T.enter,D.enter,E.out);
  ph.apply({x:0,y:60*ex,s:lerp(1.15,1.3,pe),rx:0,ry:10+1.2*sin(t,4),rz:-3,o:clamp(t/.2)*(1-ex)});
  // amber glow pulse on the call button at 0.30
  const gp=Math.sin(Math.PI*clamp((t-.3)/.6));PR.btn.style.boxShadow=`0 0 ${(14+50*gp).toFixed(1)}px rgba(245,181,68,${(.1+.45*gp).toFixed(3)})`;
  // hover: ring glides toward the button, stops 40px above, wiggles, NEVER presses
  const bp=ph.proj(PR.pos.x,PR.pos.y), tgt={x:bp.x+30*bp.k,y:bp.y-(48+40)*bp.k*0+(-40-48*bp.k)};
  const start={x:860,y:1560};
  const gl=P(t,T.hover,D.glide+.2,E.inOut);
  const wig=t>.7?12*Math.sin(2*Math.PI*(t-.7)/D.wiggle)*(1-P(t,1.15,.1,E.out)*0):0;
  const away=P(t,1.25,.35,E.inOut);
  tapRender(tap,t,{x:lerp(start.x,tgt.x,gl)+wig+away*60,y:lerp(start.y,tgt.y,gl)-away*40},[],clamp((t-.3)/.15)*(1-away)*(1-ex));
  // wish: three dots then the cloud (E.pop)
  dots.forEach((d,i)=>{const s=T.wish+i*.08,p=P(t,s,.25,E.pop);tf(d,{s:p,o:(t>=s?1:0)*(1-P(t,T.exit,.15)),y:0});});
  const bp2=P(t,1.15,D.bubble,E.pop), bx=P(t,T.exit,D.pop,E.inOut);
  const bs=t<T.exit?lerp(.2,1,bp2):(bx<.5?lerp(1,1.15,bx*2):lerp(1.15,0,(bx-.5)*2));
  tf(bub,{s:Math.max(bs,0),o:t>=1.15?1:0,y:0});
  // kinetic (lower band)
  renderLine(l1,t,T.kinetic,{starts:[1.30,1.37],ex:T.exit,exD:.3});
  renderLine(l2,t,1.80,{starts:[1.80,1.90],ex:T.exit,exD:.3});
  // DOF
  const b1=bob(t,3,12,16);tf(hand,{x:b1.x,y:b1.y,r:-10+b1.r,o:(1-ex)*.9,b:20});
  tf(clk1,{y:-30*t/T.end*3,r:6,o:.4*(1-ex),b:8});tf(clk2,{y:-40*t/T.end*3,r:-8,o:.4*(1-ex),b:8});
 }});
