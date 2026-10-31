/* STUDIO v2.4: publisher-plan-grounded original report comments (3rd grade)
 * NOT publisher-issued comments. Confirm actual pupil evidence before use.
 * Official references:
 * Mitsumura R6 3rd-grade Japanese annual curriculum/assessment:
 * https://www.mitsumura-tosho.co.jp/kyokasho/s-kokugo/keikaku
 * Tokyo Shoseki R6 3rd-grade mathematics:
 * https://ten.tokyo-shoseki.co.jp/text/shou/sansu/data/sansu_keikaku_saian_3.pdf
 * Tokyo Shoseki R6 3rd-grade science:
 * https://ten.tokyo-shoseki.co.jp/text/shou/rika/data/rika_nenkankeikaku_3_saian.pdf
 */
const V24_SOURCE={
 '国語':{publisher:'光村図書',url:'https://www.mitsumura-tosho.co.jp/kyokasho/s-kokugo/keikaku',label:'令和6年度版 3年 年間指導計画例・評価計画'},
 '算数':{publisher:'東京書籍',url:'https://ten.tokyo-shoseki.co.jp/text/shou/sansu/data/sansu_keikaku_saian_3.pdf',label:'令和6年度版 新編 新しい算数3 年間指導計画・細案'},
 '理科':{publisher:'東京書籍',url:'https://ten.tokyo-shoseki.co.jp/text/shou/rika/data/rika_nenkankeikaku_3_saian.pdf',label:'令和6年度版 新編 新しい理科3 年間指導計画・細案'}
};
const V24_UNITS=[];
function v24Add(subject,unit,focus,examples){
 const source=V24_SOURCE[subject],texts=[];
 for(const [axis,list] of Object.entries(examples)){
  for(const sentence of list){
   if(!['knowledge','thinking','attitude'].includes(axis)||!/[。！]$/.test(sentence))throw Error('invalid example: '+unit+':'+sentence);
   texts.push({axis,text:subject+'の「'+unit+'」の学習では、'+sentence});
  }
 }
 V24_UNITS.push({grade:3,subject,unit,publisher:source.publisher,focus,sourceUrl:source.url,sourceLabel:source.label,
  examples:texts});
}
// 国語: 読む・書く・話す聞くを教材ごとに分類。関連する教材も同じ名前で統合しない。
v24Add('国語','こまを楽しむ','説明文の問いと答え・段落の役割・感想',{
 knowledge:['文章を「はじめ・中・終わり」に分け、それぞれのまとまりに書かれた内容を整理することができました。'],
 thinking:['問いに対する答えが書かれた部分を見つけ、こまの特徴を段落ごとに整理することができました。',
 '遊んでみたいこまを選び、本文に書かれた特徴を理由にして自分の考えを伝えることができました。'],
 attitude:['友だちが選んだこまと自分の選んだこまを比べ、理由の違いを確かめながら読み直していました。']
});
v24Add('国語','まいごのかぎ','主人公の心情の変化・言動を根拠に場面を読む',{
 knowledge:['主人公の行動や気持ちを表す言葉を本文から集め、それぞれの言葉が表す様子の違いを捉えることができました。'],
 thinking:['りいこの言動を表す言葉を手掛かりに、不思議な出来事を経験した後の気持ちの変化を説明することができました。',
 '物語の初めと終わりを比べ、主人公の考え方が変わった理由を出来事と結び付けて考えることができました。'],
 attitude:['好きな場面について友だちの感想を聞き、自分とは違う感じ方を本文に戻って確かめていました。']
});
v24Add('国語','仕事のくふう、見つけたよ','調べたことの報告・引用・段落・理由と事例',{
 knowledge:['調べたことを段落ごとに分け、読みやすい改行や句読点を意識して文章を書くことができました。',
 '本や資料から得た情報と自分で考えたことを区別し、引用の仕方に気を付けて書くことができました。'],
 thinking:['調べた仕事の工夫について、工夫の内容とその理由が伝わる順序を考え、報告する文章にまとめることができました。',
 '相手に伝えたい工夫を選び、具体例を添えて、その仕事のよさが分かるように書くことができました。'],
 attitude:['伝わりにくい部分を読み直し、理由や具体例を付け足すなどして文章を整えようとしていました。']
});
v24Add('国語','ポスターを読もう','複数のポスターを比較・目的や表現の工夫を読み取る',{
 knowledge:['二つのポスターの情報を比べ、共通する点と異なる点を整理することができました。'],
 thinking:['文字の大きさや色、写真の使い方の違いに着目し、伝えたい相手に合わせた工夫を考えることができました。',
 'ポスターに書かれた中心となる情報を捉え、それぞれの伝え方の効果について自分の考えを話すことができました。'],
 attitude:['友だちが注目した部分と自分が選んだ部分を比べ、ポスターの見方を広げていました。']
});
v24Add('国語','ちいちゃんのかげおくり','物語の二つの場面を比較・戦争・心情変化',{
 knowledge:['登場人物の行動や情景を表す言葉に着目し、似た意味の言葉との違いを確かめながら語彙を広げることができました。'],
 thinking:['二つの「かげおくり」の場面を比べ、周りの様子やちいちゃんの気持ちの違いを本文に基づいて考えることができました。',
 'ちいちゃんの行動や出来事の変化を捉え、気持ちが変わっていく理由を文章中の言葉と結び付けて説明できました。'],
 attitude:['初めに書いた感想と読み終えた後の感想を比べ、読み方が変わったところを振り返っていました。']
});
v24Add('国語','おすすめの一さつを決めよう','司会・話し合い・理由の共通点と違い',{
 knowledge:['司会や記録などの役割を知り、話合いの進め方を確かめることができました。'],
 thinking:['おすすめする本のよさを理由とともに伝え、友だちの意見との共通点や違いを整理しながら話し合うことができました。'],
 attitude:['司会の進行や友だちの意見を確かめ、話合いの目的に沿って考えをまとめようとしていました。']
});
v24Add('国語','すがたをかえる大豆','説明文を読む：中心となる文・事例の順序・分類',{
 knowledge:['大豆からできる食品と加工の仕方を表に整理し、食品ごとの共通点や違いを捉えることができました。'],
 thinking:['「中」の段落の中心となる文に着目し、大豆の姿の変え方を説明する事例の順序を読み取ることができました。',
 '筆者が選んだ事例の並べ方に着目し、読み手に伝わりやすくするための工夫を本文から考えることができました。'],
 attitude:['段落ごとの説明を読み比べ、分からないところを本文に戻って確かめようとしていました。']
});
v24Add('国語','食べ物のひみつを教えます','調べて説明文を書く：組立て・段落・言葉の選択',{
 knowledge:['食品について調べた情報を仲間分けし、文章に必要な内容を整理することができました。'],
 thinking:['選んだ食べ物について、材料や作り方の説明をどの順序で示すと分かりやすいか考え、段落を組み立てて書くことができました。',
 '調べた内容から伝えたい事例を選び、中心となる内容が伝わる説明文にまとめることができました。'],
 attitude:['自分が書いた説明文を読み返し、順序や言葉を見直して、読み手に伝わりやすい文章に近付けようとしていました。']
});
v24Add('国語','国語辞典を使おう','見出し語の五十音順・意味の調べ方',{
 knowledge:['五十音順と見出し語の並び方を確かめ、調べたい言葉を国語辞典で探すことができました。'],
 thinking:['同じ言葉に複数の意味がある場合、文章の前後を読んで合う意味を選ぶことができました。'],
 attitude:['文章の中で意味が分からない言葉に出会うと、進んで辞典を開いて確かめていました。']
});
v24Add('国語','漢字の音と訓','音読みと訓読みを比べる・語句を使う',{
 knowledge:['漢字に音読みと訓読みがあることを理解し、同じ漢字を使った言葉の読み方を確かめることができました。'],
 thinking:['同じ漢字を使った言葉を集め、読み方の違いに注目して仲間分けすることができました。'],
 attitude:['身の回りの言葉から既習漢字の読み方を探し、音読みと訓読みを確かめていました。']
});
// 算数: 東京書籍3年略案と細案の単元名・学習内容・観点別規準に照合。
v24Add('算数','かけ算','かけ算のきまり・交換法則・数を分けて計算',{
 knowledge:['かける数を一つ増やすと積がいくつ増えるかを理解し、九九の答えを確かめることができました。'],
 thinking:['九九を超えるかけ算について、数を分けた式や図を使って答えを求める方法を説明できました。'],
 attitude:['友だちの式と自分の式を比べ、数の分け方の違いを確かめながら考えていました。']
});
v24Add('算数','時こくと時間のもとめ方','時刻・経過時間・秒と分の関係',{
 knowledge:['1分が60秒であることを理解し、時間を分と秒に直して表すことができました。'],
 thinking:['時刻と時刻の間を数直線に表し、何分後・何分前かを順序立てて考えることができました。'],
 attitude:['答えが実際の時間の長さと合うか、時計の目盛りを使って確かめ直していました。']
});
v24Add('算数','わり算','等分除と包含除・図と式を対応させる',{
 knowledge:['同じ数ずつ分ける場面をわり算の式に表し、九九を使って答えを求めることができました。'],
 thinking:['一人分の数を求める場合と何人に分けられるかを求める場合を絵や図で表し、式の意味を説明できました。'],
 attitude:['分け方が分からない場面では、具体物や図を使って数の関係を確かめようとしていました。']
});
v24Add('算数','たし算とひき算の筆算','3桁の加減・繰り上がり・繰り下がり',{
 knowledge:['3桁の数の位をそろえ、繰り上がりや繰り下がりに気を付けて筆算できました。'],
 thinking:['繰り下がりが続く計算について、位ごとの数のまとまりを図や式に表して計算の仕方を説明できました。'],
 attitude:['計算の間違いがないか、逆の計算や位ごとの確認を使って答えを確かめていました。']
});
v24Add('算数','長いものの長さのはかり方と表し方','巻尺・道のりと距離・kmとm',{
 knowledge:['巻尺の目盛りを正しく読み取り、測った長さをmやcmで表すことができました。',
 '1kmが1000mであることを理解し、長さをkmとmで表すことができました。'],
 thinking:['測る場所の長さや形に合わせて、ものさしと巻尺のどちらが使いやすいか理由を考えて選びました。'],
 attitude:['測る前に長さを予想し、測った結果と比べて違いを確かめようとしていました。']
});
v24Add('算数','ぼうグラフと表','項目分け・棒グラフの目盛り・二次元表',{
 knowledge:['棒グラフの目盛りと項目を読み取り、数の多い項目や項目同士の差を正確に調べることができました。'],
 thinking:['集めた資料を項目ごとに整理し、数の違いが伝わるよう目盛りをそろえて棒グラフに表すことができました。'],
 attitude:['グラフに表した数と元の表を見比べ、目盛りや項目の書き間違いを確かめていました。']
});
v24Add('算数','暗算','2桁の加減計算・数の構成',{
 knowledge:['十の位と一の位に分けて考え、2桁のたし算やひき算を暗算することができました。'],
 thinking:['計算しやすい数のまとまりに分け、暗算の手順を式や言葉で説明することができました。'],
 attitude:['友だちの暗算の仕方と自分の方法を比べ、より計算しやすいやり方を試していました。']
});
v24Add('算数','あまりのあるわり算','余りと除数・確かめ・場面に応じた処理',{
 knowledge:['余りがわる数より小さくなることを理解し、商と余りを正しく求めることができました。',
 '商とわる数をかけた数に余りをたして、答えが合っているかを確かめることができました。'],
 thinking:['余りのあるわり算の答えを問題の場面に戻して考え、商をそのまま使うか一つ増やすかを理由とともに説明できました。',
 '分ける場面を図に表し、余りが出る理由をわり算の式と結び付けて説明できました。'],
 attitude:['計算で求めた余りの意味を問題文と照らし合わせ、答えが適切か確かめ直していました。']
});
v24Add('算数','大きい数のしくみ','一億までの位取り・数直線・10倍の関係',{
 knowledge:['一億までの数を位取り表に正しく表し、数字を読んだり書いたりすることができました。'],
 thinking:['一つの数を一万や千のまとまりに分け、数の大きさを位取り表を使って説明することができました。'],
 attitude:['数字を並べてできた数を友だちの数と比べ、位による大きさの違いを確かめていました。']
});
v24Add('算数','かけ算の筆算(1)','2・3桁×1桁・位の意味・繰り上がり',{
 knowledge:['2桁や3桁の数に1桁の数をかける筆算について、位をそろえて正確に計算できました。'],
 thinking:['2桁の数を十の位と一の位に分け、筆算の途中の式が何を表すか説明できました。',
 '繰り上がりのある筆算について、数のまとまりに着目して計算の順序を考えました。'],
 attitude:['計算の途中で繰り上がりを確認し、答えが合うか別の方法でも確かめていました。']
});
v24Add('算数','大きい数のわり算、分数とわり算','何十÷一桁・分数と等分除',{
 knowledge:['何十を1桁の数でわる計算について、十のまとまりで考えて答えを求めることができました。'],
 thinking:['2桁の数を十の位と一の位に分け、わり算の計算の仕方を図や式に表すことができました。'],
 attitude:['これまでに学んだわり算と比べ、数のまとまりを使える場面を探していました。']
});
v24Add('算数','円と球','中心・半径・直径・コンパス',{
 knowledge:['中心からの長さをそろえ、コンパスを使って円を正確にかくことができました。'],
 thinking:['円の中心から周りまでの長さが等しいことに着目し、半径と直径の関係を図で説明できました。'],
 attitude:['コンパスの開きや針の位置を確かめ、円がずれないよう繰り返し練習していました。']
});
v24Add('算数','小数','小数第一位・位取り・加減計算',{
 knowledge:['0.1をもとにした数の構成を理解し、小数第一位までの数を正しく表すことができました。'],
 thinking:['小数のたし算について、0.1を何個分かで考え、整数の計算と同じように説明できました。'],
 attitude:['小数点の位置を確かめ、計算結果が数直線上の大きさと合うか見直していました。']
});
v24Add('算数','重さのたんいとはかり方','g・kg・台ばかり・正味と容器',{
 knowledge:['はかりの目盛りを正しく読み取り、重さをgやkgで表すことができました。'],
 thinking:['容器と中身の重さの関係を図や式に整理し、中身だけの重さを求める方法を考えました。'],
 attitude:['身近な物の重さを予想してから測り、実際の重さとの違いを確かめていました。']
});
v24Add('算数','分数','単位分数・同分母の加減・小数との関係',{
 knowledge:['単位分数をいくつ集めた数かを考え、分数を図や数直線に表すことができました。'],
 thinking:['同じ分母の分数のたし算について、単位分数の個数を使って計算の仕方を説明できました。'],
 attitude:['分数の大きさが図と合っているか確かめ、友だちの表し方と比べていました。']
});
v24Add('算数','□を使った式','未知の数を□として式に表す',{
 knowledge:['分からない数を□で表し、場面に合った式を立てることができました。'],
 thinking:['問題の数の関係を図で整理し、□に入る数の求め方を理由とともに説明できました。'],
 attitude:['求めた□の値を式に戻して、問題の条件に合うか確かめていました。']
});
v24Add('算数','かけ算の筆算(2)','2・3桁×2桁・部分積・位をずらす意味',{
 knowledge:['2桁の数をかける筆算について、十の位にかけた結果の位をそろえて計算することができました。'],
 thinking:['かける数を十の位と一の位に分け、筆算の二つの途中の式が何を表すか説明できました。'],
 attitude:['途中の式の位がずれていないか確かめ、答えを見直しながら計算していました。']
});
v24Add('算数','倍の計算','比較量・基準量・倍の意味',{
 knowledge:['何倍かを求める場面について、もとにする数と比べる数を捉え、式に表すことができました。'],
 thinking:['線分図に数の関係を整理し、かけ算とわり算のどちらを使うか理由を説明することができました。'],
 attitude:['求めた答えがもとの数と比べて妥当か、図に戻って確かめていました。']
});
v24Add('算数','三角形と角','二等辺三角形・正三角形・角の開き',{
 knowledge:['定規とコンパスを使い、辺の長さをそろえて二等辺三角形や正三角形をかくことができました。'],
 thinking:['角の大きさは辺の長さではなく開き具合で決まることに着目し、角の大小を説明することができました。'],
 attitude:['作図した三角形の辺の長さを測り直し、条件に合っているか確かめていました。']
});
// 理科: 観察と結果に基づく思考を区別。使った道具・行動は本人に確認が必要。
v24Add('理科','春の生き物','虫眼鏡・色や形の比較・観察記録',{
 knowledge:['虫眼鏡を正しく使って身近な生き物を観察し、色や形、大きさの特徴を記録できました。'],
 thinking:['見つけた生き物を比べ、似ているところと違うところを根拠に仲間分けしていました。'],
 attitude:['見つけた生き物を友だちに紹介し、さらに調べたい特徴を探しながら観察していました。']
});
v24Add('理科','たねまき','種の観察・発芽・子葉・記録',{
 knowledge:['種の形や大きさを観察し、特徴が伝わるように記録することができました。'],
 thinking:['異なる種の形や大きさを比べ、育ち方の違いについて調べたいことを見つけていました。'],
 attitude:['芽が出るまでの様子を気にかけ、変化を見つけるたびに観察記録に残していました。']
});
v24Add('理科','チョウのかんさつ','成長の順序・体のつくり・観察',{
 knowledge:['卵・幼虫・さなぎ・成虫の変化を、観察記録をもとに順序よく説明できました。'],
 thinking:['成長する前後のチョウの姿を比べ、体の形の変化を具体的に考察することができました。'],
 attitude:['成長の様子が分かるように観察を続け、前回の記録と比べて変化を確かめていました。']
});
v24Add('理科','風やゴムのはたらき','送風の強さ・ゴムを伸ばす長さ・距離の比較',{
 knowledge:['風の強さやゴムを伸ばす長さによって、車の進む距離が変わることを実験結果から理解できました。'],
 thinking:['風の強さだけを変えた実験結果を比べ、強くすると車が遠くまで進む関係を説明できました。',
 'ゴムを伸ばした長さと車の進んだ距離を表やグラフで比べ、結果を根拠に考察することができました。'],
 attitude:['結果が予想と違ったとき、車の動きをもう一度確かめ、条件をそろえて実験しようとしていました。']
});
v24Add('理科','こん虫のかんさつ','生息場所・体のつくり・成長の違い',{
 knowledge:['昆虫の体が頭・胸・腹からできていることを理解し、図に表して説明できました。'],
 thinking:['チョウとトンボなどの成長の様子を比べ、さなぎになるものとならないものがいることを捉えました。'],
 attitude:['観察記録や友だちの調べた結果を見比べ、昆虫の体のつくりの共通点を確かめようとしていました。']
});
v24Add('理科','太陽とかげ','時刻と方位・影の向き・日なたと日かげの地面温度',{
 knowledge:['時刻ごとの影の向きと太陽の位置を正しく記録し、両者が反対方向にあることを理解しました。'],
 thinking:['朝・昼・午後の観察結果を比べ、太陽の位置が変わると影の向きも変わることを記録を根拠に説明できました。',
 '日なたと日かげの地面の温度を時刻ごとに比べ、太陽の光と地面の温まり方の関係を数値を根拠に考察できました。'],
 attitude:['ほかの班の記録と自分の班の結果を比べ、違いがあれば観察時刻や場所を確かめようとしていました。']
});
v24Add('理科','太陽の光','日光の反射・集光・明るさと温かさ',{
 knowledge:['鏡で跳ね返した日光は直進することを理解し、光を当てる場所を変えて確かめることができました。'],
 thinking:['日光を集めたときの明るさや温かさを比べ、光の集め方と温まり方の関係を考えることができました。'],
 attitude:['日光の当たり方を変えながら結果を比べ、安全に気を付けて実験に取り組んでいました。']
});
v24Add('理科','音のせいしつ','音を出す物の振動・伝わり方',{
 knowledge:['音が出ている物に触れて振動していることを確かめ、音と振動の関係を理解できました。'],
 thinking:['音の大きさを変えたときの物の震え方を比べ、音の大きさと振動の関係を説明できました。'],
 attitude:['音を出す方法を変えて実験し、振動の違いを見つけようとしていました。']
});
v24Add('理科','物の重さ','形や体積を変えても重さが同じ・同体積の素材差',{
 knowledge:['物の形を変えても、物そのものの重さは変わらないことを測定結果から理解できました。'],
 thinking:['粘土の形を変える前後の重さを比べ、測った数値を根拠に重さが変わらないことを説明できました。'],
 attitude:['測定結果に疑問があるときははかりの目盛りを確かめ、繰り返し測ろうとしていました。']
});
v24Add('理科','電気の通り道','回路・豆電球・金属と非金属の導通',{
 knowledge:['豆電球がつくつなぎ方を調べ、乾電池から豆電球まで電気の通り道が輪になることを理解できました。',
 '身の回りの物が電気を通すか調べ、鉄やアルミニウムなどの金属が電気を通すことを理解しました。'],
 thinking:['実験した物を豆電球がついたものとつかなかったものに分け、材質に注目して共通点を考察できました。',
 '豆電球がつかなかった場合に、導線のつなぎ方や触れる位置を確かめ、原因を考えることができました。'],
 attitude:['予想と違う結果が出たとき、導線を当てる場所を変えるなどして確かめ直そうとしていました。']
});
v24Add('理科','じしゃくのせいしつ','磁石に付く物・極の性質・着磁',{
 knowledge:['磁石に付く物と付かない物を調べ、鉄の性質に注目して仲間分けできました。',
 '磁石の同じ極は退け合い、違う極は引き合うことを実験から理解できました。'],
 thinking:['磁石を近づける前後の物の動きを比べ、磁石が離れていても力を及ぼすことを説明できました。'],
 attitude:['予想と違った物の材質を確かめ、ほかの物でも同じ結果になるか試していました。']
});


