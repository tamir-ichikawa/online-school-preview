import {T,arm,leg,LEG} from './paper-models.mjs';
const ease=t=>t*t*(3-2*t),clamp=t=>Math.max(0,Math.min(1,t));
const cupRest=new T.Vector3(.89,1.86,.25),cupHand=new T.Vector3();
// Each authored sequence includes rests, anticipations, actions and recoveries.
// Coordinates are hand targets in the person's local illustration plane.
const tracks={
 type:[
  [0,{sit:1,l:[.45,1.8],r:[.73,1.8],head:-.12,state:'typing'}],
  [6,{l:[.45,1.8],r:[.73,1.8],state:'typing'}],
  [7.5,{r:[.94,1.95],head:-.04,state:'reach-cup'}],
  [9,{r:[.25,1.95],cup:1,head:.04,state:'sip'}],
  [11,{r:[.25,1.95],cup:1,state:'sip'}],
  [12.5,{r:[.94,1.95],cup:1,state:'put-cup-down'}],
  [14,{r:[.22,2.2],l:[-.3,2.2],cup:0,torso:-.1,head:.15,state:'stretch'}],
  [16,{r:[.22,2.2],l:[-.3,2.2],state:'stretch'}],
  [18,{r:[.73,1.8],l:[.45,1.8],torso:0,head:-.12,state:'typing'}],
  [27,{state:'typing'}]
 ],
 paint:[
  [0,{r:[1.05,2.12],l:[-.2,1.32],head:-.06,state:'brush-strokes'}],
  [6,{state:'brush-strokes'}],
  [7.5,{r:[.65,1.32],head:-.2,state:'dip-brush'}],
  [9,{r:[.65,1.32],state:'dip-brush'}],
  [10.5,{r:[1.05,2.4],head:.02,state:'brush-strokes'}],
  [15,{r:[1.05,2.05],state:'brush-strokes'}],
  [17,{x:-.65,r:[.3,1.35],l:[-.12,1.45],head:.15,torso:-.05,state:'step-back'}],
  [21,{x:-.65,r:[.2,1.35],head:.11,state:'look-at-painting'}],
  [24,{x:0,r:[1.05,2.12],head:-.06,torso:0,state:'brush-strokes'}]
 ],
 read:[
  [0,{sit:1,l:[.24,1.45],r:[.76,1.55],head:-.18,state:'read'}],
  [7,{state:'read'}],[8,{r:[.7,1.67],page:1,state:'turn-page'}],
  [9.5,{r:[.23,1.6],page:1,state:'turn-page'}],[11,{r:[.76,1.55],page:0,state:'read'}],
  [17,{head:.12,r:[.4,1.45],state:'look-up'}],[21,{head:.12,state:'look-up'}],[24,{head:-.18,r:[.76,1.55],state:'read'}]
 ],
 sketch:[
  [0,{sit:1,l:[.24,1.44],r:[.57,1.54],head:-.2,state:'draw'}],
  [6,{state:'draw'}],[8,{r:[.25,2.08],head:.07,state:'think'}],[11,{r:[.25,2.08],state:'think'}],
  [13,{r:[.57,1.54],head:-.2,state:'draw'}],[21,{state:'draw'}]
 ],
 coffee:[
  [0,{l:[-.23,1.35],r:[.6,1.8],cup:1,head:0,state:'listen'}],
  [5,{head:-.07,l:[.05,1.9],state:'talk'}],[8,{l:[-.23,1.35],r:[.28,2.52],head:.08,state:'sip'}],
  [11,{state:'sip'}],[13,{r:[.6,1.8],head:0,state:'listen'}],[22,{state:'listen'}]
 ],
 photo:[
  [0,{l:[.15,1.8],r:[.4,1.9],head:-.2,state:'review-photo'}],
  [5,{r:[.22,2.8],l:[.02,2.68],head:0,state:'frame-photo'}],
  [8,{state:'take-photo'}],[10,{x:.2,head:.03,state:'frame-photo'}],
  [14,{r:[.4,1.9],l:[.15,1.8],head:-.2,x:0,state:'review-photo'}],[23,{state:'review-photo'}]
 ],
 plane:[
  [0,{l:[.25,1.85],r:[.4,1.9],plane:1,head:-.12,state:'fold-plane'}],
  [7,{state:'fold-plane'}],[9,{r:[-.3,2.65],l:[.2,1.5],head:.12,torso:-.1,state:'wind-up'}],
  [11.4,{r:[-.3,2.65],state:'aim'}],[12,{r:[1.02,2.65],torso:.12,plane:0,state:'throw'}],
  [14,{r:[.8,2.1],head:.2,state:'watch-plane'}],[18,{r:[.2,1.3],torso:0,state:'watch-plane'}],
  [22,{r:[.4,1.9],l:[.25,1.85],head:-.12,plane:1,state:'fold-plane'}],[28,{state:'fold-plane'}]
 ],
 garden:[
  [0,{r:[.5,1.45],l:[-.18,1.4],head:-.13,state:'lift-can'}],
  [3,{r:[.78,1.9],can:-.5,state:'water-plant'}],[8,{r:[.8,1.9],state:'water-plant'}],
  [11,{r:[.45,1.45],can:0,state:'lower-can'}],[14,{l:[.13,2.7],head:.07,state:'wipe-brow'}],
  [16,{state:'wipe-brow'}],[18,{l:[-.18,1.4],head:-.13,state:'check-leaves'}],[25,{state:'check-leaves'}]
 ],
 roller:[
  [0,{r:[.65,1.5],l:[.13,1.6],head:-.1,state:'load-roller'}],
  [3,{r:[.85,2.8],l:[.15,2.2],head:.13,state:'paint-up'}],
  [6,{r:[.9,2],l:[.2,1.7],head:0,state:'paint-down'}],
  [9,{r:[.85,2.8],l:[.15,2.2],head:.13,state:'paint-up'}],
  [13,{r:[.75,1.65],l:[-.15,1.3],head:.08,x:-.4,state:'inspect-wall'}],
  [18,{state:'inspect-wall'}],[21,{r:[.65,1.5],l:[.13,1.6],head:-.1,x:0,state:'load-roller'}]
 ],
 music:[
  [0,{sit:1,l:[-.15,1.25],r:[.25,1.3],head:.06,state:'listen'}],
  [5,{r:[-.05,2.15],head:-.08,state:'adjust-headphones'}],[8,{r:[.25,1.3],state:'tap-foot'}],
  [15,{head:.12,state:'listen'}],[23,{head:.06,state:'listen'}]
 ],
 present:[
  [0,{r:[1.05,2.6],l:[-.2,1.35],head:.04,state:'point-to-idea'}],
  [5,{r:[.5,1.9],l:[.1,1.8],head:-.1,state:'pick-note'}],
  [8,{r:[1.12,2.3],head:.06,state:'place-note'}],[11,{state:'place-note'}],
  [14,{x:-.45,r:[.8,1.9],l:[-.3,1.8],state:'explain'}],
  [19,{x:0,r:[1.05,2.6],l:[-.2,1.35],state:'point-to-idea'}],[25,{state:'point-to-idea'}]
 ],
 highfive:[
  [0,{r:[.7,1.85],l:[-.2,1.35],head:0,state:'talk'}],
  [6,{r:[.5,2.8],head:.08,state:'raise-hand'}],[8,{r:[.94,2.8],head:.12,state:'high-five'}],
  [8.5,{r:[.94,2.8],state:'high-five'}],[9.5,{r:[.6,2.7],head:.16,torso:-.07,state:'laugh'}],
  [12,{r:[.5,1.85],torso:0,head:.04,state:'talk'}],[23,{state:'talk'}]
 ],
 chat:[
  [0,{r:[.6,1.8],l:[-.2,1.35],head:0,state:'listen'}],[5,{r:[.8,2.15],l:[.03,1.8],head:.05,state:'explain'}],
  [11,{r:[.6,1.8],l:[-.2,1.35],head:-.04,state:'listen'}],[24,{head:0,state:'listen'}]
 ],
 fold:[
  [0,{r:[.55,1.65],l:[.35,1.65],head:-.2,state:'fold-paper'}],[7,{r:[.55,1.9],l:[.35,1.9],head:.02,state:'check-fold'}],
  [10,{r:[.55,1.65],l:[.35,1.65],head:-.2,state:'fold-paper'}],[20,{state:'fold-paper'}]
 ]};
