class Timer {
    scene: any;
    timer: any;
    timeScale: any;

    constructor(scene?: any) {
        this.scene = scene;
        this.timeScale = 1;
        this.timer = null;
    }

    destroy() {
        this.stop();
        return this;
    }

    start(delay?: any, timeoutCallback?: any) {
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

    setTimeScale(value?: any) {
        this.timeScale = value;
        if (this.timer) {
            this.timer.timeScale = value;
        }
        return this;
    }
}

export default Timer;