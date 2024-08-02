import express from "express";
import { ProdutoRepositoryInterface } from "../../../../Core/Domain/Output/Repository/ProdutoRepositoryInterface";
import { CadastrarProdutoUsecase } from "../../../../Core/Application/Usecase/Produtos/CadastrarProdutoUsecase";


export class CadastrarProdutoEndpoint {

    repository: ProdutoRepositoryInterface;

    constructor(repository: ProdutoRepositoryInterface) {
        this.repository = repository;
    }

    public async handle(req: express.Request, res: express.Response): Promise<void> {

        const usecase = new CadastrarProdutoUsecase(this.repository);

        if (req.body === undefined || Object.keys(req.body).length === 0) {
            res.status(400).json({
                resultado_cadastro: false,
                mensagem: 'Nenhum dado enviado.',
                cliente: null
            });
            return;
        }

        // refatorar adicionando a logica de validação dos dados do request
        const {  nome, descricao, preco, categoria, imagemURL } = req.body;
        const result = await usecase.execute(nome, descricao, preco, categoria, imagemURL);

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