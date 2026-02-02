// import * as Phaser from 'phaser';
export default CrossStitchingController;

declare namespace CrossStitchingController {
    /**
     * Configuration for a cross stitching filter controller.
     */
    interface IConfig {
        /**
         * Stitching cell width.
         */
        stitchingWidth?: number,
        /**
         * Stitching cell height.
         */
        stitchingHeight?: number,
        /**
         * Stitching brightness in range 0 to 1.
         */
        brightness?: number,
    }
}

/**
 * Controller for a cross stitching filter on a camera.
 */
declare class CrossStitchingController extends Phaser.Filters.Controller {
    /**
     * Create a cross stitching filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: CrossStitchingController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param o - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(o?: CrossStitchingController.IConfig): this;

    /**
     * Set stitching cell width.
     *
     * @param value - Stitching cell width.
     * @returns This controller instance.
     */
    setStitchingWidth(value: number): this;
    /**
     * Stitching cell width.
     */
    stitchingWidth: number;
    /**
     * Set stitching cell height.
     *
     * @param value - Stitching cell height.
     * @returns This controller instance.
     */
    setStitchingHeight(value: number): this;
    /**
     * Set stitching cell size.
     *
     * If height is omitted, width is used for both dimensions.
     *
     * @param width - Stitching cell width.
     * @param height - Stitching cell height.
     * @returns This controller instance.
     */
    setStitchingSize(
        width: number,
        height?: number
    ): this;
    /**
     * Stitching cell height.
     */
    stitchingHeight: number;

    /**
     * Set stitching brightness.
     *
     * Value is clamped to range 0 to 1.
     *
     * @param value - Stitching brightness.
     * @returns This controller instance.
     */
    setBrightness(value: number): this;
    /**
     * Stitching brightness in range 0 to 1.
     */
    brightness: number;
}
