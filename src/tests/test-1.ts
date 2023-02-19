import { Test } from "../Test";
import { Message, Buttons } from 'whatsapp-web.js';

export class Test1 extends Test {
    constructor() {
        super('test-1', "Simple button test with 1 button")
    }

    async handle(message: Message) {
        const buttons = new Buttons('Test', [{body: 'Test', id: 'test:1;;pass'}]);
        message.reply(buttons);
    }
}