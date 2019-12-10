import 'firebase/database';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import Send from './Send.js';
import ReceiveMethods from './ReceiveMethods.js';

class StackMessage {
    constructor(app, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = app.database();
        this.setRootPath(GetValue(config, 'root', ''));

        // Sender
        this.senderInfo = { userID: '', userName: '' };
        this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));
        // Receiver
        this.isReceiving = false;
    }

    shutdown() {
        this.stopReceiving()
            .destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.sendToRef = undefined;
        this.receiverRef = undefined;
        return this;
    }

    setSender(userID, userName) {
        if (typeof (userID) === 'string') {
            this.senderInfo.userID = userID;
            this.senderInfo.userName = userName;
        } else {
            this.senderInfo = userID;
        }
        return this;
    }
}

var methods = {
    send: Send
}
Object.assign(
    StackMessage.prototype,
    EventEmitterMethods,
    ReceiveMethods,
    methods
);

export default StackMessage;