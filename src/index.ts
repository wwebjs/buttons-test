const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');
const TestHandlerClass = require("./handlers/Test.js");

async function startClient() {
    const client = new Client({
        authStrategy: new LocalAuth({ clientId: "ButtonsTest" }),
        puppeteer: {
            args: ['--no-sandbox']
        }
    });

    client.on('qr', (qr) => {
        qrcode.generate(qr);
    });

    client.on('message_create', (message) => {
        TestHandlerClass.handleMessage(message, client);
    })

    await client.initialize();
}

startClient();