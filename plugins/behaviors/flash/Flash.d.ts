import TickTask from '../../utils/componentbase/TickTask';

export default Flash;

declare namespace Flash {

    /**
     * Flash configuration.
     */
    interface IConfig {
        /**
         * Flash duration in ms.
         */
        duration?: number,
        /**
         * Repeat count.
         */
        repeat?: number,
    }

    namespace Events {
        /**
         * Complete callback.
         */
        type CompleteCallbackType = (
            /**
             * Target game object.
             */
            gameObject: Phaser.GameObjects.GameObject,
            /**
             * Flash component.
             */
            flash: Flash
        ) => void;
    }
}

/**
 * Flash effect component.
 */
declare class Flash extends TickTask {
    /**
     * Create a Flash component.
     * @param gameObject - Target game object.
     * @param config - Flash configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Flash.IConfig
    );

    /**
     * Enable or disable the component.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * True if enabled.
     */
    enable: boolean;

    /**
     * Trigger a flash.
     * @param duration - Duration in ms.
     * @param repeat - Repeat count.
     * @returns This instance.
     */
    flash(
        duration?: number,
        repeat?: number
    ): this;
    /**
     * Trigger a flash with config.
     * @param config - Flash configuration.
     * @returns This instance.
     */
    flash(config: {
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Repeat count.
         */
        repeat?: number,
    }): this;

    /**
     * Set duration.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    setDuration(duration: number): this;
    /**
     * Duration in ms.
     */
    duration: number;

    /**
     * Set repeat count.
     * @param repeat - Repeat count.
     * @returns This instance.
     */
    setRepeat(repeat: number): this;
    /**
     * Repeat count.
     */
    repeat: number;
}
