import TickTask from '../../utils/componentbase/TickTask';

export default RotateTo;

declare namespace RotateTo {

    /**
     * Rotation direction identifiers.
     */
    type DirectionType = 0 | 1 | 2 | 'cw' | 'ccw';

    /**
     * RotateTo configuration.
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
             * RotateTo component.
             */
            rotateTo: RotateTo
        ) => void;
    }
}

/**
 * Rotate-to behavior for a game object.
 */
declare class RotateTo extends TickTask {
    /**
     * Create a RotateTo behavior.
     * @param gameObject - Target game object.
     * @param config - RotateTo configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: RotateTo.IConfig
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
     * Rotate toward a world position.
     * @param x - Target world x.
     * @param y - Target world y.
     * @param direction - Rotation direction.
     * @param speed - Override speed value.
     * @returns This instance.
     */
    rotateTowardsPosition(
        x: number,
        y: number,
        direction?: RotateTo.DirectionType,
        speed?: number
    ): this;

    /**
     * Rotate to a target angle.
     * @param degrees - Target angle in degrees.
     * @param direction - Rotation direction.
     * @param speed - Override speed value.
     * @returns This instance.
     */
    rotateTo(
        degrees: number,
        direction?: RotateTo.DirectionType,
        speed?: number
    ): this;

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
