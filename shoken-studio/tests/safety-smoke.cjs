/* Built-in Node smoke tests. Synthetic records only; no personal data. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const script16=fs.readFileSync(path.join(root,'v16-storage.js'),'utf8');
const script29=fs.readFileSync(path.join(root,'v29-safety-maintenance.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const calls={toasts:[],alerts:[],downloads:[],confirms:[],listeners:[]};
const map=new Map();
let failKey=false;
const storage={
 setItem(k,v){if(failKey&&k==='shoken-studio.autosave.v1')throw Error('QuotaExceeded');map.set(k,String(v))},
 getItem(k){return map.has(k)?map.get(k):null},
 removeItem(k){map.delete(k)}
};
const basicState=()=>({classes:[{id:1,grade:3,count:2,missing:[],entries:{'総合所見:1':{text:'架空の文章'}}}],bank:[{id:1,text:'架空の文例'}],rules:[],prefs:{},nextId:2});
const sandbox={
 S:basicState(),activeClass:1,activeType:'総合所見',page:'home',TYPES:['総合所見'],
 localStorage:storage,Blob,console,
 setTimeout:()=>55,clearTimeout:()=>{},
 confirm:(m)=>{calls.confirms.push(m);return true},
 alert:(m)=>calls.alerts.push(m),toast:(m)=>calls.toasts.push(m),
 renderTop:()=>{},render:()=>{},editEnt:()=>{},restoreJSON:()=>{},jsonBackup:()=>{},
 downloadBlob:(blob,name)=>{calls.downloads.push({blob,name})},
 E:x=>String(x),$:()=>({innerHTML:''}),
 window:{addEventListener:()=>{}},
 document:{
  head:{appendChild:()=>{}},visibilityState:'visible',
  createElement:()=>({textContent:'',innerHTML:'',firstElementChild:{},replaceWith:()=>{}}),
  addEventListener:(name,fn,capture)=>calls.listeners.push({name,fn,capture})
 },
 FileReader:class {readAsText(file){this.result=file.text;this.onload()}}
};
const ctx=vm.createContext(sandbox);
vm.runInContext(script16,ctx,{filename:'v16-storage.js'});
function restore(state,version=1){sandbox.restoreJSON({text:JSON.stringify({version,state})})}
const imported=basicState();imported.bank.push({id:5,text:'二つ目の文例'});
// Autosave OFF: restoring from JSON must never claim a device save.
restore(imported);
assert.match(calls.toasts.at(-1),/自動保存されません/);
assert.equal(sandbox.S.bank.length,2);
assert.equal(map.get('shoken-studio.autosave.v1'),undefined);
// Autosave ON: successful write must confirm the result.
vm.runInContext('v16Enabled=true;window.SHOKEN_AUTOSAVE_ENABLED=true;',ctx);
restore(imported);
assert.match(calls.toasts.at(-1),/端末にも保存しました/);
assert.ok(map.get('shoken-studio.autosave.v1'));
// Autosave failure: restores in memory but explicitly reports a failed device save.
failKey=true;
const changed=basicState();changed.bank.push({id:7,text:'書き戻し確認'});
restore(changed);
assert.match(calls.toasts.at(-1),/保存に失敗しました/);
assert.doesNotMatch(calls.toasts.at(-1),/端末にも保存しました/);
assert.equal(vm.runInContext('v16State',ctx),'failed');
assert.equal(sandbox.S.bank.at(-1).id,7);
// Invalid JSON must be rejected without replacing working state.
const untouched=sandbox.S;
restore({classes:[],bank:[],prefs:{},rules:[]});
assert.strictEqual(sandbox.S,untouched);
assert.match(calls.alerts.at(-1),/復元できませんでした/);
failKey=false;
vm.runInContext(script29,ctx,{filename:'v29-safety-maintenance.js'});
sandbox.jsonBackup();
assert.match(calls.downloads.at(-1).name,/^所見メーカー_バックアップ_\\d{8}_\\d{6}\\.json$/);
calls.downloads.at(-1).blob.text().then(t=>{
 const saved=JSON.parse(t);
 assert.equal(saved.version,1);
 assert.equal(saved.state.bank.at(-1).id,7);
 // Pre-reset: the first click starts backup instead of running deletion.
 const capture=calls.listeners.find(x=>x.name==='click'&&x.capture===true);
 assert.ok(capture);
 const ev={stopped:false,target:{closest:()=>({dataset:{action:'reset'}})},preventDefault(){this.stopped=true},stopImmediatePropagation(){this.stopped=true}};
 const before=calls.downloads.length;capture.fn(ev);
 assert.equal(ev.stopped,true);
 assert.equal(calls.downloads.length,before+1);
 assert.match(calls.confirms.at(-1),/JSONバックアップ/);
 // Entry-point references are present; public app is unaffected by this branch.
 assert.ok(html.includes('v29-safety-maintenance.js'));
 assert.ok(html.includes("case 'reset'"));
 console.log('PASS: JSON restore (off/success/fail/invalid), dated backup, deletion interception, script wiring');
}).catch(e=>{console.error(e);process.exitCode=1});
