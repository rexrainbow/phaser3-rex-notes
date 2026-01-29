import TimerTask from '../timerticktask/TimerTask.js';

export default EaseValueTaskBase;

/**
 * Base class for easing numeric values over time.
 */
declare class EaseValueTaskBase extends TimerTask {
    /**
     * Set delay time before start.
     *
     * @param time - Delay time in milliseconds.
     * @returns This EaseValueTaskBase instance.
     */
    setDelay(time: number): this;
    /**
     * Delay time in milliseconds.
     */
    delay: number;

    /**
     * Set duration of the easing.
     *
     * @param time - Duration in milliseconds.
     * @returns This EaseValueTaskBase instance.
     */
    setDuration(time: number): this;
    /**
     * Duration in milliseconds.
     */
    duration: number;

    /**
     * Set easing function name.
     *
     * @param ease - Easing function name.
     * @returns This EaseValueTaskBase instance.
     */
    setEase(ease: string): this;
    /**
     * Easing function name.
     */
    ease: string;

    /**
     * Start the task.
     *
     * @returns This EaseValueTaskBase instance.
     */
    start(): this;
    /**
     * Stop the task.
     *
     * @returns This EaseValueTaskBase instance.
     */
    stop(): this;
    /**
     * Restart the task.
     *
     * @returns This EaseValueTaskBase instance.
     */
    restart(): this;

    /**
     * Pause the task.
     *
     * @returns This EaseValueTaskBase instance.
     */
    pause(): this;
    /**
     * Resume the task.
     *
     * @returns This EaseValueTaskBase instance.
     */
    resume(): this;
    /**
     * Complete the task immediately.
     *
     * @returns This EaseValueTaskBase instance.
     */
    complete(): this;
    /**
     * Whether the task is currently running.
     */
    readonly isRunning: boolean;
}
