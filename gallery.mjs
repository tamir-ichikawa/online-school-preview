import {designs} from './designs.mjs';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.querySelector('#design-count').textContent=`${designs.length}案を公開中`;
document.querySelector('#design-list').innerHTML=designs.map(d=>{
 const links=d.links||[{label:'受講画面',url:d.learning},{label:'管理画面まとめ',url:d.management}];
 return `<article class="design-card" id="${esc(d.id)}"><a class="design-image" href="${esc(d.url)}" aria-label="${esc(d.name)}の公開サイトを見る"><img src="${esc(d.image)}" width="1265" height="900" alt="${esc(d.name)}案のトップページ"><span>サイトを見る <b aria-hidden="true">↗</b></span></a><div class="design-content"><p class="design-label">${esc(d.label)}</p><h3>${esc(d.name)}</h3><p class="design-description">${esc(d.description)}</p><div class="feature-list">${d.features.map(f=>`<span>${esc(f)}</span>`).join('')}</div><a class="primary-link" href="${esc(d.url)}">このデザインを見る <span aria-hidden="true">→</span></a><div class="secondary-links">${links.map(l=>`<a href="${esc(l.url)}">${esc(l.label)} <span aria-hidden="true">↗</span></a>`).join('')}</div></div></article>`;
}).join('');
