// import * as Phaser from 'phaser';

export default ShockwaveController;

declare namespace ShockwaveController {
    /**
     * Configuration for a shockwave filter controller.
     */
    interface IConfig {
        /**
         * Shockwave center in camera space.
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

        /**
         * Shockwave radius.
         */
        waveRadius?: number,
        /**
         * Shockwave band width.
         */
        waveWidth?: number,
        /**
         * Base scale of the power curve.
         */
        powBaseScale?: number,
        /**
         * Exponent of the power curve.
         */
        powExponent?: number,
    }
}

/**
 * Controller for a shockwave filter on a camera.
 */
declare class ShockwaveController extends Phaser.Filters.Controller {
    /**
     * Create a shockwave filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: ShockwaveController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: ShockwaveController.IConfig): this;

    /**
     * Set shockwave center.
     *
     * If x is omitted, the camera center is used.
     *
     * @param x - Center x coordinate.
     * @param y - Center y coordinate.
     * @returns This controller instance.
     */
    setCenter(
        x?: number,
        y?: number
    ): this;
    /**
     * Shockwave center x coordinate.
     */
    centerX: number;
    /**
     * Shockwave center y coordinate.
     */
    centerY: number;

    /**
     * Set shockwave radius.
     *
     * @param value - Shockwave radius.
     * @returns This controller instance.
     */
    setWaveRadius(value: number): this;
    /**
     * Shockwave radius.
     */
    waveRadius: number;

    /**
     * Set shockwave band width.
     *
     * @param value - Shockwave band width.
     * @returns This controller instance.
     */
    setWaveWidth(value: number): this;
    /**
     * Shockwave band width.
     */
    waveWidth: number;

    /**
     * Set base scale of the power curve.
     *
     * @param value - Base scale value.
     * @returns This controller instance.
     */
    setPowBaseScale(value: number): this;
    /**
     * Base scale of the power curve.
     */
    powBaseScale: number;

    /**
     * Set exponent of the power curve.
     *
     * @param value - Exponent value.
     * @returns This controller instance.
     */
    setPowExponent(value: number): this;
    /**
     * Exponent of the power curve.
     */
    powExponent: number;

}
