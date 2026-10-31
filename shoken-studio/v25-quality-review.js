/* STUDIO v2.5: three-viewpoint proofing.
 * All analysis runs locally. Rules are heuristic and never certify assessment validity
 * or whether a pupil actually demonstrated the described achievement.
 * No new storage fields or student identifiers. */
const V25_RULES=[
 {lens:'保護者',id:'vague',regex:/一生懸命(?:頑張|取り組)|頑張りました|努力しました|意欲的に取り組みました|よくできました/g,
  title:'保護者視点：何をしたか、何ができたかを具体的にすると伝わりやすくなります'},
 {lens:'保護者',id:'education-term',regex:/思考・判断・表現|主体的に学習に取り組む態度|資質・能力|メタ認知|形成的評価|概念的理解/g,
  title:'保護者視点：評価用語を、児童が実際に行った活動の言葉に置き換えられるか確認'},
 {lens:'管理職',id:'absolute',regex:/誰よりも|常に|絶対に|必ず|完璧に|一度も|全員の中で|どんなときも/g,
  title:'管理職視点：強い断定や他児童との比較に、十分な根拠があるか確認'},
 {lens:'管理職',id:'vague-result',regex:/力を高めることができました|力が身に付きました|理解を深めました/g,
  title:'管理職視点：どんな学習活動や成果があったか、具体的に書けるか確認'}
];
function v25Hints(value){
 const text=String(value||''),out=[];
 if(!text.trim())return out;
 const add=(lens,id,index,found,title)=>{
  if(index<0||!found)return;
  if(out.some(v=>v.id===id&&v.index===index))return;
  out.push({lens,id,index,length:found.length,found,title});
 };
 for(const rule of V25_RULES){
  for(const m of text.matchAll(rule.regex))add(rule.lens,rule.id,m.index,m[0],rule.title);
 }
 // The title refers to reading a source text; composing another food explanation
 // belongs to the separate writing unit, not this reading unit.
 if(text.includes('すがたをかえる大豆')){
  for(const m of text.matchAll(/(?:資料を調べて.{0,22}文章|説明文を書|文章を書いて|文章を書くこと)/g)){
   add('管理職','soy-reading-writing',m.index,m[0],
    '管理職視点：「すがたをかえる大豆」は読む学習。書く活動の実績が別教材と混ざっていないか確認');
  }
 }
 if(text.includes('食べ物のひみつを教えます')){
  for(const m of text.matchAll(/(?:筆者の工夫|筆者の考え|本文の段落の役割|筆者が示した具体例)/g)){
   add('管理職','food-writing-reading',m.index,m[0],
    '管理職視点：「食べ物のひみつを教えます」は書く学習。読む教材との混同がないか確認');
  }
 }
 for(const m of text.matchAll(/[^。！？\n]{105,}[。！？]/g)){
  const sentence=m[0];const found=sentence.slice(0,Math.min(12,sentence.length));
  add('保護者','long-sentence',m.index,found,
   '保護者視点：一文が長めです。分けると読みやすくなる可能性があります');
 }
 return out.sort((a,b)=>a.index-b.index);
}
const v25BaseChecks=v14Checks;
v14Checks=function(value){
 const out=v25BaseChecks(value);
 for(const issue of v25Hints(value)){
  v14Push(out,'v25:'+issue.id,issue.index,issue.length,issue.found,issue.title,null,issue.lens);
 }
 return out.sort((a,b)=>a.index-b.index);
};
function v25Overview(){
 return '<section class="v25-intro">'+
 '<strong>🌸 3つの視点で仕上げる</strong>'+
 '<div class="v25-trio">'+
 '<div><b>保護者</b><span>どんな活動・工夫・成長があったか、無理なく伝わるか</span></div>'+
 '<div><b>管理職</b><span>単元と評価の観点が合い、表現・断定に無理がないか</span></div>'+
 '<div><b>担任</b><span>実際に見取った児童の姿と一致するかを最終確認</span></div>'+
 '</div><p class="v25-limit">自動で探せるのは、曖昧な言葉・専門用語・断定表現・一部の教材混同などの<b>確認候補だけ</b>。検出0件でも品質・評価規準への一致や児童の事実を保証しません。保存済みの文章は自動変更しません。</p>'+
 '</section>';
}
function v25LensHTML(record){
 const p=record.issues.filter(x=>x.type==='保護者'),a=record.issues.filter(x=>x.type==='管理職');
 const label=(count)=>count?'<span class="v25-attn">'+count+'件の確認候補</span>':'<span class="v25-neutral">自動検出なし（要目視）</span>';
 return '<div class="v25-lenses">'+
 '<div><b>👪 保護者</b>'+label(p.length)+'</div>'+
 '<div><b>📋 管理職</b>'+label(a.length)+'</div>'+
 '<div><b>✏️ 担任</b><span class="v25-neutral">実際の活動・成果と一致するか確認</span></div>'+
 '</div>';
}
const v25PriorProofHTML=v14ProofHTML;
v14ProofHTML=function(){
 let html=v25PriorProofHTML();
 const c=S.classes.find(x=>x.id===Number(v14ClassId))||cur();
 const records=v14Records(c);
 const shown=records.filter(x=>v14Filter==='all'||(v14Filter==='issues'?x.issues.length>0:!x.reviewed));
 const loc='<div class="grid"><div class="panel wide"><div class="v14-filter">';
 if(html.includes(loc))html=html.replace(loc,v25Overview()+loc);
 let index=0;
 html=html.replace(/<div class="v14-text">/g,()=>{
  const row=shown[index++];
  return (row?v25LensHTML(row):'')+'<div class="v14-text">';
 });
 html=html.replace('誤字脱字・表記チェック','所見の最終チェック');
 html=html.replace('4種類の所見をまとめて点検。疑わしい表記を示し、修正と目視確認は先生が行います。',
  '保護者・管理職・担任の3視点と、誤字脱字・表記をまとめて確認します。');
 html=html.replaceAll('文章を目視確認済みにする','3視点を目視確認済みにする');
 return html;
};
const v25PreviousExport=exportHTML;
exportHTML=function(){
 return '<div class="v25-export"><strong>最終確認は「保護者・管理職・担任」の3視点で</strong><p>文例検索や自動チェックは参考です。評価規準の内容、児童の実際の姿、所見の伝わりやすさは、書き出す前に先生が確かめてください。</p></div>'+v25PreviousExport();
};
const v25PreviousSearch=v22SearchHTML;
v22SearchHTML=function(){
 const html=v25PreviousSearch();
 return html.replace('<div class="panel wide v22-search">',
  '<div class="panel wide v22-search"><p class="v25-searchnote">文例は評価観点・学習活動を手掛かりに選び、<b>保護者に具体的に伝わる文章</b>へ調整してください。児童の実際の姿は先生が確認します。</p>');
};
const v25PreviousTop=renderTop;
renderTop=function(){
 v25PreviousTop();
 const tabs=document.getElementById('tabs');
 const btn=tabs?.querySelector('[data-action="page"][data-page="proof"]');
 if(btn)btn.textContent='⌕ 所見の最終チェック';
};
V17_TOOLNAMES.proof='所見の最終チェック';
const v25CSS=document.createElement('style');
v25CSS.textContent='.v25-intro{border:1px solid #d8e5d9;background:#f7faf5;border-radius:15px;padding:15px;margin:0 0 14px;line-height:1.7}.v25-intro>strong{font-size:16px}.v25-trio{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:11px 0}.v25-trio>div{background:#fff;border:1px solid #e0e9df;border-radius:11px;padding:11px}.v25-trio b{display:block;color:#315d46;margin-bottom:4px}.v25-trio span{font-size:12px;color:#526f5c}.v25-limit{font-size:12px;color:#6b775d;margin:8px 0 0}.v25-lenses{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.v25-lenses>div{display:flex;align-items:center;flex-wrap:wrap;gap:7px;font-size:12px;background:#f6faf6;border:1px solid #e1eae0;border-radius:8px;padding:7px 10px}.v25-lenses b{color:#355b47}.v25-attn{color:#92572b;font-weight:700}.v25-neutral{color:#617267}.v25-export{padding:12px 15px;margin-bottom:12px;background:#f8faf4;border:1px solid #dce8dc;border-radius:12px;line-height:1.6}.v25-export p{margin:6px 0 0;font-size:12px;color:#5c7062}.v25-searchnote{font-size:12px;line-height:1.65;padding:10px 12px;margin:0 0 12px;background:#f4f8f0;border-radius:10px;color:#506a59}@media(max-width:750px){.v25-trio{grid-template-columns:1fr}}';
document.head.appendChild(v25CSS);
