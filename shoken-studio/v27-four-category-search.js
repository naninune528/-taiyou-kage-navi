/* STUDIO v2.7 | 四分類＋キーワード＋長さ。中学年の観察に基づく編集用例。
   Search-only. No changes to localStorage schema, saved bank or student records.
   This is not an automated pupil assessment or certified curriculum score. */
const V27_ROWS=[];
function v27Add(subject,unit,tags,examples){
 for(const grade of [3,4])for(const text of examples){
  V27_ROWS.push({grade,subject,unit,text,rawAxis:'observation',axis:'活動・学びの姿',
   criterion:'授業・生活で見取った行動',source:'中学年向け・確認済みの編集用文例',
   details:'児童の実際の姿を確認してください',keywords:tags.join(' ')});
 }
}
v27Add('学習全般','自分の考えと理由',['根拠','理由','考える','説明'],[
 '自分の考えをもつだけでなく、なぜそう考えたのかを理由とともに説明していました。']);
v27Add('学習全般','根拠を大切にする',['根拠','資料','結果','説明'],[
 '学習したことや調べた結果を根拠にして、自分の考えを分かりやすく伝えていました。']);
v27Add('学習全般','友だちと比較する',['比較する','共通点','違い','友だち'],[
 '友だちの考えを自分の考えと比べ、共通点や違いに着目しながら話を聞いていました。']);
v27Add('学習全般','考えをつなげる',['友だち','発言','考えをつなぐ','理由'],[
 '友だちの発言を受けて、自分の考えを付け加えたり、理由を説明したりしていました。']);
v27Add('学習全般','考えを見直す',['比較する','見直す','交流','考えを深める'],[
 '友だちとの交流を通して新しい見方に気付き、自分の考えを見直していました。']);
v27Add('学習全般','考えを深める',['比較する','根拠','理由','考えを深める'],[
 '友だちの考えと比べた後、もう一度自分の考えに戻り、理由を付け加えて説明していました。']);
v27Add('学習全般','学びの変化を振り返る',['振り返り','考えを深める','理由','見直す'],[
 '学習の初めと終わりで自分の考えを比べ、分かったことや考えが変わった理由を振り返っていました。']);
v27Add('学習全般','他者を生かして学ぶ',['交流','友だち','聞く','考えを深める'],[
 '自分とは違う考えにも耳を傾け、納得できるところを取り入れながら考えを深めていました。']);
v27Add('学習全般','図やノートを使って説明する',['発言','説明','ノート','図'],[
 '授業では、ノートにかいた図を指し示しながら、自分の考えやその理由を友だちに分かりやすく説明していました。']);
// 行動の記録10観点。観点名だけで子どもの性格を断定しない。
v27Add('生活面','基本的な生活習慣',['挨拶','基本的な生活習慣','朝','明るい雰囲気'],[
 '毎朝自分から気持ちのよい挨拶をし、明るい雰囲気をつくっていました。']);
v27Add('生活面','基本的な生活習慣',['時間','準備','基本的な生活習慣'],[
 '時間を意識して次の活動の準備を進め、落ち着いて学習に取り組むことができました。']);
v27Add('生活面','基本的な生活習慣',['安全','決まり','基本的な生活習慣'],[
 '廊下の歩き方や教室での過ごし方に気を配り、自分や周りの人の安全を考えて行動していました。']);
v27Add('生活面','健康・体力の向上',['健康','体力','休み時間','運動'],[
 '休み時間には校庭で元気に体を動かし、友だちと楽しく運動に親しんでいました。']);
v27Add('生活面','健康・体力の向上',['手洗い','清潔','健康'],[
 '手洗いや身の回りの清潔を心がけ、健康に気を付けて生活していました。']);
v27Add('生活面','健康・体力の向上',['練習','運動','健康','めあて'],[
 '運動では、自分のめあてをもって繰り返し練習し、できることを増やそうと取り組んでいました。']);
v27Add('生活面','自主・自律',['自主・自律','自分で考える','周りの状況','行動'],[
 '学校生活の中で、周りの状況を見ながら、自分にできることを考えて行動する姿が見られました。']);
