/* 所見メーカー STUDIO v2.3: all-subject, all-grade search of approved built-in examples.
 * Search is distinct from the user's editable bank; adding a result is an explicit action. */
const V22_SEARCH={grade:3,subject:'国語',query:'',axis:'',limit:20};
const V22_AXIS={knowledge:'知識・技能',thinking:'思考・判断・表現',attitude:'主体的に学習に取り組む態度',custom:'自作文例'};
const V22_ALL_SUBJECTS=['国語','算数','理科','社会','生活','音楽','図工','体育','家庭','外国語活動','外国語','道徳','生活・特別活動','学習全般'];
function v22Norm(x){return String(x||'').normalize('NFKC').toLowerCase().replace(/[\s　]/g,'').replace(/筆算/g,'ひっ算')}
function v22MakeIndex(){
 const collected=[];
 const push=(grade,subject,unit,axis,text,source,details='')=>{
  if(!String(text||'').trim()||/【実際の姿を確かめて|【実際の活動を確かめて/.test(text)||subject==='総合的な学習の時間')return;
  collected.push({grade:Number(grade),subject,unit,axis:V22_AXIS[axis]||axis||'参考文例',criterion:V22_AXIS[axis]||axis||'',rawAxis:axis,text,source,details});
 };
 // Canonical reviewed samples. Do not confuse these with user-saved or generated examples.
 for(const x of V20_CURATED)push(x.grade,x.subject,x.unit,x.axis,x.text,'校正済み文例',x.source);
 // The original detailed teacher examples, including the science experiments.
 for(const u of V6_EXAMPLES){
  for(const axis of ['knowledge','thinking','attitude'])for(const text of u[axis]||[])
   push(u.grade,u.subject,u.unit,axis,text,'単元別文例',u.publisher||'教材を照合');
 }
 // PE has its own rich field/skill navigation and is included for keyword search as well.
 for(const x of V21_PE_ROWS){
  for(const grade of (x.band==='low'?[1,2]:x.band==='mid'?[3,4]:[5,6]))
   push(grade,'体育',x.sport,x.axis,x.text,'体育｜技・動き別',V21_BANDS[x.band]+'・'+x.domain+'・'+x.skill);
 }
 // User-saved bank stays untouched; only read it as an optional search source.
 for(const b of S.bank||[]){
  push(b.grade,b.subject,b.unit||'自由文例','custom',b.text,'保存済みの文例',b.tag||'自分の文例');
 }
 const seen=new Set(),out=[];
 for(const x of collected){
  const key=[x.grade,x.subject,v22Norm(x.unit),v22Norm(x.text)].join('|');
  if(seen.has(key))continue;seen.add(key);out.push({...x,index:out.length});
 }
 return out;
}
function v22Find(index){
 let items=index.filter(x=>x.grade===Number(V22_SEARCH.grade));
 if(V22_SEARCH.subject)items=items.filter(x=>x.subject===V22_SEARCH.subject);
 if(V22_SEARCH.axis)items=items.filter(x=>x.rawAxis===V22_SEARCH.axis);
 const terms=String(V22_SEARCH.query||'').split(/[／/、,・　\s]+/).map(v22Norm).filter(Boolean);
 if(terms.length){
  // A full unit title takes priority over a mention of that title in another lesson's comment.
  const exact=terms.length===1?items.filter(x=>v22Norm(x.unit)===terms[0]):[];
  if(exact.length)items=exact;
  else items=items.filter(x=>{
   const hay=v22Norm([x.subject,x.unit,x.text,x.source,x.details].join(' '));
   return terms.every(term=>hay.includes(term));
  });
 }
 return items;
}
function v22SearchHTML(){
 const all=v22MakeIndex(),items=v22Find(all),show=items.slice(0,V22_SEARCH.limit);
 const subjects=V22_ALL_SUBJECTS.filter(x=>all.some(v=>v.grade===Number(V22_SEARCH.grade)&&v.subject===x));
 return header('校正済み文例を検索','体育だけでなく、国語・算数・理科なども、学年・教科・単元・言葉から探せます。')+
 '<div class="panel wide v22-search">'+
 '<div class="v22-controls">'+
 field('学年','<select data-v22-filter="grade">'+[1,2,3,4,5,6].map(v=>option(v,V22_SEARCH.grade)).join('')+'</select>')+
 field('教科','<select data-v22-filter="subject">'+['',...subjects].map(v=>'<option value="'+E(v)+'"'+(v===V22_SEARCH.subject?' selected':'')+'>'+E(v||'すべての教科')+'</option>').join('')+'</select>')+
 field('評価観点','<select data-v22-filter="axis">'+[['','すべて'],...Object.entries(V22_AXIS)].map(([v,t])=>'<option value="'+E(v)+'"'+(V22_SEARCH.axis===v?' selected':'')+'>'+E(t)+'</option>').join('')+'</select>')+
 '</div><div class="field v22-query"><label>単元名・技・キーワード</label><input data-v22-query="1" value="'+E(V22_SEARCH.query)+'" placeholder="例：すがたをかえる大豆／電気／友だちとの比較"><button class="btn primary" type="button" data-v22-action="search" style="margin-top:8px">検索する</button></div>'+
 '<div class="inline between"><span class="small muted">検索結果：'+items.length+'件　（表示 '+show.length+'件）</span>'+
 '<button class="btn softbtn" type="button" data-v22-action="reset">検索条件を戻す</button></div>'+
 (V22_SEARCH.subject==='体育'?'<div class="notice small">体育はさらに「領域 → 種目 → 技」で探せます。 <button class="btn softbtn" type="button" data-v22-action="pe">体育の種目別検索へ</button></div>':'')+
 (items.length?'<div class="v22-results">'+show.map(x=>
  '<article class="v22-result"><div class="inline v22-tags"><span class="tag">'+x.grade+'年</span><span class="tag">'+E(x.subject)+'</span><span class="tag">'+E(x.axis)+'</span></div>'+
  '<h3>'+E(x.unit)+'</h3><p class="v22-comment">'+E(x.text)+'</p>'+
  '<p class="v22-source">'+E(x.source)+(x.details?' ／ '+E(x.details):'')+'</p>'+
  '<div class="inline"><button class="btn softbtn" data-v22-action="copy" data-v22-index="'+x.index+'">文章をコピー</button>'+
  '<button class="btn" data-v22-action="save" data-v22-index="'+x.index+'">自分の文例バンクに追加</button></div></article>').join('')+'</div>'+
  (show.length<items.length?'<button class="btn v22-more" data-v22-action="more">さらに表示する</button>':''):
  '<div class="notice">この条件に合う校正済み文例はまだありません。別の単元名で探すか、検索条件を広げてください。内容の薄い自動ひな形は表示していません。</div>')+
 '<div class="warning small">これらは所見の編集用参考文例です。教科書・単元と実際の児童の学習場面を確認して使ってください。自分の文例バンクへの追加はボタンを押したときだけ行います。</div>'+
 '</div>';
}
const v22PriorRender=render;
render=function(){
 if(page==='examples-search'){renderTop();$('main').innerHTML=v22SearchHTML();return}
 v22PriorRender();
};
V17_GROUPS['examples-search']='prepare';
V17_TOOLNAMES['examples-search']='校正済み文例を検索';
V17_TOOLPAGES.prepare.unshift('examples-search');
const v22PriorStage=v17StageHTML;
v17StageHTML=function(){
 const h=v22PriorStage();
 if(page!=='stage-prepare')return h;
 return h.replace('<div class="v17-steps">',
  '<div class="notice v22-quick"><strong>文例を探したいときはここから</strong>　国語・算数・理科・外国語活動などの校正済み文例を検索できます。'+
  '<div style="margin-top:8px"><button class="btn primary" data-action="page" data-page="examples-search">学年・教科・単元から文例を検索 →</button></div></div>'+
  '<div class="v17-steps">');
};
const v22PriorBank=bankHTML;
bankHTML=function(){
 return '<div class="notice v22-quick" style="margin-bottom:12px"><strong>文例が見つからないときは</strong>：この画面は自分で保存した文例の一覧です。校正済みの文例は別の検索画面で探せます。 '+
 '<button class="btn primary" data-action="page" data-page="examples-search">校正済み文例を検索</button></div>'+v22PriorBank();
};
const v22PriorUnitHTML=v4UnitHTML;
v4UnitHTML=function(){
 if(v4Subject==='体育'&&v7PeMode==='実技')return v22PriorUnitHTML();
 return '<div class="notice v22-quick"><strong>文例の横断検索</strong>　出版社の設定にかかわらず、校正済み文例を学年・教科・単元から探せます。 '+
 '<button class="btn primary" data-v22-action="jump-search">文例を検索する</button></div>'+v22PriorUnitHTML();
};
const v22PriorSubjects=v8Subjects;
v8Subjects=function(c,t){
 const o=v22PriorSubjects(c,t);
 if(t==='総合所見'&&c.grade>=3&&c.grade<=4&&!o.includes('外国語活動'))o.push('外国語活動');
 return o;
};
const v22PriorEditHTML=editHTML;
editHTML=function(){
 return '<div class="notice v22-quick"><strong>文例が探せない場合</strong>　国語・算数・理科なども、校正済みの文例を横断検索できます。 <button class="btn primary" data-action="page" data-page="examples-search">文例検索へ</button></div>'+v22PriorEditHTML();
};
document.addEventListener('change',e=>{
 const field=e.target.dataset?.v22Filter;if(!field)return;
 V22_SEARCH[field]=field==='grade'?Number(e.target.value):e.target.value;
 if(field==='grade')V22_SEARCH.subject='';
 V22_SEARCH.limit=20;render();
});
document.addEventListener('input',e=>{
 if(!e.target?.dataset?.v22Query)return;
 V22_SEARCH.query=e.target.value;
 const count=document.querySelector('.v22-query');
 // Do not rerender while typing: that would interrupt Japanese IME composition.
 if(count)count.classList.add('v22-edited');
});
document.addEventListener('change',e=>{
 if(!e.target?.dataset?.v22Query)return;
 V22_SEARCH.query=e.target.value;
 V22_SEARCH.limit=20;render();
});
document.addEventListener('keydown',e=>{
 if(e.key!=='Enter'||!e.target?.dataset?.v22Query)return;
 e.preventDefault();e.target.blur();
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v22-action]');if(!b)return;
 const action=b.dataset.v22Action;
 if(action==='jump-search'){
  V22_SEARCH.grade=Number(v4Grade)||3;
  V22_SEARCH.subject=v4Subject==='体育'?'体育':v4Subject;
  V22_SEARCH.query='';V22_SEARCH.axis='';V22_SEARCH.limit=20;
  page='examples-search';render();return;
 }
 if(action==='pe'){v4Subject='体育';v7PeMode='実技';v4Grade=Number(V22_SEARCH.grade);page='unit-bank';render();return}
 if(action==='search'){V22_SEARCH.query=document.querySelector('[data-v22-query]')?.value||V22_SEARCH.query;V22_SEARCH.limit=20;render();return}
 if(action==='reset'){V22_SEARCH.subject='国語';V22_SEARCH.query='';V22_SEARCH.axis='';V22_SEARCH.limit=20;render();return}
 if(action==='more'){V22_SEARCH.limit+=20;render();return}
 const entry=v22MakeIndex()[Number(b.dataset.v22Index)];
 if(!entry)return;
 if(action==='copy'){copyText(entry.text);return}
 if(action==='save'){
  if(S.bank.some(x=>Number(x.grade)===entry.grade&&x.subject===entry.subject&&v22Norm(x.text)===v22Norm(entry.text))){
   toast('同じ文例はすでに自分のバンクにあります');return;
  }
  if(!confirm(entry.subject+'「'+entry.unit+'」の文例を自分のバンクに追加しますか？'))return;
  const axis=['knowledge','thinking','attitude'].includes(entry.rawAxis)?entry.rawAxis:'';
  S.bank.push({id:S.nextId++,grade:entry.grade,subject:entry.subject,unit:entry.unit,text:entry.text,
   criterion:axis,tag:'検索から追加・内容要確認'});
  toast('文例バンクに追加しました。実際の児童の姿に合わせて使ってください');
 }
});
const v22CSS=document.createElement('style');
v22CSS.textContent='.v22-search{padding:19px}.v22-controls{display:grid;grid-template-columns:1fr 1.3fr 1.4fr;gap:12px}.v22-query{margin:12px 0}.v22-query input{width:100%;padding:12px}.v22-results{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:15px 0}.v22-result{border:1px solid #d9e5d9;border-radius:14px;background:#fffdfa;padding:14px;min-width:0}.v22-result h3{margin:8px 0;font-size:15px}.v22-tags{gap:6px;flex-wrap:wrap}.v22-comment{line-height:1.85;white-space:pre-wrap}.v22-source{font-size:11px;color:#688070;line-height:1.6}.v22-more{display:block;margin:14px auto}.v22-quick{margin-bottom:14px}.v22-pickerlink{margin:10px 0}.v22-edited input{outline-color:#87ab96}@media(max-width:740px){.v22-results{grid-template-columns:1fr}.v22-controls{grid-template-columns:1fr 1fr}.v22-controls>.field:nth-child(3){grid-column:1/-1}}';
document.head.appendChild(v22CSS);

