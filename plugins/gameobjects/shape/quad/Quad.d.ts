// import * as Phaser from 'phaser';

export default Quad;

declare namespace Quad {

    /**
     * Side control point.
     */
    interface ISidePoint {
        /**
         * Position along the side (0-1).
         */
        t: number,
        /**
         * X coordinate.
         */
        x: number,
        /**
         * Y coordinate.
         */
        y: number
    }

    /**
     * Side control point with optional key.
     */
    interface ISidePointParameter extends ISidePoint {
        /**
         * Optional key for the point.
         */
        key?: string
    }

    interface IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Width of the quad.
         */
        width?: number,
        /**
         * Height of the quad.
         */
        height?: number,

        /**
         * Fill color.
         */
        color?: number,
        /**
         * Fill alpha.
         */
        alpha?: number,

        /**
         * Stroke color.
         */
        strokeColor?: number,
        /**
         * Stroke alpha.
         */
        strokeAlpha?: number,
        /**
         * Stroke width.
         */
        strokeWidth?: number,

        /**
         * Top-left x position.
         */
        tlx?: number;
        /**
         * Top-left y position.
         */
        tly?: number;
        /**
         * Top-right x position.
         */
        trx?: number;
        /**
         * Top-right y position.
         */
        try?: number;
        /**
         * Bottom-left x position.
         */
        blx?: number;
        /**
         * Bottom-left y position.
         */
        bly?: number;
        /**
         * Bottom-right x position.
         */
        brx?: number;
        /**
         * Bottom-right y position.
         */
        bry?: number;

        /**
         * Control points along the left side.
         */
        leftSidePoints?: ISidePointParameter[],
        /**
         * Control points along the top side.
         */
        topSidePoints?: ISidePointParameter[],
        /**
         * Control points along the right side.
         */
        rightSidePoints?: ISidePointParameter[],
        /**
         * Control points along the bottom side.
         */
        bottomSidePoints?: ISidePointParameter[],
    }

}

/**
 * Quad shape with adjustable corners and side control points.
 */
declare class Quad extends Phaser.GameObjects.Shape {
    /**
     * Create a quad.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the quad.
     * @param height - Height of the quad.
     * @param fillColor - Fill color.
     * @param fillAlpha - Fill alpha.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        fillColor?: number,
        fillAlpha?: number
    );

    /**
     * Create a quad.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Quad.IConfig
    )

    /**
     * Set top-left corner position.
     * @param x - X position.
     * @param y - Y position.
     * @returns This instance.
     */
    setTLPosition(
        x: number,
        y: number
    ): this;
    /**
     * Set top-right corner position.
     * @param x - X position.
     * @param y - Y position.
     * @returns This instance.
     */
    setTRPosition(
        x: number,
        y: number
    ): this;
    /**
     * Set bottom-left corner position.
     * @param x - X position.
     * @param y - Y position.
     * @returns This instance.
     */
    setBLPosition(
        x: number,
        y: number
    ): this;
    /**
     * Set bottom-right corner position.
     * @param x - X position.
     * @param y - Y position.
     * @returns This instance.
     */
    setBRPosition(
        x: number,
        y: number
    ): this;
    /**
     * Reset all corner positions.
     * @returns This instance.
     */
    resetCornerPosition(): this;
    /**
     * Top-left x position.
     */
    tlx: number;
    /**
     * Top-left y position.
     */
    tlr: number;
    /**
     * Top-right x position.
     */
    trx: number;
    /**
     * Top-right y position.
     */
    try: number;
    /**
     * Bottom-left x position.
     */
    blx: number;
    /**
     * Bottom-left y position.
     */
    bly: number;
    /**
     * Bottom-right x position.
     */
    brx: number;
    /**
     * Bottom-right y position.
     */
    bry: number;

    /**
     * Insert a top side point.
     * @param t - Position along the side (0-1).
     * @param x - X coordinate.
     * @param y - Y coordinate.
     * @param key - Optional key for the point.
     * @returns This instance.
     */
    insertTopSidePoint(
        t: number,
        x: number,
        y: number,
        key?: string
    ): this;
    /**
     * Insert top side points.
     * @param points - Points to insert.
     * @returns This instance.
     */
    insertTopSidePoint(points: Quad.ISidePointParameter[]): this;

    /**
     * Insert a right side point.
     * @param t - Position along the side (0-1).
     * @param x - X coordinate.
     * @param y - Y coordinate.
     * @param key - Optional key for the point.
     * @returns This instance.
     */
    insertRightSidePoint(
        t: number,
        x: number,
        y: number,
        key?: string
    ): this;
    /**
     * Insert right side points.
     * @param points - Points to insert.
     * @returns This instance.
     */
    insertRightSidePoint(points: Quad.ISidePointParameter[]): this;

    /**
     * Insert a bottom side point.
     * @param t - Position along the side (0-1).
     * @param x - X coordinate.
     * @param y - Y coordinate.
     * @param key - Optional key for the point.
     * @returns This instance.
     */
    insertBottomSidePoint(
        t: number,
        x: number,
        y: number,
        key?: string
    ): this;
    /**
     * Insert bottom side points.
     * @param points - Points to insert.
     * @returns This instance.
     */
    insertBottomSidePoint(points: Quad.ISidePointParameter[]): this;

    /**
     * Insert a left side point.
     * @param t - Position along the side (0-1).
     * @param x - X coordinate.
     * @param y - Y coordinate.
     * @param key - Optional key for the point.
     * @returns This instance.
     */
    insertLeftSidePoint(
        t: number,
        x: number,
        y: number,
        key?: string
    ): this;
    /**
     * Insert left side points.
     * @param points - Points to insert.
     * @returns This instance.
     */
    insertLeftSidePoint(points: Quad.ISidePointParameter[]): this;

    /**
     * Clear top side points.
     * @returns This instance.
     */
    clearTopSidePoints(): this;
    /**
     * Clear right side points.
     * @returns This instance.
     */
    clearRightSidePoints(): this;
    /**
     * Clear bottom side points.
     * @returns This instance.
     */
    clearBottomSidePoints(): this;
    /**
     * Clear left side points.
     * @returns This instance.
     */
    clearLeftSidePoints(): this;
    /**
     * Clear all side points.
     * @returns This instance.
     */
    clearAllSidesPoints(): this;
    /**
     * Left side points.
     */
    readonly leftSidePoints: Quad.ISidePoint[];
    /**
     * Top side points.
     */
    readonly topSidePoints: Quad.ISidePoint[];
    /**
     * Bottom side points.
     */
    readonly bottomSidePoints: Quad.ISidePoint[];
    /**
     * Right side points.
     */
    readonly rightSidePoints: Quad.ISidePoint[];

    /**
     * Resize the quad.
     * @param width - New width.
     * @param height - New height.
     * @returns This instance.
     */
    resize(
        width: number,
        height: number
    ): this;


}
