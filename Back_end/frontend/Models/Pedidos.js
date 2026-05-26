document.addEventListener('DOMContentLoaded', async () => {
    const produtoInput = document.getElementById('produtoInput');
    const datalist = document.getElementById('produtosDatalist');
    const botBaixa = document.getElementById('botbaixa');
    const infoEstoque = document.getElementById('infoEstoque');
    
    let produtosMap = {}; // Para guardar ID e quantidade atual

    // 1. Carregar produtos para o datalist
    try {
        const response = await fetch('/api/produtos');
        const produtos = await response.json();
        
        produtos.forEach(p => {
            const option = document.createElement('option');
            option.value = p.nome;
            datalist.appendChild(option);
            produtosMap[p.nome] = { id: p.id, quantidade: p.quantidade };
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }

    // 2. Mostrar estoque atual quando selecionar produto
    produtoInput.addEventListener('change', () => {
        const prod = produtosMap[produtoInput.value];
        if (prod) {
            infoEstoque.innerText = `Estoque disponível: ${prod.quantidade}`;
        } else {
            infoEstoque.innerText = "";
        }
    });

    // 3. Lógica de envio da baixa
    botBaixa.addEventListener('click', async () => {
        const nomeProd = produtoInput.value;
        const qtdBaixa = parseInt(document.getElementById('quantBaixaInput').value);
        const prod = produtosMap[nomeProd];

        if (!prod || !qtdBaixa || qtdBaixa <= 0) {
            infoEstoque.style.color = "#ef4444";
            infoEstoque.style.fontWeight = "600";
            infoEstoque.innerText = "⚠ Selecione um produto e quantidade válidos.";
            return;
        }

        if (qtdBaixa > prod.quantidade) {
            infoEstoque.style.color = "#ef4444";
            infoEstoque.style.fontWeight = "600";
            infoEstoque.innerText = "❌ Quantidade maior que o estoque disponível.";
            return;
        }

        try {
            botBaixa.innerText = "Processando...";
            botBaixa.disabled = true;
            botBaixa.style.backgroundColor = "#475569"; // Slate escuro para melhor contraste com texto branco

            const response = await fetch('/api/produtos/baixa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: prod.id, quantidade: qtdBaixa })
            });

            if (response.ok) {
                botBaixa.style.backgroundColor = "#10b981";
                botBaixa.innerText = "Sucesso!";
                setTimeout(() => {
                    window.location.href = '/App/Estoque';
                }, 1000);
            } else {
                botBaixa.disabled = false;
                botBaixa.style.backgroundColor = "#4f46e5";
                botBaixa.innerText = "Tentar Novamente";
                const resData = await response.json();
                infoEstoque.style.color = "#ef4444";
                infoEstoque.innerText = `Erro: ${resData.erro}`;
            }
        } catch (error) {
            botBaixa.disabled = false;
            botBaixa.style.backgroundColor = "#4f46e5";
            botBaixa.innerText = "Erro na Conexão";
        }
    });
});