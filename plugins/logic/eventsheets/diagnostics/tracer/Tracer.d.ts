import EventSheetManager from '../../eventsheetmanager/EventSheetManager';
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
 * Stores EventSheetManager diagnostic events as structured records.
 */
declare class Tracer {
    /**
     * Create a Tracer.
     *
     * @param config - Tracer configuration.
     */
    constructor(config?: Tracer.IConfig);

    /**
     * First traced event sheet manager.
     */
    manager: EventSheetManager | null;
    /**
     * Underlying recorder.
     */
    recorder: Recorder;
    /**
     * Finalized records.
     */
    readonly records: Recorder.IRecord[];
    /**
     * Current active round record.
     */
    readonly currentRecord: Recorder.IRecord | null;
    /**
     * Last assigned round id.
     */
    readonly roundID: number;
    /**
     * Whether tracer is currently listening.
     */
    readonly isStarted: boolean;
    /**
     * Maximum finalized records to keep.
     */
    maxRecords: number;

    /**
     * Set the event sheet manager to trace.
     *
     * @param manager - EventSheetManager instance.
     * @returns This Tracer instance.
     */
    setManager(manager: EventSheetManager): this;

    /**
     * Set one or more event sheet managers to trace.
     *
     * @param managers - EventSheetManager instance or instances.
     * @returns This Tracer instance.
     */
    setManagers(managers: EventSheetManager | EventSheetManager[]): this;

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
     * Clear finalized records, current records, and the round counter.
     *
     * @returns This Tracer instance.
     */
    clear(): this;

    /**
     * Stop tracing and release recorder references.
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
