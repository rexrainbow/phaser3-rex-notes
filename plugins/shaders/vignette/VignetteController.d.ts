// import * as Phaser from 'phaser';
export default VignetteController;

declare namespace VignetteController {
    /**
     * Configuration for a vignette filter controller.
     */
    interface IConfig {
        /**
         * Vignette center x coordinate.
         */
        x?: number,
        /**
         * Vignette center y coordinate.
         */
        y?: number,
        /**
         * Vignette radius.
         */
        radius?: number,
        /**
         * Vignette strength.
         */
        strength?: number,
    }
}

/**
 * Controller for a vignette filter on a camera.
 */
declare class VignetteController extends Phaser.Filters.Controller {
    /**
     * Create a vignette filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: VignetteController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: VignetteController.IConfig): this;

    /**
     * Set vignette center position.
     *
     * @param x - Center x coordinate.
     * @param y - Center y coordinate.
     * @returns This controller instance.
     */
    setPosition(
        x: number,
        y: number
    ): this;
    /**
     * Vignette center x coordinate.
     */
    x: number;
    /**
     * Vignette center y coordinate.
     */
    y: number;

    /**
     * Set vignette radius.
     *
     * @param radius - Radius value.
     * @returns This controller instance.
     */
    setRadius(radius: number): this;
    /**
     * Vignette radius.
     */
    radius: number;

    /**
     * Set vignette strength.
     *
     * @param strength - Strength value.
     * @returns This controller instance.
     */
    setStrength(strength: number): this;
    /**
     * Vignette strength.
     */
    strength: number;
}
