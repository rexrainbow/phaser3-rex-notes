import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import GetRef from '../utils/GetRef.js';

class SimpleMessage {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = config.app.database();
        this.rootPath = GetValue(config, 'root', '');

        // Sender
        this.lastSendToID = undefined;
        this.sendToRef = undefined;
        this.skipFirst = true;
        this.stamp = false;
        var senderID = GetValue(config, 'senderID', '');
        var senderName = GetValue(config, 'senderName', '');
        this.setSender(senderID, senderName);

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
        if (sendToID !== this.lastSendToID) {
            this.lastSendToID = sendToID;
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
        if (this.isReceiving && (receiverID === this.receiverID)) {
            return this;
        }

        this.stopReceiving();

        this.isReceiving = true;
        this.receiverID = receiverID;
        this.skipFirst = true;  // Skip previous message
        this.receiverRef = GetRef(this.database, this.rootPath, receiverID);
        this.receiverRef.on('value', this._onReceive, this);
        this.receiverRef.onDisconnect().remove();
        return this;
    }

    stopReceiving() {
        if (!this.isReceiving) {
            return this;
        }

        this.isReceiving = false;
        this.receiverID = undefined;
        this.receiverRef.off('value', this._onReceive, this);
        this.receiverRef.remove();
        this.receiverRef.onDisconnect().cancel();
        this.receiverRef = undefined;
        return this;
    }

    _onReceive(snapshot) {
        var d = snapshot.val();
        if (this.skipFirst) {
            this.skipFirst = false;
            return;
        }
        if (d == null) {
            return;
        }

        this.emit('receive', d);
    }

}

Object.assign(
    SimpleMessage.prototype,
    EventEmitterMethods
);

export default SimpleMessage;