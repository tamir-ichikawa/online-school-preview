import {T,P,group,form,box,disc,cyl,line,paperPerson,plant,book,chair,table,laptop,easel,assemble,define} from './paper-models.mjs';
import {animatePerson} from './people-motion.mjs';

define('canopy','M -1.7 0 Q -2.4 .35 -1.8 .9 Q -2.1 1.7 -1.3 1.8 Q -1.4 2.55 -.6 2.5 Q -.1 3.05 .5 2.55 Q 1.4 2.7 1.5 2 Q 2.2 1.9 1.9 1.25 Q 2.5 .7 1.8 .2 Q .8 -.3 -1.7 0 Z',.07);
define('petal','M 0 0 C -1.1 .1 -.8 1.4 -.18 1.2 C .4 1.1 .35 .4 0 0 Z');
function tree(p,x,y,z,s=1,color=P.green){const g=group(p,x,y,z);g.scale.setScalar(s);line(g,P.pink,[0,0,0],[.1,4.5,0],.22);line(g,P.pink,[0,2,0],[-1.1,3.6,0],.16);line(g,P.pink,[0,2.8,0],[1.2,4,0],.16);form(g,'canopy',color,0,2.3,0,1,1,1);return g;}
function flower(p,x,y,z,s=1,c=P.lemon){const g=group(p,x,y,z);g.scale.setScalar(s);line(g,P.green,[0,0,0],[0,2.1,0],.09);for(let i=0;i<7;i++)form(g,'petal',c,0,2.1,.05,1,1,1,[0,0,i*Math.PI*2/7]);disc(g,P.coral,0,2.1,.12,.3);form(g,'leaf',P.green,0,.7,0,.8,.8,1,[0,0,1.2]);}
function shelf(p,x,y,z,w=4){for(const yy of [.25,1.7,3.15]){box(p,P.paper,x,y+yy,z,w,.1,.7);for(let i=0;i<6;i++){box(p,[P.blue,P.coral,P.lime,P.pink][i%4],x-w/2+.4+i*.48,y+yy+.45,z,.23,.8,.5,[0,0,i%3===0?.12:0]);}}for(const xx of [-1,1])line(p,P.ink,[x+xx*w/2,y,z],[x+xx*w/2,y+3.2,z],.05);}
function pendant(p,x,y,z,c=P.coral){line(p,P.ink,[x,y+1.8,z],[x,y,z],.025);const g=group(p,x,y,z);form(g,'cloud',c,0,0,0,.5,.4,1);box(g,P.lemon,0,-.05,.05,1.05,.07,.3);}
function noticeboard(p,x,y,z,w=3.2){box(p,P.ink,x,y,z,w+.06,2.36,.09);box(p,P.paper,x,y,z+.06,w,2.3,.03);for(let i=0;i<8;i++)box(p,[P.pink,P.lime,P.sky][i%3],x-1.1+(i%4)*.68,y+.5-Math.floor(i/4)*.8,z+.09,.47,.53,.02,[0,0,(i%3-1)*.06]);}
function mug(p,x,y,z,c=P.paper){box(p,c,x,y,z,.23,.3,.18);form(p,'ring',P.coral,x+.16,y,z+.08,.10,.11,1);}

