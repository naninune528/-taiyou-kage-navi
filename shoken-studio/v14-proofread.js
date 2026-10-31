/* Shoken Studio v1.4: privacy-preserving typo / consistency proofing
   Local heuristic checks only; never claims to fully check Japanese grammar. */
const V14_TYPES=['総合所見','総合的な学習の時間','外国語活動','道徳'];
let v14Scope='all',v14Filter='issues',v14ClassId=0;
const v14Style=document.createElement('style');
v14Style.textContent='.v14-tally{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.v14-tally>div{padding:12px;background:#f7faf6;border:1px solid #dce8df;border-radius:12px}.v14-tally strong{display:block;font-size:21px;color:#325b4a}.v14-row{border:1px solid #dbe6dd;border-radius:14px;padding:14px;margin-top:13px;background:#fffefb}.v14-warning{padding:10px;margin:8px 0;background:#fff5ed;border:1px solid #ecd7c6;border-radius:10px;font-size:13px;line-height:1.8}.v14-warning strong{color:#955535}.v14-text{line-height:1.9;white-space:pre-wrap;overflow-wrap:anywhere;background:#f7f9f5;padding:10px;border-radius:9px;font-size:13px;margin-top:9px}.v14-text mark{background:#ffe5a2;color:#47391e;border-radius:3px;padding:1px}.v14-actions{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin-top:10px}.v14-small{font-size:11px;color:#667a6d}.v14-summary{padding:12px;background:#eff5ee;border-radius:13px;margin:10px 0}.v14-filter{display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:10px}.v14-filter .field{min-width:0}@media(max-width:700px){.v14-filter{grid-template-columns:1fr 1fr}.v14-filter .field:first-child{grid-column:span 2}.v14-tally{grid-template-columns:repeat(2,minmax(0,1fr))}}';
document.head.appendChild(v14Style);
function v14Push(out,id,index,len,text,title,replacement,type){
 if(index<0||len<1)return;
 if(out.some(x=>x.index===index&&x.length===len&&x.id===id))return;
 out.push({id,index,length:len,found:text,title,replacement,type:type||'表記'});
}
function v14Checks(text){
 const s=String(text||''),out=[];
 if(!s.trim())return out;
 // School-specific spelling rules: never automatically rewrite.
 for(const rule of (Array.isArray(S.rules)?S.rules:[])){
  if(!rule?.on||!rule.from||rule.from===rule.to)continue;
  let start=0,k=0;
  while((k=s.indexOf(rule.from,start))>=0){
   v14Push(out,'school:'+rule.from,k,rule.from.length,rule.from,'学校の表記ルール：「'+rule.to+'」への統一を確認',rule.to,'表記');
   start=k+rule.from.length;
  }
 }
 const known=[
  ['しましたた','しました'],['できましたた','できました'],['していましたた','していました'],
  ['しましした','しました'],['できましした','できました'],['取り組みみ','取り組み'],
  ['学習習','学習'],['考ええ','考え'],['話しし合','話し合'],['ましたました','ました']
 ];
 for(const [bad,good] of known){let at=0,k;while((k=s.indexOf(bad,at))>=0){v14Push(out,'typo:'+bad,k,bad.length,bad,'誤入力の可能性があります',good,'誤入力候補');at=k+bad.length}}
 const patterns=[
  {id:'punct',regex:/[、。，．]{2,}/g,title:'句読点が続いています',fix:m=>m.includes('。')||m.includes('．')?'。':'、'},
  {id:'particle',regex:/(をを|がが)/g,title:'助詞の重複かもしれません',fix:m=>m.slice(0,1)},
  {id:'space',regex:/[ 　]{3,}/g,title:'空白が多い可能性があります',fix:()=> ' '}
 ];
 for(const p of patterns){
  for(const match of s.matchAll(p.regex)){
   // Leading indentation is legitimate in some school templates.
   if(p.id==='space'&&(!s.slice(0,match.index).trim()||s.charAt(match.index-1)==='\n'))continue;
   v14Push(out,p.id,match.index,match[0].length,match[0],p.title,p.fix(match[0]),'体裁');
  }
 }
 const end=s.trimEnd();
 if(end&&!/[。！？!?」』）)]$/.test(end)){
  const last=end[end.length-1];
  if(!/[、，,：:;；]$/.test(end)){
   v14Push(out,'end',end.length-1,1,last,'文末の句点「。」が必要か確認してください',null,'句読点');
  }else v14Push(out,'end-comma',end.length-1,1,last,'文末が読点で終わっています',null,'句読点');
 }
 // Some checks could overlap. Report each location once, prioritizing explicit school rules and known typos.
 return out.sort((a,b)=>a.index-b.index).filter((x,i,array)=>!array.some((y,j)=>j<i&&y.index===x.index&&y.length===x.length));
}
function v14Records(c){
 const types=v14Scope==='all'?V14_TYPES:[v14Scope];
 const out=[];
 for(const type of types){
  for(let n=1;n<=c.count;n++){
   if(c.missing.includes(n))continue;
   const row=getEnt(c,type,n);
   if(!row.text.trim())continue;
   const issues=v14Checks(row.text),reviewed=row.proofreadCheckedText===row.text;
   out.push({type,number:n,text:row.text,issues,reviewed,status:row.status});
  }
 }
 return out;
}
function v14Totals(records){
 return {entries:records.length,flags:records.reduce((sum,r)=>sum+r.issues.length,0),
   flagged:records.filter(r=>r.issues.length).length,
   reviewed:records.filter(r=>r.reviewed).length,
   pending:records.filter(r=>!r.reviewed).length};
}
function v14Marked(text,issues){
 if(!issues.length)return E(text);
 const taken=[],html=[];let pos=0;
 for(const issue of issues){
  if(issue.index<pos)continue;
  html.push(E(text.slice(pos,issue.index)));
  html.push('<mark title="'+E(issue.title)+'">'+E(text.slice(issue.index,issue.index+issue.length))+'</mark>');
  pos=issue.index+issue.length;taken.push(issue);
 }
 html.push(E(text.slice(pos)));
 return html.join('');
}
function v14ProofHTML(){
 const c=S.classes.find(x=>x.id===Number(v14ClassId))||cur();
 const records=v14Records(c),totals=v14Totals(records);
 const show=records.filter(x=>v14Filter==='all'||(v14Filter==='issues'?x.issues.length>0:!x.reviewed));
 return header('誤字脱字・表記チェック','4種類の所見をまとめて点検。疑わしい表記を示し、修正と目視確認は先生が行います。')+
 '<div class="grid"><div class="panel wide"><div class="v14-filter">'+
 field('対象クラス','<select data-v14-field="class">'+S.classes.map(x=>'<option value="'+x.id+'"'+(x.id===c.id?' selected':'')+'>'+E(labelClass(x))+'</option>').join('')+'</select>')+
 field('所見の種類','<select data-v14-field="scope"><option value="all"'+(v14Scope==='all'?' selected':'')+'>4種類すべて</option>'+V14_TYPES.map(x=>option(x,v14Scope)).join('')+'</select>')+
 field('表示対象','<select data-v14-field="filter"><option value="issues"'+(v14Filter==='issues'?' selected':'')+'>気になる箇所のみ</option><option value="unchecked"'+(v14Filter==='unchecked'?' selected':'')+'>目視未確認のみ</option><option value="all"'+(v14Filter==='all'?' selected':'')+'>入力済みをすべて</option></select>')+
 '</div><div class="v14-tally" style="margin:15px 0">'+
 '<div><strong>'+totals.entries+'</strong><span class="v14-small">入力済みの文章</span></div>'+
 '<div><strong>'+totals.flags+'</strong><span class="v14-small">確認候補（箇所）</span></div>'+
 '<div><strong>'+totals.reviewed+'</strong><span class="v14-small">目視確認済み</span></div>'+
 '<div><strong>'+totals.pending+'</strong><span class="v14-small">目視未確認</span></div></div>'+
 '<p class="notice">このチェックは端末内で動く簡易チェックです。日本語のすべての誤字脱字・文法誤りを検出できるわけではありません。<strong>検出0件＝誤りなし、ではありません。</strong>個人情報を外部に送信しません。</p>'+
 '<div class="inline" style="margin:15px 0"><button class="btn softbtn" data-v14="show-all">全文を目視確認する</button>'+
 '<button class="btn" data-v14="back">所見の編集へ戻る</button></div>'+
 (show.length?show.map((r)=>{
  const actual=records.findIndex(x=>x===r),n=r.number;
  return '<div class="v14-row"><div class="inline between"><strong>仮番号 '+n+'｜'+E(r.type)+'</strong><span class="tag '+(r.reviewed?'done':r.issues.length?'need':'draft')+'">'+(r.reviewed?'目視確認済み':r.issues.length+'件の候補')+'</span></div>'+
  '<div class="v14-text">'+v14Marked(r.text,r.issues)+'</div>'+
  r.issues.map((p,i)=>'<div class="v14-warning"><strong>'+E(p.title)+'</strong><div class="v14-small">対象：「'+E(p.found)+'」'+(p.replacement?' → 候補：「'+E(p.replacement)+'」':'')+'</div>'+
   (p.replacement?'<div style="margin-top:5px"><button class="btn softbtn small" data-v14="fix" data-record="'+actual+'" data-issue="'+i+'"'+(r.status==='確定'?' disabled':'')+'>この候補に修正</button></div>':'')+
   '</div>').join('')+
  '<div class="v14-actions"><button class="btn" data-v14="edit" data-record="'+actual+'">この番号を編集</button>'+
  '<button class="btn softbtn" data-v14="review" data-record="'+actual+'">'+(r.reviewed?'確認を取り消す':'文章を目視確認済みにする')+'</button>'+
  (r.status==='確定'?'<span class="v14-small">確定済み。修正する場合は一覧編集で下書きに戻してください。</span>':'')+'</div></div>';
 }).join(''):'<div class="v14-summary"><strong>'+ (v14Filter==='issues'?'自動で検出された確認候補はありません。':'該当する文章はありません。')+
 '</strong><p class="v14-small">疑わしい箇所がなくても、内容・事実関係・「てにをは」は最終的な目視確認が必要です。</p></div>')+
 '</div></div>';
}
function v14ReadRecords(){
 const c=S.classes.find(x=>x.id===Number(v14ClassId))||cur();
 return {c,records:v14Records(c)};
}
const v14Top=renderTop;
renderTop=function(){
 v14Top();const tabs=$('tabs');if(!tabs||tabs.querySelector('[data-page="proof"]'))return;
 const b=document.createElement('button');b.className='tab'+(page==='proof'?' active':'');b.dataset.action='page';b.dataset.page='proof';b.textContent='⌕ 誤字脱字チェック';
 const dest=tabs.querySelector('[data-page="export"]');tabs.insertBefore(b,dest);
};
const v14Render=render;
render=function(){
 if(page==='proof'){renderTop();$('main').innerHTML=v14ProofHTML();return}
 v14Render();
};
const v14OldExport=exportHTML;
exportHTML=function(){
 return '<div class="panel wide" style="margin-bottom:17px"><div class="inline between"><div><strong>書き出し前の誤字脱字・表記確認</strong><p class="muted small" style="margin:5px 0 0">各所見の表記揺れ、助詞の重複、句読点などをチェックできます。</p></div>'+
 '<button class="btn softbtn" data-v14="proof">誤字脱字チェックへ →</button></div></div>'+v14OldExport();
};
document.addEventListener('change',e=>{
 const f=e.target?.dataset?.v14Field;if(!f)return;
 if(f==='class'){v14ClassId=Number(e.target.value);render()}
 else if(f==='scope'){v14Scope=e.target.value;render()}
 else if(f==='filter'){v14Filter=e.target.value;render()}
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v14]');if(!b)return;
 const op=b.dataset.v14;
 if(op==='proof'){v14Scope='all';v14ClassId=cur().id;v14Filter='issues';page='proof';render();return}
 if(op==='back'){activeClass=v14ClassId||activeClass;page='edit';render();return}
 if(op==='show-all'){v14Filter='unchecked';render();return}
 if(!['edit','review','fix'].includes(op))return;
 const {c,records}=v14ReadRecords(),r=records[Number(b.dataset.record)];
 if(!r){toast('対象を確認できませんでした。再読み込みしてください');return}
 const current=getEnt(c,r.type,r.number);
 if(current.text!==r.text){render();toast('本文が更新されています。再度チェックしてください');return}
 if(op==='edit'){
  activeClass=c.id;activeType=r.type;page='edit';render();
  const target=document.getElementById('v8-num-'+r.number);
  if(target?.scrollIntoView)target.scrollIntoView({behavior:'smooth',block:'center'});
  return;
 }
 if(op==='review'){
  if(!r.reviewed&&r.issues.length&&!confirm(r.issues.length+'件の候補があります。誤字ではないと確認したうえで目視確認済みにしますか？'))return;
  editEnt(c,r.type,r.number,{proofreadCheckedText:r.reviewed?'':current.text});
  render();toast(r.reviewed?'目視確認を取り消しました':'この文章を目視確認済みにしました');return;
 }
 if(op==='fix'){
  if(current.status==='確定'){toast('確定済みです。一覧編集で状態を戻してから修正してください');return}
  const issue=r.issues[Number(b.dataset.issue)];
  if(!issue||issue.replacement===null){toast('修正候補がありません');return}
  if(current.text.slice(issue.index,issue.index+issue.length)!==issue.found){render();toast('文章が変わっています。再チェックしてください');return}
  if(!confirm('「'+issue.found+'」を「'+issue.replacement+'」へ修正しますか？'))return;
  const revised=current.text.slice(0,issue.index)+issue.replacement+current.text.slice(issue.index+issue.length);
  editEnt(c,r.type,r.number,{text:revised,status:'要検討',touched:true});
  render();toast('候補を修正しました。全文を確認してください');
 }
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action="download-xlsx"]');if(!b)return;
 const c=cur(),savedScope=v14Scope;v14Scope='all';
 const checks=v14Records(c);v14Scope=savedScope;
 const warnings=checks.reduce((s,x)=>s+x.issues.length,0),unreviewed=checks.filter(x=>!x.reviewed).length;
 if(warnings||unreviewed){
  if(!confirm('書き出し前チェック：自動検出'+warnings+'件、目視未確認'+unreviewed+'件。まず「誤字脱字チェック」で確認することをおすすめします。確認せず出力しますか？')){
   e.preventDefault();e.stopImmediatePropagation();page='proof';v14ClassId=c.id;v14Scope='all';v14Filter='issues';render();
  }
 }
},true);
