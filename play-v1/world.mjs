import * as T from './vendor/three.module.mjs';

// Original procedural models. No models, textures or animation data from the reference site.
const C={ink:'#222247',purple:'#a47af4',pink:'#ff58b9',lime:'#d8ff62',blue:'#4168ef',cyan:'#7addf0',green:'#007961',orange:'#ff7751',yellow:'#ffd14d',white:'#fffbee',skin:['#efb49d','#b97156','#f7d4b4','#875842'],hair:['#25253c','#5f3840','#eb8e4c','#f3e5b6','#167e6b']};
const geo={box:new T.BoxGeometry(1,1,1),sphere:new T.SphereGeometry(1,12,9),cylinder:new T.CylinderGeometry(1,1,1,20),cone:new T.ConeGeometry(1,1,16),torus:new T.TorusGeometry(1,.16,8,48),capsule:new T.CapsuleGeometry(.5,1,4,10)};
const playShape=new T.Shape();playShape.moveTo(-.4,-.5);playShape.lineTo(.5,0);playShape.lineTo(-.4,.5);playShape.closePath();geo.play=new T.ExtrudeGeometry(playShape,{depth:.05,bevelEnabled:false});
const colorCache=new Map();
const color=c=>{if(!colorCache.has(c))colorCache.set(c,new T.Color(c));return colorCache.get(c);};
const sources=[];
function group(parent,x=0,y=0,z=0){const g=new T.Group();g.position.set(x,y,z);parent.add(g);return g;}
function form(parent,type,c,pos,scale,rotation){const m=new T.Object3D();m.userData={type,c};m.position.set(...pos);m.scale.set(...scale);if(rotation)m.rotation.set(...rotation);parent.add(m);sources.push(m);return m;}
const box=(p,c,x,y,z,w,h,d,r)=>form(p,'box',c,[x,y,z],[w,h,d],r);
const ball=(p,c,x,y,z,w,h=w,d=w)=>form(p,'sphere',c,[x,y,z],[w,h,d]);
const cyl=(p,c,x,y,z,w,h,d=w)=>form(p,'cylinder',c,[x,y,z],[w,h,d]);
const limb=(p,c,x,y,z,w,h,d=w)=>form(p,'capsule',c,[x,y,z],[w,h/2,d]);
function stem(p,c,a,b,r=.08){const m=cyl(p,c,0,0,0,r,new T.Vector3(...a).distanceTo(new T.Vector3(...b)));m.position.copy(new T.Vector3(...a).add(new T.Vector3(...b)).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3(...b).sub(new T.Vector3(...a)).normalize());return m;}
function person(parent,x,y,z,opt={}){
 const {id=0,mode='chat',rotation=0,scale=1}=opt,g=group(parent,x,y,z);g.rotation.y=rotation;g.scale.setScalar(scale);
 const shirt=opt.shirt||[C.blue,C.pink,C.white,C.orange,C.lime,C.green,C.purple][id%7],pants=[C.ink,C.blue,C.green,C.purple,C.white][id%5],skin=C.skin[id%4],hair=C.hair[id%5];
 const hips=group(g,0,1.02,0),torso=group(hips,0,.12,0);
 limb(torso,shirt,0,.26,0,.58,.74,.34);cyl(torso,skin,0,.8,0,.105,.18);
 const head=group(torso,0,.99,0);head.scale.setScalar(.78);ball(head,skin,0,0,0,.245,.30,.225);ball(head,hair,0,.16,-.035,.255,.185,.24);
 if(id%4===0){ball(head,hair,0,.02,-.18,.25,.29,.15);ball(head,hair,0,-.1,-.26,.15,.16,.15);}
 if(id%4===1)for(let n=0;n<7;n++){const a=n/7*Math.PI*2;ball(head,hair,Math.cos(a)*.18,.17+Math.sin(a)*.04,Math.sin(a)*.16,.105);}
 if(id%4===2){box(head,C.blue,0,.25,-.01,.53,.09,.48);box(head,C.blue,0,.21,.22,.52,.04,.2);}
 ball(head,skin,0,-.03,.22,.05,.065,.07);
 for(const s of [-1,1]){ball(head,C.ink,s*.086,.025,.206,.019,.021,.012);ball(head,skin,s*.24,0,0,.048,.07,.04);}
 if(mode==='music'){for(const s of [-1,1])ball(head,C.pink,s*.26,0,0,.07,.12,.1);form(head,'torus',C.pink,[0,.02,0],[.28,.33,.25]);}
 const arms=[],forearms=[],legs=[],knees=[];
 for(const s of [-1,1]){
  const arm=group(torso,s*.32,.54,0);limb(arm,shirt,0,-.2,0,.21,.47,.21);const fore=group(arm,0,-.43,0);limb(fore,skin,0,-.19,0,.14,.39,.14);ball(fore,skin,0,-.4,0,.085,.11,.06);arms.push(arm);forearms.push(fore);
  const leg=group(hips,s*.17,-.05,0);limb(leg,pants,0,-.24,0,.25,.56,.25);const knee=group(leg,0,-.53,0);limb(knee,pants,0,-.2,0,.22,.49,.22);box(knee,id%2?C.white:C.lime,0,-.46,.09,.24,.13,.38);legs.push(leg);knees.push(knee);
 }
 if(['read','type','wheel','music'].includes(mode)){
  hips.position.y=.69;legs.forEach(l=>l.rotation.x=-Math.PI/2);knees.forEach(k=>k.rotation.x=Math.PI/2);
  if(mode!=='wheel'){box(g,C.blue,0,.62,0,.82,.13,.82);box(g,C.blue,0,1.12,-.36,.82,.9,.12);for(const a of [-1,1])for(const b of [-1,1])cyl(g,C.ink,a*.3,.3,b*.29,.035,.6);}
  else {for(const s of [-1,1])form(g,'torus',C.ink,[s*.53,.48,0],[.43,.43,.43],[0,Math.PI/2,0]);box(g,C.purple,0,.62,0,.9,.12,.8);box(g,C.purple,0,1.07,-.34,.9,.85,.12);for(const s of [-1,1])ball(g,C.ink,s*.4,.13,.6,.13);}
 }
 if(mode==='read'){box(g,C.lime,0,1.25,.6,.65,.07,.46,[-.25,0,0]);box(g,C.white,0,1.28,.6,.58,.02,.4,[-.25,0,0]);}
 if(mode==='carry'){box(torso,C.purple,0,.1,.5,.85,.65,.1);box(torso,C.lime,0,.13,.56,.53,.38,.025);}
 if(mode==='paint')stem(forearms[1],C.ink,[0,-.4,0],[0,-.67,.13],.022);
 if(mode==='wave')arms[1].rotation.z=-2.25;
 return {g,hips,torso,head,arms,forearms,legs,knees,mode,id,base:[x,y,z],rotation};
}
function plant(p,x,y,z,s=1,c=C.green){const g=group(p,x,y,z);g.scale.setScalar(s);cyl(g,C.pink,0,.23,0,.35,.46);for(let i=0;i<7;i++){const a=i*2.4;const h=.65+(i%3)*.24;stem(g,c,[0,.35,0],[Math.sin(a)*.45,h,Math.cos(a)*.4],.035);const m=ball(g,c,Math.sin(a)*.45,h,Math.cos(a)*.4,.18,.4,.12);m.rotation.set(.4*Math.cos(a),a,.55*Math.sin(a));}return g;}
function desk(p,x,y,z,rotation=0,c=C.white){const g=group(p,x,y,z);g.rotation.y=rotation;box(g,c,0,1.12,0,2.8,.14,1.25);for(const a of [-1,1])for(const b of [-1,1])cyl(g,C.ink,a*1.15,.55,b*.45,.055,1.1);return g;}
function laptop(p,x=0,y=1.24,z=0){box(p,C.blue,x,y,z,.8,.05,.57);box(p,C.ink,x,y+.29,z-.25,.8,.6,.045,[-.12,0,0]);box(p,C.cyan,x,y+.29,z-.215,.7,.48,.012,[-.12,0,0]);box(p,C.white,x-.1,y+.3,z-.202,.35,.06,.012,[-.12,0,0]);}
function tree(p,x,y,z,s=1){const g=group(p,x,y,z);g.scale.setScalar(s);cyl(g,C.orange,0,1.12,0,.16,2.25);for(const [a,b,c,r] of [[0,2.8,0,1.05],[-.64,2.4,.1,.72],[.62,2.5,0,.78],[.13,2.4,.65,.75]])ball(g,C.green,a,b,c,r,r*.9,r*.75);return g;}
function flower(p,x,y,z,s=1){const g=group(p,x,y,z);g.scale.setScalar(s);cyl(g,C.green,0,.9,0,.07,1.8);for(let n=0;n<6;n++){const a=n*Math.PI/3;ball(g,C.pink,Math.cos(a)*.43,2+Math.sin(a)*.43,0,.25,.29,.1);}ball(g,C.yellow,0,2,.08,.24,.24,.13);ball(g,C.green,.28,.7,0,.4,.13,.12).rotation.z=.4;return g;}
function artEasel(p,x,y,z){const g=group(p,x,y,z);for(const s of [-1,1])stem(g,C.orange,[s*.47,0,.2],[s*.25,2.1,0],.06);stem(g,C.orange,[0,0,-.5],[0,2,0],.06);box(g,C.white,0,1.35,.12,1.15,1.35,.09);ball(g,C.blue,-.18,1.53,.2,.28,.32,.03);box(g,C.pink,.18,1.2,.2,.5,.3,.04);ball(g,C.lime,.25,1.65,.21,.2,.2,.03);box(g,C.orange,0,.64,.21,1.3,.1,.28);return g;}
function screen(p,x,y,z,w,h,textColor=C.pink){box(p,C.ink,x,y,z,w,h,.16);box(p,C.cyan,x,y,z+.09,w-.2,h-.2,.03);form(p,'play',textColor,[x,y+.05,z+.12],[.8,.8,1]);box(p,C.ink,x,y-h*.35,z+.13,w*.8,.04,.01);box(p,C.lime,x-w*.2,y-h*.35,z+.145,w*.4,.04,.01);cyl(p,C.ink,x,y-h/2-.4,z,.06,.7);box(p,C.ink,x,y-h/2-.75,z,.8,.05,.5);}
function buildWorld(){
 const root=new T.Group(),people=[],floats=[],rotors=[];let id=0;
 const add=(x,y,z,mode='chat',rot=0,extra={})=>{const a=person(root,x,y,z,{id:id++,mode,rotation:rot,...extra});people.push(a);return a;};
 // A continuous elliptical campus, with three distinct spaces.
 cyl(root,C.purple,0,-.36,0,10.8,.58,7.4);cyl(root,C.white,0,-.055,0,10.6,.07,7.25);
 const path=form(root,'torus',C.orange,[0,.025,0],[8.9,6.0,2.5],[Math.PI/2,0,0]);
 // Taller rear studio, generous open frontage, lime ceiling.
 box(root,C.pink,-4,1.25,-3.45,5.7,2.5,4.0);box(root,C.lime,-4,2.55,-3.45,6.0,.2,4.3);
 box(root,C.purple,-4,1.3,-1.42,4.9,2.6,.12); // graphic front on lower storey
 for(let i=0;i<3;i++){box(root,[C.blue,C.orange,C.lime][i],-5.7+i*1.65,1.45,-1.32,1.2,1.65,.08);ball(root,C.white,-5.7+i*1.65,1.6,-1.25,.33,.33,.03);}
 box(root,C.lime,-4,4.2,-5.45,5.9,3.1,.16);box(root,C.purple,-6.9,3.8,-3.6,.13,2.7,3.8);
 // Curved portal above the studio.
 const arch=new T.TorusGeometry(2,.24,8,36,Math.PI);geo.arch=arch;form(root,'arch',C.blue,[-4,5.1,-5.15],[1.3,1.1,1]);for(const x of [-6.6,-1.4])cyl(root,C.blue,x,4.6,-5.15,.24,1.0);
 const d=desk(root,-4,2.65,-3.5,0,C.pink);laptop(d,-.6);laptop(d,.65);plant(root,-6,2.65,-4.5,.7);
 add(-4.7,2.65,-2.6,'type',Math.PI,{shirt:C.white});add(-3.3,2.65,-2.6,'type',Math.PI,{shirt:C.blue});add(-2,2.65,-4.3,'wave',.5,{shirt:C.orange});
 // Broad staircase connects the learning floor to the park.
 for(let i=0;i<10;i++)box(root,i%2?C.blue:C.purple,-.4, .13+i*.26,-.5-i*.46,1.65,.26+i*.52,.46);
 for(const s of [-1,1])stem(root,C.ink,[s*.92-.4,1.0,-.05],[s*.92-.4,3.65,-4.7],.028);
 // A yellow cinema / video space with a white canopy.
 cyl(root,C.yellow,4.65,.17,-3.15,3.35,.35,2.7);box(root,C.blue,4.6,1.6,-5.3,5.4,2.8,.16);screen(root,4.3,2.1,-5.13,2.6,1.65,C.orange);
 for(const x of [2.05,7.2])cyl(root,C.orange,x,1.85,-3.1,.1,3.7);
 box(root,C.white,4.6,3.72,-4.5,5.65,.15,1.9,[0,0,-.04]);
 const edit=desk(root,4.5,.35,-3.2,0,C.white);laptop(edit);add(4.5,.35,-2.3,'type',Math.PI,{shirt:C.green});
 add(6.2,.35,-3.8,'chat',-.7,{shirt:C.pink});add(5.3,.35,-4.3,'chat',.7,{shirt:C.white});
 // Sculpture and gallery courtyard.
 cyl(root,C.lime,-4.4,.12,2.7,3.35,.25,2.6);artEasel(root,-5.6,.25,2);artEasel(root,-3.6,.25,3.2);
 add(-5.6,.25,3.1,'paint',Math.PI,{shirt:C.blue});add(-3.6,.25,4.3,'paint',Math.PI,{shirt:C.white});add(-2.1,.25,2,'carry',-.6);
 const sculpture=group(root,-6.4,.25,4.1);cyl(sculpture,C.white,0,.32,0,.6,.65);form(sculpture,'torus',C.pink,[0,1.35,0],[.7,.7,.7],[0,.4,0]);
 // Communal table, reading steps, and a wheelchair-accessible park.
 cyl(root,C.cyan,4.3,.12,2.9,3.6,.25,2.8);const picnic=desk(root,3.8,.25,2.2,.35,C.pink);laptop(picnic,-.6);box(picnic,C.lime,.8,1.25,0,.5,.08,.6);
 add(3.5,.25,3.1,'read',Math.PI-.35,{shirt:C.orange});add(5,.25,2.8,'type',Math.PI-.35,{shirt:C.white});add(2.5,.25,1.1,'wheel',.1,{shirt:C.lime});add(4.9,.25,1,'chat',.5);
 for(let i=0;i<3;i++)box(root,C.blue,6.2,.25+i*.25,4.5-i*.65,2.2,.5+i*.5,.65);
 add(5.9,1,3.45,'music',.35,{shirt:C.purple});add(7,.25,1.6,'wave',-1.5);
 // Smaller activities throughout the park.
 for(const [x,z] of [[-8,-1.3],[8.3,-.8],[-7,5],[1,5.3],[-.8,-6]])tree(root,x,0,z,.7+(x>0?.2:0));
 for(const [x,z,s] of [[-8,2,1.2],[8,3,1.2],[-1,5.6,.8],[.6,-5.9,1],[7,-5.1,.8]])plant(root,x,0,z,s);
 flower(root,-7,0,-4.5,1.25);flower(root,8,0,4.4,1.1);flower(root,-1,0,4.6,.65);
 // Exaggerated creative tools give the town its own visual language.
 const pencil=group(root,-8,0,-3);pencil.rotation.z=-.18;cyl(pencil,C.yellow,0,2.1,0,.25,4.2);form(pencil,'cone',C.white,[0,4.55,0],[.25,.7,.25]);form(pencil,'cone',C.ink,[0,4.97,0],[.09,.22,.09]);cyl(pencil,C.pink,0,.15,0,.26,.3);
 const wind=group(root,1.1,3.7,-5.8);stem(root,C.ink,[1.1,0,-5.8],[1.1,4,-5.8],.06);for(let i=0;i<4;i++){const a=group(wind);a.rotation.z=i*Math.PI/2;box(a,[C.pink,C.lime,C.cyan,C.orange][i],.5,.25,0,1,.45,.07,[0,0,.35]);}ball(wind,C.yellow,0,0,.1,.13);rotors.push(wind);
 // Conversation circles.
 add(-8,0,1,'chat',.7);add(-7.15,0,1.7,'chat',-2.1);add(.4,0,2.1,'chat',1);add(1.3,0,2.3,'wave',-1.2);add(1.1,0,-1.6,'read',-.7);
 add(-2.5,0,5.2,'chat',.5);add(-1.7,0,5.6,'wave',-1.8);add(6.8,0,-.5,'carry',-.5);add(-7.5,0,-2.6,'music',1.2);add(.2,0,-5.5,'chat',1);add(1.4,0,-5.8,'chat',-1.2);
 // Continuous paths: each walker has its own phase and pace.
 for(let i=0;i<16;i++){const a=add(0,0,0,i%5===0?'carry':'walk',0,{scale:.8+(i%3)*.06});a.path={phase:i/16*Math.PI*2,speed:.055+(i%4)*.012,rx:9.15,rz:6.1};}
 // Floating sculptural dots and speech bubbles, kept behind the content.
 for(const [x,y,z,c] of [[-2,6,-3,C.pink],[6,5,-4,C.lime],[-6,4.5,3,C.cyan]]){const g=group(root,x,y,z);ball(g,c,0,0,0,.55,.38,.18);form(g,'cone',c,[-.22,-.3,0],[.16,.32,.1],[0,0,.5]);floats.push({g,y});}
 return {root,people,floats,rotors};
}

