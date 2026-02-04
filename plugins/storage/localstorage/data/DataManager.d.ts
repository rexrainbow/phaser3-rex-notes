export default DataManager;

declare namespace DataManager {
    /**
     * Configuration options for creating a local-storage DataManager.
     */
    interface IConfig {
        /**
         * Storage namespace name.
         */
        name?: string,
        /**
         * Load data on initialization.
         */
        load?: boolean,
        /**
         * Default key-value data.
         */
        default?: { [key: string]: any },
        /**
         * Reset stored data before loading.
         */
        reset?: boolean
    }
}

/**
 * DataManager with local-storage persistence support.
 */
declare class DataManager extends Phaser.Data.DataManager {
    /**
     * Create a DataManager with config only.
     *
     * @param config - Configuration options.
     */
    constructor(
        config?: DataManager.IConfig
    );

    /**
     * Create a DataManager with parent and config.
     *
     * @param parent - Parent object.
     * @param config - Configuration options.
     */
    constructor(
        parent?: object,
        config?: DataManager.IConfig
    );

    /**
     * Create a DataManager with parent, event emitter, and config.
     *
     * @param parent - Parent object.
     * @param eventEmitter - Event emitter instance.
     * @param config - Configuration options.
     */
    constructor(
        parent?: object,
        eventEmitter?: Phaser.Events.EventEmitter,
        config?: DataManager.IConfig
    );

    /**
     * Load persisted data.
     *
     * @param defaultValue - Default key-value data.
     * @param reset - Reset stored data before load.
     * @returns This DataManager instance.
     */
    load(
        defaultValue?: { [key: string]: any },
        reset?: boolean
    ): this;

    /**
     * Get default value by key.
     *
     * @param key - Data key.
     * @returns The default value.
     */
    getDefaultValue(key: string): any;
}
