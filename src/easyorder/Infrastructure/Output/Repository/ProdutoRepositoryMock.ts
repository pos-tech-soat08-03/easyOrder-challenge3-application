import { ProdutoEntity } from "../../../Core/Domain/Entity/ProdutoEntity";
import { ProdutoRepositoryInterface } from "../../../Core/Domain/Output/Repository/ProdutoRepositoryInterface";
import { CpfValueObject } from "../../../Core/Domain/ValueObject/CpfValueObject";
import { EmailValueObject } from "../../../Core/Domain/ValueObject/EmailValueObject";


export class ProdutoRepositoryMock implements ProdutoRepositoryInterface {

    constructor() {
        // inicializar um array com dados mockados 
    }
    listarProduto(): ProdutoEntity[] {
        return new Array<ProdutoEntity>();
    }
    listarProdutoCategoria(categoria: CategoriaEnum): ProdutoEntity[] {
       
        return  new Array<ProdutoEntity>();
    }
    buscarProdutoPorId(id: number): ProdutoEntity {
        return new ProdutoEntity(
            '1',
            'Nome Produto Mock',
            10.00,
            CategoriaEnum.BEBIDA,
            'Descrição Produto Mock',
            'https://example.com/imagem.jpg'
        );
    }
    removerPorId(id: number): void {
       
    }


    public salvarProduto(cliente: ProdutoEntity): void {
        // implementar a lógica de salvar um novo cliente
        return;
    }

}