/* STUDIO v2.0: teacher-reviewed corpus, quality-gated search.
 * Curated wording is a suggestion, never evidence that a pupil achieved it.
 * References were generalized to avoid names, schools or identifiers.
 * Publisher-neutral supplemental samples: unit-title alignment must be checked by teacher. */
const V20_CURATED=[];
function v20Add(grade,subject,unit,axis,text,source='共有された所見を校正'){
 V20_CURATED.push({grade,subject,unit,axis,text,source});
}
function v20Pack(grade,subject,unit,spec,source){
 const p=(subject==='外国語活動'||subject==='生活・特別活動'?'':subject+'の')+'「'+unit+'」の学習では、';
 for(const [axis,items] of Object.entries(spec)){
  for(const s of items)v20Add(grade,subject,unit,axis,s.startsWith('★')?s.slice(1):p+s,source);
 }
}
v20Pack(3,'国語','すがたをかえる大豆',{
 knowledge:[
 '大豆から作られるさまざまな食品について、加工の仕方の違いに着目しながら整理することができました。',
 '説明文の「はじめ・中・終わり」の構成を理解し、それぞれの段落の役割を捉えることができました。',
 '大豆の加工の仕方を表す言葉の意味を理解し、食品が作られる過程を読み取ることができました。'],
 thinking:[
 '各段落の中心となる言葉や文に着目し、大豆がどのような食品に姿を変えるのかを読み取ることができました。',
 '大豆が姿を変える具体例の示し方や説明の順序に着目し、筆者が読み手に分かりやすく伝えるための工夫を考えることができました。',
 '学んだ説明の工夫を生かし、興味をもった食品について、材料や作られ方を具体的に説明する文章を書くことができました。'],
 attitude:[
 '興味をもった食品について進んで資料を調べ、分かったことをメモに整理しながら文章にまとめようとしていました。',
 '興味をもった食品がどのような材料から作られるのかを読み手に分かりやすく伝えようと、説明する順序や言葉を見直しながら文章を書いていました。']
},'会話で推敲した改訂8例・観点は要照合');
v20Pack(3,'外国語活動','色',{
 knowledge:['色を表す英語を聞き取り、外国人講師が指示した色の物を教室の中から探すことができました。'],
 attitude:['外国人講師が指示した色の物を、教室の中から進んで探していました。']
},'共有された外国語活動の所見');
v20Pack(3,'外国語活動','形',{
 knowledge:['形を表す英語を聞き取り、外国人講師が指示した形の物を教室の中から探すことができました。'],
 thinking:['形を表す英語を手掛かりに、物を当てるクイズに積極的に参加していました。'],
 attitude:['外国人講師が指示した形の物を、教室の中から進んで探していました。']
},'共有された外国語活動の所見');
v20Pack(3,'外国語活動','色・形・動物',{
 knowledge:['ゲームを通して、色や形、動物を表す英語に親しみ、外国人講師の発音をまねして声に出していました。'],
 attitude:['外国人講師の口の動きをよく見て、英語の発音をまねしながらゲームに参加していました。']
},'共有された外国語活動の所見');
v20Pack(3,'外国語活動','自己紹介',{
 thinking:['英語で自己紹介をしてサインを交換する活動では、友だちに声をかけ、学習した表現を使って自己紹介していました。'],
 attitude:['英語で自己紹介をし合うゲームでは、進んで友だちに声をかけ、サインを交換していました。']
},'共有された外国語活動の所見');
v20Pack(3,'外国語活動','好きなものを伝えよう',{
 thinking:['好きな動物や色を英語で伝えたり、相手に尋ねたりするゲームで、学習した表現を使ってやり取りすることができました。'],
 attitude:['好きな動物や色を伝え合う活動では、自分から友だちに声をかけ、英語でやり取りしようとしていました。']
},'共有された外国語活動の所見');
v20Pack(3,'算数','かけ算の筆算',{
 knowledge:['筆算の手順を理解し、位をそろえて順序よく計算することができました。'],
 thinking:['1桁の数と2桁の数のかけ算では、数の順序を入れ替えて筆算にすると計算しやすいことに気付き、その考えを友だちに説明していました。'],
 attitude:['計算で位がずれないよう、位をそろえることを意識して繰り返し練習していました。']
},'共有された算数の所見');
v20Pack(3,'算数','三角形を調べよう',{
 knowledge:['定規とコンパスを丁寧に使い、二等辺三角形や正三角形を正確にかくことができました。'],
 thinking:['角の大きさは辺の長さではなく、二つの辺の開き具合で決まることに着目して、角の大小を比べることができました。'],
 attitude:['コンパスと定規の使い方を繰り返し練習し、二等辺三角形を正確にかくことができるようになりました。']
},'共有された算数の所見');
v20Pack(3,'算数','円と球',{
 knowledge:['コンパスを使って、中心からの距離が等しい点を結び、円を正確にかくことができました。'],
 attitude:['コンパスの針と鉛筆の位置に気を付けながら練習を重ね、円をかく技能を高めていました。']
},'共有された算数の所見');
v20Pack(3,'算数','たし算とひき算の筆算',{
 knowledge:['3桁のたし算やひき算で位を正しくそろえ、正確に筆算することができました。']
},'共有された算数の所見');
v20Pack(3,'算数','わり算',{
 knowledge:['一人分の数を求める場合と、何人に分けられるかを求める場合の意味の違いを理解することができました。'],
 thinking:['文章問題の場面を図や絵に表し、数量の関係を捉えて正しく式を立てることができました。',
 'わり算の意味を理解し、学んだことを生かして自分で文章問題を作ることができました。']
},'共有された算数の所見');
v20Pack(3,'算数','あまりのあるわり算',{
 knowledge:['「余り」「割り切れる」「割り切れない」の意味を理解し、式に正しく表すことができました。']
},'校正済み所見.xlsx');
v20Pack(3,'算数','長さ',{
 knowledge:['1km＝1000mの関係を理解し、長さをkmとmの両方の単位で表すことができました。',
 '巻尺の目盛りを正しく読み取り、物の長さを測ることができました。'],
 thinking:['巻尺を使って校内の物の長さを調べる際に、長さを予想してから測定していました。']
},'校正済み所見.xlsx');
v20Pack(3,'算数','時こくと時間のもとめ方',{
 knowledge:['秒という単位や分と秒の関係を理解し、時間を求める問題を解くことができました。'],
 thinking:['時間の単位に着目し、時刻や時間の求め方を考えることができました。']
},'校正済み所見.xlsx');
v20Pack(3,'算数','かけ算のきまり',{
 thinking:['12×4の答えの求め方を図に表し、数のまとまりに着目しながら考えることができました。']
},'校正済み所見.xlsx');
v20Pack(3,'国語','こまを楽しむ',{
 thinking:['段落ごとにこまの特徴を捉え、遊んでみたいこまとその理由をノートにまとめることができました。',
 '文章の「はじめ・中・終わり」の構成に着目し、段落同士の関係を考えながら内容を読み取ることができました。']
},'校正済み所見.xlsx');
v20Pack(3,'国語','まいごのかぎ',{
 thinking:['出来事をきっかけに変わる主人公の様子に着目し、気持ちの変化を考えることができました。',
 '主人公の行動を表す言葉を根拠に、出来事による気持ちの変化を想像することができました。']
},'校正済み所見.xlsx');
v20Pack(3,'国語','国語辞典を使おう',{
 knowledge:['見出し語の並び方を理解し、調べたい言葉の意味を国語辞典で調べることができました。']
},'校正済み所見.xlsx');
v20Pack(3,'国語','漢字の音と訓',{
 knowledge:['既習の漢字の音読みと訓読みを確かめ、それぞれの読み方を生かして文を作ることができました。']
},'校正済み所見.xlsx');
v20Pack(3,'国語','はじめて知ったことを知らせよう',{
 thinking:['自分で選んだ科学的な読み物から初めて知ったことを取り上げ、感想を交えて伝えることができました。']
},'校正済み所見.xlsx');
v20Pack(3,'国語','ありの行列',{
 thinking:['中心となる語や文を見つけ、各段落の大切な内容を短くまとめることができました。',
 '指示語や接続語、段落の関係に着目し、問いから答えまでの説明の流れを捉えることができました。']
},'共有された所見記録');
v20Pack(3,'国語','ローマ字',{
 knowledge:['ローマ字の表記を覚え、タブレット端末で文字を入力するときに活用することができました。']
},'共有された所見記録');
v20Pack(3,'図工','絵のぐ＋水＋ふで＝いいかんじ！',{
 knowledge:['絵の具の水の量を調整し、太い線や細い線などを描き分けることができました。'],
 thinking:['イメージしたTシャツを表すために、色を混ぜたり線を重ねたりして描いていました。']
},'校正済み所見.xlsx');
v20Pack(3,'図工','カラフルフレンド',{
 thinking:['ビニール袋の色や材料の組み合わせを工夫し、自分なりの「友だち」を表現することができました。']
},'校正済み所見.xlsx');
v20Pack(3,'図工','せんたくばさみで遊ぼう',{
 thinking:['自分のイメージに合わせて、洗濯ばさみの色を組み合わせたり、つないだりして表現していました。',
 '洗濯ばさみをつないだり重ねたりしながら、思い描いた形を表現することができました。']
},'校正済み所見.xlsx');
v20Pack(3,'音楽','リコーダー',{
 knowledge:['タンギングに気を付けて一音一音をはっきりと吹き、きれいな音で曲を演奏することができました。',
 '息の使い方や指づかいに気を付け、なめらかに旋律を演奏することができました。']
},'校正済み所見.xlsx');
v20Pack(3,'音楽','春の小川',{
 thinking:['歌詞に表された春の情景を思い浮かべ、ブレスの記号にも気を付けながら歌うことができました。']
},'校正済み所見.xlsx');
v20Pack(3,'理科','磁石の性質',{
 knowledge:['同じ極同士は退け合い、違う極同士は引き合う性質を理解することができました。'],
 thinking:['磁石の極の性質を使って、物が動く仕組みを工夫したおもちゃを作ることができました。'],
 attitude:['身の回りの物を調べ、磁石に引き付けられる物を進んで探して記録していました。']
},'共有された所見記録');
v20Pack(3,'社会','スーパーマーケット',{
 thinking:['商品の並べ方や表示、品ぞろえなどに着目し、店がお客さんのために行っている工夫を見つけることができました。',
 '見学で気付いた店の工夫を付箋に書き出し、友だちに紹介することができました。']
},'共有された所見記録');
v20Pack(3,'社会','昔の道具',{
 attitude:['昔の道具の使い方や歴史に関心をもち、本で調べたことをカードにまとめていました。']
},'共有された所見記録');
v20Pack(3,'体育','跳び箱',{
 knowledge:['かかえ込み跳びに取り組み、手を着いた位置よりも足が前に出るよう意識して練習し、技を成功させることができました。',
 '台上前転では、マットを使って回転する動きを練習し、跳び箱の上でも前転できるようになりました。',
 '開脚跳びでは、両足で踏切板を力強く踏み切り、着地で姿勢を保つことができました。']
},'共有された所見記録');
v20Pack(3,'体育','鉄棒',{
 knowledge:['後方支持回転で腹部が鉄棒から離れないよう意識し、回転することができました。']
},'共有された所見記録');
v20Pack(3,'体育','ハードル走',{
 thinking:['自分の走るリズムに合わせてハードルの間隔を選び、一定のリズムで走り越えることができました。']
},'共有された所見記録');
v20Pack(3,'体育','ソフトキャッチバレー',{
 thinking:['相手のコートの空いている場所を見つけ、そこをねらってボールを返す工夫をしていました。',
 'ボールを落とさずにつなぐために、友だちと声をかけ合いながらパスしていました。']
},'共有された所見記録');
v20Pack(3,'体育','タワーボール',{
 thinking:['相手に取られないようパスをつなぎ、ねらう場所を考えながらシュートしていました。'],
 attitude:['ゲームの規則を理解し、自分から主審の役割に挑戦していました。']
},'共有された所見記録');
v20Pack(6,'外国語','This is me',{
 knowledge:['自分のプロフィールを伝える英語表現を使い、交流相手に向けた自己紹介カードを作成することができました。'],
 thinking:['自己紹介カードに写真を添えるなど、相手に自分のことが伝わりやすくなるよう工夫していました。'],
 attitude:['自分のプロフィールを伝える表現を使い、英語で自己紹介することができました。']
},'校正済み所見.xlsx');
v20Pack(6,'外国語',"Let's go to Italy",{
 knowledge:['行きたい国について、学習した英語表現を用いて話すことができました。'],
 thinking:['自分の行きたい国とその理由について、英語で尋ねたり伝えたりすることができました。'],
 attitude:['自分の行きたい国とその理由を、外国人講師に英語で詳しく伝えることができました。']
},'校正済み所見.xlsx');
// Add category-based, non-curricular classroom observations from the user's own source, not from outside PDF.
v20Pack(3,'生活・特別活動','学級活動',{
 attitude:['★学級会では、友だちの意見を聞いて自分の考えと比べ、話合いの内容を整理しながら発言していました。']
},'共有の文例を基に作成した編集用例');
const V20_AXES={knowledge:'知識・技能',thinking:'思考・判断・表現',attitude:'主体的に学習に取り組む態度'};
function v20Normalize(x){return String(x||'').normalize('NFKC').replace(/[\s　・＋+（）()]/g,'').replace(/筆算/g,'ひっ算').replace(/描/g,'か').toLowerCase()}
const V20_ALIASES={
 'かけ算の筆算':['かけ算のひっ算','かけ算の筆算（１）'],
 '三角形を調べよう':['三角形と角','二等辺三角形と正三角形'],
 '円と球':['まるい形を調べよう'],
 '磁石の性質':['じしゃくのせいしつ','じしゃくのひみつ'],
 'たし算とひき算の筆算':['3桁のたし算やひき算の筆算','たし算とひき算のひっ算'],
 '時こくと時間のもとめ方':['時こくと時間'],
 '昔の道具':['昔の道具を調べよう']
};
function v20Match(a,b){
 if(v20Normalize(a)===v20Normalize(b))return true;
 const aa=V20_ALIASES[a]||[],bb=V20_ALIASES[b]||[];
 return aa.some(x=>v20Normalize(x)===v20Normalize(b))||bb.some(x=>v20Normalize(x)===v20Normalize(a));
}
function v20Rows(grade,subject,unit){return V20_CURATED.filter(x=>x.grade===grade&&x.subject===subject&&v20Match(x.unit,unit))}
function v20Choices(rows){return rows.map((x,i)=>({id:'v20:'+x.axis+':'+i,axis:V20_AXES[x.axis]+'｜校正済み',text:x.text,source:x.source}))}
const v20PriorAvailable=v8Available;
v8Available=function(c,subject){
 const found=v20PriorAvailable(c,subject);
 if(!subject)return found;
 // The v1.9 generic sentences are not report-card-ready and are hidden from search.
 for(const u of found)u.choices=u.choices.filter(x=>!String(x.id).startsWith('v19:'));
 const groups=new Map();
 for(const x of V20_CURATED)if(x.grade===c.grade&&x.subject===subject){
  const key=x.unit;let row=groups.get(key);
  if(!row){row=[];groups.set(key,row)}row.push(x);
 }
 for(const [unit,rows] of groups){
  let target=found.find(x=>v20Match(unit,x.unit));
  if(!target){target={id:'v20|'+subject+'|'+unit,publisher:'参考文例',unit,domain:'',choices:[]};found.push(target)}
  // For edited units use the teacher-reviewed examples, not a mixture with generic drafts.
  target.choices=v20Choices(rows);
 }
 return found;
};
const v20OldUnitOptions=v4UnitOptions;
v4UnitOptions=function(){
 const out=v20OldUnitOptions(),seen=new Set(out.map(u=>v20Normalize(u.unit)));
 for(const row of V20_CURATED){
  if(row.grade!==v4Grade||row.subject!==v4Subject)continue;
  const unit=v20Normalize(row.unit);if(seen.has(unit))continue;
  seen.add(unit);out.push({grade:row.grade,subject:row.subject,publisher:v4Pub(v4Grade,v4Subject),unit:row.unit,texts:[]});
 }
 return out;
};
const v20OldData=v6Data;
v6Data=function(u){
 if(u){
  const rows=v20Rows(u.grade,u.subject,u.unit);
  if(rows.length)return {knowledge:rows.filter(x=>x.axis==='knowledge').map(x=>x.text),thinking:rows.filter(x=>x.axis==='thinking').map(x=>x.text),attitude:rows.filter(x=>x.axis==='attitude').map(x=>x.text)};
 }
 return v20OldData(u);
};
const v20OldPicker=v8Picker;
v8Picker=function(c,t,n){
 const h=v20OldPicker(c,t,n),st=v8Selection(c,t,n),available=v8Available(c,st.subject),u=available.find(x=>x.id===st.unit);
 if(!st.subject)return h;
 const count=u?.choices.length||0;
 const advisory=count?
  '掲載されている文例は候補です。実際の児童の学習場面・成果と一致する場合のみ使い、編集してください。':
  'この単元は校正済みの文例がまだありません。下の「登録のない単元・文例から所見を作る」から、実際の姿を入力してください。';
 return h+'<p class="v20-guidance">'+E(advisory)+'</p>';
};
const v20Css=document.createElement('style');
v20Css.textContent='.v20-guidance{font-size:11px;border-left:3px solid #8db2a2;padding:7px 12px;line-height:1.7;background:#f3f8f4;color:#355f4e;margin:9px 0}';
document.head.appendChild(v20Css);
