import BBCodeLog from '../../../../../bbcodelog';

export default BBCodeSink;

declare namespace BBCodeSink {
    /**
     * Configuration options for creating a BBCodeSink.
     */
    interface IConfig extends BBCodeLog.IConfig {
    }
}

/**
 * Logger sink that writes BBCode formatted text to the browser console.
 */
declare class BBCodeSink {
    /**
     * Create a BBCodeSink.
     *
     * @param config - BBCodeLog configuration.
     */
    constructor(config?: BBCodeSink.IConfig);

    /**
     * Underlying BBCode console logger.
     */
    logger: BBCodeLog;

    /**
     * Enable or disable console output.
     *
     * @param enable - Whether to enable output.
     * @returns This BBCodeSink instance.
     */
    setEnable(enable?: boolean): this;

    /**
     * Write formatted BBCode text.
     *
     * @param value - BBCode formatted text.
     * @returns This BBCodeSink instance.
     */
    write(value: string): this;
}
