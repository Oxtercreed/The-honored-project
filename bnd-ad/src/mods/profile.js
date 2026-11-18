/* ---- MOD: generic business profile "Biashara yako" (dark = S03 call-to-book, bright = S09 Book sasa). Button sits in the SAME place ---- */
function salonCover(th){ // stylised gradient illustration (data-slot="salon-cover"), no people
  const dk=th==='dk';
  const bg=dk?['#1B2A33','#2B2622']:['#E4DEFF','#FFE4D6'];
  const lights=dk?'#F5B544':'#FFC9B0';
  let dots='';for(let i=0;i<7;i++){const x=150+i*44;dots+=`<circle cx="${x}" cy="92" r="11" fill="${lights}" opacity="${dk?.9:.95}"/><circle cx="${x}" cy="92" r="26" fill="${lights}" opacity="${dk?.14:.35}"/>`;}
  return `<svg data-slot="salon-cover" class="abs" style="left:0;top:0" width="564" height="320" viewBox="0 0 564 320"><defs><linearGradient id="cv${th}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs>
  <rect width="564" height="320" fill="url(#cv${th})"/>
  <rect x="132" y="70" width="300" height="190" rx="26" fill="${dk?'#0F1A21':'#fff'}" opacity="${dk?.8:.65}"/><rect x="146" y="80" width="272" height="170" rx="18" fill="${dk?'#22414A':'#F3F0FF'}" opacity=".9"/>
  ${dots}
  <path d="M236 320c0-48 14-78 46-78s46 30 46 78z" fill="${dk?'#14B8A6':'#6C4CF5'}" opacity="${dk?.35:.22}"/><rect x="262" y="286" width="40" height="34" rx="8" fill="${dk?'#0B1016':'#24164F'}" opacity=".35"/>
  <circle cx="80" cy="250" r="34" fill="${dk?'#F5B544':'#FF8A65'}" opacity=".18"/><circle cx="500" cy="230" r="46" fill="${dk?'#14B8A6':'#D6CBFF'}" opacity=".22"/></svg>`;
}
function profilePage(ph,th){
  const dk=th==='dk', bg=dk?'#0F141B':'#FFFFFF', ink=dk?'#F2F5F8':'#24164F', mut=dk?'#8A97A6':'#6B6890';
  const pg=add(ph.pgs,`<div class="pg" style="background:${bg}"></div>`);
  pg.insertAdjacentHTML('beforeend',salonCover(th));
  add(pg,`<div class="abs" style="left:0;top:96px;width:564px;height:224px;background:linear-gradient(180deg,rgba(0,0,0,${dk?.35:.0}),transparent 30%)"></div>`);
  add(pg,`<div class="abs" style="left:40px;top:262px;width:124px;height:124px;border-radius:50%;background:#E8735A;border:6px solid ${bg};display:flex;align-items:center;justify-content:center;color:#fff;font-size:34px;font-weight:800">BY</div>`);
  add(pg,`<div class="abs" style="left:40px;top:402px;font-size:34px;font-weight:700;color:${ink};line-height:1.15">Biashara yako</div><div class="abs" style="left:40px;top:448px;font-size:26px;font-weight:500;color:${mut}">Saluni · Sinza</div>`);
  const btn=add(pg,dk?
   `<div class="abs" style="left:36px;top:500px;width:492px;height:96px;border-radius:999px;background:#18212C;border:2px solid #F5B544;display:flex;align-items:center;justify-content:center;gap:16px;color:#F5B544;font-size:32px;font-weight:700">${ico('phone',34,'#F5B544',2.2)}Piga simu ku-book</div>`:
   `<div class="abs" style="left:36px;top:500px;width:492px;height:96px;border-radius:999px;background:#6C4CF5;display:flex;align-items:center;justify-content:center;gap:16px;color:#fff;font-size:34px;font-weight:700;box-shadow:0 14px 30px rgba(108,76,245,.35)">${ico('calendar',34,'#fff',2.2)}Book sasa</div>`);
  [0,1].forEach(i=>add(pg,`<div class="abs" style="left:36px;top:${640+i*130}px;width:492px;height:110px;border-radius:24px;background:${dk?'#18212C':'#F6F4FF'}"><div class="abs" style="left:26px;top:26px;width:58px;height:58px;border-radius:16px;background:${dk?'#243140':'#E4DEFA'}"></div><div class="abs" style="left:104px;top:30px;width:${i?200:260}px;height:16px;border-radius:8px;background:${dk?'#2A3745':'#E4DEFA'}"></div><div class="abs" style="left:104px;top:62px;width:150px;height:14px;border-radius:7px;background:${dk?'#222E3A':'#EEE9FC'}"></div></div>`));
  return {pg,btn,pos:{x:282,y:548}};
}
