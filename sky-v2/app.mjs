import {initializeVisualHome} from './public-visual.mjs';
import {renderCampusPage,initializeCampus,campusPageKeys,guidePage,courseExtras} from './campus.mjs';
import {storyPage,initializeStoryNavigation} from './story.mjs';
import {skyHome} from './sky-home.mjs';
// M001 r1 / CP-20261022-01. Local display examples only; no storage or network writes.
const page = document.body.dataset.page;
const params = new URLSearchParams(location.search);
const partners = {
  a: { name: '代理店A', region: 'エリアA', note: '学びを検討する方のための窓口紹介文が入ります。' },
  a1: { name: '代理店A1', region: 'エリアB', note: '自分に合った学び方を探す方へ、窓口の案内が入ります。' },
};
const courses = {
  a: { name: 'コース表示例A', theme: '学んだことを、かたちに。', letter: 'A', topics: ['動画で考え方にふれる', '課題で学びを試してみる', '振り返り、次の一歩を考える'] },
  b: { name: 'コース表示例B', theme: '小さな発見から、はじめよう。', letter: 'B', topics: ['身近なテーマから学ぶ', '試したことを整理する', '自分の言葉で振り返る'] },
};
const courseKey = Object.hasOwn(courses, params.get('course')) ? params.get('course') : 'a';
const via = Object.hasOwn(partners, params.get('via')) ? params.get('via') : '';
const course = courses[courseKey];
const partnerName = via ? `${partners[via].name}（表示例）` : '共通サイト（直営）';
const url = (file, changes = {}, hash = '') => {
  const q = new URLSearchParams();
  const values = { course: courseKey, via, ...changes };
  for (const [key, value] of Object.entries(values)) if (value) q.set(key, value);
  return `${file}${q.size ? `?${q}` : ''}${hash ? `#${hash}` : ''}`;
};
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const brand = `<a class="brand sky-brand" href="${url('index.html')}" aria-label="オンラインスクール（仮称） トップへ"><span class="sky-brand-word">LITAXIA</span><span class="sky-brand-note">オンラインスクール · 名称未定</span></a>`;
const navItems = [
  ['courses.html', '学べること', 'courses'],
  ['index.html', '受講の流れ', '', 'flow'],
  ['story.html', '生まれた理由', 'story'],
  ['partners.html', '代理店を探す', 'partners'],
  ['learn.html', '受講中の方', 'learn'],
];
const navLinks = () => navItems.map(([file, label, current, hash]) => `<a href="${url(file, {}, hash)}" ${(current === page || (current==='learn'&&campusPageKeys.includes(page))) ? 'aria-current="page"' : ''} class="${file === 'learn.html' ? 'learn-link' : ''}">${label}</a>`).join('');
const reviewNav = [['index','トップ'],['guide','はじめての方へ'],['story','生まれた理由'],['courses','コース'],['partners','代理店'],['apply','本人申込'],['status','受付状況'],['learn','学習ホーム'],['classroom','教材と動画'],['progress','学習記録'],['support','質問・相談'],['assignments','課題・評価'],['usage','利用状況']].map(([file,label])=>`<a href="${url(file+'.html')}">${label}</a>`).join('');
const header = `<a class="skip" href="#main">本文へ移動</a><aside class="review-bar" aria-label="デザイン確認用"><div class="container review-inner"><span class="review-title"><span class="review-dot" aria-hidden="true"></span>デザイン確認用<span class="review-version">M008・見やすさ改善版</span></span><details id="review-nav"><summary>確認用ナビ</summary><div class="review-panel"><nav aria-label="確認用の画面一覧">${reviewNav}</nav><label for="route-scenario">経路の表示例<select id="route-scenario"><option value="">共通サイト（直営）</option><option value="a">一次代理店A</option><option value="a1">二次代理店A1</option></select></label><p>すべて架空の表示例です。申込・登録・通知は行いません。系列の切替は見え方の確認用です。</p><a href="../index.html">デザイン案一覧に戻る</a><a href="review.html">管理画面・改善版の確認へ</a></div></details></div></aside><header class="site-header"><div class="container header-inner">${brand}<nav class="desktop-nav" aria-label="メインナビゲーション">${navLinks()}</nav><button class="menu-toggle" type="button" aria-haspopup="dialog" aria-controls="mobile-menu" aria-expanded="false">メニュー <span aria-hidden="true">☰</span></button></div></header><dialog id="mobile-menu" class="mobile-menu" aria-label="サイトメニュー"><header><span class="small">オンラインスクール（仮称）</span><button class="menu-close" type="button">閉じる ×</button></header><nav aria-label="スマホメニュー">${navLinks()}<a href="${url('guide.html', {}, 'guide-faq')}">よくあるご質問</a></nav><p class="small muted">運営：LITAXIA<br>デザイン確認用の表示です。</p></dialog>`;
const footer = `<footer class="site-footer"><div class="container"><div class="footer-main"><div><p class="eyebrow">OUR MISSION</p><h2>自分の中に、確かな軸を。</h2><p class="small" style="margin-top:16px">オンラインスクール（仮称）<br>運営：LITAXIA</p></div><nav aria-label="フッターナビゲーション"><a href="${url('courses.html')}">学べること</a><a href="${url('partners.html')}">代理店を探す</a><a href="${url('guide.html', {}, 'guide-faq')}">よくあるご質問</a></nav></div><div class="footer-bottom"><p>M008 · 見やすさ改善の画面・内容確認用の張りぼて</p><p>名称・コース・商品条件・正式掲載情報は確認待ちです。</p></div></div></footer>`;
const modal = `<dialog class="modal" id="preview-dialog" aria-labelledby="dialog-title"><div class="modal-close-row"><span class="example">デザイン確認用・表示例</span><button class="modal-close" type="button">閉じる ×</button></div><div id="dialog-content"></div></dialog>`;
const crumbs = (label) => `<nav class="container crumbs" aria-label="パンくず"><a href="${url('index.html')}">トップ</a><span aria-hidden="true">/</span><span>${label}</span></nav>`;
const referral = () => `<div class="referral"><div class="container"><span>運営：LITAXIA</span><span aria-hidden="true">／</span><b>${via ? '今回の紹介窓口：' : 'お申込みの入口：'}${partnerName}</b>${via ? '<span class="example">紹介元候補</span>' : ''}</div></div>`;
const heading = (eye, title, lead) => `<div class="container page-heading"><p class="eyebrow">${eye}</p><h1>${title}</h1><p class="lead muted">${lead}</p></div>`;
const flowArt = (kind) => {
  const art = {
    learn: '<rect x="20" y="20" width="95" height="62" rx="8" fill="#e7f5fb" stroke="#25343d" stroke-width="2"/><path d="m61 38 23 14-23 14Z" fill="#25343d"/><path d="M8 86h122" stroke="#25343d" stroke-width="3"/><circle cx="122" cy="18" r="13" fill="#c8e7f4"/>',
    try: '<rect x="32" y="7" width="77" height="87" rx="4" fill="#e7f5fb" transform="rotate(8 32 7)"/><path d="m48 32 45 7m-48 8 33 5m-35 9 42 6" stroke="#7098a9" stroke-width="3"/><path d="m20 83 47-48 11 11-48 47-17 4Z" fill="#c8e7f4" stroke="#25343d" stroke-width="2"/>',
    talk: '<path d="M15 13h78v51H51L30 83V64H15Z" fill="#e7f5fb" stroke="#25343d" stroke-width="2"/><path d="M71 41h65v42h-12v14l-19-14H71Z" fill="#c8e7f4" stroke="#25343d" stroke-width="2"/><path d="M31 32h45M31 44h31m51 14h36" stroke="#25343d" stroke-width="3"/>',
  };
  return `<svg viewBox="0 0 150 105" fill="none" aria-hidden="true">${art[kind]}</svg>`;
};
const notebook = `<svg viewBox="0 0 280 260" fill="none" aria-hidden="true"><path d="M45 51h185v152H45z" fill="#fff" transform="rotate(-7 45 51)"/><rect x="47" y="32" width="175" height="175" rx="8" transform="rotate(6 47 32)" fill="#e7f5fb" stroke="#25343d" stroke-width="3"/><path d="m72 75 115 13M68 100l89 10M65 125l57 6" stroke="#8ab2c3" stroke-width="4"/><path d="m139 189 59-100 17 10-59 100-21 13Z" fill="#f0e1d4" stroke="#25343d" stroke-width="3"/><path d="m135 212 4-23 17 10Z" fill="#25343d"/><circle cx="224" cy="195" r="30" fill="#25343d"/><path d="m210 194 10 10 19-24" stroke="#c8e7f4" stroke-width="4"/><path d="m34 14 5 12m-13-4 15-5m190 22 7 16m-15-5 20-5" stroke="#25343d" stroke-width="3"/></svg>`;

