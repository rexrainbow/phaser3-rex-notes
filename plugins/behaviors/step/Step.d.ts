import TickTask from '../../utils/componentbase/TickTask';

export default Step;

declare namespace Step {
    /**
     * Step configuration.
     */
    interface IConfig {
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * Step length in pixels.
         */
        stepLength?: number,
    }
}

/**
 * Step movement component.
 */
declare class Step extends TickTask {
    /**
     * Create a Step component.
     * @param gameObject - Target game object.
     * @param config - Step configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Step.IConfig
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
     * Set step length.
     * @param stepLength - Step length in pixels.
     * @returns This instance.
     */
    setStepLength(stepLength: number): this;
    /**
     * Step length in pixels.
     */
    stepLength: number;

    /**
     * Cancel current step.
     * @returns This instance.
     */
    cancelStep(): this;

}
