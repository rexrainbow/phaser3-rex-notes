export default CrtController;

declare namespace CrtController {
    /**
     * Configuration for a CRT filter controller.
     */
    interface IConfig {
        /**
         * Horizontal warp factor.
         */
        warpX?: number,
        /**
         * Vertical warp factor.
         */
        warpY?: number,
        /**
         * Scan line strength.
         */
        scanLineStrength?: number,
    }
}

/**
 * Controller for a CRT filter on a camera.
 */
declare class CrtController extends Phaser.Filters.Controller {
    /**
     * Create a CRT filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: CrtController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param o - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(o?: CrtController.IConfig): this;

    /**
     * Set horizontal and vertical warp factors.
     *
     * @param warpX - Horizontal warp factor.
     * @param warpY - Vertical warp factor.
     * @returns This controller instance.
     */
    setWarp(
        warpX: number,
        warpY: number
    ): this;
    /**
     * Horizontal warp factor.
     */
    warpX: number;
    /**
     * Vertical warp factor.
     */
    warpY: number;

    /**
     * Set scan line strength.
     *
     * @param value - Scan line strength.
     * @returns This controller instance.
     */
    setScanLineStrength(value: number): this;
    /**
     * Scan line strength.
     */
    scanLineStrength: number;

    /**
     * Set scan line width.
     *
     * @param value - Scan line width.
     * @returns This controller instance.
     */
    setScanLineWidth(value: number): this;
    /**
     * Scan line width.
     */
    scanLineWidth: number;

}
