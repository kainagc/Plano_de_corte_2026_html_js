document.addEventListener('DOMContentLoaded', async () => {
    const listContainer = document.getElementById('estoquelist');

    async function carregarEstoque() {
        try {
            const response = await fetch('/api/produtos');
            const produtos = await response.json();

            if (produtos.length === 0) {
                listContainer.innerHTML = '<h1 style="color: white; opacity: 0.5; margin-top: 50px;">Estoque vazio</h1>';
                return;
            }

            listContainer.innerHTML = produtos.map(prod => `
                <div class="produto-card" onclick="window.location.href='/App/Estoque/Editar?id=${prod.id}'">
                    <div class="produto-info">
                        <h2>${prod.nome}</h2>
                        <p>${prod.descricao || 'Nenhuma descrição informada'}</p>
                    </div>
                    <div class="produto-quant">
                        Qtd: ${prod.quantidade}
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