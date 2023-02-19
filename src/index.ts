import * as wwebjs from "whatsapp-web.js";
const { Client, LocalAuth } = wwebjs;
import qrcode from 'qrcode-terminal';
import TestHandlerClass from "./Test.js";

async function startClient() {
    const client = new Client({
        authStrategy: new LocalAuth({ clientId: "ButtonsTest" }),
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