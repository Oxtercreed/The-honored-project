/* ============================ CORE (shared engine) ============================ */
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,p)=>a+(b-a)*p;
function bez(x1,y1,x2,y2){ // cubic-bezier(x1,y1,x2,y2) → easing function
  const cx=3*x1,bx=3*(x2-x1)-cx,ax=1-cx-bx,cy=3*y1,by=3*(y2-y1)-cy,ay=1-cy-by;
  const sx=t=>((ax*t+bx)*t+cx)*t, sy=t=>((ay*t+by)*t+cy)*t, dsx=t=>(3*ax*t+2*bx)*t+cx;
  return x=>{ if(x<=0)return 0; if(x>=1)return 1; let t=x;
    for(let i=0;i<8;i++){ const d=sx(t)-x; if(Math.abs(d)<1e-5)break; t-=d/(dsx(t)||1e-6); }
    return sy(clamp(t)); };
}
const E={ out:bez(.16,1,.3,1), pop:bez(.34,1.56,.64,1), inOut:bez(.65,0,.35,1),
          snap:bez(.7,0,.2,1), soft:bez(.33,0,.67,1), in:bez(.55,0,1,.45), pop2:bez(.3,2.1,.55,1), lin:x=>x };
// eased progress of a move that starts at s and lasts d seconds
const P=(t,s,d,ease=E.out)=>ease(clamp((t-s)/d));

/* ---------- misc helpers ---------- */
const Q=new URLSearchParams(location.search);
const DEBUG=Q.get('debug')==='1';
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const RND=mulberry32(7);               // seeded, computed ONCE at load
const $=id=>document.getElementById(id);
function h(html){const d=document.createElement('div');d.innerHTML=html.trim();return d.firstElementChild;}
function add(parent,html){const d=document.createElement('div');d.innerHTML=html.trim();const f=d.firstElementChild;while(d.firstChild)parent.appendChild(d.firstChild);return f;} // appends ALL root nodes, returns the first element
const fmt=n=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
const typed=(s,t,start,cps)=>s.slice(0,clamp(Math.floor((t-start)*cps),0,s.length));
const caret=t=>(Math.floor(t*2.2)%2===0);
const sin=(t,period,ph=0)=>Math.sin((t/period+ph)*Math.PI*2);
/* transform+opacity+filter setter. x,y,z px · s,sx,sy scale · r(z) rx ry deg · o opacity · b blur px · br brightness */
function tf(e,o){
  let t='';
  if(o.x||o.y||o.z)t+=`translate3d(${(o.x||0).toFixed(2)}px,${(o.y||0).toFixed(2)}px,${(o.z||0).toFixed(2)}px) `;
  if(o.rx)t+=`rotateX(${o.rx.toFixed(3)}deg) `;
  if(o.ry)t+=`rotateY(${o.ry.toFixed(3)}deg) `;
  if(o.r)t+=`rotate(${o.r.toFixed(3)}deg) `;
  if(o.skx)t+=`skewX(${o.skx}deg) `;
  if(o.s!==undefined&&o.sx===undefined&&o.sy===undefined)t+=`scale(${o.s.toFixed(4)}) `;
  else if(o.sx!==undefined||o.sy!==undefined)t+=`scale(${(o.sx??o.s??1).toFixed(4)},${(o.sy??o.s??1).toFixed(4)}) `;
  e.style.transform=t||'none';
  if(o.o!==undefined)e.style.opacity=clamp(o.o).toFixed(3);
  let f='';
  if(o.b)f+=`blur(${o.b.toFixed(2)}px) `;
  if(o.br!==undefined&&o.br!==1)f+=`brightness(${o.br}) `;
  e.style.filter=f||'none';
}
/* stroke-draw helper for paths with pathLength=1 (hides the round-cap dot before the draw starts) */
function draw(e,p){e.style.strokeDasharray='1';e.style.strokeDashoffset=(1-p).toFixed(4);e.style.opacity=p>.001?1:0;}
const vis=(e,on)=>{e.style.visibility=on?'visible':'hidden';};

