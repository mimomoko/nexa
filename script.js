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

/* ===== Rodapé (substitui o rodapé de todas as páginas) ===== */
(()=>{
const f=document.querySelector('footer');if(!f)return;
const ic=(p)=>'<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';
const soc=[
 ['https://instagram.com/nexa','Instagram @nexa',ic('<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>')],
 ['https://wa.me/5511974686516','WhatsApp',ic('<path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.4L3 21z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-.8-.4-1.600-1.200-2-2l.8-1-1-2L9 9.500z"/>')],
 ['mailto:contato@nexa.com','E-mail',ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>')]
];
const lk=[['index','Sobre nós'],['projetos','Projetos'],['parcerias','Parcerias'],['certificados','Certificados'],['horario','Horários'],['orcamento','Faça um orçamento']];
const pt=[['microsoft','Microsoft'],['oracle','Oracle'],['google','Google'],['senac','Senac']];
f.className='ft2';
f.innerHTML='<div class="w">'+
'<div class="ft-top"><a class="ft-logo" href="index.html" aria-label="NEXA, página inicial">nexa</a>'+
'<div class="ft-info"><p>NEXA · <a href="mailto:contato@nexa.com">contato@nexa.com</a> · <a href="tel:+5511974686516">+55 11 97468-6516</a> · © '+new Date().getFullYear()+' NEXA</p>'+
'<nav aria-label="Links do rodapé">'+lk.map(l=>'<a href="'+l[0]+'.html">'+l[1]+'</a>').join('')+'</nav></div></div>'+
'<div class="ft-mid"><div class="ft-soc">'+soc.map(s=>'<a href="'+s[0]+'" aria-label="'+s[1]+'"'+(s[0].indexOf('http')===0?' target="_blank" rel="noopener"':'')+'>'+s[2]+'</a>').join('')+'</div>'+
'<ul class="ft-pt" aria-label="Parceiros">'+pt.map(p=>'<li><img src="logos/'+p[0]+'.png" alt="'+p[1]+'" loading="lazy"></li>').join('')+'</ul></div></div>'+
'<div class="ft-bt"><div class="w"><span>NEXA — soluções digitais acessíveis.</span><span>Tecnologia • Funcionalidade • Inovação • Experiência</span></div></div>';
})();
