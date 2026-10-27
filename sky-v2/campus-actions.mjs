import {lessons,validLesson,safeTime,clock,escapeHtml as esc,ticketFixtures,icon} from './campus-data.mjs';
const sample='動画を見ながら試したことを整理しました。気づいた点と、次に確かめたいことを分けて振り返りたいです。';
const note='取り組んだ内容を整理して、同じ課題の再提出を続けたいです。';
const focusHeading=el=>{const h=el.querySelector('h2,h3');if(h){h.tabIndex=-1;h.focus({preventScroll:false});}};
const result=(title,body,extra='')=>`<div class="campus-form-result"><h3 tabindex="-1">${title}</h3><p>${body}</p>${extra}</div>`;
const facts=rows=>`<dl class="fact-list">${rows.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>`;
const go=(c,file,label,changes={})=>`<a class="campus-link" href="${c.url(file,changes)}">${label} ${c.arrow}</a>`;
const statusTag=(label,tone='')=>`<span class="tag ${tone}">${label}</span>`;
const showError=(id,message,field)=>{const el=document.getElementById(id);el.hidden=false;el.textContent=message;field?.setAttribute('aria-invalid','true');field?.focus();};

function initializePlayer(c){
  const video=document.getElementById('lesson-video');
  const feedback=document.getElementById('video-feedback');
  const selected=validLesson(c.params.get('lesson'));
  function ready(){
    const requested=c.params.get('resume')==='1'?4:safeTime(c.params.get('at'));
    if(requested>0&&Number.isFinite(video.duration))video.currentTime=Math.min(requested,Math.max(0,video.duration-.1));
    document.getElementById('video-position').textContent=clock(video.currentTime);
    if(requested>0)feedback.textContent=`前回の位置 ${clock(video.currentTime)}から再開するです。再生ボタンで開始できます。記録は保存しません。`;
  }
  video.addEventListener('loadedmetadata',ready,{once:true});if(video.readyState>=1)ready();
  video.addEventListener('timeupdate',()=>{document.getElementById('video-position').textContent=clock(video.currentTime);});
  video.addEventListener('error',()=>{feedback.innerHTML=`動画を再生できません。利用可能な教材の確認や、操作の相談は${go(c,'support.html','共通窓口へ',{case:'technical'})}。視聴記録を0にはしません。`;});
  document.getElementById('video-speed').addEventListener('change',e=>{video.playbackRate=Number(e.target.value);feedback.textContent=`再生速度 ${e.target.value}倍。記録の保存・同期は行いません。`;});
  document.getElementById('video-restart').addEventListener('click',()=>{video.pause();video.currentTime=0;feedback.textContent='先頭に戻しました。再生ボタンで開始できます。';});
  document.getElementById('video-captions').addEventListener('click',e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';if(!video.textTracks.length){feedback.textContent='この動画に字幕はありません。';return;}for(const track of video.textTracks)track.mode=on?'showing':'disabled';e.currentTarget.setAttribute('aria-pressed',String(on));e.currentTarget.textContent=on?'字幕を非表示':'字幕を表示';});
  document.getElementById('ask-from-video').addEventListener('click',()=>{video.pause();location.href=c.url('support.html',{lesson:selected.id,at:safeTime(video.currentTime)},'new-question');});
  const tabs=[...document.querySelectorAll('[data-lesson-tab]')];
  function selectTab(tab,focus=false){for(const t of tabs){const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById('panel-'+t.dataset.lessonTab).hidden=!selected;}if(focus)tab.focus();}
  for(const tab of tabs){tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{const i=tabs.indexOf(tab);let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();selectTab(tabs[next],true);});}
}

