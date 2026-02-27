async function fazerLogin() {
    let email = document.getElementById("emaillocamp").innerText;
    let senha = document.getElementById("senhalocamp").innerText;

    try {
        const resposta = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            window.location.href = '/App'; 
        } else {
    
            let divincoreta = document.getElementById("credencias_incoretas_login")
            divincoreta.innerText=("E-mail ou senha incorretos.")
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro ao conectar com o servidor.");
    }
}