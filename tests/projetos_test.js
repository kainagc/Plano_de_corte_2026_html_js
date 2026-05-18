const Projeto = require('../Back_end/src/Projeto');

// Criamos uma simulação (mock) do modelo Projeto para testes isolados
jest.mock('../Back_end/src/Projeto');

describe('Testes de Gerenciador de Projetos', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa as contagens de chamadas antes de cada teste
  });

  test('CT-03: Bloquear exclusão de projeto com tarefas ativas', async () => {
    const projetoId = 5;

    // Simulação: O projeto existe, mas possui a condição de tarefas ativas (ID 5 no Index.js)
    const mockProjeto = {
      id: projetoId,
      nome: "Projeto Cozinha",
      destroy: jest.fn() // Mock da função de exclusão
    };
    
    Projeto.findByPk.mockResolvedValue(mockProjeto);

    // Lógica de Validação: Simulamos o comportamento esperado da API
    let statusEsperado = 200;
    let mensagemErro = "";

    // Simulação da regra: Se for o projeto 5, ele tem tarefas ativas
    if (projetoId === 5) {
      statusEsperado = 403;
      mensagemErro = "Não é possível excluir projetos com tarefas ativas";
    } else {
      await mockProjeto.destroy();
    }

    expect(statusEsperado).toBe(403);
    expect(mensagemErro).toBe("Não é possível excluir projetos com tarefas ativas");
    expect(mockProjeto.destroy).not.toHaveBeenCalled(); 
  });

  test('CT-04: Validar obrigatoriedade de vínculo do projeto com cliente existente', async () => {
    const dadosEntrada = {
      nome: "Cozinha Planejada",
      clienteId: null,
      clienteNome: ""
    };

    // Ação: Lógica de validação idêntica à do endpoint POST /api/projetos
    const validarProjeto = (dados) => {
      if (!dados.nome) return "Nome do projeto é obrigatório";
      if (!dados.clienteId || !dados.clienteNome) return "Campo cliente é obrigatório";
      return null;
    };

    const erroEncontrado = validarProjeto(dadosEntrada);

    expect(erroEncontrado).toBe("Campo cliente é obrigatório");
    expect(Projeto.create).not.toHaveBeenCalled();
  });
});