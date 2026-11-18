/* ---- MOD: "Tafuta" search app (generic, 4-dot logo; shared by S02 dark and S08 light) ---- */
function tafutaHeader(ph,th){
  const dk=th==='dk', ink=dk?'#F2F5F8':'#24164F';
  const pg=add(ph.pgs,`<div class="pg" style="background:${dk?'#0F141B':'#FFFFFF'}"></div>`);
  const dots=dk?['#14B8A6','#22D3EE','#F5B544','#FF4D5E']:['#6C4CF5','#FF8A65','#22C55E','#7FB3FF'];
  add(pg,`<div class="abs" style="left:48px;top:118px;display:flex;align-items:center;gap:16px"><div style="display:grid;grid-template-columns:20px 20px;gap:4px">${dots.map(c=>`<i style="width:20px;height:20px;border-radius:50%;background:${c}"></i>`).join('')}</div><div style="font-size:34px;font-weight:700;color:${ink}">Tafuta</div></div>`);
  const field=add(pg,`<div class="abs" style="left:36px;top:200px;width:492px;height:92px;border-radius:999px;background:${dk?'#18212C':'#F3F0FF'};border:1px solid ${dk?'rgba(255,255,255,.08)':'#E3DCFF'}">
    <div class="abs" style="left:34px;top:0;height:90px;display:flex;align-items:center;font-size:30px;font-weight:500;color:${ink};white-space:nowrap"><span class="tt"></span><i class="cr" style="display:inline-block;width:3px;height:36px;margin-left:3px;background:${dk?'#14B8A6':'#6C4CF5'}"></i></div>
    <div class="abs mb" style="right:11px;top:11px;width:68px;height:68px;border-radius:50%;background:${dk?'#14B8A6':'#6C4CF5'};display:flex;align-items:center;justify-content:center">${ico('search',34,dk?'#041014':'#fff',2.6)}</div></div>`);
  return {pg,field,tt:field.querySelector('.tt'),cr:field.querySelector('.cr'),mb:field.querySelector('.mb'),btn:{x:482,y:246}};
}
function resCardHTML(th,title,sub,top,o={}){
  const dk=th==='dk', h_=o.h||110;
  return `<div class="abs rc" style="left:36px;top:${top}px;width:492px;height:${h_}px;border-radius:24px;background:${o.bg||(dk?'#18212C':'#F6F4FF')};padding:0 26px;display:flex;align-items:center;gap:18px;${o.style||''}">
    <div style="width:62px;height:62px;border-radius:18px;flex:none;background:${dk?'#243140':'#E4DEFA'}"></div>
    <div style="min-width:0"><div style="font-size:30px;font-weight:700;color:${dk?'#F2F5F8':'#24164F'};white-space:nowrap">${title}</div><div style="font-size:24px;font-weight:500;color:${dk?'#8A97A6':'#6B6890'}">${sub}</div></div></div>`;
}
function tafutaTyping(T_,t,s,cps,done){ // typed text + caret (caret hides after `done`)
  const str='saluni Sinza';T_.tt.textContent=typed(str,t,s,cps);
  T_.cr.style.visibility=(t>=s-.05&&t<done&&(Math.floor((t-s)*2.2)%2===0||t-s<.6&&true))?'visible':'hidden';
}
