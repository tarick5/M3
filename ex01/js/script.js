const campoNome = document.querySelector('#nome');
const botaoSaudacao = document.querySelector('#mostrar-saudacao');
const mensagem = document.querySelector('#mensagem');
const botaoTema = document.querySelector('#alternar-tema');
const botaoLimpar = document.querySelector('#limpar');

function mostrarSaudacao() {
    const nome = campoNome.value.trim();

    if (nome === '') {
        mensagem.textContent = 'Escreve o teu nome para receberes uma mensagem personalizada.';
        campoNome.focus();
        return;
    }

    mensagem.textContent = `Olá, ${nome}! O JavaScript acabou de atualizar este texto no DOM.`;
}

botaoSaudacao.addEventListener('click', mostrarSaudacao);

campoNome.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        mostrarSaudacao();
    }
});

botaoTema.addEventListener('click', () => {
    const temaEscuroAtivo = document.body.classList.toggle('modo-noturno');

    botaoTema.textContent = temaEscuroAtivo ? 'Ativar tema claro' : 'Ativar tema escuro';
    botaoTema.setAttribute('aria-pressed', String(temaEscuroAtivo));
});

botaoLimpar.addEventListener('click', () => {
    campoNome.value = '';
    mensagem.textContent = 'A tua mensagem aparecerá aqui.';
    campoNome.focus();
});
