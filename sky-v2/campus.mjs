import {lessons,validLesson,icon,campusRoutes,faqItems} from './campus-data.mjs';
export {initializeCampus} from './campus-actions.mjs';
export const campusPageKeys=campusRoutes.map(r=>r[0]);
const badge='';
const link=(c,file,text,changes={},className='campus-link')=>`<a class="${className}" href="${c.url(file.split('#')[0],changes,file.split('#')[1]||'')}">${text} ${c.arrow}</a>`;

function shell(c,page,body){
  const title={learn:'今日も、一歩ずつ。',classroom:'教材と動画',progress:'学びの、今いるところ。',support:'一人で抱えこまない。',assignments:'試して、振り返って、次へ。',usage:'利用状況と窓口'}[page];
  const label=campusRoutes.find(r=>r[0]===page)[1];
  return `<main id="main" class="campus-page">${c.crumbs(label)}<div class="container campus-shell">
    <aside class="campus-sidebar"><p class="eyebrow">MY LEARNING</p><p class="campus-sidebar-title">自分のペースで、<br>少しずつ。</p><nav aria-label="受講メニュー">${campusRoutes.map(([key,name,art])=>`<a href="${c.url(key+'.html')}" ${key===page?'aria-current="page"':''}>${icon(art)}<span>${name}</span></a>`).join('')}</nav><a class="campus-back" href="${c.url('index.html')}">スクールのトップへ ${c.arrow}</a></aside>
    <div class="campus-workspace"><header class="campus-page-head"><div><span class="eyebrow">YOUR LEARNING PLACE</span><h1>${title}</h1></div><label class="campus-course-picker">受講コースの<select id="learning-course"><option value="a" ${c.courseKey==='a'?'selected':''}>Webデザイン</option><option value="b" ${c.courseKey==='b'?'selected':''}>動画編集</option></select></label></header>
    ${body}</div></div></main>`;
}

const sectionHead=(eye,title,extra='')=>`<div class="campus-section-head"><div><p class="eyebrow">${eye}</p><h2>${title}</h2></div>${extra}</div>`;
const lessonRows=(c,active='')=>lessons.map(l=>`<a class="campus-lesson-row ${active===l.id?'is-current':''}" href="${c.url('classroom.html',{lesson:l.id})}" ${active===l.id?'aria-current="true"':''}><span class="campus-lesson-icon">${icon('play')}</span><span><small>教材 ${l.id.padStart(2,'0')}</small><b>${l.title}</b><span class="campus-lesson-note">${l.note}</span></span><span class="campus-lesson-status">${l.watch?`視聴記録 ${l.watch}%`:'未視聴'}<span aria-hidden="true"> ↗</span></span></a>`).join('');

function home(c){
  return `<section class="campus-resume"><div><span class="campus-kicker">学びの続きを、ここから。</span><p class="small">${c.course.name} ${badge}</p><h2>試しながら、<br>学んでみよう。</h2><p>前回の教材へ戻ったり、<br>気になるところを見直したり。<br>今日の一歩を、自分で選ぼう。</p>${link(c,'classroom.html','続きから学ぶ',{lesson:'2',resume:'1'},'button lime')}</div><figure><img src="assets/illustration-direction-v2.png" width="1536" height="1024" alt="机でノートを取りながら学ぶ女性のイメージ"><figcaption>学びのイメージ</figcaption></figure></section>
    <section class="campus-notice-strip"><span class="campus-icon">${icon('access')}</span><div><b>支援期間終了後の、利用状況のです。</b><p>教材は利用可能。新しい質問の受付範囲と、対象課題の継続は別に確認します。</p></div>${link(c,'usage.html','利用状況を見る')}</section>
    <section class="campus-section">${sectionHead('MY COURSE','コースと教材',link(c,'classroom.html','教材を開く'))}<p class="muted small">${c.course.name}。正式な教材・カリキュラムは準備中です。</p><div class="campus-lesson-list">${lessonRows(c)}</div></section>
    <section class="campus-section">${sectionHead('YOUR NEXT STEP','次に確かめたいこと。')}<div class="campus-next-grid"><a class="campus-next" href="${c.url('support.html',{case:'question'})}">${icon('talk')}<span><small>本人返答待ちの</small><h3>質問の返信を確認する</h3><p>気になっていたところを、担当者の返信例と一緒に。</p></span>${c.arrow}</a><a class="campus-next" href="${c.url('assignments.html',{task:'b'})}">${icon('task')}<span><small>要修正・継続相談</small><h3>課題のフィードバックを見る</h3><p>直したい点と、再提出の利用条件を確認します。</p></span>${c.arrow}</a></div></section>
    <section class="campus-section campus-reflection">${icon('progress')}<div><h2>割合だけでは、測れないことも。</h2><p>視聴した記録と、課題の評価は別々に。<br>修了は、管理者または指定担当者が最終確認します。</p></div>${link(c,'progress.html','学習記録を見る')}</section>`;
}

