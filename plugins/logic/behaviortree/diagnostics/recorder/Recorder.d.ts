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
     */
    type FilterCallback = (
        event: IEventRecord,
        record: IRecord | null | undefined,
        recorder: Recorder
    ) => boolean;

    /**
     * Callback invoked after an event is accepted.
     */
    type EventCallback = (
        event: IEventRecord,
        record: IRecord | null | undefined,
        recorder: Recorder
    ) => void;

    /**
     * Callback invoked when a tick record is finalized.
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

    setTree(tree: BehaviorTree): this;
    setTrees(trees: BehaviorTree | BehaviorTree[]): this;
    start(): this;
    stop(): this;
    startTree(tree: BehaviorTree): this;
    stopTree(tree: BehaviorTree): this;
    clear(): this;
    destroy(): void;

    getRecords(): Recorder.IRecord[];
    getLastRecord(): Recorder.IRecord | undefined;
    getCurrentRecord(): Recorder.IRecord | null;
    toJSON(): Recorder.IRecord[];

    createNodeEventHandler(eventName: string): (node: BaseNode, tick: Tick) => void;
    hasEvent(eventName: string): boolean;
    addEvent(event: Recorder.IEventRecord, tick: Tick): void;
    createNodeRecord(type: string, node: BaseNode, tick: Tick): Recorder.IEventRecord;
}
