// import * as Phaser from 'phaser';
export default OutlineController;

declare namespace OutlineController {
    /**
     * Configuration for an outline filter controller.
     */
    interface IConfig {
        /**
         * Outline thickness in pixels.
         */
        thickness?: number,
        /**
         * Outline color.
         */
        outlineColor?: number,
        /**
         * Outline sampling quality.
         */
        quality?: number
    }
}

/**
 * Controller for an outline filter on a camera.
 */
declare class OutlineController extends Phaser.Filters.Controller {
    /**
     * Create an outline filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: OutlineController.IConfig
    );

    /**
     * Set outline thickness.
     *
     * @param value - Outline thickness in pixels.
     * @returns This controller instance.
     */
    setThickness(value: number): this;
    /**
     * Outline thickness in pixels.
     */
    thickness: number;

    /**
     * Set outline color.
     *
     * @param value - Color as hex number or color object.
     * @returns This controller instance.
     */
    setOutlineColor(value: number | Phaser.Types.Display.ColorObject): this;
    /**
     * Outline color.
     */
    outlineColor: Phaser.Display.Color;

    /**
     * Set global outline quality.
     *
     * @param quality - Outline sampling quality.
     */
    static setQuality(quality: number): void;
    /**
     * Get global outline quality.
     *
     * @returns Current outline sampling quality.
     */
    static getQuality(): number;
}