function homePage(){return skyHome({url,arrow});}

function coursesPage() {
  return `<main id="main">${referral()}${crumbs('学べること')}${heading('COURSE PREVIEW','どんな学びに、出会おう。','学ぶこと、試すこと、相談すること。コースの内容と進め方を見ながら、自分に合う学びを考えます。')}<div class="container" style="padding-bottom:85px"><div class="notice" style="margin-bottom:30px">以下は画面構成を確認するためのコース表示例です。正式な開講・名称・教材・講師・利用条件は未確定です。</div><div class="course-select" aria-label="コースの表示例を選択">${Object.entries(courses).map(([key,c])=>`<button type="button" class="course-option" data-course="${key}" aria-pressed="${key === courseKey}"><span class="option-art" aria-hidden="true">${c.letter}</span><span><span class="example">表示例</span><h2>${c.name}</h2><span class="small">${c.theme}</span><span class="selection-note">${key === courseKey ? '選択中 ↓ 詳細は下へ' : 'このコースの詳細を見る →'}</span></span></button>`).join('')}</div><section id="course-detail" class="section-anchor" aria-labelledby="course-name"><div class="detail-heading"><div><span class="example">内容・カリキュラムともに表示例</span><h2 id="course-name">${course.name}</h2></div></div><div class="detail-layout"><div class="detail-article"><section><h3>${course.theme}</h3><p>動画で考え方にふれ、自分の手で試し、振り返る。学ぶ・試す・振り返るという、コースの進め方を確認する表示例です。</p><p class="small muted" style="margin-top:16px">この文章は構成確認用です。正式な学習内容や到達目標を約束するものではありません。</p></section><section><h3>学習内容のイメージ</h3><ol class="content-list">${course.topics.map((topic,i)=>`<li><span>${i+1}</span><div><b>${topic}</b><p class="small muted" style="margin-top:5px">教材・課題の表示例。具体的な内容は準備中です。</p></div></li>`).join('')}</ol></section><section><h3>学習の進め方</h3><p>学習ホームから教材へ。課題の取り組みと質問は、それぞれの入口で確認します。学習記録と課題の評価を照合し、修了は人が最終確認する方針です。</p></section>${courseExtras(campusContext)}<section><h3>利用条件</h3><dl class="fact-list"><div><dt>対象・講師・教材数</dt><dd>詳細準備中</dd></div><div><dt>教材・支援・課題の期間</dt><dd>それぞれ別に確認します。具体的な期間・起算は未確定です。</dd></div><div><dt>料金・契約条件</dt><dd>入会金0円／教材費98,000円（1コースごと）／月額会費9,800円は2026年10月18日の企画案です。税区分・適用範囲・契約条件は確認待ちで、正式な申込みは行いません。</dd></div></dl></section></div><aside class="course-aside"><div><span class="eyebrow">NEXT STEP</span><h3>内容を確認して、<br>本人申込へ。</h3><p class="small">選択したコースと${via ? '紹介窓口' : '共通サイトの経路'}を引き継ぎます。</p><p class="tiny muted">正式な商品条件は準備中です。サンプル情報で画面の流れを確認します。</p></div><a class="button" href="${url('apply.html')}">本人申込の例を見る ${arrow}</a></aside></div></section><div class="back-link"><a class="text-link" href="${url('partners.html')}">紹介窓口を探す ${arrow}</a></div></div></main>`;
}

