
let linhas = [];

function inserir() {
    // Captura dos valores
    let cor_mat = document.getElementById("campcor").value;
    let esp_mat = document.getElementById("campesp").value;
    let compri = document.getElementById("campcomp").value;
    let larg = document.getElementById("camplarg").value;
    let quant = document.getElementById("campquant").value;
    let desc = document.getElementById("campdesc").value;

    // Validação
    if (!compri || !larg || !quant || !esp_mat) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    // Criando o objeto com nomes que batem com a renderização abaixo
    let novalinha = {
        comp: compri,
        larg: larg,
        material: cor_mat,
        esp: esp_mat,
        quant: quant,
        desc: desc
    };

    // ADICIONANDO À ARRAY (O que faltava)
    linhas.push(novalinha);

    // Limpando os campos após inserir
    document.getElementById("campcomp").innerText = "";
    document.getElementById("camplarg").innerText = "";
    document.getElementById("campquant").innerText = "";
    document.getElementById("campdesc").innerText = "";

    // Chama a função para desenhar na tela
    renderizar_linhas();
}

function renderizar_linhas() {
    let visor = document.getElementById("visor");
    
    // Limpa o visor para não duplicar itens antigos
    visor.innerHTML = "";

    // Corrigido: parênteses no (item, index) e nome da variável linhas
    linhas.forEach((item, index) => {
        let linhadiv = document.createElement("div");
        linhadiv.className = "linha";

        linhadiv.innerHTML = `
            <div class="linha-item">
                <div class="coluna">
                    <label>Comp</label>
                    <div class="teste">${item.comp}</div>
                </div>
                <div class="coluna">
                    <label>Larg</label>
                    <div class="teste">${item.larg}</div>
                </div>
                <div class="coluna">
                    <label>Material</label>
                    <div class="teste">${item.material}</div>
                </div>
                <div class="coluna">
                    <label>Esp</label>
                    <div class="teste">${item.esp}</div>
                </div>
                <div class="coluna">
                    <label>Qtd</label>
                    <div class="teste">${item.quant}</div>
                </div>
                <div class="coluna">
                    <label>Desc</label>
                    <div class="teste">${item.desc}</div>
                </div>
            </div>
            <hr />
        `;
        visor.appendChild(linhadiv);
    });
}