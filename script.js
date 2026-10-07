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
};
