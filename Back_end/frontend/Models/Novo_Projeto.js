document.addEventListener('DOMContentLoaded', async () => {
    const etapaInput = document.getElementById('etapaInput');
    const clienteInput = document.getElementById('clienteInput');
    const clienteIdInput = document.getElementById('clienteIdInput');
    const clienteDatalist = document.getElementById('clientesDatalist');
    const botproj = document.getElementById('botproj');
    const nomeInput = document.getElementById('nomeInput');
    const ambienteInput = document.getElementById('ambienteInput');

    etapaInput.value = 'Planejamento';

    const response = await fetch('/api/clientes');
    if (!response.ok) {
        alert('Erro ao carregar clientes. Cadastre um cliente primeiro.');
        return;
    }

    const clientes = await response.json();

    if (clientes.length === 0) {
        alert('Nenhum cliente cadastrado. Cadastre um cliente primeiro.');
        return;
    }

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.nome;
        option.dataset.id = cliente.id;
        clienteDatalist.appendChild(option);
    });

    clienteInput.addEventListener('input', () => {
        const selecionado = clientes.find(cliente => cliente.nome === clienteInput.value.trim());
        if (selecionado) {
            clienteIdInput.value = selecionado.id;
        } else {
            clienteIdInput.value = '';
        }
    });

    botproj.addEventListener('click', async () => {
        const nome = nomeInput.value.trim();
        const ambiente = ambienteInput.value.trim();
        const clienteNome = clienteInput.value.trim();
        const clienteId = clienteIdInput.value;
        const etapa = etapaInput.value;
        const dataCriacao = new Date().toLocaleDateString('pt-BR');

        if (!nome) {
            alert('Digite o nome do projeto.');
            return;
        }
        if (!ambiente) {
            alert('Digite o ambiente do projeto.');
            return;
        }
        if (!clienteNome || !clienteId) {
            alert('Selecione um cliente válido.');
            return;
        }

        const response = await fetch('/api/projetos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, ambiente, clienteId, clienteNome, etapa, dataCriacao })
        });

        if (response.ok) {
            window.location.href = '/App/Projetos';
        } else {
            const erro = await response.json();
            alert(erro.erro || 'Erro ao criar projeto.');
        }
    });
});