function initializeRecords(c){
  const select=document.getElementById('record-scenario'),target=document.getElementById('record-content');
  function render(){
    if(select.value==='error'){
      target.innerHTML=`<div class="campus-record-error"><span class="tag neutral">記録を取得できません</span><h3>まだ、記録を表示できていません。</h3><p>取得に失敗したことを「0%」「未視聴」とは表示しません。元の記録を確認してから再表示します。</p><div class="actions"><button type="button" class="button light" id="record-retry">再表示できた場合を見る</button>${go(c,'support.html','記録について確認する',{case:'technical'})}</div></div>`;
      document.getElementById('record-retry').addEventListener('click',()=>{select.value='ready';render();});return;
    }
    target.innerHTML=(select.value==='unsynced'?'<div class="campus-record-banner"><b>未同期の</b><br>以下は確認できている記録です。未同期分を保存済み・別端末へ反映済みとは扱いません。</div>':'')+`<p class="small muted">教材別の割合・実時間・前回位置を分けたです。今回の動画の実測結果ではありません。</p>`+lessons.map(l=>`<article class="campus-record-row"><div class="campus-record-top"><div><small class="muted">教材 ${l.id.padStart(2,'0')}</small><h3>${l.title}</h3></div>${go(c,'classroom.html','見直す',{lesson:l.id})}</div><dl class="campus-record-metrics"><div><dt>見た範囲の割合</dt><dd>${l.watch}%</dd></div><div><dt>実再生時間</dt><dd>${l.time}</dd></div><div><dt>前回の位置</dt><dd>${l.position}</dd></div></dl><div class="progress-track" role="img" aria-label="視聴範囲${l.watch}%の"></div><p class="small muted">${l.watch?'視聴記録あり。理解度や修了認定を表すものではありません。':'未視聴として確認できている場合です。'}</p></article>`).join('');
  }
  select.addEventListener('change',render);render();
}

