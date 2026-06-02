document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/clientes');
    const clientesList = document.getElementById('clientesList');

    if (!response.ok) {
        clientesList.textContent = 'Erro ao carregar clientes.';
        return;
    }

    const clientes = await response.json();
    if (clientes.length === 0) {
        clientesList.textContent = 'Nenhum cliente cadastrado';
        return;
    }

    clientes.forEach(cliente => {
        const card = document.createElement('div');
        card.className = 'cliente-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div class="cliente-header">
                <strong>${cliente.nome}</strong>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `/App/Clientes/Editar?id=${cliente.id}`;
        });

        clientesList.appendChild(card);
    });
});