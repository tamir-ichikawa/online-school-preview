const design=document.body.dataset.design,screen=document.body.dataset.screen;
const labels={courses:'COURSES',program:'WEB DESIGN','program-video':'VIDEO EDITING','program-graphic':'GRAPHIC CREATION',support:'LEARNING & SUPPORT',guide:'START GUIDE',usage:'FEES & ACCESS',about:'ABOUT US',partners:'PARTNERS',apply:'APPLICATION',status:'APPLICATION STATUS',faq:'FAQ',founder:'OUR STORY',review:'WORKSPACES'};
const heading=document.querySelector('.page-head>.container,.page-intro>.wrap,.page-heading');
if(heading&&screen!=='index'){
 heading.classList.add('client-masthead');
 if(!heading.querySelector('.eyebrow')){const eye=document.createElement('span');eye.className='eyebrow';eye.textContent=labels[screen]||'LITAXIA SCHOOL';heading.prepend(eye);}
 const figure=document.createElement('figure');figure.className='client-masthead-art';figure.setAttribute('aria-hidden','true');
 const img=document.createElement('img');img.src=design==='school'?'assets/school-hero.jpg':design==='sky'?'assets/illustration-direction-v2.png':'assets/learning-desk.jpg';img.alt='';img.width=640;img.height=480;figure.append(img);heading.append(figure);
}
const work=document.querySelector('.page-title,.work-title');
if(work){work.classList.add('client-work-title');const accent=document.createElement('span');accent.className='client-work-orbit';accent.setAttribute('aria-hidden','true');accent.innerHTML='<i></i><i></i><i></i>';work.append(accent);}
for(const detail of document.querySelectorAll('section#detail-dialog,section#preview-dialog')){detail.classList.add('client-inline-detail');document.querySelector('main')?.append(detail);}
// Empty labels can remain after removing a development annotation from a template.
document.querySelectorAll('p,small,.example,.sample-stamp').forEach(e=>{if(!e.textContent.trim()&&!e.id&&!e.children.length)e.remove();});
