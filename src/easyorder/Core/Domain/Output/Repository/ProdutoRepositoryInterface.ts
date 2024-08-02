import { ProdutoEntity } from "../../Entity/ProdutoEntity";

export interface ProdutoRepositoryInterface {
    listarProduto (): ProdutoEntity[];
    listarProdutoCategoria(categoria: CategoriaEnum): ProdutoEntity[];
    salvarProduto (produto: ProdutoEntity): void;
    buscarProdutoPorId (id: string): ProdutoEntity;
    removerPorId (id: string): void;

}