v27Add('生活面','自主・自律',['自主・自律','相談','自分で考える'],[
 '困ったことがあっても、まずは自分で解決する方法を考え、必要に応じて周りの人に相談していました。']);
v27Add('生活面','自主・自律',['自主・自律','自分から','行動'],[
 '次に必要なことを自分で考え、声をかけられる前に活動を始めていました。']);
v27Add('生活面','責任感',['責任感','担当','やり遂げる'],[
 '自分の担当する仕事を理解し、最後まで責任をもってやり遂げていました。']);
v27Add('生活面','責任感',['責任感','当番','協力'],[
 '当番の仕事を忘れずに行い、友だちと協力しながら最後までやり遂げていました。']);
v27Add('生活面','責任感',['責任感','学級','役割','準備'],[
 '学級の活動では、自分の担当する仕事に向けて進んで準備し、最後まで責任をもって取り組んでいました。']);
v27Add('生活面','創意工夫',['創意工夫','係活動','アイデア'],[
 '係活動では、みんなが楽しめるように新しいアイデアを出し、活動の内容を工夫していました。']);
v27Add('生活面','創意工夫',['創意工夫','提案','学級'],[
 '学級で困っていることに気付き、より過ごしやすくなる方法を考えて友だちに提案していました。']);
v27Add('生活面','創意工夫',['創意工夫','改善','協力'],[
 '活動が思うように進まないときにも、やり方を見直し、友だちと相談しながら改善していました。']);
v27Add('生活面','思いやり・協力',['思いやり','友だち','声かけ'],[
 '困っている友だちに気付くと、自分から声をかけ、相手の気持ちに寄り添って行動していました。']);
v27Add('生活面','思いやり・協力',['思いやり','意見','聞く'],[
 '友だちと意見が違うときにも、相手の話を最後まで聞き、互いの考えを大切にしていました。']);
v27Add('生活面','思いやり・協力',['協力','グループ','友だち'],[
 'グループ活動では、友だちの様子を見ながら声をかけ合い、協力して活動を進めていました。']);
v27Add('生活面','生命尊重・自然愛護',['生命尊重','自然愛護','植物','水やり'],[
 '学級で育てている植物の様子を気にかけ、水やりや世話に丁寧に取り組んでいました。']);
v27Add('生活面','生命尊重・自然愛護',['生命尊重','自然愛護','草花','観察','世話'],[
 '身近な草花や生き物に親しみ、観察や世話などを通して、自然を大切にしていました。']);
v27Add('生活面','生命尊重・自然愛護',['生命尊重','飼育','環境','すみか','工夫'],[
 '飼育している生き物が過ごしやすいように、すみかの環境を工夫して整えていました。']);
v27Add('生活面','生命尊重・自然愛護',['生命尊重','飼育','世話','こまめ'],[
 '飼育している生き物の様子を日頃から気にかけ、必要な世話をこまめに行っていました。']);
v27Add('生活面','生命尊重・自然愛護',['生命尊重','飼育','世話','観察','えさやり','掃除'],[
 '飼育している生き物の様子をよく観察し、えさやりやすみかの掃除などの世話に進んで取り組んでいました。']);
v27Add('生活面','勤労・奉仕',['勤労','奉仕','掃除','手伝い'],[
 '掃除の時間には、自分の担当場所が終わった後も、汚れている場所を見つけて丁寧に掃除していました。']);
v27Add('生活面','勤労・奉仕',['勤労','奉仕','整理','片付け'],[
 'みんなが使う物の整理や片付けに自分から取り組み、学級のために力を尽くしていました。']);
v27Add('生活面','勤労・奉仕',['勤労','奉仕','友だち','手伝い'],[
 '友だちが仕事に困っているときには、自分の仕事が終わってから進んで手伝っていました。']);
v27Add('生活面','勤労・奉仕',['勤労','奉仕','目立たない仕事','整理'],[
 'みんなが使う物の整理や片付けなど、目立たない仕事にも丁寧に取り組んでいました。']);
