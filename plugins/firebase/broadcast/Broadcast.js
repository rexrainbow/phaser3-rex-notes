import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import Send from './Send.js';
import ReceiveMethods from './ReceiveMethods.js';

class Broadcast {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = firebase.database();
        this.setRootPath(GetValue(config, 'root', ''));

        // Sender
        this.skipFirst = true;
        this.stamp = false;
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
        if (IsPlainObject(userID)) {
            this.senderInfo = userID;
        } else {
            this.senderInfo.userID = userID;
            this.senderInfo.userName = userName;
        }
        return this;
    }
}

var methods = {
    send: Send
}
Object.assign(
    Broadcast.prototype,
    EventEmitterMethods,
    ReceiveMethods,
    methods
);

export default Broadcast;