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

  // Botão que abre o menu
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'menu-toggle';
  btn.setAttribute('aria-controls', nav.id);
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span aria-hidden="true">☰</span> Menu';
  nav.parentNode.insertBefore(btn, nav);

  // Botão "×" dentro do painel
  var fechar = document.createElement('button');
  fechar.type = 'button';
  fechar.className = 'menu-fechar';
  fechar.setAttribute('aria-label', 'Fechar menu');
  fechar.innerHTML = '&times;';
  nav.insertBefore(fechar, nav.firstChild);

  function alternar(aberto) {
    nav.classList.toggle('aberto', aberto);
    btn.setAttribute('aria-expanded', aberto);
    (aberto ? fechar : btn).focus();
  }

  btn.addEventListener('click', function () { alternar(true); });
  fechar.addEventListener('click', function () { alternar(false); });

  // Esc também fecha
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('aberto')) alternar(false);
  });
})();
