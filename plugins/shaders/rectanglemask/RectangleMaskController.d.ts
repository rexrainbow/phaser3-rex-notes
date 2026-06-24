// import * as Phaser from 'phaser';

export default RectangleMaskController;

declare namespace RectangleMaskController {
    /**
     * Configuration for a rectangle mask filter controller.
     */
    interface IConfig {
        /**
         * The rectangle x coordinate in filter-space pixels.
         */
        x?: number,

        /**
         * The rectangle y coordinate in filter-space pixels.
         */
        y?: number,

        /**
         * The rectangle width in filter-space pixels.
         */
        width?: number,

        /**
         * The rectangle height in filter-space pixels.
         */
        height?: number,

        /**
         * Whether to invert the mask.
         */
        invert?: boolean,

        /**
         * Feather size in pixels.
         */
        feather?: number,
    }
}

/**
 * Controller for a rectangle mask filter on a camera.
 */
declare class RectangleMaskController extends Phaser.Filters.Controller {
    /**
     * Create a rectangle mask filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: RectangleMaskController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: RectangleMaskController.IConfig): this;

    /**
     * Set rectangle bounds in filter-space pixels.
     *
     * @param x - Rectangle x coordinate.
     * @param y - Rectangle y coordinate.
     * @param width - Rectangle width.
     * @param height - Rectangle height.
     * @returns This controller instance.
     */
    setRectangle(
        x?: number,
        y?: number,
        width?: number,
        height?: number
    ): this;

    /**
     * Set rectangle position in filter-space pixels.
     *
     * @param x - Rectangle x coordinate.
     * @param y - Rectangle y coordinate.
     * @returns This controller instance.
     */
    setPosition(
        x?: number,
        y?: number
    ): this;

    /**
     * Set rectangle size in filter-space pixels.
     *
     * @param width - Rectangle width.
     * @param height - Rectangle height.
     * @returns This controller instance.
     */
    setSize(
        width?: number,
        height?: number
    ): this;

    /**
     * Set whether to invert the mask.
     *
     * @param invert - Whether to invert the mask.
     * @returns This controller instance.
     */
    setInvert(invert?: boolean): this;

    /**
     * Set feather size in pixels.
     *
     * @param feather - Feather size in pixels.
     * @returns This controller instance.
     */
    setFeather(feather?: number): this;

    /**
     * The rectangle x coordinate in filter-space pixels.
     */
    x: number;

    /**
     * The rectangle y coordinate in filter-space pixels.
     */
    y: number;

    /**
     * The rectangle width in filter-space pixels.
     */
    width: number;

    /**
     * The rectangle height in filter-space pixels.
     */
    height: number;

    /**
     * Whether to invert the mask.
     */
    invert: boolean;

    /**
     * Feather size in pixels.
     */
    feather: number;

}
