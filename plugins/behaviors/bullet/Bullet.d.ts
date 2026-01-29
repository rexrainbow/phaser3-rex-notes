import TickTask from '../../utils/componentbase/TickTask';

export default Bullet;

declare namespace Bullet {

    /**
     * Bullet configuration.
     */
    interface IConfig {
        /**
         * Move speed.
         */
        speed?: number,
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * True to wrap at bounds.
         */
        wrap?: boolean,
        /**
         * Padding for wrapping.
         */
        padding?: number,

        /**
         * Angle in degrees.
         */
        angle?: number,
        /**
         * Rotation in radians.
         */
        rotation?: number,
    }
}

/**
 * Bullet movement component.
 */
declare class Bullet extends TickTask {
    /**
     * Create a Bullet component.
     * @param gameObject - Target game object.
     * @param config - Bullet configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Bullet.IConfig
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
     * Set move speed.
     * @param speed - Speed value.
     * @returns This instance.
     */
    setSpeed(speed: number): this;
    /**
     * Move speed value.
     */
    speed: number;

    /**
     * Set angle in degrees.
     * @param angle - Angle in degrees.
     * @returns This instance.
     */
    setAngle(angle?: number): this;
    /**
     * Angle in degrees.
     */
    angle: number | undefined;

    /**
     * Set rotation in radians.
     * @param rotation - Rotation in radians.
     * @returns This instance.
     */
    setRotation(rotation?: number): this;
    /**
     * Rotation in radians.
     */
    rotation: number | undefined;
}
