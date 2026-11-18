/* ---- MOD: desk objects (open notebook, calculator, pen) as inline SVG. Shared by S04, S05, S10 ---- */
function notebookOpen(w,h,o={}){
  const pg=o.page||'#CFC6B4',pg2=o.page2||'#C5BCA8',m=w/2,line=o.line||'rgba(70,100,170,.28)',cover=o.cover||'#1c1a16';
  let ls='';for(let y=o.y0||112;y<h-40;y+=(o.step||72)){ls+=`<line x1="34" y1="${y}" x2="${m-20}" y2="${y}" stroke="${line}" stroke-width="2"/><line x1="${m+20}" y1="${y}" x2="${w-34}" y2="${y}" stroke="${line}" stroke-width="2"/>`;}
  return `<svg class="abs" style="left:0;top:0" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
   <linearGradient id="nbL${w}" x1="0" x2="1"><stop offset="0" stop-color="${pg}"/><stop offset=".82" stop-color="${pg}"/><stop offset="1" stop-color="#8f8670"/></linearGradient>
   <linearGradient id="nbR${w}" x1="1" x2="0"><stop offset="0" stop-color="${pg2}"/><stop offset=".82" stop-color="${pg2}"/><stop offset="1" stop-color="#8f8670"/></linearGradient></defs>
   <rect x="2" y="6" width="${w-4}" height="${h-8}" rx="22" fill="${cover}" opacity=".9"/>
   <path d="M${m} 14H34Q14 14 14 34V${h-30}Q14 ${h-14} 34 ${h-14}H${m}Z" fill="url(#nbL${w})"/><path d="M${m} 14H${w-34}Q${w-14} 14 ${w-14} 34V${h-30}Q${w-14} ${h-14} ${w-34} ${h-14}H${m}Z" fill="url(#nbR${w})"/>
   ${ls}<line x1="${m}" y1="14" x2="${m}" y2="${h-14}" stroke="rgba(0,0,0,.35)" stroke-width="3"/>
   <line x1="${m-62}" y1="30" x2="${m-62}" y2="${h-30}" stroke="rgba(200,70,70,.28)" stroke-width="2"/></svg>`;
}
function calculatorSVG(w,h,keyTone,o={}){
  let k='';const cols=4,rows=5,kw=(w-64)/cols,top=170;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const x=32+c*kw+6,y=top+r*((h-top-34)/rows)+6;const acc=c===3;
    k+=`<rect x="${x}" y="${y}" width="${kw-12}" height="${(h-top-34)/rows-12}" rx="14" fill="${acc?(keyTone||'#F5B544'):(o.key||'#2C3644')}" opacity="${acc?.85:1}"/>`;}
  return `<svg class="abs" style="left:0;top:0" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" rx="36" fill="${o.body||'#1C232D'}" stroke="${o.stroke||'rgba(255,255,255,.08)'}" stroke-width="2"/><rect x="26" y="28" width="${w-52}" height="112" rx="14" fill="${o.lcd||'#9FB8A8'}"/>${k}</svg>`;
}
function penSVG(len){return `<svg class="abs" style="left:0;top:0" width="${len}" height="30" viewBox="0 0 ${len} 30"><rect x="0" y="6" width="${len-40}" height="18" rx="9" fill="#2B3F6B"/><rect x="${len-60}" y="6" width="26" height="18" fill="#C9A46A"/><path d="M${len-40} 6L${len} 15L${len-40} 24Z" fill="#E8DEC4"/><path d="M${len-12} 12.5L${len} 15L${len-12} 17.5Z" fill="#222"/></svg>`;}
