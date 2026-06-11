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
    /**
     * Create a Tracer.
     *
     * @param config - Tracer configuration.
     */
    constructor(config?: Tracer.IConfig);

    tree: BehaviorTree | null;
    recorder: Recorder;
    readonly records: Recorder.IRecord[];
    readonly currentRecord: Recorder.IRecord | null;
    readonly tickID: number;
    readonly isStarted: boolean;
    maxRecords: number;

    /**
     * Set the behavior tree to trace.
     *
     * @param tree - BehaviorTree instance.
     * @returns This Tracer instance.
     */
    setTree(tree: BehaviorTree): this;

    /**
     * Set one or more behavior trees to trace.
     *
     * @param trees - BehaviorTree instance or instances.
     * @returns This Tracer instance.
     */
    setTrees(trees: BehaviorTree | BehaviorTree[]): this;

    /**
     * Start tracing diagnostic events.
     *
     * @returns This Tracer instance.
     */
    start(): this;

    /**
     * Stop tracing diagnostic events.
     *
     * @returns This Tracer instance.
     */
    stop(): this;

    /**
     * Clear finalized records and current records.
     *
     * @returns This Tracer instance.
     */
    clear(): this;

    /**
     * Stop tracing and release recorder references.
     */
    destroy(): void;

    /**
     * Get finalized tick records.
     *
     * @returns Finalized tick records.
     */
    getRecords(): Recorder.IRecord[];

    /**
     * Get the latest finalized tick record.
     *
     * @returns Latest finalized record, or undefined if no record exists.
     */
    getLastRecord(): Recorder.IRecord | undefined;

    /**
     * Get the current active tick record.
     *
     * @returns Current active tick record, or null if no tick is active.
     */
    getCurrentRecord(): Recorder.IRecord | null;

    /**
     * Get finalized tick records for JSON serialization.
     *
     * @returns Finalized tick records.
     */
    toJSON(): Recorder.IRecord[];
}
