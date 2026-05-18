export default {
    waitEvent(eventEmitter?: any, eventName?: any) {
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