
import ComponentBase from './ComponentBase';

export default TickTask;

declare namespace TickTask {
    interface IConfig extends ComponentBase.IConfig {
        /**
         * 0/'no' = never tick, 1/'lazy' = tick only when running, 2/'always' = always tick.
         */
        tickingMode?: 0 | 'no' | 1 | 'lazy' | 2 | 'always'
    }
}

/**
 * Base class for tasks driven by a ticking update loop.
 */
declare class TickTask extends ComponentBase {
    /**
     * Create the task and attach it to a parent.
     */
    constructor(
        parent?: Object,
        config?: TickTask.IConfig
    );

    /**
     * Start the task.
     */
    start(): this;
    /**
     * Pause the task.
     */
    pause(): this;
    /**
     * Resume the task.
     */
    resume(): this;
    /**
     * Stop the task.
     */
    stop(): this;
    /**
     * Mark the task as completed.
     */
    complete(): this;
    /**
     * True if the task is currently running.
     */
    isRunning: boolean;
    /**
     * True if the task is currently paused.
     */
    isPaused: boolean;
}
