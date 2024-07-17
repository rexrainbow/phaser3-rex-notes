class Timer {
    constructor(parent) {
        this.parent = parent;
    }

    destroy() {
    }

    start(time, timeoutCallback) {
        return this;
    }

    pause() {
        return this;
    }

    resume() {
        return this;
    }

    setTimeScale(value) {
        return this;
    }
}

export default Timer;