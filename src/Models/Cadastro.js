async function enviar_dados_cad() {
    let nome = document.getElementById("nomecasdascamp").innerText;
    let email = document.getElementById("emailcadascamp").innerText;
    let senha = document.getElementById("senhacadascamp").innerText;
    let comfirsenha = document.getElementById("comfsenhacadascamp").innerText;

    // Corrigido: Agora o nome da variável bate com o que foi pego da div
    if (senha !== comfirsenha) {


        let divincoreta = document.getElementById("credencias_incoretas_cads")
            divincoreta.innerText=("As senhas não conferem")
        return;
    }

    const resposta = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
    });

    if (resposta.ok) {
        window.location.href = '/Login'; 
    } else {
         let divincoreta = document.getElementById("credencias_incoretas_cads")
            divincoreta.innerText=("E-mail ou senha incorretos.")
    }
}