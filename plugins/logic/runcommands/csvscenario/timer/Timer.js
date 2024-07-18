class Timer {
    constructor(scene) {
        this.scene = scene;
        this.timeScale = 1;
        this.timer = null;
    }

    destroy() {
        this.stop();
        return this;
    }

    start(delay, timeoutCallback) {
        if (this.timer) {
            this.timer.remove();
            this.timer = undefined;
        }

        this.timer = this.scene.time.delayedCall(delay, timeoutCallback);
        this.timer.timeScale = this.timeScale;
        return this;
    }

    stop() {
        if (this.timer) {
            this.timer.remove();
            this.timer = undefined;
        }
        return this;
    }

    pause() {
        if (this.timer) {
            this.timer.paused = true;
        }
        return this;
    }

    resume() {
        if (this.timer) {
            this.timer.paused = false;
        }
        return this;
    }

    setTimeScale(value) {
        this.timeScale = value;
        if (this.timer) {
            this.timer.timeScale = value;
        }
        return this;
    }
}

export default Timer;