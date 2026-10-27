const dialog=document.querySelector('#learning-dialog');
let trigger;
document.querySelectorAll('[data-learning-preview]').forEach(form=>form.addEventListener('submit',event=>{
 event.preventDefault();
 const data=new FormData(form);
 document.querySelector('#preview-title').textContent=form.dataset.learningPreview+'の確認';
 document.querySelector('#preview-output').textContent=[data.get('kind'),data.get('subject'),data.get('message')].filter(Boolean).join('\n\n');
 trigger=event.submitter;dialog.showModal();
}));
document.querySelectorAll('[data-preview-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog?.addEventListener('close',()=>trigger?.focus({preventScroll:true}));
const lesson=document.querySelector('#lesson-title');
const query=new URLSearchParams(location.search);
if(lesson){const titles={intro:'制作の流れを知る',layout:'情報と配置を考える',review:'つくって、振り返る'};lesson.textContent=titles[query.get('lesson')]||titles.layout;}
if(query.get('topic')){const subject=document.querySelector('[name="subject"]');if(subject)subject.value=query.get('topic')==='assignment'?'課題についての相談例':'教材についての質問例';}
