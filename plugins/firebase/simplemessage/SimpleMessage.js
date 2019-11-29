import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';

class SimpleMessage {
    constructor() {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.isUpdating = false;
        this.skipFirst = true;
        this.stamp = false;
        this.ref = undefined;
        this.onReadCallback = undefined;
    }

    setRef(ref) {
        var isUpdating = this.isUpdating;
        this.stopUpdate();
        this.ref = ref;
        if (isUpdating) {
            this.startUpdate();
        }
    }

    send(message, senderID, senderName) {
        if (this.ref === undefined) {
            return this;
        }

        // Clean message
        if (message == undefined) {
            this.ref.remove();
            return this;
        }

        var d = {
            message: message,
            senderID: senderID,
            senderName: senderName,
            stamp: this.stamp,
        };
        this.skipFirst = false;
        this.ref.set(d);
        this.stamp = !this.stamp;
        return this;
    }

    onRead(snapshot) {
        var d = snapshot.val();
        if (self.skipFirst) {
            self.skipFirst = false;
            return;
        }
        if (d == null) {
            return;
        }

        self.emit('receive', d);
    }

    startUpdate(ref) {
        this.stopUpdate();

        this.isUpdating = true;
        this.skipFirst = true;  // Skip previous message
        if (ref !== undefined) {
            this.ref = ref;
        }
        this.ref.on('value', this.onRead);
        this.ref.onDisconnect().remove();
        return this;
    }

    stopUpdate() {
        if (!this.isUpdating) {
            return this;
        }

        this.isUpdating = false;
        this.ref.off('value', this.onRead);
        this.ref.remove();
        this.ref.onDisconnect().cancel();
        return this;
    }
}

Object.assign(
    SimpleMessage.prototype,
    EventEmitterMethods
);

export default SimpleMessage;