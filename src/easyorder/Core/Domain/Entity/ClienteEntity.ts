import { v4 as uuidv4 } from 'uuid';

export class ClienteEntity {
    private id: string;
    private nome: string;
    private cpf: string;
    private email: string;

    constructor(cpf: string, nome: string, email: string, id?: string) {
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;

        if (!id) {
            id = uuidv4();
        }
        this.id = id;
    }

    getId() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }

    getEmail() {
        return this.email;
    }

    getCpf() {
        return this.cpf;
    }
}