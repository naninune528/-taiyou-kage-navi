/* Shoken Studio v1.3 school-wide comprehensive comment format */
const V13_TEMPLATE=[
 {id:'general',label:'学習全般',on:true,target:45},
 {id:'s0',label:'教科①',on:true,target:60},
 {id:'s1',label:'教科②',on:true,target:60},
 {id:'s2',label:'教科③',on:false,target:60},
 {id:'life',label:'生活面',on:true,target:55},
 {id:'activity',label:'係・当番・特別活動',on:false,target:55}
];
let v13Draft=null;
const v13Style=document.createElement('style');
v13Style.textContent='.v13-config-row{display:grid;grid-template-columns:2fr 1fr 76px 34px 34px;gap:8px;align-items:center;padding:9px 0;border-bottom:1px solid #e4ebe2}.v13-config-row input[type=number]{width:100%}.v13-config-row input[type=checkbox]{width:17px;height:17px}.v13-config-row button{padding:6px;min-width:30px}.v13-subject-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.v13-subject-grid .field{margin:0}.v13-row-extra{font-size:11px;color:#597465;margin-left:5px}.v13-layout-card{padding:14px;border:1px solid #dbe6dd;border-radius:14px;background:#f8faf7;margin:0 0 11px}.v13-layout-card textarea{width:100%;min-height:100px;border:1px solid #c8d9cc;border-radius:10px;padding:12px;background:#fff;line-height:1.85}.v13-preview{white-space:pre-wrap;line-height:1.95;background:#fff;border:1px solid #d5e4d7;padding:14px;border-radius:12px;min-height:85px;overflow-wrap:anywhere}.v13-highlight{font-size:25px;font-weight:800;color:#315c4d}.v13-draft-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.v13-meter{height:7px;border-radius:7px;background:#e7eee6;overflow:hidden;margin-top:5px}.v13-meter>div{height:100%;background:#7d9f87}.v13-mini{font-size:12px;color:#5c7666}.v13-stale{background:#fff1e9;border:1px solid #ecd0be;padding:12px;border-radius:12px;color:#8f5541;margin:10px 0}.v13-good{color:#316f50}.v13-warning{color:#a45d49}@media(max-width:700px){.v13-config-row{grid-template-columns:minmax(0,1.6fr) 45px 63px 26px 26px;gap:5px}.v13-config-row button{padding:5px;min-width:23px}.v13-subject-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}';
document.head.appendChild(v13Style);
function v13Config(){
 S.prefs=S.prefs||{};
 let s=S.prefs.comprehensiveLayout;
 if(!s||!Array.isArray(s.slots)){
  s={slots:V13_TEMPLATE.map(x=>({...x})),breaks:'single',countBreaks:false,subjectTargets:{}};
  S.prefs.comprehensiveLayout=s;
 }
 if(!s.subjectTargets)s.subjectTargets={};
 if(!['none','single','blank'].includes(s.breaks))s.breaks='single';
 return s;
}
function v13Order(c){return c.slots.filter(x=>x.on)}
function v13Target(slot,c,row){
 if(slot.id.charAt(0)==='s'){
  const i=Number(slot.id.charAt(1)),subject=row.subjects?.[i]||'要検討';
  return Math.max(0,Number(c.subjectTargets[subject]??slot.target)||0);
 }
 return Math.max(0,Number(slot.target)||0);
}
function v13Name(slot,row){
 if(slot.id.charAt(0)==='s'&&slot.id.length===2){
  const i=Number(slot.id.slice(1)),name=row.subjects?.[i]||'要検討';
  return slot.label+(name!=='要検討'?'・'+name:'・教科未設定');
 }
 return slot.label;
}
function v13SettingsHTML(){
 const c=v13Config(),lim=v8Limits('総合所見');
 const subjects=SUBJECTS.filter(x=>x!=='要検討');
 return '<div class="panel wide" style="margin-top:18px"><div class="section-kicker">SCHOOL FORMAT / COMPREHENSIVE REPORT</div><h2 style="margin:4px 0">学校に合わせた総合所見の構成</h2>'+
 '<p class="muted small">ここでの設定は、アプリ内のすべてのクラスで共通です。学校名などの個人情報は必要ありません。</p>'+
 '<div class="two">'+field('総合所見全体の下限（字）','<input type="number" min="1" max="1500" data-v13-limit="min" value="'+lim.min+'">')+
 field('総合所見全体の上限（字）','<input type="number" min="1" max="1500" data-v13-limit="max" value="'+lim.max+'">')+'</div>'+
 '<div class="notice" style="margin:10px 0 16px">全体の下限・上限はホームの「文字数クリア率」と連動。各教科・生活面の文字数は目安で、全体の合否と分けて表示します。初期の1〜300字は仮設定です。</div>'+
 '<h3>配置する項目と順番</h3><div class="v13-draft-actions" style="margin-bottom:11px">'+
 '<button class="btn softbtn" data-v13="preset" data-way="study">学習面 → 生活面</button>'+
 '<button class="btn softbtn" data-v13="preset" data-way="life">生活面 → 学習面</button></div>'+
 '<div class="v13-mini">チェックで項目を使用。↑↓で並び順を調整。文字数は項目ごとの目安です。</div>'+
 c.slots.map((x,i)=>'<div class="v13-config-row"><label class="inline" style="gap:5px"><input type="checkbox" data-v13-slot="on" data-id="'+x.id+'"'+(x.on?' checked':'')+'> <strong>'+E(x.label)+'</strong></label>'+
 '<div class="field"><label>目安字数</label><input type="number" min="0" max="1000" data-v13-slot="target" data-id="'+x.id+'" value="'+x.target+'"></div>'+
 '<span class="v13-mini">'+(x.id.charAt(0)==='s'?'教科別優先':'')+'</span>'+
 '<button class="btn" data-v13="move" data-index="'+i+'" data-delta="-1"'+(i===0?' disabled':'')+'>↑</button>'+
 '<button class="btn" data-v13="move" data-index="'+i+'" data-delta="1"'+(i===c.slots.length-1?' disabled':'')+'>↓</button></div>').join('')+
 '<div class="two" style="margin-top:16px">'+field('項目間の区切り','<select data-v13-select="breaks">'+
 [['none','改行なし'],['single','1回改行'],['blank','空行を入れる（2回改行）']].map(x=>'<option value="'+x[0]+'"'+(x[0]===c.breaks?' selected':'')+'>'+x[1]+'</option>').join('')+'</select>')+
 field('文字数の数え方','<label class="inline" style="margin-top:10px"><input type="checkbox" data-v13-check="countBreaks"'+(c.countBreaks?' checked':'')+'> 改行も1文字として数える</label>')+'</div>'+
 '<details style="margin-top:18px"><summary><strong>国語・算数・理科など、教科ごとの目安字数</strong></summary>'+
 '<p class="v13-mini" style="margin:10px 0">各番号の教科①②③に設定した教科名に応じて、この目安字数を優先して表示します。空欄は上の「教科①②③」の目安を使います。</p>'+
 '<div class="v13-subject-grid">'+subjects.map(subject=>field(subject,'<input type="number" min="0" max="1000" data-v13-subject="'+E(subject)+'" value="'+(c.subjectTargets[subject]??'')+'" placeholder="共通目安">')).join('')+'</div></details>'+
 '<div class="warning small" style="margin-top:15px">構成や改行を変更しても、すでに入力・確定した文章は自動で書き換えません。各番号の「構成別に編集」で確認し、明示的に配置したときだけ本文が更新されます。</div></div>';
}
const v13OldSettings=v4Settings;
v4Settings=function(){v13OldSettings();const root=document.createElement('div');root.innerHTML=v13SettingsHTML();$('main').appendChild(root)};
const v13OldLen=v8Length;
v8Length=function(s){let x=String(s||'').trim();if(!v13Config().countBreaks)x=x.replace(/\r\n|\r|\n/g,'');return Array.from(x).length};
document.addEventListener('change',e=>{
 const node=e.target,conf=v13Config();
 if(node.dataset.v13Limit){
  const t=node.dataset.v13Limit,lim={...v8Limits('総合所見')},n=Math.max(1,Math.min(1500,Number(node.value)||1));
  lim[t]=n;if(lim.max<lim.min){if(t==='min')lim.max=lim.min;else lim.min=lim.max}
  S.prefs.charLimits=S.prefs.charLimits||{};S.prefs.charLimits['総合所見']=lim;render();toast('全体文字数の条件を更新しました');return;
 }
 if(node.dataset.v13Slot){
  const slot=conf.slots.find(x=>x.id===node.dataset.id);if(!slot)return;
  if(node.dataset.v13Slot==='on')slot.on=!!node.checked;
  else slot.target=Math.max(0,Math.min(1000,Number(node.value)||0));
  render();return;
 }
 if(node.dataset.v13Subject){
  const name=node.dataset.v13Subject;if(node.value==='')delete conf.subjectTargets[name];
  else conf.subjectTargets[name]=Math.max(0,Math.min(1000,Number(node.value)||0));
  render();return;
 }
 if(node.dataset.v13Select==='breaks'){conf.breaks=node.value;render();return}
 if(node.dataset.v13Check==='countBreaks'){conf.countBreaks=!!node.checked;render();return}
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v13]');if(!b)return;
 const conf=v13Config();
 if(b.dataset.v13==='move'){
  const i=Number(b.dataset.index),j=i+Number(b.dataset.delta);
  if(j<0||j>=conf.slots.length)return;
  const copy=conf.slots.slice(),temp=copy[i];copy[i]=copy[j];copy[j]=temp;conf.slots=copy;render();
 }else if(b.dataset.v13==='preset'){
  const list=conf.slots.slice(),isLife=x=>['life','activity'].includes(x.id);
  conf.slots=(b.dataset.way==='life'?list.filter(isLife).concat(list.filter(x=>!isLife(x))):list.filter(x=>!isLife(x)).concat(list.filter(isLife)));
  render();toast('順番の見本を設定しました。使用する項目と目安を確認してください');
 }
});
