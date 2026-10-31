/* Shoken STUDIO v0.8 tap-number assignment */
applyMode='empty';
function v8Chosen(c){return parseNumbers(applyNumbers,c.count).filter(n=>!c.missing.includes(n))}
function v8Chips(c){
 const sel=new Set(v8Chosen(c));
 return '<div class="v8-shortcuts" style="margin:9px 0"><button class="btn softbtn" data-v8-assign="preset" data-group="奇数">奇数</button><button class="btn softbtn" data-v8-assign="preset" data-group="偶数">偶数</button>'+
 '<button class="btn softbtn" data-v8-assign="preset" data-group="全員">全員</button><button class="btn softbtn" data-v8-assign="unfilled">未配置だけ</button><button class="btn" data-v8-assign="preset" data-group="">選択解除</button><span class="hint" id="v8-amount">'+sel.size+'名選択</span></div>'+
 '<div class="v8-number-grid" id="v8-assign-grid">'+Array.from({length:c.count},(_,i)=>i+1).map(n=>'<button type="button" class="share-chip'+(sel.has(n)?' is-selected':'')+(c.missing.includes(n)?' is-missing':'')+
 '" data-v8-assign="number" data-n="'+n+'" aria-pressed="'+sel.has(n)+'" '+(c.missing.includes(n)?'disabled':'')+'>'+n+'</button>').join('')+'</div>'+
 '<p class="hint">文例選択後に、当てはまる番号をタップ。欠番は選択できません。</p>';
}
const v8OldAssign=assignHTML;
assignHTML=function(){
 const html=v8OldAssign(),input=/(<input data-bind="applyNumbers"[^>]*>)/;
 let out=html.replace(input,function(x){return x+v8Chips(cur())});
 out=out.replace('<option value="append"','<option value="empty" '+(applyMode==='empty'?'selected':'')+'>空欄だけに配置（おすすめ）</option><option value="append"');
 return out;
};
function v8SyncChips(){
 const c=cur(),chosen=new Set(v8Chosen(c)),amount=$('v8-amount');
 if(amount)amount.textContent=chosen.size+'名選択';
 const input=document.querySelector('[data-bind="applyNumbers"]');if(input)input.value=applyNumbers;
 document.querySelectorAll('#v8-assign-grid [data-v8-assign="number"]').forEach(b=>{const active=chosen.has(Number(b.dataset.n));b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',active?'true':'false')});
}
document.addEventListener('input',e=>{if(e.target.dataset.bind==='applyNumbers'){applyNumbers=e.target.value;v8SyncChips()}});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v8-assign]');if(!b)return;
 const c=cur();
 if(b.dataset.v8Assign==='unfilled'){applyNumbers=Array.from({length:c.count},(_,i)=>i+1).filter(n=>!c.missing.includes(n)&&!getEnt(c,activeType,n).text.trim()).join(',')}
 else if(b.dataset.v8Assign==='preset'){applyNumbers=b.dataset.group||''}
 else{const num=Number(b.dataset.n),set=new Set(v8Chosen(c));if(c.missing.includes(num))return;if(set.has(num))set.delete(num);else set.add(num);applyNumbers=[...set].sort((a,b)=>a-b).join(',')}
 v8SyncChips();
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action="apply-bank"]');if(!b)return;
 e.preventDefault();e.stopImmediatePropagation();
 const c=cur(),item=S.bank.find(x=>x.id===Number(applySelected)),nums=v8Chosen(c);
 if(!item||!nums.length){toast('文例と番号を選んでください');return}
 if(item.grade!==c.grade&&!confirm('文例と対象クラスの学年が異なります。続けますか？'))return;
 if(applyMode==='replace'&&nums.some(n=>getEnt(c,activeType,n).text.trim())&&!confirm('既存の文章を置き換えますか？'))return;
 let changed=0,skipped=0;
 for(const n of nums){
  const row=getEnt(c,activeType,n);
  if(applyMode==='empty'&&row.text.trim()){skipped++;continue}
  if(applyMode==='append'&&row.text.includes(item.text)){skipped++;continue}
  const text=applyMode==='append'&&row.text.trim()?row.text.trimEnd()+'\n'+item.text:item.text;
  editEnt(c,activeType,n,{text,status:'下書き',touched:true,sourceBankId:item.id});changed++;
 }
 if(applyMode==='empty'){applyNumbers=Array.from({length:c.count},(_,i)=>i+1).filter(n=>!c.missing.includes(n)&&!getEnt(c,activeType,n).text.trim()).join(',')}
 render();toast(changed+'名へ配置'+(skipped?'（既存文章など '+skipped+'名を除外）':'')+'しました。次は未配置の'+applyNumbers.split(',').filter(Boolean).length+'名を選べます');
},true);