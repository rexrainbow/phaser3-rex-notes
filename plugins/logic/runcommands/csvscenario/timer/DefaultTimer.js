class Timer {
    constructor(parent) {
        this.parent = parent;
        this.timeScale = 1;
        this.paused = false;
        this.deltaT = 10;

        this.timerId = null;
        this.timeoutCallback = null;
        this.time = 0;
        this.remainingTime = 0;
    }

    destroy() {
        this.stop();
        return this;
    }

    start(time, timeoutCallback) {
        this.time = time;
        this.remainingTime = time;
        this.timeoutCallback = timeoutCallback;

        var self = this;
        this.timerId = setInterval(function () {
            if (!self.paused) {
                self.remainingTime -= self.deltaT * self.timeScale;
                if (self.remainingTime <= 0) {
                    self.stop();
                    if (self.timeoutCallback) {
                        var timeoutCallback = self.timeoutCallback;
                        self.timeoutCallback = null;
                        timeoutCallback();
                    }
                }
            }
        }, self.deltaT);

        return this;
    }

    stop() {
        clearInterval(this.timerId);
        this.timerId = null;
        return this;
    }

    pause() {
        this.paused = true;
        return this;
    }

    resume() {
        this.paused = false;
        return this;
    }

    setTimeScale(value) {
        this.timeScale = value;
        return this;
    }
}

export default Timer;