/* STUDIO v2.3 - Art education: source-aware, original teacher-editable examples.
 * Publisher materials: Nihon Bunkyo Shuppan R6 3-4 upper annual plan / assessment criteria.
 * These are NOT official publisher-issued report comments; pupil evidence must be checked.
 */
const V23_ART_SOURCE='https://www.nichibun-g.co.jp/textbooks/zuko/download/r6/r6_zuko_nenkei_hyouka_34jo.pdf';
const V23_ART=[];
function v23Art(unit,activity,page,examples){
 const prefix='図工の「'+unit+'」の学習では、';
 for(const [axis,rows] of Object.entries(examples)){
  for(const text of rows){
   V23_ART.push({grade:3,subject:'図工',publisher:'日本文教出版',unit,axis,text:prefix+text,
    activity,sourceUrl:V23_ART_SOURCE,sourceLabel:'日本文教出版 令和6年度版「3・4上」年間指導計画・評価規準（'+page+'）／文例は独自作成'});
  }
 }
}
// 3・4上：学校で使う出版社と、実施した活動を必ず照合する。
v23Art('絵のぐ＋水＋ふで＝いいかんじ！','水彩絵の具・水の量・筆の動き・色づくり・鑑賞','p.10–11',{
 knowledge:[
 '水の量を変えると色の濃さが変わることに気付き、絵の具の濃淡を使い分けて描くことができました。',
 '筆先や筆の側面を使い分け、細い線や幅の広い線を描くことができました。',
 '絵の具を混ぜて色をつくり、色の組合せによって違う感じになることを確かめることができました。'],
 thinking:[
 '水を多く含ませたときの色の広がり方から表したい形を見付け、筆の動かし方を工夫して描いていました。',
 '明るい色と暗い色を組み合わせ、表したい雰囲気が伝わるように色を選んでいました。',
 '友だちがつくった色や筆の跡を見て、自分とは異なる表し方のよさを具体的に伝えていました。'],
 attitude:[
 '絵の具と水の割合を繰り返し変えながら、気に入った色や形を探していました。',
 '色の混ぜ方や筆の動かし方を試し、自分が表したい感じに近付くように描き進めていました。']
});
v23Art('うごいて楽しいわりピンワールド','割りピンで動く仕組み・形・色・鑑賞','p.12–13',{
 knowledge:[
 '割りピンを使った動く仕組みを理解し、紙の部品を組み合わせて動かすことができました。',
 'はさみで切った形を割りピンでつなぎ、部品が動くことを確かめながら作品をつくることができました。',
 '形の重なり方や割りピンを留める位置によって、動き方が変わることに気付くことができました。'],
 thinking:[
 '部品を動かして生まれる形から発想を広げ、動きを生かした作品を考えていました。',
 '表したい動きに近付けるため、割りピンを留める位置や部品の大きさを工夫していました。',
 '友だちの作品を実際に動かし、自分の作品とは違う仕組みや動きの面白さを伝えていました。'],
 attitude:[
 '部品をつなぐ位置を変えて何度も動かし、より面白い動きになるよう試していました。',
 '思いどおりに動かない場面でも部品の形や重ね方を調整しながら、作品づくりを進めていました。']
});
v23Art('ひもでつないで','ひもで場所や物をつなぐ・形や色を考える','p.14–15',{
 knowledge:[
 'ひもを結んだりつないだりして、身近な場所に新しい形をつくることができました。',
 'ひもの張り方や結ぶ位置によって形の見え方が変わることに気付き、場所に合わせて活動できました。',
 'ひもの長さや結び方を確かめ、つないだ形が保たれるようにすることができました。'],
 thinking:[
 '教室や校庭の形を生かし、ひもをどこにつなぐと面白い形になるか考えていました。',
 'ひもを交差させたり高さを変えたりして、空間の見え方が変わるよう工夫していました。',
 '友だちとつくった空間をいろいろな方向から見て、形の重なりの面白さを伝えていました。'],
 attitude:[
 '場所を変えてひもをつなぎ直し、思い付いた形を進んで試していました。',
 '友だちとつなぐ場所を相談しながら、できた形をさらに広げようとしていました。']
});
v23Art('立ち上がった絵のせかい','紙を立たせて表と裏の世界を表す','p.16–17',{
 knowledge:[
 '紙に折り目を付けたり切り込みを入れたりして、絵が立つ形をつくることができました。',
 '絵の具やペンを使い、立たせた紙の表と裏に違う場面を描くことができました。',
 '紙の形や折り方を工夫し、自分で立つように組み立てることができました。'],
 thinking:[
 '紙を立たせることで見える表と裏の違いから発想し、二つの場面をつなぐ作品を考えていました。',
 '見る方向によって絵の印象が変わるように、紙の向きや配置を工夫していました。',
 '友だちの作品を回り込んで鑑賞し、表と裏を生かした表現の面白さに気付いていました。'],
 attitude:[
 'さまざまな紙の立たせ方を試し、思い付いた場面を形にしようとしていました。',
 '立てた紙が倒れたときも折り方や置き方を見直しながら、表したい世界をつくり続けていました。']
});
v23Art('空きようきのへんしん','空き容器と紙粘土で使えるものを考える','p.18–19',{
 knowledge:[
 '空き容器の形を生かし、紙粘土を付けて表面の形を変えながら作品をつくることができました。',
 '紙粘土と絵の具を使い、使い道に合った形や色に仕上げることができました。',
 '容器の形や大きさを確かめ、安定して置けるように作品をつくることができました。'],
 thinking:[
 '何を入れて使うかを考え、空き容器の特徴に合った作品を発想していました。',
 '手で触れたときの感じや使いやすさを考え、紙粘土の厚みや形を調整していました。',
 '友だちの作品を見たり使い方を聞いたりして、形と使い道を結び付けた工夫に気付いていました。'],
 attitude:[
 '紙粘土を付ける量や位置を変えながら、思い描いた形に近付けようとしていました。',
 '実際に使う場面を想像し、必要な部分を付け足すなどして作品をつくり進めていました。']
});
v23Art('あの日あの時の気もち','心に残った出来事・その時の気持ち・色と構図','p.20–21',{
 knowledge:[
 '絵の具やクレヨンを使い分け、表したい場面に合わせた色や線で描くことができました。',
 '色の明るさや塗り方を工夫し、そのときの気持ちが伝わる画面に仕上げることができました。',
 '人物や周囲の物の大きさを考え、場面の様子が分かるように描くことができました。'],
 thinking:[
 '心に残っている出来事を振り返り、特に伝えたい場面を選んで絵に表していました。',
 'うれしかったときの様子が伝わるよう、人物の表情や体の動きを工夫して描いていました。',
 '友だちの作品を見て、色や人物の描き方からどのような気持ちが伝わるか話していました。'],
 attitude:[
 '思い出の場面を何度も振り返り、気持ちに合う色や描き方を考えながら取り組んでいました。',
 '表したい様子に近付けようと、人物の位置や周りの描き方を見直しながら描き進めていました。']
});
v23Art('お気に入りの葉','葉の形・色・葉脈などの鑑賞、表現は実施した場合のみ','p.27–28',{
 knowledge:[
 '葉の形や色を比べ、縁の形や葉脈の違いに気付くことができました。',
 '集めた葉を並べて観察し、同じように見える葉にも形や色の違いがあることを捉えていました。'],
 thinking:[
 'お気に入りの葉を選んだ理由を、形や色の特徴と結び付けて友だちに伝えることができました。',
 '葉の重なり方や色の組合せから面白さを見つけ、自分の感じたことを説明していました。',
 'ほかの葉と比べることで、自分が選んだ葉の特徴をさらに詳しく捉えていました。'],
 attitude:[
 '形や色の異なる葉を進んで探し、気に入った葉の特徴を確かめていました。',
 '友だちが選んだ葉にも目を向け、自分では気付かなかった形や色のよさを見付けようとしていました。']
});
v23Art('クミクミックス','段ボールの板と切り込み・形の組合せ','p.40–41',{
 knowledge:[
 '段ボールの板に切り込みを入れ、接着剤を使わずに形を組み合わせることができました。',
 '段ボールを切る用具を安全に扱い、板の向きや切り込みを調整して組み立てることができました。',
 '切り込みの深さや向きによって、組み合わせた形の立ち方が変わることを確かめていました。'],
 thinking:[
 '組み合わせてできた形をいろいろな方向から見て、次につなげたい形を考えていました。',
 '思い付いた形を立たせるため、段ボールの組み合わせ方や支え方を工夫していました。',
 '友だちとつくった形を見合い、板の重なりや高さによる面白さを具体的に伝えていました。'],
 attitude:[
 '板が倒れたときに切り込みの位置を変え、組み合わせ方を何度も試していました。',
 '友だちと協力して段ボールを組み合わせ、思い付いた形をさらに広げようとしていました。']
});
v23Art('いろいろうつして','版の材料・写す手順・色と配置','p.44–45',{
 knowledge:[
 '版に使う材料の形を生かし、絵の具を付けて紙に写すことができました。',
 '写すときの絵の具の量や押さえ方を調整し、形がはっきり出るように工夫できました。',
 '材料の表面によって写る模様が変わることに気付き、違いを生かして表していました。'],
 thinking:[
 '写してできた形を見て発想を広げ、次に写す位置や色を考えていました。',
 '模様を重ねたときの見え方を確かめ、色や形の組合せを工夫していました。',
 '友だちの作品を鑑賞し、版の材料の使い方や模様の重ね方のよさを見付けていました。'],
 attitude:[
 '同じ材料でも絵の具の量や写し方を変え、いろいろな模様を試していました。',
 '思い付いた表し方を確かめるために繰り返し試し刷りをし、配置を見直していました。']
});
v23Art('マグネットマジック','磁石で動かす仕組み・工作・遊びながら鑑賞','p.46–47',{
 knowledge:[
 '磁石の引き合う性質を使い、紙の上の飾りを動かす工作をつくることができました。',
 '磁石を取り付ける位置や厚紙の厚さを確かめ、思いどおりに動く仕組みをつくることができました。',
 '紙や段ボールを切って形を組み合わせ、動きを生かした作品に仕上げることができました。'],
 thinking:[
 '磁石の動きから発想を広げ、動くと面白いものを考えて形や色を工夫していました。',
 '思い描いた動きに近付けるため、磁石の位置や動かし方を試しながら作品を調整していました。',
 '友だちの作品を動かして遊び、仕組みや表現の工夫を見付けて伝えていました。'],
 attitude:[
 'うまく動かないときも磁石の向きや位置を変え、繰り返し動きを確かめていました。',
 '遊ぶ人が楽しめるように、動き方や飾り方を見直しながら作品を仕上げていました。']
});
v23Art('絵を見て話そう','絵画の鑑賞・形や色を根拠に伝える','p.48–49',{
 knowledge:[
 '絵に使われている形や色の違いに気付き、気になった部分を指し示して伝えることができました。',
 '絵の中の色の組合せや描き方による印象の違いに気付くことができました。'],
 thinking:[
 '絵の中で気に入ったところを選び、色や形を根拠に感じたことを話していました。',
 '友だちの見方を聞いて、同じ絵にも異なる面白さがあることに気付いていました。',
 '絵の中の人物や物の位置関係から、どのような場面か想像して伝えていました。'],
 attitude:[
 '気になる部分を繰り返し見直し、色や形の特徴を探していました。',
 '友だちの発言を聞いて絵を見直し、新たに見付けたことを伝えようとしていました。']
});


