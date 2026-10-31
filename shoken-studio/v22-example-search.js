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
  '<p class="v22-source">'+E(x.source)+(x.details?' ／ '+E(x.details):'')+(x.sourceUrl?' ／ <a href="'+E(x.sourceUrl)+'" target="_blank" rel="noopener noreferrer">公式資料</a>':'')+'</p>'+
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


/* STUDIO v2.5: three-viewpoint proofing.
 * All analysis runs locally. Rules are heuristic and never certify assessment validity
 * or whether a pupil actually demonstrated the described achievement.
 * No new storage fields or student identifiers. */
const V25_RULES=[
 {lens:'保護者',id:'vague',regex:/一生懸命(?:頑張|取り組)|頑張りました|努力しました|意欲的に取り組みました|よくできました/g,
  title:'保護者視点：何をしたか、何ができたかを具体的にすると伝わりやすくなります'},
 {lens:'保護者',id:'education-term',regex:/思考・判断・表現|主体的に学習に取り組む態度|資質・能力|メタ認知|形成的評価|概念的理解/g,
  title:'保護者視点：評価用語を、児童が実際に行った活動の言葉に置き換えられるか確認'},
 {lens:'管理職',id:'absolute',regex:/誰よりも|常に|絶対に|必ず|完璧に|一度も|全員の中で|どんなときも/g,
  title:'管理職視点：強い断定や他児童との比較に、十分な根拠があるか確認'},
 {lens:'管理職',id:'vague-result',regex:/力を高めることができました|力が身に付きました|理解を深めました/g,
  title:'管理職視点：どんな学習活動や成果があったか、具体的に書けるか確認'}
];
function v25Hints(value){
 const text=String(value||''),out=[];
 if(!text.trim())return out;
 const add=(lens,id,index,found,title)=>{
  if(index<0||!found)return;
  if(out.some(v=>v.id===id&&v.index===index))return;
  out.push({lens,id,index,length:found.length,found,title});
 };
 for(const rule of V25_RULES){
  for(const m of text.matchAll(rule.regex))add(rule.lens,rule.id,m.index,m[0],rule.title);
 }
 // The title refers to reading a source text; composing another food explanation
 // belongs to the separate writing unit, not this reading unit.
 if(text.includes('すがたをかえる大豆')){
  for(const m of text.matchAll(/(?:資料を調べて.{0,22}文章|説明文を書|文章を書いて|文章を書くこと)/g)){
   add('管理職','soy-reading-writing',m.index,m[0],
    '管理職視点：「すがたをかえる大豆」は読む学習。書く活動の実績が別教材と混ざっていないか確認');
  }
 }
 if(text.includes('食べ物のひみつを教えます')){
  for(const m of text.matchAll(/(?:筆者の工夫|筆者の考え|本文の段落の役割|筆者が示した具体例)/g)){
   add('管理職','food-writing-reading',m.index,m[0],
    '管理職視点：「食べ物のひみつを教えます」は書く学習。読む教材との混同がないか確認');
  }
 }
 for(const m of text.matchAll(/[^。！？\n]{105,}[。！？]/g)){
  const sentence=m[0];const found=sentence.slice(0,Math.min(12,sentence.length));
  add('保護者','long-sentence',m.index,found,
   '保護者視点：一文が長めです。分けると読みやすくなる可能性があります');
 }
 return out.sort((a,b)=>a.index-b.index);
}
const v25BaseChecks=v14Checks;
v14Checks=function(value){
 const out=v25BaseChecks(value);
 for(const issue of v25Hints(value)){
  v14Push(out,'v25:'+issue.id,issue.index,issue.length,issue.found,issue.title,null,issue.lens);
 }
 return out.sort((a,b)=>a.index-b.index);
};
function v25Overview(){
 return '<section class="v25-intro">'+
 '<strong>🌸 3つの視点で仕上げる</strong>'+
 '<div class="v25-trio">'+
 '<div><b>保護者</b><span>どんな活動・工夫・成長があったか、無理なく伝わるか</span></div>'+
 '<div><b>管理職</b><span>単元と評価の観点が合い、表現・断定に無理がないか</span></div>'+
 '<div><b>担任</b><span>実際に見取った児童の姿と一致するかを最終確認</span></div>'+
 '</div><p class="v25-limit">自動で探せるのは、曖昧な言葉・専門用語・断定表現・一部の教材混同などの<b>確認候補だけ</b>。検出0件でも品質・評価規準への一致や児童の事実を保証しません。保存済みの文章は自動変更しません。</p>'+
 '</section>';
}
function v25LensHTML(record){
 const p=record.issues.filter(x=>x.type==='保護者'),a=record.issues.filter(x=>x.type==='管理職');
 const label=(count)=>count?'<span class="v25-attn">'+count+'件の確認候補</span>':'<span class="v25-neutral">自動検出なし（要目視）</span>';
 return '<div class="v25-lenses">'+
 '<div><b>👪 保護者</b>'+label(p.length)+'</div>'+
 '<div><b>📋 管理職</b>'+label(a.length)+'</div>'+
 '<div><b>✏️ 担任</b><span class="v25-neutral">実際の活動・成果と一致するか確認</span></div>'+
 '</div>';
}
const v25PriorProofHTML=v14ProofHTML;
v14ProofHTML=function(){
 let html=v25PriorProofHTML();
 const c=S.classes.find(x=>x.id===Number(v14ClassId))||cur();
 const records=v14Records(c);
 const shown=records.filter(x=>v14Filter==='all'||(v14Filter==='issues'?x.issues.length>0:!x.reviewed));
 const loc='<div class="grid"><div class="panel wide"><div class="v14-filter">';
 if(html.includes(loc))html=html.replace(loc,v25Overview()+loc);
 let index=0;
 html=html.replace(/<div class="v14-text">/g,()=>{
  const row=shown[index++];
  return (row?v25LensHTML(row):'')+'<div class="v14-text">';
 });
 html=html.replace('誤字脱字・表記チェック','所見の最終チェック');
 html=html.replace('4種類の所見をまとめて点検。疑わしい表記を示し、修正と目視確認は先生が行います。',
  '保護者・管理職・担任の3視点と、誤字脱字・表記をまとめて確認します。');
 html=html.replaceAll('文章を目視確認済みにする','3視点を目視確認済みにする');
 return html;
};
const v25PreviousExport=exportHTML;
exportHTML=function(){
 return '<div class="v25-export"><strong>最終確認は「保護者・管理職・担任」の3視点で</strong><p>文例検索や自動チェックは参考です。評価規準の内容、児童の実際の姿、所見の伝わりやすさは、書き出す前に先生が確かめてください。</p></div>'+v25PreviousExport();
};
const v25PreviousSearch=v22SearchHTML;
v22SearchHTML=function(){
 const html=v25PreviousSearch();
 return html.replace('<div class="panel wide v22-search">',
  '<div class="panel wide v22-search"><p class="v25-searchnote">文例は評価観点・学習活動を手掛かりに選び、<b>保護者に具体的に伝わる文章</b>へ調整してください。児童の実際の姿は先生が確認します。</p>');
};
const v25PreviousTop=renderTop;
renderTop=function(){
 v25PreviousTop();
 const tabs=document.getElementById('tabs');
 const btn=tabs?.querySelector('[data-action="page"][data-page="proof"]');
 if(btn)btn.textContent='⌕ 所見の最終チェック';
};
V17_TOOLNAMES.proof='所見の最終チェック';
const v25CSS=document.createElement('style');
v25CSS.textContent='.v25-intro{border:1px solid #d8e5d9;background:#f7faf5;border-radius:15px;padding:15px;margin:0 0 14px;line-height:1.7}.v25-intro>strong{font-size:16px}.v25-trio{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:11px 0}.v25-trio>div{background:#fff;border:1px solid #e0e9df;border-radius:11px;padding:11px}.v25-trio b{display:block;color:#315d46;margin-bottom:4px}.v25-trio span{font-size:12px;color:#526f5c}.v25-limit{font-size:12px;color:#6b775d;margin:8px 0 0}.v25-lenses{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.v25-lenses>div{display:flex;align-items:center;flex-wrap:wrap;gap:7px;font-size:12px;background:#f6faf6;border:1px solid #e1eae0;border-radius:8px;padding:7px 10px}.v25-lenses b{color:#355b47}.v25-attn{color:#92572b;font-weight:700}.v25-neutral{color:#617267}.v25-export{padding:12px 15px;margin-bottom:12px;background:#f8faf4;border:1px solid #dce8dc;border-radius:12px;line-height:1.6}.v25-export p{margin:6px 0 0;font-size:12px;color:#5c7062}.v25-searchnote{font-size:12px;line-height:1.65;padding:10px 12px;margin:0 0 12px;background:#f4f8f0;border-radius:10px;color:#506a59}@media(max-width:750px){.v25-trio{grid-template-columns:1fr}}';
document.head.appendChild(v25CSS);


