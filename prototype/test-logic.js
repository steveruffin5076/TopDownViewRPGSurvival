/* Headless logic test for prototype/index.html.
   Run:  node prototype/test-logic.js
   Extracts the <script> block, stubs the browser APIs, and drives the
   real game loop to verify movement, detection, alarm, Hollow and win/lose. */
const fs=require('fs'), path=require('path'), vm=require('vm');
let js=fs.readFileSync(path.join(__dirname,'index.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
js=js.replace('const keys = Object.create(null);','var keys = Object.create(null);')
   .replace('const guards = [];','var guards = [];')
   .replace('const MAP = [','var MAP = [')
   .replace('let playerStart = null, goal = null;','var playerStart = null, goal = null;')
   .replace('let player, hollows, alarm, focus, over, won, events = [], alarmT = 0;',
            'var player, hollows, alarm, focus, over, won, events = [], alarmT = 0;');
if(!js.includes('var keys')||!js.includes('var guards = []')||!js.includes('var player, hollows')) throw new Error('patch failed');
const grad={addColorStop(){}};
const fakeCtx=new Proxy({},{get:(t,k)=>(k==='createRadialGradient'||k==='createLinearGradient')?(()=>grad):(()=>{}),set:()=>true});
const el=()=>({style:{},textContent:'',innerHTML:'',getContext:()=>fakeCtx});
const L={}; const logs=[];
const sb={console:{log:(...a)=>logs.push(a.join(' ')),error:(...a)=>logs.push('ERR '+a.join(' '))},
  Math,JSON,Object,Array,String,Number,Boolean,Date,isNaN,parseInt,parseFloat,
  innerWidth:1280,innerHeight:720,performance:{now:()=>Date.now()},requestAnimationFrame:()=>0,
  document:{getElementById:el,createElement:()=>({getContext:()=>fakeCtx,width:0,height:0})},
  addEventListener:(t,f)=>{(L[t]=L[t]||[]).push(f);}};
sb.window=sb; sb.globalThis=sb; vm.createContext(sb);
vm.runInContext(js,sb,{filename:'proto.js'});

const key=(c,d)=>(L[d?'keydown':'keyup']||[]).forEach(f=>f({code:c,preventDefault(){}}));
const step=(n,dt=1/60)=>{for(let i=0;i<n;i++)sb.update(dt);};
const P=()=>sb.player, G=()=>sb.guards, A=()=>sb.alarm;
const out=[]; const ok=(n,c,x='')=>out.push(`${c?'PASS':'FAIL'}  ${n}${x?'  '+x:''}`);
const aim=(g)=>{g.state='suspicious';g.timer=6;g.target={x:P().x,y:P().y};};

ok('boot: player + 4 guards + 2 hollow + goal', !!P()&&G().length===4&&sb.hollows.length===2&&!!sb.goal,
   `guards=${G().length}`);
ok('map self-check OK, no ragged rows', logs.some(l=>l.includes('map OK')) && !logs.some(l=>l.startsWith('ERR')),
   logs.find(l=>l.includes('map OK'))||'');
ok('all 30 rows are 56 wide', sb.MAP.every(r=>r.length===56), `widths=${[...new Set(sb.MAP.map(r=>r.length))]}`);
ok('all patrol routes have waypoints', G().every(g=>g.patrol.length>=2));

const x0=P().x; key('KeyD',true); step(60); key('KeyD',false);
ok('player moves right on KeyD', P().x>x0+20, `dx=${(P().x-x0).toFixed(1)}`);
ok('player never inside a wall', !sb.blocked(P().x,P().y,P().r));

const oil0=P().oil; sb.cycleLamp();
ok('lamp cycles DIM -> BRIGHT', P().lamp===2, `lamp=${P().lamp}`);
step(120);
ok('oil drains while lit', P().oil<oil0, `oil=${P().oil.toFixed(3)}`);
sb.cycleLamp(); ok('lamp cycles BRIGHT -> OFF', P().lamp===0);

sb.reset(); const g=G()[0];
P().x=g.x+70; P().y=g.y; P().lamp=2; aim(g);
step(120); const litSeen=g.awareness, litAlarm=A();

sb.reset(); const g2=G()[0];
P().x=g2.x+70; P().y=g2.y; P().lamp=0; aim(g2);
step(120); const darkSeen=g2.awareness;

ok('lit player gets detected', litSeen>30, `lit=${litSeen.toFixed(0)}`);
ok('darkness cuts detection >4x', darkSeen<litSeen/4, `dark=${darkSeen.toFixed(1)} vs lit=${litSeen.toFixed(0)}`);
ok('alarm escalates on a confirmed sighting', litAlarm===3, `alarm=${litAlarm}`);
ok('dark run never raised the alarm', A()===0, `alarm=${A()}`);

sb.reset(); const g3=G()[1]; P().x=g3.x+90; P().y=g3.y; P().lamp=0; aim(g3);
key('KeyD',true); key('ShiftLeft',true); step(45); key('KeyD',false); key('ShiftLeft',false);
ok('sprinting is heard in the dark', g3.awareness>3, `aw=${g3.awareness.toFixed(1)} state=${g3.state}`);

sb.reset(); const h=sb.hollows[0];
P().x=h.x+150; P().y=h.y; P().lamp=0; key('KeyD',true); step(40); key('KeyD',false);
ok('Hollow chases an unlit moving player', h.state==='chase', `state=${h.state}`);
P().lamp=2; step(30);
ok('Hollow flees from light', h.state==='flee', `state=${h.state}`);

sb.reset(); const g4=G()[0]; P().x=g4.x+14; P().y=g4.y; P().lamp=2; aim(g4);
step(200);
ok('contact with a hunting guard = caught', sb.over===true, `over=${sb.over} state=${g4.state}`);

sb.reset(); P().x=sb.goal.x; P().y=sb.goal.y; step(5);
ok('reaching the goal wins', sb.won===true);

sb.reset(); key('KeyD',true); key('ShiftLeft',true); P().lamp=2;
let crashed=null; try{ step(2000); sb.draw(); }catch(e){ crashed=e; }
key('KeyD',false); key('ShiftLeft',false);
ok('2000 frames + draw, no exceptions', !crashed, crashed?String(crashed).slice(0,140):'');

const t0=Date.now(); sb.reset(); step(600); const ms=(Date.now()-t0)/600;
ok('update cost far under 16ms/frame', ms<16, `${ms.toFixed(3)} ms/frame`);

console.log(out.join('\n'));
const fails=out.filter(l=>l.startsWith('FAIL')).length;
console.log(`\n${out.length-fails}/${out.length} passed`);
process.exit(fails?1:0);
