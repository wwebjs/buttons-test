const { Test } = require("../classes/Test");
const { Buttons } = require('whatsapp-web.js');

export default class Test2 extends Test {
    constructor() {
        super('test-2', "Simple templateMessage test with 1 button")
    }

    async handle(message) {
        const buttons = new Buttons('Test', [{body: 'Test', id: 'test:1;;pass'}], null, null, true);
        await message.reply(buttons);
        return message.reply('[test-2] Sent.');
    }
}