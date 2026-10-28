import * as T from './vendor/three.module.mjs';
export {T};
export const P={ink:'#172c3d',paper:'#fffef0',lilac:'#c3a4f3',purple:'#8657d9',pink:'#ff64c3',coral:'#fa7658',lemon:'#fff251',lime:'#d8fa79',blue:'#4270ef',sky:'#8ad8f3',green:'#00826c',mint:'#a5dda8',stone:'#e7dfe7',skin:['#f5b5d4','#f1bd9f','#cc9278','#e3b6de']};
export const sources=[];
const geometries={};
function depthColors(g){const normals=g.attributes.normal,cols=new Float32Array(normals.count*3);for(let i=0;i<normals.count;i++){const shade=Math.abs(normals.getZ(i))>.9?1:.82;cols.set([shade,shade,shade],i*3);}g.setAttribute('color',new T.BufferAttribute(cols,3));return g;}
function pathShape(commands){const tokens=commands.match(/[MLQCZ]|-?(?:\d*\.)?\d+/g),s=new T.Shape();let i=0;while(i<tokens.length){const op=tokens[i++],n=()=>Number(tokens[i++]);if(op==='M')s.moveTo(n(),n());if(op==='L')s.lineTo(n(),n());if(op==='Q')s.quadraticCurveTo(n(),n(),n(),n());if(op==='C')s.bezierCurveTo(n(),n(),n(),n(),n(),n());if(op==='Z')s.closePath();}return s;}
export function define(key,commands,depth=.04){geometries[key]=depthColors(new T.ExtrudeGeometry(pathShape(commands),{depth,steps:1,bevelEnabled:false,curveSegments:10}));}
define('shirt','M -.37 .76 Q -.30 .92 -.16 .93 L .16 .93 Q .32 .9 .40 .72 L .31 .43 L .28 .02 Q 0 -.04 -.3 .02 L -.3 .5 Z');
define('coat','M -.38 .77 Q -.28 .96 -.12 .94 L .15 .94 Q .34 .92 .42 .72 L .32 .43 L .4 -.18 Q .16 -.27 -.04 -.12 Q -.24 -.27 -.43 -.15 L -.31 .44 Z');
define('dress','M -.3 .8 Q -.24 .96 -.1 .94 L .15 .94 Q .32 .9 .35 .76 L .22 .43 L .58 -.52 Q 0 -.66 -.58 -.48 L -.23 .43 Z');
define('shorts','M -.31 .17 L .29 .17 L .35 -.24 L .03 -.29 L 0 -.03 L -.03 -.29 L -.35 -.25 Z');
define('sleeve','M -.14 .03 Q -.22 -.08 -.16 -.21 L -.11 -.59 L .14 -.59 L .16 -.15 Q .19 .02 .06 .04 Z');
define('forearm','M -.085 .04 Q -.12 -.05 -.08 -.17 L -.065 -.58 Q -.02 -.66 .07 -.59 L .09 -.15 Q .12 .02 .035 .04 Z');
define('trouser','M -.15 .03 L .15 .03 L .13 -.71 L -.14 -.71 Z');
define('calf','M -.13 .03 L .13 .03 L .095 -.69 L -.11 -.69 Z');
define('hand','M -.07 .02 L -.08 -.12 Q -.13 -.2 -.08 -.23 L -.02 -.15 L .01 -.27 Q .04 -.3 .06 -.27 L .07 -.16 L .10 -.26 Q .14 -.28 .14 -.22 L .13 -.13 Q .20 -.21 .21 -.15 L .15 -.04 L .08 .03 Z',.035);
define('shoe','M -.12 .08 L .09 .08 Q .17 -.01 .36 -.035 Q .48 -.06 .44 -.15 L -.15 -.15 Z',.07);
define('face','M -.16 .21 Q -.24 .08 -.18 -.09 Q -.12 -.25 .03 -.23 Q .18 -.23 .17 -.08 L .25 -.035 Q .28 -.01 .20 .04 Q .22 .22 .07 .28 Q -.09 .32 -.16 .21 Z',.07);
define('hair0','M -.2 -.06 Q -.32 .12 -.18 .29 Q -.03 .46 .18 .29 Q .23 .18 .14 .13 Q -.03 .23 -.1 .08 L -.13 -.06 Z',.08);
define('hair1','M -.21 -.16 Q -.35 .0 -.22 .29 Q -.04 .45 .16 .29 Q .29 .14 .12 .15 Q -.06 .25 -.13 .04 L -.11 -.16 Q -.02 -.32 -.22 -.32 Z',.08);
define('hair2','M -.23 .14 Q -.36 .22 -.22 .31 Q -.22 .43 -.07 .36 Q .03 .49 .14 .35 Q .27 .37 .25 .25 Q .36 .15 .21 .08 L .11 .15 L -.03 .19 L -.14 .02 Z',.08);
define('hair3','M -.23 .08 L -.29 .24 L -.12 .35 L -.08 .42 L .08 .34 L .24 .35 L .20 .16 L .1 .14 L -.08 .17 L -.15 .02 Z',.07);
define('leaf','M 0 0 C -.2 .85 -1.1 1.4 -.7 1.65 C -.08 1.7 .38 .9 0 0 Z',.035);
define('frond','M 0 0 Q -.2 .6 -.7 .62 Q -1.1 1 -.51 .95 Q -1 1.6 -.4 1.25 Q -.6 1.95 -.1 1.55 Q .2 2.1 .38 1.6 Q .9 1.85 .64 1.24 Q 1.1 1.28 .68 .85 Q 1 .4 .35 .4 Z',.04);
define('plane','M -.9 .05 L 1.1 .1 L -.5 -.45 L -.2 .0 L -.9 .05 Z',.018);
define('triangle','M -.5 -.5 L .5 0 L -.5 .5 Z');
define('cloud','M -1 0 C -1.9 0 -1.6 .8 -.9 .8 C -1 1.7 .4 1.8 .6 .9 C 1.7 1.2 1.8 -.2 .9 -.1 Z');
const boxGeo=new T.BoxGeometry(1,1,1),normals=boxGeo.attributes.normal,colors=new Float32Array(normals.count*3);for(let i=0;i<normals.count;i++){const n=normals.getY(i)>.5?1:normals.getX(i)>.5?.76:normals.getZ(i)>.5?.92:.85;colors.set([n,n,n],i*3);}boxGeo.setAttribute('color',new T.BufferAttribute(colors,3));geometries.box=boxGeo;
geometries.circle=depthColors(new T.CircleGeometry(1,30));geometries.cylinder=depthColors(new T.CylinderGeometry(1,1,1,32));geometries.ring=depthColors(new T.RingGeometry(.86,1,40));
export function group(p,x=0,y=0,z=0){const g=new T.Group();g.position.set(x,y,z);p.add(g);return g;}
export function form(p,key,c,x,y,z,sx=1,sy=1,sz=1,rot){const o=new T.Object3D();o.position.set(x,y,z);o.scale.set(sx,sy,sz);if(rot)o.rotation.set(...rot);o.userData={key,c};p.add(o);sources.push(o);return o;}
export const box=(p,c,x,y,z,w,h,d,rot)=>form(p,'box',c,x,y,z,w,h,d,rot);
export const disc=(p,c,x,y,z,rx,ry=rx)=>form(p,'circle',c,x,y,z,rx,ry,1);
export const cyl=(p,c,x,y,z,r,h,r2=r)=>form(p,'cylinder',c,x,y,z,r,h,r2);
export function line(p,c,a,b,w=.04){const dx=b[0]-a[0],dy=b[1]-a[1],dz=(b[2]||0)-(a[2]||0),o=box(p,c,(a[0]+b[0])/2,(a[1]+b[1])/2,((a[2]||0)+(b[2]||0))/2,w,Math.hypot(dx,dy,dz),w);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3(dx,dy,dz).normalize());return o;}
export function paperPerson(p,{x=0,y=0,z=0,id=0,job='read',shirt,scale=1,flip=1}={}){
 const root=group(p,x,y,z);root.scale.setScalar(scale);root.rotation.y=.23;
 const rig=group(root);rig.scale.x=flip;
 const ink=P.ink,skin=P.skin[id%4],top=shirt||[P.paper,P.sky,P.coral,P.lime,P.purple,P.pink,P.blue,P.green][id%8],pants=['#305dd0','#006550','#7440ba',P.ink,'#334a71'][id%5],hair=[P.ink,'#006550','#c44932','#294aaf'][id%4];
 const hips=group(rig,0,1.42,0);form(hips,'shorts',pants,0,0,.13,1,1,1);
 const torso=group(hips,0,0,.19);form(torso,id%6===2?'coat':id%7===3?'dress':'shirt',top,0,0,0);
 if(id%3===0){box(torso,P.paper,-.14,.69,.07,.11,.31,.03,[0,0,.2]);box(torso,P.paper,.11,.69,.08,.1,.3,.03,[0,0,-.2]);}if(id%4===1)box(torso,pants,.13,.45,.07,.15,.15,.02);
 if(id%5===2){for(let i=0;i<5;i++)box(torso,P.paper,0,.16+i*.12,.073,.51,.018,.01);}
 if(id%5===4){line(torso,pants,[-.18,.85,.09],[.24,.06,.09],.05);box(torso,pants,.23,.12,.1,.25,.3,.07);}
 line(torso,top,[-.28,.19,.06],[-.32,.46,.06],.012);
 // Keep the neck behind the shirt: coincident front faces shimmer as limbs move.
 box(torso,skin,0,.98,-.065,.13,.27,.06);const head=group(torso,0,1.24,.035);form(head,'face',skin,0,0,0);form(head,'hair'+id%4,hair,0,0,.09);
 disc(head,ink,.12,.06,.105,.012,.016);box(head,ink,.13,.12,.106,.05,.009,.01,[0,0,-.13]);box(head,ink,.115,-.14,.104,.045,.008,.01,[0,0,.1]);
 if(job==='deliver'||job==='skate'){
  // These two figures turn through the scene; print their profile on both sides.
  form(head,'hair'+id%4,hair,0,0,-.02,1,1,-1);disc(head,ink,.12,.06,-.115,.012,.016);
  box(head,ink,.13,.12,-.116,.05,.009,.01,[0,0,-.13]);box(head,ink,.115,-.14,-.114,.045,.008,.01,[0,0,.1]);
 }
 if(id%5===0){disc(head,P.paper,.12,-.16,.12,.021,.027);disc(head,hair,-.25,.07,-.01,.12,.11);}if(id%6===4){form(head,'ring',P.ink,.13,.04,.14,.07,.065,1);line(head,P.ink,[-.15,.07,.14],[.06,.05,.14],.012);}
 const shoulders=[],elbows=[],hands=[],thighs=[],knees=[],feet=[];
 for(const s of [-1,1]){
  const upper=group(torso,s*.32,.76,s<0?-.11:.13);form(upper,'sleeve',top,0,0,0);const lower=group(upper,0,-.56,-.055);form(lower,'forearm',skin,0,0,0);const hand=group(lower,0,-.58,.06);form(hand,'hand',skin,0,0,0);shoulders.push(upper);elbows.push(lower);hands.push(hand);
  const thigh=group(hips,s*.15,-.08,s<0?-.1:.015);form(thigh,'trouser',pants,0,0,0);const knee=group(thigh,0,-.66,.015);form(knee,'calf',pants,0,0,0);const foot=group(knee,0,-.62,.02);form(foot,'shoe',id%2?P.paper:P.ink,0,0,0);box(foot,id%2?P.ink:P.paper,.12,-.12,.1,.5,.022,.03);thighs.push(thigh);knees.push(knee);feet.push(foot);
 }
 const props={};const prop=(name,hand=1)=>props[name]=group(hands[hand],0,-.08,.11);
 if(job==='paint'||job==='sketch'){const brush=prop('brush');box(brush,P.ink,0,.155,0,.025,.55,.02);box(brush,P.pink,0,.49,0,.05,.12,.02);if(job==='sketch')brush.position.z=.24;}
 if(job==='type'||job==='coffee'){const mug=prop('cup');box(mug,P.paper,.07,-.06,0,.23,.3,.16);form(mug,'ring',P.coral,.23,-.06,.05,.1,.11,1);if(job==='type')rig.add(mug);}
 if(job==='read'||job==='sketch'){
  const book=props.book=group(rig,.5,1.52,.38);book.rotation.z=-.16;
  box(book,P.green,0,0,0,.8,.54,.04);box(book,P.paper,0,0,.05,.72,.47,.02);
  // A common spine keeps every corner of the turning page above the cover.
  props.page=group(book,-.35,0,.105);box(props.page,P.paper,.35,0,0,.69,.46,.02);
  line(book,P.ink,[0,-.2,.076],[0,.21,.076],.012);
 }
 if(job==='plane'){const plane=prop('plane');form(plane,'plane',P.paper,0,0,0,.42,.42,1);}
 if(job==='garden'){const can=prop('can');box(can,P.blue,.15,-.18,0,.4,.45,.27);line(can,P.blue,[.25,-.15,0],[.62,.04,0],.11);form(can,'ring',P.blue,-.1,-.08,0,.2,.23,1);}
 if(job==='photo'){const cam=prop('camera');box(cam,P.ink,.08,0,0,.42,.26,.17);disc(cam,P.sky,.09,0,.1,.10);box(cam,P.paper,-.02,.17,0,.14,.06,.04);}
 if(job==='deliver'){const parcel=props.parcel=group(rig,.35,1.5,.35);box(parcel,P.paper,0,0,0,1.1,.8,.12);disc(parcel,P.pink,-.15,.13,.08,.22);box(parcel,P.blue,.22,-.12,.09,.4,.25,.02);}
 if(job==='roller'){const roller=prop('roller');box(roller,P.ink,0,.35,0,.04,1,.04);line(roller,P.ink,[0,.82,0],[.22,.88,0],.04);cyl(roller,P.pink,.22,.97,0,.13,.55,.13).rotation.z=Math.PI/2;}
 if(job==='music'){disc(head,P.blue,-.17,.02,.15,.07,.12);form(head,'ring',P.blue,0,.12,.04,.24,.25,1);}
 return {root,rig,hips,torso,head,shoulders,elbows,hands,thighs,knees,feet,props,job,id,base:[x,y,z],flip,scale,state:'idle'};
}
export function arm(a,index,x,y,bend=1){const upper=a.shoulders[index],lower=a.elbows[index];const dx=x-upper.position.x,dy=y-(a.hips.position.y+upper.position.y),l1=.56,l2=.58,d=Math.min(l1+l2-.002,Math.max(.08,Math.hypot(dx,dy))),angle=Math.atan2(dx,-dy);upper.rotation.z=angle-bend*Math.acos(T.MathUtils.clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));lower.rotation.z=bend*(Math.PI-Math.acos(T.MathUtils.clamp((l1*l1+l2*l2-d*d)/(2*l1*l2),-1,1)));a.hands[index].rotation.z=-upper.rotation.z-lower.rotation.z;}
export const LEG={thigh:.66,shin:.62,ankle:.15,standingHip:1.5,seatedHip:1};
export function leg(a,index,x,y){
 const upper=a.thighs[index],lower=a.knees[index],dx=x-upper.position.x,dy=y-(a.hips.position.y+upper.position.y),l1=LEG.thigh,l2=LEG.shin;
 const d=Math.min(l1+l2-.002,Math.max(.42,Math.hypot(dx,dy))),angle=Math.atan2(dx,-dy);
 // In the +X facing profile, the knee goes forward and the shin folds back.
 // Mirroring the entire figure preserves this anatomical branch in both directions.
 upper.rotation.z=angle+Math.acos(T.MathUtils.clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));
 lower.rotation.z=-(Math.PI-Math.acos(T.MathUtils.clamp((l1*l1+l2*l2-d*d)/(2*l1*l2),-1,1)));
 a.feet[index].rotation.z=-upper.rotation.z-lower.rotation.z;
}
export function plant(p,x,y,z,s=1,variant=0){const g=group(p,x,y,z);g.scale.setScalar(s);box(g,variant?P.coral:P.paper,0,.25,0,.65,.5,.58);for(let i=0;i<6;i++){const leaf=form(g,variant?'frond':'leaf',i%2?P.green:P.mint,0,.4,.03*i,.65,.8,1);leaf.rotation.set(.15*i,(i-2)*.6,(i-2)*.3);}return g;}
export function book(p,x,y,z,c=P.blue,s=1){const g=group(p,x,y,z);box(g,c,0,0,0,1.1*s,.12*s,.8*s);box(g,P.paper,0,.076*s,0,1.04*s,.025*s,.74*s);return g;}
export function chair(p,x,y,z,c=P.blue){const g=group(p,x,y,z);box(g,c,0,.77,0,.85,.1,.8);box(g,c,0,1.25,-.33,.85,.86,.07);for(const a of [-1,1])for(const b of [-1,1])line(g,P.ink,[a*.3,0,b*.26],[a*.3,.75,b*.26],.035);return g;}
export function table(p,x,y,z,w=3.4,c=P.paper){const g=group(p,x,y,z);box(g,c,0,1.55,0,w,.12,1.35);for(const a of [-1,1])for(const b of [-1,1])line(g,P.ink,[a*(w/2-.18),0,b*.5],[a*(w/2-.18),1.5,b*.5],.045);return g;}
export function laptop(p,x=0,y=1.65,z=0,c=P.blue){const g=group(p,x,y,z);box(g,c,0,0,0,.95,.045,.62);box(g,c,0,.35,-.3,.95,.7,.035,[-.12,0,0]);box(g,P.sky,0,.35,-.272,.83,.57,.01,[-.12,0,0]);box(g,P.paper,-.12,.39,-.253,.43,.08,.01);return g;}
export function easel(p,x,y,z,s=1,variant=0){const g=group(p,x,y,z);g.scale.setScalar(s);for(const a of [-1,1])line(g,P.coral,[a*.6,0,.2],[a*.35,2.9,0],.07);line(g,P.coral,[0,0,-.65],[0,2.8,0],.07);box(g,P.ink,0,1.9,.07,1.57,1.97,.09);box(g,P.paper,0,1.9,.13,1.49,1.89,.05);if(!variant){disc(g,P.blue,-.2,2.2,.18,.4);form(g,'triangle',P.pink,.28,1.7,.2,.7,.8,1,[0,0,.5]);disc(g,P.lime,.4,2.5,.2,.18);}else{disc(g,P.lemon,.25,2.4,.18,.32);line(g,P.green,[-.1,1.1,.2],[.1,2.4,.2],.035);form(g,'leaf',P.green,0,1.4,.22,.32,.4,1,[0,0,-.7]);form(g,'leaf',P.blue,0,1.7,.23,.3,.38,1,[0,0,.9]);disc(g,P.pink,-.1,2.05,.24,.26,.3);disc(g,P.coral,.15,2.12,.25,.19,.25);}box(g,P.coral,0,.9,.24,1.7,.08,.4);return g;}
export function assemble(root,scene){
 root.updateMatrixWorld(true);const buckets=new Map(),reflection=new T.Matrix4().makeScale(-1,1,1),matrix=new T.Matrix4(),hidden=new T.Matrix4().makeTranslation(0,-10000,0);
 for(const o of sources){
  const mirrored=o.matrixWorld.determinant()<0,key=o.userData.key+(mirrored?':mirror':'');
  if(!buckets.has(key))buckets.set(key,{geometry:mirrored?geometries[o.userData.key].clone().scale(-1,1,1):geometries[o.userData.key],mirrored,objects:[]});
  buckets.get(key).objects.push(o);
 }
 const material=new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide}),batches=[];
 for(const {geometry,mirrored,objects} of buckets.values()){
  const m=new T.InstancedMesh(geometry,material,objects.length);m.instanceMatrix.setUsage(T.DynamicDrawUsage);m.frustumCulled=false;
  objects.forEach((o,i)=>m.setColorAt(i,new T.Color(o.userData.c)));scene.add(m);batches.push({m,objects,mirrored});
 }
 const sync=()=>{root.updateMatrixWorld(true);for(const {m,objects,mirrored} of batches){
  objects.forEach((o,i)=>{
   let visible=true;for(let p=o;p;p=p.parent)if(!p.visible){visible=false;break;}
   if(!visible||Math.abs(o.matrixWorld.determinant())<1e-10)m.setMatrixAt(i,hidden);
   else{matrix.copy(o.matrixWorld);if(mirrored)matrix.multiply(reflection);m.setMatrixAt(i,matrix);}
  });m.instanceMatrix.needsUpdate=true;
 }};sync();return sync;
}
