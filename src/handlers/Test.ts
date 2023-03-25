const { MessageTypes } = require("whatsapp-web.js");
import type {Client as ClientType, Message as MessageType} from 'whatsapp-web.js';
const { tests } = require("../tests/index");

type StateData = {
    currentState: number;
    platform: 'android' | 'ios' | 'web';
};

const data: { [jid: string]: StateData } = {};

export default class TestHandlerClass {

    static async handleMessage(message: MessageType, client: ClientType) {
        if (message.type == MessageTypes.LIST_RESPONSE) {
            message.reply("List response received")
            if (message.selectedRowId.startsWith('test') && message.selectedRowId.split(";;")[1]) {
                const [state, choice] = message.selectedRowId.split(";;")[1].split('-');
                message.reply("[Test Level: "+state+"] List response: "+choice.toUpperCase());
            }
        };

        if (message.type == MessageTypes.LIST && message.author == client.info?.wid._serialized) {
            message.reply("List sent from my end.")
        };

        if (message.type == MessageTypes.BUTTONS_RESPONSE) {
            message.reply("Buttons response received");
            if (message.selectedButtonId.startsWith('test') && message.selectedButtonId.split(";;")[1]) {
                const [state, choice] = message.selectedButtonId.split(";;")[1].split('-');
                message.reply("[Test Level: "+state+"] Buttons response: "+choice.toUpperCase());
            }
        };

        if (message.dynamicReplyButtons && message.author == client.info?.wid._serialized) {
            message.reply("Buttons sent from my end.")
        };

        if (message.type == MessageTypes.TEMPLATE_BUTTON_REPLY) {
            message.reply("Template response received\nPASS/FAIL not available")
        };

        if (message.type == MessageTypes.TEXT) {
            if (message.body.startsWith("buttons-test")) {
                

                const [action, choice] = message.body.split(" ").slice(1);

                if (!action && !data[message.author || message.from]) {
                    const msg = await message.reply("Welcome to the ButtonsTest diagnosis tool, this tool will allow you to diagnose buttons for your system");
                    await msg.reply("I've already detected that your viewing system is *"+message.deviceType+"*\nIs that OK? Send 'buttons-test switch IOS [or] ANDROID [or] WEB (WEB and MACOS are WEB)\n\nWhen unable to see a button, just type buttons-test again.");
                } else if (action == "switch") {
                    if (["ios", "android", "web"].includes(choice.toLowerCase())) {
                        data[message.author || message.from].platform = choice.toLowerCase() as StateData['platform'];
                        return message.reply('platform set');
                    } else {
                        return message.reply('Invalid choice, must be IOS, ANDROID, OR WEB')
                    }
                } else if (action == 'reset') {
                    delete data[message.author || message.from];
                    message.reply("Reset data;")
                } else if (action == 'reload') {
                    tests.reload();
                    message.reply('Reloaded tests');
                }

                if (!data[message.author || message.from]) { 
                    data[message.author || message.from] = {
                        currentState: 1,
                        platform: message.deviceType as StateData['platform']
                    }
                } else {
                    data[message.author || message.from].currentState++;
                }

                if (tests.items.has('test-' + data[message.author || message.from].currentState)) {
                    const test = tests.items.get('test-' + data[message.author || message.from].currentState);
                    await test.handle(message);
                } else {
                    message.reply('End of tests, type ```buttons-test reset``` to reset.\ncurrent state:'+ data[message.author || message.from].currentState);
                    data[message.author || message.from].currentState = tests.items.size;
                }
                
            }
        }
    }
}