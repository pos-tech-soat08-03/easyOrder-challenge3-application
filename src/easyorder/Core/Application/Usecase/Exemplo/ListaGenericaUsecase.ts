
import { ExemploRepositoryInterface } from "../../../Domain/Output/Repository/ExemploRepositoryInterface";
import { EmailServiceInterface } from "../../../Domain/Output/Service/EmailServiceInterface";

export class ListaGenericaUsecaseResponse {
    constructor(public readonly length: number, public readonly list: any[]) { }
}

export class ListaGenericaUsecase {

    constructor(
        private readonly exemploRepository: ExemploRepositoryInterface,
        private readonly emailService: EmailServiceInterface,
    ) { }

    public async execute(): Promise<ListaGenericaUsecaseResponse> {
        const list = this.exemploRepository.listarTodos();

        this.emailService.sendEmail('jonny.bravo@teste.com', 'Exemplo Listado', '<b>Exemplo</b> Listado');

        return new ListaGenericaUsecaseResponse(list.length, list);
    }

}