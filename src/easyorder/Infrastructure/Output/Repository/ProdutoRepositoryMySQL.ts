
import { ProdutoEntity } from "../../../Core/Domain/Entity/ProdutoEntity";
import { ProdutoRepositoryInterface } from "../../../Core/Domain/Output/Repository/ProdutoRepositoryInterface";
import { CategoriaEnum } from "../../../Core/Domain/ValueObject/CategoriaEnum";
import { Sequelize, Model, DataTypes } from 'sequelize';

class LocalModel extends Model{
    public id!: string;
    public nome!: string;
    public descricao!: string;
    public preco!: number;
    public categoria!: string;
    public imagemURL!: string;

}


export class ProdutoRepositoryMySQL implements ProdutoRepositoryInterface {

    private sequelize: Sequelize;


    constructor(
        private hostname: string,
        private portnumb: number,
        private database: string,
        private username: string,
        private password: string,
    ) {
        this.sequelize = new Sequelize(this.database, this.username, this.password, {
            host: this.hostname,
            port: this.portnumb,
            dialect: 'mysql',
        });
        LocalModel.init({

            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            nome: {
                type: DataTypes.STRING,
            },
            descricao: {
                type: DataTypes.STRING,
            },
            preco: {
                type: DataTypes.DECIMAL,
            },
            categoria: {
                type: DataTypes.STRING,
            },
            imagemURL: {
                type: DataTypes.STRING,
            },
        }, {
            sequelize: this.sequelize,
            modelName: 'Produto',
            tableName: 'produtos',
            timestamps: false,
        });
        this.sequelize.sync();


    }


    public async listarProduto():Promise< ProdutoEntity[]> {
        return new Array<ProdutoEntity>();
    }
    public async listarProdutoCategoria(categoria: CategoriaEnum):Promise<ProdutoEntity[]> {
       
        return  new Array<ProdutoEntity>();
    }
    public  async  buscarProdutoPorId(id: string): Promise<ProdutoEntity> {
        return new ProdutoEntity(
            '1',
            'Nome Produto Mock',
            10.00,
            CategoriaEnum.BEBIDA,
            'Descrição Produto Mock',
            'https://example.com/imagem.jpg'
        );
    }
    public    async   removerPorId(id: string): Promise<void> {
       console.log("Removido{}",id);
    }


    public  async  salvarProduto(cliente: ProdutoEntity): Promise<void> {

        const dto ={
            id: cliente.getId(),
            nome: cliente.getNome(),
            descricao: cliente.getDescricao(),
            preco: cliente.getPreco(),
            categoria: cliente.getCategoria(),
            imagemURL: cliente.getImagemURL(),
        }

        await LocalModel.upsert(dto);

        return;
    }

}