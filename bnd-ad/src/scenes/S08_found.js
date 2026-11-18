//@use tafuta
const T={enter:0.00,typing:0.30,tapSearch:0.90,topResult:1.00,kinetic:1.10,tapSite:1.80,zoomSite:1.90,scroll:2.40,exit:3.50,end:4.00};
const D={enter:0.30,cps:20,resPop:0.50,glide:0.40,zoom:0.50,scroll:0.90,exitD:0.45};
const SFX=[{t:0.30,name:"typing"},{t:0.95,name:"tap"},{t:1.00,name:"success-pop"},{t:1.15,name:"ding"},{t:1.10,name:"whoosh"},{t:1.40,name:"hit-bright"},{t:1.85,name:"tap"},{t:1.90,name:"zoom-through"},{t:2.40,name:"scroll"}];
/*==CORE==*/
/* SCENE 08 — FIX A: FOUND AT #1 (bright). Exact mirror of S02, tilted the other way. */
function pastelSalon(w,h,uid,purple){ // stylised gradient illustration (data-slot) — no people
  let dots='';for(let i=0;i<6;i++){const x=w*.24+i*(w*.52/5);dots+=`<circle cx="${x}" cy="${h*.3}" r="${h*.045}" fill="#FFF3D6"/><circle cx="${x}" cy="${h*.3}" r="${h*.1}" fill="#FFE9B8" opacity=".35"/>`;}
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" class="abs" style="left:0;top:0"><defs><linearGradient id="ps${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E4DEFF"/><stop offset="1" stop-color="#FFD9C4"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#ps${uid})"/><rect x="${w*.2}" y="${h*.16}" width="${w*.6}" height="${h*.46}" rx="${h*.06}" fill="#fff" opacity=".7"/>${dots}
  <path d="M${w*.4} ${h}c0-${h*.22} ${w*.04}-${h*.32} ${w*.1}-${h*.32}s${w*.1} ${h*.1} ${w*.1} ${h*.32}z" fill="#9C84FF" opacity=".5"/>
  ${purple?`<rect width="${w}" height="${h}" fill="#4A2FC0" opacity=".34"/><rect width="${w}" height="${h}" fill="url(#ps${uid}o)"/><defs><linearGradient id="ps${uid}o" x1="0" y1="0" x2="0" y2="1"><stop offset=".4" stop-color="#24164F" stop-opacity="0"/><stop offset="1" stop-color="#24164F" stop-opacity=".55"/></linearGradient></defs>`:''}</svg>`;
}
const RES=[["Saluni Glamour","Mikocheni"],["Bella Hair Studio","Mwenge"],["Saluni Malkia","Kinondoni"]];
let ph,tap,TF,topCard,comps=[],badge,site,siteIn,chipSite,l1,l2,pinF,starF,chB1,chB2,scrollBox;
boot({duration:T.end,T,sfx:SFX,bg:'bright',grain:.03,
 build(ctx){
  const L=add(ctx.cam,'<div class="L"></div>');
  ph=mkPhone(L,{cy:1160,theme:'br',bg:'#fff'});
  TF=tafutaHeader(ph,'br');
  topCard=add(TF.pg,`<div class="abs" style="left:36px;top:326px;width:492px;height:322px;border-radius:30px;background:#fff;box-shadow:0 0 0 3px rgba(108,76,245,.25),0 24px 60px rgba(108,76,245,.30);overflow:hidden;transform-origin:50% 40%">
    <div class="abs" data-slot="salon-thumb" style="left:0;top:0;width:492px;height:124px;overflow:hidden">${pastelSalon(492,124,'t')}</div>
    <div class="abs" style="left:24px;top:136px;font-size:34px;font-weight:700;color:#24164F">Biashara yako</div>
    <div class="abs" style="right:24px;top:140px;display:flex;align-items:center;gap:8px;font-size:28px;font-weight:700;color:#24164F">${ico('star',28,'#FFB020',2).replace('fill="none"','fill="#FFB020"')}4.8</div>
    <div class="abs" style="left:24px;top:184px;font-size:25px;font-weight:500;color:#6B6890;white-space:nowrap">Sinza · <span style="color:#22C55E;font-weight:700">Imefunguliwa sasa</span></div>
    <div class="abs chW" style="left:24px;top:232px;height:66px;padding:0 28px;border-radius:999px;border:2px solid #6C4CF5;color:#6C4CF5;font-size:28px;font-weight:700;display:flex;align-items:center">Website</div>
    <div class="abs" style="left:190px;top:232px;height:66px;padding:0 28px;border-radius:999px;background:#6C4CF5;color:#fff;font-size:28px;font-weight:700;display:flex;align-items:center">Book sasa</div><i class="fl"></i></div>`);
  chipSite=topCard.querySelector('.chW');
  RES.forEach((r,i)=>comps.push(add(TF.pg,resCardHTML('br',r[0],r[1],672+i*108,{h:92,style:'opacity:.55;filter:grayscale(1)'}))));
  // website that the zoom-through lands on
  site=add(ph.pgs,`<div class="pg" style="background:#fff;opacity:0"></div>`);
  scrollBox=add(site,'<div class="abs" style="left:0;top:0;width:564px;height:1700px"></div>');
  add(scrollBox,`<div class="abs" data-slot="salon-hero" style="left:0;top:196px;width:564px;height:520px;overflow:hidden">${pastelSalon(564,520,'h',true)}</div>
   <div class="abs" style="left:0;top:96px;width:564px;height:100px;background:#fff;display:flex;align-items:center;justify-content:center;gap:14px">${['Huduma','Bei','Mahali'].map(c=>`<div style="padding:10px 22px;border-radius:999px;background:#F3F0FF;color:#6C4CF5;font-size:26px;font-weight:700">${c}</div>`).join('')}</div>
   <div class="abs" style="left:36px;top:360px;font-size:52px;font-weight:800;color:#fff;line-height:1.05;letter-spacing:-.03em">Uzuri wako,<br>kwa wakati wako.</div>
   <div class="abs" style="left:36px;top:566px;height:80px;padding:0 40px;border-radius:999px;background:#6C4CF5;color:#fff;font-size:32px;font-weight:700;display:flex;align-items:center;gap:12px;box-shadow:0 14px 30px rgba(108,76,245,.45)">${ico('calendar',32,'#fff',2.2)}Book sasa</div>`);
  ['Kusuka — 25,000','Kuosha &amp; kuseti — 15,000','Makeup — 40,000'].forEach((tx,i)=>add(scrollBox,`<div class="abs tab" style="left:36px;top:${764+i*116}px;width:492px;height:96px;border-radius:24px;background:#F6F4FF;display:flex;align-items:center;padding:0 28px;font-size:30px;font-weight:700;color:#24164F">${tx}</div>`));
  add(scrollBox,`<div class="abs" style="left:36px;top:1130px;width:492px;height:220px;border-radius:28px;overflow:hidden;background:#DCEBFF"><svg width="492" height="220" class="abs" style="left:0;top:0" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"><path d="M-10 150L200 120L330 190L520 90M120 -10L170 240M300 -10L360 240"/></svg>
    <div class="abs" style="left:196px;top:34px">${ico('pin',70,'#6C4CF5',2).replace('fill="none"','fill="#6C4CF5"')}</div>
    <div class="abs" style="left:24px;bottom:20px;padding:10px 20px;border-radius:999px;background:#fff;color:#24164F;font-size:28px;font-weight:700">Sinza, Dar es Salaam</div></div>`);
  tap=mkTap(L,'br');
  badge=add(L,`<div class="abs" style="left:0;top:0;width:110px;height:110px;margin:-55px 0 0 -55px;border-radius:50%;background:#6C4CF5;color:#fff;font-size:56px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 40px rgba(108,76,245,.45),inset 0 3px 0 rgba(255,255,255,.35)">#1</div>`);
  l1=mkLine(L,{y:350,size:140,color:'#24164F',words:['Sasa']});
  l2=mkLine(L,{y:495,size:140,color:'#24164F',words:[{t:'wanakuona.',pill:'violet'}]});
  pinF=mkFloat(ctx.fg,gloss('pin','#9C84FF','#5A3AE0',180),130,330,180,180);starF=mkFloat(ctx.fg,gloss('star','#FFD2B8','#FF9E7D',150),960,1640,150,150);
  const chip=tx=>`<div style="padding:14px 30px;border-radius:999px;background:#fff;color:#6C4CF5;font-size:32px;font-weight:700;box-shadow:0 14px 30px rgba(36,22,79,.12)">${tx}</div>`;
  chB1=mkFloat(ctx.bgf,chip('Website'),160,1240,200,70);chB2=mkFloat(ctx.bgf,chip('Bei'),940,860,120,70);
 },
 render(t,ctx){
  const ex=P(t,T.exit,D.exitD,E.in),pe=P(t,T.enter,D.enter,E.out);
  ph.apply({x:0,y:(1-pe)*100-70*ex,s:1.05*lerp(.94,1,pe),rx:4,ry:8-1.2*sin(t,4),rz:0,o:clamp(t/.2)*(1-ex)});
  TF.cr.style.visibility=(t<T.tapSearch+.02&&Math.floor((t-.3)*2.2)%2===0)?'visible':'hidden';TF.tt.textContent=typed('saluni Sinza',t,T.typing,D.cps);
  // taps: search magnifier at 0.90, "Website" chip at 1.80
  const bp=ph.proj(TF.btn.x,TF.btn.y),st1={x:bp.x+200,y:bp.y+360},g1=P(t,.5,.4,E.inOut);
  const cp=ph.proj(36+24+66,326+232+33),st2={x:cp.x+90,y:cp.y+260},g2=P(t,1.35,.45,E.inOut);
  let pos,op;
  if(t<1.3){pos={x:lerp(st1.x,bp.x,g1),y:lerp(st1.y,bp.y,g1)};op=clamp((t-.5)/.12)*(1-P(t,1.0,.25));}
  else{pos={x:lerp(st2.x,cp.x,g2),y:lerp(st2.y,cp.y,g2)};op=clamp((t-1.35)/.1)*(1-P(t,2.0,.2));}
  tapRender(tap,t,pos,[T.tapSearch,T.tapSite],op);
  TF.mb.style.transform=`scale(${squash(t,T.tapSearch)})`;chipSite.style.transform=`scale(${squash(t,T.tapSite)})`;
  // top result: big Sleeko pop with violet glow; competitors slide in smaller and greyed
  const tp=P(t,T.topResult,D.resPop,E.pop2);
  tf(topCard,{s:lerp(.8,1,tp),y:(1-P(t,T.topResult,.5,E.out))*60,o:clamp((t-T.topResult)/.12)});
  const f=topCard.querySelector('.fl');f.style.opacity=t>=1.0?(.35*(1-clamp((t-1.0)/.25))).toFixed(3):0;
  comps.forEach((c,i)=>{const s=1.15+i*.1,p=P(t,s,.45,E.out);tf(c,{y:(1-p)*80,o:clamp((t-s)/.2)*.55});c.style.filter='grayscale(1)';});
  // #1 badge outside the phone, top-right corner of the card
  const bc=ph.proj(528,326),bpp=P(t,1.15,.45,E.pop2);
  tf(badge,{x:bc.x+36,y:bc.y-6,s:lerp(.3,1,bpp),r:-8,o:t>=1.15?(1-ex):0});
  // kinetic
  renderLine(l1,t,1.10,{ex:T.scroll,exD:.3});renderLine(l2,t,1.20,{ex:T.scroll,exD:.3});
  // zoom-through into the website
  const zp=P(t,T.zoomSite,D.zoom,E.snap),ox=(36+24+66),oy=(326+232+33);
  TF.pg.style.transformOrigin=`${ox}px ${oy}px`;TF.pg.style.transform=`scale(${lerp(1,7,zp).toFixed(4)})`;TF.pg.style.opacity=1-clamp((zp-.35)/.45);
  site.style.opacity=clamp((zp-.3)/.5);site.style.transform=`scale(${lerp(.82,1,zp).toFixed(4)})`;
  scrollBox.style.transform=`translateY(${(-600*P(t,T.scroll,D.scroll,E.inOut)).toFixed(2)}px)`;
  // DOF
  const b1=bob(t,1,12,16),b2=bob(t,2,12,16),b3=bob(t,3,16,10),b4=bob(t,4,16,10);
  tf(pinF,{x:b1.x,y:b1.y,r:-10+b1.r,o:.9*(1-ex),b:18});tf(starF,{x:b2.x,y:b2.y,r:12+b2.r,o:.9*(1-ex),b:14});
  tf(chB1,{x:b3.x,y:b3.y-20*t,o:.7*(1-ex),b:8});tf(chB2,{x:b4.x,y:b4.y-14*t,o:.7*(1-ex),b:8});
 }});
