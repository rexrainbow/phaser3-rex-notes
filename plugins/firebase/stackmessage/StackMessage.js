import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import GetRef from '../utils/GetRef.js';

class StackMessage {
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
            senderName: this.senderName
        };
        this.sendToRef.push(d);
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
        this.receiverRef.limitToFirst(1).on('child_added', this._onReceive, this);
        this.receiverRef.onDisconnect().remove();
        return this;
    }

    stopReceiving() {
        if (!this.isReceiving) {
            return this;
        }

        this.isReceiving = false;
        this.receiverID = undefined;
        this.receiverRef.off('child_added', this._onReceive, this);
        this.receiverRef.remove();
        this.receiverRef.onDisconnect().cancel();
        return this;
    }

    _onReceive(snapshot) {
        var d = snapshot.val();
        if (d == null) {
            return;
        }

        this.emit('receive', d);

        // Remove this child
        snapshot.ref.remove();
    }

}

Object.assign(
    StackMessage.prototype,
    EventEmitterMethods
);

export default StackMessage;