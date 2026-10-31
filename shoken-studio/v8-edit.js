/* Shoken STUDIO v0.8 per-number unit/example selection */
let v8RowSelection={};
function v8RowKey(c,t,n){return c.id+'|'+t+'|'+n}
function v8Selection(c,t,n){
 const key=v8RowKey(c,t,n);
 if(!v8RowSelection[key])v8RowSelection[key]={subject:t==='総合所見'?'':t,unit:'',example:'',mode:'append'};
 return v8RowSelection[key];
}
function v8Subjects(c,t){
 if(t!=='総合所見')return [t];
 let subjects=SUBJECTS.filter(x=>x!=='要検討');
 if(c.grade<=2)subjects=subjects.filter(x=>!['社会','理科','家庭','外国語'].includes(x));
 else if(c.grade<=4)subjects=subjects.filter(x=>!['生活','家庭','外国語'].includes(x));
 else subjects=subjects.filter(x=>x!=='生活');
 return [...subjects,'学習全般','生活・特別活動'];
}
function v8Available(c,subject){
 if(!subject)return [];
 const store=new Map(),publisher=v4Pub(c.grade,subject);
 function key(u){return [u.publisher||'',u.domain||'',u.unit||'自由文例'].join('┃')}
 function ensure(u){
  const k=key(u);
  if(!store.has(k))store.set(k,{id:k,unit:u.unit||'自由文例',publisher:u.publisher||'',domain:u.domain||'',choices:[]});
  return store.get(k);
 }
 function add(u,choices){
  const target=ensure(u);
  choices.forEach(x=>{if(x.text&&!target.choices.some(y=>y.id===x.id))target.choices.push(x)});
 }
 for(const u of V6_EXAMPLES){
  if(u.grade!==c.grade||u.subject!==subject||u.publisher!==publisher)continue;
  const choices=[];for(const axis of V6_AXES)u[axis.id].forEach((text,i)=>choices.push({id:axis.id+':'+i,axis:axis.label,text}));
  add(u,choices);
 }
 if(subject==='体育'){
  const healthPublisher=(S.textbooks||{})[c.grade+':体育']||'未設定';
  for(const u of V7_PE_UNITS){
   if(u.grade!==c.grade||(u.domain==='保健'&&u.publisher!==healthPublisher))continue;
   const choices=[];for(const axis of V6_AXES)u[axis.id].forEach((text,i)=>choices.push({id:axis.id+':'+i,axis:axis.label,text}));
   add(u,choices);
  }
 }
 for(const u of V4_UNITS){
  if(u.grade!==c.grade||u.subject!==subject||u.publisher!==publisher||store.has(key(u)))continue;
  add(u,u.texts.map((text,i)=>({id:'draft:'+i,axis:'編集用文例',text})));
 }
 for(const u of S.customUnitsV5||[]){
  if(u.grade!==c.grade||u.subject!==subject||u.publisher!==publisher)continue;ensure(u);
 }
 for(const b of S.bank){
  if(b.grade!==c.grade||b.subject!==subject)continue;
  let u=[...store.values()].find(x=>x.unit===(b.unit||'自由文例')&&(!b.publisher||x.publisher===b.publisher)&&(!b.domain||x.domain===b.domain));
  if(!u)u=ensure({unit:b.unit||'自由文例',publisher:b.publisher||'',domain:b.domain||''});
  u.choices.push({id:'bank:'+b.id,axis:v6Category(b.criterion)||b.tag||'自作文例',text:b.text});
 }
 return [...store.values()];
}
function v8Select(field,n,items,current,placeholder){
 return '<select data-v8-field="'+field+'" data-n="'+n+'"><option value="">'+E(placeholder)+'</option>'+
 items.map(x=>'<option value="'+E(x.id)+'"'+(x.id===current?' selected':'')+'>'+E(x.label)+'</option>').join('')+'</select>';
}
function v8Picker(c,t,n){
 const st=v8Selection(c,t,n),subjects=v8Subjects(c,t);
 if(st.subject&&!subjects.includes(st.subject)){st.subject='';st.unit='';st.example=''}
 const units=v8Available(c,st.subject),unit=units.find(x=>x.id===st.unit);
 if(!unit){st.unit='';st.example=''}
 const chosen=unit?.choices.find(x=>x.id===st.example);
 return '<div class="v8-picker"><div class="section-kicker">FIND AND PLACE</div>'+
 '<div class="field"><label>教科・領域</label>'+v8Select('subject',n,subjects.map(x=>({id:x,label:x})),st.subject,'教科を選ぶ')+'</div>'+
 '<div class="field"><label>単元名</label>'+v8Select('unit',n,units.map(x=>({id:x.id,label:(x.domain?x.domain+'｜':'')+x.unit})),st.unit,'単元を選ぶ')+'</div>'+
 '<div class="field"><label>文例</label>'+v8Select('example',n,(unit?.choices||[]).map((x,i)=>({id:x.id,label:x.axis+' '+(i+1)+'｜'+x.text.slice(0,26)+'…'})),st.example,'文例を選ぶ')+'</div>'+
 (chosen?'<div class="v8-preview">'+E(chosen.text)+'</div>':'<p class="hint" style="margin:6px 0">文例を選ぶとここに全文を表示します。登録されていない文例は文例バンクから追加できます。</p>')+
 '<div class="v8-row-tools"><label class="small">配置方法 <select data-v8-field="mode" data-n="'+n+'"><option value="append"'+(st.mode==='append'?' selected':'')+'>文末に追加</option><option value="replace"'+(st.mode==='replace'?' selected':'')+'>全文置き換え</option></select></label>'+
 '<button class="btn softbtn" data-v8-row-action="apply" data-n="'+n+'"'+(chosen?'':' disabled')+'>この番号に配置</button></div></div>';
}
const v8PrevEdit=editHTML;
editHTML=function(){
 const c=cur(),t=activeType,cnt=stateCount(c,t),lengthLimit=v8Limits(t),progress=v8Count(c,t);
 const headerBlock='<div class="two">'+field('対象クラス','<select data-bind="class">'+classOpts()+'</select>')+
 field('所見の種類','<select data-bind="type">'+typeOpts()+'</select>')+'</div>'+
 '<div class="inline" style="margin:12px 0"><span class="tag done">確定 '+cnt.done+'</span><span class="tag draft">下書き '+cnt.draft+'</span><span class="tag need">要検討 '+cnt.need+'</span>'+
 '<label class="small"><input type="checkbox" data-bind="editOnly"'+(editOnly?' checked':'')+'> 未完成・要検討だけ</label></div>'+
 '<div class="notice" style="margin:6px 0 15px">文字数クリア '+progress.good+'/'+progress.total+'名（'+progress.pct+'%）／確定＋文字数クリア '+progress.confirmed+'/'+progress.total+'名（'+progress.confirmedPct+'%）／条件 '+lengthLimit.min+'〜'+lengthLimit.max+'字</div>';
 const nums=Array.from({length:c.count},(_,i)=>i+1).filter(n=>!editOnly||(!c.missing.includes(n)&&getEnt(c,t,n).status!=='確定'));
 const html=nums.map(n=>{
  const x=getEnt(c,t,n),missing=c.missing.includes(n),len=v8Length(x.text),valid=len>=lengthLimit.min&&len<=lengthLimit.max;
  const sub=t==='総合所見'?'<div class="field"><label>教科の仮配置</label>'+x.subjects.slice(0,S.prefs.mainCount).map((s,i)=>'<select data-bind="row-subject" data-n="'+n+'" data-index="'+i+'">'+SUBJECTS.map(v=>option(v,s)).join('')+'</select>').join('')+'</div>':'';
  const textarea='<textarea class="celltext" data-bind="row-text" data-n="'+n+'" placeholder="文例を選んで配置、または直接入力">'+E(x.text)+'</textarea>'+
  '<div class="textcount">'+len+'字</div><div class="v8-mini" data-v8-flag="'+n+'">'+(valid?'✓ 文字数クリア':'文字数条件未達')+'（'+lengthLimit.min+'〜'+lengthLimit.max+'字）</div>';
  const status='<label class="small">状態 <select data-bind="row-status" data-n="'+n+'">'+['未作成','下書き','要検討','確定'].map(s=>option(s,x.status)).join('')+'</select></label>';
  return '<section class="v8-row"><div class="inline between" style="margin-bottom:12px"><strong>仮番号 '+n+'</strong><span class="tag '+(x.status==='確定'?'done':x.status==='要検討'?'need':'draft')+'">'+(missing?'欠番':E(x.status))+'</span></div>'+
  (missing?'<p class="muted">欠番のため編集・集計の対象外</p>':
   '<div class="v8-row-main"><div>'+sub+v8Picker(c,t,n)+'</div><div><div class="field"><label>所見（選んだ後も修正できます）</label>'+textarea+'</div>'+
   '<div class="v8-row-tools">'+status+(x.text.trim()?'<button class="btn" data-action="save-from-row" data-n="'+n+'">この文章を文例にする ↗</button>':'')+'</div></div></div>')+'</section>';
 }).join('');
 return header('一覧編集','仮番号ごとに「教科 → 単元 → 文例」を選択。文章は後から自由に修正できます。')+
 '<div class="grid"><div class="panel wide">'+headerBlock+html+
 '<div class="warning small">実際の児童情報に対応させる場合は、学校の承認された端末・保存先でのみ利用してください。</div></div></div>';
};
function v8UpdateFlag(n){
 const x=getEnt(cur(),activeType,n),len=v8Length(x.text),limit=v8Limits(activeType);
 const el=document.querySelector('[data-v8-flag="'+n+'"]');if(el)el.textContent=(len>=limit.min&&len<=limit.max?'✓ 文字数クリア':'文字数条件未達')+'（'+limit.min+'〜'+limit.max+'字）';
}
document.addEventListener('input',e=>{if(e.target.dataset.bind==='row-text')v8UpdateFlag(Number(e.target.dataset.n))});
document.addEventListener('change',e=>{
 const field=e.target.dataset.v8Field;if(!field)return;
 const c=cur(),n=Number(e.target.dataset.n),st=v8Selection(c,activeType,n);
 st[field]=e.target.value;
 if(field==='subject'){st.unit='';st.example=''}
 if(field==='unit')st.example='';
 if(field!=='mode'){const scroll=window.scrollY||0;render();window.scrollTo?.(0,scroll)}
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v8-row-action="apply"]');if(!b)return;
 const c=cur(),n=Number(b.dataset.n),st=v8Selection(c,activeType,n),u=v8Available(c,st.subject).find(x=>x.id===st.unit),choice=u?.choices.find(x=>x.id===st.example);
 if(!choice||c.missing.includes(n)){toast('単元と文例を選んでください');return}
 const row=getEnt(c,activeType,n),text=choice.text;
 if(row.text.includes(text)){toast('同じ文例がすでに入っています');return}
 if(st.mode==='replace'&&row.text.trim()&&!confirm('仮番号'+n+'の文章を置き換えますか？'))return;
 const value=st.mode==='replace'||!row.text.trim()?text:row.text.trimEnd()+'\n'+text;
 editEnt(c,activeType,n,{text:value,status:'下書き',touched:true});
 const scroll=window.scrollY||0;render();window.scrollTo?.(0,scroll);
 toast('仮番号'+n+'へ配置しました。本文を直接修正できます');
});