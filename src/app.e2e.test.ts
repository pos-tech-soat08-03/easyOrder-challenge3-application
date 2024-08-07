
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

describe('E2E Test for Order Process', () => {
    let produtoLancheId: string;
    let produtoSobremesaId: string;
    let produtoBebidaId: string;
    let produtoAcompanhamentoId: string;
    let clienteId: string;
    let pedidoId: string;
    let comboId: string;

    test('Cria produtos Lanches', async () => {
        let response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
            "nome": "Hamburger de Frango",
            "descricao": "Hamburger de frango com alface, tomate e maionese",
            "preco": 10.32,
            "categoria": "LANCHE",
            "imagemURL": "https://fakeimage.jpg"
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('produto');
        expect(response.data.produto).toHaveProperty('id');

        response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
            "nome": "Hamburger de Carne",
            "descricao": "Hamburger de carne com alface, tomate e maionese",
            "preco": 12.32,
            "categoria": "LANCHE",
            "imagemURL": "https://fakeimage.jpg"
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('produto');
        expect(response.data.produto).toHaveProperty('id');

        produtoLancheId = response.data.produto.id;
    });

    test('Cria produtos Sobremesa', async () => {
        let response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
            "nome": "Pudim",
            "descricao": "Pudim de leite condensado",
            "preco": 5.32,
            "categoria": "SOBREMESA",
            "imagemURL": "https://fakeimage.jpg"
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('produto');
        expect(response.data.produto).toHaveProperty('id');

        response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
            "nome": "Sorvete",
            "descricao": "Sorvete de creme",
            "preco": 3.32,
            "categoria": "SOBREMESA",
            "imagemURL": "https://fakeimage.jpg"
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('produto');
        expect(response.data.produto).toHaveProperty('id');

        produtoSobremesaId = response.data.produto.id;
    });

    test('Cria produtos Bebida', async () => {
        let response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
            "nome": "Refrigerante",
            "descricao": "Refrigerante de cola",
            "preco": 4.32,
            "categoria": "BEBIDA",
            "imagemURL": "https://fakeimage.jpg"
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('produto');
        expect(response.data.produto).toHaveProperty('id');

        response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
            "nome": "Suco",
            "descricao": "Suco de laranja",
            "preco": 3.32,
            "categoria": "BEBIDA",
            "imagemURL": "https://fakeimage.jpg"
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('produto');
        expect(response.data.produto).toHaveProperty('id');

        produtoBebidaId = response.data.produto.id;
    });

    test('Cria produtos Acompanhamento', async () => {
        let response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
            "nome": "Batata Frita",
            "descricao": "Batata frita com sal",
            "preco": 6.32,
            "categoria": "ACOMPANHAMENTO",
            "imagemURL": "https://fakeimage.jpg"
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('produto');
        expect(response.data.produto).toHaveProperty('id');

        response = await axios.post(`${BASE_URL}/produto/cadastrar`, {
            "nome": "Onion Rings",
            "descricao": "Anéis de cebola empanados",
            "preco": 7.32,
            "categoria": "ACOMPANHAMENTO",
            "imagemURL": "https://fakeimage.jpg"
        });
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('produto');
        expect(response.data.produto).toHaveProperty('id');

        produtoAcompanhamentoId = response.data.produto.id;
    });

    test('Busca um cliente por CPF', async () => {
        try {
            const response = await axios.get(`${BASE_URL}/cliente/buscar/33333333333`);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('cliente');
            expect(response.data.cliente).toHaveProperty('id');

            clienteId = response.data.cliente.id;
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao buscar cliente');
        }
    });

    test('Cria um cliente', async () => {
        if (clienteId) {
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/cliente/cadastrar`, {
                "cpf": "33333333333",
                "nome": "João da Silva",
                "email": "teste@teste.com"
            });

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('cliente');
            expect(response.data.cliente).toHaveProperty('id');

            clienteId = response.data.cliente.id;
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao criar cliente');
        }
    });

    test('Cria um pedido', async () => {
        try {
            const response = await axios.post(`${BASE_URL}/pedido`, {
                "clienteId": clienteId,
            });

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('pedido');
            expect(response.data.pedido).toHaveProperty('id');

            pedidoId = response.data.pedido.id;
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao criar pedido');
        }
    });

    test('Busca pedido por ID', async () => {
        try {
            const response = await axios.get(`${BASE_URL}/pedido/${pedidoId}`);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('pedido');
            expect(response.data.pedido).toHaveProperty('id');
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao buscar pedido');
        }
    });

    test('Adiciona combo ao pedido', async () => {
        try {
            let response = await axios.post(`${BASE_URL}/pedido/${pedidoId}/combo/adicionar`, {
                "lancheId": produtoLancheId,
                "bebidaId": produtoBebidaId,
                "sobremesaId": produtoSobremesaId,
                "acompanhamentoId": produtoAcompanhamentoId,
            });

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('pedido');
            expect(response.data.pedido).toHaveProperty('id');
            expect(response.data).toHaveProperty('mensagem');
            expect(response.data.mensagem).toEqual('Combo adicionado com sucesso');

            comboId = response.data.pedido.combo[0].id;

            response = await axios.post(`${BASE_URL}/pedido/${pedidoId}/combo/adicionar`, {
                "lancheId": produtoLancheId,
                "bebidaId": produtoBebidaId,
                "sobremesaId": produtoSobremesaId,
                "acompanhamentoId": produtoAcompanhamentoId,
            });

        } catch (error: any) {
            expect(error.message).toEqual('Falha ao adicionar produto ao pedido');
        }
    });

    test('Remove combo do pedido', async () => {
        try {
            const response = await axios.delete(`${BASE_URL}/pedido/${pedidoId}/combo/${comboId}`);

            expect(response.status).toBe(200);
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao remover combo do pedido');
        }
    });

    test('Fecha pedido', async () => {
        try {
            const response = await axios.put(`${BASE_URL}/pedido/${pedidoId}/fechar`);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('pedido');
            expect(response.data.pedido).toHaveProperty('id');
            expect(response.data).toHaveProperty('mensagem');
            expect(response.data.mensagem).toEqual('Pedido fechado com sucesso');

            pedidoId = response.data.pedido.id;
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao fechar pedido');
        }
    });

    test('Checkout pedido', async () => {
        try {
            const response = await axios.put(`${BASE_URL}/pedido/${pedidoId}/checkout`);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('mensagem');
            expect(response.data.mensagem).toEqual('Pedido fechado com sucesso');
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao realizar checkout do pedido');
        }
    });

    test('Busca próximo pedido na fila de preparação', async () => {
        try {
            const response = await axios.get(`${BASE_URL}/preparacao/pedido/proximo`);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('pedido');
            expect(response.data.pedido).toHaveProperty('id');
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao buscar próximo pedido na fila de preparação');
        }
    });

    test('Inicia preparação do pedido', async () => {
        try {
            const response = await axios.put(`${BASE_URL}/preparacao/pedido/${pedidoId}/iniciar-preparacao`);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('pedido');
            expect(response.data.pedido).toHaveProperty('id');
            expect(response.data).toHaveProperty('mensagem');
            expect(response.data.mensagem).toEqual('Preparação do pedido iniciada com sucesso');
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao iniciar preparação do pedido');
        }
    });

    test('Finaliza preparação do pedido', async () => {
        try {
            const response = await axios.put(`${BASE_URL}/preparacao/pedido/${pedidoId}/finalizar-preparacao`);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('pedido');
            expect(response.data.pedido).toHaveProperty('id');
            expect(response.data).toHaveProperty('mensagem');
            expect(response.data.mensagem).toEqual('Preparação do pedido finalizada com sucesso');
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao finalizar preparação do pedido');
        }
    });

    test('Entrega pedido', async () => {
        try {
            const response = await axios.put(`${BASE_URL}/preparacao/pedido/${pedidoId}/entregar`);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('pedido');
            expect(response.data.pedido).toHaveProperty('id');
            expect(response.data).toHaveProperty('mensagem');
            expect(response.data.mensagem).toEqual('Pedido entregue com sucesso');
        } catch (error: any) {
            expect(error.message).toEqual('Falha ao entregar pedido');
        }
    });

}); 
