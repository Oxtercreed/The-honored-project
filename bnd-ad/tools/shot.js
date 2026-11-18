// usage: node tools/shot.js S01 0,0.5,1 [outdir] [scale]  → contact sheet PNG (path printed)
const {chromium}=require('playwright');const path=require('path'),fs=require('fs'),cp=require('child_process');
(async()=>{
  const [,,scene,times,outdir=process.env.SHOTDIR||'/tmp/shots',scale='0.4']=process.argv;
  const root=path.join(__dirname,'..');
  const file=fs.readdirSync(root).find(f=>f.startsWith(scene)&&f.endsWith('.html'));
  fs.mkdirSync(outdir,{recursive:true});
  const b=await chromium.launch();
  const pg=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:parseFloat(scale)});
  const errs=[];pg.on('pageerror',e=>errs.push('PAGEERR '+e.message));pg.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text());});
  await pg.goto('file://'+path.join(root,file)+(process.env.DEBUG?'?debug=1':''));
  await pg.waitForFunction('window.__ready===true',null,{timeout:20000});
  const ts=times.split(',').map(Number);const files=[];
  for(const t of ts){await pg.evaluate(t=>window.__seek(t),t);await pg.waitForTimeout(30);const f=path.join(outdir,`${scene}_${t.toFixed(2)}.png`);await pg.screenshot({path:f});files.push(f);}
  await b.close();
  const sheet=path.join(outdir,`${scene}_sheet.png`);
  const labeled=files.map((f,i)=>`-label "t=${ts[i]}" ${f}`).join(' ');
  cp.execSync(`montage ${labeled} -tile ${Math.min(ts.length,6)}x -geometry +4+4 -background '#222' -fill white -pointsize 18 ${sheet}`);
  console.log(errs.length?errs.join('\n'):'no errors');console.log(sheet);
})();