function classroom(c){
  const l=validLesson(c.params.get('lesson'));
  return `<div class="campus-classroom-grid"><section class="campus-player-area"><div class="campus-player-heading"><span class="example">教材 ${l.id.padStart(2,'0')}</span><h2>${l.title}</h2></div>
    <div class="campus-video-wrap"><video id="lesson-video" controls playsinline preload="metadata" poster="../shared/lesson-cover.svg" aria-label="教材動画"><source src="../shared/lesson-intro.webm" type="video/webm"><track kind="captions" src="../shared/lesson-intro.vtt" srclang="ja" label="日本語"></video></div>
    <p id="video-feedback" class="campus-feedback" role="status">自動再生はしません。再生位置・視聴記録の保存は行いません。</p><div class="campus-video-tools"><label>再生速度<select id="video-speed"><option value="0.75">0.75倍</option><option value="1" selected>1倍</option><option value="1.25">1.25倍</option><option value="1.5">1.5倍</option><option value="2">2倍</option></select></label><button type="button" class="campus-quiet-button" id="video-captions" aria-pressed="false">字幕を表示</button><button type="button" class="campus-quiet-button" id="video-restart">最初から見る</button></div>
    <div class="campus-video-under"><span>現在の位置 <b id="video-position">00:00</b></span></div>
    <div class="campus-lesson-help"><div><h3>気になったところは、その場から。</h3><p>質問に教材と再生位置を添えて、後から見返しやすく。</p></div><button type="button" class="button light" id="ask-from-video">この教材について質問 ${c.arrow}</button></div>
    <div class="campus-tabbar" role="tablist" aria-label="教材の補足"><button type="button" role="tab" aria-selected="true" id="tab-overview" aria-controls="panel-overview" data-lesson-tab="overview">この教材について</button><button type="button" role="tab" aria-selected="false" id="tab-materials" aria-controls="panel-materials" data-lesson-tab="materials" tabindex="-1">資料</button><button type="button" role="tab" aria-selected="false" id="tab-transcript" aria-controls="panel-transcript" data-lesson-tab="transcript" tabindex="-1">字幕・文字</button></div>
    <section class="campus-tab-panel" role="tabpanel" id="panel-overview" aria-labelledby="tab-overview"><h3>${l.note}</h3><p>動画を見て、気づいたことをメモする。自分の手で試して、分からないところを整理する。学びを行き来するための教材画面です。</p></section>
    <section class="campus-tab-panel" role="tabpanel" id="panel-materials" aria-labelledby="tab-materials" hidden><h3>学びのメモ</h3><p>見たこと、試したこと、次に確かめたいことを書き分ける短いメモです。</p><a class="campus-download" href="assets/learning-note-sample.txt" download>のメモ用テキストを開く ${c.arrow}</a></section>
    <section class="campus-tab-panel" role="tabpanel" id="panel-transcript" aria-labelledby="tab-transcript" hidden><h3>動画の字幕</h3></section>
    <div class="campus-next-lesson">${link(c,'classroom.html',l.id==='3'?'最初の教材を見直す':'次の教材へ',{lesson:l.id==='3'?'1':String(Number(l.id)+1)},'button light')}${link(c,'progress.html','学習記録へ')}</div></section>
    <aside class="campus-playlist"><p class="eyebrow">COURSE CONTENTS</p><h2>${c.course.name}</h2><p class="tiny muted">推奨順のです。</p><div>${lessonRows(c,l.id)}</div><p class="campus-playlist-note">視聴割合は記録のです。<br>課題の達成や修了とは別に確認します。</p>${link(c,'assignments.html','課題・評価へ')}</aside></div>`;
}

