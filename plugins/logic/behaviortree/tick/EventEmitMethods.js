import {
    EVT_TICK_START,
    EVT_TICK_END,
    EVT_NODE_STATUS,
    EVT_NODE_ABORT,
    EVT_NODE_LOG,
} from '../constants.js';

export default {
    setEventEmitter(eventEmitter) {
        this.eventEmitter = eventEmitter;
        return this;
    },

    setEventEnable(enable = true) {
        this.eventEnable = enable;
        return this;
    },

    toggleEventEnable() {
        this.eventEnable = !this.eventEnable;
        return this;
    },

    emit(name, ...args) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit(name, ...args);
        }
        return this;
    },

    emitTickStart() {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit(EVT_TICK_START, this);
        }
        return this;
    },

    emitTickEnd(status) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit(EVT_TICK_END, status, this);
        }
        return this;
    },

    emitNodeEvent(name, node) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit(name, node, this);
        }
        return this;
    },

    emitNodeStatus(node, status) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit(EVT_NODE_STATUS, node, status, this);
        }
        return this;
    },

    emitNodeAbort(node) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit(EVT_NODE_ABORT, node, this);
        }
        return this;
    },

    emitNodeLog(node, message, data) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit(EVT_NODE_LOG, node, message, data, this);
        }
        return this;
    },
}