export function mountWorld(host){
 if(!host)return null;
 let renderer;
 try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});}catch{host.dataset.render='fallback';return null;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.NoToneMapping;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 renderer.domElement.setAttribute('aria-hidden','true');host.append(renderer.domElement);
 const scene=new T.Scene(),camera=new T.OrthographicCamera(-15,15,10,-10,.1,150),world=buildWorld();
 scene.add(new T.HemisphereLight(0xffffff,0x7c6299,2.1));const light=new T.DirectionalLight(0xffffff,2.0);light.position.set(-8,18,10);light.castShadow=true;light.shadow.mapSize.set(2048,2048);Object.assign(light.shadow.camera,{left:-15,right:15,top:15,bottom:-15,near:.5,far:70});light.shadow.bias=-.0005;light.shadow.normalBias=.035;scene.add(light);
 const mat=new T.MeshStandardMaterial({roughness:1,metalness:0});
 // Instanced geometry batches the many individual, jointed characters into a handful of draws.
 world.root.updateMatrixWorld(true);const buckets=new Map();for(const m of sources){const key=m.userData.type;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(m);}
 const batches=[];for(const [key,list] of buckets){const mesh=new T.InstancedMesh(geo[key],mat,list.length);mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);mesh.frustumCulled=false;mesh.castShadow=true;mesh.receiveShadow=true;list.forEach((o,i)=>{mesh.setMatrixAt(i,o.matrixWorld);mesh.setColorAt(i,color(o.userData.c));});scene.add(mesh);batches.push({mesh,list});}
 const shadow=new T.Mesh(new T.CircleGeometry(1,80),new T.MeshBasicMaterial({color:0x55416c,transparent:true,opacity:.12}));shadow.rotation.x=-Math.PI/2;shadow.position.y=-.69;shadow.scale.set(11.2,7.8,1);scene.add(shadow);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,visible=true,hidden=document.hidden,lost=false,frame=0,time=0,last=0,view=host.dataset.view||'all',dragging=false,turn=0,dragX=0,dragTurn=0;
 const views={all:{target:[0,1.7,0],size:9.4,angle:.52},studio:{target:[-4,3.8,-3],size:4.6,angle:.38},gallery:{target:[-4,1.2,2.4],size:4.4,angle:.45},park:{target:[4,1.6,2.3],size:4.4,angle:.6}};
 let current={...views[view],target:[...views[view].target]},desired=views[view];
 const controls=document.querySelector('[data-world-controls]');
 function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.left=-current.size*w/h;camera.right=current.size*w/h;camera.top=current.size;camera.bottom=-current.size;camera.updateProjectionMatrix();}
 function pose(a,t){const v=Math.sin(t*2+a.id*1.7),walk=a.path;const oldY=a.base[1];a.hips.rotation.z=0;a.torso.rotation.x=0;
  if(walk){const phase=walk.phase+t*walk.speed;a.g.position.set(Math.cos(phase)*walk.rx,oldY,Math.sin(phase)*walk.rz);a.g.rotation.y=Math.atan2(-Math.sin(phase)*walk.rx,Math.cos(phase)*walk.rz);a.hips.position.y=1.02+Math.abs(Math.sin(t*4+a.id))*.035;const step=Math.sin(t*4+a.id)*.45;a.legs[0].rotation.x=step;a.legs[1].rotation.x=-step;a.knees[0].rotation.x=Math.max(0,-step)*.8;a.knees[1].rotation.x=Math.max(0,step)*.8;a.arms[0].rotation.x=-step*.7;a.arms[1].rotation.x=step*.7;}
  else a.head.rotation.y=v*.07;
  if(a.mode==='type'){a.torso.rotation.x=.08;a.arms.forEach((r,i)=>{r.rotation.x=-.5;r.rotation.z=(i?1:-1)*.1;});a.forearms.forEach((r,i)=>r.rotation.x=-.8+Math.sin(t*6+i*2+a.id)*.06);}
  if(a.mode==='read'){a.arms.forEach(r=>r.rotation.x=-.45);a.forearms.forEach(r=>r.rotation.x=-1.1);a.head.rotation.x=.16+v*.04;}
  if(a.mode==='paint'){a.arms[1].rotation.x=-.7+v*.24;a.forearms[1].rotation.x=-.7+Math.cos(t*1.8+a.id)*.24;a.head.rotation.z=v*.06;}
  if(a.mode==='chat'||a.mode==='wheel'){a.arms[1].rotation.x=-.25+v*.15;a.forearms[1].rotation.x=-.65+v*.2;a.head.rotation.y=v*.15;}
  if(a.mode==='wave'){a.arms[1].rotation.z=-2.3+v*.17;a.forearms[1].rotation.z=.4+v*.2;}
  if(a.mode==='carry'){a.arms.forEach((r,i)=>{r.rotation.x=-.38;r.rotation.z=(i?1:-1)*.2;});a.forearms.forEach(r=>r.rotation.x=-1.2);}
  if(a.mode==='music'){a.torso.rotation.z=v*.08;a.head.rotation.z=v*.12;a.arms[0].rotation.z=1.8;a.forearms[0].rotation.z=1.1;}
 }
 function draw(){world.people.forEach(a=>pose(a,time));world.floats.forEach((f,i)=>{f.g.position.y=f.y+Math.sin(time*1.2+i)*.15;f.g.rotation.y=Math.sin(time*.5+i)*.15;});world.rotors.forEach(r=>r.rotation.z=time*.35);
  world.root.updateMatrixWorld(true);for(const {mesh,list} of batches){list.forEach((o,i)=>mesh.setMatrixAt(i,o.matrixWorld));mesh.instanceMatrix.needsUpdate=true;}
  for(let i=0;i<3;i++)current.target[i]+=(desired.target[i]-current.target[i])*.09;current.size+=(desired.size-current.size)*.09;current.angle+=(desired.angle-current.angle)*.09;
  const aspect=host.clientWidth/host.clientHeight;const size=current.size*Math.max(1,1.22/aspect);camera.left=-size*aspect;camera.right=size*aspect;camera.top=size;camera.bottom=-size;camera.updateProjectionMatrix();
  const angle=current.angle+turn;camera.position.set(current.target[0]+Math.sin(angle)*26,current.target[1]+21,current.target[2]+Math.cos(angle)*26);camera.lookAt(...current.target);renderer.render(scene,camera);
  host.dataset.render='ready';host.dataset.frame=String(frame++);host.dataset.people=String(world.people.length);host.dataset.motion=paused?'paused':'playing';host.dataset.view=view;
 }
 let raf=0,settle=0;
 function loop(now){raf=0;if(hidden||!visible||lost)return;if(!last)last=now;const dt=Math.min((now-last)/1000,.05);last=now;if(!paused)time+=dt;draw();if(!paused||settle-->0)raf=requestAnimationFrame(loop);}
 function wake(frames=1){settle=Math.max(settle,frames);if(!raf&&!hidden&&visible&&!lost){last=0;raf=requestAnimationFrame(loop);}}
 function setView(v){if(!views[v])return;view=v;desired=views[v];turn=0;if(reduced.matches)current={...desired,target:[...desired.target]};controls?.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===v)));document.querySelector('[data-scene-caption]')?.replaceChildren(document.createTextNode({all:'それぞれの「好き」が、動き出す。',studio:'つくって、試して、またつくる。',gallery:'頭の中のイメージを、かたちに。',park:'ひと息つく時間にも、新しい発見。'}[v]));host.scrollIntoView({block:'center',behavior:reduced.matches?'instant':'smooth'});wake(reduced.matches?1:75);}
 const pauseButton=document.querySelector('[data-pause]');function syncPause(){pauseButton?.setAttribute('aria-pressed',String(paused));if(pauseButton)pauseButton.textContent=paused?'動きを再生 ↗':'動きを止める Ⅱ';host.dataset.motion=paused?'paused':'playing';document.documentElement.classList.toggle('motion-paused',paused);wake();}
 pauseButton?.addEventListener('click',()=>{paused=!paused;syncPause();});controls?.addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)setView(b.dataset.view);});
 reduced.addEventListener('change',()=>{paused=reduced.matches;syncPause();});
 renderer.domElement.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;dragging=true;dragX=e.clientX;dragTurn=turn;renderer.domElement.setPointerCapture(e.pointerId);});
 renderer.domElement.addEventListener('pointermove',e=>{if(dragging){turn=dragTurn+(e.clientX-dragX)*.004;wake(2);}});renderer.domElement.addEventListener('pointerup',()=>dragging=false);renderer.domElement.addEventListener('pointercancel',()=>dragging=false);
 document.querySelectorAll('[data-rotate]').forEach(b=>b.addEventListener('click',()=>{turn+=Number(b.dataset.rotate)*.3;wake(2);}));
 const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)wake();else{cancelAnimationFrame(raf);raf=0;}},{rootMargin:'120px'});observer.observe(host);
 document.addEventListener('visibilitychange',()=>{hidden=document.hidden;if(hidden){cancelAnimationFrame(raf);raf=0;}else wake();});
 const ro=new ResizeObserver(()=>{resize();wake(2);});ro.observe(host);resize();syncPause();wake(2);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(raf);raf=0;host.dataset.render='fallback';paused=true;syncPause();if(controls)controls.hidden=true;document.querySelectorAll('[data-rotate]').forEach(b=>b.hidden=true);if(pauseButton)pauseButton.hidden=true;});
 renderer.domElement.addEventListener('webglcontextrestored',()=>location.reload());
 return {setView};
}
