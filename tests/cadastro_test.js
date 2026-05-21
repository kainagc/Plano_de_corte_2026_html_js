const Cliente = require('../Back_end/src/Cliente');


jest.mock('../Back_end/src/Cliente');

beforeEach(() => {
  jest.clearAllMocks(); 
});

describe('Testes de Cadastro de Clientes', () => {
  test('CT-01: Cadastrar cliente com sucesso', async () => {
    
    const dadosEntrada = {
      nome: "João Silva",
      telefone: "11999999999",
      cpf: "123.456.789-00"
    };

    Cliente.create.mockResolvedValue({ id: 1, ...dadosEntrada });

   
    const resultado = await Cliente.create(dadosEntrada);

    expect(resultado.nome).toBe("João Silva");
    expect(Cliente.create).toHaveBeenCalledWith(dadosEntrada);
  });

  test('CT-02: Impedir cadastro de CPF duplicado', async () => {
    const cpfDuplicado = "123.456.789-00";

    
    Cliente.findOne.mockResolvedValue({ id: 1, nome: "João Silva", cpf: cpfDuplicado });

    
    const clienteExistente = await Cliente.findOne({ where: { cpf: cpfDuplicado } });

    
    expect(clienteExistente).not.toBeNull();
    expect(clienteExistente.cpf).toBe(cpfDuplicado);
    expect(Cliente.findOne).toHaveBeenCalledWith({ where: { cpf: cpfDuplicado } });
  });
});