const T={blobs:0.00,logoIn:0.10,sweep:0.60,portal:0.95,toDark:1.55,end:2.00};
const D={letter:0.40,stag:0.08,sweep:0.35,portal:0.60,toDark:0.45,glowIn:0.50,darkIn:0.30};
const SFX=[{t:0.10,name:"whoosh-soft"},{t:0.25,name:"pop"},{t:0.40,name:"pop"},{t:0.60,name:"shimmer"},{t:0.95,name:"whoosh-deep"},{t:1.55,name:"low-boom"}];
/*==CORE==*/
/* SCENE 01 — BRAND OPEN: logo ident → portal into the dark problem world */
let box,lw,glow,dkOver,wash,Apos={x:540,y:920};
boot({duration:T.end,T,sfx:SFX,bg:'bright',grain:.03,
  build(ctx){
    box=add(ctx.cam,`<div class="abs" style="left:0;top:770px;width:1080px;height:300px;display:flex;align-items:center;justify-content:center"></div>`);
    lw=add(box,`<div style="position:relative">${logoHTML(300,'br')}<div class="swc"><div class="swb"></div></div></div>`);
    lw.firstChild.style.perspective='900px';
    glow=add(lw,`<div class="abs" style="width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(226,191,133,.9),rgba(226,191,133,0) 65%);left:0;top:0;opacity:0;z-index:-1"></div>`);
    dkOver=add(ctx.fg,`<div class="L" style="background:#05070A;opacity:0"></div>`);
    wash=add(ctx.fg,`<div class="L" style="background:${DARK_WASH};opacity:0"></div>`);
  },
  afterFonts(){
    const A=lw.querySelector('.lA'),p=offsetIn(A,box);
    Apos={x:p.x+A.offsetWidth/2,y:p.y+A.offsetHeight/2};
    const g=offsetIn(A,lw);glow.style.left=(g.x+A.offsetWidth/2-260)+'px';glow.style.top=(g.y+A.offsetHeight/2-260)+'px';
  },
  render(t,ctx){
    const B=lw.querySelector('.lB'),A=lw.querySelector('.lA'),Dd=lw.querySelector('.lD');
    // --- logoIn: staggered letters
    const L=(el,i,fn)=>{const s=T.logoIn+i*D.stag,p=P(t,s,D.letter,E.pop);fn(el,p,clamp((t-s)/(D.letter*.4)));};
    L(B,0,(e,p,o)=>{e.style.transform=`translateY(${(1-p)*80}px) rotateY(${-60*(1-p)}deg)`;e.style.opacity=o;});
    L(A,1,(e,p,o)=>{e.style.transform=`scale(${lerp(.4,1,p)}) rotate(${-25*(1-p)}deg)`;e.style.opacity=o;});
    L(Dd,2,(e,p,o)=>{e.style.transform=`translateY(${(1-p)*80}px) rotateY(${60*(1-p)}deg)`;e.style.opacity=o;});
    glow.style.opacity=.5*P(t,T.logoIn,D.glowIn,E.out);
    // --- sweep
    logoSweep(lw,t,T.sweep,D.sweep);
    // --- portal: spin on Y while pushing INTO the ampersand (~18x) toward screen centre
    const q=P(t,T.portal,D.portal,E.inOut), S=Math.exp(Math.log(18)*q);
    const cx=540,cy=960, ax=Apos.x, ay=770+Apos.y;
    box.style.transformOrigin=`${Apos.x}px ${Apos.y}px`;
    box.style.transform=`perspective(1400px) translate(${((cx-ax)*q).toFixed(2)}px,${((cy-ay)*q).toFixed(2)}px) rotateY(${(180*q).toFixed(2)}deg) scale(${S.toFixed(4)})`;
    // gold → #05070A as it passes the camera
    const dk=P(t,1.15,.40,E.inOut);
    A.style.filter=`brightness(${(1-dk).toFixed(3)})`;
    dkOver.style.opacity=P(t,T.toDark-D.darkIn,D.darkIn,E.in);
    ctx.cam.style.visibility=t>=T.toDark?'hidden':'visible';
    // --- toDark: teal glow wash fades in; ends exactly on the DARK HANDOFF FRAME
    wash.style.opacity=P(t,T.toDark,D.toDark,E.out);
    ctx.grain.style.opacity=lerp(.03,.04,P(t,T.toDark,D.toDark,E.out));
  }});