function partnersPage() {
  return `<main id="main">${crumbs('代理店を探す')}${heading('FIND A CONNECTION','学びにつながる、窓口を。','地域や窓口名から探し、学べる内容の確認へ。どの窓口からも、本人のお申込みは共通サイトにつながります。')}<div class="container" style="padding-bottom:85px"><p class="notice" style="margin-bottom:28px">名称・地域・案内文はすべて架空の表示例です。実在する住所・連絡先・契約状態を表していません。</p><form class="search-panel" id="partner-search" role="search"><div class="field"><label for="partner-query">窓口名・キーワード</label><input id="partner-query" type="search" placeholder="例：代理店A1" autocomplete="off" maxlength="50"></div><div class="field"><label for="partner-region">地域の表示例</label><select id="partner-region"><option value="">すべての地域</option><option>エリアA</option><option>エリアB</option></select></div><button type="submit" class="button">探す <span aria-hidden="true">⌕</span></button></form><p class="results-count" id="results-count" aria-live="polite"></p><div class="partner-list" id="partner-results"></div><section id="partner-detail" class="partner-detail section-anchor" aria-labelledby="partner-detail-title" hidden></section><div class="back-link"><a class="text-link" href="${url('courses.html',{via:''})}">共通サイトからコースを見る ${arrow}</a></div></div></main>`;
}

