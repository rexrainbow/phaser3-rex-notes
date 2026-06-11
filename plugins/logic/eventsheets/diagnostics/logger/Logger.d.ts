import EventSheetManager from '../../eventsheetmanager/EventSheetManager';
import Recorder from '../recorder/Recorder';

export default Logger;

declare namespace Logger {
    /**
     * Logger detail level.
     */
    type Level = 'error' | 'flow' | 'status' | 'verbose' | string;

    /**
     * Built-in text formatter name.
     */
    type Format = 'compact' | 'json';

    /**
     * Formatter callback.
     *
     * @param event - Event record to format.
     * @param record - Current round record.
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
     * @param record - Current round record.
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
     * Configuration options for creating a Logger.
     */
    interface IConfig {
        manager?: EventSheetManager;
        managers?: EventSheetManager[];
        level?: Level;
        events?: Recorder.EventNames;
        format?: Format;
        formatter?: Format | Formatter;
        sink?: ISink | ((value: string) => void);
        output?: Output;
        filter?: Recorder.FilterCallback;
        includeTime?: boolean;
        includeReferences?: boolean;
        includeParameters?: boolean;
        includeResult?: boolean;
        autoStart?: boolean;
    }
}

/**
 * Logs EventSheetManager diagnostic events as text.
 */
declare class Logger {
    /**
     * Create a Logger.
     *
     * @param config - Logger configuration.
     */
    constructor(config?: Logger.IConfig);

    /**
     * First logged event sheet manager.
     */
    manager: EventSheetManager | null;
    /**
     * Logger detail level.
     */
    level: Logger.Level;
    /**
     * Underlying recorder.
     */
    recorder: Recorder;
    /**
     * Formatter callback.
     */
    formatter: Logger.Formatter;
    /**
     * Output callback.
     */
    write: Logger.Output;
    /**
     * Event filter callback.
     */
    filter?: Recorder.FilterCallback;

    /**
     * Set the event sheet manager to log.
     *
     * @param manager - EventSheetManager instance.
     * @returns This Logger instance.
     */
    setManager(manager: EventSheetManager): this;

    /**
     * Set one or more event sheet managers to log.
     *
     * @param managers - EventSheetManager instance or instances.
     * @returns This Logger instance.
     */
    setManagers(managers: EventSheetManager | EventSheetManager[]): this;

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
     * @param record - Current round record.
     * @param recorder - Recorder instance.
     */
    onRecorderEvent(
        event: Recorder.IEventRecord,
        record: Recorder.IRecord | null | undefined,
        recorder: Recorder
    ): void;
}
