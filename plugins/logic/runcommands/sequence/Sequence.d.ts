import EventEmitter from "../../../utils/eventemitter/EventEmitter";

export default Sequence;

declare namespace Sequence {
    /**
     * Configuration options for creating a Sequence.
     */
    interface IConfig {
        /**
         * Enable yoyo playback.
         */
        yoyo?: boolean,
        /**
         * Repeat count.
         */
        repeat?: number,
        /**
         * Enable infinite loop.
         */
        loop?: boolean,

        /**
         * Event emitter instance or false to disable.
         */
        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        /**
         * Callback fired when sequence completes.
         *
         * @param actionScope - Scope used for action execution.
         * @param seq - Sequence instance.
         */
        type CompleteCallbackType = (actionScope: object, seq: Sequence) => void;
    }
}

/**
 * Command sequence runner with repeat and loop controls.
 */
declare class Sequence extends EventEmitter {
    /**
     * Create a Sequence.
     *
     * @param config - Configuration options.
     */
    constructor(config?: Sequence.IConfig);

    /**
     * Load commands and action scope.
     *
     * @param commands - Command queue.
     * @param actionScope - Scope used for action execution.
     * @returns This Sequence instance.
     */
    load(
        commands: any[],
        actionScope: object
    ): this;

    /**
     * Start sequence execution.
     *
     * @returns This Sequence instance.
     */
    start(): this;

    /**
     * Cancel sequence execution.
     *
     * @returns This Sequence instance.
     */
    cancel(): this;

    /**
     * Stop sequence execution.
     *
     * @returns This Sequence instance.
     */
    stop(): this;

    /**
     * Current sequence state value.
     */
    readonly state: number;
    /**
     * Whether sequence has completed.
     */
    readonly completed: boolean;

    /**
     * Enable or disable yoyo playback.
     *
     * @param yoyo - Yoyo state.
     * @returns This Sequence instance.
     */
    setYoyo(yoyo?: boolean): this;
    /**
     * Yoyo playback state.
     */
    yoyo: boolean;

    /**
     * Set repeat count.
     *
     * @param count - Repeat count.
     * @returns This Sequence instance.
     */
    setRepeat(count: number): this;
    /**
     * Repeat count.
     */
    readonly repeat: number;

    /**
     * Enable or disable loop mode.
     *
     * @param loop - Loop state.
     * @returns This Sequence instance.
     */
    setLoop(loop?: boolean): this;
    /**
     * Loop mode state.
     */
    loop: boolean;
}
