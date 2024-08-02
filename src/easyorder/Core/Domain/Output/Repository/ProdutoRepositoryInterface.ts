import { ProdutoEntity } from "../../Entity/ProdutoEntity";
import { CategoriaEnum } from "../../ValueObject/CategoriaEnum";

export interface ProdutoRepositoryInterface {
    listarProduto (): ProdutoEntity[];
    listarProdutoCategoria(categoria: CategoriaEnum): ProdutoEntity[];
    salvarProduto (produto: ProdutoEntity): void;
    buscarProdutoPorId (id: string): ProdutoEntity;
    removerPorId (id: string): void;

}
