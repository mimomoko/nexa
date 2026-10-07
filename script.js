const R=document.documentElement,tt=document.querySelector('.tt'),b=document.querySelector('.burger'),m=document.querySelector('.menu');
tt.onclick=()=>{const dark=R.dataset.theme?R.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;const n=dark?'light':'dark';R.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}};
const tg=o=>{b.classList.toggle('on',o);m.classList.toggle('on',o);b.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o)};
b.onclick=()=>tg(!b.classList.contains('on'));
m.querySelectorAll('a').forEach(a=>a.onclick=()=>tg(false));
addEventListener('keydown',e=>{if(e.key==='Escape')tg(false)});
addEventListener('scroll',()=>document.body.classList.toggle('sc',scrollY>20),{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
/* horário de funcionamento */
const st=document.getElementById('status-text');
if(st){
  const H={1:[540,1080],2:[540,1080],3:[540,1080],4:[540,1080],5:[540,1080],6:[540,810]};
  const D=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
  const f=n=>Math.floor(n/60)+':'+String(n%60).padStart(2,'0');
  const now=new Date(),d=now.getDay(),t=now.getHours()*60+now.getMinutes(),h=H[d];
  if(h&&t>=h[0]&&t<h[1]){st.textContent='Aberto agora, até as '+f(h[1]);st.parentElement.classList.add('open')}
  else{
    let i=(h&&t<h[0])?0:1;
    while(!H[(d+i)%7])i++;
    const nd=(d+i)%7;
    st.textContent='Fechado no momento. Abre '+(i===0?'hoje':i===1?'amanhã':D[nd])+' às '+f(H[nd][0]);
  }
}
/* orçamento: abre o WhatsApp com a solicitação preenchida */
const fm=document.getElementById('f');
if(fm)fm.onsubmit=e=>{
  e.preventDefault();
  const v=Object.fromEntries(new FormData(fm));
  const t='Olá! Gostaria de solicitar um orçamento.\n\nNome: '+v.nome+'\nEmpresa: '+(v.empresa||'-')+'\nE-mail: '+v.email+'\nWhatsApp: '+v.whats+'\nTipo de projeto: '+v.tipo+'\n\n'+(v.msg||'');
  const u='https://wa.me/5511974686516?text='+encodeURIComponent(t);
  if(!open(u,'_blank'))location.href=u;
  document.getElementById('ok').hidden=false;
  * ===== Astro Acessível: recursos de acessibilidade do site ===== */
(()=>{
const K='astro-acessivel',D={size:100,contrast:false,links:false,font:false,motion:false};
const S={...D};
try{Object.assign(S,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){}
const R=document.documentElement;
const icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="7.5" r="1.2" fill="currentColor"/><path d="M7 10.5l5 1 5-1M12 11.5v3.5M9.5 20l2.5-5 2.5 5"/></svg>';
const opts=[['contrast','Alto contraste'],['links','Sublinhar links'],['font','Fonte simples'],['motion','Reduzir animações']];
const w=document.createElement('div');w.className='ax';
w.innerHTML='<button type="button" class="ax-b" aria-label="Abrir recursos de acessibilidade" aria-expanded="false" aria-controls="ax-p">'+icon+'</button>'+
'<div class="ax-p" id="ax-p" role="dialog" aria-label="Astro Acessível" hidden><p class="ax-h">Astro Acessível</p>'+
'<div class="ax-r"><span>Tamanho do texto</span><div class="ax-s"><button type="button" data-a="menos" aria-label="Diminuir texto">A−</button><output aria-live="polite"></output><button type="button" data-a="mais" aria-label="Aumentar texto">A+</button></div></div>'+
opts.map(o=>'<button type="button" class="ax-t" data-k="'+o[0]+'" aria-pressed="false">'+o[1]+'</button>').join('')+
'<button type="button" class="ax-x" data-a="reset">Restaurar padrão</button></div>';
document.body.appendChild(w);
const btn=w.querySelector('.ax-b'),pn=w.querySelector('.ax-p'),out=w.querySelector('output');
function apply(){
  R.style.fontSize=S.size===100?'':S.size+'%';
  R.classList.toggle('ax-contrast',!!S.contrast);R.classList.toggle('ax-links',!!S.links);
  R.classList.toggle('ax-font',!!S.font);R.classList.toggle('ax-motion',!!S.motion);
  out.textContent=S.size+'%';
  w.querySelector('[data-a=menos]').disabled=S.size<=80;
  w.querySelector('[data-a=mais]').disabled=S.size>=150;
  w.querySelectorAll('[data-k]').forEach(b=>b.setAttribute('aria-pressed',!!S[b.dataset.k]));
  try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}
}
const open=o=>{pn.hidden=!o;btn.setAttribute('aria-expanded',o);if(o)pn.querySelector('button').focus()};
btn.onclick=()=>open(pn.hidden);
pn.onclick=e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.k)S[b.dataset.k]=!S[b.dataset.k];
  else if(b.dataset.a==='mais')S.size=Math.min(150,S.size+10);
  else if(b.dataset.a==='menos')S.size=Math.max(80,S.size-10);
  else if(b.dataset.a==='reset')Object.assign(S,D);
  apply();
};
addEventListener('keydown',e=>{if(e.key==='Escape'&&!pn.hidden){open(false);btn.focus()}});
addEventListener('click',e=>{if(!pn.hidden&&!w.contains(e.target)&&!e.target.closest('[data-astro-open]'))open(false)});
document.querySelectorAll('[data-astro-open]').forEach(a=>a.onclick=()=>open(true));
apply();
})();
 
};
