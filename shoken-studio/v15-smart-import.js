/* Shoken STUDIO v1.5 - paste many examples, choose grade, then review classifications */
let v15Raw='',v15Grade=3,v15Items=null,v15Mode='paragraph',v15Reviewed=false;
const V15_SUBJECTS=['未分類','国語','算数','理科','社会','生活','音楽','図工','体育','家庭','外国語','外国語活動','道徳','総合的な学習の時間','学習全般','生活・特別活動'];
const V15_HEADING=[
 ['総合的な学習の時間','総合的な学習の時間'],['外国語活動','外国語活動'],['生活・特別活動','生活・特別活動'],
 ['生活面','生活・特別活動'],['係活動','生活・特別活動'],['当番活動','生活・特別活動'],['委員会活動','生活・特別活動'],
 ['特別活動','生活・特別活動'],['学習全般','学習全般'],['生活科','生活'],['国語','国語'],['算数','算数'],
 ['理科','理科'],['社会','社会'],['体育','体育'],['音楽','音楽'],['図工','図工'],['家庭科','家庭'],
 ['家庭','家庭'],['外国語','外国語'],['道徳','道徳'],['総合','総合的な学習の時間'],['生活','生活・特別活動']
];
const v15Style=document.createElement('style');
v15Style.textContent='.v15-paste{width:100%;min-height:230px;border:1px solid #c8dacb;padding:14px;border-radius:12px;line-height:1.8}.v15-card{padding:14px;border:1px solid #dce7db;background:#fffefb;border-radius:14px;margin:12px 0}.v15-card.warning{border-color:#e5c6aa}.v15-fields{display:grid;grid-template-columns:1fr 1.2fr;gap:10px;margin:12px 0}.v15-card textarea{width:100%;min-height:100px;border-radius:10px;border:1px solid #c6d8c9;padding:12px;line-height:1.8}.v15-card select,.v15-card input{width:100%;min-width:0}.v15-alert{padding:9px 10px;background:#fff1e4;color:#895b39;border-radius:9px;font-size:12px;margin-top:9px}.v15-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:10px 0}.v15-stats>div{padding:12px;border:1px solid #deeadb;background:#f5faf3;border-radius:12px}.v15-stats b{font-size:23px;color:#37634d}.v15-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:12px 0}.v15-small{font-size:11px;color:#637969}@media(max-width:680px){.v15-fields{grid-template-columns:1fr}}';
document.head.appendChild(v15Style);
function v15Heading(line){
 const text=String(line||'').trim().replace(/^[【［\[]/,'').replace(/[】］\]]$/,'').trim();
 if(!text||text.length>42||/[。！？]/.test(text))return null;
 for(const [label,subject] of V15_HEADING){
  if(!text.startsWith(label))continue;
  const tail=text.slice(label.length);
  if(tail&&!/^[\s　:：／/・\-「『（(]/.test(tail))continue;
  const unit=tail.replace(/^[\s　:：／/・\-「『（(]+/,'').replace(/[」』）)]+$/,'').trim();
  if(unit.length>30)continue;
  return {subject,unit};
 }
 return null;
}
function v15Meta(line){
 const x=String(line||'').trim();
 return /^\d{4}年\s*\d{1,2}月\d{1,2}日/.test(x)||/^\d+\s*(?:文字|字)$/.test(x)||
        /^(?:AD|広告|Sponsored)$/i.test(x);
}
function v15Infer(body){
 const s=String(body||'').trim(),lead=s.slice(0,140);
 for(const [label,subject] of V15_HEADING){
  if(lead.startsWith(label)&&/^[のでは「『\s　:：]/.test(lead.slice(label.length)))return subject;
 }
 if(/^(?:誕生日係|[一-龥ぁ-んァ-ンー]{1,10}係|当番活動|委員会活動)/.test(lead))return '生活・特別活動';
 return '未分類';
}
function v15GuessUnit(body,subject){
 const s=String(body||'').trim();
 const q=s.match(/^[^。！？\n]{0,80}[「『]([^」』]{2,40})[」』]/);
 if(q)return q[1];
 if(subject==='生活・特別活動'){
  const m=s.match(/^(誕生日係|[一-龥ぁ-んァ-ンー]{1,10}係|当番活動|委員会活動)/);if(m)return m[1];
 }
 if(subject==='体育'){const m=s.match(/^(?:体育の)?(サッカー|ハンドボール|跳び箱運動|跳び箱|マット運動|鉄棒運動|プレルボール|ベースボール|短なわ|長なわ|リレー|走り幅跳び)(?:の学習|の授業|では|で|に)/);if(m)return m[1]}
 if(['国語','算数','理科','社会','体育','音楽','図工','家庭'].includes(subject)){
  const match=s.match(new RegExp('^'+subject+'(?:科)?の([^。！？、]{1,26}?)の(?:授業|学習|活動)では'));if(match)return match[1];
 }
 return '';
}
function v15Truncated(t){return /(?:…|\.{3,}|．．．)\s*$/.test(String(t||'').trim())}
function v15Norm(t){return String(t||'').normalize('NFKC').replace(/[\s\u3000]+/g,'').trim()}
function v15Duplicate(x){
 return S.bank.some(b=>Number(b.grade)===Number(v15Grade)&&b.subject===x.subject&&v15Norm(b.text)===v15Norm(x.text));
}
function v15NewItem(text,heading){
 const body=String(text||'').trim();if(!body)return null;
 const subject=heading?.subject||v15Infer(body),unit=heading?.unit||v15GuessUnit(body,subject);
 return {subject,unit,text:body,selected:subject!=='未分類'&&!v15Truncated(body)&&body.length>=12,
   source:heading?'見出し':'本文から推定'};
}
function v15Parse(raw){
 const lines=String(raw||'').replace(/\r\n?/g,'\n').split('\n');
 const out=[];let head=null,section=[];
 function flush(){
  const item=v15NewItem(section.join('\n').trim(),head);if(item)out.push(item);section=[];
 }
 for(const line of lines){
  if(v15Meta(line))continue;
  const h=v15Heading(line);
  if(h){flush();head=h;continue}
  if(/^\s*[-=_━─]{3,}\s*$/.test(line)){flush();head=null;continue}
  if(!line.trim()){
   if(v15Mode==='paragraph')flush();
   else if(section.length)section.push('');
  }else section.push(line);
 }
 flush();
 return out;
}
function v15Issues(item){
 const out=[];
 if(item.subject==='未分類')out.push('教科・領域が未分類');
 if(v15Truncated(item.text))out.push('文末が省略されています。全文を確認');
 if(item.text.trim().length<12)out.push('短すぎる文例。コピー漏れに注意');
 if(v15Duplicate(item))out.push('登録済みの同一文例');
 if(!item.unit.trim())out.push('単元・活動名を確認');
 return out;
}
function v15CanSave(x){return x.subject!=='未分類'&&!!x.text.trim()&&x.text.trim().length>=12&&!v15Truncated(x.text)&&!v15Duplicate(x)}
function v15HTML(){
 const counts={total:v15Items?.length||0,selected:v15Items?.filter(x=>x.selected).length||0,
  unknown:v15Items?.filter(x=>x.subject==='未分類').length||0,dup:v15Items?.filter(v15Duplicate).length||0};
 return header('文例のまとめ取り込み','学年を選び、複数の文例を貼り付け。教科・単元を仕分けして確認後に登録します。')+
 '<div class="grid"><div class="panel c7"><h2>① 学年を選んで貼り付け</h2>'+
 '<div class="two">'+field('文例を登録する学年','<select data-v15-field="grade">'+Array.from({length:6},(_,i)=>option(i+1,v15Grade)).join('')+'</select>')+
 field('文例の区切り','<select data-v15-field="mode"><option value="paragraph"'+(v15Mode==='paragraph'?' selected':'')+'>見出し＋空行ごと（おすすめ）</option>'+
 '<option value="heading"'+(v15Mode==='heading'?' selected':'')+'>見出しごとに1つ</option></select>')+'</div>'+
 '<div class="field" style="margin-top:12px"><label>複数の文例を貼り付け</label>'+
 '<textarea class="v15-paste" data-v15-field="raw" placeholder="生活\n誰に対しても公平に接し、落ち着いた行動をとることができました。\n\n算数　面積\n面積の学習では、図を使って求め方を考えました。\n\n体育\nサッカーでは、友だちと協力して取り組んでいました。">'+E(v15Raw)+'</textarea></div>'+
 '<div class="notice" style="margin-top:12px"><strong>画像からの取り込み</strong><p class="small" style="margin:6px 0">iPhoneの写真アプリの文字認識で文章をコピーし、この欄に貼り付けてください。現行アプリに画像直接OCRはまだありません。ChatGPTで画像を見ながら文例だけを文字起こししてから貼り付けてもOK。</p></div>'+
 '<div class="v15-bar"><button class="btn primary" data-v15="parse">文章を自動仕分け</button><button class="btn" data-v15="clear">入力を消す</button></div>'+
 '<div class="warning small">見出しや本文からの推定です。出版社や指導要領との一致は保証しません。児童名や個人固有の事情がある文章は、必ず一般化してから文例バンクへ保存してください。</div>'+
 '</div><div class="panel c5"><h2>② 分類を確認して登録</h2>'+
 (v15Items?'<div class="v15-stats"><div><b>'+counts.total+'</b><div class="v15-small">読取候補</div></div><div><b>'+counts.selected+'</b><div class="v15-small">登録対象</div></div><div><b>'+counts.unknown+'</b><div class="v15-small">未分類</div></div><div><b>'+counts.dup+'</b><div class="v15-small">重複候補</div></div></div>'+
 '<div class="v15-bar"><button class="btn softbtn" data-v15="select-valid">安全な候補を選択</button><button class="btn" data-v15="unselect">全選択を解除</button></div>'+
 v15Items.map((x,i)=>{
 const issue=v15Issues(x);
 return '<div class="v15-card'+(issue.some(t=>/未分類|省略|短すぎ|同一/.test(t))?' warning':'')+'"><div class="v15-bar">'+
 '<label class="inline"><input type="checkbox" data-v15-item="selected" data-i="'+i+'"'+(x.selected?' checked':'')+'> 登録する</label>'+
 '<span class="tag">'+E(x.source)+'</span><span class="v15-small">候補'+(i+1)+'</span></div>'+
 '<div class="v15-fields">'+field('教科・領域','<select data-v15-item="subject" data-i="'+i+'">'+V15_SUBJECTS.map(v=>option(v,x.subject)).join('')+'</select>')+
 field('単元・活動名','<input data-v15-item="unit" data-i="'+i+'" value="'+E(x.unit)+'" placeholder="未設定なら入力">')+'</div>'+
 '<div class="field"><label>文例の全文</label><textarea data-v15-item="text" data-i="'+i+'">'+E(x.text)+'</textarea></div>'+
 (issue.length?'<div class="v15-alert">'+issue.map(E).join('／')+'</div>':'<div class="v15-small">文章と分類を確認してください。</div>')+'</div>';
 }).join('')+
 '<div class="v15-bar"><label class="inline small"><input type="checkbox" id="v15-reviewed"'+(v15Reviewed?' checked':'')+'> 選択した文例の内容と分類を確認しました</label></div>'+
 '<button class="btn primary" data-v15="save"'+(counts.selected?'':' disabled')+'>選んだ文例を一括登録</button>'+
 '<p class="v15-small" style="margin-top:10px">未分類・重複・文末が省略された候補は登録できません。登録後はJSONバックアップを保存してください。</p>':
 '<div class="notice">文例を貼り付けて「文章を自動仕分け」を押すと、教科・単元の候補が一覧表示されます。学年は左側でまとめて選択できます。</div>')+
 '</div></div>';
}
const v15PrevTop=renderTop;
renderTop=function(){
 v15PrevTop();const tabs=$('tabs');if(!tabs||tabs.querySelector('[data-page="smartimport"]'))return;
 const button=document.createElement('button');
 button.className='tab'+(page==='smartimport'?' active':'');button.dataset.action='page';button.dataset.page='smartimport';button.textContent='▤ 文例まとめ登録';
 tabs.insertBefore(button,tabs.querySelector('[data-page="bank"]'));
};
const v15PrevBank=bankHTML;
bankHTML=function(){
 return '<div class="panel wide" style="margin:0 0 15px"><div class="inline between"><div><strong>文例をまとめて仕分け・登録</strong>'+
 '<p class="small muted" style="margin:5px 0">過去の文例メモを一気に貯める。画像は文字認識でコピーして貼り付け。</p></div>'+
 '<button class="btn softbtn" data-v15="go">まとめ取り込みへ →</button></div></div>'+v15PrevBank();
};
const v15PrevRender=render;
render=function(){if(page==='smartimport'){renderTop();$('main').innerHTML=v15HTML();return}v15PrevRender()};
document.addEventListener('input',e=>{
 if(e.target.dataset?.v15Field==='raw'){v15Raw=e.target.value;v15Items=null;v15Reviewed=false}
 const kind=e.target.dataset?.v15Item,ix=Number(e.target.dataset?.i);
 if((kind==='text'||kind==='unit')&&v15Items?.[ix]){v15Items[ix][kind]=e.target.value;v15Reviewed=false}
});
document.addEventListener('change',e=>{
 const fld=e.target.dataset?.v15Field;
 if(fld==='grade'){v15Grade=Number(e.target.value);v15Items=null;v15Reviewed=false;render();return}
 if(fld==='mode'){v15Mode=e.target.value;v15Items=null;v15Reviewed=false;render();return}
 const kind=e.target.dataset?.v15Item,i=Number(e.target.dataset?.i),item=v15Items?.[i];
 if(item){
  if(kind==='subject')item.subject=e.target.value;
  if(kind==='selected')item.selected=!!e.target.checked;
  if(kind==='unit'||kind==='text')item[kind]=e.target.value;
  v15Reviewed=false;render();return;
 }
 if(e.target.id==='v15-reviewed')v15Reviewed=!!e.target.checked;
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v15]');if(!b)return;
 const action=b.dataset.v15;
 if(action==='go'){v15Grade=cur().grade;page='smartimport';render();return}
 if(action==='clear'){if(v15Raw&&!confirm('入力した文章を消しますか？'))return;v15Raw='';v15Items=null;v15Reviewed=false;render();return}
 if(action==='parse'){v15Items=v15Parse(v15Raw);v15Reviewed=false;render();if(!v15Items.length)toast('読み取れる文例がありませんでした');return}
 if(action==='select-valid'){v15Items?.forEach(x=>x.selected=v15CanSave(x));v15Reviewed=false;render();return}
 if(action==='unselect'){v15Items?.forEach(x=>x.selected=false);v15Reviewed=false;render();return}
 if(action!=='save')return;
 const chosen=(v15Items||[]).filter(x=>x.selected);
 if(!chosen.length){toast('登録する文例を選んでください');return}
 if(!v15Reviewed){toast('文章と分類を確認し、チェックを入れてください');return}
 if(chosen.some(x=>!v15CanSave(x))){toast('未分類・重複・省略された文章を修正してください');return}
 const keys=new Set();
 for(const item of chosen){const k=item.subject+'|'+v15Norm(item.text);if(keys.has(k)){toast('今回の候補内に同じ文例があります');return}keys.add(k)}
 if(!confirm(v15Grade+'年の文例'+chosen.length+'件を登録しますか？'))return;
 for(const item of chosen){
  S.bank.push({id:S.nextId++,grade:v15Grade,subject:item.subject,unit:item.unit.trim(),text:item.text.trim(),tag:'まとめ取り込み・確認済み'});
 }
 v15Raw='';v15Items=null;v15Reviewed=false;bankFilter='すべて';page='bank';render();
 toast(chosen.length+'件を文例バンクに登録しました。JSONバックアップを保存してください');
});