const base={sit:0,l:[-.3,1.2],r:[.3,1.2],head:0,torso:0,x:0,page:0,cup:0,can:0,plane:1,state:'rest'};
for(const frames of Object.values(tracks)){
 let full={...base};for(const f of frames){full={...full,...f[1]};f[1]=full;}
 // Author the return to the exact first pose, including head and both hands.
 frames.at(-1)[1]={...frames[0][1]};
}
function sample(job,t){
 const f=tracks[job]||tracks.chat,d=f.at(-1)[0];t=((t%d)+d)%d;let i=0;while(i<f.length-2&&f[i+1][0]<=t)i++;
 const a=f[i],b=f[i+1],s=ease(clamp((t-a[0])/(b[0]-a[0]))),out={};
 for(const k in a[1]){const x=a[1][k],y=b[1][k];out[k]=Array.isArray(x)?x.map((v,n)=>T.MathUtils.lerp(v,y[n],s)):typeof x==='number'?T.MathUtils.lerp(x,y,s):x;}
 // Small gestures fade at their boundaries instead of snapping on/off.
 out.gesture=ease(clamp(Math.min(t-a[0],b[0]-t)/.65));return out;
}
function walk(a,distance,weight=1){
 const phase=(distance/1.12)%1,supportX=.28-(phase%.5)*1.12;
 // The supporting leg carries the pelvis; stride phase follows travelled distance.
 // This avoids a repeated squat and keeps the planted foot from skating backwards.
 const supportedHip=LEG.ankle+.08+Math.sqrt(Math.pow(LEG.thigh+LEG.shin-.008,2)-supportX*supportX);
 a.hips.position.y=T.MathUtils.lerp(LEG.standingHip,supportedHip,weight);
 for(let i=0;i<2;i++){
  const p=(phase+i*.5)%1,stance=p<.5,x=stance?.28-p*1.12:-.28+ease((p-.5)*2)*.56;
  const lift=stance?0:Math.sin((p-.5)*Math.PI*2)*.12;
  a.thighs[i].position.x=(i?.15:-.15)*(1-weight);
  leg(a,i,T.MathUtils.lerp(i?.23:-.18,x,weight),LEG.ankle+lift*weight);
  arm(a,i,(i?.3:-.3)-Math.sin(p*Math.PI*2)*.22*weight,1.4);
 }
}
export function animatePerson(a,t){
 const phase=a.job==='highfive'?0:a.job==='plane'?14:a.id*2.73;
 const v=sample(a.job,t+phase);a.root.position.set(...a.base);a.rig.scale.x=a.flip;a.rig.rotation.y=0;a.hips.position.y=v.sit>.5?LEG.seatedHip:LEG.standingHip;a.thighs[0].position.x=-.15;a.thighs[1].position.x=.15;a.torso.rotation.z=v.torso;a.head.rotation.z=v.head;a.head.rotation.y=0;a.root.position.x+=v.x*a.scale*a.flip;
 leg(a,0,v.sit>.5?.5:-.18,LEG.ankle);leg(a,1,v.sit>.5?.74:.23,LEG.ankle);arm(a,0,...v.l);arm(a,1,...v.r);a.state=v.state;
 if(a.props.page)a.props.page.rotation.y=-v.page*Math.PI*.9;
 if(a.props.can)a.props.can.rotation.z=v.can;
 if(a.props.water)a.props.water.scale.setScalar(ease(clamp(-v.can/.5)));
 if(a.props.plane)a.props.plane.scale.setScalar(v.plane);
 if(a.props.brush)a.props.brush.rotation.z=-.55;
 if(a.props.book)a.props.book.position.y=v.sit>.5?1.46:1.8;
 const active=v.state,g=v.gesture;
 if(active==='typing'){arm(a,0,v.l[0],v.l[1]+Math.sin(t*6+a.id)*.018*g);arm(a,1,v.r[0],v.r[1]+Math.sin(t*7+a.id)*.018*g);}
 if(active==='brush-strokes')arm(a,1,v.r[0]+Math.sin(t*1.4)*.04*g,v.r[1]+Math.sin(t*1.8+a.id)*.12*g);
 if(active==='draw')arm(a,1,v.r[0]+Math.sin(t*2+a.id)*.05*g,v.r[1]+Math.sin(t*2.4)*.025*g);
 if(active==='tap-foot'){leg(a,1,.74,LEG.ankle+Math.pow(Math.sin(t*1.8),2)*.065*g);a.head.rotation.z+=Math.sin(t*1.8)*.025*g;}
 if(active==='explain'||active==='talk'){arm(a,1,v.r[0],v.r[1]+Math.sin(t*1.5+a.id)*.06*g);}
 if(active==='fold-paper'){arm(a,1,v.r[0]+Math.sin(t*2)*.06*g,v.r[1]);}
 if(a.job==='type'){
  // One continuous mug, instead of swapping two objects at different positions.
  a.root.updateMatrixWorld(true);cupHand.set(0,-.08,.11);a.hands[1].localToWorld(cupHand);a.rig.worldToLocal(cupHand);
  a.props.cup.position.copy(cupRest).lerp(cupHand,v.cup);a.props.cup.rotation.z=v.torso*v.cup;
 }
 if(a.job==='deliver'){
  const q=(t+9)%42;let p,yaw=0,weight=0;
  if(q<14){p=ease(q/14);weight=ease(clamp(Math.min(q,14-q)));a.state='carry-artwork';}
  else if(q<22){p=1;yaw=Math.PI*ease(clamp((q-18)/3));a.state='check-address';}
  else if(q<36){p=1-ease((q-22)/14);yaw=Math.PI;weight=ease(clamp(Math.min(q-22,36-q)));a.state='return';}
  else{p=0;yaw=Math.PI+Math.PI*ease(clamp((q-38)/3));a.state='rest';}
  a.root.position.x=-20+p*22;a.root.position.z=8.5-p*1.5;a.root.rotation.y=Math.atan2(1.5,22);a.rig.scale.x=1;a.rig.rotation.y=yaw;
  walk(a,(q>=22?(1-p):p)*Math.hypot(22,1.5)/a.scale,weight);a.props.parcel.scale.setScalar(1);arm(a,0,.05,1.6);arm(a,1,.8,1.6);
 }
 if(a.job==='skate'){
  const q=(t+4)%56;let p,yaw=0,push=0;
  if(q<24){p=ease(q/24);push=Math.pow(Math.sin(Math.PI*clamp((q-2)/3)),2);a.state=q<2?'wait':q<5?'push-board':'skate';}
  else if(q<28){p=1;yaw=Math.PI*ease((q-24)/4);a.state='turn-board';}
  else if(q<52){p=1-ease((q-28)/24);yaw=Math.PI;push=Math.pow(Math.sin(Math.PI*clamp((q-30)/3)),2);a.state=q<30?'wait':q<33?'push-board':'skate';}
  else{p=0;yaw=Math.PI+Math.PI*ease((q-52)/4);a.state='turn-board';}
  a.root.position.x=-23+46*p;a.root.position.z=12.6-p*1.2;a.root.rotation.y=Math.atan2(1.2,46);a.rig.rotation.y=yaw;a.hips.position.y=1.39;
  leg(a,0,.24,LEG.ankle);leg(a,1,-.18-.5*push,LEG.ankle-.05*push);arm(a,0,-.75,1.6);arm(a,1,.7,1.8);a.torso.rotation.z=.09;a.head.rotation.z=.08;
 }
}
