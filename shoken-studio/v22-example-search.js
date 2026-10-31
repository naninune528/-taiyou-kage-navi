/* 所見メーカー STUDIO v2.2: all-subject, all-grade search of approved built-in examples.
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
 if(terms.length)items=items.filter(x=>{
  const hay=v22Norm([x.subject,x.unit,x.text,x.source,x.details].join(' '));
  return terms.every(term=>hay.includes(term));
 });
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
 '</div><div class="field v22-query"><label>単元名・技・キーワード</label><input data-v22-query="1" value="'+E(V22_SEARCH.query)+'" placeholder="例：すがたをかえる大豆／電気／友だちとの比較"></div>'+
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