function progress(c){
  return `<section class="campus-section campus-section-first">${sectionHead('LEARNING RECORD','見た範囲と、学んだ時間。')}<p class="campus-lead">同じところを繰り返しても、前に進んだり、立ち止まったりしても。<br>記録は、自分の学びを振り返るために。</p><div class="campus-scenario"><label for="record-scenario">記録のを切り替え</label><select id="record-scenario"><option value="ready">記録を取得できた場合</option><option value="unsynced">未同期がある場合</option><option value="error">記録の取得に失敗した場合</option></select></div><div id="record-content" aria-live="polite"></div></section>
    <section class="campus-section"><div class="campus-split-copy"><div><p class="eyebrow">WHAT THE NUMBERS MEAN</p><h2>同じ40%でも、<br>学び方はいろいろ。</h2></div><div><p>10分の動画で、0〜2分と4〜6分を見たら、見た範囲は4分で40%。その4分を2倍速で見ると、実際に再生した時間は2分です。</p><p class="muted small">この説明は集計です。今回の短い動画の実測値ではありません。割合を理解度や修了認定として使いません。</p></div></div></section>
    <section class="campus-completion"><span class="campus-icon">${icon('task')}</span><div><span class="tag neutral">修了条件・記録と評価の確認待ち</span><h2>修了の確認は、一つずつ。</h2><ul><li>必要な学習条件：具体的な条件は確認待ち</li><li>課題・評価：受付済み分の評価待ち、要修正のあり</li><li>最終確認：管理者または指定担当者が確認して確定</li></ul></div>${link(c,'assignments.html','課題・評価を確認')}</section>`;
}

function support(c){
  return `<section class="campus-section campus-section-first">${sectionHead('QUESTIONS & SUPPORT','気になったことを、ここへ。')}<p class="campus-lead">教材のこと、進め方のこと。<br>やりとりを同じ場所に残して、学びに戻りやすく。</p><div class="campus-scenario"><label for="support-scenario">質問の受付状態の</label><select id="support-scenario"><option value="ended">支援終了後・受付範囲を確認中</option><option value="active">支援が有効な場合の手順</option></select></div><div id="support-scope" aria-live="polite"></div></section>
    <section id="new-question" class="campus-section section-anchor">${sectionHead('NEW QUESTION','新しく相談する')}<div id="question-compose"></div></section>
    <section class="campus-section">${sectionHead('YOUR CONVERSATIONS','これまでのやりとり')}<div class="campus-filters" aria-label="質問の状態で絞り込み"><button type="button" data-ticket-filter="all" aria-pressed="true">すべて</button><button type="button" data-ticket-filter="open" aria-pressed="false">対応が続いているもの</button><button type="button" data-ticket-filter="resolved" aria-pressed="false">解決したもの</button></div><div class="campus-support-grid"><div class="campus-ticket-list" id="ticket-list"></div><article class="campus-conversation" id="ticket-detail"></article></div></section>
    <p class="campus-footnote">通常の質問・課題・継続申請と、個別対応5回は別枠です。担当者から後日連絡する方針で、固定の回答日数・実際の通知方法は確認待ちです。</p>`;
}

