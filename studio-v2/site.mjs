import {courses} from './data.mjs';
import {art} from './art.mjs';
import {applications,people,tickets} from './staff-data.mjs';
const query=new URLSearchParams(location.search);
const file=location.pathname.split('/').pop()||'index.html';
const programFiles={web:'program.html',video:'program-video.html',image:'program-graphic.html'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value;};
const badge=(value,kind='')=>`<span class="tag ${kind}">${esc(value)}</span>`;
const setBadge=(selector,value,kind='')=>{const el=document.querySelector(selector);if(el)el.innerHTML=badge(value,kind);};
// Menus expand in document flow. No modal, dialog, overlay or new window.
for(const [buttonSelector,menuId] of [['.site-toggle','site-navigation'],['.work-toggle','work-navigation']]){
 const button=document.querySelector(buttonSelector),menu=document.getElementById(menuId);
 if(!button||!menu)continue;
 function close(){menu.hidden=true;button.setAttribute('aria-expanded','false');button.querySelector('span').textContent='☰';}
 button.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;button.setAttribute('aria-expanded',String(open));button.querySelector('span').textContent=open?'×':'☰';});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){close();button.focus();}});
 matchMedia('(min-width:1041px)').addEventListener('change',e=>{if(e.matches)close();});
}
document.querySelector('#role-switch')?.addEventListener('change',e=>{location.href=e.target.value;});
// The accepted home tab composition now links to individual course pages.
const tabs=[...document.querySelectorAll('[data-course]')];
function selectCourse(id,focus=false){
 const selected=courses.find(c=>c.id===id)||courses[0];
 tabs.forEach(tab=>{const active=tab.dataset.course===selected.id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();});
 document.querySelector('#course-panel').setAttribute('aria-labelledby','tab-'+selected.id);
 text('#course-en',{web:'WEB DESIGN',video:'VIDEO EDITING',image:'GRAPHIC CREATION'}[selected.id]);
 text('#course-name',selected.name);text('#course-message',selected.line);text('#course-description',selected.description);
 document.querySelector('#course-topics').replaceChildren(...selected.outline.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
 document.querySelector('#course-detail').href=programFiles[selected.id];
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectCourse(tab.dataset.course));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectCourse(tabs[next].dataset.course,true);}});});
document.querySelectorAll('[data-course-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-course-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 let count=0;document.querySelectorAll('[data-course-card]').forEach(c=>{const show=button.dataset.courseFilter==='all'||button.dataset.courseFilter===c.dataset.courseCard;c.hidden=!show;if(show)count++;});
 text('#course-count',count+'つの構成例');
}));
function appFilter(){const q=document.querySelector('#application-search').value.trim().toLowerCase(),state=document.querySelector('#application-filter').value;let count=0;document.querySelectorAll('[data-app-row]').forEach(row=>{row.hidden=!(row.dataset.search.toLowerCase().includes(q)&&(state==='すべて'||row.dataset.state===state));if(!row.hidden)count++;});text('#application-count',count+'件の表示例');document.querySelector('#application-empty').hidden=count>0;}
document.querySelector('#application-search')?.addEventListener('input',appFilter);
document.querySelector('#application-filter')?.addEventListener('change',appFilter);
document.querySelector('#person-search')?.addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();let count=0;document.querySelectorAll('[data-person-row]').forEach(row=>{row.hidden=!row.dataset.search.toLowerCase().includes(q);if(!row.hidden)count++;});text('#person-count',count+'名の表示例');document.querySelector('#person-empty').hidden=count>0;});
document.querySelectorAll('[data-ticket-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-ticket-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('[data-ticket-row]').forEach(row=>{row.hidden=!(button.dataset.ticketFilter==='all'||button.dataset.ticketFilter==='action'&&row.dataset.action==='true'||button.dataset.ticketFilter==='continuation'&&row.dataset.type==='継続申請');if(!row.hidden)count++;});document.querySelector('#ticket-empty').hidden=count>0;}));
document.querySelector('#analytics-period')?.addEventListener('change',e=>{const template=document.getElementById('analytics-'+e.target.value);document.querySelector('#analytics-results').replaceChildren(template.content.cloneNode(true));});
// Full-page record details are fixed sample data, not authorization checks.
function unavailable(selector){document.querySelector(selector).hidden=true;document.querySelector('#record-unavailable').hidden=false;}
const appDetail=document.querySelector('#application-detail');
if(appDetail){const id=query.get('id')||'AP-101',a=applications.find(a=>a.id===id);if(!a)unavailable('#application-detail');else{text('#app-id',a.id);text('#app-name',a.name);text('#app-course',a.course);text('#app-via',a.via);text('#app-reason',a.reason);text('#app-next',a.next);setBadge('#app-state',a.state,a.kind);document.title=a.name+'の申込 | LITAXIA スタジオ型';}}
const personDetail=document.querySelector('#person-detail');
if(personDetail){const id=query.get('id')||'DEMO-001',p=people.find(p=>p.id===id),teacher=personDetail.dataset.teacher==='true';if(!p||teacher&&!['DEMO-001','DEMO-003'].includes(id))unavailable('#person-detail');else{text('#person-id',p.id);text('#person-name',p.name);text('#person-course',p.course);text('#person-tasks',p.tasks);text('#person-access',p.access.replace('教材：',''));document.querySelector('#person-watch').innerHTML=`<div class="progress-label"><span>視聴記録</span><b>${p.watch}<small>%</small></b></div><div class="meter" role="img" aria-label="視聴記録 ${p.watch}%"><i style="width:${p.watch}%"></i></div>`;if(p.state==='修了候補')text('#person-completion','全必須項目達成と仮定した修了候補です。管理者または指定担当者の最終確認は未実施です。');document.title=p.name+'の学び | LITAXIA スタジオ型';}}
const ticketDetail=document.querySelector('#ticket-detail');
if(ticketDetail){const role=ticketDetail.dataset.ticketRole,id=query.get('id')||'Q-201',t=tickets.find(t=>t.id===id);if(!t||role==='teacher'&&!t.teacher||role==='learner'&&t.name!=='受講者A')unavailable('#ticket-detail');else{text('#ticket-title',t.title);text('#ticket-id',t.id+' · '+t.type);text('#ticket-person',t.name);text('#ticket-assign',t.assign);text('#ticket-next',t.next);setBadge('#ticket-state',t.state,t.type==='継続申請'?'warm':'');if(t.type==='継続申請'){document.querySelector('#ticket-continuation').hidden=false;text('#ticket-message','課題の表示例Bの振り返りを追記し、再提出を続けたいです。対象課題の利用条件について相談したいです。');}else if(id==='Q-202')text('#ticket-message','サンプル教材の再生が止まるときがあります。確認することを教えてください。');else if(id==='Q-203')text('#ticket-message','学習の進め方と、振り返りのポイントについて相談したいです。');document.title=t.title+' | LITAXIA スタジオ型';}}
function setArt(target,id){target.className='sample-art sample-'+id;target.innerHTML=art[id];target.setAttribute('aria-label',courses.find(c=>c.id===id).name+'の制作イメージ');}
const material=document.querySelector('#material-title');
if(material){const c=courses.find(c=>c.id===query.get('course'))||courses[0];material.textContent=c.name;setArt(document.querySelector('#material-art'),c.id);}
const lessonTitle=document.querySelector('#lesson-title');
if(lessonTitle){const id=['intro','layout','review'].includes(query.get('lesson'))?query.get('lesson'):'layout';lessonTitle.textContent={intro:'制作の流れを知る',layout:'情報と配置を考える',review:'つくって、振り返る'}[id];document.querySelector(`[data-lesson="${id}"]`).setAttribute('aria-current','page');if(['teacher','hq'].includes(query.get('preview')))text('.work-title>div>p','担当教材の確認再生です。受講者の学習実績には加算しません。');}
if(file==='assignment.html'){
 const b=query.get('id')==='B',status=document.querySelector('#assignment-status');
 status.querySelector('b').textContent='課題の表示例'+(b?'B':'A');status.querySelector('p').textContent=b?'フィードバックを振り返り、対象課題の利用条件を確認します。':'受付済み · フィードバックを待つ表示例です。';
 status.querySelector('.tag').textContent=b?'要修正・継続確認':'評価待ち';
 const feedback=document.querySelector('.rubric');
 if(!b){feedback.innerHTML='<div class="feedback-waiting"><span class="round-symbol">…</span><h3>フィードバックを待っています。</h3><p>提出内容を確認しています。評価結果が届いたら、できたことと次の一歩を確認しましょう。</p></div>';feedback.nextElementSibling.textContent='具体的な課題・達成基準・評価担当は準備中です。';}else feedback.nextElementSibling.textContent='課題Bのフィードバック例です。具体的な課題・達成基準は準備中です。';
}
if(query.get('topic')){const subject=document.querySelector('[name=subject]');if(subject)subject.value=query.get('topic')==='assignment'?'課題についての相談':'教材についての質問';}
if(file==='apply.html'){const via=query.get('via');if(via==='a1')document.querySelector('[name=referral]').value='代理店A1（紹介元の表示例）';}
const improvement=document.querySelector('body.role-teacher [name=course]');
if(improvement&&query.get('course')){const c=courses.find(c=>c.id===query.get('course'));if(c)improvement.value=c.name;}
// Form confirmation is an in-page, padded summary. It never submits or persists.
const labels={course:'学ぶ分野',name:'お名前',email:'メールアドレス',referral:'紹介元',checked:'条件の確認',kind:'相談の種類',subject:'件名',message:'メッセージ',file:'制作物',person:'対象の受講者',scope:'担当範囲',assignee:'担当者',version:'教材版'};
document.querySelectorAll('form[data-preview]').forEach(form=>form.addEventListener('submit',event=>{
 event.preventDefault();const data=new FormData(form),preview=form.nextElementSibling,output=preview.querySelector('[data-preview-output]');
 let result='';
 if(form.classList.contains('evaluation-form')){
  const values=[0,1,2].map(i=>data.get('criterion'+i));
  result=`<div class="status-banner"><div><b>${values.every(v=>v==='達成')?'全必須項目が達成の例':'次に確認する項目があります。'}</b><p>課題の表示例A · 受講者A</p></div></div><div class="result-criteria">${values.map((v,i)=>`<div><b>${['情報のまとまり','読みやすさ','振り返り'][i]}</b>${badge(v,v==='達成'?'good':'warm')}</div>`).join('')}</div><div class="preview-feedback"><h3>担当者からのフィードバック</h3><p>${esc(data.get('message'))}</p></div>`;
 }else{
  const items=[...data].filter(([k])=>labels[k]).map(([k,v])=>{let value=k==='file'?(v.name||'ファイルは未選択です。'):k==='checked'?'確認済み（画面内の表示）':v;return `<div><dt>${labels[k]}</dt><dd>${esc(value)}</dd></div>`;});
  result=`<div class="state-line">${badge('内容の確認')}<b>${esc(form.dataset.preview)}</b></div><dl class="facts">${items.join('')}</dl><div class="preview-feedback"><p>入力した内容を確認しています。保存・送信・状態変更は行っていません。</p></div>`;
 }
 output.innerHTML=result;preview.hidden=false;preview.focus({preventScroll:true});preview.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
}));
const builder=document.querySelector('#link-builder');
if(builder){
 function update(){const data=new FormData(builder),id=data.get('course'),c=courses.find(c=>c.id===id)||courses[0],url=new URL(programFiles[c.id],location.href);url.searchParams.set('via','a1');url.searchParams.set('medium',data.get('medium'));document.querySelector('#referral-url').value=url.href;document.querySelector('#visit-link').href=url.href;text('#promo-course',c.name);setArt(document.querySelector('.promo-card .sample-art'),c.id);text('#link-status','画面内のURL表示を更新しました。発行・記録は行いません。');}
 builder.addEventListener('submit',e=>{e.preventDefault();update();});update();
 document.querySelector('#copy-link').addEventListener('click',async()=>{const input=document.querySelector('#referral-url');try{await navigator.clipboard.writeText(input.value);text('#link-status','表示したURLをコピーしました。');}catch{input.select();text('#link-status','URLを選択しました。手動でコピーできます。');}});
}
