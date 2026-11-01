/* Shoken STUDIO v0.9: one-paste import for foreign language activity and morality */
let v9Mode='examples',v9Type='外国語活動',v9Unit='',v9Buffer='',v9Replace=false,v9Preview=null;
const v9Css=document.createElement('style');
v9Css.textContent='.v9-paste-area{width:100%;min-height:235px;border:1px solid #c7d8c9;border-radius:13px;padding:13px 15px;background:#fff;line-height:1.8;font-size:14px;resize:vertical}.v9-mode-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v9-option{padding:14px;border:1px solid #d9e6da;border-radius:13px;background:#f8fbf7;cursor:pointer;text-align:left}.v9-option.active{border-color:#598774;background:#e9f2eb;box-shadow:inset 0 0 0 1px #598774}.v9-option strong{display:block;color:#315b4c}.v9-option small{color:#627769}.v9-preview{border:1px solid #e1e9de;background:#fffefb;padding:15px;border-radius:12px;max-height:330px;overflow:auto}.v9-preview-row{display:grid;grid-template-columns:75px minmax(0,1fr);gap:10px;padding:8px 0;border-bottom:1px solid #e7ede5;font-size:12px}.v9-preview-row:last-child{border-bottom:0}.v9-alert{color:#945943;background:#fff2eb;padding:9px 12px;border-radius:9px;margin-top:10px}.v9-good{background:#eaf4ed;color:#35694f;padding:9px 12px;border-radius:9px;margin-top:10px}@media(max-width:680px){.v9-mode-row{grid-template-columns:1fr}.v9-preview-row{grid-template-columns:45px minmax(0,1fr)}}';
document.head.appendChild(v9Css);
function v9ParseExamples(raw){
 const text=String(raw||'').replace(/\r\n/g,'\n').trim();
 if(!text)return {items:[],errors:[]};
 const groups=/\n[ \t]*\n/.test(text)?text.split(/\n[ \t]*\n+/):text.split(/\n+/);
 const items=groups.map(x=>x.trim()).filter(Boolean).map((txt,i)=>({number:i+1,text:txt}));
 return {items,errors:[]};
}
function v9ParseRows(raw,c){
 const lines=String(raw||'').replace(/\r\n/g,'\n').split('\n');
 const items=[],errors=[],seen=new Set();
 lines.forEach((line,i)=>{
  if(!line.trim())return;
  if(/^(?:作業番号|仮番号|番号|No\.?)\s*[\t,、]/i.test(line.trim()))return;
  let n=0,txt='';
  const fields=line.split('\t');
  if(fields.length>=2&&/^\s*\d{1,2}\s*$/.test(fields[0])){
   n=Number(fields[0].trim());txt=fields.slice(1).join('\t').trim();
  }else{
   const hit=line.match(/^\s*(\d{1,2})[.．、）)\s]+\s*(.+)\s*$/);
   if(hit){n=Number(hit[1]);txt=hit[2].trim()}
  }
  if(!n||!txt){errors.push('行'+(i+1)+'：番号と文章を読み取れません');return}
  if(n<1||n>c.count){errors.push('行'+(i+1)+'：'+n+'番は設定人数の範囲外');return}
  if(c.missing.includes(n)){errors.push('行'+(i+1)+'：'+n+'番は欠番なので除外');return}
  if(seen.has(n)){errors.push('行'+(i+1)+'：'+n+'番が重複しています');return}
  seen.add(n);items.push({number:n,text:txt});
 });
 return {items,errors};
}
function v9Parsed(){return v9Mode==='examples'?v9ParseExamples(v9Buffer):v9ParseRows(v9Buffer,cur())}
function v9PreviewHTML(){
 if(!v9Preview)return '<div class="notice">貼り付け後に「内容を確認」を押すと、登録前にプレビューできます。内容は外部に送信されません。</div>';
 const p=v9Preview;
 const label=v9Mode==='examples'?'文例':'番号';
 return '<div class="v9-preview"><div class="inline between"><strong>取り込み候補 '+p.items.length+'件</strong><span class="tag">'+(v9Mode==='examples'?'文例バンク':'作業番号ごと')+'</span></div>'+
 p.items.slice(0,20).map(x=>'<div class="v9-preview-row"><strong>'+label+' '+x.number+'</strong><span>'+E(x.text)+'</span></div>').join('')+
 (p.items.length>20?'<div class="hint" style="margin-top:10px">ほか '+(p.items.length-20)+'件</div>':'')+'</div>'+
 (p.errors.length?'<div class="v9-alert">確認が必要な行：'+p.errors.length+'件<br>'+p.errors.slice(0,10).map(E).join('<br>')+(p.errors.length>10?'<br>ほか '+(p.errors.length-10)+'件':'')+'</div>':'')+
 (p.items.length?'<div class="v9-good">問題のない '+p.items.length+'件を取り込めます。既存の文章は初期設定で保護します。</div>':'');
}
function v9PasteHTML(){
 const c=cur(),isBank=v9Mode==='examples';
 return header('まとめて貼り付け','外国語活動・道徳などの文例や、番号別の文章をまとめて取り込めます。')+
 '<div class="grid"><div class="panel c7"><div class="section-kicker">PASTE AND ORGANIZE</div><h2 style="margin:4px 0 12px">どちらを貼り付ける？</h2>'+
 '<div class="v9-mode-row"><button type="button" class="v9-option'+(isBank?' active':'')+'" data-v9-action="mode" data-mode="examples"><strong>① 文例をまとめて登録</strong><small>今までに書いた文例を、バンクへ一気に追加</small></button>'+
 '<button type="button" class="v9-option'+(!isBank?' active':'')+'" data-v9-action="mode" data-mode="rows"><strong>② 番号ごとに所見を配置</strong><small>Excelの「番号｜所見」を2列コピーして取り込み</small></button></div>'+
 '<div class="two" style="margin-top:17px">'+
 field('対象クラス（学年設定に使用）','<select data-v9-field="class">'+classOpts()+'</select>')+
 field('所見の種類','<select data-v9-field="type">'+['外国語活動','道徳','総合所見','総合的な学習の時間'].map(x=>option(x,v9Type)).join('')+'</select>')+
 '</div>'+
 (isBank?'<div style="margin-top:12px">'+field('文例の単元名・内容項目','<input data-v9-field="unit" value="'+E(v9Unit)+'" placeholder="例：This is for you.／規則の尊重">')+'</div>':
 '<div class="notice" style="margin-top:12px">コピーした番号をそのまま使用。欠番は飛ばし、番号を振り直しません。</div>')+
 '<div class="field" style="margin-top:17px"><label>'+(isBank?'文例をまとめて貼り付け':'番号と所見の2列を貼り付け')+'</label>'+
 '<textarea id="v9-paste-text" class="v9-paste-area" data-v9-field="buffer" placeholder="'+(isBank?'文例1をここに貼り付け\n\n文例2をここに貼り付け\n\n文例3をここに貼り付け':'1	外国語活動の「This is for you.」では、…\n3	外国語活動の「This is for you.」では、…')+'">'+E(v9Buffer)+'</textarea></div>'+
 (isBank?'<div class="hint">文例ごとに改行、または1行空けて貼り付けてね。全文は修正せず保存します。</div>':
 '<div class="hint">Excelで「番号」と「所見」の2列を選び、コピーして貼り付けてね。番号なしの文章は誤配置防止のため取り込みません。</div>'+
 '<label class="small inline" style="margin-top:12px"><input type="checkbox" data-v9-field="replace"'+(v9Replace?' checked':'')+'> 既存の所見を置き換える（確認あり）</label>')+
 '<div class="inline" style="margin-top:20px"><button class="btn primary" data-v9-action="preview">内容を確認する</button>'+
 '<button class="btn softbtn" data-v9-action="import"'+(v9Preview?.items?.length?'':' disabled')+'>確認した'+(isBank?'文例を登録':'所見を配置')+'</button></div>'+
 '<div class="warning small" style="margin-top:15px">実際の児童と番号が対応するデータは、学校が承認した端末・保存先でのみ扱ってください。アプリは試作版で自動保存されません。入力内容のJSONバックアップも取扱いに注意してください。</div>'+
 '</div><div class="panel c5"><div class="section-kicker">PREVIEW</div><h2 style="margin:4px 0 12px">貼り付け内容の確認</h2>'+v9PreviewHTML()+
 '<div class="notice" style="margin-top:14px"><strong>取り込み先</strong><div>クラス'+c.id+'（'+c.grade+'年・'+c.count+'名）</div><div>'+E(v9Type)+'</div><div>'+(isBank?'文例バンク／'+E(v9Unit||'単元名なし'):'番号ごとの所見（下書き）')+'</div></div></div></div>';
}
const v9OldTop=renderTop;
renderTop=function(){
 v9OldTop();
 const t=$('tabs');if(!t||t.querySelector('[data-page="paste"]'))return;
 const b=document.createElement('button');b.className='tab'+(page==='paste'?' active':'');b.dataset.action='page';b.dataset.page='paste';b.textContent='⎘ まとめて貼り付け';
 const target=t.querySelector('[data-page="edit"]');
 t.insertBefore(b,target);
};
const v9OldRender=render;
render=function(){if(page==='paste'){renderTop();$('main').innerHTML=v9PasteHTML();return}v9OldRender()};
document.addEventListener('input',e=>{
 if(e.target?.dataset?.v9Field==='buffer'){v9Buffer=e.target.value;v9Preview=null}
 else if(e.target?.dataset?.v9Field==='unit'){v9Unit=e.target.value;v9Preview=null}
});
document.addEventListener('change',e=>{
 const f=e.target?.dataset?.v9Field;if(!f)return;
 if(f==='class'){activeClass=Number(e.target.value);v9Preview=null;render()}
 else if(f==='type'){v9Type=e.target.value;v9Preview=null;render()}
 else if(f==='replace'){v9Replace=!!e.target.checked;v9Preview=null;render()}
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v9-action]');if(!b)return;
 if(b.dataset.v9Action==='mode'){
  v9Mode=b.dataset.mode==='rows'?'rows':'examples';v9Buffer='';v9Preview=null;render();return;
 }
 if(b.dataset.v9Action==='preview'){
  v9Preview=v9Parsed();
  if(!v9Preview.items.length)toast('取り込める文章がありません。書式を確認してください');
  render();return;
 }
 if(b.dataset.v9Action!=='import')return;
 if(!v9Preview||!v9Preview.items.length){toast('内容を確認してください');return}
 const current=v9Parsed();
 if(JSON.stringify(current)!==JSON.stringify(v9Preview)){v9Preview=null;render();toast('入力内容が変わりました。もう一度確認してください');return}
 let added=0,skipped=0;
 if(v9Mode==='examples'){
  const c=cur();
  for(const item of current.items){
   if(S.bank.some(x=>x.grade===c.grade&&x.subject===v9Type&&x.unit===v9Unit.trim()&&x.text===item.text)){skipped++;continue}
   S.bank.push({id:S.nextId++,grade:c.grade,subject:v9Type,unit:v9Unit.trim(),text:item.text,tag:'一括貼り付け・確認済み'});added++;
  }
  v9Buffer='';v9Preview=null;bankFilter=v9Type;page='bank';render();
  toast(added+'件の文例を追加'+(skipped?'（重複'+skipped+'件を除外）':''));
 }else{
  const c=cur(),conflicts=current.items.filter(x=>getEnt(c,v9Type,x.number).text.trim()).length;
  if(v9Replace&&conflicts&&!confirm('既存の'+conflicts+'件の所見を置き換えますか？'))return;
  for(const item of current.items){
   if(getEnt(c,v9Type,item.number).text.trim()&&!v9Replace){skipped++;continue}
   editEnt(c,v9Type,item.number,{text:item.text,status:'下書き',touched:true});added++;
  }
  v9Buffer='';v9Preview=null;activeType=v9Type;page='edit';render();
  toast(added+'名に所見を配置'+(skipped?'（既存'+skipped+'名は維持）':''));
 }
});
