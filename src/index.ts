const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');
const TestHandlerClass = require("./handlers/Test.js").default;

async function startClient() {
    const client = new Client({
        authStrategy: new LocalAuth({ clientId: "ButtonsTest" }),
        puppeteer: {
            args: ['--no-sandbox']
        }
    });

    client.on('qr', (qr) => {
        qrcode.generate(qr, {small: true});
    });
    client.on('ready', () => {
        console.log('[buttons-test] Client ready')
    })

    client.on('message', (message) => {
        TestHandlerClass.handleMessage(message, client);
    })

    await client.initialize();
}

startClient();