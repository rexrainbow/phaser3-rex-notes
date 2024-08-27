import EventEmitter from '../../../utils/eventemitter/EventEmitter';

export default Messages;

declare namespace Messages {
    interface IConfig {
        root?: string,

        senderID?: string, senderName?: string,
        receiverID?: string,

        pageItemCount?: number,


        eventEmitter?: EventEmitter | false,
    }
}

declare class Messages {
    constructor(config?: Messages.IConfig);

    setSender(
        userID: string,
        userName: string
    ): this;
    setSender(
        userInfo: {
            userID: string,
            userName: string
        }
    ): this;
    userID: string;
    userName: string;

    setReceiver(receiverID: string): this;

    setPageItemCount(count: number): this;

    setRootPath(rootPath: string): this;

    send(message: string): this;

}