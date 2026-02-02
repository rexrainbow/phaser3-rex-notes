// import * as Phaser from 'phaser';

export default ColorReplaceController;

declare namespace ColorReplaceController {
    /**
     * Configuration for a color replace filter controller.
     */
    interface IConfig {
        /**
         * Source color to be replaced.
         */
        originalColor?: number,
        /**
         * Replacement color.
         */
        newColor?: number,
        /**
         * Color match tolerance.
         */
        epsilon?: number,
    }
}

/**
 * Controller for replacing one color with another in a filter pass.
 */
declare class ColorReplaceController extends Phaser.Filters.Controller {
    /**
     * Create a color replace filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: ColorReplaceController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param o - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(o?: ColorReplaceController.IConfig): this;

    /**
     * Set color match tolerance.
     *
     * @param value - Tolerance value.
     * @returns This controller instance.
     */
    setEpsilon(value: number): this;
    /**
     * Color match tolerance.
     */
    epsilon: number;

    /**
     * Set source color to replace.
     *
     * @param value - Source color as hex number or color object.
     * @returns This controller instance.
     */
    setOriginalColor(value: number | Phaser.Types.Display.ColorObject): this;
    /**
     * Source color to replace.
     */
    originalColor: Phaser.Display.Color;

    /**
     * Set replacement color.
     *
     * @param value - Replacement color as hex number or color object.
     * @returns This controller instance.
     */
    setNewColor(value: number | Phaser.Types.Display.ColorObject): this;
    /**
     * Replacement color.
     */
    newColor: Phaser.Display.Color;
}
