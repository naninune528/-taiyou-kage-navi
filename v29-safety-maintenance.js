/* SHOKEN STUDIO v2.9 safety maintenance.
   No network access and no changes to the JSON schema. */
(()=>{
 'use strict';
 function timestamp(){
  const d=new Date(),pad=n=>String(n).padStart(2,'0');
  return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'_'+pad(d.getHours())+pad(d.getMinutes())+pad(d.getSeconds());
 }
 // A download click is not proof that the browser wrote a file.
 // Keep the wording truthful and ask the teacher to verify its location.
 jsonBackup=function(){
  try{
   if(typeof window.SHOKEN_AUTOSAVE_FLUSH==='function')window.SHOKEN_AUTOSAVE_FLUSH();
   const content=JSON.stringify({version:1,state:S},null,2);
   const name='所見メーカー_バックアップ_'+timestamp()+'.json';
   downloadBlob(new Blob([content],{type:'application/json'}),name);
   toast('JSONのダウンロードを開始しました。保存先にファイルがあるか確認してください');
   return true;
  }catch(e){
   alert('JSONを書き出せませんでした：'+(e?.message||'不明なエラー'));
   return false;
  }
 };
 const destructive=new Set(['reset','delete-class','delete-bank']);
 // First click offers a backup and postpones deletion. A subsequent click
 // can continue without another backup using Cancel and the existing confirmation.
 document.addEventListener('click',e=>{
  const b=e.target.closest('[data-action],[data-v16]');
  if(!b)return;
  const action=b.dataset.action;
  const turnOff=b.dataset.v16==='toggle'&&typeof v16Enabled!=='undefined'&&v16Enabled;
  if(!destructive.has(action)&&!turnOff)return;
  const title=action==='reset'?'全データの初期化':action==='delete-class'?'クラスの削除':action==='delete-bank'?'文例の削除':'端末内の自動保存データ削除';
  const ask='「'+title+'」の前にJSONバックアップを保存しますか？\n\n［OK］保存のダウンロードを開始し、今回は削除せず終了します。\n［キャンセル］バックアップせず、元の削除確認に進みます。';
  if(!confirm(ask))return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if(jsonBackup())toast('JSONファイルを確認してから、削除したい場合はもう一度ボタンを押してください');
 },true);
})();
