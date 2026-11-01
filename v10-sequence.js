/* Shoken STUDIO v1.0 - optional round-robin tentative placement */
let v10Choices=[],v10Context='',v10Scope='empty',v10PreviewVisible=false;
const v10Css=document.createElement('style');
v10Css.textContent='.v10-panel{margin-top:17px}.v10-choice-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v10-choice{background:#f6faf4;border:1px solid #e0e9dc;border-radius:12px;padding:10px}.v10-choice select{width:100%;min-width:0;padding:9px;border:1px solid #d2ddcf;border-radius:8px;color:#314b3e;background:white}.v10-plan{max-height:320px;overflow-y:auto;background:#fffdf7;border:1px solid #e6eadf;border-radius:11px;margin-top:12px;padding:12px}.v10-plan-line{display:grid;grid-template-columns:75px 80px minmax(0,1fr);gap:6px;padding:7px 0;border-bottom:1px solid #ebefe7;align-items:baseline;font-size:12px}.v10-plan-line:last-child{border:0}.v10-plan-line span{overflow-wrap:anywhere}.v10-warning{font-size:12px;color:#865a36;background:#fdf5e7;border:1px solid #edddbd;border-radius:11px;padding:11px;margin:14px 0}@media(max-width:680px){.v10-choice-grid{grid-template-columns:1fr}.v10-plan-line{grid-template-columns:64px 64px minmax(0,1fr)}}';
document.head.appendChild(v10Css);
function v10Available(){
 const c=cur();
 return S.bank.filter(b=>Number(b.grade)===Number(c.grade)&&inferredType(b.subject)===activeType);
}
function v10Sync(){
 const key=cur().id+'|'+activeType;
 if(key===v10Context)return;
 v10Context=key;v10Scope='empty';v10PreviewVisible=false;
 v10Choices=v10Available().slice(0,6).map(x=>String(x.id));
 while(v10Choices.length<6)v10Choices.push('');
}
function v10TargetNumbers(){
 const c=cur();
 const base=v10Scope==='selected'?v8Chosen(c):Array.from({length:c.count},(_,i)=>i+1);
 return base.filter(n=>!c.missing.includes(n)&&!getEnt(c,activeType,n).text.trim());
}
function v10Plan(){
 const list=v10Available(),selected=v10Choices.filter(Boolean).map(id=>list.find(x=>String(x.id)===String(id))).filter(Boolean);
 const used=new Set(),items=selected.filter(x=>{if(used.has(x.id))return false;used.add(x.id);return true});
 return {templates:items,assignments:v10TargetNumbers().map((n,i)=>({number:n,bank:items.length?items[i%items.length]:null}))};
}
function v10PlanHTML(){
 const p=v10Plan(),num=p.assignments.length;
 if(!p.templates.length)return '<p class="hint">配置する文例を選んでね。文例が少ない場合は「まとめて登録」で追加できます。</p>';
 if(!num)return '<div class="notice">対象の未配置番号はありません。必要なら一覧編集で個別に修正できます。</div>';
 return '<div class="v10-plan"><div class="inline between"><strong>仮配置のプレビュー</strong><span class="tag">'+num+'名・'+p.templates.length+'文例を順番に利用</span></div>'+
 p.assignments.slice(0,40).map((x,i)=>'<div class="v10-plan-line"><strong>作業番号'+x.number+'</strong><span>文例'+(i%p.templates.length+1)+'</span><span>'+E(x.bank.text.slice(0,65))+(x.bank.text.length>65?'…':'')+'</span></div>').join('')+'</div>'+
 '<p class="hint" style="margin:8px 0 0">ここに表示した番号と文例の対応で仮配置します。割り振った文章は「要検討」になり、後から変更できます。</p>';
}
function v10Panel(){
 v10Sync();
 const available=v10Available(),p=v10Plan();
 return '<div class="panel wide v10-panel"><div class="section-kicker">TENTATIVE BULK PLACEMENT</div>'+
 '<h2 style="margin:4px 0 6px">複数文例を順番に仮配置</h2>'+
 '<p class="muted small">道徳や外国語活動の文例を最大6種類選び、未配置の番号に1→2→3→4→5→6→1…と割り振ります。</p>'+
 '<div class="inline" style="margin:14px 0 8px"><span class="tag">'+E(labelClass(cur()))+'</span><span class="tag">'+E(activeType)+'</span><button class="btn softbtn" data-v10="paste">文例をまとめて登録 →</button></div>'+
 '<div class="v10-choice-grid">'+v10Choices.map((id,i)=>'<div class="v10-choice"><div class="field"><label>文例 '+(i+1)+'</label><select data-v10-pattern="'+i+'"><option value="">選ばない</option>'+
 available.map(b=>'<option value="'+b.id+'"'+(String(b.id)===id?' selected':'')+'>'+E((b.unit||'自由文例')+'｜'+b.text.slice(0,35)+(b.text.length>35?'…':''))+'</option>').join('')+
 '</select></div></div>').join('')+'</div>'+
 (available.length<6?'<p class="hint" style="margin-top:8px">このクラス・所見には現在'+available.length+'文例が登録されています。6種類使う場合は、先に文例をまとめて登録してください。</p>':'')+
 '<div class="field" style="margin-top:14px"><label>仮配置する番号</label><select data-v10-scope="scope"><option value="empty"'+(v10Scope==='empty'?' selected':'')+'>クラスの未配置全員（おすすめ）</option><option value="selected"'+(v10Scope==='selected'?' selected':'')+'>上で選択した番号のうち未配置だけ</option></select></div>'+
 '<div class="v10-warning">これは一時的な仮置きです。文例の順番は児童の実態と無関係なので、<strong>必ず個別に内容を確認・修正</strong>してください。欠番・文章が入っている番号・確定済みの文章は変更しません。</div>'+
 '<div class="inline"><button class="btn softbtn" data-v10="preview">割り振りを確認する（'+p.assignments.length+'名）</button><button class="btn primary" data-v10="apply"'+(!p.assignments.length||!p.templates.length?' disabled':'')+'>順番に仮配置する</button></div>'+
 (v10PreviewVisible?v10PlanHTML():'<p class="hint" style="margin:11px 0 0">先に「割り振りを確認する」を押すと、誰にどの文例が入るか確認できます。</p>')+'</div>';
}
const v10OldAssign=assignHTML;
assignHTML=function(){return v10OldAssign()+v10Panel()};
document.addEventListener('change',e=>{
 if(e.target?.dataset?.v10Pattern!==undefined){
  v10Choices[Number(e.target.dataset.v10Pattern)]=String(e.target.value||'');v10PreviewVisible=false;render();return;
 }
 if(e.target?.dataset?.v10Scope){
  v10Scope=e.target.value==='selected'?'selected':'empty';v10PreviewVisible=false;render();
 }
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v10]');if(!b)return;
 if(b.dataset.v10==='paste'){
  v9Mode='examples';v9Type=activeType;v9Preview=null;page='paste';render();return;
 }
 if(b.dataset.v10==='preview'){
  v10PreviewVisible=true;render();return;
 }
 if(b.dataset.v10!=='apply')return;
 const p=v10Plan();
 if(!p.assignments.length||!p.templates.length){toast('文例と未配置番号を確認してください');return}
 if(!v10PreviewVisible){v10PreviewVisible=true;render();toast('まず割り振りプレビューを確認してください');return}
 if(!confirm('未配置の'+p.assignments.length+'名へ、'+p.templates.length+'文例を順番に仮配置します。各番号の学習状況に合わせて必ず見直しますか？'))return;
 const c=cur(),type=activeType;let changed=0;
 for(const pair of p.assignments){
  if(!pair.bank||c.missing.includes(pair.number))continue;
  if(getEnt(c,type,pair.number).text.trim())continue;
  editEnt(c,type,pair.number,{text:pair.bank.text,status:'要検討',touched:true,sourceBankId:pair.bank.id,tentative:true});changed++;
 }
 applyNumbers=Array.from({length:c.count},(_,i)=>i+1).filter(n=>!c.missing.includes(n)&&!getEnt(c,type,n).text.trim()).join(',');
 v10PreviewVisible=false;page='edit';render();toast(changed+'名に仮配置しました。内容を確認して修正してください');
});
