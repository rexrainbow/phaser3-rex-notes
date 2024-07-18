export default Timer;

declare namespace Timer {

}

declare class Timer {
    constructor(parent?: Object);
    timeScale: number;

    destroy(): this;

    start(delay: number, timeoutCallback: Function): this;

    stop(): this;

    pause(): this;

    resume(): this;

    setTimeScale(value: number): this;

}