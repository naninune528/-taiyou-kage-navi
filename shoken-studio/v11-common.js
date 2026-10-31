/* Shoken STUDIO v1.1: common-activity text -> many pupils -> individualized adjustment */
let v11Type='総合的な学習の時間',v11Category='係',v11Activity='',v11Text='',v11Numbers='全員',v11Mode='append',v11BankId='',v11Preview=null,v11SaveBank=true;
const v11Categories=['友達との関わり','行動','クラブ','委員会','係','当番','実行委員','代表委員会','その他'];
const v11Style=document.createElement('style');
v11Style.textContent='.v11-box{background:#fafcf9;border:1px solid #e0e9de;border-radius:14px;padding:13px}.v11-toolbar{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin:12px 0}.v11-chips{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:7px}.v11-chips .share-chip{min-width:0;padding:10px 0}.v11-preview{background:white;border:1px solid #dbe5d8;border-radius:12px;padding:12px;max-height:380px;overflow:auto}.v11-preview-row{display:grid;grid-template-columns:62px 100px minmax(0,1fr);gap:10px;padding:8px 0;font-size:12px;border-bottom:1px solid #e7ece5;align-items:start}.v11-preview-row:last-child{border-bottom:0}.v11-preview-row span{overflow-wrap:anywhere}.v11-preview-row .skip{color:#a26851}.v11-textarea{width:100%;min-height:155px;background:#fffefb;border:1px solid #c7dacb;border-radius:11px;padding:13px;font-size:14px;line-height:1.9;resize:vertical}@media(max-width:690px){.v11-chips{grid-template-columns:repeat(5,minmax(0,1fr))}.v11-preview-row{grid-template-columns:48px 74px minmax(0,1fr);gap:5px}}';
document.head.appendChild(v11Style);
function v11BankList(){
 const c=cur(),sub=v11Type==='総合的な学習の時間'?'総合的な学習の時間':'生活・特別活動';
 return S.bank.filter(b=>Number(b.grade)===Number(c.grade)&&b.subject===sub);
}
function v11Selected(){
 const c=cur();
 return parseNumbers(v11Numbers,c.count).filter(n=>!c.missing.includes(n));
}
function v11UnitKey(){
 return JSON.stringify([v11Type,v11Type==='総合所見'?v11Category:'総合的な学習の時間',v11Activity.trim()]);
}
function v11Prepare(){
 const c=cur(),text=v11Text.trim(),numbers=v11Selected(),key=v11UnitKey(),result=[];
 for(const n of numbers){
  const row=getEnt(c,v11Type,n);
  let status='追加';
  if(!text)status='文章未入力';
  else if(!v11Activity.trim())status='活動名が未入力';
  else if(row.status==='確定')status='確定済み・変更しない';
  else if((row.commonAppliedKeys||[]).includes(key)||row.text.includes(text))status='同じ活動の配置済み';
  else if(v11Mode==='empty'&&row.text.trim())status='文章あり・変更しない';
  result.push({number:n,status,text:row.text.trim()&&v11Mode==='append'?row.text.trimEnd()+'\n'+text:text});
 }
 return result;
}
function v11PreviewToken(){
 return JSON.stringify([cur().id,cur().count,cur().missing,v11Type,v11Category,v11Activity,v11Text,v11Numbers,v11Mode,v11Prepare().map(x=>[x.number,x.status])]);
}
function v11MiniPanel(){
 return '<div class="panel wide" style="margin-top:17px"><div class="inline between"><div><div class="section-kicker">ONE BASE / MANY INDIVIDUALS</div><h2 style="margin:3px 0">共通活動の文章を一括配置</h2></div><button class="btn softbtn" data-v11="go">専用画面で作成 ↗</button></div>'+
 '<p class="muted small">総合の共通活動や係・委員会などは、1つの文章をまとめて配置してから個別に微調整。すでに書いた文章は残せます。</p></div>';
}
const v11OldAssign=assignHTML;
assignHTML=function(){return v11OldAssign()+v11MiniPanel()};
const v11OldTop=renderTop;
renderTop=function(){
 v11OldTop();const bar=$('tabs');if(!bar||bar.querySelector('[data-page="common"]'))return;
 const btn=document.createElement('button');btn.className='tab'+(page==='common'?' active':'');btn.dataset.page='common';btn.dataset.action='page';btn.textContent='✦ 共通活動を一括配置';
 const ref=bar.querySelector('[data-page="edit"]');bar.insertBefore(btn,ref);
};
function v11Buttons(){
 const c=cur(),sel=new Set(v11Selected());
 return '<div class="v11-toolbar">'+['全員','奇数','偶数'].map(x=>'<button class="btn softbtn" data-v11="preset" data-group="'+x+'">'+x+'</button>').join('')+
 '<button class="btn" data-v11="preset" data-group="">解除</button><span class="tag">'+sel.size+'名選択</span></div>'+
 '<div class="v11-chips">'+Array.from({length:c.count},(_,i)=>i+1).map(n=>'<button class="share-chip'+(sel.has(n)?' is-selected':'')+(c.missing.includes(n)?' is-missing':'')+
 '" aria-pressed="'+(sel.has(n)?'true':'false')+'" data-v11="number" data-n="'+n+'" '+(c.missing.includes(n)?'disabled':'')+'>'+n+'</button>').join('')+'</div>';
}
function v11ExampleOptions(){
 return '<option value="">自分で文章を入力</option>'+v11BankList().map(b=>'<option value="'+b.id+'"'+(String(b.id)===v11BankId?' selected':'')+'>'+E((b.unit||'活動')+'｜'+b.text.slice(0,35)+'…')+'</option>').join('');
}
function v11PreviewHTML(){
 const rows=v11Prepare(),count=rows.filter(x=>x.status==='追加').length;
 if(!v11Preview)return '<div class="notice">先に文章を入力し、番号を選んで「配置内容を確認」を押してください。</div>';
 return '<div class="v11-preview"><div class="inline between"><strong>確認用プレビュー</strong><span class="tag">'+count+'名に配置可能</span></div>'+
 rows.map(x=>'<div class="v11-preview-row"><strong>'+x.number+'番</strong><span class="'+(x.status==='追加'?'':'skip')+'">'+x.status+'</span><span>'+E(x.status==='追加'?x.text:x.status==='同じ活動の配置済み'?'すでに配置済み':'既存文章は保護します')+'</span></div>').join('')+
 '</div><p class="hint" style="margin-top:9px">配置後は「一覧編集」で各番号の所見を自由に修正できます。</p>';
}
function v11CommonHTML(){
 const c=cur(),base=v11Type==='総合所見';
 const options=['総合的な学習の時間','総合所見'];
 return header('共通活動を一括配置','同じ活動の文章を土台にして、該当する番号へ配置。完成させるのは個別の微調整から。')+
 '<div class="grid"><div class="panel c7"><div class="section-kicker">COMMON ACTIVITY</div><h2 style="margin:4px 0 8px">活動と共通文を決める</h2>'+
 '<div class="two">'+field('対象クラス','<select data-v11-field="class">'+classOpts()+'</select>')+
 field('配置先の所見','<select data-v11-field="type">'+options.map(x=>option(x,v11Type)).join('')+'</select>')+'</div>'+
 (base?'<div class="field" style="margin-top:12px"><label>生活・特別活動の種類</label><select data-v11-field="category">'+v11Categories.map(x=>option(x,v11Category)).join('')+'</select></div>':
 '<div class="notice" style="margin-top:12px">総合的な学習の時間の文章に配置します。教科学習・係活動の欄には混ざりません。</div>')+
 '<div class="field" style="margin-top:13px"><label>活動名・テーマ</label><input data-v11-field="activity" value="'+E(v11Activity)+'" placeholder="'+(base?'例：新聞係・実行委員・給食当番':'例：地域調べ・福祉・防災')+'"></div>'+
 '<div class="field" style="margin-top:13px"><label>登録済み文例を使う（任意）</label><select data-v11-field="bank">'+v11ExampleOptions()+'</select></div>'+
 '<div class="field" style="margin-top:13px"><label>共通の文章（ここをコピーして配置）</label>'+
 '<textarea class="v11-textarea" data-v11-field="text" placeholder="'+(base?'係活動では、友だちと協力して取り組み、学級のために自分の役割を果たしていました。':'総合的な学習の時間では、地域の特色について資料を集め、調べたことを分かりやすく整理していました。')+'">'+E(v11Text)+'</textarea></div>'+
 '<div class="notice" style="margin-top:9px">文章は自動で不自然につなぎません。書いた内容をそのまま配置し、各番号の一覧から修正できます。</div>'+
 '<label class="inline small" style="margin-top:14px"><input type="checkbox" id="v11-save-bank"'+(v11SaveBank?' checked':'')+'> 共通文を文例バンクにも保存する（同じ活動で再利用）</label>'+ 
 '<hr class="hr"><h2 style="margin-bottom:5px">配置する番号を選ぶ</h2>'+
 field('番号指定（カンマやハイフンも使えます）','<input data-v11-field="numbers" value="'+E(v11Numbers)+'" placeholder="例：1,3,5-12 または 全員">')+
 v11Buttons()+
 '<div class="field" style="margin-top:12px"><label>すでに文章がある場合</label><select data-v11-field="mode">'+
 '<option value="append"'+(v11Mode==='append'?' selected':'')+'>既存文章の後ろに追加（おすすめ）</option>'+
 '<option value="empty"'+(v11Mode==='empty'?' selected':'')+'>空欄の番号だけに配置</option></select></div>'+
 '<div class="warning small" style="margin-top:12px">欠番・確定済み・同じ活動の配置済み番号は変更しません。学習状況を確認せずに全員「確定」にはしません。</div>'+
 '<div class="inline" style="margin-top:16px"><button class="btn primary" data-v11="preview">配置内容を確認する</button>'+
 '<button class="btn softbtn" data-v11="apply"'+(v11Preview?'':' disabled')+'>確認した文章を一括配置</button></div></div>'+
 '<div class="panel c5"><div class="section-kicker">PREVIEW / INDIVIDUAL ADJUSTMENT</div><h2 style="margin:4px 0 12px">番号別のプレビュー</h2>'+
 v11PreviewHTML()+
 '<div class="v11-box" style="margin-top:16px"><strong>配置後の流れ</strong>'+
 '<p class="small muted" style="margin:8px 0">①共通文を配置 → ②一覧から各番号の文章を修正 → ③文字数・内容を確認 → ④確定。配置するだけでは完成扱いにしません。</p>'+
 '<button class="btn" data-v11="edit">一覧で微調整する →</button></div></div></div>';
}
const v11OldRender=render;
render=function(){if(page==='common'){renderTop();$('main').innerHTML=v11CommonHTML();return}v11OldRender()};
document.addEventListener('input',e=>{
 const field=e.target?.dataset?.v11Field;if(!field)return;
 if(field==='activity'){v11Activity=e.target.value;v11Preview=null}
 else if(field==='text'){v11Text=e.target.value;v11Preview=null}
 else if(field==='numbers'){v11Numbers=e.target.value;v11Preview=null}
});
document.addEventListener('change',e=>{
 const field=e.target?.dataset?.v11Field;if(!field)return;
 if(field==='class'){activeClass=Number(e.target.value);v11Preview=null;v11BankId='';render()}
 else if(field==='type'){v11Type=e.target.value;v11Preview=null;v11BankId='';render()}
 else if(field==='category'){v11Category=e.target.value;v11Preview=null;render()}
 else if(field==='mode'){v11Mode=e.target.value;v11Preview=null;render()}
 else if(field==='numbers'){v11Numbers=e.target.value;v11Preview=null;render()}
 else if(field==='bank'){v11BankId=e.target.value;const b=S.bank.find(x=>String(x.id)===v11BankId);if(b){v11Text=b.text;v11Activity=b.unit||v11Activity}v11Preview=null;render()}
});
document.addEventListener('change',e=>{if(e.target?.id==='v11-save-bank')v11SaveBank=!!e.target.checked});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v11]');if(!b)return;
 const action=b.dataset.v11;
 if(action==='go'){v11Type=activeType==='総合的な学習の時間'?'総合的な学習の時間':'総合所見';v11Preview=null;page='common';render();return}
 if(action==='edit'){activeType=v11Type;page='edit';render();return}
 if(action==='preset'){v11Numbers=b.dataset.group||'';v11Preview=null;render();return}
 if(action==='number'){
  const c=cur(),n=Number(b.dataset.n),selected=new Set(v11Selected());if(c.missing.includes(n))return;
  if(selected.has(n))selected.delete(n);else selected.add(n);
  v11Numbers=[...selected].sort((a,z)=>a-z).join(',');v11Preview=null;render();return;
 }
 if(action==='preview'){
  if(!v11Text.trim()||!v11Activity.trim()){toast('活動名と共通文を入力してください');return}
  const values=v11Prepare();if(!values.length){toast('配置対象の番号を選んでください');return}
  v11Preview=v11PreviewToken();render();return;
 }
 if(action!=='apply')return;
 const token=v11PreviewToken();
 if(!v11Preview||v11Preview!==token){v11Preview=null;render();toast('内容が変更されました。もう一度プレビューを確認してください');return}
 const p=v11Prepare(),allowed=p.filter(x=>x.status==='追加'),c=cur(),type=v11Type;
 if(!allowed.length){toast('配置できる番号はありません');return}
 if(!confirm(allowed.length+'名へ共通文を仮配置します。配置後に一人ひとりの学習の姿を確認しますか？'))return;
 const text=v11Text.trim(),unit=v11Activity.trim(),key=v11UnitKey();
 if(v11SaveBank){
  const subject=type==='総合所見'?'生活・特別活動':'総合的な学習の時間';
  if(!S.bank.some(x=>x.grade===c.grade&&x.subject===subject&&x.unit===unit&&x.text===text)){
   S.bank.push({id:S.nextId++,grade:c.grade,subject,unit,text,tag:'共通活動の文例（確認・微調整用）',activityCategory:type==='総合所見'?v11Category:'総合的な学習の時間'});
  }
 }
 for(const x of allowed){
  const row=getEnt(c,type,x.number),keys=Array.isArray(row.commonAppliedKeys)?row.commonAppliedKeys:[];
  editEnt(c,type,x.number,{text:x.text,status:row.status==='要検討'?'要検討':'下書き',touched:true,commonAppliedKeys:[...keys,key]});
 }
 v11Preview=null;activeType=type;page='edit';render();toast(allowed.length+'名に配置しました。各番号の文章を調整できます');
});
