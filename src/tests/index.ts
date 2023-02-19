import {Test1} from './test-1.js';

export const tests = [];

tests.push(Test1);

export class Test {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    async handle(message): Promise<void> {}
}