/* Shoken STUDIO v1.2: guided, observation-grounded comment authoring */
let v12Guide=null;
const V12_ACTIONS=[
 {id:'evidence',label:'根拠をもとに考えた',text:'学習したことを振り返り、根拠を示しながら自分の考えをまとめることができました。',
  question:'どのような根拠を使っていましたか？',suggestions:[
  '教科書や資料の言葉を確かめ、自分の説明に生かしていました。',
  '記録を見返して理由を考え、自分の言葉で説明していました。',
  '友だちに理由を伝えるため、根拠になる部分を探していました。']},
 {id:'compare',label:'比べて考えた',text:'複数の結果や考えを比べ、共通点や違いに着目して考えることができました。',
  question:'何を比べて、どのような様子がありましたか？',suggestions:[
  '比べて分かったことを、ノートに整理していました。',
  '違いに気付いた理由を、資料に戻って確かめていました。',
  '友だちの考えと自分の考えの共通点を見つけていました。']},
 {id:'communicate',label:'考えを伝えた',text:'自分の考えを整理し、相手に伝わるように説明することができました。',
  question:'どんな伝え方を工夫していましたか？',suggestions:[
  '説明の順番を工夫しながら、分かりやすく伝えていました。',
  '自分の考えを伝える前に、理由を確かめ直していました。',
  '相手の反応を見ながら、言葉を選んで伝えていました。']},
 {id:'revise',label:'考えを見直した',text:'友だちの意見や学習の結果を手がかりに、自分の考えを見直していました。',
  question:'どんなきっかけで考えを見直しましたか？',suggestions:[
  '友だちの説明を聞いた後、自分の考えをノートに書き直していました。',
  '予想と結果が違うことに気付き、理由を確かめ直していました。',
  '新しい気付きを、振り返りに付け加えていました。']},
 {id:'persist',label:'繰り返し工夫した',text:'うまくいかない場面でも方法を工夫し、粘り強く取り組んでいました。',
  question:'どんな工夫を繰り返していましたか？',suggestions:[
  'できなかったところを確かめ、方法を変えて試していました。',
  '前回の反省を生かし、目標をもって取り組んでいました。',
  'やり方を友だちと確かめ合い、よりよい方法を探していました。']},
 {id:'team',label:'友だちと協力した',text:'友だちと協力しながら、自分の役割を考えて活動していました。',
  question:'どんな協力の姿が見られましたか？',suggestions:[
  '友だちの意見を聞き、役割を分担して進めていました。',
  '困っている友だちに気付き、自分から声をかけていました。',
  '周りの様子を見て、必要な仕事に取り組んでいました。']},
 {id:'initiative',label:'自分から取り組んだ',text:'活動の中で必要なことを自分から見つけ、進んで取り組んでいました。',
  question:'自分から行動したのは、どんなときですか？',suggestions:[
  '次に必要な準備を考え、自分から取りかかっていました。',
  '疑問に感じたことを、資料や友だちの考えを手がかりに確かめていました。',
  '活動を振り返り、次に生かしたいことを考えていました。']},
 {id:'organize',label:'調べたことを整理した',text:'調べたことを整理し、分かったことを相手に伝えることができました。',
  question:'どのように整理・表現していましたか？',suggestions:[
  '集めた情報を比べ、必要な内容を選んでまとめていました。',
  '図や言葉を使い、伝えたいことを分かりやすく整理していました。',
  '伝え方を見直しながら、発表の準備を進めていました。']}
];
const V12_MORAL=[
 {id:'moral-reflect',label:'自分の考えをもった',text:'登場人物の行動や気持ちを考え、自分の思いを理由とともに話していました。',
 question:'どんな考え方が見られましたか？',suggestions:[
 '自分だったらどうするかを考え、理由を添えて発言していました。',
 '物語の場面を振り返り、登場人物の立場から考えていました。',
 '日頃の生活と結び付け、自分の考えをまとめていました。']},
 {id:'moral-dialogue',label:'友だちの考えから学んだ',text:'友だちの意見に耳を傾け、さまざまな考え方があることに気付いていました。',
 question:'話し合いでどんな様子がありましたか？',suggestions:[
 '自分とは異なる意見も受け止め、考えを付け加えていました。',
 '友だちの考えと自分の考えを比べて話していました。',
 '新しく気付いたことを、振り返りに書いていました。']},
 {id:'moral-depth',label:'考えを深めた',text:'登場人物の気持ちの変化に着目し、自分の考えを深めていました。',
 question:'何を手がかりに考えていましたか？',suggestions:[
 '登場人物の言葉を手がかりに、行動の理由を考えていました。',
 '友だちと意見を交わし、別の見方についても考えていました。',
 '授業の始めと終わりで考えが変わった理由を振り返っていました。']}
];
const V12_FOREIGN=[
 {id:'foreign-speak',label:'やり取りを工夫した',text:'学習した表現を使い、友だちと進んでやり取りしていました。',
 question:'どんな工夫をしていましたか？',suggestions:[
 '相手に伝わるように、声の大きさや身振りを工夫していました。',
 '相手の答えを聞き、さらに質問しようとしていました。',
 '学習した言い方を確かめながら、繰り返し伝えていました。']},
 {id:'foreign-listen',label:'相手の話をよく聞いた',text:'相手の話をよく聞き、分かったことをもとにやり取りしていました。',
 question:'聞くときの様子はどうでしたか？',suggestions:[
 '相手の表情や身振りにも注目して聞いていました。',
 '聞き取れた表現を手がかりに、質問に答えていました。',
 '分からないときは、もう一度確かめようとしていました。']},
 {id:'foreign-try',label:'繰り返し挑戦した',text:'新しい表現にも関心をもち、繰り返し使おうとしていました。',
 question:'どの場面で挑戦していましたか？',suggestions:[
 '友だちとの活動で、学習した言い方を何度も使っていました。',
 '表現を確かめながら、自分から声をかけていました。',
 '振り返りで、次に使いたい表現を考えていました。']}
];
const v12CSS=document.createElement('style');
v12CSS.textContent='.v12-panel{border:1px solid #dce7dc;border-radius:18px;background:#fffdf8;padding:20px}.v12-heading{font-size:12px;font-weight:800;color:#47745c;letter-spacing:.03em;margin-bottom:9px}.v12-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.v12-choice{border:1px solid #d4e1d7;background:#f7faf6;border-radius:12px;padding:12px;text-align:left;line-height:1.55;cursor:pointer;color:#3a5e4c;font-weight:650}.v12-choice.selected{border-color:#59846c;background:#e4f0e5;box-shadow:inset 0 0 0 1px #6c957b}.v12-suggest{display:flex;flex-direction:column;gap:8px}.v12-suggest button{text-align:left}.v12-textarea{width:100%;min-height:125px;padding:13px;border:1px solid #c7d8c9;border-radius:12px;background:white;resize:vertical;line-height:1.9}.v12-info{color:#64786c;font-size:12px;line-height:1.8}.v12-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}@media(max-width:700px){.v12-grid{grid-template-columns:1fr}.v12-panel{padding:14px}}';
document.head.appendChild(v12CSS);
function v12GetAction(){return V12_ACTIONS.concat(V12_MORAL,V12_FOREIGN).find(x=>x.id===v12Guide?.action)}
function v12ActionChoices(){
 if(!v12Guide)return V12_ACTIONS;
 if(v12Guide.type==='道徳')return V12_MORAL;
 if(v12Guide.type==='外国語活動')return V12_FOREIGN;
 return V12_ACTIONS;
}
function v12LessonName(){
 const g=v12Guide;
 if(!g)return '';
 const unit=g.unit.trim(),sub=g.subject;
 if(sub==='生活・特別活動')return unit?unit+'では、':'係・当番活動では、';
 if(g.type==='総合的な学習の時間')return unit?'総合的な学習の時間の「'+unit+'」では、':'総合的な学習の時間では、';
 if(g.type==='道徳')return unit?'道徳の「'+unit+'」では、':'道徳の学習では、';
 if(g.type==='外国語活動')return unit?'外国語活動の「'+unit+'」では、':'外国語活動では、';
 if(sub==='学習全般')return unit?'「'+unit+'」の学習では、':'学習の中で、';
 return unit?sub+'の「'+unit+'」の学習では、':sub+'の学習では、';
}
function v12Sentence(text){
 return String(text||'').trim().replace(/[。！？]+$/,'')+'。';
}
function v12NaturalPreview(){
 const g=v12Guide,a=v12GetAction();
 if(!g||!a)return '';
 let text=v12LessonName()+v12Sentence(a.text);
 const detail=String(g.detail||'').trim();
 if(detail){text+=v12Sentence(detail)}
 return applyRules(text);
}
function v12Start(n){
 const c=cur(),t=activeType;
 if(c.missing.includes(n)){toast('欠番は選べません');return}
 const row=v8Selection(c,t,n),units=v8Available(c,row.subject),chosen=units.find(x=>x.id===row.unit);
 const available=v8Subjects(c,t);
 const sub=available.includes(row.subject)?row.subject:(t==='総合所見'?'学習全般':t);
 v12Guide={classId:c.id,type:t,number:n,subject:sub,unit:chosen?.unit||'',action:'',detail:'',draft:'',mode:getEnt(c,t,n).text.trim()?'append':'replace'};
 page='guide';render();
}
const v12PreviousPicker=v8Picker;
v8Picker=function(c,t,n){
 return v12PreviousPicker(c,t,n)+
 '<div class="v12-actions"><button class="btn softbtn" data-v12="start" data-n="'+n+'">✦ ぴったりの文例がない → 質問から考える</button></div>';
};
const v12PreviousRender=render;
render=function(){
 if(page==='guide'){renderTop();$('main').innerHTML=v12HTML();return}
 v12PreviousRender();
};
function v12HTML(){
 const g=v12Guide;if(!g)return header('質問から文章を作る','一覧編集から作業番号を選んでください。');
 const c=S.classes.find(x=>x.id===g.classId),src=getEnt(c,g.type,g.number);
 const a=v12GetAction(),choices=v12ActionChoices();
 const subjectList=v8Subjects(c,g.type),detailSelected=!!g.detail;
 return header('その子らしい文章を考える','ちょうどよい文例がなくても大丈夫。3つの問いから、実際に見られた姿を文章にします。')+
 '<div class="inline" style="margin:0 0 15px"><span class="tag">'+E(labelClass(c))+'</span><span class="tag">作業番号 '+g.number+'</span><span class="tag">'+E(g.type)+'</span><button class="btn" data-v12="back">一覧へ戻る</button></div>'+
 '<div class="grid"><div class="panel c7"><div class="stack">'+
 '<div class="v12-panel"><div class="v12-heading">質問 1｜どの単元・活動での姿？</div>'+
 '<div class="two"><div class="field"><label>教科・領域</label><select data-v12-field="subject"'+(g.type==='総合所見'?'':' disabled')+'>'+
 subjectList.map(s=>option(s,g.subject)).join('')+'</select></div>'+
 '<div class="field"><label>単元・活動名</label><input data-v12-field="unit" value="'+E(g.unit)+'" placeholder="例：ちいちゃんのかげおくり／誕生日係"></div></div>'+
 '<p class="v12-info" style="margin:10px 0 0">単元名は一覧で選んだ内容を引き継ぎます。選ばれていない場合はここで入力できます。</p></div>'+
 '<div class="v12-panel"><div class="v12-heading">質問 2｜一番近い学習の姿は？</div>'+
 '<div class="v12-grid">'+choices.map(x=>'<button type="button" class="v12-choice'+(x.id===g.action?' selected':'')+'" data-v12="action" data-id="'+x.id+'">'+E(x.label)+'</button>').join('')+'</div>'+
 '<p class="v12-info" style="margin:10px 0 0">この児童に実際に見られた姿だけを選んでね。</p></div>'+
 '<div class="v12-panel"><div class="v12-heading">質問 3｜その子らしさが表れた具体的な場面は？</div>'+
 (a?'<p><strong>'+E(a.question)+'</strong></p><div class="v12-suggest">'+a.suggestions.map((x,i)=>
 '<button type="button" class="v12-choice'+(x===g.detail?' selected':'')+'" data-v12="detail" data-i="'+i+'">'+E(x)+'</button>').join('')+'</div>':
 '<p class="v12-info">先に質問2を選ぶと、考えるヒントが表示されます。</p>')+
 '<div class="field" style="margin-top:12px"><label>見られた事実を自分の言葉で（任意・完成した一文）</label>'+
 '<textarea class="v12-textarea" data-v12-field="detail" placeholder="例：二つのかげおくりを比べ、本文の言葉を根拠に説明していました。">'+E(g.detail)+'</textarea></div>'+
 '<p class="v12-info" style="margin:7px 0 0">提案の文はヒント。事実と違えば選ばずに、下の欄に観察した行動を書いてね。名前など個人を特定できる情報は入力しないでください。</p></div>'+
 '</div></div>'+
 '<div class="panel c5"><div class="section-kicker">YOUR DRAFT</div><h2 style="margin:3px 0 10px">下書きを確認・修正</h2>'+
 '<p class="v12-info">選択した内容だけで下書きにします。アプリが児童の姿を推測して書き足すことはありません。</p>'+
 '<button class="btn primary" data-v12="make"'+(a?'':' disabled')+'>回答から下書きを作る</button>'+
 '<div class="field" style="margin-top:14px"><label>所見文（自由に修正）</label><textarea id="v12-draft" class="v12-textarea" data-v12-field="draft" placeholder="質問2を選んで「回答から下書きを作る」を押してください">'+E(g.draft)+'</textarea></div>'+
 '<div class="v12-info">'+Array.from(g.draft).length+'字／文字数条件 '+v8Limits(g.type).min+'〜'+v8Limits(g.type).max+'字</div>'+
 (src.text.trim()?'<div class="notice" style="margin-top:12px"><strong>現在の所見</strong><p style="white-space:pre-wrap;margin:5px 0 0">'+E(src.text.slice(0,500))+'</p></div>':'')+
 '<div class="field" style="margin-top:12px"><label>今の文章への配置方法</label><select data-v12-field="mode">'+
 '<option value="append"'+(g.mode==='append'?' selected':'')+'>後ろに追加する</option>'+
 '<option value="replace"'+(g.mode==='replace'?' selected':'')+'>この下書きで置き換える</option></select></div>'+
 '<div class="v12-actions"><button class="btn primary" data-v12="insert"'+(!g.draft.trim()?' disabled':'')+'>作業番号'+g.number+'に配置</button><button class="btn" data-v12="back">キャンセル</button></div>'+
 '<div class="warning small" style="margin-top:15px">文例の自動生成AIではなく、観察した姿から文章を組み立てるオフライン補助機能です。配置後は「要検討」とし、個別に事実を確認してから確定してください。確定済みの所見は変更しません。</div>'+
 '</div></div>';
}
document.addEventListener('input',e=>{
 const field=e.target?.dataset?.v12Field;if(!field||!v12Guide)return;
 if(field==='unit'||field==='detail'||field==='draft')v12Guide[field]=e.target.value;
 if(field==='unit'||field==='detail')v12Guide.draft='';
});
document.addEventListener('change',e=>{
 const field=e.target?.dataset?.v12Field;if(!field||!v12Guide)return;
 if(field==='subject'){v12Guide.subject=e.target.value;v12Guide.draft='';render()}
 else if(field==='mode')v12Guide.mode=e.target.value;
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v12]');if(!b)return;
 const name=b.dataset.v12;
 if(name==='start'){v12Start(Number(b.dataset.n));return}
 if(!v12Guide)return;
 const g=v12Guide,c=S.classes.find(x=>x.id===g.classId);
 if(name==='back'){activeClass=g.classId;activeType=g.type;page='edit';render();return}
 if(name==='action'){g.action=b.dataset.id;g.detail='';g.draft='';render();return}
 if(name==='detail'){const a=v12GetAction();if(!a)return;const pick=a.suggestions[Number(b.dataset.i)];g.detail=g.detail===pick?'':pick;g.draft='';render();return}
 if(name==='make'){
  if(!v12GetAction()){toast('質問2の学習の姿を選んでください');return}
  g.draft=v12NaturalPreview();render();toast('下書きを作りました。内容を確認し、必要な部分を修正してください');return;
 }
 if(name==='insert'){
  const row=getEnt(c,g.type,g.number),text=g.draft.trim();
  if(!text){toast('下書きを入力してください');return}
  if(c.missing.includes(g.number)){toast('欠番には配置できません');return}
  if(row.status==='確定'){toast('確定済みの文章はこの機能では変更できません');return}
  if(row.text.includes(text)){toast('同じ文章がすでに入っています');return}
  if(g.mode==='replace'&&row.text.trim()&&!confirm('作業番号'+g.number+'の文章を置き換えますか？'))return;
  const result=g.mode==='append'&&row.text.trim()?row.text.trimEnd()+'\n'+text:text;
  editEnt(c,g.type,g.number,{text:result,status:'要検討',touched:true,guideUsed:true});
  activeClass=c.id;activeType=g.type;page='edit';render();toast('下書きを配置しました。観察した姿と合うか確認してください');
 }
});
