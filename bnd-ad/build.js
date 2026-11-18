#!/usr/bin/env node
// Build script: inlines shared CSS/JS into every scene so each output is ONE self-contained .html file.
// usage: node build.js [S01 S02 ...]   (no args = all scenes)
const fs=require('fs'),path=require('path');
const src=path.join(__dirname,'src');
const read=f=>fs.readFileSync(f,'utf8');
const core={css:read(path.join(src,'core.css')),js:read(path.join(src,'core.js'))};
const BASE_FONTS='family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Bodoni+Moda:ital,wght@0,700;1,500';
const want=process.argv.slice(2);
for(const f of fs.readdirSync(path.join(src,'scenes')).sort()){
  if(!f.endsWith('.js'))continue;
  const name=f.replace(/\.js$/,'');           // e.g. S01_brand_open
  if(want.length&&!want.some(w=>name.startsWith(w)))continue;
  let code=read(path.join(src,'scenes',f));
  const useM=code.match(/^\/\/@use (.*)$/m), fontM=code.match(/^\/\/@fonts (.*)$/m), cssM=code.match(/\/\*@css([\s\S]*?)@css\*\//);
  const mods=(useM?useM[1].split(/[ ,]+/).filter(Boolean):[]).map(m=>read(path.join(src,'mods',m+'.js'))).join('\n');
  const [head,body]=code.split('/*==CORE==*/');
  if(body===undefined)throw new Error(name+': missing /*==CORE==*/ marker');
  const fonts='https://fonts.googleapis.com/css2?'+BASE_FONTS+(fontM?'&'+fontM[1].trim():'')+'&display=swap';
  const title=name.replace(/^S(\d+)_/,'B&D v9 · S$1 · ').replace(/_/g,' ');
  const html=`<!doctype html>
<html lang="sw"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fonts}" rel="stylesheet">
<style>
${core.css}
${cssM?cssM[1]:''}
</style></head><body>
<div id="stage"><div id="bg" class="L"></div><div id="bgf" class="L"></div><div id="cam" class="L"></div><div id="fg" class="L"></div><div id="grain" class="L"></div><div id="dbg" class="L"></div></div>
<script>
/* ===== TIMINGS (edit these numbers to retime a beat) ===== */
${head.replace(/^\/\/@.*$/mg,'').replace(/\/\*@css[\s\S]*?@css\*\//,'').trim()}
${core.js}
${mods}
/* ===== SCENE ===== */
${body.trim()}
</script></body></html>
`;
  fs.writeFileSync(path.join(__dirname,name+'.html'),html);
  console.log('built',name+'.html',(html.length/1024).toFixed(1)+'KB');
}
