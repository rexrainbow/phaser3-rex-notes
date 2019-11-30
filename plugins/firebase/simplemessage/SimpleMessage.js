import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import GetRef from '../utils/GetRef.js';

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

    send(sendToID, message) {
        if ((!this.sendToRef) || (this.sendToRef.key !== sendToID)) {
            this.sendToRef = GetRef(this.database, this.rootPath, sendToID);
        }

        // Clear message
        if (message === undefined) {
            this.sendToRef.remove();
            return this;
        }

        var d = {
            message: message,
            senderID: this.senderID,
            senderName: this.senderName,
            stamp: this.stamp,
        };
        this.skipFirst = false;
        this.stamp = !this.stamp;
        this.sendToRef.set(d);
        return this;
    }

    startReceiving(receiverID) {
        if (receiverID === undefined) {
            receiverID = this.senderID;
        }
        if (this.isReceiving && (this.receiverRef.key === receiverID)) {
            return this;
        }

        this.stopReceiving();

        this.isReceiving = true;
        this.skipFirst = true;  // Skip previous message
        this.receiverRef = GetRef(this.database, this.rootPath, receiverID);
        this.receiverRef.on('value', OnReceive, this);
        this.receiverRef.onDisconnect().remove();
        return this;
    }

    stopReceiving() {
        if (!this.isReceiving) {
            return this;
        }

        this.isReceiving = false;
        this.receiverRef.off('value', OnReceive, this);
        this.receiverRef.remove();
        this.receiverRef.onDisconnect().cancel();
        return this;
    }

}

var OnReceive = function (snapshot) {
    if (this.skipFirst) {
        this.skipFirst = false;
        return;
    }
    var d = snapshot.val();
    if (d == null) {
        return;
    }

    this.emit('receive', d);
}

Object.assign(
    SimpleMessage.prototype,
    EventEmitterMethods
);

export default SimpleMessage;