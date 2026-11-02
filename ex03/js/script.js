const perguntas = [
    {
        texto: 'Que método permite selecionar o primeiro elemento que corresponde a um seletor CSS?',
        opcoes: ['getElementByClass()', 'querySelector()', 'selectFirst()', 'findElement()'],
        correta: 1
    },
    {
        texto: 'Qual propriedade altera o texto visível de um elemento de forma segura?',
        opcoes: ['innerStyle', 'textContent', 'nodeValue()', 'classList'],
        correta: 1
    },
    {
        texto: 'Que evento é normalmente usado para reagir a um clique num botão?',
        opcoes: ['change', 'submit', 'click', 'load'],
        correta: 2
    }
];

const numeroPergunta = document.querySelector('#numero-pergunta');
const progresso = document.querySelector('#progresso');
const questao = document.querySelector('#questao');
const opcoes = document.querySelector('#opcoes');
const mensagem = document.querySelector('#mensagem');
const botaoAvancar = document.querySelector('#avancar');
const botaoReiniciar = document.querySelector('#reiniciar');

let indiceAtual = 0;
let respostaSelecionada = null;
let pontuacao = 0;

function apresentarPergunta() {
    const perguntaAtual = perguntas[indiceAtual];

    numeroPergunta.textContent = indiceAtual + 1;
    progresso.textContent = `${indiceAtual + 1} de ${perguntas.length}`;
    questao.textContent = perguntaAtual.texto;
    mensagem.textContent = '';
    respostaSelecionada = null;
    botaoAvancar.disabled = true;
    botaoAvancar.textContent = indiceAtual === perguntas.length - 1 ? 'Terminar quiz' : 'Confirmar resposta';
    opcoes.replaceChildren();

    perguntaAtual.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'opcao';
        botao.textContent = opcao;
        botao.setAttribute('aria-pressed', 'false');

        botao.addEventListener('click', () => selecionarResposta(indice, botao));
        opcoes.append(botao);
    });
}

function selecionarResposta(indice, botaoSelecionado) {
    respostaSelecionada = indice;
    botaoAvancar.disabled = false;

    opcoes.querySelectorAll('.opcao').forEach((botao) => {
        const selecionada = botao === botaoSelecionado;
        botao.classList.toggle('selecionada', selecionada);
        botao.setAttribute('aria-pressed', String(selecionada));
    });
}

function mostrarResultado() {
    questao.textContent = `Terminaste o quiz com ${pontuacao} de ${perguntas.length} respostas certas.`;
    progresso.textContent = 'Resultado final';
    opcoes.replaceChildren();
    mensagem.textContent = pontuacao === perguntas.length
        ? 'Excelente! Demonstraste dominar os conceitos apresentados.'
        : 'Bom trabalho. Podes recomeçar o quiz para voltares a praticar.';
    botaoAvancar.hidden = true;
    botaoReiniciar.hidden = false;
}

botaoAvancar.addEventListener('click', () => {
    if (respostaSelecionada === perguntas[indiceAtual].correta) {
        pontuacao += 1;
    }

    indiceAtual += 1;

    if (indiceAtual === perguntas.length) {
        mostrarResultado();
        return;
    }

    apresentarPergunta();
});

botaoReiniciar.addEventListener('click', () => {
    indiceAtual = 0;
    pontuacao = 0;
    botaoReiniciar.hidden = true;
    botaoAvancar.hidden = false;
    apresentarPergunta();
});

apresentarPergunta();
