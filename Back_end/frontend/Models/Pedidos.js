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
            alert("Selecione um produto válido e uma quantidade.");
            return;
        }

        if (qtdBaixa > prod.quantidade) {
            alert("Quantidade maior que o estoque disponível!");
            return;
        }

        try {
            const response = await fetch('/api/produtos/baixa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: prod.id, quantidade: qtdBaixa })
            });

            if (response.ok) {
                alert("Baixa realizada com sucesso!");
                window.location.href = '/App/Estoque';
            } else {
                const resData = await response.json();
                alert("Erro: " + resData.erro);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
});