/* ---------- palette ---------- */
const C={ dbg:'#05070A',dbg2:'#0B1016',dpanel:'#111821',dpanel2:'#18212C',dtext:'#F2F5F8',dmuted:'#8A97A6',teal:'#14B8A6',cyan:'#22D3EE',pain:'#FF4D5E',amber:'#F5B544',
  lilac:'#E9E3FF',lilac2:'#D6CBFF',peach:'#FFE4D6',peach2:'#FFC9B0',blue:'#DCEBFF',ink:'#24164F',navy:'#1B1F4B',violet:'#6C4CF5',coral:'#FF8A65',success:'#22C55E',muted:'#6B6890' };
const PILLS={teal:['#14B8A6','#041014'],pain:['#FF4D5E','#ffffff'],amber:['#F5B544','#1A1200'],violet:['#6C4CF5','#ffffff'],peach:['#FFC9B0','#24164F'],success:['#22C55E','#ffffff'],coral:['#FF8A65','#ffffff']};
const DARK_WASH='radial-gradient(circle at 50% 42%,rgba(20,184,166,0.14),transparent 58%),radial-gradient(circle at 80% 85%,rgba(34,211,238,0.08),transparent 50%)';
const BRIGHT_BG='radial-gradient(circle at 18% 16%,#DCEBFF 0%,transparent 42%),radial-gradient(circle at 85% 80%,#FFC9B0 0%,transparent 45%),linear-gradient(160deg,#E9E3FF 0%,#F4EEFF 45%,#FFE4D6 100%)';

/* ---------- glyph icons (24-grid strokes) + glossy 3D-style tiles ---------- */
const G={
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
 phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
 calendar:'<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
 bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
 chart:'<path d="M3 3v18h18"/><path d="M8 16v-3M13 16V8M18 16v-6"/>',
 window:'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20"/>',
 mobile:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
 check:'<path d="M5 13l4 4L19 7"/>',
 star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
 pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
 send:'<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
 back:'<path d="M19 12H5M12 19l-7-7 7-7"/>',
 chat:'<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 3.9 11.5 8.5 8.5 0 0 1 12.4 3 8.4 8.4 0 0 1 21 11.5z"/>',
 box:'<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l3 12h11l2-8H6"/>',
 home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
 list:'<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 sparkle:'<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
 tag:'<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
 truck:'<path d="M1 4h13v12H1zM14 8h5l4 4v4h-9"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
 grad:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5"/>',
 bed:'<path d="M3 18V6M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="1.5"/>',
};
function ico(name,size=32,color='currentColor',sw=2){return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${G[name]||''}</svg>`;}
let _gid=0;
function gloss(name,c1,c2,size=160,glyph=true){ // glossy rounded-square 3D-feel tile
  const id='g'+(_gid++);
  return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 100 100" style="overflow:visible;filter:drop-shadow(0 14px 16px rgba(36,22,79,.26))"><defs>
  <linearGradient id="${id}a" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
  <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
  <radialGradient id="${id}h" cx=".28" cy=".05" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".6" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
  <rect x="4" y="4" width="92" height="92" rx="29" fill="url(#${id}a)"/><rect x="4" y="4" width="92" height="92" rx="29" fill="url(#${id}b)"/>
  <rect x="4" y="4" width="92" height="50" rx="29" fill="url(#${id}h)"/><rect x="4.5" y="4.5" width="91" height="91" rx="28.5" fill="none" stroke="#fff" stroke-opacity=".5"/>
  ${glyph?`<g transform="translate(24,25) scale(2.1)" stroke="#fff" stroke-width="2.1" fill="none" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 1px 1px rgba(0,0,0,.25))">${G[name]||''}</g>`:''}</svg>`;
}
/* ---------- logo ---------- */
function logoHTML(size,tone){return `<span class="logo ${tone==='dk'?'dk':'br'}" style="font-size:${size}px"><span class="lB">B</span><span class="lA">&amp;</span><span class="lD">D</span></span>`;}
function logoSweep(logoEl,t,s,d=.35){ // light sweep across a .logo (needs .swc>.swb inside)
  const b=logoEl.querySelector('.swb'); if(!b)return; const p=P(t,s,d,E.inOut);
  b.style.transform=`translateX(${lerp(-60,420,p)*1}%) skewX(-20deg)`; b.style.opacity=(t>=s&&t<=s+d)?1:0;
}
function mkLogo(parent,size,tone,style=''){
  const wrap=add(parent,`<div class="abs" style="${style}">${logoHTML(size,tone)}<div class="swc"><div class="swb"></div></div></div>`);
  return {wrap,logo:wrap.querySelector('.logo'),B:wrap.querySelector('.lB'),A:wrap.querySelector('.lA'),D:wrap.querySelector('.lD')};
}
function offsetIn(el,anc){let x=0,y=0;while(el&&el!==anc){x+=el.offsetLeft;y+=el.offsetTop;el=el.offsetParent;}return{x,y};}

