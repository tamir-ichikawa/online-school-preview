import {courses} from './data.mjs';
let selected=courses[0],detailTrigger,founderTrigger;
const english={web:'WEB DESIGN',video:'VIDEO EDITING',image:'GRAPHIC CREATION'};
const tabs=[...document.querySelectorAll('[data-course]')];
function selectCourse(id,focus=false){
 selected=courses.find(c=>c.id===id)||courses[0];
 tabs.forEach(tab=>{const active=tab.dataset.course===selected.id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();});
 document.querySelector('#course-panel').setAttribute('aria-labelledby','tab-'+selected.id);
 document.querySelector('#course-en').textContent=english[selected.id];
 document.querySelector('#course-name').textContent=selected.name;
 document.querySelector('#course-message').textContent=selected.line;
 document.querySelector('#course-description').textContent=selected.description;
 document.querySelector('#course-topics').replaceChildren(...selected.outline.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectCourse(tab.dataset.course));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectCourse(tabs[next].dataset.course,true);}});});
document.querySelectorAll('[data-course-target]').forEach(button=>button.addEventListener('click',()=>{selectCourse(button.dataset.courseTarget);location.hash='course';}));
const detail=document.querySelector('#detail-dialog'),founder=document.querySelector('#founder-dialog'),menu=document.querySelector('#mobile-menu'),toggle=document.querySelector('.menu-toggle');
document.querySelector('#course-detail').addEventListener('click',e=>{
 detailTrigger=e.currentTarget;
 document.querySelector('#detail-heading').textContent=selected.name;
 document.querySelector('#detail-line').textContent=selected.line;
 document.querySelector('#detail-outline').replaceChildren(...selected.outline.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
 detail.showModal();
});
document.querySelector('[data-open-founder]').addEventListener('click',e=>{founderTrigger=e.currentTarget;founder.showModal();});
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
document.querySelector('[data-leave-dialog]').addEventListener('click',()=>detail.close());
detail.addEventListener('close',()=>detailTrigger?.focus({preventScroll:true}));
founder.addEventListener('close',()=>founderTrigger?.focus({preventScroll:true}));
toggle.addEventListener('click',()=>{menu.showModal();toggle.setAttribute('aria-expanded','true');});
menu.addEventListener('close',()=>{toggle.setAttribute('aria-expanded','false');if(getComputedStyle(toggle).display!=='none')toggle.focus({preventScroll:true});});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>menu.close()));
matchMedia('(min-width:1041px)').addEventListener('change',e=>{if(e.matches&&menu.open)menu.close();});
for(const dialog of [detail,founder,menu])dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