function initializeSupport(c){
  let tickets=ticketFixtures.map(t=>({...t})),selected=c.params.get('case')==='continuation'?'continuation':tickets.some(t=>t.id===c.params.get('case'))?c.params.get('case'):'question',filter='all';
  const select=document.getElementById('support-scenario'),compose=document.getElementById('question-compose'),scope=document.getElementById('support-scope');
  const list=document.getElementById('ticket-list'),detail=document.getElementById('ticket-detail');
  let draft={title:'',body:'',kind:c.params.get('kind')==='usage'?'利用条件・その他':'教材の質問',related:['1','2','3'].includes(c.params.get('lesson')),at:safeTime(c.params.get('at'))};
  function scopeNotice(){
    scope.innerHTML=select.value==='ended'?`<div class="campus-record-banner"><b>新しい質問の受付範囲を確認中です。</b><br>支援終了後の質問・返信の受付範囲と担当は未確定です。現在のでは新規受付完了に進みません。過去のやりとりは下ので確認できます。</div>`:`<div class="notice lime"><b>支援が有効な場合の手順です。</b><br>文で入力→確認→受付状況見え方を確認します。実際の受付・担当通知・保存は行いません。</div>`;
  }
  function form(){
    scopeNotice();
    if(select.value==='ended'){
      compose.innerHTML=`<div class="campus-form"><span class="tag neutral">受付範囲・担当確認中</span><h3 style="margin-top:17px">本部が受付範囲と窓口を確認します。</h3><p class="campus-task-copy" style="margin-top:13px">支援が終了しただけで教材の閲覧を止めるものではありません。質問・返信を受け付ける範囲は別に確認します。</p>${draft.related?`<p class="campus-linked-lesson" style="margin-top:18px">関連：教材 ${validLesson(c.params.get('lesson')).id}／${clock(draft.at)} ${go(c,'classroom.html','教材へ戻る',{lesson:validLesson(c.params.get('lesson')).id,at:draft.at})}</p>`:''}<div class="actions">${go(c,'usage.html','利用状況を確認')}<button type="button" class="edit-button" id="scope-example">支援が有効な場合の操作を見る</button></div><p class="campus-footnote">正式な連絡先・媒体・終了後の支援体制は確認待ちです。</p></div>`;
      document.getElementById('scope-example').addEventListener('click',()=>{select.value='active';form();});return;
    }
    compose.innerHTML=`<form class="campus-form" id="question-form" novalidate><div class="field" style="margin-top:20px"><label for="question-kind">相談の種類</label><select id="question-kind">${['教材の質問','学習方法・個別相談','再生・操作の不具合','利用条件・その他'].map(k=>`<option ${draft.kind===k?'selected':''}>${k}</option>`).join('')}</select></div><p class="campus-linked-lesson" style="margin-top:20px"><span><small>対象コース</small><b>${c.course.name}</b></span><label class="campus-check"><input id="question-related" type="checkbox" ${draft.related?'checked':''}>教材 ${validLesson(c.params.get('lesson')).id}・${clock(draft.at)}を添える</label></p><div class="field"><label for="question-title">相談のタイトル</label><input id="question-title" type="text" readonly value="${esc(draft.title)}" placeholder="文を入れるボタンで表示" autocomplete="off"></div><div class="field"><label for="question-body">相談の内容</label><textarea id="question-body" readonly rows="4" placeholder="文を入れるボタンで表示" autocomplete="off">${esc(draft.body)}</textarea><p class="help">通常の質問と個別対応5回は別枠です。外部への送信や保存はありません。</p></div><div class="actions"><button class="button" type="submit">内容を確認する ${c.arrow}</button><button type="button" class="edit-button" id="question-sample">文を入れる</button></div></form>`;
    document.getElementById('question-sample').addEventListener('click',()=>{document.getElementById('question-title').value='試した内容を、どう振り返ればよいですか？';document.getElementById('question-body').value=sample;document.getElementById('question-error').hidden=true;document.getElementById('question-body').removeAttribute('aria-invalid');});
    document.getElementById('question-form').addEventListener('submit',e=>{e.preventDefault();const field=document.getElementById('question-body');if(!field.value){showError('question-error','「文を入れる」で、相談内容を表示してください。',field);return;}draft={...draft,title:document.getElementById('question-title').value,body:field.value,kind:document.getElementById('question-kind').value,related:document.getElementById('question-related').checked};confirmQuestion();});
  }
  function confirmQuestion(){
    compose.innerHTML=`<section class="campus-form-confirm"><h3 tabindex="-1">相談内容を確認する</h3>${facts([['相談の種類',esc(draft.kind)],['対象コース',c.course.name],['関連教材',draft.related?`教材 ${validLesson(c.params.get('lesson')).id}／${clock(draft.at)}`:'添付しない'],['タイトル',esc(draft.title)],['内容',esc(draft.body)]])}<p class="campus-footnote">共通受付へ届いた場合のへ進みます。担当未設定の場合は本部の要対応となり、自動でコース担当へ割り当てません。</p><div class="actions"><button type="button" class="button" id="question-preview">受付状況を見る ${c.arrow}</button><button type="button" class="button light" id="question-edit">戻って確認する</button></div></section>`;
    focusHeading(compose);document.getElementById('question-edit').addEventListener('click',form);
    document.getElementById('question-preview').addEventListener('click',()=>{const ticket={id:'new',title:draft.title,body:draft.body,kind:draft.kind,status:'受付・担当確認中',actor:'本部',reply:'',lesson:draft.related?validLesson(c.params.get('lesson')).id:''};tickets=[ticket,...tickets.filter(t=>t.id!=='new')];selected='new';filter='all';compose.innerHTML=result('共通受付で、担当を確認するです。','受付番号 Q-1003。次に対応する人は本部です。受付と担当者の着手・回答は別の状態です。');focusHeading(compose);renderTickets();});
  }
  function renderTickets(){
    const shown=tickets.filter(t=>filter==='all'||(filter==='resolved'?t.status==='解決':t.status!=='解決'));
    if(selected!=='continuation'&&!shown.some(t=>t.id===selected))selected=shown[0]?.id||'';
    document.getElementById('ticket-count').textContent=`${shown.length}件の`;
    document.querySelectorAll('[data-ticket-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ticketFilter===filter)));
    list.innerHTML=shown.length?shown.map(t=>`<button type="button" class="campus-ticket" data-ticket="${t.id}" aria-pressed="${selected===t.id}">${statusTag(t.status,t.status==='解決'?'neutral':'')}<h3>${esc(t.title)}</h3><small>${esc(t.kind)}／</small></button>`).join(''):'<p class="notice">該当するはありません。</p>';
    if(selected==='continuation'){detail.innerHTML=`<span class="example">課題Bの継続案件・固定の</span><h3 tabindex="-1">対象課題の再提出継続について</h3><p class="campus-next-actor">申請番号 CONT-1001／同じ案件として確認する設計</p><div class="campus-message"><small>現在の状態</small><p><b>運営側の確認待ち</b><br>対象課題の期間ルール・承認権限・必要教材を運営側が確認します。本人の追記待ちとは別です。</p></div><p class="campus-footnote">通常返信や相談の解決では、延長を承認しません。承認・利用反映・実際の再提出可否も別に確認します。</p>${go(c,'assignments.html','課題Bの指摘と申請内容へ',{task:'b'})}`;return;}
    let t=shown.find(t=>t.id===selected)||shown[0];if(!t){detail.innerHTML='<p class="small muted">別の絞り込みを選ぶと、やりとりのを確認できます。</p>';return;}selected=t.id;
    detail.innerHTML=`<header class="campus-conversation-head">${statusTag(t.status,t.status==='解決'?'neutral':'')}<h3 tabindex="-1">${esc(t.title)}</h3><p>質問と返信は本人向けのです。内部メモは表示しません。</p></header><div class="campus-message"><small>あなたの相談</small><p>${esc(t.body)}</p></div>${t.reply?`<div class="campus-message is-reply"><small>担当者の返信例</small><p>${esc(t.reply)}</p></div>`:''}<p class="campus-next-actor">次に対応する人：<b>${esc(t.actor)}</b></p>${t.lesson?go(c,'classroom.html','関連教材に戻る',{lesson:t.lesson}):''}<div id="case-reply"></div><div class="actions">${select.value==='ended'?'<button type="button" class="button light" data-case-action="scope">返信・再開の受付範囲を確認する</button>':t.status==='解決'?'<button type="button" class="button light" data-case-action="reopen">同じ件を再開する</button>':'<button type="button" class="button light" data-case-action="reply">返信を追加する</button><button type="button" class="edit-button" data-case-action="resolve">解決した場合の</button>'}</div>`;
  }
  select.addEventListener('change',()=>{form();renderTickets();});
  document.querySelectorAll('[data-ticket-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.ticketFilter;renderTickets();}));
  list.addEventListener('click',e=>{const b=e.target.closest('[data-ticket]');if(b){selected=b.dataset.ticket;renderTickets();focusHeading(detail);}});
  detail.addEventListener('click',e=>{
    const action=e.target.closest('[data-case-action]')?.dataset.caseAction;if(!action)return;
    if(action==='scope'){scope.scrollIntoView({block:'center',behavior:'auto'});return;}
    if(select.value!=='active'||selected==='continuation')return;
    const t=tickets.find(t=>t.id===selected);if(!t)return;
    if(action==='resolve'){t.status='解決';t.actor='対応は完了しています';filter='all';renderTickets();focusHeading(detail);return;}
    if(action==='reopen'){t.status='受付・担当確認中';t.actor='本部';filter='all';renderTickets();focusHeading(detail);return;}
    if(action==='reply'){
      const reply=document.getElementById('case-reply');reply.innerHTML=`<form class="campus-form" id="case-reply-form" novalidate><label for="reply-body">返信の文</label><textarea id="reply-body" readonly rows="3"></textarea><div class="actions"><button class="button" type="submit">返信のを追加</button><button type="button" class="edit-button" id="reply-sample">返信の文を入れる</button></div></form>`;
      document.getElementById('reply-sample').addEventListener('click',()=>{document.getElementById('reply-body').value='ありがとうございます。試したことと気づいたことを分けて整理してみます。';});
      document.getElementById('case-reply-form').addEventListener('submit',ev=>{ev.preventDefault();const field=document.getElementById('reply-body');if(!field.value){showError('reply-error','返信の文を入れてください。',field);return;}t.body+='\n\n追加返信：'+field.value;const unassigned=t.actor==='本部';t.status=unassigned?'受付・担当確認中':'対応中';t.actor=unassigned?'本部':'担当者';renderTickets();focusHeading(detail);});
    }
  });
  form();renderTickets();
}

function initializeAssignments(c){
  let selected=['a','b','c'].includes(c.params.get('task'))?c.params.get('task'):'a';
  const select=document.getElementById('assignment-scenario'),list=document.getElementById('assignment-list'),detail=document.getElementById('assignment-detail');
  const drafts={},submitted=new Set();let continuation={body:'',when:'未定',want:false};
  const title=()=>`課題${selected.toUpperCase()}`;
  function listRender(){
    list.innerHTML=['a','b','c'].map(k=>{const s=select.value==='unconfigured'?'基準確認中':select.value==='active'?(submitted.has(k)?'評価待ち':'提出前の手順'):{a:'評価待ち',b:'要修正・継続相談',c:'基準確認中'}[k];return `<button type="button" data-task="${k}" aria-pressed="${selected===k}"><b>課題${k.toUpperCase()}</b>${statusTag(s)}<small>${k==='b'?'公開された指摘と再提出の条件を確認':'内容・評価基準・利用条件は'}</small></button>`;}).join('');
  }
  function render(focus=false){
    listRender();
    const pre=`<span class="example">課題・基準・履歴は</span><h2 tabindex="-1">${title()}</h2><div class="campus-task-context"><span>${c.course.name}</span>${go(c,'classroom.html','関連教材を見る',{lesson:'2'})}</div>`;
    if(select.value==='unconfigured'||(select.value==='current'&&selected==='c')){
      detail.innerHTML=pre+`${statusTag('課題・評価基準を確認中','neutral')}<p class="campus-task-copy" style="margin-top:20px">具体的な課題文・評価項目・達成基準・提出と評価の利用条件を確認しています。未設定を提出可能や無期限の評価権とは扱いません。</p><div class="actions">${go(c,'support.html','条件について確認する',{kind:'usage'})}</div>`;
    }else if(submitted.has(selected)||(select.value==='current'&&selected==='a')){
      detail.innerHTML=pre+`${statusTag('評価待ち')}<p class="campus-task-copy" style="margin-top:20px">有効な期間に受付済みの提出を、評価する状態です。通常の新規受付期間が終了しても、評価完了まで対応します。</p><div class="notice lime" style="margin-top:22px"><b>評価待ちの継続申請は不要です。</b><br>評価公開まで待つ状態と、再提出のための期間確認は別です。</div><section class="campus-task-history"><h3>提出の履歴例</h3><ol><li>提出1を受付（・実受付なし）</li><li>評価待ち。未公開の評価結果は表示しません。</li></ol></section><p class="campus-footnote">課題の提出と達成・コース修了は別です。最終的な修了は人が確認して確定します。</p>`;
    }else if(select.value==='current'&&selected==='b'){
      detail.innerHTML=pre+`${statusTag('要修正・再提出の利用条件を確認')}<section class="campus-evaluation"><h3>公開されたフィードバックの</h3><dl><div><dt>取り組んだ内容の説明</dt><dd>達成（例）</dd></div><div><dt>気づきと次の確認点の整理</dt><dd>要修正（例）</dd></div></dl><p>試したことと気づいたことを分けて、もう一度整理してみましょう。</p></section><p class="campus-footnote">これは項目別の評価とフィードバックの見え方です。正式な課題・基準は確認待ちです。</p><div class="notice" style="margin-top:22px"><b>通常の提出・再提出期間が終了した場合</b><br>対象課題だけの継続を相談できます。申請だけで承認や期間反映にはなりません。</div><div class="actions"><button type="button" class="button light" id="continue-request">この課題の継続を相談する ${c.arrow}</button></div><section class="campus-task-history"><h3>履歴の</h3><ol><li>提出1を受付</li><li>評価を公開・要修正</li><li>対象課題の再提出期間を確認</li></ol></section>`;
      document.getElementById('continue-request').addEventListener('click',()=>continuationForm());
    }else{
      detail.innerHTML=pre+`<p class="campus-assumption">提出条件と評価項目が設定済みで、利用期間内と仮定した手順です。実際の条件が確定した意味ではありません。</p><h3 style="font-size:17px">学んだこと・試したことを整理する</h3><p class="campus-task-copy" style="margin-top:13px">試した内容と気づき、次に確かめたいことを書き分ける課題です。</p><p class="campus-footnote">評価項目：取り組んだ内容の説明／気づきと次の確認点。全必須項目の達成を確認する方式です。今回は文章形式の手順で、正式な提出形式は未確定です。</p><div id="submission-compose"></div>`;submissionForm();
    }
    if(focus)focusHeading(detail);
  }
  function submissionForm(){
    const target=document.getElementById('submission-compose');
    target.innerHTML=`<form class="campus-form" id="submission-form" novalidate><label for="submission-body">回答の文</label><textarea id="submission-body" readonly rows="5">${esc(drafts[selected]||'')}</textarea><p class="help">文だけで確認します。作品URL・ファイル提出の採用条件は未確定です。</p><div class="actions"><button class="button" type="submit">提出内容を確認する ${c.arrow}</button><button type="button" class="edit-button" id="submission-sample">回答の文を入れる</button><button type="button" class="edit-button" id="submission-draft">下書きのを保持</button></div></form>`;
    document.getElementById('submission-sample').addEventListener('click',()=>{document.getElementById('submission-body').value=sample;document.getElementById('submission-error').hidden=true;});
    document.getElementById('submission-draft').addEventListener('click',()=>{drafts[selected]=document.getElementById('submission-body').value;document.getElementById('draft-feedback').textContent='このページ内の下書き例を保持しました。提出・外部保存ではありません。';});
    document.getElementById('submission-form').addEventListener('submit',e=>{e.preventDefault();const field=document.getElementById('submission-body');if(!field.value){showError('submission-error','回答の文を入れてから確認してください。',field);return;}drafts[selected]=field.value;target.innerHTML=`<section class="campus-form-confirm"><h3 tabindex="-1">提出内容を確認する</h3>${facts([['対象',title()+'／'+c.course.name],['回答',esc(drafts[selected])],['受付条件','条件設定済み・有効期間内と仮定した']])}<div class="actions"><button type="button" class="button" id="submission-preview">提出受付状況を見る</button><button type="button" class="button light" id="submission-edit">戻って修正する</button></div></section>`;focusHeading(target);document.getElementById('submission-edit').addEventListener('click',submissionForm);document.getElementById('submission-preview').addEventListener('click',()=>{submitted.add(selected);render(true);});});
  }
  function continuationForm(){
    detail.innerHTML=`<span class="example">対象課題の継続申請の</span><h2 tabindex="-1">この課題の再提出を続けたい</h2>${facts([['対象',title()+'／'+c.course.name],['直前の評価','提出1・要修正'],['現在の利用条件','通常期間終了の。継続期間・許可条件・承認者は確認待ち']])}<form class="campus-form" id="continuation-form" novalidate><label class="campus-check"><input id="continuation-want" type="checkbox" ${continuation.want?'checked':''}>この課題の再提出を続けたい</label><div class="field"><label for="continuation-note">伝えたいこと（任意・）</label><textarea id="continuation-note" readonly rows="3">${esc(continuation.body)}</textarea><button type="button" class="edit-button" id="continuation-sample">補足の文を入れる</button></div><div class="field"><label for="continuation-when">希望する時期（任意）</label><select id="continuation-when"><option ${continuation.when==='未定'?'selected':''}>未定</option><option ${continuation.when==='時期を相談したい'?'selected':''}>時期を相談したい</option></select><p class="help">希望は承認された継続期間や、強制的な締切ではありません。</p></div><div class="actions"><button class="button" type="submit">希望内容を確認する</button><button type="button" class="edit-button" id="continuation-back">評価結果へ戻る</button></div></form>`;
    focusHeading(detail);document.getElementById('continuation-sample').addEventListener('click',()=>{document.getElementById('continuation-note').value=note;});document.getElementById('continuation-back').addEventListener('click',()=>render(true));
    document.getElementById('continuation-form').addEventListener('submit',e=>{e.preventDefault();const want=document.getElementById('continuation-want');if(!want.checked){showError('continuation-error','継続希望の確認欄を選択してください。',want);return;}continuation={want:true,body:document.getElementById('continuation-note').value,when:document.getElementById('continuation-when').value};detail.innerHTML=`<section class="campus-form-confirm"><h3 tabindex="-1">継続希望を確認する</h3>${facts([['対象',title()],['希望','この課題の再提出を続けたい'],['補足',esc(continuation.body)||'補足なし'],['希望する時期',esc(continuation.when)]])}<p class="campus-footnote">作品の再提出ではなく、対象課題の継続申請です。申請だけで承認・期間反映・再提出可能にはなりません。</p><div class="actions"><button type="button" class="button" id="continuation-preview">継続申請後のを見る</button><button type="button" class="button light" id="continuation-edit">戻って確認する</button></div></section>`;focusHeading(detail);document.getElementById('continuation-edit').addEventListener('click',continuationForm);document.getElementById('continuation-preview').addEventListener('click',()=>{detail.innerHTML=result('運営側の確認待ちです。','申請番号 CONT-1001。期間ルール・承認権限などを運営側が確認する段階で、本人の追記待ちとは別です。',`<p><b>対象：${title()}だけ</b><br>継続期間：確認待ち／再提出可否：まだ確定していません。</p>${go(c,'support.html','共通受付の同じ案件を見る',{case:'continuation'})}`);focusHeading(detail);});});
  }
  list.addEventListener('click',e=>{const b=e.target.closest('[data-task]');if(b){selected=b.dataset.task;render(true);}});
  select.addEventListener('change',()=>{if(select.value!=='current')selected='c';render();});render();
}

function initializeUsage(c){
  const select=document.getElementById('usage-scenario'),target=document.getElementById('usage-content');
  function render(){
    const unset=select.value==='unset',unlimited=select.value==='unlimited';
    const items=[
      ['play','教材の閲覧',unset?'設定確認中':'利用可能とする',unset?'期間・対象が未設定のため、利用可能や期限なしと判断しません。':'支援の期間が終了していても、利用可能な対象教材は学習を続けられます。',unlimited?'明示した期限なし（対象教材だけの）':'具体的な期間・起算は確認待ち','classroom.html','教材を確認する'],
      ['talk','質問・支援',unset?'設定確認中':'終了の',unset?'受付範囲と有効な担当者を運営側が確認します。':'終了後の質問・返信の受付範囲は確認待ちです。教材の利用状態とは別です。','具体的な終了条件・連絡体制は確認待ち','support.html','質問の受付範囲を確認する'],
      ['task','課題の提出・評価',unset?'設定確認中':'受付済み分を評価中',unset?'未設定から、無期限の提出・評価権を付与しません。':'新規受付終了と受付済み評価の継続を分けます。要修正の対象課題は継続を確認します。','通常期間・継続条件・承認者は確認待ち','assignments.html','課題・評価を確認する'],
    ];
    target.innerHTML=`<div class="campus-access-list">${items.map(([art,title,status,body,period,file,label])=>`<article class="campus-access-card">${icon(art)}<div><h3>${title}</h3>${statusTag(status,art==='play'&&!unset?'lime':'neutral')}<p>${body}</p><dl><div><dt>対象コース</dt><dd>${c.course.name}</dd></div><div><dt>期間の設定</dt><dd>${period}</dd></div></dl>${go(c,file,label)}</div></article>`).join('')}</div><p class="campus-footnote">${unlimited?'教材に期限なしと明示する場合です。全教材の開放・無期限の個別支援・課題評価権へ広げません。':'状態の組み合わせはです。実際の利用権を確定したものではありません。'} 利用期間の未設定と、明示された期限なしは別です。</p>`;
  }
  select.addEventListener('change',render);render();
}

function initializeGuide(){
  const buttons=[...document.querySelectorAll('[data-faq-category]')];
  for(const button of buttons)button.addEventListener('click',()=>{const category=button.dataset.faqCategory;let count=0;for(const item of document.querySelectorAll('[data-faq-item]')){const show=category==='all'||category===item.dataset.faqItem;item.hidden=!show;if(show)count++;else item.open=false;}buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.getElementById('faq-count').textContent=`${count}件の質問`;});
}

export function initializeCampus(c,page){
  document.getElementById('learning-course')?.addEventListener('change',e=>{location.href=c.url(page+'.html',{course:e.target.value});});
  ({classroom:initializePlayer,progress:initializeRecords,support:initializeSupport,assignments:initializeAssignments,usage:initializeUsage,guide:initializeGuide}[page])?.(c);
}
