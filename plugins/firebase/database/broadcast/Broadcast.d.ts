import EventEmitter from "../../../utils/eventemitter/EventEmitter";

export default Broadcast;

declare namespace Broadcast {
    interface IConfig {
        root?: string,
        receiverID?: string,
        history?: number,

        eventEmitter?: EventEmitter | false,
    }

    type MessageType = string |
    { [name: string]: number | string | boolean };

    interface IReceiveData {
        senderID: string,
        senderName?: string,
        message: MessageType
    }
}

declare class Broadcast extends EventEmitter {
    constructor(
        config?: Broadcast.IConfig
    );

    setSender(
        userID: string, userName?: string
    ): this;

    setSender(
        config: { userID: string, userName?: string }
    ): this;

    setReceiver(receiverID: string): this;

    send(
        message: Broadcast.MessageType
    ): Promise<any>;

    startReceiving(): this;
    stopReceiving(): this;

    getHistory(): Broadcast.IReceiveData[];
    clearHistory(): this;
}