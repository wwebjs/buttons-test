const { Test } = require("../classes/Test");
const { List } = require('whatsapp-web.js');

export default class Test4 extends Test {
    constructor() {
        super('test-4', "Simple listMessage test with 1 row")
    }

    async handle(message) {
        const buttons = new List('Test', "Click me", [{title: 'test', rows: [{title: 'Test', id: "test-4;;pass"}]}]);
        await message.reply(buttons);
        return message.reply('[test-4] Sent.');
    }
}