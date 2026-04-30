document.addEventListener('DOMContentLoaded', () => {
    const dataInput = document.getElementById('dataInput');
    const hoje = new Date();
    dataInput.value = hoje.toLocaleDateString('pt-BR');

    const botcli = document.getElementById('botcli');
    botcli.addEventListener('click', async () => {
        const nome = document.getElementById('nomeInput').value.trim();
        const cpf = document.getElementById('cpfInput').value.trim();
        const endereco = document.getElementById('enderecoInput').value.trim();
        const telefone = document.getElementById('telefoneInput').value.trim();
        const data = document.getElementById('dataInput').value;

        if (!nome) {
            alert('Digite o nome do cliente');
            return;
        }

        const response = await fetch('/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, cpf, endereco, telefone, data })
        });

        if (response.ok) {
            window.location.href = '/App/Clientes';
        } else {
            const erro = await response.json();
            alert(erro.erro || 'Erro ao cadastrar cliente.');
        }
    });
});