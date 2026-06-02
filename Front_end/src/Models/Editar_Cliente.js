document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        window.location.href = '/App/Clientes';
        return;
    }

    const inputs = {
        nome: document.getElementById('nomeInput'),
        cpf: document.getElementById('cpfInput'),
        endereco: document.getElementById('enderecoInput'),
        telefone: document.getElementById('telefoneInput'),
        data: document.getElementById('dataInput')
    };

    try {
        const res = await fetch(`/api/clientes/${id}`);
        if (res.ok) {
            const cliente = await res.json();
            Object.keys(inputs).forEach(key => inputs[key].value = cliente[key] || '');
        } else {
            alert('Cliente não encontrado.');
            window.location.href = '/App/Clientes';
        }
    } catch (error) {
        console.error('Erro:', error);
    }

    document.getElementById('btnSalvar').addEventListener('click', async () => {
        const body = {};
        Object.keys(inputs).forEach(key => body[key] = inputs[key].value);

        const response = await fetch(`/api/clientes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert('Cliente atualizado com sucesso!');
            window.location.href = '/App/Clientes';
        } else {
            const err = await response.json();
            alert(err.erro || 'Erro ao atualizar.');
        }
    });

    document.getElementById('btnExcluir').addEventListener('click', async () => {
        if (!confirm('Deseja realmente excluir este cliente?')) return;

        const response = await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
        const data = await response.json();

        if (response.ok) {
            alert(data.mensagem);
            window.location.href = '/App/Clientes';
        } else {
            // Aqui ele mostrará a trava de segurança caso existam projetos vinculados
            alert(data.erro || 'Erro ao excluir.');
        }
    });
});