/* ---------- kinetic text: word by word with masks + pills ---------- */
const _fitters=[];
function mkLine(parent,o){
  // o: {y, size, weight=800, color, words:[str | {t,pill}], maxW=960, theme}
  const wrap=add(parent,`<div class="line" style="top:${o.y}px"><div class="li" style="font-size:${o.size}px;font-weight:${o.weight||800};color:${o.color||'#fff'}"><div class="lin"></div></div></div>`);
  const lin=wrap.querySelector('.lin'), words=[];
  for(const wd of o.words){
    const t=typeof wd==='string'?wd:wd.t, pill=typeof wd==='string'?null:wd.pill, fs=typeof wd==='string'?1:(wd.fs||1);
    const w=add(lin,`<span class="w${pill?' hp':''}" style="font-size:${fs}em">${pill?'<span class="pb"></span>':''}<span class="wm"><span class="wi">${t}</span></span></span>`);
    const pb=w.querySelector('.pb'),wi=w.querySelector('.wi');
    if(pill){const pc=PILLS[pill];pb.style.background=pc[0];wi.style.color=pc[1];}
    words.push({w,wi,pb,pill,wm:w.querySelector('.wm')});
  }
  const L={wrap,words,y:o.y,size:o.size,li:wrap.querySelector('.li'),lin};
  _fitters.push(()=>{wrap.querySelector('.li').style.fontSize=o.size+'px';const w=lin.offsetWidth;const mx=o.maxW||960;if(w>mx)wrap.querySelector('.li').style.fontSize=(o.size*mx/w).toFixed(2)+'px';});
  return L;
}
/* renders a line at time t. s = start of first word; opts:{stag=.07, starts:[..], ex (exit start), exD, dy} */
function renderLine(L,t,s,opts={}){
  const stag=opts.stag??.07,dur=.32;
  L.words.forEach((W,i)=>{
    const ws=opts.starts?opts.starts[i]:s+i*stag;
    const ts=W.pill?ws+.08:ws;
    const p=P(t,ts,dur,E.pop), op=clamp((t-ts)/(dur*.4));
    W.wi.style.transform=`translateY(${((1-p)*60).toFixed(2)}%) scale(${lerp(.86,1,p).toFixed(4)})`;
    W.wi.style.opacity=op.toFixed(3);
    if(W.pb)W.pb.style.transform=`scaleX(${P(t,ws,.30,E.out).toFixed(4)})`;
  });
  let y=opts.dy||0,o=1,b=0;
  if(opts.ex!==undefined){const p=P(t,opts.ex,opts.exD||.28,E.in);y+=-.3*L.size*p;o=1-p;b=8*p;}
  tf(L.wrap,{y,o,b});
}
function lineEnd(L,s,opts={}){return s+(L.words.length-1)*(opts.stag??.07)+.4;}

/* ---------- background layers ---------- */
function mkBright(parent){
  const root=add(parent,`<div class="L" style="background:${BRIGHT_BG}"></div>`);
  const bl=[['#D6CBFF',-140,180,1,0],['#FFC9B0',520,1240,2,.25],['#DCEBFF',420,-120,1,.5]].map(([c,x,y,k,ph])=>{const b=add(root,`<div class="blob" style="background:${c};left:${x}px;top:${y}px"></div>`);return{b,x,y,k,ph};});
  return {root,render(t,dur){bl.forEach((B,i)=>{const a=36;const dx=a*sin(t,dur/B.k,0),dy=a*Math.sin(2*Math.PI*B.k*t/dur+B.ph*6.28)-a*Math.sin(B.ph*6.28);B.b.style.transform=`translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px)`;});}};
}
function mkDark(parent){
  const root=add(parent,`<div class="L" style="background:${DARK_WASH},#05070A"></div>`);
  return {root};
}
const GRAIN="url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>\")";

