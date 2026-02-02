export default BarrelContrtoller;

declare namespace BarrelContrtoller {
    /**
     * Configuration for a barrel filter controller.
     */
    interface IConfig {
        /**
         * Enable shrink mode.
         */
        shrink?: boolean,
        /**
         * Distortion center in camera space.
         */
        center?: {
            /**
             * Center x coordinate.
             */
            x?: number,
            /**
             * Center y coordinate.
             */
            y?: number
        },
        /**
         * Distortion radius.
         */
        radius?: number,
        /**
         * Distortion power factor.
         */
        power?: number,
        /**
         * Distortion intensity.
         */
        intensity?: number,
    }
}

/**
 * Controller for a barrel distortion filter on a camera.
 */
declare class BarrelContrtoller extends Phaser.Filters.Controller {
    /**
     * Create a barrel filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: BarrelContrtoller.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param o - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(o?: BarrelContrtoller.IConfig): this;

    /**
     * Set shrink mode.
     *
     * @param mode - True to enable shrink mode.
     * @returns This controller instance.
     */
    setShrinkMode(mode?: boolean): this;
    /**
     * Whether shrink mode is enabled.
     */
    shrinkMode: boolean;

    /**
     * Set distortion center.
     *
     * If x is undefined, the camera center is used.
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
     * Distortion center x coordinate.
     */
    centerX: number;
    /**
     * Distortion center y coordinate.
     */
    centerY: number;

    /**
     * Set distortion radius.
     *
     * @param value - Radius value.
     * @returns This controller instance.
     */
    setRadius(value: number): this;
    /**
     * Distortion radius.
     */
    radius: number;

    /**
     * Set distortion power.
     *
     * @param power - Power factor.
     * @returns This controller instance.
     */
    setPower(power: number): this;
    /**
     * Distortion power factor.
     */
    power: this;

    /**
     * Set distortion intensity.
     *
     * @param value - Intensity value.
     * @returns This controller instance.
     */
    setIntensity(value: number): this;
    /**
     * Distortion intensity.
     */
    intensity: number;
}
