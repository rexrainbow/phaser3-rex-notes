// import * as Phaser from 'phaser';
export default SwirlController;

declare namespace SwirlController {
    /**
     * Configuration for a swirl filter controller.
     */
    interface IConfig {
        /**
         * Swirl radius.
         */
        radius?: number,

        /**
         * Swirl rotation in radians.
         */
        rotation?: number,
        /**
         * Swirl rotation in degrees.
         */
        angle?: number,

        /**
         * Swirl center in camera space.
         */
        center?: {
            /**
             * Center x coordinate.
             */
            x?: number,
            /**
             * Center y coordinate.
             */
            y?: number,
        }
    }
}

/**
 * Controller for a swirl filter on a camera.
 */
declare class SwirlController extends Phaser.Filters.Controller {
    /**
     * Create a swirl filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: SwirlController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: SwirlController.IConfig): this;

    /**
     * Set swirl center.
     *
     * If x is omitted, the camera center is used.
     *
     * @param x - Center x coordinate.
     * @param y - Center y coordinate.
     * @returns This controller instance.
     */
    setCenter(
        x: number,
        y?: number
    ): this;
    /**
     * Swirl center x coordinate.
     */
    centerX: number;
    /**
     * Swirl center y coordinate.
     */
    centerY: number;

    /**
     * Set swirl rotation in radians.
     *
     * @param radians - Rotation in radians.
     * @returns This controller instance.
     */
    setRotation(radians: number): this;
    /**
     * Swirl rotation in radians.
     */
    rotation: number;
    /**
     * Set swirl rotation in degrees.
     *
     * @param degrees - Rotation in degrees.
     * @returns This controller instance.
     */
    setAngle(degrees: number): this;
    /**
     * Swirl rotation in degrees.
     */
    angle: number;

    /**
     * Set swirl radius.
     *
     * @param value - Swirl radius.
     * @returns This controller instance.
     */
    setRadius(value: number): this;
    /**
     * Swirl radius.
     */
    radius: number;
}