function applyPage() {
  return `<main id="main">${referral()}${crumbs('本人申込の表示例')}${heading('APPLICATION PREVIEW','学びの一歩を、ここから。','本人登録から、内容確認、受付後の画面まで。サンプル情報でお申込みの流れをたどります。')}<div class="container narrow form-page"><ol class="steps" aria-label="申込の手順"><li class="active" data-step="0" aria-current="step"><span>1</span>本人登録の例</li><li data-step="1"><span>2</span>本人入力</li><li data-step="2"><span>3</span>内容確認</li></ol><div id="apply-stage"></div><p class="small muted" style="margin-top:22px">入力内容はこのページを開いている間だけの表示です。再読込・別ページへの移動でリセットされ、保存・送信されません。</p><div class="back-link"><a class="text-link" href="${url('courses.html')}">← コースの内容に戻る</a></div></div></main>`;
}
const stateData = {
  review: { tag:'本部確認中', icon:'…', title:'お申込みの内容を確認しています。', message:'受付後は本部の確認を待ちます。受付が済んだことと、受講を開始できることは別の状態です。', actor:'本部', next:'内容と開始条件を確認しています。今は追加の操作はありません。' },
  unset: { tag:'開始条件の設定確認中', icon:'…', title:'開始条件を確認しています。', message:'条件が未設定のため、本部での確認が必要です。設定されていないことから、利用可能・期限なしとは判断しません。', actor:'本部', next:'適用する開始条件の確認を待っています。' },
  additional: { tag:'追加確認', icon:'?', title:'確認していただきたいことがあります。', message:'申告内容について、追加の確認がある場合の表示例です。実際の回答や情報送信は行いません。', actor:'ご本人', next:'確認内容を開き、回答の表示例をご覧ください。' },
  scheduled: { tag:'開始予定', icon:'◷', title:'受講開始の案内をお待ちください。', message:'開始予定の表示例です。実際の開始日・開始条件は未確定のため、この画面では日付を設定しません。', actor:'本部', next:'開始案内を待ちます。開始予定だけでは教材は利用可能になりません。' },
  available: { tag:'利用可能', icon:'✓', title:'学習ホームへ進めます。', message:'開始に必要な条件を満たし、教材を利用できる場合の表示例です。実際の利用権の付与・承認は行っていません。', actor:'ご本人', next:'学習ホームから教材や利用状況を確認できます。' },
  cancelled: { tag:'キャンセル', icon:'−', title:'この申込みはキャンセルの表示例です。', message:'開始前に取り消した場合の見え方です。実際の申込みや利用権を変更する処理はありません。', actor:'対応不要', next:'学びを検討する場合は、コースの案内へ戻れます。' },
};
function statusPage() {
  return `<main id="main">${referral()}${crumbs('お申込みの状況')}${heading('APPLICATION STATUS','今の状況と、次の一歩。','お申込みの受付、確認、受講開始。それぞれの状態と、次に対応する人を確認します。')}<div class="container narrow form-page"><div class="status-tools"><label for="status-scenario">確認用：受付後の状態を切り替える</label><select id="status-scenario">${Object.entries(stateData).map(([key,data])=>`<option value="${key}">${data.tag}の例</option>`).join('')}</select></div><section class="status-card" id="status-content" aria-live="polite"></section><div class="status-actions"><a class="text-link" href="${url('apply.html')}">入力画面の例に戻る</a><button type="button" data-modal="contact">本部への連絡の例を見る</button><button type="button" id="cancel-preview">開始前キャンセルの例を見る</button></div></div></main>`;
}

function learnPage() { return renderCampusPage(campusContext,'learn'); }

