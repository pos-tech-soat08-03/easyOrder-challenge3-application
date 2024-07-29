

export class CpfValueObject {

    private value: string;

    constructor(value: string) {

        if (!value.match(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/)) {
            throw new Error('O CPF deve estar no formato 000.000.000-00');
        }

        this.value = value;
    }

    getValue(): string {
        return this.value;
    }
}