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
        card.innerHTML = `
            <div class="cliente-header">
                <strong>${cliente.nome}</strong>
                <span class="cliente-view"></span>
            </div>
            <div class="cliente-details">
                <p><strong>CPF:</strong> ${cliente.cpf || '-'}</p>
                <p><strong>Endereço:</strong> ${cliente.endereco || '-'}</p>
                <p><strong>Telefone:</strong> ${cliente.telefone || '-'}</p>
                <p><strong>Data:</strong> ${cliente.data || '-'}</p>
            </div>
        `;

        const header = card.querySelector('.cliente-header');
        const details = card.querySelector('.cliente-details');
        const viewText = header.querySelector('.cliente-view');
        details.style.display = 'none';
        viewText.textContent = 'Ver detalhes';
        header.style.cursor = 'pointer';

        header.addEventListener('click', () => {
            const currentlyOpen = clientesList.querySelectorAll('.cliente-details');
            currentlyOpen.forEach(section => {
                if (section !== details) {
                    section.style.display = 'none';
                    const otherHeader = section.closest('.cliente-card').querySelector('.cliente-view');
                    if (otherHeader) otherHeader.textContent = 'Ver detalhes';
                }
            });

            const isHidden = details.style.display === 'none';
            details.style.display = isHidden ? 'block' : 'none';
            viewText.textContent = isHidden ? 'Ocultar detalhes' : 'Ver detalhes';
        });

        clientesList.appendChild(card);
    });
});