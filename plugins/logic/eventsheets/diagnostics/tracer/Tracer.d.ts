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

    setManager(manager: EventSheetManager): this;
    setManagers(managers: EventSheetManager | EventSheetManager[]): this;
    start(): this;
    stop(): this;
    clear(): this;
    destroy(): void;

    getRecords(): Recorder.IRecord[];
    getLastRecord(): Recorder.IRecord | undefined;
    getCurrentRecord(groupName?: string, manager?: EventSheetManager): Recorder.IRecord | null | undefined;
    toJSON(): Recorder.IRecord[];
}
