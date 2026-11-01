/* SHOKEN STUDIO: password gate for Cloudflare Pages Direct Upload.
 * Do not place actual secrets in this file or in GitHub.
 * Required encrypted bindings: SHOKEN_PASSWORD, SHOKEN_SESSION_SECRET.
 */
const COOKIE="__Host-shoken_session";
const MAX_AGE=8*60*60;
const UTF8=new TextEncoder();
function bytes(s){return UTF8.encode(s)}
function equal(a,b){
 if(a.length!==b.length)return false;
 let result=0;for(let i=0;i<a.length;i++)result|=a[i]^b[i];
 return result===0;
}
async function passwordOK(actual,expected){
 const digests=await Promise.all([actual,expected].map(s=>crypto.subtle.digest("SHA-256",bytes(s))));
 return equal(new Uint8Array(digests[0]),new Uint8Array(digests[1]));
}
async function signature(secret,host,expires){
 const key=await crypto.subtle.importKey("raw",bytes(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 const hash=await crypto.subtle.sign("HMAC",key,bytes("shoken-v1:"+host+":"+expires));
 return [...new Uint8Array(hash)].map(n=>n.toString(16).padStart(2,"0")).join("");
}
async function signedIn(request,secret){
 const cookie=request.headers.get("Cookie")||"";
 const found=cookie.split(";").map(x=>x.trim()).find(x=>x.startsWith(COOKIE+"="));
 if(!found)return false;
 const match=/^(\d{10,13})\.([0-9a-f]{64})$/.exec(found.slice(COOKIE.length+1));
 if(!match)return false;
 const expires=Number(match[1]),now=Math.floor(Date.now()/1000);
 if(!Number.isSafeInteger(expires)||expires<=now||expires>now+MAX_AGE)return false;
 const expected=await signature(secret,new URL(request.url).host,expires);
 return equal(bytes(match[2]),bytes(expected));
}
function h(){
 return {"Cache-Control":"no-store, private","X-Content-Type-Options":"nosniff",
  "X-Frame-Options":"DENY","Referrer-Policy":"no-referrer",
  "X-Robots-Tag":"noindex, nofollow",
  "Content-Security-Policy":"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"};
}
function htmlPage(error=false,configurationError=false){
 const title=configurationError?"管理者の設定が必要です":error?"ログインできませんでした":"所見メーカー STUDIO";
 const note=configurationError?"管理者によるログイン設定が完了していません。":error?"パスワードを確認してください。":"自分専用のワークスペースです。";
 const form=configurationError?"":'<form method="post" action="/_studio/login"><label for="pass">専用パスワード</label><input id="pass" name="password" type="password" required minlength="16" maxlength="200" autocomplete="current-password"><button type="submit">STUDIOを開く</button></form>';
 const style=':root{color-scheme:light}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:20px;background:#f5f7f2;color:#2f493b;font-family:system-ui,-apple-system,sans-serif}main{width:min(420px,100%);background:white;border:1px solid #d9e7dc;border-radius:20px;padding:28px;box-shadow:0 16px 32px #1a362516}h1{font-size:23px}p{font-size:13px;line-height:1.8}label{display:block;margin-top:20px;margin-bottom:7px;font-size:13px;font-weight:700}input{display:block;width:100%;font-size:16px;padding:13px;border:1px solid #c6d7ca;border-radius:10px}button{width:100%;margin-top:14px;padding:12px;background:#315e49;border:0;border-radius:10px;color:#fff;font-weight:700}.logo{font-size:11px;letter-spacing:.13em;color:#6d927d}';
 return new Response('<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+'</title><style>'+style+'</style></head><body><main><div class="logo">TEACHER OS / PRIVATE WORKSPACE</div><h1>'+title+'</h1><p>'+note+'</p>'+form+'</main></body></html>',{status:configurationError?503:error?401:200,headers:{"Content-Type":"text/html; charset=utf-8",...h()}});
}
function redirect(to,setCookie){
 const headers=new Headers({Location:to,...h()});
 if(setCookie)headers.set("Set-Cookie",setCookie);
 return new Response(null,{status:303,headers});
}
const reject=(status,message)=>new Response(message,{status,headers:h()});
function sameOrigin(request){
 return request.headers.get("Origin")===new URL(request.url).origin;
}
export default{
 async fetch(request,env){
  const url=new URL(request.url);
  // Never reveal an accidentally uploaded configuration file.
  if(/^\/(?:_worker\.js|\.env(?:\..*)?|\.dev\.vars|wrangler\.(?:toml|jsonc?))$/i.test(url.pathname))return reject(404,"Not found");
  if(typeof env.SHOKEN_PASSWORD!=="string"||env.SHOKEN_PASSWORD.length<16||
     typeof env.SHOKEN_SESSION_SECRET!=="string"||env.SHOKEN_SESSION_SECRET.length<32)return htmlPage(false,true);
  if(url.pathname==="/_studio/login"){
   if(request.method==="GET")return await signedIn(request,env.SHOKEN_SESSION_SECRET)?redirect("/"):htmlPage();
   if(request.method!=="POST")return reject(405,"Method not allowed");
   if(!sameOrigin(request))return reject(403,"Forbidden");
   if(!(request.headers.get("Content-Type")||"").toLowerCase().startsWith("application/x-www-form-urlencoded"))return reject(415,"Invalid content type");
   if(Number(request.headers.get("Content-Length")||0)>1024)return reject(413,"Too large");
   const body=await request.text();
   if(body.length>1024)return reject(413,"Too large");
   const params=new URLSearchParams(body),passwords=params.getAll("password");
   const password=passwords.length===1?passwords[0]:"";
   if(password.length<16||password.length>200||!(await passwordOK(password,env.SHOKEN_PASSWORD)))return htmlPage(true);
   const expires=Math.floor(Date.now()/1000)+MAX_AGE;
   const mac=await signature(env.SHOKEN_SESSION_SECRET,url.host,expires);
   return redirect("/",COOKIE+"="+expires+"."+mac+"; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age="+MAX_AGE);
  }
  if(url.pathname==="/_studio/logout"){
   if(request.method!=="POST")return reject(405,"Method not allowed");
   if(!sameOrigin(request))return reject(403,"Forbidden");
   return redirect("/_studio/login",COOKIE+"=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0");
  }
  if(url.pathname.startsWith("/_studio/"))return reject(404,"Not found");
  if(!(await signedIn(request,env.SHOKEN_SESSION_SECRET))){
   const accept=request.headers.get("Accept")||"";
   return request.method==="GET"&&accept.includes("text/html")?redirect("/_studio/login"):reject(401,"Authentication required");
  }
  if(!["GET","HEAD"].includes(request.method))return reject(405,"Method not allowed");
  const asset=await env.ASSETS.fetch(request);
  const headers=new Headers(asset.headers);
  headers.set("Cache-Control","private, no-store");
  headers.set("X-Robots-Tag","noindex, nofollow");
  headers.set("X-Content-Type-Options","nosniff");
  headers.set("Referrer-Policy","no-referrer");
  return new Response(asset.body,{status:asset.status,statusText:asset.statusText,headers});
 }
};