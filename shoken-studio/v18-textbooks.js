/* STUDIO v1.8 - bulk textbook preferences and observation-grounded unit drafts */
let v18Grade=3,v18ExtraSubject='国語',v18ExtraName='',v18FreeRows={};
const V18_GRADES=[1,2,3,4,5,6];
function v18SubjectsForGrade(g){
 const s=['国語','算数',...(g<=2?['生活']:['社会','理科']),'音楽','図工','体育',...(g>=5?['家庭','外国語']:g>=3?['外国語活動']:[]),'道徳'];
 return s;
}
function v18Publishers(subject){
 if(subject==='体育')return [...new Set(typeof V7_HEALTH_PUBLISHERS!=='undefined'?V7_HEALTH_PUBLISHERS:['東京書籍','学研','光文書院'])];
 return [...new Set(V4_PUBLISHERS[subject]||[])];
}
function v18Ready(g){
 const subjects=v18SubjectsForGrade(g),ready=subjects.filter(s=>!!(S.textbooks||{})[g+':'+s]&&(S.textbooks||{})[g+':'+s]!=='未設定');
 return {total:subjects.length,ready:ready.length};
}
function v18Settings(){
 const subjects=v18SubjectsForGrade(v18Grade),t=v18Ready(v18Grade);
 return '<div class="panel wide v18-settings" id="v18-settings">'+
 '<div class="title-row"><div><div class="section-kicker">TEXTBOOK SETUP / FIRST TIME</div>'+
 '<h2 style="margin:5px 0">使用教科書をまとめて設定</h2>'+
 '<p class="muted small" style="margin:4px 0">学年を選び、各教科の出版社を一度設定。教科を選んだときに、対応する単元と文例を探せるようにします。</p></div>'+
 '<span class="tag">'+t.ready+' / '+t.total+'教科 設定済み</span></div>'+
 '<div class="v18-setting-controls"><label class="field"><strong>設定する学年</strong>'+
 '<select data-v18-setting="grade" aria-label="設定する学年">'+V18_GRADES.map(g=>option(g,v18Grade)).join('')+'</select></label>'+
 '<div class="v18-footnote">変更はその場で反映されます。自動保存を有効にするか、JSONバックアップを保存してください。</div></div>'+
 '<div class="v18-publisher-grid">'+subjects.map(s=>{
 const val=(S.textbooks||{})[v18Grade+':'+s]||'未設定';
 return '<label class="v18-pubrow"><strong>'+E(s==='体育'?'体育（保健教科書）':s)+'</strong>'+
 '<select data-v18-setting="publisher" data-v18-subject="'+E(s)+'" aria-label="'+E(s)+'の教科書会社">'+
 ['未設定',...v18Publishers(s),'その他'].map(x=>option(x,val)).join('')+'</select></label>';
 }).join('')+'</div>'+
 '<div class="v18-footnote" style="margin-top:12px">※ 体育の実技は教科書会社の指定不要。上の「体育」は保健用です。出版社を登録しても、未収録の単元名や文例が自動取得されるわけではありません。</div>'+
 '</div>'+
 '<div class="panel wide v18-settings" style="margin-top:14px"><h2 style="margin-bottom:8px">単元名だけ先に登録（任意）</h2>'+
 '<p class="muted small">文例がなくても単元を一覧に追加できます。単元未登録でも、個人編集から直接文章を作れます。</p>'+
 '<div class="v18-unitadd">'+
 '<label class="field"><strong>教科</strong><select data-v18-setting="extra-subject" aria-label="追加する単元の教科">'+
 subjects.map(s=>option(s,v18ExtraSubject)).join('')+'</select></label>'+
 '<label class="field"><strong>単元名</strong><input data-v18-setting="extra-unit" placeholder="例：新しい単元名" value="'+E(v18ExtraName)+'" maxlength="100"></label>'+
 '<button class="btn softbtn" type="button" data-v18-action="add-unit">単元一覧に追加</button>'+
 '</div></div>';
}
const v18Style=document.createElement('style');
v18Style.textContent='.v18-settings{background:#fcfdf9}.v18-setting-controls{display:flex;align-items:end;gap:18px;flex-wrap:wrap;margin:14px 0}.v18-setting-controls select{min-width:140px}.v18-setting-controls .field{margin-bottom:0}.v18-publisher-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v18-pubrow{border:1px solid #dde7dd;border-radius:12px;padding:9px 12px;background:#fff;display:grid;grid-template-columns:minmax(70px,1fr) minmax(140px,1.5fr);gap:9px;align-items:center}.v18-pubrow strong{font-size:12px}.v18-pubrow select{width:100%;min-width:0}.v18-unitadd{display:grid;grid-template-columns:minmax(120px,1fr) minmax(180px,2fr) auto;align-items:end;gap:10px}.v18-unitadd .field{margin-bottom:0}.v18-unitadd .btn{margin-bottom:2px}.v18-footnote{font-size:11px;line-height:1.6;color:#647e6a}.v18-freeunit{margin:13px 0 0;border:1px solid #cee0cf;border-radius:13px;padding:10px 13px;background:#f8fbf6}.v18-freeunit summary{cursor:pointer;color:#38644d;font-weight:700;font-size:13px}.v18-freeunit[open] summary{margin-bottom:12px}.v18-freeunit .field{margin-bottom:10px}.v18-freeunit textarea{min-height:68px;resize:vertical}.v18-variants{margin-top:12px;display:grid;gap:8px}.v18-variant{border:1px solid #dce9dd;border-radius:11px;padding:12px;background:#fff}.v18-variant p{font-size:12px;white-space:pre-wrap;margin:6px 0}.v18-warning{font-size:11px;color:#7e6c4f}.v18-short{font-size:12px;color:#567364}@media(max-width:760px){.v18-publisher-grid,.v18-unitadd{grid-template-columns:1fr}.v18-pubrow{grid-template-columns:minmax(70px,1fr) minmax(130px,1.5fr)}}';
document.head.appendChild(v18Style);
const v18OldSettings=settingsHTML;
settingsHTML=function(){return v18OldSettings()+'<div class="grid" style="margin-top:14px">'+v18Settings()+'</div>'};
function v18Key(c,t,n){return c.id+'|'+t+'|'+n}
function v18Free(c,t,n){
 const k=v18Key(c,t,n);
 if(!v18FreeRows[k])v18FreeRows[k]={unit:'',observed:'',view:'思考・判断・表現',open:false,candidates:[],saveUnit:true,subject:''};
 return v18FreeRows[k];
}
function v18ObservationText(raw){
 const sentence=String(raw||'').trim().replace(/\s+/g,' ').replace(/[。！!？?]+$/,'');
 if(sentence.length<8||sentence.length>400)return null;
 if(/\n/.test(sentence))return null;
 if(!/(ました|でした|ています|していました|できました|ています|分かりました|気付きました|です|ます)$/.test(sentence))return null;
 return sentence+'。';
}
function v18GetUnit(c,t,n){
 const st=v8Selection(c,t,n),state=v18Free(c,t,n);
 const pre=v8Available(c,st.subject).find(x=>x.id===st.unit)?.unit||'';
 return state.unit.trim()||pre;
}
function v18Drafts(subject,unit,obs){
 const mark=['道徳','外国語活動','総合的な学習の時間','生活・特別活動','学習全般'].includes(subject);
 const prefix=mark?'':subject+'の';
 return [
 {label:'A｜教科と単元を示す',text:prefix+'「'+unit+'」の学習では、'+obs},
 {label:'B｜単元を中心にする',text:'「'+unit+'」では、'+obs},
 {label:'C｜学習場面を示す',text:'「'+unit+'」に取り組む中で、'+obs}
 ];
}
function v18FreePicker(c,t,n){
 const st=v8Selection(c,t,n),s=v18Free(c,t,n);
 if(!st.subject)return '<p class="v18-short">まず教科を選ぶと、登録のない単元でも文章を作れるよ。</p>';
 if(s.subject!==st.subject){s.subject=st.subject;s.unit='';s.observed='';s.candidates=[];s.open=false}
 const selected=v8Available(c,st.subject).find(x=>x.id===st.unit);
 return '<details class="v18-freeunit" data-v18-details="'+n+'"'+(s.open?' open':'')+'>'+
 '<summary>✧ 登録のない単元・文例から所見を作る</summary>'+
 '<div class="v18-short">登録済みの文例がなくてもOK。実際に見取った姿を入力して、オフラインで下書きを組み立てます。</div>'+
 '<div class="field" style="margin-top:12px"><label>単元名（上で選んだ単元も使えます）</label>'+
 '<input data-v18-row="unit" data-n="'+n+'" value="'+E(s.unit)+'" placeholder="'+E(selected?.unit||'単元名を入力')+'" maxlength="100"></div>'+
 '<div class="field"><label>評価の観点</label><select data-v18-row="view" data-n="'+n+'">'+
 ['知識・技能','思考・判断・表現','主体的に学習に取り組む態度'].map(x=>option(x,s.view)).join('')+'</select></div>'+
 '<div class="field"><label>実際に見取った児童の姿（文末まで入力）</label>'+
 '<textarea data-v18-row="observed" data-n="'+n+'" placeholder="例：実験結果を比べ、理由を自分の言葉で説明していました。">'+E(s.observed)+'</textarea></div>'+
 '<div class="v18-warning">※ 児童名や個人情報は入力しないでください。観点は整理用で、観点に応じた活動を自動で創作することはありません。</div>'+
 '<div class="v18-row-tools" style="margin:10px 0"><label class="small">'+
 '<input type="checkbox" data-v18-row="saveUnit" data-n="'+n+'"'+(s.saveUnit?' checked':'')+'> 入力した単元名を次回の単元一覧にも追加</label></div>'+
 '<button class="btn softbtn" type="button" data-v18-action="generate" data-n="'+n+'">この姿から候補を作る</button>'+
 (s.candidates.length?'<div class="v18-variants">'+s.candidates.map((x,i)=>
 '<div class="v18-variant"><strong>'+E(x.label)+'</strong><p>'+E(x.text)+'</p>'+
 '<button class="btn softbtn" type="button" data-v18-action="apply" data-n="'+n+'" data-variant="'+i+'">この番号に配置 →</button></div>').join('')+'</div>':'')+
 '</details>';
}
const v18OldPicker=v8Picker;
v8Picker=function(c,t,n){return v18OldPicker(c,t,n)+v18FreePicker(c,t,n)};
document.addEventListener('input',e=>{
 const field=e.target?.dataset?.v18Row;
 if(field==='unit'||field==='observed'){
  const s=v18Free(cur(),activeType,Number(e.target.dataset.n));
  s[field]=e.target.value;
  s.candidates=[];
 }
 if(e.target?.dataset?.v18Setting==='extra-unit')v18ExtraName=e.target.value;
});
document.addEventListener('change',e=>{
 const el=e.target,setting=el?.dataset?.v18Setting,field=el?.dataset?.v18Row;
 if(setting==='grade'){
  v18Grade=Math.max(1,Math.min(6,Number(el.value)||3));
  if(!v18SubjectsForGrade(v18Grade).includes(v18ExtraSubject))v18ExtraSubject='国語';
  render();return;
 }
 if(setting==='publisher'){
  const subj=el.dataset.v18Subject;
  if(!v18SubjectsForGrade(v18Grade).includes(subj))return;
  S.textbooks=S.textbooks||{};
  S.textbooks[v18Grade+':'+subj]=el.value;
  const section=$('v18-settings');
  if(section){const tag=section.querySelector('.tag');if(tag){const n=v18Ready(v18Grade);tag.textContent=n.ready+' / '+n.total+'教科 設定済み'}}
  return;
 }
 if(setting==='extra-subject'){v18ExtraSubject=el.value;return}
 if(field){
  const s=v18Free(cur(),activeType,Number(el.dataset.n));
  if(field==='saveUnit')s.saveUnit=!!el.checked;
  if(field==='view')s.view=el.value;
  if(field==='unit'||field==='observed')s[field]=el.value;
 }
});
function v18SaveUnit(g,subject,unit){
 const publisher=v4Pub(g,subject);
 if(publisher==='未設定')return false;
 const old=v8Available({grade:g},subject).some(x=>x.unit===unit);
 if(old)return true;
 S.customUnitsV5=S.customUnitsV5||[];
 S.customUnitsV5.push({grade:g,subject,publisher,unit,domain:'',activities:'',criteria:''});
 return true;
}
document.addEventListener('click',e=>{
 const btn=e.target.closest('[data-v18-action]');if(!btn)return;
 const action=btn.dataset.v18Action,c=cur(),n=Number(btn.dataset.n);
 if(action==='add-unit'){
  const unit=v18ExtraName.trim(),subj=v18ExtraSubject;
  if(!unit||unit.length>100){toast('単元名を入力してください');return}
  if(!v18SubjectsForGrade(v18Grade).includes(subj)){toast('教科を選択してください');return}
  if(!v18SaveUnit(v18Grade,subj,unit)){toast('先にこの教科の出版社を選択してください');return}
  v18ExtraName='';render();toast('単元一覧に登録しました');return;
 }
 if(action!=='generate'&&action!=='apply')return;
 if(!Number.isInteger(n)||n<1||n>c.count||c.missing.includes(n))return;
 const selected=v8Selection(c,activeType,n),s=v18Free(c,activeType,n);
 if(action==='generate'){
  const subject=selected.subject,unit=v18GetUnit(c,activeType,n),obs=v18ObservationText(s.observed);
  if(!subject){toast('先に教科を選んでください');return}
  if(!unit||unit.length>100){toast('単元名を入力するか選択してください');return}
  if(!obs){toast('見取った姿は「〜していました。」のように文末まで、8〜400文字で入力してください');return}
  s.candidates=v18Drafts(subject,unit,obs);
  s.open=true;
  if(s.saveUnit&&!v18SaveUnit(c.grade,subject,unit))toast('単元名の登録には教科書設定が必要です。今回の下書きは作成できます');
  const scroll=window.scrollY||0;render();window.scrollTo?.(0,scroll);
  return;
 }
 const variant=Number(btn.dataset.variant),draft=s.candidates[variant];
 if(!draft)return;
 const row=getEnt(c,activeType,n);
 if(row.status==='確定'&&!confirm('確定済みの文章を変更しますか？'))return;
 let text=row.text.trim();
 if(text.includes(draft.text)){toast('同じ文章はすでに入っています');return}
 if(text&&!confirm('既存の所見の末尾に、この候補を追加しますか？'))return;
 text=text?text+'\n'+draft.text:draft.text;
 editEnt(c,activeType,n,{text,status:'下書き',touched:true});
 s.open=true;
 const scroll=window.scrollY||0;render();window.scrollTo?.(0,scroll);
 toast('候補を配置しました。児童の実際の姿に合うよう最終修正してください');
});