// Search index is extended without mutating the learner's saved comments.
let V23_PUBLISHER_FILTER='すべて';
const v23OldSearchIndex=v22MakeIndex;
v22MakeIndex=function(){
 const all=v23OldSearchIndex(),seen=new Set(all.map(x=>[x.grade,x.subject,v22Norm(x.unit),v22Norm(x.text)].join('|')));
 for(const a of V23_ART){
  const key=[a.grade,a.subject,v22Norm(a.unit),v22Norm(a.text)].join('|');
  if(seen.has(key))continue;
  seen.add(key);
  all.push({grade:a.grade,subject:a.subject,unit:a.unit,axis:V22_AXIS[a.axis],criterion:V22_AXIS[a.axis],
   rawAxis:a.axis,text:a.text,source:'公式資料を参照した独自文例',details:a.activity,
   publisher:a.publisher,sourceUrl:a.sourceUrl,sourceLabel:a.sourceLabel,index:all.length});
 }
 return all;
};
const v23OldFind=v22Find;
v22Find=function(idx){
 let data=v23OldFind(idx);
 if(V22_SEARCH.subject==='図工')data=[...data].sort((a,b)=>Number(b.publisher==='日本文教出版')-Number(a.publisher==='日本文教出版'));
 if(V22_SEARCH.subject==='図工'&&V23_PUBLISHER_FILTER!=='すべて'){
  data=data.filter(x=>V23_PUBLISHER_FILTER==='日本文教出版'?
   x.publisher==='日本文教出版':!x.publisher);
 }
 return data;
};
function v23PublisherChoices(){
 return '<div class="v23-source"><strong>図工の出版社・資料</strong>'+
 '<label class="field">検索対象'+
 '<select data-v23-publisher>'+
 ['すべて','日本文教出版','過去の所見・出版社未確認'].map(x=>option(x,V23_PUBLISHER_FILTER)).join('')+
 '</select></label>'+
 '<p class="small muted">「日本文教出版」は令和6年度版3・4上の題材別指導計画・評価規準をもとに作成。過去の文例は出版社未照合なので区別して表示します。</p>'+
 '<a href="'+V23_ART_SOURCE+'" target="_blank" rel="noopener noreferrer">出版社の年間指導計画・評価規準（公式PDF）を確認</a>'+
 '</div>';
}
const v23OldSearchHTML=v22SearchHTML;
v22SearchHTML=function(){
 const html=v23OldSearchHTML();
 if(V22_SEARCH.subject!=='図工')return html;
 const marker='<div class="panel wide v22-search">';
 return html.replace(marker,marker+v23PublisherChoices());
};
document.addEventListener('change',e=>{
 if(!e.target?.dataset?.v23Publisher)return;
 V23_PUBLISHER_FILTER=e.target.value;
 V22_SEARCH.limit=20;render();
});
// Non-PE picker: retain freehand/saved examples and offer textbook-labelled unit examples.
const v23OldAvailable=v8Available;
v8Available=function(c,subject){
 const current=v23OldAvailable(c,subject);
 if(subject!=='図工'||Number(c.grade)!==3)return current;
 const set=(S.textbooks||{})['3:図工']||'未設定';
 if(set!=='未設定'&&set!=='日本文教出版')return current;
 const groups=new Map();
 for(const a of V23_ART){
  if(!groups.has(a.unit))groups.set(a.unit,[]);
  groups.get(a.unit).push(a);
 }
 for(const [unit,rows] of groups){
  const old=current.find(x=>v22Norm(x.unit)===v22Norm(unit));
  const saved=old?.choices.filter(x=>String(x.id).startsWith('bank:'))||[];
  const target=old||{id:'v23|日本文教出版|'+unit,unit,publisher:'日本文教出版',domain:'出版社資料に基づく参考',choices:[]};
  target.publisher='日本文教出版';target.domain='日本文教出版・3／4上';
  target.choices=rows.map((x,i)=>({id:'v23:'+x.axis+':'+i,axis:V22_AXIS[x.axis]+'｜資料照合例',text:x.text})).concat(saved);
  if(!old)current.push(target);
 }
 return current;
};
const v23OldUnitOptions=v4UnitOptions;
v4UnitOptions=function(){
 const old=v23OldUnitOptions();
 if(v4Subject!=='図工'||Number(v4Grade)!==3||v4Pub(3,'図工')!=='日本文教出版')return old;
 const units=[...new Set(V23_ART.map(x=>x.unit))];
 for(const unit of units){
  if(old.some(x=>v22Norm(x.unit)===v22Norm(unit)))continue;
  old.push({grade:3,subject:'図工',unit,publisher:'日本文教出版',texts:[],domain:'出版社資料に基づく参考'});
 }
 return old;
};
const v23OldData=v6Data;
v6Data=function(u){
 if(u?.subject==='図工'&&Number(u.grade)===3&&u.publisher==='日本文教出版'){
  const rows=V23_ART.filter(x=>v22Norm(x.unit)===v22Norm(u.unit));
  if(rows.length)return {knowledge:rows.filter(x=>x.axis==='knowledge').map(x=>x.text),
   thinking:rows.filter(x=>x.axis==='thinking').map(x=>x.text),
   attitude:rows.filter(x=>x.axis==='attitude').map(x=>x.text)};
 }
 return v23OldData(u);
};
const v23Style=document.createElement('style');
v23Style.textContent='.v23-source{padding:12px 14px;background:#f6faf3;border:1px solid #dce9da;border-radius:13px;margin-bottom:14px}.v23-source .field{display:inline-flex;flex-direction:column;gap:4px;max-width:340px;width:100%;margin:8px 0}.v23-source p{margin:6px 0 10px}.v23-source a{font-size:12px;color:#366a58;text-decoration:underline}';
document.head.appendChild(v23Style);
