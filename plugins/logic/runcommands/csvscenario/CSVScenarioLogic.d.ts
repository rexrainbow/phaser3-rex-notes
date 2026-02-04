import Timer from './timer/Timer';

export default CSVScenarioLogic;

declare namespace CSVScenarioLogic {
    /**
     * Time unit type.
     */
    type TimeUnitType = 0 | 1 | 'ms' | 's' | 'sec';
    /**
     * Argument conversion callback.
     *
     * @param s - Source argument string.
     * @param instruction - Current instruction array.
     * @returns Converted value.
     */
    type ConvertCallbackType = (
        s: string,
        instruction: any[]
    ) => any;

    /**
     * Configuration options for creating CSVScenarioLogic.
     */
    interface IConfig {
        /**
         * Time unit of timeline values.
         */
        timeUnit?: TimeUnitType,
        /**
         * Prefix pattern for command rows.
         */
        prefix?: RegExp,
        /**
         * Enable or customize argument conversion.
         */
        argsConvert?: true | ConvertCallbackType,
        /**
         * Scope for argument conversion callback.
         */
        argsConvertScope?: object,
        /**
         * CSV delimiter.
         */
        delimiter?: string,
        /**
         * Callback to map command names.
         */
        translateCommandNameCallback?: (commandName: string) => string,
    }

    /**
     * Start configuration.
     */
    interface IStartConfig {
        /**
         * Label to start from.
         */
        label?: string
        /**
         * Start offset time.
         */
        offset?: number
    }

    namespace Events {
        /**
         * Callback fired when scenario completes.
         *
         * @param scope - Action scope.
         * @param scenario - Scenario instance.
         */
        type CompleteCallbackType = (
            scope: object,
            scenario: CSVScenarioLogic
        ) => void;

        /**
         * Callback fired when label changes.
         *
         * @param lastLabel - New label.
         * @param prevLabel - Previous label.
         * @param scope - Action scope.
         * @param scenario - Scenario instance.
         */
        type LabelChangeCallbackType = (
            lastLabel: string,
            prevLabel: string,
            scope: object,
            scenario: CSVScenarioLogic
        ) => void;

        /**
         * Callback fired for log messages.
         *
         * @param msg - Log message.
         * @param scope - Action scope.
         * @param scenario - Scenario instance.
         */
        type LogCallbackType = (
            msg: string,
            scope: object,
            scenario: CSVScenarioLogic
        ) => void;

        /**
         * Callback fired on errors.
         *
         * @param msg - Error message.
         * @param scope - Action scope.
         * @param scenario - Scenario instance.
         */
        type ErrorCallbackType = (
            msg: string,
            scope: object,
            scenario: CSVScenarioLogic
        ) => void;
    }
}

/**
 * CSV-driven scenario logic runner.
 */
declare class CSVScenarioLogic extends Phaser.Events.EventEmitter {
    /**
     * Create a CSVScenarioLogic instance.
     *
     * @param parent - Parent object.
     * @param config - Configuration options.
     */
    constructor(
        parent?: Object,
        config?: CSVScenarioLogic.IConfig
    );

    /**
     * Initialize scenario logic.
     *
     * @param parent - Parent object.
     * @param config - Configuration options.
     * @returns This CSVScenarioLogic instance.
     */
    boot(
        parent?: Object,
        config?: CSVScenarioLogic.IConfig
    ): this;

    /**
     * Create timer instance.
     *
     * @param parent - Parent object.
     * @param config - Configuration options.
     * @returns Timer instance.
     */
    createTimer(
        parent?: Object,
        config?: CSVScenarioLogic.IConfig
    ): Timer;

    /**
     * Load CSV scenario.
     *
     * @param csvString - CSV content.
     * @param scope - Action scope.
     * @param config - Configuration options.
     * @returns This CSVScenarioLogic instance.
     */
    load(
        csvString: string,
        scope: object,
        config?: CSVScenarioLogic.IConfig
    ): this;
    /**
     * Current action scope.
     */
    scope: object;

    /**
     * Append CSV commands.
     *
     * @param csvString - CSV content.
     * @returns This CSVScenarioLogic instance.
     */
    append(csvString: string): this;

    /**
     * Start scenario playback.
     *
     * @param config - Start configuration.
     * @returns This CSVScenarioLogic instance.
     */
    start(config?: CSVScenarioLogic.IStartConfig): this;
    /**
     * Play scenario playback.
     *
     * @param config - Start configuration.
     * @returns This CSVScenarioLogic instance.
     */
    play(config?: CSVScenarioLogic.IStartConfig): this;
    /**
     * Play scenario and return completion promise.
     *
     * @param config - Start configuration.
     * @returns Promise resolved on completion.
     */
    playPromise(config?: CSVScenarioLogic.IStartConfig): Promise<any>;

    /**
     * Continue playback on event name.
     *
     * @param eventName - Event name.
     * @returns This CSVScenarioLogic instance.
     */
    continue(eventName: string): this;
    /**
     * Force continue playback.
     *
     * @param force - Force flag.
     * @returns This CSVScenarioLogic instance.
     */
    continue(force: true): this;

    /**
     * Pause playback.
     *
     * @returns This CSVScenarioLogic instance.
     */
    pause(): this;

    /**
     * Resume playback.
     *
     * @returns This CSVScenarioLogic instance.
     */
    resume(): this;

    /**
     * Clear loaded scenario data.
     *
     * @returns This CSVScenarioLogic instance.
     */
    clear(): this;

    /**
     * Whether scenario is running.
     */
    readonly isRunning: boolean;
    /**
     * Whether scenario is paused.
     */
    readonly isPaused: boolean;
    /**
     * Last visited label.
     */
    readonly lastLabel: string;
    /**
     * Last custom command name.
     */
    readonly lastCustomCommandName: string;
    /**
     * Previous label.
     */
    readonly previousLabel: string;

    /**
     * Set time scale.
     *
     * @param timeScale - Time scale value.
     * @returns This CSVScenarioLogic instance.
     */
    setTimeScale(timeScale: number): this;
    /**
     * Current time scale.
     */
    timeScale: number;
}
