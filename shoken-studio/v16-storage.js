/* STUDIO v1.6 - opt-in local autosave, recovery, safe manual restore */
const V16_KEY='shoken-studio.autosave.v1',V16_PREV='shoken-studio.autosave.previous.v1',V16_OPT='shoken-studio.autosave.optin.v1';
let v16Enabled=false,v16State='off',v16Last='',v16Timer=null,v16Broken=false,v16StorageAvailable=true,v16Dirty=false;
function v16StorageTest(){
 try{const key='__shoken_storage_check';localStorage.setItem(key,'ok');localStorage.removeItem(key);return true}catch(e){return false}
}
v16StorageAvailable=v16StorageTest();
function v16ValidState(s){
 if(!s||typeof s!=='object'||!Array.isArray(s.classes)||s.classes.length<1||s.classes.length>9||!Array.isArray(s.bank)||s.bank.length>50000)return false;
 if(!s.prefs||typeof s.prefs!=='object'||!Array.isArray(s.rules))return false;
 const ids=new Set();
 for(const c of s.classes){
  if(!c||!Number.isInteger(c.id)||c.id<1||c.id>9||ids.has(c.id)||!Number.isInteger(c.grade)||c.grade<1||c.grade>6||
      !Number.isInteger(c.count)||c.count<1||c.count>40||!Array.isArray(c.missing)||!c.entries||typeof c.entries!=='object'||Array.isArray(c.entries))return false;
  ids.add(c.id);
  if(c.missing.some(n=>!Number.isInteger(n)||n<1||n>c.count))return false;
  for(const row of Object.values(c.entries)){if(!row||typeof row!=='object'||typeof row.text!=='string'||row.text.length>200000)return false}
 }
 for(const b of s.bank){if(!b||typeof b!=='object'||typeof b.text!=='string'||b.text.length>200000)return false}
 return true;
}
function v16Envelope(raw){
 if(!raw)return null;
 const obj=JSON.parse(raw);
 if(obj?.format!==1||!v16ValidState(obj.state))throw Error('保存ファイルの構造が正しくありません');
 return obj;
}
function v16Snapshot(){
 return JSON.stringify({format:1,state:S,activeClass,activeType,savedAt:new Date().toISOString()});
}
function v16Write(){
 if(!v16Enabled||!v16StorageAvailable||v16Broken)return false;
 try{
  const current=v16Snapshot();
  const existing=localStorage.getItem(V16_KEY);
  // Keep the previous successful version as a recovery slot.
  if(existing&&existing!==current)localStorage.setItem(V16_PREV,existing);
  localStorage.setItem(V16_KEY,current);
  v16Dirty=false;v16State='saved';v16Last=new Date().toLocaleString('ja-JP',{hour:'2-digit',minute:'2-digit'});
  window.SHOKEN_AUTOSAVE_SYNCED=true;
  v16UpdateBanner();
  return true;
 }catch(e){
  v16Dirty=true;v16State='failed';window.SHOKEN_AUTOSAVE_SYNCED=false;
  v16UpdateBanner();return false;
 }
}
function v16Schedule(){
 if(!v16Enabled||v16Broken)return;
 v16Dirty=true;v16State='pending';window.SHOKEN_AUTOSAVE_SYNCED=false;
 v16UpdateBanner();
 if(v16Timer!==null)clearTimeout(v16Timer);
 v16Timer=setTimeout(()=>{v16Timer=null;v16Write()},400);
}
function v16Flush(){
 if(v16Timer!==null){clearTimeout(v16Timer);v16Timer=null}
 if(!v16Enabled)return false;
 if(v16Dirty)return v16Write();
 return v16State==='saved'&&!v16Broken&&!!window.SHOKEN_AUTOSAVE_SYNCED;
}
window.SHOKEN_AUTOSAVE_FLUSH=v16Flush;
function v16RestoreLocal(){
 if(!v16StorageAvailable)return;
 try{
  v16Enabled=localStorage.getItem(V16_OPT)==='yes';
  if(!v16Enabled)return;
  const primary=localStorage.getItem(V16_KEY),previous=localStorage.getItem(V16_PREV);
  if(!primary&&!previous)return;
  let saved=null,fromPrev=false;
  try{saved=v16Envelope(primary)}catch(e){
   if(previous){saved=v16Envelope(previous);fromPrev=true}else throw e;
  }
  if(!saved){v16State='no-data';return}
  S=saved.state;
  const c=S.classes.find(c=>c.id===saved.activeClass);
  activeClass=c?c.id:S.classes[0].id;
  activeType=TYPES.includes(saved.activeType)?saved.activeType:'総合所見';
  page='home';
  v16State=fromPrev?'recovered':'saved';
  v16Last=saved.savedAt?new Date(saved.savedAt).toLocaleString('ja-JP',{hour:'2-digit',minute:'2-digit'}):'';
  // Do not discard a damaged primary automatically before the user makes a backup.
  if(fromPrev){v16Broken=true;window.SHOKEN_AUTOSAVE_SYNCED=false}
  else{window.SHOKEN_AUTOSAVE_SYNCED=true}
 }catch(e){
  v16State='failed';v16Broken=true;window.SHOKEN_AUTOSAVE_SYNCED=false;
 }
}
window.SHOKEN_AUTOSAVE_ENABLED=false;window.SHOKEN_AUTOSAVE_SYNCED=false;
v16RestoreLocal();
window.SHOKEN_AUTOSAVE_ENABLED=v16Enabled;
const v16CSS=document.createElement('style');
v16CSS.textContent='.v16-status{margin:8px 0 12px;padding:11px 14px;border:1px solid #dce9dc;border-radius:13px;background:#f5faf5;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px}.v16-status.warn{border-color:#ebccbb;background:#fff6ed}.v16-status .v16-info{font-size:12px;line-height:1.7;color:#537460}.v16-status.warn .v16-info{color:#95634f}.v16-actions{display:flex;gap:7px;flex-wrap:wrap}.v16-actions button{font-size:11px;padding:8px 12px}@media(max-width:700px){.v16-status{align-items:flex-start}.v16-actions{width:100%}}';
document.head.appendChild(v16CSS);
function v16StatusText(){
 if(!v16StorageAvailable)return '端末内保存を利用できません。JSONバックアップを使ってください。';
 if(!v16Enabled)return '自動保存はオフです。編集内容はJSONバックアップで保存してください。';
 if(v16Broken)return '保存データの確認が必要です。JSONバックアップを作成してから復旧してください。';
 if(v16State==='failed')return '自動保存に失敗しました。容量・ブラウザ設定を確認し、JSONバックアップを保存してください。';
 if(v16State==='pending')return '保存中です。まだ画面を閉じないでください。';
 if(v16State==='saved')return 'この端末に保存済み'+(v16Last?'（'+v16Last+'）':'')+'。別の端末には同期されません。';
 return 'この端末への自動保存が有効です。';
}
function v16BannerHTML(){
 const warn=!v16StorageAvailable||v16State==='failed'||v16Broken;
 return '<div id="v16-save-indicator" class="v16-status'+(warn?' warn':'')+'"><div class="v16-info"><strong>'+
 (v16Enabled?'◉ 自動保存 '+(warn?'要確認':v16State==='saved'?'保存済み':'有効'):'○ 自動保存 OFF')+
 '</strong><div>'+E(v16StatusText())+'</div></div><div class="v16-actions">'+
 '<button class="btn softbtn" data-v16="toggle"'+(!v16StorageAvailable?' disabled':'')+'>'+
 (v16Enabled?'自動保存をオフにする':'この端末で自動保存する')+'</button>'+
 '<button class="btn" data-v16="backup">JSON保存</button>'+
 '<button class="btn" data-v16="import">JSON読込</button></div></div>';
}
function v16UpdateBanner(){
 const e=$('v16-save-indicator');
 if(e){const helper=document.createElement('div');helper.innerHTML=v16BannerHTML();e.replaceWith(helper.firstElementChild)}
}
const v16PreviousTop=renderTop;
renderTop=function(){v16PreviousTop();$('headline').innerHTML+=v16BannerHTML()};
const v16PreviousRender=render;
render=function(){v16PreviousRender();v16Schedule()};
const v16OldEditEnt=editEnt;
editEnt=function(c,t,n,patch){v16OldEditEnt(c,t,n,patch);v16Schedule()};
const v16OriginalRestore=restoreJSON;
restoreJSON=function(file){
 const rd=new FileReader();
 rd.onload=()=>{
  try{
   if(rd.result.length>20*1024*1024)throw Error('バックアップが大きすぎます（20MB超）');
   const obj=JSON.parse(rd.result),state=obj?.state;
   if(![1,2].includes(obj?.version)||!v16ValidState(state))throw Error('JSONファイルの形式が不正です');
   if(!confirm('JSONを読み込むと現在の作業内容に置き換わります。必要なら先に現在のJSONバックアップを保存してください。続けますか？'))return;
   if(v16Enabled&&!v16Broken){
    // Preserve previous work before importing.
    v16Flush();
   }
   S=state;
   S.nextId=Math.max(Number(S.nextId)||1,...S.bank.map(b=>Number(b.id)||0).slice(0,50000))+1;
   activeClass=S.classes[0].id;activeType='総合所見';page='home';v16Broken=false;v16State='pending';
   render();
   const savedOnDevice=v16Enabled&&v16Flush();
   if(v16Enabled&&!savedOnDevice){
    toast('JSONから復元しましたが、端末への自動保存に失敗しました。JSONバックアップを保存してください');
   }else{
    toast('JSONから復元しました'+(savedOnDevice?'。端末にも保存しました':'。JSONバックアップを保管してください'));
   }
  }catch(e){alert('復元できませんでした：'+e.message)}
 };
 rd.onerror=()=>alert('ファイルを読み取れませんでした');
 rd.readAsText(file);
};
const v16OldBackup=jsonBackup;
jsonBackup=function(){v16Flush();v16OldBackup()};
document.addEventListener('input',()=>v16Schedule());
document.addEventListener('change',()=>v16Schedule());
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v16]');if(!b)return;
 if(b.dataset.v16==='backup'){jsonBackup();return}
 if(b.dataset.v16==='import'){$('importfile').click();return}
 if(b.dataset.v16!=='toggle')return;
 if(!v16Enabled){
  if(!confirm('この端末のブラウザ内に所見と文例を保存します。共有端末・私物端末での個人情報の保存は学校の規則を確認してください。自動保存を有効にしますか？'))return;
  if(!v16StorageAvailable){toast('この端末では保存できません');return}
  const old=localStorage.getItem(V16_KEY);
  if(old&&!v16Broken&&!confirm('この端末には以前の保存データがあります。今の画面のデータで保存内容を更新しますか？'))return;
  try{localStorage.setItem(V16_OPT,'yes');v16Enabled=true;v16Broken=false;window.SHOKEN_AUTOSAVE_ENABLED=true;v16Dirty=true;v16Write();render()}catch(e){v16Enabled=false;v16State='failed';v16UpdateBanner()}
 }else{
  if(!confirm('自動保存を停止し、この端末内の保存データも削除します。別途JSONバックアップを保存してから行ってください。続けますか？'))return;
  v16Flush();
  try{localStorage.removeItem(V16_OPT);localStorage.removeItem(V16_KEY);localStorage.removeItem(V16_PREV)}catch(e){toast('保存データの削除に失敗しました');return}
  v16Enabled=false;v16State='off';v16Dirty=false;window.SHOKEN_AUTOSAVE_ENABLED=false;window.SHOKEN_AUTOSAVE_SYNCED=false;render();
  toast('端末内の保存データを削除しました。画面上の内容は残っています');
 }
});
window.addEventListener('pagehide',()=>v16Flush());
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')v16Flush()});
