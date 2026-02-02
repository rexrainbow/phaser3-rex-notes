// import * as Phaser from 'phaser';
export default BloomController;

declare namespace BloomController {
    /**
     * Configuration for a bloom filter controller.
     */
    interface IConfig {
        /**
         * Number of bloom step pairs.
         */
        steps?: number,
        /**
         * Horizontal blur offset.
         */
        offsetX?: number,
        /**
         * Vertical blur offset.
         */
        offsetY?: number,
        /**
         * Per-step blur strength.
         */
        blurStrength?: number,
        /**
         * Bloom tint color as a hex number.
         */
        color?: number,
        /**
         * Final blend strength.
         */
        strength?: number,
    }
}

/**
 * Controller that manages a multi-step bloom filter pipeline.
 */
declare class BloomController extends Phaser.Filters.ParallelFilters {
    /**
     * Create a bloom filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: BloomController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: BloomController.IConfig): this;

    /**
     * Set the number of bloom step pairs.
     *
     * @param steps - Number of step pairs.
     * @returns This controller instance.
     */
    setSteps(steps: number): this;
    /**
     * Number of bloom step pairs.
     */
    steps: number;

    /**
     * Set horizontal and vertical blur offsets.
     *
     * @param x - Horizontal blur offset.
     * @param y - Vertical blur offset.
     * @returns This controller instance.
     */
    setOffset(
        x: number,
        y: number
    ): this;
    /**
     * Horizontal blur offset.
     */
    offsetX: number;
    /**
     * Vertical blur offset.
     */
    offsetY: number;

    /**
     * Set per-step blur strength.
     *
     * @param blurStrength - Per-step blur strength.
     * @returns This controller instance.
     */
    setBlurStrength(blurStrength: number): this;
    /**
     * Per-step blur strength.
     */
    blurStrength: number;

    /**
     * Set bloom tint color.
     *
     * @param color - Color value in hex numeric format.
     * @returns This controller instance.
     */
    setColor(color: number): this;
    /**
     * Bloom tint color as a hex number.
     */
    color: number;

    /**
     * Set final blend strength.
     *
     * @param strength - Final blend strength.
     * @returns This controller instance.
     */
    setStrength(strength: number): this;
    /**
     * Final blend strength.
     */
    strength: number;
}
