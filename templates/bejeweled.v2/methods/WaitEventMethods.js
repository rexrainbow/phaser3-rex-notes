export default {
    waitEvent(eventEmitter, eventName) {
        if (eventName === undefined) {
            eventName = 'complete';
        }
        this.waitEvents.waitEvent(eventEmitter, eventName);
        return this;
    },

    waitCallback() {
        return this.waitEvents.waitCallback();
    },

    isWaitingEvent() {
        return !this.waitEvents.noWaitEvent;
    },
}