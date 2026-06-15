import EventSheetManager from '../../eventsheetmanager/EventSheetManager';
import { BehaviorTree } from '../../../behaviortree';

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
     * @param record - Current round record.
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
     * @param record - Current round record.
     * @param recorder - Recorder instance.
     */
    type EventCallback = (
        event: IEventRecord,
        record: IRecord | null | undefined,
        recorder: Recorder
    ) => void;

    /**
     * Callback invoked when a round record is finalized.
     *
     * @param record - Finalized round record.
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
        /**
         * Event sheet manager to record.
         */
        manager?: EventSheetManager;
        /**
         * Event sheet managers to record.
         */
        managers?: EventSheetManager[];
        /**
         * Maximum finalized records to keep. Set 0 to disable history.
         */
        maxRecords?: number;
        /**
         * Event names to record.
         */
        events?: EventNames;
        /**
         * Include timestamps.
         */
        includeTime?: boolean;
        /**
         * Include runtime object references in event records.
         */
        includeReferences?: boolean;
        /**
         * Include command parameters.
         */
        includeParameters?: boolean;
        /**
         * Include command result values.
         */
        includeResult?: boolean;
        /**
         * Start recording after construction when managers are provided.
         */
        autoStart?: boolean;
        /**
         * Event filter callback.
         */
        filter?: FilterCallback;
        /**
         * Event callback.
         */
        onEvent?: EventCallback;
        /**
         * Finalized record callback.
         */
        onRecord?: RecordCallback;
    }

    /**
     * Recorded condition expression data.
     */
    type ConditionExpression =
        string |
        number |
        boolean |
        {
            name?: string;
            parameters?: Record<string, unknown>;
            [key: string]: unknown;
        };

    /**
     * One normalized event in a round record.
     */
    interface IEventRecord {
        /**
         * Event name.
         */
        type: string;
        /**
         * Stable manager id assigned by the recorder.
         */
        managerID?: number;
        /**
         * Event sheet group name.
         */
        groupName?: string;
        /**
         * Round id.
         */
        roundID?: number;
        /**
         * Event timestamp.
         */
        time?: number;
        /**
         * Event sheet title.
         */
        sheetTitle?: string;
        /**
         * Event sheet titles.
         */
        sheetTitles?: string[];
        /**
         * Event sheet id.
         */
        sheetID?: string | number;
        /**
         * Behavior-tree status code.
         */
        status?: number;
        /**
         * Behavior-tree status name.
         */
        statusName?: string;
        /**
         * Sheet-level condition result.
         */
        conditionPassed?: boolean;
        /**
         * Skip reason.
         */
        reason?: string;
        /**
         * Label title.
         */
        labelTitle?: string;
        /**
         * Command name.
         */
        commandName?: string;
        /**
         * Command parameters.
         */
        parameters?: unknown;
        /**
         * Command success result.
         */
        success?: boolean;
        /**
         * Command return value.
         */
        result?: unknown;
        /**
         * Condition expression.
         */
        expression?: ConditionExpression;
        /**
         * Condition type, for example sheet, branch, while, or embedded.
         */
        conditionType?: string;
        /**
         * Child expression index that determined the condition result, or -1 when no child caused an early return.
         */
        returnIndex?: number;
        /**
         * Child expression that determined the condition result.
         */
        returnExpression?: ConditionExpression;
        /**
         * Child expression value that determined the condition result.
         */
        returnValue?: unknown;
        /**
         * Completed repeat iteration index, 1-based.
         */
        iterationIndex?: number;
        /**
         * Maximum repeat loop count.
         */
        maxLoop?: number;
        /**
         * Node id.
         */
        nodeID?: string | number;
        /**
         * Node name.
         */
        nodeName?: string;
        /**
         * Node title.
         */
        nodeTitle?: string;
        /**
         * Keyboard key for pause.key events.
         */
        key?: string;
        /**
         * Event sheet manager reference, available when includeReferences is true.
         */
        manager?: EventSheetManager;
        /**
         * Event sheet reference, available when includeReferences is true.
         */
        eventSheet?: BehaviorTree;
        /**
         * Event sheet group reference, available when includeReferences is true.
         */
        eventSheetGroup?: unknown;
        /**
         * Node reference, available when includeReferences is true.
         */
        node?: unknown;
        /**
         * Additional event data.
         */
        [key: string]: unknown;
    }

    /**
     * One event sheet group execution record.
     */
    interface IRecord {
        /**
         * Record type.
         */
        type: 'eventsheet.round';
        /**
         * Stable manager id assigned by the recorder.
         */
        managerID: number;
        /**
         * Event sheet group name.
         */
        groupName: string;
        /**
         * Round id.
         */
        roundID: number;
        /**
         * Recorded events in this round.
         */
        events: IEventRecord[];
        /**
         * Start timestamp.
         */
        startTime?: number;
        /**
         * End timestamp.
         */
        endTime?: number;
        /**
         * Final round status name.
         */
        statusName?: string;
    }
}