/* STUDIO v2.6: fill 3/4-upper art gaps and actionable everyday-life/learning examples.
   Art is independently written based on the publisher's R6 curriculum and assessment criteria.
   Observational categories are NOT textbook assessment criteria or evidence about a specific pupil. */
const V26_ART_NOTES='日本文教出版「3・4上」令和6年度年間指導計画・題材別評価規準を参照。実際の実施活動・使用材料を確認してください。';
function v26Art(unit,activity,page,examples){
 v23Art(unit,activity,page,examples);
}
v26Art('切ってかき出しくっつけて','粘土の形を切り糸やかきべらで変え、組み合わせる','p.8–9',{
 knowledge:['切り糸とかきべらを使い、粘土を切ったりかき出したりして形を変えることができました。'],
 thinking:['切り口から見つけた形を生かし、粘土の置き方や組み合わせ方を工夫していました。',
 '友だちの作品に見られる切り口や形の重なりの面白さを見つけ、感じたことを伝えていました。'],
 attitude:['切ったりくっつけたりする方法を変えながら、思い付いた形を繰り返し試していました。']
});
v26Art('トントン どんどん くぎうって','金づち・釘・木切れ、釘を打った形から発想','p.22–23',{
 knowledge:['金づちを安全に使い、木に釘を打って形を組み立てることができました。'],
 thinking:['釘を打ってできた形を見て発想を広げ、木切れの組み合わせ方を工夫していました。',
 '友だちの作品を見比べ、釘の打ち方や材料の組み合わせ方による面白さに気付いていました。'],
 attitude:['釘を打つ位置や向きを確かめながら、思い付いた形に近付くよう作り直していました。']
});
v26Art('土をかんじて','さまざまな土の形・色・触れた感じを鑑賞','p.25–26',{
 knowledge:['土の色や粒の大きさ、触ったときの感じを比べ、それぞれの違いに気付くことができました。'],
 thinking:['土を手で触ったり目で見たりして、気に入った色や形の特徴を言葉で伝えていました。',
 '友だちが見つけた土のよさを聞き、自分では気付かなかった色や手触りの面白さを見つけていました。'],
 attitude:['種類の違う土を進んで探し、色や触り心地を繰り返し確かめていました。']
});
v26Art('ぬのでえがくと','布の形・色・模様を使い、並べたり組み合わせたりして絵に表す','p.30–31',{
 knowledge:['布の形や模様を生かし、切ったり貼ったりして絵に表すことができました。'],
 thinking:['布の色や模様を見て思い付いた場面を、布の重ね方や置き方を工夫して表していました。',
 '友だちの作品を鑑賞し、布の模様をどのように生かしているかを見つけていました。'],
 attitude:['布の置き方を何度も変え、表したいものに合う組み合わせを探していました。']
});
v26Art('ここがすみか','学校の隅・自然材料で想像したすみかをつくる','p.32–33',{
 knowledge:['場所の形や広さに合わせて、枝や葉などの材料を組み合わせることができました。'],
 thinking:['学校の一角を見て生き物のすみかを想像し、そこに合う形や材料を選んでいました。',
 '友だちのつくったすみかを見て、場所の特徴を生かした工夫を見つけていました。'],
 attitude:['材料の置き方を変えながら、想像したすみかになるように試していました。']
});
v26Art('これでかきたい','身近な材料を組み合わせて自分の筆やペンをつくる','p.36–37',{
 knowledge:['枝や身近な材料を組み合わせ、絵をかくための道具をつくることができました。'],
 thinking:['つくった道具のかき心地を確かめ、線や模様が面白く出るよう材料の選び方を工夫していました。',
 '友だちの道具でかいた線を見て、使う材料によって表現が変わることに気付いていました。'],
 attitude:['材料を付け替えて試しがきを重ね、自分が気に入る線をかける道具に近付けていました。']
});
v26Art('ことばから思いうかべて','詩や物語を読んで想像したことを絵にする','p.38–39',{
 knowledge:['絵の具やクレヨンを使い分け、想像した場面に合う色や線で描くことができました。'],
 thinking:['詩や物語の言葉から思い浮かべた様子を、色や人物の配置を工夫して絵に表していました。',
 '同じ文章から生まれた友だちの作品を見て、感じ方や表し方の違いを伝えていました。'],
 attitude:['文章を読み返して場面を思い浮かべ、表したい様子に近付くまで色や描き方を試していました。']
});
v26Art('だんボールの形をかえて','ぬらした段ボールの形を変えて立体に表す','p.42',{
 knowledge:['ぬらした段ボールを曲げたり丸めたりして、形を変えて立体をつくることができました。'],
 thinking:['段ボールの曲がり方から面白い形を見つけ、形の組み合わせ方を工夫していました。',
 '友だちの作品をいろいろな方向から見て、曲線や重なりがつくる面白さを伝えていました。'],
 attitude:['段ボールの曲げ方や支え方を変えながら、思い描いた形になるよう試していました。']
});
v26Art('ねん土マイタウン','住んでみたいまちを想像して油粘土でつくる','p.50–51',{
 knowledge:['油粘土を丸めたり伸ばしたりして、建物や道などの形をつくることができました。'],
 thinking:['住んでみたいまちを想像し、建物や道の形と配置を考えて表現していました。',
 '友だちのつくったまちを見て、建物の形や配置に込められた工夫を見つけていました。'],
 attitude:['まちの様子を思い浮かべながら建物をつくり足し、全体のつながりを確かめていました。']
});
// The two non-textbook categories have no publisher-based evaluation criteria.
// "axis" names describe observed behaviors rather than formal curriculum judgments.
V22_AXIS.activity='生活・活動の姿';
V22_AXIS.learning='学習の姿';
const V26_OBSERVATIONS=[];
function v26Obs(subject,unit,gradeBand,text){
 const grades=gradeBand==='all'?[1,2,3,4,5,6]:gradeBand==='mid'?[3,4]:gradeBand==='high'?[5,6]:[1,2];
 if(!/[。！？]$/.test(text))throw Error('Incomplete observation example: '+unit);
 for(const grade of grades)V26_OBSERVATIONS.push({grade,subject,unit,axis:subject==='学習全般'?'learning':'activity',text,
  source:'生活・学習場面の観察に基づく編集用文例',details:'教科書会社の評価規準とは別の、具体的な児童の姿の例'});
}
const midLife={
 '学級会・話合い':[
  '学級会では、友だちの意見を聞いて自分の考えとの共通点を見つけ、話合いを進めていました。',
  '学級会では、意見が分かれたときに、それぞれの考えのよさを整理して伝えていました。',
  '学級会では、決まったことを実行するために、自分にできる役割を考えて行動していました。'],
 '係活動':[
  '係活動では、みんなが楽しめるように活動の内容や進め方を工夫していました。',
  '係活動では、友だちと役割を分担し、準備から片付けまで協力して取り組んでいました。',
  '係活動では、活動した後の反省を生かし、次の活動がよりよくなるように考えていました。'],
 '当番活動':[
  '当番活動では、必要な準備を自分から始め、最後まで責任をもって取り組んでいました。',
  '給食当番では、周りの様子を見ながら配膳や片付けを進め、友だちを支えていました。',
  '掃除では、汚れの残りやすい場所に気付き、用具を使い分けて丁寧に取り組んでいました。'],
 '友だちとの関わり':[
  '友だちが困っている様子に気付き、相手の話を聞いてから自分にできることを考えていました。',
  '友だちと意見が違うときにも、理由を聞きながら互いに納得できる方法を探していました。',
  '新しい友だちにも自分から声をかけ、一緒に活動できるようにしていました。'],
 '行事・集会':[
  '学年の集会では、自分の担当を確かめ、周りと動きを合わせて役割を果たしていました。',
  '行事の準備では、全体の進み具合を見て、必要な仕事を見つけて手伝っていました。',
  '行事の振り返りでは、できたことと次に改善したいことを具体的に伝えていました。'],
 '生活の工夫':[
  '次の時間の予定を見て必要な物をそろえ、落ち着いて授業に向かうことができました。',
  '持ち物や机の中を整理し、必要な道具をすぐに取り出せるよう工夫していました。',
  '予定が変わったときにも、周りの人と確認しながら自分の行動を切り替えていました。'],
 '学級をよくする活動':[
  '教室で困っていることに気付き、みんなが過ごしやすくなる方法を友だちに提案していました。',
  '学級の約束を守る理由を考え、自分から周りに声をかけながら行動していました。',
  '友だちのよい行動を見つけ、言葉で伝えることで学級の温かい雰囲気づくりに関わっていました。']
};
const midLearning={
 '発言・説明':[
  '授業では、自分の考えを理由や具体例と結び付け、友だちに分かりやすく説明していました。',
  '授業では、図やノートを示しながら考えを伝え、聞き手に伝わるよう工夫していました。',
  '友だちの発言につなげて自分の考えを述べ、話合いを深めていました。'],
 '聞く・比べる':[
  '友だちの考えを最後まで聞き、自分の考えとの共通点や違いを見つけていました。',
  '自分と違う考えを聞くと、どこが違うのかを質問しながら理解しようとしていました。',
  '交流の後には、友だちの考えを取り入れて自分の考えを見直していました。'],
 'ノート・記録':[
  '板書を写すだけでなく、気付いたことや自分の考えを書き加えてノートをまとめていました。',
  '学習した内容を図や表に整理し、後から見返しても分かるように記録していました。',
  '自分の考えが変わったところをノートに残し、学びの深まりを振り返っていました。'],
 '粘り強さ・試行錯誤':[
  '難しい課題に出合っても、これまでに学んだことを使いながら別の方法を試していました。',
  'すぐに答えが出ないときも、図に表したり友だちと確かめたりして考え続けていました。',
  '間違えたところをそのままにせず、理由を確かめて解き直していました。'],
 '見通し・振り返り':[
  '学習のめあてを確かめ、どんな方法で調べるか見通しをもって取り組んでいました。',
  '学習後には、分かったことと次に確かめたいことを区別して振り返っていました。',
  '振り返りで見つけた課題を、次の授業での取り組み方に生かしていました。'],
 '資料・ICTの活用':[
  '資料の中から必要な情報を選び、理由が伝わるように整理して説明していました。',
  'タブレットに記録した結果を見比べ、考えを確かめるために活用していました。',
  '調べた情報をそのまま書き写さず、自分の言葉でまとめ直そうとしていました。'],
 '協働的な学び':[
  'グループ活動では、友だちの意見を取り入れながら、役割を分担して課題を進めていました。',
  '話合いでは、発言しにくそうな友だちにも声をかけ、みんなの考えを生かそうとしていました。',
  '友だちの説明を聞いて分からない点を質問し、互いの理解を深めていました。']
};
for(const [unit,items] of Object.entries(midLife))for(const text of items)v26Obs('生活・特別活動',unit,'mid',text);
for(const [unit,items] of Object.entries(midLearning))for(const text of items)v26Obs('学習全般',unit,'mid',text);
// General observations suited to first/second as well as upper grades.
const universal={
 '生活・特別活動':{
  '友だちとの関わり':['困っている友だちに気付き、相手の話を聞いて手伝っていました。'],
  '当番活動':['自分の当番を覚え、必要な仕事を最後まで丁寧に行っていました。'],
  '係活動':['係の友だちと相談して、みんなが楽しめる活動を考えていました。'],
  '学級会・話合い':['友だちの意見を最後まで聞き、自分の考えを言葉で伝えていました。']},
 '学習全般':{
  '発言・説明':['授業では、自分の考えを理由とともに友だちに伝えることができました。'],
  '聞く・比べる':['友だちの考えを最後まで聞き、自分の考えと比べていました。'],
  '粘り強さ・試行錯誤':['分からない問題も、学んだ方法を使って繰り返し考えていました。'],
  '見通し・振り返り':['授業の終わりに、できるようになったことを自分の言葉で振り返っていました。']}
};
for(const [subject,units] of Object.entries(universal))for(const [unit,examples] of Object.entries(units))
 for(const x of examples)v26Obs(subject,unit,'all',x);
