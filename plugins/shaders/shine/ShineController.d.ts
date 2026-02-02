// import * as Phaser from 'phaser';
export default ShineController;

declare namespace ShineController {
    /**
     * Configuration for a shine filter controller.
     */
    interface IConfig {
        /**
         * Shine animation speed.
         */
        speed?: number,
        /**
         * Width of the shine line.
         */
        lineWidth?: number,
        /**
         * Gradient falloff of the shine line.
         */
        gradient?: number,
        /**
         * Reveal mode toggle.
         */
        reveal?: boolean,
    }
}

/**
 * Controller for a shine filter on a camera.
 */
declare class ShineController extends Phaser.Filters.Controller {
    /**
     * Create a shine filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: ShineController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: ShineController.IConfig): this;

    /**
     * Set shine animation speed.
     *
     * @param value - Shine speed.
     * @returns This controller instance.
     */
    setSpeed(value: number): this;
    /**
     * Shine animation speed.
     */
    speed: number;

    /**
     * Set shine line width.
     *
     * @param width - Shine line width.
     * @returns This controller instance.
     */
    setLineWidth(width: number): this;
    /**
     * Width of the shine line.
     */
    lineWidth: number;

    /**
     * Set shine gradient falloff.
     *
     * @param gradient - Gradient falloff value.
     * @returns This controller instance.
     */
    setGradient(gradient: number): this;
    /**
     * Gradient falloff of the shine line.
     */
    gradient: number;

    /**
     * Set reveal mode.
     *
     * @param reveal - True to enable reveal mode.
     * @returns This controller instance.
     */
    setReveal(reveal: boolean): this;
    /**
     * Reveal mode toggle.
     */
    reveal: boolean;
}
