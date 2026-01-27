import TickTask from '../../utils/componentbase/TickTask';

export default Rotate;

declare namespace Rotate {

    /**
     * Rotate configuration.
     */
    interface IConfig {
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * Rotation speed in radians per second.
         */
        speed?: number,
        /**
         * Time scale factor.
         */
        timeScale?: number
    }
}

/**
 * Rotate behavior for a game object.
 */
declare class Rotate extends TickTask {
    /**
     * Create a Rotate behavior.
     * @param gameObject - Target game object.
     * @param config - Rotate configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Rotate.IConfig
    );

    /**
     * Enable or disable the behavior.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * True if enabled.
     */
    enable: boolean;

    /**
     * Set rotation speed.
     * @param speed - Speed value.
     * @returns This instance.
     */
    setSpeed(speed: number): this;
    /**
     * Rotation speed in radians per second.
     */
    speed: number;
}
