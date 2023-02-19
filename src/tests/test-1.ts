import { Test } from "./index.js";
import * as wwebjs from "whatsapp-web.js";
const { Buttons } = wwebjs;

export class Test1 extends Test {
    constructor() {
        super('test-1', "Simple button test with 1 button")
    }

    async handle(message) {
        const buttons = new Buttons('Test', [{body: 'Test', id: 'test:1;;pass'}]);
        message.reply(buttons);
    }
}