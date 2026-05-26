async function fazerLogin() {
    let email = document.getElementById("emaillocamp").value;
    let senha = document.getElementById("senhalocamp").value;
    let btnLogin = document.querySelector("button");
    let divincoreta = document.getElementById("credencias_incoretas_login");

    try {
        divincoreta.innerText = "";
        if(btnLogin) {
            btnLogin.innerHTML = `<span class="loader"></span> Autenticando...`;
            btnLogin.style.backgroundColor = "#4f46e5";
            btnLogin.disabled = true;
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
                btnLogin.innerText = "Login";
                btnLogin.disabled = false;
            }
            divincoreta.style.color = "#EF4444";
            divincoreta.style.fontSize = "14px";
            divincoreta.innerText = "E-mail ou senha incorretos.";
        }
    } catch (erro) {
        if(btnLogin) {
            btnLogin.innerText = "Login";
            btnLogin.disabled = false;
        }
        divincoreta.innerText = "Erro de conexão com o servidor.";
    }
}