export default DataManager;

/**
 * Data manager with versioned snapshot, commit, and restore support.
 */
declare class DataManager extends Phaser.Data.DataManager {
    /**
     * Create a restorable data manager.
     *
     * @param parent - Parent object that owns this data manager.
     * @param eventEmitter - Optional event emitter used by this data manager.
     */
    constructor(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter
    );

    /**
     * Create a restorable data manager with initialization config.
     *
     * @param parent - Parent object that owns this data manager.
     * @param eventEmitter - Optional event emitter used by this data manager.
     * @param config - Optional initial configuration object.
     */
    constructor(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter,
        config?: object
    );

    /**
     * Commit current data as a new version snapshot.
     *
     * @param alias - Optional alias name for this committed version.
     * @returns This data manager instance.
     */
    commit(alias?: string): this;

    /**
     * Restore data from a committed version snapshot.
     *
     * @param version - Version number or alias to restore.
     * @param restoreFromVersion0 - Set to true to replay from the initial version.
     * @returns This data manager instance.
     */
    restore(
        version?: string | number,
        restoreFromVersion0?: boolean
    ): this;

    /**
     * Set current working version.
     *
     * @param value - Version number or alias.
     */
    set version(value: string | number);
    /**
     * Get current working version number.
     */
    get version(): number;
    /**
     * Latest committed version number.
     */
    readonly lastVersion: number;

    /**
     * Alias of the current working version.
     */
    readonly versionAlias: string;
    /**
     * List of all registered version aliases.
     */
    readonly versionAliases: string[];

    /**
     * Serialize current state and version data to JSON.
     *
     * @returns Serialized plain object.
     */
    toJSON(): object;
    /**
     * Reset this manager from a serialized object.
     *
     * @param o - Serialized object data.
     * @returns This data manager instance.
     */
    resetFromJSON(o?: object): this;
}
