import { promises } from "dns";
import { ProdutoEntity } from "../../Entity/ProdutoEntity";
import { CategoriaEnum } from "../../ValueObject/CategoriaEnum";

export interface ProdutoRepositoryInterface {
    listarProduto (): Promise<ProdutoEntity[]>;
    listarProdutoCategoria(categoria: CategoriaEnum): Promise<ProdutoEntity[]>;
    salvarProduto (produto: ProdutoEntity):Promise <void> ;
    buscarProdutoPorId (id: string): Promise<ProdutoEntity| undefined> ;
    removerPorId (id: string): Promise<void>;

}
