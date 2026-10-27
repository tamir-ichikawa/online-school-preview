import { founderOriginal } from './story-original.mjs';

const escape = text => text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const image = (name,alt,extra='') => `<img src="assets/comic-v2/${name}.png" alt="${alt}" width="1536" height="1024" loading="${name==='memory'?'eager':'lazy'}" ${extra}>`;

export function comicPage({url,crumbs,arrow}) {
  const originalHtml=founderOriginal.split(/\r?\n\s*\r?\n/).map(block=>block.trim()==='---'?'<hr>':block.startsWith('### ')?`<h3>${escape(block.slice(4))}</h3>`:`<p>${escape(block).replaceAll('\n','<br>')}</p>`).join('');
  return `<main id="main" class="manga-page">${crumbs('このスクールが生まれた理由')}
  <header class="manga-intro container">
    <h1>このスクールが生まれた理由</h1>
    <p class="manga-cover-title">特別な人生じゃなくていい。<br>大切なものを、<span>大切にできる人生を。</span></p>
    <p class="manga-intro-note">創設者の提供原文をもとにした漫画です。人物・場面はイメージとして描いています。</p>
    <a href="#story-original" class="manga-original-link">原文を読む <span aria-hidden="true">↓</span></a>
  </header>
  <article class="manga-book" aria-label="創設者の想いをたどる漫画">
    <section class="manga-memory" aria-label="子どもの頃の記憶">
      <figure class="manga-memory-panel manga-panel">
        ${image('memory','夜勤に出る母を、叔母と一緒に見送る幼い女の子','fetchpriority="high"')}
        <figcaption class="manga-caption memory-caption">子どもの頃、母はいつも、<br>自分のことを後回しにしていた。</figcaption>
        <p class="manga-bubble memory-bubble">母にも、<br>好きなものを<br>食べてほしかった。</p>
      </figure>
      <div class="manga-memory-after">
        <p class="manga-narration">生活を支えるために、母は夜勤へ。<br>その間は、叔母が私を見てくれていた。</p>
        <p class="manga-narration">頑張ってくれているのは、わかっていた。<br>でも、寂しくて、それ以上に心配だった。<br>そんな中、母が倒れたこともあった。</p>
      </div>
      <p class="manga-wish-line">二人で「おいしいね」って、<br class="manga-phone-break">笑いたかった。</p>
    </section>

    <section class="manga-motherhood" aria-label="自分も母親になって">
      <h2 class="manga-scene-title">大人になり、<br>今度は私が、<br class="manga-narrow-break">母になった。</h2>
      <div class="manga-nursery-composition">
        <figure class="nursery-main manga-panel">
          ${image('nursery','保育園に子どもを預けたあと、涙を浮かべる母親')}
          <figcaption class="manga-caption nursery-caption">保育園に初めて預けた日、<br>帰りの車で涙が出た。</figcaption>
        </figure>
        <div class="nursery-side">
          <div class="nursery-inset" role="img" aria-label="保育園で見送る子どもと保育者の小さなコマ"></div>
          <p class="manga-bubble nursery-bubble">働くことを選んだのは<br>自分なのに。<br>寂しくて、<br class="manga-narrow-break">申し訳なくて。</p>
          <div class="manga-thoughts">
            <p class="manga-thought">子どもとの時間を、<br>大切にしたい。</p>
            <p class="manga-thought">自分らしく働いて、<br>生活にも余裕がほしい。</p>
          </div>
        </div>
      </div>
      <p class="manga-wish-line motherhood-line">どれか一つではなく、<br>どれも大切だった。</p>
    </section>

    <section class="manga-choice" aria-label="違う選択肢を考える">
      <figure class="choice-panel manga-panel">
        <img src="assets/illustration-direction-v2.png" alt="ノートとパソコンを前に、自分の道を考えながら学ぶ女性" width="1536" height="1024" loading="lazy">
        <figcaption class="manga-bubble choice-bubble">何かを大切にするために、<br>何かを諦めなければ<br>いけないのだろうか。</figcaption>
        <p class="choice-question">もっと違う選択肢が<br>あってもいいんじゃないか。</p>
      </figure>
      <div class="manga-axis-copy">
        <p>そのために必要なのは、<br>大きな収入や、<br class="manga-narrow-break">立派な肩書きだけじゃない。</p>
        <h2><span>「自分には、</span><span>これがある。」</span></h2>
        <p>スキルを身につけ、経験を重ねる。<br>自分のピンを、一本立てるように。</p>
      </div>
    </section>

    <section class="manga-learning" aria-label="学びを実践と次の可能性へ">
      <div class="manga-learning-heading"><h2 class="manga-scene-title">知識を得て、<br>終わりじゃない。</h2><p class="manga-narration">身につけて、試して、経験を積む。<br>自分の力で、<br class="manga-narrow-break">仕事に挑戦できるように。</p></div>
      <div class="manga-learning-panels">
        <figure class="practice-panel manga-panel">
          <img src="assets/illustration-direction-v2.png" alt="ノートに書き、パソコンで試す手元を切り取ったコマ" width="1536" height="1024" loading="lazy">
          <figcaption class="manga-caption practice-caption">できることを、<br>少しずつ。</figcaption>
        </figure>
        <figure class="mentoring-panel manga-panel">
          ${image('mentoring','学んだ女性が、別の女性とノートを見ながら学びを分かち合う未来のイメージ')}
          <figcaption class="manga-bubble mentoring-bubble">いつか、学んだ人が<br>教える側になることも。</figcaption>
        </figure>
      </div>
      <p class="manga-learning-note">一人の成長が、<br class="manga-narrow-break">次の誰かの可能性へ。<br>このスクールで、<br class="manga-narrow-break">そんな循環をつくりたい。</p>
    </section>

    <div class="manga-dream-intro"><p>例えば、<br>こんな小さな喜びが<br class="manga-narrow-break">あったら。</p><small>ここからは、原文に描かれた「こんな日常を」という願いの場面です。</small></div>
    <section class="manga-bakery" aria-label="原文にある小さな喜びの願い">
      <figure class="bakery-panel manga-panel">
        ${image('bakery','帰り道のケーキ屋で、ケーキの箱を受け取る女性。原文にある願いのイメージ')}
        <figcaption class="bakery-copy"><h2>帰り道、<br>500円のケーキを。</h2><p>自分の力で得たお金で、<br>食べたいものを選んで帰る。</p></figcaption>
      </figure>
      <div class="bakery-bottom">
        <div class="cake-detail" role="img" aria-label="いちごのショートケーキに寄った丸いコマ"></div>
        <p class="manga-narration">たったそれだけ。<br>でも、自分で身につけた<br>スキルで稼いだお金なら、<br>きっと少し特別だと思う。</p>
        <p class="manga-bubble cake-bubble">少しうれしくて、<br>少し誇らしくて。</p>
      </div>
    </section>

    <section class="manga-family" aria-label="大切なものを大切にできる日常へ">
      <figure class="family-panel manga-panel">
        ${image('family','母子で一緒にケーキを食べ、笑顔を交わす。つくりたい日常を描いた場面')}
        <figcaption class="family-caption"><p>何でもない時間が、<br>少し、豊かになる。</p><strong>大切なものを、<br>大切にできる人生を。</strong></figcaption>
      </figure>
      <div class="manga-final-words"><p>何かを大切にするために、<br>自分の可能性まで諦めなくていい。</p><p>そんな選択肢を、<br class="manga-narrow-break">一つでも増やしたい。</p><p>このスクールは、<br>そんな想いから生まれました。</p><h2>日常に、口笛を。</h2><p class="manga-mission">自分の中に、確かな軸を。</p></div>
    </section>
  </article>
  <section class="manga-afterword container"><p>漫画は、提供原文をもとに文章を短く再構成したものです。<br>後半の学びや暮らしは、目指す未来のイメージとして描いています。</p><div class="actions"><a class="button" href="${url('courses.html')}">学べる内容を見る ${arrow}</a><a class="text-link" href="${url('index.html')}">トップに戻る ${arrow}</a></div></section>
  <section id="story-original" class="container original-section"><details class="original-details"><summary>創設者ストーリーの原文を読む<span aria-hidden="true">＋</span></summary><p class="small muted original-note">以下は、提供された原文の全文です。語り手の氏名・肩書きは未確認です。</p><article class="original-copy" aria-label="創設者ストーリーの提供原文全文">${originalHtml}</article></details></section>
  </main>`;
}

export function initializeComic() {
  const original=document.querySelector('.original-details');
  document.querySelector('a[href="#story-original"]')?.addEventListener('click',()=>{original.open=true;});
  if(location.hash==='#story-original') original.open=true;
}
