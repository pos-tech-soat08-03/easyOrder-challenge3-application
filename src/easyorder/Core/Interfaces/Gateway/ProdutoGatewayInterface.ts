import { ProdutoEntity } from "../../Entity/ProdutoEntity";
import { CategoriaEnum } from "../../Entity/ValueObject/CategoriaEnum";

export interface ProdutoGatewayInterface {
    listarProdutos (): Promise<ProdutoEntity[] | undefined>;
    listarProdutoCategoria(categoria: CategoriaEnum): Promise<ProdutoEntity[]| undefined>;
    salvarProduto (produto: ProdutoEntity):Promise <void> ;
    buscarProdutoPorId (id: string): Promise<ProdutoEntity| undefined> ;
    removerPorId (id: string): Promise<void>;

}
