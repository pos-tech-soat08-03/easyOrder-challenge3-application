import { ProdutoEntity } from '../../../Core/Domain/Entity/ProdutoEntity';
import { ProdutoRepositoryInterface } from '../../../Core/Domain/Output/Repository/ProdutoRepositoryInterface';
import { CategoriaEnum } from '../../../Core/Domain/ValueObject/CategoriaEnum';


export class RemoverProdutoRepositoryMock implements ProdutoRepositoryInterface {
    buscarProdutoPorId(id: string): ProdutoEntity {
        throw new Error('Method not implemented.');
    }
    private produtos: Map<string, ProdutoEntity> = new Map();

    public listarProduto(): ProdutoEntity[] {
        return Array.from(this.produtos.values());
    }

    public listarProdutoCategoria(categoria: CategoriaEnum): ProdutoEntity[] {
        return Array.from(this.produtos.values()).filter(produto => produto.getCategoria() === categoria);
    }

    public salvarProduto(produto: ProdutoEntity): void {
        this.produtos.set(produto.getId(), produto);
    }

    public removerPorId(id: string): void {
        this.produtos.delete(id);
    }

    public limpar(): void {
        this.produtos.clear();
    }
}
