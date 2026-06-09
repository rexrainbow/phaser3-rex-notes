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
            this.eventEmitter.emit('tick.start', this);
        }
        return this;
    },

    emitTickEnd(status) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit('tick.end', status, this);
        }
        return this;
    },

    emitNodeEvent(name, node) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit(`node.${name}`, node, this);
        }
        return this;
    },

    emitNodeStatus(node, status) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit('node.status', node, status, this);
        }
        return this;
    },

    emitNodeAbort(node) {
        if (this.eventEnable && this.eventEmitter) {
            this.eventEmitter.emit('node.abort', node, this);
        }
        return this;
    },
}
