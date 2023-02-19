import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from 'qrcode-terminal';
import TestHandlerClass from "./tests";

async function startClient() {
    const client = new Client({
        authStrategy: new LocalAuth({ clientId: "ButtonsTest" }),
    });

    client.on('qr', (qr) => {
        qrcode.generate(qr);
    });

    client.on('message_create', (message) => {
        TestHandlerClass.handleMessage(message);
    })

    await client.initialize();
}

startClient();