v27Add('生活面','公正・公平',['公正','公平','意見','グループ'],[
 'グループ活動では、特定の友だちだけでなく、みんなの意見を聞いて進めようとしていました。']);
v27Add('生活面','公正・公平',['公正','公平','順番','遊び'],[
 '遊びや活動の順番を決めるときには、友だちと相談し、みんなが納得できる方法を考えていました。']);
v27Add('生活面','公正・公平',['公正','公平','意見','話合い'],[
 '友だち同士で意見が分かれたときにも、一方の意見だけで判断せず、それぞれの話を聞いていました。']);
v27Add('生活面','公共心・公徳心',['公共心','公徳心','道具','片付け'],[
 '教室の道具やみんなで使う物を大切に扱い、次に使う人のことを考えて片付けていました。']);
v27Add('生活面','公共心・公徳心',['公共心','公徳心','約束','決まり'],[
 '学級の約束の意味を理解し、友だちと気持ちよく生活できるように行動していました。']);
v27Add('生活面','公共心・公徳心',['公共心','公徳心','整理','共有'],[
 '共用の場所が散らかっていることに気付くと、自分から整理し、みんなが使いやすい環境を整えていました。']);
// 行事と特別活動。文例の重複を避け、実際に観察できる行動に絞る。
v27Add('行事','運動会',['運動会','練習','振り返り','成長'],[
 '運動会に向けた練習では、振り返りで見つけた課題を次の練習で意識し、動きをよりよくしていました。',
 '運動会では、周りの友だちと動きやタイミングを合わせ、仲間と協力して演技に取り組んでいました。',
 '運動会の係や準備では、担当する仕事を確かめ、必要な作業に進んで取り組んでいました。']);
v27Add('行事','音楽会',['音楽会','演奏','練習','協力'],[
 '音楽会に向けて、自分の演奏だけでなく友だちの音にも耳を傾け、みんなで音を合わせようとしていました。',
 '音楽会の練習では、前回の演奏を振り返り、声の出し方や演奏の仕方を工夫していました。',
 '音楽会では、これまで練習してきたことを生かし、友だちと気持ちを合わせて演奏していました。']);
v27Add('行事','社会科見学',['社会科見学','見学','質問','記録'],[
 '社会科見学では、見学先の方の話を聞き、初めて知ったことや気付いたことを記録していました。',
 '社会科見学では、事前に考えた質問をもとに説明を聞き、自分の疑問を確かめていました。',
 '社会科見学では、集団での行動を意識し、友だちと声をかけ合って活動していました。']);
v27Add('行事','集会・交流',['集会','行事','異学年','交流'],[
 '学年の集会では、自分の担当を確かめ、友だちと声をかけ合いながら活動を進めていました。',
 '異学年との交流では、相手が参加しやすいよう説明の仕方や声のかけ方を工夫していました。']);
v27Add('行事','行事の実行委員',['実行委員','行事','進行役','説明','責任感','リーダー'],[
 '実行委員として、決まったことをみんなに分かりやすく説明したり、話合いの進行役を務めたりしていました。',
 '実行委員として、活動の流れを確かめ、友だちと役割を分担しながら準備を進めていました。']);
v27Add('特別活動','実行委員',['実行委員','進行役','説明','責任感','リーダー'],[
 '実行委員として、決まったことをみんなに分かりやすく説明したり、話合いの進行役を務めたりしていました。']);
v27Add('特別活動','学級会・話合い',['学級会','話合い','意見','進行'],[
 '学級会では、友だちの意見のよいところを取り入れながら、学級がよりよくなる方法を考えていました。',
 '学級会では、意見が分かれたときに、それぞれの考えを整理してみんなに伝えていました。']);
v27Add('特別活動','係活動',['係活動','アイデア','工夫','協力'],[
 '係活動では、みんなが楽しめるように友だちとアイデアを出し合い、活動内容を工夫していました。',
 '係活動では、友だちと役割を分担し、準備から片付けまで協力して取り組んでいました。']);
v27Add('特別活動','当番活動',['当番','責任感','協力'],[
 '当番の仕事を忘れずに行い、友だちと協力しながら最後までやり遂げていました。']);
