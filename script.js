(function () {
  var box = document.getElementById('status');
  if (!box) return;
 
  var now = new Date();
  var day = now.getDay();
  var minutes = now.getHours() * 60 + now.getMinutes();
  var open = false;
 
  if (day >= 1 && day <= 5) open = minutes >= 540 && minutes < 1080;
  else if (day === 6) open = minutes >= 540 && minutes < 810;
 
  box.classList.toggle('open', open);
  document.getElementById('status-text').textContent = open ? 'Aberto agora' : 'Fechado agora';
})();
/* Botão de menu para celular */
(function () {
  var nav = document.querySelector('nav[aria-label="Seções do site"]');
  if (!nav) return;

  nav.id = nav.id || 'menu-principal';

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'menu-toggle';
  btn.setAttribute('aria-controls', nav.id);
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span aria-hidden="true">☰</span> Menu';

  nav.parentNode.insertBefore(btn, nav);

  btn.addEventListener('click', function () {
    var aberto = nav.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto);
    btn.innerHTML = aberto
      ? '<span aria-hidden="true">✕</span> Fechar'
      : '<span aria-hidden="true">☰</span> Menu';
  });
})();
