export default AwayTime;

declare namespace AwayTime {
    /**
     * Configuration options for creating AwayTime.
     */
    interface IConfig {
        /**
         * Storage key.
         */
        key?: string,
        /**
         * Period in milliseconds.
         */
        peropd?: number
    }
}
/**
 * Tracks time elapsed between sessions.
 */
declare class AwayTime {
    /**
     * Create an AwayTime instance.
     *
     * @param config - Configuration options.
     */
    constructor(config?: AwayTime.IConfig);

    /**
     * Current away time in milliseconds.
     */
    readonly awayTime: number;

    /**
     * Set the storage key.
     *
     * @param key - Storage key.
     * @returns This AwayTime instance.
     */
    setKey(key: string): this;
    /**
     * Set the tracking period.
     *
     * @param time - Period in milliseconds.
     * @returns This AwayTime instance.
     */
    setPeriod(time: number): this;
}
