
import { PedidoEntity } from "../../../Core/Domain/Entity/PedidoEntity";
import { PedidoRepositoryInterface, PedidoRepositoryInterfaceFilter, PedidoRepositoryInterfaceFilterOrderDirection, PedidoRepositoryInterfaceFilterOrderField } from "../../../Core/Domain/Output/Repository/PedidoRepositoryInterface";
import { StatusPedidoEnum, StatusPedidoValueObject } from '../../../Core/Domain/ValueObject/StatusPedidoValueObject';
import { Sequelize } from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { StatusPagamentoEnum } from '../../../Core/Domain/ValueObject/StatusPagamentoEnum';
import { PedidoComboEntity } from "../../../Core/Domain/Entity/PedidoComboEntity";

class LocalModel extends Model {
    public id!: string;
    public dataPedido!: Date;
    public clienteId!: string;
    public statusPedido!: string;
    public statusPagamento!: string;
    public combos!: object[];
}

class PedidoRepositoryMySQL implements PedidoRepositoryInterface {

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
            dataPedido: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            clienteId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            statusPedido: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            statusPagamento: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            combos: {
                type: DataTypes.JSON,
                allowNull: true,
            },
        }, {
            sequelize: this.sequelize,
            modelName: 'Pedido',
            tableName: 'pedidos',
            timestamps: false,
        });

        this.sequelize.sync({ alter: true });
    }

    async salvarPedido(pedido: PedidoEntity): Promise<PedidoEntity | null> {
        const pedidoData = {
            id: pedido.getId(),
            dataPedido: pedido.getDataPedido(),
            clienteId: pedido.getClienteId(),
            statusPedido: pedido.getStatusPedido().getValue(),
            statusPagamento: pedido.getStatusPagamento(),
            combos: pedido.getCombos(),
        };

        await LocalModel.upsert(pedidoData);
        return pedido;
    }

    async listarPedidosPorStatus(status: StatusPedidoValueObject, filter: PedidoRepositoryInterfaceFilter): Promise<PedidoEntity[]> {
        let pedidosArray: PedidoEntity[] = [];

        const orderColumnReference = {
            [PedidoRepositoryInterfaceFilterOrderField.DATA_CADASTRO]: 'dataPedido',
        }

        await LocalModel.findAll({
            where: { statusPedido: status.getValue() },
            order: [[orderColumnReference[filter.orderField], filter.orderDirection]],
            limit: filter.limit,
            offset: (filter.page - 1) * filter.limit,
        }).then(pedidos => {

            if (!pedidos) {
                return [];
            }

            pedidosArray = pedidos.map(p => {
                const pedido = new PedidoEntity(
                    p.clienteId,
                    p.dataPedido,
                    new StatusPedidoValueObject(p.statusPedido as StatusPedidoEnum),
                    p.statusPagamento as StatusPagamentoEnum,
                    p.id,
                    p.combos.map((combo: any) => {
                        return new PedidoComboEntity(
                            combo.lancheId,
                            combo.bebidaId,
                            combo.sobremesaId,
                            combo.acompanhamentoId,
                            combo.id,
                        );
                    })
                );
                return pedido;
            });
        });

        return pedidosArray;
    }

    async buscaPedidoPorId(id: string): Promise<PedidoEntity | null> {
        let pedidoEntity: PedidoEntity | null = null;
        await LocalModel.findByPk(id).then(pedido => {
            if (pedido) {
                pedidoEntity = new PedidoEntity(
                    pedido.clienteId,
                    pedido.dataPedido,
                    new StatusPedidoValueObject(pedido.statusPedido as StatusPedidoEnum),
                    pedido.statusPagamento as StatusPagamentoEnum,
                    pedido.id,
                    pedido.combos.map((combo: any) => {
                        return new PedidoComboEntity(
                            combo.lancheId,
                            combo.bebidaId,
                            combo.sobremesaId,
                            combo.acompanhamentoId,
                            combo.id,
                        );
                    })
                );
            }
        });
        return pedidoEntity;
    }
}

export { PedidoRepositoryMySQL };