async function enviar_dados_cad() {
    let nome = document.getElementById("nomecasdascamp").value;
    let email = document.getElementById("emailcadascamp").value;
    let senha = document.getElementById("senhacadascamp").value;
    let comfirsenha = document.getElementById("comfsenhacadascamp").value;

    let divincoreta = document.getElementById("credencias_incoretas_cads");

    if (senha !== comfirsenha) {
        divincoreta.innerText = "As senhas não conferem";
        return;
    }

    try {
        const resposta = await fetch('/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        if (resposta.ok) {
            window.location.href = '/Login'; 
        } else {
            divincoreta.innerText = "Erro ao cadastrar usuário.";
        }
    } catch (erro) {
        divincoreta.innerText = "Erro no servidor.";
    }
}