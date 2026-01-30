import EventEmitter from '../../utils/eventemitter/EventEmitter.js';

export default RealTimeTimers;

declare namespace RealTimeTimers {
    /**
     * Timer data object.
     */
    interface ITimer {
        /**
         * Timer name.
         */
        name: string | number,
        /**
         * Start timestamp.
         */
        start: number,
        /**
         * Period in milliseconds.
         */
        period: number,
        /**
         * Custom data payload.
         */
        data?: any
    }

    /**
     * Serializable state.
     */
    interface IState {
        /**
         * Timer list.
         */
        timers?: ITimer[];
    }

    /**
     * Callback that returns a timestamp.
     */
    type GetTimestampCallbackType = () => number;

    /**
     * Configuration options for creating RealTimeTimers.
     */
    interface IConfig extends IState {
        /**
         * Custom timestamp callback.
         */
        getTimestampCallback?: GetTimestampCallbackType;
        /**
         * Start timestamp value.
         */
        startTimestamp?: number;
    }

    /**
     * Period expressed as time parts.
     */
    interface IPeriod {
        /**
         * Day count.
         */
        day?: number, d?: number,
        /**
         * Hour count.
         */
        hour?: number, h?: number,
        /**
         * Minute count.
         */
        minute?: number, m?: number,
        /**
         * Second count.
         */
        second?: number, s?: number,
    }

    /**
     * Progress data for a timer.
     */
    interface IProgress {
        /**
         * Timer name.
         */
        name: string | number,
        /**
         * Timer period.
         */
        period: number,
        /**
         * Elapsed time in milliseconds.
         */
        elapsed: number,
        /**
         * Progress ratio from 0 to 1.
         */
        progress: number,
        /**
         * Source timer.
         */
        timer: ITimer
    }
}

/**
 * Real-time timer manager with serialization.
 */
declare class RealTimeTimers extends EventEmitter {
    /**
     * Create a RealTimeTimers instance.
     *
     * @param config - Configuration options.
     */
    constructor(
        config?: RealTimeTimers.IConfig
    );

    /**
     * Timer list.
     */
    timers: RealTimeTimers.ITimer[];

    /**
     * Reset from JSON state.
     *
     * @param state - Serialized state.
     * @returns This RealTimeTimers instance.
     */
    resetFromJSON(state?: RealTimeTimers.IState): this;
    /**
     * Serialize to JSON state.
     *
     * @returns Serialized state.
     */
    toJSON(): RealTimeTimers.IState;

    /**
     * Set start timestamp.
     *
     * @param timestamp - Start timestamp.
     * @returns This RealTimeTimers instance.
     */
    setStartTimestamp(timestamp?: number): this;
    /**
     * Set timestamp callback.
     *
     * @param callback - Timestamp callback.
     * @returns This RealTimeTimers instance.
     */
    setGetTimestampCallback(callback?: RealTimeTimers.GetTimestampCallbackType): this;

    /**
     * Add a timer.
     *
     * @param name - Timer name.
     * @param period - Timer period in ms or parts.
     * @param data - Custom data.
     * @param currentTimestamp - Current timestamp.
     * @returns This RealTimeTimers instance.
     */
    addTimer(
        name: string | number,
        period: number | RealTimeTimers.IPeriod,
        data?: any,
        currentTimestamp?: number
    ): this;

    /**
     * Increase a timer period.
     *
     * @param name - Timer name.
     * @param period - Period to add in ms or parts.
     * @returns This RealTimeTimers instance.
     */
    incTimerPeriod(
        name: string | number,
        period: number | RealTimeTimers.IPeriod
    ): this;

    /**
     * Get expired timers.
     *
     * @param currentTimestamp - Current timestamp.
     * @returns Expired timers.
     */
    getExpiredTimers(currentTimestamp?: number): RealTimeTimers.ITimer[];
    /**
     * Pop expired timers.
     *
     * @param currentTimestamp - Current timestamp.
     * @returns Expired timers.
     */
    popExpiredTimers(currentTimestamp?: number): RealTimeTimers.ITimer[];
    /**
     * Get progress for all timers.
     *
     * @param currentTimestamp - Current timestamp.
     * @returns Progress list.
     */
    getTimersProgress(currentTimestamp?: number): RealTimeTimers.IProgress[];

    /**
     * Get all timers.
     *
     * @returns Timer list.
     */
    getTimers(): RealTimeTimers.ITimer[];
    /**
     * Get timers by name.
     *
     * @param name - Timer name.
     * @returns Timer list.
     */
    getTimers(name: string | number): RealTimeTimers.ITimer[];
    /**
     * Last timer in the list.
     */
    readonly lastTimer: RealTimeTimers.ITimer;
    /**
     * Number of timers.
     */
    readonly length: number;

    /**
     * Remove timers by name.
     *
     * @param name - Timer name.
     * @returns This RealTimeTimers instance.
     */
    removeTimers(name: string | number): this;
    /**
     * Remove a timer by object.
     *
     * @param timer - Timer instance.
     * @returns This RealTimeTimers instance.
     */
    removeTimers(timer: RealTimeTimers.ITimer): this;
    /**
     * Remove timers by list.
     *
     * @param timers - Timer list.
     * @returns This RealTimeTimers instance.
     */
    removeTimers(timers: RealTimeTimers.ITimer[]): this;

    /**
     * Clear all timers.
     *
     * @returns This RealTimeTimers instance.
     */
    clearTimers(): this;

    /**
     * Emit an update event.
     *
     * @returns This RealTimeTimers instance.
     */
    emitUpdateEvent(): this;
}
