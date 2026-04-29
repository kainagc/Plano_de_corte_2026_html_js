document.addEventListener('DOMContentLoaded', async () => {
    const projlist = document.getElementById('projlist');
    const response = await fetch('/api/projetos');

    if (!response.ok) {
        projlist.textContent = 'Erro ao carregar projetos.';
        return;
    }

    const projetos = await response.json();

    if (projetos.length === 0) {
        projlist.textContent = 'Nenhum projeto cadastrado';
        return;
    }

    projetos.forEach(projeto => {
        const card = document.createElement('div');
        card.className = 'projeto-card';
        card.innerHTML = `
            <div class="projeto-header">
                <strong>${projeto.nome}</strong>
                <span>${projeto.ambiente || ''}</span>
            </div>
            <div class="projeto-details">
                <p><strong>Cliente:</strong> ${projeto.clienteNome}</p>
                <p><strong>Etapa:</strong> ${projeto.etapa}</p>
                <p><strong>Data:</strong> ${projeto.dataCriacao || '-'}</p>
            </div>
        `;
        projlist.appendChild(card);
    });
});
