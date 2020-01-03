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
        this.userInfo = { userID: '', userName: undefined };
        this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));
        this.setReceiver(GetValue(config, 'receiverID', ''));

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

    get userID() {
        return this.userInfo.userID;
    }

    set userID(value) {
        this.userInfo.userID = value;
    }

    get userName() {
        return this.userInfo.userName;
    }

    set userName(value) {
        this.userInfo.userName = value;
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.sendToRef = undefined;
        this.receiverRef = undefined;
        return this;
    }

    setSender(userID, userName) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userID = userID;
            this.userName = userName;
        }
        return this;
    }

    setReceiver(receiverID) {
        this.receiverID = receiverID;
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