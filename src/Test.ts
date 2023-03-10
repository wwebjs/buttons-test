import { Message, MessageTypes, Client } from "whatsapp-web.js";
import { tests } from "./tests/index.js";

type StateData = {
    currentState: number;
    platform: 'android' | 'ios' | 'web';
};

export const data: { [jid: string]: StateData } = {};

export default class TestHandlerClass {

    static async handleMessage(message: Message, client: Client) {
        if (message.type == MessageTypes.LIST_RESPONSE) {
            message.reply("List response received")
            if (message.selectedRowId.startsWith('test') && message.selectedRowId.split(";;")[1]) {
                const [state, choice] = message.selectedRowId.split(";;")[1].split('-');
                message.reply("[Test Level: "+state+"] List response: "+choice.toUpperCase());
            }
        };

        if (message.type == MessageTypes.LIST && message.author == client.info.wid._serialized) {
            message.reply("List sent from my end.")
        };

        if (message.type == MessageTypes.BUTTONS_RESPONSE) {
            message.reply("Buttons response received");
            if (message.selectedButtonId.startsWith('test') && message.selectedButtonId.split(";;")[1]) {
                const [state, choice] = message.selectedButtonId.split(";;")[1].split('-');
                message.reply("[Test Level: "+state+"] Buttons response: "+choice.toUpperCase());
            }
        };

        if (message.dynamicReplyButtons && message.author == client.info.wid._serialized) {
            message.reply("Buttons sent from my end.")
        };

        if (message.type == MessageTypes.TEMPLATE_BUTTON_REPLY) {
            message.reply("Template response received\nPASS/FAIL not available")
        };

        if (message.type == MessageTypes.TEXT) {
            if (message.body.startsWith("buttons-test")) {
                

                const [action, choice] = message.body.split(" ").slice(1);

                if (!action) {
                    const msg = await message.reply("Welcome to the ButtonsTest diagnosis tool, this tool will allow you to diagnose buttons for your system");
                    await msg.reply("I've already detected that your viewing system is *"+message.deviceType+"*\nIs that OK? Send 'buttons-test switch IOS or ANDROID or WEB (WEB and MACOS are WEB)");
                } else if (action == "switch") {
                    if (["ios", "android", "web"].includes(choice.toLowerCase())) {
                        data[message.author].platform = choice.toLowerCase() as StateData['platform'];
                        return message.reply('platform set');
                    } else {
                        return message.reply('Invalid choice, must be IOS, ANDROID, OR WEB')
                    }
                }

                if (!data[message.author]) { 
                    data[message.author] = {
                        currentState: 0,
                        platform: message.deviceType as StateData['platform']
                    }
                } else {
                    data[message.author].currentState++;
                }

                await tests[data[message.author].currentState].handle(message);
            }
        }
    }
}