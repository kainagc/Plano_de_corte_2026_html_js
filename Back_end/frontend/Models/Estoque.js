document.addEventListener('DOMContentLoaded', async () => {
    const listContainer = document.getElementById('estoquelist');

    async function carregarEstoque() {
        try {
            const response = await fetch('/api/produtos');
            const produtos = await response.json();

            if (produtos.length === 0) {
                listContainer.innerHTML = '<h1 style="color: #64748b; opacity: 0.5; margin-top: 50px; text-align: center; font-size: 20px;">📦 Estoque vazio</h1>';
                return;
            }

            listContainer.innerHTML = produtos.map(prod => `
                <div class="produto-card" onclick="window.location.href='/App/Estoque/Editar?id=${prod.id}'">
                    <div class="produto-header">
                        <strong>${prod.nome}</strong>
                        <span class="produto-meta">${prod.quantidade} UNID</span>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            listContainer.innerHTML = '<h1 style="color: red;">Erro ao carregar dados do servidor</h1>';
        }
    }

    carregarEstoque();
});