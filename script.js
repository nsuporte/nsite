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
  const feedback = document.querySelector('.form-feedback');
  const mensagem = [
    'Olá, gostaria de pedir assistência técnica.',
    '',
    `Nome: ${data.get('nome')}`,
    `Telefone: ${data.get('telefone')}`,
    `Email: ${data.get('email') || 'Não indicado'}`,
    `Equipamento: ${data.get('equipamento')}`,
    '',
    'Descrição da avaria:',
    data.get('mensagem')
  ].join('\n');

  feedback.textContent = 'A abrir o WhatsApp com o seu pedido preenchido. Confirme e envie a mensagem.';
  window.open(`https://wa.me/258828848766?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener,noreferrer');
});