/* ---------- phone mockup (Bible F) ---------- */
function mkPhone(parent,o){
  // o:{cy, theme:'dk'|'br', ink, bg, z}
  const root=add(parent,`<div class="ph3" ${o.z?`style="z-index:${o.z}"`:''}></div>`);
  const ink=o.ink||(o.theme==='dk'?'#F2F5F8':'#24164F');
  const body=add(root,`<div class="ph ${o.theme}" style="top:${o.cy-620}px"><div class="phin"></div>
    <i class="btn" style="left:-4px;top:210px;height:70px"></i><i class="btn" style="left:-4px;top:310px;height:110px"></i><i class="btn" style="right:-4px;top:290px;height:150px"></i>
    <div class="scr" style="background:${o.bg||'#fff'}"><div class="pgs"></div>
      <div class="sb" style="color:${ink}"><span class="tm">09:41</span><span class="ic">
        <svg width="34" height="22" viewBox="0 0 34 22" fill="${ink}"><rect x="0" y="14" width="6" height="8" rx="1.5"/><rect x="9" y="9" width="6" height="13" rx="1.5"/><rect x="18" y="4" width="6" height="18" rx="1.5"/><rect x="27" y="0" width="6" height="22" rx="1.5"/></svg>
        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"><path d="M3 8a17 17 0 0 1 24 0"/><path d="M8 13a10 10 0 0 1 14 0"/><circle cx="15" cy="18" r="1.6" fill="${ink}"/></svg>
        <svg width="46" height="22" viewBox="0 0 46 22" fill="none"><rect x="1" y="1" width="38" height="20" rx="6" stroke="${ink}" stroke-opacity=".5" stroke-width="2"/><rect x="4" y="4" width="28" height="14" rx="3.5" fill="${ink}"/><rect x="41" y="7" width="3.5" height="8" rx="1.7" fill="${ink}" fill-opacity=".5"/></svg></span></div>
      <div class="isl"></div><div class="glare"></div></div></div>`);
  const scr=body.querySelector('.scr'), pgs=body.querySelector('.pgs');
  const S={root,body,scr,pgs,cy:o.cy,st:{x:0,y:0,s:1,rx:0,ry:0,rz:0},
    apply(st){S.st=Object.assign({x:0,y:0,s:1,rx:0,ry:0,rz:0},st);const a=S.st;
      body.style.transform=`translate3d(${a.x}px,${a.y}px,0) rotateX(${a.rx}deg) rotateY(${a.ry}deg) rotateZ(${a.rz}deg) scale(${a.s})`;
      root.style.opacity=a.o===undefined?1:clamp(a.o);
      body.style.filter=a.b?`blur(${a.b}px)`:'none';},
    // map a point on the screen (0..564, 0..1204) to stage px under the current transform + 2400 perspective
    proj(sx,sy){return projectPhone(S.st,S.cy,sx-282,sy-602+0);},
    projBody(bx,by){return projectPhone(S.st,S.cy,bx-300,by-620);}};
  return S;
}
function projectPhone(st,cy,px,py){
  const rx=st.rx*Math.PI/180,ry=st.ry*Math.PI/180,rz=st.rz*Math.PI/180;
  let x=px*st.s,y=py*st.s,z=0,t;
  t=x*Math.cos(rz)-y*Math.sin(rz);y=x*Math.sin(rz)+y*Math.cos(rz);x=t;                 // rotateZ
  t=x*Math.cos(ry)+z*Math.sin(ry);z=-x*Math.sin(ry)+z*Math.cos(ry);x=t;                 // rotateY
  t=y*Math.cos(rx)-z*Math.sin(rx);z=y*Math.sin(rx)+z*Math.cos(rx);y=t;                  // rotateX
  const X=540+st.x+x, Y=cy+st.y+y, d=2400, k=d/(d-z);
  return {x:540+(X-540)*k, y:960+(Y-960)*k, k};
}

