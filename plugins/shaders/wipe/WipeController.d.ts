// import * as Phaser from 'phaser';
export default WipeController;

declare namespace WipeController {
    /**
     * Configuration for a wipe filter controller.
     */
    interface IConfig {
        /**
         * Transition progress in range 0 to 1.
         */
        progress?: number,
        /**
         * Width of the wipe band in range 0 to 1.
         */
        wipeWidth?: number,
        /**
         * Wipe direction.
         */
        direction?: 0 | 1,
        /**
         * Wipe axis.
         */
        axis?: 0 | 1,

        /**
         * Enable reveal mode. Overrides wipe when provided.
         */
        reveal?: boolean,
        /**
         * Enable wipe mode when true, reveal mode when false.
         */
        wipe?: boolean,
    }
}

/**
 * Controller for a wipe or reveal filter on a camera.
 */
declare class WipeController extends Phaser.Filters.Controller {
    /**
     * Create a wipe filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: WipeController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: WipeController.IConfig): this;

    /**
     * Set transition progress.
     *
     * Value is clamped to range 0 to 1.
     *
     * @param value - Progress value.
     * @returns This controller instance.
     */
    setProgress(value: number): this;
    /**
     * Transition progress in range 0 to 1.
     */
    progress: number;

    /**
     * Set wipe band width.
     *
     * Value is clamped to range 0 to 1.
     *
     * @param width - Wipe band width.
     * @returns This controller instance.
     */
    setWipeWidth(width: number): this;
    /**
     * Wipe band width in range 0 to 1.
     */
    wipeWidth: number;

    /**
     * Set wipe direction.
     *
     * @param value - Direction value.
     * @returns This controller instance.
     */
    setDirection(value: 0 | 1): this;
    /**
     * Wipe direction.
     */
    direction: 0 | 1;

    /**
     * Set wipe axis.
     *
     * @param value - Axis value.
     * @returns This controller instance.
     */
    setAxis(value: 0 | 1): this;
    /**
     * Wipe axis.
     */
    axis: 0 | 1;

    /**
     * Enable wipe mode.
     *
     * @returns This controller instance.
     */
    enableWipeMode(): this;
    /**
     * Enable reveal mode.
     *
     * @returns This controller instance.
     */
    enableRevealMode(): this;
    /**
     * Whether reveal mode is enabled.
     */
    reveal: boolean;
}