export function makeCity(){
 const root=new T.Group(),people=[],decor=[];let id=0;
 const add=(x,y,z,job,extra={})=>{const floor=y===0?(z>9?.14:z>1.5?.075:x>3?.04:.02):y;const a=paperPerson(root,{x,y:floor,z,job,id:id++,...extra});people.push(a);return a;};
 // The floor extends past the viewport. Areas overlap like a large editorial illustration.
 box(root,P.stone,0,-.29,0,90,.4,70);
 // Quiet linework behind the inhabited planes gives the illustration a deeper city backdrop.
 for(let n=0;n<9;n++){const x=-25+n*6.5,h=7+n%3*2;box(root,['#d5cbdf','#d1d5ed','#e8e3ec'][n%3],x,h/2,-16,5.3,h,.15);for(let row=0;row<4;row++)for(let col=0;col<3;col++)box(root,n%2?'#b9c3dc':'#c2b4d3',x-1.6+col*1.6,1.6+row*1.7,-15.89,.8,.9,.015);}
 box(root,P.lilac,-10,-.04,-6,29,.12,19);
 box(root,P.lime,12,-.01,-7,18,.1,15);
 box(root,P.coral,0,.015,6,55,.12,9,[0,.1,0]);
 box(root,P.lemon,12,.035,12,30,.12,6);
 box(root,P.sky,-14,.065,13,24,.1,7);
 // Upper-left open studio: structural edges, an open frontage, and a wide stair.
 box(root,P.lime,-10,4.7,-9.5,15,6,.14);
 box(root,P.blue,-17.5,4,-6.5,.16,5,6);
 box(root,P.pink,-10,3.55,-6.5,15,.23,6.5);
 for(const x of [-16.8,-9.6,-3.3])line(root,P.ink,[x,0,-4.1],[x,3.5,-4.1],.08);
 box(root,P.paper,-10,1.1,-8.5,14,2.2,.16);
 shelf(root,-15.4,0,-7.8,3.6);noticeboard(root,-8.1,1.7,-8.3,3.6);
 table(root,-13.25,3.7,-5.7,1.7,P.paper);table(root,-10.45,3.7,-5.8,1.7,P.paper);laptop(root,-13.4,5.35,-5.7);laptop(root,-10.6,5.35,-5.8,P.green);
 chair(root,-14.2,3.7,-5.8,P.blue);chair(root,-11.4,3.7,-5.9,P.coral);
 add(-14.2,3.7,-5.7,'type',{shirt:P.paper});add(-11.4,3.7,-5.8,'type',{shirt:P.blue});
 const boarder=add(-5.2,3.7,-6.5,'present',{shirt:P.green,flip:-1});noticeboard(root,-7,5.6,-7,2.9);
 plant(root,-16.5,3.7,-7,1);pendant(root,-11.2,6.6,-7);pendant(root,-6.9,6.6,-7,P.blue);
 // Stairs descend into the common floor, rather than ending at an island edge.
 for(let i=0;i<10;i++){const h=(i+1)*.3665;box(root,i%2?P.blue:'#537af0',-1.65,h/2,-.1-i*.6,2.45,h,.6);}
 line(root,P.ink,[-.4,1,.2],[-.4,4.5,-5.6],.04);
 // Lower workshop, broad windows and drawing tools.
 table(root,-9,0,-2.5,4.6,P.paper);book(root,-9.5,1.65,-2.5,P.pink);laptop(root,-8,1.65,-2.5);
 chair(root,-10.5,0,-1.9,P.coral);add(-10.5,0,-1.8,'sketch',{shirt:P.lime});
 add(-7,0,-1.8,'fold',{shirt:P.pink});plant(root,-15.7,0,-3.4,1.4,1);
 // Gallery on the right; large flat cut-out leaves and canvases define its edges.
 box(root,P.paper,9.5,2.9,-8,15,5.8,.15);
 // A curved upper edit room, with its own working pair and a visitor at the railing.
 const balcony=disc(root,P.pink,9,6.035,-10,8.2,3.4);balcony.rotation.x=-Math.PI/2;
 box(root,P.coral,9,5.91,-10,15.3,.18,5);
 box(root,P.sky,10,8.25,-12.4,14,4.5,.13);
 disc(root,P.lemon,10.9,8.4,-12.29,2.2);
 box(root,P.blue,4,8.4,-12.25,1.6,4,.03);
 table(root,5.65,6.02,-10.1,1.7,P.lime);table(root,7.75,6.02,-10.1,1.7,P.lime);laptop(root,5.5,7.67,-10.2);laptop(root,7.6,7.67,-10.2,P.green);
 chair(root,4.7,6.02,-10.2,P.blue);chair(root,6.8,6.02,-10.2,P.coral);
 add(4.7,6.02,-10.1,'type',{shirt:P.paper});add(6.8,6.02,-10.1,'sketch',{shirt:P.coral});
 add(12.4,6.02,-10.6,'photo',{shirt:P.green,flip:-1});
 plant(root,15.7,6.02,-10.2,1.1);pendant(root,7,9.9,-11,P.blue);
 for(let i=0;i<7;i++){const h=(i+1)*.86;box(root,P.purple,18.3,h/2,-5.5-i*.67,2.3,h,.67);}
 box(root,P.blue,11.7,2.9,-7.89,4.1,3.7,.05);disc(root,P.lemon,11.2,3.2,-7.83,1.2);form(root,'triangle',P.pink,12.3,2.3,-7.8,1.7,2,1);
 noticeboard(root,5.5,3.7,-7.85,3.9);
 easel(root,6.4,0,-3.7,1.3);easel(root,13.2,0,-3.5,1.3,1);
 const painter=add(4.5,0,-2.9,'paint',{shirt:P.paper,scale:1.15});painter.paintTarget=6.4;
 const painter2=add(11.1,0,-2.9,'paint',{shirt:P.sky,scale:1.1});
 add(15.6,0,-6.3,'roller',{shirt:P.coral,flip:-1,scale:1.1});
 box(root,P.pink,17,2,-7.88,2.2,3.9,.05);plant(root,17.5,0,-4,1.7,1);
 table(root,8.5,0,-5.6,2.3,P.lemon);book(root,8.6,1.66,-5.6,P.green);mug(root,8,1.8,-5.5,P.blue);
 // Outdoor table, a tiny bookshop and hanging canopy on the left.
 for(const x of [-18,-11.3])line(root,P.green,[x,0,2],[x,4.6,2],.12);
 box(root,P.paper,-14.65,4.6,1,7.2,.14,3.6,[0,0,.03]);
 for(let i=0;i<7;i++)box(root,i%2?P.lemon:P.paper,-17.7+i*1.02,4.45,2.8,1.02,.38,.1);
 table(root,-16.05,0,2.5,1.7,P.lime);table(root,-13.8,0,1.8,2.2,P.lime);laptop(root,-16.1,1.65,2.5);book(root,-13.7,1.65,1.7,P.pink);chair(root,-17,0,2.4,P.blue);
 add(-17,0,2.5,'type',{shirt:P.coral,scale:1.1});add(-12.3,0,1.7,'coffee',{shirt:P.green,flip:-1});
 shelf(root,-19.3,0,-.2,2.8);flower(root,-20.2,0,4.1,1.7,P.pink);
 // Foreground social/work lounge. Every person belongs to a specific activity.
 box(root,P.purple,-5.4,.42,5.7,6.1,.84,2);box(root,P.purple,-5.4,1.15,5.05,6.1,1.2,.32);
 add(-7,0,6.9,'read',{shirt:P.paper,scale:1.2});add(-4.2,0,6.9,'music',{shirt:P.lime,scale:1.2});
 table(root,-6.3,0,8.8,3.4,P.paper);book(root,-6.3,1.65,8.7,P.blue);mug(root,-5.4,1.8,8.8);
 add(-.6,0,5.2,'highfive',{shirt:P.coral,scale:1.15}).root.rotation.y=0;add(1.55,0,5.2,'highfive',{shirt:P.blue,flip:-1,scale:1.15}).root.rotation.y=0;
 table(root,6.45,0,6.4,1.7,P.pink);table(root,8.7,0,5.6,1.8,P.pink);laptop(root,6.4,1.65,6.4);chair(root,5.5,0,6.3,P.green);chair(root,8.6,0,6.1,P.blue);
 add(5.5,0,6.4,'type',{shirt:P.paper,scale:1.1});add(10.2,0,5.4,'coffee',{shirt:P.lilac,flip:-1,scale:1.1});
 add(13.5,0,3.8,'photo',{shirt:P.lime,scale:1.3});
 add(17.4,0,5.8,'garden',{shirt:P.blue,flip:-1,scale:1.18});plant(root,15.9,0,6.4,1.55);
 // Larger foreground figures / small stories, with asymmetric poses.
 add(-14,0,9.2,'plane',{shirt:P.paper,scale:1.35});
 const flight=group(root,-12,3,8);form(flight,'plane',P.paper,0,0,0,1,1,1);box(flight,P.blue,-.2,-.09,.03,.6,.04,.03);decor.push({kind:'flight',g:flight});
 add(8.6,0,11.3,'sketch',{shirt:P.green,scale:1.3});box(root,P.paper,8.2,.45,10.4,2,.8,1.6);
 const courier=add(-17,0,9.2,'deliver',{shirt:P.pink,scale:1.2});
 const skater=add(-3,0,11.2,'skate',{shirt:P.paper,scale:1.25});const board=group(skater.rig,0,-.02,.12);box(board,P.blue,0,0,0,1.4,.06,.35);for(const x of [-.45,.45])disc(board,P.lemon,x,-.13,.2,.11);
 add(2.7,0,-3.2,'read',{shirt:P.pink,scale:.95});chair(root,2.7,0,-3.6,P.sky);
 add(-5,0,-1,'photo',{shirt:P.sky});
 add(18.5,0,-.2,'chat',{shirt:P.paper,flip:-1});add(16.7,0,.1,'chat',{shirt:P.pink});
 // Oversized foliage fills the sides without forming an enclosing rim.
 tree(root,-21,0,-8,1.8);tree(root,22,0,-6,2,P.green);tree(root,20.5,0,8,1.45,P.mint);
 plant(root,-20,0,10,2.6);plant(root,17.5,0,12,2.2,1);plant(root,3.1,0,12.9,1.45);flower(root,21,0,12.1,1.8);flower(root,-10.8,0,11,1.1);
 const frontRug=disc(root,P.lemon,9,.14,12,17,5.3);frontRug.rotation.x=-Math.PI/2;
 add(-8.8,0,12.5,'photo',{shirt:P.coral,scale:1.55});
 add(14.3,0,11.2,'coffee',{shirt:P.paper,flip:-1,scale:1.5});
 // Handheld props have matching environmental objects, so actions read as tasks.
 for(const a of people){
  if(a.job==='garden'){
   const water=group(a.props.can,.63,-.04,.04);for(let j=0;j<5;j++)disc(water,P.sky,j*.035,-j*.14,0,.025,.05);a.props.water=water;
  }
  if(a.job==='present'){
   const note=group(a.hands[1],.06,-.1,.15);box(note,P.pink,0,0,0,.24,.25,.015);a.props.note=note;
  }
 }
 for(const [x,z,s] of [[-4,-9.6,1],[2,-7,1.4],[20,1,1.1],[-9,3,1.1]])plant(root,x,0,z,s);
 // A few airborne accents have their own small arcs, not the people.
 for(let i=0;i<4;i++){const g=group(root,-17+i*11,6+i%2,3-i);form(g,'plane',i%2?P.lemon:P.paper,0,0,0,.65,.65,1,[0,0,.1]);decor.push({kind:'paper',g,base:g.position.clone(),phase:i*2.1});}
 return {root,people,decor};
}

