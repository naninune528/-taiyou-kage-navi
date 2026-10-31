/* STUDIO v1.8 - bulk textbook setup and observation-first unit drafting.
   All writing stays local. No automatic copyrighted textbook scraping or AI calls. */
let v18Grade=cur().grade,v18Inputs={};
const V18_GRADE_SUBJECTS={
 1:['国語','算数','生活','音楽','図工','体育','外国語活動','道徳'],
 2:['国語','算数','生活','音楽','図工','体育','外国語活動','道徳'],
 3:['国語','算数','社会','理科','音楽','図工','体育','外国語活動','道徳'],
 4:['国語','算数','社会','理科','音楽','図工','体育','外国語活動','道徳'],
 5:['国語','算数','社会','理科','音楽','図工','体育','家庭','外国語','道徳'],
 6:['国語','算数','社会','理科','音楽','図工','体育','家庭','外国語','道徳']
};
const v18Style=document.createElement('style');
v18Style.textContent='.v18-config{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.v18-config-item{padding:12px;background:#f8faf5;border:1px solid #dae7d9;border-radius:12px}.v18-config-item label{display:block;font-size:12px;font-weight:700;margin-bottom:5px}.v18-config-item select{width:100%}.v18-hint{font-size:12px;color:#65776b;line-height:1.75}.v18-addon{margin-top:12px;border:1px dashed #bfd4c0;background:#f8faf7;border-radius:12px;padding:13px}.v18-addon label{display:block;font-weight:700;font-size:12px;margin:8px 0 5px}.v18-addon textarea,.v18-addon input{width:100%;min-height:43px}.v18-addon textarea{min-height:95px;resize:vertical}.v18-addon .v18-action-row{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:10px}.v18-addon .v18-preview{white-space:pre-wrap;border:1px solid #d6e4d6;background:#fff;padding:11px;border-radius:10px;margin-top:10px}.v18-booklink{padding:9px 12px;margin:10px 0 0;background:#f6f9f1;border-radius:11px}.v18-status{font-size:11px;color:#526e5b}@media(max-width:700px){.v18-config{grid-template-columns:1fr}}';
document.head.appendChild(v18Style);
function v18PublisherOptions(subject){
 if(subject==='体育')return typeof V7_HEALTH_PUBLISHERS==='undefined'?[]:V7_HEALTH_PUBLISHERS;
 return Array.from(new Set(V4_PUBLISHERS[subject]||[]));
}
function v18TextbookHTML(){
 const subjects=V18_GRADE_SUBJECTS[v18Grade]||V18_GRADE_SUBJECTS[3];
 const current=(S.textbooks||{}),saved=subjects.filter(x=>!!current[v18Grade+':'+x]).length;
 return header('教科書をまとめて設定','学年ごとに使用教科書を一括設定。次からは個人編集で選択した教科に反映されます。')+
 '<div class="grid"><section class="panel wide"><div class="title-row"><div><h2>使用教科書の初期設定</h2><p class="v18-hint">実際に使っている出版社だけを選んでください。未設定の教科は後から選べます。</p></div>'+
 '<span class="tag">'+saved+'/'+subjects.length+'教科 設定済み</span></div>'+
 '<div class="field" style="max-width:220px"><label>学年</label><select data-v18-grade="1">'+
 [1,2,3,4,5,6].map(g=>option(g,v18Grade)).join('')+'</select></div>'+
 '<div class="v18-config" style="margin:15px 0">'+subjects.map(subject=>{
   const pub=current[v18Grade+':'+subject]||'';
   const opts=v18PublisherOptions(subject);
   const label=subject==='体育'?'体育（保健の教科書）':subject;
   return '<div class="v18-config-item"><label>'+E(label)+'</label><select data-v18-publisher="'+E(subject)+'">'+
     '<option value="">未設定</option>'+opts.map(s=>option(s,pub)).join('')+
     (pub&&!opts.includes(pub)?'<option selected value="'+E(pub)+'">'+E(pub)+'</option>':'')+
     '</select></div>';
  }).join('')+'</div>'+
 '<div class="notice">設定を変えても、作成済みの所見は消えません。体育の実技は教科書設定不要。教科書会社を選ぶだけで全単元の本文・評価規準が自動取得されるわけではありません。</div>'+
 '<div class="inline" style="margin-top:15px"><button class="btn primary" data-action="page" data-page="edit">番号別に編集する →</button>'+
 '<button class="btn" data-action="save-json">JSONバックアップを保存</button></div></section></div>';
}
const v18BeforeRender=render;
render=function(){
 if(page==='textbooks'){
   renderTop();$('main').innerHTML=v18TextbookHTML();
   if(typeof v16Schedule==='function')v16Schedule();
   return;
 }
 v18BeforeRender();
 if(page==='settings'){
   const main=$('main');
   if(main)main.insertAdjacentHTML('afterbegin','<div class="v18-booklink"><strong>教科書の一括設定：</strong>各教科の出版社を一覧で設定できます。 <button class="btn softbtn" data-action="page" data-page="textbooks">学年別・教科書をまとめて設定 →</button></div>');
 }
 if(page==='stage-prepare'){
   const main=$('main');
   if(main)main.insertAdjacentHTML('afterbegin','<div class="v18-booklink"><strong>最初に一度：</strong>使っている教科書会社を設定すると、単元が探しやすくなります。 <button class="btn softbtn" data-action="page" data-page="textbooks">教科書の一括設定 →</button></div>');
 }
};
function v18UnitList(c,subject){
 const result=v18OriginalAvailable(c,subject),pub=v4Pub(c.grade,subject);
 for(const x of S.customUnitsV5||[]){
  if(x.grade!==c.grade||x.subject!==subject||x.publisher)continue;
  const exists=result.some(u=>u.unit===x.unit);
  if(!exists)result.push({id:['','',x.unit].join('┃'),unit:x.unit,publisher:'',domain:'',choices:[]});
 }
 return result;
}
const v18OriginalAvailable=v8Available;
v8Available=function(c,subject){return v18UnitList(c,subject)};
function v18Key(c,t,n){return c.id+'|'+t+'|'+n}
function v18Input(c,t,n){
 const k=v18Key(c,t,n);
 if(!v18Inputs[k])v18Inputs[k]={showAdd:false,showDraft:false,unitName:'',observation:'',preview:''};
 return v18Inputs[k];
}
const v18OriginalPicker=v8Picker;
v8Picker=function(c,t,n){
 const basic=v18OriginalPicker(c,t,n);
 const select=v8Selection(c,t,n),entry=v18Input(c,t,n),units=select.subject?v8Available(c,select.subject):[];
 const chosen=units.find(x=>x.id===select.unit);
 if(!select.subject)return basic;
 const published=v4Pub(c.grade,select.subject);
 const publisherLabel=(published==='未設定'?'使用教科書は未設定':('教科書：'+published));
 let add='<div class="v18-addon"><div class="v18-status">'+E(publisherLabel)+' ／ 単元は登録済み一覧から選択、またはその場で追加できます。</div>'+
 '<div class="v18-action-row"><button type="button" class="btn softbtn" data-v18-action="toggle-add" data-n="'+n+'">'+
 (entry.showAdd?'単元追加を閉じる':'一覧にない単元を追加')+'</button>'+
 '<button type="button" class="btn softbtn" data-action="page" data-page="textbooks">教科書設定</button></div>';
 if(entry.showAdd){
  add+='<label>教科書に載っている単元名を入力</label>'+
  '<input data-v18-input="unitName" data-n="'+n+'" maxlength="90" placeholder="例：新しい単元名" value="'+E(entry.unitName)+'">'+
  '<div class="v18-action-row"><button type="button" class="btn" data-v18-action="add-unit" data-n="'+n+'">この単元を選ぶ →</button></div>'+
  '<p class="v18-hint">追加した単元名は、同じ学年・教科で再利用できます。文章の登録は不要です。</p>';
 }
 if(chosen){
  add+='<div class="v18-action-row"><button type="button" class="btn softbtn" data-v18-action="toggle-draft" data-n="'+n+'">'+
   (entry.showDraft?'自分で下書きを作る欄を閉じる':chosen.choices.length?'この単元から自分で下書きを作る':'文例未登録：見取った姿から下書きを作る')+
   '</button></div>';
  if(entry.showDraft){
   add+='<label>児童の具体的な姿・発言・取り組み（名前は書かない）</label>'+
   '<textarea data-v18-input="observation" data-n="'+n+'" maxlength="1500" placeholder="実際に見取った行動や考えを、文章で記入">'+E(entry.observation)+'</textarea>'+
   '<p class="v18-hint">教科書の単元名と上の観察記録をつないで下書きを作ります。実際の姿を入力せずに内容を自動で作ることはありません。</p>'+
   '<div class="v18-action-row"><button type="button" class="btn" data-v18-action="preview" data-n="'+n+'">下書きを確認</button>'+
   (entry.preview?'<button type="button" class="btn primary" data-v18-action="apply" data-n="'+n+'">この番号に配置 →</button>':'')+'</div>'+
   (entry.preview?'<div class="v18-preview"><strong>下書き（要確認）</strong><div>'+E(entry.preview)+'</div></div>':'');
  }
 }
 add+='</div>';
 return basic+add;
};
function v18Draft(unit,notes){
 const u=String(unit||'').trim(),s=String(notes||'').trim();
 if(!u||s.length<8||/[〇○●□]{2}|氏名|児童名/.test(s))return '';
 const clean=s.replace(/^[、。 \n]+/,'').replace(/[。！？\s]+$/,'');
 if(!clean)return '';
 return '「'+u+'」の学習では、'+clean+'。';
}
document.addEventListener('change',function(e){
 const target=e.target;
 if(target?.dataset?.v18Grade){
   v18Grade=Math.max(1,Math.min(6,Number(target.value)||3));
   render();return;
 }
 const sub=target?.dataset?.v18Publisher;
 if(sub){
   S.textbooks=S.textbooks||{};
   const key=v18Grade+':'+sub;
   if(target.value)S.textbooks[key]=target.value;
   else delete S.textbooks[key];
   v4Grade=v18Grade;v4Subject=sub;v4Unit='';
   render();toast('使用教科書を更新しました');return;
 }
});
document.addEventListener('input',function(e){
 const target=e.target,field=target?.dataset?.v18Input;
 if(!field)return;
 const n=Number(target.dataset.n),x=v18Input(cur(),activeType,n);
 if(field==='unitName')x.unitName=target.value;
 if(field==='observation'){x.observation=target.value;x.preview=''}
});
document.addEventListener('click',function(e){
 const b=e.target.closest('[data-v18-action]');if(!b)return;
 const action=b.dataset.v18Action,n=Number(b.dataset.n),c=cur(),t=activeType;
 if(!Number.isInteger(n)||n<1||n>c.count||c.missing.includes(n))return;
 const x=v18Input(c,t,n),sel=v8Selection(c,t,n);
 if(action==='toggle-add'){x.showAdd=!x.showAdd;render();return}
 if(action==='toggle-draft'){x.showDraft=!x.showDraft;render();return}
 if(action==='add-unit'){
  const unit=x.unitName.trim().replace(/\s+/g,' ');
  if(!sel.subject){toast('先に教科を選んでください');return}
  if(unit.length<2||unit.length>90){toast('単元名を2〜90文字で入力してください');return}
  const pub=v4Pub(c.grade,sel.subject),publisher=pub==='未設定'?'':pub;
  const collection=S.customUnitsV5=S.customUnitsV5||[];
  let found=collection.find(z=>z.grade===c.grade&&z.subject===sel.subject&&z.unit===unit&&z.publisher===publisher);
  if(!found){found={grade:c.grade,subject:sel.subject,publisher,unit};collection.push(found)}
  const next=v8Available(c,sel.subject).find(z=>z.unit===unit);
  if(!next){toast('単元の登録を確認できませんでした');return}
  sel.unit=next.id;sel.example='';x.showAdd=false;x.showDraft=true;x.preview='';
  render();toast('単元を追加しました。見取った姿から下書きに進めます');return;
 }
 const unit=v8Available(c,sel.subject).find(z=>z.id===sel.unit);
 if(!unit){toast('単元を選んでください');return}
 if(action==='preview'){
  x.preview=v18Draft(unit.unit,x.observation);
  if(!x.preview){toast('見取った具体的な姿を8文字以上で入力してください');return}
  render();return;
 }
 if(action==='apply'){
  if(!x.preview){toast('先に下書きを確認してください');return}
  const row=getEnt(c,t,n);
  if(row.status==='確定'&&!confirm('仮番号'+n+'は「確定」済みです。変更しますか？'))return;
  if(row.text&&sel.mode==='replace'&&!confirm('すでにある文章を置き換えますか？'))return;
  const full=sel.mode==='replace'||!row.text?x.preview:row.text.trimEnd()+'\n'+x.preview;
  editEnt(c,t,n,{text:full,status:'下書き',touched:true});
  x.preview='';x.showDraft=false;
  const scroll=window.scrollY||0;render();window.scrollTo?.(0,scroll);
  toast('下書きを配置しました。内容を確認して修正してください');
 }
});