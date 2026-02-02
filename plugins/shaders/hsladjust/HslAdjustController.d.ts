// import * as Phaser from 'phaser';
export default HslAdjustController;

declare namespace HslAdjustController {
    /**
     * Configuration for an HSL adjust filter controller.
     */
    interface IConfig {
        /**
         * Hue rotation factor.
         */
        hueRotate?: number,
        /**
         * Saturation adjustment factor.
         */
        satAdjust?: number,
        /**
         * Luminance adjustment factor.
         */
        lumAdjust?: number
    }
}

/**
 * Controller for an HSL adjust filter on a camera.
 */
declare class HslAdjustController extends Phaser.Filters.Controller {
    /**
     * Create an HSL adjust filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: HslAdjustController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param o - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(o?: HslAdjustController.IConfig): this;

    /**
     * Set hue rotation factor.
     *
     * @param value - Hue rotation value.
     * @returns This controller instance.
     */
    setHueRotate(value: number): this;
    /**
     * Hue rotation factor.
     */
    hueRotate: number;

    /**
     * Set saturation adjustment factor.
     *
     * @param value - Saturation adjustment value.
     * @returns This controller instance.
     */
    setSatAdjust(value: number): this;
    /**
     * Saturation adjustment factor.
     */
    satAdjust: number;

    /**
     * Set luminance adjustment factor.
     *
     * @param value - Luminance adjustment value.
     * @returns This controller instance.
     */
    setLumAdjust(value: number): this;
    /**
     * Luminance adjustment factor.
     */
    lumAdjust: number;
}
