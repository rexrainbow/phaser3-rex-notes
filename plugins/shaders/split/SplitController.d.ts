// import * as Phaser from 'phaser';
export default SplitController;

declare namespace SplitController {
    /**
     * Configuration for a split filter controller.
     */
    interface IConfig {
        /**
         * Total split width. Overrides left and right when provided.
         */
        width?: number,
        /**
         * Total split height. Overrides top and bottom when provided.
         */
        height?: number,

        /**
         * Left split space.
         */
        left?: number,
        /**
         * Right split space.
         */
        right?: number,
        /**
         * Top split space.
         */
        top?: number,
        /**
         * Bottom split space.
         */
        bottom?: number,

        /**
         * Split center x coordinate.
         */
        x?: number,
        /**
         * Split center y coordinate.
         */
        y?: number,

        /**
         * Split rotation in radians.
         */
        rotation?: number,
        /**
         * Split rotation in degrees.
         */
        angle?: number,

        /**
         * Enable shifting around the split line.
         */
        shiftEnable?: boolean,
    }
}

/**
 * Controller for a split filter on a camera.
 */
declare class SplitController extends Phaser.Filters.Controller {
    /**
     * Create a split filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: SplitController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param config - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(config?: SplitController.IConfig): this;

    /**
     * Set split center position.
     *
     * @param x - Split center x coordinate.
     * @param y - Split center y coordinate.
     * @returns This controller instance.
     */
    setSplit(
        x?: number,
        y?: number
    ): this;
    /**
     * Split center x coordinate.
     */
    splitX: number;
    /**
     * Split center y coordinate.
     */
    splitY: number;

    /**
     * Set split spaces for all directions.
     *
     * @param left - Left split space.
     * @param right - Right split space.
     * @param top - Top split space.
     * @param bottom - Bottom split space.
     * @returns This controller instance.
     */
    setSpace(
        left?: number,
        right?: number,
        top?: number,
        bottom?: number
    ): this;
    /**
     * Left split space.
     */
    spaceLeft: number;
    /**
     * Right split space.
     */
    spaceRight: number;
    /**
     * Top split space.
     */
    spaceTop: number;
    /**
     * Bottom split space.
     */
    spaceBottom: number;
    /**
     * Set total split width.
     *
     * @param width - Total split width.
     * @returns This controller instance.
     */
    setSplittedWidth(width?: number): this;
    /**
     * Total split width.
     */
    splittedWidth: number;
    /**
     * Set total split height.
     *
     * @param height - Total split height.
     * @returns This controller instance.
     */
    setSplittedHeight(height?: number): this;
    /**
     * Total split height.
     */
    splittedHeight: number;

    /**
     * Place split center at camera center.
     *
     * Optionally sets total split width and height.
     *
     * @param width - Optional total split width.
     * @param height - Optional total split height.
     * @returns This controller instance.
     */
    splitAtCenter(width?: number, height?: number): this;

    /**
     * Set split angle in degrees.
     *
     * @param angle - Rotation angle in degrees.
     * @returns This controller instance.
     */
    setAngle(angle: number): this;
    /**
     * Set split rotation in radians.
     *
     * @param rotation - Rotation in radians.
     * @returns This controller instance.
     */
    setRotation(rotation: number): this;
    /**
     * Rotation angle in degrees.
     */
    angle: number;
    /**
     * Rotation in radians.
     */
    rotation: number;

    /**
     * Enable or disable split shift behavior.
     *
     * @param enable - True to enable split shifting.
     * @returns This controller instance.
     */
    setShiftEnable(enable?: boolean): this;
    /**
     * Whether split shift behavior is enabled.
     */
    shiftEnable: boolean;
}
