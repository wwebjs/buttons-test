const { Test } = require("../classes/Test.js");
const { Buttons } = require('whatsapp-web.js');

export class Test1 extends Test {
    constructor() {
        super('test-1', "Simple button test with 1 button")
    }

    async handle(message) {
        const buttons = new Buttons('Test', [{body: 'Test', id: 'test:1;;pass'}]);
        message.reply(buttons);
    }
}