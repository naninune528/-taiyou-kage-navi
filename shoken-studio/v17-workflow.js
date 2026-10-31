/* STUDIO v1.7 - PC-first three-stage navigation, preserve all legacy features */
const V17_STAGES=[
 {page:'stage-prepare',key:'prepare',name:'① 文例を準備',subtitle:'集める・仕分ける・蓄積'},
 {page:'stage-create',key:'create',name:'② 所見を作成',subtitle:'配置する・個別に直す'},
 {page:'stage-review',key:'review',name:'③ 確認・出力',subtitle:'点検する・Excelに出す'}
];
const V17_GROUPS={
 'stage-prepare':'prepare',smartimport:'prepare',bank:'prepare',paste:'prepare',compose:'prepare',saveexample:'prepare',
 'stage-create':'create',edit:'create',assign:'create',common:'create',share:'create',guide:'create',structure:'create',
 'stage-review':'review',proof:'review',export:'review'
};
const V17_TOOLNAMES={
 smartimport:'文例まとめ登録',bank:'文例バンク',paste:'複数文例を貼り付け',compose:'文例を作る',
 edit:'番号別に編集',assign:'一括割り振り',common:'共通活動を配置',share:'クラス横断配置',
 proof:'誤字脱字チェック',export:'Excel出力'
};
const V17_TOOLPAGES={
 prepare:['smartimport','bank','paste','compose'],
 create:['edit','assign','common','share'],
 review:['proof','export']
};
const v17Style=document.createElement('style');
v17Style.textContent='.tabs.v17-tabs{gap:9px;flex-wrap:wrap;overflow:visible;padding-bottom:0;margin:12px 0 13px}.v17-tabs .tab{background:#f4f7f1;border:1px solid #dfe8dd;font-weight:700;padding:12px 16px;white-space:normal}.v17-tabs .tab.active{background:#e0ece3;border-color:#9fbea9;color:#285741;box-shadow:0 2px 0 #a8c7b1}.v17-subnav{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px;padding:9px 12px;border-radius:13px;border:1px solid #dce7dc;background:#f9faf5}.v17-subnav .v17-link{border:1px solid transparent;background:transparent;color:#526d5a;padding:7px 11px;border-radius:9px;font-size:12px;font-weight:650}.v17-subnav .v17-link.active{background:#e4eee4;border-color:#cbdacb;color:#275944}.v17-stage-intro{padding:21px 23px;background:#f5f9f2;border:1px solid #d6e5d8;border-radius:18px;margin-bottom:18px}.v17-stage-intro h2{font-size:19px;margin:4px 0 7px}.v17-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.v17-stepcard{border:1px solid #dde7dc;border-radius:16px;background:#fffdfa;padding:15px;min-height:165px;display:flex;flex-direction:column;gap:8px}.v17-stepcard.main{border-color:#b4cdb6;background:#f3f8f0}.v17-stepcard .v17-eyebrow{font-size:10px;letter-spacing:.07em;font-weight:800;color:#52745f}.v17-stepcard strong{font-size:16px;line-height:1.5}.v17-stepcard p{font-size:12px;color:#61766b;line-height:1.75;margin:0 0 10px}.v17-stepcard .btn{margin-top:auto;align-self:flex-start}.v17-sidebox{border:1px solid #dde9db;border-radius:14px;background:#f7faf5;padding:14px;margin-top:17px}.v17-quick{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.v17-quickcard{border:1px solid #dce8dd;background:#f7faf5;border-radius:13px;padding:12px}.v17-quickcard strong{display:block;margin:7px 0}.v17-quickcard p{font-size:11px;color:#637a6c;margin-bottom:11px}.v17-quickcard .btn{font-size:12px}.v17-intro{font-size:12px;color:#617669}.v17-stage-stat{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:#52735a}.v17-stage-stat strong{font-size:17px;color:#305b47;margin-right:3px}@media(max-width:800px){.v17-steps,.v17-quick{grid-template-columns:1fr}.v17-stepcard{min-height:auto}.tabs.v17-tabs{gap:6px}.v17-tabs .tab{padding:9px 12px;font-size:12px}.v17-stage-intro{padding:16px}}';
document.head.appendChild(v17Style);
function v17Tool(page,title,desc,primary=false,step=''){
 return '<div class="v17-stepcard'+(primary?' main':'')+'">'+
 '<div class="v17-eyebrow">'+E(step||'WORKFLOW')+'</div><strong>'+E(title)+'</strong>'+
 '<p>'+E(desc)+'</p><button class="btn '+(primary?'primary':'softbtn')+'" data-action="page" data-page="'+page+'">'+
 E(title)+' →</button></div>';
}
function v17StageName(key){const s=V17_STAGES.find(x=>x.key===key);return s?.name||'ホーム'}
function v17Subnav(){
 const key=V17_GROUPS[page],pages=V17_TOOLPAGES[key];
 if(!pages)return '';
 return '<div class="v17-subnav" aria-label="この段階で使う機能">'+
 '<span class="v17-intro" style="align-self:center;margin-right:6px">'+E(v17StageName(key))+'：</span>'+
 pages.map(p=>'<button type="button" class="v17-link'+(page===p?' active':'')+'" data-action="page" data-page="'+p+'"'+(page===p?' aria-current="page"':'')+'>'+E(V17_TOOLNAMES[p])+'</button>').join('')+'</div>';
}
const v17PriorTop=renderTop;
renderTop=function(){
 v17PriorTop();
 const tabs=$('tabs');
 if(tabs){
  tabs.className='tabs v17-tabs';
  const tops=[{page:'home',name:'⌂ ホーム'},...V17_STAGES,{page:'settings',name:'⚙ 設定'}];
  const group=V17_GROUPS[page];
  tabs.innerHTML=tops.map(x=>{
   const active=x.page===page||x.key===group;
   return '<button type="button" class="tab'+(active?' active':'')+'" data-action="page" data-page="'+x.page+
    '"'+(active?' aria-current="page"':'')+'>'+E(x.name)+'</button>';
  }).join('');
 }
 const head=$('headline');
 if(head)head.insertAdjacentHTML('beforeend',v17Subnav());
};
function v17StageHTML(){
 const stage=V17_GROUPS[page],c=cur();
 if(stage==='prepare')return header('① 文例を準備','以前の文例を集めて、教科・単元別に整理。作成前の準備をここでまとめます。')+
 '<div class="v17-stage-intro"><div class="section-kicker">STEP 01 / COLLECT</div><h2>まず、使いたい文例をためる</h2>'+
 '<p class="v17-intro">一度バンクに登録すると、あとから何度でも選べます。登録済み：<strong>'+S.bank.length+'件</strong>。</p></div>'+
 '<div class="v17-steps">'+
 v17Tool('smartimport','文例をまとめて登録','3年生など学年を選んで貼り付け。教科・単元を仕分けしてから登録します。',true,'おすすめ / まとめて登録')+
 v17Tool('bank','文例バンクを開く','登録済み文例を検索し、内容を確認して作業に使います。',false,'登録した文例を探す')+
 v17Tool('paste','複数の文章を一括貼り付け','道徳・外国語活動などの文章をまとめて保存・番号へ配置できます。',false,'複数文例を扱う')+
 '</div><div class="v17-sidebox"><strong>文例を一から作る場合</strong><p class="v17-intro" style="margin:7px 0">教科と単元を指定して文例を作る画面もそのまま使えます。</p>'+
 '<button class="btn softbtn" data-action="page" data-page="compose">文章づくりへ →</button></div>';
 if(stage==='create')return header('② 所見を作成','文例を該当する番号に配置してから、その子らしく文章を調整します。')+
 '<div class="v17-stage-intro"><div class="section-kicker">STEP 02 / WRITE</div><h2>配置して、一人ずつ仕上げる</h2>'+
 '<div class="v17-stage-stat"><span>対象：'+E(labelClass(c))+'</span>'+
 '<span>下書き中 <strong>'+stateCount(c,activeType).draft+'</strong>名</span>'+
 '<span>要検討 <strong>'+stateCount(c,activeType).need+'</strong>名</span></div></div>'+
 '<div class="v17-steps">'+
 v17Tool('edit','番号別に編集','教科・単元・文例を選び、文章を微調整。逆質問や構成別編集もここから使えます。',true,'おすすめ / 個別編集')+
 v17Tool('assign','文例を一括割り振り','番号をタップして文例を配置。未配置の番号だけを選ぶこともできます。',false,'まとめて配置')+
 v17Tool('common','共通活動の文章を配置','係・当番・総合の共通部分をまとめて配置し、あとから個別修正します。',false,'共通文を使う')+
 '</div><div class="v17-sidebox"><strong>複数クラスを担当している場合</strong><p class="v17-intro" style="margin:7px 0">クラスをまたぐ文章の配置も、これまでどおり利用できます。</p>'+
 '<button class="btn softbtn" data-action="page" data-page="share">クラス横断配置へ →</button></div>';
 if(stage==='review'){
  const data=V8_TYPES.map(t=>({type:t,...v8Count(c,t)}));
  return header('③ 確認・出力','文字数と内容を確認してからExcelに書き出し、JSONバックアップも残します。')+
  '<div class="v17-stage-intro"><div class="section-kicker">STEP 03 / CHECK</div><h2>提出前に確認する</h2>'+
  '<div class="v17-stage-stat">'+data.map(x=>'<span>'+E(x.type)+'：文字数 <strong>'+x.pct+'%</strong> ／ 確定 '+x.confirmedPct+'%</span>').join('')+'</div>'+
  '<p class="v17-intro" style="margin:9px 0 0">文字数クリア率と確定率は別表示。提出OKの保証ではないので、内容は必ず目視確認してください。</p></div>'+
  '<div class="v17-steps">'+
  v17Tool('proof','誤字脱字・表記を点検','句読点、表記揺れ、未確認の文章をまとめて確認します。',true,'最初にチェック')+
  v17Tool('export','Excelに書き出す','番号順に所見をExcelへ出力。ファイルを開いて最終確認します。',false,'出力する')+
  '<div class="v17-stepcard"><div class="v17-eyebrow">データを守る</div><strong>JSONバックアップ</strong>'+
  '<p>作業後にJSONファイルを保存。PCの保存状態も確認してください。</p>'+
  '<button class="btn softbtn" data-action="save-json">バックアップを保存 →</button></div>'+
  '</div>';
 }
 return '';
}
const v17PriorRender=render;
render=function(){
 if(page==='stage-prepare'||page==='stage-create'||page==='stage-review'){
  renderTop();$('main').innerHTML=v17StageHTML();return;
 }
 v17PriorRender();
};
function v17HomeQuick(){
 return '<div class="panel c8 quick-panel"><div class="section-kicker">THREE SIMPLE STEPS</div>'+
 '<h2 style="margin:4px 0 15px">今日の作業を選ぶ</h2><div class="v17-quick">'+
 V17_STAGES.map((s,i)=>'<div class="v17-quickcard"><div class="section-kicker">STEP 0'+(i+1)+'</div><strong>'+E(s.name)+'</strong>'+
 '<p>'+E(s.subtitle)+'</p><button class="btn softbtn" data-action="page" data-page="'+s.page+'">ここから始める →</button></div>').join('')+
 '</div></div>';
}
const v17PriorHome=homeHTML;
homeHTML=function(){
 const html=v17PriorHome();
 const a=html.indexOf('<div class="panel c8 quick-panel">'),b=html.indexOf('<div class="panel c4 safety-card">',a);
 if(a<0||b<0)return v17HomeQuick()+html;
 return html.slice(0,a)+v17HomeQuick()+html.slice(b);
};