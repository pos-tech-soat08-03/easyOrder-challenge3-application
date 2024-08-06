import express from "express";
import { ProdutoRepositoryInterface } from "../../../../Core/Domain/Output/Repository/ProdutoRepositoryInterface";
import { AtualizarProdutoUsecase } from "../../../../Core/Application/Usecase/Produtos/AtualizarProdutoUsecase";


export class AtualizarProdutoEndpoint {
    public constructor(
        private repository: ProdutoRepositoryInterface
    ) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: express.Request, res: express.Response): Promise<void> {

        /**
            #swagger.summary = 'Atualizar produto'
            #swagger.description = 'Endpoint para atualizar produto do catalogo'
        */
        const usecase = new AtualizarProdutoUsecase(this.repository);

        if (req.body === undefined || Object.keys(req.body).length === 0) {
            res.status(400).json({
                resultado_cadastro: false,
                mensagem: 'Nenhum dado enviado.',
                produto: null
            });
            return;
        }

        const {  nome, descricao, preco, categoria, imagemURL, id } = req.body;
        const result = await usecase.execute( nome, descricao, preco, categoria, imagemURL, id);

        res.json({
            resultado_cadastro: result.getSucessoCadastro(),
            mensagem: result.getMensagem(),
            produto: result.getSucessoCadastro() ? {
                id: result.getProduto()?.getId(),
                nome: result.getProduto()?.getNome(),
                descricao: result.getProduto()?.getDescricao(),
                preco: result.getProduto()?.getPreco(),
                categoria: result.getProduto()?.getCategoria(),
                imagem_url: result.getProduto()?.getImagemURL()
            } : null
        });

    }

}