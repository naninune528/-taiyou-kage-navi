/* Shoken Studio v1.3 structured comprehensive comment composer */
function v13Stored(c,n){return getEnt(c,'総合所見',n).comprehensiveParts||null}
function v13SubjectsKey(row){return JSON.stringify((row.subjects||[]).slice(0,3))}
function v13CopyParts(parts){const out={};for(const [k,v] of Object.entries(parts||{}))out[k]=String(v||'');return out}
function v13Start(n){
 const c=cur(),t='総合所見',row=getEnt(c,t,n);
 if(c.missing.includes(n)){toast('欠番は編集できません');return}
 const stored=v13Stored(c,n);
 const coherent=stored&&row.text===stored.lastGenerated;
 v13Draft={classId:c.id,number:n,parts:coherent?v13CopyParts(stored.parts):{},
 legacy:coherent?String(stored.legacy||''):String(row.text||''),
 basedOn:String(row.text||''),stored:stored||null,stale:!!stored&&!coherent,
 subjectMismatch:!!(stored&&stored.subjectsKey&&stored.subjectsKey!==v13SubjectsKey(row)),
 choice:{},live:''};
 page='structure';render();
}
function v13CurrentRow(){
 if(!v13Draft)return null;
 const c=S.classes.find(x=>x.id===v13Draft.classId);
 return c?getEnt(c,'総合所見',v13Draft.number):null;
}
function v13Assemble(){
 if(!v13Draft)return '';
 const c=v13Config(),delim=c.breaks==='blank'?'\n\n':c.breaks==='single'?'\n':'';
 const items=v13Order(c).map(slot=>String(v13Draft.parts[slot.id]||'').trim()).filter(Boolean);
 const legacy=String(v13Draft.legacy||'').trim();if(legacy)items.push(legacy);
 return c.breaks==='none'?items.map(x=>x.replace(/[\r\n]+/g,'')).join(''):items.join(delim);
}
function v13CharInfo(s,t){const n=v8Length(s);return t?{length:n,delta:n-t}:{length:n,delta:null}}
function v13ProgressLabel(len,lim){
 return len>=lim.min&&len<=lim.max?'✓ 総合所見の文字数クリア':len<lim.min?'あと'+(lim.min-len)+'字で下限に到達':'上限を'+(len-lim.max)+'字超えています';
}
function v13BankForSlot(slot,row,c){
 const s=slot.id;
 let subject='';
 if(s==='general')subject='学習全般';
 else if(s==='life'||s==='activity')subject='生活・特別活動';
 else if(/^s[0-2]$/.test(s))subject=row.subjects?.[Number(s.slice(1))]||'';
 if(!subject||subject==='要検討')return [];
 return S.bank.filter(b=>Number(b.grade)===Number(c.grade)&&b.subject===subject);
}
function v13SectionHTML(slot,row,c){
 const draft=v13Draft,count=v8Length(draft.parts[slot.id]||''),target=v13Target(slot,v13Config(),row);
 const names=v13Name(slot,row),choices=v13BankForSlot(slot,row,c);
 const pick=draft.choice[slot.id]||'';
 return '<div class="v13-layout-card"><div class="inline between"><strong>'+E(names)+'</strong>'+
 '<span class="v13-mini" data-v13-count="'+slot.id+'">'+count+'字'+(target?' ／ 目安'+target+'字':' ／ 目安なし')+'</span></div>'+
 (target?'<div class="v13-meter"><div data-v13-meter="'+slot.id+'" style="width:'+Math.min(100,count/target*100)+'%"></div></div>':'')+
 '<div class="field" style="margin-top:12px"><label>この項目の文章</label>'+
 '<textarea data-v13-part="'+slot.id+'" placeholder="実際に見られた学習の姿を入力。文例を入れた後も修正できます">'+E(draft.parts[slot.id]||'')+'</textarea></div>'+
 '<div class="inline" style="margin-top:8px;gap:6px"><select style="flex:1;min-width:145px" data-v13-bank="'+slot.id+'"><option value="">'+(choices.length?'文例バンクから選ぶ':'この項目の登録文例はまだありません')+'</option>'+
 choices.map(x=>'<option value="'+x.id+'"'+(String(x.id)===String(pick)?' selected':'')+'>'+E((x.unit||'自由文例')+'｜'+x.text.slice(0,30)+'…')+'</option>').join('')+'</select>'+
 '<button class="btn softbtn" data-v13="insert-bank" data-slot="'+slot.id+'"'+(pick?'':' disabled')+'>文例を追加</button></div></div>';
}
function v13StructureHTML(){
 if(!v13Draft)return header('総合所見の構成編集','一覧編集から番号を選んでください。');
 const draft=v13Draft,c=S.classes.find(x=>x.id===draft.classId),row=getEnt(c,'総合所見',draft.number);
 const config=v13Config(),lim=v8Limits('総合所見'),sections=v13Order(config),text=v13Assemble(),len=v8Length(text);
 const stale=row.text!==draft.basedOn||draft.stale,locked=row.status==='確定';
 const subjectWarn=draft.subjectMismatch;
 const hidden=config.slots.filter(x=>!x.on&&String(draft.parts[x.id]||'').trim());
 const actual=String(row.text||''),oldChar=v8Length(actual);
 return header('総合所見の構成別編集','学習面と生活面を分けて入力。学校の順番と改行設定で仕上げてから、本文に反映します。')+
 '<div class="inline" style="margin:0 0 16px"><span class="tag">'+E(labelClass(c))+'</span><span class="tag">作業番号 '+draft.number+'</span>'+
 '<span class="tag">'+E(row.status)+'</span><button class="btn" data-v13="back">一覧編集に戻る</button></div>'+
 (locked?'<div class="v13-stale">この番号は確定済みです。修正する場合は、先に一覧編集で「下書き」または「要検討」に戻してください。</div>':'')+
 (stale?'<div class="v13-stale"><strong>この文章は、前回の構成入力後にほかの画面で更新されています。</strong><p style="margin:6px 0">上書き事故を防ぐため、このまま反映できません。現在の本文を「既存の文章」へ引き継ぐか、保存済みの構成を再開するか選んでください。</p>'+
 '<div class="v13-draft-actions"><button class="btn softbtn" data-v13="keep-current">現在の本文を引き継ぐ</button>'+
 (draft.stored?'<button class="btn" data-v13="restore-stored">前回の構成を再開する</button>':'')+'</div></div>':'')+
 (subjectWarn?'<div class="warning small" style="margin-bottom:12px">教科①②③の設定が前回と変わっています。文章と教科名が合っているか、確認してから反映してください。</div>':'')+
 '<div class="grid"><div class="panel c7"><div class="section-kicker">SECTIONS IN SCHOOL ORDER</div><h2 style="margin:4px 0 10px">項目ごとに書く</h2>'+
 '<p class="v13-mini">現在の学校設定：'+E(config.breaks==='none'?'改行なし':config.breaks==='single'?'項目間で1回改行':'項目間に空行')+
 '。目安字数は参考値で、全体の文字数クリアとは別に表示します。</p>'+
 sections.map(slot=>v13SectionHTML(slot,row,c)).join('')+
 (hidden.length?'<div class="v13-stale">現在は使わない設定の項目に文章があります（'+hidden.map(x=>E(x.label)).join('、')+'）。保存済みの文章自体は残しますが、完成文に含まれません。</div>':'')+
 '<div class="v13-layout-card"><strong>これまでの文章（未分類・引き継ぎ用）</strong><p class="v13-mini" style="margin:6px 0">過去に作った所見は、消さずにここに引き継ぎます。内容を項目別へ移した後は重複しないようこの欄から削除してください。完成文では末尾に配置します。</p>'+
 '<textarea data-v13-legacy="true" placeholder="これまでの文章がある場合はここに残ります">'+E(draft.legacy)+'</textarea></div>'+
 '</div><div class="panel c5"><div class="section-kicker">TOTAL CHARACTER CHECK</div>'+
 '<h2 style="margin:4px 0 12px">総合所見全体の文字数</h2>'+
 '<div class="v13-highlight" id="v13-total">'+len+'字</div>'+
 '<p class="v13-mini">学校設定：'+lim.min+'〜'+lim.max+'字（改行'+(config.countBreaks?'も数える':'は数えない')+'）</p>'+
 '<p id="v13-status" class="'+(len>=lim.min&&len<=lim.max?'v13-good':'v13-warning')+'">'+v13ProgressLabel(len,lim)+'</p>'+
 '<div class="v13-meter"><div id="v13-total-meter" style="width:'+Math.min(100,len/lim.max*100)+'%"></div></div>'+
 '<h3 style="margin-top:20px">完成プレビュー</h3><div id="v13-preview" class="v13-preview">'+E(text||'まだ文章がありません。')+'</div>'+
 '<div class="v13-draft-actions"><button class="btn primary" data-v13="apply"'+(locked||stale||!text.trim()?' disabled':'')+'>この文章を総合所見に反映</button>'+
 '<button class="btn" data-v13="back">閉じる</button></div>'+
 '<p class="v13-mini" style="margin-top:12px">ここで反映するまで現在の所見本文は変わりません。反映しても状態は「下書き／要検討」で、確定は一覧編集から行います。</p>'+
 (actual?'<div class="notice" style="margin-top:15px"><strong>現在の登録本文（'+oldChar+'字）</strong><p style="white-space:pre-wrap;overflow-wrap:anywhere;margin:7px 0 0">'+E(actual.slice(0,500))+(actual.length>500?'…':'')+'</p></div>':'')+
 '</div></div>';
}
const v13OldEdit=editHTML;
editHTML=function(){
 const s=v13OldEdit();
 if(activeType!=='総合所見')return s;
 return s.replace(/(<strong>作業番号 (\d+)<\/strong>)/g,(whole,tag,n)=>{
  const c=cur(),row=getEnt(c,'総合所見',Number(n)),len=v8Length(row.text),lim=v8Limits('総合所見');
  const status=len>=lim.min&&len<=lim.max?'✓':'△';
  const p=row.comprehensiveParts;
  const category=p?(p.lastGenerated===row.text?'構成入力済み':'構成と本文を要確認'):'';
  return tag+' <button class="btn softbtn small" data-v13="open" data-n="'+n+'"'+(c.missing.includes(Number(n))?' disabled':'')+'>構成別に編集</button> <span class="v13-row-extra">'+status+len+'字'+(category?'・'+E(category):'')+'</span>';
 });
};
const v13OldRender=render;
render=function(){
 if(page==='structure'){renderTop();$('main').innerHTML=v13StructureHTML();return}
 v13OldRender();
};
function v13UpdateLive(){
 if(!v13Draft||page!=='structure')return;
 const text=v13Assemble(),len=v8Length(text),lim=v8Limits('総合所見'),c=S.classes.find(x=>x.id===v13Draft.classId),row=getEnt(c,'総合所見',v13Draft.number);
 const total=$('v13-total'),status=$('v13-status'),preview=$('v13-preview'),bar=$('v13-total-meter');
 if(total)total.textContent=len+'字';
 if(status){status.textContent=v13ProgressLabel(len,lim);status.className=len>=lim.min&&len<=lim.max?'v13-good':'v13-warning'}
 if(preview)preview.textContent=text||'まだ文章がありません。';
 if(bar)bar.style.width=Math.min(100,len/lim.max*100)+'%';
 for(const slot of v13Order(v13Config())){
  const n=v8Length(v13Draft.parts[slot.id]||''),target=v13Target(slot,v13Config(),row);
  const label=document.querySelector('[data-v13-count="'+slot.id+'"]'),meter=document.querySelector('[data-v13-meter="'+slot.id+'"]');
  if(label)label.textContent=n+'字'+(target?' ／ 目安'+target+'字':' ／ 目安なし');
  if(meter)meter.style.width=Math.min(100,n/Math.max(1,target)*100)+'%';
 }
 const btn=document.querySelector('[data-v13="apply"]');
 if(btn)btn.disabled=!!v13Draft.stale||!text.trim()||row.status==='確定';
}
document.addEventListener('input',e=>{
 if(!v13Draft)return;
 if(e.target.dataset.v13Part){v13Draft.parts[e.target.dataset.v13Part]=e.target.value;v13UpdateLive()}
 else if(e.target.dataset.v13Legacy!==undefined){v13Draft.legacy=e.target.value;v13UpdateLive()}
});
document.addEventListener('change',e=>{
 if(!v13Draft)return;
 const id=e.target.dataset.v13Bank;
 if(id!==undefined){
  v13Draft.choice[id]=e.target.value;
  const parent=e.target.parentElement,button=parent?.querySelector('[data-v13="insert-bank"]');
  if(button)button.disabled=!e.target.value;
 }
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v13]');if(!b)return;
 const action=b.dataset.v13;
 if(action==='open'){v13Start(Number(b.dataset.n));return}
 if(!v13Draft)return;
 const draft=v13Draft,c=S.classes.find(x=>x.id===draft.classId),row=getEnt(c,'総合所見',draft.number);
 if(action==='back'){activeClass=draft.classId;activeType='総合所見';page='edit';render();return}
 if(action==='keep-current'){
  draft.parts={};draft.legacy=row.text;draft.basedOn=row.text;draft.stale=false;draft.subjectMismatch=false;render();return;
 }
 if(action==='restore-stored'){
  if(!draft.stored)return;
  if(!confirm('現在の本文よりも前回の構成入力を優先します。現在の本文は反映時に置き換わりますが、続けますか？'))return;
  draft.parts=v13CopyParts(draft.stored.parts);draft.legacy=String(draft.stored.legacy||'');draft.basedOn=row.text;draft.stale=false;draft.subjectMismatch=true;render();return;
 }
 if(action==='insert-bank'){
  const id=Number(draft.choice[b.dataset.slot]),bank=S.bank.find(x=>x.id===id);
  if(!bank){toast('差し込む文例を選んでください');return}
  const old=String(draft.parts[b.dataset.slot]||'').trim(),extra=bank.text.trim();
  draft.parts[b.dataset.slot]=old?(old.includes(extra)?old:old+'\n'+extra):extra;
  render();toast('文例を構成欄に追加しました。児童の姿に合わせて修正できます');return;
 }
 if(action==='apply'){
  if(row.status==='確定'){toast('確定済みなので先に下書きに戻してください');return}
  if(row.text!==draft.basedOn||draft.stale){toast('所見が更新されています。現在の文章を引き継いで確認してください');render();return}
  const full=v13Assemble();if(!full.trim()){toast('文章を入力してください');return}
  const hidden=v13Config().slots.filter(x=>!x.on&&String(draft.parts[x.id]||'').trim());
  if(hidden.length&&!confirm('非表示の項目に文章が残っています。完成文には含まれません。続けますか？'))return;
  const oldText=String(row.text||'');
  if(oldText&&oldText!==full&&!confirm('現在の総合所見の本文を、この構成に沿った文章へ更新しますか？'))return;
  editEnt(c,'総合所見',draft.number,{
   text:full,status:row.status==='要検討'?'要検討':'下書き',touched:true,
   comprehensiveParts:{parts:v13CopyParts(draft.parts),legacy:String(draft.legacy||''),lastGenerated:full,subjectsKey:v13SubjectsKey(row)}
  });
  activeClass=draft.classId;activeType='総合所見';page='edit';render();
  const len=v8Length(full),lim=v8Limits('総合所見');
  toast('総合所見を更新しました（'+len+'字）'+(len>=lim.min&&len<=lim.max?'・文字数クリア':'・文字数要確認'));
 }
});
