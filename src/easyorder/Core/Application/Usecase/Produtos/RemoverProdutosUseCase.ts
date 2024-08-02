import { ProdutoRepositoryInterface } from "../../../Domain/Output/Repository/ProdutoRepositoryInterface";
import { RemoverProdutoUsecaseInput, RemoverProdutoUsecaseOutput } from "../../../Domain/Output/Repository/RemoverProdutoRepositoryInterface";


export class RemoverProdutoUsecase {
    private produtoRepository: ProdutoRepositoryInterface;

    constructor(produtoRepository: ProdutoRepositoryInterface) {
        this.produtoRepository = produtoRepository;
    }

    public async execute(input: RemoverProdutoUsecaseInput): Promise<RemoverProdutoUsecaseOutput> {
        try {
            const produtoExistente = this.produtoRepository.buscarProdutoPorId(input.id);

            if (!produtoExistente) {
                return { sucesso: false, mensagem: 'O produto nao foi encontrado.' };
            }

            this.produtoRepository.removerPorId(input.id);

            return { sucesso: true };
        } catch (error) {
            // Tratar erros e retornar uma mensagem apropriada
            return { sucesso: false, mensagem: 'Ocorreu um erro ao remover o produto.' };
        }
    }
}