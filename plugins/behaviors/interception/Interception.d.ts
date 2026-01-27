import TickTask from '../../utils/componentbase/TickTask';

export default Interception;

declare namespace Interception {

    /**
     * Interception configuration.
     */
    interface IConfig {
        /**
         * Target game object.
         */
        target?: Phaser.GameObjects.GameObject,
        /**
         * True to enable.
         */
        enable?: boolean
    }
}

/**
 * Interception steering behavior.
 */
declare class Interception extends TickTask {
    /**
     * Create an Interception component.
     * @param gameObject - Target game object.
     * @param config - Interception configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Interception.IConfig
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
     * Set target game object.
     * @param gameObject - Target game object.
     * @returns This instance.
     */
    setTarget(
        gameObject?: Phaser.GameObjects.GameObject
    ): this;
    /**
     * Target game object.
     */
    target: Phaser.GameObjects.GameObject | undefined;

    /**
     * Predicted intercept position.
     */
    readonly predictedPosition: { x: number, y: number };
    /**
     * Predicted intercept angle.
     */
    readonly predictedAngle: number;
}
