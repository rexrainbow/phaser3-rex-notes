// import * as Phaser from 'phaser';
export default WarpController;

declare namespace WarpController {
    /**
     * Configuration for a warp filter controller.
     */
    interface IConfig {
        /**
         * Horizontal warp frequency.
         */
        frequencyX?: number,
        /**
         * Vertical warp frequency.
         */
        frequencyY?: number,
        /**
         * Shared warp frequency for both axes.
         */
        frequency?: number,

        /**
         * Horizontal warp amplitude.
         */
        amplitudeX?: number,
        /**
         * Vertical warp amplitude.
         */
        amplitudeY?: number,
        /**
         * Shared warp amplitude for both axes.
         */
        amplitude?: number,

        /**
         * Horizontal warp animation speed.
         */
        speedX?: number,
        /**
         * Vertical warp animation speed.
         */
        speedY?: number,
        /**
         * Shared warp animation speed for both axes.
         */
        speed?: number,
        /**
         * Enable automatic time-based warp animation.
         */
        speedEnable?: boolean
    }
}

/**
 * Controller for a warp filter on a camera.
 */
declare class WarpController extends Phaser.Filters.Controller {
    /**
     * Create a warp filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: WarpController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: WarpController.IConfig): this;

    /**
     * Set warp frequency for both axes.
     *
     * If height is omitted, width is used for both axes.
     *
     * @param width - Horizontal frequency.
     * @param height - Vertical frequency.
     * @returns This controller instance.
     */
    setFrequency(
        width: number,
        height?: number
    ): this;
    /**
     * Set horizontal warp frequency.
     *
     * @param value - Horizontal frequency.
     * @returns This controller instance.
     */
    setFrequencyX(value: number): this;
    /**
     * Set vertical warp frequency.
     *
     * @param value - Vertical frequency.
     * @returns This controller instance.
     */
    setFrequencyY(value: number): this;
    /**
     * Horizontal warp frequency.
     */
    frequencyX: number;
    /**
     * Vertical warp frequency.
     */
    frequencyY: number;
    /**
     * Shared warp frequency.
     */
    frequency: number;

    /**
     * Set warp amplitude for both axes.
     *
     * If y is omitted, x is used for both axes.
     *
     * @param x - Horizontal amplitude.
     * @param y - Vertical amplitude.
     * @returns This controller instance.
     */
    setAmplitude(
        x: number,
        y?: number
    ): this;
    /**
     * Set horizontal warp amplitude.
     *
     * @param value - Horizontal amplitude.
     * @returns This controller instance.
     */
    setAmplitudeX(value: number): this;
    /**
     * Set vertical warp amplitude.
     *
     * @param value - Vertical amplitude.
     * @returns This controller instance.
     */
    setAmplitudeY(value: number): this;
    /**
     * Horizontal warp amplitude.
     */
    amplitudeX: number;
    /**
     * Vertical warp amplitude.
     */
    amplitudeY: number;
    /**
     * Shared warp amplitude.
     */
    amplitude: number;

    /**
     * Set horizontal warp animation speed.
     *
     * @param value - Horizontal speed.
     * @returns This controller instance.
     */
    setSpeedX(value: number): this;
    /**
     * Set vertical warp animation speed.
     *
     * @param value - Vertical speed.
     * @returns This controller instance.
     */
    setSpeedY(value: number): this;
    /**
     * Set warp animation speed for both axes.
     *
     * If y is omitted, x is used for both axes.
     *
     * @param x - Horizontal speed.
     * @param y - Vertical speed.
     * @returns This controller instance.
     */
    setSpeed(
        x: number,
        y?: number
    ): this;
    /**
     * Horizontal warp animation speed.
     */
    speedX: number;
    /**
     * Vertical warp animation speed.
     */
    speedY: number;
    /**
     * Warp animation speed vector.
     */
    speed: Phaser.Math.Vector2;

    /**
     * Enable or disable automatic warp animation.
     *
     * @param enable - True to enable animation updates.
     * @returns This controller instance.
     */
    setSpeedEnable(enable?: boolean): this;
    /**
     * Whether automatic warp animation is enabled.
     */
    speedEnable: boolean;
}
