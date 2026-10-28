const toggle=document.querySelector('.mobile-toggle'),menu=document.querySelector('.mobile-nav');
toggle?.addEventListener('click',()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));toggle.textContent=menu.hidden?'メニュー ＋':'閉じる −';});
menu?.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.textContent='メニュー ＋';toggle.focus();}});
const host=document.querySelector('.world');
function pageMotion(btn){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches;
 const sync=()=>{document.documentElement.classList.toggle('motion-paused',paused);btn?.setAttribute('aria-pressed',String(paused));if(btn)btn.textContent=paused?'動きを再生 ↗':'動きを止める Ⅱ';};
 btn?.addEventListener('click',()=>{paused=!paused;sync();});reduced.addEventListener('change',()=>{paused=reduced.matches;sync();});sync();
}
function fallback(){host.dataset.render='fallback';document.querySelector('[data-world-controls]').hidden=true;document.querySelectorAll('[data-rotate]').forEach(b=>b.hidden=true);const pause=document.querySelector('[data-pause]');if(pause)pause.disabled=false;pageMotion(pause);}
if(host){const controls=[...document.querySelectorAll('[data-view],[data-pause]')];controls.forEach(b=>b.disabled=true);import(document.body.dataset.scene==='island'?'./island.mjs':'./city.mjs').then(({mountWorld})=>{if(!mountWorld(host))fallback();else controls.forEach(b=>b.disabled=false);}).catch(error=>{console.error('Scene initialization failed:',error);fallback();});}
else pageMotion(document.querySelector('[data-page-pause]'));