/* Integration: distinct source-backed suggestions, searchable and selectable without mutating saved comments. */
function v24MatchesPublisher(subject,grade=3){
 if(grade!==3||!V24_SOURCE[subject])return false;
 const current=(S.textbooks||{})[grade+':'+subject]||'未設定';
 return current==='未設定'||current===V24_SOURCE[subject].publisher;
}
function v24Matching(grade,subject){return Number(grade)===3?V24_UNITS.filter(x=>x.subject===subject&&v24MatchesPublisher(subject,grade)):[]}
const v24OldMakeIndex=v22MakeIndex;
v22MakeIndex=function(){
 const old=v24OldMakeIndex();
 const replaced=new Set(V24_UNITS.map(x=>'3|'+x.subject+'|'+v22Norm(x.unit)));
 const kept=old.filter(x=>{
  if(x.source==='保存済みの文例')return true;
  if(!['国語','算数','理科'].includes(x.subject)||x.grade!==3||!v24MatchesPublisher(x.subject))return true;
  return !replaced.has('3|'+x.subject+'|'+v22Norm(x.unit));
 });
 for(const u of V24_UNITS){
  if(!v24MatchesPublisher(u.subject))continue;
  for(const x of u.examples){
   kept.push({grade:3,subject:u.subject,unit:u.unit,axis:V22_AXIS[x.axis],
    criterion:V22_AXIS[x.axis],rawAxis:x.axis,text:x.text,source:'教科書会社の評価計画を参照した独自文例',
    details:u.focus,publisher:u.publisher,sourceUrl:u.sourceUrl,sourceLabel:u.sourceLabel});
  }
 }
 const seen=new Set(),out=[];
 for(const x of kept){
  const key=[x.grade,x.subject,v22Norm(x.unit),v22Norm(x.text)].join('|');
  if(seen.has(key))continue;
  seen.add(key);out.push({...x,index:out.length});
 }
 return out;
};
const v24OldFind=v22Find;
v22Find=function(idx){
 const data=v24OldFind(idx);
 if(!['国語','算数','理科'].includes(V22_SEARCH.subject)||Number(V22_SEARCH.grade)!==3)return data;
 return [...data].sort((a,b)=>{
  const rank=x=>x.source==='教科書会社の評価計画を参照した独自文例'?0:
   x.source==='保存済みの文例'?1:2;
  return rank(a)-rank(b);
 });
};
const v24OldAvailable=v8Available;
v8Available=function(c,subject){
 const out=v24OldAvailable(c,subject);
 const official=v24Matching(c.grade,subject);
 for(const u of official){
  let target=out.find(x=>v22Norm(x.unit)===v22Norm(u.unit));
  if(!target){target={id:'v24|'+subject+'|'+u.unit,unit:u.unit,publisher:u.publisher,domain:'出版社資料を参照',choices:[]};out.push(target)}
  const stored=target.choices.filter(x=>String(x.id).startsWith('bank:'));
  target.domain=u.publisher+'・評価計画参照';
  target.publisher=u.publisher;
  target.choices=u.examples.map((x,i)=>({id:'v24:'+x.axis+':'+i,axis:V22_AXIS[x.axis]+'｜資料照合例',text:x.text})).concat(stored);
 }
 return out;
};
const v24OldUnitOptions=v4UnitOptions;
v4UnitOptions=function(){
 const out=v24OldUnitOptions();
 if(Number(v4Grade)!==3||!v24MatchesPublisher(v4Subject))return out;
 for(const u of v24Matching(v4Grade,v4Subject)){
  if(out.some(x=>v22Norm(x.unit)===v22Norm(u.unit)))continue;
  out.push({grade:u.grade,subject:u.subject,unit:u.unit,publisher:u.publisher,focus:u.focus,
   sourceUrl:u.sourceUrl,source:u.sourceLabel,domain:'出版社資料を参照',texts:[]});
 }
 return out;
};
const v24OldData=v6Data;
v6Data=function(u){
 const unit=V24_UNITS.find(x=>Number(u?.grade)===3&&x.subject===u.subject&&
   v22Norm(x.unit)===v22Norm(u.unit)&&x.publisher===u.publisher);
 if(unit&&v24MatchesPublisher(unit.subject)){
  return {knowledge:unit.examples.filter(x=>x.axis==='knowledge').map(x=>x.text),
   thinking:unit.examples.filter(x=>x.axis==='thinking').map(x=>x.text),
   attitude:unit.examples.filter(x=>x.axis==='attitude').map(x=>x.text)};
 }
 return v24OldData(u);
};
function v24SourceBar(){
 if(!v24MatchesPublisher(V22_SEARCH.subject,V22_SEARCH.grade))return '';
 const subject=V22_SEARCH.subject,source=V24_SOURCE[subject];
 return '<div class="v24-source"><strong>'+E(source.publisher)+'・3年の公式評価計画に基づく独自文例</strong>'+
 '<p class="small muted">教材名と学習活動に基づく例です。出版社が作った所見文ではありません。使用した授業と実際の児童の姿を確認してください。</p>'+
 '<a href="'+E(source.url)+'" target="_blank" rel="noopener noreferrer">公式の年間指導計画・評価計画を確認</a></div>';
}
const v24OldSearchHTML=v22SearchHTML;
v22SearchHTML=function(){
 const base=v24OldSearchHTML();
 if(!V24_SOURCE[V22_SEARCH.subject])return base;
 return base.replace('<div class="panel wide v22-search">','<div class="panel wide v22-search">'+v24SourceBar());
};
const v24Style=document.createElement('style');
v24Style.textContent='.v24-source{margin-bottom:14px;padding:12px 14px;background:#f3f8f2;border:1px solid #dae8d8;border-radius:13px}.v24-source p{margin:5px 0 8px}.v24-source a{font-size:12px;color:#356958;text-decoration:underline}';
document.head.appendChild(v24Style);
