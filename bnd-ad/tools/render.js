// usage: node tools/render.js S01 [framesRoot]   → renders every frame (30 fps, 1080×1920) of one scene to JPEGs
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');
(async()=>{
  const [,,scene,root=process.env.FRAMES||'/tmp/frames']=process.argv;
  const dir=path.join(__dirname,'..');
  const file=fs.readdirSync(dir).find(f=>f.startsWith(scene+'_')&&f.endsWith('.html'));
  const out=path.join(root,scene);fs.mkdirSync(out,{recursive:true});
  const b=await chromium.launch();
  const pg=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  pg.on('pageerror',e=>console.error(scene,'PAGEERR',e.message));
  await pg.goto('file://'+path.join(dir,file)+'?loop=0');
  await pg.waitForFunction('window.__ready===true',null,{timeout:30000});
  await pg.evaluate(()=>window.__pause());
  const dur=await pg.evaluate(()=>window.__duration), n=Math.round(dur*30);
  const t0=Date.now();
  for(let i=0;i<n;i++){
    await pg.evaluate(t=>window.__seek(t),i/30);
    await pg.screenshot({path:path.join(out,String(i).padStart(5,'0')+'.jpg'),type:'jpeg',quality:94});
  }
  await b.close();
  console.log(scene,file,n,'frames',((Date.now()-t0)/1000).toFixed(1)+'s');
})();
