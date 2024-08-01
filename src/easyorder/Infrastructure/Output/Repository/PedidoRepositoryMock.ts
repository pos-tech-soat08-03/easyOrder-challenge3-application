
import fs from 'fs';
import { PedidoEntity } from "../../../Core/Domain/Entity/PedidoEntity";
import { PedidoRepositoryInterface } from "../../../Core/Domain/Output/Repository/PedidoRepositoryInterface";
import { StatusPedidoValueObject } from '../../../Core/Domain/ValueObject/StatusPedidoValueObject';

export class PedidoRepositoryMock implements PedidoRepositoryInterface {
    private filePath: string;
    private pedidos: PedidoEntity[];

    constructor() {
        this.filePath = 'src/easyorder/Infrastructure/Output/Repository/PedidoRepositoryMock.fake.json';
        this.pedidos = this.loadFromFile();
    }

    private loadFromFile(): PedidoEntity[] {
        if (!fs.existsSync(this.filePath)) {
            return [];
        }
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const json = JSON.parse(data);
        return json.map((item: any) => new PedidoEntity(
            item.clienteId,
            new Date(item.dataPedido),
            new StatusPedidoValueObject(item.statusPedido),
            item.statusPagamento,
            item.id,
        ));
    }

    private saveToFile(): void {
        const data = JSON.stringify(this.pedidos, (key, value) => {
            if (value instanceof StatusPedidoValueObject) {
                return value.getValue();
            }
            return value;
        }, 2);
        fs.writeFileSync(this.filePath, data, 'utf-8');
    }

    salvarPedido(pedido: PedidoEntity): PedidoEntity | null {
        const index = this.pedidos.findIndex(p => p.getId() === pedido.getId());
        if (index !== -1) {
            this.pedidos[index] = pedido;
        } else {
            this.pedidos.push(pedido);
        }
        this.saveToFile();
        return pedido;
    }

    listarPedidosPorStatus(status: StatusPedidoValueObject): PedidoEntity[] {
        return this.pedidos.filter(p => p.getStatusPedido().getValue() === status.getValue());
    }

    buscaPedidoPorId(id: string): PedidoEntity | null {
        const pedido = this.pedidos.find(p => p.getId() === id);
        return pedido || null;
    }
}