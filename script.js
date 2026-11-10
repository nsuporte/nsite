const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Pedido de assistência — ${data.get('equipamento')}`);
  const body = encodeURIComponent(
    `Nome: ${data.get('nome')}\nTelefone: ${data.get('telefone')}\nEmail: ${data.get('email') || 'Não indicado'}\nEquipamento: ${data.get('equipamento')}\n\nDescrição:\n${data.get('mensagem')}`
  );
  document.querySelector('.form-feedback').textContent = 'O seu pedido está pronto. Escolha o seu aplicativo de email para o enviar.';
  window.location.href = `mailto:info@nsuporte.com?subject=${subject}&body=${body}`;
});
