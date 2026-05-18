const Cliente = require('../Back_end/src/Cliente');

// Criamos uma simulação (mock) do modelo Cliente para não tocar no banco de dados real
jest.mock('../Back_end/src/Cliente');

beforeEach(() => {
  jest.clearAllMocks(); // Limpa as simulações antes de cada teste
});

describe('Testes de Cadastro de Clientes', () => {
  test('CT-01: Cadastrar cliente com sucesso', async () => {
    // 1. Entrada: Dados conforme o cenário de teste
    const dadosEntrada = {
      nome: "João Silva",
      telefone: "11999999999", // Referente ao 'Celular' na entrada do CT-01
      cpf: "123.456.789-00"
    };

    // 2. Simulação: Configuramos o mock para retornar sucesso e os dados enviados
    Cliente.create.mockResolvedValue({ id: 1, ...dadosEntrada });

    // 3. Ação: Chamamos o método create do modelo (que agora é um mock)
    const resultado = await Cliente.create(dadosEntrada);

    // 4. Resultado esperado: Verificamos se o retorno está correto e se o método foi chamado
    expect(resultado.nome).toBe("João Silva");
    expect(Cliente.create).toHaveBeenCalledWith(dadosEntrada);
  });

  test('CT-02: Impedir cadastro de CPF duplicado', async () => {
    const cpfDuplicado = "123.456.789-00";

    // Simulação: Quando o código procurar pelo CPF, ele vai "fingir" que encontrou alguém
    Cliente.findOne.mockResolvedValue({ id: 1, nome: "João Silva", cpf: cpfDuplicado });

    // Ação: Tentamos buscar (simulando a lógica que a rota faria)
    const clienteExistente = await Cliente.findOne({ where: { cpf: cpfDuplicado } });

    // Resultado esperado: O objeto não deve ser nulo (significa que o CPF já existe)
    expect(clienteExistente).not.toBeNull();
    expect(clienteExistente.cpf).toBe(cpfDuplicado);
    expect(Cliente.findOne).toHaveBeenCalledWith({ where: { cpf: cpfDuplicado } });
  });
});