const campusContext={url,crumbs,arrow,course,courseKey,courses,via,params};
const renderers = {guide:()=>guidePage(campusContext),...Object.fromEntries(campusPageKeys.filter(key=>key!=='learn').map(key=>[key,()=>renderCampusPage(campusContext,key)])),home:homePage,story:()=>storyPage({url,crumbs,arrow}),courses:coursesPage,partners:partnersPage,apply:applyPage,status:statusPage,learn:learnPage};
document.querySelector('#app').innerHTML = header + renderers[page]() + footer + modal;
initializeVisualHome();
document.querySelector('#route-scenario').value = via;
document.querySelector('#route-scenario').addEventListener('change', event => { location.href = url(location.pathname.split('/').pop(), {via:event.target.value}); });
const reviewDetails = document.querySelector('#review-nav');
reviewDetails.addEventListener('keydown', e => { if(e.key === 'Escape'){reviewDetails.open=false;reviewDetails.querySelector('summary').focus();} });
document.addEventListener('click', e => { if(!reviewDetails.contains(e.target)) reviewDetails.open=false; });
const menu = document.querySelector('#mobile-menu');
const menuButton = document.querySelector('.menu-toggle');
menuButton.addEventListener('click',()=>{menu.showModal();menuButton.setAttribute('aria-expanded','true');});
menu.querySelector('.menu-close').addEventListener('click',()=>menu.close());
menu.addEventListener('close',()=>{menuButton.setAttribute('aria-expanded','false');menuButton.focus({preventScroll:true});});
menu.addEventListener('click',e=>{if(e.target===menu && e.clientX < menu.getBoundingClientRect().left) menu.close();});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.close()));
matchMedia('(min-width:960px)').addEventListener('change',e=>{if(e.matches && menu.open) menu.close();});
const dialog = document.querySelector('#preview-dialog');
// Keep keyboard traversal inside either open dialog, including backward traversal.
for (const panel of [menu, dialog]) panel.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const targets = [...panel.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),video[controls],[tabindex]:not([tabindex="-1"])')].filter(el => el.getClientRects().length > 0);
  const first = targets[0], last = targets.at(-1);
  if (!first) { e.preventDefault(); return; }
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
let dialogTrigger;
const closeDialog = () => dialog.close();
dialog.querySelector('.modal-close').addEventListener('click',closeDialog);
dialog.addEventListener('close',()=>{dialog.querySelector('video')?.pause();dialogTrigger?.focus({preventScroll:true});});
dialog.addEventListener('click',e=>{if(e.target === dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
function openDialog(content, trigger) {
  dialogTrigger = trigger || document.activeElement;
  document.querySelector('#dialog-content').innerHTML = content;
  dialog.showModal();
}
const modalContents = {
  video: `<h2 id="dialog-title">動画・教材のプレビュー</h2><p>これは本案件の自作サンプル動画です。正式な教材・学習記録・保護配信の機能ではありません。</p><video controls playsinline preload="metadata" poster="../assets/poster.svg" aria-label="自作サンプル動画"><source src="../assets/sample.webm" type="video/webm"><track kind="captions" src="../assets/sample.vtt" srclang="ja" label="日本語" default></video><div class="preview-position">前回の位置：表示例<div class="progress-track"><span></span></div><span class="tiny">再生・停止・字幕を確認できます。視聴記録は保存しません。</span></div><div class="actions"><button type="button" class="button light" data-modal="support">この教材について質問する ${arrow}</button></div>`,
  support: `<h2 id="dialog-title">質問・相談の共通受付</h2><span class="tag">受付範囲・担当確認中</span><p style="margin-top:20px">利用状況の例では支援が終了しています。終了後の質問を受け付ける範囲は未確定のため、ここでは受付完了に進みません。</p><dl class="fact-list"><div><dt>次に対応する人</dt><dd>本部（受付範囲と担当の確認）</dd></div><div><dt>担当の案内</dt><dd>有効な担当者がいれば担当者へ、いなければ要対応として確認する設計です。</dd></div><div><dt>回答について</dt><dd>担当者から後日連絡します。具体的な連絡体制・通知方法は確認待ちです。</dd></div></dl><p class="notice">通常の質問と個別対応5回は別枠です。ここから回数を消化することはありません。共通受付は質問全文を全職員へ公開する意味ではありません。</p>`,
  assignments: `<h2 id="dialog-title">課題・評価の入口</h2><p>課題の提出・評価・継続承認の詳細操作は、次の視覚確認単位で扱います。今回の画面は状態と入口の表示例までです。</p><dl class="fact-list"><div><dt>課題の表示例A</dt><dd>評価待ち。正当に受け付けた提出は、通常期間終了後も評価完了まで対応します。継続申請は不要です。</dd></div><div><dt>課題の表示例B</dt><dd>要修正・継続確認中。対象課題の再提出が可能か確認中で、承認済み・再提出可能とは表しません。</dd></div><div><dt>修了</dt><dd>管理者または指定担当者が最終確認します。視聴100%や受付だけで修了しません。</dd></div></dl>`,
  usage: `<h2 id="dialog-title">利用条件を確認する</h2><p>教材閲覧・支援・課題提出と評価は、それぞれ別の利用状態を持ちます。支援終了だけで教材を止めず、受付済み評価は完了まで対応します。</p><dl class="fact-list"><div><dt>利用期間</dt><dd>期限あり／明示した期限なし／未設定を区別します。具体的な日付・起算は確認待ちです。</dd></div><div><dt>再提出</dt><dd>要修正となった対象課題だけ継続を確認します。期間・許可条件・承認者は未確定です。</dd></div><div><dt>終了後の支援</dt><dd>質問の受付範囲・履歴の表示と保存期間は確認待ちです。</dd></div></dl>`,
  contact: `<h2 id="dialog-title">本部への連絡</h2><p>現在の状況や条件について確認する入口の表示例です。この試作からの連絡・外部送信は行いません。</p><p class="notice">実際の連絡先・受付媒体・担当体制は確認待ちです。</p>`,
  additional: `<h2 id="dialog-title">追加確認の表示例</h2><p>利用区分について確認が必要な場合の例です。回答内容はサンプル固定で、申告だけで利用条件や料金は確定しません。</p><p class="notice">回答例：利用区分について相談したいです。</p><div class="actions"><button type="button" class="button" id="additional-answer">回答後の確認待ちを見る ${arrow}</button></div>`,
};
document.addEventListener('click',e=>{const button=e.target.closest('[data-modal]');if(button){if(dialog.open) dialog.querySelector('video')?.pause();const content=modalContents[button.dataset.modal];if(content){if(dialog.open){document.querySelector('#dialog-content').innerHTML=content;dialog.querySelector('.modal-close').focus();}else openDialog(content,button);}}});

if(page === 'courses') document.querySelectorAll('[data-course]').forEach(button=>button.addEventListener('click',()=>{location.href=url('courses.html',{course:button.dataset.course},'course-detail');}));

if(page === 'partners') {
  const form = document.querySelector('#partner-search');
  const results = document.querySelector('#partner-results');
  const detail = document.querySelector('#partner-detail');
  function showDetail(key, focus=false){
    const p=partners[key];
    detail.hidden=false;
    detail.innerHTML=`<div class="detail-heading"><div><p class="eyebrow">PARTNER PREVIEW</p><h2 id="partner-detail-title" tabindex="-1">${p.name}</h2></div><span class="example">窓口の詳細・表示例</span></div><p>${p.note}正式な案内内容は準備中です。</p><dl class="fact-list"><div><dt>運営元</dt><dd>LITAXIA</dd></div><div><dt>今回の紹介窓口</dt><dd>${p.name}（表示例）</dd></div><div><dt>地域・対応</dt><dd>${p.region}・オンライン（表示例）</dd></div><div><dt>対象コース・受付条件</dt><dd>コース表示例A・B。正式な商品条件は準備中です。</dd></div></dl><div class="actions"><a class="button" href="${url('courses.html',{via:key})}">この窓口からコースを見る ${arrow}</a><button type="button" class="button light" id="close-partner-detail">一覧に戻る ↑</button></div>`;
    document.querySelector('#close-partner-detail').addEventListener('click',()=>{detail.hidden=true;history.replaceState(null,'',url('partners.html'));results.querySelector(`[data-partner="${key}"]`)?.focus();});
    if(focus){detail.scrollIntoView({block:'start'});document.querySelector('#partner-detail-title').focus({preventScroll:true});}
  }
  function renderResults(){
    const term = document.querySelector('#partner-query').value.trim().toLowerCase();
    const region=document.querySelector('#partner-region').value;
    const entries=Object.entries(partners).filter(([,p])=>(`${p.name} ${p.region} オンライン`.toLowerCase().includes(term))&&(!region||p.region===region));
    document.querySelector('#results-count').textContent=`${entries.length}件の窓口が見つかりました（表示例）`;
    detail.hidden=true;
    results.innerHTML=entries.length?entries.map(([key,p])=>`<article class="partner-card"><span class="example">架空の窓口・表示例</span><h2>${p.name}</h2><div class="partner-meta"><span>${p.region}</span><span>オンラインの案内例</span></div><p>${p.note}<br>実在の窓口・契約状態を示すものではありません。</p><button class="edit-button" type="button" data-partner="${key}">窓口の詳細を見る ↗</button></article>`).join(''):`<div class="empty-state"><h2>該当する窓口がありません。</h2><p class="small muted">キーワードや地域を変えて、もう一度お試しください。</p><button type="button" class="button light" id="reset-search">検索条件をリセット</button></div>`;
    results.querySelectorAll('[data-partner]').forEach(b=>b.addEventListener('click',()=>{history.replaceState(null,'',url('partners.html',{via:b.dataset.partner},'partner-detail'));showDetail(b.dataset.partner,true);}));
    document.querySelector('#reset-search')?.addEventListener('click',()=>{form.reset();renderResults();document.querySelector('#partner-query').focus();});
  }
  form.addEventListener('submit',e=>{e.preventDefault();renderResults();});
  renderResults();
  if(via) showDetail(via);
}

if(page === 'apply') {
  const stage=document.querySelector('#apply-stage');
  const data={name:'サンプル受講者',start:'準備ができ次第',usage:'分からない・相談',note:''};
  function markStep(step){document.querySelectorAll('[data-step]').forEach(li=>{const active=Number(li.dataset.step)===step;li.classList.toggle('active',active);if(active)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});}
  function focusStage(){stage.querySelector('h2').focus({preventScroll:true});stage.scrollIntoView({block:'start'});}
  function showRegistration(){
    markStep(0);
    stage.innerHTML=`<section class="form-panel"><h2 tabindex="-1">本人登録の表示例</h2><p class="form-intro">サンプルのメールで、確認待ちと確認完了の見え方を確認します。実際の情報は入力しないでください。</p><div class="field"><label for="sample-email">メールアドレス（サンプル固定）</label><input id="sample-email" type="email" value="learner@example.invalid" readonly autocomplete="off"><span class="help">このアドレスへの送信・登録は行いません。</span></div><div class="actions"><button class="button" type="button" id="show-mail-wait">確認待ちの表示を見る ${arrow}</button></div><div id="email-state" aria-live="polite"></div><button type="button" class="edit-button" id="existing-member" style="margin-top:20px">既存会員の表示例で進む →</button><p class="notice">通常登録に招待は不要です。共通ID・会員番号は自動表示の例とし、本人や代理店の手入力欄は設けません。</p></section>`;
    document.querySelector('#show-mail-wait').addEventListener('click',()=>{
      document.querySelector('#show-mail-wait').hidden=true;
      document.querySelector('#email-state').innerHTML=`<section class="email-wait"><span class="tag">確認待ちの表示例</span><h3 style="margin-top:15px">メール確認を待っています。</h3><p>確認リンクを開く場面の表示例です。メールは送信されません。</p><div class="actions"><button class="button" type="button" id="confirm-email">確認済みの例へ進む ${arrow}</button></div></section>`;
      document.querySelector('#confirm-email').addEventListener('click',()=>showInput());
      document.querySelector('#confirm-email').focus();
    });
    document.querySelector('#existing-member').addEventListener('click',()=>showInput(true));
  }
  function showInput(existing=false){
    markStep(1);
    stage.innerHTML=`<section class="form-panel"><h2 tabindex="-1">本人入力</h2><p class="form-intro">サンプル情報で、入力欄と確認画面の見え方を確認します。正式な利用条件は準備中です。</p><div class="sample-id"><span>${existing?'既存会員の表示例':'メール確認済みの表示例'}</span><strong>共通会員番号：DEMO-0001</strong><span>自動発行の表示例</span></div><form id="application-form" novalidate><p class="field-error" id="form-error" role="alert" hidden></p><div class="form-fields"><div class="field"><label for="sample-name">氏名の表示例<span class="required">必須</span></label><input id="sample-name" name="sampleName" required pattern="サンプル受講者[A-ZＡ-Ｚ]?" maxlength="12" autocomplete="off" aria-describedby="name-help form-error"><span class="help" id="name-help">「サンプル受講者」または「サンプル受講者B」で確認してください。実名は入力しないでください。</span></div><div class="field"><label for="confirmed-email">メールアドレス</label><input id="confirmed-email" type="email" value="learner@example.invalid" readonly autocomplete="off"></div><div class="field"><span class="field-label">選択したコース</span><p>${course.name} <span class="example">表示例</span></p><a href="${url('courses.html')}" class="small text-link">コースを選び直す →</a></div><div class="field"><label for="start-wish">開始希望（表示例・任意）</label><select id="start-wish" name="startWish"><option>準備ができ次第</option><option>希望日を相談したい</option><option>相談したい</option></select><span class="help">開始日は確約されません。</span></div><div class="field"><label for="usage-type">利用区分の申告（表示例・任意）</label><select id="usage-type" name="usageType"><option>分からない・相談</option><option>一般受講</option><option>就労支援経由</option></select><span class="help">区分の申告と確認結果は別です。料金・利用権は確定しません。</span></div><div class="field"><span class="field-label">紹介窓口の自動表示</span><p>${partnerName}${via?' <span class="example">紹介元候補</span>':''}</p><label for="referral-check" class="small">窓口の認識（サンプル）</label><select id="referral-check"><option>表示どおり</option><option>違う・分からない（本部確認）</option></select><span class="help">相違があれば本部の確認対象にする設計です。紹介の帰属をここで確定しません。</span></div><div class="field"><label for="sample-note">任意補足（サンプル文のみ）</label><textarea id="sample-note" rows="2" readonly autocomplete="off" placeholder="補足なし"></textarea><button type="button" class="edit-button" id="sample-note-toggle" style="align-self:start">補足のサンプル文を入れる</button></div></div><div class="actions"><button class="button" type="submit">入力内容を確認する ${arrow}</button><button class="button light" type="button" id="back-registration">登録の例に戻る</button></div></form></section>`;
    const name=document.querySelector('#sample-name');name.value=data.name;
    document.querySelector('#start-wish').value=data.start;
    document.querySelector('#usage-type').value=data.usage;
    document.querySelector('#sample-note').value=data.note;
    document.querySelector('#referral-check').value=data.referralCheck||'表示どおり';
    document.querySelector('#sample-note-toggle').addEventListener('click',e=>{const field=document.querySelector('#sample-note');field.value=field.value?'':'学び方について相談したいです。（表示例）';e.target.textContent=field.value?'補足のサンプル文を外す':'補足のサンプル文を入れる';});
    document.querySelector('#back-registration').addEventListener('click',()=>{showRegistration();focusStage();});
    document.querySelector('#application-form').addEventListener('submit',e=>{
      e.preventDefault();const error=document.querySelector('#form-error');
      if(!name.validity.valid){error.hidden=false;error.textContent=name.value?'氏名は指定のサンプル値を入力してください。':'氏名の表示例を入力してください。';name.setAttribute('aria-invalid','true');name.focus();return;}
      name.removeAttribute('aria-invalid');
      Object.assign(data,{name:name.value,start:document.querySelector('#start-wish').value,usage:document.querySelector('#usage-type').value,note:document.querySelector('#sample-note').value,referralCheck:document.querySelector('#referral-check').value});
      showConfirmation();
    });
    focusStage();
  }
  function showConfirmation(){
    markStep(2);
    stage.innerHTML=`<section class="form-panel"><h2 tabindex="-1">入力内容を確認する</h2><p class="form-intro">表示例の内容を確認します。正式な規約への同意・契約・申込みは行いません。</p><span class="example">すべてサンプル情報</span><dl class="fact-list"><div><dt>氏名</dt><dd id="confirm-name"></dd></div><div><dt>メール</dt><dd>learner@example.invalid</dd></div><div><dt>共通会員番号</dt><dd>DEMO-0001（自動表示の例）</dd></div><div><dt>選択コース</dt><dd>${course.name}</dd></div><div><dt>開始希望</dt><dd id="confirm-start"></dd></div><div><dt>利用区分の申告</dt><dd id="confirm-usage"></dd></div><div><dt>紹介窓口</dt><dd>${partnerName}${via?'（候補・確認待ち）':''}</dd></div><div><dt>窓口の認識</dt><dd id="confirm-referral"></dd></div><div><dt>任意補足</dt><dd id="confirm-note"></dd></div><div><dt>商品・契約条件</dt><dd>詳細準備中。正式申込の条件ではありません。</dd></div></dl><p class="notice">次は「受付後の画面の例」を開きます。初期状態は本部確認中で、受講開始にはなりません。サンプル入力値は次のページに保存・転送しません。</p><div class="actions"><a class="button" href="${url('status.html')}">受付後の画面を見る ${arrow}</a><button class="button light" type="button" id="edit-input">戻って修正する</button></div></section>`;
    for(const [id,value] of Object.entries({'confirm-name':data.name,'confirm-start':data.start,'confirm-usage':data.usage,'confirm-referral':data.referralCheck,'confirm-note':data.note||'補足なし'})) document.getElementById(id).textContent=value;
    document.querySelector('#edit-input').addEventListener('click',()=>showInput());focusStage();
  }
  showRegistration();
}

if(page === 'status') {
  const select=document.querySelector('#status-scenario');
  function showState(key){
    const s=stateData[key];select.value=key;
    document.querySelector('#status-content').innerHTML=`<span class="example">受付番号：DEMO-APP-001（表示例）</span><div class="status-main"><span class="status-symbol" aria-hidden="true">${s.icon}</span><div><span class="tag ${key==='available'?'lime':''}">${s.tag}</span><h2 style="margin-top:16px">${s.title}</h2><p>${s.message}</p></div></div><div class="next-action"><h3>次に対応する人：${s.actor}</h3><p>${s.next}</p>${key==='available'?`<div class="actions"><a class="button" href="${url('learn.html')}">学習ホームへ ${arrow}</a></div>`:key==='additional'?`<div class="actions"><button class="button" type="button" data-modal="additional">追加確認の内容を見る ${arrow}</button></div>`:key==='cancelled'?`<div class="actions"><a class="button light" href="${url('courses.html')}">コースの案内に戻る ${arrow}</a></div>`:''}</div><dl class="fact-list"><div><dt>選択コース</dt><dd>${course.name}（表示例）</dd></div><div><dt>紹介窓口</dt><dd>${partnerName}</dd></div><div><dt>開始条件・利用期間</dt><dd>確認待ち。未設定を利用可能・期限なしとは扱いません。</dd></div></dl><ol class="status-history" aria-label="手続きの表示例"><li>本人入力の例</li><li>内容確認の例</li><li>${key==='cancelled'?'キャンセルの例':'受付後の表示例'}</li></ol>`;
    document.querySelector('#cancel-preview').hidden=key==='cancelled'||key==='available';
  }
  select.addEventListener('change',()=>showState(select.value));
  document.querySelector('#cancel-preview').addEventListener('click',e=>{openDialog(`<h2 id="dialog-title">開始前キャンセルの表示例</h2><p>この申込みを開始前に取り消した場合の画面を確認します。実際のキャンセルや保存は行いません。</p><div class="actions"><button type="button" class="button" id="confirm-cancel">キャンセル後の例を見る</button><button type="button" class="button light" id="keep-application">状況画面に戻る</button></div>`,e.target);document.querySelector('#confirm-cancel').addEventListener('click',()=>{dialog.close();showState('cancelled');document.querySelector('#status-content h2').tabIndex=-1;document.querySelector('#status-content h2').focus();});document.querySelector('#keep-application').addEventListener('click',closeDialog);});
  document.addEventListener('click',e=>{if(e.target.closest('#additional-answer')){dialog.close();showState('review');select.focus();}});
  showState('review');
}

if(campusPageKeys.includes(page)||page==='guide') initializeCampus(campusContext,page);

if(page === 'story') initializeStoryNavigation();
