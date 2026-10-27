export const roles={
 hq:{label:'本部',name:'運営担当の表示例',scope:'申込・支援・教材',home:'hq.html',nav:[['hq.html','対応ダッシュボード','grid'],['hq-applications.html','申込・条件確認','inbox'],['hq-learners.html','受講者・修了確認','users'],['hq-inbox.html','共通受付','chat'],['hq-content.html','教材・課題条件','book'],['hq-partners.html','代理店・担当設定','network']]},
 partner:{label:'代理店',name:'代理店A1（架空）',scope:'自店の紹介・集計',home:'partner.html',nav:[['partner.html','ホーム','grid'],['partner-links.html','紹介リンク・素材','link'],['partner-analytics.html','自店の集計','chart'],['partner-contact.html','本部への連絡','chat']]},
 teacher:{label:'講師',name:'担当講師の表示例',scope:'割当済みの受講者・案件',home:'teacher.html',nav:[['teacher.html','対応ダッシュボード','grid'],['teacher-learners.html','担当受講者','users'],['teacher-inbox.html','担当の質問','chat'],['teacher-reviews.html','課題の評価','check'],['teacher-materials.html','担当教材','book']]}
};
export const routes={
 'hq.html':['hq','対応を、見渡す。','未設定・未割当・確認待ちから、次の操作へ。'],
 'hq-applications.html':['hq','申込から、学びへ。','受付と受講開始を、別の状態で確認します。'],
 'hq-learners.html':['hq','一人ずつの、今。','学習・利用期間・修了確認を見渡します。'],
 'hq-inbox.html':['hq','必要な人へ、つなぐ。','本人への連絡と、運営の判断を分けます。'],
 'hq-content.html':['hq','学びを、整える。','教材・対象・条件を確認して、公開の準備へ。'],
 'hq-partners.html':['hq','つながりと、担当。','紹介の系列と支援・評価の割当を別に管理します。'],
 'partner.html':['partner','学びへの入口を、届ける。','紹介する・振り返る・本部に相談する。'],
 'partner-links.html':['partner','あなたの窓口から。','許可されたコースの紹介URLを組み立てます。'],
 'partner-analytics.html':['partner','紹介の動きを、知る。','自店の直接紹介だけを集計する表示例です。'],
 'partner-contact.html':['partner','本部へ、ひとつにつなぐ。','掲載情報や業務範囲について確認します。'],
 'teacher.html':['teacher','次の一歩を、支える。','担当の質問・評価・教材を、ここから。'],
 'teacher-learners.html':['teacher','担当する学びを、見渡す。','割当済みの受講者・コースだけの表示例です。'],
 'teacher-inbox.html':['teacher','迷いに、一緒に向き合う。','自分に割り当てられた質問を確認します。'],
 'teacher-reviews.html':['teacher','できたことを、言葉に。','項目ごとの達成判定とフィードバック。'],
 'teacher-materials.html':['teacher','教える前に、確かめる。','担当教材の参照と、改善の連絡へ。']
};
export const applications=[
 {id:'AP-101',name:'申込者A',course:'コース表示例A',state:'開始条件未設定',group:'確認が必要',kind:'warn',reason:'開始条件のルールが未設定',next:'本部が条件を確認',via:'共通サイト',pct:0},
 {id:'AP-102',name:'申込者B',course:'コース表示例B',state:'紹介元の確認中',group:'確認が必要',kind:'warn',reason:'紹介元候補の競合',next:'帰属確認の担当',via:'代理店A1／候補',pct:0},
 {id:'AP-103',name:'申込者C',course:'コース表示例A',state:'開始予定',group:'開始予定',kind:'sky',reason:'開始日・条件の具体値は確認待ち',next:'本部が開始案内を確認',via:'代理店A1／表示例',pct:40},
 {id:'AP-104',name:'申込者D',course:'コース表示例A',state:'利用可能',group:'利用可能',kind:'good',reason:'開始条件を満たしたと仮定した例',next:'申込者が教材へ',via:'共通サイト',pct:100}
];
export const people=[
 {name:'受講者A',id:'DEMO-001',course:'コース表示例A',watch:60,tasks:'評価待ち',access:'教材：期限なしの例',state:'学習中'},
 {name:'受講者B',id:'DEMO-002',course:'コース表示例B',watch:40,tasks:'要修正・継続確認',access:'教材：期間確認中',state:'条件確認中'},
 {name:'受講者C',id:'DEMO-003',course:'コース表示例A',watch:80,tasks:'取り組み中',access:'教材：期限ありの例',state:'学習中'},
 {name:'受講者D',id:'DEMO-004',course:'コース表示例A',watch:100,tasks:'必須項目達成の例',access:'教材：期間確認中',state:'修了候補'}
];
export const tickets=[
 {id:'Q-201',name:'受講者A',title:'試した内容を、どう振り返ればよいですか？',type:'教材の質問',state:'対応中',assign:'担当講師の例',next:'担当者が返信',teacher:true},
 {id:'Q-202',name:'受講者B',title:'動画の再生が止まるときの確認',type:'操作の相談',state:'担当確認中',assign:'未割当',next:'本部が担当を確認',teacher:false},
 {id:'Q-203',name:'受講者C',title:'学習の進め方を相談したい',type:'学習の相談',state:'引継ぎ待ち',assign:'担当講師の例 → 本部確認',next:'本部が引継ぎ先を確認',teacher:true},
 {id:'Q-204',name:'受講者B',title:'課題Bの再提出を続けたい',type:'継続申請',state:'運営側確認待ち',assign:'確認担当の設定待ち',next:'運営が期間・承認権限を確認',teacher:false}
];
export const periods={oct:{label:'2026年10月1日〜22日',applications:8,registrations:6,review:3,scheduled:1,active:3,cancelled:1,media:[4,3,1]},sep:{label:'2026年9月1日〜30日',applications:6,registrations:5,review:2,scheduled:1,active:2,cancelled:1,media:[3,2,1]}};
