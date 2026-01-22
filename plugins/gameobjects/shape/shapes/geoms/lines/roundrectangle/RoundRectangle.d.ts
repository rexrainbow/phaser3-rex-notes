import PathBase from "../PathBase";

export default RoundRectangle;

declare namespace RoundRectangle {
    interface IRadius {
        /**
         * Top-left radius.
         */
        tl?: number,
        /**
         * Top-right radius.
         */
        tr?: number,
        /**
         * Bottom-left radius.
         */
        bl?: number,
        /**
         * Bottom-right radius.
         */
        br?: number
    }
}

/**
 * Rounded rectangle path geometry.
 */
declare class RoundRectangle extends PathBase {
    /**
     * Create a rounded rectangle.
     * @param x - Top-left x.
     * @param y - Top-left y.
     * @param width - Width.
     * @param height - Height.
     * @param radius - Radius value.
     * @param iteration - Corner iteration.
     */
    constructor(
        x?: number, y?: number,
        width?: number, height?: number,
        radius?: number,
        iteration?: number
    );

    /**
     * Set top-left position.
     * @param x - Top-left x.
     * @param y - Top-left y.
     * @returns This instance.
     */
    setTopLeftPosition(x: number, y: number): this;
    /**
     * Top-left x.
     */
    x: number;
    /**
     * Top-left y.
     */
    y: number;

    /**
     * Set size.
     * @param width - Width.
     * @param height - Height.
     * @returns This instance.
     */
    setSize(width: number, height: number): this;
    /**
     * Width.
     */
    width: number;
    /**
     * Height.
     */
    height: number;

    /**
     * Set center position.
     * @param x - Center x.
     * @param y - Center y.
     * @returns This instance.
     */
    setCenterPosition(x: number, y: number): this;
    /**
     * Center x.
     */
    centerX: number;
    /**
     * Center y.
     */
    centerY: number;

    /**
     * Set radius per corner.
     * @param radius - Radius config.
     * @returns This instance.
     */
    setRadius(radius: number | RoundRectangle.IRadius): this;
    /**
     * Top-left radius.
     */
    radiusTL: number;
    /**
     * Top-right radius.
     */
    radiusTR: number;
    /**
     * Bottom-left radius.
     */
    radiusBL: number;
    /**
     * Bottom-right radius.
     */
    radiusBR: number;

    /**
     * Set iteration count.
     * @param iterations - Iteration count.
     * @returns This instance.
     */
    setIterations(iterations: number): this;
    /**
     * Iteration count.
     */
    iterations: number;
}