/* ---------- finger-tap ring (Bible E6) ---------- */
function mkTap(parent,theme){return add(parent,`<div class="tap ${theme}"><div class="tr"></div><div class="td"></div></div>`);}
function tapRender(tap,t,pos,presses,o=1){
  // pos {x,y}; presses [times]
  let sc=1,rp=0,ro=0;
  for(const pt of presses){const dt=t-pt;if(dt<0)continue;
    if(dt<.12)sc=1-.18*E.out(dt/.12);else if(dt<.30)sc=.82+.18*E.pop((dt-.12)/.18);
    if(dt<.45){rp=lerp(.6,1.8,E.out(dt/.45));ro=lerp(.6,0,E.out(dt/.45));}}
  tap.style.transform=`translate(${pos.x.toFixed(2)}px,${pos.y.toFixed(2)}px)`;tap.style.opacity=o;
  tap.firstChild.style.transform=`scale(${rp})`;tap.firstChild.style.opacity=ro;tap.lastChild.style.transform=`scale(${sc})`;
}
/* button squash 1→.94→1 after a tap */
function squash(t,pt){const dt=t-pt;if(dt<0||dt>.4)return 1;if(dt<.1)return lerp(1,.94,E.out(dt/.1));return lerp(.94,1,E.pop((dt-.1)/.3));}

/* ---------- notification card (Bible I) ---------- */
function ncardHTML(o){ // {theme, icon(html), title, body, time, w, x, y}
  return `<div class="nc ${o.theme}" style="width:${o.w}px;${o.style||''}"><div class="ni" style="background:${o.iconBg||'#25A06B'}">${o.icon||ico('chat',38,'#fff')}<i class="ping" style="border-color:${o.pingColor||'#25A06B'}"></i></div>
   <div style="min-width:0"><div class="nt">${o.title}</div><div class="nb">${o.body||''}</div></div>${o.time?`<div class="nm">${o.time}</div>`:''}<i class="fl"></i></div>`;
}
function cardPop(card,t,s,base={}){ // overshoot pop + flash + ping, returns progress 0..1 for visibility
  const p=P(t,s,.45,E.pop2), sc=lerp(.85,1,p), op=clamp((t-s)/.12);
  const fl=card.querySelector('.fl'),pg=card.querySelector('.ping');
  if(fl)fl.style.opacity=(.3*(1-clamp((t-s)/.2))*(t>=s?1:0)).toFixed(3);
  if(pg){const q=clamp((t-s)/.5);pg.style.transform=`scale(${lerp(1,1.6,E.out(q))})`;pg.style.opacity=t>=s?(lerp(.5,0,q)).toFixed(3):0;}
  return {y:(1-P(t,s,.45,E.pop))*50+(base.y||0),s:sc*(base.s||1),o:op*(base.o===undefined?1:base.o)};
}

/* ---------- floating DOF helper ---------- */
function bob(t,seed,ampx=10,ampy=14,per=3.2){return {x:ampx*Math.sin(2*Math.PI*(t/per+seed*.37)),y:ampy*Math.sin(2*Math.PI*(t/(per*1.17)+seed*.61)),r:3*Math.sin(2*Math.PI*(t/(per*1.4)+seed*.23))};}
function mkFloat(parent,html,x,y,w,h_,style=''){return add(parent,`<div class="abs" style="left:${x-w/2}px;top:${y-h_/2}px;width:${w}px;height:${h_}px;display:flex;align-items:center;justify-content:center;${style}">${html}</div>`);}

