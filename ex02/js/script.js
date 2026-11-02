const formulario = document.querySelector('#formulario-tarefa');
const campoTarefa = document.querySelector('#texto-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const estadoVazio = document.querySelector('#estado-vazio');
const contador = document.querySelector('#contador');
const erro = document.querySelector('#erro');

function atualizarResumo() {
    const tarefas = [...listaTarefas.querySelectorAll('.tarefa')];
    const porConcluir = tarefas.filter((tarefa) => !tarefa.classList.contains('concluida')).length;

    contador.textContent = `${porConcluir} ${porConcluir === 1 ? 'tarefa por concluir' : 'tarefas por concluir'}`;
    estadoVazio.hidden = tarefas.length > 0;
}

function criarBotao(texto, acao, classeExtra = '') {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = texto;
    botao.dataset.acao = acao;
    botao.className = `botao-acao ${classeExtra}`.trim();
    return botao;
}

function adicionarTarefa(texto) {
    const item = document.createElement('li');
    item.className = 'tarefa';

    const descricao = document.createElement('span');
    descricao.className = 'texto-tarefa';
    descricao.textContent = texto;

    item.append(descricao, criarBotao('Concluir', 'concluir'), criarBotao('Eliminar', 'eliminar', 'botao-eliminar'));
    listaTarefas.append(item);
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const texto = campoTarefa.value.trim();

    if (texto === '') {
        erro.textContent = 'Escreve uma descrição antes de adicionares a tarefa.';
        campoTarefa.focus();
        return;
    }

    adicionarTarefa(texto);
    campoTarefa.value = '';
    erro.textContent = '';
    atualizarResumo();
    campoTarefa.focus();
});

listaTarefas.addEventListener('click', (evento) => {
    const botao = evento.target.closest('button[data-acao]');

    if (!botao) {
        return;
    }

    const tarefa = botao.closest('.tarefa');

    if (botao.dataset.acao === 'concluir') {
        const concluida = tarefa.classList.toggle('concluida');
        botao.textContent = concluida ? 'Reabrir' : 'Concluir';
    }

    if (botao.dataset.acao === 'eliminar') {
        tarefa.remove();
    }

    atualizarResumo();
});

atualizarResumo();
