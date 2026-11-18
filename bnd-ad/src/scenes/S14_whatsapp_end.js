const WHATSAPP_NUMBER = "+255 617 502 185";   // ← ONE constant; the number is rendered from here everywhere
const T={headline:0.00,phoneIn:0.50,typing:1.10,send:2.90,sent:3.10,reply:3.70,pullBack:4.60,logo:5.00,tagline:5.60,ctaButton:6.10,instruction:6.50,hold:7.10,end:8.00};
const D={wordStag:0.07,phone:0.60,cps:29,tick:3.45,pull:0.60,logoSpin:0.45,cta:0.45};
const SFX=[{t:0.00,name:"whoosh-soft"},{t:0.40,name:"hit-bright"},{t:0.50,name:"phone-rise"},{t:1.10,name:"keyboard-typing"},{t:2.95,name:"send-whoosh"},{t:3.45,name:"tick"},{t:4.00,name:"msg-in"},{t:4.60,name:"portal-whoosh"},{t:5.00,name:"logo-ping"},{t:5.60,name:"shimmer"},{t:6.10,name:"pop"},{t:6.80,name:"soft-chime-final"}];
/*==CORE==*/
/* SCENE 14 — WHATSAPP CTA → END CARD (bright). Generic "Chat" app only (no real messenger logo). Final frame is a poster. */
const MSG="Jina la biashara + ninachohitaji: website na booking.";
let ph,tap,inp,inpT,sendB,sent,tickG,typing,reply,l1,l2,hdr1,partA,partB,logoBox,logoW,glow,tagL1,tagL2,cta,ctaPb,ins,fgI=[],bgI=[],sheet;
const tick2=c=>`<svg width="34" height="22" viewBox="0 0 34 22" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l6 6L20 4"/><path d="M13 14l4 4L31 4"/></svg>`;
boot({duration:T.end,T,sfx:SFX,bg:'bright',grain:.03,
 build(ctx){
  partA=add(ctx.cam,'<div class="L"></div>');partB=add(ctx.cam,'<div class="L"></div>');
  ph=mkPhone(partA,{cy:1190,theme:'br',bg:'#EFEAE2'});
  const pg=add(ph.pgs,'<div class="pg" style="background:#EFEAE2"></div>');
  add(pg,`<div class="abs" style="left:0;top:0;width:564px;height:224px;background:#1F7A5C"></div>
   <div class="abs" style="left:24px;top:116px">${ico('back',44,'#fff',2.6)}</div>
   <div class="abs" style="left:84px;top:104px;width:84px;height:84px;border-radius:50%;background:#24164F;display:flex;align-items:center;justify-content:center">${logoHTML(26,'dk')}</div>
   <div class="abs" style="left:184px;top:106px;color:#fff;font-size:32px;font-weight:700;line-height:1.15">B&amp;D</div><div class="abs" style="left:184px;top:148px;color:rgba(255,255,255,.85);font-size:26px;font-weight:500">online</div>`);
  inp=add(pg,`<div class="abs" style="left:20px;width:448px;bottom:28px;min-height:76px;border-radius:38px;background:#fff;padding:18px 28px;font-size:28px;font-weight:500;color:#1a1a1a;line-height:1.25;box-shadow:0 6px 16px rgba(0,0,0,.08)"><span class="tx"></span><i class="cr" style="display:inline-block;width:3px;height:30px;margin-left:2px;vertical-align:-5px;background:#25A06B"></i></div>`);
  inpT=inp.querySelector('.tx');
  sendB=add(pg,`<div class="abs" style="left:476px;bottom:28px;width:76px;height:76px;border-radius:50%;background:#25A06B;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 18px rgba(37,160,107,.4)">${ico('send',36,'#fff',2.2)}</div>`);
  sent=add(pg,`<div class="abs" style="left:96px;top:300px;width:444px;border-radius:24px 24px 6px 24px;background:#D9FDD3;padding:18px 24px 12px;box-shadow:0 3px 8px rgba(0,0,0,.08);color:#1a1a1a;opacity:0"><div style="font-size:28px;font-weight:500;line-height:1.3">${MSG}</div><div style="display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:6px;font-size:26px;color:#667781;font-weight:500">10:24<span class="tk" style="display:inline-block">${tick2('#9AA0A6')}</span></div></div>`);
  tickG=sent.querySelector('.tk');
  typing=add(pg,`<div class="abs" style="left:24px;top:540px;height:64px;padding:0 22px;border-radius:24px 24px 24px 6px;background:#fff;display:flex;align-items:center;gap:14px;font-size:26px;font-weight:500;color:#667781;box-shadow:0 3px 8px rgba(0,0,0,.08);opacity:0"><span class="dts" style="display:flex;gap:6px">${[0,1,2].map(()=>'<i style="width:10px;height:10px;border-radius:50%;background:#8A949B;display:block"></i>').join('')}</span>B&amp;D anaandika…</div>`);
  reply=add(pg,`<div class="abs" style="left:24px;top:540px;padding:16px 24px;border-radius:24px 24px 24px 6px;background:#fff;font-size:30px;font-weight:600;color:#1a1a1a;box-shadow:0 3px 8px rgba(0,0,0,.08);opacity:0">Karibu! Tuanze leo.</div>`);
  tap=mkTap(partA,'br');
  l1=mkLine(partA,{y:355,size:110,color:'#24164F',words:['Tuma']});
  l2=mkLine(partA,{y:480,size:110,color:'#24164F',words:[{t:'ujumbe&nbsp;mmoja.',pill:'violet'}]});
  [['chat','#5EE29A','#16A34A',170,100,1560,'fg'],['check','#9C84FF','#5A3AE0',140,985,340,'fg'],['clock','#C9BBFF','#8C6CFF',100,120,790,'bg'],['star','#FFE08A','#F5A524',100,950,1300,'bg']].forEach(([n,a,b,sz,x,y,pl])=>{const e=mkFloat(pl==='fg'?ctx.fg:ctx.bgf,gloss(n,a,b,sz),x,y,sz,sz);(pl==='fg'?fgI:bgI).push(e);});
  // END CARD
  glow=add(partB,`<div class="abs" style="left:240px;top:600px;width:600px;height:240px;border-radius:50%;background:radial-gradient(ellipse,rgba(226,191,133,.55),rgba(226,191,133,0) 68%);opacity:0"></div>`);
  logoBox=add(partB,`<div class="abs" style="left:0;top:600px;width:1080px;height:240px;display:flex;align-items:center;justify-content:center;perspective:900px"></div>`);
  logoW=add(logoBox,`<div style="position:relative">${logoHTML(240,'br')}<div class="swc"><div class="swb"></div></div></div>`);
  tagL1=mkLine(partB,{y:915,size:64,weight:700,color:'#24164F',words:['Biashara','yako,','online,']});
  tagL2=mkLine(partB,{y:1000,size:64,weight:700,color:'#24164F',words:[{t:'kwa ubora.',pill:'violet'}]});
  cta=add(partB,`<div class="abs" style="left:110px;top:1195px;width:860px;height:170px"><div class="pb" style="position:absolute;inset:0;border-radius:999px;background:#25A06B;box-shadow:0 30px 70px rgba(37,160,107,.45),0 10px 24px rgba(36,22,79,.12);transform-origin:50% 50%"></div>
    <div style="position:absolute;left:44px;top:35px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center">${ico('chat',54,'#fff',2.2)}</div>
    <div style="position:absolute;left:172px;top:0;height:170px;display:flex;flex-direction:column;justify-content:center"><div style="font-size:28px;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,.9);line-height:1.1">TUMA UJUMBE WHATSAPP</div><div class="wn tab" style="font-size:64px;font-weight:800;color:#fff;letter-spacing:-.02em;line-height:1.1;margin-top:6px;white-space:nowrap"></div></div></div>`);
  cta.querySelector('.wn').textContent=WHATSAPP_NUMBER;ctaPb=cta;
  ins=add(partB,`<div class="abs" style="left:0;top:1405px;width:1080px;text-align:center;font-size:40px;font-weight:600;color:#6B6890;letter-spacing:-.01em">Jina la biashara + unachohitaji.</div>`);
 },
 render(t,ctx){
  const pp=P(t,T.phoneIn,D.phone,E.out),pull=P(t,T.pullBack,D.pull,E.inOut),a=1-pull;
  // PART A — chat
  const ty=P(t,T.phoneIn,1.0,E.inOut);
  ph.apply({x:0,y:(1-pp)*500,s:lerp(1.02,.52,pull),rx:2,ry:lerp(10,3,ty)+(67*pull)+1.1*sin(t,5),rz:0,o:clamp((t-T.phoneIn)/.25)*(1-pull)});
  renderLine(l1,t,.15,{ex:T.pullBack,exD:.35});renderLine(l2,t,.3,{ex:T.pullBack,exD:.35});
  // typing in the input pill (+ caret), tap on send, message flies into a sent bubble, ticks turn blue
  const s=T.sent-.1;
  inpT.textContent=t<s?typed(MSG,t,T.typing,D.cps):'';inp.querySelector('.cr').style.visibility=(t>=T.phoneIn&&t<s&&Math.floor(t*2.2)%2===0)?'visible':'hidden';
  inp.style.opacity=t<s?1:.0;
  const bp=ph.proj(514,1136),g=P(t,2.55,.35,E.inOut),st={x:bp.x+150,y:bp.y+300};
  tapRender(tap,t,{x:lerp(st.x,bp.x,g),y:lerp(st.y,bp.y,g)},[T.send+.05],clamp((t-2.55)/.1)*(1-P(t,3.2,.2))*a);
  sendB.style.transform=`scale(${squash(t,T.send+.05)})`;
  const fp=P(t,s+.05,.5,E.out);tf(sent,{y:(1-fp)*720,s:lerp(.82,1,fp),o:clamp((t-s-.05)/.1)});
  const tb=P(t,D.tick,.3,E.pop),tc=t>=D.tick?'#53BDEB':'#9AA0A6';tickG.innerHTML=tick2(tc);tickG.style.transform=`scale(${t>=D.tick?lerp(1.5,1,tb):1})`;
  // reply: typing dots (0.3s) then "Karibu! Tuanze leo."
  const tv=t>=3.70&&t<4.0;typing.style.opacity=tv?1:0;
  typing.querySelectorAll('.dts i').forEach((d,i)=>{d.style.transform=`translateY(${(-4*Math.sin((t-3.7)*16+i*1.1)).toFixed(2)}px)`;});
  const rp=P(t,4.0,.4,E.pop2);tf(reply,{y:(1-rp)*30,s:lerp(.8,1,rp),o:clamp((t-4.0)/.1)});reply.style.transformOrigin='0 100%';
  // DOF fade-out with the phone
  fgI.forEach((e,i)=>{const b=bob(t,i+1,12,16);tf(e,{x:b.x,y:b.y,r:(i?10:-10)+b.r,o:.9*a,b:16});});
  bgI.forEach((e,i)=>{const b=bob(t,i+5,12,12);tf(e,{x:b.x,y:b.y,r:b.r,o:.6*a,b:8});});
  // PART B — end card
  const lp=P(t,T.logo,D.logoSpin,E.pop);
  logoW.style.transform=`rotateY(${(90*(1-lp)).toFixed(2)}deg) scale(${lerp(.8,1,lp).toFixed(3)})`;logoW.style.opacity=clamp((t-T.logo)/.12);
  logoSweep(logoW,t,5.60,.35);
  glow.style.opacity=t<T.logo?0:(.55+.25*Math.sin((t-T.logo)*2*Math.PI/2.4))*clamp((t-T.logo)/.4);
  renderLine(tagL1,t,T.tagline,{stag:.09});renderLine(tagL2,t,T.tagline+.3,{});
  const cp=P(t,T.ctaButton,D.cta,E.pop2),br=t>T.ctaButton+D.cta?1+.015*(.5-.5*Math.cos((t-T.ctaButton-D.cta)*2*Math.PI/2.4)):1;
  tf(cta,{y:(1-P(t,T.ctaButton,D.cta,E.out))*70,s:lerp(.8,1,cp)*br,o:clamp((t-T.ctaButton)/.12)});
  const ip=P(t,T.instruction,.5,E.out);tf(ins,{y:(1-ip)*30,o:clamp((t-T.instruction)/.3)});
 }});