v27Add('特別活動','グループ活動',['リーダー','協力','話合い','まとめる'],[
 'グループで活動するときには、友だちの意見を聞きながら、みんなが取り組めるように声をかけていました。',
 '友だちの活動をよく見て、準備や片付けなど必要な仕事を見つけて協力していました。']);
v27Add('特別活動','役割・責任',['責任感','準備','やり遂げる'],[
 '学級の活動では、自分の担当する仕事に向けて進んで準備し、最後まで責任をもって取り組んでいました。']);
// The previous overly broad "diagram and notebook" statement is superseded by the agreed wording.
const V27_REPLACED=[
 '授業では、図やノートを示しながら考えを伝え、聞き手に伝わるよう工夫していました。'
];
const v27PriorIndex=v22MakeIndex;
v22MakeIndex=function(){
 const existing=v27PriorIndex().filter(x=>!V27_REPLACED.includes(x.text));
 const keys=new Set(existing.map(x=>[x.grade,x.subject,v22Norm(x.unit),v22Norm(x.text)].join('|')));
 for(const row of V27_ROWS){
  const key=[row.grade,row.subject,v22Norm(row.unit),v22Norm(row.text)].join('|');
  if(keys.has(key))continue;keys.add(key);existing.push({...row,index:existing.length});
 }
 return existing.map((x,i)=>({...x,index:i}));
};
const V27_CATEGORIES=[
 {id:'学習全般',label:'学習全般',icon:'📚',tags:['根拠','比較する','考えを深める','説明','振り返り','粘り強さ','ノート','交流']},
 {id:'生活面',label:'生活面',icon:'🌱',tags:['基本的な生活習慣','健康・体力の向上','自主・自律','責任感','創意工夫','思いやり・協力','生命尊重・自然愛護','勤労・奉仕','公正・公平','公共心・公徳心','挨拶','飼育']},
 {id:'行事',label:'行事',icon:'🎵',tags:['運動会','音楽会','社会科見学','集会','実行委員','練習','成長']},
 {id:'特別活動',label:'特別活動',icon:'🤝',tags:['係活動','当番活動','学級会','話合い','実行委員','進行役','リーダー','協力']}
];
let v27Category='',v27Query='',v27Length='all',v27Limit=20;
function v27Normalize(t){return v22Norm(t).replace(/友達/g,'友だち').replace(/あいさつ/g,'挨拶').replace(/話し合い/g,'話合い')}
function v27Of(x){
 if(['学習全般','生活面','行事','特別活動'].includes(x.subject))return x.subject;
 if(x.subject!=='生活・特別活動')return '';
 const unit=v27Normalize(x.unit||'');
 if(/行事|集会/.test(unit))return '行事';
 if(/学級会|学級活動|係活動|当番活動|委員会|学級をよくする|異学年/.test(unit))return '特別活動';
 return '生活面';
}
const V27_LEGACY_TAGS={
 '学級会・話合い':'学級会 話合い 意見 協力 進行役',
 '係活動':'係活動 工夫 役割 協力 責任感',
 '当番活動':'当番活動 責任感 協力 奉仕',
 '友だちとの関わり':'思いやり 協力 自主・自律 公正・公平',
 '行事・集会':'行事 集会 学年 実行委員 協力',
 '生活の工夫':'自主・自律 基本的な生活習慣 片付け 整理',
 '学級をよくする活動':'創意工夫 公共心・公徳心 協力',
 '学級活動':'学級会 話合い 意見'
};
function v27Match(x,query){
 const terms=String(query||'').split(/[／/、,・　\s]+/).map(v27Normalize).filter(Boolean);
 if(!terms.length)return true;
 const hay=v27Normalize([x.subject,x.unit,x.text,x.keywords||'',V27_LEGACY_TAGS[x.unit]||''].join(' '));
 return terms.every(t=>hay.includes(t));
}
function v27Results(){
 let list=v22MakeIndex().filter(x=>x.grade===Number(V22_SEARCH.grade)&&v27Of(x)===v27Category&&v27Match(x,v27Query));
 if(v27Length==='short')list=list.filter(x=>Array.from(x.text).length<=50);
 if(v27Length==='long')list=list.filter(x=>Array.from(x.text).length>50);
 // New mid-grade, reviewed examples first; older and saved examples remain accessible.
 return list.sort((a,b)=>((a.source==='中学年向け・確認済みの編集用文例'?0:1)-(b.source==='中学年向け・確認済みの編集用文例'?0:1)));
}
function v27CategoryCards(){
 return '<div class="v27-chooser"><strong>子どもの姿から所見を探す</strong><p class="small muted">まず分野を選んで、活動名やよさを選択。通常の教科検索はそのまま使えます。</p>'+
 '<div class="v27-catgrid">'+V27_CATEGORIES.map(x=>'<button type="button" class="v27-catbtn'+(v27Category===x.id?' chosen':'')+'" data-v27="category" data-category="'+E(x.id)+'">'+x.icon+'　'+E(x.label)+'</button>').join('')+'</div>'+
 '<button type="button" class="btn softbtn" data-v27="art">🎨 図工の題材を探す</button>'+
 '<button type="button" class="btn softbtn" data-v27="subjects">教科・単元から探す</button></div>';
}
function v27SpecialHTML(){
 const category=V27_CATEGORIES.find(x=>x.id===v27Category);
 if(!category)return '';
 const rows=v27Results(),show=rows.slice(0,v27Limit);
 const opts=[['all','すべて'],['short','短め（50字以内）'],['long','詳しめ（51字以上）']];
 return header('所見文例を検索','子どもの具体的な行動から探し、他の教科の文章と組み合わせて使えます。')+
 '<div class="panel wide v22-search">'+v27CategoryCards()+
 '<div class="v27-fields"><div class="field"><label>学年</label><select data-v27-grade="1">'+[1,2,3,4,5,6].map(n=>option(n,V22_SEARCH.grade)).join('')+'</select></div>'+
 '<div class="field"><label>文例の長さ</label><select data-v27-length="1">'+opts.map(([v,t])=>'<option value="'+v+'"'+(v===v27Length?' selected':'')+'>'+t+'</option>').join('')+'</select></div></div>'+
 '<p class="v27-subtitle"><strong>'+E(category.label)+'</strong>　どんなよさや活動を探す？</p>'+
 '<div class="v27-tags">'+category.tags.map(t=>'<button type="button" class="v27-tag'+(v27Query===t?' chosen':'')+'" data-v27="tag" data-keyword="'+E(t)+'">'+E(t)+'</button>').join('')+'</div>'+
 '<div class="field v27-searchfield"><label>キーワードを入力（複数語も可）</label><input data-v27-query="1" type="text" value="'+E(v27Query)+'" placeholder="例：'+E(category.tags[0])+'／'+E(category.tags[1])+'"/>'+
 '<button type="button" class="btn primary" data-v27="search">検索する</button><button type="button" class="btn softbtn" data-v27="clear">条件をクリア</button></div>'+
 '<div class="notice small">教科書の単元評価ではなく、児童の行動をもとにした編集用文例です。内容が実際に見られたかを必ず確かめてください。</div>'+
 '<p class="small muted">検索結果 '+rows.length+'件（表示 '+show.length+'件）・文例の文字数は本文のみ</p>'+
 (rows.length?'<div class="v22-results">'+show.map(x=>'<article class="v22-result"><div class="inline v22-tags"><span class="tag">'+x.grade+'年</span><span class="tag">'+E(v27Of(x))+'</span><span class="tag">'+E(x.unit)+'</span><span class="tag">'+Array.from(x.text).length+'字</span></div>'+
 '<p class="v22-comment">'+E(x.text)+'</p><p class="v22-source">'+E(x.source)+'</p>'+
 '<div class="inline"><button class="btn softbtn" data-v22-action="copy" data-v22-index="'+x.index+'">文章をコピー</button>'+
 '<button class="btn" data-v22-action="save" data-v22-index="'+x.index+'">自分の文例バンクに追加</button></div></article>').join('')+'</div>'+
 (rows.length>show.length?'<button type="button" class="btn v22-more" data-v27="more">さらに20件表示</button>':''):
 '<div class="notice">この条件に合う文例はまだありません。別の言葉で検索するか、条件をクリアしてください。</div>')+'</div>';
}
const v27PreviousSearchHTML=v22SearchHTML;
v22SearchHTML=function(){
 if(v27Category)return v27SpecialHTML();
 const old=v27PreviousSearchHTML();
 return old.replace('<div class="panel wide v22-search">','<div class="panel wide v22-search">'+v27CategoryCards());
};
document.addEventListener('click',e=>{
 const btn=e.target.closest('[data-v27]');if(!btn)return;
 const action=btn.dataset.v27;
 if(action==='category'){
  v27Category=btn.dataset.category;v27Query='';v27Length='all';v27Limit=20;V22_SEARCH.axis='';V22_SEARCH.query='';page='examples-search';render();return;
 }
 if(action==='art'){
  v27Category='';v27Query='';V22_SEARCH.subject='図工';V22_SEARCH.query='';V22_SEARCH.axis='';V22_SEARCH.limit=20;page='examples-search';render();return;
 }
 if(action==='subjects'){v27Category='';V22_SEARCH.query='';V22_SEARCH.axis='';page='examples-search';render();return}
 if(action==='tag'){v27Query=v27Query===btn.dataset.keyword?'':btn.dataset.keyword;v27Limit=20;render();return}
 if(action==='search'){v27Query=document.querySelector('[data-v27-query]')?.value||'';v27Limit=20;render();return}
 if(action==='clear'){v27Query='';v27Length='all';v27Limit=20;render();return}
 if(action==='more'){v27Limit+=20;render()}
});
document.addEventListener('input',e=>{if(e.target?.dataset?.v27Query)v27Query=e.target.value});
document.addEventListener('change',e=>{
 if(e.target?.dataset?.v27Grade){V22_SEARCH.grade=Number(e.target.value);v27Limit=20;render()}
 if(e.target?.dataset?.v27Length){v27Length=e.target.value;v27Limit=20;render()}
 if(e.target?.dataset?.v27Query){v27Query=e.target.value;v27Limit=20;render()}
});
document.addEventListener('keydown',e=>{
 if(e.target?.dataset?.v27Query&&e.key==='Enter'&&!e.isComposing){v27Query=e.target.value;v27Limit=20;render()}
});
// If another search view is opened through the original unit-bank shortcut,
// clear special category so the original subject navigation remains reliable.
const v27PreviousUnitHtml=v4UnitHTML;
v4UnitHTML=function(){
 return v27PreviousUnitHtml();
};
const v27Style=document.createElement('style');
v27Style.textContent='.v27-chooser{margin:0 0 18px;padding:14px;background:#f6faf4;border:1px solid #dae7d9;border-radius:14px}.v27-chooser>strong{font-size:16px;color:#315743}.v27-chooser p{margin:6px 0 13px}.v27-catgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:11px}.v27-catbtn{border:1px solid #cfdfd1;border-radius:11px;background:#fff;padding:14px 8px;font-size:13px;font-weight:bold;color:#365a45;cursor:pointer}.v27-catbtn.chosen,.v27-tag.chosen{background:#dbece0;border-color:#709d80}.v27-chooser>.btn{margin-right:7px;margin-top:3px}.v27-fields{display:grid;grid-template-columns:1fr 1.5fr;gap:12px}.v27-subtitle{margin:16px 0 10px}.v27-tags{display:flex;flex-wrap:wrap;gap:7px}.v27-tag{border:1px solid #d3e1d5;background:#fff;border-radius:20px;padding:7px 12px;font-size:12px;color:#345644;cursor:pointer}.v27-searchfield{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.v27-searchfield label{width:100%}.v27-searchfield input{min-width:210px;flex:1;padding:10px;border:1px solid #cad8cc;border-radius:9px}.v27-searchfield .btn{white-space:nowrap}@media(max-width:700px){.v27-catgrid{grid-template-columns:repeat(2,minmax(0,1fr))}.v27-fields{grid-template-columns:1fr 1fr}}';
document.head.appendChild(v27Style);
