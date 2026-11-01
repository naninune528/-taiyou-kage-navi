/* STUDIO v1.9 - third-grade curriculum pilot, instant editable templates, textbook-only local preferences.
   Unit names are reference catalogs, not a live connection to publishers or an AI service.
   Observations and report comments never enter this catalog or its storage key. */
const V19_PUBLISHER_KEY='shoken-studio.textbook-publishers.v1';
const V19_CATALOG=[
 {grade:3,subject:'理科',publisher:'東京書籍',units:[
 '春の生き物','たねまき','チョウのかんさつ','どれぐらい育ったかな',
 '風やゴムのはたらき','花がさいたよ','実ができたよ','こん虫のかんさつ',
 '太陽とかげ','太陽の光','音のせいしつ','物の重さ','電気の通り道','じしゃくのせいしつ']},
 {grade:3,subject:'国語',publisher:'光村図書',units:[
 '春風をたどって','国語辞典を使おう','漢字の音と訓','もっと知りたい、友だちのこと',
 'こまを楽しむ','まいごのかぎ','俳句を楽しもう','こそあど言葉を使いこなそう',
 '仕事のくふう、見つけたよ','本で知ったことをクイズにしよう','ローマ字',
 'ちいちゃんのかげおくり','修飾語を使って書こう','おすすめの一さつを決めよう',
 'すがたをかえる大豆','食べ物のひみつを教えます','ことわざ・故事成語',
 '三年とうげ','わたしの町のよいところ','ありの行列','たから島のぼうけん',
 'お気に入りの場所、教えます','モチモチの木']},
 {grade:3,subject:'算数',publisher:'東京書籍',units:[
 'かけ算','時こくと時間','わり算','たし算とひき算の筆算','長さ',
 '表とグラフ','暗算','あまりのあるわり算','大きな数',
 'かけ算の筆算（１）','大きな数のわり算','円と球','小数','重さ',
 '分数','□を使った式','かけ算の筆算（２）','倍の計算','三角形と角']}
];
const V19_UNIT_FOCUS={
 '春の生き物':['見つけた生き物の姿や様子を観察して記録する','観察した生き物の特徴を比べて考える'],
 'たねまき':['種の形や大きさを観察して記録する','植物が育つために必要な世話について考える'],
 'チョウのかんさつ':['チョウの育ち方を順に整理する','幼虫と成虫の姿を比べて考える'],
 'こん虫のかんさつ':['こん虫のからだのつくりを捉える','複数の生き物の体の特徴を比べる'],
 '風やゴムのはたらき':['風やゴムの力による物の動き方を確かめる','条件を変えた実験結果を比べて考える'],
 '太陽とかげ':['太陽の位置と影の向きの関係を観察する','時刻ごとの観察結果を根拠に説明する'],
 '太陽の光':['日光の進み方や集めた光の様子を確かめる','実験結果を比べて光の性質を考える'],
 '音のせいしつ':['音を出している物の様子を確かめる','音の大きさと振動の様子を関係付けて考える'],
 '物の重さ':['形や体積と重さの関係を確かめる','条件をそろえて測定結果を比べる'],
 '電気の通り道':['豆電球がつくつなぎ方や電気を通す物を確かめる','実験結果の共通点を見つけて理由を説明する'],
 'じしゃくのせいしつ':['磁石につく物や極の性質を確かめる','磁石を使った結果を比較して性質を考える'],
 'ちいちゃんのかげおくり':['場面の様子を本文の言葉から読み取る','二つのかげおくりを比べて気持ちを考える'],
 'すがたをかえる大豆':['段落ごとの役割や説明の工夫を捉える','事例と筆者の伝え方を結び付けて説明する'],
 'こまを楽しむ':['文章の組み立てや中心となる事柄を捉える','こまの特徴を説明する部分を比べて読む'],
 '仕事のくふう、見つけたよ':['調べたことを段落に分けて整理する','仕事の工夫とその理由を具体例で説明する'],
 'あまりのあるわり算':['商と余りの意味を理解して計算する','場面に応じて余りの扱いを考える'],
 '小数':['小数の表し方や大きさを理解する','数直線などを使って数の大きさを説明する']
};
function v19Templates(subject,unit){
 const focus=V19_UNIT_FOCUS[unit];
 const pre=(subject==='道徳'||subject==='外国語活動'?'':subject+'の')+'「'+unit+'」の学習では、';
 const one=focus?.[0]||'学習した内容や方法を確かめる';
 const two=focus?.[1]||'学んだことを比べたり、理由を考えたりする';
 return [
  {id:'v19:knowledge',axis:'ひな形・知識技能',text:pre+'【実際の活動を確かめて】'+one+'ことができました。'},
  {id:'v19:thinking',axis:'ひな形・思考判断表現',text:pre+'【実際の活動を確かめて】'+two+'ことができました。'},
  {id:'v19:attitude',axis:'ひな形・主体的な態度',text:pre+'【実際の姿を確かめて】自分の考えを試したり見直したりしながら、学習に取り組んでいました。'}
 ];
}
function v19LoadTextbooks(){
 try{
  const raw=localStorage.getItem(V19_PUBLISHER_KEY);
  if(!raw)return;
  const saved=JSON.parse(raw);
  if(!saved||typeof saved!=='object'||Array.isArray(saved))return;
  S.textbooks=S.textbooks||{};
  const allowed=Object.keys(V4_PUBLISHERS);
  for(const [key,value] of Object.entries(saved)){
   const match=key.match(/^([1-6]):(.+)$/);
   if(!match||!allowed.includes(match[2])||typeof value!=='string'||value.length>80)continue;
   if(!S.textbooks[key]||S.textbooks[key]==='未設定')S.textbooks[key]=value;
  }
 }catch(_){}
}
function v19SaveTextbooks(){
 try{
  const out={};
  for(const [key,value] of Object.entries(S.textbooks||{})){
   if(/^[1-6]:/.test(key)&&typeof value==='string'&&value.length<=80&&value!=='未設定')out[key]=value;
  }
  localStorage.setItem(V19_PUBLISHER_KEY,JSON.stringify(out));
  return true;
 }catch(_){return false}
}
v19LoadTextbooks();
const v19AvailablePrior=v8Available;
v8Available=function(c,subject){
 const found=v19AvailablePrior(c,subject),publisher=v4Pub(c.grade,subject);
 const catalog=V19_CATALOG.find(x=>x.grade===c.grade&&x.subject===subject&&x.publisher===publisher);
 if(catalog){
  for(const unit of catalog.units){
   if(!found.some(x=>x.unit===unit))found.push({id:publisher+'┃┃'+unit,publisher,unit,domain:'',choices:[]});
  }
 }
 for(const u of found){
  if(!u.choices.length)u.choices=v19Templates(subject,u.unit);
 }
 return found;
};
const v19PickerPrior=v8Picker;
v8Picker=function(c,t,n){
 const html=v19PickerPrior(c,t,n),st=v8Selection(c,t,n),pub=v4Pub(c.grade,st.subject);
 if(!st.subject)return html;
 const units=v8Available(c,st.subject),chosen=units.find(u=>u.id===st.unit);
 const catalog=V19_CATALOG.some(x=>x.grade===c.grade&&x.subject===st.subject&&x.publisher===pub);
 const note='<div class="v19-advice">'+
 (chosen&&chosen.choices.some(x=>x.id.startsWith('v19:'))?
  'この単元の3候補は編集用のひな形です。「【実際の活動を確かめて】」などを消し、観察した姿に合わせて修正してください。':
  catalog?'この教科書の単元を一部収録しています。表示されない単元は下の「登録のない単元・文例から所見を作る」で直接入力できます。':
  'この出版社の全単元はまだ収録されていません。下の入力欄から単元名を直接指定できます。')+
 '</div>';
 return html+note;
};
const v19Style=document.createElement('style');
v19Style.textContent='.v19-advice{font-size:11px;line-height:1.6;background:#fff8ec;border:1px solid #ecdfc7;color:#795c36;border-radius:9px;padding:9px 12px;margin:8px 0 12px}.v18-freeunit summary{font-size:14px!important;letter-spacing:0!important}';
document.head.appendChild(v19Style);
const v19SettingsPrior=settingsHTML;
settingsHTML=function(){
 return v19SettingsPrior()+'<div class="notice small" style="margin:12px 0">教科書会社の選択だけは、この端末に保存します。児童の所見本文は保存しません（従来どおり自動保存は別設定）。参考単元一覧は、現在3年の国語・算数・理科の一部出版社から整備中です。</div>';
};
document.addEventListener('change',e=>{
 const el=e.target;
 if(el?.dataset?.v18Setting==='publisher'||el?.id==='v4-publisher')v19SaveTextbooks();
});
window.addEventListener('pagehide',v19SaveTextbooks);
