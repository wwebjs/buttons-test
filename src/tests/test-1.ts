const { Test } = require("../classes/Test");
const { Buttons } = require('whatsapp-web.js');

export default class Test1 extends Test {
    constructor() {
        super('test-1', "Simple buttonsMessage test with 1 button")
    }

    async handle(message) {
        const buttons = new Buttons('Test', [{body: 'Test', id: 'test:1;;pass'}], null, null);
        await message.reply(buttons);
        return message.reply('[test-1] Sent.');
    }
}