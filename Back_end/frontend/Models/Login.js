async function fazerLogin() {
    let email = document.getElementById("emaillocamp").value;
    let senha = document.getElementById("senhalocamp").value;
    let btnLogin = document.querySelector("button");
    let divincoreta = document.getElementById("credencias_incoretas_login");

    try {
        if(divincoreta) divincoreta.innerText = "";
        if(btnLogin) {
            btnLogin.innerText = "Autenticando...";
            btnLogin.disabled = true;
            btnLogin.style.opacity = "0.8";
        }

        const resposta = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        if (resposta.ok) {
            window.location.href = '/App'; 
        } else {
            if(btnLogin) {
                btnLogin.innerText = "Entrar";
                btnLogin.disabled = false;
                btnLogin.style.opacity = "1";
            }
            if(divincoreta) divincoreta.innerText = "E-mail ou senha incorretos.";
        }
    } catch (erro) {
        if(btnLogin) btnLogin.disabled = false;
        if(divincoreta) divincoreta.innerText = "Erro de conexão com o servidor.";
    }
}