/**
 * Records EventSheetManager events into structured round records.
 */
declare class Recorder {
    /**
     * Create a Recorder.
     *
     * @param config - Recorder configuration.
     */
    constructor(config?: Recorder.IConfig);

    /**
     * First recorded event sheet manager.
     */
    readonly manager: EventSheetManager | null;
    /**
     * Recorded event sheet managers.
     */
    managers: EventSheetManager[];
    /**
     * Maximum finalized records to keep.
     */
    maxRecords: number;
    /**
     * Event names to record.
     */
    events: string[];
    /**
     * Finalized records.
     */
    records: Recorder.IRecord[];
    /**
     * Current active round record.
     */
    currentRecord: Recorder.IRecord | null;
    /**
     * Current active records keyed by manager and group.
     */
    currentRecords: Record<string, Recorder.IRecord>;
    /**
     * Last assigned round id.
     */
    roundID: number;
    /**
     * Whether recorder is currently listening.
     */
    isStarted: boolean;

    /**
     * Set the event sheet manager to record.
     *
     * @param manager - EventSheetManager instance.
     * @returns This Recorder instance.
     */
    setManager(manager: EventSheetManager): this;

    /**
     * Set one or more event sheet managers to record.
     *
     * @param managers - EventSheetManager instance or instances.
     * @returns This Recorder instance.
     */
    setManagers(managers: EventSheetManager | EventSheetManager[]): this;

    /**
     * Start listening to diagnostic events on all configured managers.
     *
     * @returns This Recorder instance.
     */
    start(): this;

    /**
     * Stop listening to diagnostic events on all configured managers.
     *
     * @returns This Recorder instance.
     */
    stop(): this;

    /**
     * Clear finalized records, current records, and the round counter.
     *
     * @returns This Recorder instance.
     */
    clear(): this;

    /**
     * Stop recording and release manager and callback references.
     */
    destroy(): void;

    /**
     * Get finalized round records.
     *
     * @returns Finalized round records.
     */
    getRecords(): Recorder.IRecord[];

    /**
     * Get the latest finalized round record.
     *
     * @returns Latest finalized record, or undefined if no record exists.
     */
    getLastRecord(): Recorder.IRecord | undefined;

    /**
     * Get the current active round record.
     *
     * @param groupName - Event sheet group name. If omitted, returns the latest active record.
     * @param manager - EventSheetManager instance. If omitted, uses the first configured manager.
     * @returns Current active record, null, or undefined.
     */
    getCurrentRecord(
        groupName?: string,
        manager?: EventSheetManager
    ): Recorder.IRecord | null | undefined;

    /**
     * Get finalized round records for JSON serialization.
     *
     * @returns Finalized round records.
     */
    toJSON(): Recorder.IRecord[];
}