function assignments(c){
  return `<section class="campus-section campus-section-first">${sectionHead('ASSIGNMENTS & FEEDBACK','取り組みも、振り返りも。')}<p class="campus-lead">提出することと、課題が達成できたことは別。<br>フィードバックを読み、次にすることを確かめます。</p><div class="campus-scenario"><label for="assignment-scenario">課題を切り替え</label><select id="assignment-scenario"><option value="current">新規受付終了・受付済み評価は継続</option><option value="active">条件設定済み・提出可能と仮定した手順</option><option value="unconfigured">課題・評価基準が確認中の場合</option></select></div><p class="small muted">課題ごとの締切なし。必要なら目標日を相談。有効な提出・評価期間、または対象課題の継続期間内の再提出は回数上限なしです。</p></section>
    <div class="campus-assignment-layout"><nav class="campus-task-list" id="assignment-list" aria-label="課題を選ぶ"></nav><section class="campus-task-detail" id="assignment-detail"></section></div>
    <section class="campus-section campus-reflection">${icon('access')}<div><h2>評価待ちは、そのまま待てます。</h2><p>有効な期間内に受付済みの提出は、通常期間の終了後も評価を続けます。評価待ちの継続に申請は不要です。</p></div>${link(c,'usage.html','利用条件を確認')}</section>`;
}

function usage(c){
  return `<section class="campus-section campus-section-first">${sectionHead('YOUR ACCESS','大切な条件を、見える場所に。')}<p class="campus-lead">教材を読めること。質問できること。課題を提出できること。<br>それぞれの利用状況を、分けて確認します。</p><div class="campus-scenario"><label for="usage-scenario">利用状況の組み合わせの</label><select id="usage-scenario"><option value="mixed">教材は利用可・支援終了・受付済み評価中</option><option value="unlimited">教材に明示した「期限なし」がある場合</option><option value="unset">利用条件が未設定・確認中の場合</option></select></div><div id="usage-content" aria-live="polite"></div></section>
    <section class="campus-section">${sectionHead('APPLICATION & PROFILE','登録・申込みの情報')}<dl class="fact-list"><div><dt>共通会員番号</dt><dd>LS-1001 ${badge}</dd></div><div><dt>氏名・メール</dt><dd>受講者AA／learner@example.invalid</dd></div><div><dt>選択コース</dt><dd>${c.course.name} ${badge}</dd></div><div><dt>申込みの紹介窓口</dt><dd>${c.via?`代理店${c.via==='a1'?'A1':'A'}（・帰属確認待ち）`:'共通サイト（直営）'}</dd></div></dl><p class="small muted" style="margin-top:16px">情報の訂正・利用終了の相談は共通窓口へ。ここでは本人情報や利用期間を変更しません。</p><div class="actions">${link(c,'support.html','利用条件について確認する',{kind:'usage'})}${link(c,'status.html','申込後の状況を見る')}</div></section>
    <section class="campus-section campus-split-copy"><div><p class="eyebrow">YOUR SUPPORT</p><h2>回数と、受付範囲を<br>混ぜないために。</h2></div><div><p>通常の質問と個別対応5回は別枠です。質問・課題・継続申請で、個別対応の回数を使いません。</p><p class="small muted">5回の具体的な内容・対象・期間・1回の単位は確認待ちです。この画面では利用残回数を創作しません。</p>${link(c,'guide.html','受講前の案内を読む')}</div></section>`;
}

export function renderCampusPage(c,page){return shell(c,page,{learn:home,classroom,progress,support,assignments,usage}[page](c));}

export function courseExtras(c){return `<section class="course-screen-preview"><span class="eyebrow">LEARNING</span><h3>学ぶ場所も、先に見てみよう。</h3><p>教材を見る場所、質問する場所、課題の振り返り。受講画面のを確認できます。</p><div class="actions">${link(c,'classroom.html','教材画面を見る',{lesson:'2'},'button light')}${link(c,'guide.html','はじめての方へ')}</div></section>`;}

