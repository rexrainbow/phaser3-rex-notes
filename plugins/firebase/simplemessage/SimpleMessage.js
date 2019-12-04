import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import Send from './Send.js';
import ReceiveMethods from './ReceiveMethods.js';

class SimpleMessage {
    constructor(app, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = app.database();
        this.setRootPath(GetValue(config, 'root', ''));

        // Sender
        this.skipFirst = true;
        this.stamp = false;
        this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));

        // Receiver
        this.isReceiving = false;
    }

    shutdown() {
        this.destroyEventEmitter();
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
            this.senderInfo = {
                userID: userID,
                userName: userName
            }
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
    SimpleMessage.prototype,
    EventEmitterMethods,
    ReceiveMethods,
    methods
);

export default SimpleMessage;