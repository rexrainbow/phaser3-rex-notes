import TickTask from '../../utils/componentbase/TickTask';

export default ShakePosition;

declare namespace ShakePosition {

    /**
     * Shake mode identifiers.
     */
    type ModeType = 0 | 1 | 'effect' | 'behavior';    
    /**
     * Magnitude mode identifiers.
     */
    type MagnitudeModeType = 0 | 1 | 'constant' | 'decay';
    /**
     * Axis mode identifiers.
     */
    type AixsModeType = 0 | 1 | 2 | 'both' | 'h&v' | 'horizontal' | 'h' | 'vertical' | 'v';

    /**
     * ShakePosition configuration.
     */
    interface IConfig {
        /**
         * Shake mode.
         */
        mode?: ModeType,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Shake magnitude.
         */
        magnitude?: number,
        /**
         * Magnitude mode.
         */
        magnitudeMode?: MagnitudeModeType,
        /**
         * Axis mode.
         */
        axis?: AixsModeType,
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
             * ShakePosition component.
             */
            shake: ShakePosition
        ) => void;
    }

}

/**
 * Shake position effect component.
 */
declare class ShakePosition extends TickTask {
    /**
     * Create a ShakePosition component.
     * @param gameObject - Target game object.
     * @param config - ShakePosition configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ShakePosition.IConfig
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
     * Trigger a shake.
     * @param duration - Duration in ms.
     * @param magnitude - Shake magnitude.
     * @returns This instance.
     */
    shake(
        duration?: number,
        magnitude?: number
    ): this;
    /**
     * Trigger a shake with config.
     * @param config - Shake configuration.
     * @returns This instance.
     */
    shake(config: {
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Shake magnitude.
         */
        magnitude?: number,
    }): this;

    /**
     * Set shake mode.
     * @param mode - Mode identifier.
     * @returns This instance.
     */
    setMode(mode: ShakePosition.ModeType): this;
    /**
     * Current mode value.
     */
    mode: number;

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
     * Set magnitude.
     * @param magnitude - Magnitude value.
     * @returns This instance.
     */
    setMagnitude(magnitude: number): this;
    /**
     * Magnitude value.
     */
    magnitude: number;

    /**
     * Set magnitude mode.
     * @param magnitudeMode - Magnitude mode.
     * @returns This instance.
     */
    setMagnitudeMode(magnitudeMode: ShakePosition.MagnitudeModeType): this;
    /**
     * Magnitude mode value.
     */
    magnitudeMode: number;

    /**
     * Set axis mode.
     * @param axisMode - Axis mode.
     * @returns This instance.
     */
    setAxisMode(axisMode: ShakePosition.AixsModeType): this;
    /**
     * Axis mode value.
     */
    axisMode: number;

}
