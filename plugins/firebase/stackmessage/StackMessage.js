import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';

class StackMessage {
    constructor() {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.isUpdating = false;
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

    }

    startUpdate(ref) {
        this.stopUpdate();
    }

    
    stopUpdate() {
        if (!this.isUpdating) {
            return this;
        }
    }
}

Object.assign(
    StackMessage.prototype,
    EventEmitterMethods
);

export default StackMessage;