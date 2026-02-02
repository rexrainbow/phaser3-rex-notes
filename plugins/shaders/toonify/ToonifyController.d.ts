// import * as Phaser from 'phaser';

export default ToonifyController;

declare namespace ToonifyController {
    /**
     * Configuration for a toonify filter controller.
     */
    interface IConfig {
        /**
         * Edge detection threshold.
         */
        edgeThreshold?: number,
        /**
         * Number of hue quantization levels.
         */
        hueLevels?: number,
        /**
         * Number of saturation quantization levels.
         */
        satLevels?: number,
        /**
         * Number of value quantization levels.
         */
        valLevels?: number,
        /**
         * Edge color.
         */
        edgeColor?: number,
    }
}

/**
 * Controller for a toonify filter on a camera.
 */
declare class ToonifyController extends Phaser.Filters.Controller {
    /**
     * Create a toonify filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: ToonifyController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param o - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(o?: ToonifyController.IConfig): this;

    /**
     * Set edge detection threshold.
     *
     * @param value - Edge threshold value.
     * @returns This controller instance.
     */
    setEdgeThreshold(value: number): this;
    /**
     * Edge detection threshold.
     */
    edgeThreshold: number;

    /**
     * Set number of hue quantization levels.
     *
     * @param value - Hue levels.
     * @returns This controller instance.
     */
    setHueLevels(value: number): this;
    /**
     * Number of hue quantization levels.
     */
    hueLevels: number;

    /**
     * Set number of saturation quantization levels.
     *
     * @param value - Saturation levels.
     * @returns This controller instance.
     */
    setSatLevels(value: number): this;
    /**
     * Number of saturation quantization levels.
     */
    satLevels: number;

    /**
     * Set number of value quantization levels.
     *
     * @param value - Value levels.
     * @returns This controller instance.
     */
    setValLevels(value: number): this;
    /**
     * Number of value quantization levels.
     */
    valLevels: number;

    /**
     * Set edge color.
     *
     * @param value - Color as hex number or color object.
     * @returns This controller instance.
     */
    setEdgeColor(value: number | Phaser.Types.Display.ColorObject): this;
    /**
     * Edge color.
     */
    edgeColor: Phaser.Display.Color;
}
