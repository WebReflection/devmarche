import{T as t,b as e,r}from"./core-DGaA3hN0.js";import{notify as s}from"./error-BM4jMxA7.js";const o=[],a=new WeakSet,n=t=>{throw s(t),new Error(t)},m=({attributes:{worker:t}})=>!t;let c=!0;for(const s of t.keys()){const t=`script[type="${s}"][terminal],${s}-script[terminal]`;o.push(t),e.set(t,(async t=>{const e=document.querySelectorAll(o.join(","));if([].filter.call(e,m).length>1&&n("You can use at most 1 main terminal"),c&&(c=!1,document.head.append(Object.assign(document.createElement("link"),{rel:"stylesheet",href:r("./xterm.css",import.meta.url)}))),a.has(t))return;a.add(t);const i=e=>e.default(t);"mpy"===s?await import("./mpy-CTF2azbQ.js").then(i):await import("./py-CyhUGZCa.js").then(i)}))}
//# sourceMappingURL=py-terminal-gpnjFmCg.js.map