export function guidePage(c){
  return `<main id="main" class="guide-page">${c.crumbs('はじめての方へ')}<header class="container guide-cover"><div><p class="eyebrow">YOUR FIRST STEP</p><h1>はじめる前の、<br>気になることを。</h1><p>どんなふうに学ぶのか。<br>何を確かめて申し込むのか。<br>最初の一歩を、一緒に見渡そう。</p></div><div class="guide-cover-note"><span>学ぶ → 試す → 振り返る</span><h2>自分の中に、<br>確かな軸を。</h2><p>学びを実践と仕事につなげ、その先の日常の選択肢を増やしていくことを目指します。</p>${link(c,'story.html','このスクールが生まれた理由')}</div></header>
    <nav class="container guide-anchor-nav" aria-label="はじめての方へ 目次"><a href="#guide-start">申込みから受講まで</a><a href="#guide-support">相談と利用条件</a><a href="#guide-faq">よくあるご質問</a></nav>
    <section id="guide-start" class="container section section-anchor">${sectionHead('GETTING STARTED','確認してから、はじめよう。')}<div class="guide-flow"><article>${icon('play')}<h3>コースを知る</h3><p>学ぶ内容、取り組み方、教材・支援・課題の利用条件を確認します。</p>${link(c,'courses.html','コースを見る')}</article><article>${icon('task')}<h3>本人が申し込む</h3><p>登録と本人入力、内容の確認へ。通常の登録に紹介や招待は不要です。</p>${link(c,'apply.html','申込画面を見る')}</article><article>${icon('access')}<h3>開始の案内を確認</h3><p>受付と開始は別。条件の未設定・例外は本部確認となり、利用可能になった後に学習へ進みます。</p>${link(c,'status.html','受付状況を見る')}</article></div></section>
    <section class="section-lavender guide-learning"><div class="container campus-split-copy"><div><p class="eyebrow">IN YOUR OWN PACE</p><h2>学ぶ場所を、<br>ひとつにつなぐ。</h2><p>動画から質問へ、返信から教材へ。<br>学習記録と課題の評価を、分けて見渡せます。</p>${link(c,'learn.html','受講画面を見る',{},'button')}</div><div class="guide-learning-links">${campusRoutes.slice(1).map(([key,name,art])=>`<a href="${c.url(key+'.html')}">${icon(art)}<span>${name}</span>${c.arrow}</a>`).join('')}</div></div></section>
    <section id="guide-support" class="container section section-anchor">${sectionHead('SUPPORT & CONDITIONS','続けるための、確認ごと。')}<div class="guide-conditions"><article><h3>質問は共通の窓口へ</h3><p>本人の有効な担当者がいれば担当者へ。担当がいなければ、本部の要対応として確認する方針です。担当者から後日連絡します。</p></article><article><h3>三つの利用期間は別々に</h3><p>教材閲覧、支援、課題提出と評価を別に確認します。支援終了だけで教材を止めず、受付済みの評価は完了まで対応します。</p></article><article><h3>個別対応5回は別枠</h3><p>通常の質問・課題・継続申請で回数を消化しません。5回の内容・期間・対象・1回の単位は準備中です。</p></article></div><div class="guide-preparation"><h3>正式なご案内に向けて確認中のこと</h3><p>コース名・教材・講師・課題基準、具体的な利用期間、料金の税区分・対象・適用条件、正式な規約と掲載情報は準備中です。</p>${link(c,'index.html#price-plan','料金の企画案を見る',{},'text-link')}</div></section>
    <section id="guide-faq" class="container section section-anchor guide-faq">${sectionHead('QUESTIONS & ANSWERS','よくあるご質問')}<div class="campus-filters" aria-label="質問の分類"><button type="button" data-faq-category="all" aria-pressed="true">すべて</button><button type="button" data-faq-category="start" aria-pressed="false">始め方</button><button type="button" data-faq-category="learn" aria-pressed="false">学習と評価</button><button type="button" data-faq-category="support" aria-pressed="false">相談と利用条件</button></div><p class="small muted" id="faq-count" role="status">${faqItems.length}件の質問</p><div class="faq">${faqItems.map(([category,q,a])=>`<details data-faq-item="${category}"><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section>
    <section class="container closing"><p class="eyebrow">YOUR NEXT STEP</p><h2>自分に合う学びを、<br class="guide-mobile-break">確かめよう。</h2><div class="actions">${link(c,'courses.html','学べる内容を見る',{},'button')}${link(c,'partners.html','紹介窓口を探す')}</div></section></main>`;
}
