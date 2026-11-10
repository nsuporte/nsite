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

document.querySelector('.contact-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const feedback = document.querySelector('.form-feedback');
  const submitButton = form.querySelector('button[type="submit"]');
  const payload = Object.fromEntries(data.entries());
  payload._subject = `Pedido de assistência — ${payload.equipamento}`;
  payload._replyto = payload.email || '';
  payload._template = 'table';

  submitButton.disabled = true;
  feedback.textContent = 'A enviar o seu pedido…';

  try {
    const response = await fetch('https://formsubmit.co/ajax/info@nsuporte.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok || result.success !== 'true') {
      throw new Error(result.message || 'Não foi possível enviar o pedido.');
    }

    form.reset();
    feedback.textContent = 'Pedido enviado. Obrigado por contactar a NSuporte.';
  } catch (error) {
    feedback.textContent = 'Não foi possível enviar agora. Tente novamente ou escreva para info@nsuporte.com.';
  } finally {
    submitButton.disabled = false;
  }
});
