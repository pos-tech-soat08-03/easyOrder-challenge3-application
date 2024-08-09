import axios from "axios";
import { exit } from "process";

const BASE_URL = "http://localhost:3000";

describe("Teste Fim-a-fim: Pedido a Produção", () => {
  let produtoLancheId: string;
  let produtoSobremesaId: string;
  let produtoBebidaId: string;
  let produtoAcompanhamentoId: string;
  let clienteId: string;
  let pedidoId: string;
  let comboId: string;
  let cpfAleatorio: string;

  test("(/health) Healthcheck do Serviço", async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/health`,
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("status");
      expect(response.data.status).toEqual("UP");

    } catch (error: any) {
      console.error("Teste interrompido. Falha no healthcheck: " + error.message);
      exit(1);
    }
  });


  test("(/produto/cadastrar) Cadastra Lanches para serem utilizados nos Combos", async () => {
    let response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
      nome: "Hamburger de Frango",
      descricao: "Hamburger de frango com alface, tomate e maionese",
      preco: 10.32,
      categoria: "LANCHE",
      imagemURL: "https://fakeimage.jpg",
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("produto");
    expect(response.data.produto).toHaveProperty("id");

    response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
      nome: "Hamburger de Carne",
      descricao: "Hamburger de carne com alface, tomate e maionese",
      preco: 12.32,
      categoria: "LANCHE",
      imagemURL: "https://fakeimage.jpg",
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("produto");
    expect(response.data.produto).toHaveProperty("id");

    produtoLancheId = response.data.produto.id;
  });

  test("(/produto/cadastrar) Cadastra Sobremesas para serem utilizados nos Combos", async () => {
    let response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
      nome: "Pudim",
      descricao: "Pudim de leite condensado",
      preco: 5.32,
      categoria: "SOBREMESA",
      imagemURL: "https://fakeimage.jpg",
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("produto");
    expect(response.data.produto).toHaveProperty("id");

    response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
      nome: "Sorvete",
      descricao: "Sorvete de creme",
      preco: 3.32,
      categoria: "SOBREMESA",
      imagemURL: "https://fakeimage.jpg",
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("produto");
    expect(response.data.produto).toHaveProperty("id");

    produtoSobremesaId = response.data.produto.id;
  });

  test("(/produto/cadastrar) Cadastra Bebidas para serem utilizados nos Combos", async () => {
    let response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
      nome: "Refrigerante",
      descricao: "Refrigerante de cola",
      preco: 4.32,
      categoria: "BEBIDA",
      imagemURL: "https://fakeimage.jpg",
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("produto");
    expect(response.data.produto).toHaveProperty("id");

    response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
      nome: "Suco",
      descricao: "Suco de laranja",
      preco: 3.32,
      categoria: "BEBIDA",
      imagemURL: "https://fakeimage.jpg",
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("produto");
    expect(response.data.produto).toHaveProperty("id");

    produtoBebidaId = response.data.produto.id;
  });

  test("(/produto/cadastrar) Cadastra Acompanhamentos para serem utilizados nos Combos", async () => {
    let response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
      nome: "Batata Frita",
      descricao: "Batata frita com sal",
      preco: 6.32,
      categoria: "ACOMPANHAMENTO",
      imagemURL: "https://fakeimage.jpg",
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("produto");
    expect(response.data.produto).toHaveProperty("id");

    response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
      nome: "Onion Rings",
      descricao: "Anéis de cebola empanados",
      preco: 7.32,
      categoria: "ACOMPANHAMENTO",
      imagemURL: "https://fakeimage.jpg",
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("produto");
    expect(response.data.produto).toHaveProperty("id");

    produtoAcompanhamentoId = response.data.produto.id;
  });

  test("(/cliente/cadastrar) Cria um Novo Cliente com CPF aleatório", async () => {
    cpfAleatorio = "";
    const tamanho = 11;
    const caracteres = "0123456789";

    for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      cpfAleatorio += caracteres[indiceAleatorio];
    }

    try {
      const response = await axios.post(`${BASE_URL}/cliente/cadastrar`, {
        cpf: `${cpfAleatorio}`,
        nome: "João da Silva",
        email: "teste@teste.com",
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("cliente");
      expect(response.data.cliente).toHaveProperty("id");

      clienteId = response.data.cliente.id;
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao criar cliente");
    }
  });

  test("(/cliente/atualizar) Atualiza Cliente: remove dados de identificação", async () => {

    try {
      const response = await axios.put(`${BASE_URL}/cliente/atualizar`, {
        cpf: `${cpfAleatorio}`,
        nome: "",
        email: "",
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("cliente");
      expect(response.data.cliente).toHaveProperty("id");

    } catch (error: any) {
      expect(error.message).toEqual("Falha ao atualizar cliente");
    }
  });


  test("(/cliente/buscar/{cpf}) Busca Cliente por CPF", async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/cliente/buscar/${cpfAleatorio}`,
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("cliente");
      expect(response.data.cliente).toHaveProperty("id");

      clienteId = response.data.cliente.id;
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao buscar cliente");
    }
  });

  test("(/pedido) Cria a etapa inicial do Pedido, cliente identificado", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/pedido`, {
        clienteId: clienteId,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("pedido");
      expect(response.data.pedido).toHaveProperty("id");

      pedidoId = response.data.pedido.id;
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao criar pedido");
    }
  });


  test("(/pedido) Alternativa: Cria a etapa inicial do Pedido, cliente não identificado", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/pedido`, {
        clienteId: "null",
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("pedido");
      expect(response.data.pedido).toHaveProperty("id");

    } catch (error: any) {
      expect(error.message).toEqual("Falha ao criar pedido");
    }
  });

  test("(/pedido/{pedidoId} Busca pedido do Cliente identificado", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pedido/${pedidoId}`);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("pedido");
      expect(response.data.pedido).toHaveProperty("id");
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao buscar pedido");
    }
  });

  test("(/combo/adicionar) Adiciona combo ao Pedido", async () => {
    try {
      let response = await axios.post(
        `${BASE_URL}/pedido/${pedidoId}/combo`,
        {
          lancheId: produtoLancheId,
          bebidaId: produtoBebidaId,
          sobremesaId: produtoSobremesaId,
          acompanhamentoId: produtoAcompanhamentoId,
        },
      ).catch((error: any) => {
        throw new Error(JSON.stringify(error.response.data) || error.message);
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("pedido");
      expect(response.data.pedido).toHaveProperty("id");
      expect(response.data).toHaveProperty("mensagem");
      expect(response.data.mensagem).toEqual("Combo adicionado com sucesso");

      comboId = response.data.pedido.combos[0].id;

      response = await axios.post(
        `${BASE_URL}/pedido/${pedidoId}/combo`,
        {
          lancheId: produtoLancheId,
          bebidaId: produtoBebidaId,
          sobremesaId: produtoSobremesaId,
          acompanhamentoId: produtoAcompanhamentoId,
        },
      ).catch((error: any) => {
        throw new Error(JSON.stringify(error.response.data) || error.message);
      });
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao adicionar produto ao pedido: " + error.text);
    }
  });

  test("(/pedido/{pedidoId}/combo/{comboId}) Remove combo do pedido", async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/pedido/${pedidoId}/combo/${comboId}`,
      );

      expect(response.status).toBe(200);
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao remover combo do pedido");
    }
  });

  test("(/pedido/{pedidoId}/fechar) Fecha pedido: encaminha para Checkout", async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/pedido/${pedidoId}/fechar`
      ).catch((error: any) => {
        throw new Error(JSON.stringify(error.response.data) || error.message);
      });;

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("pedido");
      expect(response.data.pedido).toHaveProperty("id");
      expect(response.data).toHaveProperty("mensagem");
      expect(response.data.mensagem).toEqual("Pedido fechado com sucesso");

      pedidoId = response.data.pedido.id;
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao fechar pedido: " + error.text);
    }
  });

  test("(/pedido/{pedidoId}/checkout) Checkout pedido: encaminha para Fila de Preparação", async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/pedido/${pedidoId}/checkout`,
      ).catch((error: any) => {
        throw new Error(JSON.stringify(error.response.data) || error.message);
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("mensagem");
      expect(response.data.mensagem).toEqual("Pedido fechado com sucesso");
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao realizar checkout do pedido " + error.text);
    }
  });

  test("(/preparacao/pedido/proximo) Busca próximo Pedido na fila de preparação", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/preparacao/pedido/proximo`);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("pedido");
      expect(response.data.pedido).toHaveProperty("id");
    } catch (error: any) {
      expect(error.message).toEqual(
        "Falha ao buscar próximo pedido na fila de preparação",
      );
    }
  });

  test("(/preparacao/pedido/{pedidoId}/iniciar-preparacao) Inicia preparação do pedido", async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/preparacao/pedido/${pedidoId}/iniciar-preparacao`,
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("pedido");
      expect(response.data.pedido).toHaveProperty("id");
      expect(response.data).toHaveProperty("mensagem");
      expect(response.data.mensagem).toEqual(
        "Preparação do pedido iniciada com sucesso",
      );
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao iniciar preparação do pedido");
    }
  });

  test("(/preparacao/pedido/{pedidoId}/finalizar-preparacao) Finaliza preparação do Pedido", async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/preparacao/pedido/${pedidoId}/finalizar-preparacao`,
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("pedido");
      expect(response.data.pedido).toHaveProperty("id");
      expect(response.data).toHaveProperty("mensagem");
      expect(response.data.mensagem).toEqual(
        "Preparação do pedido finalizada com sucesso",
      );
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao finalizar preparação do pedido");
    }
  });

  test("(/preparacao/pedido/{pedidoId}/entregar) Entrega e Finaliza Pedido", async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/preparacao/pedido/${pedidoId}/entregar`,
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("pedido");
      expect(response.data.pedido).toHaveProperty("id");
      expect(response.data).toHaveProperty("mensagem");
      expect(response.data.mensagem).toEqual("Pedido entregue com sucesso");
    } catch (error: any) {
      expect(error.message).toEqual("Falha ao entregar pedido");
    }
  });
});
