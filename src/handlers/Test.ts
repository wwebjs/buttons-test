export class Test {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    async handle(message): Promise<void> {}
}