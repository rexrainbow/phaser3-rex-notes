// import * as Phaser from 'phaser';
export default GradientController;

declare namespace GradientController {
    /**
     * Configuration for a gradient filter controller.
     */
    interface IConfig {
        /**
         * Overall gradient alpha.
         */
        alpha?: number,
        /**
         * Gradient start x coordinate.
         */
        fromX?: number,
        /**
         * Gradient start y coordinate.
         */
        fromY?: number,
        /**
         * Gradient end x coordinate.
         */
        toX?: number,
        /**
         * Gradient end y coordinate.
         */
        toY?: number,
        /**
         * First gradient color as a hex number.
         */
        color1?: number,
        /**
         * Second gradient color as a hex number.
         */
        color2?: number,
        /**
         * Gradient size parameter.
         */
        size?: number
    }
}

/**
 * Controller for a gradient filter on a camera.
 */
declare class GradientController extends Phaser.Filters.Controller {
    /**
     * Create a gradient filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: GradientController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: GradientController.IConfig): this;

    /**
     * Set overall gradient alpha.
     *
     * @param alpha - Alpha value.
     * @returns This controller instance.
     */
    setAlpha(alpha?: number): this;
    /**
     * Overall gradient alpha.
     */
    alpha: number;

    /**
     * Set gradient start position.
     *
     * @param x - Start x coordinate.
     * @param y - Start y coordinate.
     * @returns This controller instance.
     */
    setFromPosition(
        x: number,
        y: number
    ): this;
    /**
     * Gradient start x coordinate.
     */
    fromX: number;
    /**
     * Gradient start y coordinate.
     */
    fromY: number;

    /**
     * Set gradient end position.
     *
     * @param x - End x coordinate.
     * @param y - End y coordinate.
     * @returns This controller instance.
     */
    setToPosition(
        x: number,
        y: number
    ): this;
    /**
     * Gradient end x coordinate.
     */
    toX: number;
    /**
     * Gradient end y coordinate.
     */
    toY: number;

    /**
     * Set first gradient color.
     *
     * @param color1 - Color value in hex numeric format.
     * @returns This controller instance.
     */
    setColor1(color1: number): this;
    /**
     * First gradient color as a hex number.
     */
    color1: number;

    /**
     * Set second gradient color.
     *
     * @param color2 - Color value in hex numeric format.
     * @returns This controller instance.
     */
    setColor2(color2: number): this;
    /**
     * Second gradient color as a hex number.
     */
    color2: number;

    /**
     * Set gradient size parameter.
     *
     * @param size - Size value.
     * @returns This controller instance.
     */
    setSize(size: number): this;
    /**
     * Gradient size parameter.
     */
    size: number;
}
