
import fs from 'fs';
import { PedidoEntity } from "../../../Core/Domain/Entity/PedidoEntity";
import { PedidoRepositoryInterface, PedidoRepositoryInterfaceFilter, PedidoRepositoryInterfaceFilterOrderDirection, PedidoRepositoryInterfaceFilterOrderField } from "../../../Core/Domain/Output/Repository/PedidoRepositoryInterface";
import { StatusPedidoEnum, StatusPedidoValueObject } from '../../../Core/Domain/ValueObject/StatusPedidoValueObject';
import { Sequelize } from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { StatusPagamentoEnum } from '../../../Core/Domain/ValueObject/StatusPagamentoEnum';

const sequelize = new Sequelize('easyorder', 'easyorder', 'easyorder_senha_super_segura', {
    host: 'easyorder_database',
    dialect: 'mysql',
});

class PedidoModel extends Model {
    public id!: string;
    public dataPedido!: Date;
    public clienteId!: string;
    public statusPedido!: string;
    public statusPagamento!: string;
}

PedidoModel.init({
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
}, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: false,
});

class PedidoRepositoryMySQL implements PedidoRepositoryInterface {

    constructor() {
        sequelize.sync();
    }

    async salvarPedido(pedido: PedidoEntity): Promise<PedidoEntity | null> {
        const pedidoData = {
            id: pedido.getId(),
            dataPedido: pedido.getDataPedido(),
            clienteId: pedido.getClienteId(),
            statusPedido: pedido.getStatusPedido().getValue(),
            statusPagamento: pedido.getStatusPagamento(),
        };

        await PedidoModel.upsert(pedidoData);
        return pedido;
    }

    async listarPedidosPorStatus(status: StatusPedidoValueObject, filter: PedidoRepositoryInterfaceFilter): Promise<PedidoEntity[]> {
        let pedidosArray: PedidoEntity[] = [];

        const orderColumnReference = {
            [PedidoRepositoryInterfaceFilterOrderField.DATA_CADASTRO]: 'dataPedido',
        }

        await PedidoModel.findAll({
            where: { statusPedido: status.getValue() },
            order: [[orderColumnReference[filter.orderField], filter.orderDirection]],
            limit: filter.limit,
            offset: (filter.page - 1) * filter.limit,
        }).then(pedidos => {
            pedidosArray = pedidos.map(p => new PedidoEntity(
                p.clienteId,
                p.dataPedido,
                new StatusPedidoValueObject(p.statusPedido as StatusPedidoEnum),
                p.statusPagamento as StatusPagamentoEnum,
                p.id
            ));

            console.log(pedidosArray);
        });

        return pedidosArray;
    }

    async buscaPedidoPorId(id: string): Promise<PedidoEntity | null> {
        let pedidoEntity: PedidoEntity | null = null;
        await PedidoModel.findByPk(id).then(pedido => {
            if (pedido) {
                pedidoEntity = new PedidoEntity(
                    pedido.clienteId,
                    pedido.dataPedido,
                    new StatusPedidoValueObject(pedido.statusPedido as StatusPedidoEnum),
                    pedido.statusPagamento as StatusPagamentoEnum,
                    pedido.id
                );
            }
        });
        return pedidoEntity;
    }
}

export { PedidoRepositoryMySQL };