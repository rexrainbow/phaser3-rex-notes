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
        tree?: BehaviorTree;
        trees?: BehaviorTree[];
        level?: Level;
        events?: Recorder.EventNames;
        format?: Format;
        formatter?: Format | Formatter;
        sink?: ISink | ((value: string) => void);
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
    constructor(config?: Logger.IConfig);

    tree: BehaviorTree | null;
    level: Logger.Level;
    recorder: Recorder;
    formatter: Logger.Formatter;
    write: Logger.Output;
    filter?: Recorder.FilterCallback;

    setTree(tree: BehaviorTree): this;
    setTrees(trees: BehaviorTree | BehaviorTree[]): this;
    start(): this;
    stop(): this;
    destroy(): void;

    onRecorderEvent(
        event: Recorder.IEventRecord,
        record: Recorder.IRecord | null | undefined,
        recorder: Recorder
    ): void;
}
