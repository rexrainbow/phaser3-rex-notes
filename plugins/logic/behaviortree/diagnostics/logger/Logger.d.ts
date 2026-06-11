import BehaviorTree from '../../behaviortree/BehaviorTree';
import Recorder from '../recorder/Recorder';

export default Logger;

declare namespace Logger {
    /**
     * Logger detail level.
     */
    type Level = 'error' | 'status' | 'tick' | 'verbose' | string;

    /**
     * Built-in text formatter name.
     */
    type Format = 'compact' | 'json' | 'bbcode';

    /**
     * Formatter callback.
     *
     * @param event - Event record to format.
     * @param record - Current tick record.
     * @param recorder - Recorder instance.
     * @returns Text to output, or undefined to skip output.
     */
    type Formatter = (
        event: Recorder.IEventRecord,
        record: Recorder.IRecord | null | undefined,
        recorder: Recorder
    ) => string | undefined;

    /**
     * Output callback.
     *
     * @param value - Formatted text.
     * @param event - Event record that produced the text.
     * @param record - Current tick record.
     * @param recorder - Recorder instance.
     */
    type Output = (
        value: string,
        event: Recorder.IEventRecord,
        record: Recorder.IRecord | null | undefined,
        recorder: Recorder
    ) => void;

    /**
     * Writable output sink.
     */
    interface ISink {
        /**
         * Write formatted text.
         *
         * @param value - Formatted text.
         */
        write(value: string): void;
    }

    /**
     * Console-like output sink.
     */
    interface ILogSink {
        /**
         * Log formatted text.
         *
         * @param value - Formatted text.
         */
        log(value: string): void;
    }

    /**
     * Configuration options for creating a Logger.
     */
    interface IConfig {
        tree?: BehaviorTree;
        trees?: BehaviorTree[];
        level?: Level;
        events?: Recorder.EventNames;
        format?: Format;
        formatter?: Format | Formatter;
        sink?: ISink | ILogSink | ((value: string) => void);
        output?: Output;
        filter?: Recorder.FilterCallback;
        includeNode?: boolean;
        includeNodeMemory?: boolean;
        includeOpenNodes?: boolean;
        includeTime?: boolean;
        autoStart?: boolean;
        autoEnable?: boolean;
    }
}

/**
 * Logs BehaviorTree diagnostic events as text.
 */
declare class Logger {
    /**
     * Create a Logger.
     *
     * @param config - Logger configuration.
     */
    constructor(config?: Logger.IConfig);

    tree: BehaviorTree | null;
    level: Logger.Level;
    recorder: Recorder;
    formatter: Logger.Formatter;
    write: Logger.Output;
    filter?: Recorder.FilterCallback;

    /**
     * Set the behavior tree to log.
     *
     * @param tree - BehaviorTree instance.
     * @returns This Logger instance.
     */
    setTree(tree: BehaviorTree): this;

    /**
     * Set one or more behavior trees to log.
     *
     * @param trees - BehaviorTree instance or instances.
     * @returns This Logger instance.
     */
    setTrees(trees: BehaviorTree | BehaviorTree[]): this;

    /**
     * Start logging diagnostic events.
     *
     * @returns This Logger instance.
     */
    start(): this;

    /**
     * Stop logging diagnostic events.
     *
     * @returns This Logger instance.
     */
    stop(): this;

    /**
     * Stop logging and release recorder, formatter, output, and filter references.
     */
    destroy(): void;

    /**
     * Handle an event accepted by the underlying recorder.
     *
     * @param event - Event record accepted by the recorder.
     * @param record - Current tick record.
     * @param recorder - Recorder instance.
     */
    onRecorderEvent(
        event: Recorder.IEventRecord,
        record: Recorder.IRecord | null | undefined,
        recorder: Recorder
    ): void;
}
