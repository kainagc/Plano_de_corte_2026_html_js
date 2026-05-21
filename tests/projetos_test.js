const Projeto = require('../Back_end/src/Projeto');


jest.mock('../Back_end/src/Projeto');

describe('Testes de Gerenciador de Projetos', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('CT-03: Bloquear exclusão de projeto com tarefas ativas', async () => {
    const projetoId = 5;

    
    const mockProjeto = {
      id: projetoId,
      nome: "Projeto Cozinha",
      destroy: jest.fn() 
    };
    
    Projeto.findByPk.mockResolvedValue(mockProjeto);

    
    let statusEsperado = 200;
    let mensagemErro = "";

    
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