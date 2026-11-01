/* Shoken STUDIO v0.8 progress */
const V8_TYPES=['総合所見','総合的な学習の時間','外国語活動','道徳'];
const V8_DEFAULT={min:1,max:300};
function v8Limits(t){
 S.prefs.charLimits=S.prefs.charLimits||{};
 const a=S.prefs.charLimits[t]||V8_DEFAULT;
 const min=Math.max(1,Number(a.min)||1),max=Math.max(min,Number(a.max)||300);
 return {min,max};
}
function v8Length(s){return Array.from(String(s||'').trim()).length}
function v8Count(c,t){
 const nums=Array.from({length:c.count},(_,i)=>i+1).filter(n=>!c.missing.includes(n));
 const v=v8Limits(t);let good=0,confirmed=0;
 for(const n of nums){const x=getEnt(c,t,n),len=v8Length(x.text);if(len>=v.min&&len<=v.max){good++;if(x.status==='確定')confirmed++}}
 const total=nums.length;
 return {total,good,confirmed,range:v,pct:total?Math.round(good/total*100):0,confirmedPct:total?Math.round(confirmed/total*100):0};
}
const v8Style=document.createElement('style');
v8Style.textContent='.v8-progress{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.v8-progress-card{background:#fffefb;border:1px solid #dce7dc;border-radius:15px;padding:14px}.v8-score{font-size:28px;font-weight:800;color:#315f4d}.v8-track{height:8px;border-radius:12px;background:#e2e9e0;overflow:hidden;margin:8px 0}.v8-fill{height:100%;background:#69967e}.v8-mini{font-size:11px;color:#63786c}.v8-limits{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:12px;margin:12px 0;align-items:end}.v8-number-grid{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:7px;margin:12px 0}.v8-number-grid .share-chip{min-width:0;padding:11px 0}.v8-shortcuts{display:flex;gap:6px;flex-wrap:wrap}.v8-row{border:1px solid #dae6db;background:#fffefb;border-radius:16px;padding:15px;margin:0 0 13px}.v8-row-main{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:15px}.v8-row-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}.v8-picker{padding:12px;border-radius:12px;background:#f2f6f0}.v8-picker .field{margin-bottom:8px}.v8-picker select,.v8-row select{width:100%;max-width:100%}.v8-preview{padding:10px;border-radius:9px;background:white;border:1px dashed #b6cdbb;white-space:pre-wrap;font-size:12px}.v8-row textarea{width:100%;min-height:100px}.v8-valid{color:#336e50}.v8-invalid{color:#ad644e}@media(max-width:970px){.v8-progress{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:690px){.v8-number-grid{grid-template-columns:repeat(5,minmax(0,1fr))}.v8-row-main{grid-template-columns:1fr}.v8-limits{grid-template-columns:1fr 1fr}.v8-limits strong{grid-column:span 2}}';
document.head.appendChild(v8Style);
function v8ProgressBlock(c){
 return '<div class="panel wide" style="margin:0 0 20px"><div class="section-kicker">PROGRESS BY CATEGORY</div><h2 style="margin:4px 0">所見別の完成状況｜'+E(labelClass(c))+'</h2>'+
 '<p class="muted small">大きい数字は文字数クリア率。確定率は別に表示。欠番を除いた全員が指定文字数内なら100%です。</p><div class="v8-progress">'+
 V8_TYPES.map(t=>{const x=v8Count(c,t);return '<div class="v8-progress-card"><strong>'+E(t)+'</strong><div class="v8-score">'+x.pct+'%</div><div class="v8-track"><div class="v8-fill" style="width:'+x.pct+'%"></div></div><div class="v8-mini">文字数クリア '+x.good+'/'+x.total+'名（'+x.range.min+'〜'+x.range.max+'字）</div><div class="v8-mini">確定＋文字数 '+x.confirmed+'/'+x.total+'名（'+x.confirmedPct+'%）</div></div>'}).join('')+
 '</div><p class="hint" style="margin:12px 0 0">初期文字数は仮設定（1〜300字）。学校の規定に合わせ「クラス・設定」で変更できます。</p></div>';
}
const v8PrevHome=homeHTML;
homeHTML=function(){
 const h=v8PrevHome(),needle='<div class="section-head"><div><div class="section-kicker">WORKSPACE / TODAY</div>';
 return h.replace(needle,v8ProgressBlock(cur())+needle);
};
const v8PrevSettings=v4Settings;
v4Settings=function(){
 v8PrevSettings();
 const p=document.createElement('div');p.className='panel';p.style.marginTop='15px';
 p.innerHTML='<div class="section-kicker">CHARACTER TARGETS</div><h2>所見別の文字数条件</h2><p class="muted small">下限・上限を設定。文字が入っていても指定範囲外ならクリアに含みません。</p>'+
 V8_TYPES.map(t=>{const v=v8Limits(t);return '<div class="v8-limits"><strong>'+E(t)+'</strong><div class="field"><label>下限（字）</label><input type="number" min="1" max="1000" data-v8-limit="min" data-type="'+E(t)+'" value="'+v.min+'"></div><div class="field"><label>上限（字）</label><input type="number" min="1" max="1000" data-v8-limit="max" data-type="'+E(t)+'" value="'+v.max+'"></div></div>'}).join('')+
 '<p class="hint">学校の実際の字数規定を入力してね。これらの設定はJSONバックアップに含まれます。</p>';
 $('main').appendChild(p);
};
document.addEventListener('change',e=>{
 const f=e.target.dataset.v8Limit;if(!f)return;
 const t=e.target.dataset.type,v8={...v8Limits(t)},num=Math.min(1000,Math.max(1,Number(e.target.value)||1));
 v8[f]=num;if(v8.min>v8.max){if(f==='min')v8.max=v8.min;else v8.min=v8.max}
 S.prefs.charLimits=S.prefs.charLimits||{};S.prefs.charLimits[t]=v8;render();toast('文字数条件を変更しました');
});