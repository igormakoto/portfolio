
const menu = document.querySelector('#menu');

document.querySelectorAll('.site-navbar .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        if (menu.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
});


const EMAIL = 'makotoigor10@gmail.com'; 

const form = document.querySelector('.contato-form');
const formStatus = document.querySelector('.form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Enviando...';
    formStatus.textContent = '';
    formStatus.className = 'form-status mt-3 mb-0';

    try {
        const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: form.nome.value,
                email: form.email.value,
                message: form.mensagem.value,
                _subject: 'Nova mensagem do portfólio'
            })
        });

        if (!response.ok) throw new Error('Falha no envio');

        formStatus.textContent = 'Mensagem enviada com sucesso!';
        formStatus.classList.add('success');
        form.reset();
    } catch (error) {
        formStatus.textContent = 'Não foi possível enviar. Tente novamente.';
        formStatus.classList.add('error');
    } finally {
        button.disabled = false;
        button.textContent = 'Enviar mensagem';
    }
});