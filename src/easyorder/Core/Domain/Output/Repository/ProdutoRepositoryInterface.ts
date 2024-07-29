import { ProdutoEntity } from "../../Entity/ProdutoEntity";

export interface ProdutoRepositoryInterface {
    listarProduto (): ProdutoEntity[];
    listarProdutoCategoria(categoria: CategoriaEnum): ProdutoEntity[];
    salvarProduto (produto: ProdutoEntity): void;
    buscarProdutoPorId (id: number): ProdutoEntity;
    removerPorId (id: number): void;

}
