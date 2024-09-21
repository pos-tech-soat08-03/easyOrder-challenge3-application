import { ExemploEntity } from "../../../Core/Entity/ExemploEntity";
import { EnderecoValueObject } from "../../../Core/Entity/ValueObject/EnderecoValueObject";
import { ExemploRepositoryInterface } from "../../../Core/Repository/ExemploRepositoryInterface";

export class ExemploRepositoryMock implements ExemploRepositoryInterface {

    constructor(
        private readonly mockResultList: string[]
    ) { }

    public listarTodos(): ExemploEntity[] {
        const lista = [];

        for (const item of this.mockResultList) {
            lista.push(
                new ExemploEntity(
                    `Exemplo ${item}`,
                    new EnderecoValueObject(
                        'Rua Teste',
                        123,
                    )
                )
            );
        }

        return lista;
    }

}