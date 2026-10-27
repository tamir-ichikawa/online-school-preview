// M004: authored display fixtures, never real learner records or product conditions.
export const lessons = [
  {id:'1',title:'はじめの一歩',note:'学ぶ内容と、取り組み方を見渡す。',watch:100,position:'00:00',time:'5分00秒'},
  {id:'2',title:'試しながら、学んでみよう',note:'気づいたことを、自分の手で試してみる。',watch:40,position:'00:04',time:'2分00秒'},
  {id:'3',title:'学びを振り返る',note:'できたことと、次に確かめたいことを整理する。',watch:0,position:'00:00',time:'0分00秒'},
];
export const validLesson = value => lessons.find(l=>l.id===value) || lessons[1];
export const safeTime = value => {const n=Number(value);return Number.isFinite(n)&&n>=0&&n<=60?Math.floor(n):0;};
export const clock = seconds => `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
export const escapeHtml = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const icons = {
  home:'<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
  play:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m10 8 6 4-6 4Z"/>',
  progress:'<path d="M4 20h17M5 16v-4m6 4V8m6 8V4"/>',
  talk:'<path d="M3 4h18v13H9l-5 4v-4H3Z"/><path d="M7 9h10M7 13h6"/>',
  task:'<rect x="5" y="4" width="15" height="17" rx="2"/><path d="M9 4V2h7v2M9 11l2 2 5-5M9 17h7"/>',
  access:'<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M3 10h18M7 15h3m5 0h2M8 3v4m8-4v4"/>',
};
export const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.play}</svg>`;
export const campusRoutes = [
  ['learn','学習ホーム','home'],['classroom','教材と動画','play'],['progress','学習記録','progress'],
  ['support','質問・相談','talk'],['assignments','課題・評価','task'],['usage','利用状況','access'],
];
export const ticketFixtures = [
  {id:'question',title:'試した内容を、どう振り返ればよいですか？',kind:'教材の質問',status:'本人返答待ち',actor:'あなた',body:'教材を見ながら試してみました。次に何を振り返ればよいか相談したいです。',reply:'まずは、試したことと気づいたことを分けて書いてみましょう。どこで迷ったかも、一緒に教えてください。',lesson:'2'},
  {id:'technical',title:'動画の再生が止まるときの確認',kind:'再生・操作の不具合',status:'受付・担当確認中',actor:'本部',body:'動画の再生について、確認したいことがあります。',reply:'',lesson:'2'},
  {id:'resolved',title:'教材一覧への戻り方',kind:'操作方法',status:'解決',actor:'対応は完了しています',body:'教材一覧を開く場所を確認したいです。',reply:'「教材と動画」から一覧を開けます。同じ件をもう一度相談したいときは、この案件を再開できます。',lesson:'1'},
];
export const faqItems = [
  ['start','紹介や招待がなくても申し込めますか？','通常の本人登録に招待は不要です。共通サイトからも紹介窓口からも、本人が内容を確認して申し込む方針です。'],
  ['start','申込みの後、すぐに学習できますか？','受付と受講開始は別です。開始条件の確認結果を受付状況で案内します。条件が未設定の場合や例外は、本部が確認します。'],
  ['start','正式なコースや料金は決まっていますか？','正式なコース名・教材・講師・利用期間は準備中です。入会金0円／教材費98,000円（1コースごと）／月額9,800円は2026年10月18日の企画案で、税区分・対象・契約条件は確認待ちです。'],
  ['learn','どのように学習を進めますか？','動画を見る、自分の手で試す、気づきを振り返る、必要に応じて相談する流れです。具体的な教材・課題と、必須の学習順序は確認待ちです。'],
  ['learn','動画を最後まで見れば修了ですか？','動画の視聴記録と修了は別です。学習記録と課題等の評価を照合し、管理者または指定担当者が最終確認します。条件が未設定のまま自動で修了にはしません。'],
  ['learn','課題に締切や再提出の回数制限はありますか？','課題ごとの締切は設けず、必要なら目標日を相談する方針です。有効な提出・評価の利用期間や、承認された対象課題の継続期間内は、再提出の回数に上限を設けません。具体的な利用期間は確認待ちです。'],
  ['support','質問は誰に届きますか？','質問は共通受付に集まります。本人の有効な担当者がいれば担当者へ、いなければ要対応として本部が確認する設計です。質問全文を全職員へ公開する意味ではありません。'],
  ['support','返事はいつ届きますか？','担当者から後日連絡します。固定の営業日目安は設けていません。通知先・媒体・代行などの具体的な連絡体制は確認待ちです。'],
  ['support','通常の質問で個別対応5回を使いますか？','通常の質問・課題・継続申請で個別対応5回を消化しない方針です。5回の内容・形式・対象・期間・1回の数え方は別途検討します。'],
  ['support','支援の期間が終わると、教材も見られなくなりますか？','教材閲覧・支援・課題提出と評価の期間は別に管理します。支援の終了だけで教材を一律停止しません。利用可能な範囲は、それぞれの条件で確認します。'],
  ['learn','期間終了後に課題の評価が届いたら？','正当に受付済みの課題は評価完了まで対応します。要修正の場合は対象課題だけの再提出継続を確認します。申請だけで延長が承認されるわけではなく、条件・期間・承認者は確認待ちです。'],
];
