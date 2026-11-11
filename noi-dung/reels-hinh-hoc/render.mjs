import {chromium} from 'playwright';
import {spawn} from 'child_process';
import http from 'http';import fs from 'fs';import path from 'path';
const root=process.cwd();
const types={'.html':'text/html','.js':'text/javascript','.ttf':'font/ttf'};
const srv=http.createServer((q,r)=>{const p=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end();return;}r.writeHead(200,{'Content-Type':types[path.extname(p)]||'application/octet-stream'});r.end(d);});}).listen(8765);
const page=process.argv[2]||'tap-01.html',out=process.argv[3]||'video/reel.mp4';
const FPS=30,DUR=Number(process.env.DUR||15.5);
const b=await chromium.launch({channel:process.env.PW_CHANNEL,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('console',m=>console.log('page:',m.text()));p.on('pageerror',e=>console.log('err:',e.message));
await p.goto('http://localhost:8765/'+page+'');
await p.waitForFunction('window.ready===true');await p.evaluate(()=>document.fonts.ready);
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-movflags','+faststart',out],{stdio:['pipe','inherit','inherit']});
const N=Math.round(FPS*DUR);
const only=process.env.ONLY?process.env.ONLY.split(',').map(Number):null;
for(let i=0;i<N;i++){const t=i/FPS;if(only&&!only.includes(i))continue;
  await p.evaluate(t=>window.renderFrame(t),t);
  const buf=await p.screenshot({type:'jpeg',quality:95});
  if(only){fs.writeFileSync(`frame-${i}.jpg`,buf);continue;}
  if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
  if(i%60===0)console.log('frame',i,'/',N);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();srv.close();console.log('done');
