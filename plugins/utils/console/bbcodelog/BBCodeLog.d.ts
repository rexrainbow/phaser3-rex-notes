export default BBCodeLog;

declare namespace BBCodeLog {
    /**
     * Configuration options for creating a BBCodeLog.
     */
    interface IConfig {
        /**
         * BBCode delimiters.
         */
        delimiters?: string | [string, string];
        /**
         * Enable logging.
         */
        enable?: boolean;
    }
}

/**
 * Console logger with BBCode support.
 */
declare class BBCodeLog {
    /**
     * Create a BBCodeLog.
     *
     * @param config - Configuration options.
     */
    constructor(config?: BBCodeLog.IConfig);

    /**
     * Enable or disable logging.
     *
     * @param enable - Whether to enable logging.
     * @returns This BBCodeLog instance.
     */
    setEnable(enable?: boolean): this;

    /**
     * Log a message.
     *
     * @param s - Message string.
     * @param logType - Log type name.
     * @returns This BBCodeLog instance.
     */
    log(
        s: string | null,
        logType?: string
    ): this;

}
