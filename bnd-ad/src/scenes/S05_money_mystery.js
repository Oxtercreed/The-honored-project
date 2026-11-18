//@use desk
const T={enter:0.00,counting:0.30,calculator:0.50,kinetic:1.20,exit:2.60,end:3.00};
const D={enter:0.30,rowStag:0.15,strike:0.25,calcFlash:0.25,dim:0.30,qDraw:0.50,exitD:0.40};
const SFX=[{t:0.30,name:"pencil"},{t:0.50,name:"calc-beeps"},{t:0.80,name:"scribble"},{t:1.05,name:"error-beep"},{t:1.20,name:"whoosh"},{t:1.70,name:"hit"},{t:1.75,name:"draw"}];
/*==CORE==*/
/* SCENE 05 — PROBLEM D: "FAIDA?" (dark, top-down desk). Mirrored by S10. */
let desk,nb,rows=[],strike,rew,calc,lcd,pen,lamp,q,qp,l1,l2;
boot({duration:T.end,T,sfx:SFX,bg:'dark',grain:.04,
 build(ctx){
  desk=add(ctx.cam,'<div class="L" style="transform-origin:540px 1000px"></div>');
  lamp=add(desk,'<div class="abs" style="left:40px;top:560px;width:1000px;height:1000px;border-radius:50%;background:radial-gradient(circle,rgba(245,181,68,.10),transparent 62%)"></div>');
  nb=add(desk,`<div class="abs" style="left:110px;top:550px;width:860px;height:1000px;transform-origin:50% 50%;filter:drop-shadow(0 40px 60px rgba(0,0,0,.6))">${notebookOpen(860,1000)}</div>`);
  const mk=(txt,y,extra='')=>add(nb,`<div class="noteRow abs" style="left:458px;top:${y}px;font-size:38px;line-height:72px;${extra}">${txt}</div>`);
  rows=[mk('Mauzo — 145,000',148),mk('Matumizi — 60,000 ?',292),mk('Stock — ?',364)];
  rew=mk('Mauzo — 138,500',220);
  nb.insertAdjacentHTML('beforeend',`<svg class="abs" style="left:0;top:0" width="860" height="1000" fill="none" stroke-linecap="round"><path id="stk" d="M452 188q140-12 330-4" stroke="#FF4D5E" stroke-width="7" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
    <path d="M44 190q90-12 190 2M44 262q60 8 140-2M44 334q110-10 220 0M44 406q70 6 160-4M44 478q100-8 200 2M44 550q50 8 120-2" stroke="#3b3b3b" stroke-opacity=".3" stroke-width="5"/></svg>`);
  strike=nb.querySelector('#stk');
  calc=add(desk,`<div class="abs" style="left:640px;top:1250px;width:300px;height:480px;filter:drop-shadow(0 30px 40px rgba(0,0,0,.6))">${calculatorSVG(300,480)}<div id="lcd" class="abs tab" style="left:26px;top:28px;width:248px;height:112px;display:flex;align-items:center;justify-content:flex-end;padding:0 18px;font-size:54px;font-weight:700;color:#1a2a20;letter-spacing:.02em"></div></div>`);
  lcd=calc.querySelector('#lcd');
  pen=add(desk,`<div class="abs" style="left:120px;top:1590px;width:420px;height:30px;filter:drop-shadow(0 14px 14px rgba(0,0,0,.5))">${penSVG(420)}</div>`);
  q=add(desk,`<svg class="abs" style="left:300px;top:790px" width="480" height="560" viewBox="0 0 240 280" fill="none"><path id="qp" d="M60 80C60 40 90 22 122 22c34 0 60 22 60 54 0 30-22 42-44 58-16 12-24 22-24 44v10" stroke="#FF4D5E" stroke-width="22" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><circle id="qd" cx="114" cy="252" r="0" fill="#FF4D5E"/></svg>`);
  qp=q.querySelector('#qp');
  l1=mkLine(ctx.cam,{y:395,size:140,color:'#F2F5F8',words:['Mauzo','yapo…']});
  l2=mkLine(ctx.cam,{y:585,size:180,color:'#F2F5F8',words:[{t:'Faida?',pill:'pain'}]});
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in),pe=P(t,T.enter,D.enter,E.out),dim=P(t,T.kinetic,D.dim,E.out);
  // desk: fades in, tilt settles rotateX 18° → 10°, dims behind the kinetic line, slides down on exit
  desk.style.transform=`perspective(2400px) rotateX(${lerp(18,10,pe).toFixed(3)}deg) translateY(${(80*ex).toFixed(2)}px)`;
  desk.style.opacity=clamp(t/.25)*(1-ex);desk.style.filter=`brightness(${lerp(1,.5,dim).toFixed(3)}) blur(${(4*dim).toFixed(2)}px)`;
  tf(nb,{r:-4});tf(calc,{r:6});tf(pen,{r:-14});
  rows.forEach((r,i)=>{const s=T.counting+i*D.rowStag,p=P(t,s,.3,E.out);tf(r,{x:(1-p)*-14,o:clamp((t-s)/.15)});});
  draw(strike,P(t,.80,D.strike,E.out));
  tf(rows[0],{o:clamp((t-.3)/.15)*(1-.55*P(t,1.0,.2))});
  const rp=P(t,1.05,.3,E.out);tf(rew,{x:(1-rp)*-14,o:clamp((t-1.05)/.15)});
  // calculator LCD: 145000 → −60000 → red "E" flash
  let txt='0',col='#1a2a20';
  if(t>=.5)txt='145000';if(t>=.8)txt='−60000';if(t>=1.05){txt='E';col=(t<1.30&&Math.floor((t-1.05)*16)%2===0)?'#FF2B3D':'#8e2a30';if(t>=1.30)col='#C0242F';}
  lcd.textContent=txt;lcd.style.color=col;lcd.style.opacity=t<.5?.45:1;
  // kinetic + red "?" drawing itself
  renderLine(l1,t,1.20,{ex:T.exit,exD:.3});renderLine(l2,t,1.70,{ex:T.exit,exD:.3});
  draw(qp,P(t,1.70,D.qDraw,E.out));q.querySelector('#qd').setAttribute('r',22*P(t,2.12,.15,E.pop));
 }});
