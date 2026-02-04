export default Timer;

declare namespace Timer {

}

/**
 * Basic timer utility for CSV scenario playback.
 */
declare class Timer {
    /**
     * Create a Timer instance.
     *
     * @param parent - Parent object.
     */
    constructor(parent?: Object);
    /**
     * Current time scale.
     */
    timeScale: number;

    /**
     * Destroy timer resources.
     *
     * @returns This Timer instance.
     */
    destroy(): this;

    /**
     * Start timer.
     *
     * @param delay - Delay duration.
     * @param timeoutCallback - Callback when timer times out.
     * @returns This Timer instance.
     */
    start(delay: number, timeoutCallback: Function): this;

    /**
     * Stop timer.
     *
     * @returns This Timer instance.
     */
    stop(): this;

    /**
     * Pause timer.
     *
     * @returns This Timer instance.
     */
    pause(): this;

    /**
     * Resume timer.
     *
     * @returns This Timer instance.
     */
    resume(): this;

    /**
     * Set timer time scale.
     *
     * @param value - Time scale value.
     * @returns This Timer instance.
     */
    setTimeScale(value: number): this;

}
