// import * as Phaser from 'phaser';
export default CircleController;

declare namespace CircleController {
    /**
     * Configuration for a circle filter controller.
     */
    interface IConfig {
        /**
         * Ring thickness.
         */
        thickness?: number,
        /**
         * Ring scale factor.
         */
        scale?: number,
        /**
         * Edge feather amount.
         */
        feather?: number,
        /**
         * Ring color as a hex number.
         */
        color?: number,
        /**
         * Background color as a hex number.
         */
        backgroundColor?: number,
        /**
         * Background alpha in range 0 to 1.
         */
        backgroundAlpha?: number
    }
}

/**
 * Controller for a circle filter on a camera.
 */
declare class CircleController extends Phaser.Filters.Controller {
    /**
     * Create a circle filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: CircleController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: CircleController.IConfig): this;

    /**
     * Set ring thickness.
     *
     * @param thickness - Ring thickness.
     * @returns This controller instance.
     */
    setThickness(thickness: number): this;
    /**
     * Ring thickness.
     */
    thickness: number;

    /**
     * Set ring scale factor.
     *
     * @param scale - Ring scale factor.
     * @returns This controller instance.
     */
    setScale(scale: number): this;
    /**
     * Ring scale factor.
     */
    scale: number;

    /**
     * Set edge feather amount.
     *
     * @param feather - Edge feather amount.
     * @returns This controller instance.
     */
    setFeather(feather: number): this;
    /**
     * Edge feather amount.
     */
    feather: number;

    /**
     * Set ring color.
     *
     * @param color - Color value in hex numeric format.
     * @returns This controller instance.
     */
    setColor(color: number): this;
    /**
     * Ring color as a hex number.
     */
    color: number;

    /**
     * Set background color.
     *
     * @param color - Color value in hex numeric format.
     * @returns This controller instance.
     */
    setBackgroundColor(color: number): this;
    /**
     * Background color as a hex number.
     */
    backgroundColor: number;

    /**
     * Set background alpha.
     *
     * @param alpha - Alpha value in range 0 to 1.
     * @returns This controller instance.
     */
    setBackgroundAlpha(alpha: number): this;
    /**
     * Background alpha in range 0 to 1.
     */
    backgroundAlpha: number;
}
