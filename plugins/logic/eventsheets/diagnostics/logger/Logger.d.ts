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
     */
    type Formatter = (
        event: Recorder.IEventRecord,
        record: Recorder.IRecord | null | undefined,
        recorder: Recorder
    ) => string | undefined;

    /**
     * Output callback.
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

    setManager(manager: EventSheetManager): this;
    setManagers(managers: EventSheetManager | EventSheetManager[]): this;
    start(): this;
    stop(): this;
    destroy(): void;

    onRecorderEvent(
        event: Recorder.IEventRecord,
        record: Recorder.IRecord | null | undefined,
        recorder: Recorder
    ): void;
}
