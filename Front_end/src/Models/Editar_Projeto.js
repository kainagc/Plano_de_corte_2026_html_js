document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        alert('ID do projeto não fornecido.');
        window.location.href = '/App/Projetos';
        return;
    }

    const nomeInput = document.getElementById('nomeInput');
    const etapaInput = document.getElementById('etapaInput');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnExcluir = document.getElementById('btnExcluir');

    // Carregar dados atuais do projeto
    try {
        const res = await fetch(`/api/projetos/${id}`);
        if (res.ok) {
            const projeto = await res.json();
            nomeInput.value = projeto.nome;
            etapaInput.value = projeto.etapa;
        } else {
            alert('Projeto não encontrado.');
            window.location.href = '/App/Projetos';
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }

    // Salvar Alterações (Nome e Etapa)
    btnSalvar.addEventListener('click', async () => {
        const response = await fetch(`/api/projetos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: nomeInput.value, etapa: etapaInput.id === 'etapaInput' ? etapaInput.value : etapaInput.innerText })
        });

        if (response.ok) {
            alert('Projeto atualizado com sucesso!');
            window.location.href = '/App/Projetos';
        } else {
            alert('Erro ao atualizar projeto.');
        }
    });

    // Excluir Projeto
    btnExcluir.addEventListener('click', async () => {
        if (!confirm('Deseja realmente excluir este projeto?')) return;

        const response = await fetch(`/api/projetos/${id}`, { method: 'DELETE' });
        const data = await response.json();

        if (response.ok) {
            window.location.href = '/App/Projetos';
        } else {
            alert(data.erro || 'Erro ao excluir.');
        }
    });
});