/* ============================ BOOT / TRANSPORT ============================ */
function boot(cfg){
  const dur=cfg.duration;
  const stage=$('stage'),bgL=$('bg'),bgf=$('bgf'),cam=$('cam'),fg=$('fg'),grain=$('grain'),dbg=$('dbg');
  const ctx={stage,bg:bgL,bgf,cam,fg,grain,dur,T:cfg.T};
  function fit(){const k=Math.min(innerWidth/1080,innerHeight/1920);stage.style.transform=`scale(${k})`;ctx.k=k;}
  addEventListener('resize',fit);fit();
  grain.style.cssText+=`;background-image:${GRAIN};background-size:300px 300px;opacity:${cfg.grain??.04}`;
  if(cfg.bg==='bright'){ctx.bright=mkBright(bgL);}else if(cfg.bg==='dark'){ctx.dark=mkDark(bgL);}
  cfg.build(ctx);
  // debug overlay
  let dbgT=null,dbgB=null;
  if(DEBUG){
    dbg.innerHTML=`<div class="abs" style="left:60px;top:0;width:1px;height:1920px;background:rgba(255,0,0,.55)"></div><div class="abs" style="left:1020px;top:0;width:1px;height:1920px;background:rgba(255,0,0,.55)"></div>
    <div class="abs" style="left:0;top:250px;width:1080px;height:1px;background:rgba(255,0,0,.55)"></div><div class="abs" style="left:0;top:1570px;width:1080px;height:1px;background:rgba(255,0,0,.55)"></div>
    <div id="dbgbox" class="abs" style="left:70px;top:90px;padding:10px 16px;background:rgba(0,0,0,.7);color:#7CFF9C;font:600 28px/1.2 ui-monospace,Menlo,monospace;border-radius:10px"></div>`;
    dbgT=$('dbgbox');
  }
  const labels=Object.entries(cfg.T).filter(([k,v])=>typeof v==='number').sort((a,b)=>a[1]-b[1]);
  window.__duration=dur;
  window.__labels=Object.assign({},cfg.T);
  window.__sfx=cfg.sfx||[];
  let cur=0,playing=false,last=0;const loop=Q.get('loop')!=='0';
  function render(t){
    const p=E.soft(clamp(t/dur));
    // constant slow push-in 1.00→1.06 with ±6px sine micro-drift (zero at both ends)
    const extra=cfg.camExtra?cfg.camExtra(t):{};
    const dy=6*Math.sin(2*Math.PI*t/dur*2);
    const rx=extra.rx||0, cs=(cfg.noPush?1:1+.06*p)*(extra.s||1);
    cam.style.transform=`perspective(2400px) rotateX(${rx}deg) translate3d(${(extra.x||0)}px,${dy+(extra.y||0)}px,0) scale(${cs.toFixed(5)})`;
    fg.style.transform=`translate3d(0,${(dy*1.5).toFixed(2)}px,0) scale(${(1+.09*p).toFixed(5)})`;
    bgf.style.transform=`translate3d(0,${(dy*.5).toFixed(2)}px,0) scale(${(1+.03*p).toFixed(5)})`;
    if(ctx.bright)ctx.bright.render(t,dur);
    cfg.render(t,ctx,p);
    if(dbgT){let lb='';for(const [k,v] of labels)if(v<=t+1e-6)lb=k;dbgT.textContent=`t=${t.toFixed(2)}  ${lb}`;}
  }
  function frame(now){if(!playing)return;cur+=(now-last)/1000;last=now;
    if(cur>=dur){if(loop)cur=cur%dur;else{cur=dur;playing=false;}}
    render(cur);if(playing)requestAnimationFrame(frame);}
  window.__pause=()=>{playing=false;};
  window.__play=()=>{if(playing)return;if(cur>=dur)cur=0;playing=true;last=performance.now();requestAnimationFrame(frame);};
  window.__seek=t=>{window.__pause();cur=clamp(t,0,dur);render(cur);};
  addEventListener('keydown',e=>{
    if(e.code==='Space'){e.preventDefault();playing?window.__pause():window.__play();}
    else if(e.code==='ArrowRight'){window.__seek(cur+1/30);}
    else if(e.code==='ArrowLeft'){window.__seek(cur-1/30);}
  });
  render(0);
  const fams=cfg.fonts||['800 100px "Plus Jakarta Sans"','700 100px "Plus Jakarta Sans"','600 100px "Plus Jakarta Sans"','500 100px "Plus Jakarta Sans"','700 100px "Bodoni Moda"','italic 500 100px "Bodoni Moda"'];
  const loads=fams.map(f=>document.fonts.load(f,'Aa&Bb').catch(()=>{}));
  Promise.race([Promise.allSettled(loads).then(()=>document.fonts.ready),new Promise(r=>setTimeout(r,5000))]).then(()=>{
    _fitters.forEach(f=>f());if(cfg.afterFonts)cfg.afterFonts(ctx);
    const tt=Q.get('t');
    if(tt!==null){window.__seek(parseFloat(tt));}else{render(0);}
    window.__ready=true;
    if(tt===null)window.__play();
  });
}
