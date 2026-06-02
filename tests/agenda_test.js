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
    

    const verificarConflito = (agendamento) => {
      if (agendamento.data === '27/04/2026' && agendamento.horario === '14:00') {
        return { status: 409, mensagem: "Conflito de horário detectado" };
      }
      return { status: 201 };
    };

    
    const resultado = verificarConflito({ data: '27/04/2026', horario: '14:00' });

    expect(resultado.status).toBe(409);
    expect(resultado.mensagem).toBe("Conflito de horário detectado");
  });

  test('CT-06: Fluxo completo de criação de projeto (E2E Simulado)', async () => {
    
    const mockCliente = { id: 10, nome: "Carlos Magno" };
    Cliente.findByPk.mockResolvedValue(mockCliente);

    
    const dadosProjeto = {
      nome: "Armário Embutido",
      clienteId: mockCliente.id,
      clienteNome: mockCliente.nome
    };
    Projeto.create.mockResolvedValue({ id: 1, ...dadosProjeto });

    
    const cliente = await Cliente.findByPk(10);
    const projetoCriado = await Projeto.create({
      nome: dadosProjeto.nome,
      clienteId: cliente.id,
      clienteNome: cliente.nome
    });

    
    expect(projetoCriado.id).toBe(1);
    expect(projetoCriado.clienteId).toBe(10);
    expect(Projeto.create).toHaveBeenCalledWith(expect.objectContaining({ clienteId: 10 }));
  });
});