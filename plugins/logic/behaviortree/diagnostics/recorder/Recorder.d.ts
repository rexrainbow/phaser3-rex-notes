import BehaviorTree from '../../behaviortree/BehaviorTree';
import BaseNode from '../../nodes/BaseNode';
import Tick from '../../tick/Tick';

export default Recorder;

declare namespace Recorder {
    /**
     * Event names recorded by diagnostics.
     */
    type EventNames = 'all' | string | string[];

    /**
     * Filter callback for deciding whether to keep an event record.
     *
     * @param event - Event record.
     * @param record - Current tick record.
     * @param recorder - Recorder instance.
     * @returns False to skip the event.
     */
    type FilterCallback = (
        event: IEventRecord,
        record: IRecord | null | undefined,
        recorder: Recorder
    ) => boolean;

    /**
     * Callback invoked after an event is accepted.
     *
     * @param event - Event record.
     * @param record - Current tick record.
     * @param recorder - Recorder instance.
     */
    type EventCallback = (
        event: IEventRecord,
        record: IRecord | null | undefined,
        recorder: Recorder
    ) => void;

    /**
     * Callback invoked when a tick record is finalized.
     *
     * @param record - Finalized tick record.
     * @param recorder - Recorder instance.
     */
    type RecordCallback = (
        record: IRecord,
        recorder: Recorder
    ) => void;

    /**
     * Configuration options for creating a Recorder.
     */
    interface IConfig {
        tree?: BehaviorTree;
        trees?: BehaviorTree[];
        maxRecords?: number;
        events?: EventNames;
        includeNode?: boolean;
        includeNodeMemory?: boolean;
        includeOpenNodes?: boolean;
        includeTime?: boolean;
        autoStart?: boolean;
        autoEnable?: boolean;
        filter?: FilterCallback;
        onEvent?: EventCallback;
        onRecord?: RecordCallback;
    }

    /**
     * One normalized event in a tick record.
     */
    interface IEventRecord {
        type: string;
        treeID: string | number;
        tickID: number;
        time?: number;
        nodeID?: string | number;
        nodeName?: string;
        nodeTitle?: string;
        category?: string;
        depth?: number;
        status?: number;
        statusName?: string;
        nodeCount?: number;
        openNodeIDs?: Array<string | number>;
        message?: string;
        data?: unknown;
        memory?: unknown;
        [key: string]: unknown;
    }

    /**
     * One behavior tree tick record.
     */
    interface IRecord {
        type: 'bt.tick';
        treeID: string | number;
        tickID: number;
        events: IEventRecord[];
        startTime?: number;
        endTime?: number;
        status?: number;
        statusName?: string;
        nodeCount?: number;
        openNodeIDs?: Array<string | number>;
    }
}

/**
 * Records BehaviorTree runtime events into structured tick records.
 */
declare class Recorder {
    /**
     * Create a Recorder.
     *
     * @param config - Recorder configuration.
     */
    constructor(config?: Recorder.IConfig);

    readonly tree: BehaviorTree | null;
    trees: BehaviorTree[];
    maxRecords: number;
    events: string[];
    includeNode: boolean;
    includeNodeMemory: boolean;
    includeOpenNodes: boolean;
    includeTime: boolean;
    autoEnable: boolean;
    records: Recorder.IRecord[];
    currentRecord: Recorder.IRecord | null;
    currentRecords: Record<string, Recorder.IRecord>;
    tickID: number;
    isStarted: boolean;

    /**
     * Set the behavior tree to record.
     *
     * @param tree - BehaviorTree instance.
     * @returns This Recorder instance.
     */
    setTree(tree: BehaviorTree): this;

    /**
     * Set one or more behavior trees to record.
     *
     * @param trees - BehaviorTree instance or instances.
     * @returns This Recorder instance.
     */
    setTrees(trees: BehaviorTree | BehaviorTree[]): this;

    /**
     * Start listening to diagnostic events on all configured trees.
     *
     * @returns This Recorder instance.
     */
    start(): this;

    /**
     * Stop listening to diagnostic events on all configured trees.
     *
     * @returns This Recorder instance.
     */
    stop(): this;

    /**
     * Start listening to diagnostic events on a behavior tree.
     *
     * @param tree - BehaviorTree instance.
     * @returns This Recorder instance.
     */
    startTree(tree: BehaviorTree): this;

    /**
     * Stop listening to diagnostic events on a behavior tree.
     *
     * @param tree - BehaviorTree instance.
     * @returns This Recorder instance.
     */
    stopTree(tree: BehaviorTree): this;

    /**
     * Clear finalized records and current records.
     *
     * @returns This Recorder instance.
     */
    clear(): this;

    /**
     * Stop recording and release tree and callback references.
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

    /**
     * Create a node event handler for a behavior tree event name.
     *
     * @param eventName - Behavior tree diagnostic event name.
     * @returns Event handler function.
     */
    createNodeEventHandler(eventName: string): (node: BaseNode, tick: Tick) => void;

    /**
     * Check whether an event name should be recorded.
     *
     * @param eventName - Diagnostic event name.
     * @returns True if the event should be recorded.
     */
    hasEvent(eventName: string): boolean;

    /**
     * Add an event record to the current tick record.
     *
     * @param event - Event record to add.
     * @param tick - Current tick instance.
     */
    addEvent(event: Recorder.IEventRecord, tick: Tick): void;

    /**
     * Create a normalized node event record.
     *
     * @param type - Diagnostic event name.
     * @param node - Behavior tree node.
     * @param tick - Current tick instance.
     * @returns Normalized node event record.
     */
    createNodeRecord(type: string, node: BaseNode, tick: Tick): Recorder.IEventRecord;
}
