export default {
    pause() {
        this.parser.pause();
        return this;
    },

    pauseUntilEvent(eventEmitter?: any, eventName?: any) {
        this.parser.pauseUntilEvent(eventEmitter, eventName);
        return this;
    }
};