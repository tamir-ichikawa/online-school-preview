import {courses} from './data.mjs';
import {artworks} from './art.mjs';
const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('#mobile-nav');
function closeMenu(){toggle.setAttribute('aria-expanded','false');menu.hidden=true;toggle.querySelector('span').textContent='☰';}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('span').textContent=open?'×':'☰';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();toggle.focus();}});
matchMedia('(min-width:1001px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const finderTabs=[...document.querySelectorAll('[data-finder]')];
function setTab(tab,focus=false){finderTabs.forEach(b=>{const active=b===tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!active;});if(focus)tab.focus();}
finderTabs.forEach((b,i)=>{b.addEventListener('click',()=>setTab(b));b.addEventListener('keydown',e=>{let next;if(['ArrowLeft','ArrowRight'].includes(e.key))next=finderTabs[1-i];if(e.key==='Home')next=finderTabs[0];if(e.key==='End')next=finderTabs.at(-1);if(next){e.preventDefault();setTab(next,true);}});});
const query=new URLSearchParams(location.search);
const purpose=query.get('purpose');const purposeText={start:'基礎から学びたい方へ',create:'作品をつくりたい方へ',work:'仕事につなげたい方へ'};
const message=document.querySelector('#purpose-message');if(message&&purposeText[purpose]){message.hidden=false;message.textContent=purposeText[purpose]+'：講座の選び方のです。';}
const filters=[...document.querySelectorAll('[data-filter]')];
function filterCourses(field){filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===field)));let count=0;document.querySelectorAll('[data-course]').forEach(card=>{const show=(field==='all'||card.dataset.course===field)&&(!purposeText[purpose]||card.dataset.goals.split(' ').includes(purpose));card.hidden=!show;if(show)count++;});document.querySelector('#result-count').textContent=count+'件の';document.querySelector('#empty-message').hidden=count>0;}
filters.forEach(b=>b.addEventListener('click',()=>filterCourses(b.dataset.filter)));if(filters.length)filterCourses('all');
const title=document.querySelector('[data-program-title]');
if(title){const selected=courses.find(c=>c.id===query.get('course'))||courses[0];title.textContent=selected.name;document.querySelector('[data-program-line]').textContent=selected.line;document.querySelector('#program-art').innerHTML=artworks[selected.id];document.querySelector('#program-outline').replaceChildren(...selected.outline.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));document.title=selected.name+'（講座） | LITAXIA スクール案';}
