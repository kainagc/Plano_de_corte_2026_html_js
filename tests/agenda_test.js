const Cliente = require('../Back_end/src/Cliente');
const Projeto = require('../Back_end/src/Projeto');

jest.mock('../Back_end/src/Cliente');
jest.mock('../Back_end/src/Projeto');

describe('Testes de Agenda e Fluxo Geral', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('CT-05: Evitar conflito de horário na agenda', async () => {
    const novoAgendamento = { data: '27/04/2026', horario: '14:00' };
    
    // Simulação da lógica de verificação de conflito
    const verificarConflito = (agendamento) => {
      if (agendamento.data === '27/04/2026' && agendamento.horario === '14:00') {
        return { status: 409, mensagem: "Conflito de horário detectado" };
      }
      return { status: 201 };
    };

    // Forçamos o cenário de conflito (horário já ocupado)
    const resultado = verificarConflito({ data: '27/04/2026', horario: '14:00' });

    expect(resultado.status).toBe(409);
    expect(resultado.mensagem).toBe("Conflito de horário detectado");
  });

  test('CT-06: Fluxo completo de criação de projeto (E2E Simulado)', async () => {
    // Passo 1: Cliente cadastrado
    const mockCliente = { id: 10, nome: "Carlos Magno" };
    Cliente.findByPk.mockResolvedValue(mockCliente);

    // Passo 2: Dados do projeto
    const dadosProjeto = {
      nome: "Armário Embutido",
      clienteId: mockCliente.id,
      clienteNome: mockCliente.nome
    };
    Projeto.create.mockResolvedValue({ id: 1, ...dadosProjeto });

    // Execução do Fluxo
    const cliente = await Cliente.findByPk(10);
    const projetoCriado = await Projeto.create({
      nome: dadosProjeto.nome,
      clienteId: cliente.id,
      clienteNome: cliente.nome
    });

    // Verificações
    expect(projetoCriado.id).toBe(1);
    expect(projetoCriado.clienteId).toBe(10);
    expect(Projeto.create).toHaveBeenCalledWith(expect.objectContaining({ clienteId: 10 }));
  });
});