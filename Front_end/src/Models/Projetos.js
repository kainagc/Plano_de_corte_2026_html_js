document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/projetos');
    // Busca por ambos os IDs possíveis para evitar erro caso o HTML mude
    const projetosList = document.getElementById('projetosList') || document.getElementById('projlist');

    if (!projetosList) {
        console.error('Erro: Elemento de lista de projetos (id="projetosList") não encontrado no HTML.');
        return;
    }

    if (!response.ok) {
        projetosList.textContent = 'Erro ao carregar projetos.';
        return;
    }

    const projetos = await response.json();

    if (projetos.length === 0) {
        projetosList.textContent = 'Nenhum projeto cadastrado';
        return;
    }

    projetos.forEach(projeto => {
        const card = document.createElement('div');
        card.className = 'projeto-card';
        card.style.cursor = 'pointer'; // Indica que é clicável
        card.innerHTML = `
            <div class="projeto-header">
                <strong>${projeto.nome}</strong>
            </div>
            <div class="projeto-info">
                <p><strong>Ambiente:</strong> ${projeto.ambiente || '-'}</p>
                <p><strong>Cliente:</strong> ${projeto.clienteNome || '-'}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            // Redireciona para a página de edição passando o ID via URL
            window.location.href = `/App/Projetos/Editar?id=${projeto.id}`;
        });

        projetosList.appendChild(card);
    });
});
