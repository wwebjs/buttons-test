import { Message, MessageTypes } from "whatsapp-web.js";

type StateData = {
    currentState: number;
    platform: 'android' | 'ios' | 'web';

};

export const data: { [jid: string]: StateData } = {};

export class Test {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    async handle(message: Message): Promise<void> {}
}
export default class TestHandlerClass {

    static async handleMessage(message: Message) {
        if (message.type == MessageTypes.TEXT) {
            if (message.body.startsWith("buttons-test")) {
                if (!data[message.author]) { 
                    data[message.author] = {
                        currentState: 0,
                        platform: message.deviceType as StateData['platform']
                    }
                } else {
                    data[message.author].currentState++;
                }

                const [action, choice] = message.body.split(" ").slice(1);


            }
        }
    }
}