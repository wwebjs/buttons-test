const { Test } = require("../classes/Test");
const { Buttons } = require('whatsapp-web.js');

export default class Test3 extends Test {
    constructor() {
        super('test-3', "Simple templateMessage test with 1 URL button")
    }

    async handle(message) {
        const buttons = new Buttons('Test', [{body: "Test URL", url: "https://github.com/wwebjs/buttons-test"}], null, null, true);
        await message.reply(buttons);
        return message.reply('[test-3] Sent.');
    }
}