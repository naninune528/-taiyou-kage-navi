/* SHOKEN STUDIO v2.8 | device-local visual themes only.
   Never reads/writes student records, autosave, the example bank or export files. */
(()=>{
 'use strict';
 const KEY='shoken-studio.theme.v1';
 const THEMES=[
  {id:'original',name:'オリジナル',hint:'これまでの配色',swatch:'#2c584a'},
  {id:'mint',name:'若草ミント',hint:'すっきり、落ち着く',swatch:'#6b9b80'},
  {id:'pink',name:'さくらピンク',hint:'やさしく、華やか',swatch:'#ce829f'},
  {id:'blue',name:'スカイブルー',hint:'爽やか、見やすい',swatch:'#679fcb'},
  {id:'lavender',name:'ラベンダー',hint:'上品で、穏やか',swatch:'#9980c5'}
 ];
 let selected='original';
 try{const stored=localStorage.getItem(KEY);if(THEMES.some(t=>t.id===stored))selected=stored}catch(_){}
 const style=document.createElement('style');
 style.id='v28-theme-styles';
 style.textContent="\n:root{--theme-bg:#f6f4ee;--theme-panel:#fffefb;--theme-brand:#fffefa;--theme-accent:#719284;--theme-deep:#2c584a;--theme-light:#edf4ed;--theme-ink:#233d33;--theme-muted:#728078;--theme-line:#e6e7dc;--theme-highlight:#e2eee0;--theme-hero-start:#284e3c;--theme-hero-end:#5e816c;--theme-neutral:#f5f7f3}\n:root[data-studio-theme=\"mint\"]{--theme-bg:#f3f8f1;--theme-panel:#fffefb;--theme-brand:#fcfffb;--theme-accent:#5b977b;--theme-deep:#285943;--theme-light:#e7f2ea;--theme-ink:#263f31;--theme-muted:#657b6b;--theme-line:#dce7dc;--theme-highlight:#d5e9d9;--theme-hero-start:#294e3e;--theme-hero-end:#527b65;--theme-neutral:#f5f8f2}\n:root[data-studio-theme=\"pink\"]{--theme-bg:#fff3f6;--theme-panel:#fffafd;--theme-brand:#fff9fb;--theme-accent:#c77e9b;--theme-deep:#84445f;--theme-light:#fbe5ef;--theme-ink:#4a303d;--theme-muted:#80616f;--theme-line:#f0dce4;--theme-highlight:#f4d7e3;--theme-hero-start:#713e56;--theme-hero-end:#b17792;--theme-neutral:#fff5f9}\n:root[data-studio-theme=\"blue\"]{--theme-bg:#eef7fe;--theme-panel:#fff;--theme-brand:#fafdff;--theme-accent:#679fc2;--theme-deep:#305e7f;--theme-light:#e2f1fb;--theme-ink:#283f50;--theme-muted:#5f788c;--theme-line:#d7e7f1;--theme-highlight:#d2e9f7;--theme-hero-start:#2c5677;--theme-hero-end:#548eaf;--theme-neutral:#f3f9fe}\n:root[data-studio-theme=\"lavender\"]{--theme-bg:#f6f0fd;--theme-panel:#fffcff;--theme-brand:#fefaff;--theme-accent:#9884be;--theme-deep:#624d86;--theme-light:#eee6fa;--theme-ink:#3e3550;--theme-muted:#746785;--theme-line:#e6dff1;--theme-highlight:#e2d8f3;--theme-hero-start:#584674;--theme-hero-end:#9280b6;--theme-neutral:#f9f5ff}\nhtml[data-studio-theme]{--bg:var(--theme-bg);--panel:var(--theme-panel);--sage:var(--theme-accent);--sage-deep:var(--theme-deep);--sage-light:var(--theme-light);--ink:var(--theme-ink);--muted:var(--theme-muted);--line:var(--theme-line)}\nhtml[data-studio-theme] body{background:var(--theme-bg);color:var(--theme-ink)}\nhtml[data-studio-theme] h1,html[data-studio-theme] h2,html[data-studio-theme] h3{color:var(--theme-ink)}\nhtml[data-studio-theme] .hero h1{color:#fff}\nhtml[data-studio-theme] .brandbar{background:var(--theme-brand);border-bottom-color:var(--theme-line)}\nhtml[data-studio-theme] .mark{background:var(--theme-deep);box-shadow:none}\nhtml[data-studio-theme] .logo strong,html[data-studio-theme] #headline .micro-top strong{color:var(--theme-deep)}\nhtml[data-studio-theme] .logo-overline,html[data-studio-theme] .muted{color:var(--theme-muted)}\nhtml[data-studio-theme] .pill{background:var(--theme-light);border-color:var(--theme-line);color:var(--theme-deep)}\nhtml[data-studio-theme] .tabs{border-color:var(--theme-line)}\nhtml[data-studio-theme] .tab.active{background:var(--theme-light);color:var(--theme-deep);border-bottom-color:var(--theme-accent)}\nhtml[data-studio-theme] .tab:hover:not(.active){background:var(--theme-neutral);color:var(--theme-deep)}\nhtml[data-studio-theme] .panel,html[data-studio-theme] .card,html[data-studio-theme] .bankcard,html[data-studio-theme] .quick-panel,html[data-studio-theme] .workspace-panel,html[data-studio-theme] .safety-card{background:var(--theme-panel);border-color:var(--theme-line)}\nhtml[data-studio-theme] .btn{color:var(--theme-deep);border-color:var(--theme-line)}\nhtml[data-studio-theme] .btn.primary{color:#fff;background:var(--theme-deep);border-color:var(--theme-deep)}\nhtml[data-studio-theme] .btn.softbtn{color:var(--theme-deep);background:var(--theme-light);border-color:var(--theme-line)}\nhtml[data-studio-theme] .hero{background:linear-gradient(120deg,var(--theme-hero-start) 2%,var(--theme-deep) 48%,var(--theme-hero-end) 100%)}\nhtml[data-studio-theme] .hero .btn.primary{color:var(--theme-deep);background:#fff6e8;border-color:#fff6e8}\nhtml[data-studio-theme] .hero p{color:#fff}\nhtml[data-studio-theme] .progress-ring{background:conic-gradient(var(--theme-accent) calc(var(--percent)*1%),var(--theme-line) 0)}\nhtml[data-studio-theme] .progress-value,html[data-studio-theme] .workspace-panel .stat .n,html[data-studio-theme] .stat .n,html[data-studio-theme] .step-card strong,html[data-studio-theme] .progress-legend b,html[data-studio-theme] .action-link{color:var(--theme-deep)}\nhtml[data-studio-theme] .progress-panel,html[data-studio-theme] .step-card,html[data-studio-theme] .stat,html[data-studio-theme] .workspace-panel .stat,html[data-studio-theme] .soft,html[data-studio-theme] .notice,html[data-studio-theme] .v27-chooser{background:var(--theme-neutral);border-color:var(--theme-line)}\nhtml[data-studio-theme] .progress-ring::before{background:var(--theme-neutral)}\nhtml[data-studio-theme] .tag,html[data-studio-theme] th{background:var(--theme-light);color:var(--theme-deep)}\nhtml[data-studio-theme] .tag.need{background:#faf0dd;color:#9b6840}\nhtml[data-studio-theme] .tag.draft{background:#edf1f8;color:#5b6f86}\nhtml[data-studio-theme] .tag.done{background:#e2f1e6;color:#416b57}\nhtml[data-studio-theme] .field label,html[data-studio-theme] .v27-chooser>strong{color:var(--theme-deep)}\nhtml[data-studio-theme] .field input:focus,html[data-studio-theme] .field select:focus,html[data-studio-theme] .field textarea:focus,html[data-studio-theme] textarea.celltext:focus{border-color:var(--theme-accent);box-shadow:0 0 0 3px var(--theme-light)}\nhtml[data-studio-theme] .v27-catbtn,html[data-studio-theme] .v27-tag{color:var(--theme-deep);border-color:var(--theme-line)}\nhtml[data-studio-theme] .v27-catbtn.chosen,html[data-studio-theme] .v27-tag.chosen{background:var(--theme-light);border-color:var(--theme-accent)}\nhtml[data-studio-theme] .workflow-banner{background:linear-gradient(115deg,var(--theme-light),var(--theme-neutral));border-color:var(--theme-line)}\nhtml[data-studio-theme] .workflow-banner .symbol{background:var(--theme-highlight);color:var(--theme-deep)}\nhtml[data-studio-theme] .status-dot{background:var(--theme-accent);box-shadow:0 0 0 4px var(--theme-light)}\n.top-meta{position:relative}\n.v28-toggle{display:inline-flex;align-items:center;justify-content:center;gap:5px;white-space:nowrap}\n.v28-menu{position:absolute;top:calc(100% + 13px);right:0;z-index:600;width:min(360px,calc(100vw - 24px));padding:15px;background:var(--theme-panel);color:var(--theme-ink);border:1px solid var(--theme-line);border-radius:18px;box-shadow:0 16px 48px #203d3640}\n.v28-menu[hidden]{display:none!important}\n.v28-menu-head{font-weight:800;font-size:14px;margin:0 0 9px}\n.v28-menu-sub{font-size:11px;color:var(--theme-muted);margin:0 0 13px}\n.v28-theme-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}\n.v28-option{display:flex;gap:9px;align-items:center;text-align:left;padding:12px 9px;min-width:0;border:2px solid var(--theme-line);border-radius:13px;background:var(--theme-neutral);color:var(--theme-ink);cursor:pointer}\n.v28-option[aria-pressed=\"true\"]{border-color:var(--theme-accent);background:var(--theme-light)}\n.v28-dot{display:block;flex:0 0 25px;width:25px;height:25px;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 1px #0000001c}\n.v28-option strong{font-size:12px;display:block}\n.v28-option small{font-size:10px;color:var(--theme-muted);display:block;line-height:1.5}\n.v28-saved-note{font-size:10px;line-height:1.6;color:var(--theme-muted);margin:12px 0 0}\n@media(max-width:560px){.v28-toggle{padding:8px!important;min-width:38px}.v28-toggle .v28-text{display:none}.v28-option{padding:9px 7px}.v28-option strong{font-size:11px}}\n@media(prefers-reduced-motion:no-preference){html[data-studio-theme] body,html[data-studio-theme] .brandbar{transition:background-color .2s ease}}\n";
 document.head.appendChild(style);
 function setStatus(message){
  const target=document.getElementById('v28-theme-status');
  if(target)target.textContent=message;
 }
 function setTheme(id,persist){
  if(!THEMES.some(t=>t.id===id))return;
  selected=id;
  if(id==='original')document.documentElement.removeAttribute('data-studio-theme');
  else document.documentElement.setAttribute('data-studio-theme',id);
  document.querySelectorAll('.v28-option').forEach(button=>{
   button.setAttribute('aria-pressed',String(button.dataset.v28Theme===id));
  });
  if(persist){
   try{localStorage.setItem(KEY,id);setStatus('この端末に色を保存しました。')}
   catch(_){setStatus('色は切り替えました。この端末では選択を保存できません。')}
  }
 }
 const toggle=document.getElementById('v28-theme-toggle');
 if(!toggle){setTheme(selected,false);return}
 const menu=document.createElement('section');
 menu.className='v28-menu';
 menu.id='v28-theme-menu';
 menu.setAttribute('aria-label','画面のテーマカラー');
 menu.hidden=true;
 menu.innerHTML='<p class="v28-menu-head">🎨 テーマカラー</p>'+
  '<p class="v28-menu-sub">気分に合わせて色を選べます。所見の文章や保存データは変わりません。</p>'+
  '<div class="v28-theme-grid" role="group" aria-label="選べる5色">'+
  THEMES.map(t=>'<button type="button" class="v28-option" data-v28-theme="'+t.id+'" aria-pressed="'+(t.id===selected)+'">'+
   '<span class="v28-dot" style="background:'+t.swatch+'" aria-hidden="true"></span>'+
   '<span><strong>'+t.name+'</strong><small>'+t.hint+'</small></span></button>').join('')+
  '</div><p class="v28-saved-note" id="v28-theme-status" role="status" aria-live="polite">選んだ色を、この端末に保存します。</p>';
 toggle.parentElement.appendChild(menu);
 setTheme(selected,false);
 function openMenu(open){
  menu.hidden=!open;
  toggle.setAttribute('aria-expanded',String(open));
 }
 toggle.addEventListener('click',e=>{e.stopPropagation();openMenu(menu.hidden)});
 menu.addEventListener('click',e=>{
  const button=e.target.closest('[data-v28-theme]');
  if(!button)return;
  setTheme(button.dataset.v28Theme,true);
 });
 document.addEventListener('click',e=>{
  if(!menu.hidden&&!menu.contains(e.target)&&!toggle.contains(e.target))openMenu(false);
 });
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!menu.hidden){openMenu(false);toggle.focus()}
 });
})();