export function mountWorld(host){
 let renderer;try{renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});}catch{return null;}
 renderer.setClearColor(P.stone);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.NoToneMapping;renderer.domElement.setAttribute('aria-hidden','true');host.append(renderer.domElement);
 const scene=new T.Scene(),camera=new T.OrthographicCamera(-20,20,12,-12,.1,150),city=makeCity(),sync=assemble(city.root,scene);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),pauseButton=document.querySelector('[data-pause]');
 let paused=reduced.matches,visible=true,hidden=document.hidden,lost=false,time=3,last=0,raf=0,frame=0,settle=0,view=host.dataset.view||'all',transition=1;
 const views={all:{x:0,y:2.9,z:1,size:12.1},studio:{x:-10,y:4.3,z:-5.5,size:5.7},gallery:{x:10,y:2,z:-3.7,size:6.5},lounge:{x:1,y:1.4,z:6.1,size:7.9}};
 let current={...views[view]},desired=views[view],from={...current};
 function draw(dt=0){
  for(const a of city.people)animatePerson(a,time);
  for(const d of city.decor){if(d.kind==='flight'){const t=(time+14)%28,p=T.MathUtils.clamp((t-12)/7,0,1);d.g.scale.setScalar(t>=12&&t<19?1:0);d.g.position.set(-12+24*p,3.3+Math.sin(p*Math.PI)*3.5,8-8*p);d.g.rotation.set(.1,0,.3-p*.55);}else{d.g.position.copy(d.base);d.g.position.x+=Math.sin(time*.22+d.phase)*1.2;d.g.position.y+=Math.sin(time*.4+d.phase)*.3;d.g.rotation.z=.1+Math.sin(time*.35+d.phase)*.12;}}
  transition=Math.min(1,transition+dt/.85);const blend=transition*transition*(3-2*transition);
  for(const k of Object.keys(current))current[k]=transition===1?desired[k]:T.MathUtils.lerp(from[k],desired[k],blend);
  const aspect=host.clientWidth/host.clientHeight,size=current.size;camera.left=-size*aspect;camera.right=size*aspect;camera.top=size;camera.bottom=-size;camera.updateProjectionMatrix();
  const cx=current.x+(aspect<.8&&view==='all'?2:0);camera.position.set(cx+7,current.y+19,current.z+35);camera.lookAt(cx,current.y,current.z);sync();renderer.render(scene,camera);
  host.dataset.render='ready';host.dataset.frame=String(frame++);host.dataset.people=String(city.people.length);host.dataset.motion=paused?'paused':'playing';host.dataset.view=view;host.dataset.time=time.toFixed(2);if(frame%30===1)host.dataset.activities=city.people.map(a=>a.job+':'+a.state).join('|');
 }
 function loop(now){raf=0;if(hidden||!visible||lost)return;if(!last)last=now;const dt=Math.min((now-last)/1000,.05);last=now;if(!paused)time+=dt;draw(dt);if(!paused||transition<1||settle-->0)raf=requestAnimationFrame(loop);}
 function wake(frames=1){settle=Math.max(settle,frames);if(!raf&&!hidden&&visible&&!lost){last=0;raf=requestAnimationFrame(loop);}}
 function setView(v){if(!views[v])return;view=v;from={...current};desired=views[v];transition=reduced.matches?1:0;document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===v)));document.querySelector('[data-scene-caption]')?.replaceChildren(document.createTextNode({all:'好きなことは、みんな違う。',studio:'つくって、試して、またつくる。',gallery:'頭の中のイメージを、かたちに。',lounge:'ひと息つく時間にも、新しい発見。'}[v]));document.querySelector('.hero')?.setAttribute('data-focus',v);wake();}
 function pause(){pauseButton?.setAttribute('aria-pressed',String(paused));if(pauseButton)pauseButton.textContent=paused?'再生 ▷':'一時停止 Ⅱ';document.documentElement.classList.toggle('motion-paused',paused);wake();}
 pauseButton?.addEventListener('click',()=>{paused=!paused;pause();});document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));reduced.addEventListener('change',()=>{paused=reduced.matches;transition=1;pause();});
 function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio,1.5),2,Math.sqrt(4000000/(w*h))));renderer.setSize(w,h);wake(2);}
 new ResizeObserver(resize).observe(host);
 new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)wake();else{cancelAnimationFrame(raf);raf=0;}},{rootMargin:'70px'}).observe(host);
 document.addEventListener('visibilitychange',()=>{hidden=document.hidden;if(hidden){cancelAnimationFrame(raf);raf=0;}else wake();});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(raf);host.dataset.render='fallback';document.querySelectorAll('[data-world-controls],[data-pause]').forEach(e=>e.hidden=true);});renderer.domElement.addEventListener('webglcontextrestored',()=>location.reload());
 resize();pause();wake();return {setView};
}