const upper={
 '生活・特別活動':{
  '委員会活動':['委員会では、担当する仕事だけでなく、活動が円滑に進むよう必要な準備を考えて行動していました。',
  '委員会で課題になったことを話し合い、改善に向けて具体的な方法を提案していました。'],
  '異学年交流':['下級生が安心して参加できるよう、相手の様子を見ながら説明や声かけを工夫していました。']},
 '学習全般':{
  '課題設定・探究':['課題を解決するために必要な情報を選び、複数の資料を比べて自分の考えをまとめていました。'],
  '振り返り・改善':['自分の学習方法を振り返り、より効果的な方法に変えて次の活動に取り組んでいました。']}
};
for(const [subject,units] of Object.entries(upper))for(const [unit,examples] of Object.entries(units))
 for(const x of examples)v26Obs(subject,unit,'high',x);
// Search index only: never auto-add observations to S.bank, never use a curricular publisher label.
const v26PreviousIndex=v22MakeIndex;
v22MakeIndex=function(){
 const list=v26PreviousIndex(),seen=new Set(list.map(x=>[x.grade,x.subject,v22Norm(x.unit),v22Norm(x.text)].join('|')));
 for(const v of V26_OBSERVATIONS){
  const key=[v.grade,v.subject,v22Norm(v.unit),v22Norm(v.text)].join('|');
  if(seen.has(key))continue;seen.add(key);
  list.push({...v,rawAxis:v.axis,axis:V22_AXIS[v.axis],criterion:V22_AXIS[v.axis],index:list.length});
 }
 return list;
};
// Keep categories visible even when a chosen grade has no stored examples.
// New observations make them available in every grade; no forced reclassification of saved bank.
const v26PreviousSearchHTML=v22SearchHTML;
v22SearchHTML=function(){
 let html=v26PreviousSearchHTML();
 if(['生活・特別活動','学習全般'].includes(V22_SEARCH.subject)){
  const notice='<p class="v26-notice">ここは教科書の単元評価ではなく、日常の観察を文章にした参考文例です。児童の具体的な行動が見られた場合に使ってください。</p>';
  html=html.replace('<div class="panel wide v22-search">','<div class="panel wide v22-search">'+notice);
 }
 return html;
};
const v26CSS=document.createElement('style');
v26CSS.textContent='.v26-notice{margin:0 0 14px;padding:12px 13px;background:#f6f8f3;border:1px solid #dce6da;border-radius:10px;font-size:12px;line-height:1.8;color:#516b56}';
document.head.appendChild(v26CSS);
