export default BaseClock;

declare namespace BaseClock {
    /**
     * Configuration options for creating a BaseClock.
     */
    interface IConfig {
        /**
         * Time scale factor.
         */
        timeScale?: number
    }

    namespace Events {
        /**
         * Update callback signature.
         */
        type UpdateCallbackType = (now: number, delta: number) => void;
    }
}

/**
 * Base clock for time tracking.
 */
declare class BaseClock extends Phaser.Events.EventEmitter {
    /**
     * Create a BaseClock.
     *
     * @param parent - Scene or game object owner.
     * @param config - Configuration options.
     */
    constructor(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
        config?: BaseClock.IConfig
    );

    /**
     * Start the clock.
     *
     * @param startAt - Start time value.
     * @returns This BaseClock instance.
     */
    start(startAt?: number): this;
    /**
     * Seek the clock to a time.
     *
     * @param time - Time value.
     * @returns This BaseClock instance.
     */
    seek(time?: number): this;
    /**
     * Pause the clock.
     *
     * @returns This BaseClock instance.
     */
    pause(): this;
    /**
     * Resume the clock.
     *
     * @returns This BaseClock instance.
     */
    resume(): this;
    /**
     * Stop the clock.
     *
     * @returns This BaseClock instance.
     */
    stop(): this;
    /**
     * Advance the clock.
     *
     * @param delta - Delta time.
     * @returns This BaseClock instance.
     */
    tick(delta: number): this;

    /**
     * Current time value.
     */
    readonly now: number;
    /**
     * Whether the clock is running.
     */
    readonly isRunning: boolean;

    /**
     * Set time scale factor.
     *
     * @param timeScale - Time scale factor.
     * @returns This BaseClock instance.
     */
    setTimeScale(timeScale: number): this;
    /**
     * Current time scale factor.
     */
    timeScale: number;

}
