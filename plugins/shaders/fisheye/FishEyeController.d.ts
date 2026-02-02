export default FishEyeController;

declare namespace FishEyeController {
    /**
     * Fish eye distortion mode.
     */
    type ModeType = 0 | 1 | 'asin' | 'sin';

    /**
     * Configuration for a fish eye filter controller.
     */
    interface IConfig {
        /**
         * Fish eye distortion mode.
         */
        mode?: ModeType,
        /**
         * Distortion center in camera space.
         */
        center?: {
            /**
             * Center x coordinate.
             */
            x?: number,
            /**
             * Center y coordinate.
             */
            y?: number
        },
        /**
         * Distortion radius.
         */
        radius?: number,
        /**
         * Distortion intensity.
         */
        intensity?: number,

    }
}

/**
 * Controller for a fish eye filter on a camera.
 */
declare class FishEyeController extends Phaser.Filters.Controller {
    /**
     * Create a fish eye filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: FishEyeController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param o - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(o?: FishEyeController.IConfig): this;

    /**
     * Set fish eye mode.
     *
     * @param mode - Mode value or mode name.
     * @returns This controller instance.
     */
    setFishEyeMode(mode: number | string): this;
    /**
     * Fish eye mode as numeric value.
     */
    fishEyeMode: number;

    /**
     * Set distortion center.
     *
     * If x is undefined, the camera center is used.
     *
     * @param x - Center x coordinate.
     * @param y - Center y coordinate.
     * @returns This controller instance.
     */
    setCenter(
        x: number,
        y?: number
    ): this;
    /**
     * Distortion center x coordinate.
     */
    centerX: number;
    /**
     * Distortion center y coordinate.
     */
    centerY: number;

    /**
     * Set distortion radius.
     *
     * @param value - Radius value.
     * @returns This controller instance.
     */
    setRadius(value: number): this;
    /**
     * Distortion radius.
     */
    radius: number;

    /**
     * Set distortion intensity.
     *
     * @param value - Intensity value.
     * @returns This controller instance.
     */
    setIntensity(value: number): this;
    /**
     * Distortion intensity.
     */
    intensity: number;
}
