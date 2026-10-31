/* 所見メーカー STUDIO v2.1: 体育の学年帯・領域・種目・技別検索 / 総合は文章構成の参考のみ
 * Readonly built-in references. Existing user-authored drafts and bank records are never deleted. */
const V21_BANDS={low:'低学年（1・2年）',mid:'中学年（3・4年）',high:'高学年（5・6年）'};
function v21Band(g){return g<=2?'low':g<=4?'mid':'high'}
const V21_PE_CATALOG={
 low:{
  '体つくりの運動遊び':['体ほぐしの運動遊び','多様な動きをつくる運動遊び'],
  '器械・器具を使っての運動遊び':['固定施設を使った運動遊び','マットを使った運動遊び','鉄棒を使った運動遊び','跳び箱を使った運動遊び'],
  '走・跳の運動遊び':['走の運動遊び','跳の運動遊び'],
  '水遊び':['水の中を移動する遊び','もぐる・浮く遊び'],
  'ゲーム':['ボールゲーム','鬼遊び'],
  '表現リズム遊び':['表現遊び','リズム遊び']
 },
 mid:{
  '体つくり運動':['体ほぐしの運動','多様な動きをつくる運動'],
  '器械運動':['マット運動','鉄棒運動','跳び箱運動'],
  '走・跳の運動':['かけっこ・リレー','小型ハードル走','幅跳び','高跳び'],
  '水泳運動':['浮いて進む運動','もぐる・浮く運動'],
  'ゲーム':['ゴール型ゲーム（ハンドボール）','ネット型ゲーム（プレルボール）','ベースボール型ゲーム（ティーボール）'],
  '表現運動':['表現','リズムダンス'],
  '保健':['けんこうな生活','体の発育・発達']
 },
 high:{
  '体つくり運動':['体ほぐしの運動','体の動きを高める運動'],
  '器械運動':['マット運動','鉄棒運動','跳び箱運動'],
  '陸上運動':['短距離走・リレー','ハードル走','走り幅跳び','走り高跳び'],
  '水泳運動':['クロール','平泳ぎ','安全確保につながる運動'],
  'ボール運動':['ゴール型（バスケットボール）','ネット型（ソフトバレーボール）','ベースボール型（ティーボール）'],
  '表現運動':['表現','フォークダンス'],
  '保健':['心の健康','けがの防止','病気の予防']
 }
};
const V21_PE_ROWS=[];
function v21Pe(band,domain,sport,skill,examples){
 const intro='体育の「'+sport+'」では、';
 for(const [axis,items] of Object.entries(examples)){
  for(const text of items)V21_PE_ROWS.push({band,domain,sport,skill,axis,text:intro+text});
 }
}
// 小学校低学年
v21Pe('low','体つくりの運動遊び','多様な動きをつくる運動遊び','バランス・移動',{knowledge:['片足立ちや向きを変える動きに取り組み、体のバランスを保ちながら動くことができました。'],thinking:['友だちの動きを見て、体を動かす方向や速さを変えながら遊び方を工夫していました。'],attitude:['友だちと声をかけ合い、さまざまな動きを進んで試していました。']});
v21Pe('low','器械・器具を使っての運動遊び','跳び箱を使った運動遊び','跳び乗り・跳び下り',{knowledge:['両足で踏み切って跳び箱に跳び乗り、着地する場所を確かめて跳び下りることができました。'],thinking:['跳び乗りやすい高さを選び、手を着く場所を変えて動きを試していました。'],attitude:['安全な順番や着地の場所を確かめながら、繰り返し運動遊びを楽しんでいました。']});
v21Pe('low','器械・器具を使っての運動遊び','マットを使った運動遊び','前転がり',{knowledge:['あごを引いて背中を丸め、前に転がる動きができるようになりました。'],thinking:['体を丸めることを意識し、なめらかに転がるための動きを試していました。']});
v21Pe('low','器械・器具を使っての運動遊び','鉄棒を使った運動遊び','支持・ぶら下がり',{knowledge:['鉄棒をしっかり握り、体を支えたりぶら下がったりすることができました。'],attitude:['できる動きを少しずつ増やそうと、鉄棒につかまる動きに繰り返し挑戦していました。']});
v21Pe('low','走・跳の運動遊び','走の運動遊び','折り返し走・リレー',{knowledge:['合図を聞いてすばやく走り出し、目印を回って戻る運動遊びができました。'],thinking:['次の走者に交代しやすいよう、走る順番や受け渡す場所を友だちと考えていました。']});
v21Pe('low','走・跳の運動遊び','跳の運動遊び','連続跳び',{knowledge:['片足跳びや両足跳びを組み合わせ、目印に合わせて連続して跳ぶことができました。']});
v21Pe('low','水遊び','水の中を移動する遊び','水中歩行',{knowledge:['水の抵抗を感じながら、姿勢や進む方向を変えて水の中を移動することができました。']});
v21Pe('low','水遊び','もぐる・浮く遊び','水に浮く',{knowledge:['息を吐いたり体の力を抜いたりして、水に浮く動きを試すことができました。'],attitude:['水への慣れ具合に応じてできる動きを選び、繰り返し挑戦していました。']});
v21Pe('low','ゲーム','ボールゲーム','パス・的当て',{knowledge:['相手の位置を見ながらボールを投げたり受けたりすることができました。'],thinking:['相手に届きやすい投げ方や距離を考え、ボールをやり取りしていました。'],attitude:['友だちと声をかけ合い、順番や約束を守ってゲームに参加していました。']});
v21Pe('low','ゲーム','鬼遊び','逃げる場所',{thinking:['鬼との位置を見て、つかまらないように走る方向や逃げる場所を考えていました。']});
v21Pe('low','表現リズム遊び','表現遊び','動物の動き',{thinking:['動物の特徴を考え、歩き方や体の動かし方を工夫して表現していました。']});
v21Pe('low','表現リズム遊び','リズム遊び','リズムに合わせる',{knowledge:['音楽のリズムに合わせて、跳んだり回ったりする動きをつなげることができました。']});
// 小学校中学年
v21Pe('mid','体つくり運動','多様な動きをつくる運動','体のバランス・組合せ',{thinking:['友だちと動きをつなげる順番を考え、バランスを崩さずに動けるよう工夫していました。']});
v21Pe('mid','器械運動','跳び箱運動','開脚跳び',{knowledge:['踏切りと両手を着く位置に気を付け、開脚跳びをすることができました。','両足で力強く踏み切り、跳び箱の奥に手を着くことで、開脚跳びができるようになりました。'],thinking:['自分の跳び方を振り返り、踏切りや手を着く位置を工夫しながら練習することができました。'],attitude:['自分に合った高さや練習の場を選び、開脚跳びの成功に向けて繰り返し挑戦していました。']});
v21Pe('mid','器械運動','跳び箱運動','台上前転',{knowledge:['あごを引いて体を丸め、跳び箱の上で前転することができました。'],thinking:['回転する際の手の着き方や体の丸め方を確かめ、自分の課題に合った練習の場を選んでいました。'],attitude:['マットを重ねた場などで回る感覚を確かめながら、段階的に挑戦していました。']});
v21Pe('mid','器械運動','跳び箱運動','練習・友だちへの助言',{thinking:['友だちの跳び方を見て、踏切りや着手のよかった点を具体的に伝えていました。'],attitude:['友だちの挑戦を認め、安全を確かめながら練習に取り組んでいました。']});
v21Pe('mid','器械運動','マット運動','前転・後転',{knowledge:['頭の後ろから背中へ順にマットを着け、なめらかに前転することができました。'],thinking:['回転の途中で体が横にそれないよう、手の着き方や体の丸め方を確かめていました。']});
v21Pe('mid','器械運動','鉄棒運動','支持・回転',{knowledge:['鉄棒を握って体を支え、体を丸めることを意識して回転することができました。'],attitude:['自分に合う補助具や練習方法を選び、できる動きを増やそうとしていました。']});
v21Pe('mid','走・跳の運動','かけっこ・リレー','バトンの受渡し',{knowledge:['次の走者が走り出すタイミングを合わせ、バトンを受け渡すことができました。'],thinking:['走る速さを落とさずにバトンをつなぐため、受け渡す位置を友だちと相談していました。']});
v21Pe('mid','走・跳の運動','小型ハードル走','リズム走',{knowledge:['小型ハードルの間を一定のリズムで走り、続けて跳び越すことができました。'],thinking:['自分の歩幅に合ったハードルの間隔を選び、走るリズムが乱れないよう工夫していました。']});
v21Pe('mid','走・跳の運動','幅跳び','踏切り',{knowledge:['助走から片足で踏み切り、両足で着地することができました。'],thinking:['踏切る位置を確かめながら助走の歩数を調整していました。']});
v21Pe('mid','走・跳の運動','高跳び','踏切り',{knowledge:['助走のリズムを確かめ、片足で踏み切って跳ぶことができました。']});
v21Pe('mid','水泳運動','浮いて進む運動','け伸び・ばた足',{knowledge:['壁を蹴って体をまっすぐに伸ばし、水に浮いた姿勢で進むことができました。'],attitude:['進める距離を少しずつ伸ばそうと、姿勢を確かめながら繰り返し練習していました。']});
v21Pe('mid','水泳運動','もぐる・浮く運動','呼吸・浮く',{knowledge:['息をゆっくり吐き、体の力を抜いて水に浮くことができました。']});
v21Pe('mid','ゲーム','ゴール型ゲーム（ハンドボール）','パス・シュート',{knowledge:['味方がパスを出しやすい位置に動き、ボールを受けてシュートにつなげることができました。','ボールを受けた後にゴールへ体を向け、ねらった場所へシュートすることができました。'],thinking:['チームでパスをつなげるため、相手がいない場所に動くことを意識していました。'],attitude:['友だちと声をかけ合い、役割を交代しながらゲームに参加していました。']});
v21Pe('mid','ゲーム','ゴール型ゲーム（ハンドボール）','空間・作戦',{knowledge:['守りのいない場所へ動き、味方からパスを受けることができました。'],thinking:['相手の守りが少ない場所に着目し、チームでパスをつなぐための作戦を考えることができました。'],attitude:['試合で見つけた課題をチームで振り返り、次のゲームで試そうとしていました。']});
v21Pe('mid','ゲーム','ネット型ゲーム（プレルボール）','つなぐ・返す',{knowledge:['味方が受け取りやすい位置へボールを送り、続けて相手コートへ返すことができました。'],thinking:['ボールを落とさずにつなぐため、味方との立つ位置を相談していました。']});
v21Pe('mid','ゲーム','ベースボール型ゲーム（ティーボール）','打つ・走る',{knowledge:['台の上のボールをねらって打ち、決められた場所まで走ることができました。'],thinking:['守備の位置を見て、ボールを打つ方向を工夫していました。']});
v21Pe('mid','表現運動','表現','動きの特徴',{thinking:['表したいものの特徴を捉え、速さや大きさを変えた動きを組み合わせて表現していました。']});
v21Pe('mid','表現運動','リズムダンス','リズム・組合せ',{knowledge:['音楽のリズムに合わせて、ステップや体の動きを組み合わせて踊ることができました。'],thinking:['友だちと動きをそろえるため、踊る順番や隊形を相談していました。']});
// 小学校高学年
v21Pe('high','体つくり運動','体の動きを高める運動','動きの組合せ',{thinking:['自分の課題に合わせて運動を選び、体の動きを高めるための組合せを考えていました。']});
v21Pe('high','器械運動','跳び箱運動','開脚跳び',{knowledge:['助走の速さや踏切りのタイミングを調整し、安定した開脚跳びができるようになりました。'],thinking:['自分の跳び方の課題を見つけ、助走や着手を変えて動きを確かめていました。'],attitude:['練習を重ねる中で動きを見直し、技の安定を目指して取り組んでいました。']});
v21Pe('high','器械運動','跳び箱運動','台上前転',{knowledge:['跳び箱の上で回転する位置や体の丸め方を確かめ、安定して台上前転をすることができました。']});
v21Pe('high','器械運動','マット運動','技の組合せ',{thinking:['技と技をつなぐ動きを考え、回転や倒立の技を組み合わせて演技を構成していました。']});
v21Pe('high','器械運動','鉄棒運動','技の組合せ',{thinking:['得意な技を組み合わせ、姿勢や技のつながりを意識した演技を考えていました。']});
v21Pe('high','陸上運動','短距離走・リレー','バトンパス',{knowledge:['走る速度を保ちながら、タイミングを合わせてバトンを渡すことができました。'],thinking:['チームの走順やバトンパスの位置を考え、練習で試しながら調整していました。']});
v21Pe('high','陸上運動','ハードル走','歩幅・リズム',{knowledge:['自分の歩幅に合った間隔で、リズムよくハードルを走り越えることができました。'],thinking:['踏切りの位置や走る歩数を確かめ、ハードル間の走り方を工夫していました。']});
v21Pe('high','陸上運動','走り幅跳び','助走・踏切り',{knowledge:['助走の速さを生かして片足で踏み切り、遠くへ跳ぶことができました。'],thinking:['踏切り位置が合うように助走の距離を調整しながら練習していました。']});
v21Pe('high','陸上運動','走り高跳び','助走・踏切り',{knowledge:['踏切る足や助走のリズムを意識して、高く跳ぶことができました。']});
v21Pe('high','水泳運動','クロール','呼吸・腕のかき',{knowledge:['腕のかきと呼吸のタイミングを合わせ、続けてクロールで泳ぐことができました。'],thinking:['呼吸のときに姿勢が崩れないよう、顔を上げる向きを確かめて泳いでいました。']});
v21Pe('high','水泳運動','平泳ぎ','手足のタイミング',{knowledge:['手のかきと足の蹴りを合わせ、伸びる姿勢を意識して平泳ぎで進むことができました。']});
v21Pe('high','水泳運動','安全確保につながる運動','背浮き',{knowledge:['体の力を抜き、呼吸を確保しながら背浮きの姿勢を保つことができました。']});
v21Pe('high','ボール運動','ゴール型（バスケットボール）','パス・空間',{knowledge:['相手の守りを見て空いた場所へ動き、パスを受けてシュートにつなげることができました。'],thinking:['攻撃を続けるため、パスを受ける位置や味方との動き方を工夫していました。'],attitude:['試合を振り返って自分の役割を確かめ、次のゲームで生かそうとしていました。']});
v21Pe('high','ボール運動','ネット型（ソフトバレーボール）','パス・返球',{knowledge:['ボールの落下点を予測して動き、味方が受けやすいパスを出すことができました。'],thinking:['空いている場所を見つけ、相手コートへの返し方を工夫していました。']});
v21Pe('high','ボール運動','ベースボール型（ティーボール）','打撃・守備',{knowledge:['ボールの位置を見て打ち、塁へ進むことができました。'],thinking:['走者や打球の位置に応じて、守備の動きを判断していました。']});
v21Pe('high','表現運動','表現','動きの構成',{thinking:['伝えたい場面の変化に合わせ、動きの強弱や隊形を工夫して表現していました。']});
v21Pe('high','表現運動','フォークダンス','隊形・踊り',{knowledge:['音楽と踊りの特徴を捉え、友だちとタイミングを合わせて踊ることができました。']});
const V21_AXIS={knowledge:'知識・技能',thinking:'思考・判断・表現',attitude:'主体的に学習に取り組む態度',custom:'保存した文例'};
function v21PeUnits(grade){
 const band=v21Band(grade),groups=new Map();
 for(const x of V21_PE_ROWS){
  if(x.band!==band)continue;
  const id=['v21pe',band,x.domain,x.sport,x.skill].join('¦');
  if(!groups.has(id))groups.set(id,{id,unit:x.sport+'｜'+x.skill,publisher:'学習指導要領',domain:x.domain,sport:x.sport,skill:x.skill,choices:[]});
  const g=groups.get(id);
  g.choices.push({id:'v21:'+x.axis+':'+g.choices.length,axis:V21_AXIS[x.axis],category:x.axis,text:x.text});
 }
 // User's bank is preserved separately and remains editable, not silently moved or deleted.
 for(const b of S.bank.filter(x=>Number(x.grade)===Number(grade)&&x.subject==='体育')){
  const id='v21my¦'+b.id;
  groups.set(id,{id,unit:b.unit||'自由文例',domain:'自分の文例',publisher:'自作',sport:b.unit||'自由文例',skill:'登録済み文例',
   choices:[{id:'bank:'+b.id,axis:v6Category(b.criterion)||'自作・保存済み',category:(['knowledge','thinking','attitude'].includes(b.criterion)?b.criterion:'custom'),text:b.text}]});
 }
 return [...groups.values()];
}
// The user's general-studies samples belong to a STRUCTURE REFERENCE, never a reusable suggestion bank.
const v21OriginalAvailable=v8Available;
v8Available=function(c,subject){
 if(subject==='総合的な学習の時間')return [];
 if(subject!=='体育')return v21OriginalAvailable(c,subject);
 const rows=v21PeUnits(c.grade);
 const old=v21OriginalAvailable(c,subject);
 for(const u of old.filter(x=>x.domain==='保健')){
  rows.push({...u,sport:u.unit,skill:'保健の学習',domain:'保健',choices:u.choices.map(x=>({...x,category:['knowledge','thinking','attitude'].find(k=>x.id.startsWith(k+':'))||'custom'}))});
 }
 return rows;
};
const V21_FILTERS={};let v21LibraryFilter={domain:'',sport:'',skill:'',axis:''};
function v21For(c,t,n){
 const k=c.id+'|'+t+'|'+n;
 if(!V21_FILTERS[k])V21_FILTERS[k]={domain:'',sport:'',skill:'',axis:''};
 return V21_FILTERS[k];
}
function v21Unique(items){return [...new Set(items.filter(Boolean))]}
function v21Select(n,context,field,choices,current,placeholder){
 return '<select data-v21-filter="'+E(field)+'" data-v21-context="'+E(context)+'"'+(context==='row'?' data-n="'+n+'"':'')+'>'+
 '<option value="">'+E(placeholder)+'</option>'+choices.map(s=>option(s,current)).join('')+'</select>';
}
function v21FilterData(grade,filter){
 const band=v21Band(grade),catalog=V21_PE_CATALOG[band],units=v8Available({grade},'体育');
 const domains=[...Object.keys(catalog),...v21Unique(units.map(x=>x.domain)).filter(x=>!catalog[x])];
 const sports=filter.domain?v21Unique([...(catalog[filter.domain]||[]),...units.filter(x=>x.domain===filter.domain).map(x=>x.sport)]):[];
 const skills=filter.sport?v21Unique(units.filter(x=>x.domain===filter.domain&&x.sport===filter.sport).map(x=>x.skill)):[];
 const current=units.find(x=>x.domain===filter.domain&&x.sport===filter.sport&&x.skill===filter.skill);
 return {band,domains,sports,skills,current,units};
}
function v21Fields(grade,filter,n,context){
 const d=v21FilterData(grade,filter);
 return '<div class="v21-band">'+E(V21_BANDS[d.band])+' ｜ 体育実技は学習指導要領に基づく分類</div>'+
 '<div class="v21-grid">'+
 field('領域',v21Select(n,context,'domain',context==='library'?d.domains.filter(x=>x!=='保健'):d.domains,filter.domain,'領域を選ぶ'))+
 field('種目・教材',v21Select(n,context,'sport',d.sports,filter.sport,'種目を選ぶ'))+
 field('技・具体的な動き',v21Select(n,context,'skill',d.skills,filter.skill,'動きを選ぶ'))+
 field('評価観点',v21Select(n,context,'axis',Object.keys(V21_AXIS).filter(axis=>d.current?.choices.some(x=>x.category===axis)).map(axis=>V21_AXIS[axis]),V21_AXIS[filter.axis]||'','観点を選ぶ'))+
 '</div>'+
 (filter.sport&&!d.skills.length?'<div class="notice v21-note">この種目の校正済み文例は準備中です。実際の児童の姿に合わせて文章を書いてください。</div>':'');
}
const v21OriginalPicker=v8Picker;
v8Picker=function(c,t,n){
 if(t==='総合的な学習の時間')return '<div class="v8-picker"><div class="section-kicker">総合｜文章構成の参考</div>'+
 '<p class="hint">総合は学年や年度で活動が変わるため、定型文を選ぶ方式にはしません。下の構成例を参考に、右側へ実際の児童の姿を書いてください。</p>'+
 '<button class="btn softbtn" type="button" data-action="page" data-page="inquiry-structure">総合の文章構成例を見る</button></div>';
 const st=v8Selection(c,t,n);
 if(st.subject!=='体育')return v21OriginalPicker(c,t,n);
 const f=v21For(c,t,n),d=v21FilterData(c.grade,f),u=d.current;
 if(st.unit&&u?.id!==st.unit){st.unit=u?.id||'';st.example=''}
 const choices=u?.choices.filter(x=>x.category===f.axis)||[];
 const chosen=choices.find(x=>x.id===st.example);
 return '<div class="v8-picker"><div class="section-kicker">FIND AND PLACE / 体育</div>'+
 field('教科・領域',v8Select('subject',n,v8Subjects(c,t).map(x=>({id:x,label:x})),st.subject,'教科を選ぶ'))+
 v21Fields(c.grade,f,n,'row')+
 field('文例',v8Select('example',n,choices.map((x,i)=>({id:x.id,label:(i+1)+'｜'+x.text.slice(0,32)+'…'})),st.example,'文例を選ぶ'))+
 (chosen?'<div class="v8-preview">'+E(chosen.text)+'</div>':'<p class="hint">技と観点を選び、児童の実際の姿に合う文例を選んでください。</p>')+
 '<div class="v8-row-tools"><label class="small">配置方法 <select data-v8-field="mode" data-n="'+n+'"><option value="append"'+(st.mode==='append'?' selected':'')+'>文末に追加</option><option value="replace"'+(st.mode==='replace'?' selected':'')+'>全文置き換え</option></select></label>'+
 '<button class="btn softbtn" data-v8-row-action="apply" data-n="'+n+'"'+(chosen?'':' disabled')+'>この番号に配置</button></div></div>';
};
const v21OriginalUnitHtml=v4UnitHTML;
v4UnitHTML=function(){
 if(v4Subject!=='体育'||v7PeMode!=='実技')return v21OriginalUnitHtml();
 const f=v21LibraryFilter,d=v21FilterData(v4Grade,f),u=d.current;
 const content=u?Object.keys(V21_AXIS).map(axis=>{
  const rows=u.choices.filter(x=>x.category===axis);
  return '<section class="soft v21-section"><h3>'+E(V21_AXIS[axis])+'</h3>'+
  (rows.length?rows.map(x=>'<div class="v21-copytext">'+E(x.text)+'</div>').join(''):
   '<p class="muted small">この観点の校正済み文例はまだありません。</p>')+'</section>';
 }).join(''):'<div class="notice">領域・種目・技を選ぶと、校正済みの文例が表示されます。実際の授業と児童の姿が一致する場合だけ使ってください。</div>';
 return header('体育｜領域・種目・技から探す','学年帯の内容に合わせて、具体的な動きの文例を確認します。')+
 '<div class="grid"><div class="panel wide"><div class="three">'+
 field('学年','<select id="v4-grade">'+v4Opts([1,2,3,4,5,6],v4Grade)+'</select>')+
 field('教科','<select id="v4-subject">'+v4Opts(Object.keys(V4_PUBLISHERS),v4Subject)+'</select>')+
 v7ModeSelector()+'</div>'+
 '<div class="notice" style="margin:12px 0">実技は教科書会社ではなく、文部科学省の学習指導要領による分類です。保健は上の「保健（教科書会社）」に切り替えてください。</div>'+
 v21Fields(v4Grade,f,0,'library')+'</div>'+
 '<div class="panel wide"><h2>観点別の所見文例</h2>'+content+
 '<div class="warning small">文例は公式文ではなく編集用の参考例です。すべての技・種目に文例がそろっているわけではありません。</div></div></div>';
};
document.addEventListener('change',e=>{
 if(e.target?.id==='v4-grade'||e.target?.id==='v7-pe-mode'){
  v21LibraryFilter={domain:'',sport:'',skill:'',axis:''};
  if(page==='unit-bank'&&v4Subject==='体育'&&v7PeMode==='実技'){const y=window.scrollY||0;render();window.scrollTo?.(0,y)}
  return;
 }
 const field=e.target.dataset?.v21Filter;
 if(!field)return;
 const lib=e.target.dataset.v21Context==='library',filter=lib?v21LibraryFilter:v21For(cur(),activeType,Number(e.target.dataset.n));
 const v=e.target.value;
 if(field==='domain'){filter.domain=v;filter.sport='';filter.skill='';filter.axis=''}
 if(field==='sport'){filter.sport=v;filter.skill='';filter.axis=''}
 if(field==='skill'){filter.skill=v;filter.axis=''}
 if(field==='axis')filter.axis=Object.keys(V21_AXIS).find(k=>V21_AXIS[k]===v)||'';
 if(!lib){const st=v8Selection(cur(),activeType,Number(e.target.dataset.n)),d=v21FilterData(cur().grade,filter);st.unit=d.current?.id||'';st.example=''}
 const y=window.scrollY||0;render();window.scrollTo?.(0,y);
});
// A separate reference page for writing comprehensive-study comments: no copy-and-paste achievements.
const V21_INQUIRY_GUIDES=[
 {title:'① 課題を見つけて調べた',parts:['学習テーマ・疑問','どんな資料や方法で調べたか','分かったこと・深まった考え'],
  frame:'「〔テーマ〕」の学習では、〔疑問・課題〕について〔調べ方や工夫〕をし、〔分かったこと・考えたこと〕をまとめました。'},
 {title:'② 活動を工夫して表現した',parts:['取り組んだ活動','相手に伝えるための工夫','表現できたこと・伝わったこと'],
  frame:'「〔テーマ〕」では、〔活動内容〕に取り組み、〔伝え方や制作の工夫〕をして、〔まとめた内容〕を伝えることができました。'},
 {title:'③ 仲間と協力して進めた',parts:['共通の目標','本人の具体的な役割と行動','協力してできたこと'],
  frame:'「〔テーマ〕」の活動では、〔目標〕に向けて〔本人が果たした役割・行動〕をし、友だちと協力して〔成果〕につなげました。'},
 {title:'④ 振り返って学びを深めた',parts:['最初の予想や疑問','活動後に気付いた違いや課題','考えの変化・次への見通し'],
  frame:'「〔テーマ〕」の学習では、〔当初の考え〕について〔調査・体験で得た根拠〕をもとに見直し、〔新たに考えたこと〕をまとめていました。'}
];
function v21InquiryHTML(){
 return header('総合｜文章の構成を考える','活動内容を固定した文例は使わず、文章の順序を参考にして、その子の姿を記述します。')+
 '<div class="notice">基本形は「テーマ・課題 → 実際の行動や工夫 → 学び・成果」。〔　〕には観察した事実を入れます。児童の姿を想像して補わないでください。</div>'+
 '<div class="grid" style="margin-top:15px">'+V21_INQUIRY_GUIDES.map(g=>
  '<div class="panel c6"><h2>'+E(g.title)+'</h2><p class="v21-structure">'+g.parts.map(E).join('　→　')+'</p>'+
  '<div class="v21-copytext">'+E(g.frame)+'</div><p class="small muted">文例バンクへは自動登録されません。</p></div>'
 ).join('')+'</div>'+
 '<div class="inline" style="margin-top:14px"><button class="btn" data-action="page" data-page="edit">一覧編集へ戻る</button></div>';
}
V17_GROUPS['inquiry-structure']='create';
V17_TOOLNAMES['inquiry-structure']='総合の構成例';
V17_TOOLPAGES.create.push('inquiry-structure');
const v21OriginalRender=render;
render=function(){
 if(page==='inquiry-structure'){renderTop();$('main').innerHTML=v21InquiryHTML();return}
 v21OriginalRender();
};
// A reference note rather than adding lesson-specific "comprehensive studies" statements to the saved bank.
const v21PriorBank=bankHTML;
bankHTML=function(){
 return '<div class="notice" style="margin-bottom:12px">総合的な学習の時間は、年度ごとの探究内容が異なるため、共通の検索文例として新規登録しません。<button class="btn softbtn" data-action="page" data-page="inquiry-structure">総合の文章構成例へ</button><span class="small muted"> 過去に保存した文例データは削除しません。</span></div>'+v21PriorBank();
};
const v21PriorStage=v17StageHTML;
v17StageHTML=function(){
 const h=v21PriorStage();
 if(page!=='stage-create')return h;
 return h.replace('</div></div>', '</div></div>')+
 '<div class="notice" style="margin-top:12px"><strong>総合の所見</strong>：過去のテーマ別文例を使い回さず、文章の順序を参考にして書けます。 <button class="btn softbtn" data-action="page" data-page="inquiry-structure">構成例を見る</button></div>';
};
const v21Style=document.createElement('style');
v21Style.textContent='.v21-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:12px 0}.v21-grid .field{min-width:0}.v21-band{padding:10px 12px;background:#f1f7f2;border:1px solid #d8e7da;border-radius:11px;font-weight:700;color:#3f6450;font-size:12px}.v21-note{margin-top:10px}.v21-section{padding:14px;margin:12px 0;border-radius:12px}.v21-copytext{padding:12px;border:1px solid #dbe7dc;border-radius:12px;background:#fffdf9;margin:9px 0;white-space:pre-wrap;line-height:1.85}.v21-structure{background:#eff6ed;padding:10px;border-radius:10px;font-weight:700;color:#426c53}@media(max-width:690px){.v21-grid{grid-template-columns:1fr}}';
document.head.appendChild(v21Style);
