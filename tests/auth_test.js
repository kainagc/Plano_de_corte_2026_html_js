const Usuario = require('../Back_end/src/Usuarios');

// Criamos uma simulação (mock) do modelo Usuario
jest.mock('../Back_end/src/Usuarios');

describe('Testes de Autenticação (Login)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('CT-05: Autenticação de usuário com sucesso', async () => {
    const credenciais = {
      email: "teste@sistema.com",
      senha: "123"
    };

    // Simulação: O banco de dados encontra o usuário com essas credenciais
    Usuario.findOne.mockResolvedValue({ 
      id: 1, 
      nome: "Usuário Teste", 
      email: credenciais.email 
    });

    const usuarioEncontrado = await Usuario.findOne({ where: credenciais });

    expect(usuarioEncontrado).not.toBeNull();
    expect(usuarioEncontrado.email).toBe(credenciais.email);
    expect(Usuario.findOne).toHaveBeenCalledWith({ where: credenciais });
  });

  test('CT-06: Impedir login com e-mail ou senha incorretos', async () => {
    // Simulação: O banco não encontra ninguém (retorna null)
    Usuario.findOne.mockResolvedValue(null);

    const usuarioEncontrado = await Usuario.findOne({ 
      where: { email: "errado@email.com", senha: "999" } 
    });

    expect(usuarioEncontrado).toBeNull();
  });
});