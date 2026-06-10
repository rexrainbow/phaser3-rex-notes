import BehaviorTree from '../../behaviortree/BehaviorTree';
import Recorder from '../recorder/Recorder';

export default Tracer;

declare namespace Tracer {
    /**
     * Configuration options for creating a Tracer.
     */
    interface IConfig extends Recorder.IConfig {
    }
}

/**
 * Stores BehaviorTree diagnostic events as structured records.
 */
declare class Tracer {
    constructor(config?: Tracer.IConfig);

    tree: BehaviorTree | null;
    recorder: Recorder;
    readonly records: Recorder.IRecord[];
    readonly currentRecord: Recorder.IRecord | null;
    readonly tickID: number;
    readonly isStarted: boolean;
    maxRecords: number;

    setTree(tree: BehaviorTree): this;
    setTrees(trees: BehaviorTree | BehaviorTree[]): this;
    start(): this;
    stop(): this;
    clear(): this;
    destroy(): void;

    getRecords(): Recorder.IRecord[];
    getLastRecord(): Recorder.IRecord | undefined;
    getCurrentRecord(): Recorder.IRecord | null;
    toJSON(): Recorder.IRecord[];
}
