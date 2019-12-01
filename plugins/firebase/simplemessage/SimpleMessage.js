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
        this.rootPath = GetValue(config, 'root', '');

        // Sender
        this.sendToRef = undefined;
        this.skipFirst = true;
        this.stamp = false;
        this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));

        // Receiver
        this.isReceiving = false;
        this.receiverID = undefined;
        this.receiverRef = undefined;
    }

    setSender(senderID, senderName) {
        this.senderID = senderID;
        this.senderName = senderName;
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